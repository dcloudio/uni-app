"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
var shared = require("@vue/shared");
var uniShared = require("@dcloudio/uni-shared");
var uniI18n = require("@dcloudio/uni-i18n");
var vueRouter = require("vue-router");
const isEnableLocale = /* @__PURE__ */ uniShared.once(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
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
      const value = jsonObj[names[0]];
      if (shared.isString(value) && uniI18n.isI18nStr(value, uniShared.I18N_JSON_DELIMITERS)) {
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
  let value = jsonObj[prop];
  Object.defineProperty(jsonObj, prop, {
    get() {
      return formatI18n(value);
    },
    set(v2) {
      value = v2;
    }
  });
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
        localeKeys.forEach((locale2) => i18n.add(locale2, __uniConfig.locales[locale2]));
      }
      i18n.setLocale(locale);
    }
  }
  return i18n;
}
function normalizeMessages(module, keys, values) {
  return keys.reduce((res, name, index2) => {
    res[module + name] = values[index2];
    return res;
  }, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.async.";
  const keys = ["error"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(uniI18n.LOCALE_EN, normalizeMessages(name, keys, [
      "The connection timed out, click the screen to try again."
    ]), false);
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(uniI18n.LOCALE_ES, normalizeMessages(name, keys, [
      "Se agot\xF3 el tiempo de conexi\xF3n, haga clic en la pantalla para volver a intentarlo."
    ]), false);
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(uniI18n.LOCALE_FR, normalizeMessages(name, keys, [
      "La connexion a expir\xE9, cliquez sur l'\xE9cran pour r\xE9essayer."
    ]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["\u8FDE\u63A5\u670D\u52A1\u5668\u8D85\u65F6\uFF0C\u70B9\u51FB\u5C4F\u5E55\u91CD\u8BD5"]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["\u9023\u63A5\u670D\u52D9\u5668\u8D85\u6642\uFF0C\u9EDE\u64CA\u5C4F\u5E55\u91CD\u8A66"]), false);
  }
});
const initI18nPickerMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.picker.";
  const keys = ["done", "cancel"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(uniI18n.LOCALE_EN, normalizeMessages(name, keys, ["Done", "Cancel"]), false);
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(uniI18n.LOCALE_ES, normalizeMessages(name, keys, ["OK", "Cancelar"]), false);
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(uniI18n.LOCALE_FR, normalizeMessages(name, keys, ["OK", "Annuler"]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["\u5B8C\u6210", "\u53D6\u6D88"]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["\u5B8C\u6210", "\u53D6\u6D88"]), false);
  }
});
const initI18nVideoMsgsOnce = /* @__PURE__ */ uniShared.once(() => {
  const name = "uni.video.";
  const keys = ["danmu", "volume"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(uniI18n.LOCALE_EN, normalizeMessages(name, keys, ["Danmu", "Volume"]), false);
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(uniI18n.LOCALE_ES, normalizeMessages(name, keys, ["Danmu", "Volumen"]), false);
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(uniI18n.LOCALE_FR, normalizeMessages(name, keys, ["Danmu", "Le Volume"]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["\u5F39\u5E55", "\u97F3\u91CF"]), false);
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(uniI18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["\u5F48\u5E55", "\u97F3\u91CF"]), false);
  }
});
function initNavigationBarI18n(navigationBar) {
  if (isEnableLocale()) {
    return defineI18nProperties(navigationBar, [
      ["titleText"],
      ["searchInput", "placeholder"]
    ]);
  }
}
function initTabBarI18n(tabBar2) {
  if (isEnableLocale() && tabBar2.list) {
    tabBar2.list.forEach((item) => {
      defineI18nProperty(item, ["text"]);
    });
  }
  return tabBar2;
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
  const id = callback ? invokeServiceMethodId++ : 0;
  callback && subscribe(INVOKE_SERVICE_API + "." + id, callback, true);
  publishHandler(INVOKE_SERVICE_API, { id, name, args });
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
const ViewJSBridge = /* @__PURE__ */ shared.extend(/* @__PURE__ */ initBridge("service"), {
  invokeServiceMethod
});
const onEventPrevent = /* @__PURE__ */ vue.withModifiers(() => {
}, ["prevent"]);
const onEventStop = /* @__PURE__ */ vue.withModifiers(() => {
}, ["stop"]);
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
  return vue.createVNode("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32"
  }, [
    vue.createVNode("path", {
      d: path,
      fill: color
    }, null, 8, ["d", "fill"])
  ], 8, ["width", "height"]);
}
function useCurrentPageId() {
  {
    const { $pageInstance } = vue.getCurrentInstance();
    return $pageInstance && $pageInstance.proxy.$page.id;
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
const PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id) {
  const globalStyle = initGlobalStyle();
  const res = shared.extend({ id }, globalStyle, pageMeta);
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
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel) {
  const { id, route } = meta;
  return {
    id,
    path: uniShared.addLeadingSlash(route),
    route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: meta.navigationBar.titleColor === "#000000" ? "dark" : "light"
  };
}
function invokeHook(vm, name, args) {
  if (shared.isString(vm)) {
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
  return hooks && uniShared.invokeArrayFns(hooks, args);
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
function findUniTarget(target) {
  while (target && target.tagName.indexOf("UNI-") !== 0) {
    target = target.parentElement;
  }
  return target;
}
function createNativeEvent(evt, htmlElement = false) {
  const { type, timeStamp, target, currentTarget } = evt;
  const event = {
    type,
    timeStamp,
    target: uniShared.normalizeTarget(htmlElement ? target : findUniTarget(target)),
    detail: {},
    currentTarget: uniShared.normalizeTarget(currentTarget)
  };
  if (evt._stopped) {
    event._stopped = true;
  }
  if (evt.type.startsWith("touch")) {
    event.touches = evt.touches;
    event.changedTouches = evt.changedTouches;
  }
  {
    wrapperEvent(event, evt);
  }
  return event;
}
function wrapperEvent(event, evt) {
  shared.extend(event, {
    preventDefault() {
      return evt.preventDefault();
    },
    stopPropagation() {
      return evt.stopPropagation();
    }
  });
}
const invokeOnCallback = (name, res) => UniServiceJSBridge.emit("api." + name, res);
let invokeViewMethodId = 1;
function publishViewMethodName() {
  return getCurrentPageId() + "." + INVOKE_VIEW_API;
}
const invokeViewMethod = (name, args, pageId, callback) => {
  const { subscribe, publishHandler } = UniServiceJSBridge;
  const id = callback ? invokeViewMethodId++ : 0;
  callback && subscribe(INVOKE_VIEW_API + "." + id, callback, true);
  publishHandler(publishViewMethodName(), { id, name, args }, pageId);
};
const invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
  const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge;
  const id = invokeViewMethodId++;
  const subscribeName = INVOKE_VIEW_API + "." + id;
  subscribe(subscribeName, callback);
  publishHandler(publishViewMethodName(), { id, name, args }, pageId);
  return () => {
    unsubscribe(subscribeName);
  };
};
const ServiceJSBridge = /* @__PURE__ */ shared.extend(/* @__PURE__ */ initBridge("view"), {
  invokeOnCallback,
  invokeViewMethod,
  invokeViewMethodKeepAlive
});
function initAppVm(appVm2) {
  appVm2.$vm = appVm2;
  appVm2.$mpType = "app";
  const locale = vue.ref(useI18n().getLocale());
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
  pageVm.$page = page;
  pageVm.$mpType = "page";
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
  style.transition = style.webkitTransition = Object.keys(style).map((type) => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`).join(",");
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
var animation = {
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
  };
  return vue.defineComponent(options);
};
const defineUnsupportedComponent = (name) => {
  return defineBuiltInComponent({
    name: shared.capitalize(shared.camelize(name)),
    setup() {
      return () => (vue.openBlock(), vue.createElementBlock("uni-" + name, null, name + " is unsupported"));
    }
  });
};
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
  const hovering = vue.ref(false);
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
      onTouchstartPassive,
      onMousedown,
      onTouchend,
      onMouseup,
      onTouchcancel
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
function useNativeEvent(emit2) {
  return (name, evt) => {
    emit2(name, createNativeEvent(evt));
  };
}
function normalizeCustomEvent(name, domEvt, el, detail) {
  const target = uniShared.normalizeTarget(el);
  return {
    type: detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail
  };
}
const uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
var index$E = /* @__PURE__ */ defineBuiltInComponent({
  name: "Form",
  emits: ["submit", "reset"],
  setup(_props, {
    slots,
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    provideForm(useCustomEvent(rootRef, emit2));
    return () => vue.createVNode("uni-form", {
      "ref": rootRef
    }, [vue.createVNode("span", null, [slots.default && slots.default()])], 512);
  }
});
function provideForm(trigger) {
  const fields2 = [];
  vue.provide(uniFormKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    submit(evt) {
      trigger("submit", evt, {
        value: fields2.reduce((res, field) => {
          if (field.submit) {
            const [name, value] = field.submit();
            name && (res[name] = value);
          }
          return res;
        }, /* @__PURE__ */ Object.create(null))
      });
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
  vue.provide(uniLabelKey, {
    addHandler(handler) {
      handlers.push(handler);
    },
    removeHandler(handler) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
  });
  return handlers;
}
var index$D = /* @__PURE__ */ defineBuiltInComponent({
  name: "Label",
  props: labelProps,
  setup(props2, {
    slots
  }) {
    const pageId = useCurrentPageId();
    const handlers = useProvideLabel();
    const pointer = vue.computed(() => props2.for || slots.default && slots.default.length);
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
    return () => vue.createVNode("uni-label", {
      "class": {
        "uni-label-pointer": pointer
      },
      "onClick": _onClick
    }, [slots.default && slots.default()], 10, ["onClick"]);
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
var index$C = /* @__PURE__ */ defineBuiltInComponent({
  name: "Button",
  props: buttonProps,
  setup(props2, {
    slots
  }) {
    const rootRef = vue.ref(null);
    const uniForm = vue.inject(uniFormKey, false);
    const {
      hovering,
      binding
    } = useHover(props2);
    useI18n();
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
    const uniLabel = vue.inject(uniLabelKey, false);
    if (uniLabel) {
      uniLabel.addHandler(onClick);
    }
    return () => {
      const hoverClass = props2.hoverClass;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const loadingAttrs = useBooleanAttr(props2, "loading");
      const plainAttrs = useBooleanAttr(props2, "plain");
      const hasHoverClass = hoverClass && hoverClass !== "none";
      return vue.createVNode("uni-button", vue.mergeProps({
        "ref": rootRef,
        "onClick": onClick,
        "class": hasHoverClass && hovering.value ? hoverClass : ""
      }, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick"]);
    };
  }
});
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
    if (filePath.indexOf("./static/") === 0 || assets && filePath.indexOf("./" + assets + "/") === 0) {
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
  const pages = getCurrentPages();
  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).slice(1));
  }
  return filePath;
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
    const errMsg = validateProp(key, data[key], protocol[key], !shared.hasOwn(data, key));
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
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
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
  const { type, required, validator: validator2 } = prop;
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
  if (validator2) {
    return validator2(value);
  }
}
const isSimpleType = /* @__PURE__ */ shared.makeMap("String,Number,Boolean,Function,Symbol");
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
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
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
function normalizeErrMsg$1(errMsg, name) {
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
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
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
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue(hooks, data) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
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
      queue(hooks, res).then((res2) => {
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
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
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
        return api2(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api2(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api2(options, ...params);
}
function hasCallback(args) {
  if (shared.isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => shared.isFunction(args[cb]))) {
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
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, shared.extend(args, { success: resolve, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !shared.isPlainObject(options.formatArgs) && shared.isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (shared.isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
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
function invokeSuccess(id, name, res) {
  return invokeCallback(id, shared.extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, shared.extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
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
function normalizeErrMsg(errMsg) {
  if (!errMsg || shared.isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + uniShared.LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
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
function defineTaskApi(name, fn, protocol, options) {
  return promisify(name, wrapperTaskApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(name, wrapperAsyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
new uniShared.Emitter();
const validator = [
  {
    name: "id",
    type: String,
    required: true
  }
];
validator.concat({
  name: "componentInstance",
  type: Object
});
const API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
const API_GET_LOCALE = "getLocale";
const getLocale = /* @__PURE__ */ defineSyncApi(API_GET_LOCALE, () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return useI18n().getLocale();
});
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
      params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
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
function saveImage(base64, dirname, callback) {
  callback(null, base64);
}
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
function blobToFile(blob, type) {
  let file;
  if (blob instanceof File) {
    file = blob;
  } else {
    type = type || blob.type || "";
    const filename = `${Date.now()}${getExtname(type)}`;
    try {
      file = new File([blob], filename, { type });
    } catch (error) {
      blob = blob instanceof Blob ? blob : new Blob([blob], { type });
      file = blob;
      file.name = file.name || filename;
    }
  }
  return file;
}
function fileToUrl(file) {
  for (const key in files) {
    if (shared.hasOwn(files, key)) {
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
function getSameOriginUrl(url) {
  const a = document.createElement("a");
  a.href = url;
  if (a.origin === location.origin) {
    return Promise.resolve(url);
  }
  return urlToFile(url).then(fileToUrl);
}
const inflateRaw = (...args) => {
};
const deflateRaw = (...args) => {
};
var ResizeSensor = /* @__PURE__ */ defineBuiltInComponent({
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
    const rootRef = vue.ref(null);
    const reset = useResizeSensorReset(rootRef);
    const update = useResizeSensorUpdate(rootRef, emit2, reset);
    return () => vue.createVNode("uni-resize-sensor", {
      "ref": rootRef,
      "onAnimationstartOnce": update
    }, [vue.createVNode("div", {
      "onScroll": update
    }, [vue.createVNode("div", null, null)], 40, ["onScroll"]), vue.createVNode("div", {
      "onScroll": update
    }, [vue.createVNode("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
  }
});
function useResizeSensorUpdate(rootRef, emit2, reset) {
  const size = vue.reactive({
    width: -1,
    height: -1
  });
  vue.watch(() => shared.extend({}, size), (value) => emit2("resize", value));
  return () => {
    const rootEl = rootRef.value;
    size.width = rootEl.offsetWidth;
    size.height = rootEl.offsetHeight;
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
const pixelRatio = 1;
function wrapper(canvas, hidpi = true) {
  canvas.width = canvas.offsetWidth * (hidpi ? pixelRatio : 1);
  canvas.height = canvas.offsetHeight * (hidpi ? pixelRatio : 1);
  canvas.getContext("2d").__hidpi__ = hidpi;
}
const initHidpiOnce = /* @__PURE__ */ uniShared.once(() => {
  return void 0;
});
function $getRealPath(src) {
  return src ? getRealPath(src) : src;
}
function resolveColor(color) {
  color = color.slice(0);
  color[3] = color[3] / 255;
  return "rgba(" + color.join(",") + ")";
}
function processTouches(rect, touches) {
  Array.from(touches).forEach((touch) => {
    touch.x = touch.clientX - rect.left;
    touch.y = touch.clientY - rect.top;
  });
}
let tempCanvas;
function getTempCanvas(width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement("canvas");
  }
  tempCanvas.width = width;
  tempCanvas.height = height;
  return tempCanvas;
}
const props$q = {
  canvasId: {
    type: String,
    default: ""
  },
  disableScroll: {
    type: [Boolean, String],
    default: false
  },
  hidpi: {
    type: Boolean,
    default: true
  }
};
var index$B = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "Canvas",
  compatConfig: {
    MODE: 3
  },
  props: props$q,
  computed: {
    id() {
      return this.canvasId;
    }
  },
  setup(props2, {
    emit: emit2,
    slots
  }) {
    initHidpiOnce();
    const canvas = vue.ref(null);
    const sensor = vue.ref(null);
    const actionsWaiting = vue.ref(false);
    const trigger = useNativeEvent(emit2);
    const {
      $attrs,
      $excludeAttrs,
      $listeners
    } = useAttrs({
      excludeListeners: true
    });
    const {
      _listeners
    } = useListeners(props2, $listeners, trigger);
    const {
      _handleSubscribe,
      _resize
    } = useMethods(props2, canvas, actionsWaiting);
    useSubscribe(_handleSubscribe, useContextInfo(props2.canvasId));
    return () => {
      const {
        canvasId,
        disableScroll
      } = props2;
      return vue.createVNode("uni-canvas", vue.mergeProps({
        "canvas-id": canvasId,
        "disable-scroll": disableScroll
      }, $attrs.value, $excludeAttrs.value, _listeners.value), [vue.createVNode("canvas", {
        "ref": canvas,
        "class": "uni-canvas-canvas",
        "width": "300",
        "height": "150"
      }, null, 512), vue.createVNode("div", {
        "style": "position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;"
      }, [slots.default && slots.default()]), vue.createVNode(ResizeSensor, {
        "ref": sensor,
        "onResize": _resize
      }, null, 8, ["onResize"])], 16, ["canvas-id", "disable-scroll"]);
    };
  }
});
function useListeners(props2, Listeners, trigger) {
  const _listeners = vue.computed(() => {
    let events = ["onTouchstart", "onTouchmove", "onTouchend"];
    let _$listeners = Listeners.value;
    let $listeners = shared.extend({}, (() => {
      let obj = {};
      for (const key in _$listeners) {
        if (shared.hasOwn(_$listeners, key)) {
          const event = _$listeners[key];
          obj[key] = event;
        }
      }
      return obj;
    })());
    events.forEach((event) => {
      let existing = $listeners[event];
      let eventHandler = [];
      if (existing) {
        eventHandler.push(withWebEvent(($event) => {
          const rect = $event.currentTarget.getBoundingClientRect();
          processTouches(rect, $event.touches);
          processTouches(rect, $event.changedTouches);
          trigger(event.replace("on", "").toLocaleLowerCase(), $event);
        }));
      }
      if (props2.disableScroll && event === "onTouchmove") {
        eventHandler.push(onEventPrevent);
      }
      $listeners[event] = eventHandler;
    });
    return $listeners;
  });
  return {
    _listeners
  };
}
function useMethods(props2, canvasRef, actionsWaiting) {
  let _actionsDefer = [];
  let _images = {};
  const _pixelRatio = vue.computed(() => props2.hidpi ? pixelRatio : 1);
  function _resize(size) {
    let canvas = canvasRef.value;
    var hasChanged = !size || canvas.width !== Math.floor(size.width * _pixelRatio.value) || canvas.height !== Math.floor(size.height * _pixelRatio.value);
    if (!hasChanged)
      return;
    if (canvas.width > 0 && canvas.height > 0) {
      let context = canvas.getContext("2d");
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      wrapper(canvas, props2.hidpi);
      context.putImageData(imageData, 0, 0);
    } else {
      wrapper(canvas, props2.hidpi);
    }
  }
  function actionsChanged({
    actions,
    reserve
  }, resolve) {
    if (!actions) {
      return;
    }
    if (actionsWaiting.value) {
      _actionsDefer.push([actions, reserve]);
      return;
    }
    let canvas = canvasRef.value;
    let c2d = canvas.getContext("2d");
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
    preloadImage(actions);
    for (let index2 = 0; index2 < actions.length; index2++) {
      const action = actions[index2];
      let method = action.method;
      const data = action.data;
      const actionType = data[0];
      if (/^set/.test(method) && method !== "setTransform") {
        const method1 = method[3].toLowerCase() + method.slice(4);
        let color;
        if (method1 === "fillStyle" || method1 === "strokeStyle") {
          if (actionType === "normal") {
            color = resolveColor(data[1]);
          } else if (actionType === "linear") {
            const LinearGradient = c2d.createLinearGradient(...data[1]);
            data[2].forEach(function(data2) {
              const offset = data2[0];
              const color2 = resolveColor(data2[1]);
              LinearGradient.addColorStop(offset, color2);
            });
            color = LinearGradient;
          } else if (actionType === "radial") {
            let _data = data[1];
            const x = _data[0];
            const y = _data[1];
            const r = _data[2];
            const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
            data[2].forEach(function(data2) {
              const offset = data2[0];
              const color2 = resolveColor(data2[1]);
              LinearGradient.addColorStop(offset, color2);
            });
            color = LinearGradient;
          } else if (actionType === "pattern") {
            const loaded = checkImageLoaded(data[1], actions.slice(index2 + 1), resolve, function(image) {
              if (image) {
                c2d[method1] = c2d.createPattern(image, data[2]);
              }
            });
            if (!loaded) {
              break;
            }
            continue;
          }
          c2d[method1] = color;
        } else if (method1 === "globalAlpha") {
          c2d[method1] = Number(actionType) / 255;
        } else if (method1 === "shadow") {
          let shadowArray = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
          data.forEach(function(color_, method_) {
            c2d[shadowArray[method_]] = shadowArray[method_] === "shadowColor" ? resolveColor(color_) : color_;
          });
        } else if (method1 === "fontSize") {
          const font = c2d.__font__ || c2d.font;
          c2d.__font__ = c2d.font = font.replace(/\d+\.?\d*px/, actionType + "px");
        } else if (method1 === "lineDash") {
          c2d.setLineDash(actionType);
          c2d.lineDashOffset = data[1] || 0;
        } else if (method1 === "textBaseline") {
          if (actionType === "normal") {
            data[0] = "alphabetic";
          }
          c2d[method1] = actionType;
        } else if (method1 === "font") {
          c2d.__font__ = c2d.font = actionType;
        } else {
          c2d[method1] = actionType;
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
        let drawImage = function() {
          let dataArray = [...data];
          let url = dataArray[0];
          let otherData = dataArray.slice(1);
          _images = _images || {};
          if (!checkImageLoaded(url, actions.slice(index2 + 1), resolve, function(image) {
            if (image) {
              c2d.drawImage.apply(c2d, [image].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
            }
          }))
            return "break";
        }();
        if (drawImage === "break") {
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
    if (!actionsWaiting.value) {
      resolve({
        errMsg: "drawCanvas:ok"
      });
    }
  }
  function preloadImage(actions) {
    actions.forEach(function(action) {
      let method = action.method;
      let data = action.data;
      let src = "";
      if (method === "drawImage") {
        src = data[0];
        src = $getRealPath(src);
        data[0] = src;
      } else if (method === "setFillStyle" && data[0] === "pattern") {
        src = data[1];
        src = $getRealPath(src);
        data[1] = src;
      }
      if (src && !_images[src]) {
        loadImage();
      }
      function loadImage() {
        const image = _images[src] = new Image();
        image.onload = function() {
          image.ready = true;
        };
        getSameOriginUrl(src).then((src2) => {
          image.src = src2;
        }).catch(() => {
          image.src = src;
        });
      }
    });
  }
  function checkImageLoaded(src, actions, resolve, fn) {
    let image = _images[src];
    if (image.ready) {
      fn(image);
      return true;
    } else {
      _actionsDefer.unshift([actions, true]);
      actionsWaiting.value = true;
      image.onload = function() {
        image.ready = true;
        fn(image);
        actionsWaiting.value = false;
        let actions2 = _actionsDefer.slice(0);
        _actionsDefer = [];
        for (let action = actions2.shift(); action; ) {
          actionsChanged({
            actions: action[0],
            reserve: action[1]
          }, resolve);
          action = actions2.shift();
        }
      };
      return false;
    }
  }
  function getImageData({
    x = 0,
    y = 0,
    width,
    height,
    destWidth,
    destHeight,
    hidpi = true,
    dataType: dataType2,
    quality = 1,
    type = "png"
  }, resolve) {
    const canvas = canvasRef.value;
    let data;
    const maxWidth = canvas.offsetWidth - x;
    width = width ? Math.min(width, maxWidth) : maxWidth;
    const maxHeight = canvas.offsetHeight - y;
    height = height ? Math.min(height, maxHeight) : maxHeight;
    if (!hidpi) {
      if (!destWidth && !destHeight) {
        destWidth = Math.round(width * _pixelRatio.value);
        destHeight = Math.round(height * _pixelRatio.value);
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
    if (type === "jpeg" || type === "jpg") {
      type = "jpeg";
      context.fillStyle = "#fff";
      context.fillRect(0, 0, destWidth, destHeight);
    }
    context.__hidpi__ = true;
    context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
    let result;
    try {
      let compressed;
      if (dataType2 === "base64") {
        data = newCanvas.toDataURL(`image/${type}`, quality);
      } else {
        const imgData = context.getImageData(0, 0, destWidth, destHeight);
        if (false)
          ;
        else {
          data = Array.prototype.slice.call(imgData.data);
        }
      }
      result = {
        data,
        compressed,
        width: destWidth,
        height: destHeight
      };
    } catch (error) {
      result = {
        errMsg: `canvasGetImageData:fail ${error}`
      };
    }
    newCanvas.height = newCanvas.width = 0;
    context.__hidpi__ = false;
    if (!resolve) {
      return result;
    } else {
      resolve(result);
    }
  }
  function putImageData({
    data,
    x,
    y,
    width,
    height,
    compressed
  }, resolve) {
    try {
      if (false)
        ;
      if (!height) {
        height = Math.round(data.length / 4 / width);
      }
      const canvas = getTempCanvas(width, height);
      const context = canvas.getContext("2d");
      context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
      canvasRef.value.getContext("2d").drawImage(canvas, x, y, width, height);
      canvas.height = canvas.width = 0;
    } catch (error) {
      resolve({
        errMsg: "canvasPutImageData:fail"
      });
      return;
    }
    resolve({
      errMsg: "canvasPutImageData:ok"
    });
  }
  function toTempFilePath({
    x = 0,
    y = 0,
    width,
    height,
    destWidth,
    destHeight,
    fileType,
    quality,
    dirname
  }, resolve) {
    const res = getImageData({
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      hidpi: false,
      dataType: "base64",
      type: fileType,
      quality
    });
    if (!res.data || !res.data.length) {
      resolve({
        errMsg: res.errMsg.replace("canvasPutImageData", "toTempFilePath")
      });
      return;
    }
    saveImage(res.data, dirname, (error, tempFilePath) => {
      let errMsg = `toTempFilePath:${error ? "fail" : "ok"}`;
      if (error) {
        errMsg += ` ${error.message}`;
      }
      resolve({
        errMsg,
        tempFilePath
      });
    });
  }
  const methods = {
    actionsChanged,
    getImageData,
    putImageData,
    toTempFilePath
  };
  function _handleSubscribe(type, data, resolve) {
    let method = methods[type];
    if (type.indexOf("_") !== 0 && shared.isFunction(method)) {
      method(data, resolve);
    }
  }
  return shared.extend(methods, {
    _resize,
    _handleSubscribe
  });
}
const uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
const props$p = {
  name: {
    type: String,
    default: ""
  }
};
var index$A = /* @__PURE__ */ defineBuiltInComponent({
  name: "CheckboxGroup",
  props: props$p,
  emits: ["change"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideCheckGroup(props2, trigger);
    return () => {
      return vue.createVNode("uni-checkbox-group", {
        "ref": rootRef
      }, [slots.default && slots.default()], 512);
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
  vue.provide(uniCheckGroupKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    checkboxChange($event) {
      trigger("change", $event, {
        value: getFieldsValue()
      });
    }
  });
  const uniForm = vue.inject(uniFormKey, false);
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
  color: {
    type: String,
    default: "#007aff"
  },
  value: {
    type: String,
    default: ""
  }
};
var index$z = /* @__PURE__ */ defineBuiltInComponent({
  name: "Checkbox",
  props: props$o,
  setup(props2, {
    slots
  }) {
    const checkboxChecked = vue.ref(props2.checked);
    const checkboxValue = vue.ref(props2.value);
    vue.watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
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
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return vue.createVNode("uni-checkbox", vue.mergeProps(booleanAttrs, {
        "onClick": _onClick
      }), [vue.createVNode("div", {
        "class": "uni-checkbox-wrapper"
      }, [vue.createVNode("div", {
        "class": ["uni-checkbox-input", {
          "uni-checkbox-input-disabled": props2.disabled
        }]
      }, [checkboxChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 2), slots.default && slots.default()])], 16, ["onClick"]);
    };
  }
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
  const field = vue.computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value
  }));
  const formField = {
    reset
  };
  const uniCheckGroup = vue.inject(uniCheckGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = vue.inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = vue.inject(uniLabelKey, false);
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
    const isApple = vue.computed(() => String(navigator.vendor).indexOf("Apple") === 0);
    el.addEventListener("focus", () => {
      clearTimeout(resetTimer);
      document.addEventListener("click", iosHideKeyboard, false);
    });
    const onKeyboardHide = () => {
      document.removeEventListener("click", iosHideKeyboard, false);
      if (isApple.value) {
        document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
      }
    };
    el.addEventListener("blur", () => {
      if (isApple.value) {
        el.blur();
      }
      onKeyboardHide();
    });
  }
  vue.watch(() => elRef.value, (el) => initKeyboard(el));
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
      html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text2) {
        text2 = text2.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
        if (handler.chars) {
          handler.chars(text2);
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
      var attrs = [];
      rest.replace(attr, function(match2, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
        attrs.push({
          name,
          value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
        });
      });
      if (handler.start) {
        handler.start(tagName, attrs, unary);
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
  vue.watch(() => props2.readOnly, (value) => {
  });
  vue.watch(() => props2.placeholder, (value) => {
  });
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
var index$y = /* @__PURE__ */ defineBuiltInComponent({
  name: "Editor",
  props: props$m,
  emit: ["ready", "focus", "blur", "input", "statuschange", ...emit$1],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    useQuill(props2);
    useKeyboard$1(props2, rootRef);
    return () => {
      return vue.createVNode("uni-editor", {
        "ref": rootRef,
        "id": props2.id,
        "class": "ql-container"
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
var index$x = /* @__PURE__ */ defineBuiltInComponent({
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
    const path = vue.computed(() => ICONS[props2.type]);
    return () => {
      const {
        value
      } = path;
      return vue.createVNode("uni-icon", null, [value && value.d && createSvgIconVNode(value.d, props2.color || value.c, rpx2px(props2.size))]);
    };
  }
});
const props$l = {
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
    default: false
  }
};
const FIX_MODES = {
  widthFix: ["offsetWidth", "height", (value, ratio) => value / ratio],
  heightFix: ["offsetHeight", "width", (value, ratio) => value * ratio]
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
var index$w = /* @__PURE__ */ defineBuiltInComponent({
  name: "Image",
  props: props$l,
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const state = useImageState(rootRef, props2);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      fixSize
    } = useImageSize(rootRef, props2, state);
    useImageLoader(state, props2, rootRef, fixSize, trigger);
    return () => {
      return vue.createVNode("uni-image", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "style": state.modeStyle
      }, null, 4), FIX_MODES[props2.mode] ? vue.createVNode(ResizeSensor, {
        "onResize": fixSize
      }, null, 8, ["onResize"]) : vue.createVNode("span", null, null)], 512);
    };
  }
});
function useImageState(rootRef, props2) {
  const imgSrc = vue.ref("");
  const modeStyleRef = vue.computed(() => {
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
    return `background-image:${imgSrc.value ? 'url("' + imgSrc.value + '")' : "none"};background-position:${position};background-size:${size};`;
  });
  const state = vue.reactive({
    rootEl: rootRef,
    src: vue.computed(() => props2.src ? getRealPath(props2.src) : ""),
    origWidth: 0,
    origHeight: 0,
    origStyle: {
      width: "",
      height: ""
    },
    modeStyle: modeStyleRef,
    imgSrc
  });
  return state;
}
function useImageLoader(state, props2, rootRef, fixSize, trigger) {
  let img;
  let draggableImg;
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
    img = img || new Image();
    img.onload = (evt) => {
      const {
        width,
        height
      } = img;
      setState(width, height, src);
      fixSize();
      img.draggable = props2.draggable;
      if (draggableImg) {
        draggableImg.remove();
      }
      draggableImg = img;
      rootRef.value.appendChild(img);
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
  vue.watch(() => state.src, (value) => loadImage(value));
  vue.watch(() => state.imgSrc, (value) => {
    if (!value && draggableImg) {
      draggableImg.remove();
      draggableImg = null;
    }
  });
}
function fixNumber(num) {
  return num;
}
function useImageSize(rootRef, props2, state) {
  const fixSize = () => {
    const {
      mode: mode2
    } = props2;
    const names = FIX_MODES[mode2];
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
    const value = rootEl[names[0]];
    if (value) {
      rootEl.style[names[1]] = fixNumber(names[2](value, ratio)) + "px";
    }
  };
  const resetSize = () => {
    const {
      style
    } = rootRef.value;
    const {
      origStyle: {
        width,
        height
      }
    } = state;
    style.width = width;
    style.height = height;
  };
  vue.watch(() => props2.mode, (value, oldValue) => {
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
  const state = vue.reactive({
    userAction: false
  });
  return {
    state
  };
}
function useScopedAttrs() {
  const state = vue.reactive({
    attrs: {}
  });
  return {
    state
  };
}
function useFormField(nameKey, value) {
  const uniForm = vue.inject(uniFormKey, false);
  if (!uniForm) {
    return;
  }
  const instance = vue.getCurrentInstance();
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
  registerViewMethod(getCurrentPageId(), "getSelectedTextRange", getSelectedTextRange);
};
function getValueString(value, type) {
  if (type === "number" && isNaN(Number(value))) {
    value = "";
  }
  return value === null ? "" : String(value);
}
const props$k = /* @__PURE__ */ shared.extend({}, {
  name: {
    type: String,
    default: ""
  },
  modelValue: {
    type: [String, Number],
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
  }
}, props$n);
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
  const fieldRef = vue.ref(null);
  const trigger = useCustomEvent(rootRef, emit2);
  const selectionStart = vue.computed(() => {
    const selectionStart2 = Number(props2.selectionStart);
    return isNaN(selectionStart2) ? -1 : selectionStart2;
  });
  const selectionEnd = vue.computed(() => {
    const selectionEnd2 = Number(props2.selectionEnd);
    return isNaN(selectionEnd2) ? -1 : selectionEnd2;
  });
  const cursor = vue.computed(() => {
    const cursor2 = Number(props2.cursor);
    return isNaN(cursor2) ? -1 : cursor2;
  });
  const maxlength = vue.computed(() => {
    var maxlength2 = Number(props2.maxlength);
    return isNaN(maxlength2) ? 140 : maxlength2;
  });
  const value = getValueString(props2.modelValue, props2.type) || getValueString(props2.value, props2.type);
  const state = vue.reactive({
    value,
    valueOrigin: value,
    maxlength,
    focus: props2.focus,
    composing: false,
    selectionStart,
    selectionEnd,
    cursor
  });
  vue.watch(() => state.focus, (val) => emit2("update:focus", val));
  vue.watch(() => state.maxlength, (val) => state.value = state.value.slice(0, val));
  return {
    fieldRef,
    state,
    trigger
  };
}
function useValueSync(props2, state, emit2, trigger) {
  const valueChangeFn = uniShared.debounce((val) => {
    state.value = getValueString(val, props2.type);
  }, 100, { setTimeout, clearTimeout });
  vue.watch(() => props2.modelValue, valueChangeFn);
  vue.watch(() => props2.value, valueChangeFn);
  const triggerInputFn = throttle((event, detail) => {
    valueChangeFn.cancel();
    emit2("update:modelValue", detail.value);
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
  return {
    trigger,
    triggerInput
  };
}
function useAutoFocus(props2, fieldRef) {
  useUserAction();
  const needFocus = vue.computed(() => props2.autoFocus || props2.focus);
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
  vue.watch(() => props2.focus, (value) => {
    if (value) {
      focus();
    } else {
      blur();
    }
  });
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
        triggerInput(event, {
          value: field.value,
          cursor: getFieldSelectionEnd(field)
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
  vue.watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
  vue.watch(() => state.cursor, checkCursor);
  vue.watch(() => fieldRef.value, initField);
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
const props$j = /* @__PURE__ */ shared.extend({}, props$k, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  },
  textContentType: {
    type: String,
    default: ""
  }
});
var Input = /* @__PURE__ */ defineBuiltInComponent({
  name: "Input",
  props: props$j,
  emits: ["confirm", ...emit],
  setup(props2, {
    emit: emit2
  }) {
    const INPUT_TYPES = ["text", "number", "idcard", "digit", "password", "tel"];
    const AUTOCOMPLETES = ["off", "one-time-code"];
    const type = vue.computed(() => {
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
    const autocomplete = vue.computed(() => {
      const camelizeIndex = AUTOCOMPLETES.indexOf(props2.textContentType);
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(shared.hyphenate(props2.textContentType));
      const index2 = camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0;
      return AUTOCOMPLETES[index2];
    });
    let cache = vue.ref("");
    let resetCache;
    const rootRef = vue.ref(null);
    const {
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      trigger
    } = useField(props2, rootRef, emit2, (event, state2) => {
      const input = event.target;
      if (type.value === "number") {
        if (resetCache) {
          input.removeEventListener("blur", resetCache);
          resetCache = null;
        }
        if (input.validity && !input.validity.valid) {
          if (!cache.value && event.data === "-" || cache.value[0] === "-" && event.inputType === "deleteContentBackward") {
            cache.value = "-";
            state2.value = "";
            resetCache = () => {
              cache.value = input.value = "";
            };
            input.addEventListener("blur", resetCache);
            return false;
          }
          cache.value = state2.value = input.value = cache.value === "-" ? "" : cache.value;
          return false;
        } else {
          cache.value = input.value;
        }
        const maxlength = state2.maxlength;
        if (maxlength > 0 && input.value.length > maxlength) {
          input.value = input.value.slice(0, maxlength);
          state2.value = input.value;
          return false;
        }
      }
    });
    vue.watch(() => state.value, (value) => {
      if (props2.type === "number" && !(cache.value === "-" && value === "")) {
        cache.value = value;
      }
    });
    const NUMBER_TYPES = ["number", "digit"];
    const step = vue.computed(() => NUMBER_TYPES.includes(props2.type) ? props2.step : "");
    function onKeyUpEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      const input = event.target;
      event.stopPropagation();
      trigger("confirm", event, {
        value: input.value
      });
      !props2.confirmHold && input.blur();
    }
    return () => {
      let inputNode = props2.disabled && fixDisabledColor ? vue.createVNode("input", {
        "ref": fieldRef,
        "value": state.value,
        "tabindex": "-1",
        "readonly": !!props2.disabled,
        "type": type.value,
        "maxlength": state.maxlength,
        "step": step.value,
        "class": "uni-input-input",
        "onFocus": (event) => event.target.blur()
      }, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : vue.createVNode("input", {
        "ref": fieldRef,
        "value": state.value,
        "disabled": !!props2.disabled,
        "type": type.value,
        "maxlength": state.maxlength,
        "step": step.value,
        "enterkeyhint": props2.confirmType,
        "pattern": props2.type === "number" ? "[0-9]*" : void 0,
        "class": "uni-input-input",
        "autocomplete": autocomplete.value,
        "onKeyup": onKeyUpEnter
      }, null, 40, ["value", "disabled", "type", "maxlength", "step", "enterkeyhint", "pattern", "autocomplete", "onKeyup"]);
      return vue.createVNode("uni-input", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "class": "uni-input-wrapper"
      }, [vue.withDirectives(vue.createVNode("div", vue.mergeProps(scopedAttrsState.attrs, {
        "style": props2.placeholderStyle,
        "class": ["uni-input-placeholder", props2.placeholderClass]
      }), [props2.placeholder], 16), [[vue.vShow, !(state.value.length || cache.value === "-")]]), props2.confirmType === "search" ? vue.createVNode("form", {
        "action": "",
        "onSubmit": (event) => event.preventDefault(),
        "class": "uni-input-form"
      }, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
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
  const instance = vue.getCurrentInstance();
  const attrs = vue.shallowRef({});
  const listeners = vue.shallowRef({});
  const excludeAttrs = vue.shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = vue.reactive(instance.attrs);
  vue.watchEffect(() => {
    const res = entries(instance.attrs).reduce((acc, [key, val]) => {
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
    attrs.value = res.attrs;
    listeners.value = res.listeners;
    excludeAttrs.value = res.exclude;
  });
  return { $attrs: attrs, $listeners: listeners, $excludeAttrs: excludeAttrs };
};
function flatVNode(nodes) {
  const array = [];
  if (shared.isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (vue.isVNode(vnode)) {
        if (vnode.type === vue.Fragment) {
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
var index$v = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "MovableArea",
  props: movableAreaProps,
  setup(props2, {
    slots
  }) {
    const rootRef = vue.ref(null);
    const _isMounted = vue.ref(false);
    let {
      setContexts,
      events: movableAreaEvents
    } = useMovableAreaState(props2, rootRef);
    const {
      $listeners,
      $attrs,
      $excludeAttrs
    } = useAttrs();
    const _listeners = $listeners.value;
    let events = ["onTouchstart", "onTouchmove", "onTouchend"];
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
          contexts.push(vue.markRaw(movableViewContext));
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
    vue.provide("_isMounted", _isMounted);
    vue.provide("movableAreaRootRef", rootRef);
    vue.provide("addMovableViewContext", addMovableViewContext);
    vue.provide("removeMovableViewContext", removeMovableViewContext);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        movableViewItems = flatVNode(defaultSlots);
      }
      return vue.createVNode("uni-movable-area", vue.mergeProps({
        "ref": rootRef
      }, $attrs.value, $excludeAttrs.value, _listeners), [vue.createVNode(ResizeSensor, {
        "onReize": movableAreaEvents._resize
      }, null, 8, ["onReize"]), movableViewItems], 16);
    };
  }
});
function calc(e2) {
  return Math.sqrt(e2.x * e2.x + e2.y * e2.y);
}
function useMovableAreaState(props2, rootRef) {
  const width = vue.ref(0);
  const height = vue.ref(0);
  const gapV = vue.reactive({
    x: null,
    y: null
  });
  const pinchStartLen = vue.ref(null);
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
  const _onTouchstart = withWebEvent((t2) => {
    let i = t2.touches;
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
  const _onTouchmove = withWebEvent((t2) => {
    let n = t2.touches;
    if (n) {
      if (n.length > 1) {
        t2.preventDefault();
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
    let t2 = e2.touches;
    if (!(t2 && t2.length)) {
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
  vue.provide("movableAreaWidth", width);
  vue.provide("movableAreaHeight", height);
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
function e(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function t(t2, n) {
  return e(t2, 0, n);
}
function Friction(e2, t2) {
  this._m = e2;
  this._f = 1e3 * t2;
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
  this._startTime = new Date().getTime();
};
Friction.prototype.setS = function(x, y) {
  this._x_s = x;
  this._y_s = y;
};
Friction.prototype.s = function(t2) {
  if (t2 === void 0) {
    t2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (t2 > this._t) {
    t2 = this._t;
    this._lastDt = t2;
  }
  let x = this._x_v * t2 + 0.5 * this._x_a * Math.pow(t2, 2) + this._x_s;
  let y = this._y_v * t2 + 0.5 * this._y_a * Math.pow(t2, 2) + this._y_s;
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
Friction.prototype.ds = function(t2) {
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
  const t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
  this._lastDt = null;
  return t2;
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
Spring.prototype._solve = function(e2, t2) {
  const n = this._c;
  const i = this._m;
  const r = this._k;
  const o = n * n - 4 * i * r;
  if (o === 0) {
    const a = -n / (2 * i);
    const s = e2;
    const l = t2 / (a * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a * e3);
      },
      dx: function(e3) {
        const t3 = Math.pow(Math.E, a * e3);
        return a * (s + l * e3) * t3 + l * t3;
      }
    };
  }
  if (o > 0) {
    const c = (-n - Math.sqrt(o)) / (2 * i);
    const u = (-n + Math.sqrt(o)) / (2 * i);
    const d = (t2 - c * e2) / (u - c);
    const h = e2 - d;
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
        return h * t3 + d * n2;
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
        return h * c * t3 + d * u * n2;
      }
    };
  }
  const p2 = Math.sqrt(4 * i * r - n * n) / (2 * i);
  const f2 = -n / 2 * i;
  const v2 = e2;
  const g2 = (t2 - f2 * e2) / p2;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
    },
    dx: function(e3) {
      const t3 = Math.pow(Math.E, f2 * e3);
      const n2 = Math.cos(p2 * e3);
      const i2 = Math.sin(p2 * e3);
      return t3 * (g2 * p2 * n2 - v2 * p2 * i2) + f2 * t3 * (g2 * i2 + v2 * n2);
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
Spring.prototype.setEnd = function(e2, n, i) {
  if (!i) {
    i = new Date().getTime();
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
Spring.prototype.done = function(n) {
  if (!n) {
    n = new Date().getTime();
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};
Spring.prototype.reconfigure = function(m, t2, c) {
  this._m = m;
  this._k = t2;
  this._c = c;
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
function STD(e2, t2, n) {
  this._springX = new Spring(e2, t2, n);
  this._springY = new Spring(e2, t2, n);
  this._springScale = new Spring(e2, t2, n);
  this._startTime = 0;
}
STD.prototype.setEnd = function(e2, t2, n, i) {
  const r = new Date().getTime();
  this._springX.setEnd(e2, i, r);
  this._springY.setEnd(t2, i, r);
  this._springScale.setEnd(n, i, r);
  this._startTime = r;
};
STD.prototype.x = function() {
  const e2 = (new Date().getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e2),
    y: this._springY.x(e2),
    scale: this._springScale.x(e2)
  };
};
STD.prototype.done = function() {
  const e2 = new Date().getTime();
  return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
};
STD.prototype.reconfigure = function(e2, t2, n) {
  this._springX.reconfigure(e2, t2, n);
  this._springY.reconfigure(e2, t2, n);
  this._springScale.reconfigure(e2, t2, n);
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
};
function v(a, b) {
  return +((1e3 * a - 1e3 * b) / 1e3).toFixed(1);
}
var index$u = /* @__PURE__ */ defineBuiltInComponent({
  name: "MovableView",
  props: movableViewProps,
  emits: ["change", "scale"],
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      setParent
    } = useMovableViewState(props2, trigger, rootRef);
    return () => {
      return vue.createVNode("uni-movable-view", {
        "ref": rootRef
      }, [vue.createVNode(ResizeSensor, {
        "onResize": setParent
      }, null, 8, ["onResize"]), slots.default && slots.default()], 512);
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
function p(t2, n) {
  if (t2 === n) {
    return 0;
  }
  let i = t2.offsetLeft;
  return t2.offsetParent ? i += p(t2.offsetParent, n) : 0;
}
function f(t2, n) {
  if (t2 === n) {
    return 0;
  }
  let i = t2.offsetTop;
  return t2.offsetParent ? i += f(t2.offsetParent, n) : 0;
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
  const movableAreaWidth = vue.inject("movableAreaWidth", vue.ref(0));
  const movableAreaHeight = vue.inject("movableAreaHeight", vue.ref(0));
  const movableAreaRootRef = vue.inject("movableAreaRootRef");
  const _offset = {
    x: 0,
    y: 0
  };
  const _scaleOffset = {
    x: 0,
    y: 0
  };
  const width = vue.ref(0);
  const height = vue.ref(0);
  const minX = vue.ref(0);
  const minY = vue.ref(0);
  const maxX = vue.ref(0);
  const maxY = vue.ref(0);
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
  const dampingNumber = vue.computed(() => {
    let val = Number(props2.damping);
    return isNaN(val) ? 20 : val;
  });
  const xMove = vue.computed(() => props2.direction === "all" || props2.direction === "horizontal");
  const yMove = vue.computed(() => props2.direction === "all" || props2.direction === "vertical");
  const xSync = vue.ref(_getPx(props2.x));
  const ySync = vue.ref(_getPx(props2.y));
  vue.watch(() => props2.x, (val) => {
    xSync.value = _getPx(val);
  });
  vue.watch(() => props2.y, (val) => {
    ySync.value = _getPx(val);
  });
  vue.watch(xSync, (val) => {
    _setX(val);
  });
  vue.watch(ySync, (val) => {
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
    if (_FA) {
      _FA.cancel();
    }
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
    rootRef.value.style.transform = transform;
    rootRef.value.style.webkitTransform = transform;
    _translateX.value = x;
    _translateY.value = y;
    _scale.value = scale;
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
  const scaleMinNumber = vue.computed(() => {
    let val = Number(props2.scaleMin);
    return isNaN(val) ? 0.5 : val;
  });
  const scaleMaxNumber = vue.computed(() => {
    let val = Number(props2.scaleMax);
    return isNaN(val) ? 10 : val;
  });
  const scaleValueSync = vue.ref(Number(props2.scaleValue) || 1);
  vue.watch(scaleValueSync, (val) => {
    _setScaleValue(val);
  });
  vue.watch(scaleMinNumber, () => {
    _setScaleMinOrMax();
  });
  vue.watch(scaleMaxNumber, () => {
    _setScaleMinOrMax();
  });
  vue.watch(() => props2.scaleValue, (val) => {
    scaleValueSync.value = Number(val) || 0;
  });
  const {
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY
  } = useMovableViewLayout(rootRef, _scale, _adjustScale);
  const {
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
  } = useMovableViewTransform(rootRef, props2, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger);
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
    scale = Math.max(0.5, scaleMinNumber.value, scale);
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
    _updateOldScale,
    _endScale,
    _setScale,
    scaleValueSync,
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,
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
  const _isMounted = vue.inject("_isMounted", vue.ref(false));
  vue.inject("addMovableViewContext", () => {
  });
  vue.inject("removeMovableViewContext", () => {
  });
  let _scale = vue.ref(1);
  let _oldScale = vue.ref(1);
  let _isScaling = vue.ref(false);
  let _translateX = vue.ref(0);
  let _translateY = vue.ref(0);
  let _SFA = null;
  let _FA = null;
  const frictionNumber = vue.computed(() => {
    let val = Number(props2.friction);
    return isNaN(val) || val <= 0 ? 2 : val;
  });
  new Friction(1, frictionNumber.value);
  vue.watch(() => props2.disabled, () => {
    __handleTouchStart();
  });
  const {
    _updateOldScale,
    _endScale,
    _setScale,
    scaleValueSync,
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,
    FAandSFACancel,
    _getLimitXY,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD
  } = useMovableViewInit(props2, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
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
  return {
    setParent
  };
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
      console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
      return;
    }
    const animationDuration = parseInt(props2.animationDuration);
    switch (props2.openType) {
      case "navigate":
        uni.navigateTo({
          url: props2.url,
          animationType: props2.animationType || "pop-in",
          animationDuration
        });
        break;
      case "redirect":
        uni.redirectTo({
          url: props2.url,
          exists: props2.exists
        });
        break;
      case "switchTab":
        uni.switchTab({
          url: props2.url
        });
        break;
      case "reLaunch":
        uni.reLaunch({
          url: props2.url
        });
        break;
      case "navigateBack":
        uni.navigateBack({
          delta: props2.delta,
          animationType: props2.animationType || "pop-out",
          animationDuration
        });
        break;
    }
  };
}
var index$t = /* @__PURE__ */ defineBuiltInComponent({
  name: "Navigator",
  inheritAttrs: false,
  compatConfig: {
    MODE: 3
  },
  props: navigatorProps,
  setup(props2, {
    slots
  }) {
    const vm = vue.getCurrentInstance();
    const __scopeId = vm && vm.vnode.scopeId || "";
    const {
      hovering,
      binding
    } = useHover(props2);
    const onClick = createNavigatorOnClick(props2);
    return () => {
      const {
        hoverClass,
        url
      } = props2;
      const hasHoverClass = props2.hoverClass && props2.hoverClass !== "none";
      return vue.createVNode("a", {
        "class": "navigator-wrap",
        "href": url,
        "onClick": onEventPrevent,
        "onMousedown": onEventPrevent
      }, [vue.createVNode("uni-navigator", vue.mergeProps({
        "class": hasHoverClass && hovering.value ? hoverClass : ""
      }, hasHoverClass && binding, vm ? vm.attrs : {}, {
        [__scopeId]: ""
      }, {
        "onClick": onClick
      }), [slots.default && slots.default()], 16, ["onClick"])], 40, ["href", "onClick", "onMousedown"]);
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
function useState$2(props2) {
  const value = vue.reactive([...props2.value]);
  const state = vue.reactive({
    value,
    height: 34
  });
  vue.watch(() => props2.value, (val, oldVal) => {
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
var PickerView = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerView",
  props: pickerViewProps,
  emits: ["change", "pickstart", "pickend", "update:value"],
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const wrapperRef = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const state = useState$2(props2);
    const resizeSensorRef = vue.ref(null);
    let ColumnsPreRef = vue.ref([]);
    let columnsRef = vue.ref([]);
    function getItemIndex(vnode) {
      let columnVNodes = columnsRef.value;
      {
        columnVNodes = columnVNodes.filter((vnode2) => vnode2.type !== vue.Comment);
      }
      let index2 = columnVNodes.indexOf(vnode);
      return index2 !== -1 ? index2 : ColumnsPreRef.value.indexOf(vnode);
    }
    const getPickerViewColumn = function(columnInstance) {
      const ref = vue.computed({
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
            trigger("change", {}, {
              value
            });
          }
        }
      });
      return ref;
    };
    vue.provide("getPickerViewColumn", getPickerViewColumn);
    vue.provide("pickerViewProps", props2);
    vue.provide("pickerViewState", state);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        const vnode = flatVNode(defaultSlots);
        ColumnsPreRef.value = vnode;
        vue.nextTick(() => {
          columnsRef.value = vnode;
        });
      }
      return vue.createVNode("uni-picker-view", {
        "ref": rootRef
      }, [vue.createVNode(ResizeSensor, {
        "ref": resizeSensorRef,
        "onResize": ({
          height
        }) => state.height = height
      }, null, 8, ["onResize"]), vue.createVNode("div", {
        "ref": wrapperRef,
        "class": "uni-picker-view-wrapper"
      }, [defaultSlots], 512)], 512);
    };
  }
});
let scopedIndex = 0;
function useScopedClass(indicatorHeightRef) {
  const className = `uni-picker-view-content-${scopedIndex++}`;
  function updateStyle() {
    const style = document.createElement("style");
    style.innerText = `.uni-picker-view-content.${className}>*{height: ${indicatorHeightRef.value}px;overflow: hidden;}`;
    document.head.appendChild(style);
  }
  vue.watch(() => indicatorHeightRef.value, updateStyle);
  return className;
}
var PickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerViewColumn",
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const contentRef = vue.ref(null);
    const getPickerViewColumn = vue.inject("getPickerViewColumn");
    const instance = vue.getCurrentInstance();
    const currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : vue.ref(0);
    const pickerViewProps2 = vue.inject("pickerViewProps");
    const pickerViewState = vue.inject("pickerViewState");
    const indicatorHeight = vue.ref(34);
    const resizeSensorRef = vue.ref(null);
    const maskSize = vue.computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
    const {
      state: scopedAttrsState
    } = useScopedAttrs();
    const className = useScopedClass(indicatorHeight);
    let scroller;
    const state = vue.reactive({
      current: currentRef.value,
      length: 0
    });
    function updatesScroller() {
    }
    vue.watch(() => currentRef.value, (current) => {
      if (current !== state.current) {
        state.current = current;
      }
    });
    vue.watch(() => state.current, (current) => currentRef.value = current);
    vue.watch([() => indicatorHeight.value, () => state.length, () => pickerViewState.height], updatesScroller);
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
    function handleTap({
      clientY
    }) {
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
      return vue.createVNode("uni-picker-view-column", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "onWheel": handleWheel,
        "onClick": handleTap,
        "class": "uni-picker-view-group"
      }, [vue.createVNode("div", vue.mergeProps(scopedAttrsState.attrs, {
        "class": ["uni-picker-view-mask", pickerViewProps2.maskClass],
        "style": `background-size: 100% ${maskSize.value}px;${pickerViewProps2.maskStyle}`
      }), null, 16), vue.createVNode("div", vue.mergeProps(scopedAttrsState.attrs, {
        "class": ["uni-picker-view-indicator", pickerViewProps2.indicatorClass],
        "style": pickerViewProps2.indicatorStyle
      }), [vue.createVNode(ResizeSensor, {
        "ref": resizeSensorRef,
        "onResize": ({
          height
        }) => indicatorHeight.value = height
      }, null, 8, ["onResize"])], 16), vue.createVNode("div", {
        "ref": contentRef,
        "class": ["uni-picker-view-content", className],
        "style": {
          padding
        }
      }, [defaultSlots], 6)], 40, ["onWheel", "onClick"])], 512);
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
var index$s = /* @__PURE__ */ defineBuiltInComponent({
  name: "Progress",
  props: progressProps,
  setup(props2) {
    const state = useProgressState(props2);
    _activeAnimation(state, props2);
    vue.watch(() => state.realPercent, (newValue, oldValue) => {
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
      return vue.createVNode("uni-progress", {
        "class": "uni-progress"
      }, [vue.createVNode("div", {
        "style": outerBarStyle,
        "class": "uni-progress-bar"
      }, [vue.createVNode("div", {
        "style": innerBarStyle,
        "class": "uni-progress-inner-bar"
      }, null, 4)], 4), showInfo ? vue.createVNode("p", {
        "class": "uni-progress-info"
      }, [currentPercent + "%"]) : ""]);
    };
  }
});
function useProgressState(props2) {
  const currentPercent = vue.ref(0);
  const outerBarStyle = vue.computed(() => `background-color: ${props2.backgroundColor}; height: ${props2.strokeWidth}px;`);
  const innerBarStyle = vue.computed(() => {
    const backgroundColor = props2.color !== PROGRESS_VALUES.activeColor && props2.activeColor === PROGRESS_VALUES.activeColor ? props2.color : props2.activeColor;
    return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
  });
  const realPercent = vue.computed(() => {
    let realValue = parseFloat(props2.percent);
    realValue < 0 && (realValue = 0);
    realValue > 100 && (realValue = 100);
    return realValue;
  });
  const state = vue.reactive({
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
const props$i = {
  name: {
    type: String,
    default: ""
  }
};
var index$r = /* @__PURE__ */ defineBuiltInComponent({
  name: "RadioGroup",
  props: props$i,
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideRadioGroup(props2, trigger);
    return () => {
      return vue.createVNode("uni-radio-group", {
        "ref": rootRef
      }, [slots.default && slots.default()], 512);
    };
  }
});
function useProvideRadioGroup(props2, trigger) {
  const fields2 = [];
  const getFieldsValue = () => {
    var _a;
    return (_a = fields2.find((field) => field.value.radioChecked)) == null ? void 0 : _a.value.value;
  };
  vue.provide(uniRadioGroupKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    radioChange($event, field) {
      const index2 = fields2.indexOf(field);
      _resetRadioGroupValue(index2, true);
      trigger("change", $event, {
        value: getFieldsValue()
      });
    }
  });
  const uniForm = vue.inject(uniFormKey, false);
  const formField = {
    submit: () => {
      let data = ["", null];
      if (props2.name !== "") {
        data[0] = props2.name;
        data[1] = getFieldsValue();
      }
      return data;
    }
  };
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
      if (change) {
        setFieldChecked(fields2[index2], false);
      } else {
        fields2.forEach((v2, i) => {
          if (index2 >= i) {
            return;
          }
          if (fields2[i].value.radioChecked) {
            setFieldChecked(fields2[index2], false);
          }
        });
      }
    });
  }
  return fields2;
}
const props$h = {
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
var index$q = /* @__PURE__ */ defineBuiltInComponent({
  name: "Radio",
  props: props$h,
  setup(props2, {
    slots
  }) {
    const radioChecked = vue.ref(props2.checked);
    const radioValue = vue.ref(props2.value);
    const checkedStyle = vue.computed(() => `background-color: ${props2.color};border-color: ${props2.color};`);
    vue.watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
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
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return vue.createVNode("uni-radio", vue.mergeProps(booleanAttrs, {
        "onClick": _onClick
      }), [vue.createVNode("div", {
        "class": "uni-radio-wrapper"
      }, [vue.createVNode("div", {
        "class": ["uni-radio-input", {
          "uni-radio-input-disabled": props2.disabled
        }],
        "style": radioChecked.value ? checkedStyle.value : ""
      }, [radioChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, "#fff", 18) : ""], 6), slots.default && slots.default()])], 16, ["onClick"]);
    };
  }
});
function useRadioInject(radioChecked, radioValue, reset) {
  const field = vue.computed({
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
  const uniCheckGroup = vue.inject(uniRadioGroupKey, false);
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field);
  }
  const uniForm = vue.inject(uniFormKey, false);
  if (!!uniForm) {
    uniForm.addField(formField);
  }
  const uniLabel = vue.inject(uniLabelKey, false);
  return {
    uniCheckGroup,
    uniForm,
    uniLabel,
    field
  };
}
const TAGS = {
  a: "",
  abbr: "",
  address: "",
  article: "",
  aside: "",
  b: "",
  bdi: "",
  bdo: ["dir"],
  big: "",
  blockquote: "",
  br: "",
  caption: "",
  center: "",
  cite: "",
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
  font: "",
  footer: "",
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  header: "",
  hr: "",
  i: "",
  img: ["alt", "src", "height", "width"],
  ins: "",
  label: "",
  legend: "",
  li: "",
  mark: "",
  nav: "",
  ol: ["start", "type"],
  p: "",
  pre: "",
  q: "",
  rt: "",
  ruby: "",
  s: "",
  section: "",
  small: "",
  span: "",
  strong: "",
  sub: "",
  sup: "",
  table: ["width"],
  tbody: "",
  td: ["colspan", "height", "rowspan", "width"],
  tfoot: "",
  th: ["colspan", "height", "rowspan", "width"],
  thead: "",
  tr: ["colspan", "height", "rowspan", "width"],
  tt: "",
  u: "",
  ul: ""
};
const CHARS = {
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  apos: "'",
  ldquo: "\u201C",
  rdquo: "\u201D",
  yen: "\uFFE5",
  radic: "\u221A",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  hellip: "\u2026"
};
function decodeEntities(htmlString) {
  return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
    if (shared.hasOwn(CHARS, stage) && CHARS[stage]) {
      return CHARS[stage];
    }
    if (/^#[0-9]{1,4}$/.test(stage)) {
      return String.fromCharCode(stage.slice(1));
    }
    if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
      return String.fromCharCode(0 + stage.slice(1));
    }
    return match;
  });
}
function processClickEvent(node, triggerItemClick) {
  if (["a", "img"].includes(node.name) && triggerItemClick) {
    return {
      onClick: (e2) => {
        triggerItemClick(e2, { node });
        e2.stopPropagation();
        e2.preventDefault();
        e2.returnValue = false;
      }
    };
  }
}
function normalizeAttrs(tagName, attrs) {
  if (!shared.isPlainObject(attrs))
    return;
  for (const key in attrs) {
    if (shared.hasOwn(attrs, key)) {
      const value = attrs[key];
      if (tagName === "img" && key === "src")
        attrs[key] = getRealPath(value);
    }
  }
}
const nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
  if (!nodeList || shared.isArray(nodeList) && !nodeList.length)
    return [];
  return nodeList.map((node) => {
    if (!shared.isPlainObject(node)) {
      return;
    }
    if (!shared.hasOwn(node, "type") || node.type === "node") {
      let nodeProps = { [scopeId]: "" };
      const tagName = node.name.toLowerCase();
      if (!shared.hasOwn(TAGS, tagName)) {
        return;
      }
      normalizeAttrs(tagName, node.attrs);
      nodeProps = shared.extend(nodeProps, processClickEvent(node, triggerItemClick), node.attrs);
      return vue.h(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
    }
    if (node.type === "text" && shared.isString(node.text) && node.text !== "")
      return vue.createTextVNode(decodeEntities(node.text || ""));
  });
};
function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs) {
  return attrs.reduce(function(pre, attr2) {
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
    start: function(tag, attrs, unary) {
      const node = {
        name: tag
      };
      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
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
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return results.children;
}
const props$g = {
  nodes: {
    type: [Array, String],
    default: function() {
      return [];
    }
  }
};
var index$p = /* @__PURE__ */ defineBuiltInComponent({
  name: "RichText",
  compatConfig: {
    MODE: 3
  },
  props: props$g,
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "longpress", "itemclick"],
  setup(props2, {
    emit: emit2
  }) {
    const vm = vue.getCurrentInstance();
    const scopeId = vm && vm.vnode.scopeId || "";
    const rootRef = vue.ref(null);
    const _vnode = vue.ref([]);
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
    vue.watch(() => props2.nodes, renderVNode, {
      immediate: true
    });
    return () => vue.h("uni-rich-text", {
      ref: rootRef
    }, vue.h("div", {}, _vnode.value));
  }
});
const props$f = {
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
};
var index$o = /* @__PURE__ */ defineBuiltInComponent({
  name: "ScrollView",
  compatConfig: {
    MODE: 3
  },
  props: props$f,
  emits: ["scroll", "scrolltoupper", "scrolltolower", "refresherrefresh", "refresherrestore", "refresherpulling", "refresherabort", "update:refresherTriggered"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = vue.ref(null);
    const main = vue.ref(null);
    const wrap = vue.ref(null);
    const content = vue.ref(null);
    const refresherinner = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      state,
      scrollTopNumber,
      scrollLeftNumber
    } = useScrollViewState(props2);
    useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit2);
    const mainStyle = vue.computed(() => {
      let style = "";
      props2.scrollX ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
      props2.scrollY ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
      return style;
    });
    return () => {
      const {
        refresherEnabled,
        refresherBackground,
        refresherDefaultStyle
      } = props2;
      const {
        refresherHeight,
        refreshState,
        refreshRotate
      } = state;
      return vue.createVNode("uni-scroll-view", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "ref": wrap,
        "class": "uni-scroll-view"
      }, [vue.createVNode("div", {
        "ref": main,
        "style": mainStyle.value,
        "class": "uni-scroll-view"
      }, [vue.createVNode("div", {
        "ref": content,
        "class": "uni-scroll-view-content"
      }, [refresherEnabled ? vue.createVNode("div", {
        "ref": refresherinner,
        "style": {
          backgroundColor: refresherBackground,
          height: refresherHeight + "px"
        },
        "class": "uni-scroll-view-refresher"
      }, [refresherDefaultStyle !== "none" ? vue.createVNode("div", {
        "class": "uni-scroll-view-refresh"
      }, [vue.createVNode("div", {
        "class": "uni-scroll-view-refresh-inner"
      }, [refreshState == "pulling" ? vue.createVNode("svg", {
        "key": "refresh__icon",
        "style": {
          transform: "rotate(" + refreshRotate + "deg)"
        },
        "fill": "#2BD009",
        "class": "uni-scroll-view-refresh__icon",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }, [vue.createVNode("path", {
        "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      }, null), vue.createVNode("path", {
        "d": "M0 0h24v24H0z",
        "fill": "none"
      }, null)], 4) : null, refreshState == "refreshing" ? vue.createVNode("svg", {
        "key": "refresh__spinner",
        "class": "uni-scroll-view-refresh__spinner",
        "width": "24",
        "height": "24",
        "viewBox": "25 25 50 50"
      }, [vue.createVNode("circle", {
        "cx": "50",
        "cy": "50",
        "r": "20",
        "fill": "none",
        "style": "color: #2bd009",
        "stroke-width": "3"
      }, null)]) : null])]) : null, refresherDefaultStyle == "none" ? slots.refresher && slots.refresher() : null], 4) : null, slots.default && slots.default()], 512)], 4)], 512)], 512);
    };
  }
});
function useScrollViewState(props2) {
  const scrollTopNumber = vue.computed(() => {
    return Number(props2.scrollTop) || 0;
  });
  const scrollLeftNumber = vue.computed(() => {
    return Number(props2.scrollLeft) || 0;
  });
  const state = vue.reactive({
    lastScrollTop: scrollTopNumber.value,
    lastScrollLeft: scrollLeftNumber.value,
    lastScrollToUpperTime: 0,
    lastScrollToLowerTime: 0,
    refresherHeight: 0,
    refreshRotate: 0,
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
  vue.computed(() => {
    let val = Number(props2.upperThreshold);
    return isNaN(val) ? 50 : val;
  });
  vue.computed(() => {
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
    if (props2.scrollY) {
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
    if (props2.scrollX) {
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
        if (props2.scrollX) {
          let left = elRect.left - mainRect.left;
          let scrollLeft = main.value.scrollLeft;
          let x = scrollLeft + left;
          if (props2.scrollWithAnimation) {
            scrollTo(x, "x");
          } else {
            main.value.scrollLeft = x;
          }
        }
        if (props2.scrollY) {
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
      _main.style.overflowX = props2.scrollX ? "auto" : "hidden";
      _main.scrollLeft = val;
    } else if (direction === "y") {
      _main.style.overflowY = props2.scrollY ? "auto" : "hidden";
      _main.scrollTop = val;
    }
    content.value.removeEventListener("transitionend", __transitionEnd);
    content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
  }
  function _setRefreshState(_state) {
    switch (_state) {
      case "refreshing":
        state.refresherHeight = props2.refresherThreshold;
        if (!beforeRefreshing) {
          beforeRefreshing = true;
          trigger("refresherrefresh", {}, {});
          emit2("update:refresherTriggered", true);
        }
        break;
      case "restore":
      case "refresherabort":
        beforeRefreshing = false;
        state.refresherHeight = 0;
        if (_state === "restore") {
          triggerAbort = false;
          trigger("refresherrestore", {}, {});
        }
        if (_state === "refresherabort" && triggerAbort) {
          triggerAbort = false;
          trigger("refresherabort", {}, {});
        }
        break;
    }
    state.refreshState = _state;
  }
  vue.watch(scrollTopNumber, (val) => {
    _scrollTopChanged(val);
  });
  vue.watch(scrollLeftNumber, (val) => {
    _scrollLeftChanged(val);
  });
  vue.watch(() => props2.scrollIntoView, (val) => {
    _scrollIntoViewChanged(val);
  });
  vue.watch(() => props2.refresherTriggered, (val) => {
    if (val === true) {
      _setRefreshState("refreshing");
    } else if (val === false) {
      _setRefreshState("restore");
    }
  });
}
const props$e = {
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
var index$n = /* @__PURE__ */ defineBuiltInComponent({
  name: "Slider",
  props: props$e,
  emits: ["changing", "change"],
  setup(props2, {
    emit: emit2
  }) {
    const sliderRef = vue.ref(null);
    const sliderValueRef = vue.ref(null);
    const sliderHandleRef = vue.ref(null);
    const sliderValue = vue.ref(Number(props2.value));
    vue.watch(() => props2.value, (val) => {
      sliderValue.value = Number(val);
    });
    const trigger = useCustomEvent(sliderRef, emit2);
    const state = useSliderState(props2, sliderValue);
    const {
      _onClick,
      _onTrack
    } = useSliderLoader(props2, sliderValue, sliderRef, sliderValueRef, trigger);
    return () => {
      const {
        setBgColor,
        setBlockBg,
        setActiveColor,
        setBlockStyle
      } = state;
      return vue.createVNode("uni-slider", {
        "ref": sliderRef,
        "onClick": withWebEvent(_onClick)
      }, [vue.createVNode("div", {
        "class": "uni-slider-wrapper"
      }, [vue.createVNode("div", {
        "class": "uni-slider-tap-area"
      }, [vue.createVNode("div", {
        "style": setBgColor.value,
        "class": "uni-slider-handle-wrapper"
      }, [vue.createVNode("div", {
        "ref": sliderHandleRef,
        "style": setBlockBg.value,
        "class": "uni-slider-handle"
      }, null, 4), vue.createVNode("div", {
        "style": setBlockStyle.value,
        "class": "uni-slider-thumb"
      }, null, 4), vue.createVNode("div", {
        "style": setActiveColor.value,
        "class": "uni-slider-track"
      }, null, 4)], 4)]), vue.withDirectives(vue.createVNode("span", {
        "ref": sliderValueRef,
        "class": "uni-slider-value"
      }, [sliderValue.value], 512), [[vue.vShow, props2.showValue]])]), vue.createVNode("slot", null, null)], 8, ["onClick"]);
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
    setBgColor: vue.computed(() => ({
      backgroundColor: _getBgColor()
    })),
    setBlockBg: vue.computed(() => ({
      left: _getValueWidth()
    })),
    setActiveColor: vue.computed(() => ({
      backgroundColor: _getActiveColor(),
      width: _getValueWidth()
    })),
    setBlockStyle: vue.computed(() => ({
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
        x: e2.detail.x
      }), trigger("changing", e2, {
        value: sliderValue.value
      }), false) : e2.detail.state === "end" && trigger("change", e2, {
        value: sliderValue.value
      });
    }
  };
  const uniForm = vue.inject(uniFormKey, false);
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
const props$d = {
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
function useState$1(props2) {
  const interval = vue.computed(() => {
    const interval2 = Number(props2.interval);
    return isNaN(interval2) ? 5e3 : interval2;
  });
  const duration = vue.computed(() => {
    const duration2 = Number(props2.duration);
    return isNaN(duration2) ? 500 : duration2;
  });
  const displayMultipleItems = vue.computed(() => {
    const displayMultipleItems2 = Math.round(props2.displayMultipleItems);
    return isNaN(displayMultipleItems2) ? 1 : displayMultipleItems2;
  });
  const state = vue.reactive({
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
  const swiperEnabled = vue.computed(() => swiperContexts.value.length > state.displayMultipleItems);
  const circularEnabled = vue.computed(() => props2.circular && swiperEnabled.value);
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
        const position = [s, l, c][[u, d, h].indexOf(p2)];
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
  vue.watch([() => props2.current, () => props2.currentItemId, () => [...swiperContexts.value]], () => {
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
  vue.watch([() => props2.vertical, () => circularEnabled.value, () => state.displayMultipleItems, () => [...swiperContexts.value]], resetLayout);
  vue.watch(() => state.interval, () => {
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
  vue.watch(() => state.current, (val, oldVal) => {
    currentChanged(val, oldVal);
    emit2("update:current", val);
  });
  vue.watch(() => state.currentItemId, (val) => {
    emit2("update:currentItemId", val);
  });
  function inintAutoplay(enable) {
    if (enable) {
      scheduleAutoplay();
    } else {
      cancelSchedule();
    }
  }
  vue.watch(() => props2.autoplay && !state.userTracking, inintAutoplay);
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
var index$m = /* @__PURE__ */ defineBuiltInComponent({
  name: "Swiper",
  props: props$d,
  emits: ["change", "transition", "animationfinish", "update:current", "update:currentItemId"],
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const slidesWrapperRef = vue.ref(null);
    const slideFrameRef = vue.ref(null);
    const state = useState$1(props2);
    const slidesStyle = vue.computed(() => {
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
    const slideFrameStyle = vue.computed(() => {
      const value = Math.abs(100 / state.displayMultipleItems) + "%";
      return {
        width: props2.vertical ? "100%" : value,
        height: !props2.vertical ? "100%" : value
      };
    });
    let swiperItems = [];
    const originSwiperContexts = [];
    const swiperContexts = vue.ref([]);
    function updateSwiperContexts() {
      const contexts = [];
      for (let index2 = 0; index2 < swiperItems.length; index2++) {
        let swiperItem = swiperItems[index2];
        if (!(swiperItem instanceof Element)) {
          swiperItem = swiperItem.el;
        }
        const swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
        if (swiperContext) {
          contexts.push(vue.markRaw(swiperContext));
        }
      }
      swiperContexts.value = contexts;
    }
    const addSwiperContext = function(swiperContext) {
      originSwiperContexts.push(swiperContext);
      updateSwiperContexts();
    };
    vue.provide("addSwiperContext", addSwiperContext);
    const removeSwiperContext = function(swiperContext) {
      const index2 = originSwiperContexts.indexOf(swiperContext);
      if (index2 >= 0) {
        originSwiperContexts.splice(index2, 1);
        updateSwiperContexts();
      }
    };
    vue.provide("removeSwiperContext", removeSwiperContext);
    const {
      onSwiperDotClick,
      circularEnabled,
      swiperEnabled
    } = useLayout(props2, state, swiperContexts, slideFrameRef, emit2, trigger);
    let createNavigationTsx = () => null;
    {
      createNavigationTsx = useSwiperNavigation(rootRef, props2, state, onSwiperDotClick, swiperContexts, circularEnabled, swiperEnabled);
    }
    return () => {
      const defaultSlots = slots.default && slots.default();
      swiperItems = flatVNode(defaultSlots);
      return vue.createVNode("uni-swiper", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "ref": slidesWrapperRef,
        "class": "uni-swiper-wrapper"
      }, [vue.createVNode("div", {
        "class": "uni-swiper-slides",
        "style": slidesStyle.value
      }, [vue.createVNode("div", {
        "ref": slideFrameRef,
        "class": "uni-swiper-slide-frame",
        "style": slideFrameStyle.value
      }, [defaultSlots], 4)], 4), props2.indicatorDots && vue.createVNode("div", {
        "class": ["uni-swiper-dots", props2.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"]
      }, [swiperContexts.value.map((_, index2, array) => vue.createVNode("div", {
        "onClick": () => onSwiperDotClick(index2),
        "class": {
          "uni-swiper-dot": true,
          "uni-swiper-dot-active": index2 < state.current + state.displayMultipleItems && index2 >= state.current || index2 < state.current + state.displayMultipleItems - array.length
        },
        "style": {
          background: index2 === state.current ? props2.indicatorActiveColor : props2.indicatorColor
        }
      }, null, 14, ["onClick"]))], 2), createNavigationTsx()], 512)], 512);
    };
  }
});
const useSwiperNavigation = (rootRef, props2, state, onSwiperDotClick, swiperContext, circularEnabled, swiperEnabled) => {
  let isNavigationAuto = false;
  let prevDisabled = false;
  let nextDisabled = false;
  let hideNavigation = vue.ref(false);
  vue.watchEffect(() => {
    isNavigationAuto = props2.navigation === "auto";
    hideNavigation.value = props2.navigation !== true || isNavigationAuto;
    swiperAddMouseEvent();
  });
  vue.watchEffect(() => {
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
  function navigationClick($event, type) {
    $event.stopPropagation();
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
    const {
      clientX,
      clientY
    } = e2;
    const {
      left,
      right,
      top,
      bottom,
      width,
      height
    } = rootRef.value.getBoundingClientRect();
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
      return vue.createVNode(vue.Fragment, null, [vue.createVNode("div", vue.mergeProps({
        "class": ["uni-swiper-navigation uni-swiper-navigation-prev", shared.extend({
          "uni-swiper-navigation-disabled": prevDisabled
        }, navigationClass)],
        "onClick": (e2) => navigationClick(e2, "prev")
      }, navigationAttr), [createNavigationSVG()], 16, ["onClick"]), vue.createVNode("div", vue.mergeProps({
        "class": ["uni-swiper-navigation uni-swiper-navigation-next", shared.extend({
          "uni-swiper-navigation-disabled": nextDisabled
        }, navigationClass)],
        "onClick": (e2) => navigationClick(e2, "next")
      }, navigationAttr), [createNavigationSVG()], 16, ["onClick"])]);
    }
    return null;
  }
  return createNavigationTsx;
};
const props$c = {
  itemId: {
    type: String,
    default: ""
  }
};
var index$l = /* @__PURE__ */ defineBuiltInComponent({
  name: "SwiperItem",
  props: props$c,
  setup(props2, {
    slots
  }) {
    const rootRef = vue.ref(null);
    return () => {
      return vue.createVNode("uni-swiper-item", {
        "ref": rootRef,
        "style": {
          position: "absolute",
          width: "100%",
          height: "100%"
        }
      }, [slots.default && slots.default()], 512);
    };
  }
});
const props$b = {
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
var index$k = /* @__PURE__ */ defineBuiltInComponent({
  name: "Switch",
  props: props$b,
  emits: ["change"],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const switchChecked = vue.ref(props2.checked);
    const uniLabel = useSwitchInject(props2, switchChecked);
    const trigger = useCustomEvent(rootRef, emit2);
    vue.watch(() => props2.checked, (val) => {
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
    }
    return () => {
      const {
        color,
        type
      } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return vue.createVNode("uni-switch", vue.mergeProps({
        "ref": rootRef
      }, booleanAttrs, {
        "onClick": _onClick
      }), [vue.createVNode("div", {
        "class": "uni-switch-wrapper"
      }, [vue.withDirectives(vue.createVNode("div", {
        "class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
        "style": {
          backgroundColor: switchChecked.value ? color : "#DFDFDF",
          borderColor: switchChecked.value ? color : "#DFDFDF"
        }
      }, null, 6), [[vue.vShow, type === "switch"]]), vue.withDirectives(vue.createVNode("div", {
        "class": "uni-checkbox-input"
      }, [switchChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 512), [[vue.vShow, type === "checkbox"]])])], 16, ["onClick"]);
    };
  }
});
function useSwitchInject(props2, switchChecked) {
  const uniForm = vue.inject(uniFormKey, false);
  const uniLabel = vue.inject(uniLabelKey, false);
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
  }
  return uniLabel;
}
const SPACE_UNICODE = {
  ensp: "\u2002",
  emsp: "\u2003",
  nbsp: "\xA0"
};
function parseText(text, options) {
  return text.replace(/\\n/g, uniShared.LINEFEED).split(uniShared.LINEFEED).map((text2) => {
    return normalizeText(text2, options);
  });
}
function normalizeText(text, { space, decode }) {
  if (!text) {
    return text;
  }
  if (space && SPACE_UNICODE[space]) {
    text = text.replace(/ /g, SPACE_UNICODE[space]);
  }
  if (!decode) {
    return text;
  }
  return text.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
var index$j = /* @__PURE__ */ defineBuiltInComponent({
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
          if (vnode.shapeFlag & 8 && vnode.type !== vue.Comment) {
            const lines = parseText(vnode.children, {
              space: props2.space,
              decode: props2.decode
            });
            const len = lines.length - 1;
            lines.forEach((line, index2) => {
              if (index2 === 0 && !line)
                ;
              else {
                children.push(vue.createTextVNode(line));
              }
              if (index2 !== len) {
                children.push(vue.createVNode("br"));
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
      return vue.createVNode("uni-text", {
        "selectable": props2.selectable ? true : null
      }, [vue.createVNode("span", null, children)], 8, ["selectable"]);
    };
  }
});
const props$a = /* @__PURE__ */ shared.extend({}, props$k, {
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
let fixMargin = false;
const ConfirmTypes = ["done", "go", "next", "search", "send"];
var index$i = /* @__PURE__ */ defineBuiltInComponent({
  name: "Textarea",
  props: props$a,
  emits: ["confirm", "linechange", ...emit],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const wrapperRef = vue.ref(null);
    const {
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      trigger
    } = useField(props2, rootRef, emit2);
    const valueCompute = vue.computed(() => state.value.split(uniShared.LINEFEED));
    const isDone = vue.computed(() => ConfirmTypes.includes(props2.confirmType));
    const heightRef = vue.ref(0);
    const lineRef = vue.ref(null);
    vue.watch(() => heightRef.value, (height) => {
      const el = rootRef.value;
      const lineEl = lineRef.value;
      const wrapper2 = wrapperRef.value;
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
        el.style.height = "auto";
        wrapper2.style.height = height + "px";
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
        !props2.confirmHold && textarea.blur();
      }
    }
    return () => {
      let textareaNode = props2.disabled && fixDisabledColor ? vue.createVNode("textarea", {
        "ref": fieldRef,
        "value": state.value,
        "tabindex": "-1",
        "readonly": !!props2.disabled,
        "maxlength": state.maxlength,
        "class": {
          "uni-textarea-textarea": true,
          "uni-textarea-textarea-fix-margin": fixMargin
        },
        "style": {
          overflowY: props2.autoHeight ? "hidden" : "auto"
        },
        "onFocus": (event) => event.target.blur()
      }, null, 46, ["value", "readonly", "maxlength", "onFocus"]) : vue.createVNode("textarea", {
        "ref": fieldRef,
        "value": state.value,
        "disabled": !!props2.disabled,
        "maxlength": state.maxlength,
        "enterkeyhint": props2.confirmType,
        "class": {
          "uni-textarea-textarea": true,
          "uni-textarea-textarea-fix-margin": fixMargin
        },
        "style": {
          overflowY: props2.autoHeight ? "hidden" : "auto"
        },
        "onKeydown": onKeyDownEnter,
        "onKeyup": onKeyUpEnter
      }, null, 46, ["value", "disabled", "maxlength", "enterkeyhint", "onKeydown", "onKeyup"]);
      return vue.createVNode("uni-textarea", {
        "ref": rootRef
      }, [vue.createVNode("div", {
        "ref": wrapperRef,
        "class": "uni-textarea-wrapper"
      }, [vue.withDirectives(vue.createVNode("div", vue.mergeProps(scopedAttrsState.attrs, {
        "style": props2.placeholderStyle,
        "class": ["uni-textarea-placeholder", props2.placeholderClass]
      }), [props2.placeholder], 16), [[vue.vShow, !state.value.length]]), vue.createVNode("div", {
        "ref": lineRef,
        "class": "uni-textarea-line"
      }, [" "], 512), vue.createVNode("div", {
        "class": "uni-textarea-compute"
      }, [valueCompute.value.map((item) => vue.createVNode("div", null, [item.trim() ? item : "."])), vue.createVNode(ResizeSensor, {
        "initial": true,
        "onResize": onResize
      }, null, 8, ["initial", "onResize"])]), props2.confirmType === "search" ? vue.createVNode("form", {
        "action": "",
        "onSubmit": () => false,
        "class": "uni-input-form"
      }, [textareaNode], 40, ["onSubmit"]) : textareaNode], 512)], 512);
    };
  }
});
var index$h = /* @__PURE__ */ defineBuiltInComponent({
  name: "View",
  props: shared.extend({}, hoverProps),
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
        return vue.createVNode("uni-view", vue.mergeProps({
          "class": hovering.value ? hoverClass : ""
        }, binding), [slots.default && slots.default()], 16);
      }
      return vue.createVNode("uni-view", null, [slots.default && slots.default()]);
    };
  }
});
function useSubscribe(callback, name, multiple, pageId) {
  const instance = vue.getCurrentInstance();
  instance.proxy;
}
let index$g = 0;
function useContextInfo(_id) {
  useCurrentPageId();
  const instance = vue.getCurrentInstance();
  const vm = instance.proxy;
  const type = vm.$options.name.toLowerCase();
  const id = _id || vm.id || `context${index$g++}`;
  return `${type}.${id}`;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (shared.isFunction(hook)) {
    vue.injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options[name];
      if (shared.isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
  if (mpType === "page") {
    instance.__isVisible = true;
    try {
      invokeHook(publicThis, uniShared.ON_LOAD, instance.attrs.__pageQuery);
      delete instance.attrs.__pageQuery;
      invokeHook(publicThis, uniShared.ON_SHOW);
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
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      invokeHook(appInstance.proxy, uniShared.ON_ERROR, err);
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
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
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
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
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
function initApp$1(app) {
  const appConfig = app._context.config;
  if (shared.isFunction(app._component.onError)) {
    appConfig.errorHandler = createErrorHandler(app);
  }
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
  }
  {
    uniShared.invokeCreateVueAppHook(app);
  }
}
const pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
  return vue.inject(pageMetaKey);
}
function providePageMeta(id) {
  const pageMeta = initPageMeta(id);
  vue.provide(pageMetaKey, pageMeta);
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
    query = uniShared.parseQuery(url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length));
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
function initPageMeta(id) {
  if (__UNI_FEATURE_PAGES__) {
    return vue.reactive(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(vueRouter.useRoute().meta, id)))));
  }
  return vue.reactive(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id)))));
}
function normalizePageMeta(pageMeta) {
  if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    const { enablePullDownRefresh, navigationBar } = pageMeta;
    if (enablePullDownRefresh) {
      const pullToRefresh = normalizePullToRefreshRpx(shared.extend({
        support: true,
        color: "#2BD009",
        style: "circle",
        height: 70,
        range: 150,
        offset: 0
      }, pageMeta.pullToRefresh));
      const { type, style } = navigationBar;
      if (style !== "custom" && type !== "transparent") {
        pullToRefresh.offset += uniShared.NAVBAR_HEIGHT + 0;
      }
      pageMeta.pullToRefresh = pullToRefresh;
    }
  }
  if (__UNI_FEATURE_NAVIGATIONBAR__) {
    const { navigationBar } = pageMeta;
    const { titleSize, titleColor, backgroundColor } = navigationBar;
    navigationBar.titleText = navigationBar.titleText || "";
    navigationBar.type = navigationBar.type || "default";
    navigationBar.titleSize = titleSize || "16px";
    navigationBar.titleColor = titleColor || "#ffffff";
    navigationBar.backgroundColor = backgroundColor || "#F7F7F7";
    __UNI_FEATURE_I18N_LOCALE__ && initNavigationBarI18n(navigationBar);
  }
  return pageMeta;
}
function getStateId() {
  {
    return 1;
  }
}
PolySymbol(process.env.NODE_ENV !== "production" ? "layout" : "l");
let tabBar;
function useTabBar() {
  if (!tabBar) {
    tabBar = __uniConfig.tabBar && vue.reactive(initTabBarI18n(__uniConfig.tabBar));
  }
  return tabBar;
}
const envMethod = /* @__PURE__ */ (() => "env")();
function normalizeWindowBottom(windowBottom) {
  return `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))`;
}
const SEP = "$$";
const currentPagesMap = /* @__PURE__ */ new Map();
function pruneCurrentPages() {
  currentPagesMap.forEach((page, id2) => {
    if (page.$.isUnmounted) {
      currentPagesMap.delete(id2);
    }
  });
}
function getCurrentPages$1() {
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
  const route = vm.$route;
  const page = initPublicPage(route);
  initPageVm(vm, page);
  currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
}
function normalizeRouteKey(path, id2) {
  return path + SEP + id2;
}
function useKeepAliveRoute() {
  const route = vueRouter.useRoute();
  const routeKey = vue.computed(() => normalizeRouteKey("/" + route.meta.route, getStateId()));
  const isTabBar = vue.computed(() => route.meta.isTabBar);
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
      vue.nextTick(() => pruneCurrentPages());
    }
  });
}
function initRouter(app) {
  const router = vueRouter.createRouter(createRouterOptions());
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
function initHistory() {
  let { routerBase } = __uniConfig.router;
  if (routerBase === "/") {
    routerBase = "";
  }
  {
    return vueRouter.createMemoryHistory(routerBase);
  }
}
var index$f = {
  install(app) {
    initApp$1(app);
    app.config.warnHandler = warnHandler;
    if (__UNI_FEATURE_PAGES__) {
      initRouter(app);
    }
  }
};
function warnHandler(msg, instance, trace) {
  if (instance) {
    const name = instance.$.type.name;
    if (name === "PageMetaHead") {
      return;
    }
    const parent = instance.$.parent;
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
let appVm;
function getApp$1() {
  return appVm;
}
function initApp(vm) {
  appVm = vm;
  initAppVm(appVm);
  defineGlobalData(appVm);
}
function wrapperComponentSetup(comp, { clone, init, setup, before }) {
  if (clone) {
    comp = shared.extend({}, comp);
  }
  before && before(comp);
  const oldSetup = comp.setup;
  comp.setup = (props2, ctx) => {
    const instance = vue.getCurrentInstance();
    init(instance.proxy);
    const query = setup(instance);
    if (oldSetup) {
      return oldSetup(query || props2, ctx);
    }
  };
  return comp;
}
function setupComponent(comp, options) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
    return wrapperComponentSetup(comp.default, options);
  }
  return wrapperComponentSetup(comp, options);
}
function setupWindow(comp, id) {
  return setupComponent(comp, {
    init: (vm) => {
      vm.$page = {
        id
      };
    },
    setup(instance) {
      instance.$pageInstance = instance;
    }
  });
}
function setupPage(comp) {
  if (process.env.NODE_ENV !== "production") {
    comp.__mpType = "page";
  }
  return setupComponent(comp, {
    clone: true,
    init: initPage,
    setup(instance) {
      instance.$pageInstance = instance;
      const route = usePageRoute();
      const query = uniShared.decodedQuery(route.query);
      instance.attrs.__pageQuery = query;
      instance.proxy.$page.options = query;
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
    init: initApp,
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
        return vue.openBlock(), vue.createBlock(LayoutComponent);
      };
      comp2.setup = (props2, ctx) => {
        const res = setup && setup(props2, ctx);
        return shared.isFunction(res) ? render : res;
      };
      comp2.render = render;
    }
  });
}
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
  const state = vue.reactive({
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
  const state = vue.reactive({
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
  return {
    state,
    onFullscreenChange,
    emitFullscreenChange,
    toggleFullscreen,
    requestFullScreen,
    exitFullScreen
  };
}
function useVideo(props2, attrs, trigger) {
  const videoRef = vue.ref(null);
  const src = vue.computed(() => getRealPath(props2.src));
  const state = vue.reactive({
    start: false,
    src,
    playing: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    buffered: 0
  });
  vue.watch(() => src.value, () => {
    state.playing = false;
    state.currentTime = 0;
  });
  vue.watch(() => state.buffered, (buffered) => {
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
  const progressRef = vue.ref(null);
  const ballRef = vue.ref(null);
  const centerPlayBtnShow = vue.computed(() => props2.showCenterPlayBtn && !videoState.start);
  const controlsVisible = vue.ref(true);
  const controlsShow = vue.computed(() => !centerPlayBtnShow.value && props2.controls && controlsVisible.value);
  const state = vue.reactive({
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
  vue.watch(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
    if (val) {
      autoHideStart();
    } else {
      autoHideEnd();
    }
  });
  vue.watch([() => videoState.currentTime, () => {
    props2.duration;
  }], function updateProgress() {
    if (!state.touching) {
      videoState.progress = videoState.currentTime / videoState.duration * 100;
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
  const danmuRef = vue.ref(null);
  const state = vue.reactive({
    enable: Boolean(props2.enableDanmu)
  });
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
function useContext(play, pause, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen) {
  useContextInfo();
  useSubscribe();
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
var index$e = /* @__PURE__ */ defineBuiltInComponent({
  name: "Video",
  props: props$9,
  emits: ["fullscreenchange", "progress", "loadedmetadata", "waiting", "error", "play", "pause", "ended", "timeupdate"],
  setup(props2, {
    emit: emit2,
    attrs,
    slots
  }) {
    const rootRef = vue.ref(null);
    const containerRef = vue.ref(null);
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
    } = useVideo(props2, attrs, trigger);
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
    useContext();
    return () => {
      return vue.createVNode("uni-video", {
        "ref": rootRef,
        "id": props2.id
      }, [vue.createVNode("div", {
        "ref": containerRef,
        "class": "uni-video-container",
        "onTouchstart": onTouchstart,
        "onTouchend": onTouchend,
        "onTouchmove": onTouchmove,
        "onFullscreenchange": vue.withModifiers(onFullscreenChange, ["stop"]),
        "onWebkitfullscreenchange": vue.withModifiers(($event) => onFullscreenChange($event, true), ["stop"])
      }, [vue.createVNode("video", vue.mergeProps({
        "ref": videoRef,
        "style": {
          "object-fit": props2.objectFit
        },
        "muted": !!props2.muted,
        "loop": !!props2.loop,
        "src": videoState.src,
        "poster": props2.poster,
        "autoplay": !!props2.autoplay
      }, videoAttrs.value, {
        "class": "uni-video-video",
        "webkit-playsinline": true,
        "playsinline": true,
        "onClick": toggleControls,
        "onDurationchange": onDurationChange,
        "onLoadedmetadata": onLoadedMetadata,
        "onProgress": onProgress,
        "onWaiting": onWaiting,
        "onError": onVideoError,
        "onPlay": onPlay,
        "onPause": onPause,
        "onEnded": onEnded,
        "onTimeupdate": (event) => {
          onTimeUpdate(event);
          updateDanmu(event);
        },
        "onWebkitbeginfullscreen": () => emitFullscreenChange(true),
        "onX5videoenterfullscreen": () => emitFullscreenChange(true),
        "onWebkitendfullscreen": () => emitFullscreenChange(false),
        "onX5videoexitfullscreen": () => emitFullscreenChange(false)
      }), null, 16, ["muted", "loop", "src", "poster", "autoplay", "webkit-playsinline", "playsinline", "onClick", "onDurationchange", "onLoadedmetadata", "onProgress", "onWaiting", "onError", "onPlay", "onPause", "onEnded", "onTimeupdate", "onWebkitbeginfullscreen", "onX5videoenterfullscreen", "onWebkitendfullscreen", "onX5videoexitfullscreen"]), vue.withDirectives(vue.createVNode("div", {
        "class": "uni-video-bar uni-video-bar-full",
        "onClick": vue.withModifiers(() => {
        }, ["stop"])
      }, [vue.createVNode("div", {
        "class": "uni-video-controls"
      }, [vue.withDirectives(vue.createVNode("div", {
        "class": {
          "uni-video-control-button": true,
          "uni-video-control-button-play": !videoState.playing,
          "uni-video-control-button-pause": videoState.playing
        },
        "onClick": vue.withModifiers(toggle, ["stop"])
      }, null, 10, ["onClick"]), [[vue.vShow, props2.showPlayBtn]]), vue.createVNode("div", {
        "class": "uni-video-current-time"
      }, [formatTime(videoState.currentTime)]), vue.createVNode("div", {
        "ref": progressRef,
        "class": "uni-video-progress-container",
        "onClick": vue.withModifiers(clickProgress, ["stop"])
      }, [vue.createVNode("div", {
        "class": "uni-video-progress"
      }, [vue.createVNode("div", {
        "style": {
          width: videoState.buffered + "%"
        },
        "class": "uni-video-progress-buffered"
      }, null, 4), vue.createVNode("div", {
        "ref": ballRef,
        "style": {
          left: videoState.progress + "%"
        },
        "class": "uni-video-ball"
      }, [vue.createVNode("div", {
        "class": "uni-video-inner"
      }, null)], 4)])], 8, ["onClick"]), vue.createVNode("div", {
        "class": "uni-video-duration"
      }, [formatTime(Number(props2.duration) || videoState.duration)])]), vue.withDirectives(vue.createVNode("div", {
        "class": {
          "uni-video-danmu-button": true,
          "uni-video-danmu-button-active": danmuState.enable
        },
        "onClick": vue.withModifiers(toggleDanmu, ["stop"])
      }, [t2("uni.video.danmu")], 10, ["onClick"]), [[vue.vShow, props2.danmuBtn]]), vue.withDirectives(vue.createVNode("div", {
        "class": {
          "uni-video-fullscreen": true,
          "uni-video-type-fullscreen": fullscreenState.fullscreen
        },
        "onClick": vue.withModifiers(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
      }, null, 10, ["onClick"]), [[vue.vShow, props2.showFullscreenBtn]])], 8, ["onClick"]), [[vue.vShow, controlsState.controlsShow]]), vue.withDirectives(vue.createVNode("div", {
        "ref": danmuRef,
        "style": "z-index: 0;",
        "class": "uni-video-danmu"
      }, null, 512), [[vue.vShow, videoState.start && danmuState.enable]]), controlsState.centerPlayBtnShow && vue.createVNode("div", {
        "class": "uni-video-cover",
        "onClick": vue.withModifiers(() => {
        }, ["stop"])
      }, [vue.createVNode("div", {
        "class": "uni-video-cover-play-button",
        "onClick": vue.withModifiers(play, ["stop"])
      }, null, 8, ["onClick"]), vue.createVNode("p", {
        "class": "uni-video-cover-duration"
      }, [formatTime(Number(props2.duration) || videoState.duration)])], 8, ["onClick"]), vue.createVNode("div", {
        "class": {
          "uni-video-toast": true,
          "uni-video-toast-volume": gestureState.gestureType === "volume"
        }
      }, [vue.createVNode("div", {
        "class": "uni-video-toast-title"
      }, [t2("uni.video.volume")]), vue.createVNode("svg", {
        "class": "uni-video-toast-icon",
        "width": "200px",
        "height": "200px",
        "viewBox": "0 0 1024 1024",
        "version": "1.1",
        "xmlns": "http://www.w3.org/2000/svg"
      }, [vue.createVNode("path", {
        "d": "M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"
      }, null)]), vue.createVNode("div", {
        "class": "uni-video-toast-value"
      }, [vue.createVNode("div", {
        "style": {
          width: gestureState.volumeNew * 100 + "%"
        },
        "class": "uni-video-toast-value-content"
      }, [vue.createVNode("div", {
        "class": "uni-video-toast-volume-grids"
      }, [vue.renderList(10, () => vue.createVNode("div", {
        "class": "uni-video-toast-volume-grids-item"
      }, null))])], 4)])], 2), vue.createVNode("div", {
        "class": {
          "uni-video-toast": true,
          "uni-video-toast-progress": gestureState.gestureType === "progress"
        }
      }, [vue.createVNode("div", {
        "class": "uni-video-toast-title"
      }, [formatTime(gestureState.currentTimeNew), " / ", formatTime(videoState.duration)])], 2), vue.createVNode("div", {
        "class": "uni-video-slots"
      }, [slots.default && slots.default()])], 40, ["onTouchstart", "onTouchend", "onTouchmove", "onFullscreenchange", "onWebkitfullscreenchange"])], 8, ["id"]);
    };
  }
});
const onWebInvokeAppService = ({ name, arg }) => {
  if (name === "postMessage")
    ;
  else {
    uni[name](arg);
  }
};
const Invoke = /* @__PURE__ */ uniShared.once(() => UniServiceJSBridge.on(uniShared.ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
const props$8 = {
  src: {
    type: String,
    default: ""
  },
  fullscreen: {
    type: Boolean,
    default: true
  }
};
var index$d = /* @__PURE__ */ defineBuiltInComponent({
  inheritAttrs: false,
  name: "WebView",
  props: props$8,
  setup(props2) {
    Invoke();
    const rootRef = vue.ref(null);
    vue.ref(null);
    const {
      $attrs,
      $excludeAttrs,
      $listeners
    } = useAttrs({
      excludeListeners: true
    });
    let _resize;
    return () => {
      return vue.createVNode(vue.Fragment, null, [vue.createVNode("uni-web-view", vue.mergeProps({
        "class": props2.fullscreen ? "uni-webview--fullscreen" : ""
      }, $listeners.value, $excludeAttrs.value, {
        "ref": rootRef
      }), [vue.createVNode(ResizeSensor, {
        "onResize": _resize
      }, null, 8, ["onResize"])], 16)]);
    };
  }
});
const ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
var MapType = /* @__PURE__ */ ((MapType2) => {
  MapType2["QQ"] = "qq";
  MapType2["GOOGLE"] = "google";
  MapType2["AMAP"] = "AMap";
  MapType2["UNKNOWN"] = "";
  return MapType2;
})(MapType || {});
function getMapInfo() {
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
function useMarkerLabelStyle(id) {
  const className = "uni-map-marker-label-" + id;
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
var MapMarker = /* @__PURE__ */ defineSystemComponent({
  name: "MapMarker",
  props: props$7,
  setup(props2) {
    const id = String(!isNaN(Number(props2.id)) ? props2.id : "");
    const onMapReady = vue.inject("onMapReady");
    const updateMarkerLabelStyle = useMarkerLabelStyle(id);
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
        const position = getIsAMap() ? new maps.LngLat(option.longitude, option.latitude) : new maps.LatLng(option.latitude, option.longitude);
        const img = new Image();
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
          marker.setPosition(position);
          marker.setIcon(icon);
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
            const boxShadow = "0px 0px 3px 1px rgba(0,0,0,0.5)";
            calloutStyle = calloutOpt.content ? {
              position,
              map,
              top,
              offsetY: -option.height / 2,
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
              offsetY: -option.height / 2,
              content: title,
              boxShadow
            };
            if (callout) {
              callout.setOption(calloutStyle);
            } else {
              if (getIsAMap()) {
                const callback = (id2) => {
                  if (id2 !== "") {
                    trigger("callouttap", {}, {
                      markerId: Number(id2)
                    });
                  }
                };
                callout = marker.callout = new maps.Callout(calloutStyle, callback);
              } else {
                callout = marker.callout = new maps.Callout(calloutStyle);
                callout.div.onclick = function($event) {
                  if (id !== "") {
                    trigger("callouttap", $event, {
                      markerId: Number(id)
                    });
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
        marker = new maps.Marker({
          map,
          flat: true,
          autoRotation: false
        });
        updateMarker(props3);
        const MapsEvent = maps.event || maps.Event;
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
          if (id) {
            trigger("markertap", {}, {
              markerId: Number(id),
              latitude: props3.latitude,
              longitude: props3.longitude
            });
          }
        });
      }
      addMarker(props2);
      vue.watch(props2, updateMarker);
    });
    if (id) {
      const addMapChidlContext = vue.inject("addMapChidlContext");
      vue.inject("removeMapChidlContext");
      const context = {
        id,
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
var MapPolyline = /* @__PURE__ */ defineSystemComponent({
  name: "MapPolyline",
  props: props$6,
  setup(props2) {
    const onMapReady = vue.inject("onMapReady");
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
          const pointPosition = getIsAMap() ? [point.longitude, point.latitude] : new maps.LatLng(point.latitude, point.longitude);
          path.push(pointPosition);
        });
        const strokeWeight = Number(option.width) || 1;
        const {
          r: sr,
          g: sg,
          b: sb,
          a: sa
        } = hexToRgba(option.color);
        const {
          r: br,
          g: bg,
          b: bb,
          a: ba
        } = hexToRgba(option.borderColor);
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
        polyline = new maps.Polyline(polylineOptions);
      }
      addPolyline(props2);
      vue.watch(props2, updatePolyline);
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
var MapCircle = /* @__PURE__ */ defineSystemComponent({
  name: "MapCircle",
  props: props$5,
  setup(props2) {
    const onMapReady = vue.inject("onMapReady");
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
        const center = getIsAMap() ? [option.longitude, option.latitude] : new maps.LatLng(option.latitude, option.longitude);
        const circleOptions = {
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          strokeDashStyle: "solid"
        };
        if (getIsAMap()) {
          circleOptions.strokeColor = option.color;
          circleOptions.fillColor = option.fillColor || "#000";
          circleOptions.fillOpacity = 1;
        } else {
          const {
            r: fr,
            g: fg,
            b: fb,
            a: fa
          } = hexToRgba(option.fillColor);
          const {
            r: sr,
            g: sg,
            b: sb,
            a: sa
          } = hexToRgba(option.color);
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
        circle = new maps.Circle(circleOptions);
        if (getIsAMap()) {
          map.add(circle);
        }
      }
      addCircle(props2);
      vue.watch(props2, updateCircle);
    });
    return () => {
      return null;
    };
  }
});
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
var MapControl = /* @__PURE__ */ defineSystemComponent({
  name: "MapControl",
  props: props$4,
  setup(props2) {
    const imgPath = vue.computed(() => getRealPath(props2.iconPath));
    const positionStyle = vue.computed(() => {
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
        props2.trigger("controltap", $event, {
          controlId: props2.id
        });
      }
    };
    return () => {
      return vue.createVNode("div", {
        "class": "uni-map-control"
      }, [vue.createVNode("img", {
        "src": imgPath.value,
        "style": positionStyle.value,
        "class": "uni-map-control-icon",
        "onClick": handleClick
      }, null, 12, ["src", "onClick"])]);
    };
  }
});
const CONTEXT_ID = "MAP_LOCATION";
var MapLocation = /* @__PURE__ */ defineSystemComponent({
  name: "MapLocation",
  setup() {
    const state = vue.reactive({
      latitude: 0,
      longitude: 0,
      rotate: 0
    });
    return () => {
      return state.latitude ? vue.createVNode(MapMarker, vue.mergeProps({
        "anchor": {
          x: 0.5,
          y: 0.5
        },
        "width": "44",
        "height": "44",
        "iconPath": ICON_PATH_ORIGIN
      }, state), null, 16, ["iconPath"]) : null;
    };
  }
});
var props$3 = {
  dashArray: {
    type: Array,
    default: () => [0, 0]
  },
  points: {
    type: Array,
    required: true
  },
  strokeWidth: {
    type: Number,
    default: 1
  },
  strokeColor: {
    type: String,
    default: "#000000"
  },
  fillColor: {
    type: String,
    default: "#00000000"
  },
  zIndex: {
    type: Number,
    default: 0
  }
};
var MapPolygon = /* @__PURE__ */ defineSystemComponent({
  name: "MapPolygon",
  props: props$3,
  setup(props2) {
    let polygonIns;
    const onMapReady = vue.inject("onMapReady");
    onMapReady((map, maps, trigger) => {
      function drawPolygon() {
        const {
          points,
          strokeWidth,
          strokeColor,
          dashArray,
          fillColor,
          zIndex
        } = props2;
        const path = points.map((item) => {
          const {
            latitude,
            longitude
          } = item;
          return getIsAMap() ? [longitude, latitude] : new maps.LatLng(latitude, longitude);
        });
        const {
          r: fcR,
          g: fcG,
          b: fcB,
          a: fcA
        } = hexToRgba(fillColor);
        const {
          r: scR,
          g: scG,
          b: scB,
          a: scA
        } = hexToRgba(strokeColor);
        const polygonOptions = {
          clickable: true,
          cursor: "crosshair",
          editable: false,
          map,
          fillColor: "",
          path,
          strokeColor: "",
          strokeDashStyle: dashArray.some((item) => item > 0) ? "dash" : "solid",
          strokeWeight: strokeWidth,
          visible: true,
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
        polygonIns = new maps.Polygon(polygonOptions);
      }
      drawPolygon();
      vue.watch(props2, drawPolygon);
    });
    return () => null;
  }
});
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
function getGoogleOrQQMapPosition(maps, latitude, longitude) {
  return new maps.LatLng(latitude, longitude);
}
function getMapPosition(maps, latitude, longitude) {
  return getIsAMap() ? getAMapPosition(maps, latitude, longitude) : getGoogleOrQQMapPosition(maps, latitude, longitude);
}
function getLat(latLng) {
  if ("getLat" in latLng) {
    return latLng.getLat();
  } else {
    return latLng.lat();
  }
}
function getLng(latLng) {
  if ("getLng" in latLng) {
    return latLng.getLng();
  } else {
    return latLng.lng();
  }
}
function useMap(props2, rootRef, emit2) {
  const trigger = useCustomEvent(rootRef, emit2);
  const mapRef = vue.ref(null);
  let maps;
  let map;
  const state = vue.reactive({
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
  vue.watch([() => props2.latitude, () => props2.longitude], ([latitudeVlaue, longitudeVlaue]) => {
    const latitude = Number(latitudeVlaue);
    const longitude = Number(longitudeVlaue);
    if (latitude !== state.latitude || longitude !== state.longitude) {
      state.latitude = latitude;
      state.longitude = longitude;
    }
  });
  vue.watch(() => props2.includePoints, (points) => {
    state.includePoints = getPoints(points);
  }, {
    deep: true
  });
  function updateBounds() {
    if (getIsAMap()) {
      const points = [];
      state.includePoints.forEach((point) => {
        points.push([point.longitude, point.latitude]);
      });
      const bounds = new maps.Bounds(...points);
      map.setBounds(bounds);
    } else {
      const bounds = new maps.LatLngBounds();
      state.includePoints.forEach(({
        latitude,
        longitude
      }) => {
        const latLng = new maps.LatLng(latitude, longitude);
        bounds.extend(latLng);
      });
      map.fitBounds(bounds);
    }
  }
  try {
    const id = useContextInfo();
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
          if (isBoundsReady)
            ;
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
    }, id, true);
  } catch (error) {
  }
  vue.provide("onMapReady", onMapReady);
  vue.provide("addMapChidlContext", addMapChidlContext);
  vue.provide("removeMapChidlContext", removeMapChidlContext);
  return {
    state,
    mapRef,
    trigger
  };
}
var index$c = /* @__PURE__ */ defineBuiltInComponent({
  name: "Map",
  props: props$2,
  emits: ["markertap", "labeltap", "callouttap", "controltap", "regionchange", "tap", "click", "updated", "update:scale", "update:latitude", "update:longitude"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    const rootRef = vue.ref(null);
    const {
      mapRef,
      trigger
    } = useMap(props2, rootRef, emit2);
    return () => {
      return vue.createVNode("uni-map", {
        "ref": rootRef,
        "id": props2.id
      }, [vue.createVNode("div", {
        "ref": mapRef,
        "style": "width: 100%; height: 100%; position: relative; overflow: hidden"
      }, null, 512), props2.markers.map((item) => vue.createVNode(MapMarker, vue.mergeProps({
        "key": item.id
      }, item), null, 16)), props2.polyline.map((item) => vue.createVNode(MapPolyline, item, null, 16)), props2.circles.map((item) => vue.createVNode(MapCircle, item, null, 16)), props2.controls.map((item) => vue.createVNode(MapControl, vue.mergeProps(item, {
        "trigger": trigger
      }), null, 16, ["trigger"])), props2.showLocation && vue.createVNode(MapLocation, null, null), props2.polygons.map((item) => vue.createVNode(MapPolygon, item, null, 16)), vue.createVNode("div", {
        "style": "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;"
      }, [slots.default && slots.default()])], 8, ["id"]);
    };
  }
});
const props$1 = {
  scrollTop: {
    type: [String, Number],
    default: 0
  }
};
var index$b = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverView",
  compatConfig: {
    MODE: 3
  },
  props: props$1,
  setup(props2, {
    slots
  }) {
    const content = vue.ref(null);
    vue.watch(() => props2.scrollTop, (val) => {
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
      return vue.createVNode("uni-cover-view", {
        "scroll-top": props2.scrollTop
      }, [vue.createVNode("div", {
        "ref": content,
        "class": "uni-cover-view"
      }, [slots.default && slots.default()], 512)], 8, ["scroll-top"]);
    };
  }
});
var index$a = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverImage",
  compatConfig: {
    MODE: 3
  },
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error"],
  setup(props2, {
    emit: emit2
  }) {
    const root = vue.ref(null);
    const trigger = useCustomEvent(root, emit2);
    function load($event) {
      trigger("load", $event);
    }
    function error($event) {
      trigger("error", $event);
    }
    return () => {
      const {
        src
      } = props2;
      return vue.createVNode("uni-cover-image", {
        "ref": root,
        "src": src
      }, [vue.createVNode("div", {
        "class": "uni-cover-image"
      }, [src ? vue.createVNode("img", {
        "src": getRealPath(src),
        "onLoad": load,
        "onError": error
      }, null, 40, ["src", "onLoad", "onError"]) : null])], 8, ["src"]);
    };
  }
});
function usePopupStyle(props2) {
  const popupWidth = vue.ref(0);
  const popupHeight = vue.ref(0);
  const isDesktop = vue.computed(() => popupWidth.value >= 500 && popupHeight.value >= 500);
  const popupStyle = vue.computed(() => {
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
      return Number(value) || 0;
    }
    if (isDesktop.value && popover) {
      shared.extend(triangleStyle, {
        position: "absolute",
        width: "0",
        height: "0",
        "margin-left": "-6px",
        "border-style": "solid"
      });
      const popoverLeft = getNumber(popover.left);
      const popoverWidth = getNumber(popover.width);
      const popoverTop = getNumber(popover.top);
      const popoverHeight = getNumber(popover.height);
      const center = popoverLeft + popoverWidth / 2;
      contentStyle.transform = "none !important";
      const contentLeft = Math.max(0, center - 300 / 2);
      contentStyle.left = `${contentLeft}px`;
      let triangleLeft = Math.max(12, center - contentLeft);
      triangleLeft = Math.min(300 - 12, triangleLeft);
      triangleStyle.left = `${triangleLeft}px`;
      const vcl = popupHeight.value / 2;
      if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
        contentStyle.top = "auto";
        contentStyle.bottom = `${popupHeight.value - popoverTop + 6}px`;
        triangleStyle.bottom = "-6px";
        triangleStyle["border-width"] = "6px 6px 0 6px";
        triangleStyle["border-color"] = "#fcfcfd transparent transparent transparent";
      } else {
        contentStyle.top = `${popoverTop + popoverHeight + 6}px`;
        triangleStyle.top = "-6px";
        triangleStyle["border-width"] = "0 6px 6px 6px";
        triangleStyle["border-color"] = "transparent transparent #fcfcfd transparent";
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
  const key = vue.ref("");
  const disable = vue.ref(false);
  return {
    key,
    disable
  };
}
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function getDefaultStartValue(props2) {
  if (props2.mode === mode.TIME) {
    return "00:00";
  }
  if (props2.mode === mode.DATE) {
    const year = new Date().getFullYear() - 150;
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
    const year = new Date().getFullYear() + 150;
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
    type: [Number, String, Array],
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
var index$9 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Picker",
  compatConfig: {
    MODE: 3
  },
  props,
  emits: ["change", "cancel", "columnchange"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    initI18nPickerMsgsOnce();
    const {
      t: t2
    } = useI18n();
    const rootRef = vue.ref(null);
    const pickerRef = vue.ref(null);
    const selectRef = vue.ref(null);
    const inputRef = vue.ref(null);
    const pickerRender = vue.ref(false);
    const {
      state,
      rangeArray
    } = usePickerState(props2);
    const trigger = useCustomEvent(rootRef, emit2);
    const {
      system,
      selectorTypeComputed,
      _show,
      _l10nColumn,
      _l10nItem,
      _input,
      _fixInputPosition,
      _pickerViewChange,
      _cancel,
      _change,
      _resetFormData,
      _getFormData,
      _createTime,
      _createDate,
      _setValueSync
    } = usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef);
    usePickerWatch(state, _cancel, _change);
    usePickerForm(_resetFormData, _getFormData);
    _createTime();
    _createDate();
    _setValueSync();
    const popup = usePopupStyle(state);
    vue.watchEffect(() => {
      state.isDesktop = popup.isDesktop.value;
      state.popupStyle = popup.popupStyle.value;
    });
    return () => {
      let _slot2;
      const {
        visible,
        contentVisible,
        valueArray,
        popupStyle,
        valueSync
      } = state;
      const {
        rangeKey,
        mode: mode2,
        start,
        end
      } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return vue.createVNode("uni-picker", vue.mergeProps({
        "ref": rootRef
      }, booleanAttrs, {
        "onClick": withWebEvent(_show)
      }), [pickerRender.value ? vue.createVNode("div", {
        "ref": pickerRef,
        "class": ["uni-picker-container", `uni-${mode2}-${selectorTypeComputed.value}`],
        "onWheel": onEventPrevent,
        "onTouchmove": onEventPrevent
      }, [vue.createVNode(vue.Transition, {
        "name": "uni-fade"
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": "uni-mask uni-picker-mask",
          "onClick": withWebEvent(_cancel),
          "onMousemove": _fixInputPosition
        }, null, 40, ["onClick", "onMousemove"]), [[vue.vShow, visible]])]
      }), !system.value ? vue.createVNode("div", {
        "class": [{
          "uni-picker-toggle": visible
        }, "uni-picker-custom"],
        "style": popupStyle.content
      }, [vue.createVNode("div", {
        "class": "uni-picker-header",
        "onClick": onEventStop
      }, [vue.createVNode("div", {
        "class": "uni-picker-action uni-picker-action-cancel",
        "onClick": withWebEvent(_cancel)
      }, [t2("uni.picker.cancel")], 8, ["onClick"]), vue.createVNode("div", {
        "class": "uni-picker-action uni-picker-action-confirm",
        "onClick": _change
      }, [t2("uni.picker.done")], 8, ["onClick"])], 8, ["onClick"]), contentVisible ? vue.createVNode(PickerView, {
        "value": _l10nColumn(valueArray),
        "class": "uni-picker-content",
        "onChange": _pickerViewChange
      }, _isSlot(_slot2 = vue.renderList(_l10nColumn(rangeArray.value), (rangeItem, index0) => {
        let _slot;
        return vue.createVNode(PickerViewColumn, {
          "key": index0
        }, _isSlot(_slot = vue.renderList(rangeItem, (item, index2) => vue.createVNode("div", {
          "key": index2,
          "class": "uni-picker-item"
        }, [typeof item === "object" ? item[rangeKey] || "" : _l10nItem(item, index0)]))) ? _slot : {
          default: () => [_slot],
          _: 1
        });
      })) ? _slot2 : {
        default: () => [_slot2],
        _: 1
      }, 8, ["value", "onChange"]) : null, vue.createVNode("div", {
        "ref": selectRef,
        "class": "uni-picker-select",
        "onWheel": onEventStop,
        "onTouchmove": onEventStop
      }, [vue.renderList(rangeArray.value[0], (item, index2) => vue.createVNode("div", {
        "key": index2,
        "class": ["uni-picker-item", {
          selected: valueArray[0] === index2
        }],
        "onClick": () => {
          valueArray[0] = index2;
          _change();
        }
      }, [typeof item === "object" ? item[rangeKey] || "" : item], 10, ["onClick"]))], 40, ["onWheel", "onTouchmove"]), vue.createVNode("div", {
        "style": popupStyle.triangle
      }, null, 4)], 6) : null], 40, ["onWheel", "onTouchmove"]) : null, vue.createVNode("div", null, [slots.default && slots.default()]), system.value ? vue.createVNode("div", {
        "class": "uni-picker-system",
        "onMousemove": withWebEvent(_fixInputPosition)
      }, [vue.createVNode("input", {
        "class": ["uni-picker-system_input", system.value],
        "ref": inputRef,
        "value": valueSync,
        "type": mode2,
        "tabindex": "-1",
        "min": start,
        "max": end,
        "onChange": ($event) => {
          _input($event);
          onEventStop($event);
        }
      }, null, 42, ["value", "type", "min", "max", "onChange"])], 40, ["onMousemove"]) : null], 16, ["onClick"]);
    };
  }
});
function usePickerState(props2) {
  const state = vue.reactive({
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
  const rangeArray = vue.computed(() => {
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
            return [dateArray[0], dateArray[1], dateArray[2]];
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
  const isiPad = vue.ref(false);
  return isiPad;
}
function useSystem() {
  const _system = vue.ref("");
  return _system;
}
let __contentVisibleDelay;
function usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
  const isiPad = useIsiPad();
  const _system = useSystem();
  const selectorTypeComputed = vue.computed(() => {
    const type = props2.selectorType;
    if (Object.values(selectorType).includes(type)) {
      return type;
    }
    return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
  });
  const system = vue.computed(() => {
    if (props2.mode === mode.DATE && !Object.values(fields).includes(props2.fields) && state.isDesktop) {
      return _system.value;
    }
    return "";
  });
  const startArray = vue.computed(() => {
    return getDateValueArray(props2, state, props2.start, getDefaultStartValue(props2));
  });
  const endArray = vue.computed(() => {
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
    let year = new Date().getFullYear();
    let start = year - 150;
    let end = year + 150;
    if (props2.start) {
      const _year = new Date(props2.start).getFullYear();
      if (!isNaN(_year) && _year < start) {
        start = _year;
      }
    }
    if (props2.end) {
      const _year = new Date(props2.start).getFullYear();
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
        valueArray = getDateValueArray(props2, state, val, uniShared.formatDateTime({
          mode: mode.TIME
        }));
        break;
      case mode.DATE:
        valueArray = getDateValueArray(props2, state, val, uniShared.formatDateTime({
          mode: mode.DATE
        }));
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
    trigger("change", {}, {
      value
    });
  }
  function _cancel($event) {
    if (system.value === "firefox" && $event) {
      const {
        top,
        left,
        width,
        height
      } = state.popover;
      const {
        pageX,
        pageY
      } = $event;
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
    vue.nextTick(() => {
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
    const {
      getLocale: getLocale2
    } = useI18n();
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
                return [array[2], array[1], array[0]];
              default:
                return normalize ? [array[2], array[0], array[1]] : [array[1], array[2], array[0]];
            }
        }
      }
    }
    return array;
  }
  function _l10nItem(item, index2) {
    const {
      getLocale: getLocale2
    } = useI18n();
    if (props2.mode === mode.DATE) {
      const locale = getLocale2();
      if (locale.startsWith("zh")) {
        const array = ["\u5E74", "\u6708", "\u65E5"];
        return item + array[index2];
      } else if (props2.fields !== fields.YEAR && index2 === (props2.fields !== fields.MONTH && (locale === "es" || locale === "fr") ? 1 : 0)) {
        let array;
        switch (locale) {
          case "es":
            array = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "\u200B\u200Bjulio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            break;
          case "fr":
            array = ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"];
            break;
          default:
            array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            break;
        }
        return array[Number(item) - 1];
      }
    }
    return item;
  }
  vue.watch(() => state.visible, (val) => {
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
  vue.watch([() => props2.mode, () => props2.value, () => props2.range], _setValueSync, {
    deep: true
  });
  vue.watch(() => state.valueSync, _setValueArray, {
    deep: true
  });
  vue.watch(() => state.valueArray, (val) => {
    if (props2.mode === mode.TIME || props2.mode === mode.DATE) {
      const getValue = props2.mode === mode.TIME ? _getTimeValue : _getDateValue;
      const valueArray = state.valueArray;
      const _startArray = startArray.value;
      const _endArray = endArray.value;
      if (props2.mode === mode.DATE) {
        const dateArray = state.dateArray;
        const max = dateArray[2].length;
        const day = Number(dateArray[2][valueArray[2]]) || 1;
        const realDay = new Date(`${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]}/${day}`).getDate();
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
  const {
    key,
    disable
  } = useKeyboard();
  vue.watchEffect(() => {
    disable.value = !state.visible;
  });
  vue.watch(key, (value) => {
    if (value === "esc") {
      _cancel();
    } else if (value === "enter") {
      _change();
    }
  });
}
function usePickerForm(_resetFormData, _getFormData) {
  const uniForm = vue.inject(uniFormKey, false);
  if (uniForm) {
    const field = {
      reset: _resetFormData,
      submit: () => {
        const data = ["", null];
        const {
          key,
          value
        } = _getFormData();
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
var index$8 = /* @__PURE__ */ defineUnsupportedComponent("ad");
var index$7 = /* @__PURE__ */ defineUnsupportedComponent("ad-content-page");
var index$6 = /* @__PURE__ */ defineUnsupportedComponent("ad-draw");
var index$5 = /* @__PURE__ */ defineUnsupportedComponent("camera");
var index$4 = /* @__PURE__ */ defineUnsupportedComponent("live-player");
var index$3 = /* @__PURE__ */ defineUnsupportedComponent("live-pusher");
const UniViewJSBridge$1 = /* @__PURE__ */ shared.extend(ViewJSBridge, {
  publishHandler(event, args, pageId) {
    UniServiceJSBridge.subscribeHandler(event, args, pageId);
  }
});
const request = /* @__PURE__ */ defineTaskApi(API_REQUEST, ({
  url,
  data,
  header,
  method,
  dataType: dataType2,
  responseType,
  withCredentials,
  timeout = __uniConfig.networkTimeout.request
}, { resolve, reject }) => {
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
    if (shared.hasOwn(header, key)) {
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
  if (name !== "Content-Type") {
    header["Content-Type"] = header[name];
    delete header[name];
  }
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
  onHeadersReceived(callback) {
    throw new Error("Method not implemented.");
  }
  offHeadersReceived(callback) {
    throw new Error("Method not implemented.");
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
const STORAGE_KEYS = "uni-storage-keys";
function parseValue(value) {
  const types = ["object", "string", "number", "boolean", "undefined"];
  try {
    const object = shared.isString(value) ? JSON.parse(value) : value;
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
const setStorageSync = /* @__PURE__ */ defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
  const type = typeof data;
  const value = type === "string" ? data : JSON.stringify({
    type,
    data
  });
  localStorage.setItem(key, value);
}, SetStorageSyncProtocol);
const setStorage = /* @__PURE__ */ defineAsyncApi(API_SET_STORAGE, ({ key, data }, { resolve, reject }) => {
  try {
    setStorageSync(key, data);
    resolve();
  } catch (error) {
    reject(error.message);
  }
}, SetStorageProtocol);
function getStorageOrigin(key) {
  const value = localStorage && localStorage.getItem(key);
  if (!shared.isString(value)) {
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
const getStorageSync = /* @__PURE__ */ defineSyncApi(API_GET_STORAGE_SYNC, (key) => {
  try {
    return getStorageOrigin(key);
  } catch (error) {
    return "";
  }
}, GetStorageSyncProtocol);
const getStorage = /* @__PURE__ */ defineAsyncApi(API_GET_STORAGE, ({ key }, { resolve, reject }) => {
  try {
    const data = getStorageOrigin(key);
    resolve({
      data
    });
  } catch (error) {
    reject(error.message);
  }
}, GetStorageProtocol);
const removeStorageSync = /* @__PURE__ */ defineSyncApi(API_REMOVE_STORAGE, (key) => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}, RemoveStorageSyncProtocol);
const removeStorage = /* @__PURE__ */ defineAsyncApi(API_REMOVE_STORAGE, ({ key }, { resolve }) => {
  removeStorageSync(key);
  resolve();
}, RemoveStorageProtocol);
const clearStorageSync = /* @__PURE__ */ defineSyncApi("clearStorageSync", () => {
  if (localStorage) {
    localStorage.clear();
  }
});
const clearStorage = /* @__PURE__ */ defineAsyncApi("clearStorage", (_, { resolve }) => {
  clearStorageSync();
  resolve();
});
const getStorageInfoSync = /* @__PURE__ */ defineSyncApi("getStorageInfoSync", () => {
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
const getStorageInfo = /* @__PURE__ */ defineAsyncApi("getStorageInfo", (_, { resolve }) => {
  resolve(getStorageInfoSync());
});
let browserInfo;
function initBrowserInfo() {
  {
    return browserInfo = {};
  }
}
const getDeviceInfo = /* @__PURE__ */ defineSyncApi("getDeviceInfo", () => {
  initBrowserInfo();
  const {
    deviceBrand,
    deviceModel,
    brand,
    model,
    platform,
    system,
    deviceOrientation,
    deviceType
  } = browserInfo;
  return {
    brand,
    deviceBrand,
    deviceModel,
    devicePixelRatio: 1,
    deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
    deviceOrientation,
    deviceType,
    model,
    platform,
    system
  };
});
const getAppBaseInfo = /* @__PURE__ */ defineSyncApi("getAppBaseInfo", () => {
  initBrowserInfo();
  const { theme, language, browserName, browserVersion } = browserInfo;
  return {
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
    language,
    SDKVersion: "",
    theme,
    version: ""
  };
});
const getSystemInfoSync = /* @__PURE__ */ defineSyncApi("getSystemInfoSync", () => {
  {
    return {
      deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
      platform: "nodejs"
    };
  }
});
function updateDocumentTitle(title) {
  {
    const ssrContext = getApp$1().$.appContext.provides[vue.ssrContextKey];
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
  vue.watchEffect(update);
}
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
const setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (args, { resolve, reject }) => {
  setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_TITLE, args, resolve, reject);
}, SetNavigationBarTitleProtocol);
require("localstorage-polyfill");
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var api = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  setNavigationBarTitle,
  request,
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
  getDeviceInfo,
  getAppBaseInfo,
  getSystemInfoSync
}, Symbol.toStringTag, { value: "Module" });
const uni$1 = api;
const UniServiceJSBridge$1 = /* @__PURE__ */ shared.extend(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    UniViewJSBridge.subscribeHandler(event, args, pageId);
  }
});
var TabBar = /* @__PURE__ */ defineSystemComponent({
  name: "TabBar",
  setup() {
    const visibleList = vue.ref([]);
    const tabBar2 = useTabBar();
    useVisibleList(tabBar2, visibleList);
    useTabBarCssVar(tabBar2);
    const onSwitchTab = useSwitchTab(vueRouter.useRoute(), tabBar2, visibleList);
    const {
      style,
      borderStyle,
      placeholderStyle
    } = useTabBarStyle(tabBar2);
    return () => {
      const tabBarItemsTsx = createTabBarItemsTsx(tabBar2, onSwitchTab, visibleList);
      return vue.createVNode("uni-tabbar", {
        "class": "uni-tabbar-" + tabBar2.position
      }, [vue.createVNode("div", {
        "class": "uni-tabbar",
        "style": style.value
      }, [vue.createVNode("div", {
        "class": "uni-tabbar-border",
        "style": borderStyle.value
      }, null, 4), tabBarItemsTsx], 4), vue.createVNode("div", {
        "class": "uni-placeholder",
        "style": placeholderStyle.value
      }, null, 4)], 2);
    };
  }
});
function useTabBarCssVar(tabBar2) {
  vue.watch(() => tabBar2.shown, (value) => {
    updatePageCssVar({
      "--window-bottom": normalizeWindowBottom(value ? parseInt(tabBar2.height) : 0)
    });
  });
}
function useVisibleList(tabBar2, visibleList) {
  function setVisibleList() {
    let tempList = [];
    tempList = tabBar2.list.filter((item) => item.visible !== false);
    if (__UNI_FEATURE_TABBAR_MIDBUTTON__) {
      tempList = tempList.filter((item) => !isMidButton(item));
      if (tempList.length % 2 === 0) {
        tempList.splice(Math.floor(tempList.length / 2), 0, tabBar2.list[Math.floor(tabBar2.list.length / 2)]);
      }
    }
    visibleList.value = tempList;
  }
  vue.watchEffect(setVisibleList);
}
function useSwitchTab(route, tabBar2, visibleList) {
  vue.watchEffect(() => {
    const meta = route.meta;
    if (meta.isTabBar) {
      const pagePath = meta.route;
      const index2 = visibleList.value.findIndex((item) => item.pagePath === pagePath);
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
        text
      } = tabBarItem;
      let url = uniShared.addLeadingSlash(pagePath);
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
          text,
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
  const style = vue.computed(() => {
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
  const borderStyle = vue.computed(() => {
    const {
      borderStyle: borderStyle2
    } = tabBar2;
    return {
      backgroundColor: BORDER_COLORS[borderStyle2] || borderStyle2
    };
  });
  const placeholderStyle = vue.computed(() => {
    return {
      height: tabBar2.height
    };
  });
  return {
    style,
    borderStyle,
    placeholderStyle
  };
}
function isMidButton(item) {
  return item.type === "midButton";
}
function createTabBarItemsTsx(tabBar2, onSwitchTab, visibleList) {
  const {
    selectedIndex,
    selectedColor,
    color
  } = tabBar2;
  return visibleList.value.map((item, index2) => {
    const selected = selectedIndex === index2;
    const textColor = selected ? selectedColor : color;
    const iconPath = (selected ? item.selectedIconPath || item.iconPath : item.iconPath) || "";
    const iconfontText = item.iconfont ? selected ? item.iconfont.selectedText || item.iconfont.text : item.iconfont.text : void 0;
    const iconfontColor = item.iconfont ? selected ? item.iconfont.selectedColor || item.iconfont.color : item.iconfont.color : void 0;
    if (!__UNI_FEATURE_TABBAR_MIDBUTTON__) {
      return createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar2, index2, onSwitchTab);
    }
    return isMidButton(item) ? createTabBarMidButtonTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar2, index2, onSwitchTab) : createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar2, index2, onSwitchTab);
  });
}
function createTabBarItemTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar2, index2, onSwitchTab) {
  return vue.createVNode("div", {
    "key": index2,
    "class": "uni-tabbar__item",
    "onClick": onSwitchTab(tabBarItem, index2)
  }, [createTabBarItemBdTsx(color, iconPath || "", iconfontText, iconfontColor, tabBarItem, tabBar2)], 8, ["onClick"]);
}
function createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar2) {
  const {
    height
  } = tabBar2;
  return vue.createVNode("div", {
    "class": "uni-tabbar__bd",
    "style": {
      height
    }
  }, [iconfontText ? createTabBarItemIconfontTsx(iconfontText, iconfontColor || BLUR_EFFECT_COLOR_DARK, tabBarItem, tabBar2) : iconPath && createTabBarItemIconTsx(iconPath, tabBarItem, tabBar2), tabBarItem.text && createTabBarItemTextTsx(color, tabBarItem, tabBar2), tabBarItem.redDot && createTabBarItemRedDotTsx(tabBarItem.badge)], 4);
}
function createTabBarItemIconTsx(iconPath, tabBarItem, tabBar2) {
  const {
    type,
    text
  } = tabBarItem;
  const {
    iconWidth
  } = tabBar2;
  const clazz2 = "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : "");
  const style = {
    width: iconWidth,
    height: iconWidth
  };
  return vue.createVNode("div", {
    "class": clazz2,
    "style": style
  }, [type !== "midButton" && vue.createVNode("img", {
    "src": getRealPath(iconPath)
  }, null, 8, ["src"])], 6);
}
function createTabBarItemIconfontTsx(iconfontText, iconfontColor, tabBarItem, tabBar2) {
  var _a;
  const {
    type,
    text
  } = tabBarItem;
  const {
    iconWidth
  } = tabBar2;
  const clazz2 = "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : "");
  const style = {
    width: iconWidth,
    height: iconWidth
  };
  const iconfontStyle = {
    fontSize: ((_a = tabBarItem.iconfont) == null ? void 0 : _a.fontSize) || iconWidth,
    color: iconfontColor
  };
  return vue.createVNode("div", {
    "class": clazz2,
    "style": style
  }, [type !== "midButton" && vue.createVNode("div", {
    "class": "uni-tabbar__iconfont",
    "style": iconfontStyle
  }, [iconfontText], 4)], 6);
}
function createTabBarItemTextTsx(color, tabBarItem, tabBar2) {
  const {
    iconPath,
    text
  } = tabBarItem;
  const {
    fontSize,
    spacing
  } = tabBar2;
  const style = {
    color,
    fontSize,
    lineHeight: !iconPath ? 1.8 : "normal",
    marginTop: !iconPath ? "inherit" : spacing
  };
  return vue.createVNode("div", {
    "class": "uni-tabbar__label",
    "style": style
  }, [text], 4);
}
function createTabBarItemRedDotTsx(badge) {
  const clazz2 = "uni-tabbar__reddot" + (badge ? " uni-tabbar__badge" : "");
  return vue.createVNode("div", {
    "class": clazz2
  }, [badge], 2);
}
function createTabBarMidButtonTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar2, index2, onSwitchTab) {
  const {
    width,
    height,
    backgroundImage,
    iconWidth
  } = midButton;
  return vue.createVNode("div", {
    "key": "midButton",
    "class": "uni-tabbar__item",
    "style": {
      flex: "0 0 " + width,
      position: "relative"
    },
    "onClick": onSwitchTab(midButton, index2)
  }, [vue.createVNode("div", {
    "class": "uni-tabbar__mid",
    "style": {
      width,
      height,
      backgroundImage: backgroundImage ? "url('" + getRealPath(backgroundImage) + "')" : "none"
    }
  }, [iconPath && vue.createVNode("img", {
    "style": {
      width: iconWidth,
      height: iconWidth
    },
    "src": getRealPath(iconPath)
  }, null, 12, ["src"])], 4), createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar2)], 12, ["onClick"]);
}
var LayoutComponent = /* @__PURE__ */ defineSystemComponent({
  name: "Layout",
  setup(_props, {
    emit: emit2
  }) {
    const rootRef = vue.ref(null);
    const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
    const {
      layoutState,
      windowState
    } = useState();
    useMaxWidth(layoutState, rootRef);
    const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow(layoutState);
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow(layoutState);
    const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow(layoutState);
    const showTabBar = __UNI_FEATURE_TABBAR__ && useShowTabBar();
    const clazz2 = useAppClass(showTabBar);
    return () => {
      const layoutTsx = createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow);
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar);
      return vue.createVNode("uni-app", {
        "ref": rootRef,
        "class": clazz2.value
      }, [layoutTsx, tabBarTsx], 2);
    };
  }
});
function useAppClass(showTabBar) {
  const showMaxWidth = vue.ref(false);
  return vue.computed(() => {
    return {
      "uni-app--showtabbar": showTabBar && showTabBar.value,
      "uni-app--maxwidth": showMaxWidth.value
    };
  });
}
function initMediaQuery(minWidth, callback) {
  {
    return false;
  }
}
function useMaxWidth(layoutState, rootRef) {
  const route = usePageRoute();
  function checkMaxWidth() {
    const windowWidth = document.body.clientWidth;
    const maxWidth = parseInt(String(__uniConfig.globalStyle.maxWidth || Number.MAX_SAFE_INTEGER));
    let showMaxWidth = false;
    if (windowWidth > maxWidth) {
      showMaxWidth = true;
    } else {
      showMaxWidth = false;
    }
    if (showMaxWidth && maxWidth) {
      layoutState.marginWidth = (windowWidth - maxWidth) / 2;
      vue.nextTick(() => {
        const rootEl = rootRef.value;
        if (rootEl) {
          rootEl.setAttribute("style", "max-width:" + maxWidth + "px;margin:0 auto;");
        }
      });
    } else {
      layoutState.marginWidth = 0;
      vue.nextTick(() => {
        const rootEl = rootRef.value;
        if (rootEl) {
          rootEl.removeAttribute("style");
        }
      });
    }
  }
  vue.watch([() => route.path], checkMaxWidth);
}
function useState() {
  const route = usePageRoute();
  if (!__UNI_FEATURE_RESPONSIVE__) {
    const layoutState2 = vue.reactive({
      marginWidth: 0
    });
    vue.watch(() => layoutState2.marginWidth, (value) => updateCssVar({
      "--window-margin": value + "px"
    }));
    return {
      layoutState: layoutState2,
      windowState: vue.computed(() => ({}))
    };
  }
  const topWindowMediaQuery = vue.ref(false);
  const leftWindowMediaQuery = vue.ref(false);
  const rightWindowMediaQuery = vue.ref(false);
  const showTopWindow = vue.computed(() => __UNI_FEATURE_TOPWINDOW__ && route.meta.topWindow !== false && topWindowMediaQuery.value);
  const showLeftWindow = vue.computed(() => __UNI_FEATURE_LEFTWINDOW__ && route.meta.leftWindow !== false && leftWindowMediaQuery.value);
  const showRightWindow = vue.computed(() => __UNI_FEATURE_RIGHTWINDOW__ && route.meta.rightWindow !== false && rightWindowMediaQuery.value);
  const layoutState = vue.reactive({
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
  const props2 = ["topWindow", "leftWindow", "rightWindow"];
  props2.forEach((prop) => {
    var _a;
    const matchMedia = (_a = __uniConfig[prop]) == null ? void 0 : _a.matchMedia;
    if (matchMedia && shared.hasOwn(matchMedia, "minWidth")) {
      matchMedia.minWidth;
    }
    const matches = initMediaQuery();
    layoutState[`${prop}MediaQuery`] = matches;
  });
  vue.watch(() => layoutState.topWindowHeight, (value) => updateCssVar({
    "--top-window-height": value + "px"
  }));
  vue.watch(() => layoutState.marginWidth, (value) => updateCssVar({
    "--window-margin": value + "px"
  }));
  vue.watch(() => layoutState.leftWindowWidth + layoutState.marginWidth, (value) => updateCssVar({
    "--window-left": value + "px"
  }));
  vue.watch(() => layoutState.rightWindowWidth + layoutState.marginWidth, (value) => updateCssVar({
    "--window-right": value + "px"
  }));
  UniServiceJSBridge.on(uniShared.ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
    layoutState.navigationBarTitleText = navigationBar.titleText;
  });
  const windowState = vue.computed(() => ({
    matchTopWindow: layoutState.topWindowMediaQuery,
    showTopWindow: layoutState.showTopWindow || layoutState.apiShowTopWindow,
    matchLeftWindow: layoutState.leftWindowMediaQuery,
    showLeftWindow: layoutState.showLeftWindow || layoutState.apiShowLeftWindow,
    matchRightWindow: layoutState.rightWindowMediaQuery,
    showRightWindow: layoutState.showRightWindow || layoutState.apiShowRightWindow
  }));
  return {
    layoutState,
    windowState
  };
}
function createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow) {
  const routerVNode = __UNI_FEATURE_PAGES__ ? createRouterViewVNode(keepAliveRoute) : createPageVNode();
  if (!__UNI_FEATURE_RESPONSIVE__) {
    return routerVNode;
  }
  const topWindowTsx = __UNI_FEATURE_TOPWINDOW__ ? createTopWindowTsx(topWindow, layoutState, windowState.value) : null;
  const leftWindowTsx = __UNI_FEATURE_LEFTWINDOW__ ? createLeftWindowTsx(leftWindow, layoutState, windowState.value) : null;
  const rightWindowTsx = __UNI_FEATURE_RIGHTWINDOW__ ? createRightWindowTsx(rightWindow, layoutState, windowState.value) : null;
  return vue.createVNode("uni-layout", {
    "class": {
      "uni-app--showtopwindow": __UNI_FEATURE_TOPWINDOW__ && layoutState.showTopWindow,
      "uni-app--showleftwindow": __UNI_FEATURE_LEFTWINDOW__ && layoutState.showLeftWindow,
      "uni-app--showrightwindow": __UNI_FEATURE_RIGHTWINDOW__ && layoutState.showRightWindow
    }
  }, [topWindowTsx, vue.createVNode("uni-content", null, [vue.createVNode("uni-main", null, [routerVNode]), leftWindowTsx, rightWindowTsx])], 2);
}
function useShowTabBar(emit2) {
  const route = usePageRoute();
  const tabBar2 = useTabBar();
  const showTabBar = vue.computed(() => route.meta.isTabBar && tabBar2.shown);
  return showTabBar;
}
function createTabBarTsx(showTabBar) {
  return vue.withDirectives(vue.createVNode(TabBar, null, null, 512), [[vue.vShow, showTabBar.value]]);
}
function createPageVNode() {
  return vue.createVNode(__uniRoutes[0].component);
}
function createRouterViewVNode({
  routeKey,
  isTabBar,
  routeCache: routeCache2
}) {
  return vue.createVNode(vueRouter.RouterView, null, {
    default: vue.withCtx(({
      Component
    }) => [(vue.openBlock(), vue.createBlock(vue.KeepAlive, {
      matchBy: "key",
      cache: routeCache2
    }, [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component), {
      type: isTabBar.value ? "tabBar" : "",
      key: routeKey.value
    }))], 1032, ["cache"]))]),
    _: 1
  });
}
function useTopWindow(layoutState) {
  const {
    component,
    style
  } = __uniConfig.topWindow;
  const windowRef = vue.ref(null);
  function updateWindow() {
    const instance = windowRef.value;
    const el = uniShared.resolveOwnerEl(instance.$);
    const height = el.getBoundingClientRect().height;
    layoutState.topWindowHeight = height;
  }
  vue.watch(() => layoutState.showTopWindow || layoutState.apiShowTopWindow, () => vue.nextTick(updateWindow));
  layoutState.topWindowStyle = style;
  return {
    component,
    windowRef
  };
}
function useLeftWindow(layoutState) {
  const {
    component,
    style
  } = __uniConfig.leftWindow;
  const windowRef = vue.ref(null);
  function updateWindow() {
    const instance = windowRef.value;
    const el = uniShared.resolveOwnerEl(instance.$);
    const width = el.getBoundingClientRect().width;
    layoutState.leftWindowWidth = width;
  }
  vue.watch(() => layoutState.showLeftWindow || layoutState.apiShowLeftWindow, () => vue.nextTick(updateWindow));
  layoutState.leftWindowStyle = style;
  return {
    component,
    windowRef
  };
}
function useRightWindow(layoutState) {
  const {
    component,
    style
  } = __uniConfig.rightWindow;
  const windowRef = vue.ref(null);
  function updateWindow() {
    const instance = windowRef.value;
    const el = uniShared.resolveOwnerEl(instance.$);
    const width = el.getBoundingClientRect().width;
    layoutState.rightWindowWidth = width;
  }
  vue.watch(() => layoutState.showRightWindow || layoutState.apiShowRightWindow, () => vue.nextTick(updateWindow));
  layoutState.rightWindowStyle = style;
  return {
    component,
    windowRef
  };
}
function createTopWindowTsx(topWindow, layoutState, windowState) {
  if (topWindow) {
    const {
      component: TopWindow,
      windowRef
    } = topWindow;
    return vue.withDirectives(vue.createVNode("uni-top-window", null, [vue.createVNode("div", {
      "class": "uni-top-window",
      "style": layoutState.topWindowStyle
    }, [vue.createVNode(TopWindow, vue.mergeProps({
      "ref": windowRef,
      "navigation-bar-title-text": layoutState.navigationBarTitleText
    }, windowState), null, 16, ["navigation-bar-title-text"])], 4), vue.createVNode("div", {
      "class": "uni-top-window--placeholder",
      "style": {
        height: layoutState.topWindowHeight + "px"
      }
    }, null, 4)], 512), [[vue.vShow, layoutState.showTopWindow || layoutState.apiShowTopWindow]]);
  }
}
function createLeftWindowTsx(leftWindow, layoutState, windowState) {
  if (leftWindow) {
    const {
      component: LeftWindow,
      windowRef
    } = leftWindow;
    return vue.withDirectives(vue.createVNode("uni-left-window", {
      "data-show": layoutState.apiShowLeftWindow || void 0,
      "style": layoutState.leftWindowStyle
    }, [layoutState.apiShowLeftWindow ? vue.createVNode("div", {
      "class": "uni-mask",
      "onClick": () => layoutState.apiShowLeftWindow = false
    }, null, 8, ["onClick"]) : null, vue.createVNode("div", {
      "class": "uni-left-window"
    }, [vue.createVNode(LeftWindow, vue.mergeProps({
      "ref": windowRef
    }, windowState), null, 16)])], 12, ["data-show"]), [[vue.vShow, layoutState.showLeftWindow || layoutState.apiShowLeftWindow]]);
  }
}
function createRightWindowTsx(rightWindow, layoutState, windowState) {
  if (rightWindow) {
    const {
      component: RightWindow,
      windowRef
    } = rightWindow;
    return vue.withDirectives(vue.createVNode("uni-right-window", {
      "data-show": layoutState.apiShowRightWindow || void 0,
      "style": layoutState.rightWindowStyle
    }, [layoutState.apiShowRightWindow ? vue.createVNode("div", {
      "class": "uni-mask",
      "onClick": () => layoutState.apiShowRightWindow = false
    }, null, 8, ["onClick"]) : null, vue.createVNode("div", {
      "class": "uni-right-window"
    }, [vue.createVNode(RightWindow, vue.mergeProps({
      "ref": windowRef
    }, windowState), null, 16)])], 12, ["data-show"]), [[vue.vShow, layoutState.showRightWindow || layoutState.apiShowRightWindow]]);
  }
}
function usePageHeadTransparentBackgroundColor(backgroundColor) {
  const { r, g: g2, b } = hexToRgba(backgroundColor);
  return `rgba(${r},${g2},${b},0)`;
}
function usePageHeadTransparent(headRef, {
  id,
  navigationBar: { titleColor, coverage, backgroundColor }
}) {
  vue.computed(() => hexToRgba(backgroundColor));
}
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
var PageHead = /* @__PURE__ */ defineSystemComponent({
  name: "PageHead",
  setup() {
    const headRef = vue.ref(null);
    const pageMeta = usePageMeta();
    const navigationBar = pageMeta.navigationBar;
    const {
      clazz: clazz2,
      style
    } = usePageHead(navigationBar);
    const buttons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ && usePageHeadButtons(pageMeta);
    const searchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ && navigationBar.searchInput && usePageHeadSearchInput(pageMeta);
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" && usePageHeadTransparent(headRef, pageMeta);
    return () => {
      const backButtonTsx = __UNI_FEATURE_PAGES__ ? createBackButtonTsx(pageMeta) : null;
      const leftButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.left) : [];
      const rightButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.right) : [];
      const type = navigationBar.type || "default";
      const placeholderTsx = type !== "transparent" && type !== "float" && vue.createVNode("div", {
        "class": {
          "uni-placeholder": true,
          "uni-placeholder-titlePenetrate": navigationBar.titlePenetrate
        }
      }, null, 2);
      return vue.createVNode("uni-page-head", {
        "uni-page-head-type": type
      }, [vue.createVNode("div", {
        "ref": headRef,
        "class": clazz2.value,
        "style": style.value
      }, [vue.createVNode("div", {
        "class": "uni-page-head-hd"
      }, [backButtonTsx, ...leftButtonsTsx]), createPageHeadBdTsx(navigationBar, searchInput), vue.createVNode("div", {
        "class": "uni-page-head-ft"
      }, [...rightButtonsTsx])], 6), placeholderTsx], 8, ["uni-page-head-type"]);
    };
  }
});
function createBackButtonTsx(pageMeta) {
  const {
    navigationBar,
    isQuit
  } = pageMeta;
  if (!isQuit) {
    return vue.createVNode("div", {
      "class": "uni-page-head-btn",
      "onClick": onPageHeadBackButton
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
    iconStyle,
    btnSelect
  }, index2) => {
    return vue.createVNode("div", {
      "key": index2,
      "class": btnClass,
      "style": btnStyle,
      "onClick": onClick,
      "badge-text": badgeText
    }, [btnIconPath ? createSvgIconVNode(btnIconPath, iconStyle.color, iconStyle.fontSize) : btnSelect ? vue.createVNode("span", {
      "style": iconStyle
    }, [vue.createVNode("i", {
      "class": "uni-btn-icon",
      "innerHTML": btnText
    }, null, 8, ["innerHTML"]), createSvgIconVNode(ICON_PATHS["select"], "#000", 14)], 4) : vue.createVNode("i", {
      "class": "uni-btn-icon",
      "style": iconStyle,
      "innerHTML": btnText
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
  return vue.createVNode("div", {
    "class": "uni-page-head-bd"
  }, [vue.createVNode("div", {
    "style": {
      fontSize: titleSize,
      opacity: type === "transparent" ? 0 : 1
    },
    "class": "uni-page-head__title"
  }, [loading ? vue.createVNode("i", {
    "class": "uni-loading"
  }, null) : titleImage ? vue.createVNode("img", {
    "src": titleImage,
    "class": "uni-page-head__title_image"
  }, null, 8, ["src"]) : titleText], 4)]);
}
function createPageHeadSearchInputTsx(navigationBar, {
  text,
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
    align,
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
  const placeholderClass = ["uni-page-head-search-placeholder", `uni-page-head-search-placeholder-${focus.value || text.value ? "left" : align}`];
  return vue.createVNode("div", {
    "class": "uni-page-head-search",
    "style": searchStyle
  }, [vue.createVNode("div", {
    "style": {
      color: placeholderColor
    },
    "class": placeholderClass
  }, [vue.createVNode("div", {
    "class": "uni-page-head-search-icon"
  }, [createSvgIconVNode(ICON_PATH_SEARCH, placeholderColor, 20)]), text.value || composing.value ? "" : placeholder], 6), disabled ? vue.createVNode(Input, {
    "disabled": true,
    "style": {
      color
    },
    "placeholder-style": "color: " + placeholderColor,
    "class": "uni-page-head-search-input",
    "confirm-type": "search",
    "onClick": onClick
  }, null, 8, ["style", "placeholder-style", "onClick"]) : vue.createVNode(Input, {
    "focus": autoFocus,
    "style": {
      color
    },
    "placeholder-style": "color: " + placeholderColor,
    "class": "uni-page-head-search-input",
    "confirm-type": "search",
    "onFocus": onFocus,
    "onBlur": onBlur,
    "onInput": onInput,
    "onKeyup": onKeyup
  }, null, 8, ["focus", "style", "placeholder-style", "onFocus", "onBlur", "onInput", "onKeyup"])], 4);
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
    });
  }
}
function usePageHead(navigationBar) {
  const clazz2 = vue.computed(() => {
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
  const style = vue.computed(() => {
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
    style
  };
}
function usePageHeadButtons({
  id,
  navigationBar
}) {
  const left = [];
  const right = [];
  const {
    buttons
  } = navigationBar;
  if (shared.isArray(buttons)) {
    const {
      type
    } = navigationBar;
    const isTransparent = type === "transparent";
    const fonts = /* @__PURE__ */ Object.create(null);
    buttons.forEach((btn, index2) => {
      if (btn.fontSrc && !btn.fontFamily) {
        const fontSrc = getRealPath(btn.fontSrc);
        let fontFamily = fonts[fontSrc];
        if (!fontFamily) {
          fontFamily = `font${Date.now()}`;
          fonts[fontSrc] = fontFamily;
        }
        btn.fontFamily = fontFamily;
      }
      const pageHeadBtn = usePageHeadButton(id, index2, btn, isTransparent);
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
      invokeHook(pageId, uniShared.ON_NAVIGATION_BAR_BUTTON_TAP, shared.extend({
        index: index2
      }, btn));
    },
    btnSelect: btn.select
  };
}
function usePageHeadSearchInput({
  id,
  navigationBar: {
    searchInput
  }
}) {
  const focus = vue.ref(false);
  const text = vue.ref("");
  const composing = vue.ref(false);
  const {
    disabled
  } = searchInput;
  if (disabled) {
    const onClick = () => {
      invokeHook(id, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
    };
    return {
      focus,
      text,
      composing,
      onClick
    };
  }
  const onFocus = () => {
    focus.value = true;
    invokeHook(id, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
      focus: true
    });
  };
  const onBlur = () => {
    focus.value = false;
    invokeHook(id, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
      focus: false
    });
  };
  const onInput = (evt) => {
    text.value = evt.detail.value;
    invokeHook(id, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, {
      text: text.value
    });
  };
  const onKeyup = (evt) => {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      invokeHook(id, uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, {
        text: text.value
      });
    }
  };
  return {
    focus,
    text,
    composing,
    onFocus,
    onBlur,
    onInput,
    onKeyup
  };
}
var _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "PageRefresh",
  setup() {
    const { pullToRefresh } = usePageMeta();
    return {
      offset: pullToRefresh.offset,
      color: pullToRefresh.color
    };
  }
};
const _hoisted_1 = { class: "uni-page-refresh-inner" };
const _hoisted_2 = ["fill"];
const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1);
const _hoisted_5 = [
  _hoisted_3,
  _hoisted_4
];
const _hoisted_6 = {
  class: "uni-page-refresh__spinner",
  width: "24",
  height: "24",
  viewBox: "25 25 50 50"
};
const _hoisted_7 = ["stroke"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("uni-page-refresh", null, [
    vue.createElementVNode("div", {
      style: vue.normalizeStyle({ "margin-top": $setup.offset + "px" }),
      class: "uni-page-refresh"
    }, [
      vue.createElementVNode("div", _hoisted_1, [
        (vue.openBlock(), vue.createElementBlock("svg", {
          fill: $setup.color,
          class: "uni-page-refresh__icon",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, _hoisted_5, 8, _hoisted_2)),
        (vue.openBlock(), vue.createElementBlock("svg", _hoisted_6, [
          vue.createElementVNode("circle", {
            stroke: $setup.color,
            class: "uni-page-refresh__path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            "stroke-width": "4",
            "stroke-miterlimit": "10"
          }, null, 8, _hoisted_7)
        ]))
      ])
    ], 4)
  ]);
}
var PageRefresh = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var PageBody = defineSystemComponent({
  name: "PageBody",
  setup(props2, ctx) {
    const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ && usePageMeta();
    const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ && vue.ref(null);
    const pageRefresh = null;
    return () => {
      const pageRefreshTsx = __UNI_FEATURE_PULL_DOWN_REFRESH__ && createPageRefreshTsx(refreshRef, pageMeta);
      return vue.createVNode(vue.Fragment, null, [pageRefreshTsx, vue.createVNode("uni-page-wrapper", pageRefresh, [vue.createVNode("uni-page-body", null, [vue.renderSlot(ctx.slots, "default")])], 16)]);
    };
  }
});
function createPageRefreshTsx(refreshRef, pageMeta) {
  if (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh) {
    return null;
  }
  return vue.createVNode(PageRefresh, {
    "ref": refreshRef
  }, null, 512);
}
var index$2 = defineSystemComponent({
  name: "Page",
  setup(_props, ctx) {
    const pageMeta = providePageMeta(getStateId());
    const navigationBar = pageMeta.navigationBar;
    useDocumentTitle(pageMeta);
    return () => vue.createVNode("uni-page", { "data-page": pageMeta.route }, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [vue.createVNode(PageHead), createPageBodyVNode(ctx)] : [createPageBodyVNode(ctx)]);
  }
});
function createPageBodyVNode(ctx) {
  return vue.openBlock(), vue.createBlock(PageBody, { key: 0 }, {
    default: vue.withCtx(() => [vue.renderSlot(ctx.slots, "page")]),
    _: 3
  });
}
function reload() {
  window.location.reload();
}
var index$1 = /* @__PURE__ */ defineSystemComponent({
  name: "AsyncError",
  setup() {
    initI18nAsyncMsgsOnce();
    const {
      t: t2
    } = useI18n();
    return () => vue.createVNode("div", {
      "class": "uni-async-error",
      "onClick": reload
    }, [t2("uni.async.error")], 8, ["onClick"]);
  }
});
const clazz = { class: "uni-async-loading" };
const loadingVNode = /* @__PURE__ */ vue.createVNode("i", { class: "uni-loading" }, null, -1);
var index = /* @__PURE__ */ defineSystemComponent({
  name: "AsyncLoading",
  render() {
    return vue.openBlock(), vue.createBlock("div", clazz, [loadingVNode]);
  }
});
exports.Ad = index$8;
exports.AdContentPage = index$7;
exports.AdDraw = index$6;
exports.AsyncErrorComponent = index$1;
exports.AsyncLoadingComponent = index;
exports.Button = index$C;
exports.Camera = index$5;
exports.Canvas = index$B;
exports.Checkbox = index$z;
exports.CheckboxGroup = index$A;
exports.CoverImage = index$a;
exports.CoverView = index$b;
exports.Editor = index$y;
exports.Form = index$E;
exports.Icon = index$x;
exports.Image = index$w;
exports.Input = Input;
exports.Label = index$D;
exports.LayoutComponent = LayoutComponent;
exports.LivePlayer = index$4;
exports.LivePusher = index$3;
exports.Map = index$c;
exports.MovableArea = index$v;
exports.MovableView = index$u;
exports.Navigator = index$t;
exports.PageComponent = index$2;
exports.Picker = index$9;
exports.PickerView = PickerView;
exports.PickerViewColumn = PickerViewColumn;
exports.Progress = index$s;
exports.Radio = index$q;
exports.RadioGroup = index$r;
exports.ResizeSensor = ResizeSensor;
exports.RichText = index$p;
exports.ScrollView = index$o;
exports.Slider = index$n;
exports.Swiper = index$m;
exports.SwiperItem = index$l;
exports.Switch = index$k;
exports.Text = index$j;
exports.Textarea = index$i;
exports.UniServiceJSBridge = UniServiceJSBridge$1;
exports.UniViewJSBridge = UniViewJSBridge$1;
exports.Video = index$e;
exports.View = index$h;
exports.WebView = index$d;
exports.clearStorage = clearStorage;
exports.clearStorageSync = clearStorageSync;
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
exports.plugin = index$f;
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
