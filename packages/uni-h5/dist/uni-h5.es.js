import {isFunction, extend, hyphenate, isPlainObject, isString, isArray, hasOwn, isObject, capitalize, toRawType, makeMap as makeMap$1, isPromise, invokeArrayFns as invokeArrayFns$1} from "@vue/shared";
import {injectHook, withModifiers, createVNode, getCurrentInstance, inject, provide, reactive, computed, nextTick, onBeforeMount, onMounted, onBeforeActivate, onBeforeDeactivate, openBlock, createBlock, mergeProps, toDisplayString, ref, defineComponent, resolveComponent, toHandlers, renderSlot, watch, onUnmounted, onBeforeUnmount, onActivated, withDirectives, vShow, createTextVNode, createCommentVNode, shallowRef, watchEffect, renderList, onDeactivated, Fragment, Teleport, createApp, Transition, withCtx, KeepAlive, resolveDynamicComponent} from "vue";
import {once, passive, normalizeTarget, isBuiltInComponent, invokeArrayFns, NAVBAR_HEIGHT, parseQuery, PRIMARY_COLOR, removeLeadingSlash, getLen, ON_REACH_BOTTOM_DISTANCE, decodedQuery, debounce, plusReady, updateElementStyle, addFont, scrollTo} from "@dcloudio/uni-shared";
import {initVueI18n, LOCALE_EN, LOCALE_ES, LOCALE_FR, LOCALE_ZH_HANS, LOCALE_ZH_HANT} from "@dcloudio/uni-i18n";
import {useRoute, createRouter, createWebHistory, createWebHashHistory, useRouter, isNavigationFailure, RouterView} from "vue-router";
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
let i18n$1;
function useI18n() {
  if (!i18n$1) {
    let language;
    {
      language = navigator.language;
    }
    i18n$1 = initVueI18n(language);
  }
  return i18n$1;
}
const i18n = /* @__PURE__ */ useI18n();
function normalizeMessages(namespace, messages) {
  return Object.keys(messages).reduce((res, name) => {
    res[namespace + name] = messages[name];
    return res;
  }, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.async.";
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, {
      error: "The connection timed out, click the screen to try again."
    }));
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, {
      error: "Se agot\xF3 el tiempo de conexi\xF3n, haga clic en la pantalla para volver a intentarlo."
    }));
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, {
      error: "La connexion a expir\xE9, cliquez sur l'\xE9cran pour r\xE9essayer."
    }));
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, {error: "\u8FDE\u63A5\u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u70B9\u51FB\u5C4F\u5E55\u91CD\u8BD5"}));
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, {error: "\u9023\u63A5\u670D\u52D9\u5668\u8D85\u6642\uFF0C\u9EDE\u64CA\u5C4F\u5E55\u91CD\u8A66"}));
  }
});
const initI18nShowToastMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showToast.";
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, {
      unpaired: "Please note showToast must be paired with hideToast"
    }));
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, {
      unpaired: "Tenga en cuenta que showToast debe estar emparejado con hideToast"
    }));
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, {
      unpaired: "Veuillez noter que showToast doit \xEAtre associ\xE9 \xE0 hideToast"
    }));
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, {
      unpaired: "\u8BF7\u6CE8\u610F showToast \u4E0E hideToast \u5FC5\u987B\u914D\u5BF9\u4F7F\u7528"
    }));
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, {
      unpaired: "\u8ACB\u6CE8\u610F showToast \u8207 hideToast \u5FC5\u9808\u914D\u5C0D\u4F7F\u7528"
    }));
  }
});
const initI18nShowLoadingMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showLoading.";
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, {
      unpaired: "Please note showLoading must be paired with hideLoading"
    }));
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, {
      unpaired: "Tenga en cuenta que showLoading debe estar emparejado con hideLoading"
    }));
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, {
      unpaired: "Veuillez noter que showLoading doit \xEAtre associ\xE9 \xE0 hideLoading"
    }));
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, {
      unpaired: "\u8BF7\u6CE8\u610F showLoading \u4E0E hideLoading \u5FC5\u987B\u914D\u5BF9\u4F7F\u7528"
    }));
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, {
      unpaired: "\u8ACB\u6CE8\u610F showLoading \u8207 hideLoading \u5FC5\u9808\u914D\u5C0D\u4F7F\u7528"
    }));
  }
});
const initI18nShowModalMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showModal.";
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, {cancel: "Cancel", confirm: "OK"}));
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, {cancel: "Cancelar", confirm: "OK"}));
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, {cancel: "Annuler", confirm: "OK"}));
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, {cancel: "\u53D6\u6D88", confirm: "\u786E\u5B9A"}));
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, {cancel: "\u53D6\u6D88", confirm: "\u78BA\u5B9A"}));
  }
});
const initI18nVideoMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.video.";
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, {danmu: "Danmu", volume: "Volume"}));
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, {danmu: "Danmu", volume: "Volumen"}));
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, {danmu: "Danmu", volume: "Le Volume"}));
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, {danmu: "\u5F39\u5E55", volume: "\u97F3\u91CF"}));
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, {danmu: "\u5F48\u5E55", volume: "\u97F3\u91CF"}));
  }
});
function E() {
}
E.prototype = {
  on: function(name, callback2, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback2,
      ctx
    });
    return this;
  },
  once: function(name, callback2, ctx) {
    var self = this;
    function listener2() {
      self.off(name, listener2);
      callback2.apply(ctx, arguments);
    }
    listener2._ = callback2;
    return this.on(name, listener2, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback2) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback2) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback2 && evts[i2].fn._ !== callback2)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
