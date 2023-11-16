import { initVueI18n } from '@dcloudio/uni-i18n';
import Vue from 'vue';

let realAtob;

const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function (str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) { throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.") }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap; var result = ''; var r1; var r2; var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
                    (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
        : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
          : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode (str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

function getCurrentUserInfo () {
  const token = ( xhs).getStorageSync('uni_id_token') || '';
  const tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    }
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message)
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo
}

function uniIdMixin (Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    const {
      role
    } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    const {
      permission
    } = getCurrentUserInfo();
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1
  };
  Vue.prototype.uniIDTokenValid = function () {
    const {
      tokenExpired
    } = getCurrentUserInfo();
    return tokenExpired > Date.now()
  };
}

const _toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function isStr (str) {
  return typeof str === 'string'
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function noop () {}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  const cache = Object.create(null);
  return function cachedFn (str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
});

const HOOKS = [
  'invoke',
  'success',
  'fail',
  'complete',
  'returnValue'
];

const globalInterceptors = {};
const scopedInterceptors = {};

function mergeHook (parentVal, childVal) {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

function removeHook (hooks, hook) {
  const index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook (interceptor, option) {
  Object.keys(option).forEach(hook => {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook (interceptor, option) {
  if (!interceptor || !option) {
    return
  }
  Object.keys(option).forEach(hook => {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor (method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor (method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook (hook, params) {
  return function (data) {
    return hook(data, params) || data
  }
}

function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function queue (hooks, data, params) {
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
          then () { }
        }
      }
    }
  }
  return promise || {
    then (callback) {
      return callback(data)
    }
  }
}

function wrapperOptions (interceptor, options = {}) {
  ['success', 'fail', 'complete'].forEach(name => {
    if (Array.isArray(interceptor[name])) {
      const oldCallback = options[name];
      options[name] = function callbackInterceptor (res) {
        queue(interceptor[name], res, options).then((res) => {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res
        });
      };
    }
  });
  return options
}

function wrapperReturnValue (method, returnValue) {
  const returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach(hook => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue
}

function getApiInterceptorHooks (method) {
  const interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(hook => {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(hook => {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor
}

function invokeApi (method, api, options, ...params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options) => {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api(
          wrapperOptions(getApiInterceptorHooks(method), options),
          ...params
        )
      })
    } else {
      return api(wrapperOptions(interceptor, options), ...params)
    }
  }
  return api(options, ...params)
}

const promiseInterceptor = {
  returnValue (res) {
    if (!isPromise(res)) {
      return res
    }
    return new Promise((resolve, reject) => {
      res.then(res => {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    })
  }
};

const SYNC_API_RE =
  /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;

const CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
const ASYNC_API = ['createBLEConnection', 'createPushMessage'];

const CALLBACK_API_RE = /^on|^off/;

function isContextApi (name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1
}
function isSyncApi (name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1
}

function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush'
}

function handlePromise (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

function shouldPromise (name) {
  if (
    isContextApi(name) ||
    isSyncApi(name) ||
    isCallbackApi(name)
  ) {
    return false
  }
  return true
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    const promise = this.constructor;
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  };
}

function promisify (name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api
  }
  return function promiseApi (options = {}, ...params) {
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, ...params))
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
    })))
  }
}

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;

function checkDeviceWidth () {
  const {
    platform,
    pixelRatio,
    windowWidth
  } = xhs.getSystemInfoSync(); // uni=>xhs runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px (number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0
  }
  let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth);
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
  return number < 0 ? -result : result
}

const LOCALE_ZH_HANS = 'zh-Hans';
const LOCALE_ZH_HANT = 'zh-Hant';
const LOCALE_EN = 'en';
const LOCALE_FR = 'fr';
const LOCALE_ES = 'es';

const messages = {};

let locale;

