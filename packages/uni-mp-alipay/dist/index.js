import Vue from 'vue';
import { initVueI18n } from '@dcloudio/uni-i18n';

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
  const token = ( my).getStorageSync('uni_id_token') || '';
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

function wrapperHook (hook) {
  return function (data) {
    return hook(data) || data
  }
}

function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function queue (hooks, data) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
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
        queue(interceptor[name], res).then((res) => {
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
        return api(wrapperOptions(interceptor, options), ...params)
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
  /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

const CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
const ASYNC_API = ['createBLEConnection'];

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
  if (!shouldPromise(name)) {
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
  } = my.getSystemInfoSync(); // uni=>my runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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

function getLocale () {
  // 优先使用 $locale
  const app = getApp({
    allowDefault: true
  });
  if (app && app.$vm) {
    return app.$vm.$locale
  }
  return my.getSystemInfoSync().language || 'zh-Hans'
}

function setLocale (locale) {
  const app = getApp();
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
  global.getLocale = getLocale;
}

const interceptors = {
  promiseInterceptor
};

var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});

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

const eventChannelStack = [];

let id = 0;

function initEventChannel (events, cache = true) {
  id++;
  const eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel
}

function getEventChannel (id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel
  }
  return eventChannelStack.shift()
}

var navigateTo = {
  args (fromArgs, toArgs) {
    const id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue (fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  }
};

function findExistsPageIndex (url) {
  const pages = getCurrentPages();
  let len = pages.length;
  while (len--) {
    const page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len
    }
  }
  return -1
}

var redirectTo = {
  name (fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack'
    }
    return 'redirectTo'
  },
  args (fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      const existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        const delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};

function setStorageSync (key, data) {
  return my.setStorageSync({
    key,
    data
  })
}
function getStorageSync (key) {
  const result = my.getStorageSync({
    key
  });
  // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
  return result.data !== null ? result.data : ''
}
function removeStorageSync (key) {
  return my.removeStorageSync({
    key
  })
}

const UUID_KEY = '__DC_STAT_UUID';
let deviceId;
function addUuid (result) {
  deviceId = deviceId || getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    my.setStorage({
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
      bottom: result.windowHeight - safeArea.bottom
    };
  }
}

function normalizePlatform (result) {
  let platform = result.platform ? result.platform.toLowerCase() : 'devtools';
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools';
  }
  result.platform = platform;
}

var getSystemInfo = {
  returnValue: function (result) {
    addUuid(result);
    addSafeAreaInsets(result);
    normalizePlatform(result);
  }
};

// 不支持的 API 列表
const todos = [
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage'
  // 'getRecorderManager',
  // 'getBackgroundAudioManager',
  // 'createInnerAudioContext',
  // 'createCameraContext',
  // 'createLivePlayerContext',
  // 'startAccelerometer',
  // 'startCompass',
  // 'authorize',
  // 'chooseInvoiceTitle',
  // 'addTemplate',
  // 'deleteTemplate',
  // 'getTemplateLibraryById',
  // 'getTemplateLibraryList',
  // 'getTemplateList',
  // 'sendTemplateMessage',
  // 'setEnableDebug',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'onWindowResize',
  // 'offWindowResize'
];

// 存在兼容性的 API 列表
const canIUses = [
  'startPullDownRefresh',
  'setTabBarItem',
  'setTabBarStyle',
  'hideTabBar',
  'showTabBar',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'openSetting',
  'getSetting',
  'createIntersectionObserver',
  'getUpdateManager',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'openDocument',
  'createVideoContext',
  'onMemoryWarning',
  'addPhoneContact'
];

function _handleNetworkInfo (result) {
  switch (result.networkType) {
    case 'NOTREACHABLE':
      result.networkType = 'none';
      break
    case 'WWAN':
      // TODO ?
      result.networkType = '3g';
      break
    default:
      result.networkType = result.networkType.toLowerCase();
      break
  }
  return {}
}

