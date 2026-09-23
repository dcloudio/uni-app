"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const uniShared = require("@dcloudio/uni-shared");
const Vue = require("vue");
const shared = require("@vue/shared");
const vueRouter = require("vue-router");
const uniI18n = require("@dcloudio/uni-i18n");
function _interopNamespaceDefault(e2) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e2) {
    for (const k in e2) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e2, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e2[k]
        });
      }
    }
  }
  n.default = e2;
  return n;
}
const Vue__namespace = /* @__PURE__ */ _interopNamespaceDefault(Vue);
const realGlobal = uniShared.getGlobal();
realGlobal.UTS = uniShared.UTS;
realGlobal.UTSJSONObject = uniShared.UTSJSONObject;
realGlobal.UTSValueIterable = uniShared.UTSValueIterable;
realGlobal.UniError = uniShared.UniError;
const isEnableLocale = /* @__PURE__ */ uniShared.once(
  () => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
);
let i18n;
function getLocaleMessage() {
  const locale = uni.getLocale();
  const locales = __uniConfig.locales;
  return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
}
function formatI18n(message) {
  if (uniI18n.isI18nStr(message, uniShared.I18N_JSON_DELIMITERS)) {
    return useI18n().f(message, getLocaleMessage(), uniShared.I18N_JSON_DELIMITERS);
  }
  return message;
}
function resolveJsonObj(jsonObj, names) {
  if (names.length === 1) {
    if (jsonObj) {
      const _isI18nStr = (value2) => shared.isString(value2) && uniI18n.isI18nStr(value2, uniShared.I18N_JSON_DELIMITERS);
      const _name = names[0];
      let filterJsonObj = [];
      if (shared.isArray(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) {
        return filterJsonObj;
      }
      const value = jsonObj[names[0]];
      if (_isI18nStr(value)) {
        return jsonObj;
      }
    }
    return;
  }
  const name = names.shift();
  return resolveJsonObj(jsonObj && jsonObj[name], names);
}
function defineI18nProperties(obj, names) {
  return names.map((name) => defineI18nProperty(obj, name));
}
function defineI18nProperty(obj, names) {
  const jsonObj = resolveJsonObj(obj, names);
  if (!jsonObj) {
    return false;
  }
  const prop = names[names.length - 1];
  if (shared.isArray(jsonObj)) {
    jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
  } else {
    let value = jsonObj[prop];
    Object.defineProperty(jsonObj, prop, {
      get() {
        return formatI18n(value);
      },
      set(v2) {
        value = v2;
      }
    });
  }
  return true;
}
function useI18n() {
  if (!i18n) {
    let locale;
    {
      {
        locale = uniShared.getEnvLocale();
      }
    }
    i18n = uniI18n.initVueI18n(locale);
    if (isEnableLocale()) {
      const localeKeys = Object.keys(__uniConfig.locales || {});
      if (localeKeys.length) {
        localeKeys.forEach(
          (locale2) => i18n.add(locale2, __uniConfig.locales[locale2])
        );
      }
      i18n.setLocale(locale);
    }
  }
  return i18n;
}
function normalizeMessages(module2, keys, values) {
  return keys.reduce((res, name, index2) => {
    res[module2 + name] = values[index2];
    return res;
  }, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.async.";
  const keys = ["error"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      uniI18n.LOCALE_EN,
      normalizeMessages(name, keys, [
        "The connection timed out, click the screen to try again."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      uniI18n.LOCALE_ES,
      normalizeMessages(name, keys, [
        "Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      uniI18n.LOCALE_FR,
      normalizeMessages(name, keys, [
        "La connexion a expiré, cliquez sur l'écran pour réessayer."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]),
      false
    );
  }
});
const initI18nPickerMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.picker.";
  const keys = ["done", "cancel"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      uniI18n.LOCALE_EN,
      normalizeMessages(name, keys, ["Done", "Cancel"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      uniI18n.LOCALE_ES,
      normalizeMessages(name, keys, ["OK", "Cancelar"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      uniI18n.LOCALE_FR,
      normalizeMessages(name, keys, ["OK", "Annuler"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
});
const initI18nVideoMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.video.";
  const keys = ["danmu", "volume"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      uniI18n.LOCALE_EN,
      normalizeMessages(name, keys, ["Danmu", "Volume"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      uniI18n.LOCALE_ES,
      normalizeMessages(name, keys, ["Danmu", "Volumen"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      uniI18n.LOCALE_FR,
      normalizeMessages(name, keys, ["Danmu", "Le Volume"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["弹幕", "音量"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      uniI18n.LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["彈幕", "音量"]),
      false
    );
  }
});
function initNavigationBarI18n(navigationBar) {
  if (isEnableLocale()) {
    return defineI18nProperties(navigationBar, [
      ["titleText"],
      ["searchInput", "placeholder"],
      ["buttons", "text"]
    ]);
  }
}
function initTabBarI18n(tabBar) {
  if (isEnableLocale() && tabBar.list) {
    tabBar.list.forEach((item) => {
      defineI18nProperty(item, ["text"]);
    });
  }
  if (isEnableLocale() && tabBar.midButton) {
    defineI18nProperty(tabBar.midButton, ["text"]);
  }
  return tabBar;
}
function initBridge(subscribeNamespace) {
  const emitter = new uniShared.Emitter();
  return {
    on(event, callback) {
      return emitter.on(event, callback);
    },
    once(event, callback) {
      return emitter.once(event, callback);
    },
    off(event, callback) {
      return emitter.off(event, callback);
    },
    emit(event, ...args) {
      return emitter.emit(event, ...args);
    },
    subscribe(event, callback, once = false) {
      emitter[once ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
    },
    unsubscribe(event, callback) {
      emitter.off(`${subscribeNamespace}.${event}`, callback);
    },
    subscribeHandler(event, args, pageId) {
      emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
    }
  };
}
const INVOKE_VIEW_API = "invokeViewApi";
const INVOKE_SERVICE_API = "invokeServiceApi";
let invokeServiceMethodId = 1;
const invokeServiceMethod = (name, args, callback) => {
  const { subscribe, publishHandler } = UniViewJSBridge;
  const id2 = callback ? invokeServiceMethodId++ : 0;
  callback && subscribe(INVOKE_SERVICE_API + "." + id2, callback, true);
  publishHandler(INVOKE_SERVICE_API, { id: id2, name, args });
};
const viewMethods = /* @__PURE__ */ Object.create(null);
function normalizeViewMethodName(pageId, name) {
  return pageId + "." + name;
}
function registerViewMethod(pageId, name, fn) {
  name = normalizeViewMethodName(pageId, name);
  if (!viewMethods[name]) {
    viewMethods[name] = fn;
  }
}
const ViewJSBridge = /* @__PURE__ */ shared.extend(
  /* @__PURE__ */ initBridge("service"),
  {
    invokeServiceMethod
  }
);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
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
        passiveEvents = { passive: true };
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
      callbacks.forEach(function(callback) {
        callback(style);
      });
    }, 0);
  }
  changeAttrs.push(attr2);
}
var callbacks = [];
function onChange(callback) {
  if (!getSupport()) {
    return;
  }
  if (!inited) {
    init();
  }
  if (typeof callback === "function") {
    callbacks.push(callback);
  }
}
function offChange(callback) {
  var index2 = callbacks.indexOf(callback);
  if (index2 >= 0) {
    callbacks.splice(index2, 1);
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
const safeAreaInsets$1 = /* @__PURE__ */ getDefaultExportFromCjs(out);
const onEventPrevent = /* @__PURE__ */ Vue.withModifiers(() => {
}, ["prevent"]);
const onEventStop = /* @__PURE__ */ Vue.withModifiers(
  (_event) => {
  },
  ["stop"]
);
function updateCssVar(cssVars) {
  const style = document.documentElement.style;
  Object.keys(cssVars).forEach((name) => {
    style.setProperty(name, cssVars[name]);
  });
}
function updatePageCssVar(cssVars) {
  return updateCssVar(cssVars);
}
function PolySymbol(name) {
  return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
function rpx2px(str, replace = false) {
  if (replace) {
    return rpx2pxWithReplace(str);
  }
  {
    return parseInt(str + "");
  }
}
function rpx2pxWithReplace(str) {
  {
    return str;
  }
}
function get$pageByPage(page) {
  return page.vm.$basePage;
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
const ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
const ICON_PATH_CLOSE = "M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z";
function createSvgIconVNode(path, color = "#000", size = 27) {
  return Vue.createVNode(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32"
    },
    [
      Vue.createVNode(
        "path",
        {
          d: path,
          fill: color
        },
        null,
        8,
        ["d", "fill"]
      )
    ],
    8,
    ["width", "height"]
  );
}
function useCurrentPageId() {
  {
    const { $pageInstance } = Vue.getCurrentInstance();
    return $pageInstance && getPageProxyId($pageInstance.proxy);
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
  var _a, _b;
  const $page = (_b = (_a = getCurrentPage()) == null ? void 0 : _a.vm) == null ? void 0 : _b.$basePage;
  if ($page) {
    return $page.meta;
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
  var _a;
  const page = (_a = getCurrentPage()) == null ? void 0 : _a.vm;
  if (page) {
    return page.$vm;
  }
}
const PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id2) {
  const globalStyle = initGlobalStyle();
  const res = shared.extend({ id: id2 }, globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = shared.extend({}, globalStyle[name], pageMeta[name]);
  });
  const { navigationBar } = res;
  navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
  return res;
}
function normalizePullToRefreshRpx(pullToRefresh) {
  if (pullToRefresh.offset) {
    pullToRefresh.offset = rpx2px(pullToRefresh.offset);
  }
  if (pullToRefresh.height) {
    pullToRefresh.height = rpx2px(pullToRefresh.height);
  }
  if (pullToRefresh.range) {
    pullToRefresh.range = rpx2px(pullToRefresh.range);
  }
  return pullToRefresh;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
  const { id: id2, route } = meta;
  const titleColor = uniShared.normalizeStyles(
    meta.navigationBar,
    __uniConfig.themeConfig,
    themeMode
  ).titleColor;
  return {
    id: id2,
    path: uniShared.addLeadingSlash(route),
    route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
  };
}
function getPageProxyId(proxy) {
  var _a, _b;
  return ((_a = proxy.$page) == null ? void 0 : _a.id) || ((_b = proxy.$basePage) == null ? void 0 : _b.id);
}
function invokeHook(vm, name, args) {
  if (shared.isString(vm)) {
    args = name;
    name = vm;
    vm = getCurrentPageVm();
  } else if (typeof vm === "number") {
    const page = getCurrentPages().find(
      (page2) => get$pageByPage(page2).id === vm
    );
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
  if (name === uniShared.ON_BACK_PRESS) {
    return hooks && uniShared.invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
  }
  return hooks && uniShared.invokeArrayFns(hooks, args);
}
function normalizeRoute(toRoute) {
  if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) {
    return toRoute;
  }
  let fromRoute = "";
  const pages = getCurrentPages();
  if (pages.length) {
    fromRoute = get$pageByPage(pages[pages.length - 1]).route;
  }
  return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute, toRoute) {
  if (toRoute.indexOf("/") === 0) {
    return toRoute;
  }
  if (toRoute.indexOf("./") === 0) {
    return getRealRoute(fromRoute, toRoute.slice(2));
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
  return uniShared.addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path, alias = false) {
  if (alias) {
    return __uniRoutes.find(
      (route) => route.path === path || route.alias === path
    );
  }
  return __uniRoutes.find((route) => route.path === path);
}
const SYSTEM_DIALOG_PAGE_PATH_STARTER = "uni:";
function isSystemDialogPage(page) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER);
}
function getSystemDialogPages(parentPage) {
  if (!parentPage)
    return [];
  return parentPage.$getSystemDialogPages();
}
function invokeNewDialogPageHook(page, hook) {
  const currentPage = getCurrentPage();
  let shouldInvoke = false;
  if (!currentPage) {
    shouldInvoke = true;
  } else {
    if (isSystemDialogPage(page)) {
      const systemDialogPages = getSystemDialogPages(currentPage);
      shouldInvoke = systemDialogPages.includes(page);
    } else {
      const dialogPages = currentPage.getDialogPages();
      shouldInvoke = dialogPages.includes(page);
    }
  }
  shouldInvoke && invokeHook(page.vm, hook);
}
function getPageInstanceByChild(child) {
  var _a;
  let pageInstance = child;
  while (pageInstance && ((_a = pageInstance.type) == null ? void 0 : _a.name) !== "Page") {
    pageInstance = pageInstance.parent;
  }
  return pageInstance;
}
const DIALOG_TAG = "dialog";
const SYSTEM_DIALOG_TAG = "systemDialog";
function isDialogPageInstance(vm) {
  if (!vm)
    return false;
  return isNormalDialogPageInstance(vm) || isSystemDialogPageInstance(vm);
}
function isNormalDialogPageInstance(vm) {
  return vm.attrs["data-type"] === DIALOG_TAG;
}
function isSystemDialogPageInstance(vm) {
  return vm.attrs["data-type"] === SYSTEM_DIALOG_TAG;
}
const invokeOnCallback = (name, res) => UniServiceJSBridge.emit("api." + name, res);
let invokeViewMethodId = 1;
function publishViewMethodName(pageId) {
  return (pageId || getCurrentPageId()) + "." + INVOKE_VIEW_API;
}
const invokeViewMethod = (name, args, pageId, callback) => {
  const { subscribe, publishHandler } = UniServiceJSBridge;
  const id2 = callback ? invokeViewMethodId++ : 0;
  callback && subscribe(INVOKE_VIEW_API + "." + id2, callback, true);
  publishHandler(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
};
const invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
  const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge;
  const id2 = invokeViewMethodId++;
  const subscribeName = INVOKE_VIEW_API + "." + id2;
  subscribe(subscribeName, callback);
  publishHandler(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
  return () => {
    unsubscribe(subscribeName);
  };
};
const ServiceJSBridge = /* @__PURE__ */ shared.extend(
  /* @__PURE__ */ initBridge(
    "view"
    /* view 指的是 service 层订阅的是 view 层事件 */
  ),
  {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive
  }
);
function initAppVm(appVm2) {
  appVm2.$vm = appVm2;
  appVm2.$mpType = "app";
  const locale = Vue.ref(useI18n().getLocale());
  Object.defineProperty(appVm2, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initPageVm(pageVm, page) {
  pageVm.route = page.route;
  pageVm.$vm = pageVm;
  {
    pageVm.$basePage = page;
  }
  pageVm.$mpType = "page";
  pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
  if (page.meta.isTabBar) {
    pageVm.$.__isTabBar = true;
    pageVm.$.__isActive = true;
  }
}
function defineGlobalData(app, defaultGlobalData) {
  const options = app.$options || {};
  options.globalData = shared.extend(options.globalData || {}, defaultGlobalData);
  Object.defineProperty(app, "globalData", {
    get() {
      return options.globalData;
    },
    set(newGlobalData) {
      options.globalData = newGlobalData;
    }
  });
}
function converPx(value) {
  if (/^-?\d+[ur]px$/i.test(value)) {
    return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
      return `${uni.upx2px(parseFloat(num))}px`;
    });
  } else if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`;
  }
  return value || "";
}
function converType(type) {
  return type.replace(/[A-Z]/g, (text) => {
    return `-${text.toLowerCase()}`;
  }).replace("webkit", "-webkit");
}
function getStyle(action) {
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "scale",
    "scale3d",
    "rotate3d",
    "skew",
    "translate",
    "translate3d"
  ];
  const animateTypes2 = [
    "scaleX",
    "scaleY",
    "scaleZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skewX",
    "skewY",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes3 = ["opacity", "background-color"];
  const animateTypes4 = ["width", "height", "left", "right", "top", "bottom"];
  const animates = action.animates;
  const option = action.option;
  const transition = option.transition;
  const style = {};
  const transform = [];
  animates.forEach((animate) => {
    let type = animate.type;
    let args = [...animate.args];
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith("rotate") || type.startsWith("skew")) {
        args = args.map((value) => parseFloat(value) + "deg");
      } else if (type.startsWith("translate")) {
        args = args.map(converPx);
      }
      if (animateTypes2.indexOf(type) >= 0) {
        args.length = 1;
      }
      transform.push(`${type}(${args.join(",")})`);
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0];
      const value = args[1];
      style[type] = animateTypes4.includes(type) ? converPx(value) : value;
    }
  });
  style.transform = style.webkitTransform = transform.join(" ");
  style.transition = style.webkitTransition = Object.keys(style).map(
    (type) => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`
  ).join(",");
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
  return style;
}
function startAnimation(context) {
  const animation2 = context.animation;
  if (!animation2 || !animation2.actions || !animation2.actions.length) {
    return;
  }
  let index2 = 0;
  const actions = animation2.actions;
  const length = animation2.actions.length;
  function animate() {
    const action = actions[index2];
    const transition = action.option.transition;
    const style = getStyle(action);
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = style[key];
    });
    index2 += 1;
    if (index2 < length) {
      setTimeout(animate, transition.duration + transition.delay);
    }
  }
  setTimeout(() => {
    animate();
  }, 0);
}
const animation = {
  props: ["animation"],
  watch: {
    animation: {
      deep: true,
      handler() {
        startAnimation(this);
      }
    }
  },
  mounted() {
    startAnimation(this);
  }
};
const defineBuiltInComponent = (options) => {
  options.__reserved = true;
  const { props: props2, mixins } = options;
  if (!props2 || !props2.animation) {
    (mixins || (options.mixins = [])).push(animation);
  }
  return defineSystemComponent(options);
};
const defineSystemComponent = (options) => {
  options.__reserved = true;
  options.compatConfig = {
    MODE: 3
    // 标记为vue3
  };
  const setup = options.setup;
  if (setup) {
    options.setup = (props2, context) => {
      const result = setup(props2, context);
      return typeof result === "function" ? result() : result;
    };
  }
  return Vue.defineVaporComponent(options);
};
const defineUnsupportedComponent = (name) => {
  return defineBuiltInComponent({
    name: shared.capitalize(shared.camelize(name)),
    setup() {
      return () => (Vue.openBlock(), Vue.createElementBlock("uni-" + name, null, name + " is unsupported"));
    }
  });
};
function withWebEvent(fn) {
  return fn.__wwe = true, fn;
}
function useCustomEvent(ref, emit2) {
  return (name, evt, detail) => {
    if (ref.value) {
      emit2(name, normalizeCustomEvent(name, evt, ref.value, detail || {}));
    }
  };
}
function normalizeCustomEvent(name, domEvt, el, detail) {
  const target = uniShared.normalizeTarget(el);
  return {
    type: domEvt.__evName || detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail
  };
}
function useHover(props2) {
  const hovering = Vue.ref(false);
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
    if (evt.touches.length > 1) {
      return;
    }
    handleHoverStart(evt);
  }
  function onMousedown(evt) {
    if (hoverTouch) {
      return;
    }
    handleHoverStart(evt);
    window.addEventListener("mouseup", handlePCHoverEnd);
  }
  function handleHoverStart(evt) {
    if (evt._hoverPropagationStopped) {
      return;
    }
    if (!props2.hoverClass || props2.hoverClass === "none" || props2.disabled) {
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
    handleHoverEnd();
  }
  function onMouseup() {
    if (!hoverTouch) {
      return;
    }
    handlePCHoverEnd();
  }
  function handleHoverEnd() {
    hoverTouch = false;
    if (hovering.value) {
      hoverReset();
    }
  }
  function handlePCHoverEnd() {
    handleHoverEnd();
    window.removeEventListener("mouseup", handlePCHoverEnd);
  }
  function onTouchcancel() {
    hoverTouch = false;
    hovering.value = false;
    clearTimeout(hoverStartTimer);
  }
  return {
    hovering,
    binding: {
      onTouchstartPassive: withWebEvent(onTouchstartPassive),
      onMousedown: withWebEvent(onMousedown),
      onTouchend: withWebEvent(onTouchend),
      onMouseup: withWebEvent(onMouseup),
      onTouchcancel: withWebEvent(onTouchcancel)
    }
  };
}
function useBooleanAttr(props2, keys) {
  if (shared.isString(keys)) {
    keys = [keys];
  }
  return keys.reduce((res, key) => {
    if (props2[key]) {
      res[key] = true;
    }
    return res;
  }, /* @__PURE__ */ Object.create(null));
}
const rpx2Unit = uniShared.createRpx2Unit(
  uniShared.defaultRpx2Unit.unit,
  uniShared.defaultRpx2Unit.unitRatio,
  uniShared.defaultRpx2Unit.unitPrecision
);
function transformRpx(value) {
  if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) {
    return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text, num) => {
      return rpx2Unit(num + "rpx");
    });
  }
  return value;
}
class UniElement extends Object {
  constructor() {
    super();
    this._props = {};
    this.__isUniElement = true;
  }
  attachVmProps(props2) {
    this._props = props2;
  }
  getAttribute(qualifiedName) {
    const name = shared.camelize(qualifiedName);
    const attr2 = name in this._props ? this._props[name] + "" : super.getAttribute(qualifiedName);
    return attr2 === void 0 ? null : attr2;
  }
  getPage() {
    var _a, _b;
    return ((_b = (_a = this.__vnode) == null ? void 0 : _a.ctx) == null ? void 0 : _b.page) || null;
  }
  get uniPage() {
    return this.getPage();
  }
  get dataset() {
    if (!this.__uniDatasetMap) {
      this.__uniDatasetMap = uniShared.createUniDOMStringMap(
        this.__uniDataset || {}
      );
    }
    return this.__uniDatasetMap;
  }
  setAttribute(qualifiedName, value) {
    super.setAttribute(qualifiedName, value);
    if (qualifiedName.startsWith("data-") && this.__uniDatasetMap) {
      this.__uniDatasetMap.set(qualifiedName, value);
    }
  }
  removeAttribute(qualifiedName) {
    super.removeAttribute(qualifiedName);
    if (qualifiedName.startsWith("data-") && this.__uniDatasetMap) {
      this.__uniDatasetMap.delete(qualifiedName);
    }
  }
  getBoundingClientRectAsync(callback) {
    var _a, _b;
    if (callback) {
      const domRect = this.getBoundingClientRect();
      try {
        (_a = callback.success) == null ? void 0 : _a.call(callback, domRect);
      } catch (error) {
        console.error(error);
      }
      try {
        (_b = callback.complete) == null ? void 0 : _b.call(callback, domRect);
      } catch (error) {
        console.error(error);
      }
      return;
    }
    return new Promise((resolve, reject) => {
      const domRect = this.getBoundingClientRect();
      resolve(domRect);
    });
  }
  get style() {
    const originalStyle = super.style;
    if (originalStyle.__patchRpx__) {
      return originalStyle;
    }
    originalStyle.__patchRpx__ = true;
    const originalSetProperty = originalStyle.setProperty.bind(originalStyle);
    super.style.setProperty = function(property, value, priority) {
      return originalSetProperty(
        property,
        value ? transformRpx(value + "") : value,
        priority || void 0
      );
    };
    return super.style;
  }
  get tagName() {
    return super.tagName.replace(/^UNI-/, "");
  }
  get nodeName() {
    return super.nodeName.replace(/^UNI-/, "");
  }
}
const createComponent = (type, ...args) => {
  if (type === Vue.Fragment) {
    const slots = args[1];
    return slots ? typeof slots === "function" ? slots() : typeof slots.default === "function" ? slots.default() : [] : [];
  }
  return Vue__namespace.createComponentWithFallback(
    createProxyComponent(Vue__namespace.resolveDynamicComponent(type)),
    ...args
  );
};
const proxyCache = /* @__PURE__ */ new WeakMap();
function createProxyComponent(type, normalizeNode2) {
  if (typeof type === "function") {
    const existing = proxyCache.get(type);
    if (existing)
      return existing;
    const i = Vue__namespace.currentInstance || Vue.getCurrentInstance();
    const proxy = new Proxy(type, {
      apply(target, ctx, args) {
        if (typeof target.__setup === "function") {
          target.__setup.apply(ctx, args);
        }
        const node = Reflect.apply(target, ctx, args);
        return node;
      },
      get(target, p2, receiver) {
        const result = Reflect.get(target, p2, receiver);
        if (p2 === "__vapor" && result === void 0 && i && i.appContext.vapor) {
          return true;
        }
        return result;
      }
    });
    proxyCache.set(type, proxy);
    return proxy;
  }
  return type;
}
function isBlock(val) {
  return val instanceof Node || Array.isArray(val) || Vue__namespace.isVaporComponent(val) || Vue__namespace.isFragment(val);
}
function createFragment(nodes, anchor = document.createTextNode("")) {
  const frag = new Vue__namespace.VaporFragment(nodes);
  frag.anchor = anchor;
  return frag;
}
function normalizeBlock(node, anchor, processFunction = false) {
  if (node instanceof Node || Vue__namespace.isFragment(node)) {
    return node;
  } else if (Vue__namespace.isVaporComponent(node)) {
    return createFragment(node, anchor);
  } else if (Array.isArray(node)) {
    return createFragment(
      node.map((i) => normalizeBlock(i, void 0, processFunction)),
      anchor
    );
  } else if (processFunction && typeof node === "function") {
    return resolveValues([node], anchor, true)[0];
  } else {
    const result = node == null || typeof node === "boolean" ? "" : String(node);
    if (anchor) {
      anchor.textContent = result;
      return anchor;
    } else {
      return document.createTextNode(result);
    }
  }
}
function resolveValue(current, value, anchor, processFunction = false) {
  anchor = anchor || (current instanceof Node && current.nodeType === 3 ? current : void 0);
  const node = normalizeBlock(value, anchor, processFunction);
  if (current) {
    if (Vue__namespace.isFragment(current)) {
      if (current.anchor && current.anchor.parentNode) {
        Vue__namespace.remove(current.nodes, current.anchor.parentNode);
        Vue__namespace.insert(node, current.anchor.parentNode, current.anchor);
        if (!anchor)
          current.anchor.parentNode.removeChild(current.anchor);
        if (current.scope)
          current.scope.stop();
      }
    } else if (current instanceof Node) {
      if (current.nodeType === 3 && (!(node instanceof Node) || node.nodeType !== 3)) {
        current.textContent = "";
      }
      if (Vue__namespace.isFragment(node) && current.parentNode) {
        Vue__namespace.insert(node, current.parentNode, current);
        if (!anchor || current.nodeType !== 3) {
          current.parentNode.removeChild(current);
        }
      } else if (node instanceof Node) {
        if (current.nodeType === 3 && node.nodeType === 3) {
          current.textContent = node.textContent;
          return current;
        } else if (current.parentNode) {
          current.parentNode.replaceChild(node, current);
        }
      }
    }
  }
  return node;
}
function resolveValues(values = [], _anchor, processFunction = false) {
  const nodes = [];
  const scopes = [];
  for (const [index2, value] of values.entries()) {
    const anchor = index2 === values.length - 1 ? _anchor : void 0;
    if (typeof value === "function") {
      Vue__namespace.renderEffect(() => {
        if (scopes[index2])
          scopes[index2].stop();
        scopes[index2] = new Vue.EffectScope();
        nodes[index2] = scopes[index2].run(
          () => resolveValue(nodes[index2], value(), anchor, processFunction)
        );
      });
    } else {
      nodes[index2] = resolveValue(nodes[index2], value, anchor, processFunction);
    }
  }
  return nodes;
}
function setNodes(anchor, ...values) {
  const resolvedValues = resolveValues(values, anchor);
  if (anchor.parentNode)
    Vue__namespace.insert(resolvedValues, anchor.parentNode, anchor);
}
function createNodes(...values) {
  return resolveValues(values);
}
function normalizeVaporSlots(slots) {
  if (typeof slots === "function") {
    return { name: "default", fn: slots };
  } else if (Object.prototype.toString.call(slots) === "[object Object]" && !isBlock(slots)) {
    return Object.entries(slots).map(([name, fn]) => ({ name, fn }));
  } else {
    return {
      name: "default",
      fn: () => createNodes(slots)
    };
  }
}
const _t0$n = Vue.template("<span> ");
const uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
const index$x = /* @__PURE__ */ defineBuiltInComponent({
  name: "Form",
  emits: ["submit", "reset"],
  setup(_props, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    provideForm(useCustomEvent(rootRef, emit2));
    return () => (() => {
      const _setTemplateRef = Vue.createTemplateRefSetter();
      const _n1 = Vue.createPlainElement("uni-form", null, () => {
        const _n0 = _t0$n();
        const _x0 = Vue.txt(_n0);
        setNodes(_x0, () => slots.default && slots.default());
        return _n0;
      }, true);
      Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
      return _n1;
    })();
  }
});
function provideForm(trigger) {
  const fields2 = [];
  Vue.provide(uniFormKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    submit(evt) {
      trigger("submit", evt, { value: fields2.reduce((res, field) => {
        if (field.submit) {
          const [name, value] = field.submit();
          name && (res[name] = value);
        }
        return res;
      }, /* @__PURE__ */ Object.create(null)) });
    },
    reset(evt) {
      fields2.forEach((field) => field.reset && field.reset());
      trigger("reset", evt);
    }
  });
  return fields2;
}
const labelProps = {
  for: {
    type: String,
    default: ""
  }
};
const uniLabelKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniLabel" : "ul");
function useProvideLabel() {
  const handlers = [];
  Vue.provide(uniLabelKey, {
    addHandler(handler) {
      handlers.push(handler);
    },
    removeHandler(handler) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
  });
  return handlers;
}
const index$w = /* @__PURE__ */ defineBuiltInComponent({
  name: "Label",
  props: labelProps,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const pageId = useCurrentPageId();
    const handlers = useProvideLabel();
    const pointer = Vue.computed(() => props2.for || slots.default && slots.default.length);
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
        handlers.length && handlers[0]($event, true);
      }
    });
    return () => (() => {
      const _setTemplateRef = Vue.createTemplateRefSetter();
      const _n1 = Vue.createPlainElement("uni-label", {
        class: () => ({ "uni-label-pointer": pointer }),
        onClick: () => _onClick
      }, Vue.extend(() => {
        const _n0 = createNodes(() => slots.default && slots.default());
        return _n0;
      }, { _: 1 }), true);
      Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
      return _n1;
    })();
  }
});
const buttonProps = {
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
  },
  loading: {
    type: [Boolean, String],
    default: false
  },
  plain: {
    type: [Boolean, String],
    default: false
  }
};
const index$v = /* @__PURE__ */ defineBuiltInComponent({
  name: "Button",
  props: buttonProps,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const uniForm = Vue.inject(uniFormKey, false);
    const { hovering, binding } = useHover(props2);
    const onClick = withWebEvent((e2, isLabelClick) => {
      if (props2.disabled) {
        return e2.stopImmediatePropagation();
      }
      if (isLabelClick) {
        rootRef.value.click();
      }
      const formType = props2.formType;
      if (formType) {
        if (!uniForm) {
          return;
        }
        if (formType === "submit") {
          uniForm.submit(e2);
        } else if (formType === "reset") {
          uniForm.reset(e2);
        }
        return;
      }
    });
    const uniLabel = Vue.inject(uniLabelKey, false);
    if (uniLabel) {
      uniLabel.addHandler(onClick);
    }
    return () => {
      const hoverClass = props2.hoverClass;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const loadingAttrs = useBooleanAttr(props2, "loading");
      const plainAttrs = useBooleanAttr(props2, "plain");
      const hasHoverClass = hoverClass && hoverClass !== "none";
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-button", {
          onClick: () => onClick,
          id: () => props2.id,
          class: () => hasHoverClass && hovering.value ? hoverClass : "",
          $: [
            () => hasHoverClass && binding,
            () => booleanAttrs,
            () => loadingAttrs,
            () => plainAttrs
          ]
        }, Vue.extend(() => {
          const _n0 = createNodes(() => slots.default && slots.default());
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const _t0$m = Vue.template("<canvas class=uni-canvas-canvas>");
const props$q = { disableScroll: {
  type: [Boolean, String],
  default: false
} };
const indexX$4 = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: true,
  name: "Canvas",
  compatConfig: { MODE: 3 },
  props: props$q,
  setup(props2, {}) {
    const rootRef = Vue.ref(null);
    const canvas = Vue.ref(null);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-canvas", null, () => {
          const _n0 = _t0$m();
          Vue.renderEffect(() => _setTemplateRef(_n0, canvas));
          return _n0;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
const props$p = { name: {
  type: String,
  default: ""
} };
const index$u = /* @__PURE__ */ defineBuiltInComponent({
  name: "CheckboxGroup",
  props: props$p,
  emits: ["change"],
  setup(props2, { emit: emit2, slots }) {
    const rootRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideCheckGroup(props2, trigger);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-checkbox-group", null, Vue.extend(() => {
          const _n0 = createNodes(() => slots.default && slots.default());
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
function useProvideCheckGroup(props2, trigger) {
  const fields2 = [];
  const getFieldsValue = () => fields2.reduce((res, field) => {
    if (field.value.checkboxChecked) {
      res.push(field.value.value);
    }
    return res;
  }, new Array());
  Vue.provide(uniCheckGroupKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    checkboxChange($event) {
      trigger("change", $event, { value: getFieldsValue() });
    }
  });
  const uniForm = Vue.inject(uniFormKey, false);
  if (uniForm) {
    uniForm.addField({ submit: () => {
      let data = ["", null];
      if (props2.name !== "") {
        data[0] = props2.name;
        data[1] = getFieldsValue();
      }
      return data;
    } });
  }
  return getFieldsValue;
}
const _t0$l = Vue.template("<div class=uni-checkbox-wrapper><div></div> ");
const props$o = {
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
  value: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "#007aff"
  },
  backgroundColor: {
    type: String,
    default: ""
  },
  borderColor: {
    type: String,
    default: ""
  },
  activeBackgroundColor: {
    type: String,
    default: ""
  },
  activeBorderColor: {
    type: String,
    default: ""
  },
  iconColor: {
    type: String,
    default: ""
  },
  // 图标颜色,同color,优先级大于iconColor
  foreColor: {
    type: String,
    default: ""
  }
};
const index$t = /* @__PURE__ */ defineBuiltInComponent({
  name: "Checkbox",
  props: props$o,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const checkboxChecked = Vue.ref(props2.checked);
    const checkboxCheckedBool = Vue.computed(() => {
      return checkboxChecked.value === "true" || checkboxChecked.value === true;
    });
    const checkboxValue = Vue.ref(props2.value);
    function getCheckBoxStyle(checked) {
      if (props2.disabled) {
        return {};
      }
      const style = {};
      if (checked) {
        if (props2.activeBorderColor)
          style.borderColor = props2.activeBorderColor;
        if (props2.activeBackgroundColor)
          style.backgroundColor = props2.activeBackgroundColor;
      } else {
        if (props2.borderColor)
          style.borderColor = props2.borderColor;
        if (props2.backgroundColor)
          style.backgroundColor = props2.backgroundColor;
      }
      return style;
    }
    const checkboxStyle = Vue.computed(() => {
      return getCheckBoxStyle(checkboxCheckedBool.value);
    });
    Vue.watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
      checkboxChecked.value = newChecked;
      checkboxValue.value = newModelValue;
    });
    const reset = () => {
      checkboxChecked.value = false;
    };
    const { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      checkboxChecked.value = !checkboxChecked.value;
      uniCheckGroup && uniCheckGroup.checkboxChange($event);
      $event.stopPropagation();
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      let realCheckValue;
      realCheckValue = checkboxChecked.value;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n8 = Vue.createPlainElement("uni-checkbox", { $: [() => booleanAttrs, {
          id: () => props2.id,
          onClick: () => _onClick
        }] }, () => {
          const _n7 = _t0$l();
          const _n5 = Vue.child(_n7);
          const _n6 = Vue.next(_n5, true);
          Vue.renderEffect(() => {
            Vue.setStyle(_n7, { "--HOVER-BD-COLOR": props2.activeBorderColor });
            Vue.setClassName(_n5, props2.disabled ? 1 : 0, " uni-checkbox-input-disabled", "uni-checkbox-input");
            Vue.setStyle(_n5, checkboxStyle.value);
          });
          Vue.setInsertionState(_n5);
          Vue.createIf(() => realCheckValue, () => {
            const _n2 = createNodes(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.disabled ? "currentColor" : props2.foreColor || props2.iconColor || props2.color, 22));
            return _n2;
          }, () => {
            const _n4 = createNodes("");
            return _n4;
          }, 266);
          setNodes(_n6, () => slots.default && slots.default());
          return _n7;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n8, rootRef));
        return _n8;
      })();
    };
  }
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
  const field = Vue.computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value
  }));
  const formField = { reset };
  const uniCheckGroup = Vue.inject(uniCheckGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = Vue.inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = Vue.inject(uniLabelKey, false);
  return {
    uniCheckGroup,
    uniForm,
    uniLabel
  };
}
let resetTimer;
function iosHideKeyboard() {
}
const props$n = {
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
    const isApple = Vue.computed(
      () => String(navigator.vendor).indexOf("Apple") === 0
    );
    el.addEventListener("focus", () => {
      clearTimeout(resetTimer);
      document.addEventListener("click", iosHideKeyboard, false);
    });
    const onKeyboardHide = () => {
      document.removeEventListener("click", iosHideKeyboard, false);
      if (isApple.value) {
        document.documentElement.scrollTo(
          document.documentElement.scrollLeft,
          document.documentElement.scrollTop
        );
      }
    };
    el.addEventListener("blur", () => {
      if (isApple.value) {
        el.blur();
      }
      onKeyboardHide();
    });
  }
  Vue.watch(
    () => elRef.value,
    (el) => el && initKeyboard(el)
  );
}
const pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
  return Vue.inject(pageMetaKey);
}
function providePageMeta(id2) {
  const pageMeta = initPageMeta(id2);
  Vue.provide(pageMetaKey, pageMeta);
  return pageMeta;
}
function usePageRoute() {
  if (__UNI_FEATURE_PAGES__) {
    return vueRouter.useRoute();
  }
  const url = location.href;
  const searchPos = url.indexOf("?");
  const hashPos = url.indexOf("#", searchPos > -1 ? searchPos : 0);
  let query = {};
  if (searchPos > -1) {
    query = uniShared.parseQuery(
      url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length)
    );
  }
  const { meta } = __uniRoutes[0];
  const path = uniShared.addLeadingSlash(meta.route);
  return {
    meta,
    query,
    path,
    matched: [{ path }]
  };
}
function initPageMeta(id2) {
  if (__UNI_FEATURE_PAGES__) {
    return Vue.reactive(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            initRouteMeta(
              vueRouter.useRoute().meta,
              id2
            )
          )
        )
      )
    );
  }
  return Vue.reactive(
    normalizePageMeta(
      JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id2)))
    )
  );
}
function normalizePageMeta(pageMeta) {
  if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    const { enablePullDownRefresh, navigationBar } = pageMeta;
    {
      const pullToRefresh = normalizePullToRefreshRpx(
        shared.extend(
          {
            support: true,
            color: "#2BD009",
            style: "circle",
            height: 70,
            range: 150,
            offset: 0
          },
          pageMeta.pullToRefresh
        )
      );
      const { type, style } = navigationBar;
      if (style !== "custom" && type !== "transparent") {
        pullToRefresh.offset += uniShared.NAVBAR_HEIGHT + 0;
      }
      pageMeta.pullToRefresh = pullToRefresh;
    }
  }
  if (__UNI_FEATURE_NAVIGATIONBAR__ || __UNI_FEATURE_I18N_LOCALE__) {
    const { navigationBar } = pageMeta;
    const { titleSize, titleColor, backgroundColor } = navigationBar;
    navigationBar.titleText = navigationBar.titleText || "";
    navigationBar.type = navigationBar.type || "default";
    navigationBar.titleSize = titleSize || "16px";
    navigationBar.titleColor = titleColor || "#000000";
    navigationBar.backgroundColor = backgroundColor || "#F8F8F8";
    __UNI_FEATURE_I18N_LOCALE__ && initNavigationBarI18n(navigationBar);
  }
  return pageMeta;
}
function getStateId() {
  {
    return 1;
  }
}
let router;
function setRouterInstance(value) {
  router = value;
}
function getRouterInstance() {
  return router;
}
const HTTP_METHODS = [
  "GET",
  "OPTIONS",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "TRACE",
  "CONNECT",
  "PATCH"
];
function elemInArray(str, arr) {
  if (!str || arr.indexOf(str) === -1) {
    return arr[0];
  }
  return str;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(
      key,
      data[key],
      protocol[key],
      !shared.hasOwn(data, key)
    );
    if (shared.isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!shared.isArray(protocol)) {
    return validateProtocol(
      name,
      args[0] || /* @__PURE__ */ Object.create(null),
      protocol,
      onFail
    );
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!shared.isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = shared.isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType = /* @__PURE__ */ shared.makeMap(
  "String,Number,Boolean,Function,Symbol"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t11 = typeof value;
    valid = t11 === expectedType.toLowerCase();
    if (!valid && t11 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = shared.isObject(value);
  } else if (expectedType === "Array") {
    valid = shared.isArray(value);
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
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(shared.capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = shared.toRawType(value);
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
function findInvokeCallbackByName(name) {
  for (const key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      return true;
    }
  }
  return false;
}
function removeKeepAliveApiCallback(name, callback) {
  for (const key in invokeCallbacks) {
    const item = invokeCallbacks[key];
    if (item.callback === callback && item.name === name) {
      delete invokeCallbacks[key];
    }
  }
}
function removeAllKeepAliveApiCallbacks(name) {
  for (const key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      delete invokeCallbacks[key];
    }
  }
}
function offKeepAliveApiCallback(name, eventTransport2) {
  const eventName = eventTransport2 ? name : "api." + name;
  const transport = eventTransport2 || UniServiceJSBridge;
  transport.off(eventName);
}
function onKeepAliveApiCallback(name, eventTransport2) {
  const eventName = eventTransport2 ? name : "api." + name;
  const transport = eventTransport2 || UniServiceJSBridge;
  transport.on(eventName, (res) => {
    for (const key in invokeCallbacks) {
      const opts = invokeCallbacks[key];
      if (opts.name === name) {
        opts.callback(res);
      }
    }
  });
}
function createKeepAliveApiCallback(name, callback) {
  return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (shared.isFunction(fn)) {
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
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!shared.isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = shared.isFunction(success);
  const hasFail = shared.isFunction(fail);
  const hasComplete = shared.isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    shared.isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      shared.isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (shared.isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors[name];
    if (!shared.isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return shared.isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (shared.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && shared.isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(
          scopedInterceptor[hook]
        );
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api2, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (shared.isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api2(
          wrapperOptions(getApiInterceptorHooks(method), options2),
          ...params
        );
      });
    } else {
      return api2(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api2(options, ...params);
}
function hasCallback(args) {
  if (shared.isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find(
    (cb) => shared.isFunction(args[cb])
  )) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(
        name,
        invokeApi(name, fn, shared.extend({}, args), rest)
      );
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve, reject) => {
          invokeApi(
            name,
            fn,
            shared.extend({}, args, { success: resolve, fail: reject }),
            rest
          );
        })
      )
    );
  };
}
function normalizeFormatApiParams(args) {
  const params = args[0];
  if (shared.isPlainObject(params)) {
    return params;
  }
  const normalizedParams = {};
  args[0] = normalizedParams;
  return normalizedParams;
}
function formatApiArgs(args, options) {
  const rawParams = args[0];
  if (!options || !options.formatArgs || !shared.isPlainObject(options.formatArgs) && shared.isPlainObject(rawParams)) {
    return;
  }
  const params = normalizeFormatApiParams(args);
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (shared.isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(params[name], params);
      if (shared.isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!shared.hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id2, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  {
    result.errSubject = name;
  }
  return invokeCallback(id2, shared.extend(res || {}, result));
}
function invokeFail(id2, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  let res = shared.extend({ errMsg: apiErrMsg }, errRes);
  {
    if (typeof UniError !== "undefined") {
      const errOptions = shared.extend({}, errRes);
      if (typeof errOptions.errSubject === "undefined") {
        errOptions.errSubject = name;
      }
      res = new UniError(apiErrMsg, errOptions);
    }
  }
  return invokeCallback(id2, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  if (process.env.NODE_ENV !== "production") {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (shared.isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback) {
  if (!shared.isFunction(callback)) {
    throw new Error(
      'Invalid args: type check failed for args "callback". Expected Function'
    );
  }
}
function wrapperOnApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    const errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
    createKeepAliveApiCallback(name, callback);
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name, options == null ? void 0 : options.eventTransport);
      fn();
    }
  };
}
function wrapperOffApi(name, fn, options) {
  return (callback) => {
    const clearAll = (options == null ? void 0 : options.allowClearAll) === true && callback == null;
    if (!clearAll) {
      checkCallback(callback);
    }
    const errMsg = beforeInvokeApi(
      name,
      clearAll ? [] : [callback],
      void 0,
      options
    );
    if (errMsg) {
      throw new Error(errMsg);
    }
    const onApiName = name.replace("off", "on");
    if (clearAll) {
      removeAllKeepAliveApiCallbacks(onApiName);
    } else {
      removeKeepAliveApiCallback(onApiName, callback);
    }
    const hasInvokeOnApi = findInvokeCallbackByName(onApiName);
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(onApiName, options == null ? void 0 : options.eventTransport);
      fn();
    }
  };
}
function parseErrMsg(errMsg) {
  if (!errMsg || shared.isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    return errMsg.message;
  }
  return errMsg;
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
      reject: (errMsg2, errRes) => invokeFail(id2, name, parseErrMsg(errMsg2), errRes)
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
  return promisify(
    name,
    wrapperTaskApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options)
  );
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(
    name,
    fn,
    process.env.NODE_ENV !== "production" ? protocol : void 0,
    options
  );
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(
    name,
    wrapperAsyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options)
  );
}
const API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
const API_GET_LOCALE = "getLocale";
const getLocale = /* @__PURE__ */ defineSyncApi(
  API_GET_LOCALE,
  () => {
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
    return useI18n().getLocale();
  }
);
const API_ON_APP_ROUTE = "onAppRoute";
const API_OFF_APP_ROUTE = "offAppRoute";
const API_ON_BEFORE_APP_ROUTE = "onBeforeAppRoute";
const API_OFF_BEFORE_APP_ROUTE = "offBeforeAppRoute";
const API_REWRITE_ROUTE = "rewriteRoute";
const eventTransport = /* @__PURE__ */ new uniShared.Emitter();
let activeBeforeAppRouteContext;
const MAX_APP_ROUTE_REWRITE_COUNT = 100;
const APP_ROUTE_ERROR_CODE = 4;
function createAppRouteRuntime(options = {}) {
  let routeEventId = 0;
  const onAppRoute = /* @__PURE__ */ defineOnApi(API_ON_APP_ROUTE, () => {
  }, {
    eventTransport
  });
  const offAppRoute = /* @__PURE__ */ defineOffApi(API_OFF_APP_ROUTE, () => {
  }, {
    allowClearAll: true,
    eventTransport
  });
  const onBeforeAppRoute = /* @__PURE__ */ defineOnApi(
    API_ON_BEFORE_APP_ROUTE,
    () => {
    },
    { eventTransport }
  );
  const offBeforeAppRoute = /* @__PURE__ */ defineOffApi(
    API_OFF_BEFORE_APP_ROUTE,
    () => {
    },
    {
      allowClearAll: true,
      eventTransport
    }
  );
  const rewriteRoute = /* @__PURE__ */ defineAsyncApi(
    API_REWRITE_ROUTE,
    ({ url, preserveQuery }, { resolve, reject }) => {
      const rejectRewriteRoute = (errMsg) => reject(errMsg, { errCode: APP_ROUTE_ERROR_CODE });
      const context = activeBeforeAppRouteContext;
      if (!context) {
        rejectRewriteRoute(
          "rewriteRoute is only allowed in a onBeforeAppRoute callback"
        );
        return;
      }
      if (context.event.openType === "navigateBack") {
        rejectRewriteRoute(
          'a "navigateBack" event is not allowed to be rewritten'
        );
        return;
      }
      if (context.rewrite) {
        rejectRewriteRoute(
          `rewriteRoute can only be called once in a route event, this page has been rewritten to "${context.rewrite.path}"`
        );
        return;
      }
      if ((context.rewriteCount || 0) >= MAX_APP_ROUTE_REWRITE_COUNT) {
        rejectRewriteRoute(
          `rewriteRoute exceeded the maximum rewrite count of ${MAX_APP_ROUTE_REWRITE_COUNT}`
        );
        return;
      }
      if (!context.normalizeRewriteRoute) {
        rejectRewriteRoute("not supported");
        return;
      }
      const rewrite = context.normalizeRewriteRoute(
        { url, preserveQuery },
        context.event
      );
      if (typeof rewrite === "string") {
        rejectRewriteRoute(rewrite);
        return;
      }
      context.rewrite = rewrite;
      resolve();
    },
    {
      url: {
        type: String,
        required: true
      },
      preserveQuery: Boolean
    }
  );
  function createAppRouteContext2(event) {
    const timeStamp = event.timeStamp ?? Date.now();
    return {
      event: {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp,
        routeEventId: event.routeEventId ?? `${timeStamp}-${++routeEventId}`
      },
      normalizeRewriteRoute: options.normalizeRewriteRoute
    };
  }
  function dispatchBeforeAppRoute(context) {
    const event = context.event;
    const beforeEvent = {
      path: event.path,
      query: Object.assign({}, event.query),
      openType: event.openType,
      notFound: event.notFound,
      routeEventId: event.routeEventId
    };
    const previousContext = activeBeforeAppRouteContext;
    activeBeforeAppRouteContext = context;
    try {
      eventTransport.emit(API_ON_BEFORE_APP_ROUTE, beforeEvent);
    } catch (error) {
      console.error(error);
    } finally {
      activeBeforeAppRouteContext = previousContext;
    }
    return context.rewrite;
  }
  function dispatchAppRoute(context) {
    const event = context.event;
    try {
      const routeEvent = {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp: event.timeStamp,
        routeEventId: event.routeEventId
      };
      eventTransport.emit(API_ON_APP_ROUTE, routeEvent);
    } catch (error) {
      console.error(error);
    }
  }
  return {
    onAppRoute,
    offAppRoute,
    onBeforeAppRoute,
    offBeforeAppRoute,
    rewriteRoute,
    createAppRouteContext: createAppRouteContext2,
    dispatchBeforeAppRoute,
    dispatchAppRoute
  };
}
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
    if (shared.hasOwn(data, key)) {
      let v2 = data[key];
      if (typeof v2 === "undefined" || v2 === null) {
        v2 = "";
      } else if (shared.isPlainObject(v2)) {
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
      params.method = elemInArray(
        (value || "").toUpperCase(),
        HTTP_METHODS
      );
    },
    data(value, params) {
      params.data = value || "";
    },
    url(value, params) {
      if (params.method === HTTP_METHODS[0] && shared.isPlainObject(params.data) && Object.keys(params.data).length) {
        params.url = stringifyQuery(value, params.data);
      }
    },
    header(value, params) {
      const header = params.header = value || {};
      if (params.method !== HTTP_METHODS[0]) {
        if (!Object.keys(header).find(
          (key) => key.toLowerCase() === "content-type"
        )) {
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
function encodeQueryString(url) {
  if (!shared.isString(url)) {
    return url;
  }
  const index2 = url.indexOf("?");
  if (index2 === -1) {
    return url;
  }
  const query = url.slice(index2 + 1).trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return url;
  }
  url = url.slice(0, index2);
  const params = [];
  query.split("&").forEach((param) => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = parts.shift();
    const val = parts.length > 0 ? parts.join("=") : "";
    params.push(key + "=" + encodeURIComponent(val));
  });
  return params.length ? url + "?" + params.join("&") : url;
}
const API_NAVIGATE_TO = "navigateTo";
const API_REDIRECT_TO = "redirectTo";
const API_SWITCH_TAB = "switchTab";
const API_PRELOAD_PAGE = "preloadPage";
const API_UN_PRELOAD_PAGE = "unPreloadPage";
let navigatorLock;
function createNormalizeUrl(type, options = {}) {
  return function normalizeUrl(url, params) {
    if (!url) {
      return `Missing required args: "url"`;
    }
    url = normalizeRoute(url);
    const pagePath = url.split("?")[0];
    const routeOptions = getRouteOptions(pagePath, true);
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
        const pages = getCurrentPages();
        const tabBarPagePath = routeOptions.path.slice(1);
        if (pages.find((page) => page.route === tabBarPagePath)) {
          return "tabBar page `" + tabBarPagePath + "` already exists";
        }
      }
      return;
    }
    if (!options.skipNavigatorLock && navigatorLock === url && params.openType !== "appLaunch") {
      return `${navigatorLock} locked`;
    }
    if (!options.skipNavigatorLock && __uniConfig.ready) {
      navigatorLock = url;
    }
  };
}
const API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
const API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
const SetNavigationBarTitleProtocol = {
  title: {
    type: String,
    required: true
  }
};
const API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
const API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
function normalizeAppRoutePath(path) {
  const route = getRouteOptions(path, true);
  const pagePath = route == null ? void 0 : route.meta.route;
  return typeof pagePath === "string" ? pagePath : uniShared.removeLeadingSlash((route == null ? void 0 : route.path) || path);
}
function normalizeRewriteRoute({ url, preserveQuery }, event) {
  if (preserveQuery) {
    url = uniShared.parseUrl(url).path + uniShared.stringifyQuery(event.query);
  }
  const params = { url, openType: event.openType };
  const errMsg = createNormalizeUrl(event.openType, {
    skipNavigatorLock: true
  })(url, params);
  if (errMsg) {
    return errMsg;
  }
  const { path, query } = uniShared.parseUrl(params.url);
  return {
    url: params.url,
    path: normalizeAppRoutePath(path),
    query: uniShared.decodedQuery(query),
    notFound: false
  };
}
const appRouteRuntime = createAppRouteRuntime({ normalizeRewriteRoute });
const pendingProgrammaticRoutes = [];
new Promise((resolve) => {
});
function createAppRouteContext(path, query, openType, notFound = false) {
  return appRouteRuntime.createAppRouteContext({
    path: normalizeAppRoutePath(path),
    query: uniShared.decodedQuery(query),
    openType,
    notFound
  });
}
function resolveAppRoute(url, openType, notFound = false) {
  let routeUrl = url;
  let routeNotFound = notFound;
  let rewriteCount = 0;
  while (true) {
    const { path, query } = uniShared.parseUrl(routeUrl);
    const context = createAppRouteContext(path, query, openType, routeNotFound);
    context.rewriteCount = rewriteCount;
    const rewrite = appRouteRuntime.dispatchBeforeAppRoute(context);
    if (!rewrite) {
      return { url: routeUrl, context };
    }
    routeUrl = rewrite.url;
    routeNotFound = rewrite.notFound;
    rewriteCount++;
  }
}
function createWebAppRouteTransaction(finalFullPath, openType, context) {
  return {
    finalFullPath,
    openType,
    context
  };
}
function queueWebAppRouteTransaction(transaction) {
  pendingProgrammaticRoutes.push(transaction);
}
function discardWebAppRouteTransaction(transaction) {
  transaction.cancelled = true;
  const index2 = pendingProgrammaticRoutes.indexOf(transaction);
  if (index2 !== -1) {
    pendingProgrammaticRoutes.splice(index2, 1);
  }
}
function isCurrentTabBarPage(url) {
  const pages = getCurrentBasePages();
  const currentPage = pages[pages.length - 1];
  if (!(currentPage == null ? void 0 : currentPage.$.__isTabBar)) {
    return false;
  }
  const path = uniShared.parseUrl(url).path;
  const $page = getPage$BasePage(currentPage);
  return path === $page.path || path === "/" && $page.meta.isEntry;
}
function findTabBarPageId(url) {
  const path = uniShared.parseUrl(url).path;
  const pages = getCurrentPagesMap().values();
  for (const page of pages) {
    const $page = getPage$BasePage(page);
    if (path === $page.path || path === "/" && $page.meta.isEntry) {
      return $page.id;
    }
  }
}
function navigate({ type, url, tabBarText, events, isAutomatedTesting }, __id__) {
  if (process.env.NODE_ENV !== "production" && !__UNI_FEATURE_PAGES__) {
    console.warn(
      "当前项目为单页面工程，不能执行页面跳转api。如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。"
    );
  }
  let router2;
  router2 = getRouterInstance();
  return new Promise((resolve, reject) => {
    let routeUrl = url;
    let transaction;
    {
      const shouldDispatchAppRoute = type !== "switchTab" || !isCurrentTabBarPage(url);
      const appRoute = shouldDispatchAppRoute ? resolveAppRoute(url, type) : void 0;
      routeUrl = (appRoute == null ? void 0 : appRoute.url) || url;
      const { path: path2, query: query2 } = uniShared.parseUrl(routeUrl);
      transaction = createWebAppRouteTransaction(
        router2.resolve({ path: path2, query: query2 }).fullPath,
        type,
        appRoute == null ? void 0 : appRoute.context
      );
    }
    const { path, query } = uniShared.parseUrl(routeUrl);
    const tabBarPageId = type === "switchTab" ? findTabBarPageId(routeUrl) : __id__;
    const state = createPageState(type, tabBarPageId);
    if (transaction) {
      transaction.pageId = state.__id__;
      queueWebAppRouteTransaction(transaction);
    }
    const navigation = router2[type === "navigateTo" ? "push" : "replace"]({
      path,
      query,
      state,
      force: true
    }).then((failure) => {
      if (vueRouter.isNavigationFailure(failure)) {
        transaction && discardWebAppRouteTransaction(transaction);
        return reject(failure.message);
      }
      if (type === "switchTab") {
        const finalTabBarText = routeUrl === url ? tabBarText : router2.resolve({ path, query }).meta.tabBarText;
        router2.currentRoute.value.meta.tabBarText = finalTabBarText;
      }
      if (type === "navigateTo") {
        const meta = router2.currentRoute.value.meta;
        if (!meta.eventChannel) {
          meta.eventChannel = new uniShared.EventChannel(state.__id__, events);
        } else if (events) {
          Object.keys(events).forEach((eventName) => {
            meta.eventChannel._addListener(
              eventName,
              "on",
              events[eventName]
            );
          });
          meta.eventChannel._clearCache();
        }
        return isAutomatedTesting ? resolve({
          __id__: state.__id__
        }) : resolve({
          eventChannel: meta.eventChannel
        });
      }
      return isAutomatedTesting ? resolve({ __id__: state.__id__ }) : resolve();
    });
    {
      navigation.catch((error) => {
        transaction && discardWebAppRouteTransaction(transaction);
        reject(error instanceof Error ? error.message : error);
      });
    }
  });
}
function handleBeforeEntryPageRoutes() {
  if (entryPageState.handledBeforeEntryPageRoutes) {
    return;
  }
  entryPageState.handledBeforeEntryPageRoutes = true;
  const navigateToPages = [...navigateToPagesBeforeEntryPages];
  navigateToPagesBeforeEntryPages.length = 0;
  navigateToPages.forEach(
    ({ args, resolve, reject }) => (
      // @ts-expect-error
      navigate(args).then(resolve).catch(reject)
    )
  );
  const switchTabPages = [...switchTabPagesBeforeEntryPages];
  switchTabPagesBeforeEntryPages.length = 0;
  switchTabPages.forEach(({ args, resolve, reject }) => {
    navigate(args, void 0).then(resolve).catch(reject);
  });
  const redirectToPages = [...redirectToPagesBeforeEntryPages];
  redirectToPagesBeforeEntryPages.length = 0;
  redirectToPages.forEach(({ args, resolve, reject }) => {
    navigate(args).then(resolve).catch(reject);
  });
  const reLaunchPages = [...reLaunchPagesBeforeEntryPages];
  reLaunchPagesBeforeEntryPages.length = 0;
  reLaunchPages.forEach(({ args, resolve, reject }) => {
    navigate(args).then(resolve).catch(reject);
  });
}
function getTheme() {
  if (__uniConfig.darkmode == null || __uniConfig.darkmode === false)
    return void 0;
  if (__uniConfig.darkmode !== true)
    return shared.isString(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
  try {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch (error) {
    return "light";
  }
}
function onThemeChange(callback) {
  if (__uniConfig.darkmode) {
    UniServiceJSBridge.on(uniShared.ON_THEME_CHANGE, callback);
  }
}
function parseTheme(pageStyle) {
  let parsedStyle = {};
  if (__uniConfig.darkmode) {
    parsedStyle = uniShared.normalizeStyles(
      pageStyle,
      __uniConfig.themeConfig,
      getTheme()
    );
  }
  return __uniConfig.darkmode ? parsedStyle : pageStyle;
}
function useTheme(pageStyle, onThemeChangeCallback) {
  const isReactivity = Vue.isReactive(pageStyle);
  const reactivePageStyle = isReactivity ? Vue.reactive(parseTheme(pageStyle)) : parseTheme(pageStyle);
  if (__uniConfig.darkmode && isReactivity) {
    Vue.watch(pageStyle, (value) => {
      const _pageStyle = parseTheme(value);
      for (const key in _pageStyle) {
        reactivePageStyle[key] = _pageStyle[key];
      }
    });
  }
  onThemeChangeCallback && onThemeChange(onThemeChangeCallback);
  return reactivePageStyle;
}
let _tabBar;
function useTabBar() {
  if (!_tabBar) {
    _tabBar = __uniConfig.tabBar && Vue.reactive(initTabBarI18n(__uniConfig.tabBar));
  }
  const tabBar = useTheme(_tabBar, () => {
    const tabBarStyle = parseTheme(_tabBar);
    tabBar.backgroundColor = tabBarStyle.backgroundColor;
    tabBar.borderStyle = tabBarStyle.borderStyle;
    tabBar.color = tabBarStyle.color;
    tabBar.selectedColor = tabBarStyle.selectedColor;
    tabBar.blurEffect = tabBarStyle.blurEffect;
    tabBar.midButton = tabBarStyle.midButton;
    if (tabBarStyle.list && tabBarStyle.list.length) {
      tabBarStyle.list.forEach((item, index2) => {
        tabBar.list[index2].iconPath = item.iconPath;
        tabBar.list[index2].selectedIconPath = item.selectedIconPath;
      });
    }
  });
  return tabBar;
}
const envMethod = /* @__PURE__ */ (() => "env")();
function normalizeWindowBottom(windowBottom) {
  return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
const homeDialogPages = [];
const homeSystemDialogPages = [];
function getPageElement(page) {
  {
    throw new Error("Not support get page element in non-browser environment");
  }
}
class UniPageImpl {
  constructor({
    route,
    options,
    vm
  }) {
    this.getParentPage = () => null;
    this.route = (vm == null ? void 0 : vm.route) || route;
    this.options = options;
    this.vm = vm;
    this.$vm = vm;
  }
  get statusBarHeight() {
    return safeAreaInsets$1.top;
  }
  get width() {
    return this.pageBody.width;
  }
  get height() {
    const pageEle = getPageElement();
    const pageHead = pageEle.querySelector("uni-page-head");
    return this.pageBody.height + (pageHead ? pageHead.clientHeight : 0);
  }
  get pageBody() {
    const pageEle = getPageElement();
    const pageBody = pageEle.querySelector("uni-page-wrapper");
    const pageWrapperInfo = getPageWrapperInfo(pageBody);
    return {
      top: pageWrapperInfo.top,
      left: pageWrapperInfo.left,
      right: pageWrapperInfo.left + pageWrapperInfo.width,
      bottom: pageWrapperInfo.top + pageWrapperInfo.height,
      width: pageWrapperInfo.width,
      height: pageWrapperInfo.height
    };
  }
  get safeAreaInsets() {
    const pageEle = getPageElement();
    const pageBody = pageEle.querySelector("uni-page-wrapper");
    return getSafeAreaInsets(pageBody);
  }
  getPageStyle() {
    var _a, _b, _c, _d, _e;
    const pageMeta = ((_a = this.vm) == null ? void 0 : _a.$basePage.meta) ? uniShared.normalizeStyles((_b = this.vm) == null ? void 0 : _b.$basePage.meta, __uniConfig.themeConfig) : void 0;
    const scriptLang = (_e = (_d = (_c = this.vm) == null ? void 0 : _c.$) == null ? void 0 : _d.type) == null ? void 0 : _e.__scriptLang;
    const pageStyle = pageMeta ? {
      navigationBarBackgroundColor: pageMeta.navigationBar.backgroundColor,
      navigationBarTextStyle: pageMeta.navigationBar.titleColor,
      navigationBarTitleText: pageMeta.navigationBar.titleText,
      titleImage: pageMeta.navigationBar.titleImage || "",
      navigationStyle: pageMeta.navigationBar.style || "default",
      disableScroll: pageMeta.disableScroll || false,
      enablePullDownRefresh: pageMeta.enablePullDownRefresh || false,
      onReachBottomDistance: pageMeta.onReachBottomDistance || uniShared.ON_REACH_BOTTOM_DISTANCE,
      backgroundColorContent: pageMeta.backgroundColorContent
    } : {};
    if (!scriptLang || scriptLang === "uts") {
      return new uniShared.UTSJSONObject(pageStyle);
    }
    return pageStyle;
  }
  $getPageStyle() {
    return this.getPageStyle();
  }
  setPageStyle(style) {
    var _a;
    const pageMeta = (_a = this.vm) == null ? void 0 : _a.$basePage.meta;
    if (!pageMeta)
      return;
    for (const key in style) {
      switch (key) {
        case "navigationBarBackgroundColor":
          pageMeta.navigationBar.backgroundColor = style[key];
          break;
        case "navigationBarTextStyle":
          const textStyle = style[key];
          if (textStyle == null) {
            continue;
          }
          pageMeta.navigationBar.titleColor = ["black", "white"].includes(
            textStyle
          ) ? uniShared.normalizeTitleColor(textStyle || "") : textStyle;
          break;
        case "navigationBarTitleText":
          pageMeta.navigationBar.titleText = style[key];
          break;
        case "titleImage":
          pageMeta.navigationBar.titleImage = style[key];
          break;
        case "navigationStyle":
          pageMeta.navigationBar.style = style[key];
          break;
        default:
          pageMeta[key] = style[key];
          break;
      }
    }
  }
  $setPageStyle(style) {
    this.setPageStyle(style);
  }
  getElementById(id2) {
    {
      return null;
    }
  }
  querySelector(selector) {
    {
      return null;
    }
  }
  querySelectorAll(selector) {
    const res = [];
    {
      return res;
    }
  }
  getAndroidView() {
    return null;
  }
  getIOSView() {
    return null;
  }
  getHTMLElement() {
    {
      return null;
    }
  }
  getDialogPages() {
    return [];
  }
  $getSystemDialogPages() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this.vm) == null ? void 0 : _a.$pageLayoutInstance) == null ? void 0 : _b.$systemDialogPages) == null ? void 0 : _c.value) || [];
  }
  __$$getSystemDialogPages() {
    return [];
  }
  getAndroidActivity() {
    return null;
  }
  exitFullscreen() {
  }
  createElement() {
    return null;
  }
  onLayoutChange() {
    return -1;
  }
  offLayoutChange() {
  }
  onRenderChange() {
    return -1;
  }
  offRenderChange() {
  }
  onTouchStart() {
    return -1;
  }
  offTouchStart() {
  }
  onTouchEnd() {
    return -1;
  }
  offTouchEnd() {
  }
  takeSnapshot() {
  }
}
class UniNormalPageImpl extends UniPageImpl {
  getDialogPages() {
    var _a, _b;
    return ((_b = (_a = this.vm) == null ? void 0 : _a.$pageLayoutInstance) == null ? void 0 : _b.$dialogPages.value) || [];
  }
  constructor({
    route,
    options,
    vm
  }) {
    super({ route, options, vm });
  }
}
function initXPage(vm, route, page) {
  var _a, _b;
  initPageVm(vm, page);
  if (!("$pageLayoutInstance" in vm)) {
    Object.defineProperty(vm, "$pageLayoutInstance", {
      get() {
        var _a2, _b2;
        let res = (_a2 = vm.$) == null ? void 0 : _a2.parent;
        while (res && ((_b2 = res.type) == null ? void 0 : _b2.name) !== "Page") {
          res = res.parent;
        }
        return res;
      }
    });
  }
  vm.$.$waitNativeRender = (callback) => {
    vm.$nextTick(() => {
      callback && callback();
    });
  };
  const pageInstance = vm.$pageLayoutInstance;
  if (!isDialogPageInstance(pageInstance)) {
    const scriptLang = vm.$.type.__scriptLang;
    const isUTS = !scriptLang || scriptLang === "uts";
    const uniPage = new UniNormalPageImpl({
      route: (route == null ? void 0 : route.path) ? uniShared.removeLeadingSlash(route == null ? void 0 : route.path) : "",
      // 忽略类型，不同环境UTSJSONObject表示不同类型
      options: isUTS ? new uniShared.UTSJSONObject((route == null ? void 0 : route.query) || {}) : (route == null ? void 0 : route.query) || {},
      vm
    });
    vm.$.page = uniPage;
    vm.$dialogPage = (_a = vm.$pageLayoutInstance) == null ? void 0 : _a.$dialogPage;
    currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
    if (currentPagesMap.size === 1) {
      setTimeout(() => {
        handleBeforeEntryPageRoutes();
      }, 0);
      if (homeDialogPages.length) {
        homeDialogPages.forEach((dialogPage) => {
          dialogPage.getParentPage = () => vm.$page;
          pageInstance.$dialogPages.value.push(dialogPage);
        });
        homeDialogPages.length = 0;
      }
      if (homeSystemDialogPages.length) {
        homeSystemDialogPages.forEach((dialogPage) => {
          dialogPage.getParentPage = () => vm.$page;
          pageInstance.$systemDialogPages.value.push(dialogPage);
        });
        homeSystemDialogPages.length = 0;
      }
    }
  } else {
    vm.$.page = (_b = vm.$pageLayoutInstance) == null ? void 0 : _b.$dialogPage;
    pageInstance.$dialogPage.vm = vm;
    pageInstance.$dialogPage.$vm = vm;
    vm.$basePage.fullPath = vm.$basePage.path;
  }
}
const SEP = "$$";
const currentPagesMap = /* @__PURE__ */ new Map();
function getPage$BasePage(page) {
  return page.$basePage;
}
const entryPageState = {
  handledBeforeEntryPageRoutes: false
};
const navigateToPagesBeforeEntryPages = [];
const switchTabPagesBeforeEntryPages = [];
const redirectToPagesBeforeEntryPages = [];
const reLaunchPagesBeforeEntryPages = [];
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
  const curPages = getCurrentBasePages();
  {
    return curPages.map((page) => page.$page);
  }
}
function getCurrentBasePages() {
  const curPages = [];
  const pages = currentPagesMap.values();
  for (const page of pages) {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page);
      }
    } else {
      curPages.push(page);
    }
  }
  return curPages;
}
let id = /* @__PURE__ */ getStateId();
function createPageState(type, __id__) {
  return {
    __id__: __id__ || ++id,
    __type__: type
  };
}
let dialogPageId = Number.MIN_SAFE_INTEGER;
function createDialogPageId() {
  return ++dialogPageId;
}
function initPublicPage(route) {
  const meta = usePageMeta();
  if (!__UNI_FEATURE_PAGES__) {
    return initPageInternalInstance("navigateTo", __uniRoutes[0].path, {}, meta);
  }
  let fullPath = route.fullPath;
  if (route.meta.isEntry && fullPath.indexOf(route.meta.route) === -1) {
    fullPath = "/" + route.meta.route + fullPath.replace("/", "");
  }
  return initPageInternalInstance("navigateTo", fullPath, {}, meta);
}
function initPage(vm) {
  let route;
  route = vueRouter.useRoute();
  const page = initPublicPage(route);
  const routeMeta = route.meta;
  Object.defineProperty(page, "eventChannel", {
    configurable: true,
    enumerable: true,
    get: () => routeMeta.eventChannel,
    set: (eventChannel) => routeMeta.eventChannel = eventChannel
  });
  initPageVm(vm, page);
  {
    initXPage(vm, route, page);
  }
}
function normalizeRouteKey(path, id2) {
  return path + SEP + id2;
}
function useKeepAliveRoute() {
  const route = vueRouter.useRoute();
  const routeKey = Vue.computed(
    () => normalizeRouteKey("/" + route.meta.route, getStateId())
  );
  const isTabBar = Vue.computed(() => route.meta.isTabBar);
  return {
    routeKey,
    isTabBar,
    routeCache
  };
}
const pageCacheMap = /* @__PURE__ */ new Map();
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
function isTabBarCacheEntry(cacheEntry) {
  var _a;
  return ((_a = cacheEntry.attrs || cacheEntry.props) == null ? void 0 : _a.type) === "tabBar";
}
function pruneRouteCache(key) {
  const pageId = parseInt(key.split(SEP)[1]);
  if (!pageId) {
    return;
  }
  routeCache.forEach((cacheEntry, key2) => {
    const cPageId = parseInt(key2.split(SEP)[1]);
    if (cPageId && cPageId > pageId) {
      if (__UNI_FEATURE_TABBAR__ && isTabBarCacheEntry(cacheEntry)) {
        return;
      }
      routeCache.delete(key2);
      routeCache.pruneCacheEntry(cacheEntry);
      Vue.nextTick(() => pruneCurrentPages());
    }
  });
}
function addBase(filePath) {
  const { base: baseUrl } = __uniConfig.router;
  if (uniShared.addLeadingSlash(filePath).indexOf(baseUrl) === 0) {
    return uniShared.addLeadingSlash(filePath);
  }
  return baseUrl + filePath;
}
function getRealPath(filePath) {
  const { base, assets } = __uniConfig.router;
  if (base === "./") {
    if (filePath.indexOf("./") === 0 && (filePath.includes("/static/") || filePath.indexOf("./" + (assets || "assets") + "/") === 0)) {
      filePath = filePath.slice(1);
    }
  }
  if (filePath.indexOf("/") === 0) {
    if (filePath.indexOf("//") === 0) {
      filePath = "https:" + filePath;
    } else {
      return addBase(filePath.slice(1));
    }
  }
  if (uniShared.SCHEME_RE.test(filePath) || uniShared.DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) {
    return filePath;
  }
  {
    if (process.env.NODE_ENV !== "production") {
      if (!filePath.includes("/static/")) {
        return filePath;
      }
    }
  }
  const pages = getCurrentBasePages();
  if (pages.length) {
    return addBase(
      getRealRoute(
        getPage$BasePage(pages[pages.length - 1]).route,
        filePath
      ).slice(1)
    );
  }
  return filePath;
}
const t0$7 = Vue.template("<div class=uni-async-loading><i class=uni-loading>", 3);
const _sfc_main$9 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "AsyncLoading",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "asyncLoading",
  setup(__props) {
    const n0 = t0$7();
    return n0;
  }
});
const t0$6 = Vue.template("<div class=uni-async-error> ", 1);
const _sfc_main$8 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "AsyncError",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "asyncError",
  props: ["error"],
  setup(__props) {
    initI18nAsyncMsgsOnce();
    const { t: t11 } = useI18n();
    function reload() {
      window.location.reload();
    }
    const n0 = t0$6();
    const x0 = Vue.txt(n0);
    Vue.on(n0, "click", reload);
    Vue.renderEffect(() => Vue.setText(x0, Vue.toDisplayString(Vue.unref(t11)("uni.async.error"))));
    return n0;
  }
});
let appVm;
let $uniApp;
{
  class UniAppImpl {
    get vm() {
      return appVm;
    }
    get $vm() {
      return appVm;
    }
    get globalData() {
      return (appVm == null ? void 0 : appVm.globalData) || {};
    }
    getAndroidApplication() {
      return null;
    }
    getHarmonyAbility() {
      return null;
    }
  }
  $uniApp = new UniAppImpl();
}
function getApp$1() {
  {
    return $uniApp;
  }
}
function initApp$1(vm) {
  appVm = vm;
  Object.defineProperty(appVm.$.ctx, "$children", {
    get() {
      return getCurrentBasePages().map((page) => page.$vm);
    }
  });
  const app = appVm.$.appContext.app;
  if (!app.component(_sfc_main$9.name)) {
    app.component(_sfc_main$9.name, _sfc_main$9);
  }
  if (!app.component(_sfc_main$8.name)) {
    app.component(_sfc_main$8.name, _sfc_main$8);
  }
  initAppVm(appVm);
  defineGlobalData(appVm);
}
function wrapperComponentSetup(comp, { type, clone, init: init2, setup, before, options }) {
  if (clone) {
    comp = shared.extend({}, comp);
  }
  before && before(comp);
  const oldSetup = comp.setup;
  comp.setup = (props2, ctx) => {
    const instance = Vue.getCurrentInstance();
    init2(instance.proxy);
    setup(instance);
    if (oldSetup) {
      return oldSetup(props2, ctx);
    }
  };
  if (type === "page" || type === "window") {
    const styleIsolation = comp.styleIsolation || (__uniConfig.styleIsolation || {})[comp.__filename];
    if (styleIsolation !== "isolated") {
      comp.styleIsolation = "app";
    }
  }
  return comp;
}
function setupComponent(comp, options) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
    return wrapperComponentSetup(comp.default, options);
  }
  return wrapperComponentSetup(comp, options);
}
function setupWindow(comp, id2) {
  return setupComponent(comp, {
    type: "window",
    init: (vm) => {
      {
        vm.$basePage = {
          id: id2
        };
      }
    },
    setup(instance) {
      instance.$pageInstance = instance;
    }
  });
}
function setupPage(comp, path) {
  if (process.env.NODE_ENV !== "production") {
    comp.__mpType = "page";
  }
  if (path) {
    comp.__filename = path;
  }
  return setupComponent(comp, {
    type: "page",
    clone: true,
    // 页面组件可能会被其他地方手动引用，比如 windows 等，需要 clone 一份新的作为页面组件
    init: initPage,
    setup(instance) {
      instance.$pageInstance = instance;
      const route = usePageRoute();
      __UNI_FEATURE_PAGES__ ? vueRouter.useRouter() : void 0;
      const query = uniShared.decodedQuery(route.query);
      instance.__pageQuery = query;
      {
        const pageInstance = getPageInstanceByChild(instance);
        if (isDialogPageInstance(pageInstance)) {
          const dialogQuery = uniShared.decodedQuery(
            uniShared.parseQuery(
              (pageInstance == null ? void 0 : pageInstance.attrs.route).split("?")[1] || ""
            )
          );
          instance.__pageQuery = dialogQuery;
        }
      }
      getPage$BasePage(instance.proxy).options = query;
      instance.proxy.options = query;
      {
        return query;
      }
    }
  });
}
function setupApp(comp) {
  if (process.env.NODE_ENV !== "production") {
    comp.__mpType = "app";
  }
  return setupComponent(comp, {
    init: initApp$1,
    setup(instance) {
      const route = usePageRoute();
      {
        return route.query;
      }
    },
    before(comp2) {
      comp2.mpType = "app";
      const { setup } = comp2;
      const render = () => {
        return Vue.createComponent(_sfc_main, null, null, true);
      };
      comp2.setup = (props2, ctx) => {
        const res = setup && setup(props2, ctx);
        if (shared.isPromise(res)) {
          return res.then((value) => value || shared.EMPTY_OBJ);
        }
        return shared.isFunction(res) ? render : res;
      };
      comp2.render = render;
    }
  });
}
function updateDocumentTitle(title) {
  {
    const ssrContext = getApp$1().$vm.$.appContext.provides[Vue.ssrContextKey];
    if (ssrContext) {
      ssrContext[uniShared.UNI_SSR_TITLE] = title;
    }
  }
  UniServiceJSBridge.emit(uniShared.ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
  function update() {
    updateDocumentTitle(pageMeta.navigationBar.titleText);
  }
  Vue.watchEffect(update);
}
function updateBackgroundColorContent(backgroundColorContent) {
  {
    return;
  }
}
function useBackgroundColorContent(pageMeta) {
  function update() {
    if (pageMeta.backgroundColorContent) {
      updateBackgroundColorContent(
        parseTheme({ backgroundColorContent: pageMeta.backgroundColorContent }).backgroundColorContent
      );
    }
  }
  onThemeChange(update);
  Vue.watchEffect(update);
}
function hexToRgba(hex) {
  if (!hex) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
  }
  let tmpHex = hex.slice(1);
  const tmpHexLen = tmpHex.length;
  if (![3, 4, 6, 8].includes(tmpHexLen)) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
  }
  if (tmpHexLen === 3 || tmpHexLen === 4) {
    tmpHex = tmpHex.replace(/(\w{1})/g, "$1$1");
  }
  let [sr, sg, sb, sa] = tmpHex.match(/(\w{2})/g);
  const r = parseInt(sr, 16), g2 = parseInt(sg, 16), b = parseInt(sb, 16);
  if (!sa) {
    return { r, g: g2, b, a: 1 };
  }
  return {
    r,
    g: g2,
    b,
    a: (`0x100${sa}` - 65536) / 255
  };
}
function usePageHeadTransparentBackgroundColor(backgroundColor) {
  const { r, g: g2, b } = hexToRgba(backgroundColor);
  return `rgba(${r},${g2},${b},0)`;
}
function usePageHeadTransparent(headRef, {
  id: id2,
  navigationBar: { titleColor, coverage, backgroundColor }
}) {
  Vue.computed(() => hexToRgba(backgroundColor));
}
const t0$5 = Vue.template('<div class=uni-page-head-btn><svg width=26 height=26 viewBox="0 0 32 32"><path>');
const t1$3 = Vue.template('<svg viewBox="0 0 32 32"><path>', 0, 1);
const t2$2 = Vue.template('<span><i class=uni-btn-icon></i><svg width=14 height=14 viewBox="0 0 32 32"><path fill=#000>');
const t3$2 = Vue.template("<i class=uni-btn-icon></i>");
const t4$2 = Vue.template("<div>");
const t5$1 = Vue.template("<i class=uni-loading></i>", 2);
const t6$1 = Vue.template("<img class=uni-page-head__title_image>");
const t7$1 = Vue.template(" ");
const t8$1 = Vue.template("<div class=uni-page-head-bd><div class=uni-page-head__title></div>");
const t9 = Vue.template('<div class=uni-page-head-search><div><div class=uni-page-head-search-icon><svg width=20 height=20 viewBox="0 0 32 32"><path></div></div>');
const t10 = Vue.template("<div><div class=uni-page-head-hd></div><!><div class=uni-page-head-ft></div></div>");
const _sfc_main$7 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "PageHead",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "pageHead",
  setup(__props) {
    const hasPages = __UNI_FEATURE_PAGES__;
    const hasButtons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__;
    const hasSearchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__;
    const ICON_PATHS = {
      none: "",
      forward: "M11 7.844q-0.25-0.219-0.25-0.578t0.25-0.578q0.219-0.25 0.563-0.25t0.563 0.25l9.656 9.125q0.125 0.125 0.188 0.297t0.063 0.328q0 0.188-0.063 0.359t-0.188 0.297l-9.656 9.125q-0.219 0.25-0.563 0.25t-0.563-0.25q-0.25-0.219-0.25-0.578t0.25-0.609l9.063-8.594-9.063-8.594z",
      back: ICON_PATH_BACK,
      select: ICON_PATH_BACK,
      share: "M26.563 24.844q0 0.125-0.109 0.234t-0.234 0.109h-17.938q-0.125 0-0.219-0.109t-0.094-0.234v-13.25q0-0.156 0.094-0.25t0.219-0.094h5.5v-1.531h-6q-0.531 0-0.906 0.391t-0.375 0.922v14.375q0 0.531 0.375 0.922t0.906 0.391h18.969q0.531 0 0.891-0.391t0.359-0.953v-5.156h-1.438v4.625zM29.813 10.969l-5.125-5.375-1.031 1.094 3.438 3.594-3.719 0.031q-2.313 0.188-4.344 1.125t-3.578 2.422-2.5 3.453-1.109 4.188l-0.031 0.25h1.469v-0.219q0.156-1.875 1-3.594t2.25-3.063 3.234-2.125 3.828-0.906l0.188-0.031 3.313-0.031-3.438 3.625 1.031 1.063 5.125-5.375-0.031-0.063 0.031-0.063z",
      favorite: "M27.594 13.375q-0.063-0.188-0.219-0.313t-0.344-0.156l-7.094-0.969-3.219-6.406q-0.094-0.188-0.25-0.281t-0.375-0.094q-0.188 0-0.344 0.094t-0.25 0.281l-3.125 6.438-7.094 1.094q-0.188 0.031-0.344 0.156t-0.219 0.313q-0.031 0.188 0.016 0.375t0.172 0.313l5.156 4.969-1.156 7.063q-0.031 0.188 0.047 0.375t0.234 0.313q0.094 0.063 0.188 0.094t0.219 0.031q0.063 0 0.141-0.031t0.172-0.063l6.313-3.375 6.375 3.313q0.063 0.031 0.141 0.047t0.172 0.016q0.188 0 0.344-0.094t0.25-0.281q0.063-0.094 0.078-0.234t-0.016-0.234q0-0.031 0-0.063l-1.25-6.938 5.094-5.031q0.156-0.156 0.203-0.344t-0.016-0.375zM11.469 19.063q0.031-0.188-0.016-0.344t-0.172-0.281l-4.406-4.25 6.063-0.906q0.156-0.031 0.297-0.125t0.203-0.25l2.688-5.531 2.75 5.5q0.063 0.156 0.203 0.25t0.297 0.125l6.094 0.844-4.375 4.281q-0.125 0.125-0.172 0.297t-0.016 0.328l1.063 6.031-5.438-2.813q-0.156-0.094-0.328-0.078t-0.297 0.078l-5.438 2.875 1-6.031z",
      home: "M23.719 16.5q-0.313 0-0.531 0.219t-0.219 0.5v7.063q0 0.219-0.172 0.391t-0.391 0.172h-12.344q-0.25 0-0.422-0.172t-0.172-0.391v-7.063q0-0.281-0.219-0.5t-0.531-0.219q-0.281 0-0.516 0.219t-0.234 0.5v7.063q0.031 0.844 0.625 1.453t1.438 0.609h12.375q0.844 0 1.453-0.609t0.609-1.453v-7.063q0-0.125-0.063-0.266t-0.156-0.234q-0.094-0.125-0.234-0.172t-0.297-0.047zM26.5 14.875l-8.813-8.813q-0.313-0.313-0.688-0.453t-0.781-0.141-0.781 0.141-0.656 0.422l-8.813 8.844q-0.188 0.219-0.188 0.516t0.219 0.484q0.094 0.125 0.234 0.172t0.297 0.047q0.125 0 0.25-0.047t0.25-0.141l8.781-8.781q0.156-0.156 0.406-0.156t0.406 0.156l8.813 8.781q0.219 0.188 0.516 0.188t0.516-0.219q0.188-0.188 0.203-0.484t-0.172-0.516z",
      menu: "M8.938 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM16.188 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM23.469 18.313q0.844 0 1.453-0.609t0.609-1.453-0.609-1.453-1.453-0.609q-0.875 0-1.484 0.609t-0.609 1.453 0.609 1.453 1.484 0.609z",
      close: ICON_PATH_CLOSE
    };
    const headRef = Vue.ref(null);
    const pageMeta = usePageMeta();
    const navigationBar = useTheme(pageMeta.navigationBar, () => {
      const _navigationBar = parseTheme(pageMeta.navigationBar);
      navigationBar.backgroundColor = _navigationBar.backgroundColor;
      navigationBar.titleColor = _navigationBar.titleColor;
    });
    const { clazz, style } = usePageHead(navigationBar);
    const buttons = hasButtons && usePageHeadButtons(pageMeta);
    const searchInput = hasSearchInput && navigationBar.searchInput && usePageHeadSearchInput(pageMeta);
    const searchFocus = searchInput && searchInput.focus;
    const searchText = searchInput && searchInput.text;
    const searchComposing = searchInput && searchInput.composing;
    const searchOnClick = searchInput && searchInput.onClick;
    const searchOnFocus = searchInput && searchInput.onFocus;
    const searchOnBlur = searchInput && searchInput.onBlur;
    const searchOnInput = searchInput && searchInput.onInput;
    const searchOnConfirm = searchInput && searchInput.onConfirm;
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" && usePageHeadTransparent(headRef, pageMeta);
    function getSvgSize(size) {
      return size == null ? 27 : size;
    }
    function getSvgColor(color) {
      return color == null ? "#000" : color;
    }
    function onPageHeadBackButton() {
      if (getCurrentPages().length === 1) {
        uni.reLaunch({
          url: "/"
        });
      } else {
        uni.navigateBack({
          from: "backbutton",
          success() {
          }
          // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
        });
      }
    }
    function usePageHead(navigationBar2) {
      const clazz2 = Vue.computed(() => {
        const { type, titlePenetrate, shadowColorType } = navigationBar2;
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
      const style2 = Vue.computed(() => {
        const backgroundColor = __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar2.type === "transparent" ? usePageHeadTransparentBackgroundColor(navigationBar2.backgroundColor) : navigationBar2.backgroundColor;
        return {
          backgroundColor,
          color: navigationBar2.titleColor,
          transitionDuration: navigationBar2.duration,
          transitionTimingFunction: navigationBar2.timingFunc
        };
      });
      return { clazz: clazz2, style: style2 };
    }
    function usePageHeadButtons({ id: id2, navigationBar: navigationBar2 }) {
      const left = [];
      const right = [];
      const { buttons: buttons2 } = navigationBar2;
      if (shared.isArray(buttons2)) {
        const { type } = navigationBar2;
        const isTransparent = type === "transparent";
        const fonts = /* @__PURE__ */ Object.create(null);
        buttons2.forEach((btn, index2) => {
          if (btn.fontSrc && !btn.fontFamily) {
            const fontSrc = getRealPath(btn.fontSrc);
            let fontFamily = fonts[fontSrc];
            if (!fontFamily) {
              fontFamily = `font${Date.now()}`;
              fonts[fontSrc] = fontFamily;
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
      return { left, right };
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
      return new Proxy(
        {
          btnClass: {
            "uni-page-head-btn": true,
            "uni-page-head-btn-red-dot": !!(btn.redDot || btn.badgeText),
            "uni-page-head-btn-select": !!btn.select
          },
          btnStyle: {
            backgroundColor: isTransparent ? btn.background : "transparent",
            width: btn.width
          },
          btnText: "",
          btnIconPath: ICON_PATHS[btn.type],
          badgeText: btn.badgeText,
          iconStyle,
          onClick() {
            invokeHook(pageId, uniShared.ON_NAVIGATION_BAR_BUTTON_TAP, shared.extend({ index: index2 }, btn));
          },
          btnSelect: btn.select
        },
        {
          get(target, key, receiver) {
            if (["btnText"].includes(key)) {
              return btn.fontSrc && btn.fontFamily ? btn.text.replace("\\u", "&#x") : btn.text;
            } else {
              return Reflect.get(target, key, receiver);
            }
          }
        }
      );
    }
    function usePageHeadSearchInput({
      id: id2,
      navigationBar: { searchInput: searchInput2 }
    }) {
      const focus = Vue.ref(false);
      const text = Vue.ref("");
      const composing = Vue.ref(false);
      const { disabled } = searchInput2;
      if (disabled) {
        const onClick = () => {
          invokeHook(id2, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
        };
        return { focus, text, composing, onClick };
      }
      const onFocus = () => {
        focus.value = true;
        invokeHook(id2, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
          focus: true
        });
      };
      const onBlur = () => {
        focus.value = false;
        invokeHook(id2, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
          focus: false
        });
      };
      const onInput = (evt) => {
        text.value = evt.detail.value;
        invokeHook(id2, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, {
          text: text.value
        });
      };
      const onConfirm = (evt) => {
        invokeHook(id2, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, {
          text: text.value
        });
      };
      return { focus, text, composing, onFocus, onBlur, onInput, onConfirm };
    }
    const n64 = Vue.createPlainElement("uni-page-head", { "uni-page-head-type": () => Vue.unref(navigationBar).type || "default" }, null, true);
    const n60 = t10();
    Vue.insert(n60, n64);
    const n19 = Vue.child(n60);
    const n59 = Vue.next(n19);
    const n58 = Vue.next(n59);
    Vue.renderEffect(() => {
      Vue.setClass(n60, Vue.unref(clazz));
      Vue.setStyle(n60, Vue.unref(style));
    });
    Vue.setInsertionState(n19);
    Vue.createIf(() => Vue.unref(hasPages) && !Vue.unref(pageMeta).isQuit, () => {
      const n3 = t0$5();
      const n2 = Vue.child(Vue.child(n3));
      Vue.on(n3, "click", onPageHeadBackButton);
      Vue.renderEffect(() => {
        const _navigationBar = Vue.unref(navigationBar);
        Vue.setAttr(n2, "d", Vue.unref(ICON_PATH_BACK), true);
        Vue.setAttr(
          n2,
          "fill",
          _navigationBar.type === "transparent" ? "#fff" : _navigationBar.titleColor,
          true
        );
      });
      return n3;
    });
    Vue.setInsertionState(n19, 1);
    Vue.createIf(() => Vue.unref(hasButtons) && Vue.unref(buttons), () => {
      const n6 = Vue.createFor(
        () => Vue.unref(buttons).left,
        (_for_item0, _for_key0) => {
          const n18 = t4$2();
          Vue.renderEffect(() => {
            const _button = _for_item0.value;
            Vue.setClass(n18, _button.btnClass);
            Vue.setStyle(n18, _button.btnStyle);
            Vue.setAttr(n18, "badge-text", _button.badgeText);
          });
          Vue.setInsertionState(n18);
          Vue.createIf(
            () => _for_item0.value.btnIconPath,
            () => {
              const n11 = t1$3();
              const n10 = Vue.child(n11);
              Vue.renderEffect(() => {
                const _button = _for_item0.value;
                const _button_iconStyle = _button.iconStyle;
                const _getSvgSize_button_iconStyle_fontSize = getSvgSize(_button_iconStyle.fontSize);
                Vue.setAttr(n11, "width", _getSvgSize_button_iconStyle_fontSize, true);
                Vue.setAttr(n11, "height", _getSvgSize_button_iconStyle_fontSize, true);
                Vue.setAttr(n10, "d", _button.btnIconPath, true);
                Vue.setAttr(n10, "fill", getSvgColor(_button_iconStyle.color), true);
              });
              return n11;
            },
            () => Vue.createIf(
              () => _for_item0.value.btnSelect,
              () => {
                const n15 = t2$2();
                const n13 = Vue.child(n15);
                const n14 = Vue.child(Vue.next(n13));
                Vue.renderEffect(() => {
                  const _button = _for_item0.value;
                  Vue.setStyle(n15, _button.iconStyle);
                  Vue.setHtml(n13, _button.btnText);
                  Vue.setAttr(n14, "d", ICON_PATHS.select, true);
                });
                return n15;
              },
              () => {
                const n17 = t3$2();
                Vue.renderEffect(() => {
                  const _button = _for_item0.value;
                  Vue.setStyle(n17, _button.iconStyle);
                  Vue.setHtml(n17, _button.btnText);
                });
                return n17;
              },
              773
              /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_2 */
            ),
            517
            /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_1 */
          );
          Vue.on(n18, "click", (e2) => _for_item0.value.onClick(e2));
          return n18;
        },
        (button, index2) => index2,
        8
        /* IS_SINGLE_NODE */
      );
      return n6;
    });
    Vue.setInsertionState(n60, n59);
    Vue.createIf(
      () => !Vue.unref(hasSearchInput) || !Vue.unref(navigationBar).searchInput,
      () => {
        const n30 = t8$1();
        const n29 = Vue.child(n30);
        Vue.renderEffect(() => {
          const _navigationBar = Vue.unref(navigationBar);
          Vue.setStyle(n29, {
            fontSize: _navigationBar.titleSize,
            opacity: _navigationBar.type === "transparent" ? 0 : 1
          });
        });
        Vue.setInsertionState(n29);
        Vue.createIf(
          () => Vue.unref(navigationBar).loading,
          () => {
            const n24 = t5$1();
            return n24;
          },
          () => Vue.createIf(
            () => Vue.unref(navigationBar).titleImage,
            () => {
              const n26 = t6$1();
              Vue.renderEffect(() => Vue.setProp(n26, "src", Vue.unref(navigationBar).titleImage));
              return n26;
            },
            () => {
              const n28 = t7$1();
              Vue.renderEffect(() => Vue.setText(n28, Vue.toDisplayString(Vue.unref(navigationBar).titleText)));
              return n28;
            },
            1545
            /* TRUE_SINGLE_ROOT, FALSE_MULTI_ROOT, KEYED_INDEX_5 */
          ),
          1285
          /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_4 */
        );
        return n30;
      },
      () => {
        const n42 = t9();
        const n36 = Vue.child(n42);
        const n32 = Vue.child(Vue.child(Vue.child(n36)));
        Vue.renderEffect(() => {
          const _navigationBar = Vue.unref(navigationBar);
          const _navigationBar_searchInput = _navigationBar.searchInput;
          Vue.setStyle(n42, {
            borderRadius: _navigationBar_searchInput.borderRadius,
            backgroundColor: _navigationBar_searchInput.backgroundColor
          });
          Vue.setStyle(n36, { color: _navigationBar_searchInput.placeholderColor });
          Vue.setClass(n36, [
            "uni-page-head-search-placeholder",
            `uni-page-head-search-placeholder-${Vue.unref(searchFocus) || Vue.unref(searchText) ? "left" : _navigationBar_searchInput.align}`
          ]);
          Vue.setAttr(n32, "d", Vue.unref(ICON_PATH_SEARCH), true);
          Vue.setAttr(n32, "fill", _navigationBar_searchInput.placeholderColor, true);
        });
        Vue.setInsertionState(n36, 1);
        Vue.createIf(
          () => !(Vue.unref(searchText) || Vue.unref(searchComposing)),
          () => {
            const n35 = t7$1();
            Vue.renderEffect(() => Vue.setText(n35, Vue.toDisplayString(Vue.unref(navigationBar).searchInput.placeholder)));
            return n35;
          },
          null,
          2
          /* TRUE_MULTI_ROOT */
        );
        Vue.setInsertionState(n42, 1);
        Vue.createIf(
          () => Vue.unref(navigationBar).searchInput.disabled,
          () => {
            const _on_click = ($event) => Vue.unref(searchOnClick) && Vue.unref(searchOnClick)($event);
            const n39 = Vue.createComponent(Vue.unref(Input), {
              disabled: true,
              style: () => ({ color: Vue.unref(navigationBar).searchInput.color }),
              "placeholder-style": () => "color: " + Vue.unref(navigationBar).searchInput.placeholderColor,
              class: "uni-page-head-search-input",
              "confirm-type": "search",
              onClick: () => _on_click
            });
            return n39;
          },
          () => {
            const _on_focus = ($event) => Vue.unref(searchOnFocus) && Vue.unref(searchOnFocus)($event);
            const _on_blur = ($event) => Vue.unref(searchOnBlur) && Vue.unref(searchOnBlur)($event);
            const _on_input = ($event) => Vue.unref(searchOnInput) && Vue.unref(searchOnInput)($event);
            const _on_confirm = ($event) => Vue.unref(searchOnConfirm) && Vue.unref(searchOnConfirm)($event);
            const n41 = Vue.createComponent(Vue.unref(Input), {
              focus: () => Vue.unref(navigationBar).searchInput.autoFocus,
              style: () => ({ color: Vue.unref(navigationBar).searchInput.color }),
              "placeholder-style": () => "color: " + Vue.unref(navigationBar).searchInput.placeholderColor,
              class: "uni-page-head-search-input",
              "confirm-type": "search",
              onFocus: () => _on_focus,
              onBlur: () => _on_blur,
              onInput: () => _on_input,
              onConfirm: () => _on_confirm
            });
            return n41;
          },
          2309
          /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_8 */
        );
        return n42;
      },
      1797
      /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_6 */
    );
    Vue.setInsertionState(n58);
    Vue.createIf(() => Vue.unref(hasButtons) && Vue.unref(buttons), () => {
      const n45 = Vue.createFor(
        () => Vue.unref(buttons).right,
        (_for_item0, _for_key0) => {
          const n57 = t4$2();
          Vue.renderEffect(() => {
            const _button = _for_item0.value;
            Vue.setClass(n57, _button.btnClass);
            Vue.setStyle(n57, _button.btnStyle);
            Vue.setAttr(n57, "badge-text", _button.badgeText);
          });
          Vue.setInsertionState(n57);
          Vue.createIf(
            () => _for_item0.value.btnIconPath,
            () => {
              const n50 = t1$3();
              const n49 = Vue.child(n50);
              Vue.renderEffect(() => {
                const _button = _for_item0.value;
                const _button_iconStyle = _button.iconStyle;
                const _getSvgSize_button_iconStyle_fontSize = getSvgSize(_button_iconStyle.fontSize);
                Vue.setAttr(n50, "width", _getSvgSize_button_iconStyle_fontSize, true);
                Vue.setAttr(n50, "height", _getSvgSize_button_iconStyle_fontSize, true);
                Vue.setAttr(n49, "d", _button.btnIconPath, true);
                Vue.setAttr(n49, "fill", getSvgColor(_button_iconStyle.color), true);
              });
              return n50;
            },
            () => Vue.createIf(
              () => _for_item0.value.btnSelect,
              () => {
                const n54 = t2$2();
                const n52 = Vue.child(n54);
                const n53 = Vue.child(Vue.next(n52));
                Vue.renderEffect(() => {
                  const _button = _for_item0.value;
                  Vue.setStyle(n54, _button.iconStyle);
                  Vue.setHtml(n52, _button.btnText);
                  Vue.setAttr(n53, "d", ICON_PATHS.select, true);
                });
                return n54;
              },
              () => {
                const n56 = t3$2();
                Vue.renderEffect(() => {
                  const _button = _for_item0.value;
                  Vue.setStyle(n56, _button.iconStyle);
                  Vue.setHtml(n56, _button.btnText);
                });
                return n56;
              },
              2821
              /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_10 */
            ),
            2565
            /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_9 */
          );
          Vue.on(n57, "click", (e2) => _for_item0.value.onClick(e2));
          return n57;
        },
        (button, index2) => index2,
        8
        /* IS_SINGLE_NODE */
      );
      return n45;
    });
    Vue.setStaticTemplateRef(n60, headRef, null, "headRef");
    Vue.setInsertionState(n64, 1);
    Vue.createIf(() => Vue.unref(navigationBar).type !== "transparent" && Vue.unref(navigationBar).type !== "float", () => {
      const n63 = t4$2();
      Vue.renderEffect(() => Vue.setClassName(n63, 1 | (Vue.unref(navigationBar).titlePenetrate ? 2 : 0), [" uni-placeholder", " uni-placeholder-titlePenetrate"]));
      return n63;
    });
    return n64;
  }
});
const t0$4 = Vue.template('<div class=uni-page-refresh><div class=uni-page-refresh-inner><svg class=uni-page-refresh__icon width=24 height=24 viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path><path d="M0 0h24v24H0z" fill=none></svg><svg class=uni-page-refresh__spinner width=24 height=24 viewBox="25 25 50 50"><circle class=uni-page-refresh__path cx=50 cy=50 r=20 fill=none stroke-width=4 stroke-miterlimit=10>');
const _sfc_main$6 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{ name: "PageRefresh" },
  __name: "component",
  setup(__props) {
    const { pullToRefresh } = usePageMeta();
    const offset = pullToRefresh.offset;
    const color = pullToRefresh.color;
    const n3 = Vue.createPlainElement("uni-page-refresh", null, null, true);
    const n2 = t0$4();
    Vue.insert(n2, n3);
    const n0 = Vue.child(Vue.child(n2));
    const n1 = Vue.child(Vue.next(n0));
    Vue.renderEffect(() => {
      const _color = Vue.unref(color);
      Vue.setStyle(n2, { "margin-top": Vue.unref(offset) + "px" });
      Vue.setAttr(n0, "fill", _color, true);
      Vue.setAttr(n1, "stroke", _color, true);
    });
    return n3;
  }
});
const _sfc_main$5 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "PageBody",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "pageBody",
  __multiRoot: true,
  setup(__props) {
    const isX = true;
    const hasPullDownRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__;
    const pageMeta = hasPullDownRefresh ? usePageMeta() : null;
    const refreshRef = Vue.ref(null);
    const wrapperRef = Vue.ref(null);
    const _pageRefresh = null;
    const pageRefresh = Vue.ref(null);
    Vue.watch(
      () => pageMeta == null ? void 0 : pageMeta.enablePullDownRefresh,
      () => {
        pageRefresh.value = (pageMeta == null ? void 0 : pageMeta.enablePullDownRefresh) ? _pageRefresh : null;
      },
      {
        immediate: true
      }
    );
    function resize() {
      {
        return;
      }
    }
    const n0 = Vue.createIf(() => Vue.unref(hasPullDownRefresh) && !!Vue.unref(pageMeta) && (Vue.unref(isX) || !!Vue.unref(pageMeta).enablePullDownRefresh), () => {
      const n2 = Vue.createComponent(_sfc_main$6);
      Vue.setStaticTemplateRef(n2, refreshRef, null, "refreshRef");
      return n2;
    });
    const n8 = Vue.createPlainElement("uni-page-wrapper", { $: [
      () => pageRefresh.value
    ] });
    Vue.setInsertionState(n8);
    const n4 = Vue.createPlainElement("uni-page-body");
    Vue.setInsertionState(n4);
    Vue.createSlot();
    Vue.setInsertionState(n8, 1);
    Vue.createIf(() => Vue.unref(isX), () => {
      const n7 = Vue.createComponent(Vue.unref(ResizeSensor), { onResize: () => resize });
      return n7;
    });
    Vue.setStaticTemplateRef(n8, wrapperRef, null, "wrapperRef");
    return [n0, n8];
  }
});
const _sfc_main$4 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "Page",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "index-vapor",
  setup(__props) {
    var _a;
    const hasNavigationBar = __UNI_FEATURE_NAVIGATIONBAR__;
    const pageStyle = {};
    let pageMeta = providePageMeta(getStateId());
    const navigationBar = pageMeta.navigationBar;
    const currentInstance = Vue.getCurrentInstance();
    const attrs2 = currentInstance.attrs;
    const routeComponent = currentInstance.type;
    const pageComponent = routeComponent.__uniPageComponent;
    const pageProps = routeComponent.__uniGetPageProps();
    useDocumentTitle(pageMeta);
    currentInstance.$dialogPages = Vue.ref([]);
    currentInstance.$systemDialogPages = Vue.ref([]);
    if (isDialogPageInstance(currentInstance)) {
      pageMeta.route = attrs2.route;
      const routePageMeta = (_a = __uniRoutes.find(
        (route) => route.path === pageMeta.route.split("?")[0]
      )) == null ? void 0 : _a.meta;
      if (routePageMeta) {
        routePageMeta.navigationBar = Object.assign(
          navigationBar,
          routePageMeta.navigationBar
        );
        pageMeta = Object.assign(pageMeta, routePageMeta);
      }
      pageMeta.id = createDialogPageId();
      if (!(routePageMeta == null ? void 0 : routePageMeta.backgroundColorContent)) {
        pageMeta.backgroundColorContent = "transparent";
      }
      if (!(routePageMeta == null ? void 0 : routePageMeta.navigationBar.style)) {
        pageMeta.navigationBar.style = "custom";
      }
      if (attrs2["data-type"] === SYSTEM_DIALOG_TAG) {
        pageMeta.navigationBar.titleText = "";
      }
      const parentInstance = Vue.inject("parentInstance");
      if (currentInstance && parentInstance) {
        currentInstance.$parentInstance = parentInstance;
        assignDialogPage(currentInstance, parentInstance, currentInstance);
      }
    } else {
      useBackgroundColorContent(pageMeta);
      Vue.provide("parentInstance", currentInstance);
    }
    function getDialogPages() {
      const pages = [
        ...currentInstance.$dialogPages.value.map((page) => ({
          page,
          type: DIALOG_TAG
        })),
        ...currentInstance.$systemDialogPages.value.map((page) => ({
          page,
          type: SYSTEM_DIALOG_TAG
        }))
      ];
      pages.sort((a, b) => {
        var _a2, _b, _c, _d;
        const aId = ((_b = (_a2 = a.page.vm) == null ? void 0 : _a2.$basePage) == null ? void 0 : _b.id) || Number.MAX_SAFE_INTEGER;
        const bId = ((_d = (_c = b.page.vm) == null ? void 0 : _c.$basePage) == null ? void 0 : _d.id) || Number.MAX_SAFE_INTEGER;
        return aId - bId;
      });
      return pages.map(({ page, type }) => ({
        component: page.$component,
        type,
        route: `${page.route}${uniShared.stringifyQuery(page.options)}`
      }));
    }
    const dialogPageStyle = {
      position: "fixed",
      zIndex: 999,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    function assignDialogPage(ctx, parentInstance, currentInstance2) {
      let parentDialogPages = [];
      if (isNormalDialogPageInstance(ctx)) {
        parentDialogPages = parentInstance.$dialogPages.value;
      }
      if (isSystemDialogPageInstance(ctx)) {
        parentDialogPages = parentInstance.$systemDialogPages.value;
      }
      if (!parentDialogPages.length)
        return;
      for (let i = 0; i < parentDialogPages.length; i++) {
        const dialogPage = parentDialogPages[i];
        if (!dialogPage.$assigned) {
          dialogPage.$assigned = true;
          currentInstance2.$dialogPage = dialogPage;
          break;
        }
      }
    }
    const n8 = Vue.createPlainElement("uni-page", {
      "data-page": () => Vue.unref(pageMeta).route,
      style: () => pageStyle
    }, null, true);
    Vue.setInsertionState(n8);
    Vue.createIf(() => Vue.unref(hasNavigationBar) && Vue.unref(navigationBar).style !== "custom", () => {
      const n2 = Vue.createComponent(_sfc_main$7);
      return n2;
    });
    Vue.setInsertionState(n8, 1);
    Vue.createComponent(_sfc_main$5, null, Vue.extend(() => {
      const n3 = Vue.createDynamicComponent(
        () => Vue.unref(pageComponent),
        { $: [
          () => Vue.unref(pageProps)
        ] },
        null,
        4
        /* SLOT_ROOT */
      );
      Vue.setStaticTemplateRef(n3, "page");
      return n3;
    }, {
      _: 1
      /* NON_STABLE */
    }));
    Vue.setInsertionState(n8, 2);
    Vue.createFor(
      () => getDialogPages(),
      (_for_item0) => {
        const n7 = Vue.createDynamicComponent(() => _for_item0.value.component, {
          style: () => dialogPageStyle,
          "data-type": () => _for_item0.value.type,
          route: () => _for_item0.value.route
        });
        return n7;
      },
      (dialogPage) => dialogPage.route,
      18
      /* IS_COMPONENT, IS_FRAGMENT */
    );
    return n8;
  }
});
function createVaporPageRouteComponent(pageComponent, getPageProps) {
  return Object.assign({}, _sfc_main$4, {
    __uniPageComponent: pageComponent,
    __uniGetPageProps: getPageProps
  });
}
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = /* @__PURE__ */ makeMap(
  "area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"
);
var block = /* @__PURE__ */ makeMap(
  "a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"
);
var inline = /* @__PURE__ */ makeMap(
  "abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
);
var closeSelf = /* @__PURE__ */ makeMap(
  "colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"
);
var fillAttrs = /* @__PURE__ */ makeMap(
  "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"
);
var special = /* @__PURE__ */ makeMap("script,style");
function HTMLParser(html, handler) {
  var index2;
  var chars;
  var match;
  var stack = [];
  var last = html;
  stack.last = function() {
    return this[this.length - 1];
  };
  while (html) {
    chars = true;
    if (!stack.last() || !special[stack.last()]) {
      if (html.indexOf("<!--") == 0) {
        index2 = html.indexOf("-->");
        if (index2 >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index2));
          }
          html = html.substring(index2 + 3);
          chars = false;
        }
      } else if (html.indexOf("</") == 0) {
        match = html.match(endTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        }
      } else if (html.indexOf("<") == 0) {
        match = html.match(startTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }
      if (chars) {
        index2 = html.indexOf("<");
        var text = index2 < 0 ? html : html.substring(0, index2);
        html = index2 < 0 ? "" : html.substring(index2);
        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(
        new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"),
        function(all, text2) {
          text2 = text2.replace(
            /<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,
            "$1$2"
          );
          if (handler.chars) {
            handler.chars(text2);
          }
          return "";
        }
      );
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
          // "
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
function useQuill(props2, rootRef, trigger) {
  Vue.watch(
    () => props2.readOnly,
    (value) => {
    }
  );
  Vue.watch(
    () => props2.placeholder,
    (value) => {
    }
  );
  Vue.watch(
    () => props2.type,
    (value) => {
    }
  );
  useContextInfo();
  useSubscribe();
}
const props$m = /* @__PURE__ */ shared.extend({}, props$n, {
  id: {
    type: String,
    default: ""
  },
  readOnly: {
    type: [Boolean, String],
    default: false
  },
  type: {
    type: String,
    default: ""
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
const index$s = /* @__PURE__ */ defineBuiltInComponent({
  name: "Editor",
  props: props$m,
  emit: [
    "ready",
    "focus",
    "blur",
    "input",
    "statuschange",
    ...emit$1
  ],
  setup(props2, { emit: emit2 }) {
    const rootRef = Vue.ref(null);
    useQuill(props2);
    useKeyboard$1(props2, rootRef);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = Vue.createPlainElement("uni-editor", {
          id: () => props2.id,
          class: "ql-container"
        }, null, true);
        Vue.renderEffect(() => _setTemplateRef(_n0, rootRef));
        return _n0;
      })();
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
    c: uniShared.PRIMARY_COLOR
  },
  success_no_circle: {
    d: ICON_PATH_SUCCESS_NO_CIRCLE,
    c: uniShared.PRIMARY_COLOR
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
    c: uniShared.PRIMARY_COLOR
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
const index$r = /* @__PURE__ */ defineBuiltInComponent({
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
    const rootRef = Vue.ref(null);
    const path = Vue.computed(() => ICONS[props2.type]);
    return () => {
      const { value } = path;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-icon", null, Vue.extend(() => {
          const _n0 = createNodes(() => value && value.d && createSvgIconVNode(value.d, props2.color || value.c, rpx2px(props2.size)));
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
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
function useUserAction() {
  const state = Vue.reactive({
    /**
     * 是否用户激活
     */
    userAction: false
  });
  return {
    state
  };
}
function useScopedAttrs() {
  const state = Vue.reactive({
    attrs: {}
  });
  return {
    state
  };
}
function useFormField(nameKey, value) {
  const uniForm = Vue.inject(
    uniFormKey,
    false
    // remove warning
  );
  if (!uniForm) {
    return;
  }
  const instance = Vue.getCurrentInstance();
  const ctx = {
    submit() {
      const proxy = instance.proxy;
      return [
        proxy[nameKey],
        shared.isString(value) ? proxy[value] : value.value
      ];
    },
    reset() {
      if (shared.isString(value)) {
        instance.proxy[value] = "";
      } else {
        value.value = "";
      }
    }
  };
  uniForm.addField(ctx);
}
function getSelectedTextRange(_, resolve) {
  const activeElement = document.activeElement;
  if (!activeElement) {
    return resolve({});
  }
  const data = {};
  if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
    data.start = activeElement.selectionStart;
    data.end = activeElement.selectionEnd;
  }
  resolve(data);
}
const UniViewJSBridgeSubscribe = function() {
  registerViewMethod(
    getCurrentPageId(),
    "getSelectedTextRange",
    getSelectedTextRange
  );
};
function getValueString(value, type, maxlength) {
  if (type === "number" && isNaN(Number(value))) {
    value = "";
  }
  const valueStr = value === null || value === void 0 ? "" : String(value);
  if (maxlength == void 0) {
    return valueStr;
  }
  return valueStr.slice(0, maxlength);
}
const INPUT_MODES = [
  "none",
  "text",
  "decimal",
  "numeric",
  "tel",
  "search",
  "email",
  "url"
];
const props$l = /* @__PURE__ */ shared.extend(
  {},
  {
    name: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 已废弃属性，用于历史兼容
     */
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
      default: Infinity
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    },
    step: {
      type: String,
      default: "0.000000000000000001"
    },
    inputmode: {
      type: String,
      default: void 0,
      validator: (value) => !!~INPUT_MODES.indexOf(value)
    },
    cursorColor: {
      type: String,
      default: ""
    }
  },
  props$n
);
const emit = [
  "input",
  "focus",
  "blur",
  "update:value",
  "update:modelValue",
  "update:focus",
  "compositionstart",
  "compositionupdate",
  "compositionend",
  ...emit$1
];
function useBase(props2, rootRef, emit2) {
  const fieldRef = Vue.ref(null);
  const trigger = useCustomEvent(rootRef, emit2);
  const selectionStart = Vue.computed(() => {
    const selectionStart2 = Number(props2.selectionStart);
    return isNaN(selectionStart2) ? -1 : selectionStart2;
  });
  const selectionEnd = Vue.computed(() => {
    const selectionEnd2 = Number(props2.selectionEnd);
    return isNaN(selectionEnd2) ? -1 : selectionEnd2;
  });
  const cursor = Vue.computed(() => {
    const cursor2 = Number(props2.cursor);
    return isNaN(cursor2) ? -1 : cursor2;
  });
  const maxlength = Vue.computed(() => {
    var maxlength2 = Number(props2.maxlength);
    {
      return isNaN(maxlength2) || maxlength2 < 0 ? Infinity : Math.floor(maxlength2);
    }
  });
  let value = "";
  {
    const modelValueString = getValueString(
      props2.modelValue,
      props2.type,
      maxlength.value
    );
    const valueString = getValueString(props2.value, props2.type, maxlength.value);
    value = props2.modelValue !== void 0 ? modelValueString !== null && modelValueString !== void 0 ? modelValueString : valueString : valueString;
  }
  const state = Vue.reactive({
    value,
    valueOrigin: value,
    maxlength,
    focus: props2.focus,
    composing: false,
    selectionStart,
    selectionEnd,
    cursor
  });
  Vue.watch(
    () => state.focus,
    (val) => emit2("update:focus", val)
  );
  Vue.watch(
    () => state.maxlength,
    (val) => state.value = state.value.slice(0, val),
    {
      immediate: true
    }
  );
  return {
    fieldRef,
    state,
    trigger
  };
}
function useValueSync(props2, state, emit2, trigger, fieldRef) {
  let valueChangeFn = null;
  {
    valueChangeFn = throttle((val) => {
      state.value = getValueString(val, props2.type, state.maxlength);
    }, 100);
  }
  Vue.watch(() => props2.modelValue, valueChangeFn);
  Vue.watch(() => props2.value, valueChangeFn);
  const triggerInputFn = throttle((event, detail) => {
    valueChangeFn.cancel();
    emit2("update:modelValue", detail.value);
    emit2("update:value", detail.value);
    trigger("input", event, detail);
  }, 100);
  const triggerInput = (event, detail, force) => {
    valueChangeFn.cancel();
    detail.value;
    triggerInputFn(event, detail);
    if (force) {
      triggerInputFn.flush();
    }
  };
  return {
    trigger,
    triggerInput
  };
}
function useAutoFocus(props2, fieldRef) {
  useUserAction();
  const needFocus = Vue.computed(() => props2.autoFocus || props2.focus);
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
  Vue.watch(
    () => props2.focus,
    (value) => {
      if (value) {
        focus();
      } else {
        blur();
      }
    }
  );
}
function useEvent(fieldRef, state, props2, trigger, triggerInput, beforeInput) {
  function checkSelection() {
    const field = fieldRef.value;
    if (field && state.focus && state.selectionStart > -1 && state.selectionEnd > -1 && field.type !== "number") {
      field.selectionStart = state.selectionStart;
      field.selectionEnd = state.selectionEnd;
    }
  }
  function checkCursor() {
    const field = fieldRef.value;
    if (field && state.focus && state.selectionStart < 0 && state.selectionEnd < 0 && state.cursor > -1 && field.type !== "number") {
      field.selectionEnd = field.selectionStart = state.cursor;
    }
  }
  function getFieldSelectionEnd(field) {
    if (field.type === "number") {
      return null;
    } else {
      return field.selectionEnd;
    }
  }
  function initField() {
    const field = fieldRef.value;
    if (!field)
      return;
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
      if (shared.isFunction(beforeInput) && beforeInput(event, state) === false) {
        return;
      }
      state.value = field.value;
      if (!state.composing || !props2.ignoreCompositionEvent) {
        triggerInput(
          event,
          {
            value: field.value,
            cursor: getFieldSelectionEnd(field)
          },
          force
        );
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
        cursor: getFieldSelectionEnd(event.target)
      });
    };
    field.addEventListener("change", (event) => event.stopPropagation());
    field.addEventListener("focus", onFocus);
    field.addEventListener("blur", onBlur);
    field.addEventListener("input", onInput);
    field.addEventListener("compositionstart", (event) => {
      event.stopPropagation();
      state.composing = true;
      _onComposition(event);
    });
    field.addEventListener("compositionend", (event) => {
      event.stopPropagation();
      if (state.composing) {
        state.composing = false;
        onInput(event);
      }
      _onComposition(event);
    });
    field.addEventListener("compositionupdate", _onComposition);
    function _onComposition(event) {
      if (!props2.ignoreCompositionEvent) {
        trigger(event.type, event, {
          value: event.data
        });
      }
    }
  }
  Vue.watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
  Vue.watch(() => state.cursor, checkCursor);
  Vue.watch(() => fieldRef.value, initField);
}
function useField(props2, rootRef, emit2, beforeInput) {
  UniViewJSBridgeSubscribe();
  const { fieldRef, state, trigger } = useBase(props2, rootRef, emit2);
  const { triggerInput } = useValueSync(props2, state, emit2, trigger);
  useAutoFocus(props2, fieldRef);
  useKeyboard$1(props2, fieldRef);
  const { state: scopedAttrsState } = useScopedAttrs();
  useFormField("name", state);
  useEvent(fieldRef, state, props2, trigger, triggerInput, beforeInput);
  const fixDisabledColor = false;
  return {
    fieldRef,
    state,
    scopedAttrsState,
    fixDisabledColor,
    trigger
  };
}
uniShared.once(() => {
});
const _t0$k = Vue.template("<input tabindex=-1 class=uni-input-input>", 1);
const _t1$b = Vue.template("<input class=uni-input-input>", 1);
const _t2$5 = Vue.template("<form action class=uni-input-form> ");
const _t3$5 = Vue.template("<div class=uni-input-wrapper><div> </div>");
const props$k = /* @__PURE__ */ shared.extend({}, props$l, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  },
  textContentType: {
    type: String,
    default: ""
  }
});
function isPaste(event) {
  return event.inputType === "insertFromPaste";
}
function useCache(props2, type) {
  if (type.value === "number") {
    const value = typeof props2.modelValue === "undefined" ? props2.value : props2.modelValue;
    const cache = Vue.ref(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
    Vue.watch(() => props2.modelValue, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    Vue.watch(() => props2.value, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    return cache;
  } else {
    return Vue.ref("");
  }
}
const Input = /* @__PURE__ */ defineBuiltInComponent({
  name: "Input",
  props: props$k,
  emits: ["confirm", ...emit],
  setup(props2, { emit: emit2, expose }) {
    const INPUT_TYPES = [
      "text",
      "number",
      "idcard",
      "digit",
      "password",
      "tel"
    ];
    const AUTOCOMPLETES = ["off", "one-time-code"];
    const type = Vue.computed(() => {
      let type2 = "";
      switch (props2.type) {
        case "text":
          type2 = "text";
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
        case "none":
          type2 = "text";
          break;
        default:
          type2 = INPUT_TYPES.includes(props2.type) ? props2.type : "text";
          break;
      }
      return props2.password ? "password" : type2;
    });
    const autocomplete = Vue.computed(() => {
      const camelizeIndex = AUTOCOMPLETES.indexOf(props2.textContentType);
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(shared.hyphenate(props2.textContentType));
      const index2 = camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0;
      return AUTOCOMPLETES[index2];
    });
    const inputmode = Vue.computed(() => {
      if (props2.inputmode !== void 0) {
        return props2.inputmode;
      }
      if (INPUT_MODES.includes(props2.type)) {
        return props2.type;
      }
      let inputmodeMap = {};
      {
        inputmodeMap = {
          number: "numeric",
          digit: "decimal",
          idcard: "text"
        };
      }
      return inputmodeMap[props2.type];
    });
    let cache = useCache(props2, type);
    const rootRef = Vue.ref(null);
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props2, rootRef, emit2, (event, state2) => {
      {
        return;
      }
    });
    Vue.watch(() => state.value, (value) => {
      if (props2.type === "number" && !(cache.value === "-" && value === "")) {
        cache.value = value.toString();
      }
    });
    Vue.watch(() => props2.maxlength, (length) => {
      length = parseInt(length, 10);
      const realValue = state.value.slice(0, length);
      realValue !== state.value && (state.value = realValue);
    });
    const NUMBER_TYPES = ["number", "digit"];
    const step = Vue.computed(() => NUMBER_TYPES.includes(props2.type) ? props2.step : "");
    function onKeyUpEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      const input = event.target;
      event.stopPropagation();
      trigger("confirm", event, { value: input.value });
      !props2.confirmHold && input.blur();
    }
    expose({ $triggerInput: (detail) => {
      emit2("update:modelValue", detail.value);
      emit2("update:value", detail.value);
      state.value = detail.value;
    } });
    return () => {
      let inputNode = props2.disabled && fixDisabledColor ? (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = _t0$k();
        Vue.setBlockKey(_n0, "disabled-input");
        Vue.on(
          _n0,
          // fix: 禁止 readonly 状态获取焦点
          "focus",
          (event) => event.target.blur()
        );
        Vue.renderEffect(() => {
          Vue.setValue(_n0, state.value);
          Vue.setProp(_n0, "readonly", !!props2.disabled);
          Vue.setProp(_n0, "type", type.value);
          Vue.setProp(_n0, "maxlength", state.maxlength);
          Vue.setProp(_n0, "step", step.value);
          Vue.setStyle(_n0, props2.cursorColor ? { caretColor: props2.cursorColor } : {});
          Vue.setProp(_n0, "inputmode", inputmode.value);
          _setTemplateRef(_n0, fieldRef);
        });
        return _n0;
      })() : (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = _t1$b();
        Vue.setBlockKey(_n0, "input");
        Vue.on(_n0, "input", Vue.withModifiers((event) => {
          const value = event.target.value.toString();
          if (type.value === "number" && state.maxlength > 0 && value.length > state.maxlength) {
            if (isPaste(event)) {
              state.value = value.slice(0, state.maxlength);
            }
            return;
          }
          if (value.length === 0 && event.inputType === "insertText" && event.data === ".") {
            return;
          }
          state.value = value;
        }, ["stop"]));
        Vue.on(_n0, "keyup", onKeyUpEnter);
        Vue.renderEffect(() => {
          Vue.setValue(_n0, state.value);
          Vue.setProp(_n0, "disabled", !!props2.disabled);
          Vue.setProp(_n0, "type", type.value);
          Vue.setProp(_n0, "maxlength", state.maxlength);
          Vue.setProp(_n0, "step", step.value);
          Vue.setProp(_n0, "enterkeyhint", props2.confirmType);
          Vue.setProp(_n0, "pattern", props2.type === "number" ? "[0-9]*" : void 0);
          Vue.setStyle(_n0, props2.cursorColor ? { caretColor: props2.cursorColor } : {});
          Vue.setProp(_n0, "autocomplete", autocomplete.value);
          Vue.setProp(_n0, "inputmode", inputmode.value);
          _setTemplateRef(_n0, fieldRef);
        });
        return _n0;
      })();
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n7 = Vue.createPlainElement("uni-input", null, () => {
          const _n6 = _t3$5();
          const _n0 = Vue.child(_n6);
          Vue.applyVShow(_n0, () => !(state.value.length || cache.value === "-" || cache.value.includes(".")));
          const _x0 = Vue.txt(_n0);
          setNodes(_x0, () => props2.placeholder);
          Vue.renderEffect(() => Vue.setDynamicProps(_n0, [scopedAttrsState.attrs, {
            style: props2.placeholderStyle,
            class: ["uni-input-placeholder", props2.placeholderClass]
          }]));
          Vue.setInsertionState(_n6, 1);
          Vue.createIf(() => props2.confirmType === "search", () => {
            const _n3 = _t2$5();
            Vue.on(_n3, "submit", (event) => event.preventDefault());
            const _x3 = Vue.txt(_n3);
            setNodes(_x3, () => inputNode);
            return _n3;
          }, () => {
            const _n5 = createNodes(() => inputNode);
            return _n5;
          }, 265);
          return _n6;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n7, rootRef));
        return _n7;
      })();
    };
  }
});
function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]+/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params;
  const instance = Vue.getCurrentInstance();
  const attrs2 = Vue.shallowRef({});
  const listeners = Vue.shallowRef({});
  const excludeAttrs = Vue.shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = Vue.reactive(instance.attrs);
  Vue.watchEffect(() => {
    const res = entries(instance.attrs).reduce(
      (acc, [key, val]) => {
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
      },
      {
        exclude: {},
        attrs: {},
        listeners: {}
      }
    );
    attrs2.value = res.attrs;
    listeners.value = res.listeners;
    excludeAttrs.value = res.exclude;
  });
  return { $attrs: attrs2, $listeners: listeners, $excludeAttrs: excludeAttrs };
};
const _t0$j = Vue.template("<div><div></div></div>");
const _t1$a = Vue.template("<div><div>");
const ResizeSensor = /* @__PURE__ */ defineBuiltInComponent({
  name: "ResizeSensor",
  props: { initial: {
    type: Boolean,
    default: false
  } },
  emits: ["resize"],
  setup(props2, { emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const reset = useResizeSensorReset(rootRef);
    const update = useResizeSensorUpdate(rootRef, emit2, reset);
    return () => (() => {
      const _setTemplateRef = Vue.createTemplateRefSetter();
      const _n2 = Vue.createPlainElement("uni-resize-sensor", { onAnimationstartOnce: () => update }, () => {
        const _n0 = _t0$j();
        const _n1 = _t1$a();
        Vue.on(_n0, "scroll", update);
        Vue.on(_n1, "scroll", update);
        return [_n0, _n1];
      }, true);
      Vue.renderEffect(() => _setTemplateRef(_n2, rootRef));
      return _n2;
    })();
  }
});
function useResizeSensorUpdate(rootRef, emit2, reset) {
  const size = Vue.reactive({
    width: -1,
    height: -1
  });
  Vue.watch(() => shared.extend({}, size), (value) => emit2("resize", value));
  return () => {
    const rootEl = rootRef.value;
    if (!rootEl)
      return;
    const rect = rootEl.getBoundingClientRect();
    size.width = rect.width;
    size.height = rect.height;
    reset();
  };
}
function useResizeSensorReset(rootRef) {
  return () => {
    const { firstElementChild, lastElementChild } = rootRef.value;
    firstElementChild.scrollLeft = 1e5;
    firstElementChild.scrollTop = 1e5;
    lastElementChild.scrollLeft = 1e5;
    lastElementChild.scrollTop = 1e5;
  };
}
function flatVNode(nodes) {
  const array = [];
  if (shared.isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (Vue.isVNode(vnode)) {
        if (vnode.type === Vue.Fragment) {
          array.push(...flatVNode(vnode.children));
        } else {
          array.push(vnode);
        }
      } else if (shared.isArray(vnode)) {
        array.push(...flatVNode(vnode));
      }
    });
  }
  return array;
}
const movableAreaProps = {
  scaleArea: {
    type: Boolean,
    default: false
  }
};
const index$q = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "MovableArea",
  props: movableAreaProps,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const _isMounted = Vue.ref(false);
    let { setContexts, events: movableAreaEvents } = useMovableAreaState(props2, rootRef);
    const { $listeners, $attrs, $excludeAttrs } = useAttrs();
    const _listeners = $listeners.value;
    let events = [
      "onTouchstart",
      "onTouchmove",
      "onTouchend"
    ];
    events.forEach((event) => {
      let existing = _listeners[event];
      let ours = movableAreaEvents[`_${event}`];
      _listeners[event] = existing ? [].concat(existing, ours) : ours;
    });
    let movableViewItems = [];
    const originMovableViewContexts = [];
    function updateMovableViewContexts() {
      const contexts = [];
      for (let index2 = 0; index2 < movableViewItems.length; index2++) {
        let movableViewItem = movableViewItems[index2];
        {
          movableViewItem = movableViewItem.el;
        }
        const movableViewContext = originMovableViewContexts.find((context) => movableViewItem === context.rootRef.value);
        if (movableViewContext) {
          contexts.push(Vue.markRaw(movableViewContext));
        }
      }
      setContexts(contexts);
    }
    const addMovableViewContext = (movableViewContext) => {
      originMovableViewContexts.push(movableViewContext);
      updateMovableViewContexts();
    };
    const removeMovableViewContext = (movableViewContext) => {
      const index2 = originMovableViewContexts.indexOf(movableViewContext);
      if (index2 >= 0) {
        originMovableViewContexts.splice(index2, 1);
        updateMovableViewContexts();
      }
    };
    Vue.provide("_isMounted", _isMounted);
    Vue.provide("movableAreaRootRef", rootRef);
    Vue.provide("addMovableViewContext", addMovableViewContext);
    Vue.provide("removeMovableViewContext", removeMovableViewContext);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        movableViewItems = flatVNode(defaultSlots);
      }
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n2 = Vue.createPlainElement("uni-movable-area", { $: [
          () => $attrs.value,
          () => $excludeAttrs.value,
          () => _listeners
        ] }, () => {
          const _n0 = createComponent(ResizeSensor, { onResize: () => movableAreaEvents._resize });
          const _n1 = createNodes(() => movableViewItems);
          return [_n0, _n1];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n2, rootRef));
        return _n2;
      })();
    };
  }
});
function calc(e2) {
  return Math.sqrt(e2.x * e2.x + e2.y * e2.y);
}
function useMovableAreaState(props2, rootRef) {
  const width = Vue.ref(0);
  const height = Vue.ref(0);
  const gapV = Vue.reactive({
    x: null,
    y: null
  });
  const pinchStartLen = Vue.ref(null);
  let _scaleMovableView = null;
  let movableViewContexts = [];
  function _updateScale(e2) {
    if (e2 && e2 !== 1) {
      if (props2.scaleArea) {
        movableViewContexts.forEach(function(item) {
          item._setScale(e2);
        });
      } else {
        if (_scaleMovableView) {
          _scaleMovableView._setScale(e2);
        }
      }
    }
  }
  function _find(target, items = movableViewContexts) {
    let root = rootRef.value;
    function get(node) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (node === item.rootRef.value) {
          return item;
        }
      }
      if (node === root || node === document.body || node === document) {
        return null;
      }
      return get(node.parentNode);
    }
    return get(target);
  }
  const _onTouchstart = withWebEvent((t11) => {
    let i = t11.touches;
    if (i) {
      if (i.length > 1) {
        let r = {
          x: i[1].pageX - i[0].pageX,
          y: i[1].pageY - i[0].pageY
        };
        pinchStartLen.value = calc(r);
        gapV.x = r.x;
        gapV.y = r.y;
        if (!props2.scaleArea) {
          let touch0 = _find(i[0].target);
          let touch1 = _find(i[1].target);
          _scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
        }
      }
    }
  });
  const _onTouchmove = withWebEvent((t11) => {
    let n = t11.touches;
    if (n) {
      if (n.length > 1) {
        t11.preventDefault();
        let i = {
          x: n[1].pageX - n[0].pageX,
          y: n[1].pageY - n[0].pageY
        };
        if (gapV.x !== null && pinchStartLen.value && pinchStartLen.value > 0) {
          let r = calc(i) / pinchStartLen.value;
          _updateScale(r);
        }
        gapV.x = i.x;
        gapV.y = i.y;
      }
    }
  });
  const _onTouchend = withWebEvent((e2) => {
    let t11 = e2.touches;
    if (!(t11 && t11.length)) {
      if (e2.changedTouches) {
        gapV.x = 0;
        gapV.y = 0;
        pinchStartLen.value = null;
        if (props2.scaleArea) {
          movableViewContexts.forEach(function(item) {
            item._endScale();
          });
        } else {
          if (_scaleMovableView) {
            _scaleMovableView._endScale();
          }
        }
      }
    }
  });
  function _resize() {
    _getWH();
    movableViewContexts.forEach(function(item, index2) {
      item.setParent();
    });
  }
  function _getWH() {
    let style = window.getComputedStyle(rootRef.value);
    let rect = rootRef.value.getBoundingClientRect();
    width.value = rect.width - ["Left", "Right"].reduce(function(all, item) {
      const LEFT = "border" + item + "Width";
      const RIGHT = "padding" + item;
      return all + parseFloat(style[LEFT]) + parseFloat(style[RIGHT]);
    }, 0);
    height.value = rect.height - ["Top", "Bottom"].reduce(function(all, item) {
      const TOP = "border" + item + "Width";
      const BOTTOM = "padding" + item;
      return all + parseFloat(style[TOP]) + parseFloat(style[BOTTOM]);
    }, 0);
  }
  Vue.provide("movableAreaWidth", width);
  Vue.provide("movableAreaHeight", height);
  return {
    setContexts(contexts) {
      movableViewContexts = contexts;
    },
    events: {
      _onTouchstart,
      _onTouchmove,
      _onTouchend,
      _resize
    }
  };
}
function e(e2, t11, n) {
  return e2 > t11 - n && e2 < t11 + n;
}
function t(t11, n) {
  return e(t11, 0, n);
}
function Friction(e2, t11) {
  this._m = e2;
  this._f = 1e3 * t11;
  this._startTime = 0;
  this._v = 0;
}
Friction.prototype.setV = function(x, y) {
  const n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  this._x_v = x;
  this._y_v = y;
  this._x_a = -this._f * this._x_v / n;
  this._y_a = -this._f * this._y_v / n;
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
  this._lastDt = null;
  this._startTime = (/* @__PURE__ */ new Date()).getTime();
};
Friction.prototype.setS = function(x, y) {
  this._x_s = x;
  this._y_s = y;
};
Friction.prototype.s = function(t11) {
  if (void 0 === t11) {
    t11 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  if (t11 > this._t) {
    t11 = this._t;
    this._lastDt = t11;
  }
  let x = this._x_v * t11 + 0.5 * this._x_a * Math.pow(t11, 2) + this._x_s;
  let y = this._y_v * t11 + 0.5 * this._y_a * Math.pow(t11, 2) + this._y_s;
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
Friction.prototype.ds = function(t11) {
  if (void 0 === t11) {
    t11 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  if (t11 > this._t) {
    t11 = this._t;
  }
  return {
    dx: this._x_v + this._x_a * t11,
    dy: this._y_v + this._y_a * t11
  };
};
Friction.prototype.delta = function() {
  return {
    x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
    y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
  };
};
Friction.prototype.dt = function() {
  return -this._x_v / this._x_a;
};
Friction.prototype.done = function() {
  const t11 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
  this._lastDt = null;
  return t11;
};
Friction.prototype.setEnd = function(x, y) {
  this._endPositionX = x;
  this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f2) {
  this._m = m;
  this._f = 1e3 * f2;
};
function Spring(m, k, c) {
  this._m = m;
  this._k = k;
  this._c = c;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}
Spring.prototype._solve = function(e2, t11) {
  const n = this._c;
  const i = this._m;
  const r = this._k;
  const o = n * n - 4 * i * r;
  if (o === 0) {
    const a = -n / (2 * i);
    const s = e2;
    const l = t11 / (a * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a * e3);
      },
      dx: function(e3) {
        const t12 = Math.pow(Math.E, a * e3);
        return a * (s + l * e3) * t12 + l * t12;
      }
    };
  }
  if (o > 0) {
    const c = (-n - Math.sqrt(o)) / (2 * i);
    const u = (-n + Math.sqrt(o)) / (2 * i);
    const d = (t11 - c * e2) / (u - c);
    const h = e2 - d;
    return {
      x: function(e3) {
        let t12;
        let n2;
        if (e3 === this._t) {
          t12 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t12) {
          t12 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * t12 + d * n2;
      },
      dx: function(e3) {
        let t12;
        let n2;
        if (e3 === this._t) {
          t12 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t12) {
          t12 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * c * t12 + d * u * n2;
      }
    };
  }
  const p2 = Math.sqrt(4 * i * r - n * n) / (2 * i);
  const f2 = -n / 2 * i;
  const v2 = e2;
  const g2 = (t11 - f2 * e2) / p2;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
    },
    dx: function(e3) {
      const t12 = Math.pow(Math.E, f2 * e3);
      const n2 = Math.cos(p2 * e3);
      const i2 = Math.sin(p2 * e3);
      return t12 * (g2 * p2 * n2 - v2 * p2 * i2) + f2 * t12 * (g2 * i2 + v2 * n2);
    }
  };
};
Spring.prototype.x = function(e2) {
  if (void 0 === e2) {
    e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring.prototype.dx = function(e2) {
  if (void 0 === e2) {
    e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring.prototype.setEnd = function(e2, n, i) {
  if (!i) {
    i = (/* @__PURE__ */ new Date()).getTime();
  }
  if (e2 !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    let r = this._endPosition;
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
Spring.prototype.snap = function(e2) {
  this._startTime = (/* @__PURE__ */ new Date()).getTime();
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
Spring.prototype.done = function(n) {
  if (!n) {
    n = (/* @__PURE__ */ new Date()).getTime();
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};
Spring.prototype.reconfigure = function(m, t11, c) {
  this._m = m;
  this._k = t11;
  this._c = c;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
};
Spring.prototype.springConstant = function() {
  return this._k;
};
Spring.prototype.damping = function() {
  return this._c;
};
Spring.prototype.configuration = function() {
  function e2(e3, t12) {
    e3.reconfigure(1, t12, e3.damping());
  }
  function t11(e3, t12) {
    e3.reconfigure(1, e3.springConstant(), t12);
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
      write: t11.bind(this, this),
      min: 1,
      max: 500
    }
  ];
};
function STD(e2, t11, n) {
  this._springX = new Spring(e2, t11, n);
  this._springY = new Spring(e2, t11, n);
  this._springScale = new Spring(e2, t11, n);
  this._startTime = 0;
}
STD.prototype.setEnd = function(e2, t11, n, i) {
  const r = (/* @__PURE__ */ new Date()).getTime();
  this._springX.setEnd(e2, i, r);
  this._springY.setEnd(t11, i, r);
  this._springScale.setEnd(n, i, r);
  this._startTime = r;
};
STD.prototype.x = function() {
  const e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e2),
    y: this._springY.x(e2),
    scale: this._springScale.x(e2)
  };
};
STD.prototype.done = function() {
  const e2 = (/* @__PURE__ */ new Date()).getTime();
  return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
};
STD.prototype.reconfigure = function(e2, t11, n) {
  this._springX.reconfigure(e2, t11, n);
  this._springY.reconfigure(e2, t11, n);
  this._springScale.reconfigure(e2, t11, n);
};
const movableViewProps = {
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
    default: 0.1
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
};
function v(a, b) {
  return +((1e3 * a - 1e3 * b) / 1e3).toFixed(1);
}
const index$p = /* @__PURE__ */ defineBuiltInComponent({
  name: "MovableView",
  props: movableViewProps,
  emits: ["change", "scale"],
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const { setParent } = useMovableViewState(props2, trigger, rootRef);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n2 = Vue.createPlainElement("uni-movable-view", null, () => {
          const _n0 = createComponent(ResizeSensor, { onResize: () => setParent });
          const _n1 = createNodes(() => slots.default && slots.default());
          return [_n0, _n1];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n2, rootRef));
        return _n2;
      })();
    };
  }
});
let requesting = false;
function _requestAnimationFrame(e2) {
  if (!requesting) {
    requesting = true;
    requestAnimationFrame(function() {
      e2();
      requesting = false;
    });
  }
}
function p(t11, n) {
  if (t11 === n) {
    return 0;
  }
  let i = t11.offsetLeft;
  return t11.offsetParent ? i += p(t11.offsetParent, n) : 0;
}
function f(t11, n) {
  if (t11 === n) {
    return 0;
  }
  let i = t11.offsetTop;
  return t11.offsetParent ? i += f(t11.offsetParent, n) : 0;
}
function g(friction, execute, endCallback) {
  let record = {
    id: 0,
    cancelled: false
  };
  let cancel = function(record2) {
    if (record2 && record2.id) {
      cancelAnimationFrame(record2.id);
    }
    if (record2) {
      record2.cancelled = true;
    }
  };
  function fn(record2, friction2, execute2, endCallback2) {
    if (!record2 || !record2.cancelled) {
      execute2(friction2);
      let isDone = friction2.done();
      if (!isDone) {
        if (!record2.cancelled) {
          record2.id = requestAnimationFrame(fn.bind(null, record2, friction2, execute2, endCallback2));
        }
      }
      if (isDone && endCallback2) {
        endCallback2(friction2);
      }
    }
  }
  fn(record, friction, execute, endCallback);
  return {
    cancel: cancel.bind(null, record),
    model: friction
  };
}
function _getPx(val) {
  if (/\d+[ur]px$/i.test(val)) {
    return uni.upx2px(parseFloat(val));
  }
  return Number(val) || 0;
}
function useMovableViewLayout(rootRef, _scale, _adjustScale) {
  const movableAreaWidth = Vue.inject("movableAreaWidth", Vue.ref(0));
  const movableAreaHeight = Vue.inject("movableAreaHeight", Vue.ref(0));
  const movableAreaRootRef = Vue.inject("movableAreaRootRef");
  const _offset = {
    x: 0,
    y: 0
  };
  const _scaleOffset = {
    x: 0,
    y: 0
  };
  const width = Vue.ref(0);
  const height = Vue.ref(0);
  const minX = Vue.ref(0);
  const minY = Vue.ref(0);
  const maxX = Vue.ref(0);
  const maxY = Vue.ref(0);
  function _updateBoundary() {
    let x = 0 - _offset.x + _scaleOffset.x;
    let _width = movableAreaWidth.value - width.value - _offset.x - _scaleOffset.x;
    minX.value = Math.min(x, _width);
    maxX.value = Math.max(x, _width);
    let y = 0 - _offset.y + _scaleOffset.y;
    let _height = movableAreaHeight.value - height.value - _offset.y - _scaleOffset.y;
    minY.value = Math.min(y, _height);
    maxY.value = Math.max(y, _height);
  }
  function _updateOffset() {
    _offset.x = p(rootRef.value, movableAreaRootRef.value);
    _offset.y = f(rootRef.value, movableAreaRootRef.value);
  }
  function _updateWH(scale) {
    scale = scale || _scale.value;
    scale = _adjustScale(scale);
    let rect = rootRef.value.getBoundingClientRect();
    height.value = rect.height / _scale.value;
    width.value = rect.width / _scale.value;
    let _height = height.value * scale;
    let _width = width.value * scale;
    _scaleOffset.x = (_width - width.value) / 2;
    _scaleOffset.y = (_height - height.value) / 2;
  }
  return {
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY
  };
}
function useMovableViewTransform(rootRef, props2, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger) {
  const dampingNumber = Vue.computed(() => {
    let val = Number(props2.damping);
    return isNaN(val) ? 20 : val;
  });
  const xMove = Vue.computed(() => props2.direction === "all" || props2.direction === "horizontal");
  const yMove = Vue.computed(() => props2.direction === "all" || props2.direction === "vertical");
  const xSync = Vue.ref(_getPx(props2.x));
  const ySync = Vue.ref(_getPx(props2.y));
  Vue.watch(() => props2.x, (val) => {
    xSync.value = _getPx(val);
  });
  Vue.watch(() => props2.y, (val) => {
    ySync.value = _getPx(val);
  });
  Vue.watch(xSync, (val) => {
    _setX(val);
  });
  Vue.watch(ySync, (val) => {
    _setY(val);
  });
  const _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
  function _getLimitXY(x, y) {
    let outOfBounds = false;
    if (x > maxX.value) {
      x = maxX.value;
      outOfBounds = true;
    } else {
      if (x < minX.value) {
        x = minX.value;
        outOfBounds = true;
      }
    }
    if (y > maxY.value) {
      y = maxY.value;
      outOfBounds = true;
    } else {
      if (y < minY.value) {
        y = minY.value;
        outOfBounds = true;
      }
    }
    return {
      x,
      y,
      outOfBounds
    };
  }
  function FAandSFACancel() {
    if (_SFA) {
      _SFA.cancel();
    }
  }
  function _animationTo(x, y, scale, source, r, o) {
    FAandSFACancel();
    if (!xMove.value) {
      x = _translateX.value;
    }
    if (!yMove.value) {
      y = _translateY.value;
    }
    if (!props2.scale) {
      scale = _scale.value;
    }
    let limitXY = _getLimitXY(x, y);
    x = limitXY.x;
    y = limitXY.y;
    if (!props2.animation) {
      _setTransform(x, y, scale, source, r, o);
      return;
    }
    _STD._springX._solution = null;
    _STD._springY._solution = null;
    _STD._springScale._solution = null;
    _STD._springX._endPosition = _translateX.value;
    _STD._springY._endPosition = _translateY.value;
    _STD._springScale._endPosition = _scale.value;
    _STD.setEnd(x, y, scale, 1);
    _SFA = g(_STD, function() {
      let data = _STD.x();
      let x2 = data.x;
      let y2 = data.y;
      let scale2 = data.scale;
      _setTransform(x2, y2, scale2, source, r, o);
    }, function() {
      _SFA.cancel();
    });
  }
  function _setTransform(x, y, scale, source = "", r, o) {
    if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) {
      x = _translateX.value || 0;
    }
    if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) {
      y = _translateY.value || 0;
    }
    x = Number(x.toFixed(1));
    y = Number(y.toFixed(1));
    scale = Number(scale.toFixed(1));
    if (!(_translateX.value === x && _translateY.value === y)) {
      if (!r) {
        trigger("change", {}, {
          x: v(x, _scaleOffset.x),
          y: v(y, _scaleOffset.y),
          source
        });
      }
    }
    if (!props2.scale) {
      scale = _scale.value;
    }
    scale = _adjustScale(scale);
    scale = +scale.toFixed(3);
    if (o && scale !== _scale.value) {
      trigger("scale", {}, {
        x,
        y,
        scale
      });
    }
    let transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
    if (rootRef.value) {
      rootRef.value.style.transform = transform;
      rootRef.value.style.webkitTransform = transform;
      _translateX.value = x;
      _translateY.value = y;
      _scale.value = scale;
    }
  }
  function _revise(source) {
    let limitXY = _getLimitXY(_translateX.value, _translateY.value);
    let x = limitXY.x;
    let y = limitXY.y;
    let outOfBounds = limitXY.outOfBounds;
    if (outOfBounds) {
      _animationTo(x, y, _scale.value, source);
    }
    return outOfBounds;
  }
  function _setX(val) {
    if (xMove.value) {
      if (val + _scaleOffset.x === _translateX.value) {
        return _translateX;
      } else {
        if (_SFA) {
          _SFA.cancel();
        }
        _animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale.value);
      }
    }
    return val;
  }
  function _setY(val) {
    if (yMove.value) {
      if (val + _scaleOffset.y === _translateY.value) {
        return _translateY;
      } else {
        if (_SFA) {
          _SFA.cancel();
        }
        _animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale.value);
      }
    }
    return val;
  }
  return {
    FAandSFACancel,
    _getLimitXY,
    _animationTo,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD
  };
}
function useMovableViewInit(props2, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA) {
  const scaleMinNumber = Vue.computed(() => {
    let val = Number(props2.scaleMin);
    return isNaN(val) ? 0.1 : val;
  });
  const scaleMaxNumber = Vue.computed(() => {
    let val = Number(props2.scaleMax);
    return isNaN(val) ? 10 : val;
  });
  const scaleValueSync = Vue.ref(Number(props2.scaleValue) || 1);
  Vue.watch(scaleValueSync, (val) => {
    _setScaleValue(val);
  });
  Vue.watch(scaleMinNumber, () => {
    _setScaleMinOrMax();
  });
  Vue.watch(scaleMaxNumber, () => {
    _setScaleMinOrMax();
  });
  Vue.watch(() => props2.scaleValue, (val) => {
    scaleValueSync.value = Number(val) || 0;
  });
  const { _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY } = useMovableViewLayout(rootRef, _scale, _adjustScale);
  const { FAandSFACancel, _getLimitXY, _animationTo, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewTransform(rootRef, props2, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger);
  function _updateScale(scale, animat) {
    if (props2.scale) {
      scale = _adjustScale(scale);
      _updateWH(scale);
      _updateBoundary();
      const limitXY = _getLimitXY(_translateX.value, _translateY.value);
      const x = limitXY.x;
      const y = limitXY.y;
      if (animat) {
        _animationTo(x, y, scale, "", true, true);
      } else {
        _requestAnimationFrame(function() {
          _setTransform(x, y, scale, "", true, true);
        });
      }
    }
  }
  function _beginScale() {
    _isScaling.value = true;
  }
  function _updateOldScale(scale) {
    _oldScale.value = scale;
  }
  function _adjustScale(scale) {
    scale = Math.max(0.1, scaleMinNumber.value, scale);
    scale = Math.min(10, scaleMaxNumber.value, scale);
    return scale;
  }
  function _setScaleMinOrMax() {
    if (!props2.scale) {
      return false;
    }
    _updateScale(_scale.value, true);
    _updateOldScale(_scale.value);
  }
  function _setScaleValue(scale) {
    if (!props2.scale) {
      return false;
    }
    scale = _adjustScale(scale);
    _updateScale(scale, true);
    _updateOldScale(scale);
    return scale;
  }
  function _endScale() {
    _isScaling.value = false;
    _updateOldScale(_scale.value);
  }
  function _setScale(scale) {
    if (scale) {
      scale = _oldScale.value * scale;
      _beginScale();
      _updateScale(scale);
    }
  }
  return {
    // scale
    _updateOldScale,
    _endScale,
    _setScale,
    scaleValueSync,
    // layout
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,
    // transform
    FAandSFACancel,
    _getLimitXY,
    _animationTo,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD
  };
}
function useMovableViewState(props2, trigger, rootRef) {
  const _isMounted = Vue.inject("_isMounted", Vue.ref(false));
  Vue.inject("addMovableViewContext", () => {
  });
  Vue.inject("removeMovableViewContext", () => {
  });
  let _scale = Vue.ref(1);
  let _oldScale = Vue.ref(1);
  let _isScaling = Vue.ref(false);
  let _translateX = Vue.ref(0);
  let _translateY = Vue.ref(0);
  let _SFA = null;
  let _FA = null;
  const frictionNumber = Vue.computed(() => {
    let val = Number(props2.friction);
    return isNaN(val) || val <= 0 ? 2 : val;
  });
  new Friction(1, frictionNumber.value);
  Vue.watch(() => props2.disabled, () => {
    __handleTouchStart();
  });
  const { _updateOldScale, _endScale, _setScale, scaleValueSync, _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY, FAandSFACancel, _getLimitXY, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewInit(props2, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
  function __handleTouchStart() {
    if (!_isScaling.value) {
      if (!props2.disabled) {
        FAandSFACancel();
        if (xMove.value) {
          _translateX.value;
        }
        if (yMove.value) {
          _translateY.value;
        }
        rootRef.value.style.willChange = "transform";
      }
    }
  }
  function setParent() {
    if (!_isMounted.value) {
      return;
    }
    FAandSFACancel();
    let scale = props2.scale ? scaleValueSync.value : 1;
    _updateOffset();
    _updateWH(scale);
    _updateBoundary();
    let limitXY = _getLimitXY(xSync.value + _scaleOffset.x, ySync.value + _scaleOffset.y);
    let x = limitXY.x;
    let y = limitXY.y;
    _setTransform(x, y, scale, "", true);
    _updateOldScale(scale);
  }
  return { setParent };
}
const OPEN_TYPES = [
  "navigate",
  "redirect",
  "switchTab",
  "reLaunch",
  "navigateBack"
];
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
const navigatorProps = {
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
      return Boolean(~OPEN_TYPES.indexOf(value));
    }
  },
  delta: {
    type: Number,
    default: 1
  },
  hoverStartTime: {
    type: [Number, String],
    default: 50
  },
  hoverStayTime: {
    type: [Number, String],
    default: 600
  },
  exists: {
    type: String,
    default: ""
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  animationType: {
    type: String,
    default: "",
    validator(value) {
      return !value || ANIMATION_IN.concat(ANIMATION_OUT).includes(value);
    }
  },
  animationDuration: {
    type: [String, Number],
    default: 300
  }
};
function createNavigatorOnClick(props2) {
  return () => {
    if (props2.openType !== "navigateBack" && !props2.url) {
      console.error(
        "<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab"
      );
      return;
    }
    const animationDuration = parseInt(props2.animationDuration);
    const onFail = (error) => {
      console.error(error.errMsg);
    };
    switch (props2.openType) {
      case "navigate":
        uni.navigateTo({
          url: props2.url,
          animationType: props2.animationType || "pop-in",
          animationDuration,
          fail: onFail
        });
        break;
      case "redirect":
        uni.redirectTo({
          url: props2.url,
          exists: props2.exists,
          fail: onFail
        });
        break;
      case "switchTab":
        uni.switchTab({
          url: props2.url,
          fail: onFail
        });
        break;
      case "reLaunch":
        uni.reLaunch({
          url: props2.url,
          fail: onFail
        });
        break;
      case "navigateBack":
        uni.navigateBack({
          delta: props2.delta,
          animationType: props2.animationType || "pop-out",
          animationDuration,
          fail: onFail
        });
        break;
    }
  };
}
const _t0$i = Vue.template("<a class=navigator-wrap> ", 1);
const index$o = /* @__PURE__ */ defineBuiltInComponent({
  name: "Navigator",
  inheritAttrs: false,
  compatConfig: { MODE: 3 },
  props: /* @__PURE__ */ shared.extend({}, navigatorProps, { renderLink: {
    type: Boolean,
    default: true
  } }),
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const vm = Vue.getCurrentInstance();
    const __scopeId = vm && vm.vnode.scopeId || "";
    const { hovering, binding } = useHover(props2);
    const onClick = createNavigatorOnClick(props2);
    return () => {
      const { hoverClass, url } = props2;
      const hasHoverClass = props2.hoverClass && props2.hoverClass !== "none";
      const innerNode = props2.renderLink ? (() => {
        const _n0 = _t0$i();
        Vue.on(_n0, "click", onEventPrevent);
        Vue.on(_n0, "mousedown", onEventPrevent);
        const _x0 = Vue.txt(_n0);
        setNodes(_x0, () => slots.default && slots.default());
        Vue.renderEffect(() => Vue.setProp(_n0, "href", url));
        return _n0;
      })() : slots.default && slots.default();
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = Vue.createPlainElement("uni-navigator", {
          class: () => hasHoverClass && hovering.value ? hoverClass : "",
          $: [
            () => hasHoverClass && binding,
            () => vm ? vm.attrs : {},
            () => ({ [__scopeId]: "" }),
            { onClick: () => onClick }
          ]
        }, { $: [() => normalizeVaporSlots(innerNode)] }, true);
        Vue.renderEffect(() => _setTemplateRef(_n0, rootRef));
        return _n0;
      })();
    };
  }
});
const pickerViewProps = {
  value: {
    type: Array,
    default() {
      return [];
    },
    validator: function(val) {
      return shared.isArray(val) && val.filter((val2) => typeof val2 === "number").length === val.length;
    }
  },
  indicatorStyle: {
    type: String,
    default: ""
  },
  indicatorClass: {
    type: String,
    default: ""
  },
  maskStyle: {
    type: String,
    default: ""
  },
  maskClass: {
    type: String,
    default: ""
  }
};
const _t0$h = Vue.template("<div class=uni-picker-view-wrapper> ");
function useState$1(props2) {
  const value = Vue.reactive([...props2.value]);
  const state = Vue.reactive({
    value,
    height: 34
  });
  Vue.watch(() => props2.value, (val, oldVal) => {
    {
      state.value.length = val.length;
      val.forEach((val2, index2) => {
        if (val2 !== state.value[index2]) {
          state.value.splice(index2, 1, val2);
        }
      });
    }
  });
  return state;
}
const PickerView = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerView",
  props: pickerViewProps,
  emits: [
    "change",
    "pickstart",
    "pickend",
    "update:value"
  ],
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const wrapperRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const state = useState$1(props2);
    const resizeSensorRef = Vue.ref(null);
    let ColumnsPreRef = Vue.ref([]);
    let columnsRef = Vue.ref([]);
    function getItemIndex(vnode) {
      let columnVNodes = columnsRef.value;
      {
        columnVNodes = columnVNodes.filter((vnode2) => vnode2.type !== Vue.Comment);
      }
      let index2 = columnVNodes.indexOf(vnode);
      return index2 !== -1 ? index2 : ColumnsPreRef.value.indexOf(vnode);
    }
    const getPickerViewColumn = function(columnInstance) {
      const ref2 = Vue.computed({
        get() {
          const index2 = getItemIndex(columnInstance.vnode);
          return state.value[index2] || 0;
        },
        set(current) {
          const index2 = getItemIndex(columnInstance.vnode);
          if (index2 < 0) {
            return;
          }
          const oldCurrent = state.value[index2];
          if (oldCurrent !== current) {
            state.value[index2] = current;
            const value = state.value.map((val) => val);
            emit2("update:value", value);
            trigger("change", {}, { value });
          }
        }
      });
      return ref2;
    };
    Vue.provide("getPickerViewColumn", getPickerViewColumn);
    Vue.provide("pickerViewProps", props2);
    Vue.provide("pickerViewState", state);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        const vnode = flatVNode(defaultSlots);
        ColumnsPreRef.value = vnode;
        Vue.nextTick(() => {
          columnsRef.value = vnode;
        });
      }
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n2 = Vue.createPlainElement("uni-picker-view", null, () => {
          const _n0 = createComponent(ResizeSensor, { onResize: () => ({ height }) => state.height = height });
          const _n1 = _t0$h();
          const _x1 = Vue.txt(_n1);
          setNodes(_x1, () => defaultSlots);
          Vue.renderEffect(() => {
            _setTemplateRef(_n0, resizeSensorRef);
            _setTemplateRef(_n1, wrapperRef);
          });
          return [_n0, _n1];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n2, rootRef));
        return _n2;
      })();
    };
  }
});
const _t0$g = Vue.template("<div class=uni-picker-view-group><div></div><div></div><div> ");
const PickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerViewColumn",
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const contentRef = Vue.ref(null);
    const getPickerViewColumn = Vue.inject("getPickerViewColumn");
    const instance = Vue.getCurrentInstance();
    const currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : Vue.ref(0);
    const pickerViewProps2 = Vue.inject("pickerViewProps");
    const pickerViewState = Vue.inject("pickerViewState");
    const indicatorHeight = Vue.ref(34);
    const resizeSensorRef = Vue.ref(null);
    const maskSize = Vue.computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
    const { state: scopedAttrsState } = useScopedAttrs();
    let scroller;
    const state = Vue.reactive({
      current: currentRef.value,
      length: 0
    });
    function updatesScroller() {
    }
    Vue.watch(() => currentRef.value, (current) => {
      if (current !== state.current) {
        state.current = current;
      }
    });
    Vue.watch(() => state.current, (current) => currentRef.value = current);
    Vue.watch([
      () => indicatorHeight.value,
      () => state.length,
      () => pickerViewState.height
    ], updatesScroller);
    let oldDeltaY = 0;
    function handleWheel(event) {
      const deltaY = oldDeltaY + event.deltaY;
      if (Math.abs(deltaY) > 10) {
        oldDeltaY = 0;
        let current = Math.min(state.current + (deltaY < 0 ? -1 : 1), state.length - 1);
        state.current = current = Math.max(current, 0);
        scroller.scrollTo(current * indicatorHeight.value);
      } else {
        oldDeltaY = deltaY;
      }
      event.preventDefault();
    }
    function handleTap({ clientY }) {
      const el = rootRef.value;
      if (!scroller.isScrolling()) {
        const rect = el.getBoundingClientRect();
        const r = clientY - rect.top - pickerViewState.height / 2;
        const o = indicatorHeight.value / 2;
        if (!(Math.abs(r) <= o)) {
          const a = Math.ceil((Math.abs(r) - o) / indicatorHeight.value);
          const s = r < 0 ? -a : a;
          let current = Math.min(state.current + s, state.length - 1);
          state.current = current = Math.max(current, 0);
          scroller.scrollTo(current * indicatorHeight.value);
        }
      }
    }
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        state.length = flatVNode(defaultSlots).length;
      }
      const padding = `${maskSize.value}px 0`;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n5 = Vue.createPlainElement("uni-picker-view-column", null, () => {
          const _n0 = _t0$g();
          const _n1 = Vue.child(_n0);
          const _n3 = Vue.next(_n1);
          const _n4 = Vue.next(_n3);
          Vue.on(_n0, "wheel", handleWheel);
          Vue.on(_n0, "click", handleTap);
          Vue.renderEffect(() => {
            Vue.setDynamicProps(_n1, [scopedAttrsState.attrs, {
              class: ["uni-picker-view-mask", pickerViewProps2.maskClass],
              style: `background-size: 100% ${maskSize.value}px;${pickerViewProps2.maskStyle}`
            }]);
            Vue.setDynamicProps(_n3, [scopedAttrsState.attrs, {
              class: ["uni-picker-view-indicator", pickerViewProps2.indicatorClass],
              style: pickerViewProps2.indicatorStyle
            }]);
          });
          Vue.setInsertionState(_n3);
          const _n2 = createComponent(ResizeSensor, { onResize: () => ({ height }) => indicatorHeight.value = height });
          Vue.setClass(_n4, ["uni-picker-view-content"]);
          const _x4 = Vue.txt(_n4);
          setNodes(_x4, () => defaultSlots);
          Vue.renderEffect(() => {
            _setTemplateRef(_n2, resizeSensorRef);
            Vue.setStyle(_n4, {
              padding,
              "--picker-view-column-indicator-height": `${indicatorHeight.value}px`
            });
            _setTemplateRef(_n4, contentRef);
          });
          return _n0;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n5, rootRef));
        return _n5;
      })();
    };
  }
});
const FONT_SIZE = 16;
const PROGRESS_VALUES = {
  activeColor: uniShared.PRIMARY_COLOR,
  backgroundColor: "#EBEBEB",
  activeMode: "backwards"
};
const progressProps = {
  percent: {
    type: [Number, String],
    default: 0,
    validator(value) {
      return !isNaN(parseFloat(value));
    }
  },
  fontSize: {
    type: [String, Number],
    default: FONT_SIZE
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
    default: PROGRESS_VALUES.activeColor
  },
  activeColor: {
    type: String,
    default: PROGRESS_VALUES.activeColor
  },
  backgroundColor: {
    type: String,
    default: PROGRESS_VALUES.backgroundColor
  },
  active: {
    type: [Boolean, String],
    default: false
  },
  activeMode: {
    type: String,
    default: PROGRESS_VALUES.activeMode
  },
  duration: {
    type: [Number, String],
    default: 30,
    validator(value) {
      return !isNaN(parseFloat(value));
    }
  },
  borderRadius: {
    type: [Number, String],
    default: 0
  }
};
const _t0$f = Vue.template("<div class=uni-progress-bar><div class=uni-progress-inner-bar></div></div>");
const _t1$9 = Vue.template("<p class=uni-progress-info> ");
const index$n = /* @__PURE__ */ defineBuiltInComponent({
  name: "Progress",
  props: progressProps,
  setup(props2) {
    const rootRef = Vue.ref(null);
    const state = useProgressState(props2);
    _activeAnimation(state, props2);
    Vue.watch(() => state.realPercent, (newValue, oldValue) => {
      state.strokeTimer && clearInterval(state.strokeTimer);
      state.lastPercent = oldValue || 0;
      _activeAnimation(state, props2);
    });
    return () => {
      const { showInfo } = props2;
      const { outerBarStyle, innerBarStyle, currentPercent } = state;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n7 = Vue.createPlainElement("uni-progress", { class: "uni-progress" }, () => {
          const _n1 = _t0$f();
          const _n0 = Vue.child(_n1);
          Vue.renderEffect(() => {
            Vue.setStyle(_n1, outerBarStyle);
            Vue.setStyle(_n0, innerBarStyle);
          });
          const _n2 = Vue.createIf(() => showInfo, () => {
            const _n4 = _t1$9();
            const _x4 = Vue.txt(_n4);
            setNodes(_x4, () => currentPercent + "%");
            return _n4;
          }, () => {
            const _n6 = createNodes("");
            return _n6;
          }, 265);
          return [_n1, _n2];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n7, rootRef));
        return _n7;
      })();
    };
  }
});
function useProgressState(props2) {
  const currentPercent = Vue.ref(0);
  const outerBarStyle = Vue.computed(() => `background-color: ${props2.backgroundColor}; height: ${rpx2px(props2.strokeWidth)}px;`);
  const innerBarStyle = Vue.computed(() => {
    const backgroundColor = props2.color !== PROGRESS_VALUES.activeColor && props2.activeColor === PROGRESS_VALUES.activeColor ? props2.color : props2.activeColor;
    return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
  });
  const realPercent = Vue.computed(() => {
    if (typeof props2.percent === "string" && !/^-?\d*\.?\d*$/.test(props2.percent)) {
      return 0;
    }
    let realValue = parseFloat(props2.percent);
    if (Number.isNaN(realValue) || realValue < 0) {
      realValue = 0;
    } else if (realValue > 100) {
      realValue = 100;
    }
    return realValue;
  });
  const state = Vue.reactive({
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
    state.currentPercent = props2.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent;
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
const props$j = { name: {
  type: String,
  default: ""
} };
const index$m = /* @__PURE__ */ defineBuiltInComponent({
  name: "RadioGroup",
  props: props$j,
  // emits: ['change'],
  setup(props2, { emit: emit2, slots }) {
    const rootRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideRadioGroup(props2, trigger);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-radio-group", null, Vue.extend(() => {
          const _n0 = createNodes(() => slots.default && slots.default());
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
function useProvideRadioGroup(props2, trigger) {
  const fields2 = [];
  const getFieldsValue = () => {
    var _a;
    return (_a = fields2.find((field) => field.value.radioChecked)) == null ? void 0 : _a.value.value;
  };
  Vue.provide(uniRadioGroupKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    radioChange($event, field) {
      const index2 = fields2.indexOf(field);
      _resetRadioGroupValue(index2);
      trigger("change", $event, { value: getFieldsValue() });
    }
  });
  const uniForm = Vue.inject(uniFormKey, false);
  const formField = { submit: () => {
    let data = ["", null];
    if (props2.name !== "") {
      data[0] = props2.name;
      data[1] = getFieldsValue();
    }
    return data;
  } };
  if (uniForm) {
    uniForm.addField(formField);
  }
  function setFieldChecked(field, radioChecked) {
    field.value = {
      radioChecked,
      value: field.value.value
    };
  }
  function _resetRadioGroupValue(key, change) {
    fields2.forEach((value, index2) => {
      if (index2 === key) {
        return;
      }
      {
        setFieldChecked(fields2[index2], false);
      }
    });
  }
  return fields2;
}
const _t0$e = Vue.template("<div></div>");
const props$i = {
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
  value: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  backgroundColor: {
    type: String,
    default: ""
  },
  borderColor: {
    type: String,
    default: ""
  },
  activeBackgroundColor: {
    type: String,
    default: ""
  },
  activeBorderColor: {
    type: String,
    default: ""
  },
  iconColor: {
    type: String,
    default: ""
  },
  // 图标颜色,同color,优先级大于iconColor
  foreColor: {
    type: String,
    default: ""
  }
};
const indexX$3 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Radio",
  props: props$i,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const radioChecked = Vue.ref(props2.checked);
    const radioValue = Vue.ref(props2.value);
    function getRadioStyle(checked) {
      if (props2.disabled) {
        return;
      }
      const style = {};
      if (checked) {
        const backgroundColor = props2.activeBackgroundColor || props2.color;
        if (backgroundColor) {
          style.backgroundColor = backgroundColor;
          style.borderColor = props2.activeBorderColor || backgroundColor;
        } else if (props2.activeBorderColor) {
          style.borderColor = props2.activeBorderColor;
        }
      } else {
        if (props2.borderColor)
          style.borderColor = props2.borderColor;
        if (props2.backgroundColor)
          style.backgroundColor = props2.backgroundColor;
      }
      return style.borderColor || style.backgroundColor ? style : void 0;
    }
    Vue.watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
      radioChecked.value = newChecked;
      radioValue.value = newModelValue;
    });
    const reset = () => {
      radioChecked.value = false;
    };
    const { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
    const _onClick = ($event) => {
      if (props2.disabled || radioChecked.value) {
        return;
      }
      radioChecked.value = true;
      uniCheckGroup && uniCheckGroup.radioChange($event, field);
      $event.stopPropagation();
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      let realCheckValue;
      realCheckValue = radioChecked.value;
      const radioStyle = getRadioStyle(realCheckValue);
      const hoverBorderColor = realCheckValue ? radioStyle == null ? void 0 : radioStyle.borderColor : props2.activeBorderColor;
      const hoverStyle = hoverBorderColor ? { "--HOVER-BD-COLOR": hoverBorderColor } : void 0;
      const iconColor = props2.foreColor || props2.iconColor || "currentColor";
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n7 = Vue.createPlainElement("uni-radio", { $: [() => booleanAttrs, {
          onClick: () => _onClick,
          id: () => props2.id,
          class: "uni-radio-wrapper",
          style: () => hoverStyle
        }] }, () => {
          const _n5 = _t0$e();
          Vue.renderEffect(() => {
            Vue.setClassName(_n5, (realCheckValue ? 1 : 0) | (props2.disabled ? 2 : 0), [" uni-radio-input-checked", " uni-radio-input-disabled"], "uni-radio-input");
            Vue.setStyle(_n5, radioStyle);
          });
          Vue.setInsertionState(_n5);
          Vue.createIf(() => realCheckValue, () => {
            const _n2 = createNodes(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.disabled ? "currentColor" : iconColor, 18));
            return _n2;
          }, () => {
            const _n4 = createNodes("");
            return _n4;
          }, 266);
          const _n6 = createNodes(() => slots.default && slots.default());
          return [_n5, _n6];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n7, rootRef));
        return _n7;
      })();
    };
  }
});
function useRadioInject(radioChecked, radioValue, reset) {
  const field = Vue.computed({
    get: () => ({
      radioChecked: Boolean(radioChecked.value),
      value: radioValue.value
    }),
    set: ({ radioChecked: checked }) => {
      radioChecked.value = checked;
    }
  });
  const formField = { reset };
  const uniCheckGroup = Vue.inject(uniRadioGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = Vue.inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = Vue.inject(uniLabelKey, false);
  return {
    uniCheckGroup,
    uniForm,
    uniLabel,
    field
  };
}
const CHARS = {
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  apos: "'",
  ldquo: "“",
  rdquo: "”",
  yen: "￥",
  radic: "√",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  hellip: "…"
};
function decodeEntities(htmlString) {
  return htmlString.replace(
    /&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi,
    function(match, stage) {
      if (shared.hasOwn(CHARS, stage) && CHARS[stage]) {
        return CHARS[stage];
      }
      if (/^#[0-9]{1,4}$/.test(stage)) {
        return String.fromCharCode(stage.slice(1));
      }
      if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
        return String.fromCharCode(Number("0" + stage.slice(1)));
      }
      return match;
    }
  );
}
function processClickEvent(node, triggerItemClick) {
  if (node.name && ["a", "img"].includes(node.name) && triggerItemClick) {
    return {
      onClickCapture: (e2) => {
        if (node.name === "a") {
          triggerItemClick(e2, { href: (node.attrs || {}).href });
        } else {
          triggerItemClick(e2, { src: (node.attrs || {}).src });
        }
        e2.stopPropagation();
        e2.preventDefault();
        e2.returnValue = false;
      }
    };
  }
}
function normalizeValue(tagName, name, value) {
  if (tagName === "img" && name === "src" && shared.isString(value)) {
    return getRealPath(value);
  }
  return value;
}
function normalizeAttrs(tagName, attrs2) {
  if (!shared.isPlainObject(attrs2))
    return;
  const normalizedAttrs = {};
  Object.keys(attrs2).forEach((name) => {
    normalizedAttrs[name] = normalizeValue(tagName, name, attrs2[name]);
  });
  return normalizedAttrs;
}
const nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
  if (!nodeList || Array.isArray(nodeList) && !nodeList.length)
    return [];
  return nodeList.map((node) => {
    if (!shared.isPlainObject(node)) {
      return;
    }
    if ((!shared.hasOwn(node, "type") || node.type === "text") && shared.isString(node.text) && node.text !== "")
      return Vue.createTextVNode(decodeEntities(node.text || ""));
    if (!shared.hasOwn(node, "type") || node.type === "node") {
      if (!shared.isString(node.name) || !node.name) {
        return;
      }
      const tagName = node.name.toLowerCase();
      const nodeProps = shared.extend(
        { [scopeId]: "" },
        processClickEvent(node, triggerItemClick),
        normalizeAttrs(tagName, node.attrs)
      );
      return Vue.h(
        node.name,
        nodeProps,
        nodeList2VNode(scopeId, triggerItemClick, node.children)
      );
    }
  });
};
function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs2) {
  return attrs2.reduce(function(pre, attr2) {
    let value = attr2.value;
    const name = attr2.name;
    if (value.match(/ /) && ["style", "src"].indexOf(name) === -1) {
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
    chars: function(text) {
      const node = {
        type: "text",
        text
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
    comment: function(text) {
      const node = {
        node: "comment",
        text
      };
      const parent = stacks[0];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
  });
  return results.children;
}
const props$h = {
  nodes: {
    type: [Array, String],
    default: function() {
      return [];
    }
  },
  /** @deprecated 请使用 user-select */
  selectable: {
    type: [Boolean, String],
    default: false
  },
  userSelect: {
    type: [Boolean, String],
    default: false
  }
};
const index$l = /* @__PURE__ */ defineBuiltInComponent({
  name: "RichText",
  compatConfig: { MODE: 3 },
  props: props$h,
  emits: ["itemclick"],
  setup(props2, { emit: emit2 }) {
    const vm = Vue.getCurrentInstance();
    const scopeId = vm && vm.vnode.scopeId || "";
    const rootRef = Vue.ref(null);
    const _vnode = Vue.shallowRef([]);
    const trigger = useCustomEvent(rootRef, emit2);
    function triggerItemClick(e2, detail = {}) {
      trigger("itemclick", e2, detail);
    }
    function renderVNode() {
      let nodeList = props2.nodes;
      if (shared.isString(nodeList)) {
        nodeList = parseHtml(props2.nodes);
      }
      _vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
    }
    Vue.watch(() => props2.nodes, renderVNode, {
      immediate: true,
      deep: true
    });
    return () => Vue.h("uni-rich-text", {
      ref: rootRef,
      selectable: props2.userSelect || props2.selectable ? true : null
    }, Vue.h("div", {}, _vnode.value));
  }
});
const _t0$d = Vue.template('<svg fill=#2BD009 class=uni-scroll-view-refresh__icon width=24 height=24 viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path><path d="M0 0h24v24H0z" fill=none>', false, 1);
const _t1$8 = Vue.template('<svg class=uni-scroll-view-refresh__spinner width=24 height=24 viewBox="25 25 50 50"><circle cx=50 cy=50 r=20 fill=none style="color: #2bd009" stroke-width=3>', false, 1);
const _t2$4 = Vue.template("<div class=uni-scroll-view-refresh><div class=uni-scroll-view-refresh-inner></div>");
const _t3$4 = Vue.template("<div class=uni-scroll-view-refresher-container> ");
const _t4$3 = Vue.template("<div class=uni-scroll-view-refresher>", 1);
const Refresher = /* @__PURE__ */ defineBuiltInComponent({
  name: "Refresher",
  props: {
    refreshState: {
      type: String,
      default: ""
    },
    refresherHeight: {
      type: Number,
      default: 0
    },
    refresherThreshold: {
      type: Number,
      default: 45
    },
    refresherDefaultStyle: {
      type: String,
      default: "black"
    },
    refresherBackground: {
      type: String,
      default: "transparent"
    }
  },
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    const rootStyle = Vue.computed(() => {
      const style = { backgroundColor: props2.refresherBackground };
      switch (props2.refreshState) {
        case "pulling":
          style.height = props2.refresherHeight + "px";
          break;
        case "refreshing":
          style.height = props2.refresherThreshold + "px";
          style.transition = "height 0.3s";
          break;
        case "":
        case "refresherabort":
        case "restore":
          style.height = "0px";
          style.transition = "height 0.3s";
          break;
      }
      return style;
    });
    const refreshRotate = Vue.computed(() => {
      const route = props2.refresherHeight / props2.refresherThreshold;
      return (route > 1 ? 1 : route) * 360;
    });
    return () => {
      const { refreshState, refresherDefaultStyle, refresherThreshold } = props2;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n21 = _t4$3();
        Vue.renderEffect(() => Vue.setStyle(_n21, rootStyle.value));
        Vue.setInsertionState(_n21);
        Vue.createIf(() => refresherDefaultStyle !== "none", () => {
          const _n13 = _t2$4();
          const _n12 = Vue.child(_n13);
          Vue.setInsertionState(_n12);
          Vue.createIf(() => refreshState == "pulling", () => {
            const _n4 = _t0$d();
            Vue.setBlockKey(_n4, "refresh__icon");
            Vue.renderEffect(() => Vue.setAttr(_n4, "style", { transform: "rotate(" + refreshRotate.value + "deg)" }, true));
            return _n4;
          }, () => {
            const _n6 = createNodes(null);
            return _n6;
          }, 265);
          Vue.setInsertionState(_n12, 1);
          Vue.createIf(() => refreshState == "refreshing", () => {
            const _n9 = _t1$8();
            Vue.setBlockKey(_n9, "refresh__spinner");
            return _n9;
          }, () => {
            const _n11 = createNodes(null);
            return _n11;
          }, 521);
          return _n13;
        }, () => {
          const _n15 = createNodes(null);
          return _n15;
        }, 777);
        Vue.setInsertionState(_n21, 1);
        Vue.createIf(() => refresherDefaultStyle === "none", () => {
          const _n18 = _t3$4();
          const _x18 = Vue.txt(_n18);
          setNodes(_x18, () => slots.default && slots.default());
          Vue.renderEffect(() => Vue.setStyle(_n18, { height: `${refresherThreshold}px` }));
          return _n18;
        }, () => {
          const _n20 = createNodes(null);
          return _n20;
        }, 1033);
        Vue.renderEffect(() => _setTemplateRef(_n21, rootRef));
        return _n21;
      })();
    };
  }
});
const _t0$c = Vue.template("<div class=uni-scroll-view><div><!><div class=uni-scroll-view-content> ");
const props$g = {
  direction: {
    type: [String],
    default: "vertical"
  },
  scrollX: {
    type: [Boolean, String],
    default: false
  },
  scrollY: {
    type: [Boolean, String],
    default: false
  },
  showScrollbar: {
    type: [Boolean, String],
    default: true
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
    default: "black"
  },
  refresherBackground: {
    type: String,
    default: "transparent"
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false
  }
};
const index$k = /* @__PURE__ */ defineBuiltInComponent({
  name: "ScrollView",
  compatConfig: { MODE: 3 },
  props: props$g,
  emits: [
    "scroll",
    "scrolltoupper",
    "scrolltolower",
    "refresherrefresh",
    "refresherrestore",
    "refresherpulling",
    "refresherabort",
    "update:refresherTriggered"
  ],
  setup(props2, { emit: emit2, slots, expose }) {
    const rootRef = Vue.ref(null);
    const main = Vue.ref(null);
    const wrap = Vue.ref(null);
    const content = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props2);
    const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit2);
    const mainStyle = Vue.computed(() => {
      let style = "";
      realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
      realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
      return style;
    });
    const scrollBarClassName = Vue.computed(() => {
      let className = "uni-scroll-view";
      if (props2.showScrollbar === false) {
        className += " uni-scroll-view-scrollbar-hidden";
      }
      return className;
    });
    expose({
      // 自动化测试需要暴露main从而获取scrollLeft
      $getMain() {
        return main.value;
      }
    });
    return () => {
      const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props2;
      const { refresherHeight, refreshState } = state;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n14 = Vue.createPlainElement("uni-scroll-view", null, () => {
          const _n13 = _t0$c();
          const _n12 = Vue.child(_n13);
          const _n11 = Vue.child(_n12);
          const _n10 = Vue.next(_n11);
          Vue.renderEffect(() => {
            Vue.setStyle(_n12, mainStyle.value);
            Vue.setClass(_n12, scrollBarClassName.value);
          });
          Vue.setInsertionState(_n12, _n11);
          Vue.createIf(() => refresherEnabled, () => {
            const _n7 = createComponent(Refresher, {
              refreshState: () => refreshState,
              refresherHeight: () => refresherHeight,
              refresherThreshold: () => refresherThreshold,
              refresherDefaultStyle: () => refresherDefaultStyle,
              refresherBackground: () => refresherBackground
            }, Vue.extend(() => {
              const _n2 = Vue.createIf(() => refresherDefaultStyle == "none", () => {
                const _n4 = createNodes(() => slots.refresher && slots.refresher());
                return _n4;
              }, () => {
                const _n6 = createNodes(null);
                return _n6;
              }, 394);
              return _n2;
            }, { _: 1 }));
            return _n7;
          }, () => {
            const _n9 = createNodes(null);
            return _n9;
          }, 521);
          const _x10 = Vue.txt(_n10);
          setNodes(_x10, () => slots.default && slots.default());
          Vue.renderEffect(() => {
            _setTemplateRef(_n10, content);
            _setTemplateRef(_n12, main);
            _setTemplateRef(_n13, wrap);
          });
          return _n13;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n14, rootRef));
        return _n14;
      })();
    };
  }
});
function useScrollViewState(props2) {
  const scrollTopNumber = Vue.computed(() => {
    return Number(props2.scrollTop) || 0;
  });
  const scrollLeftNumber = Vue.computed(() => {
    return Number(props2.scrollLeft) || 0;
  });
  const state = Vue.reactive({
    lastScrollTop: scrollTopNumber.value,
    lastScrollLeft: scrollLeftNumber.value,
    lastScrollToUpperTime: 0,
    lastScrollToLowerTime: 0,
    refresherHeight: 0,
    refreshState: ""
  });
  return {
    state,
    scrollTopNumber,
    scrollLeftNumber
  };
}
function useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit2) {
  let beforeRefreshing = false;
  let triggerAbort = false;
  let __transitionEnd = () => {
  };
  const realScrollX = Vue.computed(() => {
    if (props2.direction === "horizontal" || props2.direction === "all") {
      return true;
    }
    return false;
  });
  const realScrollY = Vue.computed(() => {
    if (props2.direction === "vertical" || props2.direction === "all") {
      return true;
    }
    return false;
  });
  Vue.computed(() => {
    let val = Number(props2.upperThreshold);
    return isNaN(val) ? 50 : val;
  });
  Vue.computed(() => {
    let val = Number(props2.lowerThreshold);
    return isNaN(val) ? 50 : val;
  });
  function scrollTo(scrollToValue, direction) {
    const container = main.value;
    let transformValue = 0;
    let transform = "";
    scrollToValue < 0 ? scrollToValue = 0 : direction === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
    direction === "x" ? transformValue = container.scrollLeft - scrollToValue : direction === "y" && (transformValue = container.scrollTop - scrollToValue);
    if (transformValue === 0)
      return;
    let _content = content.value;
    _content.style.transition = "transform .3s ease-out";
    _content.style.webkitTransition = "-webkit-transform .3s ease-out";
    if (direction === "x") {
      transform = "translateX(" + transformValue + "px) translateZ(0)";
    } else {
      direction === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
    }
    _content.removeEventListener("transitionend", __transitionEnd);
    _content.removeEventListener("webkitTransitionEnd", __transitionEnd);
    __transitionEnd = () => _transitionEnd(scrollToValue, direction);
    _content.addEventListener("transitionend", __transitionEnd);
    _content.addEventListener("webkitTransitionEnd", __transitionEnd);
    if (direction === "x") {
      container.style.overflowX = "hidden";
    } else if (direction === "y") {
      container.style.overflowY = "hidden";
    }
    _content.style.transform = transform;
    _content.style.webkitTransform = transform;
  }
  function _scrollTopChanged(val) {
    if (realScrollY.value) {
      {
        if (props2.scrollWithAnimation) {
          scrollTo(val, "y");
        } else {
          main.value.scrollTop = val;
        }
      }
    }
  }
  function _scrollLeftChanged(val) {
    if (realScrollX.value) {
      {
        if (props2.scrollWithAnimation) {
          scrollTo(val, "x");
        } else {
          main.value.scrollLeft = val;
        }
      }
    }
  }
  function _scrollIntoViewChanged(val) {
    if (val) {
      if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
        console.error(`id error: scroll-into-view=${val}`);
        return;
      }
      let element = rootRef.value.querySelector("#" + val);
      if (element) {
        let mainRect = main.value.getBoundingClientRect();
        let elRect = element.getBoundingClientRect();
        if (realScrollX.value) {
          let left = elRect.left - mainRect.left;
          let scrollLeft = main.value.scrollLeft;
          let x = scrollLeft + left;
          if (props2.scrollWithAnimation) {
            scrollTo(x, "x");
          } else {
            main.value.scrollLeft = x;
          }
        }
        if (realScrollY.value) {
          let top = elRect.top - mainRect.top;
          let scrollTop = main.value.scrollTop;
          let y = scrollTop + top;
          if (props2.scrollWithAnimation) {
            scrollTo(y, "y");
          } else {
            main.value.scrollTop = y;
          }
        }
      }
    }
  }
  function _transitionEnd(val, direction) {
    content.value.style.transition = "";
    content.value.style.webkitTransition = "";
    content.value.style.transform = "";
    content.value.style.webkitTransform = "";
    let _main = main.value;
    if (direction === "x") {
      _main.style.overflowX = realScrollX.value ? "auto" : "hidden";
      _main.scrollLeft = val;
    } else if (direction === "y") {
      _main.style.overflowY = realScrollY.value ? "auto" : "hidden";
      _main.scrollTop = val;
    }
    content.value.removeEventListener("transitionend", __transitionEnd);
    content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
  }
  function _setRefreshState(_state) {
    if (!props2.refresherEnabled)
      return;
    switch (_state) {
      case "refreshing":
        state.refresherHeight = props2.refresherThreshold;
        if (!beforeRefreshing) {
          beforeRefreshing = true;
          trigger("refresherpulling", {}, {
            deltaY: state.refresherHeight,
            dy: state.refresherHeight
          });
          trigger("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
          emit2("update:refresherTriggered", true);
        }
        break;
      case "restore":
      case "refresherabort":
        beforeRefreshing = false;
        state.refresherHeight = 0;
        if (_state === "restore") {
          triggerAbort = false;
          trigger("refresherrestore", {}, { dy: touchEnd.y - touchStart.y });
        }
        if (_state === "refresherabort" && triggerAbort) {
          triggerAbort = false;
          trigger("refresherabort", {}, { dy: touchEnd.y - touchStart.y });
        }
        break;
    }
    state.refreshState = _state;
  }
  let touchStart = {
    x: 0,
    y: 0
  };
  let touchEnd = {
    x: 0,
    y: props2.refresherThreshold
  };
  Vue.watch(scrollTopNumber, (val) => {
    _scrollTopChanged(val);
  });
  Vue.watch(scrollLeftNumber, (val) => {
    _scrollLeftChanged(val);
  });
  Vue.watch(() => props2.scrollIntoView, (val) => {
    _scrollIntoViewChanged(val);
  });
  Vue.watch(() => props2.refresherTriggered, (val) => {
    if (val === true) {
      _setRefreshState("refreshing");
    } else if (val === false) {
      _setRefreshState("restore");
    }
  });
  return {
    realScrollX,
    realScrollY,
    _scrollTopChanged,
    _scrollLeftChanged
  };
}
function createBackgroundColorStyle(color) {
  return color ? { backgroundColor: color } : void 0;
}
function withBackgroundColor(style, color) {
  return color ? Object.assign(style, { backgroundColor: color }) : style;
}
const _t0$b = Vue.template("<div class=uni-slider-wrapper><div class=uni-slider-input><div class=uni-slider-track><div class=uni-slider-track-value></div></div><div class=uni-slider-thumb-track><div class=uni-slider-thumb-value></div></div><input class=uni-slider-browser-input-range type=range></div><span class=uni-slider-value>");
const SLIDER_BLOCK_SIZE_MIN_VALUE = 12;
const SLIDER_BLOCK_SIZE_MAX_VALUE = 28;
const props$f = {
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
  color: { type: String },
  backgroundColor: { type: String },
  // 优先级高于 activeColor
  activeBackgroundColor: { type: String },
  activeColor: { type: String },
  selectedColor: { type: String },
  blockColor: { type: String },
  // 优先级高于blockColor
  foreColor: { type: String },
  valueColor: { type: String },
  blockSize: {
    type: [Number, String],
    default: 28
  },
  showValue: {
    type: [Boolean, String],
    default: false
  }
};
const indexX$2 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Slider",
  props: props$f,
  emits: ["changing", "change"],
  setup(props2, { emit: emit2 }) {
    const sliderRef = Vue.ref(null);
    const sliderValueRef = Vue.ref(null);
    let uniSliderElement;
    Vue.watch(() => props2.value, (val) => {
      uniSliderElement.value = Number(val);
    });
    const trigger = useCustomEvent(sliderRef, emit2);
    const state = useSliderState(props2);
    const { _onInput, _onChange } = useSliderLoader(props2, sliderRef, trigger);
    return () => {
      const { setTrackBgColor, setActiveColor, setThumbStyle, thumbTrackStyle, setValueStyle } = state;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n7 = Vue.createPlainElement("uni-slider", null, () => {
          const _n6 = _t0$b();
          let _p0 = Vue.child(_n6);
          const _n1 = Vue.child(_p0);
          const _n0 = Vue.child(_n1);
          const _n3 = Vue.next(_n1);
          const _n2 = Vue.child(_n3);
          const _n4 = Vue.next(_n3);
          const _n5 = Vue.next(_p0);
          Vue.on(_n4, "input", withWebEvent(_onInput));
          Vue.on(_n4, "change", withWebEvent(_onChange));
          Vue.applyVShow(_n5, () => props2.showValue);
          Vue.renderEffect(() => {
            Vue.setStyle(_n1, setTrackBgColor());
            Vue.setStyle(_n0, setActiveColor());
            Vue.setStyle(_n3, thumbTrackStyle());
            Vue.setStyle(_n2, setThumbStyle());
            Vue.setProp(_n4, "min", props2.min);
            Vue.setProp(_n4, "max", props2.max);
            Vue.setProp(_n4, "step", props2.step);
            Vue.setValue(_n4, props2.value);
            Vue.setStyle(_n5, setValueStyle());
            _setTemplateRef(_n5, sliderValueRef);
          });
          return _n6;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n7, sliderRef));
        return _n7;
      })();
    };
  }
});
function useSliderState(props2) {
  const _getBgColor = () => {
    const backgroundColor = props2.backgroundColor;
    const color = props2.color;
    if (backgroundColor && backgroundColor !== "#e9e9e9") {
      return backgroundColor;
    }
    if (color && color !== "#007aff")
      return color;
    return backgroundColor || color;
  };
  const _getActiveColor = () => {
    const activeColor = props2.activeBackgroundColor || props2.activeColor;
    const selectedColor = props2.selectedColor;
    if (activeColor && activeColor !== "#007aff")
      return activeColor;
    if (selectedColor && selectedColor !== "#e9e9e9") {
      return selectedColor;
    }
    return activeColor || selectedColor;
  };
  const _getBlockColor = () => {
    return props2.foreColor || props2.blockColor;
  };
  const _getBlockSizeString = () => {
    const blockSize = Math.min(Math.max(Number(props2.blockSize), SLIDER_BLOCK_SIZE_MIN_VALUE), SLIDER_BLOCK_SIZE_MAX_VALUE);
    return blockSize + "px";
  };
  return {
    setTrackBgColor: () => createBackgroundColorStyle(_getBgColor()),
    setActiveColor: () => createBackgroundColorStyle(_getActiveColor()),
    thumbTrackStyle: () => ({ marginRight: _getBlockSizeString() }),
    setThumbStyle: () => withBackgroundColor({
      width: _getBlockSizeString(),
      height: _getBlockSizeString()
    }, _getBlockColor()),
    setValueStyle: () => props2.valueColor ? { color: props2.valueColor } : void 0
  };
}
function useSliderLoader(props2, sliderRef, trigger) {
  const _onInput = (event) => {
    if (props2.disabled) {
      return;
    }
    const valueNumber = Number(event.target.value);
    sliderRef.value.updateValue(valueNumber);
    trigger("changing", event, { value: valueNumber });
  };
  const _onChange = (event) => {
    if (props2.disabled) {
      return;
    }
    const valueNumber = Number(event.target.value);
    sliderRef.value.updateValue(valueNumber);
    trigger("change", event, { value: valueNumber });
  };
  const uniForm = Vue.inject(uniFormKey, false);
  if (!!uniForm) {
    const field = {
      reset: () => {
        sliderRef.value.reset();
      },
      submit: () => {
        const data = ["", null];
        const value = sliderRef.value.value;
        if (props2.name !== "") {
          data[0] = props2.name;
          data[1] = value;
        }
        return data;
      }
    };
    uniForm.addField(field);
  }
  return {
    _onInput,
    _onChange
  };
}
const _t0$a = Vue.template("<div class=uni-swiper-wrapper><div class=uni-swiper-slides><div class=uni-swiper-slide-frame> </div></div> ");
const _t1$7 = Vue.template("<div> ", 1);
const _t2$3 = Vue.template("<div>", 1);
const _t3$3 = Vue.template("<div> ");
const props$e = {
  indicatorDots: {
    type: [Boolean, String],
    default: false
  },
  vertical: {
    type: [Boolean, String],
    default: false
  },
  autoplay: {
    type: [Boolean, String],
    default: false
  },
  circular: {
    type: [Boolean, String],
    default: false
  },
  interval: {
    type: [Number, String],
    default: 5e3
  },
  duration: {
    type: [Number, String],
    default: 500
  },
  current: {
    type: [Number, String],
    default: 0
  },
  indicatorColor: {
    type: String,
    default: ""
  },
  indicatorActiveColor: {
    type: String,
    default: ""
  },
  previousMargin: {
    type: String,
    default: ""
  },
  nextMargin: {
    type: String,
    default: ""
  },
  currentItemId: {
    type: String,
    default: ""
  },
  skipHiddenItemLayout: {
    type: [Boolean, String],
    default: false
  },
  displayMultipleItems: {
    type: [Number, String],
    default: 1
  },
  disableTouch: {
    type: [Boolean, String],
    default: false
  },
  navigation: {
    type: [Boolean, String],
    default: false
  },
  navigationColor: {
    type: String,
    default: "#fff"
  },
  navigationActiveColor: {
    type: String,
    default: "rgba(53, 53, 53, 0.6)"
  }
};
function useState(props2) {
  const interval = Vue.computed(() => {
    const interval2 = Number(props2.interval);
    return isNaN(interval2) ? 5e3 : interval2;
  });
  const duration = Vue.computed(() => {
    const duration2 = Number(props2.duration);
    return isNaN(duration2) ? 500 : duration2;
  });
  const displayMultipleItems = Vue.computed(() => {
    const displayMultipleItems2 = Math.round(props2.displayMultipleItems);
    return isNaN(displayMultipleItems2) ? 1 : displayMultipleItems2;
  });
  const state = Vue.reactive({
    interval,
    duration,
    displayMultipleItems,
    current: Math.round(props2.current) || 0,
    currentItemId: props2.currentItemId,
    userTracking: false
  });
  return state;
}
function useLayout(props2, state, swiperContexts, slideFrameRef, emit2, trigger) {
  function cancelSchedule() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  let timer = null;
  let invalid = true;
  let viewportPosition = 0;
  let viewportMoveRatio = 1;
  let animating = null;
  let requestedAnimation = false;
  let contentTrackViewport = 0;
  let transitionStart;
  let currentChangeSource = "";
  const swiperEnabled = Vue.computed(() => swiperContexts.value.length > state.displayMultipleItems);
  const circularEnabled = Vue.computed(() => props2.circular && swiperEnabled.value);
  function checkCircularLayout(index2) {
    if (!invalid) {
      for (let items = swiperContexts.value, n = items.length, i = index2 + state.displayMultipleItems, r = 0; r < n; r++) {
        const item = items[r];
        const s = Math.floor(index2 / n) * n + r;
        const l = s + n;
        const c = s - n;
        const u = Math.max(index2 - (s + 1), s - i, 0);
        const d = Math.max(index2 - (l + 1), l - i, 0);
        const h = Math.max(index2 - (c + 1), c - i, 0);
        const p2 = Math.min(u, d, h);
        const position = [
          s,
          l,
          c
        ][[
          u,
          d,
          h
        ].indexOf(p2)];
        item.updatePosition(position, props2.vertical);
      }
    }
  }
  function updateViewport(index2) {
    if (!(Math.floor(2 * viewportPosition) === Math.floor(2 * index2) && Math.ceil(2 * viewportPosition) === Math.ceil(2 * index2))) {
      if (circularEnabled.value) {
        checkCircularLayout(index2);
      }
    }
    const x = props2.vertical ? "0" : 100 * -index2 * viewportMoveRatio + "%";
    const y = props2.vertical ? 100 * -index2 * viewportMoveRatio + "%" : "0";
    const transform = "translate(" + x + ", " + y + ") translateZ(0)";
    const slideFrame = slideFrameRef.value;
    if (slideFrame) {
      slideFrame.style.webkitTransform = transform;
      slideFrame.style.transform = transform;
    }
    viewportPosition = index2;
    if (!transitionStart) {
      if (index2 % 1 === 0) {
        return;
      }
      transitionStart = index2;
    }
    index2 -= Math.floor(transitionStart);
    const items = swiperContexts.value;
    if (index2 <= -(items.length - 1)) {
      index2 += items.length;
    } else if (index2 >= items.length) {
      index2 -= items.length;
    }
    index2 = transitionStart % 1 > 0.5 || transitionStart < 0 ? index2 - 1 : index2;
    trigger("transition", {}, {
      dx: props2.vertical ? 0 : index2 * slideFrame.offsetWidth,
      dy: props2.vertical ? index2 * slideFrame.offsetHeight : 0
    });
  }
  function endViewportAnimation() {
    if (animating) {
      updateViewport(animating.toPos);
      animating = null;
    }
  }
  function normalizeCurrentValue(current) {
    const length = swiperContexts.value.length;
    if (!length) {
      return -1;
    }
    const index2 = (Math.round(current) % length + length) % length;
    if (circularEnabled.value) {
      if (length <= state.displayMultipleItems) {
        return 0;
      }
    } else if (index2 > length - state.displayMultipleItems) {
      return length - state.displayMultipleItems;
    }
    return index2;
  }
  function cancelViewportAnimation() {
    animating = null;
  }
  function animateFrameFuncProto() {
    if (!animating) {
      requestedAnimation = false;
      return;
    }
    const _animating = animating;
    const toPos = _animating.toPos;
    const acc = _animating.acc;
    const endTime = _animating.endTime;
    const source = _animating.source;
    const time = endTime - Date.now();
    if (time <= 0) {
      updateViewport(toPos);
      animating = null;
      requestedAnimation = false;
      transitionStart = null;
      const item = swiperContexts.value[state.current];
      if (item) {
        const currentItemId = item.getItemId();
        trigger("animationfinish", {}, {
          current: state.current,
          currentItemId,
          source
        });
      }
      return;
    }
    const s = acc * time * time / 2;
    const l = toPos + s;
    updateViewport(l);
    requestAnimationFrame(animateFrameFuncProto);
  }
  function animateViewport(current, source, n) {
    cancelViewportAnimation();
    const duration = state.duration;
    const length = swiperContexts.value.length;
    let position = viewportPosition;
    if (circularEnabled.value) {
      if (n < 0) {
        for (; position < current; ) {
          position += length;
        }
        for (; position - length > current; ) {
          position -= length;
        }
      } else if (n > 0) {
        for (; position > current; ) {
          position -= length;
        }
        for (; position + length < current; ) {
          position += length;
        }
        if (position + length - current < current - position) {
          position += length;
        }
      } else {
        for (; position + length < current; ) {
          position += length;
        }
        for (; position - length > current; ) {
          position -= length;
        }
        if (position + length - current < current - position) {
          position += length;
        }
      }
    } else if (source === "click") {
      current = current + state.displayMultipleItems - 1 < length ? current : 0;
    }
    animating = {
      toPos: current,
      acc: 2 * (position - current) / (duration * duration),
      endTime: Date.now() + duration,
      source
    };
    if (!requestedAnimation) {
      requestedAnimation = true;
      requestAnimationFrame(animateFrameFuncProto);
    }
  }
  function scheduleAutoplay() {
    cancelSchedule();
    const items = swiperContexts.value;
    const callback = function() {
      timer = null;
      currentChangeSource = "autoplay";
      if (circularEnabled.value) {
        state.current = normalizeCurrentValue(state.current + 1);
      } else {
        state.current = state.current + state.displayMultipleItems < items.length ? state.current + 1 : 0;
      }
      animateViewport(state.current, "autoplay", circularEnabled.value ? 1 : 0);
      timer = setTimeout(callback, state.interval);
    };
    if (!(invalid || items.length <= state.displayMultipleItems)) {
      timer = setTimeout(callback, state.interval);
    }
  }
  function resetLayout() {
    cancelSchedule();
    endViewportAnimation();
    const items = swiperContexts.value;
    for (let i = 0; i < items.length; i++) {
      items[i].updatePosition(i, props2.vertical);
    }
    viewportMoveRatio = 1;
    const slideFrameEl = slideFrameRef.value;
    if (state.displayMultipleItems === 1 && items.length) {
      const itemRect = items[0].getBoundingClientRect();
      const slideFrameRect = slideFrameEl.getBoundingClientRect();
      viewportMoveRatio = itemRect.width / slideFrameRect.width;
      if (!(viewportMoveRatio > 0 && viewportMoveRatio < 1)) {
        viewportMoveRatio = 1;
      }
    }
    const position = viewportPosition;
    viewportPosition = -2;
    const current = state.current;
    if (current >= 0) {
      invalid = false;
      if (state.userTracking) {
        updateViewport(position + current - contentTrackViewport);
        contentTrackViewport = current;
      } else {
        updateViewport(current);
        if (props2.autoplay) {
          scheduleAutoplay();
        }
      }
    } else {
      invalid = true;
      updateViewport(-state.displayMultipleItems - 1);
    }
  }
  Vue.watch([
    () => props2.current,
    () => props2.currentItemId,
    () => [...swiperContexts.value]
  ], () => {
    let current = -1;
    if (props2.currentItemId) {
      for (let i = 0, items = swiperContexts.value; i < items.length; i++) {
        const itemId = items[i].getItemId();
        if (itemId === props2.currentItemId) {
          current = i;
          break;
        }
      }
    }
    if (current < 0) {
      current = Math.round(props2.current) || 0;
    }
    current = current < 0 ? 0 : current;
    if (state.current !== current) {
      currentChangeSource = "";
      state.current = current;
    }
  });
  Vue.watch([
    () => props2.vertical,
    () => circularEnabled.value,
    () => state.displayMultipleItems,
    () => [...swiperContexts.value]
  ], resetLayout);
  Vue.watch(() => state.interval, () => {
    if (timer) {
      cancelSchedule();
      scheduleAutoplay();
    }
  });
  function currentChanged(current, history) {
    const source = currentChangeSource;
    currentChangeSource = "";
    const items = swiperContexts.value;
    if (!source) {
      const length = items.length;
      animateViewport(current, "", circularEnabled.value && history + (length - current) % length > length / 2 ? 1 : 0);
    }
    const item = items[current];
    if (item) {
      const currentItemId = state.currentItemId = item.getItemId();
      trigger("change", {}, {
        current: state.current,
        currentItemId,
        source
      });
    }
  }
  Vue.watch(() => state.current, (val, oldVal) => {
    currentChanged(val, oldVal);
    emit2("update:current", val);
  });
  Vue.watch(() => state.currentItemId, (val) => {
    emit2("update:currentItemId", val);
  });
  function inintAutoplay(enable) {
    if (enable) {
      scheduleAutoplay();
    } else {
      cancelSchedule();
    }
  }
  Vue.watch(() => props2.autoplay && !state.userTracking, inintAutoplay);
  inintAutoplay(props2.autoplay && !state.userTracking);
  function onSwiperDotClick(index2) {
    animateViewport(state.current = index2, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
  }
  return {
    onSwiperDotClick,
    circularEnabled,
    swiperEnabled
  };
}
const index$j = /* @__PURE__ */ defineBuiltInComponent({
  name: "Swiper",
  props: props$e,
  emits: [
    "change",
    "transition",
    "animationfinish",
    "update:current",
    "update:currentItemId"
  ],
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const slidesWrapperRef = Vue.ref(null);
    const slideFrameRef = Vue.ref(null);
    const state = useState(props2);
    const slidesStyle = Vue.computed(() => {
      let style = {};
      if (props2.nextMargin || props2.previousMargin) {
        style = props2.vertical ? {
          left: 0,
          right: 0,
          top: rpx2px(props2.previousMargin, true),
          bottom: rpx2px(props2.nextMargin, true)
        } : {
          top: 0,
          bottom: 0,
          left: rpx2px(props2.previousMargin, true),
          right: rpx2px(props2.nextMargin, true)
        };
      }
      return style;
    });
    const slideFrameStyle = Vue.computed(() => {
      const value = Math.abs(100 / state.displayMultipleItems) + "%";
      return {
        width: props2.vertical ? "100%" : value,
        height: !props2.vertical ? "100%" : value
      };
    });
    let swiperItems = [];
    const originSwiperContexts = [];
    const swiperContexts = Vue.ref([]);
    function updateSwiperContexts() {
      const contexts = [];
      for (let index2 = 0; index2 < swiperItems.length; index2++) {
        let swiperItem = swiperItems[index2];
        if (!(swiperItem instanceof Element)) {
          swiperItem = swiperItem.el;
        }
        const swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
        if (swiperContext) {
          contexts.push(Vue.markRaw(swiperContext));
        }
      }
      swiperContexts.value = contexts;
    }
    const addSwiperContext = function(swiperContext) {
      originSwiperContexts.push(swiperContext);
      updateSwiperContexts();
    };
    Vue.provide("addSwiperContext", addSwiperContext);
    const removeSwiperContext = function(swiperContext) {
      const index2 = originSwiperContexts.indexOf(swiperContext);
      if (index2 >= 0) {
        originSwiperContexts.splice(index2, 1);
        updateSwiperContexts();
      }
    };
    Vue.provide("removeSwiperContext", removeSwiperContext);
    const { onSwiperDotClick, circularEnabled, swiperEnabled } = useLayout(props2, state, swiperContexts, slideFrameRef, emit2, trigger);
    let createNavigationTsx = () => null;
    {
      createNavigationTsx = useSwiperNavigation(rootRef, props2, state, onSwiperDotClick, swiperContexts, circularEnabled, swiperEnabled);
    }
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        swiperItems = flatVNode(defaultSlots);
      }
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n4 = Vue.createPlainElement("uni-swiper", null, () => {
          const _n3 = _t0$a();
          const _n1 = Vue.child(_n3);
          const _n0 = Vue.child(_n1);
          const _n2 = Vue.next(_n1, true);
          const _x0 = Vue.txt(_n0);
          setNodes(_x0, () => defaultSlots);
          setNodes(_n2, () => props2.indicatorDots && (() => {
            const _n02 = _t1$7();
            const _x02 = Vue.txt(_n02);
            setNodes(_x02, () => swiperContexts.value.map((_, index2, array) => (() => {
              const _n03 = _t2$3();
              Vue.on(_n03, "click", () => onSwiperDotClick(index2));
              Vue.renderEffect(() => {
                Vue.setClassName(_n03, 1 | (index2 < state.current + state.displayMultipleItems && index2 >= state.current || index2 < state.current + state.displayMultipleItems - array.length ? 2 : 0), [" uni-swiper-dot", " uni-swiper-dot-active"]);
                Vue.setStyle(_n03, { background: index2 === state.current ? props2.indicatorActiveColor : props2.indicatorColor });
              });
              return _n03;
            })()));
            Vue.renderEffect(() => Vue.setClass(_n02, ["uni-swiper-dots", props2.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"]));
            return _n02;
          })(), () => createNavigationTsx());
          Vue.renderEffect(() => {
            Vue.setStyle(_n1, slidesStyle.value);
            Vue.setStyle(_n0, slideFrameStyle.value);
            _setTemplateRef(_n0, slideFrameRef);
            _setTemplateRef(_n3, slidesWrapperRef);
          });
          return _n3;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n4, rootRef));
        return _n4;
      })();
    };
  }
});
const useSwiperNavigation = (rootRef, props2, state, onSwiperDotClick, swiperContext, circularEnabled, swiperEnabled) => {
  let isNavigationAuto = false;
  let prevDisabled = false;
  let nextDisabled = false;
  let hideNavigation = Vue.ref(false);
  Vue.watchEffect(() => {
    isNavigationAuto = props2.navigation === "auto";
    hideNavigation.value = props2.navigation !== true || isNavigationAuto;
    swiperAddMouseEvent();
  });
  Vue.watchEffect(() => {
    const swiperItemLength = swiperContext.value.length;
    const notCircular = !circularEnabled.value;
    prevDisabled = state.current === 0 && notCircular;
    nextDisabled = state.current === swiperItemLength - 1 && notCircular || notCircular && state.current + state.displayMultipleItems >= swiperItemLength;
    if (!swiperEnabled.value) {
      prevDisabled = true;
      nextDisabled = true;
      isNavigationAuto && (hideNavigation.value = true);
    }
  });
  function navigationHover(event, type) {
    const target = event.currentTarget;
    if (!target)
      return;
    target.style.backgroundColor = type === "over" ? props2.navigationActiveColor : "";
  }
  const navigationAttr = {
    onMouseover: (event) => navigationHover(event, "over"),
    onMouseout: (event) => navigationHover(event, "out")
  };
  function navigationClick($event, type, disabled) {
    $event.stopPropagation();
    if (disabled)
      return;
    const swiperItemLength = swiperContext.value.length;
    let _current = state.current;
    switch (type) {
      case "prev":
        _current--;
        if (_current < 0 && circularEnabled.value) {
          _current = swiperItemLength - 1;
        }
        break;
      case "next":
        _current++;
        if (_current >= swiperItemLength && circularEnabled.value) {
          _current = 0;
        }
        break;
    }
    onSwiperDotClick(_current);
  }
  const createNavigationSVG = () => createSvgIconVNode(ICON_PATH_BACK, props2.navigationColor, 26);
  let setHideNavigationTimer;
  const _mousemove = (e2) => {
    clearTimeout(setHideNavigationTimer);
    const { clientX, clientY } = e2;
    const { left, right, top, bottom, width, height } = rootRef.value.getBoundingClientRect();
    let hide = false;
    if (props2.vertical) {
      hide = !(clientY - top < height / 3 || bottom - clientY < height / 3);
    } else {
      hide = !(clientX - left < width / 3 || right - clientX < width / 3);
    }
    if (hide) {
      return setHideNavigationTimer = setTimeout(() => {
        hideNavigation.value = hide;
      }, 300);
    }
    hideNavigation.value = hide;
  };
  const _mouseleave = () => {
    hideNavigation.value = true;
  };
  function swiperAddMouseEvent() {
    if (rootRef.value) {
      rootRef.value.removeEventListener("mousemove", _mousemove);
      rootRef.value.removeEventListener("mouseleave", _mouseleave);
      if (isNavigationAuto) {
        rootRef.value.addEventListener("mousemove", _mousemove);
        rootRef.value.addEventListener("mouseleave", _mouseleave);
      }
    }
  }
  function createNavigationTsx() {
    const navigationClass = {
      "uni-swiper-navigation-hide": hideNavigation.value,
      "uni-swiper-navigation-vertical": props2.vertical
    };
    if (props2.navigation) {
      return (() => {
        const _n0 = _t3$3();
        const _n1 = _t3$3();
        Vue.on(_n0, "click", (e2) => navigationClick(e2, "prev", prevDisabled));
        const _x0 = Vue.txt(_n0);
        setNodes(_x0, () => createNavigationSVG());
        Vue.on(_n1, "click", (e2) => navigationClick(e2, "next", nextDisabled));
        const _x1 = Vue.txt(_n1);
        setNodes(_x1, () => createNavigationSVG());
        Vue.renderEffect(() => {
          Vue.setDynamicProps(_n0, [{ class: ["uni-swiper-navigation uni-swiper-navigation-prev", shared.extend({ "uni-swiper-navigation-disabled": prevDisabled }, navigationClass)] }, navigationAttr]);
          Vue.setDynamicProps(_n1, [{ class: ["uni-swiper-navigation uni-swiper-navigation-next", shared.extend({ "uni-swiper-navigation-disabled": nextDisabled }, navigationClass)] }, navigationAttr]);
        });
        return [_n0, _n1];
      })();
    }
    return null;
  }
  return createNavigationTsx;
};
const props$d = { itemId: {
  type: String,
  default: ""
} };
const index$i = /* @__PURE__ */ defineBuiltInComponent({
  name: "SwiperItem",
  props: props$d,
  setup(props2, { slots }) {
    const rootRef = Vue.ref(null);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-swiper-item", { style: {
          position: "absolute",
          width: "100%",
          height: "100%"
        } }, Vue.extend(() => {
          const _n0 = createNodes(() => slots.default && slots.default());
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const _t0$9 = Vue.template("<div class=uni-switch-wrapper><div><div></div></div><div class=uni-checkbox-input>");
const props$c = {
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
    default: ""
  },
  backgroundColor: {
    type: String,
    default: ""
  },
  activeBackgroundColor: {
    type: String,
    default: ""
  },
  foreColor: {
    type: String,
    default: ""
  },
  activeForeColor: {
    type: String,
    default: ""
  }
};
const indexX$1 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Switch",
  props: props$c,
  emits: ["change"],
  setup(props2, { emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const switchChecked = Vue.ref(props2.checked);
    const uniLabel = useSwitchInject(rootRef, props2, switchChecked);
    const trigger = useCustomEvent(rootRef, emit2);
    Vue.watch(() => props2.checked, (val) => {
      switchChecked.value = val;
    });
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      switchChecked.value = !switchChecked.value;
      trigger("change", $event, { value: switchChecked.value });
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
    }
    let checkedCache = Vue.ref(switchChecked.value);
    Vue.watch(() => switchChecked.value, (val) => {
      checkedCache.value = val;
    });
    return () => {
      const { activeBackgroundColor, activeForeColor, backgroundColor, color, foreColor, type } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const fixColor = activeBackgroundColor || color;
      const bgColor = switchChecked.value ? fixColor : backgroundColor;
      const switchInputStyle = bgColor ? {
        backgroundColor: bgColor,
        borderColor: bgColor
      } : void 0;
      const fgColor = switchChecked.value ? activeForeColor : foreColor;
      const thumbStyle = fgColor ? { backgroundColor: fgColor } : void 0;
      let realCheckValue;
      realCheckValue = checkedCache.value;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n9 = Vue.createPlainElement("uni-switch", {
          id: () => props2.id,
          $: [() => booleanAttrs, { onClick: () => _onClick }]
        }, () => {
          const _n8 = _t0$9();
          const _n0 = Vue.child(_n8);
          const _n1 = Vue.child(_n0);
          const _n2 = Vue.next(_n0);
          Vue.applyVShow(_n0, () => type === "switch");
          Vue.applyVShow(_n2, () => type === "checkbox");
          Vue.renderEffect(() => {
            Vue.setClass(_n0, ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]]);
            Vue.setStyle(_n0, switchInputStyle);
            Vue.setClass(_n1, ["uni-switch-thumb", [switchChecked.value ? "uni-switch-thumb-checked" : ""]]);
            Vue.setStyle(_n1, thumbStyle);
          });
          Vue.setInsertionState(_n2);
          Vue.createIf(() => realCheckValue, () => {
            const _n5 = createNodes(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.foreColor || props2.color || "currentColor", 22));
            return _n5;
          }, () => {
            const _n7 = createNodes("");
            return _n7;
          }, 266);
          return _n8;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n9, rootRef));
        return _n9;
      })();
    };
  }
});
function useSwitchInject(rootRef, props2, switchChecked) {
  const initialCheckedValue = props2.checked;
  const uniForm = Vue.inject(uniFormKey, false);
  const uniLabel = Vue.inject(uniLabelKey, false);
  const formField = {
    submit: () => {
      const data = ["", null];
      if (props2.name) {
        data[0] = props2.name;
        data[1] = rootRef.value.checked;
      }
      return data;
    },
    reset: () => {
      switchChecked.value = initialCheckedValue;
    }
  };
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  return uniLabel;
}
const _t0$8 = Vue.template("<textarea tabindex=-1>", 1);
const _t1$6 = Vue.template("<textarea>", 1);
const _t2$2 = Vue.template("<form action class=uni-input-form> ");
const _t3$2 = Vue.template("<div class=uni-textarea-wrapper><div> </div><div class=uni-textarea-line> </div><div> </div>");
const _t4$2 = Vue.template("<div>", 1);
const props$b = /* @__PURE__ */ shared.extend({}, props$l, {
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
    default: "return",
    validator(val) {
      return ConfirmTypes.concat("return").includes(val);
    }
  }
});
const ConfirmTypes = [
  "done",
  "go",
  "next",
  "search",
  "send"
];
const index$h = /* @__PURE__ */ defineBuiltInComponent({
  name: "Textarea",
  props: props$b,
  emits: [
    "confirm",
    "change",
    "linechange",
    ...emit
  ],
  setup(props2, { emit: emit2, expose }) {
    const rootRef = Vue.ref(null);
    const wrapperRef = Vue.ref(null);
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props2, rootRef, emit2);
    const valueCompute = Vue.computed(() => state.value.split(uniShared.LINEFEED));
    const isDone = Vue.computed(() => ConfirmTypes.includes(props2.confirmType));
    const heightRef = Vue.ref(0);
    const lineRef = Vue.ref(null);
    Vue.watch(() => heightRef.value, (height) => {
      const el = rootRef.value;
      const lineEl = lineRef.value;
      const wrapper = wrapperRef.value;
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
        wrapper.style.height = height + "px";
      }
    });
    Vue.watch(() => props2.autoHeight, (autoHeight) => {
      const wrapper = wrapperRef.value;
      if (autoHeight) {
        wrapper.style.height = heightRef.value + "px";
      } else {
        wrapper.style.height = "";
      }
    });
    function onResize({ height }) {
      heightRef.value = height;
    }
    function onChange2(event) {
      {
        trigger("change", event, { value: state.value });
      }
    }
    function confirm(event) {
      trigger("confirm", event, { value: state.value });
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
        !props2.confirmHold && textarea.blur();
      }
    }
    expose({ $triggerInput: (detail) => {
      emit2("update:modelValue", detail.value);
      emit2("update:value", detail.value);
      state.value = detail.value;
    } });
    return () => {
      let textareaNode = props2.disabled && fixDisabledColor ? (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = _t0$8();
        Vue.setBlockKey(_n0, "disabled-textarea");
        Vue.on(
          _n0,
          // fix: 禁止 readonly 状态获取焦点
          "focus",
          (event) => event.target.blur()
        );
        Vue.renderEffect(() => {
          Vue.setValue(_n0, state.value);
          Vue.setProp(_n0, "readonly", !!props2.disabled);
          Vue.setProp(_n0, "maxlength", state.maxlength);
          Vue.setClassName(_n0, 1 | 0, [" uni-textarea-textarea", " uni-textarea-textarea-fix-margin"]);
          Vue.setStyle(_n0, {
            overflowY: props2.autoHeight ? "hidden" : "auto",
            /* eslint-disable no-restricted-syntax */
            ...props2.cursorColor && { caretColor: props2.cursorColor }
          });
          _setTemplateRef(_n0, fieldRef);
        });
        return _n0;
      })() : (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = _t1$6();
        Vue.setBlockKey(_n0, "textarea");
        Vue.on(_n0, "keydown", onKeyDownEnter);
        Vue.on(_n0, "keyup", onKeyUpEnter);
        Vue.on(_n0, "change", onChange2);
        Vue.renderEffect(() => {
          Vue.setValue(_n0, state.value);
          Vue.setProp(_n0, "disabled", !!props2.disabled);
          Vue.setProp(_n0, "maxlength", state.maxlength);
          Vue.setProp(_n0, "enterkeyhint", props2.confirmType);
          Vue.setProp(_n0, "inputmode", props2.inputmode);
          Vue.setClassName(_n0, 1 | 0, [" uni-textarea-textarea", " uni-textarea-textarea-fix-margin"]);
          Vue.setStyle(_n0, {
            overflowY: props2.autoHeight ? "hidden" : "auto",
            /* eslint-disable no-restricted-syntax */
            ...props2.cursorColor && { caretColor: props2.cursorColor }
          });
          _setTemplateRef(_n0, fieldRef);
        });
        return _n0;
      })();
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n11 = Vue.createPlainElement("uni-textarea", { "auto-height": () => props2.autoHeight }, () => {
          const _n10 = _t3$2();
          const _n0 = Vue.child(_n10);
          const _n1 = Vue.next(_n0);
          const _n4 = Vue.next(_n1);
          const _n2 = Vue.child(_n4, true);
          Vue.applyVShow(_n0, () => !state.value.length);
          const _x0 = Vue.txt(_n0);
          setNodes(_x0, () => props2.placeholder);
          setNodes(_n2, () => valueCompute.value.map((item) => (() => {
            const _n52 = _t4$2();
            Vue.setInsertionState(_n52);
            Vue.createIf(() => item.trim(), () => {
              const _n22 = createNodes(() => item);
              return _n22;
            }, () => {
              const _n42 = createNodes(".");
              return _n42;
            }, 266);
            return _n52;
          })()));
          Vue.renderEffect(() => {
            Vue.setDynamicProps(_n0, [scopedAttrsState.attrs, {
              style: props2.placeholderStyle,
              class: ["uni-textarea-placeholder", props2.placeholderClass]
            }]);
            _setTemplateRef(_n1, lineRef);
            Vue.setClassName(_n4, 1 | (props2.autoHeight ? 2 : 0), [" uni-textarea-compute", " uni-textarea-compute-auto-height"]);
          });
          Vue.setInsertionState(_n4, 1);
          createComponent(ResizeSensor, {
            initial: true,
            onResize: () => onResize
          });
          Vue.setInsertionState(_n10, 3);
          Vue.createIf(() => props2.confirmType === "search", () => {
            const _n7 = _t2$2();
            Vue.on(_n7, "submit", () => false);
            const _x7 = Vue.txt(_n7);
            setNodes(_x7, () => textareaNode);
            return _n7;
          }, () => {
            const _n9 = createNodes(() => textareaNode);
            return _n9;
          }, 265);
          Vue.renderEffect(() => _setTemplateRef(_n10, wrapperRef));
          return _n10;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n11, rootRef));
        return _n11;
      })();
    };
  }
});
const _t0$7 = Vue.template("<div class=uni-list-view-visible> ", 1);
const _t1$5 = Vue.template("<div><!><div class=uni-list-view-content><div></div> <div></div></div></div>");
function isHTMlElement(node) {
  return !!(node && node.nodeType === 1);
}
function getChildren(root) {
  const children = [];
  if (root) {
    walk(root, children);
  }
  return children;
}
const ChildType = [
  "ListItem",
  "StickySection",
  "StickyHeader"
];
function walk(vnode, children) {
  if (vnode.component && vnode.component.type && vnode.component.type.name && ChildType.includes(vnode.component.type.name)) {
    children.push(vnode);
  } else if (vnode.component) {
    walk(vnode.component.subTree, children);
  } else if (vnode.shapeFlag & 16) {
    const vnodes = vnode.children;
    for (let i = 0; i < vnodes.length; i++) {
      walk(vnodes[i], children);
    }
  }
}
function traverseListView(visibleVNode, callback) {
  const children = getChildren(visibleVNode);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    callback(child);
  }
}
function traverseStickySection(stickySectionVNode, callback) {
  const children = getChildren(stickySectionVNode.component.subTree);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    callback(child);
  }
}
const props$a = {
  direction: {
    type: String,
    default: "vertical",
    validator: (val) => {
      return [
        "none",
        "vertical",
        "horizontal"
      ].includes(val);
    }
  },
  showScrollbar: {
    type: [Boolean, String],
    default: true
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
    default: "black"
  },
  refresherBackground: {
    type: String,
    default: "transparent"
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false
  }
};
const index$g = /* @__PURE__ */ defineBuiltInComponent({
  name: "ListView",
  props: props$a,
  emits: [
    "scroll",
    "scrolltoupper",
    "scrolltolower",
    "refresherrefresh",
    "refresherrestore",
    "refresherpulling",
    "refresherabort",
    "update:refresherTriggered"
  ],
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = Vue.ref(null);
    const containerRef = Vue.ref(null);
    const visibleRef = Vue.ref(null);
    const { isVertical, state } = useListViewState(props2);
    Vue.provide("__listViewIsVertical", isVertical);
    Vue.provide("__listViewDefaultItemSize", state.defaultItemSize);
    Vue.provide("__listViewDefaultHeaderSize", state.defaultHeaderSize);
    const rearrangeDebounce = uniShared.debounce(() => {
      Vue.nextTick(() => {
        _rearrange();
      });
    }, 5, {
      clearTimeout,
      setTimeout
    });
    const childStatus = [];
    Vue.provide("__listViewRegisterItem", (status) => {
      childStatus.push(status);
      rearrangeDebounce();
    });
    Vue.provide("__listViewUnregisterItem", (status) => {
      const index2 = childStatus.indexOf(status);
      childStatus.splice(index2, 1);
      rearrangeDebounce();
    });
    Vue.watch(() => {
      return state.defaultHeaderSize;
    }, (value) => {
      rearrangeDebounce();
    });
    Vue.watch(() => {
      return state.defaultItemSize;
    }, () => {
      childStatus.forEach((status) => {
        if (status.cachedSizeUpdated) {
          return;
        }
        status.cachedSize = state.defaultItemSize;
      });
      rearrangeDebounce();
    });
    const trigger = useCustomEvent(rootRef, emit2);
    handleTouchEvent(isVertical, containerRef, props2, state, trigger, emit2);
    function resetContainerSize() {
      const containerEl = containerRef.value;
      state.containerSize = isVertical.value ? containerEl.clientHeight : containerEl.clientWidth;
      rearrangeDebounce();
    }
    Vue.watch(isVertical, () => {
      resetContainerSize();
    });
    Vue.computed(() => {
      const val = Number(props2.upperThreshold);
      return isNaN(val) ? 50 : val;
    });
    Vue.computed(() => {
      const val = Number(props2.lowerThreshold);
      return isNaN(val) ? 50 : val;
    });
    const scrollTopNumber = Vue.computed(() => {
      return Number(props2.scrollTop) || 0;
    });
    const scrollLeftNumber = Vue.computed(() => {
      return Number(props2.scrollLeft) || 0;
    });
    Vue.watch(scrollTopNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollTop = val;
      }
    });
    Vue.watch(scrollLeftNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollLeft = val;
      }
    });
    Vue.watch(() => props2.scrollIntoView, (val) => {
      _scrollIntoViewChanged(val);
    });
    function _scrollIntoViewChanged(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.error(`id error: scroll-into-view=${val}`);
          return;
        }
        let element = containerRef.value.querySelector("#" + val);
        if (element) {
          let mainRect = containerRef.value.getBoundingClientRect();
          let elRect = element.getBoundingClientRect();
          if (!isVertical.value) {
            let left = elRect.left - mainRect.left;
            let scrollLeft = containerRef.value.scrollLeft;
            let x = scrollLeft + left;
            containerRef.value.scrollLeft = x;
          }
          if (isVertical.value) {
            let top = elRect.top - mainRect.top;
            let scrollTop = containerRef.value.scrollTop;
            let y = scrollTop + top;
            containerRef.value.scrollTop = y;
          }
        }
      }
    }
    function onResize() {
      childStatus.forEach((status) => {
        status.cachedSizeUpdated = false;
      });
      resetContainerSize();
    }
    function _rearrange() {
      rearrange(visibleVNode, containerRef, isVertical, state);
    }
    const containerStyle = Vue.computed(() => {
      return `${props2.direction === "none" ? "overflow: hidden;" : props2.direction === "all" ? "overflow: auto;" : isVertical.value ? "overflow: hidden auto;" : "overflow: auto hidden;"}scroll-behavior: ${props2.scrollWithAnimation ? "smooth" : "auto"};`;
    });
    const visibleStyle = Vue.computed(() => {
      return `${isVertical.value ? "width" : "height"}: 100%;`;
    });
    const placeholderHeadStyle = Vue.computed(() => {
      return `${isVertical.value ? "height" : "width"}: ${state.headPlaceholderSize}px;`;
    });
    const placeholderTailStyle = Vue.computed(() => {
      return `${isVertical.value ? "height" : "width"}: ${state.tailPlaceholderSize}px;`;
    });
    let visibleVNode = null;
    return () => {
      const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props2;
      const { refresherHeight, refreshState } = state;
      const defaultSlot = slots.default && slots.default();
      visibleVNode = (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = _t0$7();
        const _x0 = Vue.txt(_n0);
        setNodes(_x0, () => defaultSlot);
        Vue.renderEffect(() => {
          Vue.setStyle(_n0, visibleStyle.value);
          _setTemplateRef(_n0, visibleRef);
        });
        return _n0;
      })();
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n16 = Vue.createPlainElement("uni-list-view", { class: "uni-list-view" }, () => {
          const _n14 = _t1$5();
          const _n13 = Vue.child(_n14);
          const _n10 = Vue.child(Vue.next(_n13));
          const _n11 = Vue.next(_n10, true);
          const _n12 = Vue.next(_n11);
          Vue.renderEffect(() => {
            Vue.setClass(_n14, `uni-list-view-container ${props2.showScrollbar === false ? "uni-list-view-scrollbar-hidden" : ""}`);
            Vue.setStyle(_n14, containerStyle.value);
          });
          Vue.setInsertionState(_n14, _n13);
          Vue.createIf(() => refresherEnabled, () => {
            const _n7 = createComponent(Refresher, {
              refreshState: () => refreshState,
              refresherHeight: () => refresherHeight,
              refresherThreshold: () => refresherThreshold,
              refresherDefaultStyle: () => refresherDefaultStyle,
              refresherBackground: () => refresherBackground
            }, Vue.extend(() => {
              const _n2 = Vue.createIf(() => refresherDefaultStyle == "none", () => {
                const _n4 = createNodes(() => slots.refresher && slots.refresher());
                return _n4;
              }, () => {
                const _n6 = createNodes(null);
                return _n6;
              }, 394);
              return _n2;
            }, { _: 1 }));
            return _n7;
          }, () => {
            const _n9 = createNodes(null);
            return _n9;
          }, 521);
          setNodes(_n11, () => visibleVNode);
          Vue.renderEffect(() => {
            Vue.setStyle(_n10, placeholderHeadStyle.value);
            Vue.setStyle(_n12, placeholderTailStyle.value);
            _setTemplateRef(_n14, containerRef);
          });
          const _n15 = createComponent(ResizeSensor, {
            initial: true,
            onResize: () => onResize
          });
          return [_n14, _n15];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n16, rootRef));
        return _n16;
      })();
    };
  }
});
function useListViewState(props2) {
  const isVertical = Vue.computed(() => {
    return props2.direction !== "horizontal";
  });
  const state = Vue.reactive({
    defaultItemSize: 40,
    defaultItemSizeUpdated: false,
    defaultHeaderSize: 40,
    defaultHeaderSizeUpdated: false,
    totalSize: 0,
    headPlaceholderSize: 0,
    tailPlaceholderSize: 0,
    visibleSize: 0,
    containerSize: 0,
    cacheScreenCount: 10,
    loadScreenThreshold: 8,
    refresherHeight: 0,
    refreshState: "",
    lastRenderOffsetMin: 0,
    lastRenderOffsetMax: 0
  });
  return {
    state,
    isVertical
  };
}
function rearrange(visibleVNode, containerRef, isVertical, state) {
  if (!visibleVNode) {
    return;
  }
  const containerEl = containerRef.value;
  if (!containerEl) {
    return;
  }
  const offset = isVertical.value ? containerEl.scrollTop : containerEl.scrollLeft;
  const offsetMin = Math.max(offset - state.containerSize * state.cacheScreenCount, 0);
  const offsetMax = Math.max(offset + state.containerSize * (state.cacheScreenCount + 1), offsetMin + 1);
  state.lastRenderOffsetMin = offsetMin;
  state.lastRenderOffsetMax = offsetMax;
  let tempTotalSize = 0;
  let tempVisibleSize = 0;
  let tempHeadPlaceholderSize = 0;
  let tempTailPlaceholderSize = 0;
  let start = false, end = false;
  function callback(child) {
    var _a, _b, _c;
    const childType = (_a = child.component) == null ? void 0 : _a.type.name;
    const status = (_c = (_b = child.component) == null ? void 0 : _b.exposed) == null ? void 0 : _c.__listViewChildStatus;
    if (childType === "StickySection") {
      const { headSize, tailSize, headPlaceholderSize, tailPlaceholderSize } = status;
      tempTotalSize += headSize.value;
      let tempTailPlaceholderSizeOfSection = 0;
      let tempHeadPlaceholderSizeOfSection = 0;
      traverseStickySection(child, (child2) => {
        var _a2, _b2, _c2;
        const childType2 = (_a2 = child2.component) == null ? void 0 : _a2.type.name;
        const status2 = (_c2 = (_b2 = child2.component) == null ? void 0 : _b2.exposed) == null ? void 0 : _c2.__listViewChildStatus;
        if (childType2 === "StickyHeader") {
          const { cachedSize, cachedSizeUpdated } = status2;
          if (cachedSizeUpdated && cachedSize > 0 && !state.defaultHeaderSizeUpdated) {
            state.defaultHeaderSize = cachedSize;
            state.defaultHeaderSizeUpdated = true;
          }
          tempTotalSize += cachedSize || state.defaultHeaderSize;
          tempVisibleSize += cachedSize;
        } else if (childType2 === "ListItem") {
          const { cachedSize, cachedSizeUpdated } = status2;
          if (cachedSizeUpdated && cachedSize > 0 && !state.defaultItemSizeUpdated) {
            state.defaultItemSize = cachedSize;
            state.defaultItemSizeUpdated = true;
          }
          const itemSize = cachedSize || state.defaultItemSize;
          tempTotalSize += itemSize;
          if (!start && tempTotalSize > offsetMin) {
            start = true;
          }
          if (start && !end) {
            tempVisibleSize += itemSize;
            status2.visible.value = true;
          } else if (start && end) {
            status2.visible.value = false;
            tempTailPlaceholderSizeOfSection += itemSize;
          } else {
            status2.visible.value = false;
            tempHeadPlaceholderSizeOfSection += itemSize;
          }
          if (!end && tempTotalSize >= offsetMax) {
            end = true;
          }
        }
      });
      tempVisibleSize += tempHeadPlaceholderSizeOfSection + tempTailPlaceholderSizeOfSection;
      tempTotalSize += tailSize.value;
      headPlaceholderSize.value = tempHeadPlaceholderSizeOfSection;
      tailPlaceholderSize.value = tempTailPlaceholderSizeOfSection;
    } else if (childType === "ListItem") {
      const { cachedSize, cachedSizeUpdated } = status;
      if (cachedSizeUpdated && cachedSize > 0 && !state.defaultItemSizeUpdated) {
        state.defaultItemSize = cachedSize;
        state.defaultItemSizeUpdated = true;
      }
      const itemSize = cachedSize || state.defaultItemSize;
      tempTotalSize += itemSize;
      if (!start && tempTotalSize > offsetMin) {
        start = true;
      }
      if (!start) {
        tempHeadPlaceholderSize += itemSize;
      } else if (start && end) {
        tempTailPlaceholderSize += itemSize;
      }
      if (start && !end) {
        tempVisibleSize += itemSize;
        status.visible.value = true;
      } else {
        status.visible.value = false;
      }
      if (!end && tempTotalSize >= offsetMax) {
        end = true;
      }
    } else if (childType === "StickyHeader") {
      const { cachedSize, cachedSizeUpdated } = status;
      if (cachedSizeUpdated && cachedSize > 0 && !state.defaultHeaderSizeUpdated) {
        state.defaultHeaderSize = cachedSize;
        state.defaultHeaderSizeUpdated = true;
      }
      tempTotalSize += cachedSize || state.defaultHeaderSize;
      tempVisibleSize += cachedSize;
    }
  }
  traverseListView(visibleVNode, callback);
  state.totalSize = tempTotalSize;
  state.visibleSize = tempVisibleSize;
  state.headPlaceholderSize = tempHeadPlaceholderSize;
  state.tailPlaceholderSize = tempTailPlaceholderSize;
}
function handleTouchEvent(isVertical, containerRef, props2, state, trigger, emit2) {
  let beforeRefreshing = false;
  let triggerAbort = false;
  let touchStart = {
    x: 0,
    y: 0
  };
  let touchEnd = {
    x: 0,
    y: props2.refresherThreshold
  };
  function _setRefreshState(_state) {
    if (!props2.refresherEnabled)
      return;
    switch (_state) {
      case "refreshing":
        state.refresherHeight = props2.refresherThreshold;
        if (!beforeRefreshing) {
          beforeRefreshing = true;
          trigger("refresherpulling", {}, {
            deltaY: state.refresherHeight,
            dy: state.refresherHeight
          });
          trigger("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
          emit2("update:refresherTriggered", true);
        }
        break;
      case "restore":
      case "refresherabort":
        beforeRefreshing = false;
        state.refresherHeight = 0;
        if (_state === "restore") {
          triggerAbort = false;
          trigger("refresherrestore", {}, { dy: touchEnd.y - touchStart.y });
        }
        if (_state === "refresherabort" && triggerAbort) {
          triggerAbort = false;
          trigger("refresherabort", {}, { dy: touchEnd.y - touchStart.y });
        }
        break;
    }
    state.refreshState = _state;
  }
  Vue.watch(() => props2.refresherTriggered, (val) => {
    if (val === true) {
      _setRefreshState("refreshing");
    } else if (val === false) {
      _setRefreshState("restore");
    }
  });
}
function getSize(isVertical, el) {
  var style = window.getComputedStyle(el);
  if (isVertical) {
    return parseFloat(style.marginTop) + el.getBoundingClientRect().height + parseFloat(style.marginBottom);
  } else {
    return parseFloat(style.marginLeft) + el.getBoundingClientRect().width + parseFloat(style.marginRight);
  }
}
const index$f = /* @__PURE__ */ defineBuiltInComponent({
  name: "ListItem",
  props: {},
  setup(props2, { slots, expose, attrs: attrs2 }) {
    if (attrs2.slot === "refresher") {
      return () => {
        return (() => {
          const _n1 = Vue.createPlainElement("uni-list-item", null, Vue.extend(() => {
            const _n0 = createNodes(() => slots.default && slots.default());
            return _n0;
          }, { _: 1 }), true);
          return _n1;
        })();
      };
    }
    const rootRef = Vue.ref(null);
    const isVertical = Vue.inject("__listViewIsVertical");
    const visible = Vue.ref(false);
    const status = {
      type: "ListItem",
      visible,
      cachedSize: Vue.inject("__listViewDefaultItemSize"),
      cachedSizeUpdated: false
    };
    expose({ __listViewChildStatus: status });
    Vue.inject("__listViewRegisterItem");
    Vue.inject("__listViewUnregisterItem");
    function updateSize() {
      if (!visible.value || status.cachedSizeUpdated) {
        return;
      }
      const rootNode = rootRef.value;
      if (isHTMlElement(rootNode)) {
        const size = getSize(isVertical.value, rootNode);
        if (isNaN(size)) {
          return;
        }
        status.cachedSize = getSize(isVertical.value, rootNode);
        status.cachedSizeUpdated = true;
      }
    }
    Vue.watch(visible, (value) => {
      Vue.nextTick(() => {
        updateSize();
      });
    });
    return () => {
      if (!visible.value) {
        return null;
      }
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-list-item", null, Vue.extend(() => {
          const _n0 = createNodes(() => slots.default && slots.default());
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const index$e = /* @__PURE__ */ defineBuiltInComponent({
  name: "StickySection",
  props: { padding: {
    type: Array,
    default: [
      0,
      0,
      0,
      0
    ]
  } },
  setup(props2, { slots, expose }) {
    const rootRef = Vue.ref(null);
    const isVertical = Vue.inject("__listViewIsVertical");
    const headPlaceholderSize = Vue.ref(0);
    const tailPlaceholderSize = Vue.ref(0);
    const style = Vue.computed(() => {
      const padding = props2.padding;
      const paddingTop = padding[0];
      const paddingRight = padding[1];
      const paddingBottom = padding[2];
      const paddingLeft = padding[3];
      return {
        paddingTop: (isVertical.value ? paddingTop + headPlaceholderSize.value : paddingTop) + "px",
        paddingRight: (isVertical.value ? paddingRight : paddingRight + tailPlaceholderSize.value) + "px",
        paddingBottom: (isVertical.value ? paddingBottom + tailPlaceholderSize.value : paddingBottom) + "px",
        paddingLeft: (isVertical.value ? paddingLeft : paddingLeft + headPlaceholderSize.value) + "px"
      };
    });
    const headSize = Vue.computed(() => {
      return isVertical ? props2.padding[0] : props2.padding[3];
    });
    const tailSize = Vue.computed(() => {
      return isVertical ? props2.padding[2] : props2.padding[1];
    });
    const status = {
      type: "StickySection",
      headSize,
      tailSize,
      headPlaceholderSize,
      tailPlaceholderSize
    };
    expose({ __listViewChildStatus: status });
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-sticky-section", { style: () => style.value }, Vue.extend(() => {
          const _n0 = createNodes(() => {
            var _a;
            return (_a = slots.default) == null ? void 0 : _a.call(slots);
          });
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const index$d = /* @__PURE__ */ defineBuiltInComponent({
  name: "StickyHeader",
  props: { padding: {
    type: Array,
    default: [
      0,
      0,
      0,
      0
    ]
  } },
  setup(props2, { slots, expose }) {
    const rootRef = Vue.ref(null);
    Vue.inject("__listViewIsVertical");
    const style = Vue.computed(() => {
      return {
        paddingTop: props2.padding[0] + "px",
        paddingRight: props2.padding[1] + "px",
        paddingBottom: props2.padding[2] + "px",
        paddingLeft: props2.padding[3] + "px",
        top: 0 - props2.padding[0] + "px"
      };
    });
    const status = {
      type: "StickyHeader",
      cachedSize: Vue.inject("__listViewDefaultHeaderSize"),
      cachedSizeUpdated: false
    };
    expose({ __listViewChildStatus: status });
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-sticky-header", { style: () => style.value }, Vue.extend(() => {
          const _n0 = createNodes(() => {
            var _a;
            return (_a = slots.default) == null ? void 0 : _a.call(slots);
          });
          return _n0;
        }, { _: 1 }), true);
        Vue.renderEffect(() => _setTemplateRef(_n1, rootRef));
        return _n1;
      })();
    };
  }
});
const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = Vue.getCurrentInstance()) => {
  if (Vue.isInSSRComponentSetup)
    return;
  Vue.injectHook(lifecycle, hook, target);
};
const onBackPress = /* @__PURE__ */ createLifeCycleHook(
  uniShared.ON_BACK_PRESS,
  2
  /* HookFlags.PAGE */
);
class UniPageContainerElement extends UniElement {
}
const t0$3 = Vue.template("<div uni-view class=uni-page-container-overlay>");
const t1$2 = Vue.template("<div uni-view>");
const MAX_SLIDER_DISTANCE = 100;
const MIN_SLIDER_VELOCITY = 0.3;
const _sfc_main$3 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "page-container",
    rootElement: {
      name: "uni-page-container",
      class: UniPageContainerElement
    }
  },
  __name: "index",
  props: {
    show: { type: Boolean, default: false },
    duration: { default: 300, type: Number },
    zIndex: { default: 100, type: Number },
    overlay: { type: Boolean, default: true },
    round: { type: Boolean, default: false },
    position: { default: "bottom", type: String },
    customStyle: { default: "", type: String },
    overlayStyle: { default: "", type: String },
    closeOnSlideDown: { type: Boolean, default: false }
  },
  emits: ["beforeenter", "enter", "afterenter", "beforeleave", "leave", "afterleave", "clickoverlay"],
  __multiRoot: true,
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emits = __emit;
    const showPageContainer = Vue.ref(false);
    const isAnimating = Vue.ref(false);
    const transitionTimer = Vue.ref(null);
    const isEntered = Vue.ref(false);
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isDragging = false;
    const translateValue = Vue.ref(0);
    const overlayStyleMap = Vue.computed(() => {
      const styleObj = {
        "z-index": props2.zIndex,
        "transition-duration": props2.duration + "ms"
      };
      if (isEntered.value) {
        styleObj["opacity"] = "1";
        styleObj["pointer-events"] = "auto";
      }
      return styleObj;
    });
    const innerStyleMap = Vue.computed(() => {
      const styleObj = {
        "z-index": props2.zIndex + 1,
        "transition-duration": props2.duration + "ms"
      };
      if (translateValue.value != 0 && isDragging) {
        let transformValue = "";
        switch (props2.position) {
          case "bottom":
          case "top":
            transformValue = `translateY(${translateValue.value}px)`;
            break;
          case "left":
          case "right":
            transformValue = `translateX(${translateValue.value}px)`;
            break;
        }
        if (transformValue != "") {
          styleObj["transform"] = transformValue;
          styleObj["transition"] = "none";
        }
      } else if (translateValue.value != 0 && !isDragging) {
        styleObj["transition"] = `transform ${props2.duration}ms ease`;
      }
      return styleObj;
    });
    const popupClasses = Vue.computed(() => {
      const classes = [];
      if (props2.position != null) {
        classes.push(`uni-page-container-popup-${props2.position}`);
      }
      if (props2.round) {
        classes.push("uni-page-container-popup-round");
      }
      if (isEntered.value) {
        classes.push("uni-page-container-popup-enter");
      }
      return classes;
    });
    function clearTransitionTimer() {
      if (transitionTimer.value != null) {
        clearTimeout(transitionTimer.value);
        transitionTimer.value = null;
      }
    }
    function onAnimationEnd(type) {
      isAnimating.value = false;
      clearTransitionTimer();
      if (type == "enter") {
        emits("afterenter");
      } else if (type == "leave") {
        showPageContainer.value = false;
        emits("afterleave");
      }
    }
    function listenTransitionEnd(type) {
      clearTransitionTimer();
      transitionTimer.value = setTimeout(() => {
        onAnimationEnd(type);
      }, props2.duration);
    }
    function resetDragState() {
      isDragging = false;
      translateValue.value = 0;
    }
    function openContainer() {
      emits("beforeenter");
      showPageContainer.value = true;
      isEntered.value = false;
      resetDragState();
      Vue.nextTick(() => {
        emits("enter");
        isAnimating.value = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isEntered.value = true;
            listenTransitionEnd("enter");
          });
        });
      });
    }
    function closeContainer() {
      if (isAnimating.value) {
        return;
      }
      emits("beforeleave");
      isAnimating.value = true;
      Vue.nextTick(() => {
        isEntered.value = false;
        emits("leave");
        listenTransitionEnd("leave");
      });
    }
    Vue.watch(
      () => props2.show,
      (newVal) => {
        if (newVal && !showPageContainer.value) {
          openContainer();
        } else if (!newVal && showPageContainer.value) {
          closeContainer();
        }
      }
    );
    function onClickOverlay(event) {
      if (isAnimating.value) {
        return;
      }
      emits("clickoverlay", event);
      Vue.nextTick(() => {
        closeContainer();
      });
    }
    function onTouchStart(e2) {
      if (!props2.closeOnSlideDown) {
        return;
      }
      if (e2.touches.length > 0) {
        const { clientX, clientY } = e2.touches[0];
        touchStartX = clientX;
        touchStartY = clientY;
        touchStartTime = Date.now();
        isDragging = false;
      }
    }
    function onTouchMove(e2) {
      if (!props2.closeOnSlideDown) {
        e2.preventDefault();
        e2.stopPropagation();
        return;
      }
      if (e2.touches.length > 0) {
        const { clientX, clientY } = e2.touches[0];
        const deltaX = clientX - touchStartX;
        const deltaY = clientY - touchStartY;
        let shouldDrag = false;
        let dragValue = 0;
        switch (props2.position) {
          case "bottom":
            if (deltaY > 0) {
              shouldDrag = true;
              dragValue = deltaY;
            }
            break;
          case "top":
            if (deltaY < 0) {
              shouldDrag = true;
              dragValue = deltaY;
            }
            break;
          case "left":
            if (deltaX < 0) {
              shouldDrag = true;
              dragValue = deltaX;
            }
            break;
          case "right":
            if (deltaX > 0) {
              shouldDrag = true;
              dragValue = deltaX;
            }
            break;
        }
        if (shouldDrag) {
          isDragging = true;
          translateValue.value = dragValue;
          e2.preventDefault();
          e2.stopPropagation();
        }
      }
    }
    function onTouchEnd() {
      if (!props2.closeOnSlideDown) {
        return;
      }
      if (isDragging) {
        const deltaTime = Date.now() - touchStartTime;
        const velocity = Math.abs(translateValue.value) / deltaTime;
        if (Math.abs(translateValue.value) > MAX_SLIDER_DISTANCE || velocity > MIN_SLIDER_VELOCITY) {
          resetDragState();
          closeContainer();
        } else {
          resetDragState();
        }
      }
    }
    function onTouchCancel() {
      if (!props2.closeOnSlideDown) {
        return;
      }
      if (isDragging) {
        resetDragState();
      }
    }
    onBackPress(() => {
      if (showPageContainer.value) {
        closeContainer();
        return true;
      }
      return false;
    });
    const n0 = Vue.createIf(() => __props.overlay && showPageContainer.value, () => {
      const n2 = t0$3();
      Vue.on(n2, "click", onClickOverlay);
      Vue.on(n2, "touchmove", Vue.withModifiers(() => {
      }, ["prevent", "stop"]));
      Vue.renderEffect(() => Vue.setStyle(n2, [overlayStyleMap.value, __props.overlayStyle]));
      return n2;
    });
    const n3 = Vue.createIf(() => showPageContainer.value, () => {
      const n6 = t1$2();
      Vue.renderEffect(() => {
        Vue.setClass(n6, ["uni-page-container-popup", popupClasses.value]);
        Vue.setStyle(n6, [innerStyleMap.value, __props.customStyle]);
      });
      Vue.setInsertionState(n6);
      Vue.createSlot();
      Vue.on(n6, "touchstart", onTouchStart);
      Vue.on(n6, "touchmove", onTouchMove);
      Vue.on(n6, "touchend", onTouchEnd);
      Vue.on(n6, "touchcancel", onTouchCancel);
      return n6;
    });
    return [n0, n3];
  }
});
class UniVueElement extends Object {
}
class UniLoadingElement extends UniVueElement {
}
function useLoadingStyle(targetElement, bold) {
  const loadingSize = Vue.ref("16px");
  const loadingBorderWidth = Vue.ref("1px");
  Vue.ref("8px");
  return {
    width: loadingSize,
    height: loadingSize,
    borderWidth: loadingBorderWidth
    // borderRadius: loadingBorderRadius,
  };
}
const t0$2 = Vue.template("<div uni-view>");
const _sfc_main$2 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "loading",
    styleIsolation: "app-and-page",
    // @ts-ignore
    rootElement: {
      name: "uni-loading-element",
      class: UniLoadingElement
    }
  },
  __name: "index-x",
  props: {
    paused: { type: Boolean, default: false },
    bold: { type: Boolean, default: false },
    iosSpinner: { type: Boolean, default: false }
  },
  setup(__props) {
    const props2 = __props;
    const LoadingRef = Vue.ref(null);
    const loadingStyle = Vue.reactive(useLoadingStyle(LoadingRef, Vue.computed(() => props2.bold)));
    const n1 = Vue.createPlainElement("uni-loading-element", {
      class: "default __uni_loading_container__",
      style: "display: flex;"
    }, null, true);
    const n0 = t0$2();
    Vue.insert(n0, n1);
    Vue.setStaticTemplateRef(n1, LoadingRef, null, "LoadingRef");
    Vue.renderEffect(() => {
      Vue.setClassName(n0, props2.paused ? 1 : 0, " __uni-loading__paused", "__uni-loading__ __loading-4-3__");
      Vue.setStyle(n0, loadingStyle);
    });
    return n1;
  }
});
function useSubscribe(callback, name, multiple, pageId) {
  const instance = Vue.getCurrentInstance();
  instance.proxy;
  pageId = pageId == null ? useCurrentPageId() : pageId;
}
let index$c = 0;
function useContextInfo(_id) {
  useCurrentPageId();
  const instance = Vue.getCurrentInstance();
  const vm = instance.proxy;
  const type = vm.$options.name.toLowerCase();
  const id2 = vm.id || `context${index$c++}`;
  return `${type}.${id2}`;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (shared.isFunction(hook)) {
    Vue.injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (uniShared.isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (shared.isArray(hooks)) {
        hooks.forEach(
          (hook) => injectLifecycleHook(name, hook, publicThis, instance)
        );
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
  if (mpType === "page") {
    instance.__isVisible = true;
    try {
      let query;
      query = instance.__pageQuery;
      const scriptLang = instance.type.__scriptLang;
      const isUTS = !scriptLang || scriptLang === "uts";
      if (true) {
        query = isUTS ? new uniShared.UTSJSONObject(uniShared.decodedQuery(query)) : uniShared.decodedQuery(query);
      }
      if (false)
        ;
      invokeHook(publicThis, uniShared.ON_LOAD, query);
      if (!instance.vapor) {
        delete instance.attrs.__pageQuery;
      }
      const $basePage = true ? publicThis.$basePage : publicThis.$page;
      if (true) {
        if (($basePage == null ? void 0 : $basePage.openType) !== "preloadPage") {
          if (isDialogPageInstance(getPageInstanceByChild(instance))) {
            invokeNewDialogPageHook(publicThis.$page, uniShared.ON_SHOW);
          } else {
            invokeHook(publicThis, uniShared.ON_SHOW);
          }
        }
      }
    } catch (e2) {
      console.error(e2.message + uniShared.LINEFEED + e2.stack);
    }
  }
}
function applyOptions(options, instance, publicThis) {
  initHooks(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[uniShared.ON_ERROR]) {
      {
        invokeHook(appInstance.proxy, uniShared.ON_ERROR, err);
      }
    } else {
      Vue.logError(err, info, instance == null ? void 0 : instance.$, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  uniShared.UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error(
        "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
      );
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(
        bitmap >> 16 & 255,
        bitmap >> 8 & 255,
        bitmap & 255
      );
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(
    realAtob(str).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("")
  );
}
function getCurrentUserInfo() {
  const token = uni.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = uniShared.invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    if (__UNI_FEATURE_UNI_CLOUD__) {
      uniIdMixin(globalProperties);
    }
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions;
    globalProperties.$callMethod = $callMethod;
  }
  {
    uniShared.invokeCreateVueAppHook(app);
  }
}
function initRouter(app) {
  const router2 = vueRouter.createRouter(createRouterOptions());
  setRouterInstance(router2);
  router2.beforeEach((to, from) => {
    if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
      saveTabBarScrollPosition(from.meta.tabBarIndex);
    }
  });
  app.router = router2;
  app.use(router2);
}
let positionStore = /* @__PURE__ */ Object.create(null);
function getTabBarScrollPosition(id2) {
  return positionStore[id2];
}
function saveTabBarScrollPosition(id2) {
  if (typeof window !== "undefined") {
    positionStore[id2] = {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
  }
}
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
      const position = getTabBarScrollPosition(to.meta.tabBarIndex);
      if (position) {
        return position;
      }
    }
    return {
      left: 0,
      top: 0
    };
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
function initHistory() {
  let { routerBase } = __uniConfig.router;
  if (routerBase === "/") {
    routerBase = "";
  }
  {
    return vueRouter.createMemoryHistory(routerBase);
  }
}
const index$b = {
  install(app) {
    initApp(app);
    if (!app.config.warnHandler) {
      app.config.warnHandler = warnHandler;
    }
    if (__UNI_FEATURE_PAGES__) {
      initRouter(app);
    }
  }
};
function warnHandler(msg, instance, trace) {
  if (instance) {
    const internalInstance = "$" in instance ? instance.$ : instance;
    const name = internalInstance.type.name;
    if ("PageMetaHead" === name) {
      return;
    }
    const parent = internalInstance.parent;
    if (parent && parent.type.name === "PageMeta") {
      return;
    }
  }
  const warnArgs = [`[Vue warn]: ${msg}`];
  if (trace.length) {
    warnArgs.push(`
`, trace);
  }
  console.warn(...warnArgs);
}
const _t0$6 = Vue.template('<text class="uni-video-icon uni-video-toast-icon">', false, 1);
const _t1$4 = Vue.template("<div><!><div class=uni-video-toast-draw></div>");
const _t2$1 = Vue.template('<div class=uni-video-container><video></video><div class="uni-video-bar uni-video-bar-full"><div class=uni-video-controls><div></div><div class=uni-video-current-time> </div><div class=uni-video-progress-container><div><div class=uni-video-progress-buffered></div><div class=uni-video-progress-played></div><div><div class=uni-video-inner></div></div></div></div><div class=uni-video-duration> </div></div><div></div><div></div></div><div style="z-index: 0;" class=uni-video-danmu></div> <div class=uni-video-loading></div><div><div class=uni-video-toast-title><span class=uni-video-toast-title-current-time> </span> </div></div><div class=uni-video-slots> ');
const _t3$1 = Vue.template('<div class=uni-video-cover><div class="uni-video-cover-play-button uni-video-icon"></div>', 1);
const _t4$1 = Vue.template('<text class="uni-video-icon uni-video-toast-icon">', 1, 1);
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
function useGesture(props2, videoState, videoRef, fullscreenState) {
  const state = Vue.reactive({
    seeking: false,
    gestureType: "none",
    volumeOld: 0,
    volumeNew: 0,
    currentTimeOld: 0,
    currentTimeNew: 0,
    toastThin: false
  });
  const touchStartOrigin = {
    x: 0,
    y: 0
  };
  let changeToastThinTimer = null;
  const changeToastThin = () => {
    if (state.gestureType !== "none" && changeToastThinTimer != null)
      return;
    changeToastThinTimer = setTimeout(() => {
      state.toastThin = true;
    }, 500);
  };
  let showToastTimer = void 0;
  function changeShowToast() {
    if (showToastTimer != void 0)
      return;
    showToastTimer = setTimeout(() => {
      state.toastThin = false;
      showToastTimer = void 0;
    }, 1e3);
  }
  function clearChangeShowToast() {
    clearTimeout(showToastTimer);
    showToastTimer = void 0;
  }
  function onTouchstart(event) {
    const toucher = event.targetTouches[0];
    touchStartOrigin.x = toucher.pageX;
    touchStartOrigin.y = toucher.pageY;
    state.gestureType = "none";
    state.volumeOld = 0;
    if (fullscreenState.fullscreen) {
      event.stopPropagation();
    }
  }
  function onTouchmove(event) {
    function stop() {
      if (fullscreenState.fullscreen) {
        event.stopPropagation();
      }
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
      state.seeking = true;
    } else if (gestureType === "volume") {
      changeVolume(pageY - origin.y);
    }
    if (gestureType !== "none") {
      stop();
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
      if (!props2.pageGesture && !props2.vslideGesture) {
        state.gestureType = "stop";
        return;
      }
      changeToastThin();
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
      if (fullscreenState.fullscreen) {
        event.stopPropagation();
      }
      event.preventDefault();
    }
    if (state.gestureType === "progress" && state.currentTimeOld !== state.currentTimeNew) {
      video.currentTime = state.currentTimeNew;
    }
    state.gestureType = "none";
  }
  function changeProgress(x) {
    const duration = videoState.currentDuration;
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
      clearChangeShowToast();
      changeShowToast();
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
  const state = Vue.reactive({ fullscreen: false });
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
  const videoRef = Vue.ref(null);
  const src = Vue.computed(() => getRealPath(props2.src));
  const muted = Vue.computed(() => props2.muted === "true" || props2.muted === true);
  const state = Vue.reactive({
    start: false,
    src,
    playing: false,
    currentTime: 0,
    duration: 0,
    currentDuration: 0,
    progress: 0,
    buffered: 0,
    muted,
    pauseUpdatingCurrentTime: false
  });
  Vue.watch(() => src.value, () => {
    state.playing = false;
    state.currentTime = 0;
  });
  Vue.watch(() => state.buffered, (buffered) => {
    trigger("progress", {}, { buffered });
  });
  Vue.watch(() => muted.value, (muted2) => {
    const video = videoRef.value;
    video.muted = muted2;
  });
  Vue.watch([() => state.duration, () => props2.duration], () => {
    let _duration = Number(props2.duration);
    isNaN(_duration) && (_duration = 0);
    state.currentDuration = _duration > 0 ? _duration : state.duration;
  });
  function onDurationChange({ target }) {
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
    if (!state.pauseUpdatingCurrentTime) {
      state.currentTime = video.currentTime;
    }
    const currentTime = video.currentTime;
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
  function stop() {
    seek(0);
    pause();
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
    stop,
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
function useControls(props2, videoState, seek, seeking) {
  const progressRef = Vue.ref(null);
  const ballRef = Vue.ref(null);
  const centerPlayBtnShow = Vue.computed(() => props2.showCenterPlayBtn && !videoState.start);
  const controlsVisible = Vue.ref(true);
  const controlsShow = Vue.computed(() => !centerPlayBtnShow.value && props2.controls && controlsVisible.value);
  const state = Vue.reactive({
    seeking: false,
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
      seek(videoState.currentDuration * progress);
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
  Vue.watch(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
    if (val) {
      autoHideStart();
    } else {
      autoHideEnd();
    }
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
  const danmuRef = Vue.ref(null);
  const state = Vue.reactive({ enable: Boolean(props2.enableDanmu) });
  let danmuIndex = {
    time: 0,
    index: -1
  };
  const danmuList = shared.isArray(props2.danmuList) ? JSON.parse(JSON.stringify(props2.danmuList)) : [];
  danmuList.sort(function(a, b) {
    return (a.time || 0) - (b.time || 0);
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
    let style = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`;
    p2.setAttribute("style", style);
    const danmuEl = danmuRef.value;
    danmuEl.appendChild(p2);
    setTimeout(function() {
      style += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);";
      p2.setAttribute("style", style);
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
function useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen) {
  useContextInfo();
  useSubscribe();
}
function useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart) {
  const progressing = Vue.computed(() => gestureState.gestureType === "progress" || controlsState.touching);
  Vue.watch(progressing, (val) => {
    videoState.pauseUpdatingCurrentTime = val;
    controlsState.controlsTouching = val;
    if (gestureState.gestureType === "progress" && val) {
      controlsState.controlsVisible = val;
    }
  });
  Vue.watch([() => videoState.currentTime, () => videoState.currentDuration], () => {
    if (videoState.currentDuration > 0) {
      videoState.progress = videoState.currentTime / videoState.currentDuration * 100;
    } else {
      videoState.progress = 0;
    }
    videoState.progress > 100 && (videoState.progress = 100);
  }, { immediate: true });
  Vue.watch(() => gestureState.currentTimeNew, (currentTimeNew) => {
    videoState.currentTime = currentTimeNew;
  });
  return progressing;
}
const props$9 = {
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
  vslideGesture: {
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
const index$a = /* @__PURE__ */ defineBuiltInComponent({
  name: "Video",
  props: props$9,
  emits: [
    "fullscreenchange",
    "progress",
    "loadedmetadata",
    "waiting",
    "error",
    "play",
    "pause",
    "ended",
    "timeupdate"
  ],
  setup(props2, { emit: emit2, attrs: attrs2, slots }) {
    const rootRef = Vue.ref(null);
    const containerRef = Vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const { state: userActionState } = useUserAction();
    const { $attrs: videoAttrs } = useAttrs({ excludeListeners: true });
    initI18nVideoMsgsOnce();
    const { videoRef, state: videoState, play, pause, stop, seek, playbackRate, toggle, onDurationChange, onLoadedMetadata, onProgress, onWaiting, onVideoError, onPlay, onPause, onEnded, onTimeUpdate } = useVideo(props2, attrs2, trigger);
    const { state: danmuState, danmuRef, updateDanmu, toggleDanmu, sendDanmu } = useDanmu(props2, videoState);
    const { state: fullscreenState, onFullscreenChange, emitFullscreenChange, toggleFullscreen, requestFullScreen, exitFullScreen } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef);
    const { state: gestureState, onTouchstart, onTouchend, onTouchmove } = useGesture(props2, videoState, videoRef, fullscreenState);
    const { state: controlsState, progressRef, ballRef, clickProgress, toggleControls, autoHideEnd, autoHideStart } = useControls(props2, videoState, seek);
    useContext();
    const progressing = useProgressing(videoState, gestureState, controlsState);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n32 = Vue.createPlainElement("uni-video", {
          id: () => props2.id,
          onClick: () => toggleControls
        }, () => {
          const _n0 = _t2$1();
          const _n1 = Vue.child(_n0);
          const _n2 = Vue.next(_n1);
          let _p0 = Vue.child(_n2);
          const _n3 = Vue.child(_p0);
          const _n4 = Vue.next(_n3);
          const _n5 = Vue.next(_n4);
          const _n9 = Vue.child(_n5);
          const _n6 = Vue.child(_n9);
          const _n7 = Vue.next(_n6);
          const _n8 = Vue.next(_n7);
          const _n10 = Vue.next(_n5);
          const _n11 = Vue.next(_p0);
          const _n12 = Vue.next(_n11);
          const _n13 = Vue.next(_n2);
          const _n14 = Vue.next(_n13, true);
          const _n27 = Vue.next(_n14);
          const _n30 = Vue.next(_n27);
          const _n28 = Vue.child(Vue.child(_n30));
          const _n29 = Vue.next(_n28, true);
          const _n31 = Vue.next(_n30);
          Vue.on(_n0, "touchstart", onTouchstart);
          Vue.on(_n0, "touchend", onTouchend);
          Vue.on(_n0, "touchmove", onTouchmove);
          Vue.on(
            _n0,
            // @ts-expect-error
            "fullscreenchange",
            Vue.withModifiers(onFullscreenChange, ["stop"])
          );
          Vue.on(_n0, "webkitfullscreenchange", Vue.withModifiers(($event) => onFullscreenChange($event, true), ["stop"]));
          Vue.on(_n1, "durationchange", onDurationChange);
          Vue.on(_n1, "loadedmetadata", onLoadedMetadata);
          Vue.on(_n1, "progress", onProgress);
          Vue.on(_n1, "waiting", onWaiting);
          Vue.on(_n1, "error", onVideoError);
          Vue.on(_n1, "play", onPlay);
          Vue.on(_n1, "pause", onPause);
          Vue.on(_n1, "ended", onEnded);
          Vue.on(_n1, "timeupdate", (event) => {
            onTimeUpdate(event);
            updateDanmu(event);
          });
          Vue.on(_n1, "webkitbeginfullscreen", () => emitFullscreenChange(true));
          Vue.on(_n1, "x5videoenterfullscreen", () => emitFullscreenChange(true));
          Vue.on(_n1, "webkitendfullscreen", () => emitFullscreenChange(false));
          Vue.on(_n1, "x5videoexitfullscreen", () => emitFullscreenChange(false));
          Vue.applyVShow(_n2, () => controlsState.controlsShow);
          Vue.on(_n2, "click", Vue.withModifiers(() => {
          }, ["stop"]));
          Vue.applyVShow(_n3, () => props2.showPlayBtn);
          Vue.on(_n3, "click", Vue.withModifiers(toggle, ["stop"]));
          Vue.applyVShow(_n4, () => props2.showProgress);
          const _x4 = Vue.txt(_n4);
          setNodes(_x4, () => formatTime(videoState.currentTime));
          Vue.on(_n5, "click", Vue.withModifiers(clickProgress, ["stop"]));
          Vue.applyVShow(_n5, () => props2.showProgress);
          Vue.applyVShow(_n10, () => props2.showProgress);
          const _x10 = Vue.txt(_n10);
          setNodes(_x10, () => formatTime(videoState.currentDuration));
          Vue.applyVShow(_n11, () => props2.danmuBtn);
          Vue.on(_n11, "click", Vue.withModifiers(toggleDanmu, ["stop"]));
          Vue.applyVShow(_n12, () => props2.showFullscreenBtn);
          Vue.on(_n12, "click", Vue.withModifiers(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"]));
          Vue.applyVShow(_n13, () => videoState.start && danmuState.enable);
          setNodes(_n14, () => controlsState.centerPlayBtnShow && (() => {
            const _n02 = _t3$1();
            const _n16 = Vue.child(_n02);
            Vue.on(_n02, "click", Vue.withModifiers(() => {
            }, ["stop"]));
            Vue.on(_n16, "click", Vue.withModifiers(play, ["stop"]));
            return _n02;
          })());
          Vue.renderEffect(() => {
            Vue.setDynamicProps(_n1, [
              {
                style: { "object-fit": props2.objectFit },
                muted: !!props2.muted,
                loop: !!props2.loop,
                src: videoState.src,
                poster: props2.poster,
                autoplay: !!props2.autoplay
              },
              videoAttrs.value,
              {
                class: {
                  "uni-video-video": true,
                  "uni-video-video-fullscreen": fullscreenState.fullscreen
                },
                "webkit-playsinline": true,
                playsinline: true
              }
            ]);
            _setTemplateRef(_n1, videoRef);
            Vue.setClassName(_n3, 1 | 2 | (!videoState.playing ? 4 : 0) | (videoState.playing ? 8 : 0), [
              " uni-video-icon",
              " uni-video-control-button",
              " uni-video-control-button-play",
              " uni-video-control-button-pause"
            ]);
            Vue.setClassName(_n9, 1 | (progressing.value ? 2 : 0), [" uni-video-progress", " uni-video-progress-progressing"]);
            Vue.setStyle(_n6, {
              width: videoState.buffered - videoState.progress + "%",
              left: videoState.progress + "%"
            });
            Vue.setStyle(_n7, { width: videoState.progress + "%" });
            Vue.setStyle(_n8, { left: videoState.progress + "%" });
            Vue.setClassName(_n8, 1 | (progressing.value ? 2 : 0), [" uni-video-ball", " uni-video-ball-progressing"]);
            _setTemplateRef(_n8, ballRef);
            _setTemplateRef(_n5, progressRef);
            Vue.setClassName(_n11, 1 | 2 | (danmuState.enable ? 4 : 0), [
              " uni-video-icon",
              " uni-video-danmu-button",
              " uni-video-danmu-button-active"
            ]);
            Vue.setClassName(_n12, 1 | 2 | (fullscreenState.fullscreen ? 4 : 0), [
              " uni-video-icon",
              " uni-video-fullscreen",
              " uni-video-type-fullscreen"
            ]);
            _setTemplateRef(_n13, danmuRef);
          });
          Vue.setInsertionState(_n27);
          Vue.createIf(() => gestureState.gestureType === "volume", () => {
            const _n24 = _t1$4();
            const _n23 = Vue.child(_n24);
            const _n22 = Vue.next(_n23);
            Vue.renderEffect(() => Vue.setClassName(_n24, 1 | (gestureState.toastThin ? 2 : 0), [" uni-video-toast-container", " uni-video-toast-container-thin"]));
            Vue.setInsertionState(_n24, _n23);
            Vue.createIf(() => !gestureState.toastThin && gestureState.volumeNew > 0 && gestureState.gestureType === "volume", () => {
              const _n19 = _t0$6();
              return _n19;
            }, () => {
              const _n21 = createNodes(() => !gestureState.toastThin && (() => {
                const _n02 = _t4$1();
                return _n02;
              })());
              return _n21;
            }, 265);
            Vue.setStyle(_n24, { marginTop: `5px` });
            Vue.renderEffect(() => Vue.setStyle(_n22, { width: `${gestureState.volumeNew * 100}%` }));
            return _n24;
          }, () => {
            const _n26 = createNodes(null);
            return _n26;
          }, 521);
          const _x28 = Vue.txt(_n28);
          setNodes(_x28, () => formatTime(gestureState.currentTimeNew));
          setNodes(_n29, " / ", () => formatTime(videoState.currentDuration));
          const _x31 = Vue.txt(_n31);
          setNodes(_x31, () => slots.default && slots.default());
          Vue.renderEffect(() => {
            Vue.setClassName(_n30, 1 | (progressing.value ? 2 : 0), [" uni-video-toast", " uni-video-toast-progress"]);
            _setTemplateRef(_n0, containerRef);
          });
          return _n0;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n32, rootRef));
        return _n32;
      })();
    };
  }
});
const onWebInvokeAppService = ({ name, arg }) => {
  if (name === "postMessage")
    ;
  else {
    switch (name) {
      case "navigateTo":
        uni.navigateTo(arg);
        break;
      case "navigateBack":
        uni.navigateBack(arg);
        break;
      case "switchTab":
        uni.switchTab(arg);
        break;
      case "reLaunch":
        uni.reLaunch(arg);
        break;
      case "redirectTo":
        uni.redirectTo(arg);
        break;
    }
  }
};
const Invoke = /* @__PURE__ */ uniShared.once(() => UniServiceJSBridge.on(uniShared.ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
const props$8 = { src: {
  type: String,
  default: ""
} };
const indexX = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "WebView",
  props: props$8,
  emits: ["load"],
  setup(props2, { emit: emit2 }) {
    Invoke();
    const rootRef = Vue.ref(null);
    Vue.ref(null);
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n0 = Vue.createPlainElement("uni-web-view", {
          class: "uni-webview",
          $: [() => $listeners.value, () => $excludeAttrs.value]
        }, null, true);
        Vue.renderEffect(() => _setTemplateRef(_n0, rootRef));
        return _n0;
      })();
    };
  }
});
const ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
var MapType = /* @__PURE__ */ ((MapType2) => {
  MapType2["QQ"] = "qq";
  MapType2["GOOGLE"] = "google";
  MapType2["AMAP"] = "AMap";
  MapType2["BMAP"] = "BMapGL";
  MapType2["UNKNOWN"] = "";
  return MapType2;
})(MapType || {});
function getMapInfo() {
  if (__uniConfig.bMapKey) {
    return {
      type: "BMapGL",
      key: __uniConfig.bMapKey
    };
  }
  if (__uniConfig.qqMapKey) {
    return {
      type: "qq",
      key: __uniConfig.qqMapKey
    };
  }
  if (__uniConfig.googleMapKey) {
    return {
      type: "google",
      key: __uniConfig.googleMapKey
    };
  }
  if (__uniConfig.aMapKey) {
    return {
      type: "AMap",
      key: __uniConfig.aMapKey,
      securityJsCode: __uniConfig.aMapSecurityJsCode,
      serviceHost: __uniConfig.aMapServiceHost
    };
  }
  return {
    type: "",
    key: ""
  };
}
let IS_AMAP = false;
let hasGetIsAMap = false;
const getIsAMap = () => {
  if (hasGetIsAMap) {
    return IS_AMAP;
  } else {
    hasGetIsAMap = true;
    return IS_AMAP = getMapInfo().type === "AMap";
  }
};
const getIsBMap = () => {
  return getMapInfo().type === "BMapGL";
};
const props$7 = {
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
function useMarkerLabelStyle(id2) {
  const className = "uni-map-marker-label-" + id2;
  const styleEl = document.createElement("style");
  styleEl.id = className;
  document.head.appendChild(styleEl);
  return function updateMarkerLabelStyle(style) {
    const newStyle = Object.assign({}, style, {
      position: "absolute",
      top: "70px",
      borderStyle: "solid"
    });
    const div = document.createElement("div");
    Object.keys(newStyle).forEach((key) => {
      div.style[key] = newStyle[key] || "";
    });
    styleEl.innerText = `.${className}{${div.getAttribute("style")}}`;
    return className;
  };
}
const MapMarker = /* @__PURE__ */ defineSystemComponent({
  name: "MapMarker",
  props: props$7,
  setup(props2) {
    const id2 = String(!isNaN(Number(props2.id)) ? props2.id : "");
    const onMapReady = Vue.inject("onMapReady");
    const updateMarkerLabelStyle = useMarkerLabelStyle(id2);
    let marker;
    function removeMarkerCallout(callout) {
      if (getIsAMap()) {
        callout.removeAMapText();
      } else {
        callout.setMap(null);
      }
    }
    onMapReady((map, maps, trigger) => {
      function updateMarker(option) {
        const title = option.title;
        let position;
        if (getIsAMap()) {
          position = new maps.LngLat(option.longitude, option.latitude);
        } else if (getIsBMap()) {
          position = new maps.Point(option.longitude, option.latitude);
        } else {
          position = new maps.LatLng(option.latitude, option.longitude);
        }
        const img = new Image();
        let imgHeight = 0;
        img.onload = () => {
          const anchor = option.anchor || {};
          let icon;
          let w;
          let h;
          let top;
          let x = typeof anchor.x === "number" ? anchor.x : 0.5;
          let y = typeof anchor.y === "number" ? anchor.y : 1;
          if (option.iconPath && (option.width || option.height)) {
            w = option.width || img.width / img.height * option.height;
            h = option.height || img.height / img.width * option.width;
          } else {
            w = img.width / 2;
            h = img.height / 2;
          }
          imgHeight = h;
          top = h - (h - y * h);
          if ("MarkerImage" in maps) {
            icon = new maps.MarkerImage(img.src, null, null, new maps.Point(x * w, y * h), new maps.Size(w, h));
          } else if ("Icon" in maps) {
            icon = new maps.Icon({
              image: img.src,
              size: new maps.Size(w, h),
              imageSize: new maps.Size(w, h),
              imageOffset: new maps.Pixel(x * w, y * h)
            });
          } else {
            icon = {
              url: img.src,
              anchor: new maps.Point(x, y),
              size: new maps.Size(w, h)
            };
          }
          if (getIsBMap()) {
            marker = new maps.Marker(new maps.Point(position.lng, position.lat));
            map.addOverlay(marker);
          } else {
            marker.setPosition(position);
            marker.setIcon(icon);
          }
          if ("setRotation" in marker) {
            marker.setRotation(option.rotate || 0);
          }
          const labelOpt = option.label || {};
          if ("label" in marker) {
            marker.label.setMap(null);
            delete marker.label;
          }
          let label;
          if (labelOpt.content) {
            const labelStyle = {
              borderColor: labelOpt.borderColor,
              borderWidth: (Number(labelOpt.borderWidth) || 0) + "px",
              padding: (Number(labelOpt.padding) || 0) + "px",
              borderRadius: (Number(labelOpt.borderRadius) || 0) + "px",
              backgroundColor: labelOpt.bgColor,
              color: labelOpt.color,
              fontSize: (labelOpt.fontSize || 14) + "px",
              lineHeight: (labelOpt.fontSize || 14) + "px",
              marginLeft: (Number(labelOpt.anchorX || labelOpt.x) || 0) + "px",
              marginTop: (Number(labelOpt.anchorY || labelOpt.y) || 0) + "px"
            };
            if ("Label" in maps) {
              label = new maps.Label({
                position,
                map,
                clickable: false,
                content: labelOpt.content,
                style: labelStyle
              });
              marker.label = label;
            } else if ("setLabel" in marker) {
              if (getIsAMap()) {
                const content = `<div style="
                  margin-left:${labelStyle.marginLeft};
                  margin-top:${labelStyle.marginTop};
                  padding:${labelStyle.padding};
                  background-color:${labelStyle.backgroundColor};
                  border-radius:${labelStyle.borderRadius};
                  line-height:${labelStyle.lineHeight};
                  color:${labelStyle.color};
                  font-size:${labelStyle.fontSize};

                  ">
                  ${labelOpt.content}
                <div>`;
                marker.setLabel({
                  content,
                  direction: "bottom-right"
                });
              } else {
                const className = updateMarkerLabelStyle(labelStyle);
                marker.setLabel({
                  text: labelOpt.content,
                  color: labelStyle.color,
                  fontSize: labelStyle.fontSize,
                  className
                });
              }
            }
          }
          const calloutOpt = option.callout || {};
          let callout = marker.callout;
          let calloutStyle;
          if (calloutOpt.content || title) {
            if (getIsAMap() && calloutOpt.content) {
              calloutOpt.content = calloutOpt.content.replaceAll("\n", "<br/>");
            }
            const boxShadow = "0px 0px 3px 1px rgba(0,0,0,0.5)";
            let offsetY = -imgHeight / 2;
            if (option.width || option.height) {
              offsetY += 14 - imgHeight / 2;
            }
            calloutStyle = calloutOpt.content ? {
              position,
              map,
              top,
              // handle AMap callout offset
              offsetY,
              content: calloutOpt.content,
              color: calloutOpt.color,
              fontSize: calloutOpt.fontSize,
              borderRadius: calloutOpt.borderRadius,
              bgColor: calloutOpt.bgColor,
              padding: calloutOpt.padding,
              boxShadow: calloutOpt.boxShadow || boxShadow,
              display: calloutOpt.display
            } : {
              position,
              map,
              top,
              // handle AMap callout offset
              offsetY,
              content: title,
              boxShadow
            };
            if (callout) {
              callout.setOption(calloutStyle);
            } else {
              if (getIsAMap()) {
                const callback = () => {
                  if (id2 !== "") {
                    trigger("callouttap", {}, { markerId: Number(id2) });
                  }
                };
                callout = marker.callout = new maps.Callout(calloutStyle, callback);
              } else {
                callout = marker.callout = new maps.Callout(calloutStyle);
                callout.div.onclick = function($event) {
                  if (id2 !== "") {
                    trigger("callouttap", $event, { markerId: Number(id2) });
                  }
                  $event.stopPropagation();
                  $event.preventDefault();
                };
                if (getMapInfo().type === MapType.GOOGLE) {
                  callout.div.ontouchstart = function($event) {
                    $event.stopPropagation();
                  };
                  callout.div.onpointerdown = function($event) {
                    $event.stopPropagation();
                  };
                }
              }
            }
          } else {
            if (callout) {
              removeMarkerCallout(callout);
              delete marker.callout;
            }
          }
        };
        if (option.iconPath) {
          img.src = getRealPath(option.iconPath);
        } else {
          console.error("Marker.iconPath is required.");
        }
      }
      function addMarker(props3) {
        if (!getIsBMap()) {
          marker = new maps.Marker({
            map,
            flat: true,
            autoRotation: false
          });
        }
        updateMarker(props3);
        const MapsEvent = maps.event || maps.Event;
        if (getIsBMap())
          ;
        else {
          MapsEvent.addListener(marker, "click", () => {
            const callout = marker.callout;
            if (callout && !callout.alwaysVisible) {
              if (getIsAMap()) {
                callout.visible = !callout.visible;
                if (callout.visible) {
                  marker.callout.createAMapText();
                } else {
                  marker.callout.removeAMapText();
                }
              } else {
                callout.set("visible", !callout.visible);
                if (callout.visible) {
                  const div = callout.div;
                  const parent = div.parentNode;
                  parent.removeChild(div);
                  parent.appendChild(div);
                }
              }
            }
            if (id2) {
              trigger("markertap", {}, {
                markerId: Number(id2),
                latitude: props3.latitude,
                longitude: props3.longitude
              });
            }
          });
        }
      }
      addMarker(props2);
      Vue.watch(props2, updateMarker);
    });
    if (id2) {
      const addMapChidlContext = Vue.inject("addMapChidlContext");
      Vue.inject("removeMapChidlContext");
      const context = {
        id: id2,
        translate(data) {
          onMapReady((map, maps, trigger) => {
            const destination = data.destination;
            const duration = data.duration;
            const autoRotate = !!data.autoRotate;
            let rotate = Number(data.rotate) || 0;
            let rotation = 0;
            if ("getRotation" in marker) {
              rotation = marker.getRotation();
            }
            const a = marker.getPosition();
            const b = new maps.LatLng(destination.latitude, destination.longitude);
            const distance = maps.geometry.spherical.computeDistanceBetween(a, b) / 1e3;
            const time = (typeof duration === "number" ? duration : 1e3) / (1e3 * 60 * 60);
            const speed = distance / time;
            const MapsEvent = maps.event || maps.Event;
            const movingEvent = MapsEvent.addListener(marker, "moving", (e2) => {
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
            const event = MapsEvent.addListener(marker, "moveend", () => {
              event.remove();
              movingEvent.remove();
              marker.lastPosition = a;
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
              if (shared.isFunction(cb)) {
                cb();
              }
            });
            let lastRtate = 0;
            if (autoRotate) {
              if (marker.lastPosition) {
                lastRtate = maps.geometry.spherical.computeHeading(marker.lastPosition, a);
              }
              rotate = maps.geometry.spherical.computeHeading(a, b) - lastRtate;
            }
            if ("setRotation" in marker) {
              marker.setRotation(rotation + rotate);
            }
            if ("moveTo" in marker) {
              marker.moveTo(b, speed);
            } else {
              marker.setPosition(b);
              MapsEvent.trigger(marker, "moveend", {});
            }
          });
        }
      };
      addMapChidlContext(context);
    }
    return () => {
      return null;
    };
  }
});
const props$6 = {
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
const MapPolyline = /* @__PURE__ */ defineSystemComponent({
  name: "MapPolyline",
  props: props$6,
  setup(props2) {
    const onMapReady = Vue.inject("onMapReady");
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
    onMapReady((map, maps) => {
      function updatePolyline(option) {
        removePolyline();
        addPolyline(option);
      }
      function addPolyline(option) {
        const path = [];
        option.points.forEach((point) => {
          let pointPosition;
          if (getIsAMap()) {
            pointPosition = [point.longitude, point.latitude];
          } else if (getIsBMap()) {
            pointPosition = new maps.Point(point.longitude, point.latitude);
          } else {
            pointPosition = new maps.LatLng(point.latitude, point.longitude);
          }
          path.push(pointPosition);
        });
        const strokeWeight = Number(option.width) || 1;
        const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
        const { r: br, g: bg, b: bb, a: ba } = hexToRgba(option.borderColor);
        const polylineOptions = {
          map,
          clickable: false,
          path,
          strokeWeight,
          strokeColor: option.color || void 0,
          strokeDashStyle: option.dottedLine ? "dash" : "solid"
        };
        const borderWidth = Number(option.borderWidth) || 0;
        const polylineBorderOptions = {
          map,
          clickable: false,
          path,
          strokeWeight: strokeWeight + borderWidth * 2,
          strokeColor: option.borderColor || void 0,
          strokeDashStyle: option.dottedLine ? "dash" : "solid"
        };
        if ("Color" in maps) {
          polylineOptions.strokeColor = new maps.Color(sr, sg, sb, sa);
          polylineBorderOptions.strokeColor = new maps.Color(br, bg, bb, ba);
        } else {
          polylineOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
          polylineOptions.strokeOpacity = sa;
          polylineBorderOptions.strokeColor = `rgb(${br}, ${bg}, ${bb})`;
          polylineBorderOptions.strokeOpacity = ba;
        }
        if (borderWidth) {
          polylineBorder = new maps.Polyline(polylineBorderOptions);
        }
        if (getIsBMap()) {
          polyline = new maps.Polyline(polylineOptions.path, polylineOptions);
          map.addOverlay(polyline);
        } else {
          polyline = new maps.Polyline(polylineOptions);
        }
      }
      addPolyline(props2);
      Vue.watch(props2, updatePolyline);
    });
    return () => {
      return null;
    };
  }
});
const props$5 = {
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
    default: "#000000"
  },
  fillColor: {
    type: String,
    default: "#00000000"
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
const MapCircle = /* @__PURE__ */ defineSystemComponent({
  name: "MapCircle",
  props: props$5,
  setup(props2) {
    const onMapReady = Vue.inject("onMapReady");
    let circle;
    function removeCircle() {
      if (circle) {
        circle.setMap(null);
      }
    }
    onMapReady((map, maps) => {
      function updateCircle(option) {
        removeCircle();
        addCircle(option);
      }
      function addCircle(option) {
        const center = getIsAMap() || getIsBMap() ? [option.longitude, option.latitude] : new maps.LatLng(option.latitude, option.longitude);
        const circleOptions = {
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          strokeDashStyle: "solid"
        };
        if (getIsBMap()) {
          circleOptions.strokeColor = option.color;
          circleOptions.fillColor = option.fillColor || "#000";
          circleOptions.fillOpacity = 1;
        } else {
          const { r: fr, g: fg, b: fb, a: fa } = hexToRgba(option.fillColor);
          const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
          if ("Color" in maps) {
            circleOptions.fillColor = new maps.Color(fr, fg, fb, fa);
            circleOptions.strokeColor = new maps.Color(sr, sg, sb, sa);
          } else {
            circleOptions.fillColor = `rgb(${fr}, ${fg}, ${fb})`;
            circleOptions.fillOpacity = fa;
            circleOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
            circleOptions.strokeOpacity = sa;
          }
        }
        if (getIsBMap()) {
          let pt = new maps.Point(
            // @ts-expect-error
            circleOptions.center[0],
            // @ts-expect-error
            circleOptions.center[1]
          );
          circle = new maps.Circle(pt, circleOptions.radius, circleOptions);
          map.addOverlay(circle);
        } else {
          circle = new maps.Circle(circleOptions);
          if (getIsAMap()) {
            map.add(circle);
          }
        }
      }
      addCircle(props2);
      Vue.watch(props2, updateCircle);
    });
    return () => {
      return null;
    };
  }
});
const _t0$5 = Vue.template("<div class=uni-map-control><img class=uni-map-control-icon>", 1);
const props$4 = {
  id: {
    type: [Number, String],
    default: ""
  },
  position: {
    type: Object,
    required: true
  },
  iconPath: {
    type: String,
    required: true
  },
  clickable: {
    type: [Boolean, String],
    default: ""
  },
  trigger: {
    type: Function,
    required: true
  }
};
const MapControl = /* @__PURE__ */ defineSystemComponent({
  name: "MapControl",
  props: props$4,
  setup(props2) {
    const imgPath = Vue.computed(() => getRealPath(props2.iconPath));
    const positionStyle = Vue.computed(() => {
      let positionStyle2 = `top:${props2.position.top || 0}px;left:${props2.position.left || 0}px;`;
      if (props2.position.width) {
        positionStyle2 += `width:${props2.position.width}px;`;
      }
      if (props2.position.height) {
        positionStyle2 += `height:${props2.position.height}px;`;
      }
      return positionStyle2;
    });
    const handleClick = ($event) => {
      if (props2.clickable) {
        props2.trigger("controltap", $event, { controlId: props2.id });
      }
    };
    return () => {
      return (() => {
        const _n1 = _t0$5();
        const _n0 = Vue.child(_n1);
        Vue.on(_n0, "click", handleClick);
        Vue.renderEffect(() => {
          Vue.setProp(_n0, "src", imgPath.value);
          Vue.setStyle(_n0, positionStyle.value);
        });
        return _n1;
      })();
    };
  }
});
const CONTEXT_ID = "MAP_LOCATION";
const MapLocation = /* @__PURE__ */ defineSystemComponent({
  name: "MapLocation",
  setup() {
    const state = Vue.reactive({
      latitude: 0,
      longitude: 0,
      rotate: 0
    });
    return () => {
      return state.latitude ? (() => {
        const _n0 = createComponent(MapMarker, {
          anchor: {
            x: 0.5,
            y: 0.5
          },
          width: "44",
          height: "44",
          iconPath: () => ICON_PATH_ORIGIN,
          $: [() => state]
        }, null, true);
        return _n0;
      })() : null;
    };
  }
});
const props$3 = {
  // 边框虚线，腾讯地图支持，google 高德 地图不支持，默认值为[0, 0] 为实线，非 [0, 0] 为虚线，H5 端无法像微信小程序一样控制虚线的间隔像素大小
  dashArray: {
    type: Array,
    default: () => [0, 0]
  },
  // 经纬度数组，[{latitude: 0, longitude: 0}]
  points: {
    type: Array,
    required: true
  },
  // 描边的宽度
  strokeWidth: {
    type: Number,
    default: 1
  },
  // 描边的颜色，十六进制
  strokeColor: {
    type: String,
    default: "#000000"
  },
  // 填充颜色，十六进制
  fillColor: {
    type: String,
    default: "#00000000"
  },
  // 设置多边形 Z 轴数值
  zIndex: {
    type: Number,
    default: 0
  }
};
const MapPolygon = /* @__PURE__ */ defineSystemComponent({
  name: "MapPolygon",
  props: props$3,
  setup(props2) {
    let polygonIns;
    const onMapReady = Vue.inject("onMapReady");
    onMapReady((map, maps, trigger) => {
      function drawPolygon() {
        const { points, strokeWidth, strokeColor, dashArray, fillColor, zIndex } = props2;
        const path = points.map((item) => {
          const { latitude, longitude } = item;
          if (getIsAMap()) {
            return [longitude, latitude];
          } else if (getIsBMap()) {
            return new maps.Point(longitude, latitude);
          } else {
            return new maps.LatLng(latitude, longitude);
          }
        });
        const { r: fcR, g: fcG, b: fcB, a: fcA } = hexToRgba(fillColor);
        const { r: scR, g: scG, b: scB, a: scA } = hexToRgba(strokeColor);
        const polygonOptions = {
          //多边形是否可点击。
          clickable: true,
          //鼠标在多边形内的光标样式。
          cursor: "crosshair",
          //多边形是否可编辑。
          editable: false,
          // 地图实例，即要显示多边形的地图
          // @ts-expect-error
          map,
          // 区域填充色
          fillColor: "",
          //多边形的路径，以经纬度坐标数组构成。
          path,
          // 区域边框
          strokeColor: "",
          //多边形的边框样式。实线是solid，虚线是dash。
          strokeDashStyle: dashArray.some((item) => item > 0) ? "dash" : "solid",
          //多边形的边框线宽。
          strokeWeight: strokeWidth,
          //多边形是否可见。
          visible: true,
          //多边形的zIndex值。
          zIndex
        };
        if (maps.Color) {
          polygonOptions.fillColor = new maps.Color(fcR, fcG, fcB, fcA);
          polygonOptions.strokeColor = new maps.Color(scR, scG, scB, scA);
        } else {
          polygonOptions.fillColor = `rgb(${fcR}, ${fcG}, ${fcB})`;
          polygonOptions.fillOpacity = fcA;
          polygonOptions.strokeColor = `rgb(${scR}, ${scG}, ${scB})`;
          polygonOptions.strokeOpacity = scA;
        }
        if (polygonIns) {
          polygonIns.setOptions(polygonOptions);
          return;
        }
        if (getIsBMap()) {
          polygonIns = new maps.Polygon(polygonOptions.path, polygonOptions);
          map.addOverlay(polygonIns);
        } else {
          polygonIns = new maps.Polygon(polygonOptions);
        }
      }
      drawPolygon();
      Vue.watch(props2, drawPolygon);
    });
    return () => null;
  }
});
const _t0$4 = Vue.template('<div style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>');
const _t1$3 = Vue.template('<div style="position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;"> ');
const props$2 = {
  id: {
    type: String,
    default: ""
  },
  latitude: {
    type: [String, Number],
    default: 0
  },
  longitude: {
    type: [String, Number],
    default: 0
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
  },
  libraries: {
    type: Array,
    default() {
      return [];
    }
  },
  polygons: {
    type: Array,
    default: () => []
  }
};
function getPoints(points) {
  const newPoints = [];
  if (shared.isArray(points)) {
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
function getAMapPosition(maps, latitude, longitude) {
  return new maps.LngLat(longitude, latitude);
}
function getBMapPosition(maps, latitude, longitude) {
  return new maps.Point(longitude, latitude);
}
function getGoogleOrQQMapPosition(maps, latitude, longitude) {
  return new maps.LatLng(latitude, longitude);
}
function getMapPosition(maps, latitude, longitude) {
  if (getIsBMap()) {
    return getBMapPosition(maps, latitude, longitude);
  } else if (getIsAMap()) {
    return getAMapPosition(maps, latitude, longitude);
  } else {
    return getGoogleOrQQMapPosition(maps, latitude, longitude);
  }
}
function getLat(latLng) {
  if ("getLat" in latLng) {
    return latLng.getLat();
  } else {
    if (getIsBMap()) {
      return latLng.lat;
    }
    return latLng.lat();
  }
}
function getLng(latLng) {
  if ("getLng" in latLng) {
    return latLng.getLng();
  } else {
    if (getIsBMap()) {
      return latLng.lng;
    }
    return latLng.lng();
  }
}
function useMap(props2, rootRef, emit2) {
  const trigger = useCustomEvent(rootRef, emit2);
  const mapRef = Vue.ref(null);
  let maps;
  let map;
  const state = Vue.reactive({
    latitude: Number(props2.latitude),
    longitude: Number(props2.longitude),
    includePoints: getPoints(props2.includePoints)
  });
  function onMapReady(callback) {
  }
  let isBoundsReady;
  function onBoundsReady(callback) {
  }
  const contexts = {};
  function addMapChidlContext(context) {
    contexts[context.id] = context;
  }
  function removeMapChidlContext(context) {
    delete contexts[context.id];
  }
  Vue.watch([() => props2.latitude, () => props2.longitude], ([latitudeVlaue, longitudeVlaue]) => {
    const latitude = Number(latitudeVlaue);
    const longitude = Number(longitudeVlaue);
    if (latitude !== state.latitude || longitude !== state.longitude) {
      state.latitude = latitude;
      state.longitude = longitude;
    }
  });
  Vue.watch(() => props2.includePoints, (points) => {
    state.includePoints = getPoints(points);
  }, { deep: true });
  function updateBounds() {
    if (getIsAMap()) {
      const points = [];
      state.includePoints.forEach((point) => {
        points.push([point.longitude, point.latitude]);
      });
      const bounds = new maps.Bounds(...points);
      map.setBounds(bounds);
    } else if (getIsBMap())
      ;
    else {
      const bounds = new maps.LatLngBounds();
      state.includePoints.forEach(({ latitude, longitude }) => {
        const latLng = new maps.LatLng(latitude, longitude);
        bounds.extend(latLng);
      });
      map.fitBounds(bounds);
    }
  }
  try {
    const id2 = useContextInfo();
    useSubscribe((type, data = {}) => {
      switch (type) {
        case "getCenterLocation":
          onMapReady(() => {
            const center = map.getCenter();
            uniShared.callOptions(data, {
              latitude: getLat(center),
              longitude: getLng(center),
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
              if (map)
                ;
              onMapReady(() => {
                uniShared.callOptions(data, `${type}:ok`);
              });
            } else {
              uniShared.callOptions(data, `${type}:fail`);
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
                uniShared.callOptions(data, `${type}:fail ${error.message}`);
              }
              uniShared.callOptions(data, `${type}:ok`);
            } else {
              uniShared.callOptions(data, `${type}:fail not found`);
            }
          });
          break;
        case "includePoints":
          state.includePoints = getPoints(data.includePoints);
          if (isBoundsReady || getIsAMap()) {
            updateBounds();
          }
          onBoundsReady(() => {
            uniShared.callOptions(data, `${type}:ok`);
          });
          break;
        case "getRegion":
          onBoundsReady(() => {
            const latLngBounds = map.getBounds();
            const southwest = latLngBounds.getSouthWest();
            const northeast = latLngBounds.getNorthEast();
            uniShared.callOptions(data, {
              southwest: {
                latitude: getLat(southwest),
                longitude: getLng(southwest)
              },
              northeast: {
                latitude: getLat(northeast),
                longitude: getLng(northeast)
              },
              errMsg: `${type}:ok`
            });
          });
          break;
        case "getScale":
          onMapReady(() => {
            uniShared.callOptions(data, {
              scale: map.getZoom(),
              errMsg: `${type}:ok`
            });
          });
          break;
      }
    }, id2, true);
  } catch (error) {
  }
  Vue.provide("onMapReady", onMapReady);
  Vue.provide("addMapChidlContext", addMapChidlContext);
  Vue.provide("removeMapChidlContext", removeMapChidlContext);
  return {
    state,
    mapRef,
    trigger
  };
}
const index$9 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Map",
  props: props$2,
  emits: [
    "markertap",
    "labeltap",
    "callouttap",
    "controltap",
    "regionchange",
    "tap",
    "click",
    "updated",
    "update:scale",
    "update:latitude",
    "update:longitude"
  ],
  setup(props2, { emit: emit2, slots }) {
    const rootRef = Vue.ref(null);
    const { mapRef, trigger } = useMap(props2, rootRef, emit2);
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n8 = Vue.createPlainElement("uni-map", { id: () => props2.id }, () => {
          const _n0 = _t0$4();
          const _n7 = _t1$3();
          const _n1 = createNodes(() => props2.markers.map((item) => (() => {
            const _n02 = Vue.createKeyedFragment(() => item.id, () => {
              const _n2 = createComponent(MapMarker, { $: [() => item] }, null, true);
              return _n2;
            });
            return _n02;
          })()), () => props2.polyline.map((item) => (() => {
            const _n02 = createComponent(MapPolyline, { $: [() => item] }, null, true);
            return _n02;
          })()), () => props2.circles.map((item) => (() => {
            const _n02 = createComponent(MapCircle, { $: [() => item] }, null, true);
            return _n02;
          })()), () => props2.controls.map((item) => (() => {
            const _n02 = createComponent(MapControl, { $: [() => item, { trigger: () => trigger }] }, null, true);
            return _n02;
          })()), () => props2.showLocation && (() => {
            const _n02 = createComponent(MapLocation, null, null, true);
            return _n02;
          })(), () => props2.polygons.map((item) => (() => {
            const _n02 = createComponent(MapPolygon, { $: [() => item] }, null, true);
            return _n02;
          })()));
          const _x7 = Vue.txt(_n7);
          setNodes(_x7, () => slots.default && slots.default());
          Vue.renderEffect(() => _setTemplateRef(_n0, mapRef));
          return [
            _n0,
            _n1,
            _n7
          ];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n8, rootRef));
        return _n8;
      })();
    };
  }
});
const _t0$3 = Vue.template("<div class=uni-cover-view> ");
const props$1 = { scrollTop: {
  type: [String, Number],
  default: 0
} };
const index$8 = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverView",
  compatConfig: { MODE: 3 },
  props: props$1,
  setup(props2, { slots }) {
    const root = Vue.ref(null);
    const content = Vue.ref(null);
    Vue.watch(() => props2.scrollTop, (val) => {
      setScrollTop(val);
    });
    function setScrollTop(val) {
      let _content = content.value;
      if (getComputedStyle(_content).overflowY === "scroll") {
        _content.scrollTop = _upx2pxNum(val);
      }
    }
    function _upx2pxNum(val) {
      let _val = String(val);
      if (/\d+[ur]px$/i.test(_val)) {
        _val.replace(/\d+[ur]px$/i, (text) => {
          return String(uni.upx2px(parseFloat(text)));
        });
      }
      return parseFloat(_val) || 0;
    }
    return () => {
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n1 = Vue.createPlainElement("uni-cover-view", { "scroll-top": () => props2.scrollTop }, () => {
          const _n0 = _t0$3();
          const _x0 = Vue.txt(_n0);
          setNodes(_x0, () => slots.default && slots.default());
          Vue.renderEffect(() => _setTemplateRef(_n0, content));
          return _n0;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n1, root));
        return _n1;
      })();
    };
  }
});
const _t0$2 = Vue.template("<img>");
const _t1$2 = Vue.template("<div class=uni-cover-image>");
const index$7 = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverImage",
  compatConfig: { MODE: 3 },
  props: { src: {
    type: String,
    default: ""
  } },
  emits: ["load", "error"],
  setup(props2, { emit: emit2 }) {
    const root = Vue.ref(null);
    const trigger = useCustomEvent(root, emit2);
    function load($event) {
      trigger("load", $event);
    }
    function error($event) {
      trigger("error", $event);
    }
    return () => {
      const { src } = props2;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n6 = Vue.createPlainElement("uni-cover-image", { src: () => src }, () => {
          const _n5 = _t1$2();
          Vue.setInsertionState(_n5);
          Vue.createIf(() => src, () => {
            const _n2 = _t0$2();
            Vue.on(_n2, "load", load);
            Vue.on(_n2, "error", error);
            Vue.renderEffect(() => Vue.setProp(_n2, "src", getRealPath(src)));
            return _n2;
          }, () => {
            const _n4 = createNodes(null);
            return _n4;
          }, 265);
          return _n5;
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n6, root));
        return _n6;
      })();
    };
  }
});
const POPUP_EDGE = 6;
function usePopupStyle(props2, triangleColor = "#fcfcfd") {
  const popupWidth = Vue.ref(0);
  const popupHeight = Vue.ref(0);
  const isDesktop = Vue.computed(
    () => popupWidth.value >= 500 && popupHeight.value >= 500
  );
  const popupStyle = Vue.computed(() => {
    const style = {
      content: {
        transform: "",
        left: "",
        top: "",
        bottom: ""
      },
      triangle: {
        left: "",
        top: "",
        bottom: "",
        "border-width": "",
        "border-color": ""
      }
    };
    const contentStyle = style.content;
    const triangleStyle = style.triangle;
    const popover = props2.popover;
    function getNumber(value) {
      try {
        const number = Number(value);
        return Number.isFinite(number) ? number : 0;
      } catch {
        return 0;
      }
    }
    if (isDesktop.value && popover) {
      const popoverLeft = Math.max(0, getNumber(popover.left));
      const width = getNumber(popover.width);
      const popoverWidth = width > 0 ? width : 300;
      const popoverTop = Math.max(0, getNumber(popover.top));
      const popoverHeight = Math.max(0, getNumber(popover.height));
      const center = popoverLeft + popoverWidth / 2;
      const contentLeft = Math.max(
        POPUP_EDGE,
        Math.min(
          popupWidth.value - popoverWidth - POPUP_EDGE,
          center - popoverWidth / 2
        )
      );
      shared.extend(triangleStyle, {
        position: "absolute",
        width: "0",
        height: "0",
        "margin-left": "-6px",
        "border-style": "solid"
      });
      contentStyle.transform = "none !important";
      contentStyle.left = `${contentLeft}px`;
      if (width > 0) {
        contentStyle.width = `${popoverWidth}px`;
      }
      const triangleLeft = Math.max(
        12,
        Math.min(popoverWidth - 12, center - contentLeft)
      );
      triangleStyle.left = `${triangleLeft}px`;
      const vcl = popupHeight.value / 2;
      if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
        contentStyle.top = "auto";
        contentStyle.bottom = `${Math.max(
          POPUP_EDGE,
          popupHeight.value - popoverTop + POPUP_EDGE
        )}px`;
        triangleStyle.bottom = "-6px";
        triangleStyle["border-width"] = "6px 6px 0 6px";
        triangleStyle["border-color"] = `${triangleColor} transparent transparent transparent`;
      } else {
        contentStyle.top = `${Math.max(
          POPUP_EDGE,
          popoverTop + popoverHeight + POPUP_EDGE
        )}px`;
        triangleStyle.top = "-6px";
        triangleStyle["border-width"] = "0 6px 6px 6px";
        triangleStyle["border-color"] = `transparent transparent ${triangleColor} transparent`;
      }
    }
    return style;
  });
  return {
    isDesktop,
    popupStyle
  };
}
function useKeyboard() {
  const key = Vue.ref("");
  const disable = Vue.ref(false);
  return {
    key,
    disable
  };
}
const _t0$1 = Vue.template('<div class="uni-mask uni-picker-mask">');
const _t1$1 = Vue.template('<div><div class=uni-picker-header><div class="uni-picker-action uni-picker-action-cancel"> </div><div class="uni-picker-action uni-picker-action-confirm"> </div></div><!><div class=uni-picker-select> </div><div></div>');
const _t2 = Vue.template("<div>");
const _t3 = Vue.template("<div> </div>");
const _t4 = Vue.template("<div class=uni-picker-system><input tabindex=-1>");
const _t5 = Vue.template("<div class=uni-picker-item>", 1);
const _t6 = Vue.template("<div>", 1);
function getDefaultStartValue(props2) {
  if (props2.mode === mode.TIME) {
    return "00:00";
  }
  if (props2.mode === mode.DATE) {
    const year = (/* @__PURE__ */ new Date()).getFullYear() - 150;
    switch (props2.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-01";
      default:
        return year + "-01-01";
    }
  }
  return "";
}
function getDefaultEndValue(props2) {
  if (props2.mode === mode.TIME) {
    return "23:59";
  }
  if (props2.mode === mode.DATE) {
    const year = (/* @__PURE__ */ new Date()).getFullYear() + 150;
    switch (props2.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-12";
      default:
        return year + "-12-31";
    }
  }
  return "";
}
function getDateValueArray(props2, state, valueStr, defaultValue) {
  const splitStr = props2.mode === mode.DATE ? "-" : ":";
  const array = props2.mode === mode.DATE ? state.dateArray : state.timeArray;
  let max;
  if (props2.mode === mode.TIME) {
    max = 2;
  } else {
    switch (props2.fields) {
      case fields.YEAR:
        max = 1;
        break;
      case fields.MONTH:
        max = 2;
        break;
      default:
        max = 3;
        break;
    }
  }
  const inputArray = String(valueStr).split(splitStr);
  let value = [];
  for (let i = 0; i < max; i++) {
    const val = inputArray[i];
    value.push(array[i].indexOf(val));
  }
  if (value.indexOf(-1) >= 0) {
    value = defaultValue ? getDateValueArray(props2, state, defaultValue) : value.map(() => 0);
  }
  return value;
}
const mode = {
  SELECTOR: "selector",
  MULTISELECTOR: "multiSelector",
  TIME: "time",
  DATE: "date"
};
const fields = {
  YEAR: "year",
  MONTH: "month",
  DAY: "day"
};
const selectorType = {
  PICKER: "picker",
  SELECT: "select"
};
const props = {
  name: {
    type: String,
    default: ""
  },
  range: {
    type: Array,
    default() {
      return [];
    }
  },
  rangeKey: {
    type: String,
    default: ""
  },
  value: {
    type: [
      Number,
      String,
      Array
    ],
    default: 0
  },
  mode: {
    type: String,
    default: mode.SELECTOR,
    validator(val) {
      return Object.values(mode).includes(val);
    }
  },
  fields: {
    type: String,
    default: ""
  },
  start: {
    type: String,
    default: (props2) => {
      return getDefaultStartValue(props2);
    }
  },
  end: {
    type: String,
    default: (props2) => {
      return getDefaultEndValue(props2);
    }
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  selectorType: {
    type: String,
    default: ""
  }
};
const index$6 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Picker",
  compatConfig: { MODE: 3 },
  props,
  emits: [
    "change",
    "cancel",
    "columnchange"
  ],
  setup(props2, { emit: emit2, slots }) {
    initI18nPickerMsgsOnce();
    const { t: t11 } = useI18n();
    const rootRef = Vue.ref(null);
    const pickerRef = Vue.ref(null);
    const selectRef = Vue.ref(null);
    const inputRef = Vue.ref(null);
    const pickerRender = Vue.ref(false);
    const { state, rangeArray } = usePickerState(props2);
    const trigger = useCustomEvent(rootRef, emit2);
    const { system, selectorTypeComputed, _show, _l10nColumn, _l10nItem, _input, _fixInputPosition, _pickerViewChange, _cancel, _change, _resetFormData, _getFormData, _createTime, _createDate, _setValueSync } = usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef);
    usePickerWatch(state, _cancel, _change);
    usePickerForm(_resetFormData, _getFormData);
    _createTime();
    _createDate();
    _setValueSync();
    const popup = usePopupStyle(state, "var(--uni-picker-arrow-color, #fcfcfd)");
    Vue.watchEffect(() => {
      state.isDesktop = popup.isDesktop.value;
      state.popupStyle = popup.popupStyle.value;
    });
    return () => {
      const { visible, contentVisible, valueArray, popupStyle, valueSync } = state;
      const { rangeKey, mode: mode2, start, end } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n31 = Vue.createPlainElement("uni-picker", { $: [() => booleanAttrs, { onClick: () => withWebEvent(_show) }] }, () => {
          const _n0 = Vue.createIf(() => pickerRender.value, () => {
            const _n2 = _t2();
            Vue.on(_n2, "wheel", onEventPrevent);
            Vue.on(_n2, "touchmove", onEventPrevent);
            Vue.renderEffect(() => Vue.setClass(_n2, ["uni-picker-container", `uni-${mode2}-${selectorTypeComputed.value}`]));
            Vue.setInsertionState(_n2);
            createComponent(Vue.Transition, {
              name: "uni-fade",
              persisted: true
            }, () => {
              const _n3 = _t0$1();
              Vue.applyVShow(_n3, () => visible);
              Vue.on(_n3, "click", withWebEvent(_cancel));
              Vue.on(_n3, "mousemove", _fixInputPosition);
              return _n3;
            });
            Vue.setInsertionState(_n2, 1);
            Vue.createIf(() => !system.value, () => {
              const _n19 = _t1$1();
              const _n7 = Vue.child(_n19);
              const _n8 = Vue.child(_n7);
              const _n9 = Vue.next(_n8);
              const _n18 = Vue.next(_n7);
              const _n16 = Vue.next(_n18);
              const _n17 = Vue.next(_n16);
              Vue.on(_n7, "click", onEventStop);
              Vue.on(_n8, "click", withWebEvent(_cancel));
              const _x8 = Vue.txt(_n8);
              setNodes(_x8, () => t11("uni.picker.cancel"));
              Vue.on(_n9, "click", _change);
              const _x9 = Vue.txt(_n9);
              setNodes(_x9, () => t11("uni.picker.done"));
              Vue.renderEffect(() => {
                Vue.setClassName(_n19, visible ? 1 : 0, "uni-picker-toggle", "", "uni-picker-custom");
                Vue.setStyle(_n19, popupStyle.content);
              });
              Vue.setInsertionState(_n19, _n18);
              Vue.createIf(() => contentVisible, () => {
                const _n13 = createComponent(PickerView, {
                  value: () => _l10nColumn(valueArray),
                  class: "uni-picker-content",
                  onChange: () => _pickerViewChange
                }, Vue.extend(() => {
                  const _n12 = createNodes(() => Vue.renderList(_l10nColumn(rangeArray.value), (rangeItem, index0) => (() => {
                    const _n02 = Vue.createKeyedFragment(() => index0, () => {
                      const _n3 = createComponent(PickerViewColumn, null, Vue.extend(() => {
                        const _n22 = createNodes(() => Vue.renderList(rangeItem, (item, index2) => (() => {
                          const _n03 = Vue.createKeyedFragment(() => index2, () => {
                            const _n72 = _t5();
                            Vue.setInsertionState(_n72);
                            Vue.createIf(() => typeof item === "object", () => {
                              const _n42 = createNodes(() => item[rangeKey] || "");
                              return _n42;
                            }, () => {
                              const _n6 = createNodes(() => _l10nItem(item, index0));
                              return _n6;
                            }, 266);
                            return _n72;
                          });
                          return _n03;
                        })()));
                        return _n22;
                      }, { _: 1 }), true);
                      return _n3;
                    });
                    return _n02;
                  })()));
                  return _n12;
                }, { _: 1 }));
                return _n13;
              }, () => {
                const _n15 = createNodes(null);
                return _n15;
              }, 265);
              Vue.on(_n16, "wheel", onEventStop);
              Vue.on(_n16, "touchmove", onEventStop);
              const _x16 = Vue.txt(_n16);
              setNodes(_x16, () => Vue.renderList(rangeArray.value[0], (item, index2) => (() => {
                const _n02 = Vue.createKeyedFragment(() => index2, () => {
                  const _n22 = _t6();
                  Vue.on(_n22, "click", () => {
                    valueArray[0] = index2;
                    _change();
                  });
                  Vue.renderEffect(() => Vue.setClassName(_n22, valueArray[0] === index2 ? 1 : 0, " selected", "uni-picker-item"));
                  Vue.setInsertionState(_n22);
                  Vue.createIf(() => typeof item === "object", () => {
                    const _n52 = createNodes(() => item[rangeKey] || "");
                    return _n52;
                  }, () => {
                    const _n72 = createNodes(() => item);
                    return _n72;
                  }, 266);
                  return _n22;
                });
                return _n02;
              })()));
              Vue.renderEffect(() => {
                _setTemplateRef(_n16, selectRef);
                Vue.setStyle(_n17, popupStyle.triangle);
              });
              return _n19;
            }, () => {
              const _n21 = createNodes(null);
              return _n21;
            }, 521);
            Vue.renderEffect(() => _setTemplateRef(_n2, pickerRef));
            return _n2;
          }, () => {
            const _n23 = createNodes(null);
            return _n23;
          }, 777);
          const _n24 = _t3();
          const _x24 = Vue.txt(_n24);
          setNodes(_x24, () => slots.default && slots.default());
          const _n25 = Vue.createIf(() => system.value, () => {
            const _n27 = _t4();
            const _n28 = Vue.child(_n27);
            Vue.on(_n27, "mousemove", withWebEvent(_fixInputPosition));
            Vue.on(_n28, "change", ($event) => {
              _input($event);
              onEventStop($event);
            });
            Vue.renderEffect(() => {
              Vue.setClass(_n28, ["uni-picker-system_input", system.value]);
              Vue.setValue(_n28, valueSync);
              Vue.setProp(_n28, "type", mode2);
              Vue.setProp(_n28, "min", start);
              Vue.setProp(_n28, "max", end);
              _setTemplateRef(_n28, inputRef);
            });
            return _n27;
          }, () => {
            const _n30 = createNodes(null);
            return _n30;
          }, 1033);
          return [
            _n0,
            _n24,
            _n25
          ];
        }, true);
        Vue.renderEffect(() => _setTemplateRef(_n31, rootRef));
        return _n31;
      })();
    };
  }
});
function usePickerState(props2) {
  const state = Vue.reactive({
    valueSync: void 0,
    visible: false,
    contentVisible: false,
    popover: null,
    valueChangeSource: "",
    timeArray: [],
    dateArray: [],
    valueArray: [],
    oldValueArray: [],
    isDesktop: false,
    popupStyle: {
      content: {},
      triangle: {}
    }
  });
  const rangeArray = Vue.computed(() => {
    let val = props2.range;
    switch (props2.mode) {
      case mode.SELECTOR:
        return [val];
      case mode.MULTISELECTOR:
        return val;
      case mode.TIME:
        return state.timeArray;
      case mode.DATE: {
        const dateArray = state.dateArray;
        switch (props2.fields) {
          case fields.YEAR:
            return [dateArray[0]];
          case fields.MONTH:
            return [dateArray[0], dateArray[1]];
          default:
            return [
              dateArray[0],
              dateArray[1],
              dateArray[2]
            ];
        }
      }
    }
    return [];
  });
  return {
    state,
    rangeArray
  };
}
function useIsiPad() {
  const isiPad = Vue.ref(false);
  return isiPad;
}
function useSystem() {
  const _system = Vue.ref("");
  return _system;
}
let __contentVisibleDelay;
function usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
  const isiPad = useIsiPad();
  const _system = useSystem();
  const selectorTypeComputed = Vue.computed(() => {
    const type = props2.selectorType;
    if (Object.values(selectorType).includes(type)) {
      return type;
    }
    return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
  });
  const system = Vue.computed(() => {
    if (props2.mode === mode.DATE && !Object.values(fields).includes(props2.fields) && state.isDesktop) {
      return _system.value;
    }
    return "";
  });
  const startArray = Vue.computed(() => {
    return getDateValueArray(props2, state, props2.start, getDefaultStartValue(props2));
  });
  const endArray = Vue.computed(() => {
    return getDateValueArray(props2, state, props2.end, getDefaultEndValue(props2));
  });
  function _show(event) {
    if (props2.disabled) {
      return;
    }
    state.valueChangeSource = "";
    let $picker = pickerRef.value;
    let _currentTarget = event.currentTarget;
    $picker.remove();
    (document.querySelector("uni-app") || document.body).appendChild($picker);
    $picker.style.display = "block";
    const rect = _currentTarget.getBoundingClientRect();
    state.popover = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    setTimeout(() => {
      state.visible = true;
    }, 20);
  }
  function _getFormData() {
    return {
      value: state.valueSync,
      key: props2.name
    };
  }
  function _resetFormData() {
    switch (props2.mode) {
      case mode.SELECTOR:
        state.valueSync = 0;
        break;
      case mode.MULTISELECTOR:
        state.valueSync = props2.value.map((val) => 0);
        break;
      case mode.DATE:
      case mode.TIME:
        state.valueSync = "";
        break;
    }
  }
  function _createTime() {
    let hours = [];
    let minutes = [];
    for (let i = 0; i < 24; i++) {
      hours.push((i < 10 ? "0" : "") + i);
    }
    for (let i = 0; i < 60; i++) {
      minutes.push((i < 10 ? "0" : "") + i);
    }
    state.timeArray.push(hours, minutes);
  }
  function getYearStartEnd() {
    let year = (/* @__PURE__ */ new Date()).getFullYear();
    let start = year - 150;
    let end = year + 150;
    if (props2.start) {
      const _year = new Date(props2.start).getFullYear();
      if (!isNaN(_year) && _year < start) {
        start = _year;
      }
    }
    if (props2.end) {
      const _year = new Date(props2.end).getFullYear();
      if (!isNaN(_year) && _year > end) {
        end = _year;
      }
    }
    return {
      start,
      end
    };
  }
  function _createDate() {
    let years = [];
    const year = getYearStartEnd();
    for (let i = year.start, end = year.end; i <= end; i++) {
      years.push(String(i));
    }
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push((i < 10 ? "0" : "") + i);
    }
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push((i < 10 ? "0" : "") + i);
    }
    state.dateArray.push(years, months, days);
  }
  function _getTimeValue(val) {
    return val[0] * 60 + val[1];
  }
  function _getDateValue(val) {
    const DAY = 31;
    return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0);
  }
  function _cloneArray(val1, val2) {
    for (let i = 0; i < val1.length && i < val2.length; i++) {
      val1[i] = val2[i];
    }
  }
  function _setValueSync() {
    let val = props2.value;
    switch (props2.mode) {
      case mode.MULTISELECTOR:
        {
          if (!shared.isArray(val)) {
            val = state.valueArray;
          }
          if (!shared.isArray(state.valueSync)) {
            state.valueSync = [];
          }
          const length = state.valueSync.length = Math.max(val.length, props2.range.length);
          for (let index2 = 0; index2 < length; index2++) {
            const val0 = Number(val[index2]);
            const val1 = Number(state.valueSync[index2]);
            const val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
            const maxVal = props2.range[index2] ? props2.range[index2].length - 1 : 0;
            state.valueSync.splice(index2, 1, val2 < 0 || val2 > maxVal ? 0 : val2);
          }
        }
        break;
      case mode.TIME:
      case mode.DATE:
        state.valueSync = String(val);
        break;
      default: {
        const valueSync = Number(val);
        state.valueSync = valueSync < 0 ? 0 : valueSync;
        break;
      }
    }
  }
  function _setValueArray() {
    let val = state.valueSync;
    let valueArray;
    switch (props2.mode) {
      case mode.MULTISELECTOR:
        valueArray = [...val];
        break;
      case mode.TIME:
        valueArray = getDateValueArray(props2, state, val, uniShared.formatDateTime({ mode: mode.TIME }));
        break;
      case mode.DATE:
        valueArray = getDateValueArray(props2, state, val, uniShared.formatDateTime({ mode: mode.DATE }));
        break;
      default:
        valueArray = [val];
        break;
    }
    state.oldValueArray = [...valueArray];
    state.valueArray = [...valueArray];
  }
  function _getValue() {
    let val = state.valueArray;
    switch (props2.mode) {
      case mode.SELECTOR:
        return val[0];
      case mode.MULTISELECTOR:
        return val.map((val2) => val2);
      case mode.TIME:
        return state.valueArray.map((val2, i) => state.timeArray[i][val2]).join(":");
      case mode.DATE:
        return state.valueArray.map((val2, i) => state.dateArray[i][val2]).join("-");
    }
  }
  function _change() {
    _close();
    state.valueChangeSource = "click";
    const value = _getValue();
    state.valueSync = shared.isArray(value) ? value.map((val) => val) : value;
    trigger("change", {}, { value });
  }
  function _cancel($event) {
    if (system.value === "firefox" && $event) {
      const { top, left, width, height } = state.popover;
      const { pageX, pageY } = $event;
      if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
        return;
      }
    }
    _close();
    trigger("cancel", {}, {});
  }
  function _close() {
    state.visible = false;
    setTimeout(() => {
      let $picker = pickerRef.value;
      $picker.remove();
      rootRef.value.prepend($picker);
      $picker.style.display = "none";
    }, 260);
  }
  function _select() {
    if (props2.mode === mode.SELECTOR && selectorTypeComputed.value === selectorType.SELECT) {
      selectRef.value.scrollTop = state.valueArray[0] * 34;
    }
  }
  function _input($event) {
    const EventTarget = $event.target;
    state.valueSync = EventTarget.value;
    Vue.nextTick(() => {
      _change();
    });
  }
  function _fixInputPosition($event) {
    if (system.value === "chrome") {
      const rect = rootRef.value.getBoundingClientRect();
      const fontSize = 32;
      inputRef.value.style.left = `${$event.clientX - rect.left - fontSize * 1.5}px`;
      inputRef.value.style.top = `${$event.clientY - rect.top - fontSize * 0.5}px`;
    }
  }
  function _pickerViewChange(event) {
    state.valueArray = _l10nColumn(event.detail.value, true);
  }
  function _l10nColumn(array, normalize) {
    const { getLocale: getLocale2 } = useI18n();
    if (props2.mode === mode.DATE) {
      const locale = getLocale2();
      if (!locale.startsWith("zh")) {
        switch (props2.fields) {
          case fields.YEAR:
            return array;
          case fields.MONTH:
            return [array[1], array[0]];
          default:
            switch (locale) {
              case "es":
              case "fr":
                return [
                  array[2],
                  array[1],
                  array[0]
                ];
              default:
                return normalize ? [
                  array[2],
                  array[0],
                  array[1]
                ] : [
                  array[1],
                  array[2],
                  array[0]
                ];
            }
        }
      }
    }
    return array;
  }
  function _l10nItem(item, index2) {
    const { getLocale: getLocale2 } = useI18n();
    if (props2.mode === mode.DATE) {
      const locale = getLocale2();
      if (locale.startsWith("zh")) {
        const array = [
          "年",
          "月",
          "日"
        ];
        return item + array[index2];
      } else if (props2.fields !== fields.YEAR && index2 === (props2.fields !== fields.MONTH && (locale === "es" || locale === "fr") ? 1 : 0)) {
        let array;
        switch (locale) {
          case "es":
            array = [
              "enero",
              "febrero",
              "marzo",
              "abril",
              "mayo",
              "junio",
              "​​julio",
              "agosto",
              "septiembre",
              "octubre",
              "noviembre",
              "diciembre"
            ];
            break;
          case "fr":
            array = [
              "janvier",
              "février",
              "mars",
              "avril",
              "mai",
              "juin",
              "juillet",
              "août",
              "septembre",
              "octobre",
              "novembre",
              "décembre"
            ];
            break;
          default:
            array = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ];
            break;
        }
        return array[Number(item) - 1];
      }
    }
    return item;
  }
  Vue.watch(() => state.visible, (val) => {
    if (val) {
      clearTimeout(__contentVisibleDelay);
      state.contentVisible = val;
      _select();
    } else {
      __contentVisibleDelay = setTimeout(() => {
        state.contentVisible = val;
      }, 300);
    }
  });
  Vue.watch([
    () => props2.mode,
    () => props2.value,
    () => props2.range
  ], _setValueSync, { deep: true });
  Vue.watch(() => state.valueSync, _setValueArray, { deep: true });
  Vue.watch(() => state.valueArray, (val) => {
    if (props2.mode === mode.TIME || props2.mode === mode.DATE) {
      const getValue = props2.mode === mode.TIME ? _getTimeValue : _getDateValue;
      const valueArray = state.valueArray;
      const _startArray = startArray.value;
      const _endArray = endArray.value;
      if (props2.mode === mode.DATE) {
        const dateArray = state.dateArray;
        const max = dateArray[2].length;
        const day = Number(dateArray[2][valueArray[2]]) || 1;
        const realDay = (/* @__PURE__ */ new Date(`${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]}/${day}`)).getDate();
        if (realDay < day) {
          valueArray[2] -= realDay + max - day;
        }
      }
      if (getValue(valueArray) < getValue(_startArray)) {
        _cloneArray(valueArray, _startArray);
      } else if (getValue(valueArray) > getValue(_endArray)) {
        _cloneArray(valueArray, _endArray);
      }
    }
    val.forEach((value, column) => {
      if (value !== state.oldValueArray[column]) {
        state.oldValueArray[column] = value;
        if (props2.mode === mode.MULTISELECTOR) {
          trigger("columnchange", {}, {
            column,
            value
          });
        }
      }
    });
  });
  return {
    selectorTypeComputed,
    system,
    _show,
    _cancel,
    _change,
    _l10nColumn,
    _l10nItem,
    _input,
    _resetFormData,
    _getFormData,
    _createTime,
    _createDate,
    _setValueSync,
    _fixInputPosition,
    _pickerViewChange
  };
}
function usePickerWatch(state, _cancel, _change) {
  const { key, disable } = useKeyboard();
  Vue.watchEffect(() => {
    disable.value = !state.visible;
  });
  Vue.watch(key, (value) => {
    if (value === "esc") {
      _cancel();
    } else if (value === "enter") {
      _change();
    }
  });
}
function usePickerForm(_resetFormData, _getFormData) {
  const uniForm = Vue.inject(uniFormKey, false);
  if (uniForm) {
    const field = {
      reset: _resetFormData,
      submit: () => {
        const data = ["", null];
        const { key, value } = _getFormData();
        if (key !== "") {
          data[0] = key;
          data[1] = value;
        }
        return data;
      }
    };
    uniForm.addField(field);
  }
}
const _t0 = Vue.template("<div class=uni-ad-container></div>");
const _t1 = Vue.template("<div class=uni-ad-custom-material> ");
const _AdConfig = class _AdConfig {
  constructor() {
    this._adConfig = null;
    this._isLoading = false;
    this._callbacks = [];
    this._configLast = 0;
  }
  static get instance() {
    if (!_AdConfig._instance) {
      _AdConfig._instance = new _AdConfig();
      _AdConfig._instance._init();
    }
    return _AdConfig._instance;
  }
  get adConfig() {
    return this._adConfig;
  }
  get isExpired() {
    if (this._adConfig == null) {
      return true;
    }
    if (!this._configLast) {
      return true;
    }
    return Math.abs(Date.now() - this._configLast) > _AdConfig.CACHE_TIME;
  }
  _init() {
    var config = this._getConfig();
    if (config === null || !config.last) {
      return;
    }
    if (Math.abs(Date.now() - config.last) <= _AdConfig.CACHE_TIME) {
      this._adConfig = config.data;
      this._configLast = config.last;
    }
  }
  get(adpid, success, fail) {
    _AdConfig.IC++;
    if (this._adConfig != null) {
      this._doCallback(adpid, success, fail);
      if (this.isExpired) {
        this._loadAdConfig(adpid);
      }
      return;
    }
    this._callbacks.push({
      adpid,
      success,
      fail
    });
    this._loadAdConfig(adpid);
  }
  _doCallback(adpid, success, fail) {
    _AdConfig.IS++;
    var { a, b } = this._adConfig;
    const adData = a[adpid];
    if (adData) {
      success(b, Array.isArray(adData) ? adData : [adData]);
    } else {
      fail(_AdConfig.ERROR_INVALID_ADPID);
    }
  }
  _loadAdConfig(adpid) {
    if (this._isLoading === true) {
      return;
    }
    this._isLoading = true;
    const appid = typeof __uniConfig !== "undefined" ? __uniConfig.appId ?? "" : "";
    uni.request({
      url: _AdConfig.URL,
      method: "GET",
      timeout: 8e3,
      data: {
        d: location.hostname,
        a: adpid,
        appid
      },
      dataType: "json",
      success: (res) => {
        const rd = res.data;
        if (rd.ret === 0) {
          const data = rd.data;
          this._adConfig = data;
          this._configLast = Date.now();
          this._setConfig(data);
          this._callbacks.forEach(({ adpid: adpid2, success, fail }) => {
            this._doCallback(adpid2, success, fail);
          });
        } else {
          this._callbacks.forEach((i) => {
            i.fail({
              errCode: rd.ret,
              errMsg: rd.msg
            });
          });
        }
        this._callbacks = [];
      },
      fail: (err) => {
        this._callbacks.forEach((i) => {
          i.fail(err);
        });
        this._callbacks = [];
      },
      complete: (c) => {
        this._isLoading = false;
      }
    });
  }
  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    var data = localStorage.getItem(_AdConfig.KEY);
    return data ? JSON.parse(data) : null;
  }
  _setConfig(data) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    localStorage.setItem(_AdConfig.KEY, JSON.stringify({
      last: Date.now(),
      data
    }));
  }
};
_AdConfig.IC = 0;
_AdConfig.IS = 0;
_AdConfig.URL = "https://hac1.dcloud.net.cn/ah5v2";
_AdConfig.KEY = "uni_app_ad_config";
_AdConfig.CACHE_TIME = 1e3 * 60 * 10;
_AdConfig.ERROR_INVALID_ADPID = { "-5002": "invalid adpid" };
let AdConfig = _AdConfig;
const _AdReport = class _AdReport {
  static get instance() {
    if (!_AdReport._instance) {
      _AdReport._instance = new _AdReport();
    }
    return _AdReport._instance;
  }
  constructor() {
    var config = this._getConfig();
    if (config && config.guid) {
      this._guid = config.guid;
      return;
    }
    this._guid = this._newGUID();
    this._setConfig(this._guid);
  }
  get(data) {
    this._process(Object.assign(data, {
      d: location.hostname,
      i: this._guid
    }));
  }
  _process(data) {
    uni.request({
      url: _AdReport.URL,
      method: "GET",
      data,
      dataType: "json",
      success: () => {
      }
    });
  }
  _newGUID() {
    let guid = "";
    const format = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
    for (let i = 0; i < format.length; i++) {
      if (format[i] === "x") {
        guid += (Math.random() * 16 | 0).toString(16);
      } else {
        guid += format[i];
      }
    }
    return guid.toUpperCase();
  }
  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    var data = localStorage.getItem(_AdReport.KEY);
    return data ? JSON.parse(data) : null;
  }
  _setConfig(guid) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    localStorage.setItem(_AdReport.KEY, JSON.stringify({
      last: Date.now(),
      guid
    }));
  }
};
_AdReport.URL = "https://has1.dcloud.net.cn/ahl";
_AdReport.KEY = "uni_app_ad_guid";
let AdReport = _AdReport;
class AdScript {
  static get instance() {
    if (!AdScript._instance) {
      AdScript._instance = new AdScript();
    }
    return AdScript._instance;
  }
  constructor() {
    this._callback = {};
    this._cache = {};
  }
  load(data, success, fail) {
    const provider = data.provider;
    if (this._cache[provider] === void 0) {
      this.loadScript(data);
    }
    if (this._cache[provider] === 1) {
      success();
    } else {
      if (!this._callback[provider]) {
        this._callback[provider] = [];
      }
      this._callback[provider].push({
        success,
        fail
      });
    }
  }
  loadScript(data) {
    const provider = data.provider;
    this._cache[provider] = 0;
    const domid = "uniad_provider" + provider;
    const adScriptDom = document.getElementById(domid);
    const src = adScriptDom && adScriptDom.getAttribute("src");
    if (src) {
      this._cache[provider] = 1;
      return;
    }
    var ads = document.createElement("script");
    ads.setAttribute("id", domid);
    const script = data.script;
    for (const var1 in script) {
      ads.setAttribute(var1, script[var1]);
    }
    ads.onload = () => {
      this._cache[provider] = 1;
      this._callback[provider].forEach(({ success }) => {
        success();
      });
      this._callback[provider].length = 0;
    };
    ads.onerror = (err) => {
      this._cache[provider] = void 0;
      this._callback[provider].forEach(({ fail }) => {
        fail(err);
      });
      this._callback[provider].length = 0;
    };
    document.body.append(ads);
  }
}
const CHECK_RENDER_DELAY = 1e3;
const CHECK_RENDER_RETRY = 5;
const AD_PROVIDER = {
  GDT: "2",
  TUIA: "10035"
};
class AdRender {
  constructor(props2, trigger, rootRef, options) {
    this._pi = 0;
    this._pl = [];
    this._b = {};
    this._checkTimerCount = 0;
    this._currentChannel = null;
    this._tuiaData = null;
    this._checkTimer = null;
    this._adpid = props2.adpid;
    this._adpidWidescreen = props2.adpidWidescreen;
    this._widescreenWidth = props2.widescreenWidth;
    this._trigger = trigger;
    this._rootRef = rootRef;
    this._currentAdpid = this._adpid;
    this._hasCustomTuiaMaterial = options.hasCustomTuiaMaterial;
    this._setCustomTuiaVisible = options.setCustomTuiaVisible;
  }
  renderTuiaFromCustomMaterial() {
    if (!this._tuiaData) {
      return;
    }
    this._renderTuia(this._tuiaData);
  }
  get isWidescreen() {
    return this._rootRef.value && this._rootRef.value.clientWidth > this._widescreenWidth;
  }
  load(adpid) {
    this._currentAdpid = adpid || (this.isWidescreen ? this._adpidWidescreen : this._adpid);
    this._reset();
    AdConfig.instance.get(this._currentAdpid, (b, a) => {
      this._b = b;
      this._pl = a;
      this._renderAd();
    }, (err) => {
      this._trigger("error", {}, err);
    });
  }
  dispose() {
    this._clearCheckTimer();
    if (this._rootRef.value) {
      this._rootRef.value.innerHTML = "";
    }
  }
  _renderAd() {
    if (this._pi > this._pl.length - 1) {
      return;
    }
    const data = this._pl[this._pi];
    if (!data) {
      this._renderNext();
      return;
    }
    const providerId = String(data.a1);
    const providerConfig = this._b[providerId];
    if (!providerConfig) {
      this._renderNext();
      return;
    }
    const script = providerConfig.script || providerConfig.s;
    this._currentChannel = providerId;
    const id2 = this._randomId();
    this._createView(id2);
    if (providerId === AD_PROVIDER.GDT) {
      window.TencentGDT = window.TencentGDT || [];
      AdScript.instance.load({
        provider: providerId,
        script
      }, () => {
        this._renderGdt(id2, data);
      }, (err) => {
        this._trigger("error", {}, err);
        this._renderNext();
      });
      return;
    }
    if (providerId === AD_PROVIDER.TUIA) {
      AdScript.instance.load({
        provider: providerId,
        script
      }, () => {
        this._renderTuiaMaterial(id2, data);
      }, (err) => {
        this._trigger("error", {}, err);
        this._renderNext();
      });
      return;
    }
    this._renderNext();
  }
  _createView(id2) {
    if (!this._rootRef.value) {
      return null;
    }
    var adView = document.createElement("div");
    adView.setAttribute("id", id2);
    adView.setAttribute("class", id2);
    this._rootRef.value.innerHTML = "";
    this._rootRef.value.append(adView);
    return adView;
  }
  _renderGdt(id2, data) {
    window.TencentGDT.push({
      placement_id: data.a3,
      app_id: data.a2,
      type: "native",
      count: 1,
      onComplete: (res) => {
        if (res && res.constructor === Array && res.length > 0) {
          window.TencentGDT.NATIVE.renderAd(res[0], id2);
          this._trigger("load", {}, {});
        } else {
          this._trigger("error", {}, res || { errMsg: "No advertisement" });
          this._renderNext();
        }
      }
    });
    this._startCheckTimer();
  }
  _renderTuiaMaterial(id2, data) {
    const adView = document.getElementById(id2);
    if (!adView) {
      this._trigger("error", {}, { errMsg: "Invalid ad container" });
      this._renderNext();
      return;
    }
    this._tuiaData = data;
    if (this._hasCustomTuiaMaterial()) {
      adView.innerHTML = "";
      this._setCustomTuiaVisible(true);
      this.report(40, this._currentChannel || void 0);
      this._trigger("load", {}, {});
      return;
    }
    this._setCustomTuiaVisible(false);
    const materialSrc = this._getRandomTuiaMaterial(data == null ? void 0 : data.imgs, data == null ? void 0 : data.img);
    if (!materialSrc) {
      this._trigger("error", {}, { errMsg: "Invalid tuia material imgs/img" });
      this._renderNext();
      return;
    }
    const img = document.createElement("img");
    img.src = materialSrc;
    img.onerror = () => {
      this._trigger("error", {}, { errMsg: "Tuia material load fail" });
      this._renderNext();
    };
    img.alt = "ad";
    img.setAttribute("draggable", "false");
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.cursor = "pointer";
    img.onclick = () => {
      this._renderTuia(data);
    };
    adView.innerHTML = "";
    adView.append(img);
    this.report(40, this._currentChannel || void 0);
    this._trigger("load", {}, {});
  }
  _getRandomTuiaMaterial(imgs, img) {
    if (Array.isArray(imgs)) {
      const list = imgs.filter((item) => typeof item === "string" && item);
      if (list.length) {
        const index2 = Math.floor(Math.random() * list.length);
        return list[index2];
      }
    }
    if (typeof img === "string") {
      return img;
    }
    return "";
  }
  _renderTuia(data) {
    this._setCustomTuiaVisible(false);
    const tuia = window.TuiaSDKLite;
    if (!tuia || typeof tuia.execute !== "function") {
      this._trigger("error", {}, { errMsg: "Invalid TuiaSDKLite" });
      this._renderNext();
      return;
    }
    tuia.execute({
      data: {
        pid: data.a3,
        fail_message: "ad load fail",
        product_name: document.title || location.hostname
      },
      success: (res) => {
        this._trigger("load", {}, res || {});
      },
      fail: (err) => {
        this._trigger("error", {}, err || { errMsg: "TuiaSDKLite execute fail" });
        this._renderNext();
      }
    });
  }
  _renderAdView(provider, data) {
    var randomId = this._randomId();
    var adView = document.createElement("div");
    adView.setAttribute("class", randomId);
    this._rootRef.value.innerHTML = "";
    this._rootRef.value.append(adView);
    const scriptPath = provider.s || provider.script;
    if (!scriptPath || typeof scriptPath !== "string") {
      this._trigger("error", {}, { errMsg: "Invalid provider script" });
      this._renderNext();
      return;
    }
    try {
      let bindThis = window;
      const fn = scriptPath.split(".").reduce((total, currentValue) => {
        bindThis = total;
        return total[currentValue];
      }, window);
      fn.bind(bindThis)(data.a2, randomId, 2);
    } catch (err) {
      this._trigger("error", {}, err);
      this._renderNext();
      return;
    }
    this._startCheckTimer();
  }
  _renderNext() {
    if (this._pi >= this._pl.length - 1) {
      return;
    }
    this._pi++;
    this._renderAd();
  }
  _checkRender() {
    if (!this._rootRef.value) {
      return false;
    }
    var hasContent = this._rootRef.value.children.length > 0 && this._rootRef.value.clientHeight > 40;
    if (hasContent) {
      this.report(40, this._currentChannel || void 0);
    }
    return hasContent;
  }
  _startCheckTimer() {
    this._clearCheckTimer();
    this._checkTimer = setInterval(() => {
      this._checkTimerCount++;
      if (this._checkTimerCount >= CHECK_RENDER_RETRY) {
        this._clearCheckTimer();
        this._renderNext();
        return;
      }
      if (this._checkRender()) {
        this._clearCheckTimer();
      }
    }, CHECK_RENDER_DELAY);
  }
  _clearCheckTimer() {
    this._checkTimerCount = 0;
    if (this._checkTimer != null) {
      window.clearInterval(this._checkTimer);
      this._checkTimer = null;
    }
  }
  report(type, currentChannel) {
    const compilerVersion = typeof __uniConfig !== "undefined" ? __uniConfig.compilerVersion ?? "" : "";
    const reportData = {
      h: compilerVersion,
      a: this._currentAdpid,
      at: type
    };
    if (currentChannel) {
      reportData.t = currentChannel;
    }
    AdReport.instance.get(reportData);
  }
  _randomId() {
    var result = "";
    for (let i = 0; i < 4; i++) {
      result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
    }
    return "_u" + result;
  }
  _reset() {
    this._b = {};
    this._pl = [];
    this._pi = 0;
    this._tuiaData = null;
    this._setCustomTuiaVisible(false);
    this._clearCheckTimer();
    if (this._rootRef.value) {
      this._rootRef.value.innerHTML = "";
    }
  }
}
const DEFAULT_WIDESCREEN_WIDTH = 750;
const index$5 = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "Ad",
  props: {
    adpid: {
      type: String,
      default: ""
    },
    adpidWidescreen: {
      type: String,
      default: ""
    },
    widescreenWidth: {
      type: Number,
      default: DEFAULT_WIDESCREEN_WIDTH
    }
  },
  setup(props2, { emit: emit2, slots }) {
    const rootRef = Vue.ref(null);
    const customTuiaVisible = Vue.ref(false);
    const { $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
    const trigger = useCustomEvent(rootRef, emit2);
    const ad = new AdRender(props2, trigger, rootRef, {
      hasCustomTuiaMaterial: () => Boolean(slots.default && slots.default().length),
      setCustomTuiaVisible: (visible) => {
        customTuiaVisible.value = visible;
      }
    });
    Vue.watch(() => props2.adpid, (val) => {
      ad.load(val);
    });
    Vue.watch(() => props2.adpidWidescreen, (val) => {
      ad.load(val);
    });
    return () => {
      const { adpid, adpidWidescreen, widescreenWidth } = props2;
      return (() => {
        const _setTemplateRef = Vue.createTemplateRefSetter();
        const _n6 = Vue.createPlainElement("uni-ad", { $: [
          () => $listeners.value,
          () => $excludeAttrs.value,
          {
            adpid: () => adpid,
            adpidWidescreen: () => adpidWidescreen,
            widescreenWidth: () => widescreenWidth
          }
        ] }, () => {
          const _n0 = _t0();
          Vue.on(_n0, "click", () => ad.report(41));
          Vue.renderEffect(() => _setTemplateRef(_n0, rootRef));
          const _n1 = Vue.createIf(() => customTuiaVisible.value && slots.default, () => {
            const _n3 = _t1();
            Vue.on(_n3, "click", () => ad.renderTuiaFromCustomMaterial());
            const _x3 = Vue.txt(_n3);
            setNodes(_x3, () => slots.default());
            return _n3;
          }, () => {
            const _n5 = createNodes(null);
            return _n5;
          }, 265);
          return [_n0, _n1];
        });
        return _n6;
      })();
    };
  }
});
const index$4 = /* @__PURE__ */ defineUnsupportedComponent("ad-content-page");
const index$3 = /* @__PURE__ */ defineUnsupportedComponent("ad-draw");
const index$2 = /* @__PURE__ */ defineUnsupportedComponent("camera");
const index$1 = /* @__PURE__ */ defineUnsupportedComponent("live-player");
const index = /* @__PURE__ */ defineUnsupportedComponent("live-pusher");
const UniViewJSBridge$1 = /* @__PURE__ */ shared.extend(ViewJSBridge, {
  publishHandler(event, args, pageId) {
    UniServiceJSBridge.subscribeHandler(event, args, pageId);
  }
});
const request = /* @__PURE__ */ defineTaskApi(
  API_REQUEST,
  ({
    url,
    data,
    header = {},
    method,
    dataType: dataType2,
    responseType,
    enableChunked,
    withCredentials,
    timeout = __uniConfig.networkTimeout.request,
    // @ts-expect-error 内部isUTS参数
    isUTS
  }, { resolve, reject }) => {
    {
      timeout = timeout == null ? __uniConfig.networkTimeout.request : timeout;
    }
    let body = null;
    const contentType = normalizeContentType(header);
    if (method !== "GET") {
      if (shared.isString(data) || data instanceof ArrayBuffer) {
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
            if (shared.hasOwn(data, key)) {
              bodyArray.push(
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
              );
            }
          }
          body = bodyArray.join("&");
        } else {
          body = data.toString();
        }
      }
    }
    let requestTask;
    if (!enableChunked) {
      const xhr = new XMLHttpRequest();
      requestTask = new RequestTask(xhr);
      xhr.open(method, url);
      for (const key in header) {
        if (shared.hasOwn(header, key)) {
          xhr.setRequestHeader(key, header[key]);
        }
      }
      const timer = setTimeout(function() {
        xhr.onload = xhr.onabort = xhr.onerror = null;
        requestTask.abort();
        reject("timeout", { errCode: 5 });
      }, timeout);
      xhr.responseType = responseType;
      xhr.onload = function() {
        clearTimeout(timer);
        const statusCode = xhr.status;
        let res = responseType === "text" ? xhr.responseText : xhr.response;
        if (responseType === "text") {
          res = parseResponseText(res, responseType, dataType2);
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
        reject("abort", { errCode: 600003 });
      };
      xhr.onerror = function() {
        clearTimeout(timer);
        reject(void 0, { errCode: 5 });
      };
      xhr.withCredentials = withCredentials;
      xhr.send(body);
    } else {
      if (typeof window.fetch === void 0 || typeof window.AbortController === void 0) {
        throw new Error(
          "fetch or AbortController is not supported in this environment"
        );
      }
      const controller = new AbortController();
      const signal = controller.signal;
      requestTask = new RequestTask(controller);
      const fetchOptions = {
        method,
        headers: header,
        body,
        signal,
        credentials: withCredentials ? "include" : "same-origin"
      };
      const timer = setTimeout(function() {
        requestTask.abort();
        reject("timeout", { errCode: 5 });
      }, timeout);
      fetchOptions.signal.addEventListener("abort", function() {
        clearTimeout(timer);
        reject("abort", { errCode: 600003 });
      });
      window.fetch(url, fetchOptions).then(
        (response) => {
          const statusCode = response.status;
          const header2 = response.headers;
          const body2 = response.body;
          const headerObj = {};
          header2.forEach((value, key) => {
            headerObj[key] = value;
          });
          const cookies = cookiesParse(headerObj);
          requestTask._emitter.emit("headersReceived", {
            header: headerObj,
            statusCode,
            cookies
          });
          if (!body2) {
            resolve({
              data: "",
              statusCode,
              header: headerObj,
              cookies
            });
            return;
          }
          const reader = body2.getReader();
          const bodyBuffers = [];
          const streamReaderRead = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                const result = concatArrayBuffers(bodyBuffers);
                let res = responseType === "text" ? new TextDecoder().decode(result) : result;
                if (responseType === "text") {
                  res = parseResponseText(res, responseType, dataType2, isUTS);
                }
                resolve({
                  data: res,
                  statusCode,
                  header: headerObj,
                  cookies
                });
                return;
              }
              const chunk = value;
              bodyBuffers.push(chunk);
              requestTask._emitter.emit("chunkReceived", {
                data: chunk
              });
              streamReaderRead();
            });
          };
          streamReaderRead();
        },
        (error) => {
          reject(error, { errCode: 5 });
        }
      );
    }
    return requestTask;
  },
  RequestProtocol,
  RequestOptions
);
const cookiesParse = (header) => {
  let cookiesStr = header["Set-Cookie"] || header["set-cookie"];
  let cookiesArr = [];
  if (!cookiesStr) {
    return [];
  }
  if (cookiesStr[0] === "[" && cookiesStr[cookiesStr.length - 1] === "]") {
    cookiesStr = cookiesStr.slice(1, -1);
  }
  const handleCookiesArr = cookiesStr.split(";");
  for (let i = 0; i < handleCookiesArr.length; i++) {
    if (handleCookiesArr[i].indexOf("Expires=") !== -1 || handleCookiesArr[i].indexOf("expires=") !== -1) {
      cookiesArr.push(handleCookiesArr[i].replace(",", ""));
    } else {
      cookiesArr.push(handleCookiesArr[i]);
    }
  }
  cookiesArr = cookiesArr.join(";").split(",");
  return cookiesArr;
};
function concatArrayBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  }
  return result.buffer;
}
function normalizeContentType(header) {
  const name = Object.keys(header).find(
    (name2) => name2.toLowerCase() === "content-type"
  );
  if (!name) {
    return;
  }
  const contentType = header[name];
  if (name !== "Content-Type") {
    header["Content-Type"] = header[name];
    delete header[name];
  }
  if (!contentType) {
    return "string";
  }
  if (contentType.indexOf("application/json") === 0) {
    return "json";
  } else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) {
    return "urlencoded";
  }
  return "string";
}
class RequestTask {
  constructor(controller) {
    this._requestOnChunkReceiveCallbackId = 0;
    this._requestOnChunkReceiveCallbacks = /* @__PURE__ */ new Map();
    this._requestOnHeadersReceiveCallbackId = 0;
    this._requestOnHeadersReceiveCallbacks = /* @__PURE__ */ new Map();
    this._emitter = new uniShared.Emitter();
    this._controller = controller;
  }
  abort() {
    if (this._controller) {
      this._controller.abort();
      delete this._controller;
    }
  }
  onHeadersReceived(callback) {
    this._emitter.on("headersReceived", callback);
    this._requestOnHeadersReceiveCallbackId++;
    this._requestOnHeadersReceiveCallbacks.set(
      this._requestOnHeadersReceiveCallbackId,
      callback
    );
    return this._requestOnHeadersReceiveCallbackId;
  }
  offHeadersReceived(callback) {
    if (callback == null) {
      this._emitter.off("headersReceived");
      return;
    }
    if (typeof callback === "function") {
      this._requestOnHeadersReceiveCallbacks.forEach((cb, id2) => {
        if (cb === callback) {
          this._requestOnHeadersReceiveCallbacks.delete(id2);
          this._emitter.off("headersReceived", callback);
        }
      });
      return;
    }
    const callbackFn = this._requestOnHeadersReceiveCallbacks.get(callback);
    if (!callbackFn) {
      return;
    }
    this._requestOnHeadersReceiveCallbacks.delete(callback);
    this._emitter.off("headersReceived", callbackFn);
  }
  onChunkReceived(callback) {
    this._emitter.on("chunkReceived", callback);
    this._requestOnChunkReceiveCallbackId++;
    this._requestOnChunkReceiveCallbacks.set(
      this._requestOnChunkReceiveCallbackId,
      callback
    );
    return this._requestOnChunkReceiveCallbackId;
  }
  offChunkReceived(callback) {
    if (callback == null) {
      this._emitter.off("chunkReceived");
      return;
    }
    if (typeof callback === "function") {
      this._requestOnChunkReceiveCallbacks.forEach((cb, id2) => {
        if (cb === callback) {
          this._requestOnChunkReceiveCallbacks.delete(id2);
          this._emitter.off("chunkReceived", callback);
        }
      });
      return;
    }
    const callbackFn = this._requestOnChunkReceiveCallbacks.get(callback);
    if (!callbackFn) {
      return;
    }
    this._requestOnChunkReceiveCallbacks.delete(callback);
    this._emitter.off("chunkReceived", callbackFn);
  }
}
function parseHeaders(headers) {
  const headersObject = {};
  headers.split(uniShared.LINEFEED).forEach((header) => {
    const find = header.match(/(\S+\s*):\s*(.*)/);
    if (!find || find.length !== 3) {
      return;
    }
    headersObject[find[1]] = find[2];
  });
  return headersObject;
}
function parseResponseText(responseText, responseType, dataType2, isUTS) {
  let res = responseText;
  if (responseType === "text" && dataType2 === "json") {
    try {
      if (isUTS) {
        res = UTS.JSON.parse(res) || res;
      } else {
        res = JSON.parse(res);
      }
    } catch (error) {
    }
  }
  return res;
}
const STORAGE_KEYS = "uni-storage-keys";
function parseValue(value, isUTS) {
  const types = ["object", "string", "number", "boolean", "undefined"];
  try {
    const object = shared.isString(value) ? JSON.parse(value) : value;
    const type = object.type;
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object);
      if (keys.length === 2 && "data" in object) {
        if (typeof object.data === type) {
          if (type === "object" && isUTS) {
            return UTS.JSON.parse(JSON.stringify(object.data));
          }
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
const setStorageSync = /* @__PURE__ */ defineSyncApi(
  API_SET_STORAGE_SYNC,
  (key, data) => {
    const type = typeof data;
    const value = type === "string" ? data : JSON.stringify({
      type,
      data
    });
    localStorage.setItem(key, value);
  },
  SetStorageSyncProtocol
);
const setStorage = /* @__PURE__ */ defineAsyncApi(
  API_SET_STORAGE,
  ({ key, data }, { resolve, reject }) => {
    try {
      setStorageSync(key, data);
      resolve();
    } catch (error) {
      reject(error.message);
    }
  },
  SetStorageProtocol
);
function getStorageOrigin(key, isUTS) {
  const value = localStorage && localStorage.getItem(key);
  if (!shared.isString(value)) {
    throw new Error("data not found");
  }
  let data = value;
  try {
    const object = JSON.parse(value);
    const result = parseValue(object, isUTS);
    if (result !== void 0) {
      data = result;
    }
  } catch (error) {
  }
  return data;
}
const getStorageSync = /* @__PURE__ */ defineSyncApi(
  API_GET_STORAGE_SYNC,
  // @ts-expect-error 内部isUTS参数
  (key, isUTS) => {
    try {
      return getStorageOrigin(key, isUTS);
    } catch (error) {
      return "";
    }
  },
  GetStorageSyncProtocol
);
const getStorage = /* @__PURE__ */ defineAsyncApi(
  API_GET_STORAGE,
  // @ts-expect-error 内部isUTS参数
  ({ key, isUTS }, { resolve, reject }) => {
    try {
      const data = getStorageOrigin(key, isUTS);
      resolve({
        data
      });
    } catch (error) {
      reject(error.message);
    }
  },
  GetStorageProtocol
);
const removeStorageSync = /* @__PURE__ */ defineSyncApi(
  API_REMOVE_STORAGE,
  (key) => {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  },
  RemoveStorageSyncProtocol
);
const removeStorage = /* @__PURE__ */ defineAsyncApi(
  API_REMOVE_STORAGE,
  ({ key }, { resolve }) => {
    removeStorageSync(key);
    resolve();
  },
  RemoveStorageProtocol
);
const clearStorageSync = /* @__PURE__ */ defineSyncApi(
  "clearStorageSync",
  () => {
    if (localStorage) {
      localStorage.clear();
    }
  }
);
const clearStorage = /* @__PURE__ */ defineAsyncApi(
  "clearStorage",
  (_, { resolve }) => {
    clearStorageSync();
    resolve();
  }
);
const getStorageInfoSync = /* @__PURE__ */ defineSyncApi(
  "getStorageInfoSync",
  () => {
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
  }
);
const getStorageInfo = /* @__PURE__ */ defineAsyncApi(
  "getStorageInfo",
  (_, { resolve }) => {
    resolve(getStorageInfoSync());
  }
);
let browserInfo;
function initBrowserInfo() {
  {
    return browserInfo = {};
  }
}
const getDeviceInfo = /* @__PURE__ */ defineSyncApi(
  "getDeviceInfo",
  () => {
    initBrowserInfo();
    const {
      deviceBrand,
      deviceModel,
      brand,
      model,
      platform,
      system,
      deviceOrientation,
      deviceType,
      osname,
      osversion
    } = browserInfo;
    return shared.extend({
      brand,
      deviceBrand,
      deviceModel,
      devicePixelRatio: 1,
      deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
      deviceOrientation,
      deviceType,
      model,
      osName: osname ? osname.toLowerCase() : void 0,
      osVersion: osversion,
      platform,
      system
    });
  }
);
const getAppBaseInfo = /* @__PURE__ */ defineSyncApi(
  "getAppBaseInfo",
  () => {
    initBrowserInfo();
    const { theme, language, browserName, browserVersion } = browserInfo;
    return shared.extend(
      {
        appId: __uniConfig.appId,
        appName: __uniConfig.appName,
        appVersion: __uniConfig.appVersion,
        appVersionCode: __uniConfig.appVersionCode,
        appLanguage: getLocale ? getLocale() : language,
        enableDebug: false,
        hostSDKVersion: void 0,
        hostPackageName: void 0,
        hostFontSizeSetting: void 0,
        hostName: browserName,
        hostVersion: browserVersion,
        hostTheme: theme,
        hostLanguage: language,
        isUniAppX: true,
        language,
        SDKVersion: "",
        theme,
        uniPlatform: "web",
        uniCompileVersion: __uniConfig.compilerVersion,
        uniCompilerVersion: __uniConfig.compilerVersion,
        uniRuntimeVersion: __uniConfig.compilerVersion,
        version: ""
      },
      {
        uniCompilerVersionCode: parseFloat(__uniConfig.compilerVersion),
        uniRuntimeVersionCode: parseFloat(__uniConfig.compilerVersion),
        uniRuntimeVersion: __uniConfig.compilerVersion
      }
    );
  }
);
const getSystemInfoSync = /* @__PURE__ */ defineSyncApi(
  "getSystemInfoSync",
  () => {
    {
      return {
        deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
        platform: "nodejs"
      };
    }
  }
);
function setNavigationBar(pageMeta, type, args, resolve, reject) {
  if (!pageMeta) {
    return reject("page not found");
  }
  const { navigationBar } = pageMeta;
  switch (type) {
    case API_SET_NAVIGATION_BAR_COLOR:
      const { frontColor, backgroundColor, animation: animation2 } = args;
      const { duration, timingFunc } = animation2;
      if (frontColor) {
        navigationBar.titleColor = frontColor === "#000000" ? "#000000" : "#ffffff";
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
      const { title } = args;
      navigationBar.titleText = title;
      {
        updateDocumentTitle(args.title);
      }
      break;
  }
  resolve();
}
const setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(
  API_SET_NAVIGATION_BAR_TITLE,
  (args, { resolve, reject }) => {
    setNavigationBar(
      getCurrentPageMeta(),
      API_SET_NAVIGATION_BAR_TITLE,
      args,
      resolve,
      reject
    );
  },
  SetNavigationBarTitleProtocol
);
require("localstorage-polyfill");
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const api = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearStorage,
  clearStorageSync,
  getAppBaseInfo,
  getDeviceInfo,
  getStorage,
  getStorageInfo,
  getStorageInfoSync,
  getStorageSync,
  getSystemInfoSync,
  removeStorage,
  removeStorageSync,
  request,
  setNavigationBarTitle,
  setStorage,
  setStorageSync
}, Symbol.toStringTag, { value: "Module" });
const uni$1 = api;
const UniServiceJSBridge$1 = /* @__PURE__ */ shared.extend(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    UniViewJSBridge.subscribeHandler(event, args, pageId);
  }
});
const t0$1 = Vue.template("<img>");
const t1$1 = Vue.template("<div class=uni-tabbar__mid>");
const t2$1 = Vue.template("<div class=uni-tabbar__iconfont> ");
const t3$1 = Vue.template("<div>");
const t4$1 = Vue.template("<div class=uni-tabbar__label> ");
const t5 = Vue.template("<div> ");
const t6 = Vue.template("<div class=uni-tabbar__item><!><div class=uni-tabbar__bd></div>");
const t7 = Vue.template("<div class=uni-tabbar><div class=uni-tabbar-border></div></div>");
const t8 = Vue.template("<div class=uni-placeholder>");
const DEFAULT_BG_COLOR = "#f7f7fa";
const BLUR_EFFECT_COLOR_DARK = "rgb(0, 0, 0, 0.8)";
const BLUR_EFFECT_COLOR_LIGHT = "rgb(250, 250, 250, 0.8)";
const _sfc_main$1 = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "TabBar",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "tabBar",
  setup(__props) {
    const hasMidButton = __UNI_FEATURE_TABBAR_MIDBUTTON__;
    const _middleButton = {
      width: "50px",
      height: "50px",
      iconWidth: "24px"
    };
    const visibleList = Vue.ref([]);
    const tabBar = useTabBar();
    useVisibleList(tabBar, visibleList);
    useTabBarCssVar(tabBar);
    const onSwitchTab = useSwitchTab(vueRouter.useRoute(), tabBar, visibleList);
    const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar);
    function useTabBarCssVar(tabBar2) {
      Vue.watch(
        () => tabBar2.shown,
        (value) => {
          updatePageCssVar({
            "--window-bottom": normalizeWindowBottom(
              value ? parseInt(tabBar2.height) : 0
            )
          });
        }
      );
    }
    function useVisibleList(tabBar2, visibleList2) {
      const internalMidButton = Vue.ref(
        shared.extend({ type: "midButton" }, tabBar2.midButton)
      );
      function setVisibleList() {
        let tempList = [];
        tempList = tabBar2.list.filter((item) => item.visible !== false);
        if (hasMidButton && tabBar2.midButton) {
          internalMidButton.value = shared.extend(
            {},
            _middleButton,
            internalMidButton.value,
            tabBar2.midButton
          );
          tempList = tempList.filter((item) => !isMidButton(item));
          if (tempList.length % 2 === 0) {
            tempList.splice(
              Math.floor(tempList.length / 2),
              0,
              internalMidButton.value
            );
          }
        }
        visibleList2.value = tempList;
      }
      Vue.watchEffect(setVisibleList);
    }
    function useSwitchTab(route, tabBar2, visibleList2) {
      Vue.watchEffect(() => {
        const meta = route.meta;
        if (meta.isTabBar) {
          const pagePath = meta.route;
          const index2 = visibleList2.value.findIndex(
            (item) => item.pagePath === pagePath
          );
          tabBar2.selectedIndex = index2;
        }
      });
      return (tabBarItem, index2) => {
        const { type } = tabBarItem;
        if (hasMidButton && type === "midButton") {
          return UniServiceJSBridge.invokeOnCallback(
            API_ON_TAB_BAR_MID_BUTTON_TAP
          );
        }
        const { pagePath, text } = tabBarItem;
        let url = uniShared.addLeadingSlash(pagePath);
        if (url === __uniRoutes[0].alias) {
          url = "/";
        }
        if (route.path !== url) {
          uni.switchTab({ from: "tabBar", url, tabBarText: text });
        } else {
          invokeHook("onTabItemTap", {
            index: index2,
            text,
            pagePath
          });
        }
      };
    }
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
      const style2 = Vue.computed(() => {
        let backgroundColor = tabBar2.backgroundColor;
        const blurEffect = tabBar2.blurEffect;
        if (!backgroundColor) {
          if (blurEffect && blurEffect !== "none") {
            backgroundColor = BLUR_EFFECT_COLORS[blurEffect];
          }
        }
        return {
          backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
          backdropFilter: blurEffect !== "none" ? "blur(10px)" : blurEffect
        };
      });
      const borderStyle2 = Vue.computed(() => {
        const { borderStyle: borderStyle3, borderColor } = tabBar2;
        if (borderColor && shared.isString(borderColor)) {
          return {
            backgroundColor: borderColor
          };
        }
        return {
          backgroundColor: BORDER_COLORS[borderStyle3] || BORDER_COLORS["black"]
        };
      });
      const placeholderStyle2 = Vue.computed(() => {
        return {
          height: tabBar2.height
        };
      });
      return {
        style: style2,
        borderStyle: borderStyle2,
        placeholderStyle: placeholderStyle2
      };
    }
    function isMidButton(item) {
      return item.type === "midButton";
    }
    function isRenderedMidButton(item) {
      return hasMidButton && isMidButton(item);
    }
    function getMidButton(item) {
      return item;
    }
    function getItemStyle(item) {
      if (!isRenderedMidButton(item)) {
        return;
      }
      return {
        flex: "0 0 " + item.width,
        position: "relative"
      };
    }
    function getMidButtonStyle(item) {
      const { width, height, backgroundImage } = getMidButton(item);
      return {
        width,
        height,
        backgroundImage: backgroundImage ? "url('" + getRealPath(backgroundImage) + "')" : "none"
      };
    }
    function isSelected(index2) {
      return tabBar.selectedIndex === index2;
    }
    function getTextColor(index2) {
      return isSelected(index2) ? tabBar.selectedColor : tabBar.color;
    }
    function getIconPath(item, index2) {
      return (isSelected(index2) ? item.selectedIconPath || item.iconPath : item.iconPath) || "";
    }
    function getIconfontText(item, index2) {
      if (!item.iconfont) {
        return;
      }
      return isSelected(index2) ? item.iconfont.selectedText || item.iconfont.text : item.iconfont.text;
    }
    function getIconfontColor(item, index2) {
      if (!item.iconfont) {
        return;
      }
      return isSelected(index2) ? item.iconfont.selectedColor || item.iconfont.color : item.iconfont.color;
    }
    function getIconClass(item) {
      return "uni-tabbar__icon" + (item.text ? " uni-tabbar__icon__diff" : "");
    }
    function getIconStyle() {
      return { width: tabBar.iconWidth, height: tabBar.iconWidth };
    }
    function getIconfontStyle(item, index2) {
      var _a;
      return {
        fontSize: ((_a = item.iconfont) == null ? void 0 : _a.fontSize) || tabBar.iconWidth,
        color: getIconfontColor(item, index2) || BLUR_EFFECT_COLOR_DARK
      };
    }
    function getLabelStyle(item, index2) {
      return {
        color: getTextColor(index2),
        fontSize: tabBar.fontSize,
        lineHeight: !item.iconPath ? 1.8 : "normal",
        marginTop: !item.iconPath ? "inherit" : tabBar.spacing
      };
    }
    const n31 = Vue.createPlainElement("uni-tabbar", { class: () => "uni-tabbar-" + Vue.unref(tabBar).position }, null, true);
    const n29 = t7();
    Vue.insert(n29, n31);
    const n0 = Vue.child(n29);
    Vue.renderEffect(() => {
      Vue.setStyle(n29, Vue.unref(style));
      Vue.setStyle(n0, Vue.unref(borderStyle));
    });
    Vue.setInsertionState(n29, 1);
    Vue.createFor(
      () => visibleList.value,
      (_for_item0, _for_key0) => {
        const n28 = t6();
        const n27 = Vue.child(n28);
        const n26 = Vue.next(n27);
        Vue.renderEffect(() => Vue.setStyle(n28, getItemStyle(_for_item0.value)));
        Vue.setInsertionState(n28, n27);
        Vue.createIf(() => isRenderedMidButton(_for_item0.value), () => {
          const n8 = t1$1();
          Vue.renderEffect(() => Vue.setStyle(n8, getMidButtonStyle(_for_item0.value)));
          Vue.setInsertionState(n8);
          Vue.createIf(() => getIconPath(_for_item0.value, _for_key0.value), () => {
            const n7 = t0$1();
            Vue.renderEffect(() => {
              Vue.setStyle(n7, {
                width: getMidButton(_for_item0.value).iconWidth,
                height: getMidButton(_for_item0.value).iconWidth
              });
              Vue.setProp(n7, "src", Vue.unref(getRealPath)(getIconPath(_for_item0.value, _for_key0.value)));
            });
            return n7;
          });
          return n8;
        });
        Vue.renderEffect(() => Vue.setStyle(n26, { height: Vue.unref(tabBar).height }));
        Vue.setInsertionState(n26);
        Vue.createIf(
          () => getIconfontText(_for_item0.value, _for_key0.value),
          () => {
            const n14 = t3$1();
            Vue.renderEffect(() => {
              Vue.setClass(n14, getIconClass(_for_item0.value));
              Vue.setStyle(n14, getIconStyle());
            });
            Vue.setInsertionState(n14);
            Vue.createIf(() => _for_item0.value.type !== "midButton", () => {
              const n13 = t2$1();
              const x13 = Vue.txt(n13);
              Vue.renderEffect(() => {
                const _item = _for_item0.value;
                const _index = _for_key0.value;
                Vue.setStyle(n13, getIconfontStyle(_item, _index));
                Vue.setText(x13, Vue.toDisplayString(getIconfontText(_item, _index)));
              });
              return n13;
            });
            return n14;
          },
          () => Vue.createIf(() => getIconPath(_for_item0.value, _for_key0.value), () => {
            const n19 = t3$1();
            Vue.renderEffect(() => {
              Vue.setClass(n19, getIconClass(_for_item0.value));
              Vue.setStyle(n19, getIconStyle());
            });
            Vue.setInsertionState(n19);
            Vue.createIf(() => _for_item0.value.type !== "midButton", () => {
              const n18 = t0$1();
              Vue.renderEffect(() => Vue.setProp(n18, "src", Vue.unref(getRealPath)(getIconPath(_for_item0.value, _for_key0.value))));
              return n18;
            });
            return n19;
          }),
          1029
          /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_3 */
        );
        Vue.setInsertionState(n26, 1);
        Vue.createIf(() => _for_item0.value.text, () => {
          const n22 = t4$1();
          const x22 = Vue.txt(n22);
          Vue.renderEffect(() => {
            const _item = _for_item0.value;
            Vue.setStyle(n22, getLabelStyle(_item, _for_key0.value));
            Vue.setText(x22, Vue.toDisplayString(_item.text));
          });
          return n22;
        });
        Vue.setInsertionState(n26, 2);
        Vue.createIf(() => _for_item0.value.redDot, () => {
          const n25 = t5();
          const x25 = Vue.txt(n25);
          Vue.renderEffect(() => {
            const _item_badge = _for_item0.value.badge;
            Vue.setClass(n25, [
              "uni-tabbar__reddot",
              _item_badge ? "uni-tabbar__badge" : ""
            ]);
            Vue.setText(x25, Vue.toDisplayString(_item_badge));
          });
          return n25;
        });
        Vue.on(n28, "click", () => Vue.unref(onSwitchTab)(_for_item0.value, _for_key0.value));
        return n28;
      },
      (item, index2) => isRenderedMidButton(item) ? "midButton" : index2,
      8
      /* IS_SINGLE_NODE */
    );
    const n30 = t8();
    Vue.insert(n30, n31);
    Vue.renderEffect(() => Vue.setStyle(n30, Vue.unref(placeholderStyle)));
    return n31;
  }
});
const t0 = Vue.template("<div class=uni-top-window></div>");
const t1 = Vue.template("<div class=uni-top-window--placeholder>");
const t2 = Vue.template("<div class=uni-mask>");
const t3 = Vue.template("<div class=uni-left-window>");
const t4 = Vue.template("<div class=uni-right-window>");
const _sfc_main = /* @__PURE__ */ Vue.defineVaporComponent({
  ...{
    name: "Layout",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "index-vapor",
  setup(__props) {
    const hasPages = __UNI_FEATURE_PAGES__;
    const hasResponsive = __UNI_FEATURE_RESPONSIVE__;
    const hasTopWindow = __UNI_FEATURE_TOPWINDOW__;
    const hasLeftWindow = __UNI_FEATURE_LEFTWINDOW__;
    const hasRightWindow = __UNI_FEATURE_RIGHTWINDOW__;
    const hasTabBar = __UNI_FEATURE_TABBAR__;
    const rootRef = Vue.ref(null);
    const firstPageComponent = !hasPages && __uniRoutes[0].component;
    const keepAliveRoute = hasPages ? useKeepAliveRoute() : void 0;
    const routeKey = keepAliveRoute == null ? void 0 : keepAliveRoute.routeKey;
    const isTabBar = keepAliveRoute == null ? void 0 : keepAliveRoute.isTabBar;
    const routeCache2 = keepAliveRoute == null ? void 0 : keepAliveRoute.routeCache;
    const route = hasPages ? vueRouter.useRoute() : void 0;
    const { layoutState, windowState } = useState2();
    useMaxWidth(layoutState, rootRef);
    const topWindow = hasTopWindow && useTopWindow(layoutState);
    const leftWindow = hasLeftWindow && useLeftWindow(layoutState);
    const rightWindow = hasRightWindow && useRightWindow(layoutState);
    const TopWindow = topWindow && topWindow.component;
    const LeftWindow = leftWindow && leftWindow.component;
    const RightWindow = rightWindow && rightWindow.component;
    const topWindowRef = topWindow && topWindow.windowRef;
    const leftWindowRef = leftWindow && leftWindow.windowRef;
    const rightWindowRef = rightWindow && rightWindow.windowRef;
    const showTabBar = hasTabBar && useShowTabBar();
    const clazz = useAppClass(showTabBar);
    function useAppClass(showTabBar2) {
      const showMaxWidth = Vue.ref(false);
      return Vue.computed(() => {
        return {
          "uni-app--showtabbar": showTabBar2 && showTabBar2.value,
          "uni-app--maxwidth": showMaxWidth.value
        };
      });
    }
    function initMediaQuery(minWidth, callback) {
      {
        return false;
      }
    }
    function useMaxWidth(layoutState2, rootRef2) {
      const route2 = usePageRoute();
      function checkMaxWidth() {
        const windowWidth = document.body.clientWidth;
        const pages = getCurrentBasePages();
        let meta = {};
        if (pages.length > 0) {
          const curPage = pages[pages.length - 1];
          meta = getPage$BasePage(curPage).meta;
        } else {
          const routeOptions = getRouteOptions(route2.path, true);
          if (routeOptions) {
            meta = routeOptions.meta;
          }
        }
        const maxWidth = parseInt(
          String(
            (shared.hasOwn(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER
          )
        );
        let showMaxWidth = false;
        if (windowWidth > maxWidth) {
          showMaxWidth = true;
        } else {
          showMaxWidth = false;
        }
        if (showMaxWidth && maxWidth) {
          layoutState2.marginWidth = (windowWidth - maxWidth) / 2;
          Vue.nextTick(() => {
            const rootEl = rootRef2.value;
            if (rootEl) {
              rootEl.setAttribute(
                "style",
                "max-width:" + maxWidth + "px;margin:0 auto;"
              );
            }
          });
        } else {
          layoutState2.marginWidth = 0;
          Vue.nextTick(() => {
            const rootEl = rootRef2.value;
            if (rootEl) {
              rootEl.removeAttribute("style");
            }
          });
        }
      }
      Vue.watch([() => route2.path], checkMaxWidth);
    }
    function useState2() {
      const route2 = usePageRoute();
      if (!hasResponsive) {
        const layoutState3 = Vue.reactive({
          marginWidth: 0,
          leftWindowWidth: 0,
          rightWindowWidth: 0
        });
        Vue.watch(
          () => layoutState3.marginWidth,
          (value) => updateCssVar({ "--window-margin": value + "px" })
        );
        Vue.watch(
          () => layoutState3.leftWindowWidth + layoutState3.marginWidth,
          (value) => {
            updateCssVar({ "--window-left": value + "px" });
          }
        );
        Vue.watch(
          () => layoutState3.rightWindowWidth + layoutState3.marginWidth,
          (value) => {
            updateCssVar({ "--window-right": value + "px" });
          }
        );
        return {
          layoutState: layoutState3,
          windowState: Vue.computed(() => ({}))
        };
      }
      const topWindowMediaQuery = Vue.ref(false);
      const leftWindowMediaQuery = Vue.ref(false);
      const rightWindowMediaQuery = Vue.ref(false);
      const showTopWindow = Vue.computed(
        () => hasTopWindow && route2.meta.topWindow !== false && topWindowMediaQuery.value
      );
      const showLeftWindow = Vue.computed(
        () => hasLeftWindow && route2.meta.leftWindow !== false && leftWindowMediaQuery.value
      );
      const showRightWindow = Vue.computed(
        () => hasRightWindow && route2.meta.rightWindow !== false && rightWindowMediaQuery.value
      );
      const layoutState2 = Vue.reactive({
        topWindowMediaQuery,
        showTopWindow,
        apiShowTopWindow: false,
        leftWindowMediaQuery,
        showLeftWindow,
        apiShowLeftWindow: false,
        rightWindowMediaQuery,
        showRightWindow,
        apiShowRightWindow: false,
        topWindowHeight: 0,
        marginWidth: 0,
        leftWindowWidth: 0,
        rightWindowWidth: 0,
        navigationBarTitleText: "",
        topWindowStyle: {},
        leftWindowStyle: {},
        rightWindowStyle: {}
      });
      const props2 = [
        "topWindow",
        "leftWindow",
        "rightWindow"
      ];
      props2.forEach((prop) => {
        var _a;
        const matchMedia = (_a = __uniConfig[prop]) == null ? void 0 : _a.matchMedia;
        if (matchMedia && shared.hasOwn(matchMedia, "minWidth")) {
          matchMedia.minWidth;
        }
        const matches = initMediaQuery();
        layoutState2[`${prop}MediaQuery`] = matches;
      });
      Vue.watch(
        () => layoutState2.topWindowHeight,
        (value) => updateCssVar({ "--top-window-height": value + "px" })
      );
      Vue.watch(
        () => layoutState2.marginWidth,
        (value) => updateCssVar({ "--window-margin": value + "px" })
      );
      Vue.watch(
        () => layoutState2.leftWindowWidth + layoutState2.marginWidth,
        (value) => {
          updateCssVar({ "--window-left": value + "px" });
        }
      );
      Vue.watch(
        () => layoutState2.rightWindowWidth + layoutState2.marginWidth,
        (value) => {
          updateCssVar({ "--window-right": value + "px" });
        }
      );
      UniServiceJSBridge.on(uniShared.ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
        layoutState2.navigationBarTitleText = navigationBar.titleText;
      });
      const windowState2 = Vue.computed(() => ({
        matchTopWindow: layoutState2.topWindowMediaQuery,
        showTopWindow: layoutState2.showTopWindow || layoutState2.apiShowTopWindow,
        matchLeftWindow: layoutState2.leftWindowMediaQuery,
        showLeftWindow: layoutState2.showLeftWindow || layoutState2.apiShowLeftWindow,
        matchRightWindow: layoutState2.rightWindowMediaQuery,
        showRightWindow: layoutState2.showRightWindow || layoutState2.apiShowRightWindow
      }));
      return {
        layoutState: layoutState2,
        windowState: windowState2
      };
    }
    function useShowTabBar() {
      const route2 = usePageRoute();
      const tabBar = useTabBar();
      const showTabBar2 = Vue.computed(() => route2.meta.isTabBar && tabBar.shown);
      return showTabBar2;
    }
    function useTopWindow(layoutState2) {
      const { component, style } = __uniConfig.topWindow;
      const windowRef = Vue.ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = uniShared.resolveOwnerEl(instance.$);
        if (!el) {
          return;
        }
        const uniTopWindowStyleEl = el.parentElement;
        if (!uniTopWindowStyleEl) {
          return;
        }
        const height = uniTopWindowStyleEl.getBoundingClientRect().height;
        layoutState2.topWindowHeight = height;
      }
      Vue.watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      Vue.watch(
        () => layoutState2.showTopWindow || layoutState2.apiShowTopWindow,
        () => Vue.nextTick(updateWindow)
      );
      Vue.watch(
        () => layoutState2.topWindowStyle,
        () => Vue.nextTick(updateWindow)
      );
      layoutState2.topWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    function useLeftWindow(layoutState2) {
      const { component, style } = __uniConfig.leftWindow;
      const windowRef = Vue.ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = uniShared.resolveOwnerEl(instance.$);
        if (!el) {
          return;
        }
        const uniLeftWindowStyleEl = el.parentElement && el.parentElement.parentElement;
        if (!uniLeftWindowStyleEl) {
          return;
        }
        const width = uniLeftWindowStyleEl.getBoundingClientRect().width;
        layoutState2.leftWindowWidth = width;
      }
      Vue.watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      Vue.watch(
        () => layoutState2.showLeftWindow || layoutState2.apiShowLeftWindow,
        () => Vue.nextTick(updateWindow)
      );
      Vue.watch(
        () => layoutState2.leftWindowStyle,
        () => Vue.nextTick(updateWindow)
      );
      layoutState2.leftWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    function useRightWindow(layoutState2) {
      const { component, style } = __uniConfig.rightWindow;
      const windowRef = Vue.ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = uniShared.resolveOwnerEl(instance.$);
        if (!el) {
          return;
        }
        const uniRightWindowStyleEl = el.parentElement && el.parentElement.parentElement;
        if (!uniRightWindowStyleEl) {
          return;
        }
        const width = uniRightWindowStyleEl.getBoundingClientRect().width;
        layoutState2.rightWindowWidth = width;
      }
      Vue.watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      Vue.watch(
        () => layoutState2.showRightWindow || layoutState2.apiShowRightWindow,
        () => Vue.nextTick(updateWindow)
      );
      Vue.watch(
        () => layoutState2.rightWindowStyle,
        () => Vue.nextTick(updateWindow)
      );
      layoutState2.rightWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    const n46 = Vue.createPlainElement("uni-app", { class: () => Vue.unref(clazz) }, null, true);
    Vue.setInsertionState(n46);
    Vue.createIf(
      () => Vue.unref(hasResponsive),
      () => {
        const n33 = Vue.createPlainElement("uni-layout", { class: () => ({
          "uni-app--showtopwindow": Vue.unref(hasTopWindow) && Vue.unref(layoutState).showTopWindow,
          "uni-app--showleftwindow": Vue.unref(hasLeftWindow) && Vue.unref(layoutState).showLeftWindow,
          "uni-app--showrightwindow": Vue.unref(hasRightWindow) && Vue.unref(layoutState).showRightWindow
        }) });
        Vue.setInsertionState(n33);
        Vue.createIf(() => Vue.unref(hasTopWindow) && Vue.unref(TopWindow), () => {
          const n7 = Vue.createPlainElement("uni-top-window");
          const n5 = t0();
          Vue.insert(n5, n7);
          Vue.renderEffect(() => Vue.setStyle(n5, Vue.unref(layoutState).topWindowStyle));
          Vue.setInsertionState(n5);
          const n4 = Vue.createDynamicComponent(() => Vue.unref(TopWindow), {
            "navigation-bar-title-text": () => Vue.unref(layoutState).navigationBarTitleText,
            $: [
              () => Vue.unref(windowState)
            ]
          });
          const n6 = t1();
          Vue.insert(n6, n7);
          Vue.setStaticTemplateRef(n4, topWindowRef, null, "topWindowRef");
          Vue.applyVShow(n7, () => Vue.unref(layoutState).showTopWindow || Vue.unref(layoutState).apiShowTopWindow);
          Vue.renderEffect(() => Vue.setStyle(n6, { height: Vue.unref(layoutState).topWindowHeight + "px" }));
          return n7;
        });
        Vue.setInsertionState(n33, 1);
        const n32 = Vue.createPlainElement("uni-content");
        Vue.setInsertionState(n32);
        const n15 = Vue.createPlainElement("uni-main");
        Vue.setInsertionState(n15);
        Vue.createIf(
          () => {
            var _a;
            return Vue.unref(hasPages) && ((_a = Vue.unref(route)) == null ? void 0 : _a.meta.route);
          },
          () => {
            const n12 = Vue.createComponent(Vue.VaporKeepAlive, {
              "match-by": "key",
              cache: () => Vue.unref(routeCache2)
            }, () => {
              const n10 = Vue.createKeyedFragment(() => Vue.unref(routeKey), () => {
                const n11 = Vue.createComponent(Vue.unref(vueRouter.VaporRouterView), { type: () => Vue.unref(isTabBar) ? "tabBar" : "" });
                return n11;
              });
              return n10;
            });
            return n12;
          },
          () => Vue.createIf(() => !Vue.unref(hasPages), () => {
            const n14 = Vue.createDynamicComponent(() => Vue.unref(firstPageComponent));
            return n14;
          }),
          517
          /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_1 */
        );
        Vue.setInsertionState(n32, 1);
        Vue.createIf(() => Vue.unref(hasLeftWindow) && Vue.unref(LeftWindow), () => {
          const n23 = Vue.createPlainElement("uni-left-window", {
            "data-show": () => Vue.unref(layoutState).apiShowLeftWindow || void 0,
            style: () => Vue.unref(layoutState).leftWindowStyle
          });
          Vue.setInsertionState(n23);
          Vue.createIf(() => Vue.unref(layoutState).apiShowLeftWindow, () => {
            const n20 = t2();
            Vue.on(n20, "click", () => Vue.unref(layoutState).apiShowLeftWindow = false);
            return n20;
          });
          const n22 = t3();
          Vue.insert(n22, n23);
          Vue.setInsertionState(n22);
          const n21 = Vue.createDynamicComponent(() => Vue.unref(LeftWindow), { $: [
            () => Vue.unref(windowState)
          ] });
          Vue.setStaticTemplateRef(n21, leftWindowRef, null, "leftWindowRef");
          Vue.applyVShow(n23, () => Vue.unref(layoutState).showLeftWindow || Vue.unref(layoutState).apiShowLeftWindow);
          return n23;
        });
        Vue.setInsertionState(n32, 2);
        Vue.createIf(() => Vue.unref(hasRightWindow) && Vue.unref(RightWindow), () => {
          const n31 = Vue.createPlainElement("uni-right-window", {
            "data-show": () => Vue.unref(layoutState).apiShowRightWindow || void 0,
            style: () => Vue.unref(layoutState).rightWindowStyle
          });
          Vue.setInsertionState(n31);
          Vue.createIf(() => Vue.unref(layoutState).apiShowRightWindow, () => {
            const n28 = t2();
            Vue.on(n28, "click", () => Vue.unref(layoutState).apiShowRightWindow = false);
            return n28;
          });
          const n30 = t4();
          Vue.insert(n30, n31);
          Vue.setInsertionState(n30);
          const n29 = Vue.createDynamicComponent(() => Vue.unref(RightWindow), { $: [
            () => Vue.unref(windowState)
          ] });
          Vue.setStaticTemplateRef(n29, rightWindowRef, null, "rightWindowRef");
          Vue.applyVShow(n31, () => Vue.unref(layoutState).showRightWindow || Vue.unref(layoutState).apiShowRightWindow);
          return n31;
        });
        return n33;
      },
      () => {
        const n35 = Vue.createIf(
          () => {
            var _a;
            return Vue.unref(hasPages) && ((_a = Vue.unref(route)) == null ? void 0 : _a.meta.route);
          },
          () => {
            const n39 = Vue.createComponent(Vue.VaporKeepAlive, {
              "match-by": "key",
              cache: () => Vue.unref(routeCache2)
            }, () => {
              const n37 = Vue.createKeyedFragment(() => Vue.unref(routeKey), () => {
                const n38 = Vue.createComponent(Vue.unref(vueRouter.VaporRouterView), { type: () => Vue.unref(isTabBar) ? "tabBar" : "" });
                return n38;
              });
              return n37;
            });
            return n39;
          },
          () => Vue.createIf(() => !Vue.unref(hasPages), () => {
            const n41 = Vue.createDynamicComponent(() => Vue.unref(firstPageComponent));
            return n41;
          }),
          2309
          /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_8 */
        );
        return n35;
      },
      2053
      /* TRUE_SINGLE_ROOT, FALSE_SINGLE_ROOT, KEYED_INDEX_7 */
    );
    Vue.setInsertionState(n46, 1);
    Vue.createIf(() => Vue.unref(hasTabBar), () => {
      const n45 = Vue.createComponent(_sfc_main$1);
      Vue.applyVShow(n45, () => Vue.unref(showTabBar));
      return n45;
    });
    Vue.setStaticTemplateRef(n46, rootRef, null, "rootRef");
    return n46;
  }
});
Object.defineProperty(exports, "UTS", {
  enumerable: true,
  get: () => uniShared.UTS
});
Object.defineProperty(exports, "UTSJSONObject", {
  enumerable: true,
  get: () => uniShared.UTSJSONObject
});
Object.defineProperty(exports, "UTSValueIterable", {
  enumerable: true,
  get: () => uniShared.UTSValueIterable
});
Object.defineProperty(exports, "UniError", {
  enumerable: true,
  get: () => uniShared.UniError
});
exports.Ad = index$5;
exports.AdContentPage = index$4;
exports.AdDraw = index$3;
exports.AsyncErrorComponent = _sfc_main$8;
exports.AsyncLoadingComponent = _sfc_main$9;
exports.Button = index$v;
exports.Camera = index$2;
exports.Canvas = indexX$4;
exports.Checkbox = index$t;
exports.CheckboxGroup = index$u;
exports.CoverImage = index$7;
exports.CoverView = index$8;
exports.Editor = index$s;
exports.Form = index$x;
exports.Icon = index$r;
exports.Input = Input;
exports.Label = index$w;
exports.LayoutComponent = _sfc_main;
exports.ListItem = index$f;
exports.ListView = index$g;
exports.LivePlayer = index$1;
exports.LivePusher = index;
exports.Loading = _sfc_main$2;
exports.Map = index$9;
exports.MovableArea = index$q;
exports.MovableView = index$p;
exports.Navigator = index$o;
exports.PageComponent = _sfc_main$4;
exports.PageContainer = _sfc_main$3;
exports.Picker = index$6;
exports.PickerView = PickerView;
exports.PickerViewColumn = PickerViewColumn;
exports.Progress = index$n;
exports.Radio = indexX$3;
exports.RadioGroup = index$m;
exports.ResizeSensor = ResizeSensor;
exports.RichText = index$l;
exports.ScrollView = index$k;
exports.Slider = indexX$2;
exports.StickyHeader = index$d;
exports.StickySection = index$e;
exports.Swiper = index$j;
exports.SwiperItem = index$i;
exports.Switch = indexX$1;
exports.Textarea = index$h;
exports.UniServiceJSBridge = UniServiceJSBridge$1;
exports.UniViewJSBridge = UniViewJSBridge$1;
exports.Video = index$a;
exports.WebView = indexX;
exports.clearStorage = clearStorage;
exports.clearStorageSync = clearStorageSync;
exports.createVaporPageRouteComponent = createVaporPageRouteComponent;
exports.getApp = getApp$1;
exports.getAppBaseInfo = getAppBaseInfo;
exports.getCurrentPages = getCurrentPages$1;
exports.getDeviceInfo = getDeviceInfo;
exports.getRealPath = getRealPath;
exports.getStorage = getStorage;
exports.getStorageInfo = getStorageInfo;
exports.getStorageInfoSync = getStorageInfoSync;
exports.getStorageSync = getStorageSync;
exports.getSystemInfoSync = getSystemInfoSync;
exports.plugin = index$b;
exports.removeStorage = removeStorage;
exports.removeStorageSync = removeStorageSync;
exports.request = request;
exports.setNavigationBarTitle = setNavigationBarTitle;
exports.setStorage = setStorage;
exports.setStorageSync = setStorageSync;
exports.setupApp = setupApp;
exports.setupPage = setupPage;
exports.setupWindow = setupWindow;
exports.uni = uni$1;
exports.useI18n = useI18n;
exports.useTabBar = useTabBar;
