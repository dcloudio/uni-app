import { extend, isSymbol, isObject, hasOwn, def, hasChanged, isFunction, isArray as isArray$1, toRawType, EMPTY_OBJ, NOOP, remove as remove$1, isSet, isMap, isPlainObject, isIntegerKey, makeMap, capitalize, hyphenate, isPromise, getGlobalThis, isString, toHandlerKey, camelize, isReservedProp, looseToNumber, isOn, isBuiltInTag, invokeArrayFns, parseStringStyle, canSetValueDirectly, isBuiltInDirective, isRegExp, toNumber, EMPTY_ARR, toDisplayString, NO, getSequence, isModelListener, normalizeStyle as normalizeStyle$2, normalizeClass as normalizeClass$1, stringifyStyle, isKnownSvgAttr, isBooleanAttr, isKnownHtmlAttr, includeBooleanAttr, isRenderableAttrValue, getEscapedCssVarName, isGloballyAllowed, YES } from '@vue/shared';
export { camelize, capitalize, hyphenate, toDisplayString, toHandlerKey } from '@vue/shared';
import { isRootHook, isRootImmediateHook, ON_LOAD, normalizeClass, normalizeStyle as normalizeStyle$1, ON_SHOW, ON_HIDE, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, ON_EXIT, ON_READY, ON_UNLOAD, ON_RESIZE, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SHARE_TIMELINE, ON_SHARE_APP_MESSAGE } from '@dcloudio/uni-shared';
export { normalizeClass, normalizeProps, normalizeStyle } from '@dcloudio/uni-shared';