const protocols = { // 需要做转换的 API 列表
  navigateTo,
  redirectTo,
  returnValue (methodName, res = {}) { // 通用 returnValue 解析
    if (res.error || res.errorMessage) {
      res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`;
      delete res.error;
      delete res.errorMessage;
    } else {
      res.errMsg = `${methodName}:ok`;
    }
    return res
  },
  request: {
    name: my.canIUse('request') ? 'request' : 'httpRequest',
    args (fromArgs) {
      const method = fromArgs.method || 'GET';
      if (!fromArgs.header) { // 默认增加 header 参数，方便格式化 content-type
        fromArgs.header = {};
      }
      const headers = {
        'content-type': 'application/json'
      };
      Object.keys(fromArgs.header).forEach(key => {
        headers[key.toLocaleLowerCase()] = fromArgs.header[key];
      });
      return {
        header (header = {}, toArgs) {
          return {
            name: 'headers',
            value: headers
          }
        },
        data (data) {
          // 钉钉小程序在content-type为application/json时需上传字符串形式data，使用my.dd在真机运行钉钉小程序时不能正确判断
          if (my.canIUse('saveFileToDingTalk') && method.toUpperCase() === 'POST' && headers['content-type'].indexOf(
            'application/json') === 0 && isPlainObject(data)) {
            return {
              name: 'data',
              value: JSON.stringify(data)
            }
          }
          return {
            name: 'data',
            value: data
          }
        },
        method: 'method', // TODO 支付宝小程序仅支持 get,post
        responseType: false
      }
    },
    returnValue: {
      status: 'statusCode',
      headers: 'header'
    }
  },
  setNavigationBarColor: {
    name: 'setNavigationBar',
    args: {
      frontColor: false,
      animation: false
    }
  },
  setNavigationBarTitle: {
    name: 'setNavigationBar'
  },
  showModal ({
    showCancel = true
  } = {}) {
    if (showCancel) {
      return {
        name: 'confirm',
        args: {
          cancelColor: false,
          confirmColor: false,
          cancelText: 'cancelButtonText',
          confirmText: 'confirmButtonText'
        },
        returnValue (fromRes, toRes) {
          toRes.confirm = fromRes.confirm;
          toRes.cancel = !fromRes.confirm;
        }
      }
    }
    return {
      name: 'alert',
      args: {
        confirmColor: false,
        confirmText: 'buttonText'
      },
      returnValue (fromRes, toRes) {
        toRes.confirm = true;
        toRes.cancel = false;
      }
    }
  },
  showToast ({
    icon = 'success'
  } = {}) {
    const args = {
      title: 'content',
      icon: 'type',
      duration: false,
      image: false,
      mask: false
    };
    if (icon === 'loading') {
      return {
        name: 'showLoading',
        args
      }
    }
    return {
      name: 'showToast',
      args
    }
  },
  showActionSheet: {
    name: 'showActionSheet',
    args: {
      itemList: 'items',
      itemColor: false
    },
    returnValue: {
      index: 'tapIndex'
    }
  },
  showLoading: {
    args: {
      title: 'content',
      mask: false
    }
  },
  uploadFile: {
    args: {
      name: 'fileName'
    }
    // 从测试结果看，是有返回对象的，文档上没有说明。
  },
  downloadFile: {
    returnValue: {
      apFilePath: 'tempFilePath'
    }
  },
  getFileInfo: {
    args: {
      filePath: 'apFilePath'
    }
  },
  compressImage: {
    args (fromArgs) {
      fromArgs.compressLevel = 4;
      if (fromArgs && fromArgs.quality) {
        fromArgs.compressLevel = Math.floor(fromArgs.quality / 26);
      }
      fromArgs.apFilePaths = [fromArgs.src];
    },
    returnValue (result) {
      if (result.apFilePaths && result.apFilePaths.length) {
        result.tempFilePath = result.apFilePaths[0];
      }
    }
  },
  chooseVideo: {
    // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
    returnValue: {
      apFilePath: 'tempFilePath'
    }
  },
  connectSocket: {
    args: {
      method: false,
      protocols: false
    }
    // TODO 有没有返回值还需要测试下
  },
  chooseImage: {
    returnValue (result) {
      const hasTempFilePaths = hasOwn(result, 'tempFilePaths') && result.tempFilePaths;
      if (hasOwn(result, 'apFilePaths') && !hasTempFilePaths) {
        result.tempFilePaths = result.apFilePaths;
        delete result.apFilePaths;
      }
      if (!hasOwn(result, 'tempFiles') && hasTempFilePaths) {
        result.tempFiles = [];
        result.tempFilePaths.forEach(tempFilePath => result.tempFiles.push({ path: tempFilePath }));
      }
      return {}
    }
  },
  previewImage: {
    args (fromArgs) {
      // 支付宝小程序的 current 是索引值，而非图片地址。
      const currentIndex = Number(fromArgs.current);
      if (isNaN(currentIndex)) {
        if (fromArgs.current && Array.isArray(fromArgs.urls)) {
          const index = fromArgs.urls.indexOf(fromArgs.current);
          fromArgs.current = ~index ? index : 0;
        }
      } else {
        fromArgs.current = currentIndex;
      }
      return {
        indicator: false,
        loop: false
      }
    }
  },
  saveFile: {
    args: {
      tempFilePath: 'apFilePath'
    },
    returnValue: {
      apFilePath: 'savedFilePath'
    }
  },
  getSavedFileInfo: {
    args: {
      filePath: 'apFilePath'
    }
  },
  getSavedFileList: {
    returnValue (result) {
      if (result.fileList && result.fileList.length) {
        result.fileList.forEach(file => {
          file.filePath = file.apFilePath;
          delete file.apFilePath;
        });
      }
      return {}
    }
  },
  removeSavedFile: {
    args: {
      filePath: 'apFilePath'
    }
  },
  getLocation: {
    args: {
      type: false,
      altitude: false
    }
  },
  openLocation: {
    args: {
      // TODO address 参数在阿里上是必传的
    }
  },
  getNetworkType: {
    returnValue: _handleNetworkInfo
  },
  onNetworkStatusChange: {
    returnValue: _handleNetworkInfo
  },
  stopAccelerometer: {
    name: 'offAccelerometerChange'
  },
  stopCompass: {
    name: 'offCompassChange'
  },
  scanCode: {
    name: 'scan',
    args (fromArgs) {
      if (fromArgs.scanType) {
        switch (fromArgs.scanType[0]) {
          case 'qrCode':
            fromArgs.type = 'qr';
            break
          case 'barCode':
            fromArgs.type = 'bar';
            break
        }
      }
      return {
        onlyFromCamera: 'hideAlbum'
      }
    },
    returnValue: {
      code: 'result'
    }
  },
  setClipboardData: {
    name: 'setClipboard',
    args: {
      data: 'text'
    }
  },
  getClipboardData: {
    name: 'getClipboard',
    returnValue: {
      text: 'data'
    }
  },
  login: {
    name: 'getAuthCode',
    returnValue (result) {
      result.code = result.authCode;
    }
  },
  getUserInfo: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue (result) {
      if (my.canIUse('getOpenUserInfo')) {
        let response = {};
        try {
          response = JSON.parse(result.response).response;
        } catch (e) {}
        result.nickName = response.nickName;
        result.avatar = response.avatar;
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar
      };
    }
  },
  getUserProfile: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue (result) {
      if (my.canIUse('getOpenUserInfo')) {
        let response = {};
        try {
          response = JSON.parse(result.response).response;
        } catch (e) {}
        result.nickName = response.nickName;
        result.avatar = response.avatar;
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar
      };
    }
  },
  requestPayment: {
    name: 'tradePay',
    args: {
      orderInfo: 'tradeNO'
    }
  },
  getBLEDeviceServices: {
    returnValue (result) {
      result.services.forEach((item) => {
        item.uuid = item.serviceId;
      });
    }
  },
  createBLEConnection: {
    name: 'connectBLEDevice',
    args: {
      timeout: false
    }
  },
  closeBLEConnection: {
    name: 'disconnectBLEDevice'
  },
  onBLEConnectionStateChange: {
    name: 'onBLEConnectionStateChanged'
  },
  makePhoneCall: {
    args: {
      phoneNumber: 'number'
    }
  },
  stopGyroscope: {
    name: 'offGyroscopeChange'
  },
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  // 文档没提到，但是实测可用。
  canvasToTempFilePath: {
    returnValue (result) {
      // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
      result.tempFilePath = result.apFilePath;
    }
  },
  setScreenBrightness: {
    args: {
      value: 'brightness'
    }
  },
  getScreenBrightness: {
    returnValue: {
      brightness: 'value'
    }
  },
  showShareMenu: {
    name: 'showSharePanel'
  },
  hideHomeButton: {
    name: 'hideBackHome'
  },
  saveImageToPhotosAlbum: {
    name: 'saveImage',
    args: {
      filePath: 'url'
    }
  },
  saveVideoToPhotosAlbum: {
    args: {
      filePath: 'src'
    }
  },
  chooseAddress: {
    name: 'getAddress',
    returnValue (result) {
      const info = result.result || {};
      result.userName = info.fullname;
      result.provinceName = info.prov;
      result.cityName = info.city;
      result.countyName = info.area;
      result.detailInfo = info.address;
      result.telNumber = info.mobilePhone;
      result.errMsg = result.resultStatus;
    }
  }
};

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
          console.warn(`The '${methodName}' method of platform '支付宝小程序' does not support option '${key}'`);
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
        console.error(`Platform '支付宝小程序' does not support '${methodName}'.`);
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
      const returnValue = my[methodName].apply(my, args);
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
  oauth: ['alipay'],
  share: ['alipay'],
  payment: ['alipay'],
  push: ['alipay']
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

function createMediaQueryObserver () {
  const mediaQueryObserver = {};
  const {
    windowWidth,
    windowHeight
  } = my.getSystemInfoSync();

  const orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';

  mediaQueryObserver.observe = (options, callback) => {
    let matches = true;
    for (const item in options) {
      const itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }

        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }

        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches
          }
        }
      }
    }
    callback(matches);

    return matches
  };

  mediaQueryObserver.disconnect = () => {
  };

  return mediaQueryObserver
}

function startGyroscope (params) {
  if (hasOwn(params, 'interval')) {
    console.warn('支付宝小程序 startGyroscope暂不支持interval');
  }
  params.success && params.success({
    errMsg: 'startGyroscope:ok'
  });
  params.complete && params.complete({
    errMsg: 'startGyroscope:ok'
  });
}

function createExecCallback (execCallback) {
  return function wrapperExecCallback (res) {
    this.actions.forEach((action, index) => {
      (action._$callbacks || []).forEach(callback => {
        callback(res[index]);
      });
    });
    if (isFn(execCallback)) {
      execCallback(res);
    }
  }
}

function addCallback (callback) {
  if (isFn(callback)) {
    const action = this.actions[this.actions.length - 1];
    if (action) {
      (action._$callbacks || (action._$callbacks = [])).push(callback);
    }
  }
}

function createSelectorQuery () {
  const query = my.createSelectorQuery();

  const oldExec = query.exec;
  const oldScrollOffset = query.scrollOffset;
  const oldBoundingClientRect = query.boundingClientRect;
  query.exec = function exec (callback) {
    return oldExec.call(this, createExecCallback(callback).bind(this))
  };
  query.scrollOffset = function scrollOffset (callback) {
    const ret = oldScrollOffset.call(this);
    addCallback.call(this, callback);
    return ret
  };
  query.boundingClientRect = function boundingClientRect (callback) {
    const ret = oldBoundingClientRect.call(this);
    addCallback.call(this, callback);
    return ret
  };

  if (!query.fields) {
    query.fields = function ({ rect, size, scrollOffset } = {}, callback) {
      if (rect || size) {
        this.boundingClientRect();
      }
      if (scrollOffset) {
        this.scrollOffset();
      }
      addCallback.call(this, callback);
      return this
    };
  }

  if (!query.in) {
    query.in = function () {
      return this
    };
  }
  return query
}

function createIntersectionObserver (component, options) {
  if (options && options.observeAll) {
    options.selectAll = options.observeAll;
    delete options.observeAll;
  }
  return my.createIntersectionObserver(options)
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  startGyroscope: startGyroscope,
  createSelectorQuery: createSelectorQuery,
  createIntersectionObserver: createIntersectionObserver,
  createMediaQueryObserver: createMediaQueryObserver,
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync
});

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

  if (isFn(vueOptions[hook])) {
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
    } catch (e) {}
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
      behaviors.push(behavior.replace('uni://', `${"my"}://`));
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
  { // alipay 重复定义props会报错,下边的代码对于其他平台也没有意义，保险起见，仅对alipay做处理
    return
  }
}

function parsePropType (key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0]
  }
  return type
}

