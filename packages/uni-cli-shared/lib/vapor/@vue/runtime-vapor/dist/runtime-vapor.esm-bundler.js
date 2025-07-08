/**
* @vue/runtime-vapor v3.5.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
import { warn, baseEmit, currentInstance, queueJob, startMeasure, simpleSetCurrentInstance, queuePostFlushCb, baseNormalizePropsOptions, pushWarningContext, validateProps, popWarningContext, resolvePropValue, isEmitListener, patchStyle, mergeProps, shouldSetAsProp, isRef, PublicInstanceProxyHandlers, callWithErrorHandling, registerHMR, endMeasure, unregisterHMR, nextUid, EffectScope as EffectScope$1, expose, createAppAPI, initFeatureFlags, setDevtoolsHook, flushOnAppMount, ensureRenderer, shallowRef, renderSlot, createVNode, shallowReactive, createInternalObject, onScopeDispose as onScopeDispose$1, resolveDynamicComponent, vShowOriginalDisplay, vShowHidden, vModelTextInit, vModelCheckboxInit, vModelSelectInit, onMounted, vModelTextUpdate, vModelCheckboxUpdate, vModelGetValue, vModelSetSelected } from '@vue/runtime-dom';
import { isArray, EMPTY_OBJ, hasOwn, invokeArrayFns, EMPTY_ARR, isFunction, camelize, isString, NO, YES, parseStringStyle, isOn, canSetValueDirectly, toDisplayString, getGlobalThis, extend, getSequence, isObject, remove as remove$1, looseEqual } from '@vue/shared';
import { pauseTracking, EffectScope, resetTracking, getCurrentScope, ReactiveEffect, onEffectCleanup, proxyRefs, onScopeDispose, markRaw, unref, isReactive, isShallow, shallowReadArray, isReadonly, toReadonly, toReactive, shallowRef as shallowRef$1, isRef as isRef$1, traverse } from '@vue/reactivity';
import { normalizeClass, normalizeStyle } from '@dcloudio/uni-shared';

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createTextNode(value = "") {
  return document.createTextNode(value);
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createComment(data) {
  return document.createComment(data);
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

let insertionParent;
let insertionAnchor;
function setInsertionState(parent, anchor) {
  insertionParent = parent;
  insertionAnchor = anchor;
}
function resetInsertionState() {
  insertionParent = insertionAnchor = void 0;
}

let isHydrating = false;
let currentHydrationNode = null;
let isOptimized$1 = false;
function withHydration(container, fn) {
  adoptTemplate = adoptTemplateImpl;
  locateHydrationNode = locateHydrationNodeImpl;
  if (!isOptimized$1) {
    Comment.prototype.$fs = void 0;
    isOptimized$1 = true;
  }
  isHydrating = true;
  setInsertionState(container, 0);
  const res = fn();
  resetInsertionState();
  currentHydrationNode = null;
  isHydrating = false;
  return res;
}
let adoptTemplate;
let locateHydrationNode;
const isComment = (node, data) => node.nodeType === 8 && node.data === data;
function adoptTemplateImpl(node, template) {
  if (!(template[0] === "<" && template[1] === "!")) {
    while (node.nodeType === 8) node = next(node);
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    const type = node.nodeType;
    if (type === 8 && !template.startsWith("<!") || type === 1 && !template.startsWith(`<` + node.tagName.toLowerCase()) || type === 3 && template.trim() && !template.startsWith(node.data)) {
      warn(`adopted: `, node);
      warn(`template: ${template}`);
      warn("hydration mismatch!");
    }
  }
  currentHydrationNode = next(node);
  return node;
}
function locateHydrationNodeImpl() {
  let node;
  if (insertionAnchor === 0) {
    node = child(insertionParent);
  } else {
    node = insertionAnchor ? insertionAnchor.previousSibling : insertionParent ? insertionParent.lastChild : currentHydrationNode;
    if (node && isComment(node, "]")) {
      if (node.$fs) {
        node = node.$fs;
      } else {
        let cur = node;
        let curFragEnd = node;
        let fragDepth = 0;
        node = null;
        while (cur) {
          cur = cur.previousSibling;
          if (cur) {
            if (isComment(cur, "[")) {
              curFragEnd.$fs = cur;
              if (!fragDepth) {
                node = cur;
                break;
              } else {
                fragDepth--;
              }
            } else if (isComment(cur, "]")) {
              curFragEnd = cur;
              fragDepth++;
            }
          }
        }
      }
    }
  }
  if (!!(process.env.NODE_ENV !== "production") && !node) {
    warn("Hydration mismatch in ", insertionParent);
  }
  resetInsertionState();
  currentHydrationNode = node;
}

class VaporFragment {
  constructor(nodes) {
    this.nodes = nodes;
  }
}
class DynamicFragment extends VaporFragment {
  constructor(anchorLabel) {
    super([]);
    this.anchor = !!(process.env.NODE_ENV !== "production") && anchorLabel ? createComment(anchorLabel) : createTextNode();
  }
  update(render, key = render) {
    if (key === this.current) {
      return;
    }
    this.current = key;
    pauseTracking();
    const parent = this.anchor.parentNode;
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
  return val instanceof Node || isArray(val) || isVaporComponent(val) || isFragment(val);
}
function isValidBlock(block) {
  if (block instanceof Node) {
    return !(block instanceof Comment);
  } else if (isVaporComponent(block)) {
    return isValidBlock(block.block);
  } else if (isArray(block)) {
    return block.length > 0 && block.every(isValidBlock);
  } else {
    return isValidBlock(block.nodes);
  }
}
function insert(block, parent, anchor = null) {
  anchor = anchor === 0 ? parent.firstChild : anchor;
  if (block instanceof Node) {
    if (!isHydrating) {
      parent.insertBefore(block, anchor);
    }
  } else if (isVaporComponent(block)) {
    if (block.isMounted) {
      insert(block.block, parent, anchor);
    } else {
      mountComponent(block, parent, anchor);
    }
  } else if (isArray(block)) {
    for (const b of block) {
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
function prepend(parent, ...blocks) {
  let i = blocks.length;
  while (i--) insert(blocks[i], parent, 0);
}
function remove(block, parent) {
  if (block instanceof Node) {
    parent && parent.removeChild(block);
  } else if (isVaporComponent(block)) {
    unmountComponent(block, parent);
  } else if (isArray(block)) {
    for (let i = 0; i < block.length; i++) {
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
  if (!!!(process.env.NODE_ENV !== "production") && true) {
    throw new Error(
      "normalizeBlock should not be used in production code paths"
    );
  }
  const nodes = [];
  if (block instanceof Node) {
    nodes.push(block);
  } else if (isArray(block)) {
    block.forEach((child) => nodes.push(...normalizeBlock(child)));
  } else if (isVaporComponent(block)) {
    nodes.push(...normalizeBlock(block.block));
  } else {
    nodes.push(...normalizeBlock(block.nodes));
    block.anchor && nodes.push(block.anchor);
  }
  return nodes;
}

function normalizeEmitsOptions(comp) {
  const cached = comp.__emitsOptions;
  if (cached) return cached;
  const raw = comp.emits;
  if (!raw) return null;
  let normalized;
  if (isArray(raw)) {
    normalized = {};
    for (const key of raw) normalized[key] = null;
  } else {
    normalized = raw;
  }
  return comp.__emitsOptions = normalized;
}
function emit(instance, event, ...rawArgs) {
  baseEmit(
    instance,
    instance.rawProps || EMPTY_OBJ,
    propGetter,
    event,
    ...rawArgs
  );
}
function propGetter(rawProps, key) {
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    while (i--) {
      const source = resolveSource(dynamicSources[i]);
      if (hasOwn(source, key)) return resolveSource(source[key]);
    }
  }
  return rawProps[key] && resolveSource(rawProps[key]);
}

function renderEffect(fn, noLifecycle = false) {
  const instance = currentInstance;
  const scope = getCurrentScope();
  if (!!(process.env.NODE_ENV !== "production") && true && !scope && !isVaporComponent(instance)) {
    warn("renderEffect called without active EffectScope or Vapor instance.");
  }
  const hasUpdateHooks = instance && (instance.bu || instance.u);
  const renderEffectFn = noLifecycle ? fn : () => {
    if (!!(process.env.NODE_ENV !== "production") && instance) {
      startMeasure(instance, `renderEffect`);
    }
    const prev = currentInstance;
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
    if (!!(process.env.NODE_ENV !== "production") && instance) {
      startMeasure(instance, `renderEffect`);
    }
  };
  const effect = new ReactiveEffect(renderEffectFn);
  const job = () => effect.dirty && effect.run();
  if (instance) {
    if (!!(process.env.NODE_ENV !== "production")) {
      effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
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
  const propsOptions = normalizePropsOptions(comp)[0];
  const emitsOptions = normalizeEmitsOptions(comp);
  const isProp = propsOptions ? (key) => isString(key) && hasOwn(propsOptions, camelize(key)) : NO;
  const isAttr = propsOptions ? (key) => key !== "$" && !isProp(key) && !isEmitListener(emitsOptions, key) : YES;
  const getProp = (instance, key) => {
    if (key === "__v_isReactive") return true;
    if (!isProp(key)) return;
    const rawProps = instance.rawProps;
    const dynamicSources = rawProps.$;
    if (dynamicSources) {
      let i = dynamicSources.length;
      let source, isDynamic, rawKey;
      while (i--) {
        source = dynamicSources[i];
        isDynamic = isFunction(source);
        source = isDynamic ? source() : source;
        for (rawKey in source) {
          if (camelize(rawKey) === key) {
            return resolvePropValue(
              propsOptions,
              key,
              isDynamic ? source[rawKey] : source[rawKey](),
              instance,
              resolveDefault
            );
          }
        }
      }
    }
    for (const rawKey in rawProps) {
      if (camelize(rawKey) === key) {
        return resolvePropValue(
          propsOptions,
          key,
          rawProps[rawKey](),
          instance,
          resolveDefault
        );
      }
    }
    return resolvePropValue(
      propsOptions,
      key,
      void 0,
      instance,
      resolveDefault,
      true
    );
  };
  const propsHandlers = propsOptions ? {
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
  if (!!(process.env.NODE_ENV !== "production") && propsOptions) {
    Object.assign(propsHandlers, {
      set: propsSetDevTrap,
      deleteProperty: propsDeleteDevTrap
    });
  }
  const getAttr = (target, key) => {
    if (!isProp(key) && !isEmitListener(emitsOptions, key)) {
      return getAttrFromRawProps(target, key);
    }
  };
  const hasAttr = (target, key) => {
    if (isAttr(key)) {
      return hasAttrFromRawProps(target, key);
    } else {
      return false;
    }
  };
  const attrsHandlers = {
    get: (target, key) => getAttr(target.rawProps, key),
    has: (target, key) => hasAttr(target.rawProps, key),
    ownKeys: (target) => getKeysFromRawProps(target.rawProps).filter(isAttr),
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
  if (!!(process.env.NODE_ENV !== "production")) {
    Object.assign(attrsHandlers, {
      set: propsSetDevTrap,
      deleteProperty: propsDeleteDevTrap
    });
  }
  return comp.__propsHandlers = [propsHandlers, attrsHandlers];
}
function getAttrFromRawProps(rawProps, key) {
  if (key === "$") return;
  const merged = key === "class" || key === "style" ? [] : void 0;
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source, isDynamic;
    while (i--) {
      source = dynamicSources[i];
      isDynamic = isFunction(source);
      source = isDynamic ? source() : source;
      if (hasOwn(source, key)) {
        const value = isDynamic ? source[key] : source[key]();
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
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    while (i--) {
      const source = resolveSource(dynamicSources[i]);
      if (source && hasOwn(source, key)) {
        return true;
      }
    }
  }
  return hasOwn(rawProps, key);
}
function getKeysFromRawProps(rawProps) {
  const keys = [];
  for (const key in rawProps) {
    if (key !== "$") keys.push(key);
  }
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source;
    while (i--) {
      source = resolveSource(dynamicSources[i]);
      for (const key in source) {
        keys.push(key);
      }
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
  return comp.__propsOptions = [normalized, needCastKeys];
}
function resolveDefault(factory, instance) {
  const prev = currentInstance;
  simpleSetCurrentInstance(instance);
  const res = factory.call(null, instance.props);
  simpleSetCurrentInstance(prev, instance);
  return res;
}
function hasFallthroughAttrs(comp, rawProps) {
  if (rawProps) {
    if (rawProps.$ || !comp.props) {
      return true;
    } else {
      const propsOptions = normalizePropsOptions(comp)[0];
      for (const key in rawProps) {
        if (!hasOwn(propsOptions, camelize(key))) {
          return true;
        }
      }
    }
  }
  return false;
}
function setupPropsValidation(instance) {
  const rawProps = instance.rawProps;
  if (!rawProps) return;
  renderEffect(
    () => {
      pushWarningContext(instance);
      validateProps(
        resolveDynamicProps(rawProps),
        instance.props,
        normalizePropsOptions(instance.type)[0]
      );
      popWarningContext();
    },
    true
    /* noLifecycle */
  );
}
function resolveDynamicProps(props) {
  const mergedRawProps = {};
  for (const key in props) {
    if (key !== "$") {
      mergedRawProps[key] = props[key]();
    }
  }
  if (props.$) {
    for (const source of props.$) {
      const isDynamic = isFunction(source);
      const resolved = isDynamic ? source() : source;
      for (const key in resolved) {
        const value = isDynamic ? resolved[key] : resolved[key]();
        if (key === "class" || key === "style") {
          const existing = mergedRawProps[key];
          if (isArray(existing)) {
            existing.push(value);
          } else {
            mergedRawProps[key] = [existing, value];
          }
        } else {
          mergedRawProps[key] = value;
        }
      }
    }
  }
  return mergedRawProps;
}
function propsSetDevTrap(_, key) {
  warn(
    `Attempt to mutate prop ${JSON.stringify(key)} failed. Props are readonly.`
  );
  return true;
}
function propsDeleteDevTrap(_, key) {
  warn(
    `Attempt to delete prop ${JSON.stringify(key)} failed. Props are readonly.`
  );
  return true;
}
const rawPropsProxyHandlers = {
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

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
  return () => el.removeEventListener(event, handler, options);
}
function on(el, event, handler, options = {}) {
  addEventListener(el, event, handler, options);
  if (options.effect) {
    onEffectCleanup(() => {
      el.removeEventListener(event, handler, options);
    });
  }
}
function delegate(el, event, handler) {
  const key = `$evt${event}`;
  const existing = el[key];
  if (existing) {
    if (isArray(existing)) {
      existing.push(handler);
    } else {
      el[key] = [existing, handler];
    }
  } else {
    el[key] = handler;
  }
}
const delegatedEvents = /* @__PURE__ */ Object.create(null);
const delegateEvents = (...names) => {
  for (const name of names) {
    if (!delegatedEvents[name]) {
      delegatedEvents[name] = true;
      document.addEventListener(name, delegatedEventHandler);
    }
  }
};
const delegatedEventHandler = (e) => {
  let node = e.composedPath && e.composedPath()[0] || e.target;
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
    const handlers = node[`$evt${e.type}`];
    if (handlers) {
      if (isArray(handlers)) {
        for (const handler of handlers) {
          if (!node.disabled) {
            handler(e);
            if (e.cancelBubble) return;
          }
        }
      } else {
        handlers(e);
        if (e.cancelBubble) return;
      }
    }
    node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
  }
};
function setDynamicEvents(el, events) {
  for (const name in events) {
    on(el, name, events[name], { effect: true });
  }
}

