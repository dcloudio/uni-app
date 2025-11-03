/**
* @vue/runtime-vapor v3.6.0-alpha.2
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
import { warn as warn$2, currentInstance as currentInstance$1, startMeasure, setCurrentInstance, queuePostFlushCb, queueJob, ensureRenderer, shallowRef, simpleSetCurrentInstance, renderSlot, createVNode as createVNode$1, shallowReactive, createInternalObject, isEmitListener, onScopeDispose, baseEmit, baseNormalizePropsOptions, pushWarningContext as pushWarningContext$1, validateProps, popWarningContext as popWarningContext$1, resolvePropValue, isRef as isRef$1, registerHMR, PublicInstanceProxyHandlers, callWithErrorHandling as callWithErrorHandling$1, endMeasure, unregisterHMR, publicPropertiesMap, nextUid, EffectScope as EffectScope$1, expose, createAppAPI, initFeatureFlags, setDevtoolsHook as setDevtoolsHook$1, flushOnAppMount, resolveDynamicComponent, vShowOriginalDisplay, vShowHidden as vShowHidden$1, vModelTextInit, vModelCheckboxInit, vModelSelectInit, onMounted, vModelTextUpdate, vModelCheckboxUpdate, vModelGetValue, vModelSetSelected } from '@vue/runtime-dom';
import { isArray, hasOwn, invokeArrayFns, isString, isFunction, EMPTY_OBJ, isOn, isObject, extend, NOOP, parseStringStyle, camelize, canSetValueDirectly, toDisplayString, EMPTY_ARR, NO, YES, getGlobalThis, remove as remove$1, looseEqual } from '@vue/shared';
import { setActiveSub, EffectScope, ReactiveEffect, isRef, toRaw, isProxy, onEffectCleanup, proxyRefs, onScopeDispose as onScopeDispose$1, markRaw, watch, isReactive, isShallow, shallowReadArray, isReadonly, toReadonly, toReactive, shallowRef as shallowRef$1, traverse } from '@vue/reactivity';
import { normalizeClass, normalizeStyle as normalizeStyle$1 } from '@dcloudio/uni-shared';
import { expand } from '@dcloudio/uni-nvue-styler/dist/uni-nvue-styler.es';

let insertionParent;
let insertionAnchor;
function setInsertionState(parent, anchor) {
  insertionParent = parent;
  insertionAnchor = anchor;
}
function resetInsertionState() {
  insertionParent = insertionAnchor = void 0;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createTextNode(doc, value = "") {
  return doc.createTextNode(value);
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
      warn$2(`adopted: `, node);
      warn$2(`template: ${template}`);
      warn$2("hydration mismatch!");
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
    warn$2("Hydration mismatch in ", insertionParent);
  }
  resetInsertionState();
  currentHydrationNode = node;
}

const NODE_EXT_STYLES = "styles";
const NODE_EXT_PARENT_STYLES = "parentStyles";
const NODE_EXT_CLASS_STYLE = "classStyle";
const NODE_EXT_STYLE = "style";
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

function each(obj) {
  return Object.keys(obj);
}
function useCssStyles(componentStyles) {
  const normalized = {};
  if (!isArray(componentStyles)) {
    return normalized;
  }
  componentStyles.forEach((componentStyle) => {
    each(componentStyle).forEach((className) => {
      const parentStyles = componentStyle[className];
      const normalizedStyles = normalized[className] || (normalized[className] = {});
      each(parentStyles).forEach((parentSelector) => {
        const parentStyle = parentStyles[parentSelector];
        const normalizedStyle = normalizedStyles[parentSelector] || (normalizedStyles[parentSelector] = {});
        each(parentStyle).forEach((name) => {
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
  const classList = el && el.classList;
  return classList && classList.includes(calssName);
}
const TYPE_RE = /[+~> ]$/;
const PROPERTY_PARENT_NODE = "parentNode";
const PROPERTY_PREVIOUS_SIBLING = "previousSibling";
function isMatchParentSelector(parentSelector, el) {
  const classArray = parentSelector.split(".");
  for (let i = classArray.length - 1; i > 0; i--) {
    const item = classArray[i];
    const type = item[item.length - 1];
    const className = item.replace(TYPE_RE, "");
    if (type === "~" || type === " ") {
      const property = type === "~" ? PROPERTY_PREVIOUS_SIBLING : PROPERTY_PARENT_NODE;
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
const WEIGHT_IMPORTANT = 1e3;
function parseClassName({ styles, weights }, parentStyles, el) {
  each(parentStyles).forEach((parentSelector) => {
    if (parentSelector && el) {
      if (!isMatchParentSelector(parentSelector, el)) {
        return;
      }
    }
    const classWeight = parentSelector.split(".").length;
    const style = parentStyles[parentSelector];
    each(style).forEach((name) => {
      const value = style[name];
      const isImportant = name[0] === "!";
      if (isImportant) {
        name = name.slice(1);
      }
      const oldWeight = weights[name] || 0;
      const weight = classWeight + (isImportant ? WEIGHT_IMPORTANT : 0);
      if (weight >= oldWeight) {
        weights[name] = weight;
        styles.set(name, value);
      }
    });
  });
}
class ParseStyleContext {
  constructor() {
    this.styles = /* @__PURE__ */ new Map();
    this.weights = {};
  }
}
function parseClassListWithStyleSheet(classList, stylesheet, parentStylesheets, el = null) {
  const context = new ParseStyleContext();
  classList.forEach((className) => {
    const parentStyles = stylesheet && stylesheet[className];
    if (parentStyles) {
      parseClassName(context, parentStyles, el);
    }
  });
  if (parentStylesheets != null) {
    classList.forEach((className) => {
      const parentStylesheet = (parentStylesheets || []).find(
        (style) => style[className] !== null
      );
      const parentStyles = parentStylesheet && parentStylesheet[className];
      if (parentStyles != null) {
        parseClassName(context, parentStyles, el);
      }
    });
  }
  return context;
}
function parseClassStyles(el) {
  const styles = getExtraStyles(el);
  const parentStyles = getExtraParentStyles(el);
  if (styles == null && parentStyles == null || el.classList.length == 0) {
    return new ParseStyleContext();
  }
  return parseClassListWithStyleSheet(el.classList, styles, parentStyles, el);
}
function parseStyleSheet({
  type,
  appContext,
  root
}) {
  const component = type;
  const pageInstance = root;
  if (!pageInstance.componentStylesCache) {
    pageInstance.componentStylesCache = /* @__PURE__ */ new Map();
  }
  let cache = pageInstance.componentStylesCache.get(component);
  if (!cache) {
    const __globalStyles = appContext.provides.__globalStyles;
    if (appContext && isArray(__globalStyles)) {
      appContext.provides.__globalStyles = useCssStyles(__globalStyles);
    }
    const styles = [];
    if (appContext && __globalStyles) {
      const globalStyles = isArray(__globalStyles) ? __globalStyles : [__globalStyles];
      styles.push(...globalStyles);
    }
    const page = root && root.type;
    if (page && component !== page && isArray(page.styles)) {
      styles.push(...page.styles);
    }
    if (isArray(component.styles)) {
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
  const res = extendMap(/* @__PURE__ */ new Map(), classStyle);
  const style = getExtraStyle(el);
  if (style != null) {
    style.forEach((value, key) => {
      const weight = classStyleWeights[key];
      if (weight == null || weight < WEIGHT_IMPORTANT) {
        res.set(key, value);
      }
    });
  }
  return res;
}

const vShowHidden = Symbol("_vsh");

function patchClass(el, pre, next, instance = null) {
  if (!instance) {
    return;
  }
  const classList = next ? next.split(" ") : [];
  el.classList = classList;
  setExtraStyles(el, parseStyleSheet(instance));
  if (instance.parent != null && instance !== instance.root) {
    const isRootEl = (
      // @ts-expect-error
      instance.block === el || instance.subTree && el === instance.subTree.el
    );
    if (isRootEl) {
      setExtraParentStyles(
        el,
        instance.parent.type.styles
      );
    }
  }
  updateClassStyles(el);
}
function updateClassStyles(el) {
  if (el.parentNode == null || isCommentNode(el)) {
    return;
  }
  if (getExtraClassStyle(el) == null) {
    setExtraClassStyle(el, /* @__PURE__ */ new Map());
  }
  const oldClassStyle = getExtraClassStyle(el);
  oldClassStyle.forEach((_value, key) => {
    oldClassStyle.set(key, "");
  });
  const parseClassStylesResult = parseClassStyles(el);
  parseClassStylesResult.styles.forEach((value, key) => {
    oldClassStyle.set(key, value);
  });
  const styles = toStyle(el, oldClassStyle, parseClassStylesResult.weights);
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
    el.childNodes.forEach((child) => {
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
    this.anchor = doc.createComment(anchorLabel || "");
  }
  update(render, key = render) {
    if (key === this.current) {
      return;
    }
    this.current = key;
    const prevSub = setActiveSub();
    const parent = this.anchor.parentNode;
    if (this.scope) {
      this.scope.stop();
      parent && remove(this.nodes, parent);
    }
    if (render) {
      this.scope = new EffectScope();
      const start = Date.now();
      this.nodes = this.scope.run(render) || [];
      console.log("[VAPOR] dom create", Date.now() - start);
      const start2 = Date.now();
      if (parent) insert(this.nodes, parent, this.anchor);
      console.log("[VAPOR] dom insert", Date.now() - start2);
      console.log("[VAPOR] dom all", Date.now() - start);
    } else {
      this.scope = void 0;
      this.nodes = [];
    }
    if (this.fallback && !isValidBlock(this.nodes)) {
      parent && remove(this.nodes, parent);
      this.nodes = (this.scope || (this.scope = new EffectScope())).run(this.fallback) || [];
      parent && insert(this.nodes, parent, this.anchor);
    }
    setActiveSub(prevSub);
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

class RenderEffect extends ReactiveEffect {
  constructor(render) {
    super();
    this.render = render;
    const instance = currentInstance$1;
    if (!!(process.env.NODE_ENV !== "production") && true && !this.subs && !isVaporComponent(instance)) {
      warn$2("renderEffect called without active EffectScope or Vapor instance.");
    }
    const job = () => {
      if (this.dirty) {
        this.run();
      }
    };
    this.updateJob = () => {
      instance.isUpdating = false;
      instance.u && invokeArrayFns(instance.u);
    };
    if (instance) {
      if (!!(process.env.NODE_ENV !== "production")) {
        this.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
        this.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      }
      job.i = instance;
    }
    this.job = job;
    this.i = instance;
  }
  fn() {
    const instance = this.i;
    const scope = this.subs ? this.subs.sub : void 0;
    const hasUpdateHooks = instance && (instance.bu || instance.u);
    if (!!(process.env.NODE_ENV !== "production") && instance) {
      startMeasure(instance, `renderEffect`);
    }
    const prev = setCurrentInstance(instance, scope);
    if (hasUpdateHooks && instance.isMounted && !instance.isUpdating) {
      instance.isUpdating = true;
      instance.bu && invokeArrayFns(instance.bu);
      this.render();
      queuePostFlushCb(this.updateJob);
    } else {
      this.render();
    }
    setCurrentInstance(...prev);
    if (!!(process.env.NODE_ENV !== "production") && instance) {
      startMeasure(instance, `renderEffect`);
    }
  }
  notify() {
    const flags = this.flags;
    if (!(flags & 256)) {
      queueJob(this.job, this.i ? this.i.uid : void 0);
    }
  }
}
function renderEffect(fn, noLifecycle = false) {
  const effect = new RenderEffect(fn);
  if (noLifecycle) {
    effect.fn = fn;
  }
  effect.run();
}

const stack = [];
function pushWarningContext(ctx) {
  stack.push(ctx);
}
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
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy || instance,
        trace.map(
          ({ ctx }) => `at <${formatComponentName(instance, ctx.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  setActiveSub(prevSub);
  isWarning = false;
}
function getComponentTrace() {
  let currentCtx = stack[stack.length - 1];
  if (!currentCtx) {
    return [];
  }
  const normalizedStack = [];
  while (currentCtx) {
    const last = normalizedStack[0];
    if (last && last.ctx === currentCtx) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        ctx: currentCtx,
        recurseCount: 0
      });
    }
    if (isVNode(currentCtx)) {
      const parent = currentCtx.component && currentCtx.component.parent;
      currentCtx = parent && parent.vnode || parent;
    } else {
      currentCtx = currentCtx.parent;
    }
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ ctx, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const instance = isVNode(ctx) ? ctx.component : ctx;
  const isRoot = instance ? instance.parent == null : false;
  const open = ` at <${formatComponentName(instance, ctx.type, isRoot)}`;
  const close = `>` + postfix;
  return ctx.props ? [open, ...formatProps(ctx.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}

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
function handleError(err, instance, type, throwInDev = true) {
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy || instance;
    const errorInfo = !!(process.env.NODE_ENV !== "production") ? ErrorTypeStrings[type] || type : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
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
    const info = ErrorTypeStrings[type] || type;
    if (instance) {
      pushWarningContext(instance);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (instance) {
      popWarningContext();
    }
    if (err instanceof Error) {
      console.error(
        `---BEGIN:EXCEPTION---${err.message}
${err.stack || ""}---END:EXCEPTION---`
      );
    } else {
      console.error(err);
    }
  } else if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}

let devtools;
let buffer = [];
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-syntax
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        buffer = [];
      }
    }, 3e3);
  } else {
    buffer = [];
  }
}

let currentRenderingInstance = null;
let currentScopeId = null;

const isTeleport = (type) => type.__isTeleport;

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

const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");

const internalObjectProto = {};
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;

const isSuspense = (type) => type.__isSuspense;

const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment$1 = Symbol.for("v-cmt");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...args
  );
};
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
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
  if (!!(process.env.NODE_ENV !== "production") && vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (type == "button") {
    if (vnode.props == null) vnode.props = {};
    if (!vnode.props["hoverClass"] && !vnode.props["hover-class"]) {
      vnode.props["hoverClass"] = "button-hover";
    }
  }
  return vnode;
}
const createVNode = !!(process.env.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!!(process.env.NODE_ENV !== "production") && !type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment$1;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle$1(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (!!(process.env.NODE_ENV !== "production") && shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
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
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: !!(process.env.NODE_ENV !== "production") && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
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
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
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
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
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
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle$1([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
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

let currentInstance = null;
const getCurrentGenericInstance = () => currentRenderingInstance;

!!(process.env.NODE_ENV !== "production") ? {
  } : {
  };
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}

const warn = !!(process.env.NODE_ENV !== "production") ? warn$1 : NOOP;
!!(process.env.NODE_ENV !== "production") || true ? devtools : void 0;
!!(process.env.NODE_ENV !== "production") || true ? setDevtoolsHook : NOOP;

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler);
  return () => el.removeEventListener(event, handler);
}
function on(el, event, handler, options = {}) {
  addEventListener(el, event, handler);
  if (options.effect) {
    onEffectCleanup(() => {
      el.removeEventListener(event, handler);
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
const delegateEvents = (doc, ...names) => {
  for (const name of names) {
    if (!delegatedEvents[name]) {
      delegatedEvents[name] = true;
      doc.addEventListener(name, delegatedEventHandler);
    }
  }
};
const delegatedEventHandler = (e) => {
  let node = e.target;
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
          }
        }
      } else {
        handlers(e);
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

const processDeclaration = expand({ type: "uvue" }).Declaration;
function createDeclaration(prop, value) {
  const newValue = value + "";
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
  const decl = Object.assign(
    {},
    {
      replaceWith(newProps) {
        props = newProps;
      }
    },
    createDeclaration(name, value)
  );
  let props = [decl];
  processDeclaration(decl);
  return props;
}
function setStyle$1(expandRes) {
  const resArr = expandRes.map((item) => {
    return [item.prop, item.value];
  });
  const resMap = new Map(resArr);
  return resMap;
}
function parseStyleDecl(prop, value) {
  const val = normalizeStyle(prop, value);
  const res = setStyle$1(val);
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
  const batchedStyles = /* @__PURE__ */ new Map();
  const isPrevObj = prev && !isString(prev);
  if (isPrevObj) {
    const classStyle = getExtraClassStyle(el);
    const style = getExtraStyle(el);
    for (const key in prev) {
      if (next[key] == null) {
        const _key = key.startsWith("--") ? key : camelize(key);
        const value = classStyle != null && classStyle.has(_key) ? classStyle.get(_key) : "";
        parseStyleDecl(_key, value).forEach((value2, key2) => {
          batchedStyles.set(key2, value2);
          style && style.delete(key2);
        });
      }
    }
    for (const key in next) {
      const value = next[key];
      const prevValue = prev[key];
      if (!isSame(prevValue, value)) {
        const _key = key.startsWith("--") ? key : camelize(key);
        parseStyleDecl(_key, value).forEach((value2, key2) => {
          batchedStyles.set(key2, value2);
          style && style.set(key2, value2);
        });
      }
    }
  } else {
    for (const key in next) {
      const value = next[key];
      const _key = key.startsWith("--") ? key : camelize(key);
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

const hasFallthroughKey = (key) => currentInstance.hasFallthrough && key in currentInstance.attrs;
function setProp(el, key, value) {
  setAttr(el, key, value);
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
    el.$cls = value;
    patchClass(el, null, normalizeClass(value), getCurrentGenericInstance());
  }
}
function setClassIncremental(el, value) {
  const cacheKey = `$clsi${isApplyingFallthroughProps ? "$" : ""}`;
  const prev = el[cacheKey];
  if ((value = el[cacheKey] = normalizeClass(value)) !== prev) {
    const nextClassList = el.classList.slice(0);
    normalizeClass(value).split(/\s+/).forEach((cls) => {
      if (!nextClassList.includes(cls)) {
        nextClassList.push(cls);
      }
    });
    if (prev) {
      for (const cls of prev.split(/\s+/)) {
        if (!nextClassList.includes(cls)) {
          const index = nextClassList.indexOf(cls);
          if (index !== -1) {
            nextClassList.splice(index, 1);
          }
        }
      }
    }
    patchClass(el, null, nextClassList.join(" "), getCurrentGenericInstance());
  }
}
function setStyle(el, value) {
  if (el.$root) {
    setStyleIncremental(el, value);
  } else {
    const prev = el.$sty;
    value = el.$sty = normalizeStyle$1(value);
    patchStyle(el, prev, value);
  }
}
function setStyleIncremental(el, value) {
  const cacheKey = `$styi${isApplyingFallthroughProps ? "$" : ""}`;
  const prev = el[cacheKey];
  value = el[cacheKey] = isString(value) ? parseStringStyle(value) : normalizeStyle$1(value);
  patchStyle(el, prev, value);
  return value;
}
function setValue(el, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey("value")) {
    return;
  }
  const oldValue = el.getAnyAttribute("value");
  const newValue = value == null ? "" : value;
  if (oldValue !== newValue) {
    el.setAnyAttribute("value", newValue);
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
  if (key === "class") {
    setClass(el, value);
  } else if (key === "style") {
    setStyle(el, value);
  } else if (isOn(key)) {
    on(el, key[2].toLowerCase() + key.slice(3), value, { effect: true });
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
let isOptimized = false;
function optimizePropertyLookup() {
  if (isOptimized) return;
  isOptimized = true;
  const proto = UniElement.prototype;
  proto.$evtclick = void 0;
  proto.$root = false;
  proto.$html = proto.$txt = proto.$cls = proto.$sty = "";
}

const interopKey = Symbol(`interop`);
const vaporInteropImpl = {
  mount(vnode, container, anchor, parentComponent) {
    const selfAnchor = vnode.el = vnode.anchor = // fixed by uts 统一使用注释节点作为锚点，优化性能（因为注释节点不会进native层）
    container.page.document.createComment("");
    container.insertBefore(selfAnchor, anchor);
    const prev = currentInstance$1;
    simpleSetCurrentInstance(parentComponent);
    const propsRef = shallowRef(vnode.props);
    const slotsRef = shallowRef(vnode.children);
    const dynamicPropSource = [
      () => propsRef.value
    ];
    dynamicPropSource[interopKey] = true;
    const instance = vnode.component = createComponent(
      vnode.type,
      {
        $: dynamicPropSource
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
      const selfAnchor = n2.el = n2.anchor = // fixed by uts 统一使用注释节点作为锚点，优化性能（因为注释节点不会进native层）
      container.page.document.createComment("");
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
    const slot = target[key];
    if (isFunction(slot)) {
      slot.__vapor = true;
    }
    return slot;
  }
};
function createVDOMComponent(internals, component, rawProps, rawSlots) {
  const frag = new VaporFragment([]);
  const vnode = createVNode$1(
    component,
    // fixed by uts 临时方案，等待修复：https://github.com/vuejs/core/pull/13382
    rawProps && extend({}, new Proxy(rawProps, rawPropsProxyHandlers))
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
  const parentInstance = currentInstance$1;
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
      onScopeDispose(unmount, true);
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
      if (hasOwn(source, key))
        return dynamicSources[interopKey] ? source[key] : resolveSource(source[key]);
    }
  }
  return rawProps[key] && resolveSource(rawProps[key]);
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
      if (source && hasOwn(source, key)) {
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
  const prev = setCurrentInstance(instance);
  const res = factory.call(null, instance.props);
  setCurrentInstance(...prev);
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
      pushWarningContext$1(instance);
      validateProps(
        resolveDynamicProps(rawProps),
        instance.props,
        normalizePropsOptions(instance.type)[0]
      );
      popWarningContext$1();
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
  warn$2(
    `Attempt to mutate prop ${JSON.stringify(key)} failed. Props are readonly.`
  );
  return true;
}
function propsDeleteDevTrap(_, key) {
  warn$2(
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
function createSlot(doc, name, rawProps, fallback) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const instance = currentInstance$1;
  const rawSlots = instance.rawSlots;
  const slotProps = rawProps ? new Proxy(rawProps, rawPropsProxyHandlers) : EMPTY_OBJ;
  let fragment;
  if (isRef$1(rawSlots._)) {
    fragment = instance.appContext.vapor.vdomSlot(
      rawSlots._,
      name,
      slotProps,
      instance,
      fallback
    );
  } else {
    fragment = !!(process.env.NODE_ENV !== "production") ? (
      // fixed by uts
      new DynamicFragment(doc, "slot")
    ) : (
      // fixed by uts
      new DynamicFragment(doc)
    );
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
  const prev = setCurrentInstance(instance);
  pushWarningContext$1(instance);
  devRender(instance);
  popWarningContext$1();
  setCurrentInstance(...prev);
  insert(instance.block, parent, anchor);
}
function hmrReload(instance, newComp) {
  const normalized = normalizeBlock(instance.block);
  const parent = normalized[0].parentNode;
  const anchor = normalized[normalized.length - 1].nextSibling;
  unmountComponent(instance, parent);
  const prev = setCurrentInstance(instance.parent);
  const newInstance = createComponent(
    newComp,
    instance.rawProps,
    instance.rawSlots,
    instance.isSingleRoot
  );
  setCurrentInstance(...prev);
  mountComponent(newInstance, parent, anchor);
}

function createComponent(component, rawProps, rawSlots, isSingleRoot, appContext = currentInstance$1 && currentInstance$1.appContext || emptyContext) {
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
  if (isSingleRoot && component.inheritAttrs !== false && isVaporComponent(currentInstance$1) && currentInstance$1.hasFallthrough) {
    const attrs = currentInstance$1.attrs;
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
  if (!!(process.env.NODE_ENV !== "production") && component.__hmrId) {
    registerHMR(instance);
    instance.isSingleRoot = isSingleRoot;
    instance.hmrRerender = hmrRerender.bind(null, instance);
    instance.hmrReload = hmrReload.bind(null, instance);
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    pushWarningContext$1(instance);
    startMeasure(instance, `init`);
    instance.propsOptions = normalizePropsOptions(component);
    instance.emitsOptions = normalizeEmitsOptions(component);
  }
  const prevInstance = setCurrentInstance(instance);
  const prevSub = setActiveSub();
  if (!!(process.env.NODE_ENV !== "production")) {
    setupPropsValidation(instance);
  }
  instance.ctx = { _: instance };
  instance.data = EMPTY_OBJ;
  instance.setupState = EMPTY_OBJ;
  instance.setupContext = null;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const setupFn = isFunction(component) ? component : component.setup;
  const { beforeSetupPage, initNativePage, initFontFace } = appContext.config.uniX || {};
  if (instance.renderer === "page") {
    beforeSetupPage && beforeSetupPage(instance.props, instance);
  }
  initNativePage && initNativePage(instance.proxy);
  const setupResult = setupFn ? callWithErrorHandling$1(setupFn, instance, 0, [
    instance.props,
    instance
  ]) || EMPTY_OBJ : EMPTY_OBJ;
  const customApplyOptions = instance.appContext.config.globalProperties.$applyOptions;
  if (customApplyOptions) {
    customApplyOptions(component, instance, instance.proxy);
  }
  initFontFace && initFontFace(instance.proxy);
  if (!!(process.env.NODE_ENV !== "production") && !isBlock(setupResult)) {
    if (isFunction(component)) {
      warn$2(`Functional vapor component must return a block directly.`);
      instance.block = [];
    } else if (!component.render) {
      warn$2(
        `Vapor component setup() returned non-block value, and has no render function.`
      );
      instance.block = [];
    } else {
      instance.devtoolsRawSetupState = setupResult;
      instance.setupState = proxyRefs(setupResult);
      devRender(instance);
    }
  } else {
    if (!setupFn && component.render) {
      instance.block = callWithErrorHandling$1(
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
  setActiveSub(prevSub);
  setCurrentInstance(...prevInstance);
  if (!!(process.env.NODE_ENV !== "production")) {
    popWarningContext$1();
    endMeasure(instance, "init");
  }
  onScopeDispose$1(() => unmountComponent(instance), true);
  if (!isHydrating && _insertionParent) {
    mountComponent(instance, _insertionParent, _insertionAnchor);
  }
  return instance;
}
let isApplyingFallthroughProps = false;
function devRender(instance) {
  instance.block = (instance.type.render ? callWithErrorHandling$1(
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
  ) : callWithErrorHandling$1(
    isFunction(instance.type) ? instance.type : instance.type.setup,
    instance,
    0,
    [
      instance.props,
      {
        slots: instance.slots,
        attrs: instance.attrs,
        emit: instance.emit,
        expose: instance.expose
      }
    ]
  )) || [];
}
const emptyContext = {
  app: null,
  config: {},
  provides: /* @__PURE__ */ Object.create(null)
};
class VaporComponentInstance {
  constructor(comp, rawProps, rawSlots, appContext) {
    if (comp.__file || comp.__name) {
      console.log("vue3 \u84B8\u6C7D\u6A21\u5F0F\uFF1A", `at ${comp.__file || comp.__name}:1`);
    }
    this.vapor = true;
    this.uid = nextUid();
    this.type = comp;
    this.parent = currentInstance$1;
    this.root = currentInstance$1 ? currentInstance$1.root : this;
    if (currentInstance$1) {
      this.appContext = currentInstance$1.appContext;
      this.provides = currentInstance$1.provides;
      this.ids = currentInstance$1.ids;
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
    this.renderer = // @ts-expect-error
    comp.mpType === "app" ? "app" : rawProps && rawProps.__pagePath ? "page" : "component";
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
    const proxy = this.proxy;
    const document = proxy && proxy.$nativePage && proxy.$nativePage.document;
    if (document) {
      document.waitNativeRender(fn);
    } else {
      fn();
    }
  }
}
function isVaporComponent(value) {
  return value instanceof VaporComponentInstance;
}
function createComponentWithFallback(doc, comp, rawProps, rawSlots, isSingleRoot) {
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
  const el = doc.createElement(comp);
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
  if (instance.exposed || instance.vapor) {
    return instance.exposeProxy || // fixed by uts 支持 $callMethod
    (instance.exposeProxy = new Proxy(markRaw(instance.exposed || {}), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](
            instance
          );
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
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
      warn$2("mount target container is not empty and will be cleared.");
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
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
}
function postPrepareApp(app) {
  app.vapor = true;
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

function createIf(doc, condition, b1, b2, once) {
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
    frag = !!(process.env.NODE_ENV !== "production") ? (
      // fixed by uts
      new DynamicFragment(doc, "if")
    ) : (
      // fixed by uts
      new DynamicFragment(doc)
    );
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
const createFor = (doc, src, renderItem, getKey, flags = 0, setup) => {
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
  let currentKey;
  const parentAnchor = doc.createComment("for");
  const frag = new VaporFragment(oldBlocks);
  const instance = currentInstance$1;
  const canUseFastRemove = !!(flags & 1);
  const isComponent = !!(flags & 2);
  const selectors = [];
  if (!!(process.env.NODE_ENV !== "production") && !instance) {
    warn$2("createFor() can only be used inside setup()");
  }
  const renderList = () => {
    const source = normalizeSource(src());
    const newLength = source.values.length;
    const oldLength = oldBlocks.length;
    newBlocks = new Array(newLength);
    const prevSub = setActiveSub();
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
        for (const selector of selectors) {
          selector.cleanup();
        }
        const doRemove = !canUseFastRemove;
        for (let i = 0; i < oldLength; i++) {
          unmount(oldBlocks[i], doRemove, false);
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
        const sharedBlockCount = Math.min(oldLength, newLength);
        const previousKeyIndexPairs = new Array(oldLength);
        const queuedBlocks = new Array(newLength);
        let anchorFallback = parentAnchor;
        let endOffset = 0;
        let startOffset = 0;
        let queuedBlocksInsertIndex = 0;
        let previousKeyIndexInsertIndex = 0;
        while (endOffset < sharedBlockCount) {
          const currentIndex = newLength - endOffset - 1;
          const currentItem = getItem(source, currentIndex);
          const currentKey2 = getKey(...currentItem);
          const existingBlock = oldBlocks[oldLength - endOffset - 1];
          if (existingBlock.key === currentKey2) {
            update(existingBlock, ...currentItem);
            newBlocks[currentIndex] = existingBlock;
            endOffset++;
            continue;
          }
          if (endOffset !== 0) {
            anchorFallback = normalizeAnchor(newBlocks[currentIndex + 1].nodes);
          }
          break;
        }
        while (startOffset < sharedBlockCount - endOffset) {
          const currentItem = getItem(source, startOffset);
          const currentKey2 = getKey(...currentItem);
          const previousBlock = oldBlocks[startOffset];
          const previousKey = previousBlock.key;
          if (previousKey === currentKey2) {
            update(newBlocks[startOffset] = previousBlock, currentItem[0]);
          } else {
            queuedBlocks[queuedBlocksInsertIndex++] = [
              startOffset,
              currentItem,
              currentKey2
            ];
            previousKeyIndexPairs[previousKeyIndexInsertIndex++] = [
              previousKey,
              startOffset
            ];
          }
          startOffset++;
        }
        for (let i = startOffset; i < oldLength - endOffset; i++) {
          previousKeyIndexPairs[previousKeyIndexInsertIndex++] = [
            oldBlocks[i].key,
            i
          ];
        }
        const preparationBlockCount = Math.min(
          newLength - endOffset,
          sharedBlockCount
        );
        for (let i = startOffset; i < preparationBlockCount; i++) {
          const blockItem = getItem(source, i);
          const blockKey = getKey(...blockItem);
          queuedBlocks[queuedBlocksInsertIndex++] = [i, blockItem, blockKey];
        }
        if (!queuedBlocksInsertIndex && !previousKeyIndexInsertIndex) {
          for (let i = preparationBlockCount; i < newLength - endOffset; i++) {
            const blockItem = getItem(source, i);
            const blockKey = getKey(...blockItem);
            mount(source, i, anchorFallback, blockItem, blockKey);
          }
        } else {
          queuedBlocks.length = queuedBlocksInsertIndex;
          previousKeyIndexPairs.length = previousKeyIndexInsertIndex;
          const previousKeyIndexMap = new Map(previousKeyIndexPairs);
          const blocksToMount = [];
          const relocateOrMountBlock = (blockIndex, blockItem, blockKey, anchorOffset) => {
            const previousIndex = previousKeyIndexMap.get(blockKey);
            if (previousIndex !== void 0) {
              const reusedBlock = newBlocks[blockIndex] = oldBlocks[previousIndex];
              update(reusedBlock, ...blockItem);
              insert(
                reusedBlock,
                parent,
                anchorOffset === -1 ? anchorFallback : normalizeAnchor(newBlocks[anchorOffset].nodes)
              );
              previousKeyIndexMap.delete(blockKey);
            } else {
              blocksToMount.push([
                blockIndex,
                blockItem,
                blockKey,
                anchorOffset
              ]);
            }
          };
          for (let i = queuedBlocks.length - 1; i >= 0; i--) {
            const [blockIndex, blockItem, blockKey] = queuedBlocks[i];
            relocateOrMountBlock(
              blockIndex,
              blockItem,
              blockKey,
              blockIndex < preparationBlockCount - 1 ? blockIndex + 1 : -1
            );
          }
          for (let i = preparationBlockCount; i < newLength - endOffset; i++) {
            const blockItem = getItem(source, i);
            const blockKey = getKey(...blockItem);
            relocateOrMountBlock(i, blockItem, blockKey, -1);
          }
          const useFastRemove = blocksToMount.length === newLength;
          for (const leftoverIndex of previousKeyIndexMap.values()) {
            unmount(
              oldBlocks[leftoverIndex],
              !(useFastRemove && canUseFastRemove),
              !useFastRemove
            );
          }
          if (useFastRemove) {
            for (const selector of selectors) {
              selector.cleanup();
            }
            if (canUseFastRemove) {
              parent.textContent = "";
              parent.appendChild(parentAnchor);
            }
          }
          for (const [
            blockIndex,
            blockItem,
            blockKey,
            anchorOffset
          ] of blocksToMount) {
            mount(
              source,
              blockIndex,
              anchorOffset === -1 ? anchorFallback : normalizeAnchor(newBlocks[anchorOffset].nodes),
              blockItem,
              blockKey
            );
          }
        }
      }
    }
    frag.nodes = [oldBlocks = newBlocks];
    if (parentAnchor) {
      frag.nodes.push(parentAnchor);
    }
    setActiveSub(prevSub);
  };
  const needKey = renderItem.length > 1;
  const needIndex = renderItem.length > 2;
  const mount = (source, idx, anchor = parentAnchor, [item, key, index] = getItem(source, idx), key2 = getKey && getKey(item, key, index)) => {
    const itemRef = shallowRef$1(item);
    const keyRef = needKey ? shallowRef$1(key) : void 0;
    const indexRef = needIndex ? shallowRef$1(index) : void 0;
    currentKey = key2;
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
      key2
    );
    if (parent) insert(block.nodes, parent, anchor);
    return block;
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
  const unmount = (block, doRemove = true, doDeregister = true) => {
    if (!isComponent) {
      block.scope.stop();
    }
    if (doRemove) {
      remove(block.nodes, parent);
    }
    if (doDeregister) {
      for (const selector of selectors) {
        selector.deregister(block.key);
      }
    }
  };
  if (setup) {
    setup({ createSelector });
  }
  if (flags & 4) {
    renderList();
  } else {
    renderEffect(renderList);
  }
  if (!isHydrating && _insertionParent) {
    insert(frag, _insertionParent, _insertionAnchor);
  }
  return frag;
  function createSelector(source) {
    let operMap = /* @__PURE__ */ new Map();
    let activeKey = source();
    let activeOpers;
    watch(source, (newValue) => {
      if (activeOpers !== void 0) {
        for (const oper of activeOpers) {
          oper();
        }
      }
      activeOpers = operMap.get(newValue);
      if (activeOpers !== void 0) {
        for (const oper of activeOpers) {
          oper();
        }
      }
    });
    selectors.push({ deregister, cleanup });
    return register;
    function cleanup() {
      operMap = /* @__PURE__ */ new Map();
      activeOpers = void 0;
    }
    function register(oper) {
      oper();
      let opers = operMap.get(currentKey);
      if (opers !== void 0) {
        opers.push(oper);
      } else {
        opers = [oper];
        operMap.set(currentKey, opers);
        if (currentKey === activeKey) {
          activeOpers = opers;
        }
      }
    }
    function deregister(key) {
      operMap.delete(key);
      if (key === activeKey) {
        activeOpers = void 0;
      }
    }
  }
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
      warn$2(`The v-for range expect an integer value but got ${source}.`);
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
  const instance = currentInstance$1;
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
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    const invokeRefSetter = (value) => {
      callWithErrorHandling$1(ref, currentInstance$1, 12, [
        value,
        refs
      ]);
    };
    invokeRefSetter(refValue);
    onScopeDispose$1(() => invokeRefSetter());
  } else {
    const _isString = isString(ref);
    const _isRef = isRef(ref);
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
          warn$2("Invalid template ref type:", ref, `(${typeof ref})`);
        }
      };
      queuePostFlushCb(doSet, -1);
      onScopeDispose$1(() => {
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
      warn$2("Invalid template ref type:", ref, `(${typeof ref})`);
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

function createDynamicComponent(doc, getter, rawProps, rawSlots, isSingleRoot) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const frag = !!(process.env.NODE_ENV !== "production") ? (
    // fixed by uts
    new DynamicFragment(doc, "dynamic-component")
  ) : (
    // fixed by uts
    new DynamicFragment(doc)
  );
  renderEffect(() => {
    const value = getter();
    frag.update(
      () => createComponentWithFallback(
        // fixed by uts
        doc,
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
    el[vShowHidden$1] = !value;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$2(
      `v-show used on component with non-single-element root node and will be ignored.`
    );
  }
}

function ensureMounted(cb) {
  if (currentInstance$1.isMounted) {
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
      if (ret) onScopeDispose(ret);
    }
  }
}

export { VaporFragment, applyCheckboxModel, applyDynamicModel, applyRadioModel, applySelectModel, applyTextModel, applyVShow, child, createComponent, createComponentWithFallback, createDynamicComponent, createFor, createForSlots, createIf, createSlot, createTemplateRefSetter, createTextNode, createVaporApp, createVaporSSRApp, defineVaporComponent, delegate, delegateEvents, getDefaultValue, getRestElement, insert, isFragment, isVaporComponent, next, nthChild, on, prepend, remove, renderEffect, setAttr, setClass, setDOMProp, setDynamicEvents, setDynamicProps, setHtml, setInsertionState, setProp, setStyle, setText, setValue, template, unmountComponent, vaporInteropPlugin, withVaporDirectives };