function initProperties (props, isBehavior = false, file = '') {
  const properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null
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
  } catch (e) {}

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

function processEventExtra (vm, extra, event) {
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
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
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
  if (isCustom) { // 自定义事件
    isCustomMPEvent = event.currentTarget &&
      event.currentTarget.dataset &&
      event.currentTarget.dataset.comType === 'wx';
    if (!args.length) { // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event]
      }
      return event.detail.__args__ || event.detail
    }
  }

  const extraObj = processEventExtra(vm, extra, event);

  const ret = [];
  args.forEach(arg => {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) { // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
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
            throw new Error(` _vm.${methodName} is not a function`)
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

const messages = {};

let locale;

{
  locale = my.getSystemInfoSync().language;
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
const setLocale$1 = i18n.setLocale;
const getLocale$1 = i18n.getLocale;

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

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound',
  'onThemeChange',
  'onUnhandledRejection'
];

function initEventChannel$1 () {
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

  Vue.prototype.$hasScopedSlotsParams = function (vueId) {
    const has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', () => {
        delete parents[vueId];
      });
    }
    return has
  };

  Vue.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    const data = center[vueId];
    if (data) {
      const object = data[name] || {};
      return key ? object[key] : object
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', () => {
        delete parents[vueId];
      });
    }
  };

  Vue.prototype.$setScopedSlotsParams = function (name, value) {
    const vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      const vueId = vueIds.split(',')[0];
      const object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
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
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    Vue.prototype.$store = vm.$options.store;
  }
  uniIdMixin(Vue);

  Vue.prototype.mpHost = "mp-alipay";

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

  initAppLocale(Vue, vm, my.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions
}

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

