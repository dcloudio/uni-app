import { isFunction, isPromise, isArray, getGlobalThis, isString, camelize, capitalize, extend, NOOP, EMPTY_OBJ, remove, toHandlerKey, isObject, normalizeClass, normalizeStyle, isOn, hasChanged, toNumber, hyphenate, isHTMLTag, isSVGTag, isSet, isMap, isPlainObject, invokeArrayFns, isRegExp, EMPTY_ARR, isModelListener, isBuiltInDirective, hasOwn, isReservedProp, makeMap, looseToNumber, isGloballyAllowed, NO, def, toRawType, stringifyStyle, isKnownSvgAttr, isBooleanAttr, isKnownHtmlAttr, includeBooleanAttr, isRenderableAttrValue } from '@vue/shared';
export { camelize, capitalize, normalizeClass, normalizeProps, normalizeStyle, toDisplayString, toHandlerKey } from '@vue/shared';
import { isRef, isShallow, isReactive, ReactiveEffect, getCurrentScope, ref, pauseTracking, resetTracking, isProxy, computed as computed$1, toRaw, proxyRefs, track, markRaw, customRef, isReadonly, shallowReadonly, reactive, EffectScope, shallowReactive, trigger } from '@vue/reactivity';
export { EffectScope, ReactiveEffect, TrackOpTypes, TriggerOpTypes, customRef, effect, effectScope, getCurrentScope, isProxy, isReactive, isReadonly, isRef, isShallow, markRaw, onScopeDispose, proxyRefs, reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef, stop, toRaw, toRef, toRefs, toValue, triggerRef, unref } from '@vue/reactivity';
import { isRootHook, isRootImmediateHook, ON_LOAD, UniInputElement, UniTextAreaElement, UniElement, UniTextNode, UniCommentNode, forcePatchProp, JSON_PROTOCOL, resolveOwnerEl, ATTR_V_OWNER_ID, ATTR_V_RENDERJS } from '@dcloudio/uni-shared';