const hasFallthroughKey = (key) => currentInstance.hasFallthrough && key in currentInstance.attrs;
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
  if (value !== el[`$${key}`]) {
    el[`$${key}`] = value;
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
  const prev = el[key];
  if (value === prev) {
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof prev;
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
    if (!!(process.env.NODE_ENV !== "production") && !needRemove) {
      warn(
        `Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}
function setClass(el, value) {
  if (el.$root) {
    setClassIncremental(el, value);
  } else if ((value = normalizeClass(value)) !== el.$cls) {
    el.className = el.$cls = value;
  }
}
function setClassIncremental(el, value) {
  const cacheKey = `$clsi${isApplyingFallthroughProps ? "$" : ""}`;
  const prev = el[cacheKey];
  if ((value = el[cacheKey] = normalizeClass(value)) !== prev) {
    const nextList = value.split(/\s+/);
    if (value) {
      el.classList.add(...nextList);
    }
    if (prev) {
      for (const cls of prev.split(/\s+/)) {
        if (!nextList.includes(cls)) el.classList.remove(cls);
      }
    }
  }
}
function setStyle(el, value) {
  if (el.$root) {
    setStyleIncremental(el, value);
  } else {
    const prev = el.$sty;
    value = el.$sty = normalizeStyle(value);
    patchStyle(el, prev, value);
  }
}
function setStyleIncremental(el, value) {
  const cacheKey = `$styi${isApplyingFallthroughProps ? "$" : ""}`;
  const prev = el[cacheKey];
  value = el[cacheKey] = isString(value) ? parseStringStyle(value) : normalizeStyle(value);
  patchStyle(el, prev, value);
  return value;
}
function setValue(el, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey("value")) {
    return;
  }
  el._value = value;
  const oldValue = el.tagName === "OPTION" ? el.getAttribute("value") : el.value;
  const newValue = value == null ? "" : value;
  if (oldValue !== newValue) {
    el.value = newValue;
  }
  if (value == null) {
    el.removeAttribute("value");
  }
}
function setText(el, value) {
  if (el.$txt !== value) {
    el.nodeValue = el.$txt = value;
  }
}
function setElementText(el, value) {
  if (el.$txt !== (value = toDisplayString(value))) {
    el.textContent = el.$txt = value;
  }
}
function setHtml(el, value) {
  value = value == null ? "" : value;
  if (el.$html !== value) {
    el.innerHTML = el.$html = value;
  }
}
function setDynamicProps(el, args) {
  const props = args.length > 1 ? mergeProps(...args) : args[0];
  const cacheKey = `$dprops${isApplyingFallthroughProps ? "$" : ""}`;
  const prevKeys = el[cacheKey];
  if (prevKeys) {
    for (const key of prevKeys) {
      if (!(key in props)) {
        setDynamicProp(el, key, null);
      }
    }
  }
  for (const key of el[cacheKey] = Object.keys(props)) {
    setDynamicProp(el, key, props[key]);
  }
}
function setDynamicProp(el, key, value) {
  const isSVG = false;
  if (key === "class") {
    setClass(el, value);
  } else if (key === "style") {
    setStyle(el, value);
  } else if (isOn(key)) {
    on(el, key[2].toLowerCase() + key.slice(3), value, { effect: true });
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, value, isSVG)) {
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
let isOptimized = false;
function optimizePropertyLookup() {
  if (isOptimized) return;
  isOptimized = true;
  const proto = UniElement.prototype;
  proto.$evtclick = void 0;
  proto.$root = false;
  proto.$html = proto.$txt = proto.$cls = proto.$sty = Text.prototype.$txt = "";
}

const dynamicSlotsProxyHandlers = {
  get: getSlot,
  has: (target, key) => !!getSlot(target, key),
  getOwnPropertyDescriptor(target, key) {
    const slot = getSlot(target, key);
    if (slot) {
      return {
        configurable: true,
        enumerable: true,
        value: slot
      };
    }
  },
  ownKeys(target) {
    let keys = Object.keys(target);
    const dynamicSources = target.$;
    if (dynamicSources) {
      keys = keys.filter((k) => k !== "$");
      for (const source of dynamicSources) {
        if (isFunction(source)) {
          const slot = source();
          if (isArray(slot)) {
            for (const s of slot) keys.push(String(s.name));
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
  const dynamicSources = target.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source;
    while (i--) {
      source = dynamicSources[i];
      if (isFunction(source)) {
        const slot = source();
        if (slot) {
          if (isArray(slot)) {
            for (const s of slot) {
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
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const instance = currentInstance;
  const rawSlots = instance.rawSlots;
  const slotProps = rawProps ? new Proxy(rawProps, rawPropsProxyHandlers) : EMPTY_OBJ;
  let fragment;
  if (isRef(rawSlots._)) {
    fragment = instance.appContext.vapor.vdomSlot(
      rawSlots._,
      name,
      slotProps,
      instance,
      fallback
    );
  } else {
    fragment = !!(process.env.NODE_ENV !== "production") ? new DynamicFragment("slot") : new DynamicFragment();
    const isDynamicName = isFunction(name);
    const renderSlot = () => {
      const slot = getSlot(rawSlots, isFunction(name) ? name() : name);
      if (slot) {
        fragment.update(
          slot._bound || (slot._bound = () => {
            const slotContent = slot(slotProps);
            if (slotContent instanceof DynamicFragment) {
              slotContent.fallback = fallback;
            }
            return slotContent;
          })
        );
      } else {
        fragment.update(fallback);
      }
    };
    if (isDynamicName || rawSlots.$) {
      renderEffect(renderSlot);
    } else {
      renderSlot();
    }
  }
  if (!isHydrating && _insertionParent) {
    insert(fragment, _insertionParent, _insertionAnchor);
  }
  return fragment;
}

function hmrRerender(instance) {
  const normalized = normalizeBlock(instance.block);
  const parent = normalized[0].parentNode;
  const anchor = normalized[normalized.length - 1].nextSibling;
  remove(instance.block, parent);
  const prev = currentInstance;
  simpleSetCurrentInstance(instance);
  pushWarningContext(instance);
  devRender(instance);
  popWarningContext();
  simpleSetCurrentInstance(prev, instance);
  insert(instance.block, parent, anchor);
}
function hmrReload(instance, newComp) {
  const normalized = normalizeBlock(instance.block);
  const parent = normalized[0].parentNode;
  const anchor = normalized[normalized.length - 1].nextSibling;
  unmountComponent(instance, parent);
  const prev = currentInstance;
  simpleSetCurrentInstance(instance.parent);
  const newInstance = createComponent(
    newComp,
    instance.rawProps,
    instance.rawSlots,
    instance.isSingleRoot
  );
  simpleSetCurrentInstance(prev, instance.parent);
  mountComponent(newInstance, parent, anchor);
}

function createComponent(component, rawProps, rawSlots, isSingleRoot, appContext = currentInstance && currentInstance.appContext || emptyContext) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  if (appContext.vapor && !component.__vapor) {
    const frag = appContext.vapor.vdomMount(
      component,
      rawProps,
      rawSlots
    );
    if (!isHydrating && _insertionParent) {
      insert(frag, _insertionParent, _insertionAnchor);
    }
    return frag;
  }
  if (isSingleRoot && component.inheritAttrs !== false && isVaporComponent(currentInstance) && currentInstance.hasFallthrough) {
    const attrs = currentInstance.attrs;
    if (rawProps) {
      (rawProps.$ || (rawProps.$ = [])).push(
        () => attrs
      );
    } else {
      rawProps = { $: [() => attrs] };
    }
  }
  const instance = new VaporComponentInstance(
    component,
    rawProps,
    rawSlots,
    appContext
  );
  if (!!(process.env.NODE_ENV !== "production")) {
    pushWarningContext(instance);
    startMeasure(instance, `init`);
    instance.propsOptions = normalizePropsOptions(component);
    instance.emitsOptions = normalizeEmitsOptions(component);
  }
  const prev = currentInstance;
  simpleSetCurrentInstance(instance);
  pauseTracking();
  if (!!(process.env.NODE_ENV !== "production")) {
    setupPropsValidation(instance);
  }
  instance.ctx = { _: instance };
  instance.data = EMPTY_OBJ;
  instance.setupState = EMPTY_OBJ;
  instance.setupContext = null;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { initNativePage, initFontFace } = appContext.config.uniX || {};
  if (initNativePage) {
    initNativePage(instance.proxy);
  }
  if (initFontFace) {
    initFontFace(instance.proxy);
  }
  const setupFn = isFunction(component) ? component : component.setup;
  const setupResult = setupFn ? callWithErrorHandling(setupFn, instance, 0, [
    instance.props,
    instance
  ]) || EMPTY_OBJ : EMPTY_OBJ;
  if (!!(process.env.NODE_ENV !== "production") && !isBlock(setupResult)) {
    if (isFunction(component)) {
      warn(`Functional vapor component must return a block directly.`);
      instance.block = [];
    } else if (!component.render) {
      warn(
        `Vapor component setup() returned non-block value, and has no render function.`
      );
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
      instance.block = callWithErrorHandling(
        component.render,
        instance,
        1
      );
    } else {
      instance.block = setupResult;
    }
  }
  if (instance.hasFallthrough && component.inheritAttrs !== false && Object.keys(instance.attrs).length) {
    const el = getRootElement(instance);
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
  if (!!(process.env.NODE_ENV !== "production")) {
    popWarningContext();
    endMeasure(instance, "init");
  }
  onScopeDispose(() => unmountComponent(instance), true);
  if (!isHydrating && _insertionParent) {
    mountComponent(instance, _insertionParent, _insertionAnchor);
  }
  return instance;
}
let isApplyingFallthroughProps = false;
function devRender(instance) {
  instance.block = callWithErrorHandling(
    instance.type.render,
    instance,
    1,
    [
      instance.setupState,
      instance.props,
      instance.emit,
      instance.attrs,
      instance.slots
    ]
  ) || [];
}
const emptyContext = {
  app: null,
  config: {},
  provides: /* @__PURE__ */ Object.create(null)
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
    this.scope = new EffectScope$1(true);
    this.emit = emit.bind(null, this);
    this.expose = expose.bind(null, this);
    this.refs = EMPTY_OBJ;
    this.emitted = this.exposed = this.exposeProxy = this.propsDefaults = this.suspense = null;
    this.isMounted = this.isUnmounted = this.isUpdating = this.isDeactivated = false;
    this.rawProps = rawProps || EMPTY_OBJ;
    this.hasFallthrough = hasFallthroughAttrs(comp, rawProps);
    if (rawProps || comp.props) {
      const [propsHandlers, attrsHandlers] = getPropsProxyHandlers(comp);
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
  $waitNativeRender(fn) {
  }
}
function isVaporComponent(value) {
  return value instanceof VaporComponentInstance;
}
function createComponentWithFallback(comp, rawProps, rawSlots, isSingleRoot) {
  if (!isString(comp)) {
    return createComponent(comp, rawProps, rawSlots, isSingleRoot);
  }
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const el = document.createElement(comp);
  el.$root = isSingleRoot;
  if (rawProps) {
    renderEffect(() => {
      setDynamicProps(el, [resolveDynamicProps(rawProps)]);
    });
  }
  if (rawSlots) {
    if (rawSlots.$) ; else {
      insert(getSlot(rawSlots, "default")(), el);
    }
  }
  if (!isHydrating && _insertionParent) {
    insert(el, _insertionParent, _insertionAnchor);
  }
  return el;
}
function mountComponent(instance, parent, anchor) {
  if (!!(process.env.NODE_ENV !== "production")) {
    startMeasure(instance, `mount`);
  }
  if (instance.bm) invokeArrayFns(instance.bm);
  insert(instance.block, parent, anchor);
  if (instance.m) queuePostFlushCb(() => invokeArrayFns(instance.m));
  instance.isMounted = true;
  if (!!(process.env.NODE_ENV !== "production")) {
    endMeasure(instance, `mount`);
  }
}
function unmountComponent(instance, parentNode) {
  if (instance.isMounted && !instance.isUnmounted) {
    if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) {
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
function getRootElement({
  block
}) {
  if (block instanceof Element) {
    return block;
  }
  if (block instanceof DynamicFragment) {
    const { nodes } = block;
    if (nodes instanceof Element && nodes.$root) {
      return nodes;
    }
  }
}

let _createApp;
const mountApp = (app, container) => {
  optimizePropertyLookup();
  if (container.nodeType === 1) {
    if (!!(process.env.NODE_ENV !== "production") && container.childNodes.length) {
      warn("mount target container is not empty and will be cleared.");
    }
    container.textContent = "";
  }
  const instance = createComponent(
    app._component,
    app._props,
    null,
    false,
    app._context
  );
  mountComponent(instance, container);
  flushOnAppMount();
  return instance;
};
let _hydrateApp;
const hydrateApp = (app, container) => {
  optimizePropertyLookup();
  let instance;
  withHydration(container, () => {
    instance = createComponent(
      app._component,
      app._props,
      null,
      false,
      app._context
    );
    mountComponent(instance, container);
    flushOnAppMount();
  });
  return instance;
};
const unmountApp = (app) => {
  unmountComponent(app._instance, app._container);
};
function prepareApp() {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
}
function postPrepareApp(app) {
  if (!!(process.env.NODE_ENV !== "production")) {
    app.config.globalProperties = new Proxy(
      {},
      {
        set() {
          warn(`app.config.globalProperties is not supported in vapor mode.`);
          return false;
        }
      }
    );
  }
}
const createVaporApp = (comp, props) => {
  prepareApp();
  if (!_createApp) _createApp = createAppAPI(mountApp, unmountApp, getExposed);
  const app = _createApp(comp, props);
  postPrepareApp(app);
  return app;
};
const createVaporSSRApp = (comp, props) => {
  prepareApp();
  if (!_hydrateApp)
    _hydrateApp = createAppAPI(hydrateApp, unmountApp, getExposed);
  const app = _hydrateApp(comp, props);
  postPrepareApp(app);
  return app;
};

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineVaporComponent(comp, extraOptions) {
  if (isFunction(comp)) {
    return /* @__PURE__ */ (() => extend({ name: comp.name }, extraOptions, {
      setup: comp,
      __vapor: true
    }))();
  }
  comp.__vapor = true;
  return comp;
}

const vaporInteropImpl = {
  mount(vnode, container, anchor, parentComponent) {
    const selfAnchor = vnode.el = vnode.anchor = createTextNode();
    container.insertBefore(selfAnchor, anchor);
    const prev = currentInstance;
    simpleSetCurrentInstance(parentComponent);
    const propsRef = shallowRef(vnode.props);
    const slotsRef = shallowRef(vnode.children);
    const instance = vnode.component = createComponent(
      vnode.type,
      {
        $: [() => propsRef.value]
      },
      {
        _: slotsRef
        // pass the slots ref
      }
    );
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
      const instance = n2.component;
      instance.rawPropsRef.value = n2.props;
      instance.rawSlotsRef.value = n2.children;
    }
  },
  unmount(vnode, doRemove) {
    const container = doRemove ? vnode.anchor.parentNode : void 0;
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
      const selfAnchor = n2.el = n2.anchor = createTextNode();
      insert(selfAnchor, container, anchor);
      const { slot, fallback } = n2.vs;
      const propsRef = n2.vs.ref = shallowRef(n2.props);
      const slotBlock = slot(new Proxy(propsRef, vaporSlotPropsProxyHandler));
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
const vaporSlotPropsProxyHandler = {
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
const vaporSlotsProxyHandler = {
  get(target, key) {
    if (key === "_vapor") {
      return target;
    } else {
      return target[key];
    }
  }
};
function createVDOMComponent(internals, component, rawProps, rawSlots) {
  const frag = new VaporFragment([]);
  const vnode = createVNode(
    component,
    rawProps && new Proxy(rawProps, rawPropsProxyHandlers)
  );
  const wrapper = new VaporComponentInstance(
    { props: component.props },
    rawProps,
    rawSlots
  );
  vnode.vi = (instance) => {
    instance.props = shallowReactive(wrapper.props);
    const attrs = instance.attrs = createInternalObject();
    for (const key in wrapper.attrs) {
      if (!isEmitListener(instance.emitsOptions, key)) {
        attrs[key] = wrapper.attrs[key];
      }
    }
    instance.slots = wrapper.slots === EMPTY_OBJ ? EMPTY_OBJ : new Proxy(wrapper.slots, vaporSlotsProxyHandler);
  };
  let isMounted = false;
  const parentInstance = currentInstance;
  const unmount = (parentNode) => {
    internals.umt(vnode.component, null, !!parentNode);
  };
  frag.insert = (parentNode, anchor) => {
    if (!isMounted) {
      internals.mt(
        vnode,
        parentNode,
        anchor,
        parentInstance,
        null,
        void 0,
        false
      );
      onScopeDispose$1(unmount, true);
      isMounted = true;
    } else {
      internals.m(
        vnode,
        parentNode,
        anchor,
        2,
        parentInstance
      );
    }
  };
  frag.remove = unmount;
  return frag;
}
function renderVDOMSlot(internals, slotsRef, name, props, parentComponent, fallback) {
  const frag = new VaporFragment([]);
  let isMounted = false;
  let fallbackNodes;
  let oldVNode = null;
  frag.insert = (parentNode, anchor) => {
    if (!isMounted) {
      renderEffect(() => {
        const vnode = renderSlot(
          slotsRef.value,
          isFunction(name) ? name() : name,
          props
        );
        if (vnode.children.length) {
          if (fallbackNodes) {
            remove(fallbackNodes, parentNode);
            fallbackNodes = void 0;
          }
          internals.p(
            oldVNode,
            vnode,
            parentNode,
            anchor,
            parentComponent
          );
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
      internals.m(
        oldVNode,
        parentNode,
        anchor,
        2,
        parentComponent
      );
    }
    frag.remove = (parentNode2) => {
      if (fallbackNodes) {
        remove(fallbackNodes, parentNode2);
      } else if (oldVNode) {
        internals.um(oldVNode, parentComponent, null);
      }
    };
  };
  return frag;
}
const vaporInteropPlugin = (app) => {
  const internals = ensureRenderer().internals;
  app._context.vapor = extend(vaporInteropImpl, {
    vdomMount: createVDOMComponent.bind(null, internals),
    vdomUnmount: internals.umt,
    vdomSlot: renderVDOMSlot.bind(null, internals)
  });
  const mount = app.mount;
  app.mount = (...args) => {
    optimizePropertyLookup();
    return mount(...args);
  };
};

let t;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function template(html, root) {
  let node;
  return () => {
    if (isHydrating) {
      if (!!(process.env.NODE_ENV !== "production") && !currentHydrationNode) {
        throw new Error("No current hydration node");
      }
      return adoptTemplate(currentHydrationNode, html);
    }
    if (html[0] !== "<") {
      return createTextNode(html);
    }
    if (!node) {
      t = t || document.createElement("template");
      t.innerHTML = html;
      node = child(t.content);
    }
    const ret = node.cloneNode(true);
    if (root) ret.$root = true;
    return ret;
  };
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function factory(doc, factory2, root) {
  return () => {
    const el = factory2(doc);
    if (root) {
      el.ext.set("$root", true);
    }
    return el;
  };
}

function createIf(condition, b1, b2, once) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  let frag;
  if (once) {
    frag = condition() ? b1() : b2 ? b2() : [];
  } else {
    frag = !!(process.env.NODE_ENV !== "production") ? new DynamicFragment("if") : new DynamicFragment();
    renderEffect(() => frag.update(condition() ? b1 : b2));
  }
  if (!isHydrating && _insertionParent) {
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
const createFor = (src, renderItem, getKey, flags = 0) => {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  let isMounted = false;
  let oldBlocks = [];
  let newBlocks;
  let parent;
  const parentAnchor = !!(process.env.NODE_ENV !== "production") ? createComment("for") : createTextNode();
  const frag = new VaporFragment(oldBlocks);
  const instance = currentInstance;
  const canUseFastRemove = flags & 1;
  const isComponent = flags & 2;
  if (!!(process.env.NODE_ENV !== "production") && !instance) {
    warn("createFor() can only be used inside setup()");
  }
  const renderList = () => {
    const source = normalizeSource(src());
    const newLength = source.values.length;
    const oldLength = oldBlocks.length;
    newBlocks = new Array(newLength);
    pauseTracking();
    if (!isMounted) {
      isMounted = true;
      for (let i = 0; i < newLength; i++) {
        mount(source, i);
      }
    } else {
      parent = parent || parentAnchor.parentNode;
      if (!oldLength) {
        for (let i = 0; i < newLength; i++) {
          mount(source, i);
        }
      } else if (!newLength) {
        const doRemove = !canUseFastRemove;
        for (let i = 0; i < oldLength; i++) {
          unmount(oldBlocks[i], doRemove);
        }
        if (canUseFastRemove) {
          parent.textContent = "";
          parent.appendChild(parentAnchor);
        }
      } else if (!getKey) {
        const commonLength = Math.min(newLength, oldLength);
        for (let i = 0; i < commonLength; i++) {
          update(newBlocks[i] = oldBlocks[i], getItem(source, i)[0]);
        }
        for (let i = oldLength; i < newLength; i++) {
          mount(source, i);
        }
        for (let i = newLength; i < oldLength; i++) {
          unmount(oldBlocks[i]);
        }
      } else {
        let i = 0;
        let e1 = oldLength - 1;
        let e2 = newLength - 1;
        while (i <= e1 && i <= e2) {
          if (tryPatchIndex(source, i)) {
            i++;
          } else {
            break;
          }
        }
        while (i <= e1 && i <= e2) {
          if (tryPatchIndex(source, i)) {
            e1--;
            e2--;
          } else {
            break;
          }
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < newLength ? normalizeAnchor(newBlocks[nextPos].nodes) : parentAnchor;
            while (i <= e2) {
              mount(source, i, anchor);
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(oldBlocks[i]);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = /* @__PURE__ */ new Map();
          for (i = s2; i <= e2; i++) {
            keyToNewIndexMap.set(getKey(...getItem(source, i)), i);
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched).fill(0);
          for (i = s1; i <= e1; i++) {
            const prevBlock = oldBlocks[i];
            if (patched >= toBePatched) {
              unmount(prevBlock);
            } else {
              const newIndex = keyToNewIndexMap.get(prevBlock.key);
              if (newIndex == null) {
                unmount(prevBlock);
              } else {
                newIndexToOldIndexMap[newIndex - s2] = i + 1;
                if (newIndex >= maxNewIndexSoFar) {
                  maxNewIndexSoFar = newIndex;
                } else {
                  moved = true;
                }
                update(
                  newBlocks[newIndex] = prevBlock,
                  ...getItem(source, newIndex)
                );
                patched++;
              }
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : [];
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const anchor = nextIndex + 1 < newLength ? normalizeAnchor(newBlocks[nextIndex + 1].nodes) : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              mount(source, nextIndex, anchor);
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                insert(newBlocks[nextIndex].nodes, parent, anchor);
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
  const needKey = renderItem.length > 1;
  const needIndex = renderItem.length > 2;
  const mount = (source, idx, anchor = parentAnchor) => {
    const [item, key, index] = getItem(source, idx);
    const itemRef = shallowRef$1(item);
    const keyRef = needKey ? shallowRef$1(key) : void 0;
    const indexRef = needIndex ? shallowRef$1(index) : void 0;
    let nodes;
    let scope;
    if (isComponent) {
      nodes = renderItem(itemRef, keyRef, indexRef);
    } else {
      scope = new EffectScope();
      nodes = scope.run(
        () => renderItem(itemRef, keyRef, indexRef)
      );
    }
    const block = newBlocks[idx] = new ForBlock(
      nodes,
      scope,
      itemRef,
      keyRef,
      indexRef,
      getKey && getKey(item, key, index)
    );
    if (parent) insert(block.nodes, parent, anchor);
    return block;
  };
  const tryPatchIndex = (source, idx) => {
    const block = oldBlocks[idx];
    const [item, key, index] = getItem(source, idx);
    if (block.key === getKey(item, key, index)) {
      update(newBlocks[idx] = block, item);
      return true;
    }
  };
  const update = ({ itemRef, keyRef, indexRef }, newItem, newKey, newIndex) => {
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
  const unmount = ({ nodes, scope }, doRemove = true) => {
    scope && scope.stop();
    doRemove && remove(nodes, parent);
  };
  if (flags & 4) {
    renderList();
  } else {
    renderEffect(renderList);
  }
  if (!isHydrating && _insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
};
function createForSlots(rawSource, getSlot) {
  const source = normalizeSource(rawSource);
  const sourceLength = source.values.length;
  const slots = new Array(sourceLength);
  for (let i = 0; i < sourceLength; i++) {
    slots[i] = getSlot(...getItem(source, i));
  }
  return slots;
}
function normalizeSource(source) {
  let values = source;
  let needsWrap = false;
  let isReadonlySource = false;
  let keys;
  if (isArray(source)) {
    if (isReactive(source)) {
      needsWrap = !isShallow(source);
      values = shallowReadArray(source);
      isReadonlySource = isReadonly(source);
    }
  } else if (isString(source)) {
    values = source.split("");
  } else if (typeof source === "number") {
    if (!!(process.env.NODE_ENV !== "production") && !Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
    }
    values = new Array(source);
    for (let i = 0; i < source; i++) values[i] = i + 1;
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      values = Array.from(source);
    } else {
      keys = Object.keys(source);
      values = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        values[i] = source[keys[i]];
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
function getItem({ keys, values, needsWrap, isReadonlySource }, idx) {
  const value = needsWrap ? isReadonlySource ? toReadonly(toReactive(values[idx])) : toReactive(values[idx]) : values[idx];
  if (keys) {
    return [value, keys[idx], idx];
  } else {
    return [value, idx, void 0];
  }
}
function normalizeAnchor(node) {
  if (node instanceof Node) {
    return node;
  } else if (isArray(node)) {
    return normalizeAnchor(node[0]);
  } else if (isVaporComponent(node)) {
    return normalizeAnchor(node.block);
  } else {
    return normalizeAnchor(node.nodes);
  }
}
function getRestElement(val, keys) {
  const res = {};
  for (const key in val) {
    if (!keys.includes(key)) res[key] = val[key];
  }
  return res;
}
function getDefaultValue(val, defaultVal) {
  return val === void 0 ? defaultVal : val;
}

function createTemplateRefSetter() {
  const instance = currentInstance;
  return (...args) => setRef(instance, ...args);
}
function setRef(instance, el, ref, oldRef, refFor = false) {
  if (!instance || instance.isUnmounted) return;
  const setupState = !!(process.env.NODE_ENV !== "production") ? instance.setupState || {} : null;
  const refValue = getRefValue(el);
  const refs = instance.refs === EMPTY_OBJ ? instance.refs = {} : instance.refs;
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (!!(process.env.NODE_ENV !== "production") && hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef$1(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    const invokeRefSetter = (value) => {
      callWithErrorHandling(ref, currentInstance, 12, [
        value,
        refs
      ]);
    };
    invokeRefSetter(refValue);
    onScopeDispose(() => invokeRefSetter());
  } else {
    const _isString = isString(ref);
    const _isRef = isRef$1(ref);
    let existing;
    if (_isString || _isRef) {
      const doSet = () => {
        if (refFor) {
          existing = _isString ? !!(process.env.NODE_ENV !== "production") && hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (!isArray(existing)) {
            existing = [refValue];
            if (_isString) {
              refs[ref] = existing;
              if (!!(process.env.NODE_ENV !== "production") && hasOwn(setupState, ref)) {
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
          if (!!(process.env.NODE_ENV !== "production") && hasOwn(setupState, ref)) {
            setupState[ref] = refValue;
          }
        } else if (_isRef) {
          ref.value = refValue;
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn("Invalid template ref type:", ref, `(${typeof ref})`);
        }
      };
      doSet.id = -1;
      queuePostFlushCb(doSet);
      onScopeDispose(() => {
        queuePostFlushCb(() => {
          if (isArray(existing)) {
            remove$1(existing, refValue);
          } else if (_isString) {
            refs[ref] = null;
            if (!!(process.env.NODE_ENV !== "production") && hasOwn(setupState, ref)) {
              setupState[ref] = null;
            }
          } else if (_isRef) {
            ref.value = null;
          }
        });
      });
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn("Invalid template ref type:", ref, `(${typeof ref})`);
    }
  }
  return ref;
}
const getRefValue = (el) => {
  if (isVaporComponent(el)) {
    return getExposed(el) || el;
  } else if (el instanceof DynamicFragment) {
    return getRefValue(el.nodes);
  }
  return el;
};

function createDynamicComponent(getter, rawProps, rawSlots, isSingleRoot) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const frag = !!(process.env.NODE_ENV !== "production") ? new DynamicFragment("dynamic-component") : new DynamicFragment();
  renderEffect(() => {
    const value = getter();
    frag.update(
      () => createComponentWithFallback(
        resolveDynamicComponent(value),
        rawProps,
        rawSlots,
        isSingleRoot
      ),
      value
    );
  });
  if (!isHydrating && _insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
}

function applyVShow(target, source) {
  if (isVaporComponent(target)) {
    return applyVShow(target.block, source);
  }
  if (isArray(target) && target.length === 1) {
    return applyVShow(target[0], source);
  }
  if (target instanceof DynamicFragment) {
    const update = target.update;
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
  if (isArray(target) && target.length === 1) {
    return setDisplay(target[0], value);
  }
  if (target instanceof DynamicFragment) {
    return setDisplay(target.nodes, value);
  }
  if (target instanceof Element) {
    const el = target;
    if (!(vShowOriginalDisplay in el)) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    }
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn(
      `v-show used on component with non-single-element root node and will be ignored.`
    );
  }
}

function ensureMounted(cb) {
  if (currentInstance.isMounted) {
    cb();
  } else {
    onMounted(cb);
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
      vModelCheckboxUpdate(
        el,
        value,
        // #4096 array checkboxes need to be deep traversed
        traverse(value = get())
      );
    });
  });
};
const applyRadioModel = (el, get, set) => {
  addEventListener(el, "change", () => set(vModelGetValue(el)));
  ensureMounted(() => {
    let value;
    renderEffect(() => {
      if (value !== (value = get())) {
        el.checked = looseEqual(value, vModelGetValue(el));
      }
    });
  });
};
const applySelectModel = (el, get, set, modifiers) => {
  vModelSelectInit(el, get(), modifiers && modifiers.number, set);
  ensureMounted(() => {
    renderEffect(() => vModelSetSelected(el, traverse(get())));
  });
};
const applyDynamicModel = (el, get, set, modifiers) => {
  let apply = applyTextModel;
  if (el.tagName === "SELECT") {
    apply = applySelectModel;
  } else if (el.tagName === "TEXTAREA") {
    apply = applyTextModel;
  } else if (el.type === "checkbox") {
    apply = applyCheckboxModel;
  } else if (el.type === "radio") {
    apply = applyRadioModel;
  }
  apply(el, get, set, modifiers);
};

function withVaporDirectives(node, dirs) {
  for (const [dir, value, argument, modifiers] of dirs) {
    if (dir) {
      const ret = dir(node, value, argument, modifiers);
      if (ret) onScopeDispose$1(ret);
    }
  }
}

export { VaporFragment, applyCheckboxModel, applyDynamicModel, applyRadioModel, applySelectModel, applyTextModel, applyVShow, child, createComponent, createComponentWithFallback, createDynamicComponent, createFor, createForSlots, createIf, createSlot, createTemplateRefSetter, createTextNode, createVaporApp, createVaporSSRApp, defineVaporComponent, delegate, delegateEvents, factory, getDefaultValue, getRestElement, insert, isFragment, next, nthChild, on, prepend, remove, renderEffect, setAttr, setClass, setDOMProp, setDynamicEvents, setDynamicProps, setHtml, setInsertionState, setProp, setStyle, setText, setValue, template, unmountComponent, vaporInteropPlugin, withVaporDirectives };