const isArray = Array.isArray;
const keyList = Object.keys;

function equal (a, b) {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const arrA = isArray(a);
    const arrB = isArray(b);
    let i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false
      }
      return true
    }
    if (arrA !== arrB) return false

    const dateA = a instanceof Date;
    const dateB = b instanceof Date;
    if (dateA !== dateB) return false
    if (dateA && dateB) return a.getTime() === b.getTime()

    const regexpA = a instanceof RegExp;
    const regexpB = b instanceof RegExp;
    if (regexpA !== regexpB) return false
    if (regexpA && regexpB) return a.toString() === b.toString()

    const keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) {
      return false
    }
    for (i = length; i-- !== 0;) {
      if (!hasOwn.call(b, keys[i])) return false
    }
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false
    }

    return true
  }

  return false
}

const customizeRE = /:/g;

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
});

const isComponent2 = my.canIUse('component2');

const mocks = ['$id'];

function initRefs () {

}

function initRelation (detail) {
  this.props.onVueInit(detail);
}

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
  const specialMethods = my.specialMethods && my.specialMethods[path];
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

function initChildVues (mpInstance) {
  // 此时需保证当前 mpInstance 已经存在 $vm
  if (!mpInstance.$vm) {
    return
  }
  mpInstance._$childVues && mpInstance._$childVues.forEach(({
    vuePid,
    vueOptions,
    VueComponent,
    mpInstance: childMPInstance
  }) => {
    // 父子关系
    handleLink.call(mpInstance, {
      detail: {
        vuePid,
        vueOptions
      }
    });

    childMPInstance.$vm = new VueComponent(vueOptions);

    initSpecialMethods(childMPInstance);

    handleRef.call(vueOptions.parent.$scope, childMPInstance);

    childMPInstance.$vm.$mount();

    initChildVues(childMPInstance);

    childMPInstance.$vm._isMounted = true;
    childMPInstance.$vm.__call_hook('mounted');
    childMPInstance.$vm.__call_hook('onReady');
  });

  delete mpInstance._$childVues;
}