/**
* @dcloudio/uni-app-service-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg) {
  pauseTracking();
  var instance = stack.length ? stack[stack.length - 1].component : null;
  var appWarnHandler = instance && instance.appContext.config.warnHandler;
  var trace = getComponentTrace();
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [msg + args.map(a => {
      var _a, _b;
      return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
    }).join(""), instance && instance.proxy, trace.map(_ref => {
      var {
        vnode
      } = _ref;
      return "at <".concat(formatComponentName(instance, vnode.type), ">");
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
}
function getComponentTrace() {
  var currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  var normalizedStack = [];
  while (currentVNode) {
    var last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    var parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
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
    vnode,
    recurseCount
  } = _ref2;
  var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
  var isRoot = vnode.component ? vnode.component.parent == null : false;
  var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
  var close = ">" + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
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
  "WATCH_GETTER": 2,
  "2": "WATCH_GETTER",
  "WATCH_CALLBACK": 3,
  "3": "WATCH_CALLBACK",
  "WATCH_CLEANUP": 4,
  "4": "WATCH_CLEANUP",
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
  "14": "SCHEDULER"
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
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
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
  var values = [];
  for (var i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type) {
  var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var contextVNode = instance ? instance.vnode : null;
  if (instance) {
    var cur = instance.parent;
    var exposedInstance = instance.proxy;
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
    var appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode) {
  var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  {
    var info = ErrorTypeStrings$1[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
var isFlushing = false;
var isFlushPending = false;
var queue = [];
var flushIndex = 0;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var iOSPromise = {
  then(callback) {
    setTimeout(() => callback(), 0);
  }
};
var isIOS = exports.platform === "iOS";
var resolvedPromise = isIOS ? iOSPromise : Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
  var p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  var start = flushIndex + 1;
  var end = queue.length;
  while (start < end) {
    var middle = start + end >>> 1;
    var middleJob = queue[middle];
    var middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
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
  var i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isFlushing ? flushIndex + 1 : 0;
  {
    seen = seen || /* @__PURE__ */new Map();
  }
  for (; i < queue.length; i++) {
    var cb = queue[i];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
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
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = job => job.id == null ? Infinity : job.id;
var comparator = (a, b) => {
  var diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre) return -1;
    if (b.pre && !a.pre) return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */new Map();
  }
  queue.sort(comparator);
  var check = job => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      var job = queue[flushIndex];
      if (job && job.active !== false) {
        if (!!("development" !== "production") && check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    var count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      var instance = fn.ownerInstance;
      var componentName = instance && getComponentName(instance.type);
      handleError("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."), null, 10);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */new Set();
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
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.effect.dirty = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  var record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  var instances = [...record.instances];
  for (var instance of instances) {
    var oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (var _instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(_instance.type));
    }
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
function emit$1(event) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
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
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
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
  // eslint-disable-next-line no-restricted-globals
  window.HTMLElement &&
  // also exclude jsdom
  // eslint-disable-next-line no-restricted-globals
  !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))) {
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
  emit$1("app:init" /* APP_INIT */, app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount" /* APP_UNMOUNT */, app);
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
    emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
var devtoolsPerfStart = /* @__PURE__ */createDevtoolsPerformanceHook("perf:start" /* PERFORMANCE_START */);
var devtoolsPerfEnd = /* @__PURE__ */createDevtoolsPerformanceHook("perf:end" /* PERFORMANCE_END */);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
}
function emit(instance, event) {
  if (instance.isUnmounted) return;
  var props = instance.vnode.props || EMPTY_OBJ;
  for (var _len3 = arguments.length, rawArgs = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    rawArgs[_key3 - 2] = arguments[_key3];
  }
  {
    var {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1("Component emitted event \"".concat(event, "\" but it is neither declared in the emits option nor as an \"").concat(toHandlerKey(event), "\" prop."));
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
  var modelArg = isModelListener && event.slice(7);
  if (modelArg && modelArg in props) {
    var modifiersKey = "".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers");
    var {
      number,
      trim
    } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map(a => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    var lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1("Event \"".concat(lowerCaseEvent, "\" is emitted in component ").concat(formatComponentName(instance, instance.type), " but the handler is registered for \"").concat(event, "\". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use \"").concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
    }
  }
  var handlerName;
  var handler = props[handlerName = toHandlerKey(event)] ||
  // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  var onceHandler = props[handlerName + "Once"];
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
function normalizeEmitsOptions(comp, appContext) {
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
      var normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
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
  if (isArray(raw)) {
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
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  var result;
  var fallthroughAttrs;
  var prev = setCurrentRenderingInstance(instance);
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
      result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      var render2 = Component;
      if (!!("development" !== "production") && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(props, !!("development" !== "production") ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : {
        attrs,
        slots,
        emit
      }) : render2(props, null
      /* we know it doesn't need it */));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
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
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
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
          warn$1("Extraneous non-props attributes (".concat(extraAttrs.join(", "), ") were passed to component but could not be automatically inherited because component renders fragment or text root nodes."));
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
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1("Component inside <Transition> renders non-element root node that cannot be animated.");
    }
    root.transition = vnode.transition;
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
    var child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
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
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
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
function updateHOCHostEl(_ref4, el) {
  var {
    vnode,
    parent
  } = _ref4;
  while (parent) {
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
  create: createSuspenseBoundary,
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
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, _ref5) {
  var {
    p: patch,
    um: unmount,
    o: {
      createElement
    }
  } = _ref5;
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
    if (parentSuspense == null ? void 0 : parentSuspense.pendingBranch) {
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
              move(pendingBranch, container2, anchor === initialAnchor ? next(activeBranch) : anchor, 0);
              queuePostFlushCb(effects);
            }
          };
        }
        if (activeBranch) {
          if (parentNode(activeBranch.el) !== suspense.hiddenContainer) {
            anchor = next(activeBranch);
          }
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor, 0);
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
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect) {
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
        hydratedEl ? null : next(instance.subTree), suspense, namespace, optimized);
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
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
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
  if (isArray(s)) {
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
    if (isArray(fn)) {
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
  var _a;
  return ((_a = vnode.props) == null ? void 0 : _a.suspensible) != null && vnode.props.suspensible !== false;
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
var INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb) {
  var {
    immediate,
    deep,
    flush,
    once,
    onTrack,
    onTrigger
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ;
  if (cb && once) {
    var _cb = cb;
    cb = function () {
      _cb(...arguments);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1("watch() \"deep\" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.");
  }
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
  var warnInvalidSource = s => {
    warn$1("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  };
  var instance = currentInstance;
  var reactiveGetter = source2 => deep === true ? source2 :
  // for deep: false, only traverse root-level properties
  traverse(source2, deep === false ? 1 : void 0);
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
    forceTrigger = source.some(s => isReactive(s) || isShallow(s));
    getter = () => source.map(s => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    var baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  var cleanup;
  var onCleanup = fn => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect.onStop = void 0;
    };
  };
  var ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [getter(), isMultiSource ? [] : void 0, onCleanup]);
    }
    if (flush === "sync") {
      var ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  var job = () => {
    if (!effect.active || !effect.dirty) {
      return;
    }
    if (cb) {
      var newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [newValue,
        // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, onCleanup]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  var scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance) job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  var effect = new ReactiveEffect(getter, NOOP, scheduler);
  var scope = getCurrentScope();
  var unwatch = () => {
    effect.stop();
    if (scope) {
      remove(scope.effects, effect);
    }
  };
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  if (ssrCleanup) ssrCleanup.push(unwatch);
  return unwatch;
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
function traverse(value, depth) {
  var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var seen = arguments.length > 3 ? arguments[3] : undefined;
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach(v => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (var key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
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
  var instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
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
var BaseTransitionImpl = {
  name: "BaseTransition",
  props: BaseTransitionPropsValidators,
  setup(props, _ref6) {
    var {
      slots
    } = _ref6;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    return () => {
      var children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      var child = children[0];
      if (children.length > 1) {
        var hasFound = false;
        for (var c of children) {
          if (c.type !== Comment) {
            if (hasFound) {
              warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c;
            hasFound = true;
          }
        }
      }
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
      var innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      var enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      var oldChild = instance.subTree;
      var oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
        var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.effect.dirty = true;
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
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
      }
      return child;
    };
  }
};
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
function resolveTransitionHooks(vnode, props, state, instance) {
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
    if (isArray(hook)) {
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
      return resolveTransitionHooks(vnode2, props, state, instance);
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
  return isKeepAlive(vnode) ?
  // #7121 ensure get the child component subtree in case
  // it's been replaced during HMR
  vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
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
    var child = children[i];
    var key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, {
        key
      }) : child);
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
function defineComponent(options, extraOptions) {
  return isFunction(options) ?
  // #8326: extend call and options.name access are considered side-effects
  // by Rollup, so we have to wrap it in a pure-annotated IIFE.
  /* @__PURE__ */
  (() => extend({
    name: options.name
  }, extraOptions, {
    setup: options
  }))() : options;
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
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      var instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      var onError = err => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
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
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          instance.parent.effect.dirty = true;
          queueJob(instance.parent.update);
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
  setup(props, _ref7) {
    var {
      slots
    } = _ref7;
    var instance = getCurrentInstance();
    var sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        var children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    var cache = /* @__PURE__ */new Map();
    var keys = /* @__PURE__ */new Set();
    var current = null;
    {
      instance.__v_cache = cache;
    }
    var parentSuspense = instance.suspense;
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
    var storageContainer = createElement("div", null);
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      var instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, namespace, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        var vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance2);
      }
    };
    sharedContext.deactivate = vnode => {
      var instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        var vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance2);
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        var name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      var cached = cache.get(key);
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(() => [props.include, props.exclude], _ref8 => {
      var [include, exclude] = _ref8;
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
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach(cached => {
        var {
          subTree,
          suspense
        } = instance;
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
        return null;
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
      var comp = vnode.type;
      var name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      var {
        include,
        exclude,
        max
      } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
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
  if (isArray(pattern)) {
    return pattern.some(p => matches(p, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
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
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
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
    while (current && current.parent) {
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
    remove(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= ~256;
  vnode.shapeFlag &= ~512;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (target) {
    if (isRootHook(type) && target !== target.root) {
      target = target.root;
      if (isRootImmediateHook(type)) {
        var proxy = target.proxy;
        callWithAsyncErrorHandling(hook.bind(proxy), target, type, ON_LOAD === type ? [proxy.$page.options] : []);
      }
    }
    var {
      __page_container__
    } = target.root.vnode;
    if (__page_container__) {
      __page_container__.onInjectHook(type);
    }
    var hooks = target[type] || (target[type] = []);
    var wrappedHook = hook.__weh || (hook.__weh = function () {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      var reset = setCurrentInstance(target);
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      var res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
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
  return (
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, function () {
      return hook(...arguments);
    }, target)
  );
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
function renderList(source, renderItem, cache, index) {
  var ret;
  var cached = cache && cache[index];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (var i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
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
  var _loop = function (i) {
    var slot = dynamicSlots[i];
    if (isArray(slot)) {
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
    _loop(i);
  }
  return slots;
}
function renderSlot(slots, name) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fallback = arguments.length > 3 ? arguments[3] : undefined;
  var noSlotted = arguments.length > 4 ? arguments[4] : undefined;
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default") props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  var slot = slots[name];
  if (slot && slot.length > 1) {
    warn$1("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.");
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  var validSlotContent = slot && ensureValidVNode(slot(props));
  var rendered = createBlock(Fragment, {
    key: props.key ||
    // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    validSlotContent && validSlotContent.key || "_".concat(name)
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
    if (child.type === Comment) return false;
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
  if (!i) return null;
  if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
var publicPropertiesMap =
// Move PURE marker to new line to workaround compiler discarding it
// due to type annotation
/* @__PURE__ */
extend(/* @__PURE__ */Object.create(null), {
  $: i => i,
  $el: i => i.vnode.el,
  $data: i => i.data,
  $props: i => shallowReadonly(i.props),
  $attrs: i => shallowReadonly(i.attrs),
  $slots: i => shallowReadonly(i.slots),
  $refs: i => shallowReadonly(i.refs),
  $parent: i => getPublicInstance(i.parent),
  $root: i => getPublicInstance(i.root),
  $emit: i => i.emit,
  $options: i => resolveMergedOptions(i),
  $forceUpdate: i => i.f || (i.f = () => {
    i.effect.dirty = true;
    queueJob(i.update);
  }),
  $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: i => instanceWatch.bind(i)
});
var isReservedPrefix = key => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get(_ref9, key) {
    var {
      _: instance
    } = _ref9;
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
        track(instance, "get", key);
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
  set(_ref10, key, value) {
    var {
      _: instance
    } = _ref10;
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
  has(_ref11, key) {
    var {
      _: {
        data,
        setupState,
        accessCache,
        ctx,
        appContext,
        propsOptions
      }
    } = _ref11;
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
  var i = getCurrentInstance();
  if (!i) {
    warn$1("useContext() called without active instance.");
  }
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
function mergeDefaults(raw, defaults) {
  var props = normalizePropsOrEmits(raw);
  for (var key in defaults) {
    if (key.startsWith("__skip")) continue;
    var opt = props[key];
    if (opt) {
      if (isArray(opt) || isFunction(opt)) {
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
  if (isArray(a) && isArray(b)) return a.concat(b);
  return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  var ret = {};
  var _loop2 = function (key) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  };
  for (var key in props) {
    _loop2(key);
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  var ctx = getCurrentInstance();
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
    callHook$1(options.beforeCreate, instance, "bc");
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
    for (var _key5 in methods) {
      var methodHandler = methods[_key5];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, _key5, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods" /* METHODS */, _key5);
        }
      } else {
        warn$1("Method \"".concat(_key5, "\" has type \"").concat(typeof methodHandler, "\" in the component definition. Did you reference the function correctly?"));
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
          var _loop3 = function (_key6) {
            checkDuplicateProperties("Data" /* DATA */, _key6);
            if (!isReservedPrefix(_key6[0])) {
              Object.defineProperty(ctx, _key6, {
                configurable: true,
                enumerable: true,
                get: () => data[_key6],
                set: NOOP
              });
            }
          };
          for (var _key6 in data) {
            _loop3(_key6);
          }
        }
      }
    })();
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    var _loop4 = function (_key7) {
      var opt = computedOptions[_key7];
      var get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get === NOOP) {
        warn$1("Computed property \"".concat(_key7, "\" has no getter."));
      }
      var set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1("Write operation failed: computed property \"".concat(_key7, "\" is readonly."));
      };
      var c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, _key7, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => c.value = v
      });
      {
        checkDuplicateProperties("Computed" /* COMPUTED */, _key7);
      }
    };
    for (var _key7 in computedOptions) {
      _loop4(_key7);
    }
  }
  if (watchOptions) {
    for (var _key8 in watchOptions) {
      createWatcher(watchOptions[_key8], ctx, publicThis, _key8);
    }
  }
  if (provideOptions) {
    var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach(key => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
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
  if (isArray(expose)) {
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
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  var _loop5 = function (key) {
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
    _loop5(key);
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map(h => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  var getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    var handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1("Invalid watch handler specified by key \"".concat(raw, "\""), handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
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
  if (isArray(raw)) {
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
    if (isArray(to) && isArray(from)) {
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
function createAppAPI(render, hydrate) {
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
        for (var _len5 = arguments.length, options = new Array(_len5 > 1 ? _len5 - 1 : 0), _key9 = 1; _key9 < _len5; _key9++) {
          options[_key9 - 1] = arguments[_key9];
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
          var vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, namespace);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          app._instance = vnode.component;
          {
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$1("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
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
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue) {
  var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    var provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
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
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
function initProps(instance, rawProps, isStateful) {
  var isSSR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var props = {};
  var attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (var key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
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
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
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
    for (var _key10 in rawCurrentProps) {
      if (!rawProps ||
      // for camelCase
      !hasOwn(rawProps, _key10) && (
      // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = hyphenate(_key10)) === _key10 || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (
          // for camelCase
          rawPrevProps[_key10] !== void 0 ||
          // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[_key10] = resolvePropValue(options, rawCurrentProps, _key10, void 0, instance, true);
          }
        } else {
          delete props[_key10];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (var _key11 in attrs) {
        if (!rawProps || !hasOwn(rawProps, _key11) && true) {
          delete attrs[_key11];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
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
    var rawCurrentProps = toRaw(props);
    var castValues = rawCastValues || EMPTY_OBJ;
    for (var i = 0; i < needCastKeys.length; i++) {
      var _key12 = needCastKeys[i];
      props[_key12] = resolvePropValue(options, rawCurrentProps, _key12, castValues[_key12], instance, !hasOwn(castValues, _key12));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  var opt = options[key];
  if (opt != null) {
    var hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      var defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        var {
          propsDefaults
        } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          var reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          reset();
        }
      } else {
        value = defaultValue;
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
function normalizePropsOptions(comp, appContext) {
  var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cache = appContext.propsCache;
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
      var [props, keys] = normalizePropsOptions(raw2, appContext, true);
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
  if (isArray(raw)) {
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
        var prop = normalized[_normalizedKey] = isArray(opt) || isFunction(opt) ? {
          type: opt
        } : extend({}, opt);
        if (prop) {
          var booleanIndex = getTypeIndex(Boolean, prop.type);
          var stringIndex = getTypeIndex(String, prop.type);
          prop[0 /* shouldCast */] = booleanIndex > -1;
          prop[1 /* shouldCastTrue */] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(_normalizedKey);
          }
        }
      }
    }
  }
  var res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
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
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex(t => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  var resolvedValues = toRaw(props);
  var options = instance.propsOptions[0];
  for (var key in options) {
    var opt = options[key];
    if (opt == null) continue;
    validateProp(key, resolvedValues[key], opt, shallowReadonly(resolvedValues), !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  var {
    type,
    required,
    validator,
    skipCheck
  } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    var isValid = false;
    var types = isArray(type) ? type : [type];
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
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
var isSimpleType = /* @__PURE__ */makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
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
  for (var _len6 = arguments.length, args = new Array(_len6), _key13 = 0; _key13 < _len6; _key13++) {
    args[_key13] = arguments[_key13];
  }
  return args.some(elem => elem.toLowerCase() === "boolean");
}
var isInternalKey = key => key[0] === "_" || key === "$stable";
var normalizeSlotValue = value => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  var normalized = withCtx(function () {
    if (!!("development" !== "production") && currentInstance && (!ctx || ctx.root === currentInstance.root)) {
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
var initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    var type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
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
        extend(slots, children);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
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
function setRef(rawRef, oldRawRef, parentSuspense, vnode) {
  var isUnmount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  var refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
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
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    var _isString = isString(ref);
    var _isRef = isRef(ref);
    if (_isString || _isRef) {
      var doSet = () => {
        if (rawRef.f) {
          var existing = _isString ? hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (hasOwn(setupState, ref)) {
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
          if (hasOwn(setupState, ref)) {
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
var hasMismatch = false;
var isSVGContainer = container => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
var isMathMLContainer = container => container.namespaceURI.includes("MathML");
var getContainerType = container => {
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
  return void 0;
};
var isComment = node => node.nodeType === 8 /* COMMENT */;
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
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error("Hydration completed but contains mismatches.");
    }
  };
  var hydrateNode = function (node, vnode, parentComponent, parentSuspense, slotScopeIds) {
    var optimized = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
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
      if (!("__vnode" in node)) {
        Object.defineProperty(node, "__vnode", {
          value: vnode,
          enumerable: false
        });
      }
      if (!("__vueParentComponent" in node)) {
        Object.defineProperty(node, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    var nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3 /* TEXT */) {
          if (vnode.children === "") {
            insert(
            // fixed by xxxxxx
            vnode.el = createText("", node.parentNode), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            warn$1("Hydration text mismatch in", node.parentNode, "\n  - rendered on server: ".concat(JSON.stringify(node.data), "\n  - expected on client: ").concat(JSON.stringify(vnode.children)));
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
        } else if (domType !== 8 /* COMMENT */ || isFragmentStart) {
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
        if (domType === 1 /* ELEMENT */ || domType === 3 /* TEXT */) {
          nextNode = node;
          var needToAdoptContent = !vnode.children.length;
          for (var i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent) vnode.children += nextNode.nodeType === 1 /* ELEMENT */ ? nextNode.outerHTML : nextNode.data;
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
          if ((domType !== 1 /* ELEMENT */ || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
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
          if (isAsyncWrapper(vnode)) {
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
          if (domType !== 8 /* COMMENT */) {
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
      setRef(ref, null, parentSuspense, vnode);
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
        needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
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
        var next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        var _hasWarned = false;
        while (next) {
          hasMismatch = true;
          if (!_hasWarned) {
            warn$1("Hydration children mismatch on", el, "\nServer rendered element contains more child nodes than client vdom.");
            _hasWarned = true;
          }
          var cur = next;
          next = next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          warn$1("Hydration text content mismatch on", el, "\n  - rendered on server: ".concat(el.textContent, "\n  - expected on client: ").concat(vnode.children));
          el.textContent = vnode.children;
        }
      }
      if (props) {
        {
          for (var key in props) {
            if (propHasMismatch(el, key, props[key], vnode, parentComponent)) {
              hasMismatch = true;
            }
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) ||
            // force hydrate v-bind with .prop modifiers
            key[0] === ".") {
              patchProp(el, key, null, props[key], void 0, void 0, parentComponent);
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
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if (!hasWarned) {
          warn$1("Hydration children mismatch on", container, "\nServer rendered element contains fewer child nodes than client vdom.");
          hasWarned = true;
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
      hasMismatch = true;
      insert(vnode.anchor = createComment("]", container), container, next);
      return next;
    }
  };
  var handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    warn$1("Hydration node mismatch:\n- rendered on server:", node, node.nodeType === 3 /* TEXT */ ? "(text)" : isComment(node) && node.data === "[" ? "(start of fragment)" : "", "\n- expected on client:", vnode.type);
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
    return node.nodeType === 1 /* ELEMENT */ && node.tagName.toLowerCase() === "template";
  };
  return [hydrate, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
  var _a;
  var mismatchType;
  var mismatchKey;
  var actual;
  var expected;
  if (key === "class") {
    actual = el.getAttribute("class");
    expected = normalizeClass(clientValue);
    if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
      mismatchType = mismatchKey = "class";
    }
  } else if (key === "style") {
    actual = el.getAttribute("style");
    expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
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
    var root = instance == null ? void 0 : instance.subTree;
    if (vnode === root || (root == null ? void 0 : root.type) === Fragment && root.children.includes(vnode)) {
      var cssVars = (_a = instance == null ? void 0 : instance.getCssVars) == null ? void 0 : _a.call(instance);
      for (var key2 in cssVars) {
        expectedMap.set("--".concat(key2), String(cssVars[key2]));
      }
    }
    if (!isMapEqual(actualMap, expectedMap)) {
      mismatchType = mismatchKey = "style";
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
      mismatchType = "attribute";
      mismatchKey = key;
    }
  }
  if (mismatchType) {
    var format = v => v === false ? "(not rendered)" : "".concat(mismatchKey, "=\"").concat(v, "\"");
    var preSegment = "Hydration ".concat(mismatchType, " mismatch on");
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
    key = key == null ? void 0 : key.trim();
    value = value == null ? void 0 : value.trim();
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
var supported;
var perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark("vue-".concat(type, "-").concat(instance.uid));
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
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
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
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
function initFeatureFlags() {
  var needWarn = [];
  if (needWarn.length) {
    var multi = needWarn.length > 1;
    console.warn("Feature flag".concat(multi ? "s" : "", " ").concat(needWarn.join(", "), " ").concat(multi ? "are" : "is", " not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.\n\nFor more details, see https://link.vuejs.org/feature-flags."));
  }
}
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
      case Comment:
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
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
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
  var moveStaticNode = (_ref12, container, nextSibling) => {
    var {
      el,
      anchor
    } = _ref12;
    var next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  var removeStaticNode = _ref13 => {
    var {
      el,
      anchor
    } = _ref13;
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
    el = vnode.el = hostCreateElement(
    // fixed by xxxxxx
    vnode.type, container);
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
          hostPatchProp(el, key, null, props[key], namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
    }
    Object.defineProperty(el, "__vueParentComponent", {
      value: parentComponent,
      enumerable: false
    });
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
    if (parentComponent) {
      var subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        var parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  var mountChildren = function (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) {
    var start = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    for (var i = start; i < children.length; i++) {
      var child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  };
  var patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    var el = n2.el = n1.el;
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
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          var propsToUpdate = n2.dynamicProps;
          for (var i = 0; i < propsToUpdate.length; i++) {
            var key = propsToUpdate[i];
            var prev = oldProps[key];
            var next = newProps[key];
            if (next !== prev || key === "value" || hostForcePatchProp && hostForcePatchProp(el, key)) {
              hostPatchProp(el, key, prev, next, namespace, n1.children, parentComponent, parentSuspense, unmountChildren);
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
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
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
  var patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (var key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (var _key14 in newProps) {
        if (isReservedProp(_key14)) continue;
        var next = newProps[_key14];
        var prev = oldProps[_key14];
        if (next !== prev && _key14 !== "value" || hostForcePatchProp && hostForcePatchProp(el, _key14)) {
          hostPatchProp(el, _key14, prev, next, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("", container);
    var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("", container);
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
    if (n1 == null) {
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
      setupComponent(instance);
      {
        endMeasure(instance, "init");
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        var placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
    }
    if (instance.$wxsModules) {
      var els = resolveOwnerEl(instance, true);
      if (els.length) {
        els.forEach(el => {
          el.setAttribute(ATTR_V_OWNER_ID, instance.uid);
          var {
            $renderjsModules
          } = instance.type;
          $renderjsModules && el.setAttribute(ATTR_V_RENDERJS, $renderjsModules);
        });
      }
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
        invalidateJob(instance.update);
        instance.effect.dirty = true;
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
          parent
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
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
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
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        var {
          next,
          bu,
          u,
          parent: _parent,
          vnode
        } = instance;
        {
          var nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        var originNext = next;
        var _vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(_vnodeHook, _parent, next, vnode);
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
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (_vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(_vnodeHook, _parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    var effect = instance.effect = new ReactiveEffect(componentUpdateFn, NOOP, () => queueJob(update), instance.scope
    // track it in component's effect scope
    );
    var update = instance.update = () => {
      if (effect.dirty) {
        effect.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? e => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? e => invokeArrayFns(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
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
            move(_nextChild, container, _anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  var move = function (vnode, container, anchor, moveType) {
    var parentSuspense = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var {
      el,
      type,
      transition,
      children,
      shapeFlag
    } = vnode;
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
      for (var i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
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
        var remove2 = () => hostInsert(el, container, anchor);
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
      dirs
    } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
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
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (
      // #1153: fast path should not be taken for non-stable (v-for) fragments
      type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
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
          if (child.type === Comment) {
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
      update,
      subTree,
      um
    } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
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
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  var isFlushing = false;
  var render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, namespace);
    }
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
    container._vnode = vnode;
  };
  var internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
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
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace(_ref14, currentNamespace) {
  var {
    type,
    props
  } = _ref14;
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse(_ref15, allowed) {
  var {
    effect,
    update
  } = _ref15;
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2) {
  var shallow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var ch1 = n1.children;
  var ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (var i = 0; i < ch1.length; i++) {
      var c1 = ch1[i];
      var c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow) traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  var p = arr.slice();
  var result = [0];
  var i, j, u, v, c;
  var len = arr.length;
  for (i = 0; i < len; i++) {
    var arrI = arr[i];
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
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
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
var isTeleport = type => type.__isTeleport;
var isTeleportDisabled = props => props && (props.disabled || props.disabled === "");
var isTargetSVG = target => typeof SVGElement !== "undefined" && target instanceof SVGElement;
var isTargetMathML = target => typeof MathMLElement === "function" && target instanceof MathMLElement;
var resolveTarget = (props, select) => {
  var targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      warn$1("Current renderer does not support string target for Teleports. (missing querySelector renderer option)");
      return null;
    } else {
      var target = select(targetSelector);
      if (!target) {
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
      var target = n2.target = resolveTarget(n2.props, querySelector);
      var targetAnchor = n2.targetAnchor = createText("", container);
      if (target) {
        insert(targetAnchor, target);
        if (namespace === "svg" || isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace === "mathml" || isTargetMathML(target)) {
          namespace = "mathml";
        }
      } else if (!disabled) {
        warn$1("Invalid Teleport target on mount:", target, "(".concat(typeof target, ")"));
      }
      var mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      var _mainAnchor = n2.anchor = n1.anchor;
      var _target = n2.target = n1.target;
      var _targetAnchor = n2.targetAnchor = n1.targetAnchor;
      var wasDisabled = isTeleportDisabled(n1.props);
      var currentContainer = wasDisabled ? container : _target;
      var currentAnchor = wasDisabled ? _mainAnchor : _targetAnchor;
      if (namespace === "svg" || isTargetSVG(_target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(_target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, _mainAnchor, internals, 1);
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          var nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          } else {
            warn$1("Invalid Teleport target on update:", _target, "(".concat(typeof _target, ")"));
          }
        } else if (wasDisabled) {
          moveTeleport(n2, _target, _targetAnchor, internals, 1);
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, _ref16, doRemove) {
    var {
      um: unmount,
      o: {
        remove: hostRemove
      }
    } = _ref16;
    var {
      shapeFlag,
      children,
      anchor,
      targetAnchor,
      target,
      props
    } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      var shouldRemove = doRemove || !isTeleportDisabled(props);
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, _ref17) {
  var {
    o: {
      insert
    },
    m: move
  } = _ref17;
  var moveType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
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
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, _ref18, hydrateChildren) {
  var {
    o: {
      nextSibling,
      parentNode,
      querySelector
    }
  } = _ref18;
  var target = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target) {
    var targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        var targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
var Teleport = TeleportImpl;
function updateCssVars(vnode) {
  var ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    var node = vnode.children[0].el;
    while (node && node !== vnode.targetAnchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
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
  isBlockTreeEnabled += value;
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
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
var vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}
var createVNodeWithArgsTransform = function () {
  for (var _len7 = arguments.length, args = new Array(_len7), _key15 = 0; _key15 < _len7; _key15++) {
    args[_key15] = arguments[_key15];
  }
  return _createVNode(...(vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args));
};
var InternalObjectKey = "__vInternal";
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
    type = Comment;
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
    cloned.patchFlag |= -2;
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
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
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
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps) {
  var mergeRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var {
    props,
    ref,
    patchFlag,
    children
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
    mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
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
    dirs: vnode.dirs,
    transition: vnode.transition,
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
  return cloned;
}
function deepCloneVNode(vnode) {
  var cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
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
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null,
    // #3666, avoid reference pollution when reusing vnode
    child.slice());
  } else if (typeof child === "object") {
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
  } else if (isArray(children)) {
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
      if (!slotFlag && !(InternalObjectKey in children)) {
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
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        var existing = ret[key];
        var incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
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
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(true
    /* detached */),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
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
    attrsProxy: null,
    slotsProxy: null,
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
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  var g = getGlobalThis();
  var registerGlobalSetter = (key, setter) => {
    var setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return v => {
      if (setters.length > 1) setters.forEach(set => set(v));else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", v => currentInstance = v);
  setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", v => isInSSRComponentSetup = v);
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
var isBuiltInTag = /* @__PURE__ */makeMap("slot,component");
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
var isInSSRComponentSetup = false;
function setupComponent(instance) {
  var isSSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isSSR && setInSSRSetupState(isSSR);
  var {
    props,
    children
  } = instance.vnode;
  var isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
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
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  var {
    setup
  } = Component;
  if (setup) {
    var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    var reset = setCurrentInstance(instance);
    pauseTracking();
    var setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
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
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
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
      warn$1("Component is missing template or render function.");
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, {
    get(target, key) {
      markAttrsAccessed();
      track(instance, "get", "$attrs");
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
  }));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  var expose = exposed => {
    {
      if (instance.exposed) {
        warn$1("expose() should be called only once per setup().");
      }
      if (exposed != null) {
        var exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
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
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return function (event) {
          for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key16 = 1; _key16 < _len8; _key16++) {
            args[_key16 - 1] = arguments[_key16];
          }
          return instance.emit(event, ...args);
        };
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        } else if (key === "$scope") {
          return instance.ctx.$scope;
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap || key === "$scope";
      }
    }));
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
  var c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    var i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
function useModel(props, name) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ;
  var i = getCurrentInstance();
  if (!i) {
    warn$1("useModel() called without active instance.");
    return ref();
  }
  if (!i.propsOptions[0][name]) {
    warn$1("useModel() called with prop \"".concat(name, "\" which is not declared."));
    return ref();
  }
  var camelizedName = camelize(name);
  var hyphenatedName = hyphenate(name);
  var res = customRef((track, trigger) => {
    var localValue;
    watchSyncEffect(() => {
      var propValue = props[name];
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
        var rawProps = i.vnode.props;
        if (!(rawProps && (
        // check if parent has passed v-model
        name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && ("onUpdate:".concat(name) in rawProps || "onUpdate:".concat(camelizedName) in rawProps || "onUpdate:".concat(hyphenatedName) in rawProps)) && hasChanged(value, localValue)) {
          localValue = value;
          trigger();
        }
        i.emit("update:".concat(name), options.set ? options.set(value) : value);
      }
    };
  });
  var modifierKey = name === "modelValue" ? "modelModifiers" : "".concat(name, "Modifiers");
  res[Symbol.iterator] = () => {
    var i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return {
            value: i2++ ? props[modifierKey] || {} : res,
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
function h(type, propsOrChildren, children) {
  var l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
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
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, "VueInstance"];
      } else if (isRef(obj)) {
        return ["div", {}, ["span", vueStyle, genRefFlag(obj)], "<", formatValue(obj.value), ">"];
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
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
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
var version = "3.4.21";
var warn = warn$1;
var ErrorTypeStrings = ErrorTypeStrings$1;
var devtools = devtools$1;
var setDevtoolsHook = setDevtoolsHook$1;
var _ssrUtils = {
  createComponentInstance,
  setupComponent,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode: isVNode,
  normalizeVNode
};
var ssrUtils = _ssrUtils;
var resolveFilter = null;
var compatUtils = null;
var DeprecationTypes = null;
function createElement(tagName, container) {
  if (tagName === "input") {
    return new UniInputElement(tagName, container);
  } else if (tagName === "textarea") {
    return new UniTextAreaElement(tagName, container);
  }
  return new UniElement(tagName, container);
}
function createTextNode(text, container) {
  return new UniTextNode(text, container);
}
function createComment(text, container) {
  return new UniCommentNode(text, container);
}
var tempContainer;
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: child => {
    var parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, container) => {
    return createElement(tag, container);
  },
  createText: (text, container) => createTextNode(text, container),
  createComment: (text, container) => createComment(text, container),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  // querySelector: selector => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    var cloned = el.cloneNode(true);
    if ("_value" in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor) {
    var temp = tempContainer || (tempContainer = createElement("div"));
    temp.innerHTML = content;
    var first = temp.firstChild;
    var node = first;
    var last = node;
    while (node) {
      last = node;
      nodeOps.insert(node, parent, anchor);
      node = temp.firstChild;
    }
    return [first, last];
  }
};
function patchClass(el, value) {
  if (value == null) {
    value = "";
  }
  el.setAttribute("class", value);
}
function patchStyle(el, prev, next) {
  if (!next) {
    el.removeAttribute("style");
  } else if (isString(next)) {
    if (prev !== next) {
      el.setAttribute("style", next);
    }
  } else {
    var batchedStyles = {};
    var isPrevObj = prev && !isString(prev);
    if (isPrevObj) {
      for (var key in prev) {
        if (next[key] == null) {
          batchedStyles[key] = "";
        }
      }
      for (var _key17 in next) {
        var value = next[_key17];
        if (value !== prev[_key17]) {
          batchedStyles[_key17] = value;
        }
      }
    } else {
      for (var _key18 in next) {
        batchedStyles[_key18] = next[_key18];
      }
    }
    if (Object.keys(batchedStyles).length) {
      el.setAttribute("style", batchedStyles);
    }
  }
}
function patchAttr(el, key, value) {
  if (value == null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
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
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
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
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  var invoker = e => {
    callWithAsyncErrorHandling(invoker.value, instance, 5, [e]);
  };
  invoker.value = initialValue;
  var modifiers = /* @__PURE__ */new Set();
  if (isArray(invoker.value)) {
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
    initWxsEvent(invoker, instance);
  }
  invoker.modifiers = [...modifiers];
  return invoker;
}
function initWxsEvent(invoker, instance) {
  if (!instance) {
    return;
  }
  var {
    $wxsModules
  } = instance;
  if (!$wxsModules) {
    return;
  }
  var invokerSourceCode = invoker.value.toString();
  if (!$wxsModules.find(module => invokerSourceCode.indexOf("." + module + ".") > -1)) {
    return;
  }
  invoker.wxsEvent = invoker.value();
}
var patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  switch (key) {
    case "class":
      patchClass(el, nextValue);
      break;
    case "style":
      patchStyle(el, prevValue, nextValue);
      break;
    default:
      if (isOn(key)) {
        if (!isModelListener(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else {
        if (isObject(nextValue)) {
          var equal = prevValue === nextValue;
          nextValue = JSON_PROTOCOL + JSON.stringify(nextValue);
          if (equal && el.getAttribute(key) === nextValue) {
            return;
          }
        } else if (prevValue === nextValue) {
          return;
        }
        patchAttr(el, key, nextValue);
      }
      break;
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
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach(c => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    var {
      el,
      anchor
    } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor) break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    for (var key in vars) {
      el.setAttribute("--".concat(key), vars[key]);
    }
  }
}
var TRANSITION = "transition";
var ANIMATION = "animation";
var Transition = (props, _ref22) => {
  var {
    slots
  } = _ref22;
  return h(BaseTransition, resolveTransitionProps(props), slots);
};
Transition.displayName = "Transition";
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
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
var TransitionPropsValidators = Transition.props = /* @__PURE__ */extend({}, BaseTransition.props, DOMTransitionPropsValidators);
var callHook = function (hook) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (isArray(hook)) {
    hook.forEach(h2 => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = hook => {
  return hook ? isArray(hook) ? hook.some(h2 => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  var baseProps = {};
  for (var key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  var {
    name = "v",
    type,
    duration,
    enterFromClass = "".concat(name, "-enter-from"),
    enterActiveClass = "".concat(name, "-enter-active"),
    enterToClass = "".concat(name, "-enter-to"),
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = "".concat(name, "-leave-from"),
    leaveActiveClass = "".concat(name, "-leave-active"),
    leaveToClass = "".concat(name, "-leave-to")
  } = rawProps;
  var durations = normalizeDuration(duration);
  var enterDuration = durations && durations[0];
  var leaveDuration = durations && durations[1];
  var {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  var finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  var finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  var makeEnterHook = isAppear => {
    return (el, done) => {
      var hook = isAppear ? onAppear : onEnter;
      var resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
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
      var resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
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
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    var n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  var res = toNumber(val);
  validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn("<transition> explicit duration is not a valid number - got ".concat(JSON.stringify(val), "."));
  } else if (isNaN(val)) {
    warn("<transition> explicit duration is NaN - the duration expression might be incorrect.");
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.remove(c));
  var {
    _vtc
  } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  var id = el._endId = ++endId;
  var resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  var {
    type,
    timeout,
    propCount
  } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  var endEvent = type + "end";
  var ended = 0;
  var end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  var onEnd = e => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var getStyleProperties = key => (styles[key] || "").split(", ");
  var transitionDelays = getStyleProperties(TRANSITION + "Delay");
  var transitionDurations = getStyleProperties(TRANSITION + "Duration");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = getStyleProperties(ANIMATION + "Delay");
  var animationDurations = getStyleProperties(ANIMATION + "Duration");
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
  var hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
var positionMap = /* @__PURE__ */new WeakMap();
var newPositionMap = /* @__PURE__ */new WeakMap();
var TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, _ref23) {
    var {
      slots
    } = _ref23;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    var prevChildren;
    var children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      var moveClass = props.moveClass || "".concat(props.name || "v", "-move");
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      var movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach(c => {
        var el = c.el;
        var style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        var cb = el._moveCb = e => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      var rawProps = toRaw(props);
      var cssTransitionProps = resolveTransitionProps(rawProps);
      var tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn("<TransitionGroup> children must be keyed.");
        }
      }
      if (prevChildren) {
        for (var _i5 = 0; _i5 < prevChildren.length; _i5++) {
          var _child = prevChildren[_i5];
          setTransitionHooks(_child, resolveTransitionHooks(_child, cssTransitionProps, state, instance));
          positionMap.set(_child, _child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
var removeMode = props => delete props.mode;
/* @__PURE__ */
removeMode(TransitionGroupImpl.props);
var TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  var el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  var oldPos = positionMap.get(c);
  var newPos = newPositionMap.get(c);
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    var s = c.el.style;
    s.transform = s.webkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  var clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach(cls => {
      cls.split(/\s+/).forEach(c => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach(c => c && clone.classList.add(c));
  clone.style.display = "none";
  var container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  var {
    hasTransform
  } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
var getModelAssigner = vnode => {
  var fn = vnode.props["onUpdate:modelValue"];
  return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
};
var vModelText = {
  created(el, _ref24, vnode) {
    var {
      value,
      modifiers: {
        trim,
        number
      }
    } = _ref24;
    el.value = value == null ? "" : value;
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "input", e => {
      var domValue = e.detail.value;
      var pageNode = el.pageNode;
      el.pageNode = null;
      el.value = domValue;
      el.pageNode = pageNode;
      if (trim) {
        domValue = domValue.trim();
      } else if (number) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
  },
  beforeUpdate(el, _ref25, vnode) {
    var {
      value
    } = _ref25;
    el._assign = getModelAssigner(vnode);
    var newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
var vModelDynamic = vModelText;
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
  var wrapper = function (event) {
    for (var i = 0; i < modifiers.length; i++) {
      var guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key19 = 1; _key19 < _len9; _key19++) {
      args[_key19 - 1] = arguments[_key19];
    }
    return fn(event, ...args);
  };
  wrapper.modifiers = modifiers;
  return wrapper;
};
var keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
var withKeys = (fn, modifiers) => {
  return event => {
    if (!("key" in event)) {
      return;
    }
    var eventKey = hyphenate(event.key);
    if (modifiers.some(k => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
var vShow = {
  beforeMount(el, _ref26) {
    var {
      value
    } = _ref26;
    setDisplay(el, value);
  },
  updated(el, _ref27) {
    var {
      value,
      oldValue
    } = _ref27;
    if (!value === !oldValue) return;
    setDisplay(el, value);
  },
  beforeUnmount(el, _ref28) {
    var {
      value
    } = _ref28;
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.setAttribute(".vShow", !!value);
}
var rendererOptions = extend({
  patchProp,
  forcePatchProp
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
  {
    injectNativeTagCheck(app);
  }
  var {
    mount
  } = app;
  app.mount = container => {
    if (isString(container)) {
      {
        if (container === "#app") {
          devtoolsInitApp(app, version);
        }
      }
      container = createComment(container);
    }
    return container && mount(container, false, false);
  };
  return app;
};
var createSSRApp = createApp;
function createMountPage(appContext) {
  return function mountPage(pageComponent, pageProps, pageContainer) {
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
  if (__page_container__) {
    __page_container__.isUnmounted = true;
    render(null, __page_container__);
    delete pageInstance.__page_container__;
    var vnode = pageInstance.$.vnode;
    delete vnode.__page_container__;
  }
}
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: tag => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function onBeforeActivate() {}
function onBeforeDeactivate() {}
function wxsProp(prop) {
  if (isObject(prop)) {
    return JSON_PROTOCOL + JSON.stringify(prop);
  }
  return prop;
}
var wp = prop => wxsProp(prop);
var getCurrentGenericInstance = getCurrentInstance;
export { BaseTransition, BaseTransitionPropsValidators, Comment, DeprecationTypes, ErrorCodes, ErrorTypeStrings, Fragment, KeepAlive, Static, Suspense, Teleport, Text, Transition, TransitionGroup, assertNumber, callWithAsyncErrorHandling, callWithErrorHandling, cloneVNode, compatUtils, computed, createApp, createBlock, createComment, createCommentVNode, createElement, createElementBlock, createBaseVNode as createElementVNode, createHydrationRenderer, createMountPage, createPropsRestProxy, createRenderer, createSSRApp, createSlots, createStaticVNode, createTextNode, createTextVNode, createVNode, createApp as createVueApp, defineAsyncComponent, defineComponent, defineEmits, defineExpose, defineModel, defineOptions, defineProps, defineSlots, devtools, devtoolsInitApp, getCurrentGenericInstance, getCurrentInstance, getTransitionRawChildren, guardReactiveProps, h, handleError, hasInjectionContext, initCustomFormatter, inject, injectHook, isInSSRComponentSetup, isMemoSame, isRuntimeOnly, isVNode, logError, mergeDefaults, mergeModels, mergeProps, nextTick, onActivated, onBeforeActivate, onBeforeDeactivate, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated, openBlock, popScopeId, provide, pushScopeId, queuePostFlushCb, registerRuntimeCompiler, render, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, resolveFilter, resolveTransitionHooks, setBlockTracking, setDevtoolsHook, setTransitionHooks, ssrContextKey, ssrUtils, toHandlers, transformVNodeArgs, unmountPage, useAttrs, useCssModule, useCssVars, useModel, useSSRContext, useSlots, useTransitionState, vModelDynamic, vModelText, vShow, version, warn, watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withCtx, withDefaults, withDirectives, withKeys, withMemo, withModifiers, withScopeId, wp };
