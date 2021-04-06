import {isFunction, extend, isPlainObject, hasOwn as hasOwn$1, hyphenate, isArray, isObject as isObject$1, capitalize, toRawType, makeMap as makeMap$1, isPromise} from "@vue/shared";
import {injectHook, createVNode, defineComponent, inject, provide, reactive, computed, nextTick, withDirectives, vShow, withCtx, openBlock, createBlock, KeepAlive, resolveDynamicComponent, resolveComponent, onMounted, ref, mergeProps, toDisplayString, toHandlers, renderSlot, createCommentVNode, withModifiers, vModelDynamic, createTextVNode, Fragment, renderList, vModelText} from "vue";
import {createRouter, createWebHistory, createWebHashHistory, useRoute, RouterView, isNavigationFailure} from "vue-router";
import {NAVBAR_HEIGHT, COMPONENT_NAME_PREFIX, plusReady, debounce, PRIMARY_COLOR} from "@dcloudio/uni-shared";
function applyOptions(options, instance2, publicThis) {
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hook = options[name];
      if (isFunction(hook)) {
        injectHook(name, hook.bind(publicThis), instance2);
      }
    }
  });
}
function set(target, key, val) {
  return target[key] = val;
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  const hooks = this.$[name];
  let ret;
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) {
      ret = hooks[i](args);
    }
  }
  return ret;
}
function errorHandler(err, instance2, info) {
  if (!instance2) {
    throw err;
  }
  const appInstance = instance2.$.appContext.$appInstance;
  if (!appInstance) {
    throw err;
  }
  appInstance.$callHook("onError", err, info);
}
function initApp$1(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = errorHandler;
  }
  const globalProperties = appConfig.globalProperties;
  globalProperties.$hasHook = hasHook;
  globalProperties.$callHook = callHook;
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions;
  }
}
function initBridge(namespace) {
  const {on, off, emit} = {
    on(event2, callback) {
      console.log(event2, callback);
    },
    off(event2, callback) {
      console.log(event2, callback);
    },
    emit(event2, ...args) {
      console.log(event2, args);
    }
  };
  return {
    on,
    off,
    emit,
    subscribe(event2, callback) {
      return on(`${namespace}.${event2}`, callback);
    },
    unsubscribe(event2, callback) {
      return off(`${namespace}.${event2}`, callback);
    },
    subscribeHandler(event2, args, pageId) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[${namespace}][subscribeHandler][${Date.now()}]:${event2}, ${JSON.stringify(args)}, ${pageId}`);
      }
      return emit(`${namespace}.${event2}`, args, pageId);
    }
  };
}
const ViewJSBridge = initBridge("view");
const LONGPRESS_TIMEOUT = 350;
const LONGPRESS_THRESHOLD = 10;
const passiveOptions$1 = {passive: true};
let longPressTimer = 0;
function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = 0;
  }
}
let startPageX = 0;
let startPageY = 0;
function touchstart(evt) {
  clearLongPressTimer();
  if (evt.touches.length !== 1) {
    return;
  }
  const {pageX, pageY} = evt.touches[0];
  startPageX = pageX;
  startPageY = pageY;
  longPressTimer = setTimeout(function() {
    const customEvent = new CustomEvent("longpress", {
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
  if (!longPressTimer) {
    return;
  }
  if (evt.touches.length !== 1) {
    return clearLongPressTimer();
  }
  const {pageX, pageY} = evt.touches[0];
  if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) {
    return clearLongPressTimer();
  }
}
function initLongPress() {
  window.addEventListener("touchstart", touchstart, passiveOptions$1);
  window.addEventListener("touchmove", touchmove, passiveOptions$1);
  window.addEventListener("touchend", clearLongPressTimer, passiveOptions$1);
  window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions$1);
}
var attrs = ["top", "left", "right", "bottom"];
var inited;
var elementComputedStyle = {};
var support;
function getSupport() {
  if (!("CSS" in window) || typeof CSS.supports != "function") {
    support = "";
  } else if (CSS.supports("top: env(safe-area-inset-top)")) {
    support = "env";
  } else if (CSS.supports("top: constant(safe-area-inset-top)")) {
    support = "constant";
  } else {
    support = "";
  }
  return support;
}
function init() {
  support = typeof support === "string" ? support : getSupport();
  if (!support) {
    attrs.forEach(function(attr2) {
      elementComputedStyle[attr2] = 0;
    });
    return;
  }
  function setStyle(el, style) {
    var elStyle = el.style;
    Object.keys(style).forEach(function(key) {
      var val = style[key];
      elStyle[key] = val;
    });
  }
  var cbs = [];
  function parentReady(callback) {
    if (callback) {
      cbs.push(callback);
    } else {
      cbs.forEach(function(cb) {
        cb();
      });
    }
  }
  var passiveEvents = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function() {
        passiveEvents = {passive: true};
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e2) {
  }
  function addChild(parent, attr2) {
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
      paddingBottom: support + "(safe-area-inset-" + attr2 + ")"
    };
    setStyle(a1, aStyle);
    setStyle(a2, aStyle);
    setStyle(a1Children, {
      transition: "0s",
      animation: "none",
      width: "400px",
      height: "400px"
    });
    setStyle(a2Children, {
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
        if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) {
          return;
        }
        a1.scrollTop = a2.scrollTop = MAX;
        a1LastScrollTop = a1.scrollTop;
        a2LastScrollTop = a2.scrollTop;
        attrChange(attr2);
      }
      a1.addEventListener("scroll", onScroll, passiveEvents);
      a2.addEventListener("scroll", onScroll, passiveEvents);
    });
    var computedStyle = getComputedStyle(a1);
    Object.defineProperty(elementComputedStyle, attr2, {
      configurable: true,
      get: function() {
        return parseFloat(computedStyle.paddingBottom);
      }
    });
  }
  var parentDiv = document.createElement("div");
  setStyle(parentDiv, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "0",
    height: "0",
    zIndex: "-1",
    overflow: "hidden",
    visibility: "hidden"
  });
  attrs.forEach(function(key) {
    addChild(parentDiv, key);
  });
  document.body.appendChild(parentDiv);
  parentReady();
  inited = true;
}
function getAttr(attr2) {
  if (!inited) {
    init();
  }
  return elementComputedStyle[attr2];
}
var changeAttrs = [];
function attrChange(attr2) {
  if (!changeAttrs.length) {
    setTimeout(function() {
      var style = {};
      changeAttrs.forEach(function(attr3) {
        style[attr3] = elementComputedStyle[attr3];
      });
      changeAttrs.length = 0;
      callbacks$1.forEach(function(callback) {
        callback(style);
      });
    }, 0);
  }
  changeAttrs.push(attr2);
}
var callbacks$1 = [];
function onChange(callback) {
  if (!getSupport()) {
    return;
  }
  if (!inited) {
    init();
  }
  if (typeof callback === "function") {
    callbacks$1.push(callback);
  }
}
function offChange(callback) {
  var index2 = callbacks$1.indexOf(callback);
  if (index2 >= 0) {
    callbacks$1.splice(index2, 1);
  }
}
var safeAreaInsets = {
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
var out = safeAreaInsets;
function getWindowOffset() {
  if (uni.canIUse("css.var")) {
    const style = document.documentElement.style;
    const top = parseInt(style.getPropertyValue("--window-top"));
    const bottom = parseInt(style.getPropertyValue("--window-bottom"));
    const left = parseInt(style.getPropertyValue("--window-left"));
    const right = parseInt(style.getPropertyValue("--window-right"));
    return {
      top: top ? top + out.top : 0,
      bottom: bottom ? bottom + out.bottom : 0,
      left: left ? left + out.left : 0,
      right: right ? right + out.right : 0
    };
  }
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
}
function findUniTarget($event, $el) {
  let target = $event.target;
  for (; target && target !== $el; target = target.parentNode) {
    if (target.tagName && target.tagName.indexOf("UNI-") === 0) {
      break;
    }
  }
  return target;
}
function normalizeDataset(dataset = {}) {
  const result = JSON.parse(JSON.stringify(dataset));
  return result;
}
function normalizeEvent(name, $event, detail = {}, target, currentTarget) {
  if ($event._processed) {
    $event.type = detail.type || name;
    return $event;
  }
  if (isClickEvent($event, name)) {
    const {top} = getWindowOffset();
    detail = {
      x: $event.x,
      y: $event.y - top
    };
    normalizeClickEvent($event);
  }
  const ret = {
    _processed: true,
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail,
    target: normalizeTarget(target, detail),
    currentTarget: normalizeTarget(currentTarget),
    touches: normalizeTouchList($event.touches),
    changedTouches: normalizeTouchList($event.changedTouches),
    preventDefault() {
    },
    stopPropagation() {
    }
  };
  return ret;
}
function normalizeClickEvent($event) {
  $event.touches = $event.changedTouches = [
    {
      force: 1,
      identifier: 0,
      clientX: $event.clientX,
      clientY: $event.clientY,
      pageX: $event.pageX,
      pageY: $event.pageY
    }
  ];
}
function isClickEvent(val, name) {
  return name === "click";
}
function normalizeTarget(target, detail) {
  if (!target) {
    target = {};
  }
  const res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: normalizeDataset(target.dataset)
  };
  if (detail) {
    extend(res, detail);
  }
  return res;
}
function normalizeTouchList(touches) {
  if (touches && touches instanceof TouchList) {
    const res = [];
    const {top} = getWindowOffset();
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      res.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY - top,
        clientX: touch.clientX,
        clientY: touch.clientY - top,
        force: touch.force || 0
      });
    }
    return res;
  }
  return [];
}
function $trigger(name, $event, detail) {
  const target = this.$el;
  this.$emit(name, normalizeEvent(name, $event, detail, target, target));
}
function $handleEvent($event) {
  if ($event instanceof Event) {
    const target = findUniTarget($event, this.$el);
    return normalizeEvent($event.type, $event, {}, target || $event.target, $event.currentTarget);
  }
  return $event;
}
var instance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  $trigger,
  $handleEvent
});
const CLASS_RE = /^\s+|\s+$/g;
const WXS_CLASS_RE = /\s+/;
function getWxsClsArr(clsArr, classList, isAdd) {
  const wxsClsArr = [];
  let checkClassList = function(cls) {
    if (isAdd) {
      checkClassList = function(cls2) {
        return !classList.contains(cls2);
      };
    } else {
      checkClassList = function(cls2) {
        return classList.contains(cls2);
      };
    }
    return checkClassList(cls);
  };
  clsArr.forEach((cls) => {
    cls = cls.replace(CLASS_RE, "");
    checkClassList(cls) && wxsClsArr.push(cls);
  });
  return wxsClsArr;
}
function parseStyleText(cssText) {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}
class ComponentDescriptor {
  constructor(vm) {
    this.$vm = vm;
    this.$el = vm.$el;
  }
  selectComponent(selector) {
    if (!this.$el || !selector) {
      return;
    }
    const el = this.$el.querySelector(selector);
    return el && el.__vue__ && createComponentDescriptor(el.__vue__, false);
  }
  selectAllComponents(selector) {
    if (!this.$el || !selector) {
      return [];
    }
    const descriptors = [];
    const els = this.$el.querySelectorAll(selector);
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      el.__vue__ && descriptors.push(createComponentDescriptor(el.__vue__, false));
    }
    return descriptors;
  }
  setStyle(style) {
    if (!this.$el || !style) {
      return this;
    }
    if (typeof style === "string") {
      style = parseStyleText(style);
    }
    if (isPlainObject(style)) {
      this.$el.__wxsStyle = style;
      this.$vm.$forceUpdate();
    }
    return this;
  }
  addClass(...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this;
    }
    const wxsClsArr = getWxsClsArr(clsArr, this.$el.classList, true);
    if (wxsClsArr.length) {
      const wxsClass = this.$el.__wxsAddClass || "";
      this.$el.__wxsAddClass = wxsClass + (wxsClass ? " " : "") + wxsClsArr.join(" ");
      this.$vm.$forceUpdate();
    }
    return this;
  }
  removeClass(...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this;
    }
    const classList = this.$el.classList;
    const addWxsClsArr = this.$el.__wxsAddClass ? this.$el.__wxsAddClass.split(WXS_CLASS_RE) : [];
    const wxsClsArr = getWxsClsArr(clsArr, classList, false);
    if (wxsClsArr.length) {
      const removeWxsClsArr = [];
      wxsClsArr.forEach((cls) => {
        const clsIndex = addWxsClsArr.findIndex((oldCls) => oldCls === cls);
        if (clsIndex !== -1) {
          addWxsClsArr.splice(clsIndex, 1);
        }
        removeWxsClsArr.push(cls);
      });
      this.$el.__wxsRemoveClass = removeWxsClsArr;
      this.$el.__wxsAddClass = addWxsClsArr.join(" ");
      this.$vm.$forceUpdate();
    }
    return this;
  }
  hasClass(cls) {
    return this.$el && this.$el.classList.contains(cls);
  }
  getComputedStyle() {
    if (this.$el) {
      return window.getComputedStyle(this.$el);
    }
    return {};
  }
  getDataset() {
    return this.$el && this.$el.dataset;
  }
  callMethod(funcName, args = {}) {
    const func = this.$vm[funcName];
    if (isFunction(func)) {
      func(JSON.parse(JSON.stringify(args)));
    } else if (this.$vm._$id) {
      UniViewJSBridge.publishHandler("onWxsInvokeCallMethod", {
        cid: this.$vm._$id,
        method: funcName,
        args
      });
    }
  }
  requestAnimationFrame(callback) {
    return window.requestAnimationFrame(callback), this;
  }
  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
  }
  triggerEvent(eventName, detail = {}) {
    return this.$vm.$emit(eventName, detail), this;
  }
}
function createComponentDescriptor(vm, isOwnerInstance = true) {
  if (isOwnerInstance && vm && vm.$options.name && vm.$options.name.indexOf("VUni") === 0) {
    vm = vm.$parent;
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
    }
    return vm.$el.__wxsComponentDescriptor;
  }
}
function getComponentDescriptor(instance2, isOwnerInstance) {
  return createComponentDescriptor(instance2 || this, isOwnerInstance);
}
function handleWxsEvent($event) {
  if (!($event instanceof Event)) {
    return $event;
  }
  const currentTarget = $event.currentTarget;
  const instance2 = currentTarget && currentTarget.__vue__ && getComponentDescriptor.call(this, currentTarget.__vue__, false);
  const $origEvent = $event;
  $event = normalizeEvent($origEvent.type, $origEvent, {}, findUniTarget($origEvent, this.$el) || $origEvent.target, $origEvent.currentTarget);
  $event.instance = instance2;
  $event.preventDefault = function() {
    return $origEvent.preventDefault();
  };
  $event.stopPropagation = function() {
    return $origEvent.stopPropagation();
  };
}
function initAppConfig$1(appConfig) {
  const globalProperties = appConfig.globalProperties;
  extend(globalProperties, instance);
  if (__UNI_FEATURE_WXS__) {
    globalProperties.getComponentDescriptor = getComponentDescriptor;
    Object.defineProperty(globalProperties, "$ownerInstance", {
      get() {
        return this.$getComponentDescriptor(this);
      }
    });
    globalProperties.$handleWxsEvent = handleWxsEvent;
  }
}
function initView(app) {
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress();
  }
  initAppConfig$1(app._context.config);
}
const ServiceJSBridge = initBridge("service");
function querySelector(vm, selector) {
  const el = vm.$el.querySelector(selector);
  return el && el.__vue__;
}
function querySelectorAll(vm, selector) {
  const nodeList = vm.$el.querySelectorAll(selector);
  if (nodeList) {
    return [...nodeList].map((node) => node.__vue__).filter(Boolean);
  }
  return [];
}
function createSelectorQuery$1() {
  return uni.createSelectorQuery().in(this);
}
function createIntersectionObserver$1(options) {
  return uni.createIntersectionObserver(this, options);
}
function selectComponent(selector) {
  return querySelector(this, selector);
}
function selectAllComponents(selector) {
  return querySelectorAll(this, selector);
}
var wxInstance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  createSelectorQuery: createSelectorQuery$1,
  createIntersectionObserver: createIntersectionObserver$1,
  selectComponent,
  selectAllComponents
});
function initAppConfig(appConfig) {
  const globalProperties = appConfig.globalProperties;
  if (__UNI_FEATURE_WX__) {
    extend(globalProperties, wxInstance);
  }
}
function initService(app) {
  initAppConfig(app._context.config);
}
function PolySymbol(name) {
  return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
function rpx2px(str) {
  if (typeof str === "string") {
    const res = parseInt(str) || 0;
    if (str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1) {
      return uni.upx2px(res);
    }
    return res;
  }
  return str;
}
const ICON_PATH_CANCEL = "M20.928 10.176l-4.928 4.928-4.928-4.928-0.896 0.896 4.928 4.928-4.928 4.928 0.896 0.896 4.928-4.928 4.928 4.928 0.896-0.896-4.928-4.928 4.928-4.928-0.896-0.896zM16 2.080q-3.776 0-7.040 1.888-3.136 1.856-4.992 4.992-1.888 3.264-1.888 7.040t1.888 7.040q1.856 3.136 4.992 4.992 3.264 1.888 7.040 1.888t7.040-1.888q3.136-1.856 4.992-4.992 1.888-3.264 1.888-7.040t-1.888-7.040q-1.856-3.136-4.992-4.992-3.264-1.888-7.040-1.888zM16 28.64q-3.424 0-6.4-1.728-2.848-1.664-4.512-4.512-1.728-2.976-1.728-6.4t1.728-6.4q1.664-2.848 4.512-4.512 2.976-1.728 6.4-1.728t6.4 1.728q2.848 1.664 4.512 4.512 1.728 2.976 1.728 6.4t-1.728 6.4q-1.664 2.848-4.512 4.512-2.976 1.728-6.4 1.728z";
const ICON_PATH_CLEAR = "M16 0q-4.352 0-8.064 2.176-3.616 2.144-5.76 5.76-2.176 3.712-2.176 8.064t2.176 8.064q2.144 3.616 5.76 5.76 3.712 2.176 8.064 2.176t8.064-2.176q3.616-2.144 5.76-5.76 2.176-3.712 2.176-8.064t-2.176-8.064q-2.144-3.616-5.76-5.76-3.712-2.176-8.064-2.176zM22.688 21.408q0.32 0.32 0.304 0.752t-0.336 0.736-0.752 0.304-0.752-0.32l-5.184-5.376-5.376 5.184q-0.32 0.32-0.752 0.304t-0.736-0.336-0.304-0.752 0.32-0.752l5.376-5.184-5.184-5.376q-0.32-0.32-0.304-0.752t0.336-0.752 0.752-0.304 0.752 0.336l5.184 5.376 5.376-5.184q0.32-0.32 0.752-0.304t0.752 0.336 0.304 0.752-0.336 0.752l-5.376 5.184 5.184 5.376z";
const ICON_PATH_DOWNLOAD = "M15.808 1.696q-3.776 0-7.072 1.984-3.2 1.888-5.088 5.152-1.952 3.392-1.952 7.36 0 3.776 1.952 7.072 1.888 3.2 5.088 5.088 3.296 1.952 7.072 1.952 3.968 0 7.36-1.952 3.264-1.888 5.152-5.088 1.984-3.296 1.984-7.072 0-4-1.984-7.36-1.888-3.264-5.152-5.152-3.36-1.984-7.36-1.984zM20.864 18.592l-3.776 4.928q-0.448 0.576-1.088 0.576t-1.088-0.576l-3.776-4.928q-0.448-0.576-0.24-0.992t0.944-0.416h2.976v-8.928q0-0.256 0.176-0.432t0.4-0.176h1.216q0.224 0 0.4 0.176t0.176 0.432v8.928h2.976q0.736 0 0.944 0.416t-0.24 0.992z";
const ICON_PATH_INFO = "M15.808 0.128q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.176 3.776-2.176 8.16 0 4.224 2.176 7.872 2.080 3.552 5.632 5.632 3.648 2.176 7.872 2.176 4.384 0 8.16-2.176 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.416-2.176-8.16-2.112-3.616-5.728-5.728-3.744-2.176-8.16-2.176zM16.864 23.776q0 0.064-0.064 0.064h-1.568q-0.096 0-0.096-0.064l-0.256-11.328q0-0.064 0.064-0.064h2.112q0.096 0 0.064 0.064l-0.256 11.328zM16 10.88q-0.576 0-0.976-0.4t-0.4-0.96 0.4-0.96 0.976-0.4 0.976 0.4 0.4 0.96-0.4 0.96-0.976 0.4z";
const ICON_PATH_SEARCH = "M20.928 22.688q-1.696 1.376-3.744 2.112-2.112 0.768-4.384 0.768-3.488 0-6.464-1.728-2.88-1.696-4.576-4.608-1.76-2.976-1.76-6.464t1.76-6.464q1.696-2.88 4.576-4.576 2.976-1.76 6.464-1.76t6.464 1.76q2.912 1.696 4.608 4.576 1.728 2.976 1.728 6.464 0 2.272-0.768 4.384-0.736 2.048-2.112 3.744l9.312 9.28-1.824 1.824-9.28-9.312zM12.8 23.008q2.784 0 5.184-1.376 2.304-1.376 3.68-3.68 1.376-2.4 1.376-5.184t-1.376-5.152q-1.376-2.336-3.68-3.68-2.4-1.408-5.184-1.408t-5.152 1.408q-2.336 1.344-3.68 3.68-1.408 2.368-1.408 5.152t1.408 5.184q1.344 2.304 3.68 3.68 2.368 1.376 5.152 1.376zM12.8 23.008v0z";
const ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
const ICON_PATH_SUCCESS = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM24.832 11.328l-11.264 11.104q-0.032 0.032-0.112 0.032t-0.112-0.032l-5.216-5.376q-0.096-0.128 0-0.288l0.704-0.96q0.032-0.064 0.112-0.064t0.112 0.032l4.256 3.264q0.064 0.032 0.144 0.032t0.112-0.032l10.336-8.608q0.064-0.064 0.144-0.064t0.112 0.064l0.672 0.672q0.128 0.128 0 0.224z";
const ICON_PATH_WAITING = "M15.84 0.096q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM23.008 21.92l-0.512 0.896q-0.096 0.128-0.224 0.064l-8-3.808q-0.096-0.064-0.16-0.128-0.128-0.096-0.128-0.288l0.512-12.096q0-0.064 0.048-0.112t0.112-0.048h1.376q0.064 0 0.112 0.048t0.048 0.112l0.448 10.848 6.304 4.256q0.064 0.064 0.080 0.128t-0.016 0.128z";
const ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
function createSvgIconVNode(path, color = "#000", size = 27) {
  return createVNode("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32"
  }, [
    createVNode("path", {
      d: path,
      fill: color
    }, null, 8, ["d", "fill"])
  ], 8, ["width", "height"]);
}
function getRealRoute(fromRoute, toRoute) {
  if (!toRoute) {
    toRoute = fromRoute;
    if (toRoute.indexOf("/") === 0) {
      return toRoute;
    }
    const pages = getCurrentPages();
    if (pages.length) {
      fromRoute = pages[pages.length - 1].$page.route;
    } else {
      fromRoute = "";
    }
  } else {
    if (toRoute.indexOf("/") === 0) {
      return toRoute;
    }
  }
  if (toRoute.indexOf("./") === 0) {
    return getRealRoute(fromRoute, toRoute.substr(2));
  }
  const toRouteArray = toRoute.split("/");
  const toRouteLength = toRouteArray.length;
  let i = 0;
  for (; i < toRouteLength && toRouteArray[i] === ".."; i++) {
  }
  toRouteArray.splice(0, i);
  toRoute = toRouteArray.join("/");
  const fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
  return "/" + fromRouteArray.concat(toRouteArray).join("/");
}
function initRouter(app) {
  app.use(createAppRouter(createRouter(createRouterOptions())));
}
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
};
function createRouterOptions() {
  return {
    history: initHistory(),
    strict: !!__uniConfig.router.strict,
    routes: __uniRoutes,
    scrollBehavior
  };
}
function createAppRouter(router) {
  return router;
}
function initHistory() {
  const history2 = __UNI_FEATURE_ROUTER_MODE__ === "history" ? createWebHistory() : createWebHashHistory();
  return history2;
}
var TabBar = /* @__PURE__ */ defineComponent({
  name: "TabBar"
});
const pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "pageMeta" : "pm");
function usePageMeta() {
  return inject(pageMetaKey);
}
function providePageMeta() {
  const pageMeta = initPageMeta();
  provide(pageMetaKey, pageMeta);
  return pageMeta;
}
function initPageMeta() {
  if (__UNI_FEATURE_PAGES__) {
    return reactive(normalizePageMeta(JSON.parse(JSON.stringify(mergePageMeta(useRoute().meta)))));
  }
  return reactive(normalizePageMeta(JSON.parse(JSON.stringify(mergePageMeta(__uniRoutes[0].meta)))));
}
const PAGE_META_KEYS = [
  "navigationBar",
  "refreshOptions"
];
function mergePageMeta(pageMeta) {
  const res = Object.assign({}, __uniConfig.globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = Object.assign({}, __uniConfig.globalStyle[name] || {}, pageMeta[name] || {});
  });
  return res;
}
function normalizePageMeta(pageMeta) {
  const {enablePullDownRefresh, navigationBar} = pageMeta;
  if (enablePullDownRefresh) {
    const refreshOptions = Object.assign({
      support: true,
      color: "#2BD009",
      style: "circle",
      height: 70,
      range: 150,
      offset: 0
    }, pageMeta.refreshOptions || {});
    let offset = rpx2px(refreshOptions.offset);
    const {type} = navigationBar;
    if (type !== "transparent" && type !== "none") {
      offset += NAVBAR_HEIGHT + out.top;
    }
    refreshOptions.height = rpx2px(refreshOptions.height);
    refreshOptions.range = rpx2px(refreshOptions.range);
    pageMeta.refreshOptions = refreshOptions;
  }
  navigationBar.backButton = pageMeta.isQuit ? false : true;
  navigationBar.titleColor = navigationBar.titleColor || "#fff";
  navigationBar.backgroundColor = navigationBar.backgroundColor || "#F7F7F7";
  return pageMeta;
}
const sheetsMap = new Map();
function updateStyle(id2, content) {
  let style = sheetsMap.get(id2);
  if (style && !(style instanceof HTMLStyleElement)) {
    removeStyle(id2);
    style = void 0;
  }
  if (!style) {
    style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = content;
    document.head.appendChild(style);
  } else {
    style.innerHTML = content;
  }
  sheetsMap.set(id2, style);
}
function removeStyle(id2) {
  let style = sheetsMap.get(id2);
  if (style) {
    if (style instanceof CSSStyleSheet) {
      document.adoptedStyleSheets.indexOf(style);
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== style);
    } else {
      document.head.removeChild(style);
    }
    sheetsMap.delete(id2);
  }
}
const documentElement = document.documentElement;
let styleObj;
function updateCssVar(name, value) {
  if (!styleObj) {
    styleObj = documentElement.style;
  }
  styleObj.setProperty(name, value);
}
PolySymbol(process.env.NODE_ENV !== "production" ? "layout" : "l");
const SEP = "$$";
const currentPagesMap = new Map();
function pruneCurrentPages() {
  currentPagesMap.forEach((page, id2) => {
    if (page.$.isUnmounted) {
      currentPagesMap.delete(id2);
    }
  });
}
function getCurrentPages$1(isAll = false) {
  pruneCurrentPages();
  return [...currentPagesMap.values()];
}
let id = history.state && history.state.__id__ || 1;
function createPageState(type) {
  return {
    __id__: ++id,
    __type__: type
  };
}
function isPage(vm) {
  return vm.$options.mpType === "page";
}
function normalizeRoute(path) {
  if (path.indexOf("/") === 0) {
    return path.substr(1);
  }
  return path;
}
function initPublicPage(route) {
  if (!route) {
    const {path} = __uniRoutes[0];
    return {id, path, route: path.substr(1), fullPath: path};
  }
  return {
    id,
    path: route.path,
    route: normalizeRoute(route.path),
    fullPath: route.meta.isEntry ? route.meta.pagePath : route.fullPath,
    options: {},
    meta: usePageMeta()
  };
}
function initPage(vm) {
  const route = vm.$route;
  vm.$page = initPublicPage(route);
  currentPagesMap.set(vm.$page.id, vm);
}
function useKeepAliveRoute() {
  const route = useRoute();
  const routeKey = computed(() => route.fullPath + SEP + (history.state.__id__ || 1));
  return {
    routeKey,
    routeCache
  };
}
const pageCacheMap = new Map();
const routeCache = {
  get(key) {
    return pageCacheMap.get(key);
  },
  set(key, value) {
    pruneRouteCache(key);
    pageCacheMap.set(key, value);
  },
  delete(key) {
    pageCacheMap.delete(key);
  },
  forEach(fn) {
    pageCacheMap.forEach(fn);
  }
};
function pruneRouteCache(key) {
  const pageId = parseInt(key.split(SEP)[1]);
  if (!pageId) {
    return;
  }
  routeCache.forEach((vnode, key2) => {
    const cPageId = parseInt(key2.split(SEP)[1]);
    if (cPageId && cPageId > pageId) {
      routeCache.delete(key2);
      routeCache.pruneCacheEntry(vnode);
      nextTick(() => pruneCurrentPages());
    }
  });
}
var Layout = defineComponent({
  name: "Layout",
  props: {
    onChange: Function
  },
  emits: ["change"],
  setup() {
    const route = __UNI_FEATURE_TABBAR__ && useRoute();
    const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
    __UNI_FEATURE_TOPWINDOW__ && useTopWindow();
    __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow();
    __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow();
    return () => {
      const layoutTsx = createLayoutTsx(keepAliveRoute);
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(route);
      if (!tabBarTsx) {
        return layoutTsx;
      }
      return [layoutTsx, tabBarTsx];
    };
  }
});
function createLayoutTsx(keepAliveRoute, topWindow, leftWindow, rightWindow) {
  const routerVNode = __UNI_FEATURE_PAGES__ ? createRouterViewVNode(keepAliveRoute) : createPageVNode();
  if (!__UNI_FEATURE_RESPONSIVE__) {
    return routerVNode;
  }
  const topWindowTsx = __UNI_FEATURE_TOPWINDOW__ ? createTopWindowTsx() : null;
  const leftWindowTsx = __UNI_FEATURE_LEFTWINDOW__ ? createLeftWindowTsx() : null;
  const rightWindowTsx = __UNI_FEATURE_RIGHTWINDOW__ ? createRightWindowTsx() : null;
  return createVNode("uni-layout", null, [topWindowTsx, createVNode("uni-content", null, [createVNode("uni-main", null, [routerVNode]), leftWindowTsx, rightWindowTsx])]);
}
function createTabBarTsx(route) {
  return withDirectives(createVNode(TabBar, null, null, 512), [[vShow, route.meta.isTabBar]]);
}
function createPageVNode() {
  return createVNode(__uniRoutes[0].component);
}
function createRouterViewVNode(keepAliveRoute) {
  return createVNode(RouterView, null, {
    default: withCtx(({
      Component
    }) => [(openBlock(), createBlock(KeepAlive, {
      matchBy: "key",
      cache: keepAliveRoute.routeCache
    }, [(openBlock(), createBlock(resolveDynamicComponent(Component), {
      key: keepAliveRoute.routeKey.value
    }))], 1032, ["cache"]))]),
    _: 1
  });
}
function useTopWindow() {
  const component = resolveComponent("VUniTopWindow");
  return {
    component,
    style: component.style,
    height: 0,
    show: false
  };
}
function useLeftWindow() {
  const component = resolveComponent("VUniLeftWindow");
  return {
    component,
    style: component.style,
    height: 0
  };
}
function useRightWindow() {
  const component = resolveComponent("VUniRightWindow");
  return {
    component,
    style: component.style,
    height: 0
  };
}
function createTopWindowTsx(topWindow) {
}
function createLeftWindowTsx(leftWindow) {
}
function createRightWindowTsx(leftWindow) {
}
const CSS_VARS = ["--status-bar-height", "--top-window-height", "--window-left", "--window-right", "--window-margin"];
var AppComponent = defineComponent({
  name: "App",
  setup() {
    useCssVar();
    useAppLifecycle();
    const {
      clazz,
      onChange: onChange2
    } = useAppClass();
    return () => createVNode("uni-app", {
      class: clazz.value
    }, [createVNode(Layout, {
      onChange: onChange2
    }, null, 8, ["onChange"])], 2);
  }
});
function useCssVar() {
  CSS_VARS.forEach((name) => updateCssVar(name, "0px"));
}
function useAppLifecycle() {
  onMounted(() => {
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "visible") {
        UniServiceJSBridge.emit("onAppEnterForeground");
      } else {
        UniServiceJSBridge.emit("onAppEnterBackground");
      }
    });
  });
}
function useAppClass() {
  const showTabBar = ref(false);
  const showMaxWidth = ref(false);
  function onChange2(type, value) {
    if (type === "showTabBar") {
      showTabBar.value = value;
    } else if (type === "showMaxWidth") {
      showMaxWidth.value = value;
    }
  }
  const clazz = computed(() => {
    return {
      "uni-app--showtabbar": showTabBar.value,
      "uni-app--maxwidth": showMaxWidth.value
    };
  });
  return {
    clazz,
    onChange: onChange2
  };
}
function initSystemComponents(app) {
  AppComponent.name = COMPONENT_NAME_PREFIX + AppComponent.name;
  app.component(AppComponent.name, AppComponent);
}
let appVm;
function getApp$1() {
  return appVm;
}
function isApp(vm) {
  return vm.$options.mpType === "app";
}
function initApp(vm) {
  appVm = vm;
  appVm.$vm = vm;
  appVm.globalData = appVm.$options.globalData || {};
}
function initMixin(app) {
  app.mixin({
    created() {
      this.__isApp = isApp(this);
      this.__isPage = !this.__isApp && isPage(this);
      if (this.__isApp) {
        initApp(this);
      } else if (this.__isPage) {
        initPage(this);
        this.$callHook("onLoad", {});
        this.__isVisible = true;
        this.$callHook("onShow");
      }
    },
    mounted() {
      if (this.__isPage) {
        this.$callHook("onReady");
      }
    },
    beforeActivate() {
      if (this.__isPage && !this.__isVisible) {
        this.$callHook("onShow");
      }
    },
    beforeDeactivate() {
      if (this.__isPage) {
        this.__isVisible = false;
        this.$callHook("onHide");
      }
    },
    beforeUnmount() {
      if (this.__isPage) {
        this.$callHook("onUnload");
      }
    }
  });
}
var index$3 = {
  install(app) {
    initApp$1(app);
    initView(app);
    initService(app);
    initSystemComponents(app);
    initMixin(app);
    if (__UNI_FEATURE_PAGES__) {
      initRouter(app);
    }
  }
};
function broadcast(componentName, eventName, ...params) {
  const children = this.$children;
  const len = children.length;
  for (let i = 0; i < len; i++) {
    const child = children[i];
    const name = child.$options.name && child.$options.name.substr(4);
    if (~componentName.indexOf(name)) {
      child.$emit.apply(child, [eventName].concat(params));
      return false;
    } else {
      if (broadcast.apply(child, [componentName, eventName].concat([params])) === false) {
        return false;
      }
    }
  }
}
var emitter = {
  methods: {
    $dispatch(componentName, eventName, ...params) {
      console.log("$dispatch", componentName, eventName, params);
    },
    $broadcast(componentName, eventName, ...params) {
      if (typeof componentName === "string") {
        componentName = [componentName];
      }
      broadcast.apply(this, [componentName, eventName].concat(params));
    }
  }
};
var listeners = {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  created() {
    this._addListeners(this.id);
    this.$watch("id", (newId, oldId) => {
      this._removeListeners(oldId, true);
      this._addListeners(newId, true);
    });
  },
  beforeDestroy() {
    this._removeListeners(this.id);
  },
  methods: {
    _addListeners(id2, watch) {
      if (watch && !id2) {
        return;
      }
      const {listeners: listeners2} = this.$options;
      if (!isPlainObject(listeners2)) {
        return;
      }
      Object.keys(listeners2).forEach((name) => {
        if (watch) {
          if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id2}`, this[listeners2[name]]);
          }
        } else {
          if (name.indexOf("@") === 0) {
            this.$on(`uni-${name.substr(1)}`, this[listeners2[name]]);
          } else if (name.indexOf("uni-") === 0) {
            UniViewJSBridge.on(name, this[listeners2[name]]);
          } else if (id2) {
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id2}`, this[listeners2[name]]);
          }
        }
      });
    },
    _removeListeners(id2, watch) {
      if (watch && !id2) {
        return;
      }
      const {listeners: listeners2} = this.$options;
      if (!isPlainObject(listeners2)) {
        return;
      }
      Object.keys(listeners2).forEach((name) => {
        if (watch) {
          if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id2}`, this[listeners2[name]]);
          }
        } else {
          if (name.indexOf("@") === 0) {
            this.$off(`uni-${name.substr(1)}`, this[listeners2[name]]);
          } else if (name.indexOf("uni-") === 0) {
            UniViewJSBridge.off(name, this[listeners2[name]]);
          } else if (id2) {
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id2}`, this[listeners2[name]]);
          }
        }
      });
    }
  }
};
var hover = {
  data() {
    return {
      hovering: false
    };
  },
  props: {
    hoverClass: {
      type: String,
      default: "none"
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 400
    }
  },
  methods: {
    _hoverTouchStart(evt) {
      if (evt._hoverPropagationStopped) {
        return;
      }
      if (!this.hoverClass || this.hoverClass === "none" || this.disabled) {
        return;
      }
      if (evt.touches.length > 1) {
        return;
      }
      if (this.hoverStopPropagation) {
        evt._hoverPropagationStopped = true;
      }
      this._hoverTouch = true;
      this._hoverStartTimer = setTimeout(() => {
        this.hovering = true;
        if (!this._hoverTouch) {
          this._hoverReset();
        }
      }, this.hoverStartTime);
    },
    _hoverTouchEnd(evt) {
      this._hoverTouch = false;
      if (this.hovering) {
        this._hoverReset();
      }
    },
    _hoverReset() {
      requestAnimationFrame(() => {
        clearTimeout(this._hoverStayTimer);
        this._hoverStayTimer = setTimeout(() => {
          this.hovering = false;
        }, this.hoverStayTime);
      });
    },
    _hoverTouchCancel(evt) {
      this._hoverTouch = false;
      this.hovering = false;
      clearTimeout(this._hoverStartTimer);
    }
  }
};
var subscriber = {
  mounted() {
    this._toggleListeners("subscribe", this.id);
    this.$watch("id", (newId, oldId) => {
      this._toggleListeners("unsubscribe", oldId, true);
      this._toggleListeners("subscribe", newId, true);
    });
  },
  beforeDestroy() {
    this._toggleListeners("unsubscribe", this.id);
    if (this._contextId) {
      this._toggleListeners("unsubscribe", this._contextId);
    }
  },
  methods: {
    _toggleListeners(type, id2, watch) {
      if (watch && !id2) {
        return;
      }
      if (!isFunction(this._handleSubscribe)) {
        return;
      }
      UniViewJSBridge[type](this.$page.id + "-" + this.$options.name.replace(/VUni([A-Z])/, "$1").toLowerCase() + "-" + id2, this._handleSubscribe);
    },
    _getContextInfo() {
      const id2 = `context-${this._uid}`;
      if (!this._contextId) {
        this._toggleListeners("subscribe", id2);
        this._contextId = id2;
      }
      return {
        name: this.$options.name.replace(/VUni([A-Z])/, "$1").toLowerCase(),
        id: id2,
        page: this.$page.id
      };
    }
  }
};
function hideKeyboard() {
  document.activeElement.blur();
}
function iosHideKeyboard() {
}
var keyboard = {
  name: "Keyboard",
  props: {
    cursorSpacing: {
      type: [Number, String],
      default: 0
    },
    showConfirmBar: {
      type: [Boolean, String],
      default: "auto"
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    focus(val) {
      if (val && false) {
        this.showSoftKeybord();
      }
    }
  },
  mounted() {
    if (this.autoFocus || this.focus) {
      this.showSoftKeybord();
    }
  },
  beforeDestroy() {
    this.onKeyboardHide();
  },
  methods: {
    initKeyboard(el) {
      el.addEventListener("focus", () => {
        this.hideKeyboardTemp = function() {
          hideKeyboard();
        };
        UniViewJSBridge.subscribe("hideKeyboard", this.hideKeyboardTemp);
        document.addEventListener("click", iosHideKeyboard, false);
      });
      el.addEventListener("blur", this.onKeyboardHide.bind(this));
    },
    showSoftKeybord() {
      plusReady(() => {
        plus.key.showSoftKeybord();
      });
    },
    setSoftinputTemporary() {
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview();
        const style = currentWebview.getStyle() || {};
        const rect = this.$el.getBoundingClientRect();
        currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
          mode: style.softinputMode === "adjustResize" ? "adjustResize" : this.adjustPosition ? "adjustPan" : "nothing",
          position: {
            top: rect.top,
            height: rect.height + (Number(this.cursorSpacing) || 0)
          }
        });
      });
    },
    setSoftinputNavBar() {
      if (this.showConfirmBar === "auto") {
        delete this.__softinputNavBar;
        return;
      }
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview();
        const {softinputNavBar} = currentWebview.getStyle() || {};
        const showConfirmBar = softinputNavBar !== "none";
        if (showConfirmBar !== this.showConfirmBar) {
          this.__softinputNavBar = softinputNavBar || "auto";
          currentWebview.setStyle({
            softinputNavBar: this.showConfirmBar ? "auto" : "none"
          });
        } else {
          delete this.__softinputNavBar;
        }
      });
    },
    resetSoftinputNavBar() {
      const softinputNavBar = this.__softinputNavBar;
      if (softinputNavBar) {
        plusReady(() => {
          const currentWebview = plus.webview.currentWebview();
          currentWebview.setStyle({
            softinputNavBar
          });
        });
      }
    },
    onKeyboardHide() {
      UniViewJSBridge.unsubscribe("hideKeyboard", this.hideKeyboardTemp);
      document.removeEventListener("click", iosHideKeyboard, false);
      if (String(navigator.vendor).indexOf("Apple") === 0) {
        document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
      }
    }
  }
};
function throttle(fn, wait) {
  let last = 0;
  let timeout;
  const newFn = function(...arg) {
    const now = Date.now();
    clearTimeout(timeout);
    const waitCallback = () => {
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
  };
  return newFn;
}
var baseInput = {
  name: "BaseInput",
  mixins: [emitter, keyboard],
  model: {
    prop: "value",
    event: "update:value"
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      valueSync: this._getValueString(this.value)
    };
  },
  created() {
    const valueChange = this.__valueChange = debounce((val) => {
      this.valueSync = this._getValueString(val);
    }, 100);
    this.$watch("value", valueChange);
    this.__triggerInput = throttle(($event, detail) => {
      this.$emit("update:value", detail.value);
      this.$trigger("input", $event, detail);
    }, 100);
    this.$triggerInput = ($event, detail) => {
      this.__valueChange.cancel();
      this.__triggerInput($event, detail);
    };
  },
  beforeDestroy() {
    this.__valueChange.cancel();
    this.__triggerInput.cancel();
  },
  methods: {
    _getValueString(value) {
      return value === null ? "" : String(value);
    }
  }
};
const _sfc_main$o = {
  name: "Audio",
  mixins: [subscriber],
  props: {
    id: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    controls: {
      type: [Boolean, String],
      default: false
    },
    poster: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playing: false,
      currentTime: this.getTime(0)
    };
  },
  watch: {
    src(val) {
      if (this.$refs.audio) {
        this.$refs.audio.src = this.$getRealPath(val);
      }
    }
  },
  mounted() {
    const audio = this.$refs.audio;
    audio.addEventListener("error", ($event) => {
      this.playing = false;
      this.$trigger("error", $event, {});
    });
    audio.addEventListener("play", ($event) => {
      this.playing = true;
      this.$trigger("play", $event, {});
    });
    audio.addEventListener("pause", ($event) => {
      this.playing = false;
      this.$trigger("pause", $event, {});
    });
    audio.addEventListener("ended", ($event) => {
      this.playing = false;
      this.$trigger("ended", $event, {});
    });
    audio.addEventListener("timeupdate", ($event) => {
      var currentTime = audio.currentTime;
      this.currentTime = this.getTime(currentTime);
      var duration = audio.duration;
      this.$trigger("timeupdate", $event, {
        currentTime,
        duration
      });
    });
    audio.src = this.$getRealPath(this.src);
  },
  methods: {
    _handleSubscribe({
      type,
      data = {}
    }) {
      var audio = this.$refs.audio;
      switch (type) {
        case "setSrc":
          audio.src = this.$getRealPath(data.src);
          this.$emit("update:src", data.src);
          break;
        case "play":
          audio.play();
          break;
        case "pause":
          audio.pause();
          break;
        case "seek":
          audio.currentTime = data.position;
          break;
      }
    },
    trigger() {
      if (this.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    getTime(time) {
      var h = Math.floor(time / 3600);
      var m = Math.floor(time % 3600 / 60);
      var s = Math.floor(time % 3600 % 60);
      h = (h < 10 ? "0" : "") + h;
      m = (m < 10 ? "0" : "") + m;
      s = (s < 10 ? "0" : "") + s;
      var str = m + ":" + s;
      if (h !== "00") {
        str = h + ":" + str;
      }
      return str;
    }
  }
};
const _hoisted_1$d = {class: "uni-audio-default"};
const _hoisted_2$6 = {class: "uni-audio-right"};
const _hoisted_3$2 = {class: "uni-audio-time"};
const _hoisted_4$2 = {class: "uni-audio-info"};
const _hoisted_5$1 = {class: "uni-audio-name"};
const _hoisted_6$1 = {class: "uni-audio-author"};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-audio", mergeProps({
    id: $props.id,
    controls: !!$props.controls
  }, _ctx.$attrs), [
    createVNode("audio", {
      ref: "audio",
      loop: $props.loop,
      style: {display: "none"}
    }, null, 8, ["loop"]),
    createVNode("div", _hoisted_1$d, [
      createVNode("div", {
        style: "background-image: url(" + _ctx.$getRealPath($props.poster) + ");",
        class: "uni-audio-left"
      }, [
        createVNode("div", {
          class: [{play: !$data.playing, pause: $data.playing}, "uni-audio-button"],
          onClick: _cache[1] || (_cache[1] = (...args) => $options.trigger && $options.trigger(...args))
        }, null, 2)
      ], 4),
      createVNode("div", _hoisted_2$6, [
        createVNode("div", _hoisted_3$2, toDisplayString($data.currentTime), 1),
        createVNode("div", _hoisted_4$2, [
          createVNode("div", _hoisted_5$1, toDisplayString($props.name), 1),
          createVNode("div", _hoisted_6$1, toDisplayString($props.author), 1)
        ])
      ])
    ])
  ], 16, ["id", "controls"]);
}
_sfc_main$o.render = _sfc_render$n;
const pixelRatio = function() {
  const canvas = document.createElement("canvas");
  canvas.height = canvas.width = 0;
  const context = canvas.getContext("2d");
  const backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}();
const forEach = function(obj, func) {
  for (const key in obj) {
    if (hasOwn$1(obj, key)) {
      func(obj[key], key);
    }
  }
};
const ratioArgs = {
  fillRect: "all",
  clearRect: "all",
  strokeRect: "all",
  moveTo: "all",
  lineTo: "all",
  arc: [0, 1, 2],
  arcTo: "all",
  bezierCurveTo: "all",
  isPointinPath: "all",
  isPointinStroke: "all",
  quadraticCurveTo: "all",
  rect: "all",
  translate: "all",
  createRadialGradient: "all",
  createLinearGradient: "all",
  setTransform: [4, 5]
};
const proto = CanvasRenderingContext2D.prototype;
proto.drawImageByCanvas = function(_super) {
  return function(canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
    if (!this.__hidpi__) {
      return _super.apply(this, arguments);
    }
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
}(proto.drawImage);
if (pixelRatio !== 1) {
  forEach(ratioArgs, function(value, key) {
    proto[key] = function(_super) {
      return function() {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments);
        }
        let args = Array.prototype.slice.call(arguments);
        if (value === "all") {
          args = args.map(function(a2) {
            return a2 * pixelRatio;
          });
        } else if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            args[value[i]] *= pixelRatio;
          }
        }
        return _super.apply(this, args);
      };
    }(proto[key]);
  });
  proto.stroke = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      this.lineWidth *= pixelRatio;
      _super.apply(this, arguments);
      this.lineWidth /= pixelRatio;
    };
  }(proto.stroke);
  proto.fillText = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      const args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio;
      args[2] *= pixelRatio;
      var font2 = this.font;
      this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
        return m * pixelRatio + u;
      });
      _super.apply(this, args);
      this.font = font2;
    };
  }(proto.fillText);
  proto.strokeText = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      var args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio;
      args[2] *= pixelRatio;
      var font2 = this.font;
      this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
        return m * pixelRatio + u;
      });
      _super.apply(this, args);
      this.font = font2;
    };
  }(proto.strokeText);
  proto.drawImage = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      this.scale(pixelRatio, pixelRatio);
      _super.apply(this, arguments);
      this.scale(1 / pixelRatio, 1 / pixelRatio);
    };
  }(proto.drawImage);
}
function wrapper(canvas) {
  canvas.width = canvas.offsetWidth * pixelRatio;
  canvas.height = canvas.offsetHeight * pixelRatio;
  canvas.getContext("2d").__hidpi__ = true;
}
var index_vue_vue_type_style_index_0_lang$d = "\nuni-canvas {\r\n  width: 300px;\r\n  height: 150px;\r\n  display: block;\r\n  position: relative;\n}\nuni-canvas > canvas {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\n}\r\n";
function resolveColor(color) {
  color = color.slice(0);
  color[3] = color[3] / 255;
  return "rgba(" + color.join(",") + ")";
}
function processTouches(target, touches) {
  return [].map.call(touches, (touch) => {
    var boundingClientRect = target.getBoundingClientRect();
    return {
      identifier: touch.identifier,
      x: touch.clientX - boundingClientRect.left,
      y: touch.clientY - boundingClientRect.top
    };
  });
}
var tempCanvas;
function getTempCanvas(width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement("canvas");
  }
  tempCanvas.width = width;
  tempCanvas.height = height;
  return tempCanvas;
}
const _sfc_main$n = {
  name: "Canvas",
  mixins: [subscriber],
  props: {
    canvasId: {
      type: String,
      default: ""
    },
    disableScroll: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      actionsWaiting: false
    };
  },
  computed: {
    id() {
      return this.canvasId;
    },
    _listeners() {
      var $listeners = Object.assign({}, this.$listeners);
      var events = ["touchstart", "touchmove", "touchend"];
      events.forEach((event2) => {
        var existing = $listeners[event2];
        var eventHandler = [];
        if (existing) {
          eventHandler.push(($event) => {
            this.$trigger(event2, Object.assign({}, $event, {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event.changedTouches)
            }));
          });
        }
        if (this.disableScroll && event2 === "touchmove") {
          eventHandler.push(this._touchmove);
        }
        $listeners[event2] = eventHandler;
      });
      return $listeners;
    }
  },
  created() {
    this._actionsDefer = [];
    this._images = {};
  },
  mounted() {
    this._resize({
      width: this.$refs.sensor.$el.offsetWidth,
      height: this.$refs.sensor.$el.offsetHeight
    });
  },
  beforeDestroy() {
    const canvas = this.$refs.canvas;
    canvas.height = canvas.width = 0;
  },
  methods: {
    _handleSubscribe({
      type,
      data = {}
    }) {
      var method = this[type];
      if (type.indexOf("_") !== 0 && typeof method === "function") {
        method(data);
      }
    },
    _resize() {
      var canvas = this.$refs.canvas;
      if (canvas.width > 0 && canvas.height > 0) {
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        wrapper(this.$refs.canvas);
        context.putImageData(imageData, 0, 0);
      } else {
        wrapper(this.$refs.canvas);
      }
    },
    _touchmove(event2) {
      event2.preventDefault();
    },
    actionsChanged({
      actions,
      reserve,
      callbackId
    }) {
      var self = this;
      if (!actions) {
        return;
      }
      if (this.actionsWaiting) {
        this._actionsDefer.push([actions, reserve, callbackId]);
        return;
      }
      var canvas = this.$refs.canvas;
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
      this.preloadImage(actions);
      for (let index2 = 0; index2 < actions.length; index2++) {
        const action = actions[index2];
        let method = action.method;
        const data = action.data;
        if (/^set/.test(method) && method !== "setTransform") {
          const method1 = method[3].toLowerCase() + method.slice(4);
          let color;
          if (method1 === "fillStyle" || method1 === "strokeStyle") {
            if (data[0] === "normal") {
              color = resolveColor(data[1]);
            } else if (data[0] === "linear") {
              const LinearGradient = c2d.createLinearGradient(...data[1]);
              data[2].forEach(function(data2) {
                const offset = data2[0];
                const color2 = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color2);
              });
              color = LinearGradient;
            } else if (data[0] === "radial") {
              const x = data[1][0];
              const y = data[1][1];
              const r = data[1][2];
              const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
              data[2].forEach(function(data2) {
                const offset = data2[0];
                const color2 = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color2);
              });
              color = LinearGradient;
            } else if (data[0] === "pattern") {
              const loaded = this.checkImageLoaded(data[1], actions.slice(index2 + 1), callbackId, function(image2) {
                if (image2) {
                  c2d[method1] = c2d.createPattern(image2, data[2]);
                }
              });
              if (!loaded) {
                break;
              }
              continue;
            }
            c2d[method1] = color;
          } else if (method1 === "globalAlpha") {
            c2d[method1] = data[0] / 255;
          } else if (method1 === "shadow") {
            var _ = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
            data.forEach(function(color_, method_) {
              c2d[_[method_]] = _[method_] === "shadowColor" ? resolveColor(color_) : color_;
            });
          } else {
            if (method1 === "fontSize") {
              c2d.font = c2d.font.replace(/\d+\.?\d*px/, data[0] + "px");
            } else {
              if (method1 === "lineDash") {
                c2d.setLineDash(data[0]);
                c2d.lineDashOffset = data[1] || 0;
              } else {
                if (method1 === "textBaseline") {
                  if (data[0] === "normal") {
                    data[0] = "alphabetic";
                  }
                  c2d[method1] = data[0];
                } else {
                  c2d[method1] = data[0];
                }
              }
            }
          }
        } else if (method === "fillPath" || method === "strokePath") {
          method = method.replace(/Path/, "");
          c2d.beginPath();
          data.forEach(function(data_) {
            c2d[data_.method].apply(c2d, data_.data);
          });
          c2d[method]();
        } else if (method === "fillText") {
          c2d.fillText.apply(c2d, data);
        } else if (method === "drawImage") {
          var A = function() {
            var dataArray = [...data];
            var url = dataArray[0];
            var otherData = dataArray.slice(1);
            self._images = self._images || {};
            if (!self.checkImageLoaded(url, actions.slice(index2 + 1), callbackId, function(image2) {
              if (image2) {
                c2d.drawImage.apply(c2d, [image2].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
              }
            }))
              return "break";
          }();
          if (A === "break") {
            break;
          }
        } else {
          if (method === "clip") {
            data.forEach(function(data_) {
              c2d[data_.method].apply(c2d, data_.data);
            });
            c2d.clip();
          } else {
            c2d[method].apply(c2d, data);
          }
        }
      }
      if (!this.actionsWaiting && callbackId) {
        UniViewJSBridge.publishHandler("onDrawCanvas", {
          callbackId,
          data: {
            errMsg: "drawCanvas:ok"
          }
        }, this.$page.id);
      }
    },
    preloadImage: function(actions) {
      var self = this;
      actions.forEach(function(action) {
        var method = action.method;
        var data = action.data;
        var src = "";
        if (method === "drawImage") {
          src = data[0];
          src = self.$getRealPath(src);
          data[0] = src;
        } else if (method === "setFillStyle" && data[0] === "pattern") {
          src = data[1];
          src = self.$getRealPath(src);
          data[1] = src;
        }
        if (src && !self._images[src]) {
          loadImage();
        }
        function loadImage() {
          self._images[src] = new Image();
          self._images[src].onload = function() {
            self._images[src].ready = true;
          };
          function loadBlob(blob) {
            self._images[src].src = (window.URL || window.webkitURL).createObjectURL(blob);
          }
          function loadFile(path) {
            var bitmap = new plus.nativeObj.Bitmap("bitmap" + Date.now());
            bitmap.load(path, function() {
              self._images[src].src = bitmap.toBase64Data();
              bitmap.clear();
            }, function() {
              bitmap.clear();
              console.error("preloadImage error");
            });
          }
          function loadUrl(url) {
            function plusDownload() {
              plus.downloader.createDownload(url, {
                filename: "_doc/uniapp_temp/download/"
              }, function(d, status) {
                if (status === 200) {
                  loadFile(d.filename);
                } else {
                  self._images[src].src = src;
                }
              }).start();
            }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.onload = function() {
              if (this.status === 200) {
                loadBlob(this.response);
              }
            };
            xhr.onerror = window.plus ? plusDownload : function() {
              self._images[src].src = src;
            };
            xhr.send();
          }
          if (window.plus && (!window.webkit || !window.webkit.messageHandlers)) {
            self._images[src].src = src;
          } else {
            if (window.plus && src.indexOf("http://") !== 0 && src.indexOf("https://") !== 0 && !/^data:.*,.*/.test(src)) {
              loadFile(src);
            } else if (/^data:.*,.*/.test(src)) {
              self._images[src].src = src;
            } else {
              loadUrl(src);
            }
          }
        }
      });
    },
    checkImageLoaded: function(src, actions, callbackId, fn) {
      var self = this;
      var image2 = this._images[src];
      if (image2.ready) {
        fn(image2);
        return true;
      } else {
        this._actionsDefer.unshift([actions, true]);
        this.actionsWaiting = true;
        image2.onload = function() {
          image2.ready = true;
          fn(image2);
          self.actionsWaiting = false;
          var actions2 = self._actionsDefer.slice(0);
          self._actionsDefer = [];
          for (var action = actions2.shift(); action; ) {
            self.actionsChanged({
              actions: action[0],
              reserve: action[1],
              callbackId
            });
            action = actions2.shift();
          }
        };
        return false;
      }
    },
    getImageData({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      callbackId
    }) {
      var imgData;
      var canvas = this.$refs.canvas;
      if (!width) {
        width = canvas.offsetWidth - x;
      }
      if (!height) {
        height = canvas.offsetHeight - y;
      }
      try {
        if (!hidpi) {
          if (!destWidth && !destHeight) {
            destWidth = Math.round(width * pixelRatio);
            destHeight = Math.round(height * pixelRatio);
          } else if (!destWidth) {
            destWidth = Math.round(width / height * destHeight);
          } else if (!destHeight) {
            destHeight = Math.round(height / width * destWidth);
          }
        } else {
          destWidth = width;
          destHeight = height;
        }
        const newCanvas = getTempCanvas(destWidth, destHeight);
        const context = newCanvas.getContext("2d");
        context.__hidpi__ = true;
        context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
        imgData = context.getImageData(0, 0, destWidth, destHeight);
        newCanvas.height = newCanvas.width = 0;
        context.__hidpi__ = false;
      } catch (error) {
        if (!callbackId) {
          return;
        }
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetImageData:fail"
          }
        }, this.$page.id);
        return;
      }
      if (!callbackId) {
        return {
          data: Array.prototype.slice.call(imgData.data),
          width: destWidth,
          height: destHeight
        };
      } else {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetImageData:ok",
            data: [...imgData.data],
            width: destWidth,
            height: destHeight
          }
        }, this.$page.id);
      }
    },
    putImageData({
      data,
      x,
      y,
      width,
      height,
      callbackId
    }) {
      try {
        if (!height) {
          height = Math.round(data.length / 4 / width);
        }
        const canvas = getTempCanvas(width, height);
        const context = canvas.getContext("2d");
        context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
        this.$refs.canvas.getContext("2d").drawImage(canvas, x, y, width, height);
        canvas.height = canvas.width = 0;
      } catch (error) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasPutImageData:fail"
          }
        }, this.$page.id);
        return;
      }
      UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
        callbackId,
        data: {
          errMsg: "canvasPutImageData:ok"
        }
      }, this.$page.id);
    },
    getDataUrl({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      fileType,
      qualit,
      callbackId
    }) {
      const res = this.getImageData({
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        hidpi
      });
      if (!res.data || !res.data.length) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:fail"
          }
        }, this.$page.id);
        return;
      }
      let imgData;
      try {
        imgData = new ImageData(new Uint8ClampedArray(res.data), res.width, res.height);
      } catch (error) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:fail"
          }
        }, this.$page.id);
        return;
      }
      destWidth = res.width;
      destHeight = res.height;
      const canvas = getTempCanvas(destWidth, destHeight);
      const c2d = canvas.getContext("2d");
      c2d.putImageData(imgData, 0, 0);
      let base64 = canvas.toDataURL("image/png");
      canvas.height = canvas.width = 0;
      const img = new Image();
      img.onload = () => {
        const canvas2 = getTempCanvas(destWidth, destHeight);
        if (fileType === "jpeg" || fileType === "jpg") {
          fileType = "jpeg";
          c2d.fillStyle = "#fff";
          c2d.fillRect(0, 0, destWidth, destHeight);
        }
        c2d.drawImage(img, 0, 0);
        base64 = canvas2.toDataURL(`image/${fileType}`, qualit);
        canvas2.height = canvas2.width = 0;
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:ok",
            base64
          }
        }, this.$page.id);
      };
      img.src = base64;
    }
  }
};
const _hoisted_1$c = {
  ref: "canvas",
  width: "300",
  height: "150"
};
const _hoisted_2$5 = {style: {position: "absolute", top: "0", left: "0", width: "100%", height: "100%", overflow: "hidden"}};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-canvas", mergeProps({
    "canvas-id": $props.canvasId,
    "disable-scroll": $props.disableScroll
  }, toHandlers($options._listeners)), [
    createVNode("canvas", _hoisted_1$c, null, 512),
    createVNode("div", _hoisted_2$5, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(_component_v_uni_resize_sensor, {
      ref: "sensor",
      onResize: $options._resize
    }, null, 8, ["onResize"])
  ], 16, ["canvas-id", "disable-scroll"]);
}
_sfc_main$n.render = _sfc_render$m;
const _sfc_main$m = {
  name: "Checkbox",
  mixins: [emitter, listeners],
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
    color: {
      type: String,
      default: "#007aff"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkboxChecked: this.checked,
      checkboxValue: this.value
    };
  },
  watch: {
    checked(val) {
      this.checkboxChecked = val;
    },
    value(val) {
      this.checkboxValue = val;
    }
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  created() {
    this.$dispatch("CheckboxGroup", "uni-checkbox-group-update", {
      type: "add",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("CheckboxGroup", "uni-checkbox-group-update", {
      type: "remove",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this.checkboxChecked = !this.checkboxChecked;
      this.$dispatch("CheckboxGroup", "uni-checkbox-change", $event);
    },
    _resetFormData() {
      this.checkboxChecked = false;
    }
  }
};
const _hoisted_1$b = {class: "uni-checkbox-wrapper"};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-checkbox", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$b, [
      createVNode("div", {
        class: [[$data.checkboxChecked ? "uni-checkbox-input-checked" : ""], "uni-checkbox-input"],
        style: {color: $props.color}
      }, null, 6),
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16, ["disabled"]);
}
_sfc_main$m.render = _sfc_render$l;
var index_vue_vue_type_style_index_0_lang$c = "\nuni-checkbox-group[hidden] {\r\n        display: none;\n}\r\n";
const _sfc_main$l = {
  name: "CheckboxGroup",
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkboxList: []
    };
  },
  listeners: {
    "@checkbox-change": "_changeHandler",
    "@checkbox-group-update": "_checkboxGroupUpdateHandler"
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _changeHandler($event) {
      const value = [];
      this.checkboxList.forEach((vm) => {
        if (vm.checkboxChecked) {
          value.push(vm.value);
        }
      });
      this.$trigger("change", $event, {
        value
      });
    },
    _checkboxGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.checkboxList.push($event.vm);
      } else {
        const index2 = this.checkboxList.indexOf($event.vm);
        this.checkboxList.splice(index2, 1);
      }
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        const value = [];
        this.checkboxList.forEach((vm) => {
          if (vm.checkboxChecked) {
            value.push(vm.value);
          }
        });
        data.value = value;
        data.key = this.name;
      }
      return data;
    }
  }
};
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-checkbox-group", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$l.render = _sfc_render$k;
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = makeMap("script,style");
function HTMLParser(html, handler) {
  var index2;
  var chars2;
  var match;
  var stack = [];
  var last = html;
  stack.last = function() {
    return this[this.length - 1];
  };
  while (html) {
    chars2 = true;
    if (!stack.last() || !special[stack.last()]) {
      if (html.indexOf("<!--") == 0) {
        index2 = html.indexOf("-->");
        if (index2 >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index2));
          }
          html = html.substring(index2 + 3);
          chars2 = false;
        }
      } else if (html.indexOf("</") == 0) {
        match = html.match(endTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars2 = false;
        }
      } else if (html.indexOf("<") == 0) {
        match = html.match(startTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars2 = false;
        }
      }
      if (chars2) {
        index2 = html.indexOf("<");
        var text2 = index2 < 0 ? html : html.substring(0, index2);
        html = index2 < 0 ? "" : html.substring(index2);
        if (handler.chars) {
          handler.chars(text2);
        }
      }
    } else {
      html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text3) {
        text3 = text3.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
        if (handler.chars) {
          handler.chars(text3);
        }
        return "";
      });
      parseEndTag("", stack.last());
    }
    if (html == last) {
      throw "Parse Error: " + html;
    }
    last = html;
  }
  parseEndTag();
  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();
    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag("", stack.last());
      }
    }
    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }
    unary = empty[tagName] || !!unary;
    if (!unary) {
      stack.push(tagName);
    }
    if (handler.start) {
      var attrs2 = [];
      rest.replace(attr, function(match2, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
        attrs2.push({
          name,
          value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
        });
      });
      if (handler.start) {
        handler.start(tagName, attrs2, unary);
      }
    }
  }
  function parseEndTag(tag, tagName) {
    if (!tagName) {
      var pos = 0;
    } else {
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) {
          break;
        }
      }
    }
    if (pos >= 0) {
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      }
      stack.length = pos;
    }
  }
}
function makeMap(str) {
  var obj = {};
  var items = str.split(",");
  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }
  return obj;
}
function divider(Quill) {
  const BlockEmbed = Quill.import("blots/block/embed");
  class Divider extends BlockEmbed {
  }
  Divider.blotName = "divider";
  Divider.tagName = "HR";
  return {
    "formats/divider": Divider
  };
}
function ins(Quill) {
  const Inline = Quill.import("blots/inline");
  class Ins extends Inline {
  }
  Ins.blotName = "ins";
  Ins.tagName = "INS";
  return {
    "formats/ins": Ins
  };
}
function align(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK,
    whitelist: ["left", "right", "center", "justify"]
  };
  const AlignStyle = new Attributor.Style("align", "text-align", config);
  return {
    "formats/align": AlignStyle
  };
}
function direction(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK,
    whitelist: ["rtl"]
  };
  const DirectionStyle = new Attributor.Style("direction", "direction", config);
  return {
    "formats/direction": DirectionStyle
  };
}
function list(Quill) {
  const Parchment = Quill.import("parchment");
  const Container = Quill.import("blots/container");
  const ListItem = Quill.import("formats/list/item");
  class List extends Container {
    static create(value) {
      const tagName = value === "ordered" ? "OL" : "UL";
      const node = super.create(tagName);
      if (value === "checked" || value === "unchecked") {
        node.setAttribute("data-checked", value === "checked");
      }
      return node;
    }
    static formats(domNode) {
      if (domNode.tagName === "OL")
        return "ordered";
      if (domNode.tagName === "UL") {
        if (domNode.hasAttribute("data-checked")) {
          return domNode.getAttribute("data-checked") === "true" ? "checked" : "unchecked";
        } else {
          return "bullet";
        }
      }
      return void 0;
    }
    constructor(domNode) {
      super(domNode);
      const listEventHandler = (e2) => {
        if (e2.target.parentNode !== domNode)
          return;
        const format = this.statics.formats(domNode);
        const blot = Parchment.find(e2.target);
        if (format === "checked") {
          blot.format("list", "unchecked");
        } else if (format === "unchecked") {
          blot.format("list", "checked");
        }
      };
      domNode.addEventListener("click", listEventHandler);
    }
    format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }
    formats() {
      return {[this.statics.blotName]: this.statics.formats(this.domNode)};
    }
    insertBefore(blot, ref2) {
      if (blot instanceof ListItem) {
        super.insertBefore(blot, ref2);
      } else {
        const index2 = ref2 == null ? this.length() : ref2.offset(this);
        const after = this.split(index2);
        after.parent.insertBefore(blot, after);
      }
    }
    optimize(context) {
      super.optimize(context);
      const next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked")) {
        next.moveChildren(this);
        next.remove();
      }
    }
    replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        const item = Parchment.create(this.statics.defaultChild);
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
  return {
    "formats/list": List
  };
}
function background(Quill) {
  const {Scope} = Quill.import("parchment");
  const BackgroundStyle = Quill.import("formats/background");
  const BackgroundColorStyle = new BackgroundStyle.constructor("backgroundColor", "background-color", {
    scope: Scope.INLINE
  });
  return {
    "formats/backgroundColor": BackgroundColorStyle
  };
}
function box(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK
  };
  const margin = [
    "margin",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight"
  ];
  const padding = [
    "padding",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ];
  const result = {};
  margin.concat(padding).forEach((name) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
  });
  return result;
}
function font(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.INLINE
  };
  const font2 = [
    "font",
    "fontSize",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "fontFamily"
  ];
  const result = {};
  font2.forEach((name) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
  });
  return result;
}
function text(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const text2 = [
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
  const result = {};
  text2.forEach(({name, scope}) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), {
      scope
    });
  });
  return result;
}
function image(Quill) {
  const Image2 = Quill.import("formats/image");
  const ATTRIBUTES = [
    "alt",
    "height",
    "width",
    "data-custom",
    "class",
    "data-local"
  ];
  Image2.sanitize = (url) => url;
  Image2.formats = function formats(domNode) {
    return ATTRIBUTES.reduce(function(formats2, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats2[attribute] = domNode.getAttribute(attribute);
      }
      return formats2;
    }, {});
  };
  const format = Image2.prototype.format;
  Image2.prototype.format = function(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      format.call(this, name, value);
    }
  };
}
function register(Quill) {
  const formats = {
    divider,
    ins,
    align,
    direction,
    list,
    background,
    box,
    font,
    text,
    image
  };
  const options = {};
  Object.values(formats).forEach((value) => Object.assign(options, value(Quill)));
  Quill.register(options, true);
}
var editor_css_vue_type_style_index_0_src_lang = ".ql-container {\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  -webkit-user-select: text;\n  user-select: text;\n  outline: none;\n  overflow: hidden;\n  width: 100%;\n  height: 200px;\n  min-height: 200px;\n}\n.ql-container[hidden] {\n  display: none;\n}\n.ql-container .ql-editor {\n  position: relative;\n  font-size: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  min-height: inherit;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-overflow-scrolling: touch;\n}\n.ql-container .ql-editor::-webkit-scrollbar {\n  width: 0 !important;\n}\n.ql-container .ql-editor.scroll-disabled {\n  overflow: hidden;\n}\n.ql-container .ql-image-overlay {\n  display: flex;\n  position: absolute;\n  box-sizing: border-box;\n  border: 1px dashed #ccc;\n  justify-content: center;\n  align-items: center;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.ql-container .ql-image-overlay .ql-image-size {\n  position: absolute;\n  padding: 4px 8px;\n  text-align: center;\n  background-color: #fff;\n  color: #888;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  opacity: 0.8;\n  right: 4px;\n  top: 4px;\n  font-size: 12px;\n  display: inline-block;\n  width: auto;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar {\n  position: relative;\n  text-align: center;\n  box-sizing: border-box;\n  background: #000;\n  border-radius: 5px;\n  color: #fff;\n  font-size: 0;\n  min-height: 24px;\n  z-index: 100;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span {\n  display: inline-block;\n  cursor: pointer;\n  padding: 5px;\n  font-size: 12px;\n  border-right: 1px solid #fff;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span:last-child {\n  border-right: 0;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span.triangle-up {\n  padding: 0;\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translatex(-50%);\n  width: 0;\n  height: 0;\n  border-width: 6px;\n  border-style: solid;\n  border-color: transparent transparent black transparent;\n}\n.ql-container .ql-image-overlay .ql-image-handle {\n  position: absolute;\n  height: 12px;\n  width: 12px;\n  border-radius: 50%;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  background: #fff;\n}\n.ql-container img {\n  display: inline-block;\n  max-width: 100%;\n}\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor {\n  box-sizing: border-box;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n.ql-editor ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 2em;\n}\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 2em;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 2em;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 2em;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 2em;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 4em;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 4em;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 4em;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 4em;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 8em;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 8em;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 8em;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 8em;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 10em;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 10em;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 10em;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 10em;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 14em;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 14em;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 14em;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 14em;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 16em;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 16em;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 16em;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 16em;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n.ql-editor.ql-blank::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  pointer-events: none;\n  position: absolute;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n";
var index_vue_vue_type_style_index_1_lang = "\n";
const _sfc_main$k = {
  name: "Editor",
  mixins: [subscriber, emitter, keyboard],
  props: {
    id: {
      type: String,
      default: ""
    },
    readOnly: {
      type: [Boolean, String],
      default: false
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
  },
  data() {
    return {
      quillReady: false
    };
  },
  computed: {},
  watch: {
    readOnly(value) {
      if (this.quillReady) {
        const quill = this.quill;
        quill.enable(!value);
        if (!value) {
          quill.blur();
        }
      }
    },
    placeholder(value) {
      if (this.quillReady) {
        this.quill.root.setAttribute("data-placeholder", value);
      }
    }
  },
  mounted() {
    const imageResizeModules = [];
    if (this.showImgSize) {
      imageResizeModules.push("DisplaySize");
    }
    if (this.showImgToolbar) {
      imageResizeModules.push("Toolbar");
    }
    if (this.showImgResize) {
      imageResizeModules.push("Resize");
    }
    this.loadQuill(() => {
      if (imageResizeModules.length) {
        this.loadImageResizeModule(() => {
          this.initQuill(imageResizeModules);
        });
      } else {
        this.initQuill(imageResizeModules);
      }
    });
  },
  methods: {
    _handleSubscribe({
      type,
      data
    }) {
      const {options, callbackId} = data;
      const quill = this.quill;
      const Quill = window.Quill;
      let res;
      let range;
      let errMsg;
      if (this.quillReady) {
        switch (type) {
          case "format":
            {
              let {name = "", value = false} = options;
              range = quill.getSelection(true);
              let format = quill.getFormat(range)[name] || false;
              if (["bold", "italic", "underline", "strike", "ins"].includes(name)) {
                value = !format;
              } else if (name === "direction") {
                value = value === "rtl" && format ? false : value;
                const align2 = quill.getFormat(range).align;
                if (value === "rtl" && !align2) {
                  quill.format("align", "right", Quill.sources.USER);
                } else if (!value && align2 === "right") {
                  quill.format("align", false, Quill.sources.USER);
                }
              } else if (name === "indent") {
                const rtl = quill.getFormat(range).direction === "rtl";
                value = value === "+1";
                if (rtl) {
                  value = !value;
                }
                value = value ? "+1" : "-1";
              } else {
                if (name === "list") {
                  value = value === "check" ? "unchecked" : value;
                  format = format === "checked" ? "unchecked" : format;
                }
                value = format && format !== (value || false) || !format && value ? value : !format;
              }
              quill.format(name, value, Quill.sources.USER);
            }
            break;
          case "insertDivider":
            range = quill.getSelection(true);
            quill.insertText(range.index, "\n", Quill.sources.USER);
            quill.insertEmbed(range.index + 1, "divider", true, Quill.sources.USER);
            quill.setSelection(range.index + 2, Quill.sources.SILENT);
            break;
          case "insertImage":
            {
              range = quill.getSelection(true);
              const {src = "", alt = "", width = "", height = "", extClass = "", data: data2 = {}} = options;
              const path = this.$getRealPath(src);
              quill.insertEmbed(range.index, "image", path, Quill.sources.USER);
              const local = /^(file|blob):/.test(path) ? path : false;
              quill.formatText(range.index, 1, "data-local", local);
              quill.formatText(range.index, 1, "alt", alt);
              quill.formatText(range.index, 1, "width", width);
              quill.formatText(range.index, 1, "height", height);
              quill.formatText(range.index, 1, "class", extClass);
              quill.formatText(range.index, 1, "data-custom", Object.keys(data2).map((key) => `${key}=${data2[key]}`).join("&"));
              quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
            break;
          case "insertText":
            {
              range = quill.getSelection(true);
              const {text: text2 = ""} = options;
              quill.insertText(range.index, text2, Quill.sources.USER);
              quill.setSelection(range.index + text2.length, 0, Quill.sources.SILENT);
            }
            break;
          case "setContents":
            {
              const {delta, html} = options;
              if (typeof delta === "object") {
                quill.setContents(delta, Quill.sources.SILENT);
              } else if (typeof html === "string") {
                quill.setContents(this.html2delta(html), Quill.sources.SILENT);
              } else {
                errMsg = "contents is missing";
              }
            }
            break;
          case "getContents":
            res = this.getContents();
            break;
          case "clear":
            quill.setContents([]);
            break;
          case "removeFormat":
            {
              range = quill.getSelection(true);
              const parchment = Quill.import("parchment");
              if (range.length) {
                quill.removeFormat(range, Quill.sources.USER);
              } else {
                Object.keys(quill.getFormat(range)).forEach((key) => {
                  if (parchment.query(key, parchment.Scope.INLINE)) {
                    quill.format(key, false);
                  }
                });
              }
            }
            break;
          case "undo":
            quill.history.undo();
            break;
          case "redo":
            quill.history.redo();
            break;
        }
        this.updateStatus(range);
      } else {
        errMsg = "not ready";
      }
      if (callbackId) {
        UniViewJSBridge.publishHandler("onEditorMethodCallback", {
          callbackId,
          data: Object.assign({}, res, {
            errMsg: `${type}:${errMsg ? "fail " + errMsg : "ok"}`
          })
        }, this.$page.id);
      }
    },
    loadQuill(callback) {
      if (typeof window.Quill === "function") {
        if (typeof callback === "function") {
          callback();
        }
        return;
      }
      const script = document.createElement("script");
      script.src = window.plus ? "./__uniappquill.js" : "https://unpkg.com/quill@1.3.7/dist/quill.min.js";
      document.body.appendChild(script);
      script.onload = callback;
    },
    loadImageResizeModule(callback) {
      if (typeof window.ImageResize === "function") {
        if (typeof callback === "function") {
          callback();
        }
        return;
      }
      const script = document.createElement("script");
      script.src = window.plus ? "./__uniappquillimageresize.js" : "https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js";
      document.body.appendChild(script);
      script.onload = callback;
    },
    initQuill(imageResizeModules) {
      const Quill = window.Quill;
      register(Quill);
      const options = {
        toolbar: false,
        readOnly: this.readOnly,
        placeholder: this.placeholder,
        modules: {}
      };
      if (imageResizeModules.length) {
        Quill.register("modules/ImageResize", window.ImageResize.default);
        options.modules.ImageResize = {
          modules: imageResizeModules
        };
      }
      const quill = this.quill = new Quill(this.$el, options);
      const $el = quill.root;
      const events = ["focus", "blur", "input"];
      events.forEach((name) => {
        $el.addEventListener(name, ($event) => {
          if (name === "input") {
            $event.stopPropagation();
          } else {
            this.$trigger(name, $event, this.getContents());
          }
        });
      });
      quill.on(Quill.events.TEXT_CHANGE, () => {
        this.$trigger("input", {}, this.getContents());
      });
      quill.on(Quill.events.SELECTION_CHANGE, this.updateStatus.bind(this));
      quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
        const range = quill.selection.getRange()[0];
        this.updateStatus(range);
      });
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        if (this.skipMatcher) {
          return delta;
        }
        delta.ops = delta.ops.filter(({insert}) => typeof insert === "string").map(({insert}) => ({insert}));
        return delta;
      });
      this.initKeyboard($el);
      this.quillReady = true;
      this.$trigger("ready", event, {});
    },
    getContents() {
      const quill = this.quill;
      const html = quill.root.innerHTML;
      const text2 = quill.getText();
      const delta = quill.getContents();
      return {
        html,
        text: text2,
        delta
      };
    },
    html2delta(html) {
      const tags = ["span", "strong", "b", "ins", "em", "i", "u", "a", "del", "s", "sub", "sup", "img", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol", "ul", "li", "br"];
      let content = "";
      let disable;
      HTMLParser(html, {
        start: function(tag, attrs2, unary) {
          if (!tags.includes(tag)) {
            disable = !unary;
            return;
          }
          disable = false;
          const arrts = attrs2.map(({name, value}) => `${name}="${value}"`).join(" ");
          const start = `<${tag} ${arrts} ${unary ? "/" : ""}>`;
          content += start;
        },
        end: function(tag) {
          if (!disable) {
            content += `</${tag}>`;
          }
        },
        chars: function(text2) {
          if (!disable) {
            content += text2;
          }
        }
      });
      this.skipMatcher = true;
      const delta = this.quill.clipboard.convert(content);
      this.skipMatcher = false;
      return delta;
    },
    updateStatus(range) {
      const status = range ? this.quill.getFormat(range) : {};
      const keys = Object.keys(status);
      if (keys.length !== Object.keys(this.__status || {}).length || keys.find((key) => status[key] !== this.__status[key])) {
        this.__status = status;
        this.$trigger("statuschange", {}, status);
      }
    }
  }
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-editor", mergeProps({
    id: $props.id,
    class: "ql-container"
  }, _ctx.$attrs), null, 16, ["id"]);
}
_sfc_main$k.render = _sfc_render$j;
var index_vue_vue_type_style_index_0_lang$b = "\r\n";
const _sfc_main$j = {
  name: "Form",
  mixins: [listeners],
  data() {
    return {
      childrenList: []
    };
  },
  listeners: {
    "@form-submit": "_onSubmit",
    "@form-reset": "_onReset",
    "@form-group-update": "_formGroupUpdateHandler"
  },
  methods: {
    _onSubmit($event) {
      const data = {};
      this.childrenList.forEach((vm) => {
        if (vm._getFormData && vm._getFormData().key) {
          data[vm._getFormData().key] = vm._getFormData().value;
        }
      });
      this.$trigger("submit", $event, {
        value: data
      });
    },
    _onReset($event) {
      this.$trigger("reset", $event, {});
      this.childrenList.forEach((vm) => {
        vm._resetFormData && vm._resetFormData();
      });
    },
    _formGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.childrenList.push($event.vm);
      } else {
        const index2 = this.childrenList.indexOf($event.vm);
        this.childrenList.splice(index2, 1);
      }
    }
  }
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-form", _ctx.$attrs, [
    createVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16);
}
_sfc_main$j.render = _sfc_render$i;
const INFO_COLOR = "#10aeff";
const WARN_COLOR = "#f76260";
const GREY_COLOR = "#b2b2b2";
const CANCEL_COLOR = "#f43530";
const ICONS = {
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
    c: CANCEL_COLOR
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
var index$2 = defineComponent({
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
  setup(props) {
    const path = computed(() => ICONS[props.type]);
    return () => createVNode("uni-icon", null, [path.value.d && createSvgIconVNode(path.value.d, props.color || path.value.c, rpx2px(props.size))]);
  }
});
var index_vue_vue_type_style_index_0_lang$a = "\n@keyframes once-show {\nfrom {\n    top: 0;\n}\n}\nuni-resize-sensor,\nuni-resize-sensor > div {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\nuni-resize-sensor {\n  display: block;\n  z-index: -1;\n  visibility: hidden;\n  animation: once-show 1ms;\n}\nuni-resize-sensor > div > div {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\nuni-resize-sensor > div:first-child > div {\n  width: 100000px;\n  height: 100000px;\n}\nuni-resize-sensor > div:last-child > div {\n  width: 200%;\n  height: 200%;\n}\n";
const _sfc_main$i = {
  name: "ResizeSensor",
  props: {
    initial: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function() {
    return {
      size: {
        width: -1,
        height: -1
      }
    };
  },
  watch: {
    size: {
      deep: true,
      handler: function(size) {
        this.$emit("resize", Object.assign({}, size));
      }
    }
  },
  mounted: function() {
    if (this.initial === true) {
      this.$nextTick(this.update);
    }
    if (this.$el.offsetParent !== this.$el.parentNode) {
      this.$el.parentNode.style.position = "relative";
    }
    if (!("AnimationEvent" in window)) {
      this.reset();
    }
  },
  methods: {
    reset: function() {
      var expand = this.$el.firstChild;
      var shrink = this.$el.lastChild;
      expand.scrollLeft = 1e5;
      expand.scrollTop = 1e5;
      shrink.scrollLeft = 1e5;
      shrink.scrollTop = 1e5;
    },
    update: function() {
      this.size.width = this.$el.offsetWidth;
      this.size.height = this.$el.offsetHeight;
      this.reset();
    }
  },
  render: function(create) {
    return create("uni-resize-sensor", {
      on: {
        "~animationstart": this.update
      }
    }, [
      create("div", {
        on: {
          scroll: this.update
        }
      }, [
        create("div")
      ]),
      create("div", {
        on: {
          scroll: this.update
        }
      }, [
        create("div")
      ])
    ]);
  }
};
const SCHEME_RE = /^([a-z-]+:)?\/\//i;
const DATA_RE = /^data:.*,.*/;
function addBase(filePath) {
  const base = __uniConfig.router.base;
  if (!base) {
    return filePath;
  }
  if (base !== "/") {
    if (("/" + filePath).indexOf(base) === 0) {
      return "/" + filePath;
    }
  }
  return base + filePath;
}
function getRealPath(filePath) {
  if (__uniConfig.router.base === "./") {
    filePath = filePath.replace(/^\.\/static\//, "/static/");
  }
  if (filePath.indexOf("/") === 0) {
    if (filePath.indexOf("//") === 0) {
      filePath = "https:" + filePath;
    } else {
      return addBase(filePath.substr(1));
    }
  }
  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) {
    return filePath;
  }
  const pages = getCurrentPages();
  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1));
  }
  return filePath;
}
const ua = navigator.userAgent;
const isAndroid = /android/i.test(ua);
const isIOS$1 = /iphone|ipad|ipod/i.test(ua);
function getScreenFix() {
  return /^Apple/.test(navigator.vendor) && typeof window.orientation === "number";
}
function isLandscape(screenFix) {
  return screenFix && Math.abs(window.orientation) === 90;
}
function getScreenWidth(screenFix, landscape) {
  return screenFix ? Math[landscape ? "max" : "min"](screen.width, screen.height) : screen.width;
}
function getScreenHeight(screenFix, landscape) {
  return screenFix ? Math[landscape ? "min" : "max"](screen.height, screen.width) : screen.height;
}
function getWindowWidth(screenWidth) {
  return Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth;
}
function getBaseSystemInfo() {
  const screenFix = getScreenFix();
  const windowWidth = getWindowWidth(getScreenWidth(screenFix, isLandscape(screenFix)));
  return {
    platform: isIOS$1 ? "ios" : "other",
    pixelRatio: window.devicePixelRatio,
    windowWidth
  };
}
const _sfc_main$h = {
  name: "Image",
  props: {
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
    }
  },
  data() {
    return {
      originalWidth: 0,
      originalHeight: 0,
      availHeight: ""
    };
  },
  computed: {
    ratio() {
      return this.originalWidth && this.originalHeight ? this.originalWidth / this.originalHeight : 0;
    },
    realImagePath() {
      return getRealPath(this.src);
    },
    modeStyle() {
      let size = "auto";
      let position = "";
      const repeat = "no-repeat";
      switch (this.mode) {
        case "aspectFit":
          size = "contain";
          position = "center center";
          break;
        case "aspectFill":
          size = "cover";
          position = "center center";
          break;
        case "widthFix":
          size = "100% 100%";
          break;
        case "top":
          position = "center top";
          break;
        case "bottom":
          position = "center bottom";
          break;
        case "center":
          position = "center center";
          break;
        case "left":
          position = "left center";
          break;
        case "right":
          position = "right center";
          break;
        case "top left":
          position = "left top";
          break;
        case "top right":
          position = "right top";
          break;
        case "bottom left":
          position = "left bottom";
          break;
        case "bottom right":
          position = "right bottom";
          break;
        default:
          size = "100% 100%";
          position = "0% 0%";
          break;
      }
      return `background-position:${position};background-size:${size};background-repeat:${repeat};`;
    }
  },
  watch: {
    src(newValue, oldValue) {
      this._setContentImage();
      this._loadImage();
    },
    mode(newValue, oldValue) {
      if (oldValue === "widthFix") {
        this.$el.style.height = this.availHeight;
      }
      if (newValue === "widthFix" && this.ratio) {
        this._fixSize();
      }
    }
  },
  components: {
    ResizeSensor: _sfc_main$i
  },
  mounted() {
    this.availHeight = this.$el.style.height || "";
    this._setContentImage();
    if (!this.realImagePath) {
      return;
    }
    this._loadImage();
  },
  methods: {
    _resize() {
      if (this.mode === "widthFix") {
        this._fixSize();
      }
    },
    _fixSize() {
      const elWidth = this._getWidth();
      if (elWidth) {
        let height = elWidth / this.ratio;
        if (typeof navigator && navigator.vendor === "Google Inc." && height > 10) {
          height = Math.round(height / 2) * 2;
        }
        this.$el.style.height = height + "px";
      }
    },
    _setContentImage() {
      this.$refs.content.style.backgroundImage = this.src ? `url("${this.realImagePath}")` : "none";
    },
    _loadImage() {
      const _self = this;
      const img = new Image();
      img.onload = function($event) {
        _self.originalWidth = this.width;
        _self.originalHeight = this.height;
        if (_self.mode === "widthFix") {
          _self._fixSize();
        }
        _self.$trigger("load", $event, {
          width: this.width,
          height: this.height
        });
      };
      img.onerror = function($event) {
        _self.$trigger("error", $event, {
          errMsg: `GET ${_self.src} 404 (Not Found)`
        });
      };
      img.src = this.realImagePath;
    },
    _getWidth() {
      const computedStyle = window.getComputedStyle(this.$el);
      const borderWidth = (parseFloat(computedStyle.borderLeftWidth, 10) || 0) + (parseFloat(computedStyle.borderRightWidth, 10) || 0);
      const paddingWidth = (parseFloat(computedStyle.paddingLeft, 10) || 0) + (parseFloat(computedStyle.paddingRight, 10) || 0);
      return this.$el.offsetWidth - borderWidth - paddingWidth;
    }
  }
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ResizeSensor = resolveComponent("ResizeSensor");
  return openBlock(), createBlock("uni-image", _ctx.$attrs, [
    createVNode("div", {
      ref: "content",
      style: $options.modeStyle
    }, null, 4),
    createVNode("img", {src: $options.realImagePath}, null, 8, ["src"]),
    $props.mode === "widthFix" ? (openBlock(), createBlock(_component_ResizeSensor, {
      key: 0,
      ref: "sensor",
      onResize: $options._resize
    }, null, 8, ["onResize"])) : createCommentVNode("", true)
  ], 16);
}
_sfc_main$h.render = _sfc_render$h;
const INPUT_TYPES = ["text", "number", "idcard", "digit", "password"];
const NUMBER_TYPES = ["number", "digit"];
const _sfc_main$g = {
  name: "Input",
  mixins: [baseInput],
  props: {
    name: {
      type: String,
      default: ""
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
      default: "input-placeholder"
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    confirmType: {
      type: String,
      default: "done"
    }
  },
  data() {
    return {
      composing: false,
      wrapperHeight: 0,
      cachedValue: ""
    };
  },
  computed: {
    inputType: function() {
      let type = "";
      switch (this.type) {
        case "text":
          this.confirmType === "search" && (type = "search");
          break;
        case "idcard":
          type = "text";
          break;
        case "digit":
          type = "number";
          break;
        default:
          type = ~INPUT_TYPES.indexOf(this.type) ? this.type : "text";
          break;
      }
      return this.password ? "password" : type;
    },
    step() {
      return ~NUMBER_TYPES.indexOf(this.type) ? "0.000000000000000001" : "";
    }
  },
  watch: {
    focus(val) {
      this.$refs.input && this.$refs.input[val ? "focus" : "blur"]();
    },
    maxlength(value) {
      const realValue = this.valueSync.slice(0, parseInt(value, 10));
      realValue !== this.valueSync && (this.valueSync = realValue);
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  mounted() {
    if (this.confirmType === "search") {
      const formElem = document.createElement("form");
      formElem.action = "";
      formElem.onsubmit = function() {
        return false;
      };
      formElem.className = "uni-input-form";
      formElem.appendChild(this.$refs.input);
      this.$refs.wrapper.appendChild(formElem);
    }
    let $vm = this;
    while ($vm) {
      const scopeId = $vm.$options._scopeId;
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, "");
      }
      $vm = $vm.$parent;
    }
    this.initKeyboard(this.$refs.input);
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onKeyup($event) {
      if ($event.keyCode === 13) {
        this.$trigger("confirm", $event, {
          value: $event.target.value
        });
      }
    },
    _onInput($event) {
      if (this.composing) {
        return;
      }
      if (~NUMBER_TYPES.indexOf(this.type)) {
        if (this.$refs.input.validity && !this.$refs.input.validity.valid) {
          $event.target.value = this.cachedValue;
          this.valueSync = $event.target.value;
          return;
        } else {
          this.cachedValue = this.valueSync;
        }
      }
      if (this.inputType === "number") {
        const maxlength = parseInt(this.maxlength, 10);
        if (maxlength > 0 && $event.target.value.length > maxlength) {
          $event.target.value = $event.target.value.slice(0, maxlength);
          this.valueSync = $event.target.value;
          return;
        }
      }
      this.$triggerInput($event, {
        value: this.valueSync
      });
    },
    _onFocus($event) {
      this.$trigger("focus", $event, {
        value: $event.target.value
      });
    },
    _onBlur($event) {
      this.$trigger("blur", $event, {
        value: $event.target.value
      });
    },
    _onComposition($event) {
      if ($event.type === "compositionstart") {
        this.composing = true;
      } else {
        this.composing = false;
      }
    },
    _resetFormData() {
      this.valueSync = "";
    },
    _getFormData() {
      return this.name ? {
        value: this.valueSync,
        key: this.name
      } : {};
    }
  }
};
const _hoisted_1$a = {
  ref: "wrapper",
  class: "uni-input-wrapper"
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-input", mergeProps({
    onChange: _cache[8] || (_cache[8] = withModifiers(() => {
    }, ["stop"]))
  }, _ctx.$attrs), [
    createVNode("div", _hoisted_1$a, [
      withDirectives(createVNode("div", {
        ref: "placeholder",
        style: $props.placeholderStyle,
        class: [$props.placeholderClass, "uni-input-placeholder"],
        textContent: toDisplayString($props.placeholder)
      }, null, 14, ["textContent"]), [
        [vShow, !($data.composing || _ctx.valueSync.length)]
      ]),
      withDirectives(createVNode("input", {
        ref: "input",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.valueSync = $event),
        disabled: $props.disabled,
        type: $options.inputType,
        maxlength: $props.maxlength,
        step: $options.step,
        autofocus: $props.focus,
        class: "uni-input-input",
        autocomplete: "off",
        onFocus: _cache[2] || (_cache[2] = (...args) => $options._onFocus && $options._onFocus(...args)),
        onBlur: _cache[3] || (_cache[3] = (...args) => $options._onBlur && $options._onBlur(...args)),
        onInput: _cache[4] || (_cache[4] = withModifiers((...args) => $options._onInput && $options._onInput(...args), ["stop"])),
        onCompositionstart: _cache[5] || (_cache[5] = (...args) => $options._onComposition && $options._onComposition(...args)),
        onCompositionend: _cache[6] || (_cache[6] = (...args) => $options._onComposition && $options._onComposition(...args)),
        onKeyup: _cache[7] || (_cache[7] = withModifiers((...args) => $options._onKeyup && $options._onKeyup(...args), ["stop"]))
      }, null, 40, ["disabled", "type", "maxlength", "step", "autofocus"]), [
        [vModelDynamic, _ctx.valueSync]
      ])
    ], 512)
  ], 16);
}
_sfc_main$g.render = _sfc_render$g;
var index_vue_vue_type_style_index_0_lang$9 = "\n.uni-label-pointer {\r\n  cursor: pointer;\n}\r\n";
const _sfc_main$f = {
  name: "Label",
  mixins: [emitter],
  props: {
    for: {
      type: String,
      default: ""
    }
  },
  computed: {
    pointer() {
      return this.for || this.$slots.default && this.$slots.default.length;
    }
  },
  methods: {
    _onClick($event) {
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test($event.target.className);
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test($event.target.tagName);
      }
      if (stopPropagation) {
        return;
      }
      if (this.for) {
        UniViewJSBridge.emit("uni-label-click-" + this.$page.id + "-" + this.for, $event, true);
      } else {
        this.$broadcast(["Checkbox", "Radio", "Switch", "Button"], "uni-label-click", $event, true);
      }
    }
  }
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-label", mergeProps({
    class: {"uni-label-pointer": $options.pointer}
  }, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$f.render = _sfc_render$f;
const addListenerToElement = function(element, type, callback, capture) {
  element.addEventListener(type, ($event) => {
    if (typeof callback === "function") {
      if (callback($event) === false) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }, {
    passive: false
  });
};
var touchtrack = {
  beforeDestroy() {
    document.removeEventListener("mousemove", this.__mouseMoveEventListener);
    document.removeEventListener("mouseup", this.__mouseUpEventListener);
  },
  methods: {
    touchtrack: function(element, method, useCancel) {
      const self = this;
      let x0 = 0;
      let y0 = 0;
      let x1 = 0;
      let y1 = 0;
      const fn = function($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          preventDefault: $event.preventDefault.bind($event),
          stopPropagation: $event.stopPropagation.bind($event),
          touches: $event.touches,
          changedTouches: $event.changedTouches,
          detail: {
            state,
            x0: x,
            y0: y,
            dx: x - x0,
            dy: y - y0,
            ddx: x - x1,
            ddy: y - y1,
            timeStamp: $event.timeStamp
          }
        }) === false) {
          return false;
        }
      };
      let $eventOld = null;
      let hasTouchStart;
      let hasMouseDown;
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
          const res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
          x1 = $event.touches[0].pageX;
          y1 = $event.touches[0].pageY;
          return res;
        }
      });
      const mouseMoveEventListener = this.__mouseMoveEventListener = function($event) {
        if (!hasTouchStart && hasMouseDown && $eventOld) {
          const res = fn($event, "move", $event.pageX, $event.pageY);
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
      const mouseUpEventListener = this.__mouseUpEventListener = function($event) {
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
          const $eventTemp = $eventOld;
          $eventOld = null;
          return fn($event, useCancel ? "cancel" : "end", $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY);
        }
      });
    }
  }
};
function e(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function t(t2, n) {
  return e(t2, 0, n);
}
function Decline() {
}
Decline.prototype.x = function(e2) {
  return Math.sqrt(e2);
};
function Friction$1(e2, t2) {
  this._m = e2;
  this._f = 1e3 * t2;
  this._startTime = 0;
  this._v = 0;
}
Friction$1.prototype.setV = function(x, y) {
  var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  this._x_v = x;
  this._y_v = y;
  this._x_a = -this._f * this._x_v / n;
  this._y_a = -this._f * this._y_v / n;
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
  this._lastDt = null;
  this._startTime = new Date().getTime();
};
Friction$1.prototype.setS = function(x, y) {
  this._x_s = x;
  this._y_s = y;
};
Friction$1.prototype.s = function(t2) {
  if (t2 === void 0) {
    t2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (t2 > this._t) {
    t2 = this._t;
    this._lastDt = t2;
  }
  var x = this._x_v * t2 + 0.5 * this._x_a * Math.pow(t2, 2) + this._x_s;
  var y = this._y_v * t2 + 0.5 * this._y_a * Math.pow(t2, 2) + this._y_s;
  if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) {
    x = this._endPositionX;
  }
  if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) {
    y = this._endPositionY;
  }
  return {
    x,
    y
  };
};
Friction$1.prototype.ds = function(t2) {
  if (t2 === void 0) {
    t2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (t2 > this._t) {
    t2 = this._t;
  }
  return {
    dx: this._x_v + this._x_a * t2,
    dy: this._y_v + this._y_a * t2
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
  var t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
  this._lastDt = null;
  return t2;
};
Friction$1.prototype.setEnd = function(x, y) {
  this._endPositionX = x;
  this._endPositionY = y;
};
Friction$1.prototype.reconfigure = function(m, f2) {
  this._m = m;
  this._f = 1e3 * f2;
};
function Spring$1(m, k, c) {
  this._m = m;
  this._k = k;
  this._c = c;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}
Spring$1.prototype._solve = function(e2, t2) {
  var n = this._c;
  var i = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i * r;
  if (o2 === 0) {
    const a2 = -n / (2 * i);
    const s = e2;
    const l = t2 / (a2 * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a2 * e3);
      },
      dx: function(e3) {
        var t3 = Math.pow(Math.E, a2 * e3);
        return a2 * (s + l * e3) * t3 + l * t3;
      }
    };
  }
  if (o2 > 0) {
    const c = (-n - Math.sqrt(o2)) / (2 * i);
    const u = (-n + Math.sqrt(o2)) / (2 * i);
    const d = (t2 - c * e2) / (u - c);
    const h = e2 - d;
    return {
      x: function(e3) {
        var t3;
        var n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * t3 + d * n2;
      },
      dx: function(e3) {
        var t3;
        var n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * c * t3 + d * u * n2;
      }
    };
  }
  var p2 = Math.sqrt(4 * i * r - n * n) / (2 * i);
  var f2 = -n / 2 * i;
  var v2 = e2;
  var g2 = (t2 - f2 * e2) / p2;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, f2 * e3);
      var n2 = Math.cos(p2 * e3);
      var i2 = Math.sin(p2 * e3);
      return t3 * (g2 * p2 * n2 - v2 * p2 * i2) + f2 * t3 * (g2 * i2 + v2 * n2);
    }
  };
};
Spring$1.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring$1.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring$1.prototype.setEnd = function(e2, n, i) {
  if (!i) {
    i = new Date().getTime();
  }
  if (e2 !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    var r = this._endPosition;
    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i - this._startTime) / 1e3);
      }
      r = this._solution.x((i - this._startTime) / 1e3);
      if (t(n, 0.1)) {
        n = 0;
      }
      if (t(r, 0.1)) {
        r = 0;
      }
      r += this._endPosition;
    }
    if (!(this._solution && t(r - e2, 0.1) && t(n, 0.1))) {
      this._endPosition = e2;
      this._solution = this._solve(r - this._endPosition, n);
      this._startTime = i;
    }
  }
};
Spring$1.prototype.snap = function(e2) {
  this._startTime = new Date().getTime();
  this._endPosition = e2;
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
  if (!n) {
    n = new Date().getTime();
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};
Spring$1.prototype.reconfigure = function(m, t2, c) {
  this._m = m;
  this._k = t2;
  this._c = c;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};
Spring$1.prototype.springConstant = function() {
  return this._k;
};
Spring$1.prototype.damping = function() {
  return this._c;
};
Spring$1.prototype.configuration = function() {
  function e2(e3, t3) {
    e3.reconfigure(1, t3, e3.damping());
  }
  function t2(e3, t3) {
    e3.reconfigure(1, e3.springConstant(), t3);
  }
  return [
    {
      label: "Spring Constant",
      read: this.springConstant.bind(this),
      write: e2.bind(this, this),
      min: 100,
      max: 1e3
    },
    {
      label: "Damping",
      read: this.damping.bind(this),
      write: t2.bind(this, this),
      min: 1,
      max: 500
    }
  ];
};
function STD(e2, t2, n) {
  this._springX = new Spring$1(e2, t2, n);
  this._springY = new Spring$1(e2, t2, n);
  this._springScale = new Spring$1(e2, t2, n);
  this._startTime = 0;
}
STD.prototype.setEnd = function(e2, t2, n, i) {
  var r = new Date().getTime();
  this._springX.setEnd(e2, i, r);
  this._springY.setEnd(t2, i, r);
  this._springScale.setEnd(n, i, r);
  this._startTime = r;
};
STD.prototype.x = function() {
  var e2 = (new Date().getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e2),
    y: this._springY.x(e2),
    scale: this._springScale.x(e2)
  };
};
STD.prototype.done = function() {
  var e2 = new Date().getTime();
  return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
};
STD.prototype.reconfigure = function(e2, t2, n) {
  this._springX.reconfigure(e2, t2, n);
  this._springY.reconfigure(e2, t2, n);
  this._springScale.reconfigure(e2, t2, n);
};
var index_vue_vue_type_style_index_0_lang$8 = "\nuni-movable-view {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  top: 0px;\n  left: 0px;\n  position: absolute;\n  cursor: grab;\n}\nuni-movable-view[hidden] {\n  display: none;\n}\n";
var requesting = false;
function _requestAnimationFrame(e2) {
  if (!requesting) {
    requesting = true;
    requestAnimationFrame(function() {
      e2();
      requesting = false;
    });
  }
}
function p(t2, n) {
  if (t2 === n) {
    return 0;
  }
  var i = t2.offsetLeft;
  return t2.offsetParent ? i += p(t2.offsetParent, n) : 0;
}
function f(t2, n) {
  if (t2 === n) {
    return 0;
  }
  var i = t2.offsetTop;
  return t2.offsetParent ? i += f(t2.offsetParent, n) : 0;
}
function v(a2, b) {
  return +((1e3 * a2 - 1e3 * b) / 1e3).toFixed(1);
}
function g(e2, t2, n) {
  var i = function(e3) {
    if (e3 && e3.id) {
      cancelAnimationFrame(e3.id);
    }
    if (e3) {
      e3.cancelled = true;
    }
  };
  var r = {
    id: 0,
    cancelled: false
  };
  function fn(n2, i2, r2, o2) {
    if (!n2 || !n2.cancelled) {
      r2(i2);
      var a2 = e2.done();
      if (!a2) {
        if (!n2.cancelled) {
          n2.id = requestAnimationFrame(fn.bind(null, n2, i2, r2, o2));
        }
      }
      if (a2 && o2) {
        o2(i2);
      }
    }
  }
  fn(r, e2, t2, n);
  return {
    cancel: i.bind(null, r),
    model: e2
  };
}
const _sfc_main$e = {
  name: "MovableView",
  mixins: [touchtrack],
  props: {
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
      default: 0.5
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
  },
  data() {
    return {
      xSync: this._getPx(this.x),
      ySync: this._getPx(this.y),
      scaleValueSync: Number(this.scaleValue) || 1,
      width: 0,
      height: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    };
  },
  computed: {
    dampingNumber() {
      var val = Number(this.damping);
      return isNaN(val) ? 20 : val;
    },
    frictionNumber() {
      var val = Number(this.friction);
      return isNaN(val) || val <= 0 ? 2 : val;
    },
    scaleMinNumber() {
      var val = Number(this.scaleMin);
      return isNaN(val) ? 0.5 : val;
    },
    scaleMaxNumber() {
      var val = Number(this.scaleMax);
      return isNaN(val) ? 10 : val;
    },
    xMove() {
      return this.direction === "all" || this.direction === "horizontal";
    },
    yMove() {
      return this.direction === "all" || this.direction === "vertical";
    }
  },
  watch: {
    x(val) {
      this.xSync = this._getPx(val);
    },
    xSync(val) {
      this._setX(val);
    },
    y(val) {
      this.ySync = this._getPx(val);
    },
    ySync(val) {
      this._setY(val);
    },
    scaleValue(val) {
      this.scaleValueSync = Number(val) || 0;
    },
    scaleValueSync(val) {
      this._setScaleValue(val);
    },
    scaleMinNumber() {
      this._setScaleMinOrMax();
    },
    scaleMaxNumber() {
      this._setScaleMinOrMax();
    }
  },
  created: function() {
    this._offset = {
      x: 0,
      y: 0
    };
    this._scaleOffset = {
      x: 0,
      y: 0
    };
    this._translateX = 0;
    this._translateY = 0;
    this._scale = 1;
    this._oldScale = 1;
    this._STD = new STD(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);
    this._friction = new Friction$1(1, this.frictionNumber);
    this._declineX = new Decline();
    this._declineY = new Decline();
    this.__touchInfo = {
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0]
    };
  },
  mounted: function() {
    this.touchtrack(this.$el, "_onTrack");
    this.setParent();
    this._friction.reconfigure(1, this.frictionNumber);
    this._STD.reconfigure(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);
    this.$el.style.transformOrigin = "center";
  },
  methods: {
    _getPx(val) {
      if (/\d+[ur]px$/i.test(val)) {
        return uni.upx2px(parseFloat(val));
      }
      return Number(val) || 0;
    },
    _setX: function(val) {
      if (this.xMove) {
        if (val + this._scaleOffset.x === this._translateX) {
          return this._translateX;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }
          this._animationTo(val + this._scaleOffset.x, this.ySync + this._scaleOffset.y, this._scale);
        }
      }
      return val;
    },
    _setY: function(val) {
      if (this.yMove) {
        if (val + this._scaleOffset.y === this._translateY) {
          return this._translateY;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }
          this._animationTo(this.xSync + this._scaleOffset.x, val + this._scaleOffset.y, this._scale);
        }
      }
      return val;
    },
    _setScaleMinOrMax: function() {
      if (!this.scale) {
        return false;
      }
      this._updateScale(this._scale, true);
      this._updateOldScale(this._scale);
    },
    _setScaleValue: function(scale) {
      if (!this.scale) {
        return false;
      }
      scale = this._adjustScale(scale);
      this._updateScale(scale, true);
      this._updateOldScale(scale);
      return scale;
    },
    __handleTouchStart: function() {
      if (!this._isScaling) {
        if (!this.disabled) {
          if (this._FA) {
            this._FA.cancel();
          }
          if (this._SFA) {
            this._SFA.cancel();
          }
          this.__touchInfo.historyX = [0, 0];
          this.__touchInfo.historyY = [0, 0];
          this.__touchInfo.historyT = [0, 0];
          if (this.xMove) {
            this.__baseX = this._translateX;
          }
          if (this.yMove) {
            this.__baseY = this._translateY;
          }
          this.$el.style.willChange = "transform";
          this._checkCanMove = null;
          this._firstMoveDirection = null;
          this._isTouching = true;
        }
      }
    },
    __handleTouchMove: function(event2) {
      var self = this;
      if (!this._isScaling && !this.disabled && this._isTouching) {
        let x = this._translateX;
        let y = this._translateY;
        if (this._firstMoveDirection === null) {
          this._firstMoveDirection = Math.abs(event2.detail.dx / event2.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
        }
        if (this.xMove) {
          x = event2.detail.dx + this.__baseX;
          this.__touchInfo.historyX.shift();
          this.__touchInfo.historyX.push(x);
          if (!this.yMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event2.detail.dx / event2.detail.dy) < 1;
          }
        }
        if (this.yMove) {
          y = event2.detail.dy + this.__baseY;
          this.__touchInfo.historyY.shift();
          this.__touchInfo.historyY.push(y);
          if (!this.xMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event2.detail.dy / event2.detail.dx) < 1;
          }
        }
        this.__touchInfo.historyT.shift();
        this.__touchInfo.historyT.push(event2.detail.timeStamp);
        if (!this._checkCanMove) {
          event2.preventDefault();
          let source = "touch";
          if (x < this.minX) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              x = this.minX - this._declineX.x(this.minX - x);
            } else {
              x = this.minX;
            }
          } else if (x > this.maxX) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              x = this.maxX + this._declineX.x(x - this.maxX);
            } else {
              x = this.maxX;
            }
          }
          if (y < this.minY) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              y = this.minY - this._declineY.x(this.minY - y);
            } else {
              y = this.minY;
            }
          } else {
            if (y > this.maxY) {
              if (this.outOfBounds) {
                source = "touch-out-of-bounds";
                y = this.maxY + this._declineY.x(y - this.maxY);
              } else {
                y = this.maxY;
              }
            }
          }
          _requestAnimationFrame(function() {
            self._setTransform(x, y, self._scale, source);
          });
        }
      }
    },
    __handleTouchEnd: function() {
      var self = this;
      if (!this._isScaling && !this.disabled && this._isTouching) {
        this.$el.style.willChange = "auto";
        this._isTouching = false;
        if (!this._checkCanMove && !this._revise("out-of-bounds") && this.inertia) {
          const xv = 1e3 * (this.__touchInfo.historyX[1] - this.__touchInfo.historyX[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);
          const yv = 1e3 * (this.__touchInfo.historyY[1] - this.__touchInfo.historyY[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);
          this._friction.setV(xv, yv);
          this._friction.setS(this._translateX, this._translateY);
          const x0 = this._friction.delta().x;
          const y0 = this._friction.delta().y;
          let x = x0 + this._translateX;
          let y = y0 + this._translateY;
          if (x < this.minX) {
            x = this.minX;
            y = this._translateY + (this.minX - this._translateX) * y0 / x0;
          } else {
            if (x > this.maxX) {
              x = this.maxX;
              y = this._translateY + (this.maxX - this._translateX) * y0 / x0;
            }
          }
          if (y < this.minY) {
            y = this.minY;
            x = this._translateX + (this.minY - this._translateY) * x0 / y0;
          } else {
            if (y > this.maxY) {
              y = this.maxY;
              x = this._translateX + (this.maxY - this._translateY) * x0 / y0;
            }
          }
          this._friction.setEnd(x, y);
          this._FA = g(this._friction, function() {
            var t2 = self._friction.s();
            var x2 = t2.x;
            var y2 = t2.y;
            self._setTransform(x2, y2, self._scale, "friction");
          }, function() {
            self._FA.cancel();
          });
        }
      }
    },
    _onTrack: function(event2) {
      switch (event2.detail.state) {
        case "start":
          this.__handleTouchStart();
          break;
        case "move":
          this.__handleTouchMove(event2);
          break;
        case "end":
          this.__handleTouchEnd();
      }
    },
    _getLimitXY: function(x, y) {
      var outOfBounds = false;
      if (x > this.maxX) {
        x = this.maxX;
        outOfBounds = true;
      } else {
        if (x < this.minX) {
          x = this.minX;
          outOfBounds = true;
        }
      }
      if (y > this.maxY) {
        y = this.maxY;
        outOfBounds = true;
      } else {
        if (y < this.minY) {
          y = this.minY;
          outOfBounds = true;
        }
      }
      return {
        x,
        y,
        outOfBounds
      };
    },
    setParent: function() {
      if (!this.$parent._isMounted) {
        return;
      }
      if (this._FA) {
        this._FA.cancel();
      }
      if (this._SFA) {
        this._SFA.cancel();
      }
      var scale = this.scale ? this.scaleValueSync : 1;
      this._updateOffset();
      this._updateWH(scale);
      this._updateBoundary();
      this._translateX = this.xSync + this._scaleOffset.x;
      this._translateY = this.ySync + this._scaleOffset.y;
      var limitXY = this._getLimitXY(this._translateX, this._translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      this._setTransform(x, y, scale, "", true);
      this._updateOldScale(scale);
    },
    _updateOffset: function() {
      this._offset.x = p(this.$el, this.$parent.$el);
      this._offset.y = f(this.$el, this.$parent.$el);
    },
    _updateWH: function(scale) {
      scale = scale || this._scale;
      scale = this._adjustScale(scale);
      var rect = this.$el.getBoundingClientRect();
      this.height = rect.height / this._scale;
      this.width = rect.width / this._scale;
      var height = this.height * scale;
      var width = this.width * scale;
      this._scaleOffset.x = (width - this.width) / 2;
      this._scaleOffset.y = (height - this.height) / 2;
    },
    _updateBoundary: function() {
      var x = 0 - this._offset.x + this._scaleOffset.x;
      var width = this.$parent.width - this.width - this._offset.x - this._scaleOffset.x;
      this.minX = Math.min(x, width);
      this.maxX = Math.max(x, width);
      var y = 0 - this._offset.y + this._scaleOffset.y;
      var height = this.$parent.height - this.height - this._offset.y - this._scaleOffset.y;
      this.minY = Math.min(y, height);
      this.maxY = Math.max(y, height);
    },
    _beginScale: function() {
      this._isScaling = true;
    },
    _endScale: function() {
      this._isScaling = false;
      this._updateOldScale(this._scale);
    },
    _setScale: function(scale) {
      if (this.scale) {
        scale = this._adjustScale(scale);
        scale = this._oldScale * scale;
        this._beginScale();
        this._updateScale(scale);
      }
    },
    _updateScale: function(scale, animat) {
      var self = this;
      if (this.scale) {
        scale = this._adjustScale(scale);
        this._updateWH(scale);
        this._updateBoundary();
        const limitXY = this._getLimitXY(this._translateX, this._translateY);
        const x = limitXY.x;
        const y = limitXY.y;
        if (animat) {
          this._animationTo(x, y, scale, "", true, true);
        } else {
          _requestAnimationFrame(function() {
            self._setTransform(x, y, scale, "", true, true);
          });
        }
      }
    },
    _updateOldScale: function(scale) {
      this._oldScale = scale;
    },
    _adjustScale: function(scale) {
      scale = Math.max(0.5, this.scaleMinNumber, scale);
      scale = Math.min(10, this.scaleMaxNumber, scale);
      return scale;
    },
    _animationTo: function(x, y, scale, source, r, o2) {
      var self = this;
      if (this._FA) {
        this._FA.cancel();
      }
      if (this._SFA) {
        this._SFA.cancel();
      }
      if (!this.xMove) {
        x = this._translateX;
      }
      if (!this.yMove) {
        y = this._translateY;
      }
      if (!this.scale) {
        scale = this._scale;
      }
      var limitXY = this._getLimitXY(x, y);
      x = limitXY.x;
      y = limitXY.y;
      if (!this.animation) {
        this._setTransform(x, y, scale, source, r, o2);
        return;
      }
      this._STD._springX._solution = null;
      this._STD._springY._solution = null;
      this._STD._springScale._solution = null;
      this._STD._springX._endPosition = this._translateX;
      this._STD._springY._endPosition = this._translateY;
      this._STD._springScale._endPosition = this._scale;
      this._STD.setEnd(x, y, scale, 1);
      this._SFA = g(this._STD, function() {
        var data = self._STD.x();
        var x2 = data.x;
        var y2 = data.y;
        var scale2 = data.scale;
        self._setTransform(x2, y2, scale2, source, r, o2);
      }, function() {
        self._SFA.cancel();
      });
    },
    _revise: function(source) {
      var limitXY = this._getLimitXY(this._translateX, this._translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      var outOfBounds = limitXY.outOfBounds;
      if (outOfBounds) {
        this._animationTo(x, y, this._scale, source);
      }
      return outOfBounds;
    },
    _setTransform: function(x, y, scale, source = "", r, o2) {
      if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) {
        x = this._translateX || 0;
      }
      if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) {
        y = this._translateY || 0;
      }
      x = Number(x.toFixed(1));
      y = Number(y.toFixed(1));
      scale = Number(scale.toFixed(1));
      if (!(this._translateX === x && this._translateY === y)) {
        if (!r) {
          this.$trigger("change", {}, {
            x: v(x, this._scaleOffset.x),
            y: v(y, this._scaleOffset.y),
            source
          });
        }
      }
      if (!this.scale) {
        scale = this._scale;
      }
      scale = this._adjustScale(scale);
      scale = +scale.toFixed(3);
      if (o2 && scale !== this._scale) {
        this.$trigger("scale", {}, {
          x,
          y,
          scale
        });
      }
      var transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
      this.$el.style.transform = transform;
      this.$el.style.webkitTransform = transform;
      this._translateX = x;
      this._translateY = y;
      this._scale = scale;
    }
  }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-movable-view", _ctx.$attrs, [
    createVNode(_component_v_uni_resize_sensor, {onResize: $options.setParent}, null, 8, ["onResize"]),
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$e.render = _sfc_render$e;
const OPEN_TYPES = [
  "navigate",
  "redirect",
  "switchTab",
  "reLaunch",
  "navigateBack"
];
const _sfc_main$d = {
  name: "Navigator",
  mixins: [hover],
  props: {
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
        return ~OPEN_TYPES.indexOf(value);
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: [Number, String],
      default: 20
    },
    hoverStayTime: {
      type: [Number, String],
      default: 600
    },
    exists: {
      type: String,
      default: ""
    }
  },
  methods: {
    _onClick($event) {
      if (this.openType !== "navigateBack" && !this.url) {
        console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
        return;
      }
      switch (this.openType) {
        case "navigate":
          uni.navigateTo({
            url: this.url
          });
          break;
        case "redirect":
          uni.redirectTo({
            url: this.url,
            exists: this.exists
          });
          break;
        case "switchTab":
          uni.switchTab({
            url: this.url
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url: this.url
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: this.delta
          });
          break;
      }
    }
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.hoverClass && $props.hoverClass !== "none" ? (openBlock(), createBlock("uni-navigator", {
    key: 0,
    class: [_ctx.hovering ? $props.hoverClass : ""],
    onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx._hoverTouchStart && _ctx._hoverTouchStart(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx._hoverTouchEnd && _ctx._hoverTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx._hoverTouchCancel && _ctx._hoverTouchCancel(...args)),
    onClick: _cache[4] || (_cache[4] = (...args) => $options._onClick && $options._onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 34)) : (openBlock(), createBlock("uni-navigator", {
    key: 1,
    onClick: _cache[5] || (_cache[5] = (...args) => $options._onClick && $options._onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ]));
}
_sfc_main$d.render = _sfc_render$d;
const VALUES = {
  activeColor: "#007AFF",
  backgroundColor: "#EBEBEB",
  activeMode: "backwards"
};
const _sfc_main$c = {
  name: "Progress",
  props: {
    percent: {
      type: [Number, String],
      default: 0,
      validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    showInfo: {
      type: [Boolean, String],
      default: false
    },
    strokeWidth: {
      type: [Number, String],
      default: 6,
      validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    color: {
      type: String,
      default: VALUES.activeColor
    },
    activeColor: {
      type: String,
      default: VALUES.activeColor
    },
    backgroundColor: {
      type: String,
      default: VALUES.backgroundColor
    },
    active: {
      type: [Boolean, String],
      default: false
    },
    activeMode: {
      type: String,
      default: VALUES.activeMode
    }
  },
  data() {
    return {
      currentPercent: 0,
      strokeTimer: 0,
      lastPercent: 0
    };
  },
  computed: {
    outerBarStyle() {
      return `background-color: ${this.backgroundColor}; height: ${this.strokeWidth}px;`;
    },
    innerBarStyle() {
      let backgroundColor = "";
      if (this.color !== VALUES.activeColor && this.activeColor === VALUES.activeColor) {
        backgroundColor = this.color;
      } else {
        backgroundColor = this.activeColor;
      }
      return `width: ${this.currentPercent}%;background-color: ${backgroundColor}`;
    },
    realPercent() {
      let realValue = parseFloat(this.percent, 10);
      realValue < 0 && (realValue = 0);
      realValue > 100 && (realValue = 100);
      return realValue;
    }
  },
  watch: {
    realPercent(newValue, oldValue) {
      this.strokeTimer && clearInterval(this.strokeTimer);
      this.lastPercent = oldValue || 0;
      this._activeAnimation();
    }
  },
  created() {
    this._activeAnimation();
  },
  methods: {
    _activeAnimation() {
      if (this.active) {
        this.currentPercent = this.activeMode === VALUES.activeMode ? 0 : this.lastPercent;
        this.strokeTimer = setInterval(() => {
          if (this.currentPercent + 1 > this.realPercent) {
            this.currentPercent = this.realPercent;
            this.strokeTimer && clearInterval(this.strokeTimer);
          } else {
            this.currentPercent += 1;
          }
        }, 30);
      } else {
        this.currentPercent = this.realPercent;
      }
    }
  }
};
const _hoisted_1$9 = {
  key: 0,
  class: "uni-progress-info"
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-progress", mergeProps({class: "uni-progress"}, _ctx.$attrs), [
    createVNode("div", {
      style: $options.outerBarStyle,
      class: "uni-progress-bar"
    }, [
      createVNode("div", {
        style: $options.innerBarStyle,
        class: "uni-progress-inner-bar"
      }, null, 4)
    ], 4),
    $props.showInfo ? (openBlock(), createBlock("p", _hoisted_1$9, toDisplayString($data.currentPercent) + "% ", 1)) : createCommentVNode("", true)
  ], 16);
}
_sfc_main$c.render = _sfc_render$c;
var index_vue_vue_type_style_index_0_lang$7 = '\nuni-radio {\r\n		-webkit-tap-highlight-color: transparent;\r\n		display: inline-block;\r\n		cursor: pointer;\n}\nuni-radio[hidden] {\r\n		display: none;\n}\nuni-radio[disabled] {\r\n		cursor: not-allowed;\n}\nuni-radio .uni-radio-wrapper {\r\n		display: -webkit-inline-flex;\r\n		display: inline-flex;\r\n		-webkit-align-items: center;\r\n		align-items: center;\r\n		vertical-align: middle;\n}\nuni-radio .uni-radio-input {\r\n		-webkit-appearance: none;\r\n		appearance: none;\r\n		margin-right: 5px;\r\n		outline: 0;\r\n		border: 1px solid #D1D1D1;\r\n		background-color: #ffffff;\r\n		border-radius: 50%;\r\n		width: 22px;\r\n		height: 22px;\r\n		position: relative;\n}\nuni-radio:not([disabled]) .uni-radio-input:hover {\r\n		border-color: #007aff;\n}\nuni-radio .uni-radio-input.uni-radio-input-checked:before {\r\n		font: normal normal normal 14px/1 "uni";\r\n		content: "\\EA08";\r\n		color: #ffffff;\r\n		font-size: 18px;\r\n		position: absolute;\r\n		top: 50%;\r\n		left: 50%;\r\n		transform: translate(-50%, -48%) scale(0.73);\r\n		-webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nuni-radio .uni-radio-input.uni-radio-input-disabled {\r\n		background-color: #E1E1E1;\r\n		border-color: #D1D1D1;\n}\nuni-radio .uni-radio-input.uni-radio-input-disabled:before {\r\n		color: #ADADAD;\n}\nuni-radio-group {\r\n		display: block;\n}\r\n';
const _sfc_main$b = {
  name: "Radio",
  mixins: [emitter, listeners],
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
    color: {
      type: String,
      default: "#007AFF"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      radioChecked: this.checked,
      radioValue: this.value
    };
  },
  computed: {
    checkedStyle() {
      return `background-color: ${this.color};border-color: ${this.color};`;
    }
  },
  watch: {
    checked(val) {
      this.radioChecked = val;
    },
    value(val) {
      this.radioValue = val;
    }
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  created() {
    this.$dispatch("RadioGroup", "uni-radio-group-update", {
      type: "add",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("RadioGroup", "uni-radio-group-update", {
      type: "remove",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onClick($event) {
      if (this.disabled || this.radioChecked) {
        return;
      }
      this.radioChecked = true;
      this.$dispatch("RadioGroup", "uni-radio-change", $event, this);
    },
    _resetFormData() {
      this.radioChecked = this.min;
    }
  }
};
const _hoisted_1$8 = {class: "uni-radio-wrapper"};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-radio", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$8, [
      createVNode("div", {
        class: [$data.radioChecked ? "uni-radio-input-checked" : "", "uni-radio-input"],
        style: $data.radioChecked ? $options.checkedStyle : ""
      }, null, 6),
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16, ["disabled"]);
}
_sfc_main$b.render = _sfc_render$b;
var index_vue_vue_type_style_index_0_lang$6 = "\nuni-radio-group[hidden] {\r\n		display: none;\n}\r\n";
const _sfc_main$a = {
  name: "RadioGroup",
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      radioList: []
    };
  },
  listeners: {
    "@radio-change": "_changeHandler",
    "@radio-group-update": "_radioGroupUpdateHandler"
  },
  mounted() {
    this._resetRadioGroupValue(this.radioList.length - 1);
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _changeHandler($event, vm) {
      const index2 = this.radioList.indexOf(vm);
      this._resetRadioGroupValue(index2, true);
      this.$trigger("change", $event, {
        value: vm.radioValue
      });
    },
    _radioGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.radioList.push($event.vm);
      } else {
        const index2 = this.radioList.indexOf($event.vm);
        this.radioList.splice(index2, 1);
      }
    },
    _resetRadioGroupValue(key, change) {
      this.radioList.forEach((value, index2) => {
        if (index2 === key) {
          return;
        }
        if (change) {
          this.radioList[index2].radioChecked = false;
        } else {
          this.radioList.forEach((v2, i) => {
            if (index2 >= i) {
              return;
            }
            if (this.radioList[i].radioChecked) {
              this.radioList[index2].radioChecked = false;
            }
          });
        }
      });
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        let value = "";
        this.radioList.forEach((vm) => {
          if (vm.radioChecked) {
            value = vm.value;
          }
        });
        data.value = value;
        data.key = this.name;
      }
      return data;
    }
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-radio-group", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$a.render = _sfc_render$a;
function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs2) {
  return attrs2.reduce(function(pre, attr2) {
    let value = attr2.value;
    const name = attr2.name;
    if (value.match(/ /) && name !== "style") {
      value = value.split(" ");
    }
    if (pre[name]) {
      if (Array.isArray(pre[name])) {
        pre[name].push(value);
      } else {
        pre[name] = [pre[name], value];
      }
    } else {
      pre[name] = value;
    }
    return pre;
  }, {});
}
function parseHtml(html) {
  html = removeDOCTYPE(html);
  const stacks = [];
  const results = {
    node: "root",
    children: []
  };
  HTMLParser(html, {
    start: function(tag, attrs2, unary) {
      const node = {
        name: tag
      };
      if (attrs2.length !== 0) {
        node.attrs = parseAttrs(attrs2);
      }
      if (unary) {
        const parent = stacks[0] || results;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function(tag) {
      const node = stacks.shift();
      if (node.name !== tag)
        console.error("invalid state: mismatch end tag");
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        const parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    chars: function(text2) {
      const node = {
        type: "text",
        text: text2
      };
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        const parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    comment: function(text2) {
      const node = {
        node: "comment",
        text: text2
      };
      const parent = stacks[0];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return results.children;
}
const TAGS = {
  a: "",
  abbr: "",
  b: "",
  blockquote: "",
  br: "",
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
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  hr: "",
  i: "",
  img: ["alt", "src", "height", "width"],
  ins: "",
  label: "",
  legend: "",
  li: "",
  ol: ["start", "type"],
  p: "",
  q: "",
  span: "",
  strong: "",
  sub: "",
  sup: "",
  table: ["width"],
  tbody: "",
  td: ["colspan", "rowspan", "height", "width"],
  tfoot: "",
  th: ["colspan", "rowspan", "height", "width"],
  thead: "",
  tr: "",
  ul: ""
};
const CHARS = {
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  apos: "'"
};
function decodeEntities(htmlString) {
  return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
    if (hasOwn$1(CHARS, stage) && CHARS[stage]) {
      return CHARS[stage];
    }
    if (/^#[0-9]{1,4}$/.test(stage)) {
      return String.fromCharCode(stage.slice(1));
    }
    if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
      return String.fromCharCode("0" + stage.slice(1));
    }
    const wrap = document.createElement("div");
    wrap.innerHTML = match;
    return wrap.innerText || wrap.textContent;
  });
}
function parseNodes(nodes, parentNode) {
  nodes.forEach(function(node) {
    if (!isPlainObject(node)) {
      return;
    }
    if (!hasOwn$1(node, "type") || node.type === "node") {
      if (!(typeof node.name === "string" && node.name)) {
        return;
      }
      const tagName = node.name.toLowerCase();
      if (!hasOwn$1(TAGS, tagName)) {
        return;
      }
      const elem = document.createElement(tagName);
      if (!elem) {
        return;
      }
      const attrs2 = node.attrs;
      if (isPlainObject(attrs2)) {
        const tagAttrs = TAGS[tagName] || [];
        Object.keys(attrs2).forEach(function(name) {
          let value = attrs2[name];
          switch (name) {
            case "class":
              Array.isArray(value) && (value = value.join(" "));
            case "style":
              elem.setAttribute(name, value);
              break;
            default:
              if (tagAttrs.indexOf(name) !== -1) {
                elem.setAttribute(name, value);
              }
          }
        });
      }
      const children = node.children;
      if (Array.isArray(children) && children.length) {
        parseNodes(node.children, elem);
      }
      parentNode.appendChild(elem);
    } else {
      if (node.type === "text" && typeof node.text === "string" && node.text !== "") {
        parentNode.appendChild(document.createTextNode(decodeEntities(node.text)));
      }
    }
  });
  return parentNode;
}
const _sfc_main$9 = {
  name: "RichText",
  props: {
    nodes: {
      type: [Array, String],
      default: function() {
        return [];
      }
    }
  },
  watch: {
    nodes(value) {
      this._renderNodes(value);
    }
  },
  mounted() {
    this._renderNodes(this.nodes);
  },
  methods: {
    _renderNodes(nodes) {
      if (typeof nodes === "string") {
        nodes = parseHtml(nodes);
      }
      const nodeList = parseNodes(nodes, document.createDocumentFragment());
      this.$el.firstChild.innerHTML = "";
      this.$el.firstChild.appendChild(nodeList);
    }
  }
};
const _hoisted_1$7 = /* @__PURE__ */ createVNode("div", null, null, -1);
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-rich-text", _ctx.$attrs, [
    _hoisted_1$7
  ], 16);
}
_sfc_main$9.render = _sfc_render$9;
function Friction(e2) {
  this._drag = e2;
  this._dragLog = Math.log(e2);
  this._x = 0;
  this._v = 0;
  this._startTime = 0;
}
Friction.prototype.set = function(e2, t2) {
  this._x = e2;
  this._v = t2;
  this._startTime = new Date().getTime();
};
Friction.prototype.setVelocityByEnd = function(e2) {
  this._v = (e2 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
};
Friction.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  var t2;
  t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
  this._dt = e2;
  return this._x + this._v * t2 / this._dragLog - this._v / this._dragLog;
};
Friction.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  var t2;
  t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
  this._dt = e2;
  return this._v * t2;
};
Friction.prototype.done = function() {
  return Math.abs(this.dx()) < 3;
};
Friction.prototype.reconfigure = function(e2) {
  var t2 = this.x();
  var n = this.dx();
  this._drag = e2;
  this._dragLog = Math.log(e2);
  this.set(t2, n);
};
Friction.prototype.configuration = function() {
  var e2 = this;
  return [
    {
      label: "Friction",
      read: function() {
        return e2._drag;
      },
      write: function(t2) {
        e2.reconfigure(t2);
      },
      min: 1e-3,
      max: 0.1,
      step: 1e-3
    }
  ];
};
function o(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function a(e2, t2) {
  return o(e2, 0, t2);
}
function Spring(e2, t2, n) {
  this._m = e2;
  this._k = t2;
  this._c = n;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}
Spring.prototype._solve = function(e2, t2) {
  var n = this._c;
  var i = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i * r;
  if (o2 === 0) {
    const a3 = -n / (2 * i);
    const s2 = e2;
    const l2 = t2 / (a3 * e2);
    return {
      x: function(e3) {
        return (s2 + l2 * e3) * Math.pow(Math.E, a3 * e3);
      },
      dx: function(e3) {
        var t3 = Math.pow(Math.E, a3 * e3);
        return a3 * (s2 + l2 * e3) * t3 + l2 * t3;
      }
    };
  }
  if (o2 > 0) {
    const c = (-n - Math.sqrt(o2)) / (2 * i);
    const u = (-n + Math.sqrt(o2)) / (2 * i);
    const l2 = (t2 - c * e2) / (u - c);
    const s2 = e2 - l2;
    return {
      x: function(e3) {
        let t3;
        let n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return s2 * t3 + l2 * n2;
      },
      dx: function(e3) {
        let t3;
        let n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return s2 * c * t3 + l2 * u * n2;
      }
    };
  }
  var d = Math.sqrt(4 * i * r - n * n) / (2 * i);
  var a2 = -n / 2 * i;
  var s = e2;
  var l = (t2 - a2 * e2) / d;
  return {
    x: function(e3) {
      return Math.pow(Math.E, a2 * e3) * (s * Math.cos(d * e3) + l * Math.sin(d * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, a2 * e3);
      var n2 = Math.cos(d * e3);
      var i2 = Math.sin(d * e3);
      return t3 * (l * d * n2 - s * d * i2) + a2 * t3 * (l * i2 + s * n2);
    }
  };
};
Spring.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring.prototype.setEnd = function(e2, t2, n) {
  if (!n) {
    n = new Date().getTime();
  }
  if (e2 !== this._endPosition || !a(t2, 0.4)) {
    t2 = t2 || 0;
    var i = this._endPosition;
    if (this._solution) {
      if (a(t2, 0.4)) {
        t2 = this._solution.dx((n - this._startTime) / 1e3);
      }
      i = this._solution.x((n - this._startTime) / 1e3);
      if (a(t2, 0.4)) {
        t2 = 0;
      }
      if (a(i, 0.4)) {
        i = 0;
      }
      i += this._endPosition;
    }
    if (!(this._solution && a(i - e2, 0.4) && a(t2, 0.4))) {
      this._endPosition = e2;
      this._solution = this._solve(i - this._endPosition, t2);
      this._startTime = n;
    }
  }
};
Spring.prototype.snap = function(e2) {
  this._startTime = new Date().getTime();
  this._endPosition = e2;
  this._solution = {
    x: function() {
      return 0;
    },
    dx: function() {
      return 0;
    }
  };
};
Spring.prototype.done = function(e2) {
  if (!e2) {
    e2 = new Date().getTime();
  }
  return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
};
Spring.prototype.reconfigure = function(e2, t2, n) {
  this._m = e2;
  this._k = t2;
  this._c = n;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};
Spring.prototype.springConstant = function() {
  return this._k;
};
Spring.prototype.damping = function() {
  return this._c;
};
Spring.prototype.configuration = function() {
  function e2(e3, t3) {
    e3.reconfigure(1, t3, e3.damping());
  }
  function t2(e3, t3) {
    e3.reconfigure(1, e3.springConstant(), t3);
  }
  return [
    {
      label: "Spring Constant",
      read: this.springConstant.bind(this),
      write: e2.bind(this, this),
      min: 100,
      max: 1e3
    },
    {
      label: "Damping",
      read: this.damping.bind(this),
      write: t2.bind(this, this),
      min: 1,
      max: 500
    }
  ];
};
function Scroll(extent, friction, spring) {
  this._extent = extent;
  this._friction = friction || new Friction(0.01);
  this._spring = spring || new Spring(1, 90, 20);
  this._startTime = 0;
  this._springing = false;
  this._springOffset = 0;
}
Scroll.prototype.snap = function(e2, t2) {
  this._springOffset = 0;
  this._springing = true;
  this._spring.snap(e2);
  this._spring.setEnd(t2);
};
Scroll.prototype.set = function(e2, t2) {
  this._friction.set(e2, t2);
  if (e2 > 0 && t2 >= 0) {
    this._springOffset = 0;
    this._springing = true;
    this._spring.snap(e2);
    this._spring.setEnd(0);
  } else {
    if (e2 < -this._extent && t2 <= 0) {
      this._springOffset = 0;
      this._springing = true;
      this._spring.snap(e2);
      this._spring.setEnd(-this._extent);
    } else {
      this._springing = false;
    }
  }
  this._startTime = new Date().getTime();
};
Scroll.prototype.x = function(e2) {
  if (!this._startTime) {
    return 0;
  }
  if (!e2) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (this._springing) {
    return this._spring.x() + this._springOffset;
  }
  var t2 = this._friction.x(e2);
  var n = this.dx(e2);
  if (t2 > 0 && n >= 0 || t2 < -this._extent && n <= 0) {
    this._springing = true;
    this._spring.setEnd(0, n);
    if (t2 < -this._extent) {
      this._springOffset = -this._extent;
    } else {
      this._springOffset = 0;
    }
    t2 = this._spring.x() + this._springOffset;
  }
  return t2;
};
Scroll.prototype.dx = function(e2) {
  var t2 = 0;
  t2 = this._lastTime === e2 ? this._lastDx : this._springing ? this._spring.dx(e2) : this._friction.dx(e2);
  this._lastTime = e2;
  this._lastDx = t2;
  return t2;
};
Scroll.prototype.done = function() {
  return this._springing ? this._spring.done() : this._friction.done();
};
Scroll.prototype.setVelocityByEnd = function(e2) {
  this._friction.setVelocityByEnd(e2);
};
Scroll.prototype.configuration = function() {
  var e2 = this._friction.configuration();
  e2.push.apply(e2, this._spring.configuration());
  return e2;
};
function i$1(scroll, t2, n) {
  function i(t3, scroll2, r2, o3) {
    if (!t3 || !t3.cancelled) {
      r2(scroll2);
      var a2 = scroll2.done();
      if (!a2) {
        if (!t3.cancelled) {
          t3.id = requestAnimationFrame(i.bind(null, t3, scroll2, r2, o3));
        }
      }
      if (a2 && o3) {
        o3(scroll2);
      }
    }
  }
  function r(scroll2) {
    if (scroll2 && scroll2.id) {
      cancelAnimationFrame(scroll2.id);
    }
    if (scroll2) {
      scroll2.cancelled = true;
    }
  }
  var o2 = {
    id: 0,
    cancelled: false
  };
  i(o2, scroll, t2, n);
  return {
    cancel: r.bind(null, o2),
    model: scroll
  };
}
function Scroller(element, options) {
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
Scroller.prototype.onTouchStart = function() {
  this._startPosition = this._position;
  this._lastChangePos = this._startPosition;
  if (this._startPosition > 0) {
    this._startPosition /= 0.5;
  } else {
    if (this._startPosition < -this._extent) {
      this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent;
    }
  }
  if (this._animation) {
    this._animation.cancel();
    this._scrolling = false;
  }
  this.updatePosition();
};
Scroller.prototype.onTouchMove = function(x, y) {
  var startPosition = this._startPosition;
  if (this._enableX) {
    startPosition += x;
  } else if (this._enableY) {
    startPosition += y;
  }
  if (startPosition > 0) {
    startPosition *= 0.5;
  } else if (startPosition < -this._extent) {
    startPosition = 0.5 * (startPosition + this._extent) - this._extent;
  }
  this._position = startPosition;
  this.updatePosition();
  this.dispatchScroll();
};
Scroller.prototype.onTouchEnd = function(e2, r, o2) {
  if (this._enableSnap && this._position > -this._extent && this._position < 0) {
    if (this._enableY && (Math.abs(r) < this._itemSize && Math.abs(o2.y) < 300 || Math.abs(o2.y) < 150)) {
      this.snap();
      return;
    }
    if (this._enableX && (Math.abs(e2) < this._itemSize && Math.abs(o2.x) < 300 || Math.abs(o2.x) < 150)) {
      this.snap();
      return;
    }
  }
  if (this._enableX) {
    this._scroll.set(this._position, o2.x);
  } else if (this._enableY) {
    this._scroll.set(this._position, o2.y);
  }
  if (this._enableSnap) {
    var s = this._scroll._friction.x(100);
    var l = s % this._itemSize;
    var c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
    if (c <= 0 && c >= -this._extent) {
      this._scroll.setVelocityByEnd(c);
    }
  }
  this._lastTime = Date.now();
  this._lastDelay = 0;
  this._scrolling = true;
  this._lastChangePos = this._position;
  this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize));
  this._animation = i$1(this._scroll, () => {
    var e3 = Date.now();
    var i = (e3 - this._scroll._startTime) / 1e3;
    var r2 = this._scroll.x(i);
    this._position = r2;
    this.updatePosition();
    var o3 = this._scroll.dx(i);
    if (this._shouldDispatchScrollEvent && e3 - this._lastTime > this._lastDelay) {
      this.dispatchScroll();
      this._lastDelay = Math.abs(2e3 / o3);
      this._lastTime = e3;
    }
  }, () => {
    if (this._enableSnap) {
      if (c <= 0 && c >= -this._extent) {
        this._position = c;
        this.updatePosition();
      }
      if (typeof this._options.onSnap === "function") {
        this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
      }
    }
    if (this._shouldDispatchScrollEvent) {
      this.dispatchScroll();
    }
    this._scrolling = false;
  });
};
Scroller.prototype.onTransitionEnd = function() {
  this._element.style.transition = "";
  this._element.style.webkitTransition = "";
  this._element.removeEventListener("transitionend", this._onTransitionEnd);
  this._element.removeEventListener("webkitTransitionEnd", this._onTransitionEnd);
  if (this._snapping) {
    this._snapping = false;
  }
  this.dispatchScroll();
};
Scroller.prototype.snap = function() {
  var e2 = this._itemSize;
  var t2 = this._position % e2;
  var i = Math.abs(t2) > this._itemSize / 2 ? this._position - (e2 - Math.abs(t2)) : this._position - t2;
  if (this._position !== i) {
    this._snapping = true;
    this.scrollTo(-i);
    if (typeof this._options.onSnap === "function") {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }
};
Scroller.prototype.scrollTo = function(e2, t2) {
  if (this._animation) {
    this._animation.cancel();
    this._scrolling = false;
  }
  if (typeof e2 === "number") {
    this._position = -e2;
  }
  if (this._position < -this._extent) {
    this._position = -this._extent;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }
  this._element.style.transition = "transform " + (t2 || 0.2) + "s ease-out";
  this._element.style.webkitTransition = "-webkit-transform " + (t2 || 0.2) + "s ease-out";
  this.updatePosition();
  this._element.addEventListener("transitionend", this._onTransitionEnd);
  this._element.addEventListener("webkitTransitionEnd", this._onTransitionEnd);
};
Scroller.prototype.dispatchScroll = function() {
  if (typeof this._options.onScroll === "function" && Math.round(this._lastPos) !== Math.round(this._position)) {
    this._lastPos = this._position;
    var e2 = {
      target: {
        scrollLeft: this._enableX ? -this._position : 0,
        scrollTop: this._enableY ? -this._position : 0,
        scrollHeight: this._scrollHeight || this._element.offsetHeight,
        scrollWidth: this._scrollWidth || this._element.offsetWidth,
        offsetHeight: this._element.parentElement.offsetHeight,
        offsetWidth: this._element.parentElement.offsetWidth
      }
    };
    this._options.onScroll(e2);
  }
};
Scroller.prototype.update = function(e2, t2, n) {
  var i = 0;
  var r = this._position;
  if (this._enableX) {
    i = this._element.childNodes.length ? (t2 || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
    this._scrollWidth = t2;
  } else {
    i = this._element.childNodes.length ? (t2 || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
    this._scrollHeight = t2;
  }
  if (typeof e2 === "number") {
    this._position = -e2;
  }
  if (this._position < -i) {
    this._position = -i;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }
  this._itemSize = n || this._itemSize;
  this.updatePosition();
  if (r !== this._position) {
    this.dispatchScroll();
    if (typeof this._options.onSnap === "function") {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }
  this._extent = i;
  this._scroll._extent = i;
};
Scroller.prototype.updatePosition = function() {
  var transform = "";
  if (this._enableX) {
    transform = "translateX(" + this._position + "px) translateZ(0)";
  } else {
    if (this._enableY) {
      transform = "translateY(" + this._position + "px) translateZ(0)";
    }
  }
  this._element.style.webkitTransform = transform;
  this._element.style.transform = transform;
};
Scroller.prototype.isScrolling = function() {
  return this._scrolling || this._snapping;
};
var scroller = {
  methods: {
    initScroller: function(element, options) {
      this._touchInfo = {
        trackingID: -1,
        maxDy: 0,
        maxDx: 0
      };
      this._scroller = new Scroller(element, options);
      this.__handleTouchStart = this._handleTouchStart.bind(this);
      this.__handleTouchMove = this._handleTouchMove.bind(this);
      this.__handleTouchEnd = this._handleTouchEnd.bind(this);
      this._initedScroller = true;
    },
    _findDelta: function(event2) {
      var touchInfo = this._touchInfo;
      return event2.detail.state === "move" || event2.detail.state === "end" ? {
        x: event2.detail.dx,
        y: event2.detail.dy
      } : {
        x: event2.screenX - touchInfo.x,
        y: event2.screenY - touchInfo.y
      };
    },
    _handleTouchStart: function(e2) {
      var t2 = this._touchInfo;
      var n = this._scroller;
      if (n) {
        if (e2.detail.state === "start") {
          t2.trackingID = "touch";
          t2.x = e2.detail.x;
          t2.y = e2.detail.y;
        } else {
          t2.trackingID = "mouse";
          t2.x = e2.screenX;
          t2.y = e2.screenY;
        }
        t2.maxDx = 0;
        t2.maxDy = 0;
        t2.historyX = [0];
        t2.historyY = [0];
        t2.historyTime = [e2.detail.timeStamp];
        t2.listener = n;
        if (n.onTouchStart) {
          n.onTouchStart();
        }
        event.preventDefault();
      }
    },
    _handleTouchMove: function(event2) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event2.preventDefault();
        var delta = this._findDelta(event2);
        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(event2.detail.timeStamp); touchInfo.historyTime.length > 10; ) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }
          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y, event2.detail.timeStamp);
          }
        }
      }
    },
    _handleTouchEnd: function(event2) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event2.preventDefault();
        var delta = this._findDelta(event2);
        if (delta) {
          var listener = touchInfo.listener;
          touchInfo.trackingID = -1;
          touchInfo.listener = null;
          var r = touchInfo.historyTime.length;
          var o2 = {
            x: 0,
            y: 0
          };
          if (r > 2) {
            for (var a2 = touchInfo.historyTime.length - 1, s = touchInfo.historyTime[a2], l = touchInfo.historyX[a2], c = touchInfo.historyY[a2]; a2 > 0; ) {
              a2--;
              var u = touchInfo.historyTime[a2];
              var d = s - u;
              if (d > 30 && d < 50) {
                o2.x = (l - touchInfo.historyX[a2]) / (d / 1e3);
                o2.y = (c - touchInfo.historyY[a2]) / (d / 1e3);
                break;
              }
            }
          }
          touchInfo.historyTime = [];
          touchInfo.historyX = [];
          touchInfo.historyY = [];
          if (listener && listener.onTouchEnd) {
            listener.onTouchEnd(delta.x, delta.y, o2);
          }
        }
      }
    }
  }
};
var index_vue_vue_type_style_index_0_lang$5 = "\nuni-scroll-view {\n  display: block;\n  width: 100%;\n}\nuni-scroll-view[hidden] {\n  display: none;\n}\n.uni-scroll-view {\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n  /* display: flex; \u65F6\u5728\u5B89\u5353\u4E0B\u4F1A\u5BFC\u81F4scrollWidth\u548CoffsetWidth\u4E00\u6837 */\n  height: 100%;\n  max-height: inherit;\n}\n.uni-scroll-view-content {\n  width: 100%;\n  height: 100%;\n}\n.uni-scroll-view-refresher {\n  position: relative;\n  overflow: hidden;\n}\n.uni-scroll-view-refresh {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.uni-scroll-view-refresh-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #fff;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),\n    0 1px 4px rgba(0, 0, 0, 0.117647);\n}\n.uni-scroll-view-refresh__spinner {\n  transform-origin: center center;\n  animation: uni-scroll-view-refresh-rotate 2s linear infinite;\n}\n.uni-scroll-view-refresh__spinner > circle {\n  stroke: currentColor;\n  stroke-linecap: round;\n  animation: uni-scroll-view-refresh-dash 2s linear infinite;\n}\n@keyframes uni-scroll-view-refresh-rotate {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes uni-scroll-view-refresh-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n";
const passiveOptions = {passive: true};
const _sfc_main$8 = {
  name: "ScrollView",
  mixins: [scroller],
  props: {
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
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
      default: "back"
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
  data() {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0,
      refresherHeight: 0,
      refreshRotate: 0,
      refreshState: ""
    };
  },
  computed: {
    upperThresholdNumber() {
      var val = Number(this.upperThreshold);
      return isNaN(val) ? 50 : val;
    },
    lowerThresholdNumber() {
      var val = Number(this.lowerThreshold);
      return isNaN(val) ? 50 : val;
    },
    scrollTopNumber() {
      return Number(this.scrollTop) || 0;
    },
    scrollLeftNumber() {
      return Number(this.scrollLeft) || 0;
    }
  },
  watch: {
    scrollTopNumber(val) {
      this._scrollTopChanged(val);
    },
    scrollLeftNumber(val) {
      this._scrollLeftChanged(val);
    },
    scrollIntoView(val) {
      this._scrollIntoViewChanged(val);
    },
    refresherTriggered(val) {
      if (val === true) {
        this._setRefreshState("refreshing");
      } else if (val === false) {
        this._setRefreshState("restore");
      }
    }
  },
  mounted() {
    var self = this;
    this._attached = true;
    this._scrollTopChanged(this.scrollTopNumber);
    this._scrollLeftChanged(this.scrollLeftNumber);
    this._scrollIntoViewChanged(this.scrollIntoView);
    this.__handleScroll = function(e2) {
      event.preventDefault();
      event.stopPropagation();
      self._handleScroll.bind(self, event)();
    };
    var touchStart = null;
    var needStop = null;
    this.__handleTouchMove = function(event2) {
      var x = event2.touches[0].pageX;
      var y = event2.touches[0].pageY;
      var main = self.$refs.main;
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false;
              return;
            } else if (main.scrollWidth === main.offsetWidth + main.scrollLeft && x < touchStart.x) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        } else {
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false;
              return;
            } else if (main.scrollHeight === main.offsetHeight + main.scrollTop && y < touchStart.y) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        }
      }
      if (needStop) {
        event2.stopPropagation();
      }
      if (self.refresherEnabled && self.refreshState === "pulling") {
        const dy = y - touchStart.y;
        self.refresherHeight = dy;
        let rotate = dy / self.refresherThreshold;
        if (rotate > 1) {
          rotate = 1;
        } else {
          rotate = rotate * 360;
        }
        self.refreshRotate = rotate;
        self.$trigger("refresherpulling", event2, {
          deltaY: dy
        });
      }
    };
    this.__handleTouchStart = function(event2) {
      if (event2.touches.length === 1) {
        needStop = null;
        touchStart = {
          x: event2.touches[0].pageX,
          y: event2.touches[0].pageY
        };
        if (self.refresherEnabled && self.refreshState !== "refreshing" && self.$refs.main.scrollTop === 0) {
          self.refreshState = "pulling";
        }
      }
    };
    this.__handleTouchEnd = function(event2) {
      touchStart = null;
      if (self.refresherHeight >= self.refresherThreshold) {
        self._setRefreshState("refreshing");
      } else {
        self.refresherHeight = 0;
        self.$trigger("refresherabort", event2, {});
      }
    };
    this.$refs.main.addEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.$refs.main.addEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.$refs.main.addEventListener("scroll", this.__handleScroll, {
      passive: false
    });
    this.$refs.main.addEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  activated() {
    this.scrollY && (this.$refs.main.scrollTop = this.lastScrollTop);
    this.scrollX && (this.$refs.main.scrollLeft = this.lastScrollLeft);
  },
  beforeDestroy() {
    this.$refs.main.removeEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.$refs.main.removeEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.$refs.main.removeEventListener("scroll", this.__handleScroll, {
      passive: false
    });
    this.$refs.main.removeEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  methods: {
    scrollTo: function(t2, n) {
      var i = this.$refs.main;
      t2 < 0 ? t2 = 0 : n === "x" && t2 > i.scrollWidth - i.offsetWidth ? t2 = i.scrollWidth - i.offsetWidth : n === "y" && t2 > i.scrollHeight - i.offsetHeight && (t2 = i.scrollHeight - i.offsetHeight);
      var r = 0;
      var o2 = "";
      n === "x" ? r = i.scrollLeft - t2 : n === "y" && (r = i.scrollTop - t2);
      if (r !== 0) {
        this.$refs.content.style.transition = "transform .3s ease-out";
        this.$refs.content.style.webkitTransition = "-webkit-transform .3s ease-out";
        if (n === "x") {
          o2 = "translateX(" + r + "px) translateZ(0)";
        } else {
          n === "y" && (o2 = "translateY(" + r + "px) translateZ(0)");
        }
        this.$refs.content.removeEventListener("transitionend", this.__transitionEnd);
        this.$refs.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
        this.__transitionEnd = this._transitionEnd.bind(this, t2, n);
        this.$refs.content.addEventListener("transitionend", this.__transitionEnd);
        this.$refs.content.addEventListener("webkitTransitionEnd", this.__transitionEnd);
        if (n === "x") {
          i.style.overflowX = "hidden";
        } else if (n === "y") {
          i.style.overflowY = "hidden";
        }
        this.$refs.content.style.transform = o2;
        this.$refs.content.style.webkitTransform = o2;
      }
    },
    _handleTrack: function($event) {
      if ($event.detail.state === "start") {
        this._x = $event.detail.x;
        this._y = $event.detail.y;
        this._noBubble = null;
        return;
      }
      if ($event.detail.state === "end") {
        this._noBubble = false;
      }
      if (this._noBubble === null && this.scrollY) {
        if (Math.abs(this._y - $event.detail.y) / Math.abs(this._x - $event.detail.x) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }
      if (this._noBubble === null && this.scrollX) {
        if (Math.abs(this._x - $event.detail.x) / Math.abs(this._y - $event.detail.y) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }
      this._x = $event.detail.x;
      this._y = $event.detail.y;
      if (this._noBubble) {
        $event.stopPropagation();
      }
    },
    _handleScroll: function($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp;
        const target = $event.target;
        this.$trigger("scroll", $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop
        });
        if (this.scrollY) {
          if (target.scrollTop <= this.upperThresholdNumber && this.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger("scrolltoupper", $event, {
              direction: "top"
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >= target.scrollHeight && this.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger("scrolltolower", $event, {
              direction: "bottom"
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        if (this.scrollX) {
          if (target.scrollLeft <= this.upperThresholdNumber && this.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger("scrolltoupper", $event, {
              direction: "left"
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >= target.scrollWidth && this.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger("scrolltolower", $event, {
              direction: "right"
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        this.lastScrollTop = target.scrollTop;
        this.lastScrollLeft = target.scrollLeft;
      }
    },
    _scrollTopChanged: function(val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "y");
          } else {
            this.$refs.main.scrollTop = val;
          }
        }
      }
    },
    _scrollLeftChanged: function(val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "x");
          } else {
            this.$refs.main.scrollLeft = val;
          }
        }
      }
    },
    _scrollIntoViewChanged: function(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.group('scroll-into-view="' + val + '" \u6709\u8BEF');
          console.error("id \u5C5E\u6027\u503C\u683C\u5F0F\u9519\u8BEF\u3002\u5982\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\u3002");
          console.groupEnd();
          return;
        }
        var element = this.$el.querySelector("#" + val);
        if (element) {
          var mainRect = this.$refs.main.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();
          if (this.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = this.$refs.main.scrollLeft;
            var x = scrollLeft + left;
            if (this.scrollWithAnimation) {
              this.scrollTo(x, "x");
            } else {
              this.$refs.main.scrollLeft = x;
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = this.$refs.main.scrollTop;
            var y = scrollTop + top;
            if (this.scrollWithAnimation) {
              this.scrollTo(y, "y");
            } else {
              this.$refs.main.scrollTop = y;
            }
          }
        }
      }
    },
    _transitionEnd: function(val, type) {
      this.$refs.content.style.transition = "";
      this.$refs.content.style.webkitTransition = "";
      this.$refs.content.style.transform = "";
      this.$refs.content.style.webkitTransform = "";
      var main = this.$refs.main;
      if (type === "x") {
        main.style.overflowX = this.scrollX ? "auto" : "hidden";
        main.scrollLeft = val;
      } else if (type === "y") {
        main.style.overflowY = this.scrollY ? "auto" : "hidden";
        main.scrollTop = val;
      }
      this.$refs.content.removeEventListener("transitionend", this.__transitionEnd);
      this.$refs.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
    },
    _setRefreshState(state) {
      switch (state) {
        case "refreshing":
          this.refresherHeight = this.refresherThreshold;
          this.$trigger("refresherrefresh", event, {});
          break;
        case "restore":
          this.refresherHeight = 0;
          this.$trigger("refresherrestore", {}, {});
          break;
      }
      this.refreshState = state;
    },
    getScrollPosition() {
      const main = this.$refs.main;
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop
      };
    }
  }
};
const _hoisted_1$6 = {
  ref: "wrap",
  class: "uni-scroll-view"
};
const _hoisted_2$4 = {
  ref: "content",
  class: "uni-scroll-view-content"
};
const _hoisted_3$1 = {
  key: 0,
  class: "uni-scroll-view-refresh"
};
const _hoisted_4$1 = {class: "uni-scroll-view-refresh-inner"};
const _hoisted_5 = /* @__PURE__ */ createVNode("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1);
const _hoisted_6 = /* @__PURE__ */ createVNode("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1);
const _hoisted_7 = {
  key: 1,
  class: "uni-scroll-view-refresh__spinner",
  width: "24",
  height: "24",
  viewBox: "25 25 50 50"
};
const _hoisted_8 = /* @__PURE__ */ createVNode("circle", {
  cx: "50",
  cy: "50",
  r: "20",
  fill: "none",
  style: {color: "#2bd009"},
  "stroke-width": "3"
}, null, -1);
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-scroll-view", _ctx.$attrs, [
    createVNode("div", _hoisted_1$6, [
      createVNode("div", {
        ref: "main",
        style: {
          "overflow-x": $props.scrollX ? "auto" : "hidden",
          "overflow-y": $props.scrollY ? "auto" : "hidden"
        },
        class: "uni-scroll-view"
      }, [
        createVNode("div", _hoisted_2$4, [
          $props.refresherEnabled ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "refresherinner",
            style: {
              "background-color": $props.refresherBackground,
              height: $data.refresherHeight + "px"
            },
            class: "uni-scroll-view-refresher"
          }, [
            $props.refresherDefaultStyle !== "none" ? (openBlock(), createBlock("div", _hoisted_3$1, [
              createVNode("div", _hoisted_4$1, [
                $data.refreshState == "pulling" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  style: {transform: "rotate(" + $data.refreshRotate + "deg)"},
                  fill: "#2BD009",
                  class: "uni-scroll-view-refresh__icon",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24"
                }, [
                  _hoisted_5,
                  _hoisted_6
                ], 4)) : createCommentVNode("", true),
                $data.refreshState == "refreshing" ? (openBlock(), createBlock("svg", _hoisted_7, [
                  _hoisted_8
                ])) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            $props.refresherDefaultStyle == "none" ? renderSlot(_ctx.$slots, "refresher", {key: 1}) : createCommentVNode("", true)
          ], 4)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ], 512)
      ], 4)
    ], 512)
  ], 16);
}
_sfc_main$8.render = _sfc_render$8;
const _sfc_main$7 = {
  name: "Slider",
  mixins: [emitter, listeners, touchtrack],
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
  data() {
    return {
      sliderValue: Number(this.value)
    };
  },
  computed: {
    setBlockStyle() {
      return {
        width: this.blockSize + "px",
        height: this.blockSize + "px",
        marginLeft: -this.blockSize / 2 + "px",
        marginTop: -this.blockSize / 2 + "px",
        left: this._getValueWidth(),
        backgroundColor: this.blockColor
      };
    },
    setBgColor() {
      return {
        backgroundColor: this._getBgColor()
      };
    },
    setBlockBg() {
      return {
        left: this._getValueWidth()
      };
    },
    setActiveColor() {
      return {
        backgroundColor: this._getActiveColor(),
        width: this._getValueWidth()
      };
    }
  },
  watch: {
    value(val) {
      this.sliderValue = Number(val);
    }
  },
  mounted() {
    this.touchtrack(this.$refs["uni-slider-handle"], "_onTrack");
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onUserChangedValue(e2) {
      const slider = this.$refs["uni-slider"];
      const offsetWidth = slider.offsetWidth;
      const boxLeft = slider.getBoundingClientRect().left;
      const value = (e2.x - boxLeft) * (this.max - this.min) / offsetWidth + Number(this.min);
      this.sliderValue = this._filterValue(value);
    },
    _filterValue(e2) {
      return e2 < this.min ? this.min : e2 > this.max ? this.max : Math.round((e2 - this.min) / this.step) * this.step + Number(this.min);
    },
    _getValueWidth() {
      return 100 * (this.sliderValue - this.min) / (this.max - this.min) + "%";
    },
    _getBgColor() {
      return this.backgroundColor !== "#e9e9e9" ? this.backgroundColor : this.color !== "#007aff" ? this.color : "#007aff";
    },
    _getActiveColor() {
      return this.activeColor !== "#007aff" ? this.activeColor : this.selectedColor !== "#e9e9e9" ? this.selectedColor : "#e9e9e9";
    },
    _onTrack: function(e2) {
      if (!this.disabled) {
        return e2.detail.state === "move" ? (this._onUserChangedValue({
          x: e2.detail.x0
        }), this.$trigger("changing", e2, {
          value: this.sliderValue
        }), false) : e2.detail.state === "end" && this.$trigger("change", e2, {
          value: this.sliderValue
        });
      }
    },
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this._onUserChangedValue($event);
      this.$trigger("change", $event, {
        value: this.sliderValue
      });
    },
    _resetFormData() {
      this.sliderValue = this.min;
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        data.value = this.sliderValue;
        data.key = this.name;
      }
      return data;
    }
  }
};
const _hoisted_1$5 = {class: "uni-slider-wrapper"};
const _hoisted_2$3 = {class: "uni-slider-tap-area"};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-slider", mergeProps({ref: "uni-slider"}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$5, [
      createVNode("div", _hoisted_2$3, [
        createVNode("div", {
          style: $options.setBgColor,
          class: "uni-slider-handle-wrapper"
        }, [
          createVNode("div", {
            ref: "uni-slider-handle",
            style: $options.setBlockBg,
            class: "uni-slider-handle"
          }, null, 4),
          createVNode("div", {
            style: $options.setBlockStyle,
            class: "uni-slider-thumb"
          }, null, 4),
          createVNode("div", {
            style: $options.setActiveColor,
            class: "uni-slider-track"
          }, null, 4)
        ], 4)
      ]),
      withDirectives(createVNode("span", {class: "uni-slider-value"}, toDisplayString($data.sliderValue), 513), [
        [vShow, $props.showValue]
      ])
    ]),
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$7.render = _sfc_render$7;
var index_vue_vue_type_style_index_0_lang$4 = "\nuni-swiper-item {\n  display: block;\n  overflow: hidden;\n  will-change: transform;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: grab;\n}\nuni-swiper-item[hidden] {\n  display: none;\n}\n";
const _sfc_main$6 = {
  name: "SwiperItem",
  props: {
    itemId: {
      type: String,
      default: ""
    }
  },
  mounted: function() {
    var $el = this.$el;
    $el.style.position = "absolute";
    $el.style.width = "100%";
    $el.style.height = "100%";
    var callbacks2 = this.$vnode._callbacks;
    if (callbacks2) {
      callbacks2.forEach((callback) => {
        callback();
      });
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-swiper-item", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$6.render = _sfc_render$6;
var index_vue_vue_type_style_index_0_lang$3 = '\nuni-switch {\r\n		-webkit-tap-highlight-color: transparent;\r\n		display: inline-block;\r\n		cursor: pointer;\n}\nuni-switch[hidden] {\r\n		display: none;\n}\nuni-switch[disabled] {\r\n		cursor: not-allowed;\n}\nuni-switch .uni-switch-wrapper {\r\n		display: -webkit-inline-flex;\r\n		display: inline-flex;\r\n		-webkit-align-items: center;\r\n		align-items: center;\r\n		vertical-align: middle;\n}\nuni-switch .uni-switch-input {\r\n		-webkit-appearance: none;\r\n		appearance: none;\r\n		position: relative;\r\n		width: 52px;\r\n		height: 32px;\r\n		margin-right: 5px;\r\n		border: 1px solid #DFDFDF;\r\n		outline: 0;\r\n		border-radius: 16px;\r\n		box-sizing: border-box;\r\n		background-color: #DFDFDF;\r\n		transition: background-color 0.1s, border 0.1s;\n}\nuni-switch[disabled] .uni-switch-input {\r\n		opacity: .7;\n}\nuni-switch .uni-switch-input:before {\r\n		content: " ";\r\n		position: absolute;\r\n		top: 0;\r\n		left: 0;\r\n		width: 50px;\r\n		height: 30px;\r\n		border-radius: 15px;\r\n		background-color: #FDFDFD;\r\n		transition: -webkit-transform 0.3s;\r\n		transition: transform 0.3s;\r\n		transition: transform 0.3s, -webkit-transform 0.3s;\n}\nuni-switch .uni-switch-input:after {\r\n		content: " ";\r\n		position: absolute;\r\n		top: 0;\r\n		left: 0;\r\n		width: 30px;\r\n		height: 30px;\r\n		border-radius: 15px;\r\n		background-color: #FFFFFF;\r\n		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\r\n		transition: -webkit-transform 0.3s;\r\n		transition: transform 0.3s;\r\n		transition: transform 0.3s, -webkit-transform 0.3s;\n}\nuni-switch .uni-switch-input.uni-switch-input-checked {\r\n		border-color: #007aff;\r\n		background-color: #007aff;\n}\nuni-switch .uni-switch-input.uni-switch-input-checked:before {\r\n		-webkit-transform: scale(0);\r\n		transform: scale(0);\n}\nuni-switch .uni-switch-input.uni-switch-input-checked:after {\r\n		-webkit-transform: translateX(20px);\r\n		transform: translateX(20px);\n}\nuni-switch .uni-checkbox-input {\r\n		margin-right: 5px;\r\n		-webkit-appearance: none;\r\n		appearance: none;\r\n		outline: 0;\r\n		border: 1px solid #D1D1D1;\r\n		background-color: #FFFFFF;\r\n		border-radius: 3px;\r\n		width: 22px;\r\n		height: 22px;\r\n		position: relative;\r\n		color: #007aff;\n}\nuni-switch:not([disabled]) .uni-checkbox-input:hover {\r\n		border-color: #007aff;\n}\nuni-switch .uni-checkbox-input.uni-checkbox-input-checked:before {\r\n		font: normal normal normal 14px/1 "uni";\r\n		content: "\\EA08";\r\n		color: inherit;\r\n		font-size: 22px;\r\n		position: absolute;\r\n		top: 50%;\r\n		left: 50%;\r\n		transform: translate(-50%, -48%) scale(0.73);\r\n		-webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nuni-switch .uni-checkbox-input.uni-checkbox-input-disabled {\r\n		background-color: #E1E1E1;\n}\nuni-switch .uni-checkbox-input.uni-checkbox-input-disabled:before {\r\n		color: #ADADAD;\n}\r\n';
const _sfc_main$5 = {
  name: "Switch",
  mixins: [emitter, listeners],
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
      default: "#007aff"
    }
  },
  data() {
    return {
      switchChecked: this.checked
    };
  },
  watch: {
    checked(val) {
      this.switchChecked = val;
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  methods: {
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this.switchChecked = !this.switchChecked;
      this.$trigger("change", $event, {
        value: this.switchChecked
      });
    },
    _resetFormData() {
      this.switchChecked = false;
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        data.value = this.switchChecked;
        data.key = this.name;
      }
      return data;
    }
  }
};
const _hoisted_1$4 = {class: "uni-switch-wrapper"};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-switch", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$4, [
      withDirectives(createVNode("div", {
        class: [[$data.switchChecked ? "uni-switch-input-checked" : ""], "uni-switch-input"],
        style: {backgroundColor: $data.switchChecked ? $props.color : "#DFDFDF", borderColor: $data.switchChecked ? $props.color : "#DFDFDF"}
      }, null, 6), [
        [vShow, $props.type === "switch"]
      ]),
      withDirectives(createVNode("div", {
        class: [[$data.switchChecked ? "uni-checkbox-input-checked" : ""], "uni-checkbox-input"],
        style: {color: $props.color}
      }, null, 6), [
        [vShow, $props.type === "checkbox"]
      ])
    ])
  ], 16, ["disabled"]);
}
_sfc_main$5.render = _sfc_render$5;
const SPACE_UNICODE = {
  ensp: "\u2002",
  emsp: "\u2003",
  nbsp: "\xA0"
};
function normalizeText(text2, {
  space,
  decode: decode2
}) {
  if (space && SPACE_UNICODE[space]) {
    text2 = text2.replace(/ /g, SPACE_UNICODE[space]);
  }
  if (!decode2) {
    return text2;
  }
  return text2.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
var index$1 = defineComponent({
  name: "Text",
  props: {
    selectable: {
      type: [Boolean, String],
      default: false
    },
    space: {
      type: String,
      default: ""
    },
    decode: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props, {
    slots
  }) {
    return () => {
      const children = [];
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (vnode.shapeFlag & 8) {
            const lines = vnode.children.replace(/\\n/g, "\n").split("\n");
            const len = lines.length - 1;
            lines.forEach((text2, index2) => {
              children.push(createTextVNode(normalizeText(text2, {
                space: props.space,
                decode: props.decode
              })));
              if (index2 !== len) {
                children.push(createVNode("br"));
              }
            });
          } else {
            if (process.env.NODE_ENV !== "production" && vnode.shapeFlag & 6 && vnode.type.name !== "Text") {
              console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
            }
            children.push(vnode);
          }
        });
      }
      return createVNode("uni-text", {
        selectable: props.selectable
      }, [createVNode("span", null, [children])], 8, ["selectable"]);
    };
  }
});
var index_vue_vue_type_style_index_0_lang$2 = "\nuni-textarea {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n  font-size: 16px;\n  line-height: normal;\n  white-space: pre-wrap;\n  word-break: break-all;\n}\nuni-textarea[hidden] {\n  display: none;\n}\n.uni-textarea-wrapper,\n.uni-textarea-placeholder,\n.uni-textarea-line,\n.uni-textarea-compute,\n.uni-textarea-textarea {\n  outline: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  text-decoration: inherit;\n}\n.uni-textarea-wrapper {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.uni-textarea-placeholder,\n.uni-textarea-line,\n.uni-textarea-compute,\n.uni-textarea-textarea {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  white-space: inherit;\n  word-break: inherit;\n}\n.uni-textarea-placeholder {\n  color: grey;\n  overflow: hidden;\n}\n.uni-textarea-line,\n.uni-textarea-compute {\n  visibility: hidden;\n  height: auto;\n}\n.uni-textarea-line {\n  width: 1em;\n}\n.uni-textarea-textarea {\n  resize: none;\n  background: none;\n  color: inherit;\n  opacity: 1;\n  -webkit-text-fill-color: currentcolor;\n  font: inherit;\n  line-height: inherit;\n  letter-spacing: inherit;\n  text-align: inherit;\n  text-indent: inherit;\n  text-transform: inherit;\n  text-shadow: inherit;\n}\n/* \u7528\u4E8E\u89E3\u51B3 iOS textarea \u5185\u90E8\u9ED8\u8BA4\u8FB9\u8DDD */\n.uni-textarea-textarea-fix-margin {\n  width: auto;\n  right: 0;\n  margin: 0 -3px;\n}\n";
const DARK_TEST_STRING = "(prefers-color-scheme: dark)";
const _sfc_main$4 = {
  name: "Textarea",
  mixins: [baseInput],
  props: {
    name: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    placeholderClass: {
      type: String,
      default: "textarea-placeholder"
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    autoHeight: {
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
    }
  },
  data() {
    return {
      valueComposition: "",
      composition: false,
      focusSync: this.focus,
      height: 0,
      focusChangeSource: "",
      fixMargin: String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING
    };
  },
  computed: {
    maxlengthNumber() {
      var maxlength = Number(this.maxlength);
      return isNaN(maxlength) ? 140 : maxlength;
    },
    cursorNumber() {
      var cursor = Number(this.cursor);
      return isNaN(cursor) ? -1 : cursor;
    },
    selectionStartNumber() {
      var selectionStart = Number(this.selectionStart);
      return isNaN(selectionStart) ? -1 : selectionStart;
    },
    selectionEndNumber() {
      var selectionEnd = Number(this.selectionEnd);
      return isNaN(selectionEnd) ? -1 : selectionEnd;
    },
    valueCompute() {
      return (this.composition ? this.valueComposition : this.valueSync).split("\n");
    }
  },
  watch: {
    focus(val) {
      if (val) {
        this.focusChangeSource = "focus";
        if (this.$refs.textarea) {
          this.$refs.textarea.focus();
        }
      } else {
        if (this.$refs.textarea) {
          this.$refs.textarea.blur();
        }
      }
    },
    focusSync(val) {
      this.$emit("update:focus", val);
      this._checkSelection();
      this._checkCursor();
    },
    cursorNumber() {
      this._checkCursor();
    },
    selectionStartNumber() {
      this._checkSelection();
    },
    selectionEndNumber() {
      this._checkSelection();
    },
    height(height) {
      let lineHeight = parseFloat(getComputedStyle(this.$el).lineHeight);
      if (isNaN(lineHeight)) {
        lineHeight = this.$refs.line.offsetHeight;
      }
      var lineCount = Math.round(height / lineHeight);
      this.$trigger("linechange", {}, {
        height,
        heightRpx: 750 / window.innerWidth * height,
        lineCount
      });
      if (this.autoHeight) {
        this.$el.style.height = this.height + "px";
      }
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  mounted() {
    this._resize({
      height: this.$refs.sensor.$el.offsetHeight
    });
    let $vm = this;
    while ($vm) {
      const scopeId = $vm.$options._scopeId;
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, "");
      }
      $vm = $vm.$parent;
    }
    this.initKeyboard(this.$refs.textarea);
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _focus: function($event) {
      this.focusSync = true;
      this.$trigger("focus", $event, {
        value: this.valueSync
      });
    },
    _checkSelection() {
      if (this.focusSync && !this.focusChangeSource && this.selectionStartNumber > -1 && this.selectionEndNumber > -1) {
        this.$refs.textarea.selectionStart = this.selectionStartNumber;
        this.$refs.textarea.selectionEnd = this.selectionEndNumber;
      }
    },
    _checkCursor() {
      if (this.focusSync && (this.focusChangeSource === "focus" || !this.focusChangeSource && this.selectionStartNumber < 0 && this.selectionEndNumber < 0) && this.cursorNumber > -1) {
        this.$refs.textarea.selectionEnd = this.$refs.textarea.selectionStart = this.cursorNumber;
      }
    },
    _blur: function($event) {
      this.focusSync = false;
      this.$trigger("blur", $event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      });
    },
    _compositionstart($event) {
      this.composition = true;
    },
    _compositionend($event) {
      this.composition = false;
    },
    _confirm($event) {
      this.$trigger("confirm", $event, {
        value: this.valueSync
      });
    },
    _linechange($event) {
      this.$trigger("linechange", $event, {
        value: this.valueSync
      });
    },
    _touchstart() {
      this.focusChangeSource = "touch";
    },
    _resize({height}) {
      this.height = height;
    },
    _input($event) {
      if (this.composition) {
        this.valueComposition = $event.target.value;
        return;
      }
      this.$triggerInput($event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      });
    },
    _getFormData() {
      return {
        value: this.valueSync,
        key: this.name
      };
    },
    _resetFormData() {
      this.valueSync = "";
    }
  }
};
const _hoisted_1$3 = {class: "uni-textarea-wrapper"};
const _hoisted_2$2 = {class: "uni-textarea-compute"};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-textarea", mergeProps({
    onChange: _cache[8] || (_cache[8] = withModifiers(() => {
    }, ["stop"]))
  }, _ctx.$attrs), [
    createVNode("div", _hoisted_1$3, [
      withDirectives(createVNode("div", {
        ref: "placeholder",
        style: $props.placeholderStyle,
        class: [$props.placeholderClass, "uni-textarea-placeholder"],
        textContent: toDisplayString($props.placeholder)
      }, null, 14, ["textContent"]), [
        [vShow, !($data.composition || _ctx.valueSync.length)]
      ]),
      createVNode("div", {
        ref: "line",
        class: "uni-textarea-line",
        textContent: toDisplayString(" ")
      }, null, 8, ["textContent"]),
      createVNode("div", _hoisted_2$2, [
        (openBlock(true), createBlock(Fragment, null, renderList($options.valueCompute, (item, index2) => {
          return openBlock(), createBlock("div", {
            key: index2,
            textContent: toDisplayString(item.trim() ? item : ".")
          }, null, 8, ["textContent"]);
        }), 128)),
        createVNode(_component_v_uni_resize_sensor, {
          ref: "sensor",
          onResize: $options._resize
        }, null, 8, ["onResize"])
      ]),
      withDirectives(createVNode("textarea", {
        ref: "textarea",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.valueSync = $event),
        disabled: $props.disabled,
        maxlength: $options.maxlengthNumber,
        autofocus: $props.autoFocus || $props.focus,
        class: [{"uni-textarea-textarea-fix-margin": $data.fixMargin}, "uni-textarea-textarea"],
        style: {"overflow-y": $props.autoHeight ? "hidden" : "auto"},
        onCompositionstart: _cache[2] || (_cache[2] = (...args) => $options._compositionstart && $options._compositionstart(...args)),
        onCompositionend: _cache[3] || (_cache[3] = (...args) => $options._compositionend && $options._compositionend(...args)),
        onInput: _cache[4] || (_cache[4] = withModifiers((...args) => $options._input && $options._input(...args), ["stop"])),
        onFocus: _cache[5] || (_cache[5] = (...args) => $options._focus && $options._focus(...args)),
        onBlur: _cache[6] || (_cache[6] = (...args) => $options._blur && $options._blur(...args)),
        onTouchstartPassive: _cache[7] || (_cache[7] = (...args) => $options._touchstart && $options._touchstart(...args))
      }, null, 46, ["disabled", "maxlength", "autofocus"]), [
        [vModelText, _ctx.valueSync]
      ])
    ])
  ], 16);
}
_sfc_main$4.render = _sfc_render$4;
const _sfc_main$3 = {
  name: "View",
  mixins: [hover],
  listeners: {
    "label-click": "clickHandler"
  }
};
const _hoisted_1$2 = {key: 1};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.hoverClass && _ctx.hoverClass !== "none" ? (openBlock(), createBlock("uni-view", {
    key: 0,
    class: [_ctx.hovering ? _ctx.hoverClass : ""],
    onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx._hoverTouchStart && _ctx._hoverTouchStart(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx._hoverTouchEnd && _ctx._hoverTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx._hoverTouchCancel && _ctx._hoverTouchCancel(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 34)) : (openBlock(), createBlock("uni-view", _hoisted_1$2, [
    renderSlot(_ctx.$slots, "default")
  ]));
}
_sfc_main$3.render = _sfc_render$3;
const UniViewJSBridge$1 = extend(ViewJSBridge, {
  publishHandler(event2, args, pageId) {
    window.UniServiceJSBridge.subscribeHandler(event2, args, pageId);
  }
});
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
function encode(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
}
function decode(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
}
function validateProtocolFail(name, msg) {
  const errMsg = `${name}:fail ${msg}`;
  {
    console.error(errMsg);
  }
  return {
    errMsg
  };
}
function validateProtocol(name, data, protocol) {
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (errMsg) {
      return validateProtocolFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol) {
  if (!protocol) {
    return;
  }
  if (isArray(protocol)) {
    const len = protocol.length;
    const argsLen = args.length;
    for (let i = 0; i < len; i++) {
      const opts = protocol[i];
      const data = Object.create(null);
      if (argsLen > i) {
        data[opts.name] = args[i];
      }
      const errMsg = validateProtocol(name, data, {[opts.name]: opts});
      if (errMsg) {
        return errMsg;
      }
    }
    return;
  }
  return validateProtocol(name, args[0] || Object.create(null), protocol);
}
function validateProp(name, value, prop, isAbsent) {
  const {type, required, validator} = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const {valid, expectedType} = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator && !validator(value)) {
    return 'Invalid args: custom validator check failed for args "' + name + '".';
  }
}
const isSimpleType = /* @__PURE__ */ makeMap$1("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function createInvokeCallbackName(name, callbackId) {
  return "api." + name + "." + callbackId;
}
function addInvokeCallback(id2, name, callback, keepAlive = false) {
  invokeCallbacks[id2] = {
    name,
    keepAlive,
    callback
  };
  return id2;
}
function invokeCallback(id2, res, extras) {
  if (typeof id2 === "number") {
    const opts = invokeCallbacks[id2];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id2];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
function getKeepAliveApiCallback(name, callback) {
  const onName = "api." + name.replace("off", "on");
  for (const key in invokeCallbacks) {
    const item = invokeCallbacks[key];
    if (item.callback === callback && item.name.indexOf(onName) === 0) {
      delete invokeCallbacks[key];
      return Number(key);
    }
  }
  return -1;
}
function createKeepAliveApiCallback(name, callback) {
  if (name.indexOf("off") === 0) {
    return getKeepAliveApiCallback(name, callback);
  }
  const id2 = invokeCallbackId++;
  return addInvokeCallback(id2, createInvokeCallbackName(name, id2), callback, true);
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, {beforeAll, beforeSuccess} = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const {success, fail, complete} = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, createInvokeCallbackName(name, callbackId), (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const callbacks = [API_SUCCESS, API_FAIL, API_COMPLETE];
function hasCallback(args) {
  if (isPlainObject(args) && callbacks.find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  if (__UNI_FEATURE_PROMISE__) {
    return promise.then((data) => {
      return [null, data];
    }).catch((err) => [err]);
  }
  return promise;
}
function promisify(fn) {
  return (args = {}) => {
    if (hasCallback(args)) {
      return fn(args);
    }
    return handlePromise(new Promise((resolve, reject) => {
      fn(Object.assign(args, {success: resolve, fail: reject}));
    }));
  };
}
const API_TYPE_ON = 0;
const API_TYPE_TASK = 1;
const API_TYPE_SYNC = 2;
const API_TYPE_ASYNC = 3;
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return args;
  }
  const formatArgs = options.formatArgs;
  Object.keys(formatArgs).forEach((name) => {
    formatArgs[name](args[0][name], params);
  });
  return args;
}
function wrapperOnApi(name, fn) {
  return (callback) => fn.apply(null, createKeepAliveApiCallback(name, callback));
}
function wrapperTaskApi(name, fn, options) {
  return (args) => fn.apply(null, [args, createAsyncApiCallback(name, args, options)]);
}
function wrapperSyncApi(fn) {
  return (...args) => fn.apply(null, args);
}
function wrapperAsyncApi(name, fn, options) {
  return (args) => {
    const id2 = createAsyncApiCallback(name, args, options);
    fn(args).then((res) => {
      invokeCallback(id2, extend(res || {}, {errMsg: name + ":ok"}));
    }).catch((err) => {
      invokeCallback(id2, {errMsg: name + ":fail" + (err ? " " + err : "")});
    });
  };
}
function wrapperApi(fn, name, protocol, options) {
  return function(...args) {
    if (process.env.NODE_ENV !== "production") {
      const errMsg = validateProtocols(name, args, protocol);
      if (errMsg) {
        return errMsg;
      }
    }
    return fn.apply(null, formatApiArgs(args, options));
  };
}
function defineSyncApi(name, fn, protocol, options) {
  return defineApi(API_TYPE_SYNC, name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(defineApi(API_TYPE_ASYNC, name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
function defineApi(type, name, fn, protocol, options) {
  switch (type) {
    case API_TYPE_ON:
      return wrapperApi(wrapperOnApi(name, fn), name, protocol, options);
    case API_TYPE_TASK:
      return wrapperApi(wrapperTaskApi(name, fn), name, protocol, options);
    case API_TYPE_SYNC:
      return wrapperApi(wrapperSyncApi(fn), name, protocol, options);
    case API_TYPE_ASYNC:
      return wrapperApi(wrapperAsyncApi(name, fn, options), name, protocol, options);
  }
}
const API_BASE64_TO_ARRAY_BUFFER = "base64ToArrayBuffer";
const API_ARRAY_BUFFER_TO_BASE64 = "arrayBufferToBase64";
const Base64ToArrayBufferProtocol = [
  {
    name: "base64",
    type: String,
    required: true
  }
];
const ArrayBufferToBase64Protocol = [
  {
    name: "arrayBuffer",
    type: [ArrayBuffer, Uint8Array],
    required: true
  }
];
const base64ToArrayBuffer = defineSyncApi(API_BASE64_TO_ARRAY_BUFFER, (base64) => {
  return decode(base64);
}, Base64ToArrayBufferProtocol);
const arrayBufferToBase64 = defineSyncApi(API_ARRAY_BUFFER_TO_BASE64, (arrayBuffer) => {
  return encode(arrayBuffer);
}, ArrayBufferToBase64Protocol);
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const {platform, pixelRatio: pixelRatio2, windowWidth} = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio2;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
var HOOKS;
(function(HOOKS2) {
  HOOKS2["INVOKE"] = "invoke";
  HOOKS2["SUCCESS"] = "success";
  HOOKS2["FAIL"] = "fail";
  HOOKS2["COMPLETE"] = "complete";
  HOOKS2["RETURN_VALUE"] = "returnValue";
})(HOOKS || (HOOKS = {}));
const globalInterceptors = {};
const scopedInterceptors = {};
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors, interceptor) {
  if (!interceptors || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      removeHook(interceptors[hook], interceptor[hook]);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  if (!hooks) {
    return;
  }
  const index2 = hooks.indexOf(hook);
  if (index2 !== -1) {
    hooks.splice(index2, 1);
  }
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string" && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string") {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const promiseInterceptor = {
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then((res2) => {
      return res2[1];
    }).catch((res2) => {
      return res2[0];
    });
  }
};
function getCurrentPageVm() {
  const pages = getCurrentPages();
  const len = pages.length;
  const page = pages[len - 1];
  return page && page.$vm;
}
const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
};
let reqComponentObserverId = 1;
const reqComponentObserverCallbacks = {};
const API_CREATE_INTERSECTION_OBSERVER = "createIntersectionObserver";
ServiceJSBridge.subscribe("requestComponentObserver", ({reqId, reqEnd, res}) => {
  const callback = reqComponentObserverCallbacks[reqId];
  if (callback) {
    if (reqEnd) {
      return delete reqComponentObserverCallbacks[reqId];
    }
    callback(res);
  }
});
class ServiceIntersectionObserver {
  constructor(component, options) {
    this._pageId = component.$page.id;
    this._component = component._$id || component;
    this._options = extend({}, defaultOptions, options || {});
    this._relativeInfo = [];
  }
  relativeTo(selector, margins) {
    if (this._reqId) {
      throw new Error('Relative nodes cannot be added after "observe" call in IntersectionObserver');
    }
    this._relativeInfo.push({
      selector,
      margins
    });
    return this;
  }
  relativeToViewport(margins) {
    return this.relativeTo(null, margins);
  }
  observe(selector, callback) {
    if (typeof callback !== "function") {
      return;
    }
    if (this._reqId) {
      throw new Error('"observe" call can be only called once in IntersectionObserver');
    }
    this._reqId = reqComponentObserverId++;
    reqComponentObserverCallbacks[this._reqId] = callback;
    UniServiceJSBridge.publishHandler("addIntersectionObserver", {
      selector,
      reqId: this._reqId,
      component: this._component,
      options: this._options,
      relativeInfo: this._relativeInfo
    }, this._pageId);
  }
  disconnect() {
    UniServiceJSBridge.publishHandler("removeIntersectionObserver", {
      reqId: this._reqId
    }, this._pageId);
  }
}
const createIntersectionObserver = defineSyncApi(API_CREATE_INTERSECTION_OBSERVER, (context, options) => {
  if (!context) {
    context = getCurrentPageVm();
  }
  return new ServiceIntersectionObserver(context, options);
});
const createSelectorQuery = () => {
};
const API_CAN_I_USE = "canIUse";
const CanIUseProtocol = [
  {
    name: "schema",
    type: String,
    required: true
  }
];
const API_MAKE_PHONE_CALL = "makePhoneCall";
const MakePhoneCallProtocol = {
  phoneNumber: {
    type: String,
    required: true,
    validator(phoneNumber) {
      if (!phoneNumber) {
        return "parameter error: parameter.phoneNumber should not be empty String;";
      }
    }
  }
};
const API_OPEN_DOCUMENT = "openDocument";
const OpenDocumentProtocol = {
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
};
const API_GET_IMAGE_INFO = "getImageInfo";
const GetImageInfoOptions = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src);
    }
  }
};
const GetImageInfoProtocol = {
  src: {
    type: String,
    required: true
  }
};
function encodeQueryString(url) {
  if (typeof url !== "string") {
    return url;
  }
  const index2 = url.indexOf("?");
  if (index2 === -1) {
    return url;
  }
  const query = url.substr(index2 + 1).trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return url;
  }
  url = url.substr(0, index2);
  const params = [];
  query.split("&").forEach((param) => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = parts.shift();
    const val = parts.length > 0 ? parts.join("=") : "";
    params.push(key + "=" + encodeURIComponent(val));
  });
  return params.length ? url + "?" + params.join("&") : url;
}
const ANIMATION_IN = [
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
const ANIMATION_OUT = [
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
const BaseRouteProtocol = {
  url: {
    type: String,
    required: true
  }
};
const API_NAVIGATE_TO = "navigateTo";
const API_REDIRECT_TO = "redirectTo";
const API_RE_LAUNCH = "reLaunch";
const API_SWITCH_TAB = "switchTab";
const API_NAVIGATE_BACK = "navigateBack";
const API_PRELOAD_PAGE = "preloadPage";
const API_UN_PRELOAD_PAGE = "unPreloadPage";
const NavigateToProtocol = extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
const NavigateBackProtocol = extend({
  delta: {
    type: Number
  }
}, createAnimationProtocol(ANIMATION_OUT));
const RedirectToProtocol = BaseRouteProtocol;
const ReLaunchProtocol = BaseRouteProtocol;
const SwitchTabProtocol = BaseRouteProtocol;
const NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
const RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
const ReLaunchOptions = /* @__PURE__ */ createRouteOptions(API_RE_LAUNCH);
const SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
const NavigateBackOptions = {
  formatArgs: {
    delta(delta, params) {
      delta = parseInt(delta) || 1;
      params.delta = Math.min(getCurrentPages().length - 1, delta);
    }
  }
};
function createAnimationProtocol(animationTypes) {
  return {
    animationType: {
      type: String,
      validator(type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
        }
      }
    },
    animationDuration: {
      type: Number
    }
  };
}
let navigatorLock;
function beforeRoute() {
  navigatorLock = "";
}
function createRouteOptions(type) {
  return {
    formatArgs: {
      url: createNormalizeUrl(type)
    },
    beforeAll: beforeRoute
  };
}
function createNormalizeUrl(type) {
  return function normalizeUrl(url, params) {
    url = getRealRoute(url);
    const pagePath = url.split("?")[0];
    if (url === "/") {
      url = __uniRoutes[0].path;
    }
    const routeOptions = __uniRoutes.find(({path}) => path === pagePath);
    if (!routeOptions) {
      return "page `" + url + "` is not found";
    }
    if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
      if (routeOptions.meta.isTabBar) {
        return `can not ${type} a tabbar page`;
      }
    } else if (type === API_SWITCH_TAB) {
      if (!routeOptions.meta.isTabBar) {
        return "can not switch to no-tabBar page";
      }
    }
    if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== "appLaunch") {
      url = pagePath;
    }
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.path, "/");
    }
    params.url = encodeQueryString(url);
    if (type === API_UN_PRELOAD_PAGE) {
      return;
    } else if (type === API_PRELOAD_PAGE) {
      if (routeOptions.meta.isTabBar) {
        const pages = getCurrentPages(true);
        const tabBarPagePath = routeOptions.path.substr(1);
        if (pages.find((page) => page.route === tabBarPagePath)) {
          return "tabBar page `" + tabBarPagePath + "` already exists";
        }
      }
      return;
    }
    if (navigatorLock === url && params.openType !== "appLaunch") {
      return `${navigatorLock} locked`;
    }
    if (__uniConfig.ready) {
      navigatorLock = url;
    }
  };
}
function cssSupports(css) {
  return window.CSS && window.CSS.supports && window.CSS.supports(css);
}
const SCHEMA_CSS = {
  "css.var": cssSupports("--a:0"),
  "css.env": cssSupports("top:env(a)"),
  "css.constant": cssSupports("top:constant(a)")
};
const canIUse = defineSyncApi(API_CAN_I_USE, (schema) => {
  if (hasOwn$1(SCHEMA_CSS, schema)) {
    return SCHEMA_CSS[schema];
  }
  return true;
}, CanIUseProtocol);
const makePhoneCall = defineAsyncApi(API_MAKE_PHONE_CALL, ({phoneNumber}) => {
  window.location.href = `tel:${phoneNumber}`;
  return Promise.resolve();
}, MakePhoneCallProtocol);
const getSystemInfoSync = defineSyncApi("getSystemInfoSync", () => {
  const pixelRatio2 = window.devicePixelRatio;
  const screenFix = getScreenFix();
  const landscape = isLandscape(screenFix);
  const screenWidth = getScreenWidth(screenFix, landscape);
  const screenHeight = getScreenHeight(screenFix, landscape);
  const windowWidth = getWindowWidth(screenWidth);
  let windowHeight = window.innerHeight;
  const language = navigator.language;
  const statusBarHeight = out.top;
  let osname;
  let osversion;
  let model;
  if (isIOS$1) {
    osname = "iOS";
    const osversionFind = ua.match(/OS\s([\w_]+)\slike/);
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, ".");
    }
    const modelFind = ua.match(/\(([a-zA-Z]+);/);
    if (modelFind) {
      model = modelFind[1];
    }
  } else if (isAndroid) {
    osname = "Android";
    const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/);
    if (osversionFind) {
      osversion = osversionFind[1];
    }
    const infoFind = ua.match(/\((.+?)\)/);
    const infos = infoFind ? infoFind[1].split(";") : ua.split(" ");
    const otherInfo = [
      /\bAndroid\b/i,
      /\bLinux\b/i,
      /\bU\b/i,
      /^\s?[a-z][a-z]$/i,
      /^\s?[a-z][a-z]-[a-z][a-z]$/i,
      /\bwv\b/i,
      /\/[\d\.,]+$/,
      /^\s?[\d\.,]+$/,
      /\bBrowser\b/i,
      /\bMobile\b/i
    ];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      if (info.indexOf("Build") > 0) {
        model = info.split("Build")[0].trim();
        break;
      }
      let other;
      for (let o2 = 0; o2 < otherInfo.length; o2++) {
        if (otherInfo[o2].test(info)) {
          other = true;
          break;
        }
      }
      if (!other) {
        model = info.trim();
        break;
      }
    }
  } else {
    osname = "Other";
    osversion = "0";
  }
  const system = `${osname} ${osversion}`;
  const platform = osname.toLocaleLowerCase();
  const safeArea = {
    left: out.left,
    right: windowWidth - out.right,
    top: out.top,
    bottom: windowHeight - out.bottom,
    width: windowWidth - out.left - out.right,
    height: windowHeight - out.top - out.bottom
  };
  const {top: windowTop, bottom: windowBottom} = getWindowOffset();
  windowHeight -= windowTop;
  windowHeight -= windowBottom;
  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio: pixelRatio2,
    screenWidth,
    screenHeight,
    language,
    statusBarHeight,
    system,
    platform,
    model,
    safeArea,
    safeAreaInsets: {
      top: out.top,
      right: out.right,
      bottom: out.bottom,
      left: out.left
    }
  };
});
const getSystemInfo = defineAsyncApi("getSystemInfo", () => {
  return Promise.resolve(getSystemInfoSync());
});
const openDocument = defineAsyncApi(API_OPEN_DOCUMENT, ({filePath}) => {
  window.open(filePath);
  return Promise.resolve();
}, OpenDocumentProtocol);
function _getServiceAddress() {
  return window.location.protocol + "//" + window.location.host;
}
const getImageInfo = defineAsyncApi(API_GET_IMAGE_INFO, ({src}) => {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = function() {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        path: src.indexOf("/") === 0 ? _getServiceAddress() + src : src
      });
    };
    img.onerror = function() {
      reject();
    };
    img.src = src;
  });
}, GetImageInfoProtocol, GetImageInfoOptions);
const navigateBack = defineAsyncApi(API_NAVIGATE_BACK, ({delta}) => new Promise((resolve, reject) => {
  let canBack = true;
  const vm = getCurrentPageVm();
  if (vm && vm.$callHook("onBackPress") === true) {
    canBack = false;
  }
  if (!canBack) {
    return reject("onBackPress");
  }
  getApp().$router.go(-delta);
  resolve();
}), NavigateBackProtocol, NavigateBackOptions);
function navigate(type, url) {
  const router = getApp().$router;
  return new Promise((resolve, reject) => {
    router[type === "navigateTo" ? "push" : "replace"]({
      path: url,
      force: true,
      state: createPageState(type)
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message);
      }
      return resolve();
    });
  });
}
const navigateTo = defineAsyncApi(API_NAVIGATE_TO, ({url}) => navigate(API_NAVIGATE_TO, url), NavigateToProtocol, NavigateToOptions);
const redirectTo = defineAsyncApi(API_REDIRECT_TO, ({url}) => navigate(API_REDIRECT_TO, url), RedirectToProtocol, RedirectToOptions);
const reLaunch = defineAsyncApi(API_RE_LAUNCH, ({url}) => navigate(API_RE_LAUNCH, url), ReLaunchProtocol, ReLaunchOptions);
const switchTab = defineAsyncApi(API_SWITCH_TAB, ({url}) => navigate(API_SWITCH_TAB, url), SwitchTabProtocol, SwitchTabOptions);
var api = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  upx2px,
  addInterceptor,
  removeInterceptor,
  promiseInterceptor,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createIntersectionObserver,
  createSelectorQuery,
  canIUse,
  makePhoneCall,
  getSystemInfo,
  getSystemInfoSync,
  openDocument,
  getImageInfo,
  navigateBack,
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab
});
const uni$1 = api;
const UniServiceJSBridge$1 = extend(ServiceJSBridge, {
  publishHandler(event2, args, pageId) {
    window.UniViewJSBridge.subscribeHandler(event2, args, pageId);
  }
});
function hexToRgba(hex) {
  let r;
  let g2;
  let b;
  hex = hex.replace("#", "");
  if (hex.length === 6) {
    r = hex.substring(0, 2);
    g2 = hex.substring(2, 4);
    b = hex.substring(4, 6);
  } else if (hex.length === 3) {
    r = hex.substring(0, 1);
    g2 = hex.substring(1, 2);
    b = hex.substring(2, 3);
  } else {
    return {r: 0, g: 0, b: 0};
  }
  if (r.length === 1) {
    r += r;
  }
  if (g2.length === 1) {
    g2 += g2;
  }
  if (b.length === 1) {
    b += b;
  }
  r = parseInt(r, 16);
  g2 = parseInt(g2, 16);
  b = parseInt(b, 16);
  return {
    r,
    g: g2,
    b
  };
}
function usePageHeadTransparentBackgroundColor(backgroundColor) {
  const {r, g: g2, b} = hexToRgba(backgroundColor);
  return `rgba(${r},${g2},${b},0)`;
}
function usePageHeadTransparent(headRef, {titleColor, coverage, backgroundColor}) {
  let A = 0;
  const rgb = computed(() => hexToRgba(backgroundColor));
  const offset = parseInt(coverage);
  onMounted(() => {
    const $el = headRef.value;
    const transparentElemStyle = $el.style;
    const titleElem = $el.querySelector(".uni-page-head__title");
    const borderRadiusElems = $el.querySelectorAll(".uni-page-head-btn");
    const iconElems = $el.querySelectorAll(".uni-btn-icon");
    const iconElemsStyles = [];
    for (let i = 0; i < iconElems.length; i++) {
      iconElemsStyles.push(iconElems[i].style);
    }
    const oldColors = [];
    const borderRadiusElemsStyles = [];
    for (let i = 0; i < borderRadiusElems.length; i++) {
      const borderRadiusElem = borderRadiusElems[i];
      oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor);
      borderRadiusElemsStyles.push(borderRadiusElem.style);
    }
    A = 0;
    UniViewJSBridge.on("onPageScroll", ({scrollTop}) => {
      const alpha = Math.min(scrollTop / offset, 1);
      if (alpha === 1 && A === 1) {
        return;
      }
      if (alpha > 0.5 && A <= 0.5) {
        iconElemsStyles.forEach(function(iconElemStyle) {
          iconElemStyle.color = titleColor;
        });
      } else if (alpha <= 0.5 && A > 0.5) {
        iconElemsStyles.forEach(function(iconElemStyle) {
          iconElemStyle.color = "#fff";
        });
      }
      A = alpha;
      if (titleElem) {
        titleElem.style.opacity = alpha;
      }
      const bg = rgb.value;
      transparentElemStyle.backgroundColor = `rgba(${bg.r},${bg.g},${bg.b},${alpha})`;
      borderRadiusElemsStyles.forEach(function(borderRadiusElemStyle, index2) {
        const oldColor = oldColors[index2];
        const rgba = oldColor.match(/[\d+\.]+/g);
        rgba[3] = (1 - alpha) * (rgba.length === 4 ? rgba[3] : 1);
        borderRadiusElemStyle.backgroundColor = `rgba(${rgba})`;
      });
    });
  });
}
const ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
const ICON_PATHS = {
  none: "",
  forward: "M11 7.844q-0.25-0.219-0.25-0.578t0.25-0.578q0.219-0.25 0.563-0.25t0.563 0.25l9.656 9.125q0.125 0.125 0.188 0.297t0.063 0.328q0 0.188-0.063 0.359t-0.188 0.297l-9.656 9.125q-0.219 0.25-0.563 0.25t-0.563-0.25q-0.25-0.219-0.25-0.578t0.25-0.609l9.063-8.594-9.063-8.594z",
  back: ICON_PATH_BACK,
  share: "M26.563 24.844q0 0.125-0.109 0.234t-0.234 0.109h-17.938q-0.125 0-0.219-0.109t-0.094-0.234v-13.25q0-0.156 0.094-0.25t0.219-0.094h5.5v-1.531h-6q-0.531 0-0.906 0.391t-0.375 0.922v14.375q0 0.531 0.375 0.922t0.906 0.391h18.969q0.531 0 0.891-0.391t0.359-0.953v-5.156h-1.438v4.625zM29.813 10.969l-5.125-5.375-1.031 1.094 3.438 3.594-3.719 0.031q-2.313 0.188-4.344 1.125t-3.578 2.422-2.5 3.453-1.109 4.188l-0.031 0.25h1.469v-0.219q0.156-1.875 1-3.594t2.25-3.063 3.234-2.125 3.828-0.906l0.188-0.031 3.313-0.031-3.438 3.625 1.031 1.063 5.125-5.375-0.031-0.063 0.031-0.063z",
  favorite: "M27.594 13.375q-0.063-0.188-0.219-0.313t-0.344-0.156l-7.094-0.969-3.219-6.406q-0.094-0.188-0.25-0.281t-0.375-0.094q-0.188 0-0.344 0.094t-0.25 0.281l-3.125 6.438-7.094 1.094q-0.188 0.031-0.344 0.156t-0.219 0.313q-0.031 0.188 0.016 0.375t0.172 0.313l5.156 4.969-1.156 7.063q-0.031 0.188 0.047 0.375t0.234 0.313q0.094 0.063 0.188 0.094t0.219 0.031q0.063 0 0.141-0.031t0.172-0.063l6.313-3.375 6.375 3.313q0.063 0.031 0.141 0.047t0.172 0.016q0.188 0 0.344-0.094t0.25-0.281q0.063-0.094 0.078-0.234t-0.016-0.234q0-0.031 0-0.063l-1.25-6.938 5.094-5.031q0.156-0.156 0.203-0.344t-0.016-0.375zM11.469 19.063q0.031-0.188-0.016-0.344t-0.172-0.281l-4.406-4.25 6.063-0.906q0.156-0.031 0.297-0.125t0.203-0.25l2.688-5.531 2.75 5.5q0.063 0.156 0.203 0.25t0.297 0.125l6.094 0.844-4.375 4.281q-0.125 0.125-0.172 0.297t-0.016 0.328l1.063 6.031-5.438-2.813q-0.156-0.094-0.328-0.078t-0.297 0.078l-5.438 2.875 1-6.031z",
  home: "M23.719 16.5q-0.313 0-0.531 0.219t-0.219 0.5v7.063q0 0.219-0.172 0.391t-0.391 0.172h-12.344q-0.25 0-0.422-0.172t-0.172-0.391v-7.063q0-0.281-0.219-0.5t-0.531-0.219q-0.281 0-0.516 0.219t-0.234 0.5v7.063q0.031 0.844 0.625 1.453t1.438 0.609h12.375q0.844 0 1.453-0.609t0.609-1.453v-7.063q0-0.125-0.063-0.266t-0.156-0.234q-0.094-0.125-0.234-0.172t-0.297-0.047zM26.5 14.875l-8.813-8.813q-0.313-0.313-0.688-0.453t-0.781-0.141-0.781 0.141-0.656 0.422l-8.813 8.844q-0.188 0.219-0.188 0.516t0.219 0.484q0.094 0.125 0.234 0.172t0.297 0.047q0.125 0 0.25-0.047t0.25-0.141l8.781-8.781q0.156-0.156 0.406-0.156t0.406 0.156l8.813 8.781q0.219 0.188 0.516 0.188t0.516-0.219q0.188-0.188 0.203-0.484t-0.172-0.516z",
  menu: "M8.938 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM16.188 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM23.469 18.313q0.844 0 1.453-0.609t0.609-1.453-0.609-1.453-1.453-0.609q-0.875 0-1.484 0.609t-0.609 1.453 0.609 1.453 1.484 0.609z",
  close: "M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z"
};
var PageHead = /* @__PURE__ */ defineComponent({
  name: "PageHead",
  setup() {
    const headRef = ref(null);
    const pageMeta = usePageMeta();
    const navigationBar = pageMeta.navigationBar;
    UniServiceJSBridge.emit("onNavigationBarChange", navigationBar.titleText);
    const {
      clazz,
      style
    } = usePageHead(navigationBar);
    const buttons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ && usePageHeadButtons(navigationBar);
    const searchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ && usePageHeadSearchInput();
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && usePageHeadTransparent(headRef, navigationBar);
    return () => {
      const backButtonTsx = __UNI_FEATURE_PAGES__ ? createBackButtonTsx(navigationBar) : null;
      const leftButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.left) : [];
      const rightButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.right) : [];
      const type = navigationBar.type || "default";
      const placeholderTsx = type !== "transparent" && type !== "float" && createVNode("div", {
        class: {
          "uni-placeholder": true,
          "uni-placeholder-titlePenetrate": navigationBar.titlePenetrate
        }
      }, null, 2);
      return createVNode("uni-page-head", {
        "uni-page-head-type": type
      }, [createVNode("div", {
        ref: headRef,
        class: clazz.value,
        style: style.value
      }, [createVNode("div", {
        class: "uni-page-head-hd"
      }, [backButtonTsx, ...leftButtonsTsx]), createPageHeadBdTsx(navigationBar, searchInput), createVNode("div", {
        class: "uni-page-head-ft"
      }, [...rightButtonsTsx])], 6), placeholderTsx], 8, ["uni-page-head-type"]);
    };
  }
});
function createBackButtonTsx(navigationBar) {
  if (navigationBar.backButton) {
    return createVNode("div", {
      class: "uni-page-head-btn",
      onClick: onPageHeadBackButton
    }, [createSvgIconVNode(ICON_PATH_BACK, navigationBar.type === "transparent" ? "#fff" : navigationBar.titleColor, 27)], 8, ["onClick"]);
  }
}
function createButtonsTsx(btns) {
  return btns.map(({
    btnClass,
    btnStyle,
    btnText,
    btnIconPath,
    badgeText,
    iconStyle
  }, index2) => {
    return createVNode("div", {
      key: index2,
      class: btnClass,
      style: btnStyle,
      "badge-text": badgeText
    }, [btnIconPath ? createSvgIconVNode(btnIconPath, iconStyle.color, iconStyle.fontSize) : createVNode("i", {
      class: "uni-btn-icon",
      style: iconStyle,
      innerHTML: btnText
    }, null, 12, ["innerHTML"])], 14, ["badge-text"]);
  });
}
function createPageHeadBdTsx(navigationBar, searchInput) {
  if (!__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ || !navigationBar.searchInput) {
    return createPageHeadTitleTextTsx(navigationBar);
  }
  return createPageHeadSearchInputTsx(navigationBar, searchInput);
}
function createPageHeadTitleTextTsx({
  loading,
  titleText,
  titleImage
}) {
  return createVNode("div", {
    class: "uni-page-head-bd"
  }, [createVNode("div", {
    style: "{fontSize:titleSize,opacity:type==='transparent'?0:1}",
    class: "uni-page-head__title"
  }, [loading ? createVNode("i", {
    class: "uni-loading"
  }, null) : titleImage ? createVNode("img", {
    src: titleImage,
    class: "uni-page-head__title_image"
  }, null, 8, ["src"]) : titleText])]);
}
function createPageHeadSearchInputTsx(navigationBar, {
  text: text2,
  focus,
  composing,
  onBlur,
  onFocus,
  onInput
}) {
  const {
    color,
    align: align2,
    autoFocus,
    disabled,
    borderRadius,
    backgroundColor,
    placeholder,
    placeholderColor
  } = navigationBar.searchInput;
  const searchStyle = {
    borderRadius,
    backgroundColor
  };
  const placeholderClass = ["uni-page-head-search-placeholder", `uni-page-head-search-placeholder-${focus.value || text2.value ? "left" : align2}`];
  return createVNode("div", {
    class: "uni-page-head-search",
    style: searchStyle
  }, [createVNode("div", {
    style: {
      color: placeholderColor
    },
    class: placeholderClass
  }, [createVNode("div", {
    class: "uni-page-head-search-icon"
  }, [createSvgIconVNode(ICON_PATH_SEARCH, placeholderColor, 20)]), text2.value || composing.value ? "" : placeholder], 6), createVNode(_sfc_main$g, {
    focus: autoFocus,
    disabled,
    style: {
      color
    },
    "placeholder-style": {
      color: placeholderColor
    },
    class: "uni-page-head-search-input",
    "confirm-type": "search",
    onFocus,
    onBlur,
    onInput
  }, null, 8, ["focus", "disabled", "style", "placeholder-style", "onFocus", "onBlur", "onInput"])], 4);
}
function onPageHeadBackButton() {
  if (getCurrentPages().length === 1) {
    uni.reLaunch({
      url: "/"
    });
  } else {
    uni.navigateBack({
      from: "backbutton"
    });
  }
}
function usePageHead(navigationBar) {
  const clazz = computed(() => {
    const {
      type,
      titlePenetrate,
      shadowColorType
    } = navigationBar;
    const clazz2 = {
      "uni-page-head": true,
      "uni-page-head-transparent": type === "transparent",
      "uni-page-head-titlePenetrate": titlePenetrate === "YES",
      "uni-page-head-shadow": !!shadowColorType
    };
    if (shadowColorType) {
      clazz2[`uni-page-head-shadow-${shadowColorType}`] = true;
    }
    return clazz2;
  });
  const style = computed(() => {
    const backgroundColor = __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" ? usePageHeadTransparentBackgroundColor(navigationBar.backgroundColor) : navigationBar.backgroundColor;
    return {
      backgroundColor,
      color: navigationBar.titleColor,
      transitionDuration: navigationBar.duration,
      transitionTimingFunction: navigationBar.timingFunc
    };
  });
  return {
    clazz,
    style
  };
}
function usePageHeadButtons(navigationBar) {
  const left = [];
  const right = [];
  const {
    buttons
  } = navigationBar;
  if (isArray(buttons)) {
    const {
      type
    } = navigationBar;
    const isTransparent = type === "transparent";
    const fonts = Object.create(null);
    buttons.forEach((btn) => {
      if (btn.fontSrc && !btn.fontFamily) {
        const fontSrc = getRealPath(btn.fontSrc);
        let fontFamily = fonts[fontSrc];
        if (!fontFamily) {
          fontFamily = `font${Date.now()}`;
          fonts[fontSrc] = fontFamily;
          updateStyle("uni-btn-" + fontFamily, `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`);
        }
        btn.fontFamily = fontFamily;
      }
      const pageHeadBtn = usePageHeadButton(btn, isTransparent);
      if (btn.float === "left") {
        left.push(pageHeadBtn);
      } else {
        right.push(pageHeadBtn);
      }
    });
  }
  return {
    left,
    right
  };
}
function usePageHeadButton(btn, isTransparent) {
  const iconStyle = {
    color: btn.color,
    fontSize: btn.fontSize,
    fontWeight: btn.fontWeight
  };
  if (btn.fontFamily) {
    iconStyle.fontFamily = btn.fontFamily;
  }
  return {
    btnClass: {
      "uni-page-head-btn": true,
      "uni-page-head-btn-red-dot": !!(btn.redDot || btn.badgeText),
      "uni-page-head-btn-select": !!btn.select
    },
    btnStyle: {
      backgroundColor: isTransparent ? btn.background : "transparent",
      width: btn.width
    },
    btnText: btn.fontSrc && btn.fontFamily ? btn.text.replace("\\u", "&#x") : btn.text,
    btnIconPath: ICON_PATHS[btn.type],
    badgeText: btn.badgeText,
    iconStyle
  };
}
function usePageHeadSearchInput(navigationBar) {
  const focus = ref(false);
  const text2 = ref("");
  const composing = ref(false);
  function onFocus() {
    focus.value = true;
  }
  function onBlur() {
    focus.value = false;
  }
  function onInput(evt) {
    text2.value = evt.detail.value;
  }
  return {
    focus,
    text: text2,
    composing,
    onFocus,
    onBlur,
    onInput
  };
}
var _sfc_main$2 = {
  name: "PageRefresh",
  setup() {
    const {refreshOptions} = usePageMeta();
    return {
      offset: refreshOptions.offset,
      color: refreshOptions.color
    };
  }
};
const _hoisted_1$1 = {class: "uni-page-refresh-inner"};
const _hoisted_2$1 = /* @__PURE__ */ createVNode("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createVNode("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1);
const _hoisted_4 = {
  class: "uni-page-refresh__spinner",
  width: "24",
  height: "24",
  viewBox: "25 25 50 50"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-page-refresh", null, [
    createVNode("div", {
      style: {"margin-top": $setup.offset + "px"},
      class: "uni-page-refresh"
    }, [
      createVNode("div", _hoisted_1$1, [
        (openBlock(), createBlock("svg", {
          fill: $setup.color,
          class: "uni-page-refresh__icon",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, [
          _hoisted_2$1,
          _hoisted_3
        ], 8, ["fill"])),
        (openBlock(), createBlock("svg", _hoisted_4, [
          createVNode("circle", {
            stroke: $setup.color,
            class: "uni-page-refresh__path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            "stroke-width": "4",
            "stroke-miterlimit": "10"
          }, null, 8, ["stroke"])
        ]))
      ])
    ], 4)
  ]);
}
_sfc_main$2.render = _sfc_render$2;
function processDeltaY(ev, identifier, startY) {
  const touch = Array.prototype.slice.call(ev.changedTouches).filter((touch2) => touch2.identifier === identifier)[0];
  if (!touch) {
    return false;
  }
  ev.deltaY = touch.pageY - startY;
  return true;
}
const PULLING = "pulling";
const REACHED = "reached";
const ABORTING = "aborting";
const REFRESHING = "refreshing";
const RESTORING = "restoring";
function usePageRefresh(refreshRef) {
  const {id: id2, refreshOptions} = usePageMeta();
  const {range, height} = refreshOptions;
  let refreshContainerElem;
  let refreshControllerElem;
  let refreshControllerElemStyle;
  let refreshInnerElemStyle;
  onMounted(() => {
    refreshContainerElem = refreshRef.value.$el;
    refreshControllerElem = refreshContainerElem.querySelector(".uni-page-refresh");
    refreshControllerElemStyle = refreshControllerElem.style;
    refreshInnerElemStyle = refreshControllerElem.querySelector(".uni-page-refresh-inner").style;
    UniServiceJSBridge.on(id2 + ".startPullDownRefresh", () => {
      if (!state) {
        state = REFRESHING;
        addClass();
        setTimeout(() => {
          refreshing();
        }, 50);
      }
    });
    UniServiceJSBridge.on(id2 + ".stopPullDownRefresh", () => {
      if (state === REFRESHING) {
        removeClass();
        state = RESTORING;
        addClass();
        restoring(() => {
          removeClass();
          state = distance = offset = null;
        });
      }
    });
  });
  let touchId;
  let startY;
  let canRefresh;
  let state;
  let distance;
  let offset;
  function toggleClass(type) {
    if (!state) {
      return;
    }
    if (refreshContainerElem) {
      refreshContainerElem.classList[type]("uni-page-refresh--" + state);
    }
  }
  function addClass() {
    toggleClass("add");
  }
  function removeClass() {
    toggleClass("remove");
  }
  function pulling(deltaY) {
    if (!refreshControllerElem) {
      return;
    }
    let rotate = deltaY / range;
    if (rotate > 1) {
      rotate = 1;
    } else {
      rotate = rotate * rotate * rotate;
    }
    const y = Math.round(deltaY / (range / height)) || 0;
    refreshInnerElemStyle.transform = "rotate(" + 360 * rotate + "deg)";
    refreshControllerElemStyle.clip = "rect(" + (45 - y) + "px,45px,45px,-5px)";
    refreshControllerElemStyle.transform = "translate3d(-50%, " + y + "px, 0)";
  }
  function onTouchstart(ev) {
    const touch = ev.changedTouches[0];
    touchId = touch.identifier;
    startY = touch.pageY;
    if ([ABORTING, REFRESHING, RESTORING].indexOf(state) >= 0) {
      canRefresh = false;
    } else {
      canRefresh = true;
    }
  }
  function onTouchmove(ev) {
    if (!canRefresh) {
      return;
    }
    if (!processDeltaY(ev, touchId, startY)) {
      return;
    }
    let {deltaY} = ev;
    if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
      touchId = null;
      return;
    }
    if (deltaY < 0 && !state) {
      return;
    }
    if (ev.cancelable) {
      ev.preventDefault();
    }
    if (distance === null) {
      offset = deltaY;
      state = PULLING;
      addClass();
    }
    deltaY = deltaY - offset;
    if (deltaY < 0) {
      deltaY = 0;
    }
    distance = deltaY;
    const isReached = deltaY >= range && state !== REACHED;
    const isPulling = deltaY < range && state !== PULLING;
    if (isReached || isPulling) {
      removeClass();
      state = state === REACHED ? PULLING : REACHED;
      addClass();
    }
    pulling(deltaY);
  }
  function onTouchend(ev) {
    if (!processDeltaY(ev, touchId, startY)) {
      return;
    }
    if (state === null) {
      return;
    }
    if (state === PULLING) {
      removeClass();
      state = ABORTING;
      addClass();
      aborting(() => {
        removeClass();
        state = distance = offset = null;
      });
    } else if (state === REACHED) {
      removeClass();
      state = REFRESHING;
      addClass();
      refreshing();
    }
  }
  function aborting(callback) {
    if (!refreshControllerElem) {
      return;
    }
    if (refreshControllerElemStyle.transform) {
      refreshControllerElemStyle.transition = "-webkit-transform 0.3s";
      refreshControllerElemStyle.transform = "translate3d(-50%, 0, 0)";
      const abortTransitionEnd = function() {
        timeout && clearTimeout(timeout);
        refreshControllerElem.removeEventListener("webkitTransitionEnd", abortTransitionEnd);
        refreshControllerElemStyle.transition = "";
        callback();
      };
      refreshControllerElem.addEventListener("webkitTransitionEnd", abortTransitionEnd);
      const timeout = setTimeout(abortTransitionEnd, 350);
    } else {
      callback();
    }
  }
  function refreshing() {
    if (refreshControllerElem) {
      return;
    }
    refreshControllerElemStyle.transition = "-webkit-transform 0.2s";
    refreshControllerElemStyle.transform = "translate3d(-50%, " + height + "px, 0)";
    UniServiceJSBridge.emit("onPullDownRefresh", {}, id2);
  }
  function restoring(callback) {
    if (!refreshControllerElem) {
      return;
    }
    refreshControllerElemStyle.transition = "-webkit-transform 0.3s";
    refreshControllerElemStyle.transform += " scale(0.01)";
    const restoreTransitionEnd = function() {
      timeout && clearTimeout(timeout);
      refreshControllerElem.removeEventListener("webkitTransitionEnd", restoreTransitionEnd);
      refreshControllerElemStyle.transition = "";
      refreshControllerElemStyle.transform = "translate3d(-50%, 0, 0)";
      callback();
    };
    refreshControllerElem.addEventListener("webkitTransitionEnd", restoreTransitionEnd);
    const timeout = setTimeout(restoreTransitionEnd, 350);
  }
  return {
    onTouchstart,
    onTouchmove,
    onTouchend,
    onTouchcancel: onTouchend
  };
}
var PageBody = defineComponent({
  name: "PageBody",
  setup(props, ctx) {
    const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ && usePageMeta();
    const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ && ref(null);
    const pageRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__ && pageMeta.enablePullDownRefresh ? usePageRefresh(refreshRef) : null;
    return () => {
      const pageRefreshTsx = createPageRefreshTsx(refreshRef, pageMeta);
      return createVNode(Fragment, null, [pageRefreshTsx, createVNode("uni-page-wrapper", pageRefresh, [createVNode("uni-page-body", null, [renderSlot(ctx.slots, "default")])], 16)]);
    };
  }
});
function createPageRefreshTsx(refreshRef, pageMeta) {
  if (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh) {
    return null;
  }
  return createVNode(_sfc_main$2, {
    ref: refreshRef
  }, null, 512);
}
var index = defineComponent({
  name: "Page",
  setup(props, ctx) {
    const {navigationBar} = providePageMeta();
    return () => createVNode("uni-page", null, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [createVNode(PageHead), createPageBodyVNode(ctx)] : [createPageBodyVNode(ctx)]);
  }
});
function createPageBodyVNode(ctx) {
  return openBlock(), createBlock(PageBody, {key: 0}, {
    default: withCtx(() => [renderSlot(ctx.slots, "page")]),
    _: 3
  });
}
const isObject = (val) => val !== null && typeof val === "object";
class BaseFormatter {
  constructor() {
    this._caches = Object.create(null);
  }
  interpolate(message, values) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  const tokens = [];
  let position = 0;
  let text2 = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === "{") {
      if (text2) {
        tokens.push({type: "text", value: text2});
      }
      text2 = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== "}") {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === "}";
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({value: sub, type});
    } else if (char === "%") {
      if (format[position] !== "{") {
        text2 += char;
      }
    } else {
      text2 += char;
    }
  }
  text2 && tokens.push({type: "text", value: text2});
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages2) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages2[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") !== -1) {
      return "zh-Hans";
    }
    if (locale.indexOf("-hant") !== -1) {
      return "zh-Hant";
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return "zh-Hant";
    }
    return "zh-Hans";
  }
  const lang = startsWith(locale, ["en", "fr", "es"]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({locale, fallbackLocale: fallbackLocale2, messages: messages2, watcher, formater}) {
    this.locale = "en";
    this.fallbackLocale = "en";
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale2) {
      this.fallbackLocale = fallbackLocale2;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages2;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    this.message = this.messages[this.locale];
    this.watchers.forEach((watcher) => {
      watcher(this.locale, oldLocale);
    });
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  mergeLocaleMessage(locale, message) {
    if (this.messages[locale]) {
      Object.assign(this.messages[locale], message);
    } else {
      this.messages[locale] = message;
    }
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function initLocaleWatcher(appVm2, i18n2) {
  appVm2.$i18n && appVm2.$i18n.vm.$watch("locale", (newLocale) => {
    i18n2.setLocale(newLocale);
  }, {
    immediate: true
  });
}
function getDefaultLocale() {
  if (typeof navigator !== "undefined") {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== "undefined") {
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages2, fallbackLocale2 = "en", locale) {
  const i18n2 = new I18n({
    locale: locale || fallbackLocale2,
    fallbackLocale: fallbackLocale2,
    messages: messages2
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n2.t(key2, values2);
      };
    } else {
      const appVm2 = getApp().$vm;
      if (!appVm2.$t || !appVm2.$i18n) {
        if (!locale) {
          i18n2.setLocale(getDefaultLocale());
        }
        t2 = function(key2, values2) {
          return i18n2.t(key2, values2);
        };
      } else {
        initLocaleWatcher(appVm2, i18n2);
        t2 = function(key2, values2) {
          const $i18n = appVm2.$i18n;
          const silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          const msg = appVm2.$t(key2, values2);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key2) {
            return msg;
          }
          return i18n2.t(key2, $i18n.locale, values2);
        };
      }
    }
    return t2(key, values);
  };
  return {
    t(key, values) {
      return t2(key, values);
    },
    getLocale() {
      return i18n2.getLocale();
    },
    setLocale(newLocale) {
      return i18n2.setLocale(newLocale);
    },
    mixin: {
      beforeCreate() {
        const unwatch = i18n2.watchLocale(() => {
          this.$forceUpdate();
        });
        this.$once("hook:beforeDestroy", function() {
          unwatch();
        });
      },
      methods: {
        $$t(key, values) {
          return t2(key, values);
        }
      }
    }
  };
}
var en = {
  "uni.app.quit": "Press back button again to exit",
  "uni.async.error": "The connection timed out, click the screen to try again.",
  "uni.showActionSheet.cancel": "Cancel",
  "uni.showToast.unpaired": "Please note showToast must be paired with hideToast",
  "uni.showLoading.unpaired": "Please note showLoading must be paired with hideLoading",
  "uni.showModal.cancel": "Cancel",
  "uni.showModal.confirm": "OK",
  "uni.chooseImage.cancel": "Cancel",
  "uni.chooseImage.sourceType.album": "Album",
  "uni.chooseImage.sourceType.camera": "Camera",
  "uni.chooseVideo.cancel": "Cancel",
  "uni.chooseVideo.sourceType.album": "Album",
  "uni.chooseVideo.sourceType.camera": "Camera",
  "uni.previewImage.cancel": "Cancel",
  "uni.previewImage.button.save": "Save Image",
  "uni.previewImage.save.success": "Saved successfully",
  "uni.previewImage.save.fail": "Save failed",
  "uni.setClipboardData.success": "Content copied",
  "uni.scanCode.title": "Scan code",
  "uni.scanCode.album": "Album",
  "uni.scanCode.fail": "Recognition failure",
  "uni.scanCode.flash.on": "Tap to turn light on",
  "uni.scanCode.flash.off": "Tap to turn light off",
  "uni.startSoterAuthentication.authContent": "Fingerprint recognition",
  "uni.picker.done": "Done",
  "uni.picker.cancel": "Cancel",
  "uni.video.danmu": "Danmu",
  "uni.video.volume": "Volume",
  "uni.button.feedback.title": "feedback",
  "uni.button.feedback.send": "send"
};
var es = {
  "uni.app.quit": "Pulse otra vez para salir",
  "uni.async.error": "Se agot\xF3 el tiempo de conexi\xF3n, haga clic en la pantalla para volver a intentarlo.",
  "uni.showActionSheet.cancel": "Cancelar",
  "uni.showToast.unpaired": "Tenga en cuenta que showToast debe estar emparejado con hideToast",
  "uni.showLoading.unpaired": "Tenga en cuenta que showLoading debe estar emparejado con hideLoading",
  "uni.showModal.cancel": "Cancelar",
  "uni.showModal.confirm": "OK",
  "uni.chooseImage.cancel": "Cancelar",
  "uni.chooseImage.sourceType.album": "\xC1lbum",
  "uni.chooseImage.sourceType.camera": "C\xE1mara",
  "uni.chooseVideo.cancel": "Cancelar",
  "uni.chooseVideo.sourceType.album": "\xC1lbum",
  "uni.chooseVideo.sourceType.camera": "C\xE1mara",
  "uni.previewImage.cancel": "Cancelar",
  "uni.previewImage.button.save": "Guardar imagen",
  "uni.previewImage.save.success": "Guardado exitosamente",
  "uni.previewImage.save.fail": "Error al guardar",
  "uni.setClipboardData.success": "Contenido copiado",
  "uni.scanCode.title": "C\xF3digo de escaneo",
  "uni.scanCode.album": "\xC1lbum",
  "uni.scanCode.fail": "\xC9chec de la reconnaissance",
  "uni.scanCode.flash.on": "Toque para encender la luz",
  "uni.scanCode.flash.off": "Toque para apagar la luz",
  "uni.startSoterAuthentication.authContent": "Reconocimiento de huellas dactilares",
  "uni.picker.done": "OK",
  "uni.picker.cancel": "Cancelar",
  "uni.video.danmu": "Danmu",
  "uni.video.volume": "Volumen",
  "uni.button.feedback.title": "realimentaci\xF3n",
  "uni.button.feedback.send": "enviar"
};
var fr = {
  "uni.app.quit": "Appuyez \xE0 nouveau pour quitter l'application",
  "uni.async.error": "La connexion a expir\xE9, cliquez sur l'\xE9cran pour r\xE9essayer.",
  "uni.showActionSheet.cancel": "Annuler",
  "uni.showToast.unpaired": "Veuillez noter que showToast doit \xEAtre associ\xE9 \xE0 hideToast",
  "uni.showLoading.unpaired": "Veuillez noter que showLoading doit \xEAtre associ\xE9 \xE0 hideLoading",
  "uni.showModal.cancel": "Annuler",
  "uni.showModal.confirm": "OK",
  "uni.chooseImage.cancel": "Annuler",
  "uni.chooseImage.sourceType.album": "Album",
  "uni.chooseImage.sourceType.camera": "Cam\xE9ra",
  "uni.chooseVideo.cancel": "Annuler",
  "uni.chooseVideo.sourceType.album": "Album",
  "uni.chooseVideo.sourceType.camera": "Cam\xE9ra",
  "uni.previewImage.cancel": "Annuler",
  "uni.previewImage.button.save": "Guardar imagen",
  "uni.previewImage.save.success": "Enregistr\xE9 avec succ\xE8s",
  "uni.previewImage.save.fail": "\xC9chec de la sauvegarde",
  "uni.setClipboardData.success": "Contenu copi\xE9",
  "uni.scanCode.title": "Code d\u2019analyse",
  "uni.scanCode.album": "Album",
  "uni.scanCode.fail": "Fallo de reconocimiento",
  "uni.scanCode.flash.on": "Appuyez pour activer l'\xE9clairage",
  "uni.scanCode.flash.off": "Appuyez pour d\xE9sactiver l'\xE9clairage",
  "uni.startSoterAuthentication.authContent": "Reconnaissance de l'empreinte digitale",
  "uni.picker.done": "OK",
  "uni.picker.cancel": "Annuler",
  "uni.video.danmu": "Danmu",
  "uni.video.volume": "Le Volume",
  "uni.button.feedback.title": "retour d'information",
  "uni.button.feedback.send": "envoyer"
};
var zhHans = {
  "uni.app.quit": "\u518D\u6309\u4E00\u6B21\u9000\u51FA\u5E94\u7528",
  "uni.async.error": "\u8FDE\u63A5\u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u70B9\u51FB\u5C4F\u5E55\u91CD\u8BD5",
  "uni.showActionSheet.cancel": "\u53D6\u6D88",
  "uni.showToast.unpaired": "\u8BF7\u6CE8\u610F showToast \u4E0E hideToast \u5FC5\u987B\u914D\u5BF9\u4F7F\u7528",
  "uni.showLoading.unpaired": "\u8BF7\u6CE8\u610F showLoading \u4E0E hideLoading \u5FC5\u987B\u914D\u5BF9\u4F7F\u7528",
  "uni.showModal.cancel": "\u53D6\u6D88",
  "uni.showModal.confirm": "\u786E\u5B9A",
  "uni.chooseImage.cancel": "\u53D6\u6D88",
  "uni.chooseImage.sourceType.album": "\u4ECE\u76F8\u518C\u9009\u62E9",
  "uni.chooseImage.sourceType.camera": "\u62CD\u6444",
  "uni.chooseVideo.cancel": "\u53D6\u6D88",
  "uni.chooseVideo.sourceType.album": "\u4ECE\u76F8\u518C\u9009\u62E9",
  "uni.chooseVideo.sourceType.camera": "\u62CD\u6444",
  "uni.previewImage.cancel": "\u53D6\u6D88",
  "uni.previewImage.button.save": "\u4FDD\u5B58\u56FE\u50CF",
  "uni.previewImage.save.success": "\u4FDD\u5B58\u56FE\u50CF\u5230\u76F8\u518C\u6210\u529F",
  "uni.previewImage.save.fail": "\u4FDD\u5B58\u56FE\u50CF\u5230\u76F8\u518C\u5931\u8D25",
  "uni.setClipboardData.success": "\u5185\u5BB9\u5DF2\u590D\u5236",
  "uni.scanCode.title": "\u626B\u7801",
  "uni.scanCode.album": "\u76F8\u518C",
  "uni.scanCode.fail": "\u8BC6\u522B\u5931\u8D25",
  "uni.scanCode.flash.on": "\u8F7B\u89E6\u7167\u4EAE",
  "uni.scanCode.flash.off": "\u8F7B\u89E6\u5173\u95ED",
  "uni.startSoterAuthentication.authContent": "\u6307\u7EB9\u8BC6\u522B\u4E2D...",
  "uni.picker.done": "\u5B8C\u6210",
  "uni.picker.cancel": "\u53D6\u6D88",
  "uni.video.danmu": "\u5F39\u5E55",
  "uni.video.volume": "\u97F3\u91CF",
  "uni.button.feedback.title": "\u95EE\u9898\u53CD\u9988",
  "uni.button.feedback.send": "\u53D1\u9001"
};
var zhHant = {
  "uni.app.quit": "\u518D\u6309\u4E00\u6B21\u9000\u51FA\u61C9\u7528",
  "uni.async.error": "\u9023\u63A5\u670D\u52D9\u5668\u8D85\u6642\uFF0C\u9EDE\u64CA\u5C4F\u5E55\u91CD\u8A66",
  "uni.showActionSheet.cancel": "\u53D6\u6D88",
  "uni.showToast.unpaired": "\u8ACB\u6CE8\u610F showToast \u8207 hideToast \u5FC5\u9808\u914D\u5C0D\u4F7F\u7528",
  "uni.showLoading.unpaired": "\u8ACB\u6CE8\u610F showLoading \u8207 hideLoading \u5FC5\u9808\u914D\u5C0D\u4F7F\u7528",
  "uni.showModal.cancel": "\u53D6\u6D88",
  "uni.showModal.confirm": "\u78BA\u5B9A",
  "uni.chooseImage.cancel": "\u53D6\u6D88",
  "uni.chooseImage.sourceType.album": "\u5F9E\u76F8\u518A\u9078\u64C7",
  "uni.chooseImage.sourceType.camera": "\u62CD\u651D",
  "uni.chooseVideo.cancel": "\u53D6\u6D88",
  "uni.chooseVideo.sourceType.album": "\u5F9E\u76F8\u518A\u9078\u64C7",
  "uni.chooseVideo.sourceType.camera": "\u62CD\u651D",
  "uni.previewImage.cancel": "\u53D6\u6D88",
  "uni.previewImage.button.save": "\u4FDD\u5B58\u5716\u50CF",
  "uni.previewImage.save.success": "\u4FDD\u5B58\u5716\u50CF\u5230\u76F8\u518A\u6210\u529F",
  "uni.previewImage.save.fail": "\u4FDD\u5B58\u5716\u50CF\u5230\u76F8\u518A\u5931\u6557",
  "uni.setClipboardData.success": "\u5167\u5BB9\u5DF2\u5FA9\u5236",
  "uni.scanCode.title": "\u6383\u78BC",
  "uni.scanCode.album": "\u76F8\u518A",
  "uni.scanCode.fail": "\u8B58\u5225\u5931\u6557",
  "uni.scanCode.flash.on": "\u8F15\u89F8\u7167\u4EAE",
  "uni.scanCode.flash.off": "\u8F15\u89F8\u95DC\u9589",
  "uni.startSoterAuthentication.authContent": "\u6307\u7D0B\u8B58\u5225\u4E2D...",
  "uni.picker.done": "\u5B8C\u6210",
  "uni.picker.cancel": "\u53D6\u6D88",
  "uni.video.danmu": "\u5F48\u5E55",
  "uni.video.volume": "\u97F3\u91CF",
  "uni.button.feedback.title": "\u554F\u984C\u53CD\u994B",
  "uni.button.feedback.send": "\u767C\u9001"
};
const messages = {
  en,
  es,
  fr,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};
const fallbackLocale = "en";
const i18n = initVueI18n(messages, fallbackLocale);
const i18nMixin = i18n.mixin;
var index_vue_vue_type_style_index_0_lang$1 = "\n.uni-async-error {\r\n		position: absolute;\r\n		left: 0;\r\n		right: 0;\r\n		top: 0;\r\n		bottom: 0;\r\n		color: #999;\r\n		padding: 100px 10px;\r\n		text-align: center;\n}\r\n";
const _sfc_main$1 = {
  name: "AsyncError",
  mixins: [i18nMixin],
  methods: {
    _onClick() {
      window.location.reload();
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: "uni-async-error",
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }, toDisplayString(_ctx.$$t("uni.async.error")), 1);
}
_sfc_main$1.render = _sfc_render$1;
var index_vue_vue_type_style_index_0_lang = "\n.uni-async-loading {\n    box-sizing: border-box;\r\n		width: 100%;\r\n		padding: 50px;\r\n		text-align: center;\n}\n.uni-async-loading .uni-loading {\r\n		width: 30px;\r\n		height: 30px;\n}\r\n";
const _sfc_main = {
  name: "AsyncLoading"
};
const _hoisted_1 = {class: "uni-async-loading"};
const _hoisted_2 = /* @__PURE__ */ createVNode("i", {class: "uni-loading"}, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [
    _hoisted_2
  ]);
}
_sfc_main.render = _sfc_render;
export {_sfc_main$1 as AsyncErrorComponent, _sfc_main as AsyncLoadingComponent, _sfc_main$o as Audio, _sfc_main$n as Canvas, _sfc_main$m as Checkbox, _sfc_main$l as CheckboxGroup, _sfc_main$k as Editor, _sfc_main$j as Form, index$2 as Icon, _sfc_main$h as Image, _sfc_main$g as Input, _sfc_main$f as Label, _sfc_main$e as MovableView, _sfc_main$d as Navigator, index as PageComponent, _sfc_main$c as Progress, _sfc_main$b as Radio, _sfc_main$a as RadioGroup, _sfc_main$i as ResizeSensor, _sfc_main$9 as RichText, _sfc_main$8 as ScrollView, _sfc_main$7 as Slider, _sfc_main$6 as SwiperItem, _sfc_main$5 as Switch, index$1 as Text, _sfc_main$4 as Textarea, UniServiceJSBridge$1 as UniServiceJSBridge, UniViewJSBridge$1 as UniViewJSBridge, _sfc_main$3 as View, addInterceptor, arrayBufferToBase64, base64ToArrayBuffer, canIUse, createIntersectionObserver, createSelectorQuery, getApp$1 as getApp, getCurrentPages$1 as getCurrentPages, getImageInfo, getSystemInfo, getSystemInfoSync, makePhoneCall, navigateBack, navigateTo, openDocument, index$3 as plugin, promiseInterceptor, reLaunch, redirectTo, removeInterceptor, switchTab, uni$1 as uni, upx2px};