function handleProps (ref) {
  const eventProps = {};
  let refProps = ref.props;
  const eventList = refProps['data-event-list'].split(',');
  // 初始化支付宝小程序组件事件
  Object.keys(refProps).forEach(key => {
    if (eventList.includes(key)) {
      const handler = refProps[key];
      const res = key.match(/^on([A-Z])(\S*)/);
      const event = res && (res[1].toLowerCase() + res[2]);
      refProps[key] = eventProps[key] = function () {
        const props = Object.assign({}, refProps);
        props[key] = handler;
        // 由于支付宝事件可能包含多个参数，不使用微信小程序事件格式
        delete props['data-com-type'];
        triggerEvent.bind({ props })(event, {
          __args__: [...arguments]
        });
      };
    }
  });
  // 处理 props 重写
  Object.defineProperty(ref, 'props', {
    get () {
      return refProps
    },
    set (value) {
      refProps = Object.assign(value, eventProps);
    }
  });
}

function handleRef (ref) {
  if (!ref) {
    return
  }
  if (ref.props['data-com-type'] === 'wx') {
    handleProps(ref);
  }
  const refName = ref.props['data-ref'];
  const refInForName = ref.props['data-ref-in-for'];
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || ref;
  } else if (refInForName) {
    (this.$vm.$refs[refInForName] || (this.$vm.$refs[refInForName] = [])).push(ref.$vm || ref);
  }
}

