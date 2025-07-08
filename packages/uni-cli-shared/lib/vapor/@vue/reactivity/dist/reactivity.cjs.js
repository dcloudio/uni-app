/**
* @vue/reactivity v3.5.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@vue/shared');

var SubscriberFlags = /* @__PURE__ */ ((SubscriberFlags2) => {
  SubscriberFlags2[SubscriberFlags2["Computed"] = 1] = "Computed";
  SubscriberFlags2[SubscriberFlags2["Effect"] = 2] = "Effect";
  SubscriberFlags2[SubscriberFlags2["Tracking"] = 4] = "Tracking";
  SubscriberFlags2[SubscriberFlags2["Recursed"] = 16] = "Recursed";
  SubscriberFlags2[SubscriberFlags2["Dirty"] = 32] = "Dirty";
  SubscriberFlags2[SubscriberFlags2["PendingComputed"] = 64] = "PendingComputed";
  SubscriberFlags2[SubscriberFlags2["Propagated"] = 96] = "Propagated";
  return SubscriberFlags2;
})(SubscriberFlags || {});
const notifyBuffer = [];
let batchDepth = 0;
let notifyIndex = 0;
let notifyBufferLength = 0;
function startBatch() {
  ++batchDepth;
}
function endBatch() {
  if (!--batchDepth) {
    processEffectNotifications();
  }
}
function link(dep, sub) {
  const currentDep = sub.depsTail;
  if (currentDep !== void 0 && currentDep.dep === dep) {
    return;
  }
  const nextDep = currentDep !== void 0 ? currentDep.nextDep : sub.deps;
  if (nextDep !== void 0 && nextDep.dep === dep) {
    sub.depsTail = nextDep;
    return;
  }
  const depLastSub = dep.subsTail;
  if (depLastSub !== void 0 && depLastSub.sub === sub && isValidLink(depLastSub, sub)) {
    return;
  }
  return linkNewDep(dep, sub, nextDep, currentDep);
}
function propagate(current) {
  let next = current.nextSub;
  let branchs;
  let branchDepth = 0;
  let targetFlag = 32 /* Dirty */;
  top: do {
    const sub = current.sub;
    const subFlags = sub.flags;
    let shouldNotify = false;
    if (!(subFlags & (4 /* Tracking */ | 16 /* Recursed */ | 96 /* Propagated */))) {
      sub.flags = subFlags | targetFlag;
      shouldNotify = true;
    } else if (subFlags & 16 /* Recursed */ && !(subFlags & 4 /* Tracking */)) {
      sub.flags = subFlags & -17 /* Recursed */ | targetFlag;
      shouldNotify = true;
    } else if (!(subFlags & 96 /* Propagated */) && isValidLink(current, sub)) {
      sub.flags = subFlags | 16 /* Recursed */ | targetFlag;
      shouldNotify = sub.subs !== void 0;
    }
    if (shouldNotify) {
      const subSubs = sub.subs;
      if (subSubs !== void 0) {
        current = subSubs;
        if (subSubs.nextSub !== void 0) {
          branchs = { target: next, linked: branchs };
          ++branchDepth;
          next = current.nextSub;
        }
        targetFlag = 64 /* PendingComputed */;
        continue;
      }
      if (subFlags & 2 /* Effect */) {
        notifyBuffer[notifyBufferLength++] = sub;
      }
    } else if (!(subFlags & (4 /* Tracking */ | targetFlag))) {
      sub.flags = subFlags | targetFlag;
    } else if (!(subFlags & targetFlag) && subFlags & 96 /* Propagated */ && isValidLink(current, sub)) {
      sub.flags = subFlags | targetFlag;
    }
    if ((current = next) !== void 0) {
      next = current.nextSub;
      targetFlag = branchDepth ? 64 /* PendingComputed */ : 32 /* Dirty */;
      continue;
    }
    while (branchDepth--) {
      current = branchs.target;
      branchs = branchs.linked;
      if (current !== void 0) {
        next = current.nextSub;
        targetFlag = branchDepth ? 64 /* PendingComputed */ : 32 /* Dirty */;
        continue top;
      }
    }
    break;
  } while (true);
  if (!batchDepth) {
    processEffectNotifications();
  }
}
function startTracking(sub) {
  sub.depsTail = void 0;
  sub.flags = sub.flags & -113 | 4 /* Tracking */;
}
function endTracking(sub) {
  const depsTail = sub.depsTail;
  if (depsTail !== void 0) {
    const nextDep = depsTail.nextDep;
    if (nextDep !== void 0) {
      clearTracking(nextDep);
      depsTail.nextDep = void 0;
    }
  } else if (sub.deps !== void 0) {
    clearTracking(sub.deps);
    sub.deps = void 0;
  }
  sub.flags &= -5 /* Tracking */;
}
function updateDirtyFlag(sub, flags) {
  if (checkDirty(sub.deps)) {
    sub.flags = flags | 32 /* Dirty */;
    return true;
  } else {
    sub.flags = flags & -65 /* PendingComputed */;
    return false;
  }
}
function processComputedUpdate(computed, flags) {
  if (flags & 32 /* Dirty */ || checkDirty(computed.deps)) {
    if (computed.update()) {
      const subs = computed.subs;
      if (subs !== void 0) {
        shallowPropagate(subs);
      }
    }
  } else {
    computed.flags = flags & -65 /* PendingComputed */;
  }
}
function processEffectNotifications() {
  while (notifyIndex < notifyBufferLength) {
    const effect = notifyBuffer[notifyIndex];
    notifyBuffer[notifyIndex++] = void 0;
    effect.notify();
  }
  notifyIndex = 0;
  notifyBufferLength = 0;
}
function linkNewDep(dep, sub, nextDep, depsTail) {
  const newLink = {
    dep,
    sub,
    nextDep,
    prevSub: void 0,
    nextSub: void 0
  };
  if (depsTail === void 0) {
    sub.deps = newLink;
  } else {
    depsTail.nextDep = newLink;
  }
  if (dep.subs === void 0) {
    dep.subs = newLink;
  } else {
    const oldTail = dep.subsTail;
    newLink.prevSub = oldTail;
    oldTail.nextSub = newLink;
  }
  sub.depsTail = newLink;
  dep.subsTail = newLink;
  return newLink;
}
function checkDirty(current) {
  let prevLinks;
  let checkDepth = 0;
  let dirty;
  top: do {
    dirty = false;
    const dep = current.dep;
    if (current.sub.flags & 32 /* Dirty */) {
      dirty = true;
    } else if ("flags" in dep) {
      const depFlags = dep.flags;
      if ((depFlags & (1 /* Computed */ | 32 /* Dirty */)) === (1 /* Computed */ | 32 /* Dirty */)) {
        if (dep.update()) {
          const subs = dep.subs;
          if (subs.nextSub !== void 0) {
            shallowPropagate(subs);
          }
          dirty = true;
        }
      } else if ((depFlags & (1 /* Computed */ | 64 /* PendingComputed */)) === (1 /* Computed */ | 64 /* PendingComputed */)) {
        if (current.nextSub !== void 0 || current.prevSub !== void 0) {
          prevLinks = { target: current, linked: prevLinks };
        }
        current = dep.deps;
        ++checkDepth;
        continue;
      }
    }
    if (!dirty && current.nextDep !== void 0) {
      current = current.nextDep;
      continue;
    }
    while (checkDepth) {
      --checkDepth;
      const sub = current.sub;
      const firstSub = sub.subs;
      if (dirty) {
        if (sub.update()) {
          if (firstSub.nextSub !== void 0) {
            current = prevLinks.target;
            prevLinks = prevLinks.linked;
            shallowPropagate(firstSub);
          } else {
            current = firstSub;
          }
          continue;
        }
      } else {
        sub.flags &= -65 /* PendingComputed */;
      }
      if (firstSub.nextSub !== void 0) {
        current = prevLinks.target;
        prevLinks = prevLinks.linked;
      } else {
        current = firstSub;
      }
      if (current.nextDep !== void 0) {
        current = current.nextDep;
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
    const subFlags = sub.flags;
    if ((subFlags & (64 /* PendingComputed */ | 32 /* Dirty */)) === 64 /* PendingComputed */) {
      sub.flags = subFlags | 32 /* Dirty */;
    }
    link2 = link2.nextSub;
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
function clearTracking(link2) {
  do {
    const dep = link2.dep;
    const nextDep = link2.nextDep;
    const nextSub = link2.nextSub;
    const prevSub = link2.prevSub;
    if (nextSub !== void 0) {
      nextSub.prevSub = prevSub;
    } else {
      dep.subsTail = prevSub;
    }
    if (prevSub !== void 0) {
      prevSub.nextSub = nextSub;
    } else {
      dep.subs = nextSub;
    }
    if (dep.subs === void 0 && "deps" in dep) {
      const depFlags = dep.flags;
      if (!(depFlags & 32 /* Dirty */)) {
        dep.flags = depFlags | 32 /* Dirty */;
      }
      const depDeps = dep.deps;
      if (depDeps !== void 0) {
        link2 = depDeps;
        dep.depsTail.nextDep = nextDep;
        dep.deps = void 0;
        dep.depsTail = void 0;
        continue;
      }
    }
    link2 = nextDep;
  } while (link2 !== void 0);
}

const triggerEventInfos = [];
function onTrack(sub, debugInfo) {
  if (sub.onTrack) {
    sub.onTrack(
      shared.extend(
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
      shared.extend(
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
      if (!(target._flags & SubscriberFlags.Propagated) && !!(value & SubscriberFlags.Propagated)) {
        onTrigger(this);
      }
      target._flags = value;
    }
  });
}

function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false, parent = activeEffectScope) {
    this.detached = detached;
    // Subscriber: In order to collect orphans computeds
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 0;
    /**
     * @internal track `on` calls, allow `on` call multiple times
     */
    this._on = 0;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this.parent = parent;
    if (!detached && parent) {
      this.index = (parent.scopes || (parent.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return !(this.flags & 1024);
  }
  pause() {
    if (!(this.flags & 256)) {
      this.flags |= 256;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this.flags & 256) {
      this.flags &= -257;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].resume();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].resume();
      }
    }
  }
  run(fn) {
    if (this.active) {
      const prevEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = prevEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.flags |= 1024;
      startTracking(this);
      endTracking(this);
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (!failSilently) {
    warn(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}

const EffectFlags = {
  "ALLOW_RECURSE": 128,
  "128": "ALLOW_RECURSE",
  "PAUSED": 256,
  "256": "PAUSED",
  "NOTIFIED": 512,
  "512": "NOTIFIED",
  "STOP": 1024,
  "1024": "STOP"
};
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    // Subscriber
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = SubscriberFlags.Effect;
    /**
     * @internal
     */
    this.cleanup = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  get active() {
    return !(this.flags & 1024);
  }
  pause() {
    if (!(this.flags & 256)) {
      this.flags |= 256;
    }
  }
  resume() {
    const flags = this.flags;
    if (flags & 256) {
      this.flags &= -257;
    }
    if (flags & 512) {
      this.flags &= -513;
      this.notify();
    }
  }
  notify() {
    const flags = this.flags;
    if (!(flags & 256)) {
      this.scheduler();
    } else {
      this.flags |= 512;
    }
  }
  scheduler() {
    if (this.dirty) {
      this.run();
    }
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    cleanupEffect(this);
    const prevSub = activeSub;
    setActiveSub(this);
    startTracking(this);
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      setActiveSub(prevSub);
      endTracking(this);
      if (this.flags & SubscriberFlags.Recursed && this.flags & 128) {
        this.flags &= ~SubscriberFlags.Recursed;
        this.notify();
      }
    }
  }
  stop() {
    if (this.active) {
      startTracking(this);
      endTracking(this);
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags |= 1024;
    }
  }
  get dirty() {
    const flags = this.flags;
    if (flags & SubscriberFlags.Dirty || flags & SubscriberFlags.PendingComputed && updateDirtyFlag(this, flags)) {
      return true;
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
    shared.extend(e, options);
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
  activeSub = void 0;
}
function enableTracking() {
  const isPaused = activeSub === void 0;
  if (!isPaused) {
    resetTrackingStack.push(activeSub);
  } else {
    resetTrackingStack.push(void 0);
    for (let i = resetTrackingStack.length - 1; i >= 0; i--) {
      if (resetTrackingStack[i] !== void 0) {
        activeSub = resetTrackingStack[i];
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
    activeSub = resetTrackingStack.pop();
  } else {
    activeSub = void 0;
  }
}
function onEffectCleanup(fn, failSilently = false) {
  if (activeSub instanceof ReactiveEffect) {
    activeSub.cleanup = fn;
  } else if (!failSilently) {
    warn(
      `onEffectCleanup() was called when there was no active effect to associate with.`
    );
  }
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup !== void 0) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let activeSub = void 0;
function setActiveSub(sub) {
  activeSub = sub;
}

class Dep {
  constructor(map, key) {
    this.map = map;
    this.key = key;
    this._subs = void 0;
    this.subsTail = void 0;
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
      {
        triggerEventInfos.pop();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = shared.isArray(target);
    const isArrayIndex = targetIsArray && shared.isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !shared.isSymbol(key2) && key2 >= newLength) {
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
            if (shared.isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (shared.isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (shared.isMap(target)) {
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
      ...args.map((x) => shared.isArray(x) ? reactiveReadArray(x) : x)
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
  pauseTracking();
  startBatch();
  const res = toRaw(self)[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}

const isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol)
);
function hasOwnProperty(key) {
  if (!shared.isSymbol(key)) key = String(key);
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
    const targetIsArray = shared.isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
    }
    if (shared.isObject(res)) {
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
      if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = shared.hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      shared.isArray(target) ? "length" : ITERATE_KEY
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
    const targetIsMap = shared.isMap(rawTarget);
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
        `${shared.capitalize(type)} operation ${key}failed: target is readonly.`,
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
        if (shared.hasChanged(key, rawKey)) {
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
        if (shared.hasChanged(key, rawKey)) {
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
  shared.extend(
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
        } else if (shared.hasChanged(value, oldValue)) {
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
        const oldTarget = shared.isMap(target) ? new Map(target) : new Set(target) ;
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
      shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target,
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
    const type = shared.toRawType(target);
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
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(shared.toRawType(value));
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
  if (!shared.isObject(target)) {
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
  if (!shared.hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    shared.def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
const toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;

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
  constructor(value, wrap) {
    // Dependency
    this.subs = void 0;
    this.subsTail = void 0;
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = wrap ? toRaw(value) : value;
    this._value = wrap ? wrap(value) : value;
    this._wrap = wrap;
    this["__v_isShallow"] = !wrap;
  }
  get dep() {
    return this;
  }
  get value() {
    trackRef(this);
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (shared.hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = this._wrap && !useDirectValue ? this._wrap(newValue) : newValue;
      {
        triggerEventInfos.push({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      }
      triggerRef(this);
      {
        triggerEventInfos.pop();
      }
    }
  }
}
function triggerRef(ref2) {
  const dep = ref2.dep;
  if (dep !== void 0 && dep.subs !== void 0) {
    propagate(dep.subs);
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
  return shared.isFunction(source) ? source() : unref(source);
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
    // Dependency
    this.subs = void 0;
    this.subsTail = void 0;
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
  const ret = shared.isArray(object) ? new Array(object.length) : {};
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
  } else if (shared.isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (shared.isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

class ComputedRefImpl {
  constructor(fn, setter) {
    this.fn = fn;
    this.setter = setter;
    /**
     * @internal
     */
    this._value = void 0;
    // Dependency
    this.subs = void 0;
    this.subsTail = void 0;
    // Subscriber
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = SubscriberFlags.Computed | SubscriberFlags.Dirty;
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
    if (flags & SubscriberFlags.Dirty || flags & SubscriberFlags.PendingComputed && updateDirtyFlag(this, this.flags)) {
      return true;
    }
    return false;
  }
  /**
   * @internal
   * for backwards compat
   */
  set _dirty(v) {
    if (v) {
      this.flags |= SubscriberFlags.Dirty;
    } else {
      this.flags &= ~(SubscriberFlags.Dirty | SubscriberFlags.PendingComputed);
    }
  }
  get value() {
    const flags = this.flags;
    if (flags & (SubscriberFlags.Dirty | SubscriberFlags.PendingComputed)) {
      processComputedUpdate(this, flags);
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
    const prevSub = activeSub;
    setActiveSub(this);
    startTracking(this);
    try {
      const oldValue = this._value;
      const newValue = this.fn(oldValue);
      if (shared.hasChanged(oldValue, newValue)) {
        this._value = newValue;
        return true;
      }
      return false;
    } finally {
      setActiveSub(prevSub);
      endTracking(this);
    }
  }
}
{
  setupOnTrigger(ComputedRefImpl);
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (shared.isFunction(getterOrOptions)) {
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
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!failSilently) {
    warn(
      `onWatcherCleanup() was called when there was no active watcher to associate with.`
    );
  }
}
function watch(source, cb, options = shared.EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (shared.isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (shared.isFunction(s)) {
        return call ? call(s, 2) : s();
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (shared.isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = shared.NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect.stop();
    if (scope && scope.active) {
      shared.remove(scope.effects, effect);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!effect.active || !immediateFirstRun && !effect.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => shared.hasChanged(v, oldValue[i])) : shared.hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect = new ReactiveEffect(getter);
  effect.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
  cleanup = effect.onStop = () => {
    const cleanups = cleanupMap.get(effect);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect);
    }
  };
  {
    effect.onTrack = options.onTrack;
    effect.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect.run();
  }
  watchHandle.pause = effect.pause.bind(effect);
  watchHandle.resume = effect.resume.bind(effect);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !shared.isObject(value) || value["__v_skip"]) {
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
  } else if (shared.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (shared.isSet(value) || shared.isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (shared.isPlainObject(value)) {
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
