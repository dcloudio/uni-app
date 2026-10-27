/**
  * vue v3.6.0-rc.12
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
import { EMPTY_ARR, EMPTY_OBJ, NO, NOOP, UNI_APP_SCOPE_ID, camelize, camelize as camelize$1, canSetValueDirectly, capitalize, capitalize as capitalize$1, def, extend, extend as extend$1, getEscapedCssVarName, getGlobalThis, getModifierPropName, getSequence, hasChanged, hasOwn, hyphenate, includeBooleanAttr, invokeArrayFns, isArray, isBooleanAttr, isBuiltInDirective, isBuiltInTag, isForwardedSlot, isFunction, isGloballyAllowed, isHTMLTag, isIntegerKey, isKnownHtmlAttr, isKnownSvgAttr, isMap, isMathMLTag, isModelListener, isNativeOn, isObject, isOn, isPlainObject, isPromise, isRegExp, isRenderableAttrValue, isReservedProp, isSVGTag, isSet, isSpecialBooleanAttr, isString, isSymbol, looseEqual, looseIndexOf, looseToNumber, makeMap, normalizeClass, normalizeClass as normalizeClass$1, normalizeCssVarValue, normalizeProps, normalizeStyle, normalizeStyle as normalizeStyle$1, normalizeUniText, normalizeUniText as normalizeUniText$1, parseStringStyle, remove as remove$1, shouldSetAsAttr, slotNotifiesBoundary, stringifyStyle, toDisplayString, toDisplayString as toDisplayString$1, toHandlerKey, toHandlerKey as toHandlerKey$1, toNumber, toRawType } from "@vue/shared";
import { ON_LOAD, isRootHook, isRootImmediateHook, normalizeRpx } from "@dcloudio/uni-shared";
//#region packages/reactivity/src/debug.ts
const triggerEventInfos = [];
function onTrack(sub, debugInfo) {
	if (!!!(process.env.NODE_ENV !== "production")) throw new Error(`Internal error: onTrack should be called only in development.`);
	if (sub.onTrack) sub.onTrack(extend$1({ effect: sub }, debugInfo));
}
function onTrigger(sub) {
	if (!!!(process.env.NODE_ENV !== "production")) throw new Error(`Internal error: onTrigger should be called only in development.`);
	if (sub.onTrigger) {
		const debugInfo = triggerEventInfos[triggerEventInfos.length - 1];
		sub.onTrigger(extend$1({ effect: sub }, debugInfo));
	}
}
function setupOnTrigger(target) {
	if (!!!(process.env.NODE_ENV !== "production")) throw new Error(`Internal error: setupOnTrigger should be called only in development.`);
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
	if (!!(process.env.NODE_ENV !== "production") && activeSub !== sub) warn$2("Active effect was not restored correctly - this is likely a Vue internal bug.");
	activeSub = prevSub;
	const depsTail = sub.depsTail;
	let toRemove = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (toRemove !== void 0) toRemove = unlink(toRemove, sub);
	sub.flags &= -5;
}
function flush() {
	let hasError = false;
	let error;
	while (notifyIndex < notifyBufferLength) {
		const effect = notifyBuffer[notifyIndex];
		notifyBuffer[notifyIndex++] = void 0;
		try {
			effect.notify();
		} catch (err) {
			if (!hasError) {
				hasError = true;
				error = err;
			}
		}
	}
	notifyIndex = 0;
	notifyBufferLength = 0;
	if (hasError) throw error;
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
		if (value === void 0 && this.map) this.map.delete(this.key);
	}
};
/**
* Tracks a dep its owner keys on its own, outside `targetMap`.
* @internal
*/
function trackDep(dep, target = dep, key = "value") {
	if (activeSub !== void 0) {
		if (!!(process.env.NODE_ENV !== "production")) onTrack(activeSub, {
			target,
			type: "get",
			key
		});
		link(dep, activeSub);
	}
}
/**
* @internal
*/
function triggerDep(dep, target = dep, key = "value", newValue, oldValue) {
	const subs = dep.subs;
	if (subs !== void 0) {
		if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.push({
			target,
			type: "set",
			key,
			newValue,
			oldValue
		});
		propagate(subs);
		shallowPropagate(subs);
		if (!batchDepth) flush();
		if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.pop();
	}
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "Object iterate" : "");
const MAP_KEY_ITERATE_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "Map keys iterate" : "");
const ARRAY_ITERATE_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "Array iterate" : "");
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
		if (!!(process.env.NODE_ENV !== "production")) onTrack(activeSub, {
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
			if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.push({
				target,
				type,
				key,
				newValue,
				oldValue,
				oldTarget
			});
			propagate(dep.subs);
			shallowPropagate(dep.subs);
			if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.pop();
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
function getDepFromReactive(object, key) {
	const depMap = targetMap.get(object);
	return depMap && depMap.get(key);
}
//#endregion
//#region packages/reactivity/src/arrayInstrumentations.ts
/**
* Track array iteration and return:
* - if input is reactive: a cloned raw array with reactive values
* - if input is readonly: a cloned raw array with readonly values, preserving
*   reactivity
* - if input is raw or shallow: the original raw array
*/
function reactiveReadArray(array) {
	const raw = /* @__PURE__ */ toRaw(array);
	if (raw === array) return raw;
	track(raw, "iterate", ARRAY_ITERATE_KEY);
	if (/* @__PURE__ */ isShallow(array)) return raw;
	if (!/* @__PURE__ */ isReadonly(array)) return raw.map(toReactive);
	return /* @__PURE__ */ isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
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
	const methodFn = arr[method];
	const iter = methodFn.call(arr);
	if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
		if (iter[Symbol.toStringTag] === "Array Iterator") {
			const wrapped = Object.create(Object.getPrototypeOf(iter));
			wrapped.next = () => wrapResult(iter.next(), wrapValue);
			if (methodFn !== arrayProto[method]) Object.defineProperties(wrapped, {
				return: { get() {
					const fn = iter.return;
					return typeof fn === "function" ? fn.bind(iter) : fn;
				} },
				throw: { get() {
					const fn = iter.throw;
					return typeof fn === "function" ? fn.bind(iter) : fn;
				} }
			});
			return wrapped;
		}
		iter._next = iter.next;
		iter.next = () => wrapResult(iter._next(), wrapValue);
	}
	return iter;
}
function wrapResult(result, wrapValue) {
	if (!result.done) result.value = wrapValue(result.value);
	return result;
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
					if (!!(process.env.NODE_ENV !== "production")) warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target[key]);
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
		if (!!(process.env.NODE_ENV !== "production")) warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
		return true;
	}
	deleteProperty(target, key) {
		if (!!(process.env.NODE_ENV !== "production")) warn$2(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
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
		return extend$1(Object.create(innerIterator), { next() {
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
		if (!!(process.env.NODE_ENV !== "production")) {
			const key = args[0] ? `on key "${args[0]}" ` : ``;
			warn$2(`${capitalize$1(type)} operation ${key}failed: target is readonly.`, /* @__PURE__ */ toRaw(this));
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
	extend$1(instrumentations, readonly ? {
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
			} else if (!!(process.env.NODE_ENV !== "production")) checkIdentityKeys(target, has, key);
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
			} else if (!!(process.env.NODE_ENV !== "production")) checkIdentityKeys(target, has, key);
			const oldValue = get ? get.call(target, key) : void 0;
			const result = target.delete(key);
			if (hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		},
		clear() {
			const target = /* @__PURE__ */ toRaw(this);
			const hadItems = target.size !== 0;
			const oldTarget = !!(process.env.NODE_ENV !== "production") ? isMap(target) ? new Map(target) : new Set(target) : void 0;
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
		else if (key === "__v_isShallow") return shallow;
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
		if (!!(process.env.NODE_ENV !== "production")) warn$2(`value cannot be made ${isReadonly ? "readonly" : "reactive"}: ${String(target)}`);
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
/*@__NO_SIDE_EFFECTS__*/
function ref(value) {
	return createRef(value, toReactive);
}
/*@__NO_SIDE_EFFECTS__*/
function shallowRef(value) {
	return createRef(value);
}
function createRef(rawValue, wrap) {
	if (/* @__PURE__ */ isRef(rawValue)) return rawValue;
	return new RefImpl(rawValue, wrap);
}
/**
* @internal
*/
var RefImpl = class {
	constructor(value, wrap) {
		this.subs = void 0;
		this.subsTail = void 0;
		this.flags = 1;
		this.__v_isRef = true;
		this.__v_isShallow = false;
		this._oldValue = this._rawValue = wrap ? /* @__PURE__ */ toRaw(value) : value;
		this._value = wrap ? wrap(value) : value;
		this._wrap = wrap;
		this["__v_isShallow"] = !wrap;
	}
	get dep() {
		return this;
	}
	get value() {
		trackRef(this);
		if (this.flags & 16 && this.update()) {
			const subs = this.subs;
			if (subs !== void 0) shallowPropagate(subs);
		}
		return this._value;
	}
	set value(newValue) {
		const oldValue = this._rawValue;
		const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
		newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
		if (hasChanged(newValue, oldValue)) {
			this.flags |= 16;
			this._rawValue = newValue;
			this._value = !useDirectValue && this._wrap ? this._wrap(newValue) : newValue;
			const subs = this.subs;
			if (subs !== void 0) {
				if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.push({
					target: this,
					type: "set",
					key: "value",
					newValue,
					oldValue
				});
				propagate(subs);
				if (!batchDepth) flush();
				if (!!(process.env.NODE_ENV !== "production")) triggerEventInfos.pop();
			}
		}
	}
	update() {
		this.flags &= -17;
		return hasChanged(this._oldValue, this._oldValue = this._rawValue);
	}
};
/**
* Force trigger effects that depends on a shallow ref. This is typically used
* after making deep mutations to the inner value of a shallow ref.
*
* @example
* ```js
* const shallow = shallowRef({
*   greet: 'Hello, world'
* })
*
* // Logs "Hello, world" once for the first run-through
* watchEffect(() => {
*   console.log(shallow.value.greet)
* })
*
* // This won't trigger the effect because the ref is shallow
* shallow.value.greet = 'Hello, universe'
*
* // Logs "Hello, universe"
* triggerRef(shallow)
* ```
*
* @param ref - The ref whose tied effects shall be executed.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#triggerref}
*/
function triggerRef(ref) {
	const dep = ref.dep;
	if (dep !== void 0 && dep.subs !== void 0) {
		propagate(dep.subs);
		shallowPropagate(dep.subs);
		if (!batchDepth) flush();
	}
}
function trackRef(dep) {
	if (activeSub !== void 0) {
		if (!!(process.env.NODE_ENV !== "production")) onTrack(activeSub, {
			target: dep,
			type: "get",
			key: "value"
		});
		link(dep, activeSub);
	}
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
/**
* Normalizes values / refs / getters to values.
* This is similar to {@link unref}, except that it also normalizes getters.
* If the argument is a getter, it will be invoked and its return value will
* be returned.
*
* @example
* ```js
* toValue(1) // 1
* toValue(ref(1)) // 1
* toValue(() => 1) // 1
* ```
*
* @param source - A getter, an existing ref, or a non-function value.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#tovalue}
*/
function toValue(source) {
	return isFunction(source) ? source() : unref(source);
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
var CustomRefImpl = class {
	constructor(factory) {
		this.subs = void 0;
		this.subsTail = void 0;
		this.flags = 0;
		this["__v_isRef"] = true;
		this._value = void 0;
		const { get, set } = factory(() => trackRef(this), () => triggerRef(this));
		this._get = get;
		this._set = set;
	}
	get dep() {
		return this;
	}
	get value() {
		return this._value = this._get();
	}
	set value(newVal) {
		this._set(newVal);
	}
};
/**
* Creates a customized ref with explicit control over its dependency tracking
* and updates triggering.
*
* @param factory - The function that receives the `track` and `trigger` callbacks.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#customref}
*/
function customRef(factory) {
	return new CustomRefImpl(factory);
}
/**
* Converts a reactive object to a plain object where each property of the
* resulting object is a ref pointing to the corresponding property of the
* original object. Each individual ref is created using {@link toRef}.
*
* @param object - Reactive object to be made into an object of linked refs.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#torefs}
*/
/*@__NO_SIDE_EFFECTS__*/
function toRefs(object) {
	const ret = isArray(object) ? new Array(object.length) : {};
	for (const key in object) ret[key] = propertyToRef(object, key);
	return ret;
}
var ObjectRefImpl = class {
	constructor(_object, key, _defaultValue) {
		this._object = _object;
		this._defaultValue = _defaultValue;
		this["__v_isRef"] = true;
		this._value = void 0;
		this._key = isSymbol(key) ? key : String(key);
		this._raw = /* @__PURE__ */ toRaw(_object);
		let shallow = true;
		let obj = _object;
		if (!isArray(_object) || isSymbol(this._key) || !isIntegerKey(this._key)) do
			shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
		while (shallow && (obj = obj["__v_raw"]));
		this._shallow = shallow;
	}
	get value() {
		let val = this._object[this._key];
		if (this._shallow) val = unref(val);
		return this._value = val === void 0 ? this._defaultValue : val;
	}
	set value(newVal) {
		if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
			const nestedRef = this._object[this._key];
			if (/* @__PURE__ */ isRef(nestedRef)) {
				nestedRef.value = newVal;
				return;
			}
		}
		this._object[this._key] = newVal;
	}
	get dep() {
		return getDepFromReactive(this._raw, this._key);
	}
};
var GetterRefImpl = class {
	constructor(_getter) {
		this._getter = _getter;
		this["__v_isRef"] = true;
		this["__v_isReadonly"] = true;
		this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
/*@__NO_SIDE_EFFECTS__*/
function toRef(source, key, defaultValue) {
	if (/* @__PURE__ */ isRef(source)) return source;
	else if (isFunction(source)) return new GetterRefImpl(source);
	else if (isObject(source) && arguments.length > 1) return propertyToRef(source, key, defaultValue);
	else return /* @__PURE__ */ ref(source);
}
function propertyToRef(source, key, defaultValue) {
	return new ObjectRefImpl(source, key, defaultValue);
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
if (!!(process.env.NODE_ENV !== "production")) setupOnTrigger(ReactiveEffect);
function effect(fn, options) {
	if (fn.effect instanceof ReactiveEffect) fn = fn.effect.fn;
	const e = new ReactiveEffect(fn);
	if (options) {
		const { onStop, scheduler } = options;
		if (onStop) {
			options.onStop = void 0;
			const stop = e.stop.bind(e);
			e.stop = () => {
				stop();
				onStop();
			};
		}
		if (scheduler) {
			options.scheduler = void 0;
			e.notify = () => {
				if (!(e.flags & 256)) scheduler();
			};
		}
		extend$1(e, options);
	}
	try {
		e.run();
	} catch (err) {
		e.stop();
		throw err;
	}
	const runner = e.run.bind(e);
	runner.effect = e;
	return runner;
}
/**
* Stops the effect associated with the given runner.
*
* @param runner - Association with the effect to stop tracking.
*/
function stop(runner) {
	runner.effect.stop();
}
const resetTrackingStack = [];
/**
* Temporarily pauses tracking.
*/
function pauseTracking() {
	resetTrackingStack.push(activeSub);
	setActiveSub();
}
/**
* Resets the previous global effect tracking state.
*/
function resetTracking() {
	if (!!(process.env.NODE_ENV !== "production") && resetTrackingStack.length === 0) warn$2("resetTracking() was called when there was no active tracking to reset.");
	if (resetTrackingStack.length) setActiveSub(resetTrackingStack.pop());
	else setActiveSub();
}
function cleanup(sub) {
	const l = sub.cleanupsLength;
	if (l) {
		for (let i = 0; i < l; i++) sub.cleanups[i]();
		sub.cleanupsLength = 0;
	}
}
/**
* Registers a cleanup function for the current active effect.
* The cleanup function is called right before the next effect run, or when the
* effect is stopped.
*
* Throws a warning if there is no current active effect. The warning can be
* suppressed by passing `true` to the second argument.
*
* @param fn - the cleanup function to be registered
* @param failSilently - if `true`, will not throw warning when called without
* an active effect.
*/
function onEffectCleanup(fn, failSilently = false) {
	if (activeSub instanceof ReactiveEffect) activeSub.cleanups[activeSub.cleanupsLength++] = () => cleanupEffect(fn);
	else if (!!(process.env.NODE_ENV !== "production") && !failSilently) warn$2("onEffectCleanup() was called when there was no active effect to associate with.");
}
function cleanupEffect(fn) {
	const prevSub = setActiveSub();
	try {
		fn();
	} finally {
		setActiveSub(prevSub);
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
/**
* Creates an effect scope object which can capture the reactive effects (i.e.
* computed and watchers) created within it so that these effects can be
* disposed together. For detailed use cases of this API, please consult its
* corresponding {@link https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md | RFC}.
*
* @param detached - Can be used to create a "detached" effect scope.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope}
*/
function effectScope(detached) {
	return new EffectScope(detached);
}
/**
* Returns the current active effect scope if there is one.
*
* @see {@link https://vuejs.org/api/reactivity-advanced.html#getcurrentscope}
*/
function getCurrentScope() {
	return activeEffectScope;
}
function setCurrentScope(scope) {
	try {
		return activeEffectScope;
	} finally {
		activeEffectScope = scope;
	}
}
/**
* Registers a dispose callback on the current active effect scope. The
* callback will be invoked when the associated effect scope is stopped.
*
* @param fn - The callback function to attach to the scope's cleanup.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#onscopedispose}
*/
function onScopeDispose(fn, failSilently = false) {
	if (activeEffectScope !== void 0) activeEffectScope.cleanups[activeEffectScope.cleanupsLength++] = fn;
	else if (!!(process.env.NODE_ENV !== "production") && !failSilently) warn$2("onScopeDispose() is called when there is no active effect scope to be associated with.");
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
			if (!!(process.env.NODE_ENV !== "production")) onTrack(activeSub, {
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
		else if (!!(process.env.NODE_ENV !== "production")) warn$2("Write operation failed: computed value is readonly");
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
if (!!(process.env.NODE_ENV !== "production")) setupOnTrigger(ComputedRefImpl);
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
	if (!!(process.env.NODE_ENV !== "production") && debugOptions && !isSSR) {
		cRef.onTrack = debugOptions.onTrack;
		cRef.onTrigger = debugOptions.onTrigger;
	}
	return cRef;
}
//#endregion
//#region packages/reactivity/src/constants.ts
const TrackOpTypes = {
	"GET": "get",
	"HAS": "has",
	"ITERATE": "iterate"
};
const TriggerOpTypes = {
	"SET": "set",
	"ADD": "add",
	"DELETE": "delete",
	"CLEAR": "clear"
};
//#endregion
//#region packages/reactivity/src/watch.ts
const INITIAL_WATCHER_VALUE = {};
let activeWatcher = void 0;
/**
* Returns the current active effect if there is one.
*/
function getCurrentWatcher() {
	return activeWatcher;
}
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
		const cleanup = call ? () => call(cleanupFn, 4) : cleanupFn;
		if (owner.cb) (owner.cbCleanups || (owner.cbCleanups = [])).push(cleanup);
		else owner.cleanups[owner.cleanupsLength++] = cleanup;
	} else if (!!(process.env.NODE_ENV !== "production") && !failSilently) warn$2("onWatcherCleanup() was called when there was no active watcher to associate with.");
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
				else process.env.NODE_ENV !== "production" && warnInvalidSource(s, onWarn);
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
			process.env.NODE_ENV !== "production" && warnInvalidSource(source, onWarn);
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
				try {
					return _cb(...args);
				} finally {
					this.stop();
				}
			};
		}
		this.cb = cb;
		this.oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
		if (!!(process.env.NODE_ENV !== "production")) {
			this.onTrack = options.onTrack;
			this.onTrigger = options.onTrigger;
		}
	}
	cleanupCallback() {
		const cleanups = this.cbCleanups;
		if (cleanups) {
			this.cbCleanups = void 0;
			for (let i = 0, l = cleanups.length; i < l; i++) cleanups[i]();
		}
	}
	stop() {
		if (this.active) {
			super.stop();
			this.cleanupCallback();
		}
	}
	run(initialRun = false) {
		const oldValue = this.oldValue;
		const newValue = this.oldValue = super.run();
		if (!this.cb) return;
		const { immediate, deep, call } = this.options;
		if (initialRun && !immediate) return;
		if (initialRun || deep || this.forceTrigger || (this.isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
			const currentWatcher = activeWatcher;
			const prevSub = setActiveSub();
			try {
				this.cleanupCallback();
				activeWatcher = this;
				const args = [
					newValue,
					oldValue === INITIAL_WATCHER_VALUE ? void 0 : this.isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
					this.boundCleanup
				];
				call ? call(this.cb, 3, args) : this.cb(...args);
			} finally {
				activeWatcher = currentWatcher;
				setActiveSub(prevSub);
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
function watch$1(source, cb, options = EMPTY_OBJ) {
	const effect = new WatcherEffect(source, cb, options);
	effect.run(true);
	const stop = effect.stop.bind(effect);
	stop.pause = effect.pause.bind(effect);
	stop.resume = effect.resume.bind(effect);
	stop.stop = stop;
	return stop;
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
function pushWarningContext(ctx) {
	stack.push(ctx);
}
/**
* @internal
*/
function popWarningContext() {
	stack.pop();
}
let isWarning = false;
function warn$1(msg, ...args) {
	if (isWarning) return;
	isWarning = true;
	const prevSub = setActiveSub();
	const entry = stack.length ? stack[stack.length - 1] : null;
	const instance = isVNode(entry) ? entry.component : entry;
	const appWarnHandler = instance && instance.appContext.config.warnHandler;
	const trace = getComponentTrace();
	if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11, [
		msg + args.map((a) => {
			const toString = a.toString;
			return toString == null ? JSON.stringify(a) : toString.call(a);
		}).join(""),
		instance && instance.vapor ? instance : instance && instance.proxy || instance,
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
		if (isVNode(currentCtx)) {
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
	const instance = isVNode(ctx) ? ctx.component : ctx;
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
/**
* @internal
*/
function assertNumber(val, type) {
	if (!!!(process.env.NODE_ENV !== "production")) return;
	if (val === void 0) return;
	else if (typeof val !== "number") warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
	else if (isNaN(val)) warn$1(`${type} is NaN - the duration expression might be incorrect.`);
}
/* v8 ignore stop */
//#endregion
//#region packages/runtime-core/src/errorHandling.ts
const ErrorCodes = {
	"SETUP_FUNCTION": 0,
	"0": "SETUP_FUNCTION",
	"RENDER_FUNCTION": 1,
	"1": "RENDER_FUNCTION",
	"NATIVE_EVENT_HANDLER": 5,
	"5": "NATIVE_EVENT_HANDLER",
	"COMPONENT_EVENT_HANDLER": 6,
	"6": "COMPONENT_EVENT_HANDLER",
	"VNODE_HOOK": 7,
	"7": "VNODE_HOOK",
	"DIRECTIVE_HOOK": 8,
	"8": "DIRECTIVE_HOOK",
	"TRANSITION_HOOK": 9,
	"9": "TRANSITION_HOOK",
	"APP_ERROR_HANDLER": 10,
	"10": "APP_ERROR_HANDLER",
	"APP_WARN_HANDLER": 11,
	"11": "APP_WARN_HANDLER",
	"FUNCTION_REF": 12,
	"12": "FUNCTION_REF",
	"ASYNC_COMPONENT_LOADER": 13,
	"13": "ASYNC_COMPONENT_LOADER",
	"SCHEDULER": 14,
	"14": "SCHEDULER",
	"COMPONENT_UPDATE": 15,
	"15": "COMPONENT_UPDATE",
	"APP_UNMOUNT_CLEANUP": 16,
	"16": "APP_UNMOUNT_CLEANUP"
};
const ErrorTypeStrings$1 = {
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
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
}
function handleError(err, instance, type, throwInDev = true) {
	const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
	if (instance) {
		let cur = instance.parent;
		const exposedInstance = instance.vapor ? instance : instance.proxy || instance;
		const errorInfo = !!(process.env.NODE_ENV !== "production") ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
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
	if (!!(process.env.NODE_ENV !== "production")) {
		const info = ErrorTypeStrings$1[type] || type;
		if (instance) pushWarningContext(instance);
		warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
		if (instance) popWarningContext();
		if (throwInDev) throw err;
		else console.error(err);
	} else if (throwInProd) throw err;
	else console.error(err);
}
//#endregion
//#region packages/runtime-core/src/scheduler.ts
const SchedulerJobFlags = {
	"QUEUED": 1,
	"1": "QUEUED",
	"ALLOW_RECURSE": 2,
	"2": "ALLOW_RECURSE",
	"DISPOSED": 4,
	"4": "DISPOSED",
	"REQUEUE_ON_SUSPENSE_DISCARD": 8,
	"8": "REQUEUE_ON_SUSPENSE_DISCARD"
};
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
function flushPreFlushCbs(instance, minUid, seen) {
	if (!!(process.env.NODE_ENV !== "production")) seen = seen || /* @__PURE__ */ new Map();
	for (let i = flushIndex; i < jobsLength; i++) {
		const cb = jobs[i];
		if (cb.order & 1 || cb.order === Infinity) continue;
		if (instance && cb.order !== instance.uid * 2 || minUid !== void 0 && !(cb.order >= minUid * 2)) continue;
		if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) continue;
		jobs.splice(i, 1);
		i = instance ? i - 1 : flushIndex - 1;
		jobsLength--;
		if (cb.flags & 2) cb.flags &= -2;
		try {
			cb();
		} finally {
			if (!(cb.flags & 2)) cb.flags &= -2;
		}
	}
}
function flushPostFlushCbs(seen, skip, minUid = 0) {
	if (postJobs.length) {
		let cbs = postJobs;
		if (skip) {
			cbs = [];
			let kept = 0;
			for (let i = 0; i < postJobs.length; i++) {
				const cb = postJobs[i];
				if (cb.i !== void 0 ? !cb.i || cb.i.uid < minUid : skip.has(cb)) postJobs[kept++] = cb;
				else cbs.push(cb);
			}
			postJobs.length = kept;
		} else postJobs = [];
		if (activePostJobs) {
			for (let i = 0; i < cbs.length; i++) activePostJobs.push(cbs[i]);
			return;
		}
		activePostJobs = cbs;
		if (!!(process.env.NODE_ENV !== "production")) seen = seen || /* @__PURE__ */ new Map();
		try {
			while (postFlushIndex < activePostJobs.length) {
				const cb = activePostJobs[postFlushIndex++];
				if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) continue;
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
* Run a root render, then flush the jobs it is responsible for. A mount or
* unmount (`minUid` given) only flushes the jobs of the components it created
* and the post cbs it queued, so pre watchers triggered in setup run before
* mounted (#5721) while the jobs of other components stay in the queue and
* keep their order (#6728). A root update keeps flushing all pending pre jobs
* and post cbs, as the jobs of the components it re-renders may predate it.
*
* @internal
*/
function flushOnAppMount(fn, minUid) {
	if (isFlushing) {
		fn();
		return;
	}
	const queued = minUid === void 0 ? void 0 : new Set(postJobs);
	fn();
	isFlushing = true;
	try {
		flushPreFlushCbs(void 0, minUid);
		flushPostFlushCbs(void 0, queued, minUid);
	} finally {
		isFlushing = false;
	}
}
function flushJobs(seen) {
	if (!!(process.env.NODE_ENV !== "production")) seen || (seen = /* @__PURE__ */ new Map());
	try {
		while (flushIndex < jobsLength) {
			const job = jobs[flushIndex];
			jobs[flushIndex++] = void 0;
			if (!(job.flags & 4)) {
				if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, job)) continue;
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
if (!!(process.env.NODE_ENV !== "production")) getGlobalThis().__VUE_HMR_RUNTIME__ = {
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
	let pageComp;
	if (typeof window !== "undefined" && record.initialDef.__vapor && record.initialDef.__mpType === "page") {
		const setupPage = window.__setupPage;
		if (setupPage) pageComp = normalizeClassComponent(setupPage(newComp));
	}
	newComp = normalizeClassComponent(newComp);
	const resolveNewComp = (instance) => pageComp && instance.vapor && instance.$pageInstance === instance ? pageComp : newComp;
	const isVapor = record.initialDef.__vapor;
	updateComponentDef(record.initialDef, newComp);
	const instances = [...record.instances];
	if (isVapor && newComp.__vapor && !instances.some((instance) => instance.parent && !instance.parent.vapor) && !instances.some((i) => i.ceReload)) {
		for (const instance of instances) {
			const oldComp = normalizeClassComponent(instance.type);
			if (oldComp !== record.initialDef) updateComponentDef(oldComp, resolveNewComp(instance));
			if (instance.root && instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(instance.type);
		}
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
				} else instance.hmrReload(resolveNewComp(instance));
			}
		});
	} else {
		const parents = /* @__PURE__ */ new Set();
		const dirtyInstanceSet = new Set(instances);
		for (const instance of instances) {
			const oldComp = normalizeClassComponent(instance.type);
			let dirtyInstances = hmrDirtyComponents.get(oldComp);
			if (!dirtyInstances) {
				if (oldComp !== record.initialDef) updateComponentDef(oldComp, resolveNewComp(instance));
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
				if (!hasDirtyAncestor(instance, dirtyInstanceSet)) parents.add(instance.parent);
			} else if (instance.appContext.reload) instance.appContext.reload();
			else if (typeof window !== "undefined") window.location.reload();
			else console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
			if (instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(oldComp);
		}
		parents.forEach((parent) => {
			queueJob(() => {
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
			});
		});
	}
	queuePostFlushCb(() => {
		hmrDirtyComponents.clear();
		hmrDirtyComponentsMode.clear();
	});
}
function updateComponentDef(oldComp, newComp) {
	extend$1(oldComp, newComp);
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
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$2(event, ...args) {
	if (devtools$1) devtools$1.emit(event, ...args);
	else if (!devtoolsNotInstalled) buffer.push({
		event,
		args
	});
}
function setDevtoolsHook$1(hook, target) {
	var _window$navigator;
	devtools$1 = hook;
	if (devtools$1) {
		devtools$1.enabled = true;
		buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
		buffer = [];
	} else if (typeof window !== "undefined" && window.HTMLElement && !((_window$navigator = window.navigator) === null || _window$navigator === void 0 || (_window$navigator = _window$navigator.userAgent) === null || _window$navigator === void 0 ? void 0 : _window$navigator.includes("jsdom"))) {
		(target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((newHook) => {
			setDevtoolsHook$1(newHook, target);
		});
		setTimeout(() => {
			if (!devtools$1) {
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
	emit$2("app:init", app, version, {
		Fragment,
		Text: Text$1,
		Comment: Comment$1,
		Static
	});
}
function devtoolsUnmountApp(app) {
	emit$2("app:unmount", app);
}
const devtoolsComponentAdded = /*@__PURE__*/ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /*@__PURE__*/ createDevtoolsComponentHook("component:updated");
const _devtoolsComponentRemoved = /*@__PURE__*/ createDevtoolsComponentHook("component:removed");
const devtoolsComponentRemoved = (component) => {
	if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && !devtools$1.cleanupBuffer(component)) _devtoolsComponentRemoved(component);
};
/*@__NO_SIDE_EFFECTS__*/
function createDevtoolsComponentHook(hook) {
	return (component) => {
		emit$2(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
	};
}
const devtoolsPerfStart = /*@__PURE__*/ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /*@__PURE__*/ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
	return (component, type, time) => {
		emit$2(hook, component.appContext.app, component.uid, component, type, time);
	};
}
function devtoolsComponentEmit(component, event, params) {
	emit$2("component:emit", component.appContext.app, component, event, params);
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
function setCurrentRenderingInstance(instance) {
	const prev = currentRenderingInstance;
	currentRenderingInstance = instance;
	currentScopeId = instance && instance.type.__scopeId || null;
	return prev;
}
/**
* Set scope id when creating hoisted vnodes.
* @private compiler helper
*/
function pushScopeId(id) {
	currentScopeId = id;
}
/**
* Technically we no longer need this after 3.0.8 but we need to keep the same
* API for backwards compat w/ code generated by compilers.
* @private
*/
function popScopeId() {
	currentScopeId = null;
}
/**
* Only for backwards compat
* @private
*/
const withScopeId = (_id) => withCtx;
/**
* Wrap a slot function to memoize current rendering instance
* @private compiler helper
*/
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	if (!ctx) return fn;
	if (fn._n) return fn;
	const renderFnWithContext = (...args) => {
		if (renderFnWithContext._d) setBlockTracking(-1);
		const prevInstance = setCurrentRenderingInstance(ctx);
		const prevStackSize = blockStack.length;
		let res;
		try {
			res = fn(...args);
		} finally {
			for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
			setCurrentRenderingInstance(prevInstance);
			if (renderFnWithContext._d) setBlockTracking(1);
		}
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentUpdated(ctx);
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
/**
* Adds directives to a VNode.
*/
function withDirectives(vnode, directives) {
	if (currentRenderingInstance === null) {
		process.env.NODE_ENV !== "production" && warn$1(`withDirectives can only be used inside render functions.`);
		return vnode;
	}
	const instance = getComponentPublicInstance(currentRenderingInstance);
	const bindings = vnode.dirs || (vnode.dirs = []);
	for (let i = 0; i < directives.length; i++) {
		let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
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
	if (!!(process.env.NODE_ENV !== "production")) {
		if (!currentInstance || currentInstance.isMounted && !isHmrUpdating) warn$1(`provide() can only be used inside setup().`);
	}
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
		else if (!!(process.env.NODE_ENV !== "production")) warn$1(`injection "${String(key)}" not found.`);
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`inject() can only be used inside setup() or functional components.`);
}
/**
* Returns true if `inject()` can be used without warning about being called in the wrong place (e.g. outside of
* setup()). This is used by libraries that want to use `inject()` internally without triggering a warning to the end
* user. One example is `useRoute()` in `vue-router`.
*/
function hasInjectionContext() {
	return !!(getCurrentGenericInstance() || currentApp);
}
//#endregion
//#region packages/runtime-core/src/helpers/useSsrContext.ts
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
	{
		const ctx = inject(ssrContextKey);
		if (!ctx) process.env.NODE_ENV !== "production" && warn$1("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.");
		return ctx;
	}
};
//#endregion
//#region packages/runtime-core/src/apiWatch.ts
function watchEffect(effect, options) {
	return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
	return doWatch(effect, null, !!(process.env.NODE_ENV !== "production") ? extend$1({}, options, { flush: "post" }) : { flush: "post" });
}
function watchSyncEffect(effect, options) {
	return doWatch(effect, null, !!(process.env.NODE_ENV !== "production") ? extend$1({}, options, { flush: "sync" }) : { flush: "sync" });
}
function watch(source, cb, options) {
	if (!!(process.env.NODE_ENV !== "production") && !isFunction(cb)) warn$1("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
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
		job.i = instance;
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
	if (!!(process.env.NODE_ENV !== "production") && !cb) {
		if (immediate !== void 0) warn$1("watch() \"immediate\" option is only respected when using the watch(source, callback, options?) signature.");
		if (deep !== void 0) warn$1("watch() \"deep\" option is only respected when using the watch(source, callback, options?) signature.");
		if (once !== void 0) warn$1("watch() \"once\" option is only respected when using the watch(source, callback, options?) signature.");
	}
	const baseWatchOptions = extend$1({}, options);
	if (!!(process.env.NODE_ENV !== "production")) baseWatchOptions.onWarn = warn$1;
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
const pendingMounts = /* @__PURE__ */ new WeakMap();
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
	const targetSelector = props && props.to;
	if (isString(targetSelector)) {
		if (!select) {
			process.env.NODE_ENV !== "production" && warn$1("Current renderer does not support string target for Teleports. (missing querySelector renderer option)");
			return null;
		} else {
			const target = select(targetSelector);
			if (!!(process.env.NODE_ENV !== "production") && !target && !isTeleportDisabled(props)) warn$1(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
			return target;
		}
	} else {
		if (!!(process.env.NODE_ENV !== "production") && !targetSelector && !isTeleportDisabled(props)) warn$1(`Invalid Teleport target: ${targetSelector}`);
		return targetSelector;
	}
};
const TeleportImpl = {
	name: "Teleport",
	__isTeleport: true,
	process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
		const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment, parentNode } } = internals;
		const disabled = isTeleportDisabled(n2.props);
		let { dynamicChildren } = n2;
		if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
			optimized = false;
			dynamicChildren = null;
		}
		const mount = (vnode, container, anchor) => {
			if (vnode.shapeFlag & 16) mountChildren(vnode.children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		const mountToTarget = (vnode = n2) => {
			const disabled = isTeleportDisabled(vnode.props);
			const target = vnode.target = resolveTarget(vnode.props, querySelector);
			const targetAnchor = prepareAnchor(target, vnode, createText, insert);
			if (target) {
				if (namespace !== "svg" && isTargetSVG(target)) namespace = "svg";
				else if (namespace !== "mathml" && isTargetMathML(target)) namespace = "mathml";
				if (parentComponent && parentComponent.isCE) (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
				if (!disabled) {
					mount(vnode, target, targetAnchor);
					updateCssVars(vnode, false);
				}
			} else if (!!(process.env.NODE_ENV !== "production") && !disabled) warn$1("Invalid Teleport target on mount:", target, `(${typeof target})`);
		};
		const queuePendingMount = (vnode) => {
			const mountJob = () => {
				if (pendingMounts.get(vnode) !== mountJob) return;
				pendingMounts.delete(vnode);
				if (isTeleportDisabled(vnode.props)) {
					const mountContainer = parentNode(vnode.el) || container;
					mount(vnode, mountContainer, vnode.anchor);
					updateCssVars(vnode, true);
				}
				mountToTarget(vnode);
			};
			pendingMounts.set(vnode, mountJob);
			queuePostRenderEffect(mountJob, void 0, parentSuspense);
		};
		if (n1 == null) {
			const placeholder = n2.el = !!(process.env.NODE_ENV !== "production") ? createComment("teleport start") : createText("");
			const mainAnchor = n2.anchor = !!(process.env.NODE_ENV !== "production") ? createComment("teleport end") : createText("");
			insert(placeholder, container, anchor);
			insert(mainAnchor, container, anchor);
			if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
				queuePendingMount(n2);
				return;
			}
			if (disabled) {
				mount(n2, container, mainAnchor);
				updateCssVars(n2, true);
			}
			mountToTarget();
		} else {
			n2.el = n1.el;
			const mainAnchor = n2.anchor = n1.anchor;
			const pendingMount = pendingMounts.get(n1);
			if (pendingMount) {
				pendingMount.flags |= 4;
				pendingMounts.delete(n1);
				queuePendingMount(n2);
				return;
			}
			n2.targetStart = n1.targetStart;
			const target = n2.target = n1.target;
			const targetAnchor = n2.targetAnchor = n1.targetAnchor;
			const wasDisabled = isTeleportDisabled(n1.props);
			const currentContainer = wasDisabled ? container : target;
			const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
			if (namespace === "svg" || isTargetSVG(target)) namespace = "svg";
			else if (namespace === "mathml" || isTargetMathML(target)) namespace = "mathml";
			if (dynamicChildren) {
				patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
				traverseStaticChildren(n1, n2, !!!(process.env.NODE_ENV !== "production"));
			} else if (!optimized) patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
			if (disabled) {
				if (!wasDisabled) moveTeleport(n2, container, mainAnchor, internals, parentComponent, 1);
				else if (n2.props && n1.props && n2.props.to !== n1.props.to) n2.props.to = n1.props.to;
			} else if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
				const nextTarget = resolveTarget(n2.props, querySelector);
				if (nextTarget) {
					n2.target = nextTarget;
					moveTeleport(n2, nextTarget, null, internals, parentComponent, 0);
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1("Invalid Teleport target on update:", target, `(${typeof target})`);
			} else if (wasDisabled) moveTeleport(n2, target, targetAnchor, internals, parentComponent, 1);
			updateCssVars(n2, disabled);
		}
	},
	remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
		const { shapeFlag, children, anchor, targetStart, targetAnchor, target, props } = vnode;
		const disabled = isTeleportDisabled(props);
		const shouldRemove = doRemove || !disabled;
		const pendingMount = pendingMounts.get(vnode);
		if (pendingMount) {
			pendingMount.flags |= 4;
			pendingMounts.delete(vnode);
		}
		if (targetStart) hostRemove(targetStart);
		if (targetAnchor) hostRemove(targetAnchor);
		doRemove && hostRemove(anchor);
		if (!pendingMount && (disabled || target) && shapeFlag & 16) for (let i = 0; i < children.length; i++) {
			const child = children[i];
			unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
		}
	},
	move: moveTeleport,
	hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, parentComponent, moveType = 2) {
	if (moveType === 0) {
		if (vnode.targetStart) insert(vnode.targetStart, container, parentAnchor);
		insert(vnode.targetAnchor, container, parentAnchor);
		parentAnchor = vnode.targetAnchor;
	}
	const { el, anchor, shapeFlag, children, props } = vnode;
	const isReorder = moveType === 2;
	if (isReorder) insert(el, container, parentAnchor);
	if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props))) {
		if (shapeFlag & 16) for (let i = 0; i < children.length; i++) move(children[i], container, parentAnchor, 2, parentComponent);
	}
	if (isReorder) insert(anchor, container, parentAnchor);
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector, insert, createText } }, hydrateChildren) {
	function hydrateAnchor(target, targetNode) {
		let targetAnchor = targetNode;
		while (targetAnchor) {
			if (targetAnchor && targetAnchor.nodeType === 8) {
				if (targetAnchor.data === "teleport start anchor") vnode.targetStart = targetAnchor;
				else if (targetAnchor.data === "teleport anchor") {
					vnode.targetAnchor = targetAnchor;
					target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
					break;
				}
			}
			targetAnchor = nextSibling(targetAnchor);
		}
	}
	function hydrateDisabledTeleport(node, vnode) {
		vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
	}
	const target = vnode.target = resolveTarget(vnode.props, querySelector);
	const disabled = isTeleportDisabled(vnode.props);
	if (target) {
		const targetNode = target._lpa || target.firstChild;
		if (vnode.shapeFlag & 16) {
			if (disabled) {
				hydrateDisabledTeleport(node, vnode);
				hydrateAnchor(target, targetNode);
				if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert, parentNode(node) === target ? node : null);
			} else {
				vnode.anchor = nextSibling(node);
				hydrateAnchor(target, targetNode);
				if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert);
				hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
			}
		}
		updateCssVars(vnode, disabled);
	} else if (disabled) {
		if (vnode.shapeFlag & 16) {
			hydrateDisabledTeleport(node, vnode);
			vnode.targetStart = node;
			vnode.targetAnchor = nextSibling(node);
		}
	}
	return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
	const ctx = vnode.ctx;
	if (ctx && ctx.ut) {
		let node, anchor;
		if (isDisabled) {
			node = vnode.el;
			anchor = vnode.anchor;
		} else {
			node = vnode.targetStart;
			anchor = vnode.targetAnchor;
		}
		while (node && node !== anchor) {
			if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
			node = node.nextSibling;
		}
		ctx.ut();
	}
}
function prepareAnchor(target, vnode, createText, insert, anchor = null) {
	const targetStart = vnode.targetStart = createText("");
	const targetAnchor = vnode.targetAnchor = createText("");
	targetStart[TeleportEndKey] = targetAnchor;
	if (target) {
		insert(targetStart, target, anchor);
		insert(targetAnchor, target, anchor);
	}
	return targetAnchor;
}
//#endregion
//#region packages/runtime-core/src/components/BaseTransition.ts
const leaveCbKey = Symbol("_leaveCb");
const enterCbKey$1 = Symbol("_enterCb");
function useTransitionState() {
	const state = {
		isMounted: false,
		isLeaving: false,
		isUnmounting: false,
		leavingNodes: /* @__PURE__ */ new Map()
	};
	onMounted(() => {
		state.isMounted = true;
	});
	onBeforeUnmount(() => {
		state.isUnmounting = true;
	});
	return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
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
function isEmptyTransitionChild(vnode, instance) {
	if (vnode.type === Comment$1) return true;
	if (vnode.type === Fragment) {
		const child = isArray(vnode.children) && filterSingleRoot(vnode.children, false);
		return !child || isEmptyTransitionChild(child, instance);
	}
	if (vnode.type === VaporSlot || isVaporComponent$1(vnode.type)) return !getVaporInterface(instance, vnode).hasTransitionChild(vnode);
	return !!vnode.component && isEmptyTransitionChild(vnode.component.subTree, instance);
}
const BaseTransitionImpl = {
	name: `BaseTransition`,
	props: BaseTransitionPropsValidators,
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		let resumeAfterLeave;
		return () => {
			const child = resolveTransitionChild(slots.default && slots.default(), !!instance.subTree);
			if (!child) return;
			const rawProps = /* @__PURE__ */ toRaw(props);
			const { mode } = rawProps;
			checkTransitionMode(mode);
			return prepareTransitionSwitch(instance.subTree, child, rawProps, state, instance, mode === "out-in" ? resumeAfterLeave || (resumeAfterLeave = () => {
				if (!(instance.job.flags & 4)) instance.update();
			}) : NOOP);
		};
	}
};
function findNonCommentChild(children) {
	let child = children[0];
	if (children.length > 1) {
		let hasFound = false;
		for (const c of children) if (c.type !== Comment$1) {
			if (!!(process.env.NODE_ENV !== "production") && hasFound) {
				warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
				break;
			}
			child = c;
			hasFound = true;
			if (!!!(process.env.NODE_ENV !== "production")) break;
		}
	}
	return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType$1(state, vnode) {
	const { leavingNodes } = state;
	let leavingVNodesCache = leavingNodes.get(vnode.type);
	if (!leavingVNodesCache) {
		leavingVNodesCache = Object.create(null);
		leavingNodes.set(vnode.type, leavingVNodesCache);
	}
	return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
	const key = String(vnode.key);
	const leavingVNodesCache = getLeavingNodesForType$1(state, vnode);
	const hooks = baseResolveTransitionHooks({
		isLeaving: () => leavingVNodesCache[key] === vnode,
		setLeavingNodeCache: () => {
			leavingVNodesCache[key] = vnode;
		},
		unsetLeavingNodeCache: () => {
			if (leavingVNodesCache[key] === vnode) delete leavingVNodesCache[key];
		},
		earlyRemove: () => {
			const leavingVNode = leavingVNodesCache[key];
			if (leavingVNode && isSameVNodeType(vnode, leavingVNode)) {
				let leavingCb = leavingVNode.el[leaveCbKey];
				if (!leavingCb) {
					const leavingRoot = getTransitionRoot(leavingVNode);
					leavingCb = leavingRoot && leavingRoot.el[leaveCbKey];
				}
				if (leavingCb) leavingCb();
			}
		},
		cloneHooks: (vnode) => {
			const hooks = resolveTransitionHooks(vnode, props, state, instance, postClone);
			if (postClone) postClone(hooks);
			return hooks;
		}
	}, props, state, instance);
	if (vnode.type === VaporSlot) extend$1(hooks, {
		__vapor: true,
		props,
		state,
		instance
	});
	return hooks;
}
function baseResolveTransitionHooks(context, props, state, instance) {
	const { isLeaving, setLeavingNodeCache, unsetLeavingNodeCache, earlyRemove, cloneHooks } = context;
	const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
	const callHook = (hook, args) => {
		hook && callWithAsyncErrorHandling(hook, instance, 9, args);
	};
	const callAsyncHook = (hook, args) => {
		const done = args[1];
		callHook(hook, args);
		if (isArray(hook)) {
			if (hook.every((hook) => hook.length <= 1)) done();
		} else if (hook.length <= 1) done();
	};
	const hooks = {
		mode,
		persisted,
		beforeEnter(el) {
			let hook = onBeforeEnter;
			if (!state.isMounted) {
				if (appear) hook = onBeforeAppear || onBeforeEnter;
				else return;
			}
			if (el[leaveCbKey]) el[leaveCbKey](true);
			earlyRemove();
			callHook(hook, [el]);
		},
		enter(el) {
			if (!isHmrUpdating && isLeaving()) return;
			let hook = onEnter;
			let afterHook = onAfterEnter;
			let cancelHook = onEnterCancelled;
			if (!state.isMounted) {
				if (appear) {
					hook = onAppear || onEnter;
					afterHook = onAfterAppear || onAfterEnter;
					cancelHook = onAppearCancelled || onEnterCancelled;
				} else return;
			}
			let called = false;
			el[enterCbKey$1] = (cancelled) => {
				if (called) return;
				called = true;
				if (cancelled) callHook(cancelHook, [el]);
				else callHook(afterHook, [el]);
				if (hooks.delayedLeave) hooks.delayedLeave();
				el[enterCbKey$1] = void 0;
			};
			const done = el[enterCbKey$1].bind(null, false);
			if (hook) callAsyncHook(hook, [el, done]);
			else done();
		},
		leave(el, remove) {
			if (el[enterCbKey$1]) el[enterCbKey$1](true);
			if (state.isUnmounting) return remove();
			callHook(onBeforeLeave, [el]);
			let called = false;
			el[leaveCbKey] = (cancelled) => {
				if (called) return;
				called = true;
				remove();
				if (cancelled) callHook(onLeaveCancelled, [el]);
				else callHook(onAfterLeave, [el]);
				el[leaveCbKey] = void 0;
				unsetLeavingNodeCache(el);
			};
			setLeavingNodeCache(el);
			const done = el[leaveCbKey].bind(null, false);
			if (onLeave) callAsyncHook(onLeave, [el, done]);
			else done();
		},
		clone(node) {
			return cloneHooks ? cloneHooks(node) : hooks;
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
function getInnerChild$1(vnode) {
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
function resolveTransitionChild(children, renderEmpty = false) {
	const branches = children && getTransitionRawChildren(children, true);
	return branches && branches.length ? findNonCommentChild(branches) : renderEmpty ? createCommentVNode() : void 0;
}
/**
* @internal
*/
function prepareTransitionSwitch(previous, next, props, state, instance, resumeAfterLeave, delayedLeaveSource) {
	if (state.isLeaving) return emptyPlaceholder(next);
	const nextInner = getInnerChild$1(next);
	if (!nextInner) return emptyPlaceholder(next);
	let enterHooks = resolveTransitionHooks(nextInner, props, state, instance, (hooks) => {
		if (delayedLeaveSource) forwardDelayedLeave(hooks, delayedLeaveSource);
		enterHooks = hooks;
	});
	if (delayedLeaveSource) forwardDelayedLeave(enterHooks, delayedLeaveSource);
	if (nextInner.type !== Comment$1) setTransitionHooks(nextInner, enterHooks);
	const mode = props.mode;
	const previousInner = previous && getInnerChild$1(previous);
	if (previous && previousInner && !isSameVNodeType(previousInner, nextInner) && !isEmptyTransitionChild(previousInner, instance)) {
		const leavingHooks = prepareLeavingTransitionHooks(previousInner, props, state, instance);
		if (nextInner.type !== Comment$1 && (mode === "out-in" || mode === "in-out") && applyTransitionModeSwitch(previousInner, leavingHooks, mode === "in-out" ? () => enterHooks : void 0, props, state, resumeAfterLeave)) return emptyPlaceholder(next);
	}
	return next;
}
function forwardDelayedLeave(hooks, source) {
	const delayedLeave = source && source.delayedLeave;
	if (!delayedLeave) return;
	hooks.delayedLeave = () => {
		if (source.delayedLeave === delayedLeave) delayedLeave();
		delete hooks.delayedLeave;
	};
}
/**
* Prepares an outgoing VNode when the incoming branch belongs to another
* renderer. Returns true under out-in, where that branch is a comment
* child's: no mode holds for it, the leave runs on its own and
* `resumeAfterLeave` follows it.
*
* @internal
*/
function prepareTransitionLeave(previous, enterHooks, props, state, instance, resumeAfterLeave) {
	const previousInner = getInnerChild$1(previous);
	if (!previousInner || isEmptyTransitionChild(previousInner, instance)) return false;
	const leavingHooks = prepareLeavingTransitionHooks(previousInner, props, state, instance);
	if (props.mode === "out-in") {
		leavingHooks.afterLeave = resumeAfterLeave;
		return true;
	}
	return applyTransitionModeSwitch(previousInner, leavingHooks, enterHooks ? () => enterHooks : void 0, props, state, resumeAfterLeave);
}
function prepareLeavingTransitionHooks(previousInner, props, state, instance) {
	return setTransitionHooks(previousInner, resolveTransitionHooks(previousInner, props, state, instance));
}
function applyTransitionModeSwitch(leavingVNode, leavingHooks, getEnterHooks, props, state, resumeAfterLeave) {
	if (props.mode === "out-in") {
		state.isLeaving = true;
		leavingHooks.afterLeave = () => {
			state.isLeaving = false;
			resumeAfterLeave();
			delete leavingHooks.afterLeave;
		};
		return true;
	} else if (props.mode === "in-out" && getEnterHooks) {
		let delayedLeavingVNode = leavingVNode;
		leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
			const enterHooks = getEnterHooks();
			if (!enterHooks) {
				delayedLeave();
				return;
			}
			const vnode = delayedLeavingVNode;
			const leavingVNodesCache = getLeavingNodesForType$1(state, vnode);
			leavingVNodesCache[String(vnode.key)] = vnode;
			el[leaveCbKey] = () => {
				earlyRemove();
				el[leaveCbKey] = void 0;
				delete enterHooks.delayedLeave;
				delayedLeavingVNode = void 0;
			};
			enterHooks.delayedLeave = () => {
				delayedLeave();
				delete enterHooks.delayedLeave;
				delayedLeavingVNode = void 0;
			};
		};
	}
	return false;
}
function setTransitionHooks(vnode, hooks) {
	if (vnode.shapeFlag & 6 && vnode.component) {
		vnode.transition = hooks;
		if (isVaporComponent$1(vnode.type)) getVaporInterface(vnode.component, vnode).setTransitionHooks(vnode.component, hooks);
		else {
			const subTree = vnode.component.subTree;
			return setTransitionHooks(isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree, hooks);
		}
	} else if (vnode.shapeFlag & 128) {
		const contentHooks = vnode.ssContent.transition = hooks.clone(vnode.ssContent);
		const fallbackHooks = vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
		return vnode.suspense && vnode.suspense.activeBranch === vnode.ssFallback ? fallbackHooks : contentHooks;
	} else {
		vnode.transition = hooks;
		if (vnode.type === Fragment && isArray(vnode.children)) {
			const child = filterSingleRoot(vnode.children, false);
			if (child) setTransitionHooks(child, hooks);
		}
	}
	return hooks;
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
	let ret = [];
	let keyedFragmentCount = 0;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
		if (child.type === Fragment) {
			if (child.patchFlag & 128) keyedFragmentCount++;
			ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
		} else if (keepComment || child.type !== Comment$1) ret.push(key != null ? cloneVNode(child, { key }) : child);
	}
	if (keyedFragmentCount > 1) for (let i = 0; i < ret.length; i++) ret[i].patchFlag = -2;
	return ret;
}
/**
* dev-only
*/
function checkTransitionMode(mode) {
	if (!!(process.env.NODE_ENV !== "production") && mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") warn$1(`invalid <transition> mode: ${mode}`);
}
function getTransitionRoot(vnode) {
	if (vnode.component && !isVaporComponent$1(vnode.type)) return getTransitionRoot(vnode.component.subTree);
	if (vnode.type === Fragment) {
		const child = isArray(vnode.children) && filterSingleRoot(vnode.children, false);
		return child ? getTransitionRoot(child) : void 0;
	}
	if (vnode.type !== Comment$1) return vnode;
}
//#endregion
//#region packages/runtime-core/src/apiDefineComponent.ts
/*@__NO_SIDE_EFFECTS__*/
function defineComponent(options, extraOptions) {
	return isFunction(options) ? /*@__PURE__*/ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))() : options;
}
//#endregion
//#region packages/runtime-core/src/helpers/useId.ts
function useId() {
	const i = getCurrentGenericInstance();
	if (i) return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
	else if (!!(process.env.NODE_ENV !== "production")) warn$1("useId() is called when there is no active component instance to be associated with.");
	return "";
}
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
function useTemplateRef(key) {
	const i = getCurrentGenericInstance();
	const r = /* @__PURE__ */ shallowRef(null);
	if (i) {
		const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
		if (!!(process.env.NODE_ENV !== "production") && isTemplateRefKey(refs, key)) warn$1(`useTemplateRef('${key}') already exists.`);
		else Object.defineProperty(refs, key, {
			enumerable: true,
			get: () => r.value,
			set: (val) => r.value = val
		});
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1("useTemplateRef() is called when there is no active component instance to be associated with.");
	const ret = !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ readonly(r) : r;
	if (!!(process.env.NODE_ENV !== "production")) knownTemplateRefs.add(ret);
	return ret;
}
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
	if (!!(process.env.NODE_ENV !== "production") && !owner) {
		warn$1("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
		return;
	}
	const oldRef = oldRawRef && oldRawRef.r;
	const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
	const setupState = owner.setupState;
	const canSetSetupRef = createCanSetSetupRefChecker(setupState, refs);
	const canSetRef = (ref, key) => {
		if (!!(process.env.NODE_ENV !== "production") && knownTemplateRefs.has(ref)) return false;
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
					if (isUnmount) isArray(existing) && remove$1(existing, refValue);
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
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
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
		} else if (!!(process.env.NODE_ENV !== "production")) warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
	}
}
function createCanSetSetupRefChecker(setupState, refs) {
	const rawSetupState = /* @__PURE__ */ toRaw(setupState);
	return setupState === void 0 || setupState === EMPTY_OBJ ? NO : (key) => {
		if (!!(process.env.NODE_ENV !== "production")) {
			if (hasOwn(rawSetupState, key) && !/* @__PURE__ */ isRef(rawSetupState[key])) warn$1(`Template ref "${key}" used on a non-ref value. It will not work in the production build.`);
			if (knownTemplateRefs.has(rawSetupState[key])) return false;
		}
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
//#region packages/runtime-core/src/hydration.ts
let isHydratingEnabled = false;
function setIsHydratingEnabled(value) {
	isHydratingEnabled = value;
}
/**
* VDOM hydration state.
* Also used by vapor interop plugin for tree-shaking:
* In non-hydration builds, this is never set to true, so the logic in
* vaporInteropImpl's hydrate/hydrateSlot can be tree-shaken.
*/
let isHydrating = false;
let hasLoggedMismatchError = false;
const logMismatchError = () => {
	if (hasLoggedMismatchError) return;
	console.error("Hydration completed but contains mismatches.");
	hasLoggedMismatchError = true;
};
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => {
	if (!container.namespaceURI.includes("MathML")) return false;
	if (container.tagName !== "annotation-xml") return true;
	const encoding = container.getAttribute("encoding");
	return !encoding || !encoding.includes("html");
};
/**
* Resolve the element namespace a container's children should be created in.
* The live DOM is the source of truth, so this also covers containers that are
* only known at runtime (interop boundaries, teleport targets).
* @internal
*/
const getContainerType = (container) => {
	if (container.nodeType !== 1) return void 0;
	if (isSVGContainer(container)) return "svg";
	if (isMathMLContainer(container)) return "mathml";
};
const isComment$1 = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
	const { mt: mountComponent, p: patch, o: { patchProp, createText, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
	const hydrate = (vnode, container) => {
		if (!isHydratingEnabled) return;
		if (!container.hasChildNodes()) {
			(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1("Attempting to hydrate existing markup but container is empty. Performing full mount instead.");
			patch(null, vnode, container);
			flushPostFlushCbs();
			container._vnode = vnode;
			return;
		}
		isHydrating = true;
		hydrateNode(container.firstChild, vnode, null, null, null);
		isHydrating = false;
		flushPostFlushCbs();
		container._vnode = vnode;
	};
	const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
		optimized = optimized || !!vnode.dynamicChildren;
		const isFragmentStart = isComment$1(node) && (node.data === "[" || node.data === "(");
		const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
		const { type, ref, shapeFlag, patchFlag } = vnode;
		let domType = node.nodeType;
		vnode.el = node;
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
			def(node, "__vnode", vnode, true);
			def(node, "__vueParentComponent", parentComponent, true);
		}
		if (patchFlag === -2) {
			optimized = false;
			vnode.dynamicChildren = null;
		}
		let nextNode = null;
		switch (type) {
			case Text$1:
				if (domType !== 3) {
					if (vnode.children === "") {
						insert(vnode.el = createText(""), parentNode(node), node);
						nextNode = node;
					} else nextNode = onMismatch();
				} else {
					if (node.data !== vnode.children) {
						(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(`Hydration text mismatch in`, node.parentNode, `\n  - rendered on server: ${JSON.stringify(node.data)}\n  - expected on client: ${JSON.stringify(vnode.children)}`);
						logMismatchError();
						node.data = vnode.children;
					}
					nextNode = nextSibling(node);
				}
				break;
			case Comment$1:
				if (isTemplateNode(node)) {
					nextNode = nextSibling(node);
					replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
				} else if (domType !== 8 || isFragmentStart) nextNode = onMismatch();
				else nextNode = nextSibling(node);
				break;
			case Static:
				if (isFragmentStart) {
					node = nextSibling(node);
					domType = node.nodeType;
				}
				if (domType === 1 || domType === 3) {
					nextNode = node;
					const needToAdoptContent = !vnode.children.length;
					for (let i = 0; i < vnode.staticCount; i++) {
						if (needToAdoptContent) vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
						if (i === vnode.staticCount - 1) vnode.anchor = nextNode;
						nextNode = nextSibling(nextNode);
					}
					return isFragmentStart ? nextSibling(nextNode) : nextNode;
				} else onMismatch();
				break;
			case Fragment:
				if (!isFragmentStart) nextNode = onMismatch();
				else nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
				break;
			case VaporSlot:
				nextNode = getVaporInterface(parentComponent, vnode).hydrateSlot(vnode, node, parentComponent, parentSuspense, slotScopeIds);
				break;
			default: if (shapeFlag & 1) {
				if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) nextNode = onMismatch();
				else nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
			} else if (shapeFlag & 6) {
				vnode.slotScopeIds = slotScopeIds;
				const container = parentNode(node);
				if (isFragmentStart) nextNode = locateClosingAnchor(node);
				else if (isComment$1(node) && node.data === "teleport start") nextNode = locateClosingAnchor(node, node.data, "teleport end");
				else nextNode = nextSibling(node);
				if (vnode.type.__vapor) getVaporInterface(parentComponent, vnode).hydrate(vnode, node, container, nextNode, parentComponent, parentSuspense);
				else {
					mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
					const component = vnode.component;
					if (!component.subTree && (isAsyncWrapper(vnode) || component.asyncDep)) {
						let subTree;
						if (isFragmentStart) {
							subTree = createVNode(Static);
							subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
						} else subTree = node.nodeType === 3 ? createTextVNode("") : createVNode(node.nodeType === 8 ? Comment$1 : "div");
						subTree.el = node;
						component.subTree = subTree;
					}
				}
			} else if (shapeFlag & 64) {
				if (domType !== 8) nextNode = onMismatch();
				else nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
			} else if (shapeFlag & 128) nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
			else if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
		}
		if (ref != null) setRef(ref, null, parentSuspense, vnode);
		return nextNode;
	};
	const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		optimized = optimized || !!vnode.dynamicChildren;
		const { type, dynamicProps, props, patchFlag, shapeFlag, dirs, transition } = vnode;
		const forcePatch = type === "input" || type === "option";
		const hasDynamicProps = !!dynamicProps;
		if (!!(process.env.NODE_ENV !== "production") || forcePatch || hasDynamicProps || patchFlag !== -1) {
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
			let needCallTransitionHooks = false;
			if (isTemplateNode(el)) {
				needCallTransitionHooks = needTransition(null, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
				const content = el.content.firstChild;
				if (needCallTransitionHooks) {
					const cls = content.getAttribute("class");
					if (cls) content.$cls = cls;
					transition.beforeEnter(content);
				}
				replaceNode(content, el, parentComponent);
				vnode.el = el = content;
			}
			if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
				let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
				if (next && !isMismatchAllowed(el, 1)) {
					(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(`Hydration children mismatch on`, el, `\nServer rendered element contains more child nodes than client vdom.`);
					logMismatchError();
				}
				while (next) {
					const cur = next;
					next = next.nextSibling;
					remove(cur);
				}
			} else if (shapeFlag & 8) {
				let clientText = vnode.children;
				if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) clientText = clientText.slice(1);
				const { textContent } = el;
				if (textContent !== clientText && textContent !== clientText.replace(/\r\n|\r/g, "\n")) {
					if (!isMismatchAllowed(el, 0)) {
						(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(`Hydration text content mismatch on`, el, `\n  - rendered on server: ${textContent}\n  - expected on client: ${clientText}`);
						logMismatchError();
					}
					el.textContent = vnode.children;
				}
			}
			if (props) {
				if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ || forcePatch || hasDynamicProps || !optimized || patchFlag & 48) {
					const isCustomElement = el.tagName.includes("-");
					const namespace = el.namespaceURI.includes("svg") ? "svg" : el.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (const key in props) {
						if ((!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && !(dirs && dirs.some((d) => d.dir.created)) && propHasMismatch(el, key, props[key], vnode, parentComponent)) logMismatchError();
						if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || key[0] === "." || isCustomElement && !isReservedProp(key) || dynamicProps && dynamicProps.includes(key)) {
							if (isUnchangedResourceProp(el, key, props[key])) continue;
							patchProp(el, key, null, props[key], namespace, parentComponent);
						}
					}
				} else if (props.onClick) patchProp(el, "onClick", null, props.onClick, void 0, parentComponent);
				else if (patchFlag & 4 && /* @__PURE__ */ isReactive(props.style)) for (const key in props.style) props.style[key];
			}
			let vnodeHooks;
			if (vnodeHooks = props && props.onVnodeBeforeMount) invokeVNodeHook(vnodeHooks, parentComponent, vnode);
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
			if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) queueEffectWithSuspense(() => {
				vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
				needCallTransitionHooks && transition.enter(el);
				dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
			}, void 0, parentSuspense);
		}
		return el.nextSibling;
	};
	const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		optimized = optimized || !!parentVNode.dynamicChildren;
		const children = parentVNode.children;
		const l = children.length;
		let hasCheckedMismatch = false;
		for (let i = 0; i < l; i++) {
			const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
			const isText = vnode.type === Text$1;
			if (node) {
				if (isText && !optimized) {
					if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text$1) {
						insert(createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
						node.data = vnode.children;
					}
				}
				node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
			} else if (isText && !vnode.children) insert(vnode.el = createText(""), container);
			else {
				if (!hasCheckedMismatch) {
					hasCheckedMismatch = true;
					if (!isMismatchAllowed(container, 1)) {
						(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(`Hydration children mismatch on`, container, `\nServer rendered element contains fewer child nodes than client vdom.`);
						logMismatchError();
					}
				}
				patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
			}
		}
		return node;
	};
	const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		const { slotScopeIds: fragmentSlotScopeIds } = vnode;
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		const container = parentNode(node);
		const first = nextSibling(node);
		const next = vnode.vo && node.data === "(" ? getVaporInterface(parentComponent, vnode).hydrateSlotOutlet(vnode, node, parentComponent, parentSuspense, slotScopeIds) : hydrateChildren(first, vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
		if (next && isComment$1(next) && next.data === (node.data === "(" ? ")" : "]")) return nextSibling(vnode.anchor = next);
		else {
			logMismatchError();
			insert(vnode.anchor = createComment(`]`), container, next);
			return next;
		}
	};
	const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
		if (!isNodeMismatchAllowed(node, vnode)) {
			(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(`Hydration node mismatch:\n- rendered on server:`, node, node.nodeType === 3 ? `(text)` : isComment$1(node) && (node.data === "[" || node.data === "(") ? `(start of fragment)` : ``, `\n- expected on client:`, vnode.type);
			logMismatchError();
		}
		vnode.el = null;
		if (isFragment) {
			const end = locateClosingAnchor(node);
			while (true) {
				const next = nextSibling(node);
				if (next && next !== end) remove(next);
				else break;
			}
		}
		const next = nextSibling(node);
		const container = parentNode(node);
		remove(node);
		patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
		if (parentComponent && parentComponent.vnode) {
			parentComponent.vnode.el = vnode.el;
			updateHOCHostEl(parentComponent, vnode.el);
		}
		return next;
	};
	const locateClosingAnchor = (node, open = node && isComment$1(node) && node.data === "(" ? "(" : "[", close = open === "(" ? ")" : "]") => {
		let match = 0;
		while (node) {
			node = nextSibling(node);
			if (node && isComment$1(node)) {
				if (node.data === open) match++;
				if (node.data === close) {
					if (match === 0) return nextSibling(node);
					else match--;
				}
			}
		}
		return node;
	};
	const replaceNode = (newNode, oldNode, parentComponent) => {
		const parentNode = oldNode.parentNode;
		if (parentNode) parentNode.replaceChild(newNode, oldNode);
		let parent = parentComponent;
		while (parent) {
			if (parent.vnode && parent.vnode.el === oldNode) parent.vnode.el = parent.subTree.el = newNode;
			parent = parent.parent;
		}
	};
	return [hydrate, hydrateNode];
}
const isTemplateNode = (node) => {
	return node.nodeType === 1 && node.tagName === "TEMPLATE";
};
const resourceProps = /*@__PURE__*/ new Set([
	"src",
	"srcset",
	"href",
	"poster"
]);
function isUnchangedResourceProp(el, key, clientValue) {
	if (!resourceProps.has(key)) return false;
	return el.getAttribute(key) === (clientValue == null ? null : `${clientValue}`);
}
/**
* Dev only
*/
function propHasMismatch(el, key, clientValue, vnode, instance) {
	let mismatchType;
	let mismatchKey;
	let actual;
	let expected;
	if (key === "class") {
		if (el.$cls) {
			actual = el.$cls;
			delete el.$cls;
		} else actual = el.getAttribute("class");
		expected = normalizeClass$1(clientValue);
		if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
			mismatchType = 2;
			mismatchKey = `class`;
		}
	} else if (key === "style") {
		actual = el.getAttribute("style") || "";
		expected = normalizeRpx(isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle$1(clientValue)));
		const actualMap = toStyleMap(actual);
		const expectedMap = toStyleMap(expected);
		if (vnode.dirs) {
			for (const { dir, value } of vnode.dirs) if (dir.name === "show" && !value) expectedMap.set("display", "none");
		}
		if (instance) resolveCssVars(instance, vnode, expectedMap);
		if (!isMapEqual(actualMap, expectedMap)) {
			mismatchType = 3;
			mismatchKey = "style";
		}
	} else if (isValidHtmlOrSvgAttribute(el, key)) {
		({actual, expected} = getAttributeMismatch(el, key, clientValue));
		if (actual !== expected) {
			mismatchType = 4;
			mismatchKey = key;
		}
	}
	return warnPropMismatch(el, mismatchKey, mismatchType, actual, expected);
}
function getAttributeMismatch(el, key, clientValue) {
	let actual;
	let expected;
	if (key === "hidden") {
		actual = normalizeHiddenValue(el.getAttribute(key));
		expected = normalizeHiddenValue(clientValue);
	} else if (isBooleanAttr(key)) {
		actual = el.hasAttribute(key);
		expected = includeBooleanAttr(clientValue);
	} else if (clientValue == null) {
		actual = el.hasAttribute(key);
		expected = false;
	} else {
		if (el.hasAttribute(key)) actual = el.getAttribute(key);
		else if (key === "value" && el.tagName === "TEXTAREA") actual = el.value;
		else actual = false;
		expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
	}
	return {
		actual,
		expected
	};
}
function isValidHtmlOrSvgAttribute(el, key) {
	return el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key));
}
function warnPropMismatch(el, mismatchKey, mismatchType, actual, expected) {
	if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
		const format = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
		warn$1(`Hydration ${MismatchTypeString[mismatchType]} mismatch on`, el, `\n  - rendered on server: ${format(actual)}\n  - expected on client: ${format(expected)}\n  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.\n  You should fix the source of the mismatch.`);
		return true;
	}
	return false;
}
function normalizeHiddenValue(value) {
	if (!isRenderableAttrValue(value)) return false;
	if (isString(value)) return value.toLowerCase() === "until-found" ? "until-found" : "";
	return includeBooleanAttr(value) ? "" : false;
}
function toClassSet(str) {
	return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
	if (a.size !== b.size) return false;
	for (const s of a) if (!b.has(s)) return false;
	return true;
}
function toStyleMap(str) {
	const styleMap = /* @__PURE__ */ new Map();
	for (const item of str.split(";")) {
		let [key, value] = item.split(":");
		key = key.trim();
		value = value && value.trim();
		if (key && value) styleMap.set(key, value);
	}
	return styleMap;
}
function isMapEqual(a, b) {
	if (a.size !== b.size) return false;
	for (const [key, value] of a) if (value !== b.get(key)) return false;
	return true;
}
function resolveCssVars(instance, vnode, expectedMap) {
	const root = instance.subTree;
	if (instance.getCssVars && (vnode === root || root && root.type === Fragment && root.children.includes(vnode))) {
		const cssVars = instance.getCssVars();
		for (const key in cssVars) {
			const value = normalizeRpx(normalizeCssVarValue(cssVars[key]));
			expectedMap.set(`--${getEscapedCssVarName(key, false)}`, value);
		}
	}
	if (vnode === root && instance.parent) resolveCssVars(instance.parent, instance.vnode, expectedMap);
}
const allowMismatchAttr = "data-allow-mismatch";
const MismatchTypes = {
	"TEXT": 0,
	"0": "TEXT",
	"CHILDREN": 1,
	"1": "CHILDREN",
	"CLASS": 2,
	"2": "CLASS",
	"STYLE": 3,
	"3": "STYLE",
	"ATTRIBUTE": 4,
	"4": "ATTRIBUTE"
};
const MismatchTypeString = {
	[0]: "text",
	[1]: "children",
	[2]: "class",
	[3]: "style",
	[4]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
	if (allowedType === 0 || allowedType === 1) while (el && !el.hasAttribute(allowMismatchAttr)) el = el.parentElement;
	return isMismatchAllowedByAttr(el && el.getAttribute(allowMismatchAttr), allowedType);
}
function isMismatchAllowedByAttr(allowedAttr, allowedType) {
	if (allowedAttr == null) return false;
	else if (allowedAttr === "") return true;
	else {
		const list = allowedAttr.split(",");
		if (allowedType === 0 && list.includes("children")) return true;
		return list.includes(MismatchTypeString[allowedType]);
	}
}
function isNodeMismatchAllowed(node, vnode) {
	return isMismatchAllowed(node.parentElement, 1) || isMismatchAllowedByNode(node) || isMismatchAllowedByVNode(vnode);
}
function isMismatchAllowedByNode(node) {
	return node.nodeType === 1 && isMismatchAllowedByAttr(node.getAttribute(allowMismatchAttr), 1);
}
function isMismatchAllowedByVNode({ props }) {
	const allowedAttr = props && props[allowMismatchAttr];
	return typeof allowedAttr === "string" && isMismatchAllowedByAttr(allowedAttr, 1);
}
//#endregion
//#region packages/runtime-core/src/hydrationStrategies.ts
let requestIdleCallback;
let cancelIdleCallback;
function ensureIdleCallbacks() {
	if (!requestIdleCallback) {
		const g = getGlobalThis();
		requestIdleCallback = g.requestIdleCallback || ((cb) => setTimeout(cb, 1));
		cancelIdleCallback = g.cancelIdleCallback || ((id) => clearTimeout(id));
	}
}
const hydrateOnIdle = (timeout = 1e4) => (hydrate) => {
	ensureIdleCallbacks();
	const id = requestIdleCallback(hydrate, { timeout });
	return () => cancelIdleCallback(id);
};
function elementIsVisibleInViewport(el) {
	const { top, left, bottom, right } = el.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
}
const hydrateOnVisible = (opts) => (hydrate, forEach) => {
	const ob = new IntersectionObserver((entries) => {
		for (const e of entries) {
			if (!e.isIntersecting) continue;
			ob.disconnect();
			hydrate();
			break;
		}
	}, opts);
	const observe = (el) => {
		if (elementIsVisibleInViewport(el)) {
			hydrate();
			ob.disconnect();
			return false;
		}
		if (getComputedStyle(el).display === "contents") {
			for (let i = 0; i < el.children.length; i++) if (observe(el.children[i]) === false) return false;
		}
		ob.observe(el);
	};
	forEach((el) => {
		if (!(el instanceof Element)) return;
		return observe(el);
	});
	return () => ob.disconnect();
};
const hydrateOnMediaQuery = (query) => (hydrate) => {
	if (query) {
		const mql = matchMedia(query);
		if (mql.matches) hydrate();
		else {
			mql.addEventListener("change", hydrate, { once: true });
			return () => mql.removeEventListener("change", hydrate);
		}
	}
};
const hydrateOnInteraction = (interactions = []) => (hydrate, forEach) => {
	if (isString(interactions)) interactions = [interactions];
	let hasHydrated = false;
	const doHydrate = (e) => {
		if (!hasHydrated) {
			hasHydrated = true;
			teardown();
			hydrate();
			if (!(`$evt${e.type}` in e.target)) e.target.dispatchEvent(new e.constructor(e.type, e));
		}
	};
	const teardown = () => {
		forEach((el) => {
			for (const i of interactions) el.removeEventListener(i, doHydrate);
		});
	};
	forEach((el) => {
		for (const i of interactions) el.addEventListener(i, doHydrate, { once: true });
	});
	return teardown;
};
function forEachElement(node, cb) {
	if (isComment$1(node) && (node.data === "[" || node.data === "(")) {
		const open = node.data;
		const close = open === "[" ? "]" : ")";
		let depth = 1;
		let next = node.nextSibling;
		while (next) {
			if (next.nodeType === 1) {
				if (cb(next) === false) break;
			} else if (isComment$1(next)) {
				if (next.data === close) {
					if (--depth === 0) break;
				} else if (next.data === open) depth++;
			}
			next = next.nextSibling;
		}
	} else cb(node);
}
//#endregion
//#region packages/runtime-core/src/apiAsyncComponent.ts
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*@__NO_SIDE_EFFECTS__*/
function defineAsyncComponent(source) {
	const { load, getResolvedComp, setPendingRequest, source: { loadingComponent, errorComponent, delay, hydrate: hydrateStrategy, timeout, suspensible = true } } = createAsyncComponentContext(source);
	return /* @__PURE__ */ defineComponent({
		name: "AsyncComponentWrapper",
		__asyncLoader: load,
		__asyncHydrate(el, instance, hydrate) {
			performAsyncHydrate(el, instance, hydrate, getResolvedComp, load, hydrateStrategy, true);
		},
		get __asyncResolved() {
			return getResolvedComp();
		},
		setup() {
			const instance = currentInstance;
			markAsyncBoundary(instance);
			let resolvedComp = getResolvedComp();
			if (resolvedComp) return () => createInnerComp$1(resolvedComp, instance);
			const onError = (err) => {
				setPendingRequest(null);
				handleError(err, instance, 13, !errorComponent);
			};
			if (suspensible && instance.suspense || isInSSRComponentSetup) return load().then((comp) => {
				return () => createInnerComp$1(comp, instance);
			}).catch((err) => {
				onError(err);
				return () => errorComponent ? createVNode(errorComponent, { error: err }) : null;
			});
			const { loaded, error, delayed } = useAsyncComponentState(delay, timeout, onError, instance);
			load().then(() => {
				if (instance.isUnmounted) return;
				loaded.value = true;
				if (instance.parent && instance.parent.vnode && isKeepAlive(instance.parent.vnode)) instance.parent.update();
			}).catch((err) => {
				if (instance.isUnmounted) {
					setPendingRequest(null);
					return;
				}
				onError(err);
				error.value = err;
			});
			return () => {
				resolvedComp = getResolvedComp();
				if (loaded.value && resolvedComp) return createInnerComp$1(resolvedComp, instance);
				else if (error.value && errorComponent) return createVNode(errorComponent, { error: error.value });
				else if (loadingComponent && !delayed.value) return createInnerComp$1(loadingComponent, instance);
			};
		}
	});
}
function createInnerComp$1(comp, parent) {
	const { ref, props, children, ce } = parent.vnode;
	const vnode = createVNode(comp, props, children);
	vnode.ref = ref;
	vnode.ce = ce;
	delete parent.vnode.ce;
	return vnode;
}
function createAsyncComponentContext(source) {
	if (isFunction(source)) source = { loader: source };
	const { loader, onError: userOnError } = source;
	let pendingRequest = null;
	let resolvedComp;
	let retries = 0;
	const retry = () => {
		retries++;
		pendingRequest = null;
		return load();
	};
	const load = () => {
		let thisRequest;
		return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
			err = err instanceof Error ? err : new Error(String(err));
			if (userOnError) return new Promise((resolve, reject) => {
				const userRetry = () => resolve(retry());
				const userFail = () => reject(err);
				userOnError(err, userRetry, userFail, retries + 1);
			});
			else throw err;
		}).then((comp) => {
			if (thisRequest !== pendingRequest && pendingRequest) return pendingRequest;
			if (!!(process.env.NODE_ENV !== "production") && !comp) warn$1("Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.");
			if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) comp = comp.default;
			if (!!(process.env.NODE_ENV !== "production") && comp && !isObject(comp) && !isFunction(comp)) throw new Error(`Invalid async component load result: ${comp}`);
			resolvedComp = comp;
			return comp;
		}));
	};
	return {
		load,
		source,
		getResolvedComp: () => resolvedComp,
		setPendingRequest: (request) => pendingRequest = request
	};
}
const useAsyncComponentState = (delay, timeout, onError, instance = currentInstance) => {
	const loaded = /* @__PURE__ */ ref(false);
	const error = /* @__PURE__ */ ref();
	const delayed = /* @__PURE__ */ ref(!!delay);
	let timeoutTimer;
	let delayTimer;
	if (instance) onUnmounted(() => {
		if (timeoutTimer != null) clearTimeout(timeoutTimer);
		if (delayTimer != null) clearTimeout(delayTimer);
	}, instance);
	if (delay) delayTimer = setTimeout(() => {
		if (instance && instance.isUnmounted) return;
		delayed.value = false;
	}, delay);
	if (timeout != null) timeoutTimer = setTimeout(() => {
		if (instance && instance.isUnmounted) return;
		if (!loaded.value && !error.value) {
			const err = /* @__PURE__ */ new Error(`Async component timed out after ${timeout}ms.`);
			onError(err);
			error.value = err;
		}
	}, timeout);
	return {
		loaded,
		error,
		delayed
	};
};
/**
* shared between core and vapor
* @internal
*/
function performAsyncHydrate(el, instance, hydrate, getResolvedComp, load, hydrateStrategy, skipIfUpdated) {
	const wasConnected = el.isConnected;
	let patched = false;
	if (skipIfUpdated) (instance.bu || (instance.bu = [])).push(() => patched = true);
	const performHydrate = () => {
		if (patched) {
			if (!!(process.env.NODE_ENV !== "production")) {
				const resolvedComp = getResolvedComp();
				warn$1(`Skipping lazy hydration for component '${getComponentName(resolvedComp) || resolvedComp.__file}': it was updated before lazy hydration performed.`);
			}
			return;
		}
		if (!el.parentNode || wasConnected && !el.isConnected) return;
		hydrate();
	};
	const doHydrate = hydrateStrategy ? () => {
		const teardown = hydrateStrategy(performHydrate, (cb) => forEachElement(el, cb));
		if (teardown) (instance.bum || (instance.bum = [])).push(teardown);
	} : performHydrate;
	if (getResolvedComp()) doHydrate();
	else load().then(() => !instance.isUnmounted && doHydrate());
}
//#endregion
//#region packages/runtime-core/src/components/KeepAlive.ts
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAlive = {
	name: `KeepAlive`,
	__isKeepAlive: true,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number]
	},
	setup(props, { slots }) {
		const keepAliveInstance = getCurrentInstance();
		const sharedContext = keepAliveInstance.ctx;
		if (!sharedContext.renderer) return () => {
			const children = slots.default && slots.default();
			return children && children.length === 1 ? children[0] : children;
		};
		const cache = /* @__PURE__ */ new Map();
		const keys = /* @__PURE__ */ new Set();
		let current = null;
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) keepAliveInstance.__v_cache = cache;
		const parentSuspense = keepAliveInstance.suspense;
		const { renderer } = sharedContext;
		const { um: _unmount, o: { createElement } } = renderer;
		const storageContainer = createElement("div");
		sharedContext.getStorageContainer = () => storageContainer;
		sharedContext.getCachedComponent = (vnode) => {
			const key = vnode.key == null ? vnode.type : vnode.key;
			return cache.get(key);
		};
		sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
			activate(vnode, container, anchor, renderer, keepAliveInstance, parentSuspense, namespace, optimized);
		};
		sharedContext.deactivate = (vnode) => {
			deactivate(vnode, storageContainer, renderer, keepAliveInstance, parentSuspense);
		};
		function unmount(vnode) {
			resetShapeFlag(vnode);
			_unmount(vnode, keepAliveInstance, parentSuspense, true);
		}
		function pruneCache(filter) {
			cache.forEach((vnode, key) => {
				const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : vnode.type);
				if (name && !filter(name)) pruneCacheEntry(key);
			});
		}
		function pruneCacheEntry(key) {
			const cached = cache.get(key);
			if (cached && (!current || !isSameVNodeType(cached, current))) unmount(cached);
			else if (current) {
				resetShapeFlag(current);
				if (cached) resetShapeFlag(cached);
			}
			cache.delete(key);
			keys.delete(key);
		}
		watch(() => [props.include, props.exclude], ([include, exclude]) => {
			include && pruneCache((name) => matches(include, name));
			exclude && pruneCache((name) => !matches(exclude, name));
		}, {
			flush: "post",
			deep: true
		});
		let pendingCacheKey = null;
		const cacheSubtree = () => {
			if (pendingCacheKey != null) {
				if (isSuspense(keepAliveInstance.subTree.type)) queuePostRenderEffect(() => {
					const vnode = getInnerChild(keepAliveInstance.subTree);
					if (vnode.component) cache.set(pendingCacheKey, vnode);
				}, void 0, keepAliveInstance.subTree.suspense);
				else cache.set(pendingCacheKey, getInnerChild(keepAliveInstance.subTree));
			}
		};
		onMounted(cacheSubtree);
		onUpdated(cacheSubtree);
		onBeforeUnmount(() => {
			cache.forEach((cached) => {
				const { subTree, suspense } = keepAliveInstance;
				const vnode = getInnerChild(subTree);
				if (cached.type === vnode.type && cached.key === vnode.key) {
					const bda = vnode.component.bda;
					bda && invokeArrayFns(bda);
					resetShapeFlag(vnode);
					const da = vnode.component.da;
					da && queuePostRenderEffect(da, void 0, suspense);
					return;
				}
				unmount(cached);
			});
		});
		return () => {
			pendingCacheKey = null;
			if (!slots.default) return current = null;
			const children = slots.default();
			const rawVNode = children[0];
			if (children.length > 1) {
				if (!!(process.env.NODE_ENV !== "production")) warn$1(`KeepAlive should contain exactly one component child.`);
				current = null;
				return children;
			} else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
				current = null;
				return rawVNode;
			}
			let vnode = getInnerChild(rawVNode);
			if (vnode.type === Comment$1) {
				current = null;
				return vnode;
			}
			const comp = vnode.type;
			const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
			const { include, exclude, max } = props;
			if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
				vnode.shapeFlag &= -257;
				current = vnode;
				return rawVNode;
			}
			const key = vnode.key == null ? comp : vnode.key;
			const cachedVNode = cache.get(key);
			if (vnode.el) {
				vnode = cloneVNode(vnode);
				if (rawVNode.shapeFlag & 128) rawVNode.ssContent = vnode;
			}
			pendingCacheKey = key;
			if (cachedVNode) {
				vnode.el = cachedVNode.el;
				vnode.component = cachedVNode.component;
				if (vnode.transition) setTransitionHooks(vnode, vnode.transition);
				vnode.shapeFlag |= 512;
				keys.delete(key);
				keys.add(key);
			} else {
				keys.add(key);
				if (max && keys.size > parseInt(max, 10)) pruneCacheEntry(keys.values().next().value);
			}
			vnode.shapeFlag |= 256;
			current = vnode;
			return isSuspense(rawVNode.type) ? rawVNode : vnode;
		};
	}
};
function matches(pattern, name) {
	if (isArray(pattern)) return pattern.some((p) => matches(p, name));
	else if (isString(pattern)) return pattern.split(",").includes(name);
	else if (isRegExp(pattern)) {
		pattern.lastIndex = 0;
		return pattern.test(name);
	}
	/* v8 ignore next */
	return false;
}
function onActivated(hook, target) {
	registerKeepAliveHook(hook, "a", target);
}
function onBeforeActivate(hook, target) {
	registerKeepAliveHook(hook, "ba", target);
}
function onDeactivated(hook, target) {
	registerKeepAliveHook(hook, "da", target);
}
function onBeforeDeactivate(hook, target) {
	registerKeepAliveHook(hook, "bda", target);
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
		remove$1(keepAliveRoot[type], injected);
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
function resetKeepAliveHookState(hooks) {
	for (let i = 0; i < hooks.length; i++) hooks[i].__called = false;
}
function resetShapeFlag(vnode) {
	vnode.shapeFlag &= -257;
	vnode.shapeFlag &= -513;
}
function getInnerChild(vnode) {
	return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
/**
* shared between runtime-core and runtime-vapor
*/
function activate(vnode, container, anchor, { p: patch, m: move }, parentComponent, parentSuspense, namespace, optimized) {
	const instance = vnode.component;
	if (instance.ba) {
		const isDeactivated = instance.isDeactivated;
		instance.isDeactivated = false;
		invokeArrayFns(instance.ba);
		instance.isDeactivated = isDeactivated;
	}
	move(vnode, container, anchor, 0, parentComponent, parentSuspense);
	patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, namespace, vnode.slotScopeIds, optimized);
	queuePostRenderEffect(() => {
		instance.isDeactivated = false;
		if (instance.a) invokeArrayFns(instance.a);
		const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
		if (vnodeHook) invokeVNodeHook(vnodeHook, instance.parent, vnode);
	}, void 0, parentSuspense);
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentAdded(instance);
}
/**
* shared between runtime-core and runtime-vapor
*/
function deactivate(vnode, container, { m: move }, parentComponent, parentSuspense) {
	const instance = vnode.component;
	if (instance.bda) invokeKeepAliveHooks(instance.bda);
	invalidateMount(instance.m);
	invalidateMount(instance.a);
	move(vnode, container, null, 1, parentComponent, parentSuspense);
	queuePostRenderEffect(() => {
		if (instance.bda) resetKeepAliveHookState(instance.bda);
		if (instance.da) invokeArrayFns(instance.da);
		const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
		if (vnodeHook) invokeVNodeHook(vnodeHook, instance.parent, vnode);
		instance.isDeactivated = true;
	}, void 0, parentSuspense);
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentAdded(instance);
}
//#endregion
//#region packages/runtime-core/src/apiLifecycle.ts
function injectHook(type, hook, target = currentInstance, prepend = false) {
	if (target) {
		const pageInstance = target.$pageInstance;
		if (pageInstance && isRootHook(type)) {
			if (target.type.__reserved) return;
			if (target !== pageInstance) {
				target = pageInstance;
				if (isRootImmediateHook(type)) {
					const proxy = target.proxy;
					callWithAsyncErrorHandling(hook.bind(proxy), target, type, type === ON_LOAD ? [proxy.$page.options] : []);
				}
			}
		}
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
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`${toHandlerKey$1((ErrorTypeStrings$1[type] || type.replace(/^on/, "")).replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
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
const DIRECTIVES = "directives";
/**
* @private
*/
function resolveComponent(name, maybeSelfReference) {
	return resolveAsset("components", name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
/**
* @private
*/
function resolveDynamicComponent(component) {
	if (isString(component)) return resolveAsset("components", component, false) || component;
	else return component || NULL_DYNAMIC_COMPONENT;
}
/**
* @private
*/
function resolveDirective(name) {
	return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	const instance = currentRenderingInstance || currentInstance;
	if (instance) {
		const Component = instance.type;
		if (type === "components") {
			const selfName = getComponentName(Component, false);
			if (selfName && (selfName === name || selfName === camelize$1(name) || selfName === capitalize$1(camelize$1(name)))) return Component;
		}
		const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
		if (!res && maybeSelfReference) return Component;
		if (!!(process.env.NODE_ENV !== "production") && warnMissing && !res) {
			const extra = type === "components" ? "\nIf this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement." : ``;
			warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
		}
		return res;
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`resolve${capitalize$1(type.slice(0, -1))} can only be used in render() or setup().`);
}
function resolve(registry, name) {
	return registry && (registry[name] || registry[camelize$1(name)] || registry[capitalize$1(camelize$1(name))]);
}
//#endregion
//#region packages/runtime-core/src/helpers/renderList.ts
/**
* Actual implementation
*/
function renderList(source, renderItem, cache, index) {
	let ret;
	const cached = cache && cache[index];
	const sourceIsArray = isArray(source);
	if (sourceIsArray || isString(source)) {
		const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
		let needsWrap = false;
		let isReadonlySource = false;
		if (sourceIsReactiveArray) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			isReadonlySource = /* @__PURE__ */ isReadonly(source);
			source = shallowReadArray(source);
		}
		ret = new Array(source.length);
		for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
	} else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			if (!!(process.env.NODE_ENV !== "production")) warn$1(`The v-for range expects a positive integer value but got ${source}.`);
			ret = [];
		} else {
			ret = new Array(source);
			for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
		}
	} else if (isObject(source)) {
		if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
		else {
			const keys = Object.keys(source);
			ret = new Array(keys.length);
			for (let i = 0, l = keys.length; i < l; i++) {
				const key = keys[i];
				ret[i] = renderItem(source[key], key, i, cached && cached[i]);
			}
		}
	} else ret = [];
	if (cache) cache[index] = ret;
	return ret;
}
//#endregion
//#region packages/runtime-core/src/helpers/createSlots.ts
/**
* Compiler runtime helper for creating dynamic slots object
* @private
*/
function createSlots(slots, dynamicSlots) {
	for (let i = 0; i < dynamicSlots.length; i++) {
		const slot = dynamicSlots[i];
		if (isArray(slot)) for (let j = 0; j < slot.length; j++) slots[slot[j].name] = slot[j].fn;
		else if (slot) slots[slot.name] = slot.key ? (...args) => {
			const res = slot.fn(...args);
			if (res) res.key = slot.key;
			return res;
		} : slot.fn;
	}
	return slots;
}
//#endregion
//#region packages/runtime-core/src/helpers/renderSlot.ts
/**
* Links a slot function to its raw vapor slot: a raw vapor slot carries
* itself, and the wrapper the interop slots proxy hands out carries the raw
* slot it wraps — one lookup answers both "is this a vapor slot" and
* "which one". Internal to vapor interop.
*/
const rawVaporSlotKey = Symbol(`rawVaporSlot`);
/**
* Invokes a VDOM slot fallback under the outlet owner that produced it, the
* way `renderSlot` would have rendered it inline. Vapor interop invokes
* fallbacks late, outside any render, so it passes the owner recorded on the
* vapor slot vnode. Internal to vapor interop.
*/
function invokeSlotFallback(fallback, owner) {
	if (!owner) return fallback();
	const prev = setCurrentRenderingInstance(owner);
	const prevStackSize = blockStack.length;
	try {
		return fallback();
	} finally {
		for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
		setCurrentRenderingInstance(prev);
	}
}
/**
* Compiler runtime helper for rendering `<slot/>`
* @private
*/
function renderSlot(slots, name, props, fallback, noSlotted, branchKey) {
	if (props == null) props = {};
	let slot = slots[name];
	const vaporSlot = slot && slot[rawVaporSlotKey];
	if (vaporSlot) {
		const ret = (openBlock(), createBlock(VaporSlot, props));
		ret.vs = {
			slot: vaporSlot,
			outlets: fallback ? [{
				fallback,
				owner: currentRenderingInstance
			}] : void 0
		};
		if (branchKey != null && props.key == null) {
			ret.vs.props = ret.props;
			ret.props = extend$1({}, ret.props, { key: branchKey });
			ret.key = branchKey;
		}
		if (!noSlotted && ret.scopeId) ret.slotScopeIds = [ret.scopeId + "-s"];
		return ret;
	}
	if (currentRenderingInstance && (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce)) {
		const slotProps = branchKey != null && props.key == null ? extend$1({}, props, { key: branchKey }) : props;
		const hasProps = Object.keys(slotProps).length > 0;
		if (name !== "default") slotProps.name = name;
		return openBlock(), createBlock(Fragment, null, [createVNode("slot", slotProps, fallback && fallback())], hasProps ? -2 : 64);
	}
	if (!!(process.env.NODE_ENV !== "production") && slot && slot.length > 1) {
		warn$1("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.");
		slot = () => [];
	}
	if (slot && slot._c) slot._d = false;
	const prevStackSize = blockStack.length;
	openBlock();
	let rendered;
	try {
		const validSlotContent = slot && ensureValidVNode(slot(props));
		let attached = false;
		if (fallback && validSlotContent && currentRenderingInstance) {
			const interop = currentRenderingInstance.appContext.vapor;
			if (interop) attached = interop.attachSlotOutlet(validSlotContent, fallback, currentRenderingInstance);
		}
		const slotKey = props.key || branchKey || validSlotContent && validSlotContent.key;
		rendered = createBlock(Fragment, { key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + (!validSlotContent && fallback ? "_fb" : "") }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
		if (!validSlotContent && fallback) rendered.shapeFlag |= 1024;
		if (attached) rendered.vo = true;
	} catch (err) {
		for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
		throw err;
	} finally {
		if (slot && slot._c) slot._d = true;
	}
	if (!noSlotted && rendered.scopeId) rendered.slotScopeIds = [rendered.scopeId + "-s"];
	return rendered;
}
function ensureValidVNode(vnodes) {
	return vnodes.some((child) => {
		if (!isVNode(child)) return true;
		if (child.type === Comment$1) return false;
		if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
		return true;
	}) ? vnodes : null;
}
//#endregion
//#region packages/runtime-core/src/helpers/toHandlers.ts
/**
* For prefixing keys in v-on="obj" with "on"
* @private
*/
function toHandlers(obj, preserveCaseIfNecessary) {
	const ret = {};
	if (!!(process.env.NODE_ENV !== "production") && !isObject(obj)) {
		warn$1(`v-on with no argument expects an object value.`);
		return ret;
	}
	for (const key in obj) ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey$1(key)] = obj[key];
	return ret;
}
//#endregion
//#region packages/runtime-core/src/componentPublicInstance.ts
/**
* #2437 In Vue 3, functional components do not have a public instance proxy but
* they exist in the internal parent chain. For code that relies on traversing
* public $parent chains, skip functional ones and go to the parent instead.
*/
const getPublicInstance = (i) => {
	if (i && i.vapor) return getComponentPublicInstance(i);
	if (!i) return null;
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
let vaporPublicPropertiesMap;
const getPublicPropertiesMap = (vapor = false) => {
	if (!publicPropertiesMap) publicPropertiesMap = extend$1(Object.create(null), {
		$: (i) => i,
		$el: (i) => i.vapor ? i.getRootElement() : !!(process.env.NODE_ENV !== "production") ? getDevRootFragmentEl(i) : i.vnode.el,
		$data: (i) => i.data,
		$props: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.props) : i.props,
		$attrs: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.attrs) : i.attrs,
		$slots: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.slots) : i.slots,
		$refs: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.refs) : i.refs,
		$parent: (i) => getPublicInstance(i.parent),
		$root: (i) => getPublicInstance(i.root),
		$page: (i) => i.page || null,
		$host: (i) => i.ce,
		$emit: (i) => i.emit,
		$options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
		$forceUpdate: (i) => i.f || (i.f = () => {
			queueJob(i.update);
		}),
		$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
		$watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
	});
	if (vapor) {
		if (!vaporPublicPropertiesMap) {
			vaporPublicPropertiesMap = extend$1(Object.create(null), publicPropertiesMap, { $callMethod: (i) => (methodName, ...args) => {
				const proxy = getComponentPublicInstance(i) || i.proxy;
				if (!proxy) return null;
				const method = proxy[methodName];
				if (method) return method(...args);
				console.error(`method ${methodName} not found`);
				return null;
			} });
			delete vaporPublicPropertiesMap.$forceUpdate;
		}
		return vaporPublicPropertiesMap;
	}
	return publicPropertiesMap;
};
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		if (key === "__v_skip") return true;
		const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
		if (!!(process.env.NODE_ENV !== "production") && key === "__isVue") return true;
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
			} else if (__VUE_OPTIONS_API__ && data !== EMPTY_OBJ && hasOwn(data, key)) {
				accessCache[key] = 2;
				return data[key];
			} else if (hasOwn(props, key)) {
				accessCache[key] = 3;
				return props[key];
			} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) accessCache[key] = 0;
		}
		const publicGetter = getPublicPropertiesMap(!!instance.vapor)[key];
		let cssModule, globalProperties;
		if (publicGetter) {
			if (key === "$attrs") {
				track(instance.attrs, "get", "");
				process.env.NODE_ENV !== "production" && markAttrsAccessed();
			} else if (!!(process.env.NODE_ENV !== "production") && key === "$slots") track(instance, "get", key);
			return publicGetter(instance);
		} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
			accessCache[key] = 4;
			return ctx[key];
		} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
		else if (!!(process.env.NODE_ENV !== "production") && currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
			if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
			else if (instance === currentRenderingInstance) warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
		}
	},
	set({ _: instance }, key, value) {
		const { data, setupState, ctx } = instance;
		if (hasSetupBinding(setupState, key)) {
			setupState[key] = value;
			return true;
		} else if (!!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup && hasOwn(setupState, key)) {
			warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
			return false;
		} else if (__VUE_OPTIONS_API__ && data !== EMPTY_OBJ && hasOwn(data, key)) {
			data[key] = value;
			return true;
		} else if (hasOwn(instance.props, key)) {
			process.env.NODE_ENV !== "production" && warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
			return false;
		}
		if (key[0] === "$" && key.slice(1) in instance) {
			process.env.NODE_ENV !== "production" && warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
			return false;
		} else if (!!(process.env.NODE_ENV !== "production") && key in instance.appContext.config.globalProperties) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			value
		});
		else ctx[key] = value;
		return true;
	},
	has({ _: { data, setupState, accessCache, ctx, appContext, props, type, vapor } }, key) {
		let cssModules;
		return !!(accessCache[key] || __VUE_OPTIONS_API__ && data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(getPublicPropertiesMap(!!vapor), key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
	},
	defineProperty(target, key, descriptor) {
		if (descriptor.get != null) target._.accessCache[key] = 0;
		else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
		return Reflect.defineProperty(target, key, descriptor);
	}
};
if (!!(process.env.NODE_ENV !== "production") && true) PublicInstanceProxyHandlers.ownKeys = (target) => {
	warn$1("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.");
	return Reflect.ownKeys(target);
};
const RuntimeCompiledPublicInstanceProxyHandlers = /*@__PURE__*/ extend$1({}, PublicInstanceProxyHandlers, {
	get(target, key) {
		if (key === Symbol.unscopables) return;
		return PublicInstanceProxyHandlers.get(target, key, target);
	},
	has(_, key) {
		const has = key[0] !== "_" && !isGloballyAllowed(key);
		if (!!(process.env.NODE_ENV !== "production") && !has && PublicInstanceProxyHandlers.has(_, key)) warn$1(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
		return has;
	}
});
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
const warnRuntimeUsage = (method) => warn$1(`${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`);
function defineProps() {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`defineProps`);
	return null;
}
function defineEmits() {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`defineEmits`);
	return null;
}
/**
* Vue `<script setup>` compiler macro for declaring a component's exposed
* instance properties when it is accessed by a parent component via template
* refs.
*
* `<script setup>` components are closed by default - i.e. variables inside
* the `<script setup>` scope is not exposed to parent unless explicitly exposed
* via `defineExpose`.
*
* This is only usable inside `<script setup>`, is compiled away in the
* output and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineexpose}
*/
function defineExpose(exposed) {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`defineExpose`);
}
/**
* Vue `<script setup>` compiler macro for declaring a component's additional
* options. This should be used only for options that cannot be expressed via
* Composition API - e.g. `inheritAttrs`.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineoptions}
*/
function defineOptions(options) {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`defineOptions`);
}
/**
* Vue `<script setup>` compiler macro for providing type hints to IDEs for
* slot name and slot props type checking.
*
* Example usage:
* ```ts
* const slots = defineSlots<{
*   default(props: { msg: string }): any
* }>()
* ```
*
* This is only usable inside `<script setup>`, is compiled away in the
* output and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineslots}
*/
function defineSlots() {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`defineSlots`);
	return null;
}
function defineModel() {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage("defineModel");
}
/**
* Vue `<script setup>` compiler macro for providing props default values when
* using type-based `defineProps` declaration.
*
* Example usage:
* ```ts
* withDefaults(defineProps<{
*   size?: number
*   labels?: string[]
* }>(), {
*   size: 3,
*   labels: () => ['default label']
* })
* ```
*
* This is only usable inside `<script setup>`, is compiled away in the output
* and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/guide/typescript/composition-api.html#typing-component-props}
*/
function withDefaults(props, defaults) {
	if (!!(process.env.NODE_ENV !== "production")) warnRuntimeUsage(`withDefaults`);
	return null;
}
function useSlots() {
	return getContext("useSlots").slots;
}
function useAttrs() {
	return getContext("useAttrs").attrs;
}
function getContext(calledFunctionName) {
	const i = getCurrentGenericInstance();
	if (!!(process.env.NODE_ENV !== "production") && !i) warn$1(`${calledFunctionName}() called without active instance.`);
	if (i.vapor) return i;
	else {
		const ii = i;
		return ii.setupContext || (ii.setupContext = createSetupContext(ii));
	}
}
/**
* @internal
*/
function normalizePropsOrEmits(props) {
	return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
/**
* Runtime helper for merging default declarations. Imported by compiled code
* only.
* @internal
*/
function mergeDefaults(raw, defaults) {
	const props = normalizePropsOrEmits(raw);
	for (const key in defaults) {
		if (key.startsWith("__skip")) continue;
		let opt = props[key];
		if (opt) {
			if (isArray(opt) || isFunction(opt)) opt = props[key] = {
				type: opt,
				default: defaults[key]
			};
			else opt.default = defaults[key];
		} else if (opt === null) opt = props[key] = { default: defaults[key] };
		else if (!!(process.env.NODE_ENV !== "production")) warn$1(`props default key "${key}" has no corresponding declaration.`);
		if (opt && defaults[`__skip_${key}`]) opt.skipFactory = true;
	}
	return props;
}
/**
* Runtime helper for merging model declarations.
* Imported by compiled code only.
* @internal
*/
function mergeModels(a, b) {
	if (!a || !b) return a || b;
	if (isArray(a) && isArray(b)) return a.concat(b);
	return extend$1({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
/**
* Used to create a proxy for the rest element when destructuring props with
* defineProps().
* @internal
*/
function createPropsRestProxy(props, excludedKeys) {
	const ret = {};
	for (const key in props) if (!excludedKeys.includes(key)) Object.defineProperty(ret, key, {
		enumerable: true,
		get: () => props[key]
	});
	return ret;
}
/**
* `<script setup>` helper for persisting the current instance context over
* async/await flows.
*
* `@vue/compiler-sfc` converts the following:
*
* ```ts
* const x = await foo()
* ```
*
* into:
*
* ```ts
* let __temp, __restore
* const x = (([__temp, __restore] = withAsyncContext(() => foo())),__temp=await __temp,__restore(),__temp)
* ```
*/
function withAsyncContext(getAwaitable) {
	const ctx = getCurrentGenericInstance();
	const inSSRSetup = isInSSRComponentSetup;
	if (!!(process.env.NODE_ENV !== "production") && !ctx) warn$1("withAsyncContext called without active current instance. This is likely a bug.");
	let awaitable = getAwaitable();
	setCurrentInstance(null, void 0);
	if (inSSRSetup) setInSSRSetupState(false);
	const restore = () => {
		const stoppedScope = ctx && !ctx.scope.active ? ctx.scope : void 0;
		setCurrentInstance(ctx);
		if (inSSRSetup) setInSSRSetupState(true);
		return stoppedScope;
	};
	const cleanup = () => {
		setCurrentInstance(null, void 0);
		if (inSSRSetup) setInSSRSetupState(false);
	};
	if (isPromise(awaitable)) awaitable = awaitable.catch((e) => {
		const stoppedScope = restore();
		Promise.resolve().then(() => Promise.resolve().then(() => {
			if (stoppedScope) stoppedScope.reset();
			cleanup();
		}));
		throw e;
	});
	return [awaitable, () => {
		const stoppedScope = restore();
		Promise.resolve().then(() => {
			if (stoppedScope) stoppedScope.reset();
			cleanup();
		});
	}];
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
	if (options.beforeCreate) callHook$1(options.beforeCreate, instance, "bc");
	const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
	const checkDuplicateProperties = !!(process.env.NODE_ENV !== "production") ? createDuplicateChecker() : null;
	if (!!(process.env.NODE_ENV !== "production")) {
		const [propsOptions] = instance.propsOptions;
		if (propsOptions) for (const key in propsOptions) checkDuplicateProperties("Props", key);
	}
	if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	if (methods) for (const key in methods) {
		const methodHandler = methods[key];
		if (isFunction(methodHandler)) {
			if (!!(process.env.NODE_ENV !== "production")) Object.defineProperty(ctx, key, {
				value: methodHandler.bind(publicThis),
				configurable: true,
				enumerable: true,
				writable: true
			});
			else ctx[key] = methodHandler.bind(publicThis);
			if (!!(process.env.NODE_ENV !== "production")) checkDuplicateProperties("Methods", key);
		} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
	}
	if (dataOptions) {
		if (!!(process.env.NODE_ENV !== "production") && !isFunction(dataOptions)) warn$1("The data option must be a function. Plain object usage is no longer supported.");
		const data = dataOptions.call(publicThis, publicThis);
		if (!!(process.env.NODE_ENV !== "production") && isPromise(data)) warn$1("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.");
		if (!isObject(data)) process.env.NODE_ENV !== "production" && warn$1(`data() should return an object.`);
		else {
			instance.data = /* @__PURE__ */ reactive(data);
			if (!!(process.env.NODE_ENV !== "production")) for (const key in data) {
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
		if (!!(process.env.NODE_ENV !== "production") && get === NOOP) warn$1(`Computed property "${key}" has no getter.`);
		const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : !!(process.env.NODE_ENV !== "production") ? () => {
			warn$1(`Write operation failed: computed property "${key}" is readonly.`);
		} : NOOP;
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
		if (!!(process.env.NODE_ENV !== "production")) checkDuplicateProperties("Computed", key);
	}
	if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
	if (provideOptions) {
		const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
		Reflect.ownKeys(provides).forEach((key) => {
			provide(key, provides[key]);
		});
	}
	if (created) callHook$1(created, instance, "c");
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
		if (!!(process.env.NODE_ENV !== "production")) checkDuplicateProperties("Inject", key);
	}
}
function callHook$1(hook, instance, type) {
	callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
	let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	if (isString(raw)) {
		const handler = ctx[raw];
		if (isFunction(handler)) watch(getter, handler);
		else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
	} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
	else if (isObject(raw)) {
		if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
		else {
			const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
			if (isFunction(handler)) watch(getter, handler, raw);
			else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
		}
	} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Invalid watch option: "${key}"`, raw);
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
	for (const key in from) if (asMixin && key === "expose") process.env.NODE_ENV !== "production" && warn$1("\"expose\" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.");
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
		return extend$1(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
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
	return to ? extend$1(Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
	if (to) {
		if (isArray(to) && isArray(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
		return extend$1(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from !== null && from !== void 0 ? from : {}));
	} else return from;
}
function mergeWatchOptions(to, from) {
	if (!to) return from;
	if (!from) return to;
	const merged = extend$1(Object.create(null), to);
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
		if (!isFunction(rootComponent)) rootComponent = extend$1({}, rootComponent);
		if (rootProps != null && !isObject(rootProps)) {
			process.env.NODE_ENV !== "production" && warn$1(`root props passed to app.mount() must be an object.`);
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
				if (!!(process.env.NODE_ENV !== "production")) warn$1(`app.config cannot be replaced. Modify individual options instead.`);
			},
			use(plugin, ...options) {
				if (installedPlugins.has(plugin)) process.env.NODE_ENV !== "production" && warn$1(`Plugin has already been applied to target app.`);
				else if (plugin && isFunction(plugin.install)) {
					installedPlugins.add(plugin);
					plugin.install(app, ...options);
				} else if (isFunction(plugin)) {
					installedPlugins.add(plugin);
					plugin(app, ...options);
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1("A plugin must either be a function or an object with an \"install\" function.");
				return app;
			},
			mixin(mixin) {
				if (__VUE_OPTIONS_API__) {
					if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
					else if (!!(process.env.NODE_ENV !== "production")) warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1("Mixins are only available in builds supporting Options API");
				return app;
			},
			component(name, component) {
				if (!!(process.env.NODE_ENV !== "production")) validateComponentName(name, context.config);
				if (!component) return context.components[name];
				if (!!(process.env.NODE_ENV !== "production") && context.components[name]) warn$1(`Component "${name}" has already been registered in target app.`);
				context.components[name] = component;
				return app;
			},
			directive(name, directive) {
				if (!!(process.env.NODE_ENV !== "production")) validateDirectiveName(name);
				if (!directive) return context.directives[name];
				if (!!(process.env.NODE_ENV !== "production") && context.directives[name]) warn$1(`Directive "${name}" has already been registered in target app.`);
				context.directives[name] = directive;
				return app;
			},
			mount(rootContainer, isHydrate, namespace) {
				if (!isMounted) {
					if (!!(process.env.NODE_ENV !== "production") && rootContainer.__vue_app__) warn$1("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
					const instance = mount(app, rootContainer, isHydrate, namespace);
					if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
						app._instance = instance;
						devtoolsInitApp(app, version);
					}
					isMounted = true;
					app._container = rootContainer;
					rootContainer.__vue_app__ = app;
					return getPublicInstance(instance);
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
			},
			onUnmount(cleanupFn) {
				if (!!(process.env.NODE_ENV !== "production") && typeof cleanupFn !== "function") warn$1(`Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`);
				pluginCleanupFns.push(cleanupFn);
			},
			unmount() {
				if (isMounted) {
					callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
					unmount(app);
					if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
						app._instance = null;
						devtoolsUnmountApp(app);
					}
					delete app._container.__vue_app__;
				} else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Cannot unmount an app that is not mounted.`);
			},
			provide(key, value) {
				if (!!(process.env.NODE_ENV !== "production") && key in context.provides) {
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
function useModel(props, name, options = EMPTY_OBJ) {
	const i = getCurrentGenericInstance();
	if (!!(process.env.NODE_ENV !== "production") && !i) {
		warn$1(`useModel() called without active instance.`);
		return /* @__PURE__ */ ref();
	}
	const camelizedName = camelize$1(name);
	if (!!(process.env.NODE_ENV !== "production") && !i.propsOptions[0][camelizedName]) {
		warn$1(`useModel() called with prop "${name}" which is not declared.`);
		return /* @__PURE__ */ ref();
	}
	const hyphenatedName = hyphenate(name);
	const modifiers = getModelModifiers(props, camelizedName, defaultPropGetter);
	const res = customRef((track, trigger) => {
		let localValue;
		let prevPropValue = EMPTY_OBJ;
		let prevSetValue = EMPTY_OBJ;
		let prevEmittedValue;
		watchSyncEffect(() => {
			const propValue = props[camelizedName];
			if (hasChanged(prevPropValue, propValue)) {
				prevPropValue = propValue;
				if (hasChanged(localValue, propValue)) {
					localValue = propValue;
					trigger();
				}
			}
		});
		return {
			get() {
				track();
				return options.get ? options.get(localValue) : localValue;
			},
			set(value) {
				const emittedValue = options.set ? options.set(value) : value;
				if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) return;
				let rawPropKeys;
				let parentPassedModelValue = false;
				let parentPassedModelUpdater = false;
				if (i.rawKeys) rawPropKeys = i.rawKeys();
				else {
					const rawProps = i.vnode.props;
					rawPropKeys = rawProps && Object.keys(rawProps);
				}
				if (rawPropKeys) {
					for (const key of rawPropKeys) if (key === name || key === camelizedName || key === hyphenatedName) parentPassedModelValue = true;
					else if (key === `onUpdate:${name}` || key === `onUpdate:${camelizedName}` || key === `onUpdate:${hyphenatedName}`) parentPassedModelUpdater = true;
				}
				const hasVModel = parentPassedModelValue && parentPassedModelUpdater;
				if (!hasVModel) {
					localValue = value;
					trigger();
				}
				i.emit(`update:${name}`, emittedValue);
				if (hasChanged(value, prevSetValue) && (hasChanged(value, emittedValue) && !hasChanged(emittedValue, prevEmittedValue) || hasVModel && prevSetValue !== EMPTY_OBJ && !hasChanged(emittedValue, localValue))) trigger();
				prevSetValue = value;
				prevEmittedValue = emittedValue;
			}
		};
	});
	res[Symbol.iterator] = () => {
		let i = 0;
		return { next() {
			if (i < 2) return {
				value: i++ ? modifiers || EMPTY_OBJ : res,
				done: false
			};
			else return { done: true };
		} };
	};
	return res;
}
const getModelModifiers = (props, modelName, getter) => {
	return getter(props, getModifierPropName(modelName)) || getter(props, `${camelize$1(modelName)}Modifiers`) || getter(props, `${hyphenate(modelName)}Modifiers`);
};
//#endregion
//#region packages/runtime-core/src/componentEmits.ts
function emit$1(instance, event, ...rawArgs) {
	return baseEmit(instance, instance.vnode.props || EMPTY_OBJ, defaultPropGetter, event, ...rawArgs);
}
/**
* @internal for vapor only
*/
function baseEmit(instance, props, getter, event, ...rawArgs) {
	if (instance.isUnmounted) return;
	if (!!(process.env.NODE_ENV !== "production")) {
		const { emitsOptions, propsOptions } = instance;
		if (emitsOptions) {
			if (!(event in emitsOptions) && true) {
				if (!propsOptions || !propsOptions[0] || !(toHandlerKey$1(camelize$1(event)) in propsOptions[0])) warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey$1(camelize$1(event))}" prop.`);
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
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentEmit(instance, event, args);
	if (!!(process.env.NODE_ENV !== "production")) {
		const lowerCaseEvent = event.toLowerCase();
		if (lowerCaseEvent !== event && getter(props, toHandlerKey$1(lowerCaseEvent))) warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
	}
	let handlerName;
	let handler = getter(props, handlerName = toHandlerKey$1(event)) || getter(props, handlerName = toHandlerKey$1(camelize$1(event)));
	if (!handler && isModelListener) handler = getter(props, handlerName = toHandlerKey$1(hyphenate(event)));
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
function normalizeEmitsOptions$1(comp, appContext, asMixin = false) {
	const cache = __VUE_OPTIONS_API__ && asMixin ? mixinEmitsCache : appContext.emitsCache;
	const cached = cache.get(comp);
	if (cached !== void 0) return cached;
	const raw = comp.emits;
	let normalized = {};
	let hasExtends = false;
	if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
		const extendEmits = (raw) => {
			const normalizedFromExtend = normalizeEmitsOptions$1(raw, appContext, true);
			if (normalizedFromExtend) {
				hasExtends = true;
				extend$1(normalized, normalizedFromExtend);
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
	else extend$1(normalized, raw);
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
function renderComponentRoot(instance) {
	const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
	const prev = setCurrentRenderingInstance(instance);
	let result;
	let fallthroughAttrs;
	if (!!(process.env.NODE_ENV !== "production")) accessedAttrs = false;
	try {
		if (vnode.shapeFlag & 4) {
			const proxyToUse = withProxy || proxy;
			const thisProxy = !!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup ? new Proxy(proxyToUse, { get(target, key, receiver) {
				warn$1(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
				return Reflect.get(target, key, receiver);
			} }) : proxyToUse;
			result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props, setupState, data, ctx));
			fallthroughAttrs = attrs;
		} else {
			const render = Component;
			if (!!(process.env.NODE_ENV !== "production") && attrs === props) markAttrsAccessed();
			result = normalizeVNode(render.length > 1 ? render(!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props, !!(process.env.NODE_ENV !== "production") ? {
				get attrs() {
					markAttrsAccessed();
					return /* @__PURE__ */ shallowReadonly(attrs);
				},
				slots,
				emit
			} : {
				attrs,
				slots,
				emit
			}) : render(!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props, null));
			fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
		}
	} catch (err) {
		blockStack.length = 0;
		handleError(err, instance, 1);
		result = createVNode(Comment$1);
	}
	let root = result;
	let setRoot = void 0;
	if (!!(process.env.NODE_ENV !== "production") && result.patchFlag > 0 && result.patchFlag & 2048) [root, setRoot] = getChildRoot(result);
	if (fallthroughAttrs && inheritAttrs !== false) {
		const keys = Object.keys(fallthroughAttrs);
		const { shapeFlag } = root;
		if (keys.length) {
			if (shapeFlag & 7) {
				if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
				root = cloneVNode(root, fallthroughAttrs, false, true);
			} else if (!!(process.env.NODE_ENV !== "production") && !accessedAttrs && root.type !== Comment$1) warnExtraneousAttributes(attrs);
		}
	}
	if (vnode.dirs) {
		if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(root)) warn$1("Runtime directive used on component with non-element root node. The directives will not function as intended.");
		root = cloneVNode(root, null, false, true);
		root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	}
	if (vnode.transition) {
		const child = isTeleport(root.type) ? getInnerChild$1(root) || root : root;
		if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(child)) warn$1("Component inside <Transition> renders non-element root node that cannot be animated.");
		setTransitionHooks(child, vnode.transition);
	}
	if (!!(process.env.NODE_ENV !== "production") && setRoot) setRoot(root);
	else result = root;
	setCurrentRenderingInstance(prev);
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
	else if (!!(process.env.NODE_ENV !== "production") && childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) return getChildRoot(childRoot);
	const index = rawChildren.indexOf(childRoot);
	const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
	const setRoot = (updatedRoot) => {
		rawChildren[index] = updatedRoot;
		if (dynamicChildren) {
			if (dynamicIndex > -1) dynamicChildren[dynamicIndex] = updatedRoot;
			else if (updatedRoot.patchFlag > 0) vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
		}
	};
	return [normalizeVNode(childRoot), setRoot];
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
		if (isVNode(child)) {
			if (child.type !== Comment$1 || child.children === "v-if") {
				if (singleRoot) return;
				else {
					singleRoot = child;
					if (!!(process.env.NODE_ENV !== "production") && recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) return filterSingleRoot(singleRoot.children);
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
	return vnode.shapeFlag & 7 || vnode.type === Comment$1;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	const { props: prevProps, children: prevChildren, component } = prevVNode;
	const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	const emits = component.emitsOptions;
	if (!!(process.env.NODE_ENV !== "production") && (prevChildren || nextChildren) && isHmrUpdating) return true;
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
		if (!hasOwn(prevProps, key) || hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
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
	if (!!(process.env.NODE_ENV !== "production")) validateProps(rawProps || {}, props, instance.propsOptions[0]);
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
function updateProps$1(instance, rawProps, rawPrevProps, optimized) {
	const { props, attrs, vnode: { patchFlag } } = instance;
	const rawCurrentProps = /* @__PURE__ */ toRaw(props);
	const [options] = instance.propsOptions;
	let hasAttrsChanged = false;
	if (!(!!(process.env.NODE_ENV !== "production") && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
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
						const camelizedKey = camelize$1(key);
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
	if (!!(process.env.NODE_ENV !== "production")) validateProps(rawProps || {}, props, instance.propsOptions[0]);
}
function setFullProps(instance, rawProps, props, attrs) {
	const [options, needCastKeys] = instance.propsOptions;
	let hasAttrsChanged = false;
	let rawCastValues;
	if (rawProps) for (let key in rawProps) {
		if (isReservedProp(key)) continue;
		const value = rawProps[key];
		let camelKey;
		if (options && hasOwn(options, camelKey = camelize$1(key))) {
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
function normalizePropsOptions$1(comp, appContext, asMixin = false) {
	const cache = __VUE_OPTIONS_API__ && asMixin ? mixinPropsCache : appContext.propsCache;
	const cached = cache.get(comp);
	if (cached) return cached;
	const raw = comp.props;
	const normalized = {};
	const needCastKeys = [];
	let hasExtends = false;
	if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
		const extendProps = (raw) => {
			hasExtends = true;
			const [props, keys] = normalizePropsOptions$1(raw, appContext, true);
			extend$1(normalized, props);
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
		if (!!(process.env.NODE_ENV !== "production") && !isString(raw[i])) warn$1(`props must be strings when using array syntax.`, raw[i]);
		const normalizedKey = camelize$1(raw[i]);
		if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
	}
	else if (raw) {
		if (!!(process.env.NODE_ENV !== "production") && !isObject(raw)) warn$1(`invalid props options`, raw);
		for (const key in raw) {
			const normalizedKey = camelize$1(key);
			if (validatePropName(normalizedKey)) {
				const opt = raw[key];
				const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend$1({}, opt);
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
	else if (!!(process.env.NODE_ENV !== "production")) warn$1(`Invalid prop name: "${key}" is a reserved property.`);
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
	const camelizePropsKey = Object.keys(rawProps).map((key) => camelize$1(key));
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
	if (validator && !validator(value, !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(resolvedProps) : resolvedProps)) warn$1("Invalid prop: custom validator check failed for prop \"" + key + "\".");
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
	let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$1).join(" | ")}`;
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
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
	if (rawSlot._n) return rawSlot;
	const normalized = withCtx((...args) => {
		if (!!(process.env.NODE_ENV !== "production") && currentInstance && !currentInstance.vapor && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
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
			if (!!(process.env.NODE_ENV !== "production") && true) warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
			const normalized = normalizeSlotValue(value);
			slots[key] = () => normalized;
		}
	}
};
const normalizeVNodeSlots = (instance, children) => {
	if (!!(process.env.NODE_ENV !== "production") && !isKeepAlive(instance.vnode) && true) warn$1("Non-function value encountered for default slot. Prefer function slots for better performance.");
	const normalized = normalizeSlotValue(children);
	instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
	for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
};
const initSlots$1 = (instance, children, optimized) => {
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
			if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
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
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsPerfStart(instance, type, getNow$1());
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
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsPerfEnd(instance, type, getNow$1());
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
//#region packages/runtime-core/src/featureFlags.ts
let initialized = false;
/**
* This is only called in esm-bundler builds.
* It is called when a renderer is created, in `baseCreateRenderer` so that
* importing runtime-core is side-effects free.
*/
function initFeatureFlags() {
	if (initialized) return;
	const needWarn = [];
	if (typeof __VUE_OPTIONS_API__ !== "boolean") {
		process.env.NODE_ENV !== "production" && needWarn.push(`__VUE_OPTIONS_API__`);
		getGlobalThis().__VUE_OPTIONS_API__ = true;
	}
	if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
		process.env.NODE_ENV !== "production" && needWarn.push(`__VUE_PROD_DEVTOOLS__`);
		getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
	}
	if (typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ !== "boolean") {
		process.env.NODE_ENV !== "production" && needWarn.push(`__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`);
		getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
	}
	if (!!(process.env.NODE_ENV !== "production") && needWarn.length) {
		const multi = needWarn.length > 1;
		console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.\n\nFor more details, see https://link.vuejs.org/feature-flags.`);
	}
	initialized = true;
}
//#endregion
//#region packages/runtime-core/src/renderer.ts
const MoveType = {
	"ENTER": 0,
	"0": "ENTER",
	"LEAVE": 1,
	"1": "LEAVE",
	"REORDER": 2,
	"2": "REORDER"
};
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
function createHydrationRenderer(options) {
	return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
	initFeatureFlags();
	const target = getGlobalThis();
	target.__VUE__ = true;
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
	const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
	const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!(process.env.NODE_ENV !== "production") && isHmrUpdating ? false : !!n2.dynamicChildren) => {
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
		if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
			if (n2.dynamicChildren === EMPTY_ARR) n2.dynamicChildren = [];
			n2.dynamicChildren.hasOnce = true;
		}
		const { type, ref, shapeFlag } = n2;
		switch (type) {
			case Text$1:
				processText(n1, n2, container, anchor);
				break;
			case Comment$1:
				processCommentNode(n1, n2, container, anchor);
				break;
			case Static:
				if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
				else if (!!(process.env.NODE_ENV !== "production")) patchStaticNode(n1, n2, container, namespace);
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
			else if (!!(process.env.NODE_ENV !== "production")) warn$1("Invalid VNode type:", type, `(${typeof type})`);
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
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
			def(el, "__vnode", vnode, true);
			def(el, "__vueParentComponent", parentComponent, true);
		}
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
		if (transition) performTransitionEnter(el, transition, () => hostInsert(el, container, anchor), parentSuspense);
		else hostInsert(el, container, anchor);
		if ((vnodeHook = props && props.onVnodeMounted) || dirs) {
			const isHmr = !!(process.env.NODE_ENV !== "production") && isHmrUpdating;
			queuePostRenderEffect(() => {
				let prev;
				if (!!(process.env.NODE_ENV !== "production")) prev = setHmrUpdating(isHmr);
				try {
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
				} finally {
					if (!!(process.env.NODE_ENV !== "production")) setHmrUpdating(prev);
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
			const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
			patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const el = n2.el = n1.el;
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) el.__vnode = n2;
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
		if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating || dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
		if (dynamicChildren) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			if (!!(process.env.NODE_ENV !== "production")) traverseStaticChildren(n1, n2);
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
			const oldEl = oldVNode.el || resolveAsyncComponentPlaceholder(oldVNode);
			const container = oldEl && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldEl) : fallbackContainer;
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
		if (!!(process.env.NODE_ENV !== "production") && (isHmrUpdating || patchFlag & 2048)) {
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
			if (!!(process.env.NODE_ENV !== "production")) traverseStaticChildren(n1, n2);
			else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
		} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		n2.slotScopeIds = slotScopeIds;
		if (n2.type.__vapor) {
			if (n1 == null) {
				if (n2.shapeFlag & 512) getVaporInterface(parentComponent, n2).activate(n2, container, anchor, parentComponent, parentSuspense);
				else getVaporInterface(parentComponent, n2).mount(n2, container, anchor, parentComponent, parentSuspense);
			} else getVaporInterface(parentComponent, n2).update(n1, n2, shouldUpdateComponent(n1, n2, optimized));
		} else if (n1 == null) {
			if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
			else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
		} else updateComponent(n1, n2, optimized);
	};
	const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
		const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
		if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) registerHMR(instance);
		if (!!(process.env.NODE_ENV !== "production")) {
			pushWarningContext(initialVNode);
			startMeasure(instance, `mount`);
		}
		if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
		if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `init`);
		setupComponent$1(instance, false, optimized);
		if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `init`);
		if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) initialVNode.el = null;
		if (instance.asyncDep) {
			if (parentSuspense) {
				const hydratedEl = instance.vnode.el;
				parentSuspense.registerDep(instance, (setupResult) => {
					const { vnode } = instance;
					if (!!(process.env.NODE_ENV !== "production")) pushWarningContext(vnode);
					handleSetupResult$1(instance, setupResult, false);
					if (hydratedEl) vnode.el = hydratedEl;
					const placeholder = !hydratedEl && instance.subTree.el;
					setupRenderEffect(instance, vnode, hostParentNode(hydratedEl || instance.subTree.el), hydratedEl ? null : getNextHostNode(instance.subTree), parentSuspense, namespace, optimized);
					if (placeholder) {
						vnode.placeholder = null;
						hostRemove(placeholder);
					}
					updateHOCHostEl(instance, vnode.el);
					if (!!(process.env.NODE_ENV !== "production")) popWarningContext();
				});
			}
			if (!initialVNode.el) {
				const placeholder = instance.subTree = createVNode(Comment$1);
				processCommentNode(null, placeholder, container, anchor);
				initialVNode.placeholder = placeholder.el;
			}
		} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		if (!!(process.env.NODE_ENV !== "production")) {
			popWarningContext();
			endMeasure(instance, `mount`);
		}
	};
	const updateComponent = (n1, n2, optimized) => {
		const instance = n2.component = n1.component;
		if (shouldUpdateComponent(n1, n2, optimized)) {
			if (instance.asyncDep && !instance.asyncResolved) {
				if (!!(process.env.NODE_ENV !== "production")) pushWarningContext(n2);
				n2.el = n1.el;
				n2.placeholder = n1.placeholder;
				updateComponentPreRender(instance, n2, optimized);
				if (!!(process.env.NODE_ENV !== "production")) popWarningContext();
				return;
			} else {
				instance.next = n2;
				instance.effect.run();
			}
		} else {
			n2.el = n1.el;
			n2.placeholder = n1.placeholder;
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
			if (!!(process.env.NODE_ENV !== "production")) {
				this.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
				this.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
			}
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
						if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `render`);
						instance.subTree = renderComponentRoot(instance);
						if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `render`);
						if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `hydrate`);
						hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `hydrate`);
					};
					if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
					else hydrateSubTree();
				} else {
					if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
					if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `render`);
					const subTree = instance.subTree = renderComponentRoot(instance);
					if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `render`);
					if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `patch`);
					patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
					if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `patch`);
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
				if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentAdded(instance);
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
				if (!!(process.env.NODE_ENV !== "production")) pushWarningContext(next || instance.vnode);
				toggleRecurse(instance, false);
				if (next) {
					next.el = vnode.el;
					updateComponentPreRender(instance, next, optimized);
				} else next = vnode;
				if (bu) invokeArrayFns(bu);
				if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
				if (next.ibu) next.ibu();
				toggleRecurse(instance, true);
				if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `render`);
				const nextTree = renderComponentRoot(instance);
				if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `render`);
				const prevTree = instance.subTree;
				instance.subTree = nextTree;
				if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `patch`);
				patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
				if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `patch`);
				next.el = nextTree.el;
				if (originNext === null) updateHOCHostEl(instance, nextTree.el);
				if (u) queuePostRenderEffect(u, void 0, parentSuspense);
				if ((vnodeHook = next.props && next.props.onVnodeUpdated) || next.iu) queuePostRenderEffect(() => {
					vnodeHook && invokeVNodeHook(vnodeHook, parent, next, vnode);
					next.iu && next.iu();
				}, void 0, parentSuspense);
				if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentUpdated(instance);
				if (!!(process.env.NODE_ENV !== "production")) popWarningContext();
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
		updateProps$1(instance, nextVNode.props, prevProps, optimized);
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
			const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
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
			const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			i++;
		}
		while (i <= e1 && i <= e2) {
			const n1 = c1[e1];
			const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
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
					patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (nextChild.key != null) {
					if (!!(process.env.NODE_ENV !== "production") && keyToNewIndexMap.has(nextChild.key)) warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
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
		if (isVaporComponent$1(type) || type === VaporSlot) {
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
		if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) optimized = false;
		if (ref != null) {
			const prevSub = setActiveSub();
			setRef(ref, null, parentSuspense, vnode, true);
			setActiveSub(prevSub);
		}
		if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) parentComponent.renderCache[cacheIndex] = void 0;
		if (shapeFlag & 256) {
			if (isVaporComponent$1(vnode.type)) getVaporInterface(parentComponent, vnode).deactivate(vnode, parentComponent.ctx.getStorageContainer(), parentSuspense);
			else parentComponent.ctx.deactivate(vnode);
			return;
		}
		if (shapeFlag & 6 && isVaporComponent$1(type)) {
			getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove, parentSuspense);
			return;
		}
		const shouldInvokeDirs = shapeFlag & 1 && dirs;
		const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
		let vnodeHook;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
		else {
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
		const isFragment = type === Fragment;
		if (isFragment && !transition) {
			removeFragment(el, anchor);
			return;
		}
		if (type === Static) {
			removeStaticNode(vnode);
			if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
			return;
		}
		const leavingNode = isFragment ? getTransitionRoot(vnode) : vnode;
		const performRemove = () => {
			if (isFragment) {
				if (hostParentNode(el)) removeFragment(el, anchor);
			} else hostRemove(el);
		};
		if (transition) {
			let leavingEl = leavingNode && leavingNode.el;
			let isElement = !!(leavingNode && leavingNode.shapeFlag & 1);
			if (isFragment && leavingNode && isVaporComponent$1(leavingNode.type)) {
				leavingEl = getVaporInterface(leavingNode.component, leavingNode).getTransitionElement(leavingNode);
				isElement = !!leavingEl;
			}
			performTransitionLeave(leavingEl || el, transition, performRemove, isElement);
		} else performRemove();
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
		if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) unregisterHMR(instance);
		const { bum, scope, effect, subTree, um, m, a } = instance;
		invalidateMount(m);
		invalidateMount(a);
		if (bum) invokeArrayFns(bum);
		scope.stop();
		if (effect) {
			effect.stop();
			unmount(subTree, instance, parentSuspense, doRemove);
		} else if (instance.vnode.el && subTree) {
			subTree.transition = instance.vnode.transition;
			unmount(subTree, instance, parentSuspense, doRemove);
		}
		if (um) queuePostRenderEffect(um, void 0, parentSuspense);
		queuePostRenderEffect(() => instance.isUnmounted = true, void 0, parentSuspense);
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentRemoved(instance);
	};
	const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
		for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	};
	const getNextHostNode = (vnode) => {
		if (vnode.shapeFlag & 6) {
			if (isVaporComponent$1(vnode.type)) return hostNextSibling(vnode.anchor);
			return getNextHostNode(vnode.component.subTree);
		}
		if (vnode.shapeFlag & 128) return vnode.suspense.next();
		const el = hostNextSibling(vnode.anchor || vnode.el);
		const teleportEnd = el && el[TeleportEndKey];
		return teleportEnd ? hostNextSibling(teleportEnd) : el;
	};
	const render = (vnode, container, namespace) => {
		flushOnAppMount(() => {
			if (vnode == null) {
				if (container._vnode) unmount(container._vnode, null, null, true);
			} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
			container._vnode = vnode;
		}, vnode && container._vnode ? void 0 : vnode && vnode.component ? vnode.component.uid : getNextUid());
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
		if (!!(process.env.NODE_ENV !== "production")) app._context.reload = () => {
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
		if (c2.type === Text$1) {
			if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
			c2.el = c1.el;
		}
		if (c2.type === Comment$1 && !c2.el) c2.el = c1.el;
		if (!!(process.env.NODE_ENV !== "production")) c2.el && (c2.el.__vnode = c2);
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
	if (!!(process.env.NODE_ENV !== "production") && !res) warn$1("Vapor component found in vdom tree but vapor-in-vdom interop was not installed. Make sure to install it:\n```\nimport { vaporInteropPlugin } from 'vue'\napp.use(vaporInteropPlugin)\n```");
	return res;
}
function isVaporComponent$1(type) {
	if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating && hmrDirtyComponentsMode.has(type)) return hmrDirtyComponentsMode.get(type);
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
		if (!!(process.env.NODE_ENV !== "production") && subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
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
let suspenseId = 0;
const Suspense = {
	name: "Suspense",
	__isSuspense: true,
	process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
		if (n1 == null) mountSuspense(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals);
		else {
			if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback && !parentSuspense.isHydrating) {
				n2.suspense = n1.suspense;
				n2.suspense.vnode = n2;
				n2.el = n1.el;
				return;
			}
			patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, rendererInternals);
		}
	},
	hydrate: hydrateSuspense,
	normalize: normalizeSuspenseChildren
};
function triggerEvent(vnode, name) {
	const eventListener = vnode.props && vnode.props[name];
	if (isFunction(eventListener)) eventListener();
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
	const { p: patch, o: { createElement } } = rendererInternals;
	const hiddenContainer = createElement("div");
	const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals);
	patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds);
	if (suspense.deps > 0) {
		triggerEvent(vnode, "onPending");
		triggerEvent(vnode, "onFallback");
		patch(null, vnode.ssFallback, container, anchor, parentComponent, null, namespace, slotScopeIds);
		setActiveBranch(suspense, vnode.ssFallback);
	} else suspense.resolve(false, true);
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
	const suspense = n2.suspense = n1.suspense;
	suspense.vnode = n2;
	n2.el = n1.el;
	const newBranch = n2.ssContent;
	const newFallback = n2.ssFallback;
	const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
	if (pendingBranch) {
		suspense.pendingBranch = newBranch;
		if (isSameVNodeType(pendingBranch, newBranch)) {
			suspense.deps++;
			patch(pendingBranch, newBranch, isHydrating ? container : suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
			suspense.deps--;
			if (suspense.deps <= 0) suspense.resolve();
			else if (isInFallback) {
				if (!isHydrating && !suspense.isFallbackMountPending) {
					patch(activeBranch, newFallback, container, anchor, parentComponent, null, namespace, slotScopeIds, optimized);
					setActiveBranch(suspense, newFallback);
				}
			}
		} else {
			suspense.pendingId = suspenseId++;
			if (isHydrating) {
				suspense.isHydrating = false;
				suspense.activeBranch = pendingBranch;
			} else unmount(pendingBranch, parentComponent, suspense);
			suspense.deps = 0;
			for (let i = 0; i < suspense.effects.length; i++) {
				const effect = suspense.effects[i];
				if (effect.flags & 8) queuePostFlushCb(effect);
			}
			suspense.effects.length = 0;
			suspense.hiddenContainer = createElement("div");
			if (isInFallback) {
				patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
				if (suspense.deps <= 0) suspense.resolve();
				else if (!suspense.isFallbackMountPending) {
					patch(activeBranch, newFallback, container, anchor, parentComponent, null, namespace, slotScopeIds, optimized);
					setActiveBranch(suspense, newFallback);
				}
			} else if (activeBranch && isSameVNodeType(activeBranch, newBranch)) {
				patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
				suspense.resolve(true);
			} else {
				patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
				if (suspense.deps <= 0) suspense.resolve();
			}
		}
	} else if (activeBranch && isSameVNodeType(activeBranch, newBranch)) {
		patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
		setActiveBranch(suspense, newBranch);
	} else {
		triggerEvent(n2, "onPending");
		suspense.pendingBranch = newBranch;
		if (newBranch.shapeFlag & 512) suspense.pendingId = newBranch.component.suspenseId;
		else suspense.pendingId = suspenseId++;
		patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
		if (suspense.deps <= 0) suspense.resolve();
		else {
			const { timeout, pendingId } = suspense;
			if (timeout > 0) setTimeout(() => {
				if (suspense.pendingId === pendingId) suspense.fallback(newFallback);
			}, timeout);
			else if (timeout === 0) suspense.fallback(newFallback);
		}
	}
}
let hasWarned = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
	/* v8 ignore start */
	if (!!(process.env.NODE_ENV !== "production") && !hasWarned) {
		hasWarned = true;
		console[console.info ? "info" : "log"](`<Suspense> is an experimental feature and its API will likely change.`);
	}
	/* v8 ignore stop */
	const { p: patch, m: move, um: unmount, n: next, o: { parentNode } } = rendererInternals;
	let parentSuspenseId;
	const isSuspensible = isVNodeSuspensible(vnode);
	if (isSuspensible) {
		if (parentSuspense && parentSuspense.pendingBranch) {
			parentSuspenseId = parentSuspense.pendingId;
			parentSuspense.deps++;
		}
	}
	const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
	if (!!(process.env.NODE_ENV !== "production")) assertNumber(timeout, `Suspense timeout`);
	const initialAnchor = anchor;
	const suspense = {
		vnode,
		parent: parentSuspense,
		parentComponent,
		namespace,
		container,
		hiddenContainer,
		deps: 0,
		pendingId: suspenseId++,
		timeout: typeof timeout === "number" ? timeout : -1,
		activeBranch: null,
		isFallbackMountPending: false,
		pendingBranch: null,
		isInFallback: !isHydrating,
		isHydrating,
		isUnmounted: false,
		effects: [],
		resolve(resume = false, sync = false) {
			if (!!(process.env.NODE_ENV !== "production")) {
				if (!resume && !suspense.pendingBranch) throw new Error(`suspense.resolve() is called without a pending branch.`);
				if (suspense.isUnmounted) throw new Error(`suspense.resolve() is called on an already unmounted suspense boundary.`);
			}
			const { vnode, activeBranch, pendingBranch, pendingId, effects, parentComponent, container, isInFallback } = suspense;
			let delayEnter = false;
			if (suspense.isHydrating) suspense.isHydrating = false;
			else if (!resume) {
				delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
				let hasUpdatedAnchor = false;
				if (delayEnter) activeBranch.transition.afterLeave = () => {
					if (pendingId === suspense.pendingId) {
						move(pendingBranch, container, anchor === initialAnchor && !hasUpdatedAnchor ? next(activeBranch) : anchor, 0, parentComponent);
						queuePostFlushCb(effects);
						if (isInFallback && vnode.ssFallback) vnode.ssFallback.el = null;
					}
				};
				if (activeBranch && !suspense.isFallbackMountPending) {
					if (parentNode(activeBranch.el) === container) {
						anchor = next(activeBranch);
						hasUpdatedAnchor = true;
					}
					unmount(activeBranch, parentComponent, suspense, true);
					if (!delayEnter && isInFallback && vnode.ssFallback) queuePostRenderEffect(() => vnode.ssFallback.el = null, void 0, suspense);
				}
				if (!delayEnter) move(pendingBranch, container, anchor, 0, parentComponent);
			}
			suspense.isFallbackMountPending = false;
			setActiveBranch(suspense, pendingBranch);
			suspense.pendingBranch = null;
			suspense.isInFallback = false;
			let parent = suspense.parent;
			let hasUnresolvedAncestor = false;
			while (parent) {
				if (parent.pendingBranch) {
					for (let i = 0; i < effects.length; i++) parent.effects.push(effects[i]);
					hasUnresolvedAncestor = true;
					break;
				}
				parent = parent.parent;
			}
			if (!hasUnresolvedAncestor && !delayEnter) queuePostFlushCb(effects);
			suspense.effects = [];
			if (isSuspensible) {
				if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
					parentSuspenseId = void 0;
					parentSuspense.deps--;
					if (parentSuspense.deps === 0 && !sync) parentSuspense.resolve();
				}
			}
			triggerEvent(vnode, "onResolve");
		},
		fallback(fallbackVNode) {
			if (!suspense.pendingBranch) return;
			const { vnode, activeBranch, parentComponent, container, namespace } = suspense;
			triggerEvent(vnode, "onFallback");
			const anchor = next(activeBranch);
			const mountFallback = () => {
				suspense.isFallbackMountPending = false;
				if (!suspense.isInFallback) return;
				const latestFallback = suspense.vnode.ssFallback;
				patch(null, latestFallback, container, anchor, parentComponent, null, namespace, slotScopeIds, optimized);
				setActiveBranch(suspense, latestFallback);
			};
			const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
			if (delayEnter) {
				suspense.isFallbackMountPending = true;
				activeBranch.transition.afterLeave = mountFallback;
			}
			suspense.isInFallback = true;
			unmount(activeBranch, parentComponent, null, true);
			if (!delayEnter) mountFallback();
		},
		move(container, anchor, type) {
			suspense.activeBranch && move(suspense.activeBranch, container, anchor, type, parentComponent);
			suspense.container = container;
		},
		next() {
			return suspense.activeBranch && next(suspense.activeBranch);
		},
		registerDep(instance, onResolve) {
			const isInPendingSuspense = !!suspense.pendingBranch;
			if (isInPendingSuspense) suspense.deps++;
			instance.asyncDep.catch((err) => {
				handleError(err, instance, 0);
			}).then((asyncSetupResult) => {
				if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) return;
				setCurrentInstance(null, void 0);
				if (!instance.scope.active) {
					if (isInPendingSuspense && --suspense.deps === 0) suspense.resolve();
					return;
				}
				instance.asyncResolved = true;
				onResolve(asyncSetupResult);
				if (isInPendingSuspense && --suspense.deps === 0) suspense.resolve();
			});
		},
		unmount(parentSuspense, doRemove) {
			suspense.isUnmounted = true;
			if (suspense.activeBranch) unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
			if (suspense.pendingBranch) unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
		}
	};
	return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
	const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement("div"), null, namespace, slotScopeIds, optimized, rendererInternals, true);
	const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
	if (suspense.deps === 0) suspense.resolve(false, true);
	return result;
}
function normalizeSuspenseChildren(vnode) {
	const { shapeFlag, children } = vnode;
	const isSlotChildren = shapeFlag & 32;
	vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
	vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment$1);
}
function normalizeSuspenseSlot(s) {
	let block;
	if (isFunction(s)) {
		const trackBlock = isBlockTreeEnabled && s._c;
		if (trackBlock) {
			s._d = false;
			openBlock();
		}
		s = s();
		if (trackBlock) {
			s._d = true;
			block = currentBlock;
			closeBlock();
		}
	}
	if (isArray(s)) {
		const singleChild = filterSingleRoot(s);
		if (!!(process.env.NODE_ENV !== "production") && !singleChild && s.filter((child) => child !== NULL_DYNAMIC_COMPONENT).length > 0) warn$1(`<Suspense> slots expect a single root node.`);
		s = singleChild;
	}
	s = normalizeVNode(s);
	if (block && !s.dynamicChildren) s.dynamicChildren = block.filter((c) => c !== s);
	return s;
}
function queueEffectWithSuspense(fn, id, suspense) {
	if (suspense && suspense.pendingBranch) {
		if (isArray(fn)) suspense.effects.push(...fn);
		else suspense.effects.push(fn);
	} else queuePostFlushCb(fn, id);
}
function setActiveBranch(suspense, branch) {
	suspense.activeBranch = branch;
	const { vnode, parentComponent } = suspense;
	let el = branch.el;
	while (!el && branch.component) {
		branch = branch.component.subTree;
		el = branch.el;
	}
	vnode.el = el;
	if (parentComponent && parentComponent.subTree === vnode) {
		parentComponent.vnode.el = el;
		updateHOCHostEl(parentComponent, el);
	}
}
function isVNodeSuspensible(vnode) {
	const suspensible = vnode.props && vnode.props.suspensible;
	return suspensible != null && suspensible !== false;
}
//#endregion
//#region packages/runtime-core/src/vnode.ts
const Fragment = Symbol.for("v-fgt");
const Text$1 = Symbol.for("v-txt");
const Comment$1 = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const VaporSlot = Symbol.for("v-vps");
const blockStack = [];
let currentBlock = null;
/**
* Open a block.
* This must be called before `createBlock`. It cannot be part of `createBlock`
* because the children of the block are evaluated before `createBlock` itself
* is called. The generated code typically looks like this:
*
* ```js
* function render() {
*   return (openBlock(),createBlock('div', null, [...]))
* }
* ```
* disableTracking is true when creating a v-for fragment block, since a v-for
* fragment always diffs its children.
*
* @private
*/
function openBlock(disableTracking = false) {
	blockStack.push(currentBlock = disableTracking ? null : []);
}
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
function setupBlock(vnode) {
	vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
	closeBlock();
	if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
	return vnode;
}
/**
* @private
*/
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
/**
* Create a block root vnode. Takes the same exact arguments as `createVNode`.
* A block root keeps track of dynamic nodes within the block in the
* `dynamicChildren` array.
*
* @private
*/
function createBlock(type, props, children, patchFlag, dynamicProps) {
	return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
	return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
	if (!!(process.env.NODE_ENV !== "production") && n2.shapeFlag & 6 && n1.component) {
		const dirtyInstances = hmrDirtyComponents.get(n2.type);
		if (dirtyInstances && dirtyInstances.has(n1.component)) {
			n1.shapeFlag &= -257;
			n2.shapeFlag &= -513;
			return false;
		}
	}
	return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
/**
* Internal API for registering an arguments transform for createVNode
* used for creating stubs in the test-utils
* It is *internal* but needs to be exposed for test-utils to pick up proper
* typings
*/
function transformVNodeArgs(transformer) {
	vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args) => {
	return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
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
	if (!!(process.env.NODE_ENV !== "production") && vnode.key !== vnode.key) warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
	if (!!(process.env.NODE_ENV !== "production") && props && vnode.shapeFlag & 1) {
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
const createVNode = !!(process.env.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	if (!type || type === NULL_DYNAMIC_COMPONENT) {
		if (!!(process.env.NODE_ENV !== "production") && !type) warn$1(`Invalid vnode type when creating vnode: ${type}.`);
		type = Comment$1;
	}
	if (isVNode(type)) {
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
		if (klass && !isString(klass)) props.class = normalizeClass$1(klass);
		if (isObject(style)) {
			if (/* @__PURE__ */ isProxy(style) && !isArray(style)) style = extend$1({}, style);
			props.style = normalizeStyle$1(style);
		}
	}
	const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
	if (!!(process.env.NODE_ENV !== "production") && shapeFlag & 4 && /* @__PURE__ */ isProxy(type)) {
		type = /* @__PURE__ */ toRaw(type);
		warn$1("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `\nComponent that was made reactive: `, type);
	}
	return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
	if (!props) return null;
	return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
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
		children: !!(process.env.NODE_ENV !== "production") && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
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
		vs: cloneVaporSlotMeta(vnode, extraProps),
		vb: vnode.vb,
		ibu: vnode.ibu,
		iu: vnode.iu,
		cacheIndex: vnode.cacheIndex
	};
	if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
	return cloned;
}
function cloneVaporSlotMeta(vnode, extraProps) {
	const vaporSlot = vnode.vs;
	if (!vaporSlot) return vaporSlot;
	const cloned = {
		slot: vaporSlot.slot,
		outlets: vaporSlot.outlets,
		props: vaporSlot.props
	};
	if (vaporSlot.props && extraProps) {
		let extraSlotProps;
		for (const key in extraProps) if (key !== "key") {
			if (!extraSlotProps) extraSlotProps = {};
			extraSlotProps[key] = extraProps[key];
		}
		if (extraSlotProps) cloned.props = mergeProps(vaporSlot.props, extraSlotProps);
	}
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
	return createVNode(Text$1, null, text, flag);
}
/**
* @private
*/
function createStaticVNode(content, numberOfNodes) {
	const vnode = createVNode(Static, null, content);
	vnode.staticCount = numberOfNodes;
	return vnode;
}
/**
* @private
*/
function createCommentVNode(text = "", asBlock = false) {
	return asBlock ? (openBlock(), createBlock(Comment$1, null, text)) : createVNode(Comment$1, null, text);
}
function normalizeVNode(child) {
	if (child == null || typeof child === "boolean") return createVNode(Comment$1);
	else if (isArray(child)) return createVNode(Fragment, null, child.slice());
	else if (isVNode(child)) return cloneIfMounted(child);
	else return createVNode(Text$1, null, String(child));
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
			if (ret.class !== toMerge.class) ret.class = normalizeClass$1([ret.class, toMerge.class]);
		} else if (key === "style") ret.style = normalizeStyle$1([ret.style, toMerge.style]);
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
/**
* fixed by uts: uni-h5 框架需要在 Vapor setup 中访问当前组件实例。
*/
const getCurrentInstance = () => getCurrentGenericInstance();
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
const internalOptions = [
	"ce",
	"type",
	"uid"
];
/**
* @internal
*/
const useInstanceOption = (key, silent = false) => {
	const instance = getCurrentGenericInstance();
	if (!instance) {
		if (!!(process.env.NODE_ENV !== "production") && !silent) warn$1(`useInstanceOption called without an active component instance.`);
		return {
			hasInstance: false,
			value: void 0
		};
	}
	if (!internalOptions.includes(key)) {
		if (!!(process.env.NODE_ENV !== "production")) warn$1(`useInstanceOption only accepts  ${internalOptions.map((k) => `'${k}'`).join(", ")} as key, got '${key}'.`);
		return {
			hasInstance: true,
			value: void 0
		};
	}
	return {
		hasInstance: true,
		value: instance[key]
	};
};
//#endregion
//#region packages/runtime-core/src/component.ts
const emptyAppContext = /*@__PURE__*/ createAppContext();
let uid = 0;
function getNextUid() {
	return uid;
}
/**
* @internal for vapor
*/
function nextUid() {
	return uid++;
}
function createComponentInstance(vnode, parent, suspense) {
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
		propsOptions: normalizePropsOptions$1(type, appContext),
		emitsOptions: normalizeEmitsOptions$1(type, appContext),
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
	if (!!(process.env.NODE_ENV !== "production")) instance.ctx = createDevRenderContext(instance);
	else instance.ctx = { _: instance };
	instance.root = parent ? parent.root : instance;
	instance.emit = emit$1.bind(null, instance);
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
		initSlots$1(instance, children, optimized || isSSR);
	}
	const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	isSSR && setInSSRSetupState(false);
	return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
	const Component = instance.type;
	if (!!(process.env.NODE_ENV !== "production")) {
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
	}
	instance.accessCache = Object.create(null);
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	if (!!(process.env.NODE_ENV !== "production")) exposePropsOnRenderContext(instance);
	const { setup } = Component;
	if (setup) {
		const prevSub = setActiveSub();
		const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
		const prev = setCurrentInstance(instance);
		const setupResult = callWithErrorHandling(setup, instance, 0, [!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(instance.props) : instance.props, setupContext]);
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
					handleSetupResult$1(instance, resolvedResult, isSSR);
				} finally {
					setInSSRSetupState(false);
				}
			}).catch((e) => {
				handleError(e, instance, 0);
			});
			else {
				instance.asyncDep = setupResult;
				if (!!(process.env.NODE_ENV !== "production") && !instance.suspense) warn$1(`Component <${formatComponentName(instance, Component)}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
			}
		} else handleSetupResult$1(instance, setupResult, isSSR);
	} else finishComponentSetup(instance, isSSR);
}
function handleSetupResult$1(instance, setupResult, isSSR) {
	if (isFunction(setupResult)) {
		if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
		else instance.render = setupResult;
	} else if (isObject(setupResult)) {
		if (!!(process.env.NODE_ENV !== "production") && isVNode(setupResult)) warn$1("setup() should not return VNodes directly - return a render function instead.");
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) instance.devtoolsRawSetupState = setupResult;
		instance.setupState = proxyRefs(setupResult);
		if (!!(process.env.NODE_ENV !== "production")) exposeSetupStateOnRenderContext(instance);
	} else if (!!(process.env.NODE_ENV !== "production") && setupResult !== void 0) warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
	finishComponentSetup(instance, isSSR);
}
let compile$1;
let installWithProxy;
/**
* For runtime-dom to register the compiler.
* Note the exported method uses any to avoid d.ts relying on the compiler types.
*/
function registerRuntimeCompiler(_compile) {
	compile$1 = _compile;
	installWithProxy = (i) => {
		if (i.render._rc) i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
	};
}
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
	const Component = instance.type;
	if (!instance.render) {
		if (!isSSR && compile$1 && !Component.render) {
			const template = Component.template || __VUE_OPTIONS_API__ && resolveMergedOptions(instance).template;
			if (template) {
				if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `compile`);
				const { isCustomElement, compilerOptions } = instance.appContext.config;
				const { delimiters, compilerOptions: componentCompilerOptions } = Component;
				const finalCompilerOptions = extend$1(extend$1({
					isCustomElement,
					delimiters
				}, compilerOptions), componentCompilerOptions);
				Component.render = compile$1(template, finalCompilerOptions);
				if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `compile`);
			}
		}
		instance.render = Component.render || NOOP;
		if (installWithProxy) installWithProxy(instance);
	}
	if (__VUE_OPTIONS_API__ && true) {
		const prevInstance = setCurrentInstance(instance);
		const prevSub = setActiveSub();
		try {
			applyOptions(instance);
		} finally {
			setActiveSub(prevSub);
			restoreCurrentInstance(prevInstance);
		}
	}
	if (!!(process.env.NODE_ENV !== "production") && !Component.render && instance.render === NOOP && !isSSR) {
		if (!compile$1 && Component.template)
 /* v8 ignore start */
		warn$1("Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".");
		else warn$1(`Component is missing template or render function: `, Component);
	}
}
const attrsProxyHandlers = !!(process.env.NODE_ENV !== "production") ? {
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
} : { get(target, key) {
	track(target, "get", "");
	return target[key];
} };
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
	if (!!(process.env.NODE_ENV !== "production")) {
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
	} else return {
		attrs: new Proxy(instance.attrs, attrsProxyHandlers),
		slots: instance.slots,
		emit: instance.emit,
		expose: (exposed) => expose(instance, exposed)
	};
}
/**
* @internal
*/
function expose(instance, exposed) {
	if (!!(process.env.NODE_ENV !== "production")) {
		if (instance.exposed) warn$1(`expose() should be called only once per setup().`);
		if (exposed != null) {
			let exposedType = typeof exposed;
			if (exposedType === "object") {
				if (isArray(exposed)) exposedType = "array";
				else if (/* @__PURE__ */ isRef(exposed)) exposedType = "ref";
			}
			if (exposedType !== "object") warn$1(`expose() should be passed a plain object, received ${exposedType}.`);
		}
	}
	instance.exposed = exposed || {};
}
function getComponentPublicInstance(instance) {
	if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
		get(target, key) {
			if (key in target) return target[key];
			else {
				const publicPropertiesMap = getPublicPropertiesMap(!!instance.vapor);
				if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
			}
		},
		has(target, key) {
			return key in target || key in getPublicPropertiesMap(!!instance.vapor);
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
//#region packages/runtime-core/src/h.ts
function h(type, propsOrChildren, children) {
	try {
		setBlockTracking(-1);
		const l = arguments.length;
		if (l === 2) {
			if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
				if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
				return createVNode(type, propsOrChildren);
			} else return createVNode(type, null, propsOrChildren);
		} else {
			if (l > 3) children = Array.prototype.slice.call(arguments, 2);
			else if (l === 3 && isVNode(children)) children = [children];
			return createVNode(type, propsOrChildren, children);
		}
	} finally {
		setBlockTracking(1);
	}
}
//#endregion
//#region packages/runtime-core/src/customFormatter.ts
function initCustomFormatter() {
	if (!!!(process.env.NODE_ENV !== "production") || typeof window === "undefined") return;
	const vueStyle = { style: "color:#3ba776" };
	const numberStyle = { style: "color:#1677ff" };
	const stringStyle = { style: "color:#f5222d" };
	const keywordStyle = { style: "color:#eb2f96" };
	const formatter = {
		__vue_custom_formatter: true,
		header(obj) {
			if (!isObject(obj)) return null;
			if (obj.__isVue) return [
				"div",
				vueStyle,
				`VueInstance`
			];
			else if (/* @__PURE__ */ isRef(obj)) {
				const prevSub = setActiveSub();
				const value = obj.value;
				setActiveSub(prevSub);
				return [
					"div",
					{},
					[
						"span",
						vueStyle,
						genRefFlag(obj)
					],
					"<",
					formatValue(value),
					`>`
				];
			} else if (/* @__PURE__ */ isReactive(obj)) return [
				"div",
				{},
				[
					"span",
					vueStyle,
					/* @__PURE__ */ isShallow(obj) ? "ShallowReactive" : "Reactive"
				],
				"<",
				formatValue(obj),
				`>${/* @__PURE__ */ isReadonly(obj) ? ` (readonly)` : ``}`
			];
			else if (/* @__PURE__ */ isReadonly(obj)) return [
				"div",
				{},
				[
					"span",
					vueStyle,
					/* @__PURE__ */ isShallow(obj) ? "ShallowReadonly" : "Readonly"
				],
				"<",
				formatValue(obj),
				">"
			];
			return null;
		},
		hasBody(obj) {
			return obj && obj.__isVue;
		},
		body(obj) {
			if (obj && obj.__isVue) return [
				"div",
				{},
				...formatInstance(obj.$)
			];
		}
	};
	function formatInstance(instance) {
		const blocks = [];
		if (instance.type.props && instance.props) blocks.push(createInstanceBlock("props", /* @__PURE__ */ toRaw(instance.props)));
		if (instance.setupState !== EMPTY_OBJ) blocks.push(createInstanceBlock("setup", instance.setupState));
		if (instance.data !== EMPTY_OBJ) blocks.push(createInstanceBlock("data", /* @__PURE__ */ toRaw(instance.data)));
		const computed = extractKeys(instance, "computed");
		if (computed) blocks.push(createInstanceBlock("computed", computed));
		const injected = extractKeys(instance, "inject");
		if (injected) blocks.push(createInstanceBlock("injected", injected));
		blocks.push([
			"div",
			{},
			[
				"span",
				{ style: keywordStyle.style + ";opacity:0.66" },
				"$ (internal): "
			],
			["object", { object: instance }]
		]);
		return blocks;
	}
	function createInstanceBlock(type, target) {
		target = extend$1({}, target);
		if (!Object.keys(target).length) return ["span", {}];
		return [
			"div",
			{ style: "line-height:1.25em;margin-bottom:0.6em" },
			[
				"div",
				{ style: "color:#476582" },
				type
			],
			[
				"div",
				{ style: "padding-left:1.25em" },
				...Object.keys(target).map((key) => {
					return [
						"div",
						{},
						[
							"span",
							keywordStyle,
							key + ": "
						],
						formatValue(target[key], false)
					];
				})
			]
		];
	}
	function formatValue(v, asRaw = true) {
		if (typeof v === "number") return [
			"span",
			numberStyle,
			v
		];
		else if (typeof v === "string") return [
			"span",
			stringStyle,
			JSON.stringify(v)
		];
		else if (typeof v === "boolean") return [
			"span",
			keywordStyle,
			v
		];
		else if (isObject(v)) return ["object", { object: asRaw ? /* @__PURE__ */ toRaw(v) : v }];
		else return [
			"span",
			stringStyle,
			String(v)
		];
	}
	function extractKeys(instance, type) {
		const Comp = instance.type;
		if (isFunction(Comp)) return;
		const extracted = {};
		for (const key in instance.ctx) if (isKeyOfType(Comp, key, type)) extracted[key] = instance.ctx[key];
		return extracted;
	}
	function isKeyOfType(Comp, key, type) {
		const opts = Comp[type];
		if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) return true;
		if (Comp.extends && isKeyOfType(Comp.extends, key, type)) return true;
		if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) return true;
	}
	function genRefFlag(v) {
		if (/* @__PURE__ */ isShallow(v)) return `ShallowRef`;
		if (v.effect) return `ComputedRef`;
		return `Ref`;
	}
	if (window.devtoolsFormatters) window.devtoolsFormatters.push(formatter);
	else window.devtoolsFormatters = [formatter];
}
//#endregion
//#region packages/runtime-core/src/helpers/withMemo.ts
function withMemo(memo, render, cache, index) {
	const cached = cache[index];
	if (cached && isMemoSame(cached, memo)) return cached;
	const ret = render();
	ret.memo = memo.slice();
	ret.cacheIndex = index;
	return cache[index] = ret;
}
function isMemoSame(cached, memo) {
	const prev = cached.memo;
	if (prev.length != memo.length) return false;
	for (let i = 0; i < prev.length; i++) if (hasChanged(prev[i], memo[i])) return false;
	if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(cached);
	return true;
}
//#endregion
//#region packages/runtime-core/src/index.ts
const version = "3.6.0-rc.12";
const warn = !!(process.env.NODE_ENV !== "production") ? warn$1 : NOOP;
/**
* Runtime error messages. Only exposed in dev or esm builds.
* @internal
*/
const ErrorTypeStrings = ErrorTypeStrings$1;
const devtools = (process.env.NODE_ENV, devtools$1);
const setDevtoolsHook = (process.env.NODE_ENV, setDevtoolsHook$1);
/**
* SSR utils for \@vue/server-renderer. Only exposed in ssr-possible builds.
* @internal
*/
const ssrUtils = {
	createComponentInstance,
	setupComponent: setupComponent$1,
	renderComponentRoot,
	setCurrentRenderingInstance,
	isVNode,
	normalizeVNode,
	getComponentPublicInstance,
	ensureValidVNode,
	pushWarningContext,
	popWarningContext,
	VaporSlot,
	rawVaporSlotKey,
	invokeSlotFallback
};
/**
* @internal only exposed in compat builds
*/
const resolveFilter = null;
/**
* @internal only exposed in compat builds.
*/
const compatUtils = null;
const DeprecationTypes = null;
//#endregion
//#region packages/runtime-dom/src/nodeOps.ts
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /*@__PURE__*/ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {
	process.env.NODE_ENV !== "production" && warn(`Error creating trusted types policy: ${e}`);
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
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const DOMTransitionPropsValidators = {
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
const TransitionPropsValidators = /*@__PURE__*/ extend$1({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
/**
* Wrap logic that attaches extra properties to Transition in a function
* so that it can be annotated as pure
*/
const decorate$3 = (t) => {
	t.displayName = "Transition";
	t.props = TransitionPropsValidators;
	return t;
};
/**
* DOM Transition is a higher-order-component based on the platform-agnostic
* base Transition component, with DOM-specific logic.
*/
const Transition = /*@__PURE__*/ decorate$3((props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots));
/**
* #3227 Incoming hooks may be merged into arrays when wrapping Transition
* with custom HOCs.
*/
const callHook = (hook, args = []) => {
	if (isArray(hook)) hook.forEach((h) => h(...args));
	else if (hook) hook(...args);
};
/**
* Check if a hook expects a callback (2nd arg), which means the user
* intends to explicitly control the end of the transition.
*/
const hasExplicitCallback = (hook) => {
	return hook ? isArray(hook) ? hook.some((h) => h.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
	const baseProps = {};
	for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
	if (rawProps.css === false) return baseProps;
	const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
	const durations = normalizeDuration(duration);
	const enterDuration = durations && durations[0];
	const leaveDuration = durations && durations[1];
	const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
	const finishEnter = (el, isAppear, done, isCancelled) => {
		el._enterCancelled = isCancelled;
		removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		done && done();
	};
	const finishLeave = (el, done) => {
		el._isLeaving = false;
		removeTransitionClass(el, leaveFromClass);
		removeTransitionClass(el, leaveToClass);
		removeTransitionClass(el, leaveActiveClass);
		done && done();
	};
	const makeEnterHook = (isAppear) => {
		return (el, done) => {
			const hook = isAppear ? onAppear : onEnter;
			const resolve = () => finishEnter(el, isAppear, done);
			callHook(hook, [el, resolve]);
			nextFrame(() => {
				removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
				addTransitionClass(el, isAppear ? appearToClass : enterToClass);
				if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
			});
		};
	};
	return extend$1(baseProps, {
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
			const resolve = () => finishLeave(el, done);
			addTransitionClass(el, leaveFromClass);
			if (!el._enterCancelled) {
				forceReflow(el);
				addTransitionClass(el, leaveActiveClass);
			} else {
				addTransitionClass(el, leaveActiveClass);
				forceReflow(el);
			}
			nextFrame(() => {
				if (!el._isLeaving) return;
				removeTransitionClass(el, leaveFromClass);
				addTransitionClass(el, leaveToClass);
				if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
			});
			callHook(onLeave, [el, resolve]);
		},
		onEnterCancelled(el) {
			finishEnter(el, false, void 0, true);
			callHook(onEnterCancelled, [el]);
		},
		onAppearCancelled(el) {
			finishEnter(el, true, void 0, true);
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
	else if (isObject(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
	else {
		const n = NumberOf(duration);
		return [n, n];
	}
}
function NumberOf(val) {
	const res = toNumber(val);
	if (!!(process.env.NODE_ENV !== "production")) assertNumber(res, "<transition> explicit duration");
	return res;
}
function addTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
	(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
	const _vtc = el[vtcKey];
	if (_vtc) {
		_vtc.delete(cls);
		if (!_vtc.size) el[vtcKey] = void 0;
	}
	const updateClass = el.$hoverUpdateClass;
	if (updateClass) updateClass();
}
function nextFrame(cb) {
	requestAnimationFrame(() => {
		requestAnimationFrame(cb);
	});
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
	const id = el._endId = ++endId;
	const resolveIfNotStale = () => {
		if (id === el._endId) resolve();
	};
	if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
	const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
	if (!type) return resolve();
	const endEvent = type + "end";
	let ended = 0;
	const end = () => {
		el.removeEventListener(endEvent, onEnd);
		resolveIfNotStale();
	};
	const onEnd = (e) => {
		if (e.target === el && ++ended >= propCount) end();
	};
	setTimeout(() => {
		if (ended < propCount) end();
	}, timeout + 1);
	el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
	const styles = window.getComputedStyle(el);
	const getStyleProperties = (key) => (styles[key] || "").split(", ");
	const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
	const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
	const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
	const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
	const animationTimeout = getTimeout(animationDelays, animationDurations);
	let type = null;
	let timeout = 0;
	let propCount = 0;
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
	const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
	return {
		type,
		timeout,
		propCount,
		hasTransform
	};
}
function getTimeout(delays, durations) {
	while (delays.length < durations.length) delays = delays.concat(delays);
	return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
	if (s === "auto") return 0;
	return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
	return (el ? el.ownerDocument : document).body.offsetHeight;
}
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
		else setDisplay$1(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) {
			if (value) {
				transition.beforeEnter(el);
				setDisplay$1(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay$1(el, false);
			});
		} else setDisplay$1(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay$1(el, value);
	}
};
function setDisplay$1(el, value) {
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
const CSS_VAR_TEXT = Symbol(!!(process.env.NODE_ENV !== "production") ? "CSS_VAR_TEXT" : "");
/**
* Runtime helper for SFC's CSS variable injection feature.
* @private
*/
function useCssVars(getter) {
	const instance = getCurrentInstance();
	/* v8 ignore start */
	if (!instance) {
		process.env.NODE_ENV !== "production" && warn(`useCssVars is called without current active component instance.`);
		return;
	}
	/* v8 ignore stop */
	const getVars = () => getter(instance.proxy);
	if (!!(process.env.NODE_ENV !== "production")) instance.getCssVars = getVars;
	const updateTeleports = instance.ut = (vars = getVars()) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach((node) => setVarsOnNode(node, vars));
	};
	const applyCssVars = (vars = getVars()) => {
		if (instance.ce) setVarsOnNode(instance.ce, vars);
		else setVarsOnVNode(instance.subTree, vars);
		updateTeleports(vars);
	};
	onBeforeUpdate(() => {
		queuePostFlushCb(applyCssVars);
	});
	onMounted(() => {
		watch(() => {
			const vars = getVars();
			extend$1({}, vars);
			applyCssVars(vars);
		}, NOOP, { flush: "post" });
		const ob = new MutationObserver(() => applyCssVars());
		ob.observe(instance.subTree.el.parentNode, { childList: true });
		onUnmounted(() => ob.disconnect());
	});
}
function setVarsOnVNode(vnode, vars) {
	if (vnode.shapeFlag & 128) {
		const suspense = vnode.suspense;
		vnode = suspense.activeBranch;
		if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(() => {
			setVarsOnVNode(suspense.activeBranch, vars);
		});
	}
	while (vnode.component) {
		const component = vnode.component;
		if (component.vapor) {
			component.appContext.vapor.applyCssVars(vnode, vars);
			return;
		}
		vnode = vnode.component.subTree;
	}
	if (vnode.shapeFlag & 1 && vnode.el) setVarsOnNode(vnode.el, vars);
	else if (vnode.vb) vnode.ctx.appContext.vapor.applyCssVars(vnode, vars);
	else if (vnode.type === Fragment) vnode.children.forEach((c) => setVarsOnVNode(c, vars));
	else if (vnode.type === Static) {
		let { el, anchor } = vnode;
		while (el) {
			setVarsOnNode(el, vars);
			if (el === anchor) break;
			el = el.nextSibling;
		}
	}
}
/**
* @internal
* shared between vdom and vapor
*/
function setVarsOnNode(el, vars) {
	if (el.nodeType === 1) {
		const style = el.style;
		let cssText = "";
		for (const key in vars) {
			const value = normalizeRpx(normalizeCssVarValue(vars[key]));
			style.setProperty(`--${key}`, value);
			cssText += `--${key}: ${value};`;
		}
		style[CSS_VAR_TEXT] = cssText;
	}
}
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
				for (const key in prev) if (next[key] == null) setStyle$1(style, key, "");
			} else for (const prevStyle of prev.split(";")) {
				const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[key] == null) setStyle$1(style, key, "");
			}
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle$1(style, key, value);
			} else setStyle$1(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = normalizeRpx(next);
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) {
		const cssVarText = style[CSS_VAR_TEXT];
		if (cssVarText) style.cssText = cssVarText;
		else el.removeAttribute("style");
	}
	if (vShowOriginalDisplay in el) {
		if (!isCssString || prev !== next) el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle$1(style, name, rawVal) {
	if (isArray(rawVal)) rawVal.forEach((v) => setStyle$1(style, name, v));
	else {
		const val = rawVal == null ? "" : normalizeRpx(String(rawVal));
		if (!!(process.env.NODE_ENV !== "production")) {
			if (semicolonRE.test(val)) warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
		}
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
	name = capitalize$1(name);
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
		if (!!(process.env.NODE_ENV !== "production") && !needRemove) warn(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
	}
	needRemove && el.removeAttribute(attrName || key);
}
//#endregion
//#region packages/runtime-dom/src/modules/events.ts
function addEventListener$1(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = !!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue;
	else {
		const [name, options] = parseEventName(rawName);
		if (nextValue) addEventListener$1(el, name, invokers[rawName] = createInvoker$1(!!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue, instance), options);
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
function createInvoker$1(initialValue, instance) {
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
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize$1(key), nextValue, parentComponent, key);
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
	const camelKey = camelize$1(key);
	return Array.isArray(props) ? props.some((prop) => camelize$1(prop) === camelKey) : Object.keys(props).some((prop) => camelize$1(prop) === camelKey);
}
//#endregion
//#region packages/runtime-dom/src/apiCustomElement.ts
const REMOVAL = {};
/*@__NO_SIDE_EFFECTS__*/
function defineCustomElement(options, extraOptions, _createApp) {
	let Comp = /* @__PURE__ */ defineComponent(options, extraOptions);
	if (isPlainObject(Comp)) Comp = extend$1({}, Comp, extraOptions);
	class VueCustomElement extends VueElement {
		constructor(initialProps) {
			super(Comp, initialProps, _createApp);
		}
	}
	VueCustomElement.def = Comp;
	return VueCustomElement;
}
const defineSSRCustomElement = ((options, extraOptions) => {
	return /* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
});
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {};
var VueElementBase = class VueElementBase extends BaseClass {
	constructor(def, props = {}, createAppFn) {
		super();
		this._isVueCE = true;
		this._instance = null;
		this._app = null;
		this._connected = false;
		this._resolved = false;
		this._numberProps = null;
		this._styleChildren = /* @__PURE__ */ new WeakSet();
		this._styleAnchors = /* @__PURE__ */ new WeakMap();
		this._patching = false;
		this._dirty = false;
		this._ob = null;
		this._def = def;
		this._props = props;
		this._createApp = createAppFn;
		this._nonce = def.nonce;
		if (this._needsHydration()) this._root = this.shadowRoot;
		else if (def.shadowRoot !== false) {
			this.attachShadow(extend$1({}, def.shadowRootOptions, { mode: "open" }));
			this._root = this.shadowRoot;
		} else this._root = this;
	}
	connectedCallback() {
		if (!this.isConnected) return;
		if (!this.shadowRoot && !this._resolved) this._parseSlots();
		this._connected = true;
		let parent = this;
		while (parent = parent && (parent.assignedSlot || parent.parentNode || parent.host)) if (parent instanceof VueElementBase) {
			this._parent = parent;
			break;
		}
		if (!this._instance) {
			if (this._resolved) this._mountComponent(this._def);
			else if (parent && parent._pendingResolve) this._pendingResolve = parent._pendingResolve.then(() => {
				this._pendingResolve = void 0;
				if (this.isConnected) return this._resolveDef();
			});
			else this._resolveDef();
		}
	}
	disconnectedCallback() {
		this._connected = false;
		nextTick(() => {
			if (!this._connected) {
				if (this._ob) {
					this._ob.disconnect();
					this._ob = null;
				}
				this._unmount();
				if (this._teleportTargets) {
					this._teleportTargets.clear();
					this._teleportTargets = void 0;
				}
			}
		});
	}
	_setParent(parent = this._parent) {
		if (parent && this._instance) {
			this._instance.parent = parent._instance;
			this._inheritParentContext(parent);
		}
	}
	_inheritParentContext(parent = this._parent) {
		if (parent && this._app) Object.setPrototypeOf(this._app._context.provides, parent._instance.provides);
	}
	_processMutations(mutations) {
		for (const m of mutations) this._setAttr(m.attributeName);
	}
	/**
	* resolve inner component definition (handle possible async component)
	*/
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let i = 0; i < this.attributes.length; i++) this._setAttr(this.attributes[i].name);
		this._ob = new MutationObserver(this._processMutations.bind(this));
		this._ob.observe(this, { attributes: true });
		const resolve = (def) => {
			this._resolved = true;
			this._pendingResolve = void 0;
			const { props, styles } = def;
			let numberProps;
			if (props && !isArray(props)) for (const key in props) {
				const opt = props[key];
				if (opt === Number || opt && opt.type === Number) {
					if (key in this._props) this._props[key] = toNumber(this._props[key]);
					(numberProps || (numberProps = Object.create(null)))[camelize$1(key)] = true;
				}
			}
			this._numberProps = numberProps;
			this._resolveProps(def);
			if (this.shadowRoot) this._applyStyles(styles);
			else if (!!(process.env.NODE_ENV !== "production") && styles) warn("Custom element style injection is not supported when using shadowRoot: false");
			if (this._connected) this._mountComponent(def);
		};
		const asyncDef = this._def.__asyncLoader;
		if (asyncDef) {
			const { configureApp } = this._def;
			this._pendingResolve = asyncDef().then((def) => {
				def.configureApp = configureApp;
				this._def = def;
				resolve(def);
			});
			return this._pendingResolve;
		} else resolve(this._def);
	}
	_mountComponent(def) {
		this._mount(def);
		this._processExposed();
	}
	_processExposed() {
		const exposed = this._instance && this._instance.exposed;
		if (!exposed) return;
		for (const key in exposed) if (!hasOwn(this, key)) Object.defineProperty(this, key, { get: () => unref(exposed[key]) });
		else if (!!(process.env.NODE_ENV !== "production")) warn(`Exposed property "${key}" already exists on custom element.`);
	}
	_processInstance() {
		this._instance.ce = this;
		this._instance.isCE = true;
		if (!!(process.env.NODE_ENV !== "production")) this._instance.ceReload = (newStyles) => {
			if (this._styles) {
				this._styles.forEach((s) => this._root.removeChild(s));
				this._styles.length = 0;
			}
			this._styleAnchors.delete(this._def);
			this._applyStyles(newStyles);
			if (!this._instance.vapor) this._instance = null;
			this._update();
		};
		const dispatch = (event, args) => {
			this.dispatchEvent(new CustomEvent(event, isPlainObject(args[0]) ? extend$1({ detail: args }, args[0]) : { detail: args }));
		};
		this._instance.emit = (event, ...args) => {
			dispatch(event, args);
			if (hyphenate(event) !== event) dispatch(hyphenate(event), args);
		};
		this._setParent();
	}
	_resolveProps(def) {
		const { props } = def;
		const declaredPropKeys = isArray(props) ? props : Object.keys(props || {});
		for (const key of Object.keys(this)) if (key[0] !== "_" && declaredPropKeys.includes(key)) this._setProp(key, this[key]);
		for (const key of declaredPropKeys.map(camelize$1)) {
			if (!!(process.env.NODE_ENV !== "production") && key in Object.getPrototypeOf(this)) warn(`Custom element prop "${key}" conflicts with an existing property on the element and will overwrite it.`);
			Object.defineProperty(this, key, {
				get() {
					return this._getProp(key);
				},
				set(val) {
					this._setProp(key, val, true, !this._patching);
				}
			});
		}
	}
	_setAttr(key) {
		if (key.startsWith("data-v-")) return;
		const has = this.hasAttribute(key);
		let value = has ? this.getAttribute(key) : REMOVAL;
		const camelKey = camelize$1(key);
		if (has && this._numberProps && this._numberProps[camelKey]) value = toNumber(value);
		this._setProp(camelKey, value, false, true);
	}
	/**
	* @internal
	*/
	_getProp(key) {
		return this._props[key];
	}
	/**
	* @internal
	*/
	_setProp(key, val, shouldReflect = true, shouldUpdate = false) {
		if (val !== this._props[key]) {
			this._dirty = true;
			if (val === REMOVAL) delete this._props[key];
			else {
				this._props[key] = val;
				if (key === "key" && this._app && this._app._ceVNode) this._app._ceVNode.key = val;
			}
			if (shouldUpdate && this._instance) this._update();
			if (shouldReflect) {
				const ob = this._ob;
				if (ob) {
					this._processMutations(ob.takeRecords());
					ob.disconnect();
				}
				if (val === true) this.setAttribute(hyphenate(key), "");
				else if (typeof val === "string" || typeof val === "number") this.setAttribute(hyphenate(key), val + "");
				else if (!val) this.removeAttribute(hyphenate(key));
				ob && ob.observe(this, { attributes: true });
			}
		}
	}
	_applyStyles(styles, owner, parentComp) {
		if (!styles) return;
		if (owner) {
			if (owner === this._def || this._styleChildren.has(owner)) return;
			this._styleChildren.add(owner);
		}
		const nonce = this._nonce;
		const root = this.shadowRoot;
		const insertionAnchor = parentComp ? this._getStyleAnchor(parentComp) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(root);
		let last = null;
		for (let i = styles.length - 1; i >= 0; i--) {
			const s = document.createElement("style");
			if (nonce) s.setAttribute("nonce", nonce);
			s.textContent = styles[i];
			root.insertBefore(s, last || insertionAnchor);
			last = s;
			if (i === 0) {
				if (!parentComp) this._styleAnchors.set(this._def, s);
				if (owner) this._styleAnchors.set(owner, s);
			}
			if (!!(process.env.NODE_ENV !== "production")) {
				if (owner) {
					if (owner.__hmrId) {
						if (!this._childStyles) this._childStyles = /* @__PURE__ */ new Map();
						let entry = this._childStyles.get(owner.__hmrId);
						if (!entry) this._childStyles.set(owner.__hmrId, entry = []);
						entry.push(s);
					}
				} else (this._styles || (this._styles = [])).push(s);
			}
		}
	}
	_getStyleAnchor(comp) {
		if (!comp) return null;
		const anchor = this._styleAnchors.get(comp);
		if (anchor && anchor.parentNode === this.shadowRoot) return anchor;
		if (anchor) this._styleAnchors.delete(comp);
		return null;
	}
	_getRootStyleInsertionAnchor(root) {
		for (let i = 0; i < root.childNodes.length; i++) {
			const node = root.childNodes[i];
			if (!(node instanceof HTMLStyleElement)) return node;
		}
		return null;
	}
	/**
	* Only called when shadowRoot is false
	*/
	_parseSlots() {
		const slots = this._slots = {};
		let n;
		while (n = this.firstChild) {
			const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
			(slots[slotName] || (slots[slotName] = [])).push(n);
			this.removeChild(n);
		}
	}
	/**
	* Only called when shadowRoot is false
	*/
	_renderSlots() {
		const outlets = this._getSlots();
		const scopeId = this._instance.type.__scopeId;
		for (let i = 0; i < outlets.length; i++) {
			const o = outlets[i];
			const slotName = o.getAttribute("name") || "default";
			const content = this._slots[slotName];
			const parent = o.parentNode;
			if (content) for (const n of content) {
				if (scopeId && n.nodeType === 1) {
					const id = scopeId + "-s";
					const walker = document.createTreeWalker(n, 1);
					n.setAttribute(id, "");
					let child;
					while (child = walker.nextNode()) child.setAttribute(id, "");
				}
				parent.insertBefore(n, o);
			}
			else while (o.firstChild) parent.insertBefore(o.firstChild, o);
			parent.removeChild(o);
		}
	}
	/**
	* @internal
	*/
	_getSlots() {
		const roots = [this];
		if (this._teleportTargets) roots.push(...this._teleportTargets);
		const slots = /* @__PURE__ */ new Set();
		for (const root of roots) {
			const found = root.querySelectorAll("slot");
			for (let i = 0; i < found.length; i++) slots.add(found[i]);
		}
		return Array.from(slots);
	}
	/**
	* @internal
	*/
	_injectChildStyle(comp, parentComp) {
		this._applyStyles(comp.styles, comp, parentComp);
	}
	/**
	* @internal
	*/
	_beginPatch() {
		this._patching = true;
		this._dirty = false;
	}
	/**
	* @internal
	*/
	_endPatch() {
		this._patching = false;
		if (this._dirty && this._instance) this._update();
	}
	/**
	* @internal
	*/
	_hasShadowRoot() {
		return this._root !== this;
	}
	/**
	* @internal
	*/
	_removeChildStyle(comp) {
		if (!!(process.env.NODE_ENV !== "production")) {
			this._styleChildren.delete(comp);
			this._styleAnchors.delete(comp);
			if (this._childStyles && comp.__hmrId) {
				const oldStyles = this._childStyles.get(comp.__hmrId);
				if (oldStyles) {
					oldStyles.forEach((s) => this._root.removeChild(s));
					oldStyles.length = 0;
				}
			}
		}
	}
};
var VueElement = class extends VueElementBase {
	constructor(def, props = {}, createAppFn = createApp) {
		super(def, props, createAppFn);
	}
	_needsHydration() {
		if (this.shadowRoot && this._createApp !== createApp) return true;
		else if (!!(process.env.NODE_ENV !== "production") && this.shadowRoot) warn("Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`.");
		return false;
	}
	_mount(def) {
		if ((!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) && !def.name) def.name = "VueElement";
		this._app = this._createApp(def);
		this._inheritParentContext();
		if (def.configureApp) def.configureApp(this._app);
		this._app._ceVNode = this._createVNode();
		this._app.mount(this._root);
	}
	_update() {
		if (!this._app) return;
		const vnode = this._createVNode();
		vnode.appContext = this._app._context;
		render(vnode, this._root);
	}
	_unmount() {
		if (this._app) this._app.unmount();
		if (this._instance && this._instance.ce) this._instance.ce = void 0;
		this._app = this._instance = null;
	}
	_createVNode() {
		const baseProps = {};
		if (!this.shadowRoot) baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
		const vnode = createVNode(this._def, extend$1(baseProps, this._props));
		if (!this._instance) vnode.ce = (instance) => {
			this._instance = instance;
			this._processInstance();
		};
		return vnode;
	}
};
function useHost(caller) {
	const { hasInstance, value } = useInstanceOption("ce", true);
	const el = value;
	if (el) return el;
	else if (!!(process.env.NODE_ENV !== "production")) {
		if (!hasInstance) warn(`${caller || "useHost"} called without an active component instance.`);
		else warn(`${caller || "useHost"} can only be used in components defined via defineCustomElement.`);
	}
	return null;
}
/**
* Retrieve the shadowRoot of the current custom element. Only usable in setup()
* of a `defineCustomElement` component.
*/
function useShadowRoot() {
	const el = !!(process.env.NODE_ENV !== "production") ? useHost("useShadowRoot") : useHost();
	return el && el.shadowRoot;
}
//#endregion
//#region packages/runtime-dom/src/helpers/useCssModule.ts
function useCssModule(name = "$style") {
	{
		const { hasInstance, value: type } = useInstanceOption("type", true);
		if (!hasInstance) {
			process.env.NODE_ENV !== "production" && warn(`useCssModule must be called inside setup()`);
			return EMPTY_OBJ;
		}
		const modules = type.__cssModules;
		if (!modules) {
			process.env.NODE_ENV !== "production" && warn(`Current instance does not have CSS modules injected.`);
			return EMPTY_OBJ;
		}
		const mod = modules[name];
		if (!mod) {
			process.env.NODE_ENV !== "production" && warn(`Current instance does not have CSS module named "${name}".`);
			return EMPTY_OBJ;
		}
		return mod;
	}
}
//#endregion
//#region packages/runtime-dom/src/components/TransitionGroup.ts
const positionMap$1 = /* @__PURE__ */ new WeakMap();
const newPositionMap$1 = /* @__PURE__ */ new WeakMap();
const moveCbKey = Symbol("_moveCb");
const enterCbKey = Symbol("_enterCb");
const pendingGroups = /* @__PURE__ */ new WeakMap();
/**
* Wrap logic that modifies TransitionGroup properties in a function
* so that it can be annotated as pure
*/
const decorate$2 = (t) => {
	delete t.props.mode;
	return t;
};
const TransitionGroup = /* @__PURE__ */ decorate$2({
	name: "TransitionGroup",
	props: /*@__PURE__*/ extend$1({}, TransitionPropsValidators, {
		tag: String,
		moveClass: String
	}),
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		let prevChildren;
		let children;
		let origins;
		let moves;
		const willMove = () => {
			if (moves === void 0) moves = prevChildren.length > 0 && hasCSSTransform(prevChildren[0].el, instance.vnode.el, resolveMoveClass(props));
			return moves;
		};
		onUpdated(() => {
			pendingGroups.delete(instance);
			if (!willMove()) {
				prevChildren = [];
				origins = void 0;
				return;
			}
			const moveClass = resolveMoveClass(props);
			prevChildren.forEach((vnode) => callPendingCbs(vnode.el));
			const shift = origins && getOriginShift(origins, instance.vnode.el);
			origins = void 0;
			prevChildren.forEach((c) => recordPosition$1(c, shift));
			const movedChildren = prevChildren.filter(applyTranslation$1);
			forceReflow(instance.vnode.el);
			movedChildren.forEach((c) => {
				const el = c.el;
				handleMovedChildren(el, moveClass);
			});
			prevChildren = [];
		});
		return () => {
			const rawProps = /* @__PURE__ */ toRaw(props);
			const cssTransitionProps = resolveTransitionProps(rawProps);
			let tag = rawProps.tag || Fragment;
			prevChildren = [];
			moves = void 0;
			if (children) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
					prevChildren.push(child);
					setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
					positionMap$1.set(child, getPosition(child.el));
				}
			}
			children = slots.default ? getTransitionRawChildren(slots.default()) : [];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
				else if (!!(process.env.NODE_ENV !== "production") && child.type !== Text$1) warn(`<TransitionGroup> children must be keyed.`);
			}
			if (prevChildren.length) {
				const root = instance.vnode.el;
				origins = getOrigins(instance, root);
				pendingGroups.set(instance, {
					root,
					willMove
				});
			}
			return createVNode(tag, null, children);
		};
	}
});
function callPendingCbs(el) {
	if (el[moveCbKey]) el[moveCbKey]();
	if (el[enterCbKey]) el[enterCbKey]();
}
function resolveMoveClass(props) {
	return props.moveClass || `${props.name || "v"}-move`;
}
function recordPosition$1(c, shift) {
	newPositionMap$1.set(c, getPosition(c.el, shift));
}
function applyTranslation$1(c) {
	if (baseApplyTranslation(positionMap$1.get(c), newPositionMap$1.get(c), c.el)) return c;
}
function baseApplyTranslation(oldPos, newPos, el) {
	const dx = oldPos.left - newPos.left;
	const dy = oldPos.top - newPos.top;
	if (dx || dy) {
		const s = el.style;
		const rect = el.getBoundingClientRect();
		let scaleX = 1;
		let scaleY = 1;
		if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
		if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
		if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
		if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
		if (Math.abs(scaleX - 1) < .01) scaleX = 1;
		if (Math.abs(scaleY - 1) < .01) scaleY = 1;
		s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
		s.transitionDuration = "0s";
		return true;
	}
	return false;
}
function getPosition(el, shift) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left - (shift ? shift.left : 0),
		top: rect.top - (shift ? shift.top : 0)
	};
}
function getOrigins(instance, root) {
	let origins;
	for (let group = instance.parent; group; group = group.parent) {
		const pending = pendingGroups.get(group);
		if (pending) {
			const item = findItem(pending.root, root);
			if (item) (origins || (origins = [])).push(extend$1(getPosition(item), {
				item,
				willMove: pending.willMove
			}));
		}
	}
	return origins;
}
function findItem(root, node) {
	const container = root.nodeType === 1 ? root : root.parentNode;
	while (node && node.parentNode !== container) node = node.parentNode;
	if (node && node.nodeType === 1) return node;
}
function getOriginShift(origins, root) {
	const origin = origins.find((o) => o.willMove() && o.item.contains(root));
	return origin && getPosition(origin.item, origin);
}
function hasCSSTransform(el, root, moveClass) {
	const clone = el.cloneNode();
	const _vtc = el[vtcKey];
	if (_vtc) _vtc.forEach((cls) => {
		cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
	});
	moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
	clone.style.display = "none";
	const container = root.nodeType === 1 ? root : root.parentNode;
	container.appendChild(clone);
	const { hasTransform } = getTransitionInfo(clone);
	container.removeChild(clone);
	return hasTransform;
}
const handleMovedChildren = (el, moveClass) => {
	const style = el.style;
	addTransitionClass(el, moveClass);
	style.transform = style.webkitTransform = style.transitionDuration = "";
	const cb = el[moveCbKey] = (e) => {
		if (e && e.target !== el) return;
		if (!e || e.propertyName.endsWith("transform")) {
			el.removeEventListener("transitionend", cb);
			el[moveCbKey] = null;
			removeTransitionClass(el, moveClass);
		}
	};
	el.addEventListener("transitionend", cb);
};
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
	addEventListener$1(el, lazy ? "change" : "input", (e) => {
		if (e.target.composing) return;
		(set || el[assignKey])(castValue(el.value, trim, number || el.type === "number"));
	});
	if (trim || number) addEventListener$1(el, "change", () => {
		el.value = castValue(el.value, trim, number || el.type === "number");
	});
	if (!lazy) {
		addEventListener$1(el, "compositionstart", onCompositionStart);
		addEventListener$1(el, "compositionend", onCompositionEnd);
		addEventListener$1(el, "change", onCompositionEnd);
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
	addEventListener$1(el, "change", () => {
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
		addEventListener$1(el, "change", () => {
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
	addEventListener$1(el, "change", () => {
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
		process.env.NODE_ENV !== "production" && warn(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
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
//#region packages/runtime-dom/src/directives/vOn.ts
const systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
const modifierGuards = {
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
	exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
/**
* @private
*/
const withModifiers = (fn, modifiers) => {
	if (!fn) return fn;
	const cache = fn._withMods || (fn._withMods = {});
	const cacheKey = modifiers.join(".");
	const wrapped = cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
		for (let i = 0; i < modifiers.length; i++) {
			const guard = modifierGuards[modifiers[i]];
			if (guard && guard(event, modifiers)) return;
		}
		return fn(event, ...args);
	}));
	if (fn.__wwe) wrapped.__wwe = true;
	return wrapped;
};
const keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
};
/**
* @private
*/
const withKeys = (fn, modifiers) => {
	const cache = fn._withKeys || (fn._withKeys = {});
	const cacheKey = modifiers.join(".");
	const wrapped = cache[cacheKey] || (cache[cacheKey] = ((event) => {
		if (!("key" in event)) return;
		const eventKey = hyphenate(event.key);
		if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
	}));
	if (fn.__wwe) wrapped.__wwe = true;
	return wrapped;
};
//#endregion
//#region packages/runtime-dom/src/index.ts
const rendererOptions = /*@__PURE__*/ extend$1({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
	renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
	enabledHydration = true;
	return renderer;
}
const render = ((...args) => {
	ensureRenderer().render(...args);
});
const hydrate = ((...args) => {
	ensureHydrationRenderer().hydrate(...args);
});
const createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	if (!!(process.env.NODE_ENV !== "production")) {
		injectNativeTagCheck(app);
		injectCompilerOptionsCheck(app);
	}
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
const createSSRApp = ((...args) => {
	setIsHydratingEnabled(true);
	const app = ensureHydrationRenderer().createApp(...args);
	if (!!(process.env.NODE_ENV !== "production")) {
		injectNativeTagCheck(app);
		injectCompilerOptionsCheck(app);
	}
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (container) return mount(container, true, resolveRootNamespace(container));
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
		if (!!(process.env.NODE_ENV !== "production") && !res) warn(`Failed to mount app: mount target selector "${container}" returned null.`);
		return res;
	}
	if (!!(process.env.NODE_ENV !== "production") && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
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
//#region packages/vue/src/dev.ts
function initDev() {
	initCustomFormatter();
}
//#endregion
//#region packages/vue/src/runtime.ts
if (!!(process.env.NODE_ENV !== "production")) initDev();
const compile = (_template) => {
	if (!!(process.env.NODE_ENV !== "production")) warn("Runtime compilation is not supported in this build of Vue. Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".");
	return NOOP;
};
//#endregion
//#region packages/runtime-vapor/src/insertionState.ts
let insertionParent;
let insertionAnchor;
let insertionIndex;
/**
* This function is called before a block type that requires insertion
* (component, slot outlet, if, for) is created.
*
* - `anchor` is a Node: insert before this template `<!>` placeholder during
*   client render; during hydration the located placeholder unit is the
*   block's hydration target.
* - `anchor` is a number: append; the value is the hydration start unit index
*   (the count of preceding logical units), omitted by codegen when 0.
* - `anchor` absent: append with no preceding units.
*/
function setInsertionState(parent, anchor) {
	insertionParent = parent;
	if (typeof anchor === "number") {
		insertionAnchor = void 0;
		insertionIndex = anchor;
	} else {
		insertionAnchor = anchor;
		insertionIndex = void 0;
	}
}
function resetInsertionState() {
	insertionParent = insertionAnchor = insertionIndex = void 0;
}
//#endregion
//#region packages/runtime-vapor/src/dom/hydrationState.ts
let isHydrating$1 = false;
function setHydrating(value) {
	const prev = isHydrating$1;
	isHydrating$1 = value;
	return prev;
}
//#endregion
//#region packages/runtime-vapor/src/dom/node.ts
const SVG_NS = "http://www.w3.org/2000/svg";
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";
/*@__NO_SIDE_EFFECTS__*/
function createElement(tagName, ns) {
	return ns ? document.createElementNS(ns === 1 ? SVG_NS : MATHML_NS, tagName) : document.createElement(tagName);
}
let t;
function parseTemplate(html, ns) {
	t = t || document.createElement("template");
	if (ns) {
		const tag = ns === 1 ? "svg" : "math";
		t.innerHTML = `<${tag}>${html}</${tag}>`;
		return /* @__PURE__ */ _child(/* @__PURE__ */ _child(t.content));
	}
	t.innerHTML = html;
	return /* @__PURE__ */ _child(t.content);
}
/*@__NO_SIDE_EFFECTS__*/
function createTextNode(value = "") {
	return document.createTextNode(value);
}
/*@__NO_SIDE_EFFECTS__*/
function createComment(data) {
	return document.createComment(data);
}
/*@__NO_SIDE_EFFECTS__*/
function querySelector(selectors) {
	return document.querySelector(selectors);
}
/* @__NO_SIDE_EFFECTS__ */
function parentNode(node) {
	return node.parentNode;
}
/*@__NO_SIDE_EFFECTS__*/
function txt(node) {
	if (isHydrating$1) {
		let n = /* @__PURE__ */ _child(node);
		if (!n) return node.appendChild(/* @__PURE__ */ createTextNode());
		return n;
	}
	return /* @__PURE__ */ _child(node);
}
/*@__NO_SIDE_EFFECTS__*/
function child(node, isText) {
	if (isHydrating$1) {
		const n = locateChildByLogicalIndex(node, 0);
		return isText ? resolveBlankTextTarget(n, node) : n;
	}
	return /* @__PURE__ */ _child(node);
}
/*@__NO_SIDE_EFFECTS__*/
function nthChild(node, i, isText) {
	if (isHydrating$1) {
		const n = locateChildByLogicalIndex(node, i);
		return isText ? resolveBlankTextTarget(n, node) : n;
	}
	return node.childNodes[i];
}
/*@__NO_SIDE_EFFECTS__*/
function next(node, isText) {
	if (isHydrating$1) {
		let result = nextLogicalSibling(node);
		const parent = node.parentNode;
		if (isText) result = resolveBlankTextTarget(result, parent);
		if (parent) updateLastLocatedLogicalChild(parent, node, result, 1);
		return result;
	}
	return /* @__PURE__ */ _next(node);
}
/*@__NO_SIDE_EFFECTS__*/
function _child(node) {
	return node.firstChild;
}
/*@__NO_SIDE_EFFECTS__*/
function _next(node) {
	return node.nextSibling;
}
const cachedParents = [];
function setLastLocatedLogicalChild(parent, child, logicalIndex) {
	if (parent.$llc === void 0) cachedParents.push(parent);
	parent.$llc = child;
	parent.$lli = logicalIndex;
}
function releaseLocatorCache() {
	for (let i = 0; i < cachedParents.length; i++) cachedParents[i].$llc = void 0;
	cachedParents.length = 0;
}
function locateChildByLogicalIndex(parent, logicalIndex) {
	let child;
	let fromIndex;
	if (parent.$llc) {
		child = parent.$llc;
		fromIndex = parent.$lli;
	} else {
		child = skipUntrackedAnchors(parent.firstChild);
		fromIndex = 0;
	}
	if (logicalIndex < fromIndex) {
		child = skipUntrackedAnchors(parent.firstChild);
		fromIndex = 0;
	}
	while (child) {
		if (fromIndex === logicalIndex) {
			setLastLocatedLogicalChild(parent, child, logicalIndex);
			return child;
		}
		child = nextLogicalSibling(child);
		fromIndex++;
	}
	return null;
}
function updateLastLocatedLogicalChild(parent, from, to, logicalIndexOffset = 0) {
	const insertionParent = parent;
	if (insertionParent.$llc === from) {
		insertionParent.$llc = to;
		insertionParent.$lli += logicalIndexOffset;
	}
}
//#endregion
//#region packages/runtime-vapor/src/renderContext.ts
let currentRenderContext = {
	slotOwner: null,
	slotBoundary: null,
	slotScopeIds: null,
	suspense: null
};
function setRenderContext(ctx) {
	const prev = currentRenderContext;
	currentRenderContext = ctx;
	return prev;
}
function withRenderContext(ctx, fn) {
	if (ctx === currentRenderContext) return fn();
	const prev = setRenderContext(ctx);
	try {
		return fn();
	} finally {
		currentRenderContext = prev;
	}
}
function deriveRenderContext(base, slotOwner, slotBoundary, slotScopeIds, suspense) {
	return slotOwner === base.slotOwner && slotBoundary === base.slotBoundary && slotScopeIds === base.slotScopeIds && suspense === base.suspense ? base : {
		slotOwner,
		slotBoundary,
		slotScopeIds,
		suspense
	};
}
function deriveSlotOwner(base, slotOwner) {
	return deriveRenderContext(base, slotOwner, base.slotBoundary, base.slotScopeIds, base.suspense);
}
function deriveSlotBoundary(base, slotBoundary) {
	return deriveRenderContext(base, base.slotOwner, slotBoundary, base.slotScopeIds, base.suspense);
}
function deriveSlotScopeIds(base, slotScopeIds) {
	return deriveRenderContext(base, base.slotOwner, base.slotBoundary, slotScopeIds, base.suspense);
}
function deriveSuspense(base, suspense) {
	return deriveRenderContext(base, base.slotOwner, base.slotBoundary, base.slotScopeIds, suspense);
}
//#endregion
//#region packages/runtime-vapor/src/dom/scopeIdStamp.ts
function setElementScopeIds(el, scopeIds) {
	for (let i = 0; i < scopeIds.length; i++) el.setAttribute(scopeIds[i], "");
}
function setElementScopeIdsDeep(el, scopeIds) {
	setElementScopeIds(el, scopeIds);
	let child = el.firstElementChild;
	while (child) {
		setElementScopeIdsDeep(child, scopeIds);
		child = child.nextElementSibling;
	}
}
/**
* Stamped-variant cache: ids are written once per (template prototype × id
* cell) and clones inherit them via cloneNode. Never stale because scope ids
* are compile-time constants; entries are freed with their cell (WeakMap key).
*/
const stampedTemplates = /* @__PURE__ */ new WeakMap();
function cloneStampedTemplate(prototype, scopeIds) {
	return getStampedTemplate(prototype, scopeIds).cloneNode(true);
}
function getStampedTemplate(prototype, scopeIds) {
	if (prototype.nodeType !== 1) return prototype;
	let variants = stampedTemplates.get(prototype);
	if (!variants) stampedTemplates.set(prototype, variants = /* @__PURE__ */ new WeakMap());
	let stamped = variants.get(scopeIds);
	if (!stamped) {
		stamped = prototype.cloneNode(true);
		setElementScopeIdsDeep(stamped, scopeIds);
		variants.set(scopeIds, stamped);
	}
	return stamped;
}
//#endregion
//#region packages/runtime-vapor/src/dom/hydration.ts
const START_TAG_RE = /^<([^\s/>]+)/;
let isHydratingEnabled$1 = false;
function setIsHydratingEnabled$1(value) {
	isHydratingEnabled$1 = value;
}
let currentHydrationNode = null;
function setIsHydrating(value) {
	if (!isHydratingEnabled$1 && !isHydrating && !isHydratingEnabled) return false;
	return setHydrating(value);
}
let deferredHydrationBoundaryDepth = 0;
function isInDeferredHydrationBoundary() {
	return deferredHydrationBoundaryDepth > 0;
}
function withDeferredHydrationBoundary(fn) {
	deferredHydrationBoundaryDepth++;
	try {
		return fn();
	} finally {
		deferredHydrationBoundaryDepth--;
	}
}
function runWithoutHydration(fn) {
	const prev = setIsHydrating(false);
	try {
		return fn();
	} finally {
		setIsHydrating(prev);
	}
}
let isHydratingSlotFallback = false;
function withHydratingSlotFallback(fn) {
	const prev = isHydratingSlotFallback;
	isHydratingSlotFallback = true;
	try {
		runWithoutHydration(fn);
	} finally {
		isHydratingSlotFallback = prev;
	}
}
let isOptimized$1 = false;
let hydrationDepth = 0;
let liveCursors = 0;
function performHydration(fn, setup, cleanup) {
	if (!isOptimized$1) {
		adoptTemplate = adoptTemplateImpl;
		locateHydrationNode = locateHydrationNodeImpl;
		parseAdoptTarget = parseAdoptTargetImpl;
		Comment.prototype.$fe = void 0;
		Node.prototype.$llc = void 0;
		Node.prototype.$lli = void 0;
		Node.prototype.$vha = 0;
		Node.prototype.$rcn = void 0;
		isOptimized$1 = true;
	}
	const prev = setIsHydrating(true);
	const prevHydrationNode = currentHydrationNode;
	currentHydrationNode = null;
	hydrationDepth++;
	try {
		setup();
		return fn();
	} finally {
		cleanup();
		currentHydrationNode = prevHydrationNode;
		setIsHydrating(prev);
		if (--hydrationDepth === 0) {
			releaseLocatorCache();
			if (!!(process.env.NODE_ENV !== "production")) {
				if (liveCursors > 0) warn(`${liveCursors} hydration cursor(s) were never exited. The enclosing scope's resume point is lost, so the cursor will drift. This is likely a Vue internal bug.`);
				liveCursors = 0;
			}
		}
	}
}
function withHydration(container, fn) {
	const setup = () => setInsertionState(container);
	const cleanup = () => resetInsertionState();
	return performHydration(fn, setup, cleanup);
}
function hydrateNode(node, fn, boundary) {
	const boundaryFlags = boundary ? boundary.$vha : void 0;
	const setup = () => {
		if (boundary) claimAnchor(boundary);
		setCurrentHydrationNode(node);
	};
	const cleanup = () => {
		if (boundary) boundary.$vha = boundaryFlags;
	};
	return performHydration(fn, setup, cleanup);
}
let adoptTemplate;
let locateHydrationNode;
let parseAdoptTarget;
const isRangeStart = (node) => node.nodeType === 8 && (node.data === "[" || node.data === "(");
const isRangeEnd = (node) => node.nodeType === 8 && (node.data === "]" || node.data === ")");
const isComment = (node, data) => node.nodeType === 8 && node.data === data;
function createFragmentClaim() {
	return { start: null };
}
/** Consume the fragment start under the cursor for `claim`. */
function claimFragmentStart(claim) {
	const node = currentHydrationNode;
	if (node && isRangeStart(node)) {
		claim.start = node;
		setCurrentHydrationNode(node.nextSibling);
	}
}
function setCurrentHydrationNode(node) {
	currentHydrationNode = skipUntrackedAnchors(node);
}
function advanceHydrationNode(node) {
	let next = skipUntrackedAnchors(node.nextSibling);
	if (next && currentHydrationNode === next) return;
	while (!next) {
		const parent = node.parentNode;
		if (!parent) break;
		node = parent;
		next = skipUntrackedAnchors(node.nextSibling);
	}
	if (currentHydrationNode !== next) currentHydrationNode = next;
}
function enterHydrationCursor(claim, isBlankText) {
	const cursor = captureHydrationCursor();
	locateHydrationNode(claim, isBlankText);
	cursor.start = currentHydrationNode;
	return cursor;
}
/**
* Capture the outer resume cursor without locating a start node, for dynamic
* wrappers whose inner owner locates the local start later, after the selected
* inner path is known. This avoids consuming insertion state too early.
*/
function captureHydrationCursor() {
	if (!!(process.env.NODE_ENV !== "production")) liveCursors++;
	return {
		start: null,
		resume: insertionParent ? currentHydrationNode : void 0
	};
}
function exitHydrationCursor(cursor) {
	if (!cursor) return;
	if (!!(process.env.NODE_ENV !== "production")) {
		if (cursor.exited) {
			warn(`Hydration cursor was exited twice. This is likely a Vue internal bug.`);
			return;
		}
		cursor.exited = true;
		liveCursors--;
	}
	if (cursor.resume !== void 0) setCurrentHydrationNode(cursor.resume);
}
/**
* Locate the first non-fragment-comment node and locate the next node
* while handling potential fragments.
*/
function adoptTemplateImpl(node, template, adoptChildren = false, ns, target = parseAdoptTargetImpl(template)) {
	if (target.type !== 8) node = target.blank ? resolveBlankTextTarget(node, /* @__PURE__ */ parentNode(node)) : resolveHydrationTarget(node);
	if (!matchesAdoptTarget(node, target)) node = handleMismatch(node, template, adoptChildren, ns);
	advanceHydrationNode(node);
	return node;
}
function nextLogicalSibling(node) {
	return skipUntrackedAnchors(isRangeStart(node) ? locateEndAnchor(node).nextSibling : isComment(node, "teleport start") ? locateEndAnchor(node, "teleport start", "teleport end").nextSibling : node.nextSibling);
}
/** Advance past anchors that occupy no SSR logical position. */
function skipUntrackedAnchors(node) {
	while (node !== null && node.$vha & 2) node = node.nextSibling;
	return node;
}
function locateHydrationNodeImpl(claim, isBlankText) {
	let node;
	if (insertionAnchor) node = insertionAnchor;
	else if (insertionParent) {
		node = locateChildByLogicalIndex(insertionParent, insertionIndex || 0);
		if (!node && isBlankText) {
			node = resolveBlankTextTarget(null, insertionParent);
			setLastLocatedLogicalChild(insertionParent, node, insertionIndex || 0);
		}
	} else node = currentHydrationNode;
	if (!!(process.env.NODE_ENV !== "production") && !node) throw new Error("No current hydration node was found.\nthis is likely a Vue internal bug.");
	resetInsertionState();
	setCurrentHydrationNode(node);
	if (claim) claimFragmentStart(claim);
}
/**
* The end anchor of the SSR fragment starting at `node`, or null when `node`
* is not a fragment start.
*/
function locateFragmentEnd(node) {
	return node && isRangeStart(node) ? locateEndAnchor(node) : null;
}
function locateEndAnchor(node, open = node.data, close = open === "(" ? ")" : "]") {
	if (node.$fe) return node.$fe;
	const stack = [node];
	while ((node = /* @__PURE__ */ _next(node)) && stack.length > 0) if (node.nodeType === 8) {
		if (node.data === open) {
			if (node.$fe) node = node.$fe;
			else stack.push(node);
		} else if (node.data === close) {
			const matchingOpen = stack.pop();
			matchingOpen.$fe = node;
			if (stack.length === 0) return node;
		}
	}
	return null;
}
/**
* The close marker of a claimed range once its content hydrated. The cursor
* normally rests on it, so only a mismatch pays for the walk from `start`.
*/
function locateClaimedEnd(start) {
	const node = currentHydrationNode;
	if (node && isComment(node, start.data === "(" ? ")" : "]") && !isClaimedAnchor(node)) return start.$fe = node;
	return locateEndAnchor(start);
}
function handleMismatch(node, template, adoptChildren, ns) {
	warnHydrationNodeMismatch(node, template);
	if (isRangeStart(node)) removeFragmentNodes(node);
	const shouldPreserveAnchor = isClaimedAnchor(node);
	const container = /* @__PURE__ */ parentNode(node);
	const next = shouldPreserveAnchor ? node : /* @__PURE__ */ _next(node);
	if (!shouldPreserveAnchor) remove(node, container);
	if (template[0] !== "<") {
		const newNode = markRecreatedNode(/* @__PURE__ */ createTextNode(template));
		container.insertBefore(newNode, next);
		if (!shouldPreserveAnchor) updateLastLocatedLogicalChild(container, node, newNode);
		return newNode;
	}
	const newNode = parseTemplate(template, ns).cloneNode(true);
	markRecreatedNode(newNode);
	if (newNode.nodeType === 1) {
		const descendants = newNode.querySelectorAll("*");
		for (let i = 0; i < descendants.length; i++) markRecreatedNode(descendants[i]);
		const slotScopeIds = currentRenderContext.slotScopeIds;
		if (slotScopeIds) setElementScopeIdsDeep(newNode, slotScopeIds);
	}
	if (adoptChildren && node.nodeType === 1 && !newNode.firstChild) {
		let child = node.firstChild;
		while (child) {
			const nextChild = child.nextSibling;
			newNode.appendChild(child);
			child = nextChild;
		}
	}
	container.insertBefore(newNode, next);
	if (!shouldPreserveAnchor) updateLastLocatedLogicalChild(container, node, newNode);
	return newNode;
}
function parseAdoptTargetImpl(template) {
	let type;
	let tag = null;
	let tagUpper = null;
	let blank = false;
	if (template[0] !== "<") {
		type = 3;
		blank = template.trim() === "";
	} else if (template[1] === "!") type = 8;
	else {
		type = 1;
		const match = START_TAG_RE.exec(template);
		if (match) {
			tag = match[1].toLowerCase();
			tagUpper = match[1].toUpperCase();
		}
	}
	return {
		type,
		tag,
		tagUpper,
		blank
	};
}
/**
* Whether a server-rendered node can be adopted for the given client
* template: the node type must match the template's expected type, and
* element tags must match exactly — a prefix check is not enough
* (e.g. a server `<i>` must not be adopted for a client `<ins>`).
* The uppercase identity compare handles HTML elements without allocating;
* the lowercase fallback covers case-preserving foreign elements (SVG/MathML).
*/
function matchesAdoptTarget(node, target) {
	if (node.nodeType !== target.type) return false;
	if (target.type !== 1) return true;
	return !target.tag || node.tagName === target.tagUpper || node.tagName.toLowerCase() === target.tag;
}
function validateHydrationTarget(node, template) {
	if (!matchesAdoptTarget(node, parseAdoptTargetImpl(template))) warnHydrationNodeMismatch(node, template);
}
function hydrateTextNode(node, expected) {
	if (node.nodeType !== 3) return false;
	const text = node;
	if (text.data === expected) return true;
	const parent = text.parentElement;
	if (parent && !isMismatchAllowed(parent, 0)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warnHydrationTextMismatch(text, expected);
		logMismatchError();
	}
	text.data = expected;
	return true;
}
function warnHydrationTextMismatch(node, expected) {
	warn(`Hydration text mismatch in`, node.parentNode, `\n  - rendered on server: ${JSON.stringify(node.data)}\n  - expected on client: ${JSON.stringify(expected)}`);
}
function warnHydrationNodeMismatch(node, expected) {
	if (!isMismatchAllowed(node.parentElement, 1)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn(`Hydration node mismatch:\n- rendered on server:`, node, node.nodeType === 3 ? `(text)` : isRangeStart(node) ? `(start of fragment)` : ``, `\n- expected on client:`, expected);
		logMismatchError();
	}
}
function removeFragmentNodes(node, endAnchor) {
	const parent = /* @__PURE__ */ parentNode(node);
	if (!parent) return;
	const end = endAnchor || locateEndAnchor(node);
	while (true) {
		const next = /* @__PURE__ */ _next(node);
		if (next && next !== end) remove(next, parent);
		else break;
	}
}
function removeHydrationNode(node, close = null) {
	const parent = /* @__PURE__ */ parentNode(node);
	if (!parent) return;
	if (isRangeStart(node)) {
		const end = locateEndAnchor(node);
		removeFragmentNodes(node, end || void 0);
		const endParent = end && /* @__PURE__ */ parentNode(end);
		if (end && end !== close && endParent) remove(end, endParent);
	} else if (isComment(node, "teleport start")) {
		const end = locateEndAnchor(node, "teleport start", "teleport end");
		removeFragmentNodes(node, end || void 0);
		const endParent = end && /* @__PURE__ */ parentNode(end);
		if (end && end !== close && endParent) remove(end, endParent);
	}
	remove(node, parent);
}
/**
* Removes unclaimed server-rendered nodes and reports a children mismatch.
* Trims `node` alone by default, the rest of `container`'s child list when
* `container` is given, or the logical siblings up to `close` when leaving a
* hydration boundary (which also moves the cursor onto `close`). Range cleanup
* keeps reused hydration anchors in place.
*/
function cleanupHydrationTail(node, container, close = null) {
	if (close) {
		let cur = node;
		let hasRemovableNode = false;
		while (cur && cur !== close) {
			if (!isClaimedAnchor(cur)) hasRemovableNode = true;
			cur = nextLogicalSibling(cur);
		}
		if (!cur) return;
		if (!hasRemovableNode) {
			setCurrentHydrationNode(close);
			return;
		}
	}
	const mismatchContainer = container || node.parentElement;
	if (mismatchContainer instanceof Element) warnHydrationChildrenMismatch(mismatchContainer);
	if (!container && !close) {
		removeHydrationNode(node);
		return;
	}
	let current = node;
	while (current && current !== close && (!container || current.parentNode === container)) {
		const next = nextLogicalSibling(current);
		if (!isClaimedAnchor(current)) removeHydrationNode(current, close);
		current = next;
	}
	if (close) setCurrentHydrationNode(close);
}
/**
* Claim a node as some fragment's insertion anchor standing AT an SSR
* logical position. Claiming a previously untracked anchor promotes it into
* the position stream — a revived deferred branch does this when its runtime
* anchor takes over the logical unit the branch occupies. Use
* `claimUntrackedAnchor` for an anchor that must stay invisible to traversal.
*/
function claimAnchor(node) {
	node.$vha = 1;
	return node;
}
/**
* Claim a node as an anchor that holds no SSR logical position, so hydration
* traversal steps over it and inserting one mid-pass cannot shift the
* positions the server output defines. See `2`.
*/
function claimUntrackedAnchor(node) {
	node.$vha = 3;
	return node;
}
/**
* Whether some fragment owns this node as its insertion anchor, whatever its
* origin. Cleanup and mismatch recovery must leave it in place.
*/
function isClaimedAnchor(node) {
	return !!node && !!(node.$vha & 1);
}
function markRecreatedNode(node) {
	node.$rcn = 1;
	return node;
}
function isRecreatedNode(node) {
	return !!node && node.$rcn === 1;
}
/**
* SSR omits empty text nodes. Block owners consume their opening markers
* before template adoption. Preserve any remaining boundary or sibling while
* seeding the missing text at its logical position.
*/
function resolveBlankTextTarget(node, parent) {
	node = skipUntrackedAnchors(node);
	if (node && node.nodeType === 3) return node;
	const text = /* @__PURE__ */ createTextNode();
	parent.insertBefore(text, node);
	if (node) updateLastLocatedLogicalChild(parent, node, text);
	return text;
}
function resolveHydrationTarget(node) {
	while (true) {
		const flags = node.$vha;
		if (flags) {
			if (!(flags & 2)) return node;
		} else if (!(isRangeStart(node) || isRangeEnd(node) || isComment(node, "teleport start") || isComment(node, "teleport end"))) return node;
		const next = node.nextSibling;
		if (!next) return node;
		node = next;
	}
}
function warnHydrationChildrenMismatch(container) {
	if (container && !isMismatchAllowed(container, 1)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn(`Hydration children mismatch on`, container, `\nServer rendered element contains more child nodes than client nodes.`);
		logMismatchError();
	}
}
function enterHydrationBoundary(close) {
	return () => trimHydrationBoundary(close);
}
/** Trim the unclaimed SSR nodes left between the cursor and `close`. */
function trimHydrationBoundary(close) {
	const node = currentHydrationNode;
	if (close && node && node !== close && !(close.compareDocumentPosition(node) & 4)) cleanupHydrationTail(node, void 0, close);
}
//#endregion
//#region packages/runtime-vapor/src/vdomInteropState.ts
let isInteropEnabled = false;
function setInteropEnabled() {
	isInteropEnabled = true;
}
const interopKey = Symbol(`interop`);
/**
* Carries the live VDOM slots ref on the raw-slots object handed to a vapor
* component mounted from VDOM. Replaces the old overloaded `_` key, which
* elsewhere means SlotFlags (vdom slots) or VaporSlotStability (slot
* functions).
*/
const interopSlotsKey = Symbol(`interopSlots`);
//#endregion
//#region packages/runtime-vapor/src/componentEmits.ts
/**
* The logic from core isn't too reusable so it's better to duplicate here
*/
function normalizeEmitsOptions(comp) {
	const cached = comp.__emitsOptions;
	if (cached) return cached;
	const raw = comp.emits;
	if (!raw) return null;
	let normalized;
	if (isArray(raw)) {
		normalized = {};
		for (const key of raw) normalized[key] = null;
	} else normalized = raw;
	return comp.__emitsOptions = normalized;
}
function emit(instance, event, ...rawArgs) {
	const vnode = isInteropEnabled && instance.interopVNode;
	baseEmit(instance, vnode ? vnode.props || EMPTY_OBJ : instance.rawValues, defaultPropGetter, event, ...rawArgs);
}
//#endregion
//#region packages/runtime-vapor/src/once.ts
/**
* Whether the code running now belongs to a v-once region: slot content or
* fallback rendered by a `<slot v-once>`, or a compiled v-once directive.
* While set, renderEffect runs its function once instead of creating an
* effect. Every component boundary resets it (Vapor setup, vdom mount), and
* deferred work captures it at creation. Call sites test `inOnce` first so
* the common path pays neither the closure nor the call.
*/
let inOnce = false;
function withOnce(fn, value = true) {
	if (inOnce === value) return fn();
	const prev = inOnce;
	try {
		inOnce = value;
		return fn();
	} finally {
		inOnce = prev;
	}
}
//#endregion
//#region packages/runtime-vapor/src/suspense.ts
let isSuspenseEnabled = false;
let currentUnmountSuspense;
function enableSuspense() {
	isSuspenseEnabled = true;
}
function setCurrentUnmountSuspense(suspense) {
	try {
		return currentUnmountSuspense;
	} finally {
		currentUnmountSuspense = suspense;
	}
}
/**
* Establishes `suspense` as the active unmount pass's boundary around `fn`.
* The single entry point for the ambient: unmountComponent and the interop
* vnode unmount re-enter through this when their explicit argument differs
* from the active pass.
*/
function runWithUnmountSuspense(suspense, fn) {
	const prev = setCurrentUnmountSuspense(suspense);
	try {
		return fn();
	} finally {
		setCurrentUnmountSuspense(prev);
	}
}
/**
* The effective boundary for a teardown reached without a parameter channel —
* scope-disposal callbacks and block removal: the active unmount pass's
* boundary when one is set, the caller's fallback otherwise.
*/
function resolveUnmountSuspense(fallback) {
	return currentUnmountSuspense === void 0 ? fallback : currentUnmountSuspense;
}
//#endregion
//#region packages/runtime-vapor/src/vdomSlotOwner.ts
const vdomOwners = /* @__PURE__ */ new WeakMap();
/**
* Registers a vdom instance that renders vapor slots: the effects created
* under it from now on re-render it.
*/
function initVdomOwner(owner) {
	if (vdomOwners.has(owner)) return;
	owner.isUpdating = true;
	const state = {
		stale: false,
		updating: false,
		update: () => {
			if (state.stale && owner.effect.active) owner.update();
		}
	};
	state.update.i = owner;
	state.update.flags |= 2;
	vdomOwners.set(owner, state);
	(owner.bu || (owner.bu = [])).push(() => {
		state.stale = false;
	});
}
/**
* The owner patches one of its vapor slots in place: new slot props are part
* of this render.
*/
function patchVdomSlot(owner, patch) {
	const state = owner && vdomOwners.get(owner);
	if (!state) return patch();
	state.updating = true;
	try {
		patch();
	} finally {
		state.updating = false;
	}
}
function runVdomOwned() {
	const state = vdomOwners.get(this.i);
	const prev = state.updating;
	state.updating = true;
	try {
		RenderEffect.prototype.run.call(this);
	} finally {
		state.updating = prev;
	}
}
function notifyVdomOwner() {
	RenderEffect.prototype.notify.call(this);
	if (this.flags & 256) return;
	const owner = this.i;
	const state = vdomOwners.get(owner);
	if (owner.isMounted && !state.updating) {
		state.stale = true;
		queueJob(state.update, owner.uid);
	}
}
/**
* Makes a RenderEffect created under a registered vdom owner re-render it.
*/
function adoptVdomOwnedEffect(effect, owner) {
	if (vdomOwners.has(owner)) {
		effect.notify = notifyVdomOwner;
		effect.run = runVdomOwned;
	}
}
//#endregion
//#region packages/runtime-vapor/src/renderEffect.ts
var RenderEffect = class extends ReactiveEffect {
	constructor(render, noLifecycle = false) {
		super(noLifecycle ? render : void 0);
		const slotOwner = currentRenderContext.slotOwner;
		if (slotOwner) this.slotOwner = slotOwner;
		this.render = render;
		const instance = currentInstance;
		const vdomOwner = isInteropEnabled && instance && !instance.vapor ? instance : null;
		if (vdomOwner && !vdomOwner.effectCount) vdomOwner.effectCount = 1;
		this.order = instance ? instance.effectCount++ : 0;
		if (!!(process.env.NODE_ENV !== "production") && !this.subs && !isVaporComponent(instance)) warn("renderEffect called without active EffectScope or Vapor instance.");
		if (!!(process.env.NODE_ENV !== "production") && instance && !noLifecycle) {
			this.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
			this.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
		}
		this.i = instance;
		this.job = void 0;
		this.flags |= 128;
		if (vdomOwner) adoptVdomOwnedEffect(this, vdomOwner);
	}
	createJob() {
		const job = () => {
			if (!(this.flags & 256) && this.dirty) {
				const deferred = isSuspenseEnabled && this.i && this.i.deferredKeepAliveUpdates;
				if (deferred) {
					if (isDeferredKeepAliveStateLive(deferred)) {
						deferred.effects.push(job);
						return;
					}
					settleDeferredKeepAliveUpdates(deferred, job);
					return;
				}
				if (this.i && this.i.selectUpdates) queueSelectUpdates(this.i);
				this.run();
			}
		};
		if (this.i) job.i = this.i;
		job.flags |= 2;
		return this.job = job;
	}
	fn() {
		const instance = this.i;
		const scope = this.subs ? this.subs.sub : void 0;
		const hasUpdateHooks = instance && (instance.bu || instance.u);
		if (!!(process.env.NODE_ENV !== "production") && instance) {
			pushWarningContext(instance);
			startMeasure(instance, `renderEffect`);
		}
		const prev = setCurrentInstance(instance, scope);
		try {
			if (hasUpdateHooks && instance.isMounted && !instance.isUpdating) {
				instance.isUpdating = true;
				try {
					instance.bu && invokeArrayFns(instance.bu);
					this.render();
				} catch (err) {
					instance.isUpdating = false;
					throw err;
				}
				let updateJob = this.updateJob;
				if (!updateJob) updateJob = this.updateJob = () => {
					instance.isUpdating = false;
					instance.u && invokeArrayFns(instance.u);
				};
				queuePostRenderEffect(updateJob, void 0, instance.suspense);
			} else this.render();
		} finally {
			restoreCurrentInstance(prev);
			if (!!(process.env.NODE_ENV !== "production") && instance) {
				endMeasure(instance, `renderEffect`);
				popWarningContext();
			}
		}
	}
	notify() {
		if (!(this.flags & 256)) queueJob(this.job || this.createJob(), this.i ? this.i.uid : void 0, false, this.order);
	}
};
function renderEffect(fn, noLifecycle = false) {
	if (inOnce) return fn();
	new RenderEffect(fn, noLifecycle).run();
}
/**
* Re-applies a select's selection after the current owner's effects update
* its options. A vdom owner rendering vapor content runs it from its updated
* hooks instead. Returns the registered callback.
*/
function registerSelectUpdate(update) {
	const instance = currentInstance;
	if (isInteropEnabled && !instance.vapor) {
		let active = true;
		const hook = () => {
			if (active) update();
		};
		const hooks = instance.u || (instance.u = []);
		hooks.unshift(hook);
		onScopeDispose(() => {
			active = false;
			remove$1(hooks, hook);
		});
		return hook;
	} else {
		const updates = instance.selectUpdates || (instance.selectUpdates = /* @__PURE__ */ new Set());
		updates.add(update);
		onScopeDispose(() => updates.delete(update));
		return update;
	}
}
function queueSelectUpdates(instance) {
	if (instance.selectUpdates.size) queuePostRenderEffect(instance.selectUpdateJob || (instance.selectUpdateJob = () => {
		for (const update of instance.selectUpdates) update();
	}), instance.uid, instance.suspense);
}
//#endregion
//#region packages/runtime-vapor/src/asyncComponentState.ts
let isAsyncComponentEnabled = false;
function enableAsyncComponent() {
	isAsyncComponentEnabled = true;
}
//#endregion
//#region packages/runtime-vapor/src/keepAlive.ts
let isKeepAliveEnabled = false;
let currentCacheKey;
function enableKeepAlive() {
	isKeepAliveEnabled = true;
}
function withKeepAliveEnabled(value) {
	enableKeepAlive();
	return value;
}
function getKeepAliveContext(instance) {
	let owner = instance;
	while (isAsyncComponentEnabled && owner && owner.vapor && isAsyncWrapper(owner)) owner = owner.parent;
	return owner && owner.vapor && isKeepAlive(owner) ? owner.ctx : null;
}
function withCurrentCacheKey(key, fn) {
	if (key === void 0) return fn();
	const prev = currentCacheKey;
	currentCacheKey = key;
	try {
		return fn();
	} finally {
		currentCacheKey = prev;
	}
}
//#endregion
//#region packages/runtime-vapor/src/externalClasses.ts
function normalizeExternalClasses(value, auxiliary = true) {
	const normalized = normalizeClass$1(value).trim();
	if (!normalized) return [];
	const classes = normalized.split(/\s+/);
	const result = auxiliary ? [] : classes;
	for (let i = 0; i < classes.length; i++) {
		const cls = "^" + classes[i];
		if (auxiliary) result.push(cls, cls + "-external");
		else result[i] = cls;
	}
	return result;
}
function resolveExternalClass(el, value) {
	if (!value || value.indexOf("^") === -1) return value;
	const effect = activeSub;
	const owner = effect && effect.slotOwner || getScopeOwner();
	const cached = el.$externalClass;
	if (cached && cached.raw === value && cached.owner === owner) return cached.value;
	let maxLevel = 0;
	const classes = value.split(/\s+/);
	let length = 0;
	for (let i = 0; i < classes.length; i++) {
		const cls = classes[i];
		let level = 0;
		while (cls.charCodeAt(level) === 94) level++;
		if (cls.length > level) {
			if (level > maxLevel) maxLevel = level;
			classes[length++] = level ? cls.slice(level) : cls;
		}
	}
	classes.length = length;
	const result = classes.join(" ");
	let current = owner && owner.uniScopeOwner;
	let count = 0;
	while (current && count < maxLevel) {
		const type = current.type;
		if (!type.__reserved && type.__scopeId) {
			if (!el.hasAttribute(type.__scopeId)) el.setAttribute(type.__scopeId, "");
			count++;
		}
		current = current.uniScopeOwner;
	}
	el.$externalClass = {
		raw: value,
		value: result,
		owner
	};
	return result;
}
function resolveExternalClassProp(propsValues, key, value) {
	const previous = propsValues[key];
	if (isObject(value)) {
		const cached = previous;
		if (cached && cached._externalClassSource === value) return cached;
		const result = /* @__PURE__ */ computed$1(() => normalizeExternalClasses(value));
		result._externalClassSource = value;
		return result;
	}
	const normalized = normalizeExternalClasses(value);
	return isArray(previous) && normalized.join(" ") === normalizeClass$1(previous) ? previous : normalized;
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/objectSpread2.js
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
//#endregion
//#region packages/runtime-vapor/src/componentProps.ts
const fallthroughOnlyKey = Symbol(!!(process.env.NODE_ENV !== "production") ? "fallthrough only" : "");
function resolveSource(source) {
	return isFunction(source) ? resolveFunctionSource(source) : source;
}
function resolveFunctionSource(source) {
	if (source._cache) return source._cache.value;
	const parent = currentInstance && currentInstance.parent;
	if (parent) {
		const prev = setCurrentInstance(parent, getCurrentScope());
		try {
			source._cache = /* @__PURE__ */ computed$1((oldValue) => {
				const prevInner = setCurrentInstance(parent);
				try {
					return stabilizeDynamicSourceValue(oldValue, source());
				} finally {
					restoreCurrentInstance(prevInner);
				}
			});
			onScopeDispose(() => source._cache = void 0);
		} finally {
			restoreCurrentInstance(prev);
		}
		return source._cache.value;
	}
	return source();
}
function snapshotRawProps(rawProps) {
	const snapshot = Object.create(null);
	for (const key in rawProps) if (key !== "$") snapshot[key] = freezeValue(key, readSource(rawProps[key]));
	const dynamicSources = rawProps.$;
	if (dynamicSources) {
		const snapshotSources = [];
		for (let i = 0; i < dynamicSources.length; i++) {
			const source = dynamicSources[i];
			const isDynamic = isFunction(source);
			const resolved = readSource(source) || EMPTY_OBJ;
			const value = Object.create(null);
			for (const key in resolved) value[key] = freezeValue(key, isDynamic ? resolved[key] : readSource(resolved[key]));
			snapshotSources[i] = value;
		}
		const symbols = Object.getOwnPropertySymbols(dynamicSources);
		for (let i = 0; i < symbols.length; i++) snapshotSources[symbols[i]] = dynamicSources[symbols[i]];
		snapshot.$ = snapshotSources;
	}
	return snapshot;
}
function readSource(source) {
	return isFunction(source) ? source() : source;
}
function freezeValue(key, value) {
	value = normalizePropValue(key, value);
	return isFunction(value) ? () => value : value;
}
function normalizePropValue(key, value, prevValue) {
	if (key === "class") return value && !isString(value) ? normalizeClass$1(value) : value;
	return key === "style" && isObject(value) ? stabilizeDynamicSourceValue(prevValue, normalizeStyle$1([value])) : value;
}
function stabilizeDynamicSourceValue(oldValue, value) {
	if (!isPlainObject(oldValue) || !isPlainObject(value)) return value;
	const oldKeys = Object.keys(oldValue);
	const newKeys = Object.keys(value);
	if (oldKeys.length !== newKeys.length) return value;
	for (let i = 0; i < newKeys.length; i++) {
		const key = newKeys[i];
		if (!hasOwn(oldValue, key) || !Object.is(oldValue[key], value[key])) return value;
	}
	return oldValue;
}
function getPropsProxyHandlers(comp) {
	if (comp.__propsHandlers) return comp.__propsHandlers;
	const propsOptions = normalizePropsOptions(comp)[0];
	const emitsOptions = normalizeEmitsOptions(comp);
	const isProp = propsOptions ? (key) => isString(key) && hasOwn(propsOptions, camelize$1(key)) : NO;
	const isAttr = propsOptions || emitsOptions ? (key) => isString(key) && key !== "$" && !isReservedProp(key) && !isProp(key) && !isEmitListener(emitsOptions, key) : (key) => isString(key) && !isReservedProp(key);
	const getProp = (instance, key) => {
		if (key === "__v_isReactive" || key === "__v_isShallow") return true;
		if (isProp(key)) {
			trackPropsValue(instance, key);
			return instance.propsValues[key];
		}
		return Object.prototype[key];
	};
	const externalClasses = comp.__externalClasses;
	const readProp = externalClasses ? (instance, key) => {
		const value = getProp(instance, key);
		return /* @__PURE__ */ isRef(value) && isString(key) && externalClasses.has(key) ? value.value : value;
	} : getProp;
	const propsHandlers = propsOptions ? {
		get: readProp,
		has: (_, key) => isProp(key),
		ownKeys: () => Object.keys(propsOptions),
		getOwnPropertyDescriptor(target, key) {
			if (isProp(key)) return {
				configurable: true,
				enumerable: true,
				get: () => readProp(target, key)
			};
		}
	} : null;
	if (!!(process.env.NODE_ENV !== "production") && propsOptions) Object.assign(propsHandlers, {
		set: propsSetDevTrap,
		deleteProperty: propsDeleteDevTrap
	});
	const getAttr = (instance, key) => {
		if (isAttr(key)) {
			trackPropsValue(instance, key);
			if (hasOwn(instance.propsValues, key)) return instance.propsValues[key];
		}
		return Object.prototype[key];
	};
	const hasAttr = (instance, key) => {
		if (!isAttr(key)) return false;
		trackPropsValue(instance, key);
		return hasOwn(instance.propsValues, key);
	};
	const attrsHandlers = {
		get: getAttr,
		has: hasAttr,
		ownKeys(target) {
			trackPropsValue(target, ATTR_KEYS);
			return Object.keys(target.propsValues).filter(isAttr);
		},
		getOwnPropertyDescriptor(target, key) {
			if (hasAttr(target, key)) return {
				configurable: true,
				enumerable: true,
				get: () => getAttr(target, key)
			};
		}
	};
	if (!!(process.env.NODE_ENV !== "production")) Object.assign(attrsHandlers, {
		set: propsSetDevTrap,
		deleteProperty: propsDeleteDevTrap
	});
	return comp.__propsHandlers = [propsHandlers, attrsHandlers];
}
function getAttrFromRawProps(rawProps, key) {
	if (key === "$") return;
	const dynamicSources = rawProps.$;
	const isEvent = dynamicSources && isString(key) && isOn(key);
	const merged = key === "class" || key === "style" || isEvent ? [] : void 0;
	if (dynamicSources) {
		let i = dynamicSources.length;
		let source, isDynamic;
		while (i--) {
			source = dynamicSources[i];
			isDynamic = isFunction(source);
			source = isDynamic ? resolveFunctionSource(source) : source;
			if (source && hasOwn(source, key)) {
				const value = isDynamic ? source[key] : resolveSource(source[key]);
				if (merged) merged.push(value);
				else return value;
			}
		}
	}
	if (hasOwn(rawProps, key)) {
		const value = resolveSource(rawProps[key]);
		if (merged) merged.push(value);
		else return value;
	}
	if (merged && merged.length) {
		merged.reverse();
		return isEvent ? merged.reduce(mergeEventHandlers) : merged;
	}
	return Object.prototype[key];
}
function mergeEventHandlers(existing, incoming) {
	if (!existing) return incoming;
	return incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming)) ? [].concat(existing, incoming) : existing;
}
function hasAttrFromRawProps(rawProps, key) {
	if (key === "$") return false;
	const dynamicSources = rawProps.$;
	if (dynamicSources) {
		let i = dynamicSources.length;
		while (i--) {
			const source = resolveSource(dynamicSources[i]);
			if (source && hasOwn(source, key)) return true;
		}
	}
	return hasOwn(rawProps, key);
}
function getKeysFromRawProps(rawProps) {
	const keys = [];
	for (const key in rawProps) if (key !== "$") keys.push(key);
	const dynamicSources = rawProps.$;
	if (dynamicSources) {
		let i = dynamicSources.length;
		let source;
		while (i--) {
			source = isFunction(dynamicSources[i]) ? resolveFunctionSource(dynamicSources[i]) : dynamicSources[i];
			for (const key in source) keys.push(key);
		}
	}
	return Array.from(new Set(keys));
}
function normalizePropsOptions(comp) {
	const cached = comp.__propsOptions;
	if (cached) return cached;
	const raw = comp.props;
	if (!raw) return EMPTY_ARR;
	const normalized = {};
	const needCastKeys = [];
	baseNormalizePropsOptions(raw, normalized, needCastKeys);
	if (comp.externalClasses) {
		comp.__externalClasses = new Set(comp.externalClasses.map(camelize$1));
		for (const key of comp.__externalClasses) {
			const prop = normalized[key];
			if (prop && prop.type) prop.skipCheck = true;
		}
	}
	return comp.__propsOptions = [normalized, needCastKeys];
}
function resolveDefault(factory, instance) {
	const prev = setCurrentInstance(instance);
	try {
		return factory.call(null, instance.props);
	} finally {
		restoreCurrentInstance(prev);
	}
}
function hasFallthroughAttrs(comp, rawProps) {
	if (rawProps) {
		if (rawProps.$ || isInteropEnabled && rawProps[interopKey]) return true;
		const propsOptions = comp.props ? normalizePropsOptions(comp)[0] : null;
		for (const key in rawProps) if (!propsOptions || !hasOwn(propsOptions, camelize$1(key))) return true;
	}
	return false;
}
function resolveDynamicProps(props) {
	const mergedRawProps = {};
	for (const key in props) if (key !== "$") mergedRawProps[key] = resolveSource(props[key]);
	if (props.$) for (const source of props.$) {
		const isDynamic = isFunction(source);
		const resolved = isDynamic ? resolveFunctionSource(source) : source;
		for (const key in resolved) {
			const value = isDynamic ? resolved[key] : resolveSource(source[key]);
			if (key === "class" || key === "style") {
				const existing = mergedRawProps[key];
				mergedRawProps[key] = isArray(existing) ? [...existing, value] : [existing, value];
			} else if (isOn(key)) mergedRawProps[key] = mergeEventHandlers(mergedRawProps[key], value);
			else mergedRawProps[key] = value;
		}
	}
	return mergedRawProps;
}
function getStaticBindingKeys(props) {
	const keys = [];
	for (const key in props) if (key !== "$" && isFunction(props[key])) keys.push(key);
	if (props.$) {
		for (const source of props.$) if (!isFunction(source)) {
			for (const key in source) if (isFunction(source[key])) keys.push(key);
		}
	}
	return keys;
}
function propsSetDevTrap(_, key) {
	warn(`Attempt to mutate prop ${JSON.stringify(key)} failed. Props are readonly.`);
	return true;
}
function propsDeleteDevTrap(_, key) {
	warn(`Attempt to delete prop ${JSON.stringify(key)} failed. Props are readonly.`);
	return true;
}
const rawPropsProxyHandlers = {
	get: getAttrFromRawProps,
	has: hasAttrFromRawProps,
	ownKeys: getKeysFromRawProps,
	getOwnPropertyDescriptor(target, key) {
		if (hasAttrFromRawProps(target, key)) return {
			configurable: true,
			enumerable: true,
			get: () => getAttrFromRawProps(target, key)
		};
	}
};
const RAW_VALUES_KEY = Symbol(!!(process.env.NODE_ENV !== "production") ? "Raw values" : "");
const ATTR_KEYS = Symbol(!!(process.env.NODE_ENV !== "production") ? "Attr keys" : "");
const INITIAL_RAW_VALUES = {};
function trackPropsValue(instance, key) {
	if (!instance.hasDynamicProps || activeSub === void 0) return;
	const deps = instance.propsDeps || (instance.propsDeps = /* @__PURE__ */ new Map());
	let dep = deps.get(key);
	if (!dep) deps.set(key, dep = new Dep(deps, key));
	trackDep(dep, instance.propsValues, key);
}
function triggerPropsValue(instance, key, newValue, oldValue) {
	const deps = instance.propsDeps;
	if (deps) {
		const dep = deps.get(key);
		if (dep) triggerDep(dep, instance.propsValues, key, newValue, oldValue);
	}
}
function trackRawValues(instance) {
	trackPropsValue(instance, RAW_VALUES_KEY);
	return instance.rawValues;
}
function initInputs(instance, once = false) {
	const scope = isKeepAliveEnabled && instance.inputScope || instance.scope;
	const prevEffect = isKeepAliveEnabled && instance.inputEffect;
	if (prevEffect) prevEffect.stop();
	const parent = instance.parent || instance;
	const rawProps = instance.rawProps;
	const cells = instance.slotSources;
	const prev = setCurrentInstance(parent, scope);
	try {
		const dynamicSources = rawProps.$;
		const isInterop = isInteropEnabled && !!rawProps[interopKey];
		const canRebind = isKeepAliveEnabled && !!instance.inputScope;
		const hasGetters = hasDynamicPropsSource(rawProps);
		if (once || !cells && (isInterop || !canRebind && !hasGetters)) {
			instance.hasDynamicProps = !once && isInterop;
			deliverInputs(instance, isInterop ? rawProps : collectInputs(rawProps, cells), cells);
			return;
		}
		instance.hasDynamicProps = canRebind || hasGetters;
		const hasStaticKeys = !dynamicSources;
		let hasDelivered = false;
		const effect = new RenderEffect(() => {
			const prevRawValues = instance.rawValues;
			const prevInner = setCurrentInstance(parent, scope);
			let rawValues;
			let propsToUpdate;
			try {
				if (!hasDelivered || instance.hasDynamicProps) {
					if (hasDelivered && hasStaticKeys) propsToUpdate = collectPropsToUpdate(rawProps, prevRawValues);
					else {
						rawValues = collectProps(rawProps, prevRawValues.style);
						if (hasDelivered && stabilizeDynamicSourceValue(prevRawValues, rawValues) === prevRawValues) rawValues = void 0;
					}
				}
				if (cells) collectSlotSources(cells);
			} finally {
				restoreCurrentInstance(prevInner);
			}
			if (effect.active) {
				hasDelivered = false;
				deliverInputs(instance, rawValues, cells, propsToUpdate);
				hasDelivered = true;
			}
		}, true);
		if (canRebind) instance.inputEffect = effect;
		if (!prevEffect) {
			effect.run();
			if (!effect.deps && !canRebind) {
				effect.stop();
				instance.hasDynamicProps = false;
			}
		} else {
			if (scope.flags & 256) effect.pause();
			effect.notify();
		}
	} finally {
		restoreCurrentInstance(prev);
	}
}
function collectInputs(rawProps, cells) {
	const prevSub = setActiveSub();
	try {
		const rawValues = collectProps(rawProps);
		if (cells) collectSlotSources(cells);
		return rawValues;
	} finally {
		setActiveSub(prevSub);
	}
}
function deliverInputs(instance, rawValues, cells, propsToUpdate) {
	let changed = false;
	const prevSub = setActiveSub();
	startBatch();
	try {
		if (instance && (rawValues || propsToUpdate)) changed = updateProps(instance, rawValues || instance.rawValues, propsToUpdate);
		if (cells) changed = commitSlotSources(cells) || changed;
	} finally {
		try {
			endBatch();
		} finally {
			setActiveSub(prevSub);
		}
	}
	return changed;
}
function collectSlotSources(cells) {
	for (let i = 0; i < cells.length; i++) {
		const cell = cells[i];
		cell.next = cell.source();
	}
}
function commitSlotSources(cells) {
	let changed = false;
	for (let i = 0; i < cells.length; i++) {
		const cell = cells[i];
		const next = stabilizeDynamicSourceValue(cell.committed, cell.next);
		cell.next = void 0;
		if (hasChanged(next, cell.committed)) {
			changed = true;
			cell.committed = next;
			triggerDep(cell);
		}
	}
	return changed;
}
function hasDynamicPropsSource(rawProps) {
	if (rawProps.$) return true;
	for (const key in rawProps) if (isFunction(rawProps[key])) return true;
	return false;
}
function collectProps(rawProps, prevStyle) {
	const rawValues = Object.create(null);
	const dynamicSources = rawProps.$ || EMPTY_ARR;
	const attrs = rawProps[fallthroughOnlyKey] ? dynamicSources[0]() : void 0;
	const isMerging = attrs ? attrs !== EMPTY_OBJ : dynamicSources.length > 0;
	for (let i = -1; i < dynamicSources.length; i++) {
		const source = i < 0 ? rawProps : dynamicSources[i];
		const isDynamic = isFunction(source);
		const resolved = attrs && i === 0 ? attrs : isDynamic ? source() : source;
		for (const key in resolved) {
			if (i < 0 && key === "$") continue;
			const value = isDynamic ? resolved[key] : readSource(resolved[key]);
			if (!isMerging) rawValues[key] = value;
			else if (key === "class") {
				if (rawValues.class !== value) rawValues.class = normalizeClass$1([rawValues.class, value]);
			} else if (key === "style") rawValues.style = normalizeStyle$1([rawValues.style, value]);
			else if (isOn(key)) {
				const existing = rawValues[key];
				if (value && existing !== value && !(isArray(existing) && existing.includes(value))) rawValues[key] = existing ? [].concat(existing, value) : value;
				else if (value == null && existing == null && !isModelListener(key)) rawValues[key] = value;
			} else if (key !== "") rawValues[key] = value;
		}
	}
	if (isMerging) {
		if (rawValues.style) rawValues.style = stabilizeDynamicSourceValue(prevStyle, rawValues.style);
	} else {
		if (rawValues.class) rawValues.class = normalizePropValue("class", rawValues.class);
		if (rawValues.style) rawValues.style = normalizePropValue("style", rawValues.style, prevStyle);
	}
	return rawValues;
}
function collectPropsToUpdate(rawProps, prevRawValues) {
	let propsToUpdate;
	for (const key in rawProps) {
		const source = rawProps[key];
		if (isFunction(source)) {
			const prevValue = prevRawValues[key];
			const value = normalizePropValue(key, source(), prevValue);
			if (hasChanged(value, prevValue)) (propsToUpdate || (propsToUpdate = [])).push(key, value);
		}
	}
	return propsToUpdate;
}
function updateProps(instance, rawValues, propsToUpdate) {
	const propsValues = instance.propsValues;
	const [options, needCastKeys] = normalizePropsOptions(instance.type);
	const emitsOptions = normalizeEmitsOptions(instance.type);
	const prevRawValues = instance.rawValues;
	const isInitial = prevRawValues === INITIAL_RAW_VALUES;
	if (propsToUpdate) for (let i = 0; i < propsToUpdate.length; i += 2) rawValues[propsToUpdate[i]] = propsToUpdate[i + 1];
	else if (!isInitial) rawValues = stabilizeDynamicSourceValue(prevRawValues, rawValues);
	instance.rawValues = rawValues;
	if (propsToUpdate || !isInitial && rawValues !== prevRawValues) triggerPropsValue(instance, RAW_VALUES_KEY);
	const vnode = isInteropEnabled && instance.interopVNode;
	if (vnode && vnode.vi) vnode.props = _objectSpread2({}, rawValues);
	const present = propsToUpdate || isInitial ? void 0 : Object.create(null);
	let rawCastValues;
	const keys = propsToUpdate || Object.keys(rawValues);
	for (let i = 0; i < keys.length; i += propsToUpdate ? 2 : 1) {
		let key = keys[i];
		if (isReservedProp(key)) continue;
		let value = rawValues[key];
		const camelKey = camelize$1(key);
		if (options && hasOwn(options, camelKey)) {
			key = camelKey;
			if (needCastKeys && needCastKeys.includes(key)) {
				if (!rawCastValues) rawCastValues = Object.create(null);
				rawCastValues[key] = value;
				continue;
			}
		} else if (isEmitListener(emitsOptions, key)) continue;
		else if (key === "class" && isString(value) && (instance.scopeId || value.indexOf("^") !== -1) && !instance.type.__reserved && !(instance.type.__externalClasses && instance.type.__externalClasses.has(key))) value = normalizeExternalClasses(value, false).join(" ");
		if (present) present[key] = true;
		setPropValue(instance, key, value, isInitial);
	}
	if (needCastKeys && (rawCastValues || !propsToUpdate)) for (let i = 0; i < needCastKeys.length; i++) {
		const key = needCastKeys[i];
		const isAbsent = !rawCastValues || !hasOwn(rawCastValues, key);
		if (isAbsent && propsToUpdate) continue;
		setPropValue(instance, key, resolvePropValue(options, key, isAbsent ? void 0 : rawCastValues[key], instance, resolveDefault, isAbsent), isInitial, isAbsent);
		if (present) present[key] = true;
	}
	if (!propsToUpdate) {
		for (const key in options) if (present ? !present[key] : !hasOwn(propsValues, key)) {
			setPropValue(instance, key, resolvePropValue(options, key, void 0, instance, resolveDefault, true), isInitial, true);
			if (present) present[key] = true;
		}
		if (present) {
			for (const key in propsValues) if (!present[key]) {
				const oldValue = propsValues[key];
				delete propsValues[key];
				triggerPropsValue(instance, key, void 0, oldValue);
				triggerPropsValue(instance, ATTR_KEYS);
			}
		}
	}
	if (!!(process.env.NODE_ENV !== "production") && options) {
		pushWarningContext(instance);
		try {
			validateProps(rawValues, instance.props, options);
		} finally {
			popWarningContext();
		}
	}
	return !!propsToUpdate || rawValues !== prevRawValues;
}
function setPropValue(instance, key, value, isInitial, isAbsent = false) {
	const propsValues = instance.propsValues;
	const externalClasses = instance.type.__externalClasses;
	if (!isAbsent && externalClasses && externalClasses.has(key)) {
		value = resolveExternalClassProp(propsValues, key, value);
		if (value === propsValues[key]) return;
	}
	if (isInitial) {
		propsValues[key] = value;
		return;
	}
	const hadKey = hasOwn(propsValues, key);
	const oldValue = propsValues[key];
	propsValues[key] = value;
	if (!hadKey) {
		triggerPropsValue(instance, key, value);
		triggerPropsValue(instance, ATTR_KEYS);
	} else if (hasChanged(value, oldValue)) triggerPropsValue(instance, key, value, oldValue);
}
/**
* A DynamicFragment created as a slot root under a slot boundary: `update()`
* asks the boundary whether to render its branch held (see `isHolding`).
*/
const SLOT_ROOT = 2048;
//#endregion
//#region packages/runtime-vapor/src/dom/event.ts
let nativeEventNormalizer;
function setNativeEventNormalizer(normalize) {
	nativeEventNormalizer = normalize;
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
	return () => el.removeEventListener(event, handler, options);
}
function on(el, event, handler, options) {
	if (isArray(handler)) handler.forEach((fn) => on(el, event, fn, options));
	else {
		if (!handler) return;
		el.addEventListener(event, createInvoker(handler, true), options);
	}
}
function onBinding(el, event, handler, options) {
	if (isArray(handler)) {
		handler.forEach((fn) => onBinding(el, event, fn, options));
		return;
	}
	if (!handler) return;
	if (options && options.once) {
		const firedKey = `$evtonce_${options.capture ? 1 : 0}_${event}`;
		if (el[firedKey]) return;
		const invoker = handler;
		handler = (...args) => {
			el[firedKey] = true;
			return invoker(...args);
		};
		handler.__wwe = invoker.__wwe;
	}
	onEffectCleanup(addEventListener(el, event, createInvoker(handler, true), options));
}
/**
* A dynamic listener keeps one native listener per key across effect re-runs,
* like a vdom invoker. A root's own `on*` binding and the fallthrough one are
* two layers of it: the own handlers run first, then the fallthrough ones not
* already among them, so re-binding either layer keeps that order. #15635
*/
function setListener(el, key, value) {
	const invokers = el.$vei || (el.$vei = {});
	const invoker = invokers[key] || (invokers[key] = {
		own: null,
		attrs: null,
		handlers: null,
		remove: void 0,
		fired: false
	});
	const layer = isApplyingFallthroughProps ? "attrs" : "own";
	invoker[layer] = value;
	if (composeHandlers(invoker).length) {
		if (!invoker.remove && !invoker.fired) attachInvoker(el, key, invoker);
	} else if (invoker.remove) {
		invoker.remove();
		invoker.remove = void 0;
	}
	onEffectCleanup(() => {
		invoker[layer] = null;
		invoker.handlers = null;
	});
}
function composeHandlers(invoker) {
	const { own, attrs } = invoker;
	const handlers = invoker.handlers = [];
	if (isArray(own)) {
		for (const fn of own) if (fn) handlers.push(fn);
	} else if (own) handlers.push(own);
	if (attrs) {
		const ownCount = handlers.length;
		for (const fn of isArray(attrs) ? attrs : [attrs]) if (fn) {
			const at = handlers.indexOf(fn);
			if (at < 0 || at >= ownCount) handlers.push(fn);
		}
	}
	return handlers;
}
function attachInvoker(el, key, invoker) {
	const [event, options] = parseEventName(key);
	const once = !!options && options.once;
	const i = currentInstance;
	invoker.remove = addEventListener(el, event, (e) => {
		if (once) invoker.fired = true;
		const handlers = invoker.handlers || composeHandlers(invoker);
		if (handlers.length > 1) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
		}
		const args = [e];
		let normalizedArgs;
		for (const handler of handlers) {
			if (e._stopped) break;
			callWithAsyncErrorHandling(handler, i, 5, nativeEventNormalizer && !handler.__wwe ? normalizedArgs || (normalizedArgs = [nativeEventNormalizer(e)]) : args);
		}
	}, options);
}
function delegate(el, event, handler) {
	const key = `$evt${event}`;
	const existing = el[key];
	const invoker = createInvoker(handler, true);
	if (existing) {
		if (isArray(existing)) existing.push(invoker);
		else el[key] = [existing, invoker];
	} else el[key] = invoker;
}
/**
* Event delegation borrowed from solid
*/
const delegatedEvents = /*@__PURE__*/ Object.create(null);
const delegateEvents = (...names) => {
	for (const name of names) if (!delegatedEvents[name]) {
		delegatedEvents[name] = true;
		document.addEventListener(name, delegatedEventHandler);
	}
};
const delegatedEventHandler = (e) => {
	let node = e.composedPath && e.composedPath()[0] || e.target;
	if (e.target !== node) Object.defineProperty(e, "target", {
		configurable: true,
		value: node
	});
	Object.defineProperty(e, "currentTarget", {
		configurable: true,
		get() {
			return node || document;
		}
	});
	while (node !== null) {
		const handlers = node[`$evt${e.type}`];
		if (handlers) {
			if (isArray(handlers)) {
				for (const handler of handlers) if (!node.disabled) {
					handler(e);
					if (e.cancelBubble) return;
				}
			} else if (!node.disabled) {
				handlers(e);
				if (e.cancelBubble) return;
			}
		}
		node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
	}
};
function withVaporModifiers(fn, modifiers, native = false) {
	return createInvoker(typeof fn === "function" ? withModifiers(fn, modifiers) : fn, native);
}
function withVaporKeys(fn, modifiers, native = false) {
	return createInvoker(typeof fn === "function" ? withKeys(fn, modifiers) : fn, native);
}
function createInvoker(handler, native = false) {
	const i = currentInstance;
	const isRaw = handler && handler.__wwe;
	if (native && nativeEventNormalizer && handler && !isRaw) {
		const normalize = nativeEventNormalizer;
		if (isArray(handler)) return (event) => {
			const args = [event];
			let normalizedArgs;
			const values = [];
			for (const fn of handler) values.push(callWithAsyncErrorHandling(fn, i, 5, fn && fn.__wwe ? args : normalizedArgs || (normalizedArgs = [normalize(event)])));
			return values;
		};
		return (event) => callWithAsyncErrorHandling(handler, i, 5, [normalize(event)]);
	}
	const invoker = (...args) => callWithAsyncErrorHandling(handler, i, 5, args);
	if (isRaw) invoker.__wwe = true;
	return invoker;
}
//#endregion
//#region packages/runtime-vapor/src/transition.ts
let applyTransitionHooks;
let applyTransitionLeaveHooks;
let awaitLeavingRoot;
let hasTransitionChild;
let deferBranchUpdateDuringLeave;
let removeBranchWithLeave;
let ownsTransitionMode;
let resolveOutletLeave;
let isTransitionEnabled = false;
function registerTransitionHooks(applyHooks, applyLeaveHooks, deferBranchUpdate, removeBranch, ownsMode, awaitLeaving, transitionChild, resolveLeave) {
	isTransitionEnabled = true;
	ownsTransitionMode = ownsMode;
	applyTransitionHooks = applyHooks;
	applyTransitionLeaveHooks = applyLeaveHooks;
	deferBranchUpdateDuringLeave = deferBranchUpdate;
	removeBranchWithLeave = removeBranch;
	awaitLeavingRoot = awaitLeaving;
	hasTransitionChild = transitionChild;
	resolveOutletLeave = resolveLeave;
}
function isVaporTransitionHooks(hooks) {
	return !!hooks && hooks.__vapor === true;
}
const displayName = "VaporTransition";
function isVaporTransition(component) {
	return component.displayName === displayName;
}
//#endregion
//#region packages/runtime-vapor/src/dom/prop.ts
const shouldSkipFallthroughKey = (el, key) => {
	const instance = currentInstance;
	return !isApplyingFallthroughProps && el.$root && instance.hasFallthrough && instance.type.inheritAttrs !== false && key in instance.attrs && (!shouldUseFunctionalFallthrough(instance.type) || isFunctionalFallthroughKey(key));
};
function setProp(el, key, value) {
	if (key in el) setDOMProp(el, key, value);
	else setAttr(el, key, value);
}
function setAttr(el, key, value, isSVG = false, forceHydrate = true, removed = false) {
	if (shouldSkipFallthroughKey(el, key)) return;
	if ((key[0] === "d" || key[0] === "D") && key.slice(0, 5).toLowerCase() === "data-") {
		const dataset = el.dataset;
		if (dataset instanceof Map) {
			if (removed) dataset.delete(key);
			else dataset.set(key, value);
		}
	}
	if (key === "true-value") el._trueValue = value;
	else if (key === "false-value") el._falseValue = value;
	if (isHydrating$1 && !isRecreatedNode(el)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && attributeHasMismatch(el, key, value);
		if (skipHydratedWrite(el, key, value, forceHydrate)) {
			el[`$${key}`] = value;
			return;
		}
	}
	if (value !== el[`$${key}`]) {
		el[`$${key}`] = value;
		if (isSVG && key.startsWith("xlink:")) {
			if (value != null) el.setAttributeNS(xlinkNS, key, value);
			else el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		} else {
			const isBoolean = isSpecialBooleanAttr(key);
			if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
			else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
		}
	}
}
function setDOMProp(el, key, value, forceHydrate = true, attrName) {
	if (shouldSkipFallthroughKey(el, key)) return;
	const cacheKey = `$p$${key}`;
	if (isHydrating$1 && !isRecreatedNode(el)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && attributeHasMismatch(el, key, value);
		if (skipHydratedWrite(el, key, value, forceHydrate)) {
			el[cacheKey] = value;
			return;
		}
	}
	if (value === el[cacheKey] && cacheKey in el) return;
	el[cacheKey] = value;
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
		if (!!(process.env.NODE_ENV !== "production") && !needRemove) warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
	}
	needRemove && el.removeAttribute(attrName || key);
	if ((key === "checked" || key === "selected") && !el.tagName.includes("-")) includeBooleanAttr(value) ? el.setAttribute(key, "") : el.removeAttribute(key);
}
function setClass(el, value, isSVG = false, isNormalized = false) {
	if (el.$clsFlags !== void 0) el.$clsFlags = void 0;
	if (el.$root) setClassIncremental(el, value, isNormalized);
	else {
		if (!isNormalized) value = normalizeClass$1(value);
		if (value !== el.$cls) value = resolveExternalClass(el, value);
		if (isHydrating$1 && !isRecreatedNode(el)) {
			(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && classHasMismatch(el, value, false);
			el.$cls = value;
			return;
		}
		if (value !== el.$cls) {
			if (el.$hoverUpdateClass) {
				el.$cls = value;
				el.$hoverUpdateClass();
			} else if (isTransitionEnabled) {
				el.$cls = value;
				patchClass(el, value, isSVG);
			} else if (isSVG) el.setAttribute("class", el.$cls = value);
			else el.className = el.$cls = value;
		}
	}
}
function setClassName(el, flags, cls, prefix = "", suffix = "") {
	if (flags === el.$clsFlags) return;
	let value = prefix;
	if (isString(cls)) {
		if (flags & 1) value += cls;
	} else for (let i = 0, bit = 1; i < cls.length; i++, bit <<= 1) if (flags & bit) value += cls[i];
	if (!prefix && value.charCodeAt(0) === 32) value = value.slice(1);
	if (suffix) value = value ? `${value} ${suffix}` : suffix;
	if (el.$root || isHydrating$1 || value.indexOf("^") !== -1) setClass(el, value, false, true);
	else if (el.$hoverUpdateClass) {
		el.$cls = value;
		el.$hoverUpdateClass();
	} else if (isTransitionEnabled) {
		el.$cls = value;
		patchClass(el, value, false);
	} else el.className = el.$cls = value;
	el.$clsFlags = flags;
}
function setClassIncremental(el, value, isNormalized = false) {
	const cacheKey = isApplyingFallthroughProps ? "$clsi$" : "$clsi";
	let normalizedValue = isNormalized ? value : normalizeClass$1(value);
	if (normalizedValue !== el[cacheKey]) normalizedValue = resolveExternalClass(el, normalizedValue);
	if (isHydrating$1 && !isRecreatedNode(el)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && classHasMismatch(el, normalizedValue, true);
		el[cacheKey] = normalizedValue;
		return;
	}
	const prev = el[cacheKey];
	if ((value = el[cacheKey] = normalizedValue) !== prev) {
		if (el.$hoverUpdateClass) {
			el.$hoverUpdateClass();
			return;
		}
		const nextList = value.split(/\s+/);
		if (value) el.classList.add(...nextList);
		if (prev) {
			let kept;
			for (const cls of prev.split(/\s+/)) if (!nextList.includes(cls) && !(kept || (kept = keptClasses(el))).includes(cls)) el.classList.remove(cls);
		}
	}
}
function keptClasses(el) {
	const other = isApplyingFallthroughProps ? el.$clsi : el.$clsi$;
	return other !== void 0 ? other.split(/\s+/) : el.$root.cls || EMPTY_ARR;
}
function shouldDeferCheckStyleMismatch(el) {
	return hasCssVarsInOwnerChain(currentInstance) || hasCssVars(el.style);
}
function hasCssVarsInOwnerChain(instance) {
	while (instance) {
		if (instance.getCssVars) return true;
		instance = instance.parent;
	}
	return false;
}
function hasCssVars(style) {
	for (let i = 0; i < style.length; i++) if (style.item(i).startsWith("--")) return true;
	return false;
}
function checkHydrationStyleMismatch(el, value, normalizedValue, isIncremental) {
	if (shouldDeferCheckStyleMismatch(el)) {
		const instance = currentInstance;
		queuePostFlushCb(() => {
			styleHasMismatch(el, value, normalizedValue, isIncremental, instance);
		});
	} else styleHasMismatch(el, value, normalizedValue, isIncremental);
}
function setStyle(el, value) {
	if (isHydrating$1 && /* @__PURE__ */ isReactive(value)) for (const key in value) value[key];
	if (el.$root) setStyleIncremental(el, value);
	else {
		const normalizedValue = normalizeStyle$1(value);
		if (isHydrating$1 && !isRecreatedNode(el)) {
			if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) checkHydrationStyleMismatch(el, value, normalizedValue, false);
			el.$sty = normalizedValue;
			hydrateVShowDisplay(el, normalizedValue);
			return;
		}
		patchStyle(el, el.$sty, el.$sty = normalizedValue);
	}
}
function setStyleIncremental(el, value) {
	const normalizedValue = isString(value) ? parseStringStyle(value) : normalizeStyle$1(value);
	el[isApplyingFallthroughProps ? "$styi$" : "$styi"] = normalizedValue;
	let next = normalizedValue;
	if ("$styi$" in el) {
		const base = el.$styi !== void 0 ? el.$styi : el.$root.sty;
		next = base ? extend$1({}, base, el.$styi$) : el.$styi$ || {};
	}
	if (isHydrating$1 && !isRecreatedNode(el)) {
		if ((!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && !shouldSkipFallthroughKey(el, "style")) checkHydrationStyleMismatch(el, next, next, true);
		el.$sty = next;
		hydrateVShowDisplay(el, next);
		return;
	}
	patchStyle(el, el.$sty, el.$sty = next);
}
function hydrateVShowDisplay(el, style) {
	if (vShowOriginalDisplay in el) {
		let display = isString(style) ? parseStringStyle(style).display : style && style.display;
		if (isArray(display)) display = display[display.length - 1];
		el[vShowOriginalDisplay] = display == null ? "" : String(display).replace(/\s*!important$/, "");
	}
}
function setValue(el, value, forceHydrate = true) {
	if (shouldSkipFallthroughKey(el, "value")) return;
	const { tagName } = el;
	if (!inOnce && tagName === "SELECT") {
		if (el.$valueBound === void 0) {
			const update = () => {
				if (el.$valueBound && !("_modelValue" in el)) {
					const value = el._value == null ? "" : String(el._value);
					if (el.value !== value) el.value = value;
				}
			};
			const registered = registerSelectUpdate(update);
			const instance = currentInstance;
			if (instance.isMounted) {
				if (isInteropEnabled && !instance.vapor) queuePostRenderEffect(registered, instance.uid, instance.suspense);
				else queueSelectUpdates(instance);
			}
		}
		el.$valueBound = true;
	}
	const valueDep = el._valueDep;
	const oldRawValue = valueDep && ("_value" in el ? el._value : el.value);
	el._value = value;
	if (valueDep && hasChanged(value, oldRawValue)) triggerDep(valueDep, el, "_value", value, oldRawValue);
	if (isHydrating$1 && !isRecreatedNode(el)) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && attributeHasMismatch(el, "value", isString(value) ? getClientText(el, value) : value);
		if (skipHydratedWrite(el, "value", value, forceHydrate)) return;
	}
	const oldValue = tagName === "OPTION" ? el.getAttribute("value") : el.value;
	const newValue = value == null ? "" : String(value);
	if (oldValue !== newValue) el.value = newValue;
	if (value == null) el.removeAttribute("value");
	else el.setAttribute("value", newValue);
}
/**
* Only called on text nodes!
* Compiler should also ensure value passed here is already converted by
* `toDisplayString`
*/
function setText(el, value) {
	if (isHydrating$1 && !isRecreatedNode(el) && !isRecreatedNode(el.parentNode)) {
		const clientText = getClientText(el.parentNode, value);
		if (el.nodeValue == clientText) {
			el.$txt = clientText;
			return;
		}
		const parent = el.parentElement;
		if (parent && !isMismatchAllowed(parent, 0)) {
			(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warnHydrationTextMismatch(el, value);
			logMismatchError();
		}
	}
	if (el.$txt !== value) el.nodeValue = el.$txt = value;
}
/**
* Used by setDynamicProps and `textContent` bindings, so need to guard with
* `toDisplayString`
*/
function setElementText(el, value, forceHydrate = true) {
	value = toDisplayString$1(value);
	if (isHydrating$1 && !isRecreatedNode(el)) {
		let clientText = getClientText(el, value);
		if (el.textContent === clientText) {
			el.$txt = clientText;
			return;
		}
		if (!isMismatchAllowed(el, 0)) {
			(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn(`Hydration text content mismatch on`, el, `\n  - rendered on server: ${el.textContent}\n  - expected on client: ${clientText}`);
			logMismatchError();
		}
		if (skipHydratedWrite(el, "textContent", value, forceHydrate)) {
			el.$txt = value;
			return;
		}
	}
	if (el.$txt !== value) el.textContent = el.$txt = value;
}
function setHtml(el, value, forceHydrate = true) {
	value = value == null ? "" : unsafeToTrustedHTML(value);
	if (isHydrating$1 && !isRecreatedNode(el) && skipHydratedWrite(el, "innerHTML", value, forceHydrate)) {
		el.$html = value;
		return;
	}
	if (el.$html !== value) el.innerHTML = el.$html = value;
}
function setDynamicProps(el, args, staticKeys, isSVG) {
	patchDynamicProps(el, args.length > 1 ? mergeProps(...args) : args[0] || EMPTY_OBJ, isSVG, staticKeys);
}
function syncSelectValue(el, staticKeys) {
	const props = el.$dprops;
	let key = ".value" in props ? ".value" : void 0;
	if ("value" in props && !(isHydrating$1 && !isRecreatedNode(el) && skipHydratedWrite(el, "value", props.value, !!(staticKeys && staticKeys.includes("value"))))) key = "value";
	if (!key || shouldSkipFallthroughKey(el, "value")) return;
	const value = props[key] == null ? "" : String(props[key]);
	if (el.value !== value) el.value = value;
}
function setDynamicEvents(el, events) {
	patchDynamicProps(el, toHandlers(events, true));
}
function patchDynamicProps(el, props, isSVG, staticKeys) {
	const cacheKey = `$dprops${isApplyingFallthroughProps ? "$" : ""}`;
	const prevProps = el[cacheKey];
	const nextProps = Object.create(null);
	if (prevProps) {
		for (const key in prevProps) if (!(key in props)) {
			setDynamicProp(el, key, null, isSVG, false, true);
			if ((key === "value" || key === ".value") && el.tagName === "SELECT" && !shouldSkipFallthroughKey(el, "value")) el.$valueBound = false;
		}
	}
	const hydratedKeys = isHydrating$1 ? staticKeys : void 0;
	for (const key of Object.keys(props)) {
		if (isReservedProp(key)) continue;
		const value = props[key];
		nextProps[key] = value;
		if (key === "value") continue;
		if (prevProps && key in prevProps && !isOn(key) && (value == null || typeof value !== "object") && Object.is(prevProps[key], value)) continue;
		setDynamicProp(el, key, value, isSVG, hydratedKeys && hydratedKeys.includes(key));
	}
	if ("value" in nextProps) setDynamicProp(el, "value", nextProps.value, isSVG, hydratedKeys && hydratedKeys.includes("value"));
	el[cacheKey] = nextProps;
}
/**
* @internal
*/
function setDynamicProp(el, key, value, isSVG = false, forceHydrate = false, removed = false) {
	const rawKey = key;
	if (key === "class") setClass(el, value, isSVG);
	else if (key === "style") setStyle(el, value);
	else if (isOn(key)) setListener(el, key, value);
	else if (key[0] === "." ? (key = key.slice(1), forceHydrate = true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, value, isSVG)) {
		if (key === "innerHTML") setHtml(el, value, forceHydrate);
		else if (key === "textContent") setElementText(el, value, forceHydrate);
		else if (key === "value" && canSetValueDirectly(el.tagName)) setValue(el, value, forceHydrate);
		else {
			if (isNativeOn(rawKey)) el[`$${key}`] = value;
			setDOMProp(el, key, value, forceHydrate);
		}
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(value)))) setDOMProp(el, camelize$1(key), value, forceHydrate, key);
	else {
		if (isNativeOn(rawKey)) el[`$p$${key}`] = value;
		setAttr(el, key, value, isSVG, forceHydrate, removed);
	}
	return value;
}
let isOptimized = false;
/**
* Optimize property lookup for cache properties on Element and Text nodes
*/
function optimizePropertyLookup() {
	if (isOptimized) return;
	isOptimized = true;
	const proto = Element.prototype;
	proto.$transition = void 0;
	proto.$key = void 0;
	proto.$evtclick = void 0;
	proto.$vei = void 0;
	proto.$root = false;
	proto.$clsFlags = void 0;
	proto.$cls = proto.$sty = "";
	proto.$html = void 0;
	Text.prototype.$txt = void 0;
}
function classHasMismatch(el, expected, isIncremental) {
	const actual = el.getAttribute("class");
	const actualClassSet = toClassSet(actual || "");
	const expectedClassSet = toClassSet(expected);
	let hasMismatch = false;
	if (isIncremental) {
		if (expected) hasMismatch = Array.from(expectedClassSet).some((cls) => !actualClassSet.has(cls));
	} else hasMismatch = !isSetEqual(actualClassSet, expectedClassSet);
	if (hasMismatch) {
		if (warnPropMismatch(el, "class", 2, actual, expected)) {
			logMismatchError();
			return true;
		}
	}
	return false;
}
function styleHasMismatch(el, value, normalizedValue, isIncremental, instance = currentInstance) {
	const actual = el.getAttribute("style");
	const actualStyleMap = toStyleMap(actual || "");
	const expected = normalizeRpx(isString(value) ? value : stringifyStyle(normalizedValue));
	const expectedStyleMap = toStyleMap(expected);
	if (el[vShowHidden]) expectedStyleMap.set("display", "none");
	if (instance) resolveCssVars$1(instance, el, expectedStyleMap);
	let hasMismatch = false;
	if (isIncremental) {
		if (expected) hasMismatch = Array.from(expectedStyleMap.entries()).some(([key, val]) => actualStyleMap.get(key) !== val);
	} else hasMismatch = !isMapEqual(actualStyleMap, expectedStyleMap);
	if (hasMismatch) {
		if (warnPropMismatch(el, "style", 3, actual, expected)) {
			logMismatchError();
			return true;
		}
	}
	return false;
}
/**
* dev only
*/
function resolveCssVars$1(instance, block, expectedMap) {
	if (!instance.isMounted) return;
	const rootBlocks = normalizeBlock(instance);
	if (instance.getCssVars && normalizeBlock(block).every((b) => rootBlocks.includes(b))) {
		const cssVars = instance.getCssVars();
		for (const key in cssVars) {
			const value = normalizeRpx(normalizeCssVarValue(cssVars[key]));
			expectedMap.set(`--${getEscapedCssVarName(key, false)}`, value);
		}
	}
	if (normalizeBlock(block).every((b) => rootBlocks.includes(b)) && instance.parent) {
		if (isVaporComponent(instance.parent)) resolveCssVars$1(instance.parent, instance.block, expectedMap);
		else if (isInteropEnabled && instance.interopVNode) resolveCssVars(instance.parent, instance.interopVNode, expectedMap);
	}
}
function attributeHasMismatch(el, key, value) {
	if (isValidHtmlOrSvgAttribute(el, key)) {
		const { actual, expected } = getAttributeMismatch(el, key, value);
		if (actual !== expected) {
			if (warnPropMismatch(el, key, 4, actual, expected)) {
				logMismatchError();
				return true;
			}
		}
	}
	return false;
}
function getClientText(el, value) {
	if (value[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) value = value.slice(1);
	return value;
}
function skipHydratedWrite(el, key, value, forceHydrate) {
	return !forceHydrate && !shouldForceHydrate(el, key) || isUnchangedResourceProp(el, key, value);
}
function shouldForceHydrate(el, key) {
	const { tagName } = el;
	return (tagName === "INPUT" || tagName === "OPTION") && (key.endsWith("value") || key === "indeterminate") || tagName.includes("-");
}
//#endregion
//#region packages/runtime-vapor/src/slotBoundary.ts
function withSlotBoundary(boundary, fn) {
	return withRenderContext(deriveSlotBoundary(currentRenderContext, boundary), fn);
}
function hasSlotFallback(boundary) {
	while (boundary) {
		if (boundary.getFallback()) return true;
		boundary = boundary.getParent();
	}
	return false;
}
//#endregion
//#region packages/runtime-vapor/src/slotFragment.ts
const noFallback = () => void 0;
const slotFallbackBlocks = /* @__PURE__ */ new WeakSet();
function isSlotFallbackBlock(block) {
	return slotFallbackBlocks.has(block);
}
function renderSlotFallbacks(boundary, scope) {
	const rendered = [];
	while (boundary) {
		const render = boundary.getFallback();
		if (render) {
			const getScopeIds = boundary.getScopeIds;
			const renderBody = getScopeIds ? () => renderWithSlotScopeIds(getScopeIds(), render) : render;
			const adopt = isHydratingSlotFallback && boundary.adoptFallback;
			if (adopt) boundary.adoptFallback = void 0;
			const body = extend$1({}, boundary, {
				getFallback: noFallback,
				isHolding: boundary.isHeld
			});
			const block = boundary.run(() => withSlotBoundary(body, adopt ? () => adopt(renderBody) : renderBody), scope);
			rendered.push({
				block,
				boundary,
				adopted: !!adopt
			});
			if (isValidSlot(block)) break;
		}
		boundary = boundary.getParent();
	}
	return rendered;
}
function isHoldingSlotContent(state) {
	return isTransitionEnabled && !!state.$transition && !!(state.activeFallback || state.held === "leaving" || state.held === "entering");
}
function placeSlotContent(state, parent, anchor, parentSuspense, moveType, parentComponent) {
	const content = state.getContent();
	if (moveType === void 0) insert(content, parent, anchor, parentSuspense);
	else move(content, parent, anchor, moveType, parentComponent, parentSuspense);
	insertActiveSlotFallback(state, moveType, parent, anchor, parentComponent, parentSuspense);
}
function beforeExpose(state, block) {
	const bm = state.bm;
	if (bm) for (let i = 0; i < bm.length; i++) bm[i](block);
}
/**
* The winning exposed branch for a slot host: the committed fallback while one
* is active, the resolved content otherwise. Every host's `syncNodes` points
* its exposed nodes here.
*/
function resolveExposedSlotNodes(state) {
	if (isTransitionEnabled && state.held === "entering") return state.getContent();
	return state.activeFallback || state.getContent();
}
function markSlotResolutionDirty(state) {
	if (state.isDisposed()) return;
	if (state.isReconciling || state.isBusy()) {
		state.pendingRecheck = true;
		return;
	}
	recheckSlotResolution(state);
}
function clearSlotFallback(state, parentNode = state.getParentNode()) {
	if (state.fallbackScope) {
		state.fallbackScope.stop();
		state.fallbackScope = void 0;
	}
	const fallback = state.activeFallback;
	if (fallback) {
		remove(fallback, parentNode || void 0);
		state.activeFallback = null;
	}
	state.renderedFallbacks = void 0;
}
function leaveSlotFallback(state, hooks, afterLeave, unpaired) {
	const fallback = state.activeFallback;
	const leaving = !!fallback && applyTransitionLeaveHooks(fallback, hooks, afterLeave, unpaired);
	clearSlotFallback(state);
	return leaving;
}
function insertActiveSlotFallback(state, moveType, parentNode, anchor, parentComponent, parentSuspense) {
	const fallback = state.activeFallback;
	if (isHydrating$1 || !fallback || !parentNode) return;
	if (isTransitionEnabled && state.held === "entering") return;
	if (isHydratingSlotFallback) {
		const rendered = state.renderedFallbacks;
		if (rendered[rendered.length - 1].adopted) {
			if (isInteropEnabled && isInteropFragment(fallback)) fallback.insert(parentNode, anchor);
			return;
		}
	}
	if (moveType === void 0) insert(fallback, parentNode, anchor, parentSuspense);
	else move(fallback, parentNode, anchor, moveType, parentComponent, parentSuspense);
}
function commitSlotFallback(state, rendered, scope) {
	const block = rendered[rendered.length - 1].block;
	state.activeFallback = block;
	state.renderedFallbacks = rendered;
	state.fallbackScope = scope;
	if (isTransitionEnabled) {
		if (block !== EMPTY_BLOCK) slotFallbackBlocks.add(block);
		if (state.boundary.isHeld()) return;
		const hooks = state.$transition;
		if (hooks) {
			applySlotTransitionHooks(state, block, hooks);
			if (isVaporTransitionHooks(hooks) && hooks.props.mode === "out-in" && hasTransitionChild(block)) {
				const onLeft = () => placeAfterLeave(state);
				if (isInteropEnabled && state.awaitLeavingRoot ? state.awaitLeavingRoot(onLeft) : awaitLeavingRoot(state.getContent(), onLeft)) {
					state.held = "entering";
					return;
				}
			}
		}
	}
	exposeSlotFallback(state, block);
}
function exposeSlotFallback(state, block) {
	beforeExpose(state, block);
	insertActiveSlotFallback(state, void 0, state.getParentNode(), state.getAnchor());
}
function applySlotTransitionHooks(state, block, hooks) {
	const applied = applyTransitionHooks(block, hooks, ownerFragment(state));
	if (!hooks.applyGroup) state.$transition = applied;
}
function ownerFragment(state) {
	const frag = state;
	return frag.__vf ? frag : void 0;
}
function renderAndCommitSlotFallback(state) {
	if (state.fallbackChainStale) state.fallbackChainStale = false;
	if (!hasSlotFallback(state.boundary)) {
		if (state.activeFallback) clearSlotFallback(state);
		return;
	}
	const scope = new EffectScope(true);
	let rendered;
	try {
		rendered = renderSlotFallbacks(state.boundary, scope);
	} catch (err) {
		scope.stop();
		throw err;
	}
	clearSlotFallback(state);
	commitSlotFallback(state, rendered, scope);
}
function isSlotFallbackChainStale(state) {
	if (state.fallbackChainStale) return true;
	const rendered = state.renderedFallbacks;
	const last = rendered.length - 1;
	for (let i = 0; i < last; i++) if (isValidSlot(rendered[i].block)) return true;
	return hasSlotFallback(rendered[last].boundary.getParent()) && !isValidSlot(rendered[last].block);
}
function disposeSlotResolution(state, parentNode) {
	clearSlotFallback(state, parentNode || null);
	state.pendingRecheck = false;
	state.lastNodesValid = void 0;
}
function recheckSlotResolution(state) {
	if (state.isReconciling) {
		state.pendingRecheck = true;
		return;
	}
	do {
		state.pendingRecheck = false;
		state.isReconciling = true;
		try {
			recheckSlotResolutionNow(state);
		} finally {
			state.isReconciling = false;
		}
	} while (state.pendingRecheck);
}
function exposeSlotContent(state) {
	const content = state.getContent();
	let place = false;
	const transition = isTransitionEnabled ? state.$transition : void 0;
	if (transition && !isHydrating$1 && !state.boundary.isHeld()) {
		const outlet = ownerFragment(state);
		const mode = ownsTransitionMode(transition, outlet) ? transition.props.mode : void 0;
		const fallback = state.activeFallback;
		const structural = !!fallback && !resolveOutletLeave(outlet, fallback, transition);
		if (mode === "out-in" && structural) {
			state.held = "leaving";
			if (leaveSlotFallback(state, transition, () => placeAfterLeave(state), true) && state.held === "leaving") return true;
		} else if (mode === "in-out") leaveSlotFallback(state, transition, NOOP, true);
		if (state.holdsContent) {
			applySlotTransitionHooks(state, content, transition);
			place = true;
		}
	}
	beforeExpose(state, content);
	clearSlotFallback(state);
	if (isTransitionEnabled) state.held = void 0;
	if (place) {
		const parentNode = state.getParentNode();
		if (parentNode) insert(content, parentNode, state.getAnchor());
	}
	return false;
}
function placeAfterLeave(state) {
	state.held = "placing";
	markSlotResolutionDirty(state);
}
function recheckSlotResolutionNow(state) {
	var _state$lastNodesValid;
	let placing = false;
	if (isTransitionEnabled && state.held) {
		if (state.held === "leaving") return;
		if (state.held === "entering") {
			if (state.isContentValid()) clearSlotFallback(state);
			return;
		}
		placing = true;
	}
	const prevFallback = state.activeFallback;
	const contentValid = state.isContentValid();
	const prevNodesValid = (_state$lastNodesValid = state.lastNodesValid) !== null && _state$lastNodesValid !== void 0 ? _state$lastNodesValid : contentValid;
	if (contentValid) {
		if ((prevFallback || placing) && exposeSlotContent(state)) return;
	} else {
		if (placing) state.held = void 0;
		if (!prevFallback || isSlotFallbackChainStale(state)) renderAndCommitSlotFallback(state);
		else if (placing) exposeSlotFallback(state, prevFallback);
	}
	const fallback = state.activeFallback;
	const nextNodesValid = fallback ? isValidSlot(fallback) : contentValid;
	state.syncNodes();
	state.lastNodesValid = nextNodesValid;
	if (prevNodesValid !== nextNodesValid) state.notifyExposedValidityChange();
}
//#endregion
//#region packages/runtime-vapor/src/dom/hydrateFragment.ts
let currentSlotEndAnchor = null;
/** Locates the boundary's SSR range and consumes its opening marker. */
function withHydratingSlotBoundary(fn) {
	const claim = createFragmentClaim();
	locateHydrationNode(claim);
	const prev = currentSlotEndAnchor;
	const close = currentSlotEndAnchor = locateFragmentEnd(claim.start);
	try {
		return fn();
	} finally {
		currentSlotEndAnchor = prev;
		if (close) trimHydrationBoundary(close);
	}
}
/**
* Insert an anchor at a position resolved during the hydration pass. Untracked
* anchors hold no SSR logical position, so traversal steps over them and the
* insert can happen right away. `nextNode` may already have been trimmed by
* boundary cleanup, in which case the anchor is appended instead.
*/
function insertUntrackedAnchor(parentNode$1, nextNode, anchor) {
	parentNode$1.insertBefore(anchor, nextNode && /* @__PURE__ */ parentNode(nextNode) === parentNode$1 ? nextNode : null);
}
/**
* Whether `node` can serve as `frag`'s anchor. Beyond the SSR candidates
* (`<!---->` and a fragment close), dev builds also accept a runtime anchor
* this fragment kind already created: those carry the fragment's debug label
* as their comment data, where prod uses unlabeled text nodes.
*/
function isReusableAnchorCandidate(node, frag) {
	return !!node && (isComment(node, "") || isRangeEnd(node) || !!(process.env.NODE_ENV !== "production") && frag !== void 0 && (frag.__vf & 256 && isComment(node, "v-if") || frag.anchorLabel !== void 0 && isComment(node, frag.anchorLabel)));
}
function reuseOrCreateAfterAnchor(node, resetNodes) {
	const parent = /* @__PURE__ */ parentNode(node);
	return isClaimedAnchor(node) && parent ? {
		kind: "create",
		parent,
		next: node.nextSibling,
		resetNodes
	} : {
		kind: "reuse",
		node,
		resetNodes
	};
}
function prepareDeferredHydrationAnchor(frag, hasRender) {
	const isRevivingDeferredBranch = isInDeferredHydrationBoundary() && hasRender && !(frag.__vf & 4) && !isValidBlock(frag.nodes);
	const reusingDeferredAnchor = isRevivingDeferredBranch && !!frag.anchor && !!frag.anchor.parentNode;
	if (isRevivingDeferredBranch) {
		let slotEndAnchor = null;
		const anchor = frag.anchor || (currentHydrationNode === (slotEndAnchor = currentSlotEndAnchor) ? slotEndAnchor : null);
		if (anchor) setCurrentHydrationNode(claimAnchor(anchor));
	}
	return reusingDeferredAnchor;
}
/** Rule 1: adopt the anchor createPlainElement injected for native children. */
function planReuseInjectedAnchor(frag) {
	if (frag.__vf & 512 && isClaimedAnchor(currentHydrationNode) && /* @__PURE__ */ parentNode(currentHydrationNode)) return {
		kind: "reuse",
		node: currentHydrationNode
	};
}
/** Rule 2: the fragment owns an SSR range; its close marker is the anchor. */
function planReuseOwnClose(frag) {
	const close = frag.__vf & 4 ? currentSlotEndAnchor : frag.hydrationClaim && frag.hydrationClaim.start ? locateClaimedEnd(frag.hydrationClaim.start) : null;
	if (close) return reuseOrCreateAfterAnchor(close);
}
/** Rule 3: the client rendered nothing and owns no range. */
function planEmptyBranch(frag) {
	const flags = frag.__vf;
	if (isReusableAnchorCandidate(currentHydrationNode, frag)) return reuseOrCreateAfterAnchor(currentHydrationNode);
	if (!(flags & 512) && currentHydrationNode && isComment(currentHydrationNode, "teleport anchor")) {
		const parentNode$2 = /* @__PURE__ */ parentNode(currentHydrationNode);
		if (parentNode$2) return {
			kind: "create",
			parent: parentNode$2,
			next: currentHydrationNode,
			mark: currentHydrationNode
		};
	}
	if (!(flags & 4) && currentHydrationNode && !isRangeEnd(currentHydrationNode)) {
		const parentNode$3 = /* @__PURE__ */ parentNode(currentHydrationNode);
		if (flags & 512 && parentNode$3) return {
			kind: "create-cleanup",
			parent: parentNode$3,
			next: null,
			cleanupStart: currentHydrationNode,
			cleanupUntil: null,
			cleanupContainer: parentNode$3
		};
		if (parentNode$3) {
			const anchor = nextLogicalSibling(currentHydrationNode);
			if (isReusableAnchorCandidate(anchor, frag) && /* @__PURE__ */ parentNode(anchor)) return reuseOrCreateAfterAnchor(anchor, true);
			return planTrimFromCursor(parentNode$3, anchor);
		}
	}
}
/** Trim the unclaimed SSR range at the cursor, then create a fresh anchor. */
function planTrimFromCursor(parent, next) {
	return {
		kind: "create-cleanup",
		parent,
		next,
		cleanupStart: currentHydrationNode,
		cleanupUntil: next
	};
}
/** Rule 4: the block is a bare runtime comment from earlier in this pass. */
function planRestartFromRuntimeComment(frag) {
	if (isValidBlock(frag.nodes) || !(frag.nodes instanceof Comment)) return;
	if (isReusableAnchorCandidate(frag.nodes, frag) && /* @__PURE__ */ parentNode(frag.nodes)) return reuseOrCreateAfterAnchor(frag.nodes, true);
	if (!/* @__PURE__ */ parentNode(frag.nodes) && currentHydrationNode) {
		const parentNode$4 = /* @__PURE__ */ parentNode(currentHydrationNode);
		if (parentNode$4) return planTrimFromCursor(parentNode$4, nextLogicalSibling(currentHydrationNode));
	}
}
/** Rule 5: derive the anchor position from the hydrated block itself. */
function planFromBlockBoundary(frag) {
	const end = currentSlotEndAnchor;
	if (end && currentHydrationNode === end && !isValidBlock(frag.nodes)) return {
		kind: "create",
		parent: end.parentNode,
		next: end
	};
	const node = findBlockBoundary(frag.nodes);
	return {
		kind: "create",
		parent: node.parentNode,
		next: node.nextNode
	};
}
function resolveDynamicAnchor(frag, isEmpty) {
	return planReuseInjectedAnchor(frag) || planReuseOwnClose(frag) || (isEmpty ? planEmptyBranch(frag) : void 0) || planRestartFromRuntimeComment(frag) || planFromBlockBoundary(frag);
}
function executeAnchorPlan(frag, plan) {
	let advanceAfterRestore = null;
	let exitHydrationBoundary;
	const createRuntimeAnchor = () => {
		var _frag$anchorLabel;
		return frag.anchor = claimUntrackedAnchor(!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ createComment((_frag$anchorLabel = frag.anchorLabel) !== null && _frag$anchorLabel !== void 0 ? _frag$anchorLabel : "") : /* @__PURE__ */ createTextNode());
	};
	try {
		switch (plan.kind) {
			case "reuse":
				if (plan.resetNodes) frag.nodes = EMPTY_BLOCK;
				frag.anchor = claimAnchor(plan.node);
				if (currentHydrationNode === frag.anchor) advanceHydrationNode(frag.anchor);
				else {
					exitHydrationBoundary = enterHydrationBoundary(frag.anchor);
					advanceAfterRestore = frag.anchor;
				}
				break;
			case "create":
				if (plan.resetNodes) frag.nodes = EMPTY_BLOCK;
				if (plan.mark) claimAnchor(plan.mark);
				insertUntrackedAnchor(plan.parent, plan.next, createRuntimeAnchor());
				break;
			case "create-cleanup": {
				frag.nodes = EMPTY_BLOCK;
				const cleanupParent = /* @__PURE__ */ parentNode(plan.cleanupStart);
				if (cleanupParent) updateLastLocatedLogicalChild(cleanupParent, plan.cleanupStart, plan.cleanupUntil, 1);
				if (plan.cleanupUntil) exitHydrationBoundary = enterHydrationBoundary(plan.cleanupUntil);
				else {
					cleanupHydrationTail(plan.cleanupStart, plan.cleanupContainer);
					setCurrentHydrationNode(null);
				}
				insertUntrackedAnchor(plan.parent, plan.next, createRuntimeAnchor());
				break;
			}
		}
	} finally {
		exitHydrationBoundary && exitHydrationBoundary();
		if (advanceAfterRestore && currentHydrationNode === advanceAfterRestore) advanceHydrationNode(advanceAfterRestore);
	}
}
function hydrateDynamicFragmentAnchor(frag, isEmpty = false) {
	executeAnchorPlan(frag, resolveDynamicAnchor(frag, isEmpty));
}
/**
* The hydrating half of `SlotFragment.updateSlot`. The range the server left
* says what it rendered, so nothing is tried and taken back:
* - `<!--(-->`: the fallback, with none of the content's output;
* - `<!--[--><!--]-->`: nothing;
* - anything else: the content.
*/
function hydrateSlotFragmentContent(frag, render, key) {
	locateHydrationNode();
	const open = currentHydrationNode;
	if (open && isComment(open, "[") && open.nextSibling && isComment(open.nextSibling, "]")) {
		const close = frag.anchor = claimAnchor(open.nextSibling);
		runWithoutHydration(() => {
			frag.updateContent(render, key);
			recheckSlotResolution(frag);
		});
		advanceHydrationNode(close);
	} else if (open && isComment(open, "(")) {
		const close = frag.anchor = claimAnchor(locateEndAnchor(open));
		hydrateSlotFallbackRange({
			first: open.nextSibling,
			close,
			boundary: frag.boundary,
			getContent: () => frag.getContent()
		}, () => {
			frag.updateContent(render, key);
			recheckSlotResolution(frag);
		});
		advanceHydrationNode(close);
	} else withHydratingSlotBoundary(() => {
		frag.updateContent(render, key);
		if (isValidSlot(frag.getContent())) {
			recheckSlotResolution(frag);
			hydrateDynamicFragmentAnchor(frag, !isValidBlock(frag.nodes));
		} else {
			if (open) warnHydrationNodeMismatch(open, `slot fallback`);
			frag.syncNodes();
			hydrateDynamicFragmentAnchor(frag, true);
			runWithoutHydration(() => recheckSlotResolution(frag));
		}
	});
}
/**
* The nodes in the range are the fallback's: `createContent` runs the slot
* content without hydration and places it as on the client. The fallback is
* adopted from within it, by the slot providing it (see
* `renderSlotFallbacks`), and never moves.
*/
function hydrateSlotFallbackRange(range, createContent) {
	const first = range.first;
	const last = range.close.previousSibling;
	let before;
	if (first !== range.close) {
		range.adopt = (render) => {
			before = first.previousSibling;
			return hydrateNode(first, render);
		};
		if (range.boundary) range.boundary.adoptFallback = range.adopt;
	}
	withHydratingSlotFallback(() => {
		createContent();
		const getContent = range.getContent;
		if (before && getContent) insert(getContent(), before.parentNode, before.nextSibling);
	});
	const boundary = range.boundary;
	if (boundary && boundary.adoptFallback) {
		warnHydrationNodeMismatch(first, `slot content`);
		boundary.adoptFallback = void 0;
		removeFragmentNodes(first.previousSibling, last.nextSibling);
	}
}
//#endregion
//#region packages/runtime-vapor/src/componentSlots.ts
function normalizeUniTextBlock(block) {
	if (block instanceof Node) normalizeUniTextNode(block);
	else if (isFragment(block)) normalizeUniTextBlock(block.nodes);
	else if (isArray(block)) for (let i = 0; i < block.length; i++) {
		const child = block[i];
		if (child instanceof Node) normalizeUniTextNode(child);
	}
	return block;
}
function normalizeUniTextNode(node) {
	if (node.nodeType !== Node.TEXT_NODE) return;
	const value = node.nodeValue;
	if (value && value.indexOf("\\") !== -1) node.nodeValue = normalizeUniText$1(value);
}
const rawSlotsOwnerMap = /* @__PURE__ */ new WeakMap();
const rawSlotWrappersCache = /* @__PURE__ */ new WeakMap();
function normalizeRawSlots(rawSlots) {
	if (!rawSlots) return rawSlots;
	const normalized = isFunction(rawSlots) ? { default: rawSlots } : rawSlots;
	if (!rawSlotsOwnerMap.has(normalized)) rawSlotsOwnerMap.set(normalized, getScopeOwner());
	return normalized;
}
var SlotSourceCell = class extends Dep {
	constructor(source) {
		super();
		this.source = source;
		this.committed = void 0;
		this.next = void 0;
	}
	get value() {
		trackDep(this);
		return this.committed;
	}
};
/**
* A dynamic slot descriptor is the parent's expression, like a prop getter:
* replace each function source with a reader of the cell the input effect
* commits it to. Slot functions keep their closure semantics. Returns the
* isolated slots with their cells, or nothing when no source is a function.
*/
function isolateSlotSources(rawSlots) {
	const dynamicSources = rawSlots.$;
	if (!dynamicSources) return;
	let count = 0;
	for (let i = 0; i < dynamicSources.length; i++) if (isFunction(dynamicSources[i])) count++;
	if (!count) return;
	const cells = new Array(count);
	const isolatedSources = dynamicSources.slice();
	for (let i = 0, n = 0; i < dynamicSources.length; i++) {
		const source = dynamicSources[i];
		if (isFunction(source)) {
			const cell = cells[n++] = new SlotSourceCell(source);
			isolatedSources[i] = isolateSlotSource(cell);
		}
	}
	const isolated = extend$1({}, rawSlots, { $: isolatedSources });
	rawSlotsOwnerMap.set(isolated, rawSlotsOwnerMap.get(rawSlots) || null);
	return [isolated, cells];
}
function isolateSlotSource(cell) {
	const isolated = () => cell.value;
	isolated._cache = cell;
	return isolated;
}
function initSlots(instance) {
	const isolated = isolateSlotSources(instance.rawSlots);
	if (isolated) {
		instance.rawSlots = isolated[0];
		instance.slotSources = isolated[1];
		instance.slots = new Proxy(isolated[0], dynamicSlotsProxyHandlers);
	}
}
function withSlotOwner(slots, fn) {
	const owner = rawSlotsOwnerMap.get(slots);
	if (owner === void 0) return fn();
	return withRenderContext(deriveSlotOwner(currentRenderContext, owner), fn);
}
function getOwnedSlot(slots, key, slot) {
	if (!rawSlotsOwnerMap.has(slots)) return slot;
	let wrappers = rawSlotWrappersCache.get(slots);
	if (!wrappers) rawSlotWrappersCache.set(slots, wrappers = /* @__PURE__ */ new Map());
	const cached = wrappers.get(key);
	if (cached && cached.slot === slot) return cached.wrapped;
	const wrapped = ((...args) => withSlotOwner(slots, () => slot(...args)));
	wrapped._ = slot._;
	wrappers.set(key, {
		slot,
		wrapped
	});
	return wrapped;
}
const dynamicSlotsProxyHandlers = {
	get: (target, key) => getSlot(target, key) || Object.prototype[key],
	has: (target, key) => !!getSlot(target, key),
	getOwnPropertyDescriptor(target, key) {
		const slot = getSlot(target, key);
		if (slot) return {
			configurable: true,
			enumerable: true,
			value: slot
		};
	},
	ownKeys(target) {
		const keys = new Set(Object.keys(target).filter((k) => k !== "$"));
		const dynamicSources = target.$;
		if (dynamicSources) for (const source of dynamicSources) if (isFunction(source)) {
			const slot = withSlotOwner(target, () => source());
			if (slot) {
				if (isArray(slot)) for (const s of slot) keys.add(String(s.name));
				else keys.add(String(slot.name));
			}
		} else for (const key of Object.keys(source)) keys.add(key);
		return [...keys];
	},
	set: NO,
	deleteProperty: NO
};
function getSlot(target, key, resolveDynamicSource) {
	const slot = resolveSlot(target, key, resolveDynamicSource);
	if (slot) return getOwnedSlot(target, key, isFunction(slot) ? slot : slot.fn);
}
function resolveSlot(target, key, resolveDynamicSource) {
	if (key === "$") return;
	const dynamicSources = target.$;
	if (dynamicSources) {
		let i = dynamicSources.length;
		let source;
		while (i--) {
			source = dynamicSources[i];
			if (isFunction(source)) {
				const slot = withSlotOwner(target, () => resolveDynamicSource ? resolveDynamicSource(source) : source());
				if (slot) {
					if (isArray(slot)) {
						for (let j = slot.length - 1; j >= 0; j--) if (String(slot[j].name) === key) return slot[j];
					} else if (String(slot.name) === key) return slot;
				}
			} else if (hasOwn(source, key)) return source[key];
		}
	}
	if (hasOwn(target, key)) return target[key];
}
/**
* Get the effective slot instance for accessing rawSlots and scopeId.
* Prefers the slot owner (if inside a slot), falls back to currentInstance.
*/
function getScopeOwner() {
	return currentRenderContext.slotOwner || currentInstance;
}
function createSlot(name = "default", rawProps, fallback, flags = 0) {
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	if (!isHydrating$1) resetInsertionState();
	let hydrationCursor = null;
	const instance = getScopeOwner();
	const rawSlots = instance.rawSlots;
	const scopeId = !(flags & 1) && instance.type.__scopeId;
	const outerSlotScopeIds = currentRenderContext.slotScopeIds;
	const slotScopeIds = scopeId ? outerSlotScopeIds ? [...outerSlotScopeIds, `${scopeId}-s`] : [`${scopeId}-s`] : outerSlotScopeIds;
	const once = !!(flags & 2);
	const textMode = !!(flags & 256);
	if (textMode && fallback) {
		const originalFallback = fallback;
		fallback = (...args) => normalizeUniTextBlock(originalFallback(...args));
	}
	const slotProps = rawProps ? new Proxy(once ? snapshotRawProps(rawProps) : rawProps, rawPropsProxyHandlers) : EMPTY_OBJ;
	let fragment;
	let isCustomElementSlot = false;
	const ctx = currentRenderContext;
	const boundary = isForwardedSlot(flags) ? ctx.slotBoundary : null;
	const outletCtx = deriveRenderContext(ctx, ctx.slotOwner, boundary, slotScopeIds, ctx.suspense);
	const interopSlotsSource = isInteropEnabled && rawSlots[interopSlotsKey];
	if (interopSlotsSource) {
		if (isHydrating$1) hydrationCursor = enterHydrationCursor();
		fragment = withRenderContext(outletCtx, () => instance.appContext.vdom.slot(interopSlotsSource, name, slotProps, instance, {
			fallback,
			flags,
			adoptAnchor: _insertionAnchor
		}));
	} else {
		if (once && fallback) {
			const originalFallback = fallback;
			fallback = (...args) => withOnce(() => originalFallback(...args));
		}
		if (isHydrating$1) hydrationCursor = captureHydrationCursor();
		const ce = instance.ce || isAsyncComponentEnabled && instance.parent && isAsyncWrapper(instance.parent) && instance.parent.ce;
		isCustomElementSlot = !!(ce && ce._hasShadowRoot());
		const needsSlotFragment = !isCustomElementSlot && (!!boundary || shouldUseSlotFragment(rawSlots, name, fallback));
		const outlet = withRenderContext(isCustomElementSlot ? deriveSlotBoundary(outletCtx, null) : outletCtx, () => needsSlotFragment ? new SlotFragment(flags, _insertionAnchor) : new DynamicFragment(132, !!(process.env.NODE_ENV !== "production") ? "slot" : void 0, false, false, _insertionAnchor));
		const slotFragment = needsSlotFragment ? outlet : void 0;
		fragment = outlet;
		const isDynamicName = isFunction(name);
		const renderSlot = () => {
			if (isCustomElementSlot) {
				const el = /* @__PURE__ */ createElement("slot");
				const ownScopeId = instance.type.__scopeId;
				if (ownScopeId) el.setAttribute(ownScopeId, "");
				const uniScopeIds = getUniScopeIds(instance);
				if (uniScopeIds) setElementScopeIds(el, uniScopeIds);
				if (outerSlotScopeIds) setElementScopeIds(el, outerSlotScopeIds);
				const setSlotProps = () => {
					const slotName = isFunction(name) ? name() : name;
					setDynamicProps(el, [slotProps, slotName !== "default" ? { name: slotName } : {}]);
				};
				if (once) setSlotProps();
				else renderEffect(setSlotProps);
				if (fallback) {
					const fallbackFn = fallback;
					withRenderContext(outlet.ctx, () => {
						const block = fallbackFn();
						insert(block, el);
						registerNestedVDOMCleanup(block);
					});
				}
				fragment.nodes = el;
				return;
			}
			const slotName = isFunction(name) ? name() : name;
			const resolvedSlot = resolveSlot(rawSlots, slotName);
			const slot = resolvedSlot ? getOwnedSlot(rawSlots, slotName, isFunction(resolvedSlot) ? resolvedSlot : resolvedSlot.fn) : void 0;
			const render = slot ? getBoundSlot(slot) : void 0;
			const key = resolvedSlot && !isFunction(resolvedSlot) && hasOwn(resolvedSlot, "key") ? resolvedSlot.key : render || fallback;
			if (isTransitionEnabled) outlet.slotName = slotName;
			if (slotFragment) slotFragment.updateSlot(render, fallback, key);
			else if (isHydrating$1) withHydratingSlotBoundary(() => outlet.update(render || fallback, key));
			else outlet.update(render || fallback, key);
		};
		let cachedSlot;
		let cachedBoundSlot;
		const getBoundSlot = (slot) => {
			if (slot !== cachedSlot) {
				cachedSlot = slot;
				if (textMode) cachedBoundSlot = () => renderWithSlotScopeIds(slotScopeIds, () => {
					return normalizeUniTextBlock(once ? withOnce(() => slot(slotProps)) : slot(slotProps));
				});
				else cachedBoundSlot = () => renderWithSlotScopeIds(slotScopeIds, () => once ? withOnce(() => slot(slotProps)) : slot(slotProps));
			}
			return cachedBoundSlot;
		};
		if (!once && !isCustomElementSlot && (isDynamicName || rawSlots.$)) renderEffect(renderSlot);
		else renderSlot();
	}
	if (isHydrating$1 && isInteropEnabled && isInteropFragment(fragment)) fragment.hydrate();
	finishBlockCreation(fragment, fragment.anchor, hydrationCursor, _insertionParent, _insertionAnchor, isCustomElementSlot);
	return fragment;
}
function shouldUseSlotFragment(rawSlots, name, fallback) {
	if (!fallback) return false;
	if (rawSlots === EMPTY_OBJ) return false;
	if (isFunction(name) || rawSlots.$) return true;
	const slot = resolveSlot(rawSlots, name);
	if (!slot) return false;
	return (isFunction(slot) ? slot : slot.fn)._ === 1;
}
//#endregion
//#region packages/runtime-vapor/src/scopeId.ts
/**
* Catch-up for slot content DOM created outside the ambient window (eager
* template clones, hand-built elements). Shallow on purpose: element subtrees
* can contain mounted component internals, so descendants are left to the
* creation-time ambient. Interop fragments derive their ids through the vdom
* patch context and are skipped.
*/
function stampSlotContent(block, scopeIds) {
	if (block instanceof Element) {
		for (let i = 0; i < scopeIds.length; i++) if (!block.hasAttribute(scopeIds[i])) block.setAttribute(scopeIds[i], "");
	} else if (isArray(block)) for (const b of block) stampSlotContent(b, scopeIds);
	else if (isFragment(block) && !(isInteropEnabled && isInteropFragment(block)) && !(isSlotResolver(block) && block.activeFallback)) stampSlotContent(block.nodes, scopeIds);
}
function renderWithSlotScopeIds(scopeIds, render) {
	const block = withRenderContext(deriveSlotScopeIds(currentRenderContext, scopeIds), render);
	if (scopeIds && !isHydrating$1) stampSlotContent(block, scopeIds);
	return block;
}
function getCurrentScopeId() {
	const scopeOwner = getScopeOwner();
	return scopeOwner ? scopeOwner.type.__scopeId : void 0;
}
function registerScopeIdOwner(instance, frag) {
	const owners = frag.scopeIdOwners || (frag.scopeIdOwners = []);
	if (!owners.includes(instance)) owners.push(instance);
}
function resolveScopeIdRoot(instance, onComponent) {
	return getRootElement(instance.block, {
		onDynamicFragment: (frag) => registerScopeIdOwner(instance, frag),
		onComponent,
		excludeSlotOutlets: true
	});
}
function applyScopeIdOwners(owners) {
	for (let i = 0; i < owners.length; i++) applyRootScopeIds(owners[i]);
}
let publishInteropScopeIds = null;
function setPublishInteropScopeIds(fn) {
	publishInteropScopeIds = fn;
}
function pushOwnRootScopeIds(instance, ids, root) {
	const { scopeId, slotScopeIds } = instance;
	if (scopeId) (ids || (ids = [])).push(scopeId);
	const uniScopeIds = getUniScopeIds(instance.uniScopeOwner);
	if (uniScopeIds) for (let i = 0; i < uniScopeIds.length; i++) {
		const id = uniScopeIds[i];
		if (!root || !root.hasAttribute(id)) (ids || (ids = [])).push(id);
	}
	if (slotScopeIds) (ids || (ids = [])).push(...slotScopeIds);
	return ids;
}
function hasOwnRootScopeIds(instance) {
	return !!(instance.parent && (instance.scopeId || instance.slotScopeIds || getUniScopeIds(instance.uniScopeOwner)));
}
/**
* The instance's root-only ids, climbing the effective-root chain so the
* innermost owner's collection carries every ancestor's contribution.
* Assigned parent blocks ground the climb: a null parent block means an
* in-setup mount, where the mounting component is never the root.
*/
function collectRootScopeIds(instance, root) {
	let ids = pushOwnRootScopeIds(instance, null, root);
	let current = instance;
	while (current.parent && isVaporComponent(current.parent) && isRootChainChild(current.parent, current)) {
		current = current.parent;
		ids = pushOwnRootScopeIds(current, ids, root);
	}
	return ids;
}
function isRootChainChild(parent, child) {
	return parent.block === child || !!parent.block && getRootChainComponent(parent.block) === child;
}
/**
* Resolves the effective root, registers owners along the chain, and applies
* the instance's root-only ids: element roots are stamped, vnode-backed roots
* are published for core to apply at its own mount. When the chain crosses a
* nested component with its own root ids, the outer owner delegates — the
* innermost owner's collect climbs every ancestor, so one pre-insert
* application preserves both custom element connectedCallback timing and
* VDOM's innermost-first attribute order.
*/
function applyRootScopeIds(instance) {
	let delegated = false;
	const root = resolveScopeIdRoot(instance, (nested) => {
		if (hasOwnRootScopeIds(nested)) delegated = true;
	});
	if (delegated) return;
	const scopeIds = collectRootScopeIds(instance, root);
	if (!scopeIds) return;
	if (root) setElementScopeIds(root, scopeIds);
	if (isInteropEnabled && publishInteropScopeIds) publishInteropScopeIds(instance.block, scopeIds);
}
function applyComponentScopeIds(instance) {
	if (!hasOwnRootScopeIds(instance)) return;
	applyRootScopeIds(instance);
}
/**
* Hydration counterpart of applyComponentScopeIds: hydrated roots already
* carry SSR scope attrs, so the walk only registers dynamic root tracking,
* publishes interop carriers, and stamps mismatch-recreated roots
* (client-built DOM without SSR attrs).
*/
function hydrateComponentScopeIds(instance) {
	if (!hasOwnRootScopeIds(instance)) return;
	const root = resolveScopeIdRoot(instance);
	const stampRoot = root && isRecreatedNode(root) ? root : void 0;
	const publish = isInteropEnabled && publishInteropScopeIds;
	if (!stampRoot && !publish) return;
	const scopeIds = collectRootScopeIds(instance, stampRoot || void 0);
	if (!scopeIds) return;
	if (stampRoot) setElementScopeIds(stampRoot, scopeIds);
	if (publish) publish(instance.block, scopeIds);
}
const appScopeIds = [UNI_APP_SCOPE_ID];
const emptyPageScope = {
	ids: [],
	inherited: appScopeIds
};
let pageScopeCache = /* @__PURE__ */ new WeakMap();
function getUniScopeIds(owner = getScopeOwner()) {
	if (!owner) return null;
	const isolation = owner.type.styleIsolation;
	if (isolation !== "app" && isolation !== "app-shared" && isolation !== "app-and-page") return null;
	return isolation === "app-and-page" ? getPageScope(owner).inherited : appScopeIds;
}
function getPageScopeIds(owner = getScopeOwner()) {
	if (!owner) return null;
	const ids = getPageScope(owner).ids;
	return ids.length ? ids : null;
}
function getPageScope(owner) {
	let scope = pageScopeCache.get(owner);
	if (scope) return scope;
	let current = owner;
	while (current && !current.$pageInstance) current = current.parent;
	const page = current && current.$pageInstance;
	const pageId = page && page.type.__scopeId;
	scope = page && pageScopeCache.get(page) || emptyPageScope;
	if (page && pageId && scope === emptyPageScope && pageId !== UNI_APP_SCOPE_ID) {
		scope = {
			ids: [pageId],
			inherited: [UNI_APP_SCOPE_ID, pageId]
		};
		pageScopeCache.set(page, scope);
	}
	pageScopeCache.set(owner, scope);
	return scope;
}
function resetUniScopeIds() {
	pageScopeCache = /* @__PURE__ */ new WeakMap();
}
//#endregion
//#region packages/runtime-vapor/src/fragment.ts
var VaporFragment = class {
	constructor(nodes, flags = 1) {
		this.nodes = nodes;
		this.__vf = flags;
	}
};
var RenderContextFragment = class extends VaporFragment {
	constructor(nodes, flags = 1) {
		super(nodes, flags);
		this.renderInstance = currentInstance;
		this.ctx = currentRenderContext;
		if (isKeepAliveEnabled) this.keepAliveCtx = getKeepAliveContext(currentInstance);
	}
	get slotBoundary() {
		return this.ctx.slotBoundary;
	}
	get slotScopeIds() {
		return this.ctx.slotScopeIds;
	}
	runWithRenderCtx(fn, scope) {
		return runWithRenderCtx(this, fn, scope);
	}
};
function runWithRenderCtx(fragment, fn, scope) {
	if (scope === void 0 && currentInstance === fragment.renderInstance) return withRenderContext(fragment.ctx, fn);
	const prevInstance = setCurrentInstance(fragment.renderInstance, scope);
	try {
		return withRenderContext(fragment.ctx, fn);
	} finally {
		restoreCurrentInstance(prevInstance);
	}
}
const noParentBoundary = () => null;
/**
* The one construction point for a slot host's boundary context, shared by
* SlotFragment and both vdom-interop slot hosts. `run` always comes from the
* host fragment's render seam, and so does the id cell unless the boundary
* stands for another outlet of the host (see `getParent`).
*/
function createSlotBoundary(fragment, getFallback, markDirty, isHoldingContent, getScopeIds = () => fragment.slotScopeIds, getParent = noParentBoundary) {
	const isHeld = !isTransitionEnabled ? NO : () => {
		const enclosing = fragment.slotBoundary;
		return !!enclosing && enclosing.isHolding();
	};
	return {
		getParent,
		getFallback,
		run: (fn, scope) => runWithRenderCtx(fragment, fn, scope),
		getScopeIds,
		markDirty,
		isHolding: isTransitionEnabled && isHoldingContent ? () => isHoldingContent() || isHeld() : isHeld,
		isHeld
	};
}
var ForFragment = class extends VaporFragment {
	constructor(nodes) {
		super(nodes, 8);
	}
	onReset(fn) {
		(this.resetListeners || (this.resetListeners = [])).push(fn);
	}
};
var ForBlock = class extends VaporFragment {
	constructor(nodes, scope, item, key, index, renderKey) {
		super(nodes, 16);
		this.scope = scope;
		this.itemRef = item;
		this.keyRef = key;
		this.indexRef = index;
		this.key = renderKey;
	}
};
function isBranchHeld(frag) {
	return frag.__vf & 1024 ? frag.boundary.isHolding() : !!(frag.__vf & 2048) && frag.slotBoundary.isHolding();
}
var DynamicFragment = class extends RenderContextFragment {
	constructor(flags = 0, anchorLabel, keyed = false, slotRoot = false, adoptAnchor) {
		super(EMPTY_BLOCK, 2 | flags | (slotRoot && currentRenderContext.slotBoundary ? SLOT_ROOT : 0));
		this.everUpdated = false;
		if (keyed) this.keyed = true;
		if (!!(process.env.NODE_ENV !== "production")) this.anchorLabel = anchorLabel;
		if (!isHydrating$1) this.anchor = resolveFragmentAnchor(adoptAnchor, anchorLabel);
	}
	get autoHydrate() {
		return true;
	}
	update(render, key = render, noScope = false, branchKey) {
		const everUpdated = this.everUpdated;
		this.everUpdated = true;
		if (key === this.current) {
			if (isHydrating$1 && this.autoHydrate) hydrateDynamicFragmentAnchor(this, true);
			return;
		}
		const transition = isTransitionEnabled ? this.$transition : void 0;
		const prevKey = this.current;
		const wasMounted = prevKey !== void 0;
		this.current = key;
		const prevSub = setActiveSub();
		let reusingDeferredAnchor = false;
		try {
			const liveParent = isHydrating$1 ? null : this.anchor.parentNode;
			const parent = liveParent && isTransitionEnabled && isBranchHeld(this) ? null : liveParent;
			const isUpdate = wasMounted || everUpdated && !!parent;
			if (isUpdate) {
				if (this.__vf & 2048) this.wasValid = isValidSlot(this);
				const bu = this.bu;
				if (bu) for (let i = 0; i < bu.length; i++) bu[i]();
			}
			if (transition && parent && deferBranchUpdateDuringLeave(this, render, key, noScope, branchKey, prevKey)) return;
			let removePrevious;
			if (wasMounted) {
				const scope = this.scope;
				const previous = this.nodes;
				const removeBranch = () => remove(previous, liveParent || void 0);
				let deferRemoval = false;
				if (scope) {
					if (this.keepAliveCtx) deferRemoval = this.keepAliveCtx.prepareBranchRemoval(this, scope, prevKey);
					else scope.stop();
				}
				if (transition && parent && removeBranchWithLeave(this, transition, parent, render, key, noScope, branchKey)) return;
				if (deferRemoval) removePrevious = removeBranch;
				else removeBranch();
			}
			if (isTransitionEnabled && this.leaving) {
				this.leaving = false;
				this.pending = void 0;
			}
			reusingDeferredAnchor = isHydrating$1 ? prepareDeferredHydrationAnchor(this, !!render) : false;
			this.renderBranch(render, transition && this.$transition, parent, key, noScope, isUpdate, removePrevious, branchKey);
		} finally {
			setActiveSub(prevSub);
		}
		if (isHydrating$1 && this.autoHydrate && !reusingDeferredAnchor) hydrateDynamicFragmentAnchor(this, render == null);
	}
	renderBranch(render, transition, parent, key, noScope, notifyUpdated, removePrevious, branchKey) {
		this.branchKey = this.keyed ? key : branchKey;
		if (render) {
			const keepAliveCtx = isKeepAliveEnabled ? this.keepAliveCtx : null;
			const useScope = !noScope || !!this.fallthrough;
			if (keepAliveCtx) keepAliveCtx.runBranchRender(this, () => this.renderNodes(render, useScope, parent, transition), useScope, removePrevious);
			else {
				this.scope = useScope ? new EffectScope() : void 0;
				this.renderNodes(render, useScope, parent, transition);
			}
			if (this.scopeIdOwners) applyScopeIdOwners(this.scopeIdOwners);
			if (parent) {
				insert(this.nodes, parent, this.anchor);
				if (removePrevious && keepAliveCtx) keepAliveCtx.cacheBlock(this);
			}
		} else {
			this.scope = void 0;
			this.nodes = EMPTY_BLOCK;
			if (removePrevious) removePrevious();
		}
		if (notifyUpdated) {
			if (this.__vf & 2048 && isValidSlot(this) !== this.wasValid) this.slotBoundary.markDirty();
			const u = this.u;
			if (u) for (let i = 0; i < u.length; i++) u[i](this.nodes);
		}
	}
	renderNodes(render, useScope, parent, transition) {
		try {
			this.nodes = this.runWithRenderCtx(() => {
				const nodes = (useScope ? this.scope.run(render) : render()) || EMPTY_BLOCK;
				if (parent && this.fallthrough) this.fallthrough(nodes);
				return nodes;
			});
		} finally {
			if (isTransitionEnabled && transition) this.$transition = applyTransitionHooks(this.nodes, transition, this);
		}
		const bm = this.bm;
		if (bm) for (let i = 0; i < bm.length; i++) bm[i](this.nodes);
	}
};
var SlotFragment = class extends DynamicFragment {
	constructor(flags = 0, adoptAnchor) {
		super(1156, !!(process.env.NODE_ENV !== "production") ? "slot" : void 0, false, false, adoptAnchor);
		this.disposed = false;
		this.activeFallback = null;
		this.holdsContent = true;
		this.pendingRecheck = false;
		this.isReconciling = false;
		this.content = EMPTY_BLOCK;
		this.isUpdating = false;
		onScopeDispose(() => {
			this.disposed = true;
			if (this.fallbackScope) this.fallbackScope.stop();
		}, true);
		this.notifyParentBoundary = slotNotifiesBoundary(flags);
	}
	get autoHydrate() {
		return false;
	}
	renderBranch(render, transition, parent, key, noScope, notifyUpdated, removePrevious, branchKey) {
		super.renderBranch(render, transition, parent, key, noScope, notifyUpdated, removePrevious, branchKey);
		if (!this.isUpdating) {
			this.content = this.nodes;
			recheckSlotResolution(this);
		}
	}
	get boundary() {
		if (!this.ownBoundary) this.ownBoundary = createSlotBoundary(this, () => this.localFallback, () => markSlotResolutionDirty(this), () => isHoldingSlotContent(this));
		return this.ownBoundary;
	}
	insert(parent, anchor, parentSuspense) {
		this.disposed = false;
		placeSlotContent(this, parent, anchor, parentSuspense);
	}
	move(parent, anchor, moveType, parentComponent, parentSuspense) {
		placeSlotContent(this, parent, anchor, parentSuspense, moveType, parentComponent);
	}
	remove(parent) {
		this.disposed = true;
		remove(this.content, parent);
		disposeSlotResolution(this, parent);
	}
	updateContent(render, key) {
		const exposed = this.nodes;
		this.nodes = this.content;
		this.update(render, key);
		this.content = this.nodes;
		if (isTransitionEnabled && this.held === "leaving") this.nodes = exposed;
	}
	updateSlot(render, fallback, key = render || fallback) {
		this.localFallback = fallback;
		const boundary = this.boundary;
		const contentCtx = this.contentCtx || (this.contentCtx = deriveSlotBoundary(this.ctx, boundary));
		const slotRender = render ? () => withRenderContext(contentCtx, render) : () => EMPTY_BLOCK;
		this.isUpdating = true;
		this.pendingRecheck = false;
		try {
			if (isHydrating$1) hydrateSlotFragmentContent(this, slotRender, key);
			else {
				this.updateContent(slotRender, key);
				recheckSlotResolution(this);
			}
		} finally {
			this.pendingRecheck = false;
			this.isUpdating = false;
		}
	}
	getContent() {
		return this.content;
	}
	getParentNode() {
		return this.anchor ? this.anchor.parentNode : null;
	}
	getAnchor() {
		return this.anchor || null;
	}
	isBusy() {
		return this.isUpdating;
	}
	isDisposed() {
		return this.disposed;
	}
	isContentValid() {
		return isValidSlot(this.content);
	}
	syncNodes() {
		this.nodes = resolveExposedSlotNodes(this);
	}
	notifyExposedValidityChange() {
		if (this.notifyParentBoundary && this.slotBoundary) this.slotBoundary.markDirty();
	}
};
/**
* Adopt the template `<!>` placeholder passed through the insertion state as
* the fragment anchor instead of creating (and later inserting) a runtime
* anchor. Restricted to comments: adopting any other node would remove user
* DOM on removeFragment. Callers detect adoption by identity: the returned
* node is the adopted anchor iff it equals the passed one.
*/
function resolveFragmentAnchor(adopt, anchorLabel) {
	if (adopt && adopt.nodeType === 8) {
		if (!!(process.env.NODE_ENV !== "production") && anchorLabel) adopt.data = anchorLabel;
		return claimUntrackedAnchor(adopt);
	}
	return claimUntrackedAnchor(!!(process.env.NODE_ENV !== "production") && anchorLabel ? /* @__PURE__ */ createComment(anchorLabel) : /* @__PURE__ */ createTextNode());
}
/**
* Whether a fragment adopted the captured insertion anchor — the template
* `<!>` placeholder — as its own, which means it rendered in place and the
* creator must skip its trailing insert. Unrelated to hydration's
* `isClaimedAnchor` / `skipUntrackedAnchors`, which are about anchor nodes
* marked during a hydration pass.
*
* The insertion anchor must be checked non-null: append inserts capture no
* anchor, and fragments without a client anchor (vdom interop slots, any
* fragment during hydration) would otherwise compare undefined === undefined
* and falsely skip their only insertion.
*/
function isAdoptedPlaceholder(fragmentAnchor, insertionAnchor) {
	return !!insertionAnchor && fragmentAnchor === insertionAnchor;
}
/**
* Shared tail for every block-creating API (`createIf`, `createFor`,
* `createKeyedFragment`, `createDynamicComponent`, slot outlets): the block is
* built, now hand it over to the scope that asked for it.
*
* Client render: insert it at the captured insertion point, unless it adopted
* that point's `<!>` placeholder as its own anchor and therefore already
* rendered in place. Hydration: there is nothing to insert — the block adopted
* server nodes where they already stood — so hand back the cursor instead.
*
* Site-specific hydration work (claiming a leftover `<!---->`, advancing past
* an anchor, running an interop fragment's `hydrate()`) belongs *before* this
* call, guarded by `isHydrating`; keeping it out of here avoids allocating a
* callback on the client-render path, which never needs one.
*/
function finishBlockCreation(block, anchor, cursor, insertionParent, insertionAnchor, force) {
	if (isHydrating$1) exitHydrationCursor(cursor);
	else if (insertionParent && (force || !isAdoptedPlaceholder(anchor, insertionAnchor))) insert(block, insertionParent, insertionAnchor);
	if (insertionParent) registerNestedVDOMCleanup(block);
}
function isFragment(val) {
	return !!(val && val.__vf);
}
function isInteropFragment(val) {
	return !!(val && val.__vf & 64);
}
function isSlotOutletFragment(val) {
	return !!(val && val.__vf & 128);
}
function isDynamicFragment(val) {
	return !!(val && val.__vf & 2);
}
/**
* The key a fragment hands to its branch root as default: a declared key
* (static key on a dynamic component) or the current branch key (keyed
* fragment, dynamic component `:key`, v-if branch index).
*/
function getFragmentKey(frag) {
	var _frag$$key;
	return (_frag$$key = frag.$key) !== null && _frag$$key !== void 0 ? _frag$$key : frag.branchKey;
}
function isForFragment(val) {
	return !!(val && val.__vf & 8);
}
function isForBlock(val) {
	return !!(val && val.__vf & 16);
}
function isVaporSlotOutlet(val) {
	return !!(val && val.__vf & 4);
}
function isSlotResolver(val) {
	return !!(val && val.__vf & 1024);
}
//#endregion
//#region packages/runtime-vapor/src/teleport.ts
let isTeleportEnabled = false;
function enableTeleport(value) {
	isTeleportEnabled = true;
	return value;
}
function isVaporTeleport(value) {
	return !!(value && value.__isTeleport && value.__vapor);
}
function isTeleportFragment(value) {
	return !!(value && value.__vf & 32);
}
//#endregion
//#region packages/runtime-vapor/src/block.ts
const EMPTY_BLOCK = EMPTY_ARR;
function isBlock(val) {
	return val instanceof Node || isArray(val) || isVaporComponent(val) || isFragment(val);
}
function isValidBlock(block, componentAsValid = false) {
	if (!block) return false;
	else if (block instanceof Node) return !(block instanceof Comment) && !isClaimedAnchor(block);
	else if (isVaporComponent(block)) return componentAsValid || isValidBlock(block.block, componentAsValid);
	else if (isArray(block)) return block.length > 0 && block.some((block) => isValidBlock(block, componentAsValid));
	else {
		if (isInteropEnabled && block.isBlockValid) return block.isBlockValid(componentAsValid);
		if (isTransitionEnabled && block.leaving) {
			const pending = block.pending;
			if (pending && !pending.render) return false;
		}
		return isValidBlock(block.nodes, componentAsValid);
	}
}
function isValidSlot(block) {
	return isValidBlock(block, true);
}
function insert(block, parent, anchor = null, parentSuspense) {
	if (block instanceof Node) {
		insertNode(block, parent, anchor, parentSuspense);
		return;
	}
	if (isVaporComponent(block)) {
		if (block.isMounted && !block.isDeactivated) insert(block.block, parent, anchor, parentSuspense);
		else mountComponent(block, parent, anchor);
	} else if (isArray(block)) for (const b of block) insert(b, parent, anchor, parentSuspense);
	else insertFragment(block, parent, anchor, parentSuspense);
}
function insertNode(block, parent, anchor = null, parentSuspense) {
	if (!isHydrating$1) {
		const transition = isTransitionEnabled && block instanceof Element ? block.$transition : void 0;
		if (transition) {
			const insert = () => parent.insertBefore(block, anchor);
			if (isVShowMountEnter(block, transition)) {
				block.$vshow &= -5;
				transition.beforeEnter(block);
				insert();
				queuePostRenderEffect(() => transition.enter(block), void 0, parentSuspense);
			} else performTransitionEnter(block, transition, insert, parentSuspense);
		} else if (block !== anchor) parent.insertBefore(block, anchor);
	}
}
function isVShowMountEnter(el, transition) {
	const flags = el.$vshow;
	return transition.persisted && !!(flags & 1) && (!el[vShowHidden] || !!(flags & 4));
}
function settleMountShown(block) {
	if (block.$vshow & 4) {
		block[vShowHidden] = true;
		block.style.display = "none";
	}
}
function insertFragment(block, parent, anchor = null, parentSuspense) {
	const blockAnchor = block.anchor;
	if (blockAnchor) {
		insertNode(blockAnchor, parent, anchor, parentSuspense);
		anchor = blockAnchor;
	}
	if (isTransitionEnabled && block.leaving) return;
	if (block.insert) block.insert(parent, anchor, parentSuspense, block.$transition);
	else insert(block.nodes, parent, anchor, parentSuspense);
}
function move(block, parent, anchor = null, moveType = 1, parentComponent, parentSuspense) {
	if (block instanceof Node) {
		if (isTransitionEnabled && !block.parentNode) return;
		if (isTransitionEnabled && block instanceof Element && block.$transition && moveType !== 2) {
			if (moveType === 0) performTransitionEnter(block, block.$transition, () => parent.insertBefore(block, anchor), parentSuspense, true);
			else performTransitionLeave(block, block.$transition, () => {
				if (moveType === 1 && parentComponent && parentComponent.isUnmounted) block.remove();
				else if (!anchor || anchor.parentNode === parent) parent.insertBefore(block, anchor);
			}, true, true);
		} else parent.insertBefore(block, anchor);
	} else if (isVaporComponent(block)) {
		if (block.isMounted) move(block.block, parent, anchor, moveType, parentComponent, parentSuspense);
		else mountComponent(block, parent, anchor);
	} else if (isArray(block)) for (const b of block) move(b, parent, anchor, moveType, parentComponent, parentSuspense);
	else {
		if (block.anchor) {
			move(block.anchor, parent, anchor, moveType, parentComponent, parentSuspense);
			anchor = block.anchor;
		}
		if (isTransitionEnabled && block.leaving) return;
		if (block.move) block.move(parent, anchor, moveType, parentComponent, parentSuspense, block.$transition);
		else move(block.nodes, parent, anchor, moveType, parentComponent, parentSuspense);
	}
}
function remove(block, parent) {
	if (block instanceof Node) removeNode(block, parent);
	else if (isVaporComponent(block)) {
		unmountComponent(block, parent, isSuspenseEnabled && isInteropEnabled ? resolveUnmountSuspense(block.suspense) : block.suspense);
		if (isInteropEnabled && !parent && block.isUnmounted) unmountVDOM(block.block);
	} else if (isArray(block)) for (let i = 0; i < block.length; i++) remove(block[i], parent);
	else removeFragment(block, parent);
}
const removing = /* @__PURE__ */ new WeakMap();
function removingLeave(block) {
	return removing.get(block);
}
function removeNode(block, parent) {
	if (isTransitionEnabled && block.$transition && block instanceof Element && block.parentNode) {
		const running = removing.get(block);
		if (running && !(running.state && running.state.isUnmounting)) return;
		const hooks = block.$transition;
		removing.set(block, hooks);
		performTransitionLeave(block, hooks, () => {
			removing.delete(block);
			const current = block.parentNode;
			if (parent && current) current.removeChild(block);
		});
	} else if (parent) {
		const current = block.parentNode;
		if (current) current.removeChild(block);
	}
}
function removeFragment(block, parent) {
	const bum = block.bum;
	if (bum) for (let i = 0; i < bum.length; i++) bum[i]();
	if (block.remove) block.remove(parent, block.$transition);
	else remove(block.nodes, parent);
	if (block.anchor) removeNode(block.anchor, parent);
	if (block.scope) block.scope.stop();
}
/**
* Block removal doesn't descend into elements, so it never reaches a block
* mounted into one. Unmount the vdom components in its tree synchronously when
* its owner scope is disposed, as vdom does for an element's children.
*/
function registerNestedVDOMCleanup(block) {
	if (isInteropEnabled && !(block instanceof Node)) onScopeDispose(() => unmountVDOM(block), true);
}
/**
* Unmounts the vdom components in a block tree whose DOM goes away without
* block removal.
*/
function unmountVDOM(block) {
	if (!block || block instanceof Node) return;
	if (isVaporComponent(block)) unmountVDOM(block.block);
	else if (isArray(block)) for (let i = 0; i < block.length; i++) unmountVDOM(block[i]);
	else if (isInteropFragment(block)) block.remove();
	else unmountVDOM(block.nodes);
}
/**
* dev / test only
*/
function normalizeBlock(block) {
	if (!!!(process.env.NODE_ENV !== "production") && true) throw new Error("normalizeBlock should not be used in production code paths");
	const nodes = [];
	if (block instanceof Node) nodes.push(block);
	else if (isArray(block)) block.forEach((child) => nodes.push(...normalizeBlock(child)));
	else if (isVaporComponent(block)) nodes.push(...normalizeBlock(block.block));
	else if (isTeleportEnabled && isTeleportFragment(block)) nodes.push(block.placeholder, block.anchor);
	else {
		nodes.push(...normalizeBlock(block.nodes));
		block.anchor && nodes.push(block.anchor);
	}
	return nodes;
}
/**
* First node of a block as it appears in its own container, or `undefined`
* when the block has no node there: an empty array of blocks, or a block
* whose content lives elsewhere (a teleport target) and has no marker left.
*/
function getBlockFirstNode(block) {
	if (block instanceof Node) return block;
	else if (isArray(block)) {
		for (let i = 0; i < block.length; i++) {
			const anchor = getBlockFirstNode(block[i]);
			if (anchor) return anchor;
		}
		return;
	} else if (isVaporComponent(block)) return getBlockFirstNode(getComponentPhysicalBlock(block));
	else {
		if (isTeleportEnabled && isTeleportFragment(block)) {
			const marker = block.placeholder || block.anchor;
			if (marker) return marker;
		}
		if (isTransitionEnabled && block.leaving) return block.anchor;
		const anchor = block.anchor;
		if (block.getContent) {
			const content = block.getContent();
			if (content !== block.nodes) {
				const first = getBlockFirstNode(content);
				if (first && (!anchor || first.parentNode === anchor.parentNode)) {
					const fallback = getBlockFirstNode(block.nodes);
					return fallback && fallback.parentNode === first.parentNode && first.compareDocumentPosition(fallback) & 2 ? fallback : first;
				}
			}
		}
		const node = getBlockFirstNode(block.nodes);
		return node && (!anchor || node.parentNode === anchor.parentNode) ? node : anchor;
	}
}
function findBlockBoundary(block) {
	const boundaryBlock = isVaporComponent(block) ? getComponentPhysicalBlock(block) : block;
	const lastChild = findLastChild(boundaryBlock);
	let { parentNode, nextSibling: nextNode } = lastChild;
	if (nextNode && isRangeEnd(nextNode) && isFragmentBlock(boundaryBlock) && !isRangeEnd(lastChild) && !(lastChild.nodeType === 3 && !lastChild.data)) nextNode = nextNode.nextSibling;
	return {
		parentNode,
		nextNode
	};
}
function findLastChild(node) {
	if (node && node instanceof Node) return node;
	else if (isArray(node)) {
		for (let i = node.length - 1; i >= 0; i--) {
			const child = findLastChild(node[i]);
			if (child) return child;
		}
		return;
	} else if (isVaporComponent(node)) return findLastChild(getComponentPhysicalBlock(node));
	else {
		if (node.anchor) return node.anchor;
		return findLastChild(node.nodes);
	}
}
function getComponentPhysicalBlock(instance) {
	return isSuspenseEnabled && instance.pendingBlock || instance.block;
}
function isFragmentBlock(block) {
	if (isArray(block)) return true;
	else if (isVaporComponent(block)) return isFragmentBlock(getComponentPhysicalBlock(block));
	else if (isFragment(block)) return isFragmentBlock(block.nodes);
	return false;
}
//#endregion
//#region packages/runtime-vapor/src/helpers/useCssVars.ts
/**
* Css vars are root-inherited state: the owner writes its root chain before
* insertion, containers on that chain write the content they produce later
* (`bm` hooks; `u` for vdom-owned interop content), and teleports are written
* directly as outlets since their content leaves the chain.
*/
function useVaporCssVars(getter) {
	const instance = currentInstance;
	const getVars = () => getter(instance.props);
	if (!!(process.env.NODE_ENV !== "production")) instance.getCssVars = getVars;
	let vars = EMPTY_OBJ;
	const apply = instance.applyCssVars = (nodes) => {
		if (!isHydrating$1) setVarsOnBlock(nodes, vars);
		registerCssVarApply(nodes, apply);
	};
	const watchVars = () => watch(() => {
		vars = extend$1({}, getVars());
		if (instance.ce) setVarsOnNode(instance.ce, vars);
		else setVarsOnBlock(instance.block, vars);
		const outlets = instance.cssVarOutlets;
		if (outlets) for (let i = 0; i < outlets.length; i++) setVarsOnBlock(outlets[i].nodes, vars);
	}, NOOP, { flush: "post" });
	onBeforeMount(() => {
		if (!instance.ce) registerCssVarApply(instance.block, apply);
	});
	if (isHydrating$1) onMounted(watchVars);
	else onBeforeMount(watchVars);
}
function setVarsOnBlock(block, vars) {
	if (block instanceof Node) setVarsOnNode(block, vars);
	else if (isArray(block)) for (let i = 0; i < block.length; i++) setVarsOnBlock(block[i], vars);
	else if (isVaporComponent(block)) setVarsOnBlock(block.block, vars);
	else if (isFragment(block) && !(isTeleportEnabled && isTeleportFragment(block))) setVarsOnBlock(block.nodes, vars);
}
function registerCssVarApply(block, apply) {
	if (isArray(block)) for (let i = 0; i < block.length; i++) registerCssVarApply(block[i], apply);
	else if (isVaporComponent(block)) {
		if (block.block) registerCssVarApply(block.block, apply);
		else (block.bm || (block.bm = [])).push(() => apply(block.block));
	} else if (isFragment(block) && !(isTeleportEnabled && isTeleportFragment(block))) {
		const hooks = isInteropEnabled && isInteropFragment(block) ? block.u || (block.u = []) : isDynamicFragment(block) || isForFragment(block) ? block.bm || (block.bm = []) : void 0;
		if (hooks && !hooks.includes(apply)) hooks.push(apply);
		registerCssVarApply(block.nodes, apply);
	}
}
function registerCssVarOutlet(owner, frag) {
	(owner.cssVarOutlets || (owner.cssVarOutlets = [])).push(frag);
	onScopeDispose(() => remove$1(owner.cssVarOutlets, frag), true);
}
function applyComponentCssVars(instance) {
	let current = instance;
	while (current && current.vapor) {
		const owner = current;
		if (owner.applyCssVars && !owner.ce) owner.applyCssVars(owner.block);
		current = current.parent;
	}
}
//#endregion
//#region packages/runtime-vapor/src/hmr.ts
function hmrRerender(instance) {
	resetUniScopeIds();
	if (instance.isUnmounted) return;
	if (!instance.type.render) {
		let parent = instance.parent;
		while (parent && !parent.vapor) parent = parent.parent;
		if (parent) return parent.hmrRerender();
		if (!instance.parent && !instance.ce) return instance.hmrReload(instance.type);
	}
	const { parentNode, nextNode: anchor } = findBlockBoundary(instance.block);
	const parent = parentNode;
	if (instance.renderScope) instance.renderScope.stop();
	const transitions = isTransitionEnabled ? /* @__PURE__ */ new Map() : void 0;
	if (transitions) takeTransitionHooks(instance.block, transitions);
	remove(instance.block, parent);
	const prev = setCurrentInstance(instance);
	pushWarningContext(instance);
	try {
		withRenderContext(deriveSlotScopeIds(currentRenderContext, null), () => {
			runDevRender(instance);
			applyComponentFallthrough(instance);
		});
	} finally {
		popWarningContext();
		restoreCurrentInstance(prev);
	}
	applyComponentScopeIds(instance);
	applyComponentCssVars(instance);
	const hooks = instance.hmrRootHooks;
	if (hooks) for (const hook of hooks) hook(instance.block);
	insert(instance.block, parent, anchor);
	if (transitions) transitions.forEach((hooks, state) => {
		if (!state) {
			const root = getRootElement(instance.block);
			if (root) root.$transition = hooks;
		} else if (!state.isUnmounting) state.refresh(hooks);
	});
}
function takeTransitionHooks(block, taken) {
	if (isArray(block)) for (const b of block) takeTransitionHooks(b, taken);
	else if (isVaporComponent(block)) {
		if (block.block) takeTransitionHooks(block.block, taken);
	} else {
		const hooks = block.$transition;
		if (hooks) {
			block.$transition = void 0;
			taken.set(hooks.state, hooks);
		}
		if (isFragment(block)) takeTransitionHooks(block.nodes, taken);
	}
}
function hmrReload(instance, newComp) {
	resetUniScopeIds();
	const parentInstance = instance.parent;
	if (parentInstance) {
		parentInstance.hmrRerender();
		return;
	}
	const { parentNode, nextNode: anchor } = findBlockBoundary(instance.block);
	const parent = parentNode;
	unmountComponent(instance, parent);
	const prev = setCurrentInstance(parentInstance);
	let newInstance;
	try {
		newInstance = createComponent(newComp, instance.rawProps, instance.rawSlots, instance.isSingleRoot, void 0, instance.appContext, true);
	} finally {
		restoreCurrentInstance(prev);
	}
	mountComponent(newInstance, parent, anchor);
	const app = instance.appContext.app;
	if (app && app._instance === instance) app._instance = newInstance;
}
//#endregion
//#region packages/runtime-vapor/src/component.ts
function useVdomInterop(component, appContext) {
	return !!appContext.vdom && !component.__vapor;
}
function resolveFallthroughOwner(isSingleRoot) {
	const instance = currentInstance;
	if ((isSingleRoot || isTransitionEnabled && instance && isVaporTransition(instance.type)) && isVaporComponent(instance) && instance.type.inheritAttrs !== false && instance.hasFallthrough) return instance;
}
function createComponent(component, rawProps, rawSlots, isSingleRoot, once, appContext = currentInstance && currentInstance.appContext || emptyContext, managedMount = false, ce) {
	const wasInOnce = inOnce;
	if (wasInOnce && !managedMount) once = true;
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	let hydration = null;
	let pendingAsyncHydration = false;
	if (isHydrating$1) hydration = enterComponentHydration(component);
	else resetInsertionState();
	const prevCtx = currentRenderContext;
	try {
		if (isSuspenseEnabled && !prevCtx.suspense && currentInstance && currentInstance.suspense) setRenderContext(deriveSuspense(prevCtx, currentInstance.suspense));
		const owner = !(isInteropEnabled && rawProps && rawProps[interopKey]) && resolveFallthroughOwner(isSingleRoot);
		if (owner) {
			const sources = rawProps && rawProps.$;
			const source = () => resolveFallthroughAttrs(owner, !sources);
			if (rawProps && rawProps !== EMPTY_OBJ) rawProps = extend$1({}, rawProps, sources ? { $: sources.concat(source) } : {
				$: [source],
				[fallthroughOnlyKey]: true
			});
			else rawProps = {
				$: [source],
				[fallthroughOnlyKey]: true
			};
		}
		const key = (isKeepAliveEnabled || isTransitionEnabled) && rawProps ? resolveSource(rawProps.key) : void 0;
		let keepAliveCtx = null;
		if (isKeepAliveEnabled && currentInstance && currentInstance.vapor && isKeepAlive(currentInstance)) {
			const ctx = currentInstance.ctx;
			keepAliveCtx = ctx;
			const cached = !managedMount && ctx.getCachedComponent(component, key);
			if (cached) {
				if (isVaporComponent(cached) && cached.inputScope) {
					cached.rawProps = rawProps || EMPTY_OBJ;
					initInputs(cached);
				}
				const scope = getCurrentScope();
				if (isVaporComponent(cached) && cached.unmountScope !== scope) {
					cached.unmountScope = scope;
					registerUnmount(cached);
				}
				return cached;
			}
		}
		let asyncBoundary = false;
		if (isAsyncComponentEnabled && !isHydrating$1) {
			const resolved = component.__asyncResolved;
			if (resolved && !(isInteropEnabled && useVdomInterop(resolved, appContext))) {
				component = resolved;
				asyncBoundary = true;
			}
		}
		if (isTeleportEnabled && isVaporTeleport(component)) {
			const frag = component.process(rawProps, normalizeRawSlots(rawSlots), _insertionAnchor);
			if (key !== void 0) frag.$key = key;
			if (_insertionParent) {
				onScopeDispose(() => frag.disposeTarget(), true);
				registerNestedVDOMCleanup(frag);
			} else onScopeDispose(() => frag.scheduleTargetDispose(), true);
			if (!isHydrating$1) {
				if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor, currentRenderContext.suspense);
			} else frag.hydrate();
			return frag;
		}
		let inputScope;
		if (keepAliveCtx && !once && !managedMount) inputScope = new EffectScope(true);
		if (isInteropEnabled && useVdomInterop(component, appContext)) {
			const frag = appContext.vdom.mount(component, currentInstance, rawProps, normalizeRawSlots(rawSlots), once, inputScope);
			if (key !== void 0) {
				frag.$key = key;
				frag.setKey(key);
			}
			if (_insertionParent) registerNestedVDOMCleanup(frag);
			if (!isHydrating$1) {
				if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor, currentRenderContext.suspense);
			} else frag.hydrate();
			return frag;
		}
		const instance = new VaporComponentInstance(component, rawProps, rawSlots, appContext, ce);
		if (key !== void 0) instance.$key = key;
		if (inputScope) {
			instance.inputScope = inputScope;
			instance.hasFallthrough = true;
		}
		if (asyncBoundary) markAsyncBoundary(instance);
		if (isKeepAliveEnabled && !(isAsyncComponentEnabled && isAsyncWrapper(instance))) {
			keepAliveCtx || (keepAliveCtx = getKeepAliveContext(currentInstance));
			if (keepAliveCtx) keepAliveCtx.processShapeFlag(instance);
		}
		const outerCtx = currentRenderContext;
		setRenderContext(deriveRenderContext(outerCtx, null, outerCtx.slotBoundary, null, outerCtx.suspense));
		let hasWarningContext = false;
		let hasInitMeasure = false;
		try {
			if (!!(process.env.NODE_ENV !== "production")) {
				registerHMR(instance);
				instance.isSingleRoot = isSingleRoot;
				instance.hmrRerender = hmrRerender.bind(null, instance);
				instance.hmrReload = hmrReload.bind(null, instance);
				pushWarningContext(instance);
				hasWarningContext = true;
				startMeasure(instance, `init`);
				hasInitMeasure = true;
				instance.propsOptions = normalizePropsOptions(component);
				instance.emitsOptions = normalizeEmitsOptions(component);
			}
			try {
				initSlots(instance);
				initInputs(instance, once);
			} catch (error) {
				if (!!(process.env.NODE_ENV !== "production")) unregisterHMR(instance);
				instance.scope.stop();
				if (inputScope) inputScope.stop();
				throw error;
			}
			if (isHydrating$1 && isAsyncComponentEnabled && isAsyncWrapper(instance) && component.__asyncHydrate) {
				const setup = () => setupComponent(instance, component);
				component.__asyncHydrate(currentHydrationNode, instance, wasInOnce ? () => withOnce(setup, false) : setup);
			} else {
				if (wasInOnce) withOnce(() => setupComponent(instance, component), false);
				else setupComponent(instance, component);
				if (isHydrating$1 && isSuspenseEnabled && instance.suspense && instance.asyncDep) {
					const pendingBlock = [];
					const { claim, cursor } = hydration;
					let node = claim && claim.start || cursor.start;
					const hydrationNext = nextLogicalSibling(node);
					do {
						pendingBlock.push(node);
						node = node.nextSibling;
					} while (node !== hydrationNext);
					instance.pendingBlock = pendingBlock.length === 1 ? pendingBlock[0] : pendingBlock;
					advanceHydrationNode(pendingBlock[pendingBlock.length - 1]);
					pendingAsyncHydration = true;
				}
			}
		} finally {
			if (!!(process.env.NODE_ENV !== "production")) {
				if (hasWarningContext) popWarningContext();
				if (hasInitMeasure) endMeasure(instance, "init");
			}
		}
		if (keepAliveCtx) instance.unmountScope = getCurrentScope();
		registerUnmount(instance);
		if (_insertionParent) registerNestedVDOMCleanup(instance);
		if (!managedMount && (_insertionParent || isHydrating$1)) mountComponent(instance, _insertionParent, _insertionAnchor);
		return instance;
	} finally {
		setRenderContext(prevCtx);
		if (hydration) exitComponentHydration(hydration, !pendingAsyncHydration);
	}
}
/**
* Open a component's SSR range: locate its start and claim its markers.
* Shared by creation and by the deferred render of an async setup, which
* re-enters the range once setup has settled.
*/
function enterComponentHydration(component) {
	const claim = component.__multiRoot ? createFragmentClaim() : void 0;
	const cursor = enterHydrationCursor(claim);
	const close = claim && claim.start ? locateEndAnchor(claim.start) : null;
	if (close) claimAnchor(close);
	return {
		claim,
		cursor,
		close
	};
}
/**
* Hand the cursor back; with `finalizeBoundary` the unclaimed tail of the
* range is trimmed first and the cursor moves past the close marker.
*/
function exitComponentHydration({ close, cursor }, finalizeBoundary) {
	if (finalizeBoundary) {
		trimHydrationBoundary(close);
		if (close && currentHydrationNode === close) advanceHydrationNode(close);
	}
	exitHydrationCursor(cursor);
}
function setupComponent(instance, component) {
	const prevInstance = setCurrentInstance(instance);
	const prevSub = setActiveSub();
	const setupFn = isFunction(component) ? component : component.setup;
	const setupResult = setupFn ? callWithErrorHandling(setupFn, instance, 0, [instance.props, instance]) || EMPTY_OBJ : component.__cssModules || EMPTY_OBJ;
	const isAsyncSetup = isPromise(setupResult);
	if ((isAsyncSetup || instance.sp) && !(isAsyncComponentEnabled && isAsyncWrapper(instance))) markAsyncBoundary(instance);
	if (isAsyncSetup) {
		instance.asyncDep = setupResult;
		if (!!(process.env.NODE_ENV !== "production") && !instance.suspense) {
			var _getComponentName;
			const name = (_getComponentName = getComponentName(component)) !== null && _getComponentName !== void 0 ? _getComponentName : "Anonymous";
			warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
		}
	} else handleSetupResult(setupResult, component, instance);
	setActiveSub(prevSub);
	restoreCurrentInstance(prevInstance);
}
let isApplyingFallthroughProps = false;
function shouldUseFunctionalFallthrough(component) {
	return isFunction(component) && !component.props && !(isTransitionEnabled && isVaporTransition(component));
}
/**
* The single source of truth for the attrs a component may fall through to
* its effective root — used both for the root element render effect and for
* forwarding into a root component's props. Functional components without
* declared props only pass class / style / event listeners; v-model
* listeners with a corresponding declared prop never fall through (the
* component handles the v-model itself — #1543, #1643, #1989). Never
* returns undefined so consumers can always diff away stale keys.
*/
function resolveFallthroughAttrs(instance, forProps = false) {
	const attrs = shouldUseFunctionalFallthrough(instance.type) ? getFunctionalFallthrough(instance.attrs) || EMPTY_OBJ : instance.attrs;
	if (forProps && !Object.keys(attrs).length) return EMPTY_OBJ;
	const propsOptions = normalizePropsOptions(instance.type)[0];
	if (propsOptions) {
		for (const key in attrs) if (isModelListener(key)) return filterModelListeners(attrs, propsOptions);
	}
	return attrs;
}
function applyFallthroughProps(el, attrs) {
	isApplyingFallthroughProps = true;
	try {
		patchDynamicProps(el, attrs);
	} finally {
		isApplyingFallthroughProps = false;
	}
}
/**
* dev only
*/
function createDevSetupStateProxy(setupState, instance) {
	const config = instance.appContext.config;
	return new Proxy(setupState, { get(target, key, receiver) {
		if (isString(key) && !key.startsWith("__v") && !hasOwn(/* @__PURE__ */ toRaw(setupState), key)) {
			if (hasOwn(instance.props, key)) return instance.props[key];
			warn(hasOwn(config.globalProperties, key) ? `Property ${JSON.stringify(key)} is provided via app.config.globalProperties, which is not supported in Vapor components.` : `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
		}
		return Reflect.get(target, key, receiver);
	} });
}
function callRender(render, instance, setupState) {
	return callWithErrorHandling(render, instance, 1, [
		setupState,
		instance.props,
		instance.emit,
		instance.attrs,
		instance.slots
	]);
}
/**
* dev only
* Runs devRender with everything it creates owned by a fresh per-render
* scope, so HMR rerender can tear down one generation by stopping the
* scope - including components nested inside elements, which the block
* graph cannot reach.
*/
function runDevRender(instance) {
	instance.accessedAttrs = instance.props === instance.attrs;
	(instance.renderScope = new EffectScope()).run(() => devRender(instance));
}
/**
* dev only
*/
function devRender(instance) {
	const prev = setCurrentRenderingInstance(instance);
	try {
		instance.block = (instance.type.render ? callRender(instance.type.render, instance, instance.setupState) : callWithErrorHandling(isFunction(instance.type) ? instance.type : instance.type.setup, instance, 0, [instance.props, {
			slots: instance.slots,
			attrs: instance.attrs,
			emit: instance.emit,
			expose: instance.expose
		}])) || [];
	} finally {
		setCurrentRenderingInstance(prev);
	}
}
const emptyContext = {
	app: null,
	config: {},
	provides: /*@__PURE__*/ Object.create(null)
};
var VaporComponentInstance = class {
	get proxy() {
		var _instance$setupContex;
		const instance = this;
		const ctx = instance.ctx || (instance.ctx = {});
		ctx._ = instance;
		instance.data || (instance.data = EMPTY_OBJ);
		instance.setupState || (instance.setupState = EMPTY_OBJ);
		(_instance$setupContex = instance.setupContext) !== null && _instance$setupContex !== void 0 || (instance.setupContext = null);
		instance.accessCache || (instance.accessCache = Object.create(null));
		const proxy = new Proxy(ctx, PublicInstanceProxyHandlers);
		Object.defineProperty(instance, "proxy", {
			configurable: true,
			value: proxy
		});
		return proxy;
	}
	getRootElement() {
		return this.block ? getBlockFirstNode(this.block) : void 0;
	}
	constructor(comp, rawProps, rawSlots, appContext, ce) {
		this.effectCount = 0;
		this.vapor = true;
		this.uid = nextUid();
		this.type = comp;
		this.parent = currentInstance;
		if (currentInstance) {
			this.root = currentInstance.root;
			this.$pageInstance = currentInstance.$pageInstance;
			this.page = currentInstance.page;
			this.appContext = currentInstance.appContext;
			this.provides = currentInstance.provides;
			this.ids = currentInstance.ids;
		} else {
			this.root = this;
			this.appContext = appContext || emptyContext;
			this.provides = Object.create(this.appContext.provides);
			this.ids = [
				"",
				0,
				0
			];
		}
		this.block = null;
		this.scope = new EffectScope(true);
		this.emit = emit.bind(null, this);
		this.expose = expose.bind(null, this);
		this.refs = EMPTY_OBJ;
		this.emitted = this.exposed = this.exposeProxy = this.propsDefaults = null;
		this.suspense = null;
		this.suspenseId = 0;
		if (isSuspenseEnabled) {
			const suspense = this.suspense = currentRenderContext.suspense;
			this.suspenseId = suspense ? suspense.pendingId : 0;
		}
		this.asyncDep = null;
		this.asyncResolved = false;
		this.isMounted = this.isUnmounted = this.isUpdating = this.isDeactivated = false;
		this.propsValues = Object.create(null);
		this.rawValues = INITIAL_RAW_VALUES;
		this.propsDeps = void 0;
		this.hasDynamicProps = true;
		this.rawProps = rawProps || EMPTY_OBJ;
		this.hasFallthrough = !!ce || hasFallthroughAttrs(comp, this.rawProps);
		const [propsHandlers, attrsHandlers] = getPropsProxyHandlers(comp);
		this.attrs = new Proxy(this, attrsHandlers);
		this.props = comp.props ? new Proxy(this, propsHandlers) : isFunction(comp) ? this.attrs : EMPTY_OBJ;
		const normalizedRawSlots = normalizeRawSlots(rawSlots);
		this.rawSlots = normalizedRawSlots || EMPTY_OBJ;
		this.slots = normalizedRawSlots ? new Proxy(normalizedRawSlots, dynamicSlotsProxyHandlers) : EMPTY_OBJ;
		this.scopeId = getCurrentScopeId();
		this.uniScopeOwner = getScopeOwner();
		this.slotScopeIds = currentRenderContext.slotScopeIds;
		if (ce) ce(this);
		if (!!(process.env.NODE_ENV !== "production")) {
			if (this.props === this.attrs) this.accessedAttrs = true;
			else {
				const attrs = this.attrs;
				const instance = this;
				this.attrs = new Proxy(attrs, { get(target, key, receiver) {
					instance.accessedAttrs = true;
					return Reflect.get(target, key, receiver);
				} });
			}
		}
	}
	rawKeys() {
		const vnode = isInteropEnabled && this.interopVNode;
		return Object.keys(vnode ? vnode.props || EMPTY_OBJ : this.rawValues);
	}
};
function isVaporComponent(value) {
	return value instanceof VaporComponentInstance;
}
/**
* Resolve an asset component by name before passing it to the fallback helper;
* a string passed directly to `createComponentWithFallback` is plain element
* fallback, not a component name.
*/
function createAssetComponent(name, rawProps, rawSlots, isSingleRoot, once, maybeSelfReference, ns, appContext) {
	return createComponentWithFallback(resolveComponent(name, maybeSelfReference), rawProps, rawSlots, isSingleRoot, once, ns, appContext);
}
/**
* Used when a component cannot be resolved at compile time
* and needs rely on runtime resolution - where it might fallback to a plain
* element if the resolution fails.
*/
function createComponentWithFallback(comp, rawProps, rawSlots, isSingleRoot, once, ns, appContext) {
	if (comp === NULL_DYNAMIC_COMPONENT) {
		if (isHydrating$1 && currentHydrationNode) {
			if (isReusableNullComponentAnchor(currentHydrationNode)) {
				const node = currentHydrationNode;
				if (isComment(node, "")) advanceHydrationNode(node);
				return node;
			}
			const nextAnchor = nextLogicalSibling(currentHydrationNode);
			if (nextAnchor && isReusableNullComponentAnchor(nextAnchor)) return nextAnchor;
		}
		return !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ createComment("ndc") : /* @__PURE__ */ createTextNode("");
	}
	if (!isString(comp)) return createComponent(comp, rawProps, rawSlots, isSingleRoot, once, appContext);
	return createPlainElement(comp, rawProps, rawSlots, isSingleRoot, once, ns);
}
function isReusableNullComponentAnchor(node) {
	return isComment(node, "") || !!(process.env.NODE_ENV !== "production") && (isComment(node, "dynamic-component") || isComment(node, "async component") || isComment(node, "keyed"));
}
function createPlainElement(comp, rawProps, rawSlots, isSingleRoot, once, ns) {
	if (comp === "svg") ns = 1;
	else if (comp === "math") ns = 2;
	rawSlots = normalizeRawSlots(rawSlots);
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	let hydrationCursor = null;
	if (isHydrating$1) hydrationCursor = enterHydrationCursor();
	else resetInsertionState();
	const defaultSlot = rawSlots && getSlot(rawSlots, "default", resolveFunctionSource);
	const hasDynamicSlots = !!rawSlots && !!rawSlots.$;
	const adoptHydrationChildren = !!defaultSlot;
	const hydrationTemplate = hasDynamicSlots && !defaultSlot ? `<${comp}><!></${comp}>` : `<${comp}/>`;
	const el = isHydrating$1 ? adoptTemplate(currentHydrationNode, hydrationTemplate, adoptHydrationChildren, ns) : /* @__PURE__ */ createElement(comp, ns);
	el.$root = isSingleRoot;
	if ((isKeepAliveEnabled || isTransitionEnabled) && rawProps) {
		const key = resolveSource(rawProps.key);
		if (key !== void 0) el.$key = key;
	}
	if (!isHydrating$1 || isRecreatedNode(el)) {
		const scopeId = getCurrentScopeId();
		if (scopeId) el.setAttribute(scopeId, "");
		const uniScopeIds = getUniScopeIds();
		if (uniScopeIds) setElementScopeIds(el, uniScopeIds);
		const slotScopeIds = currentRenderContext.slotScopeIds;
		if (slotScopeIds) setElementScopeIds(el, slotScopeIds);
	}
	if (rawProps) {
		const isSVG = ns === 1;
		const setFn = () => patchDynamicProps(el, resolveDynamicProps(rawProps), isSVG, isHydrating$1 ? getStaticBindingKeys(rawProps) : void 0);
		if (once) setFn();
		else renderEffect(setFn);
	}
	if (rawSlots) {
		const outerCtx = setRenderContext(deriveSlotBoundary(currentRenderContext, null));
		let nextNode = null;
		if (isHydrating$1) {
			nextNode = nextLogicalSibling(el);
			let child = el.firstChild;
			if (rawSlots.$ && !child) child = el.appendChild(claimAnchor(!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ createComment("") : /* @__PURE__ */ createTextNode()));
			setCurrentHydrationNode(child);
		}
		if (rawSlots.$) {
			const frag = new DynamicFragment(512, !!(process.env.NODE_ENV !== "production") ? isHydrating$1 ? "" : "slot" : void 0);
			if (isHydrating$1) locateHydrationNode();
			renderEffect(() => frag.update(getSlot(rawSlots, "default", resolveFunctionSource)));
			if (!isHydrating$1) insert(frag, el);
			registerNestedVDOMCleanup(frag);
		} else {
			const slot = getSlot(rawSlots, "default", resolveFunctionSource);
			if (slot) {
				let end;
				if (isHydrating$1) {
					end = el.appendChild(claimAnchor(/* @__PURE__ */ createComment("nce")));
					if (!currentHydrationNode) setCurrentHydrationNode(end);
				}
				const block = slot();
				if (end) el.removeChild(end);
				if (!isHydrating$1) insert(block, el);
				registerNestedVDOMCleanup(block);
			}
		}
		if (isHydrating$1) setCurrentHydrationNode(nextNode);
		setRenderContext(outerCtx);
	}
	finishBlockCreation(el, void 0, hydrationCursor, _insertionParent, _insertionAnchor);
	return el;
}
function mountComponent(instance, parent, anchor) {
	if (isSuspenseEnabled && instance.suspense && instance.asyncDep && !instance.asyncResolved) {
		if (instance.asyncDepRegistered) {
			if (instance.pendingBlock) insert(instance.pendingBlock, parent, anchor);
			else if (instance.block) insert(instance.block, parent, anchor);
			if (isKeepAliveEnabled && instance.shapeFlag & 512) instance.isDeactivated = false;
			return;
		}
		const suspense = instance.suspense;
		const deferred = isKeepAliveEnabled && deferKeepAliveRenderEffects(instance);
		const hydrating = isHydrating$1;
		if (!hydrating) {
			instance.block = /* @__PURE__ */ createComment("");
			insert(instance.block, parent, anchor);
		}
		instance.asyncDepRegistered = true;
		const component = instance.type;
		let asyncSetupFinished = false;
		const finishAsyncSetup = (setupResult) => {
			if (asyncSetupFinished) return;
			asyncSetupFinished = true;
			instance.asyncResolved = true;
			const handleResult = () => {
				const prevInstance = setCurrentInstance(instance);
				const prevSub = setActiveSub();
				try {
					handleSetupResult(setupResult, component, instance);
				} finally {
					setActiveSub(prevSub);
					restoreCurrentInstance(prevInstance);
				}
			};
			try {
				const pendingBlock = hydrating ? instance.pendingBlock : instance.block;
				const { parentNode, nextNode } = findBlockBoundary(pendingBlock);
				const renderAndMount = () => {
					handleResult();
					mountComponent(instance, parentNode, nextNode);
				};
				if (hydrating) hydrateNode(getBlockFirstNode(pendingBlock), () => {
					const hydration = enterComponentHydration(component);
					try {
						withDeferredHydrationBoundary(renderAndMount);
					} finally {
						exitComponentHydration(hydration, true);
					}
				}, isInteropEnabled ? getInteropHydrationBoundary(instance, parentNode) : null);
				else {
					renderAndMount();
					remove(pendingBlock, parentNode);
				}
			} finally {
				if (hydrating) instance.pendingBlock = void 0;
			}
		};
		suspense.registerDep(instance, (setupResult) => {
			if (deferred) {
				if (deferred.pendingRoot === instance) deferred.pendingRoot = void 0;
				if (!deferred.flushQueued) {
					deferred.flushQueued = true;
					queuePostRenderEffect(deferred.flushJob, void 0, deferred.suspense);
				}
			}
			finishAsyncSetup(setupResult);
		});
		if (deferred) {
			const state = deferred;
			instance.asyncDep.catch(NOOP).then((setupResult) => {
				if (asyncSetupFinished) return;
				if (!instance.isUnmounted && !suspense.isUnmounted && !suspense.pendingBranch) finishAsyncSetup(setupResult);
				if (!state.flushQueued && state.pendingRoot === instance) settleDeferredKeepAliveUpdates(state);
			});
		}
		return;
	}
	if (isKeepAliveEnabled && instance.shapeFlag & 512 && instance.isMounted) {
		instance.parent.ctx.activate(instance, parent, anchor);
		return;
	}
	const { root, type } = instance;
	if (root && root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
	if (!!(process.env.NODE_ENV !== "production")) startMeasure(instance, `mount`);
	if (instance.bm) invokeArrayFns(instance.bm);
	if (!isHydrating$1) {
		applyComponentScopeIds(instance);
		insert(instance.block, parent, anchor, instance.suspense);
	} else hydrateComponentScopeIds(instance);
	if (instance.m) queuePostRenderEffect(instance.m, void 0, instance.suspense);
	if (isKeepAliveEnabled && instance.shapeFlag & 256 && (instance.ba || instance.a)) {
		if (instance.ba) invokeKeepAliveHooks(instance.ba);
		if (instance.a) queuePostRenderEffect(instance.a, void 0, instance.suspense);
	}
	instance.isMounted = true;
	if (!!(process.env.NODE_ENV !== "production")) endMeasure(instance, `mount`);
}
function registerUnmount(instance) {
	const scope = instance.unmountScope;
	onScopeDispose(() => {
		if (scope && instance.unmountScope === scope) instance.unmountScope = void 0;
		unmountComponent(instance, void 0, isInteropEnabled ? resolveUnmountSuspense(instance.suspense) : instance.suspense);
	}, true);
}
function unmountComponent(instance, parentNode, parentSuspense = instance.suspense) {
	if (isSuspenseEnabled && isInteropEnabled && currentUnmountSuspense !== parentSuspense) {
		runWithUnmountSuspense(parentSuspense, () => unmountComponent(instance, parentNode, parentSuspense));
		return;
	}
	if (isKeepAliveEnabled && instance.shapeFlag & 256 && instance.parent && instance.parent.vapor && instance.parent.ctx) {
		if (parentNode) instance.parent.ctx.deactivate(instance, parentSuspense);
		return;
	}
	const pendingAsyncSetup = !!instance.asyncDep && !instance.asyncResolved;
	if (!instance.isUnmounted) {
		const hasLifecycle = instance.isMounted || pendingAsyncSetup;
		if (!!(process.env.NODE_ENV !== "production")) unregisterHMR(instance);
		if (hasLifecycle) {
			invalidateMount(instance.m);
			invalidateMount(instance.a);
			if (instance.bum) invokeArrayFns(instance.bum);
		}
		if (isKeepAliveEnabled) {
			const inputScope = instance.inputScope;
			if (inputScope) inputScope.stop();
		}
		instance.scope.stop();
		if (hasLifecycle && instance.um) queuePostRenderEffect(instance.um, void 0, parentSuspense);
		instance.isUnmounted = true;
	}
	if (isSuspenseEnabled && pendingAsyncSetup) {
		if (instance.pendingBlock) {
			if (parentNode) {
				const pendingBlock = instance.pendingBlock;
				const { parentNode: blockParent } = findBlockBoundary(pendingBlock);
				if (blockParent) remove(pendingBlock, blockParent);
				instance.pendingBlock = void 0;
			}
		} else if (instance.block instanceof Comment) {
			const blockParent = instance.block.parentNode;
			if (blockParent) remove(instance.block, blockParent);
		}
	} else if (parentNode) {
		if (instance.block) remove(instance.block, parentNode);
	}
}
function getExposed(instance) {
	if (instance.exposed) {
		const publicPropertiesMap = getPublicPropertiesMap(true);
		return instance.exposeProxy || (instance.exposeProxy = new Proxy(markRaw(instance.exposed), {
			get: (target, key) => {
				if (key in target) return unref(target[key]);
				else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
			},
			has: (target, key) => key in target || key in publicPropertiesMap,
			set: (target, key, value, receiver) => {
				const oldValue = target[key];
				if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
					oldValue.value = value;
					return true;
				}
				return Reflect.set(target, key, value, receiver);
			}
		}));
	} else return instance.proxy;
}
function getRootElement(block, visitor) {
	if (block instanceof Element) return block;
	if (isVaporComponent(block)) {
		if (visitor) {
			if (visitor.onComponent && visitor.onComponent(block)) return;
			if (visitor.stopAtComponent) return;
		}
		return getRootElement(block.block, visitor);
	}
	if (isFragment(block) && !(isTeleportEnabled && isTeleportFragment(block))) {
		if (visitor) {
			if (visitor.excludeSlotOutlets && isSlotOutletFragment(block)) return;
			if (isDynamicFragment(block) && visitor.onDynamicFragment && visitor.onDynamicFragment(block)) return;
			if (isInteropEnabled && visitor.onInteropFragment && isInteropFragment(block) && visitor.onInteropFragment(block)) return;
		}
		return getRootElement(block.nodes, visitor);
	}
	if (isArray(block)) {
		const single = singleRootOf(block);
		return single === void 0 ? void 0 : getRootElement(single, visitor);
	}
}
function singleRootOf(nodes) {
	let single;
	let hasComment = false;
	for (const b of nodes) {
		if (b instanceof Comment) {
			hasComment = true;
			continue;
		}
		if (single !== void 0) return;
		single = b;
	}
	return hasComment ? single : void 0;
}
/**
* Descends the same effective-root rules as getRootElement but stops at the
* first component instead of resolving an element. Used to verify `child`
* sits on `parent`'s root chain when the chain passes through fragments
* (where `parent.block === child` cannot see the link).
*/
function getRootChainComponent(block) {
	while (true) {
		if (isVaporComponent(block)) return block;
		if (isFragment(block) && !(isTeleportEnabled && isTeleportFragment(block))) {
			if (isSlotOutletFragment(block)) return;
			block = block.nodes;
			continue;
		}
		if (isArray(block)) {
			const single = singleRootOf(block);
			if (single === void 0) return;
			block = single;
			continue;
		}
		return;
	}
}
function handleSetupResult(setupResult, component, instance) {
	if (!!(process.env.NODE_ENV !== "production")) pushWarningContext(instance);
	if (isBlock(setupResult)) instance.block = setupResult;
	else if (isFunction(setupResult) && instance.asyncDep) instance.block = callWithErrorHandling(setupResult, instance, 1) || [];
	else if (isFunction(component)) {
		if (!!(process.env.NODE_ENV !== "production")) warn(`Functional vapor component must return a block directly.`);
		instance.block = [];
	} else if (!component.render) {
		if (!!(process.env.NODE_ENV !== "production")) warn(`Vapor component setup() returned non-block value, and has no render function.`);
		instance.block = [];
	} else {
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) instance.devtoolsRawSetupState = setupResult;
		if (!!(process.env.NODE_ENV !== "production")) {
			instance.setupState = createDevSetupStateProxy(proxyRefs(setupResult), instance);
			runDevRender(instance);
		} else instance.block = callRender(component.render, instance, setupResult) || [];
	}
	applyComponentFallthrough(instance);
	if (!!(process.env.NODE_ENV !== "production")) popWarningContext();
}
function applyComponentFallthrough(instance) {
	if (instance.hasFallthrough && instance.type.inheritAttrs !== false) applyFallthroughAttrs(instance.block, instance, !!(process.env.NODE_ENV !== "production") ? instance.renderScope : void 0);
}
function applyFallthroughAttrs(block, instance, scope) {
	const state = new FallthroughResolveState(scope);
	const root = resolveFallthroughRoot(block, state);
	const { fragments, innermost, hasSlotOutlet } = state;
	if (fragments) for (const frag of fragments) registerDynamicFragmentFallthroughAttrs(frag, instance);
	if (root && !hasSlotOutlet) {
		let ownerScope = scope;
		if (innermost) ownerScope = innermost.scope || (innermost.scope = state.parentScope ? state.parentScope.run(() => new EffectScope()) : new EffectScope());
		const applyEffect = () => renderEffect(() => applyFallthroughProps(root, resolveFallthroughAttrs(instance)));
		ownerScope ? ownerScope.run(applyEffect) : applyEffect();
	} else if (!!(process.env.NODE_ENV !== "production")) {
		const accessedAttrs = instance.accessedAttrs;
		const fallthroughAttrs = resolveFallthroughAttrs(instance);
		if (Object.keys(fallthroughAttrs).length && (hasSlotOutlet || fragments && state.hasNonSingleRoot || isTeleportEnabled && containsTeleportFragment(block) || !accessedAttrs && (block instanceof Text || isArray(block) && block.length))) warnExtraneousAttributes(instance.attrs);
	}
}
var FallthroughResolveState = class {
	constructor(parentScope) {
		this.stopAtComponent = true;
		this.parentScope = parentScope;
	}
	onDynamicFragment(frag) {
		if (frag.__vf & 4) {
			this.hasSlotOutlet = true;
			return true;
		}
		(this.fragments || (this.fragments = [])).push(frag);
		if (this.innermost && this.innermost.scope) this.parentScope = this.innermost.scope;
		this.innermost = frag;
	}
	onInteropFragment(frag) {
		if (isInteropEnabled) {
			if (isSlotOutletFragment(frag)) return this.hasSlotOutlet = true;
			return !!frag.vnode;
		}
		return false;
	}
};
function resolveFallthroughRoot(block, state) {
	const root = getRootElement(block, state);
	const { innermost } = state;
	if (!!(process.env.NODE_ENV !== "production") && !root && innermost) {
		const { nodes } = innermost;
		state.hasNonSingleRoot = isArray(nodes) && nodes.some((child) => !(child instanceof Comment));
	}
	return root;
}
function containsTeleportFragment(block) {
	if (isTeleportFragment(block)) return true;
	if (isArray(block)) return block.some((child) => !(child instanceof Comment) && containsTeleportFragment(child));
	return isFragment(block) && containsTeleportFragment(block.nodes);
}
function registerDynamicFragmentFallthroughAttrs(frag, instance) {
	if (frag.fallthrough) return;
	frag.fallthrough = (nodes) => applyFallthroughAttrs(nodes, instance, frag.scope);
}
/**
* A deferred state stays live while its async root is pending or its flush is
* queued for the same Suspense generation. The flush is requeued if that
* generation is discarded, so `flushQueued` cannot strand buffered updates.
*/
function isDeferredKeepAliveStateLive(state) {
	const suspense = state.suspense;
	if (suspense.isUnmounted || state.pendingId !== suspense.pendingId) return false;
	if (state.flushQueued) return true;
	const root = state.pendingRoot;
	return !!root && !root.isUnmounted;
}
function settleDeferredKeepAliveUpdates(state, currentJob) {
	const { effects, owners } = state;
	state.effects = [];
	state.owners = [];
	state.pendingRoot = void 0;
	for (let i = 0; i < owners.length; i++) if (owners[i].deferredKeepAliveUpdates === state) owners[i].deferredKeepAliveUpdates = void 0;
	if (currentJob && !effects.includes(currentJob)) effects.push(currentJob);
	if (effects.length > 1) effects.sort((a, b) => a.order - b.order);
	for (let i = 0; i < effects.length; i++) {
		const job = effects[i];
		callWithErrorHandling(job, job.i, job.i ? 15 : 14);
	}
}
function deferKeepAliveRenderEffects(instance) {
	const suspense = instance.suspense;
	const owners = [];
	let keepAlive;
	if (isHydrating$1) {
		const owner = instance.parent;
		if (owner && owner.vapor && isKeepAlive(owner) && owner.suspense === suspense) {
			keepAlive = owner;
			owners.push(keepAlive);
		}
	} else {
		let child = instance;
		let owner = instance.parent;
		while (owner && owner.vapor && owner.suspense === suspense) {
			const vaporOwner = owner;
			let root = vaporOwner.block;
			while (isDynamicFragment(root) && !(root.__vf & 4)) root = root.nodes;
			if (root !== child) return;
			owners.push(vaporOwner);
			if (isKeepAlive(owner)) keepAlive = vaporOwner;
			child = vaporOwner;
			owner = vaporOwner.parent;
		}
	}
	if (!keepAlive) return;
	let deferred = keepAlive.deferredKeepAliveUpdates;
	if (!deferred || deferred.suspense !== suspense || deferred.pendingId !== instance.suspenseId) {
		const flushJob = () => {
			state.flushQueued = false;
			if (keepAlive.deferredKeepAliveUpdates !== state || state.pendingRoot) return;
			settleDeferredKeepAliveUpdates(state);
		};
		flushJob.flags = 8;
		const state = {
			effects: [],
			owners: [],
			suspense,
			pendingId: instance.suspenseId,
			pendingRoot: instance,
			flushQueued: false,
			flushJob
		};
		deferred = state;
	} else deferred.pendingRoot = instance;
	for (let i = 0; i < owners.length; i++) {
		const owner = owners[i];
		if (owner.deferredKeepAliveUpdates !== deferred) {
			owner.deferredKeepAliveUpdates = deferred;
			deferred.owners.push(owner);
		}
	}
	return deferred;
}
function getInteropHydrationBoundary(instance, parent) {
	let owner = instance;
	while (owner && owner.vapor) {
		const vnode = owner.interopVNode;
		if (vnode) {
			const anchor = vnode.anchor;
			return anchor.parentNode === parent ? anchor : null;
		}
		owner = owner.parent;
	}
	return null;
}
//#endregion
//#region packages/runtime-vapor/src/apiCreateApp.ts
let _createApp;
const rootInstances = /* @__PURE__ */ new WeakMap();
const mountApp = (app, container) => {
	optimizePropertyLookup();
	if (container.nodeType === 1) {
		if (!!(process.env.NODE_ENV !== "production") && container.childNodes.length) warn("mount target container is not empty and will be cleared.");
		container.textContent = "";
	}
	const minUid = app._ceComponent ? app._ceComponent.uid : getNextUid();
	let instance;
	flushOnAppMount(() => {
		instance = app._ceComponent || createComponent(app._component, app._props, null, false, false, app._context, true);
		mountComponent(instance, container);
	}, minUid);
	rootInstances.set(app, instance);
	return instance;
};
let _hydrateApp;
const hydrateApp = (app, container) => {
	if (!container.hasChildNodes()) {
		(process.env.NODE_ENV !== "production" || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn("Attempting to hydrate existing markup but container is empty. Performing full mount instead.");
		return mountApp(app, container);
	}
	optimizePropertyLookup();
	const minUid = app._ceComponent ? app._ceComponent.uid : getNextUid();
	let instance;
	flushOnAppMount(() => {
		withHydration(container, () => {
			instance = app._ceComponent || createComponent(app._component, app._props, null, false, false, app._context, true);
			mountComponent(instance, container);
		});
	}, minUid);
	rootInstances.set(app, instance);
	return instance;
};
const unmountApp = (app) => {
	const instance = !!(process.env.NODE_ENV !== "production") && app._instance || rootInstances.get(app);
	flushOnAppMount(() => {
		unmountComponent(instance, app._container);
	}, getNextUid());
	rootInstances.delete(app);
};
function prepareApp() {
	initFeatureFlags();
	const target = getGlobalThis();
	target.__VUE__ = true;
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
}
function postPrepareApp(app) {
	app.vapor = true;
	const mount = app.mount;
	app.mount = (container, ...args) => {
		container = normalizeContainer(container);
		if (!container) return;
		const proxy = mount(container, ...args);
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
}
const createVaporApp = (comp, props) => {
	prepareApp();
	if (!_createApp) _createApp = createAppAPI(mountApp, unmountApp, getExposed);
	const app = _createApp(comp, props);
	postPrepareApp(app);
	return app;
};
const createVaporSSRApp = (comp, props) => {
	setIsHydratingEnabled$1(true);
	prepareApp();
	if (!_hydrateApp) _hydrateApp = createAppAPI(hydrateApp, unmountApp, getExposed);
	const app = _hydrateApp(comp, props);
	postPrepareApp(app);
	return app;
};
//#endregion
//#region packages/runtime-vapor/src/apiDefineComponent.ts
/*@__NO_SIDE_EFFECTS__*/
function defineVaporComponent(comp, extraOptions) {
	if (isFunction(comp)) return /*@__PURE__*/ (() => extend$1({ name: comp.name }, extraOptions, {
		setup: comp,
		__vapor: true
	}))();
	comp.__vapor = true;
	return comp;
}
//#endregion
//#region packages/runtime-vapor/src/apiDefineAsyncComponent.ts
function defineVaporAsyncComponent(source) {
	enableAsyncComponent();
	const { load, getResolvedComp, setPendingRequest, source: { loadingComponent, errorComponent, delay, hydrate: hydrateStrategy, timeout, suspensible = true } } = createAsyncComponentContext(source);
	return /* @__PURE__ */ defineVaporComponent({
		name: "VaporAsyncComponentWrapper",
		__asyncLoader: load,
		__asyncHydrate(el, instance, hydrate) {
			if (!isHydrating$1) return;
			const endAnchor = isRangeStart(el) ? locateEndAnchor(el) : null;
			let nodes;
			if (endAnchor) {
				const end = /* @__PURE__ */ _next(endAnchor);
				const range = nodes = [el];
				let cur = el;
				while (true) {
					let n = /* @__PURE__ */ _next(cur);
					if (n && n !== end) range.push(cur = n);
					else break;
				}
			} else nodes = el;
			const prev = setCurrentInstance(instance);
			try {
				const frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "async component" : void 0);
				frag.nodes = nodes;
				instance.block = frag;
			} finally {
				restoreCurrentInstance(prev);
			}
			instance.isMounted = true;
			setCurrentHydrationNode(nextLogicalSibling(el));
			performAsyncHydrate(el, instance, () => hydrateNode(el, () => withDeferredHydrationBoundary(hydrate), isInteropEnabled ? getInteropHydrationBoundary(instance, el.parentNode) : null), getResolvedComp, load, hydrateStrategy, false);
		},
		get __asyncResolved() {
			return getResolvedComp();
		},
		setup() {
			const instance = currentInstance;
			markAsyncBoundary(instance);
			const placeholder = instance.block;
			let frag;
			if (isHydrating$1 && isDynamicFragment(placeholder)) {
				frag = placeholder;
				frag.nodes = EMPTY_BLOCK;
				locateHydrationNode();
			} else {
				frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "async component" : void 0);
				if (isHydrating$1) locateHydrationNode();
			}
			let resolvedComp = getResolvedComp();
			if (resolvedComp) {
				frag.update(() => createInnerComp(resolvedComp, instance));
				if (frag === placeholder) {
					const u = frag.u;
					if (u) u.forEach((hook) => hook(frag.nodes));
				}
				return frag;
			}
			const onError = (err) => {
				setPendingRequest(null);
				handleError(err, instance, 13, !errorComponent);
			};
			if (suspensible && instance.suspense) {
				const renderBranch = (render) => {
					if (!instance.isUnmounted) instance.scope.run(() => frag.update(render));
				};
				return load().then(() => {
					resolvedComp = getResolvedComp();
					if (resolvedComp) renderBranch(() => createInnerComp(resolvedComp, instance));
					return frag;
				}).catch((err) => {
					onError(err);
					if (errorComponent) renderBranch(() => createErrorComp(errorComponent, instance, () => err));
					return frag;
				});
			}
			const { loaded, error, delayed } = useAsyncComponentState(delay, timeout, onError, instance);
			load().then(() => {
				if (instance.isUnmounted) return;
				loaded.value = true;
			}).catch((err) => {
				if (instance.isUnmounted) {
					setPendingRequest(null);
					return;
				}
				onError(err);
				error.value = err;
			});
			renderEffect(() => {
				resolvedComp = getResolvedComp();
				let render;
				let key;
				if (loaded.value && resolvedComp) {
					render = () => createInnerComp(resolvedComp, instance);
					key = 1;
				} else if (error.value && errorComponent) {
					render = () => createErrorComp(errorComponent, instance, () => error.value);
					key = 2;
				} else if (loadingComponent && !delayed.value) {
					render = () => createInnerComp(loadingComponent, instance);
					key = 3;
				}
				frag.update(render, key);
				if (isKeepAliveEnabled && frag.keepAliveCtx) frag.keepAliveCtx.cacheBlock();
			});
			return frag;
		}
	});
}
/**
* The block an async wrapper has settled on, or undefined while it is
* unresolved or (under deferred hydration) resolved but not set up yet.
* Consumers reading through the wrapper treat undefined as unresolved.
*/
function getAsyncWrapperInner(instance) {
	const frag = instance.block;
	if (isDynamicFragment(frag) && frag.current !== void 0 && instance.type.__asyncResolved) return frag.nodes;
}
function createErrorComp(comp, parent, getError) {
	return createInnerComp(comp, parent, {
		error: getError,
		$: [() => trackRawValues(parent)]
	}, {});
}
function createInnerComp(comp, parent, rawProps = { $: [() => trackRawValues(parent)] }, rawSlots = parent.rawSlots) {
	const prevInstance = setCurrentInstance(parent);
	try {
		return createComponent(comp, rawProps, rawSlots, void 0, void 0, parent.appContext);
	} finally {
		restoreCurrentInstance(prevInstance);
	}
}
//#endregion
//#region packages/runtime-vapor/src/components/Transition.ts
let registered = false;
const ensureTransitionHooksRegistered = () => {
	if (!registered) {
		registered = true;
		registerTransitionHooks(applyTransitionHooksImpl, applyTransitionLeaveHooksImpl, deferBranchUpdateDuringLeaveImpl, removeBranchWithLeaveImpl, ownsMode, awaitLeavingRootImpl, (block) => !!findTransitionBlock(block) || hasComponent(block), resolveOutletLeaveImpl);
	}
};
const hydrateTransitionImpl = (suspense) => {
	if (!currentHydrationNode || !isTemplateNode(currentHydrationNode)) return;
	const templateNode = currentHydrationNode;
	const { content, parentNode } = templateNode;
	const { firstChild } = content;
	if (firstChild) {
		let transitionEl;
		for (let node = firstChild; node; node = node.nextSibling) if (node instanceof Element) {
			transitionEl = node;
			break;
		}
		parentNode.insertBefore(content, templateNode);
		parentNode.removeChild(templateNode);
		updateLastLocatedLogicalChild(parentNode, templateNode, firstChild);
		setCurrentHydrationNode(firstChild);
		if (transitionEl instanceof HTMLElement || transitionEl instanceof SVGElement) {
			const originalDisplay = transitionEl.style.display;
			transitionEl.style.display = "none";
			return (hooks) => {
				hooks.beforeEnter(transitionEl);
				transitionEl.style.display = originalDisplay;
				queuePostRenderEffect(() => hooks.enter(transitionEl), void 0, suspense);
			};
		}
	}
};
const decorate$1 = (t) => {
	t.displayName = displayName;
	t.props = TransitionPropsValidators;
	t.__vapor = true;
	return t;
};
const VaporTransition = /*@__PURE__*/ decorate$1((props, { slots, expose }) => {
	expose();
	ensureTransitionHooksRegistered();
	const instance = currentInstance;
	const performAppear = isHydrating$1 ? hydrateTransitionImpl(instance.suspense) : void 0;
	const state = useTransitionState();
	const { mode } = props;
	process.env.NODE_ENV !== "production" && checkTransitionMode(mode);
	const resolvedProps = /* @__PURE__ */ computed$1(() => resolveTransitionProps(props));
	const propsProxy = new Proxy({}, { get(_, key) {
		return resolvedProps.value[key];
	} });
	if (!!(process.env.NODE_ENV !== "production")) state.refresh = (hooks) => applyTransitionHooksImpl(state.root, hooks, void 0, true);
	const shouldPerformAppear = !!props.appear && !!performAppear;
	if (instance.rawSlots.$) {
		const frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "transition" : void 0);
		if (isHydrating$1) locateHydrationNode();
		state.root = frag;
		let isMounted = false;
		renderEffect(() => {
			if (!frag.$transition) frag.$transition = resolveTransitionHooks$1(frag, propsProxy, state, instance);
			else frag.$transition.mode = resolvedProps.value.mode;
			const prevNodes = frag.nodes;
			frag.update(slots.default);
			if (isMounted && frag.nodes === prevNodes && !state.isLeaving) frag.$transition = applyTransitionHooksImpl(frag.nodes, frag.$transition, void 0, true);
			if (!isMounted && shouldPerformAppear) performAppear(frag.$transition);
			isMounted = true;
		});
		return frag;
	}
	const children = slots.default && slots.default() || [];
	state.root = children;
	const hooks = {
		__vapor: true,
		state,
		props: propsProxy,
		instance
	};
	let isMounted = false;
	renderEffect(() => {
		resolvedProps.value;
		const appliedHooks = applyTransitionHooksImpl(children, hooks, void 0, isMounted);
		if (!isMounted) {
			isMounted = true;
			if (shouldPerformAppear) performAppear(appliedHooks);
		}
	});
	return children;
});
const transitionTypeMap = /* @__PURE__ */ new WeakMap();
function getTransitionType(block) {
	const type = transitionTypeMap.get(block);
	if (type !== void 0) return type;
	if (block instanceof Element) return block.localName;
	if (isInteropEnabled && isFragment(block) && block.getTransitionType) {
		const type = block.getTransitionType();
		if (type !== void 0) return type;
	}
	return block;
}
function setTransitionType(block, type) {
	transitionTypeMap.set(block, type);
}
function getLeavingNodesForType(state, block) {
	const { leavingNodes } = state;
	const type = getTransitionType(block);
	let nodes = leavingNodes.get(type);
	if (!nodes) {
		nodes = Object.create(null);
		leavingNodes.set(type, nodes);
	}
	return nodes;
}
function markLeavingBlock(block, state) {
	getLeavingNodesForType(state, block)[String(getTransitionKey(block))] = block;
}
function getLeaveElement(block) {
	const el = getTransitionElement(block);
	if (el) return el;
	if (isFragment(block) && !isArray(block.nodes) && (block.nodes instanceof Element || isFragment(block.nodes))) return getLeaveElement(block.nodes);
}
const transitionKeys = /* @__PURE__ */ new WeakMap();
function getTransitionKey(block) {
	return transitionKeys.get(block);
}
function setTransitionKey(block, key) {
	transitionKeys.set(block, key);
}
const getTransitionHooksContext = (block, state) => {
	const key = String(getTransitionKey(block));
	const leavingNodes = getLeavingNodesForType(state, block);
	return {
		isLeaving: () => leavingNodes[key] === block,
		setLeavingNodeCache: () => {
			leavingNodes[key] = block;
		},
		unsetLeavingNodeCache: () => {
			if (leavingNodes[key] === block) delete leavingNodes[key];
		},
		earlyRemove: () => {
			const leavingNode = leavingNodes[key];
			if (leavingNode && getTransitionKey(leavingNode) === getTransitionKey(block)) {
				const el = getLeaveElement(leavingNode);
				if (el && el[leaveCbKey]) el[leaveCbKey]();
			}
		}
	};
};
function resolveTransitionHooks$1(block, props, state, instance) {
	const hooks = baseResolveTransitionHooks(getTransitionHooksContext(block, state), props, state, instance);
	hooks.__vapor = true;
	hooks.persisted = hooks.persisted || !!state.persisted;
	hooks.state = state;
	hooks.props = props;
	hooks.instance = instance;
	return hooks;
}
function applyTransitionHooksImpl(block, hooks, owner, refresh = false) {
	if (isArray(block)) {
		block = block.filter((b) => !(b instanceof Comment));
		if (block.length === 1) block = block[0];
		else if (block.length === 0) {
			if (!refresh && isVaporTransitionHooks(hooks)) releaseDelayedLeave(hooks);
			return hooks;
		}
	}
	if (hooks.applyGroup && (isForFragment(block) || isVaporSlotOutlet(block) || isVaporComponent(block) && isVaporSlotOutlet(block.block))) {
		hooks.applyGroup(block, hooks.props, hooks.state, hooks.instance);
		return hooks;
	}
	if (!isVaporTransitionHooks(hooks)) {
		relayTransitionHooks(block, hooks);
		return hooks;
	}
	const fragments = [];
	const child = resolveTransitionBlock(block, (fragment) => {
		fragments.push(fragment);
		if (refresh && fragment.$transition) hooks = fragment.$transition;
	}, owner);
	if (refresh && child) {
		if (child.$transition) hooks = child.$transition;
		if (removingLeave(child)) return hooks;
	}
	if (!child) {
		if (!refresh) {
			if (hasComponent(block)) {
				const pendingLeave = claimPendingLeave(hooks.state);
				if (pendingLeave) hooks = extend$1({}, hooks, { delayedLeave: pendingLeave });
			} else releaseDelayedLeave(hooks);
		}
		fragments.forEach((f) => f.$transition = hooks);
		if (!!(process.env.NODE_ENV !== "production") && fragments.length === 0) warn("Transition component has no valid child element");
		return hooks;
	}
	const { props, instance, state, delayedLeave } = hooks;
	state.persisted = isPersistedRoot(state.root, owner);
	const resolvedHooks = resolveTransitionHooks$1(child, props, state, instance);
	resolvedHooks.delayedLeave = (!refresh && child instanceof Element && !child.parentNode ? claimPendingLeave(state) : void 0) || delayedLeave;
	child.$transition = resolvedHooks;
	settleMountShown(child);
	fragments.forEach((f) => f.$transition = resolvedHooks);
	return resolvedHooks;
}
function relayTransitionHooks(block, hooks) {
	const relayed = hooks;
	const child = findTransitionBlock(block, (f) => f.$transition = relayed);
	if (child) {
		child.$transition = relayed;
		settleMountShown(child);
	}
}
function isPersistedRoot(block, swap) {
	while (block) {
		if (block.$vshow & 2) return true;
		if (isVaporComponent(block)) {
			if (isVaporTransition(block.type)) return false;
			block = isAsyncComponentEnabled && isAsyncWrapper(block) ? getAsyncWrapperInner(block) : block.block;
		} else if (isArray(block)) block = block.find((b) => !(b instanceof Comment));
		else if (isFragment(block) && (isVaporSlotOutlet(block) ? block !== swap : !(isDynamicFragment(block) || isForFragment(block)))) block = block.nodes;
		else return false;
	}
	return false;
}
function resolveOutletLeaveImpl(outlet, block, hooks) {
	if (!isVaporTransitionHooks(hooks)) return hooks.persisted;
	const { state } = hooks;
	if (!outlet) return hooks.persisted || !!state.persisted;
	if (hooks.props.persisted) return true;
	state.persisted = isPersistedRoot(state.root, outlet);
	if (!state.persisted && isPersistedRoot(block)) {
		const child = findTransitionBlock(block);
		const childHooks = child && child.$transition;
		if (childHooks && childHooks.persisted) child.$transition = extend$1({}, childHooks, { persisted: false });
	}
	return state.persisted;
}
function applyTransitionLeaveHooksImpl(block, enterHooks, afterLeaveCb, unpaired = false, owner) {
	const leavingBlock = findTransitionBlock(block);
	if (!leavingBlock) return false;
	const el = getTransitionElement(leavingBlock);
	if (!el || !el.parentNode) return false;
	const { props, state, instance } = enterHooks;
	const { mode } = props;
	const pairedState = unpaired ? void 0 : state;
	const runningLeave = removingLeave(leavingBlock);
	if (runningLeave && (unpaired || mode === "out-in")) {
		if (unpaired) {
			const leavingFrag = findLeavingFragment(block);
			const next = leavingFrag && leavingFrag.pending;
			if (!(next && next.render)) return false;
		}
		chainAfterLeave(runningLeave, afterLeaveCb, pairedState);
		return true;
	}
	const leavingHooks = resolveTransitionHooks$1(leavingBlock, props, state, instance);
	leavingBlock.$transition = leavingHooks;
	if (mode === "out-in") chainAfterLeave(leavingHooks, () => {
		afterLeaveCb();
		leavingBlock.$transition = void 0;
		delete leavingHooks.afterLeave;
	}, pairedState);
	else if (mode === "in-out") leavingHooks.delayLeave = (block, earlyRemove, delayedLeave) => {
		const leavingNodes = getLeavingNodesForType(state, leavingBlock);
		const leavingKey = String(getTransitionKey(leavingBlock));
		leavingNodes[leavingKey] = leavingBlock;
		const delayedLeaveCb = createDelayedLeave(leavingBlock, delayedLeave);
		block[leaveCbKey] = () => {
			delayedLeaveCb(true);
			earlyRemove();
			block[leaveCbKey] = void 0;
			leavingBlock.$transition = void 0;
			if (leavingNodes[leavingKey] === leavingBlock) delete leavingNodes[leavingKey];
		};
		if (unpaired) {
			releaseDelayedLeave(enterHooks);
			queuePendingLeave(state, delayedLeaveCb);
		} else (owner ? owner.$transition : enterHooks).delayedLeave = delayedLeaveCb;
	};
	return true;
}
function hasComponent(block) {
	if (isVaporComponent(block)) return true;
	if (isArray(block)) {
		for (let i = 0; i < block.length; i++) if (hasComponent(block[i])) return true;
		return false;
	}
	return isFragment(block) && hasComponent(block.nodes);
}
function releaseDelayedLeave(hooks) {
	const delayedLeave = hooks.delayedLeave;
	if (delayedLeave) {
		hooks.delayedLeave = void 0;
		queuePendingLeave(hooks.state, delayedLeave);
	}
}
function queuePendingLeave(state, leave) {
	const pending = state.pendingLeave;
	if (pending) {
		const incoming = leave;
		leave = () => {
			pending();
			incoming();
		};
	}
	state.pendingLeave = leave;
	queuePostFlushCb(() => {
		if (state.pendingLeave === leave) {
			state.pendingLeave = void 0;
			leave();
		}
	});
}
function claimPendingLeave(state) {
	const leave = state.pendingLeave;
	state.pendingLeave = void 0;
	return leave;
}
function createDelayedLeave(block, leave) {
	return (cancelled) => {
		if (!leave) return;
		const cb = leave;
		const leavingBlock = block;
		leave = block = void 0;
		if (!cancelled) {
			cb();
			leavingBlock.$transition = void 0;
		}
	};
}
function ownsMode(hooks, frag) {
	if (!isVaporTransitionHooks(hooks)) return false;
	const ctx = frag && keyContexts.get(frag);
	return !ctx || !ctx.type;
}
function deferBranchUpdateDuringLeaveImpl(frag, render, key, noScope, branchKey, prevKey) {
	const transition = frag.$transition;
	if (!ownsMode(transition, frag) || !transition.state.isLeaving) return false;
	const pending = frag.pending;
	if (pending) {
		pending.render = render;
		pending.key = key;
		pending.noScope = noScope;
		pending.branchKey = branchKey;
	} else frag.pending = {
		render,
		key,
		noScope,
		branchKey,
		prevKey
	};
	return true;
}
function findLeavingFragment(block) {
	let leaving;
	findTransitionBlock(block, (frag) => {
		if (frag.leaving) leaving = frag;
	});
	return leaving;
}
function awaitLeavingRootImpl(block, cb) {
	const leavingFrag = findLeavingFragment(block);
	if (!leavingFrag) return descendToLeavingRoot(block, cb);
	const root = findTransitionBlock(leavingFrag.nodes);
	const running = root && (root instanceof Element ? removingLeave(root) : root.$transition);
	if (!running) return false;
	chainAfterLeave(running, cb, running.instance.vapor ? running.state : void 0);
	return true;
}
function descendToLeavingRoot(block, cb) {
	if (isArray(block)) {
		for (let i = 0; i < block.length; i++) {
			const b = block[i];
			if ((isArray(b) || isFragment(b)) && awaitLeavingRootImpl(b, cb)) return true;
		}
		return false;
	}
	if (!isFragment(block)) return false;
	if (!block.getContent) return descendToLeavingRoot(block.nodes, cb);
	if (isInteropEnabled && block.awaitLeavingRoot && block.awaitLeavingRoot(cb)) return true;
	const content = block.getContent();
	return awaitLeavingRootImpl(content, cb) || block.nodes !== content && awaitLeavingRootImpl(block.nodes, cb);
}
function chainAfterLeave(hooks, cb, state) {
	if (state) state.isLeaving = true;
	const prevAfterLeave = hooks.afterLeave;
	hooks.afterLeave = () => {
		if (state) state.isLeaving = false;
		if (prevAfterLeave) prevAfterLeave();
		cb();
	};
}
function removeBranchWithLeaveImpl(frag, transition, parent, render, key, noScope, branchKey) {
	const mode = transition.mode;
	const emptySlotRoot = !render && !!(frag.__vf & 2048);
	const persisted = isVaporSlotOutlet(frag) ? resolveOutletLeaveImpl(frag, frag.nodes, transition) : transition.persisted;
	if (mode && ownsMode(transition, frag) && !persisted && (mode !== "in-out" || render || emptySlotRoot) && (mode !== "out-in" || isValidBlock(frag.nodes))) {
		const instance = currentInstance;
		let enterHooks = transition;
		if (mode === "in-out" && render) enterHooks = frag.$transition = extend$1({}, transition);
		let own;
		const afterLeave = () => {
			const current = frag.pending === own;
			if (current) frag.leaving = false;
			if (transition.state.isUnmounting) return;
			const pending = current ? frag.pending : void 0;
			if (pending) frag.nodes = EMPTY_BLOCK;
			let outer;
			collectTransitionBlocks$1(transition.state.root, (f) => {
				const pending = f.pending;
				if (!pending || f === frag || f.leaving) return;
				if (outer || pending.key === pending.prevKey) f.pending = void 0;
				else outer = f;
			}, [], void 0);
			if (outer) {
				const target = outer;
				const { render, key, noScope, branchKey, prevKey } = target.pending;
				target.pending = void 0;
				if (current) frag.pending = void 0;
				target.current = prevKey;
				runWithRenderCtx(target, () => target.update(render, key, noScope, branchKey));
				return;
			}
			if (!pending) return;
			const liveParent = frag.anchor.parentNode;
			if (!liveParent) return;
			const prevInstance = setCurrentInstance(instance);
			try {
				frag.pending = void 0;
				frag.renderBranch(pending.render, transition, liveParent, pending.key, pending.noScope, true, void 0, pending.branchKey);
			} finally {
				restoreCurrentInstance(prevInstance);
			}
		};
		if (applyTransitionLeaveHooksImpl(frag.nodes, enterHooks, afterLeave, emptySlotRoot && (mode === "out-in" || mode === "in-out"), frag) && mode === "out-in") {
			frag.leaving = true;
			frag.pending = own = {
				render,
				key,
				noScope,
				branchKey
			};
			remove(frag.nodes, parent);
			if (emptySlotRoot) frag.slotBoundary.markDirty();
			return true;
		}
	}
	return false;
}
const ROOT_KEY_CONTEXT = { key: void 0 };
const keyContexts = /* @__PURE__ */ new WeakMap();
const KEY_CONTEXT_OWNER = 34;
function transitionTypeOf(block) {
	return isAsyncComponentEnabled && block.type.__asyncResolved || block.type;
}
function enterSlotKeyContext(ctx, outlet, fallback) {
	if (ctx.type) return ctx;
	const name = outlet && outlet.slotName;
	if (name === void 0 && !fallback) return ctx;
	return {
		key: ownKey(ctx, (name === void 0 ? "" : "_" + name) + (fallback ? "_fb" : "")),
		slot: true
	};
}
function ownKey(ctx, key) {
	return key == null ? ctx.key : ctx.slot ? ctx.key + String(key) : key;
}
function withDefaultKey(ctx, key) {
	return ctx.type || key == null ? ctx : {
		key: ownKey(ctx, key),
		slot: ctx.slot
	};
}
function isUnresolvedAsyncWrapper(block) {
	return isAsyncComponentEnabled && isAsyncWrapper(block) && getAsyncWrapperInner(block) === void 0;
}
function enterComponentKeyContext(ctx, block, unresolved = isUnresolvedAsyncWrapper(block)) {
	if (ctx.type) return ctx;
	return unresolved ? withDefaultKey(ctx, block.$key) : {
		key: ownKey(ctx, block.$key),
		type: transitionTypeOf(block)
	};
}
function enterFragmentKeyContext(frag, ctx, key = getFragmentKey(frag)) {
	if (frag.__vf & KEY_CONTEXT_OWNER) keyContexts.set(frag, ctx);
	return withDefaultKey(ctx, key);
}
function resolveChildIdentity(child, ctx) {
	transitionKeys.set(child, ctx.type ? ctx.key : ownKey(ctx, child.$key));
	if (ctx.type) setTransitionType(child, ctx.type);
}
/**
* Resolve the transition child of `block` together with its identity.
* `owner` is the fragment whose content `block` is.
*/
function resolveTransitionBlock(block, onFragment, owner) {
	const ctx = owner ? withDefaultKey(keyContexts.get(owner) || ROOT_KEY_CONTEXT, getFragmentKey(owner)) : ROOT_KEY_CONTEXT;
	const children = [];
	collectTransitionBlocks$1(block, onFragment, children, enterSlotKeyContext(ctx, owner, isSlotFallbackBlock(block)));
	return children[0];
}
/** Locate the transition child of `block` without touching its identity. */
function findTransitionBlock(block, onFragment) {
	const children = [];
	collectTransitionBlocks$1(block, onFragment, children, void 0);
	return children[0];
}
function collectTransitionBlocks$1(block, onFragment, children, ctx) {
	if (block instanceof Node) {
		if (block instanceof Element) {
			children.push(block);
			if (ctx) resolveChildIdentity(block, ctx);
		}
	} else if (isVaporComponent(block)) collectComponentTransitionBlocks(block, onFragment, children, ctx);
	else if (isArray(block)) collectArrayTransitionBlocks(block, onFragment, children, ctx);
	else if (isFragment(block)) collectFragmentTransitionBlocks(block, onFragment, children, ctx);
}
function collectComponentTransitionBlocks(block, onFragment, children, ctx) {
	if (isKeepAliveEnabled && isKeepAlive(block)) {
		collectTransitionBlocks$1(block.block, onFragment, children, ctx);
		return;
	}
	const async = isAsyncComponentEnabled && isAsyncWrapper(block);
	const inner = async ? getAsyncWrapperInner(block) : void 0;
	if (ctx) ctx = enterComponentKeyContext(ctx, block, async && inner === void 0);
	if (async) {
		if (inner === void 0) {
			if (isFragment(block.block)) {
				if (onFragment) onFragment(block.block);
				if (ctx) keyContexts.set(block.block, ctx);
			}
			return;
		}
		collectTransitionBlocks$1(inner, onFragment, children, ctx);
		return;
	}
	if (isVaporTransition(block.type)) return;
	collectTransitionBlocks$1(block.block, onFragment, children, ctx);
}
function collectArrayTransitionBlocks(block, onFragment, children, ctx) {
	let hasFound = false;
	for (const c of block) {
		if (c instanceof Comment) continue;
		const nested = [];
		collectTransitionBlocks$1(c, onFragment, nested, ctx);
		if (!nested.length) continue;
		if (hasFound) {
			if (!!(process.env.NODE_ENV !== "production")) warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
			break;
		}
		children.push(nested[0]);
		hasFound = true;
	}
}
function collectFragmentTransitionBlocks(block, onFragment, children, ctx) {
	if (isInteropEnabled && block.hasVDOMContent && block.hasVDOMContent()) {
		children.push(block);
		if (ctx) {
			resolveChildIdentity(block, ctx);
			if (!ctx.type) {
				const type = block.getTransitionType();
				if (type !== void 0) setTransitionType(block, type);
			}
		}
		return;
	}
	if (onFragment) onFragment(block);
	let contentCtx = ctx && enterFragmentKeyContext(block, ctx);
	if (contentCtx && isSlotOutletFragment(block)) contentCtx = enterSlotKeyContext(contentCtx, block, isSlotFallbackBlock(block.nodes));
	collectTransitionBlocks$1(block.nodes, onFragment, children, contentCtx);
}
function isValidTransitionBlock(block) {
	return block instanceof Element || !!(isInteropEnabled && isFragment(block) && block.hasVDOMContent && block.hasVDOMContent());
}
function getTransitionElement(block) {
	if (block instanceof Element) return block;
	if (isInteropEnabled && isFragment(block) && block.getTransitionElement) return block.getTransitionElement();
}
//#endregion
//#region packages/runtime-vapor/src/refCleanup.ts
/**
* Stores ref cleanup functions keyed by the element/component they are set on.
* Shared between apiTemplateRef.ts (writes) and KeepAlive deactivate (reads).
*/
const refCleanups = /* @__PURE__ */ new WeakMap();
function invalidatePendingRef(el) {
	const c = refCleanups.get(el);
	if (c && c.job) {
		c.job.flags = c.job.flags | 4;
		c.job = void 0;
	}
}
/**
* Synchronously clear the ref for an element being deactivated by KeepAlive.
* In VDOM core, refs are cleared during unmount before the deactivation check.
* Since Vapor's KeepAlive retains scopes (skipping onScopeDispose), we need
* this explicit sync cleanup path.
*/
function unsetRef(el) {
	invalidatePendingRef(el);
	const c = refCleanups.get(el);
	if (c) c.fn();
}
const VaporKeepAlive = /*@__PURE__*/ withKeepAliveEnabled(/* @__PURE__ */ defineVaporComponent({
	name: "VaporKeepAlive",
	__isKeepAlive: true,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number],
		matchBy: {
			type: String,
			default: "name"
		},
		cache: Object
	},
	setup(props, { slots, expose }) {
		let exposed;
		expose(exposed);
		if (!slots.default) return;
		const keepAliveInstance = currentInstance;
		const cache = /* @__PURE__ */ new Map();
		const keys = /* @__PURE__ */ new Set();
		const externalCache = props.cache;
		const externalCacheState = externalCache ? {
			keyByEntry: /* @__PURE__ */ new WeakMap(),
			entryByKey: /* @__PURE__ */ new Map()
		} : void 0;
		const storageContainer = /* @__PURE__ */ createElement("div");
		const keptAliveScopes = /* @__PURE__ */ new Map();
		const resolveCacheKeyFromBlock = (block, interop, branchKey) => {
			var _ref6, _$key2;
			if (props.matchBy === "key") {
				var _ref3, _$key;
				if (interop && isInteropEnabled) {
					var _ref, _ref2, _key;
					const frag = block;
					return (_ref = (_ref2 = (_key = frag.vnode.key) !== null && _key !== void 0 ? _key : branchKey) !== null && _ref2 !== void 0 ? _ref2 : frag.$key) !== null && _ref !== void 0 ? _ref : frag.vnode.type;
				}
				return (_ref3 = (_$key = block.$key) !== null && _$key !== void 0 ? _$key : branchKey) !== null && _ref3 !== void 0 ? _ref3 : block.type;
			}
			if (interop && isInteropEnabled) {
				var _ref4, _ref5, _frag$$key;
				const frag = block;
				return (_ref4 = (_ref5 = (_frag$$key = frag.$key) !== null && _frag$$key !== void 0 ? _frag$$key : frag.vnode.key) !== null && _ref5 !== void 0 ? _ref5 : branchKey) !== null && _ref4 !== void 0 ? _ref4 : frag.vnode.type;
			}
			return (_ref6 = (_$key2 = block.$key) !== null && _$key2 !== void 0 ? _$key2 : branchKey) !== null && _ref6 !== void 0 ? _ref6 : block.type;
		};
		let current;
		let rootFragment;
		if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
			keepAliveInstance.__v_cache = cache;
			keepAliveInstance.__v_keptAliveScopes = keptAliveScopes;
		}
		const addCacheKey = (key) => {
			const { max } = props;
			keys.add(key);
			if (max && keys.size > parseInt(max, 10)) pruneCacheEntry(keys.values().next().value);
		};
		const innerCacheBlock = (key, block, isCurrent) => {
			if (cache.has(key)) {
				if (isCurrent) {
					keys.delete(key);
					keys.add(key);
				}
			} else addCacheKey(key);
			cache.set(key, block);
			if (externalCache && externalCacheState) {
				const entry = getExternalCacheEntry(block);
				const previousEntry = externalCacheState.entryByKey.get(key);
				if (previousEntry && previousEntry !== entry) externalCacheState.keyByEntry.delete(previousEntry);
				externalCache.set(key, entry);
				externalCacheState.keyByEntry.set(entry, key);
				externalCacheState.entryByKey.set(key, entry);
			}
			if (isCurrent) current = block;
		};
		const cacheBlock = (block = keepAliveInstance.block) => {
			if (isDynamicFragment(block)) {
				const transition = block.$transition;
				if (isVaporTransitionHooks(transition) && transition.mode === "out-in" && transition.state.isLeaving) return;
			}
			const [innerBlock, interop, branchKey] = getInnerBlock(block);
			if (!innerBlock) return;
			const cacheKey = resolveCacheKeyFromBlock(innerBlock, interop, branchKey);
			if (!shouldCache(innerBlock, props, interop)) {
				if (cache.has(cacheKey)) pruneCacheEntry(cacheKey);
				return;
			}
			setShapeFlag(innerBlock, interop, cache.has(cacheKey));
			const { currentBlock, currentKey } = getCurrentBlockState();
			innerCacheBlock(cacheKey, innerBlock, currentBlock === innerBlock || currentKey === cacheKey);
		};
		const processShapeFlag = (block, requireKeptAlive = false) => {
			const [innerBlock, interop, branchKey] = getInnerBlock(block);
			if (!innerBlock || requireKeptAlive && !isKeptAlive(innerBlock, interop) || !shouldCache(innerBlock, props, interop)) return false;
			const cacheKey = resolveCacheKeyFromBlock(innerBlock, interop, branchKey);
			setShapeFlag(innerBlock, interop, cache.has(cacheKey));
			return cacheKey;
		};
		const pruneCache = (filter) => {
			cache.forEach((cached, key) => {
				const instance = getInstanceFromCache(cached);
				if (!instance) return;
				const name = getComponentName(isAsyncWrapper(instance) ? instance.type.__asyncResolved || {} : instance.type);
				if (name && !filter(name)) pruneCacheEntry(key);
			});
		};
		const deleteScope = (key) => {
			const scope = keptAliveScopes.get(key);
			if (scope) {
				keptAliveScopes.delete(key);
				for (const [k, s] of keptAliveScopes) if (s === scope) {
					keptAliveScopes.delete(k);
					break;
				}
			}
			return scope;
		};
		const cacheScope = (cacheKey, scopeLookupKey, scope) => {
			const prevScope = keptAliveScopes.get(cacheKey);
			if (prevScope && prevScope !== scope) {
				const staleScope = deleteScope(cacheKey);
				if (staleScope) staleScope.stop();
			}
			keptAliveScopes.set(cacheKey, scope);
			if (scopeLookupKey !== cacheKey) keptAliveScopes.set(scopeLookupKey, scope);
		};
		const pruneCacheEntry = (key) => {
			const cached = cache.get(key);
			if (cached && (!current || cached !== current)) {
				unsetShapeFlag(cached);
				const parentNode = findBlockBoundary(cached).parentNode;
				if (parentNode) remove(cached, parentNode);
			} else if (current) unsetShapeFlag(current);
			cache.delete(key);
			keys.delete(key);
			const externalEntry = externalCacheState ? externalCacheState.entryByKey.get(key) : void 0;
			if (externalCache && externalEntry && externalCache.get(key) === externalEntry) externalCache.delete(key);
			if (externalEntry && externalCacheState) {
				externalCacheState.entryByKey.delete(key);
				externalCacheState.keyByEntry.delete(externalEntry);
			}
			const scope = deleteScope(key);
			if (scope) scope.stop();
		};
		const pruneExternalCacheEntry = externalCache && externalCacheState ? (cached) => {
			if (!externalCacheState.keyByEntry.has(cached)) return;
			pruneCacheEntry(externalCacheState.keyByEntry.get(cached));
		} : void 0;
		if (externalCache && pruneExternalCacheEntry) externalCache.pruneCacheEntry = pruneExternalCacheEntry;
		watch(() => [props.include, props.exclude], ([include, exclude]) => {
			include && pruneCache((name) => matches(include, name));
			exclude && pruneCache((name) => !matches(exclude, name));
			cacheBlock();
		}, {
			flush: "post",
			deep: true
		});
		onMounted(cacheBlock);
		onUpdated(cacheBlock);
		const getCurrentBlockState = () => {
			const block = keepAliveInstance.block;
			const [currentBlock, interop, branchKey] = getInnerBlock(block);
			return {
				currentBlock,
				interop,
				currentKey: currentBlock && resolveCacheKeyFromBlock(currentBlock, interop, branchKey)
			};
		};
		onBeforeUnmount(() => {
			const { currentBlock, interop, currentKey } = getCurrentBlockState();
			const deactivateCached = (cached) => {
				unsetShapeFlag(cached);
				const instance = getInstanceFromCache(cached);
				if (instance) {
					if (instance.bda) invokeArrayFns(instance.bda);
					const da = instance.da;
					da && queuePostRenderEffect(da, void 0, keepAliveInstance.suspense);
				}
			};
			let matched = false;
			cache.forEach((cached, key) => {
				if (currentKey === key) {
					matched = true;
					deactivateCached(cached);
					return;
				}
				unsetShapeFlag(cached);
				const parentNode = findBlockBoundary(cached).parentNode;
				remove(cached, parentNode || void 0);
			});
			if (!matched && currentBlock && isKeptAlive(currentBlock, interop)) deactivateCached(currentBlock);
			keptAliveScopes.forEach((scope) => scope.stop());
			keptAliveScopes.clear();
			cache.clear();
			keys.clear();
			if (externalCache && externalCacheState) {
				externalCacheState.entryByKey.forEach((_entry, key) => {
					externalCache.delete(key);
				});
				externalCacheState.entryByKey.clear();
				if (externalCache.pruneCacheEntry === pruneExternalCacheEntry) externalCache.pruneCacheEntry = void 0;
			}
		});
		const keepAliveCtx = {
			getStorageContainer: () => storageContainer,
			getCachedComponent: (comp, key) => {
				if (isInteropEnabled && isVNode(comp)) {
					var _ref7, _comp$key;
					return cache.get((_ref7 = (_comp$key = comp.key) !== null && _comp$key !== void 0 ? _comp$key : currentCacheKey) !== null && _ref7 !== void 0 ? _ref7 : comp.type);
				}
				const branchKey = key !== null && key !== void 0 ? key : currentCacheKey;
				return branchKey != null ? cache.get(branchKey) : cache.get(comp) || cache.get(comp.__asyncResolved);
			},
			activate: (instance, parentNode, anchor, parentSuspense) => {
				current = instance;
				activate$1(instance, parentNode, anchor, parentSuspense);
			},
			deactivate: (instance, parentSuspense) => {
				current = void 0;
				deactivate$1(instance, storageContainer, parentSuspense);
			},
			prepareBranchRemoval(frag, scope, prevKey) {
				if (frag !== rootFragment) {
					scope.stop();
					return false;
				}
				const fragKey = getFragmentKey(frag);
				const cacheKey = withCurrentCacheKey(fragKey, () => processShapeFlag(frag.nodes, true));
				if (cacheKey === false) {
					scope.stop();
					return false;
				}
				if (isDynamicFragment(frag.nodes)) {
					scope.stop();
					return true;
				}
				scope.pause();
				cacheScope(cacheKey, fragKey !== null && fragKey !== void 0 ? fragKey : prevKey, scope);
				return true;
			},
			runBranchRender(frag, fn, useScope, removePrevious) {
				const fragKey = getFragmentKey(frag);
				const cachedScope = useScope ? deleteScope(fragKey !== null && fragKey !== void 0 ? fragKey : frag.current) : void 0;
				frag.scope = useScope ? cachedScope || new EffectScope() : void 0;
				if (cachedScope) cachedScope.resume();
				let incomingCacheKey = false;
				const run = () => {
					try {
						fn();
					} finally {
						incomingCacheKey = processShapeFlag(frag.nodes);
					}
				};
				try {
					withCurrentCacheKey(fragKey, run);
					if (removePrevious && incomingCacheKey !== false && !cache.has(incomingCacheKey)) addCacheKey(incomingCacheKey);
				} finally {
					if (removePrevious) removePrevious();
				}
			},
			processShapeFlag,
			cacheBlock
		};
		if (isInteropEnabled) keepAliveCtx.clearCurrent = (block) => {
			if (current === block) current = void 0;
		};
		keepAliveInstance.ctx = keepAliveCtx;
		let children = slots.default();
		rootFragment = registerDynamicFragmentHooks(children, keepAliveCtx);
		if (isArray(children)) {
			children = children.filter((child) => !(child instanceof Comment));
			if (children.length === 1) rootFragment = registerDynamicFragmentHooks(children[0], keepAliveCtx);
			if (children.length > 1) {
				if (!!(process.env.NODE_ENV !== "production")) warn(`KeepAlive should contain exactly one component child.`);
				return children;
			}
		}
		return children;
	}
}));
function registerDynamicFragmentHooks(block, keepAliveCtx) {
	if (!isDynamicFragment(block)) return;
	(block.u || (block.u = [])).unshift(() => {
		const transition = block.$transition;
		if (isVaporTransitionHooks(transition) && transition.mode === "out-in") keepAliveCtx.cacheBlock(block);
	});
	return block;
}
const shouldCache = (block, props, interop = false) => {
	const isAsync = isAsyncWrapper(interop ? block.vnode : block);
	const type = interop && isInteropEnabled ? block.vnode.type : block.type;
	if (isAsync && !type.__asyncResolved) return !props.include;
	const { include, exclude } = props;
	const name = getComponentName(isAsync ? type.__asyncResolved : type);
	return !(include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name));
};
function setShapeFlag(block, interop, cached) {
	if (interop && isInteropEnabled) {
		if (cached) block.vnode.shapeFlag |= 512;
		block.vnode.shapeFlag |= 256;
	} else {
		if (cached) block.shapeFlag |= 512;
		block.shapeFlag |= 256;
	}
}
const unsetShapeFlag = (cached) => {
	if (isVaporComponent(cached)) {
		resetShapeFlag(cached);
		if (isAsyncComponentEnabled && isAsyncWrapper(cached)) {
			const [inner] = getInnerBlock(cached.block);
			if (inner && isVaporComponent(inner)) resetShapeFlag(inner);
		}
	} else if (isInteropEnabled) {
		const vnode = cached.vnode;
		resetShapeFlag(vnode);
		if (isVaporComponent(vnode.component)) unsetShapeFlag(vnode.component);
	}
};
function isKeptAlive(cached, interop) {
	if (interop && isInteropEnabled && isInteropFragment(cached)) return !!(cached.vnode.shapeFlag & 256);
	return !!(cached.shapeFlag & 256);
}
function getInnerBlock(block, branchKey = currentCacheKey) {
	if (isVaporComponent(block)) return [
		block,
		false,
		branchKey
	];
	else if (isInteropEnabled && isInteropFragment(block)) {
		const vnode = block.vnode;
		return vnode && vnode.shapeFlag & 132 ? [
			block,
			true,
			branchKey
		] : [
			void 0,
			false,
			branchKey
		];
	} else if (isFragment(block)) {
		var _getFragmentKey;
		return getInnerBlock(block.nodes, (_getFragmentKey = getFragmentKey(block)) !== null && _getFragmentKey !== void 0 ? _getFragmentKey : branchKey);
	}
	return [
		void 0,
		false,
		branchKey
	];
}
function getInstanceFromCache(cached) {
	if (isVaporComponent(cached)) return cached;
	if (isInteropEnabled) return cached.vnode.component;
}
function getExternalCacheEntry(block) {
	return isInteropFragment(block) && block.vnode ? block.vnode : block;
}
function activate$1(instance, parentNode, anchor, parentSuspense = instance.suspense) {
	if (instance.ba) {
		const isDeactivated = instance.isDeactivated;
		instance.isDeactivated = false;
		invokeArrayFns(instance.ba);
		instance.isDeactivated = isDeactivated;
	}
	const inputScope = instance.inputScope;
	if (inputScope) inputScope.resume();
	move(instance, parentNode, anchor, 0, instance, parentSuspense);
	queuePostRenderEffect(() => {
		instance.isDeactivated = false;
		if (instance.a) invokeArrayFns(instance.a);
	}, void 0, parentSuspense);
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentAdded(instance);
}
function deactivate$1(instance, container, parentSuspense = instance.suspense) {
	if (instance.bda) invokeKeepAliveHooks(instance.bda);
	const inputScope = instance.inputScope;
	if (inputScope) inputScope.pause();
	unsetRef(instance);
	invalidateMount(instance.m);
	invalidateMount(instance.a);
	move(instance, container, null, 1, instance, parentSuspense);
	queuePostRenderEffect(() => {
		if (instance.bda) resetKeepAliveHookState(instance.bda);
		if (instance.da) invokeArrayFns(instance.da);
		instance.isDeactivated = true;
	}, void 0, parentSuspense);
	if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) devtoolsComponentAdded(instance);
}
//#endregion
//#region packages/runtime-vapor/src/vdomInterop.ts
const EMPTY_VNODES = EMPTY_ARR;
function getRawTransitionChild(vnode) {
	if (!vnode) return;
	const children = getTransitionRawChildren([vnode]);
	return children.length === 1 ? children[0] : void 0;
}
function getVaporInstance(vnode) {
	return vnode.component;
}
function prepareInteropSlotTransition(frag, vnode, previous, resumeAfterLeave, delayedLeaveSource) {
	const transition = frag.$transition;
	if (transition && !isVaporTransitionHooks(transition)) {
		setTransitionHooks(vnode, transition.clone(vnode));
		return;
	}
	if (transition && transition.applyGroup) return;
	if (!transition) return;
	return prepareTransitionSwitch(previous, resolveTransitionChild([vnode], true), transition.props, transition.state, transition.instance, resumeAfterLeave, delayedLeaveSource || transition) || createCommentVNode();
}
function applyVaporSlotTransition(vnode, block, refresh) {
	const hooks = vnode.transition;
	if (isVaporTransitionHooks(hooks) && !(refresh && hooks.state.isLeaving)) {
		ensureTransitionHooksRegistered();
		hooks.state.root = block;
		return applyTransitionHooksImpl(block, hooks, void 0, refresh);
	}
}
function forwardLeaveHandoff(hooks, from, markLeaving) {
	hooks.afterLeave = from.afterLeave;
	const delayLeave = from.delayLeave;
	hooks.delayLeave = delayLeave && markLeaving ? (el, earlyRemove, delayedLeave) => {
		delayLeave(el, earlyRemove, delayedLeave);
		markLeaving();
	} : delayLeave;
	return hooks;
}
function markLeavingVNode(vnode, state) {
	const { leavingNodes } = state;
	let nodes = leavingNodes.get(vnode.type);
	if (!nodes) {
		nodes = Object.create(null);
		leavingNodes.set(vnode.type, nodes);
	}
	nodes[String(vnode.key)] = vnode;
}
function getInteropTransitionType(vnode) {
	const child = getRawTransitionChild(vnode);
	return child && child.type;
}
function vnodeKeyOf(vnode) {
	var _vnode$key;
	return (_vnode$key = vnode.key) !== null && _vnode$key !== void 0 ? _vnode$key : void 0;
}
function getVNodeKey(vnode) {
	const child = getRawTransitionChild(vnode);
	return child && vnodeKeyOf(child);
}
function getInteropTransitionElement(vnode) {
	if (!vnode) return;
	const component = vnode.component;
	if (isVaporComponent(component)) {
		const block = component.block && findTransitionBlock(component.block);
		return block && getTransitionElement(block);
	}
	if (vnode.el instanceof Element) return vnode.el;
	if (component) return getInteropTransitionElement(component.subTree);
	if (vnode.type === Fragment) {
		const child = getRawTransitionChild(vnode);
		if (child) return getInteropTransitionElement(child);
	} else if (vnode.shapeFlag & 64 && isArray(vnode.children)) {
		const child = resolveTransitionChild(vnode.children);
		if (child) return getInteropTransitionElement(child);
	}
}
function interopRawProps(vnode) {
	const rawProps = {};
	const props = vnode.props;
	for (const key in props) if (!isReservedProp(key)) rawProps[key] = props[key];
	rawProps[interopKey] = true;
	return rawProps;
}
const vaporInteropImpl = {
	applyCssVars(vnode, vars) {
		setVarsOnBlock(vnode.vb || getVaporInstance(vnode).block, vars);
	},
	mount(vnode, container, anchor, parentComponent, parentSuspense) {
		const selfAnchor = vnode.anchor = /* @__PURE__ */ createTextNode();
		vnode.el = selfAnchor;
		container.insertBefore(selfAnchor, anchor);
		const prev = currentInstance;
		simpleSetCurrentInstance(parentComponent);
		const rawProps = interopRawProps(vnode);
		const slotsRef = /* @__PURE__ */ shallowRef(normalizeInteropSlots(vnode.children));
		const rawSlots = createInteropRawSlots(slotsRef);
		const prevCtx = currentRenderContext;
		if (isSuspenseEnabled && parentSuspense) setRenderContext(deriveSuspense(prevCtx, parentSuspense));
		if (vnode.transition) ensureTransitionHooksRegistered();
		const instance = vnode.component = createComponent(vnode.type, rawProps, rawSlots, void 0, void 0, parentComponent ? parentComponent.appContext : vnode.appContext, true);
		instance.rawSlotsRef = slotsRef;
		instance.emitsOptions = normalizeEmitsOptions(instance.type);
		const vnodeHookState = ensureVNodeHookState(instance, vnode);
		setInteropComponentScopeIds(instance, vnode);
		if (parentComponent && isKeepAlive(parentComponent)) {
			enableKeepAlive();
			instance.shapeFlag = vnode.shapeFlag;
		}
		if (vnode.transition) (instance.bm || (instance.bm = [])).push(() => {
			const transition = vnodeHookState.vnode.transition;
			if (transition) relayTransitionHooks(instance.block, transition);
		});
		setRenderContext(prevCtx);
		const pendingSetup = isPendingInteropSetup(instance);
		const rootEl = !pendingSetup && resolveInteropRootEl(instance);
		if (rootEl) vnode.el = rootEl;
		const asyncWrapper = isAsyncWrapper(vnode);
		const vnodeHooks = asyncWrapper ? null : vnode.props;
		if (pendingSetup || vnode.dirs || vnodeHooks && vnodeHooks.onVnodeBeforeMount) registerAfterInteropSetup(instance, pendingSetup, () => {
			(instance.bm || (instance.bm = [])).push(() => {
				const mountVNode = vnodeHookState.vnode;
				const hooks = asyncWrapper ? null : mountVNode.props;
				if (pendingSetup) {
					const rootEl = resolveInteropRootEl(instance);
					if (rootEl) mountVNode.el = rootEl;
					const mountedHook = hooks && hooks.onVnodeMounted;
					if (mountedHook) (instance.m || (instance.m = [])).push(() => invokeInteropVNodeHook(instance, mountedHook, mountVNode));
				}
				invokeInteropVNodeHook(instance, hooks && hooks.onVnodeBeforeMount, mountVNode);
				if (!mountVNode.dirs) return;
				const [owner, el] = resolveInteropDirsRoot(instance, vnodeHookState, instance, getInteropDirsOwner(vnodeHookState, instance, mountVNode));
				if (el) {
					mountInteropDirsRoot(instance, owner, el);
					mountVNode.el = el;
				} else if (!!(process.env.NODE_ENV !== "production") && !isPendingInteropDirsRoot(owner.comp)) warnNonElementRootDirs();
			});
			if (vnodeHookState.vnode.dirs) (instance.bum || (instance.bum = [])).push(() => unmountInteropDirs(instance, vnodeHookState, instance));
		});
		mountComponent(instance, container, selfAnchor);
		if (!pendingSetup) queueInteropVNodeHook(instance, vnodeHooks && vnodeHooks.onVnodeMounted, vnode, parentSuspense);
		simpleSetCurrentInstance(prev);
		return instance;
	},
	update(n1, n2, shouldUpdate) {
		n2.component = n1.component;
		n2.el = n1.el;
		n2.anchor = n1.anchor;
		const instance = getVaporInstance(n2);
		const vnodeHookState = ensureVNodeHookState(instance, n2);
		if (shouldUpdate) {
			const rootEl = getRootElement(instance);
			if (rootEl) n2.el = rootEl;
			if (n2.transition && instance.block) {
				ensureTransitionHooksRegistered();
				relayTransitionHooks(instance.block, n2.transition);
			}
			updateInteropVNode(instance, vnodeHookState, n2, n1);
		}
	},
	unmount(vnode, doRemove, parentSuspense) {
		if (isSuspenseEnabled && currentUnmountSuspense !== parentSuspense) {
			runWithUnmountSuspense(parentSuspense, () => vaporInteropImpl.unmount(vnode, doRemove, parentSuspense));
			return;
		}
		const container = doRemove ? vnode.anchor.parentNode : void 0;
		const instance = getVaporInstance(vnode);
		let slotStartAnchor = null;
		if (instance) {
			const anchor = vnode.anchor;
			const vnodeHooks = isAsyncWrapper(vnode) ? null : vnode.props;
			invokeInteropVNodeHook(instance, vnodeHooks && vnodeHooks.onVnodeBeforeUnmount, vnode);
			if (instance.block) {
				if (!doRemove && vnode.transition) {
					const child = findTransitionBlock(instance.block, (fragment) => {
						if (fragment.$transition === vnode.transition) fragment.$transition = void 0;
					});
					if (child && child.$transition === vnode.transition) child.$transition = void 0;
				}
				unmountComponent(instance, container, parentSuspense);
				if (!doRemove) {
					const blockContainer = !vnode.transition && needsHostParentForRemove(instance.block) ? anchor && anchor.parentNode : void 0;
					remove(instance.block, blockContainer);
				}
			} else {
				unmountComponent(instance, container, parentSuspense);
				if (!doRemove) instance.pendingBlock = void 0;
			}
			queueInteropVNodeHook(instance, vnodeHooks && vnodeHooks.onVnodeUnmounted, vnode, parentSuspense);
		} else if (vnode.vb) {
			const anchor = vnode.anchor;
			if (vnode.el && vnode.el !== anchor) slotStartAnchor = vnode.el;
			const blockContainer = container || (needsHostParentForRemove(vnode.vb) ? anchor && anchor.parentNode : void 0);
			const transition = vnode.transition;
			const child = transition && findTransitionBlock(vnode.vb);
			const hooks = child && child.$transition;
			if (hooks) forwardLeaveHandoff(hooks, transition, child instanceof Element ? () => markLeavingBlock(child, hooks.state) : void 0);
			stopVaporSlotScope(vnode);
			remove(vnode.vb, blockContainer);
			if (hooks && isVaporTransitionHooks(transition)) {
				const record = transition.state.leavingNodes.get(vnode.type);
				const key = String(vnode.key);
				if (record && record[key] === vnode) delete record[key];
			}
		}
		if (doRemove) {
			if (slotStartAnchor) {
				const parent = slotStartAnchor.parentNode;
				if (parent) remove(slotStartAnchor, parent);
			}
			const anchor = vnode.anchor;
			const parent = anchor.parentNode;
			if (parent) remove(anchor, parent);
		}
	},
	/**
	* vapor slot in vdom
	*/
	slot(n1, n2, container, anchor, parentComponent, parentSuspense, slotScopeIds) {
		if (!n1) {
			const slotBlock = renderVaporSlot(n2, parentComponent, parentSuspense, slotScopeIds);
			const selfAnchor = (isFragment(slotBlock) ? slotBlock.anchor : void 0) || /* @__PURE__ */ createTextNode();
			insert(n2.el = /* @__PURE__ */ createTextNode(), container, anchor);
			insert(n2.anchor = selfAnchor, container, anchor);
			applyVaporSlotTransition(n2, n2.vb = slotBlock);
			insert(slotBlock, container, selfAnchor, parentSuspense);
		} else if (!n1.vs || !n2.vs || !n1.vs.slot || !n2.vs.slot || n2.vs.slot !== n1.vs.slot) {
			const selfAnchor = n1.anchor;
			const parent = selfAnchor.parentNode;
			const nextSibling = selfAnchor.nextSibling;
			const rangeStartAnchor = n1.el && n1.el !== selfAnchor ? n1.el : void 0;
			const oldBlockOwnsAnchor = isFragment(n1.vb) && n1.vb.anchor === selfAnchor;
			stopVaporSlotScope(n1);
			remove(n1.vb, parent);
			const slotBlock = renderVaporSlot(n2, parentComponent, parentSuspense, slotScopeIds);
			let newAnchor = isFragment(slotBlock) ? slotBlock.anchor : void 0;
			let insertAnchor = nextSibling;
			if (newAnchor) {
				if (!oldBlockOwnsAnchor) remove(selfAnchor, parent);
			} else if (oldBlockOwnsAnchor) newAnchor = /* @__PURE__ */ createTextNode();
			else {
				newAnchor = selfAnchor;
				insertAnchor = selfAnchor;
			}
			insert(n2.anchor = newAnchor, parent, insertAnchor);
			n2.el = rangeStartAnchor || newAnchor;
			applyVaporSlotTransition(n2, n2.vb = slotBlock);
			insert(slotBlock, parent, newAnchor, parentSuspense);
		} else {
			const vs1 = n1.vs;
			const vs2 = n2.vs;
			n2.el = n1.el;
			n2.anchor = n1.anchor;
			n2.vb = n1.vb;
			vs2.scope = vs1.scope;
			patchVdomSlot(parentComponent, () => {
				(vs2.ref = vs1.ref).value = vs2.props || n2.props;
				syncInteropVaporSlotState(n1, n2);
			});
			applyVaporSlotTransition(n2, n2.vb, true);
		}
	},
	move(vnode, container, anchor, moveType, parentSuspense) {
		const block = vnode.vb || vnode.component;
		const pendingRangeOwnsFragmentStart = isVaporComponent(block) && !!block.pendingBlock;
		if (vnode.el && vnode.el !== vnode.anchor && (vnode.vb || isRangeStart(vnode.el) && !pendingRangeOwnsFragmentStart)) move(vnode.el, container, anchor, moveType, void 0, parentSuspense);
		move(block, container, anchor, moveType, void 0, parentSuspense);
		move(vnode.anchor, container, anchor, moveType, void 0, parentSuspense);
	},
	hydrate(vnode, node, container, anchor, parentComponent, parentSuspense) {
		if (!isHydrating$1 && !isHydrating && !isHydratingEnabled) return node;
		let instance;
		hydrateNode(node, () => {
			instance = this.mount(vnode, container, anchor, parentComponent, parentSuspense);
		});
		claimUntrackedAnchor(vnode.anchor);
		if (instance && instance.asyncDep && !instance.asyncResolved) vnode.el = node;
		return anchor;
	},
	hydrateSlot(vnode, node, parentComponent, parentSuspense, slotScopeIds) {
		if (!isHydrating$1 && !isHydrating && !isHydratingEnabled) return node;
		const isFallbackRange = isComment(node, "(");
		const close = isFallbackRange ? locateEndAnchor(node) : isRangeEnd(node) ? node : isRangeStart(node) && node.nextSibling && isRangeEnd(node.nextSibling) ? node.nextSibling : null;
		if (close) {
			const ownsRange = close !== node;
			mountSlotWithoutHydration(vnode, ownsRange ? node : null, close, parentComponent, parentSuspense, slotScopeIds, isFallbackRange ? {
				depth: 0,
				first: node.nextSibling,
				close
			} : void 0);
			return ownsRange ? close.nextSibling : close;
		}
		const container = /* @__PURE__ */ parentNode(node);
		let createdAnchor = false;
		let resumeNode = null;
		hydrateNode(node, () => {
			const performAppear = vnode.transition ? hydrateTransitionImpl(parentSuspense) : void 0;
			vnode.vb = renderVaporSlot(vnode, parentComponent, parentSuspense, slotScopeIds);
			const hooks = applyVaporSlotTransition(vnode, vnode.vb);
			if (performAppear && hooks) performAppear(hooks);
			const fragmentAnchor = isFragment(vnode.vb) && vnode.vb.anchor;
			let anchor = fragmentAnchor || currentHydrationNode;
			const wrapped = isRangeStart(node) && isRangeEnd(anchor);
			if (!fragmentAnchor && !wrapped) {
				createdAnchor = true;
				resumeNode = anchor && /* @__PURE__ */ parentNode(anchor) === container ? anchor : null;
				anchor = /* @__PURE__ */ createTextNode();
				container.insertBefore(anchor, resumeNode);
			}
			if (isRangeStart(node) && isRangeEnd(anchor)) {
				vnode.el = node;
				vnode.anchor = anchor;
			} else vnode.anchor = vnode.el = anchor;
			if (!!(process.env.NODE_ENV !== "production") && !vnode.anchor) throw new Error(`Failed to locate slot anchor. this is likely a Vue internal bug.`);
		});
		if (createdAnchor) return resumeNode;
		return isRangeStart(node) ? vnode.anchor.nextSibling : vnode.anchor;
	},
	hydrateSlotOutlet(outlet, open, parentComponent, parentSuspense, slotScopeIds) {
		if (!isHydrating$1 && !isHydrating && !isHydratingEnabled) return open.nextSibling;
		return hydrateOutletFallback(outlet.children, open.nextSibling, locateEndAnchor(open), 0, parentComponent, parentSuspense, slotScopeIds);
	},
	attachSlotOutlet,
	setTransitionHooks(component, hooks) {
		ensureTransitionHooksRegistered();
		relayTransitionHooks(component.block, hooks);
	},
	getTransitionElement: getInteropTransitionElement,
	hasTransitionChild(vnode) {
		return !!findTransitionBlock(vnode.vb || getVaporInstance(vnode).block);
	},
	activate(vnode, container, anchor, parentComponent, parentSuspense) {
		const cached = parentComponent.ctx.getCachedComponent(vnode);
		vnode.el = cached.el;
		vnode.component = cached.component;
		vnode.anchor = cached.anchor;
		const instance = getVaporInstance(vnode);
		const vnodeHookState = ensureVNodeHookState(instance, vnode);
		const rootEl = getRootElement(instance);
		if (rootEl) vnode.el = rootEl;
		if (!!(process.env.NODE_ENV !== "production") && vnode.dirs && !rootEl) warnNonElementRootDirs();
		if (shouldUpdateComponent(cached, vnode)) updateInteropVNode(instance, vnodeHookState, vnode, cached);
		activate$1(instance, container, anchor, parentSuspense);
		insert(vnode.anchor, container, anchor);
		queueInteropVNodeHook(instance, vnode.props && vnode.props.onVnodeMounted, vnode, parentSuspense);
	},
	deactivate(vnode, container, parentSuspense) {
		const instance = getVaporInstance(vnode);
		deactivate$1(instance, container, parentSuspense);
		insert(vnode.anchor, container);
		queueInteropVNodeHook(instance, vnode.props && vnode.props.onVnodeUnmounted, vnode, parentSuspense);
	}
};
const vaporSlotPropsProxyHandler = {
	get(target, key) {
		return target.value[key];
	},
	has(target, key) {
		return key in target.value;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.value);
	},
	getOwnPropertyDescriptor(target, key) {
		if (hasOwn(target.value, key)) return {
			enumerable: true,
			configurable: true
		};
	}
};
const vaporSlotWrappersCache = /* @__PURE__ */ new WeakMap();
const vaporSlotsProxyHandler = {
	get(target, key) {
		const slot = isString(key) && !isInternalSlotKey(key) ? getSlot(target, key) : target[key];
		if (isFunction(slot)) {
			slot[rawVaporSlotKey] = slot;
			let wrappers = vaporSlotWrappersCache.get(target);
			if (!wrappers) vaporSlotWrappersCache.set(target, wrappers = /* @__PURE__ */ new Map());
			const cached = wrappers.get(key);
			if (cached && cached.slot === slot) return cached.wrapped;
			const wrapped = (props) => [renderSlot({ [key]: slot }, key, props)];
			wrapped[rawVaporSlotKey] = slot;
			wrapped._n = true;
			wrappers.set(key, {
				slot,
				wrapped
			});
			return wrapped;
		}
		return slot || Object.prototype[key];
	},
	ownKeys(target) {
		return Array.from(dynamicSlotsProxyHandlers.ownKeys(target)).filter((key) => isString(key) && !isInternalSlotKey(key));
	},
	getOwnPropertyDescriptor(target, key) {
		if (!isString(key) || isInternalSlotKey(key)) return;
		return dynamicSlotsProxyHandlers.getOwnPropertyDescriptor(target, key);
	}
};
let vdomHydrateNode;
function resolveVNodeRange(vnode) {
	const { type, shapeFlag, el, anchor } = vnode;
	if (shapeFlag & 64 && el && anchor && anchor !== el) return [el, anchor];
	if ((type === Static || type === Fragment) && anchor) return el && anchor !== el ? [el, anchor] : [anchor, anchor];
	if (shapeFlag & 6) {
		const subTree = vnode.component && vnode.component.subTree;
		if (subTree) return resolveVNodeRange(subTree);
	}
}
function resolveVNodeNodes(vnode, liveSlot) {
	if (vnode.component && isVaporComponent(vnode.component)) {
		const block = vnode.component.block;
		if (block) {
			const anchor = vnode.anchor;
			if (anchor) return [block, anchor];
			return block;
		}
	}
	if (vnode.type === VaporSlot && vnode.vb) {
		const { el, anchor, vb } = vnode;
		if (!anchor) return vb;
		return el && el !== anchor ? [
			el,
			vb,
			anchor
		] : [vb, anchor];
	}
	const vnodeRange = resolveVNodeRange(vnode);
	if (vnodeRange) {
		if (vnode.type === Fragment && vnodeRange[0] !== vnodeRange[1] && (liveSlot === void 0 ? hasVaporSlot(vnode) : liveSlot)) {
			const blocks = [vnodeRange[0]];
			const children = vnode.children;
			for (let i = 0; i < children.length; i++) blocks.push(resolveVNodeNodes(children[i]));
			blocks.push(vnodeRange[1]);
			return blocks;
		}
		const nodeRange = [];
		let n = vnodeRange[0];
		while (n) {
			nodeRange.push(n);
			if (n === vnodeRange[1]) break;
			n = n.nextSibling;
		}
		return nodeRange;
	}
	if (vnode.shapeFlag & 6) {
		const subTree = vnode.component && vnode.component.subTree;
		if (subTree) return resolveVNodeNodes(subTree);
	}
	return vnode.el;
}
function removeAttachedNodes(block, parent) {
	if (block instanceof Node) {
		if (block.parentNode === parent) remove(block, parent);
	} else if (isArray(block)) for (let i = 0; i < block.length; i++) removeAttachedNodes(block[i], parent);
}
function trackFragmentVNodeUpdates(frag, vnode, syncNodes) {
	const dirs = frag.vnode && frag.vnode.dirs;
	const vShow = dirs && dirs.find((binding) => binding.dir === interopVShow && binding.value.frag === frag);
	if (vShow && (!vnode.dirs || !vnode.dirs.includes(vShow))) vnode.dirs = vnode.dirs ? vnode.dirs.concat(vShow) : [vShow];
	vnode.ibu = () => {
		if (frag.bu) frag.bu.forEach((hook) => hook());
	};
	vnode.iu = () => {
		syncNodes();
		if (frag.u) frag.u.forEach((hook) => hook(frag.nodes));
	};
}
const vShowMountPending = Symbol("vShowMountPending");
function isInteropVShowPending(el) {
	return !!(el[vShowMountPending] & 1);
}
const interopVShow = {
	beforeMount(el, { value: { frag, apply } }, { shapeFlag, transition }) {
		if (shapeFlag & 1) {
			el[vShowMountPending] = 1;
			{
				const instance = frag.vnode.component;
				const suspense = instance ? instance.suspense : frag.getMountSuspense();
				if (suspense && suspense.pendingBranch) {
					const release = () => {
						el[vShowMountPending] &= -2;
					};
					release.flags = 8;
					queuePostRenderEffect(release, void 0, suspense);
				}
			}
		}
		frag.nodes = resolveVNodeNodes(frag.vnode);
		apply(el);
		if (shapeFlag & 1 && transition && transition.persisted && !el[vShowHidden]) {
			el[vShowMountPending] |= 2;
			transition.beforeEnter(el);
		}
	},
	mounted(el, _binding, { shapeFlag, transition }) {
		if (!(shapeFlag & 1)) return;
		const prepared = el[vShowMountPending] & 2;
		delete el[vShowMountPending];
		if (transition && transition.persisted && !el[vShowHidden]) {
			if (!prepared) transition.beforeEnter(el);
			transition.enter(el);
		}
	}
};
function setInteropVShow(frag, apply) {
	const vnode = frag.vnode;
	const dirs = vnode.dirs;
	if (dirs && dirs.some((binding) => binding.dir === interopVShow && binding.value.frag === frag)) return;
	const binding = {
		dir: interopVShow,
		instance: null,
		value: {
			frag,
			apply
		},
		oldValue: void 0,
		modifiers: EMPTY_OBJ
	};
	vnode.dirs = dirs ? dirs.concat(binding) : [binding];
	const instance = vnode.component;
	if (instance && !isVaporComponent(instance)) instance.subTree = cloneVShowRoot(instance.subTree, binding);
}
function cloneVShowRoot(vnode, binding) {
	const cloned = cloneVNode(vnode, null, false, true);
	if (!!(process.env.NODE_ENV !== "production") && vnode.patchFlag > 0 && vnode.patchFlag & 2048) {
		const children = vnode.children;
		const root = filterSingleRoot(children, false);
		if (root) {
			const child = cloneVShowRoot(root, binding);
			cloned.children = children.map((vnode) => vnode === root ? child : vnode);
			if (vnode.dynamicChildren) {
				cloned.dynamicChildren = vnode.dynamicChildren.map((vnode) => vnode === root ? child : vnode);
				cloned.dynamicChildren.hasOnce = vnode.dynamicChildren.hasOnce;
			}
			return cloned;
		}
	}
	cloned.dirs = cloned.dirs ? cloned.dirs.concat(binding) : [binding];
	const instance = cloned.component;
	if (instance) {
		if (isVaporComponent(instance)) ensureVNodeHookState(instance, cloned);
		else {
			instance.vnode = cloned;
			instance.subTree = cloneVShowRoot(instance.subTree, binding);
		}
	}
	return cloned;
}
/**
* Shared content cell for interop fragments. Hosts write the subset they
* own — do not read a field the host does not maintain (`valid` stays false
* where validity is derived live from the nodes; `nodes` stays EMPTY_BLOCK
* where the fragment's own `nodes` is the snapshot).
*
* `resolved` implements the optimistic-validity rule every interop fragment
* shares: nodes stay unresolved until the first sync (on insert / after
* patch), and validity reports true until then to keep a host boundary from
* mounting its fallback before the content exists. This keeps the common
* (valid) case free — an empty result is corrected later when the resolve
* path notifies the boundary to recheck; starting invalid would instead
* mount-then-teardown the fallback on every interop mount. Hydration starts
* resolved (SSR nodes exist).
*/
var InteropContentState = class {
	constructor() {
		this.nodes = EMPTY_BLOCK;
		this.valid = false;
		this.resolved = isHydrating$1;
	}
};
function createVNodeFragment(vnode) {
	const frag = createInteropFragment(EMPTY_BLOCK, vnode);
	frag.$key = vnodeKeyOf(vnode);
	const content = new InteropContentState();
	const syncNodes = () => {
		frag.nodes = resolveVNodeNodes(frag.vnode);
		content.resolved = true;
	};
	frag.isBlockValid = (componentAsValid) => componentAsValid && !!(frag.vnode.shapeFlag & 6) || (content.resolved ? isValidBlock(frag.nodes, componentAsValid) : true);
	trackFragmentVNodeUpdates(frag, vnode, syncNodes);
	return {
		frag,
		syncNodes
	};
}
/**
* Mount a vnode as a dynamic component branch (`<component :is="vnode">`
* in a vapor template). The KeepAlive lookup, fallthrough and hydration of
* the vnode live here so the dynamic component only sees a block.
*/
function mountDynamicVNode(internals, vnode, parentComponent, isSingleRoot, rawProps, once) {
	if (parentComponent && isKeepAlive(parentComponent)) {
		const cached = parentComponent.ctx.getCachedComponent(vnode.type, vnode.key);
		if (cached) {
			if (cached.patchVNode) cached.patchVNode(vnode);
			return cached;
		}
	}
	if (once && rawProps) rawProps = snapshotRawProps(rawProps);
	const owner = resolveFallthroughOwner(isSingleRoot);
	let getExtraProps;
	if (owner) {
		if (rawProps) {
			const source = () => resolveFallthroughAttrs(owner);
			const sources = rawProps.$;
			rawProps = extend$1({}, rawProps, { $: sources ? sources.concat(source) : [source] });
		} else getExtraProps = () => {
			const attrs = resolveFallthroughAttrs(owner, true);
			return attrs === EMPTY_OBJ ? void 0 : attrs;
		};
	}
	if (rawProps) {
		const props = new Proxy(rawProps, rawPropsProxyHandlers);
		getExtraProps = () => props;
	}
	const frag = mountVNode(internals, vnode, parentComponent, getExtraProps, once && !owner);
	if (isHydrating$1) {
		locateHydrationNode(shouldConsumeFragmentStart(vnode) ? createFragmentClaim() : void 0);
		frag.hydrate();
	}
	return frag;
}
function shouldConsumeFragmentStart(vnode) {
	if (vnode.type === Fragment) return false;
	if (vnode.shapeFlag & 6) {
		const type = vnode.type;
		return !!type.__vapor && !type.__multiRoot;
	}
	return true;
}
/**
* Mount VNode in vapor
*/
function mountVNode(internals, vnode, parentComponent, getExtraProps, staticExtraProps) {
	let suspense = currentRenderContext.suspense || parentComponent && parentComponent.suspense;
	let baseVNode = vnode;
	const withExtraProps = (base) => {
		const cloned = cloneVNode(base, getExtraProps && getExtraProps(), true);
		if (cloned.key !== base.key) {
			var _base$key;
			cloned.key = base.key;
			cloned.props.key = (_base$key = base.key) !== null && _base$key !== void 0 ? _base$key : void 0;
		}
		return cloned;
	};
	vnode = withExtraProps(baseVNode);
	const { frag, syncNodes } = createVNodeFragment(vnode);
	if (vnode.shapeFlag & 1) frag.getMountSuspense = () => suspense;
	let isMounted = false;
	let mountedParentNode;
	let mountedAnchor = null;
	let namespace;
	let isUnmounted = false;
	const unmount = (parentNode, transition) => {
		if (isUnmounted) {
			if (parentNode) {
				removeAttachedNodes(resolveVNodeNodes(vnode), parentNode);
				if (vnode.anchor && vnode.anchor.parentNode === parentNode) remove(vnode.anchor, parentNode);
			}
			return;
		}
		if (transition) setTransitionHooks(vnode, transition);
		const parentSuspense = resolveUnmountSuspense(suspense);
		if (vnode.shapeFlag & 256) {
			const keepAliveCtx = parentComponent.ctx;
			keepAliveCtx.clearCurrent(frag);
			const storageContainer = keepAliveCtx.getStorageContainer();
			if (vnode.type.__vapor) {
				deactivate$1(vnode.component, storageContainer, parentSuspense);
				insert(vnode.anchor, storageContainer);
			} else deactivate(vnode, storageContainer, internals, parentComponent, parentSuspense);
		} else {
			isUnmounted = true;
			internals.um(vnode, parentComponent, parentSuspense, !!parentNode);
		}
		if (vnode.anchor && parentNode && vnode.anchor.parentNode === parentNode) remove(vnode.anchor, parentNode);
	};
	frag.hydrate = () => {
		if (!isHydrating$1) return;
		hydrateVNode(vnode, parentComponent, frag.slotScopeIds, suspense);
		isMounted = true;
		const anchorNode = vnode.anchor || vnode.el;
		if (anchorNode && anchorNode.parentNode) {
			mountedParentNode = anchorNode.parentNode;
			namespace = getContainerType(mountedParentNode);
		}
		syncNodes();
	};
	const place = (parentNode, anchor, parentSuspense, transition, moveType = 2) => {
		if (isHydrating$1) return;
		if (parentSuspense !== void 0) suspense = parentSuspense;
		const operationSuspense = suspense;
		if (vnode.shapeFlag & 512) {
			if (vnode.type.__vapor) {
				activate$1(vnode.component, parentNode, anchor, operationSuspense);
				insert(vnode.anchor, parentNode, anchor);
			} else activate(vnode, parentNode, anchor, internals, parentComponent, operationSuspense, void 0, false);
			return;
		} else {
			const prev = currentInstance;
			simpleSetCurrentInstance(null);
			if (!isMounted) {
				if (transition) setTransitionHooks(vnode, transition);
				namespace = getContainerType(parentNode);
				internals.p(null, vnode, parentNode, anchor, parentComponent, operationSuspense, namespace, frag.slotScopeIds);
				isMounted = true;
			} else {
				if (transition && moveType !== 2) setTransitionHooks(vnode, transition);
				internals.m(vnode, parentNode, anchor, moveType, parentComponent, operationSuspense);
			}
			simpleSetCurrentInstance(prev);
			mountedParentNode = parentNode;
			mountedAnchor = anchor;
		}
		syncNodes();
		if (isMounted && frag.u) frag.u.forEach((hook) => hook(frag.nodes));
	};
	frag.insert = (parentNode, anchor, parentSuspense, transition) => place(parentNode, anchor, parentSuspense, transition);
	frag.move = (parentNode, anchor, moveType, _parentComponent, parentSuspense, transition) => place(parentNode, anchor, parentSuspense, transition, moveType);
	const update = () => {
		const next = withExtraProps(baseVNode);
		if (!mountedParentNode) return;
		const previous = vnode;
		if (frag.$transition) setTransitionHooks(next, frag.$transition);
		if (previous.vaporScopeIds) setVNodeVaporScopeIds(next, previous.vaporScopeIds);
		next.shapeFlag |= previous.shapeFlag & 768;
		vnode = next;
		trackFragmentVNodeUpdates(frag, vnode, syncNodes);
		frag.vnode = vnode;
		frag.$key = vnodeKeyOf(vnode);
		const prevInstance = currentInstance;
		simpleSetCurrentInstance(null);
		internals.p(previous, vnode, mountedParentNode, mountedAnchor, parentComponent, suspense, namespace, frag.slotScopeIds);
		simpleSetCurrentInstance(prevInstance);
		syncNodes();
	};
	frag.patchVNode = (next) => {
		if (next.type !== baseVNode.type) return;
		baseVNode = next;
		const prevSub = setActiveSub();
		try {
			update();
		} finally {
			setActiveSub(prevSub);
		}
	};
	if (getExtraProps && !staticExtraProps) renderEffect(update);
	frag.remove = unmount;
	return frag;
}
/**
* Mount vdom component in vapor
*/
function createVDOMComponent(internals, component, parentComponent, rawProps, rawSlots, once, inputScope) {
	let suspense = currentRenderContext.suspense || parentComponent && parentComponent.suspense;
	const useBridge = shouldUseRendererBridge(component);
	const comp = useBridge ? ensureRendererBridge(component) : component;
	let propsInstance;
	let rawValues = EMPTY_OBJ;
	let rawRef;
	let shouldRefreshRef = false;
	let refreshRefJob;
	let isMounted = false;
	let cells;
	const isolated = rawSlots && isolateSlotSources(rawSlots);
	if (isolated) {
		rawSlots = isolated[0];
		cells = isolated[1];
	}
	let hasDynamicProps = !once && (!!cells || hasDynamicPropsSource(rawProps || EMPTY_OBJ));
	if (hasDynamicProps) inputScope || (inputScope = effectScope(true));
	const prevInstance = setCurrentInstance(parentComponent, inputScope);
	let vnode;
	try {
		if (!hasDynamicProps) {
			rawValues = collectInputs(rawProps || EMPTY_OBJ, cells);
			if (cells) deliverInputs(void 0, void 0, cells);
		} else {
			const effect = new RenderEffect(() => {
				const prevInner = setCurrentInstance(parentComponent, inputScope);
				try {
					rawValues = collectProps(rawProps || EMPTY_OBJ, rawValues.style);
					if (cells) collectSlotSources(cells);
				} finally {
					restoreCurrentInstance(prevInner);
				}
				if (effect.active && (propsInstance || cells)) {
					const changed = deliverInputs(propsInstance, rawValues, cells);
					if (changed && rawRef) {
						shouldRefreshRef = true;
						queuePostFlushCb(refreshRefJob || (refreshRefJob = () => {
							if (shouldRefreshRef) {
								shouldRefreshRef = false;
								if (rawRef) setRef(rawRef, rawRef, suspense, vnode);
							}
						}), -1);
					}
					if (changed && propsInstance && component.__asyncLoader && vnode.component.isMounted) vnode.component.update();
				}
			}, true);
			effect.run();
			if (!effect.deps) {
				effect.stop();
				hasDynamicProps = false;
			}
		}
		vnode = createVNode(comp, rawValues);
	} catch (error) {
		if (inputScope) inputScope.stop();
		throw error;
	} finally {
		restoreCurrentInstance(prevInstance);
	}
	const { frag, syncNodes } = createVNodeFragment(vnode);
	frag.inputScope = inputScope;
	onScopeDispose(() => {
		if (!isMounted && inputScope) inputScope.stop();
	}, true);
	const keepAliveCtx = isKeepAliveEnabled ? getKeepAliveContext(parentComponent) : null;
	if (keepAliveCtx) {
		keepAliveCtx.processShapeFlag(frag);
		if (component.__asyncLoader) {
			let disposed = false;
			onScopeDispose(() => disposed = true);
			component.__asyncLoader().then(() => {
				if (!disposed) keepAliveCtx.cacheBlock(frag);
			}).catch(NOOP);
		}
	}
	vnode.vi = (instance) => {
		const prev = currentInstance;
		simpleSetCurrentInstance(parentComponent);
		const wrapper = propsInstance = new VaporComponentInstance(useBridge ? comp : {
			props: instance.propsOptions[0],
			__propsOptions: instance.propsOptions
		}, void 0, rawSlots, parentComponent ? parentComponent.appContext : void 0);
		simpleSetCurrentInstance(prev);
		wrapper.interopVNode = vnode;
		wrapper.hasDynamicProps = hasDynamicProps;
		instance.scope.run(() => {
			onScopeDispose(() => {
				if (inputScope) inputScope.stop();
				wrapper.scope.stop();
			});
		});
		try {
			deliverInputs(wrapper, rawValues);
		} catch (error) {
			if (inputScope) inputScope.stop();
			wrapper.scope.stop();
			throw error;
		}
		const attrs = createInternalObject();
		const isFilteredAttr = (key) => typeof key === "string" && (isReservedProp(key) || isEmitListener(instance.emitsOptions, key));
		instance.attrs = new Proxy(attrs, {
			get(_, key) {
				if (isFilteredAttr(key)) return;
				return wrapper.attrs[key];
			},
			has(_, key) {
				return !isFilteredAttr(key) && key in wrapper.attrs;
			},
			ownKeys() {
				return Reflect.ownKeys(wrapper.attrs).filter((key) => !isFilteredAttr(key));
			},
			getOwnPropertyDescriptor(_, key) {
				if (!isFilteredAttr(key) && key in wrapper.attrs) return {
					enumerable: true,
					configurable: true
				};
			}
		});
		instance.props = vnode.shapeFlag & 2 && !comp.props ? instance.attrs : /* @__PURE__ */ shallowReactive(wrapper.props);
		instance.slots = wrapper.rawSlots === EMPTY_OBJ ? createInternalObject() : new Proxy(wrapper.rawSlots, vaporSlotsProxyHandler);
		if (component.__asyncLoader && wrapper.rawSlots !== EMPTY_OBJ) {
			vnode.children = instance.slots;
			vnode.shapeFlag |= 32;
		}
	};
	let isUnmounted = false;
	let isDomRemoved = false;
	const removeDom = (parentNode) => {
		if (!parentNode || isDomRemoved) return;
		removeAttachedNodes(resolveVNodeNodes(vnode), parentNode);
		isDomRemoved = true;
	};
	const unmount = (parentNode, transition) => {
		shouldRefreshRef = false;
		if (isUnmounted) {
			if (!transition) removeDom(parentNode);
			return;
		}
		if (transition) setTransitionHooks(vnode, transition);
		const parentSuspense = resolveUnmountSuspense(suspense);
		if (vnode.shapeFlag & 256) {
			if (rawRef) setRef(rawRef, null, null, vnode, true);
			if (frag.inputScope) frag.inputScope.pause();
			keepAliveCtx.clearCurrent(frag);
			deactivate(vnode, keepAliveCtx.getStorageContainer(), internals, parentComponent, parentSuspense);
			return;
		}
		isUnmounted = true;
		isMounted = false;
		if (inputScope) inputScope.stop();
		internals.um(vnode, parentComponent, parentSuspense, !!parentNode);
		if (!transition) removeDom(parentNode);
	};
	frag.hydrate = () => {
		if (!isHydrating$1) return;
		withSlotBoundary(null, () => hydrateVNode(vnode, parentComponent, frag.slotScopeIds, suspense));
		isMounted = true;
		syncNodes();
	};
	vnode.scopeId = getCurrentScopeId() || null;
	vnode.slotScopeIds = currentRenderContext.slotScopeIds;
	const place = (parentNode, anchor, parentSuspense, transition, moveType = 2) => {
		if (isHydrating$1) return;
		if (parentSuspense !== void 0) suspense = parentSuspense;
		const operationSuspense = suspense;
		if (vnode.shapeFlag & 512) {
			if (frag.inputScope) frag.inputScope.resume();
			withSlotBoundary(null, () => activate(vnode, parentNode, anchor, internals, parentComponent, operationSuspense, void 0, false));
		} else {
			const prev = currentInstance;
			simpleSetCurrentInstance(null);
			if (!isMounted) {
				if (transition) {
					if (isVaporTransitionHooks(transition)) {
						const pendingLeave = claimPendingLeave(transition.state);
						if (pendingLeave) transition.delayedLeave = pendingLeave;
					}
					setTransitionHooks(vnode, transition);
				}
				withSlotBoundary(null, () => internals.mt(vnode, parentNode, anchor, parentComponent, operationSuspense, getContainerType(parentNode), false));
				if (rawRef) setRef(rawRef, null, operationSuspense, vnode);
				isMounted = true;
			} else {
				if (transition && moveType !== 2) setTransitionHooks(vnode, transition);
				internals.m(vnode, parentNode, anchor, moveType, parentComponent, operationSuspense);
			}
			simpleSetCurrentInstance(prev);
		}
		syncNodes();
		if (isMounted && frag.u) frag.u.forEach((hook) => hook(frag.nodes));
	};
	frag.insert = (parentNode, anchor, parentSuspense, transition) => place(parentNode, anchor, parentSuspense, transition);
	frag.move = (parentNode, anchor, moveType, _parentComponent, parentSuspense, transition) => place(parentNode, anchor, parentSuspense, transition, moveType);
	frag.remove = unmount;
	frag.setRef = (instance, ref, refFor, refKey) => {
		const oldRawRef = rawRef;
		rawRef = normalizeRef({
			ref,
			ref_for: refFor,
			ref_key: refKey
		}, instance);
		vnode.ref = rawRef;
		if (isMounted) {
			let target = vnode;
			if ((component.__asyncResolved || oldRawRef === void 0 && isAsyncWrapper(vnode) && !(vnode.shapeFlag & 512)) && vnode.component.subTree.component) {
				target = vnode.component.subTree;
				target.ref = rawRef;
			}
			if (rawRef) setRef(rawRef, oldRawRef || null, suspense, target);
			else if (oldRawRef) setRef(oldRawRef, null, null, target, true);
		}
	};
	return frag;
}
const rendererBridgeCache = /* @__PURE__ */ new WeakMap();
/**
* Teleport/Suspense are renderer primitives (`__isTeleport` / `__isSuspense`),
* not regular components with their own render pipeline.
*
* We wrap them with a tiny functional bridge so they can pass through the
* interop component mount path while preserving built-in vnode semantics.
*/
function shouldUseRendererBridge(component) {
	return !!(component.__isTeleport || component.__isSuspense);
}
function ensureRendererBridge(component) {
	let bridge = rendererBridgeCache.get(component);
	if (!bridge) rendererBridgeCache.set(component, bridge = (props, { slots }) => createVNode(component, props, slots));
	return bridge;
}
function isValidVNodeContent(vnodes) {
	for (let i = 0; i < vnodes.length; i++) {
		const child = vnodes[i];
		if (!isVNode(child) || isValidVNodeChild(child)) return true;
	}
	return false;
}
function isValidVNodeChild(vnode) {
	if (vnode.type === Comment$1) return false;
	if (vnode.type === Fragment) return isValidVNodeContent(vnode.children);
	return !vnode.vs || !vnode.vb || isValidSlot(vnode.vb);
}
function trackSlotVNodeUpdatesWithRefresh(vnode, refresh, beforeUpdate) {
	const track = (node) => {
		if (beforeUpdate) node.ibu = beforeUpdate;
		node.iu = refresh;
		if (node.type === Fragment && isArray(node.children)) node.children.forEach((child) => {
			if (isVNode(child)) track(child);
		});
	};
	track(vnode);
}
/**
* Construction point for the interop hosts' resolution state — the shared
* bookkeeping fields plus the host-specific hooks. (SlotFragment, the third
* host, implements SlotResolutionState directly as a class.)
*/
function createSlotResolutionState(boundary, hooks) {
	return extend$1({
		boundary,
		activeFallback: null,
		pendingRecheck: false,
		isReconciling: false
	}, hooks);
}
/**
* Exposes `$transition` through the outlet fragment so BaseTransition state
* stays on the fragment; hooks inherited from VDOM BaseTransition are
* filtered out on read because they belong to its own state machine.
* Enumerable + configurable to match an object-literal accessor pair.
*/
function installInteropTransitionAccessor(state, frag) {
	Object.defineProperty(state, "$transition", {
		enumerable: true,
		configurable: true,
		get() {
			const transition = frag.$transition;
			return transition && isVaporTransitionHooks(transition) ? transition : void 0;
		},
		set(transition) {
			frag.$transition = transition;
		}
	});
}
function renderVDOMSlot(internals, slotsRef, name, props, parentComponent, options = EMPTY_OBJ) {
	const { fallback, flags = 0, adoptAnchor } = options;
	const once = !!(flags & 2);
	const textMode = !!(flags & 256);
	const forwarded = isForwardedSlot(flags);
	let suspense = currentRenderContext.suspense || parentComponent.suspense;
	const mountParent = currentInstance || parentComponent;
	const frag = createInteropFragment(EMPTY_BLOCK, null, 128);
	const slotBoundary = frag.slotBoundary;
	const content = new InteropContentState();
	const scope = effectScope();
	let localFallback;
	let rendered = null;
	let isMounted = false;
	let currentParentNode = null;
	let slotNamespace;
	let currentAnchor = null;
	let disposed = false;
	let inOutLeave;
	let heldContent;
	let pendingOutIn;
	let contentLeaving;
	let contentLeave;
	let contentLeaveState;
	const endContentLeave = (own) => {
		if (contentLeave !== own) return;
		const state = contentLeaveState;
		contentLeave = contentLeaving = contentLeaveState = void 0;
		if (state) state.isLeaving = false;
		invokeArrayFns(own);
	};
	const awaitLeavingRoot = (cb) => {
		if (!contentLeave) return false;
		const hooks = slotResolutionState.$transition;
		if (hooks && hooks.instance.vapor) (contentLeaveState = hooks.state).isLeaving = true;
		contentLeave.push(cb);
		return true;
	};
	let isContentUpdateRecheck = false;
	const reportsValidity = !!slotBoundary;
	let wasExposedValid;
	let liveVNode = null;
	let slotResolutionState;
	const isContentValid = () => liveVNode && rendered === liveVNode ? isValidVNodeChild(liveVNode) : content.valid;
	frag.isBlockValid = (componentAsValid) => {
		if (!content.resolved) return true;
		return slotResolutionState.activeFallback ? isValidBlock(slotResolutionState.activeFallback, componentAsValid) : isContentValid();
	};
	const boundary = createSlotBoundary(frag, () => localFallback, () => markSlotResolutionDirty(slotResolutionState));
	const contentBoundary = forwarded || fallback ? boundary : null;
	const contentCtx = deriveSlotBoundary(frag.ctx, contentBoundary);
	frag.getContent = () => content.nodes;
	frag.awaitLeavingRoot = awaitLeavingRoot;
	slotResolutionState = createSlotResolutionState(boundary, {
		getContent: frag.getContent,
		getParentNode: () => currentParentNode,
		getAnchor: () => currentAnchor,
		isBusy: NO,
		isDisposed: () => disposed,
		isContentValid,
		syncNodes: () => {
			frag.nodes = resolveExposedSlotNodes(slotResolutionState);
		},
		awaitLeavingRoot,
		notifyExposedValidityChange: () => {
			if (reportsValidity && !isContentUpdateRecheck) slotBoundary.markDirty();
		}
	});
	installInteropTransitionAccessor(slotResolutionState, frag);
	localFallback = fallback ? once ? () => withOnce(() => fallback(internals, parentComponent)) : () => fallback(internals, parentComponent) : void 0;
	const place = (parentNode, anchor, parentSuspense, moveType) => {
		if (isHydrating$1) return;
		if (parentSuspense !== void 0) suspense = parentSuspense;
		if (localFallback && !frag.anchor) {
			frag.anchor = resolveFragmentAnchor(adoptAnchor, void 0);
			if (frag.anchor !== adoptAnchor) parentNode.insertBefore(frag.anchor, anchor);
			anchor = frag.anchor;
		}
		currentParentNode = parentNode;
		currentAnchor = anchor;
		if (!isMounted) {
			slotNamespace = getContainerType(parentNode);
			scope.run(render);
			isMounted = true;
		} else {
			if (isVNode(rendered) && (moveType !== void 0 || rendered !== liveVNode)) {
				internals.m(rendered, parentNode, anchor, moveType === void 0 ? 2 : moveType, mountParent, suspense);
				insertActiveSlotFallback(slotResolutionState, moveType, parentNode, anchor);
			} else placeSlotContent(slotResolutionState, parentNode, anchor, suspense, moveType);
			const held = heldContent;
			if (held) {
				heldContent = void 0;
				inContentContext(() => applyVNodeContent(held, true));
			}
		}
		notifyUpdated();
	};
	frag.insert = (parentNode, anchor, parentSuspense) => place(parentNode, anchor, parentSuspense);
	frag.move = (parentNode, anchor, moveType, _parentComponent, parentSuspense) => place(parentNode, anchor, parentSuspense, moveType);
	frag.remove = (parentNode, transitionHooks) => {
		if (parentNode) currentParentNode = parentNode;
		scope.stop();
		disposed = true;
		const leavingElement = pendingOutIn ? pendingOutIn.leavingElement : contentLeaving;
		pendingOutIn = void 0;
		const leave = leavingElement && leavingElement[leaveCbKey];
		if (leave) leave(true);
		if (rendered) {
			if (isTransitionEnabled && transitionHooks && "leave" in transitionHooks && isVNode(rendered)) {
				const branch = rendered.type === Fragment ? getRawTransitionChild(rendered) : rendered;
				if (branch) setTransitionHooks(branch, transitionHooks);
			}
			removeRenderedContent(rendered, parentNode);
		}
		disposeSlotResolution(slotResolutionState, parentNode);
	};
	frag.hydrate = () => {
		if (!isHydrating$1) return;
		const open = currentHydrationNode;
		if (open && isRangeEnd(open)) {
			runWithoutHydration(() => place(open.parentNode, open, void 0));
			return;
		}
		if (open && isComment(open, "(")) {
			const close = frag.anchor = claimAnchor(locateEndAnchor(open));
			hydrateSlotFallbackRange({
				first: open.nextSibling,
				close,
				boundary
			}, () => place(close.parentNode, close, void 0));
			if (slotResolutionState.activeFallback) setVNode(null);
			advanceHydrationNode(close);
			return;
		}
		scope.run(render);
		if (!currentParentNode) {
			currentAnchor = currentSlotEndAnchor || currentHydrationNode;
			currentParentNode = currentAnchor.parentNode;
		}
		slotNamespace = getContainerType(currentParentNode);
		if (content.valid && localFallback && !frag.anchor) {
			const outletAnchor = claimUntrackedAnchor(/* @__PURE__ */ createTextNode());
			insertUntrackedAnchor(currentParentNode, currentAnchor, outletAnchor);
			frag.anchor = currentAnchor = outletAnchor;
		}
		isMounted = true;
	};
	return frag;
	function notifyUpdated() {
		if (isMounted) {
			if (reportsValidity && isValidSlot(frag) !== wasExposedValid) slotBoundary.markDirty();
			if (frag.u) frag.u.forEach((hook) => hook(frag.nodes));
		}
		syncInteropRoot(parentComponent);
	}
	function notifyBeforeUpdate() {
		if (isMounted) {
			if (reportsValidity) wasExposedValid = isValidSlot(frag);
			if (frag.bu) frag.bu.forEach((hook) => hook());
		}
	}
	function recheckAfterContentUpdate() {
		isContentUpdateRecheck = true;
		try {
			recheckSlotResolution(slotResolutionState);
		} finally {
			isContentUpdateRecheck = false;
		}
	}
	function finishContentUpdate() {
		recheckAfterContentUpdate();
		notifyUpdated();
	}
	function patchSlotVNode(previous, next, slotScopeIds, valid) {
		setVNode(next);
		const refreshSlotVNode = () => {
			const prevValid = content.valid;
			const prevOutput = frag.nodes;
			setRendered(next);
			recheckAfterContentUpdate();
			if (content.valid !== prevValid || !isSameResolvedOutput(prevOutput, frag.nodes)) notifyUpdated();
		};
		trackSlotVNodeUpdatesWithRefresh(next, refreshSlotVNode, notifyBeforeUpdate);
		const prev = currentInstance;
		simpleSetCurrentInstance(null);
		internals.p(previous, next, currentParentNode, currentAnchor, mountParent, suspense, slotNamespace, concatInteropScopeIds(frag.slotScopeIds, slotScopeIds));
		simpleSetCurrentInstance(prev);
		const leaving = inOutLeave;
		inOutLeave = void 0;
		if (leaving && leaving.delayedLeave) queuePendingLeave(slotResolutionState.$transition.state, () => leaving.delayedLeave && leaving.delayedLeave());
		setRendered(next, valid);
		finishContentUpdate();
	}
	function removeRenderedContent(renderedContent, parentNode) {
		if (isVNode(renderedContent)) internals.um(renderedContent, mountParent, resolveUnmountSuspense(suspense), !!parentNode);
		else remove(renderedContent, parentNode);
	}
	function resumeOutIn() {
		queuePostFlushCb(() => {
			const pending = pendingOutIn;
			pendingOutIn = void 0;
			if (!pending || disposed || !currentParentNode) return;
			const pendingContent = pending.content;
			if (isVNode(pendingContent)) {
				const nextVNode = prepareInteropSlotTransition(frag, pendingContent, void 0, NOOP) || pendingContent;
				inContentContext(() => patchSlotVNode(pending.placeholder, nextVNode, pendingContent.slotScopeIds, pending.contentValid));
			} else {
				setVNode(null);
				if (pending.placeholder) removeRenderedContent(pending.placeholder, currentParentNode);
				if (pendingContent) insert(pendingContent, currentParentNode, currentAnchor, suspense);
				setRendered(pendingContent || null, pending.contentValid);
				finishContentUpdate();
			}
		});
	}
	function render() {
		const prev = currentInstance;
		simpleSetCurrentInstance(frag.renderInstance);
		try {
			once ? renderContent() : renderEffect(renderContent);
		} finally {
			simpleSetCurrentInstance(prev);
		}
	}
	function inContentContext(fn) {
		withRenderContext(contentCtx, fn);
	}
	function renderContent() {
		notifyBeforeUpdate();
		inContentContext(() => {
			const { content: slotContent, valid: slotContentValid } = resolveSlotContent();
			if (isHydrating$1) {
				hydrateContent(slotContent, slotContentValid);
				return;
			}
			if (pendingOutIn) {
				pendingOutIn.content = slotContent;
				pendingOutIn.contentValid = slotContentValid;
				return;
			}
			if (isVNode(slotContent)) {
				applyVNodeContent(slotContent, slotContentValid);
				return;
			}
			if (slotContent) {
				applyBlockContent(slotContent, slotContentValid);
				return;
			}
			applyEmptyContent();
		});
	}
	function resolveSlotContent() {
		let slotContent;
		let slotContentValid = false;
		if (slotsRef.value) {
			const renderContent = () => {
				const slotName = isFunction(name) ? name() : name;
				frag.slotName = slotName;
				return renderSlot(slotsRef.value, slotName, props);
			};
			slotContent = once ? withOnce(renderContent) : renderContent();
			if (textMode) {
				if (isVNode(slotContent)) normalizeUniTextVNode(slotContent);
				else if (slotContent) normalizeUniTextBlock(slotContent);
			}
			if (isVNode(slotContent)) slotContentValid = slotContent.type !== Fragment || isValidVNodeChild(slotContent);
			else if (slotContent) slotContentValid = isValidSlot(slotContent);
		}
		return {
			content: slotContent,
			valid: slotContentValid
		};
	}
	function applyVNodeContent(slotContent, slotContentValid) {
		const transition = slotResolutionState.$transition;
		if ((isHydratingEnabled$1 || isHydratingEnabled) && transition && !transition.applyGroup && !slotResolutionState.activeFallback && isVNode(rendered) && rendered.type === Fragment) {
			const wrapper = rendered;
			const branch = resolveTransitionChild([wrapper]);
			if (branch) {
				currentAnchor = frag.anchor || (frag.anchor = claimAnchor(wrapper.anchor));
				let node = wrapper.el;
				while (node !== branch.el) {
					const next = node.nextSibling;
					currentParentNode.removeChild(node);
					node = next;
				}
				node = internals.n(branch);
				const end = wrapper.anchor.nextSibling;
				while (node !== end) {
					const next = node.nextSibling;
					if (node !== currentAnchor) currentParentNode.removeChild(node);
					node = next;
				}
			} else removeRenderedContent(wrapper, currentParentNode);
			setVNode(branch || null);
			setRendered(branch || null, content.valid);
		}
		if (reportsValidity && slotContentValid && (heldContent || !content.valid) && slotBoundary.isHolding()) {
			heldContent = slotContent;
			if (!content.valid) {
				content.valid = true;
				finishContentUpdate();
			}
			return;
		}
		heldContent = void 0;
		const prevRendered = rendered;
		const mode = transition && transition.props.mode;
		let delayedLeaveSource;
		let prevVNode = isVNode(prevRendered) ? prevRendered : null;
		if (slotResolutionState.activeFallback && slotContentValid && (transition || isTransitionEnabled && frag.$transition)) {
			if (slotResolutionState.held === "entering" && contentLeave) {
				clearSlotFallback(slotResolutionState);
				pendingOutIn = {
					content: slotContent,
					placeholder: prevVNode,
					contentValid: true
				};
				content.valid = true;
				contentLeave.push(resumeOutIn);
				finishContentUpdate();
				return;
			}
			if (!transition) clearSlotFallback(slotResolutionState);
			else if (mode === "out-in") {
				const leavingBlock = findTransitionBlock(slotResolutionState.activeFallback);
				const leavingElement = leavingBlock && getTransitionElement(leavingBlock);
				pendingOutIn = {
					content: slotContent,
					placeholder: prevVNode,
					contentValid: true,
					leavingElement
				};
				if (leaveSlotFallback(slotResolutionState, transition, resumeOutIn)) return;
				pendingOutIn = void 0;
			} else if (mode === "in-out") {
				const enterHooks = extend$1({}, transition);
				enterHooks.delayedLeave = void 0;
				leaveSlotFallback(slotResolutionState, enterHooks, NOOP);
				delayedLeaveSource = enterHooks;
			} else leaveSlotFallback(slotResolutionState, transition, NOOP);
			if (prevVNode) {
				removeRenderedContent(prevVNode, currentParentNode);
				prevVNode = null;
			}
		} else if (slotContentValid && transition && mode === "in-out" && !(prevVNode && isValidVNodeChild(prevVNode))) {
			const pendingLeave = claimPendingLeave(transition.state);
			if (pendingLeave) delayedLeaveSource = { delayedLeave: pendingLeave };
		}
		let leaving = false;
		if (prevVNode && !slotContentValid && transition && isContentValid() && (localFallback || reportsValidity)) {
			if (mode === "out-in") {
				const own = [];
				if (prepareTransitionLeave(prevVNode, void 0, transition.props, transition.state, transition.instance, () => endContentLeave(own))) {
					contentLeaving = getInteropTransitionElement(prevVNode);
					contentLeave = own;
					leaving = true;
				}
			} else if (mode === "in-out") {
				prepareTransitionLeave(prevVNode, inOutLeave = {}, transition.props, transition.state, transition.instance, NOOP);
				leaving = true;
			}
		}
		const transitionChild = prepareInteropSlotTransition(frag, slotContent, leaving ? void 0 : prevVNode || void 0, resumeOutIn, delayedLeaveSource);
		const nextVNode = transitionChild || slotContent;
		if (prevVNode && transitionChild && transition && transition.state.isLeaving) {
			suspendForOutIn(prevVNode, nextVNode, slotContent, slotContentValid);
			if (contentLeaveState) contentLeave.push(resumeOutIn);
			return;
		}
		if (prevRendered && !isVNode(prevRendered)) removeRenderedContent(prevRendered, currentParentNode);
		patchSlotVNode(prevVNode, nextVNode, slotContent.slotScopeIds, slotContentValid);
	}
	function applyBlockContent(slotContent, slotContentValid) {
		setVNode(null);
		const prevRendered = rendered;
		if (prevRendered) removeRenderedContent(prevRendered, currentParentNode);
		insert(slotContent, currentParentNode, currentAnchor, suspense);
		setRendered(slotContent, slotContentValid);
		finishContentUpdate();
	}
	function applyEmptyContent() {
		if (rendered) removeRenderedContent(rendered, currentParentNode);
		setVNode(null);
		setRendered(null);
		finishContentUpdate();
	}
	function setVNode(vnode) {
		frag.vnode = vnode;
		frag.$key = vnode ? getVNodeKey(vnode) : void 0;
	}
	/** Commit rendered output, deriving the content nodes and validity. */
	function setRendered(renderedContent, knownValid) {
		const prevRendered = rendered;
		rendered = renderedContent;
		if (isVNode(renderedContent)) {
			if (renderedContent !== prevRendered) liveVNode = hasVaporSlot(renderedContent) ? renderedContent : null;
			content.nodes = resolveVNodeNodes(renderedContent, renderedContent === liveVNode);
			content.valid = knownValid === void 0 ? isValidVNodeChild(renderedContent) : knownValid;
		} else if (renderedContent) {
			liveVNode = null;
			content.nodes = renderedContent;
			content.valid = knownValid === void 0 ? isValidSlot(renderedContent) : knownValid;
		} else {
			liveVNode = null;
			content.nodes = EMPTY_BLOCK;
			content.valid = false;
		}
		content.resolved = true;
	}
	function suspendForOutIn(prevVNode, placeholder, slotContent, contentValid) {
		pendingOutIn = {
			content: slotContent,
			placeholder,
			contentValid,
			leavingElement: getInteropTransitionElement(prevVNode)
		};
		setVNode(placeholder);
		rendered = placeholder;
		internals.p(prevVNode, placeholder, currentParentNode, currentAnchor, mountParent, suspense, slotNamespace, null);
	}
	/**
	* One-shot hydration claimer: adopts the SSR-rendered slot content instead
	* of mounting. Runs only on the first render pass under an active hydration
	* cursor; later passes take the CSR paths above.
	*/
	function hydrateContent(slotContent, slotContentValid) {
		if (!isHydrating$1) return;
		const hydratedContent = slotContent && (slotContentValid || !localFallback) ? slotContent : void 0;
		if (isVNode(hydratedContent)) {
			const transitionChild = prepareInteropSlotTransition(frag, hydratedContent, void 0, NOOP);
			const hydrationVNode = transitionChild || hydratedContent;
			setVNode(hydrationVNode);
			const refreshSlotVNode = () => {
				content.nodes = resolveVNodeNodes(hydrationVNode, hydrationVNode === liveVNode);
				slotResolutionState.syncNodes();
				notifyUpdated();
			};
			trackSlotVNodeUpdatesWithRefresh(hydrationVNode, refreshSlotVNode, notifyBeforeUpdate);
			const hydrationParent = /* @__PURE__ */ parentNode(currentHydrationNode);
			const close = transitionChild && locateFragmentEnd(currentHydrationNode);
			if (close) setCurrentHydrationNode(currentHydrationNode.nextSibling);
			hydrateVNode(hydrationVNode, mountParent, concatInteropScopeIds(frag.slotScopeIds, hydrationVNode === hydratedContent ? null : hydratedContent.slotScopeIds), suspense);
			if (close) {
				frag.anchor = claimAnchor(close);
				advanceHydrationNode(close);
			}
			currentParentNode = hydrationParent;
			currentAnchor = internals.n(hydrationVNode);
			setRendered(hydrationVNode, slotContentValid);
		} else if (hydratedContent) {
			setVNode(null);
			setRendered(hydratedContent, slotContentValid);
		} else {
			setVNode(null);
			setRendered(null);
		}
		finishContentUpdate();
	}
}
function normalizeUniTextVNode(vnode) {
	if (vnode.type === Text$1 && typeof vnode.children === "string") vnode.children = normalizeUniText$1(vnode.children);
	else if (vnode.type === Fragment && isArray(vnode.children)) for (let i = 0; i < vnode.children.length; i++) {
		const child = vnode.children[i];
		if (isVNode(child)) normalizeUniTextVNode(child);
	}
}
function needsHostParentForRemove(block) {
	if (isVaporComponent(block)) return isKeepAlive(block) || needsHostParentForRemove(block.block);
	if (isArray(block)) return block.some(needsHostParentForRemove);
	if (isFragment(block)) return needsHostParentForRemove(block.nodes);
	return false;
}
const vaporInteropPlugin = (app) => {
	enableSuspense();
	setInteropEnabled();
	setPublishInteropScopeIds(publishVaporScopeIds);
	app._context.vapor = vaporInteropImpl;
	const internals = ensureRenderer().internals;
	app._context.vdom = {
		mount: createVDOMComponent.bind(null, internals),
		slot: renderVDOMSlot.bind(null, internals),
		mountVNode: mountDynamicVNode.bind(null, internals)
	};
	const mount = app.mount;
	app.mount = ((...args) => {
		optimizePropertyLookup();
		return mount(...args);
	});
};
function hydrateVNode(vnode, parentComponent, slotScopeIds = null, parentSuspense = null) {
	const node = currentHydrationNode;
	const parent = /* @__PURE__ */ parentNode(node);
	if (!vdomHydrateNode) vdomHydrateNode = ensureHydrationRenderer().hydrateNode;
	const prev = currentInstance;
	simpleSetCurrentInstance(null);
	const nextNode = vdomHydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, false);
	simpleSetCurrentInstance(prev);
	if (nextNode) setCurrentHydrationNode(nextNode);
	else advanceHydrationNode(parent);
}
function createFallback(state, depth, parentComponent) {
	const internals = ensureRenderer().internals;
	return () => {
		const frag = createVNodeChildrenFragment(internals, () => {
			const outlet = state.outletsRef.value[depth];
			const children = outlet && invokeSlotFallback(outlet.fallback, outlet.owner);
			return children == null ? EMPTY_VNODES : normalizeInteropSlotValue(children);
		}, parentComponent);
		if (isHydrating$1 && frag.hydrate) frag.hydrate();
		return frag;
	};
}
function mountSlotWithoutHydration(vnode, open, close, parentComponent, parentSuspense, slotScopeIds, fallbackRange) {
	const container = /* @__PURE__ */ parentNode(close);
	const mount = () => {
		const start = open || /* @__PURE__ */ createTextNode();
		if (!open) insert(start, container, fallbackRange ? fallbackRange.first : close);
		const block = vnode.vb = renderVaporSlot(vnode, parentComponent, parentSuspense, slotScopeIds, fallbackRange);
		let anchor = close;
		if (!open) {
			anchor = isFragment(block) && block.anchor || /* @__PURE__ */ createTextNode();
			insert(anchor, container, close);
		}
		vnode.el = start;
		vnode.anchor = anchor;
		insert(block, container, anchor, parentSuspense);
	};
	if (fallbackRange) hydrateSlotFallbackRange(fallbackRange, mount);
	else runWithoutHydration(mount);
}
function hydrateOutletFallback(children, node, close, depth, parentComponent, parentSuspense, slotScopeIds) {
	const container = /* @__PURE__ */ parentNode(node);
	const internals = ensureRenderer().internals;
	let next = node;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (child.vs) {
			const outlets = child.vs.outlets;
			mountSlotWithoutHydration(child, null, close, parentComponent, parentSuspense, slotScopeIds, {
				depth: outlets && outlets[0].innerIds == null ? depth + 1 : depth,
				first: node,
				close
			});
			next = close;
		} else if (hasVaporSlot(child)) {
			insert(child.el = /* @__PURE__ */ createTextNode(), container, next);
			next = hydrateOutletFallback(child.children, node, close, child.vo ? depth + 1 : depth, parentComponent, parentSuspense, child.slotScopeIds ? concatInteropScopeIds(slotScopeIds, child.slotScopeIds) : slotScopeIds);
			insert(child.anchor = /* @__PURE__ */ createTextNode(), container, next);
		} else runWithoutHydration(() => internals.p(null, child, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds));
	}
	return next;
}
function hasVaporSlot(vnode) {
	return !!vnode.vs || vnode.type === Fragment && vnode.children.some(hasVaporSlot);
}
function attachSlotOutlet(content, fallback, owner) {
	let slot = findLoneSlot(content, 0) ? loneSlot : null;
	if (slot) {
		if (slot.cacheIndex != null) slot = loneSlotIn[loneSlotAt] = cloneVNode(slot);
		const vs = slot.vs;
		const outlet = {
			fallback,
			owner,
			innerIds: loneSlotInnerIds
		};
		vs.outlets = vs.outlets ? vs.outlets.concat(outlet) : [outlet];
	}
	loneSlot = loneSlotIn = null;
	return !!slot;
}
let loneSlot = null;
let loneSlotIn = null;
let loneSlotAt = 0;
let loneSlotInnerIds = 0;
function findLoneSlot(vnodes, pathIds) {
	for (let i = 0; i < vnodes.length; i++) {
		const child = vnodes[i];
		if (!isVNode(child)) return false;
		if (child.vs) {
			if (loneSlot) return false;
			loneSlot = child;
			loneSlotIn = vnodes;
			loneSlotAt = i;
			loneSlotInnerIds = pathIds;
		} else if (child.type === Fragment) {
			if (child.patchFlag > 0 && child.patchFlag & 384 || !findLoneSlot(child.children, pathIds + (child.slotScopeIds ? child.slotScopeIds.length : 0))) return false;
		} else if (child.type !== Comment$1) return false;
	}
	return true;
}
function resolveInteropVaporSlotState(vnode) {
	const slot = vnode.vs;
	let state = slot.state;
	if (!state) {
		const outlets = slot.outlets || EMPTY_ARR;
		state = {
			outlets,
			outletsRef: /* @__PURE__ */ shallowRef(outlets)
		};
		slot.state = state;
	}
	return state;
}
function syncInteropVaporSlotState(n1, n2) {
	const prevState = n1.vs.state;
	if (!prevState) return;
	n2.vs.state = prevState;
	prevState.outletsRef.value = prevState.outlets = n2.vs.outlets || EMPTY_ARR;
}
function trackInteropFallbackChanges(scope, state, onChange) {
	if (!scope) return;
	let trackedDepth = state.outlets.length;
	scope.run(() => {
		renderEffect(() => {
			const nextDepth = state.outletsRef.value.length;
			if (nextDepth !== trackedDepth) {
				trackedDepth = nextDepth;
				onChange();
			}
		}, true);
	});
}
function renderVaporSlot(vnode, parentComponent, parentSuspense, contextSlotScopeIds, fallbackRange) {
	const prev = currentInstance;
	const prevCtx = currentRenderContext;
	simpleSetCurrentInstance(parentComponent);
	if (isSuspenseEnabled && parentSuspense) setRenderContext(deriveSuspense(prevCtx, parentSuspense));
	if (parentComponent && !parentComponent.vapor) initVdomOwner(parentComponent);
	if (vnode.transition) ensureTransitionHooksRegistered();
	try {
		if (!vnode.vs || !vnode.vs.slot) return EMPTY_BLOCK;
		const slotState = resolveInteropVaporSlotState(vnode);
		const frag = createInteropFragment(EMPTY_BLOCK, null, 128);
		const inherited = getInheritedScopeIds(vnode, parentComponent, false);
		frag.ctx = deriveSlotScopeIds(frag.ctx, getInteropVaporSlotScopeIds(contextSlotScopeIds, vnode.slotScopeIds, inherited));
		const content = new InteropContentState();
		frag.isBlockValid = (componentAsValid) => content.resolved ? isValidBlock(frag.nodes, componentAsValid) : true;
		const slotBoundary = frag.slotBoundary;
		let isResolvingContent = false;
		let disposed = false;
		let slotResolutionState;
		const markDirty = () => markSlotResolutionDirty(slotResolutionState);
		const outletBoundaries = [];
		const createOutletBoundary = (depth) => {
			let fallback;
			return createSlotBoundary(frag, () => slotState.outlets[depth] ? fallback || (fallback = createFallback(slotState, depth, parentComponent)) : void 0, markDirty, depth === 0 ? () => isHoldingSlotContent(slotResolutionState) : void 0, () => {
				const outlet = slotState.outlets[depth];
				return outlet && outlet.innerIds != null ? getEnclosingOutletScopeIds(contextSlotScopeIds, outlet.innerIds, inherited) : frag.slotScopeIds;
			}, () => getOutletBoundary(depth + 1));
		};
		const getOutletBoundary = (depth) => depth < slotState.outlets.length ? outletBoundaries[depth] || (outletBoundaries[depth] = createOutletBoundary(depth)) : null;
		const rootBoundary = outletBoundaries[0] = createOutletBoundary(0);
		frag.getContent = () => content.nodes;
		slotResolutionState = createSlotResolutionState(rootBoundary, {
			getContent: frag.getContent,
			getParentNode: () => vnode.anchor ? vnode.anchor.parentNode : null,
			getAnchor: () => vnode.anchor,
			isBusy: () => isResolvingContent,
			isDisposed: () => disposed,
			isContentValid: () => isValidSlot(content.nodes),
			syncNodes: () => {
				frag.nodes = resolveExposedSlotNodes(slotResolutionState);
				content.resolved = true;
			},
			notifyExposedValidityChange: () => {
				if (slotBoundary) slotBoundary.markDirty();
			}
		});
		slotResolutionState.holdsContent = true;
		if (vnode.transition) installInteropTransitionAccessor(slotResolutionState, frag);
		const dispose = (parentNode) => {
			if (disposed) return;
			disposed = true;
			disposeSlotResolution(slotResolutionState, parentNode);
		};
		try {
			const renderContent = () => {
				content.nodes = withRenderContext(frag.ctx, () => withSlotBoundary(rootBoundary, () => invokeVaporSlot(vnode))) || EMPTY_BLOCK;
				recheckSlotResolution(slotResolutionState);
			};
			isResolvingContent = true;
			try {
				if (fallbackRange) {
					(fallbackRange.boundary = getOutletBoundary(fallbackRange.depth)).adoptFallback = fallbackRange.adopt;
					fallbackRange.getContent = frag.getContent;
				}
				if (isHydrating$1) withHydratingSlotBoundary(renderContent);
				else renderContent();
			} finally {
				isResolvingContent = false;
			}
			frag.insert = (parentNode, anchor, parentSuspense) => placeSlotContent(slotResolutionState, parentNode, anchor, parentSuspense);
			frag.move = (parentNode, anchor, moveType, parentComponent, parentSuspense) => placeSlotContent(slotResolutionState, parentNode, anchor, parentSuspense, moveType, parentComponent);
			frag.remove = (parentNode) => {
				remove(content.nodes, parentNode);
				dispose(parentNode);
			};
			trackInteropFallbackChanges(vnode.vs.scope, slotState, () => {
				slotResolutionState.fallbackChainStale = true;
				markDirty();
			});
			return frag;
		} catch (e) {
			dispose();
			stopVaporSlotScope(vnode);
			throw e;
		}
	} finally {
		setRenderContext(prevCtx);
		simpleSetCurrentInstance(prev);
	}
}
function stopVaporSlotScope(vnode) {
	if (vnode.vs && vnode.vs.scope) {
		vnode.vs.scope.stop();
		vnode.vs.scope = void 0;
	}
}
/**
* Slot functions can create renderEffects while evaluating their block.
* Those effects live in this dedicated scope so slot re-mount/unmount can
* dispose them immediately instead of waiting for the parent component.
*/
function invokeVaporSlot(vnode) {
	const propsRef = vnode.vs.ref = /* @__PURE__ */ shallowRef(vnode.vs.props || vnode.props);
	const scope = effectScope();
	vnode.vs.scope = scope;
	try {
		const run = () => vnode.vs.slot(new Proxy(propsRef, vaporSlotPropsProxyHandler));
		return inOnce ? withOnce(() => scope.run(run), false) : scope.run(run);
	} catch (e) {
		vnode.vs.scope = void 0;
		scope.stop();
		throw e;
	}
}
function resolveInteropRootEl(instance) {
	return getRootElement(instance, !!(process.env.NODE_ENV !== "production") ? {
		onDynamicFragment: (frag) => registerInteropRootSync(instance, frag),
		onComponent: (comp) => registerInteropRootRerenderSync(instance, comp)
	} : { onDynamicFragment: (frag) => registerInteropRootSync(instance, frag) });
}
function syncVNodeEl(vnode, instance) {
	vnode.el = resolveInteropRootEl(instance) || vnode.anchor;
}
function syncInteropRoot(instance) {
	const state = vnodeHookStateMap.get(instance);
	if (!state) return;
	syncVNodeEl(state.vnode, instance);
}
function invokeInteropDirsHook(instance, el, vnode, name, prevVNode = null) {
	if (!vnode.dirs) return;
	invokeDirectiveHook(vnode.el === el ? vnode : extend$1({}, vnode, { el }), prevVNode, instance.parent, name);
}
function queueInteropDirsJob(instance, job, suspense = instance.suspense) {
	queuePostRenderEffect(job, void 0, suspense);
}
function warnNonElementRootDirs() {
	warn("Runtime directive used on component with non-element root node. The directives will not function as intended.");
}
function getInteropDirsOwner(state, comp, vnode) {
	const owners = state.dirsOwners || (state.dirsOwners = /* @__PURE__ */ new WeakMap());
	let owner = owners.get(comp);
	if (owner) owner.vnode = vnode;
	else owners.set(comp, owner = {
		comp,
		vnode,
		el: null,
		carried: vnode,
		updating: null,
		patching: null,
		pending: null
	});
	return owner;
}
function resolveInteropDirsRoot(instance, state, block, inherit) {
	let owner = inherit;
	const el = getRootElement(block, {
		excludeSlotOutlets: true,
		onDynamicFragment: (frag) => registerInteropDirsFragment(instance, state, frag, owner),
		onComponent: (comp) => {
			registerInteropDirsComponent(instance, state, comp);
			owner = getInteropDirsOwner(state, comp, inherit.vnode);
		}
	});
	return [owner, el];
}
function isPendingInteropSetup(comp) {
	return isSuspenseEnabled && !!comp.asyncDep && !comp.asyncResolved;
}
function registerAfterInteropSetup(comp, pending, register) {
	if (pending) (comp.bm || (comp.bm = [])).push(register);
	else register();
}
function isPendingInteropDirsRoot(comp) {
	if (isPendingInteropSetup(comp)) return true;
	const block = comp.block;
	return isAsyncComponentEnabled && isAsyncWrapper(comp) && isFragment(block) && block.nodes === EMPTY_BLOCK;
}
function innerInteropDirsOwner(state, comp, visit) {
	const owners = state.dirsOwners;
	let owner;
	if (!owners) return;
	getRootElement(comp, {
		excludeSlotOutlets: true,
		onComponent: (comp) => {
			const next = owners.get(comp);
			if (next) {
				owner = next;
				if (visit) visit(next);
			}
		}
	});
	return owner;
}
function settleInteropDirsReceived(instance, state) {
	const received = state.dirsReceived;
	if (!received) return;
	state.dirsReceived = null;
	const active = /* @__PURE__ */ new Set();
	innerInteropDirsOwner(state, instance, (owner) => active.add(owner));
	received.forEach(([owner, vnode]) => {
		if (!active.has(owner)) owner.vnode = vnode;
	});
}
function mountInteropDirsRoot(instance, owner, el) {
	const vnode = owner.carried = owner.vnode;
	owner.el = el;
	invokeInteropDirsHook(instance, el, vnode, "created");
	invokeInteropDirsHook(instance, el, vnode, "beforeMount");
	queueInteropDirsJob(instance, () => invokeInteropDirsHook(instance, el, vnode, "mounted"));
}
function unmountInteropDirs(instance, state, comp) {
	const owners = state.dirsOwners;
	const owner = owners && owners.get(comp);
	if (!owner) return;
	owners.delete(comp);
	if (owner.el) unmountInteropDirsRoot(instance, owner, resolveUnmountSuspense(instance.suspense));
}
function unmountInteropDirsRoot(instance, owner, suspense) {
	const el = owner.el;
	const vnode = owner.carried;
	owner.el = null;
	owner.updating = owner.pending = null;
	invokeInteropDirsHook(instance, el, vnode, "beforeUnmount");
	queueInteropDirsJob(instance, () => invokeInteropDirsHook(instance, el, vnode, "unmounted"), suspense);
}
function updateInteropDirs(instance, state, vnode, prevVNode) {
	if (!state.dirsOwners) return;
	settleInteropDirsReceived(instance, state);
	const owner = innerInteropDirsOwner(state, instance, (owner) => {
		if (owner.comp !== instance) (state.dirsReceived || (state.dirsReceived = [])).push([owner, owner.vnode]);
		owner.vnode = vnode;
	});
	const el = owner && owner.el;
	if (el) invokeInteropDirsHook(instance, el, vnode, "beforeUpdate", prevVNode);
	queueInteropDirsJob(instance, () => {
		settleInteropDirsReceived(instance, state);
		if (!el || owner.el !== el || innerInteropDirsOwner(state, instance) !== owner) return;
		owner.carried = vnode;
		invokeInteropDirsHook(instance, el, vnode, "updated", prevVNode);
	});
}
function isInteropDirsUpdating(state, owner) {
	return !!owner.updating && innerInteropDirsOwner(state, owner.updating) === owner;
}
function beforeInteropDirsSelfUpdate(instance, state, source) {
	const owners = state.dirsOwners;
	const self = owners && owners.get(source);
	if (!self) return;
	if (state.pendingVNodeUpdate && (source === instance || isOnInteropRootChain(instance, source))) return;
	const owner = self.el ? self : innerInteropDirsOwner(state, source);
	if (!owner || !owner.el || isInteropDirsUpdating(state, owner)) return;
	owner.updating = source;
	self.patching = owner;
	invokeInteropDirsHook(instance, owner.el, owner.vnode, "beforeUpdate", owner.pending || owner.carried);
}
function afterInteropDirsSelfUpdate(instance, state, source) {
	const owners = state.dirsOwners;
	const self = owners && owners.get(source);
	const owner = self && self.patching;
	if (!owner) return;
	self.patching = null;
	if (owner.updating !== source) return;
	owner.updating = null;
	if (owner.el && innerInteropDirsOwner(state, source) === owner) {
		const prevVNode = owner.pending || owner.carried;
		owner.pending = null;
		owner.carried = owner.vnode;
		invokeInteropDirsHook(instance, owner.el, owner.vnode, "updated", prevVNode);
	}
}
function invokeInteropVNodeHook(instance, hook, vnode, prevVNode = null) {
	if (hook) invokeVNodeHook(hook, instance.parent, vnode, prevVNode);
}
function queueInteropVNodeHook(instance, hook, vnode, suspense) {
	if (hook) queuePostRenderEffect(() => invokeVNodeHook(hook, instance.parent, vnode), void 0, suspense);
}
function invokeInteropVNodeBeforeUpdate(instance, vnode, prevVNode) {
	invokeInteropVNodeHook(instance, vnode.props && vnode.props.onVnodeBeforeUpdate, vnode, prevVNode);
	if (vnode.ibu) vnode.ibu();
}
function invokeInteropVNodeUpdated(instance, vnode, prevVNode) {
	invokeInteropVNodeHook(instance, vnode.props && vnode.props.onVnodeUpdated, vnode, prevVNode);
	if (vnode.iu) vnode.iu();
}
function updateInteropVNode(instance, state, vnode, prevVNode) {
	state.pendingVNodeUpdate = vnode;
	const rawProps = instance.rawProps = interopRawProps(vnode);
	const prevSub = setActiveSub();
	startBatch();
	try {
		deliverInputs(instance, rawProps);
		instance.rawSlotsRef.value = normalizeInteropSlots(vnode.children);
	} finally {
		try {
			endBatch();
		} finally {
			setActiveSub(prevSub);
		}
	}
	invokeInteropVNodeBeforeUpdate(instance, vnode, prevVNode);
	updateInteropDirs(instance, state, vnode, prevVNode);
	queuePostFlushCb(() => {
		syncVNodeEl(vnode, instance);
		if (state.pendingVNodeUpdate === vnode && !instance.isUpdating) state.pendingVNodeUpdate = null;
	});
	if (vnode.props && vnode.props.onVnodeUpdated || vnode.iu) queuePostRenderEffect(() => invokeInteropVNodeUpdated(instance, vnode, prevVNode), void 0, instance.suspense);
}
const vnodeHookStateMap = /* @__PURE__ */ new WeakMap();
function ensureVNodeHookState(instance, vnode) {
	instance.interopVNode = vnode;
	let state = vnodeHookStateMap.get(instance);
	if (!state) {
		state = {
			vnode,
			pendingVNodeUpdate: null,
			dirsOwners: null,
			dirsReceived: null
		};
		vnodeHookStateMap.set(instance, state);
		(instance.bu || (instance.bu = [])).push(() => {
			if (state.pendingVNodeUpdate) return;
			invokeInteropVNodeBeforeUpdate(instance, state.vnode, state.vnode);
			beforeInteropDirsSelfUpdate(instance, state, instance);
		});
		(instance.u || (instance.u = [])).unshift(() => {
			syncInteropRoot(instance);
			afterInteropDirsSelfUpdate(instance, state, instance);
		});
		instance.u.push(() => {
			if (state.pendingVNodeUpdate) {
				state.pendingVNodeUpdate = null;
				return;
			}
			invokeInteropVNodeUpdated(instance, state.vnode, state.vnode);
		});
	} else state.vnode = vnode;
	return state;
}
function createVNodeChildrenFragment(internals, render, parentComponent) {
	let suspense = currentRenderContext.suspense || parentComponent && parentComponent.suspense;
	const frag = createInteropFragment();
	const content = new InteropContentState();
	frag.isBlockValid = () => content.resolved ? content.valid : true;
	let currentChildren = EMPTY_VNODES;
	let currentParentNode = null;
	let childrenNamespace;
	let currentAnchor = null;
	let isMounted = false;
	let isRenderEffectStarted = false;
	const scope = effectScope();
	const syncResolvedNodes = (children = currentChildren, mounted = true) => {
		const prevValid = content.resolved ? content.valid : true;
		content.valid = !!ensureValidVNode(children);
		if (!mounted || children.length === 0) frag.nodes = EMPTY_BLOCK;
		else if (children.length === 1) frag.nodes = resolveVNodeNodes(children[0]);
		else frag.nodes = children.map((child) => resolveVNodeNodes(child));
		content.resolved = true;
		return prevValid !== content.valid;
	};
	const setChildrenTransition = () => {
		const transition = frag.$transition;
		if (isVaporTransitionHooks(transition)) {
			const { props, state, instance } = transition;
			currentChildren.forEach((vnode) => {
				const hooks = resolveTransitionHooks(vnode, props, state, instance);
				hooks.delayedLeave = transition.delayedLeave;
				setTransitionHooks(vnode, hooks);
			});
		}
	};
	const notifyUpdated = (validityChanged = false) => {
		if (validityChanged && frag.slotBoundary) frag.slotBoundary.markDirty();
		if (isMounted && frag.u) frag.u.forEach((hook) => hook(frag.nodes));
	};
	const notifyBeforeUpdate = () => {
		if (isMounted && frag.bu) frag.bu.forEach((hook) => hook());
	};
	const renderContent = () => {
		const prev = currentInstance;
		simpleSetCurrentInstance(parentComponent);
		try {
			renderEffect(() => {
				withRenderContext(frag.ctx, () => {
					const nextChildren = render();
					notifyBeforeUpdate();
					if (isHydrating$1) {
						nextChildren.forEach((vnode) => hydrateVNode(vnode, parentComponent, frag.slotScopeIds, suspense));
						currentChildren = nextChildren;
						frag.vnode = createVNode(Fragment, null, nextChildren);
						currentParentNode = currentHydrationNode.parentNode;
						childrenNamespace = getContainerType(currentParentNode);
						currentAnchor = currentHydrationNode;
					} else if (!isMounted) {
						currentChildren = nextChildren;
						frag.vnode = createVNode(Fragment, null, nextChildren);
						const wasResolved = content.resolved;
						const validityChanged = syncResolvedNodes(nextChildren, false);
						if (wasResolved) notifyUpdated(validityChanged);
						return;
					} else if (!frag.vnode) {
						currentChildren = nextChildren;
						trackSlotVNodeUpdatesWithRefresh(frag.vnode = createVNode(Fragment, null, nextChildren), () => {
							notifyUpdated(syncResolvedNodes(nextChildren));
						}, notifyBeforeUpdate);
						if (nextChildren.length) {
							setChildrenTransition();
							const prevInstance = currentInstance;
							simpleSetCurrentInstance(null);
							internals.mc(nextChildren, currentParentNode, currentAnchor, parentComponent, suspense, childrenNamespace, frag.slotScopeIds, false);
							simpleSetCurrentInstance(prevInstance);
						}
					} else {
						const nextVNode = createVNode(Fragment, null, nextChildren);
						trackSlotVNodeUpdatesWithRefresh(nextVNode, () => {
							notifyUpdated(syncResolvedNodes(nextChildren));
						}, notifyBeforeUpdate);
						currentChildren = nextChildren;
						setChildrenTransition();
						const prevInstance = currentInstance;
						simpleSetCurrentInstance(null);
						internals.pc(frag.vnode, nextVNode, currentParentNode, currentAnchor, parentComponent, suspense, childrenNamespace, frag.slotScopeIds, false);
						simpleSetCurrentInstance(prevInstance);
						frag.vnode = nextVNode;
					}
					const validityChanged = syncResolvedNodes();
					if (isHydrating$1) {
						if (isMounted && frag.u) frag.u.forEach((hook) => hook(frag.nodes));
					} else notifyUpdated(validityChanged);
				});
			});
		} finally {
			simpleSetCurrentInstance(prev);
		}
	};
	const startRenderEffect = () => {
		if (isRenderEffectStarted) return;
		isRenderEffectStarted = true;
		scope.run(renderContent);
	};
	if (!isHydrating$1) startRenderEffect();
	const place = (parentNode, anchor, parentSuspense, moveType = 2) => {
		if (isHydrating$1) return;
		if (parentSuspense !== void 0) suspense = parentSuspense;
		currentParentNode = parentNode;
		if (!isMounted) {
			currentAnchor = anchor;
			childrenNamespace = getContainerType(parentNode);
			startRenderEffect();
			if (frag.vnode) trackSlotVNodeUpdatesWithRefresh(frag.vnode, () => {
				notifyUpdated(syncResolvedNodes(currentChildren));
			}, notifyBeforeUpdate);
			if (currentChildren.length) {
				setChildrenTransition();
				const prevInstance = currentInstance;
				simpleSetCurrentInstance(null);
				internals.mc(currentChildren, currentParentNode, currentAnchor, parentComponent, suspense, childrenNamespace, frag.slotScopeIds, false);
				simpleSetCurrentInstance(prevInstance);
			}
			syncResolvedNodes();
			isMounted = true;
		} else if (!isHydratingSlotFallback) currentChildren.forEach((vnode) => {
			internals.m(vnode, parentNode, anchor, moveType, parentComponent, suspense);
		});
	};
	frag.insert = (parentNode, anchor, parentSuspense) => place(parentNode, anchor, parentSuspense);
	frag.move = (parentNode, anchor, moveType, _parentComponent, parentSuspense) => place(parentNode, anchor, parentSuspense, moveType);
	frag.remove = (parentNode, transition) => {
		scope.stop();
		if (!isMounted) return;
		const parentSuspense = resolveUnmountSuspense(suspense);
		currentChildren.forEach((vnode) => {
			const hooks = vnode.transition;
			if (hooks && isVaporTransitionHooks(transition)) forwardLeaveHandoff(hooks, transition, () => markLeavingVNode(vnode, transition.state));
			internals.um(vnode, parentComponent, parentSuspense, !!parentNode);
		});
	};
	frag.hydrate = () => {
		if (!isHydrating$1) return;
		startRenderEffect();
		isMounted = true;
	};
	return frag;
}
function isSameResolvedOutput(prev, next) {
	return prev === next || isArray(prev) && isArray(next) && prev.length === next.length && prev.every((node, index) => node === next[index]);
}
function normalizeInteropSlots(rawSlots) {
	if (rawSlots == null) return EMPTY_OBJ;
	if (!isObject(rawSlots) || isArray(rawSlots) || isVNode(rawSlots)) return normalizeInteropDefaultSlot(rawSlots);
	const normalized = createInternalObject();
	for (const key in rawSlots) {
		if (isInternalSlotKey(key)) continue;
		const slot = rawSlots[key];
		if (isFunction(slot)) normalized[key] = slot[rawVaporSlotKey] || slot._n ? slot : normalizeInteropSlot(slot, rawSlots._ctx);
		else if (slot != null) normalized[key] = () => normalizeInteropSlotValue(slot);
	}
	[
		"_",
		"_ctx",
		"$stable"
	].forEach((key) => {
		const descriptor = Object.getOwnPropertyDescriptor(rawSlots, key);
		if (descriptor) Object.defineProperty(normalized, key, descriptor);
	});
	return normalized;
}
const interopSlotCache = /* @__PURE__ */ new WeakMap();
function normalizeInteropSlot(rawSlot, ctx) {
	let cache = interopSlotCache.get(rawSlot);
	if (!cache) interopSlotCache.set(rawSlot, cache = {});
	if (ctx) {
		let ctxCache = cache.ctx;
		if (!ctxCache) cache.ctx = ctxCache = /* @__PURE__ */ new WeakMap();
		const cached = ctxCache.get(ctx);
		if (cached) return cached;
		const normalized = createNormalizedInteropSlot(rawSlot, ctx);
		ctxCache.set(ctx, normalized);
		return normalized;
	}
	if (cache.noCtx) return cache.noCtx;
	return cache.noCtx = createNormalizedInteropSlot(rawSlot, ctx);
}
function createNormalizedInteropSlot(rawSlot, ctx) {
	const normalized = withCtx((...args) => normalizeInteropSlotValue(rawSlot(...args)), ctx);
	normalized._c = false;
	return normalized;
}
function normalizeInteropDefaultSlot(value) {
	const normalized = createInternalObject();
	const normalizedValue = normalizeInteropSlotValue(value);
	normalized.default = () => normalizedValue;
	return normalized;
}
function normalizeInteropSlotValue(value) {
	return isArray(value) ? value.map((child) => normalizeVNode(child)) : [normalizeVNode(value)];
}
const isInternalSlotKey = (key) => key === "_" || key === "_ctx" || key === "$stable" || key === "$";
const interopSlotsSourceHandlers = {
	get(target, key) {
		const slots = target.value;
		return slots && slots[key];
	},
	has(target, key) {
		const slots = target.value;
		return !!slots && key in slots;
	},
	ownKeys(target) {
		const slots = target.value;
		return slots ? Object.keys(slots).filter((key) => !isInternalSlotKey(key)) : EMPTY_ARR;
	},
	getOwnPropertyDescriptor(target, key) {
		const slots = target.value;
		const descriptor = slots && Object.getOwnPropertyDescriptor(slots, key);
		if (descriptor && descriptor.enumerable && !isInternalSlotKey(key)) return {
			enumerable: true,
			configurable: true,
			value: descriptor.value
		};
	}
};
function createInteropRawSlots(slotsRef) {
	return {
		$: [new Proxy(slotsRef, interopSlotsSourceHandlers)],
		[interopSlotsKey]: slotsRef
	};
}
const interopRootSyncProducers = /* @__PURE__ */ new WeakMap();
function registerInteropRootSync(instance, frag) {
	if (interopRootSyncProducers.get(frag) === instance) return;
	interopRootSyncProducers.set(frag, instance);
	(frag.u || (frag.u = [])).push(() => syncInteropRoot(instance));
}
function registerInteropRootRerenderSync(instance, comp) {
	if (interopRootSyncProducers.get(comp) === instance) return;
	interopRootSyncProducers.set(comp, instance);
	(comp.hmrRootHooks || (comp.hmrRootHooks = [])).push(() => syncInteropRoot(instance));
}
const interopDirsProducers = /* @__PURE__ */ new WeakSet();
function registerInteropDirsFragment(instance, state, frag, inherit) {
	registerInteropRootSync(instance, frag);
	if (interopDirsProducers.has(frag)) return;
	interopDirsProducers.add(frag);
	let reactivated = null;
	(frag.bu || (frag.bu = [])).push(() => {
		if (inherit.el && inherit.el === getRootElement(frag.nodes)) unmountInteropDirsRoot(instance, inherit);
	});
	(frag.bm || (frag.bm = [])).push((nodes) => {
		if (!inherit.vnode.dirs || !isOnInteropRootChain(inherit.comp, frag)) return;
		const [owner, el] = resolveInteropDirsRoot(instance, state, nodes, inherit);
		if (!el) return;
		if (owner.el === el) {
			if (!owner.pending) owner.pending = owner.carried;
			reactivated = owner;
		} else mountInteropDirsRoot(instance, owner, el);
	});
	(frag.u || (frag.u = [])).push(() => {
		settleInteropDirsReceived(instance, state);
		const owner = reactivated;
		reactivated = null;
		if (!owner || !owner.el || !owner.pending || isInteropDirsUpdating(state, owner)) return;
		owner.updating = owner.comp;
		owner.patching = owner;
		invokeInteropDirsHook(instance, owner.el, owner.vnode, "beforeUpdate", owner.pending);
		queueInteropDirsJob(instance, () => afterInteropDirsSelfUpdate(instance, state, owner.comp));
	});
}
function registerInteropDirsComponent(instance, state, comp) {
	if (!!!(process.env.NODE_ENV !== "production") && comp === instance || interopDirsProducers.has(comp)) return;
	interopDirsProducers.add(comp);
	if (!!(process.env.NODE_ENV !== "production")) {
		(comp.hmrRootHooks || (comp.hmrRootHooks = [])).push(() => {
			const owners = state.dirsOwners;
			const owner = owners && owners.get(comp);
			if (!owner) return;
			if (owner.el) unmountInteropDirsRoot(instance, owner);
			if (!owner.vnode.dirs) return;
			const [inner, el] = resolveInteropDirsRoot(instance, state, comp.block, owner);
			if (el) {
				const vnode = inner.vnode;
				inner.vnode = extend$1({}, vnode, {
					el,
					transition: null
				});
				mountInteropDirsRoot(instance, inner, el);
				inner.vnode = inner.carried = vnode;
			}
		});
		if (comp === instance) return;
	}
	const pending = isPendingInteropSetup(comp);
	registerAfterInteropSetup(comp, pending, () => {
		(comp.bu || (comp.bu = [])).push(() => beforeInteropDirsSelfUpdate(instance, state, comp));
		(comp.u || (comp.u = [])).unshift(() => afterInteropDirsSelfUpdate(instance, state, comp));
		(comp.bum || (comp.bum = [])).push(() => unmountInteropDirs(instance, state, comp));
		if (pending) (comp.bm || (comp.bm = [])).push(() => {
			const owners = state.dirsOwners;
			const owner = owners && owners.get(comp);
			if (!owner || owner.el || !owner.vnode.dirs) return;
			const [inner, el] = resolveInteropDirsRoot(instance, state, comp.block, owner);
			if (el) mountInteropDirsRoot(instance, inner, el);
		});
	});
}
function isOnInteropRootChain(from, producer) {
	let found = false;
	getRootElement(from, {
		excludeSlotOutlets: true,
		onDynamicFragment: (frag) => frag === producer && (found = true),
		onComponent: (comp) => comp === producer && (found = true)
	});
	return found;
}
/**
* Stores the vnode-derived root-only ids on the instance. Metadata only:
* mountComponent and dynamic branch renders apply them pre-insert to roots
* that mount afterwards; kept roots keep their mount-time ids (VDOM parity).
*/
function setInteropComponentScopeIds(instance, vnode) {
	instance.scopeId = vnode.scopeId;
	const inherited = getInheritedScopeIds(vnode, instance.parent);
	instance.slotScopeIds = concatInteropScopeIds(vnode.slotScopeIds, inherited.length ? inherited : null);
}
function concatInteropScopeIds(base, own) {
	return base ? own && own.length && own !== base ? base.concat(own) : base : own || null;
}
/**
* Publishes root-only ids onto the interop vnode backing a vapor component's
* effective root, for core to apply at its own pre-insertion mount. A nested
* component crossed during the descent re-collects canonically — its climb
* carries every ancestor's contribution — superseding the caller's subset.
*/
function publishVaporScopeIds(block, scopeIds) {
	let currentScopeIds = scopeIds;
	getRootElement(block, {
		onComponent: (instance) => {
			currentScopeIds = collectRootScopeIds(instance) || [];
		},
		onInteropFragment: (frag) => {
			if (frag.vnode) {
				setVNodeVaporScopeIds(frag.vnode, currentScopeIds);
				return true;
			}
		},
		excludeSlotOutlets: true
	});
}
function setVNodeVaporScopeIds(vnode, scopeIds) {
	vnode.vaporScopeIds = scopeIds;
	if (vnode.ssContent) setVNodeVaporScopeIds(vnode.ssContent, scopeIds);
	if (vnode.ssFallback) setVNodeVaporScopeIds(vnode.ssFallback, scopeIds);
}
function getInteropVaporSlotScopeIds(contextSlotScopeIds, own, inherited) {
	return concatInteropScopeIds(concatInteropScopeIds(contextSlotScopeIds, own), inherited.length ? inherited : null);
}
function getEnclosingOutletScopeIds(context, innerIds, inherited) {
	const kept = context && innerIds ? context.slice(0, -innerIds) : context;
	return getInteropVaporSlotScopeIds(kept && kept.length ? kept : null, null, inherited);
}
function interopHasVDOMContent() {
	return !!this.vnode;
}
function interopSetKey(key) {
	if (this.vnode) this.vnode.key = key;
}
function interopGetTransitionType() {
	return this.vnode ? getInteropTransitionType(this.vnode) : void 0;
}
function interopGetTransitionElement() {
	return this.vnode ? getInteropTransitionElement(this.vnode) : void 0;
}
function createInteropFragment(nodes = EMPTY_BLOCK, vnode = null, extraFlags = 0) {
	const frag = new RenderContextFragment(nodes, 64 | extraFlags);
	frag.vnode = vnode;
	frag.hasVDOMContent = interopHasVDOMContent;
	frag.setKey = interopSetKey;
	frag.getTransitionType = interopGetTransitionType;
	frag.getTransitionElement = interopGetTransitionElement;
	return frag;
}
//#endregion
//#region packages/runtime-vapor/src/components/Teleport.ts
const VaporTeleportImpl = {
	name: "VaporTeleport",
	__isTeleport: true,
	__vapor: true,
	process(props, slots, adoptAnchor) {
		return new TeleportFragment(props, slots, adoptAnchor);
	}
};
var TeleportFragment = class extends RenderContextFragment {
	constructor(props, slots, adoptAnchor) {
		super([], 32);
		this.childrenInitialized = false;
		this.childrenScope = getCurrentScope();
		this.mountState = { location: 0 };
		this.dispose = () => {
			const scope = this.scope;
			if (scope) {
				this.scope = void 0;
				scope.stop();
			}
			const mountState = this.mountState;
			if (this.nodes && mountState.location === 1) {
				remove(this.nodes, mountState.container);
				this.nodes = [];
			}
			this.disposeTarget();
			this.mountState = { location: 0 };
		};
		this.hydrate = () => {
			if (!isHydrating$1) return;
			const target = this.target = resolveTarget(this.resolvedProps, querySelector);
			const disabled = isTeleportDisabled(this.resolvedProps);
			this.placeholder = currentHydrationNode;
			if (target) {
				const targetNode = target._lpa || target.firstChild;
				if (disabled) this.hydrateDisabledTeleport(target, targetNode);
				else {
					this.anchor = claimAnchor(locateTeleportEndAnchor(currentHydrationNode.nextSibling));
					this.hydrateTargetAnchors(target, targetNode);
					this.mountState = {
						location: 2,
						container: target,
						anchor: this.targetAnchor || null
					};
					if (targetNode) setCurrentHydrationNode(targetNode.nextSibling);
					if (!this.targetAnchor) this.mountChildren(target);
					else this.initChildren();
				}
			} else if (disabled) this.hydrateDisabledTeleport(null, null);
			else this.anchor = claimAnchor(locateTeleportEndAnchor(currentHydrationNode.nextSibling));
			advanceHydrationNode(this.anchor);
		};
		this.rawSlots = slots;
		this.anchor = isHydrating$1 ? void 0 : resolveFragmentAnchor(adoptAnchor, "teleport end");
		const propsProxy = new Proxy(props, rawPropsProxyHandlers);
		renderEffect(() => {
			const prevTo = this.resolvedProps && this.resolvedProps.to;
			const wasDisabled = this.isDisabled;
			this.resolvedProps = extend$1({}, propsProxy);
			this.isDisabled = isTeleportDisabled(this.resolvedProps);
			if (wasDisabled !== this.isDisabled || !this.isDisabled && prevTo !== this.resolvedProps.to) this.handlePropsUpdate();
		});
	}
	get parent() {
		return this.anchor ? /* @__PURE__ */ parentNode(this.anchor) : null;
	}
	get scopeOwner() {
		return this.ctx.slotOwner || this.renderInstance;
	}
	initChildren() {
		const instance = this.renderInstance;
		const prevInstance = setCurrentInstance(instance, this.childrenScope);
		const prevUpdating = instance ? instance.isUpdating : false;
		if (instance) instance.isUpdating = true;
		try {
			this.childrenInitialized = true;
			renderEffect(() => withRenderContext(this.ctx, () => {
				const prevScope = this.scope;
				if (prevScope) prevScope.stop();
				const scope = this.scope = new EffectScope();
				this.handleChildrenUpdate(scope.run(() => this.rawSlots && this.rawSlots.default ? this.rawSlots.default() : []) || []);
			}));
			const owner = this.scopeOwner;
			if (owner && owner.applyCssVars) registerCssVarOutlet(owner, this);
			this.bindChildren(this.nodes);
		} finally {
			if (instance) instance.isUpdating = prevUpdating;
			restoreCurrentInstance(prevInstance);
		}
	}
	ensureChildrenInitialized() {
		if (!this.childrenInitialized) this.initChildren();
	}
	bindChildren(block) {
		const owner = this.scopeOwner;
		if (owner && owner.applyCssVars) owner.applyCssVars(block);
	}
	handleChildrenUpdate(children) {
		const mountState = this.mountState;
		if (isHydrating$1 || !this.parent || mountState.location === 0) {
			this.nodes = children;
			return;
		}
		remove(this.nodes, mountState.container);
		this.nodes = children;
		this.bindChildren(children);
		insert(children, mountState.container, mountState.anchor);
	}
	mount(parent, anchor, location) {
		if (isTransitionEnabled && this.$transition && this.mountState.location === 0) applyTransitionHooks(this.nodes, this.$transition, this);
		if (this.mountState.location !== 0) move(this.nodes, parent, anchor, 2);
		else insert(this.nodes, parent, anchor);
		this.mountState = {
			location,
			container: parent,
			anchor
		};
	}
	prepareTargetAnchors(target) {
		if (!this.targetAnchor || /* @__PURE__ */ parentNode(this.targetAnchor) !== target) {
			if (this.targetStart) remove(this.targetStart, /* @__PURE__ */ parentNode(this.targetStart));
			if (this.targetAnchor) remove(this.targetAnchor, /* @__PURE__ */ parentNode(this.targetAnchor));
			insert(this.targetStart = /* @__PURE__ */ createTextNode(""), target);
			insert(this.targetAnchor = /* @__PURE__ */ createTextNode(""), target);
		}
	}
	prepareTarget() {
		const target = this.target = resolveTarget(this.resolvedProps, querySelector);
		if (target) this.prepareTargetAnchors(target);
		return target;
	}
	queueTargetUpdate() {
		if (!this.mountToTargetJob || this.mountToTargetJob.flags & 4) this.mountToTargetJob = () => {
			this.mountToTargetJob = void 0;
			if (!this.anchor) return;
			if (this.isDisabled) {
				if (!this.targetAnchor) this.prepareTarget();
			} else this.mountToTarget();
		};
		queuePostRenderEffect(this.mountToTargetJob, void 0, this.parentSuspense !== void 0 ? this.parentSuspense : isSuspenseEnabled && this.ctx.suspense || null);
	}
	mountToTarget() {
		const target = this.prepareTarget();
		if (target) {
			this.ensureChildrenInitialized();
			this.mount(target, this.targetAnchor, 2);
			this.cancelMountToTarget();
		} else if (!!(process.env.NODE_ENV !== "production")) warn(`Invalid Teleport target on ${this.targetAnchor ? "update" : "mount"}:`, target, `(${typeof target})`);
	}
	handlePropsUpdate() {
		if (!this.parent || isHydrating$1) return;
		if (this.isDisabled) {
			this.ensureChildrenInitialized();
			this.mount(this.parent, this.anchor, 1);
			if (!this.targetAnchor) {
				if (isTeleportDeferred(this.resolvedProps) || !this.parent.isConnected) this.queueTargetUpdate();
				else this.prepareTarget();
			}
		} else if (isTeleportDeferred(this.resolvedProps) || !this.parent.isConnected) this.queueTargetUpdate();
		else this.mountToTarget();
	}
	insert(container, anchor, parentSuspense) {
		if (isHydrating$1) return;
		if (parentSuspense !== void 0) this.parentSuspense = parentSuspense;
		const wasMountedInTarget = this.mountState.location === 2;
		if (!this.placeholder) this.placeholder = !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ createComment("teleport start") : /* @__PURE__ */ createTextNode();
		insert(this.placeholder, container, anchor);
		insert(this.anchor, container, anchor);
		if (!wasMountedInTarget) this.handlePropsUpdate();
	}
	move(container, anchor, _moveType, _parentComponent, parentSuspense) {
		this.insert(container, anchor, parentSuspense);
	}
	cancelMountToTarget() {
		if (this.mountToTargetJob) {
			this.mountToTargetJob.flags |= 4;
			this.mountToTargetJob = void 0;
		}
	}
	disposeTarget() {
		this.cancelMountToTarget();
		const mountState = this.mountState;
		if (this.nodes && mountState.location === 2) {
			const targetParent = this.targetStart && /* @__PURE__ */ parentNode(this.targetStart) || this.targetAnchor && /* @__PURE__ */ parentNode(this.targetAnchor) || void 0;
			remove(this.nodes, targetParent);
			this.nodes = [];
			this.mountState = { location: 0 };
		}
		if (this.targetStart) {
			remove(this.targetStart, /* @__PURE__ */ parentNode(this.targetStart));
			this.targetStart = void 0;
		}
		if (this.targetAnchor) {
			remove(this.targetAnchor, /* @__PURE__ */ parentNode(this.targetAnchor));
			this.targetAnchor = void 0;
		}
		this.target = void 0;
	}
	scheduleTargetDispose() {
		this.cancelMountToTarget();
		queuePostFlushCb(() => this.disposeTarget());
	}
	remove() {
		this.dispose();
		if (this.anchor) {
			remove(this.anchor, /* @__PURE__ */ parentNode(this.anchor));
			this.anchor = void 0;
		}
		if (this.placeholder) {
			remove(this.placeholder, /* @__PURE__ */ parentNode(this.placeholder));
			this.placeholder = void 0;
		}
	}
	hydrateTargetAnchors(target, targetNode) {
		if (!isHydrating$1) return;
		let targetAnchor = targetNode;
		while (targetAnchor) {
			if (targetAnchor.nodeType === 8) {
				if (targetAnchor.data === "teleport start anchor") this.targetStart = targetAnchor;
				else if (targetAnchor.data === "teleport anchor") {
					this.targetAnchor = claimAnchor(targetAnchor);
					target._lpa = this.targetAnchor.nextSibling;
					break;
				}
			}
			targetAnchor = targetAnchor.nextSibling;
		}
	}
	hydrateDisabledTeleport(target, targetNode) {
		if (!isHydrating$1) return;
		let nextNode = this.placeholder.nextSibling;
		setCurrentHydrationNode(nextNode);
		this.anchor = claimAnchor(locateTeleportEndAnchor(nextNode));
		this.mountState = {
			location: 1,
			container: /* @__PURE__ */ parentNode(this.anchor),
			anchor: this.anchor
		};
		if (target) this.hydrateTargetAnchors(target, targetNode);
		else {
			this.targetStart = targetNode;
			this.targetAnchor = targetNode && targetNode.nextSibling;
		}
		this.initChildren();
	}
	mountChildren(target) {
		if (!isHydrating$1) return;
		target.appendChild(this.targetStart = /* @__PURE__ */ createTextNode(""));
		target.appendChild(this.targetAnchor = claimAnchor(/* @__PURE__ */ createTextNode("")));
		this.mountState = {
			location: 2,
			container: target,
			anchor: this.targetAnchor
		};
		if (!isMismatchAllowed(target, 1)) {
			if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) warn(`Hydration children mismatch on`, target, `\nServer rendered element contains fewer child nodes than client nodes.`);
			logMismatchError();
		}
		runWithoutHydration(this.initChildren.bind(this));
	}
};
const VaporTeleport = /*@__PURE__*/ enableTeleport(VaporTeleportImpl);
function locateTeleportEndAnchor(node = currentHydrationNode) {
	let depth = 0;
	while (node) {
		if (isComment(node, "teleport start")) depth++;
		else if (isComment(node, "teleport end")) {
			if (depth === 0) return node;
			else depth--;
		}
		node = node.nextSibling;
	}
	return null;
}
//#endregion
//#region packages/runtime-vapor/src/apiDefineCustomElement.ts
const vaporCustomElementHydrates = /* @__PURE__ */ new WeakMap();
/*@__NO_SIDE_EFFECTS__*/
function defineVaporCustomElement(options, extraOptions, _createApp, _hydrate) {
	let Comp = /* @__PURE__ */ defineVaporComponent(options, extraOptions);
	if (isPlainObject(Comp)) Comp = extend$1({}, Comp, extraOptions);
	class VaporCustomElement extends VaporElement {
		constructor(initialProps) {
			super(Comp, initialProps, _createApp);
		}
	}
	VaporCustomElement.def = Comp;
	if (_hydrate) vaporCustomElementHydrates.set(VaporCustomElement, _hydrate);
	return VaporCustomElement;
}
const defineVaporSSRCustomElement = ((options, extraOptions) => {
	return /* @__PURE__ */ defineVaporCustomElement(options, extraOptions, createVaporSSRApp, withHydration);
});
var VaporElement = class extends VueElementBase {
	constructor(def, props = {}, createAppFn = createVaporApp) {
		super(def, /* @__PURE__ */ shallowReactive(props), createAppFn);
	}
	_needsHydration() {
		const hydrate = vaporCustomElementHydrates.get(this.constructor);
		if (this.shadowRoot && hydrate) return true;
		else if (!!(process.env.NODE_ENV !== "production") && this.shadowRoot) warn("Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineVaporSSRCustomElement`.");
		return false;
	}
	_mount(def) {
		if ((!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) && !def.name) def.name = "VaporElement";
		this._app = this._createApp(this._def);
		this._inheritParentContext();
		if (this._def.configureApp) this._def.configureApp(this._app);
		const hydrate = vaporCustomElementHydrates.get(this.constructor);
		if (this.shadowRoot && hydrate) hydrate(this._root, this._createComponent.bind(this));
		else this._createComponent();
		this._app.mount(this._root);
	}
	_update() {}
	_unmount() {
		if (this._app) this._app.unmount();
		if (this._instance && this._instance.ce) this._instance.ce = void 0;
		this._app = this._instance = null;
	}
	_createComponent() {
		const ce = (instance) => {
			this._app._ceComponent = this._instance = instance;
			this._processInstance();
		};
		createComponent(this._def, { $: [() => this._props] }, this.shadowRoot ? void 0 : this._createSlots(), void 0, void 0, this._app._context, true, ce);
	}
	/**
	* Only called when shadowRoot is false. The light DOM children parsed on
	* connect become static slots, so `<slot/>` outlets render them in place
	* through the normal slot pipeline instead of a native outlet that has to
	* be replaced after mount.
	*/
	_createSlots() {
		const parsed = this._slots;
		if (!parsed) return;
		const scopeId = this._def.__scopeId;
		let slots;
		for (const name in parsed) {
			const nodes = parsed[name];
			if (scopeId) {
				const id = scopeId + "-s";
				for (const n of nodes) if (n.nodeType === 1) {
					n.setAttribute(id, "");
					const walker = document.createTreeWalker(n, 1);
					let child;
					while (child = walker.nextNode()) child.setAttribute(id, "");
				}
			}
			(slots || (slots = {}))[name] = () => nodes;
		}
		return slots;
	}
};
//#endregion
//#region packages/runtime-vapor/src/dom/template.ts
function cloneTemplate(n) {
	const scopeIds = currentRenderContext.slotScopeIds;
	return scopeIds ? cloneStampedTemplate(n, scopeIds) : n.cloneNode(true);
}
/*@__NO_SIDE_EFFECTS__*/
function template(html, flags = 0, ns) {
	const root = !!(flags & 1);
	const isStatic = !!(flags & 2);
	let node;
	let adoptTarget;
	let rootMeta;
	const createRootMeta = () => {
		let cls;
		let sty;
		let resolved = false;
		const resolve = () => {
			resolved = true;
			if (html.includes(" class=") || html.includes(" style=")) {
				const el = node || (node = parseTemplate(html, ns));
				if (el.classList.length) cls = Array.from(el.classList);
				const style = el.getAttribute("style");
				if (style) sty = parseStringStyle(style);
			}
		};
		return {
			get cls() {
				resolved || resolve();
				return cls;
			},
			get sty() {
				resolved || resolve();
				return sty;
			}
		};
	};
	return () => {
		let hydrationCursor = null;
		if (insertionParent) {
			if (isHydrating$1) hydrationCursor = enterHydrationCursor(void 0, (adoptTarget || (adoptTarget = parseAdoptTarget(html))).blank);
			else resetInsertionState();
		}
		if (isHydrating$1) {
			let adopted = null;
			const target = isStatic && !isComment(currentHydrationNode, "") ? resolveHydrationTarget(currentHydrationNode) : null;
			if (target && !isClaimedAnchor(target)) {
				adopted = target;
				if (html !== "") {
					if (html[0] !== "<") {
						if (!hydrateTextNode(adopted, html) && (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__)) validateHydrationTarget(adopted, html);
					} else if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) validateHydrationTarget(adopted, html);
				}
				if (!node && !html) node = adopted.cloneNode(true);
				advanceHydrationNode(adopted);
			} else adopted = adoptTemplate(currentHydrationNode, html, false, ns, adoptTarget || (adoptTarget = parseAdoptTarget(html)));
			if (root) adopted.$root = rootMeta || (rootMeta = createRootMeta());
			exitHydrationCursor(hydrationCursor);
			return adopted;
		}
		if (!node && html[0] !== "<") return /* @__PURE__ */ createTextNode(html);
		let prototype = node || (node = parseTemplate(html, ns));
		if (flags & 768) {
			const ids = flags & 512 ? getUniScopeIds() : getPageScopeIds();
			if (ids) prototype = getStampedTemplate(prototype, ids);
		}
		const ret = cloneTemplate(prototype);
		if (root) ret.$root = rootMeta || (rootMeta = createRootMeta());
		return ret;
	};
}
//#endregion
//#region packages/runtime-vapor/src/apiCreateIf.ts
function createIf(condition, b1, b2, flags = 1) {
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	if (!isHydrating$1) resetInsertionState();
	let hydrationCursor = null;
	let branchShape;
	let anchor;
	let frag;
	if (flags & 16) {
		const ok = condition();
		let claim;
		if (isHydrating$1) {
			branchShape = decodeIfShape(flags, ok);
			claim = branchShape === 2 ? createFragmentClaim() : void 0;
			hydrationCursor = enterHydrationCursor(claim);
		}
		if (isHydrating$1 && !ok && !b2) {
			const placeholder = new DynamicFragment(256, !!(process.env.NODE_ENV !== "production") ? "if" : void 0);
			placeholder.hydrationClaim = claim;
			hydrateDynamicFragmentAnchor(placeholder, true);
			frag = [placeholder.anchor];
		} else frag = ok ? b1() : b2 ? b2() : [claimUntrackedAnchor(!!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ createComment("if") : /* @__PURE__ */ createTextNode())];
		if (isHydrating$1 && claim && claim.start) advanceHydrationNode(locateEndAnchor(claim.start));
	} else {
		const index = flags >> 8;
		const keyed = index > 0;
		const keyBase = keyed ? (index - 1) * 2 : 0;
		const trackSlotBoundary = !!(flags & 128);
		const dynamicFragment = new DynamicFragment(256, !!(process.env.NODE_ENV !== "production") ? "if" : void 0, keyed, trackSlotBoundary, _insertionAnchor);
		anchor = dynamicFragment.anchor;
		frag = dynamicFragment;
		renderEffect(() => {
			const ok = condition();
			if (isHydrating$1) {
				branchShape = decodeIfShape(flags, ok);
				dynamicFragment.hydrationClaim = branchShape === 2 ? createFragmentClaim() : void 0;
				hydrationCursor = enterHydrationCursor(dynamicFragment.hydrationClaim);
			}
			dynamicFragment.update(ok ? b1 : b2, keyed ? keyBase + (ok ? 0 : 1) : void 0, isNoScopeBranch(flags, ok));
		});
	}
	if (isHydrating$1 && branchShape === 0 && hydrationCursor) {
		const start = hydrationCursor.start;
		if (start && currentHydrationNode === start && isComment(start, "")) advanceHydrationNode(start);
	}
	finishBlockCreation(frag, anchor, hydrationCursor, _insertionParent, _insertionAnchor);
	return frag;
}
function decodeIfShape(shape, ok) {
	return shape >> (ok ? 0 : 2) & 3;
}
function isNoScopeBranch(flags, ok) {
	return !!(flags & (ok ? 32 : 64));
}
//#endregion
//#region packages/runtime-vapor/src/apiCreateFragment.ts
/**
* Create a dynamic fragment keyed by a reactive value for Vapor transitions.
* The fragment is re-rendered when the key changes to trigger enter/leave
* animations.
*
* Example:
* <VaporTransition>
*   <h1 :key="count">{{ count }}</h1>
* </VaporTransition>
*/
function createKeyedFragment(key, render, trackSlotBoundary = false) {
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	if (!isHydrating$1) resetInsertionState();
	const hydrationCursor = isHydrating$1 ? captureHydrationCursor() : null;
	const frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "keyed" : void 0, true, trackSlotBoundary, _insertionAnchor);
	if (isHydrating$1) locateHydrationNode();
	renderEffect(() => frag.update(render, key()));
	finishBlockCreation(frag, frag.anchor, hydrationCursor, _insertionParent, _insertionAnchor);
	return frag;
}
//#endregion
//#region packages/runtime-vapor/src/apiCreateFor.ts
const createFor = (src, renderItem, getKey, flags = 0) => {
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	const _insertionIndex = insertionIndex;
	let hydrationCursor = null;
	let hydrationClaim;
	if (isHydrating$1) {
		hydrationClaim = createFragmentClaim();
		hydrationCursor = enterHydrationCursor(hydrationClaim);
	} else resetInsertionState();
	let isMounted = false;
	let oldBlocks = [];
	let newBlocks;
	let newKeys;
	let parent;
	let held = false;
	let parentAnchor;
	if (!isHydrating$1) {
		parentAnchor = resolveFragmentAnchor(_insertionAnchor, "for");
		if (parentAnchor === _insertionAnchor) parent = parentAnchor.parentNode;
	}
	const slotBoundary = flags & 32 ? currentRenderContext.slotBoundary : null;
	const frag = new ForFragment(oldBlocks);
	const instance = currentInstance;
	const isComponent = !!(flags & 2);
	const canUseFastRemove = !!(flags & 1) && !isComponent;
	const isSingleNode = !!(flags & 8);
	const isFragment = !!(flags & 16);
	const wrappedRows = !!(flags & 64);
	const ctx = currentRenderContext;
	if (!!(process.env.NODE_ENV !== "production") && !instance) warn("createFor() can only be used inside setup()");
	onScopeDispose(() => {
		stopBlockScopes$1(oldBlocks);
		if (newBlocks && newBlocks !== oldBlocks) stopBlockScopes$1(newBlocks);
		oldBlocks = [];
		newBlocks = [];
	}, true);
	const renderList = () => {
		const source = normalizeSource$1(src());
		const sourceKeys = source.keys;
		const newLength = source.values.length;
		const oldLength = oldBlocks.length;
		newBlocks = new Array(newLength);
		newKeys = void 0;
		if (getKey) {
			newKeys = new Array(newLength);
			for (let i = 0; i < newLength; i++) {
				const value = getItemValue$1(source, i);
				newKeys[i] = sourceKeys ? getKey(value, sourceKeys[i], i) : getKey(value, i, void 0);
			}
		}
		const prevSub = setActiveSub();
		const wasMounted = isMounted;
		let wasValid;
		if (wasMounted && slotBoundary) wasValid = isValidSlot(frag);
		if (wasMounted && frag.bu) for (let i = 0; i < frag.bu.length; i++) frag.bu[i]();
		if (!wasMounted) {
			isMounted = true;
			if (isHydrating$1) hydrateList(source, newLength);
			else mountAll(source, newLength);
		} else {
			parent = parentAnchor.parentNode;
			held = isTransitionEnabled && !!slotBoundary && slotBoundary.isHolding();
			if (!oldLength) mountAll(source, newLength);
			else if (!newLength) {
				if (frag.resetListeners) for (const fn of frag.resetListeners) fn();
				const doRemove = !canUseFastRemove;
				for (let i = 0; i < oldLength; i++) unmount(oldBlocks[i], doRemove);
				if (canUseFastRemove) {
					parent.textContent = "";
					parent.appendChild(parentAnchor);
				}
			} else if (!getKey) {
				const commonLength = Math.min(newLength, oldLength);
				for (let i = 0; i < commonLength; i++) updateAt(newBlocks[i] = oldBlocks[i], source, i);
				for (let i = oldLength; i < newLength; i++) mount(source, i, parentAnchor);
				for (let i = newLength; i < oldLength; i++) unmount(oldBlocks[i]);
			} else {
				if (!!(process.env.NODE_ENV !== "production")) {
					const keyToIndexMap = /* @__PURE__ */ new Map();
					for (let i = 0; i < newLength; i++) {
						const key = newKeys[i];
						if (key != null) {
							if (keyToIndexMap.has(key)) warn(`Duplicate keys found during update:`, JSON.stringify(key), `Make sure keys are unique.`);
							keyToIndexMap.set(key, i);
						}
					}
				}
				const commonLength = Math.min(oldLength, newLength);
				let endOffset = 0;
				while (endOffset < commonLength) {
					const index = newLength - endOffset - 1;
					const key = newKeys[index];
					const existingBlock = oldBlocks[oldLength - endOffset - 1];
					if (existingBlock.key !== key) break;
					updateAt(existingBlock, source, index);
					newBlocks[index] = existingBlock;
					endOffset++;
				}
				const e1 = commonLength - endOffset;
				const e2 = oldLength - endOffset;
				const e3 = newLength - endOffset;
				const queuedIndices = [];
				const oldKeyIndexMap = /* @__PURE__ */ new Map();
				for (let i = 0; i < e1; i++) {
					const currentKey = newKeys[i];
					const oldBlock = oldBlocks[i];
					if (oldBlock.key === currentKey) updateAt(newBlocks[i] = oldBlock, source, i);
					else {
						queuedIndices.push(i);
						oldKeyIndexMap.set(oldBlock.key, i);
					}
				}
				for (let i = e1; i < e2; i++) oldKeyIndexMap.set(oldBlocks[i].key, i);
				for (let i = e1; i < e3; i++) queuedIndices.push(i);
				let queuedLength = queuedIndices.length;
				let sources = EMPTY_ARR;
				let mountCounter = 0;
				let pureInsert = false;
				if (oldKeyIndexMap.size === 0) {
					mountCounter = queuedLength;
					pureInsert = true;
				} else {
					sources = new Array(queuedLength);
					for (let q = queuedLength - 1; q >= 0; q--) {
						const index = queuedIndices[q];
						const key = newKeys[index];
						const oldIndex = oldKeyIndexMap.get(key);
						if (oldIndex !== void 0) {
							oldKeyIndexMap.delete(key);
							const reusedBlock = newBlocks[index] = oldBlocks[oldIndex];
							updateAt(reusedBlock, source, index);
							sources[q] = oldIndex + 1;
						} else {
							sources[q] = 0;
							mountCounter++;
						}
					}
				}
				const useFastRemove = mountCounter === newLength;
				if (useFastRemove && frag.resetListeners) for (const fn of frag.resetListeners) fn();
				if (oldKeyIndexMap.size) for (const leftoverIndex of oldKeyIndexMap.values()) unmount(oldBlocks[leftoverIndex], !(useFastRemove && canUseFastRemove));
				if (useFastRemove && canUseFastRemove) {
					parent.textContent = "";
					parent.appendChild(parentAnchor);
				}
				let sequence;
				const hasReuse = mountCounter !== queuedLength;
				if (hasReuse) {
					sequence = planMoves$1(queuedIndices, sources, e2, e3);
					queuedLength = queuedIndices.length;
				}
				const allKept = hasReuse && sequence === void 0;
				let sequenceEnd = sequence ? sequence.length - 1 : -1;
				let scanFrom = newLength;
				let cachedAnchor;
				for (let q = queuedLength - 1; q >= 0; q--) {
					const index = queuedIndices[q];
					let isKept = allKept && sources[q] !== 0;
					if (sequenceEnd >= 0 && sequence[sequenceEnd] === q) {
						sequenceEnd--;
						isKept = sources[q] !== 0;
					}
					if (isKept) continue;
					let anchorNode;
					for (let i = index + 1; i < scanFrom; i++) {
						const node = getBlockFirstNode(newBlocks[i].nodes);
						if (node && node.parentNode === parent) {
							anchorNode = node;
							break;
						}
					}
					if (anchorNode === void 0) {
						if (cachedAnchor === void 0) cachedAnchor = parentAnchor;
						anchorNode = cachedAnchor;
					}
					scanFrom = index + 1;
					cachedAnchor = anchorNode;
					if (pureInsert) {
						for (let i = 0; i < queuedLength; i++) mount(source, queuedIndices[i], anchorNode);
						break;
					}
					const block = newBlocks[index];
					if (block !== void 0) {
						if (!held) move(block.nodes, parent, anchorNode, 2);
					} else mount(source, index, anchorNode);
				}
			}
		}
		oldBlocks = newBlocks;
		frag.nodes = parentAnchor ? [newBlocks, parentAnchor] : [newBlocks];
		if (wasMounted && slotBoundary && isValidSlot(frag) !== wasValid) slotBoundary.markDirty();
		if (wasMounted && frag.u) for (const fn of frag.u) fn(frag.nodes);
		setActiveSub(prevSub);
	};
	const needKey = renderItem.length > 1;
	const needIndex = renderItem.length > 2;
	const insertForBlock = isSingleNode ? (block, anchor) => insertNode(block.nodes, parent, anchor) : isFragment ? (block, anchor) => insertFragment(block.nodes, parent, anchor) : (block, anchor) => insert(block.nodes, parent, anchor);
	const removeForBlock = isSingleNode ? (block) => removeNode(block.nodes, parent) : isFragment ? (block) => removeFragment(block.nodes, parent) : (block) => remove(block.nodes, parent);
	const mount = (source, idx, anchor) => {
		const keys = source.keys;
		const itemRef = /* @__PURE__ */ shallowRef(getItemValue$1(source, idx));
		const keyRef = needKey ? /* @__PURE__ */ shallowRef(keys ? keys[idx] : idx) : void 0;
		const indexRef = needIndex ? /* @__PURE__ */ shallowRef(keys ? idx : void 0) : void 0;
		let nodes;
		const scope = new EffectScope(true);
		const prevScope = setCurrentScope(scope);
		let ok = false;
		try {
			nodes = renderItem(itemRef, keyRef, indexRef);
			ok = true;
		} finally {
			setCurrentScope(prevScope);
			if (!ok) scope.stop();
		}
		const block = newBlocks[idx] = new ForBlock(nodes, scope, itemRef, keyRef, indexRef, newKeys ? newKeys[idx] : void 0);
		if (isTransitionEnabled && frag.$transition) {
			const hooks = frag.$transition;
			if (hooks.applyGroup) hooks.applyGroup(block, hooks.props, hooks.state, hooks.instance);
			else applyTransitionHooks(block.nodes, hooks);
		}
		const bm = frag.bm;
		if (bm) for (let i = 0; i < bm.length; i++) bm[i](block.nodes);
		if (parent && !held) insertForBlock(block, anchor);
		return block;
	};
	const mountAll = (source, newLength) => {
		for (let i = 0; i < newLength; i++) mount(source, i, parentAnchor);
	};
	const updateAt = (block, source, idx) => {
		const keys = source.keys;
		update(block, getItemValue$1(source, idx), keys ? keys[idx] : idx, keys ? idx : void 0);
	};
	function hydrateList(source, newLength) {
		const claim = hydrationClaim;
		let exitHydrationBoundary;
		const reuseBoundaryClose = (close) => {
			parentAnchor = claimAnchor(close);
			exitHydrationBoundary = enterHydrationBoundary(parentAnchor);
		};
		try {
			for (let i = 0; i < newLength; i++) {
				const node = currentHydrationNode;
				let nextNode = null;
				if (isComment(node, "]")) nextNode = claimAnchor(node);
				else if (wrappedRows && isComment(node, "[")) {
					nextNode = nextLogicalSibling(node);
					setCurrentHydrationNode(node.nextSibling);
				}
				mount(source, i, parentAnchor);
				if (nextNode) setCurrentHydrationNode(nextNode);
			}
			if (claim.start) {
				reuseBoundaryClose(locateClaimedEnd(claim.start));
				if (_insertionParent) {
					const idx = _insertionAnchor ? _insertionParent.$llc === _insertionAnchor ? _insertionParent.$lli : void 0 : _insertionIndex || 0;
					if (idx !== void 0) setLastLocatedLogicalChild(_insertionParent, parentAnchor, idx);
				}
			} else {
				const close = currentHydrationNode;
				if (!!(process.env.NODE_ENV !== "production") && !isComment(close, "]")) throw new Error(`v-for fragment anchor node was not found. this is likely a Vue internal bug.`);
				reuseBoundaryClose(close);
			}
		} finally {
			exitHydrationBoundary && exitHydrationBoundary();
		}
	}
	const update = ({ itemRef, keyRef, indexRef }, newItem, newKey, newIndex) => {
		if (newItem !== itemRef.value) itemRef.value = newItem;
		if (keyRef && newKey !== void 0 && newKey !== keyRef.value) keyRef.value = newKey;
		if (indexRef && newIndex !== indexRef.value) indexRef.value = newIndex;
	};
	const unmount = (block, doRemove = true) => {
		if (!isComponent) block.scope.stop();
		if (doRemove) removeForBlock(block);
		else if (isInteropEnabled) unmountVDOM(block);
		if (isComponent) block.scope.stop();
	};
	if (flags & 4) renderList();
	else renderEffect(() => {
		if (!isMounted) return renderList();
		withRenderContext(ctx, renderList);
	});
	if (isHydrating$1 && currentHydrationNode === parentAnchor) advanceHydrationNode(parentAnchor);
	finishBlockCreation(frag, parentAnchor, hydrationCursor, _insertionParent, _insertionAnchor);
	return frag;
};
/**
* Builds a key-indexed selector that activates only the opers registered with
* the key matching the current source value. Compared to letting each item
* subscribe directly, this keeps re-renders on source change O(2) instead of
* O(N) (only previous and new active item re-run).
*
* Selector cleanup follows the current scope. Per-item teardown is auto-wired
* via `onScopeDispose` so callers (typically v-for item scopes) don't need
* explicit deregistration. For bulk-reset hot paths, attach the selector to
* the v-for via `frag.onReset(selector.reset)` to skip the per-item Map ops.
*/
function createSelector(source) {
	const operMap = /* @__PURE__ */ new Map();
	let activeKey = source();
	let activeOpers;
	let pendingKey = activeKey;
	let pending = false;
	let generation = 0;
	watch$1(source, (newValue) => {
		pendingKey = newValue;
		if (pending) return;
		pending = true;
		if (activeOpers !== void 0) for (const oper of activeOpers) oper();
		queuePostFlushCb(() => {
			pending = false;
			activeKey = pendingKey;
			activeOpers = operMap.get(activeKey);
			if (activeOpers !== void 0) for (const oper of activeOpers) oper();
		});
	});
	const register = (key, oper) => {
		oper();
		let opers = operMap.get(key);
		if (opers !== void 0) opers.push(oper);
		else {
			opers = [oper];
			operMap.set(key, opers);
			if (key === activeKey) activeOpers = opers;
		}
		const myGen = generation;
		onScopeDispose(() => {
			if (myGen !== generation) return;
			const list = operMap.get(key);
			if (list === void 0) return;
			if (list.length === 1) {
				operMap.delete(key);
				if (key === activeKey) activeOpers = void 0;
			} else {
				const idx = list.indexOf(oper);
				if (idx !== -1) list.splice(idx, 1);
			}
		}, true);
	};
	register.reset = () => {
		operMap.clear();
		activeOpers = void 0;
		generation++;
	};
	return register;
}
/**
* Decides which reused blocks may stay where they are: the longest increasing
* subsequence of their old indices is already in relative order, so only the
* blocks outside it need a DOM move. Returns that subsequence as indices into
* `sources`, or `undefined` when no reused block has to move at all.
*
* Two planners, picked by how dense the change is across the range it touches:
*
* - dense (the queued indices cover at least half of the range they span):
*   pull the in-place matches in that range into the plan too and run an
*   unbounded LIS, which is move-count minimal like vdom's. The range is at
*   most `2 * queuedIndices.length` wide here, so this stays O(queued).
* - sparse (a couple of rows moved across an otherwise untouched list, e.g. a
*   far swap): keep the in-place matches pinned, which costs nothing but
*   bounds each segment's LIS by its stationary neighbours. Not minimal in
*   general, but it never walks the untouched majority.
*
* Both arrays are expanded in place on the dense path.
*/
function planMoves$1(queuedIndices, sources, e2, e3) {
	let queuedLength = queuedIndices.length;
	const denseLength = e3 - queuedIndices[0];
	const isDense = queuedLength * 2 >= denseLength;
	let moved = false;
	let maxSource = 0;
	if (isDense) {
		let read = queuedLength - 1;
		queuedIndices.length = sources.length = denseLength;
		for (let write = denseLength - 1, index = e3 - 1; write >= 0; write--, index--) {
			if (read >= 0 && queuedIndices[read] === index) sources[write] = sources[read--];
			else sources[write] = index + 1;
			queuedIndices[write] = index;
		}
		queuedLength = denseLength;
		for (let q = 0; q < queuedLength; q++) {
			const value = sources[q];
			if (value !== 0) {
				if (value < maxSource) moved = true;
				else maxSource = value;
			}
		}
	} else {
		let seg = 0;
		while (seg < queuedLength) {
			let segEnd = seg;
			while (segEnd + 1 < queuedLength && queuedIndices[segEnd + 1] === queuedIndices[segEnd] + 1) segEnd++;
			const lowerBound = queuedIndices[seg] - 1;
			const nextIndex = queuedIndices[segEnd] + 1;
			const upperBound = nextIndex < e3 ? nextIndex : e2;
			for (let q = seg; q <= segEnd; q++) {
				const value = sources[q];
				const oldIndex = value - 1;
				if (oldIndex <= lowerBound || oldIndex >= upperBound) sources[q] = 0;
				else if (value < maxSource) moved = true;
				else maxSource = value;
			}
			seg = segEnd + 1;
		}
	}
	return moved ? getSequence(sources) : void 0;
}
function stopBlockScopes$1(blocks) {
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		if (block) {
			const scope = block.scope;
			if (scope) scope.stop();
		}
	}
}
function isSameMapKey(a, b) {
	return Object.is(a, b) || a === 0 && b === 0;
}
function createForSlots(rawSource, renderSlot, getName, getKey) {
	let oldRecords = [];
	const needKey = renderSlot.length > 1;
	const needIndex = renderSlot.length > 2;
	const update = (record, [item, key, index]) => {
		if (!Object.is(record.itemRef.value, item)) record.itemRef.value = item;
		if (record.keyRef && !Object.is(record.keyRef.value, key)) record.keyRef.value = key;
		if (record.indexRef && !Object.is(record.indexRef.value, index)) record.indexRef.value = index;
	};
	return () => {
		const source = normalizeSource$1(rawSource());
		const sourceLength = source.values.length;
		const names = new Array(sourceLength);
		const identities = getKey ? new Array(sourceLength) : names;
		const items = new Array(sourceLength);
		let sameResolution = sourceLength === oldRecords.length;
		for (let i = 0; i < sourceLength; i++) {
			const item = items[i] = getItem$1(source, i);
			const name = names[i] = String(getName(...item));
			const identity = identities[i] = getKey ? getKey(...item) : name;
			if (sameResolution && (!isSameMapKey(oldRecords[i].rawIdentity, identity) || oldRecords[i].name !== name)) sameResolution = false;
		}
		if (sameResolution) {
			const prevSub = setActiveSub();
			for (let i = sourceLength - 1; i >= 0; i--) update(oldRecords[i], items[i]);
			setActiveSub(prevSub);
			return oldRecords;
		}
		const oldByIdentity = /* @__PURE__ */ new Map();
		for (let i = 0; i < oldRecords.length; i++) oldByIdentity.set(oldRecords[i].rawIdentity, oldRecords[i]);
		const records = new Array(sourceLength);
		const prevSub = setActiveSub();
		for (let i = sourceLength - 1; i >= 0; i--) {
			const slotItem = items[i];
			const rawIdentity = identities[i];
			let record = oldByIdentity.get(rawIdentity);
			if (record) {
				oldByIdentity.delete(rawIdentity);
				update(record, slotItem);
				record.name = names[i];
			} else {
				const [item, key, index] = slotItem;
				const itemRef = /* @__PURE__ */ shallowRef(item);
				const keyRef = needKey ? /* @__PURE__ */ shallowRef(key) : void 0;
				const indexRef = needIndex ? /* @__PURE__ */ shallowRef(index) : void 0;
				record = {
					rawIdentity,
					itemRef,
					keyRef,
					indexRef,
					name: names[i],
					fn: renderSlot(itemRef, keyRef, indexRef),
					key: itemRef
				};
			}
			records[i] = record;
		}
		setActiveSub(prevSub);
		oldRecords = records;
		return records;
	};
}
function normalizeSource$1(source) {
	let values = source;
	let needsWrap = false;
	let isReadonlySource = false;
	let keys;
	if (isArray(source)) {
		if (/* @__PURE__ */ isReactive(source)) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			values = shallowReadArray(source);
			isReadonlySource = /* @__PURE__ */ isReadonly(source);
		}
	} else if (isString(source)) values = source.split("");
	else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			if (!!(process.env.NODE_ENV !== "production")) warn(`The v-for range expects a positive integer value but got ${source}.`);
			values = [];
		} else {
			values = new Array(source);
			for (let i = 0; i < source; i++) values[i] = i + 1;
		}
	} else if (isObject(source)) {
		if (source[Symbol.iterator]) values = Array.from(source);
		else {
			keys = Object.keys(source);
			values = new Array(keys.length);
			for (let i = 0, l = keys.length; i < l; i++) values[i] = source[keys[i]];
		}
	} else values = [];
	return {
		values,
		needsWrap,
		isReadonlySource,
		keys
	};
}
function getItemValue$1({ values, needsWrap, isReadonlySource }, idx) {
	return needsWrap ? isReadonlySource ? toReadonly(toReactive(values[idx])) : toReactive(values[idx]) : values[idx];
}
function getItem$1(source, idx) {
	const value = getItemValue$1(source, idx);
	if (source.keys) return [
		value,
		source.keys[idx],
		idx
	];
	else return [
		value,
		idx,
		void 0
	];
}
function getRestElement(val, keys) {
	const res = {};
	for (const key of Object.keys(val)) if (!keys.includes(key)) res[key] = val[key];
	return res;
}
function getDefaultValue(val, getDefaultVal) {
	return val === void 0 ? getDefaultVal() : val;
}
//#endregion
//#region packages/runtime-vapor/src/apiTemplateRef.ts
function getTemplateRefUpdateFragment(el) {
	if (isDynamicFragment(el)) return el;
	if (isAsyncComponentEnabled && isVaporComponent(el) && isAsyncWrapper(el)) return el.block;
}
/**
* Async/dynamic component targets swap their inner block on update, so the ref
* has to be re-applied after the fragment settles. Registration is idempotent
* per (el, owner) pair: `getTemplateRefUpdateFragment` reads the async
* wrapper's mutable `block`, so the resolved fragment is compared by identity
* rather than with a "registered once" flag.
*/
function registerFragmentRefUpdate(el, registeredFrag, reapply) {
	const frag = getTemplateRefUpdateFragment(el);
	if (frag && registeredFrag !== frag) {
		if (isDynamicFragment(el)) {
			let nestedFrag;
			const onAsyncUpdate = () => {
				const inner = frag.nodes;
				if (isVaporComponent(inner) && inner.block === nestedFrag && !inner.isDeactivated && !inner.isUnmounted) reapply();
			};
			const onUpdate = () => {
				nestedFrag = syncNestedAsyncRefUpdate(frag, nestedFrag, onAsyncUpdate);
				reapply();
			};
			(frag.u || (frag.u = [])).push(onUpdate);
			onScopeDispose(() => {
				remove$1(frag.u, onUpdate);
				if (nestedFrag) {
					remove$1(nestedFrag.u, onAsyncUpdate);
					nestedFrag = void 0;
				}
			});
			nestedFrag = syncNestedAsyncRefUpdate(frag, void 0, onAsyncUpdate);
		} else (frag.u || (frag.u = [])).push(() => {
			if (isVaporComponent(el) && el.isDeactivated) return;
			reapply();
		});
		return frag;
	}
	return registeredFrag;
}
function syncNestedAsyncRefUpdate(frag, registeredFrag, onUpdate) {
	const inner = frag.nodes;
	const next = isAsyncComponentEnabled && isVaporComponent(inner) && isAsyncWrapper(inner) && isDynamicFragment(inner.block) ? inner.block : void 0;
	if (next !== registeredFrag) {
		if (registeredFrag) remove$1(registeredFrag.u, onUpdate);
		if (next) (next.u || (next.u = [])).push(onUpdate);
	}
	return next;
}
function ensureCleanup(el) {
	let cleanupRef = refCleanups.get(el);
	if (!cleanupRef) {
		refCleanups.set(el, cleanupRef = { fn: NOOP });
		onScopeDispose(() => {
			invalidatePendingRef(el);
			cleanupRef.fn();
			refCleanups.delete(el);
		});
	}
	return cleanupRef;
}
function createTemplateRefSetter() {
	const instance = getScopeOwner();
	const stateMap = /* @__PURE__ */ new WeakMap();
	return (el, ref, refFor, refKey) => {
		let state = stateMap.get(el);
		if (!state) stateMap.set(el, state = {
			ref,
			suspense: currentRenderContext.suspense
		});
		setTemplateRefWithState(instance, el, state, ref, refFor, refKey);
	};
}
function setTemplateRefWithState(instance, el, state, ref, refFor, refKey) {
	state.ref = ref;
	state.refFor = refFor;
	state.refKey = refKey;
	state.registeredFrag = registerFragmentRefUpdate(el, state.registeredFrag, () => {
		setRef$1(instance, state.suspense, el, state.ref, state.oldRef, state.refFor, state.refKey, state.oldRefKey);
		state.oldRef = state.ref;
		state.oldRefKey = state.ref != null ? state.refKey : void 0;
	});
	setRef$1(instance, state.suspense, el, ref, state.oldRef, refFor, refKey, state.oldRefKey);
	state.oldRef = ref;
	state.oldRefKey = ref != null ? refKey : void 0;
}
/**
* Static refs never change value, so they need no old-ref tracking and no
* per-element state - only the fragment re-apply hook shared with the
* stateful path.
*/
function setStaticTemplateRef(el, ref, refFor, refKey) {
	const instance = getScopeOwner();
	const suspense = currentRenderContext.suspense;
	setRef$1(instance, suspense, el, ref, void 0, refFor, refKey);
	registerFragmentRefUpdate(el, void 0, () => {
		setRef$1(instance, suspense, el, ref, ref, refFor, refKey);
	});
}
function setTemplateRefBinding(el, getter, refFor, refKey) {
	const instance = getScopeOwner();
	let state;
	renderEffect(() => {
		const ref = getter();
		if (!state) state = {
			ref,
			suspense: currentRenderContext.suspense
		};
		setTemplateRefWithState(instance, el, state, ref, refFor, refKey);
	});
}
/**
* Function for handling a template ref
*/
function setRef$1(instance, suspense, el, ref, oldRef, refFor = false, refKey, oldRefKey) {
	if (!instance || instance.isUnmounted) return;
	const setupState = !!(process.env.NODE_ENV !== "production") ? instance.setupState || {} : null;
	const refValue = getRefValue(el);
	if (isInteropEnabled) {
		const target = isFragment(el) && el.setRef ? el : refValue && isFragment(refValue) && refValue.setRef ? refValue : null;
		if (target) {
			target.setRef(instance, ref, refFor, refKey);
			return;
		}
	}
	const refs = instance.refs === EMPTY_OBJ ? instance.refs = {} : instance.refs;
	const canSetSetupRef = !!(process.env.NODE_ENV !== "production") ? createCanSetSetupRefChecker(setupState, refs) : NO;
	const canSetRef = (ref, key) => {
		if (!!(process.env.NODE_ENV !== "production") && knownTemplateRefs.has(ref)) return false;
		if (key && isTemplateRefKey(refs, key)) return false;
		return true;
	};
	if (oldRef != null && oldRef !== ref) {
		invalidatePendingRef(el);
		if (isString(oldRef)) {
			refs[oldRef] = null;
			if (!!(process.env.NODE_ENV !== "production") && canSetSetupRef(oldRef)) setupState[oldRef] = null;
		} else if (/* @__PURE__ */ isRef(oldRef)) {
			if (canSetRef(oldRef, oldRefKey)) oldRef.value = null;
			if (oldRefKey) refs[oldRefKey] = null;
		} else if (isFunction(oldRef) && isDynamicFragment(el)) callWithErrorHandling(oldRef, instance, 12, [null, refs]);
	} else if (oldRef != null && isDynamicFragment(el)) {
		if (isFunction(oldRef)) callWithErrorHandling(oldRef, instance, 12, [null, refs]);
		else if (refFor) unsetRef(el);
	}
	if (ref == null) return;
	if (isFunction(ref)) {
		const invokeRefSetter = (value) => {
			callWithErrorHandling(ref, instance, 12, [value, refs]);
		};
		invokeRefSetter(refValue);
		ensureCleanup(el).fn = () => invokeRefSetter(null);
	} else {
		const _isString = isString(ref);
		const _isRef = /* @__PURE__ */ isRef(ref);
		let existing;
		if (_isString || _isRef) {
			const doSet = () => {
				if (refFor) {
					if (refValue == null) return;
					existing = _isString ? !!(process.env.NODE_ENV !== "production") && canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !refKey ? ref.value : refs[refKey];
					if (!isArray(existing)) {
						existing = [refValue];
						if (_isString) {
							refs[ref] = existing;
							if (!!(process.env.NODE_ENV !== "production") && canSetSetupRef(ref)) {
								setupState[ref] = refs[ref];
								existing = setupState[ref];
							}
						} else {
							if (canSetRef(ref, refKey)) ref.value = existing;
							if (refKey) refs[refKey] = existing;
						}
					} else if (!existing.includes(refValue)) existing.push(refValue);
				} else if (_isString) {
					refs[ref] = refValue;
					if (!!(process.env.NODE_ENV !== "production") && canSetSetupRef(ref)) setupState[ref] = refValue;
				} else if (_isRef) {
					if (canSetRef(ref, refKey)) ref.value = refValue;
					if (refKey) refs[refKey] = refValue;
				} else if (!!(process.env.NODE_ENV !== "production")) warn("Invalid template ref type:", ref, `(${typeof ref})`);
			};
			const cleanup = ensureCleanup(el);
			cleanup.fn = () => {
				if (refFor) {
					if (isArray(existing)) remove$1(existing, refValue);
				} else if (_isString) {
					refs[ref] = null;
					if (!!(process.env.NODE_ENV !== "production") && canSetSetupRef(ref)) setupState[ref] = null;
				} else if (_isRef) {
					if (canSetRef(ref, refKey)) ref.value = null;
					if (refKey) refs[refKey] = null;
				}
			};
			invalidatePendingRef(el);
			if (refValue != null) {
				const job = () => {
					doSet();
					if (cleanup.job === job) cleanup.job = void 0;
				};
				cleanup.job = job;
				queuePostRenderEffect(job, -1, suspense);
			} else doSet();
		} else if (!!(process.env.NODE_ENV !== "production")) warn("Invalid template ref type:", ref, `(${typeof ref})`);
	}
}
const getRefValue = (el) => {
	if (isVaporComponent(el)) {
		if (isAsyncComponentEnabled && isAsyncWrapper(el)) {
			const inner = getAsyncWrapperInner(el);
			if (inner === void 0) return null;
			return getRefValue(inner);
		}
		if (el.type.rootElement) return getRootElement(el.block) || null;
		return getExposed(el) || el;
	} else if (isTeleportEnabled && isTeleportFragment(el)) return null;
	else if (isDynamicFragment(el)) {
		if (isArray(el.nodes)) return null;
		return getRefValue(el.nodes);
	}
	return el;
};
//#endregion
//#region packages/runtime-vapor/src/helpers/setKey.ts
function setBlockKey(block, key) {
	const frag = block;
	frag.$key = key;
	if (isInteropEnabled && frag.setKey) frag.setKey(key);
}
//#endregion
//#region packages/runtime-vapor/src/apiCreateDynamicComponent.ts
function createDynamicComponent(getter, rawProps, rawSlots, flags = 0, key) {
	const isSingleRoot = !!(flags & 1);
	const once = !!(flags & 2);
	const slotRoot = !!(flags & 4);
	const ns = flags & 8 ? 1 : flags & 16 ? 2 : void 0;
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	if (!isHydrating$1) resetInsertionState();
	const normalizedRawSlots = normalizeRawSlots(rawSlots);
	const scopeOwner = getScopeOwner();
	let latestVNode;
	let patchVNode;
	const render = (value, resolved, appContext) => {
		if (isBlock(value)) return value;
		if (isInteropEnabled && appContext.vdom && isVNode(value)) {
			const vnodeFrag = appContext.vdom.mountVNode(latestVNode || resolved, currentInstance, isSingleRoot, rawProps, once);
			patchVNode = vnodeFrag.patchVNode;
			return vnodeFrag;
		}
		return createComponentWithFallback(resolved, rawProps, normalizedRawSlots, isSingleRoot, once, ns, appContext);
	};
	if (once) {
		const hydrationCursor = isHydrating$1 ? enterHydrationCursor() : null;
		const value = getter();
		const appContext = getAppContext();
		const block = render(value, resolveValue(value, appContext, scopeOwner), appContext);
		finishBlockCreation(block, void 0, hydrationCursor, _insertionParent, _insertionAnchor);
		return block;
	}
	const hydrationCursor = isHydrating$1 ? captureHydrationCursor() : null;
	const frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "dynamic-component" : void 0, false, slotRoot, _insertionAnchor);
	if (isHydrating$1) locateHydrationNode();
	let lastKey;
	let lastBranch;
	let branchToken;
	const needsCacheKey = !!key && !!getKeepAliveContext(currentInstance);
	renderEffect(() => {
		let userKey = key ? key() : void 0;
		const value = needsCacheKey ? withCurrentCacheKey(userKey, getter) : getter();
		const appContext = getAppContext();
		let resolved = resolveValue(value, appContext, scopeOwner);
		if (resolved === NULL_DYNAMIC_COMPONENT) {
			if (isInteropEnabled) latestVNode = patchVNode = void 0;
			frag.update(void 0, resolved);
			return;
		}
		let branchKey = resolved;
		if (isInteropEnabled && isVNode(resolved)) {
			if (key) {
				if (resolved.key !== (userKey == null ? null : userKey)) resolved = cloneVNode(resolved, { key: userKey });
			} else if (resolved.key != null) userKey = resolved.key;
			latestVNode = resolved;
			branchKey = resolved.type;
		}
		if (key || isInteropEnabled && userKey !== void 0) {
			if (userKey !== lastKey || branchKey !== lastBranch) {
				lastKey = userKey;
				lastBranch = branchKey;
				branchToken = {};
			}
			branchKey = branchToken;
		}
		if (branchKey === frag.current && !isHydrating$1) {
			if (isInteropEnabled && patchVNode && isVNode(resolved)) patchVNode(resolved);
			return;
		}
		if (isInteropEnabled) latestVNode = patchVNode = void 0;
		frag.update(() => render(value, resolved, appContext), branchKey, false, userKey);
	});
	finishBlockCreation(frag, frag.anchor, hydrationCursor, _insertionParent, _insertionAnchor);
	return frag;
}
function getAppContext() {
	return currentInstance && currentInstance.appContext || emptyContext;
}
function resolveValue(value, appContext, scopeOwner) {
	if (isBlock(value) || isInteropEnabled && appContext.vdom && isVNode(value)) return value;
	const resolved = withScopeOwner(scopeOwner, () => resolveDynamicComponent(value));
	const type = typeof resolved;
	if (!resolved || type !== "string" && type !== "object" && type !== "function" && type !== "symbol") {
		if (!!(process.env.NODE_ENV !== "production")) warn(`Invalid dynamic component type: ${String(resolved)} (${type})`);
		return NULL_DYNAMIC_COMPONENT;
	}
	return resolved;
}
function withScopeOwner(owner, fn) {
	const prev = setCurrentRenderingInstance(owner);
	try {
		return fn();
	} finally {
		setCurrentRenderingInstance(prev);
	}
}
//#endregion
//#region packages/runtime-vapor/src/directives/vShow.ts
/**
* v-show is root-inherited state: it lands on the effective root element of
* `target`, and any producer on the root chain (dynamic fragment branch,
* interop subtree, pending async setup) can replace that root later. `apply`
* resolves the root through the shared chain walker and registers itself on
* every producer it passes, so a replacement root re-enters `apply` and
* registers the producers inside it in turn.
*/
function applyVShow(target, source) {
	let value;
	let transition;
	let unresolved = false;
	let slotRoot = false;
	let inTransition;
	let ran = false;
	let updating;
	let pendingSetups;
	let applyInTransition;
	const visitor = {
		onComponent(instance) {
			if (!!(process.env.NODE_ENV !== "production")) register(instance.hmrRootHooks || (instance.hmrRootHooks = []), apply);
			if (isSuspenseEnabled && instance.asyncDep && !instance.asyncResolved) {
				if (!(pendingSetups || (pendingSetups = /* @__PURE__ */ new WeakSet())).has(instance)) {
					pendingSetups.add(instance);
					(instance.bm || (instance.bm = [])).push(() => apply(instance.block));
				}
				unresolved = true;
				return true;
			}
			if (instance.isDeactivated) updating = true;
			inTransition = isTransitionEnabled && isVaporTransition(instance.type);
		},
		onDynamicFragment(frag) {
			if (!inTransition && isSlotOutletFragment(frag)) return slotRoot = true;
			register(frag.bm || (frag.bm = []), inTransition ? applyInTransition || (applyInTransition = (nodes) => apply(nodes, false, true)) : apply);
		}
	};
	if (isInteropEnabled) visitor.onInteropFragment = (frag) => {
		if (isSlotOutletFragment(frag)) return slotRoot = true;
		if (frag.vnode) setInteropVShow(frag, apply);
		if (isTransitionEnabled && frag.$transition) transition = frag.$transition;
		register(frag.u || (frag.u = []), apply);
		if (!isValidBlock(frag.nodes)) unresolved = true;
	};
	const apply = (nodes, update, transitionSlot) => {
		transition = void 0;
		unresolved = slotRoot = false;
		updating = update;
		inTransition = transitionSlot;
		const root = getRootElement(nodes, visitor);
		if (root) setDisplay(root, value, transition, updating);
		else if (!!(process.env.NODE_ENV !== "production") && (slotRoot || !unresolved && isValidBlock(nodes))) warn("v-show used on component with non-single-element root node and will be ignored.");
	};
	target.$vshow |= 2;
	renderEffect(() => {
		value = source();
		apply(target, ran);
		ran = true;
	});
}
function register(hooks, hook) {
	if (!hooks.includes(hook)) hooks.push(hook);
}
function setDisplay(el, value, transition, updating) {
	const hidden = !value;
	if (!(vShowOriginalDisplay in el)) {
		el.$vshow |= 1;
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		writeDisplay(el, value);
		return;
	}
	if (el[vShowHidden] === hidden) return;
	if (isInteropEnabled && isInteropVShowPending(el)) {
		writeDisplay(el, value);
		return;
	}
	const $transition = isTransitionEnabled ? el.$transition || transition : void 0;
	if (updating) {
		el.$vshow &= -5;
		if ($transition) {
			el[vShowHidden] = hidden;
			const prevSub = setActiveSub();
			try {
				if (value) {
					$transition.beforeEnter(el);
					el.style.display = el[vShowOriginalDisplay];
					$transition.enter(el);
				} else if (el.isConnected) $transition.leave(el, () => {
					el.style.display = "none";
				});
				else el.style.display = "none";
			} finally {
				setActiveSub(prevSub);
			}
			return;
		}
	} else if (value) {
		el.$vshow |= 4;
		if ($transition) return;
	}
	writeDisplay(el, value);
}
function writeDisplay(el, value) {
	el[vShowHidden] = !value;
	if ((!!(process.env.NODE_ENV !== "production") || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && isHydrating$1) {
		const hidden = el.style.display === "none";
		if (!value === hidden) return;
		const expected = value ? el[vShowOriginalDisplay] : "none";
		if (warnPropMismatch(el, "style", 3, `display: ${el.style.display}`, expected ? `display: ${expected}` : false)) logMismatchError();
	}
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
}
//#endregion
//#region packages/runtime-vapor/src/directives/vModel.ts
function ensureMounted(cb) {
	if (currentInstance.isMounted) cb();
	else {
		let scope = getCurrentScope();
		const run = inOnce ? () => withOnce(cb) : cb;
		onMounted(() => {
			const currentScope = scope;
			scope = void 0;
			if (currentScope.active) currentScope.run(run);
		});
	}
}
const applyTextModel = (el, get, set, { trim, number, lazy } = {}) => {
	vModelTextInit(el, trim, number, lazy, set);
	ensureMounted(() => {
		let value;
		renderEffect(() => {
			vModelTextUpdate(el, value, value = get(), trim, number, lazy);
		});
	});
};
const applyCheckboxModel = (el, get, set) => {
	vModelCheckboxInit(el, set);
	ensureMounted(() => {
		let value;
		renderEffect(() => {
			const oldValue = value;
			value = traverse(get());
			if (!inOnce && (isArray(value) || isSet(value))) trackDep(el._valueDep || (el._valueDep = new Dep()), el, "_value");
			vModelCheckboxUpdate(el, oldValue, value);
		});
	});
};
const applyRadioModel = (el, get, set) => {
	el.addEventListener("change", () => set(getValue(el)));
	ensureMounted(() => {
		let value;
		renderEffect(() => {
			if (value !== (value = get())) el.checked = looseEqual(value, getValue(el));
		});
	});
};
const applySelectModel = (el, get, set, modifiers) => {
	vModelSelectInit(el, get(), modifiers && modifiers.number, set);
	if (inOnce) {
		ensureMounted(() => vModelSetSelected(el, get()));
		return;
	}
	const update = () => vModelSetSelected(el, get());
	registerSelectUpdate(update);
	ensureMounted(() => {
		update();
		renderEffect(() => traverse(get()));
	});
};
const applyDynamicModel = (el, get, set, modifiers) => {
	let apply = applyTextModel;
	if (el.tagName === "SELECT") apply = applySelectModel;
	else if (el.tagName === "TEXTAREA") apply = applyTextModel;
	else if (el.type === "checkbox") apply = applyCheckboxModel;
	else if (el.type === "radio") apply = applyRadioModel;
	apply(el, get, set, modifiers);
};
//#endregion
//#region packages/runtime-vapor/src/directives/custom.ts
function withVaporDirectives(node, dirs) {
	if (node instanceof Element) {
		applyDirectivesToElement(node, dirs, currentInstance);
		return;
	}
	const instance = currentInstance;
	const once = inOnce;
	let currentElement = null;
	let directiveScope;
	let disposed = false;
	let pending = false;
	let pendingSetups;
	const visitor = {
		onDynamicFragment: track,
		onComponent(block) {
			if (!!(process.env.NODE_ENV !== "production")) {
				const hooks = block.hmrRootHooks || (block.hmrRootHooks = []);
				if (!hooks.includes(applyDirectives)) hooks.push(applyDirectives);
			}
			if (isSuspenseEnabled && block.asyncDep && !block.asyncResolved) {
				pending = true;
				if (!(pendingSetups || (pendingSetups = /* @__PURE__ */ new WeakSet())).has(block)) {
					pendingSetups.add(block);
					onBeforeMount(applyDirectives, block);
				}
				return true;
			}
			if (isAsyncComponentEnabled && isAsyncWrapper(block)) {
				const inner = block.block;
				if (isFragment(inner) && inner.nodes === EMPTY_BLOCK) pending = true;
			}
		},
		excludeSlotOutlets: true
	};
	if (isInteropEnabled) visitor.onInteropFragment = (frag) => {
		if (frag.nodes === EMPTY_BLOCK) pending = true;
		track(frag);
	};
	function stopDirectiveScope() {
		if (directiveScope) {
			directiveScope.stop();
			directiveScope = void 0;
		}
	}
	function track(frag) {
		const u = frag.u || (frag.u = []);
		if (u.includes(applyDirectives)) return;
		u.push(applyDirectives);
		if (isDynamicFragment(frag)) (frag.bu || (frag.bu = [])).push(() => {
			if (currentElement && getRootElement(frag.nodes) === currentElement) {
				currentElement = null;
				stopDirectiveScope();
			}
		});
	}
	function applyDirectives() {
		if (disposed) return;
		pending = false;
		const element = getRootElement(node, visitor);
		if (!element && pending) {
			if (currentElement !== null) {
				currentElement = null;
				stopDirectiveScope();
			}
			return;
		}
		if (element === currentElement) return;
		currentElement = element;
		stopDirectiveScope();
		if (!element) {
			if (!!(process.env.NODE_ENV !== "production")) warn("Runtime directive used on component with non-element root node. The directives will not function as intended.");
			return;
		}
		directiveScope = new EffectScope(true);
		const prev = setCurrentInstance(instance, directiveScope);
		try {
			if (once) withOnce(() => applyDirectivesToElement(element, dirs, instance));
			else applyDirectivesToElement(element, dirs, instance);
		} finally {
			restoreCurrentInstance(prev);
		}
	}
	onScopeDispose(() => {
		disposed = true;
		stopDirectiveScope();
	}, true);
	applyDirectives();
}
function applyDirectivesToElement(element, dirs, instance) {
	const hookCounts = !!(process.env.NODE_ENV !== "production") && instance ? countLifecycleHooks(instance) : null;
	for (const [dir, value, argument, modifiers] of dirs) if (dir) {
		if (!isFunction(dir)) {
			if (!!(process.env.NODE_ENV !== "production")) warn(`Received a VDOM object directive` + (isObject(dir) ? ` (hooks: ${Object.keys(dir).join(", ")})` : ``) + " in a Vapor template. Vapor directives must be a function: (el, value, arg, modifiers) => cleanup.");
			continue;
		}
		const ret = callWithErrorHandling(dir, instance, 8, [
			element,
			value,
			argument,
			modifiers
		]);
		if (ret) onScopeDispose(() => callWithErrorHandling(ret, instance, 8));
	}
	if (!!(process.env.NODE_ENV !== "production") && hookCounts) warnLifecycleHooks(instance, hookCounts);
}
const lifecycleHookNames = !!(process.env.NODE_ENV !== "production") ? {
	bm: "onBeforeMount",
	m: "onMounted",
	bu: "onBeforeUpdate",
	u: "onUpdated",
	bum: "onBeforeUnmount",
	um: "onUnmounted",
	da: "onDeactivated",
	a: "onActivated"
} : {};
function countLifecycleHooks(instance) {
	const counts = [];
	for (const key in lifecycleHookNames) {
		const hooks = instance[key];
		counts.push(hooks ? hooks.length : 0);
	}
	return counts;
}
function warnLifecycleHooks(instance, before) {
	let i = 0;
	for (const key in lifecycleHookNames) {
		const hooks = instance[key];
		if (hooks && hooks.length > before[i]) warn(`${lifecycleHookNames[key]}() was called inside a custom directive. Lifecycle hooks are not supported in Vapor directives: they attach to the component, not the element. Use watchPostEffect() for work that needs the element in the DOM, and return a cleanup function for teardown.`);
		i++;
	}
}
//#endregion
//#region packages/runtime-vapor/src/components/TransitionGroup.ts
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const trackedTransitionGroupOwners = /* @__PURE__ */ new WeakSet();
const decorate = (t) => {
	delete t.props.mode;
	return t;
};
const VaporTransitionGroup = /*@__PURE__*/ decorate(/* @__PURE__ */ defineVaporComponent({
	name: "VaporTransitionGroup",
	props: /*@__PURE__*/ extend$1({}, TransitionPropsValidators, {
		tag: String,
		moveClass: String
	}),
	setup(props, { slots, expose }) {
		expose();
		if (!isTransitionEnabled) registerTransitionHooks(applyTransitionHooksImpl, NO, NO, NO, NO, NO, NO, NO);
		const instance = currentInstance;
		const state = useTransitionState();
		let cssTransitionProps;
		const propsProxy = new Proxy({}, { get(_, key) {
			return cssTransitionProps[key];
		} });
		let prevChildren = [];
		let isUpdatePending = false;
		let isUpdatedPending = false;
		let slottedBlock = [];
		let origins;
		let moves;
		let moveElement;
		const willMove = () => {
			if (moves === void 0) {
				moveElement = getFirstConnectedChild(prevChildren);
				moves = !!(moveElement && hasCSSTransform(moveElement, moveElement.parentNode, props.moveClass || `${props.name || "v"}-move`));
			}
			return moves;
		};
		const beforeUpdate = () => {
			if (isUpdatePending) return;
			isUpdatePending = true;
			prevChildren = [];
			moves = void 0;
			const children = resolveTransitionBlocks(slottedBlock, void 0, void 0, true);
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				const el = isValidTransitionBlock(child) && child.$transition ? getTransitionElement(child) : void 0;
				if (el && !el[vShowHidden]) {
					prevChildren.push(child);
					positionMap.set(child, el.getBoundingClientRect());
				}
			}
			const firstChild = getFirstConnectedChild(prevChildren);
			if (firstChild) {
				origins = getOrigins(instance, firstChild);
				pendingGroups.set(instance, {
					root: firstChild.parentNode,
					willMove
				});
			}
		};
		const flushUpdated = () => {
			isUpdatedPending = false;
			if (!isUpdatePending) return;
			isUpdatePending = false;
			pendingGroups.delete(instance);
			if (!prevChildren.length) return;
			const moveClass = props.moveClass || `${props.name || "v"}-move`;
			if (!willMove()) {
				prevChildren = [];
				origins = void 0;
				moveElement = void 0;
				return;
			}
			prevChildren.forEach((child) => {
				const el = getTransitionElement(child);
				if (el) callPendingCbs(el);
			});
			const shift = origins && getOriginShift(origins, moveElement);
			origins = void 0;
			prevChildren.forEach((child) => recordPosition(child, shift));
			const movedChildren = prevChildren.filter(applyTranslation);
			forceReflow(moveElement);
			moveElement = void 0;
			movedChildren.forEach((c) => handleMovedChildren(getTransitionElement(c), moveClass));
			prevChildren = [];
		};
		const updated = () => {
			if (!isUpdatePending || isUpdatedPending) return;
			isUpdatedPending = true;
			queuePostRenderEffect(flushUpdated, void 0, instance.suspense);
		};
		onBeforeUpdate(beforeUpdate);
		onUpdated(updated);
		const updateHooks = {
			beforeUpdate,
			updated
		};
		const tag = props.tag;
		let close = null;
		if (isHydrating$1) {
			const claim = tag ? void 0 : createFragmentClaim();
			locateHydrationNode(claim);
			if (claim && claim.start) close = claimAnchor(locateEndAnchor(claim.start));
		}
		let isMounted = false;
		if (!!(process.env.NODE_ENV !== "production")) state.refresh = () => {
			applyGroupTransitionHooks(slottedBlock, propsProxy, state, instance, updateHooks);
		};
		renderEffect(() => {
			cssTransitionProps = resolveTransitionProps(props);
			if (isMounted) applyGroupTransitionHooks(slottedBlock, propsProxy, state, instance, updateHooks);
		}, true);
		const createContainer = () => tag ? isHydrating$1 ? adoptTemplate(currentHydrationNode, `<${tag}/>`) : /* @__PURE__ */ createElement(tag) : void 0;
		const renderChildren = (slot, container, run = (render) => render()) => {
			let nextNode = null;
			if (isHydrating$1 && container) {
				nextNode = nextLogicalSibling(container);
				setCurrentHydrationNode(container.firstChild || container);
			}
			try {
				run(() => {
					const block = slot && slot() || [];
					applyGroupTransitionHooks(block, propsProxy, state, instance, updateHooks);
					slottedBlock = block;
					if (container) {
						if (!isHydrating$1) insert(block, container);
						registerNestedVDOMCleanup(block);
						return container;
					}
					return block;
				});
				if (isHydrating$1 && container && currentHydrationNode && currentHydrationNode.parentNode === container) cleanupHydrationTail(currentHydrationNode, container);
				if (isHydrating$1 && close) {
					trimHydrationBoundary(close);
					if (currentHydrationNode === close) advanceHydrationNode(close);
					close = null;
				}
			} finally {
				if (isHydrating$1 && container) setCurrentHydrationNode(nextNode);
			}
			isMounted = true;
		};
		if (!instance.rawSlots.$) {
			const container = createContainer();
			renderChildren(slots.default, container);
			return container || slottedBlock;
		}
		const frag = new DynamicFragment(0, !!(process.env.NODE_ENV !== "production") ? "transition-group" : void 0);
		let currentSlot;
		renderEffect(() => {
			const slot = slots.default;
			if (isMounted && slot === currentSlot) return;
			renderChildren(slot, createContainer(), (render) => frag.update(render));
			currentSlot = slot;
		});
		return frag;
	}
}));
function resolveTransitionBlocks(block, onFragment, onUpdateOwner, collectOnly = false) {
	const children = [];
	if (collectOnly) {
		collectTransitionBlocks(block, children, onFragment, onUpdateOwner);
		return children;
	}
	const keys = /* @__PURE__ */ new Map();
	collectTransitionBlocks(block, children, onFragment, onUpdateOwner, keys, ROOT_KEY_CONTEXT);
	for (let i = 0; i < children.length; i++) setTransitionKey(children[i], keys.get(children[i]));
	return children;
}
function collectTransitionBlocks(block, children, onFragment, onUpdateOwner, keys, ctx) {
	if (block instanceof Node) {
		if (block instanceof Element) {
			children.push(block);
			if (keys) keys.set(block, block.$key);
		}
	} else if (isVaporComponent(block)) {
		const isRootSlot = block.block && isVaporSlotOutlet(block.block);
		if (onUpdateOwner && !isRootSlot) onUpdateOwner(block);
		const start = children.length;
		collectTransitionBlocks(block.block, children, onFragment, isRootSlot ? onUpdateOwner : void 0, keys, ctx && (isRootSlot ? withDefaultKey(ctx, block.$key) : enterComponentKeyContext(ctx, block)));
		if (keys) {
			if (!isRootSlot) {
				const t = transitionTypeOf(block);
				for (let i = start; i < children.length; i++) setTransitionType(children[i], t);
			}
			resolveOwnerKey(children, start, block.$key, keys, !isRootSlot);
		}
	} else if (isArray(block)) for (let i = 0; i < block.length; i++) collectTransitionBlocks(block[i], children, onFragment, onUpdateOwner, keys, ctx);
	else if (isFragment(block)) {
		const isItem = isForBlock(block);
		if (!isItem) {
			if (onFragment) onFragment(block);
			if (onUpdateOwner) onUpdateOwner(block);
		}
		if (isInteropEnabled && block.hasVDOMContent && block.hasVDOMContent()) {
			children.push(block);
			if (keys) keys.set(block, block.$key);
		} else {
			const key = isItem ? block.key : getFragmentKey(block);
			const start = children.length;
			collectTransitionBlocks(block.nodes, children, onFragment, onUpdateOwner, keys, ctx && enterFragmentKeyContext(block, ctx, key));
			if (!keys) return;
			if (!isItem) resolveOwnerKey(children, start, key, keys, false);
			else if (key != null) {
				if (children.length - start === 1) keys.set(children[start], key);
				else for (let i = start; i < children.length; i++) keys.set(children[i], `${key}:${i - start}`);
			}
		}
	}
}
function resolveOwnerKey(children, start, key, keys, final) {
	if (children.length - start === 1) {
		const child = children[start];
		if (final || keys.get(child) == null) keys.set(child, key);
		return;
	}
	if (key == null) return;
	for (let i = start; i < children.length; i++) {
		const child = children[i];
		const inner = keys.get(child);
		keys.set(child, String(key) + String(inner != null ? inner : i - start));
	}
}
function applyGroupTransitionHooks(block, props, state, instance, updateHooks) {
	const fragments = [];
	const children = resolveTransitionBlocks(block, (frag) => fragments.push(frag), (owner) => trackTransitionGroupUpdate(owner, instance, updateHooks));
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (isValidTransitionBlock(child)) {
			if (getTransitionKey(child) != null) child.$transition = resolveTransitionHooks$1(child, props, state, instance);
			else if (!!(process.env.NODE_ENV !== "production")) warn(`<transition-group> children must be keyed`);
		}
	}
	fragments.forEach((frag) => {
		const hooks = resolveTransitionHooks$1(frag, props, state, instance);
		hooks.applyGroup = (block, props, state, instance) => applyGroupTransitionHooks(block, props, state, instance, updateHooks);
		frag.$transition = hooks;
	});
	return children;
}
function trackTransitionGroupUpdate(owner, instance, updateHooks) {
	if (trackedTransitionGroupOwners.has(owner)) return;
	if (isFragment(owner)) {
		trackedTransitionGroupOwners.add(owner);
		(owner.bu || (owner.bu = [])).push(updateHooks.beforeUpdate);
		(owner.u || (owner.u = [])).push(updateHooks.updated);
		return;
	}
	if (!owner.hasDynamicProps) return;
	trackedTransitionGroupOwners.add(owner);
	const prevGroup = setCurrentInstance(instance, owner.scope);
	try {
		renderEffect(() => {
			trackRawValues(owner);
		});
	} finally {
		restoreCurrentInstance(prevGroup);
	}
}
function recordPosition(c, shift) {
	const el = getTransitionElement(c);
	if (el) newPositionMap.set(c, getPosition(el, shift));
}
function applyTranslation(c) {
	const el = getTransitionElement(c);
	if (el && baseApplyTranslation(positionMap.get(c), newPositionMap.get(c), el)) return c;
}
function getFirstConnectedChild(children) {
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		const el = getTransitionElement(child);
		if (el && el.isConnected) return el;
	}
}
//#endregion
//#region packages/runtime-vapor-web/src/componentId.ts
const componentIds = /* @__PURE__ */ new WeakMap();
let currentFrame;
function getComponentId(instance) {
	const id = componentIds.get(instance);
	if (id) return id.cid;
	for (let frame = currentFrame; frame; frame = frame.previous) if (frame.parent === instance.parent && (!frame.instance || frame.instance === instance)) {
		frame.instance = instance;
		componentIds.set(instance, frame);
		return frame.cid;
	}
	const parent = instance.parent;
	return parent ? getParentId(parent) : "";
}
function getParentId(instance) {
	const cid = getComponentId(instance);
	const id = componentIds.get(instance);
	return id && id.recycleItem ? "" : cid;
}
function withComponentId(rawCid, create, recycleItem = false) {
	const parent = getCurrentInstance();
	const parentCid = parent ? getParentId(parent) : "";
	const previous = currentFrame;
	const frame = currentFrame = {
		cid: parentCid ? `${parentCid};${rawCid}` : rawCid,
		recycleItem,
		parent,
		previous
	};
	try {
		const block = create();
		if (isVaporComponent(block)) componentIds.set(block, frame);
		else if (block instanceof DynamicFragment) {
			const update = block.update;
			block.update = (render, ...args) => update.call(block, render && (() => withComponentId(rawCid, render, recycleItem)), ...args);
		}
		return block;
	} finally {
		currentFrame = previous;
	}
}
//#endregion
//#region packages/runtime-vapor-web/src/page.ts
let uniPageHooksInitializer;
function setUniPageHooksInitializer(initialize) {
	uniPageHooksInitializer = initialize;
}
function initUniPageHooks() {
	const instance = getCurrentInstance();
	if (instance && instance.$pageInstance === instance && uniPageHooksInitializer) uniPageHooksInitializer(instance);
}
//#endregion
//#region packages/runtime-vapor-web/src/selectorQuery.ts
function querySelectorInComponent(instance, selector) {
	return query(instance, selector);
}
function querySelectorAllInComponent(instance, selector) {
	const results = [];
	query(instance, selector, results);
	return results;
}
function query(instance, selector, results) {
	if (instance.isUnmounted || !instance.block) return null;
	let node = getBlockFirstNode(instance);
	if (!node || !node.parentNode) return null;
	const end = findBlockBoundary(instance).nextNode;
	while (node && node !== end) {
		if (node instanceof Element) {
			const matches = node.matches(selector);
			if (results) {
				if (matches) results.push(node);
				const children = node.querySelectorAll(selector);
				for (let i = 0; i < children.length; i++) results.push(children[i]);
			} else {
				const result = matches ? node : node.querySelector(selector);
				if (result) return result;
			}
		}
		node = node.nextSibling || void 0;
	}
	return null;
}
//#endregion
//#region packages/runtime-vapor-web/src/hover.ts
const states = /* @__PURE__ */ new WeakMap();
const controllers = /* @__PURE__ */ new WeakMap();
const owners = /* @__PURE__ */ new WeakMap();
function setHover(el, hoverClass, stopPropagation = false, startTime = 50, stayTime = 400, baseClass) {
	let state = states.get(el);
	if (state && state.cls === hoverClass && hoverClass !== "none" && state.stop === stopPropagation && state.start === startTime && state.stay === stayTime) return;
	if (isArray(hoverClass)) hoverClass = normalizeClass$1(hoverClass);
	const cls = typeof hoverClass === "string" && hoverClass !== "none" ? resolveExternalClass(el, hoverClass.trim()) : "";
	if (!state && !cls) return;
	if (!state) {
		const controller = getController(el.ownerDocument.defaultView ? el.ownerDocument : document);
		if (!controller) return;
		state = {
			el,
			controller,
			cls,
			base: baseClass === void 0 ? el.getAttribute("class") || "" : baseClass,
			stop: false,
			start: 50,
			stay: 400,
			down: false
		};
		states.set(el, state);
		controller.users++;
		const instance = currentInstance;
		let owned;
		if (instance) {
			owned = owners.get(instance);
			if (!owned) {
				owners.set(instance, owned = /* @__PURE__ */ new Set());
				const ownerStates = owned;
				onDeactivated(() => {
					for (const state of ownerStates) cancel(state);
				});
			}
			owned.add(state);
		}
		const current = state;
		onScopeDispose(() => {
			cancel(current);
			states.delete(el);
			if (owned) owned.delete(current);
			if (--controller.users === 0) {
				controller.dispose();
				controllers.delete(controller.doc);
			}
		});
	}
	const start = duration(startTime, 50);
	const stay = duration(stayTime, 400);
	const stop = includeBooleanAttr(stopPropagation);
	if (state.cls !== cls || state.start !== start || state.stay !== stay || state.stop !== stop) {
		cancel(state);
		state.cls = cls;
		state.start = start;
		state.stay = stay;
		state.stop = stop;
	}
}
function duration(value, fallback) {
	const parsed = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
	return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
}
function updateClass(state) {
	const el = state.el;
	let value = el.$root ? el.$clsi === void 0 ? state.base : el.$clsi : hasOwn(el, "$cls") ? el.$cls || "" : state.base;
	if (el.$root && el.$clsi$) value += " " + el.$clsi$;
	if (el.$hoverCls) value += " " + el.$hoverCls;
	const transition = el[vtcKey];
	if (transition) for (const cls of transition) value += " " + cls;
	value = value.trim();
	if (el.className !== value) el.className = value;
	if (!el.$hoverCls && (!transition || !transition.size)) el.$hoverUpdateClass = void 0;
}
function clearTimer(state) {
	if (state.timer !== void 0) {
		state.controller.win.clearTimeout(state.timer);
		state.timer = void 0;
	}
}
function cancel(state) {
	state.down = false;
	clearTimer(state);
	state.controller.active.delete(state);
	if (state.el.$hoverUpdateClass) {
		state.el.$hoverCls = "";
		state.el.$hoverUpdateClass();
	}
}
function scheduleEnd(state) {
	clearTimer(state);
	state.timer = state.controller.win.setTimeout(() => cancel(state), state.stay);
}
function begin(state) {
	cancel(state);
	state.down = true;
	state.controller.active.add(state);
	state.timer = state.controller.win.setTimeout(() => {
		state.timer = void 0;
		if (!state.el.isConnected) return cancel(state);
		state.el.$hoverCls = state.cls;
		state.el.$hoverUpdateClass = state.updateClass || (state.updateClass = () => updateClass(state));
		state.el.$hoverUpdateClass();
		if (!state.down) scheduleEnd(state);
	}, state.start);
}
function cancelAll(controller) {
	for (const state of controller.active) cancel(state);
	controller.pointer = void 0;
}
function getController(doc) {
	let controller = controllers.get(doc);
	if (controller) return controller;
	const win = doc.defaultView;
	if (!win) return;
	controller = {
		doc,
		win,
		users: 0,
		active: /* @__PURE__ */ new Set(),
		touchUntil: 0,
		dispose: () => {}
	};
	controllers.set(doc, controller);
	const current = controller;
	const listeners = [];
	function listen(target, name, fn) {
		target.addEventListener(name, fn, {
			capture: true,
			passive: true
		});
		listeners.push(() => target.removeEventListener(name, fn, true));
	}
	function start(event, pointer) {
		if (current.pointer !== void 0) return;
		let started = false;
		for (const target of event.composedPath()) {
			const state = states.get(target);
			if (state && state.cls) {
				begin(state);
				started = true;
				if (state.stop) break;
			}
		}
		if (started) current.pointer = pointer;
	}
	function end(pointer) {
		if (current.pointer !== pointer) return;
		current.pointer = void 0;
		for (const state of current.active) {
			if (!state.down) continue;
			state.down = false;
			if (state.el.$hoverCls) scheduleEnd(state);
		}
	}
	function cancelPointer() {
		for (const state of current.active) if (state.down) cancel(state);
		current.pointer = void 0;
	}
	const cancelCurrent = () => cancelAll(current);
	if ("PointerEvent" in win) {
		listen(doc, "pointerdown", (event) => {
			if (event.isPrimary !== false && event.button === 0) start(event, event.pointerId);
		});
		listen(win, "pointerup", (event) => end(event.pointerId));
		listen(win, "pointercancel", (event) => {
			if (current.pointer === event.pointerId) cancelPointer();
		});
	} else {
		listen(doc, "touchstart", (event) => {
			current.touchUntil = Date.now() + 800;
			if (event.touches.length === 1) start(event, event.touches[0].identifier);
			else cancelPointer();
		});
		listen(win, "touchend", (event) => {
			current.touchUntil = Date.now() + 800;
			for (const touch of Array.from(event.changedTouches)) end(touch.identifier);
		});
		listen(win, "touchcancel", cancelPointer);
		listen(doc, "mousedown", (event) => {
			if (event.button === 0 && Date.now() >= current.touchUntil) start(event, -1);
		});
		listen(win, "mouseup", () => end(-1));
	}
	listen(doc, "scroll", cancelCurrent);
	listen(win, "blur", cancelCurrent);
	listen(doc, "visibilitychange", () => {
		if (doc.hidden) cancelCurrent();
	});
	current.dispose = () => {
		cancelCurrent();
		for (const remove of listeners) remove();
	};
	return current;
}
//#endregion
//#region packages/runtime-vapor-web/src/view.ts
const hoverProps = /* @__PURE__ */ new Set([
	"hoverClass",
	"hover-class",
	"hoverStopPropagation",
	"hover-stop-propagation",
	"hoverStartTime",
	"hover-start-time",
	"hoverStayTime",
	"hover-stay-time",
	"flatten"
]);
function setViewDynamicProps(el, args, staticKeys, isSVG) {
	let hasViewProp = false;
	let hoverClassKey;
	let stopPropagationKey;
	let startTimeKey;
	let stayTimeKey;
	for (const source of args) {
		if (!source) continue;
		for (const key of Object.keys(source)) {
			switch (key) {
				case "hoverClass":
				case "hover-class":
					hoverClassKey = key;
					break;
				case "hoverStopPropagation":
				case "hover-stop-propagation":
					stopPropagationKey = key;
					break;
				case "hoverStartTime":
				case "hover-start-time":
					startTimeKey = key;
					break;
				case "hoverStayTime":
				case "hover-stay-time":
					stayTimeKey = key;
					break;
				case "flatten": break;
				default: continue;
			}
			hasViewProp = true;
		}
	}
	if (!hasViewProp) {
		setDynamicProps(el, args, staticKeys, isSVG);
		setHover(el, void 0);
		return;
	}
	const props = args.length > 1 ? mergeProps(...args) : args[0] || EMPTY_OBJ;
	const normalProps = {};
	for (const key of Object.keys(props)) if (!hoverProps.has(key)) normalProps[key] = props[key];
	setDynamicProps(el, [normalProps], staticKeys, isSVG);
	setHover(el, hoverClassKey === void 0 ? void 0 : props[hoverClassKey], stopPropagationKey === void 0 ? void 0 : props[stopPropagationKey], startTimeKey === void 0 ? void 0 : props[startTimeKey], stayTimeKey === void 0 ? void 0 : props[stayTimeKey]);
}
//#endregion
//#region packages/runtime-vapor-web/src/dataset.ts
function initUniDataset(el, data) {
	el.$uniDataset = data;
}
//#endregion
//#region packages/runtime-vapor-web/src/apiCreateRecycleFor.ts
function preCreateRecycleFor(src, getKey, getId) {
	const exposed = getCurrentInstance().provides["__uni_recycle_view_instance"].exposed;
	const source = /* @__PURE__ */ shallowRef();
	effect(() => {
		const items = normalizeSource(src());
		const keys = [];
		const ids = [];
		for (let i = 0; i < items.values.length; i++) {
			const item = getItem(items, i);
			keys.push(String(getKey ? getKey(...item) : item[1]));
			if (getId) ids.push(String(getId(...item)));
		}
		pauseTracking();
		try {
			source.value = items;
			exposed.updateList(keys);
			if (getId && exposed.updateListIds) exposed.updateListIds(ids);
		} finally {
			resetTracking();
		}
	});
	return () => {
		const items = source.value;
		const [start, length] = exposed.renderRange.value;
		const result = /* @__PURE__ */ new Map();
		const end = Math.min(start + length, items.values.length);
		for (let i = start; i < end; i++) {
			const [item, key] = getItem(items, i);
			result.set(key, item);
		}
		return result;
	};
}
var RecycleContext = class {};
function createRecycleContext() {
	return new RecycleContext();
}
const createRecycleFor = (recycleContext, src, renderItem, getKey, getType, flags = 0) => {
	const _insertionParent = insertionParent;
	const _insertionAnchor = insertionAnchor;
	const _insertionIndex = insertionIndex;
	let hydrationCursor = null;
	let hydrationClaim;
	if (isHydrating$1) {
		hydrationClaim = createFragmentClaim();
		hydrationCursor = enterHydrationCursor(hydrationClaim);
	} else resetInsertionState();
	let isMounted = false;
	let oldBlocks = [];
	let newBlocks;
	let newKeys;
	let newTypes;
	const cachedBlocks = /* @__PURE__ */ new Map();
	let parent;
	let held = false;
	let parentAnchor;
	if (!isHydrating$1) {
		parentAnchor = resolveFragmentAnchor(_insertionAnchor, "for");
		if (parentAnchor === _insertionAnchor) parent = parentAnchor.parentNode;
	}
	const slotBoundary = flags & 32 ? currentRenderContext.slotBoundary : null;
	const frag = new ForFragment(oldBlocks);
	const instance = getCurrentInstance();
	const isComponent = !!(flags & 2);
	const canUseFastRemove = !!(flags & 1) && !isComponent;
	const isSingleNode = !!(flags & 8);
	const isFragment = !!(flags & 16);
	const wrappedRows = !!(flags & 64);
	const ctx = currentRenderContext;
	if (!!(process.env.NODE_ENV !== "production") && !instance) warn("createRecycleFor() can only be used inside setup()");
	onScopeDispose(() => {
		stopBlockScopes(oldBlocks);
		if (newBlocks && newBlocks !== oldBlocks) stopBlockScopes(newBlocks);
		for (const blocks of cachedBlocks.values()) {
			stopBlockScopes(blocks);
			for (const block of blocks) remove(block.nodes);
		}
		oldBlocks = [];
		newBlocks = [];
		cachedBlocks.clear();
	}, true);
	const renderList = () => {
		const source = normalizeSource(src());
		const sourceKeys = source.keys;
		const newLength = source.values.length;
		const oldLength = oldBlocks.length;
		newBlocks = new Array(newLength);
		newKeys = void 0;
		if (getKey) {
			newKeys = new Array(newLength);
			for (let i = 0; i < newLength; i++) {
				const value = getItemValue(source, i);
				newKeys[i] = sourceKeys ? getKey(value, sourceKeys[i], i) : getKey(value, i, void 0);
			}
		}
		newTypes = new Array(newLength);
		for (let i = 0; i < newLength; i++) newTypes[i] = getType ? getType(...getItem(source, i)) : 0;
		const prevSub = setActiveSub();
		const wasMounted = isMounted;
		let wasValid;
		if (wasMounted && slotBoundary) wasValid = isValidSlot(frag);
		if (wasMounted && frag.bu) for (let i = 0; i < frag.bu.length; i++) frag.bu[i]();
		if (!wasMounted) {
			isMounted = true;
			if (isHydrating$1) hydrateList(source, newLength);
			else mountAll(source, newLength);
		} else {
			parent = parentAnchor.parentNode;
			held = isTransitionEnabled && !!slotBoundary && slotBoundary.isHolding();
			if (!oldLength) mountAll(source, newLength);
			else if (!newLength) {
				if (frag.resetListeners) for (const fn of frag.resetListeners) fn();
				const doRemove = !canUseFastRemove;
				for (let i = 0; i < oldLength; i++) unmount(oldBlocks[i], doRemove);
				if (canUseFastRemove) {
					parent.textContent = "";
					parent.appendChild(parentAnchor);
				}
			} else if (!getKey) {
				const commonLength = Math.min(newLength, oldLength);
				for (let i = 0; i < commonLength; i++) {
					const block = oldBlocks[i];
					if (block.type === newTypes[i]) updateAt(newBlocks[i] = block, source, i);
					else unmount(block);
				}
				for (let i = commonLength; i < oldLength; i++) unmount(oldBlocks[i]);
				for (let i = 0; i < newLength; i++) if (!newBlocks[i]) mount(source, i, parentAnchor);
			} else {
				if (!!(process.env.NODE_ENV !== "production")) {
					const keyToIndexMap = /* @__PURE__ */ new Map();
					for (let i = 0; i < newLength; i++) {
						const key = newKeys[i];
						if (key != null) {
							if (keyToIndexMap.has(key)) warn(`Duplicate keys found during update:`, JSON.stringify(key), `Make sure keys are unique.`);
							keyToIndexMap.set(key, i);
						}
					}
				}
				const commonLength = Math.min(oldLength, newLength);
				let endOffset = 0;
				while (endOffset < commonLength) {
					const index = newLength - endOffset - 1;
					const key = newKeys[index];
					const existingBlock = oldBlocks[oldLength - endOffset - 1];
					if (existingBlock.key !== key || existingBlock.type !== newTypes[index]) break;
					updateAt(existingBlock, source, index);
					newBlocks[index] = existingBlock;
					endOffset++;
				}
				const e1 = commonLength - endOffset;
				const e2 = oldLength - endOffset;
				const e3 = newLength - endOffset;
				const queuedIndices = [];
				const oldKeyIndexMap = /* @__PURE__ */ new Map();
				for (let i = 0; i < e1; i++) {
					const currentKey = newKeys[i];
					const oldBlock = oldBlocks[i];
					if (oldBlock.key === currentKey && oldBlock.type === newTypes[i]) updateAt(newBlocks[i] = oldBlock, source, i);
					else {
						queuedIndices.push(i);
						oldKeyIndexMap.set(oldBlock.key, i);
					}
				}
				for (let i = e1; i < e2; i++) oldKeyIndexMap.set(oldBlocks[i].key, i);
				for (let i = e1; i < e3; i++) queuedIndices.push(i);
				let queuedLength = queuedIndices.length;
				let sources = EMPTY_ARR;
				let mountCounter = 0;
				if (oldKeyIndexMap.size === 0) mountCounter = queuedLength;
				else {
					sources = new Array(queuedLength);
					for (let q = queuedLength - 1; q >= 0; q--) {
						const index = queuedIndices[q];
						const key = newKeys[index];
						const oldIndex = oldKeyIndexMap.get(key);
						if (oldIndex !== void 0 && oldBlocks[oldIndex].type === newTypes[index]) {
							oldKeyIndexMap.delete(key);
							const reusedBlock = newBlocks[index] = oldBlocks[oldIndex];
							updateAt(reusedBlock, source, index);
							sources[q] = oldIndex + 1;
						} else {
							sources[q] = 0;
							mountCounter++;
						}
					}
				}
				const useFastRemove = mountCounter === newLength;
				if (useFastRemove && frag.resetListeners) for (const fn of frag.resetListeners) fn();
				if (oldKeyIndexMap.size) for (const leftoverIndex of oldKeyIndexMap.values()) unmount(oldBlocks[leftoverIndex], !(useFastRemove && canUseFastRemove));
				if (useFastRemove && canUseFastRemove) {
					parent.textContent = "";
					parent.appendChild(parentAnchor);
				}
				let sequence;
				const hasReuse = mountCounter !== queuedLength;
				if (hasReuse) {
					sequence = planMoves(queuedIndices, sources, e2, e3);
					queuedLength = queuedIndices.length;
				}
				const allKept = hasReuse && sequence === void 0;
				let sequenceEnd = sequence ? sequence.length - 1 : -1;
				let scanFrom = newLength;
				let cachedAnchor;
				for (let q = queuedLength - 1; q >= 0; q--) {
					const index = queuedIndices[q];
					let isKept = allKept && sources[q] !== 0;
					if (sequenceEnd >= 0 && sequence[sequenceEnd] === q) {
						sequenceEnd--;
						isKept = sources[q] !== 0;
					}
					if (isKept) continue;
					let anchorNode;
					for (let i = index + 1; i < scanFrom; i++) {
						const node = getBlockFirstNode(newBlocks[i].nodes);
						if (node && node.parentNode === parent) {
							anchorNode = node;
							break;
						}
					}
					if (anchorNode === void 0) {
						if (cachedAnchor === void 0) cachedAnchor = parentAnchor;
						anchorNode = cachedAnchor;
					}
					scanFrom = index + 1;
					cachedAnchor = anchorNode;
					const block = newBlocks[index];
					if (block !== void 0) {
						if (!held) move(block.nodes, parent, anchorNode, 2);
					} else mount(source, index, anchorNode);
				}
			}
		}
		oldBlocks = newBlocks;
		frag.nodes = parentAnchor ? [newBlocks, parentAnchor] : [newBlocks];
		if (wasMounted && slotBoundary && isValidSlot(frag) !== wasValid) slotBoundary.markDirty();
		if (wasMounted && frag.u) for (const fn of frag.u) fn(frag.nodes);
		setActiveSub(prevSub);
	};
	const needKey = renderItem.length > 1;
	const needIndex = renderItem.length > 2;
	const insertForBlock = isSingleNode ? (block, anchor) => insertNode(block.nodes, parent, anchor) : isFragment ? (block, anchor) => insertFragment(block.nodes, parent, anchor) : (block, anchor) => insert(block.nodes, parent, anchor);
	const mount = (source, idx, anchor) => {
		const [item, key, index] = getItem(source, idx);
		const type = newTypes[idx];
		const cachedTypeBlocks = cachedBlocks.get(type);
		let block = cachedTypeBlocks && cachedTypeBlocks.pop();
		if (block) {
			const reusedBlock = block;
			triggerHooks(reusedBlock.nodes, "bru");
			update(reusedBlock, item, key, index);
			reusedBlock.key = newKeys ? newKeys[idx] : void 0;
			reusedBlock.scope.resume();
			resumeBlock(reusedBlock.nodes);
			queuePostFlushCb(() => triggerHooks(reusedBlock.nodes, "ru"));
		} else {
			const itemRef = /* @__PURE__ */ shallowRef(item);
			const keyRef = needKey ? /* @__PURE__ */ shallowRef(key) : void 0;
			const indexRef = needIndex ? /* @__PURE__ */ shallowRef(index) : void 0;
			let nodes;
			const scope = new EffectScope(true);
			const prevScope = setCurrentScope(scope);
			let ok = false;
			try {
				nodes = renderItem(itemRef, keyRef, indexRef);
				ok = true;
			} finally {
				setCurrentScope(prevScope);
				if (!ok) scope.stop();
			}
			block = new ForBlock(nodes, scope, itemRef, keyRef, indexRef, newKeys ? newKeys[idx] : void 0);
			block.type = type;
		}
		newBlocks[idx] = block;
		if (isTransitionEnabled && frag.$transition) {
			const hooks = frag.$transition;
			if (hooks.applyGroup) hooks.applyGroup(block, hooks.props, hooks.state, hooks.instance);
			else applyTransitionHooks(block.nodes, hooks);
		}
		const bm = frag.bm;
		if (bm) for (let i = 0; i < bm.length; i++) bm[i](block.nodes);
		if (parent && !held) insertForBlock(block, anchor);
		return block;
	};
	const mountAll = (source, newLength) => {
		for (let i = 0; i < newLength; i++) mount(source, i, parentAnchor);
	};
	const updateAt = (block, source, idx) => {
		const keys = source.keys;
		update(block, getItemValue(source, idx), keys ? keys[idx] : idx, keys ? idx : void 0);
	};
	function hydrateList(source, newLength) {
		const claim = hydrationClaim;
		let exitHydrationBoundary;
		const reuseBoundaryClose = (close) => {
			parentAnchor = claimAnchor(close);
			exitHydrationBoundary = enterHydrationBoundary(parentAnchor);
		};
		try {
			for (let i = 0; i < newLength; i++) {
				const node = currentHydrationNode;
				let nextNode = null;
				if (isComment(node, "]")) nextNode = claimAnchor(node);
				else if (wrappedRows && isComment(node, "[")) {
					nextNode = nextLogicalSibling(node);
					setCurrentHydrationNode(node.nextSibling);
				}
				mount(source, i, parentAnchor);
				if (nextNode) setCurrentHydrationNode(nextNode);
			}
			if (claim.start) {
				reuseBoundaryClose(locateClaimedEnd(claim.start));
				if (_insertionParent) {
					const idx = _insertionAnchor ? _insertionParent.$llc === _insertionAnchor ? _insertionParent.$lli : void 0 : _insertionIndex || 0;
					if (idx !== void 0) setLastLocatedLogicalChild(_insertionParent, parentAnchor, idx);
				}
			} else {
				const close = currentHydrationNode;
				if (!!(process.env.NODE_ENV !== "production") && !isComment(close, "]")) throw new Error(`v-for fragment anchor node was not found. this is likely a Vue internal bug.`);
				reuseBoundaryClose(close);
			}
		} finally {
			exitHydrationBoundary && exitHydrationBoundary();
		}
	}
	const update = ({ itemRef, keyRef, indexRef }, newItem, newKey, newIndex) => {
		if (newItem !== itemRef.value) itemRef.value = newItem;
		if (keyRef && newKey !== void 0 && newKey !== keyRef.value) keyRef.value = newKey;
		if (indexRef && newIndex !== indexRef.value) indexRef.value = newIndex;
	};
	const unmount = (block, doRemove = true) => {
		triggerHooks(block.nodes, "brc");
		if (doRemove) insert(block.nodes, document.createDocumentFragment());
		let cachedTypeBlocks = cachedBlocks.get(block.type);
		if (!cachedTypeBlocks) cachedBlocks.set(block.type, cachedTypeBlocks = []);
		cachedTypeBlocks.push(block);
		triggerHooks(block.nodes, "rc");
		block.scope.pause();
		pauseBlock(block.nodes);
	};
	renderEffect(() => {
		if (!isMounted) return renderList();
		withRenderContext(ctx, renderList);
	});
	if (isHydrating$1 && currentHydrationNode === parentAnchor) advanceHydrationNode(parentAnchor);
	finishBlockCreation(frag, parentAnchor, hydrationCursor, _insertionParent, _insertionAnchor);
	return frag;
};
function planMoves(queuedIndices, sources, e2, e3) {
	let queuedLength = queuedIndices.length;
	const denseLength = e3 - queuedIndices[0];
	const isDense = queuedLength * 2 >= denseLength;
	let moved = false;
	let maxSource = 0;
	if (isDense) {
		let read = queuedLength - 1;
		queuedIndices.length = sources.length = denseLength;
		for (let write = denseLength - 1, index = e3 - 1; write >= 0; write--, index--) {
			if (read >= 0 && queuedIndices[read] === index) sources[write] = sources[read--];
			else sources[write] = index + 1;
			queuedIndices[write] = index;
		}
		queuedLength = denseLength;
		for (let q = 0; q < queuedLength; q++) {
			const value = sources[q];
			if (value !== 0) {
				if (value < maxSource) moved = true;
				else maxSource = value;
			}
		}
	} else {
		let seg = 0;
		while (seg < queuedLength) {
			let segEnd = seg;
			while (segEnd + 1 < queuedLength && queuedIndices[segEnd + 1] === queuedIndices[segEnd] + 1) segEnd++;
			const lowerBound = queuedIndices[seg] - 1;
			const nextIndex = queuedIndices[segEnd] + 1;
			const upperBound = nextIndex < e3 ? nextIndex : e2;
			for (let q = seg; q <= segEnd; q++) {
				const value = sources[q];
				const oldIndex = value - 1;
				if (oldIndex <= lowerBound || oldIndex >= upperBound) sources[q] = 0;
				else if (value < maxSource) moved = true;
				else maxSource = value;
			}
			seg = segEnd + 1;
		}
	}
	return moved ? getSequence(sources) : void 0;
}
function stopBlockScopes(blocks) {
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		if (block) {
			const scope = block.scope;
			if (scope) scope.stop();
		}
	}
}
function normalizeSource(source) {
	let values = source;
	let needsWrap = false;
	let isReadonlySource = false;
	let keys;
	if (source instanceof Map) {
		keys = Array.from(source.keys());
		values = Array.from(source.values());
	} else if (isArray(source)) {
		if (/* @__PURE__ */ isReactive(source)) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			values = shallowReadArray(source);
			isReadonlySource = /* @__PURE__ */ isReadonly(source);
		}
	} else if (isString(source)) values = source.split("");
	else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			if (!!(process.env.NODE_ENV !== "production")) warn(`The v-for range expects a positive integer value but got ${source}.`);
			values = [];
		} else {
			values = new Array(source);
			for (let i = 0; i < source; i++) values[i] = i + 1;
		}
	} else if (isObject(source)) {
		if (source[Symbol.iterator]) values = Array.from(source);
		else {
			keys = Object.keys(source);
			values = new Array(keys.length);
			for (let i = 0, l = keys.length; i < l; i++) values[i] = source[keys[i]];
		}
	} else values = [];
	return {
		values,
		needsWrap,
		isReadonlySource,
		keys
	};
}
function getItemValue({ values, needsWrap, isReadonlySource }, idx) {
	return needsWrap ? isReadonlySource ? toReadonly(toReactive(values[idx])) : toReactive(values[idx]) : values[idx];
}
function getItem(source, idx) {
	const value = getItemValue(source, idx);
	if (source.keys) return [
		value,
		source.keys[idx],
		idx
	];
	else return [
		value,
		idx,
		void 0
	];
}
function pauseBlock(block) {
	if (isArray(block)) for (const child of block) pauseBlock(child);
	else if (isVaporComponent(block)) {
		block.scope.pause();
		pauseBlock(block.block);
	} else if (!(block instanceof Node)) {
		if (block.scope) block.scope.pause();
		pauseBlock(block.nodes);
	}
}
function resumeBlock(block) {
	if (isArray(block)) for (const child of block) resumeBlock(child);
	else if (isVaporComponent(block)) {
		block.scope.resume();
		resumeBlock(block.block);
	} else if (!(block instanceof Node)) {
		if (block.scope) block.scope.resume();
		resumeBlock(block.nodes);
	}
}
function triggerHooks(block, type) {
	if (isArray(block)) for (const child of block) triggerHooks(child, type);
	else if (isVaporComponent(block)) {
		const hooks = block.exposed && block.exposed.recycleHooks;
		const callbacks = hooks && hooks.get(type);
		if (callbacks) for (const callback of callbacks) callback();
	} else if (!(block instanceof Node)) triggerHooks(block.nodes, type);
}
function registerHook(type, name, callback) {
	const instance = getCurrentInstance();
	if (!instance) {
		if (!!(process.env.NODE_ENV !== "production")) warn(`${name}() can only be used inside setup().`);
		return;
	}
	const hooks = inject("__uni_recycle_hooks", null);
	if (!hooks) return;
	let callbacks = hooks.get(type);
	if (!callbacks) hooks.set(type, callbacks = []);
	const wrapped = () => {
		pauseTracking();
		const prev = setCurrentInstance(instance);
		try {
			callWithAsyncErrorHandling(callback, instance, 6);
		} finally {
			restoreCurrentInstance(prev);
			resetTracking();
		}
	};
	callbacks.push(wrapped);
	onScopeDispose(() => {
		const index = callbacks.indexOf(wrapped);
		if (index >= 0) callbacks.splice(index, 1);
	});
}
function onBeforeReuse(callback) {
	registerHook("bru", "onBeforeReuse", callback);
}
function onReused(callback) {
	registerHook("ru", "onReused", callback);
}
function onBeforeRecycle(callback) {
	registerHook("brc", "onBeforeRecycle", callback);
}
function onRecycled(callback) {
	registerHook("rc", "onRecycled", callback);
}
const onRecycle = onBeforeRecycle;
const onReuse = onReused;
function useRecycleState(getState) {
	const stateMap = inject("__uni_recycle_state_map", null);
	const itemKey = inject("__uni_recycle_state_key_ref", null);
	if (!stateMap || !itemKey) return /* @__PURE__ */ ref(getState());
	const cid = getComponentId(getCurrentInstance());
	const stateRef = /* @__PURE__ */ ref(null);
	let componentStates;
	effect(() => {
		const key = String(itemKey.value);
		componentStates = stateMap.get(key);
		if (!componentStates) stateMap.set(key, componentStates = /* @__PURE__ */ new Map());
		if (!componentStates.has(cid)) componentStates.set(cid, getState());
		stateRef.value = componentStates.get(cid);
	});
	onScopeDispose(() => componentStates.delete(cid));
	return /* @__PURE__ */ computed$1({
		get: () => stateRef.value,
		set: (value) => {
			componentStates.set(cid, value);
			stateRef.value = value;
		}
	});
}
//#endregion
//#region packages/runtime-vapor-web/src/image.ts
const imageStates = /* @__PURE__ */ new WeakMap();
const imageObservers = /* @__PURE__ */ new WeakMap();
const identity = (src) => src;
let realPathResolver = identity;
function setRealPathResolver(resolver) {
	realPathResolver = resolver || identity;
}
function setImageSrc(el, value, forceHydrate = true) {
	const image = el;
	if ("$imageSrcValue" in image && image.$imageSrcValue === value) return;
	image.$imageSrcValue = value;
	setDOMProp(el, "src", value == null ? value : realPathResolver(String(value)), forceHydrate);
}
/**
* 为 image 的用户事件补充旧组件的 detail，保持原生 Event 对象和方法不变。
*/
function withImageEventDetail(handler, name) {
	if (isArray(handler)) return handler.map((value) => withImageEventDetail(value, name));
	if (typeof handler !== "function") return handler;
	const wrapped = (event) => {
		const image = event.currentTarget || event.target;
		event.detail = name === "load" ? {
			width: image.naturalWidth,
			height: image.naturalHeight
		} : { errMsg: `GET ${image.getAttribute("src") || image.src} 404 (Not Found)` };
		return handler(event);
	};
	if (handler.__wwe) wrapped.__wwe = true;
	return wrapped;
}
function getImageEventName(key, dynamicEvent = false) {
	if (dynamicEvent) {
		const first = key.charCodeAt(0);
		if (first !== 108 && first !== 101 && first !== 76 && first !== 69) return;
	} else if (key.charCodeAt(0) !== 111 || key.charCodeAt(1) !== 110) return;
	const lower = key.toLowerCase();
	if (dynamicEvent) {
		if (!lower.startsWith("load") && !lower.startsWith("error")) return;
	} else if (!lower.startsWith("onload") && !lower.startsWith("onerror") && !lower.startsWith("on:load") && !lower.startsWith("on:error")) return;
	const [event] = parseEventName(dynamicEvent ? `on:${key}` : key);
	return event === "load" || event === "error" ? event : void 0;
}
function setImageMode(el, value) {
	const mode = typeof value === "string" ? value : "";
	if (el.$imageMode === mode) return;
	el.$imageMode = mode;
	if (mode) el.setAttribute("mode", mode);
	else el.removeAttribute("mode");
	if (mode === "widthFix" || mode === "heightFix") {
		let state = imageStates.get(el);
		if (!state) {
			const onLoad = () => updateImageSize(el);
			state = {
				mode,
				width: el.style.width,
				height: el.style.height,
				onLoad
			};
			imageStates.set(el, state);
			el.addEventListener("load", onLoad, { passive: true });
			if (getCurrentScope()) onScopeDispose(() => disposeImageState(el));
		} else state.mode = mode;
		if (mode === "widthFix") {
			el.style.width = state.width;
			el.style.height = "auto";
		} else {
			el.style.height = state.height;
			el.style.width = "auto";
		}
		const win = el.ownerDocument.defaultView;
		if (win && "ResizeObserver" in win) {
			let observer = imageObservers.get(win);
			if (!observer) {
				const ResizeObserverCtor = win.ResizeObserver;
				observer = new ResizeObserverCtor((entries) => {
					for (const entry of entries) {
						const image = entry.target;
						if (!image.isConnected) disposeImageState(image);
						else {
							const state = imageStates.get(image);
							if (state && state.frame == null) {
								const win = image.ownerDocument.defaultView;
								if (win) state.frame = win.requestAnimationFrame(() => {
									state.frame = void 0;
									updateImageSize(image, entry);
								});
							}
						}
					}
				});
				imageObservers.set(win, observer);
			}
			observer.observe(el);
		}
		updateImageSize(el);
	} else if (imageStates.has(el)) {
		const state = imageStates.get(el);
		imageStates.delete(el);
		el.removeEventListener("load", state.onLoad);
		const win = el.ownerDocument.defaultView;
		const observer = win && imageObservers.get(win);
		if (observer) observer.unobserve(el);
		el.style.width = state.width;
		el.style.height = state.height;
	}
}
function disposeImageState(el) {
	const state = imageStates.get(el);
	if (!state) return;
	const win = el.ownerDocument.defaultView;
	if (state.frame != null && win) win.cancelAnimationFrame(state.frame);
	imageStates.delete(el);
	el.removeEventListener("load", state.onLoad);
	const observer = win && imageObservers.get(win);
	if (observer) observer.unobserve(el);
}
function updateImageSize(el, rect) {
	const state = imageStates.get(el);
	if (!state || !el.naturalWidth || !el.naturalHeight) return;
	const ratio = el.naturalHeight / el.naturalWidth;
	let width;
	let height;
	if (rect && "contentRect" in rect) {
		const borderBox = rect.borderBoxSize;
		const size = Array.isArray(borderBox) ? borderBox[0] : borderBox;
		width = size ? size.inlineSize : rect.contentRect.width;
		height = size ? size.blockSize : rect.contentRect.height;
	} else {
		const measured = rect || el.getBoundingClientRect();
		width = measured.width;
		height = measured.height;
	}
	if (state.mode === "widthFix" && width) {
		const value = `${width * ratio}px`;
		if (el.style.height !== value) el.style.height = value;
	} else if (state.mode === "heightFix" && height) {
		const value = `${height / ratio}px`;
		if (el.style.width !== value) el.style.width = value;
	}
}
function setImageDynamicProps(el, args, staticKeys, isSVG) {
	let hasSrc = "$p$src" in el;
	let hasMode = "$imageModeDynamic" in el;
	let hasImageEvents = false;
	if (!hasSrc || !hasMode) for (const source of args) {
		if (source) for (const key in source) {
			if (key === "src") hasSrc = true;
			if (key === "mode") hasMode = true;
			if (getImageEventName(key)) hasImageEvents = true;
		}
		if (hasSrc && hasMode && hasImageEvents) break;
	}
	if (!hasSrc && !hasMode && !hasImageEvents) {
		setDynamicProps(el, args, staticKeys, isSVG);
		return;
	}
	const props = args.length > 1 ? mergeProps(...args) : args[0] || EMPTY_OBJ;
	const normalProps = {};
	for (const key of Object.keys(props)) if (key !== "src" && key !== "mode") {
		const event = getImageEventName(key);
		normalProps[key] = event ? withImageEventDetail(props[key], event) : props[key];
	}
	setDynamicProps(el, [normalProps], staticKeys, isSVG);
	if (hasOwn(props, "src") || "$p$src" in el) setImageSrc(el, props.src, isHydrating$1 && !!staticKeys && staticKeys.includes("src"));
	if (hasOwn(props, "mode") || "$imageModeDynamic" in el) {
		setImageMode(el, props.mode);
		if (hasOwn(props, "mode")) el.$imageModeDynamic = true;
		else delete el.$imageModeDynamic;
	}
}
function setImageDynamicEvents(el, events) {
	let hasImageEvents = false;
	for (const key in events) if (getImageEventName(key, true)) {
		hasImageEvents = true;
		break;
	}
	if (!hasImageEvents) {
		setDynamicEvents(el, events);
		return;
	}
	const normalized = Object.create(null);
	for (const key in events) {
		const event = getImageEventName(key, true);
		normalized[key] = event ? withImageEventDetail(events[key], event) : events[key];
	}
	setDynamicEvents(el, normalized);
}
//#endregion
export { BaseTransition, BaseTransitionPropsValidators, Comment$1 as Comment, DeprecationTypes, DynamicFragment, EffectScope, ErrorCodes, ErrorTypeStrings, ForBlock, ForFragment, Fragment, KeepAlive, MismatchTypes, MoveType, NULL_DYNAMIC_COMPONENT, PublicInstanceProxyHandlers, ReactiveEffect, RecycleContext, SchedulerJobFlags, Static, Suspense, Teleport, Text$1 as Text, TrackOpTypes, Transition, TransitionGroup, TransitionPropsValidators, TriggerOpTypes, VaporElement, VaporFragment, VaporKeepAlive, VaporSlot, VaporTeleport, VaporTransition, VaporTransitionGroup, VueElement, VueElementBase, activate, advanceHydrationNode, applyCheckboxModel, applyDynamicModel, applyRadioModel, applySelectModel, applyTextModel, applyTransitionHooks, applyVShow, assertNumber, baseApplyTranslation, baseEmit, baseNormalizePropsOptions, baseResolveTransitionHooks, callPendingCbs, callWithAsyncErrorHandling, callWithErrorHandling, camelize, capitalize, checkTransitionMode, child, claimAnchor, cloneVNode, compatUtils, compile, computed, createApp, createAppAPI, createAssetComponent, createAsyncComponentContext, createBlock, createCanSetSetupRefChecker, createComment, createCommentVNode, createComponent, createComponentWithFallback, createDynamicComponent, createElementBlock, createBaseVNode as createElementVNode, createFor, createForSlots, createFragmentClaim, createHydrationRenderer, createIf, createInternalObject, createInvoker, createKeyedFragment, createPlainElement, createPropsRestProxy, createRecycleContext, createRecycleFor, createRenderer, createSSRApp, createSelector, createSlot, createSlots, createStaticVNode, createTemplateRefSetter, createTextNode, createTextVNode, createVNode, createVaporApp, createVaporSSRApp, currentHydrationNode, currentInstance, currentRenderContext, customRef, deactivate, defaultPropGetter, defineAsyncComponent, defineComponent, defineCustomElement, defineEmits, defineExpose, defineModel, defineOptions, defineProps, defineSSRCustomElement, defineSlots, defineVaporAsyncComponent, defineVaporComponent, defineVaporCustomElement, defineVaporSSRCustomElement, delegate, delegateEvents, devtools, devtoolsComponentAdded, effect, effectScope, endMeasure, ensureHydrationRenderer, ensureRenderer, ensureValidVNode, enterHydrationBoundary, enterHydrationCursor, expose, extend, filterModelListeners, filterSingleRoot, findBlockBoundary, finishBlockCreation, flushOnAppMount, forceReflow, getAttributeMismatch, getBlockFirstNode, getComponentName, getContainerType, getCurrentInstance, getCurrentScope, getCurrentWatcher, getDefaultValue, getFunctionalFallthrough, getInheritedScopeIds, getNextUid, getPublicPropertiesMap, getRestElement, getOrigins as getTransitionGroupOrigins, getPosition as getTransitionGroupPosition, getOriginShift as getTransitionGroupShift, getTransitionRawChildren, guardReactiveProps, h, handleError, handleMovedChildren, hasCSSTransform, hasInjectionContext, hydrate, hydrateOnIdle, hydrateOnInteraction, hydrateOnMediaQuery, hydrateOnVisible, initCustomFormatter, initDirectivesForSSR, initFeatureFlags, initUniDataset, initUniPageHooks, inject, injectHook, insert, insertFragment, insertNode, insertionAnchor, insertionIndex, insertionParent, invalidateMount, invokeDirectiveHook, invokeKeepAliveHooks, invokeSlotFallback, invokeVNodeHook, isAsyncWrapper, isComment, isEmitListener, isFragment, isFunctionalFallthroughKey, isHydrating, isHydratingEnabled, isInSSRComponentSetup, isKeepAlive, isMapEqual, isMemoSame, isMismatchAllowed, isProxy, isReactive, isReadonly, isRef, isRuntimeOnly, isSetEqual, isShallow, isTeleportDeferred, isTeleportDisabled, isTemplateNode, isTemplateRefKey, isTransitionEnabled, isUnchangedResourceProp, isVNode, isValidHtmlOrSvgAttribute, isValidSlot, isVaporComponent, isHydrating$1 as isVaporHydrating, knownTemplateRefs, leaveCbKey, locateClaimedEnd, logError, logMismatchError, markAsyncBoundary, markRaw, matches, mergeDefaults, mergeModels, mergeProps, move, next, nextLogicalSibling, nextTick, nextUid, nodeOps, normalizeClass, normalizeContainer, normalizeProps, normalizeRef, normalizeStyle, normalizeUniText, normalizeVNode, nthChild, on, onActivated, onBeforeActivate, onBeforeDeactivate, onBeforeMount, onBeforeRecycle, onBeforeReuse, onBeforeUnmount, onBeforeUpdate, onBinding, onDeactivated, onErrorCaptured, onMounted, onRecycle, onRecycled, onRenderTracked, onRenderTriggered, onReuse, onReused, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, onWatcherCleanup, openBlock, parseEventName, patchClass, patchProp, patchStyle, pendingGroups as pendingTransitionGroups, performAsyncHydrate, performTransitionEnter, performTransitionLeave, popScopeId, popWarningContext, preCreateRecycleFor, prepareTransitionLeave, prepareTransitionSwitch, provide, proxyRefs, pushScopeId, pushWarningContext, querySelectorAllInComponent, querySelectorInComponent, queueJob, queuePostFlushCb, queuePostRenderEffect, rawVaporSlotKey, reactive, readonly, ref, registerHMR, registerRuntimeCompiler, remove, removeNode, render, renderEffect, renderList, renderSlot, resetInsertionState, resetKeepAliveHookState, resetShapeFlag, resolveComponent, resolveCssVars, resolveDirective, resolveDynamicComponent, resolveExternalClass, resolveFilter, resolveFragmentAnchor, resolvePropValue, resolveTarget as resolveTeleportTarget, resolveTransitionChild, resolveTransitionHooks, resolveTransitionProps, restoreCurrentInstance, setAttr, setBlockKey, setBlockTracking, setClass, setClassName, setCurrentHydrationNode, setCurrentInstance, setCurrentRenderingInstance, setDOMProp, setDevtoolsHook, setDynamicEvents, setDynamicProps, setElementText, setHover, setHtml, setImageDynamicEvents, setImageDynamicProps, setImageMode, setImageSrc, setInsertionState, setIsHydratingEnabled, setLastLocatedLogicalChild, setListener, setNativeEventNormalizer, setProp, setRealPathResolver, setRef, setStaticTemplateRef, setStyle, setTemplateRefBinding, setText, setTransitionHooks, setUniPageHooksInitializer, setValue, setVarsOnNode, setViewDynamicProps, shallowReactive, shallowReadonly, shallowRef, shouldSetAsProp, shouldSetAsPropForVueCE, shouldUpdateComponent, simpleSetCurrentInstance, ssrContextKey, ssrUtils, startMeasure, stop, svgNS, syncSelectValue, template, toClassSet, toDisplayString, toHandlerKey, toHandlers, toRaw, toRef, toRefs, toStyleMap, toValue, transformVNodeArgs, triggerRef, txt, unref, unregisterHMR, unsafeToTrustedHTML, useAsyncComponentState, useAttrs, useCssModule, useCssVars, useHost, useId, useInstanceOption, useModel, useRecycleState, useSSRContext, useShadowRoot, useSlots, useTemplateRef, useTransitionState, useVaporCssVars, vModelCheckbox, vModelCheckboxInit, vModelCheckboxUpdate, vModelDynamic, getValue as vModelGetValue, vModelRadio, vModelSelect, vModelSelectInit, vModelSetSelected, vModelText, vModelTextInit, vModelTextUpdate, vShow, vShowHidden, vShowOriginalDisplay, validateComponentName, validateProps, vaporInteropPlugin, version, vtcKey, warn, warnExtraneousAttributes, warnPropMismatch, watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withComponentId, withCtx, withDefaults, withDirectives, withImageEventDetail, withKeys, withMemo, withModifiers, withOnce, withRenderContext, withScopeId, withVaporDirectives, withVaporKeys, withVaporModifiers, xlinkNS };