function triggerEvent (type, detail, options) {
  const handler = this.props && this.props[customize('on-' + type)];
  if (!handler) {
    return
  }

  const eventOpts = this.props['data-event-opts'];
  const eventParams = this.props['data-event-params'];
  const comType = this.props['data-com-type'];

  const target = {
    dataset: {
      eventOpts,
      eventParams,
      comType
    }
  };

  handler({
    type: customize(type),
    target,
    currentTarget: target,
    detail
  });
}

const IGNORES = ['$slots', '$scopedSlots'];

function createObserver$1 (isDidUpdate) {
  return function observe (props) {
    const prevProps = isDidUpdate ? props : this.props;
    const nextProps = isDidUpdate ? this.props : props;
    if (equal(prevProps, nextProps)) {
      return
    }
    Object.keys(prevProps).forEach(name => {
      if (IGNORES.indexOf(name) === -1) {
        const prevValue = prevProps[name];
        const nextValue = nextProps[name];
        if (!isFn(prevValue) && !isFn(nextValue) && !equal(prevValue, nextValue)) {
          this.$vm[name] = nextProps[name];
        }
      }
    });
  }
}

const handleLink$1 = (function () {
  if (isComponent2) {
    return function handleLink$1 (detail) {
      return handleLink.call(this, {
        detail
      })
    }
  }
  return function handleLink$1 (detail) {
    if (this.$vm && this.$vm._isMounted) { // 父已初始化
      return handleLink.call(this, {
        detail: {
          vuePid: detail.vuePid,
          vueOptions: detail.vueOptions
        }
      })
    }
    // 支付宝通过 didMount 来实现，先子后父，故等父 ready 之后，统一初始化
    (this._$childVues || (this._$childVues = [])).unshift(detail);
  }
})();

const handleWrap = function (mp, destory) {
  const vueId = mp.props.vueId;
  const list = mp.props['data-event-list'].split(',');
  list.forEach(eventName => {
    const key = `${eventName}${vueId}`;
    if (destory) {
      delete this[key];
    } else {
      this[key] = function () {
        mp.props[eventName].apply(this, arguments);
      };
    }
  });
  if (!destory) {
    handleProps(mp);
  }
};

function parseApp (vm) {
  Object.defineProperty(Vue.prototype, '$slots', {
    get () {
      return this.$scope && this.$scope.props.$slots
    },
    set () {

    }
  });
  Object.defineProperty(Vue.prototype, '$scopedSlots', {
    get () {
      return this.$scope && this.$scope.props.$scopedSlots
    },
    set () {

    }
  });

  Vue.prototype.$onAliGetAuthorize = function onAliGetAuthorize (method, $event) {
    my.getPhoneNumber({
      success: (res) => {
        $event.type = 'getphonenumber';
        const response = JSON.parse(res.response);
        $event.detail.errMsg = 'getPhoneNumber:ok';
        $event.detail.encryptedData = response.response;
        $event.detail.sign = response.sign;
        this[method]($event);
      },
      fail: (res) => {
        $event.type = 'getphonenumber';
        $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + JSON.stringify(res);
        this[method]($event);
      }
    });
  };

  Vue.prototype.$onAliAuthError = function $onAliAuthError (method, $event) {
    $event.type = 'getphonenumber';
    $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + $event.detail.errorMessage;
    this[method]($event);
  };

  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}