function initBridge(namespace) {
  const emitter = new E();
  return extend(emitter, {
    subscribe(event, callback2) {
      emitter.on(`${namespace}.${event}`, callback2);
    },
    unsubscribe(event, callback2) {
      emitter.off(`${namespace}.${event}`, callback2);
    },
    subscribeHandler(event, args, pageId) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[${namespace}][subscribeHandler][${Date.now()}]:${event}, ${JSON.stringify(args)}, ${pageId}`);
      }
      emitter.emit(`${namespace}.${event}`, args, pageId);
    }
  });
}
const ViewJSBridge = /* @__PURE__ */ initBridge("view");
const LONGPRESS_TIMEOUT = 350;
const LONGPRESS_THRESHOLD = 10;
const passiveOptions$2 = passive(true);
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
  window.addEventListener("touchstart", touchstart, passiveOptions$2);
  window.addEventListener("touchmove", touchmove, passiveOptions$2);
  window.addEventListener("touchend", clearLongPressTimer, passiveOptions$2);
  window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions$2);
}
var attrs = ["top", "left", "right", "bottom"];
var inited$1;
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
  function setStyle(el, style2) {
    var elStyle = el.style;
    Object.keys(style2).forEach(function(key) {
      var val = style2[key];
      elStyle[key] = val;
    });
  }
  var cbs = [];
  function parentReady(callback2) {
    if (callback2) {
      cbs.push(callback2);
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
  inited$1 = true;
}
function getAttr(attr2) {
  if (!inited$1) {
    init();
  }
  return elementComputedStyle[attr2];
}
var changeAttrs = [];
function attrChange(attr2) {
  if (!changeAttrs.length) {
    setTimeout(function() {
      var style2 = {};
      changeAttrs.forEach(function(attr3) {
        style2[attr3] = elementComputedStyle[attr3];
      });
      changeAttrs.length = 0;
      callbacks$2.forEach(function(callback2) {
        callback2(style2);
      });
    }, 0);
  }
  changeAttrs.push(attr2);
}
var callbacks$2 = [];
function onChange(callback2) {
  if (!getSupport()) {
    return;
  }
  if (!inited$1) {
    init();
  }
  if (typeof callback2 === "function") {
    callbacks$2.push(callback2);
  }
}
function offChange(callback2) {
  var index2 = callbacks$2.indexOf(callback2);
  if (index2 >= 0) {
    callbacks$2.splice(index2, 1);
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
var D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out = safeAreaInsets;
const onEventPrevent = /* @__PURE__ */ withModifiers(() => {
}, ["prevent"]);
const onEventStop = /* @__PURE__ */ withModifiers(() => {
}, ["stop"]);
function getWindowOffset() {
  const style2 = document.documentElement.style;
  const top = parseInt(style2.getPropertyValue("--window-top"));
  const bottom = parseInt(style2.getPropertyValue("--window-bottom"));
  const left = parseInt(style2.getPropertyValue("--window-left"));
  const right = parseInt(style2.getPropertyValue("--window-right"));
  return {
    top: top ? top + D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top : 0,
    bottom: bottom ? bottom + D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.bottom : 0,
    left: left ? left + D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.left : 0,
    right: right ? right + D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.right : 0
  };
}
const style = document.documentElement.style;
function updateCssVar(cssVars) {
  Object.keys(cssVars).forEach((name) => {
    style.setProperty(name, cssVars[name]);
  });
}
function updatePageCssVar(cssVars) {
  return updateCssVar(cssVars);
}
const sheetsMap = new Map();
function updateStyle(id2, content) {
  let style2 = sheetsMap.get(id2);
  if (style2 && !(style2 instanceof HTMLStyleElement)) {
    removeStyle(id2);
    style2 = void 0;
  }
  if (!style2) {
    style2 = document.createElement("style");
    style2.setAttribute("type", "text/css");
    style2.innerHTML = content;
    document.head.appendChild(style2);
  } else {
    style2.innerHTML = content;
  }
  sheetsMap.set(id2, style2);
}
function removeStyle(id2) {
  let style2 = sheetsMap.get(id2);
  if (style2) {
    if (style2 instanceof CSSStyleSheet) {
      document.adoptedStyleSheets.indexOf(style2);
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== style2);
    } else {
      document.head.removeChild(style2);
    }
    sheetsMap.delete(id2);
  }
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
function useCurrentPageId() {
  return getCurrentInstance().root.proxy.$page.id;
}
function getPageIdByVm(vm) {
  if (!vm.$) {
    return;
  }
  const rootProxy = vm.$.root.proxy;
  if (rootProxy && rootProxy.$page) {
    return rootProxy.$page.id;
  }
}
function disableScrollListener(evt) {
  evt.preventDefault();
}
let testReachBottomTimer;
let lastScrollHeight = 0;
function createScrollListener({
  onPageScroll,
  onReachBottom,
  onReachBottomDistance
}) {
  let ticking = false;
  let hasReachBottom = false;
  let reachBottomLocking = true;
  const isReachBottom = () => {
    const {scrollHeight} = document.documentElement;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
    const heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
    if (isBottom && (!hasReachBottom || heightChanged)) {
      lastScrollHeight = scrollHeight;
      hasReachBottom = true;
      return true;
    }
    if (!isBottom && hasReachBottom) {
      hasReachBottom = false;
    }
    return false;
  };
  const trigger = () => {
    onPageScroll && onPageScroll(window.pageYOffset);
    function testReachBottom() {
      if (isReachBottom()) {
        onReachBottom && onReachBottom();
        reachBottomLocking = false;
        setTimeout(function() {
          reachBottomLocking = true;
        }, 350);
        return true;
      }
    }
    if (onReachBottom && reachBottomLocking) {
      if (testReachBottom())
        ;
      else {
        testReachBottomTimer = setTimeout(testReachBottom, 300);
      }
    }
    ticking = false;
  };
  return function onScroll() {
    clearTimeout(testReachBottomTimer);
    if (!ticking) {
      requestAnimationFrame(trigger);
    }
    ticking = true;
  };
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
  let i2 = 0;
  for (; i2 < toRouteLength && toRouteArray[i2] === ".."; i2++) {
  }
  toRouteArray.splice(0, i2);
  toRoute = toRouteArray.join("/");
  const fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
  fromRouteArray.splice(fromRouteArray.length - i2 - 1, i2 + 1);
  return "/" + fromRouteArray.concat(toRouteArray).join("/");
}
const isClickEvent = (val) => val.type === "click";
const isMouseEvent = (val) => val.type.indexOf("mouse") === 0;
function $nne(evt) {
  const {currentTarget} = evt;
  if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
    return evt;
  }
  if (currentTarget.tagName.indexOf("UNI-") !== 0) {
    return evt;
  }
  const res = createNativeEvent(evt);
  if (isClickEvent(evt)) {
    normalizeClickEvent(res, evt);
  } else if (isMouseEvent(evt)) {
    normalizeMouseEvent(res, evt);
  } else if (evt instanceof TouchEvent) {
    const {top} = getWindowOffset();
    res.touches = normalizeTouchEvent(evt.touches, top);
    res.changedTouches = normalizeTouchEvent(evt.changedTouches, top);
  }
  return res;
}
function createNativeEvent(evt) {
  const {type, timeStamp, currentTarget} = evt;
  const target = normalizeTarget(currentTarget);
  const event = {
    type,
    timeStamp,
    target,
    detail: {},
    currentTarget: target
  };
  {
    extend(event, {
      preventDefault() {
        if (process.env.NODE_ENV !== "production") {
          console.warn("preventDefault is only supported in h5, use `.prevent` instead.");
        }
        return evt.preventDefault();
      },
      stopPropagation() {
        if (process.env.NODE_ENV !== "production") {
          console.warn("stopPropagation is only supported in h5, use `.stop` instead.");
        }
        return evt.stopPropagation();
      }
    });
  }
  return event;
}
function normalizeClickEvent(evt, mouseEvt) {
  const {x, y} = mouseEvt;
  const {top} = getWindowOffset();
  evt.detail = {x, y: y - top};
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt)];
}
function normalizeMouseEvent(evt, mouseEvt) {
  const {top} = getWindowOffset();
  evt.pageX = mouseEvt.pageX;
  evt.pageY = mouseEvt.pageY - top;
  evt.clientX = mouseEvt.clientX;
  evt.clientY = mouseEvt.clientY - top;
}
function createTouchEvent(evt) {
  return {
    force: 1,
    identifier: 0,
    clientX: evt.clientX,
    clientY: evt.clientY,
    pageX: evt.pageX,
    pageY: evt.pageY
  };
}
function normalizeTouchEvent(touches, top) {
  const res = [];
  for (let i2 = 0; i2 < touches.length; i2++) {
    const {identifier, pageX, pageY, clientX, clientY, force} = touches[i2];
    res.push({
      identifier,
      pageX,
      pageY: pageY - top,
      clientX,
      clientY: clientY - top,
      force: force || 0
    });
  }
  return res;
}
var instance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  $nne
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
    for (let i2 = 0; i2 < els.length; i2++) {
      const el = els[i2];
      el.__vue__ && descriptors.push(createComponentDescriptor(el.__vue__, false));
    }
    return descriptors;
  }
  setStyle(style2) {
    if (!this.$el || !style2) {
      return this;
    }
    if (typeof style2 === "string") {
      style2 = parseStyleText(style2);
    }
    if (isPlainObject(style2)) {
      this.$el.__wxsStyle = style2;
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
  requestAnimationFrame(callback2) {
    return window.requestAnimationFrame(callback2), this;
  }
  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
  }
  triggerEvent(eventName, detail = {}) {
    return this.$vm.$emit(eventName, detail), this;
  }
}
function createComponentDescriptor(vm, isOwnerInstance = true) {
  if (isOwnerInstance && vm && vm.$options.name && isBuiltInComponent(hyphenate(vm.$options.name))) {
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
  return createComponentDescriptor(instance2, isOwnerInstance);
}
function initAppConfig$1(appConfig) {
  const globalProperties = appConfig.globalProperties;
  extend(globalProperties, instance);
  if (__UNI_FEATURE_WXS__) {
    globalProperties.$gcd = getComponentDescriptor;
  }
}
function initView(app) {
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress();
  }
  initAppConfig$1(app._context.config);
}
const ServiceJSBridge = /* @__PURE__ */ extend(initBridge("service"), {
  invokeOnCallback(name, res) {
    return UniServiceJSBridge.emit("api." + name, res);
  }
});
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
  if (__UNI_FEATURE_WX__) {
    const globalProperties = appConfig.globalProperties;
    extend(globalProperties, wxInstance);
  }
}
function getPageById(id2) {
  return getCurrentPages().find((page) => page.$page.id === id2);
}
function getPageVmById(id2) {
  const page = getPageById(id2);
  if (page) {
    return page.$vm;
  }
}
function getCurrentPage() {
  const pages = getCurrentPages();
  const len = pages.length;
  if (len) {
    return pages[len - 1];
  }
}
function getCurrentPageMeta() {
  const page = getCurrentPage();
  if (page) {
    return page.$page.meta;
  }
}
function getCurrentPageId() {
  const meta = getCurrentPageMeta();
  if (meta) {
    return meta.id;
  }
  return -1;
}
function getCurrentPageVm() {
  const page = getCurrentPage();
  if (page) {
    return page.$vm;
  }
}
function invokeHook(vm, name, args) {
  if (isString(vm)) {
    args = name;
    name = vm;
    vm = getCurrentPageVm();
  } else if (typeof vm === "number") {
    const page = getCurrentPages().find((page2) => page2.$page.id === vm);
    if (page) {
      vm = page.$vm;
    } else {
      vm = getCurrentPageVm();
    }
  }
  if (!vm) {
    return;
  }
  const hooks = vm.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
function initOn() {
  UniServiceJSBridge.on("onAppEnterForeground", onAppEnterForeground);
  UniServiceJSBridge.on("onAppEnterBackground", onAppEnterBackground);
}
function onAppEnterForeground() {
  const page = getCurrentPage();
  const showOptions = {
    path: "",
    query: {}
  };
  if (page) {
    showOptions.path = page.$page.route;
    showOptions.query = page.$page.options;
  }
  invokeHook(getApp(), "onShow", showOptions);
  invokeHook(page, "onShow");
}
function onAppEnterBackground() {
  invokeHook(getApp(), "onHide");
  invokeHook(getCurrentPage(), "onHide");
}
const SUBSCRIBE_LIFECYCLE_HOOKS = ["onPageScroll", "onReachBottom"];
function initSubscribe() {
  SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) => UniServiceJSBridge.subscribe(name, createPageEvent(name)));
}
function createPageEvent(name) {
  return (args, pageId) => {
    const vm = getPageVmById(pageId);
    if (vm) {
      invokeHook(vm, name, args);
    }
  };
}
function initService(app) {
  initOn();
  initSubscribe();
  initAppConfig(app._context.config);
}
function errorHandler(err, instance2, info) {
  if (!instance2) {
    throw err;
  }
  const app = getApp();
  if (!app || !app.$vm) {
    throw err;
  }
  {
    invokeHook(app.$vm, "onError", err);
  }
}
function initApp$1(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = errorHandler;
  }
  const globalProperties = appConfig.globalProperties;
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions;
  }
}
const pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
  return inject(pageMetaKey);
}
function providePageMeta(id2) {
  const pageMeta = initPageMeta(id2);
  provide(pageMetaKey, pageMeta);
  return pageMeta;
}
function usePageRoute() {
  if (__UNI_FEATURE_PAGES__) {
    return useRoute();
  }
  const url = location.href;
  const searchPos = url.indexOf("?");
  const hashPos = url.indexOf("#", searchPos > -1 ? searchPos : 0);
  let query = {};
  if (searchPos > -1) {
    query = parseQuery(url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length));
  }
  const {meta} = __uniRoutes[0];
  return {
    meta,
    query,
    path: "/" + meta.route
  };
}
function initPageMeta(id2) {
  if (__UNI_FEATURE_PAGES__) {
    return reactive(normalizePageMeta(JSON.parse(JSON.stringify(mergePageMeta(id2, useRoute().meta)))));
  }
  return reactive(normalizePageMeta(JSON.parse(JSON.stringify(mergePageMeta(id2, __uniRoutes[0].meta)))));
}
const PAGE_META_KEYS = [
  "navigationBar",
  "refreshOptions"
];
function mergePageMeta(id2, pageMeta) {
  const res = Object.assign({id: id2}, __uniConfig.globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = Object.assign({}, __uniConfig.globalStyle[name] || {}, pageMeta[name] || {});
  });
  return res;
}
function normalizePageMeta(pageMeta) {
  if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
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
        offset += NAVBAR_HEIGHT + D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top;
      }
      refreshOptions.offset = offset;
      refreshOptions.height = rpx2px(refreshOptions.height);
      refreshOptions.range = rpx2px(refreshOptions.range);
      pageMeta.refreshOptions = refreshOptions;
    }
  }
  if (__UNI_FEATURE_NAVIGATIONBAR__) {
    const {navigationBar} = pageMeta;
    const {titleSize, titleColor, backgroundColor} = navigationBar;
    navigationBar.backButton = pageMeta.isQuit ? false : true;
    navigationBar.titleSize = titleSize || "16px";
    navigationBar.titleColor = titleColor || "#fff";
    navigationBar.backgroundColor = backgroundColor || "#F7F7F7";
  }
  if (__UNI_FEATURE_PAGES__ && history.state) {
    const type = history.state.__type__;
    if ((type === "redirectTo" || type === "reLaunch") && getCurrentPages().length === 0) {
      pageMeta.isEntry = true;
      pageMeta.isQuit = true;
    }
  }
  return pageMeta;
}
PolySymbol(process.env.NODE_ENV !== "production" ? "layout" : "l");
let tabBar;
function useTabBar() {
  if (!tabBar) {
    tabBar = __uniConfig.tabBar && reactive(__uniConfig.tabBar);
  }
  return tabBar;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = /* @__PURE__ */ function() {
  const lookup2 = new Uint8Array(256);
  for (var i2 = 0; i2 < chars.length; i2++) {
    lookup2[chars.charCodeAt(i2)] = i2;
  }
  return lookup2;
}();
function encode$1(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
  for (i2 = 0; i2 < len; i2 += 3) {
    base64 += chars[bytes[i2] >> 2];
    base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
    base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
    base64 += chars[bytes[i2 + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
}
function decode(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i2, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
}
const CHOOSE_SIZE_TYPES = ["original", "compressed"];
const CHOOSE_SOURCE_TYPES = ["album", "camera"];
const HTTP_METHODS = [
  "GET",
  "OPTIONS",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "TRACE",
  "CONNECT"
];
function elemInArray(str, arr) {
  if (!str || arr.indexOf(str) === -1) {
    return arr[0];
  }
  return str;
}
function elemsInArray(strArr, optionalVal) {
  if (!isArray(strArr) || strArr.length === 0 || strArr.find((val) => optionalVal.indexOf(val) === -1)) {
    return optionalVal;
  }
  return strArr;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol) {
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      validateProtocolFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || Object.create(null), protocol);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, {[opts.name]: opts});
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = {type: prop};
  }
  const {type, required, validator: validator2} = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const {valid, expectedType} = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator2) {
    return validator2(value);
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
    valid = isObject(value);
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
function addInvokeCallback(id2, name, callback2, keepAlive = false) {
  invokeCallbacks[id2] = {
    name,
    keepAlive,
    callback: callback2
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
function findInvokeCallbackByName(name) {
  for (const key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      return true;
    }
  }
  return false;
}
function removeKeepAliveApiCallback(name, callback2) {
  for (const key in invokeCallbacks) {
    const item = invokeCallbacks[key];
    if (item.callback === callback2 && item.name === name) {
      delete invokeCallbacks[key];
    }
  }
}
function offKeepAliveApiCallback(name) {
  UniServiceJSBridge.off("api." + name);
}
function onKeepAliveApiCallback(name) {
  UniServiceJSBridge.on("api." + name, (res) => {
    for (const key in invokeCallbacks) {
      const opts = invokeCallbacks[key];
      if (opts.name === name) {
        opts.callback(res);
      }
    }
  });
}
function createKeepAliveApiCallback(name, callback2) {
  return addInvokeCallback(invokeCallbackId++, name, callback2, true);
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
  addInvokeCallback(callbackId, name, (res) => {
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
const callbacks$1 = [API_SUCCESS, API_FAIL, API_COMPLETE];
function hasCallback(args) {
  if (isPlainObject(args) && callbacks$1.find((cb) => isFunction(args[cb]))) {
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
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id2, name, res) {
  return invokeCallback(id2, extend(res || {}, {errMsg: name + ":ok"}));
}
function invokeFail(id2, name, err) {
  return invokeCallback(id2, {errMsg: name + ":fail" + (err ? " " + err : "")});
}
function beforeInvokeApi(name, args, protocol, options) {
  if (process.env.NODE_ENV !== "production") {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback2) {
  if (!isFunction(callback2)) {
    throw new Error('Invalid args: type check failed for args "callback". Expected Function');
  }
}
function wrapperOnApi(name, fn, options) {
  return (callback2) => {
    checkCallback(callback2);
    const errMsg = beforeInvokeApi(name, [callback2], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
    createKeepAliveApiCallback(name, callback2);
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name);
      fn();
    }
  };
}
function wrapperOffApi(name, fn, options) {
  return (callback2) => {
    checkCallback(callback2);
    const errMsg = beforeInvokeApi(name, [callback2], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    name = name.replace("off", "on");
    removeKeepAliveApiCallback(name, callback2);
    const hasInvokeOnApi = findInvokeCallbackByName(name);
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(name);
      fn();
    }
  };
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id2 = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id2, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id2, name, res),
      reject: (err) => invokeFail(id2, name, err)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
  return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
  return wrapperOffApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
  return promisify(wrapperTaskApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(wrapperAsyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
const API_BASE64_TO_ARRAY_BUFFER = "base64ToArrayBuffer";
const Base64ToArrayBufferProtocol = [
  {
    name: "base64",
    type: String,
    required: true
  }
];
const API_ARRAY_BUFFER_TO_BASE64 = "arrayBufferToBase64";
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
  return encode$1(arrayBuffer);
}, ArrayBufferToBase64Protocol);
function findElem(vm) {
  return vm.$el;
}
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
const isAndroid = /* @__PURE__ */ /android/i.test(ua);
const isIOS$1 = /* @__PURE__ */ /iphone|ipad|ipod/i.test(ua);
const isWindows = /* @__PURE__ */ ua.match(/Windows NT ([\d|\d.\d]*)/i);
const isMac = /* @__PURE__ */ /Macintosh|Mac/i.test(ua);
const isLinux = /* @__PURE__ */ /Linux|X11/i.test(ua);
const isIPadOS = isMac && navigator.maxTouchPoints > 0;
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
function operateVideoPlayer(videoId, vm, type, data) {
  const pageId = getPageIdByVm(vm);
  UniServiceJSBridge.publishHandler("video." + videoId, {
    videoId,
    type,
    data
  }, pageId);
}
function operateMap(id2, vm, type, data) {
  const pageId = getPageIdByVm(vm);
  UniServiceJSBridge.publishHandler("map." + id2, {
    type,
    data
  }, pageId);
}
function addIntersectionObserver({reqId, component, options, callback: callback2}, _pageId) {
  const $el = findElem(component);
  ($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver($el, options, callback2);
}
function removeIntersectionObserver({reqId, component}, _pageId) {
  const $el = findElem(component);
  const intersectionObserver = $el.__io && $el.__io[reqId];
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    delete $el.__io[reqId];
  }
}
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
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
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
const validator = [
  {
    name: "id",
    type: String,
    required: true
  }
];
const API_CREATE_VIDEO_CONTEXT = "createVideoContext";
const API_CREATE_MAP_CONTEXT = "createMapContext";
const CreateMapContextProtocol = validator;
const API_CREATE_INNER_AUDIO_CONTEXT = "createInnerAudioContext";
const RATES = [0.5, 0.8, 1, 1.25, 1.5, 2];
class VideoContext {
  constructor(id2, vm) {
    this.id = id2;
    this.vm = vm;
  }
  play() {
    operateVideoPlayer(this.id, this.vm, "play");
  }
  pause() {
    operateVideoPlayer(this.id, this.vm, "pause");
  }
  stop() {
    operateVideoPlayer(this.id, this.vm, "stop");
  }
  seek(position) {
    operateVideoPlayer(this.id, this.vm, "seek", {
      position
    });
  }
  sendDanmu(args) {
    operateVideoPlayer(this.id, this.vm, "sendDanmu", args);
  }
  playbackRate(rate) {
    if (!~RATES.indexOf(rate)) {
      rate = 1;
    }
    operateVideoPlayer(this.id, this.vm, "playbackRate", {
      rate
    });
  }
  requestFullScreen(args = {}) {
    operateVideoPlayer(this.id, this.vm, "requestFullScreen", args);
  }
  exitFullScreen() {
    operateVideoPlayer(this.id, this.vm, "exitFullScreen");
  }
  showStatusBar() {
    operateVideoPlayer(this.id, this.vm, "showStatusBar");
  }
  hideStatusBar() {
    operateVideoPlayer(this.id, this.vm, "hideStatusBar");
  }
}
const createVideoContext = defineSyncApi(API_CREATE_VIDEO_CONTEXT, (id2, context) => {
  if (context) {
    return new VideoContext(id2, context);
  }
  return new VideoContext(id2, getCurrentPageVm());
});
class MapContext {
  constructor(id2, vm) {
    this.id = id2;
    this.vm = vm;
  }
  getCenterLocation(options) {
    operateMap(this.id, this.vm, "getCenterLocation", options);
  }
  moveToLocation() {
    operateMap(this.id, this.vm, "moveToLocation");
  }
  getScale(options) {
    operateMap(this.id, this.vm, "getScale", options);
  }
  getRegion(options) {
    operateMap(this.id, this.vm, "getRegion", options);
  }
  includePoints(options) {
    operateMap(this.id, this.vm, "includePoints", options);
  }
  translateMarker(options) {
    operateMap(this.id, this.vm, "translateMarker", options);
  }
  addCustomLayer() {
  }
  removeCustomLayer() {
  }
  addGroundOverlay() {
  }
  removeGroundOverlay() {
  }
  updateGroundOverlay() {
  }
  initMarkerCluster() {
  }
  addMarkers() {
  }
  removeMarkers() {
  }
  moveAlong() {
  }
  openMapAp() {
  }
  $getAppMap() {
  }
}
const createMapContext = defineSyncApi(API_CREATE_MAP_CONTEXT, (id2, context) => {
  if (context) {
    return new MapContext(id2, context);
  }
  return new MapContext(id2, getCurrentPageVm());
}, CreateMapContextProtocol);
const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
};
const MARGINS = ["top", "right", "bottom", "left"];
let reqComponentObserverId = 1;
function normalizeRootMargin(margins = {}) {
  return MARGINS.map((name) => `${Number(margins[name]) || 0}px`).join(" ");
}
class ServiceIntersectionObserver {
  constructor(component, options) {
    this._pageId = getPageIdByVm(component);
    this._component = component;
    this._options = extend({}, defaultOptions, options);
  }
  relativeTo(selector, margins) {
    this._options.relativeToSelector = selector;
    this._options.rootMargin = normalizeRootMargin(margins);
    return this;
  }
  relativeToViewport(margins) {
    this._options.relativeToSelector = void 0;
    this._options.rootMargin = normalizeRootMargin(margins);
    return this;
  }
  observe(selector, callback2) {
    if (!isFunction(callback2)) {
      return;
    }
    this._options.selector = selector;
    this._reqId = reqComponentObserverId++;
    addIntersectionObserver({
      reqId: this._reqId,
      component: this._component,
      options: this._options,
      callback: callback2
    }, this._pageId);
  }
  disconnect() {
    this._reqId && removeIntersectionObserver({reqId: this._reqId, component: this._component}, this._pageId);
  }
}
const createIntersectionObserver = defineSyncApi("createIntersectionObserver", (context, options) => {
  if (context && !getPageIdByVm(context)) {
    options = context;
    context = null;
  }
  if (context) {
    return new ServiceIntersectionObserver(context, options);
  }
  return new ServiceIntersectionObserver(getCurrentPageVm(), options);
});
const createSelectorQuery = () => {
};
const API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
const onTabBarMidButtonTap = defineOnApi(API_ON_TAB_BAR_MID_BUTTON_TAP, () => {
});
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
  phoneNumber: String
};
const API_ON_ACCELEROMETER = "onAccelerometer";
const API_OFF_ACCELEROMETER = "offAccelerometer";
const API_START_ACCELEROMETER = "startAccelerometer";
const API_STOP_ACCELEROMETER = "stopAccelerometer";
const API_ON_COMPASS = "onCompass";
const API_OFF_COMPASS = "offCompass";
const API_START_COMPASS = "startCompass";
const API_STOP_COMPASS = "stopCompass";
const API_VIBRATE_SHORT = "vibrateShort";
const API_VIBRATE_LONG = "vibrateLong";
const API_GET_STORAGE = "getStorage";
const GetStorageProtocol = {
  key: {
    type: String,
    required: true
  }
};
const API_GET_STORAGE_SYNC = "getStorageSync";
const GetStorageSyncProtocol = [
  {
    name: "key",
    type: String,
    required: true
  }
];
const API_SET_STORAGE = "setStorage";
const SetStorageProtocol = {
  key: {
    type: String,
    required: true
  },
  data: {
    required: true
  }
};
const API_SET_STORAGE_SYNC = "setStorageSync";
const SetStorageSyncProtocol = [
  {
    name: "key",
    type: String,
    required: true
  },
  {
    name: "data",
    required: true
  }
];
const API_REMOVE_STORAGE = "removeStorage";
const RemoveStorageProtocol = GetStorageProtocol;
const RemoveStorageSyncProtocol = GetStorageSyncProtocol;
const API_GET_FILE_INFO = "getFileInfo";
const GetFileInfoOptions = {
  formatArgs: {
    filePath(filePath, params) {
      params.filePath = getRealPath(filePath);
    }
  }
};
const GetFileInfoProtocol = {
  filePath: {
    type: String,
    required: true
  }
};
const API_OPEN_DOCUMENT = "openDocument";
const OpenDocumentOptions = {
  formatArgs: {
    filePath(filePath, params) {
      params.filePath = getRealPath(filePath);
    }
  }
};
const OpenDocumentProtocol = {
  filePath: {
    type: String,
    required: true
  },
  fileType: String
};
const API_HIDE_KEYBOARD = "hideKeyboard";
const API_GET_LOCATION = "getLocation";
const coordTypes = ["WGS84", "GCJ02"];
const GetLocationOptions = {
  formatArgs: {
    type(value, params) {
      value = (value || "").toUpperCase();
      if (coordTypes.indexOf(value) === -1) {
        params.type = coordTypes[0];
      } else {
        params.type = value;
      }
    },
    altitude(value, params) {
      params.altitude = value ? value : false;
    }
  }
};
const GetLocationProtocol = {
  type: String,
  altitude: Boolean
};
const API_CHOOSE_IMAGE = "chooseImage";
const ChooseImageOptions = {
  formatArgs: {
    count(value, params) {
      if (!value || value <= 0) {
        params.count = 9;
      }
    },
    sizeType(sizeType, params) {
      params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES);
    },
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
    },
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return "param extension should not be empty.";
      }
      if (!extension)
        params.extension = [""];
    }
  }
};
const ChooseImageProtocol = {
  count: Number,
  sizeType: [Array, String],
  sourceType: Array,
  extension: Array
};
const API_CHOOSE_VIDEO = "chooseVideo";
const ChooseVideoOptions = {
  formatArgs: {
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
    },
    compressed: true,
    maxDuration: 60,
    camera: "back",
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return "param extension should not be empty.";
      }
      if (!extension)
        params.extension = [""];
    }
  }
};
const ChooseVideoProtocol = {
  sourceType: Array,
  compressed: Boolean,
  maxDuration: Number,
  camera: String,
  extension: Array
};
const API_CHOOSE_FILE = "chooseFile";
const CHOOSE_MEDIA_TYPE = [
  "all",
  "image",
  "video"
];
const ChooseFileOptions = {
  formatArgs: {
    count(count, params) {
      if (!count || count <= 0) {
        params.count = 100;
      }
    },
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
    },
    type(type, params) {
      params.type = elemInArray(type, CHOOSE_MEDIA_TYPE);
    },
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return "param extension should not be empty.";
      }
      if (!extension)
        params.extension = [""];
    }
  }
};
const ChooseFileProtocol = {
  count: Number,
  sourceType: Array,
  type: String,
  extension: Array
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
const API_GET_VIDEO_INFO = "getVideoInfo";
const GetVideoInfoOptions = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src);
    }
  }
};
const GetVideoInfoProtocol = {
  src: {
    type: String,
    required: true
  }
};
const API_REQUEST = "request";
const dataType = {
  JSON: "json"
};
const RESPONSE_TYPE = ["text", "arraybuffer"];
const DEFAULT_RESPONSE_TYPE = "text";
const encode = encodeURIComponent;
function stringifyQuery(url, data) {
  let str = url.split("#");
  const hash = str[1] || "";
  str = str[0].split("?");
  let query = str[1] || "";
  url = str[0];
  const search = query.split("&").filter((item) => item);
  const params = {};
  search.forEach((item) => {
    const part = item.split("=");
    params[part[0]] = part[1];
  });
  for (const key in data) {
    if (hasOwn(data, key)) {
      let v2 = data[key];
      if (typeof v2 === "undefined" || v2 === null) {
        v2 = "";
      } else if (isPlainObject(v2)) {
        v2 = JSON.stringify(v2);
      }
      params[encode(key)] = encode(v2);
    }
  }
  query = Object.keys(params).map((item) => `${item}=${params[item]}`).join("&");
  return url + (query ? "?" + query : "") + (hash ? "#" + hash : "");
}
const RequestProtocol = {
  method: String,
  data: [Object, String, Array, ArrayBuffer],
  url: {
    type: String,
    required: true
  },
  header: Object,
  dataType: String,
  responseType: String,
  withCredentials: Boolean
};
const RequestOptions = {
  formatArgs: {
    method(value, params) {
      params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
    },
    data(value, params) {
      params.data = value || "";
    },
    url(value, params) {
      if (params.method === HTTP_METHODS[0] && isPlainObject(params.data) && Object.keys(params.data).length) {
        params.url = stringifyQuery(value, params.data);
      }
    },
    header(value, params) {
      const header = params.header = value || {};
      if (params.method !== HTTP_METHODS[0]) {
        if (!Object.keys(header).find((key) => key.toLowerCase() === "content-type")) {
          header["Content-Type"] = "application/json";
        }
      }
    },
    dataType(value, params) {
      params.dataType = (value || dataType.JSON).toLowerCase();
    },
    responseType(value, params) {
      params.responseType = (value || "").toLowerCase();
      if (RESPONSE_TYPE.indexOf(params.responseType) === -1) {
        params.responseType = DEFAULT_RESPONSE_TYPE;
      }
    }
  }
};
const API_DOWNLOAD_FILE = "downloadFile";
const DownloadFileOptions = {
  formatArgs: {
    header(value, params) {
      params.header = value || {};
    }
  }
};
const DownloadFileProtocol = {
  url: {
    type: String,
    required: true
  },
  header: Object,
  timeout: Number
};
const API_UPLOAD_FILE = "uploadFile";
const UploadFileOptions = {
  formatArgs: {
    filePath(filePath, params) {
      if (filePath) {
        params.filePath = getRealPath(filePath);
      }
    },
    header(value, params) {
      params.header = value || {};
    },
    formData(value, params) {
      params.formData = value || {};
    }
  }
};
const UploadFileProtocol = {
  url: {
    type: String,
    required: true
  },
  files: Array,
  filePath: String,
  name: String,
  header: Object,
  formData: Object,
  timeout: Number
};
const API_CONNECT_SOCKET = "connectSocket";
const ConnectSocketOptions = {
  formatArgs: {
    header(value, params) {
      params.header = value || {};
    },
    method(value, params) {
      params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
    },
    protocols(protocols, params) {
      if (typeof protocols === "string") {
        params.protocols = [protocols];
      }
    }
  }
};
const ConnectSocketProtocol = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object
  },
  method: String,
  protocols: [Array, String]
};
const API_SEND_SOCKET_MESSAGE = "sendSocketMessage";
const SendSocketMessageProtocol = {
  data: [String, ArrayBuffer]
};
const API_CLOSE_SOCKET = "closeSocket";
const CloseSocketProtocol = {
  code: Number,
  reason: String
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
const NavigateToProtocol = /* @__PURE__ */ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
const NavigateBackProtocol = /* @__PURE__ */ extend({
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
    delta(value, params) {
      value = parseInt(value + "") || 1;
      params.delta = Math.min(getCurrentPages().length - 1, value);
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
    if (!url) {
      return `Missing required args: "url"`;
    }
    url = getRealRoute(url);
    const pagePath = url.split("?")[0];
    const routeOptions = __uniRoutes.find(({path, alias}) => path === pagePath || alias === pagePath);
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
      url = url.replace(routeOptions.alias, "/");
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
const API_HIDE_LOADING = "hideLoading";
const API_HIDE_TOAST = "hideToast";
const API_LOAD_FONT_FACE = "loadFontFace";
const LoadFontFaceProtocol = {
  family: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  desc: Object
};
const FRONT_COLORS = ["#ffffff", "#000000"];
const API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
const SetNavigationBarColorOptions = {
  formatArgs: {
    animation(animation, params) {
      if (!animation) {
        animation = {duration: 0, timingFunc: "linear"};
      }
      params.animation = {
        duration: animation.duration || 0,
        timingFunc: animation.timingFunc || "linear"
      };
    }
  }
};
const SetNavigationBarColorProtocol = {
  frontColor: {
    type: String,
    required: true,
    validator(frontColor) {
      if (FRONT_COLORS.indexOf(frontColor) === -1) {
        return `invalid frontColor "${frontColor}"`;
      }
    }
  },
  backgroundColor: {
    type: String,
    required: true
  },
  animation: Object
};
const API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
const SetNavigationBarTitleProtocol = {
  title: {
    type: String,
    required: true
  }
};
const API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
const API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
const API_PAGE_SCROLL_TO = "pageScrollTo";
const PageScrollToProtocol = {
  scrollTop: Number,
  selector: String,
  duration: Number
};
const DEFAULT_DURATION = 300;
const PageScrollToOptions = {
  formatArgs: {
    duration(value, params) {
      params.duration = Math.max(0, parseInt(value + "") || DEFAULT_DURATION);
    }
  }
};
const API_SHOW_LOADING = "showLoading";
const ShowLoadingProtocol = {
  title: String,
  mask: Boolean
};
const ShowLoadingOptions = {
  formatArgs: {
    title: "",
    mask: false
  }
};
const API_SHOW_MODAL = "showModal";
const ShowModalProtocol = {
  title: String,
  content: String,
  showCancel: Boolean,
  cancelText: String,
  cancelColor: String,
  confirmText: String,
  confirmColor: String
};
const ShowModalOptions = {
  beforeInvoke() {
    initI18nShowModalMsgsOnce();
  },
  formatArgs: {
    title: "",
    content: "",
    showCancel: true,
    cancelText(_value, params) {
      if (!hasOwn(params, "cancelText")) {
        const {t: t2} = useI18n();
        params.cancelText = t2("uni.showModal.cancel");
      }
    },
    cancelColor: "#000",
    confirmText(_value, params) {
      if (!hasOwn(params, "confirmText")) {
        const {t: t2} = useI18n();
        params.confirmText = t2("uni.showModal.confirm");
      }
    },
    confirmColor: PRIMARY_COLOR
  }
};
const API_SHOW_TOAST = "showToast";
const SHOW_TOAST_ICON = [
  "success",
  "loading",
  "none"
];
const ShowToastProtocol = {
  title: String,
  icon: String,
  image: String,
  duration: Number,
  mask: Boolean
};
const ShowToastOptions = {
  formatArgs: {
    title: "",
    icon(type, params) {
      params.icon = elemInArray(type, SHOW_TOAST_ICON);
    },
    image(value, params) {
      if (value) {
        params.image = getRealPath(value);
      } else {
        params.image = "";
      }
    },
    duration: 1500,
    mask: false
  }
};
const API_START_PULL_DOWN_REFRESH = "startPullDownRefresh";
const API_STOP_PULL_DOWN_REFRESH = "stopPullDownRefresh";
const IndexProtocol = {
  index: {
    type: Number,
    required: true
  }
};
const IndexOptions = {
  beforeInvoke() {
    const pageMeta = getCurrentPageMeta();
    if (pageMeta && !pageMeta.isTabBar) {
      return "not TabBar page";
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar.list[value]) {
        return "tabbar item not found";
      }
    }
  }
};
const API_SET_TAB_BAR_ITEM = "setTabBarItem";
const SetTabBarItemProtocol = /* @__PURE__ */ extend({
  text: String,
  iconPath: String,
  selectedIconPath: String,
  pagePath: String
}, IndexProtocol);
const SetTabBarItemOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    pagePath(value, params) {
      if (value) {
        params.pagePath = removeLeadingSlash(value);
      }
    }
  }, IndexOptions.formatArgs)
};
const API_SET_TAB_BAR_STYLE = "setTabBarStyle";
const SetTabBarStyleProtocol = {
  color: String,
  selectedColor: String,
  backgroundColor: String,
  backgroundImage: String,
  backgroundRepeat: String,
  borderStyle: String
};
const GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/;
const SetTabBarStyleOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: {
    backgroundImage(value, params) {
      if (value && !GRADIENT_RE.test(value)) {
        params.backgroundImage = getRealPath(value);
      }
    },
    borderStyle(value, params) {
      if (value) {
        params.borderStyle = value === "white" ? "white" : "black";
      }
    }
  }
};
const API_HIDE_TAB_BAR = "hideTabBar";
const HideTabBarProtocol = {
  animation: Boolean
};
const API_SHOW_TAB_BAR = "showTabBar";
const ShowTabBarProtocol = HideTabBarProtocol;
const API_HIDE_TAB_BAR_RED_DOT = "hideTabBarRedDot";
const HideTabBarRedDotProtocol = IndexProtocol;
const HideTabBarRedDotOptions = IndexOptions;
const API_SHOW_TAB_BAR_RED_DOT = "showTabBarRedDot";
const ShowTabBarRedDotProtocol = IndexProtocol;
const ShowTabBarRedDotOptions = IndexOptions;
const API_REMOVE_TAB_BAR_BADGE = "removeTabBarBadge";
const RemoveTabBarBadgeProtocol = IndexProtocol;
const RemoveTabBarBadgeOptions = IndexOptions;
const API_SET_TAB_BAR_BADGE = "setTabBarBadge";
const SetTabBarBadgeProtocol = /* @__PURE__ */ extend({
  text: {
    type: String,
    required: true
  }
}, IndexProtocol);
const SetTabBarBadgeOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    text(value, params) {
      if (getLen(value) >= 4) {
        params.text = "...";
      }
    }
  }, IndexOptions.formatArgs)
};
const initIntersectionObserverPolyfill = function() {
  if (typeof window !== "object") {
    return;
  }
  if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
        get: function() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return;
  }
  function getFrameElement(doc) {
    try {
      return doc.defaultView && doc.defaultView.frameElement || null;
    } catch (e2) {
      return null;
    }
  }
  var document2 = function(startDoc) {
    var doc = startDoc;
    var frame = getFrameElement(doc);
    while (frame) {
      doc = frame.ownerDocument;
      frame = getFrameElement(doc);
    }
    return doc;
  }(window.document);
  var registry = [];
  var crossOriginUpdater = null;
  var crossOriginRect = null;
  function IntersectionObserverEntry(entry) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = ensureDOMRect(entry.rootBounds);
    this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
    this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
    this.isIntersecting = !!entry.intersectionRect;
    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height;
    if (targetArea) {
      this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
    } else {
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }
  function IntersectionObserver2(callback2, opt_options) {
    var options = opt_options || {};
    if (typeof callback2 != "function") {
      throw new Error("callback must be a function");
    }
    if (options.root && options.root.nodeType != 1 && options.root.nodeType != 9) {
      throw new Error("root must be a Document or Element");
    }
    this._checkForIntersections = throttle2(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
    this._callback = callback2;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin);
    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function(margin) {
      return margin.value + margin.unit;
    }).join(" ");
    this._monitoringDocuments = [];
    this._monitoringUnsubscribes = [];
  }
  IntersectionObserver2.prototype.THROTTLE_TIMEOUT = 100;
  IntersectionObserver2.prototype.POLL_INTERVAL = null;
  IntersectionObserver2.prototype.USE_MUTATION_OBSERVER = true;
  IntersectionObserver2._setupCrossOriginUpdater = function() {
    if (!crossOriginUpdater) {
      crossOriginUpdater = function(boundingClientRect, intersectionRect) {
        if (!boundingClientRect || !intersectionRect) {
          crossOriginRect = getEmptyRect();
        } else {
          crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
        }
        registry.forEach(function(observer) {
          observer._checkForIntersections();
        });
      };
    }
    return crossOriginUpdater;
  };
  IntersectionObserver2._resetCrossOriginUpdater = function() {
    crossOriginUpdater = null;
    crossOriginRect = null;
  };
  IntersectionObserver2.prototype.observe = function(target) {
    var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
      return item.element == target;
    });
    if (isTargetAlreadyObserved) {
      return;
    }
    if (!(target && target.nodeType == 1)) {
      throw new Error("target must be an Element");
    }
    this._registerInstance();
    this._observationTargets.push({element: target, entry: null});
    this._monitorIntersections(target.ownerDocument);
    this._checkForIntersections();
  };
  IntersectionObserver2.prototype.unobserve = function(target) {
    this._observationTargets = this._observationTargets.filter(function(item) {
      return item.element != target;
    });
    this._unmonitorIntersections(target.ownerDocument);
    if (this._observationTargets.length == 0) {
      this._unregisterInstance();
    }
  };
  IntersectionObserver2.prototype.disconnect = function() {
    this._observationTargets = [];
    this._unmonitorAllIntersections();
    this._unregisterInstance();
  };
  IntersectionObserver2.prototype.takeRecords = function() {
    var records = this._queuedEntries.slice();
    this._queuedEntries = [];
    return records;
  };
  IntersectionObserver2.prototype._initThresholds = function(opt_threshold) {
    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold))
      threshold = [threshold];
    return threshold.sort().filter(function(t2, i2, a2) {
      if (typeof t2 != "number" || isNaN(t2) || t2 < 0 || t2 > 1) {
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      }
      return t2 !== a2[i2 - 1];
    });
  };
  IntersectionObserver2.prototype._parseRootMargin = function(opt_rootMargin) {
    var marginString = opt_rootMargin || "0px";
    var margins = marginString.split(/\s+/).map(function(margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
      if (!parts) {
        throw new Error("rootMargin must be specified in pixels or percent");
      }
      return {value: parseFloat(parts[1]), unit: parts[2]};
    });
    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];
    return margins;
  };
  IntersectionObserver2.prototype._monitorIntersections = function(doc) {
    var win = doc.defaultView;
    if (!win) {
      return;
    }
    if (this._monitoringDocuments.indexOf(doc) != -1) {
      return;
    }
    var callback2 = this._checkForIntersections;
    var monitoringInterval = null;
    var domObserver = null;
    if (this.POLL_INTERVAL) {
      monitoringInterval = win.setInterval(callback2, this.POLL_INTERVAL);
    } else {
      addEvent(win, "resize", callback2, true);
      addEvent(doc, "scroll", callback2, true);
      if (this.USE_MUTATION_OBSERVER && "MutationObserver" in win) {
        domObserver = new win.MutationObserver(callback2);
        domObserver.observe(doc, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
    this._monitoringDocuments.push(doc);
    this._monitoringUnsubscribes.push(function() {
      var win2 = doc.defaultView;
      if (win2) {
        if (monitoringInterval) {
          win2.clearInterval(monitoringInterval);
        }
        removeEvent(win2, "resize", callback2, true);
      }
      removeEvent(doc, "scroll", callback2, true);
      if (domObserver) {
        domObserver.disconnect();
      }
    });
    var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
    if (doc != rootDoc) {
      var frame = getFrameElement(doc);
      if (frame) {
        this._monitorIntersections(frame.ownerDocument);
      }
    }
  };
  IntersectionObserver2.prototype._unmonitorIntersections = function(doc) {
    var index2 = this._monitoringDocuments.indexOf(doc);
    if (index2 == -1) {
      return;
    }
    var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
    var hasDependentTargets = this._observationTargets.some(function(item) {
      var itemDoc = item.element.ownerDocument;
      if (itemDoc == doc) {
        return true;
      }
      while (itemDoc && itemDoc != rootDoc) {
        var frame2 = getFrameElement(itemDoc);
        itemDoc = frame2 && frame2.ownerDocument;
        if (itemDoc == doc) {
          return true;
        }
      }
      return false;
    });
    if (hasDependentTargets) {
      return;
    }
    var unsubscribe = this._monitoringUnsubscribes[index2];
    this._monitoringDocuments.splice(index2, 1);
    this._monitoringUnsubscribes.splice(index2, 1);
    unsubscribe();
    if (doc != rootDoc) {
      var frame = getFrameElement(doc);
      if (frame) {
        this._unmonitorIntersections(frame.ownerDocument);
      }
    }
  };
  IntersectionObserver2.prototype._unmonitorAllIntersections = function() {
    var unsubscribes = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0;
    this._monitoringUnsubscribes.length = 0;
    for (var i2 = 0; i2 < unsubscribes.length; i2++) {
      unsubscribes[i2]();
    }
  };
  IntersectionObserver2.prototype._checkForIntersections = function() {
    if (!this.root && crossOriginUpdater && !crossOriginRect) {
      return;
    }
    var rootIsInDom = this._rootIsInDom();
    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
    this._observationTargets.forEach(function(item) {
      var target = item.element;
      var targetRect = getBoundingClientRect(target);
      var rootContainsTarget = this._rootContainsTarget(target);
      var oldEntry = item.entry;
      var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);
      var rootBounds = null;
      if (!this._rootContainsTarget(target)) {
        rootBounds = getEmptyRect();
      } else if (!crossOriginUpdater || this.root) {
        rootBounds = rootRect;
      }
      var newEntry = item.entry = new IntersectionObserverEntry({
        time: now(),
        target,
        boundingClientRect: targetRect,
        rootBounds,
        intersectionRect
      });
      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }, this);
    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };
  IntersectionObserver2.prototype._computeTargetAndRootIntersection = function(target, targetRect, rootRect) {
    if (window.getComputedStyle(target).display == "none")
      return;
    var intersectionRect = targetRect;
    var parent = getParentNode(target);
    var atRoot = false;
    while (!atRoot && parent) {
      var parentRect = null;
      var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
      if (parentComputedStyle.display == "none")
        return null;
      if (parent == this.root || parent.nodeType == 9) {
        atRoot = true;
        if (parent == this.root || parent == document2) {
          if (crossOriginUpdater && !this.root) {
            if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
              parent = null;
              parentRect = null;
              intersectionRect = null;
            } else {
              parentRect = crossOriginRect;
            }
          } else {
            parentRect = rootRect;
          }
        } else {
          var frame = getParentNode(parent);
          var frameRect = frame && getBoundingClientRect(frame);
          var frameIntersect = frame && this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
          if (frameRect && frameIntersect) {
            parent = frame;
            parentRect = convertFromParentRect(frameRect, frameIntersect);
          } else {
            parent = null;
            intersectionRect = null;
          }
        }
      } else {
        var doc = parent.ownerDocument;
        if (parent != doc.body && parent != doc.documentElement && parentComputedStyle.overflow != "visible") {
          parentRect = getBoundingClientRect(parent);
        }
      }
      if (parentRect) {
        intersectionRect = computeRectIntersection(parentRect, intersectionRect);
      }
      if (!intersectionRect)
        break;
      parent = parent && getParentNode(parent);
    }
    return intersectionRect;
  };
  IntersectionObserver2.prototype._getRootRect = function() {
    var rootRect;
    if (this.root && !isDoc(this.root)) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      var doc = isDoc(this.root) ? this.root : document2;
      var html = doc.documentElement;
      var body = doc.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }
    return this._expandRectByRootMargin(rootRect);
  };
  IntersectionObserver2.prototype._expandRectByRootMargin = function(rect) {
    var margins = this._rootMarginValues.map(function(margin, i2) {
      return margin.unit == "px" ? margin.value : margin.value * (i2 % 2 ? rect.width : rect.height) / 100;
    });
    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;
    return newRect;
  };
  IntersectionObserver2.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
    var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
    var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
    if (oldRatio === newRatio)
      return;
    for (var i2 = 0; i2 < this.thresholds.length; i2++) {
      var threshold = this.thresholds[i2];
      if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
        return true;
      }
    }
  };
  IntersectionObserver2.prototype._rootIsInDom = function() {
    return !this.root || containsDeep(document2, this.root);
  };
  IntersectionObserver2.prototype._rootContainsTarget = function(target) {
    var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
    return containsDeep(rootDoc, target) && (!this.root || rootDoc == target.ownerDocument);
  };
  IntersectionObserver2.prototype._registerInstance = function() {
    if (registry.indexOf(this) < 0) {
      registry.push(this);
    }
  };
  IntersectionObserver2.prototype._unregisterInstance = function() {
    var index2 = registry.indexOf(this);
    if (index2 != -1)
      registry.splice(index2, 1);
  };
  function now() {
    return window.performance && performance.now && performance.now();
  }
  function throttle2(fn, timeout) {
    var timer = null;
    return function() {
      if (!timer) {
        timer = setTimeout(function() {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }
  function addEvent(node, event, fn, opt_useCapture) {
    if (typeof node.addEventListener == "function") {
      node.addEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.attachEvent == "function") {
      node.attachEvent("on" + event, fn);
    }
  }
  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == "function") {
      node.removeEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.detatchEvent == "function") {
      node.detatchEvent("on" + event, fn);
    }
  }
  function computeRectIntersection(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;
    return width >= 0 && height >= 0 && {
      top,
      bottom,
      left,
      right,
      width,
      height
    } || null;
  }
  function getBoundingClientRect(el) {
    var rect;
    try {
      rect = el.getBoundingClientRect();
    } catch (err) {
    }
    if (!rect)
      return getEmptyRect();
    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }
    return rect;
  }
  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  function ensureDOMRect(rect) {
    if (!rect || "x" in rect) {
      return rect;
    }
    return {
      top: rect.top,
      y: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  }
  function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
    var top = parentIntersectionRect.top - parentBoundingRect.top;
    var left = parentIntersectionRect.left - parentBoundingRect.left;
    return {
      top,
      left,
      height: parentIntersectionRect.height,
      width: parentIntersectionRect.width,
      bottom: top + parentIntersectionRect.height,
      right: left + parentIntersectionRect.width
    };
  }
  function containsDeep(parent, child) {
    var node = child;
    while (node) {
      if (node == parent)
        return true;
      node = getParentNode(node);
    }
    return false;
  }
  function getParentNode(node) {
    var parent = node.parentNode;
    if (node.nodeType == 9 && node != document2) {
      return getFrameElement(node);
    }
    if (parent && parent.assignedSlot) {
      parent = parent.assignedSlot.parentNode;
    }
    if (parent && parent.nodeType == 11 && parent.host) {
      return parent.host;
    }
    return parent;
  }
  function isDoc(node) {
    return node && node.nodeType === 9;
  }
  window.IntersectionObserver = IntersectionObserver2;
  window.IntersectionObserverEntry = IntersectionObserverEntry;
};
function normalizeRect(rect) {
  const {bottom, height, left, right, top, width} = rect || {};
  return {
    bottom,
    height,
    left,
    right,
    top,
    width
  };
}
function requestComponentObserver($el, options, callback2) {
  initIntersectionObserverPolyfill();
  const root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
  const intersectionObserver = new IntersectionObserver((entries2) => {
    entries2.forEach((entrie) => {
      callback2({
        intersectionRatio: entrie.intersectionRatio,
        intersectionRect: normalizeRect(entrie.intersectionRect),
        boundingClientRect: normalizeRect(entrie.boundingClientRect),
        relativeRect: normalizeRect(entrie.rootBounds),
        time: Date.now()
      });
    });
  }, {
    root,
    rootMargin: options.rootMargin,
    threshold: options.thresholds
  });
  if (options.observeAll) {
    intersectionObserver.USE_MUTATION_OBSERVER = true;
    const nodeList = $el.querySelectorAll(options.selector);
    for (let i2 = 0; i2 < nodeList.length; i2++) {
      intersectionObserver.observe(nodeList[i2]);
    }
  } else {
    intersectionObserver.USE_MUTATION_OBSERVER = false;
    const el = $el.querySelector(options.selector);
    if (!el) {
      console.warn(`Node ${options.selector} is not found. Intersection observer will not trigger.`);
    } else {
      intersectionObserver.observe(el);
    }
  }
  return intersectionObserver;
}
const supports = window.CSS && window.CSS.supports;
function cssSupports(css) {
  return supports && (supports(css) || supports.apply(window.CSS, css.split(":")));
}
const cssVar = /* @__PURE__ */ cssSupports("--a:0");
const cssEnv = /* @__PURE__ */ cssSupports("top:env(a)");
const cssConstant = /* @__PURE__ */ cssSupports("top:constant(a)");
const cssBackdropFilter = /* @__PURE__ */ cssSupports("backdrop-filter:blur(10px)");
const SCHEMA_CSS = {
  "css.var": cssVar,
  "css.env": cssEnv,
  "css.constant": cssConstant,
  "css.backdrop-filter": cssBackdropFilter
};
const canIUse = defineSyncApi(API_CAN_I_USE, (schema) => {
  if (hasOwn(SCHEMA_CSS, schema)) {
    return SCHEMA_CSS[schema];
  }
  return true;
}, CanIUseProtocol);
const envMethod = /* @__PURE__ */ (() => cssEnv ? "env" : cssConstant ? "constant" : "")();
function updateCurPageCssVar(pageMeta) {
  let windowTopValue = 0;
  let windowBottomValue = 0;
  if (__UNI_FEATURE_NAVIGATIONBAR__ && ["default", "float"].indexOf(pageMeta.navigationBar.type) > -1) {
    windowTopValue = NAVBAR_HEIGHT;
  }
  if (__UNI_FEATURE_TABBAR__ && pageMeta.isTabBar) {
    const tabBar2 = useTabBar();
    tabBar2.shown && (windowBottomValue = parseInt(tabBar2.height));
  }
  updatePageCssVar({
    "--window-top": normalizeWindowBottom(windowTopValue),
    "--window-bottom": normalizeWindowBottom(windowBottomValue)
  });
}
function normalizeWindowBottom(windowBottom) {
  return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
const SEP = "$$";
const currentPagesMap = new Map();
function pruneCurrentPages() {
  currentPagesMap.forEach((page, id2) => {
    if (page.$.isUnmounted) {
      currentPagesMap.delete(id2);
    }
  });
}
function getCurrentPagesMap() {
  return currentPagesMap;
}
function getCurrentPages$1() {
  const curPages = [];
  const pages = currentPagesMap.values();
  for (const page of pages) {
    if (page.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page);
      }
    } else {
      curPages.push(page);
    }
  }
  return curPages;
}
function removeRouteCache(routeKey) {
  const vnode = pageCacheMap.get(routeKey);
  if (vnode) {
    pageCacheMap.delete(routeKey);
    routeCache.pruneCacheEntry(vnode);
  }
}
function removePage(routeKey, removeRouteCaches = true) {
  const pageVm = currentPagesMap.get(routeKey);
  pageVm.$.__isUnload = true;
  invokeHook(pageVm, "onUnload");
  currentPagesMap.delete(routeKey);
  removeRouteCaches && removeRouteCache(routeKey);
}
let id = /* @__PURE__ */ (() => history.state && history.state.__id__ || 1)();
function createPageState(type, __id__) {
  return {
    __id__: __id__ || ++id,
    __type__: type
  };
}
function initPublicPage(route) {
  const meta = usePageMeta();
  if (!__UNI_FEATURE_PAGES__) {
    const {path: path2, alias} = __uniRoutes[0];
    return {
      id: meta.id,
      path: path2,
      route: alias.substr(1),
      fullPath: path2,
      options: {},
      meta
    };
  }
  const {path} = route;
  return {
    id: meta.id,
    path,
    route: route.meta.route,
    fullPath: route.meta.isEntry ? route.meta.pagePath : route.fullPath,
    options: {},
    meta
  };
}
function initPage(vm) {
  const route = vm.$route;
  const page = initPublicPage(route);
  vm.$vm = vm;
  vm.$page = page;
  vm.__isTabBar = page.meta.isTabBar;
  currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
}
function normalizeRouteKey(path, id2) {
  return path + SEP + id2;
}
function useKeepAliveRoute() {
  const route = useRoute();
  const routeKey = computed(() => normalizeRouteKey(route.path, history.state.__id__ || 1));
  const isTabBar = computed(() => route.meta.isTabBar);
  return {
    routeKey,
    isTabBar,
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
    const vnode = pageCacheMap.get(key);
    if (!vnode) {
      return;
    }
    pageCacheMap.delete(key);
  },
  forEach(fn) {
    pageCacheMap.forEach(fn);
  }
};
function isTabBarVNode(vnode) {
  return vnode.props.type === "tabBar";
}
function pruneRouteCache(key) {
  const pageId = parseInt(key.split(SEP)[1]);
  if (!pageId) {
    return;
  }
  routeCache.forEach((vnode, key2) => {
    const cPageId = parseInt(key2.split(SEP)[1]);
    if (cPageId && cPageId > pageId) {
      if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) {
        return;
      }
      routeCache.delete(key2);
      routeCache.pruneCacheEntry(vnode);
      nextTick(() => pruneCurrentPages());
    }
  });
}
function onPageShow(instance2, pageMeta) {
  updateBodyScopeId(instance2);
  updateCurPageCssVar(pageMeta);
  initPageScrollListener(instance2, pageMeta);
}
function onPageReady(instance2) {
  const scopeId = getScopeId(instance2);
  scopeId && updateCurPageBodyScopeId(scopeId);
}
function updateCurPageBodyScopeId(scopeId) {
  const pageBodyEl = document.querySelector("uni-page-body");
  if (pageBodyEl) {
    pageBodyEl.setAttribute(scopeId, "");
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("uni-page-body not found");
  }
}
function getScopeId(instance2) {
  return instance2.type.__scopeId;
}
let curScopeId;
function updateBodyScopeId(instance2) {
  const scopeId = getScopeId(instance2);
  const {body} = document;
  curScopeId && body.removeAttribute(curScopeId);
  scopeId && body.setAttribute(scopeId, "");
  curScopeId = scopeId;
}
let curScrollListener;
function initPageScrollListener(instance2, pageMeta) {
  document.removeEventListener("touchmove", disableScrollListener);
  if (curScrollListener) {
    document.removeEventListener("scroll", curScrollListener);
  }
  if (pageMeta.disableScroll) {
    return document.addEventListener("touchmove", disableScrollListener);
  }
  const {onPageScroll, onReachBottom} = instance2;
  const navigationBarTransparent = pageMeta.navigationBar.type === "transparent";
  if (!onPageScroll && !onReachBottom && !navigationBarTransparent) {
    return;
  }
  const opts = {};
  const pageId = instance2.proxy.$page.id;
  if (onPageScroll || navigationBarTransparent) {
    opts.onPageScroll = createOnPageScroll(pageId, onPageScroll, navigationBarTransparent);
  }
  if (onReachBottom) {
    opts.onReachBottomDistance = pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE;
    opts.onReachBottom = () => UniViewJSBridge.publishHandler("onReachBottom", {}, pageId);
  }
  curScrollListener = createScrollListener(opts);
  requestAnimationFrame(() => document.addEventListener("scroll", curScrollListener));
}
function createOnPageScroll(pageId, onPageScroll, navigationBarTransparent) {
  return (scrollTop) => {
    if (onPageScroll) {
      UniViewJSBridge.publishHandler("onPageScroll", {scrollTop}, pageId);
    }
    if (navigationBarTransparent) {
      UniViewJSBridge.emit(pageId + ".onPageScroll", {
        scrollTop
      });
    }
  };
}
function initRouter(app) {
  const router = createRouter(createRouterOptions());
  app.router = router;
  app.use(router);
}
const scrollBehavior = (_to, _from, savedPosition) => {
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
function removeCurrentPages(delta = 1) {
  const keys = getCurrentPages$1();
  const start = keys.length - 1;
  const end = start - delta;
  for (let i2 = start; i2 > end; i2--) {
    const page = keys[i2].$page;
    removePage(normalizeRouteKey(page.path, page.id), false);
  }
}
function initHistory() {
  const history2 = __UNI_FEATURE_ROUTER_MODE__ === "history" ? createWebHistory() : createWebHashHistory();
  history2.listen((_to, _from, info) => {
    if (info.direction === "back") {
      removeCurrentPages(Math.abs(info.delta));
    }
  });
  return history2;
}
var index$m = {
  install(app) {
    initApp$1(app);
    initView(app);
    initService(app);
    if (__UNI_FEATURE_PAGES__) {
      initRouter(app);
    }
  }
};
let appVm;
function getApp$1() {
  return appVm;
}
function initApp(vm) {
  appVm = vm;
  appVm.$vm = vm;
  appVm.globalData = appVm.$options.globalData || {};
}
function wrapperComponentSetup(comp, {init: init2, setup, after}) {
  const oldSetup = comp.setup;
  comp.setup = (props2, ctx) => {
    const instance2 = getCurrentInstance();
    init2(instance2.proxy);
    const query = setup(instance2);
    if (oldSetup) {
      return oldSetup(query, ctx);
    }
  };
  after && after(comp);
}
function setupComponent(comp, options) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
    wrapperComponentSetup(comp.default, options);
  } else {
    wrapperComponentSetup(comp, options);
  }
  return comp;
}
function setupPage(comp) {
  return setupComponent(comp, {
    init: initPage,
    setup(instance2) {
      instance2.__isPage = true;
      instance2.root = instance2;
      const route = usePageRoute();
      if (route.meta.isTabBar) {
        instance2.__isActive = true;
      }
      const pageMeta = usePageMeta();
      onBeforeMount(() => {
        onPageShow(instance2, pageMeta);
        const {onLoad, onShow} = instance2;
        onLoad && invokeArrayFns$1(onLoad, decodedQuery(route.query));
        instance2.__isVisible = true;
        onShow && invokeArrayFns$1(onShow);
      });
      onMounted(() => {
        onPageReady(instance2);
        const {onReady} = instance2;
        onReady && invokeArrayFns$1(onReady);
      });
      onBeforeActivate(() => {
        if (!instance2.__isVisible) {
          onPageShow(instance2, pageMeta);
          instance2.__isVisible = true;
          const {onShow} = instance2;
          onShow && invokeArrayFns$1(onShow);
        }
      });
      onBeforeDeactivate(() => {
        if (instance2.__isVisible && !instance2.__isUnload) {
          instance2.__isVisible = false;
          const {onHide} = instance2;
          onHide && invokeArrayFns$1(onHide);
        }
      });
      return route.query;
    }
  });
}
function setupApp(comp) {
  return setupComponent(comp, {
    init: initApp,
    setup(instance2) {
      const route = usePageRoute();
      const onLaunch = () => {
        const {onLaunch: onLaunch2, onShow} = instance2;
        const path = route.path.substr(1);
        const launchOptions = {
          path: path || __uniRoutes[0].meta.route,
          query: decodedQuery(route.query),
          scene: 1001
        };
        onLaunch2 && invokeArrayFns$1(onLaunch2, launchOptions);
        onShow && invokeArrayFns$1(onShow, launchOptions);
      };
      if (__UNI_FEATURE_PAGES__) {
        useRouter().isReady().then(onLaunch);
      } else {
        onBeforeMount(onLaunch);
      }
      onMounted(() => {
        document.addEventListener("visibilitychange", function() {
          if (document.visibilityState === "visible") {
            UniServiceJSBridge.emit("onAppEnterForeground");
          } else {
            UniServiceJSBridge.emit("onAppEnterBackground");
          }
        });
      });
      return route.query;
    },
    after(comp2) {
      comp2.mpType = "app";
      comp2.render = () => (openBlock(), createBlock(LayoutComponent));
    }
  });
}
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
    _toggleListeners(type, id2, watch2) {
      if (watch2 && !id2) {
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
function throttle(fn, wait) {
  let last = 0;
  let timeout;
  let waitCallback;
  const newFn = function(...arg) {
    const now = Date.now();
    clearTimeout(timeout);
    waitCallback = () => {
      waitCallback = null;
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
    waitCallback = null;
  };
  newFn.flush = function() {
    clearTimeout(timeout);
    waitCallback && waitCallback();
  };
  return newFn;
}
const _sfc_main$9 = {
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
const _hoisted_1$6 = {class: "uni-audio-default"};
const _hoisted_2$3 = {class: "uni-audio-right"};
const _hoisted_3$2 = {class: "uni-audio-time"};
const _hoisted_4$2 = {class: "uni-audio-info"};
const _hoisted_5$1 = {class: "uni-audio-name"};
const _hoisted_6$1 = {class: "uni-audio-author"};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-audio", mergeProps({
    id: $props.id,
    controls: !!$props.controls
  }, _ctx.$attrs), [
    createVNode("audio", {
      ref: "audio",
      loop: $props.loop,
      style: {display: "none"}
    }, null, 8, ["loop"]),
    createVNode("div", _hoisted_1$6, [
      createVNode("div", {
        style: "background-image: url(" + _ctx.$getRealPath($props.poster) + ");",
        class: "uni-audio-left"
      }, [
        createVNode("div", {
          class: [{play: !$data.playing, pause: $data.playing}, "uni-audio-button"],
          onClick: _cache[1] || (_cache[1] = (...args) => $options.trigger && $options.trigger(...args))
        }, null, 2)
      ], 4),
      createVNode("div", _hoisted_2$3, [
        createVNode("div", _hoisted_3$2, toDisplayString($data.currentTime), 1),
        createVNode("div", _hoisted_4$2, [
          createVNode("div", _hoisted_5$1, toDisplayString($props.name), 1),
          createVNode("div", _hoisted_6$1, toDisplayString($props.author), 1)
        ])
      ])
    ])
  ], 16, ["id", "controls"]);
}
_sfc_main$9.render = _sfc_render$9;
const hoverProps = {
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
};
function useHover(props2) {
  const hovering = ref(false);
  let hoverTouch = false;
  let hoverStartTimer;
  let hoverStayTimer;
  function hoverReset() {
    requestAnimationFrame(() => {
      clearTimeout(hoverStayTimer);
      hoverStayTimer = setTimeout(() => {
        hovering.value = false;
      }, parseInt(props2.hoverStayTime));
    });
  }
  function onTouchstartPassive(evt) {
    if (evt._hoverPropagationStopped) {
      return;
    }
    if (!props2.hoverClass || props2.hoverClass === "none" || props2.disabled) {
      return;
    }
    if (evt.touches.length > 1) {
      return;
    }
    if (props2.hoverStopPropagation) {
      evt._hoverPropagationStopped = true;
    }
    hoverTouch = true;
    hoverStartTimer = setTimeout(() => {
      hovering.value = true;
      if (!hoverTouch) {
        hoverReset();
      }
    }, parseInt(props2.hoverStartTime));
  }
  function onTouchend() {
    hoverTouch = false;
    if (hovering.value) {
      hoverReset();
    }
  }
  function onTouchcancel() {
    hoverTouch = false;
    hovering.value = false;
    clearTimeout(hoverStartTimer);
  }
  return {
    hovering,
    binding: {
      onTouchstartPassive,
      onTouchend,
      onTouchcancel
    }
  };
}
function useBooleanAttr(props2, keys) {
  if (isString(keys)) {
    keys = [keys];
  }
  return keys.reduce((res, key) => {
    if (props2[key]) {
      res[key] = true;
    }
    return res;
  }, Object.create(null));
}
const uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
var index$l = /* @__PURE__ */ defineComponent({
  name: "Form",
  setup(_props, {
    slots,
    emit: emit2
  }) {
    provideForm(emit2);
    return () => createVNode("uni-form", null, [createVNode("span", null, [slots.default && slots.default()])]);
  }
});
function provideForm(emit2) {
  const fields = [];
  provide(uniFormKey, {
    addField(field) {
      fields.push(field);
    },
    removeField(field) {
      fields.splice(fields.indexOf(field), 1);
    },
    submit() {
      emit2("submit", {
        detail: {
          value: fields.reduce((res, field) => {
            if (field.submit) {
              const [name, value] = field.submit();
              name && (res[name] = value);
            }
            return res;
          }, Object.create(null))
        }
      });
    },
    reset() {
      fields.forEach((field) => field.reset && field.reset());
      emit2("reset");
    }
  });
  return fields;
}
var index$k = /* @__PURE__ */ defineComponent({
  name: "Button",
  props: {
    id: {
      type: String,
      default: ""
    },
    hoverClass: {
      type: String,
      default: "button-hover"
    },
    hoverStartTime: {
      type: [Number, String],
      default: 20
    },
    hoverStayTime: {
      type: [Number, String],
      default: 70
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    }
  },
  setup(props2, {
    slots
  }) {
    const uniForm = inject(uniFormKey, false);
    const {
      hovering,
      binding
    } = useHover(props2);
    useI18n();
    function onClick() {
      if (props2.disabled) {
        return;
      }
      const formType = props2.formType;
      if (formType) {
        if (!uniForm) {
          return;
        }
        if (formType === "submit") {
          uniForm.submit();
        } else if (formType === "reset") {
          uniForm.reset();
        }
        return;
      }
    }
    return () => {
      const hoverClass = props2.hoverClass;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      if (hoverClass && hoverClass !== "none") {
        return createVNode("uni-button", mergeProps({
          onClick,
          class: hovering.value ? hoverClass : ""
        }, binding, booleanAttrs), [slots.default && slots.default()], 16, ["onClick"]);
      }
      return createVNode("uni-button", mergeProps({
        onClick
      }, booleanAttrs), [slots.default && slots.default()], 16, ["onClick"]);
    };
  }
});
const pixelRatio = /* @__PURE__ */ function() {
  const canvas = document.createElement("canvas");
  canvas.height = canvas.width = 0;
  const context = canvas.getContext("2d");
  const backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}();
function wrapper(canvas) {
  canvas.width = canvas.offsetWidth * pixelRatio;
  canvas.height = canvas.offsetHeight * pixelRatio;
  canvas.getContext("2d").__hidpi__ = true;
}
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
const _sfc_main$8 = {
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
      events.forEach((event) => {
        var existing = $listeners[event];
        var eventHandler = [];
        if (existing) {
          eventHandler.push(($event) => {
            this.$trigger(event, Object.assign({}, $event, {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event.changedTouches)
            }));
          });
        }
        if (this.disableScroll && event === "touchmove") {
          eventHandler.push(this._touchmove);
        }
        $listeners[event] = eventHandler;
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
    _touchmove(event) {
      event.preventDefault();
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
const _hoisted_1$5 = {
  ref: "canvas",
  width: "300",
  height: "150"
};
const _hoisted_2$2 = {style: {position: "absolute", top: "0", left: "0", width: "100%", height: "100%", overflow: "hidden"}};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-canvas", mergeProps({
    "canvas-id": $props.canvasId,
    "disable-scroll": $props.disableScroll
  }, toHandlers($options._listeners)), [
    createVNode("canvas", _hoisted_1$5, null, 512),
    createVNode("div", _hoisted_2$2, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(_component_v_uni_resize_sensor, {
      ref: "sensor",
      onResize: $options._resize
    }, null, 8, ["onResize"])
  ], 16, ["canvas-id", "disable-scroll"]);
}
_sfc_main$8.render = _sfc_render$8;
function useListeners(props2, listeners) {
  _addListeners(props2.id, listeners);
  watch(() => props2.id, (newId, oldId) => {
    _removeListeners(oldId, listeners, true);
    _addListeners(newId, listeners, true);
  });
  onUnmounted(() => {
    _removeListeners(props2.id, listeners);
  });
}
function _addListeners(id2, listeners, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id2) {
    return;
  }
  if (!isPlainObject(listeners)) {
    return;
  }
  Object.keys(listeners).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id2}`, listeners[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge.on(name, listeners[name]);
      } else if (id2) {
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id2}`, listeners[name]);
      }
    }
  });
}
function _removeListeners(id2, listeners, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id2) {
    return;
  }
  if (!isPlainObject(listeners)) {
    return;
  }
  Object.keys(listeners).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id2}`, listeners[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge.off(name, listeners[name]);
      } else if (id2) {
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id2}`, listeners[name]);
      }
    }
  });
}
function withWebEvent(fn) {
  return fn.__wwe = true, fn;
}
function useCustomEvent(ref2, emit2) {
  return (name, evt, detail) => {
    emit2(name, normalizeCustomEvent(name, evt, ref2.value, detail || {}));
  };
}
function normalizeCustomEvent(name, domEvt, el, detail) {
  const target = normalizeTarget(el);
  return {
    type: detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail
  };
}
const uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
const props$m = {
  name: {
    type: String,
    default: ""
  }
};
var index$j = /* @__PURE__ */ defineComponent({
  name: "CheckboxGroup",
  props: props$m,
  emits: ["change"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideCheckGroup(props2, trigger);
    return () => {
      return createVNode("uni-checkbox-group", {
        ref: rootRef
      }, [slots.default && slots.default()], 512);
    };
  }
});
function useProvideCheckGroup(props2, trigger) {
  const fields = [];
  const getFieldsValue = () => fields.reduce((res, field) => {
    if (field.value.checkboxChecked) {
      res.push(field.value.value);
    }
    return res;
  }, new Array());
  provide(uniCheckGroupKey, {
    addField(field) {
      fields.push(field);
    },
    removeField(field) {
      fields.splice(fields.indexOf(field), 1);
    },
    checkboxChange($event) {
      trigger("change", $event, {
        value: getFieldsValue()
      });
    }
  });
  const uniForm = inject(uniFormKey, false);
  if (uniForm) {
    uniForm.addField({
      submit: () => {
        let data = ["", null];
        if (props2.name !== "") {
          data[0] = props2.name;
          data[1] = getFieldsValue();
        }
        return data;
      }
    });
  }
  return getFieldsValue;
}
const uniLabelKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniLabel" : "ul");
const props$l = {
  for: {
    type: String,
    default: ""
  }
};
var index$i = /* @__PURE__ */ defineComponent({
  name: "Label",
  props: props$l,
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const pageId = useCurrentPageId();
    const handlers = useProvideLabel();
    const pointer = computed(() => props2.for || slots.default && slots.default.length);
    const _onClick = withWebEvent(($event) => {
      const EventTarget = $event.target;
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
      }
      if (stopPropagation) {
        return;
      }
      if (props2.for) {
        UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props2.for, $event, true);
      } else {
        handlers.forEach((handler) => {
          handler($event, true);
        });
      }
    });
    return () => createVNode("uni-label", {
      class: {
        "uni-label-pointer": pointer
      },
      onClick: _onClick
    }, [slots.default && slots.default()], 10, ["onClick"]);
  }
});
function useProvideLabel() {
  const handlers = [];
  provide(uniLabelKey, {
    addHandler(handler) {
      handlers.push(handler);
    },
    removeHandler(handler) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
  });
  return handlers;
}
const props$k = {
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
};
var index$h = /* @__PURE__ */ defineComponent({
  name: "Checkbox",
  props: props$k,
  setup(props2, {
    slots
  }) {
    const checkboxChecked = ref(props2.checked);
    const checkboxValue = ref(props2.value);
    watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
      checkboxChecked.value = newChecked;
      checkboxValue.value = newModelValue;
    });
    const reset = () => {
      checkboxChecked.value = false;
    };
    const {
      uniCheckGroup,
      uniLabel
    } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      checkboxChecked.value = !checkboxChecked.value;
      uniCheckGroup && uniCheckGroup.checkboxChange($event);
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    useListeners(props2, {
      "label-click": _onClick
    });
    return () => {
      const {
        booleanAttrs
      } = useBooleanAttr(props2, "disabled");
      return createVNode("uni-checkbox", mergeProps(booleanAttrs, {
        onClick: _onClick
      }), [createVNode("div", {
        class: "uni-checkbox-wrapper"
      }, [createVNode("div", {
        class: ["uni-checkbox-input", {
          "uni-checkbox-input-disabled": props2.disabled
        }]
      }, [checkboxChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 2), slots.default && slots.default()])], 16, ["onClick"]);
    };
  }
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
  const field = computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value
  }));
  const formField = {
    reset
  };
  const uniCheckGroup = inject(uniCheckGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = inject(uniLabelKey, false);
  onBeforeUnmount(() => {
    uniCheckGroup && uniCheckGroup.removeField(field);
    uniForm && uniForm.removeField(formField);
  });
  return {
    uniCheckGroup,
    uniForm,
    uniLabel
  };
}
let resetTimer;
function iosHideKeyboard() {
}
const props$j = {
  cursorSpacing: {
    type: [Number, String],
    default: 0
  },
  showConfirmBar: {
    type: [Boolean, String],
    default: "auto"
  },
  adjustPosition: {
    type: [Boolean, String],
    default: true
  },
  autoBlur: {
    type: [Boolean, String],
    default: false
  }
};
const emit$1 = ["keyboardheightchange"];
function useKeyboard$1(props2, elRef, trigger) {
  function initKeyboard(el) {
    el.addEventListener("focus", () => {
      clearTimeout(resetTimer);
      document.addEventListener("click", iosHideKeyboard, false);
    });
    const onKeyboardHide = () => {
      document.removeEventListener("click", iosHideKeyboard, false);
      if (String(navigator.vendor).indexOf("Apple") === 0) {
        document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
      }
    };
    el.addEventListener("blur", () => {
      onKeyboardHide();
    });
  }
  watch(() => elRef.value, (el) => initKeyboard(el));
}
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = /* @__PURE__ */ makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = /* @__PURE__ */ makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = /* @__PURE__ */ makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = /* @__PURE__ */ makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = /* @__PURE__ */ makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = /* @__PURE__ */ makeMap("script,style");
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
      for (var i2 = stack.length - 1; i2 >= pos; i2--) {
        if (handler.end) {
          handler.end(stack[i2]);
        }
      }
      stack.length = pos;
    }
  }
}
function makeMap(str) {
  var obj = {};
  var items = str.split(",");
  for (var i2 = 0; i2 < items.length; i2++) {
    obj[items[i2]] = true;
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
const scripts = {};
function loadScript(globalName, src, callback2) {
  const globalObject = typeof globalName === "string" ? window[globalName] : globalName;
  if (globalObject) {
    callback2();
    return;
  }
  let callbacks2 = scripts[src];
  if (!callbacks2) {
    callbacks2 = scripts[src] = [];
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = function() {
      callbacks2.forEach((callback22) => callback22());
      delete scripts[src];
    };
  }
  callbacks2.push(callback2);
}
function useQuill(props2, rootRef, trigger) {
  let quillReady;
  let skipMatcher;
  let quill;
  watch(() => props2.readOnly, (value) => {
    if (quillReady) {
      quill.enable(!value);
      if (!value) {
        quill.blur();
      }
    }
  });
  watch(() => props2.placeholder, (value) => {
    if (quillReady) {
      quill.root.setAttribute("data-placeholder", value);
    }
  });
  function html2delta(html) {
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
        const arrts = attrs2.map(({
          name,
          value
        }) => `${name}="${value}"`).join(" ");
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
    skipMatcher = true;
    const delta = quill.clipboard.convert(content);
    skipMatcher = false;
    return delta;
  }
  function getContents() {
    const html = quill.root.innerHTML;
    const text2 = quill.getText();
    const delta = quill.getContents();
    return {
      html,
      text: text2,
      delta
    };
  }
  let oldStatus = {};
  function updateStatus(range) {
    const status = range ? quill.getFormat(range) : {};
    const keys = Object.keys(status);
    if (keys.length !== Object.keys(oldStatus).length || keys.find((key) => status[key] !== oldStatus[key])) {
      oldStatus = status;
      trigger("statuschange", {}, status);
    }
  }
  function initQuill(imageResizeModules) {
    const Quill = window.Quill;
    register(Quill);
    const options = {
      toolbar: false,
      readOnly: props2.readOnly,
      placeholder: props2.placeholder
    };
    if (imageResizeModules.length) {
      Quill.register("modules/ImageResize", window.ImageResize.default);
      options.modules = {
        ImageResize: {
          modules: imageResizeModules
        }
      };
    }
    const rootEl = rootRef.value;
    quill = new Quill(rootEl, options);
    const $el = quill.root;
    const events = ["focus", "blur", "input"];
    events.forEach((name) => {
      $el.addEventListener(name, ($event) => {
        if (name === "input") {
          $event.stopPropagation();
        } else {
          trigger(name, $event, getContents());
        }
      });
    });
    quill.on("text-change", () => {
      trigger("input", {}, getContents());
    });
    quill.on("selection-change", updateStatus);
    quill.on("scroll-optimize", () => {
      const range = quill.selection.getRange()[0];
      updateStatus(range);
    });
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      if (skipMatcher) {
        return delta;
      }
      if (delta.ops) {
        delta.ops = delta.ops.filter(({
          insert
        }) => typeof insert === "string").map(({
          insert
        }) => ({
          insert
        }));
      }
      return delta;
    });
    quillReady = true;
    trigger("ready", {}, {});
  }
  onMounted(() => {
    const imageResizeModules = [];
    if (props2.showImgSize) {
      imageResizeModules.push("DisplaySize");
    }
    if (props2.showImgToolbar) {
      imageResizeModules.push("Toolbar");
    }
    if (props2.showImgResize) {
      imageResizeModules.push("Resize");
    }
    const quillSrc = "https://unpkg.com/quill@1.3.7/dist/quill.min.js";
    loadScript(window.Quill, quillSrc, () => {
      if (imageResizeModules.length) {
        const imageResizeSrc = "https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js";
        loadScript(window.ImageResize, imageResizeSrc, () => {
          initQuill(imageResizeModules);
        });
      } else {
        initQuill(imageResizeModules);
      }
    });
  });
  useSubscribe((type, data) => {
    const {
      options,
      callbackId
    } = data;
    let res;
    let range;
    let errMsg;
    if (quillReady) {
      const Quill = window.Quill;
      switch (type) {
        case "format":
          {
            let {
              name = "",
              value = false
            } = options;
            range = quill.getSelection(true);
            let format = quill.getFormat(range)[name] || false;
            if (["bold", "italic", "underline", "strike", "ins"].includes(name)) {
              value = !format;
            } else if (name === "direction") {
              value = value === "rtl" && format ? false : value;
              const align2 = quill.getFormat(range).align;
              if (value === "rtl" && !align2) {
                quill.format("align", "right", "user");
              } else if (!value && align2 === "right") {
                quill.format("align", false, "user");
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
            quill.format(name, value, "user");
          }
          break;
        case "insertDivider":
          range = quill.getSelection(true);
          quill.insertText(range.index, "\n", "user");
          quill.insertEmbed(range.index + 1, "divider", true, "user");
          quill.setSelection(range.index + 2, 0, "silent");
          break;
        case "insertImage":
          {
            range = quill.getSelection(true);
            const {
              src = "",
              alt = "",
              width = "",
              height = "",
              extClass = "",
              data: data2 = {}
            } = options;
            const path = getRealPath(src);
            quill.insertEmbed(range.index, "image", path, "user");
            const local = /^(file|blob):/.test(path) ? path : false;
            quill.formatText(range.index, 1, "data-local", local);
            quill.formatText(range.index, 1, "alt", alt);
            quill.formatText(range.index, 1, "width", width);
            quill.formatText(range.index, 1, "height", height);
            quill.formatText(range.index, 1, "class", extClass);
            quill.formatText(range.index, 1, "data-custom", Object.keys(data2).map((key) => `${key}=${data2[key]}`).join("&"));
            quill.setSelection(range.index + 1, 0, "silent");
          }
          break;
        case "insertText":
          {
            range = quill.getSelection(true);
            const {
              text: text2 = ""
            } = options;
            quill.insertText(range.index, text2, "user");
            quill.setSelection(range.index + text2.length, 0, "silent");
          }
          break;
        case "setContents":
          {
            const {
              delta,
              html
            } = options;
            if (typeof delta === "object") {
              quill.setContents(delta, "silent");
            } else if (typeof html === "string") {
              quill.setContents(html2delta(html), "silent");
            } else {
              errMsg = "contents is missing";
            }
          }
          break;
        case "getContents":
          res = getContents();
          break;
        case "clear":
          quill.setText("");
          break;
        case "removeFormat":
          {
            range = quill.getSelection(true);
            const parchment = Quill.import("parchment");
            if (range.length) {
              quill.removeFormat(range.index, range.length, "user");
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
        case "blur":
          quill.blur();
          break;
        case "getSelectionText":
          range = quill.selection.savedRange;
          res = {
            text: ""
          };
          if (range && range.length !== 0) {
            res.text = quill.getText(range.index, range.length);
          }
          break;
        case "scrollIntoView":
          quill.scrollIntoView();
          break;
      }
      updateStatus(range);
    } else {
      errMsg = "not ready";
    }
    if (callbackId) {
      UniViewJSBridge.publishHandler("onEditorMethodCallback", {
        callbackId,
        data: Object.assign({}, res, {
          errMsg: `${type}:${errMsg ? "fail " + errMsg : "ok"}`
        })
      });
    }
  });
}
const props$i = /* @__PURE__ */ Object.assign({}, props$j, {
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
});
var index$g = /* @__PURE__ */ defineComponent({
  name: "Editor",
  props: props$i,
  emit: ["ready", "focus", "blur", "input", "statuschange", ...emit$1],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useQuill(props2, rootRef, trigger);
    useKeyboard$1(props2, rootRef);
    return () => {
      return createVNode("uni-editor", {
        ref: rootRef,
        id: props2.id,
        class: "ql-container"
      }, null, 8, ["id"]);
    };
  }
});
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
var index$f = /* @__PURE__ */ defineComponent({
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
  setup(props2) {
    const path = computed(() => ICONS[props2.type]);
    return () => createVNode("uni-icon", null, [path.value.d && createSvgIconVNode(path.value.d, props2.color || path.value.c, rpx2px(props2.size))]);
  }
});
var ResizeSensor = /* @__PURE__ */ defineComponent({
  name: "ResizeSensor",
  props: {
    initial: {
      type: Boolean,
      default: false
    }
  },
  emits: ["resize"],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const reset = useResizeSensorReset(rootRef);
    const update = useResizeSensorUpdate(rootRef, emit2, reset);
    useResizeSensorLifecycle(rootRef, props2, update, reset);
    return () => createVNode("uni-resize-sensor", {
      ref: rootRef,
      onAnimationstartOnce: update
    }, [createVNode("div", {
      onScroll: update
    }, [createVNode("div", null, null)], 40, ["onScroll"]), createVNode("div", {
      onScroll: update
    }, [createVNode("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
  }
});
function useResizeSensorUpdate(rootRef, emit2, reset) {
  const size = reactive({
    width: -1,
    height: -1
  });
  watch(() => extend({}, size), (value) => emit2("resize", value));
  return () => {
    const {
      offsetWidth,
      offsetHeight
    } = rootRef.value;
    size.width = offsetWidth;
    size.height = offsetHeight;
    reset();
  };
}
function useResizeSensorReset(rootRef) {
  return () => {
    const {
      firstElementChild,
      lastElementChild
    } = rootRef.value;
    firstElementChild.scrollLeft = 1e5;
    firstElementChild.scrollTop = 1e5;
    lastElementChild.scrollLeft = 1e5;
    lastElementChild.scrollTop = 1e5;
  };
}
function useResizeSensorLifecycle(rootRef, props2, update, reset) {
  onActivated(reset);
  onMounted(() => {
    if (props2.initial) {
      nextTick(update);
    }
    const rootEl = rootRef.value;
    if (rootEl.offsetParent !== rootEl.parentElement) {
      rootEl.parentElement.style.position = "relative";
    }
    if (!("AnimationEvent" in window)) {
      reset();
    }
  });
}
const props$h = {
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
  },
  draggable: {
    type: Boolean,
    default: true
  }
};
const FIX_MODES = {
  widthFix: ["width", "height"],
  heightFix: ["height", "width"]
};
const IMAGE_MODES = {
  aspectFit: ["center center", "contain"],
  aspectFill: ["center center", "cover"],
  widthFix: [, "100% 100%"],
  heightFix: [, "100% 100%"],
  top: ["center top"],
  bottom: ["center bottom"],
  center: ["center center"],
  left: ["left center"],
  right: ["right center"],
  "top left": ["left top"],
  "top right": ["right top"],
  "bottom left": ["left bottom"],
  "bottom right": ["right bottom"]
};
var index$e = /* @__PURE__ */ defineComponent({
  name: "Image",
  props: props$h,
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const state = useImageState(rootRef, props2);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      fixSize
    } = useImageSize(rootRef, props2, state);
    useImageLoader(state, {
      trigger,
      fixSize
    });
    return () => {
      const {
        mode
      } = props2;
      const {
        imgSrc,
        modeStyle
      } = state;
      return createVNode("uni-image", {
        ref: rootRef
      }, [createVNode("div", {
        style: modeStyle
      }, null, 4), imgSrc && createVNode("img", {
        src: imgSrc,
        draggable: props2.draggable
      }, null, 8, ["src", "draggable"]), FIX_MODES[mode] && createVNode(ResizeSensor, {
        onResize: fixSize
      }, null, 8, ["onResize"])], 512);
    };
  }
});
function useImageState(rootRef, props2) {
  const imgSrc = ref("");
  const modeStyleRef = computed(() => {
    let size = "auto";
    let position = "";
    const opts = IMAGE_MODES[props2.mode];
    if (!opts) {
      position = "0% 0%";
      size = "100% 100%";
    } else {
      opts[0] && (position = opts[0]);
      opts[1] && (size = opts[1]);
    }
    const srcVal = imgSrc.value;
    return `background-image:${srcVal ? 'url("' + srcVal + '")' : "none"};background-position:${position};background-size:${size};background-repeat:no-repeat;`;
  });
  const state = reactive({
    rootEl: rootRef,
    src: computed(() => props2.src ? getRealPath(props2.src) : ""),
    origWidth: 0,
    origHeight: 0,
    origStyle: {
      width: "",
      height: ""
    },
    modeStyle: modeStyleRef,
    imgSrc
  });
  onMounted(() => {
    const rootEl = rootRef.value;
    const style2 = rootEl.style;
    state.origWidth = Number(style2.width) || 0;
    state.origHeight = Number(style2.height) || 0;
  });
  return state;
}
function useImageLoader(state, {
  trigger,
  fixSize
}) {
  let img;
  const setState = (width = 0, height = 0, imgSrc = "") => {
    state.origWidth = width;
    state.origHeight = height;
    state.imgSrc = imgSrc;
  };
  const loadImage = (src) => {
    if (!src) {
      resetImage();
      setState();
      return;
    }
    if (!img) {
      img = new Image();
    }
    img.onload = (evt) => {
      const {
        width,
        height
      } = img;
      setState(width, height, src);
      fixSize();
      resetImage();
      trigger("load", evt, {
        width,
        height
      });
    };
    img.onerror = (evt) => {
      setState();
      resetImage();
      trigger("error", evt, {
        errMsg: `GET ${state.src} 404 (Not Found)`
      });
    };
    img.src = src;
  };
  const resetImage = () => {
    if (img) {
      img.onload = null;
      img.onerror = null;
      img = null;
    }
  };
  watch(() => state.src, (value) => loadImage(value));
  onMounted(() => loadImage(state.src));
  onBeforeUnmount(() => resetImage());
}
const isChrome = navigator.vendor === "Google Inc.";
function fixNumber(num) {
  if (isChrome && num > 10) {
    num = Math.round(num / 2) * 2;
  }
  return num;
}
function useImageSize(rootRef, props2, state) {
  const fixSize = () => {
    const {
      mode
    } = props2;
    const names = FIX_MODES[mode];
    if (!names) {
      return;
    }
    const {
      origWidth,
      origHeight
    } = state;
    const ratio = origWidth && origHeight ? origWidth / origHeight : 0;
    if (!ratio) {
      return;
    }
    const rootEl = rootRef.value;
    const rect = rootEl.getBoundingClientRect();
    const value = rect[names[0]];
    if (value) {
      rootEl.style[names[1]] = fixNumber(value / ratio) + "px";
    }
  };
  const resetSize = () => {
    const {
      style: style2
    } = rootRef.value;
    const {
      origStyle: {
        width,
        height
      }
    } = state;
    style2.width = width;
    style2.height = height;
  };
  watch(() => props2.mode, (value, oldValue) => {
    if (FIX_MODES[oldValue]) {
      resetSize();
    }
    if (FIX_MODES[value]) {
      fixSize();
    }
  });
  return {
    fixSize,
    resetSize
  };
}
const passiveOptions$1 = passive(true);
const states = [];
let userInteract = 0;
let inited;
function addInteractListener(vm) {
  if (!inited) {
    const eventNames = [
      "touchstart",
      "touchmove",
      "touchend",
      "mousedown",
      "mouseup"
    ];
    eventNames.forEach((eventName) => {
      document.addEventListener(eventName, function() {
        states.forEach((vm2) => {
          vm2.userAction = true;
          userInteract++;
          setTimeout(() => {
            userInteract--;
            if (!userInteract) {
              vm2.userAction = false;
            }
          }, 0);
        });
      }, passiveOptions$1);
    });
    inited = true;
  }
  states.push(vm);
}
function removeInteractListener(vm) {
  const index2 = states.indexOf(vm);
  if (index2 >= 0) {
    states.splice(index2, 1);
  }
}
function useUserAction() {
  const state = reactive({
    userAction: false
  });
  onMounted(() => {
    addInteractListener(state);
  });
  onBeforeUnmount(() => {
    removeInteractListener(state);
  });
  return {
    state
  };
}
function useScopedAttrs() {
  const state = reactive({
    attrs: {}
  });
  onMounted(() => {
    let instance2 = getCurrentInstance();
    while (instance2) {
      const scopeId = instance2.type.__scopeId;
      if (scopeId) {
        state.attrs[scopeId] = "";
      }
      instance2 = instance2.__isPage ? null : instance2.parent;
    }
  });
  return {
    state
  };
}
function useFormField(nameKey, value) {
  const uniForm = inject(uniFormKey, false);
  if (!uniForm) {
    return;
  }
  const instance2 = getCurrentInstance();
  const ctx = {
    submit() {
      const proxy = instance2.proxy;
      return [
        proxy[nameKey],
        typeof value === "string" ? proxy[value] : value.value
      ];
    },
    reset() {
      if (typeof value === "string") {
        instance2.proxy[value] = "";
      } else {
        value.value = "";
      }
    }
  };
  uniForm.addField(ctx);
  onBeforeUnmount(() => {
    uniForm.removeField(ctx);
  });
}
function getValueString(value) {
  return value === null ? "" : String(value);
}
const props$g = /* @__PURE__ */ Object.assign({}, {
  name: {
    type: String,
    default: ""
  },
  value: {
    type: [String, Number],
    default: ""
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  autoFocus: {
    type: [Boolean, String],
    default: false
  },
  focus: {
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
    default: ""
  },
  maxlength: {
    type: [Number, String],
    default: 140
  },
  confirmType: {
    type: String,
    default: "done"
  }
}, props$j);
const emit = ["input", "focus", "blur", ...emit$1];
function useBase(props2, rootRef, emit2) {
  const fieldRef = ref(null);
  const trigger = useCustomEvent(rootRef, emit2);
  const selectionStart = computed(() => {
    const selectionStart2 = Number(props2.selectionStart);
    return isNaN(selectionStart2) ? -1 : selectionStart2;
  });
  const selectionEnd = computed(() => {
    const selectionEnd2 = Number(props2.selectionEnd);
    return isNaN(selectionEnd2) ? -1 : selectionEnd2;
  });
  const cursor = computed(() => {
    const cursor2 = Number(props2.cursor);
    return isNaN(cursor2) ? -1 : cursor2;
  });
  const maxlength = computed(() => {
    var maxlength2 = Number(props2.maxlength);
    return isNaN(maxlength2) ? 140 : maxlength2;
  });
  const value = getValueString(props2.value);
  const state = reactive({
    value,
    valueOrigin: value,
    maxlength,
    focus: props2.focus,
    composing: false,
    selectionStart,
    selectionEnd,
    cursor
  });
  watch(() => state.focus, (val) => emit2("update:focus", val));
  watch(() => state.maxlength, (val) => state.value = state.value.slice(0, val));
  return {
    fieldRef,
    state,
    trigger
  };
}
function useValueSync(props2, state, emit2, trigger) {
  const valueChangeFn = debounce((val) => {
    state.value = getValueString(val);
  }, 100);
  watch(() => props2.value, valueChangeFn);
  const triggerInputFn = throttle((event, detail) => {
    emit2("update:value", detail.value);
    trigger("input", event, detail);
  }, 100);
  const triggerInput = (event, detail, force) => {
    valueChangeFn.cancel();
    triggerInputFn(event, detail);
    if (force) {
      triggerInputFn.flush();
    }
  };
  onBeforeMount(() => {
    valueChangeFn.cancel();
    triggerInputFn.cancel();
  });
  return {
    trigger,
    triggerInput
  };
}
function useAutoFocus(props2, fieldRef) {
  useUserAction();
  const needFocus = computed(() => props2.autoFocus || props2.focus);
  function focus() {
    if (!needFocus.value) {
      return;
    }
    const field = fieldRef.value;
    if (!field || false) {
      setTimeout(focus, 100);
      return;
    }
    {
      field.focus();
    }
  }
  function blur() {
    const field = fieldRef.value;
    if (field) {
      field.blur();
    }
  }
  watch(() => props2.focus, (value) => {
    if (value) {
      focus();
    } else {
      blur();
    }
  });
  onMounted(() => {
    if (needFocus.value) {
      focus();
    }
  });
}
function useEvent(fieldRef, state, trigger, triggerInput, beforeInput) {
  function checkSelection() {
    const field = fieldRef.value;
    if (field && state.focus && state.selectionStart > -1 && state.selectionEnd > -1) {
      field.selectionStart = state.selectionStart;
      field.selectionEnd = state.selectionEnd;
    }
  }
  function checkCursor() {
    const field = fieldRef.value;
    if (field && state.focus && state.selectionStart < 0 && state.selectionEnd < 0 && state.cursor > -1) {
      field.selectionEnd = field.selectionStart = state.cursor;
    }
  }
  function initField() {
    const field = fieldRef.value;
    const onFocus = function(event) {
      state.focus = true;
      trigger("focus", event, {
        value: state.value
      });
      checkSelection();
      checkCursor();
    };
    const onInput = function(event, force) {
      event.stopPropagation();
      if (typeof beforeInput === "function" && beforeInput(event, state) === false) {
        return;
      }
      state.value = field.value;
      if (!state.composing) {
        triggerInput(event, {
          value: field.value,
          cursor: field.selectionEnd
        }, force);
      }
    };
    const onBlur = function(event) {
      if (state.composing) {
        state.composing = false;
        onInput(event, true);
      }
      state.focus = false;
      trigger("blur", event, {
        value: state.value,
        cursor: event.target.selectionEnd
      });
    };
    field.addEventListener("change", (event) => event.stopPropagation());
    field.addEventListener("focus", onFocus);
    field.addEventListener("blur", onBlur);
    field.addEventListener("input", onInput);
    field.addEventListener("compositionstart", (event) => {
      event.stopPropagation();
      state.composing = true;
    });
    field.addEventListener("compositionend", (event) => {
      event.stopPropagation();
      if (state.composing) {
        state.composing = false;
        onInput(event);
      }
    });
  }
  watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
  watch(() => state.cursor, checkCursor);
  watch(() => fieldRef.value, initField);
}
function useField(props2, rootRef, emit2, beforeInput) {
  const {fieldRef, state, trigger} = useBase(props2, rootRef, emit2);
  const {triggerInput} = useValueSync(props2, state, emit2, trigger);
  useAutoFocus(props2, fieldRef);
  useKeyboard$1(props2, fieldRef);
  const {state: scopedAttrsState} = useScopedAttrs();
  useFormField("name", state);
  useEvent(fieldRef, state, trigger, triggerInput, beforeInput);
  const fixDisabledColor = String(navigator.vendor).indexOf("Apple") === 0 && CSS.supports("image-orientation:from-image");
  return {
    fieldRef,
    state,
    scopedAttrsState,
    fixDisabledColor,
    trigger
  };
}
const props$f = /* @__PURE__ */ Object.assign({}, props$g, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  }
});
var Input = /* @__PURE__ */ defineComponent({
  name: "Input",
  props: props$f,
  emit: ["confirm", ...emit],
  setup(props2, {
    emit: emit2
  }) {
    const INPUT_TYPES = ["text", "number", "idcard", "digit", "password"];
    const type = computed(() => {
      let type2 = "";
      switch (props2.type) {
        case "text":
          if (props2.confirmType === "search") {
            type2 = "search";
          }
          break;
        case "idcard":
          type2 = "text";
          break;
        case "digit":
          type2 = "number";
          break;
        default:
          type2 = ~INPUT_TYPES.includes(props2.type) ? props2.type : "text";
          break;
      }
      return props2.password ? "password" : type2;
    });
    const valid = ref(true);
    const rootRef = ref(null);
    const {
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      trigger
    } = useField(props2, rootRef, emit2, (event, state2) => {
      const input = event.target;
      if (NUMBER_TYPES.includes(props2.type)) {
        valid.value = input.validity && input.validity.valid;
        state2.value;
      }
      if (type.value === "number") {
        const maxlength = state2.maxlength;
        if (maxlength > 0 && input.value.length > maxlength) {
          input.value = input.value.slice(0, maxlength);
          state2.value = input.value;
          return false;
        }
      }
    });
    const NUMBER_TYPES = ["number", "digit"];
    const step = computed(() => NUMBER_TYPES.includes(props2.type) ? "0.000000000000000001" : "");
    function onKeyUpEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      event.stopPropagation();
      trigger("confirm", event, {
        value: event.target.value
      });
    }
    return () => {
      let inputNode = props2.disabled && fixDisabledColor ? createVNode("input", {
        ref: fieldRef,
        value: state.value,
        tabindex: "-1",
        readonly: !!props2.disabled,
        type: type.value,
        maxlength: state.maxlength,
        step: step.value,
        class: "uni-input-input",
        onFocus: (event) => event.target.blur()
      }, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : createVNode("input", {
        ref: fieldRef,
        value: state.value,
        disabled: !!props2.disabled,
        type: type.value,
        maxlength: state.maxlength,
        step: step.value,
        enterkeyhint: props2.confirmType,
        class: "uni-input-input",
        autocomplete: "off",
        onKeyup: onKeyUpEnter
      }, null, 40, ["value", "disabled", "type", "maxlength", "step", "enterkeyhint", "onKeyup"]);
      return createVNode("uni-input", {
        ref: rootRef
      }, [createVNode("div", {
        class: "uni-input-wrapper"
      }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
        style: props2.placeholderStyle,
        class: ["uni-input-placeholder", props2.placeholderClass]
      }), [props2.placeholder], 16), [[vShow, !(state.value.length || !valid.value)]]), props2.confirmType === "search" ? createVNode("form", {
        action: "",
        onSubmit: () => false,
        class: "uni-input-form"
      }, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
    };
  }
});
const addListenerToElement$1 = function(element, type, callback2, capture) {
  element.addEventListener(type, ($event) => {
    if (typeof callback2 === "function") {
      if (callback2($event) === false) {
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
      addListenerToElement$1(element, "touchstart", function($event) {
        hasTouchStart = true;
        if ($event.touches.length === 1 && !$eventOld) {
          $eventOld = $event;
          x0 = x1 = $event.touches[0].pageX;
          y0 = y1 = $event.touches[0].pageY;
          return fn($event, "start", x0, y0);
        }
      });
      addListenerToElement$1(element, "mousedown", function($event) {
        hasMouseDown = true;
        if (!hasTouchStart && !$eventOld) {
          $eventOld = $event;
          x0 = x1 = $event.pageX;
          y0 = y1 = $event.pageY;
          return fn($event, "start", x0, y0);
        }
      });
      addListenerToElement$1(element, "touchmove", function($event) {
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
      addListenerToElement$1(element, "touchend", function($event) {
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
      addListenerToElement$1(element, "touchcancel", function($event) {
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
  var i2 = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i2 * r;
  if (o2 === 0) {
    const a2 = -n / (2 * i2);
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
    const c = (-n - Math.sqrt(o2)) / (2 * i2);
    const u = (-n + Math.sqrt(o2)) / (2 * i2);
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
  var p2 = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
  var f2 = -n / 2 * i2;
  var v2 = e2;
  var g2 = (t2 - f2 * e2) / p2;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, f2 * e3);
      var n2 = Math.cos(p2 * e3);
      var i3 = Math.sin(p2 * e3);
      return t3 * (g2 * p2 * n2 - v2 * p2 * i3) + f2 * t3 * (g2 * i3 + v2 * n2);
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
Spring$1.prototype.setEnd = function(e2, n, i2) {
  if (!i2) {
    i2 = new Date().getTime();
  }
  if (e2 !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    var r = this._endPosition;
    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i2 - this._startTime) / 1e3);
      }
      r = this._solution.x((i2 - this._startTime) / 1e3);
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
      this._startTime = i2;
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
STD.prototype.setEnd = function(e2, t2, n, i2) {
  var r = new Date().getTime();
  this._springX.setEnd(e2, i2, r);
  this._springY.setEnd(t2, i2, r);
  this._springScale.setEnd(n, i2, r);
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
  var i2 = t2.offsetLeft;
  return t2.offsetParent ? i2 += p(t2.offsetParent, n) : 0;
}
function f(t2, n) {
  if (t2 === n) {
    return 0;
  }
  var i2 = t2.offsetTop;
  return t2.offsetParent ? i2 += f(t2.offsetParent, n) : 0;
}
function v(a2, b) {
  return +((1e3 * a2 - 1e3 * b) / 1e3).toFixed(1);
}
function g(e2, t2, n) {
  var i2 = function(e3) {
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
  function fn(n2, i3, r2, o2) {
    if (!n2 || !n2.cancelled) {
      r2(i3);
      var a2 = e2.done();
      if (!a2) {
        if (!n2.cancelled) {
          n2.id = requestAnimationFrame(fn.bind(null, n2, i3, r2, o2));
        }
      }
      if (a2 && o2) {
        o2(i3);
      }
    }
  }
  fn(r, e2, t2, n);
  return {
    cancel: i2.bind(null, r),
    model: e2
  };
}
const _sfc_main$7 = {
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
    __handleTouchMove: function(event) {
      var self = this;
      if (!this._isScaling && !this.disabled && this._isTouching) {
        let x = this._translateX;
        let y = this._translateY;
        if (this._firstMoveDirection === null) {
          this._firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
        }
        if (this.xMove) {
          x = event.detail.dx + this.__baseX;
          this.__touchInfo.historyX.shift();
          this.__touchInfo.historyX.push(x);
          if (!this.yMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
          }
        }
        if (this.yMove) {
          y = event.detail.dy + this.__baseY;
          this.__touchInfo.historyY.shift();
          this.__touchInfo.historyY.push(y);
          if (!this.xMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
          }
        }
        this.__touchInfo.historyT.shift();
        this.__touchInfo.historyT.push(event.detail.timeStamp);
        if (!this._checkCanMove) {
          event.preventDefault();
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
    _onTrack: function(event) {
      switch (event.detail.state) {
        case "start":
          this.__handleTouchStart();
          break;
        case "move":
          this.__handleTouchMove(event);
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
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-movable-view", _ctx.$attrs, [
    createVNode(_component_v_uni_resize_sensor, {onResize: $options.setParent}, null, 8, ["onResize"]),
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$7.render = _sfc_render$7;
const OPEN_TYPES = [
  "navigate",
  "redirect",
  "switchTab",
  "reLaunch",
  "navigateBack"
];
const _sfc_main$6 = {
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
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
_sfc_main$6.render = _sfc_render$6;
const VALUES = {
  activeColor: "#007AFF",
  backgroundColor: "#EBEBEB",
  activeMode: "backwards"
};
const props$e = {
  percent: {
    type: [Number, String],
    default: 0,
    validator(value) {
      return !isNaN(parseFloat(value));
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
      return !isNaN(parseFloat(value));
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
  },
  duration: {
    type: [Number, String],
    default: 30,
    validator(value) {
      return !isNaN(parseFloat(value));
    }
  }
};
var index$d = /* @__PURE__ */ defineComponent({
  name: "Progress",
  props: props$e,
  setup(props2) {
    const state = useProgressState(props2);
    _activeAnimation(state, props2);
    watch(() => state.realPercent, (newValue, oldValue) => {
      state.strokeTimer && clearInterval(state.strokeTimer);
      state.lastPercent = oldValue || 0;
      _activeAnimation(state, props2);
    });
    return () => {
      const {
        showInfo
      } = props2;
      const {
        outerBarStyle,
        innerBarStyle,
        currentPercent
      } = state;
      return createVNode("uni-progress", {
        class: "uni-progress"
      }, [createVNode("div", {
        style: outerBarStyle,
        class: "uni-progress-bar"
      }, [createVNode("div", {
        style: innerBarStyle,
        class: "uni-progress-inner-bar"
      }, null, 4)], 4), showInfo ? createVNode("p", {
        class: "uni-progress-info"
      }, [currentPercent, createTextVNode("%")]) : ""]);
    };
  }
});
function useProgressState(props2) {
  const currentPercent = ref(0);
  const outerBarStyle = computed(() => `background-color: ${props2.backgroundColor}; height: ${props2.strokeWidth}px;`);
  const innerBarStyle = computed(() => {
    const backgroundColor = props2.color !== VALUES.activeColor && props2.activeColor === VALUES.activeColor ? props2.color : props2.activeColor;
    return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
  });
  const realPercent = computed(() => {
    let realValue = parseFloat(props2.percent);
    realValue < 0 && (realValue = 0);
    realValue > 100 && (realValue = 100);
    return realValue;
  });
  const state = reactive({
    outerBarStyle,
    innerBarStyle,
    realPercent,
    currentPercent,
    strokeTimer: 0,
    lastPercent: 0
  });
  return state;
}
function _activeAnimation(state, props2) {
  if (props2.active) {
    state.currentPercent = props2.activeMode === VALUES.activeMode ? 0 : state.lastPercent;
    state.strokeTimer = setInterval(() => {
      if (state.currentPercent + 1 > state.realPercent) {
        state.currentPercent = state.realPercent;
        state.strokeTimer && clearInterval(state.strokeTimer);
      } else {
        state.currentPercent += 1;
      }
    }, parseFloat(props2.duration));
  } else {
    state.currentPercent = state.realPercent;
  }
}
const uniRadioGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
const props$d = {
  name: {
    type: String,
    default: ""
  }
};
var index$c = /* @__PURE__ */ defineComponent({
  name: "RadioGroup",
  props: props$d,
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideRadioGroup(props2, trigger);
    return () => {
      return createVNode("uni-radio-group", {
        ref: rootRef
      }, [slots.default && slots.default()], 512);
    };
  }
});
function useProvideRadioGroup(props2, trigger) {
  const fields = [];
  onMounted(() => {
    _resetRadioGroupValue(fields.length - 1);
  });
  const getFieldsValue = () => {
    var _a;
    return (_a = fields.find((field) => field.value.radioChecked)) == null ? void 0 : _a.value.value;
  };
  provide(uniRadioGroupKey, {
    addField(field) {
      fields.push(field);
    },
    removeField(field) {
      fields.splice(fields.indexOf(field), 1);
    },
    radioChange($event, field) {
      const index2 = fields.indexOf(field);
      _resetRadioGroupValue(index2, true);
      trigger("change", $event, {
        value: getFieldsValue()
      });
    }
  });
  const uniForm = inject(uniFormKey, false);
  if (uniForm) {
    uniForm.addField({
      submit: () => {
        let data = ["", null];
        if (props2.name !== "") {
          data[0] = props2.name;
          data[1] = getFieldsValue();
        }
        return data;
      }
    });
  }
  function setFieldChecked(field, radioChecked) {
    field.value = {
      radioChecked,
      value: field.value.value
    };
  }
  function _resetRadioGroupValue(key, change) {
    fields.forEach((value, index2) => {
      if (index2 === key) {
        return;
      }
      if (change) {
        setFieldChecked(fields[index2], false);
      } else {
        fields.forEach((v2, i2) => {
          if (index2 >= i2) {
            return;
          }
          if (fields[i2].value.radioChecked) {
            setFieldChecked(fields[index2], false);
          }
        });
      }
    });
  }
  return fields;
}
const props$c = {
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
};
var index$b = /* @__PURE__ */ defineComponent({
  name: "Radio",
  props: props$c,
  setup(props2, {
    slots
  }) {
    const radioChecked = ref(props2.checked);
    const radioValue = ref(props2.value);
    const checkedStyle = computed(() => `background-color: ${props2.color};border-color: ${props2.color};`);
    watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
      radioChecked.value = newChecked;
      radioValue.value = newModelValue;
    });
    const reset = () => {
      radioChecked.value = false;
    };
    const {
      uniCheckGroup,
      uniLabel,
      field
    } = useRadioInject(radioChecked, radioValue, reset);
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      radioChecked.value = true;
      uniCheckGroup && uniCheckGroup.radioChange($event, field);
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    useListeners(props2, {
      "label-click": _onClick
    });
    return () => {
      const {
        booleanAttrs
      } = useBooleanAttr(props2, "disabled");
      return createVNode("uni-radio", mergeProps(booleanAttrs, {
        onClick: _onClick
      }), [createVNode("div", {
        class: "uni-radio-wrapper"
      }, [createVNode("div", {
        class: ["uni-radio-input", {
          "uni-radio-input-disabled": props2.disabled
        }],
        style: radioChecked.value ? checkedStyle.value : ""
      }, [radioChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, "#fff", 18) : ""], 6), slots.default && slots.default()])], 16, ["onClick"]);
    };
  }
});
function useRadioInject(radioChecked, radioValue, reset) {
  const field = computed({
    get: () => ({
      radioChecked: Boolean(radioChecked.value),
      value: radioValue.value
    }),
    set: ({
      radioChecked: checked
    }) => {
      radioChecked.value = checked;
    }
  });
  const formField = {
    reset
  };
  const uniCheckGroup = inject(uniRadioGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = inject(uniLabelKey, false);
  onBeforeUnmount(() => {
    uniCheckGroup && uniCheckGroup.removeField(field);
    uniForm && uniForm.removeField(formField);
  });
  return {
    uniCheckGroup,
    uniForm,
    uniLabel,
    field
  };
}
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
    if (hasOwn(CHARS, stage) && CHARS[stage]) {
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
    if (!hasOwn(node, "type") || node.type === "node") {
      if (!(typeof node.name === "string" && node.name)) {
        return;
      }
      const tagName = node.name.toLowerCase();
      if (!hasOwn(TAGS, tagName)) {
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
const _sfc_main$5 = {
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
const _hoisted_1$4 = /* @__PURE__ */ createVNode("div", null, null, -1);
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-rich-text", _ctx.$attrs, [
    _hoisted_1$4
  ], 16);
}
_sfc_main$5.render = _sfc_render$5;
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
  var i2 = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i2 * r;
  if (o2 === 0) {
    const a3 = -n / (2 * i2);
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
    const c = (-n - Math.sqrt(o2)) / (2 * i2);
    const u = (-n + Math.sqrt(o2)) / (2 * i2);
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
  var d = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
  var a2 = -n / 2 * i2;
  var s = e2;
  var l = (t2 - a2 * e2) / d;
  return {
    x: function(e3) {
      return Math.pow(Math.E, a2 * e3) * (s * Math.cos(d * e3) + l * Math.sin(d * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, a2 * e3);
      var n2 = Math.cos(d * e3);
      var i3 = Math.sin(d * e3);
      return t3 * (l * d * n2 - s * d * i3) + a2 * t3 * (l * i3 + s * n2);
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
    var i2 = this._endPosition;
    if (this._solution) {
      if (a(t2, 0.4)) {
        t2 = this._solution.dx((n - this._startTime) / 1e3);
      }
      i2 = this._solution.x((n - this._startTime) / 1e3);
      if (a(t2, 0.4)) {
        t2 = 0;
      }
      if (a(i2, 0.4)) {
        i2 = 0;
      }
      i2 += this._endPosition;
    }
    if (!(this._solution && a(i2 - e2, 0.4) && a(t2, 0.4))) {
      this._endPosition = e2;
      this._solution = this._solve(i2 - this._endPosition, t2);
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
function i(scroll, t2, n) {
  function i2(t3, scroll2, r2, o3) {
    if (!t3 || !t3.cancelled) {
      r2(scroll2);
      var a2 = scroll2.done();
      if (!a2) {
        if (!t3.cancelled) {
          t3.id = requestAnimationFrame(i2.bind(null, t3, scroll2, r2, o3));
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
  i2(o2, scroll, t2, n);
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
  this._animation = i(this._scroll, () => {
    var e3 = Date.now();
    var i2 = (e3 - this._scroll._startTime) / 1e3;
    var r2 = this._scroll.x(i2);
    this._position = r2;
    this.updatePosition();
    var o3 = this._scroll.dx(i2);
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
  var i2 = Math.abs(t2) > this._itemSize / 2 ? this._position - (e2 - Math.abs(t2)) : this._position - t2;
  if (this._position !== i2) {
    this._snapping = true;
    this.scrollTo(-i2);
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
  var i2 = 0;
  var r = this._position;
  if (this._enableX) {
    i2 = this._element.childNodes.length ? (t2 || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
    this._scrollWidth = t2;
  } else {
    i2 = this._element.childNodes.length ? (t2 || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
    this._scrollHeight = t2;
  }
  if (typeof e2 === "number") {
    this._position = -e2;
  }
  if (this._position < -i2) {
    this._position = -i2;
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
  this._extent = i2;
  this._scroll._extent = i2;
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
    _findDelta: function(event) {
      var touchInfo = this._touchInfo;
      return event.detail.state === "move" || event.detail.state === "end" ? {
        x: event.detail.dx,
        y: event.detail.dy
      } : {
        x: event.screenX - touchInfo.x,
        y: event.screenY - touchInfo.y
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
        e2.preventDefault();
      }
    },
    _handleTouchMove: function(event) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        var delta = this._findDelta(event);
        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(event.detail.timeStamp); touchInfo.historyTime.length > 10; ) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }
          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y, event.detail.timeStamp);
          }
        }
      }
    },
    _handleTouchEnd: function(event) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        var delta = this._findDelta(event);
        if (delta) {
          var listener2 = touchInfo.listener;
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
          if (listener2 && listener2.onTouchEnd) {
            listener2.onTouchEnd(delta.x, delta.y, o2);
          }
        }
      }
    }
  }
};
let webview;
let pullToRefreshStyle;
function initScrollBounce() {
  plusReady(() => {
    if (!webview) {
      webview = plus.webview.currentWebview();
    }
    if (!pullToRefreshStyle) {
      pullToRefreshStyle = (webview.getStyle() || {}).pullToRefresh || {};
    }
  });
}
function disableScrollBounce({disable}) {
  if (pullToRefreshStyle && pullToRefreshStyle.support) {
    webview.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
      support: !disable
    }));
  }
}
const passiveOptions = passive(true);
const _sfc_main$4 = {
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
    this.$trigger = useCustomEvent({
      value: this.rootRef
    }, this.$emit);
    var self = this;
    this._attached = true;
    this._scrollTopChanged(this.scrollTopNumber);
    this._scrollLeftChanged(this.scrollLeftNumber);
    this._scrollIntoViewChanged(this.scrollIntoView);
    this.__handleScroll = function(event) {
      event.stopPropagation();
      self._handleScroll.bind(self, event)();
    };
    var touchStart = null;
    var needStop = null;
    this.__handleTouchMove = function(event) {
      var x = event.touches[0].pageX;
      var y = event.touches[0].pageY;
      var main = self.main;
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
        event.stopPropagation();
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
        self.$trigger("refresherpulling", event, {
          deltaY: dy
        });
      }
    };
    this.__handleTouchStart = function(event) {
      if (event.touches.length === 1) {
        disableScrollBounce({
          disable: true
        });
        needStop = null;
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        };
        if (self.refresherEnabled && self.refreshState !== "refreshing" && self.main.scrollTop === 0) {
          self.refreshState = "pulling";
        }
      }
    };
    this.__handleTouchEnd = function(event) {
      touchStart = null;
      disableScrollBounce({
        disable: false
      });
      if (self.refresherHeight >= self.refresherThreshold) {
        self._setRefreshState("refreshing");
      } else {
        self.refresherHeight = 0;
        self.$trigger("refresherabort", event, {});
      }
    };
    this.main.addEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.main.addEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.main.addEventListener("scroll", this.__handleScroll, passiveOptions);
    this.main.addEventListener("touchend", this.__handleTouchEnd, passiveOptions);
    initScrollBounce();
  },
  activated() {
    this.scrollY && (this.main.scrollTop = this.lastScrollTop);
    this.scrollX && (this.main.scrollLeft = this.lastScrollLeft);
  },
  beforeUnmount() {
    this.main.removeEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.main.removeEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.main.removeEventListener("scroll", this.__handleScroll, passiveOptions);
    this.main.removeEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  methods: {
    scrollTo: function(t2, n) {
      var i2 = this.main;
      t2 < 0 ? t2 = 0 : n === "x" && t2 > i2.scrollWidth - i2.offsetWidth ? t2 = i2.scrollWidth - i2.offsetWidth : n === "y" && t2 > i2.scrollHeight - i2.offsetHeight && (t2 = i2.scrollHeight - i2.offsetHeight);
      var r = 0;
      var o2 = "";
      n === "x" ? r = i2.scrollLeft - t2 : n === "y" && (r = i2.scrollTop - t2);
      if (r !== 0) {
        this.content.style.transition = "transform .3s ease-out";
        this.content.style.webkitTransition = "-webkit-transform .3s ease-out";
        if (n === "x") {
          o2 = "translateX(" + r + "px) translateZ(0)";
        } else {
          n === "y" && (o2 = "translateY(" + r + "px) translateZ(0)");
        }
        this.content.removeEventListener("transitionend", this.__transitionEnd);
        this.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
        this.__transitionEnd = this._transitionEnd.bind(this, t2, n);
        this.content.addEventListener("transitionend", this.__transitionEnd);
        this.content.addEventListener("webkitTransitionEnd", this.__transitionEnd);
        if (n === "x") {
          i2.style.overflowX = "hidden";
        } else if (n === "y") {
          i2.style.overflowY = "hidden";
        }
        this.content.style.transform = o2;
        this.content.style.webkitTransform = o2;
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
            this.main.scrollTop = val;
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
            this.main.scrollLeft = val;
          }
        }
      }
    },
    _scrollIntoViewChanged: function(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.error(`id error: scroll-into-view=${val}`);
          return;
        }
        var element = this.rootRef.querySelector("#" + val);
        if (element) {
          var mainRect = this.main.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();
          if (this.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = this.main.scrollLeft;
            var x = scrollLeft + left;
            if (this.scrollWithAnimation) {
              this.scrollTo(x, "x");
            } else {
              this.main.scrollLeft = x;
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = this.main.scrollTop;
            var y = scrollTop + top;
            if (this.scrollWithAnimation) {
              this.scrollTo(y, "y");
            } else {
              this.main.scrollTop = y;
            }
          }
        }
      }
    },
    _transitionEnd: function(val, type) {
      this.content.style.transition = "";
      this.content.style.webkitTransition = "";
      this.content.style.transform = "";
      this.content.style.webkitTransform = "";
      var main = this.main;
      if (type === "x") {
        main.style.overflowX = this.scrollX ? "auto" : "hidden";
        main.scrollLeft = val;
      } else if (type === "y") {
        main.style.overflowY = this.scrollY ? "auto" : "hidden";
        main.scrollTop = val;
      }
      this.content.removeEventListener("transitionend", this.__transitionEnd);
      this.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
    },
    _setRefreshState(state) {
      switch (state) {
        case "refreshing":
          this.refresherHeight = this.refresherThreshold;
          this.$trigger("refresherrefresh", {}, {});
          break;
        case "restore":
          this.refresherHeight = 0;
          this.$trigger("refresherrestore", {}, {});
          break;
      }
      this.refreshState = state;
    },
    getScrollPosition() {
      const main = this.main;
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop,
        scrollHeight: main.scrollHeight,
        scrollWidth: main.scrollWidth
      };
    }
  },
  setup(props2) {
    const rootRef = ref(null);
    const main = ref(null);
    const content = ref(null);
    return {
      rootRef,
      main,
      content
    };
  }
};
const _hoisted_1$3 = {ref: "rootRef"};
const _hoisted_2$1 = {
  ref: "wrap",
  class: "uni-scroll-view"
};
const _hoisted_3$1 = {
  ref: "content",
  class: "uni-scroll-view-content"
};
const _hoisted_4$1 = {
  key: 0,
  class: "uni-scroll-view-refresh"
};
const _hoisted_5 = {class: "uni-scroll-view-refresh-inner"};
const _hoisted_6 = /* @__PURE__ */ createVNode("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1);
const _hoisted_7 = /* @__PURE__ */ createVNode("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1);
const _hoisted_8 = {
  key: 1,
  class: "uni-scroll-view-refresh__spinner",
  width: "24",
  height: "24",
  viewBox: "25 25 50 50"
};
const _hoisted_9 = /* @__PURE__ */ createVNode("circle", {
  cx: "50",
  cy: "50",
  r: "20",
  fill: "none",
  style: {color: "#2bd009"},
  "stroke-width": "3"
}, null, -1);
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-scroll-view", _hoisted_1$3, [
    createVNode("div", _hoisted_2$1, [
      createVNode("div", {
        ref: "main",
        style: {
          "overflow-x": $props.scrollX ? "auto" : "hidden",
          "overflow-y": $props.scrollY ? "auto" : "hidden"
        },
        class: "uni-scroll-view"
      }, [
        createVNode("div", _hoisted_3$1, [
          $props.refresherEnabled ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "refresherinner",
            style: {
              "background-color": $props.refresherBackground,
              height: $data.refresherHeight + "px"
            },
            class: "uni-scroll-view-refresher"
          }, [
            $props.refresherDefaultStyle !== "none" ? (openBlock(), createBlock("div", _hoisted_4$1, [
              createVNode("div", _hoisted_5, [
                $data.refreshState == "pulling" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  style: {transform: "rotate(" + $data.refreshRotate + "deg)"},
                  fill: "#2BD009",
                  class: "uni-scroll-view-refresh__icon",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24"
                }, [
                  _hoisted_6,
                  _hoisted_7
                ], 4)) : createCommentVNode("", true),
                $data.refreshState == "refreshing" ? (openBlock(), createBlock("svg", _hoisted_8, [
                  _hoisted_9
                ])) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            $props.refresherDefaultStyle == "none" ? renderSlot(_ctx.$slots, "refresher", {key: 1}) : createCommentVNode("", true)
          ], 4)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ], 512)
      ], 4)
    ], 512)
  ], 512);
}
_sfc_main$4.render = _sfc_render$4;
const addListenerToElement = function(element, type, callback2, capture) {
  element.addEventListener(type, ($event) => {
    if (typeof callback2 === "function") {
      if (callback2($event) === false) {
        if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) {
          $event.preventDefault();
        }
        $event.stopPropagation();
      }
    }
  }, {
    passive: false
  });
};
let __mouseMoveEventListener;
let __mouseUpEventListener;
function useTouchtrack(element, method, useCancel) {
  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", __mouseMoveEventListener);
    document.removeEventListener("mouseup", __mouseUpEventListener);
  });
  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  const fn = function($event, state, x, y) {
    if (method({
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
  const mouseMoveEventListener = __mouseMoveEventListener = function($event) {
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
  const mouseUpEventListener = __mouseUpEventListener = function($event) {
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
const props$b = {
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
};
var index$a = /* @__PURE__ */ defineComponent({
  name: "Slider",
  props: props$b,
  emits: ["changing", "change"],
  setup(props2, {
    emit: emit2
  }) {
    const sliderRef = ref(null);
    const sliderValueRef = ref(null);
    const sliderHandleRef = ref(null);
    const sliderValue = ref(Number(props2.value));
    const trigger = useCustomEvent(sliderRef, emit2);
    const state = useSliderState(props2, sliderValue);
    const {
      _onClick,
      _onTrack
    } = useSliderLoader(props2, sliderValue, sliderRef, sliderValueRef, trigger);
    onMounted(() => {
      useTouchtrack(sliderHandleRef.value, _onTrack);
    });
    return () => {
      const {
        setBgColor,
        setBlockBg,
        setActiveColor,
        setBlockStyle
      } = state;
      return createVNode("uni-slider", {
        ref: sliderRef,
        onClick: _onClick
      }, [createVNode("div", {
        class: "uni-slider-wrapper"
      }, [createVNode("div", {
        class: "uni-slider-tap-area"
      }, [createVNode("div", {
        style: setBgColor.value,
        class: "uni-slider-handle-wrapper"
      }, [createVNode("div", {
        ref: sliderHandleRef,
        style: setBlockBg.value,
        class: "uni-slider-handle"
      }, null, 4), createVNode("div", {
        style: setBlockStyle.value,
        class: "uni-slider-thumb"
      }, null, 4), createVNode("div", {
        style: setActiveColor.value,
        class: "uni-slider-track"
      }, null, 4)], 4)]), withDirectives(createVNode("span", {
        ref: sliderValueRef,
        class: "uni-slider-value"
      }, [sliderValue.value], 512), [[vShow, props2.showValue]])]), createVNode("slot", null, null)], 8, ["onClick"]);
    };
  }
});
function useSliderState(props2, sliderValue) {
  const _getValueWidth = () => {
    const max = Number(props2.max);
    const min = Number(props2.min);
    return 100 * (sliderValue.value - min) / (max - min) + "%";
  };
  const _getBgColor = () => {
    return props2.backgroundColor !== "#e9e9e9" ? props2.backgroundColor : props2.color !== "#007aff" ? props2.color : "#007aff";
  };
  const _getActiveColor = () => {
    return props2.activeColor !== "#007aff" ? props2.activeColor : props2.selectedColor !== "#e9e9e9" ? props2.selectedColor : "#e9e9e9";
  };
  const state = {
    setBgColor: computed(() => ({
      backgroundColor: _getBgColor()
    })),
    setBlockBg: computed(() => ({
      left: _getValueWidth()
    })),
    setActiveColor: computed(() => ({
      backgroundColor: _getActiveColor(),
      width: _getValueWidth()
    })),
    setBlockStyle: computed(() => ({
      width: props2.blockSize + "px",
      height: props2.blockSize + "px",
      marginLeft: -props2.blockSize / 2 + "px",
      marginTop: -props2.blockSize / 2 + "px",
      left: _getValueWidth(),
      backgroundColor: props2.blockColor
    }))
  };
  return state;
}
function useSliderLoader(props2, sliderValue, sliderRef, sliderValueRef, trigger) {
  const _onClick = ($event) => {
    if (props2.disabled) {
      return;
    }
    _onUserChangedValue($event);
    trigger("change", $event, {
      value: sliderValue.value
    });
  };
  const _filterValue = (e2) => {
    const max = Number(props2.max);
    const min = Number(props2.min);
    const step = Number(props2.step);
    return e2 < min ? min : e2 > max ? max : computeController.mul.call(Math.round((e2 - min) / step), step) + min;
  };
  const _onUserChangedValue = (e2) => {
    const max = Number(props2.max);
    const min = Number(props2.min);
    const sliderRightBox = sliderValueRef.value;
    const sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft;
    let sliderRightBoxWidth = sliderRightBox.offsetWidth;
    sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft);
    const slider = sliderRef.value;
    const offsetWidth = slider.offsetWidth - (props2.showValue ? sliderRightBoxWidth : 0);
    const boxLeft = slider.getBoundingClientRect().left;
    const value = (e2.x - boxLeft) * (max - min) / offsetWidth + min;
    sliderValue.value = _filterValue(value);
  };
  const _onTrack = (e2) => {
    if (!props2.disabled) {
      return e2.detail.state === "move" ? (_onUserChangedValue({
        x: e2.detail.x0
      }), trigger("changing", e2, {
        value: sliderValue.value
      }), false) : e2.detail.state === "end" && trigger("change", e2, {
        value: sliderValue.value
      });
    }
  };
  const uniForm = inject(uniFormKey, false);
  if (!!uniForm) {
    const field = {
      reset: () => sliderValue.value = Number(props2.min),
      submit: () => {
        const data = ["", null];
        if (props2.name !== "") {
          data[0] = props2.name;
          data[1] = sliderValue.value;
        }
        return data;
      }
    };
    uniForm.addField(field);
    onBeforeUnmount(() => {
      uniForm.removeField(field);
    });
  }
  return {
    _onClick,
    _onTrack
  };
}
var computeController = {
  mul: function(arg) {
    let m = 0;
    let s1 = this.toString();
    let s2 = arg.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e2) {
    }
    try {
      m += s2.split(".")[1].length;
    } catch (e2) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }
};
const _sfc_main$3 = {
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
      callbacks2.forEach((callback2) => {
        callback2();
      });
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-swiper-item", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
_sfc_main$3.render = _sfc_render$3;
const props$a = {
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
};
var index$9 = /* @__PURE__ */ defineComponent({
  name: "Switch",
  props: props$a,
  emits: ["change"],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const switchChecked = ref(props2.checked);
    const uniLabel = useSwitchInject(props2, switchChecked);
    const trigger = useCustomEvent(rootRef, emit2);
    watch(() => props2.checked, (val) => {
      switchChecked.value = val;
    });
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      switchChecked.value = !switchChecked.value;
      trigger("change", $event, {
        value: switchChecked.value
      });
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    useListeners(props2, {
      "label-click": _onClick
    });
    return () => {
      const {
        color,
        type
      } = props2;
      const {
        booleanAttrs
      } = useBooleanAttr(props2, "disabled");
      return createVNode("uni-switch", mergeProps({
        ref: rootRef
      }, booleanAttrs, {
        onClick: _onClick
      }), [createVNode("div", {
        class: "uni-switch-wrapper"
      }, [withDirectives(createVNode("div", {
        class: ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
        style: {
          backgroundColor: switchChecked.value ? color : "#DFDFDF",
          borderColor: switchChecked.value ? color : "#DFDFDF"
        }
      }, null, 6), [[vShow, type === "switch"]]), withDirectives(createVNode("div", {
        class: "uni-checkbox-input"
      }, [switchChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 512), [[vShow, type === "checkbox"]])])], 16, ["onClick"]);
    };
  }
});
function useSwitchInject(props2, switchChecked) {
  const uniForm = inject(uniFormKey, false);
  const uniLabel = inject(uniLabelKey, false);
  const formField = {
    submit: () => {
      const data = ["", null];
      if (props2.name) {
        data[0] = props2.name;
        data[1] = switchChecked.value;
      }
      return data;
    },
    reset: () => {
      switchChecked.value = false;
    }
  };
  if (!!uniForm) {
    uniForm.addField(formField);
    onUnmounted(() => {
      uniForm.removeField(formField);
    });
  }
  return uniLabel;
}
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
var index$8 = /* @__PURE__ */ defineComponent({
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
  setup(props2, {
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
                space: props2.space,
                decode: props2.decode
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
        selectable: props2.selectable
      }, [createVNode("span", null, [children])], 8, ["selectable"]);
    };
  }
});
const props$9 = /* @__PURE__ */ Object.assign({}, props$g, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  },
  autoHeight: {
    type: [Boolean, String],
    default: false
  },
  confirmType: {
    type: String,
    default: ""
  }
});
var index$7 = /* @__PURE__ */ defineComponent({
  name: "Textarea",
  props: props$9,
  emit: ["confirm", "linechange", ...emit],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const {
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      trigger
    } = useField(props2, rootRef, emit2);
    const valueCompute = computed(() => state.value.split("\n"));
    const isDone = computed(() => ["done", "go", "next", "search", "send"].includes(props2.confirmType));
    const heightRef = ref(0);
    const lineRef = ref(null);
    watch(() => heightRef.value, (height) => {
      const el = rootRef.value;
      const lineEl = lineRef.value;
      let lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      if (isNaN(lineHeight)) {
        lineHeight = lineEl.offsetHeight;
      }
      var lineCount = Math.round(height / lineHeight);
      trigger("linechange", {}, {
        height,
        heightRpx: 750 / window.innerWidth * height,
        lineCount
      });
      if (props2.autoHeight) {
        el.style.height = height + "px";
      }
    });
    function onResize({
      height
    }) {
      heightRef.value = height;
    }
    function confirm(event) {
      trigger("confirm", event, {
        value: state.value
      });
    }
    function onKeyDownEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      if (isDone.value) {
        event.preventDefault();
      }
    }
    function onKeyUpEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      if (isDone.value) {
        confirm(event);
        const textarea = event.target;
        textarea.blur();
      }
    }
    const DARK_TEST_STRING = "(prefers-color-scheme: dark)";
    const fixMargin = String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING;
    return () => {
      let textareaNode = props2.disabled && fixDisabledColor ? createVNode("textarea", {
        ref: fieldRef,
        value: state.value,
        tabindex: "-1",
        readonly: !!props2.disabled,
        maxlength: state.maxlength,
        class: {
          "uni-textarea-textarea": true,
          "uni-textarea-textarea-fix-margin": fixMargin
        },
        style: {
          overflowY: props2.autoHeight ? "hidden" : "auto"
        },
        onFocus: (event) => event.target.blur()
      }, null, 46, ["value", "readonly", "maxlength", "onFocus"]) : createVNode("textarea", {
        ref: fieldRef,
        value: state.value,
        disabled: !!props2.disabled,
        maxlength: state.maxlength,
        enterkeyhint: props2.confirmType,
        class: {
          "uni-textarea-textarea": true,
          "uni-textarea-textarea-fix-margin": fixMargin
        },
        style: {
          overflowY: props2.autoHeight ? "hidden" : "auto"
        },
        onKeydown: onKeyDownEnter,
        onKeyup: onKeyUpEnter
      }, null, 46, ["value", "disabled", "maxlength", "enterkeyhint", "onKeydown", "onKeyup"]);
      return createVNode("uni-textarea", {
        ref: rootRef
      }, [createVNode("div", {
        class: "uni-textarea-wrapper"
      }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
        style: props2.placeholderStyle,
        class: ["uni-textarea-placeholder", props2.placeholderClass]
      }), [props2.placeholder], 16), [[vShow, !state.value.length]]), createVNode("div", {
        ref: lineRef,
        class: "uni-textarea-line"
      }, [" "], 512), createVNode("div", {
        class: "uni-textarea-compute"
      }, [valueCompute.value.map((item) => createVNode("div", null, [item.trim() ? item : "."])), createVNode(ResizeSensor, {
        initial: true,
        onResize
      }, null, 8, ["initial", "onResize"])]), props2.confirmType === "search" ? createVNode("form", {
        action: "",
        onSubmit: () => false,
        class: "uni-input-form"
      }, [textareaNode], 40, ["onSubmit"]) : textareaNode])], 512);
    };
  }
});
var index$6 = /* @__PURE__ */ defineComponent({
  name: "View",
  props: extend({}, hoverProps),
  setup(props2, {
    slots
  }) {
    const {
      hovering,
      binding
    } = useHover(props2);
    return () => {
      const hoverClass = props2.hoverClass;
      if (hoverClass && hoverClass !== "none") {
        return createVNode("uni-view", mergeProps({
          class: hovering.value ? hoverClass : ""
        }, binding), [slots.default && slots.default()], 16);
      }
      return createVNode("uni-view", null, [slots.default && slots.default()]);
    };
  }
});
function normalizeEvent(pageId, vm, id2) {
  if (!id2) {
    id2 = vm.id;
  }
  if (!id2) {
    return;
  }
  return pageId + "." + vm.$options.name.toLowerCase() + "." + id2;
}
function addSubscribe(name, callback2) {
  if (!name) {
    return;
  }
  UniViewJSBridge.subscribe(name, ({type, data}) => {
    callback2(type, data);
  });
}
function removeSubscribe(name) {
  if (!name) {
    return;
  }
  UniViewJSBridge.unsubscribe(name);
}
function useSubscribe(callback2, name) {
  const instance2 = getCurrentInstance();
  const vm = instance2.proxy;
  const pageId = name ? 0 : useCurrentPageId();
  onMounted(() => {
    addSubscribe(name || normalizeEvent(pageId, vm), callback2);
    if (!name) {
      watch(() => instance2.id, (value, oldValue) => {
        addSubscribe(normalizeEvent(pageId, vm, value), callback2);
        removeSubscribe(normalizeEvent(pageId, vm, oldValue));
      });
    }
  });
  onBeforeUnmount(() => {
    removeSubscribe(name || normalizeEvent(pageId, vm));
  });
}
function useOn(name, callback2) {
  onMounted(() => UniViewJSBridge.on(name, callback2));
  onBeforeUnmount(() => UniViewJSBridge.off(name));
}
function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]+/;
const useAttrs = (params = {}) => {
  const {excludeListeners = false, excludeKeys = []} = params;
  const instance2 = getCurrentInstance();
  const attrs2 = shallowRef({});
  const listeners = shallowRef({});
  const excludeAttrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance2.attrs = reactive(instance2.attrs);
  watchEffect(() => {
    const res = entries(instance2.attrs).reduce((acc, [key, val]) => {
      if (allExcludeKeys.includes(key)) {
        acc.exclude[key] = val;
      } else if (LISTENER_PREFIX.test(key)) {
        if (!excludeListeners) {
          acc.attrs[key] = val;
        }
        acc.listeners[key] = val;
      } else {
        acc.attrs[key] = val;
      }
      return acc;
    }, {
      exclude: {},
      attrs: {},
      listeners: {}
    });
    attrs2.value = res.attrs;
    listeners.value = res.listeners;
    excludeAttrs.value = res.exclude;
  });
  return {$attrs: attrs2, $listeners: listeners, $excludeAttrs: excludeAttrs};
};
function formatTime(val) {
  val = val > 0 && val < Infinity ? val : 0;
  const h = Math.floor(val / 3600);
  const m = Math.floor(val % 3600 / 60);
  const s = Math.floor(val % 3600 % 60);
  const hStr = (h < 10 ? "0" : "") + h;
  const mStr = (m < 10 ? "0" : "") + m;
  const sStr = (s < 10 ? "0" : "") + s;
  let str = mStr + ":" + sStr;
  if (hStr !== "00") {
    str = hStr + ":" + str;
  }
  return str;
}
function useGesture(props2, videoRef, fullscreenState) {
  const state = reactive({
    gestureType: "none",
    volumeOld: 0,
    volumeNew: 0,
    currentTimeOld: 0,
    currentTimeNew: 0
  });
  const touchStartOrigin = {
    x: 0,
    y: 0
  };
  function onTouchstart(event) {
    const toucher = event.targetTouches[0];
    touchStartOrigin.x = toucher.pageX;
    touchStartOrigin.y = toucher.pageY;
    state.gestureType = "none";
    state.volumeOld = 0;
    state.currentTimeOld = state.currentTimeNew = 0;
  }
  function onTouchmove(event) {
    function stop() {
      event.stopPropagation();
      event.preventDefault();
    }
    if (fullscreenState.fullscreen) {
      stop();
    }
    const gestureType = state.gestureType;
    if (gestureType === "stop") {
      return;
    }
    const toucher = event.targetTouches[0];
    const pageX = toucher.pageX;
    const pageY = toucher.pageY;
    const origin = touchStartOrigin;
    const video = videoRef.value;
    if (gestureType === "progress") {
      changeProgress(pageX - origin.x);
    } else if (gestureType === "volume") {
      changeVolume(pageY - origin.y);
    }
    if (gestureType !== "none") {
      return;
    }
    if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
      if (!props2.enableProgressGesture) {
        state.gestureType = "stop";
        return;
      }
      state.gestureType = "progress";
      state.currentTimeOld = state.currentTimeNew = video.currentTime;
      if (!fullscreenState.fullscreen) {
        stop();
      }
    } else {
      if (!props2.pageGesture) {
        state.gestureType = "stop";
        return;
      }
      state.gestureType = "volume";
      state.volumeOld = video.volume;
      if (!fullscreenState.fullscreen) {
        stop();
      }
    }
  }
  function onTouchend(event) {
    const video = videoRef.value;
    if (state.gestureType !== "none" && state.gestureType !== "stop") {
      event.stopPropagation();
      event.preventDefault();
    }
    if (state.gestureType === "progress" && state.currentTimeOld !== state.currentTimeNew) {
      video.currentTime = state.currentTimeNew;
    }
    state.gestureType = "none";
  }
  function changeProgress(x) {
    const video = videoRef.value;
    const duration = video.duration;
    let currentTimeNew = x / 600 * duration + state.currentTimeOld;
    if (currentTimeNew < 0) {
      currentTimeNew = 0;
    } else if (currentTimeNew > duration) {
      currentTimeNew = duration;
    }
    state.currentTimeNew = currentTimeNew;
  }
  function changeVolume(y) {
    const video = videoRef.value;
    const valueOld = state.volumeOld;
    let value;
    if (typeof valueOld === "number") {
      value = valueOld - y / 200;
      if (value < 0) {
        value = 0;
      } else if (value > 1) {
        value = 1;
      }
      video.volume = value;
      state.volumeNew = value;
    }
  }
  return {
    state,
    onTouchstart,
    onTouchmove,
    onTouchend
  };
}
function useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef) {
  const state = reactive({
    fullscreen: false
  });
  const isSafari = /^Apple/.test(navigator.vendor);
  function onFullscreenChange($event, webkit) {
    if (webkit && document.fullscreenEnabled) {
      return;
    }
    emitFullscreenChange(!!(document.fullscreenElement || document.webkitFullscreenElement));
  }
  function emitFullscreenChange(val) {
    state.fullscreen = val;
    trigger("fullscreenchange", {}, {
      fullScreen: val,
      direction: "vertical"
    });
  }
  function toggleFullscreen(val) {
    const root = rootRef.value;
    const container = containerRef.value;
    const video = videoRef.value;
    let mockFullScreen;
    if (val) {
      if ((document.fullscreenEnabled || document.webkitFullscreenEnabled) && (!isSafari || userActionState.userAction)) {
        container[document.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]();
      } else if (video.webkitEnterFullScreen) {
        video.webkitEnterFullScreen();
      } else {
        mockFullScreen = true;
        container.remove();
        container.classList.add("uni-video-type-fullscreen");
        document.body.appendChild(container);
      }
    } else {
      if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
          document.webkitExitFullscreen();
        }
      } else if (video.webkitExitFullScreen) {
        video.webkitExitFullScreen();
      } else {
        mockFullScreen = true;
        container.remove();
        container.classList.remove("uni-video-type-fullscreen");
        root.appendChild(container);
      }
    }
    if (mockFullScreen) {
      emitFullscreenChange(val);
    }
  }
  function requestFullScreen() {
    toggleFullscreen(true);
  }
  function exitFullScreen() {
    toggleFullscreen(false);
  }
  onBeforeUnmount(exitFullScreen);
  return {
    state,
    onFullscreenChange,
    emitFullscreenChange,
    toggleFullscreen,
    requestFullScreen,
    exitFullScreen
  };
}
function useVideo(props2, attrs2, trigger) {
  const videoRef = ref(null);
  const src = computed(() => getRealPath(props2.src));
  const state = reactive({
    start: false,
    src,
    playing: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    buffered: 0
  });
  watch(() => src.value, () => {
    state.playing = false;
    state.currentTime = 0;
  });
  watch(() => state.buffered, (buffered) => {
    trigger("progress", {}, {
      buffered
    });
  });
  function onDurationChange({
    target
  }) {
    state.duration = target.duration;
  }
  function onLoadedMetadata($event) {
    const initialTime = Number(props2.initialTime) || 0;
    const video = $event.target;
    if (initialTime > 0) {
      video.currentTime = initialTime;
    }
    trigger("loadedmetadata", $event, {
      width: video.videoWidth,
      height: video.videoHeight,
      duration: video.duration
    });
    onProgress($event);
  }
  function onProgress($event) {
    const video = $event.target;
    const buffered = video.buffered;
    if (buffered.length) {
      state.buffered = buffered.end(buffered.length - 1) / video.duration * 100;
    }
  }
  function onWaiting($event) {
    trigger("waiting", $event, {});
  }
  function onVideoError($event) {
    state.playing = false;
    trigger("error", $event, {});
  }
  function onPlay($event) {
    state.start = true;
    state.playing = true;
    trigger("play", $event, {});
  }
  function onPause($event) {
    state.playing = false;
    trigger("pause", $event, {});
  }
  function onEnded($event) {
    state.playing = false;
    trigger("ended", $event, {});
  }
  function onTimeUpdate($event) {
    const video = $event.target;
    const currentTime = state.currentTime = video.currentTime;
    trigger("timeupdate", $event, {
      currentTime,
      duration: video.duration
    });
  }
  function toggle() {
    const video = videoRef.value;
    if (state.playing) {
      video.pause();
    } else {
      video.play();
    }
  }
  function play() {
    const video = videoRef.value;
    state.start = true;
    video.play();
  }
  function pause() {
    const video = videoRef.value;
    video.pause();
  }
  function seek(position) {
    const video = videoRef.value;
    position = Number(position);
    if (typeof position === "number" && !isNaN(position)) {
      video.currentTime = position;
    }
  }
  function playbackRate(rate) {
    const video = videoRef.value;
    video.playbackRate = rate;
  }
  return {
    videoRef,
    state,
    play,
    pause,
    seek,
    playbackRate,
    toggle,
    onDurationChange,
    onLoadedMetadata,
    onProgress,
    onWaiting,
    onVideoError,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate
  };
}
function useControls(props2, videoState, seek) {
  const progressRef = ref(null);
  const ballRef = ref(null);
  const centerPlayBtnShow = computed(() => props2.showCenterPlayBtn && !videoState.start);
  const controlsVisible = ref(true);
  const controlsShow = computed(() => !centerPlayBtnShow.value && props2.controls && controlsVisible.value);
  const state = reactive({
    touching: false,
    controlsTouching: false,
    centerPlayBtnShow,
    controlsShow,
    controlsVisible
  });
  function clickProgress(event) {
    const $progress = progressRef.value;
    let element = event.target;
    let x = event.offsetX;
    while (element && element !== $progress) {
      x += element.offsetLeft;
      element = element.parentNode;
    }
    const w = $progress.offsetWidth;
    let progress = 0;
    if (x >= 0 && x <= w) {
      progress = x / w;
      seek(videoState.duration * progress);
    }
  }
  function toggleControls() {
    state.controlsVisible = !state.controlsVisible;
  }
  let hideTiming;
  function autoHideStart() {
    hideTiming = setTimeout(() => {
      state.controlsVisible = false;
    }, 3e3);
  }
  function autoHideEnd() {
    if (hideTiming) {
      clearTimeout(hideTiming);
      hideTiming = null;
    }
  }
  onBeforeUnmount(() => {
    if (hideTiming) {
      clearTimeout(hideTiming);
    }
  });
  watch(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
    if (val) {
      autoHideStart();
    } else {
      autoHideEnd();
    }
  });
  watch([() => videoState.currentTime, () => {
    props2.duration;
  }], function updateProgress() {
    if (!state.touching) {
      videoState.progress = videoState.currentTime / videoState.duration * 100;
    }
  });
  onMounted(() => {
    const passiveOptions2 = passive(false);
    let originX;
    let originY;
    let moveOnce = true;
    let originProgress;
    const ball = ballRef.value;
    function touchmove2(event) {
      const toucher = event.targetTouches[0];
      const pageX = toucher.pageX;
      const pageY = toucher.pageY;
      if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
        touchend(event);
        return;
      }
      moveOnce = false;
      const progressEl = progressRef.value;
      const w = progressEl.offsetWidth;
      let progress = originProgress + (pageX - originX) / w * 100;
      if (progress < 0) {
        progress = 0;
      } else if (progress > 100) {
        progress = 100;
      }
      videoState.progress = progress;
      event.preventDefault();
      event.stopPropagation();
    }
    function touchend(event) {
      state.controlsTouching = false;
      if (state.touching) {
        ball.removeEventListener("touchmove", touchmove2, passiveOptions2);
        if (!moveOnce) {
          event.preventDefault();
          event.stopPropagation();
          seek(videoState.duration * videoState.progress / 100);
        }
        state.touching = false;
      }
    }
    ball.addEventListener("touchstart", (event) => {
      state.controlsTouching = true;
      const toucher = event.targetTouches[0];
      originX = toucher.pageX;
      originY = toucher.pageY;
      originProgress = videoState.progress;
      moveOnce = true;
      state.touching = true;
      ball.addEventListener("touchmove", touchmove2, passiveOptions2);
    });
    ball.addEventListener("touchend", touchend);
    ball.addEventListener("touchcancel", touchend);
  });
  return {
    state,
    progressRef,
    ballRef,
    clickProgress,
    toggleControls,
    autoHideStart,
    autoHideEnd
  };
}
function useDanmu(props2, videoState) {
  const danmuRef = ref(null);
  const state = reactive({
    enable: Boolean(props2.enableDanmu)
  });
  let danmuIndex = {
    time: 0,
    index: -1
  };
  const danmuList = Array.isArray(props2.danmuList) ? JSON.parse(JSON.stringify(props2.danmuList)) : [];
  danmuList.sort(function(a2, b) {
    return (a2.time || 0) - (b.time || 0);
  });
  function toggleDanmu() {
    state.enable = !state.enable;
  }
  function updateDanmu(event) {
    const video = event.target;
    const currentTime = video.currentTime;
    const oldDanmuIndex = danmuIndex;
    const newDanmuIndex = {
      time: currentTime,
      index: oldDanmuIndex.index
    };
    if (currentTime > oldDanmuIndex.time) {
      for (let index2 = oldDanmuIndex.index + 1; index2 < danmuList.length; index2++) {
        const element = danmuList[index2];
        if (currentTime >= (element.time || 0)) {
          newDanmuIndex.index = index2;
          if (videoState.playing && state.enable) {
            playDanmu(element);
          }
        } else {
          break;
        }
      }
    } else if (currentTime < oldDanmuIndex.time) {
      for (let index2 = oldDanmuIndex.index - 1; index2 > -1; index2--) {
        const element = danmuList[index2];
        if (currentTime <= (element.time || 0)) {
          newDanmuIndex.index = index2 - 1;
        } else {
          break;
        }
      }
    }
    danmuIndex = newDanmuIndex;
  }
  function playDanmu(danmu) {
    const p2 = document.createElement("p");
    p2.className = "uni-video-danmu-item";
    p2.innerText = danmu.text;
    let style2 = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`;
    p2.setAttribute("style", style2);
    const danmuEl = danmuRef.value;
    danmuEl.appendChild(p2);
    setTimeout(function() {
      style2 += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);";
      p2.setAttribute("style", style2);
      setTimeout(function() {
        p2.remove();
      }, 4e3);
    }, 17);
  }
  function sendDanmu(danmu) {
    danmuList.splice(danmuIndex.index + 1, 0, {
      text: String(danmu.text),
      color: danmu.color,
      time: videoState.currentTime || 0
    });
  }
  return {
    state,
    danmuRef,
    updateDanmu,
    toggleDanmu,
    sendDanmu
  };
}
function useContext(play, pause, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen) {
  const methods = {
    play,
    pause,
    seek,
    sendDanmu,
    playbackRate,
    requestFullScreen,
    exitFullScreen
  };
  useSubscribe((type, data) => {
    let options;
    switch (type) {
      case "seek":
        options = data.position;
        break;
      case "sendDanmu":
        options = data;
        break;
      case "playbackRate":
        options = data.rate;
        break;
    }
    if (type in methods) {
      methods[type](options);
    }
  });
}
const props$8 = {
  id: {
    type: String,
    default: ""
  },
  src: {
    type: String,
    default: ""
  },
  duration: {
    type: [Number, String],
    default: ""
  },
  controls: {
    type: [Boolean, String],
    default: true
  },
  danmuList: {
    type: Array,
    default() {
      return [];
    }
  },
  danmuBtn: {
    type: [Boolean, String],
    default: false
  },
  enableDanmu: {
    type: [Boolean, String],
    default: false
  },
  autoplay: {
    type: [Boolean, String],
    default: false
  },
  loop: {
    type: [Boolean, String],
    default: false
  },
  muted: {
    type: [Boolean, String],
    default: false
  },
  objectFit: {
    type: String,
    default: "contain"
  },
  poster: {
    type: String,
    default: ""
  },
  direction: {
    type: [String, Number],
    default: ""
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  initialTime: {
    type: [String, Number],
    default: 0
  },
  showFullscreenBtn: {
    type: [Boolean, String],
    default: true
  },
  pageGesture: {
    type: [Boolean, String],
    default: false
  },
  enableProgressGesture: {
    type: [Boolean, String],
    default: true
  },
  showPlayBtn: {
    type: [Boolean, String],
    default: true
  },
  showCenterPlayBtn: {
    type: [Boolean, String],
    default: true
  }
};
var index$5 = /* @__PURE__ */ defineComponent({
  name: "Video",
  props: props$8,
  emits: ["fullscreenchange", "progress", "loadedmetadata", "waiting", "error", "play", "pause", "ended", "timeupdate"],
  setup(props2, {
    emit: emit2,
    attrs: attrs2,
    slots
  }) {
    const rootRef = ref(null);
    const containerRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      state: userActionState
    } = useUserAction();
    const {
      $attrs: videoAttrs
    } = useAttrs({
      excludeListeners: true
    });
    const {
      t: t2
    } = useI18n();
    initI18nVideoMsgsOnce();
    const {
      videoRef,
      state: videoState,
      play,
      pause,
      seek,
      playbackRate,
      toggle,
      onDurationChange,
      onLoadedMetadata,
      onProgress,
      onWaiting,
      onVideoError,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate
    } = useVideo(props2, attrs2, trigger);
    const {
      state: danmuState,
      danmuRef,
      updateDanmu,
      toggleDanmu,
      sendDanmu
    } = useDanmu(props2, videoState);
    const {
      state: fullscreenState,
      onFullscreenChange,
      emitFullscreenChange,
      toggleFullscreen,
      requestFullScreen,
      exitFullScreen
    } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef);
    const {
      state: gestureState,
      onTouchstart,
      onTouchend,
      onTouchmove
    } = useGesture(props2, videoRef, fullscreenState);
    const {
      state: controlsState,
      progressRef,
      ballRef,
      clickProgress,
      toggleControls
    } = useControls(props2, videoState, seek);
    useContext(play, pause, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen);
    return () => {
      return createVNode("uni-video", {
        ref: rootRef,
        id: props2.id
      }, [createVNode("div", {
        ref: containerRef,
        class: "uni-video-container",
        onTouchstart,
        onTouchend,
        onTouchmove,
        onFullscreenchange: withModifiers(onFullscreenChange, ["stop"]),
        onWebkitfullscreenchange: withModifiers(($event) => onFullscreenChange($event, true), ["stop"])
      }, [createVNode("video", mergeProps({
        ref: videoRef,
        style: {
          "object-fit": props2.objectFit
        },
        muted: !!props2.muted,
        loop: !!props2.loop,
        src: videoState.src,
        poster: props2.poster,
        autoplay: !!props2.autoplay
      }, videoAttrs.value, {
        class: "uni-video-video",
        "webkit-playsinline": true,
        playsinline: true,
        onClick: toggleControls,
        onDurationchange: onDurationChange,
        onLoadedmetadata: onLoadedMetadata,
        onProgress,
        onWaiting,
        onError: onVideoError,
        onPlay,
        onPause,
        onEnded,
        onTimeupdate: (event) => {
          onTimeUpdate(event);
          updateDanmu(event);
        },
        onWebkitbeginfullscreen: () => emitFullscreenChange(true),
        onX5videoenterfullscreen: () => emitFullscreenChange(true),
        onWebkitendfullscreen: () => emitFullscreenChange(false),
        onX5videoexitfullscreen: () => emitFullscreenChange(false)
      }), null, 16, ["muted", "loop", "src", "poster", "autoplay", "webkit-playsinline", "playsinline", "onClick", "onDurationchange", "onLoadedmetadata", "onProgress", "onWaiting", "onError", "onPlay", "onPause", "onEnded", "onTimeupdate", "onWebkitbeginfullscreen", "onX5videoenterfullscreen", "onWebkitendfullscreen", "onX5videoexitfullscreen"]), withDirectives(createVNode("div", {
        class: "uni-video-bar uni-video-bar-full",
        onClick: withModifiers(() => {
        }, ["stop"])
      }, [createVNode("div", {
        class: "uni-video-controls"
      }, [withDirectives(createVNode("div", {
        class: {
          "uni-video-control-button": true,
          "uni-video-control-button-play": !videoState.playing,
          "uni-video-control-button-pause": videoState.playing
        },
        onClick: withModifiers(toggle, ["stop"])
      }, null, 10, ["onClick"]), [[vShow, props2.showPlayBtn]]), createVNode("div", {
        class: "uni-video-current-time"
      }, [formatTime(videoState.currentTime)]), createVNode("div", {
        ref: progressRef,
        class: "uni-video-progress-container",
        onClick: withModifiers(clickProgress, ["stop"])
      }, [createVNode("div", {
        class: "uni-video-progress"
      }, [createVNode("div", {
        style: {
          width: videoState.buffered + "%"
        },
        class: "uni-video-progress-buffered"
      }, null, 4), createVNode("div", {
        ref: ballRef,
        style: {
          left: videoState.progress + "%"
        },
        class: "uni-video-ball"
      }, [createVNode("div", {
        class: "uni-video-inner"
      }, null)], 4)])], 8, ["onClick"]), createVNode("div", {
        class: "uni-video-duration"
      }, [formatTime(Number(props2.duration) || videoState.duration)])]), withDirectives(createVNode("div", {
        class: {
          "uni-video-danmu-button": true,
          "uni-video-danmu-button-active": danmuState.enable
        },
        onClick: withModifiers(toggleDanmu, ["stop"])
      }, [t2("uni.video.danmu")], 10, ["onClick"]), [[vShow, props2.danmuBtn]]), withDirectives(createVNode("div", {
        class: {
          "uni-video-fullscreen": true,
          "uni-video-type-fullscreen": fullscreenState.fullscreen
        },
        onClick: withModifiers(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
      }, null, 10, ["onClick"]), [[vShow, props2.showFullscreenBtn]])], 8, ["onClick"]), [[vShow, controlsState.controlsShow]]), withDirectives(createVNode("div", {
        ref: danmuRef,
        style: "z-index: 0;",
        class: "uni-video-danmu"
      }, null, 512), [[vShow, videoState.start && danmuState.enable]]), controlsState.centerPlayBtnShow && createVNode("div", {
        class: "uni-video-cover",
        onClick: withModifiers(() => {
        }, ["stop"])
      }, [createVNode("div", {
        class: "uni-video-cover-play-button",
        onClick: withModifiers(play, ["stop"])
      }, null, 8, ["onClick"]), createVNode("p", {
        class: "uni-video-cover-duration"
      }, [formatTime(Number(props2.duration) || videoState.duration)])], 8, ["onClick"]), createVNode("div", {
        class: {
          "uni-video-toast": true,
          "uni-video-toast-volume": gestureState.gestureType === "volume"
        }
      }, [createVNode("div", {
        class: "uni-video-toast-title"
      }, [t2("uni.video.volume")]), createVNode("svg", {
        class: "uni-video-toast-icon",
        width: "200px",
        height: "200px",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg"
      }, [createVNode("path", {
        d: "M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"
      }, null)]), createVNode("div", {
        class: "uni-video-toast-value"
      }, [createVNode("div", {
        style: {
          width: gestureState.volumeNew * 100 + "%"
        },
        class: "uni-video-toast-value-content"
      }, [createVNode("div", {
        class: "uni-video-toast-volume-grids"
      }, [renderList(10, () => createVNode("div", {
        class: "uni-video-toast-volume-grids-item"
      }, null))])], 4)])], 2), createVNode("div", {
        class: {
          "uni-video-toast": true,
          "uni-video-toast-progress": gestureState.gestureType === "progress"
        }
      }, [createVNode("div", {
        class: "uni-video-toast-title"
      }, [formatTime(gestureState.currentTimeNew), " / ", formatTime(videoState.duration)])], 2), createVNode("div", {
        class: "uni-video-slots"
      }, [slots.default && slots.default()])], 40, ["onTouchstart", "onTouchend", "onTouchmove", "onFullscreenchange", "onWebkitfullscreenchange"])], 8, ["id"]);
    };
  }
});
const props$7 = {
  src: {
    type: String,
    default: ""
  }
};
var index$4 = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  name: "WebView",
  props: props$7,
  setup(props2, {
    attrs: attrs2
  }) {
    const rootRef = ref(null);
    const iframeRef = ref(null);
    const _resize = useWebViewSize(rootRef, iframeRef);
    const {
      $attrs,
      $excludeAttrs,
      $listeners
    } = useAttrs({
      excludeListeners: true
    });
    onMounted(() => {
      _resize();
    });
    onActivated(() => {
      iframeRef.value && (iframeRef.value.style.display = "block");
    });
    onDeactivated(() => {
      iframeRef.value && (iframeRef.value.style.display = "none");
    });
    return () => {
      return createVNode(Fragment, null, [createVNode("uni-web-view", mergeProps($listeners.value, $excludeAttrs.value, {
        ref: rootRef
      }), [createVNode(ResizeSensor, {
        onResize: _resize
      }, null, 8, ["onResize"])], 16), createVNode(Teleport, {
        to: "body"
      }, {
        default: () => [createVNode("iframe", mergeProps({
          ref: iframeRef,
          src: getRealPath(props2.src)
        }, $attrs.value), null, 16, ["src"])]
      })]);
    };
  }
});
function useWebViewSize(rootRef, iframeRef) {
  const _resize = () => {
    const {
      top,
      left,
      width,
      height
    } = rootRef.value.getBoundingClientRect();
    iframeRef.value && updateElementStyle(iframeRef.value, {
      position: "absolute",
      display: "block",
      border: "0",
      top: top + "px",
      left: left + "px",
      width: width + "px",
      height: height + "px"
    });
  };
  return _resize;
}
function callback(options, data) {
  options = options || {};
  if (typeof data === "string") {
    data = {
      errMsg: data
    };
  }
  if (/:ok$/.test(data.errMsg)) {
    if (typeof options.success === "function") {
      options.success(data);
    }
  } else {
    if (typeof options.fail === "function") {
      options.fail(data);
    }
  }
  if (typeof options.complete === "function") {
    options.complete(data);
  }
}
function createCallout(maps2) {
  const overlay = new maps2.Overlay();
  class Callout {
    constructor(option = {}) {
      this.setMap = overlay.setMap;
      this.getMap = overlay.getMap;
      this.getPanes = overlay.getPanes;
      this.getProjection = overlay.getProjection;
      this.map_changed = overlay.map_changed;
      this.set = overlay.set;
      this.get = overlay.get;
      this.setOptions = overlay.setOptions;
      this.bindTo = overlay.bindTo;
      this.bindsTo = overlay.bindsTo;
      this.notify = overlay.notify;
      this.setValues = overlay.setValues;
      this.unbind = overlay.unbind;
      this.unbindAll = overlay.unbindAll;
      this.option = option || {};
      const map = option.map;
      this.position = option.position;
      this.index = 1;
      const visible = this.visible = this.alwaysVisible = option.display === "ALWAYS";
      const div = this.div = document.createElement("div");
      const divStyle = div.style;
      divStyle.position = "absolute";
      divStyle.whiteSpace = "nowrap";
      divStyle.transform = "translateX(-50%) translateY(-100%)";
      divStyle.zIndex = "1";
      divStyle.boxShadow = option.boxShadow || "none";
      divStyle.display = visible ? "block" : "none";
      const triangle = this.triangle = document.createElement("div");
      triangle.setAttribute("style", "position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;");
      this.setStyle(option);
      div.appendChild(triangle);
      if (map) {
        this.setMap(map);
      }
    }
    set onclick(callback2) {
      this.div.onclick = callback2;
    }
    get onclick() {
      return this.div.onclick;
    }
    construct() {
      const div = this.div;
      const panes = this.getPanes();
      panes.floatPane.appendChild(div);
    }
    setOption(option) {
      this.option = option;
      this.setPosition(option.position);
      if (option.display === "ALWAYS") {
        this.alwaysVisible = this.visible = true;
      } else {
        this.alwaysVisible = false;
      }
      this.setStyle(option);
    }
    setStyle(option) {
      const div = this.div;
      const divStyle = div.style;
      div.innerText = option.content || "";
      divStyle.lineHeight = (option.fontSize || 14) + "px";
      divStyle.fontSize = (option.fontSize || 14) + "px";
      divStyle.padding = (option.padding || 8) + "px";
      divStyle.color = option.color || "#000";
      divStyle.borderRadius = (option.borderRadius || 0) + "px";
      divStyle.backgroundColor = option.bgColor || "#fff";
      divStyle.marginTop = "-" + ((option.top || 0) + 5) + "px";
      this.triangle.style.borderColor = `${option.bgColor || "#fff"} transparent transparent`;
    }
    setPosition(position) {
      this.position = position;
      this.draw();
    }
    draw() {
      const overlayProjection = this.getProjection();
      if (!this.position || !this.div || !overlayProjection) {
        return;
      }
      const pixel = overlayProjection.fromLatLngToDivPixel(this.position);
      const divStyle = this.div.style;
      divStyle.left = pixel.x + "px";
      divStyle.top = pixel.y + "px";
    }
    changed() {
      const divStyle = this.div.style;
      divStyle.display = this.visible ? "block" : "none";
    }
    destroy() {
      const parentNode = this.div.parentNode;
      if (parentNode) {
        parentNode.removeChild(this.div);
      }
    }
  }
  return Callout;
}
let maps;
const callbacks = [];
const QQ_MAP_CALLBACKNAME = "__qq_map_callback__";
function loadMaps(callback2) {
  if (maps) {
    callback2(maps);
  } else if (window.qq && window.qq.maps) {
    maps = window.qq.maps;
    callback2(maps);
  } else if (callbacks.length) {
    callbacks.push(callback2);
  } else {
    callbacks.push(callback2);
    const key = __uniConfig.qqMapKey;
    const globalExt = window;
    globalExt[QQ_MAP_CALLBACKNAME] = function() {
      delete globalExt[QQ_MAP_CALLBACKNAME];
      maps = window.qq.maps;
      maps.Callout = createCallout(maps);
      callbacks.forEach((callback22) => callback22(maps));
      callbacks.length = 0;
    };
    const script = document.createElement("script");
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=${QQ_MAP_CALLBACKNAME}&libraries=geometry`;
    document.body.appendChild(script);
  }
}
const props$6 = {
  id: {
    type: [Number, String],
    default: ""
  },
  latitude: {
    type: [Number, String],
    require: true
  },
  longitude: {
    type: [Number, String],
    require: true
  },
  title: {
    type: String,
    default: ""
  },
  iconPath: {
    type: String,
    require: true
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  alpha: {
    type: [Number, String],
    default: 1
  },
  width: {
    type: [Number, String],
    default: ""
  },
  height: {
    type: [Number, String],
    default: ""
  },
  callout: {
    type: Object,
    default: null
  },
  label: {
    type: Object,
    default: null
  },
  anchor: {
    type: Object,
    default: null
  },
  clusterId: {
    type: [Number, String],
    default: ""
  },
  customCallout: {
    type: Object,
    default: null
  },
  ariaLabel: {
    type: String,
    default: ""
  }
};
var MapMarker = /* @__PURE__ */ defineComponent({
  name: "MapMarker",
  props: props$6,
  setup(props2) {
    const id2 = String(Number(props2.id) !== NaN ? props2.id : "");
    const onMapReady = inject("onMapReady");
    let marker;
    function removeMarker() {
      if (marker) {
        if (marker.label) {
          marker.label.setMap(null);
        }
        if (marker.callout) {
          marker.callout.setMap(null);
        }
        marker.setMap(null);
      }
    }
    onMapReady((map, maps2, trigger) => {
      function updateMarker(option) {
        const title = option.title;
        const position = new maps2.LatLng(option.latitude, option.longitude);
        const img = new Image();
        img.onload = () => {
          const anchor = option.anchor || {};
          let icon;
          let w;
          let h;
          let top;
          let x = anchor.x;
          let y = anchor.y;
          if (option.iconPath && (option.width || option.height)) {
            w = option.width || img.width / img.height * option.height;
            h = option.height || img.height / img.width * option.width;
          } else {
            w = img.width / 2;
            h = img.height / 2;
          }
          x = (typeof x === "number" ? x : 0.5) * w;
          y = (typeof y === "number" ? y : 1) * h;
          top = h - (h - y);
          icon = new maps2.MarkerImage(img.src, null, null, new maps2.Point(x, y), new maps2.Size(w, h));
          marker.setPosition(position);
          marker.setIcon(icon);
          marker.setRotation(option.rotate || 0);
          const labelOpt = option.label || {};
          if (marker.label) {
            marker.label.setMap(null);
            delete marker.label;
          }
          let label;
          if (labelOpt.content) {
            label = new maps2.Label({
              position,
              map,
              clickable: false,
              content: labelOpt.content,
              style: {
                border: "none",
                padding: "8px",
                background: "none",
                color: labelOpt.color,
                fontSize: (labelOpt.fontSize || 14) + "px",
                lineHeight: (labelOpt.fontSize || 14) + "px",
                marginLeft: labelOpt.x,
                marginTop: labelOpt.y
              }
            });
            marker.label = label;
          }
          const calloutOpt = option.callout || {};
          let callout = marker.callout;
          let calloutStyle;
          if (calloutOpt.content || title) {
            calloutStyle = calloutOpt.content ? {
              position,
              map,
              top,
              content: calloutOpt.content,
              color: calloutOpt.color,
              fontSize: calloutOpt.fontSize,
              borderRadius: calloutOpt.borderRadius,
              bgColor: calloutOpt.bgColor,
              padding: calloutOpt.padding,
              boxShadow: calloutOpt.boxShadow,
              display: calloutOpt.display
            } : {
              position,
              map,
              top,
              content: title,
              boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.5)"
            };
            if (callout) {
              callout.setOption(calloutStyle);
            } else {
              callout = marker.callout = new maps2.Callout(calloutStyle);
              callout.div.onclick = function($event) {
                if (id2 !== "") {
                  trigger("callouttap", $event, {
                    markerId: Number(id2)
                  });
                }
                $event.stopPropagation();
                $event.preventDefault();
              };
            }
          } else {
            if (callout) {
              callout.setMap(null);
              delete marker.callout;
            }
          }
        };
        img.src = getRealPath(option.iconPath);
      }
      function addMarker(props3) {
        marker = new maps2.Marker({
          map,
          flat: true,
          autoRotation: false
        });
        updateMarker(props3);
        maps2.event.addListener(marker, "click", () => {
          const callout = marker.callout;
          if (callout) {
            const div = callout.div;
            const parent = div.parentNode;
            if (!callout.alwaysVisible) {
              callout.set("visible", !callout.visible);
            }
            if (callout.visible) {
              parent.removeChild(div);
              parent.appendChild(div);
            }
          }
          if (id2) {
            trigger("markertap", {}, {
              markerId: Number(id2)
            });
          }
        });
      }
      addMarker(props2);
      watch(props2, updateMarker);
    });
    if (id2) {
      const addMapChidlContext = inject("addMapChidlContext");
      const removeMapChidlContext = inject("removeMapChidlContext");
      const context = {
        id: id2,
        translate(data) {
          onMapReady((map, maps2, trigger) => {
            const destination = data.destination;
            const duration = data.duration;
            const autoRotate = !!data.autoRotate;
            let rotate = Number(data.rotate) || 0;
            const rotation = marker.getRotation();
            const a2 = marker.getPosition();
            const b = new maps2.LatLng(destination.latitude, destination.longitude);
            const distance = maps2.geometry.spherical.computeDistanceBetween(a2, b) / 1e3;
            const time = (typeof duration === "number" ? duration : 1e3) / (1e3 * 60 * 60);
            const speed = distance / time;
            const movingEvent = maps2.event.addListener(marker, "moving", (e2) => {
              const latLng = e2.latLng;
              const label = marker.label;
              if (label) {
                label.setPosition(latLng);
              }
              const callout = marker.callout;
              if (callout) {
                callout.setPosition(latLng);
              }
            });
            const event = maps2.event.addListener(marker, "moveend", () => {
              event.remove();
              movingEvent.remove();
              marker.lastPosition = a2;
              marker.setPosition(b);
              const label = marker.label;
              if (label) {
                label.setPosition(b);
              }
              const callout = marker.callout;
              if (callout) {
                callout.setPosition(b);
              }
              const cb = data.animationEnd;
              if (typeof cb === "function") {
                cb();
              }
            });
            let lastRtate = 0;
            if (autoRotate) {
              if (marker.lastPosition) {
                lastRtate = maps2.geometry.spherical.computeHeading(marker.lastPosition, a2);
              }
              rotate = maps2.geometry.spherical.computeHeading(a2, b) - lastRtate;
            }
            marker.setRotation(rotation + rotate);
            marker.moveTo(b, speed);
          });
        }
      };
      addMapChidlContext(context);
      onUnmounted(() => removeMapChidlContext(context));
    }
    onUnmounted(removeMarker);
    return () => {
      return null;
    };
  }
});
const props$5 = {
  points: {
    type: Array,
    require: true
  },
  color: {
    type: String,
    default: "#000000"
  },
  width: {
    type: [Number, String],
    default: ""
  },
  dottedLine: {
    type: [Boolean, String],
    default: false
  },
  arrowLine: {
    type: [Boolean, String],
    default: false
  },
  arrowIconPath: {
    type: String,
    default: ""
  },
  borderColor: {
    type: String,
    default: "#000000"
  },
  borderWidth: {
    type: [Number, String],
    default: ""
  },
  colorList: {
    type: Array,
    default() {
      return [];
    }
  },
  level: {
    type: String,
    default: ""
  }
};
var MapPolyline = /* @__PURE__ */ defineComponent({
  name: "MapPolyline",
  props: props$5,
  setup(props2) {
    const onMapReady = inject("onMapReady");
    let polyline;
    let polylineBorder;
    function removePolyline() {
      if (polyline) {
        polyline.setMap(null);
      }
      if (polylineBorder) {
        polylineBorder.setMap(null);
      }
    }
    onMapReady((map, maps2) => {
      function updatePolyline(option) {
        removePolyline();
        addPolyline(option);
      }
      function addPolyline(option) {
        const path = [];
        option.points.forEach((point) => {
          path.push(new maps2.LatLng(point.latitude, point.longitude));
        });
        const strokeWeight = Number(option.width) || 1;
        polyline = new maps2.Polyline({
          map,
          clickable: false,
          path,
          strokeWeight,
          strokeColor: option.color || void 0,
          strokeDashStyle: option.dottedLine ? "dash" : "solid"
        });
        const borderWidth = Number(option.borderWidth) || 0;
        if (borderWidth) {
          polylineBorder = new maps2.Polyline({
            map,
            clickable: false,
            path,
            strokeWeight: strokeWeight + borderWidth * 2,
            strokeColor: option.borderColor || void 0,
            strokeDashStyle: option.dottedLine ? "dash" : "solid"
          });
        }
      }
      addPolyline(props2);
      watch(props2, updatePolyline);
    });
    onUnmounted(removePolyline);
    return () => {
      return null;
    };
  }
});
const props$4 = {
  latitude: {
    type: [Number, String],
    require: true
  },
  longitude: {
    type: [Number, String],
    require: true
  },
  color: {
    type: String,
    default: ""
  },
  fillColor: {
    type: String,
    default: ""
  },
  radius: {
    type: [Number, String],
    require: true
  },
  strokeWidth: {
    type: [Number, String],
    default: ""
  },
  level: {
    type: String,
    default: ""
  }
};
var MapCircle = /* @__PURE__ */ defineComponent({
  name: "MapCircle",
  props: props$4,
  setup(props2) {
    const onMapReady = inject("onMapReady");
    let circle;
    function removeCircle() {
      if (circle) {
        circle.setMap(null);
      }
    }
    onMapReady((map, maps2) => {
      function updateCircle(option) {
        removeCircle();
        addCircle(option);
      }
      function addCircle(option) {
        const center = new maps2.LatLng(option.latitude, option.longitude);
        function getColor(color) {
          const c = color.match(/#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?/);
          if (c && c.length) {
            return maps2.Color.fromHex(c[0], Number("0x" + c[1] || 255) / 255);
          } else {
            return void 0;
          }
        }
        circle = new maps2.Circle({
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          fillColor: getColor(option.fillColor) || getColor("#00000001"),
          strokeColor: getColor(option.color) || "#000000",
          strokeDashStyle: "solid"
        });
      }
      addCircle(props2);
      watch(props2, updateCircle);
    });
    onUnmounted(removeCircle);
    return () => {
      return null;
    };
  }
});
const props$3 = {
  id: {
    type: [Number, String],
    default: ""
  },
  position: {
    type: Object,
    require: true
  },
  iconPath: {
    type: String,
    require: true
  },
  clickable: {
    type: [Boolean, String],
    default: ""
  }
};
var MapControl = /* @__PURE__ */ defineComponent({
  name: "MapControl",
  props: props$3,
  setup(props2) {
    const onMapReady = inject("onMapReady");
    let control;
    function removeControl() {
      if (control) {
        control.remove();
      }
    }
    onMapReady((map, maps2, trigger) => {
      function updateControl(option) {
        removeControl();
        addControl(option);
      }
      function addControl(option) {
        const position = option.position || {};
        control = document.createElement("div");
        const img = new Image();
        control.appendChild(img);
        const style2 = control.style;
        style2.position = "absolute";
        style2.width = "0";
        style2.height = "0";
        img.onload = () => {
          if (option.position.width) {
            img.width = option.position.width;
          }
          if (option.position.height) {
            img.height = option.position.height;
          }
          const style3 = img.style;
          style3.position = "absolute";
          style3.left = (position.left || 0) + "px";
          style3.top = (position.top || 0) + "px";
          style3.maxWidth = "initial";
        };
        img.src = getRealPath(option.iconPath);
        img.onclick = function($event) {
          if (option.clickable) {
            trigger("controltap", $event, {
              controlId: option.id
            });
          }
        };
        map.controls[maps2.ControlPosition.TOP_LEFT].push(control);
      }
      addControl(props2);
      watch(props2, updateControl);
    });
    onUnmounted(removeControl);
    return () => {
      return null;
    };
  }
});
const innerAudioContextEventNames = [
  "onCanplay",
  "onPlay",
  "onPause",
  "onStop",
  "onEnded",
  "onTimeUpdate",
  "onError",
  "onWaiting",
  "onSeeking",
  "onSeeked"
];
const innerAudioContextOffEventNames = [
  "offCanplay",
  "offPlay",
  "offPause",
  "offStop",
  "offEnded",
  "offTimeUpdate",
  "offError",
  "offWaiting",
  "offSeeking",
  "offSeeked"
];
const propertys = [
  "src",
  "autoplay",
  "loop",
  "duration",
  "currentTime",
  "paused",
  "volume"
];
class InnerAudioContext {
  constructor() {
    this._src = "";
    var audio = this._audio = new Audio();
    this._stoping = false;
    propertys.forEach((property) => {
      Object.defineProperty(this, property, {
        set: property === "src" ? (src) => {
          audio.src = getRealPath(src);
          this._src = src;
          return src;
        } : (val) => {
          audio.setAttribute(property, val);
          return val;
        },
        get: property === "src" ? () => {
          return this._src;
        } : () => {
          return audio[property];
        }
      });
    });
    this.startTime = 0;
    Object.defineProperty(this, "obeyMuteSwitch", {
      set: () => false,
      get: () => false
    });
    Object.defineProperty(this, "buffered", {
      set: () => false,
      get() {
        var buffered = audio.buffered;
        if (buffered.length) {
          return buffered.end(buffered.length - 1);
        } else {
          return 0;
        }
      }
    });
    this._events = {};
    innerAudioContextEventNames.forEach((eventName) => {
      this._events[eventName] = [];
    });
    audio.addEventListener("loadedmetadata", () => {
      var startTime = Number(this.startTime) || 0;
      if (startTime > 0) {
        audio.currentTime = startTime;
      }
    });
    var eventNames = [
      "canplay",
      "play",
      "pause",
      "ended",
      "timeUpdate",
      "error",
      "waiting",
      "seeking",
      "seeked"
    ];
    var stopEventNames = ["canplay", "pause", "seeking", "seeked", "timeUpdate"];
    eventNames.forEach((eventName) => {
      audio.addEventListener(eventName.toLowerCase(), () => {
        if (this._stoping && stopEventNames.indexOf(eventName) >= 0) {
          return;
        }
        const EventName = `on${eventName.substr(0, 1).toUpperCase()}${eventName.substr(1)}`;
        this._events[EventName].forEach((callback2) => {
          callback2();
        });
      }, false);
    });
  }
  play() {
    this._stoping = false;
    this._audio.play();
  }
  pause() {
    this._audio.pause();
  }
  stop() {
    this._stoping = true;
    this._audio.pause();
    this._audio.currentTime = 0;
    this._events.onStop.forEach((callback2) => {
      callback2();
    });
  }
  seek(position) {
    this._stoping = false;
    position = Number(position);
    if (typeof position === "number" && !isNaN(position)) {
      this._audio.currentTime = position;
    }
  }
  destroy() {
    this.stop();
  }
}
innerAudioContextEventNames.forEach((eventName) => {
  InnerAudioContext.prototype[eventName] = function(callback2) {
    if (typeof callback2 === "function") {
      this._events[eventName].push(callback2);
    }
  };
});
innerAudioContextOffEventNames.forEach((eventName) => {
  InnerAudioContext.prototype[eventName] = function(callback2) {
    var handle = this._events[eventName.replace("off", "on")];
    var index2 = handle.indexOf(callback2);
    if (index2 >= 0) {
      handle.splice(index2, 1);
    }
  };
});
const createInnerAudioContext = defineSyncApi(API_CREATE_INNER_AUDIO_CONTEXT, () => {
  return new InnerAudioContext();
});
const makePhoneCall = defineAsyncApi(API_MAKE_PHONE_CALL, ({phoneNumber}, {resolve}) => {
  window.location.href = `tel:${phoneNumber}`;
  return resolve();
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
  const statusBarHeight = D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top;
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
    for (let i2 = 0; i2 < infos.length; i2++) {
      const info = infos[i2];
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
  } else if (isIPadOS) {
    model = "iPad";
    osname = "iOS";
    osversion = typeof window.BigInt === "function" ? "14.0" : "13.0";
  } else if (isWindows || isMac || isLinux) {
    model = "PC";
    osname = "PC";
    osversion = "0";
    let osversionFind = ua.match(/\((.+?)\)/)[1];
    if (isWindows) {
      osname = "Windows";
      switch (isWindows[1]) {
        case "5.1":
          osversion = "XP";
          break;
        case "6.0":
          osversion = "Vista";
          break;
        case "6.1":
          osversion = "7";
          break;
        case "6.2":
          osversion = "8";
          break;
        case "6.3":
          osversion = "8.1";
          break;
        case "10.0":
          osversion = "10";
          break;
      }
      const framework = osversionFind && osversionFind.match(/[Win|WOW]([\d]+)/);
      if (framework) {
        osversion += ` x${framework[1]}`;
      }
    } else if (isMac) {
      osname = "Mac";
      osversion = osversionFind && osversionFind.match(/Mac OS X (.+)/) || "";
      if (osversion) {
        osversion = osversion[1].replace(/_/g, ".");
        if (osversion.indexOf(";") !== -1) {
          osversion = osversion.split(";")[0];
        }
      }
    } else if (isLinux) {
      osname = "Linux";
      osversion = osversionFind && osversionFind.match(/Linux (.*)/) || "";
      if (osversion) {
        osversion = osversion[1];
        if (osversion.indexOf(";") !== -1) {
          osversion = osversion.split(";")[0];
        }
      }
    }
  } else {
    osname = "Other";
    osversion = "0";
  }
  const system = `${osname} ${osversion}`;
  const platform = osname.toLocaleLowerCase();
  const safeArea = {
    left: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.left,
    right: windowWidth - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.right,
    top: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top,
    bottom: windowHeight - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.bottom,
    width: windowWidth - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.left - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.right,
    height: windowHeight - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top - D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.bottom
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
      top: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.top,
      right: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.right,
      bottom: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.bottom,
      left: D__DCloud_local_git_uniAppNext_node_modules_safeAreaInsets_out.left
    }
  };
});
const getSystemInfo = defineAsyncApi("getSystemInfo", (_args, {resolve}) => {
  return resolve(getSystemInfoSync());
});
const API_ON_NETWORK_STATUS_CHANGE = "onNetworkStatusChange";
function networkListener() {
  getNetworkType().then(({networkType}) => {
    UniServiceJSBridge.invokeOnCallback(API_ON_NETWORK_STATUS_CHANGE, {
      isConnected: networkType !== "none",
      networkType
    });
  });
}
function getConnection() {
  return navigator.connection || navigator.webkitConnection || navigator.mozConnection;
}
const onNetworkStatusChange = defineOnApi(API_ON_NETWORK_STATUS_CHANGE, () => {
  const connection = getConnection();
  if (connection) {
    connection.addEventListener("change", networkListener);
  } else {
    window.addEventListener("offline", networkListener);
    window.addEventListener("online", networkListener);
  }
});
const offNetworkStatusChange = defineOffApi("offNetworkStatusChange", () => {
  const connection = getConnection();
  if (connection) {
    connection.removeEventListener("change", networkListener);
  } else {
    window.removeEventListener("offline", networkListener);
    window.removeEventListener("online", networkListener);
  }
});
const getNetworkType = defineAsyncApi("getNetworkType", (_args, {resolve}) => {
  const connection = getConnection();
  let networkType = "unknown";
  if (connection) {
    networkType = connection.type;
    if (networkType === "cellular" && connection.effectiveType) {
      networkType = connection.effectiveType.replace("slow-", "");
    } else if (!["none", "wifi"].includes(networkType)) {
      networkType = "unknown";
    }
  } else if (navigator.onLine === false) {
    networkType = "none";
  }
  return resolve({networkType});
});
let listener$1 = null;
const onAccelerometerChange = defineOnApi(API_ON_ACCELEROMETER, () => {
  startAccelerometer();
});
const offAccelerometerChange = defineOnApi(API_OFF_ACCELEROMETER, () => {
  stopAccelerometer();
});
const startAccelerometer = defineAsyncApi(API_START_ACCELEROMETER, (_, {resolve, reject}) => {
  if (!window.DeviceMotionEvent) {
    reject();
    return;
  }
  function addEventListener() {
    listener$1 = function(event) {
      const acceleration = event.acceleration || event.accelerationIncludingGravity;
      UniServiceJSBridge.invokeOnCallback(API_ON_ACCELEROMETER, {
        x: acceleration && acceleration.x || 0,
        y: acceleration && acceleration.y || 0,
        z: acceleration && acceleration.z || 0
      });
    };
    window.addEventListener("devicemotion", listener$1, false);
  }
  if (!listener$1) {
    if (DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission().then((res) => {
        if (res === "granted") {
          addEventListener();
          resolve();
        } else {
          reject(`${res}`);
        }
      }).catch((error) => {
        reject(`${error}`);
      });
      return;
    }
    addEventListener();
  }
  resolve();
});
const stopAccelerometer = defineAsyncApi(API_STOP_ACCELEROMETER, (_, {resolve}) => {
  if (listener$1) {
    window.removeEventListener("devicemotion", listener$1, false);
    listener$1 = null;
  }
  resolve();
});
let listener = null;
const onCompassChange = defineOnApi(API_ON_COMPASS, () => {
  startCompass();
});
const offCompassChange = defineOnApi(API_OFF_COMPASS, () => {
  stopCompass();
});
const startCompass = defineAsyncApi(API_START_COMPASS, (_, {resolve, reject}) => {
  if (!window.DeviceOrientationEvent) {
    reject();
    return;
  }
  function addEventListener() {
    listener = function(event) {
      const direction2 = 360 - (event.alpha !== null ? event.alpha : 360);
      UniServiceJSBridge.invokeOnCallback(API_ON_COMPASS, {
        direction: direction2
      });
    };
    window.addEventListener("deviceorientation", listener, false);
  }
  if (!listener) {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then((res) => {
        if (res === "granted") {
          addEventListener();
          resolve();
        } else {
          reject(`${res}`);
        }
      }).catch((error) => {
        reject(`${error}`);
      });
      return;
    }
    addEventListener();
  }
  resolve();
});
const stopCompass = defineAsyncApi(API_STOP_COMPASS, (_, {resolve}) => {
  if (listener) {
    window.removeEventListener("deviceorientation", listener, false);
    listener = null;
  }
  resolve();
});
const _isSupport = !!window.navigator.vibrate;
const vibrateShort = defineAsyncApi(API_VIBRATE_SHORT, (args, {resolve, reject}) => {
  if (_isSupport && window.navigator.vibrate(15)) {
    resolve();
  } else {
    reject("vibrateLong:fail");
  }
});
const vibrateLong = defineAsyncApi(API_VIBRATE_LONG, (args, {resolve, reject}) => {
  if (_isSupport && window.navigator.vibrate(400)) {
    resolve();
  } else {
    reject("vibrateLong:fail");
  }
});
const STORAGE_KEYS = "uni-storage-keys";
function parseValue(value) {
  const types = ["object", "string", "number", "boolean", "undefined"];
  try {
    const object = typeof value === "string" ? JSON.parse(value) : value;
    const type = object.type;
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object);
      if (keys.length === 2 && "data" in object) {
        if (typeof object.data === type) {
          return object.data;
        }
        if (type === "object" && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) {
          return new Date(object.data);
        }
      } else if (keys.length === 1) {
        return "";
      }
    }
  } catch (error) {
  }
}
const setStorageSync = defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
  const type = typeof data;
  const value = type === "string" ? data : JSON.stringify({
    type,
    data
  });
  localStorage.setItem(key, value);
}, SetStorageSyncProtocol);
const setStorage = defineAsyncApi(API_SET_STORAGE, ({key, data}, {resolve, reject}) => {
  try {
    setStorageSync(key, data);
    resolve();
  } catch (error) {
    reject(error.message);
  }
}, SetStorageProtocol);
function getStorageOrigin(key) {
  const value = localStorage && localStorage.getItem(key);
  if (typeof value !== "string") {
    throw new Error("data not found");
  }
  let data = value;
  try {
    const object = JSON.parse(value);
    const result = parseValue(object);
    if (result !== void 0) {
      data = result;
    }
  } catch (error) {
  }
  return data;
}
const getStorageSync = defineSyncApi(API_GET_STORAGE_SYNC, (key, t2) => {
  try {
    return getStorageOrigin(key);
  } catch (error) {
    return "";
  }
}, GetStorageSyncProtocol);
const getStorage = defineAsyncApi(API_GET_STORAGE, ({key}, {resolve, reject}) => {
  try {
    const data = getStorageOrigin(key);
    resolve({
      data
    });
  } catch (error) {
    reject(error.message);
  }
}, GetStorageProtocol);
const removeStorageSync = defineSyncApi(API_REMOVE_STORAGE, (key) => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}, RemoveStorageSyncProtocol);
const removeStorage = defineAsyncApi(API_REMOVE_STORAGE, ({key}, {resolve}) => {
  removeStorageSync(key);
  resolve();
}, RemoveStorageProtocol);
const clearStorageSync = defineSyncApi("clearStorageSync", () => {
  if (localStorage) {
    localStorage.clear();
  }
});
const clearStorage = defineAsyncApi("clearStorage", (_, {resolve}) => {
  clearStorageSync();
  resolve();
});
const getStorageInfoSync = defineSyncApi("getStorageInfoSync", () => {
  const length = localStorage && localStorage.length || 0;
  const keys = [];
  let currentSize = 0;
  for (let index2 = 0; index2 < length; index2++) {
    const key = localStorage.key(index2);
    const value = localStorage.getItem(key) || "";
    currentSize += key.length + value.length;
    if (key !== STORAGE_KEYS) {
      keys.push(key);
    }
  }
  return {
    keys,
    currentSize: Math.ceil(currentSize * 2 / 1024),
    limitSize: Number.MAX_VALUE
  };
});
const getStorageInfo = defineAsyncApi("getStorageInfo", (_, {resolve}) => {
  resolve(getStorageInfoSync());
});
const files = {};
function urlToFile(url, local) {
  const file = files[url];
  if (file) {
    return Promise.resolve(file);
  }
  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) {
    return Promise.resolve(base64ToFile(url));
  }
  if (local) {
    return Promise.reject(new Error("not find"));
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      resolve(this.response);
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
function base64ToFile(base64) {
  const base64Array = base64.split(",");
  const res = base64Array[0].match(/:(.*?);/);
  const type = res ? res[1] : "";
  const str = atob(base64Array[1]);
  let n = str.length;
  const array = new Uint8Array(n);
  while (n--) {
    array[n] = str.charCodeAt(n);
  }
  return blobToFile(array, type);
}
function getExtname(type) {
  const extname = type.split("/")[1];
  return extname ? `.${extname}` : "";
}
function getFileName(url) {
  url = url.split("#")[0].split("?")[0];
  const array = url.split("/");
  return array[array.length - 1];
}
function blobToFile(blob, type) {
  let file;
  if (blob instanceof File) {
    file = blob;
  } else {
    type = type || blob.type || "";
    const filename = `${Date.now()}${getExtname(type)}`;
    try {
      file = new File([blob], filename, {type});
    } catch (error) {
      blob = blob instanceof Blob ? blob : new Blob([blob], {type});
      file = blob;
      file.name = file.name || filename;
    }
  }
  return file;
}
function fileToUrl(file) {
  for (const key in files) {
    if (hasOwn(files, key)) {
      const oldFile = files[key];
      if (oldFile === file) {
        return key;
      }
    }
  }
  var url = (window.URL || window.webkitURL).createObjectURL(file);
  files[url] = file;
  return url;
}
function revokeObjectURL(url) {
  const URL = window.URL || window.webkitURL;
  URL.revokeObjectURL(url);
  delete files[url];
}
const getFileInfo = defineAsyncApi(API_GET_FILE_INFO, ({filePath}, {resolve, reject}) => {
  urlToFile(filePath).then((res) => {
    resolve({
      size: res.size
    });
  }).catch((err) => {
    reject(String(err));
  });
}, GetFileInfoProtocol, GetFileInfoOptions);
const openDocument = defineAsyncApi(API_OPEN_DOCUMENT, ({filePath}, {resolve}) => {
  window.open(filePath);
  return resolve();
}, OpenDocumentProtocol, OpenDocumentOptions);
const hideKeyboard = defineAsyncApi(API_HIDE_KEYBOARD, (args, {resolve, reject}) => {
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
    activeElement.blur();
    resolve();
  }
});
function getServiceAddress() {
  return window.location.protocol + "//" + window.location.host;
}
const getImageInfo = defineAsyncApi(API_GET_IMAGE_INFO, ({src}, {resolve, reject}) => {
  const img = new Image();
  img.onload = function() {
    resolve({
      width: img.naturalWidth,
      height: img.naturalHeight,
      path: src.indexOf("/") === 0 ? getServiceAddress() + src : src
    });
  };
  img.onerror = function() {
    reject();
  };
  img.src = src;
}, GetImageInfoProtocol, GetImageInfoOptions);
const getVideoInfo = defineAsyncApi(API_GET_VIDEO_INFO, ({src}, {resolve, reject}) => {
  urlToFile(src, true).then((file) => {
    return file;
  }).catch(() => {
    return null;
  }).then((file) => {
    const video = document.createElement("video");
    if (video.onloadedmetadata !== void 0) {
      const handle = setTimeout(() => {
        video.onloadedmetadata = null;
        video.onerror = null;
        reject();
      }, src.startsWith("data:") || src.startsWith("blob:") ? 300 : 3e3);
      video.onloadedmetadata = function() {
        clearTimeout(handle);
        video.onerror = null;
        resolve({
          size: file ? file.size : void 0,
          duration: video.duration || 0,
          width: video.videoWidth || 0,
          height: video.videoHeight || 0
        });
      };
      video.onerror = function() {
        clearTimeout(handle);
        video.onloadedmetadata = null;
        reject();
      };
      video.src = src;
    } else {
      reject();
    }
  });
}, GetVideoInfoProtocol, GetVideoInfoOptions);
const MIMEType = {
  image: {
    jpg: "jpeg",
    jpe: "jpeg",
    pbm: "x-portable-bitmap",
    pgm: "x-portable-graymap",
    pnm: "x-portable-anymap",
    ppm: "x-portable-pixmap",
    psd: "vnd.adobe.photoshop",
    pic: "x-pict",
    rgb: "x-rgb",
    svg: "svg+xml",
    svgz: "svg+xml",
    tif: "tiff",
    xif: "vnd.xiff",
    wbmp: "vnd.wap.wbmp",
    wdp: "vnd.ms-photo",
    xbm: "x-xbitmap",
    ico: "x-icon"
  },
  video: {
    "3g2": "3gpp2",
    "3gp": "3gpp",
    avi: "x-msvideo",
    f4v: "x-f4v",
    flv: "x-flv",
    jpgm: "jpm",
    jpgv: "jpeg",
    m1v: "mpeg",
    m2v: "mpeg",
    mpe: "mpeg",
    mpg: "mpeg",
    mpg4: "mpeg",
    m4v: "x-m4v",
    mkv: "x-matroska",
    mov: "quicktime",
    qt: "quicktime",
    movie: "x-sgi-movie",
    mp4v: "mp4",
    ogv: "ogg",
    smv: "x-smv",
    wm: "x-ms-wm",
    wmv: "x-ms-wmv",
    wmx: "x-ms-wmx",
    wvx: "x-ms-wvx"
  }
};
const ALL = "all";
function isWXEnv() {
  const ua2 = window.navigator.userAgent.toLowerCase();
  const matchUA = ua2.match(/MicroMessenger/i);
  return !!(matchUA && matchUA[0] === "micromessenger");
}
function _createInput({
  count,
  sourceType,
  type,
  extension
}) {
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  updateElementStyle(inputEl, {
    position: "absolute",
    visibility: "hidden",
    zIndex: "-999",
    width: "0",
    height: "0",
    top: "0",
    left: "0"
  });
  inputEl.accept = extension.map((item) => {
    if (type !== ALL) {
      const MIMEKey = item.replace(".", "");
      return `${type}/${MIMEType[type][MIMEKey] || MIMEKey}`;
    } else {
      if (isWXEnv()) {
        return ".";
      }
      return item.indexOf(".") === 0 ? item : `.${item}`;
    }
  }).join(",");
  if (count && count > 1) {
    inputEl.multiple = true;
  }
  if (type !== ALL && sourceType instanceof Array && sourceType.length === 1 && sourceType[0] === "camera") {
    inputEl.setAttribute("capture", "camera");
  }
  return inputEl;
}
let fileInput = null;
const chooseFile = defineAsyncApi(API_CHOOSE_FILE, ({
  count,
  sourceType,
  type,
  extension
}, {resolve, reject}) => {
  if (fileInput) {
    document.body.removeChild(fileInput);
    fileInput = null;
  }
  fileInput = _createInput({
    count,
    sourceType,
    type,
    extension
  });
  document.body.appendChild(fileInput);
  fileInput.addEventListener("change", function(event) {
    const eventTarget = event.target;
    const tempFiles = [];
    if (eventTarget && eventTarget.files) {
      const fileCount = eventTarget.files.length;
      for (let i2 = 0; i2 < fileCount; i2++) {
        const file = eventTarget.files[i2];
        let filePath;
        Object.defineProperty(file, "path", {
          get() {
            filePath = filePath || fileToUrl(file);
            return filePath;
          }
        });
        if (i2 < count)
          tempFiles.push(file);
      }
    }
    const res = {
      get tempFilePaths() {
        return tempFiles.map(({path}) => path);
      },
      tempFiles
    };
    resolve(res);
  });
  fileInput.click();
}, ChooseFileProtocol, ChooseFileOptions);
let imageInput = null;
const chooseImage = defineAsyncApi(API_CHOOSE_IMAGE, ({
  count,
  sourceType,
  extension
}, {resolve, reject}) => {
  if (imageInput) {
    document.body.removeChild(imageInput);
    imageInput = null;
  }
  imageInput = _createInput({
    count,
    sourceType,
    extension,
    type: "image"
  });
  document.body.appendChild(imageInput);
  imageInput.addEventListener("change", function(event) {
    const eventTarget = event.target;
    const tempFiles = [];
    if (eventTarget && eventTarget.files) {
      const fileCount = eventTarget.files.length;
      for (let i2 = 0; i2 < fileCount; i2++) {
        const file = eventTarget.files[i2];
        let filePath;
        Object.defineProperty(file, "path", {
          get() {
            filePath = filePath || fileToUrl(file);
            return filePath;
          }
        });
        if (i2 < count)
          tempFiles.push(file);
      }
    }
    const res = {
      get tempFilePaths() {
        return tempFiles.map(({path}) => path);
      },
      tempFiles
    };
    resolve(res);
  });
  imageInput.click();
}, ChooseImageProtocol, ChooseImageOptions);
let videoInput = null;
const chooseVideo = defineAsyncApi(API_CHOOSE_VIDEO, ({sourceType, extension}, {resolve, reject}) => {
  if (videoInput) {
    document.body.removeChild(videoInput);
    videoInput = null;
  }
  videoInput = _createInput({
    sourceType,
    extension,
    type: "video"
  });
  document.body.appendChild(videoInput);
  videoInput.addEventListener("change", function(event) {
    const eventTarget = event.target;
    const file = eventTarget.files[0];
    let filePath = "";
    const callbackResult = {
      tempFilePath: filePath,
      tempFile: file,
      size: file.size,
      duration: 0,
      width: 0,
      height: 0,
      name: file.name
    };
    Object.defineProperty(callbackResult, "tempFilePath", {
      get() {
        filePath = filePath || fileToUrl(this.tempFile);
        return filePath;
      }
    });
    const video = document.createElement("video");
    if (video.onloadedmetadata !== void 0) {
      const filePath2 = fileToUrl(file);
      video.onloadedmetadata = function() {
        revokeObjectURL(filePath2);
        resolve(Object.assign(callbackResult, {
          duration: video.duration || 0,
          width: video.videoWidth || 0,
          height: video.videoHeight || 0
        }));
      };
      setTimeout(() => {
        video.onloadedmetadata = null;
        revokeObjectURL(filePath2);
        resolve(callbackResult);
      }, 300);
      video.src = filePath2;
    } else {
      resolve(callbackResult);
    }
  });
  videoInput.click();
}, ChooseVideoProtocol, ChooseVideoOptions);
const request = defineTaskApi(API_REQUEST, ({
  url,
  data,
  header,
  method,
  dataType: dataType2,
  responseType,
  withCredentials,
  timeout = __uniConfig.networkTimeout.request
}, {resolve, reject}) => {
  let body = null;
  const contentType = normalizeContentType(header);
  if (method !== "GET") {
    if (typeof data === "string" || data instanceof ArrayBuffer) {
      body = data;
    } else {
      if (contentType === "json") {
        try {
          body = JSON.stringify(data);
        } catch (error) {
          body = data.toString();
        }
      } else if (contentType === "urlencoded") {
        const bodyArray = [];
        for (const key in data) {
          if (hasOwn(data, key)) {
            bodyArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
          }
        }
        body = bodyArray.join("&");
      } else {
        body = data.toString();
      }
    }
  }
  const xhr = new XMLHttpRequest();
  const requestTask = new RequestTask(xhr);
  xhr.open(method, url);
  for (const key in header) {
    if (hasOwn(header, key)) {
      xhr.setRequestHeader(key, header[key]);
    }
  }
  const timer = setTimeout(function() {
    xhr.onload = xhr.onabort = xhr.onerror = null;
    requestTask.abort();
    reject("timeout");
  }, timeout);
  xhr.responseType = responseType;
  xhr.onload = function() {
    clearTimeout(timer);
    const statusCode = xhr.status;
    let res = responseType === "text" ? xhr.responseText : xhr.response;
    if (responseType === "text" && dataType2 === "json") {
      try {
        res = JSON.parse(res);
      } catch (error) {
      }
    }
    resolve({
      data: res,
      statusCode,
      header: parseHeaders(xhr.getAllResponseHeaders()),
      cookies: []
    });
  };
  xhr.onabort = function() {
    clearTimeout(timer);
    reject("abort");
  };
  xhr.onerror = function() {
    clearTimeout(timer);
    reject();
  };
  xhr.withCredentials = withCredentials;
  xhr.send(body);
  return requestTask;
}, RequestProtocol, RequestOptions);
function normalizeContentType(header) {
  const name = Object.keys(header).find((name2) => name2.toLowerCase() === "content-type");
  if (!name) {
    return;
  }
  const contentType = header[name];
  if (contentType.indexOf("application/json") === 0) {
    return "json";
  } else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) {
    return "urlencoded";
  }
  return "string";
}
class RequestTask {
  constructor(xhr) {
    this._xhr = xhr;
  }
  abort() {
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
  onHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
  offHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
}
function parseHeaders(headers) {
  const headersObject = {};
  headers.split("\n").forEach((header) => {
    const find = header.match(/(\S+\s*):\s*(.*)/);
    if (!find || find.length !== 3) {
      return;
    }
    headersObject[find[1]] = find[2];
  });
  return headersObject;
}
class DownloadTask {
  constructor(xhr) {
    this._callbacks = [];
    this._xhr = xhr;
  }
  onProgressUpdate(callback2) {
    if (typeof callback2 !== "function") {
      return;
    }
    this._callbacks.push(callback2);
  }
  offProgressUpdate(callback2) {
    const index2 = this._callbacks.indexOf(callback2);
    if (index2 >= 0) {
      this._callbacks.splice(index2, 1);
    }
  }
  abort() {
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
  onHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
  offHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
}
const downloadFile = defineTaskApi(API_DOWNLOAD_FILE, ({url, header, timeout = __uniConfig.networkTimeout.downloadFile}, {resolve, reject}) => {
  var timer;
  var xhr = new XMLHttpRequest();
  var downloadTask = new DownloadTask(xhr);
  xhr.open("GET", url, true);
  Object.keys(header).forEach((key) => {
    xhr.setRequestHeader(key, header[key]);
  });
  xhr.responseType = "blob";
  xhr.onload = function() {
    clearTimeout(timer);
    const statusCode = xhr.status;
    const blob = this.response;
    let filename;
    const contentDisposition = xhr.getResponseHeader("content-disposition");
    if (contentDisposition) {
      const res = contentDisposition.match(/filename="?(\S+)"?\b/);
      if (res) {
        filename = res[1];
      }
    }
    blob.name = filename || getFileName(url);
    resolve({
      statusCode,
      tempFilePath: fileToUrl(blob)
    });
  };
  xhr.onabort = function() {
    clearTimeout(timer);
    reject("abort");
  };
  xhr.onerror = function() {
    clearTimeout(timer);
    reject();
  };
  xhr.onprogress = function(event) {
    downloadTask._callbacks.forEach((callback2) => {
      var totalBytesWritten = event.loaded;
      var totalBytesExpectedToWrite = event.total;
      var progress = Math.round(totalBytesWritten / totalBytesExpectedToWrite * 100);
      callback2({
        progress,
        totalBytesWritten,
        totalBytesExpectedToWrite
      });
    });
  };
  xhr.send();
  timer = setTimeout(function() {
    xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
    downloadTask.abort();
    reject("timeout");
  }, timeout);
  return downloadTask;
}, DownloadFileProtocol, DownloadFileOptions);
class UploadTask {
  constructor(xhr) {
    this._callbacks = [];
    this._xhr = xhr;
  }
  onProgressUpdate(callback2) {
    if (typeof callback2 !== "function") {
      return;
    }
    this._callbacks.push(callback2);
  }
  offProgressUpdate(callback2) {
    const index2 = this._callbacks.indexOf(callback2);
    if (index2 >= 0) {
      this._callbacks.splice(index2, 1);
    }
  }
  abort() {
    this._isAbort = true;
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
  onHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
  offHeadersReceived(callback2) {
    throw new Error("Method not implemented.");
  }
}
const uploadFile = defineTaskApi(API_UPLOAD_FILE, ({
  url,
  file,
  filePath,
  name,
  files: files2,
  header,
  formData,
  timeout = __uniConfig.networkTimeout.uploadFile
}, {resolve, reject}) => {
  var uploadTask = new UploadTask();
  if (!Array.isArray(files2) || !files2.length) {
    files2 = [
      {
        name,
        file,
        uri: filePath
      }
    ];
  }
  function upload(realFiles) {
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    var timer;
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    Object.values(files2).forEach(({name: name2}, index2) => {
      const file2 = realFiles[index2];
      form.append(name2 || "file", file2, file2.name || `file-${Date.now()}`);
    });
    xhr.open("POST", url);
    Object.keys(header).forEach((key) => {
      xhr.setRequestHeader(key, header[key]);
    });
    xhr.upload.onprogress = function(event) {
      uploadTask._callbacks.forEach((callback2) => {
        var totalBytesSent = event.loaded;
        var totalBytesExpectedToSend = event.total;
        var progress = Math.round(totalBytesSent / totalBytesExpectedToSend * 100);
        callback2({
          progress,
          totalBytesSent,
          totalBytesExpectedToSend
        });
      });
    };
    xhr.onerror = function() {
      clearTimeout(timer);
      reject();
    };
    xhr.onabort = function() {
      clearTimeout(timer);
      reject("abort");
    };
    xhr.onload = function() {
      clearTimeout(timer);
      const statusCode = xhr.status;
      resolve({
        statusCode,
        data: xhr.responseText || xhr.response
      });
    };
    if (!uploadTask._isAbort) {
      timer = setTimeout(function() {
        xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
        uploadTask.abort();
        reject("timeout");
      }, timeout);
      xhr.send(form);
      uploadTask._xhr = xhr;
    } else {
      reject("abort");
    }
  }
  Promise.all(files2.map(({file: file2, uri}) => file2 instanceof Blob ? Promise.resolve(blobToFile(file2)) : urlToFile(uri))).then(upload).catch(() => {
    setTimeout(() => {
      reject("file error");
    }, 0);
  });
  return uploadTask;
}, UploadFileProtocol, UploadFileOptions);
const socketTasks = [];
const globalEvent = {
  open: "",
  close: "",
  error: "",
  message: ""
};
class SocketTask {
  constructor(url, protocols, callback2) {
    this._callbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    let error;
    try {
      const webSocket = this._webSocket = new WebSocket(url, protocols);
      webSocket.binaryType = "arraybuffer";
      const eventNames = ["open", "close", "error", "message"];
      eventNames.forEach((name) => {
        this._callbacks[name] = [];
        webSocket.addEventListener(name, (event) => {
          const res = name === "message" ? {
            data: event.data
          } : {};
          this._callbacks[name].forEach((callback3) => {
            try {
              callback3(res);
            } catch (e2) {
              console.error(`thirdScriptError
${e2};at socketTask.on${capitalize(name)} callback function
`, e2);
            }
          });
          if (this === socketTasks[0] && globalEvent[name]) {
            UniServiceJSBridge.invokeOnCallback(globalEvent[name], res);
          }
          if (name === "error" || name === "close") {
            const index2 = socketTasks.indexOf(this);
            if (index2 >= 0) {
              socketTasks.splice(index2, 1);
            }
          }
        });
      });
      const propertys2 = [
        "CLOSED",
        "CLOSING",
        "CONNECTING",
        "OPEN",
        "readyState"
      ];
      propertys2.forEach((property) => {
        Object.defineProperty(this, property, {
          get() {
            return webSocket[property];
          }
        });
      });
    } catch (e2) {
      error = e2;
    }
    callback2 && callback2(error, this);
  }
  send(options) {
    const data = (options || {}).data;
    const ws = this._webSocket;
    try {
      if (ws.readyState !== ws.OPEN) {
        throw new Error("SocketTask.readyState is not OPEN");
      }
      ws.send(data);
      callback(options, "sendSocketMessage:ok");
    } catch (error) {
      callback(options, `sendSocketMessage:fail ${error}`);
    }
  }
  close(options = {}) {
    const ws = this._webSocket;
    try {
      const code = options.code || 1e3;
      const reason = options.reason;
      if (typeof reason === "string") {
        ws.close(code, reason);
      } else {
        ws.close(code);
      }
      callback(options, "closeSocket:ok");
    } catch (error) {
      callback(options, `closeSocket:fail ${error}`);
    }
  }
  onOpen(callback2) {
    this._callbacks.open.push(callback2);
  }
  onMessage(callback2) {
    this._callbacks.message.push(callback2);
  }
  onError(callback2) {
    this._callbacks.error.push(callback2);
  }
  onClose(callback2) {
    this._callbacks.close.push(callback2);
  }
}
const connectSocket = defineTaskApi(API_CONNECT_SOCKET, ({url, protocols}, {resolve, reject}) => {
  return new SocketTask(url, protocols, (error, socketTask) => {
    if (error) {
      reject(error.toString());
      return;
    }
    socketTasks.push(socketTask);
    resolve();
  });
}, ConnectSocketProtocol, ConnectSocketOptions);
function callSocketTask(socketTask, method, option, resolve, reject) {
  const fn = socketTask[method];
  if (typeof fn === "function") {
    fn.call(socketTask, Object.assign({}, option, {
      success() {
        resolve();
      },
      fail({errMsg}) {
        reject(errMsg.replace("sendSocketMessage:fail ", ""));
      },
      complete: void 0
    }));
  }
}
const sendSocketMessage = defineAsyncApi(API_SEND_SOCKET_MESSAGE, (options, {resolve, reject}) => {
  const socketTask = socketTasks[0];
  if (socketTask && socketTask.readyState === socketTask.OPEN) {
    callSocketTask(socketTask, "send", options, resolve, reject);
  } else {
    reject("WebSocket is not connected");
  }
}, SendSocketMessageProtocol);
const closeSocket = defineAsyncApi(API_CLOSE_SOCKET, (options, {resolve, reject}) => {
  const socketTask = socketTasks[0];
  if (socketTask) {
    callSocketTask(socketTask, "send", options, resolve, reject);
  } else {
    reject("WebSocket is not connected");
  }
}, CloseSocketProtocol);
function on(event) {
  const api2 = `onSocket${capitalize(event)}`;
  return defineOnApi(api2, () => {
    globalEvent[event] = api2;
  });
}
const onSocketOpen = /* @__PURE__ */ on("open");
const onSocketError = /* @__PURE__ */ on("error");
const onSocketMessage = /* @__PURE__ */ on("message");
const onSocketClose = /* @__PURE__ */ on("close");
function getJSONP(url, options, success, error) {
  var js = document.createElement("script");
  var callbackKey = options.callback || "callback";
  var callbackName = "__callback" + Date.now();
  var timeout = options.timeout || 3e4;
  var timing;
  function end() {
    clearTimeout(timing);
    delete window[callbackName];
    js.remove();
  }
  window[callbackName] = (res) => {
    if (typeof success === "function") {
      success(res);
    }
    end();
  };
  js.onerror = () => {
    if (typeof error === "function") {
      error();
    }
    end();
  };
  timing = setTimeout(function() {
    if (typeof error === "function") {
      error();
    }
    end();
  }, timeout);
  js.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + callbackKey + "=" + callbackName;
  document.body.appendChild(js);
}
const getLocation = defineAsyncApi(API_GET_LOCATION, ({type, altitude}, {resolve, reject}) => {
  const key = __uniConfig.qqMapKey;
  new Promise((resolve2, reject2) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => resolve2(res.coords), reject2, {
        enableHighAccuracy: altitude,
        timeout: 1e3 * 100
      });
    } else {
      reject2(new Error("device nonsupport geolocation"));
    }
  }).catch(() => {
    return new Promise((resolve2, reject2) => {
      getJSONP(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${key}`, {
        callback: "callback"
      }, (res) => {
        if ("result" in res && res.result.location) {
          const location2 = res.result.location;
          resolve2({
            latitude: location2.lat,
            longitude: location2.lng
          }, true);
        } else {
          reject2(new Error(res.message || JSON.stringify(res)));
        }
      }, () => reject2(new Error("network error")));
    });
  }).then((coords, skip) => {
    if (type && type.toUpperCase() === "WGS84" || skip) {
      return coords;
    }
    return new Promise((resolve2) => {
      getJSONP(`https://apis.map.qq.com/jsapi?qt=translate&type=1&points=${coords.longitude},${coords.latitude}&key=${key}&output=jsonp&pf=jsapi&ref=jsapi`, {
        callback: "cb"
      }, (res) => {
        if ("detail" in res && "points" in res.detail && res.detail.points.length) {
          const location2 = res.detail.points[0];
          resolve2(Object.assign({}, coords, {
            longitude: location2.lng,
            latitude: location2.lat
          }));
        } else {
          resolve2(coords);
        }
      }, () => resolve2(coords));
    });
  }).then((coords) => {
    resolve(Object.assign({}, coords, {
      speed: coords.altitude || 0,
      altitude: coords.altitude || 0,
      verticalAccuracy: coords.altitudeAccuracy || 0,
      horizontalAccuracy: coords.accuracy || 0
    }));
  }).catch((error) => {
    reject(error.message);
  });
}, GetLocationProtocol, GetLocationOptions);
const navigateBack = defineAsyncApi(API_NAVIGATE_BACK, ({delta}, {resolve, reject}) => {
  let canBack = true;
  if (invokeHook("onBackPress") === true) {
    canBack = false;
  }
  if (!canBack) {
    return reject("onBackPress");
  }
  getApp().$router.go(-delta);
  return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
function navigate(type, url, __id__) {
  const router = getApp().$router;
  return new Promise((resolve, reject) => {
    router[type === "navigateTo" ? "push" : "replace"]({
      path: url,
      force: true,
      state: createPageState(type, __id__)
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message);
      }
      return resolve(void 0);
    });
  });
}
const navigateTo = defineAsyncApi(API_NAVIGATE_TO, ({url}, {resolve, reject}) => navigate(API_NAVIGATE_TO, url).then(resolve).catch(reject), NavigateToProtocol, NavigateToOptions);
function removeLastPage() {
  const page = getCurrentPage();
  if (!page) {
    return;
  }
  const $page = page.$page;
  removePage(normalizeRouteKey($page.path, $page.id));
}
const redirectTo = defineAsyncApi(API_REDIRECT_TO, ({url}, {resolve, reject}) => {
  return removeLastPage(), navigate(API_REDIRECT_TO, url).then(resolve).catch(reject);
}, RedirectToProtocol, RedirectToOptions);
function removeAllPages() {
  const keys = getCurrentPagesMap().keys();
  for (const routeKey of keys) {
    removePage(routeKey);
  }
}
const reLaunch = defineAsyncApi(API_RE_LAUNCH, ({url}, {resolve, reject}) => {
  return removeAllPages(), navigate(API_RE_LAUNCH, url).then(resolve).catch(reject);
}, ReLaunchProtocol, ReLaunchOptions);
function removeNonTabBarPages() {
  const curTabBarPageVm = getCurrentPageVm();
  if (!curTabBarPageVm) {
    return;
  }
  const pagesMap = getCurrentPagesMap();
  const keys = pagesMap.keys();
  for (const routeKey of keys) {
    const page = pagesMap.get(routeKey);
    if (!page.__isTabBar) {
      removePage(routeKey);
    } else {
      page.$.__isActive = false;
    }
  }
  if (curTabBarPageVm.__isTabBar) {
    curTabBarPageVm.$.__isVisible = false;
    invokeHook(curTabBarPageVm, "onHide");
  }
}
function getTabBarPageId(url) {
  const pages = getCurrentPagesMap().values();
  for (const page of pages) {
    const $page = page.$page;
    if ($page.path === url) {
      page.$.__isActive = true;
      return $page.id;
    }
  }
}
const switchTab = defineAsyncApi(API_SWITCH_TAB, ({url}, {resolve, reject}) => {
  return removeNonTabBarPages(), navigate(API_SWITCH_TAB, url, getTabBarPageId(url)).then(resolve).catch(reject);
}, SwitchTabProtocol, SwitchTabOptions);
const KEY_MAPS = {
  esc: ["Esc", "Escape"],
  enter: ["Enter"]
};
const KEYS = Object.keys(KEY_MAPS);
function useKeyboard() {
  const key = ref("");
  const disable = ref(false);
  const onKeyup = (evt) => {
    if (disable.value) {
      return;
    }
    const res = KEYS.find((key2) => KEY_MAPS[key2].indexOf(evt.key) !== -1);
    if (res) {
      key.value = res;
    }
  };
  onMounted(() => {
    document.addEventListener("keyup", onKeyup);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyup);
  });
  return {
    key,
    disable
  };
}
const VNODE_MASK = /* @__PURE__ */ createVNode("div", {class: "uni-mask"}, null, -1);
function createRootApp(component, rootState, callback2) {
  const onClose = (...args) => (rootState.visible = false, callback2.apply(null, args));
  return createApp(defineComponent({
    setup() {
      return () => (openBlock(), createBlock(component, mergeProps({
        onClose
      }, rootState)));
    }
  }));
}
function ensureRoot(id2) {
  let rootEl = document.getElementById(id2);
  if (!rootEl) {
    rootEl = document.createElement("div");
    rootEl.id = id2;
    document.body.append(rootEl);
  }
  return rootEl;
}
function usePopup(props2, {
  onEsc,
  onEnter
}) {
  const visible = ref(props2.visible);
  const {key, disable} = useKeyboard();
  watch(() => props2.visible, (value) => visible.value = value);
  watch(() => visible.value, (value) => disable.value = !value);
  watchEffect(() => {
    const {value} = key;
    if (value === "esc") {
      onEsc && onEsc();
    } else if (value === "enter") {
      onEnter && onEnter();
    }
  });
  return visible;
}
const props$2 = {
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: "Cancel"
  },
  cancelColor: {
    type: String,
    default: "#000000"
  },
  confirmText: {
    type: String,
    default: "OK"
  },
  confirmColor: {
    type: String,
    default: "#007aff"
  },
  visible: {
    type: Boolean
  }
};
var modal = /* @__PURE__ */ defineComponent({
  props: props$2,
  setup(props2, {
    emit: emit2
  }) {
    const close = () => visible.value = false;
    const cancel = () => (close(), emit2("close", "cancel"));
    const confirm = () => (close(), emit2("close", "confirm"));
    const visible = usePopup(props2, {
      onEsc: cancel,
      onEnter: confirm
    });
    return () => {
      const {
        title,
        content,
        showCancel,
        confirmText,
        confirmColor
      } = props2;
      return createVNode(Transition, {
        name: "uni-fade"
      }, {
        default: () => [withDirectives(createVNode("uni-modal", {
          onTouchmove: onEventPrevent
        }, [VNODE_MASK, createVNode("div", {
          class: "uni-modal"
        }, [title && createVNode("div", {
          class: "uni-modal__hd"
        }, [createVNode("strong", {
          class: "uni-modal__title",
          textContent: title
        }, null, 8, ["textContent"])]), createVNode("div", {
          class: "uni-modal__bd",
          onTouchmovePassive: onEventStop,
          textContent: content
        }, null, 40, ["onTouchmovePassive", "textContent"]), createVNode("div", {
          class: "uni-modal__ft"
        }, [showCancel && createVNode("div", {
          style: {
            color: props2.cancelColor
          },
          class: "uni-modal__btn uni-modal__btn_default",
          onClick: cancel
        }, [props2.cancelText], 12, ["onClick"]), createVNode("div", {
          style: {
            color: confirmColor
          },
          class: "uni-modal__btn uni-modal__btn_primary",
          onClick: confirm
        }, [confirmText], 12, ["onClick"])])])], 40, ["onTouchmove"]), [[vShow, visible.value]])]
      });
    };
  }
});
let showModalState;
let currentShowModalResolve;
function onModalClose(type) {
  currentShowModalResolve && currentShowModalResolve({
    confirm: type === "confirm",
    cancel: type === "cancel"
  });
}
const showModal = defineAsyncApi(API_SHOW_MODAL, (args, {resolve}) => {
  currentShowModalResolve = resolve;
  if (!showModalState) {
    showModalState = reactive(args);
    nextTick(() => (createRootApp(modal, showModalState, onModalClose).mount(ensureRoot("u-a-m")), nextTick(() => showModalState.visible = true)));
  } else {
    extend(showModalState, args);
    showModalState.visible = true;
  }
}, ShowModalProtocol, ShowModalOptions);
const props$1 = {
  title: {
    type: String,
    default: ""
  },
  icon: {
    default: "success",
    validator(value) {
      return SHOW_TOAST_ICON.indexOf(value) !== -1;
    }
  },
  image: {
    type: String,
    default: ""
  },
  duration: {
    type: Number,
    default: 1500
  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean
  }
};
const ToastIconClassName = "uni-toast__icon";
var Toast = /* @__PURE__ */ defineComponent({
  name: "Toast",
  props: props$1,
  setup(props2) {
    initI18nShowToastMsgsOnce();
    initI18nShowLoadingMsgsOnce();
    const {
      Icon
    } = useToastIcon(props2);
    const visible = usePopup(props2, {});
    return () => {
      const {
        mask,
        duration,
        title,
        image: image2
      } = props2;
      return createVNode(Transition, {
        name: "uni-fade"
      }, {
        default: () => [withDirectives(createVNode("uni-toast", {
          "data-duration": duration
        }, [mask ? createVNode("div", {
          class: "uni-mask",
          style: "background: transparent;",
          onTouchmove: onEventPrevent
        }, null, 40, ["onTouchmove"]) : "", !image2 && !Icon.value ? createVNode("div", {
          class: "uni-sample-toast"
        }, [createVNode("p", {
          class: "uni-simple-toast__text"
        }, [title])]) : createVNode("div", {
          class: "uni-toast"
        }, [image2 ? createVNode("img", {
          src: image2,
          class: ToastIconClassName
        }, null, 10, ["src"]) : Icon.value, createVNode("p", {
          class: "uni-toast__content"
        }, [title])])], 8, ["data-duration"]), [[vShow, visible.value]])]
      });
    };
  }
});
function useToastIcon(props2) {
  const Icon = computed(() => props2.icon === "success" ? createVNode(createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, "#fff", 38), {
    class: ToastIconClassName
  }) : props2.icon === "loading" ? createVNode("i", {
    class: [ToastIconClassName, "uni-loading"]
  }, null, 2) : null);
  return {
    Icon
  };
}
let showToastState;
let showType = "";
let timeoutId;
const onHidePopupOnce = /* @__PURE__ */ once(() => {
  UniServiceJSBridge.on("onHidePopup", () => hidePopup("onHidePopup"));
});
function createToast(args) {
  if (!showToastState) {
    showToastState = reactive(args);
    nextTick(() => {
      createRootApp(Toast, showToastState, () => {
      }).mount(ensureRoot("u-a-t"));
    });
  } else {
    extend(showToastState, args);
  }
  setTimeout(() => {
    showToastState.visible = true;
  }, 10);
  watchEffect(() => {
    if (showToastState.visible) {
      timeoutId && clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        hidePopup("onHideToast");
      }, showToastState.duration);
    } else {
      timeoutId && clearTimeout(timeoutId);
    }
  });
  onHidePopupOnce();
}
const showToast = defineAsyncApi(API_SHOW_TOAST, (args, {resolve, reject}) => {
  createToast(args);
  showType = "onShowToast";
  resolve();
}, ShowToastProtocol, ShowToastOptions);
const showLoadingDefaultState = {
  icon: "loading",
  duration: 1e8,
  image: ""
};
const showLoading = defineAsyncApi(API_SHOW_LOADING, (args, {resolve, reject}) => {
  extend(args, showLoadingDefaultState);
  createToast(args);
  showType = "onShowLoading";
  resolve();
}, ShowLoadingProtocol, ShowLoadingOptions);
const hideToast = defineAsyncApi(API_HIDE_TOAST, (args, {resolve, reject}) => {
  hidePopup("onHideToast");
  resolve();
});
const hideLoading = defineAsyncApi(API_HIDE_LOADING, (args, {resolve, reject}) => {
  hidePopup("onHideLoading");
  resolve();
});
function hidePopup(type) {
  const {t: t2} = useI18n();
  if (!showType) {
    return;
  }
  let warnMsg = "";
  if (type === "onHideToast" && showType !== "onShowToast") {
    warnMsg = t2("uni.showToast.unpaired");
  } else if (type === "onHideLoading" && showType !== "onShowLoading") {
    warnMsg = t2("uni.showLoading.unpaired");
  }
  if (warnMsg) {
    return console.warn(warnMsg);
  }
  showType = "";
  setTimeout(() => {
    showToastState.visible = false;
  }, 10);
}
const loadFontFace = defineAsyncApi(API_LOAD_FONT_FACE, ({family, source, desc}, {resolve, reject}) => {
  addFont(family, source, desc).then(() => {
    resolve();
  }).catch((err) => {
    reject(`loadFontFace:fail ${err}`);
  });
}, LoadFontFaceProtocol);
function setNavigationBar(pageMeta, type, args, resolve, reject) {
  if (!pageMeta) {
    return reject("page not found");
  }
  const {navigationBar} = pageMeta;
  switch (type) {
    case API_SET_NAVIGATION_BAR_COLOR:
      const {frontColor, backgroundColor, animation} = args;
      const {duration, timingFunc} = animation;
      if (frontColor) {
        navigationBar.titleColor = frontColor === "#000000" ? "#000" : "#fff";
      }
      if (backgroundColor) {
        navigationBar.backgroundColor = backgroundColor;
      }
      navigationBar.duration = duration + "ms";
      navigationBar.timingFunc = timingFunc;
      break;
    case API_SHOW_NAVIGATION_BAR_LOADING:
      navigationBar.loading = true;
      break;
    case API_HIDE_NAVIGATION_BAR_LOADING:
      navigationBar.loading = false;
      break;
    case API_SET_NAVIGATION_BAR_TITLE:
      const {title} = args;
      navigationBar.titleText = title;
      break;
  }
  resolve();
}
const setNavigationBarColor = defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, (args, {resolve, reject}) => {
  setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_COLOR, args, resolve, reject);
}, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);
const showNavigationBarLoading = defineAsyncApi(API_SHOW_NAVIGATION_BAR_LOADING, (args, {resolve, reject}) => {
  setNavigationBar(getCurrentPageMeta(), API_SHOW_NAVIGATION_BAR_LOADING, args, resolve, reject);
});
const hideNavigationBarLoading = defineAsyncApi(API_HIDE_NAVIGATION_BAR_LOADING, (args, {resolve, reject}) => {
  setNavigationBar(getCurrentPageMeta(), API_HIDE_NAVIGATION_BAR_LOADING, args, resolve, reject);
});
const setNavigationBarTitle = defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (args, {resolve, reject}) => {
  setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_TITLE, args, resolve, reject);
}, SetNavigationBarTitleProtocol);
const pageScrollTo = defineAsyncApi(API_PAGE_SCROLL_TO, ({scrollTop, selector, duration}, {resolve}) => {
  scrollTo(selector || scrollTop || 0, duration);
  resolve();
}, PageScrollToProtocol, PageScrollToOptions);
const startPullDownRefresh = defineAsyncApi(API_START_PULL_DOWN_REFRESH, (_args, {resolve}) => {
  UniServiceJSBridge.publishHandler(API_START_PULL_DOWN_REFRESH, {}, getCurrentPageId());
  resolve();
});
const stopPullDownRefresh = defineAsyncApi(API_STOP_PULL_DOWN_REFRESH, (_args, {resolve}) => {
  UniServiceJSBridge.publishHandler(API_STOP_PULL_DOWN_REFRESH, {}, getCurrentPageId());
  resolve();
});
const setTabBarItemProps = ["text", "iconPath", "selectedIconPath"];
const setTabBarStyleProps = [
  "color",
  "selectedColor",
  "backgroundColor",
  "borderStyle"
];
const setTabBarBadgeProps = ["badge", "redDot"];
function setProperties(item, props2, propsData) {
  props2.forEach(function(name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name];
    }
  });
}
function normalizeRoute(index2, oldPagePath, newPagePath) {
  const oldTabBarRoute = __uniRoutes.find((item) => item.meta.route === oldPagePath);
  if (oldTabBarRoute) {
    const {meta} = oldTabBarRoute;
    delete meta.tabBarIndex;
    meta.isQuit = meta.isTabBar = false;
  }
  const newTabBarRoute = __uniRoutes.find((item) => item.meta.route === newPagePath);
  if (newTabBarRoute) {
    const {meta} = newTabBarRoute;
    meta.tabBarIndex = index2;
    meta.isQuit = meta.isTabBar = false;
  }
}
function setTabBar(type, args, resolve) {
  const tabBar2 = useTabBar();
  switch (type) {
    case API_SHOW_TAB_BAR:
      tabBar2.shown = true;
      break;
    case API_HIDE_TAB_BAR:
      tabBar2.shown = false;
      break;
    case API_SET_TAB_BAR_ITEM:
      const {index: index2} = args;
      const tabBarItem = tabBar2.list[index2];
      const oldPagePath = tabBarItem.pagePath;
      setProperties(tabBarItem, setTabBarItemProps, args);
      const {pagePath} = args;
      if (pagePath && pagePath !== oldPagePath) {
        normalizeRoute(index2, oldPagePath, pagePath);
      }
      break;
    case API_SET_TAB_BAR_STYLE:
      setProperties(tabBar2, setTabBarStyleProps, args);
      break;
    case API_SHOW_TAB_BAR_RED_DOT:
      setProperties(tabBar2.list[args.index], setTabBarBadgeProps, {
        badge: "",
        redDot: true
      });
      break;
    case API_SET_TAB_BAR_BADGE:
      setProperties(tabBar2.list[args.index], setTabBarBadgeProps, {
        badge: args.text,
        redDot: true
      });
      break;
    case API_HIDE_TAB_BAR_RED_DOT:
    case API_REMOVE_TAB_BAR_BADGE:
      setProperties(tabBar2.list[args.index], setTabBarBadgeProps, {
        badge: "",
        redDot: false
      });
      break;
  }
  resolve();
}
const setTabBarItem = defineAsyncApi(API_SET_TAB_BAR_ITEM, (args, {resolve}) => {
  setTabBar(API_SET_TAB_BAR_ITEM, args, resolve);
}, SetTabBarItemProtocol, SetTabBarItemOptions);
const setTabBarStyle = defineAsyncApi(API_SET_TAB_BAR_STYLE, (args, {resolve}) => {
  setTabBar(API_SET_TAB_BAR_STYLE, args, resolve);
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
const hideTabBar = defineAsyncApi(API_HIDE_TAB_BAR, (args, {resolve}) => {
  setTabBar(API_HIDE_TAB_BAR, args, resolve);
}, HideTabBarProtocol);
const showTabBar = defineAsyncApi(API_SHOW_TAB_BAR, (args, {resolve}) => {
  setTabBar(API_SHOW_TAB_BAR, args, resolve);
}, ShowTabBarProtocol);
const hideTabBarRedDot = defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, (args, {resolve}) => {
  setTabBar(API_HIDE_TAB_BAR_RED_DOT, args, resolve);
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
const showTabBarRedDot = defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, (args, {resolve}) => {
  setTabBar(API_SHOW_TAB_BAR_RED_DOT, args, resolve);
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
const removeTabBarBadge = defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, (args, {resolve}) => {
  setTabBar(API_REMOVE_TAB_BAR_BADGE, args, resolve);
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
const setTabBarBadge = defineAsyncApi(API_SET_TAB_BAR_BADGE, (args, {resolve}) => {
  setTabBar(API_SET_TAB_BAR_BADGE, args, resolve);
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
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
  createVideoContext,
  createMapContext,
  onTabBarMidButtonTap,
  cssVar,
  cssEnv,
  cssConstant,
  cssBackdropFilter,
  canIUse,
  createInnerAudioContext,
  makePhoneCall,
  getSystemInfo,
  getSystemInfoSync,
  onNetworkStatusChange,
  offNetworkStatusChange,
  getNetworkType,
  onAccelerometerChange,
  offAccelerometerChange,
  startAccelerometer,
  stopAccelerometer,
  onCompassChange,
  offCompassChange,
  startCompass,
  stopCompass,
  vibrateShort,
  vibrateLong,
  setStorageSync,
  setStorage,
  getStorageSync,
  getStorage,
  removeStorageSync,
  removeStorage,
  clearStorageSync,
  clearStorage,
  getStorageInfoSync,
  getStorageInfo,
  getFileInfo,
  openDocument,
  hideKeyboard,
  getImageInfo,
  getVideoInfo,
  chooseFile,
  chooseImage,
  chooseVideo,
  request,
  downloadFile,
  uploadFile,
  connectSocket,
  sendSocketMessage,
  closeSocket,
  onSocketOpen,
  onSocketError,
  onSocketMessage,
  onSocketClose,
  getLocation,
  navigateBack,
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab,
  showModal,
  showToast,
  showLoading,
  hideToast,
  hideLoading,
  loadFontFace,
  setNavigationBarColor,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  setNavigationBarTitle,
  pageScrollTo,
  startPullDownRefresh,
  stopPullDownRefresh,
  setTabBarItem,
  setTabBarStyle,
  hideTabBar,
  showTabBar,
  hideTabBarRedDot,
  showTabBarRedDot,
  removeTabBarBadge,
  setTabBarBadge
});
const CONTEXT_ID = "MAP_LOCATION";
const ICON_PATH = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
var MapLocation = /* @__PURE__ */ defineComponent({
  name: "MapLocation",
  setup() {
    const onMapReady = inject("onMapReady");
    const state = reactive({
      latitude: 0,
      longitude: 0,
      rotate: 0
    });
    let timer;
    function compassChangeHandler(res) {
      state.rotate = res.direction;
    }
    function updateLocation() {
      getLocation({
        type: "gcj02",
        success: (res) => {
          state.latitude = res.latitude;
          state.longitude = res.longitude;
        },
        complete: () => {
          timer = setTimeout(updateLocation, 3e4);
        }
      });
    }
    function removeLocation() {
      if (timer) {
        clearTimeout(timer);
      }
      offCompassChange(compassChangeHandler);
    }
    onCompassChange(compassChangeHandler);
    onMapReady(updateLocation);
    onUnmounted(removeLocation);
    const addMapChidlContext = inject("addMapChidlContext");
    const removeMapChidlContext = inject("removeMapChidlContext");
    const context = {
      id: CONTEXT_ID,
      state
    };
    addMapChidlContext(context);
    onUnmounted(() => removeMapChidlContext(context));
    return () => {
      return state.latitude ? createVNode(MapMarker, mergeProps({
        anchor: {
          x: 0.5,
          y: 0.5
        },
        width: "44",
        height: "44",
        iconPath: ICON_PATH
      }, state), null, 16, ["iconPath"]) : null;
    };
  }
});
const props = {
  id: {
    type: String,
    default: ""
  },
  latitude: {
    type: [String, Number],
    default: 39.90374
  },
  longitude: {
    type: [String, Number],
    default: 116.397827
  },
  scale: {
    type: [String, Number],
    default: 16
  },
  markers: {
    type: Array,
    default() {
      return [];
    }
  },
  includePoints: {
    type: Array,
    default() {
      return [];
    }
  },
  polyline: {
    type: Array,
    default() {
      return [];
    }
  },
  circles: {
    type: Array,
    default() {
      return [];
    }
  },
  controls: {
    type: Array,
    default() {
      return [];
    }
  },
  showLocation: {
    type: [Boolean, String],
    default: false
  }
};
function getPoints(points) {
  const newPoints = [];
  if (Array.isArray(points)) {
    points.forEach((point) => {
      if (point && point.latitude && point.longitude) {
        newPoints.push({
          latitude: point.latitude,
          longitude: point.longitude
        });
      }
    });
  }
  return newPoints;
}
function useMap(props2, rootRef, emit2) {
  const trigger = useCustomEvent(rootRef, emit2);
  const mapRef = ref(null);
  let maps2;
  let map;
  const state = reactive({
    latitude: Number(props2.latitude),
    longitude: Number(props2.longitude),
    includePoints: getPoints(props2.includePoints)
  });
  const onMapReadyCallbacks = [];
  let isMapReady;
  function onMapReady(callback2) {
    if (isMapReady) {
      callback2(map, maps2, trigger);
    } else {
      onMapReadyCallbacks.push(callback2);
    }
  }
  function emitMapReady() {
    isMapReady = true;
    onMapReadyCallbacks.forEach((callback2) => callback2(map, maps2, trigger));
    onMapReadyCallbacks.length = 0;
  }
  let isBoundsReady;
  const onBoundsReadyCallbacks = [];
  function onBoundsReady(callback2) {
    if (isBoundsReady) {
      callback2();
    } else {
      onMapReadyCallbacks.push(callback2);
    }
  }
  const contexts = {};
  function addMapChidlContext(context) {
    contexts[context.id] = context;
  }
  function removeMapChidlContext(context) {
    delete contexts[context.id];
  }
  watch([() => props2.latitude, () => props2.longitude], ([latitudeVlaue, longitudeVlaue]) => {
    const latitude = Number(latitudeVlaue);
    const longitude = Number(longitudeVlaue);
    if (latitude !== state.latitude || longitude !== state.longitude) {
      state.latitude = latitude;
      state.longitude = longitude;
      if (map) {
        map.setCenter(new maps2.LatLng(latitude, longitude));
      }
    }
  });
  watch(() => props2.includePoints, (points) => {
    state.includePoints = getPoints(points);
    if (isBoundsReady) {
      updateBounds();
    }
  }, {
    deep: true
  });
  function emitBoundsReady() {
    isBoundsReady = true;
    onBoundsReadyCallbacks.forEach((callback2) => callback2());
    onBoundsReadyCallbacks.length = 0;
  }
  function getMapInfo() {
    const center = map.getCenter();
    return {
      scale: map.getZoom(),
      centerLocation: {
        latitude: center.getLat(),
        longitude: center.getLng()
      }
    };
  }
  function updateCenter() {
    map.setCenter(new maps2.LatLng(state.latitude, state.longitude));
  }
  function updateBounds() {
    const bounds = new maps2.LatLngBounds();
    state.includePoints.forEach(({
      latitude,
      longitude
    }) => {
      const latLng = new maps2.LatLng(latitude, longitude);
      bounds.extend(latLng);
    });
    map.fitBounds(bounds);
  }
  function initMap() {
    const mapEl = mapRef.value;
    const center = new maps2.LatLng(state.latitude, state.longitude);
    const map2 = new maps2.Map(mapEl, {
      center,
      zoom: Number(props2.scale),
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      panControl: false,
      minZoom: 5,
      maxZoom: 18,
      draggable: true
    });
    watch(() => props2.scale, (scale) => {
      map2.setZoom(Number(scale) || 16);
    });
    onBoundsReady(() => {
      if (state.includePoints.length) {
        updateBounds();
        updateCenter();
      }
    });
    const boundsChangedEvent = maps2.event.addListener(map2, "bounds_changed", () => {
      boundsChangedEvent.remove();
      emitBoundsReady();
    });
    maps2.event.addListener(map2, "click", () => {
      trigger("click", {}, {});
    });
    maps2.event.addListener(map2, "dragstart", () => {
      trigger("regionchange", {}, {
        type: "begin",
        causedBy: "gesture"
      });
    });
    maps2.event.addListener(map2, "dragend", () => {
      trigger("regionchange", {}, Object.assign({
        type: "end",
        causedBy: "drag"
      }, getMapInfo()));
    });
    maps2.event.addListener(map2, "zoom_changed", () => {
      emit2("update:scale", map2.getZoom());
      trigger("regionchange", {}, Object.assign({
        type: "end",
        causedBy: "scale"
      }, getMapInfo()));
    });
    maps2.event.addListener(map2, "center_changed", () => {
      const center2 = map2.getCenter();
      const latitude = center2.getLat();
      const longitude = center2.getLng();
      emit2("update:latitude", latitude);
      emit2("update:longitude", longitude);
    });
    return map2;
  }
  useSubscribe((type, data = {}) => {
    switch (type) {
      case "getCenterLocation":
        onMapReady(() => {
          const center = map.getCenter();
          callback(data, {
            latitude: center.getLat(),
            longitude: center.getLng(),
            errMsg: `${type}:ok`
          });
        });
        break;
      case "moveToLocation":
        {
          let latitude = Number(data.latitude);
          let longitude = Number(data.longitude);
          if (!latitude || !longitude) {
            const context = contexts[CONTEXT_ID];
            if (context) {
              latitude = context.state.latitude;
              longitude = context.state.longitude;
            }
          }
          if (latitude && longitude) {
            state.latitude = latitude;
            state.longitude = longitude;
            if (map) {
              map.setCenter(new maps2.LatLng(latitude, longitude));
            }
            onMapReady(() => {
              callback(data, `${type}:ok`);
            });
          } else {
            callback(data, `${type}:fail`);
          }
        }
        break;
      case "translateMarker":
        onMapReady(() => {
          const context = contexts[data.markerId];
          if (context) {
            try {
              context.translate(data);
            } catch (error) {
              callback(data, `${type}:fail ${error.message}`);
            }
            callback(data, `${type}:ok`);
          } else {
            callback(data, `${type}:fail not found`);
          }
        });
        break;
      case "includePoints":
        state.includePoints = getPoints(data.includePoints);
        if (isBoundsReady) {
          updateBounds();
        }
        onBoundsReady(() => {
          callback(data, `${type}:ok`);
        });
        break;
      case "getRegion":
        onBoundsReady(() => {
          const latLngBounds = map.getBounds();
          const southwest = latLngBounds.getSouthWest();
          const northeast = latLngBounds.getNorthEast();
          callback(data, {
            southwest: {
              latitude: southwest.getLat(),
              longitude: southwest.getLng()
            },
            northeast: {
              latitude: northeast.getLat(),
              longitude: northeast.getLng()
            },
            errMsg: `${type}:ok`
          });
        });
        break;
      case "getScale":
        onMapReady(() => {
          callback(data, {
            scale: map.getZoom(),
            errMsg: `${type}:ok`
          });
        });
        break;
    }
  });
  onMounted(() => {
    loadMaps((result) => {
      maps2 = result;
      map = initMap();
      emitMapReady();
      trigger("updated", {}, {});
    });
  });
  provide("onMapReady", onMapReady);
  provide("addMapChidlContext", addMapChidlContext);
  provide("removeMapChidlContext", removeMapChidlContext);
  return {
    state,
    mapRef
  };
}
var index$3 = /* @__PURE__ */ defineComponent({
  name: "Map",
  props,
  emits: ["markertap", "labeltap", "callouttap", "controltap", "regionchange", "tap", "click", "updated", "update:scale", "update:latitude", "update:longitude"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = ref(null);
    const {
      mapRef
    } = useMap(props2, rootRef, emit2);
    return () => {
      return createVNode("uni-map", {
        ref: rootRef,
        id: props2.id
      }, [createVNode("div", {
        ref: mapRef,
        style: "width: 100%; height: 100%; position: relative; overflow: hidden"
      }, null, 512), props2.markers.map((item) => item.id && createVNode(MapMarker, mergeProps({
        key: item.id
      }, item), null, 16)), props2.polyline.map((item) => createVNode(MapPolyline, item, null, 16)), props2.circles.map((item) => createVNode(MapCircle, item, null, 16)), props2.controls.map((item) => createVNode(MapControl, item, null, 16)), props2.showLocation && createVNode(MapLocation, null, null), createVNode("div", {
        style: "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;"
      }, [slots.default && slots.default()])], 8, ["id"]);
    };
  }
});
const _sfc_main$2 = {
  name: "CoverView",
  props: {
    scrollTop: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    scrollTop(val) {
      this.setScrollTop(val);
    }
  },
  mounted() {
    this.setScrollTop(this.scrollTop);
  },
  methods: {
    setScrollTop(val) {
      var content = this.content;
      if (getComputedStyle(content).overflowY === "scroll") {
        content.scrollTop = this._upx2pxNum(val);
      }
    },
    _upx2pxNum(val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, (text2) => {
          return uni.upx2px(parseFloat(text2));
        });
      }
      return parseFloat(val) || 0;
    }
  },
  setup() {
    const content = ref(null);
    return {
      content
    };
  }
};
const _hoisted_1$2 = {
  ref: "content",
  class: "uni-cover-view"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-cover-view", {"scroll-top": $props.scrollTop}, [
    createVNode("div", _hoisted_1$2, [
      renderSlot(_ctx.$slots, "default")
    ], 512)
  ], 8, ["scroll-top"]);
}
_sfc_main$2.render = _sfc_render$2;
const _sfc_main$1 = {
  name: "CoverImage",
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  methods: {
    getRealPath,
    _load($event) {
      this.$trigger("load", $event);
    },
    _error($event) {
      this.$trigger("error", $event);
    }
  },
  mounted() {
    this.$trigger = useCustomEvent({value: this.root}, this.$emit);
  },
  setup() {
    const root = ref(null);
    return {
      root
    };
  }
};
const _hoisted_1$1 = {class: "uni-cover-image"};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-cover-image", {
    ref: "root",
    src: $props.src
  }, [
    createVNode("div", _hoisted_1$1, [
      $props.src ? (openBlock(), createBlock("img", {
        key: 0,
        src: $options.getRealPath($props.src),
        onLoad: _cache[1] || (_cache[1] = (...args) => $options._load && $options._load(...args)),
        onError: _cache[2] || (_cache[2] = (...args) => $options._error && $options._error(...args))
      }, null, 40, ["src"])) : createCommentVNode("", true)
    ])
  ], 8, ["src"]);
}
_sfc_main$1.render = _sfc_render$1;
const UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, {
  publishHandler(event, args, pageId) {
    window.UniServiceJSBridge.subscribeHandler(event, args, pageId);
  }
});
const uni$1 = api;
const UniServiceJSBridge$1 = /* @__PURE__ */ extend(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    UniViewJSBridge.subscribeHandler(pageId + "." + event, args, pageId);
  }
});
var TabBar = /* @__PURE__ */ defineComponent({
  name: "TabBar",
  setup() {
    const tabBar2 = useTabBar();
    useTabBarCssVar(tabBar2);
    const onSwitchTab = useSwitchTab(useRoute(), tabBar2);
    const {
      style: style2,
      borderStyle,
      placeholderStyle
    } = useTabBarStyle(tabBar2);
    return () => {
      const tabBarItemsTsx = createTabBarItemsTsx(tabBar2, onSwitchTab);
      return createVNode("uni-tabbar", {
        class: "uni-tabbar-" + tabBar2.position
      }, [createVNode("div", {
        class: "uni-tabbar",
        style: style2.value
      }, [createVNode("div", {
        class: "uni-tabbar-border",
        style: borderStyle.value
      }, null, 4), tabBarItemsTsx], 4), createVNode("div", {
        class: "uni-placeholder",
        style: placeholderStyle.value
      }, null, 4)], 2);
    };
  }
});
function useTabBarCssVar(tabBar2) {
  watch(() => tabBar2.shown, (value) => {
    updatePageCssVar({
      "--window-bottom": normalizeWindowBottom(value ? parseInt(tabBar2.height) : 0)
    });
  });
}
function useSwitchTab(route, tabBar2) {
  watchEffect(() => {
    const meta = route.meta;
    if (meta.isTabBar) {
      const pagePath = meta.route;
      const index2 = tabBar2.list.findIndex((item) => item.pagePath === pagePath);
      if (index2 === -1) {
        return;
      }
      tabBar2.selectedIndex = index2;
    }
  });
  return (tabBarItem, index2) => {
    const {
      type
    } = tabBarItem;
    return () => {
      if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && type === "midButton") {
        return UniServiceJSBridge.invokeOnCallback(API_ON_TAB_BAR_MID_BUTTON_TAP);
      }
      const {
        pagePath,
        text: text2
      } = tabBarItem;
      let url = "/" + pagePath;
      if (url === __uniRoutes[0].alias) {
        url = "/";
      }
      if (route.path !== url) {
        uni.switchTab({
          from: "tabBar",
          url
        });
      } else {
        invokeHook("onTabItemTap", {
          index: index2,
          text: text2,
          pagePath
        });
      }
    };
  };
}
const DEFAULT_BG_COLOR = "#f7f7fa";
const BLUR_EFFECT_COLOR_DARK = "rgb(0, 0, 0, 0.8)";
const BLUR_EFFECT_COLOR_LIGHT = "rgb(250, 250, 250, 0.8)";
const BLUR_EFFECT_COLORS = {
  dark: BLUR_EFFECT_COLOR_DARK,
  light: BLUR_EFFECT_COLOR_LIGHT,
  extralight: BLUR_EFFECT_COLOR_LIGHT
};
const BORDER_COLORS = {
  white: "rgba(255, 255, 255, 0.33)",
  black: "rgba(0, 0, 0, 0.33)"
};
function useTabBarStyle(tabBar2) {
  const style2 = computed(() => {
    let backgroundColor = tabBar2.backgroundColor;
    const blurEffect = tabBar2.blurEffect;
    if (!backgroundColor) {
      if (cssBackdropFilter && blurEffect && blurEffect !== "none") {
        backgroundColor = BLUR_EFFECT_COLORS[blurEffect];
      }
    }
    return {
      backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
      backdropFilter: blurEffect !== "none" ? "blur(10px)" : blurEffect
    };
  });
  const borderStyle = computed(() => {
    const {
      borderStyle: borderStyle2
    } = tabBar2;
    return {
      backgroundColor: BORDER_COLORS[borderStyle2] || borderStyle2
    };
  });
  const placeholderStyle = computed(() => {
    return {
      height: tabBar2.height
    };
  });
  return {
    style: style2,
    borderStyle,
    placeholderStyle
  };
}
function isMidButton(item) {
  return item.type === "midButton";
}
function createTabBarItemsTsx(tabBar2, onSwitchTab) {
  const {
    list: list2,
    selectedIndex,
    selectedColor,
    color
  } = tabBar2;
  return list2.map((item, index2) => {
    const selected = selectedIndex === index2;
    const textColor = selected ? selectedColor : color;
    const iconPath = (selected ? item.selectedIconPath || item.iconPath : item.iconPath) || "";
    if (!__UNI_FEATURE_TABBAR_MIDBUTTON__) {
      return createTabBarItemTsx(textColor, iconPath, item, tabBar2, index2, onSwitchTab);
    }
    return isMidButton(item) ? createTabBarMidButtonTsx(textColor, iconPath, item, tabBar2, index2, onSwitchTab) : createTabBarItemTsx(textColor, iconPath, item, tabBar2, index2, onSwitchTab);
  });
}
function createTabBarItemTsx(color, iconPath, tabBarItem, tabBar2, index2, onSwitchTab) {
  return createVNode("div", {
    key: index2,
    class: "uni-tabbar__item",
    onClick: onSwitchTab(tabBarItem, index2)
  }, [createTabBarItemBdTsx(color, iconPath || "", tabBarItem, tabBar2)], 8, ["onClick"]);
}
function createTabBarItemBdTsx(color, iconPath, tabBarItem, tabBar2) {
  const {
    height
  } = tabBar2;
  return createVNode("div", {
    class: "uni-tabbar__bd",
    style: {
      height
    }
  }, [iconPath && createTabBarItemIconTsx(iconPath, tabBarItem, tabBar2), tabBarItem.text && createTabBarItemTextTsx(color, tabBarItem, tabBar2)], 4);
}
function createTabBarItemIconTsx(iconPath, tabBarItem, tabBar2) {
  const {
    type,
    text: text2,
    redDot
  } = tabBarItem;
  const {
    iconWidth
  } = tabBar2;
  const clazz2 = "uni-tabbar__icon" + (text2 ? " uni-tabbar__icon__diff" : "");
  const style2 = {
    width: iconWidth,
    height: iconWidth
  };
  return createVNode("div", {
    class: clazz2,
    style: style2
  }, [type !== "midButton" && createVNode("img", {
    src: getRealPath(iconPath)
  }, null, 8, ["src"]), redDot && createTabBarItemRedDotTsx(tabBarItem.badge)], 6);
}
function createTabBarItemTextTsx(color, tabBarItem, tabBar2) {
  const {
    redDot,
    iconPath,
    text: text2
  } = tabBarItem;
  const {
    fontSize,
    spacing
  } = tabBar2;
  const style2 = {
    color,
    fontSize,
    lineHeight: !iconPath ? 1.8 : "normal",
    marginTop: !iconPath ? "inherit" : spacing
  };
  return createVNode("div", {
    class: "uni-tabbar__label",
    style: style2
  }, [text2, redDot && !iconPath && createTabBarItemRedDotTsx(tabBarItem.badge)], 4);
}
function createTabBarItemRedDotTsx(badge) {
  const clazz2 = "uni-tabbar__reddot" + (badge ? " uni-tabbar__badge" : "");
  return createVNode("div", {
    class: clazz2
  }, [badge], 2);
}
function createTabBarMidButtonTsx(color, iconPath, midButton, tabBar2, index2, onSwitchTab) {
  const {
    width,
    height,
    backgroundImage,
    iconWidth
  } = midButton;
  return createVNode("div", {
    key: index2,
    class: "uni-tabbar__item",
    style: {
      flex: "0 0 " + width,
      position: "relative"
    },
    onClick: onSwitchTab(midButton, index2)
  }, [createVNode("div", {
    class: "uni-tabbar__mid",
    style: {
      width,
      height,
      backgroundImage: backgroundImage ? "url('" + getRealPath(backgroundImage) + "')" : "none"
    }
  }, [iconPath && createVNode("img", {
    style: {
      width: iconWidth,
      height: iconWidth
    },
    src: getRealPath(iconPath)
  }, null, 12, ["src"])], 4), createTabBarItemBdTsx(color, iconPath, midButton, tabBar2)], 12, ["onClick"]);
}
const DEFAULT_CSS_VAR_VALUE = "0px";
updateCssVar({
  "--status-bar-height": DEFAULT_CSS_VAR_VALUE,
  "--top-window-height": DEFAULT_CSS_VAR_VALUE,
  "--window-left": DEFAULT_CSS_VAR_VALUE,
  "--window-right": DEFAULT_CSS_VAR_VALUE,
  "--window-margin": DEFAULT_CSS_VAR_VALUE,
  "--tab-bar-height": DEFAULT_CSS_VAR_VALUE
});
var LayoutComponent = defineComponent({
  name: "Layout",
  setup(_props, {
    emit: emit2
  }) {
    const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
    __UNI_FEATURE_TOPWINDOW__ && useTopWindow();
    __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow();
    __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow();
    const showTabBar2 = __UNI_FEATURE_TABBAR__ && useShowTabBar();
    const clazz2 = useAppClass(showTabBar2);
    return () => {
      const layoutTsx = createLayoutTsx(keepAliveRoute);
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar2);
      return createVNode("uni-app", {
        class: clazz2.value
      }, [[layoutTsx, tabBarTsx]], 2);
    };
  }
});
function useAppClass(showTabBar2) {
  const showMaxWidth = ref(false);
  return computed(() => {
    return {
      "uni-app--showtabbar": showTabBar2 && showTabBar2.value,
      "uni-app--maxwidth": showMaxWidth.value
    };
  });
}
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
function useShowTabBar(emit2) {
  const route = useRoute();
  const tabBar2 = useTabBar();
  const showTabBar2 = computed(() => route.meta.isTabBar && tabBar2.shown);
  updateCssVar({
    "--tab-bar-height": tabBar2.height
  });
  return showTabBar2;
}
function createTabBarTsx(showTabBar2) {
  return withDirectives(createVNode(TabBar, null, null, 512), [[vShow, showTabBar2.value]]);
}
function createPageVNode() {
  return createVNode(__uniRoutes[0].component);
}
function createRouterViewVNode({
  routeKey,
  isTabBar,
  routeCache: routeCache2
}) {
  return createVNode(RouterView, null, {
    default: withCtx(({
      Component
    }) => [(openBlock(), createBlock(KeepAlive, {
      matchBy: "key",
      cache: routeCache2
    }, [(openBlock(), createBlock(resolveDynamicComponent(Component), {
      type: isTabBar.value ? "tabBar" : "",
      key: routeKey.value
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
function usePageHeadTransparent(headRef, {
  id: id2,
  navigationBar: {titleColor, coverage, backgroundColor}
}) {
  let A = 0;
  const rgb = computed(() => hexToRgba(backgroundColor));
  const offset = parseInt(coverage);
  let titleElem;
  let transparentElemStyle;
  const iconElemsStyles = [];
  const borderRadiusElemsStyles = [];
  const oldColors = [];
  onMounted(() => {
    const $el = headRef.value;
    transparentElemStyle = $el.style;
    titleElem = $el.querySelector(".uni-page-head__title");
    const borderRadiusElems = $el.querySelectorAll(".uni-page-head-btn");
    const iconElems = $el.querySelectorAll(".uni-btn-icon");
    for (let i2 = 0; i2 < iconElems.length; i2++) {
      iconElemsStyles.push(iconElems[i2].style);
    }
    for (let i2 = 0; i2 < borderRadiusElems.length; i2++) {
      const borderRadiusElem = borderRadiusElems[i2];
      oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor);
      borderRadiusElemsStyles.push(borderRadiusElem.style);
    }
  });
  useOn(id2 + ".onPageScroll", ({scrollTop}) => {
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
    const {
      clazz: clazz2,
      style: style2
    } = usePageHead(navigationBar);
    const buttons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ && usePageHeadButtons(pageMeta);
    const searchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ && navigationBar.searchInput && usePageHeadSearchInput(pageMeta);
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" && usePageHeadTransparent(headRef, pageMeta);
    return () => {
      const backButtonTsx = __UNI_FEATURE_PAGES__ ? createBackButtonTsx(pageMeta) : null;
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
        class: clazz2.value,
        style: style2.value
      }, [createVNode("div", {
        class: "uni-page-head-hd"
      }, [backButtonTsx, ...leftButtonsTsx]), createPageHeadBdTsx(navigationBar, searchInput), createVNode("div", {
        class: "uni-page-head-ft"
      }, [...rightButtonsTsx])], 6), placeholderTsx], 8, ["uni-page-head-type"]);
    };
  }
});
function createBackButtonTsx(pageMeta) {
  const {
    navigationBar,
    isQuit
  } = pageMeta;
  if (navigationBar.backButton && !isQuit) {
    return createVNode("div", {
      class: "uni-page-head-btn",
      onClick: onPageHeadBackButton
    }, [createSvgIconVNode(ICON_PATH_BACK, navigationBar.type === "transparent" ? "#fff" : navigationBar.titleColor, 27)], 8, ["onClick"]);
  }
}
function createButtonsTsx(btns) {
  return btns.map(({
    onClick,
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
      onClick,
      "badge-text": badgeText
    }, [btnIconPath ? createSvgIconVNode(btnIconPath, iconStyle.color, iconStyle.fontSize) : createVNode("i", {
      class: "uni-btn-icon",
      style: iconStyle,
      innerHTML: btnText
    }, null, 12, ["innerHTML"])], 14, ["onClick", "badge-text"]);
  });
}
function createPageHeadBdTsx(navigationBar, searchInput) {
  if (!__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ || !navigationBar.searchInput) {
    return createPageHeadTitleTextTsx(navigationBar);
  }
  return createPageHeadSearchInputTsx(navigationBar, searchInput);
}
function createPageHeadTitleTextTsx({
  type,
  loading,
  titleSize,
  titleText,
  titleImage
}) {
  return createVNode("div", {
    class: "uni-page-head-bd"
  }, [createVNode("div", {
    style: {
      fontSize: titleSize,
      opacity: type === "transparent" ? 0 : 1
    },
    class: "uni-page-head__title"
  }, [loading ? createVNode("i", {
    class: "uni-loading"
  }, null) : titleImage ? createVNode("img", {
    src: titleImage,
    class: "uni-page-head__title_image"
  }, null, 8, ["src"]) : titleText], 4)]);
}
function createPageHeadSearchInputTsx(navigationBar, {
  text: text2,
  focus,
  composing,
  onBlur,
  onFocus,
  onInput,
  onKeyup,
  onClick
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
  }, [createSvgIconVNode(ICON_PATH_SEARCH, placeholderColor, 20)]), text2.value || composing.value ? "" : placeholder], 6), disabled ? createVNode(Input, {
    disabled: true,
    style: {
      color
    },
    "placeholder-style": {
      color: placeholderColor
    },
    class: "uni-page-head-search-input",
    "confirm-type": "search",
    onClick
  }, null, 8, ["style", "placeholder-style", "onClick"]) : createVNode(Input, {
    focus: autoFocus,
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
    onInput,
    onKeyup
  }, null, 8, ["focus", "style", "placeholder-style", "onFocus", "onBlur", "onInput", "onKeyup"])], 4);
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
  const clazz2 = computed(() => {
    const {
      type,
      titlePenetrate,
      shadowColorType
    } = navigationBar;
    const clazz3 = {
      "uni-page-head": true,
      "uni-page-head-transparent": type === "transparent",
      "uni-page-head-titlePenetrate": titlePenetrate === "YES",
      "uni-page-head-shadow": !!shadowColorType
    };
    if (shadowColorType) {
      clazz3[`uni-page-head-shadow-${shadowColorType}`] = true;
    }
    return clazz3;
  });
  const style2 = computed(() => {
    const backgroundColor = __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" ? usePageHeadTransparentBackgroundColor(navigationBar.backgroundColor) : navigationBar.backgroundColor;
    return {
      backgroundColor,
      color: navigationBar.titleColor,
      transitionDuration: navigationBar.duration,
      transitionTimingFunction: navigationBar.timingFunc
    };
  });
  return {
    clazz: clazz2,
    style: style2
  };
}
function usePageHeadButtons({
  id: id2,
  navigationBar
}) {
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
    buttons.forEach((btn, index2) => {
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
      const pageHeadBtn = usePageHeadButton(id2, index2, btn, isTransparent);
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
function usePageHeadButton(pageId, index2, btn, isTransparent) {
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
    iconStyle,
    onClick() {
      invokeHook(pageId, "onNavigationBarButtonTap", extend({
        index: index2
      }, btn));
    }
  };
}
function usePageHeadSearchInput({
  id: id2,
  navigationBar: {
    searchInput
  }
}) {
  const focus = ref(false);
  const text2 = ref("");
  const composing = ref(false);
  const {
    disabled
  } = searchInput;
  if (disabled) {
    const onClick = () => {
      invokeHook(id2, "onNavigationBarSearchInputClicked");
    };
    return {
      focus,
      text: text2,
      composing,
      onClick
    };
  }
  const onFocus = () => {
    focus.value = true;
    invokeHook(id2, "onNavigationBarSearchInputFocusChanged", {
      focus: true
    });
  };
  const onBlur = () => {
    focus.value = false;
    invokeHook(id2, "onNavigationBarSearchInputFocusChanged", {
      focus: false
    });
  };
  const onInput = (evt) => {
    text2.value = evt.detail.value;
    invokeHook(id2, "onNavigationBarSearchInputChanged", {
      text: text2.value
    });
  };
  const onKeyup = (evt) => {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      invokeHook(id2, "onNavigationBarSearchInputConfirmed", {
        text: text2.value
      });
    }
  };
  return {
    focus,
    text: text2,
    composing,
    onFocus,
    onBlur,
    onInput,
    onKeyup
  };
}
var _sfc_main = {
  name: "PageRefresh",
  setup() {
    const {refreshOptions} = usePageMeta();
    return {
      offset: refreshOptions.offset,
      color: refreshOptions.color
    };
  }
};
const _hoisted_1 = {class: "uni-page-refresh-inner"};
const _hoisted_2 = /* @__PURE__ */ createVNode("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1);
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-page-refresh", null, [
    createVNode("div", {
      style: {"margin-top": $setup.offset + "px"},
      class: "uni-page-refresh"
    }, [
      createVNode("div", _hoisted_1, [
        (openBlock(), createBlock("svg", {
          fill: $setup.color,
          class: "uni-page-refresh__icon",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, [
          _hoisted_2,
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
_sfc_main.render = _sfc_render;
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
  useSubscribe(() => {
    if (!state) {
      state = REFRESHING;
      addClass();
      setTimeout(() => {
        refreshing();
      }, 50);
    }
  }, id2 + "." + API_START_PULL_DOWN_REFRESH);
  useSubscribe(() => {
    if (state === REFRESHING) {
      removeClass();
      state = RESTORING;
      addClass();
      restoring(() => {
        removeClass();
        state = distance = offset = null;
      });
    }
  }, id2 + "." + API_STOP_PULL_DOWN_REFRESH);
  onMounted(() => {
    refreshContainerElem = refreshRef.value.$el;
    refreshControllerElem = refreshContainerElem.querySelector(".uni-page-refresh");
    refreshControllerElemStyle = refreshControllerElem.style;
    refreshInnerElemStyle = refreshControllerElem.querySelector(".uni-page-refresh-inner").style;
  });
  let touchId;
  let startY;
  let canRefresh;
  let state;
  let distance = null;
  let offset = null;
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
  const onTouchstartPassive = withWebEvent((ev) => {
    const touch = ev.changedTouches[0];
    touchId = touch.identifier;
    startY = touch.pageY;
    if ([ABORTING, REFRESHING, RESTORING].indexOf(state) >= 0) {
      canRefresh = false;
    } else {
      canRefresh = true;
    }
  });
  const onTouchmove = withWebEvent((ev) => {
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
    ev.preventDefault();
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
  });
  const onTouchend = withWebEvent((ev) => {
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
  });
  function aborting(callback2) {
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
        callback2();
      };
      refreshControllerElem.addEventListener("webkitTransitionEnd", abortTransitionEnd);
      const timeout = setTimeout(abortTransitionEnd, 350);
    } else {
      callback2();
    }
  }
  function refreshing() {
    if (!refreshControllerElem) {
      return;
    }
    refreshControllerElemStyle.transition = "-webkit-transform 0.2s";
    refreshControllerElemStyle.transform = "translate3d(-50%, " + height + "px, 0)";
    invokeHook(id2, "onPullDownRefresh");
  }
  function restoring(callback2) {
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
      callback2();
    };
    refreshControllerElem.addEventListener("webkitTransitionEnd", restoreTransitionEnd);
    const timeout = setTimeout(restoreTransitionEnd, 350);
  }
  return {
    onTouchstartPassive,
    onTouchmove,
    onTouchend,
    onTouchcancel: onTouchend
  };
}
var PageBody = defineComponent({
  name: "PageBody",
  setup(props2, ctx) {
    const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ && usePageMeta();
    const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ && ref(null);
    const pageRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__ && pageMeta.enablePullDownRefresh ? usePageRefresh(refreshRef) : null;
    return () => {
      const pageRefreshTsx = __UNI_FEATURE_PULL_DOWN_REFRESH__ && createPageRefreshTsx(refreshRef, pageMeta);
      return createVNode(Fragment, null, [pageRefreshTsx, createVNode("uni-page-wrapper", pageRefresh, [createVNode("uni-page-body", null, [renderSlot(ctx.slots, "default")])], 16)]);
    };
  }
});
function createPageRefreshTsx(refreshRef, pageMeta) {
  if (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh) {
    return null;
  }
  return createVNode(_sfc_main, {
    ref: refreshRef
  }, null, 512);
}
var index$2 = defineComponent({
  name: "Page",
  setup(_props, ctx) {
    const {navigationBar} = providePageMeta(history.state && history.state.__id__ || 1);
    return () => createVNode("uni-page", null, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [createVNode(PageHead), createPageBodyVNode(ctx)] : [createPageBodyVNode(ctx)]);
  }
});
function createPageBodyVNode(ctx) {
  return openBlock(), createBlock(PageBody, {key: 0}, {
    default: withCtx(() => [renderSlot(ctx.slots, "page")]),
    _: 3
  });
}
function reload() {
  window.location.reload();
}
var index$1 = /* @__PURE__ */ defineComponent({
  name: "AsyncError",
  setup() {
    initI18nAsyncMsgsOnce();
    const {
      t: t2
    } = useI18n();
    return () => createVNode("div", {
      class: "uni-async-error",
      onClick: reload
    }, [t2("uni.async.error")], 8, ["onClick"]);
  }
});
const clazz = {class: "uni-async-loading"};
const loadingVNode = /* @__PURE__ */ createVNode("i", {class: "uni-loading"}, null, -1);
var index = /* @__PURE__ */ defineComponent({
  name: "AsyncLoading",
  render() {
    return openBlock(), createBlock("div", clazz, [loadingVNode]);
  }
});
export {index$1 as AsyncErrorComponent, index as AsyncLoadingComponent, _sfc_main$9 as Audio, index$k as Button, _sfc_main$8 as Canvas, index$h as Checkbox, index$j as CheckboxGroup, _sfc_main$1 as CoverImage, _sfc_main$2 as CoverView, index$g as Editor, index$l as Form, index$f as Icon, index$e as Image, Input, index$i as Label, LayoutComponent, index$3 as Map, _sfc_main$7 as MovableView, _sfc_main$6 as Navigator, index$2 as PageComponent, index$d as Progress, index$b as Radio, index$c as RadioGroup, ResizeSensor, _sfc_main$5 as RichText, _sfc_main$4 as ScrollView, index$a as Slider, _sfc_main$3 as SwiperItem, index$9 as Switch, index$8 as Text, index$7 as Textarea, UniServiceJSBridge$1 as UniServiceJSBridge, UniViewJSBridge$1 as UniViewJSBridge, index$5 as Video, index$6 as View, index$4 as WebView, addInterceptor, arrayBufferToBase64, base64ToArrayBuffer, canIUse, chooseFile, chooseImage, chooseVideo, clearStorage, clearStorageSync, closeSocket, connectSocket, createInnerAudioContext, createIntersectionObserver, createMapContext, createSelectorQuery, createVideoContext, cssBackdropFilter, cssConstant, cssEnv, cssVar, downloadFile, getApp$1 as getApp, getCurrentPages$1 as getCurrentPages, getFileInfo, getImageInfo, getLocation, getNetworkType, getStorage, getStorageInfo, getStorageInfoSync, getStorageSync, getSystemInfo, getSystemInfoSync, getVideoInfo, hideKeyboard, hideLoading, hideNavigationBarLoading, hideTabBar, hideTabBarRedDot, hideToast, loadFontFace, makePhoneCall, navigateBack, navigateTo, offAccelerometerChange, offCompassChange, offNetworkStatusChange, onAccelerometerChange, onCompassChange, onNetworkStatusChange, onSocketClose, onSocketError, onSocketMessage, onSocketOpen, onTabBarMidButtonTap, openDocument, pageScrollTo, index$m as plugin, promiseInterceptor, reLaunch, redirectTo, removeInterceptor, removeStorage, removeStorageSync, removeTabBarBadge, request, sendSocketMessage, setNavigationBarColor, setNavigationBarTitle, setStorage, setStorageSync, setTabBarBadge, setTabBarItem, setTabBarStyle, setupApp, setupPage, showLoading, showModal, showNavigationBarLoading, showTabBar, showTabBarRedDot, showToast, startAccelerometer, startCompass, startPullDownRefresh, stopAccelerometer, stopCompass, stopPullDownRefresh, switchTab, uni$1 as uni, uploadFile, upx2px, useAttrs, useCustomEvent, useOn, useSubscribe, useUserAction, vibrateLong, vibrateShort, withWebEvent};