{
  locale = normalizeLocale(xhs.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages () {
  if (!isEnableLocale()) {
    return
  }
  const localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach((locale) => {
      const curMessages = messages[locale];
      const userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

const i18n = initVueI18n(
  locale,
   {}
);
const t = i18n.t;
const i18nMixin = (i18n.mixin = {
  beforeCreate () {
    const unwatch = i18n.i18n.watchLocale(() => {
      this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t (key, values) {
      return t(key, values)
    }
  }
});
const setLocale = i18n.setLocale;
const getLocale = i18n.getLocale;

function initAppLocale (Vue, appVm, locale) {
  const state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  const localeWatchers = [];
  appVm.$watchLocale = fn => {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get () {
      return state.locale
    },
    set (v) {
      state.locale = v;
      localeWatchers.forEach(watch => watch(v));
    }
  });
}

function isEnableLocale () {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
}

function include (str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1)
}

function startsWith (str, parts) {
  return parts.find((part) => str.indexOf(part) === 0)
}

function normalizeLocale (locale, messages) {
  if (!locale) {
    return
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT
    }
    return LOCALE_ZH_HANS
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1 () {
  // 优先使用 $locale
  if (isFn(getApp)) {
    const app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale
    }
  }
  return normalizeLocale(xhs.getSystemInfoSync().language) || LOCALE_EN
}

function setLocale$1 (locale) {
  const app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({
      locale
    }));
    return true
  }
  return false
}

const onLocaleChangeCallbacks = [];
function onLocaleChange (fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

const interceptors = {
  promiseInterceptor
};

var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});

const UUID_KEY = '__DC_STAT_UUID';
let deviceId;
function useDeviceId (result) {
  deviceId = deviceId || xhs.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    xhs.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets (result) {
  if (result.safeArea) {
    const safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}

function populateParameters (result) {
  const {
    brand = '', model = '', system = '',
    language = '', theme, version,
    platform, fontSizeSetting,
    SDKVersion, pixelRatio, deviceOrientation
  } = result;
  // const isQuickApp = "mp-xhs".indexOf('quickapp-webview') !== -1

  const extraParam = {};

  // osName osVersion
  let osName = '';
  let osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  let hostVersion = version;

  // deviceType
  const deviceType = getGetDeviceType(result, model);

  // deviceModel
  const deviceBrand = getDeviceBrand(brand);

  // hostName
  const _hostName = getHostName(result);

  // deviceOrientation
  let _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  let _devicePixelRatio = pixelRatio;

  // SDKVersion
  let _SDKVersion = SDKVersion;

  // hostLanguage
  const hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  const parameters = {
    appId: process.env.UNI_APP_ID,
    appName: process.env.UNI_APP_NAME,
    appVersion: process.env.UNI_APP_VERSION_NAME,
    appVersionCode: process.env.UNI_APP_VERSION_CODE,
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: process.env.UNI_COMPILER_VERSION,
    uniRuntimeVersion: process.env.UNI_COMPILER_VERSION,
    uniPlatform: process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM,
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };

  Object.assign(result, parameters, extraParam);
}

function getGetDeviceType (result, model) {
  let deviceType = result.deviceType || 'phone';
  {
    const deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index = 0; index < deviceTypeMapsKeys.length; index++) {
      const _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break
      }
    }
  }
  return deviceType
}

function getDeviceBrand (brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand
}

function getAppLanguage (defaultLanguage) {
  return getLocale$1
    ? getLocale$1()
    : defaultLanguage
}

function getHostName (result) {
  const _platform =  "mp-xhs".split('-')[1];
  let _hostName = result.hostName || _platform; // mp-jd

  return _hostName
}

var getSystemInfo = {
  returnValue: function (result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};

// import navigateTo from 'uni-helpers/navigate-to'
// import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

// 需要做转换的 API 列表
const protocols = {
  // navigateTo,
  // redirectTo,
  // previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo
  // getUserProfile
};

// 不支持的 API 列表
// TODO: 补充
const todos = [
  'getSelectedTextRange'
];

// 存在兼容性的 API 列表
const canIUses = [];

const CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback (methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue))
  }
}

