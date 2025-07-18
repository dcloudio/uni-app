/**
* @vue/reactivity v3.6.0-alpha.2
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var VueReactivity = (function (exports) {
  'use strict';

  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }

  const EMPTY_OBJ = Object.freeze({}) ;
  const NOOP = () => {
  };
  const extend = Object.assign;
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };

  function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }

  var ReactiveFlags$1 = /* @__PURE__ */ ((ReactiveFlags2) => {
    ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
    ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
    ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
    ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
    ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
    ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
    ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
    return ReactiveFlags2;
  })(ReactiveFlags$1 || {});
  const notifyBuffer = [];
  let batchDepth = 0;
  let activeSub = void 0;
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
    if (!--batchDepth && notifyBufferLength) {
      flush();
    }
  }
  function link(dep, sub) {
    const prevDep = sub.depsTail;
    if (prevDep !== void 0 && prevDep.dep === dep) {
      return;
    }
    let nextDep = void 0;
    const recursedCheck = sub.flags & 4 /* RecursedCheck */;
    if (recursedCheck) {
      nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
      if (nextDep !== void 0 && nextDep.dep === dep) {
        sub.depsTail = nextDep;
        return;
      }
    }
    const prevSub = dep.subsTail;
    const newLink = sub.depsTail = dep.subsTail = {
      dep,
      sub,
      prevDep,
      nextDep,
      prevSub,
      nextSub: void 0
    };
    if (nextDep !== void 0) {
      nextDep.prevDep = newLink;
    }
    if (prevDep !== void 0) {
      prevDep.nextDep = newLink;
    } else {
      sub.deps = newLink;
    }
    if (prevSub !== void 0) {
      prevSub.nextSub = newLink;
    } else {
      dep.subs = newLink;
    }
  }
  function unlink(link2, sub = link2.sub) {
    const dep = link2.dep;
    const prevDep = link2.prevDep;
    const nextDep = link2.nextDep;
    const nextSub = link2.nextSub;
    const prevSub = link2.prevSub;
    if (nextDep !== void 0) {
      nextDep.prevDep = prevDep;
    } else {
      sub.depsTail = prevDep;
    }
    if (prevDep !== void 0) {
      prevDep.nextDep = nextDep;
    } else {
      sub.deps = nextDep;
    }
    if (nextSub !== void 0) {
      nextSub.prevSub = prevSub;
    } else {
      dep.subsTail = prevSub;
    }
    if (prevSub !== void 0) {
      prevSub.nextSub = nextSub;
    } else if ((dep.subs = nextSub) === void 0) {
      let toRemove = dep.deps;
      if (toRemove !== void 0) {
        do {
          toRemove = unlink(toRemove, dep);
        } while (toRemove !== void 0);
        dep.flags |= 16 /* Dirty */;
      }
    }
    return nextDep;
  }
  function propagate(link2) {
    let next = link2.nextSub;
    let stack;
    top: do {
      const sub = link2.sub;
      let flags = sub.flags;
      if (flags & (1 /* Mutable */ | 2 /* Watching */)) {
        if (!(flags & (4 /* RecursedCheck */ | 8 /* Recursed */ | 16 /* Dirty */ | 32 /* Pending */))) {
          sub.flags = flags | 32 /* Pending */;
        } else if (!(flags & (4 /* RecursedCheck */ | 8 /* Recursed */))) {
          flags = 0 /* None */;
        } else if (!(flags & 4 /* RecursedCheck */)) {
          sub.flags = flags & -9 /* Recursed */ | 32 /* Pending */;
        } else if (!(flags & (16 /* Dirty */ | 32 /* Pending */)) && isValidLink(link2, sub)) {
          sub.flags = flags | 8 /* Recursed */ | 32 /* Pending */;
          flags &= 1 /* Mutable */;
        } else {
          flags = 0 /* None */;
        }
        if (flags & 2 /* Watching */) {
          notifyBuffer[notifyBufferLength++] = sub;
        }
        if (flags & 1 /* Mutable */) {
          const subSubs = sub.subs;
          if (subSubs !== void 0) {
            link2 = subSubs;
            if (subSubs.nextSub !== void 0) {
              stack = { value: next, prev: stack };
              next = link2.nextSub;
            }
            continue;
          }
        }
      }
      if ((link2 = next) !== void 0) {
        next = link2.nextSub;
        continue;
      }
      while (stack !== void 0) {
        link2 = stack.value;
        stack = stack.prev;
        if (link2 !== void 0) {
          next = link2.nextSub;
          continue top;
        }
      }
      break;
    } while (true);
  }
  function startTracking(sub) {
    sub.depsTail = void 0;
    sub.flags = sub.flags & -57 | 4 /* RecursedCheck */;
    return setActiveSub(sub);
  }
  function endTracking(sub, prevSub) {
    if (activeSub !== sub) {
      warn(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      );
    }
    activeSub = prevSub;
    const depsTail = sub.depsTail;
    let toRemove = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
    while (toRemove !== void 0) {
      toRemove = unlink(toRemove, sub);
    }
    sub.flags &= -5 /* RecursedCheck */;
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
  function checkDirty(link2, sub) {
    let stack;
    let checkDepth = 0;
    top: do {
      const dep = link2.dep;
      const depFlags = dep.flags;
      let dirty = false;
      if (sub.flags & 16 /* Dirty */) {
        dirty = true;
      } else if ((depFlags & (1 /* Mutable */ | 16 /* Dirty */)) === (1 /* Mutable */ | 16 /* Dirty */)) {
        if (dep.update()) {
          const subs = dep.subs;
          if (subs.nextSub !== void 0) {
            shallowPropagate(subs);
          }
          dirty = true;
        }
      } else if ((depFlags & (1 /* Mutable */ | 32 /* Pending */)) === (1 /* Mutable */ | 32 /* Pending */)) {
        if (link2.nextSub !== void 0 || link2.prevSub !== void 0) {
          stack = { value: link2, prev: stack };
        }
        link2 = dep.deps;
        sub = dep;
        ++checkDepth;
        continue;
      }
      if (!dirty && link2.nextDep !== void 0) {
        link2 = link2.nextDep;
        continue;
      }
      while (checkDepth) {
        --checkDepth;
        const firstSub = sub.subs;
        const hasMultipleSubs = firstSub.nextSub !== void 0;
        if (hasMultipleSubs) {
          link2 = stack.value;
          stack = stack.prev;
        } else {
          link2 = firstSub;
        }
        if (dirty) {
          if (sub.update()) {
            if (hasMultipleSubs) {
              shallowPropagate(firstSub);
            }
            sub = link2.sub;
            continue;
          }
        } else {
          sub.flags &= -33 /* Pending */;
        }
        sub = link2.sub;
        if (link2.nextDep !== void 0) {
          link2 = link2.nextDep;
          continue top;
        }
        dirty = false;
      }
      return dirty;
    } while (true);
  }
  function shallowPropagate(link2) {
    do {
      const sub = link2.sub;
      const nextSub = link2.nextSub;
      const subFlags = sub.flags;
      if ((subFlags & (32 /* Pending */ | 16 /* Dirty */)) === 32 /* Pending */) {
        sub.flags = subFlags | 16 /* Dirty */;
      }
      link2 = nextSub;
    } while (link2 !== void 0);
  }
  function isValidLink(checkLink, sub) {
    const depsTail = sub.depsTail;
    if (depsTail !== void 0) {
      let link2 = sub.deps;
      do {
        if (link2 === checkLink) {
          return true;
        }
        if (link2 === depsTail) {
          break;
        }
        link2 = link2.nextDep;
      } while (link2 !== void 0);
    }
    return false;
  }

  const triggerEventInfos = [];
  function onTrack(sub, debugInfo) {
    if (sub.onTrack) {
      sub.onTrack(
        extend(
          {
            effect: sub
          },
          debugInfo
        )
      );
    }
  }
  function onTrigger(sub) {
    if (sub.onTrigger) {
      const debugInfo = triggerEventInfos[triggerEventInfos.length - 1];
      sub.onTrigger(
        extend(
          {
            effect: sub
          },
          debugInfo
        )
      );
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
        if (!(target._flags & (ReactiveFlags$1.Dirty | ReactiveFlags$1.Pending)) && !!(value & (ReactiveFlags$1.Dirty | ReactiveFlags$1.Pending))) {
          onTrigger(this);
        }
        target._flags = value;
      }
    });
  }

  class Dep {
    constructor(map, key) {
      this.map = map;
      this.key = key;
      this._subs = void 0;
      this.subsTail = void 0;
      this.flags = ReactiveFlags$1.None;
    }
    get subs() {
      return this._subs;
    }
    set subs(value) {
      this._subs = value;
      if (value === void 0) {
        this.map.delete(this.key);
      }
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = Symbol(
    "Object iterate" 
  );
  const MAP_KEY_ITERATE_KEY = Symbol(
    "Map keys iterate" 
  );
  const ARRAY_ITERATE_KEY = Symbol(
    "Array iterate" 
  );
  function track(target, type, key) {
    if (activeSub !== void 0) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep(depsMap, key));
      }
      {
        onTrack(activeSub, {
          target,
          type,
          key
        });
      }
      link(dep, activeSub);
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const run = (dep) => {
      if (dep !== void 0 && dep.subs !== void 0) {
        {
          triggerEventInfos.push({
            target,
            type,
            key,
            newValue,
            oldValue,
            oldTarget
          });
        }
        propagate(dep.subs);
        shallowPropagate(dep.subs);
        {
          triggerEventInfos.pop();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function getDepFromReactive(object, key) {
    const depMap = targetMap.get(object);
    return depMap && depMap.get(key);
  }

  function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, toReactive);
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toReactive(value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
    },
    find(fn, thisArg) {
      return apply(this, "find", fn, thisArg, toReactive, arguments);
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(this, "findLast", fn, thisArg, toReactive, arguments);
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
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
    // keys() iterator only reads `length`, no optimisation required
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
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
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
      return iterator(this, "values", toReactive);
    }
  };
  function iterator(self, method, wrapValue) {
    const arr = shallowReadArray(self);
    const iter = arr[method]();
    if (arr !== self && !isShallow(self)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (result.value) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self);
    const needsWrap = arr !== self && !isShallow(self);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toReactive(item), index, self);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self, method, fn, args) {
    const arr = shallowReadArray(self);
    let wrappedFn = fn;
    if (arr !== self) {
      if (!isShallow(self)) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, toReactive(item), index, self);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self);
        };
      }
    }
    return arr[method](wrappedFn, ...args);
  }
  function searchProxy(self, method, args) {
    const arr = toRaw(self);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
      args[0] = toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self, method, args = []) {
    startBatch();
    const prevSub = setActiveSub();
    const res = toRaw(self)[method].apply(self, args);
    setActiveSub(prevSub);
    endBatch();
    return res;
  }

  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const wasRef = isRef(target);
      const res = Reflect.get(
        target,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        wasRef ? target : receiver
      );
      if (wasRef && key !== "value") {
        return res;
      }
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
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
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
        isRef(target) ? target : receiver
      );
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      {
        warn(
          `Set operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
    deleteProperty(target, key) {
      {
        warn(
          `Delete operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
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
    return function(...args) {
      {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        warn(
          `${capitalize(type)} operation ${key}failed: target is readonly.`,
          toRaw(this)
        );
      }
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
        return Reflect.get(target, "size", target);
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
        !readonly && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          if (!shallow && !isShallow(value) && !isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const proto = getProto(target);
          const hadKey = proto.has.call(target, value);
          if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && !isShallow(value) && !isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          } else {
            checkIdentityKeys(target, has, key);
          }
          const oldValue = get.call(target, key);
          target.set(key, value);
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value, oldValue);
          }
          return this;
        },
        delete(key) {
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          } else {
            checkIdentityKeys(target, has, key);
          }
          const oldValue = get ? get.call(target, key) : void 0;
          const result = target.delete(key);
          if (hadKey) {
            trigger(target, "delete", key, void 0, oldValue);
          }
          return result;
        },
        clear() {
          const target = toRaw(this);
          const hadItems = target.size !== 0;
          const oldTarget = isMap(target) ? new Map(target) : new Set(target) ;
          const result = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0,
              oldTarget
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
      const type = toRawType(target);
      warn(
        `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }

  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1 /* COMMON */;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2 /* COLLECTION */;
      default:
        return 0 /* INVALID */;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      {
        warn(
          `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
        );
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
    );
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
    return value ? !!value["__v_raw"] : false;
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? readonly(value) : value;

  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  function ref(value) {
    return createRef(value, toReactive);
  }
  function shallowRef(value) {
    return createRef(value);
  }
  function createRef(rawValue, wrap) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, wrap);
  }
  class RefImpl {
    // TODO isolatedDeclarations "__v_isShallow"
    constructor(value, wrap) {
      this.subs = void 0;
      this.subsTail = void 0;
      this.flags = ReactiveFlags$1.Mutable;
      /**
       * @internal
       */
      this.__v_isRef = true;
      // TODO isolatedDeclarations "__v_isRef"
      /**
       * @internal
       */
      this.__v_isShallow = false;
      this._oldValue = this._rawValue = wrap ? toRaw(value) : value;
      this._value = wrap ? wrap(value) : value;
      this._wrap = wrap;
      this["__v_isShallow"] = !wrap;
    }
    get dep() {
      return this;
    }
    get value() {
      trackRef(this);
      if (this.flags & ReactiveFlags$1.Dirty && this.update()) {
        const subs = this.subs;
        if (subs !== void 0) {
          shallowPropagate(subs);
        }
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
      newValue = useDirectValue ? newValue : toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this.flags |= ReactiveFlags$1.Dirty;
        this._rawValue = newValue;
        this._value = !useDirectValue && this._wrap ? this._wrap(newValue) : newValue;
        const subs = this.subs;
        if (subs !== void 0) {
          {
            triggerEventInfos.push({
              target: this,
              type: "set",
              key: "value",
              newValue,
              oldValue
            });
          }
          propagate(subs);
          if (!batchDepth) {
            flush();
          }
          {
            triggerEventInfos.pop();
          }
        }
      }
    }
    update() {
      this.flags &= ~ReactiveFlags$1.Dirty;
      return hasChanged(this._oldValue, this._oldValue = this._rawValue);
    }
  }
  function triggerRef(ref2) {
    const dep = ref2.dep;
    if (dep !== void 0 && dep.subs !== void 0) {
      propagate(dep.subs);
      shallowPropagate(dep.subs);
      if (!batchDepth) {
        flush();
      }
    }
  }
  function trackRef(dep) {
    if (activeSub !== void 0) {
      {
        onTrack(activeSub, {
          target: dep,
          type: "get",
          key: "value"
        });
      }
      link(dep, activeSub);
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  function toValue(source) {
    return isFunction(source) ? source() : unref(source);
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class CustomRefImpl {
    constructor(factory) {
      this.subs = void 0;
      this.subsTail = void 0;
      this.flags = ReactiveFlags$1.None;
      this["__v_isRef"] = true;
      this._value = void 0;
      const { get, set } = factory(
        () => trackRef(this),
        () => triggerRef(this)
      );
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
  }
  function customRef(factory) {
    return new CustomRefImpl(factory);
  }
  function toRefs(object) {
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this["__v_isRef"] = true;
      this._value = void 0;
    }
    get value() {
      const val = this._object[this._key];
      return this._value = val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  }
  class GetterRefImpl {
    constructor(_getter) {
      this._getter = _getter;
      this["__v_isRef"] = true;
      this["__v_isReadonly"] = true;
      this._value = void 0;
    }
    get value() {
      return this._value = this._getter();
    }
  }
  function toRef(source, key, defaultValue) {
    if (isRef(source)) {
      return source;
    } else if (isFunction(source)) {
      return new GetterRefImpl(source);
    } else if (isObject(source) && arguments.length > 1) {
      return propertyToRef(source, key, defaultValue);
    } else {
      return ref(source);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
  }

  const EffectFlags = {
    "ALLOW_RECURSE": 128,
    "128": "ALLOW_RECURSE",
    "PAUSED": 256,
    "256": "PAUSED",
    "STOP": 1024,
    "1024": "STOP"
  };
  class ReactiveEffect {
    constructor(fn) {
      this.deps = void 0;
      this.depsTail = void 0;
      this.subs = void 0;
      this.subsTail = void 0;
      this.flags = ReactiveFlags$1.Watching | ReactiveFlags$1.Dirty;
      /**
       * @internal
       */
      this.cleanups = [];
      /**
       * @internal
       */
      this.cleanupsLength = 0;
      if (fn !== void 0) {
        this.fn = fn;
      }
      if (activeEffectScope) {
        link(this, activeEffectScope);
      }
    }
    // @ts-expect-error
    fn() {
    }
    get active() {
      return !(this.flags & 1024);
    }
    pause() {
      this.flags |= 256;
    }
    resume() {
      const flags = this.flags &= -257;
      if (flags & (ReactiveFlags$1.Dirty | ReactiveFlags$1.Pending)) {
        this.notify();
      }
    }
    notify() {
      if (!(this.flags & 256) && this.dirty) {
        this.run();
      }
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      cleanup(this);
      const prevSub = startTracking(this);
      try {
        return this.fn();
      } finally {
        endTracking(this, prevSub);
        const flags = this.flags;
        if ((flags & (ReactiveFlags$1.Recursed | 128)) === (ReactiveFlags$1.Recursed | 128)) {
          this.flags = flags & ~ReactiveFlags$1.Recursed;
          this.notify();
        }
      }
    }
    stop() {
      if (!this.active) {
        return;
      }
      this.flags = 1024;
      let dep = this.deps;
      while (dep !== void 0) {
        dep = unlink(dep, this);
      }
      const sub = this.subs;
      if (sub !== void 0) {
        unlink(sub);
      }
      cleanup(this);
    }
    get dirty() {
      const flags = this.flags;
      if (flags & ReactiveFlags$1.Dirty) {
        return true;
      }
      if (flags & ReactiveFlags$1.Pending) {
        if (checkDirty(this.deps, this)) {
          this.flags = flags | ReactiveFlags$1.Dirty;
          return true;
        } else {
          this.flags = flags & ~ReactiveFlags$1.Pending;
        }
      }
      return false;
    }
  }
  {
    setupOnTrigger(ReactiveEffect);
  }
  function effect(fn, options) {
    if (fn.effect instanceof ReactiveEffect) {
      fn = fn.effect.fn;
    }
    const e = new ReactiveEffect(fn);
    if (options) {
      const { onStop, scheduler } = options;
      if (onStop) {
        options.onStop = void 0;
        const stop2 = e.stop.bind(e);
        e.stop = () => {
          stop2();
          onStop();
        };
      }
      if (scheduler) {
        options.scheduler = void 0;
        e.notify = () => {
          if (!(e.flags & 256)) {
            scheduler();
          }
        };
      }
      extend(e, options);
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
  function stop(runner) {
    runner.effect.stop();
  }
  const resetTrackingStack = [];
  function pauseTracking() {
    resetTrackingStack.push(activeSub);
    setActiveSub();
  }
  function enableTracking() {
    const isPaused = activeSub === void 0;
    if (!isPaused) {
      resetTrackingStack.push(activeSub);
    } else {
      resetTrackingStack.push(void 0);
      for (let i = resetTrackingStack.length - 1; i >= 0; i--) {
        if (resetTrackingStack[i] !== void 0) {
          setActiveSub(resetTrackingStack[i]);
          break;
        }
      }
    }
  }
  function resetTracking() {
    if (resetTrackingStack.length === 0) {
      warn(
        `resetTracking() was called when there was no active tracking to reset.`
      );
    }
    if (resetTrackingStack.length) {
      setActiveSub(resetTrackingStack.pop());
    } else {
      setActiveSub();
    }
  }
  function cleanup(sub) {
    const l = sub.cleanupsLength;
    if (l) {
      for (let i = 0; i < l; i++) {
        sub.cleanups[i]();
      }
      sub.cleanupsLength = 0;
    }
  }
  function onEffectCleanup(fn, failSilently = false) {
    if (activeSub instanceof ReactiveEffect) {
      activeSub.cleanups[activeSub.cleanupsLength++] = () => cleanupEffect(fn);
    } else if (!failSilently) {
      warn(
        `onEffectCleanup() was called when there was no active effect to associate with.`
      );
    }
  }
  function cleanupEffect(fn) {
    const prevSub = setActiveSub();
    try {
      fn();
    } finally {
      setActiveSub(prevSub);
    }
  }

  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.deps = void 0;
      this.depsTail = void 0;
      this.subs = void 0;
      this.subsTail = void 0;
      this.flags = 0;
      /**
       * @internal
       */
      this.cleanups = [];
      /**
       * @internal
       */
      this.cleanupsLength = 0;
      if (!detached && activeEffectScope) {
        link(this, activeEffectScope);
      }
    }
    get active() {
      return !(this.flags & 1024);
    }
    pause() {
      if (!(this.flags & 256)) {
        this.flags |= 256;
        for (let link2 = this.deps; link2 !== void 0; link2 = link2.nextDep) {
          const dep = link2.dep;
          if ("pause" in dep) {
            dep.pause();
          }
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
        for (let link2 = this.deps; link2 !== void 0; link2 = link2.nextDep) {
          const dep = link2.dep;
          if ("resume" in dep) {
            dep.resume();
          }
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
      if (!this.active) {
        return;
      }
      this.flags = 1024;
      let dep = this.deps;
      while (dep !== void 0) {
        const node = dep.dep;
        if ("stop" in node) {
          dep = dep.nextDep;
          node.stop();
        } else {
          dep = unlink(dep, this);
        }
      }
      const sub = this.subs;
      if (sub !== void 0) {
        unlink(sub);
      }
      cleanup(this);
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
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
  function onScopeDispose(fn, failSilently = false) {
    if (activeEffectScope !== void 0) {
      activeEffectScope.cleanups[activeEffectScope.cleanupsLength++] = fn;
    } else if (!failSilently) {
      warn(
        `onScopeDispose() is called when there is no active effect scope to be associated with.`
      );
    }
  }

  class ComputedRefImpl {
    constructor(fn, setter) {
      this.fn = fn;
      this.setter = setter;
      /**
       * @internal
       */
      this._value = void 0;
      this.subs = void 0;
      this.subsTail = void 0;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = ReactiveFlags$1.Mutable | ReactiveFlags$1.Dirty;
      /**
       * @internal
       */
      this.__v_isRef = true;
      this["__v_isReadonly"] = !setter;
    }
    // TODO isolatedDeclarations "__v_isReadonly"
    // for backwards compat
    get effect() {
      return this;
    }
    // for backwards compat
    get dep() {
      return this;
    }
    /**
     * @internal
     * for backwards compat
     */
    get _dirty() {
      const flags = this.flags;
      if (flags & ReactiveFlags$1.Dirty) {
        return true;
      }
      if (flags & ReactiveFlags$1.Pending) {
        if (checkDirty(this.deps, this)) {
          this.flags = flags | ReactiveFlags$1.Dirty;
          return true;
        } else {
          this.flags = flags & ~ReactiveFlags$1.Pending;
        }
      }
      return false;
    }
    /**
     * @internal
     * for backwards compat
     */
    set _dirty(v) {
      if (v) {
        this.flags |= ReactiveFlags$1.Dirty;
      } else {
        this.flags &= ~(ReactiveFlags$1.Dirty | ReactiveFlags$1.Pending);
      }
    }
    get value() {
      const flags = this.flags;
      if (flags & ReactiveFlags$1.Dirty || flags & ReactiveFlags$1.Pending && checkDirty(this.deps, this)) {
        if (this.update()) {
          const subs = this.subs;
          if (subs !== void 0) {
            shallowPropagate(subs);
          }
        }
      } else if (flags & ReactiveFlags$1.Pending) {
        this.flags = flags & ~ReactiveFlags$1.Pending;
      }
      if (activeSub !== void 0) {
        {
          onTrack(activeSub, {
            target: this,
            type: "get",
            key: "value"
          });
        }
        link(this, activeSub);
      } else if (activeEffectScope !== void 0) {
        link(this, activeEffectScope);
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      } else {
        warn("Write operation failed: computed value is readonly");
      }
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
  }
  {
    setupOnTrigger(ComputedRefImpl);
  }
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
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
  const ReactiveFlags = {
    "SKIP": "__v_skip",
    "IS_REACTIVE": "__v_isReactive",
    "IS_READONLY": "__v_isReadonly",
    "IS_SHALLOW": "__v_isShallow",
    "RAW": "__v_raw",
    "IS_REF": "__v_isRef"
  };

  const WatchErrorCodes = {
    "WATCH_GETTER": 2,
    "2": "WATCH_GETTER",
    "WATCH_CALLBACK": 3,
    "3": "WATCH_CALLBACK",
    "WATCH_CLEANUP": 4,
    "4": "WATCH_CLEANUP"
  };
  const INITIAL_WATCHER_VALUE = {};
  let activeWatcher = void 0;
  function getCurrentWatcher() {
    return activeWatcher;
  }
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      const { call } = owner.options;
      if (call) {
        owner.cleanups[owner.cleanupsLength++] = () => call(cleanupFn, 4);
      } else {
        owner.cleanups[owner.cleanupsLength++] = cleanupFn;
      }
    } else if (!failSilently) {
      warn(
        `onWatcherCleanup() was called when there was no active watcher to associate with.`
      );
    }
  }
  class WatcherEffect extends ReactiveEffect {
    constructor(source, cb, options = EMPTY_OBJ) {
      const { deep, once, call, onWarn } = options;
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
      } else if (isReactive(source)) {
        getter = () => reactiveGetter(source, deep);
        forceTrigger = true;
      } else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
        getter = () => source.map((s) => {
          if (isRef(s)) {
            return s.value;
          } else if (isReactive(s)) {
            return reactiveGetter(s, deep);
          } else if (isFunction(s)) {
            return call ? call(s, 2) : s();
          } else {
            warnInvalidSource(s, onWarn);
          }
        });
      } else if (isFunction(source)) {
        if (cb) {
          getter = call ? () => call(source, 2) : source;
        } else {
          getter = () => {
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
              return call ? call(source, 3, [
                this.boundCleanup
              ]) : source(this.boundCleanup);
            } finally {
              activeWatcher = currentEffect;
            }
          };
        }
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
          _cb(...args);
          this.stop();
        };
      }
      this.cb = cb;
      this.oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
      {
        this.onTrack = options.onTrack;
        this.onTrigger = options.onTrigger;
      }
    }
    run(initialRun = false) {
      const oldValue = this.oldValue;
      const newValue = this.oldValue = super.run();
      if (!this.cb) {
        return;
      }
      const { immediate, deep, call } = this.options;
      if (initialRun && !immediate) {
        return;
      }
      if (deep || this.forceTrigger || (this.isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        cleanup(this);
        const currentWatcher = activeWatcher;
        activeWatcher = this;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : this.isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            this.boundCleanup
          ];
          call ? call(this.cb, 3, args) : (
            // @ts-expect-error
            this.cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    }
  }
  function reactiveGetter(source, deep) {
    if (deep) return source;
    if (isShallow(source) || deep === false || deep === 0)
      return traverse(source, 1);
    return traverse(source);
  }
  function warnInvalidSource(s, onWarn) {
    (onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  }
  function watch(source, cb, options = EMPTY_OBJ) {
    const effect = new WatcherEffect(source, cb, options);
    effect.run(true);
    const stop = effect.stop.bind(effect);
    stop.pause = effect.pause.bind(effect);
    stop.resume = effect.resume.bind(effect);
    stop.stop = stop;
    return stop;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    depth--;
    if (isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }

  exports.ARRAY_ITERATE_KEY = ARRAY_ITERATE_KEY;
  exports.EffectFlags = EffectFlags;
  exports.EffectScope = EffectScope;
  exports.ITERATE_KEY = ITERATE_KEY;
  exports.MAP_KEY_ITERATE_KEY = MAP_KEY_ITERATE_KEY;
  exports.ReactiveEffect = ReactiveEffect;
  exports.ReactiveFlags = ReactiveFlags;
  exports.TrackOpTypes = TrackOpTypes;
  exports.TriggerOpTypes = TriggerOpTypes;
  exports.WatchErrorCodes = WatchErrorCodes;
  exports.WatcherEffect = WatcherEffect;
  exports.computed = computed;
  exports.customRef = customRef;
  exports.effect = effect;
  exports.effectScope = effectScope;
  exports.enableTracking = enableTracking;
  exports.getCurrentScope = getCurrentScope;
  exports.getCurrentWatcher = getCurrentWatcher;
  exports.isProxy = isProxy;
  exports.isReactive = isReactive;
  exports.isReadonly = isReadonly;
  exports.isRef = isRef;
  exports.isShallow = isShallow;
  exports.markRaw = markRaw;
  exports.onEffectCleanup = onEffectCleanup;
  exports.onScopeDispose = onScopeDispose;
  exports.onWatcherCleanup = onWatcherCleanup;
  exports.pauseTracking = pauseTracking;
  exports.proxyRefs = proxyRefs;
  exports.reactive = reactive;
  exports.reactiveReadArray = reactiveReadArray;
  exports.readonly = readonly;
  exports.ref = ref;
  exports.resetTracking = resetTracking;
  exports.setActiveSub = setActiveSub;
  exports.setCurrentScope = setCurrentScope;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadArray = shallowReadArray;
  exports.shallowReadonly = shallowReadonly;
  exports.shallowRef = shallowRef;
  exports.stop = stop;
  exports.toRaw = toRaw;
  exports.toReactive = toReactive;
  exports.toReadonly = toReadonly;
  exports.toRef = toRef;
  exports.toRefs = toRefs;
  exports.toValue = toValue;
  exports.track = track;
  exports.traverse = traverse;
  exports.trigger = trigger;
  exports.triggerRef = triggerRef;
  exports.unref = unref;
  exports.watch = watch;

  return exports;

})({});