function createApp (vm) {
  App(parseApp(vm));
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

const hooks$1 = [
  'onShow',
  'onHide',
  // mp-alipay 特有
  'onTitleClick',
  'onOptionMenuClick',
  'onPopMenuClick',
  'onPullIntercept'
];

hooks$1.push(...PAGE_EVENT_HOOKS);

function parsePage (vuePageOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions);

  const pageOptions = {
    mixins: initBehaviors(vueOptions),
    data: initData(vueOptions, Vue.prototype),
    onLoad (query) {
      const properties = this.props;

      const options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties
      };

      // 初始化 vue 实例
      this.$vm = new VueComponent(options);

      initSpecialMethods(this);

      // 触发首次 setData
      this.$vm.$mount();

      const copyQuery = Object.assign({}, query);
      delete copyQuery.__id__;

      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery)
      };

      this.options = query;
      this.$vm.$mp.query = query; // 兼容 mpvue
      this.$vm.__call_hook('onLoad', query);
    },
    onReady () {
      initChildVues(this);
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    },
    onUnload () {
      this.$vm.__call_hook('onUnload');
      this.$vm.$destroy();
    },
    events: {
      // 支付宝小程序有些页面事件只能放在events下
      onBack () {
        this.$vm.__call_hook('onBackPress');
      }
    },
    __r: handleRef,
    __e: handleEvent,
    __l: handleLink$1,
    __w: handleWrap,
    triggerEvent
  };

  initHooks(pageOptions, hooks$1, vuePageOptions);

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

function initVm (VueComponent) {
  if (this.$vm) {
    return
  }
  const properties = this.props;

  const options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties
  };

  initVueIds(properties.vueId, this);

  if (isComponent2) {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options
    });

    // 初始化 vue 实例
    this.$vm = new VueComponent(options);

    // 触发首次 setData
    this.$vm.$mount();
  } else {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options,
      VueComponent,
      mpInstance: this
    });

    if (options.parent) { // 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
      // 初始化 vue 实例
      this.$vm = new VueComponent(options);
      handleRef.call(options.parent.$scope, this);
      // 触发首次 setData
      this.$vm.$mount();

      initChildVues(this);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    }
  }
}

function parseComponent (vueComponentOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions);

  const properties = initProperties(vueOptions.props, false, vueOptions.__file);

  const props = {
    onVueInit: function () {}
  };

  Object.keys(properties).forEach(key => {
    if (key !== 'vueSlots') {
      props[key] = properties[key].value;
    }
  });

  const componentOptions = {
    mixins: initBehaviors(vueOptions),
    data: initData(vueOptions, Vue.prototype),
    props,
    didMount () {
      if (my.dd) { // 钉钉小程序底层基础库有 bug,组件嵌套使用时,在 didMount 中无法及时调用 props 中的方法
        setTimeout(() => {
          initVm.call(this, VueComponent);
        }, 4);
      } else {
        initVm.call(this, VueComponent);
      }

      initSpecialMethods(this);

      if (isComponent2) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    },
    didUnmount () {
      this.$vm && this.$vm.$destroy();
    },
    methods: {
      __r: handleRef,
      __e: handleEvent,
      __l: handleLink$1,
      __w: handleWrap,
      triggerEvent
    }
  };

  if (isComponent2) {
    componentOptions.onInit = function onInit () {
      initVm.call(this, VueComponent);
    };
    componentOptions.deriveDataFromProps = createObserver$1();
  } else {
    componentOptions.didUpdate = createObserver$1(true);
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      };
    });
  }

  return componentOptions
}

function createComponent (vueOptions) {
  {
    return my.defineComponent(parseComponent(vueOptions))
  }
}

function createSubpackageApp (vm) {
  const appOptions = parseApp(vm);
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
  if (isFn(appOptions.onShow) && my.onAppShow) {
    my.onAppShow((...args) => {
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && my.onAppHide) {
    my.onAppHide((...args) => {
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    const args = my.getLaunchOptionsSync && my.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm
}

function createPlugin (vm) {
  const appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && my.onAppShow) {
    my.onAppShow((...args) => {
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && my.onAppHide) {
    my.onAppHide((...args) => {
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    const args = my.getLaunchOptionsSync && my.getLaunchOptionsSync();
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
  if (!my.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

let uni = {};

if (typeof Proxy !== 'undefined' && "mp-alipay" !== 'app-plus') {
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
      if (!hasOwn(my, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, my[name]))
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
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(name => {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(my).forEach(name => {
    if (hasOwn(my, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, my[name]));
    }
  });
}

my.createApp = createApp;
my.createPage = createPage;
my.createComponent = createComponent;
my.createSubpackageApp = createSubpackageApp;
my.createPlugin = createPlugin;

var uni$1 = uni;

export default uni$1;
export { createApp, createComponent, createPage, createPlugin, createSubpackageApp };