function processArgs (methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
  if (isPlainObject(fromArgs)) { // 一般 api 的参数解析
    const toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (const key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        let keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) { // 不支持的参数
          console.warn(`The '${methodName}' method of platform '小红书小程序' does not support option '${key}'`);
        } else if (isStr(keyOption)) { // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) { // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs
}

function processReturnValue (methodName, res, returnValue, keepReturnValue = false) {
  if (isFn(protocols.returnValue)) { // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue)
}

function wrapper (methodName, method) {
  if (hasOwn(protocols, methodName)) {
    const protocol = protocols[methodName];
    if (!protocol) { // 暂不支持的 api
      return function () {
        console.error(`Platform '小红书小程序' does not support '${methodName}'.`);
      }
    }
    return function (arg1, arg2) { // 目前 api 最多两个参数
      let options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      const args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      const returnValue = xhs[methodName].apply(xhs, args);
      if (isSyncApi(methodName)) { // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName))
      }
      return returnValue
    }
  }
  return method
}

const todoApis = Object.create(null);

const TODOS = [
  'onTabBarMidButtonTap',
  'subscribePush',
  'unsubscribePush',
  'onPush',
  'offPush',
  'share'
];

function createTodoApi (name) {
  return function todoApi ({
    fail,
    complete
  }) {
    const res = {
      errMsg: `${name}:fail method '${name}' not supported`
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  }
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['xhs'],
  share: ['xhs'],
  payment: ['xhs'],
  push: ['xhs']
};

function getProvider ({
  service,
  success,
  fail,
  complete
}) {
  let res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

const getEmitter = (function () {
  let Emitter;
  return function getUniEmitter () {
    if (!Emitter) {
      Emitter = new Vue();
    }
    return Emitter
  }
})();

function apply (ctx, method, args) {
  return ctx[method].apply(ctx, args)
}

function $on () {
  return apply(getEmitter(), '$on', [...arguments])
}
function $off () {
  return apply(getEmitter(), '$off', [...arguments])
}
function $once () {
  return apply(getEmitter(), '$once', [...arguments])
}
function $emit () {
  return apply(getEmitter(), '$emit', [...arguments])
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch (fn) {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      // TODO
      console.error(e);
    }
  }
}

function getApiCallbacks (params) {
  const apiCallbacks = {};
  for (const name in params) {
    const param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks
}

let cid;
let cidErrMsg;
let enabled;

function normalizePushMessage (message) {
  try {
    return JSON.parse(message)
  } catch (e) {}
  return message
}

function invokePushCallback (
  args
) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    const message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}

const getPushCidCallbacks = [];

function invokeGetPushCidCallbacks (cid, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId (args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const {
    success,
    fail,
    complete
  } = getApiCallbacks(args);
  const hasSuccess = isFn(success);
  const hasFail = isFn(fail);
  const hasComplete = isFn(complete);

  Promise.resolve().then(() => {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push((cid, errMsg) => {
      let res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

const onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});

const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId (vm, vuePid) {
  const $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm
    }
  }
  // 反向递归查找
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm
    }
  }
}

function initBehavior (options) {
  return Behavior(options)
}

function isPage () {
  return !!this.route
}

function initRelation (detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents (mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(component => {
    const ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
  });
}

function syncRefs (refs, newRefs) {
  const oldKeys = new Set(...Object.keys(refs));
  const newKeys = Object.keys(newRefs);
  newKeys.forEach(key => {
    const oldValue = refs[key];
    const newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(value => oldValue.includes(value))) {
      return
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(key => {
    delete refs[key];
  });
  return refs
}

function initRefs (vm) {
  const mpInstance = vm.$scope;
  const refs = {};
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(component => {
        const ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs)
    }
  });
}

function handleLink (event) {
  const {
    vuePid,
    vueOptions
  } = event.detail || event.value; // detail 是微信,value 是百度(dipatch)

  let parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function markMPComponent (component) {
  // 在 Vue 中标记为小程序组件
  const IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component
}

function toSkip (obj) {
  const OB = '__ob__';
  const SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: {
        [SKIP]: true
      }
    });
  }
  return obj
}

const MPPage = Page;
const MPComponent = Component;

const customizeRE = /:/g;

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
});

function initTriggerEvent (mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function (event, ...args) {
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || (this.dataset && this.dataset.comType)) {
      event = customize(event);
    }
    return oldTriggerEvent.apply(this, [event, ...args])
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook (name, options, isComponent) {
  const oldHook = options[name];
  options[name] = function (...args) {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      return oldHook.apply(this, args)
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function (options = {}) {
    initHook('onLoad', options);
    return MPPage(options)
  };
  Page.after = MPPage.after;

  Component = function (options = {}) {
    initHook('created', options);
    return MPComponent(options)
  };
}

const PAGE_EVENT_HOOKS = [
  'onPullDownRefresh',
  'onReachBottom',
  'onAddToFavorites',
  'onShareTimeline',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap'
];

function initMocks (vm, mocks) {
  const mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(mock => {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook (hook, vueOptions) {
  if (!vueOptions) {
    return true
  }

  if (Vue.options && Array.isArray(Vue.options[hook])) {
    return true
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true
    }
    if (vueOptions.super &&
      vueOptions.super.options &&
      Array.isArray(vueOptions.super.options[hook])) {
      return true
    }
    return false
  }

  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true
  }
  const mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(mixin => hasHook(hook, mixin))
  }
}

function initHooks (mpOptions, hooks, vueOptions) {
  hooks.forEach(hook => {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args)
      };
    }
  });
}

