import { getGlobal, UTS as UTS$1, UTSJSONObject, UTSValueIterable, UniError as UniError$1, once, getEnvLocale, I18N_JSON_DELIMITERS, Emitter, normalizeStyles, addLeadingSlash, ON_BACK_PRESS, invokeArrayFnsWithResults, invokeArrayFns, normalizeTarget, createRpx2Unit, defaultRpx2Unit, createUniDOMStringMap, parseQuery, NAVBAR_HEIGHT, parseUrl, decodedQuery, removeLeadingSlash, stringifyQuery as stringifyQuery$1, EventChannel, ON_THEME_CHANGE, ON_REACH_BOTTOM_DISTANCE, normalizeTitleColor, SCHEME_RE, DATA_RE, UNI_SSR_TITLE, ON_NAVIGATION_BAR_CHANGE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, LINEFEED, PRIMARY_COLOR, passive, debounce, isUniLifecycleHook, ON_LOAD, ON_SHOW, ON_ERROR, UniLifecycleHooks, invokeCreateErrorHandler, invokeCreateVueAppHook, ON_WEB_INVOKE_APP_SERVICE, callOptions, formatDateTime, addFont, resolveOwnerEl } from "@dcloudio/uni-shared";
import { UTS as UTS2, UTSJSONObject as UTSJSONObject2, UTSValueIterable as UTSValueIterable2, UniError as UniError2 } from "@dcloudio/uni-shared";
import { createVNode, getCurrentInstance, ref, defineVaporComponent, openBlock, createElementBlock, Fragment, renderList, isVNode, createBlock, createElementVNode, Comment, Text, cloneVNode, defineComponent as defineComponent$1, provide, computed, inject, onBeforeUnmount, mergeProps, onMounted, watch, reactive, isReactive, nextTick, useSSRContext, unref, watchEffect, onActivated, ssrContextKey, onBeforeMount, withCtx, resolveDynamicComponent, withDirectives, vShow, shallowRef, markRaw, onUnmounted, createTextVNode, h, isInSSRComponentSetup, injectHook, logError, Transition } from "vue";
import { isArray, isString, extend, capitalize, camelize, hasOwn, isPlainObject, isObject, toRawType, makeMap as makeMap$1, isFunction, isPromise, EMPTY_OBJ, hyphenate } from "@vue/shared";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { useRoute, isNavigationFailure, useRouter, createRouter, createMemoryHistory, VaporRouterView } from "vue-router";
import safeAreaInsets from "safe-area-insets";
import { initVueI18n, isI18nStr, LOCALE_EN, LOCALE_ES, LOCALE_FR, LOCALE_ZH_HANS, LOCALE_ZH_HANT } from "@dcloudio/uni-i18n";
const realGlobal = getGlobal();
realGlobal.UTS = UTS$1;
realGlobal.UTSJSONObject = UTSJSONObject;
realGlobal.UTSValueIterable = UTSValueIterable;
realGlobal.UniError = UniError$1;
const isEnableLocale = /* @__PURE__ */ once(
  () => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
);
let i18n;
function getLocaleMessage() {
  const locale = uni.getLocale();
  const locales = __uniConfig.locales;
  return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
}
function formatI18n(message) {
  if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
    return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS);
  }
  return message;
}
function resolveJsonObj(jsonObj, names) {
  if (names.length === 1) {
    if (jsonObj) {
      const _isI18nStr = (value2) => isString(value2) && isI18nStr(value2, I18N_JSON_DELIMITERS);
      const _name = names[0];
      let filterJsonObj = [];
      if (isArray(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) {
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
  if (isArray(jsonObj)) {
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
        locale = getEnvLocale();
      }
    }
    i18n = initVueI18n(locale);
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
function normalizeMessages(module, keys, values) {
  return keys.reduce((res, name, index2) => {
    res[module + name] = values[index2];
    return res;
  }, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.async.";
  const keys = ["error"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        "The connection timed out, click the screen to try again."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        "Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "La connexion a expiré, cliquez sur l'écran pour réessayer."
      ]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]),
      false
    );
  }
});
const initI18nPickerMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.picker.";
  const keys = ["done", "cancel"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ["Done", "Cancel"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ["OK", "Cancelar"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ["OK", "Annuler"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
});
const initI18nVideoMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.video.";
  const keys = ["danmu", "volume"];
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ["Danmu", "Volume"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ["Danmu", "Volumen"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ["Danmu", "Le Volume"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["弹幕", "音量"]),
      false
    );
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
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
  const emitter = new Emitter();
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
    subscribe(event, callback, once2 = false) {
      emitter[once2 ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
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
function unregisterViewMethod(pageId, name) {
  name = normalizeViewMethodName(pageId, name);
  delete viewMethods[name];
}
const ViewJSBridge = /* @__PURE__ */ extend(
  /* @__PURE__ */ initBridge("service"),
  {
    invokeServiceMethod
  }
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
const sheetsMap = /* @__PURE__ */ new Map();
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
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (s) => s !== style
      );
    } else {
      document.head.removeChild(style);
    }
    sheetsMap.delete(id2);
  }
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
  return createVNode(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32"
    },
    [
      createVNode(
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
    const { $pageInstance } = getCurrentInstance();
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
  const res = extend({ id: id2 }, globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = extend({}, globalStyle[name], pageMeta[name]);
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
  const titleColor = normalizeStyles(
    meta.navigationBar,
    __uniConfig.themeConfig,
    themeMode
  ).titleColor;
  return {
    id: id2,
    path: addLeadingSlash(route),
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
  if (isString(vm)) {
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
  if (name === ON_BACK_PRESS) {
    return hooks && invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
  }
  return hooks && invokeArrayFns(hooks, args);
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
  return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
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
const ServiceJSBridge = /* @__PURE__ */ extend(
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
  const locale = ref(useI18n().getLocale());
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
  options.globalData = extend(options.globalData || {}, defaultGlobalData);
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
    return value.replace(/(^-?\d+)[ur]px$/i, (text2, num) => {
      return `${uni.upx2px(parseFloat(num))}px`;
    });
  } else if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`;
  }
  return value || "";
}
function converType(type) {
  return type.replace(/[A-Z]/g, (text2) => {
    return `-${text2.toLowerCase()}`;
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
  return defineVaporComponent(options);
};
const defineUnsupportedComponent = (name) => {
  return defineBuiltInComponent({
    name: capitalize(camelize(name)),
    setup() {
      return () => (openBlock(), createElementBlock("uni-" + name, null, name + " is unsupported"));
    }
  });
};
function withWebEvent(fn) {
  return fn.__wwe = true, fn;
}
function useCustomEvent(ref2, emit2) {
  return (name, evt, detail) => {
    if (ref2.value) {
      emit2(name, normalizeCustomEvent(name, evt, ref2.value, detail || {}));
    }
  };
}
function normalizeCustomEvent(name, domEvt, el, detail) {
  const target = normalizeTarget(el);
  return {
    type: domEvt.__evName || detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail
  };
}
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
  if (isString(keys)) {
    keys = [keys];
  }
  return keys.reduce((res, key) => {
    if (props2[key]) {
      res[key] = true;
    }
    return res;
  }, /* @__PURE__ */ Object.create(null));
}
const rpx2Unit = createRpx2Unit(
  defaultRpx2Unit.unit,
  defaultRpx2Unit.unitRatio,
  defaultRpx2Unit.unitPrecision
);
function transformRpx(value) {
  if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) {
    return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text2, num) => {
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
    const name = camelize(qualifiedName);
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
      this.__uniDatasetMap = createUniDOMStringMap(
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
const cacheMap = /* @__PURE__ */ new WeakMap();
function createVNodeCache(key) {
  const i = getCurrentInstance();
  if (i) {
    if (!cacheMap.has(i))
      cacheMap.set(i, {});
    const caches = cacheMap.get(i);
    return caches[key] || (caches[key] = []);
  } else {
    return [];
  }
}
function normalizeVNode(value, flag = 1) {
  let create = createVNode;
  let isBlock = false;
  if (typeof value === "function") {
    isBlock = true;
    openBlock();
    create = createBlock;
    value = value();
  }
  return isVNode(value) ? isBlock ? createBlock(cloneIfMounted(value)) : cloneIfMounted(value) : Array.isArray(value) ? isBlock ? createElementBlock(
    Fragment,
    null,
    value.map((n) => normalizeVNode(() => n)),
    -2
  ) : createElementVNode(Fragment, null, value.slice()) : value == null || typeof value === "boolean" ? create(Comment) : create(Text, null, String(value), flag);
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || // @ts-ignore
  child.memo ? child : cloneVNode(child);
}
const defineComponent = defineComponent$1;
defineComponent(
  (props2, {
    slots
  }) => {
    const defaultSlot = slots.default;
    return () => (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList(props2.in, (item, key, index2) => {
        const result = defaultSlot(item, key, index2);
        return Array.isArray(result) ? result.length === 1 ? result[0] : normalizeVNode(result) : result;
      }),
      128
    ));
  },
  { props: ["in"] }
);
const uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
const index$x = /* @__PURE__ */ defineBuiltInComponent({
  name: "Form",
  emits: ["submit", "reset"],
  setup(_props, { slots, emit: emit2 }) {
    const rootRef = ref(null);
    provideForm(useCustomEvent(rootRef, emit2));
    return () => (openBlock(), createBlock("uni-form", { ref: rootRef }, [createVNode("span", null, [normalizeVNode(() => slots.default && slots.default())])], 512));
  }
});
function provideForm(trigger) {
  const fields2 = [];
  provide(uniFormKey, {
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
const index$w = /* @__PURE__ */ defineBuiltInComponent({
  name: "Label",
  props: labelProps,
  setup(props2, { slots }) {
    const rootRef = ref(null);
    const pageId = useCurrentPageId();
    const handlers = useProvideLabel();
    const pointer = computed(() => props2.for || slots.default && slots.default.length);
    withWebEvent(($event) => {
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
    return () => (openBlock(), createBlock("uni-label", {
      ref: rootRef,
      class: { "uni-label-pointer": pointer }
    }, [normalizeVNode(() => slots.default && slots.default())], 512));
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
    const rootRef = ref(null);
    const uniForm = inject(uniFormKey, false);
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
    const uniLabel = inject(uniLabelKey, false);
    if (uniLabel) {
      uniLabel.addHandler(onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(onClick);
      });
    }
    return () => {
      const hoverClass = props2.hoverClass;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const loadingAttrs = useBooleanAttr(props2, "loading");
      const plainAttrs = useBooleanAttr(props2, "plain");
      const hasHoverClass = hoverClass && hoverClass !== "none";
      return openBlock(), createBlock("uni-button", mergeProps({
        ref: rootRef,
        id: props2.id,
        class: hasHoverClass && hovering.value ? hoverClass : ""
      }, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [normalizeVNode(() => slots.default && slots.default())], 16);
    };
  }
});
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
    const rootRef = ref(null);
    const canvas = ref(null);
    onMounted(() => {
      const rootElement = rootRef.value;
      rootElement.attachVmProps(props2);
    });
    return () => {
      return openBlock(), createBlock("uni-canvas", { ref: rootRef }, [createVNode("canvas", {
        ref: canvas,
        class: "uni-canvas-canvas"
      }, null, 512)], 512);
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
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideCheckGroup(props2, trigger);
    return () => {
      return openBlock(), createBlock("uni-checkbox-group", { ref: rootRef }, [normalizeVNode(() => slots.default && slots.default())], 512);
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
  provide(uniCheckGroupKey, {
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
  const uniForm = inject(uniFormKey, false);
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
    const rootRef = ref(null);
    const checkboxChecked = ref(props2.checked);
    const checkboxCheckedBool = computed(() => {
      return checkboxChecked.value === "true" || checkboxChecked.value === true;
    });
    const checkboxValue = ref(props2.value);
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
    const checkboxStyle = computed(() => {
      return getCheckBoxStyle(checkboxCheckedBool.value);
    });
    watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
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
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      let realCheckValue;
      realCheckValue = checkboxChecked.value;
      return openBlock(), createBlock("uni-checkbox", mergeProps(booleanAttrs, {
        id: props2.id,
        ref: rootRef
      }), [createVNode("div", {
        class: "uni-checkbox-wrapper",
        style: { "--HOVER-BD-COLOR": props2.activeBorderColor }
      }, [createVNode("div", {
        class: ["uni-checkbox-input", { "uni-checkbox-input-disabled": props2.disabled }],
        style: checkboxStyle.value
      }, [realCheckValue ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.disabled ? "currentColor" : props2.foreColor || props2.iconColor || props2.color, 22))], 64)) : normalizeVNode(() => "")]), normalizeVNode(() => slots.default && slots.default())])], 16);
    };
  }
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
  const field = computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value
  }));
  const formField = { reset };
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
    const isApple2 = computed(
      () => String(navigator.vendor).indexOf("Apple") === 0
    );
    el.addEventListener("focus", () => {
      clearTimeout(resetTimer);
      document.addEventListener("click", iosHideKeyboard, false);
    });
    const onKeyboardHide = () => {
      document.removeEventListener("click", iosHideKeyboard, false);
      if (isApple2.value) {
        document.documentElement.scrollTo(
          document.documentElement.scrollLeft,
          document.documentElement.scrollTop
        );
      }
    };
    el.addEventListener("blur", () => {
      if (isApple2.value) {
        el.blur();
      }
      onKeyboardHide();
    });
  }
  watch(
    () => elRef.value,
    (el) => el && initKeyboard(el)
  );
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
    query = parseQuery(
      url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length)
    );
  }
  const { meta } = __uniRoutes[0];
  const path = addLeadingSlash(meta.route);
  return {
    meta,
    query,
    path,
    matched: [{ path }]
  };
}
function initPageMeta(id2) {
  if (__UNI_FEATURE_PAGES__) {
    return reactive(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            initRouteMeta(
              useRoute().meta,
              id2
            )
          )
        )
      )
    );
  }
  return reactive(
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
        extend(
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
        pullToRefresh.offset += NAVBAR_HEIGHT + 0;
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
      !hasOwn(data, key)
    );
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
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
  if (!isPlainObject(prop)) {
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
    const types = isArray(type) ? type : [type];
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
const isSimpleType = /* @__PURE__ */ makeMap$1(
  "String,Number,Boolean,Function,Symbol"
);
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
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
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
      if (isPromise(res)) {
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
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
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
    if (isArray(interceptor.invoke)) {
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
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find(
    (cb) => isFunction(args[cb])
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
        invokeApi(name, fn, extend({}, args), rest)
      );
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve, reject) => {
          invokeApi(
            name,
            fn,
            extend({}, args, { success: resolve, fail: reject }),
            rest
          );
        })
      )
    );
  };
}
function normalizeFormatApiParams(args) {
  const params = args[0];
  if (isPlainObject(params)) {
    return params;
  }
  const normalizedParams = {};
  args[0] = normalizedParams;
  return normalizedParams;
}
function formatApiArgs(args, options) {
  const rawParams = args[0];
  if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(rawParams)) {
    return;
  }
  const params = normalizeFormatApiParams(args);
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(params[name], params);
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
  const result = {
    errMsg: name + ":ok"
  };
  {
    result.errSubject = name;
  }
  return invokeCallback(id2, extend(res || {}, result));
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
  let res = extend({ errMsg: apiErrMsg }, errRes);
  {
    if (typeof UniError !== "undefined") {
      const errOptions = extend({}, errRes);
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
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback) {
  if (!isFunction(callback)) {
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
  if (!errMsg || isString(errMsg)) {
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
const eventTransport = /* @__PURE__ */ new Emitter();
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
      params.method = elemInArray(
        (value || "").toUpperCase(),
        HTTP_METHODS
      );
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
  if (!isString(url)) {
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
  return typeof pagePath === "string" ? pagePath : removeLeadingSlash((route == null ? void 0 : route.path) || path);
}
function normalizeRewriteRoute({ url, preserveQuery }, event) {
  if (preserveQuery) {
    url = parseUrl(url).path + stringifyQuery$1(event.query);
  }
  const params = { url, openType: event.openType };
  const errMsg = createNormalizeUrl(event.openType, {
    skipNavigatorLock: true
  })(url, params);
  if (errMsg) {
    return errMsg;
  }
  const { path, query } = parseUrl(params.url);
  return {
    url: params.url,
    path: normalizeAppRoutePath(path),
    query: decodedQuery(query),
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
    query: decodedQuery(query),
    openType,
    notFound
  });
}
function resolveAppRoute(url, openType, notFound = false) {
  let routeUrl = url;
  let routeNotFound = notFound;
  let rewriteCount = 0;
  while (true) {
    const { path, query } = parseUrl(routeUrl);
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
  const path = parseUrl(url).path;
  const $page = getPage$BasePage(currentPage);
  return path === $page.path || path === "/" && $page.meta.isEntry;
}
function findTabBarPageId(url) {
  const path = parseUrl(url).path;
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
      const { path: path2, query: query2 } = parseUrl(routeUrl);
      transaction = createWebAppRouteTransaction(
        router2.resolve({ path: path2, query: query2 }).fullPath,
        type,
        appRoute == null ? void 0 : appRoute.context
      );
    }
    const { path, query } = parseUrl(routeUrl);
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
      if (isNavigationFailure(failure)) {
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
          meta.eventChannel = new EventChannel(state.__id__, events);
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
const ua = navigator.userAgent;
const isIOS = /* @__PURE__ */ /iphone|ipad|ipod/i.test(ua);
function getScreenFix() {
  return /^Apple/.test(navigator.vendor) && typeof window.orientation === "number";
}
function isLandscape(screenFix) {
  return screenFix && Math.abs(window.orientation) === 90;
}
function getScreenWidth(screenFix, landscape) {
  return screenFix ? Math[landscape ? "max" : "min"](screen.width, screen.height) : screen.width;
}
function getWindowWidth() {
  const screenFix = getScreenFix();
  if (screenFix) {
    const screenWidth = getScreenWidth(screenFix, isLandscape(screenFix));
    return Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      screenWidth
    ) || screenWidth;
  } else {
    return Math.min(window.innerWidth, document.documentElement.clientWidth);
  }
}
function getBaseSystemInfo() {
  const windowWidth = getWindowWidth();
  return {
    platform: isIOS ? "ios" : "other",
    pixelRatio: window.devicePixelRatio,
    windowWidth
  };
}
function getTheme() {
  if (__uniConfig.darkmode == null || __uniConfig.darkmode === false)
    return void 0;
  if (__uniConfig.darkmode !== true)
    return isString(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
  try {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch (error) {
    return "light";
  }
}
function onThemeChange(callback) {
  if (__uniConfig.darkmode) {
    UniServiceJSBridge.on(ON_THEME_CHANGE, callback);
  }
}
function parseTheme(pageStyle) {
  let parsedStyle = {};
  if (__uniConfig.darkmode) {
    parsedStyle = normalizeStyles(
      pageStyle,
      __uniConfig.themeConfig,
      getTheme()
    );
  }
  return __uniConfig.darkmode ? parsedStyle : pageStyle;
}
function useTheme(pageStyle, onThemeChangeCallback) {
  const isReactivity = isReactive(pageStyle);
  const reactivePageStyle = isReactivity ? reactive(parseTheme(pageStyle)) : parseTheme(pageStyle);
  if (__uniConfig.darkmode && isReactivity) {
    watch(pageStyle, (value) => {
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
    _tabBar = __uniConfig.tabBar && reactive(initTabBarI18n(__uniConfig.tabBar));
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
    return safeAreaInsets.top;
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
    const pageMeta = ((_a = this.vm) == null ? void 0 : _a.$basePage.meta) ? normalizeStyles((_b = this.vm) == null ? void 0 : _b.$basePage.meta, __uniConfig.themeConfig) : void 0;
    const scriptLang = (_e = (_d = (_c = this.vm) == null ? void 0 : _c.$) == null ? void 0 : _d.type) == null ? void 0 : _e.__scriptLang;
    const pageStyle = pageMeta ? {
      navigationBarBackgroundColor: pageMeta.navigationBar.backgroundColor,
      navigationBarTextStyle: pageMeta.navigationBar.titleColor,
      navigationBarTitleText: pageMeta.navigationBar.titleText,
      titleImage: pageMeta.navigationBar.titleImage || "",
      navigationStyle: pageMeta.navigationBar.style || "default",
      disableScroll: pageMeta.disableScroll || false,
      enablePullDownRefresh: pageMeta.enablePullDownRefresh || false,
      onReachBottomDistance: pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE,
      backgroundColorContent: pageMeta.backgroundColorContent
    } : {};
    if (!scriptLang || scriptLang === "uts") {
      return new UTSJSONObject(pageStyle);
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
          ) ? normalizeTitleColor(textStyle || "") : textStyle;
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
      route: (route == null ? void 0 : route.path) ? removeLeadingSlash(route == null ? void 0 : route.path) : "",
      // 忽略类型，不同环境UTSJSONObject表示不同类型
      options: isUTS ? new UTSJSONObject((route == null ? void 0 : route.query) || {}) : (route == null ? void 0 : route.query) || {},
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
  route = useRoute();
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
  const route = useRoute();
  const routeKey = computed(
    () => normalizeRouteKey("/" + route.meta.route, getStateId())
  );
  const isTabBar = computed(() => route.meta.isTabBar);
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
      nextTick(() => pruneCurrentPages());
    }
  });
}
function addBase(filePath) {
  const { base: baseUrl } = __uniConfig.router;
  if (addLeadingSlash(filePath).indexOf(baseUrl) === 0) {
    return addLeadingSlash(filePath);
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
  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) {
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
const _sfc_main$9 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "AsyncLoading",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "asyncLoading",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "uni-async-loading" }, _attrs))}><i class="uni-loading"></i></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/async-loading/asyncLoading.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props2, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "AsyncError",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "asyncError",
  __ssrInlineRender: true,
  props: ["error"],
  __vapor: true,
  setup(__props) {
    initI18nAsyncMsgsOnce();
    const { t: t2 } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "uni-async-error" }, _attrs))}>${ssrInterpolate(unref(t2)("uni.async.error"))}</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/async-error/asyncError.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props2, ctx) : void 0;
};
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
function wrapperComponentSetup(comp, { type, clone, init, setup, before, options }) {
  if (clone) {
    comp = extend({}, comp);
  }
  before && before(comp);
  const oldSetup = comp.setup;
  comp.setup = (props2, ctx) => {
    const instance = getCurrentInstance();
    init(instance.proxy);
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
      __UNI_FEATURE_PAGES__ ? useRouter() : void 0;
      const query = decodedQuery(route.query);
      instance.__pageQuery = query;
      {
        const pageInstance = getPageInstanceByChild(instance);
        if (isDialogPageInstance(pageInstance)) {
          const dialogQuery = decodedQuery(
            parseQuery(
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
      comp2.setup = (props2, ctx) => {
        const res = setup && setup(props2, ctx);
        if (isPromise(res)) {
          return res.then(
            (value) => isFunction(value) ? EMPTY_OBJ : value || EMPTY_OBJ
          );
        }
        return isFunction(res) ? EMPTY_OBJ : res;
      };
      comp2.ssrRender = (_ctx, push, parent) => {
        push(ssrRenderComponent(_sfc_main, null, null, parent));
      };
    }
  });
}
function updateDocumentTitle(title) {
  {
    const ssrContext = getApp$1().$vm.$.appContext.provides[ssrContextKey];
    if (ssrContext) {
      ssrContext[UNI_SSR_TITLE] = title;
    }
  }
  UniServiceJSBridge.emit(ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
  function update() {
    updateDocumentTitle(pageMeta.navigationBar.titleText);
  }
  watchEffect(update);
  onActivated(update);
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
  watchEffect(update);
  onActivated(update);
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
  let A = 0;
  const rgb = computed(() => hexToRgba(backgroundColor));
  const offset = parseInt(coverage);
  let titleElem;
  let transparentElemStyle;
  const iconElemsPaths = [];
  const borderRadiusElemsStyles = [];
  const oldColors = [];
  onMounted(() => {
    const $el = headRef.value;
    transparentElemStyle = $el.style;
    titleElem = $el.querySelector(".uni-page-head__title");
    const borderRadiusElems = $el.querySelectorAll(
      ".uni-page-head-btn"
    );
    const iconSvgElems = $el.querySelectorAll(
      "svg path"
    );
    for (let i = 0; i < iconSvgElems.length; i++) {
      iconElemsPaths.push(iconSvgElems[i]);
    }
    for (let i = 0; i < borderRadiusElems.length; i++) {
      const borderRadiusElem = borderRadiusElems[i];
      oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor);
      borderRadiusElemsStyles.push(borderRadiusElem.style);
    }
  });
  useOn(id2 + ".onPageScroll", ({ scrollTop }) => {
    const alpha = Math.min(scrollTop / offset, 1);
    if (alpha === 1 && A === 1) {
      return;
    }
    if (alpha > 0.5 && A <= 0.5) {
      iconElemsPaths.forEach(function(iconElemPath) {
        iconElemPath.setAttribute("fill", titleColor);
      });
    } else if (alpha <= 0.5 && A > 0.5) {
      iconElemsPaths.forEach(function(iconElemPath) {
        iconElemPath.setAttribute("fill", "#fff");
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "PageHead",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "pageHead",
  __ssrInlineRender: true,
  __vapor: true,
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
    const headRef = ref(null);
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
    function usePageHead(navigationBar2) {
      const clazz2 = computed(() => {
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
      const style2 = computed(() => {
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
      if (isArray(buttons2)) {
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
              onBeforeMount(
                () => updateStyle(
                  "uni-btn-" + fontFamily,
                  `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`
                )
              );
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
            invokeHook(pageId, ON_NAVIGATION_BAR_BUTTON_TAP, extend({ index: index2 }, btn));
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
      const focus = ref(false);
      const text2 = ref("");
      const composing = ref(false);
      const { disabled } = searchInput2;
      if (disabled) {
        const onClick = () => {
          invokeHook(id2, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
        };
        return { focus, text: text2, composing, onClick };
      }
      const onFocus = () => {
        focus.value = true;
        invokeHook(id2, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
          focus: true
        });
      };
      const onBlur = () => {
        focus.value = false;
        invokeHook(id2, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, {
          focus: false
        });
      };
      const onInput = (evt) => {
        text2.value = evt.detail.value;
        invokeHook(id2, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, {
          text: text2.value
        });
      };
      const onConfirm = (evt) => {
        invokeHook(id2, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, {
          text: text2.value
        });
      };
      return { focus, text: text2, composing, onFocus, onBlur, onInput, onConfirm };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<uni-page-head${ssrRenderAttrs(mergeProps({
        "uni-page-head-type": unref(navigationBar).type || "default"
      }, _attrs), "uni-page-head")}><div class="${ssrRenderClass(unref(clazz))}" style="${ssrRenderStyle(unref(style))}"><div class="uni-page-head-hd">`);
      if (unref(hasPages) && !unref(pageMeta).isQuit) {
        _push(`<div class="uni-page-head-btn"><svg width="26" height="26" viewBox="0 0 32 32"><path${ssrRenderAttr("d", unref(ICON_PATH_BACK))}${ssrRenderAttr(
          "fill",
          unref(navigationBar).type === "transparent" ? "#fff" : unref(navigationBar).titleColor
        )}></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasButtons) && unref(buttons)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(buttons).left, (button, index2) => {
          _push(`<div class="${ssrRenderClass(button.btnClass)}" style="${ssrRenderStyle(button.btnStyle)}"${ssrRenderAttr("badge-text", button.badgeText)}>`);
          if (button.btnIconPath) {
            _push(`<svg${ssrRenderAttr("width", getSvgSize(button.iconStyle.fontSize))}${ssrRenderAttr("height", getSvgSize(button.iconStyle.fontSize))} viewBox="0 0 32 32"><path${ssrRenderAttr("d", button.btnIconPath)}${ssrRenderAttr("fill", getSvgColor(button.iconStyle.color))}></path></svg>`);
          } else if (button.btnSelect) {
            _push(`<span style="${ssrRenderStyle(button.iconStyle)}"><i class="uni-btn-icon">${button.btnText ?? ""}</i><svg width="14" height="14" viewBox="0 0 32 32"><path${ssrRenderAttr("d", ICON_PATHS.select)} fill="#000"></path></svg></span>`);
          } else {
            _push(`<i class="uni-btn-icon" style="${ssrRenderStyle(button.iconStyle)}">${button.btnText ?? ""}</i>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!unref(hasSearchInput) || !unref(navigationBar).searchInput) {
        _push(`<div class="uni-page-head-bd"><div class="uni-page-head__title" style="${ssrRenderStyle({
          fontSize: unref(navigationBar).titleSize,
          opacity: unref(navigationBar).type === "transparent" ? 0 : 1
        })}">`);
        if (unref(navigationBar).loading) {
          _push(`<i class="uni-loading"></i>`);
        } else if (unref(navigationBar).titleImage) {
          _push(`<img${ssrRenderAttr("src", unref(navigationBar).titleImage)} class="uni-page-head__title_image">`);
        } else {
          _push(`<!--[-->${ssrInterpolate(unref(navigationBar).titleText)}<!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="uni-page-head-search" style="${ssrRenderStyle({
          borderRadius: unref(navigationBar).searchInput.borderRadius,
          backgroundColor: unref(navigationBar).searchInput.backgroundColor
        })}"><div style="${ssrRenderStyle({ color: unref(navigationBar).searchInput.placeholderColor })}" class="${ssrRenderClass([
          "uni-page-head-search-placeholder",
          `uni-page-head-search-placeholder-${unref(searchFocus) || unref(searchText) ? "left" : unref(navigationBar).searchInput.align}`
        ])}"><div class="uni-page-head-search-icon"><svg width="20" height="20" viewBox="0 0 32 32"><path${ssrRenderAttr("d", unref(ICON_PATH_SEARCH))}${ssrRenderAttr("fill", unref(navigationBar).searchInput.placeholderColor)}></path></svg></div>`);
        if (!(unref(searchText) || unref(searchComposing))) {
          _push(`<!--[-->${ssrInterpolate(unref(navigationBar).searchInput.placeholder)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(navigationBar).searchInput.disabled) {
          _push(ssrRenderComponent(unref(Input), {
            disabled: true,
            style: { color: unref(navigationBar).searchInput.color },
            "placeholder-style": "color: " + unref(navigationBar).searchInput.placeholderColor,
            class: "uni-page-head-search-input",
            "confirm-type": "search",
            onClick: ($event) => unref(searchOnClick) && unref(searchOnClick)($event)
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Input), {
            focus: unref(navigationBar).searchInput.autoFocus,
            style: { color: unref(navigationBar).searchInput.color },
            "placeholder-style": "color: " + unref(navigationBar).searchInput.placeholderColor,
            class: "uni-page-head-search-input",
            "confirm-type": "search",
            onFocus: ($event) => unref(searchOnFocus) && unref(searchOnFocus)($event),
            onBlur: ($event) => unref(searchOnBlur) && unref(searchOnBlur)($event),
            onInput: ($event) => unref(searchOnInput) && unref(searchOnInput)($event),
            onConfirm: ($event) => unref(searchOnConfirm) && unref(searchOnConfirm)($event)
          }, null, _parent));
        }
        _push(`</div>`);
      }
      _push(`<div class="uni-page-head-ft">`);
      if (unref(hasButtons) && unref(buttons)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(buttons).right, (button, index2) => {
          _push(`<div class="${ssrRenderClass(button.btnClass)}" style="${ssrRenderStyle(button.btnStyle)}"${ssrRenderAttr("badge-text", button.badgeText)}>`);
          if (button.btnIconPath) {
            _push(`<svg${ssrRenderAttr("width", getSvgSize(button.iconStyle.fontSize))}${ssrRenderAttr("height", getSvgSize(button.iconStyle.fontSize))} viewBox="0 0 32 32"><path${ssrRenderAttr("d", button.btnIconPath)}${ssrRenderAttr("fill", getSvgColor(button.iconStyle.color))}></path></svg>`);
          } else if (button.btnSelect) {
            _push(`<span style="${ssrRenderStyle(button.iconStyle)}"><i class="uni-btn-icon">${button.btnText ?? ""}</i><svg width="14" height="14" viewBox="0 0 32 32"><path${ssrRenderAttr("d", ICON_PATHS.select)} fill="#000"></path></svg></span>`);
          } else {
            _push(`<i class="uni-btn-icon" style="${ssrRenderStyle(button.iconStyle)}">${button.btnText ?? ""}</i>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(navigationBar).type !== "transparent" && unref(navigationBar).type !== "float") {
        _push(`<div class="${ssrRenderClass({
          "uni-placeholder": true,
          "uni-placeholder-titlePenetrate": unref(navigationBar).titlePenetrate
        })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</uni-page-head>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/page/pageHead.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props2, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent$1({
  ...{ name: "PageRefresh" },
  __name: "component",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    const { pullToRefresh } = usePageMeta();
    const offset = pullToRefresh.offset;
    const color = pullToRefresh.color;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<uni-page-refresh${ssrRenderAttrs(_attrs, "uni-page-refresh")}><div style="${ssrRenderStyle({ "margin-top": unref(offset) + "px" })}" class="uni-page-refresh"><div class="uni-page-refresh-inner"><svg${ssrRenderAttr("fill", unref(color))} class="uni-page-refresh__icon" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg><svg class="uni-page-refresh__spinner" width="24" height="24" viewBox="25 25 50 50"><circle${ssrRenderAttr("stroke", unref(color))} class="uni-page-refresh__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div></div></uni-page-refresh>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/page/page-refresh/component.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props2, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "PageBody",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "pageBody",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    const isX = true;
    const hasPullDownRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__;
    const pageMeta = hasPullDownRefresh ? usePageMeta() : null;
    const refreshRef = ref(null);
    const wrapperRef = ref(null);
    const _pageRefresh = null;
    const pageRefresh = ref(null);
    watch(
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(hasPullDownRefresh) && !!unref(pageMeta) && (unref(isX) || !!unref(pageMeta).enablePullDownRefresh)) {
        _push(ssrRenderComponent(_sfc_main$6, {
          ref_key: "refreshRef",
          ref: refreshRef
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<uni-page-wrapper${ssrRenderAttrs(mergeProps({
        ref_key: "wrapperRef",
        ref: wrapperRef
      }, pageRefresh.value), "uni-page-wrapper")}><uni-page-body>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</uni-page-body>`);
      if (unref(isX)) {
        _push(ssrRenderComponent(unref(ResizeSensor), { onResize: resize }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</uni-page-wrapper><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/page/pageBody.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props2, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "Page",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "index-vapor",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    var _a;
    const hasNavigationBar = __UNI_FEATURE_NAVIGATIONBAR__;
    const pageStyle = {};
    let pageMeta = providePageMeta(getStateId());
    const navigationBar = pageMeta.navigationBar;
    const currentInstance = getCurrentInstance();
    const attrs = currentInstance.attrs;
    const routeComponent = currentInstance.type;
    const pageComponent = routeComponent.__uniPageComponent;
    const pageProps = routeComponent.__uniGetPageProps();
    useDocumentTitle(pageMeta);
    currentInstance.$dialogPages = ref([]);
    currentInstance.$systemDialogPages = ref([]);
    if (isDialogPageInstance(currentInstance)) {
      pageMeta.route = attrs.route;
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
      if (attrs["data-type"] === SYSTEM_DIALOG_TAG) {
        pageMeta.navigationBar.titleText = "";
      }
      const parentInstance = inject("parentInstance");
      if (currentInstance && parentInstance) {
        currentInstance.$parentInstance = parentInstance;
        assignDialogPage(currentInstance, parentInstance, currentInstance);
      }
    } else {
      useBackgroundColorContent(pageMeta);
      provide("parentInstance", currentInstance);
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
      pages.sort((a2, b) => {
        var _a2, _b, _c, _d;
        const aId = ((_b = (_a2 = a2.page.vm) == null ? void 0 : _a2.$basePage) == null ? void 0 : _b.id) || Number.MAX_SAFE_INTEGER;
        const bId = ((_d = (_c = b.page.vm) == null ? void 0 : _c.$basePage) == null ? void 0 : _d.id) || Number.MAX_SAFE_INTEGER;
        return aId - bId;
      });
      return pages.map(({ page, type }) => ({
        component: page.$component,
        type,
        route: `${page.route}${stringifyQuery$1(page.options)}`
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<uni-page${ssrRenderAttrs(mergeProps({
        "data-page": unref(pageMeta).route,
        style: pageStyle
      }, _attrs), "uni-page")}>`);
      if (unref(hasNavigationBar) && unref(navigationBar).style !== "custom") {
        _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$5, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(pageComponent)), mergeProps(unref(pageProps), { ref: "page" }), null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(unref(pageComponent)), mergeProps(unref(pageProps), { ref: "page" }), null, 16))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(getDialogPages(), (dialogPage) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(dialogPage.component), {
          key: dialogPage.route,
          style: dialogPageStyle,
          "data-type": dialogPage.type,
          route: dialogPage.route
        }, null), _parent);
      });
      _push(`<!--]--></uni-page>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/page/index-vapor.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props2, ctx) : void 0;
};
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
        var text2 = index2 < 0 ? html : html.substring(0, index2);
        html = index2 < 0 ? "" : html.substring(index2);
        if (handler.chars) {
          handler.chars(text2);
        }
      }
    } else {
      html = html.replace(
        new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"),
        function(all, text3) {
          text3 = text3.replace(
            /<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,
            "$1$2"
          );
          if (handler.chars) {
            handler.chars(text3);
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
      var attrs = [];
      rest.replace(attr, function(match2, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
        attrs.push({
          name,
          value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
          // "
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
const scripts = {};
function loadScript(globalName, src, callback) {
  const globalObject = isString(globalName) ? window[globalName] : globalName;
  if (globalObject) {
    callback();
    return;
  }
  let callbacks = scripts[src];
  if (!callbacks) {
    callbacks = scripts[src] = [];
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = function() {
      callbacks.forEach((callback2) => callback2());
      delete scripts[src];
    };
  }
  callbacks.push(callback);
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
  const { Scope, Attributor } = Quill.import("parchment");
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
  const { Scope, Attributor } = Quill.import("parchment");
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
      return { [this.statics.blotName]: this.statics.formats(this.domNode) };
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
  const { Scope } = Quill.import("parchment");
  const BackgroundStyle = Quill.import("formats/background");
  const BackgroundColorStyle = new BackgroundStyle.constructor(
    "backgroundColor",
    "background-color",
    {
      scope: Scope.INLINE
    }
  );
  return {
    "formats/backgroundColor": BackgroundColorStyle
  };
}
function box(Quill) {
  const { Scope, Attributor } = Quill.import("parchment");
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
    result[`formats/${name}`] = new Attributor.Style(
      name,
      hyphenate(name),
      config
    );
  });
  return result;
}
function font(Quill) {
  const { Scope, Attributor } = Quill.import("parchment");
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
    result[`formats/${name}`] = new Attributor.Style(
      name,
      hyphenate(name),
      config
    );
  });
  return result;
}
function text(Quill) {
  const { Scope, Attributor } = Quill.import("parchment");
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
  text2.forEach(({ name, scope }) => {
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
  Image2.sanitize = (url) => url ? getRealPath(url) : url;
  Image2.formats = function formats(domNode) {
    return ATTRIBUTES.reduce(
      function(formats2, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats2[attribute] = domNode.getAttribute(attribute);
        }
        return formats2;
      },
      {}
    );
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
function link(Quill) {
  const Link = Quill.import("formats/link");
  Link.sanitize = (url) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
    return Link.PROTOCOL_WHITELIST.concat("file").indexOf(protocol) > -1 ? url : Link.SANITIZED_URL;
  };
}
const SupportStyleList = ["color", "background", "padding", "radius"];
const MentionStyleMap = {
  color: "color",
  background: "background",
  padding: "padding",
  radius: "border-radius"
};
function getMentionStyleValue(node, styleKey) {
  const cssName = MentionStyleMap[styleKey];
  if (!cssName) {
    return "";
  }
  return node.style.getPropertyValue(cssName).trim();
}
const isApple = /^Apple/.test(navigator.vendor);
function mention(Quill) {
  const Embed = Quill.import("blots/embed");
  class MentionBlot extends Embed {
    static create(data) {
      const node = super.create();
      const id2 = data.id == null ? "" : data.id;
      const name = data.name == null ? "" : data.name;
      if (!isApple) {
        node.setAttribute("contenteditable", "false");
      }
      node.setAttribute("data-id", id2);
      node.setAttribute("data-name", name);
      let style = "";
      if (isApple) {
        style += "-webkit-user-select: none;";
      }
      SupportStyleList.forEach((item) => {
        const styleName = MentionStyleMap[item] || item;
        if (data[item]) {
          style += `${hyphenate(styleName)}: ${data[item]};`;
        }
      });
      if (style) {
        node.setAttribute("style", style);
      }
      node.innerText = `@${name}`;
      return node;
    }
    static value(node) {
      const value = {
        id: node.dataset.id == null ? "" : node.dataset.id,
        name: node.dataset.name == null ? "" : node.dataset.name
      };
      SupportStyleList.forEach((item) => {
        const styleValue2 = getMentionStyleValue(node, item);
        if (styleValue2) {
          value[item] = styleValue2;
        }
      });
      return value;
    }
  }
  MentionBlot.blotName = "mention";
  MentionBlot.tagName = "span";
  MentionBlot.className = "mention";
  return {
    "formats/mention": MentionBlot
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
    image,
    link,
    mention
  };
  const options = {};
  Object.values(formats).forEach((value) => extend(options, value(Quill)));
  Quill.register(options, true);
}
const STATUS_KEY_MAP = { "code-block": "codeBlock" };
function useQuill(props2, rootRef, trigger) {
  let quillReady;
  let skipMatcher;
  let quill;
  watch(
    () => props2.readOnly,
    (value) => {
      if (quillReady) {
        quill.enable(!value);
        if (value) {
          quill.blur();
        }
      }
    }
  );
  watch(
    () => props2.placeholder,
    (value) => {
      if (quillReady) {
        setPlaceHolder(value);
      }
    }
  );
  watch(
    () => props2.type,
    (value) => {
      if (quillReady) {
        setInputMode(value);
      }
    }
  );
  function html2delta(html) {
    const tags = [
      "span",
      "strong",
      "b",
      "ins",
      "em",
      "i",
      "u",
      "a",
      "del",
      "s",
      "sub",
      "sup",
      "img",
      "div",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "ol",
      "ul",
      "li",
      "br",
      "blockquote",
      "pre",
      "code"
    ];
    let content = "";
    let disable;
    HTMLParser(html, {
      start: function(tag, attrs, unary) {
        if (!tags.includes(tag)) {
          disable = !unary;
          return;
        }
        disable = false;
        const arrts = attrs.map(({ name, value }) => `${name}="${value}"`).join(" ");
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
  function setPlaceHolder(placeholder) {
    const placeHolderAttrName = "data-placeholder";
    const QuillRoot = quill.root;
    QuillRoot.getAttribute(placeHolderAttrName) !== placeholder && QuillRoot.setAttribute(placeHolderAttrName, placeholder);
  }
  function setInputMode(type) {
    const QuillRoot = quill.root;
    if (type === "none") {
      QuillRoot.setAttribute("inputmode", "none");
    } else {
      QuillRoot.removeAttribute("inputmode");
    }
  }
  let oldStatus = {};
  function updateStatus(range) {
    const status = range ? quill.getFormat(range) : {};
    const keys = Object.keys(status);
    if (keys.length !== Object.keys(oldStatus).length || keys.find((key) => status[key] !== oldStatus[key])) {
      oldStatus = status;
      const normalizedStatus = {};
      Object.keys(status).forEach((k) => {
        normalizedStatus[STATUS_KEY_MAP[k] || k] = status[k];
      });
      trigger("statuschange", {}, normalizedStatus);
    }
  }
  function fixCursor() {
    var _a;
    const range = quill.getSelection();
    if (!range)
      return;
    const [leaf] = quill.getLeaf(range.index - 1);
    if (((_a = leaf == null ? void 0 : leaf.statics) == null ? void 0 : _a.blotName) === "mention") {
      quill.setSelection(range.index, 0, "silent");
    }
  }
  function textChangeHandler() {
    fixCursor();
    trigger("input", {}, getContents());
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
      Quill.register(
        "modules/ImageResize",
        window.ImageResize.default
      );
      options.modules = {
        syntax: true,
        ImageResize: {
          modules: imageResizeModules
        }
      };
    }
    const rootEl = rootRef.value;
    quill = new Quill(rootEl, options);
    setInputMode(props2.type);
    const $el = quill.root;
    const events = ["focus", "blur", "input"];
    events.forEach((name) => {
      $el.addEventListener(name, ($event) => {
        const contents = getContents();
        if (name === "input") {
          if (getBaseSystemInfo().platform === "ios") {
            const regExpContent = (contents.html.match(
              /<span [\s\S]*>([\s\S]*)<\/span>/
            ) || [])[1];
            const placeholder = regExpContent && regExpContent.replace(/\s/g, "") ? "" : props2.placeholder;
            setPlaceHolder(placeholder);
          }
          $event.stopPropagation();
        } else {
          trigger(name, $event, contents);
        }
      });
    });
    quill.on("text-change", textChangeHandler);
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
        delta.ops = delta.ops.filter(({ insert }) => isString(insert)).map(({ insert }) => ({ insert }));
      }
      return delta;
    });
    quillReady = true;
    trigger("ready", {}, {});
  }
  const id2 = useContextInfo();
  useSubscribe(
    (type, data, resolve) => {
      const { options, callbackId } = data;
      let res;
      let range;
      let errMsg;
      if (quillReady) {
        const Quill = window.Quill;
        switch (type) {
          case "format":
            {
              let { name = "", value = false } = options;
              range = quill.getSelection(true);
              if (!name) {
                break;
              }
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
            quill.insertText(range.index, LINEFEED, "user");
            quill.insertEmbed(range.index + 1, "divider", true, "user");
            quill.setSelection(range.index + 2, 0, "silent");
            break;
          case "insertMention":
            {
              range = quill.getSelection(true);
              const mentionData = extend({ id: "", name: "" }, options);
              quill.insertEmbed(range.index, "mention", mentionData, "user");
              quill.setSelection(range.index + 1, 0);
            }
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
              quill.insertEmbed(range.index, "image", path, "silent");
              const local = /^(file|blob):/.test(path) ? path : false;
              quill.formatText(range.index, 1, "data-local", local, "silent");
              quill.formatText(range.index, 1, "alt", alt, "silent");
              quill.formatText(range.index, 1, "width", width, "silent");
              quill.formatText(range.index, 1, "height", height, "silent");
              quill.formatText(range.index, 1, "class", extClass, "silent");
              quill.formatText(
                range.index,
                1,
                "data-custom",
                Object.keys(data2).map((key) => `${key}=${data2[key]}`).join("&"),
                "silent"
              );
              quill.setSelection(range.index + 1, 0, "silent");
              quill.scrollIntoView();
              setTimeout(() => {
                textChangeHandler();
              }, 1e3);
            }
            break;
          case "insertText":
            {
              range = quill.getSelection(true);
              const { text: text2 = "" } = options;
              quill.insertText(range.index, text2, "user");
              quill.setSelection(range.index + text2.length, 0, "silent");
            }
            break;
          case "insertLink":
            {
              range = quill.getSelection(true);
              const { text: text2 = "", href = "" } = options;
              if (!href)
                break;
              if (range.length > 0) {
                quill.format("link", href, "user");
              } else {
                const linkText = text2 || href;
                quill.insertText(range.index, linkText, "link", href, "user");
                quill.setSelection(range.index + linkText.length, 0, "silent");
              }
            }
            break;
          case "setContents":
            {
              const { delta, html } = options;
              if (typeof delta === "object") {
                quill.setContents(delta, "silent");
              } else if (isString(html)) {
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
            res = { text: "" };
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
        resolve({
          callbackId,
          data: extend({}, res, {
            errMsg: `${type}:${errMsg ? "fail " + errMsg : "ok"}`
          })
        });
      }
    },
    id2
  );
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
    const quillHighlightSrc = "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/highlight.min.js";
    loadScript("hljs", quillHighlightSrc, () => {
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
  });
}
const props$m = /* @__PURE__ */ extend({}, props$n, {
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
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useQuill(props2, rootRef, trigger);
    useKeyboard$1(props2, rootRef);
    return () => {
      return openBlock(), createBlock("uni-editor", {
        ref: rootRef,
        id: props2.id,
        class: "ql-container"
      }, null, 512);
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
    const rootRef = ref(null);
    const path = computed(() => ICONS[props2.type]);
    return () => {
      const { value } = path;
      return openBlock(), createBlock("uni-icon", { ref: rootRef }, [normalizeVNode(() => value && value.d && createSvgIconVNode(value.d, props2.color || value.c, rpx2px(props2.size)))], 512);
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
const passiveOptions$1 = /* @__PURE__ */ passive(true);
const states = [];
let userInteract = 0;
let inited = false;
const setUserAction = (userAction) => states.forEach((vm) => vm.userAction = userAction);
function addInteractListener(vm = { userAction: false }) {
  if (!inited) {
    const eventNames = [
      "touchstart",
      "touchmove",
      "touchend",
      "mousedown",
      "mouseup"
    ];
    eventNames.forEach((eventName) => {
      document.addEventListener(
        eventName,
        function() {
          !userInteract && setUserAction(true);
          userInteract++;
          setTimeout(() => {
            !--userInteract && setUserAction(false);
          }, 0);
        },
        passiveOptions$1
      );
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
    /**
     * 是否用户激活
     */
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
    let instance = getCurrentInstance();
    while (instance) {
      const scopeId = instance.type.__scopeId;
      if (scopeId) {
        state.attrs[scopeId] = "";
      }
      instance = instance.proxy && instance.proxy.$mpType === "page" ? null : instance.parent;
    }
  });
  return {
    state
  };
}
function useFormField(nameKey, value) {
  const uniForm = inject(
    uniFormKey,
    false
    // remove warning
  );
  if (!uniForm) {
    return;
  }
  const instance = getCurrentInstance();
  const ctx = {
    submit() {
      const proxy = instance.proxy;
      return [
        proxy[nameKey],
        isString(value) ? proxy[value] : value.value
      ];
    },
    reset() {
      if (isString(value)) {
        instance.proxy[value] = "";
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
const props$l = /* @__PURE__ */ extend(
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
  watch(
    () => state.focus,
    (val) => emit2("update:focus", val)
  );
  watch(
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
  watch(() => props2.modelValue, valueChangeFn);
  watch(() => props2.value, valueChangeFn);
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
  watch(
    () => props2.focus,
    (value) => {
      if (value) {
        focus();
      } else {
        blur();
      }
    }
  );
  onMounted(() => {
    if (needFocus.value) {
      nextTick(focus);
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
      if (isFunction(beforeInput) && beforeInput(event, state) === false) {
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
  watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
  watch(() => state.cursor, checkCursor);
  watch(() => fieldRef.value, initField);
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
once(() => {
});
const _hoisted_1$a = { class: "uni-input-wrapper" };
const props$k = /* @__PURE__ */ extend({}, props$l, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  },
  textContentType: {
    type: String,
    default: ""
  }
});
function useCache(props2, type) {
  if (type.value === "number") {
    const value = typeof props2.modelValue === "undefined" ? props2.value : props2.modelValue;
    const cache = ref(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
    watch(() => props2.modelValue, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    watch(() => props2.value, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    return cache;
  } else {
    return ref("");
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
    const type = computed(() => {
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
    const autocomplete = computed(() => {
      const camelizeIndex = AUTOCOMPLETES.indexOf(props2.textContentType);
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(hyphenate(props2.textContentType));
      const index2 = camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0;
      return AUTOCOMPLETES[index2];
    });
    const inputmode = computed(() => {
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
    const rootRef = ref(null);
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props2, rootRef, emit2, (event, state2) => {
      {
        return;
      }
    });
    watch(() => state.value, (value) => {
      if (props2.type === "number" && !(cache.value === "-" && value === "")) {
        cache.value = value.toString();
      }
    });
    watch(() => props2.maxlength, (length) => {
      length = parseInt(length, 10);
      const realValue = state.value.slice(0, length);
      realValue !== state.value && (state.value = realValue);
    });
    const NUMBER_TYPES = ["number", "digit"];
    const step = computed(() => NUMBER_TYPES.includes(props2.type) ? props2.step : "");
    expose({ $triggerInput: (detail) => {
      emit2("update:modelValue", detail.value);
      emit2("update:value", detail.value);
      state.value = detail.value;
    } });
    return () => {
      let inputNode = props2.disabled && fixDisabledColor ? (openBlock(), createBlock("input", {
        key: "disabled-input",
        ref: fieldRef,
        value: state.value,
        tabindex: "-1",
        readonly: !!props2.disabled,
        type: type.value,
        maxlength: state.maxlength,
        step: step.value,
        class: "uni-input-input",
        style: props2.cursorColor ? { caretColor: props2.cursorColor } : {},
        inputmode: inputmode.value
      }, null, 512)) : (openBlock(), createBlock("input", {
        key: "input",
        ref: fieldRef,
        value: state.value,
        disabled: !!props2.disabled,
        type: type.value,
        maxlength: state.maxlength,
        step: step.value,
        enterkeyhint: props2.confirmType,
        pattern: props2.type === "number" ? "[0-9]*" : void 0,
        class: "uni-input-input",
        style: props2.cursorColor ? { caretColor: props2.cursorColor } : {},
        autocomplete: autocomplete.value,
        inputmode: inputmode.value
      }, null, 512));
      return openBlock(), createBlock("uni-input", { ref: rootRef }, [createVNode("div", _hoisted_1$a, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
        style: props2.placeholderStyle,
        class: ["uni-input-placeholder", props2.placeholderClass]
      }), [normalizeVNode(() => props2.placeholder)], 16), [[vShow, !(state.value.length || cache.value === "-" || cache.value.includes("."))]]), props2.confirmType === "search" ? (openBlock(), createBlock("form", {
        key: 0,
        action: "",
        class: "uni-input-form"
      }, [normalizeVNode(() => inputNode)])) : (openBlock(), createBlock(Fragment, { key: 1 }, [normalizeVNode(() => inputNode)], 64))])], 512);
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
  const instance = getCurrentInstance();
  const attrs = shallowRef({});
  const listeners = shallowRef({});
  const excludeAttrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = reactive(instance.attrs);
  watchEffect(() => {
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
    attrs.value = res.attrs;
    listeners.value = res.listeners;
    excludeAttrs.value = res.exclude;
  });
  return { $attrs: attrs, $listeners: listeners, $excludeAttrs: excludeAttrs };
};
const ResizeSensor = /* @__PURE__ */ defineBuiltInComponent({
  name: "ResizeSensor",
  props: { initial: {
    type: Boolean,
    default: false
  } },
  emits: ["resize"],
  setup(props2, { emit: emit2 }) {
    const rootRef = ref(null);
    const reset = useResizeSensorReset(rootRef);
    const update = useResizeSensorUpdate(rootRef, emit2, reset);
    useResizeSensorLifecycle(rootRef, props2, update, reset);
    return () => (() => {
      const _cache = createVNodeCache("c61bbd7f");
      return openBlock(), createBlock("uni-resize-sensor", { ref: rootRef }, [..._cache[0] || (_cache[0] = [createVNode("div", null, [createVNode("div")], -1), createVNode("div", null, [createVNode("div")], -1)])], 512);
    })();
  }
});
function useResizeSensorUpdate(rootRef, emit2, reset) {
  const size = reactive({
    width: -1,
    height: -1
  });
  watch(() => extend({}, size), (value) => emit2("resize", value));
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
function flatVNode(nodes) {
  const array = [];
  if (isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children));
        } else {
          array.push(vnode);
        }
      } else if (isArray(vnode)) {
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
    const rootRef = ref(null);
    const _isMounted = ref(false);
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
    onMounted(() => {
      movableAreaEvents._resize();
      _isMounted.value = true;
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
          contexts.push(markRaw(movableViewContext));
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
    provide("_isMounted", _isMounted);
    provide("movableAreaRootRef", rootRef);
    provide("addMovableViewContext", addMovableViewContext);
    provide("removeMovableViewContext", removeMovableViewContext);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        movableViewItems = flatVNode(defaultSlots);
      }
      return openBlock(), createBlock("uni-movable-area", mergeProps({ ref: rootRef }, $attrs.value, $excludeAttrs.value, _listeners), [createVNode(ResizeSensor), normalizeVNode(() => movableViewItems)], 16);
    };
  }
});
function calc(e2) {
  return Math.sqrt(e2.x * e2.x + e2.y * e2.y);
}
function useMovableAreaState(props2, rootRef) {
  const width = ref(0);
  const height = ref(0);
  const gapV = reactive({
    x: null,
    y: null
  });
  const pinchStartLen = ref(null);
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
  provide("movableAreaWidth", width);
  provide("movableAreaHeight", height);
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
const addListenerToElement = function(element, type, callback, capture) {
  element.addEventListener(
    type,
    ($event) => {
      if (isFunction(callback)) {
        if (callback($event) === false) {
          if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) {
            $event.preventDefault();
          }
          $event.stopPropagation();
        }
      }
    },
    {
      passive: false
    }
  );
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
      // @ts-expect-error
      cancelable: $event.cancelable,
      target: $event.target,
      currentTarget: $event.currentTarget,
      preventDefault: $event.preventDefault.bind($event),
      stopPropagation: $event.stopPropagation.bind($event),
      touches: $event.touches,
      changedTouches: $event.changedTouches,
      detail: {
        state,
        x,
        y,
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
      const res = fn(
        $event,
        "move",
        $event.touches[0].pageX,
        $event.touches[0].pageY
      );
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
      return fn(
        $event,
        "end",
        $event.changedTouches[0].pageX,
        $event.changedTouches[0].pageY
      );
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
      return fn(
        $event,
        useCancel ? "cancel" : "end",
        $eventTemp.touches[0].pageX,
        $eventTemp.touches[0].pageY
      );
    }
  });
}
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
  const n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  this._x_v = x;
  this._y_v = y;
  this._x_a = -this._f * this._x_v / n;
  this._y_a = -this._f * this._y_v / n;
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
  this._lastDt = null;
  this._startTime = (/* @__PURE__ */ new Date()).getTime();
};
Friction$1.prototype.setS = function(x, y) {
  this._x_s = x;
  this._y_s = y;
};
Friction$1.prototype.s = function(t2) {
  if (void 0 === t2) {
    t2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
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
Friction$1.prototype.ds = function(t2) {
  if (void 0 === t2) {
    t2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
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
  const t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
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
  const n = this._c;
  const i = this._m;
  const r = this._k;
  const o2 = n * n - 4 * i * r;
  if (o2 === 0) {
    const a2 = -n / (2 * i);
    const s = e2;
    const l = t2 / (a2 * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a2 * e3);
      },
      dx: function(e3) {
        const t3 = Math.pow(Math.E, a2 * e3);
        return a2 * (s + l * e3) * t3 + l * t3;
      }
    };
  }
  if (o2 > 0) {
    const c = (-n - Math.sqrt(o2)) / (2 * i);
    const u = (-n + Math.sqrt(o2)) / (2 * i);
    const d = (t2 - c * e2) / (u - c);
    const h2 = e2 - d;
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
        return h2 * t3 + d * n2;
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
        return h2 * c * t3 + d * u * n2;
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
Spring$1.prototype.x = function(e2) {
  if (void 0 === e2) {
    e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring$1.prototype.dx = function(e2) {
  if (void 0 === e2) {
    e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring$1.prototype.setEnd = function(e2, n, i) {
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
Spring$1.prototype.snap = function(e2) {
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
Spring$1.prototype.done = function(n) {
  if (!n) {
    n = (/* @__PURE__ */ new Date()).getTime();
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};
Spring$1.prototype.reconfigure = function(m, t2, c) {
  this._m = m;
  this._k = t2;
  this._c = c;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
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
  const r = (/* @__PURE__ */ new Date()).getTime();
  this._springX.setEnd(e2, i, r);
  this._springY.setEnd(t2, i, r);
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
function v(a2, b) {
  return +((1e3 * a2 - 1e3 * b) / 1e3).toFixed(1);
}
const index$p = /* @__PURE__ */ defineBuiltInComponent({
  name: "MovableView",
  props: movableViewProps,
  emits: ["change", "scale"],
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useMovableViewState(props2, trigger, rootRef);
    return () => {
      return openBlock(), createBlock("uni-movable-view", { ref: rootRef }, [createVNode(ResizeSensor), normalizeVNode(() => slots.default && slots.default())], 512);
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
  const movableAreaWidth = inject("movableAreaWidth", ref(0));
  const movableAreaHeight = inject("movableAreaHeight", ref(0));
  const movableAreaRootRef = inject("movableAreaRootRef");
  const _offset = {
    x: 0,
    y: 0
  };
  const _scaleOffset = {
    x: 0,
    y: 0
  };
  const width = ref(0);
  const height = ref(0);
  const minX = ref(0);
  const minY = ref(0);
  const maxX = ref(0);
  const maxY = ref(0);
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
  const dampingNumber = computed(() => {
    let val = Number(props2.damping);
    return isNaN(val) ? 20 : val;
  });
  const xMove = computed(() => props2.direction === "all" || props2.direction === "horizontal");
  const yMove = computed(() => props2.direction === "all" || props2.direction === "vertical");
  const xSync = ref(_getPx(props2.x));
  const ySync = ref(_getPx(props2.y));
  watch(() => props2.x, (val) => {
    xSync.value = _getPx(val);
  });
  watch(() => props2.y, (val) => {
    ySync.value = _getPx(val);
  });
  watch(xSync, (val) => {
    _setX(val);
  });
  watch(ySync, (val) => {
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
  function _animationTo(x, y, scale, source, r, o2) {
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
      _setTransform(x, y, scale, source, r, o2);
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
      _setTransform(x2, y2, scale2, source, r, o2);
    }, function() {
      _SFA.cancel();
    });
  }
  function _setTransform(x, y, scale, source = "", r, o2) {
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
    if (o2 && scale !== _scale.value) {
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
  const scaleMinNumber = computed(() => {
    let val = Number(props2.scaleMin);
    return isNaN(val) ? 0.1 : val;
  });
  const scaleMaxNumber = computed(() => {
    let val = Number(props2.scaleMax);
    return isNaN(val) ? 10 : val;
  });
  const scaleValueSync = ref(Number(props2.scaleValue) || 1);
  watch(scaleValueSync, (val) => {
    _setScaleValue(val);
  });
  watch(scaleMinNumber, () => {
    _setScaleMinOrMax();
  });
  watch(scaleMaxNumber, () => {
    _setScaleMinOrMax();
  });
  watch(() => props2.scaleValue, (val) => {
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
  const _isMounted = inject("_isMounted", ref(false));
  const addMovableViewContext = inject("addMovableViewContext", () => {
  });
  const removeMovableViewContext = inject("removeMovableViewContext", () => {
  });
  let _scale = ref(1);
  let _oldScale = ref(1);
  let _isScaling = ref(false);
  let _translateX = ref(0);
  let _translateY = ref(0);
  let _SFA = null;
  let _FA = null;
  let _isTouching = false;
  let __baseX;
  let __baseY;
  let _checkCanMove = null;
  let _firstMoveDirection = null;
  const _declineX = new Decline();
  const _declineY = new Decline();
  const __touchInfo = {
    historyX: [0, 0],
    historyY: [0, 0],
    historyT: [0, 0]
  };
  const frictionNumber = computed(() => {
    let val = Number(props2.friction);
    return isNaN(val) || val <= 0 ? 2 : val;
  });
  const _friction = new Friction$1(1, frictionNumber.value);
  watch(() => props2.disabled, () => {
    __handleTouchStart();
  });
  const { _updateOldScale, _endScale, _setScale, scaleValueSync, _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY, FAandSFACancel, _getLimitXY, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewInit(props2, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
  function __handleTouchStart() {
    if (!_isScaling.value) {
      if (!props2.disabled) {
        FAandSFACancel();
        __touchInfo.historyX = [0, 0];
        __touchInfo.historyY = [0, 0];
        __touchInfo.historyT = [0, 0];
        if (xMove.value) {
          __baseX = _translateX.value;
        }
        if (yMove.value) {
          __baseY = _translateY.value;
        }
        rootRef.value.style.willChange = "transform";
        _checkCanMove = null;
        _firstMoveDirection = null;
        _isTouching = true;
      }
    }
  }
  function __handleTouchMove(event) {
    if (!_isScaling.value && !props2.disabled && _isTouching) {
      let x = _translateX.value;
      let y = _translateY.value;
      if (_firstMoveDirection === null) {
        _firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
      }
      if (xMove.value) {
        x = event.detail.dx + __baseX;
        __touchInfo.historyX.shift();
        __touchInfo.historyX.push(x);
        if (!yMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
        }
      }
      if (yMove.value) {
        y = event.detail.dy + __baseY;
        __touchInfo.historyY.shift();
        __touchInfo.historyY.push(y);
        if (!xMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
        }
      }
      __touchInfo.historyT.shift();
      __touchInfo.historyT.push(event.detail.timeStamp);
      if (!_checkCanMove) {
        event.preventDefault();
        let source = "touch";
        if (x < minX.value) {
          if (props2.outOfBounds) {
            source = "touch-out-of-bounds";
            x = minX.value - _declineX.x(minX.value - x);
          } else {
            x = minX.value;
          }
        } else if (x > maxX.value) {
          if (props2.outOfBounds) {
            source = "touch-out-of-bounds";
            x = maxX.value + _declineX.x(x - maxX.value);
          } else {
            x = maxX.value;
          }
        }
        if (y < minY.value) {
          if (props2.outOfBounds) {
            source = "touch-out-of-bounds";
            y = minY.value - _declineY.x(minY.value - y);
          } else {
            y = minY.value;
          }
        } else {
          if (y > maxY.value) {
            if (props2.outOfBounds) {
              source = "touch-out-of-bounds";
              y = maxY.value + _declineY.x(y - maxY.value);
            } else {
              y = maxY.value;
            }
          }
        }
        _requestAnimationFrame(function() {
          _setTransform(x, y, _scale.value, source);
        });
      }
    }
  }
  function __handleTouchEnd() {
    if (!_isScaling.value && !props2.disabled && _isTouching) {
      rootRef.value.style.willChange = "auto";
      _isTouching = false;
      if (!_checkCanMove && !_revise("out-of-bounds") && props2.inertia) {
        const xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
        const yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
        const __translateX = _translateX.value;
        const __translateY = _translateY.value;
        _friction.setV(xv, yv);
        _friction.setS(__translateX, __translateY);
        const x0 = _friction.delta().x;
        const y0 = _friction.delta().y;
        let x = x0 + __translateX;
        let y = y0 + __translateY;
        if (x < minX.value) {
          x = minX.value;
          y = __translateY + (minX.value - __translateX) * y0 / x0;
        } else {
          if (x > maxX.value) {
            x = maxX.value;
            y = __translateY + (maxX.value - __translateX) * y0 / x0;
          }
        }
        if (y < minY.value) {
          y = minY.value;
          x = __translateX + (minY.value - __translateY) * x0 / y0;
        } else {
          if (y > maxY.value) {
            y = maxY.value;
            x = __translateX + (maxY.value - __translateY) * x0 / y0;
          }
        }
        _friction.setEnd(x, y);
        _FA = g(_friction, function() {
          let t2 = _friction.s();
          let x2 = t2.x;
          let y2 = t2.y;
          _setTransform(x2, y2, _scale.value, "friction");
        }, function() {
          _FA.cancel();
        });
      }
    }
    if (!props2.outOfBounds && !props2.inertia) {
      FAandSFACancel();
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
  onMounted(() => {
    useTouchtrack(rootRef.value, (event) => {
      switch (event.detail.state) {
        case "start":
          __handleTouchStart();
          break;
        case "move":
          __handleTouchMove(event);
          break;
        case "end":
          __handleTouchEnd();
      }
    });
    setParent();
    _friction.reconfigure(1, frictionNumber.value);
    _STD.reconfigure(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
    rootRef.value.style.transformOrigin = "center";
    const context = {
      rootRef,
      setParent,
      _endScale,
      _setScale
    };
    addMovableViewContext(context);
    onUnmounted(() => {
      removeMovableViewContext(context);
    });
  });
  onUnmounted(() => {
    FAandSFACancel();
  });
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
const index$o = /* @__PURE__ */ defineBuiltInComponent({
  name: "Navigator",
  inheritAttrs: false,
  compatConfig: { MODE: 3 },
  props: /* @__PURE__ */ extend({}, navigatorProps, { renderLink: {
    type: Boolean,
    default: true
  } }),
  setup(props2, { slots }) {
    const rootRef = ref(null);
    const vm = getCurrentInstance();
    const __scopeId = vm && vm.vnode.scopeId || "";
    const { hovering, binding } = useHover(props2);
    return () => {
      const { hoverClass, url } = props2;
      const hasHoverClass = props2.hoverClass && props2.hoverClass !== "none";
      const innerNode = props2.renderLink ? (openBlock(), createBlock("a", {
        key: 1,
        class: "navigator-wrap",
        href: url
      }, [normalizeVNode(() => slots.default && slots.default())])) : slots.default && slots.default();
      return openBlock(), createBlock("uni-navigator", mergeProps({
        class: hasHoverClass && hovering.value ? hoverClass : "",
        ref: rootRef
      }, hasHoverClass && binding, vm ? vm.attrs : {}, { [__scopeId]: "" }), [normalizeVNode(() => innerNode)], 16);
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
      return isArray(val) && val.filter((val2) => typeof val2 === "number").length === val.length;
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
function useState$1(props2) {
  const value = reactive([...props2.value]);
  const state = reactive({
    value,
    height: 34
  });
  watch(() => props2.value, (val, oldVal) => {
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
    const rootRef = ref(null);
    const wrapperRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const state = useState$1(props2);
    const resizeSensorRef = ref(null);
    const onMountedCallback = () => {
      const resizeSensor = resizeSensorRef.value;
      resizeSensor && (state.height = resizeSensor.$el.offsetHeight);
    };
    {
      onMounted(onMountedCallback);
    }
    let ColumnsPreRef = ref([]);
    let columnsRef = ref([]);
    function getItemIndex(vnode) {
      let columnVNodes = columnsRef.value;
      {
        columnVNodes = columnVNodes.filter((vnode2) => vnode2.type !== Comment);
      }
      let index2 = columnVNodes.indexOf(vnode);
      return index2 !== -1 ? index2 : ColumnsPreRef.value.indexOf(vnode);
    }
    const getPickerViewColumn = function(columnInstance) {
      const ref2 = computed({
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
    provide("getPickerViewColumn", getPickerViewColumn);
    provide("pickerViewProps", props2);
    provide("pickerViewState", state);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        const vnode = flatVNode(defaultSlots);
        ColumnsPreRef.value = vnode;
        nextTick(() => {
          columnsRef.value = vnode;
        });
      }
      return openBlock(), createBlock("uni-picker-view", { ref: rootRef }, [createVNode(ResizeSensor, { ref: resizeSensorRef }, null, 512), createVNode("div", {
        ref: wrapperRef,
        class: "uni-picker-view-wrapper"
      }, [normalizeVNode(() => defaultSlots)], 512)], 512);
    };
  }
});
class Friction {
  constructor(drag) {
    this._drag = drag;
    this._dragLog = Math.log(drag);
    this._x = 0;
    this._v = 0;
    this._startTime = 0;
  }
  set(x, v2) {
    this._x = x;
    this._v = v2;
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
  setVelocityByEnd(e2) {
    this._v = (e2 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
  }
  x(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    const t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
    this._dt = e2;
    return this._x + this._v * t2 / this._dragLog - this._v / this._dragLog;
  }
  dx(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    const t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
    this._dt = e2;
    return this._v * t2;
  }
  done() {
    return Math.abs(this.dx()) < 3;
  }
  reconfigure(e2) {
    const t2 = this.x();
    const n = this.dx();
    this._drag = e2;
    this._dragLog = Math.log(e2);
    this.set(t2, n);
  }
  configuration() {
    const e2 = this;
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
  }
}
function o(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function a(e2, t2) {
  return o(e2, 0, t2);
}
class Spring {
  constructor(m, k, c) {
    this._m = m;
    this._k = k;
    this._c = c;
    this._solution = null;
    this._endPosition = 0;
    this._startTime = 0;
  }
  _solve(e2, t2) {
    const n = this._c;
    const i = this._m;
    const r = this._k;
    const o2 = n * n - 4 * i * r;
    if (o2 === 0) {
      const a3 = -n / (2 * i);
      const s2 = e2;
      const l2 = t2 / (a3 * e2);
      return {
        x: function(e22) {
          return (s2 + l2 * e22) * Math.pow(Math.E, a3 * e22);
        },
        dx: function(e22) {
          const t22 = Math.pow(Math.E, a3 * e22);
          return a3 * (s2 + l2 * e22) * t22 + l2 * t22;
        }
      };
    }
    if (o2 > 0) {
      const c = (-n - Math.sqrt(o2)) / (2 * i);
      const u = (-n + Math.sqrt(o2)) / (2 * i);
      const l2 = (t2 - c * e2) / (u - c);
      const s2 = e2 - l2;
      return {
        x: function(e22) {
          let t22;
          let n2;
          if (e22 === this._t) {
            t22 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e22;
          if (!t22) {
            t22 = this._powER1T = Math.pow(Math.E, c * e22);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e22);
          }
          return s2 * t22 + l2 * n2;
        },
        dx: function(e22) {
          let t22;
          let n2;
          if (e22 === this._t) {
            t22 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e22;
          if (!t22) {
            t22 = this._powER1T = Math.pow(Math.E, c * e22);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e22);
          }
          return s2 * c * t22 + l2 * u * n2;
        }
      };
    }
    const d = Math.sqrt(4 * i * r - n * n) / (2 * i);
    const a2 = -n / 2 * i;
    const s = e2;
    const l = (t2 - a2 * e2) / d;
    return {
      x: function(e22) {
        return Math.pow(Math.E, a2 * e22) * (s * Math.cos(d * e22) + l * Math.sin(d * e22));
      },
      dx: function(e22) {
        const t22 = Math.pow(Math.E, a2 * e22);
        const n2 = Math.cos(d * e22);
        const i2 = Math.sin(d * e22);
        return t22 * (l * d * n2 - s * d * i2) + a2 * t22 * (l * i2 + s * n2);
      }
    };
  }
  x(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._endPosition + this._solution.x(e2) : 0;
  }
  dx(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._solution.dx(e2) : 0;
  }
  setEnd(e2, t2, n) {
    if (!n) {
      n = (/* @__PURE__ */ new Date()).getTime();
    }
    if (e2 !== this._endPosition || !a(t2, 0.4)) {
      t2 = t2 || 0;
      let i = this._endPosition;
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
  }
  snap(e2) {
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
  }
  done(e2) {
    if (!e2) {
      e2 = (/* @__PURE__ */ new Date()).getTime();
    }
    return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
  }
  reconfigure(e2, t2, n) {
    this._m = e2;
    this._k = t2;
    this._c = n;
    if (!this.done()) {
      this._solution = this._solve(this.x() - this._endPosition, this.dx());
      this._startTime = (/* @__PURE__ */ new Date()).getTime();
    }
  }
  springConstant() {
    return this._k;
  }
  damping() {
    return this._c;
  }
  configuration() {
    function e2(e22, t22) {
      e22.reconfigure(1, t22, e22.damping());
    }
    function t2(e22, t22) {
      e22.reconfigure(1, e22.springConstant(), t22);
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
  }
}
class Scroll {
  constructor(extent, friction, spring) {
    this._extent = extent;
    this._friction = friction || new Friction(0.01);
    this._spring = spring || new Spring(1, 90, 20);
    this._startTime = 0;
    this._springing = false;
    this._springOffset = 0;
  }
  snap(e2, t2) {
    this._springOffset = 0;
    this._springing = true;
    this._spring.snap(e2);
    this._spring.setEnd(t2);
  }
  set(e2, t2) {
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
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
  x(e2) {
    if (!this._startTime) {
      return 0;
    }
    if (!e2) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    if (this._springing) {
      return this._spring.x() + this._springOffset;
    }
    let t2 = this._friction.x(e2);
    let n = this.dx(e2);
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
  }
  dx(e2) {
    let t2;
    if (this._lastTime === e2) {
      t2 = this._lastDx;
    } else {
      t2 = this._springing ? this._spring.dx(e2) : this._friction.dx(e2);
    }
    this._lastTime = e2;
    this._lastDx = t2;
    return t2;
  }
  done() {
    return this._springing ? this._spring.done() : this._friction.done();
  }
  setVelocityByEnd(e2) {
    this._friction.setVelocityByEnd(e2);
  }
  configuration() {
    const e2 = this._friction.configuration();
    e2.push.apply(e2, this._spring.configuration());
    return e2;
  }
}
function calculateSnapIndex(position, itemSize) {
  return Math.round(Math.abs(position) / itemSize);
}
function createAnimation(scroll, onScroll, onEnd) {
  const state = {
    id: 0,
    cancelled: false
  };
  function startAnimation2(state2, scroll2, onScroll2, onEnd2) {
    if (!state2 || !state2.cancelled) {
      onScroll2(scroll2);
      const isDone = scroll2.done();
      if (!isDone) {
        if (!state2.cancelled) {
          state2.id = requestAnimationFrame(
            startAnimation2.bind(null, state2, scroll2, onScroll2, onEnd2)
          );
        }
      }
      if (isDone && onEnd2) {
        onEnd2(scroll2);
      }
    }
  }
  function cancel(state2) {
    if (state2 && state2.id) {
      cancelAnimationFrame(state2.id);
    }
    if (state2) {
      state2.cancelled = true;
    }
  }
  startAnimation2(state, scroll, onScroll, onEnd);
  return {
    cancel: cancel.bind(null, state),
    model: scroll
  };
}
class Scroller {
  constructor(element, options) {
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
  onTouchStart() {
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
  }
  onTouchMove(x, y) {
    let startPosition = this._startPosition;
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
  }
  onTouchEnd(x, y, o2) {
    if (this._enableSnap && this._position > -this._extent && this._position < 0) {
      if (this._enableY && (Math.abs(y) < this._itemSize && Math.abs(o2.y) < 300 || Math.abs(o2.y) < 150)) {
        this.snap();
        return;
      }
      if (this._enableX && (Math.abs(x) < this._itemSize && Math.abs(o2.x) < 300 || Math.abs(o2.x) < 150)) {
        this.snap();
        return;
      }
    }
    if (this._enableX) {
      this._scroll.set(this._position, o2.x);
    } else if (this._enableY) {
      this._scroll.set(this._position, o2.y);
    }
    let c;
    if (this._enableSnap) {
      const s = this._scroll._friction.x(100);
      const l = s % this._itemSize;
      c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
      if (c <= 0 && c >= -this._extent) {
        this._scroll.setVelocityByEnd(c);
      }
    }
    this._lastTime = Date.now();
    this._lastDelay = 0;
    this._scrolling = true;
    this._lastChangePos = this._position;
    this._lastIdx = calculateSnapIndex(this._position, this._itemSize);
    this._animation = createAnimation(
      this._scroll,
      () => {
        const e2 = Date.now();
        const i = (e2 - this._scroll._startTime) / 1e3;
        const r = this._scroll.x(i);
        this._position = r;
        this.updatePosition();
        const o22 = this._scroll.dx(i);
        if (this._shouldDispatchScrollEvent && e2 - this._lastTime > this._lastDelay) {
          this.dispatchScroll();
          this._lastDelay = Math.abs(2e3 / o22);
          this._lastTime = e2;
        }
      },
      () => {
        if (this._enableSnap) {
          if (c <= 0 && c >= -this._extent) {
            this._position = c;
            this.updatePosition();
          }
          if (isFunction(this._options.onSnap)) {
            this._options.onSnap(
              calculateSnapIndex(this._position, this._itemSize)
            );
          }
        }
        if (this._shouldDispatchScrollEvent) {
          this.dispatchScroll();
        }
        this._scrolling = false;
      }
    );
  }
  onTransitionEnd() {
    this._element.style.webkitTransition = "";
    this._element.style.transition = "";
    this._element.removeEventListener("transitionend", this._onTransitionEnd);
    if (this._snapping) {
      this._snapping = false;
    }
    this.dispatchScroll();
  }
  snap() {
    const itemSize = this._itemSize;
    const position = this._position % itemSize;
    const i = Math.abs(position) > this._itemSize / 2 ? this._position - (itemSize - Math.abs(position)) : this._position - position;
    if (this._position !== i) {
      this._snapping = true;
      this.scrollTo(-i);
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.round(Math.abs(this._position) / this._itemSize)
        );
      }
    }
  }
  scrollTo(position, time) {
    if (this._animation) {
      this._animation.cancel();
      this._scrolling = false;
    }
    if (typeof position === "number") {
      this._position = -position;
    }
    if (this._position < -this._extent) {
      this._position = -this._extent;
    } else {
      if (this._position > 0) {
        this._position = 0;
      }
    }
    const transition = "transform " + (time || 0.2) + "s ease-out";
    this._element.style.webkitTransition = "-webkit-" + transition;
    this._element.style.transition = transition;
    this.updatePosition();
    this._element.addEventListener("transitionend", this._onTransitionEnd);
  }
  dispatchScroll() {
    if (isFunction(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
      this._lastPos = this._position;
      const event = {
        target: {
          scrollLeft: this._enableX ? -this._position : 0,
          scrollTop: this._enableY ? -this._position : 0,
          scrollHeight: this._scrollHeight || this._element.offsetHeight,
          scrollWidth: this._scrollWidth || this._element.offsetWidth,
          offsetHeight: this._element.parentElement.offsetHeight,
          offsetWidth: this._element.parentElement.offsetWidth
        }
      };
      this._options.onScroll(event);
    }
  }
  update(height, scrollHeight, itemSize) {
    let extent = 0;
    const position = this._position;
    if (this._enableX) {
      extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
      this._scrollWidth = scrollHeight;
    } else {
      extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
      this._scrollHeight = scrollHeight;
    }
    if (typeof height === "number") {
      this._position = -height;
    }
    if (this._position < -extent) {
      this._position = -extent;
    } else {
      if (this._position > 0) {
        this._position = 0;
      }
    }
    this._itemSize = itemSize || this._itemSize;
    this.updatePosition();
    if (position !== this._position) {
      this.dispatchScroll();
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.round(Math.abs(this._position) / this._itemSize)
        );
      }
    }
    this._extent = extent;
    this._scroll._extent = extent;
  }
  updatePosition() {
    let transform = "";
    if (this._enableX) {
      transform = "translateX(" + this._position + "px) translateZ(0)";
    } else {
      if (this._enableY) {
        transform = "translateY(" + this._position + "px) translateZ(0)";
      }
    }
    this._element.style.webkitTransform = transform;
    this._element.style.transform = transform;
  }
  isScrolling() {
    return this._scrolling || this._snapping;
  }
}
function useScroller(element, options) {
  const touchInfo = {
    trackingID: -1,
    maxDy: 0,
    maxDx: 0
  };
  const scroller = new Scroller(element, options);
  function findDelta(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    return touchtrackEvent.detail.state === "move" || touchtrackEvent.detail.state === "end" ? {
      x: touchtrackEvent.detail.dx,
      y: touchtrackEvent.detail.dy
    } : {
      x: mouseEvent.screenX - touchInfo.x,
      y: mouseEvent.screenY - touchInfo.y
    };
  }
  function handleTouchStart(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    if (touchtrackEvent.detail.state === "start") {
      touchInfo.trackingID = "touch";
      touchInfo.x = touchtrackEvent.detail.x;
      touchInfo.y = touchtrackEvent.detail.y;
    } else {
      touchInfo.trackingID = "mouse";
      touchInfo.x = mouseEvent.screenX;
      touchInfo.y = mouseEvent.screenY;
    }
    touchInfo.maxDx = 0;
    touchInfo.maxDy = 0;
    touchInfo.historyX = [0];
    touchInfo.historyY = [0];
    touchInfo.historyTime = [
      touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp
    ];
    touchInfo.listener = scroller;
    if (scroller.onTouchStart) {
      scroller.onTouchStart();
    }
    if (typeof event.cancelable !== "boolean" || event.cancelable)
      event.preventDefault();
  }
  function handleTouchMove(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    if (touchInfo.trackingID !== -1) {
      if (typeof event.cancelable !== "boolean" || event.cancelable)
        event.preventDefault();
      const delta = findDelta(event);
      if (delta) {
        for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(
          touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp
        ); touchInfo.historyTime.length > 10; ) {
          touchInfo.historyTime.shift();
          touchInfo.historyX.shift();
          touchInfo.historyY.shift();
        }
        if (touchInfo.listener && touchInfo.listener.onTouchMove) {
          touchInfo.listener.onTouchMove(delta.x, delta.y);
        }
      }
    }
  }
  function handleTouchEnd(event) {
    if (touchInfo.trackingID !== -1) {
      event.preventDefault();
      const delta = findDelta(event);
      if (delta) {
        const listener = touchInfo.listener;
        touchInfo.trackingID = -1;
        touchInfo.listener = null;
        const length = touchInfo.historyTime.length;
        const o2 = {
          x: 0,
          y: 0
        };
        if (length > 2) {
          for (let i = touchInfo.historyTime.length - 1, time1 = touchInfo.historyTime[i], x = touchInfo.historyX[i], y = touchInfo.historyY[i]; i > 0; ) {
            i--;
            const time0 = touchInfo.historyTime[i];
            const time = time1 - time0;
            if (time > 30 && time < 50) {
              o2.x = (x - touchInfo.historyX[i]) / (time / 1e3);
              o2.y = (y - touchInfo.historyY[i]) / (time / 1e3);
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
  return {
    scroller,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
const _hoisted_1$9 = { class: "uni-picker-view-group" };
function useCustomClick(dom) {
  const MAX_MOVE = 20;
  let x = 0;
  let y = 0;
  dom.addEventListener("touchstart", (event) => {
    const info = event.changedTouches[0];
    x = info.clientX;
    y = info.clientY;
  });
  dom.addEventListener("touchend", (event) => {
    const info = event.changedTouches[0];
    if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
      const options = {
        bubbles: true,
        cancelable: true,
        target: event.target,
        currentTarget: event.currentTarget
      };
      const customClick = new CustomEvent("click", options);
      const props2 = [
        "screenX",
        "screenY",
        "clientX",
        "clientY",
        "pageX",
        "pageY"
      ];
      props2.forEach((key) => {
        customClick[key] = info[key];
      });
      event.target.dispatchEvent(customClick);
    }
  });
}
const PickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerViewColumn",
  setup(props2, { slots, emit: emit2 }) {
    const rootRef = ref(null);
    const contentRef = ref(null);
    const getPickerViewColumn = inject("getPickerViewColumn");
    const instance = getCurrentInstance();
    const currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : ref(0);
    const pickerViewProps2 = inject("pickerViewProps");
    const pickerViewState = inject("pickerViewState");
    const indicatorHeight = ref(34);
    const resizeSensorRef = ref(null);
    const initIndicatorHeight = () => {
      const resizeSensor = resizeSensorRef.value;
      indicatorHeight.value = resizeSensor.$el.getBoundingClientRect().height;
    };
    {
      onMounted(initIndicatorHeight);
    }
    const maskSize = computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
    const { state: scopedAttrsState } = useScopedAttrs();
    let scroller;
    const state = reactive({
      current: currentRef.value,
      length: 0
    });
    let updatesScrollerRequest;
    function updatesScroller() {
      if (scroller && !updatesScrollerRequest) {
        updatesScrollerRequest = true;
        nextTick(() => {
          updatesScrollerRequest = false;
          let current = Math.min(state.current, state.length - 1);
          current = Math.max(current, 0);
          scroller.update(current * indicatorHeight.value, void 0, indicatorHeight.value);
        });
      }
    }
    watch(() => currentRef.value, (current) => {
      if (current !== state.current) {
        state.current = current;
        updatesScroller();
      }
    });
    watch(() => state.current, (current) => currentRef.value = current);
    watch([
      () => indicatorHeight.value,
      () => state.length,
      () => pickerViewState.height
    ], updatesScroller);
    const initScroller = () => {
      const el = rootRef.value;
      const content = contentRef.value;
      const { scroller: scrollerOrigin, handleTouchStart, handleTouchMove, handleTouchEnd } = useScroller(content, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: indicatorHeight.value,
        friction: new Friction(1e-4),
        spring: new Spring(2, 90, 20),
        onSnap: (index2) => {
          if (!isNaN(index2) && index2 !== state.current) {
            state.current = index2;
          }
        }
      });
      scroller = scrollerOrigin;
      useTouchtrack(el, (e2) => {
        switch (e2.detail.state) {
          case "start":
            handleTouchStart(e2);
            break;
          case "move":
            handleTouchMove(e2);
            e2.stopPropagation();
            break;
          case "end":
          case "cancel":
            handleTouchEnd(e2);
        }
      }, true);
      useCustomClick(el);
      updatesScroller();
    };
    {
      onMounted(initScroller);
    }
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        state.length = flatVNode(defaultSlots).length;
      }
      const padding = `${maskSize.value}px 0`;
      return openBlock(), createBlock("uni-picker-view-column", { ref: rootRef }, [createVNode("div", _hoisted_1$9, [
        createVNode("div", mergeProps(scopedAttrsState.attrs, {
          class: ["uni-picker-view-mask", pickerViewProps2.maskClass],
          style: `background-size: 100% ${maskSize.value}px;${pickerViewProps2.maskStyle}`
        }), null, 16),
        createVNode("div", mergeProps(scopedAttrsState.attrs, {
          class: ["uni-picker-view-indicator", pickerViewProps2.indicatorClass],
          style: pickerViewProps2.indicatorStyle
        }), [createVNode(ResizeSensor, { ref: resizeSensorRef }, null, 512)], 16),
        createVNode("div", {
          ref: contentRef,
          class: ["uni-picker-view-content"],
          style: {
            padding,
            "--picker-view-column-indicator-height": `${indicatorHeight.value}px`
          }
        }, [normalizeVNode(() => defaultSlots)], 512)
      ])], 512);
    };
  }
});
const FONT_SIZE = 16;
const PROGRESS_VALUES = {
  activeColor: PRIMARY_COLOR,
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
const index$n = /* @__PURE__ */ defineBuiltInComponent({
  name: "Progress",
  props: progressProps,
  setup(props2) {
    const rootRef = ref(null);
    const state = useProgressState(props2);
    _activeAnimation(state, props2);
    watch(() => state.realPercent, (newValue, oldValue) => {
      state.strokeTimer && clearInterval(state.strokeTimer);
      state.lastPercent = oldValue || 0;
      _activeAnimation(state, props2);
    });
    return () => {
      const { showInfo } = props2;
      const { outerBarStyle, innerBarStyle, currentPercent } = state;
      return openBlock(), createBlock("uni-progress", {
        class: "uni-progress",
        ref: rootRef
      }, [createVNode("div", {
        style: outerBarStyle,
        class: "uni-progress-bar"
      }, [createVNode("div", {
        style: innerBarStyle,
        class: "uni-progress-inner-bar"
      })]), showInfo ? (openBlock(), createBlock(
        "p",
        // {currentPercent}% 的写法会影响 SSR Hydration (tsx插件的问题)
        {
          key: 0,
          class: "uni-progress-info"
        },
        [normalizeVNode(() => currentPercent + "%")]
      )) : normalizeVNode(() => "")], 512);
    };
  }
});
function useProgressState(props2) {
  const currentPercent = ref(0);
  const outerBarStyle = computed(() => `background-color: ${props2.backgroundColor}; height: ${rpx2px(props2.strokeWidth)}px;`);
  const innerBarStyle = computed(() => {
    const backgroundColor = props2.color !== PROGRESS_VALUES.activeColor && props2.activeColor === PROGRESS_VALUES.activeColor ? props2.color : props2.activeColor;
    return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
  });
  const realPercent = computed(() => {
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
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    useProvideRadioGroup(props2, trigger);
    return () => {
      return openBlock(), createBlock("uni-radio-group", { ref: rootRef }, [normalizeVNode(() => slots.default && slots.default())], 512);
    };
  }
});
function useProvideRadioGroup(props2, trigger) {
  const fields2 = [];
  onMounted(() => {
    _resetRadioGroupValue(fields2.length - 1);
  });
  const getFieldsValue = () => {
    var _a;
    return (_a = fields2.find((field) => field.value.radioChecked)) == null ? void 0 : _a.value.value;
  };
  provide(uniRadioGroupKey, {
    addField(field) {
      fields2.push(field);
    },
    removeField(field) {
      fields2.splice(fields2.indexOf(field), 1);
    },
    radioChange($event, field) {
      const index2 = fields2.indexOf(field);
      _resetRadioGroupValue(index2, true);
      trigger("change", $event, { value: getFieldsValue() });
    }
  });
  const uniForm = inject(uniFormKey, false);
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
    onBeforeUnmount(() => {
      uniForm.removeField(formField);
    });
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
    const rootRef = ref(null);
    const radioChecked = ref(props2.checked);
    const radioValue = ref(props2.value);
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
    watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
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
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    return () => {
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      let realCheckValue;
      realCheckValue = radioChecked.value;
      const radioStyle = getRadioStyle(realCheckValue);
      const hoverBorderColor = realCheckValue ? radioStyle == null ? void 0 : radioStyle.borderColor : props2.activeBorderColor;
      const hoverStyle = hoverBorderColor ? { "--HOVER-BD-COLOR": hoverBorderColor } : void 0;
      const iconColor = props2.foreColor || props2.iconColor || "currentColor";
      return openBlock(), createBlock("uni-radio", mergeProps(booleanAttrs, {
        ref: rootRef,
        id: props2.id,
        class: "uni-radio-wrapper",
        style: hoverStyle
      }), [createVNode("div", {
        class: ["uni-radio-input", {
          "uni-radio-input-checked": realCheckValue,
          "uni-radio-input-disabled": props2.disabled
        }],
        style: radioStyle
      }, [realCheckValue ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.disabled ? "currentColor" : iconColor, 18))], 64)) : normalizeVNode(() => "")]), normalizeVNode(() => slots.default && slots.default())], 16);
    };
  }
});
function useRadioInject(radioChecked, radioValue, reset) {
  const field = computed({
    get: () => ({
      radioChecked: Boolean(radioChecked.value),
      value: radioValue.value
    }),
    set: ({ radioChecked: checked }) => {
      radioChecked.value = checked;
    }
  });
  const formField = { reset };
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
      if (hasOwn(CHARS, stage) && CHARS[stage]) {
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
  if (tagName === "img" && name === "src" && isString(value)) {
    return getRealPath(value);
  }
  return value;
}
function normalizeAttrs(tagName, attrs) {
  if (!isPlainObject(attrs))
    return;
  const normalizedAttrs = {};
  Object.keys(attrs).forEach((name) => {
    normalizedAttrs[name] = normalizeValue(tagName, name, attrs[name]);
  });
  return normalizedAttrs;
}
const nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
  if (!nodeList || Array.isArray(nodeList) && !nodeList.length)
    return [];
  return nodeList.map((node) => {
    if (!isPlainObject(node)) {
      return;
    }
    if ((!hasOwn(node, "type") || node.type === "text") && isString(node.text) && node.text !== "")
      return createTextVNode(decodeEntities(node.text || ""));
    if (!hasOwn(node, "type") || node.type === "node") {
      if (!isString(node.name) || !node.name) {
        return;
      }
      const tagName = node.name.toLowerCase();
      const nodeProps = extend(
        { [scopeId]: "" },
        processClickEvent(node, triggerItemClick),
        normalizeAttrs(tagName, node.attrs)
      );
      return h(
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
    const vm = getCurrentInstance();
    const scopeId = vm && vm.vnode.scopeId || "";
    const rootRef = ref(null);
    const _vnode = shallowRef([]);
    const trigger = useCustomEvent(rootRef, emit2);
    function triggerItemClick(e2, detail = {}) {
      trigger("itemclick", e2, detail);
    }
    function renderVNode() {
      let nodeList = props2.nodes;
      if (isString(nodeList)) {
        nodeList = parseHtml(props2.nodes);
      }
      _vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
    }
    watch(() => props2.nodes, renderVNode, {
      immediate: true,
      deep: true
    });
    return () => h("uni-rich-text", {
      ref: rootRef,
      selectable: props2.userSelect || props2.selectable ? true : null
    }, h("div", {}, _vnode.value));
  }
});
const _hoisted_1$8 = { class: "uni-scroll-view-refresh-inner" };
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
    const rootRef = ref(null);
    const rootStyle = computed(() => {
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
    const refreshRotate = computed(() => {
      const route = props2.refresherHeight / props2.refresherThreshold;
      return (route > 1 ? 1 : route) * 360;
    });
    return () => {
      const { refreshState, refresherDefaultStyle, refresherThreshold } = props2;
      return (() => {
        const _cache = createVNodeCache("e32a47e2");
        return openBlock(), createBlock("div", {
          ref: rootRef,
          style: rootStyle.value,
          class: "uni-scroll-view-refresher"
        }, [refresherDefaultStyle !== "none" ? (openBlock(), createBlock("div", {
          key: 0,
          class: "uni-scroll-view-refresh"
        }, [createVNode("div", _hoisted_1$8, [refreshState == "pulling" ? (openBlock(), createBlock("svg", {
          key: "refresh__icon",
          style: { transform: "rotate(" + refreshRotate.value + "deg)" },
          fill: "#2BD009",
          class: "uni-scroll-view-refresh__icon",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, [_cache[0] || (_cache[0] = createVNode("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1)), _cache[1] || (_cache[1] = createVNode("path", {
          d: "M0 0h24v24H0z",
          fill: "none"
        }, null, -1))])) : normalizeVNode(() => null), refreshState == "refreshing" ? (openBlock(), createBlock("svg", {
          key: "refresh__spinner",
          class: "uni-scroll-view-refresh__spinner",
          width: "24",
          height: "24",
          viewBox: "25 25 50 50"
        }, [_cache[2] || (_cache[2] = createVNode("circle", {
          cx: "50",
          cy: "50",
          r: "20",
          fill: "none",
          style: "color: #2bd009",
          "stroke-width": "3"
        }, null, -1))])) : normalizeVNode(() => null)])])) : normalizeVNode(() => null), refresherDefaultStyle === "none" ? (openBlock(), createBlock("div", {
          key: 2,
          class: "uni-scroll-view-refresher-container",
          style: { height: `${refresherThreshold}px` }
        }, [normalizeVNode(() => slots.default && slots.default())])) : normalizeVNode(() => null)], 512);
      })();
    };
  }
});
const passiveOptions = /* @__PURE__ */ passive(true);
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
    const rootRef = ref(null);
    const main = ref(null);
    const wrap = ref(null);
    const content = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props2);
    const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit2);
    const mainStyle = computed(() => {
      let style = "";
      realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
      realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
      return style;
    });
    const scrollBarClassName = computed(() => {
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
      return openBlock(), createBlock("uni-scroll-view", { ref: rootRef }, [createVNode("div", {
        ref: wrap,
        class: "uni-scroll-view"
      }, [createVNode("div", {
        ref: main,
        style: mainStyle.value,
        class: scrollBarClassName.value
      }, [refresherEnabled ? (openBlock(), createBlock(Refresher, {
        key: 0,
        refreshState,
        refresherHeight,
        refresherThreshold,
        refresherDefaultStyle,
        refresherBackground
      }, {
        default: withCtx(() => [refresherDefaultStyle == "none" ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => slots.refresher && slots.refresher())], 64)) : normalizeVNode(() => null)]),
        _: 2
      }, 1024)) : normalizeVNode(() => null), createVNode("div", {
        ref: content,
        class: "uni-scroll-view-content"
      }, [normalizeVNode(() => slots.default && slots.default())], 512)], 512)], 512)], 512);
    };
  }
});
function useScrollViewState(props2) {
  const scrollTopNumber = computed(() => {
    return Number(props2.scrollTop) || 0;
  });
  const scrollLeftNumber = computed(() => {
    return Number(props2.scrollLeft) || 0;
  });
  const state = reactive({
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
  let toUpperNumber = 0;
  let triggerAbort = false;
  let __transitionEnd = () => {
  };
  const realScrollX = computed(() => {
    if (props2.direction === "horizontal" || props2.direction === "all") {
      return true;
    }
    return false;
  });
  const realScrollY = computed(() => {
    if (props2.direction === "vertical" || props2.direction === "all") {
      return true;
    }
    return false;
  });
  const upperThresholdNumber = computed(() => {
    let val = Number(props2.upperThreshold);
    return isNaN(val) ? 50 : val;
  });
  const lowerThresholdNumber = computed(() => {
    let val = Number(props2.lowerThreshold);
    return isNaN(val) ? 50 : val;
  });
  function scrollTo(scrollToValue, direction2) {
    const container = main.value;
    let transformValue = 0;
    let transform = "";
    scrollToValue < 0 ? scrollToValue = 0 : direction2 === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction2 === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
    direction2 === "x" ? transformValue = container.scrollLeft - scrollToValue : direction2 === "y" && (transformValue = container.scrollTop - scrollToValue);
    if (transformValue === 0)
      return;
    let _content = content.value;
    _content.style.transition = "transform .3s ease-out";
    _content.style.webkitTransition = "-webkit-transform .3s ease-out";
    if (direction2 === "x") {
      transform = "translateX(" + transformValue + "px) translateZ(0)";
    } else {
      direction2 === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
    }
    _content.removeEventListener("transitionend", __transitionEnd);
    _content.removeEventListener("webkitTransitionEnd", __transitionEnd);
    __transitionEnd = () => _transitionEnd(scrollToValue, direction2);
    _content.addEventListener("transitionend", __transitionEnd);
    _content.addEventListener("webkitTransitionEnd", __transitionEnd);
    if (direction2 === "x") {
      container.style.overflowX = "hidden";
    } else if (direction2 === "y") {
      container.style.overflowY = "hidden";
    }
    _content.style.transform = transform;
    _content.style.webkitTransform = transform;
  }
  function _handleScroll($event) {
    const target = $event.target;
    trigger("scroll", $event, {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      deltaX: state.lastScrollLeft - target.scrollLeft,
      deltaY: state.lastScrollTop - target.scrollTop
    });
    if (realScrollY.value) {
      if (target.scrollTop <= upperThresholdNumber.value && state.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
        trigger("scrolltoupper", $event, { direction: "top" });
        state.lastScrollToUpperTime = $event.timeStamp;
      }
      if (target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >= target.scrollHeight && state.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
        trigger("scrolltolower", $event, { direction: "bottom" });
        state.lastScrollToLowerTime = $event.timeStamp;
      }
    }
    if (realScrollX.value) {
      if (target.scrollLeft <= upperThresholdNumber.value && state.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
        trigger("scrolltoupper", $event, { direction: "left" });
        state.lastScrollToUpperTime = $event.timeStamp;
      }
      if (target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >= target.scrollWidth && state.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
        trigger("scrolltolower", $event, { direction: "right" });
        state.lastScrollToLowerTime = $event.timeStamp;
      }
    }
    state.lastScrollTop = target.scrollTop;
    state.lastScrollLeft = target.scrollLeft;
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
  function _transitionEnd(val, direction2) {
    content.value.style.transition = "";
    content.value.style.webkitTransition = "";
    content.value.style.transform = "";
    content.value.style.webkitTransform = "";
    let _main = main.value;
    if (direction2 === "x") {
      _main.style.overflowX = realScrollX.value ? "auto" : "hidden";
      _main.scrollLeft = val;
    } else if (direction2 === "y") {
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
        state.refresherHeight = toUpperNumber = 0;
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
  onMounted(() => {
    nextTick(() => {
      _scrollTopChanged(scrollTopNumber.value);
      _scrollLeftChanged(scrollLeftNumber.value);
    });
    _scrollIntoViewChanged(props2.scrollIntoView);
    let __handleScroll = function(event) {
      event.preventDefault();
      event.stopPropagation();
      _handleScroll(event);
    };
    let needStop = null;
    let __handleTouchMove = function(event) {
      if (touchStart === null)
        return;
      let x = event.touches[0].pageX;
      let y = event.touches[0].pageY;
      let _main = main.value;
      if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
        if (realScrollX.value) {
          if (_main.scrollLeft === 0 && x > touchStart.x) {
            needStop = false;
            return;
          } else if (_main.scrollWidth === _main.offsetWidth + _main.scrollLeft && x < touchStart.x) {
            needStop = false;
            return;
          }
          needStop = true;
        } else {
          needStop = false;
        }
      } else {
        if (realScrollY.value) {
          if (_main.scrollTop === 0 && y > touchStart.y) {
            needStop = false;
            if (props2.refresherEnabled && event.cancelable !== false)
              event.preventDefault();
          } else if (_main.scrollHeight === _main.offsetHeight + _main.scrollTop && y < touchStart.y) {
            needStop = false;
            return;
          } else {
            needStop = true;
          }
        } else {
          needStop = false;
        }
      }
      if (needStop) {
        event.stopPropagation();
      }
      if (_main.scrollTop === 0 && event.touches.length === 1) {
        _setRefreshState("pulling");
      }
      if (props2.refresherEnabled && state.refreshState === "pulling") {
        const dy = y - touchStart.y;
        if (toUpperNumber === 0) {
          toUpperNumber = y;
        }
        if (!beforeRefreshing) {
          state.refresherHeight = y - toUpperNumber;
          if (state.refresherHeight > 0) {
            triggerAbort = true;
            trigger("refresherpulling", event, {
              deltaY: dy,
              dy
            });
          }
        } else {
          state.refresherHeight = dy + props2.refresherThreshold;
          triggerAbort = false;
        }
      }
    };
    let __handleTouchStart = function(event) {
      if (event.touches.length === 1) {
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        };
      }
    };
    let __handleTouchEnd = function(event) {
      touchEnd = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
      };
      if (state.refresherHeight >= props2.refresherThreshold) {
        _setRefreshState("refreshing");
      } else {
        _setRefreshState("refresherabort");
      }
      touchStart = {
        x: 0,
        y: 0
      };
      touchEnd = {
        x: 0,
        y: props2.refresherThreshold
      };
    };
    main.value.addEventListener("touchstart", __handleTouchStart, passiveOptions);
    main.value.addEventListener("touchmove", __handleTouchMove, passive(false));
    main.value.addEventListener("scroll", __handleScroll, passive(false));
    main.value.addEventListener("touchend", __handleTouchEnd, passiveOptions);
    onBeforeUnmount(() => {
      main.value.removeEventListener("touchstart", __handleTouchStart);
      main.value.removeEventListener("touchmove", __handleTouchMove);
      main.value.removeEventListener("scroll", __handleScroll);
      main.value.removeEventListener("touchend", __handleTouchEnd);
    });
  });
  onActivated(() => {
    realScrollY.value && (main.value.scrollTop = state.lastScrollTop);
    realScrollX.value && (main.value.scrollLeft = state.lastScrollLeft);
  });
  watch(scrollTopNumber, (val) => {
    _scrollTopChanged(val);
  });
  watch(scrollLeftNumber, (val) => {
    _scrollLeftChanged(val);
  });
  watch(() => props2.scrollIntoView, (val) => {
    _scrollIntoViewChanged(val);
  });
  watch(() => props2.refresherTriggered, (val) => {
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
const _hoisted_1$7 = { class: "uni-slider-wrapper" };
const _hoisted_2$3 = { class: "uni-slider-input" };
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
    const sliderRef = ref(null);
    const sliderValueRef = ref(null);
    let uniSliderElement;
    watch(() => props2.value, (val) => {
      uniSliderElement.value = Number(val);
    });
    const trigger = useCustomEvent(sliderRef, emit2);
    const state = useSliderState(props2);
    useSliderLoader(props2, sliderRef, trigger);
    onMounted(() => {
      uniSliderElement = sliderRef.value;
      uniSliderElement._initialValue = props2.value;
      uniSliderElement.init();
      uniSliderElement.attachVmProps(props2);
    });
    return () => {
      const { setTrackBgColor, setActiveColor, setThumbStyle, thumbTrackStyle, setValueStyle } = state;
      return openBlock(), createBlock("uni-slider", { ref: sliderRef }, [createVNode("div", _hoisted_1$7, [createVNode("div", _hoisted_2$3, [
        createVNode("div", {
          style: setTrackBgColor(),
          class: "uni-slider-track"
        }, [createVNode("div", {
          style: setActiveColor(),
          class: "uni-slider-track-value"
        })]),
        createVNode("div", {
          style: thumbTrackStyle(),
          class: "uni-slider-thumb-track"
        }, [createVNode("div", {
          style: setThumbStyle(),
          class: "uni-slider-thumb-value"
        })]),
        createVNode("input", {
          class: "uni-slider-browser-input-range",
          type: "range",
          min: props2.min,
          max: props2.max,
          step: props2.step,
          value: props2.value
        })
      ]), withDirectives(createVNode("span", {
        ref: sliderValueRef,
        style: setValueStyle(),
        class: "uni-slider-value"
      }, null, 512), [[vShow, props2.showValue]])])], 512);
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
  const uniForm = inject(uniFormKey, false);
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
    onBeforeUnmount(() => {
      uniForm.removeField(field);
    });
  }
  return {
    _onInput,
    _onChange
  };
}
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
  const interval = computed(() => {
    const interval2 = Number(props2.interval);
    return isNaN(interval2) ? 5e3 : interval2;
  });
  const duration = computed(() => {
    const duration2 = Number(props2.duration);
    return isNaN(duration2) ? 500 : duration2;
  });
  const displayMultipleItems = computed(() => {
    const displayMultipleItems2 = Math.round(props2.displayMultipleItems);
    return isNaN(displayMultipleItems2) ? 1 : displayMultipleItems2;
  });
  const state = reactive({
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
  let animationFrame;
  const swiperEnabled = computed(() => swiperContexts.value.length > state.displayMultipleItems);
  const circularEnabled = computed(() => props2.circular && swiperEnabled.value);
  function checkCircularLayout(index2) {
    if (!invalid) {
      for (let items = swiperContexts.value, n = items.length, i = index2 + state.displayMultipleItems, r = 0; r < n; r++) {
        const item = items[r];
        const s = Math.floor(index2 / n) * n + r;
        const l = s + n;
        const c = s - n;
        const u = Math.max(index2 - (s + 1), s - i, 0);
        const d = Math.max(index2 - (l + 1), l - i, 0);
        const h2 = Math.max(index2 - (c + 1), c - i, 0);
        const p2 = Math.min(u, d, h2);
        const position = [
          s,
          l,
          c
        ][[
          u,
          d,
          h2
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
    animationFrame = requestAnimationFrame(animateFrameFuncProto);
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
      animationFrame = requestAnimationFrame(animateFrameFuncProto);
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
  watch([
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
  watch([
    () => props2.vertical,
    () => circularEnabled.value,
    () => state.displayMultipleItems,
    () => [...swiperContexts.value]
  ], resetLayout);
  watch(() => state.interval, () => {
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
  watch(() => state.current, (val, oldVal) => {
    currentChanged(val, oldVal);
    emit2("update:current", val);
  });
  watch(() => state.currentItemId, (val) => {
    emit2("update:currentItemId", val);
  });
  function inintAutoplay(enable) {
    if (enable) {
      scheduleAutoplay();
    } else {
      cancelSchedule();
    }
  }
  watch(() => props2.autoplay && !state.userTracking, inintAutoplay);
  inintAutoplay(props2.autoplay && !state.userTracking);
  onMounted(() => {
    let userDirectionChecked = false;
    let contentTrackSpeed = 0;
    let contentTrackT = 0;
    function handleTrackStart() {
      cancelSchedule();
      contentTrackViewport = viewportPosition;
      contentTrackSpeed = 0;
      contentTrackT = Date.now();
      cancelViewportAnimation();
    }
    function handleTrackMove(data) {
      const oldContentTrackT = contentTrackT;
      contentTrackT = Date.now();
      const length = swiperContexts.value.length;
      const other = length - state.displayMultipleItems;
      function calc2(val) {
        return 0.5 - 0.25 / (val + 0.5);
      }
      function move(oldVal, newVal) {
        let val = contentTrackViewport + oldVal;
        contentTrackSpeed = 0.6 * contentTrackSpeed + 0.4 * newVal;
        if (!circularEnabled.value) {
          if (val < 0 || val > other) {
            if (val < 0) {
              val = -calc2(-val);
            } else {
              if (val > other) {
                val = other + calc2(val - other);
              }
            }
            contentTrackSpeed = 0;
          }
        }
        updateViewport(val);
      }
      const time = contentTrackT - oldContentTrackT || 1;
      const slideFrameEl = slideFrameRef.value;
      if (props2.vertical) {
        move(-data.dy / slideFrameEl.offsetHeight, -data.ddy / time);
      } else {
        move(-data.dx / slideFrameEl.offsetWidth, -data.ddx / time);
      }
    }
    function handleTrackEnd(isCancel) {
      state.userTracking = false;
      const t2 = contentTrackSpeed / Math.abs(contentTrackSpeed);
      let n = 0;
      if (!isCancel && Math.abs(contentTrackSpeed) > 0.2) {
        n = 0.5 * t2;
      }
      const current = normalizeCurrentValue(viewportPosition + n);
      if (isCancel) {
        animateViewport(state.current, "", 0);
      } else {
        currentChangeSource = "touch";
        state.current = current;
        animateViewport(current, "touch", n !== 0 ? n : current === 0 && circularEnabled.value && viewportPosition >= 1 ? 1 : 0);
      }
    }
    useTouchtrack(slideFrameRef.value, (event) => {
      if (props2.disableTouch) {
        return;
      }
      if (!invalid) {
        if (event.detail.state === "start") {
          state.userTracking = true;
          userDirectionChecked = false;
          return handleTrackStart();
        }
        if (event.detail.state === "end") {
          return handleTrackEnd(false);
        }
        if (event.detail.state === "cancel") {
          return handleTrackEnd(true);
        }
        if (state.userTracking) {
          if (!userDirectionChecked) {
            userDirectionChecked = true;
            const t2 = Math.abs(event.detail.dx);
            const n = Math.abs(event.detail.dy);
            if (t2 >= n && props2.vertical) {
              state.userTracking = false;
            } else {
              if (t2 <= n && !props2.vertical) {
                state.userTracking = false;
              }
            }
            if (!state.userTracking) {
              if (props2.autoplay) {
                scheduleAutoplay();
              }
              return;
            }
          }
          handleTrackMove(event.detail);
          return false;
        }
      }
    }, true);
  });
  onUnmounted(() => {
    cancelSchedule();
    cancelAnimationFrame(animationFrame);
  });
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
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const slidesWrapperRef = ref(null);
    const slideFrameRef = ref(null);
    const state = useState(props2);
    const slidesStyle = computed(() => {
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
    const slideFrameStyle = computed(() => {
      const value = Math.abs(100 / state.displayMultipleItems) + "%";
      return {
        width: props2.vertical ? "100%" : value,
        height: !props2.vertical ? "100%" : value
      };
    });
    let swiperItems = [];
    const originSwiperContexts = [];
    const swiperContexts = ref([]);
    function updateSwiperContexts() {
      const contexts = [];
      for (let index2 = 0; index2 < swiperItems.length; index2++) {
        let swiperItem = swiperItems[index2];
        if (!(swiperItem instanceof Element)) {
          swiperItem = swiperItem.el;
        }
        const swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
        if (swiperContext) {
          contexts.push(markRaw(swiperContext));
        }
      }
      swiperContexts.value = contexts;
    }
    const addSwiperContext = function(swiperContext) {
      originSwiperContexts.push(swiperContext);
      updateSwiperContexts();
    };
    provide("addSwiperContext", addSwiperContext);
    const removeSwiperContext = function(swiperContext) {
      const index2 = originSwiperContexts.indexOf(swiperContext);
      if (index2 >= 0) {
        originSwiperContexts.splice(index2, 1);
        updateSwiperContexts();
      }
    };
    provide("removeSwiperContext", removeSwiperContext);
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
      return openBlock(), createBlock("uni-swiper", { ref: rootRef }, [createVNode("div", {
        ref: slidesWrapperRef,
        class: "uni-swiper-wrapper"
      }, [
        createVNode("div", {
          class: "uni-swiper-slides",
          style: slidesStyle.value
        }, [createVNode("div", {
          ref: slideFrameRef,
          class: "uni-swiper-slide-frame",
          style: slideFrameStyle.value
        }, [normalizeVNode(() => defaultSlots)], 512)]),
        normalizeVNode(() => props2.indicatorDots && (openBlock(), createBlock("div", { class: ["uni-swiper-dots", props2.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"] }, [normalizeVNode(() => swiperContexts.value.map((_, index2, array) => (openBlock(), createBlock("div", {
          class: {
            "uni-swiper-dot": true,
            "uni-swiper-dot-active": index2 < state.current + state.displayMultipleItems && index2 >= state.current || index2 < state.current + state.displayMultipleItems - array.length
          },
          style: { background: index2 === state.current ? props2.indicatorActiveColor : props2.indicatorColor }
        }))))]))),
        normalizeVNode(() => createNavigationTsx())
      ], 512)], 512);
    };
  }
});
const useSwiperNavigation = (rootRef, props2, state, onSwiperDotClick, swiperContext, circularEnabled, swiperEnabled) => {
  let isNavigationAuto = false;
  let prevDisabled = false;
  let nextDisabled = false;
  let hideNavigation = ref(false);
  watchEffect(() => {
    isNavigationAuto = props2.navigation === "auto";
    hideNavigation.value = props2.navigation !== true || isNavigationAuto;
    swiperAddMouseEvent();
  });
  watchEffect(() => {
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
  onMounted(swiperAddMouseEvent);
  function createNavigationTsx() {
    const navigationClass = {
      "uni-swiper-navigation-hide": hideNavigation.value,
      "uni-swiper-navigation-vertical": props2.vertical
    };
    if (props2.navigation) {
      return openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("div", mergeProps({ class: ["uni-swiper-navigation uni-swiper-navigation-prev", extend({ "uni-swiper-navigation-disabled": prevDisabled }, navigationClass)] }, navigationAttr), [normalizeVNode(() => createNavigationSVG())], 16), createVNode("div", mergeProps({ class: ["uni-swiper-navigation uni-swiper-navigation-next", extend({ "uni-swiper-navigation-disabled": nextDisabled }, navigationClass)] }, navigationAttr), [normalizeVNode(() => createNavigationSVG())], 16)], 64);
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
    const rootRef = ref(null);
    const context = {
      rootRef,
      getItemId() {
        return props2.itemId;
      },
      getBoundingClientRect() {
        const el = rootRef.value;
        return el.getBoundingClientRect();
      },
      updatePosition(position, vertical) {
        const x = vertical ? "0" : 100 * position + "%";
        const y = vertical ? 100 * position + "%" : "0";
        const rootEl = rootRef.value;
        const value = `translate(${x},${y}) translateZ(0)`;
        if (rootEl) {
          rootEl.style.webkitTransform = value;
          rootEl.style.transform = value;
        }
      }
    };
    onMounted(() => {
      const addSwiperContext = inject("addSwiperContext");
      if (addSwiperContext) {
        addSwiperContext(context);
      }
    });
    onUnmounted(() => {
      const removeSwiperContext = inject("removeSwiperContext");
      if (removeSwiperContext) {
        removeSwiperContext(context);
      }
    });
    return () => {
      return openBlock(), createBlock("uni-swiper-item", {
        ref: rootRef,
        style: {
          position: "absolute",
          width: "100%",
          height: "100%"
        }
      }, [normalizeVNode(() => slots.default && slots.default())], 512);
    };
  }
});
const _hoisted_1$6 = { class: "uni-switch-wrapper" };
const _hoisted_2$2 = { class: "uni-checkbox-input" };
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
    const rootRef = ref(null);
    const switchChecked = ref(props2.checked);
    const uniLabel = useSwitchInject(rootRef, props2, switchChecked);
    const trigger = useCustomEvent(rootRef, emit2);
    watch(() => props2.checked, (val) => {
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
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    let checkedCache = ref(switchChecked.value);
    watch(() => switchChecked.value, (val) => {
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
      return openBlock(), createBlock("uni-switch", mergeProps({
        id: props2.id,
        ref: rootRef
      }, booleanAttrs), [createVNode("div", _hoisted_1$6, [withDirectives(createVNode("div", {
        class: ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
        style: switchInputStyle
      }, [createVNode("div", {
        class: ["uni-switch-thumb", [switchChecked.value ? "uni-switch-thumb-checked" : ""]],
        style: thumbStyle
      })], 512), [[vShow, type === "switch"]]), withDirectives(createVNode("div", _hoisted_2$2, [realCheckValue ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.foreColor || props2.color || "currentColor", 22))], 64)) : normalizeVNode(() => "")], 512), [[vShow, type === "checkbox"]])])], 16);
    };
  }
});
function useSwitchInject(rootRef, props2, switchChecked) {
  const initialCheckedValue = props2.checked;
  const uniForm = inject(uniFormKey, false);
  const uniLabel = inject(uniLabelKey, false);
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
    onUnmounted(() => {
      uniForm.removeField(formField);
    });
  }
  return uniLabel;
}
const props$b = /* @__PURE__ */ extend({}, props$l, {
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
const ConfirmTypes = [
  "done",
  "go",
  "next",
  "search",
  "send"
];
function setFixMargin() {
  fixMargin = false;
}
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
    const rootRef = ref(null);
    const wrapperRef = ref(null);
    const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props2, rootRef, emit2);
    const valueCompute = computed(() => state.value.split(LINEFEED));
    computed(() => ConfirmTypes.includes(props2.confirmType));
    const heightRef = ref(0);
    const lineRef = ref(null);
    watch(() => heightRef.value, (height) => {
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
    watch(() => props2.autoHeight, (autoHeight) => {
      const wrapper = wrapperRef.value;
      if (autoHeight) {
        wrapper.style.height = heightRef.value + "px";
      } else {
        wrapper.style.height = "";
      }
    });
    {
      onMounted(setFixMargin);
    }
    expose({ $triggerInput: (detail) => {
      emit2("update:modelValue", detail.value);
      emit2("update:value", detail.value);
      state.value = detail.value;
    } });
    return () => {
      let textareaNode = props2.disabled && fixDisabledColor ? (openBlock(), createBlock("textarea", {
        key: "disabled-textarea",
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
          overflowY: props2.autoHeight ? "hidden" : "auto",
          /* eslint-disable no-restricted-syntax */
          ...props2.cursorColor && { caretColor: props2.cursorColor }
        }
      }, null, 512)) : (openBlock(), createBlock("textarea", {
        key: "textarea",
        ref: fieldRef,
        value: state.value,
        disabled: !!props2.disabled,
        maxlength: state.maxlength,
        enterkeyhint: props2.confirmType,
        inputmode: props2.inputmode,
        class: {
          "uni-textarea-textarea": true,
          "uni-textarea-textarea-fix-margin": fixMargin
        },
        style: {
          overflowY: props2.autoHeight ? "hidden" : "auto",
          /* eslint-disable no-restricted-syntax */
          ...props2.cursorColor && { caretColor: props2.cursorColor }
        }
      }, null, 512));
      return openBlock(), createBlock("uni-textarea", {
        ref: rootRef,
        "auto-height": props2.autoHeight
      }, [createVNode("div", {
        ref: wrapperRef,
        class: "uni-textarea-wrapper"
      }, [
        withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
          style: props2.placeholderStyle,
          class: ["uni-textarea-placeholder", props2.placeholderClass]
        }), [normalizeVNode(() => props2.placeholder)], 16), [[vShow, !state.value.length]]),
        createVNode("div", {
          ref: lineRef,
          class: "uni-textarea-line"
        }, " ", 512),
        createVNode("div", { class: {
          "uni-textarea-compute": true,
          "uni-textarea-compute-auto-height": props2.autoHeight
        } }, [normalizeVNode(() => valueCompute.value.map((item) => (openBlock(), createBlock("div", null, [item.trim() ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => item)], 64)) : normalizeVNode(() => ".")])))), createVNode(ResizeSensor, { initial: true })]),
        props2.confirmType === "search" ? (openBlock(), createBlock("form", {
          key: 0,
          action: "",
          class: "uni-input-form"
        }, [normalizeVNode(() => textareaNode)])) : (openBlock(), createBlock(Fragment, { key: 1 }, [normalizeVNode(() => textareaNode)], 64))
      ], 512)], 512);
    };
  }
});
function ssrRegisterHelper(comp, filename) {
  if (typeof comp === "function") {
    comp.__setup = () => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(filename);
    };
  } else {
    const setup = comp.setup;
    comp.setup = (props2, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(filename);
      if (setup) {
        return setup(props2, ctx);
      }
    };
  }
}
const _hoisted_1$5 = { class: "uni-list-view-content" };
const __moduleId = "packages/uni-components/src/vue/list-view/index.tsx";
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
    const rootRef = ref(null);
    const containerRef = ref(null);
    const visibleRef = ref(null);
    const { isVertical, state } = useListViewState(props2);
    provide("__listViewIsVertical", isVertical);
    provide("__listViewDefaultItemSize", state.defaultItemSize);
    provide("__listViewDefaultHeaderSize", state.defaultHeaderSize);
    const rearrangeDebounce = debounce(() => {
      nextTick(() => {
        _rearrange();
      });
    }, 5, {
      clearTimeout,
      setTimeout
    });
    const childStatus = [];
    provide("__listViewRegisterItem", (status) => {
      childStatus.push(status);
      rearrangeDebounce();
    });
    provide("__listViewUnregisterItem", (status) => {
      const index2 = childStatus.indexOf(status);
      childStatus.splice(index2, 1);
      rearrangeDebounce();
    });
    watch(() => {
      return state.defaultHeaderSize;
    }, (value) => {
      rearrangeDebounce();
    });
    watch(() => {
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
    function getOffset() {
      return isVertical.value ? containerRef.value.scrollTop : containerRef.value.scrollLeft;
    }
    function resetContainerSize() {
      const containerEl = containerRef.value;
      state.containerSize = isVertical.value ? containerEl.clientHeight : containerEl.clientWidth;
      rearrangeDebounce();
    }
    watch(isVertical, () => {
      resetContainerSize();
    });
    const upperThresholdNumber = computed(() => {
      const val = Number(props2.upperThreshold);
      return isNaN(val) ? 50 : val;
    });
    const lowerThresholdNumber = computed(() => {
      const val = Number(props2.lowerThreshold);
      return isNaN(val) ? 50 : val;
    });
    const scrollTopNumber = computed(() => {
      return Number(props2.scrollTop) || 0;
    });
    const scrollLeftNumber = computed(() => {
      return Number(props2.scrollLeft) || 0;
    });
    watch(scrollTopNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollTop = val;
      }
    });
    watch(scrollLeftNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollLeft = val;
      }
    });
    watch(() => props2.scrollIntoView, (val) => {
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
    let lastScrollLeft = 0;
    let lastScrollTop = 0;
    onActivated(() => {
      if (containerRef.value) {
        containerRef.value.scrollLeft = lastScrollLeft;
        containerRef.value.scrollTop = lastScrollTop;
        resetContainerSize();
      }
    });
    onMounted(() => {
      resetContainerSize();
      let lastScrollOffset = 0;
      containerRef.value.addEventListener("scroll", function($event) {
        const target = $event.target;
        if (isHTMlElement(target)) {
          lastScrollLeft = target.scrollLeft;
          lastScrollTop = target.scrollTop;
        }
        trigger("scroll", $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: isVertical.value ? 0 : lastScrollOffset - target.scrollLeft,
          deltaY: isVertical.value ? lastScrollOffset - target.scrollTop : 0
        });
        const currentOffset = getOffset();
        const upperOffset = upperThresholdNumber.value;
        if (currentOffset <= upperOffset && lastScrollOffset > upperOffset) {
          trigger("scrolltoupper", $event, { direction: isVertical.value ? "top" : "left" });
        }
        const realTotalSize = isVertical.value ? target.scrollHeight : target.scrollWidth;
        const realRootSize = isVertical.value ? target.clientHeight : target.clientWidth;
        const lowerOffset = realTotalSize - realRootSize - lowerThresholdNumber.value;
        if (currentOffset >= lowerOffset && lastScrollOffset < lowerOffset) {
          trigger("scrolltolower", $event, { direction: isVertical.value ? "bottom" : "right" });
        }
        lastScrollOffset = currentOffset;
        if (_shouldRearrange()) {
          _rearrange();
        }
      });
    });
    function _rearrange() {
      rearrange(visibleVNode, containerRef, isVertical, state);
    }
    function _shouldRearrange() {
      return shouldRearrange(containerRef, isVertical, state);
    }
    const containerStyle = computed(() => {
      return `${props2.direction === "none" ? "overflow: hidden;" : props2.direction === "all" ? "overflow: auto;" : isVertical.value ? "overflow: hidden auto;" : "overflow: auto hidden;"}scroll-behavior: ${props2.scrollWithAnimation ? "smooth" : "auto"};`;
    });
    const visibleStyle = computed(() => {
      return `${isVertical.value ? "width" : "height"}: 100%;`;
    });
    const placeholderHeadStyle = computed(() => {
      return `${isVertical.value ? "height" : "width"}: ${state.headPlaceholderSize}px;`;
    });
    const placeholderTailStyle = computed(() => {
      return `${isVertical.value ? "height" : "width"}: ${state.tailPlaceholderSize}px;`;
    });
    let visibleVNode = null;
    return () => {
      const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props2;
      const { refresherHeight, refreshState } = state;
      const defaultSlot = slots.default && slots.default();
      visibleVNode = ((visibleVNode2) => {
        return openBlock(), createBlock("div", {
          ref: visibleRef,
          class: "uni-list-view-visible",
          style: visibleStyle.value
        }, [normalizeVNode(() => defaultSlot)], 512);
      })();
      return openBlock(), createBlock("uni-list-view", {
        ref: rootRef,
        class: "uni-list-view"
      }, [createVNode("div", {
        ref: containerRef,
        class: `uni-list-view-container ${props2.showScrollbar === false ? "uni-list-view-scrollbar-hidden" : ""}`,
        style: containerStyle.value
      }, [refresherEnabled ? (openBlock(), createBlock(Refresher, {
        key: 0,
        refreshState,
        refresherHeight,
        refresherThreshold,
        refresherDefaultStyle,
        refresherBackground
      }, {
        default: withCtx(() => [refresherDefaultStyle == "none" ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => slots.refresher && slots.refresher())], 64)) : normalizeVNode(() => null)]),
        _: 2
      }, 1024)) : normalizeVNode(() => null), createVNode("div", _hoisted_1$5, [
        createVNode("div", { style: placeholderHeadStyle.value }),
        normalizeVNode(() => visibleVNode),
        createVNode("div", { style: placeholderTailStyle.value })
      ])], 512), createVNode(ResizeSensor, { initial: true })], 512);
    };
  }
});
function useListViewState(props2) {
  const isVertical = computed(() => {
    return props2.direction !== "horizontal";
  });
  const state = reactive({
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
function shouldRearrange(containerRef, isVertical, state) {
  const offset = isVertical.value ? containerRef.value.scrollTop : containerRef.value.scrollLeft;
  const loadScreenThresholdSize = state.containerSize * state.loadScreenThreshold;
  const rearrangeOffsetMin = state.lastRenderOffsetMin + loadScreenThresholdSize;
  const rearrangeOffsetMax = state.lastRenderOffsetMax - loadScreenThresholdSize;
  return offset < rearrangeOffsetMin || offset > rearrangeOffsetMax;
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
  let toUpperNumber = 0;
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
        state.refresherHeight = toUpperNumber = 0;
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
  watch(() => props2.refresherTriggered, (val) => {
    if (val === true) {
      _setRefreshState("refreshing");
    } else if (val === false) {
      _setRefreshState("restore");
    }
  });
  function __handleTouchStart(event) {
    if (event.touches.length === 1) {
      touchStart = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      };
    }
  }
  function __handleTouchMove(event) {
    const containerEl = containerRef.value;
    if (touchStart === null)
      return;
    let x = event.touches[0].pageX;
    let y = event.touches[0].pageY;
    if (!isVertical.value) {
      return;
    }
    let needStop = false;
    if (Math.abs(touchStart.y - y) < Math.abs(touchStart.x - x)) {
      needStop = false;
    } else if (containerEl.scrollTop === 0 && y > touchStart.y) {
      needStop = false;
      if (props2.refresherEnabled && event.cancelable !== false)
        event.preventDefault();
    } else if (containerEl.scrollHeight === containerEl.offsetHeight + containerEl.scrollTop && y < touchStart.y) {
      needStop = false;
      return;
    } else {
      needStop = true;
    }
    if (needStop) {
      event.stopPropagation();
    }
    if (!props2.refresherEnabled) {
      return;
    }
    if (containerEl.scrollTop === 0 && event.touches.length === 1) {
      _setRefreshState("pulling");
    }
    if (props2.refresherEnabled && state.refreshState === "pulling") {
      const dy = y - touchStart.y;
      if (toUpperNumber === 0) {
        toUpperNumber = y;
      }
      if (!beforeRefreshing) {
        state.refresherHeight = y - toUpperNumber;
        if (state.refresherHeight > 0) {
          triggerAbort = true;
          trigger("refresherpulling", event, {
            deltaY: dy,
            dy
          });
        }
      } else {
        state.refresherHeight = dy + props2.refresherThreshold;
        triggerAbort = false;
      }
    }
  }
  function __handleTouchEnd(event) {
    touchEnd = {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
    if (state.refresherHeight >= props2.refresherThreshold) {
      _setRefreshState("refreshing");
    } else {
      _setRefreshState("refresherabort");
    }
    touchStart = {
      x: 0,
      y: 0
    };
    touchEnd = {
      x: 0,
      y: props2.refresherThreshold
    };
  }
  onMounted(() => {
    const containerEl = containerRef.value;
    containerEl.addEventListener("touchstart", __handleTouchStart);
    containerEl.addEventListener("touchmove", __handleTouchMove, { passive: false });
    containerEl.addEventListener("touchend", __handleTouchEnd);
  });
  onBeforeUnmount(() => {
    const containerEl = containerRef.value;
    containerEl.removeEventListener("touchstart", __handleTouchStart);
    containerEl.removeEventListener("touchmove", __handleTouchMove);
    containerEl.removeEventListener("touchend", __handleTouchEnd);
  });
}
ssrRegisterHelper(isHTMlElement, __moduleId);
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
  setup(props2, { slots, expose, attrs }) {
    if (attrs.slot === "refresher") {
      return () => {
        return openBlock(), createBlock("uni-list-item", null, [normalizeVNode(() => slots.default && slots.default())]);
      };
    }
    const rootRef = ref(null);
    const isVertical = inject("__listViewIsVertical");
    const visible = ref(false);
    const status = {
      type: "ListItem",
      visible,
      cachedSize: inject("__listViewDefaultItemSize"),
      cachedSizeUpdated: false
    };
    expose({ __listViewChildStatus: status });
    const registerItem = inject("__listViewRegisterItem");
    const unregisterItem = inject("__listViewUnregisterItem");
    onMounted(() => {
      registerItem(status);
    });
    onBeforeUnmount(() => {
      unregisterItem(status);
    });
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
    watch(visible, (value) => {
      nextTick(() => {
        updateSize();
      });
    });
    return () => {
      if (!visible.value) {
        return null;
      }
      return openBlock(), createBlock("uni-list-item", { ref: rootRef }, [normalizeVNode(() => slots.default && slots.default())], 512);
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
    const rootRef = ref(null);
    const isVertical = inject("__listViewIsVertical");
    const headPlaceholderSize = ref(0);
    const tailPlaceholderSize = ref(0);
    const style = computed(() => {
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
    const headSize = computed(() => {
      return isVertical ? props2.padding[0] : props2.padding[3];
    });
    const tailSize = computed(() => {
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
      return openBlock(), createBlock("uni-sticky-section", {
        ref: rootRef,
        style: style.value
      }, [normalizeVNode(() => {
        var _a;
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      })], 512);
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
    const rootRef = ref(null);
    const isVertical = inject("__listViewIsVertical");
    const style = computed(() => {
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
      cachedSize: inject("__listViewDefaultHeaderSize"),
      cachedSizeUpdated: false
    };
    expose({ __listViewChildStatus: status });
    onMounted(() => {
      const rootEl = rootRef.value;
      const rect = rootEl.getBoundingClientRect();
      status.cachedSize = isVertical ? rect.height : rect.width;
      status.cachedSizeUpdated = true;
    });
    return () => {
      return openBlock(), createBlock("uni-sticky-header", {
        ref: rootRef,
        style: style.value
      }, [normalizeVNode(() => {
        var _a;
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      })], 512);
    };
  }
});
const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = getCurrentInstance()) => {
  if (isInSSRComponentSetup)
    return;
  injectHook(lifecycle, hook, target);
};
const onBackPress = /* @__PURE__ */ createLifeCycleHook(
  ON_BACK_PRESS,
  2
  /* HookFlags.PAGE */
);
class UniPageContainerElement extends UniElement {
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "page-container",
    rootElement: {
      name: "uni-page-container",
      class: UniPageContainerElement
    }
  },
  __name: "index",
  __ssrInlineRender: true,
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
  __vapor: true,
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emits = __emit;
    const showPageContainer = ref(false);
    const isAnimating = ref(false);
    const transitionTimer = ref(null);
    const isEntered = ref(false);
    let isDragging = false;
    const translateValue = ref(0);
    const overlayStyleMap = computed(() => {
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
    const innerStyleMap = computed(() => {
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
    const popupClasses = computed(() => {
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
      nextTick(() => {
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
      nextTick(() => {
        isEntered.value = false;
        emits("leave");
        listenTransitionEnd("leave");
      });
    }
    watch(
      () => props2.show,
      (newVal) => {
        if (newVal && !showPageContainer.value) {
          openContainer();
        } else if (!newVal && showPageContainer.value) {
          closeContainer();
        }
      }
    );
    onBackPress(() => {
      if (showPageContainer.value) {
        closeContainer();
        return true;
      }
      return false;
    });
    onMounted(() => {
      if (props2.show) {
        openContainer();
      }
    });
    onBeforeUnmount(() => {
      clearTransitionTimer();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.overlay && showPageContainer.value) {
        _push(`<div uni-view class="uni-page-container-overlay" style="${ssrRenderStyle([overlayStyleMap.value, __props.overlayStyle])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPageContainer.value) {
        _push(`<div uni-view class="${ssrRenderClass([popupClasses.value, "uni-page-container-popup"])}" style="${ssrRenderStyle([innerStyleMap.value, __props.customStyle])}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../uni-components/src/vue/page-container/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
class UniVueElement extends Object {
}
class UniLoadingElement extends UniVueElement {
}
function useLoadingStyle(targetElement, bold) {
  const loadingSize = ref("16px");
  const loadingBorderWidth = ref("1px");
  const loadingBorderRadius = ref("8px");
  let observer = null;
  const calculateLoadingWidth = (element, bold2) => {
    const { width, height } = element.getBoundingClientRect();
    const coefficient = bold2 ? 2 : 1;
    const minSide = Math.min(width, height);
    const calculatedWidth = minSide / 16 * coefficient;
    loadingSize.value = `${minSide}px`;
    loadingBorderWidth.value = `${calculatedWidth}px`;
    loadingBorderRadius.value = `${minSide / 2}px`;
  };
  const setupObserver = (cb) => {
    const el = targetElement.value;
    if (!el)
      return;
    observer = new ResizeObserver((entries2) => {
      cb(el);
    });
    observer.observe(el);
  };
  onMounted(() => {
    setupObserver((el) => {
      calculateLoadingWidth(el, bold.value);
    });
    watchEffect(() => {
      const _bold = bold.value;
      const el = targetElement.value;
      if (el !== null) {
        calculateLoadingWidth(el, _bold);
      }
    });
  });
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
  return {
    width: loadingSize,
    height: loadingSize,
    borderWidth: loadingBorderWidth
    // borderRadius: loadingBorderRadius,
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent$1({
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
  __ssrInlineRender: true,
  props: {
    paused: { type: Boolean, default: false },
    bold: { type: Boolean, default: false },
    iosSpinner: { type: Boolean, default: false }
  },
  __vapor: true,
  setup(__props) {
    const props2 = __props;
    const LoadingRef = ref(null);
    const loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props2.bold)));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<uni-loading-element${ssrRenderAttrs(mergeProps({
        class: "default __uni_loading_container__",
        ref_key: "LoadingRef",
        ref: LoadingRef,
        style: { "display": "flex" }
      }, _attrs), "uni-loading-element")}><div uni-view class="${ssrRenderClass([{ "__uni-loading__paused": props2.paused }, "__uni-loading__ __loading-4-3__"])}" style="${ssrRenderStyle(loadingStyle)}"></div></uni-loading-element>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../uni-components/src/vue/loading/index-x.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
function normalizeEvent(vm, id2) {
  if (!id2) {
    id2 = vm.id;
  }
  if (!id2) {
    return;
  }
  return vm.$options.name.toLowerCase() + "." + id2;
}
function addSubscribe(name, callback, pageId) {
  if (!name) {
    return;
  }
  registerViewMethod(
    pageId || getCurrentPageId(),
    name,
    ({ type, data }, resolve) => {
      callback(type, data, resolve);
    }
  );
}
function removeSubscribe(name, pageId) {
  if (!name) {
    return;
  }
  unregisterViewMethod(pageId || getCurrentPageId(), name);
}
function useSubscribe(callback, name, multiple, pageId) {
  const instance = getCurrentInstance();
  const vm = instance.proxy;
  pageId = pageId == null ? useCurrentPageId() : pageId;
  onMounted(() => {
    addSubscribe(name || normalizeEvent(vm), callback, pageId);
    {
      watch(
        () => vm.id,
        (value, oldValue) => {
          addSubscribe(normalizeEvent(vm, value), callback, pageId);
          removeSubscribe(oldValue && normalizeEvent(vm, oldValue));
        }
      );
    }
  });
  onBeforeUnmount(() => {
    removeSubscribe(name || normalizeEvent(vm), pageId);
  });
}
function useOn(name, callback) {
  onMounted(() => UniViewJSBridge.on(name, callback));
  onBeforeUnmount(() => UniViewJSBridge.off(name));
}
let index$c = 0;
function useContextInfo(_id) {
  const page = useCurrentPageId();
  const instance = getCurrentInstance();
  const vm = instance.proxy;
  const type = vm.$options.name.toLowerCase();
  const id2 = vm.id || `context${index$c++}`;
  onMounted(() => {
    const el = vm.$el;
    el.__uniContextInfo = {
      id: id2,
      type,
      page
    };
  });
  return `${type}.${id2}`;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
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
        query = isUTS ? new UTSJSONObject(decodedQuery(query)) : decodedQuery(query);
      }
      if (false)
        ;
      invokeHook(publicThis, ON_LOAD, query);
      if (!instance.vapor) {
        delete instance.attrs.__pageQuery;
      }
      const $basePage = true ? publicThis.$basePage : publicThis.$page;
      if (true) {
        if (($basePage == null ? void 0 : $basePage.openType) !== "preloadPage") {
          if (isDialogPageInstance(getPageInstanceByChild(instance))) {
            invokeNewDialogPageHook(publicThis.$page, ON_SHOW);
          } else {
            invokeHook(publicThis, ON_SHOW);
          }
        }
      }
    } catch (e2) {
      console.error(e2.message + LINEFEED + e2.stack);
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
    if (appInstance[ON_ERROR]) {
      {
        invokeHook(appInstance.proxy, ON_ERROR, err);
      }
    } else {
      logError(err, info, instance == null ? void 0 : instance.$, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
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
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
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
    invokeCreateVueAppHook(app);
  }
}
function initRouter(app) {
  const router2 = createRouter(createRouterOptions());
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
    return createMemoryHistory(routerBase);
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
const _hoisted_1$4 = { class: "uni-video-icon uni-video-toast-icon" };
const _hoisted_2$1 = { class: "uni-video-cover" };
const _hoisted_3$1 = { class: "uni-video-bar uni-video-bar-full" };
const _hoisted_4$1 = { class: "uni-video-controls" };
const _hoisted_5 = { class: "uni-video-current-time" };
const _hoisted_6 = { class: "uni-video-duration" };
const _hoisted_7 = { class: "uni-video-loading" };
const _hoisted_8 = { class: "uni-video-toast-title" };
const _hoisted_9 = { class: "uni-video-toast-title-current-time" };
const _hoisted_10 = { class: "uni-video-slots" };
function formatTime(val) {
  val = val > 0 && val < Infinity ? val : 0;
  const h2 = Math.floor(val / 3600);
  const m = Math.floor(val % 3600 / 60);
  const s = Math.floor(val % 3600 % 60);
  const hStr = (h2 < 10 ? "0" : "") + h2;
  const mStr = (m < 10 ? "0" : "") + m;
  const sStr = (s < 10 ? "0" : "") + s;
  let str = mStr + ":" + sStr;
  if (hStr !== "00") {
    str = hStr + ":" + str;
  }
  return str;
}
function useGesture(props2, videoState, videoRef, fullscreenState) {
  const state = reactive({
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
  const state = reactive({ fullscreen: false });
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
function useVideo(props2, attrs, trigger) {
  const videoRef = ref(null);
  const src = computed(() => getRealPath(props2.src));
  const muted = computed(() => props2.muted === "true" || props2.muted === true);
  const state = reactive({
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
  watch(() => src.value, () => {
    state.playing = false;
    state.currentTime = 0;
  });
  watch(() => state.buffered, (buffered) => {
    trigger("progress", {}, { buffered });
  });
  watch(() => muted.value, (muted2) => {
    const video = videoRef.value;
    video.muted = muted2;
  });
  watch([() => state.duration, () => props2.duration], () => {
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
  const progressRef = ref(null);
  const ballRef = ref(null);
  const centerPlayBtnShow = computed(() => props2.showCenterPlayBtn && !videoState.start);
  const controlsVisible = ref(true);
  const controlsShow = computed(() => !centerPlayBtnShow.value && props2.controls && controlsVisible.value);
  const state = reactive({
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
  onMounted(() => {
    const passiveOptions2 = passive(false);
    let originX;
    let originY;
    let moveOnce = true;
    let originProgress;
    const ball = ballRef.value;
    function touchmove(event) {
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
      seeking == null ? void 0 : seeking(videoState.currentDuration * progress / 100);
      state.seeking = true;
      event.preventDefault();
      event.stopPropagation();
    }
    function touchend(event) {
      state.controlsTouching = false;
      if (state.touching) {
        ball.removeEventListener("touchmove", touchmove, passiveOptions2);
        if (!moveOnce) {
          event.preventDefault();
          event.stopPropagation();
          seek(videoState.currentDuration * videoState.progress / 100);
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
      ball.addEventListener("touchmove", touchmove, passiveOptions2);
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
  const state = reactive({ enable: Boolean(props2.enableDanmu) });
  let danmuIndex = {
    time: 0,
    index: -1
  };
  const danmuList = isArray(props2.danmuList) ? JSON.parse(JSON.stringify(props2.danmuList)) : [];
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
  const methods = {
    play,
    stop,
    pause,
    seek,
    sendDanmu,
    playbackRate,
    requestFullScreen,
    exitFullScreen
  };
  const id2 = useContextInfo();
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
  }, id2);
}
function useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart) {
  const progressing = computed(() => gestureState.gestureType === "progress" || controlsState.touching);
  watch(progressing, (val) => {
    videoState.pauseUpdatingCurrentTime = val;
    controlsState.controlsTouching = val;
    if (gestureState.gestureType === "progress" && val) {
      controlsState.controlsVisible = val;
    }
  });
  watch([() => videoState.currentTime, () => videoState.currentDuration], () => {
    if (videoState.currentDuration > 0) {
      videoState.progress = videoState.currentTime / videoState.currentDuration * 100;
    } else {
      videoState.progress = 0;
    }
    videoState.progress > 100 && (videoState.progress = 100);
  }, { immediate: true });
  watch(() => gestureState.currentTimeNew, (currentTimeNew) => {
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
  setup(props2, { emit: emit2, attrs, slots }) {
    const rootRef = ref(null);
    const containerRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit2);
    const { state: userActionState } = useUserAction();
    const { $attrs: videoAttrs } = useAttrs({ excludeListeners: true });
    initI18nVideoMsgsOnce();
    const { videoRef, state: videoState, play, pause, stop, seek, playbackRate, toggle, onDurationChange, onLoadedMetadata, onProgress, onWaiting, onVideoError, onPlay, onPause, onEnded, onTimeUpdate } = useVideo(props2, attrs, trigger);
    const { state: danmuState, danmuRef, updateDanmu, toggleDanmu, sendDanmu } = useDanmu(props2, videoState);
    const { state: fullscreenState, onFullscreenChange, emitFullscreenChange, toggleFullscreen, requestFullScreen, exitFullScreen } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef);
    const { state: gestureState, onTouchstart, onTouchend, onTouchmove } = useGesture(props2, videoState, videoRef, fullscreenState);
    const { state: controlsState, progressRef, ballRef, clickProgress, toggleControls, autoHideEnd, autoHideStart } = useControls(props2, videoState, seek, (currentTimeNew) => {
      gestureState.currentTimeNew = currentTimeNew;
    });
    useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen);
    const progressing = useProgressing(videoState, gestureState, controlsState);
    return () => {
      return (() => {
        const _cache = createVNodeCache("0be45101");
        return openBlock(), createBlock("uni-video", {
          ref: rootRef,
          id: props2.id
        }, [createVNode("div", {
          ref: containerRef,
          class: "uni-video-container"
        }, [
          createVNode("video", mergeProps({
            ref: videoRef,
            style: { "object-fit": props2.objectFit },
            muted: !!props2.muted,
            loop: !!props2.loop,
            src: videoState.src,
            poster: props2.poster,
            autoplay: !!props2.autoplay
          }, videoAttrs.value, {
            class: {
              "uni-video-video": true,
              "uni-video-video-fullscreen": fullscreenState.fullscreen
            },
            "webkit-playsinline": true,
            playsinline: true
          }), null, 16),
          withDirectives(createVNode("div", _hoisted_3$1, [
            createVNode("div", _hoisted_4$1, [
              withDirectives(createVNode("div", { class: {
                "uni-video-icon": true,
                "uni-video-control-button": true,
                "uni-video-control-button-play": !videoState.playing,
                "uni-video-control-button-pause": videoState.playing
              } }, null, 512), [[vShow, props2.showPlayBtn]]),
              withDirectives(createVNode("div", _hoisted_5, [normalizeVNode(() => formatTime(videoState.currentTime))], 512), [[vShow, props2.showProgress]]),
              withDirectives(createVNode("div", {
                ref: progressRef,
                class: "uni-video-progress-container"
              }, [createVNode("div", { class: {
                "uni-video-progress": true,
                "uni-video-progress-progressing": progressing.value
              } }, [
                createVNode("div", {
                  style: {
                    width: videoState.buffered - videoState.progress + "%",
                    left: videoState.progress + "%"
                  },
                  class: "uni-video-progress-buffered"
                }),
                createVNode("div", {
                  style: { width: videoState.progress + "%" },
                  class: "uni-video-progress-played"
                }),
                createVNode("div", {
                  ref: ballRef,
                  style: { left: videoState.progress + "%" },
                  class: {
                    "uni-video-ball": true,
                    "uni-video-ball-progressing": progressing.value
                  }
                }, [_cache[0] || (_cache[0] = createVNode("div", { class: "uni-video-inner" }, null, -1))], 512)
              ])], 512), [[vShow, props2.showProgress]]),
              withDirectives(createVNode("div", _hoisted_6, [normalizeVNode(() => formatTime(videoState.currentDuration))], 512), [[vShow, props2.showProgress]])
            ]),
            withDirectives(createVNode("div", { class: {
              "uni-video-icon": true,
              "uni-video-danmu-button": true,
              "uni-video-danmu-button-active": danmuState.enable
            } }, null, 512), [[vShow, props2.danmuBtn]]),
            withDirectives(createVNode("div", { class: {
              "uni-video-icon": true,
              "uni-video-fullscreen": true,
              "uni-video-type-fullscreen": fullscreenState.fullscreen
            } }, null, 512), [[vShow, props2.showFullscreenBtn]])
          ], 512), [[vShow, controlsState.controlsShow]]),
          withDirectives(createVNode("div", {
            ref: danmuRef,
            style: "z-index: 0;",
            class: "uni-video-danmu"
          }, null, 512), [[vShow, videoState.start && danmuState.enable]]),
          normalizeVNode(() => controlsState.centerPlayBtnShow && (() => {
            const _cache2 = createVNodeCache("b572dc15");
            return openBlock(), createBlock("div", _hoisted_2$1, [_cache2[0] || (_cache2[0] = createVNode("div", { class: "uni-video-cover-play-button uni-video-icon" }, null, -1))]);
          })()),
          createVNode("div", _hoisted_7, [gestureState.gestureType === "volume" ? (openBlock(), createBlock("div", {
            key: 0,
            class: {
              "uni-video-toast-container": true,
              "uni-video-toast-container-thin": gestureState.toastThin
            },
            style: { marginTop: `5px` }
          }, [!gestureState.toastThin && gestureState.volumeNew > 0 && gestureState.gestureType === "volume" ? (openBlock(), createBlock("text", {
            key: 0,
            class: "uni-video-icon uni-video-toast-icon"
          }, "")) : (openBlock(), createBlock(Fragment, { key: 1 }, [normalizeVNode(() => !gestureState.toastThin && (openBlock(), createBlock("text", _hoisted_1$4, "")))], 64)), createVNode("div", {
            class: "uni-video-toast-draw",
            style: { width: `${gestureState.volumeNew * 100}%` }
          })])) : normalizeVNode(() => null)]),
          createVNode("div", { class: {
            "uni-video-toast": true,
            "uni-video-toast-progress": progressing.value
          } }, [createVNode("div", _hoisted_8, [
            createVNode("span", _hoisted_9, [normalizeVNode(() => formatTime(gestureState.currentTimeNew))]),
            _cache[1] || (_cache[1] = normalizeVNode(" / ", -1)),
            normalizeVNode(() => formatTime(videoState.currentDuration))
          ])]),
          createVNode("div", _hoisted_10, [normalizeVNode(() => slots.default && slots.default())])
        ], 512)], 512);
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
const Invoke = /* @__PURE__ */ once(() => UniServiceJSBridge.on(ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
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
    const rootRef = ref(null);
    const iframeRef = ref(null);
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
    const trigger = useCustomEvent(rootRef, emit2);
    const renderIframe = () => {
      const iframe = document.createElement("iframe");
      iframe.onload = function(event) {
        trigger("load", event, {
          src: props2.src,
          url: props2.src
        });
      };
      watchEffect(() => {
        for (const key in $attrs.value) {
          if (hasOwn($attrs.value, key)) {
            const attr2 = $attrs.value[key];
            iframe[key] = attr2;
          }
        }
      });
      watchEffect(() => {
        iframe.src = getRealPath(props2.src);
      });
      iframeRef.value = iframe;
    };
    onMounted(renderIframe);
    onMounted(() => {
      var _a;
      (_a = rootRef.value) == null ? void 0 : _a.appendChild(iframeRef.value);
    });
    return () => {
      return openBlock(), createBlock("uni-web-view", mergeProps({ class: "uni-webview" }, $listeners.value, $excludeAttrs.value, { ref: rootRef }), null, 16);
    };
  }
});
function createCallout(maps2) {
  function onAdd() {
    const div = this.div;
    const panes = this.getPanes();
    panes.floatPane.appendChild(div);
  }
  function onRemove() {
    const parentNode = this.div.parentNode;
    if (parentNode) {
      parentNode.removeChild(this.div);
    }
  }
  function createAMapText() {
    const option = this.option;
    this.Text = new maps2.Text({
      text: option.content,
      anchor: "bottom-center",
      // 设置文本标记锚点
      offset: new maps2.Pixel(0, option.offsetY - 16),
      style: {
        padding: (option.padding || 8) + "px",
        "line-height": (option.fontSize || 14) + "px",
        "border-radius": (option.borderRadius || 0) + "px",
        "border-color": `${option.bgColor || "#fff"} transparent transparent`,
        "background-color": option.bgColor || "#fff",
        "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
        "text-align": "center",
        "font-size": (option.fontSize || 14) + "px",
        color: option.color || "#000"
      },
      position: option.position
    });
    const event = maps2.event || maps2.Event;
    event.addListener(this.Text, "click", () => {
      this.callback();
    });
    this.Text.setMap(option.map);
  }
  function createBMapText() {
  }
  function removeAMapText() {
    if (this.Text) {
      this.option.map.remove(this.Text);
    }
  }
  function removeBMapText() {
    if (this.Text) {
      this.option.map.remove(this.Text);
    }
  }
  class Callout {
    constructor(option = {}, callback) {
      this.createAMapText = createAMapText;
      this.removeAMapText = removeAMapText;
      this.createBMapText = createBMapText;
      this.removeBMapText = removeBMapText;
      this.onAdd = onAdd;
      this.construct = onAdd;
      this.onRemove = onRemove;
      this.destroy = onRemove;
      this.option = option || {};
      const visible = this.visible = this.alwaysVisible = option.display === "ALWAYS";
      if (getIsAMap()) {
        this.callback = callback;
        if (this.visible) {
          this.createAMapText();
        }
      } else if (getIsBMap()) {
        if (this.visible) {
          this.createBMapText();
        }
      } else {
        const map = option.map;
        this.position = option.position;
        this.index = 1;
        const div = this.div = document.createElement("div");
        const divStyle = div.style;
        divStyle.position = "absolute";
        divStyle.whiteSpace = "nowrap";
        divStyle.transform = "translateX(-50%) translateY(-100%)";
        divStyle.zIndex = "1";
        divStyle.boxShadow = option.boxShadow || "none";
        divStyle.display = visible ? "block" : "none";
        const triangle = this.triangle = document.createElement("div");
        triangle.setAttribute(
          "style",
          "position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;"
        );
        this.setStyle(option);
        div.appendChild(triangle);
        if (map) {
          this.setMap(map);
        }
      }
    }
    set onclick(callback) {
      this.div.onclick = callback;
    }
    get onclick() {
      return this.div.onclick;
    }
    setOption(option) {
      this.option = option;
      if (option.display === "ALWAYS") {
        this.alwaysVisible = this.visible = true;
      } else {
        this.alwaysVisible = false;
      }
      if (getIsAMap()) {
        if (this.visible) {
          this.createAMapText();
        }
      } else if (getIsBMap()) {
        if (this.visible) {
          this.createBMapText();
        }
      } else {
        this.setPosition(option.position);
        this.setStyle(option);
      }
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
      const pixel = overlayProjection.fromLatLngToDivPixel(
        this.position
      );
      const divStyle = this.div.style;
      divStyle.left = pixel.x + "px";
      divStyle.top = pixel.y + "px";
    }
    changed() {
      const divStyle = this.div.style;
      divStyle.display = this.visible ? "block" : "none";
    }
  }
  if (!getIsAMap() && !getIsBMap()) {
    const overlay = new (maps2.OverlayView || maps2.Overlay)();
    Callout.prototype.setMap = overlay.setMap;
    Callout.prototype.getMap = overlay.getMap;
    Callout.prototype.getPanes = overlay.getPanes;
    Callout.prototype.getProjection = overlay.getProjection;
    Callout.prototype.map_changed = overlay.map_changed;
    Callout.prototype.set = overlay.set;
    Callout.prototype.get = overlay.get;
    Callout.prototype.setOptions = overlay.setValues;
    Callout.prototype.bindTo = overlay.bindTo;
    Callout.prototype.bindsTo = overlay.bindsTo;
    Callout.prototype.notify = overlay.notify;
    Callout.prototype.setValues = overlay.setValues;
    Callout.prototype.unbind = overlay.unbind;
    Callout.prototype.unbindAll = overlay.unbindAll;
    Callout.prototype.addListener = overlay.addListener;
  }
  return Callout;
}
let maps;
const callbacksMap = {};
const GOOGLE_MAP_CALLBACKNAME = "__map_callback__";
function loadMaps(libraries, callback) {
  const mapInfo = getMapInfo();
  if (!mapInfo.key) {
    console.error("Map key not configured.");
    return;
  }
  const callbacks = callbacksMap[mapInfo.type] = callbacksMap[mapInfo.type] || [];
  if (maps) {
    callback(maps);
  } else if (window[mapInfo.type] && window[mapInfo.type].maps) {
    maps = getIsAMap() || getIsBMap() ? window[mapInfo.type] : window[mapInfo.type].maps;
    maps.Callout = maps.Callout || createCallout(maps);
    callback(maps);
  } else if (callbacks.length) {
    callbacks.push(callback);
  } else {
    callbacks.push(callback);
    const globalExt = window;
    const callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo.type;
    globalExt[callbackName] = function() {
      delete globalExt[callbackName];
      maps = getIsAMap() || getIsBMap() ? window[mapInfo.type] : window[mapInfo.type].maps;
      maps.Callout = createCallout(maps);
      callbacks.forEach((callback2) => callback2(maps));
      callbacks.length = 0;
    };
    if (getIsAMap()) {
      handleAMapSecurityPolicy(mapInfo);
    }
    const script = document.createElement("script");
    let src = getScriptBaseUrl(mapInfo.type);
    if (mapInfo.type === MapType.QQ) {
      libraries.push("geometry");
    }
    if (libraries.length) {
      src += `libraries=${libraries.join("%2C")}&`;
    }
    if (mapInfo.type === MapType.BMAP) {
      script.src = `${src}ak=${mapInfo.key}&callback=${callbackName}`;
    } else {
      script.src = `${src}key=${mapInfo.key}&callback=${callbackName}`;
    }
    script.onerror = function() {
      console.error("Map load failed.");
    };
    document.body.appendChild(script);
  }
}
const getScriptBaseUrl = (mapType) => {
  const urlMap = {
    qq: "https://map.qq.com/api/js?v=2.exp&",
    google: "https://maps.googleapis.com/maps/api/js?",
    AMap: "https://webapi.amap.com/maps?v=2.0&",
    BMapGL: "https://api.map.baidu.com/api?type=webgl&v=1.0&"
  };
  return urlMap[mapType];
};
function handleAMapSecurityPolicy(mapInfo) {
  window._AMapSecurityConfig = {
    securityJsCode: mapInfo.securityJsCode || "",
    serviceHost: mapInfo.serviceHost || ""
  };
}
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
  onUnmounted(() => {
    styleEl.remove();
  });
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
    const onMapReady = inject("onMapReady");
    const updateMarkerLabelStyle = useMarkerLabelStyle(id2);
    let marker;
    function removeMarker() {
      if (marker) {
        if (marker.label && "setMap" in marker.label) {
          marker.label.setMap(null);
        }
        if (marker.callout) {
          removeMarkerCallout(marker.callout);
        }
        marker.setMap(null);
      }
    }
    function removeMarkerCallout(callout) {
      if (getIsAMap()) {
        callout.removeAMapText();
      } else {
        callout.setMap(null);
      }
    }
    onMapReady((map, maps2, trigger) => {
      function updateMarker(option) {
        const title = option.title;
        let position;
        if (getIsAMap()) {
          position = new maps2.LngLat(option.longitude, option.latitude);
        } else if (getIsBMap()) {
          position = new maps2.Point(option.longitude, option.latitude);
        } else {
          position = new maps2.LatLng(option.latitude, option.longitude);
        }
        const img = new Image();
        let imgHeight = 0;
        img.onload = () => {
          const anchor = option.anchor || {};
          let icon;
          let w;
          let h2;
          let top;
          let x = typeof anchor.x === "number" ? anchor.x : 0.5;
          let y = typeof anchor.y === "number" ? anchor.y : 1;
          if (option.iconPath && (option.width || option.height)) {
            w = option.width || img.width / img.height * option.height;
            h2 = option.height || img.height / img.width * option.width;
          } else {
            w = img.width / 2;
            h2 = img.height / 2;
          }
          imgHeight = h2;
          top = h2 - (h2 - y * h2);
          if ("MarkerImage" in maps2) {
            icon = new maps2.MarkerImage(img.src, null, null, new maps2.Point(x * w, y * h2), new maps2.Size(w, h2));
          } else if ("Icon" in maps2) {
            icon = new maps2.Icon({
              image: img.src,
              size: new maps2.Size(w, h2),
              imageSize: new maps2.Size(w, h2),
              imageOffset: new maps2.Pixel(x * w, y * h2)
            });
          } else {
            icon = {
              url: img.src,
              anchor: new maps2.Point(x, y),
              size: new maps2.Size(w, h2)
            };
          }
          if (getIsBMap()) {
            marker = new maps2.Marker(new maps2.Point(position.lng, position.lat));
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
            if ("Label" in maps2) {
              label = new maps2.Label({
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
                callout = marker.callout = new maps2.Callout(calloutStyle, callback);
              } else {
                callout = marker.callout = new maps2.Callout(calloutStyle);
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
          marker = new maps2.Marker({
            map,
            flat: true,
            autoRotation: false
          });
        }
        updateMarker(props3);
        const MapsEvent = maps2.event || maps2.Event;
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
            let rotation = 0;
            if ("getRotation" in marker) {
              rotation = marker.getRotation();
            }
            const a2 = marker.getPosition();
            const b = new maps2.LatLng(destination.latitude, destination.longitude);
            const distance = maps2.geometry.spherical.computeDistanceBetween(a2, b) / 1e3;
            const time = (typeof duration === "number" ? duration : 1e3) / (1e3 * 60 * 60);
            const speed = distance / time;
            const MapsEvent = maps2.event || maps2.Event;
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
              if (isFunction(cb)) {
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
      onUnmounted(() => removeMapChidlContext(context));
    }
    onUnmounted(removeMarker);
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
          let pointPosition;
          if (getIsAMap()) {
            pointPosition = [point.longitude, point.latitude];
          } else if (getIsBMap()) {
            pointPosition = new maps2.Point(point.longitude, point.latitude);
          } else {
            pointPosition = new maps2.LatLng(point.latitude, point.longitude);
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
        if ("Color" in maps2) {
          polylineOptions.strokeColor = new maps2.Color(sr, sg, sb, sa);
          polylineBorderOptions.strokeColor = new maps2.Color(br, bg, bb, ba);
        } else {
          polylineOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
          polylineOptions.strokeOpacity = sa;
          polylineBorderOptions.strokeColor = `rgb(${br}, ${bg}, ${bb})`;
          polylineBorderOptions.strokeOpacity = ba;
        }
        if (borderWidth) {
          polylineBorder = new maps2.Polyline(polylineBorderOptions);
        }
        if (getIsBMap()) {
          polyline = new maps2.Polyline(polylineOptions.path, polylineOptions);
          map.addOverlay(polyline);
        } else {
          polyline = new maps2.Polyline(polylineOptions);
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
        const center = getIsAMap() || getIsBMap() ? [option.longitude, option.latitude] : new maps2.LatLng(option.latitude, option.longitude);
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
          if ("Color" in maps2) {
            circleOptions.fillColor = new maps2.Color(fr, fg, fb, fa);
            circleOptions.strokeColor = new maps2.Color(sr, sg, sb, sa);
          } else {
            circleOptions.fillColor = `rgb(${fr}, ${fg}, ${fb})`;
            circleOptions.fillOpacity = fa;
            circleOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
            circleOptions.strokeOpacity = sa;
          }
        }
        if (getIsBMap()) {
          let pt = new maps2.Point(
            // @ts-expect-error
            circleOptions.center[0],
            // @ts-expect-error
            circleOptions.center[1]
          );
          circle = new maps2.Circle(pt, circleOptions.radius, circleOptions);
          map.addOverlay(circle);
        } else {
          circle = new maps2.Circle(circleOptions);
          if (getIsAMap()) {
            map.add(circle);
          }
        }
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
const _hoisted_1$3 = { class: "uni-map-control" };
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
    const imgPath = computed(() => getRealPath(props2.iconPath));
    const positionStyle = computed(() => {
      let positionStyle2 = `top:${props2.position.top || 0}px;left:${props2.position.left || 0}px;`;
      if (props2.position.width) {
        positionStyle2 += `width:${props2.position.width}px;`;
      }
      if (props2.position.height) {
        positionStyle2 += `height:${props2.position.height}px;`;
      }
      return positionStyle2;
    });
    return () => {
      return openBlock(), createBlock("div", _hoisted_1$3, [createVNode("img", {
        src: imgPath.value,
        style: positionStyle.value,
        class: "uni-map-control-icon"
      })]);
    };
  }
});
const CONTEXT_ID = "MAP_LOCATION";
const MapLocation = /* @__PURE__ */ defineSystemComponent({
  name: "MapLocation",
  setup() {
    const state = reactive({
      latitude: 0,
      longitude: 0,
      rotate: 0
    });
    return () => {
      return state.latitude ? (openBlock(), createBlock(MapMarker, mergeProps({
        key: 1,
        anchor: {
          x: 0.5,
          y: 0.5
        },
        width: "44",
        height: "44",
        iconPath: ICON_PATH_ORIGIN
      }, state), null, 16)) : null;
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
    const onMapReady = inject("onMapReady");
    onMapReady((map, maps2, trigger) => {
      function drawPolygon() {
        const { points, strokeWidth, strokeColor, dashArray, fillColor, zIndex } = props2;
        const path = points.map((item) => {
          const { latitude, longitude } = item;
          if (getIsAMap()) {
            return [longitude, latitude];
          } else if (getIsBMap()) {
            return new maps2.Point(longitude, latitude);
          } else {
            return new maps2.LatLng(latitude, longitude);
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
        if (maps2.Color) {
          polygonOptions.fillColor = new maps2.Color(fcR, fcG, fcB, fcA);
          polygonOptions.strokeColor = new maps2.Color(scR, scG, scB, scA);
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
          polygonIns = new maps2.Polygon(polygonOptions.path, polygonOptions);
          map.addOverlay(polygonIns);
        } else {
          polygonIns = new maps2.Polygon(polygonOptions);
        }
      }
      drawPolygon();
      watch(props2, drawPolygon);
    });
    onUnmounted(() => {
      polygonIns.setMap(null);
    });
    return () => null;
  }
});
const _hoisted_1$2 = { style: "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;" };
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
  if (isArray(points)) {
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
function getAMapPosition(maps2, latitude, longitude) {
  return new maps2.LngLat(longitude, latitude);
}
function getBMapPosition(maps2, latitude, longitude) {
  return new maps2.Point(longitude, latitude);
}
function getGoogleOrQQMapPosition(maps2, latitude, longitude) {
  return new maps2.LatLng(latitude, longitude);
}
function getMapPosition(maps2, latitude, longitude) {
  if (getIsBMap()) {
    return getBMapPosition(maps2, latitude, longitude);
  } else if (getIsAMap()) {
    return getAMapPosition(maps2, latitude, longitude);
  } else {
    return getGoogleOrQQMapPosition(maps2, latitude, longitude);
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
  function onMapReady(callback) {
    if (isMapReady) {
      callback(map, maps2, trigger);
    } else {
      onMapReadyCallbacks.push(callback);
    }
  }
  function emitMapReady() {
    isMapReady = true;
    onMapReadyCallbacks.forEach((callback) => callback(map, maps2, trigger));
    onMapReadyCallbacks.length = 0;
  }
  let isBoundsReady;
  const onBoundsReadyCallbacks = [];
  function onBoundsReady(callback) {
    if (isBoundsReady) {
      callback();
    } else {
      onMapReadyCallbacks.push(callback);
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
        const centerPosition = getMapPosition(maps2, state.latitude, state.longitude);
        map.setCenter(centerPosition);
      }
    }
  });
  watch(() => props2.includePoints, (points) => {
    state.includePoints = getPoints(points);
    if (isBoundsReady) {
      updateBounds();
    }
  }, { deep: true });
  function emitBoundsReady() {
    isBoundsReady = true;
    onBoundsReadyCallbacks.forEach((callback) => callback());
    onBoundsReadyCallbacks.length = 0;
  }
  function getMapInfo2() {
    const center = map.getCenter();
    return {
      scale: map.getZoom(),
      centerLocation: {
        latitude: getLat(center),
        longitude: getLng(center)
      }
    };
  }
  function updateCenter() {
    const centerPosition = getMapPosition(maps2, state.latitude, state.longitude);
    map.setCenter(centerPosition);
  }
  function updateBounds() {
    if (getIsAMap()) {
      const points = [];
      state.includePoints.forEach((point) => {
        points.push([point.longitude, point.latitude]);
      });
      const bounds = new maps2.Bounds(...points);
      map.setBounds(bounds);
    } else if (getIsBMap())
      ;
    else {
      const bounds = new maps2.LatLngBounds();
      state.includePoints.forEach(({ latitude, longitude }) => {
        const latLng = new maps2.LatLng(latitude, longitude);
        bounds.extend(latLng);
      });
      map.fitBounds(bounds);
    }
  }
  function initMap() {
    const mapEl = mapRef.value;
    const center = getMapPosition(maps2, state.latitude, state.longitude);
    const event = maps2.event || maps2.Event;
    const map2 = new maps2.Map(mapEl, {
      center,
      zoom: Number(props2.scale),
      // scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      panControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      keyboardShortcuts: false,
      minZoom: 5,
      maxZoom: 18,
      draggable: true
    });
    if (getIsBMap()) {
      map2.centerAndZoom(center, Number(props2.scale));
      map2.enableScrollWheelZoom();
      map2._printLog && map2._printLog("uniapp");
    }
    watch(() => props2.scale, (scale) => {
      map2.setZoom(Number(scale) || 16);
    });
    onBoundsReady(() => {
      if (state.includePoints.length) {
        updateBounds();
        updateCenter();
      }
    });
    if (getIsBMap()) {
      map2.addEventListener("click", () => {
        trigger("tap", {}, {});
        trigger("click", {}, {});
      });
      map2.addEventListener("dragstart", () => {
        trigger("regionchange", {}, {
          type: "begin",
          causedBy: "gesture"
        });
      });
      map2.addEventListener("dragend", () => {
        trigger("regionchange", {}, extend({
          type: "end",
          causedBy: "drag"
        }, getMapInfo2()));
      });
    } else {
      const boundsChangedEvent = event.addListener(map2, "bounds_changed", () => {
        boundsChangedEvent.remove();
        emitBoundsReady();
      });
      event.addListener(map2, "complete", () => {
        emitBoundsReady();
      });
      event.addListener(map2, "click", () => {
        trigger("tap", {}, {});
        trigger("click", {}, {});
      });
      event.addListener(map2, "dragstart", () => {
        trigger("regionchange", {}, {
          type: "begin",
          causedBy: "gesture"
        });
      });
      event.addListener(map2, "dragend", () => {
        trigger("regionchange", {}, extend({
          type: "end",
          causedBy: "drag"
        }, getMapInfo2()));
      });
      const zoomChangedCallback = () => {
        emit2("update:scale", map2.getZoom());
        trigger("regionchange", {}, extend({
          type: "end",
          causedBy: "scale"
        }, getMapInfo2()));
      };
      event.addListener(map2, "zoom_changed", zoomChangedCallback);
      event.addListener(map2, "zoomend", zoomChangedCallback);
      event.addListener(map2, "center_changed", () => {
        const center2 = map2.getCenter();
        const latitude = getLat(center2);
        const longitude = getLng(center2);
        emit2("update:latitude", latitude);
        emit2("update:longitude", longitude);
      });
    }
    return map2;
  }
  try {
    const id2 = useContextInfo();
    useSubscribe((type, data = {}) => {
      switch (type) {
        case "getCenterLocation":
          onMapReady(() => {
            const center = map.getCenter();
            callOptions(data, {
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
              if (map) {
                const centerPosition = getMapPosition(maps2, latitude, longitude);
                map.setCenter(centerPosition);
              }
              onMapReady(() => {
                callOptions(data, `${type}:ok`);
              });
            } else {
              callOptions(data, `${type}:fail`);
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
                callOptions(data, `${type}:fail ${error.message}`);
              }
              callOptions(data, `${type}:ok`);
            } else {
              callOptions(data, `${type}:fail not found`);
            }
          });
          break;
        case "includePoints":
          state.includePoints = getPoints(data.includePoints);
          if (isBoundsReady || getIsAMap()) {
            updateBounds();
          }
          onBoundsReady(() => {
            callOptions(data, `${type}:ok`);
          });
          break;
        case "getRegion":
          onBoundsReady(() => {
            const latLngBounds = map.getBounds();
            const southwest = latLngBounds.getSouthWest();
            const northeast = latLngBounds.getNorthEast();
            callOptions(data, {
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
            callOptions(data, {
              scale: map.getZoom(),
              errMsg: `${type}:ok`
            });
          });
          break;
      }
    }, id2, true);
  } catch (error) {
  }
  onMounted(() => {
    loadMaps(props2.libraries, (result) => {
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
    const rootRef = ref(null);
    const { mapRef, trigger } = useMap(props2, rootRef, emit2);
    return () => {
      return openBlock(), createBlock("uni-map", {
        ref: rootRef,
        id: props2.id
      }, [
        createVNode("div", {
          ref: mapRef,
          style: "width: 100%; height: 100%; position: relative; overflow: hidden"
        }, null, 512),
        normalizeVNode(() => props2.markers.map((item) => (openBlock(), createBlock(MapMarker, mergeProps({ key: item.id }, item), null, 16)))),
        normalizeVNode(() => props2.polyline.map((item) => (openBlock(), createBlock(MapPolyline, item, null, 16)))),
        normalizeVNode(() => props2.circles.map((item) => (openBlock(), createBlock(MapCircle, item, null, 16)))),
        normalizeVNode(() => props2.controls.map((item) => (openBlock(), createBlock(MapControl, mergeProps(item, { trigger }), null, 16)))),
        normalizeVNode(() => props2.showLocation && (openBlock(), createBlock(MapLocation))),
        normalizeVNode(() => props2.polygons.map((item) => (openBlock(), createBlock(MapPolygon, item, null, 16)))),
        createVNode("div", _hoisted_1$2, [normalizeVNode(() => slots.default && slots.default())])
      ], 512);
    };
  }
});
const props$1 = { scrollTop: {
  type: [String, Number],
  default: 0
} };
const index$8 = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverView",
  compatConfig: { MODE: 3 },
  props: props$1,
  setup(props2, { slots }) {
    const root = ref(null);
    const content = ref(null);
    watch(() => props2.scrollTop, (val) => {
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
        _val.replace(/\d+[ur]px$/i, (text2) => {
          return String(uni.upx2px(parseFloat(text2)));
        });
      }
      return parseFloat(_val) || 0;
    }
    onMounted(() => {
      setScrollTop(props2.scrollTop);
    });
    return () => {
      return openBlock(), createBlock("uni-cover-view", {
        "scroll-top": props2.scrollTop,
        ref: root
      }, [createVNode("div", {
        ref: content,
        class: "uni-cover-view"
      }, [normalizeVNode(() => slots.default && slots.default())], 512)], 512);
    };
  }
});
const _hoisted_1$1 = { class: "uni-cover-image" };
const index$7 = /* @__PURE__ */ defineBuiltInComponent({
  name: "CoverImage",
  compatConfig: { MODE: 3 },
  props: { src: {
    type: String,
    default: ""
  } },
  emits: ["load", "error"],
  setup(props2, { emit: emit2 }) {
    const root = ref(null);
    return () => {
      const { src } = props2;
      return openBlock(), createBlock("uni-cover-image", {
        ref: root,
        src
      }, [createVNode("div", _hoisted_1$1, [src ? (openBlock(), createBlock("img", {
        key: 0,
        src: getRealPath(src)
      })) : normalizeVNode(() => null)])], 512);
    };
  }
});
const POPUP_EDGE = 6;
function usePopupStyle(props2, triangleColor = "#fcfcfd") {
  const popupWidth = ref(0);
  const popupHeight = ref(0);
  const isDesktop = computed(
    () => popupWidth.value >= 500 && popupHeight.value >= 500
  );
  const popupStyle = computed(() => {
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
      extend(triangleStyle, {
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
  onMounted(() => {
    const fixSize = () => {
      try {
        const { windowWidth, windowHeight, windowTop } = uni.getSystemInfoSync();
        popupWidth.value = windowWidth;
        popupHeight.value = windowHeight + (windowTop || 0);
      } catch {
      }
    };
    window.addEventListener("resize", fixSize);
    fixSize();
    onUnmounted(() => {
      window.removeEventListener("resize", fixSize);
    });
  });
  return {
    isDesktop,
    popupStyle
  };
}
const KEY_MAPS = {
  esc: ["Esc", "Escape"],
  // tab: ['Tab'],
  enter: ["Enter"]
  // space: [' ', 'Spacebar'],
  // up: ['Up', 'ArrowUp'],
  // left: ['Left', 'ArrowLeft'],
  // right: ['Right', 'ArrowRight'],
  // down: ['Down', 'ArrowDown'],
  // delete: ['Backspace', 'Delete', 'Del'],
};
const KEYS = Object.keys(KEY_MAPS);
function useKeyboard() {
  const key = ref("");
  const disable = ref(false);
  const onKeyup = (evt) => {
    if (disable.value) {
      return;
    }
    const res = KEYS.find(
      (key2) => KEY_MAPS[key2].indexOf(evt.key) !== -1
    );
    if (res) {
      key.value = res;
    }
    nextTick(() => key.value = "");
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
const _hoisted_1 = { class: "uni-mask uni-picker-mask" };
const _hoisted_2 = { class: "uni-picker-header" };
const _hoisted_3 = { class: "uni-picker-action uni-picker-action-cancel" };
const _hoisted_4 = { class: "uni-picker-action uni-picker-action-confirm" };
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
    const { t: t2 } = useI18n();
    const rootRef = ref(null);
    const pickerRef = ref(null);
    const selectRef = ref(null);
    const inputRef = ref(null);
    const pickerRender = ref(false);
    const { state, rangeArray } = usePickerState(props2);
    const trigger = useCustomEvent(rootRef, emit2);
    const { system, selectorTypeComputed, _show, _l10nColumn, _l10nItem, _input, _fixInputPosition, _pickerViewChange, _cancel, _change, _resetFormData, _getFormData, _createTime, _createDate, _setValueSync } = usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef);
    usePickerWatch(state, _cancel, _change);
    usePickerForm(_resetFormData, _getFormData);
    _createTime();
    _createDate();
    _setValueSync();
    const popup = usePopupStyle(state, "var(--uni-picker-arrow-color, #fcfcfd)");
    watchEffect(() => {
      state.isDesktop = popup.isDesktop.value;
      state.popupStyle = popup.popupStyle.value;
    });
    onBeforeUnmount(() => {
      pickerRef.value && pickerRef.value.remove();
    });
    onMounted(() => {
      pickerRender.value = true;
    });
    return () => {
      const { visible, contentVisible, valueArray, popupStyle, valueSync } = state;
      const { rangeKey, mode: mode2, start, end } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return openBlock(), createBlock("uni-picker", mergeProps({ ref: rootRef }, booleanAttrs), [
        pickerRender.value ? (openBlock(), createBlock("div", {
          key: 0,
          ref: pickerRef,
          class: ["uni-picker-container", `uni-${mode2}-${selectorTypeComputed.value}`]
        }, [createVNode(Transition, {
          name: "uni-fade",
          persisted: true
        }, {
          default: withCtx(() => [withDirectives(createVNode("div", _hoisted_1, null, 512), [[vShow, visible]])]),
          _: 2
        }, 1024), !system.value ? (openBlock(), createBlock("div", {
          key: 0,
          class: [{ "uni-picker-toggle": visible }, "uni-picker-custom"],
          style: popupStyle.content
        }, [
          createVNode("div", _hoisted_2, [createVNode("div", _hoisted_3, [normalizeVNode(() => t2("uni.picker.cancel"))]), createVNode("div", _hoisted_4, [normalizeVNode(() => t2("uni.picker.done"))])]),
          contentVisible ? (openBlock(), createBlock(PickerView, {
            key: 0,
            value: _l10nColumn(valueArray),
            class: "uni-picker-content"
          }, {
            default: withCtx(() => [normalizeVNode(() => renderList(_l10nColumn(rangeArray.value), (rangeItem, index0) => (openBlock(), createBlock(PickerViewColumn, { key: index0 }, {
              default: withCtx(() => [normalizeVNode(() => renderList(rangeItem, (item, index2) => (openBlock(), createBlock("div", {
                key: index2,
                class: "uni-picker-item"
              }, [typeof item === "object" ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => item[rangeKey] || "")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [normalizeVNode(() => _l10nItem(item, index0))], 64))]))))]),
              _: 2
            }, 1024))))]),
            _: 2
          }, 1024)) : normalizeVNode(() => null),
          createVNode("div", {
            ref: selectRef,
            class: "uni-picker-select"
          }, [normalizeVNode(() => renderList(rangeArray.value[0], (item, index2) => (openBlock(), createBlock("div", {
            key: index2,
            class: ["uni-picker-item", { selected: valueArray[0] === index2 }]
          }, [typeof item === "object" ? (openBlock(), createBlock(Fragment, { key: 0 }, [normalizeVNode(() => item[rangeKey] || "")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [normalizeVNode(() => item)], 64))]))))], 512),
          createVNode("div", { style: popupStyle.triangle })
        ])) : normalizeVNode(() => null)], 512)) : normalizeVNode(() => null),
        createVNode("div", null, [normalizeVNode(() => slots.default && slots.default())]),
        system.value ? (openBlock(), createBlock("div", {
          key: 2,
          class: "uni-picker-system"
        }, [createVNode("input", {
          class: ["uni-picker-system_input", system.value],
          ref: inputRef,
          value: valueSync,
          type: mode2,
          tabindex: "-1",
          min: start,
          max: end
        }, null, 512)])) : normalizeVNode(() => null)
      ], 16);
    };
  }
});
function usePickerState(props2) {
  const state = reactive({
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
  const rangeArray = computed(() => {
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
const getiPadFlag = () => String(navigator.vendor).indexOf("Apple") === 0 && navigator.maxTouchPoints > 0;
function useIsiPad() {
  const isiPad = ref(false);
  {
    onMounted(() => isiPad.value = getiPadFlag());
  }
  return isiPad;
}
const getSystem = () => {
  if (/win|mac/i.test(navigator.platform)) {
    if (navigator.vendor === "Google Inc.") {
      return "chrome";
    } else if (/Firefox/.test(navigator.userAgent)) {
      return "firefox";
    }
  }
  return "";
};
function useSystem() {
  const _system = ref("");
  {
    onMounted(() => _system.value = getSystem());
  }
  return _system;
}
let __contentVisibleDelay;
function usePickerMethods(props2, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
  const isiPad = useIsiPad();
  const _system = useSystem();
  const selectorTypeComputed = computed(() => {
    const type = props2.selectorType;
    if (Object.values(selectorType).includes(type)) {
      return type;
    }
    return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
  });
  const system = computed(() => {
    if (props2.mode === mode.DATE && !Object.values(fields).includes(props2.fields) && state.isDesktop) {
      return _system.value;
    }
    return "";
  });
  const startArray = computed(() => {
    return getDateValueArray(props2, state, props2.start, getDefaultStartValue(props2));
  });
  const endArray = computed(() => {
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
          if (!isArray(val)) {
            val = state.valueArray;
          }
          if (!isArray(state.valueSync)) {
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
        valueArray = getDateValueArray(props2, state, val, formatDateTime({ mode: mode.TIME }));
        break;
      case mode.DATE:
        valueArray = getDateValueArray(props2, state, val, formatDateTime({ mode: mode.DATE }));
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
    state.valueSync = isArray(value) ? value.map((val) => val) : value;
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
    nextTick(() => {
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
  watch(() => state.visible, (val) => {
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
  watch([
    () => props2.mode,
    () => props2.value,
    () => props2.range
  ], _setValueSync, { deep: true });
  watch(() => state.valueSync, _setValueArray, { deep: true });
  watch(() => state.valueArray, (val) => {
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
  watchEffect(() => {
    disable.value = !state.visible;
  });
  watch(key, (value) => {
    if (value === "esc") {
      _cancel();
    } else if (value === "enter") {
      _change();
    }
  });
}
function usePickerForm(_resetFormData, _getFormData) {
  const uniForm = inject(uniFormKey, false);
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
    onBeforeUnmount(() => {
      uniForm.removeField(field);
    });
  }
}
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
    var { a: a2, b } = this._adConfig;
    const adData = a2[adpid];
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
    AdConfig.instance.get(this._currentAdpid, (b, a2) => {
      this._b = b;
      this._pl = a2;
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
      const list2 = imgs.filter((item) => typeof item === "string" && item);
      if (list2.length) {
        const index2 = Math.floor(Math.random() * list2.length);
        return list2[index2];
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
    const rootRef = ref(null);
    const customTuiaVisible = ref(false);
    const { $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
    const trigger = useCustomEvent(rootRef, emit2);
    const ad = new AdRender(props2, trigger, rootRef, {
      hasCustomTuiaMaterial: () => Boolean(slots.default && slots.default().length),
      setCustomTuiaVisible: (visible) => {
        customTuiaVisible.value = visible;
      }
    });
    watch(() => props2.adpid, (val) => {
      ad.load(val);
    });
    watch(() => props2.adpidWidescreen, (val) => {
      ad.load(val);
    });
    onMounted(() => {
      const compilerVersion = typeof __uniConfig !== "undefined" ? __uniConfig.compilerVersion ?? "" : "";
      ad.load(null);
      AdReport.instance.get({
        h: compilerVersion,
        a: props2.adpid,
        at: -3,
        ic: AdConfig.IC,
        is: AdConfig.IS
      });
    });
    onBeforeUnmount(() => {
      ad.dispose();
    });
    return () => {
      const { adpid, adpidWidescreen, widescreenWidth } = props2;
      return openBlock(), createBlock(Fragment, null, [createVNode("uni-ad", mergeProps($listeners.value, $excludeAttrs.value, {
        adpid,
        adpidWidescreen,
        widescreenWidth
      }), [createVNode("div", {
        ref: rootRef,
        class: "uni-ad-container"
      }, null, 512), customTuiaVisible.value && slots.default ? (openBlock(), createBlock("div", {
        key: 0,
        class: "uni-ad-custom-material"
      }, [normalizeVNode(() => slots.default())])) : normalizeVNode(() => null)], 16)], 64);
    };
  }
});
const index$4 = /* @__PURE__ */ defineUnsupportedComponent("ad-content-page");
const index$3 = /* @__PURE__ */ defineUnsupportedComponent("ad-draw");
const index$2 = /* @__PURE__ */ defineUnsupportedComponent("camera");
const index$1 = /* @__PURE__ */ defineUnsupportedComponent("live-player");
const index = /* @__PURE__ */ defineUnsupportedComponent("live-pusher");
const UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, {
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
      if (isString(data) || data instanceof ArrayBuffer) {
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
        if (hasOwn(header, key)) {
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
    this._emitter = new Emitter();
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
  headers.split(LINEFEED).forEach((header) => {
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
    const object = isString(value) ? JSON.parse(value) : value;
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
  if (!isString(value)) {
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
    return extend({
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
    return extend(
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
const UniServiceJSBridge$1 = /* @__PURE__ */ extend(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    UniViewJSBridge.subscribeHandler(event, args, pageId);
  }
});
const loadFontFace = /* @__PURE__ */ defineAsyncApi(
  API_LOAD_FONT_FACE,
  ({ family, source, desc }, { resolve, reject }) => {
    if (source.startsWith(`url("`) || source.startsWith(`url('`)) {
      source = `url('${getRealPath(source.substring(5, source.length - 2))}')`;
    } else if (source.startsWith("url(")) {
      source = `url('${getRealPath(source.substring(4, source.length - 1))}')`;
    } else {
      source = getRealPath(source);
    }
    addFont(family, source, desc).then(() => {
      resolve();
    }).catch((err) => {
      reject(`loadFontFace:fail ${err}`);
    });
  },
  LoadFontFaceProtocol
);
const UNI_TABBAR_ICON_FONT = "UniTabbarIconFont";
const DEFAULT_BG_COLOR = "#f7f7fa";
const BLUR_EFFECT_COLOR_DARK = "rgb(0, 0, 0, 0.8)";
const BLUR_EFFECT_COLOR_LIGHT = "rgb(250, 250, 250, 0.8)";
const _sfc_main$1 = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "TabBar",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "tabBar",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    const hasMidButton = __UNI_FEATURE_TABBAR_MIDBUTTON__;
    const _middleButton = {
      width: "50px",
      height: "50px",
      iconWidth: "24px"
    };
    const visibleList = ref([]);
    const tabBar = useTabBar();
    useVisibleList(tabBar, visibleList);
    useTabBarCssVar(tabBar);
    useSwitchTab(useRoute(), tabBar, visibleList);
    const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar);
    onMounted(() => {
      if (tabBar.iconfontSrc) {
        loadFontFace({
          family: UNI_TABBAR_ICON_FONT,
          source: `url("${tabBar.iconfontSrc}")`
        });
      }
    });
    function useTabBarCssVar(tabBar2) {
      watch(
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
      const internalMidButton = ref(
        extend({ type: "midButton" }, tabBar2.midButton)
      );
      function setVisibleList() {
        let tempList = [];
        tempList = tabBar2.list.filter((item) => item.visible !== false);
        if (hasMidButton && tabBar2.midButton) {
          internalMidButton.value = extend(
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
      watchEffect(setVisibleList);
    }
    function useSwitchTab(route, tabBar2, visibleList2) {
      watchEffect(() => {
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
        const { pagePath, text: text2 } = tabBarItem;
        let url = addLeadingSlash(pagePath);
        if (url === __uniRoutes[0].alias) {
          url = "/";
        }
        if (route.path !== url) {
          uni.switchTab({ from: "tabBar", url, tabBarText: text2 });
        } else {
          invokeHook("onTabItemTap", {
            index: index2,
            text: text2,
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
      const style2 = computed(() => {
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
      const borderStyle2 = computed(() => {
        const { borderStyle: borderStyle3, borderColor } = tabBar2;
        if (borderColor && isString(borderColor)) {
          return {
            backgroundColor: borderColor
          };
        }
        return {
          backgroundColor: BORDER_COLORS[borderStyle3] || BORDER_COLORS["black"]
        };
      });
      const placeholderStyle2 = computed(() => {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<uni-tabbar${ssrRenderAttrs(mergeProps({
        class: "uni-tabbar-" + unref(tabBar).position
      }, _attrs), "uni-tabbar")}><div class="uni-tabbar" style="${ssrRenderStyle(unref(style))}"><div class="uni-tabbar-border" style="${ssrRenderStyle(unref(borderStyle))}"></div><!--[-->`);
      ssrRenderList(visibleList.value, (item, index2) => {
        _push(`<div class="uni-tabbar__item" style="${ssrRenderStyle(getItemStyle(item))}">`);
        if (isRenderedMidButton(item)) {
          _push(`<div class="uni-tabbar__mid" style="${ssrRenderStyle(getMidButtonStyle(item))}">`);
          if (getIconPath(item, index2)) {
            _push(`<img style="${ssrRenderStyle({
              width: getMidButton(item).iconWidth,
              height: getMidButton(item).iconWidth
            })}"${ssrRenderAttr("src", unref(getRealPath)(getIconPath(item, index2)))}>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="uni-tabbar__bd" style="${ssrRenderStyle({ height: unref(tabBar).height })}">`);
        if (getIconfontText(item, index2)) {
          _push(`<div class="${ssrRenderClass(getIconClass(item))}" style="${ssrRenderStyle(getIconStyle())}">`);
          if (item.type !== "midButton") {
            _push(`<div class="uni-tabbar__iconfont" style="${ssrRenderStyle(getIconfontStyle(item, index2))}">${ssrInterpolate(getIconfontText(item, index2))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (getIconPath(item, index2)) {
          _push(`<div class="${ssrRenderClass(getIconClass(item))}" style="${ssrRenderStyle(getIconStyle())}">`);
          if (item.type !== "midButton") {
            _push(`<img${ssrRenderAttr("src", unref(getRealPath)(getIconPath(item, index2)))}>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.text) {
          _push(`<div class="uni-tabbar__label" style="${ssrRenderStyle(getLabelStyle(item, index2))}">${ssrInterpolate(item.text)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.redDot) {
          _push(`<div class="${ssrRenderClass([
            "uni-tabbar__reddot",
            item.badge ? "uni-tabbar__badge" : ""
          ])}">${ssrInterpolate(item.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="uni-placeholder" style="${ssrRenderStyle(unref(placeholderStyle))}"></div></uni-tabbar>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/layout/tabBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent$1({
  ...{
    name: "Layout",
    __reserved: true,
    compatConfig: { MODE: 3 }
  },
  __name: "index-vapor",
  __ssrInlineRender: true,
  __vapor: true,
  setup(__props) {
    const hasPages = __UNI_FEATURE_PAGES__;
    const hasResponsive = __UNI_FEATURE_RESPONSIVE__;
    const hasTopWindow = __UNI_FEATURE_TOPWINDOW__;
    const hasLeftWindow = __UNI_FEATURE_LEFTWINDOW__;
    const hasRightWindow = __UNI_FEATURE_RIGHTWINDOW__;
    const hasTabBar = __UNI_FEATURE_TABBAR__;
    const rootRef = ref(null);
    const firstPageComponent = !hasPages && __uniRoutes[0].component;
    const keepAliveRoute = hasPages ? useKeepAliveRoute() : void 0;
    const routeKey = keepAliveRoute == null ? void 0 : keepAliveRoute.routeKey;
    const isTabBar = keepAliveRoute == null ? void 0 : keepAliveRoute.isTabBar;
    keepAliveRoute == null ? void 0 : keepAliveRoute.routeCache;
    const route = hasPages ? useRoute() : void 0;
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
      const showMaxWidth = ref(false);
      return computed(() => {
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
            (hasOwn(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER
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
          nextTick(() => {
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
          nextTick(() => {
            const rootEl = rootRef2.value;
            if (rootEl) {
              rootEl.removeAttribute("style");
            }
          });
        }
      }
      watch([() => route2.path], checkMaxWidth);
      onMounted(() => {
        checkMaxWidth();
        window.addEventListener("resize", checkMaxWidth);
      });
    }
    function useState2() {
      const route2 = usePageRoute();
      if (!hasResponsive) {
        const layoutState3 = reactive({
          marginWidth: 0,
          leftWindowWidth: 0,
          rightWindowWidth: 0
        });
        watch(
          () => layoutState3.marginWidth,
          (value) => updateCssVar({ "--window-margin": value + "px" })
        );
        watch(
          () => layoutState3.leftWindowWidth + layoutState3.marginWidth,
          (value) => {
            updateCssVar({ "--window-left": value + "px" });
          }
        );
        watch(
          () => layoutState3.rightWindowWidth + layoutState3.marginWidth,
          (value) => {
            updateCssVar({ "--window-right": value + "px" });
          }
        );
        return {
          layoutState: layoutState3,
          windowState: computed(() => ({}))
        };
      }
      const topWindowMediaQuery = ref(false);
      const leftWindowMediaQuery = ref(false);
      const rightWindowMediaQuery = ref(false);
      const showTopWindow = computed(
        () => hasTopWindow && route2.meta.topWindow !== false && topWindowMediaQuery.value
      );
      const showLeftWindow = computed(
        () => hasLeftWindow && route2.meta.leftWindow !== false && leftWindowMediaQuery.value
      );
      const showRightWindow = computed(
        () => hasRightWindow && route2.meta.rightWindow !== false && rightWindowMediaQuery.value
      );
      const layoutState2 = reactive({
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
        if (matchMedia && hasOwn(matchMedia, "minWidth")) {
          matchMedia.minWidth;
        }
        const matches = initMediaQuery();
        layoutState2[`${prop}MediaQuery`] = matches;
      });
      watch(
        () => layoutState2.topWindowHeight,
        (value) => updateCssVar({ "--top-window-height": value + "px" })
      );
      watch(
        () => layoutState2.marginWidth,
        (value) => updateCssVar({ "--window-margin": value + "px" })
      );
      watch(
        () => layoutState2.leftWindowWidth + layoutState2.marginWidth,
        (value) => {
          updateCssVar({ "--window-left": value + "px" });
        }
      );
      watch(
        () => layoutState2.rightWindowWidth + layoutState2.marginWidth,
        (value) => {
          updateCssVar({ "--window-right": value + "px" });
        }
      );
      UniServiceJSBridge.on(ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
        layoutState2.navigationBarTitleText = navigationBar.titleText;
      });
      const windowState2 = computed(() => ({
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
      const showTabBar2 = computed(() => route2.meta.isTabBar && tabBar.shown);
      return showTabBar2;
    }
    function useTopWindow(layoutState2) {
      const { component, style } = __uniConfig.topWindow;
      const windowRef = ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = resolveOwnerEl(instance.$);
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
      watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      watch(
        () => layoutState2.showTopWindow || layoutState2.apiShowTopWindow,
        () => nextTick(updateWindow)
      );
      watch(
        () => layoutState2.topWindowStyle,
        () => nextTick(updateWindow)
      );
      layoutState2.topWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    function useLeftWindow(layoutState2) {
      const { component, style } = __uniConfig.leftWindow;
      const windowRef = ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = resolveOwnerEl(instance.$);
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
      watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      watch(
        () => layoutState2.showLeftWindow || layoutState2.apiShowLeftWindow,
        () => nextTick(updateWindow)
      );
      watch(
        () => layoutState2.leftWindowStyle,
        () => nextTick(updateWindow)
      );
      layoutState2.leftWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    function useRightWindow(layoutState2) {
      const { component, style } = __uniConfig.rightWindow;
      const windowRef = ref(null);
      function updateWindow() {
        const instance = windowRef.value;
        if (!instance || !instance.$) {
          return;
        }
        const el = resolveOwnerEl(instance.$);
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
      watch(
        () => windowRef.value,
        () => {
          updateWindow();
        }
      );
      watch(
        () => layoutState2.showRightWindow || layoutState2.apiShowRightWindow,
        () => nextTick(updateWindow)
      );
      watch(
        () => layoutState2.rightWindowStyle,
        () => nextTick(updateWindow)
      );
      layoutState2.rightWindowStyle = style;
      return {
        component,
        windowRef
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<uni-app${ssrRenderAttrs(mergeProps({
        ref_key: "rootRef",
        ref: rootRef,
        class: unref(clazz)
      }, _attrs), "uni-app")}>`);
      if (unref(hasResponsive)) {
        _push(`<uni-layout class="${ssrRenderClass({
          "uni-app--showtopwindow": unref(hasTopWindow) && unref(layoutState).showTopWindow,
          "uni-app--showleftwindow": unref(hasLeftWindow) && unref(layoutState).showLeftWindow,
          "uni-app--showrightwindow": unref(hasRightWindow) && unref(layoutState).showRightWindow
        })}">`);
        if (unref(hasTopWindow) && unref(TopWindow)) {
          _push(`<uni-top-window style="${ssrRenderStyle(unref(layoutState).showTopWindow || unref(layoutState).apiShowTopWindow ? null : { display: "none" })}"><div class="uni-top-window" style="${ssrRenderStyle(unref(layoutState).topWindowStyle)}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(TopWindow)), mergeProps({
            ref_key: "topWindowRef",
            ref: topWindowRef,
            "navigation-bar-title-text": unref(layoutState).navigationBarTitleText
          }, unref(windowState)), null), _parent);
          _push(`</div><div class="uni-top-window--placeholder" style="${ssrRenderStyle({ height: unref(layoutState).topWindowHeight + "px" })}"></div></uni-top-window>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<uni-content><uni-main>`);
        if (unref(hasPages) && ((_a = unref(route)) == null ? void 0 : _a.meta.route)) {
          _push(ssrRenderComponent(unref(VaporRouterView), {
            type: unref(isTabBar) ? "tabBar" : "",
            key: unref(routeKey)
          }, null, _parent));
        } else if (!unref(hasPages)) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(firstPageComponent)), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</uni-main>`);
        if (unref(hasLeftWindow) && unref(LeftWindow)) {
          _push(`<uni-left-window${ssrRenderAttr("data-show", unref(layoutState).apiShowLeftWindow || void 0)} style="${ssrRenderStyle([
            unref(layoutState).leftWindowStyle,
            unref(layoutState).showLeftWindow || unref(layoutState).apiShowLeftWindow ? null : { display: "none" }
          ])}">`);
          if (unref(layoutState).apiShowLeftWindow) {
            _push(`<div class="uni-mask"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="uni-left-window">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(LeftWindow)), mergeProps({
            ref_key: "leftWindowRef",
            ref: leftWindowRef
          }, unref(windowState)), null), _parent);
          _push(`</div></uni-left-window>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(hasRightWindow) && unref(RightWindow)) {
          _push(`<uni-right-window${ssrRenderAttr("data-show", unref(layoutState).apiShowRightWindow || void 0)} style="${ssrRenderStyle([
            unref(layoutState).rightWindowStyle,
            unref(layoutState).showRightWindow || unref(layoutState).apiShowRightWindow ? null : { display: "none" }
          ])}">`);
          if (unref(layoutState).apiShowRightWindow) {
            _push(`<div class="uni-mask"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="uni-right-window">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(RightWindow)), mergeProps({
            ref_key: "rightWindowRef",
            ref: rightWindowRef
          }, unref(windowState)), null), _parent);
          _push(`</div></uni-right-window>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</uni-content></uni-layout>`);
      } else {
        _push(`<!--[-->`);
        if (unref(hasPages) && ((_b = unref(route)) == null ? void 0 : _b.meta.route)) {
          _push(ssrRenderComponent(unref(VaporRouterView), {
            type: unref(isTabBar) ? "tabBar" : "",
            key: unref(routeKey)
          }, null, _parent));
        } else if (!unref(hasPages)) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(firstPageComponent)), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      if (unref(hasTabBar)) {
        _push(ssrRenderComponent(_sfc_main$1, {
          style: unref(showTabBar) ? null : { display: "none" }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</uni-app>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/framework/components/layout/index-vapor.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
export {
  index$5 as Ad,
  index$4 as AdContentPage,
  index$3 as AdDraw,
  _sfc_main$8 as AsyncErrorComponent,
  _sfc_main$9 as AsyncLoadingComponent,
  index$v as Button,
  index$2 as Camera,
  indexX$4 as Canvas,
  index$t as Checkbox,
  index$u as CheckboxGroup,
  index$7 as CoverImage,
  index$8 as CoverView,
  index$s as Editor,
  index$x as Form,
  index$r as Icon,
  Input,
  index$w as Label,
  _sfc_main as LayoutComponent,
  index$f as ListItem,
  index$g as ListView,
  index$1 as LivePlayer,
  index as LivePusher,
  _sfc_main$2 as Loading,
  index$9 as Map,
  index$q as MovableArea,
  index$p as MovableView,
  index$o as Navigator,
  _sfc_main$4 as PageComponent,
  _sfc_main$3 as PageContainer,
  index$6 as Picker,
  PickerView,
  PickerViewColumn,
  index$n as Progress,
  indexX$3 as Radio,
  index$m as RadioGroup,
  ResizeSensor,
  index$l as RichText,
  index$k as ScrollView,
  indexX$2 as Slider,
  index$d as StickyHeader,
  index$e as StickySection,
  index$j as Swiper,
  index$i as SwiperItem,
  indexX$1 as Switch,
  index$h as Textarea,
  UTS2 as UTS,
  UTSJSONObject2 as UTSJSONObject,
  UTSValueIterable2 as UTSValueIterable,
  UniError2 as UniError,
  UniServiceJSBridge$1 as UniServiceJSBridge,
  UniViewJSBridge$1 as UniViewJSBridge,
  index$a as Video,
  indexX as WebView,
  clearStorage,
  clearStorageSync,
  createVaporPageRouteComponent,
  getApp$1 as getApp,
  getAppBaseInfo,
  getCurrentPages$1 as getCurrentPages,
  getDeviceInfo,
  getRealPath,
  getStorage,
  getStorageInfo,
  getStorageInfoSync,
  getStorageSync,
  getSystemInfoSync,
  index$b as plugin,
  removeStorage,
  removeStorageSync,
  request,
  setNavigationBarTitle,
  setStorage,
  setStorageSync,
  setupApp,
  setupPage,
  setupWindow,
  uni$1 as uni,
  useI18n,
  useTabBar
};