/**
* @vue/reactivity v3.5.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var SubscriberFlags = /* @__PURE__ */(SubscriberFlags2 => {
  SubscriberFlags2[SubscriberFlags2["Computed"] = 1] = "Computed";
  SubscriberFlags2[SubscriberFlags2["Effect"] = 2] = "Effect";
  SubscriberFlags2[SubscriberFlags2["Tracking"] = 4] = "Tracking";
  SubscriberFlags2[SubscriberFlags2["Recursed"] = 16] = "Recursed";
  SubscriberFlags2[SubscriberFlags2["Dirty"] = 32] = "Dirty";
  SubscriberFlags2[SubscriberFlags2["PendingComputed"] = 64] = "PendingComputed";
  SubscriberFlags2[SubscriberFlags2["Propagated"] = 96] = "Propagated";
  return SubscriberFlags2;
})(SubscriberFlags || {});
var notifyBuffer = [];
var batchDepth = 0;
var notifyIndex = 0;
var notifyBufferLength = 0;
function startBatch() {
  ++batchDepth;
}
function endBatch() {
  if (! --batchDepth) {
    processEffectNotifications();
  }
}
function link(dep, sub) {
  var currentDep = sub.depsTail;
  if (currentDep !== void 0 && currentDep.dep === dep) {
    return;
  }
  var nextDep = currentDep !== void 0 ? currentDep.nextDep : sub.deps;
  if (nextDep !== void 0 && nextDep.dep === dep) {
    sub.depsTail = nextDep;
    return;
  }
  var depLastSub = dep.subsTail;
  if (depLastSub !== void 0 && depLastSub.sub === sub && isValidLink(depLastSub, sub)) {
    return;
  }
  return linkNewDep(dep, sub, nextDep, currentDep);
}
function propagate(current) {
  var next = current.nextSub;
  var branchs;
  var branchDepth = 0;
  var targetFlag = 32 /* Dirty */;
  top: do {
    var sub = current.sub;
    var subFlags = sub.flags;
    var shouldNotify = false;
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
      var subSubs = sub.subs;
      if (subSubs !== void 0) {
        current = subSubs;
        if (subSubs.nextSub !== void 0) {
          branchs = {
            target: next,
            linked: branchs
          };
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
  var depsTail = sub.depsTail;
  if (depsTail !== void 0) {
    var nextDep = depsTail.nextDep;
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
      var subs = computed.subs;
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
    var _effect = notifyBuffer[notifyIndex];
    notifyBuffer[notifyIndex++] = void 0;
    _effect.notify();
  }
  notifyIndex = 0;
  notifyBufferLength = 0;
}
function linkNewDep(dep, sub, nextDep, depsTail) {
  var newLink = {
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
    var oldTail = dep.subsTail;
    newLink.prevSub = oldTail;
    oldTail.nextSub = newLink;
  }
  sub.depsTail = newLink;
  dep.subsTail = newLink;
  return newLink;
}
function checkDirty(current) {
  var prevLinks;
  var checkDepth = 0;
  var dirty;
  top: do {
    dirty = false;
    var dep = current.dep;
    if (current.sub.flags & 32 /* Dirty */) {
      dirty = true;
    } else if ("flags" in dep) {
      var depFlags = dep.flags;
      if ((depFlags & (1 /* Computed */ | 32 /* Dirty */)) === (1 /* Computed */ | 32 /* Dirty */)) {
        if (dep.update()) {
          var subs = dep.subs;
          if (subs.nextSub !== void 0) {
            shallowPropagate(subs);
          }
          dirty = true;
        }
      } else if ((depFlags & (1 /* Computed */ | 64 /* PendingComputed */)) === (1 /* Computed */ | 64 /* PendingComputed */)) {
        if (current.nextSub !== void 0 || current.prevSub !== void 0) {
          prevLinks = {
            target: current,
            linked: prevLinks
          };
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
      var sub = current.sub;
      var firstSub = sub.subs;
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
    var sub = link2.sub;
    var subFlags = sub.flags;
    if ((subFlags & (64 /* PendingComputed */ | 32 /* Dirty */)) === 64 /* PendingComputed */) {
      sub.flags = subFlags | 32 /* Dirty */;
    }
    link2 = link2.nextSub;
  } while (link2 !== void 0);
}
function isValidLink(checkLink, sub) {
  var depsTail = sub.depsTail;
  if (depsTail !== void 0) {
    var link2 = sub.deps;
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
    var dep = link2.dep;
    var nextDep = link2.nextDep;
    var nextSub = link2.nextSub;
    var prevSub = link2.prevSub;
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
      var depFlags = dep.flags;
      if (!(depFlags & 32 /* Dirty */)) {
        dep.flags = depFlags | 32 /* Dirty */;
      }
      var depDeps = dep.deps;
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
var triggerEventInfos = [];
function onTrack(sub, debugInfo) {
  if (sub.onTrack) {
    sub.onTrack(extend({
      effect: sub
    }, debugInfo));
  }
}
function onTrigger(sub) {
  if (sub.onTrigger) {
    var debugInfo = triggerEventInfos[triggerEventInfos.length - 1];
    sub.onTrigger(extend({
      effect: sub
    }, debugInfo));
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
function warn$2(msg) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  console.warn("[Vue warn] ".concat(msg), ...args);
}
var activeEffectScope;
class EffectScope {
  constructor() {
    var detached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : activeEffectScope;
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
      var i, l;
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
      var i, l;
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
      var prevEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = prevEffectScope;
      }
    } else {
      warn$2("cannot run an inactive effect scope.");
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
      var i, l;
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
        var last = this.parent.scopes.pop();
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
function onScopeDispose(fn) {
  var failSilently = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (!failSilently) {
    warn$2("onScopeDispose() is called when there is no active effect scope to be associated with.");
  }
}
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
    var flags = this.flags;
    if (flags & 256) {
      this.flags &= -257;
    }
    if (flags & 512) {
      this.flags &= -513;
      this.notify();
    }
  }
  notify() {
    var flags = this.flags;
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
    var prevSub = activeSub;
    setActiveSub(this);
    startTracking(this);
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn$2("Active effect was not restored correctly - this is likely a Vue internal bug.");
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
    var flags = this.flags;
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
  var e = new ReactiveEffect(fn);
  if (options) {
    extend(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  var runner = e.run.bind(e);
  runner.effect = e;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
var resetTrackingStack = [];
function pauseTracking() {
  resetTrackingStack.push(activeSub);
  activeSub = void 0;
}
function resetTracking() {
  if (resetTrackingStack.length === 0) {
    warn$2("resetTracking() was called when there was no active tracking to reset.");
  }
  if (resetTrackingStack.length) {
    activeSub = resetTrackingStack.pop();
  } else {
    activeSub = void 0;
  }
}
function onEffectCleanup(fn) {
  var failSilently = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (activeSub instanceof ReactiveEffect) {
    activeSub.cleanup = fn;
  } else if (!failSilently) {
    warn$2("onEffectCleanup() was called when there was no active effect to associate with.");
  }
}
function cleanupEffect(e) {
  var {
    cleanup
  } = e;
  e.cleanup = void 0;
  if (cleanup !== void 0) {
    var prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
var activeSub = void 0;
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
var targetMap = /* @__PURE__ */new WeakMap();
var ITERATE_KEY = Symbol("Object iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map keys iterate");
var ARRAY_ITERATE_KEY = Symbol("Array iterate");
function track(target, type, key) {
  if (activeSub !== void 0) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */new Map());
    }
    var dep = depsMap.get(key);
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
  var depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  var run = dep => {
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
    var targetIsArray = isArray$1(target);
    var isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      var newLength = Number(newValue);
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
  var depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  var raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return reactiveReadArray(this).concat(...args.map(x => isArray$1(x) ? reactiveReadArray(x) : x));
  },
  entries() {
    return iterator(this, "entries", value => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, v => v.map(toReactive), arguments);
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
  includes() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return searchProxy(this, "includes", args);
  },
  indexOf() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return noTracking(this, "push", args);
  },
  reduce(fn) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn) {
    for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice() {
    for (var _len9 = arguments.length, args = new Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
      args[_key10] = arguments[_key10];
    }
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced() {
    return reactiveReadArray(this).toSpliced(...arguments);
  },
  unshift() {
    for (var _len10 = arguments.length, args = new Array(_len10), _key11 = 0; _key11 < _len10; _key11++) {
      args[_key11] = arguments[_key11];
    }
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self, method, wrapValue) {
  var arr = shallowReadArray(self);
  var iter = arr[method]();
  if (arr !== self && !isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      var result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
var arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  var arr = shallowReadArray(self);
  var needsWrap = arr !== self && !isShallow(self);
  var methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    var result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  var wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function (item, index) {
        return fn.call(this, toReactive(item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function (item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  var result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
  var arr = shallowReadArray(self);
  var wrappedFn = fn;
  if (arr !== self) {
    if (!isShallow(self)) {
      wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self, method, args) {
  var arr = toRaw(self);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  var res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  pauseTracking();
  startBatch();
  var res = toRaw(self)[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}
var isNonTrackableKeys = /* @__PURE__ */makeMap("__proto__,__v_isRef,__isVue");
var builtInSymbols = new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(key => key !== "arguments" && key !== "caller").map(key => Symbol[key]).filter(isSymbol));
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  var obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor() {
    var _isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _isShallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    var isReadonly2 = this._isReadonly,
      isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) ||
      // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    var targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      var fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    var res = Reflect.get(target, key,
    // if this is a proxy wrapping a ref, return methods using the raw ref
    // as receiver so that we don't have to call `toRaw` on the ref in all
    // its class methods
    isRef(target) ? target : receiver);
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
  constructor() {
    var isShallow2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    var oldValue = target[key];
    if (!this._isShallow) {
      var isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    var hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    var result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
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
    var hadKey = hasOwn(target, key);
    var oldValue = target[key];
    var result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    var result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor() {
    var isShallow2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2("Set operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2("Delete operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
    }
    return true;
  }
}
var mutableHandlers = /* @__PURE__ */new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */new MutableReactiveHandler(true);
var shallowReadonlyHandlers = /* @__PURE__ */new ReadonlyReactiveHandler(true);
var toShallow = value => value;
var getProto = v => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function () {
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
  return function () {
    {
      var key = (arguments.length <= 0 ? undefined : arguments[0]) ? "on key \"".concat(arguments.length <= 0 ? undefined : arguments[0], "\" ") : "";
      warn$2("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly, shallow) {
  var instrumentations = {
    get(key) {
      var target = this["__v_raw"];
      var rawTarget = toRaw(target);
      var rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      var {
        has
      } = getProto(rawTarget);
      var wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      var target = this["__v_raw"];
      !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      var target = this["__v_raw"];
      var rawTarget = toRaw(target);
      var rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      var observed = this;
      var target = observed["__v_raw"];
      var rawTarget = toRaw(target);
      var wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
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
      if (!shallow && !isShallow(value) && !isReadonly(value)) {
        value = toRaw(value);
      }
      var target = toRaw(this);
      var proto = getProto(target);
      var hadKey = proto.has.call(target, value);
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
      var target = toRaw(this);
      var {
        has,
        get
      } = getProto(target);
      var hadKey = has.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
      } else {
        checkIdentityKeys(target, has, key);
      }
      var oldValue = get.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
      return this;
    },
    delete(key) {
      var target = toRaw(this);
      var {
        has,
        get
      } = getProto(target);
      var hadKey = has.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
      } else {
        checkIdentityKeys(target, has, key);
      }
      var oldValue = get ? get.call(target, key) : void 0;
      var result = target.delete(key);
      if (hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    },
    clear() {
      var target = toRaw(this);
      var hadItems = target.size !== 0;
      var oldTarget = isMap(target) ? new Map(target) : new Set(target);
      var result = target.clear();
      if (hadItems) {
        trigger(target, "clear", void 0, void 0, oldTarget);
      }
      return result;
    }
  });
  var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach(method => {
    instrumentations[method] = createIterableMethod(method, readonly, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  var instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
  var rawKey = toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    var type = toRawType(target);
    warn$2("Reactive ".concat(type, " contains both the raw and reactive versions of the same object").concat(type === "Map" ? " as keys" : "", ", which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible."));
  }
}
var reactiveMap = /* @__PURE__ */new WeakMap();
var shallowReactiveMap = /* @__PURE__ */new WeakMap();
var readonlyMap = /* @__PURE__ */new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */new WeakMap();
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
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      warn$2("value cannot be made ".concat(isReadonly2 ? "readonly" : "reactive", ": ").concat(String(target)));
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  var targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  var existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  var proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
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
  var raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
var toReactive = value => isObject(value) ? reactive(value) : value;
var toReadonly = value => isObject(value) ? readonly(value) : value;
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
    var oldValue = this._rawValue;
    var useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
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
  var dep = ref2.dep;
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
  return isFunction(source) ? source() : unref(source);
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    var oldValue = target[key];
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
    var {
      get,
      set
    } = factory(() => trackRef(this), () => triggerRef(this));
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
  var ret = isArray$1(object) ? new Array(object.length) : {};
  for (var key in object) {
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
    var val = this._object[this._key];
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
  var val = source[key];
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
    var flags = this.flags;
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
    var flags = this.flags;
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
      warn$2("Write operation failed: computed value is readonly");
    }
  }
  update() {
    var prevSub = activeSub;
    setActiveSub(this);
    startTracking(this);
    try {
      var oldValue = this._value;
      var newValue = this.fn(oldValue);
      if (hasChanged(oldValue, newValue)) {
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
function computed$1(getterOrOptions, debugOptions) {
  var isSSR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var getter;
  var setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  var cRef = new ComputedRefImpl(getter, setter);
  if (debugOptions && !isSSR) {
    cRef.onTrack = debugOptions.onTrack;
    cRef.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
var TrackOpTypes = {
  "GET": "get",
  "HAS": "has",
  "ITERATE": "iterate"
};
var TriggerOpTypes = {
  "SET": "set",
  "ADD": "add",
  "DELETE": "delete",
  "CLEAR": "clear"
};
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */new WeakMap();
var activeWatcher = void 0;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(cleanupFn) {
  var failSilently = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var owner = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : activeWatcher;
  if (owner) {
    var cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!failSilently) {
    warn$2("onWatcherCleanup() was called when there was no active watcher to associate with.");
  }
}
function watch$1(source, cb) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ;
  var {
    immediate,
    deep,
    once,
    scheduler,
    augmentJob,
    call
  } = options;
  var warnInvalidSource = s => {
    (options.onWarn || warn$2)("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  };
  var reactiveGetter = source2 => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
    return traverse(source2);
  };
  var effect;
  var getter;
  var cleanup;
  var boundCleanup;
  var forceTrigger = false;
  var isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(s => isReactive(s) || isShallow(s));
    getter = () => source.map(s => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
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
        var currentEffect = activeWatcher;
        activeWatcher = effect;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    var baseGetter = getter;
    var depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  var scope = getCurrentScope();
  var watchHandle = () => {
    effect.stop();
    if (scope && scope.active) {
      remove$1(scope.effects, effect);
    }
  };
  if (once && cb) {
    var _cb = cb;
    cb = function () {
      _cb(...arguments);
      watchHandle();
    };
  }
  var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  var job = immediateFirstRun => {
    if (!effect.active || !immediateFirstRun && !effect.dirty) {
      return;
    }
    if (cb) {
      var newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        var currentWatcher = activeWatcher;
        activeWatcher = effect;
        try {
          var args = [newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, boundCleanup];
          call ? call(cb, 3, args) :
          // @ts-expect-error
          cb(...args);
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
  boundCleanup = fn => onWatcherCleanup(fn, false, effect);
  cleanup = effect.onStop = () => {
    var cleanups = cleanupMap.get(effect);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (var cleanup2 of cleanups) {
          cleanup2();
        }
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
function traverse(value) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var seen = arguments.length > 2 ? arguments[2] : undefined;
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (var i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach(v => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (var key in value) {
      traverse(value[key], depth, seen);
    }
    for (var _key12 of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, _key12)) {
        traverse(value[_key12], depth, seen);
      }
    }
  }
  return value;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(function (value) {
    // @ts-ignore
    return constructor.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    // @ts-ignore
    return constructor.resolve(callback()).then(function () {
      // @ts-ignore
      return constructor.reject(reason);
    });
  });
}
function allSettled(arr) {
  var P = this;
  return new P(function (resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(new TypeError(typeof arr + ' ' + arr + ' is not iterable(cannot read property Symbol(Symbol.iterator))'));
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(val, function (val) {
            res(i, val);
          }, function (e) {
            args[i] = {
              status: 'rejected',
              reason: e
            };
            if (--remaining === 0) {
              resolve(args);
            }
          });
          return;
        }
      }
      args[i] = {
        status: 'fulfilled',
        value: val
      };
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

/**
 * @constructor
 */
function AggregateError(errors, message) {
  this.name = 'AggregateError', this.errors = errors;
  this.message = message || '';
}
AggregateError.prototype = Error.prototype;
function any(arr) {
  var P = this;
  return new P(function (resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(new TypeError('Promise.any accepts an array'));
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return reject();
    var rejectionReasons = [];
    for (var i = 0; i < args.length; i++) {
      try {
        P.resolve(args[i]).then(resolve).catch(function (error) {
          rejectionReasons.push(error);
          if (rejectionReasons.length === args.length) {
            reject(new AggregateError(rejectionReasons, 'All promises were rejected'));
          }
        });
      } catch (ex) {
        reject(ex);
      }
    }
  });
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;
function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}
function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise$1(fn) {
  if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];
  doResolve(fn, this);
}
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise$1._immediateFn(function () {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve$1 : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve$1(deferred.promise, ret);
  });
}
function resolve$1(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (newValue instanceof Promise$1) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}
function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}
function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise$1._immediateFn(function () {
      if (!self._handled) {
        Promise$1._unhandledRejectionFn(self._value);
      }
    });
  }
  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return;
      done = true;
      resolve$1(self, value);
    }, function (reason) {
      if (done) return;
      done = true;
      reject(self, reason);
    });
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}
Promise$1.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise$1.prototype.then = function (onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);
  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};
Promise$1.prototype['finally'] = finallyConstructor;
Promise$1.all = function (arr) {
  return new Promise$1(function (resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};
Promise$1.any = any;
Promise$1.allSettled = allSettled;
Promise$1.resolve = function (value) {
  if (value && typeof value === 'object' && value.constructor === Promise$1) {
    return value;
  }
  return new Promise$1(function (resolve) {
    resolve(value);
  });
};
Promise$1.reject = function (value) {
  return new Promise$1(function (resolve, reject) {
    reject(value);
  });
};
Promise$1.race = function (arr) {
  return new Promise$1(function (resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }
    for (var i = 0, len = arr.length; i < len; i++) {
      Promise$1.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise$1._immediateFn =
// @ts-ignore
typeof setImmediate === 'function' && function (fn) {
  // @ts-ignore
  setImmediate(fn);
} || function (fn) {
  setTimeoutFunc(fn, 0);
};
Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};
var lib = Promise$1;
var PromisePolyfill = /*@__PURE__*/getDefaultExportFromCjs(lib);
function createDecl(prop, value, important, raws, source) {
  var decl = {
    type: 'decl',
    prop,
    value: value.toString(),
    raws,
    source
  };
  if (important) {
    decl.important = true;
  }
  return decl;
}
var isNumber = val => typeof val === 'number';
var backgroundColor = 'backgroundColor';
var backgroundImage = 'backgroundImage';
var handleTransformBackground = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [createDecl(backgroundImage, 'none', important, raws, source), createDecl(backgroundColor, value, important, raws, source)];
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [createDecl(backgroundImage, value, important, raws, source), createDecl(backgroundColor, 'transparent', important, raws, source)];
  } else if (value == '') {
    return [createDecl(backgroundImage, 'none', important, raws, source), createDecl(backgroundColor, 'transparent', important, raws, source)];
  }
  return [decl];
};
var handleTransformBackgroundNvue = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [createDecl(backgroundColor, value, important, raws, source)];
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [createDecl(backgroundImage, value, important, raws, source)];
  } else if (value == '') {
    return [decl];
  }
  return [decl];
};
function createTransformBackground(options) {
  return decl => {
    // nvue 平台维持原有逻辑不变
    var isUvuePlatform = options.type === 'uvue';
    if (isUvuePlatform) {
      return handleTransformBackground(decl);
    } else {
      return handleTransformBackgroundNvue(decl);
    }
  };
}
function borderTop() {
  return 'borderTop';
}
function borderRight() {
  return 'borderRight';
}
function borderBottom() {
  return 'borderBottom';
}
function borderLeft() {
  return 'borderLeft';
}
var transformBorderColor = decl => {
  var {
    prop,
    value,
    important,
    raws,
    source
  } = decl;
  var _property_split = hyphenate(prop).split('-');
  var property = _property_split[_property_split.length - 1];
  {
    property = capitalize(property);
  }
  var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/); // 1pt
  switch (splitResult.length) {
    case 1:
      if (_property_split.length === 3) {
        // border-top-width
        return [decl];
      }
      // border-width
      splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
      break;
    case 2:
      splitResult.push(splitResult[0], splitResult[1]);
      break;
    case 3:
      splitResult.push(splitResult[1]);
      break;
  }
  return [createDecl(borderTop() + property, splitResult[0], important, raws, source), createDecl(borderRight() + property, splitResult[1], important, raws, source), createDecl(borderBottom() + property, splitResult[2], important, raws, source), createDecl(borderLeft() + property, splitResult[3], important, raws, source)];
};
var transformBorderColorNvue = decl => {
  var {
    prop,
    value,
    important,
    raws,
    source
  } = decl;
  var property = hyphenate(prop).split('-')[1];
  {
    property = capitalize(property);
  }
  var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/);
  switch (splitResult.length) {
    case 1:
      return [decl];
    case 2:
      splitResult.push(splitResult[0], splitResult[1]);
      break;
    case 3:
      splitResult.push(splitResult[1]);
      break;
  }
  return [createDecl(borderTop + property, splitResult[0], important, raws, source), createDecl(borderRight + property, splitResult[1], important, raws, source), createDecl(borderBottom + property, splitResult[2], important, raws, source), createDecl(borderLeft + property, splitResult[3], important, raws, source)];
};
var transformBorderStyle = transformBorderColor;
var transformBorderStyleNvue = transformBorderColorNvue;
var transformBorderWidth = transformBorderColor;
var transformBorderWidthNvue = transformBorderColorNvue;
function createTransformBorder(options) {
  return decl => {
    var borderWidth = () => {
      return 'Width';
    };
    var borderStyle = () => {
      return 'Style';
    };
    var borderColor = () => {
      return 'Color';
    };
    var {
      prop,
      value,
      important,
      raws,
      source
    } = decl;
    var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/);
    var havVar = splitResult.some(str => str.startsWith('var('));
    var result = [];
    // 包含 var ，直接视为 width/style/color 都使用默认值
    if (havVar) {
      result = splitResult;
      splitResult = [];
    } else {
      result = [/^[\d\.]+\S*|^(thin|medium|thick)$/, /^(solid|dashed|dotted|none)$/, /\S+/].map(item => {
        var index = splitResult.findIndex(str => item.test(str));
        return index < 0 ? null : splitResult.splice(index, 1)[0];
      });
    }
    if (splitResult.length > 0 && value != '') {
      return [decl];
    }
    var defaultWidth = str => {
      if (str != null) {
        return str.trim();
      }
      return 'medium';
    };
    var defaultStyle = str => {
      if (str != null) {
        return str.trim();
      }
      return 'none';
    };
    var defaultColor = str => {
      if (str != null) {
        return str.trim();
      }
      return '#000000';
    };
    return [...transformBorderWidth(createDecl(prop + borderWidth(), defaultWidth(result[0]), important, raws, source)), ...transformBorderStyle(createDecl(prop + borderStyle(), defaultStyle(result[1]), important, raws, source)), ...transformBorderColor(createDecl(prop + borderColor(), defaultColor(result[2]), important, raws, source))];
  };
}
function createTransformBorderNvue(options) {
  return decl => {
    var borderWidth = 'Width';
    var borderStyle = 'Style';
    var borderColor = 'Color';
    var {
      prop,
      value,
      important,
      raws,
      source
    } = decl;
    var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/);
    var result = [/^[\d\.]+\S*|^(thin|medium|thick)$/, /^(solid|dashed|dotted|none)$/, /\S+/].map(item => {
      var index = splitResult.findIndex(str => item.test(str));
      return index < 0 ? null : splitResult.splice(index, 1)[0];
    });
    if (splitResult.length) {
      return [decl];
    }
    return [createDecl(prop + borderWidth, (result[0] || '0').trim(), important, raws, source), createDecl(prop + borderStyle, (result[1] || 'solid').trim(), important, raws, source), createDecl(prop + borderColor, (result[2] || '#000000').trim(), important, raws, source)];
  };
}
var borderTopLeftRadius = 'borderTopLeftRadius';
var borderTopRightRadius = 'borderTopRightRadius';
var borderBottomRightRadius = 'borderBottomRightRadius';
var borderBottomLeftRadius = 'borderBottomLeftRadius';
var transformBorderRadius = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  var splitResult = value.split(/\s+/);
  if (value.includes('/')) {
    return [decl];
  }
  switch (splitResult.length) {
    case 1:
      splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
      break;
    case 2:
      splitResult.push(splitResult[0], splitResult[1]);
      break;
    case 3:
      splitResult.push(splitResult[1]);
      break;
  }
  return [createDecl(borderTopLeftRadius, splitResult[0], important, raws, source), createDecl(borderTopRightRadius, splitResult[1], important, raws, source), createDecl(borderBottomRightRadius, splitResult[2], important, raws, source), createDecl(borderBottomLeftRadius, splitResult[3], important, raws, source)];
};
var transformBorderRadiusNvue = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  var splitResult = value.split(/\s+/);
  if (value.includes('/')) {
    return [decl];
  }
  // const isUvuePlatform = options.type == 'uvue'
  switch (splitResult.length) {
    case 1:
      return [decl];
    case 2:
      splitResult.push(splitResult[0], splitResult[1]);
      break;
    case 3:
      splitResult.push(splitResult[1]);
      break;
  }
  return [createDecl(borderTopLeftRadius, splitResult[0], important, raws, source), createDecl(borderTopRightRadius, splitResult[1], important, raws, source), createDecl(borderBottomRightRadius, splitResult[2], important, raws, source), createDecl(borderBottomLeftRadius, splitResult[3], important, raws, source)];
};
var flexDirection = 'flexDirection';
var flexWrap = 'flexWrap';
var transformFlexFlow = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  var splitResult = value.split(/\s+/);
  var result = [/^(column|column-reverse|row|row-reverse)$/, /^(nowrap|wrap|wrap-reverse)$/].map(item => {
    var index = splitResult.findIndex(str => item.test(str));
    return index < 0 ? null : splitResult.splice(index, 1)[0];
  });
  if (splitResult.length) {
    return [decl];
  }
  return [createDecl(flexDirection, result[0] || 'column', important, raws, source), createDecl(flexWrap, result[1] || 'nowrap', important, raws, source)];
};
var top = 'Top';
var right = 'Right';
var bottom = 'Bottom';
var left = 'Left';
var createTransformBox = type => {
  return decl => {
    var {
      value,
      important,
      raws,
      source
    } = decl;
    var splitResult = value.split(/\s+/);
    switch (splitResult.length) {
      case 1:
        splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
        break;
      case 2:
        splitResult.push(splitResult[0], splitResult[1]);
        break;
      case 3:
        splitResult.push(splitResult[1]);
        break;
    }
    return [createDecl(type + top, splitResult[0], important, raws, source), createDecl(type + right, splitResult[1], important, raws, source), createDecl(type + bottom, splitResult[2], important, raws, source), createDecl(type + left, splitResult[3], important, raws, source)];
  };
};
var transformMargin = createTransformBox('margin');
var transformPadding = createTransformBox('padding');
var transitionProperty = 'transitionProperty';
var transitionDuration = 'transitionDuration';
var transitionTimingFunction = 'transitionTimingFunction';
var transitionDelay = 'transitionDelay';
var transformTransition = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  var result = [];
  var match;
  // 针对 cubic-bezier 特殊处理
  // eg: cubic-bezier(0.42, 0, 1.0, 3) // (0.2,-2,0.8,2)
  if (decl.value.includes('cubic-bezier')) {
    var CHUNK_REGEXP = /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*((\S*)|cubic-bezier\(.*\))?\s*(\d*\.?\d+(?:ms|s)?)?$/;
    match = value.match(CHUNK_REGEXP);
  } else {
    var _CHUNK_REGEXP = /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/;
    match = value.match(_CHUNK_REGEXP);
  }
  if (!match) {
    return result;
  }
  match[1] && result.push(createDecl(transitionProperty, match[1], important, raws, source));
  match[2] && result.push(createDecl(transitionDuration, match[2], important, raws, source));
  match[3] && result.push(createDecl(transitionTimingFunction, match[3], important, raws, source));
  match[4] && result.push(createDecl(transitionDelay, match[4], important, raws, source));
  return result;
};
var flexGrow = 'flexGrow';
var flexShrink = 'flexShrink';
var flexBasis = 'flexBasis';
var transformFlex = decl => {
  var {
    value,
    important,
    raws,
    source
  } = decl;
  var result = [];
  var splitResult = value.trim().split(/\s+/);
  // 是否 flex-grow 的有效值
  var isFlexGrowValid = v => isNumber(Number(v)) && !Number.isNaN(Number(v));
  var isFlexShrinkValid = v => isNumber(Number(v)) && !Number.isNaN(Number(v)) && Number(v) >= 0;
  // const isFlexBasisValid = (v: string) => v === 'auto'
  if (splitResult.length === 1) {
    // 关键字处理
    if (value === 'none') {
      result.push(createDecl(flexGrow, '0', important, raws, source), createDecl(flexShrink, '0', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
      return result;
    }
    if (value === 'auto') {
      result.push(createDecl(flexGrow, '1', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
      return result;
    }
    if (value === 'initial') {
      result.push(createDecl(flexGrow, '0', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
      return result;
    }
    var v = splitResult[0];
    // number 视为 flex-grow
    if (isFlexGrowValid(v)) {
      result.push(createDecl(flexGrow, v, important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, '0%', important, raws, source));
      return result;
    } else {
      result.push(createDecl(flexGrow, '1', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, v, important, raws, source));
      return result;
    }
  } else if (splitResult.length === 2) {
    var [v1, v2] = splitResult;
    if (isFlexGrowValid(v1)) {
      if (isFlexShrinkValid(v2)) {
        // flex: 1 2 => 1 2 0%
        result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, v2, important, raws, source), createDecl(flexBasis, '0%', important, raws, source));
        return result;
      } else {
        // flex: 1 100px => 1 1 100px
        result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, v2, important, raws, source));
        return result;
      }
    } else {
      return [decl];
    }
  } else if (splitResult.length === 3) {
    var [_v, _v2, v3] = splitResult;
    if (isFlexGrowValid(_v) && isFlexShrinkValid(_v2)) {
      result.push(createDecl(flexGrow, _v, important, raws, source), createDecl(flexShrink, _v2, important, raws, source), createDecl(flexBasis, v3, important, raws, source));
      return result;
    } else {
      // fallback
      return [decl];
    }
  }
  // 其它情况，原样返回
  return [decl];
};
function getDeclTransforms(options) {
  var transformBorder = options.type == 'uvue' ? createTransformBorder() : createTransformBorderNvue();
  var styleMap = {
    transition: transformTransition,
    border: transformBorder,
    background: createTransformBackground(options),
    borderTop: transformBorder,
    borderRight: transformBorder,
    borderBottom: transformBorder,
    borderLeft: transformBorder,
    borderStyle: options.type == 'uvue' ? transformBorderStyle : transformBorderStyleNvue,
    borderWidth: options.type == 'uvue' ? transformBorderWidth : transformBorderWidthNvue,
    borderColor: options.type == 'uvue' ? transformBorderColor : transformBorderColorNvue,
    borderRadius: options.type == 'uvue' ? transformBorderRadius : transformBorderRadiusNvue,
    // uvue已经支持这些简写属性，不需要展开
    // margin,padding继续展开，确保样式的优先级
    margin: transformMargin,
    padding: transformPadding,
    flexFlow: transformFlexFlow
  };
  if (options.type === 'uvue') {
    styleMap.flex = transformFlex;
  }
  var result = {};
  {
    result = styleMap;
  }
  return result;
}
var DeclTransforms;
var expanded = Symbol('expanded');
function expand(options) {
  var plugin = {
    postcssPlugin: "".concat(options.type || 'nvue', ":expand"),
    Declaration(decl) {
      if (decl[expanded]) {
        return;
      }
      if (!DeclTransforms) {
        DeclTransforms = getDeclTransforms(options);
      }
      var transform = DeclTransforms[decl.prop];
      if (transform) {
        var res = transform(decl);
        var _isSame = res.length === 1 && res[0] === decl;
        if (!_isSame) {
          decl.replaceWith(res);
        }
      }
      decl[expanded] = true;
    }
  };
  return plugin;
}

/**
* @dcloudio/uni-app-nvue v3.5.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var stack = [];
function pushWarningContext(ctx) {
  stack.push(ctx);
}
function popWarningContext() {
  stack.pop();
}
var isWarning = false;
function warn$1(msg) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  var entry = stack.length ? stack[stack.length - 1] : null;
  var instance = isVNode(entry) ? entry.component : entry;
  var appWarnHandler = instance && instance.appContext.config.warnHandler;
  var trace = getComponentTrace();
  for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key13 = 1; _key13 < _len11; _key13++) {
    args[_key13 - 1] = arguments[_key13];
  }
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
    // eslint-disable-next-line no-restricted-syntax
    msg + args.map(a => {
      var _a, _b;
      return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
    }).join(""), instance && instance.proxy || instance, trace.map(_ref => {
      var {
        ctx
      } = _ref;
      return "at <".concat(formatComponentName(instance, ctx.type), ">");
    }).join("\n"), trace]);
  } else {
    var warnArgs = ["[Vue warn]: ".concat(msg), ...args];
    if (trace.length &&
    // avoid spamming console during tests
    true) {
      warnArgs.push("\n", ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  var currentCtx = stack[stack.length - 1];
  if (!currentCtx) {
    return [];
  }
  var normalizedStack = [];
  while (currentCtx) {
    var last = normalizedStack[0];
    if (last && last.ctx === currentCtx) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        ctx: currentCtx,
        recurseCount: 0
      });
    }
    if (isVNode(currentCtx)) {
      var parent = currentCtx.component && currentCtx.component.parent;
      currentCtx = parent && parent.vnode || parent;
    } else {
      currentCtx = currentCtx.parent;
    }
  }
  return normalizedStack;
}
function formatTrace(trace) {
  var logs = [];
  trace.forEach((entry, i) => {
    logs.push(...(i === 0 ? [] : ["\n"]), ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry(_ref2) {
  var {
    ctx,
    recurseCount
  } = _ref2;
  var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
  var instance = isVNode(ctx) ? ctx.component : ctx;
  var isRoot = instance ? instance.parent == null : false;
  var open = " at <".concat(formatComponentName(instance, ctx.type, isRoot));
  var close = ">" + postfix;
  return ctx.props ? [open, ...formatProps(ctx.props), close] : [open + close];
}
function formatProps(props) {
  var res = [];
  var keys = Object.keys(props);
  keys.slice(0, 3).forEach(key => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(" ...");
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : ["".concat(key, "=Ref<"), value, ">"];
  } else if (isFunction(value)) {
    return ["".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
  } else {
    value = toRaw(value);
    return raw ? value : ["".concat(key, "="), value];
  }
}
function assertNumber(val, type) {
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn$1("".concat(type, " is not a valid number - got ").concat(JSON.stringify(val), "."));
  } else if (isNaN(val)) {
    warn$1("".concat(type, " is NaN - the duration expression might be incorrect."));
  }
}
var ErrorCodes = {
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
var ErrorTypeStrings$1 = {
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
    var res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    var values = [];
    for (var i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else {
    warn$1("Invalid value type passed to callWithAsyncErrorHandling(): ".concat(typeof fn));
  }
}
function handleError(err, instance, type) {
  var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var {
    errorHandler,
    throwUnhandledErrorInProduction
  } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    var cur = instance.parent;
    var exposedInstance = instance.proxy || instance;
    var errorInfo = ErrorTypeStrings$1[type] || type;
    while (cur) {
      var errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (var i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [err, exposedInstance, errorInfo]);
      resetTracking();
      return;
    }
  }
  logError(err, type, instance, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, instance) {
  var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var throwInProd = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  {
    var info = ErrorTypeStrings$1[type] || type;
    if (instance) {
      pushWarningContext(instance);
    }
    warn$1("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
    if (instance) {
      popWarningContext();
    }
    if (err instanceof Error) {
      console.error("---BEGIN:EXCEPTION---".concat(err.message, "\n").concat(err.stack || "", "---END:EXCEPTION---"));
    } else {
      console.error(err);
    }
  }
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */PromisePolyfill.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
  var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstance();
  var promise = currentFlushPromise || resolvedPromise;
  var current = currentFlushPromise === null || instance === null ? promise : promise.then(() => {
    return new Promise(resolve => {
      if (instance === null) {
        resolve();
      } else {
        instance.$waitNativeRender(() => {
          resolve();
        });
      }
    });
  });
  return fn ? current.then(this ? fn.bind(this) : fn) : current;
}
function findInsertionIndex(id) {
  var start = flushIndex + 1;
  var end = queue.length;
  while (start < end) {
    var middle = start + end >>> 1;
    var middleJob = queue[middle];
    var middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    var jobId = getId(job);
    var lastJob = queue[queue.length - 1];
    if (!lastJob ||
    // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs).catch(e => {
      currentFlushPromise = null;
      throw e;
    });
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : flushIndex + 1;
  {
    seen = seen || /* @__PURE__ */new Map();
  }
  for (; i < queue.length; i++) {
    var cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
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
    {
      seen = seen || /* @__PURE__ */new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      var cb = activePostFlushCbs[postFlushIndex];
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) {
        try {
          cb();
        } finally {
          cb.flags &= -2;
        }
      }
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var isFlushing = false;
function flushOnAppMount() {
  if (!isFlushing) {
    isFlushing = true;
    flushPreFlushCbs();
    flushPostFlushCbs();
    isFlushing = false;
  }
}
var getId = job => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  {
    seen = seen || /* @__PURE__ */new Map();
  }
  var check = job => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      var job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (!!("development" !== "production") && check(job)) {
          continue;
        }
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(job, job.i, job.i ? 15 : 14);
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      var _job = queue[flushIndex];
      if (_job) {
        _job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  var count = seen.get(fn) || 0;
  if (count > RECURSION_LIMIT) {
    var instance = fn.i;
    var componentName = instance && getComponentName(instance.type);
    handleError("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."), null, 10);
    return true;
  }
  seen.set(fn, count + 1);
  return false;
}
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */new Map();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = /* @__PURE__ */new Map();
function registerHMR(instance) {
  var id = instance.type.__hmrId;
  var record = map.get(id);
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
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  var record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach(instance => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    isHmrUpdating = true;
    if (instance.vapor) {
      instance.hmrRerender();
    } else {
      var i = instance;
      i.renderCache = [];
      i.update();
    }
    nextTick(() => {
      isHmrUpdating = false;
    });
  });
}
function reload(id, newComp) {
  var record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  var instances = [...record.instances];
  if (newComp.vapor) {
    for (var instance of instances) {
      instance.hmrReload(newComp);
    }
  } else {
    var _loop = function (_instance) {
      var oldComp = normalizeClassComponent(_instance.type);
      var dirtyInstances = hmrDirtyComponents.get(oldComp);
      if (!dirtyInstances) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */new Set());
      }
      dirtyInstances.add(_instance);
      _instance.appContext.propsCache.delete(_instance.type);
      _instance.appContext.emitsCache.delete(_instance.type);
      _instance.appContext.optionsCache.delete(_instance.type);
      if (_instance.ceReload) {
        dirtyInstances.add(_instance);
        _instance.ceReload(newComp.styles);
        dirtyInstances.delete(_instance);
      } else if (_instance.parent) {
        queueJob(() => {
          isHmrUpdating = true;
          var parent = _instance.parent;
          if (parent.vapor) {
            parent.hmrRerender();
          } else {
            parent.update();
          }
          nextTick(() => {
            isHmrUpdating = false;
          });
          dirtyInstances.delete(_instance);
        });
      } else if (_instance.appContext.reload) {
        _instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
      }
      if (_instance.root.ce && _instance !== _instance.root) {
        _instance.root.ce._removeChildStyle(oldComp);
      }
    };
    for (var _instance of instances) {
      _loop(_instance);
    }
  }
  queuePostFlushCb(() => {
    hmrDirtyComponents.clear();
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (var key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
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
var devtools$1;
var buffer = [];
var devtoolsNotInstalled = false;
function emit$2(event) {
  for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key14 = 1; _key14 < _len12; _key14++) {
    args[_key14 - 1] = arguments[_key14];
  }
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({
      event,
      args
    });
  }
}
var queued = false;
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
  if (devtoolsNotInstalled || queued) {
    return;
  }
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(_ref3 => {
      var {
        event,
        args
      } = _ref3;
      return devtools$1.emit(event, ...args);
    });
    buffer = [];
  } else if (
  // handle late devtools injection - only do this if we are in an actual
  // browser environment to avoid the timer handle stalling test runner exit
  // (#4815)
  typeof window !== "undefined" &&
  // some envs mock window but not fully
  window.HTMLElement &&
  // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))) {
    queued = true;
    var replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push(newHook => {
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
  emit$2("app:init" /* APP_INIT */, app, version, {
    Fragment,
    Text,
    Comment: Comment$1,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$2("app:unmount" /* APP_UNMOUNT */, app);
}
var devtoolsComponentAdded = /* @__PURE__ */createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */);
var devtoolsComponentUpdated = /* @__PURE__ */createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
var _devtoolsComponentRemoved = /* @__PURE__ */createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */);
var devtoolsComponentRemoved = component => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" &&
  // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return component => {
    emit$2(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
var devtoolsPerfStart = /* @__PURE__ */createDevtoolsPerformanceHook("perf:start" /* PERFORMANCE_START */);
var devtoolsPerfEnd = /* @__PURE__ */createDevtoolsPerformanceHook("perf:end" /* PERFORMANCE_END */);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$2(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$2("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  var prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
var withScopeId = _id => withCtx;
function withCtx(fn) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentRenderingInstance;
  var isNonScopedSlot = arguments.length > 2 ? arguments[2] : undefined;
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  var renderFnWithContext = function () {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    var prevInstance = setCurrentRenderingInstance(ctx);
    var res;
    try {
      res = fn(...arguments);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    warn$1("withDirectives can only be used inside render functions.");
    return vnode;
  }
  var instance = getComponentPublicInstance(currentRenderingInstance);
  var bindings = vnode.dirs || (vnode.dirs = []);
  for (var i = 0; i < directives.length; i++) {
    var [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
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
  for (var i = 0; i < bindings.length; i++) {
    var binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    var hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]);
      resetTracking();
    }
  }
}
var TeleportEndKey = Symbol("_vte");
var isTeleport = type => type.__isTeleport;
var isTeleportDisabled = props => props && (props.disabled || props.disabled === "");
var isTeleportDeferred = props => props && (props.defer || props.defer === "");
var isTargetSVG = target => typeof SVGElement !== "undefined" && target instanceof SVGElement;
var isTargetMathML = target => typeof MathMLElement === "function" && target instanceof MathMLElement;
var resolveTarget = (props, select, parentComponent) => {
  var targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      warn$1("Current renderer does not support string target for Teleports. (missing querySelector renderer option)");
      return null;
    } else {
      var target = select(targetSelector, parentComponent);
      if (!target && !isTeleportDisabled(props)) {
        warn$1("Failed to locate Teleport target with selector \"".concat(targetSelector, "\". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree."));
      }
      return target;
    }
  } else {
    if (!targetSelector && !isTeleportDisabled(props)) {
      warn$1("Invalid Teleport target: ".concat(targetSelector));
    }
    return targetSelector;
  }
};
var TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    var {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: {
        insert,
        querySelector,
        createText,
        createComment
      }
    } = internals;
    var disabled = isTeleportDisabled(n2.props);
    var {
      shapeFlag,
      children,
      dynamicChildren
    } = n2;
    if (isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      var placeholder = n2.el = createComment("teleport start", container);
      var mainAnchor = n2.anchor = createComment("teleport end", container);
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      var mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          if (parentComponent && parentComponent.isCE) {
            parentComponent.ce._teleportTarget = container2;
          }
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      };
      var mountToTarget = () => {
        var target = n2.target = resolveTarget(n2.props, querySelector, parentComponent);
        var targetAnchor = prepareAnchor(target, n2, createText, insert, container);
        if (target) {
          if (namespace !== "svg" && isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace !== "mathml" && isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (!disabled) {
            mount(target, targetAnchor);
            updateCssVars(n2, false);
          }
        } else if (!disabled) {
          warn$1("Invalid Teleport target on mount:", target, "(".concat(typeof target, ")"));
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
        updateCssVars(n2, true);
      }
      if (isTeleportDeferred(n2.props)) {
        queuePostRenderEffect(() => {
          mountToTarget();
          n2.el.__isMounted = true;
        }, parentSuspense);
      } else {
        mountToTarget();
      }
    } else {
      if (isTeleportDeferred(n2.props) && !n1.el.__isMounted) {
        queuePostRenderEffect(() => {
          TeleportImpl.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
          delete n1.el.__isMounted;
        }, parentSuspense);
        return;
      }
      n2.el = n1.el;
      n2.targetStart = n1.targetStart;
      var _mainAnchor = n2.anchor = n1.anchor;
      var target = n2.target = n1.target;
      var targetAnchor = n2.targetAnchor = n1.targetAnchor;
      var wasDisabled = isTeleportDisabled(n1.props);
      var currentContainer = wasDisabled ? container : target;
      var currentAnchor = wasDisabled ? _mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
        traverseStaticChildren(n1, n2, !!!("development" !== "production"));
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, _mainAnchor, internals, parentComponent, 1);
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          var nextTarget = n2.target = resolveTarget(n2.props, querySelector, parentComponent);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, parentComponent, 0);
          } else {
            warn$1("Invalid Teleport target on update:", target, "(".concat(typeof target, ")"));
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target, targetAnchor, internals, parentComponent, 1);
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, _ref4, doRemove) {
    var {
      um: unmount,
      o: {
        remove: hostRemove
      }
    } = _ref4;
    var {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      var shouldRemove = doRemove || !isTeleportDisabled(props);
      for (var i = 0; i < children.length; i++) {
        var _child = children[i];
        unmount(_child, parentComponent, parentSuspense, shouldRemove, !!_child.dynamicChildren);
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, _ref5, parentComponent) {
  var {
    o: {
      insert
    },
    m: move
  } = _ref5;
  var moveType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  var {
    el,
    anchor,
    shapeFlag,
    children,
    props
  } = vnode;
  var isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (var i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2, parentComponent);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, _ref6, hydrateChildren, container) {
  var {
    o: {
      nextSibling,
      parentNode,
      querySelector,
      insert,
      createText
    }
  } = _ref6;
  var target = vnode.target = resolveTarget(vnode.props, querySelector, parentComponent);
  if (target) {
    var disabled = isTeleportDisabled(vnode.props);
    var targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetStart = targetNode;
        vnode.targetAnchor = targetNode && nextSibling(targetNode);
      } else {
        vnode.anchor = nextSibling(node);
        var targetAnchor = targetNode;
        while (targetAnchor) {
          if (targetAnchor && targetAnchor.nodeType === 8) {
            if (targetAnchor.data === "teleport start anchor") {
              vnode.targetStart = targetAnchor;
            } else if (targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          targetAnchor = nextSibling(targetAnchor);
        }
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert, container);
        }
        hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
    updateCssVars(vnode, disabled);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
var Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  var ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    var node, anchor;
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
function prepareAnchor(target, vnode, createText, insert, container) {
  var targetStart = vnode.targetStart = createText("", container);
  var targetAnchor = vnode.targetAnchor = createText("", container);
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target);
    insert(targetAnchor, target);
  }
  return targetAnchor;
}
var leaveCbKey = Symbol("_leaveCb");
var enterCbKey = Symbol("_enterCb");
function useTransitionState() {
  var state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */new Map()
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
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
var recursiveGetSubtree = instance => {
  var subTree = instance.subTree;
  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
var BaseTransitionImpl = {
  name: "BaseTransition",
  props: BaseTransitionPropsValidators,
  setup(props, _ref7) {
    var {
      slots
    } = _ref7;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    return () => {
      var children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      var child = findNonCommentChild(children);
      var rawProps = toRaw(props);
      var {
        mode
      } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$1("invalid <transition> mode: ".concat(mode));
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      var innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      var enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance,
      // #11061, ensure enterHooks is fresh after clone
      hooks => enterHooks = hooks);
      if (innerChild.type !== Comment$1) {
        setTransitionHooks(innerChild, enterHooks);
      }
      var oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment$1 && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment$1) {
        var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment$1) {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (!(instance.job.flags & 8)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment$1) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            var leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
function findNonCommentChild(children) {
  var child = children[0];
  if (children.length > 1) {
    var hasFound = false;
    for (var c of children) {
      if (c.type !== Comment$1) {
        if (hasFound) {
          warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
          break;
        }
        child = c;
        hasFound = true;
      }
    }
  }
  return child;
}
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  var {
    leavingVNodes
  } = state;
  var leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
  var {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  var key = String(vnode.key);
  var leavingVNodesCache = getLeavingNodesForType(state, vnode);
  var callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  var callAsyncHook = (hook, args) => {
    var done = args[1];
    callHook(hook, args);
    if (isArray$1(hook)) {
      if (hook.every(hook2 => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  var hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      var hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](true
        /* cancelled */);
      }
      var leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      var hook = onEnter;
      var afterHook = onAfterEnter;
      var cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      var called = false;
      var done = el[enterCbKey] = cancelled => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove) {
      var key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](true
        /* cancelled */);
      }
      if (state.isUnmounting) {
        return remove();
      }
      callHook(onBeforeLeave, [el]);
      var called = false;
      var done = el[leaveCbKey] = cancelled => {
        if (called) return;
        called = true;
        remove();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      var hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
      if (postClone) postClone(hooks2);
      return hooks2;
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
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  var {
    shapeFlag,
    children
  } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children) {
  var keepComment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var parentKey = arguments.length > 2 ? arguments[2] : undefined;
  var ret = [];
  var keyedFragmentCount = 0;
  for (var i = 0; i < children.length; i++) {
    var _child2 = children[i];
    var key = parentKey == null ? _child2.key : String(parentKey) + String(_child2.key != null ? _child2.key : i);
    if (_child2.type === Fragment) {
      if (_child2.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(_child2.children, keepComment, key));
    } else if (keepComment || _child2.type !== Comment$1) {
      ret.push(key != null ? cloneVNode(_child2, {
        key
      }) : _child2);
    }
  }
  if (keyedFragmentCount > 1) {
    for (var _i = 0; _i < ret.length; _i++) {
      ret[_i].patchFlag = -2;
    }
  }
  return ret;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent$1(options, extraOptions) {
  return isFunction(options) ?
  // #8236: extend call and options.name access are considered side-effects
  // by Rollup, so we have to wrap it in a pure-annotated IIFE.
  /* @__PURE__ */
  (() => extend({
    name: options.name
  }, extraOptions, {
    setup: options
  }))() : options;
}
function useId() {
  var i = getCurrentGenericInstance();
  if (i) {
    return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
  } else {
    warn$1("useId() is called when there is no active component instance to be associated with.");
  }
  return "";
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
var knownTemplateRefs = /* @__PURE__ */new WeakSet();
function useTemplateRef(key) {
  var i = getCurrentGenericInstance();
  var r = shallowRef(null);
  if (i) {
    var refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
    var desc;
    if ((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable) {
      warn$1("useTemplateRef('".concat(key, "') already exists."));
    } else {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: val => r.value = val
      });
    }
  } else {
    warn$1("useTemplateRef() is called when there is no active component instance to be associated with.");
  }
  var ret = readonly(r);
  {
    knownTemplateRefs.add(ret);
  }
  return ret;
}
function setRef$1(rawRef, oldRawRef, parentSuspense, vnode) {
  var isUnmount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isArray$1(rawRef)) {
    rawRef.forEach((r, i) => setRef$1(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef$1(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  var refValue = vnode.shapeFlag & 4 && !vnode.component.type.rootElement ? getComponentPublicInstance(vnode.component) : vnode.el;
  var value = isUnmount ? null : refValue;
  var {
    i: owner,
    r: ref
  } = rawRef;
  if (!owner) {
    warn$1("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  var oldRef = oldRawRef && oldRawRef.r;
  var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  var setupState = owner.setupState;
  var rawSetupState = toRaw(setupState);
  var canSetSetupRef = setupState === EMPTY_OBJ ? () => false : key => {
    {
      if (hasOwn(rawSetupState, key) && !isRef(rawSetupState[key])) {
        warn$1("Template ref \"".concat(key, "\" used on a non-ref value. It will not work in the production build."));
      }
      if (knownTemplateRefs.has(rawSetupState[key])) {
        return false;
      }
    }
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    var _isString = isString(ref);
    var _isRef = isRef(ref);
    if (_isString || _isRef) {
      var doSet = () => {
        if (rawRef.f) {
          var existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            isArray$1(existing) && remove$1(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (canSetSetupRef(ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if (canSetSetupRef(ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          ref.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else {
          warn$1("Invalid template ref type:", ref, "(".concat(typeof ref, ")"));
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$1("Invalid template ref type:", ref, "(".concat(typeof ref, ")"));
    }
  }
}
var hasLoggedMismatchError = false;
var logMismatchError = () => {
  if (hasLoggedMismatchError) {
    return;
  }
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError = true;
};
var isSVGContainer = container => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
var isMathMLContainer = container => container.namespaceURI.includes("MathML");
var getContainerType = container => {
  if (container.nodeType !== 1) return void 0;
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
  return void 0;
};
var isComment = node => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  var {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;
  var hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      warn$1("Attempting to hydrate existing markup but container is empty. Performing full mount instead.");
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  var hydrateNode = function (node, vnode, parentComponent, parentSuspense, slotScopeIds) {
    var optimized = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    optimized = optimized || !!vnode.dynamicChildren;
    var isFragmentStart = isComment(node) && node.data === "[";
    var onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    var {
      type,
      ref,
      shapeFlag,
      patchFlag
    } = vnode;
    var domType = node.nodeType;
    vnode.el = node;
    {
      def(node, "__vnode", vnode, true);
      def(node, "__vueParentComponent", parentComponent, true);
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    var nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            warn$1("Hydration text mismatch in", node.parentNode, "\n  - rendered on server: ".concat(JSON.stringify(node.data), "\n  - expected on client: ").concat(JSON.stringify(vnode.children)));
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
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          var needToAdoptContent = !vnode.children.length;
          for (var i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent) vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          if (vnode.type.__vapor) {
            throw new Error("Vapor component hydration is not supported yet.");
          }
          vnode.slotScopeIds = slotScopeIds;
          var container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
            var subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else {
          warn$1("Invalid HostVNode type:", type, "(".concat(typeof type, ")"));
        }
    }
    if (ref != null) {
      setRef$1(ref, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  var hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    var {
      type,
      props,
      patchFlag,
      shapeFlag,
      dirs,
      transition
    } = vnode;
    var forcePatch = type === "input" || type === "option";
    {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      var needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(null,
        // no need check parentSuspense in hydration
        transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        var content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 &&
      // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        var _next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        var _hasWarned = false;
        while (_next) {
          if (!isMismatchAllowed(el, 1 /* CHILDREN */)) {
            if (!_hasWarned) {
              warn$1("Hydration children mismatch on", el, "\nServer rendered element contains more child nodes than client vdom.");
              _hasWarned = true;
            }
            logMismatchError();
          }
          var cur = _next;
          _next = _next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8) {
        var clientText = vnode.children;
        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
          clientText = clientText.slice(1);
        }
        if (el.textContent !== clientText) {
          if (!isMismatchAllowed(el, 0 /* TEXT */)) {
            warn$1("Hydration text content mismatch on", el, "\n  - rendered on server: ".concat(el.textContent, "\n  - expected on client: ").concat(vnode.children));
            logMismatchError();
          }
          el.textContent = vnode.children;
        }
      }
      if (props) {
        {
          var isCustomElement = el.tagName.includes("-");
          for (var key in props) {
            if (
            // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(dirs && dirs.some(d => d.dir.created)) && propHasMismatch(el, key, props[key], vnode, parentComponent)) {
              logMismatchError();
            }
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) ||
            // force hydrate v-bind with .prop modifiers
            key[0] === "." || isCustomElement) {
              patchProp(el, key, null, props[key], void 0, parentComponent);
            }
          }
        }
      }
      var vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  var hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    var children = parentVNode.children;
    var l = children.length;
    var hasWarned = false;
    for (var i = 0; i < l; i++) {
      var vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      var isText = vnode.type === Text;
      if (node) {
        if (isText && !optimized) {
          if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text) {
            insert(
            // @ts-expect-error  fixed by xxxxxx
            createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
            node.data = vnode.children;
          }
        }
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (isText && !vnode.children) {
        insert(vnode.el = createText(""), container);
      } else {
        if (!isMismatchAllowed(container, 1 /* CHILDREN */)) {
          if (!hasWarned) {
            warn$1("Hydration children mismatch on", container, "\nServer rendered element contains fewer child nodes than client vdom.");
            hasWarned = true;
          }
          logMismatchError();
        }
        patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
      }
    }
    return node;
  };
  var hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    var {
      slotScopeIds: fragmentSlotScopeIds
    } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    var container = parentNode(node);
    var next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      logMismatchError();
      insert(vnode.anchor = createComment("]"), container, next);
      return next;
    }
  };
  var handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    if (!isMismatchAllowed(node.parentElement, 1 /* CHILDREN */)) {
      warn$1("Hydration node mismatch:\n- rendered on server:", node, node.nodeType === 3 ? "(text)" : isComment(node) && node.data === "[" ? "(start of fragment)" : "", "\n- expected on client:", vnode.type);
      logMismatchError();
    }
    vnode.el = null;
    if (isFragment) {
      var end = locateClosingAnchor(node);
      while (true) {
        var next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove(next2);
        } else {
          break;
        }
      }
    }
    var next = nextSibling(node);
    var container = parentNode(node);
    remove(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
    if (parentComponent) {
      parentComponent.vnode.el = vnode.el;
      updateHOCHostEl(parentComponent, vnode.el);
    }
    return next;
  };
  var locateClosingAnchor = function (node) {
    var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "[";
    var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "]";
    var match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === open) match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  var replaceNode = (newNode, oldNode, parentComponent) => {
    var parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    var parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  var isTemplateNode = node => {
    return node.nodeType === 1 && node.tagName === "TEMPLATE";
  };
  return [hydrate, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
  var mismatchType;
  var mismatchKey;
  var actual;
  var expected;
  if (key === "class") {
    actual = el.getAttribute("class");
    expected = normalizeClass$1(clientValue);
    if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
      mismatchType = 2 /* CLASS */;
      mismatchKey = "class";
    }
  } else if (key === "style") {
    actual = el.getAttribute("style") || "";
    expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle$2(clientValue));
    var actualMap = toStyleMap(actual);
    var expectedMap = toStyleMap(expected);
    if (vnode.dirs) {
      for (var {
        dir,
        value
      } of vnode.dirs) {
        if (dir.name === "show" && !value) {
          expectedMap.set("display", "none");
        }
      }
    }
    if (instance) {
      resolveCssVars(instance, vnode, expectedMap);
    }
    if (!isMapEqual(actualMap, expectedMap)) {
      mismatchType = 3 /* STYLE */;
      mismatchKey = "style";
    }
  } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
    if (isBooleanAttr(key)) {
      actual = el.hasAttribute(key);
      expected = includeBooleanAttr(clientValue);
    } else if (clientValue == null) {
      actual = el.hasAttribute(key);
      expected = false;
    } else {
      if (el.hasAttribute(key)) {
        actual = el.getAttribute(key);
      } else if (key === "value" && el.tagName === "TEXTAREA") {
        actual = el.value;
      } else {
        actual = false;
      }
      expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
    }
    if (actual !== expected) {
      mismatchType = 4 /* ATTRIBUTE */;
      mismatchKey = key;
    }
  }
  if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
    var format = v => v === false ? "(not rendered)" : "".concat(mismatchKey, "=\"").concat(v, "\"");
    var preSegment = "Hydration ".concat(MismatchTypeString[mismatchType], " mismatch on");
    var postSegment = "\n  - rendered on server: ".concat(format(actual), "\n  - expected on client: ").concat(format(expected), "\n  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.\n  You should fix the source of the mismatch.");
    {
      warn$1(preSegment, el, postSegment);
    }
    return true;
  }
  return false;
}
function toClassSet(str) {
  return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (var s of a) {
    if (!b.has(s)) {
      return false;
    }
  }
  return true;
}
function toStyleMap(str) {
  var styleMap = /* @__PURE__ */new Map();
  for (var item of str.split(";")) {
    var [key, value] = item.split(":");
    key = key.trim();
    value = value && value.trim();
    if (key && value) {
      styleMap.set(key, value);
    }
  }
  return styleMap;
}
function isMapEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (var [key, value] of a) {
    if (value !== b.get(key)) {
      return false;
    }
  }
  return true;
}
function resolveCssVars(instance, vnode, expectedMap) {
  var root = instance.subTree;
  if (instance.getCssVars && (vnode === root || root && root.type === Fragment && root.children.includes(vnode))) {
    var cssVars = instance.getCssVars();
    for (var key in cssVars) {
      expectedMap.set("--".concat(getEscapedCssVarName(key, false)), String(cssVars[key]));
    }
  }
  if (vnode === root && instance.parent) {
    resolveCssVars(instance.parent, instance.vnode, expectedMap);
  }
}
var allowMismatchAttr = "data-allow-mismatch";
var MismatchTypeString = {
  [0 /* TEXT */]: "text",
  [1 /* CHILDREN */]: "children",
  [2 /* CLASS */]: "class",
  [3 /* STYLE */]: "style",
  [4 /* ATTRIBUTE */]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
  if (allowedType === 0 /* TEXT */ || allowedType === 1 /* CHILDREN */) {
    while (el && !el.hasAttribute(allowMismatchAttr)) {
      el = el.parentElement;
    }
  }
  var allowedAttr = el && el.getAttribute(allowMismatchAttr);
  if (allowedAttr == null) {
    return false;
  } else if (allowedAttr === "") {
    return true;
  } else {
    var list = allowedAttr.split(",");
    if (allowedType === 0 /* TEXT */ && list.includes("children")) {
      return true;
    }
    return allowedAttr.split(",").includes(MismatchTypeString[allowedType]);
  }
}
var requestIdleCallback = getGlobalThis().requestIdleCallback || (cb => setTimeout(cb, 1));
var cancelIdleCallback = getGlobalThis().cancelIdleCallback || (id => clearTimeout(id));
var hydrateOnIdle = function () {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e4;
  return hydrate => {
    var id = requestIdleCallback(hydrate, {
      timeout
    });
    return () => cancelIdleCallback(id);
  };
};
function elementIsVisibleInViewport(el) {
  var {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect();
  var {
    innerHeight,
    innerWidth
  } = window;
  return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
}
var hydrateOnVisible = opts => (hydrate, forEach) => {
  var ob = new IntersectionObserver(entries => {
    for (var e of entries) {
      if (!e.isIntersecting) continue;
      ob.disconnect();
      hydrate();
      break;
    }
  }, opts);
  forEach(el => {
    if (!(el instanceof UniElement)) return;
    if (elementIsVisibleInViewport(el)) {
      hydrate();
      ob.disconnect();
      return false;
    }
    ob.observe(el);
  });
  return () => ob.disconnect();
};
var hydrateOnMediaQuery = query => hydrate => {
  if (query) {
    var mql = matchMedia(query);
    if (mql.matches) {
      hydrate();
    } else {
      mql.addEventListener("change", hydrate, {
        once: true
      });
      return () => mql.removeEventListener("change", hydrate);
    }
  }
};
var hydrateOnInteraction = function () {
  var interactions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (hydrate, forEach) => {
    if (isString(interactions)) interactions = [interactions];
    var hasHydrated = false;
    var doHydrate = e => {
      if (!hasHydrated) {
        hasHydrated = true;
        teardown();
        hydrate();
        e.target.dispatchEvent(new e.constructor(e.type, e));
      }
    };
    var teardown = () => {
      forEach(el => {
        for (var i of interactions) {
          el.removeEventListener(i, doHydrate);
        }
      });
    };
    forEach(el => {
      for (var i of interactions) {
        el.addEventListener(i, doHydrate, {
          once: true
        });
      }
    });
    return teardown;
  };
};
function forEachElement(node, cb) {
  if (isComment(node) && node.data === "[") {
    var depth = 1;
    var _next2 = node.nextSibling;
    while (_next2) {
      if (_next2.nodeType === 1) {
        var result = cb(_next2);
        if (result === false) {
          break;
        }
      } else if (isComment(_next2)) {
        if (_next2.data === "]") {
          if (--depth === 0) break;
        } else if (_next2.data === "[") {
          depth++;
        }
      }
      _next2 = _next2.nextSibling;
    }
  } else {
    cb(node);
  }
}
var isAsyncWrapper = i => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = {
      loader: source
    };
  }
  var {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    hydrate: hydrateStrategy,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  var pendingRequest = null;
  var resolvedComp;
  var retries = 0;
  var retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  var load = () => {
    var thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch(err => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve, reject) => {
          var userRetry = () => resolve(retry());
          var userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then(comp => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$1("Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.");
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error("Invalid async component load result: ".concat(comp));
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent$1({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    __asyncHydrate(el, instance, hydrate) {
      var doHydrate = hydrateStrategy ? () => {
        var teardown = hydrateStrategy(hydrate, cb => forEachElement(el, cb));
        if (teardown) {
          (instance.bum || (instance.bum = [])).push(teardown);
        }
      } : hydrate;
      if (resolvedComp) {
        doHydrate();
      } else {
        load().then(() => !instance.isUnmounted && doHydrate());
      }
    },
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      var instance = currentInstance;
      markAsyncBoundary(instance);
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      var onError = err => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || false) {
        return load().then(comp => {
          return () => createInnerComp(comp, instance);
        }).catch(err => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      var loaded = ref(false);
      var error = ref();
      var delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            var err = new Error("Async component timed out after ".concat(timeout, "ms."));
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && instance.parent.vnode && isKeepAlive(instance.parent.vnode)) {
          instance.parent.update();
        }
      }).catch(err => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  var {
    ref: ref2,
    props,
    children,
    ce
  } = parent.vnode;
  var vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
var isKeepAlive = vnode => vnode.type.__isKeepAlive;
var KeepAliveImpl = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, _ref8) {
    var {
      slots
    } = _ref8;
    var keepAliveInstance = getCurrentInstance();
    var sharedContext = keepAliveInstance.ctx;
    var cache = /* @__PURE__ */new Map();
    var keys = /* @__PURE__ */new Set();
    var current = null;
    {
      keepAliveInstance.__v_cache = cache;
    }
    var parentSuspense = keepAliveInstance.suspense;
    var {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: {
          createElement
        }
      }
    } = sharedContext;
    var storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      var instance = vnode.component;
      move(vnode, container, anchor, 0, keepAliveInstance, parentSuspense);
      patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, namespace, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance.isDeactivated = false;
        if (instance.a) {
          invokeArrayFns(instance.a);
        }
        var vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance);
      }
    };
    sharedContext.deactivate = vnode => {
      var instance = vnode.component;
      invalidateMount(instance.m);
      invalidateMount(instance.a);
      move(vnode, storageContainer, null, 1, keepAliveInstance, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance.da) {
          invokeArrayFns(instance.da);
        }
        var vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }
        instance.isDeactivated = true;
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance);
      }
      {
        instance.__keepAliveStorageContainer = storageContainer;
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, keepAliveInstance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        var name = getComponentName(vnode.type);
        if (name && !filter(name)) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      var cached = cache.get(key);
      if (cached && (!current || !isSameVNodeType(cached, current))) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(() => [props.include, props.exclude], _ref9 => {
      var [include, exclude] = _ref9;
      include && pruneCache(name => matches(include, name));
      exclude && pruneCache(name => !matches(exclude, name));
    },
    // prune post-render after `current` has been updated
    {
      flush: "post",
      deep: true
    });
    var pendingCacheKey = null;
    var cacheSubtree = () => {
      if (pendingCacheKey != null) {
        if (isSuspense(keepAliveInstance.subTree.type)) {
          queuePostRenderEffect(() => {
            cache.set(pendingCacheKey, getInnerChild(keepAliveInstance.subTree));
          }, keepAliveInstance.subTree.suspense);
        } else {
          cache.set(pendingCacheKey, getInnerChild(keepAliveInstance.subTree));
        }
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach(cached => {
        var {
          subTree,
          suspense
        } = keepAliveInstance;
        var vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          var da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return current = null;
      }
      var children = slots.default();
      var rawVNode = children[0];
      if (children.length > 1) {
        {
          warn$1("KeepAlive should contain exactly one component child.");
        }
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      var vnode = getInnerChild(rawVNode);
      if (vnode.type === Comment$1) {
        current = null;
        return vnode;
      }
      var comp = vnode.type;
      var name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      var {
        include,
        exclude,
        max
      } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        vnode.shapeFlag &= -257;
        current = vnode;
        return rawVNode;
      }
      var key = vnode.key == null ? comp : vnode.key;
      var cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
var KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray$1(pattern)) {
    return pattern.some(p => matches(p, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    pattern.lastIndex = 0;
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstance();
  var wrappedHook = hook.__wdc || (hook.__wdc = () => {
    var current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    var current = target.parent;
    while (current && current.parent && current.parent.vnode) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  var injected = injectHook(type, hook, keepAliveRoot, true
  /* prepend */);
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= -257;
  vnode.shapeFlag &= -513;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (target) {
    if (isRootHook(type) && target.root && target !== target.root) {
      target = target.root;
      if (isRootImmediateHook(type)) {
        var proxy = target.proxy;
        callWithAsyncErrorHandling(hook.bind(proxy), target, type, ON_LOAD === type ? [proxy.$page.options] : []);
      }
    }
    var hooks = target[type] || (target[type] = []);
    var wrappedHook = hook.__weh || (hook.__weh = function () {
      pauseTracking();
      var reset = setCurrentInstance(target);
      try {
        for (var _len13 = arguments.length, args = new Array(_len13), _key15 = 0; _key15 < _len13; _key15++) {
          args[_key15] = arguments[_key15];
        }
        return callWithAsyncErrorHandling(hook, target, type, args);
      } finally {
        reset();
        resetTracking();
      }
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    var apiName = toHandlerKey((ErrorTypeStrings$1[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1("".concat(apiName, " is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().") + " If you are using async setup(), make sure to register lifecycle hooks before the first await statement.");
  }
}
var createHook = lifecycle => function (hook) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, function () {
      return hook(...arguments);
    }, target);
  }
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
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
  injectHook("ec", hook, target);
}
var COMPONENTS = "components";
var DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name) {
  var warnMissing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var maybeSelfReference = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var instance = currentRenderingInstance || currentInstance;
  if (instance) {
    var Component = instance.type;
    if (type === COMPONENTS) {
      var selfName = getComponentName(Component, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    var res =
    // local registration
    // check instance[type] first which is resolved for options API
    resolve(instance[type] || Component[type], name) ||
    // global registration
    // @ts-expect-error filters only exist in compat mode
    resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      var extra = type === COMPONENTS ? "\nIf this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement." : "";
      warn$1("Failed to resolve ".concat(type.slice(0, -1), ": ").concat(name).concat(extra));
    }
    return res;
  } else {
    warn$1("resolve".concat(capitalize(type.slice(0, -1)), " can only be used in render() or setup()."));
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  var ret;
  var cached = cache && cache[index];
  var sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString(source)) {
    var sourceIsReactiveArray = sourceIsArray && isReactive(source);
    var needsWrap = false;
    var isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (var i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1("The v-for range expect an integer value but got ".concat(source, "."));
    }
    ret = new Array(source);
    for (var _i2 = 0; _i2 < source; _i2++) {
      ret[_i2] = renderItem(_i2 + 1, _i2, void 0, cached && cached[_i2]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      var keys = Object.keys(source);
      ret = new Array(keys.length);
      for (var _i3 = 0, _l = keys.length; _i3 < _l; _i3++) {
        var key = keys[_i3];
        ret[_i3] = renderItem(source[key], key, _i3, cached && cached[_i3]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function createSlots(slots, dynamicSlots) {
  var _loop2 = function (i) {
    var slot = dynamicSlots[i];
    if (isArray$1(slot)) {
      for (var j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? function () {
        var res = slot.fn(...arguments);
        if (res) res.key = slot.key;
        return res;
      } : slot.fn;
    }
  };
  for (var i = 0; i < dynamicSlots.length; i++) {
    _loop2(i);
  }
  return slots;
}
function renderSlot(slots, name) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fallback = arguments.length > 3 ? arguments[3] : undefined;
  var noSlotted = arguments.length > 4 ? arguments[4] : undefined;
  var slot = slots[name];
  if (slot && slots._vapor) {
    var ret = (openBlock(), createBlock(VaporSlot, props));
    ret.vs = {
      slot,
      fallback
    };
    return ret;
  }
  if (currentRenderingInstance && (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce)) {
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(Fragment, null, [createVNode("slot", props, fallback && fallback())], 64);
  }
  if (slot && slot.length > 1) {
    warn$1("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.");
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  var validSlotContent = slot && ensureValidVNode(slot(props));
  var slotKey = props.key ||
  // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  var rendered = createBlock(Fragment, {
    key: (slotKey && !isSymbol(slotKey) ? slotKey : "_".concat(name)) + (
    // #7256 force differentiate fallback content from actual content
    !validSlotContent && fallback ? "_fb" : "")
  }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true;
    if (child.type === Comment$1) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
    return true;
  }) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
  var ret = {};
  if (!isObject(obj)) {
    warn$1("v-on with no argument expects an object value.");
    return ret;
  }
  for (var key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? "on:".concat(key) : toHandlerKey(key)] = obj[key];
  }
  return ret;
}
var getPublicInstance = i => {
  if (!i || i.vapor) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
var publicPropertiesMap =
// Move PURE marker to new line to workaround compiler discarding it
// due to type annotation
/* @__PURE__ */
extend(/* @__PURE__ */Object.create(null), {
  $: i => i,
  $el: i => {
    if (i.vapor) {
      if (i.block instanceof UniElement) {
        return i.block;
      }
      return null;
    }
    return i.vnode.el;
  },
  $data: i => i.data,
  $props: i => shallowReadonly(i.props),
  $attrs: i => shallowReadonly(i.attrs),
  $slots: i => shallowReadonly(i.slots),
  $refs: i => shallowReadonly(i.refs),
  $parent: i => getPublicInstance(i.parent),
  $root: i => getPublicInstance(i.root),
  $host: i => i.ce,
  $emit: i => i.emit,
  $options: i => resolveMergedOptions(i),
  $forceUpdate: i => i.f || (i.f = () => {
    queueJob(i.update);
  }),
  // fixed by xxxxxx
  // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),
  $nextTick: i => i.n || (i.n = fn => nextTick.bind(i.proxy)(fn, i)),
  $watch: i => instanceWatch.bind(i)
});
publicPropertiesMap.$callMethod = i => {
  return function (methodName) {
    var proxy = getComponentPublicInstance(i) || i.proxy;
    if (!proxy) {
      return null;
    }
    var method = proxy[methodName];
    if (method) {
      for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
        args[_key16 - 1] = arguments[_key16];
      }
      return method(...args);
    }
    console.error("method ".concat(methodName, " not found"));
    return null;
  };
};
var isReservedPrefix = key => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get(_ref10, key) {
    var {
      _: instance
    } = _ref10;
    if (key === "__v_skip") {
      return true;
    }
    var {
      ctx,
      setupState,
      data,
      props,
      accessCache,
      type,
      appContext
    } = instance;
    if (key === "__isVue") {
      return true;
    }
    var normalizedProps;
    if (key[0] !== "$") {
      var n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1 /* SETUP */:
            return setupState[key];
          case 2 /* DATA */:
            return data[key];
          case 4 /* CONTEXT */:
            return ctx[key];
          case 3 /* PROPS */:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1 /* SETUP */;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2 /* DATA */;
        return data[key];
      } else if (
      // only cache other properties when instance has declared (thus stable)
      // props
      (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3 /* PROPS */;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4 /* CONTEXT */;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0 /* OTHER */;
      }
    }
    var publicGetter = publicPropertiesMap[key];
    var cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
    // css module (injected by vue-loader)
    (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4 /* CONTEXT */;
      return ctx[key];
    } else if (
    // global properties
    globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) ||
    // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1("Property ".concat(JSON.stringify(key), " must be accessed via $data because it starts with a reserved character (\"$\" or \"_\") and is not proxied on the render context."));
      } else if (instance === currentRenderingInstance) {
        warn$1("Property ".concat(JSON.stringify(key), " was accessed during render but is not defined on instance."));
      }
    }
  },
  set(_ref11, key, value) {
    var {
      _: instance
    } = _ref11;
    var {
      data,
      setupState,
      ctx
    } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1("Cannot mutate <script setup> binding \"".concat(key, "\" from Options API."));
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1("Attempting to mutate prop \"".concat(key, "\". Props are readonly."));
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1("Attempting to mutate public property \"".concat(key, "\". Properties starting with $ are reserved and readonly."));
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has(_ref12, key) {
    var {
      _: {
        data,
        setupState,
        accessCache,
        ctx,
        appContext,
        propsOptions
      }
    } = _ref12;
    var normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = target => {
    warn$1("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.");
    return Reflect.ownKeys(target);
  };
}
var RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */extend({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    if (key === Symbol.unscopables) {
      return;
    }
    return PublicInstanceProxyHandlers.get(target, key, target);
  },
  has(_, key) {
    var has = key[0] !== "_" && !isGloballyAllowed(key);
    if (!has && PublicInstanceProxyHandlers.has(_, key)) {
      warn$1("Property ".concat(JSON.stringify(key), " should not start with _ which is a reserved prefix for Vue internals."));
    }
    return has;
  }
});
function createDevRenderContext(instance) {
  var target = {};
  Object.defineProperty(target, "_", {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach(key => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  var {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach(key => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  var {
    ctx,
    setupState
  } = instance;
  Object.keys(toRaw(setupState)).forEach(key => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1("setup() return property ".concat(JSON.stringify(key), " should not start with \"$\" or \"_\" which are reserved prefixes for Vue internals."));
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
var warnRuntimeUsage = method => warn$1("".concat(method, "() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect."));
function defineProps() {
  {
    warnRuntimeUsage("defineProps");
  }
  return null;
}
function defineEmits() {
  {
    warnRuntimeUsage("defineEmits");
  }
  return null;
}
function defineExpose(exposed) {
  {
    warnRuntimeUsage("defineExpose");
  }
}
function defineOptions(options) {
  {
    warnRuntimeUsage("defineOptions");
  }
}
function defineSlots() {
  {
    warnRuntimeUsage("defineSlots");
  }
  return null;
}
function defineModel() {
  {
    warnRuntimeUsage("defineModel");
  }
}
function withDefaults(props, defaults) {
  {
    warnRuntimeUsage("withDefaults");
  }
  return null;
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function getContext() {
  var i = getCurrentGenericInstance();
  if (!i) {
    warn$1("useContext() called without active instance.");
  }
  if (i.vapor) {
    return i;
  } else {
    var ii = i;
    return ii.setupContext || (ii.setupContext = createSetupContext(ii));
  }
}
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
function mergeDefaults(raw, defaults) {
  var props = normalizePropsOrEmits(raw);
  for (var key in defaults) {
    if (key.startsWith("__skip")) continue;
    var opt = props[key];
    if (opt) {
      if (isArray$1(opt) || isFunction(opt)) {
        opt = props[key] = {
          type: opt,
          default: defaults[key]
        };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = {
        default: defaults[key]
      };
    } else {
      warn$1("props default key \"".concat(key, "\" has no corresponding declaration."));
    }
    if (opt && defaults["__skip_".concat(key)]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
function mergeModels(a, b) {
  if (!a || !b) return a || b;
  if (isArray$1(a) && isArray$1(b)) return a.concat(b);
  return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  var ret = {};
  var _loop3 = function (key) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  };
  for (var key in props) {
    _loop3(key);
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  var ctx = getCurrentGenericInstance();
  if (!ctx) {
    warn$1("withAsyncContext called without active current instance. This is likely a bug.");
  }
  var awaitable = getAwaitable();
  unsetCurrentInstance();
  if (isPromise(awaitable)) {
    awaitable = awaitable.catch(e => {
      setCurrentInstance(ctx);
      throw e;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}
function createDuplicateChecker() {
  var cache = /* @__PURE__ */Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1("".concat(type, " property \"").concat(key, "\" is already defined in ").concat(cache[key], "."));
    } else {
      cache[key] = type;
    }
  };
}
var shouldCacheAccess = true;
function applyOptions(instance) {
  var options = resolveMergedOptions(instance);
  var publicThis = instance.proxy;
  var ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
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
    render,
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
  var checkDuplicateProperties = createDuplicateChecker();
  {
    var [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (var key in propsOptions) {
        checkDuplicateProperties("Props" /* PROPS */, key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (var _key17 in methods) {
      var methodHandler = methods[_key17];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, _key17, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods" /* METHODS */, _key17);
        }
      } else {
        warn$1("Method \"".concat(_key17, "\" has type \"").concat(typeof methodHandler, "\" in the component definition. Did you reference the function correctly?"));
      }
    }
  }
  if (dataOptions) {
    (function () {
      if (!isFunction(dataOptions)) {
        warn$1("The data option must be a function. Plain object usage is no longer supported.");
      }
      var data = dataOptions.call(publicThis, publicThis);
      if (isPromise(data)) {
        warn$1("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.");
      }
      if (!isObject(data)) {
        warn$1("data() should return an object.");
      } else {
        instance.data = reactive(data);
        {
          var _loop4 = function (_key18) {
            checkDuplicateProperties("Data" /* DATA */, _key18);
            if (!isReservedPrefix(_key18[0])) {
              Object.defineProperty(ctx, _key18, {
                configurable: true,
                enumerable: true,
                get: () => data[_key18],
                set: NOOP
              });
            }
          };
          for (var _key18 in data) {
            _loop4(_key18);
          }
        }
      }
    })();
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    var _loop5 = function (_key19) {
      var opt = computedOptions[_key19];
      var get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get === NOOP) {
        warn$1("Computed property \"".concat(_key19, "\" has no getter."));
      }
      var set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1("Write operation failed: computed property \"".concat(_key19, "\" is readonly."));
      };
      var c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, _key19, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => c.value = v
      });
      {
        checkDuplicateProperties("Computed" /* COMPUTED */, _key19);
      }
    };
    for (var _key19 in computedOptions) {
      _loop5(_key19);
    }
  }
  if (watchOptions) {
    for (var _key20 in watchOptions) {
      createWatcher(watchOptions[_key20], ctx, publicThis, _key20);
    }
  }
  if (provideOptions) {
    var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach(key => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach(_hook => register(_hook.bind(publicThis)));
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
  if (isArray$1(expose)) {
    if (expose.length) {
      var exposed = instance.exposed || (instance.exposed = {});
      expose.forEach(key => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: val => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  var customApplyOptions = instance.appContext.config.globalProperties.$applyOptions;
  if (customApplyOptions) {
    customApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx) {
  var checkDuplicateProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  var _loop6 = function (key) {
    var opt = injectOptions[key];
    var injected = void 0;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: v => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject" /* INJECT */, key);
    }
  };
  for (var key in injectOptions) {
    _loop6(key);
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map(h => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  var getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    var handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    } else {
      warn$1("Invalid watch handler specified by key \"".concat(raw, "\""), handler);
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach(r => createWatcher(r, ctx, publicThis, key));
    } else {
      var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(_handler)) {
        watch(getter, _handler, raw);
      } else {
        warn$1("Invalid watch handler specified by key \"".concat(raw.handler, "\""), _handler);
      }
    }
  } else {
    warn$1("Invalid watch option: \"".concat(key, "\""), raw);
  }
}
function resolveMergedOptions(instance) {
  var base = instance.type;
  var {
    mixins,
    extends: extendsOptions
  } = base;
  var {
    mixins: globalMixins,
    optionsCache: cache,
    config: {
      optionMergeStrategies
    }
  } = instance.appContext;
  var cached = cache.get(base);
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
      globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats) {
  var asMixin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var {
    mixins,
    extends: extendsOptions
  } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(m => mergeOptions(to, m, strats, true));
  }
  for (var key in from) {
    if (asMixin && key === "expose") {
      warn$1("\"expose\" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.");
    } else {
      var strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
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
  if (isArray$1(raw)) {
    var res = {};
    for (var i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [... /* @__PURE__ */new Set([...to, ...from])];
    }
    return extend(/* @__PURE__ */Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  var merged = extend(/* @__PURE__ */Object.create(null), to);
  for (var key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
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
    provides: /* @__PURE__ */Object.create(null),
    optionsCache: /* @__PURE__ */new WeakMap(),
    propsCache: /* @__PURE__ */new WeakMap(),
    emitsCache: /* @__PURE__ */new WeakMap()
  };
}
var uid$1 = 0;
function createAppAPI(mount, unmount, getPublicInstance, render) {
  return function createApp(rootComponent) {
    var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1("root props passed to app.mount() must be an object.");
      rootProps = null;
    }
    var context = createAppContext();
    var installedPlugins = /* @__PURE__ */new WeakSet();
    var pluginCleanupFns = [];
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
        {
          warn$1("app.config cannot be replaced. Modify individual options instead.");
        }
      },
      use(plugin) {
        for (var _len15 = arguments.length, options = new Array(_len15 > 1 ? _len15 - 1 : 0), _key21 = 1; _key21 < _len15; _key21++) {
          options[_key21 - 1] = arguments[_key21];
        }
        if (installedPlugins.has(plugin)) {
          warn$1("Plugin has already been applied to target app.");
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else {
          warn$1("A plugin must either be a function or an object with an \"install\" function.");
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? ": ".concat(mixin.name) : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1("Component \"".concat(name, "\" has already been registered in target app."));
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1("Directive \"".concat(name, "\" has already been registered in target app."));
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          }
          var instance = mount(app, rootContainer, isHydrate, namespace);
          {
            app._instance = instance;
            devtoolsInitApp(app, version);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getPublicInstance(instance);
        } else {
          warn$1("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        }
      },
      onUnmount(cleanupFn) {
        if (typeof cleanupFn !== "function") {
          warn$1("Expected function as first argument to app.onUnmount(), but got ".concat(typeof cleanupFn));
        }
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
          unmount(app);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn$1("Cannot unmount an app that is not mounted.");
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1("App already provides property with key \"".concat(String(key), "\". It will be overwritten with the new value."));
        }
        context.provides[key] = value;
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
function provide(key, value) {
  var currentInstance = getCurrentGenericInstance();
  if (!currentInstance) {
    {
      warn$1("provide() can only be used inside setup().");
    }
  } else {
    var provides = currentInstance.provides;
    var parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue) {
  var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var instance = getCurrentGenericInstance();
  if (instance || currentApp) {
    var provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.appContext && instance.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1("injection \"".concat(String(key), "\" not found."));
    }
  } else {
    warn$1("inject() can only be used inside setup() or functional components.");
  }
}
function hasInjectionContext() {
  return !!(getCurrentGenericInstance() || currentApp);
}
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = obj => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful) {
  var isSSR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var props = instance.props = {};
  var attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (var key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance.propsOptions[0]);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId) return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  var {
    props,
    attrs,
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
  !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      var propsToUpdate = instance.vnode.dynamicProps;
      for (var i = 0; i < propsToUpdate.length; i++) {
        var key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        var value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            var camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, camelizedKey, value, instance, baseResolveDefault);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    var kebabKey;
    for (var _key22 in rawCurrentProps) {
      if (!rawProps ||
      // for camelCase
      !hasOwn(rawProps, _key22) && (
      // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = hyphenate(_key22)) === _key22 || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (
          // for camelCase
          rawPrevProps[_key22] !== void 0 ||
          // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[_key22] = resolvePropValue(options, _key22, void 0, instance, baseResolveDefault, true);
          }
        } else {
          delete props[_key22];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (var _key23 in attrs) {
        if (!rawProps || !hasOwn(rawProps, _key23) && true) {
          delete attrs[_key23];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
  {
    validateProps(rawProps || {}, props, instance.propsOptions[0]);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  var [options, needCastKeys] = instance.propsOptions;
  var hasAttrsChanged = false;
  var rawCastValues;
  if (rawProps) {
    for (var key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      var value = rawProps[key];
      var camelKey = void 0;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    var castValues = rawCastValues || EMPTY_OBJ;
    for (var i = 0; i < needCastKeys.length; i++) {
      var _key24 = needCastKeys[i];
      props[_key24] = resolvePropValue(options, _key24, castValues[_key24], instance, baseResolveDefault, !hasOwn(castValues, _key24));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, key, value, instance, resolveDefault) {
  var isAbsent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var opt = options[key];
  if (opt != null) {
    var hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      var defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        var cachedDefaults = instance.propsDefaults || (instance.propsDefaults = {});
        if (hasOwn(cachedDefaults, key)) {
          value = cachedDefaults[key];
        } else {
          value = cachedDefaults[key] = resolveDefault(defaultValue, instance, key);
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[0 /* shouldCast */]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function baseResolveDefault(factory, instance, key) {
  var value;
  var reset = setCurrentInstance(instance);
  var props = toRaw(instance.props);
  value = factory.call(null, props);
  reset();
  return value;
}
var mixinPropsCache = /* @__PURE__ */new WeakMap();
function normalizePropsOptions$1(comp, appContext) {
  var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cache = asMixin ? mixinPropsCache : appContext.propsCache;
  var cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  var raw = comp.props;
  var normalized = {};
  var needCastKeys = [];
  var hasExtends = false;
  if (!isFunction(comp)) {
    var extendProps = raw2 => {
      hasExtends = true;
      var [props, keys] = normalizePropsOptions$1(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
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
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  baseNormalizePropsOptions(raw, normalized, needCastKeys);
  var res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function baseNormalizePropsOptions(raw, normalized, needCastKeys) {
  if (isArray$1(raw)) {
    for (var i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1("props must be strings when using array syntax.", raw[i]);
      }
      var normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1("invalid props options", raw);
    }
    for (var key in raw) {
      var _normalizedKey = camelize(key);
      if (validatePropName(_normalizedKey)) {
        var opt = raw[key];
        var prop = normalized[_normalizedKey] = isArray$1(opt) || isFunction(opt) ? {
          type: opt
        } : extend({}, opt);
        var propType = prop.type;
        var shouldCast = false;
        var shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (var index = 0; index < propType.length; ++index) {
            var type = propType[index];
            var typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[0 /* shouldCast */] = shouldCast;
        prop[1 /* shouldCastTrue */] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(_normalizedKey);
        }
      }
    }
  }
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1("Invalid prop name: \"".concat(key, "\" is a reserved property."));
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
function validateProps(rawProps, resolvedProps, options) {
  resolvedProps = toRaw(resolvedProps);
  var camelizePropsKey = Object.keys(rawProps).map(key => camelize(key));
  for (var key in options) {
    var opt = options[key];
    if (opt != null) {
      validateProp(key, resolvedProps[key], opt, resolvedProps, !camelizePropsKey.includes(key));
    }
  }
}
function validateProp(key, value, propOptions, resolvedProps, isAbsent) {
  var {
    type,
    required,
    validator,
    skipCheck
  } = propOptions;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + key + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    var isValid = false;
    var types = isArray$1(type) ? type : [type];
    var expectedTypes = [];
    for (var i = 0; i < types.length && !isValid; i++) {
      var {
        valid,
        expectedType
      } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(key, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, shallowReadonly(resolvedProps))) {
    warn$1('Invalid prop: custom validator check failed for prop "' + key + '".');
  }
}
var isSimpleType = /* @__PURE__ */makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === "null") {
    valid = value === null;
  } else if (isSimpleType(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return "Prop type [] for prop \"".concat(name, "\" won't match anything. Did you mean to use type Array instead?");
  }
  var message = "Invalid prop: type check failed for prop \"".concat(name, "\". Expected ").concat(expectedTypes.map(capitalize).join(" | "));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value ".concat(expectedValue);
  }
  message += ", got ".concat(receivedType, " ");
  if (isExplicable(receivedType)) {
    message += "with value ".concat(receivedValue, ".");
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return "\"".concat(value, "\"");
  } else if (type === "Number") {
    return "".concat(Number(value));
  } else {
    return "".concat(value);
  }
}
function isExplicable(type) {
  var explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some(elem => type.toLowerCase() === elem);
}
function isBoolean() {
  for (var _len16 = arguments.length, args = new Array(_len16), _key25 = 0; _key25 < _len16; _key25++) {
    args[_key25] = arguments[_key25];
  }
  return args.some(elem => elem.toLowerCase() === "boolean");
}
var isInternalKey = key => key[0] === "_" || key === "$stable";
var normalizeSlotValue = value => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  var normalized = withCtx(function () {
    if (!!("development" !== "production") && currentInstance && !currentInstance.vapor && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) {
      warn$1("Slot \"".concat(key, "\" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead."));
    }
    return normalizeSlotValue(rawSlot(...arguments));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  var ctx = rawSlots._ctx;
  for (var key in rawSlots) {
    if (isInternalKey(key)) continue;
    var value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      (function () {
        {
          warn$1("Non-function value encountered for slot \"".concat(key, "\". Prefer function slots for better performance."));
        }
        var normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      })();
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$1("Non-function value encountered for default slot. Prefer function slots for better performance.");
  }
  var normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var assignSlots = (slots, children, optimized) => {
  for (var key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
var initSlots = (instance, children, optimized) => {
  var slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    var type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
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
      if (isHmrUpdating) {
        assignSlots(slots, children, optimized);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
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
    for (var key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
var supported;
var perf;
var cachedNow = 0;
var p = /* @__PURE__ */Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = isSupported() ? perf.now() : Date.now());
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark("vue-".concat(type, "-").concat(instance.uid));
  }
  {
    devtoolsPerfStart(instance, type, getNow());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    var startTag = "vue-".concat(type, "-").concat(instance.uid);
    var endTag = startTag + ":end";
    perf.mark(endTag);
    perf.measure("<".concat(formatComponentName(instance, instance.type), "> ").concat(type), startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, getNow());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
var initialized = false;
function initFeatureFlags() {
  if (initialized) return;
  var needWarn = [];
  if (needWarn.length) {
    var multi = needWarn.length > 1;
    console.warn("Feature flag".concat(multi ? "s" : "", " ").concat(needWarn.join(", "), " ").concat(multi ? "are" : "is", " not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.\n\nFor more details, see https://link.vuejs.org/feature-flags."));
  }
  initialized = true;
}
var MoveType = {
  "ENTER": 0,
  "0": "ENTER",
  "LEAVE": 1,
  "1": "LEAVE",
  "REORDER": 2,
  "2": "REORDER"
};
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  var target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  var {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    forcePatchProp: hostForcePatchProp,
    // fixed by xxxxxx
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
  var patch = function (n1, n2, container) {
    var anchor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var parentComponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSuspense = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var namespace = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : void 0;
    var slotScopeIds = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var optimized = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : isHmrUpdating ? false : !!n2.dynamicChildren;
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
      ref,
      shapeFlag
    } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment$1:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        break;
      case VaporSlot:
        getVaporInterface(parentComponent, n2).slot(n1, n2, container, anchor);
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
        } else {
          warn$1("Invalid VNode type:", type, "(".concat(typeof type, ")"));
        }
    }
    if (ref != null && parentComponent) {
      setRef$1(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  var processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children, container),
      // fixed by xxxxxx
      container, anchor);
    } else {
      var el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  var processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || "", container),
      // fixed by xxxxxx
      container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  var mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
  };
  var patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      var anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  var moveStaticNode = (_ref13, container, nextSibling) => {
    var {
      el,
      anchor
    } = _ref13;
    var next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  var removeStaticNode = _ref14 => {
    var {
      el,
      anchor
    } = _ref14;
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
    el = vnode.el = hostCreateElement(vnode.type,
    // fixed by xxxxxx
    container);
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
      for (var key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent,
          // fixed by xxxxxx
          vnode.hostInstance);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace,
        // fixed by xxxxxx
        parentComponent,
        // fixed by xxxxxx
        vnode.hostInstance);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    {
      def(el, "__vnode", vnode, true);
      def(el, "__vueParentComponent", parentComponent, true);
    }
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
      for (var i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    var subTree = parentComponent && parentComponent.subTree;
    if (subTree) {
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        var parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  var mountChildren = function (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) {
    var start = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    for (var i = start; i < children.length; i++) {
      var _child3 = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, _child3, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  };
  var patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    var el = n2.el = n1.el;
    {
      el.__vnode = n2;
    }
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
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
      {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace, n2.hostInstance);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace,
            // fixed by xxxxxx
            parentComponent,
            // fixed by xxxxxx
            n2.hostInstance);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace,
          // fixed by xxxxxx
          parentComponent,
          // fixed by xxxxxx
          n2.hostInstance);
        }
        if (patchFlag & 8) {
          var propsToUpdate = n2.dynamicProps;
          for (var i = 0; i < propsToUpdate.length; i++) {
            var key = propsToUpdate[i];
            var prev = oldProps[key];
            var _next3 = newProps[key];
            if (_next3 !== prev ||
            // key === 'value' || // fixed by xxxxxx
            hostForcePatchProp && hostForcePatchProp(el, key)) {
              hostPatchProp(el, key, prev, _next3, namespace, parentComponent,
              // fixed by xxxxxx
              n2.hostInstance);
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
      patchProps(el, oldProps, newProps, parentComponent, namespace, n2.hostInstance);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  var patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (var i = 0; i < newChildren.length; i++) {
      var oldVNode = oldChildren[i];
      var newVNode = newChildren[i];
      var container =
      // oldVNode may be an errored async setup() component inside Suspense
      // which will not have a mounted element
      oldVNode.el && (
      // - In the case of a Fragment, we need to provide the actual parent
      // of the Fragment itself so it can move its children.
      oldVNode.type === Fragment ||
      // - In the case of different nodes, there is going to be a replacement
      // which also requires the correct parent container
      !isSameVNodeType(oldVNode, newVNode) ||
      // - In the case of a component, it could contain anything.
      oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) :
      // In other cases, the parent container is not actually used so we
      // just pass the block element here to avoid a DOM parentNode call.
      fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
    }
  };
  var patchProps = (el, oldProps, newProps, parentComponent, namespace, hostInstance) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (var key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent,
            // fixed by xxxxxx
            hostInstance);
          }
        }
      }
      for (var _key26 in newProps) {
        if (isReservedProp(_key26)) continue;
        var _next4 = newProps[_key26];
        var prev = oldProps[_key26];
        if (_next4 !== prev && _key26 !== "value" || hostForcePatchProp && hostForcePatchProp(el, _key26)) {
          hostPatchProp(el, _key26, prev, _next4, namespace, parentComponent,
          // fixed by xxxxxx
          hostInstance);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace, parentComponent, hostInstance);
      }
    }
  };
  var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("", container, true);
    var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("", container, true);
    var {
      patchFlag,
      dynamicChildren,
      slotScopeIds: fragmentSlotScopeIds
    } = n2;
    if (
    // #5523 dev root fragment may inherit directives
    isHmrUpdating || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
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
      n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren &&
      // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
        {
          traverseStaticChildren(n1, n2);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
    }
  };
  var processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n2.type.__vapor) {
      if (n1 == null) {
        getVaporInterface(parentComponent, n2).mount(n2, container, anchor, parentComponent);
      } else {
        getVaporInterface(parentComponent, n2).update(n1, n2, shouldUpdateComponent(n1, n2, optimized));
      }
    } else if (n1 == null) {
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
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, "mount");
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, "init");
      }
      setupComponent(instance, false, optimized);
      {
        endMeasure(instance, "init");
      }
    }
    if (isHmrUpdating) initialVNode.el = null;
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        var placeholder = instance.subTree = createVNode(Comment$1);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
    }
    {
      popWarningContext();
      endMeasure(instance, "mount");
    }
  };
  var updateComponent = (n1, n2, optimized) => {
    var instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
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
          parent,
          root,
          type
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
            {
              startMeasure(instance, "render");
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, "render");
            }
            {
              startMeasure(instance, "hydrate");
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, "hydrate");
            }
          };
          if (isAsyncWrapperVNode && type.__asyncHydrate) {
            type.__asyncHydrate(el, instance, hydrateSubTree);
          } else {
            hydrateSubTree();
          }
        } else {
          if (root.ce) {
            root.ce._injectChildStyle(type);
          }
          {
            startMeasure(instance, "render");
          }
          var subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, "render");
          }
          {
            startMeasure(instance, "patch");
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
          {
            endMeasure(instance, "patch");
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          var scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && parent.vnode && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        var {
          next: _next5,
          bu,
          u,
          parent: _parent,
          vnode
        } = instance;
        {
          var nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (_next5) {
              _next5.el = vnode.el;
              updateComponentPreRender(instance, _next5, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        var originNext = _next5;
        var _vnodeHook;
        {
          pushWarningContext(_next5 || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (_next5) {
          _next5.el = vnode.el;
          updateComponentPreRender(instance, _next5, optimized);
        } else {
          _next5 = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (_vnodeHook = _next5.props && _next5.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(_vnodeHook, _parent, _next5, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, "render");
        }
        var nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, "render");
        }
        var prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, "patch");
        }
        patch(prevTree, nextTree,
        // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el),
        // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree), instance, parentSuspense, namespace);
        {
          endMeasure(instance, "patch");
        }
        _next5.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (_vnodeHook = _next5.props && _next5.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(_vnodeHook, _parent, _next5, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    instance.scope.on();
    var effect = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    var update = instance.update = effect.run.bind(effect);
    var job = instance.job = () => effect.dirty && effect.run();
    job.i = instance;
    job.id = instance.uid;
    effect.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? e => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? e => invokeArrayFns(instance.rtg, e) : void 0;
    }
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
  var patchChildren = function (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds) {
    var optimized = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
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
    var i;
    for (i = 0; i < commonLength; i++) {
      var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
    }
  };
  var patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    var i = 0;
    var l2 = c2.length;
    var e1 = c1.length - 1;
    var e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      var n1 = c1[i];
      var n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
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
    if (i > e1) {
      if (i <= e2) {
        var nextPos = e2 + 1;
        var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      var s1 = i;
      var s2 = i;
      var keyToNewIndexMap = /* @__PURE__ */new Map();
      for (i = s2; i <= e2; i++) {
        var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1("Duplicate keys found during update:", JSON.stringify(nextChild.key), "Make sure keys are unique.");
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      var j;
      var patched = 0;
      var toBePatched = e2 - s2 + 1;
      var moved = false;
      var maxNewIndexSoFar = 0;
      var newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) {
        newIndexToOldIndexMap[i] = 0;
      }
      for (i = s1; i <= e1; i++) {
        var prevChild = c1[i];
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
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
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
      for (i = toBePatched - 1; i >= 0; i--) {
        var nextIndex = s2 + i;
        var _nextChild = c2[nextIndex];
        var _anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, _nextChild, container, _anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(_nextChild, container, _anchor, 2, parentComponent);
          } else {
            j--;
          }
        }
      }
    }
  };
  var move = function (vnode, container, anchor, moveType, parentComponent) {
    var parentSuspense = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var {
      el,
      type,
      transition,
      children,
      shapeFlag
    } = vnode;
    if (shapeFlag & 6) {
      if (type.__vapor) {
        getVaporInterface(parentComponent, vnode).move(vnode, container, anchor);
      } else {
        move(vnode.component.subTree, container, anchor, moveType, parentComponent);
      }
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
      for (var i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType, parentComponent);
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
        var remove2 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        var performLeave = () => {
          leave(el, () => {
            remove2();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove2, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  var unmount = function (vnode, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var optimized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref != null) {
      pauseTracking();
      setRef$1(ref, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
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
      if (type.__vapor) {
        getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove);
        return;
      } else {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      }
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
      } else if (dynamicChildren &&
      // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && (
      // #1153: fast path should not be taken for non-stable (v-for) fragments
      type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (type === VaporSlot) {
        getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove);
        return;
      }
      if (doRemove) {
        remove(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  var remove = vnode => {
    var {
      type,
      el,
      anchor,
      transition
    } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach(child => {
          if (child.type === Comment$1) {
            hostRemove(child.el);
          } else {
            remove(child);
          }
        });
      } else {
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
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    var {
      bum,
      scope,
      job,
      subTree,
      um,
      m,
      a,
      parent,
      slots: {
        __: slotCacheKeys
      }
    } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    if (parent && isArray$1(slotCacheKeys)) {
      slotCacheKeys.forEach(v => {
        parent.renderCache[v] = void 0;
      });
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
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
    {
      devtoolsComponentRemoved(instance);
    }
  };
  var unmountChildren = function (children, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var optimized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var start = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    for (var i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  var getNextHostNode = vnode => {
    if (vnode.shapeFlag & 6) {
      if (vnode.type.__vapor) {
        return hostNextSibling(vnode.component.block);
      }
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    var el = hostNextSibling(vnode.anchor || vnode.el);
    var teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  var render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, namespace);
    }
    container._vnode = vnode;
    flushOnAppMount();
  };
  var internals = {
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
  var hydrate;
  var hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  var mountApp = (app, container, isHydrate, namespace) => {
    var vnode = app._ceVNode || createVNode(app._component, app._props);
    vnode.appContext = app._context;
    if (namespace === true) {
      namespace = "svg";
    } else if (namespace === false) {
      namespace = void 0;
    }
    {
      app._context.reload = () => {
        var cloned = cloneVNode(vnode);
        cloned.el = null;
        render(cloned, container, namespace);
      };
    }
    if (isHydrate && hydrate) {
      hydrate(vnode, container);
    } else {
      render(vnode, container, namespace);
    }
    return vnode.component;
  };
  var unmountApp = app => {
    render(null, app._container);
  };
  return {
    render,
    hydrate,
    internals,
    createApp: createAppAPI(mountApp, unmountApp, getComponentPublicInstance)
  };
}
function resolveChildrenNamespace(_ref15, currentNamespace) {
  var {
    type,
    props
  } = _ref15;
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse(_ref16, allowed) {
  var {
    effect,
    job,
    vapor
  } = _ref16;
  if (!vapor) {
    if (allowed) {
      effect.flags |= 128;
      job.flags |= 4;
    } else {
      effect.flags &= -129;
      job.flags &= -5;
    }
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2) {
  var shallow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var ch1 = n1.children;
  var ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (var i = 0; i < ch1.length; i++) {
      var c1 = ch1[i];
      var c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment$1 && !c2.el) {
        c2.el = c1.el;
      }
      {
        c2.el && (c2.el.__vnode = c2);
      }
    }
  }
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
function invalidateMount(hooks) {
  if (hooks) {
    for (var i = 0; i < hooks.length; i++) {
      hooks[i].flags |= 8;
    }
  }
}
function getVaporInterface(instance, vnode) {
  var ctx = instance ? instance.appContext : vnode.appContext;
  var res = ctx && ctx.vapor;
  if (!res) {
    warn$1("Vapor component found in vdom tree but vapor-in-vdom interop was not installed. Make sure to install it:\n```\nimport { vaporInteropPlugin } from 'vue'\napp.use(vaporInteropPlugin)\n```");
  }
  return res;
}
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    var ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.");
    }
    return ctx;
  }
};
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
  return doWatch(effect, null, extend({}, options, {
    flush: "post"
  }));
}
function watchSyncEffect(effect, options) {
  return doWatch(effect, null, extend({}, options, {
    flush: "sync"
  }));
}
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ;
  var {
    immediate,
    deep,
    flush,
    once
  } = options;
  if (!cb) {
    if (immediate !== void 0) {
      warn$1("watch() \"immediate\" option is only respected when using the watch(source, callback, options?) signature.");
    }
    if (deep !== void 0) {
      warn$1("watch() \"deep\" option is only respected when using the watch(source, callback, options?) signature.");
    }
    if (once !== void 0) {
      warn$1("watch() \"once\" option is only respected when using the watch(source, callback, options?) signature.");
    }
  }
  var baseWatchOptions = extend({}, options);
  baseWatchOptions.onWarn = warn$1;
  var instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  var isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = job => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = job => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  var watchHandle = watch$1(source, cb, baseWatchOptions);
  return watchHandle;
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
function createPathGetter(ctx, path) {
  var segments = path.split(".");
  return () => {
    var cur = ctx;
    for (var i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function useModel(props, name) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ;
  var i = getCurrentGenericInstance();
  if (!i) {
    warn$1("useModel() called without active instance.");
    return ref();
  }
  var camelizedName = camelize(name);
  if (!i.propsOptions[0][camelizedName]) {
    warn$1("useModel() called with prop \"".concat(name, "\" which is not declared."));
    return ref();
  }
  var hyphenatedName = hyphenate(name);
  var modifiers = getModelModifiers(props, camelizedName, defaultPropGetter);
  var res = customRef((track, trigger) => {
    var localValue;
    var prevSetValue = EMPTY_OBJ;
    var prevEmittedValue;
    watchSyncEffect(() => {
      var propValue = props[camelizedName];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger();
      }
    });
    return {
      get() {
        track();
        return options.get ? options.get(localValue) : localValue;
      },
      set(value) {
        var emittedValue = options.set ? options.set(value) : value;
        if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) {
          return;
        }
        var rawPropKeys;
        var parentPassedModelValue = false;
        var parentPassedModelUpdater = false;
        if (i.rawKeys) {
          rawPropKeys = i.rawKeys();
        } else {
          var rawProps = i.vnode.props;
          rawPropKeys = rawProps && Object.keys(rawProps);
        }
        if (rawPropKeys) {
          for (var key of rawPropKeys) {
            if (key === name || key === camelizedName || key === hyphenatedName) {
              parentPassedModelValue = true;
            } else if (key === "onUpdate:".concat(name) || key === "onUpdate:".concat(camelizedName) || key === "onUpdate:".concat(hyphenatedName)) {
              parentPassedModelUpdater = true;
            }
          }
        }
        if (!parentPassedModelValue || !parentPassedModelUpdater) {
          localValue = value;
          trigger();
        }
        i.emit("update:".concat(name), emittedValue);
        if (hasChanged(value, emittedValue) && hasChanged(value, prevSetValue) && !hasChanged(emittedValue, prevEmittedValue)) {
          trigger();
        }
        prevSetValue = value;
        prevEmittedValue = emittedValue;
      }
    };
  });
  res[Symbol.iterator] = () => {
    var i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return {
            value: i2++ ? modifiers || EMPTY_OBJ : res,
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  };
  return res;
}
var getModelModifiers = (props, modelName, getter) => {
  return modelName === "modelValue" || modelName === "model-value" ? getter(props, "modelModifiers") : getter(props, "".concat(modelName, "Modifiers")) || getter(props, "".concat(camelize(modelName), "Modifiers")) || getter(props, "".concat(hyphenate(modelName), "Modifiers"));
};
function emit$1(instance, event) {
  for (var _len17 = arguments.length, rawArgs = new Array(_len17 > 2 ? _len17 - 2 : 0), _key27 = 2; _key27 < _len17; _key27++) {
    rawArgs[_key27 - 2] = arguments[_key27];
  }
  return baseEmit(instance, instance.vnode.props || EMPTY_OBJ, defaultPropGetter, event, ...rawArgs);
}
function baseEmit(instance, props, getter, event) {
  if (instance.isUnmounted) return;
  for (var _len18 = arguments.length, rawArgs = new Array(_len18 > 4 ? _len18 - 4 : 0), _key28 = 4; _key28 < _len18; _key28++) {
    rawArgs[_key28 - 4] = arguments[_key28];
  }
  {
    var {
      emitsOptions,
      propsOptions
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !propsOptions[0] || !(toHandlerKey(camelize(event)) in propsOptions[0])) {
          warn$1("Component emitted event \"".concat(event, "\" but it is neither declared in the emits option nor as an \"").concat(toHandlerKey(camelize(event)), "\" prop."));
        }
      } else {
        var validator = emitsOptions[event];
        if (isFunction(validator)) {
          var isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1("Invalid event arguments: event validation failed for event \"".concat(event, "\"."));
          }
        }
      }
    }
  }
  var args = rawArgs;
  var isModelListener = event.startsWith("update:");
  var modifiers = isModelListener && getModelModifiers(props, event.slice(7), getter);
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map(a => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    var lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && getter(props, toHandlerKey(lowerCaseEvent))) {
      warn$1("Event \"".concat(lowerCaseEvent, "\" is emitted in component ").concat(formatComponentName(instance, instance.type), " but the handler is registered for \"").concat(event, "\". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use \"").concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
    }
  }
  var handlerName;
  var handler = getter(props, handlerName = toHandlerKey(event)) ||
  // also try camelCase event handler (#2249)
  getter(props, handlerName = toHandlerKey(camelize(event)));
  if (!handler && isModelListener) {
    handler = getter(props, handlerName = toHandlerKey(hyphenate(event)));
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  var onceHandler = getter(props, handlerName + "Once");
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
function defaultPropGetter(props, key) {
  return props[key];
}
function normalizeEmitsOptions$1(comp, appContext) {
  var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cache = appContext.emitsCache;
  var cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  var raw = comp.emits;
  var normalized = {};
  var hasExtends = false;
  if (!isFunction(comp)) {
    var extendEmits = raw2 => {
      var normalizedFromExtend = normalizeEmitsOptions$1(raw2, appContext, true);
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
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach(key => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
var accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  var {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  var prev = setCurrentRenderingInstance(instance);
  var result;
  var fallthroughAttrs;
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      var proxyToUse = withProxy || proxy;
      var thisProxy = !!("development" !== "production") && setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1("Property '".concat(String(key), "' was accessed via 'this'. Avoid using 'this' in templates."));
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, !!("development" !== "production") ? shallowReadonly(props) : props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      var render2 = Component;
      if (!!("development" !== "production") && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(!!("development" !== "production") ? shallowReadonly(props) : props, !!("development" !== "production") ? {
        get attrs() {
          markAttrsAccessed();
          return shallowReadonly(attrs);
        },
        slots,
        emit
      } : {
        attrs,
        slots,
        emit
      }) : render2(!!("development" !== "production") ? shallowReadonly(props) : props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment$1);
  }
  var root = result;
  var setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
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
        root = cloneVNode(root, fallthroughAttrs, false, true);
      } else if (!accessedAttrs && root.type !== Comment$1) {
        var allAttrs = Object.keys(attrs);
        var eventAttrs = [];
        var extraAttrs = [];
        for (var i = 0, l = allAttrs.length; i < l; i++) {
          var key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1("Extraneous non-props attributes (".concat(extraAttrs.join(", "), ") were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes."));
        }
        if (eventAttrs.length) {
          warn$1("Extraneous non-emits event listeners (".concat(eventAttrs.join(", "), ") were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the \"emits\" option."));
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$1("Runtime directive used on component with non-element root node. The directives will not function as intended.");
    }
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1("Component inside <Transition> renders non-element root node that cannot be animated.");
    }
    setTransitionHooks(root, vnode.transition);
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
var getChildRoot = vnode => {
  var rawChildren = vnode.children;
  var dynamicChildren = vnode.dynamicChildren;
  var childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  var index = rawChildren.indexOf(childRoot);
  var dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  var setRoot = updatedRoot => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var singleRoot;
  for (var i = 0; i < children.length; i++) {
    var _child4 = children[i];
    if (isVNode(_child4)) {
      if (_child4.type !== Comment$1 || _child4.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = _child4;
          if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
var getFunctionalFallthrough = attrs => {
  var res;
  for (var key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  var res = {};
  for (var key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
var isElementRoot = vnode => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment$1;
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
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
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
      for (var i = 0; i < dynamicProps.length; i++) {
        var key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
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
  for (var i = 0; i < nextKeys.length; i++) {
    var key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl(_ref17, el) {
  var {
    vnode,
    parent
  } = _ref17;
  while (parent && !parent.vapor) {
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
var isSuspense = type => type.__isSuspense;
var suspenseId = 0;
var SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals);
    } else {
      if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
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
var Suspense = SuspenseImpl;
function triggerEvent(vnode, name) {
  var eventListener = vnode.props && vnode.props[name];
  if (isFunction(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
  var {
    p: patch,
    o: {
      createElement
    }
  } = rendererInternals;
  var hiddenContainer = createElement("div", container);
  var suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals);
  patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds);
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(null, vnode.ssFallback, container, anchor, parentComponent, null,
    // fallback tree will not have suspense context
    namespace, slotScopeIds);
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, _ref18) {
  var {
    p: patch,
    um: unmount,
    o: {
      createElement
    }
  } = _ref18;
  var suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  var newBranch = n2.ssContent;
  var newFallback = n2.ssFallback;
  var {
    activeBranch,
    pendingBranch,
    isInFallback,
    isHydrating
  } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        if (!isHydrating) {
          patch(activeBranch, newFallback, container, anchor, parentComponent, null,
          // fallback tree will not have suspense context
          namespace, slotScopeIds, optimized);
          setActiveBranch(suspense, newFallback);
        }
      }
    } else {
      suspense.pendingId = suspenseId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div", container);
      if (isInFallback) {
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(activeBranch, newFallback, container, anchor, parentComponent, null,
          // fallback tree will not have suspense context
          namespace, slotScopeIds, optimized);
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
        suspense.resolve(true);
      } else {
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      if (newBranch.shapeFlag & 512) {
        suspense.pendingId = newBranch.component.suspenseId;
      } else {
        suspense.pendingId = suspenseId++;
      }
      patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        var {
          timeout,
          pendingId
        } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
var hasWarned = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals) {
  var isHydrating = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  if (!hasWarned) {
    hasWarned = true;
    console[console.info ? "info" : "log"]("<Suspense> is an experimental feature and its API will likely change.");
  }
  var {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: {
      parentNode,
      remove
    }
  } = rendererInternals;
  var parentSuspenseId;
  var isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense && parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  var timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
  {
    assertNumber(timeout, "Suspense timeout");
  }
  var initialAnchor = anchor;
  var suspense = {
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
    pendingBranch: null,
    isInFallback: !isHydrating,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve() {
      var resume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      {
        if (!resume && !suspense.pendingBranch) {
          throw new Error("suspense.resolve() is called without a pending branch.");
        }
        if (suspense.isUnmounted) {
          throw new Error("suspense.resolve() is called on an already unmounted suspense boundary.");
        }
      }
      var {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2
      } = suspense;
      var delayEnter = false;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(pendingBranch, container2, anchor === initialAnchor ? next(activeBranch) : anchor, 0, parentComponent2);
              queuePostFlushCb(effects);
            }
          };
        }
        if (activeBranch) {
          if (parentNode(activeBranch.el) === container2) {
            anchor = next(activeBranch);
          }
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor, 0, parentComponent2);
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      var parent = suspense.parent;
      var hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor && !delayEnter) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      var {
        vnode: vnode2,
        activeBranch,
        parentComponent: parentComponent2,
        container: container2,
        namespace: namespace2
      } = suspense;
      triggerEvent(vnode2, "onFallback");
      var anchor2 = next(activeBranch);
      var mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(null, fallbackVNode, container2, anchor2, parentComponent2, null,
        // fallback tree will not have suspense context
        namespace2, slotScopeIds, optimized);
        setActiveBranch(suspense, fallbackVNode);
      };
      var delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(activeBranch, parentComponent2, null,
      // no suspense so unmount hooks fire now
      true
      // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type, parentComponent);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect, optimized2) {
      var isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      var hydratedEl = instance.vnode.el;
      instance.asyncDep.catch(err => {
        handleError(err, instance, 0);
      }).then(asyncSetupResult => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        var {
          vnode: vnode2
        } = instance;
        {
          pushWarningContext(vnode2);
        }
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        var placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(instance, vnode2,
        // component may have been moved before resolve.
        // if this is not a hydration, instance.subTree will be the comment
        // placeholder.
        parentNode(hydratedEl || instance.subTree.el),
        // anchor will not be used if this is hydration, so only need to
        // consider the comment placeholder case.
        hydratedEl ? null : next(instance.subTree), suspense, namespace, optimized2);
        if (placeholder) {
          remove(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        {
          popWarningContext();
        }
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(suspense.activeBranch, parentComponent, parentSuspense2, doRemove);
      }
      if (suspense.pendingBranch) {
        unmount(suspense.pendingBranch, parentComponent, parentSuspense2, doRemove);
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  var suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode,
  // eslint-disable-next-line no-restricted-globals
  document.createElement("div"), null, namespace, slotScopeIds, optimized, rendererInternals, true);
  var result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  var {
    shapeFlag,
    children
  } = vnode;
  var isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment$1);
}
function normalizeSuspenseSlot(s) {
  var block;
  if (isFunction(s)) {
    var trackBlock = isBlockTreeEnabled && s._c;
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
  if (isArray$1(s)) {
    var singleChild = filterSingleRoot(s);
    if (!singleChild && s.filter(child => child !== NULL_DYNAMIC_COMPONENT).length > 0) {
      warn$1("<Suspense> slots expect a single root node.");
    }
    s = singleChild;
  }
  s = normalizeVNode(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter(c => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  var {
    vnode,
    parentComponent
  } = suspense;
  var el = branch.el;
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
  var suspensible = vnode.props && vnode.props.suspensible;
  return suspensible != null && suspensible !== false;
}
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment$1 = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var VaporSlot = Symbol.for("v-vps");
var blockStack = [];
var currentBlock = null;
function openBlock() {
  var disableTracking = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  var inVOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && n1.component) {
    var dirtyInstances = hmrDirtyComponents.get(n2.type);
    if (dirtyInstances && dirtyInstances.has(n1.component)) {
      n1.shapeFlag &= -257;
      n2.shapeFlag &= -513;
      return false;
    }
  }
  return n1.type === n2.type && n1.key === n2.key;
}
var vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}
var createVNodeWithArgsTransform = function () {
  for (var _len19 = arguments.length, args = new Array(_len19), _key29 = 0; _key29 < _len19; _key29++) {
    args[_key29] = arguments[_key29];
  }
  return _createVNode(...(vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args));
};
var normalizeKey = _ref19 => {
  var {
    key
  } = _ref19;
  return key != null ? key : null;
};
var normalizeRef = _ref20 => {
  var {
    ref,
    ref_key,
    ref_for
  } = _ref20;
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? {
    i: currentRenderingInstance,
    r: ref,
    k: ref_key,
    f: !!ref_for
  } : ref : null;
};
function createBaseVNode(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var shapeFlag = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : type === Fragment ? 0 : 1;
  var isBlockNode = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var needFullChildrenNormalization = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
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
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance,
    // fixed by xxxxxx
    hostInstance: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1("VNode created with invalid key (NaN). VNode type:", vnode.type);
  }
  if (isBlockTreeEnabled > 0 &&
  // avoid a block node from tracking itself
  !isBlockNode &&
  // has current parent block
  currentBlock && (
  // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  vnode.patchFlag > 0 || shapeFlag & 6) &&
  // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  if (type == "button") {
    if (vnode.props == null) vnode.props = {};
    if (!vnode.props["hoverClass"] && !vnode.props["hover-class"]) {
      vnode.props["hoverClass"] = "button-hover";
    }
  }
  return vnode;
}
var createVNode = createVNodeWithArgsTransform;
function _createVNode(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var isBlockNode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1("Invalid vnode type when creating vnode: ".concat(type, "."));
    }
    type = Comment$1;
  }
  if (isVNode(type)) {
    var cloned = cloneVNode(type, props, true
    /* mergeRef: true */);
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
    cloned.patchFlag = -2;
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
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle$1(style);
    }
  }
  var shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", "\nComponent that was made reactive: ", type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps) {
  var mergeRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cloneTransition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var {
    props,
    ref,
    patchFlag,
    children,
    transition
  } = vnode;
  var mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  var cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ?
    // #2078 in the case of <component :is="vnode" ref="extra"/>
    // if the vnode itself already has a ref, cloneVNode will need to merge
    // the refs so the single vnode can be set on multiple refs
    mergeRef && ref ? isArray$1(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetStart: vnode.targetStart,
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
    // fixed by xxxxxx
    hostInstance: vnode.hostInstance,
    dirs: vnode.dirs,
    transition,
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
  if (transition && cloneTransition) {
    setTransitionHooks(cloned, transition.clone(cloned));
  }
  return cloned;
}
function deepCloneVNode(vnode) {
  var cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : " ";
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  var vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var asBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return asBlock ? (openBlock(), createBlock(Comment$1, null, text)) : createVNode(Comment$1, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment$1);
  } else if (isArray$1(child)) {
    return createVNode(Fragment, null,
    // #3666, avoid reference pollution when reusing vnode
    child.slice());
  } else if (isVNode(child)) {
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
  } else if (isArray$1(children)) {
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
      if (!slotFlag && !isInternalObject(children)) {
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
  for (var i = 0; i < arguments.length; i++) {
    var toMerge = i < 0 || arguments.length <= i ? undefined : arguments[i];
    for (var key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle$1([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        var existing = ret[key];
        var incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode) {
  var prevVNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
var currentInstance = null;
var getCurrentGenericInstance = () => currentInstance || currentRenderingInstance;
var getCurrentInstance = () => currentInstance && !currentInstance.vapor ? currentInstance : currentRenderingInstance;
var isInSSRComponentSetup = false;
var setInSSRSetupState;
var internalSetCurrentInstance;
{
  internalSetCurrentInstance = i => {
    currentInstance = i;
  };
  setInSSRSetupState = v => {
    isInSSRComponentSetup = v;
  };
}
var setCurrentInstance = instance => {
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
var simpleSetCurrentInstance = (i, unset) => {
  currentInstance = i;
  if (unset) {
    unset.scope.off();
  } else if (i) {
    i.scope.on();
  }
};
var emptyAppContext = createAppContext();
var uid = 0;
function nextUid() {
  return uid++;
}
function createComponentInstance(vnode, parent, suspense) {
  var type = vnode.type;
  var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  var instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    // fixed by xxxxxx 页面的vnode会多一个__page_container__属性，通过它来判断
    // @ts-expect-error
    renderer:
    // @ts-expect-error
    type.mpType === "app" ? "app" :
    // @ts-expect-error
    vnode.__page_container__ ? "page" : "component",
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(true
    /* detached */),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions$1(type, appContext),
    emitsOptions: normalizeEmitsOptions$1(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: null,
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
    sp: null,
    // fixed by xxxxxx
    $waitNativeRender(fn) {
      var proxy = this.proxy;
      var document = proxy && proxy.$nativePage && proxy.$nativePage.document;
      if (document) {
        document.waitNativeRender(fn);
      } else {
        fn();
      }
    }
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
function validateComponentName(name, _ref21) {
  var {
    isNativeTag
  } = _ref21;
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
function setupComponent(instance) {
  var isSSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var optimized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  isSSR && setInSSRSetupState(isSSR);
  var {
    props,
    children,
    vi
  } = instance.vnode;
  var isStateful = isStatefulComponent(instance);
  if (vi) {
    vi(instance);
  } else {
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
  }
  var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  var Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      var names = Object.keys(Component.components);
      for (var i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      var _names = Object.keys(Component.directives);
      for (var _i4 = 0; _i4 < _names.length; _i4++) {
        validateDirectiveName(_names[_i4]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1("\"compilerOptions\" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.");
    }
  }
  instance.accessCache = /* @__PURE__ */Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  {
    exposePropsOnRenderContext(instance);
  }
  var {
    setup
  } = Component;
  if (setup) {
    pauseTracking();
    var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    var reset = setCurrentInstance(instance);
    var setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    var isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then(resolvedResult => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch(e => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          var name = (_a = Component.name) != null ? _a : "Anonymous";
          warn$1("Component <".concat(name, ">: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered."));
        }
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
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1("setup() should not return VNodes directly - return a render function instead.");
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1("setup() should return an object. Received: ".concat(setupResult === null ? "null" : typeof setupResult));
  }
  finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
function registerRuntimeCompiler(_compile) {
  compile = _compile;
  installWithProxy = i => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
}
var isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  var Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      var template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        {
          startMeasure(instance, "compile");
        }
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
        {
          endMeasure(instance, "compile");
        }
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
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
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (!compile && Component.template) {
      warn$1("Component provided template option but runtime compilation is not supported in this build of Vue." + " Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".");
    } else {
      warn$1("Component is missing template or render function: ", Component);
    }
  }
}
var attrsProxyHandlers = {
  get(target, key) {
    markAttrsAccessed();
    track(target, "get", "");
    return target[key];
  },
  set() {
    warn$1("setupContext.attrs is readonly.");
    return false;
  },
  deleteProperty() {
    warn$1("setupContext.attrs is readonly.");
    return false;
  }
};
function getSlotsProxy(instance) {
  return new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  {
    var attrsProxy;
    var slotsProxy;
    return Object.freeze({
      get attrs() {
        return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
      },
      get slots() {
        return slotsProxy || (slotsProxy = getSlotsProxy(instance));
      },
      get emit() {
        return function (event) {
          for (var _len20 = arguments.length, args = new Array(_len20 > 1 ? _len20 - 1 : 0), _key30 = 1; _key30 < _len20; _key30++) {
            args[_key30 - 1] = arguments[_key30];
          }
          return instance.emit(event, ...args);
        };
      },
      expose: exposed => expose(instance, exposed)
    });
  }
}
function expose(instance, exposed) {
  {
    if (instance.exposed) {
      warn$1("expose() should be called only once per setup().");
    }
    if (exposed != null) {
      var exposedType = typeof exposed;
      if (exposedType === "object") {
        if (isArray$1(exposed)) {
          exposedType = "array";
        } else if (isRef(exposed)) {
          exposedType = "ref";
        }
      }
      if (exposedType !== "object") {
        warn$1("expose() should be passed a plain object, received ".concat(exposedType, "."));
      }
    }
  }
  instance.exposed = exposed || {};
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component) {
  var includeInferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component) {
  var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var name = getComponentName(Component);
  if (!name && Component.__file) {
    var match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    var inferFromRegistry = registry => {
      for (var key in registry) {
        if (registry[key] === Component) {
          return key;
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
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  var l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
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
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  var vueStyle = {
    style: "color:#3ba776"
  };
  var numberStyle = {
    style: "color:#1677ff"
  };
  var stringStyle = {
    style: "color:#f5222d"
  };
  var keywordStyle = {
    style: "color:#eb2f96"
  };
  var formatter = {
    __vue_custom_formatter: true,
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, "VueInstance"];
      } else if (isRef(obj)) {
        pauseTracking();
        var value = obj.value;
        resetTracking();
        return ["div", {}, ["span", vueStyle, genRefFlag(obj)], "<", formatValue(value), ">"];
      } else if (isReactive(obj)) {
        return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"], "<", formatValue(obj), ">".concat(isReadonly(obj) ? " (readonly)" : "")];
      } else if (isReadonly(obj)) {
        return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"], "<", formatValue(obj), ">"];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return ["div", {}, ...formatInstance(obj.$)];
      }
    }
  };
  function formatInstance(instance) {
    var blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    var computed = extractKeys(instance, "computed");
    if (computed) {
      blocks.push(createInstanceBlock("computed", computed));
    }
    var injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push(["div", {}, ["span", {
      style: keywordStyle.style + ";opacity:0.66"
    }, "$ (internal): "], ["object", {
      object: instance
    }]]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return ["div", {
      style: "line-height:1.25em;margin-bottom:0.6em"
    }, ["div", {
      style: "color:#476582"
    }, type], ["div", {
      style: "padding-left:1.25em"
    }, ...Object.keys(target).map(key => {
      return ["div", {}, ["span", keywordStyle, key + ": "], formatValue(target[key], false)];
    })]];
  }
  function formatValue(v) {
    var asRaw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", {
        object: asRaw ? toRaw(v) : v
      }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    var Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    var extracted = {};
    for (var key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    var opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return "ShallowRef";
    }
    if (v.effect) {
      return "ComputedRef";
    }
    return "Ref";
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
function withMemo(memo, render, cache, index) {
  var cached = cache[index];
  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }
  var ret = render();
  ret.memo = memo.slice();
  ret.cacheIndex = index;
  return cache[index] = ret;
}
function isMemoSame(cached, memo) {
  var prev = cached.memo;
  if (prev.length != memo.length) {
    return false;
  }
  for (var i = 0; i < prev.length; i++) {
    if (hasChanged(prev[i], memo[i])) {
      return false;
    }
  }
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }
  return true;
}
var version = "3.5.14";
var warn = warn$1;
var ErrorTypeStrings = ErrorTypeStrings$1;
var devtools = devtools$1;
var setDevtoolsHook = setDevtoolsHook$1;
var ssrUtils = null;
var resolveFilter = null;
var compatUtils = null;
var DeprecationTypes = null;

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createTextNode(doc) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return doc.createTextNode(value);
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createComment(doc, data) {
  return doc.createComment(data);
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function child(node) {
  return node.firstChild;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function nthChild(node, i) {
  return node.childNodes[i];
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function next(node) {
  return node.nextSibling;
}
var insertionParent;
var insertionAnchor;
function setInsertionState(parent, anchor) {
  insertionParent = parent;
  insertionAnchor = anchor;
}
function resetInsertionState() {
  insertionParent = insertionAnchor = void 0;
}
var NODE_EXT_STYLES = "styles";
var NODE_EXT_PARENT_STYLES = "parentStyles";
var NODE_EXT_CLASS_STYLE = "classStyle";
var NODE_EXT_STYLE = "style";
var NODE_EXT_IS_TEXT_NODE = "isTextNode";
var NODE_EXT_CHILD_NODE = "childNode";
var NODE_EXT_PARENT_NODE = "parentNode";
var NODE_EXT_CHILD_NODES = "childNodes";
function setNodeExtraData(el, name, value) {
  el.ext.set(name, value);
}
function getNodeExtraData(el, name) {
  return el.ext.get(name);
}
function getExtraStyles(el) {
  return getNodeExtraData(el, NODE_EXT_STYLES);
}
function setExtraStyles(el, styles) {
  setNodeExtraData(el, NODE_EXT_STYLES, styles);
}
function getExtraParentStyles(el) {
  return getNodeExtraData(el, NODE_EXT_PARENT_STYLES);
}
function setExtraParentStyles(el, styles) {
  setNodeExtraData(el, NODE_EXT_PARENT_STYLES, styles);
}
function getExtraClassStyle(el) {
  return getNodeExtraData(el, NODE_EXT_CLASS_STYLE);
}
function setExtraClassStyle(el, classStyle) {
  setNodeExtraData(el, NODE_EXT_CLASS_STYLE, classStyle);
}
function getExtraStyle(el) {
  return getNodeExtraData(el, NODE_EXT_STYLE);
}
function setExtraStyle(el, style) {
  setNodeExtraData(el, NODE_EXT_STYLE, style);
}
function isCommentNode(node) {
  return node.nodeName == "#comment";
}
function isExtraTextNode(el) {
  return getNodeExtraData(el, NODE_EXT_IS_TEXT_NODE) === true;
}
function setExtraIsTextNode(el, isTextNode) {
  setNodeExtraData(el, NODE_EXT_IS_TEXT_NODE, isTextNode);
}
function isTextElement(value) {
  return value instanceof UniTextElement;
}
function getExtraChildNode(el) {
  return getNodeExtraData(el, NODE_EXT_CHILD_NODE);
}
function setExtraChildNode(el, childNode) {
  setNodeExtraData(el, NODE_EXT_CHILD_NODE, childNode);
}
function setExtraParentNode(el, parentNode) {
  setNodeExtraData(el, NODE_EXT_PARENT_NODE, parentNode);
}
function getExtraChildNodes(el) {
  return getNodeExtraData(el, NODE_EXT_CHILD_NODES);
}
function setExtraChildNodes(el, childNodes) {
  setNodeExtraData(el, NODE_EXT_CHILD_NODES, childNodes);
}
function getExtraParentNode(el) {
  return getNodeExtraData(el, NODE_EXT_PARENT_NODE);
}
function each(obj) {
  return Object.keys(obj);
}
function useCssStyles(componentStyles) {
  var normalized = {};
  if (!isArray$1(componentStyles)) {
    return normalized;
  }
  componentStyles.forEach(componentStyle => {
    each(componentStyle).forEach(className => {
      var parentStyles = componentStyle[className];
      var normalizedStyles = normalized[className] || (normalized[className] = {});
      each(parentStyles).forEach(parentSelector => {
        var parentStyle = parentStyles[parentSelector];
        var normalizedStyle = normalizedStyles[parentSelector] || (normalizedStyles[parentSelector] = {});
        each(parentStyle).forEach(name => {
          if (name[0] === "!") {
            normalizedStyle[name] = parentStyle[name];
            delete normalizedStyle[name.slice(1)];
          } else {
            if (!hasOwn(normalizedStyle, "!" + name)) {
              normalizedStyle[name] = parentStyle[name];
            }
          }
        });
      });
    });
  });
  return normalized;
}
function hasClass(calssName, el) {
  var classList = el && el.classList;
  return classList && classList.includes(calssName);
}
var TYPE_RE = /[+~> ]$/;
var PROPERTY_PARENT_NODE = "parentNode";
var PROPERTY_PREVIOUS_SIBLING = "previousSibling";
function isMatchParentSelector(parentSelector, el) {
  var classArray = parentSelector.split(".");
  for (var i = classArray.length - 1; i > 0; i--) {
    var item = classArray[i];
    var type = item[item.length - 1];
    var className = item.replace(TYPE_RE, "");
    if (type === "~" || type === " ") {
      var property = type === "~" ? PROPERTY_PREVIOUS_SIBLING : PROPERTY_PARENT_NODE;
      while (el) {
        el = el[property];
        if (hasClass(className, el)) {
          break;
        }
      }
      if (!el) {
        return false;
      }
    } else {
      if (type === ">") {
        el = el && el[PROPERTY_PARENT_NODE];
      } else if (type === "+") {
        el = el && el[PROPERTY_PREVIOUS_SIBLING];
      }
      if (!hasClass(className, el)) {
        return false;
      }
    }
  }
  return true;
}
var WEIGHT_IMPORTANT = 1e3;
function parseClassName(_ref22, parentStyles, el) {
  var {
    styles,
    weights
  } = _ref22;
  each(parentStyles).forEach(parentSelector => {
    if (parentSelector && el) {
      if (!isMatchParentSelector(parentSelector, el)) {
        return;
      }
    }
    var classWeight = parentSelector.split(".").length;
    var style = parentStyles[parentSelector];
    each(style).forEach(name => {
      var value = style[name];
      var isImportant = name[0] === "!";
      if (isImportant) {
        name = name.slice(1);
      }
      var oldWeight = weights[name] || 0;
      var weight = classWeight + (isImportant ? WEIGHT_IMPORTANT : 0);
      if (weight >= oldWeight) {
        weights[name] = weight;
        styles.set(name, value);
      }
    });
  });
}
class ParseStyleContext {
  constructor() {
    this.styles = /* @__PURE__ */new Map();
    this.weights = {};
  }
}
function parseClassListWithStyleSheet(classList, stylesheet, parentStylesheets) {
  var el = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var context = new ParseStyleContext();
  classList.forEach(className => {
    var parentStyles = stylesheet && stylesheet[className];
    if (parentStyles) {
      parseClassName(context, parentStyles, el);
    }
  });
  if (parentStylesheets != null) {
    classList.forEach(className => {
      var parentStylesheet = (parentStylesheets || []).find(style => style[className] !== null);
      var parentStyles = parentStylesheet && parentStylesheet[className];
      if (parentStyles != null) {
        parseClassName(context, parentStyles, el);
      }
    });
  }
  return context;
}
function parseClassStyles(el) {
  var styles = getExtraStyles(el);
  var parentStyles = getExtraParentStyles(el);
  if (styles == null && parentStyles == null || el.classList.length == 0) {
    return new ParseStyleContext();
  }
  return parseClassListWithStyleSheet(el.classList, styles, parentStyles, el);
}
function parseClassList(classList, instance) {
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return parseClassListWithStyleSheet(classList, parseStyleSheet(instance), null, el).styles;
}
function parseStyleSheet(_ref23) {
  var {
    type,
    appContext,
    root
  } = _ref23;
  var component = type;
  var pageInstance = root;
  if (!pageInstance.componentStylesCache) {
    pageInstance.componentStylesCache = /* @__PURE__ */new Map();
  }
  var cache = pageInstance.componentStylesCache.get(component);
  if (!cache) {
    var __globalStyles = appContext.provides.__globalStyles;
    if (appContext && isArray$1(__globalStyles)) {
      appContext.provides.__globalStyles = useCssStyles(__globalStyles);
    }
    var styles = [];
    if (appContext && __globalStyles) {
      var globalStyles = isArray$1(__globalStyles) ? __globalStyles : [__globalStyles];
      styles.push(...globalStyles);
    }
    var page = root && root.type;
    if (page && component !== page && isArray$1(page.styles)) {
      styles.push(...page.styles);
    }
    if (isArray$1(component.styles)) {
      styles.push(...component.styles);
    }
    cache = useCssStyles(styles);
    pageInstance.componentStylesCache.set(component, cache);
  }
  return cache;
}
function extendMap(a, b) {
  b.forEach((value, key) => {
    a.set(key, value);
  });
  return a;
}
function toStyle(el, classStyle, classStyleWeights) {
  var res = extendMap(/* @__PURE__ */new Map(), classStyle);
  var style = getExtraStyle(el);
  if (style != null) {
    style.forEach((value, key) => {
      var weight = classStyleWeights[key];
      if (weight == null || weight < WEIGHT_IMPORTANT) {
        res.set(key, value);
      }
    });
  }
  return res;
}
var vShowOriginalDisplay = Symbol("_vod");
var vShowHidden = Symbol("_vsh");
var vShow = {
  beforeMount(el, _ref24, _ref25) {
    var {
      value
    } = _ref24;
    var {
      transition
    } = _ref25;
    el[vShowOriginalDisplay] = el.style.getPropertyValue("display") === "none" ? "" : "flex";
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay$1(el, value);
    }
  },
  mounted(el, _ref26, _ref27) {
    var {
      value
    } = _ref26;
    var {
      transition
    } = _ref27;
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, _ref28, _ref29) {
    var {
      value,
      oldValue
    } = _ref28;
    var {
      transition
    } = _ref29;
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay$1(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay$1(el, false);
        });
      }
    } else {
      setDisplay$1(el, value);
    }
  },
  beforeUnmount(el, _ref30) {
    var {
      value
    } = _ref30;
    setDisplay$1(el, value);
  }
};
function setDisplay$1(el, value) {
  el.style.setProperty("display", value ? el[vShowOriginalDisplay] : "none");
  el[vShowHidden] = !value;
}
function patchClass(el, pre, next) {
  var instance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!instance) {
    return;
  }
  var classList = next ? next.split(" ") : [];
  el.classList = classList;
  setExtraStyles(el, parseStyleSheet(instance));
  if (instance.parent != null && instance !== instance.root) {
    var isRootEl =
    // @ts-expect-error
    instance.block === el || instance.subTree && el === instance.subTree.el;
    if (isRootEl) {
      setExtraParentStyles(el, instance.parent.type.styles);
    }
  }
  updateClassStyles(el);
}
function updateClassStyles(el) {
  if (el.parentNode == null || isCommentNode(el)) {
    return;
  }
  if (getExtraClassStyle(el) == null) {
    setExtraClassStyle(el, /* @__PURE__ */new Map());
  }
  var oldClassStyle = getExtraClassStyle(el);
  oldClassStyle.forEach((_value, key) => {
    oldClassStyle.set(key, "");
  });
  var parseClassStylesResult = parseClassStyles(el);
  parseClassStylesResult.styles.forEach((value, key) => {
    oldClassStyle.set(key, value);
  });
  var styles = toStyle(el, oldClassStyle, parseClassStylesResult.weights);
  if (styles.size == 0) {
    return;
  }
  if (el[vShowHidden]) {
    styles.set("display", "none");
  }
  el.updateStyle(styles);
}
function updateChildrenClassStyle(el) {
  if (el !== null) {
    el.childNodes.forEach(child => {
      updateClassStyles(child);
      updateChildrenClassStyle(child);
    });
  }
}
class VaporFragment {
  constructor(nodes) {
    this.nodes = nodes;
  }
}
class DynamicFragment extends VaporFragment {
  // fixed by uts
  constructor(doc, anchorLabel) {
    super([]);
    this.anchor = anchorLabel ?
    // fixed by uts
    createComment(doc, anchorLabel) :
    // fixed by uts
    createTextNode(doc);
  }
  update(render) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : render;
    if (key === this.current) {
      return;
    }
    this.current = key;
    pauseTracking();
    var parent = this.anchor.parentNode;
    if (this.scope) {
      this.scope.stop();
      parent && remove(this.nodes, parent);
    }
    if (render) {
      this.scope = new EffectScope();
      this.nodes = this.scope.run(render) || [];
      if (parent) insert(this.nodes, parent, this.anchor);
    } else {
      this.scope = void 0;
      this.nodes = [];
    }
    if (this.fallback && !isValidBlock(this.nodes)) {
      parent && remove(this.nodes, parent);
      this.nodes = (this.scope || (this.scope = new EffectScope())).run(this.fallback) || [];
      parent && insert(this.nodes, parent, this.anchor);
    }
    resetTracking();
  }
}
function isFragment(val) {
  return val instanceof VaporFragment;
}
function isBlock(val) {
  return val instanceof UniElement || isArray$1(val) || isVaporComponent(val) || isFragment(val);
}
function isValidBlock(block) {
  if (block instanceof UniElement) {
    return !(block instanceof UniComment);
  } else if (isVaporComponent(block)) {
    return isValidBlock(block.block);
  } else if (isArray$1(block)) {
    return block.length > 0 && block.every(isValidBlock);
  } else {
    return isValidBlock(block.nodes);
  }
}
function insert(block, parent) {
  var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  anchor = anchor === 0 ? parent.firstChild : anchor;
  if (block instanceof UniElement) {
    {
      parent.insertBefore(block, anchor);
      if (parent.isConnected) {
        updateClassStyles(block);
        updateChildrenClassStyle(block);
      }
    }
  } else if (isVaporComponent(block)) {
    if (block.isMounted) {
      insert(block.block, parent, anchor);
    } else {
      mountComponent(block, parent, anchor);
    }
  } else if (isArray$1(block)) {
    for (var b of block) {
      insert(b, parent, anchor);
    }
  } else {
    if (block.insert) {
      block.insert(parent, anchor);
    } else {
      insert(block.nodes, parent, anchor);
    }
    if (block.anchor) insert(block.anchor, parent, anchor);
  }
}
function prepend(parent) {
  for (var _len21 = arguments.length, blocks = new Array(_len21 > 1 ? _len21 - 1 : 0), _key31 = 1; _key31 < _len21; _key31++) {
    blocks[_key31 - 1] = arguments[_key31];
  }
  var i = blocks.length;
  while (i--) {
    insert(blocks[i], parent, 0);
  }
}
function remove(block, parent) {
  if (block instanceof UniElement) {
    parent && parent.removeChild(block);
  } else if (isVaporComponent(block)) {
    unmountComponent(block, parent);
  } else if (isArray$1(block)) {
    for (var i = 0; i < block.length; i++) {
      remove(block[i], parent);
    }
  } else {
    if (block.remove) {
      block.remove(parent);
    } else {
      remove(block.nodes, parent);
    }
    if (block.anchor) remove(block.anchor, parent);
    if (block.scope) {
      block.scope.stop();
    }
  }
}
function normalizeBlock(block) {
  var nodes = [];
  if (block instanceof UniElement) {
    nodes.push(block);
  } else if (isArray$1(block)) {
    block.forEach(child => nodes.push(...normalizeBlock(child)));
  } else if (isVaporComponent(block)) {
    nodes.push(...normalizeBlock(block.block));
  } else {
    nodes.push(...normalizeBlock(block.nodes));
    block.anchor && nodes.push(block.anchor);
  }
  return nodes;
}
function normalizeEmitsOptions(comp) {
  var cached = comp.__emitsOptions;
  if (cached) return cached;
  var raw = comp.emits;
  if (!raw) return null;
  var normalized;
  if (isArray$1(raw)) {
    normalized = {};
    for (var key of raw) {
      normalized[key] = null;
    }
  } else {
    normalized = raw;
  }
  return comp.__emitsOptions = normalized;
}
function emit(instance, event) {
  for (var _len22 = arguments.length, rawArgs = new Array(_len22 > 2 ? _len22 - 2 : 0), _key32 = 2; _key32 < _len22; _key32++) {
    rawArgs[_key32 - 2] = arguments[_key32];
  }
  baseEmit(instance, instance.rawProps || EMPTY_OBJ, propGetter, event, ...rawArgs);
}
function propGetter(rawProps, key) {
  var dynamicSources = rawProps.$;
  if (dynamicSources) {
    var i = dynamicSources.length;
    while (i--) {
      var source = resolveSource(dynamicSources[i]);
      if (hasOwn(source, key)) return resolveSource(source[key]);
    }
  }
  return rawProps[key] && resolveSource(rawProps[key]);
}
function renderEffect(fn) {
  var noLifecycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var instance = currentInstance;
  var scope = getCurrentScope();
  if (!scope && !isVaporComponent(instance)) {
    warn("renderEffect called without active EffectScope or Vapor instance.");
  }
  var hasUpdateHooks = instance && (instance.bu || instance.u);
  var renderEffectFn = noLifecycle ? fn : () => {
    if (instance) {
      startMeasure(instance, "renderEffect");
    }
    var prev = currentInstance;
    simpleSetCurrentInstance(instance);
    if (scope) scope.on();
    if (hasUpdateHooks && instance.isMounted && !instance.isUpdating) {
      instance.isUpdating = true;
      instance.bu && invokeArrayFns(instance.bu);
      fn();
      queuePostFlushCb(() => {
        instance.isUpdating = false;
        instance.u && invokeArrayFns(instance.u);
      });
    } else {
      fn();
    }
    if (scope) scope.off();
    simpleSetCurrentInstance(prev, instance);
    if (instance) {
      startMeasure(instance, "renderEffect");
    }
  };
  var effect = new ReactiveEffect(renderEffectFn);
  var job = () => effect.dirty && effect.run();
  if (instance) {
    {
      effect.onTrack = instance.rtc ? e => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? e => invokeArrayFns(instance.rtg, e) : void 0;
    }
    job.i = instance;
    job.id = instance.uid;
  }
  effect.scheduler = () => queueJob(job);
  effect.run();
}
function resolveSource(source) {
  return isFunction(source) ? source() : source;
}
function getPropsProxyHandlers(comp) {
  if (comp.__propsHandlers) {
    return comp.__propsHandlers;
  }
  var propsOptions = normalizePropsOptions(comp)[0];
  var emitsOptions = normalizeEmitsOptions(comp);
  var isProp = propsOptions ? key => isString(key) && hasOwn(propsOptions, camelize(key)) : NO;
  var isAttr = propsOptions ? key => key !== "$" && !isProp(key) && !isEmitListener(emitsOptions, key) : YES;
  var getProp = (instance, key) => {
    if (key === "__v_isReactive") return true;
    if (!isProp(key)) return;
    var rawProps = instance.rawProps;
    var dynamicSources = rawProps.$;
    if (dynamicSources) {
      var i = dynamicSources.length;
      var source, isDynamic, rawKey;
      while (i--) {
        source = dynamicSources[i];
        isDynamic = isFunction(source);
        source = isDynamic ? source() : source;
        for (rawKey in source) {
          if (camelize(rawKey) === key) {
            return resolvePropValue(propsOptions, key, isDynamic ? source[rawKey] : source[rawKey](), instance, resolveDefault);
          }
        }
      }
    }
    for (var _rawKey in rawProps) {
      if (camelize(_rawKey) === key) {
        return resolvePropValue(propsOptions, key, rawProps[_rawKey](), instance, resolveDefault);
      }
    }
    return resolvePropValue(propsOptions, key, void 0, instance, resolveDefault, true);
  };
  var propsHandlers = propsOptions ? {
    get: (target, key) => getProp(target, key),
    has: (_, key) => isProp(key),
    ownKeys: () => Object.keys(propsOptions),
    getOwnPropertyDescriptor(target, key) {
      if (isProp(key)) {
        return {
          configurable: true,
          enumerable: true,
          get: () => getProp(target, key)
        };
      }
    }
  } : null;
  if (propsOptions) {
    Object.assign(propsHandlers, {
      set: propsSetDevTrap,
      deleteProperty: propsDeleteDevTrap
    });
  }
  var getAttr = (target, key) => {
    if (!isProp(key) && !isEmitListener(emitsOptions, key)) {
      return getAttrFromRawProps(target, key);
    }
  };
  var hasAttr = (target, key) => {
    if (isAttr(key)) {
      return hasAttrFromRawProps(target, key);
    } else {
      return false;
    }
  };
  var attrsHandlers = {
    get: (target, key) => getAttr(target.rawProps, key),
    has: (target, key) => hasAttr(target.rawProps, key),
    ownKeys: target => getKeysFromRawProps(target.rawProps).filter(isAttr),
    getOwnPropertyDescriptor(target, key) {
      if (hasAttr(target.rawProps, key)) {
        return {
          configurable: true,
          enumerable: true,
          get: () => getAttr(target.rawProps, key)
        };
      }
    }
  };
  {
    Object.assign(attrsHandlers, {
      set: propsSetDevTrap,
      deleteProperty: propsDeleteDevTrap
    });
  }
  return comp.__propsHandlers = [propsHandlers, attrsHandlers];
}
function getAttrFromRawProps(rawProps, key) {
  if (key === "$") return;
  var merged = key === "class" || key === "style" ? [] : void 0;
  var dynamicSources = rawProps.$;
  if (dynamicSources) {
    var i = dynamicSources.length;
    var source, isDynamic;
    while (i--) {
      source = dynamicSources[i];
      isDynamic = isFunction(source);
      source = isDynamic ? source() : source;
      if (hasOwn(source, key)) {
        var value = isDynamic ? source[key] : source[key]();
        if (merged) {
          merged.push(value);
        } else {
          return value;
        }
      }
    }
  }
  if (hasOwn(rawProps, key)) {
    if (merged) {
      merged.push(rawProps[key]());
    } else {
      return rawProps[key]();
    }
  }
  if (merged && merged.length) {
    return merged;
  }
}
function hasAttrFromRawProps(rawProps, key) {
  if (key === "$") return false;
  var dynamicSources = rawProps.$;
  if (dynamicSources) {
    var i = dynamicSources.length;
    while (i--) {
      var source = resolveSource(dynamicSources[i]);
      if (source && hasOwn(source, key)) {
        return true;
      }
    }
  }
  return hasOwn(rawProps, key);
}
function getKeysFromRawProps(rawProps) {
  var keys = [];
  for (var key in rawProps) {
    if (key !== "$") keys.push(key);
  }
  var dynamicSources = rawProps.$;
  if (dynamicSources) {
    var i = dynamicSources.length;
    var source;
    while (i--) {
      source = resolveSource(dynamicSources[i]);
      for (var _key33 in source) {
        keys.push(_key33);
      }
    }
  }
  return Array.from(new Set(keys));
}
function normalizePropsOptions(comp) {
  var cached = comp.__propsOptions;
  if (cached) return cached;
  var raw = comp.props;
  if (!raw) return EMPTY_ARR;
  var normalized = {};
  var needCastKeys = [];
  baseNormalizePropsOptions(raw, normalized, needCastKeys);
  return comp.__propsOptions = [normalized, needCastKeys];
}
function resolveDefault(factory, instance) {
  var prev = currentInstance;
  simpleSetCurrentInstance(instance);
  var res = factory.call(null, instance.props);
  simpleSetCurrentInstance(prev, instance);
  return res;
}
function hasFallthroughAttrs(comp, rawProps) {
  if (rawProps) {
    if (rawProps.$ || !comp.props) {
      return true;
    } else {
      var propsOptions = normalizePropsOptions(comp)[0];
      for (var key in rawProps) {
        if (!hasOwn(propsOptions, camelize(key))) {
          return true;
        }
      }
    }
  }
  return false;
}
function setupPropsValidation(instance) {
  var rawProps = instance.rawProps;
  if (!rawProps) return;
  renderEffect(() => {
    pushWarningContext(instance);
    validateProps(resolveDynamicProps(rawProps), instance.props, normalizePropsOptions(instance.type)[0]);
    popWarningContext();
  }, true
  /* noLifecycle */);
}
function resolveDynamicProps(props) {
  var mergedRawProps = {};
  for (var key in props) {
    if (key !== "$") {
      mergedRawProps[key] = props[key]();
    }
  }
  if (props.$) {
    for (var source of props.$) {
      var isDynamic = isFunction(source);
      var resolved = isDynamic ? source() : source;
      for (var _key34 in resolved) {
        var value = isDynamic ? resolved[_key34] : resolved[_key34]();
        if (_key34 === "class" || _key34 === "style") {
          var existing = mergedRawProps[_key34];
          if (isArray$1(existing)) {
            existing.push(value);
          } else {
            mergedRawProps[_key34] = [existing, value];
          }
        } else {
          mergedRawProps[_key34] = value;
        }
      }
    }
  }
  return mergedRawProps;
}
function propsSetDevTrap(_, key) {
  warn("Attempt to mutate prop ".concat(JSON.stringify(key), " failed. Props are readonly."));
  return true;
}
function propsDeleteDevTrap(_, key) {
  warn("Attempt to delete prop ".concat(JSON.stringify(key), " failed. Props are readonly."));
  return true;
}
var rawPropsProxyHandlers = {
  get: getAttrFromRawProps,
  has: hasAttrFromRawProps,
  ownKeys: getKeysFromRawProps,
  getOwnPropertyDescriptor(target, key) {
    if (hasAttrFromRawProps(target, key)) {
      return {
        configurable: true,
        enumerable: true,
        get: () => getAttrFromRawProps(target, key)
      };
    }
  }
};
function addEventListener$1(el, event, handler, options) {
  el.addEventListener(event, handler);
  return () => el.removeEventListener(event, handler);
}
function on(el, event, handler) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  addEventListener$1(el, event, handler);
  if (options.effect) {
    onEffectCleanup(() => {
      el.removeEventListener(event, handler);
    });
  }
}
function delegate(el, event, handler) {
  var key = "$evt".concat(event);
  var existing = el[key];
  if (existing) {
    if (isArray$1(existing)) {
      existing.push(handler);
    } else {
      el[key] = [existing, handler];
    }
  } else {
    el[key] = handler;
  }
}
var delegatedEvents = /* @__PURE__ */Object.create(null);
var delegateEvents = function (doc) {
  for (var _len23 = arguments.length, names = new Array(_len23 > 1 ? _len23 - 1 : 0), _key35 = 1; _key35 < _len23; _key35++) {
    names[_key35 - 1] = arguments[_key35];
  }
  for (var name of names) {
    if (!delegatedEvents[name]) {
      delegatedEvents[name] = true;
      doc.addEventListener(name, delegatedEventHandler);
    }
  }
};
var delegatedEventHandler = e => {
  var node = e.target;
  if (e.target !== node) {
    Object.defineProperty(e, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  while (node !== null) {
    var handlers = node["$evt".concat(e.type)];
    if (handlers) {
      if (isArray$1(handlers)) {
        for (var handler of handlers) {
          if (!node.disabled) {
            handler(e);
          }
        }
      } else {
        handlers(e);
      }
    }
    node = node.host && node.host !== node && node.host instanceof UniElement ? node.host : node.parentNode;
  }
};
function setDynamicEvents(el, events) {
  for (var name in events) {
    on(el, name, events[name], {
      effect: true
    });
  }
}
var processDeclaration = expand({
  type: "uvue"
}).Declaration;
function createDeclaration(prop, value) {
  var newValue = value + "";
  if (newValue.includes("!important")) {
    return {
      prop,
      value: newValue.replace(/\s*!important/, ""),
      important: true
    };
  }
  return {
    prop,
    value: newValue,
    important: false
  };
}
function normalizeStyle(name, value) {
  var decl = Object.assign({}, {
    replaceWith(newProps) {
      props = newProps;
    }
  }, createDeclaration(name, value));
  var props = [decl];
  processDeclaration(decl);
  return props;
}
function setStyle$1(expandRes) {
  var resArr = expandRes.map(item => {
    return [item.prop, item.value];
  });
  var resMap = new Map(resArr);
  return resMap;
}
function parseStyleDecl(prop, value) {
  var val = normalizeStyle(prop, value);
  var res = setStyle$1(val);
  return res;
}
function isSame(a, b) {
  return isString(a) && isString(b) || typeof a === "number" && typeof b === "number" ? a == b : a === b;
}
function patchStyle(el, prev, next) {
  if (!next) {
    return;
  }
  if (isString(next)) {
    next = parseStringStyle(next);
  }
  var batchedStyles = /* @__PURE__ */new Map();
  var isPrevObj = prev && !isString(prev);
  if (isPrevObj) {
    (function () {
      var classStyle = getExtraClassStyle(el);
      var style = getExtraStyle(el);
      for (var key in prev) {
        if (next[key] == null) {
          var _key = key.startsWith("--") ? key : camelize(key);
          var value = classStyle != null && classStyle.has(_key) ? classStyle.get(_key) : "";
          parseStyleDecl(_key, value).forEach((value2, key2) => {
            batchedStyles.set(key2, value2);
            style && style.delete(key2);
          });
        }
      }
      for (var _key36 in next) {
        var _value2 = next[_key36];
        var prevValue = prev[_key36];
        if (!isSame(prevValue, _value2)) {
          var _key37 = _key36.startsWith("--") ? _key36 : camelize(_key36);
          parseStyleDecl(_key37, _value2).forEach((value2, key2) => {
            batchedStyles.set(key2, value2);
            style && style.set(key2, value2);
          });
        }
      }
    })();
  } else {
    for (var key in next) {
      var value = next[key];
      var _key = key.startsWith("--") ? key : camelize(key);
      setBatchedStyles(batchedStyles, _key, value);
    }
    setExtraStyle(el, batchedStyles);
  }
  if (batchedStyles.size == 0) {
    return;
  }
  if (el[vShowHidden]) {
    batchedStyles.set("display", "none");
  }
  el.updateStyle(batchedStyles);
}
function setBatchedStyles(batchedStyles, key, value) {
  parseStyleDecl(key, value).forEach((value2, key2) => {
    batchedStyles.set(key2, value2);
  });
}
function shouldSetAsProp(el, key, value, isSVG) {
  return false;
}
var hasFallthroughKey = key => currentInstance.hasFallthrough && key in currentInstance.attrs;
function setProp(el, key, value) {
  if (key in el) {
    setDOMProp(el, key, value);
  } else {
    setAttr(el, key, value);
  }
}
function setAttr(el, key, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey(key)) {
    return;
  }
  if (key === "true-value") {
    el._trueValue = value;
  } else if (key === "false-value") {
    el._falseValue = value;
  }
  if (value !== el["$".concat(key)]) {
    el["$".concat(key)] = value;
    if (value != null) {
      el.setAttribute(key, value);
    } else {
      el.removeAttribute(key);
    }
  }
}
function setDOMProp(el, key, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey(key)) {
    return;
  }
  var prev = el[key];
  if (value === prev) {
    return;
  }
  var needRemove = false;
  if (value === "" || value == null) {
    var type = typeof prev;
    if (value == null && type === "string") {
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
    if (!needRemove) {
      warn("Failed setting prop \"".concat(key, "\" on <").concat(el.tagName.toLowerCase(), ">: value ").concat(value, " is invalid."), e);
    }
  }
  needRemove && el.removeAttribute(key);
}
function setClass(el, value) {
  patchClass(el, null, normalizeClass(value), getCurrentGenericInstance());
}
function setStyle(el, value) {
  if (el.$root) {
    setStyleIncremental(el, value);
  } else {
    var prev = el.$sty;
    value = el.$sty = normalizeStyle$1(value);
    patchStyle(el, prev, value);
  }
}
function setStyleIncremental(el, value) {
  var cacheKey = "$styi".concat(isApplyingFallthroughProps ? "$" : "");
  var prev = el[cacheKey];
  value = el[cacheKey] = isString(value) ? parseStringStyle(value) : normalizeStyle$1(value);
  patchStyle(el, prev, value);
  return value;
}
function setValue(el, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey("value")) {
    return;
  }
  el._value = value;
  var oldValue = el.tagName === "OPTION" ? el.getAttribute("value") : el.value;
  var newValue = value == null ? "" : value;
  if (oldValue !== newValue) {
    el.value = newValue;
  }
  if (value == null) {
    el.removeAttribute("value");
  }
}
function setText(el, value) {
  if (el.$txt !== value) {
    el.setAttribute("value", el.$txt = value);
  }
}
function setElementText(el, value) {
  if (el.$txt !== (value = toDisplayString(value))) {
    el.setAttribute("value", el.$txt = value);
  }
}
function setHtml(el, value) {
  value = value == null ? "" : value;
  if (el.$html !== value) ;
}
function setDynamicProps(el, args) {
  var props = args.length > 1 ? mergeProps(...args) : args[0];
  var cacheKey = "$dprops".concat(isApplyingFallthroughProps ? "$" : "");
  var prevKeys = el[cacheKey];
  if (prevKeys) {
    for (var key of prevKeys) {
      if (!(key in props)) {
        setDynamicProp(el, key, null);
      }
    }
  }
  for (var _key38 of el[cacheKey] = Object.keys(props)) {
    setDynamicProp(el, _key38, props[_key38]);
  }
}
function setDynamicProp(el, key, value) {
  if (key === "class") {
    setClass(el, value);
  } else if (key === "style") {
    setStyle(el, value);
  } else if (isOn(key)) {
    on(el, key[2].toLowerCase() + key.slice(3), value, {
      effect: true
    });
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp()) {
    if (key === "innerHTML") {
      setHtml(el, value);
    } else if (key === "textContent") {
      setElementText(el, value);
    } else if (key === "value" && canSetValueDirectly(el.tagName)) {
      setValue(el, value);
    } else {
      setDOMProp(el, key, value);
    }
  } else {
    setAttr(el, key, value);
  }
  return value;
}
var isOptimized = false;
function optimizePropertyLookup() {
  if (isOptimized) return;
  isOptimized = true;
  var proto = UniElement.prototype;
  proto.$evtclick = void 0;
  proto.$root = false;
  proto.$html = proto.$txt = proto.$cls = proto.$sty = "";
}
var dynamicSlotsProxyHandlers = {
  get: getSlot,
  has: (target, key) => !!getSlot(target, key),
  getOwnPropertyDescriptor(target, key) {
    var slot = getSlot(target, key);
    if (slot) {
      return {
        configurable: true,
        enumerable: true,
        value: slot
      };
    }
  },
  ownKeys(target) {
    var keys = Object.keys(target);
    var dynamicSources = target.$;
    if (dynamicSources) {
      keys = keys.filter(k => k !== "$");
      for (var source of dynamicSources) {
        if (isFunction(source)) {
          var slot = source();
          if (isArray$1(slot)) {
            for (var s of slot) {
              keys.push(String(s.name));
            }
          } else {
            keys.push(String(slot.name));
          }
        } else {
          keys.push(...Object.keys(source));
        }
      }
    }
    return keys;
  },
  set: NO,
  deleteProperty: NO
};
function getSlot(target, key) {
  if (key === "$") return;
  var dynamicSources = target.$;
  if (dynamicSources) {
    var i = dynamicSources.length;
    var source;
    while (i--) {
      source = dynamicSources[i];
      if (isFunction(source)) {
        var slot = source();
        if (slot) {
          if (isArray$1(slot)) {
            for (var s of slot) {
              if (String(s.name) === key) return s.fn;
            }
          } else if (String(slot.name) === key) {
            return slot.fn;
          }
        }
      } else if (hasOwn(source, key)) {
        return source[key];
      }
    }
  }
  if (hasOwn(target, key)) {
    return target[key];
  }
}
function createSlot(name, rawProps, fallback) {
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  var instance = currentInstance;
  var rawSlots = instance.rawSlots;
  var slotProps = rawProps ? new Proxy(rawProps, rawPropsProxyHandlers) : EMPTY_OBJ;
  var fragment;
  if (isRef(rawSlots._)) {
    fragment = instance.appContext.vapor.vdomSlot(rawSlots._, name, slotProps, instance, fallback);
  } else {
    fragment = new DynamicFragment("slot");
    var isDynamicName = isFunction(name);
    var _renderSlot = () => {
      var slot = getSlot(rawSlots, isFunction(name) ? name() : name);
      if (slot) {
        fragment.update(slot._bound || (slot._bound = () => {
          var slotContent = slot(slotProps);
          if (slotContent instanceof DynamicFragment) {
            slotContent.fallback = fallback;
          }
          return slotContent;
        }));
      } else {
        fragment.update(fallback);
      }
    };
    if (isDynamicName || rawSlots.$) {
      renderEffect(_renderSlot);
    } else {
      _renderSlot();
    }
  }
  if (_insertionParent) {
    insert(fragment, _insertionParent, _insertionAnchor);
  }
  return fragment;
}
function hmrRerender(instance) {
  var normalized = normalizeBlock(instance.block);
  var parent = normalized[0].parentNode;
  var anchor = normalized[normalized.length - 1].nextSibling;
  remove(instance.block, parent);
  var prev = currentInstance;
  simpleSetCurrentInstance(instance);
  pushWarningContext(instance);
  devRender(instance);
  popWarningContext();
  simpleSetCurrentInstance(prev, instance);
  insert(instance.block, parent, anchor);
}
function hmrReload(instance, newComp) {
  var normalized = normalizeBlock(instance.block);
  var parent = normalized[0].parentNode;
  var anchor = normalized[normalized.length - 1].nextSibling;
  unmountComponent(instance, parent);
  var prev = currentInstance;
  simpleSetCurrentInstance(instance.parent);
  var newInstance = createComponent(newComp, instance.rawProps, instance.rawSlots, instance.isSingleRoot);
  simpleSetCurrentInstance(prev, instance.parent);
  mountComponent(newInstance, parent, anchor);
}
function createComponent(component, rawProps, rawSlots, isSingleRoot) {
  var appContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : currentInstance && currentInstance.appContext || emptyContext;
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  if (appContext.vapor && !component.__vapor) {
    var frag = appContext.vapor.vdomMount(component, rawProps, rawSlots);
    if (_insertionParent) {
      insert(frag, _insertionParent, _insertionAnchor);
    }
    return frag;
  }
  if (isSingleRoot && component.inheritAttrs !== false && isVaporComponent(currentInstance) && currentInstance.hasFallthrough) {
    var attrs = currentInstance.attrs;
    if (rawProps) {
      (rawProps.$ || (rawProps.$ = [])).push(() => attrs);
    } else {
      rawProps = {
        $: [() => attrs]
      };
    }
  }
  var instance = new VaporComponentInstance(component, rawProps, rawSlots, appContext);
  {
    pushWarningContext(instance);
    startMeasure(instance, "init");
    instance.propsOptions = normalizePropsOptions(component);
    instance.emitsOptions = normalizeEmitsOptions(component);
  }
  var prev = currentInstance;
  simpleSetCurrentInstance(instance);
  pauseTracking();
  {
    setupPropsValidation(instance);
  }
  instance.ctx = {
    _: instance
  };
  instance.data = EMPTY_OBJ;
  instance.setupState = EMPTY_OBJ;
  instance.setupContext = null;
  instance.accessCache = /* @__PURE__ */Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  var setupFn = isFunction(component) ? component : component.setup;
  var setupResult = setupFn ? callWithErrorHandling(setupFn, instance, 0, [instance.props, instance]) || EMPTY_OBJ : EMPTY_OBJ;
  var {
    initNativePage,
    initFontFace
  } = appContext.config.uniX || {};
  if (initNativePage) {
    initNativePage(instance.proxy);
  }
  if (initFontFace) {
    initFontFace(instance.proxy);
  }
  if (!isBlock(setupResult)) {
    if (isFunction(component)) {
      warn("Functional vapor component must return a block directly.");
      instance.block = [];
    } else if (!component.render) {
      warn("Vapor component setup() returned non-block value, and has no render function.");
      instance.block = [];
    } else {
      instance.devtoolsRawSetupState = setupResult;
      instance.setupState = proxyRefs(setupResult);
      devRender(instance);
      if (component.__hmrId) {
        registerHMR(instance);
        instance.isSingleRoot = isSingleRoot;
        instance.hmrRerender = hmrRerender.bind(null, instance);
        instance.hmrReload = hmrReload.bind(null, instance);
      }
    }
  } else {
    if (!setupFn && component.render) {
      instance.block = callWithErrorHandling(component.render, instance, 1);
    } else {
      instance.block = setupResult;
    }
  }
  if (instance.hasFallthrough && component.inheritAttrs !== false && Object.keys(instance.attrs).length) {
    var el = getRootElement(instance);
    if (el) {
      renderEffect(() => {
        isApplyingFallthroughProps = true;
        setDynamicProps(el, [instance.attrs]);
        isApplyingFallthroughProps = false;
      });
    }
  }
  resetTracking();
  simpleSetCurrentInstance(prev, instance);
  {
    popWarningContext();
    endMeasure(instance, "init");
  }
  onScopeDispose(() => unmountComponent(instance), true);
  if (_insertionParent) {
    mountComponent(instance, _insertionParent, _insertionAnchor);
  }
  return instance;
}
var isApplyingFallthroughProps = false;
function devRender(instance) {
  instance.block = callWithErrorHandling(instance.type.render, instance, 1, [instance.setupState, instance.props, instance.emit, instance.attrs, instance.slots]) || [];
}
var emptyContext = {
  app: null,
  config: {},
  provides: /* @__PURE__ */Object.create(null)
};
class VaporComponentInstance {
  constructor(comp, rawProps, rawSlots, appContext) {
    this.vapor = true;
    this.uid = nextUid();
    this.type = comp;
    this.parent = currentInstance;
    this.root = currentInstance ? currentInstance.root : this;
    if (currentInstance) {
      this.appContext = currentInstance.appContext;
      this.provides = currentInstance.provides;
      this.ids = currentInstance.ids;
    } else {
      this.appContext = appContext || emptyContext;
      this.provides = Object.create(this.appContext.provides);
      this.ids = ["", 0, 0];
    }
    this.block = null;
    this.scope = new EffectScope(true);
    this.emit = emit.bind(null, this);
    this.expose = expose.bind(null, this);
    this.refs = EMPTY_OBJ;
    this.emitted = this.exposed = this.exposeProxy = this.propsDefaults = this.suspense = null;
    this.isMounted = this.isUnmounted = this.isUpdating = this.isDeactivated = false;
    this.rawProps = rawProps || EMPTY_OBJ;
    this.hasFallthrough = hasFallthroughAttrs(comp, rawProps);
    if (rawProps || comp.props) {
      var [propsHandlers, attrsHandlers] = getPropsProxyHandlers(comp);
      this.attrs = new Proxy(this, attrsHandlers);
      this.props = comp.props ? new Proxy(this, propsHandlers) : isFunction(comp) ? this.attrs : EMPTY_OBJ;
    } else {
      this.props = this.attrs = EMPTY_OBJ;
    }
    this.rawSlots = rawSlots || EMPTY_OBJ;
    this.slots = rawSlots ? rawSlots.$ ? new Proxy(rawSlots, dynamicSlotsProxyHandlers) : rawSlots : EMPTY_OBJ;
  }
  /**
   * Expose `getKeysFromRawProps` on the instance so it can be used in code
   * paths where it's needed, e.g. `useModel`
   */
  rawKeys() {
    return getKeysFromRawProps(this.rawProps);
  }
  // fixed by xxxxxx
  $waitNativeRender(fn) {}
}
function isVaporComponent(value) {
  return value instanceof VaporComponentInstance;
}
function createComponentWithFallback(doc, comp, rawProps, rawSlots, isSingleRoot) {
  if (!isString(comp)) {
    return createComponent(comp, rawProps, rawSlots, isSingleRoot);
  }
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  var el = doc.createElement(comp);
  el.$root = isSingleRoot;
  if (rawProps) {
    renderEffect(() => {
      setDynamicProps(el, [resolveDynamicProps(rawProps)]);
    });
  }
  if (rawSlots) {
    if (rawSlots.$) ;else {
      insert(getSlot(rawSlots, "default")(), el);
    }
  }
  if (_insertionParent) {
    insert(el, _insertionParent, _insertionAnchor);
  }
  return el;
}
function mountComponent(instance, parent, anchor) {
  {
    startMeasure(instance, "mount");
  }
  if (instance.bm) invokeArrayFns(instance.bm);
  insert(instance.block, parent, anchor);
  if (instance.m) queuePostFlushCb(() => invokeArrayFns(instance.m));
  instance.isMounted = true;
  {
    endMeasure(instance, "mount");
  }
}
function unmountComponent(instance, parentNode) {
  if (instance.isMounted && !instance.isUnmounted) {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    if (instance.bum) {
      invokeArrayFns(instance.bum);
    }
    instance.scope.stop();
    if (instance.um) {
      queuePostFlushCb(() => invokeArrayFns(instance.um));
    }
    instance.isUnmounted = true;
  }
  if (parentNode) {
    remove(instance.block, parentNode);
  }
}
function getExposed(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(markRaw(instance.exposed), {
      get: (target, key) => unref(target[key])
    }));
  }
}
function getRootElement(_ref31) {
  var {
    block
  } = _ref31;
  if (block instanceof UniElement) {
    return block;
  }
  if (block instanceof DynamicFragment) {
    var {
      nodes
    } = block;
    if (nodes instanceof UniElement && nodes.$root) {
      return nodes;
    }
  }
}
var _createApp;
var mountApp = (app, container) => {
  optimizePropertyLookup();
  if (container.nodeType === 1) {
    if (container.childNodes.length) {
      warn("mount target container is not empty and will be cleared.");
    }
    container.textContent = "";
  }
  var instance = createComponent(app._component, app._props, null, false, app._context);
  mountComponent(instance, container);
  flushOnAppMount();
  return instance;
};
var unmountApp = app => {
  unmountComponent(app._instance, app._container);
};
function prepareApp() {
  {
    initFeatureFlags();
  }
  var target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
}
function postPrepareApp(app) {
  {
    app.config.globalProperties = new Proxy({}, {
      set() {
        warn("app.config.globalProperties is not supported in vapor mode.");
        return false;
      }
    });
  }
}
var createVaporApp$1 = (comp, props) => {
  prepareApp();
  if (!_createApp) _createApp = createAppAPI(mountApp, unmountApp, getExposed);
  var app = _createApp(comp, props);
  postPrepareApp(app);
  return app;
};

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineVaporComponent(comp, extraOptions) {
  if (isFunction(comp)) {
    return /* @__PURE__ */(() => extend({
      name: comp.name
    }, extraOptions, {
      setup: comp,
      __vapor: true
    }))();
  }
  comp.__vapor = true;
  return comp;
}
var vaporInteropImpl = {
  mount(vnode, container, anchor, parentComponent) {
    var selfAnchor = vnode.el = vnode.anchor =
    // fixed by uts
    createTextNode(container.page.document);
    container.insertBefore(selfAnchor, anchor);
    var prev = currentInstance;
    simpleSetCurrentInstance(parentComponent);
    var propsRef = shallowRef(vnode.props);
    var slotsRef = shallowRef(vnode.children);
    var instance = vnode.component = createComponent(vnode.type, {
      $: [() => propsRef.value]
    }, {
      _: slotsRef
      // pass the slots ref
    });
    instance.rawPropsRef = propsRef;
    instance.rawSlotsRef = slotsRef;
    mountComponent(instance, container, selfAnchor);
    simpleSetCurrentInstance(prev);
    return instance;
  },
  update(n1, n2, shouldUpdate) {
    n2.component = n1.component;
    n2.el = n2.anchor = n1.anchor;
    if (shouldUpdate) {
      var instance = n2.component;
      instance.rawPropsRef.value = n2.props;
      instance.rawSlotsRef.value = n2.children;
    }
  },
  unmount(vnode, doRemove) {
    var container = doRemove ? vnode.anchor.parentNode : void 0;
    if (vnode.component) {
      unmountComponent(vnode.component, container);
    } else if (vnode.vb) {
      remove(vnode.vb, container);
    }
    remove(vnode.anchor, container);
  },
  /**
   * vapor slot in vdom
   */
  slot(n1, n2, container, anchor) {
    if (!n1) {
      var selfAnchor = n2.el = n2.anchor =
      // fixed by uts
      createTextNode(container.page.document);
      insert(selfAnchor, container, anchor);
      var {
        slot,
        fallback
      } = n2.vs;
      var propsRef = n2.vs.ref = shallowRef(n2.props);
      var slotBlock = slot(new Proxy(propsRef, vaporSlotPropsProxyHandler));
      insert(n2.vb = slotBlock, container, selfAnchor);
    } else {
      n2.el = n2.anchor = n1.anchor;
      n2.vb = n1.vb;
      (n2.vs.ref = n1.vs.ref).value = n2.props;
    }
  },
  move(vnode, container, anchor) {
    insert(vnode.vb || vnode.component, container, anchor);
    insert(vnode.anchor, container, anchor);
  }
};
var vaporSlotPropsProxyHandler = {
  get(target, key) {
    return target.value[key];
  },
  has(target, key) {
    return target.value[key];
  },
  ownKeys(target) {
    return Object.keys(target.value);
  }
};
var vaporSlotsProxyHandler = {
  get(target, key) {
    if (key === "_vapor") {
      return target;
    } else {
      return target[key];
    }
  }
};
function createVDOMComponent(internals, component, rawProps, rawSlots) {
  var frag = new VaporFragment([]);
  var vnode = createVNode(component, rawProps && new Proxy(rawProps, rawPropsProxyHandlers));
  var wrapper = new VaporComponentInstance({
    props: component.props
  }, rawProps, rawSlots);
  vnode.vi = instance => {
    instance.props = shallowReactive(wrapper.props);
    var attrs = instance.attrs = createInternalObject();
    for (var key in wrapper.attrs) {
      if (!isEmitListener(instance.emitsOptions, key)) {
        attrs[key] = wrapper.attrs[key];
      }
    }
    instance.slots = wrapper.slots === EMPTY_OBJ ? EMPTY_OBJ : new Proxy(wrapper.slots, vaporSlotsProxyHandler);
  };
  var isMounted = false;
  var parentInstance = currentInstance;
  var unmount = parentNode => {
    internals.umt(vnode.component, null, !!parentNode);
  };
  frag.insert = (parentNode, anchor) => {
    if (!isMounted) {
      internals.mt(vnode, parentNode, anchor, parentInstance, null, void 0, false);
      onScopeDispose(unmount, true);
      isMounted = true;
    } else {
      internals.m(vnode, parentNode, anchor, 2, parentInstance);
    }
  };
  frag.remove = unmount;
  return frag;
}
function renderVDOMSlot(internals, slotsRef, name, props, parentComponent, fallback) {
  var frag = new VaporFragment([]);
  var isMounted = false;
  var fallbackNodes;
  var oldVNode = null;
  frag.insert = (parentNode, anchor) => {
    if (!isMounted) {
      renderEffect(() => {
        var vnode = renderSlot(slotsRef.value, isFunction(name) ? name() : name, props);
        if (vnode.children.length) {
          if (fallbackNodes) {
            remove(fallbackNodes, parentNode);
            fallbackNodes = void 0;
          }
          internals.p(oldVNode, vnode, parentNode, anchor, parentComponent);
          oldVNode = vnode;
        } else {
          if (fallback && !fallbackNodes) {
            if (oldVNode) {
              internals.um(oldVNode, parentComponent, null, true);
            }
            insert(fallbackNodes = fallback(props), parentNode, anchor);
          }
          oldVNode = null;
        }
      });
      isMounted = true;
    } else {
      internals.m(oldVNode, parentNode, anchor, 2, parentComponent);
    }
    frag.remove = parentNode2 => {
      if (fallbackNodes) {
        remove(fallbackNodes, parentNode2);
      } else if (oldVNode) {
        internals.um(oldVNode, parentComponent, null);
      }
    };
  };
  return frag;
}
var vaporInteropPlugin = app => {
  var internals = ensureRenderer().internals;
  app._context.vapor = extend(vaporInteropImpl, {
    vdomMount: createVDOMComponent.bind(null, internals),
    vdomUnmount: internals.umt,
    vdomSlot: renderVDOMSlot.bind(null, internals)
  });
  var mount = app.mount;
  app.mount = function () {
    optimizePropertyLookup();
    return mount(...arguments);
  };
};
function createIf(doc, condition, b1, b2, once) {
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  var frag;
  if (once) {
    frag = condition() ? b1() : b2 ? b2() : [];
  } else {
    frag =
    // fixed by uts
    new DynamicFragment(doc, "if");
    renderEffect(() => frag.update(condition() ? b1 : b2));
  }
  if (_insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
}
class ForBlock extends VaporFragment {
  constructor(nodes, scope, item, key, index, renderKey) {
    super(nodes);
    this.scope = scope;
    this.itemRef = item;
    this.keyRef = key;
    this.indexRef = index;
    this.key = renderKey;
  }
}
var createFor = function (doc, src, renderItem, getKey) {
  var flags = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  var isMounted = false;
  var oldBlocks = [];
  var newBlocks;
  var parent;
  var parentAnchor =
  // fixed by uts
  createComment(doc, "for");
  var frag = new VaporFragment(oldBlocks);
  var instance = currentInstance;
  var canUseFastRemove = flags & 1;
  var isComponent = flags & 2;
  if (!instance) {
    warn("createFor() can only be used inside setup()");
  }
  var renderList = () => {
    var source = normalizeSource(src());
    var newLength = source.values.length;
    var oldLength = oldBlocks.length;
    newBlocks = new Array(newLength);
    pauseTracking();
    if (!isMounted) {
      isMounted = true;
      for (var i = 0; i < newLength; i++) {
        mount(source, i);
      }
    } else {
      parent = parent || parentAnchor.parentNode;
      if (!oldLength) {
        for (var _i5 = 0; _i5 < newLength; _i5++) {
          mount(source, _i5);
        }
      } else if (!newLength) {
        var doRemove = !canUseFastRemove;
        for (var _i6 = 0; _i6 < oldLength; _i6++) {
          unmount(oldBlocks[_i6], doRemove);
        }
        if (canUseFastRemove) {
          parent.textContent = "";
          parent.appendChild(parentAnchor);
        }
      } else if (!getKey) {
        var commonLength = Math.min(newLength, oldLength);
        for (var _i7 = 0; _i7 < commonLength; _i7++) {
          update(newBlocks[_i7] = oldBlocks[_i7], getItem(source, _i7)[0]);
        }
        for (var _i8 = oldLength; _i8 < newLength; _i8++) {
          mount(source, _i8);
        }
        for (var _i9 = newLength; _i9 < oldLength; _i9++) {
          unmount(oldBlocks[_i9]);
        }
      } else {
        var _i10 = 0;
        var e1 = oldLength - 1;
        var e2 = newLength - 1;
        while (_i10 <= e1 && _i10 <= e2) {
          if (tryPatchIndex(source, _i10)) {
            _i10++;
          } else {
            break;
          }
        }
        while (_i10 <= e1 && _i10 <= e2) {
          if (tryPatchIndex(source, _i10)) {
            e1--;
            e2--;
          } else {
            break;
          }
        }
        if (_i10 > e1) {
          if (_i10 <= e2) {
            var nextPos = e2 + 1;
            var anchor = nextPos < newLength ? normalizeAnchor(newBlocks[nextPos].nodes) : parentAnchor;
            while (_i10 <= e2) {
              mount(source, _i10, anchor);
              _i10++;
            }
          }
        } else if (_i10 > e2) {
          while (_i10 <= e1) {
            unmount(oldBlocks[_i10]);
            _i10++;
          }
        } else {
          var s1 = _i10;
          var s2 = _i10;
          var keyToNewIndexMap = /* @__PURE__ */new Map();
          for (_i10 = s2; _i10 <= e2; _i10++) {
            keyToNewIndexMap.set(getKey(...getItem(source, _i10)), _i10);
          }
          var j;
          var patched = 0;
          var toBePatched = e2 - s2 + 1;
          var moved = false;
          var maxNewIndexSoFar = 0;
          var newIndexToOldIndexMap = new Array(toBePatched).fill(0);
          for (_i10 = s1; _i10 <= e1; _i10++) {
            var prevBlock = oldBlocks[_i10];
            if (patched >= toBePatched) {
              unmount(prevBlock);
            } else {
              var newIndex = keyToNewIndexMap.get(prevBlock.key);
              if (newIndex == null) {
                unmount(prevBlock);
              } else {
                newIndexToOldIndexMap[newIndex - s2] = _i10 + 1;
                if (newIndex >= maxNewIndexSoFar) {
                  maxNewIndexSoFar = newIndex;
                } else {
                  moved = true;
                }
                update(newBlocks[newIndex] = prevBlock, ...getItem(source, newIndex));
                patched++;
              }
            }
          }
          var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : [];
          j = increasingNewIndexSequence.length - 1;
          for (_i10 = toBePatched - 1; _i10 >= 0; _i10--) {
            var nextIndex = s2 + _i10;
            var _anchor2 = nextIndex + 1 < newLength ? normalizeAnchor(newBlocks[nextIndex + 1].nodes) : parentAnchor;
            if (newIndexToOldIndexMap[_i10] === 0) {
              mount(source, nextIndex, _anchor2);
            } else if (moved) {
              if (j < 0 || _i10 !== increasingNewIndexSequence[j]) {
                insert(newBlocks[nextIndex].nodes, parent, _anchor2);
              } else {
                j--;
              }
            }
          }
        }
      }
    }
    frag.nodes = [oldBlocks = newBlocks];
    if (parentAnchor) {
      frag.nodes.push(parentAnchor);
    }
    resetTracking();
  };
  var needKey = renderItem.length > 1;
  var needIndex = renderItem.length > 2;
  var mount = function (source, idx) {
    var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : parentAnchor;
    var [item, key, index] = getItem(source, idx);
    var itemRef = shallowRef(item);
    var keyRef = needKey ? shallowRef(key) : void 0;
    var indexRef = needIndex ? shallowRef(index) : void 0;
    var nodes;
    var scope;
    if (isComponent) {
      nodes = renderItem(itemRef, keyRef, indexRef);
    } else {
      scope = new EffectScope();
      nodes = scope.run(() => renderItem(itemRef, keyRef, indexRef));
    }
    var block = newBlocks[idx] = new ForBlock(nodes, scope, itemRef, keyRef, indexRef, getKey && getKey(item, key, index));
    if (parent) insert(block.nodes, parent, anchor);
    return block;
  };
  var tryPatchIndex = (source, idx) => {
    var block = oldBlocks[idx];
    var [item, key, index] = getItem(source, idx);
    if (block.key === getKey(item, key, index)) {
      update(newBlocks[idx] = block, item);
      return true;
    }
  };
  var update = (_ref32, newItem, newKey, newIndex) => {
    var {
      itemRef,
      keyRef,
      indexRef
    } = _ref32;
    if (newItem !== itemRef.value) {
      itemRef.value = newItem;
    }
    if (keyRef && newKey !== void 0 && newKey !== keyRef.value) {
      keyRef.value = newKey;
    }
    if (indexRef && newIndex !== void 0 && newIndex !== indexRef.value) {
      indexRef.value = newIndex;
    }
  };
  var unmount = function (_ref33) {
    var {
      nodes,
      scope
    } = _ref33;
    var doRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    scope && scope.stop();
    doRemove && remove(nodes, parent);
  };
  if (flags & 4) {
    renderList();
  } else {
    renderEffect(renderList);
  }
  if (_insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
};
function createForSlots(rawSource, getSlot) {
  var source = normalizeSource(rawSource);
  var sourceLength = source.values.length;
  var slots = new Array(sourceLength);
  for (var i = 0; i < sourceLength; i++) {
    slots[i] = getSlot(...getItem(source, i));
  }
  return slots;
}
function normalizeSource(source) {
  var values = source;
  var needsWrap = false;
  var isReadonlySource = false;
  var keys;
  if (isArray$1(source)) {
    if (isReactive(source)) {
      needsWrap = !isShallow(source);
      values = shallowReadArray(source);
      isReadonlySource = isReadonly(source);
    }
  } else if (isString(source)) {
    values = source.split("");
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn("The v-for range expect an integer value but got ".concat(source, "."));
    }
    values = new Array(source);
    for (var i = 0; i < source; i++) {
      values[i] = i + 1;
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      values = Array.from(source);
    } else {
      keys = Object.keys(source);
      values = new Array(keys.length);
      for (var _i11 = 0, l = keys.length; _i11 < l; _i11++) {
        values[_i11] = source[keys[_i11]];
      }
    }
  }
  return {
    values,
    needsWrap,
    isReadonlySource,
    keys
  };
}
function getItem(_ref34, idx) {
  var {
    keys,
    values,
    needsWrap,
    isReadonlySource
  } = _ref34;
  var value = needsWrap ? isReadonlySource ? toReadonly(toReactive(values[idx])) : toReactive(values[idx]) : values[idx];
  if (keys) {
    return [value, keys[idx], idx];
  } else {
    return [value, idx, void 0];
  }
}
function normalizeAnchor(node) {
  if (node instanceof UniElement) {
    return node;
  } else if (isArray$1(node)) {
    return normalizeAnchor(node[0]);
  } else if (isVaporComponent(node)) {
    return normalizeAnchor(node.block);
  } else {
    return normalizeAnchor(node.nodes);
  }
}
function getRestElement(val, keys) {
  var res = {};
  for (var key in val) {
    if (!keys.includes(key)) res[key] = val[key];
  }
  return res;
}
function getDefaultValue(val, defaultVal) {
  return val === void 0 ? defaultVal : val;
}
function createTemplateRefSetter() {
  var instance = currentInstance;
  return function () {
    for (var _len24 = arguments.length, args = new Array(_len24), _key39 = 0; _key39 < _len24; _key39++) {
      args[_key39] = arguments[_key39];
    }
    return setRef(instance, ...args);
  };
}
function setRef(instance, el, ref, oldRef) {
  var refFor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (!instance || instance.isUnmounted) return;
  var setupState = instance.setupState || {};
  var refValue = getRefValue(el);
  var refs = instance.refs === EMPTY_OBJ ? instance.refs = {} : instance.refs;
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    var invokeRefSetter = value => {
      callWithErrorHandling(ref, currentInstance, 12, [value, refs]);
    };
    invokeRefSetter(refValue);
    onScopeDispose(() => invokeRefSetter());
  } else {
    var _isString = isString(ref);
    var _isRef = isRef(ref);
    var existing;
    if (_isString || _isRef) {
      var doSet = () => {
        if (refFor) {
          existing = _isString ? hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (!isArray$1(existing)) {
            existing = [refValue];
            if (_isString) {
              refs[ref] = existing;
              if (hasOwn(setupState, ref)) {
                setupState[ref] = refs[ref];
                existing = setupState[ref];
              }
            } else {
              ref.value = existing;
            }
          } else if (!existing.includes(refValue)) {
            existing.push(refValue);
          }
        } else if (_isString) {
          refs[ref] = refValue;
          if (hasOwn(setupState, ref)) {
            setupState[ref] = refValue;
          }
        } else if (_isRef) {
          ref.value = refValue;
        } else {
          warn("Invalid template ref type:", ref, "(".concat(typeof ref, ")"));
        }
      };
      doSet.id = -1;
      queuePostFlushCb(doSet);
      onScopeDispose(() => {
        queuePostFlushCb(() => {
          if (isArray$1(existing)) {
            remove$1(existing, refValue);
          } else if (_isString) {
            refs[ref] = null;
            if (hasOwn(setupState, ref)) {
              setupState[ref] = null;
            }
          } else if (_isRef) {
            ref.value = null;
          }
        });
      });
    } else {
      warn("Invalid template ref type:", ref, "(".concat(typeof ref, ")"));
    }
  }
  return ref;
}
var getRefValue = el => {
  if (isVaporComponent(el)) {
    return getExposed(el) || el;
  } else if (el instanceof DynamicFragment) {
    return getRefValue(el.nodes);
  }
  return el;
};
function createDynamicComponent(doc, getter, rawProps, rawSlots, isSingleRoot) {
  var _insertionParent = insertionParent;
  var _insertionAnchor = insertionAnchor;
  {
    resetInsertionState();
  }
  var frag = new DynamicFragment("dynamic-component");
  renderEffect(() => {
    var value = getter();
    frag.update(() => createComponentWithFallback(
    // fixed by uts
    doc, resolveDynamicComponent(value), rawProps, rawSlots, isSingleRoot), value);
  });
  if (_insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
}
function applyVShow(target, source) {
  if (isVaporComponent(target)) {
    return applyVShow(target.block, source);
  }
  if (isArray$1(target) && target.length === 1) {
    return applyVShow(target[0], source);
  }
  if (target instanceof DynamicFragment) {
    var update = target.update;
    target.update = (render, key) => {
      update.call(target, render, key);
      setDisplay(target, source());
    };
  }
  renderEffect(() => setDisplay(target, source()));
}
function setDisplay(target, value) {
  if (isVaporComponent(target)) {
    return setDisplay(target, value);
  }
  if (isArray$1(target) && target.length === 1) {
    return setDisplay(target[0], value);
  }
  if (target instanceof DynamicFragment) {
    return setDisplay(target.nodes, value);
  }
  if (target instanceof UniElement) {
    var el = target;
    if (!(vShowOriginalDisplay in el)) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    }
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
  } else {
    warn("v-show used on component with non-single-element root node and will be ignored.");
  }
}
function ensureMounted(cb) {
  if (currentInstance.isMounted) {
    cb();
  } else {
    onMounted(cb);
  }
}
var applyTextModel = function (el, get, set) {
  var {
    trim,
    number,
    lazy
  } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  vModelTextInit(el, trim, number, lazy, set);
  ensureMounted(() => {
    var value;
    renderEffect(() => {
      vModelTextUpdate(el, value, value = get(), trim, number);
    });
  });
};
function withVaporDirectives(node, dirs) {
  for (var [dir, value, argument, modifiers] of dirs) {
    if (dir) {
      var ret = dir(node, value, argument, modifiers);
      if (ret) onScopeDispose(ret);
    }
  }
}
var rootDocument;
function getDocument() {
  return rootDocument;
}
function setDocument(document) {
  rootDocument = document;
}
function updateTextNode(node) {
  var childNode = getExtraChildNode(node);
  if (childNode !== null) {
    var text = childNode.getAttribute("value");
    node.setAttribute("value", text || "");
  }
}
var nodeOps = {
  insert: (el, parent, anchor) => {
    if (isTextElement(parent)) {
      if (isExtraTextNode(el)) {
        var childNode = getExtraChildNode(parent);
        if (childNode !== null) {
          console.error("Multiple text nodes are not allowed.");
        } else {
          setExtraChildNode(parent, el);
          setExtraParentNode(el, parent);
          updateTextNode(parent);
        }
        return;
      }
    }
    if (!anchor) {
      parent.appendChild(el);
    } else {
      parent.insertBefore(el, anchor);
    }
    if (parent.isConnected) {
      updateClassStyles(el);
      updateChildrenClassStyle(el);
    }
  },
  remove: child => {
    var parent = child.parentNode;
    if (parent) {
      var childNodes = getExtraChildNodes(parent);
      if (childNodes !== null) {
        var index = childNodes.indexOf(child);
        if (index !== -1) {
          childNodes.splice(index, 1);
          setExtraChildNodes(parent, childNodes);
        }
      }
      parent.removeChild(child);
    }
  },
  createElement: (tag, container) => {
    if (!container) {
      var _document = getDocument();
      if (!_document) {
        throw new Error("document is not defined");
      }
      return _document.createElement(tag);
    } else {
      var _document2 = container.page.document;
      return _document2.createElement(tag);
    }
  },
  createText: (text, container, isAnchor) => {
    var document = container.page.document;
    if (isAnchor) {
      return document.createComment(text);
    }
    var textNode = document.createElement("text");
    textNode.setAttribute("value", text);
    setExtraIsTextNode(textNode, true);
    return textNode;
  },
  createComment: (text, container) => {
    var document = container.page.document;
    return document.createComment(text);
  },
  setText: (node, text) => {
    node.setAttribute("value", text);
    var parent = getExtraParentNode(node);
    if (parent !== null) {
      updateTextNode(parent);
    }
  },
  setElementText: (el, text) => {
    if (el.tagName !== "TEXT") {
      var childNodes = el.childNodes;
      var textNode = childNodes.find(node => node.tagName === "TEXT");
      if (!textNode) {
        var textNode2 = nodeOps.createText(text, el);
        el.appendChild(textNode2);
        return;
      }
      el = textNode;
    }
    el.setAttribute("value", text);
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: (selector, parentComponent) => {
    var proxy = parentComponent && parentComponent.proxy;
    var document = proxy && proxy.$nativePage && proxy.$nativePage.document;
    if (document) {
      return document.querySelector(selector);
    }
    return null;
  }
};
function patchAttr(el, key, value) {
  var instance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (instance) {
    [key, value] = transformAttr(el, key, value, instance);
  }
  el.setAnyAttribute(key, value);
}
var ATTR_HOVER_CLASS = "hoverClass";
var ATTR_PLACEHOLDER_CLASS = "placeholderClass";
var ATTR_PLACEHOLDER_STYLE = "placeholderStyle";
var ATTR_INDICATOR_CLASS = "indicatorClass";
var ATTR_INDICATOR_STYLE = "indicatorStyle";
var ATTR_MASK_CLASS = "maskClass";
var ATTR_MASK_STYLE = "maskStyle";
var CLASS_AND_STYLES = {
  view: {
    class: [ATTR_HOVER_CLASS],
    style: []
  },
  button: {
    class: [ATTR_HOVER_CLASS],
    style: []
  },
  navigator: {
    class: [ATTR_HOVER_CLASS],
    style: []
  },
  input: {
    class: [ATTR_PLACEHOLDER_CLASS],
    style: [ATTR_PLACEHOLDER_STYLE]
  },
  textarea: {
    class: [ATTR_PLACEHOLDER_CLASS],
    style: [ATTR_PLACEHOLDER_STYLE]
  },
  "picker-view": {
    class: [ATTR_INDICATOR_CLASS, ATTR_MASK_CLASS],
    style: [ATTR_INDICATOR_STYLE, ATTR_MASK_STYLE]
  }
};
function transformAttr(el, key, value, instance) {
  if (!value) {
    return [key, value];
  }
  var opts = CLASS_AND_STYLES[el.tagName.toLowerCase()];
  if (opts) {
    var camelized = camelize(key);
    if (opts["class"].indexOf(camelized) > -1) {
      var classStyle = parseClassList([value], instance, el);
      if (el.tagName === "BUTTON") {
        if (value === "none" || value == "button-hover" && classStyle.size == 0) {
          return [camelized, value];
        }
      }
      return [camelized, classStyle];
    }
    if (opts["style"].indexOf(camelized) > -1) {
      if (isString(value)) {
        var sytle = parseStringStyle(camelize(value));
        return [camelized, sytle];
      }
      return [camelized, normalizeStyle$2(value)];
    }
  }
  return [key, value];
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler);
}
function removeEventListener(el, event) {
  el.removeEventListener(event);
}
function patchEvent(el, rawName, prevValue, nextValue) {
  var instance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var invokers = el._vei || (el._vei = {});
  var existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    var [name, options] = parseName(rawName);
    if (nextValue) {
      var invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker);
    } else if (existingInvoker) {
      removeEventListener(el, name);
      invokers[rawName] = void 0;
    }
  }
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function formatEventName(name) {
  if (name === "on-post-message") {
    return "onPostMessage";
  }
  return name;
}
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
  return [formatEventName(event), options];
}
function createInvoker(initialValue, instance) {
  var invoker = e => {
    callWithAsyncErrorHandling(invoker.value, instance, 5, [e]);
  };
  invoker.value = initialValue;
  var modifiers = /* @__PURE__ */new Set();
  if (isArray$1(invoker.value)) {
    invoker.value.forEach(v => {
      if (v.modifiers) {
        v.modifiers.forEach(m => {
          modifiers.add(m);
        });
      }
    });
  } else {
    if (invoker.value.modifiers) {
      invoker.value.modifiers.forEach(m => {
        modifiers.add(m);
      });
    }
  }
  invoker.modifiers = [...modifiers];
  return invoker;
}
var vModelTags = ["u-input", "u-textarea"];
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent, hostInstance) => {
  if (key === "class") {
    patchClass(el, prevValue, nextValue, hostInstance || parentComponent);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key === "modelValue" && vModelTags.includes(el.tagName.toLowerCase())) {
    el.setAnyAttribute("modelValue", nextValue);
    el.setAnyAttribute("value", nextValue);
  } else {
    patchAttr(el, key, nextValue, parentComponent);
  }
};
function useCssModule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "$style";
  {
    var instance = getCurrentInstance();
    if (!instance) {
      warn("useCssModule must be called inside setup()");
      return EMPTY_OBJ;
    }
    var modules = instance.type.__cssModules;
    if (!modules) {
      warn("Current instance does not have CSS modules injected.");
      return EMPTY_OBJ;
    }
    var mod = modules[name];
    if (!mod) {
      warn("Current instance does not have CSS module named \"".concat(name, "\"."));
      return EMPTY_OBJ;
    }
    return mod;
  }
}
function useCssVars(getter) {
  var instance = getCurrentInstance();
  if (!instance) {
    warn("useCssVars is called without current active component instance.");
    return;
  }
  var setVars = () => setVarsOnVNode(instance.subTree, getter(instance.proxy));
  onMounted(() => watchEffect(setVars, {
    flush: "post"
  }));
  onUpdated(setVars);
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    var suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    var style = vnode.el.style;
    for (var key in vars) {
      style.setProperty("--".concat(key), vars[key]);
    }
  } else if (vnode.type === Fragment) {
    vnode.children.forEach(c => setVarsOnVNode(c, vars));
  }
}
var assignKey = Symbol("_assign");
var getModelAssigner = vnode => {
  var fn = vnode.props["onUpdate:modelValue"];
  return isArray$1(fn) ? value => invokeArrayFns(fn, value) : fn;
};
var vModelText = {
  created(el, _ref35, vnode) {
    var {
      modifiers: {
        lazy,
        trim,
        number
      }
    } = _ref35;
    el[assignKey] = getModelAssigner(vnode);
    vModelTextInit(el, trim, number || !!(vnode.props && vnode.props.type === "number"));
  },
  mounted(el, _binding, _vnode, _prevVNode) {
    var _a;
    el.setAnyAttribute("value", (_a = _binding.value) != null ? _a : "");
  },
  beforeUpdate(el, _ref36, vnode) {
    var {
      value,
      oldValue,
      modifiers: {
        lazy,
        trim,
        number
      }
    } = _ref36;
    el[assignKey] = getModelAssigner(vnode);
    vModelTextUpdate(el, oldValue, value, trim, number);
  }
};
var vModelTextInit = (el, trim, number, lazy, set) => {
  el.addEventListener("input", event => {
    var domValue = event.detail.value;
    if (trim) {
      domValue = domValue.trim();
    }
    if (number || el.getAttribute("type") === "number") {
      domValue = looseToNumber(domValue);
    }
    (set || el[assignKey])(event.detail.value);
  });
};
var vModelTextUpdate = (el, oldValue, value, trim, number, lazy) => {
  var elValue = (number || el.getAttribute("type") === "number") && !/^0\d/.test(el.getAnyAttribute("value")) ? looseToNumber(el.getAnyAttribute("value")) : el.getAnyAttribute("value");
  var newValue = value == null ? "" : value;
  if (elValue === newValue) {
    return;
  }
  el.setAnyAttribute("value", newValue);
};
var vModelDynamic = vModelText;
function getValue(el) {
  return "_value" in el ? el._value : el.getAnyAttribute("value");
}
var vModelCheckboxInit = (el, set) => {};
var vModelCheckboxUpdate = function (el, oldValue, value) {
  var rawValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : el.getAnyAttribute("value");
};
var vModelSelectInit = (el, value, number, set) => {};
var vModelSetSelected = (el, value) => {};
var systemModifiers = ["ctrl", "shift", "alt", "meta"];
var modifierGuards = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !e.ctrlKey,
  shift: e => !e.shiftKey,
  alt: e => !e.altKey,
  meta: e => !e.metaKey,
  left: e => "button" in e && e.button !== 0,
  middle: e => "button" in e && e.button !== 1,
  right: e => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some(m => e["".concat(m, "Key")] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
  return function (event) {
    for (var i = 0; i < modifiers.length; i++) {
      var guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    for (var _len25 = arguments.length, args = new Array(_len25 > 1 ? _len25 - 1 : 0), _key40 = 1; _key40 < _len25; _key40++) {
      args[_key40 - 1] = arguments[_key40];
    }
    return fn(event, ...args);
  };
};
var withKeys = (fn, modifiers) => {
  return event => {
    if (!("key" in event)) {
      return;
    }
    var eventKey = hyphenate(event.key);
    if (modifiers.some(k => k === eventKey)) {
      return fn(event);
    }
  };
};

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function factory(doc, factory2, root) {
  return () => {
    var el = factory2(doc);
    if (root) {
      el.ext.set("$root", true);
    }
    return el;
  };
}
var rendererOptions = extend({
  patchProp
}, nodeOps);
var renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
var render = function () {
  ensureRenderer().render(...arguments);
};
var createApp = function () {
  var app = ensureRenderer().createApp(...arguments);
  app.use(vaporInteropPlugin);
  var {
    mount,
    unmount
  } = app;
  app.mount = container => {
    setDocument(container);
    return mount(container.body);
  };
  app.unmount = () => {
    setDocument(void 0);
    unmount();
    app._container = null;
    app._context.reload = () => {};
  };
  return app;
};
var createVaporApp = (comp, props) => {
  var app = createVaporApp$1(comp, props);
  app.use(vaporInteropPlugin);
  var {
    mount,
    unmount
  } = app;
  app.mount = container => {
    setDocument(container);
    return mount(container.body);
  };
  app.unmount = () => {
    setDocument(void 0);
    unmount();
    app._container = null;
    app._context.reload = () => {};
  };
  return app;
};
function createMountPage(appContext) {
  return function mountPage(pageComponent, pageProps, pageContainer) {
    if (pageComponent.__vapor) {
      var rawProps = Object.keys(pageProps).reduce((acc, key) => {
        acc[key] = () => pageProps[key];
        return acc;
      }, {});
      setInsertionState(pageContainer);
      var instance = createComponent(pageComponent, rawProps, null, false, appContext);
      return instance.proxy;
    }
    var vnode = createVNode(pageComponent, pageProps);
    vnode.appContext = appContext;
    vnode.__page_container__ = pageContainer;
    render(vnode, pageContainer);
    var publicThis = vnode.component.proxy;
    publicThis.__page_container__ = pageContainer;
    return publicThis;
  };
}
function unmountPage(pageInstance) {
  var {
    __page_container__
  } = pageInstance;
  var instance = pageInstance.$;
  if (instance.vapor) {
    unmountComponent(instance, __page_container__);
    return;
  }
  if (__page_container__) {
    __page_container__.isUnmounted = true;
    render(null, __page_container__);
    delete pageInstance.__page_container__;
    var vnode = pageInstance.$.vnode;
    delete vnode.__page_container__;
  }
}

/// <reference types="@dcloudio/types" />
// function isUniPage(target: ComponentInternalInstance | null): boolean {
//   if (target && 'renderer' in target) {
//     return target.renderer === 'page'
//   }
//   return true
// }
var createLifeCycleHook = function (lifecycle) {
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return function (hook) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstance();
    // 不使用此判断了，因为组件也可以监听页面的生命周期，当页面作为组件渲染时，那监听的页面生成周期是其所在页面的，而不是其自身的
    // if (true) {
    //   // 如果只是页面生命周期，排除与App公用的，比如onShow、onHide
    //   if (flag === HookFlags.PAGE) {
    //     if (!isUniPage(target)) {
    //       return
    //     }
    //   }
    // }
    // post-create lifecycle registrations are noops during SSR
    !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
  };
};
var onShow = /*#__PURE__*/createLifeCycleHook(ON_SHOW, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
var onHide = /*#__PURE__*/createLifeCycleHook(ON_HIDE, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
var onLaunch = /*#__PURE__*/createLifeCycleHook(ON_LAUNCH, 1 /* HookFlags.APP */);
var onError = /*#__PURE__*/createLifeCycleHook(ON_ERROR, 1 /* HookFlags.APP */);
var onThemeChange = /*#__PURE__*/createLifeCycleHook(ON_THEME_CHANGE, 1 /* HookFlags.APP */);
var onPageNotFound = /*#__PURE__*/createLifeCycleHook(ON_PAGE_NOT_FOUND, 1 /* HookFlags.APP */);
var onUnhandledRejection = /*#__PURE__*/createLifeCycleHook(ON_UNHANDLE_REJECTION, 1 /* HookFlags.APP */);
var onExit = /*#__PURE__*/createLifeCycleHook(ON_EXIT, 1 /* HookFlags.APP */);
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
var onLoad = /*#__PURE__*/createLifeCycleHook(ON_LOAD, 2 /* HookFlags.PAGE */);
var onReady = /*#__PURE__*/createLifeCycleHook(ON_READY, 2 /* HookFlags.PAGE */);
var onUnload = /*#__PURE__*/createLifeCycleHook(ON_UNLOAD, 2 /* HookFlags.PAGE */);
var onResize = /*#__PURE__*/createLifeCycleHook(ON_RESIZE, 2 /* HookFlags.PAGE */);
var onBackPress = /*#__PURE__*/createLifeCycleHook(ON_BACK_PRESS, 2 /* HookFlags.PAGE */);
var onPageScroll = /*#__PURE__*/createLifeCycleHook(ON_PAGE_SCROLL, 2 /* HookFlags.PAGE */);
var onTabItemTap = /*#__PURE__*/createLifeCycleHook(ON_TAB_ITEM_TAP, 2 /* HookFlags.PAGE */);
var onReachBottom = /*#__PURE__*/createLifeCycleHook(ON_REACH_BOTTOM, 2 /* HookFlags.PAGE */);
var onPullDownRefresh = /*#__PURE__*/createLifeCycleHook(ON_PULL_DOWN_REFRESH, 2 /* HookFlags.PAGE */);
var onShareTimeline = /*#__PURE__*/createLifeCycleHook(ON_SHARE_TIMELINE, 2 /* HookFlags.PAGE */);
var onShareAppMessage = /*#__PURE__*/createLifeCycleHook(ON_SHARE_APP_MESSAGE, 2 /* HookFlags.PAGE */);
// for uni-app-x web
var onPageHide = onHide;
var onPageShow = onShow;
function renderComponentSlot(slots, name) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (slots[name]) {
    return slots[name](props);
  }
  return null;
}
var defineComponent = options => {
  var rootElement = options.rootElement;
  if (rootElement && typeof customElements !== 'undefined') {
    customElements.define(rootElement.name, rootElement.class, rootElement.options);
  }
  return defineComponent$1(options);
};
var ssrRef = ref;
var shallowSsrRef = shallowRef;
export { BaseTransition, BaseTransitionPropsValidators, Comment$1 as Comment, DeprecationTypes, EffectScope, ErrorCodes, ErrorTypeStrings, Fragment, KeepAlive, MoveType, PublicInstanceProxyHandlers, ReactiveEffect, Static, Suspense, Teleport, Text, TrackOpTypes, TriggerOpTypes, VaporFragment, applyTextModel, applyVShow, assertNumber, baseEmit, baseNormalizePropsOptions, callWithAsyncErrorHandling, callWithErrorHandling, child, cloneVNode, compatUtils, computed, createApp, createAppAPI, createBlock, createCommentVNode, createComponent, createComponentWithFallback, createDynamicComponent, createElementBlock, createBaseVNode as createElementVNode, createFor, createForSlots, createHydrationRenderer, createIf, createInternalObject, createMountPage, createPropsRestProxy, createRenderer, createSlot, createSlots, createStaticVNode, createTemplateRefSetter, createTextNode, createTextVNode, createVNode, createVaporApp, currentInstance, customRef, defineAsyncComponent, defineComponent, defineEmits, defineExpose, defineModel, defineOptions, defineProps, defineSlots, defineVaporComponent, delegate, delegateEvents, devtools, effect, effectScope, endMeasure, ensureRenderer, expose, factory, flushOnAppMount, getCurrentGenericInstance, getCurrentInstance, getCurrentScope, getCurrentWatcher, getDefaultValue, getRestElement, getTransitionRawChildren, guardReactiveProps, h, handleError, hasInjectionContext, hydrateOnIdle, hydrateOnInteraction, hydrateOnMediaQuery, hydrateOnVisible, initCustomFormatter, initFeatureFlags, inject, injectHook, insert, isEmitListener, isFragment, isInSSRComponentSetup, isMemoSame, isProxy, isReactive, isReadonly, isRef, isRuntimeOnly, isShallow, isVNode, logError, markRaw, mergeDefaults, mergeModels, mergeProps, next, nextTick, nextUid, nthChild, on, onActivated, onBackPress, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onError, onErrorCaptured, onExit, onHide, onLaunch, onLoad, onMounted, onPageHide, onPageNotFound, onPageScroll, onPageShow, onPullDownRefresh, onReachBottom, onReady, onRenderTracked, onRenderTriggered, onResize, onScopeDispose, onServerPrefetch, onShareAppMessage, onShareTimeline, onShow, onTabItemTap, onThemeChange, onUnhandledRejection, onUnload, onUnmounted, onUpdated, onWatcherCleanup, openBlock, parseClassList, parseClassStyles, patchStyle, popScopeId, popWarningContext, prepend, provide, proxyRefs, pushScopeId, pushWarningContext, queueJob, queuePostFlushCb, reactive, readonly, ref, registerHMR, registerRuntimeCompiler, remove, render, renderComponentSlot, renderEffect, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, resolveFilter, resolvePropValue, resolveTransitionHooks, setAttr, setBlockTracking, setClass, setDOMProp, setDevtoolsHook, setDynamicEvents, setDynamicProps, setHtml, setInsertionState, setProp, setStyle, setText, setTransitionHooks, setValue, shallowReactive, shallowReadonly, shallowRef, shallowSsrRef, shouldSetAsProp, simpleSetCurrentInstance, ssrContextKey, ssrRef, ssrUtils, startMeasure, stop, toHandlers, toRaw, toRef, toRefs, toValue, transformVNodeArgs, triggerRef, unmountPage, unref, unregisterHMR, useAttrs, useCssModule, useCssStyles, useCssVars, useId, useModel, useSSRContext, useSlots, useTemplateRef, useTransitionState, vModelCheckboxInit, vModelCheckboxUpdate, vModelDynamic, getValue as vModelGetValue, vModelSelectInit, vModelSetSelected, vModelText, vModelTextInit, vModelTextUpdate, vShow, vShowHidden, vShowOriginalDisplay, validateComponentName, validateProps, vaporInteropPlugin, version, warn, watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withCtx, withDefaults, withDirectives, withKeys, withMemo, withModifiers, withScopeId, withVaporDirectives };