function initUnknownHooks (mpOptions, vueOptions, excludes = []) {
  findHooks(vueOptions).forEach((hook) => initHook$1(mpOptions, hook, excludes));
}

function findHooks (vueOptions, hooks = []) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks
}

function initHook$1 (mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args)
    };
  }
}

function initVueComponent (Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  let VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions]
}

function initSlots (vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    const $slots = Object.create(null);
    vueSlots.forEach(slotName => {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds (vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  const len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData (vueOptions, context) {
  let data = vueOptions.data || {};
  const methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (process.env.VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) { }
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(methodName => {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver (name) {
  return function observer (newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  }
}

function initBehaviors (vueOptions, initBehavior) {
  const vueBehaviors = vueOptions.behaviors;
  const vueExtends = vueOptions.extends;
  const vueMixins = vueOptions.mixins;

  let vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  const behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(behavior => {
      behaviors.push(behavior.replace('uni://', `${"xhs"}://`));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
      initBehavior({
        properties: initProperties(vueExtends.props, true)
      })
    );
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(vueMixin => {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
          initBehavior({
            properties: initProperties(vueMixin.props, true)
          })
        );
      }
    });
  }
  return behaviors
}

function parsePropType (key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0]
  }
  return type
}

function initProperties (props, isBehavior = false, file = '', options) {
  const properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function (newVal, oldVal) {
        const $slots = Object.create(null);
        newVal.forEach(slotName => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (Array.isArray(props)) { // ['title']
    props.forEach(key => {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) { // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(key => {
      const opts = props[key];
      if (isPlainObject(opts)) { // title:{type:String,default:''}
        let value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value,
          observer: createObserver(key)
        };
      } else { // content:String
        const type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties
}

function wrapper$1 (event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) { }

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event
}

function getExtraValue (vm, dataPathsArray) {
  let context = vm;
  dataPathsArray.forEach(dataPathArray => {
    const dataPath = dataPathArray[0];
    const value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') { // ['','',index,'disable']
      const propPath = dataPathArray[1];
      const valuePath = dataPathArray[3];

      let vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(vForItem => {
            return vm.__get_value(propPath, vForItem) === value
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(vForKey => {
            return vm.__get_value(propPath, vFor[vForKey]) === value
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context
}

function processEventExtra (vm, extra, event, __args__) {
  const extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach((dataPath, index) => {
      if (typeof dataPath === 'string') {
        if (!dataPath) { // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') { // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) { // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj
}

function getObjByArray (arr) {
  const obj = {};
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj
}

function processEventArgs (vm, event, args = [], extra = [], isCustom, methodName) {
  let isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  const __args__ = isPlainObject(event.detail)
    ? event.detail.__args__ || [event.detail]
    : [event.detail];

  if (isCustom) { // 自定义事件
    isCustomMPEvent = event.currentTarget &&
      event.currentTarget.dataset &&
      event.currentTarget.dataset.comType === 'wx';
    if (!args.length) { // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event]
      }
      return __args__
    }
  }

  const extraObj = processEventExtra(vm, extra, event, __args__);

  const ret = [];
  args.forEach(arg => {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) { // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else { // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret
}

const ONCE = '~';
const CUSTOM = '^';

function isMatchEventType (eventType, optType) {
  return (eventType === optType) ||
    (
      optType === 'regionchange' &&
      (
        eventType === 'begin' ||
        eventType === 'end'
      )
    )
}

function getContextVm (vm) {
  let $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent
}

function handleEvent (event) {
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  const dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在')
  }
  const eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在')
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  const eventType = event.type;

  const ret = [];

  eventOpts.forEach(eventOpt => {
    let type = eventOpt[0];
    const eventsArray = eventOpt[1];

    const isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    const isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(eventArray => {
        const methodName = eventArray[0];
        if (methodName) {
          let handlerCtx = this.$vm;
          if (handlerCtx.$options.generic) { // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
              processEventArgs(
                this.$vm,
                event,
                eventArray[1],
                eventArray[2],
                isCustom,
                methodName
              ));
            return
          }
          const handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            const type = this.$vm.mpType === 'page' ? 'Page' : 'Component';
            const path = this.route || this.is;
            throw new Error(`${type} "${path}" does not have a method "${methodName}"`)
          }
          if (isOnce) {
            if (handler.once) {
              return
            }
            handler.once = true;
          }
          let params = processEventArgs(
            this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName
          );
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([, , , , , , , , , , event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
    eventType === 'input' &&
    ret.length === 1 &&
    typeof ret[0] !== 'undefined'
  ) {
    return ret[0]
  }
}

class EventChannel {
  constructor (id, events) {
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(name => {
        this.on(name, events[name]);
      });
    }
  }

  emit (eventName, ...args) {
    const fns = this.listener[eventName];
    if (!fns) {
      return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args)
    }
    fns.forEach(opt => {
      opt.fn.apply(opt.fn, args);
    });
    this.listener[eventName] = fns.filter(opt => opt.type !== 'once');
  }

  on (eventName, fn) {
    this._addListener(eventName, 'on', fn);
    this._clearCache(eventName);
  }

  once (eventName, fn) {
    this._addListener(eventName, 'once', fn);
    this._clearCache(eventName);
  }

  off (eventName, fn) {
    const fns = this.listener[eventName];
    if (!fns) {
      return
    }
    if (fn) {
      for (let i = 0; i < fns.length;) {
        if (fns[i].fn === fn) {
          fns.splice(i, 1);
          i--;
        }
        i++;
      }
    } else {
      delete this.listener[eventName];
    }
  }

  _clearCache (eventName) {
    const cacheArgs = this.emitCache[eventName];
    if (cacheArgs) {
      for (; cacheArgs.length > 0;) {
        this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
      }
    }
  }

  _addListener (eventName, type, fn) {
    (this.listener[eventName] || (this.listener[eventName] = [])).push({
      fn,
      type
    });
  }
}

const eventChannels = {};

function getEventChannel (id) {
  const eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel
}

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound',
  'onThemeChange',
  'onUnhandledRejection'
];

function initEventChannel () {
  Vue.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__
  };
  const callHook = Vue.prototype.__call_hook;
  Vue.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args)
  };
}

function initScopedSlotsParams () {
  const center = {};
  const parents = {};

  function currentId (fn) {
    const vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      const vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }

  Vue.prototype.$hasSSP = function (vueId) {
    const slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', () => {
        delete parents[vueId];
      });
    }
    return slot
  };

  Vue.prototype.$getSSP = function (vueId, name, needAll) {
    const slot = center[vueId];
    if (slot) {
      const params = slot[name] || [];
      if (needAll) {
        return params
      }
      return params[0]
    }
  };

  Vue.prototype.$setSSP = function (name, value) {
    let index = 0;
    currentId.call(this, vueId => {
      const slot = center[vueId];
      const params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index
  };

  Vue.prototype.$initSSP = function () {
    currentId.call(this, vueId => {
      center[vueId] = {};
    });
  };

  Vue.prototype.$callSSP = function () {
    currentId.call(this, vueId => {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };

  Vue.mixin({
    destroyed () {
      const propsData = this.$options.propsData;
      const vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}

function parseBaseApp (vm, {
  mocks,
  initRefs
}) {
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    Vue.prototype.$store = vm.$options.store;
  }
  uniIdMixin(Vue);

  Vue.prototype.mpHost = "mp-xhs";

  Vue.mixin({
    beforeCreate () {
      if (!this.$options.mpType) {
        return
      }

      this.mpType = this.$options.mpType;

      this.$mp = {
        data: {},
        [this.mpType]: this.$options.mpInstance
      };

      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') { // hack vue-i18n
        const app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  const appOptions = {
    onLaunch (args) {
      if (this.$vm) { // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this
      };

      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  const methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(name => {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(Vue, vm, normalizeLocale(xhs.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions
}

function parseApp (vm) {
  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}

function parseApp$1 (vm) {
  return parseApp(vm)
}

function createApp (vm) {
  App(parseApp$1(vm));
  return vm
}

const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16);
const commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = str => encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',');

function stringifyQuery (obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map(key => {
    const val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encodeStr(key)
    }

    if (Array.isArray(val)) {
      const result = [];
      val.forEach(val2 => {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&')
    }

    return encodeStr(key) + '=' + encodeStr(val)
  }).filter(x => x.length > 0).join('&') : null;
  return res ? `?${res}` : ''
}

const isComponent2 = xhs.canIUse('component2');

function initSpecialMethods (mpInstance) {
  if (!mpInstance.$vm) {
    return
  }
  let path = mpInstance.is || mpInstance.route;
  if (!path) {
    return
  }
  if (path.indexOf('/') === 0) {
    path = path.substr(1);
  }
  const specialMethods = xhs.specialMethods && xhs.specialMethods[path];
  if (specialMethods) {
    specialMethods.forEach(method => {
      if (isFn(mpInstance.$vm[method])) {
        mpInstance[method] = function (event) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {};
            event.detail.markerId = event.markerId;
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event);
        };
      }
    });
  }
}

const handleWrap = function (mp, destory) {
  const vueId = mp.props.vueId;
  const list = (mp.props['data-event-list'] || '').split(',');
  list.forEach(eventName => {
    const key = `${eventName}${vueId}`;
    if (destory) {
      delete this[key];
    } else {
      // TODO remove handleRef
      this[key] = function () {
        mp.props[eventName].apply(this, arguments);
      };
    }
  });
};

const hooks$1 = [
  'onShow',
  'onHide',
  'onUnload'
];

hooks$1.push(...PAGE_EVENT_HOOKS);

function parsePage (vuePageOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions);

  const pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, Vue.prototype),
    onLoad (query) {
      const properties = this.props;

      this.__query = query;
      this.__options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties
      };
    },
    onReady () {
      // initChildVues(this)
      // 初始化 vue 实例
      this.$vm = new VueComponent(this.__options);

      // 触发首次 setData
      this.$vm.$mount();

      initSpecialMethods(this);
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      // mounted => onLoad
      this.options = this.__query;
      this.$vm.$mp.query = this.__query; // 兼容 mpvue
      const copyQuery = Object.assign({}, this.__query);
      delete copyQuery.__id__;
      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery)
      };

      this.$vm.__call_hook('onLoad', this.__query);
      this.$vm.__call_hook('onShow');
      setTimeout(() => {
        this.$vm.__call_hook('onReady');
      });
    },
    onUnload () {
      this.$vm.__call_hook('onUnload');
      this.$vm.$destroy();
    },
    // __r: handleRef,
    __e: handleEvent,
    __l: handleLink,
    __w: handleWrap,
    triggerEvent: function noop () {}
  };

  initHooks(pageOptions, hooks$1, vueOptions);
  initUnknownHooks(pageOptions, vueOptions, ['onReady']);

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      pageOptions[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      };
    });
  }

  return pageOptions
}

function createPage (vuePageOptions) {
  {
    return Page(parsePage(vuePageOptions))
  }
}

function parseBaseComponent (vueComponentOptions, {
  isPage,
  initRelation
} = {}, needVueOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions);

  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    ...(vueOptions.options || {})
  };

  const componentOptions = {
    options,
    data: initData(vueOptions, Vue.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached () {
        const properties = this.properties;

        const options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };

        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready () {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached () {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show (args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide () {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize (size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      };
    });
  }

  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent]
  }
  if (isPage) {
    return componentOptions
  }
  return [componentOptions, VueComponent]
}

function parseComponent (vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage,
    initRelation
  }, needVueOptions)
}

/**
 * 用于延迟调用 setData
 * 在 setData 真实调用的时机需执行 fixSetDataEnd
 * @param {*} mpInstance
 */
function fixSetDataStart (mpInstance) {
  const setData = mpInstance.setData;
  const setDataArgs = [];
  mpInstance.setData = function () {
    setDataArgs.push(arguments);
  };
  mpInstance.__fixInitData = function () {
    this.setData = setData;
    const fn = () => {
      setDataArgs.forEach(args => {
        setData.apply(this, args);
      });
    };
    if (setDataArgs.length) {
      if (this.groupSetData) {
        this.groupSetData(fn);
      } else {
        fn();
      }
    }
  };
}
/**
 * 恢复真实的 setData 方法
 * @param {*} mpInstance
 */
function fixSetDataEnd (mpInstance) {
  if (mpInstance.__fixInitData) {
    mpInstance.__fixInitData();
    delete mpInstance.__fixInitData;
  }
}

// import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

function parseComponent$1 (vueComponentOptions, needVueOptions) {
  const [componentOptions, vueOptions] = parseComponent(vueComponentOptions, true);
  const oldAttached = componentOptions.lifetimes.attached;
  componentOptions.lifetimes.attached = function attached () {
    // 暂不区分版本
    if (isPage.call(this)) {
      fixSetDataStart(this);
      setTimeout(() => {
        fixSetDataEnd(this);
      }, 0);
    }
    oldAttached.call(this);
  };
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}

function createComponent (vueOptions) {
  {
    return Component(parseComponent$1(vueOptions))
  }
}

function createSubpackageApp (vm) {
  const appOptions = parseApp$1(vm);
  const app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  const globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(name => {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(name => {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && xhs.onAppShow) {
    xhs.onAppShow((...args) => {
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && xhs.onAppHide) {
    xhs.onAppHide((...args) => {
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    const args = xhs.getLaunchOptionsSync && xhs.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm
}

function createPlugin (vm) {
  const appOptions = parseApp$1(vm);
  if (isFn(appOptions.onShow) && xhs.onAppShow) {
    xhs.onAppShow((...args) => {
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && xhs.onAppHide) {
    xhs.onAppHide((...args) => {
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    const args = xhs.getLaunchOptionsSync && xhs.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm
}

todos.forEach(todoApi => {
  protocols[todoApi] = false;
});

canIUses.forEach(canIUseApi => {
  const apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name
    : canIUseApi;
  if (!xhs.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

let uni = {};

if (typeof Proxy !== 'undefined' && "mp-xhs" !== 'app-plus') {
  uni = new Proxy({}, {
    get (target, name) {
      if (hasOwn(target, name)) {
        return target[name]
      }
      if (baseApi[name]) {
        return baseApi[name]
      }
      if (api[name]) {
        return promisify(name, api[name])
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name])
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name])
        }
      }
      if (eventApi[name]) {
        return eventApi[name]
      }
      return promisify(name, wrapper(name, xhs[name]))
    },
    set (target, name, value) {
      target[name] = value;
      return true
    }
  });
} else {
  Object.keys(baseApi).forEach(name => {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(name => {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(name => {
      uni[name] = promisify(name, extraApi[name]);
    });
  }

  Object.keys(eventApi).forEach(name => {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(xhs).forEach(name => {
    if (hasOwn(xhs, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, xhs[name]));
    }
  });
}

xhs.createApp = createApp;
xhs.createPage = createPage;
xhs.createComponent = createComponent;
xhs.createSubpackageApp = createSubpackageApp;
xhs.createPlugin = createPlugin;

var uni$1 = uni;

export default uni$1;
export { createApp, createComponent, createPage, createPlugin, createSubpackageApp };
