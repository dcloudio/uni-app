export function createServiceContext(Vue, weex, plus, UniServiceJSBridge,instanceContext){
var setTimeout = instanceContext.setTimeout
var clearTimeout = instanceContext.clearTimeout
var setInterval = instanceContext.setInterval
var clearInterval = instanceContext.clearInterval
var __uniConfig = instanceContext.__uniConfig
var __uniRoutes = instanceContext.__uniRoutes

var serviceContext = (function () {
  'use strict';

  const base = [
    'base64ToArrayBuffer',
    'arrayBufferToBase64',
    'addInterceptor',
    'removeInterceptor',
    'interceptors'
  ];

  const network = [
    'request',
    'uploadFile',
    'downloadFile',
    'connectSocket',
    'onSocketOpen',
    'onSocketError',
    'sendSocketMessage',
    'onSocketMessage',
    'closeSocket',
    'onSocketClose',
    'getUpdateManager',
    'configMTLS'
  ];

  const route = [
    'navigateTo',
    'redirectTo',
    'reLaunch',
    'switchTab',
    'navigateBack'
  ];

  const storage = [
    'setStorage',
    'setStorageSync',
    'getStorage',
    'getStorageSync',
    'getStorageInfo',
    'getStorageInfoSync',
    'removeStorage',
    'removeStorageSync',
    'clearStorage',
    'clearStorageSync'
  ];

  const location = [
    'getLocation',
    'chooseLocation',
    'openLocation',
    'createMapContext'
  ];

  const media = [
    'chooseImage',
    'chooseFile',
    'previewImage',
    'closePreviewImage',
    'getImageInfo',
    'getVideoInfo',
    'saveImageToPhotosAlbum',
    'compressImage',
    'compressVideo',
    'getRecorderManager',
    'getBackgroundAudioManager',
    'createAudioContext',
    'createInnerAudioContext',
    'chooseVideo',
    'saveVideoToPhotosAlbum',
    'createVideoContext',
    'createCameraContext',
    'createLivePlayerContext',
    'createLivePusherContext'
  ];

  const device = [
    'getSystemInfo',
    'getSystemInfoSync',
    'canIUse',
    'onMemoryWarning',
    'getNetworkType',
    'onNetworkStatusChange',
    'offNetworkStatusChange',
    'onAccelerometerChange',
    'offAccelerometerChange',
    'startAccelerometer',
    'stopAccelerometer',
    'onCompassChange',
    'offCompassChange',
    'startCompass',
    'stopCompass',
    'onGyroscopeChange',
    'startGyroscope',
    'stopGyroscope',
    'makePhoneCall',
    'scanCode',
    'setClipboardData',
    'getClipboardData',
    'setScreenBrightness',
    'getScreenBrightness',
    'setKeepScreenOn',
    'onUserCaptureScreen',
    'vibrateLong',
    'vibrateShort',
    'addPhoneContact',
    'openBluetoothAdapter',
    'startBluetoothDevicesDiscovery',
    'onBluetoothDeviceFound',
    'stopBluetoothDevicesDiscovery',
    'onBluetoothAdapterStateChange',
    'getConnectedBluetoothDevices',
    'getBluetoothDevices',
    'getBluetoothAdapterState',
    'closeBluetoothAdapter',
    'writeBLECharacteristicValue',
    'readBLECharacteristicValue',
    'onBLEConnectionStateChange',
    'onBLECharacteristicValueChange',
    'notifyBLECharacteristicValueChange',
    'getBLEDeviceServices',
    'getBLEDeviceCharacteristics',
    'createBLEConnection',
    'closeBLEConnection',
    'setBLEMTU',
    'getBLEDeviceRSSI',
    'onBeaconServiceChange',
    'onBeaconUpdate',
    'getBeacons',
    'startBeaconDiscovery',
    'stopBeaconDiscovery',
    'checkIsSupportSoterAuthentication',
    'checkIsSoterEnrolledInDevice',
    'startSoterAuthentication',
    'onThemeChange',
    'onUIStyleChange'
  ];

  const keyboard = [
    'hideKeyboard',
    'onKeyboardHeightChange',
    'offKeyboardHeightChange',
    'getSelectedTextRange'
  ];

  const ui = [
    'showToast',
    'hideToast',
    'showLoading',
    'hideLoading',
    'showModal',
    'showActionSheet',
    'setNavigationBarTitle',
    'setNavigationBarColor',
    'showNavigationBarLoading',
    'hideNavigationBarLoading',
    'setTabBarItem',
    'setTabBarStyle',
    'hideTabBar',
    'showTabBar',
    'setTabBarBadge',
    'removeTabBarBadge',
    'showTabBarRedDot',
    'hideTabBarRedDot',
    'onTabBarMidButtonTap',
    'setBackgroundColor',
    'setBackgroundTextStyle',
    'createAnimation',
    'pageScrollTo',
    'onWindowResize',
    'offWindowResize',
    'loadFontFace',
    'startPullDownRefresh',
    'stopPullDownRefresh',
    'createSelectorQuery',
    'createIntersectionObserver',
    'createMediaQueryObserver',
    'getMenuButtonBoundingClientRect',
    'showTopWindow',
    'showLeftWindow',
    'showRightWindow',
    'hideTopWindow',
    'hideLeftWindow',
    'hideRightWindow',
    'getTopWindowStyle',
    'getLeftWindowStyle',
    'getRightWindowStyle',
    'setTopWindowStyle',
    'setLeftWindowStyle',
    'setRightWindowStyle',
    'getLocale',
    'setLocale',
    'onLocaleChange'
  ];

  const event = [
    '$emit',
    '$on',
    '$once',
    '$off'
  ];

  const file = [
    'saveFile',
    'getSavedFileList',
    'getSavedFileInfo',
    'removeSavedFile',
    'getFileInfo',
    'openDocument',
    'getFileSystemManager'
  ];

  const canvas = [
    'createOffscreenCanvas',
    'createCanvasContext',
    'canvasToTempFilePath',
    'canvasPutImageData',
    'canvasGetImageData'
  ];

  const third = [
    'getProvider',
    'login',
    'checkSession',
    'getUserInfo',
    'getUserProfile',
    'preLogin',
    'closeAuthView',
    'getCheckBoxState',
    'getUniverifyManager',
    'share',
    'shareWithSystem',
    'showShareMenu',
    'hideShareMenu',
    'requestPayment',
    'subscribePush',
    'unsubscribePush',
    'onPush',
    'offPush',
    'requireNativePlugin',
    'upx2px',
    'restoreGlobal',
    'requireGlobal',
    'getSubNVueById',
    'getCurrentSubNVue',
    'setPageMeta',
    'onHostEventReceive',
    'onNativeEventReceive',
    'sendNativeEvent',
    'preloadPage',
    'unPreloadPage',
    'loadSubPackage',
    'sendHostEvent',
    'navigateToMiniProgram'
  ];

  const ad = [
    'createRewardedVideoAd',
    'createFullScreenVideoAd',
    'createInterstitialAd',
    'createInteractiveAd'
  ];

  const apis = [
    ...base,
    ...network,
    ...route,
    ...storage,
    ...location,
    ...media,
    ...device,
    ...keyboard,
    ...ui,
    ...event,
    ...file,
    ...canvas,
    ...third,
    ...ad
  ];

  var apis_1 = apis;

  let supportsPassive = false;
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', ({
      get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}

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
    const token = ( uni ).getStorageSync('uni_id_token') || '';
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

  function toRawType (val) {
    return _toString.call(val).slice(8, -1)
  }

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

  function getLen (str = '') {
    /* eslint-disable no-control-regex */
    return ('' + str).replace(/[^\x00-\xff]/g, '**').length
  }

  function debounce (fn, delay) {
    let timeout;
    const newFn = function () {
      clearTimeout(timeout);
      const timerFn = () => fn.apply(this, arguments);
      timeout = setTimeout(timerFn, delay);
    };
    newFn.cancel = function () {
      clearTimeout(timeout);
    };
    return newFn
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) return true
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        const isArrayA = Array.isArray(a);
        const isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every((e, i) => {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          const keysA = Object.keys(a);
          const keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(key => {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
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

  const decode = decodeURIComponent;

  function parseQuery (query) {
    const res = {};

    query = query.trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return res
    }

    query.split('&').forEach(param => {
      const parts = param.replace(/\+/g, ' ').split('=');
      const key = decode(parts.shift());
      const val = parts.length > 0
        ? decode(parts.join('='))
        : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });

    return res
  }

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

  function decodedQuery (query = {}) {
    const decodedQuery = {};
    Object.keys(query).forEach(name => {
      try {
        decodedQuery[name] = decode(query[name]);
      } catch (e) {
        decodedQuery[name] = query[name];
      }
    });
    return decodedQuery
  }

  let id = 0;
  const callbacks = {};

  function warp (fn) {
    return function (options = {}) {
      const callbackId = String(id++);
      callbacks[callbackId] = {
        success: options.success,
        fail: options.fail,
        complete: options.complete
      };
      const data = Object.assign({}, options);
      // TODO 下版重构 nvue h5 callback
      // delete data.success
      // delete data.fail
      // delete data.complete
      const res = fn.bind(this)(data, callbackId);
      if (res) {
        invoke(callbackId, res);
      }
    }
  }

  function invoke (callbackId, res) {
    const callback = callbacks[callbackId] || {};
    delete callbacks[callbackId];
    const errMsg = res.errMsg || '';
    if (new RegExp('\\:\\s*fail').test(errMsg)) {
      callback.fail && callback.fail(res);
    } else {
      callback.success && callback.success(res);
    }
    callback.complete && callback.complete(res);
  }

  const callback = {
    warp,
    invoke
  };

  /**
   * 框架内 try-catch
   */
  function tryCatchFramework (fn) {
    return function () {
      try {
        return fn.apply(fn, arguments)
      } catch (e) {
        // TODO
        console.error(e);
      }
    }
  }
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

  const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket'];

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

  function isTaskApi (name) {
    return TASK_APIS.indexOf(name) !== -1
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

  const base64ToArrayBuffer = [{
    name: 'base64',
    type: String,
    required: true
  }];

  const arrayBufferToBase64 = [{
    name: 'arrayBuffer',
    type: [ArrayBuffer, Uint8Array],
    required: true
  }];

  var require_context_module_0_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    base64ToArrayBuffer: base64ToArrayBuffer,
    arrayBufferToBase64: arrayBufferToBase64
  });

  const canIUse = [{
    name: 'schema',
    type: String,
    required: true
  }];

  var require_context_module_0_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    canIUse: canIUse
  });

  const $on = [{
    name: 'event',
    type: [String, Array],
    required: true
  }, {
    name: 'callback',
    type: Function,
    required: true
  }];

  const $once = $on;

  const $off = [{
    name: 'event',
    type: [String, Array]
  }, {
    name: 'callback',
    type: Function
  }];

  const $emit = [{
    name: 'event',
    type: String,
    required: true
  }];

  var require_context_module_0_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $on: $on,
    $once: $once,
    $off: $off,
    $emit: $emit
  });

  const addInterceptor$1 = [{
    name: 'method',
    type: [String, Object],
    required: true
  }];
  const removeInterceptor$1 = addInterceptor$1;

  var require_context_module_0_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addInterceptor: addInterceptor$1,
    removeInterceptor: removeInterceptor$1
  });

  const upx2px = [{
    name: 'upx',
    type: [Number, String],
    required: true
  }];

  var require_context_module_0_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    upx2px: upx2px
  });

  function getInt (method) {
    return function (value, params) {
      if (value) {
        params[method] = Math.round(value);
      }
    }
  }

  const canvasGetImageData = {
    canvasId: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: true,
      validator: getInt('x')
    },
    y: {
      type: Number,
      required: true,
      validator: getInt('y')
    },
    width: {
      type: Number,
      required: true,
      validator: getInt('width')
    },
    height: {
      type: Number,
      required: true,
      validator: getInt('height')
    }
  };

  const canvasPutImageData = {
    canvasId: {
      type: String,
      required: true
    },
    data: {
      type: Uint8ClampedArray,
      required: true
    },
    x: {
      type: Number,
      required: true,
      validator: getInt('x')
    },
    y: {
      type: Number,
      required: true,
      validator: getInt('y')
    },
    width: {
      type: Number,
      required: true,
      validator: getInt('width')
    },
    height: {
      type: Number,
      validator: getInt('height')
    }
  };

  const fileTypes = {
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpg'
  };

  const canvasToTempFilePath = {
    x: {
      type: Number,
      default: 0,
      validator: getInt('x')
    },
    y: {
      type: Number,
      default: 0,
      validator: getInt('y')
    },
    width: {
      type: Number,
      validator: getInt('width')
    },
    height: {
      type: Number,
      validator: getInt('height')
    },
    destWidth: {
      type: Number,
      validator: getInt('destWidth')
    },
    destHeight: {
      type: Number,
      validator: getInt('destHeight')
    },
    canvasId: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      validator (value, params) {
        value = (value || '').toUpperCase();
        params.fileType = value in fileTypes ? fileTypes[value] : fileTypes.PNG;
      }
    },
    quality: {
      type: Number,
      validator (value, params) {
        params.quality = value > 0 && value < 1 ? value : 1;
      }
    }
  };

  const drawCanvas = {
    canvasId: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      required: true
    },
    reserve: {
      type: Boolean,
      default: false
    }
  };

  var require_context_module_0_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    canvasGetImageData: canvasGetImageData,
    canvasPutImageData: canvasPutImageData,
    canvasToTempFilePath: canvasToTempFilePath,
    drawCanvas: drawCanvas
  });

  const validator = [{
    name: 'id',
    type: String,
    required: true
  }];

  const createAudioContext = validator;
  const createVideoContext = validator;
  const createMapContext = validator;
  const createCanvasContext = [{
    name: 'canvasId',
    type: String,
    required: true
  }, {
    name: 'componentInstance',
    type: Object
  }];

  var require_context_module_0_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAudioContext: createAudioContext,
    createVideoContext: createVideoContext,
    createMapContext: createMapContext,
    createCanvasContext: createCanvasContext
  });

  const addPhoneContact = {
    firstName: {
      type: String,
      required: true,
      validator (firstName) {
        if (!firstName) {
          return 'addPhoneContact:fail parameter error: parameter.firstName should not be empty String;'
        }
      }
    }
  };

  var require_context_module_0_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addPhoneContact: addPhoneContact
  });

  const makePhoneCall = {
    phoneNumber: {
      type: String,
      required: true,
      validator (phoneNumber) {
        if (!phoneNumber) {
          return 'makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;'
        }
      }
    }
  };

  var require_context_module_0_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makePhoneCall: makePhoneCall
  });

  const scanCode = {
    onlyFromCamera: {
      type: Boolean
    },
    scanType: {
      type: Array
    },
    autoDecodeCharSet: {
      type: Boolean
    }
  };

  var require_context_module_0_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scanCode: scanCode
  });

  const isArray = Array.isArray;
  const isObject$1 = (val) => val !== null && typeof val === 'object';
  const defaultDelimiters = ['{', '}'];
  class BaseFormatter {
      constructor() {
          this._caches = Object.create(null);
      }
      interpolate(message, values, delimiters = defaultDelimiters) {
          if (!values) {
              return [message];
          }
          let tokens = this._caches[message];
          if (!tokens) {
              tokens = parse(message, delimiters);
              this._caches[message] = tokens;
          }
          return compile(tokens, values);
      }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
      const tokens = [];
      let position = 0;
      let text = '';
      while (position < format.length) {
          let char = format[position++];
          if (char === startDelimiter) {
              if (text) {
                  tokens.push({ type: 'text', value: text });
              }
              text = '';
              let sub = '';
              char = format[position++];
              while (char !== undefined && char !== endDelimiter) {
                  sub += char;
                  char = format[position++];
              }
              const isClosed = char === endDelimiter;
              const type = RE_TOKEN_LIST_VALUE.test(sub)
                  ? 'list'
                  : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                      ? 'named'
                      : 'unknown';
              tokens.push({ value: sub, type });
          }
          //  else if (char === '%') {
          //   // when found rails i18n syntax, skip text capture
          //   if (format[position] !== '{') {
          //     text += char
          //   }
          // }
          else {
              text += char;
          }
      }
      text && tokens.push({ type: 'text', value: text });
      return tokens;
  }
  function compile(tokens, values) {
      const compiled = [];
      let index = 0;
      const mode = isArray(values)
          ? 'list'
          : isObject$1(values)
              ? 'named'
              : 'unknown';
      if (mode === 'unknown') {
          return compiled;
      }
      while (index < tokens.length) {
          const token = tokens[index];
          switch (token.type) {
              case 'text':
                  compiled.push(token.value);
                  break;
              case 'list':
                  compiled.push(values[parseInt(token.value, 10)]);
                  break;
              case 'named':
                  if (mode === 'named') {
                      compiled.push(values[token.value]);
                  }
                  else {
                      if (process.env.NODE_ENV !== 'production') {
                          console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                      }
                  }
                  break;
              case 'unknown':
                  if (process.env.NODE_ENV !== 'production') {
                      console.warn(`Detect 'unknown' type of token!`);
                  }
                  break;
          }
          index++;
      }
      return compiled;
  }

  const LOCALE_ZH_HANS = 'zh-Hans';
  const LOCALE_ZH_HANT = 'zh-Hant';
  const LOCALE_EN = 'en';
  const LOCALE_FR = 'fr';
  const LOCALE_ES = 'es';
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
      return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
      return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages) {
      if (!locale) {
          return;
      }
      locale = locale.trim().replace(/_/g, '-');
      if (messages && messages[locale]) {
          return locale;
      }
      locale = locale.toLowerCase();
      if (locale.indexOf('zh') === 0) {
          if (locale.indexOf('-hans') > -1) {
              return LOCALE_ZH_HANS;
          }
          if (locale.indexOf('-hant') > -1) {
              return LOCALE_ZH_HANT;
          }
          if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
              return LOCALE_ZH_HANT;
          }
          return LOCALE_ZH_HANS;
      }
      const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
      if (lang) {
          return lang;
      }
  }
  class I18n {
      constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
          this.locale = LOCALE_EN;
          this.fallbackLocale = LOCALE_EN;
          this.message = {};
          this.messages = {};
          this.watchers = [];
          if (fallbackLocale) {
              this.fallbackLocale = fallbackLocale;
          }
          this.formater = formater || defaultFormatter;
          this.messages = messages || {};
          this.setLocale(locale || LOCALE_EN);
          if (watcher) {
              this.watchLocale(watcher);
          }
      }
      setLocale(locale) {
          const oldLocale = this.locale;
          this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
          if (!this.messages[this.locale]) {
              // 可能初始化时不存在
              this.messages[this.locale] = {};
          }
          this.message = this.messages[this.locale];
          // 仅发生变化时，通知
          if (oldLocale !== this.locale) {
              this.watchers.forEach((watcher) => {
                  watcher(this.locale, oldLocale);
              });
          }
      }
      getLocale() {
          return this.locale;
      }
      watchLocale(fn) {
          const index = this.watchers.push(fn) - 1;
          return () => {
              this.watchers.splice(index, 1);
          };
      }
      add(locale, message, override = true) {
          const curMessages = this.messages[locale];
          if (curMessages) {
              if (override) {
                  Object.assign(curMessages, message);
              }
              else {
                  Object.keys(message).forEach((key) => {
                      if (!hasOwn$1(curMessages, key)) {
                          curMessages[key] = message[key];
                      }
                  });
              }
          }
          else {
              this.messages[locale] = message;
          }
      }
      f(message, values, delimiters) {
          return this.formater.interpolate(message, values, delimiters).join('');
      }
      t(key, locale, values) {
          let message = this.message;
          if (typeof locale === 'string') {
              locale = normalizeLocale(locale, this.messages);
              locale && (message = this.messages[locale]);
          }
          else {
              values = locale;
          }
          if (!hasOwn$1(message, key)) {
              console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
              return key;
          }
          return this.formater.interpolate(message[key], values).join('');
      }
  }

  function watchAppLocale(appVm, i18n) {
      // 需要保证 watch 的触发在组件渲染之前
      if (appVm.$watchLocale) {
          // vue2
          appVm.$watchLocale((newLocale) => {
              i18n.setLocale(newLocale);
          });
      }
      else {
          appVm.$watch(() => appVm.$locale, (newLocale) => {
              i18n.setLocale(newLocale);
          });
      }
  }
  function getDefaultLocale() {
      if (typeof uni !== 'undefined' && uni.getLocale) {
          return uni.getLocale();
      }
      // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
      if (typeof global !== 'undefined' && global.getLocale) {
          return global.getLocale();
      }
      return LOCALE_EN;
  }
  function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
      // 兼容旧版本入参
      if (typeof locale !== 'string') {
          [locale, messages] = [
              messages,
              locale,
          ];
      }
      if (typeof locale !== 'string') {
          // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
          locale = getDefaultLocale();
      }
      if (typeof fallbackLocale !== 'string') {
          fallbackLocale =
              (typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale) ||
                  LOCALE_EN;
      }
      const i18n = new I18n({
          locale,
          fallbackLocale,
          messages,
          watcher,
      });
      let t = (key, values) => {
          if (typeof getApp !== 'function') {
              // app view
              /* eslint-disable no-func-assign */
              t = function (key, values) {
                  return i18n.t(key, values);
              };
          }
          else {
              let isWatchedAppLocale = false;
              t = function (key, values) {
                  const appVm = getApp().$vm;
                  // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
                  // options: {
                  // 	type: Array,
                  // 	default () {
                  // 		return [{
                  // 			icon: 'shop',
                  // 			text: t("uni-goods-nav.options.shop"),
                  // 		}, {
                  // 			icon: 'cart',
                  // 			text: t("uni-goods-nav.options.cart")
                  // 		}]
                  // 	}
                  // },
                  if (appVm) {
                      // 触发响应式
                      appVm.$locale;
                      if (!isWatchedAppLocale) {
                          isWatchedAppLocale = true;
                          watchAppLocale(appVm, i18n);
                      }
                  }
                  return i18n.t(key, values);
              };
          }
          return t(key, values);
      };
      return {
          i18n,
          f(message, values, delimiters) {
              return i18n.f(message, values, delimiters);
          },
          t(key, values) {
              return t(key, values);
          },
          add(locale, message, override = true) {
              return i18n.add(locale, message, override);
          },
          watch(fn) {
              return i18n.watchLocale(fn);
          },
          getLocale() {
              return i18n.getLocale();
          },
          setLocale(newLocale) {
              return i18n.setLocale(newLocale);
          },
      };
  }
  function isI18nStr(value, delimiters) {
      return value.indexOf(delimiters[0]) > -1;
  }

  const NAVBAR_HEIGHT = 44;

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
  	"uni.chooseFile.notUserActivation": "File chooser dialog can only be shown with a user activation",
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
  	"uni.button.feedback.send": "send",
  	"uni.chooseLocation.search": "Find Place",
  	"uni.chooseLocation.cancel": "Cancel"
  };

  var es = {
  	"uni.app.quit": "Pulse otra vez para salir",
  	"uni.async.error": "Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo.",
  	"uni.showActionSheet.cancel": "Cancelar",
  	"uni.showToast.unpaired": "Tenga en cuenta que showToast debe estar emparejado con hideToast",
  	"uni.showLoading.unpaired": "Tenga en cuenta que showLoading debe estar emparejado con hideLoading",
  	"uni.showModal.cancel": "Cancelar",
  	"uni.showModal.confirm": "OK",
  	"uni.chooseImage.cancel": "Cancelar",
  	"uni.chooseImage.sourceType.album": "Álbum",
  	"uni.chooseImage.sourceType.camera": "Cámara",
  	"uni.chooseVideo.cancel": "Cancelar",
  	"uni.chooseVideo.sourceType.album": "Álbum",
  	"uni.chooseVideo.sourceType.camera": "Cámara",
  	"uni.chooseFile.notUserActivation": "El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario",
  	"uni.previewImage.cancel": "Cancelar",
  	"uni.previewImage.button.save": "Guardar imagen",
  	"uni.previewImage.save.success": "Guardado exitosamente",
  	"uni.previewImage.save.fail": "Error al guardar",
  	"uni.setClipboardData.success": "Contenido copiado",
  	"uni.scanCode.title": "Código de escaneo",
  	"uni.scanCode.album": "Álbum",
  	"uni.scanCode.fail": "Échec de la reconnaissance",
  	"uni.scanCode.flash.on": "Toque para encender la luz",
  	"uni.scanCode.flash.off": "Toque para apagar la luz",
  	"uni.startSoterAuthentication.authContent": "Reconocimiento de huellas dactilares",
  	"uni.picker.done": "OK",
  	"uni.picker.cancel": "Cancelar",
  	"uni.video.danmu": "Danmu",
  	"uni.video.volume": "Volumen",
  	"uni.button.feedback.title": "realimentación",
  	"uni.button.feedback.send": "enviar",
  	"uni.chooseLocation.search": "Encontrar",
  	"uni.chooseLocation.cancel": "Cancelar"
  };

  var fr = {
  	"uni.app.quit": "Appuyez à nouveau pour quitter l'application",
  	"uni.async.error": "La connexion a expiré, cliquez sur l'écran pour réessayer.",
  	"uni.showActionSheet.cancel": "Annuler",
  	"uni.showToast.unpaired": "Veuillez noter que showToast doit être associé à hideToast",
  	"uni.showLoading.unpaired": "Veuillez noter que showLoading doit être associé à hideLoading",
  	"uni.showModal.cancel": "Annuler",
  	"uni.showModal.confirm": "OK",
  	"uni.chooseImage.cancel": "Annuler",
  	"uni.chooseImage.sourceType.album": "Album",
  	"uni.chooseImage.sourceType.camera": "Caméra",
  	"uni.chooseVideo.cancel": "Annuler",
  	"uni.chooseVideo.sourceType.album": "Album",
  	"uni.chooseVideo.sourceType.camera": "Caméra",
  	"uni.chooseFile.notUserActivation": "La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur",
  	"uni.previewImage.cancel": "Annuler",
  	"uni.previewImage.button.save": "Guardar imagen",
  	"uni.previewImage.save.success": "Enregistré avec succès",
  	"uni.previewImage.save.fail": "Échec de la sauvegarde",
  	"uni.setClipboardData.success": "Contenu copié",
  	"uni.scanCode.title": "Code d’analyse",
  	"uni.scanCode.album": "Album",
  	"uni.scanCode.fail": "Fallo de reconocimiento",
  	"uni.scanCode.flash.on": "Appuyez pour activer l'éclairage",
  	"uni.scanCode.flash.off": "Appuyez pour désactiver l'éclairage",
  	"uni.startSoterAuthentication.authContent": "Reconnaissance de l'empreinte digitale",
  	"uni.picker.done": "OK",
  	"uni.picker.cancel": "Annuler",
  	"uni.video.danmu": "Danmu",
  	"uni.video.volume": "Le Volume",
  	"uni.button.feedback.title": "retour d'information",
  	"uni.button.feedback.send": "envoyer",
  	"uni.chooseLocation.search": "Trouve",
  	"uni.chooseLocation.cancel": "Annuler"
  };

  var zhHans = {
  	"uni.app.quit": "再按一次退出应用",
  	"uni.async.error": "连接服务器超时，点击屏幕重试",
  	"uni.showActionSheet.cancel": "取消",
  	"uni.showToast.unpaired": "请注意 showToast 与 hideToast 必须配对使用",
  	"uni.showLoading.unpaired": "请注意 showLoading 与 hideLoading 必须配对使用",
  	"uni.showModal.cancel": "取消",
  	"uni.showModal.confirm": "确定",
  	"uni.chooseImage.cancel": "取消",
  	"uni.chooseImage.sourceType.album": "从相册选择",
  	"uni.chooseImage.sourceType.camera": "拍摄",
  	"uni.chooseVideo.cancel": "取消",
  	"uni.chooseVideo.sourceType.album": "从相册选择",
  	"uni.chooseVideo.sourceType.camera": "拍摄",
  	"uni.chooseFile.notUserActivation": "文件选择器对话框只能在由用户激活时显示",
  	"uni.previewImage.cancel": "取消",
  	"uni.previewImage.button.save": "保存图像",
  	"uni.previewImage.save.success": "保存图像到相册成功",
  	"uni.previewImage.save.fail": "保存图像到相册失败",
  	"uni.setClipboardData.success": "内容已复制",
  	"uni.scanCode.title": "扫码",
  	"uni.scanCode.album": "相册",
  	"uni.scanCode.fail": "识别失败",
  	"uni.scanCode.flash.on": "轻触照亮",
  	"uni.scanCode.flash.off": "轻触关闭",
  	"uni.startSoterAuthentication.authContent": "指纹识别中...",
  	"uni.picker.done": "完成",
  	"uni.picker.cancel": "取消",
  	"uni.video.danmu": "弹幕",
  	"uni.video.volume": "音量",
  	"uni.button.feedback.title": "问题反馈",
  	"uni.button.feedback.send": "发送",
  	"uni.chooseLocation.search": "搜索地点",
  	"uni.chooseLocation.cancel": "取消"
  };

  var zhHant = {
  	"uni.app.quit": "再按一次退出應用",
  	"uni.async.error": "連接服務器超時，點擊屏幕重試",
  	"uni.showActionSheet.cancel": "取消",
  	"uni.showToast.unpaired": "請注意 showToast 與 hideToast 必須配對使用",
  	"uni.showLoading.unpaired": "請注意 showLoading 與 hideLoading 必須配對使用",
  	"uni.showModal.cancel": "取消",
  	"uni.showModal.confirm": "確定",
  	"uni.chooseImage.cancel": "取消",
  	"uni.chooseImage.sourceType.album": "從相冊選擇",
  	"uni.chooseImage.sourceType.camera": "拍攝",
  	"uni.chooseVideo.cancel": "取消",
  	"uni.chooseVideo.sourceType.album": "從相冊選擇",
  	"uni.chooseVideo.sourceType.camera": "拍攝",
  	"uni.chooseFile.notUserActivation": "文件選擇器對話框只能在由用戶激活時顯示",
  	"uni.previewImage.cancel": "取消",
  	"uni.previewImage.button.save": "保存圖像",
  	"uni.previewImage.save.success": "保存圖像到相冊成功",
  	"uni.previewImage.save.fail": "保存圖像到相冊失敗",
  	"uni.setClipboardData.success": "內容已復制",
  	"uni.scanCode.title": "掃碼",
  	"uni.scanCode.album": "相冊",
  	"uni.scanCode.fail": "識別失敗",
  	"uni.scanCode.flash.on": "輕觸照亮",
  	"uni.scanCode.flash.off": "輕觸關閉",
  	"uni.startSoterAuthentication.authContent": "指紋識別中...",
  	"uni.picker.done": "完成",
  	"uni.picker.cancel": "取消",
  	"uni.video.danmu": "彈幕",
  	"uni.video.volume": "音量",
  	"uni.button.feedback.title": "問題反饋",
  	"uni.button.feedback.send": "發送",
  	"uni.chooseLocation.search": "搜索地點",
  	"uni.chooseLocation.cancel": "取消"
  };

  const messages = {};

  {
    Object.assign(messages, {
      en,
      es,
      fr,
      'zh-Hans': zhHans,
      'zh-Hant': zhHant
    });
  }

  let locale;

  {
    if (typeof weex === 'object') {
      locale = weex.requireModule('plus').getLanguage();
    } else {
      locale = '';
    }
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
     messages 
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

  const I18N_JSON_DELIMITERS = ['%', '%'];

  function getLocaleMessage () {
    const locale = uni.getLocale();
    const locales = __uniConfig.locales;
    return (
      locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {}
    )
  }

  function formatI18n (message) {
    if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
      return i18n.f(message, getLocaleMessage(), I18N_JSON_DELIMITERS)
    }
    return message
  }

  function resolveJsonObj (jsonObj, names) {
    if (names.length === 1) {
      if (jsonObj) {
        const value = jsonObj[names[0]];
        if (isStr(value) && isI18nStr(value, I18N_JSON_DELIMITERS)) {
          return jsonObj
        }
      }
      return
    }
    const name = names.shift();
    return resolveJsonObj(jsonObj && jsonObj[name], names)
  }

  function defineI18nProperties (obj, names) {
    return names.map(name => defineI18nProperty(obj, name))
  }

  function defineI18nProperty (obj, names) {
    const jsonObj = resolveJsonObj(obj, names);
    if (!jsonObj) {
      return false
    }
    const prop = names[names.length - 1];
    let value = jsonObj[prop];
    Object.defineProperty(jsonObj, prop, {
      get () {
        return formatI18n(value)
      },
      set (v) {
        value = v;
      }
    });
    return true
  }

  function isEnableLocale () {
    return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
  }

  function initNavigationBarI18n (navigationBar) {
    if (isEnableLocale()) {
      return defineI18nProperties(navigationBar, [
        ['titleText'],
        ['searchInput', 'placeholder']
      ])
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

  const setClipboardData = {
    data: {
      type: String,
      required: true
    },
    showToast: {
      type: Boolean,
      default: true
    },
    beforeSuccess (res, params) {
      if (!params.showToast) return
      const title = t('uni.setClipboardData.success');
      if (title) {
        uni.showToast({
          title,
          icon: 'success',
          mask: false,
          style: {
            width: undefined
          }
        });
      }
    }
  };

  var require_context_module_0_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setClipboardData: setClipboardData
  });

  function getRealRoute (fromRoute, toRoute) {
    if (!toRoute) {
      toRoute = fromRoute;
      if (toRoute.indexOf('/') === 0) {
        return toRoute
      }
      const pages = getCurrentPages();
      if (pages.length) {
        fromRoute = pages[pages.length - 1].$page.route;
      } else {
        fromRoute = '';
      }
    } else {
      if (toRoute.indexOf('/') === 0) {
        return toRoute
      }
    }
    if (toRoute.indexOf('./') === 0) {
      return getRealRoute(fromRoute, toRoute.substr(2))
    }
    const toRouteArray = toRoute.split('/');
    const toRouteLength = toRouteArray.length;
    let i = 0;
    for (; i < toRouteLength && toRouteArray[i] === '..'; i++) {
      // noop
    }
    toRouteArray.splice(0, i);
    toRoute = toRouteArray.join('/');
    const fromRouteArray = fromRoute.length > 0 ? fromRoute.split('/') : [];
    fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
    return '/' + fromRouteArray.concat(toRouteArray).join('/')
  }

  const SCHEME_RE = /^([a-z-]+:)?\/\//i;
  const DATA_RE = /^data:.*,.*/;

  // 处理 Android 平台解压与非解压模式下获取的路径不一致的情况
  function handleLocalPath (filePath) {
    return plus.io.convertLocalFileSystemURL(filePath)
      .replace(/^\/?apps\//, '/android_asset/apps/')
      .replace(/\/$/, '')
  }

  let wwwPath;

  function addBase (filePath) {
    if (!wwwPath) { // 需要时，初始化一次，外部直接初始化，需要等 plusready
      wwwPath = 'file://' + handleLocalPath('_www') + '/';
    }
    return wwwPath + filePath
  }

  function getRealPath (filePath) {
    if (filePath.indexOf('/') === 0) {
      if (filePath.indexOf('//') === 0) {
        return 'https:' + filePath
      }
      // 平台绝对路径 安卓、iOS
      if (filePath.startsWith('/storage/') || filePath.startsWith('/sdcard/') || filePath.includes('/Containers/Data/Application/')) {
        return 'file://' + filePath
      }
      return addBase(filePath.substr(1))
    }
    // 网络资源或base64
    if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
      return filePath
    }

    // _do=>_doc,_documents,_downloads
    if (filePath.indexOf('_www') === 0 || filePath.indexOf('_do') === 0) {
      return 'file://' + handleLocalPath(filePath)
    }

    const pages = getCurrentPages();
    if (pages.length) {
      return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1))
    }

    return filePath
  }

  const saveFile = {
    tempFilePath: {
      type: String,
      required: true,
      validator (value, params) {
        params.tempFilePath = getRealPath(value);
      }
    }
  };

  const TYPES = ['md5', 'sha1'];

  const getFileInfo = {
    filePath: {
      type: String,
      required: true,
      validator (value, params) {
        params.filePath = getRealPath(value);
      }
    },
    digestAlgorithm: {
      type: String,
      validator (value, params) {
        params.digestAlgorithm = TYPES.includes(value) ? value : TYPES[0];
      },
      default: TYPES[0]
    }
  };

  const getSavedFileInfo = {
    filePath: {
      type: String,
      required: true,
      validator (value, params) {
        params.filePath = getRealPath(value);
      }
    }
  };

  const removeSavedFile = {
    filePath: {
      type: String,
      required: true,
      validator (value, params) {
        params.filePath = getRealPath(value);
      }
    }
  };

  var require_context_module_0_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    saveFile: saveFile,
    getFileInfo: getFileInfo,
    getSavedFileInfo: getSavedFileInfo,
    removeSavedFile: removeSavedFile
  });

  const openDocument = {
    filePath: {
      type: String,
      required: true
    },
    fileType: {
      type: String
    }
  };

  var require_context_module_0_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openDocument: openDocument
  });

  const chooseLocation = {
    keyword: {
      type: String
    }
  };

  var require_context_module_0_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseLocation: chooseLocation
  });

  const coordTypes = ['wgs84', 'gcj02'];

  const getLocation = {
    type: {
      type: String,
      validator (value, params) {
        value = (value || '').toLowerCase();
        params.type = coordTypes.indexOf(value) < 0 ? coordTypes[0] : value;
      }
    },
    altitude: {
      type: Boolean,
      default: false
    }
  };

  var require_context_module_0_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getLocation: getLocation
  });

  const openLocation = {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      validator (value, params) {
        value = Math.floor(value);
        params.scale = value >= 5 && value <= 18 ? value : 18;
      },
      default: 18
    },
    name: {
      type: String
    },
    address: {
      type: String
    }
  };

  var require_context_module_0_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openLocation: openLocation
  });

  const MEDIA_TYPE = ['all', 'image', 'video'];
  const SOURCE_TYPES = ['album', 'camera'];

  const chooseFile = {
    count: {
      type: Number,
      required: false,
      default: 100,
      validator (count, params) {
        if (count <= 0) {
          params.count = 100;
        }
      }
    },
    sourceType: {
      type: Array,
      required: false,
      default: SOURCE_TYPES,
      validator (sourceType, params) {
        sourceType = sourceType.filter(sourceType => SOURCE_TYPES.includes(sourceType));
        params.sourceType = sourceType.length ? sourceType : SOURCE_TYPES;
      }
    },
    type: {
      type: String,
      required: false,
      default: 'all',
      validator (type, params) {
        if (!MEDIA_TYPE.includes(type)) params.type = MEDIA_TYPE[0];
        params.type = params.type === 'all' ? params.type = '*' : params.type;
      }
    },
    extension: {
      type: Array,
      default: [''],
      validator (extension, params) {
        if (extension.length === 0) { return 'param extension should not be empty.' }
      }
    }
  };

  var require_context_module_0_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseFile: chooseFile
  });

  const SIZE_TYPES = ['original', 'compressed'];
  const SOURCE_TYPES$1 = ['album', 'camera'];

  const chooseImage = {
    count: {
      type: Number,
      required: false,
      default: 9,
      validator (count, params) {
        if (count <= 0) {
          params.count = 9;
        }
      }
    },
    sizeType: {
      type: [Array, String],
      required: false,
      default: SIZE_TYPES,
      validator (sizeType, params) {
        sizeType = typeof sizeType === 'string' ? [sizeType] : sizeType;
        sizeType = sizeType.filter(sizeType => SIZE_TYPES.includes(sizeType));
        params.sizeType = sizeType.length ? sizeType : SIZE_TYPES;
      }
    },
    sourceType: {
      type: Array,
      required: false,
      default: SOURCE_TYPES$1,
      validator (sourceType, params) {
        sourceType = sourceType.filter(sourceType => SOURCE_TYPES$1.includes(sourceType));
        params.sourceType = sourceType.length ? sourceType : SOURCE_TYPES$1;
      }
    },
    extension: {
      type: Array,
      default: ['*'],
      validator (extension, params) {
        if (extension.length === 0) { return 'param extension should not be empty.' }
      }
    }
  };

  var require_context_module_0_17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseImage: chooseImage
  });

  const SOURCE_TYPES$2 = ['album', 'camera'];

  const chooseVideo = {
    sourceType: {
      type: Array,
      required: false,
      default: SOURCE_TYPES$2,
      validator (sourceType, params) {
        sourceType = sourceType.filter(sourceType => SOURCE_TYPES$2.includes(sourceType));
        params.sourceType = sourceType.length ? sourceType : SOURCE_TYPES$2;
      }
    },
    compressed: {
      type: Boolean,
      default: true
    },
    maxDuration: {
      type: Number,
      default: 60
    },
    camera: {
      type: String,
      default: 'back'
    },
    extension: {
      type: Array,
      default: ['*'],
      validator (extension, params) {
        if (extension.length === 0) { return 'param extension should not be empty.' }
      }
    }
  };

  var require_context_module_0_18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseVideo: chooseVideo
  });

  const compressImage = {
    src: {
      type: String,
      required: true,
      validator (src, params) {
        params.src = getRealPath(src);
      }
    }
  };

  var require_context_module_0_19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compressImage: compressImage
  });

  const compressVideo = {
    src: {
      type: String,
      required: true,
      validator (src, params) {
        params.src = getRealPath(src);
      }
    },
    quality: {
      type: String
    },
    bitrate: {
      type: Number
    },
    fps: {
      type: Number
    },
    resolution: {
      type: Number
    }
  };

  var require_context_module_0_20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compressVideo: compressVideo
  });

  const getImageInfo = {
    src: {
      type: String,
      required: true,
      validator (src, params) {
        params.src = getRealPath(src);
      }
    }
  };

  var require_context_module_0_21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getImageInfo: getImageInfo
  });

  const getVideoInfo = {
    src: {
      type: String,
      required: true,
      validator (src, params) {
        params.src = getRealPath(src);
      }
    }
  };

  var require_context_module_0_22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getVideoInfo: getVideoInfo
  });

  const previewImage = {
    urls: {
      type: Array,
      required: true,
      validator (value, params) {
        var typeError;
        params.urls = value.map(url => {
          if (typeof url === 'string') {
            return getRealPath(url)
          } else {
            typeError = true;
          }
        });
        if (typeError) {
          return 'url is not string'
        }
      }
    },
    current: {
      type: [String, Number],
      validator (value, params) {
        if (typeof value === 'number') {
          params.current = value > 0 && value < params.urls.length ? value : 0;
        } else if (typeof value === 'string' && value) {
          params.current = getRealPath(value);
        }
      },
      default: 0
    }
  };

  var require_context_module_0_23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    previewImage: previewImage
  });

  const saveImageToPhotosAlbum = {
    filePath: {
      type: String,
      required: true,
      validator (filePath, params) {
        params.filePath = getRealPath(filePath);
      }
    }
  };

  var require_context_module_0_24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum
  });

  const downloadFile = {
    url: {
      type: String,
      required: true
    },
    header: {
      type: Object,
      validator (value, params) {
        params.header = value || {};
      }
    }
  };

  var require_context_module_0_25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    downloadFile: downloadFile
  });

  const method = {
    OPTIONS: 'OPTIONS',
    GET: 'GET',
    HEAD: 'HEAD',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT',
    PATCH: 'PATCH'
  };
  const dataType = {
    JSON: 'json'
  };
  const responseType = {
    TEXT: 'text',
    ARRAYBUFFER: 'arraybuffer'
  };

  const encode$1 = encodeURIComponent;

  function stringifyQuery$1 (url, data) {
    let str = url.split('#');
    const hash = str[1] || '';
    str = str[0].split('?');
    let query = str[1] || '';
    url = str[0];
    const search = query.split('&').filter(item => item);
    query = {};
    search.forEach(item => {
      item = item.split('=');
      query[item[0]] = item[1];
    });
    for (const key in data) {
      if (hasOwn(data, key)) {
        let v = data[key];
        if (typeof v === 'undefined' || v === null) {
          v = '';
        } else if (isPlainObject(v)) {
          v = JSON.stringify(v);
        }
        query[encode$1(key)] = encode$1(v);
      }
    }
    query = Object.keys(query).map(item => `${item}=${query[item]}`).join('&');
    return url + (query ? '?' + query : '') + (hash ? '#' + hash : '')
  }

  const request = {
    method: {
      type: String,
      validator (value, params) {
        value = (value || '').toUpperCase();
        params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value;
      }
    },
    data: {
      type: [Object, String, Array, ArrayBuffer],
      validator (value, params) {
        params.data = value || '';
      }
    },
    url: {
      type: String,
      required: true,
      validator (value, params) {
        if (
          params.method === method.GET &&
          isPlainObject(params.data) &&
          Object.keys(params.data).length
        ) { // 将 method,data 校验提前,保证 url 校验时,method,data 已被格式化
          params.url = stringifyQuery$1(value, params.data);
        }
      }
    },
    header: {
      type: Object,
      validator (value, params) {
        const header = params.header = value || {};
        if (params.method !== method.GET) {
          if (!Object.keys(header).find(key => key.toLowerCase() === 'content-type')) {
            header['Content-Type'] = 'application/json';
          }
        }
      }
    },
    dataType: {
      type: String,
      validator (value, params) {
        params.dataType = (value || dataType.JSON).toLowerCase();
      }
    },
    responseType: {
      type: String,
      validator (value, params) {
        value = (value || '').toLowerCase();
        params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value;
      }
    },
    withCredentials: {
      type: Boolean
    },
    timeout: {
      type: Number
    }
  };

  const configMTLS = {
    certificates: {
      type: Array,
      required: true,
      validator (value) {
        if (value.some(item => toRawType(item.host) !== 'String')) {
          return '参数配置错误，请确认后重试'
        }
      }
    }
  };

  var require_context_module_0_26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request,
    configMTLS: configMTLS
  });

  const method$1 = {
    OPTIONS: 'OPTIONS',
    GET: 'GET',
    HEAD: 'HEAD',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT'
  };
  const connectSocket = {
    url: {
      type: String,
      required: true
    },
    header: {
      type: Object,
      validator (value, params) {
        params.header = value || {};
      }
    },
    method: {
      type: String,
      validator (value, params) {
        value = (value || '').toUpperCase();
        params.method = Object.values(method$1).indexOf(value) < 0 ? method$1.GET : value;
      }
    },
    protocols: {
      // 微信文档虽然写的是数组，但是可以正常传递字符串
      type: [Array, String],
      validator (value, params) {
        if (typeof value === 'string') {
          value = [value];
        }
        params.protocols = (value || []).filter(str => typeof str === 'string');
      }
    }
  };
  const sendSocketMessage = {
    data: {
      type: [String, ArrayBuffer]
    }
  };
  const closeSocket = {
    code: {
      type: Number
    },
    reason: {
      type: String
    }
  };

  var require_context_module_0_27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    connectSocket: connectSocket,
    sendSocketMessage: sendSocketMessage,
    closeSocket: closeSocket
  });

  // App端可以只使用files不传filePath和name

  const uploadFile = {
    url: {
      type: String,
      required: true
    },
    files: {
      type: Array
    },
    filePath: {
      type: String,
      validator (value, params) {
        if (value) {
          params.filePath = getRealPath(value);
        }
      }
    },
    name: {
      type: String
    },
    header: {
      type: Object,
      validator (value, params) {
        params.header = value || {};
      }
    },
    formData: {
      type: Object,
      validator (value, params) {
        params.formData = value || {};
      }
    }
  };

  var require_context_module_0_28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    uploadFile: uploadFile
  });

  const service = {
    OAUTH: 'OAUTH',
    SHARE: 'SHARE',
    PAYMENT: 'PAYMENT',
    PUSH: 'PUSH'
  };

  const getProvider = {
    service: {
      type: String,
      required: true,
      validator (value, params) {
        value = (value || '').toUpperCase();
        if (value && Object.values(service).indexOf(value) < 0) {
          return 'service error'
        }
      }
    }
  };

  var require_context_module_0_29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getProvider: getProvider
  });

  const loadSubPackage = {
    root: {
      type: String,
      required: true,
      validator (value, params) {
        const subPackages = __uniConfig.subPackages;
        if (!Array.isArray(subPackages) || subPackages.length === 0) {
          return 'no subPackages'
        }
        if (!subPackages.find(subPackage => subPackage.root === value)) {
          return 'root `' + value + '` is not found'
        }
      }
    }
  };

  var require_context_module_0_30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loadSubPackage: loadSubPackage
  });

  const provider = {
    UNIVERIFY: 'univerify'
  };

  const preLogin = {
    provider: {
      type: String,
      required: true,
      default: provider.UNIVERIFY,
      validator (value, params) {
        if (Object.values(provider).indexOf(value) < 0) {
          return 'provider error'
        }
      }
    }
  };

  var require_context_module_0_31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    preLogin: preLogin
  });

  function encodeQueryString (url) {
    if (typeof url !== 'string') {
      return url
    }
    const index = url.indexOf('?');

    if (index === -1) {
      return url
    }

    const query = url.substr(index + 1).trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return url
    }

    url = url.substr(0, index);

    const params = [];

    query.split('&').forEach(param => {
      const parts = param.replace(/\+/g, ' ').split('=');
      const key = parts.shift();
      const val = parts.length > 0
        ? parts.join('=')
        : '';

      params.push(key + '=' + encodeURIComponent(val));
    });

    return params.length ? url + '?' + params.join('&') : url
  }

  function createValidator (type) {
    return function validator (url, params) {
      // 格式化为绝对路径路由
      url = getRealRoute(url);

      const pagePath = url.split('?')[0];
      // 匹配路由是否存在
      const routeOptions = __uniRoutes.find(({
        path,
        alias
      }) => path === pagePath || alias === pagePath);

      if (!routeOptions) {
        return 'page `' + url + '` is not found'
      }

      // 检测不同类型跳转
      if (type === 'navigateTo' || type === 'redirectTo') {
        if (routeOptions.meta.isTabBar) {
          return `can not ${type} a tabbar page`
        }
      } else if (type === 'switchTab') {
        if (!routeOptions.meta.isTabBar) {
          return 'can not switch to no-tabBar page'
        }
      }

      // switchTab不允许传递参数,reLaunch到一个tabBar页面是可以的
      if (
        (type === 'switchTab' || type === 'preloadPage') &&
        routeOptions.meta.isTabBar &&
        params.openType !== 'appLaunch'
      ) {
        url = pagePath;
      }

      // 首页自动格式化为`/`
      if (routeOptions.meta.isEntry) {
        url = url.replace(routeOptions.alias, '/');
      }

      // 参数格式化
      params.url = encodeQueryString(url);
      if (type === 'unPreloadPage') {
        return
      } else if (type === 'preloadPage') {
        {
          if (!routeOptions.meta.isNVue) {
            return 'can not preload vue page'
          }
        }
        if (routeOptions.meta.isTabBar) {
          const pages = getCurrentPages(true);
          const tabBarPagePath = (routeOptions.alias || routeOptions.path).substr(1);
          if (pages.find(page => page.route === tabBarPagePath)) {
            return 'tabBar page `' + tabBarPagePath + '` already exists'
          }
        }
        return
      }

      // 主要拦截目标为用户快速点击时触发的多次跳转，该情况，通常前后 url 是一样的
      if (navigatorLock === url && params.openType !== 'appLaunch') {
        return `${navigatorLock} locked`
      }
      // 至少 onLaunch 之后，再启用lock逻辑（onLaunch之前可能开发者手动调用路由API，来提前跳转）
      // enableNavigatorLock 临时开关（不对外开放），避免该功能上线后，有部分情况异常，可以让开发者临时关闭 lock 功能
      if (__uniConfig.ready && __uniConfig.enableNavigatorLock !== false) {
        navigatorLock = url;
      }
    }
  }

  let navigatorLock;

  function createProtocol (type, extras = {}) {
    return Object.assign({
      url: {
        type: String,
        required: true,
        validator: createValidator(type)
      },
      beforeAll () {
        navigatorLock = '';
      }
    }, extras)
  }

  function createAnimationProtocol (animationTypes) {
    return {
      animationType: {
        type: String,
        validator (type) {
          if (type && animationTypes.indexOf(type) === -1) {
            return '`' + type + '` is not supported for `animationType` (supported values are: `' + animationTypes.join(
              '`|`') + '`)'
          }
        }
      },
      animationDuration: {
        type: Number
      }
    }
  }

  const redirectTo = createProtocol('redirectTo');

  const reLaunch = createProtocol('reLaunch');

  const navigateTo = createProtocol('navigateTo', createAnimationProtocol(
    [
      'slide-in-right',
      'slide-in-left',
      'slide-in-top',
      'slide-in-bottom',
      'fade-in',
      'zoom-out',
      'zoom-fade-out',
      'pop-in',
      'none'
    ]
  ));

  const switchTab = createProtocol('switchTab');

  const navigateBack = Object.assign({
    delta: {
      type: Number,
      validator (delta, params) {
        delta = parseInt(delta) || 1;
        params.delta = Math.min(getCurrentPages().length - 1, delta);
      }
    }
  }, createAnimationProtocol(
    [
      'slide-out-right',
      'slide-out-left',
      'slide-out-top',
      'slide-out-bottom',
      'fade-out',
      'zoom-in',
      'zoom-fade-in',
      'pop-out',
      'none'
    ]
  ));

  const preloadPage = {
    url: {
      type: String,
      required: true,
      validator: createValidator('preloadPage')
    }
  };

  const unPreloadPage = {
    url: {
      type: String,
      required: true,
      validator: createValidator('unPreloadPage')
    }
  };

  var require_context_module_0_32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    navigateTo: navigateTo,
    switchTab: switchTab,
    navigateBack: navigateBack,
    preloadPage: preloadPage,
    unPreloadPage: unPreloadPage
  });

  const getStorage = {
    key: {
      type: String,
      required: true
    }
  };

  const getStorageSync = [{
    name: 'key',
    type: String,
    required: true
  }];

  const setStorage = {
    key: {
      type: String,
      required: true
    },
    data: {
      required: true
    }
  };

  const setStorageSync = [{
    name: 'key',
    type: String,
    required: true
  }, {
    name: 'data',
    required: true
  }];

  const removeStorage = getStorage;
  const removeStorageSync = getStorageSync;

  var require_context_module_0_33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getStorage: getStorage,
    getStorageSync: getStorageSync,
    setStorage: setStorage,
    setStorageSync: setStorageSync,
    removeStorage: removeStorage,
    removeStorageSync: removeStorageSync
  });

  const loadFontFace = {
    family: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    desc: {
      type: Object,
      required: false
    },
    success: {
      type: Function,
      required: false
    },
    fail: {
      type: Function,
      required: false
    },
    complete: {
      type: Function,
      required: false
    }
  };

  var require_context_module_0_34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loadFontFace: loadFontFace
  });

  const FRONT_COLORS = ['#ffffff', '#000000'];
  const setNavigationBarColor = {
    frontColor: {
      type: String,
      required: true,
      validator (frontColor, params) {
        if (FRONT_COLORS.indexOf(frontColor) === -1) {
          return `invalid frontColor "${frontColor}"`
        }
      }
    },
    backgroundColor: {
      type: String,
      required: true
    },
    animation: {
      type: Object,
      default () {
        return {
          duration: 0,
          timingFunc: 'linear'
        }
      },
      validator (animation = {}, params) {
        params.animation = {
          duration: animation.duration || 0,
          timingFunc: animation.timingFunc || 'linear'
        };
      }
    }
  };
  const setNavigationBarTitle = {
    title: {
      type: String,
      required: true
    }
  };

  var require_context_module_0_35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setNavigationBarColor: setNavigationBarColor,
    setNavigationBarTitle: setNavigationBarTitle
  });

  const pageScrollTo = {
    scrollTop: {
      type: Number
    },
    duration: {
      type: Number,
      default: 300,
      validator (duration, params) {
        params.duration = Math.max(0, duration);
      }
    }
  };

  var require_context_module_0_36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pageScrollTo: pageScrollTo
  });

  const showModal = {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default () {
        return t('uni.showModal.cancel')
      }
    },
    cancelColor: {
      type: String,
      default: '#000000'
    },
    confirmText: {
      type: String,
      default () {
        return t('uni.showModal.confirm')
      }
    },
    confirmColor: {
      type: String,
      default: '#007aff'
    },
    visible: {
      type: Boolean,
      default: true
    }
  };

  const showToast = {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: 'success',
      validator (icon, params) {
        if (['success', 'loading', 'error', 'none'].indexOf(icon) === -1) {
          params.icon = 'success';
        }
      }
    },
    image: {
      type: String,
      default: '',
      validator (image, params) {
        if (image) {
          params.image = getRealPath(image);
        }
      }
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
      type: Boolean,
      default: true
    }
  };
  const showLoading = {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'loading'
    },
    duration: {
      type: Number,
      default: 100000000 // 简单处理 showLoading，直接设置个大值
    },
    mask: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    }
  };

  const showActionSheet = {
    itemList: {
      type: Array,
      required: true,
      validator (itemList, params) {
        if (!itemList.length) {
          return 'parameter.itemList should have at least 1 item'
        }
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    visible: {
      type: Boolean,
      default: true
    },
    popover: {
      type: Object
    }
  };

  var require_context_module_0_37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    showModal: showModal,
    showToast: showToast,
    showLoading: showLoading,
    showActionSheet: showActionSheet
  });

  const indexValidator = {
    type: Number,
    required: true
  };

  const setTabBarItem = {
    index: indexValidator,
    text: {
      type: String
    },
    iconPath: {
      type: String
    },
    selectedIconPath: {
      type: String
    },
    pagePath: {
      type: String
    }
  };

  const setTabBarStyle = {
    color: {
      type: String
    },
    selectedColor: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    backgroundImage: {
      type: String,
      validator (backgroundImage, params) {
        if (backgroundImage && !(/^(linear|radial)-gradient\(.+?\);?$/.test(backgroundImage))) {
          params.backgroundImage = getRealPath(backgroundImage);
        }
      }
    },
    backgroundRepeat: {
      type: String
    },
    borderStyle: {
      type: String,
      validator (borderStyle, params) {
        if (borderStyle) {
          params.borderStyle = borderStyle === 'black' ? 'black' : 'white';
        }
      }
    }
  };

  const hideTabBar = {
    animation: {
      type: Boolean,
      default: false
    }
  };

  const showTabBar = {
    animation: {
      type: Boolean,
      default: false
    }
  };

  const hideTabBarRedDot = {
    index: indexValidator
  };

  const showTabBarRedDot = {
    index: indexValidator
  };

  const removeTabBarBadge = {
    index: indexValidator
  };

  const setTabBarBadge = {
    index: indexValidator,
    text: {
      type: String,
      required: true,
      validator (text, params) {
        if (getLen(text) >= 4) {
          params.text = '...';
        }
      }
    }
  };

  var require_context_module_0_38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setTabBarItem: setTabBarItem,
    setTabBarStyle: setTabBarStyle,
    hideTabBar: hideTabBar,
    showTabBar: showTabBar,
    hideTabBarRedDot: hideTabBarRedDot,
    showTabBarRedDot: showTabBarRedDot,
    removeTabBarBadge: removeTabBarBadge,
    setTabBarBadge: setTabBarBadge
  });

  const protocol = Object.create(null);
  const modules = 
    (function() {
      var map = {
        './base/base64.js': require_context_module_0_0,
  './base/can-i-use.js': require_context_module_0_1,
  './base/event-bus.js': require_context_module_0_2,
  './base/interceptor.js': require_context_module_0_3,
  './base/upx2px.js': require_context_module_0_4,
  './context/canvas.js': require_context_module_0_5,
  './context/context.js': require_context_module_0_6,
  './device/add-phone-contact.js': require_context_module_0_7,
  './device/make-phone-call.js': require_context_module_0_8,
  './device/scan-code.js': require_context_module_0_9,
  './device/set-clipboard-data.js': require_context_module_0_10,
  './file/file.js': require_context_module_0_11,
  './file/open-document.js': require_context_module_0_12,
  './location/choose-location.js': require_context_module_0_13,
  './location/get-location.js': require_context_module_0_14,
  './location/open-location.js': require_context_module_0_15,
  './media/choose-file.js': require_context_module_0_16,
  './media/choose-image.js': require_context_module_0_17,
  './media/choose-video.js': require_context_module_0_18,
  './media/compress-image.js': require_context_module_0_19,
  './media/compress-video.js': require_context_module_0_20,
  './media/get-image-info.js': require_context_module_0_21,
  './media/get-video-info.js': require_context_module_0_22,
  './media/preview-image.js': require_context_module_0_23,
  './media/save-image-to-photos-album.js': require_context_module_0_24,
  './network/download-file.js': require_context_module_0_25,
  './network/request.js': require_context_module_0_26,
  './network/socket.js': require_context_module_0_27,
  './network/upload-file.js': require_context_module_0_28,
  './plugin/get-provider.js': require_context_module_0_29,
  './plugin/load-sub-package.js': require_context_module_0_30,
  './plugin/pre-login.js': require_context_module_0_31,
  './route/route.js': require_context_module_0_32,
  './storage/storage.js': require_context_module_0_33,
  './ui/load-font-face.js': require_context_module_0_34,
  './ui/navigation-bar.js': require_context_module_0_35,
  './ui/page-scroll-to.js': require_context_module_0_36,
  './ui/popup.js': require_context_module_0_37,
  './ui/tab-bar.js': require_context_module_0_38,

      };
      var req = function req(key) {
        return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
      };
      req.keys = function() {
        return Object.keys(map);
      };
      return req;
    })();

  modules.keys().forEach(function (key) {
    Object.assign(protocol, modules(key));
  });

  function validateParam (key, paramTypes, paramsData) {
    const paramOptions = paramTypes[key];
    const absent = !hasOwn(paramsData, key);
    let value = paramsData[key];

    const booleanIndex = getTypeIndex(Boolean, paramOptions.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(paramOptions, 'default')) {
        value = false;
      }
    }
    if (value === undefined) {
      if (hasOwn(paramOptions, 'default')) {
        const paramDefault = paramOptions.default;
        value = isFn(paramDefault) ? paramDefault() : paramDefault;
        paramsData[key] = value; // 默认值
      }
    }

    return assertParam(paramOptions, key, value, absent, paramsData)
  }

  function assertParam (
    paramOptions,
    name,
    value,
    absent,
    paramsData
  ) {
    if (paramOptions.required && absent) {
      return `Missing required parameter \`${name}\``
    }

    if (value == null && !paramOptions.required) {
      const validator = paramOptions.validator;
      if (validator) {
        return validator(value, paramsData)
      }
      return
    }
    let type = paramOptions.type;
    let valid = !type || type === true;
    const expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (let i = 0; i < type.length && !valid; i++) {
        const assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }

    if (!valid) {
      return getInvalidTypeMessage(name, value, expectedTypes)
    }

    const validator = paramOptions.validator;
    if (validator) {
      return validator(value, paramsData)
    }
  }

  const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

  function assertType (value, type) {
    let valid;
    const expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === 'object') {
        valid = value instanceof type;
      }
    } else if (value.byteLength >= 0) {
      valid = true;
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      // TODO 页面传入的ArrayBuffer使用instanceof ArrayBuffer返回false，暂做此修改
      valid = value instanceof type || toRawType(value) === getType(type);
    }
    return {
      valid,
      expectedType
    }
  }

  function getType (fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (let i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  function getInvalidTypeMessage (name, value, expectedTypes) {
    let message = `parameter \`${name}\`.` +
  		` Expected ${expectedTypes.join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 &&
  		isExplicable(expectedType) &&
  		!isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message
  }

  function styleValue (value, type) {
    if (type === 'String') {
      return `"${value}"`
    } else if (type === 'Number') {
      return `${Number(value)}`
    } else {
      return `${value}`
    }
  }

  const explicitTypes = ['string', 'number', 'boolean'];

  function isExplicable (value) {
    return explicitTypes.some(elem => value.toLowerCase() === elem)
  }

  function isBoolean (...args) {
    return args.some(elem => elem.toLowerCase() === 'boolean')
  }

  function invokeCallbackHandlerFail (err, apiName, callbackId) {
    const errMsg = `${apiName}:fail ${err}`;
    if (process.env.NODE_ENV !== 'production') {
      console.error(errMsg);
    }
    if (callbackId === -1) {
      throw new Error(errMsg)
    }
    if (typeof callbackId === 'number') {
      invokeCallbackHandler(callbackId, {
        errMsg
      });
    }
    return false
  }

  const callbackApiParamTypes = [{
    name: 'callback',
    type: Function,
    required: true
  }];

  // 目前已用到的仅这三个
  // 完整的可能包含：
  // beforeValidate,
  // beforeSuccess,
  // afterSuccess,
  // beforeFail,
  // afterFail,
  // beforeCancel,
  // afterCancel,
  // beforeAll,
  // afterAll
  const IGNORE_KEYS = [
    'beforeValidate',
    'beforeAll',
    'beforeSuccess'
  ];

  function validateParams (apiName, paramsData, callbackId) {
    let paramTypes = protocol[apiName];
    if (!paramTypes && isCallbackApi(apiName)) {
      paramTypes = callbackApiParamTypes;
    }
    if (paramTypes) {
      if (Array.isArray(paramTypes) && Array.isArray(paramsData)) {
        const paramTypeObj = Object.create(null);
        const paramsDataObj = Object.create(null);
        const paramsDataLength = paramsData.length;
        paramTypes.forEach((paramType, index) => {
          paramTypeObj[paramType.name] = paramType;
          if (paramsDataLength > index) {
            paramsDataObj[paramType.name] = paramsData[index];
          }
        });
        paramTypes = paramTypeObj;
        paramsData = paramsDataObj;
      }

      if (isFn(paramTypes.beforeValidate)) {
        const err = paramTypes.beforeValidate(paramsData);
        if (err) {
          return invokeCallbackHandlerFail(err, apiName, callbackId)
        }
      }

      const keys = Object.keys(paramTypes);
      for (let i = 0; i < keys.length; i++) {
        if (IGNORE_KEYS.indexOf(keys[i]) !== -1) {
          continue
        }
        const err = validateParam(keys[i], paramTypes, paramsData);
        if (err) {
          return invokeCallbackHandlerFail(err, apiName, callbackId)
        }
      }
    }
    return true
  }

  let invokeCallbackId = 1;

  const invokeCallbacks = {};

  function createKeepAliveApiCallback (apiName, callback) {
    const callbackId = invokeCallbackId++;
    const invokeCallbackName = 'api.' + apiName + '.' + callbackId;

    invokeCallbacks[callbackId] = {
      name: invokeCallbackName,
      keepAlive: true,
      callback
    };
    return callbackId
  }

  function getKeepAliveApiCallback (apiName, callback) {
    for (const key in invokeCallbacks) {
      const item = invokeCallbacks[key];
      if (item.name.startsWith('api.' + apiName.replace(/^off/, 'on')) && item.callback === callback) {
        delete invokeCallbacks[key];
        return Number(key)
      }
    }
    return 'fail'
  }

  function createApiCallback (apiName, params = {}, extras = {}) {
    if (!isPlainObject(params)) {
      return {
        params
      }
    }
    params = Object.assign({}, params);

    const apiCallbacks = {};
    for (const name in params) {
      const param = params[name];
      if (isFn(param)) {
        apiCallbacks[name] = tryCatch(param);
        delete params[name];
      }
    }

    const {
      success,
      fail,
      cancel,
      complete
    } = apiCallbacks;

    const hasSuccess = isFn(success);
    const hasFail = isFn(fail);
    const hasCancel = isFn(cancel);
    const hasComplete = isFn(complete);

    if (!hasSuccess && !hasFail && !hasCancel && !hasComplete) { // 无回调
      return {
        params
      }
    }

    const wrapperCallbacks = {};
    for (const name in extras) {
      const extra = extras[name];
      if (isFn(extra)) {
        wrapperCallbacks[name] = tryCatchFramework(extra);
      }
    }

    const {
      beforeSuccess,
      afterSuccess,
      beforeFail,
      afterFail,
      beforeCancel,
      afterCancel,
      beforeAll,
      afterAll
    } = wrapperCallbacks;

    const callbackId = invokeCallbackId++;
    const invokeCallbackName = 'api.' + apiName + '.' + callbackId;

    const invokeCallback = function (res) {
      res.errMsg = res.errMsg || apiName + ':ok';

      // 部分 api 可能返回的 errMsg 的 api 名称部分不一致，格式化为正确的
      if (res.errMsg.indexOf(':ok') !== -1) {
        res.errMsg = apiName + ':ok';
      } else if (res.errMsg.indexOf(':cancel') !== -1) {
        res.errMsg = apiName + ':cancel';
      } else if (res.errMsg.indexOf(':fail') !== -1) {
        let errDetail = '';
        const spaceIndex = res.errMsg.indexOf(' ');
        if (spaceIndex > -1) {
          errDetail = res.errMsg.substr(spaceIndex);
        }
        res.errMsg = apiName + ':fail' + errDetail;
      }

      isFn(beforeAll) && beforeAll(res);

      const errMsg = res.errMsg;

      if (errMsg.indexOf(apiName + ':ok') === 0) {
        isFn(beforeSuccess) && beforeSuccess(res, params);

        hasSuccess && success(res);

        isFn(afterSuccess) && afterSuccess(res);
      } else if (errMsg.indexOf(apiName + ':cancel') === 0) {
        res.errMsg = res.errMsg.replace(apiName + ':cancel', apiName + ':fail cancel');

        hasFail && fail(res);

        isFn(beforeCancel) && beforeCancel(res);

        hasCancel && cancel(res);

        isFn(afterCancel) && afterCancel(res);
      } else if (errMsg.indexOf(apiName + ':fail') === 0) {
        isFn(beforeFail) && beforeFail(res);

        hasFail && fail(res);

        isFn(afterFail) && afterFail(res);
      }

      hasComplete && complete(res);

      isFn(afterAll) && afterAll(res);
    };

    invokeCallbacks[callbackId] = {
      name: invokeCallbackName,
      callback: invokeCallback
    };

    return {
      params,
      callbackId
    }
  }

  function createInvokeCallback (apiName, params = {}, extras = {}) {
    const {
      params: args,
      callbackId
    } = createApiCallback(apiName, params, extras);

    if (isPlainObject(args) && !validateParams(apiName, args, callbackId)) {
      return {
        params: args,
        callbackId: false
      }
    }

    return {
      params: args,
      callbackId
    }
  }
  // onNativeEventReceive((event,data)=>{}) 需要两个参数，写死最多两个参数，避免改动太大，影响已有逻辑
  function invokeCallbackHandler (invokeCallbackId, res, extras) {
    if (typeof invokeCallbackId === 'number') {
      const invokeCallback = invokeCallbacks[invokeCallbackId];
      if (invokeCallback) {
        if (!invokeCallback.keepAlive) {
          delete invokeCallbacks[invokeCallbackId];
        }
        return invokeCallback.callback(res, extras)
      }
    }
    return res
  }

  function removeCallbackHandler (invokeCallbackId) {
    delete invokeCallbacks[invokeCallbackId];
  }

  function wrapperUnimplemented (name) {
    return function todo (args) {
      console.error('API `' + name + '` is not yet implemented');
    }
  }

  function wrapperExtras (name, extras) {
    const protocolOptions = protocol[name];
    if (protocolOptions) {
      isFn(protocolOptions.beforeAll) && (extras.beforeAll = protocolOptions.beforeAll);
      isFn(protocolOptions.beforeSuccess) && (extras.beforeSuccess = protocolOptions.beforeSuccess);
    }
  }

  function wrapper (name, invokeMethod, extras = {}) {
    if (!isFn(invokeMethod)) {
      return invokeMethod
    }
    wrapperExtras(name, extras);
    return function (...args) {
      if (isSyncApi(name)) {
        if (validateParams(name, args, -1)) {
          return invokeMethod.apply(null, args)
        }
      } else if (isCallbackApi(name)) {
        if (validateParams(name, args, -1)) {
          return invokeMethod((name.startsWith('off') ? getKeepAliveApiCallback : createKeepAliveApiCallback)(name, args[0]))
        }
      } else {
        let argsObj = {};
        if (args.length) {
          argsObj = args[0];
        }
        const {
          params,
          callbackId
        } = createInvokeCallback(name, argsObj, extras);
        if (callbackId !== false) {
          let res;
          if (isFn(params)) {
            res = invokeMethod(callbackId);
          } else {
            res = invokeMethod(params, callbackId);
          }
          if (res && !isTaskApi(name)) {
            res = invokeCallbackHandler(callbackId, res);
            if (isPlainObject(res)) {
              res.errMsg = res.errMsg || name + ':ok';
            }
          }
          return res
        }
      }
    }
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function(){

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Use a lookup table to find the index.
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function(arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
      i, len = bytes.length, base64 = "";

      for (i = 0; i < len; i+=3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
      }

      if ((len % 3) === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode =  function(base64) {
      var bufferLength = base64.length * 0.75,
      len = base64.length, i, p = 0,
      encoded1, encoded2, encoded3, encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i+=4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i+1)];
        encoded3 = lookup[base64.charCodeAt(i+2)];
        encoded4 = lookup[base64.charCodeAt(i+3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }

      return arraybuffer;
    };
  })();
  });
  var base64Arraybuffer_1 = base64Arraybuffer.encode;
  var base64Arraybuffer_2 = base64Arraybuffer.decode;

  function base64ToArrayBuffer$1 (str) {
    return base64Arraybuffer_2(str)
  }

  function arrayBufferToBase64$1 (buffer) {
    return base64Arraybuffer_1(buffer)
  }

  var require_context_module_1_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    base64ToArrayBuffer: base64ToArrayBuffer$1,
    arrayBufferToBase64: arrayBufferToBase64$1
  });

  var platformSchema = {};

  // TODO 待处理其他 API 的检测

  function canIUse$1 (schema) {
    if (hasOwn(platformSchema, schema)) {
      return platformSchema[schema]
    }
    return true
  }

  var require_context_module_1_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    canIUse: canIUse$1
  });

  const interceptors = {
    promiseInterceptor
  };

  var require_context_module_1_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    interceptors: interceptors,
    addInterceptor: addInterceptor,
    removeInterceptor: removeInterceptor
  });

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
    } = uni.getSystemInfoSync();

    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === 'ios';
  }

  function checkValue (value, defaultValue) {
    value = Number(value);
    return isNaN(value) ? defaultValue : value
  }

  function upx2px$1 (number, newDeviceWidth) {
    if (deviceWidth === 0) {
      checkDeviceWidth();
    }

    number = Number(number);
    if (number === 0) {
      return 0
    }
    const config = __uniConfig.globalStyle || __uniConfig.window || {};
    const maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
    const baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
    const includeWidth = checkValue(config.rpxCalcIncludeWidth, 750);
    let width = newDeviceWidth || deviceWidth;
    width = number === includeWidth || width <= maxWidth ? width : baseWidth;
    let result = (number / BASE_DEVICE_WIDTH) * width;
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

  var require_context_module_1_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    upx2px: upx2px$1
  });

  function operateAudioPlayer (audioId, pageId, type, data) {
    UniServiceJSBridge.publishHandler(pageId + '-audio-' + audioId, {
      audioId,
      type,
      data
    }, pageId);
  }

  class AudioContext {
    constructor (id, pageId) {
      this.id = id;
      this.pageId = pageId;
    }

    setSrc (src) {
      operateAudioPlayer(this.id, this.pageId, 'setSrc', {
        src
      });
    }

    play () {
      operateAudioPlayer(this.id, this.pageId, 'play');
    }

    pause () {
      operateAudioPlayer(this.id, this.pageId, 'pause');
    }

    seek (position) {
      operateAudioPlayer(this.id, this.pageId, 'seek', {
        position
      });
    }
  }

  function createAudioContext$1 (id, context) {
    if (context) {
      return new AudioContext(id, context.$page.id)
    }
    const app = getApp();
    if (app.$route && app.$route.params.__id__) {
      return new AudioContext(id, app.$route.params.__id__)
    } else {
      UniServiceJSBridge.emit('onError', 'createAudioContext:fail');
    }
  }

  var require_context_module_1_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAudioContext: createAudioContext$1
  });

  const Emitter = new Vue();

  function apply (ctx, method, args) {
    return ctx[method].apply(ctx, args)
  }

  function $on$1 () {
    return apply(Emitter, '$on', [...arguments])
  }

  function $off$1 () {
    return apply(Emitter, '$off', [...arguments])
  }

  function $once$1 () {
    return apply(Emitter, '$once', [...arguments])
  }

  function $emit$1 () {
    return apply(Emitter, '$emit', [...arguments])
  }

  var eventApis = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $on: $on$1,
    $off: $off$1,
    $once: $once$1,
    $emit: $emit$1
  });

  function unpack (args) {
    return args
  }

  function invoke$1 (...args) {
    return UniServiceJSBridge.invokeCallbackHandler(...args)
  }

  function remove (args) {
    return UniServiceJSBridge.removeCallbackHandler(args)
  }

  function requireNativePlugin (name) {
    return uni.requireNativePlugin(name)
  }

  /**
   * 触发 service 层，与 onMethod 对应
   */
  function publish (name, ...args) {
    return UniServiceJSBridge.emit('api.' + name, ...args)
  }

  let lastStatusBarStyle;

  let oldSetStatusBarStyle = plus.navigator.setStatusBarStyle;

  function restoreOldSetStatusBarStyle (setStatusBarStyle) {
    oldSetStatusBarStyle = setStatusBarStyle;
  }

  function newSetStatusBarStyle (style) {
    lastStatusBarStyle = style;
    oldSetStatusBarStyle(style);
  }

  plus.navigator.setStatusBarStyle = newSetStatusBarStyle;

  function setStatusBarStyle (statusBarStyle) {
    if (!statusBarStyle) {
      const pages = getCurrentPages();
      if (!pages.length) {
        return
      }
      statusBarStyle = pages[pages.length - 1].$page.meta.statusBarStyle;
      if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
        return
      }
    }
    if (statusBarStyle === lastStatusBarStyle) {
      return
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('[uni-app] setStatusBarStyle', statusBarStyle);
    }

    lastStatusBarStyle = statusBarStyle;

    plus.navigator.setStatusBarStyle(statusBarStyle);
  }

  function isTabBarPage (path = '') {
    if (!(__uniConfig.tabBar && Array.isArray(__uniConfig.tabBar.list))) {
      return false
    }
    try {
      if (!path) {
        const pages = getCurrentPages();
        if (!pages.length) {
          return false
        }
        const page = pages[pages.length - 1];
        if (!page) {
          return false
        }
        return page.$page.meta.isTabBar
      }
      if (!/^\//.test(path)) {
        path = '/' + path;
      }
      const route = __uniRoutes.find(route => route.path === path);
      return route && route.meta.isTabBar
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('getCurrentPages is not ready');
      }
    }
    return false
  }

  function base64ToArrayBuffer$2 (data) {
    return base64Arraybuffer_2(data)
  }

  function arrayBufferToBase64$2 (data) {
    return base64Arraybuffer_1(data)
  }

  function callApiSync (api, args, name, alias) {
    const ret = api(args);
    if (ret && ret.errMsg) {
      ret.errMsg = ret.errMsg.replace(name, alias);
    }
    return ret
  }

  function getWebview (__page__) {
    if (__page__) {
      return __page__.$getAppWebview()
    }
    return getLastWebview()
  }

  function getLastWebview () {
    try {
      const pages = getCurrentPages();
      if (pages.length) {
        return pages[pages.length - 1].$getAppWebview()
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('getCurrentPages is not ready');
      }
    }
  }

  const getRealRoute$1 = (e, t) => {
    if (t.indexOf('./') === 0) return getRealRoute$1(e, t.substr(2))
    let n;
    let i;
    const o = t.split('/');
    for (n = 0, i = o.length; n < i && o[n] === '..'; n++);
    o.splice(0, n);
    t = o.join('/');
    const r = e.length > 0 ? e.split('/') : [];
    r.splice(r.length - n - 1, n + 1);
    return r.concat(o).join('/')
  };

  // 处理 Android 平台解压与非解压模式下获取的路径不一致的情况
  const _handleLocalPath = filePath => {
    const localUrl = plus.io.convertLocalFileSystemURL(filePath);
    return localUrl.replace(/^\/?apps\//, '/android_asset/apps/').replace(/\/$/, '')
  };

  function getRealPath$1 (filePath) {
    const SCHEME_RE = /^([a-z-]+:)?\/\//i;
    const DATA_RE = /^data:.*,.*/;

    // 无协议的情况补全 https
    if (filePath.indexOf('//') === 0) {
      return 'https:' + filePath
    }

    // 网络资源或base64
    if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath)) {
      return filePath
    }

    if (filePath.indexOf('_www') === 0 || filePath.indexOf('_doc') === 0 || filePath.indexOf('_documents') === 0 ||
      filePath.indexOf('_downloads') === 0) {
      return 'file://' + _handleLocalPath(filePath)
    }
    const wwwPath = 'file://' + _handleLocalPath('_www');
    // 绝对路径转换为本地文件系统路径
    if (filePath.indexOf('/') === 0) {
      // 平台绝对路径 安卓、iOS
      if (filePath.startsWith('/storage/') || filePath.startsWith('/sdcard/') || filePath.includes('/Containers/Data/Application/')) {
        return 'file://' + filePath
      }
      return wwwPath + filePath
    }
    // 相对资源
    if (filePath.indexOf('../') === 0 || filePath.indexOf('./') === 0) {
      if (typeof __id__ === 'string') {
        return wwwPath + getRealRoute$1('/' + __id__, filePath)
      } else {
        const pages = getCurrentPages();
        if (pages.length) {
          return wwwPath + getRealRoute$1('/' + pages[pages.length - 1].route, filePath)
        }
      }
    }
    return filePath
  }

  function getStatusBarStyle () {
    let style = plus.navigator.getStatusBarStyle();
    if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
      style = 'light';
    } else if (style === 'UIStatusBarStyleDefault') {
      style = 'dark';
    }
    return style
  }

  const PI = 3.1415926535897932384626;
  const a = 6378245.0;
  const ee = 0.00669342162296594323;

  function wgs84togcj02 (lng, lat) {
    lat = +lat;
    lng = +lng;
    if (outOfChina(lng, lat)) {
      return [lng, lat]
    }
    let dlat = _transformlat(lng - 105.0, lat - 35.0);
    let dlng = _transformlng(lng - 105.0, lat - 35.0);
    const radlat = lat / 180.0 * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [mglng, mglat]
  }

  function gcj02towgs84 (lng, lat) {
    lat = +lat;
    lng = +lng;
    if (outOfChina(lng, lat)) {
      return [lng, lat]
    }
    let dlat = _transformlat(lng - 105.0, lat - 35.0);
    let dlng = _transformlng(lng - 105.0, lat - 35.0);
    const radlat = lat / 180.0 * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat]
  }

  const _transformlat = function (lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
  };
  const _transformlng = function (lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  };

  const outOfChina = function (lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)
  };

  function getScreenInfo () {
    const {
      resolutionWidth,
      resolutionHeight
    } = plus.screen.getCurrentSize();
    return {
      screenWidth: Math.round(resolutionWidth),
      screenHeight: Math.round(resolutionHeight)
    }
  }

  function warpPlusEvent (module, name) {
    return function (callbackId) {
      plus[module][name](function (data) {
        if (data) {
          delete data.code;
          delete data.message;
        }
        invoke$1(callbackId, data);
      });
    }
  }

  function warpPlusSuccessCallback (callbackId, name) {
    return function errorCallback (result) {
      result = result || {};
      invoke$1(callbackId, Object.assign({}, result, {
        errMsg: `${name}:ok`
      }));
    }
  }

  function warpPlusErrorCallback (callbackId, name, errMsg) {
    return function errorCallback (error) {
      error = error || {};
      // 一键登录errorCallback新增 appid、metadata、uid 参数返回
      const { code = 0, message: errorMessage, ...extraData } = error;
      invoke$1(callbackId, {
        errMsg: `${name}:fail ${errorMessage || errMsg || ''}`,
        errCode: code,
        code,
        ...extraData
      });
    }
  }

  function warpPlusMethod (module, name, before, after) {
    return function (options, callbackId) {
      if (typeof before === 'function') {
        options = before(options);
      }
      plus[module][name](Object.assign(options, {
        success (data = {}) {
          delete data.code;
          delete data.message;
          if (typeof after === 'function') {
            data = after(data);
          }
          invoke$1(callbackId, Object.assign({}, data, {
            errMsg: `${name}:ok`
          }));
        },
        fail: warpPlusErrorCallback(callbackId, name)
      }));
    }
  }

  function getFileName (path) {
    const array = path.split('/');
    return array[array.length - 1]
  }

  function getExtName (path) {
    const array = path.split('.');
    return array.length > 1 ? '.' + array[array.length - 1] : ''
  }

  const AUDIO_DEFAULT_SESSION_CATEGORY = 'playback';

  const audios = {};

  const evts = ['play', 'canplay', 'ended', 'stop', 'waiting', 'seeking', 'seeked', 'pause'];

  const publishAudioStateChange = (state, res = {}) => publish('onAudioStateChange', Object.assign({
    state
  }, res));

  const initStateChage = audioId => {
    const audio = audios[audioId];
    if (!audio) {
      return
    }
    if (!audio.initStateChage) {
      audio.initStateChage = true;

      audio.addEventListener('error', error => {
        publishAudioStateChange('error', {
          audioId,
          errMsg: 'MediaError',
          errCode: error.code
        });
      });

      evts.forEach(event => {
        audio.addEventListener(event, () => {
          // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
          if (event === 'play') {
            audio.isStopped = false;
          } else if (event === 'stop') {
            audio.isStopped = true;
          }
          publishAudioStateChange(event, {
            audioId
          });
        });
      });
    }
  };

  function createAudioInstance () {
    const audioId = `${Date.now()}${Math.random()}`;
    const audio = audios[audioId] = plus.audio.createPlayer('');
    audio.src = '';
    audio.volume = 1;
    audio.startTime = 0;
    audio.setSessionCategory(AUDIO_DEFAULT_SESSION_CATEGORY);
    return {
      errMsg: 'createAudioInstance:ok',
      audioId
    }
  }

  function destroyAudioInstance ({
    audioId
  }) {
    if (audios[audioId]) {
      audios[audioId].close();
      delete audios[audioId];
    }
    return {
      errMsg: 'destroyAudioInstance:ok',
      audioId
    }
  }

  function setAudioState ({
    audioId,
    src,
    startTime,
    autoplay = false,
    loop = false,
    obeyMuteSwitch,
    volume,
    sessionCategory = AUDIO_DEFAULT_SESSION_CATEGORY,
    playbackRate
  }) {
    const audio = audios[audioId];
    if (audio) {
      const style = {
        loop,
        autoplay
      };
      if (src) {
        // iOS 设置 src 会重新播放
        const realSrc = getRealPath$1(src);
        if (audio.src !== realSrc) audio.src = style.src = realSrc;
      }
      if (startTime) {
        audio.startTime = style.startTime = startTime;
      }
      if (typeof volume === 'number') {
        audio.volume = style.volume = volume;
      }
      audio.setStyles(style);
      if (sessionCategory) {
        audio.setSessionCategory(sessionCategory);
      }
      if (playbackRate && audio.playbackRate) {
        audio.playbackRate(playbackRate);
      }
      initStateChage(audioId);
    }
    return {
      errMsg: 'setAudioState:ok'
    }
  }

  function getAudioState ({
    audioId
  }) {
    const audio = audios[audioId];
    if (!audio) {
      return {
        errMsg: 'getAudioState:fail'
      }
    }
    const {
      src,
      startTime,
      volume
    } = audio;

    return {
      errMsg: 'getAudioState:ok',
      duration: 1e3 * (audio.getDuration() || 0),
      currentTime: audio.isStopped ? 0 : 1e3 * audio.getPosition(),
      paused: audio.isPaused(),
      src,
      volume,
      startTime: 1e3 * startTime,
      buffered: 1e3 * audio.getBuffered()
    }
  }

  function operateAudio ({
    operationType,
    audioId,
    currentTime
  }) {
    const audio = audios[audioId];
    const operationTypes = ['play', 'pause', 'stop'];
    if (operationTypes.indexOf(operationType) >= 0) {
      audio[operationType === operationTypes[0] && audio.isPaused() ? 'resume' : operationType]();
    } else if (operationType === 'seek') {
      audio.seekTo(currentTime / 1e3);
    }
    return {
      errMsg: 'operateAudio:ok'
    }
  }

  let audio;

  let timeUpdateTimer = null;
  const TIME_UPDATE = 250;

  const publishBackgroundAudioStateChange = (state, res = {}) => publish('onBackgroundAudioStateChange', Object.assign({
    state
  }, res));

  const events = ['play', 'pause', 'ended', 'stop', 'canplay'];

  function initMusic () {
    if (audio) {
      return
    }
    audio = plus.audio.createPlayer({
      autoplay: true,
      backgroundControl: true
    });
    audio.src = audio.title = audio.epname = audio.singer = audio.coverImgUrl = audio.webUrl = '';
    audio.startTime = 0;
    events.forEach(event => {
      audio.addEventListener(event, () => {
        // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
        if (event === 'play') {
          audio.isStopped = false;
          startTimeUpdateTimer();
        } else if (event === 'stop') {
          audio.isStopped = true;
        }

        if (event === 'pause' || event === 'ended' || event === 'stop') {
          stopTimeUpdateTimer();
        }

        const eventName = `onMusic${event[0].toUpperCase() + event.substr(1)}`;
        publish(eventName, {
          dataUrl: audio.src,
          errMsg: `${eventName}:ok`
        });
        publishBackgroundAudioStateChange(event, {
          dataUrl: audio.src
        });
      });
    });
    audio.addEventListener('waiting', () => {
      stopTimeUpdateTimer();
      publishBackgroundAudioStateChange('waiting', {
        dataUrl: audio.src
      });
    });
    audio.addEventListener('error', err => {
      stopTimeUpdateTimer();
      publish('onMusicError', {
        dataUrl: audio.src,
        errMsg: 'Error:' + err.message
      });
      publishBackgroundAudioStateChange('error', {
        dataUrl: audio.src,
        errMsg: err.message,
        errCode: err.code
      });
    });
    audio.addEventListener('prev', () => publish('onBackgroundAudioPrev'));
    audio.addEventListener('next', () => publish('onBackgroundAudioNext'));
  }

  function startTimeUpdateTimer () {
    stopTimeUpdateTimer();
    timeUpdateTimer = setInterval(() => {
      publishBackgroundAudioStateChange('timeUpdate', {});
    }, TIME_UPDATE);
  }

  function stopTimeUpdateTimer () {
    if (timeUpdateTimer !== null) {
      clearInterval(timeUpdateTimer);
    }
  }

  function setMusicState (args, name) {
    initMusic();
    const props = ['src', 'startTime', 'coverImgUrl', 'webUrl', 'singer', 'epname', 'title'];

    if (name && name === 'playbackRate') {
      const val = args[name];
      audio.playbackRate && audio.playbackRate(parseFloat(val));
      return
    }

    const style = {};
    Object.keys(args).forEach(key => {
      if (props.indexOf(key) >= 0) {
        let val = args[key];
        if (key === props[0] && val) {
          val = getRealPath$1(val);
        }
        audio[key] = style[key] = val;
      }
    });
    audio.setStyles(style);
  }

  function getAudio () {
    return audio
  }

  function getMusicPlayerState () {
    const audio = getAudio();
    if (audio) {
      return {
        dataUrl: audio.src,
        duration: audio.getDuration() || 0,
        currentPosition: audio.getPosition(),
        status: audio.isPaused() ? 0 : 1,
        downloadPercent: Math.round(100 * audio.getBuffered() / audio.getDuration()),
        errMsg: 'getMusicPlayerState:ok'
      }
    }
    return {
      status: 2,
      errMsg: 'getMusicPlayerState:ok'
    }
  }
  function operateMusicPlayer ({
    operationType,
    dataUrl,
    position,
    api = 'operateMusicPlayer',
    title,
    coverImgUrl
  }) {
    const audio = getAudio();
    var operationTypes = ['resume', 'pause', 'stop'];
    if (operationTypes.indexOf(operationType) > 0) {
      audio && audio[operationType]();
    } else if (operationType === 'play') {
      setMusicState({
        src: dataUrl,
        startTime: position,
        title,
        coverImgUrl
      });
      audio.play();
    } else if (operationType === 'seek') {
      audio && audio.seekTo(position);
    }
    return {
      errMsg: `${api}:ok`
    }
  }
  function setBackgroundAudioState (args, name) {
    setMusicState(args, name);
    return {
      errMsg: 'setBackgroundAudioState:ok'
    }
  }
  function operateBackgroundAudio ({
    operationType,
    src,
    startTime,
    currentTime
  }) {
    return operateMusicPlayer({
      operationType,
      dataUrl: src,
      position: startTime || currentTime || 0,
      api: 'operateBackgroundAudio'
    })
  }
  function getBackgroundAudioState () {
    let data = {
      duration: 0,
      currentTime: 0,
      paused: false,
      src: '',
      buffered: 0,
      title: '',
      epname: '',
      singer: '',
      coverImgUrl: '',
      webUrl: '',
      startTime: 0,
      errMsg: 'getBackgroundAudioState:ok'
    };
    const audio = getAudio();
    if (audio) {
      const newData = {
        duration: audio.getDuration() || 0,
        currentTime: audio.isStopped ? 0 : audio.getPosition(),
        paused: audio.isPaused(),
        src: audio.src,
        buffered: audio.getBuffered(),
        title: audio.title,
        epname: audio.epname,
        singer: audio.singer,
        coverImgUrl: audio.coverImgUrl,
        webUrl: audio.webUrl,
        startTime: audio.startTime
      };
      data = Object.assign(data, newData);
    }
    return data
  }

  function operateMapPlayer (mapId, pageVm, type, data) {
    const pageId = pageVm.$page.id;
    UniServiceJSBridge.publishHandler(pageId + '-map-' + mapId, {
      mapId,
      type,
      data
    }, pageId);
  }

  const SUCCESS = 'success';
  const FAIL = 'fail';
  const COMPLETE = 'complete';
  const CALLBACKS = [SUCCESS, FAIL, COMPLETE];

  /**
   * 调用无参数，或仅一个参数且为 callback 的 API
   * @param {Object} vm
   * @param {Object} method
   * @param {Object} args
   * @param {Object} extras
   */
  function invokeVmMethodWithoutArgs (vm, method, args, extras) {
    if (!vm) {
      return
    }
    if (typeof args === 'undefined') {
      return vm[method]()
    }
    const [, callbacks] = normalizeArgs(args, extras);
    if (!Object.keys(callbacks).length) {
      return vm[method]()
    }
    return vm[method](normalizeCallback(method, callbacks))
  }
  /**
   * 调用两个参数（第一个入参为普通参数，第二个入参为 callback） API
   * @param {Object} vm
   * @param {Object} method
   * @param {Object} args
   * @param {Object} extras
   */
  function invokeVmMethod (vm, method, args, extras) {
    if (!vm) {
      return
    }
    const [pureArgs, callbacks] = normalizeArgs(args, extras);
    if (!Object.keys(callbacks).length) {
      return vm[method](pureArgs)
    }
    return vm[method](pureArgs, normalizeCallback(method, callbacks))
  }

  function findElmById (id, vm) {
    const elm = findRefByElm(id, vm.$el);
    if (!elm) {
      return console.error('Can not find `' + id + '`')
    }
    return elm
  }

  function findRefByElm (id, elm) {
    if (!id || !elm) {
      return
    }
    if (elm.attr && elm.attr.id === id) {
      return elm
    }
    const children = elm.children;
    if (!children) {
      return
    }
    for (let i = 0, len = children.length; i < len; i++) {
      const elm = findRefByElm(id, children[i]);
      if (elm) {
        return elm
      }
    }
  }

  function normalizeArgs (args = {}, extras) {
    const callbacks = Object.create(null);

    const iterator = function iterator (name) {
      const callback = args[name];
      if (isFn(callback)) {
        callbacks[name] = callback;
        delete args[name];
      }
    };

    CALLBACKS.forEach(iterator);

    extras && extras.forEach(iterator);

    return [args, callbacks]
  }

  function normalizeCallback (method, callbacks) {
    return function weexCallback (ret) {
      const type = ret.type;
      delete ret.type;
      const callback = callbacks[type];

      if (type === SUCCESS) {
        ret.errMsg = `${method}:ok`;
      } else if (type === FAIL) {
        ret.errMsg = method + ':fail' + (ret.msg ? (' ' + ret.msg) : '');
      }

      delete ret.code;
      delete ret.msg;

      isFn(callback) && callback(ret);

      if (type === SUCCESS || type === FAIL) {
        const complete = callbacks.complete;
        isFn(complete) && complete(ret);
      }
    }
  }

  const METHODS = {
    getCenterLocation (ctx, cbs) {
      return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs)
    },
    moveToLocation (ctx, args) {
      return invokeVmMethod(ctx, 'moveToLocation', args)
    },
    translateMarker (ctx, args) {
      return invokeVmMethod(ctx, 'translateMarker', args, ['animationEnd'])
    },
    includePoints (ctx, args) {
      return invokeVmMethod(ctx, 'includePoints', args)
    },
    getRegion (ctx, cbs) {
      return invokeVmMethodWithoutArgs(ctx, 'getRegion', cbs)
    },
    getScale (ctx, cbs) {
      return invokeVmMethodWithoutArgs(ctx, 'getScale', cbs)
    },
    addCustomLayer (ctx, args) {
      return invokeVmMethod(ctx, 'addCustomLayer', args)
    },
    removeCustomLayer (ctx, args) {
      return invokeVmMethod(ctx, 'removeCustomLayer', args)
    },
    addGroundOverlay (ctx, args) {
      return invokeVmMethod(ctx, 'addGroundOverlay', args)
    },
    removeGroundOverlay (ctx, args) {
      return invokeVmMethod(ctx, 'removeGroundOverlay', args)
    },
    updateGroundOverlay (ctx, args) {
      return invokeVmMethod(ctx, 'updateGroundOverlay', args)
    },
    initMarkerCluster (ctx, args) {
      return invokeVmMethod(ctx, 'initMarkerCluster', args)
    },
    addMarkers (ctx, args) {
      return invokeVmMethod(ctx, 'addMarkers', args)
    },
    removeMarkers (ctx, args) {
      return invokeVmMethod(ctx, 'removeMarkers', args)
    },
    moveAlong (ctx, args) {
      return invokeVmMethod(ctx, 'moveAlong', args)
    },
    openMapApp (ctx, args) {
      return invokeVmMethod(ctx, 'openMapApp', args)
    },
    on (ctx, args) {
      return ctx.on(args.name, args.callback)
    }
  };

  function operateMapPlayer$1 (mapId, pageVm, type, data) {
    return METHODS[type](findElmById(mapId, pageVm), data)
  }

  function operateMapPlayer$2 (mapId, pageVm, type, data) {
    pageVm.$page.meta.isNVue
      ? operateMapPlayer$1(mapId, pageVm, type, data)
      : operateMapPlayer(mapId, pageVm, type, data);
  }

  function operateVideoPlayer (videoId, pageVm, type, data) {
    const pageId = pageVm.$page.id;
    UniServiceJSBridge.publishHandler(pageId + '-video-' + videoId, {
      videoId,
      type,
      data
    }, pageId);
  }

  const METHODS$1 = {
    play (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'play')
    },
    pause (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'pause')
    },
    seek (ctx, args) {
      return invokeVmMethod(ctx, 'seek', args.position)
    },
    stop (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'stop')
    },
    sendDanmu (ctx, args) {
      return invokeVmMethod(ctx, 'sendDanmu', args)
    },
    playbackRate (ctx, args) {
      return invokeVmMethod(ctx, 'playbackRate', args.rate)
    },
    requestFullScreen (ctx, args) {
      return invokeVmMethod(ctx, 'requestFullScreen', args)
    },
    exitFullScreen (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'exitFullScreen')
    },
    showStatusBar (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'showStatusBar')
    },
    hideStatusBar (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'hideStatusBar')
    }
  };

  function operateVideoPlayer$1 (videoId, pageVm, type, data) {
    return METHODS$1[type](findElmById(videoId, pageVm), data)
  }

  function operateVideoPlayer$2 (videoId, pageVm, type, data) {
    pageVm.$page.meta.isNVue
      ? operateVideoPlayer$1(videoId, pageVm, type, data)
      : operateVideoPlayer(videoId, pageVm, type, data);
  }

  class LivePusherContext {
    constructor (id, ctx) {
      this.id = id;
      this.ctx = ctx;
    }

    start (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'start', cbs)
    }

    stop (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'stop', cbs)
    }

    pause (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'pause', cbs)
    }

    resume (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'resume', cbs)
    }

    switchCamera (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'switchCamera', cbs)
    }

    snapshot (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'snapshot', cbs)
    }

    toggleTorch (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'toggleTorch', cbs)
    }

    playBGM (args) {
      return invokeVmMethod(this.ctx, 'playBGM', args)
    }

    stopBGM (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'stopBGM', cbs)
    }

    pauseBGM (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'pauseBGM', cbs)
    }

    resumeBGM (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'resumeBGM', cbs)
    }

    setBGMVolume (cbs) {
      return invokeVmMethod(this.ctx, 'setBGMVolume', cbs)
    }

    startPreview (cbs) {
      return invokeVmMethodWithoutArgs(this.ctx, 'startPreview', cbs)
    }

    stopPreview (args) {
      return invokeVmMethodWithoutArgs(this.ctx, 'stopPreview', args)
    }
  }

  function createLivePusherContext (id, vm) {
    if (!vm) {
      return console.warn('uni.createLivePusherContext: 2 arguments required, but only 1 present')
    }
    const elm = findElmById(id, vm);
    if (!elm) {
      return console.warn('Can not find `' + id + '`')
    }
    return new LivePusherContext(id, elm)
  }

  function operateLivePusher (livePusherId, pageVm, type, data) {
    const pageId = pageVm.$page.id;
    UniServiceJSBridge.publishHandler(pageId + '-livepusher-' + livePusherId, {
      livePusherId,
      type,
      data
    }, pageId);
  }

  UniServiceJSBridge.subscribe('onLivePusherMethodCallback', ({
    callbackId,
    data
  }) => {
    callback.invoke(callbackId, data);
  });

  const methods = [
    'start',
    'stop',
    'pause',
    'resume',
    'switchCamera',
    'startPreview',
    'stopPreview',
    'snapshot'
  ];

  const methodMapping = {
    startPreview: 'preview',
    stopPreview: 'stop'
  };

  class LivePusherContext$1 {
    constructor (id, pageVm) {
      this.id = id;
      this.pageVm = pageVm;
    }

    on (name, callback) {
      operateLivePusher(this.id, this.pageVm, 'on', {
        name,
        callback
      });
    }
  }

  methods.forEach(function (method) {
    LivePusherContext$1.prototype[method] = callback.warp(function (options, callbackId) {
      options.callbackId = callbackId;
      const methodName = methodMapping[method] ? methodMapping[method] : method;
      operateLivePusher(this.id, this.pageVm, methodName, options);
    });
  });

  function createLivePusherContext$1 (id, context) {
    if (context.$page.meta.isNVue) {
      return createLivePusherContext(id, context)
    }
    return new LivePusherContext$1(id, context)
  }

  const DEVICE_FREQUENCY = 200;
  const NETWORK_TYPES = ['unknown', 'none', 'ethernet', 'wifi', '2g', '3g', '4g', '5g'];

  const MAP_ID = '__UNIAPP_MAP';

  const TEMP_PATH_BASE = '_doc/uniapp_temp';
  const TEMP_PATH = `${TEMP_PATH_BASE}_${Date.now()}`;

  let listener;

  const callbackIds = [];

  function startAccelerometer (options, callbackId) {
    listener = listener || plus.accelerometer.watchAcceleration((res) => {
      callbackIds.forEach(callbackId => {
        invoke$1(callbackId, {
          x: res.xAxis,
          y: res.yAxis,
          z: res.zAxis
        });
      });
    }, err => {
      listener = null;
      invoke$1(callbackId, {
        errMsg: `startAccelerometer:fail ${err.message}`
      });
    }, {
      frequency: DEVICE_FREQUENCY
    });
    setTimeout(() => {
      invoke$1(callbackId, {
        errMsg: 'startAccelerometer:ok'
      });
    }, DEVICE_FREQUENCY);
  }

  function stopAccelerometer () {
    if (listener) {
      plus.accelerometer.clearWatch(listener);
      listener = null;
    }
    return {}
  }

  function onAccelerometerChange (callbackId) {
    if (!callbackIds.length) {
      startAccelerometer();
    }
    callbackIds.push(callbackId);
  }

  function offAccelerometerChange (callbackId) {
    // 暂不支持移除所有监听
    if (callbackId) {
      const index = callbackIds.indexOf(callbackId);
      if (index >= 0) {
        callbackIds.splice(index, 1);
      }
    }
    if (!callbackIds.length) {
      stopAccelerometer();
    }
  }

  const schema = {
    name: {
      givenName: 'firstName',
      middleName: 'middleName',
      familyName: 'lastName'
    },
    nickname: 'nickName',
    photos: {
      type: 'url',
      value: 'photoFilePath'
    },
    note: 'remark',
    phoneNumbers: [
      {
        type: 'mobile',
        value: 'mobilePhoneNumber'
      },
      {
        type: 'work',
        value: 'workPhoneNumber'
      },
      {
        type: 'company',
        value: 'hostNumber'
      },
      {
        type: 'home fax',
        value: 'homeFaxNumber'
      },
      {
        type: 'work fax',
        value: 'workFaxNumber'
      }
    ],
    emails: [{
      type: 'home',
      value: 'email'
    }],
    urls: [{
      type: 'other',
      value: 'url'
    }],
    organizations: [{
      type: 'company',
      name: 'organization',
      title: 'title'
    }],
    ims: [{
      type: 'other',
      value: 'weChatNumber'
    }],
    addresses: [
      {
        type: 'other',
        preferred: true,
        country: 'addressCountry',
        region: 'addressState',
        locality: 'addressCity',
        streetAddress: 'addressStreet',
        postalCode: 'addressPostalCode'
      },
      {
        type: 'home',
        country: 'homeAddressCountry',
        region: 'homeAddressState',
        locality: 'homeAddressCity',
        streetAddress: 'homeAddressStreet',
        postalCode: 'homeAddressPostalCode'
      },
      {
        type: 'company',
        country: 'workAddressCountry',
        region: 'workAddressState',
        locality: 'workAddressCity',
        streetAddress: 'workAddressStreet',
        postalCode: 'workAddressPostalCode'
      }
    ]
  };

  const keepFields = ['type', 'preferred'];

  function buildContact (contact, data, schema) {
    let hasValue = 0;
    Object.keys(schema).forEach(contactKey => {
      const dataKey = schema[contactKey];
      const typed = typeof dataKey;
      if (typed !== 'object') {
        if (keepFields.indexOf(contactKey) !== -1) {
          contact[contactKey] = schema[contactKey];
        } else {
          if (typeof data[dataKey] !== 'undefined') {
            hasValue++;
            contact[contactKey] = data[dataKey];
          } else {
            delete contact[contactKey];
          }
        }
      } else {
        if (dataKey instanceof Array) {
          contact[contactKey] = [];
          dataKey.forEach(item => {
            const obj = {};
            if (buildContact(obj, data, item)) {
              contact[contactKey].push(obj);
            }
          });
          if (!contact[contactKey].length) {
            delete contact[contactKey];
          } else {
            hasValue++;
          }
        } else {
          contact[contactKey] = {};
          if (buildContact(contact[contactKey], data, dataKey)) {
            hasValue++;
          } else {
            delete contact[contactKey];
          }
        }
      }
    });
    return hasValue
  }

  function addPhoneContact$1 (data, callbackId) {
    plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
      !data.photoFilePath && (data.photoFilePath = '');
      const contact = addressbook.create();
      buildContact(contact, data, schema);
      contact.save(() => {
        invoke$1(callbackId, {
          errMsg: 'addPhoneContact:ok'
        });
      }, (e) => {
        invoke$1(callbackId, {
          errMsg: 'addPhoneContact:fail'
        });
      });
    }, (e) => {
      invoke$1(callbackId, {
        errMsg: 'addPhoneContact:fail'
      });
    });
  }

  const onBluetoothDeviceFound = warpPlusEvent('bluetooth', 'onBluetoothDeviceFound');
  const onBluetoothAdapterStateChange = warpPlusEvent('bluetooth', 'onBluetoothAdapterStateChange');
  const onBLEConnectionStateChange = warpPlusEvent('bluetooth', 'onBLEConnectionStateChange');
  const onBLECharacteristicValueChange = warpPlusEvent('bluetooth', 'onBLECharacteristicValueChange');

  function toUpperCase (options = {}) {
    const deviceId = options.deviceId;
    if (deviceId) {
      options.deviceId = deviceId.toUpperCase();
    }
    const serviceId = options.serviceId;
    if (serviceId) {
      options.serviceId = serviceId.toUpperCase();
    }
    return options
  }

  const openBluetoothAdapter = warpPlusMethod('bluetooth', 'openBluetoothAdapter');
  const closeBluetoothAdapter = warpPlusMethod('bluetooth', 'closeBluetoothAdapter');
  const getBluetoothAdapterState = warpPlusMethod('bluetooth', 'getBluetoothAdapterState');
  const startBluetoothDevicesDiscovery = warpPlusMethod('bluetooth', 'startBluetoothDevicesDiscovery', toUpperCase);
  const stopBluetoothDevicesDiscovery = warpPlusMethod('bluetooth', 'stopBluetoothDevicesDiscovery');
  const getBluetoothDevices = warpPlusMethod('bluetooth', 'getBluetoothDevices');
  const getConnectedBluetoothDevices = warpPlusMethod('bluetooth', 'getConnectedBluetoothDevices', toUpperCase);
  const createBLEConnection = warpPlusMethod('bluetooth', 'createBLEConnection', toUpperCase);
  const closeBLEConnection = warpPlusMethod('bluetooth', 'closeBLEConnection', toUpperCase);
  const getBLEDeviceServices = warpPlusMethod('bluetooth', 'getBLEDeviceServices', toUpperCase);
  const getBLEDeviceCharacteristics = warpPlusMethod('bluetooth', 'getBLEDeviceCharacteristics', toUpperCase);
  const notifyBLECharacteristicValueChange = warpPlusMethod('bluetooth', 'notifyBLECharacteristicValueChange', toUpperCase);
  const readBLECharacteristicValue = warpPlusMethod('bluetooth', 'readBLECharacteristicValue', toUpperCase);
  const writeBLECharacteristicValue = warpPlusMethod('bluetooth', 'writeBLECharacteristicValue', toUpperCase);
  const setBLEMTU = warpPlusMethod('bluetooth', 'setBLEMTU', toUpperCase);
  const getBLEDeviceRSSI = warpPlusMethod('bluetooth', 'getBLEDeviceRSSI', toUpperCase);

  function getScreenBrightness () {
    return {
      errMsg: 'getScreenBrightness:ok',
      value: plus.screen.getBrightness(false)
    }
  }

  function setScreenBrightness ({
    value
  } = {}) {
    plus.screen.setBrightness(value, false);
    return {
      errMsg: 'setScreenBrightness:ok'
    }
  }

  function setKeepScreenOn ({
    keepScreenOn
  } = {}) {
    plus.device.setWakelock(!!keepScreenOn);
    return {
      errMsg: 'setKeepScreenOn:ok'
    }
  }

  function getClipboardData (options, callbackId) {
    const clipboard = requireNativePlugin('clipboard');
    clipboard.getString(ret => {
      if (ret.result === 'success') {
        invoke$1(callbackId, {
          data: ret.data,
          errMsg: 'getClipboardData:ok'
        });
      } else {
        invoke$1(callbackId, {
          data: ret.result,
          errMsg: 'getClipboardData:fail'
        });
      }
    });
  }

  function setClipboardData$1 ({
    data
  }) {
    const clipboard = requireNativePlugin('clipboard');
    clipboard.setString(data);
    return {
      errMsg: 'setClipboardData:ok'
    }
  }

  let listener$1;

  const callbackIds$1 = [];

  function startCompass (options, callbackId) {
    listener$1 = listener$1 || plus.orientation.watchOrientation((res) => {
      callbackIds$1.forEach(callbackId => {
        invoke$1(callbackId, {
          direction: res.magneticHeading
        });
      });
    }, err => {
      listener$1 = null;
      invoke$1(callbackId, {
        errMsg: `startCompass:fail ${err.message}`
      });
    }, {
      frequency: DEVICE_FREQUENCY
    });
    setTimeout(() => {
      invoke$1(callbackId, {
        errMsg: 'startCompass:ok'
      });
    }, DEVICE_FREQUENCY);
  }

  function stopCompass () {
    if (listener$1) {
      plus.orientation.clearWatch(listener$1);
      listener$1 = null;
    }
    return {}
  }

  function onCompassChange (callbackId) {
    if (!callbackIds$1.length) {
      startCompass();
    }
    callbackIds$1.push(callbackId);
  }

  function offCompassChange (callbackId) {
    // 暂不支持移除所有监听
    if (callbackId) {
      const index = callbackIds$1.indexOf(callbackId);
      if (index >= 0) {
        callbackIds$1.splice(index, 1);
      }
    }
    if (!callbackIds$1.length) {
      stopCompass();
    }
  }

  function getNetworkType () {
    return {
      errMsg: 'getNetworkType:ok',
      networkType: NETWORK_TYPES[plus.networkinfo.getCurrentType()] || 'unknown'
    }
  }

  const onBeaconUpdate = warpPlusEvent('ibeacon', 'onBeaconUpdate');
  const onBeaconServiceChange = warpPlusEvent('ibeacon', 'onBeaconServiceChange');

  const getBeacons = warpPlusMethod('ibeacon', 'getBeacons');
  const startBeaconDiscovery = warpPlusMethod('ibeacon', 'startBeaconDiscovery');
  const stopBeaconDiscovery = warpPlusMethod('ibeacon', 'stopBeaconDiscovery');

  function makePhoneCall$1 ({
    phoneNumber
  } = {}) {
    plus.device.dial(phoneNumber);
    return {
      errMsg: 'makePhoneCall:ok'
    }
  }

  const downgrade = plus.os.name === 'Android' && parseInt(plus.os.version) < 6;

  const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in';
  const ANI_DURATION = 300;

  const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out';

  const ON_REACH_BOTTOM_DISTANCE = 50;

  const VIEW_WEBVIEW_PATH = '_www/__uniappview.html';

  const V_FOR = 'f';
  const V_IF = 'i';
  const V_ELSE_IF = 'e';
  const V_SHOW = 'v-show';

  const B_CLASS = 'c';
  const B_STYLE = 's';

  const S_CLASS = 'sc';

  const callbacks$1 = {};
  const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE';
  // 简单处理 view 层与 service 层的通知系统
  /**
   * 消费 view 层通知
   */
  function consumePlusMessage (type, args) {
    // 处理 web-view 组件发送的通知
    if (type === WEB_INVOKE_APPSERVICE) {
      publish(WEB_INVOKE_APPSERVICE, args.data, args.webviewIds);
      return true
    }
    const callback = callbacks$1[type];
    if (callback) {
      callback(args);
      if (!callback.keepAlive) {
        delete callbacks$1[type];
      }
      return true
    }
    return false
  }
  /**
   * 注册 view 层通知 service 层事件处理
   */
  function registerPlusMessage (type, callback, keepAlive = true) {
    if (callbacks$1[type]) {
      return console.warn(`'${type}' registered: ` + (callbacks$1[type].toString()))
    }
    callback.keepAlive = !!keepAlive;
    callbacks$1[type] = callback;
  }

  const SCAN_ID = '__UNIAPP_SCAN';
  const SCAN_PATH = '_www/__uniappscan.html';

  const MESSAGE_TYPE = 'scanCode';

  function scanCode$1 ({
    onlyFromCamera = false,
    scanType,
    autoDecodeCharSet
  }, callbackId) {
    const barcode = plus.barcode;
    const SCAN_TYPES = {
      qrCode: [
        barcode.QR,
        barcode.AZTEC,
        barcode.MAXICODE
      ],
      barCode: [
        barcode.EAN13,
        barcode.EAN8,
        barcode.UPCA,
        barcode.UPCE,
        barcode.CODABAR,
        barcode.CODE128,
        barcode.CODE39,
        barcode.CODE93,
        barcode.ITF,
        barcode.RSS14,
        barcode.RSSEXPANDED
      ],
      datamatrix: [barcode.DATAMATRIX],
      pdf417: [barcode.PDF417]
    };

    const SCAN_MAPS = {
      [barcode.QR]: 'QR_CODE',
      [barcode.EAN13]: 'EAN_13',
      [barcode.EAN8]: 'EAN_8',
      [barcode.DATAMATRIX]: 'DATA_MATRIX',
      [barcode.UPCA]: 'UPC_A',
      [barcode.UPCE]: 'UPC_E',
      [barcode.CODABAR]: 'CODABAR',
      [barcode.CODE39]: 'CODE_39',
      [barcode.CODE93]: 'CODE_93',
      [barcode.CODE128]: 'CODE_128',
      [barcode.ITF]: 'CODE_25',
      [barcode.PDF417]: 'PDF_417',
      [barcode.AZTEC]: 'AZTEC',
      [barcode.RSS14]: 'RSS_14',
      [barcode.RSSEXPANDED]: 'RSSEXPANDED'
    };

    const statusBarStyle = getStatusBarStyle();
    const isDark = statusBarStyle !== 'light';

    let result;

    let filters = [];
    if (Array.isArray(scanType) && scanType.length) {
      scanType.forEach(type => { // 暂不考虑去重
        const types = SCAN_TYPES[type];
        if (types) {
          filters = filters.concat(types);
        }
      });
    }
    if (!filters.length) {
      filters = filters.concat(SCAN_TYPES.qrCode).concat(SCAN_TYPES.barCode).concat(SCAN_TYPES.datamatrix).concat(
        SCAN_TYPES.pdf417);
    }

    const buttons = [];
    if (!onlyFromCamera) {
      buttons.push({
        float: 'right',
        text: t('uni.scanCode.album'),
        fontSize: '17px',
        width: '60px',
        onclick: function () {
          plus.gallery.pick(file => {
            barcode.scan(file, (type, code, path, charSet) => {
              if (isDark) {
                plus.navigator.setStatusBarStyle('dark');
              }
              result = {
                type,
                code,
                charSet
              };
              webview.close('auto');
            }, () => {
              plus.nativeUI.toast(t('uni.scanCode.fail'));
            }, filters, autoDecodeCharSet);
          }, err => {
            // iOS {"code":-2,"message":"用户取消,https://ask.dcloud.net.cn/article/282"}
            // Android {"code":12,"message":"User cancelled"}
            if (err.code !== (plus.os.name === 'Android' ? 12 : -2)) {
              plus.nativeUI.toast(t('uni.scanCode.fail'));
            }
          }, {
            multiple: false,
            system: false,
            filename: TEMP_PATH + '/gallery/',
            permissionAlert: true
          });
        }
      });
    }

    const webview = plus.webview.create(SCAN_PATH, SCAN_ID, {
      titleNView: {
        autoBackButton: true,
        type: 'float',
        backgroundColor: 'rgba(0,0,0,0)',
        titleColor: '#ffffff',
        titleText: t('uni.scanCode.title'),
        titleSize: '17px',
        buttons
      },
      popGesture: 'close',
      backButtonAutoControl: 'close'
    }, {
      __uniapp_type: 'scan',
      __uniapp_dark: isDark,
      __uniapp_scan_type: filters,
      __uniapp_auto_decode_char_set: autoDecodeCharSet,
      __uniapp_locale: getLocale(),
      'uni-app': 'none'
    });
    const waiting = plus.nativeUI.showWaiting();
    webview.addEventListener('titleUpdate', () => {
      webview.show(ANI_SHOW, ANI_DURATION, () => {
        waiting.close();
      });
    });
    webview.addEventListener('close', () => {
      if (result) {
        invoke$1(callbackId, {
          result: result.code,
          scanType: SCAN_MAPS[result.type] || '',
          charSet: result.charSet || 'utf8',
          path: '',
          errMsg: 'scanCode:ok'
        });
      } else {
        invoke$1(callbackId, {
          errMsg: 'scanCode:fail cancel'
        });
      }
      consumePlusMessage(MESSAGE_TYPE);
    });
    if (isDark) { // 状态栏前景色
      plus.navigator.setStatusBarStyle('light');
      webview.addEventListener('popGesture', ({
        type,
        result
      }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('dark');
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('light');
        }
      });
    }

    registerPlusMessage(MESSAGE_TYPE, function (res) {
      if (res && 'code' in res) {
        result = res;
      }
    }, false);
  }

  var webview = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SCAN_ID: SCAN_ID,
    SCAN_PATH: SCAN_PATH,
    scanCode: scanCode$1
  });

  let plus_;
  let weex_;
  let BroadcastChannel_;

  function getRuntime () {
    return typeof window === 'object' && typeof navigator === 'object' && typeof document === 'object' ? 'webview' : 'v8'
  }

  function getPageId () {
    return plus_.webview.currentWebview().id
  }

  let channel;
  let globalEvent;
  const callbacks$2 = {};

  function onPlusMessage (res) {
    const message = res.data && res.data.__message;
    if (!message || !message.__page) {
      return
    }
    const pageId = message.__page;
    const callback = callbacks$2[pageId];
    callback && callback(message);
    if (!message.keep) {
      delete callbacks$2[pageId];
    }
  }

  function addEventListener (pageId, callback) {
    if (getRuntime() === 'v8') {
      if (BroadcastChannel_) {
        channel && channel.close();
        channel = new BroadcastChannel_(getPageId());
        channel.onmessage = onPlusMessage;
      } else if (!globalEvent) {
        globalEvent = weex_.requireModule('globalEvent');
        globalEvent.addEventListener('plusMessage', onPlusMessage);
      }
    } else {
      window.__plusMessage = onPlusMessage;
    }
    callbacks$2[pageId] = callback;
  }

  class Page {
    constructor (webview) {
      this.webview = webview;
    }

    sendMessage (data) {
      const message = JSON.parse(JSON.stringify(({
        __message: {
          data
        }
      })));
      const id = this.webview.id;
      if (BroadcastChannel_) {
        const channel = new BroadcastChannel_(id);
        channel.postMessage(message);
      } else {
        plus_.webview.postMessageToUniNView(message, id);
      }
    }

    close () {
      this.webview.close();
    }
  }

  function showPage ({
    context = {},
    url,
    data = {},
    style = {},
    onMessage,
    onClose
  }) {
    // eslint-disable-next-line
    plus_ = context.plus || plus;
    // eslint-disable-next-line
    weex_ = context.weex || (typeof weex === 'object' ? weex : null);
    // eslint-disable-next-line
    BroadcastChannel_ = context.BroadcastChannel || (typeof BroadcastChannel === 'object' ? BroadcastChannel : null);
    const titleNView = {
      autoBackButton: true,
      titleSize: '17px'
    };
    const pageId = `page${Date.now()}`;
    style = Object.assign({}, style);
    if (style.titleNView !== false && style.titleNView !== 'none') {
      style.titleNView = Object.assign(titleNView, style.titleNView);
    }
    const defaultStyle = {
      top: 0,
      bottom: 0,
      usingComponents: {},
      popGesture: 'close',
      scrollIndicator: 'none',
      animationType: 'pop-in',
      animationDuration: 200,
      uniNView: {
        // eslint-disable-next-line
        path: `${typeof VUE_APP_TEMPLATE_PATH === 'string' ? VUE_APP_TEMPLATE_PATH : ''}/${url}.js`,
        defaultFontSize: 16,
        viewport: plus_.screen.resolutionWidth
      }
    };
    style = Object.assign(defaultStyle, style);
    const page = plus_.webview.create('', pageId, style, {
      extras: {
        from: getPageId(),
        runtime: getRuntime(),
        data,
        useGlobalEvent: !BroadcastChannel_
      }
    });
    page.addEventListener('close', onClose);
    addEventListener(pageId, message => {
      if (typeof onMessage === 'function') {
        onMessage(message.data);
      }
      if (!message.keep) {
        page.close('auto');
      }
    });
    page.show(style.animationType, style.animationDuration);
    return new Page(page)
  }

  function getStatusBarStyle$1 () {
    let style = plus.navigator.getStatusBarStyle();
    if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
      style = 'light';
    } else if (style === 'UIStatusBarStyleDefault') {
      style = 'dark';
    }
    return style
  }

  function scanCode$2 (options, callbackId) {
    const statusBarStyle = getStatusBarStyle$1();
    const isDark = statusBarStyle !== 'light';

    let result;
    const page = showPage({
      url: '__uniappscan',
      data: Object.assign({}, options, {
        messages: {
          fail: t('uni.scanCode.fail'),
          'flash.on': t('uni.scanCode.flash.on'),
          'flash.off': t('uni.scanCode.flash.off')
        }
      }),
      style: {
        animationType: options.animationType || 'pop-in',
        titleNView: {
          autoBackButton: true,
          type: 'float',
          titleText: options.titleText || t('uni.scanCode.title'),
          titleColor: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0)',
          buttons: !options.onlyFromCamera ? [{
            text: options.albumText || t('uni.scanCode.album'),
            fontSize: '17px',
            width: '60px',
            onclick: () => {
              page.sendMessage({
                type: 'gallery'
              });
            }
          }] : []
        },
        popGesture: 'close',
        background: '#000000',
        backButtonAutoControl: 'close'
      },
      onMessage ({
        event,
        detail
      }) {
        result = detail;
        if (event === 'marked') {
          result.errMsg = 'scanCode:ok';
        } else {
          result.errMsg = 'scanCode:fail ' + detail.message;
        }
      },
      onClose () {
        if (isDark) {
          plus.navigator.setStatusBarStyle('dark');
        }
        invoke$1(callbackId, result || {
          errMsg: 'scanCode:fail cancel'
        });
      }
    });

    if (isDark) {
      plus.navigator.setStatusBarStyle('light');
      page.webview.addEventListener('popGesture', ({
        type,
        result
      }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('dark');
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('light');
        }
      });
    }
  }

  var weex$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scanCode: scanCode$2
  });

  function scanCode$3 (...array) {
    const api = __uniConfig.nvueCompiler !== 'weex' ? weex$1 : webview;
    return api.scanCode(...array)
  }

  function checkIsSupportFaceID () {
    const platform = plus.os.name.toLowerCase();
    if (platform !== 'ios') {
      return false
    }
    const faceID = requireNativePlugin('faceID');
    return !!(faceID && faceID.isSupport())
  }

  function checkIsSupportFingerPrint () {
    return !!(plus.fingerprint && plus.fingerprint.isSupport())
  }

  function checkIsSupportSoterAuthentication () {
    const supportMode = [];
    if (checkIsSupportFingerPrint()) {
      supportMode.push('fingerPrint');
    }
    if (checkIsSupportFaceID()) {
      supportMode.push('facial');
    }
    return {
      supportMode,
      errMsg: 'checkIsSupportSoterAuthentication:ok'
    }
  }

  function checkIsSoterEnrolledInDevice ({
    checkAuthMode
  } = {}) {
    if (checkAuthMode === 'fingerPrint') {
      if (checkIsSupportFingerPrint()) {
        const isEnrolled = plus.fingerprint.isKeyguardSecure() && plus.fingerprint.isEnrolledFingerprints();
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      }
      return {
        isEnrolled: false,
        errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
      }
    } else if (checkAuthMode === 'facial') {
      if (checkIsSupportFaceID()) {
        const faceID = requireNativePlugin('faceID');
        const isEnrolled = faceID && faceID.isKeyguardSecure() && faceID.isEnrolledFaceID();
        return {
          isEnrolled,
          errMsg: 'checkIsSoterEnrolledInDevice:ok'
        }
      }
      return {
        isEnrolled: false,
        errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
      }
    }
    return {
      isEnrolled: false,
      errMsg: 'checkIsSoterEnrolledInDevice:fail not support'
    }
  }

  function startSoterAuthentication ({
    requestAuthModes,
    challenge = false,
    authContent
  } = {}, callbackId) {
    /*
    以手机不支持facial未录入fingerPrint为例
    requestAuthModes:['facial','fingerPrint']时，微信小程序返回值里的authMode为"fingerPrint"
    requestAuthModes:['fingerPrint','facial']时，微信小程序返回值里的authMode为"fingerPrint"
    即先过滤不支持的方式之后再判断是否录入
    微信小程序errCode（从企业号开发者中心查到如下文档）：
    0：识别成功  'startSoterAuthentication:ok'
    90001：本设备不支持SOTER  'startSoterAuthentication:fail not support soter'
    90002：用户未授权微信使用该生物认证接口  注：APP端暂不支持
    90003：请求使用的生物认证方式不支持  'startSoterAuthentication:fail no corresponding mode'
    90004：未传入challenge或challenge长度过长（最长512字符）注：APP端暂不支持
    90005：auth_content长度超过限制（最长42个字符）注：微信小程序auth_content指纹识别时无效果，faceID暂未测试
    90007：内部错误  'startSoterAuthentication:fail auth key update error'
    90008：用户取消授权  'startSoterAuthentication:fail cancel'
    90009：识别失败  'startSoterAuthentication:fail'
    90010：重试次数过多被冻结  'startSoterAuthentication:fail authenticate freeze. please try again later'
    90011：用户未录入所选识别方式  'startSoterAuthentication:fail no fingerprint enrolled'
    */
    const supportMode = checkIsSupportSoterAuthentication().supportMode;
    if (supportMode.length === 0) {
      return {
        authMode: supportMode[0] || 'fingerPrint',
        errCode: 90001,
        errMsg: 'startSoterAuthentication:fail'
      }
    }
    const supportRequestAuthMode = [];
    requestAuthModes.map((item, index) => {
      if (supportMode.indexOf(item) > -1) {
        supportRequestAuthMode.push(item);
      }
    });
    if (supportRequestAuthMode.length === 0) {
      return {
        authMode: supportRequestAuthMode[0] || 'fingerPrint',
        errCode: 90003,
        errMsg: 'startSoterAuthentication:fail no corresponding mode'
      }
    }
    const enrolledRequestAuthMode = [];
    supportRequestAuthMode.map((item, index) => {
      const checked = checkIsSoterEnrolledInDevice({
        checkAuthMode: item
      }).isEnrolled;
      if (checked) {
        enrolledRequestAuthMode.push(item);
      }
    });
    if (enrolledRequestAuthMode.length === 0) {
      return {
        authMode: supportRequestAuthMode[0],
        errCode: 90011,
        errMsg: `startSoterAuthentication:fail no ${supportRequestAuthMode[0]} enrolled`
      }
    }
    const realAuthMode = enrolledRequestAuthMode[0];
    if (realAuthMode === 'fingerPrint') {
      if (plus.os.name.toLowerCase() === 'android') {
        plus.nativeUI.showWaiting(authContent || t('uni.startSoterAuthentication.authContent')).onclose = function () {
          plus.fingerprint.cancel();
        };
      }
      plus.fingerprint.authenticate(() => {
        plus.nativeUI.closeWaiting();
        invoke$1(callbackId, {
          authMode: realAuthMode,
          errCode: 0,
          errMsg: 'startSoterAuthentication:ok'
        });
      }, (e) => {
        switch (e.code) {
          case e.AUTHENTICATE_MISMATCH:
            // 微信小程序没有这个回调，如果要实现此处回调需要多次触发需要用事件publish实现
            // invoke(callbackId, {
            //   authMode: realAuthMode,
            //   errCode: 90009,
            //   errMsg: 'startSoterAuthentication:fail'
            // })
            break
          case e.AUTHENTICATE_OVERLIMIT:
            // 微信小程序在第一次重试次数超限时安卓IOS返回不一致，安卓端会返回次数超过限制（errCode: 90010），IOS端会返回认证失败（errCode: 90009）。APP-IOS实际运行时不会次数超限，超过指定次数之后会弹出输入密码的界面
            plus.nativeUI.closeWaiting();
            invoke$1(callbackId, {
              authMode: realAuthMode,
              errCode: 90010,
              errMsg: 'startSoterAuthentication:fail authenticate freeze. please try again later'
            });
            break
          case e.CANCEL:
            plus.nativeUI.closeWaiting();
            invoke$1(callbackId, {
              authMode: realAuthMode,
              errCode: 90008,
              errMsg: 'startSoterAuthentication:fail cancel'
            });
            break
          default:
            plus.nativeUI.closeWaiting();
            invoke$1(callbackId, {
              authMode: realAuthMode,
              errCode: 90007,
              errMsg: 'startSoterAuthentication:fail'
            });
            break
        }
      }, {
        message: authContent
      });
    } else if (realAuthMode === 'facial') {
      const faceID = requireNativePlugin('faceID');
      faceID.authenticate({
        message: authContent
      }, (e) => {
        if (e.type === 'success' && e.code === 0) {
          invoke$1(callbackId, {
            authMode: realAuthMode,
            errCode: 0,
            errMsg: 'startSoterAuthentication:ok'
          });
        } else {
          switch (e.code) {
            case 4:
              invoke$1(callbackId, {
                authMode: realAuthMode,
                errCode: 90009,
                errMsg: 'startSoterAuthentication:fail'
              });
              break
            case 5:
              invoke$1(callbackId, {
                authMode: realAuthMode,
                errCode: 90010,
                errMsg: 'startSoterAuthentication:fail authenticate freeze. please try again later'
              });
              break
            case 6:
              invoke$1(callbackId, {
                authMode: realAuthMode,
                errCode: 90008,
                errMsg: 'startSoterAuthentication:fail cancel'
              });
              break
            default:
              invoke$1(callbackId, {
                authMode: realAuthMode,
                errCode: 90007,
                errMsg: 'startSoterAuthentication:fail'
              });
              break
          }
        }
      });
    }
  }

  const TABBAR_HEIGHT = 50;
  const isIOS$1 = plus.os.name === 'iOS';
  let config;

  /**
   * tabbar显示状态
   */
  let visible = true;

  let tabBar;

  /**
   * 设置角标
   * @param {string} type
   * @param {number} index
   * @param {string} text
   */
  function setTabBarBadge$1 (type, index, text) {
    if (!tabBar) {
      return
    }
    if (type === 'none') {
      tabBar.hideTabBarRedDot({
        index
      });
      tabBar.removeTabBarBadge({
        index
      });
    } else if (type === 'text') {
      tabBar.setTabBarBadge({
        index,
        text
      });
    } else if (type === 'redDot') {
      tabBar.showTabBarRedDot({
        index
      });
    }
  }
  /**
   * 动态设置 tabBar 某一项的内容
   */
  function setTabBarItem$1 (index, text, iconPath, selectedIconPath, visible, iconfont) {
    const item = {
      index
    };
    if (text !== undefined) {
      item.text = text;
    }
    if (iconPath) {
      item.iconPath = getRealPath$1(iconPath);
    }
    if (selectedIconPath) {
      item.selectedIconPath = getRealPath$1(selectedIconPath);
    }
    if (iconfont !== undefined) {
      item.iconfont = iconfont;
    }
    if (visible !== undefined) {
      item.visible = config.list[index].visible = visible;
      delete item.index;

      const tabbarItems = config.list.map(item => ({ visible: item.visible }));
      tabbarItems[index] = item;

      tabBar && tabBar.setTabBarItems({ list: tabbarItems });
    } else {
      tabBar && tabBar.setTabBarItem(item);
    }
  }
  /**
   * 动态设置 tabBar 的整体样式
   * @param {Object} style 样式
   */
  function setTabBarStyle$1 (style) {
    tabBar && tabBar.setTabBarStyle(style);
  }
  /**
   * 隐藏 tabBar
   * @param {boolean} animation 是否需要动画效果
   */
  function hideTabBar$1 (animation) {
    visible = false;
    tabBar && tabBar.hideTabBar({
      animation
    });
  }
  /**
   * 显示 tabBar
   * @param {boolean} animation 是否需要动画效果
   */
  function showTabBar$1 (animation) {
    visible = true;
    tabBar && tabBar.showTabBar({
      animation
    });
  }

  const maskClickCallback = [];

  var tabBar$1 = {
    id: '0',
    init (options, clickCallback) {
      if (options && options.list.length) {
        config = options;
      }
      try {
        tabBar = requireNativePlugin('uni-tabview');
      } catch (error) {
        console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`);
      }
      tabBar.onMaskClick(() => {
        maskClickCallback.forEach((callback) => {
          callback();
        });
      });
      tabBar && tabBar.onClick(({ index }) => {
        clickCallback(config.list[index], index);
      });
      tabBar && tabBar.onMidButtonClick(() => {
        publish('onTabBarMidButtonTap', {});
      });
    },
    indexOf (page) {
      const itemLength = config && config.list && config.list.length;
      if (itemLength) {
        for (let i = 0; i < itemLength; i++) {
          if (
            config.list[i].pagePath === page ||
            config.list[i].pagePath === `${page}.html`
          ) {
            return i
          }
        }
      }
      return -1
    },
    switchTab (page) {
      const index = this.indexOf(page);
      if (index >= 0) {
        tabBar && tabBar.switchSelect({
          index
        });
        return true
      }
      return false
    },
    setTabBarBadge: setTabBarBadge$1,
    setTabBarItem: setTabBarItem$1,
    setTabBarStyle: setTabBarStyle$1,
    hideTabBar: hideTabBar$1,
    showTabBar: showTabBar$1,
    append (webview) {
      tabBar && tabBar.append({
        id: webview.id
      }, ({ code }) => {
        if (code !== 0) {
          // console.log('tab append error')
          setTimeout(() => {
            this.append(webview);
          }, 20);
        }
      });
    },
    get visible () {
      return visible
    },
    get height () {
      return (config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) + plus.navigator.getSafeAreaInsets().deviceBottom
    },
    // tabBar是否遮挡内容区域
    get cover () {
      const array = ['extralight', 'light', 'dark'];
      return isIOS$1 && array.indexOf(config.blurEffect) >= 0
    },
    setStyle ({ mask }) {
      tabBar.setMask({
        color: mask
      });
    },
    addEventListener (name, callback) {
      maskClickCallback.push(callback);
    },
    removeEventListener (name, callback) {
      const callbackIndex = maskClickCallback.indexOf(callback);
      maskClickCallback.splice(callbackIndex, 1);
    }
  };

  function getStatusbarHeight () {
    // 横屏时 iOS 获取的状态栏高度错误，进行纠正
    return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === 'iOS' ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0
  }

  let deviceId;

  function deviceId$1 () {
    deviceId = deviceId || plus.device.uuid;
    return deviceId
  }

  function getSystemInfoSync () {
    return callApiSync(getSystemInfo, Object.create(null), 'getSystemInfo', 'getSystemInfoSync')
  }

  function getSystemInfo () {
    const platform = plus.os.name.toLowerCase();
    const ios = platform === 'ios';
    const isAndroid = platform === 'android';
    const {
      screenWidth,
      screenHeight
    } = getScreenInfo();
    const statusBarHeight = getStatusbarHeight();

    let safeAreaInsets;
    const titleNView = {
      height: 0,
      cover: false
    };
    const webview = getLastWebview();
    if (webview) {
      let style = webview.getStyle();
      style = style && style.titleNView;
      if (style && style.type && style.type !== 'none') {
        titleNView.height = style.type === 'transparent' ? 0 : (statusBarHeight + NAVBAR_HEIGHT);
        titleNView.cover = style.type === 'transparent' || style.type === 'float';
      }
      safeAreaInsets = webview.getSafeAreaInsets();
    } else {
      safeAreaInsets = plus.navigator.getSafeAreaInsets();
    }
    const tabBarView = {
      height: 0,
      cover: false
    };
    if (isTabBarPage()) {
      tabBarView.height = tabBar$1.visible ? tabBar$1.height : 0;
      tabBarView.cover = tabBar$1.cover;
    }
    const windowTop = titleNView.cover ? titleNView.height : 0;
    const windowBottom = tabBarView.cover ? tabBarView.height : 0;
    let windowHeight = screenHeight - titleNView.height - tabBarView.height;
    let windowHeightReal = screenHeight - (titleNView.cover ? 0 : titleNView.height) - (tabBarView.cover ? 0 : tabBarView.height);
    const windowWidth = screenWidth;
    if ((!tabBarView.height || tabBarView.cover) && !safeAreaInsets.bottom && safeAreaInsets.deviceBottom) {
      windowHeight -= safeAreaInsets.deviceBottom;
      windowHeightReal -= safeAreaInsets.deviceBottom;
    }
    safeAreaInsets = ios ? safeAreaInsets : {
      left: 0,
      right: 0,
      top: titleNView.height && !titleNView.cover ? 0 : statusBarHeight,
      bottom: 0
    };
    const safeArea = {
      left: safeAreaInsets.left,
      right: windowWidth - safeAreaInsets.right,
      top: safeAreaInsets.top,
      bottom: windowHeightReal - safeAreaInsets.bottom,
      width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
      height: windowHeightReal - safeAreaInsets.top - safeAreaInsets.bottom
    };

    return {
      errMsg: 'getSystemInfo:ok',
      brand: plus.device.vendor,
      model: plus.device.model,
      pixelRatio: plus.screen.scale,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      statusBarHeight,
      language: plus.os.language,
      system: `${ios ? 'iOS' : isAndroid ? 'Android' : ''} ${plus.os.version}`,
      version: plus.runtime.innerVersion,
      fontSizeSetting: '',
      platform,
      SDKVersion: '',
      windowTop,
      windowBottom,
      safeArea,
      safeAreaInsets: {
        top: safeAreaInsets.top,
        right: safeAreaInsets.right,
        bottom: safeAreaInsets.bottom,
        left: safeAreaInsets.left
      },
      deviceId: deviceId$1()
    }
  }

  function vibrateLong () {
    plus.device.vibrate(400);
    return {
      errMsg: 'vibrateLong:ok'
    }
  }
  function vibrateShort () {
    plus.device.vibrate(15);
    return {
      errMsg: 'vibrateShort:ok'
    }
  }

  const SAVED_DIR = 'uniapp_save';
  const SAVE_PATH = `_doc/${SAVED_DIR}`;

  function getSavedFileDir (success, fail) {
    fail = fail || function () { };
    plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => { // 请求_doc fs
      fs.root.getDirectory(SAVED_DIR, { // 获取文件保存目录对象
        create: true
      }, success, fail);
    }, fail);
  }

  let index = 0;
  function saveFile$1 ({
    tempFilePath
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'saveFile');
    const fileName = `${Date.now()}${index++}${getExtName(tempFilePath)}`;

    plus.io.resolveLocalFileSystemURL(tempFilePath, entry => { // 读取临时文件 FileEntry
      getSavedFileDir(dir => {
        entry.copyTo(dir, fileName, () => { // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
          const savedFilePath = SAVE_PATH + '/' + fileName;
          invoke$1(callbackId, {
            errMsg: 'saveFile:ok',
            savedFilePath
          });
        }, errorCallback);
      }, errorCallback);
    }, errorCallback);
  }

  function getSavedFileList (options, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'getSavedFileList');

    getSavedFileDir(entry => {
      var reader = entry.createReader();

      var fileList = [];
      reader.readEntries(entries => {
        if (entries && entries.length) {
          entries.forEach(entry => {
            entry.getMetadata(meta => {
              fileList.push({
                filePath: plus.io.convertAbsoluteFileSystem(entry.fullPath),
                createTime: meta.modificationTime.getTime(),
                size: meta.size
              });
              if (fileList.length === entries.length) {
                invoke$1(callbackId, {
                  errMsg: 'getSavedFileList:ok',
                  fileList
                });
              }
            }, errorCallback, false);
          });
        } else {
          invoke$1(callbackId, {
            errMsg: 'getSavedFileList:ok',
            fileList
          });
        }
      }, errorCallback);
    }, errorCallback);
  }

  const getFileInfo$1 = warpPlusMethod('io', 'getFileInfo');

  function getSavedFileInfo$1 ({
    filePath
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'getSavedFileInfo');

    plus.io.resolveLocalFileSystemURL(filePath, entry => {
      entry.getMetadata(meta => {
        invoke$1(callbackId, {
          createTime: meta.modificationTime.getTime(),
          size: meta.size,
          errMsg: 'getSavedFileInfo:ok'
        });
      }, errorCallback, false);
    }, errorCallback);
  }

  function removeSavedFile$1 ({
    filePath
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'removeSavedFile');

    plus.io.resolveLocalFileSystemURL(filePath, entry => {
      entry.remove(() => {
        invoke$1(callbackId, {
          errMsg: 'removeSavedFile:ok'
        });
      }, errorCallback);
    }, errorCallback);
  }

  function openDocument$1 ({
    filePath,
    fileType
  } = {}, callbackId) {
    const successCallback = warpPlusSuccessCallback(callbackId, 'saveFile');
    const errorCallback = warpPlusErrorCallback(callbackId, 'saveFile');

    plus.runtime.openDocument(getRealPath$1(filePath), undefined, successCallback, errorCallback);
  }

  const CHOOSE_LOCATION_PATH = '_www/__uniappchooselocation.html';

  const MESSAGE_TYPE$1 = 'chooseLocation';

  function chooseLocation$1 (params, callbackId) {
    const statusBarStyle = plus.navigator.getStatusBarStyle();
    const webview = plus.webview.create(
      CHOOSE_LOCATION_PATH,
      MAP_ID, {
        titleNView: {
          autoBackButton: true,
          backgroundColor: '#000000',
          titleColor: '#ffffff',
          titleText: '选择位置',
          titleSize: '17px',
          buttons: [{
            float: 'right',
            text: '完成',
            fontSize: '17px',
            width: '60px',
            onclick: function () {
              webview.evalJS('__chooseLocationConfirm__()');
            }
          }]
        },
        popGesture: 'close',
        scrollIndicator: 'none'
      }, {
        __uniapp_type: 'map',
        __uniapp_statusbar_style: statusBarStyle,
        'uni-app': 'none'
      }
    );
    if (statusBarStyle === 'dark') {
      plus.navigator.setStatusBarStyle('light');
      webview.addEventListener('popGesture', ({
        type,
        result
      }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('dark');
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('light');
        }
      });
    }
    let index = 0;
    const onShow = function () {
      index++;
      if (index === 2) {
        webview.evalJS(`__chooseLocation__(${JSON.stringify(params)})`);
      }
    };
    webview.addEventListener('loaded', onShow);
    webview.show('slide-in-bottom', ANI_DURATION, onShow);

    let result;

    webview.addEventListener('close', () => {
      if (result) {
        invoke$1(callbackId, {
          name: result.poiname,
          address: result.poiaddress,
          latitude: result.latlng.lat,
          longitude: result.latlng.lng,
          errMsg: 'chooseLocation:ok'
        });
      } else {
        consumePlusMessage(MESSAGE_TYPE$1);
        invoke$1(callbackId, {
          errMsg: 'chooseLocation:fail cancel'
        });
      }
    });

    registerPlusMessage(MESSAGE_TYPE$1, function (res) {
      if (res && 'latlng' in res) {
        result = res;
      }
    }, false);
  }

  var webview$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseLocation: chooseLocation$1
  });

  function getStatusBarStyle$2 () {
    let style = plus.navigator.getStatusBarStyle();
    if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
      style = 'light';
    } else if (style === 'UIStatusBarStyleDefault') {
      style = 'dark';
    }
    return style
  }

  function chooseLocation$2 (options, callbackId) {
    const statusBarStyle = getStatusBarStyle$2();
    const isDark = statusBarStyle !== 'light';

    let result;
    const page = showPage({
      url: '__uniappchooselocation',
      data: options,
      style: {
        animationType: options.animationType || 'slide-in-bottom',
        titleNView: false,
        popGesture: 'close',
        scrollIndicator: 'none'
      },
      onMessage ({
        event,
        detail
      }) {
        if (event === 'selected') {
          result = detail;
          result.errMsg = 'chooseLocation:ok';
        }
      },
      onClose () {
        if (isDark) {
          plus.navigator.setStatusBarStyle('dark');
        }

        invoke$1(callbackId, result || {
          errMsg: 'chooseLocation:fail cancel'
        });
      }
    });

    if (isDark) {
      plus.navigator.setStatusBarStyle('light');
      page.webview.addEventListener('popGesture', ({
        type,
        result
      }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('dark');
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('light');
        }
      });
    }
  }

  var weex$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseLocation: chooseLocation$2
  });

  function chooseLocation$3 (...array) {
    const api = __uniConfig.nvueCompiler !== 'weex' ? weex$2 : webview$1;
    return api.chooseLocation(...array)
  }

  function getLocationSuccess (type, position, callbackId) {
    const coords = position.coords;
    if (type !== position.coordsType) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `UNIAPP[location]:before[${position.coordsType}][lng:${
          coords.longitude
        },lat:${coords.latitude}]`
        );
      }
      let coordArray;
      if (type === 'wgs84') {
        coordArray = gcj02towgs84(coords.longitude, coords.latitude);
      } else if (type === 'gcj02') {
        coordArray = wgs84togcj02(coords.longitude, coords.latitude);
      }
      if (coordArray) {
        coords.longitude = coordArray[0];
        coords.latitude = coordArray[1];
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            `UNIAPP[location]:after[${type}][lng:${coords.longitude},lat:${
            coords.latitude
          }]`
          );
        }
      }
    }

    invoke$1(callbackId, {
      type,
      altitude: coords.altitude || 0,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
      accuracy: coords.accuracy,
      address: position.address,
      errMsg: 'getLocation:ok'
    });
  }

  function getLocation$1 ({
    type = 'wgs84',
    geocode = false,
    altitude = false,
    isHighAccuracy = false,
    highAccuracyExpireTime
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'getLocation');
    plus.geolocation.getCurrentPosition(
      position => {
        getLocationSuccess(type, position, callbackId);
      },
      e => {
        // 坐标地址解析失败
        if (e.code === 1501) {
          getLocationSuccess(type, e, callbackId);
          return
        }
        errorCallback(e);
      }, {
        geocode: geocode,
        enableHighAccuracy: isHighAccuracy || altitude,
        timeout: highAccuracyExpireTime,
        coordsType: type
      }
    );
  }

  const OPEN_LOCATION_PATH = '_www/__uniappopenlocation.html';

  function openLocation$1 (params) {
    const statusBarStyle = plus.navigator.getStatusBarStyle();
    const webview = plus.webview.create(
      OPEN_LOCATION_PATH,
      MAP_ID, {
        titleNView: {
          autoBackButton: true,
          titleColor: '#ffffff',
          titleText: '',
          titleSize: '17px',
          type: 'transparent'
        },
        popGesture: 'close',
        scrollIndicator: 'none'
      }, {
        __uniapp_type: 'map',
        __uniapp_statusbar_style: statusBarStyle,
        'uni-app': 'none'
      }
    );
    if (statusBarStyle === 'light') {
      plus.navigator.setStatusBarStyle('dark');
      webview.addEventListener('popGesture', ({
        type,
        result
      }) => {
        if (type === 'start') {
          plus.navigator.setStatusBarStyle('light');
        } else if (type === 'end' && !result) {
          plus.navigator.setStatusBarStyle('dark');
        }
      });
    }
    webview.show(ANI_SHOW, ANI_DURATION, () => {
      webview.evalJS(`__openLocation__(${JSON.stringify(params)})`);
    });

    return {
      errMsg: 'openLocation:ok'
    }
  }

  var webview$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openLocation: openLocation$1
  });

  function openLocation$2 (data, callbackId) {
    showPage({
      url: '__uniappopenlocation',
      data,
      style: {
        titleNView: {
          type: 'transparent'
        },
        popGesture: 'close',
        backButtonAutoControl: 'close'
      },
      onClose () {
        invoke$1(callbackId, {
          errMsg: 'openLocation:fail cancel'
        });
      }
    });
    return {
      errMsg: 'openLocation:ok'
    }
  }

  var weex$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openLocation: openLocation$2
  });

  function openLocation$3 (...array) {
    const api = __uniConfig.nvueCompiler !== 'weex' ? weex$3 : webview$2;
    return api.openLocation(...array)
  }

  const RECORD_TIME = 60 * 60 * 1000;

  let recorder;
  let recordTimeout;

  function startRecord (args, callbackId) {
    recorder && recorder.stop();
    recorder = plus.audio.getRecorder();
    recorder.record({
      filename: '_doc/audio/',
      format: 'aac'
    }, (res) => {
      invoke$1(callbackId, {
        errMsg: 'startRecord:ok',
        tempFilePath: res
      });
    }, (res) => {
      invoke$1(callbackId, {
        errMsg: 'startRecord:fail'
      });
    });
    recordTimeout = setTimeout(() => {
      recorder.stop();
      recorder = false;
    }, RECORD_TIME);
  }

  function stopRecord () {
    if (recorder) {
      recordTimeout && clearTimeout(recordTimeout);
      recorder.stop();
      return {
        errMsg: 'stopRecord:ok'
      }
    }
    return {
      errMsg: 'stopRecord:fail'
    }
  }

  let player;
  let playerFilePath;
  let playerStatus;

  function playVoice ({
    filePath
  } = {}, callbackId) {
    if (player && playerFilePath === filePath && playerStatus === 'pause') { // 如果是当前音频被暂停，则继续播放
      playerStatus = 'play';
      player.play((res) => {
        player = false;
        playerFilePath = false;
        playerStatus = false;
        invoke$1(callbackId, {
          errMsg: 'playVoice:ok'
        });
      });
      return {
        errMsg: 'playVoice:ok'
      }
    }
    if (player) { // 如果存在音频播放，则停止
      player.stop();
    }
    playerFilePath = filePath;
    playerStatus = 'play';
    player = plus.audio.createPlayer(getRealPath$1(filePath));
    // 播放操作成功回调
    player.play((res) => {
      player = false;
      playerFilePath = false;
      playerStatus = false;
      invoke$1(callbackId, {
        errMsg: 'playVoice:ok'
      });
    });
  }

  function pauseVoice () {
    if (player && playerStatus === 'play') {
      player.pause();
      playerStatus = 'pause';
    }
    return {
      errMsg: 'pauseVoice:ok'
    }
  }

  function stopVoice () {
    if (player) {
      player.stop();
      player = false;
      playerFilePath = false;
      playerStatus = false;
    }
    return {
      errMsg: 'stopVoice:ok'
    }
  }

  /**
   * 获取文件信息
   * @param {string} filePath 文件路径
   * @returns {Promise} 文件信息Promise
   */
  function getFileInfo$2 (filePath) {
    return new Promise((resolve, reject) => {
      plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
        entry.getMetadata(resolve, reject, false);
      }, reject);
    })
  }

  function chooseImage$1 ({
    count,
    sizeType,
    sourceType,
    crop
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'chooseImage', 'cancel');

    function successCallback (paths) {
      const tempFiles = [];
      const tempFilePaths = [];
      Promise.all(paths.map((path) => getFileInfo$2(path)))
        .then((filesInfo) => {
          filesInfo.forEach((file, index) => {
            const path = paths[index];
            tempFilePaths.push(path);
            tempFiles.push({ path, size: file.size });
          });

          invoke$1(callbackId, {
            errMsg: 'chooseImage:ok',
            tempFilePaths,
            tempFiles
          });
        })
        .catch(errorCallback);
    }

    function openCamera () {
      const camera = plus.camera.getCamera();
      camera.captureImage(path => successCallback([path]),
        errorCallback, {
          filename: TEMP_PATH + '/camera/',
          resolution: 'high',
          crop,
          sizeType
        });
    }

    function openAlbum () {
      plus.gallery.pick(({ files }) => successCallback(files), errorCallback, {
        maximum: count,
        multiple: true,
        system: false,
        filename: TEMP_PATH + '/gallery/',
        permissionAlert: true,
        crop,
        sizeType
      });
    }

    if (sourceType.length === 1) {
      if (sourceType.includes('album')) {
        openAlbum();
        return
      } else if (sourceType.includes('camera')) {
        openCamera();
        return
      }
    }
    plus.nativeUI.actionSheet({
      cancel: t('uni.chooseImage.cancel'),
      buttons: [{
        title: t('uni.chooseImage.sourceType.camera')
      }, {
        title: t('uni.chooseImage.sourceType.album')
      }]
    }, (e) => {
      switch (e.index) {
        case 1:
          openCamera();
          break
        case 2:
          openAlbum();
          break
        default:
          errorCallback();
          break
      }
    });
  }

  function chooseVideo$1 ({
    sourceType,
    compressed,
    maxDuration,
    camera
  } = {}, callbackId) {
    const errorCallback = warpPlusErrorCallback(callbackId, 'chooseVideo', 'cancel');

    function successCallback (tempFilePath = '') {
      plus.io.getVideoInfo({
        filePath: tempFilePath,
        success (videoInfo) {
          const result = {
            errMsg: 'chooseVideo:ok',
            tempFilePath: tempFilePath
          };
          result.size = videoInfo.size;
          result.duration = videoInfo.duration;
          result.width = videoInfo.width;
          result.height = videoInfo.height;
          invoke$1(callbackId, result);
        },
        fail: errorCallback
      });
    }

    function openAlbum () {
      plus.gallery.pick(({ files }) => successCallback(files[0]), errorCallback, {
        filter: 'video',
        system: false,
        // 不启用 multiple 时 system 无效
        multiple: true,
        maximum: 1,
        filename: TEMP_PATH + '/gallery/',
        permissionAlert: true,
        videoCompress: compressed
      });
    }

    function openCamera () {
      const plusCamera = plus.camera.getCamera();
      plusCamera.startVideoCapture(successCallback, errorCallback, {
        index: camera === 'front' ? 2 : 1,
        videoMaximumDuration: maxDuration,
        filename: TEMP_PATH + '/camera/',
        videoCompress: compressed
      });
    }

    if (sourceType.length === 1) {
      if (sourceType.includes('album')) {
        openAlbum();
        return
      } else if (sourceType.includes('camera')) {
        openCamera();
        return
      }
    }
    plus.nativeUI.actionSheet({
      cancel: t('uni.chooseVideo.cancel'),
      buttons: [{
        title: t('uni.chooseVideo.sourceType.camera')
      }, {
        title: t('uni.chooseVideo.sourceType.album')
      }]
    }, e => {
      switch (e.index) {
        case 1:
          openCamera();
          break
        case 2:
          openAlbum();
          break
        default:
          errorCallback();
          break
      }
    });
  }

  function compressImage$1 (options, callbackId) {
    const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
    const errorCallback = warpPlusErrorCallback(callbackId, 'compressImage');
    plus.zip.compressImage(Object.assign({}, options, {
      dst
    }), () => {
      invoke$1(callbackId, {
        errMsg: 'compressImage:ok',
        tempFilePath: dst
      });
    }, errorCallback);
  }

  function compressVideo$1 (options, callbackId) {
    const filename = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
    const successCallback = warpPlusSuccessCallback(callbackId, 'compressVideo');
    const errorCallback = warpPlusErrorCallback(callbackId, 'compressVideo');
    plus.zip.compressVideo(Object.assign({}, options, {
      filename
    }), successCallback, errorCallback);
  }

  const getImageInfo$1 = warpPlusMethod('io', 'getImageInfo', options => {
    options.savePath = options.filename = TEMP_PATH + '/download/';
    return options
  });

  const getVideoInfo$1 = warpPlusMethod('io', 'getVideoInfo', options => {
    options.filePath = options.src;
    return options
  }, data => {
    return {
      orientation: data.orientation,
      type: data.type,
      duration: data.duration,
      size: data.size / 1024,
      height: data.height,
      width: data.width,
      fps: data.fps || 30,
      bitrate: data.bitrate
    }
  });

  function previewImagePlus ({
    current = 0,
    background = '#000000',
    indicator = 'number',
    loop = false,
    urls,
    longPressActions
  } = {}) {
    urls = urls.map(url => getRealPath$1(url));

    const index = Number(current);
    if (isNaN(index)) {
      current = urls.indexOf(getRealPath$1(current));
      current = current < 0 ? 0 : current;
    } else {
      current = index;
    }

    plus.nativeUI.previewImage(urls, {
      current,
      background,
      indicator,
      loop,
      onLongPress: function (res) {
        let itemList = [];
        let itemColor = '';
        let title = '';
        const hasLongPressActions = longPressActions && longPressActions.callbackId;
        if (!hasLongPressActions) {
          itemList = [t('uni.previewImage.button.save')];
          itemColor = '#000000';
          title = '';
        } else {
          itemList = longPressActions.itemList ? longPressActions.itemList : [];
          itemColor = longPressActions.itemColor ? longPressActions.itemColor : '#000000';
          title = longPressActions.title ? longPressActions.title : '';
        }

        const options = {
          buttons: itemList.map(item => ({
            title: item,
            color: itemColor
          })),
          cancel: t('uni.previewImage.cancel')
        };
        if (title) {
          options.title = title;
        }
        plus.nativeUI.actionSheet(options, (e) => {
          if (e.index > 0) {
            if (hasLongPressActions) {
              publish(longPressActions.callbackId, {
                errMsg: 'showActionSheet:ok',
                tapIndex: e.index - 1,
                index: res.index
              });
              return
            }
            plus.gallery.save(res.url, function (GallerySaveEvent) {
              plus.nativeUI.toast(t('uni.previewImage.save.success'));
            }, function () {
              plus.nativeUI.toast(t('uni.previewImage.save.fail'));
            });
          } else if (hasLongPressActions) {
            publish(longPressActions.callbackId, {
              errMsg: 'showActionSheet:fail cancel'
            });
          }
        });
      }
    });
    return {
      errMsg: 'previewImage:ok'
    }
  }

  function closePreviewImagePlus () {
    try {
      plus.nativeUI.closePreviewImage();
      return {
        errMsg: 'closePreviewImagePlus:ok'
      }
    } catch (error) {
      return {
        errMsg: 'closePreviewImagePlus:fail'
      }
    }
  }

  let recorder$1;
  let recordTimeout$1;

  const publishRecorderStateChange = (state, res = {}) => {
    publish('onRecorderStateChange', Object.assign({
      state
    }, res));
  };

  const Recorder = {
    start ({
      duration = 60000,
      sampleRate,
      numberOfChannels,
      encodeBitRate,
      format = 'mp3',
      frameSize,
      audioSource = 'auto'
    }, callbackId) {
      if (recorder$1) {
        return publishRecorderStateChange('start')
      }
      recorder$1 = plus.audio.getRecorder();
      recorder$1.record({
        format,
        samplerate: sampleRate,
        filename: TEMP_PATH + '/recorder/'
      }, res => publishRecorderStateChange('stop', {
        tempFilePath: res
      }), err => publishRecorderStateChange('error', {
        errMsg: err.message
      }));
      recordTimeout$1 = setTimeout(() => {
        Recorder.stop();
      }, duration);
      publishRecorderStateChange('start');
    },
    stop () {
      if (recorder$1) {
        recorder$1.stop();
        recorder$1 = false;
        recordTimeout$1 && clearTimeout(recordTimeout$1);
      }
    },
    pause () {
      if (recorder$1) {
        publishRecorderStateChange('error', {
          errMsg: 'Unsupported operation: pause'
        });
      }
    },
    resume () {
      if (recorder$1) {
        publishRecorderStateChange('error', {
          errMsg: 'Unsupported operation: resume'
        });
      }
    }
  };

  function operateRecorder ({
    operationType,
    ...args
  }, callbackId) {
    Recorder[operationType](args);
    return {
      errMsg: 'operateRecorder:ok'
    }
  }

  function saveImageToPhotosAlbum$1 ({
    filePath
  } = {}, callbackId) {
    const successCallback = warpPlusSuccessCallback(callbackId, 'saveImageToPhotosAlbum');
    const errorCallback = warpPlusErrorCallback(callbackId, 'saveImageToPhotosAlbum');
    plus.gallery.save(getRealPath$1(filePath), successCallback, errorCallback);
  }

  function saveVideoToPhotosAlbum ({
    filePath
  } = {}, callbackId) {
    plus.gallery.save(getRealPath$1(filePath), e => {
      invoke$1(callbackId, {
        errMsg: 'saveVideoToPhotosAlbum:ok'
      });
    }, e => {
      invoke$1(callbackId, {
        errMsg: 'saveVideoToPhotosAlbum:fail'
      });
    });
  }

  let downloadTaskId = 0;
  const downloadTasks = {};

  const publishStateChange = (res) => {
    publish('onDownloadTaskStateChange', res);
  };

  const createDownloadTaskById = function (downloadTaskId, {
    url,
    header,
    timeout
  } = {}) {
    timeout = (timeout || (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) || 60 * 1000) / 1000;
    const downloader = plus.downloader.createDownload(url, {
      timeout,
      filename: TEMP_PATH + '/download/',
      // 需要与其它平台上的表现保持一致，不走重试的逻辑。
      retry: 0,
      retryInterval: 0
    }, (download, statusCode) => {
      if (statusCode) {
        publishStateChange({
          downloadTaskId,
          state: 'success',
          tempFilePath: download.filename,
          statusCode
        });
      } else {
        publishStateChange({
          downloadTaskId,
          state: 'fail',
          statusCode
        });
      }
    });
    for (const name in header) {
      if (hasOwn(header, name)) {
        downloader.setRequestHeader(name, header[name]);
      }
    }
    downloader.addEventListener('statechanged', (download, status) => {
      if (download.downloadedSize && download.totalSize) {
        publishStateChange({
          downloadTaskId,
          state: 'progressUpdate',
          progress: parseInt(download.downloadedSize / download.totalSize * 100),
          totalBytesWritten: download.downloadedSize,
          totalBytesExpectedToWrite: download.totalSize
        });
      }
    });
    downloadTasks[downloadTaskId] = downloader;
    downloader.start();
    return {
      downloadTaskId,
      errMsg: 'createDownloadTask:ok'
    }
  };

  function operateDownloadTask ({
    downloadTaskId,
    operationType
  } = {}) {
    const downloadTask = downloadTasks[downloadTaskId];
    if (downloadTask && operationType === 'abort') {
      delete downloadTasks[downloadTaskId];
      downloadTask.abort();
      publishStateChange({
        downloadTaskId,
        state: 'fail',
        errMsg: 'abort'
      });
      return {
        errMsg: 'operateDownloadTask:ok'
      }
    }
    return {
      errMsg: 'operateDownloadTask:fail'
    }
  }

  function createDownloadTask (args) {
    return createDownloadTaskById(++downloadTaskId, args)
  }

  let requestTaskId = 0;
  const requestTasks = {};

  const publishStateChange$1 = res => {
    publish('onRequestTaskStateChange', res);
    delete requestTasks[requestTaskId];
  };

  const cookiesParse = header => {
    let cookiesStr = header['Set-Cookie'] || header['set-cookie'];
    let cookiesArr = [];
    if (!cookiesStr) {
      return []
    }
    if (cookiesStr[0] === '[' && cookiesStr[cookiesStr.length - 1] === ']') {
      cookiesStr = cookiesStr.slice(1, -1);
    }
    const handleCookiesArr = cookiesStr.split(';');
    for (let i = 0; i < handleCookiesArr.length; i++) {
      if (handleCookiesArr[i].indexOf('Expires=') !== -1 || handleCookiesArr[i].indexOf('expires=') !== -1) {
        cookiesArr.push(handleCookiesArr[i].replace(',', ''));
      } else {
        cookiesArr.push(handleCookiesArr[i]);
      }
    }
    cookiesArr = cookiesArr.join(';').split(',');

    return cookiesArr
  };

  function createRequestTaskById (requestTaskId, {
    url,
    data,
    header,
    method = 'GET',
    responseType,
    sslVerify = true,
    firstIpv4 = false,
    tls,
    timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) || 60 * 1000
  } = {}) {
    const stream = requireNativePlugin('stream');
    const headers = {};

    let abortTimeout;
    let aborted;
    let hasContentType = false;
    for (const name in header) {
      if (!hasContentType && name.toLowerCase() === 'content-type') {
        hasContentType = true;
        headers['Content-Type'] = header[name];
        // TODO 需要重构
        if (method !== 'GET' && header[name].indexOf('application/x-www-form-urlencoded') === 0 && typeof data !==
          'string' && !(data instanceof ArrayBuffer)) {
          const bodyArray = [];
          for (const key in data) {
            if (hasOwn(data, key)) {
              bodyArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
          }
          data = bodyArray.join('&');
        }
      } else {
        headers[name] = header[name];
      }
    }

    if (!hasContentType && method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    if (timeout) {
      abortTimeout = setTimeout(() => {
        aborted = true;
        publishStateChange$1({
          requestTaskId,
          state: 'fail',
          statusCode: 0,
          errMsg: 'timeout'
        });
      }, (timeout + 200)); // TODO +200 发消息到原生层有时间开销，以后考虑由原生层回调超时
    }
    const options = {
      method,
      url: url.trim(),
      // weex 官方文档有误，headers 类型实际 object，用 string 类型会无响应
      headers,
      type: responseType === 'arraybuffer' ? 'base64' : 'text',
      // weex 官方文档未说明实际支持 timeout，单位：ms
      timeout: timeout || 6e5,
      // 配置和weex模块内相反
      sslVerify: !sslVerify,
      firstIpv4: firstIpv4,
      tls
    };
    let withArrayBuffer;
    if (method !== 'GET') {
      if (toString.call(data) === '[object ArrayBuffer]') {
        withArrayBuffer = true;
      } else {
        options.body = typeof data === 'string' ? data : JSON.stringify(data);
      }
    }
    const callback = ({
      ok,
      status,
      data,
      headers,
      errorMsg
    }) => {
      if (aborted) {
        return
      }
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
      const statusCode = status;
      if (statusCode > 0) {
        publishStateChange$1({
          requestTaskId,
          state: 'success',
          data: ok && responseType === 'arraybuffer' ? base64ToArrayBuffer$2(data) : data,
          statusCode,
          header: headers,
          cookies: cookiesParse(headers)
        });
      } else {
        let errMsg = 'abort statusCode:' + statusCode;
        if (errorMsg) {
          errMsg = errMsg + ' ' + errorMsg;
        }
        publishStateChange$1({
          requestTaskId,
          state: 'fail',
          statusCode,
          errMsg
        });
      }
    };
    try {
      if (withArrayBuffer) {
        stream.fetchWithArrayBuffer({
          '@type': 'binary',
          base64: arrayBufferToBase64$2(data)
        }, options, callback);
      } else {
        stream.fetch(options, callback);
      }
      requestTasks[requestTaskId] = {
        abort () {
          aborted = true;
          if (abortTimeout) {
            clearTimeout(abortTimeout);
          }
          publishStateChange$1({
            requestTaskId,
            state: 'fail',
            statusCode: 0,
            errMsg: 'abort'
          });
        }
      };
    } catch (e) {
      return {
        requestTaskId,
        errMsg: 'createRequestTask:fail'
      }
    }
    return {
      requestTaskId,
      errMsg: 'createRequestTask:ok'
    }
  }

  function createRequestTask (args) {
    return createRequestTaskById(++requestTaskId, args)
  }

  function operateRequestTask ({
    requestTaskId,
    operationType
  } = {}) {
    const requestTask = requestTasks[requestTaskId];
    if (requestTask && operationType === 'abort') {
      requestTask.abort();
      return {
        errMsg: 'operateRequestTask:ok'
      }
    }
    return {
      errMsg: 'operateRequestTask:fail'
    }
  }

  function configMTLS$1 ({ certificates }, callbackId) {
    const stream = requireNativePlugin('stream');
    stream.configMTLS(certificates, ({ type, code, message }) => {
      switch (type) {
        case 'success':
          invoke$1(callbackId, {
            errMsg: 'configMTLS:ok',
            code
          });
          break
        case 'fail':
          invoke$1(callbackId, {
            errMsg: 'configMTLS:fail ' + message,
            code
          });
          break
      }
    });
  }

  const socketTasks = {};

  const publishStateChange$2 = (res) => {
    publish('onSocketTaskStateChange', res);
  };

  let socket;
  function getSocket () {
    if (socket) {
      return socket
    }
    socket = requireNativePlugin('uni-webSocket');
    socket.onopen(function (e) {
      publishStateChange$2({
        socketTaskId: e.id,
        state: 'open'
      });
    });
    socket.onmessage(function (e) {
      const data = e.data;
      publishStateChange$2({
        socketTaskId: e.id,
        state: 'message',
        data: typeof data === 'object' ? base64ToArrayBuffer$2(data.base64) : data
      });
    });
    socket.onerror(function (e) {
      publishStateChange$2({
        socketTaskId: e.id,
        state: 'error',
        errMsg: e.data
      });
    });
    socket.onclose(function (e) {
      const socketTaskId = e.id;
      delete socketTasks[socketTaskId];
      publishStateChange$2({
        socketTaskId,
        state: 'close'
      });
    });
    return socket
  }

  const createSocketTaskById = function (socketTaskId, {
    url,
    data,
    header,
    method,
    protocols
  } = {}) {
    const socket = getSocket();
    socket.WebSocket({
      id: socketTaskId,
      url,
      protocol: Array.isArray(protocols) ? protocols.join(',') : protocols,
      header
    });
    socketTasks[socketTaskId] = socket;
    return {
      socketTaskId,
      errMsg: 'createSocketTask:ok'
    }
  };

  function createSocketTask (args) {
    return createSocketTaskById(String(Date.now()), args)
  }

  function operateSocketTask (args) {
    const {
      operationType,
      code,
      reason,
      data,
      socketTaskId
    } = unpack(args);
    const socket = socketTasks[socketTaskId];
    if (!socket) {
      return {
        errMsg: 'operateSocketTask:fail'
      }
    }
    switch (operationType) {
      case 'send':
        if (data) {
          socket.send({
            id: socketTaskId,
            data: typeof data === 'object' ? {
              '@type': 'binary',
              base64: arrayBufferToBase64$2(data)
            } : data
          });
        }
        return {
          errMsg: 'operateSocketTask:ok'
        }
      case 'close':
        socket.close({
          id: socketTaskId,
          code,
          reason
        });
        delete socketTasks[socketTaskId];
        return {
          errMsg: 'operateSocketTask:ok'
        }
    }
    return {
      errMsg: 'operateSocketTask:fail'
    }
  }

  let uploadTaskId = 0;
  const uploadTasks = {};

  const publishStateChange$3 = (res) => {
    publish('onUploadTaskStateChange', res);
  };

  const createUploadTaskById = function (uploadTaskId, {
    url,
    filePath,
    name,
    files,
    header,
    formData,
    timeout = __uniConfig.networkTimeout.uploadFile ? __uniConfig.networkTimeout.uploadFile / 1000 : 120
  } = {}) {
    const uploader = plus.uploader.createUpload(url, {
      timeout,
      // 需要与其它平台上的表现保持一致，不走重试的逻辑。
      retry: 0,
      retryInterval: 0
    }, (upload, statusCode) => {
      if (statusCode) {
        publishStateChange$3({
          uploadTaskId,
          state: 'success',
          data: upload.responseText,
          statusCode
        });
      } else {
        publishStateChange$3({
          uploadTaskId,
          state: 'fail',
          data: '',
          statusCode
        });
      }
      delete uploadTasks[uploadTaskId];
    });

    for (const name in header) {
      if (hasOwn(header, name)) {
        uploader.setRequestHeader(name, String(header[name]));
      }
    }
    for (const name in formData) {
      if (hasOwn(formData, name)) {
        uploader.addData(name, String(formData[name]));
      }
    }
    if (files && files.length) {
      files.forEach(file => {
        uploader.addFile(getRealPath$1(file.uri || file.filePath), {
          key: file.name || 'file'
        });
      });
    } else {
      uploader.addFile(getRealPath$1(filePath), {
        key: name
      });
    }
    uploader.addEventListener('statechanged', (upload, status) => {
      if (upload.uploadedSize && upload.totalSize) {
        publishStateChange$3({
          uploadTaskId,
          state: 'progressUpdate',
          progress: parseInt(upload.uploadedSize / upload.totalSize * 100),
          totalBytesSent: upload.uploadedSize,
          totalBytesExpectedToSend: upload.totalSize
        });
      }
    });
    uploadTasks[uploadTaskId] = uploader;
    uploader.start();
    return {
      uploadTaskId,
      errMsg: 'createUploadTask:ok'
    }
  };

  function operateUploadTask ({
    uploadTaskId,
    operationType
  } = {}) {
    const uploadTask = uploadTasks[uploadTaskId];
    if (uploadTask && operationType === 'abort') {
      delete uploadTasks[uploadTaskId];
      uploadTask.abort();
      publishStateChange$3({
        uploadTaskId,
        state: 'fail',
        errMsg: 'abort'
      });
      return {
        errMsg: 'operateUploadTask:ok'
      }
    }
    return {
      errMsg: 'operateUploadTask:fail'
    }
  }

  function createUploadTask (args) {
    return createUploadTaskById(++uploadTaskId, args)
  }

  const providers = {
    oauth (callback) {
      plus.oauth.getServices(services => {
        const provider = [];
        services.forEach(({
          id
        }) => {
          provider.push(id);
        });
        callback(null, provider);
      }, err => {
        callback(err);
      });
    },
    share (callback) {
      plus.share.getServices(services => {
        const provider = [];
        services.forEach(({
          id
        }) => {
          provider.push(id);
        });
        callback(null, provider);
      }, err => {
        callback(err);
      });
    },
    payment (callback) {
      plus.payment.getChannels(services => {
        const provider = [];
        services.forEach(({
          id
        }) => {
          provider.push(id);
        });
        callback(null, provider);
      }, err => {
        callback(err);
      });
    },
    push (callback) {
      if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
        callback(null, [plus.push.getClientInfo().id]);
      } else {
        callback(null, []);
      }
    }
  };

  function getProvider$1 ({
    service
  }, callbackId) {
    if (providers[service]) {
      providers[service]((err, provider) => {
        if (err) {
          invoke$1(callbackId, {
            errMsg: 'getProvider:fail ' + err.message
          });
        } else {
          invoke$1(callbackId, {
            errMsg: 'getProvider:ok',
            service,
            provider
          });
        }
      });
    } else {
      invoke$1(callbackId, {
        errMsg: 'getProvider:fail service not found'
      });
    }
  }

  let univerifyManager;

  function getService (provider) {
    return new Promise((resolve, reject) => {
      plus.oauth.getServices(services => {
        const service = services.find(({ id }) => id === provider);
        service ? resolve(service) : reject(new Error('provider not find'));
      }, reject);
    })
  }

  /**
   * 微信登录
   */
  function login (params, callbackId, plus = true) {
    const provider = params.provider || 'weixin';
    const errorCallback = warpErrorCallback(callbackId, 'login', plus);
    const isAppleLogin = provider === 'apple';
    const authOptions = isAppleLogin
      ? { scope: 'email' }
      : params.univerifyStyle
        ? { univerifyStyle: univerifyButtonsClickHandling(params.univerifyStyle, errorCallback) }
        : {};
    const _invoke = plus ? invoke$1 : callback.invoke;

    getService(provider).then(service => {
      function login () {
        if (params.onlyAuthorize && provider === 'weixin') {
          service.authorize(({ code }) => {
            _invoke(callbackId, {
              code,
              authResult: '',
              errMsg: 'login:ok'
            });
          }, errorCallback);
          return
        }
        service.login(res => {
          const authResult = res.target.authResult;
          const appleInfo = res.target.appleInfo;
          _invoke(callbackId, {
            code: authResult.code,
            authResult: authResult,
            appleInfo,
            errMsg: 'login:ok'
          });
        }, errorCallback, authOptions);
      }
      // 先注销再登录
      // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
      if (isAppleLogin || provider === 'univerify') {
        login();
      } else {
        service.logout(login, login);
      }
    }).catch(errorCallback);
  }

  function getUserInfo (params, callbackId) {
    const provider = params.provider || 'weixin';
    const errorCallback = warpPlusErrorCallback(callbackId, 'operateWXData');
    getService(provider).then(loginService => {
      loginService.getUserInfo(res => {
        let userInfo;
        if (provider === 'weixin') {
          const wechatUserInfo = loginService.userInfo;
          userInfo = {
            openId: wechatUserInfo.openid,
            nickName: wechatUserInfo.nickname,
            gender: wechatUserInfo.sex,
            city: wechatUserInfo.city,
            province: wechatUserInfo.province,
            country: wechatUserInfo.country,
            avatarUrl: wechatUserInfo.headimgurl,
            unionId: wechatUserInfo.unionid
          };
        } else if (provider === 'apple') {
          const appleInfo = loginService.appleInfo;
          userInfo = {
            openId: appleInfo.user,
            fullName: appleInfo.fullName,
            email: appleInfo.email,
            authorizationCode: appleInfo.authorizationCode,
            identityToken: appleInfo.identityToken,
            realUserStatus: appleInfo.realUserStatus
          };
        } else {
          userInfo = loginService.userInfo;
          userInfo.openId = userInfo.openId || userInfo.openid || loginService.authResult.openid;
          userInfo.nickName = userInfo.nickName || userInfo.nickname;
          userInfo.avatarUrl = userInfo.avatarUrl || userInfo.headimgurl;
        }
        const result = {
          errMsg: 'operateWXData:ok'
        };
        if (params.data && params.data.api_name === 'webapi_getuserinfo') {
          result.data = {
            data: JSON.stringify(userInfo),
            rawData: '',
            signature: '',
            encryptedData: '',
            iv: ''
          };
        } else {
          result.userInfo = userInfo;
        }
        invoke$1(callbackId, result);
      }, errorCallback);
    }).catch(() => {
      invoke$1(callbackId, {
        errMsg: 'operateWXData:fail 请先调用 uni.login'
      });
    });
  }
  /**
   * 获取用户信息-兼容
   */
  function getUserProfile (params, callbackId) {
    return getUserInfo(params, callbackId)
  }

  /**
   * 获取用户信息
   */
  function operateWXData (params, callbackId) {
    switch (params.data.api_name) {
      case 'webapi_getuserinfo':
        getUserInfo(params, callbackId);
        break
      default:
        return {
          errMsg: 'operateWXData:fail'
        }
    }
  }

  function preLogin$1 (params, callbackId, plus) {
    const successCallback = warpSuccessCallback(callbackId, 'preLogin', plus);
    const errorCallback = warpErrorCallback(callbackId, 'preLogin', plus);
    getService(params.provider).then(service => service.preLogin(successCallback, errorCallback)).catch(errorCallback);
  }

  function closeAuthView () {
    return getService('univerify').then(service => service.closeAuthView())
  }

  function getCheckBoxState (params, callbackId, plus) {
    const successCallback = warpSuccessCallback(callbackId, 'getCheckBoxState', plus);
    const errorCallback = warpErrorCallback(callbackId, 'getCheckBoxState', plus);
    try {
      getService('univerify').then(service => {
        const state = service.getCheckBoxState();
        successCallback({ state });
      });
    } catch (error) {
      errorCallback(error);
    }
  }

  /**
   * 一键登录自定义登陆按钮点击处理
   */
  function univerifyButtonsClickHandling (univerifyStyle, errorCallback) {
    if (isPlainObject(univerifyStyle) && isPlainObject(univerifyStyle.buttons) && toRawType(univerifyStyle.buttons.list) === 'Array') {
      univerifyStyle.buttons.list.forEach((button, index) => {
        univerifyStyle.buttons.list[index].onclick = function () {
          const res = {
            code: '30008',
            message: '用户点击了自定义按钮',
            index,
            provider: button.provider
          };
          isPlainObject(univerifyManager)
            ? univerifyManager._triggerUniverifyButtonsClick(res)
            : closeAuthView().then(() => {
              errorCallback(res);
            });
        };
      });
    }
    return univerifyStyle
  }

  class UniverifyManager {
    constructor () {
      this.provider = 'univerify';
      this.eventName = 'api.univerifyButtonsClick';
    }

    close () {
      closeAuthView();
    }

    login (options) {
      this._warp((data, callbackId) => login(data, callbackId, false), options);
    }

    getCheckBoxState (options) {
      this._warp((_, callbackId) => getCheckBoxState(_, callbackId, false), options);
    }

    preLogin (options) {
      this._warp((data, callbackId) => preLogin$1(data, callbackId, false), options);
    }

    onButtonsClick (callback) {
      UniServiceJSBridge.on(this.eventName, callback);
    }

    offButtonsClick (callback) {
      UniServiceJSBridge.off(this.eventName, callback);
    }

    _triggerUniverifyButtonsClick (res) {
      UniServiceJSBridge.emit(this.eventName, res);
    }

    _warp (fn, options) {
      return callback.warp(fn)(this._getOptions(options))
    }

    _getOptions (options = {}) {
      return Object.assign({}, options, { provider: this.provider })
    }
  }

  function getUniverifyManager () {
    return univerifyManager || (univerifyManager = new UniverifyManager())
  }

  function warpSuccessCallback (callbackId, name, plus = true) {
    return plus
      ? warpPlusSuccessCallback(callbackId, name)
      : (options) => {
        callback.invoke(callbackId, Object.assign({}, options, {
          errMsg: `${name}:ok`
        }));
      }
  }

  function warpErrorCallback (callbackId, name, plus = true) {
    return plus
      ? warpPlusErrorCallback(callbackId, name)
      : (error) => {
        const { code = 0, message: errorMessage } = error;
        callback.invoke(callbackId, {
          errMsg: `${name}:fail ${errorMessage || ''}`,
          errCode: code,
          code
        });
      }
  }

  function requestPayment (params, callbackId) {
    const provider = params.provider;
    const errorCallback = warpPlusErrorCallback(callbackId, 'requestPayment');

    plus.payment.getChannels(services => {
      const service = services.find(({
        id
      }) => id === provider);
      if (!service) {
        invoke$1(callbackId, {
          errMsg: 'requestPayment:fail service not found'
        });
      } else {
        plus.payment.request(service, params.orderInfo, res => {
          res.errMsg = 'requestPayment:ok';
          invoke$1(callbackId, res);
        }, errorCallback);
      }
    }, errorCallback);
  }

  let onPushing;

  let isListening = false;

  let unsubscribe = false;

  function subscribePush (params, callbackId) {
    const clientInfo = plus.push.getClientInfo();
    if (clientInfo) {
      if (!isListening) {
        isListening = true;
        plus.push.addEventListener('receive', msg => {
          if (onPushing && !unsubscribe) {
            publish('onPushMessage', {
              messageId: msg.__UUID__,
              data: msg.payload,
              errMsg: 'onPush:ok'
            });
          }
        });
      }
      unsubscribe = false;
      clientInfo.errMsg = 'subscribePush:ok';
      return clientInfo
    } else {
      return {
        errMsg: 'subscribePush:fail 请确保当前运行环境已包含 push 模块'
      }
    }
  }

  function unsubscribePush (params) {
    unsubscribe = true;
    return {
      errMsg: 'unsubscribePush:ok'
    }
  }

  function onPush () {
    if (!isListening) {
      return {
        errMsg: 'onPush:fail 请先调用 uni.subscribePush'
      }
    }
    if (plus.push.getClientInfo()) {
      onPushing = true;
      return {
        errMsg: 'onPush:ok'
      }
    }
    return {
      errMsg: 'onPush:fail 请确保当前运行环境已包含 push 模块'
    }
  }

  function offPush (params) {
    onPushing = false;
    return {
      errMsg: 'offPush:ok'
    }
  }

  function requireNativePlugin$1 (name) {
    return weex.requireModule(name)
  }

  // 0:图文，1:纯文字，2:纯图片，3:音乐，4:视频，5:小程序
  const TYPES$1 = {
    0: {
      name: 'web',
      title: '图文'
    },
    1: {
      name: 'text',
      title: '纯文字'
    },
    2: {
      name: 'image',
      title: '纯图片'
    },
    3: {
      name: 'music',
      title: '音乐'
    },
    4: {
      name: 'video',
      title: '视频'
    },
    5: {
      name: 'miniProgram',
      title: '小程序'
    }
  };

  const parseParams = (args, callbackId, method) => {
    args.type = args.type || 0;

    let {
      provider,
      type,
      title,
      summary: content,
      href,
      imageUrl,
      mediaUrl: media,
      scene,
      miniProgram,
      openCustomerServiceChat,
      corpid,
      customerUrl: url
    } = args;

    if (typeof imageUrl === 'string' && imageUrl) {
      imageUrl = getRealPath$1(imageUrl);
    }

    const shareType = TYPES$1[type + ''];
    if (shareType) {
      const sendMsg = {
        provider,
        type: shareType.name,
        title,
        content,
        href,
        pictures: [imageUrl],
        thumbs: [imageUrl],
        media,
        miniProgram,
        extra: {
          scene
        },
        openCustomerServiceChat,
        corpid,
        url
      };
      if (provider === 'weixin' && (type === 1 || type === 2)) {
        delete sendMsg.thumbs;
      }
      return sendMsg
    }
    return '分享参数 type 不正确'
  };

  const sendShareMsg = function (service, params, callbackId, method = 'share') {
    const errorCallback = warpPlusErrorCallback(callbackId, method);
    const serviceMethod = params.openCustomerServiceChat ? 'openCustomerServiceChat' : 'send';
    try {
      service[serviceMethod](params, () => {
        invoke$1(callbackId, {
          errMsg: method + ':ok'
        });
      }, errorCallback);
    } catch (error) {
      errorCallback({
        message: `${params.provider} ${serviceMethod} 方法调用失败`
      });
    }
  };

  function shareAppMessageDirectly ({
    title,
    path,
    imageUrl,
    useDefaultSnapshot
  }, callbackId) {
    title = title || __uniConfig.appname;
    const goShare = () => {
      share({
        provider: 'weixin',
        type: 0,
        title,
        imageUrl,
        href: path,
        scene: 'WXSceneSession'
      },
      callbackId,
      'shareAppMessageDirectly'
      );
    };
    const errorCallback = warpPlusErrorCallback(callbackId, 'shareAppMessageDirectly');

    if (useDefaultSnapshot) {
      const pages = getCurrentPages();
      const webview = plus.webview.getWebviewById(pages[pages.length - 1].__wxWebviewId__ + '');
      if (webview) {
        const bitmap = new plus.nativeObj.Bitmap();
        webview.draw(bitmap, () => {
          const fileName = TEMP_PATH + '/share/snapshot.jpg';
          bitmap.save(
            fileName, {
              overwrite: true,
              format: 'jpg'
            }, () => {
              imageUrl = fileName;
              goShare();
            }, errorCallback);
        }, errorCallback);
      } else {
        goShare();
      }
    } else {
      goShare();
    }
  }

  function share (params, callbackId, method = 'share') {
    params = parseParams(params);
    const errorCallback = warpPlusErrorCallback(callbackId, method);

    if (typeof params === 'string') {
      return invoke$1(callbackId, {
        errMsg: method + ':fail ' + params
      })
    }
    const provider = params.provider;
    plus.share.getServices(services => {
      const service = services.find(({
        id
      }) => id === provider);
      if (!service) {
        invoke$1(callbackId, {
          errMsg: method + ':fail service not found'
        });
      } else {
        if (service.authenticated) {
          sendShareMsg(service, params, callbackId);
        } else {
          service.authorize(
            () => sendShareMsg(service, params, callbackId),
            errorCallback
          );
        }
      }
    }, errorCallback);
  }

  function shareWithSystem (params, callbackId, method = 'shareWithSystem') {
    let {
      type,
      imageUrl,
      summary: content,
      href
    } = params;
    type = type || 'text';
    const allowedTypes = ['text', 'image'];
    const errorCallback = warpPlusErrorCallback(callbackId, method);

    if (allowedTypes.indexOf(type) < 0) {
      invoke$1(callbackId, {
        errMsg: method + ':fail 分享参数 type 不正确'
      });
    }
    if (typeof imageUrl === 'string' && imageUrl) {
      imageUrl = getRealPath$1(imageUrl);
    }
    plus.share.sendWithSystem({
      type,
      pictures: imageUrl && [imageUrl],
      content,
      href
    }, function (res) {
      invoke$1(callbackId, {
        errMsg: method + ':ok'
      });
    }, errorCallback);
  }

  function restoreGlobal (
    newWeex,
    newPlus,
    newSetTimeout,
    newClearTimeout,
    newSetInterval,
    newClearInterval
  ) {
    // 确保部分全局变量 是 app-service 中的
    // 若首页 nvue 初始化比 app-service 快，导致框架处于该 nvue 环境下
    // plus 如果不用 app-service，资源路径会出问题
    // 若首页 nvue 被销毁，如 redirectTo 或 reLaunch，则这些全局功能会损坏
    if (plus !== newPlus) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[restoreGlobal][${Date.now()}]`);
      }
      weex = newWeex;
      plus = newPlus;
      restoreOldSetStatusBarStyle(plus.navigator.setStatusBarStyle);
      plus.navigator.setStatusBarStyle = newSetStatusBarStyle;
      /* eslint-disable no-global-assign */
      setTimeout = newSetTimeout;
      clearTimeout = newClearTimeout;
      setInterval = newSetInterval;
      clearInterval = newClearInterval;
    }
    __uniConfig.serviceReady = true;
  }

  function requireGlobal () {
    const list = [
      'ArrayBuffer',
      'Int8Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Int16Array',
      'Uint16Array',
      'Int32Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
      'BigInt64Array',
      'BigUint64Array'
    ];
    const object = {};
    for (let i = 0; i < list.length; i++) {
      const key = list[i];
      object[key] = global[key];
    }
    return object
  }

  function wrapper$1 (webview) {
    webview.$processed = true;

    webview.postMessage = function (data) {
      plus.webview.postMessageToUniNView({
        type: 'UniAppSubNVue',
        data
      }, webview.id);
    };
    let callbacks = [];
    webview.onMessage = function (callback) {
      callbacks.push(callback);
    };
    webview.$consumeMessage = function (e) {
      callbacks.forEach(callback => callback(e));
    };

    if (!webview.__uniapp_mask_id) {
      return
    }
    const maskColor = webview.__uniapp_mask;
    const maskWebview = webview.__uniapp_mask_id === '0' ? {
      setStyle ({
        mask
      }) {
        requireNativePlugin$1('uni-tabview').setMask({
          color: mask
        });
      }
    } : plus.webview.getWebviewById(webview.__uniapp_mask_id);
    const oldShow = webview.show;
    const oldHide = webview.hide;
    const oldClose = webview.close;

    const showMask = function () {
      maskWebview.setStyle({
        mask: maskColor
      });
    };
    const closeMask = function () {
      maskWebview.setStyle({
        mask: 'none'
      });
    };
    webview.show = function (...args) {
      showMask();
      return oldShow.apply(webview, args)
    };
    webview.hide = function (...args) {
      closeMask();
      return oldHide.apply(webview, args)
    };
    webview.close = function (...args) {
      closeMask();
      callbacks = [];
      return oldClose.apply(webview, args)
    };
  }

  function getSubNVueById (id) {
    const webview = plus.webview.getWebviewById(id);
    if (webview === null || webview === undefined) {
      throw new Error('Unable to find SubNVue, id=' + id)
    }
    if (webview && !webview.$processed) {
      wrapper$1(webview);
    }
    const oldSetStyle = webview.setStyle;
    var parentWebview = plus.webview.getWebviewById(webview.__uniapp_mask_id);
    webview.setStyle = function (style) {
      if (style && style.mask) {
        parentWebview && parentWebview.setStyle({
          mask: style.mask
        });
        delete style.mask;
      }
      oldSetStyle.call(this, style);
    };
    return webview
  }

  function getCurrentSubNVue () {
    return getSubNVueById(plus.webview.currentWebview().id)
  }

  const callbacks$3 = [];
  // 不使用uni-core/service/platform中的onMethod，避免循环引用
  UniServiceJSBridge.on('api.uniMPNativeEvent', function (res) {
    callbacks$3.forEach(callbackId => {
      invoke$1(callbackId, res.event, res.data);
    });
  });

  function onHostEventReceive (callbackId) {
    callbacks$3.push(callbackId);
  }

  function onNativeEventReceive (callbackId) {
    callbacks$3.push(callbackId);
  }

  function sendNativeEvent (event, data, callback) {
    // 实时获取weex module（weex可能会变化，比如首页nvue加速显示时）
    return weex.requireModule('plus').sendNativeEvent(event, data, callback)
  }

  const loadedSubPackages = [];

  /**
   * 指定路由 ready 后，检查是否触发分包预加载
   * @param {Object} route
   */
  function preloadSubPackages (route) {
    if (!__uniConfig.preloadRule) {
      return
    }
    const options = __uniConfig.preloadRule[route];
    if (!options || !Array.isArray(options.packages)) {
      return
    }
    const packages = options.packages.filter(root => loadedSubPackages.indexOf(root) === -1);
    if (!packages.length) {
      return
    }
    loadSubPackages(options.packages);
    // 暂不需要网络下载
    // const network = options.network || 'wifi'
    // if (network === 'wifi') {
    //   uni.getNetworkType({
    //     success (res) {
    //       if (process.env.NODE_ENV !== 'production') {
    //         console.log('UNIAPP[preloadRule]:' + res.networkType + ':' + JSON.stringify(options))
    //       }
    //       if (res.networkType === 'wifi') {
    //         loadSubPackages(options.packages)
    //       }
    //     }
    //   })
    // } else {
    //   if (process.env.NODE_ENV !== 'production') {
    //     console.log('UNIAPP[preloadRule]:' + JSON.stringify(options))
    //   }
    //   loadSubPackages(options.packages)
    // }
  }

  function loadPage (route, callback) {
    let isInSubPackage = false;
    const subPackages = __uniConfig.subPackages;
    if (Array.isArray(subPackages)) {
      const subPackage = subPackages.find(subPackage => route.indexOf(subPackage.root) === 0);
      if (subPackage) {
        isInSubPackage = true;
        loadSubPackage$1(subPackage.root, callback);
      }
    }
    if (!isInSubPackage) {
      callback();
    }
  }

  function loadSubPackage$1 (root, callback) {
    if (loadedSubPackages.indexOf(root) !== -1) {
      return callback()
    }
    loadSubPackages([root], () => {
      callback();
    });
  }

  const SUB_FILENAME = 'app-sub-service.js';

  function evaluateScriptFiles (files, callback) {
    __uniConfig.onServiceReady(() => {
      weex.requireModule('plus').evalJSFiles(files, callback);
    });
  }

  function loadSubPackages (packages, callback) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[loadSubPackages]:' + JSON.stringify(packages));
    }
    const startTime = Date.now();
    evaluateScriptFiles(packages.map(root => {
      loadedSubPackages.push(root);
      return root + '/' + SUB_FILENAME
    }), res => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('UNIAPP[loadSubPackages]:耗时(' + (Date.now() - startTime) + ')');
      }
      callback && callback(true);
    });
  }

  const SUB_FILENAME$1 = 'app-sub-service.js';

  function evaluateScriptFile (file, callback) {
    __uniConfig.onServiceReady(() => {
      weex.requireModule('plus').evalJSFiles([file], callback);
    });
  }

  function loadSubPackage$2 ({
    root
  }, callbackId) {
    if (loadedSubPackages.indexOf(root) !== -1) {
      return {
        errMsg: 'loadSubPackage:ok'
      }
    }
    loadedSubPackages.push(root);
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[loadSubPackage]:' + root);
    }
    const startTime = Date.now();
    evaluateScriptFile(root + '/' + SUB_FILENAME$1, res => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('UNIAPP[loadSubPackage]:耗时(' + (Date.now() - startTime) + ')');
      }
      invoke$1(callbackId, {
        errMsg: 'loadSubPackage:ok'
      });
    });
  }

  const sendHostEvent = sendNativeEvent;

  function navigateToMiniProgram (data, callbackId) {
    sendHostEvent(
      'navigateToUniMP',
      data,
      (res) => {
        if (res.errMsg && res.errMsg.indexOf(':ok') === -1) {
          return invoke$1(callbackId, {
            errMsg: res.errMsg
          })
        }
        invoke$1(callbackId, {
          errMsg: 'navigateToMiniProgram:ok'
        });
      }
    );
  }

  const VD_SYNC_VERSION = 2;

  const PAGE_CREATE = 2;
  const MOUNTED_DATA = 4;
  const UPDATED_DATA = 6;
  const PAGE_CREATED = 10;

  const UI_EVENT = 20;

  const VD_SYNC = 'vdSync';

  const WEBVIEW_READY = 'webviewReady';
  const VD_SYNC_CALLBACK = 'vdSyncCallback';
  const INVOKE_API = 'invokeApi';
  const WEB_INVOKE_APPSERVICE$1 = 'WEB_INVOKE_APPSERVICE';
  const WEBVIEW_INSERTED = 'webviewInserted';
  const WEBVIEW_REMOVED = 'webviewRemoved';
  const WEBVIEW_ID_PREFIX = 'webviewId';

  function createButtonOnClick (index) {
    return function onClick (btn) {
      const pages = getCurrentPages();
      if (!pages.length) {
        return
      }
      btn.index = index;
      const page = pages[pages.length - 1];
      page.$vm &&
        page.$vm.__call_hook &&
        page.$vm.__call_hook('onNavigationBarButtonTap', btn);
    }
  }

  function parseTitleNViewButtons (titleNView) {
    const buttons = titleNView.buttons;
    if (!Array.isArray(buttons)) {
      return titleNView
    }
    buttons.forEach((btn, index) => {
      btn.onclick = createButtonOnClick(index);
    });
    return titleNView
  }

  function parseTitleNView (id, routeOptions) {
    const windowOptions = routeOptions.window;
    const titleNView = windowOptions.titleNView;
    routeOptions.meta.statusBarStyle =
      windowOptions.navigationBarTextStyle === 'black' ? 'dark' : 'light';
    if (
      // 无头
      titleNView === false ||
      titleNView === 'false' ||
      (windowOptions.navigationStyle === 'custom' &&
        !isPlainObject(titleNView)) ||
      (windowOptions.transparentTitle === 'always' && !isPlainObject(titleNView))
    ) {
      return false
    }

    const titleImage = windowOptions.titleImage || '';
    const transparentTitle = windowOptions.transparentTitle || 'none';
    const titleNViewTypeList = {
      none: 'default',
      auto: 'transparent',
      always: 'float'
    };

    const navigationBarBackgroundColor =
      windowOptions.navigationBarBackgroundColor;
    const ret = {
      autoBackButton: !routeOptions.meta.isQuit,
      titleText:
        titleImage === '' ? windowOptions.navigationBarTitleText || '' : '',
      titleColor:
        windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
      type: titleNViewTypeList[transparentTitle],
      backgroundColor:
        /^#[a-z0-9]{6}$/i.test(navigationBarBackgroundColor) ||
        navigationBarBackgroundColor === 'transparent'
          ? navigationBarBackgroundColor
          : '#f7f7f7',
      tags:
        titleImage === ''
          ? []
          : [
            {
              tag: 'img',
              src: titleImage,
              position: {
                left: 'auto',
                top: 'auto',
                width: 'auto',
                height: '26px'
              }
            }
          ]
    };

    if (isPlainObject(titleNView)) {
      return initTitleNViewI18n(
        id,
        Object.assign(ret, parseTitleNViewButtons(titleNView))
      )
    }
    return initTitleNViewI18n(id, ret)
  }

  function initTitleNViewI18n (id, titleNView) {
    const i18nResult = initNavigationBarI18n(titleNView);
    if (!i18nResult) {
      return titleNView
    }
    const [titleTextI18n, searchInputPlaceholderI18n] = i18nResult;
    if (titleTextI18n || searchInputPlaceholderI18n) {
      uni.onLocaleChange(() => {
        const webview = plus.webview.getWebviewById(id + '');
        if (!webview) {
          return
        }
        const newTitleNView = {};
        if (titleTextI18n) {
          newTitleNView.titleText = titleNView.titleText;
        }
        if (searchInputPlaceholderI18n) {
          newTitleNView.searchInput = {
            placeholder: titleNView.searchInput.placeholder
          };
        }
        if (process.env.NODE_ENV !== 'production') {
          console.log('[uni-app] updateWebview', webview.id, newTitleNView);
        }
        webview.setStyle({
          titleNView: newTitleNView
        });
      });
    }
    return titleNView
  }

  function parsePullToRefresh (routeOptions) {
    const windowOptions = routeOptions.window;

    if (windowOptions.enablePullDownRefresh || (windowOptions.pullToRefresh && windowOptions.pullToRefresh.support)) {
      const pullToRefreshStyles = Object.create(null);
      // 初始化默认值
      if (plus.os.name === 'Android') {
        Object.assign(pullToRefreshStyles, {
          support: true,
          style: 'circle'
        });
      } else {
        Object.assign(pullToRefreshStyles, {
          support: true,
          style: 'default',
          height: '50px',
          range: '200px',
          contentdown: {
            caption: ''
          },
          contentover: {
            caption: ''
          },
          contentrefresh: {
            caption: ''
          }
        });
      }

      if (windowOptions.backgroundTextStyle) {
        pullToRefreshStyles.color = windowOptions.backgroundTextStyle;
        pullToRefreshStyles.snowColor = windowOptions.backgroundTextStyle;
      }

      Object.assign(pullToRefreshStyles, windowOptions.pullToRefresh || {});

      return pullToRefreshStyles
    }
  }

  const REGEX_UPX = /(\d+(\.\d+)?)[r|u]px/g;

  function transformCSS (css) {
    return css.replace(REGEX_UPX, (a, b) => {
      return uni.upx2px(parseInt(b) || 0) + 'px'
    })
  }

  function parseStyleUnit (styles) {
    let newStyles = {};
    const stylesStr = JSON.stringify(styles);
    if (~stylesStr.indexOf('upx') || ~stylesStr.indexOf('rpx')) {
      try {
        newStyles = JSON.parse(transformCSS(stylesStr));
      } catch (e) {
        newStyles = styles;
        console.error(e);
      }
    } else {
      newStyles = JSON.parse(stylesStr);
    }

    return newStyles
  }

  const WEBVIEW_STYLE_BLACKLIST = [
    'navigationBarBackgroundColor',
    'navigationBarTextStyle',
    'navigationBarTitleText',
    'navigationBarShadow',
    'navigationStyle',
    'disableScroll',
    'backgroundColor',
    'backgroundTextStyle',
    'enablePullDownRefresh',
    'onReachBottomDistance',
    'usingComponents',
    // 需要解析的
    'titleNView',
    'pullToRefresh'
  ];

  function parseWebviewStyle (id, path, routeOptions = {}) {
    const webviewStyle = {
      bounce: 'vertical'
    };

    // 合并
    routeOptions.window = parseStyleUnit(
      Object.assign(
        JSON.parse(JSON.stringify(__uniConfig.window || {})),
        routeOptions.window || {}
      )
    );

    Object.keys(routeOptions.window).forEach(name => {
      if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
        webviewStyle[name] = routeOptions.window[name];
      }
    });

    const backgroundColor = routeOptions.window.backgroundColor;
    if (
      /^#[a-z0-9]{6}$/i.test(backgroundColor) ||
      backgroundColor === 'transparent'
    ) {
      if (!webviewStyle.background) {
        webviewStyle.background = backgroundColor;
      }
      if (!webviewStyle.backgroundColorTop) {
        webviewStyle.backgroundColorTop = backgroundColor;
      }
    }

    const titleNView = parseTitleNView(id, routeOptions);
    if (titleNView) {
      if (
        id === 1 &&
        __uniConfig.realEntryPagePath &&
        !routeOptions.meta.isQuit // 可能是tabBar
      ) {
        titleNView.autoBackButton = true;
      }
      webviewStyle.titleNView = titleNView;
    }

    const pullToRefresh = parsePullToRefresh(routeOptions);
    if (pullToRefresh) {
      if (pullToRefresh.style === 'circle') {
        webviewStyle.bounce = 'none';
      }
      webviewStyle.pullToRefresh = pullToRefresh;
    }

    // 不支持 hide
    if (webviewStyle.popGesture === 'hide') {
      delete webviewStyle.popGesture;
    }

    if (routeOptions.meta.isQuit) {
      // 退出
      webviewStyle.popGesture = plus.os.name === 'iOS' ? 'appback' : 'none';
    }

    // TODO 下拉刷新

    if (path && routeOptions.meta.isNVue) {
      webviewStyle.uniNView = {
        path,
        defaultFontSize: __uniConfig.defaultFontSize,
        viewport: __uniConfig.viewport
      };
    }

    return webviewStyle
  }

  function backbuttonListener () {
    uni.navigateBack({
      from: 'backbutton'
    });
  }

  function initPopupSubNVue (subNVueWebview, style, maskWebview) {
    if (!maskWebview.popupSubNVueWebviews) {
      maskWebview.popupSubNVueWebviews = {};
    }

    maskWebview.popupSubNVueWebviews[subNVueWebview.id] = subNVueWebview;

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `UNIAPP[webview][${maskWebview.id}]:add.popupSubNVueWebview[${subNVueWebview.id}]`
      );
    }

    const hideSubNVue = function () {
      maskWebview.setStyle({
        mask: 'none'
      });
      subNVueWebview.hide('auto');
    };
    maskWebview.addEventListener('maskClick', hideSubNVue);
    let isRemoved = false; // 增加个 remove 标记，防止出错
    subNVueWebview.addEventListener('show', () => {
      if (!isRemoved) {
        plus.key.removeEventListener('backbutton', backbuttonListener);
        plus.key.addEventListener('backbutton', hideSubNVue);
        isRemoved = true;
      }
    });
    subNVueWebview.addEventListener('hide', () => {
      if (isRemoved) {
        plus.key.removeEventListener('backbutton', hideSubNVue);
        plus.key.addEventListener('backbutton', backbuttonListener);
        isRemoved = false;
      }
    });
    subNVueWebview.addEventListener('close', () => {
      delete maskWebview.popupSubNVueWebviews[subNVueWebview.id];
      if (isRemoved) {
        plus.key.removeEventListener('backbutton', hideSubNVue);
        plus.key.addEventListener('backbutton', backbuttonListener);
        isRemoved = false;
      }
    });
  }

  function initNormalSubNVue (subNVueWebview, style, webview) {
    webview.append(subNVueWebview);
  }

  function initSubNVue (subNVue, routeOptions, webview) {
    if (!subNVue.path) {
      return
    }
    const style = subNVue.style || {};
    const isNavigationBar = subNVue.type === 'navigationBar';
    const isPopup = subNVue.type === 'popup';

    delete style.type;

    if (isPopup && !subNVue.id) {
      console.warn('subNVue[' + subNVue.path + '] is missing id');
    }
    // TODO lazyload

    style.uniNView = {
      path: subNVue.path.replace('.nvue', '.js'),
      defaultFontSize: __uniConfig.defaultFontSize,
      viewport: __uniConfig.viewport
    };

    const extras = {
      __uniapp_host: routeOptions.path,
      __uniapp_origin: style.uniNView.path.split('?')[0].replace('.js', ''),
      __uniapp_origin_id: webview.id,
      __uniapp_origin_type: webview.__uniapp_type
    };

    let maskWebview;

    if (isNavigationBar) {
      style.position = 'dock';
      style.dock = 'top';
      style.top = 0;
      style.width = '100%';
      style.height = NAVBAR_HEIGHT + getStatusbarHeight();
      delete style.left;
      delete style.right;
      delete style.bottom;
      delete style.margin;
    } else if (isPopup) {
      style.position = 'absolute';
      if (isTabBarPage(routeOptions.path)) {
        maskWebview = tabBar$1;
      } else {
        maskWebview = webview;
      }
      extras.__uniapp_mask = style.mask || 'rgba(0,0,0,0.5)';
      extras.__uniapp_mask_id = maskWebview.id;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `UNIAPP[webview][${webview.id}]:create[${subNVue.id}]:${JSON.stringify(style)}`
      );
    }
    delete style.mask;
    const subNVueWebview = plus.webview.create('', subNVue.id, style, extras);

    if (isPopup) {
      initPopupSubNVue(subNVueWebview, style, maskWebview);
    } else {
      initNormalSubNVue(subNVueWebview, style, webview);
    }
  }

  function initSubNVues (routeOptions, webview) {
    const subNVues = routeOptions.window.subNVues;
    if (!subNVues || !subNVues.length) {
      return
    }
    subNVues.forEach(subNVue => {
      initSubNVue(subNVue, routeOptions, webview);
    });
  }

  function onWebviewClose (webview) {
    webview.popupSubNVueWebviews && webview.addEventListener('close', () => {
      Object.keys(webview.popupSubNVueWebviews).forEach(id => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            `UNIAPP[webview][${webview.id}]:popupSubNVueWebview[${id}].close`
          );
        }
        webview.popupSubNVueWebviews[id].close('none');
      });
    });
  }

  function onWebviewResize (webview) {
    const onResize = function ({
      width,
      height
    }) {
      const landscape = Math.abs(plus.navigator.getOrientation()) === 90;
      const res = {
        deviceOrientation: landscape ? 'landscape' : 'portrait',
        size: {
          windowWidth: Math.ceil(width),
          windowHeight: Math.ceil(height)
        }
      };
      publish('onViewDidResize', res); // API
      UniServiceJSBridge.emit('onResize', res, parseInt(webview.id)); // Page lifecycle
    };
    webview.addEventListener('resize', debounce(onResize, 50));
  }

  function onWebviewRecovery (webview, routeOptions) {
    const {
      subscribe,
      unsubscribe
    } = UniServiceJSBridge;

    const id = webview.id;
    const onWebviewRecoveryReady = function (data, pageId) {
      if (id !== pageId) {
        return
      }
      unsubscribe(WEBVIEW_READY, onWebviewRecoveryReady);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`UNIAPP[webview][${id}]:onWebviewRecoveryReady ready`);
      }
      // 恢复目标页面
      pageId = parseInt(pageId);
      const page = getCurrentPages(true).find(page => page.$page.id === pageId);
      if (!page) {
        return console.error(`Page[${pageId}] not found`)
      }
      page.$vm._$vd.restore();
    };

    webview.addEventListener('recovery', e => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`UNIAPP[webview][${this.id}].recovery.reload:` + JSON.stringify({
          path: routeOptions.path,
          webviewId: id
        }));
      }
      subscribe(WEBVIEW_READY, onWebviewRecoveryReady);
    });
  }

  function onWebviewPopGesture (webview) {
    let popStartStatusBarStyle;
    webview.addEventListener('popGesture', e => {
      if (e.type === 'start') {
        // 设置下一个页面的 statusBarStyle
        const pages = getCurrentPages();
        const page = pages[pages.length - 2];
        popStartStatusBarStyle = lastStatusBarStyle;
        const statusBarStyle = page && page.$page.meta.statusBarStyle;
        statusBarStyle && setStatusBarStyle(statusBarStyle);
      } else if (e.type === 'end' && !e.result) {
        // 拖拽未完成,设置为当前状态栏前景色
        setStatusBarStyle(popStartStatusBarStyle);
      } else if (e.type === 'end' && e.result) {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        page && page.$remove();
        setStatusBarStyle();
        if (page && isDirectPage(page)) {
          reLaunchEntryPage();
        } else {
          UniServiceJSBridge.emit('onAppRoute', {
            type: 'navigateBack'
          });
        }
      }
    });
  }

  /**
   * 是否处于直达页面
   * @param page
   * @returns
   */
  function isDirectPage (page) {
    return (
      __uniConfig.realEntryPagePath &&
      page.$page.route === __uniConfig.entryPagePath
    )
  }
  /**
   * 重新启动到首页
   */
  function reLaunchEntryPage () {
    __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
    delete __uniConfig.realEntryPagePath;
    uni.reLaunch({
      url: addLeadingSlash(__uniConfig.entryPagePath)
    });
  }

  function hasLeadingSlash (str) {
    return str.indexOf('/') === 0
  }

  function addLeadingSlash (str) {
    return hasLeadingSlash(str) ? str : '/' + str
  }

  let preloadWebview;

  let id$1 = 2;

  const WEBVIEW_LISTENERS = {
    pullToRefresh: 'onPullDownRefresh',
    titleNViewSearchInputChanged: 'onNavigationBarSearchInputChanged',
    titleNViewSearchInputConfirmed: 'onNavigationBarSearchInputConfirmed',
    titleNViewSearchInputClicked: 'onNavigationBarSearchInputClicked',
    titleNViewSearchInputFocusChanged: 'onNavigationBarSearchInputFocusChanged'
  };

  function setPreloadWebview (webview) {
    preloadWebview = webview;
  }

  function noop$1 (str) {
    return str
  }

  function getUniPageUrl (path, query) {
    const queryString = query ? stringifyQuery(query, noop$1) : '';
    return {
      path: path.substr(1),
      query: queryString ? queryString.substr(1) : queryString
    }
  }

  function getDebugRefresh (path, query, routeOptions) {
    const queryString = query ? stringifyQuery(query, noop$1) : '';
    return {
      isTab: routeOptions.meta.isTabBar,
      arguments: JSON.stringify({
        path: path.substr(1),
        query: queryString ? queryString.substr(1) : queryString
      })
    }
  }

  function createWebview (path, routeOptions, query, extras = {}) {
    if (routeOptions.meta.isNVue) {
      const webviewId = id$1++;
      const webviewStyle = parseWebviewStyle(
        webviewId,
        path,
        routeOptions
      );
      webviewStyle.uniPageUrl = getUniPageUrl(path, query);
      if (process.env.NODE_ENV !== 'production') {
        console.log('[uni-app] createWebview', webviewId, path, webviewStyle);
      }
      // android 需要使用
      webviewStyle.isTab = !!routeOptions.meta.isTabBar;
      return plus.webview.create('', String(webviewId), webviewStyle, Object.assign({
        nvue: true
      }, extras))
    }
    if (id$1 === 2) { // 如果首页非 nvue，则直接返回 Launch Webview
      return plus.webview.getLaunchWebview()
    }
    const webview = preloadWebview;
    return webview
  }

  function initWebview (webview, routeOptions, path, query) {
    // 首页或非 nvue 页面
    if (webview.id === '1' || !routeOptions.meta.isNVue) {
      const webviewStyle = parseWebviewStyle(
        parseInt(webview.id),
        '',
        routeOptions
      );

      webviewStyle.uniPageUrl = getUniPageUrl(path, query);

      if (!routeOptions.meta.isNVue) {
        webviewStyle.debugRefresh = getDebugRefresh(path, query, routeOptions);
      } else {
        // android 需要使用
        webviewStyle.isTab = !!routeOptions.meta.isTabBar;
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log('[uni-app] updateWebview', webviewStyle);
      }

      webview.setStyle(webviewStyle);
    }

    const {
      on,
      emit
    } = UniServiceJSBridge;

    initSubNVues(routeOptions, webview);

    Object.keys(WEBVIEW_LISTENERS).forEach(name => {
      webview.addEventListener(name, (e) => {
        emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id));
      });
    });

    onWebviewClose(webview);
    onWebviewResize(webview);

    if (plus.os.name === 'iOS') {
      !webview.nvue && onWebviewRecovery(webview, routeOptions);
      onWebviewPopGesture(webview);
    }

    on(webview.id + '.startPullDownRefresh', () => {
      webview.beginPullToRefresh();
    });

    on(webview.id + '.stopPullDownRefresh', () => {
      webview.endPullToRefresh();
    });

    return webview
  }

  function createPreloadWebview () {
    if (!preloadWebview || preloadWebview.__uniapp_route) { // 不存在，或已被使用
      preloadWebview = plus.webview.create(VIEW_WEBVIEW_PATH, String(id$1++), { contentAdjust: false });
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[uni-app] preloadWebview[${preloadWebview.id}]`);
      }
    }
    return preloadWebview
  }

  const webviewReadyCallbacks = {};

  function registerWebviewReady (pageId, callback) {
    (webviewReadyCallbacks[pageId] || (webviewReadyCallbacks[pageId] = [])).push(callback);
  }

  function consumeWebviewReady (pageId) {
    const callbacks = webviewReadyCallbacks[pageId];
    Array.isArray(callbacks) && callbacks.forEach(callback => callback());
    delete webviewReadyCallbacks[pageId];
  }

  let todoNavigator = false;

  function setTodoNavigator (path, callback, msg) {
    todoNavigator = {
      path: path,
      nvue: __uniRoutes.find(route => route.path === path).meta.isNVue,
      navigate: callback
    };
    if (process.env.NODE_ENV !== 'production') {
      console.log(`todoNavigator:${todoNavigator.path} ${msg}`);
    }
  }

  function navigate (path, callback, isAppLaunch) {
    {
      if (isAppLaunch && __uniConfig.splashscreen && __uniConfig.splashscreen.autoclose && (!__uniConfig.splashscreen.alwaysShowBeforeRender)) {
        plus.navigator.closeSplashscreen();
      }
      if (!isAppLaunch && todoNavigator) {
        return console.error(`Waiting to navigate to: ${todoNavigator.path}, do not operate continuously: ${path}.`)
      }
      if (__uniConfig.renderer === 'native') { // 纯原生无需wait逻辑
        // 如果是首页还未初始化，需要等一等，其他无需等待
        if (getCurrentPages().length === 0) {
          return setTodoNavigator(path, callback, 'waitForReady')
        }
        return callback()
      }
      // 未创建 preloadWebview 或 preloadWebview 已被使用
      const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route);
      // 已创建未 loaded
      const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded;

      if (waitPreloadWebview || waitPreloadWebviewReady) {
        setTodoNavigator(path, callback, waitPreloadWebview ? 'waitForCreate' : 'waitForReady');
      } else {
        callback();
      }
      if (waitPreloadWebviewReady) {
        registerWebviewReady(preloadWebview.id, todoNavigate);
      }
    }
  }

  function todoNavigate () {
    if (!todoNavigator) {
      return
    }
    const {
      navigate
    } = todoNavigator;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`todoNavigate:${todoNavigator.path}`);
    }
    todoNavigator = false;
    return navigate()
  }

  function navigateFinish () {
    {
      if (__uniConfig.renderer === 'native') {
        if (!todoNavigator) {
          return
        }
        if (todoNavigator.nvue) {
          return todoNavigate()
        }
        return
      }
      // 创建预加载
      const preloadWebview = createPreloadWebview();
      if (process.env.NODE_ENV !== 'production') {
        console.log(`navigateFinish.preloadWebview:${preloadWebview.id}`);
      }
      if (!todoNavigator) {
        return
      }
      if (todoNavigator.nvue) {
        return todoNavigate()
      }
      preloadWebview.loaded
        ? todoNavigator.navigate()
        : registerWebviewReady(preloadWebview.id, todoNavigate);
    }
  }

  function closeWebview (webview, animationType, animationDuration) {
    webview[webview.__preload__ ? 'hide' : 'close'](animationType, animationDuration);
  }

  function showWebview (webview, animationType, animationDuration, showCallback, delay) {
    if (typeof delay === 'undefined') {
      delay = webview.nvue ? 0 : 100;
    }

    if (typeof animationDuration === 'undefined') {
      animationDuration = ANI_DURATION;
    } else {
      animationDuration = parseInt(animationDuration);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[show][${Date.now()}]`, delay);
    }
    const duration = animationDuration || ANI_DURATION;
    setTimeout(() => {
      const execShowCallback = function () {
        if (execShowCallback._called) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('execShowCallback.prevent');
          }
          return
        }
        execShowCallback._called = true;
        showCallback && showCallback();
        navigateFinish();
      };
      const timer = setTimeout(() => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[show.callback.timer][${Date.now()}]`);
        }
        execShowCallback();
      }, duration + 150);
      webview.show(
        animationType || ANI_SHOW,
        duration,
        () => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[show.callback][${Date.now()}]`);
          }
          if (!execShowCallback._called) {
            clearTimeout(timer);
          }
          execShowCallback();
        }
      );
    }, delay);
  }

  let firstBackTime = 0;

  function quit () {
    if (!firstBackTime) {
      firstBackTime = Date.now();
      plus.nativeUI.toast(t('uni.app.quit'));
      setTimeout(() => {
        firstBackTime = null;
      }, 2000);
    } else if (Date.now() - firstBackTime < 2000) {
      plus.runtime.quit();
    }
  }

  function backWebview (webview, callback) {
    const children = webview.children();
    if (!children || !children.length) { // 有子 webview
      return callback()
    }

    // 如果页面有subNvues，切使用了webview组件，则返回时子webview会取错，因此需要做id匹配
    const childWebview = children.find(webview => webview.id.indexOf(WEBVIEW_ID_PREFIX) === 0) || children[0];

    childWebview.canBack(({
      canBack
    }) => {
      if (canBack) {
        childWebview.back(); // webview 返回
      } else {
        callback();
      }
    });
  }

  function back (delta, animationType, animationDuration) {
    const pages = getCurrentPages();
    const len = pages.length;
    const currentPage = pages[len - 1];

    if (delta > 1) {
      // 中间页隐藏
      pages.slice(len - delta, len - 1).reverse().forEach(deltaPage => {
        closeWebview(deltaPage.$getAppWebview(), 'none');
      });
    }

    const backPage = function (webview) {
      if (animationType) {
        closeWebview(webview, animationType, animationDuration || ANI_DURATION);
      } else {
        if (currentPage.$page.openType === 'redirect') { // 如果是 redirectTo 跳转的，需要制定 back 动画
          closeWebview(webview, ANI_CLOSE, ANI_DURATION);
        } else {
          closeWebview(webview, 'auto');
        }
      }

      pages.slice(len - delta, len).forEach(page => page.$remove());

      setStatusBarStyle();

      UniServiceJSBridge.emit('onAppRoute', {
        type: 'navigateBack'
      });
    };

    const webview = currentPage.$getAppWebview();
    if (!currentPage.__uniapp_webview) {
      return backPage(webview)
    }
    backWebview(webview, () => {
      backPage(webview);
    });
  }

  function navigateBack$1 ({
    from = 'navigateBack',
    delta,
    animationType,
    animationDuration
  }) {
    const pages = getCurrentPages();

    const currentPage = pages[pages.length - 1];
    if (
      currentPage.$vm &&
      currentPage.$vm.$options.onBackPress &&
      currentPage.$vm.__call_hook &&
      currentPage.$vm.__call_hook('onBackPress', {
        from
      })
    ) {
      return
    }

    // 后退时，关闭 toast,loading
    uni.hideToast();
    uni.hideLoading();

    if (currentPage.$page.meta.isQuit) {
      quit();
    } else if (currentPage.$page.id === 1 && __uniConfig.realEntryPagePath) {
      // condition
      __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
      delete __uniConfig.realEntryPagePath;
      uni.reLaunch({
        url: '/' + __uniConfig.entryPagePath
      });
    } else {
      back(delta, animationType, animationDuration);
    }
    return {
      errMsg: 'navigateBack:ok'
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

  let id$2 = 0;

  function initEventChannel (events, cache = true) {
    id$2++;
    const eventChannel = new EventChannel(id$2, events);
    return eventChannel
  }

  const pageFactory = Object.create(null);

  function definePage (name, createPageVueComponent) {
    pageFactory[name] = createPageVueComponent;
  }

  const getPageVueComponent = cached(function (pagePath) {
    return pageFactory[pagePath]()
  });

  function createPage (pagePath, pageId, pageQuery, pageInstance) {
    if (!pageFactory[pagePath]) {
      console.error(`${pagePath} not found`);
    }
    const startTime = Date.now();
    const pageVm = new (getPageVueComponent(pagePath))({
      mpType: 'page',
      pageId,
      pagePath,
      pageQuery,
      pageInstance
    });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`new ${pagePath}[${pageId}]:time(${Date.now() - startTime})`);
    }
    return pageVm
  }

  const extend = Object.assign;

  function createLaunchOptions () {
    return {
      path: '',
      query: {},
      scene: 1001,
      referrerInfo: {
        appId: '',
        extraData: {}
      }
    }
  }

  const enterOptions = createLaunchOptions();
  const launchOptions = createLaunchOptions();

  function getEnterOptions () {
    return enterOptions
  }

  function initEnterOptions ({
    path,
    query,
    referrerInfo
  }) {
    extend(enterOptions, {
      path,
      query: query ? parseQuery(query) : {},
      referrerInfo: referrerInfo || {}
    });
  }

  function initLaunchOptions ({
    path,
    query,
    referrerInfo
  }) {
    extend(launchOptions, {
      path,
      query: query ? parseQuery(query) : {},
      referrerInfo: referrerInfo || {}
    });
    extend(enterOptions, launchOptions);
    return launchOptions
  }

  function parseRedirectInfo () {
    const weexPlus = weex.requireModule('plus');
    if (weexPlus.getRedirectInfo) {
      const {
        path,
        query,
        extraData,
        userAction,
        fromAppid
      } =
      weexPlus.getRedirectInfo() || {};
      const referrerInfo = {
        appId: fromAppid,
        extraData: {}
      };
      if (extraData) {
        referrerInfo.extraData = extraData;
      }
      return {
        path: path || '',
        query: query ? '?' + query : '',
        referrerInfo,
        userAction
      }
    }
  }

  let isInitEntryPage = false;

  function initEntryPage () {
    if (isInitEntryPage) {
      return
    }
    isInitEntryPage = true;

    let entryPagePath;
    let entryPageQuery;

    const weexPlus = weex.requireModule('plus');

    if (weexPlus.getRedirectInfo) {
      const {
        path,
        query,
        referrerInfo
      } = parseRedirectInfo();
      if (path) {
        entryPagePath = path;
        entryPageQuery = query;
      }
      __uniConfig.referrerInfo = referrerInfo;
    } else {
      const argsJsonStr = plus.runtime.arguments;
      if (!argsJsonStr) {
        return
      }
      try {
        const args = JSON.parse(argsJsonStr);
        entryPagePath = args.path || args.pathName;
        entryPageQuery = args.query ? ('?' + args.query) : '';
      } catch (e) {}
    }

    if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
      if (entryPageQuery) {
        __uniConfig.entryPageQuery = entryPageQuery;
      }
      return
    }

    const entryRoute = '/' + entryPagePath;
    const routeOptions = __uniRoutes.find(route => route.path === entryRoute);
    if (!routeOptions) {
      console.error(`[uni-app] ${entryPagePath} not found...`);
      return
    }

    if (!routeOptions.meta.isTabBar) {
      __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
    }

    __uniConfig.entryPagePath = entryPagePath;
    __uniConfig.entryPageQuery = entryPageQuery;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] entryPagePath(${entryPagePath + entryPageQuery})`);
    }
  }

  const pages = [];

  function getCurrentPages$1 (returnAll) {
    return returnAll ? pages.slice(0) : pages.filter(page => {
      return !page.$page.meta.isTabBar || page.$page.meta.visible
    })
  }

  const preloadWebviews = {};

  function removePreloadWebview (webview) {
    const url = Object.keys(preloadWebviews).find(url => preloadWebviews[url].id === webview.id);
    if (url) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[uni-app] removePreloadWebview(${webview.id})`);
      }
      delete preloadWebviews[url];
    }
  }

  function closePreloadWebview ({
    url
  }) {
    const webview = preloadWebviews[url];
    if (webview) {
      if (webview.__page__) {
        if (!getCurrentPages$1(true).find(page => page === webview.__page__)) {
          // 未使用
          webview.close('none');
        } else { // 被使用
          webview.__preload__ = false;
        }
      } else { // 未使用
        webview.close('none');
      }
      delete preloadWebviews[url];
    }
    return webview
  }

  function preloadWebview$1 ({
    url,
    path,
    query
  }) {
    if (!preloadWebviews[url]) {
      const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)));
      preloadWebviews[url] = createWebview(path, routeOptions, query, {
        __preload__: true,
        __query__: JSON.stringify(query)
      });
    }
    return preloadWebviews[url]
  }

  /**
   * 首页需要主动registerPage，二级页面路由跳转时registerPage
   */
  function registerPage ({
    url,
    path,
    query,
    openType,
    webview,
    eventChannel
  }) {
    // fast 模式，nvue 首页时，初始化下 entry page
    webview && initEntryPage();

    if (preloadWebviews[url]) {
      webview = preloadWebviews[url];
      if (webview.__page__) {
        // 该预载页面已处于显示状态,不再使用该预加载页面,直接新开
        if (getCurrentPages$1(true).find(page => page === webview.__page__)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[uni-app] preloadWebview(${path},${webview.id}) already in use`);
          }
          webview = null;
        } else {
          if (eventChannel) {
            webview.__page__.eventChannel = eventChannel;
          }
          pages.push(webview.__page__);
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[uni-app] reuse preloadWebview(${path},${webview.id})`);
          }
          return webview
        }
      }
    }
    const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)));

    if (
      openType === 'reLaunch' ||
      (
        !__uniConfig.realEntryPagePath &&
        getCurrentPages$1().length === 0 // redirectTo
      )
    ) {
      routeOptions.meta.isQuit = true;
    } else if (!routeOptions.meta.isTabBar) {
      routeOptions.meta.isQuit = false;
    }

    if (!webview) {
      webview = createWebview(path, routeOptions, query);
    } else {
      webview = plus.webview.getWebviewById(webview.id);
      webview.nvue = routeOptions.meta.isNVue;
    }

    if (routeOptions.meta.isTabBar) {
      routeOptions.meta.visible = true;
    }

    if (routeOptions.meta.isTabBar) {
      tabBar$1.append(webview);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] registerPage(${path},${webview.id})`);
    }

    const isLaunchNVuePage = webview.id === '1' && webview.nvue;

    initWebview(webview, routeOptions, path, query);

    const route = path.slice(1);

    webview.__uniapp_route = route;

    const pageInstance = {
      route,
      options: Object.assign({}, query || {}),
      $getAppWebview () {
        // 重要，不能直接返回 webview 对象，因为 plus 可能会被二次替换，返回的 webview 对象内部的 plus 不正确
        // 导致 webview.getStyle 等逻辑出错(旧的 webview 内部 plus 被释放)
        return plus.webview.getWebviewById(webview.id)
      },
      eventChannel,
      $page: {
        id: parseInt(webview.id),
        meta: routeOptions.meta,
        path,
        route,
        fullPath: url,
        openType
      },
      $remove () {
        const index = pages.findIndex(page => page === this);
        if (index !== -1) {
          if (!webview.nvue) {
            this.$vm.$destroy();
          }
          pages.splice(index, 1);
          if (process.env.NODE_ENV !== 'production') {
            console.log('[uni-app] removePage(' + path + ')[' + webview.id + ']');
          }
        }
      },
      // 兼容小程序框架
      selectComponent (selector) {
        return this.$vm.selectComponent(selector)
      },
      selectAllComponents (selector) {
        return this.$vm.selectAllComponents(selector)
      }
    };

    pages.push(pageInstance);

    if (webview.__preload__) {
      webview.__page__ = pageInstance;
    }

    // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
    if (isLaunchNVuePage) {
      if (
        __uniConfig.splashscreen &&
        __uniConfig.splashscreen.autoclose &&
        !__uniConfig.splashscreen.alwaysShowBeforeRender
      ) {
        plus.navigator.closeSplashscreen();
      }
      __uniConfig.onReady(function () {
        navigateFinish();
      });
    }

    {
      if (!webview.nvue) {
        const pageId = webview.id;
        try {
          loadPage(route, () => {
            createPage(route, pageId, query, pageInstance).$mount();
          });
        } catch (e) {
          console.error(e);
        }
      }
    }

    return webview
  }

  function _navigateTo ({
    url,
    path,
    query,
    events,
    animationType,
    animationDuration
  }, callbackId) {
    UniServiceJSBridge.emit('onAppRoute', {
      type: 'navigateTo',
      path
    });

    const eventChannel = initEventChannel(events, false);
    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'navigate',
        eventChannel
      }),
      animationType,
      animationDuration,
      () => {
        invoke$1(callbackId, {
          errMsg: 'navigateTo:ok',
          eventChannel
        });
      }
    );
    setStatusBarStyle();
  }

  function navigateTo$1 ({
    url,
    events,
    openType,
    animationType,
    animationDuration
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const routeStyles = __uniRoutes.find(route => route.path === path).window;
    const globalStyle = __uniConfig.window || {};
    if (!animationType) {
      animationType = routeStyles.animationType || globalStyle.animationType || ANI_SHOW;
    }
    if (!animationDuration) {
      animationDuration = routeStyles.animationDuration || globalStyle.animationDuration || ANI_DURATION;
    }
    const query = parseQuery(urls[1] || '');
    navigate(path, function () {
      _navigateTo({
        url,
        path,
        query,
        events,
        animationType,
        animationDuration
      }, callbackId);
    }, openType === 'appLaunch');
  }

  function _reLaunch ({
    url,
    path,
    query
  }, callbackId) {
    const pages = getCurrentPages(true).slice(0);

    const routeOptions = __uniRoutes.find(route => route.path === path);

    if (routeOptions.meta.isTabBar) {
      tabBar$1.switchTab(path.slice(1));
    }

    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'reLaunch'
      }),
      'none',
      0,
      () => {
        pages.forEach(page => {
          page.$remove();
          closeWebview(page.$getAppWebview(), 'none');
        });
        invoke$1(callbackId, {
          errMsg: 'reLaunch:ok'
        });
      }
    );

    setStatusBarStyle();
  }

  function reLaunch$1 ({
    url
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    navigate(path, function () {
      _reLaunch({
        url,
        path,
        query
      }, callbackId);
    });
  }

  function hasLifecycleHook (vueOptions = {}, hook) {
    return Array.isArray(vueOptions[hook]) && vueOptions[hook].length
  }

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

  function _redirectTo ({
    url,
    path,
    query,
    exists
  }, callbackId) {
    const pages = getCurrentPages();
    const len = pages.length - 1;
    if (exists === 'back') {
      const existsPageIndex = findExistsPageIndex(url);
      if (existsPageIndex !== -1) {
        const delta = len - existsPageIndex;
        if (delta > 0) {
          navigateBack$1({
            delta
          });
          invoke$1(callbackId, {
            errMsg: 'redirectTo:ok'
          });
          return
        }
      }
    }

    const lastPage = pages[len];

    lastPage && lastPage.$remove();

    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'redirect'
      }),
      'none',
      0,
      () => {
        if (lastPage) {
          const webview = lastPage.$getAppWebview();
          if (webview.__preload__) {
            removePreloadWebview(webview);
          }
          webview.close('none');
        }
        invoke$1(callbackId, {
          errMsg: 'redirectTo:ok'
        });
      }
    );

    setStatusBarStyle();
  }
  function redirectTo$1 ({
    url,
    exists
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    navigate(path, function () {
      _redirectTo({
        url,
        path,
        query,
        exists
      }, callbackId);
    });
  }

  function _switchTab ({
    url,
    path,
    query,
    from
  }, callbackId) {
    tabBar$1.switchTab(path.slice(1));

    const pages = getCurrentPages();
    const len = pages.length;

    let callOnHide = false;
    let callOnShow = false;

    let currentPage;
    if (len >= 1) { // 前一个页面是非 tabBar 页面
      currentPage = pages[len - 1];
      if (!currentPage.$page.meta.isTabBar) {
        // 前一个页面为非 tabBar 页面时，目标tabBar需要强制触发onShow
        // 该情况下目标页tabBarPage的visible是不对的
        // 除非每次路由跳转都处理一遍tabBarPage的visible，目前仅switchTab会处理
        // 简单起见，暂时直接判断该情况，执行onShow
        callOnShow = true;
        pages.reverse().forEach(page => {
          if (!page.$page.meta.isTabBar && page !== currentPage) {
            page.$remove();
            closeWebview(page.$getAppWebview(), 'none');
          }
        });
        currentPage.$remove();
        // 延迟执行避免iOS应用退出
        setTimeout(() => {
          if (currentPage.$page.openType === 'redirect') {
            closeWebview(currentPage.$getAppWebview(), ANI_CLOSE, ANI_DURATION);
          } else {
            closeWebview(currentPage.$getAppWebview(), 'auto');
          }
        }, 100);
      } else {
        callOnHide = true;
      }
    }

    let tabBarPage;
    // 查找当前 tabBarPage，且设置 visible
    getCurrentPages(true).forEach(page => {
      if (('/' + page.route) === path) {
        if (!page.$page.meta.visible) { // 之前未显示
          callOnShow = true;
        }
        page.$page.meta.visible = true;
        tabBarPage = page;
      } else {
        if (page.$page.meta.isTabBar) {
          page.$page.meta.visible = false;
        }
      }
    });
    // 相同tabBar页面
    if (currentPage === tabBarPage) {
      callOnHide = false;
    }
    if (currentPage && callOnHide) {
      currentPage.$vm.__call_hook('onHide');
    }
    if (tabBarPage) {
      const webview = tabBarPage.$getAppWebview();
      webview.show('none');
      // 等visible状态都切换完之后，再触发onShow，否则开发者在onShow里边 getCurrentPages 会不准确
      if (callOnShow && !webview.__preload__) {
        tabBarPage.$vm.__call_hook('onShow');
      }
    } else {
      return showWebview(registerPage({
        url,
        path,
        query,
        openType: 'switchTab'
      }), 'none', 0, () => {
        setStatusBarStyle();
        invoke$1(callbackId, {
          errMsg: 'switchTab:ok'
        });
      }, 70)
    }

    setStatusBarStyle();
    invoke$1(callbackId, {
      errMsg: 'switchTab:ok'
    });
  }

  function switchTab$1 ({
    url,
    from,
    openType
  }, callbackId) {
    // 直达时，允许 tabBar 带参数
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    navigate(path, function () {
      _switchTab({
        url,
        path,
        query,
        from
      }, callbackId);
    }, openType === 'appLaunch');
  }

  function unPreloadPage$1 ({
    url
  }) {
    const webview = closePreloadWebview({
      url
    });
    if (webview) {
      return {
        id: webview.id,
        url,
        errMsg: 'unPreloadPage:ok'
      }
    }
    return {
      url,
      errMsg: 'unPreloadPage:fail not found'
    }
  }

  function preloadPage$1 ({
    url
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    const webview = preloadWebview$1({
      url,
      path,
      query
    });
    invoke$1(callbackId, {
      id: webview.id,
      url,
      errMsg: 'preloadPage:ok'
    });
  }

  const STORAGE_DATA_TYPE = '__TYPE';
  const STORAGE_KEYS = 'uni-storage-keys';

  function parseValue (value) {
    const types = ['object', 'string', 'number', 'boolean', 'undefined'];
    try {
      const object = typeof value === 'string' ? JSON.parse(value) : value;
      const type = object.type;
      if (types.indexOf(type) >= 0) {
        const keys = Object.keys(object);
        if (keys.length === 2 && 'data' in object) {
          // eslint-disable-next-line valid-typeof
          if (typeof object.data === type) {
            return object.data
          }
          // eslint-disable-next-line no-useless-escape
          if (type === 'object' && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) {
            // ISO 8601 格式返回 Date
            return new Date(object.data)
          }
        } else if (keys.length === 1) {
          return ''
        }
      }
    } catch (error) {}
  }

  function setStorage$1 ({
    key,
    data,
    isSync
  } = {}, callbackId) {
    const type = typeof data;
    const value = type === 'string' ? data : JSON.stringify({
      type,
      data: data
    });
    try {
      if (type === 'string' && parseValue(value) !== undefined) {
        plus.storage.setItemAsync(key + STORAGE_DATA_TYPE, type);
      } else {
        plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE);
      }
      plus.storage.setItemAsync(key, value, function () {
        invoke$1(callbackId, {
          errMsg: 'setStorage:ok'
        });
      }, function (err) {
        invoke$1(callbackId, {
          errMsg: `setStorage:fail ${err.message}`
        });
      });
    } catch (error) {
      invoke$1(callbackId, {
        errMsg: `setStorage:fail ${error}`
      });
    }
  }

  function setStorageSync$1 (key, data) {
    const type = typeof data;
    const value = type === 'string' ? data : JSON.stringify({
      type,
      data: data
    });
    try {
      if (type === 'string' && parseValue(value) !== undefined) {
        plus.storage.setItem(key + STORAGE_DATA_TYPE, type);
      } else {
        plus.storage.removeItem(key + STORAGE_DATA_TYPE);
      }
      plus.storage.setItem(key, value);
    } catch (error) {

    }
  }

  function parseGetStorage (type, value) {
    let data = value;
    if (type !== 'string' || (type === 'string' && value === '{"type":"undefined"}')) {
      try {
        // 兼容H5和V3初期历史格式
        let object = JSON.parse(value);
        const result = parseValue(object);
        if (result !== undefined) {
          data = result;
        } else if (type) {
          // 兼容App端历史格式
          data = object;
          if (typeof object === 'string') {
            object = JSON.parse(object);
            const objectType = typeof object;
            if (objectType === 'number' && type === 'date') {
              data = new Date(object);
            } else if (objectType === (['null', 'array'].indexOf(type) < 0 ? type : 'object')) {
              data = object;
            }
          }
        }
      } catch (error) {}
    }
    return data
  }

  function getStorage$1 ({
    key
  } = {}, callbackId) {
    plus.storage.getItemAsync(key, function (res) {
      plus.storage.getItemAsync(key + STORAGE_DATA_TYPE, function (typeRes) {
        const typeOrigin = typeRes.data || '';
        const type = typeOrigin.toLowerCase();
        invoke$1(callbackId, {
          data: parseGetStorage(type, res.data),
          errMsg: 'getStorage:ok'
        });
      }, function () {
        const type = '';
        invoke$1(callbackId, {
          data: parseGetStorage(type, res.data),
          errMsg: 'getStorage:ok'
        });
      });
    }, function (err) {
      invoke$1(callbackId, {
        data: '',
        errMsg: `getStorage:fail ${err.message}`
      });
    });
  }

  function getStorageSync$1 (key) {
    const value = plus.storage.getItem(key);
    const typeOrigin = plus.storage.getItem(key + STORAGE_DATA_TYPE) || '';
    const type = typeOrigin.toLowerCase();
    if (typeof value !== 'string') {
      return ''
    }
    return parseGetStorage(type, value)
  }

  function removeStorage$1 ({
    key
  } = {}, callbackId) {
    // 兼容App端历史格式
    plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE);
    plus.storage.removeItemAsync(key, function (res) {
      invoke$1(callbackId, {
        errMsg: 'removeStorage:ok'
      });
    }, function (err) {
      invoke$1(callbackId, {
        errMsg: `removeStorage:fail ${err.message}`
      });
    });
  }

  function removeStorageSync$1 (key) {
    plus.storage.removeItem(key + STORAGE_DATA_TYPE);
    plus.storage.removeItem(key);
  }

  function clearStorage (args, callbackId) {
    plus.storage.clearAsync(function (res) {
      invoke$1(callbackId, {
        errMsg: 'clearStorage:ok'
      });
    }, function (err) {
      invoke$1(callbackId, {
        errMsg: `clearStorage:fail ${err.message}`
      });
    });
  }

  function clearStorageSync () {
    plus.storage.clear();
  }

  function getStorageInfo () {
    const length = (plus.storage.length || plus.storage.getLength()) || 0;
    const keys = [];
    let currentSize = 0;
    for (let index = 0; index < length; index++) {
      const key = plus.storage.key(index);
      if (key !== STORAGE_KEYS && (key.indexOf(STORAGE_DATA_TYPE) < 0 || key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !== key.length)) {
        const value = plus.storage.getItem(key);
        currentSize += key.length + value.length;
        keys.push(key);
      }
    }
    return {
      keys,
      currentSize: Math.ceil(currentSize * 2 / 1024),
      limitSize: Number.MAX_VALUE,
      errMsg: 'getStorageInfo:ok'
    }
  }

  function getStorageInfoSync () {
    const res = getStorageInfo();
    delete res.errMsg;
    return res
  }

  function showKeyboard () {
    plus.key.showSoftKeybord();
    return {
      errMsg: 'showKeyboard:ok'
    }
  }

  function hideKeyboard () {
    plus.key.hideSoftKeybord();
    return {
      errMsg: 'hideKeyboard:ok'
    }
  }

  function setNavigationBarTitle$1 ({
    __page__,
    title = ''
  } = {}) {
    const webview = getWebview(__page__);
    if (webview) {
      const style = webview.getStyle();
      if (style && style.titleNView) {
        webview.setStyle({
          titleNView: {
            titleText: title
          }
        });
      }
      return {
        errMsg: 'setNavigationBarTitle:ok'
      }
    }
    return {
      errMsg: 'setNavigationBarTitle:fail'
    }
  }

  function showNavigationBarLoading () {
    plus.nativeUI.showWaiting('', {
      modal: false
    });
    return {
      errMsg: 'showNavigationBarLoading:ok'
    }
  }

  function hideNavigationBarLoading () {
    plus.nativeUI.closeWaiting();
    return {
      errMsg: 'hideNavigationBarLoading:ok'
    }
  }

  function setPageMeta (statusBarStyle) {
    const pages = getCurrentPages();
    if (!pages.length) {
      return
    }
    // 框架内部页面跳转会从这里获取style配置
    pages[pages.length - 1].$page.meta.statusBarStyle = statusBarStyle;
  }

  function setNavigationBarColor$1 ({
    __page__,
    frontColor,
    backgroundColor
  } = {}) {
    const webview = getWebview(__page__);
    if (webview) {
      const styles = {};
      if (frontColor) {
        styles.titleColor = frontColor;
      }
      if (backgroundColor) {
        styles.backgroundColor = backgroundColor;
      }
      const statusBarStyle = frontColor === '#000000' ? 'dark' : 'light';
      plus.navigator.setStatusBarStyle(statusBarStyle);

      // 用户调用api时同时改变当前页配置，这样在系统调用设置时，可以避免覆盖用户设置
      setPageMeta(statusBarStyle);

      const style = webview.getStyle();
      if (style && style.titleNView) {
        if (style.titleNView.autoBackButton) {
          styles.backButton = styles.backButton || {};
          styles.backButton.color = frontColor;
        }
        webview.setStyle({
          titleNView: styles
        });
      }
      return {
        errMsg: 'setNavigationBarColor:ok'
      }
    }
    return {
      errMsg: 'setNavigationBarColor:fail'
    }
  }

  let toast;
  let toastType;
  let timeout;

  function showLoading$1 (args) {
    return callApiSync(showToast$1, Object.assign({}, args, {
      type: 'loading'
    }), 'showToast', 'showLoading')
  }

  function hideLoading () {
    return callApiSync(hide, 'loading', 'hide', 'hideLoading')
  }

  function showToast$1 ({
    title = '',
    icon = 'success',
    image = '',
    duration = 1500,
    mask = false,
    position = '',
    type = 'toast',
    style
  } = {}) {
    hide(null);
    toastType = type;
    if (['top', 'center', 'bottom'].includes(position)) {
      // 仅可以关闭 richtext 类型，但 iOS 部分情况换行显示有问题
      plus.nativeUI.toast(title, {
        verticalAlign: position
      });
      toast = true;
    } else {
      if (icon && !~['success', 'loading', 'error', 'none'].indexOf(icon)) {
        icon = 'success';
      }
      const waitingOptions = {
        modal: mask,
        back: 'transmit',
        padding: '10px',
        size: '16px' // 固定字体大小
      };
      if (!image && (!icon || icon === 'none')) { // 无图
        //       waitingOptions.width = '120px'
        //       waitingOptions.height = '40px'
        waitingOptions.loading = {
          display: 'none'
        };
      } else { // 有图
        waitingOptions.width = '140px';
        waitingOptions.height = '112px';
      }
      if (image) {
        waitingOptions.loading = {
          display: 'block',
          height: '55px',
          icon: image,
          interval: duration
        };
      } else {
        if (['success', 'error'].indexOf(icon) !== -1) {
          waitingOptions.loading = {
            display: 'block',
            height: '55px',
            icon: icon === 'success' ? '__uniappsuccess.png' : '__uniapperror.png',
            interval: duration
          };
        }
      }

      toast = plus.nativeUI.showWaiting(title, Object.assign(waitingOptions, style));
    }

    timeout = setTimeout(() => {
      hide(null);
    }, duration);
    return {
      errMsg: 'showToast:ok'
    }
  }

  function hideToast () {
    return callApiSync(hide, 'toast', 'hide', 'hideToast')
  }

  function hide (type = 'toast') {
    if (type && type !== toastType) {
      return
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (toast === true) {
      plus.nativeUI.closeToast();
    } else if (toast && toast.close) {
      toast.close();
    }
    toast = null;
    toastType = null;
    return {
      errMsg: 'hide:ok'
    }
  }
  function showModal$1 ({
    title = '',
    content = '',
    showCancel = true,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    editable = false,
    placeholderText	= ''
  } = {}, callbackId) {
    const buttons = showCancel ? [cancelText, confirmText] : [confirmText];
    const tip = editable ? placeholderText : buttons;

    content = content || ' ';
    plus.nativeUI[editable ? 'prompt' : 'confirm'](content, (e) => {
      if (showCancel) {
        const isConfirm = e.index === 1;
        const res = {
          errMsg: 'showModal:ok',
          confirm: isConfirm,
          cancel: e.index === 0 || e.index === -1
        };
        isConfirm && editable && (res.content = e.value);
        invoke$1(callbackId, res);
      } else {
        const res = {
          errMsg: 'showModal:ok',
          confirm: e.index === 0,
          cancel: false
        };
        editable && (res.content = e.value);
        invoke$1(callbackId, res);
      }
    }, title, tip, buttons);
  }
  function showActionSheet$1 ({
    itemList = [],
    itemColor = '#000000',
    title = '',
    popover
  }, callbackId) {
    const options = {
      buttons: itemList.map(item => ({
        title: item,
        color: itemColor
      }))
    };
    if (title) {
      options.title = title;
    }

    options.cancel = t('uni.showActionSheet.cancel');

    plus.nativeUI.actionSheet(Object.assign(options, {
      popover
    }), (e) => {
      if (e.index > 0) {
        invoke$1(callbackId, {
          errMsg: 'showActionSheet:ok',
          tapIndex: e.index - 1
        });
      } else {
        invoke$1(callbackId, {
          errMsg: 'showActionSheet:fail cancel'
        });
      }
    });
  }

  let webview$3;

  function setPullDownRefreshPageId (pullDownRefreshWebview) {
    if (typeof pullDownRefreshWebview === 'number') {
      webview$3 = plus.webview.getWebviewById(String(pullDownRefreshWebview));
    } else {
      webview$3 = pullDownRefreshWebview;
    }
  }

  function startPullDownRefresh () {
    if (webview$3) {
      webview$3.endPullToRefresh();
    }
    webview$3 = getLastWebview();
    if (webview$3) {
      webview$3.beginPullToRefresh();
      return {
        errMsg: 'startPullDownRefresh:ok'
      }
    }
    return {
      errMsg: 'startPullDownRefresh:fail'
    }
  }

  function stopPullDownRefresh () {
    if (!webview$3) {
      webview$3 = getLastWebview();
    }
    if (webview$3) {
      webview$3.endPullToRefresh();
      webview$3 = null;
      return {
        errMsg: 'stopPullDownRefresh:ok'
      }
    }
    return {
      errMsg: 'stopPullDownRefresh:fail'
    }
  }

  function setTabBarBadge$2 ({
    index,
    text,
    type = 'text'
  }) {
    tabBar$1.setTabBarBadge(type, index, text);
    return {
      errMsg: 'setTabBarBadge:ok'
    }
  }

  function setTabBarItem$2 ({
    index,
    text,
    iconPath,
    selectedIconPath,
    pagePath,
    visible,
    iconfont
  }) {
    tabBar$1.setTabBarItem(index, text, iconPath, selectedIconPath, visible, iconfont);
    const route = pagePath && __uniRoutes.find(({ path }) => path === pagePath);
    if (route) {
      const meta = route.meta;
      meta.isTabBar = true;
      meta.tabBarIndex = index;
      meta.isQuit = true;
      const tabBar = __uniConfig.tabBar;
      if (tabBar && tabBar.list && tabBar.list[index]) {
        tabBar.list[index].pagePath = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;
      }
    }
    return {
      errMsg: 'setTabBarItem:ok'
    }
  }

  function setTabBarStyle$2 (style = {}) {
    if (!isTabBarPage()) {
      return {
        errMsg: 'setTabBarStyle:fail not TabBar page'
      }
    }
    const borderStyles = {
      black: 'rgba(0,0,0,0.4)',
      white: 'rgba(255,255,255,0.4)'
    };
    const borderStyle = style.borderStyle;
    if (borderStyle in borderStyles) {
      style.borderStyle = borderStyles[borderStyle];
    }
    tabBar$1.setTabBarStyle(style);
    return {
      errMsg: 'setTabBarStyle:ok'
    }
  }

  function hideTabBar$2 ({
    animation
  }) {
    if (!isTabBarPage()) {
      return {
        errMsg: 'hideTabBar:fail not TabBar page'
      }
    }
    tabBar$1.hideTabBar(animation);
    return {
      errMsg: 'hideTabBar:ok'
    }
  }

  function showTabBar$2 ({
    animation
  }) {
    if (!isTabBarPage()) {
      return {
        errMsg: 'showTabBar:fail not TabBar page'
      }
    }
    tabBar$1.showTabBar(animation);
    return {
      errMsg: 'showTabBar:ok'
    }
  }

  const callbacks$4 = {};

  function createCallbacks (namespace) {
    let scopedCallbacks = callbacks$4[namespace];
    if (!scopedCallbacks) {
      scopedCallbacks = {
        id: 1,
        callbacks: Object.create(null)
      };
      callbacks$4[namespace] = scopedCallbacks;
    }
    return {
      get (id) {
        return scopedCallbacks.callbacks[id]
      },
      pop (id) {
        const callback = scopedCallbacks.callbacks[id];
        if (callback) {
          delete scopedCallbacks.callbacks[id];
        }
        return callback
      },
      push (callback) {
        const id = scopedCallbacks.id++;
        scopedCallbacks.callbacks[id] = callback;
        return id
      }
    }
  }

  function checkInWindows (vm) {
    {
      return false
    }
  }

  const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo');

  function requestComponentInfo (pageVm, queue, callback) {
    UniServiceJSBridge.publishHandler('requestComponentInfo', {
      reqId: requestComponentInfoCallbacks.push(callback),
      reqs: queue
    }, checkInWindows() ? pageVm : pageVm.$page.id);
  }

  function parseDataset (attr) {
    const dataset = {};

    Object.keys(attr || {}).forEach(key => {
      if (key.indexOf('data') === 0) {
        let str = key.replace('data', '');
        str = str.charAt(0).toLowerCase() + str.slice(1);
        dataset[str] = attr[key];
      }
    });

    return dataset
  }

  function findAttrs (ids, elm, result) {
    const nodes = elm.children;
    if (!Array.isArray(nodes)) {
      return false
    }
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.attr) {
        const index = ids.indexOf(node.attr.id);
        if (index >= 0) {
          result[index] = {
            id: ids[index],
            ref: node.ref,
            dataset: parseDataset(node.attr)
          };
          if (ids.length === 1) {
            break
          }
        }
      }
      if (node.children) {
        findAttrs(ids, node, result);
      }
    }
  }

  function getSelectors (queue) {
    const ids = [];
    for (let i = 0; i < queue.length; i++) {
      const selector = queue[i].selector;
      if (selector.indexOf('#') === 0) {
        ids.push(selector.substring(1));
      }
    }
    return ids
  }

  function getComponentRectAll (dom, attrs, index, result, callback) {
    const attr = attrs[index];
    dom.getComponentRect(attr.ref, option => {
      option.size.id = attr.id;
      option.size.dataset = attr.dataset;
      result.push(option.size);
      index += 1;
      if (index < attrs.length) {
        getComponentRectAll(dom, attrs, index, result, callback);
      } else {
        callback(result);
      }
    });
  }

  function requestComponentInfo$1 (pageVm, queue, callback) {
    // TODO 重构，逻辑不对，queue 里的每一项可能有单独的作用域查找（即 component）
    const dom = pageVm._$weex.requireModule('dom');
    const selectors = getSelectors(queue);
    const outAttrs = new Array(selectors.length);
    findAttrs(selectors, pageVm.$el, outAttrs);
    getComponentRectAll(dom, outAttrs, 0, [], (result) => {
      callback(result);
    });
  }

  function requestComponentInfo$2 (pageVm, queue, callback) {
    pageVm.$page.meta.isNVue
      ? requestComponentInfo$1(pageVm, queue, callback)
      : requestComponentInfo(pageVm, queue, callback);
  }

  function operateAdView (pageId, id, type, data) {
    UniServiceJSBridge.publishHandler(id, {
      type,
      data
    }, pageId);
  }

  UniServiceJSBridge.subscribe('onAdMethodCallback', ({
    callbackId,
    data
  }, pageId) => {
    getAdData(data, (res) => {
      operateAdView(pageId, callbackId, 'success', res);
    }, (err) => {
      operateAdView(pageId, callbackId, 'fail', err);
    });
  });

  const _adDataCache = {};

  function getAdData (data, onsuccess, onerror) {
    const { adpid, width } = data;
    const key = adpid + '-' + width;
    const adDataList = _adDataCache[key];
    if (adDataList && adDataList.length > 0) {
      onsuccess(adDataList.splice(0, 1)[0]);
      return
    }

    plus.ad.getAds(
      data,
      (res) => {
        const list = res.ads;
        onsuccess(list.splice(0, 1)[0]);
        _adDataCache[key] = adDataList ? adDataList.concat(list) : list;
      },
      (err) => {
        onerror({
          errCode: err.code,
          errMsg: err.message
        });
      }
    );
  }

  const eventNames = [
    'load',
    'close',
    'verify',
    'error',
    'adClicked'
  ];

  const ERROR_CODE_LIST = [-5001, -5002, -5003, -5004, -5005, -5006];
  const EXPIRED_TIME = 1000 * 60 * 30;
  const EXPIRED_TEXT = { code: -5008, errMsg: '广告数据已过期，请重新加载' };
  const ProviderType = { CSJ: 'csj', GDT: 'gdt' };

  class RewardedVideoAd {
    constructor (options = {}) {
      const _callbacks = this._callbacks = {};
      eventNames.forEach(item => {
        _callbacks[item] = [];
        const name = item[0].toUpperCase() + item.substr(1);
        this[`on${name}`] = function (callback) {
          _callbacks[item].push(callback);
        };
      });

      this._preload = options.preload !== undefined ? options.preload : true;
      this._isLoad = false;
      this._isLoading = false;
      this._adError = '';
      this._loadPromiseResolve = null;
      this._loadPromiseReject = null;
      this._lastLoadTime = 0;

      const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(options);
      rewardAd.onLoad((e) => {
        this._isLoad = true;
        this._isLoading = false;
        this._lastLoadTime = Date.now();
        this._dispatchEvent('load', {});

        if (this._loadPromiseResolve != null) {
          this._loadPromiseResolve();
          this._loadPromiseResolve = null;
        }
      });
      rewardAd.onClose((e) => {
        this._isLoad = false;
        this._isLoading = false;
        if (this._preload) {
          this._loadAd();
        }
        this._dispatchEvent('close', { isEnded: e.isEnded });
      });
      rewardAd.onVerify && rewardAd.onVerify((e) => {
        this._dispatchEvent('verify', { isValid: e.isValid });
      });
      rewardAd.onError((e) => {
        this._isLoading = false;
        const { code, message } = e;
        const data = { code: code, errMsg: message };
        this._adError = message;
        if (code === -5008) {
          this._isLoad = false;
        }
        this._dispatchEvent('error', data);
        // TODO
        if ((code === -5005 || ERROR_CODE_LIST.index(code) === -1) && this._loadPromiseReject != null) {
          this._loadPromiseReject(data);
          this._loadPromiseReject = null;
        }
      });
      rewardAd.onAdClicked((e) => {
        this._dispatchEvent('adClicked', {});
      });

      this._loadAd();
    }

    get isExpired () {
      return (this._lastLoadTime !== 0 && (Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME))
    }

    load () {
      return new Promise((resolve, reject) => {
        this._loadPromiseResolve = resolve;
        this._loadPromiseReject = reject;
        if (this._isLoading) {
          return
        }
        if (this._isLoad) {
          resolve();
          return
        }
        this._loadAd();
      })
    }

    show () {
      return new Promise((resolve, reject) => {
        if (this._isLoading) {
          return
        }

        const provider = this.getProvider();
        if (provider === ProviderType.CSJ && this.isExpired) {
          this._isLoad = false;
          // TODO
          this._dispatchEvent('error', EXPIRED_TEXT);
          reject(new Error(EXPIRED_TEXT.errMsg));
          return
        }

        if (this._isLoad) {
          this._rewardAd.show();
          resolve();
        } else {
          reject(new Error(this._adError));
        }
      })
    }

    getProvider () {
      return this._rewardAd.getProvider()
    }

    destroy () {
      this._rewardAd.destroy();
    }

    _loadAd () {
      this._isLoad = false;
      this._isLoading = true;
      this._rewardAd.load();
    }

    _dispatchEvent (name, data) {
      this._callbacks[name].forEach(callback => {
        if (typeof callback === 'function') {
          callback(data || {});
        }
      });
    }
  }

  function createRewardedVideoAd (options) {
    return new RewardedVideoAd(options)
  }

  const eventTypes = {
    load: 'load',
    close: 'close',
    error: 'error',
    adClicked: 'adClicked'
  };

  const eventNames$1 = [
    eventTypes.load,
    eventTypes.close,
    eventTypes.error,
    eventTypes.adClicked
  ];

  class AdBase {
    constructor (adInstance, options) {
      const _callbacks = this._callbacks = {};
      eventNames$1.forEach(item => {
        _callbacks[item] = [];
        const name = item[0].toUpperCase() + item.substr(1);
        this[`on${name}`] = function (callback) {
          _callbacks[item].push(callback);
        };
      });

      this._preload = options.preload !== undefined ? options.preload : false;

      this._isLoaded = false;
      this._isLoading = false;
      this._adError = '';
      this._loadPromiseResolve = null;
      this._loadPromiseReject = null;
      this._showPromiseResolve = null;
      this._showPromiseReject = null;

      const ad = this._ad = adInstance;
      ad.onLoad((e) => {
        this._isLoaded = true;
        this._isLoading = false;

        if (this._loadPromiseResolve != null) {
          this._loadPromiseResolve();
          this._loadPromiseResolve = null;
        }
        if (this._showPromiseResolve != null) {
          this._showPromiseResolve();
          this._showPromiseResolve = null;
          this._showAd();
        }

        this._dispatchEvent(eventTypes.load, {});
      });
      ad.onClose((e) => {
        this._isLoaded = false;
        this._isLoading = false;
        this._dispatchEvent(eventTypes.close, { isEnded: e.isEnded });

        if (this._preload === true) {
          this._loadAd();
        }
      });
      ad.onError((e) => {
        this._isLoading = false;

        const data = {
          code: e.code,
          errMsg: e.message
        };

        this._adError = data;

        this._dispatchEvent(eventTypes.error, data);

        const error = new Error(JSON.stringify(this._adError));
        error.code = e.code;
        error.errMsg = e.message;

        if (this._loadPromiseReject != null) {
          this._loadPromiseReject(error);
          this._loadPromiseReject = null;
        }

        if (this._showPromiseReject != null) {
          this._showPromiseReject(error);
          this._showPromiseReject = null;
        }
      });
      ad.onAdClicked && ad.onAdClicked((e) => {
        this._dispatchEvent(eventTypes.adClicked, {});
      });
    }

    load () {
      return new Promise((resolve, reject) => {
        this._loadPromiseResolve = resolve;
        this._loadPromiseReject = reject;
        if (this._isLoading) {
          return
        }

        if (this._isLoaded) {
          resolve();
        } else {
          this._loadAd();
        }
      })
    }

    show () {
      return new Promise((resolve, reject) => {
        this._showPromiseResolve = resolve;
        this._showPromiseReject = reject;

        if (this._isLoading) {
          return
        }

        if (this._isLoaded) {
          this._showAd();
          resolve();
        } else {
          this._loadAd();
        }
      })
    }

    destroy () {
      this._ad.destroy();
    }

    getProvider () {
      return this._ad.getProvider()
    }

    _loadAd () {
      this._adError = '';
      this._isLoaded = false;
      this._isLoading = true;
      this._ad.load();
    }

    _showAd () {
      this._ad.show();
    }

    _dispatchEvent (name, data) {
      this._callbacks[name].forEach(callback => {
        if (typeof callback === 'function') {
          callback(data || {});
        }
      });
    }
  }

  class FullScreenVideoAd extends AdBase {
    constructor (options = {}) {
      super(plus.ad.createFullScreenVideoAd(options), options);
    }
  }

  function createFullScreenVideoAd (options) {
    return new FullScreenVideoAd(options)
  }

  class InterstitialAd extends AdBase {
    constructor (options = {}) {
      super(plus.ad.createInterstitialAd(options), options);

      this._loadAd();
    }
  }

  function createInterstitialAd (options) {
    return new InterstitialAd(options)
  }

  const sdkCache = {};
  const sdkQueue = {};

  function initSDK (options) {
    const provider = options.provider;
    if (!sdkCache[provider]) {
      sdkCache[provider] = {};
    }
    if (typeof sdkCache[provider].instance === 'object') {
      options.success(sdkCache[provider].instance);
      return
    }

    if (!sdkQueue[provider]) {
      sdkQueue[provider] = [];
    }
    sdkQueue[provider].push(options);

    if (sdkCache[provider].loading === true) {
      options.__plugin = sdkCache[provider].plugin;
      return
    }
    sdkCache[provider].loading = true;
    const plugin = requireNativePlugin(provider) || {};
    const initFunction = plugin.init || plugin.initSDK;
    if (!initFunction) {
      sdkQueue[provider].forEach((item) => {
        item.fail({
          code: -1,
          message: 'provider [' + provider + '] invalid'
        });
      });
      sdkQueue[provider].length = 0;
      sdkCache[provider].loading = false;
      return
    }
    sdkCache[provider].plugin = plugin;
    options.__plugin = plugin;
    initFunction((res) => {
      const code = res.code;
      const isSuccess = (provider === 'BXM-AD') ? (code === 0 || code === 1) : (code === 0);
      if (isSuccess) {
        sdkCache[provider].instance = plugin;
      } else {
        sdkCache[provider].loading = false;
      }

      sdkQueue[provider].forEach((item) => {
        if (isSuccess) {
          item.success(item.__plugin);
        } else {
          item.fail(res);
        }
      });
      sdkQueue[provider].length = 0;
    });
  }

  class InteractiveAd {
    constructor (options) {
      const _callbacks = this._callbacks = {};
      eventNames$1.forEach(item => {
        _callbacks[item] = [];
        const name = item[0].toUpperCase() + item.substr(1);
        this[`on${name}`] = function (callback) {
          _callbacks[item].push(callback);
        };
      });

      this._ad = null;
      this._adError = '';
      this._adpid = options.adpid;
      this._provider = options.provider;
      this._userData = options.userData || {};
      this._isLoaded = false;
      this._isLoading = false;
      this._loadPromiseResolve = null;
      this._loadPromiseReject = null;
      this._showPromiseResolve = null;
      this._showPromiseReject = null;

      setTimeout(() => {
        this._init();
      });
    }

    _init () {
      this._adError = '';
      initSDK({
        provider: this._provider,
        success: (res) => {
          this._ad = res;
          if (this._userData) {
            this.bindUserData(this._userData);
          }
          this._loadAd();
        },
        fail: (err) => {
          this._adError = err;
          this._dispatchEvent(eventTypes.error, err);
        }
      });
    }

    getProvider () {
      return this._provider
    }

    load () {
      return new Promise((resolve, reject) => {
        this._loadPromiseResolve = resolve;
        this._loadPromiseReject = reject;
        if (this._isLoading) {
          return
        }

        if (this._adError) {
          this._init();
          return
        }

        if (this._isLoaded) {
          resolve();
        } else {
          this._loadAd();
        }
      })
    }

    show () {
      return new Promise((resolve, reject) => {
        this._showPromiseResolve = resolve;
        this._showPromiseReject = reject;

        if (this._isLoading) {
          return
        }

        if (this._adError) {
          this._init();
          return
        }

        if (this._isLoaded) {
          this._showAd();
          resolve();
        } else {
          this._loadAd();
        }
      })
    }

    destroy () {
      if (this._ad !== null && this._ad.destroy) {
        this._ad.destroy({
          adpid: this._adpid
        });
      }
    }

    bindUserData (data) {
      if (this._ad !== null && this._ad.bindUserData) {
        this._ad.bindUserData(data);
      }
    }

    _loadAd () {
      if (this._ad !== null) {
        if (this._isLoading === true) {
          return
        }
        this._isLoading = true;

        this._ad.loadData({
          adpid: this._adpid,
          ...this._userData
        }, (res) => {
          this._isLoaded = true;
          this._isLoading = false;

          if (this._loadPromiseResolve != null) {
            this._loadPromiseResolve();
            this._loadPromiseResolve = null;
          }
          if (this._showPromiseResolve != null) {
            this._showPromiseResolve();
            this._showPromiseResolve = null;
            this._showAd();
          }

          this._dispatchEvent(eventTypes.load, res);
        }, (err) => {
          this._isLoading = false;

          if (this._showPromiseReject != null) {
            this._showPromiseReject(this._createError(err));
            this._showPromiseReject = null;
          }

          this._dispatchEvent(eventTypes.error, err);
        });
      }
    }

    _showAd () {
      if (this._ad !== null && this._isLoaded === true) {
        this._ad.show({
          adpid: this._adpid
        }, (res) => {
          this._isLoaded = false;
        }, (err) => {
          this._isLoaded = false;

          if (this._showPromiseReject != null) {
            this._showPromiseReject(this._createError(err));
            this._showPromiseReject = null;
          }

          this._dispatchEvent(eventTypes.error, err);
        });
      }
    }

    _createError (err) {
      const error = new Error(JSON.stringify(err));
      error.code = err.code;
      error.errMsg = err.message;
      return error
    }

    _dispatchEvent (name, data) {
      this._callbacks[name].forEach(callback => {
        if (typeof callback === 'function') {
          callback(data || {});
        }
      });
    }
  }

  function createInteractiveAd (options) {
    if (!options.provider) {
      return new Error('provider invalid')
    }
    if (!options.adpid) {
      return new Error('adpid invalid')
    }
    return new InteractiveAd(options)
  }

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    startPullDownRefresh: startPullDownRefresh,
    stopPullDownRefresh: stopPullDownRefresh,
    $on: $on$1,
    $off: $off$1,
    $once: $once$1,
    $emit: $emit$1,
    createAudioInstance: createAudioInstance,
    destroyAudioInstance: destroyAudioInstance,
    setAudioState: setAudioState,
    getAudioState: getAudioState,
    operateAudio: operateAudio,
    getMusicPlayerState: getMusicPlayerState,
    operateMusicPlayer: operateMusicPlayer,
    setBackgroundAudioState: setBackgroundAudioState,
    operateBackgroundAudio: operateBackgroundAudio,
    getBackgroundAudioState: getBackgroundAudioState,
    operateMapPlayer: operateMapPlayer$2,
    operateVideoPlayer: operateVideoPlayer$2,
    LivePusherContext: LivePusherContext$1,
    createLivePusherContext: createLivePusherContext$1,
    startAccelerometer: startAccelerometer,
    stopAccelerometer: stopAccelerometer,
    onAccelerometerChange: onAccelerometerChange,
    offAccelerometerChange: offAccelerometerChange,
    addPhoneContact: addPhoneContact$1,
    onBluetoothDeviceFound: onBluetoothDeviceFound,
    onBluetoothAdapterStateChange: onBluetoothAdapterStateChange,
    onBLEConnectionStateChange: onBLEConnectionStateChange,
    onBLECharacteristicValueChange: onBLECharacteristicValueChange,
    openBluetoothAdapter: openBluetoothAdapter,
    closeBluetoothAdapter: closeBluetoothAdapter,
    getBluetoothAdapterState: getBluetoothAdapterState,
    startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
    stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
    getBluetoothDevices: getBluetoothDevices,
    getConnectedBluetoothDevices: getConnectedBluetoothDevices,
    createBLEConnection: createBLEConnection,
    closeBLEConnection: closeBLEConnection,
    getBLEDeviceServices: getBLEDeviceServices,
    getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
    notifyBLECharacteristicValueChange: notifyBLECharacteristicValueChange,
    readBLECharacteristicValue: readBLECharacteristicValue,
    writeBLECharacteristicValue: writeBLECharacteristicValue,
    setBLEMTU: setBLEMTU,
    getBLEDeviceRSSI: getBLEDeviceRSSI,
    getScreenBrightness: getScreenBrightness,
    setScreenBrightness: setScreenBrightness,
    setKeepScreenOn: setKeepScreenOn,
    getClipboardData: getClipboardData,
    setClipboardData: setClipboardData$1,
    startCompass: startCompass,
    stopCompass: stopCompass,
    onCompassChange: onCompassChange,
    offCompassChange: offCompassChange,
    getNetworkType: getNetworkType,
    onBeaconUpdate: onBeaconUpdate,
    onBeaconServiceChange: onBeaconServiceChange,
    getBeacons: getBeacons,
    startBeaconDiscovery: startBeaconDiscovery,
    stopBeaconDiscovery: stopBeaconDiscovery,
    makePhoneCall: makePhoneCall$1,
    scanCode: scanCode$3,
    checkIsSupportSoterAuthentication: checkIsSupportSoterAuthentication,
    checkIsSoterEnrolledInDevice: checkIsSoterEnrolledInDevice,
    startSoterAuthentication: startSoterAuthentication,
    getSystemInfoSync: getSystemInfoSync,
    getSystemInfo: getSystemInfo,
    vibrateLong: vibrateLong,
    vibrateShort: vibrateShort,
    saveFile: saveFile$1,
    getSavedFileList: getSavedFileList,
    getFileInfo: getFileInfo$1,
    getSavedFileInfo: getSavedFileInfo$1,
    removeSavedFile: removeSavedFile$1,
    openDocument: openDocument$1,
    chooseLocation: chooseLocation$3,
    getLocation: getLocation$1,
    openLocation: openLocation$3,
    startRecord: startRecord,
    stopRecord: stopRecord,
    playVoice: playVoice,
    pauseVoice: pauseVoice,
    stopVoice: stopVoice,
    chooseImage: chooseImage$1,
    chooseVideo: chooseVideo$1,
    compressImage: compressImage$1,
    compressVideo: compressVideo$1,
    getImageInfo: getImageInfo$1,
    getVideoInfo: getVideoInfo$1,
    previewImagePlus: previewImagePlus,
    closePreviewImagePlus: closePreviewImagePlus,
    operateRecorder: operateRecorder,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum$1,
    saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
    operateDownloadTask: operateDownloadTask,
    createDownloadTask: createDownloadTask,
    createRequestTaskById: createRequestTaskById,
    createRequestTask: createRequestTask,
    operateRequestTask: operateRequestTask,
    configMTLS: configMTLS$1,
    createSocketTask: createSocketTask,
    operateSocketTask: operateSocketTask,
    operateUploadTask: operateUploadTask,
    createUploadTask: createUploadTask,
    getProvider: getProvider$1,
    login: login,
    getUserInfo: getUserInfo,
    getUserProfile: getUserProfile,
    operateWXData: operateWXData,
    preLogin: preLogin$1,
    closeAuthView: closeAuthView,
    getCheckBoxState: getCheckBoxState,
    getUniverifyManager: getUniverifyManager,
    requestPayment: requestPayment,
    subscribePush: subscribePush,
    unsubscribePush: unsubscribePush,
    onPush: onPush,
    offPush: offPush,
    requireNativePlugin: requireNativePlugin$1,
    shareAppMessageDirectly: shareAppMessageDirectly,
    share: share,
    shareWithSystem: shareWithSystem,
    restoreGlobal: restoreGlobal,
    requireGlobal: requireGlobal,
    getSubNVueById: getSubNVueById,
    getCurrentSubNVue: getCurrentSubNVue,
    onHostEventReceive: onHostEventReceive,
    onNativeEventReceive: onNativeEventReceive,
    sendNativeEvent: sendNativeEvent,
    loadSubPackage: loadSubPackage$2,
    sendHostEvent: sendHostEvent,
    navigateToMiniProgram: navigateToMiniProgram,
    navigateBack: navigateBack$1,
    navigateTo: navigateTo$1,
    reLaunch: reLaunch$1,
    redirectTo: redirectTo$1,
    switchTab: switchTab$1,
    unPreloadPage: unPreloadPage$1,
    preloadPage: preloadPage$1,
    setStorage: setStorage$1,
    setStorageSync: setStorageSync$1,
    getStorage: getStorage$1,
    getStorageSync: getStorageSync$1,
    removeStorage: removeStorage$1,
    removeStorageSync: removeStorageSync$1,
    clearStorage: clearStorage,
    clearStorageSync: clearStorageSync,
    getStorageInfo: getStorageInfo,
    getStorageInfoSync: getStorageInfoSync,
    showKeyboard: showKeyboard,
    hideKeyboard: hideKeyboard,
    setNavigationBarTitle: setNavigationBarTitle$1,
    showNavigationBarLoading: showNavigationBarLoading,
    hideNavigationBarLoading: hideNavigationBarLoading,
    setNavigationBarColor: setNavigationBarColor$1,
    showLoading: showLoading$1,
    hideLoading: hideLoading,
    showToast: showToast$1,
    hideToast: hideToast,
    hide: hide,
    showModal: showModal$1,
    showActionSheet: showActionSheet$1,
    setTabBarBadge: setTabBarBadge$2,
    setTabBarItem: setTabBarItem$2,
    setTabBarStyle: setTabBarStyle$2,
    hideTabBar: hideTabBar$2,
    showTabBar: showTabBar$2,
    requestComponentInfo: requestComponentInfo$2,
    createRewardedVideoAd: createRewardedVideoAd,
    createFullScreenVideoAd: createFullScreenVideoAd,
    createInterstitialAd: createInterstitialAd,
    createInteractiveAd: createInteractiveAd
  });

  var platformApi = Object.assign(Object.create(null), api, eventApis);

  /**
   * 执行内部平台方法
   */
  function invokeMethod (name, ...args) {
    return platformApi[name].apply(null, args)
  }
  /**
   * 监听 service 层内部平台方法回调，与 publish 对应
   * @param {Object} name
   * @param {Object} callback
   */
  function onMethod (name, callback) {
    return UniServiceJSBridge.on('api.' + name, callback)
  }

  function getCurrentPageVm (method) {
    const pages = getCurrentPages();
    const len = pages.length;
    if (!len) {
      UniServiceJSBridge.emit('onError', `${method}:fail`);
    }
    const page = pages[len - 1];
    return page.$vm
  }

  function getCurrentPageId () {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    return page && page.$page.id
  }

  const eventNames$2 = [
    'canplay',
    'play',
    'pause',
    'stop',
    'ended',
    'timeUpdate',
    'prev',
    'next',
    'error',
    'waiting'
  ];
  const callbacks$5 = {};
  eventNames$2.forEach(name => {
    callbacks$5[name] = [];
  });

  const props = [
    {
      name: 'duration',
      readonly: true
    },
    {
      name: 'currentTime',
      readonly: true
    },
    {
      name: 'paused',
      readonly: true
    },
    {
      name: 'src',
      cache: true
    },
    {
      name: 'startTime',
      default: 0,
      cache: true
    },
    {
      name: 'buffered',
      readonly: true
    },
    {
      name: 'title',
      cache: true
    },
    {
      name: 'epname',
      cache: true
    },
    {
      name: 'singer',
      cache: true
    },
    {
      name: 'coverImgUrl',
      cache: true
    },
    {
      name: 'webUrl',
      cache: true
    },
    {
      name: 'protocol',
      readonly: true,
      default: 'http'
    },
    {
      name: 'playbackRate',
      default: 1,
      cache: true
    }
  ];

  const backgroundEvents = ['prev', 'next'];

  class BackgroundAudioManager {
    constructor () {
      this._options = {};
      onMethod('onBackgroundAudioStateChange', ({
        state,
        errMsg,
        errCode
      }) => {
        callbacks$5[state].forEach(callback => {
          if (typeof callback === 'function') {
            callback(state === 'error' ? {
              errMsg,
              errCode
            } : {});
          }
        });
      });
      backgroundEvents.forEach((name) => {
        onMethod(`onBackgroundAudio${name[0].toUpperCase() + name.substr(1)}`, () => {
          callbacks$5[name].forEach(callback => {
            if (typeof callback === 'function') {
              callback({});
            }
          });
        });
      });
      props.forEach(item => {
        const name = item.name;
        const data = {
          get () {
            const result = item.cache ? this._options : invokeMethod('getBackgroundAudioState');
            return name in result ? result[name] : item.default
          }
        };
        if (!item.readonly) {
          data.set = function (value) {
            this._options[name] = value;
            invokeMethod('setBackgroundAudioState', Object.assign({}, this._options, {
              audioId: this.id
            }), name);
          };
        }
        Object.defineProperty(this, name, data);
      });
    }

    play () {
      this._operate('play');
    }

    pause () {
      this._operate('pause');
    }

    stop () {
      this._operate('stop');
    }

    seek (position) {
      this._operate('seek', {
        currentTime: position
      });
    }

    _operate (type, options) {
      invokeMethod('operateBackgroundAudio', Object.assign({}, options, {
        operationType: type
      }));
    }
  }

  eventNames$2.forEach(item => {
    const name = item[0].toUpperCase() + item.substr(1);
    BackgroundAudioManager.prototype[`on${name}`] = function (callback) {
      callbacks$5[item].push(callback);
    };
  });

  let backgroundAudioManager;

  function getBackgroundAudioManager () {
    return backgroundAudioManager || (backgroundAudioManager = new BackgroundAudioManager())
  }

  var require_context_module_1_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getBackgroundAudioManager: getBackgroundAudioManager
  });

  var common = createCommonjsModule(function (module, exports) {


  var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                  (typeof Uint16Array !== 'undefined') &&
                  (typeof Int32Array !== 'undefined');

  function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  exports.assign = function (obj /*from1, from2, from3, ...*/) {
    var sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      var source = sources.shift();
      if (!source) { continue; }

      if (typeof source !== 'object') {
        throw new TypeError(source + 'must be non-object');
      }

      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }

    return obj;
  };


  // reduce buffer size, avoiding mem copy
  exports.shrinkBuf = function (buf, size) {
    if (buf.length === size) { return buf; }
    if (buf.subarray) { return buf.subarray(0, size); }
    buf.length = size;
    return buf;
  };


  var fnTyped = {
    arraySet: function (dest, src, src_offs, len, dest_offs) {
      if (src.subarray && dest.subarray) {
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
        return;
      }
      // Fallback to ordinary array
      for (var i = 0; i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    // Join array of chunks to single array.
    flattenChunks: function (chunks) {
      var i, l, len, pos, chunk, result;

      // calculate data length
      len = 0;
      for (i = 0, l = chunks.length; i < l; i++) {
        len += chunks[i].length;
      }

      // join chunks
      result = new Uint8Array(len);
      pos = 0;
      for (i = 0, l = chunks.length; i < l; i++) {
        chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }

      return result;
    }
  };

  var fnUntyped = {
    arraySet: function (dest, src, src_offs, len, dest_offs) {
      for (var i = 0; i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    // Join array of chunks to single array.
    flattenChunks: function (chunks) {
      return [].concat.apply([], chunks);
    }
  };


  // Enable/Disable typed arrays use, for testing
  //
  exports.setTyped = function (on) {
    if (on) {
      exports.Buf8  = Uint8Array;
      exports.Buf16 = Uint16Array;
      exports.Buf32 = Int32Array;
      exports.assign(exports, fnTyped);
    } else {
      exports.Buf8  = Array;
      exports.Buf16 = Array;
      exports.Buf32 = Array;
      exports.assign(exports, fnUntyped);
    }
  };

  exports.setTyped(TYPED_OK);
  });
  var common_1 = common.assign;
  var common_2 = common.shrinkBuf;
  var common_3 = common.setTyped;
  var common_4 = common.Buf8;
  var common_5 = common.Buf16;
  var common_6 = common.Buf32;

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  /* eslint-disable space-unary-ops */



  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  //var Z_FILTERED          = 1;
  //var Z_HUFFMAN_ONLY      = 2;
  //var Z_RLE               = 3;
  var Z_FIXED               = 4;
  //var Z_DEFAULT_STRATEGY  = 0;

  /* Possible values of the data_type field (though see inflate()) */
  var Z_BINARY              = 0;
  var Z_TEXT                = 1;
  //var Z_ASCII             = 1; // = Z_TEXT
  var Z_UNKNOWN             = 2;

  /*============================================================================*/


  function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

  // From zutil.h

  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES    = 2;
  /* The three kinds of block type */

  var MIN_MATCH    = 3;
  var MAX_MATCH    = 258;
  /* The minimum and maximum match lengths */

  // From deflate.h
  /* ===========================================================================
   * Internal compression state.
   */

  var LENGTH_CODES  = 29;
  /* number of length codes, not counting the special END_BLOCK code */

  var LITERALS      = 256;
  /* number of literal bytes 0..255 */

  var L_CODES       = LITERALS + 1 + LENGTH_CODES;
  /* number of Literal or Length codes, including the END_BLOCK code */

  var D_CODES       = 30;
  /* number of distance codes */

  var BL_CODES      = 19;
  /* number of codes used to transfer the bit lengths */

  var HEAP_SIZE     = 2 * L_CODES + 1;
  /* maximum heap size */

  var MAX_BITS      = 15;
  /* All codes must not exceed MAX_BITS bits */

  var Buf_size      = 16;
  /* size of bit buffer in bi_buf */


  /* ===========================================================================
   * Constants
   */

  var MAX_BL_BITS = 7;
  /* Bit length codes must not exceed MAX_BL_BITS bits */

  var END_BLOCK   = 256;
  /* end of block literal code */

  var REP_3_6     = 16;
  /* repeat previous bit length 3-6 times (2 bits of repeat count) */

  var REPZ_3_10   = 17;
  /* repeat a zero length 3-10 times  (3 bits of repeat count) */

  var REPZ_11_138 = 18;
  /* repeat a zero length 11-138 times  (7 bits of repeat count) */

  /* eslint-disable comma-spacing,array-bracket-spacing */
  var extra_lbits =   /* extra bits for each length code */
    [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

  var extra_dbits =   /* extra bits for each distance code */
    [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

  var extra_blbits =  /* extra bits for each bit length code */
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

  var bl_order =
    [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
  /* eslint-enable comma-spacing,array-bracket-spacing */

  /* The lengths of the bit length codes are sent in order of decreasing
   * probability, to avoid transmitting the lengths for unused bit length codes.
   */

  /* ===========================================================================
   * Local data. These are initialized only once.
   */

  // We pre-fill arrays with 0 to avoid uninitialized gaps

  var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

  // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
  var static_ltree  = new Array((L_CODES + 2) * 2);
  zero(static_ltree);
  /* The static literal tree. Since the bit lengths are imposed, there is no
   * need for the L_CODES extra codes used during heap construction. However
   * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
   * below).
   */

  var static_dtree  = new Array(D_CODES * 2);
  zero(static_dtree);
  /* The static distance tree. (Actually a trivial tree since all codes use
   * 5 bits.)
   */

  var _dist_code    = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  /* Distance codes. The first 256 values correspond to the distances
   * 3 .. 258, the last 256 values correspond to the top 8 bits of
   * the 15 bit distances.
   */

  var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  /* length code for each normalized match length (0 == MIN_MATCH) */

  var base_length   = new Array(LENGTH_CODES);
  zero(base_length);
  /* First normalized length for each code (0 = MIN_MATCH) */

  var base_dist     = new Array(D_CODES);
  zero(base_dist);
  /* First normalized distance for each code (0 = distance of 1) */


  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

    this.static_tree  = static_tree;  /* static tree or NULL */
    this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
    this.extra_base   = extra_base;   /* base index for extra_bits */
    this.elems        = elems;        /* max number of elements in the tree */
    this.max_length   = max_length;   /* max bit length for the codes */

    // show if `static_tree` has data or dummy - needed for monomorphic objects
    this.has_stree    = static_tree && static_tree.length;
  }


  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;


  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;     /* the dynamic tree */
    this.max_code = 0;            /* largest code with non zero frequency */
    this.stat_desc = stat_desc;   /* the corresponding static tree */
  }



  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }


  /* ===========================================================================
   * Output a short LSB first on the stream.
   * IN assertion: there is enough room in pendingBuf.
   */
  function put_short(s, w) {
  //    put_byte(s, (uch)((w) & 0xff));
  //    put_byte(s, (uch)((ush)(w) >> 8));
    s.pending_buf[s.pending++] = (w) & 0xff;
    s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
  }


  /* ===========================================================================
   * Send a value on a given number of bits.
   * IN assertion: length <= 16 and value fits in length bits.
   */
  function send_bits(s, value, length) {
    if (s.bi_valid > (Buf_size - length)) {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> (Buf_size - s.bi_valid);
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      s.bi_valid += length;
    }
  }


  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
  }


  /* ===========================================================================
   * Reverse the first len bits of a code, using straightforward code (a faster
   * method would use a table)
   * IN assertion: 1 <= len <= 15
   */
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }


  /* ===========================================================================
   * Flush the bit buffer, keeping at most 7 bits in it.
   */
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;

    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 0xff;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }


  /* ===========================================================================
   * Compute the optimal bit lengths for a tree and update the total bit length
   * for the current block.
   * IN assertion: the fields freq and dad are set, heap[heap_max] and
   *    above are the tree nodes sorted by increasing frequency.
   * OUT assertions: the field len is set to the optimal bit length, the
   *     array bl_count contains the frequencies for each bit length.
   *     The length opt_len is updated; static_len is also updated if stree is
   *     not null.
   */
  function gen_bitlen(s, desc)
  //    deflate_state *s;
  //    tree_desc *desc;    /* the tree descriptor */
  {
    var tree            = desc.dyn_tree;
    var max_code        = desc.max_code;
    var stree           = desc.stat_desc.static_tree;
    var has_stree       = desc.stat_desc.has_stree;
    var extra           = desc.stat_desc.extra_bits;
    var base            = desc.stat_desc.extra_base;
    var max_length      = desc.stat_desc.max_length;
    var h;              /* heap index */
    var n, m;           /* iterate over the tree elements */
    var bits;           /* bit length */
    var xbits;          /* extra bits */
    var f;              /* frequency */
    var overflow = 0;   /* number of elements with bit length too large */

    for (bits = 0; bits <= MAX_BITS; bits++) {
      s.bl_count[bits] = 0;
    }

    /* In a first pass, compute the optimal bit lengths (which may
     * overflow in the case of the bit length tree).
     */
    tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

    for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1]/*.Len*/ = bits;
      /* We overwrite tree[n].Dad which is no longer needed */

      if (n > max_code) { continue; } /* not a leaf node */

      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2]/*.Freq*/;
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
      }
    }
    if (overflow === 0) { return; }

    // Trace((stderr,"\nbit length overflow\n"));
    /* This happens for example on obj2 and pic of the Calgary corpus */

    /* Find the first bit length which could increase: */
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) { bits--; }
      s.bl_count[bits]--;      /* move one leaf down the tree */
      s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
      s.bl_count[max_length]--;
      /* The brother of the overflow item also moves one step up,
       * but this does not affect bl_count[max_length]
       */
      overflow -= 2;
    } while (overflow > 0);

    /* Now recompute all bit lengths, scanning in increasing frequency.
     * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
     * lengths instead of fixing only the wrong ones. This idea is taken
     * from 'ar' written by Haruhiko Okumura.)
     */
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) { continue; }
        if (tree[m * 2 + 1]/*.Len*/ !== bits) {
          // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
          s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
          tree[m * 2 + 1]/*.Len*/ = bits;
        }
        n--;
      }
    }
  }


  /* ===========================================================================
   * Generate the codes for a given tree and bit counts (which need not be
   * optimal).
   * IN assertion: the array bl_count contains the bit length statistics for
   * the given tree and the field len is set for all tree elements.
   * OUT assertion: the field code is set for all tree elements of non
   *     zero code length.
   */
  function gen_codes(tree, max_code, bl_count)
  //    ct_data *tree;             /* the tree to decorate */
  //    int max_code;              /* largest code with non zero frequency */
  //    ushf *bl_count;            /* number of codes at each bit length */
  {
    var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
    var code = 0;              /* running code value */
    var bits;                  /* bit index */
    var n;                     /* code index */

    /* The distribution counts are first used to generate the code values
     * without bit reversal.
     */
    for (bits = 1; bits <= MAX_BITS; bits++) {
      next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
    }
    /* Check that the bit counts in bl_count are consistent. The last code
     * must be all ones.
     */
    //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
    //        "inconsistent bit counts");
    //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

    for (n = 0;  n <= max_code; n++) {
      var len = tree[n * 2 + 1]/*.Len*/;
      if (len === 0) { continue; }
      /* Now reverse the bits */
      tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

      //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
      //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
    }
  }


  /* ===========================================================================
   * Initialize the various 'constant' tables.
   */
  function tr_static_init() {
    var n;        /* iterates over tree elements */
    var bits;     /* bit counter */
    var length;   /* length value */
    var code;     /* code value */
    var dist;     /* distance index */
    var bl_count = new Array(MAX_BITS + 1);
    /* number of codes at each bit length for an optimal tree */

    // do check in _tr_init()
    //if (static_init_done) return;

    /* For some embedded targets, global variables are not initialized: */
  /*#ifdef NO_INIT_GLOBAL_POINTERS
    static_l_desc.static_tree = static_ltree;
    static_l_desc.extra_bits = extra_lbits;
    static_d_desc.static_tree = static_dtree;
    static_d_desc.extra_bits = extra_dbits;
    static_bl_desc.extra_bits = extra_blbits;
  #endif*/

    /* Initialize the mapping length (0..255) -> length code (0..28) */
    length = 0;
    for (code = 0; code < LENGTH_CODES - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < (1 << extra_lbits[code]); n++) {
        _length_code[length++] = code;
      }
    }
    //Assert (length == 256, "tr_static_init: length != 256");
    /* Note that the length 255 (match length 258) can be represented
     * in two different ways: code 284 + 5 bits or code 285, so we
     * overwrite length_code[255] to use the best encoding:
     */
    _length_code[length - 1] = code;

    /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < (1 << extra_dbits[code]); n++) {
        _dist_code[dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: dist != 256");
    dist >>= 7; /* from now on, all distances are divided by 128 */
    for (; code < D_CODES; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: 256+dist != 512");

    /* Construct the codes of the static literal tree */
    for (bits = 0; bits <= MAX_BITS; bits++) {
      bl_count[bits] = 0;
    }

    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1]/*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1]/*.Len*/ = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1]/*.Len*/ = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1]/*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    /* Codes 286 and 287 do not exist, but we must include them in the
     * tree construction to get a canonical Huffman tree (longest code
     * all ones)
     */
    gen_codes(static_ltree, L_CODES + 1, bl_count);

    /* The static distance tree is trivial: */
    for (n = 0; n < D_CODES; n++) {
      static_dtree[n * 2 + 1]/*.Len*/ = 5;
      static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
    }

    // Now data ready and we can init static trees
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

    //static_init_done = true;
  }


  /* ===========================================================================
   * Initialize a new block.
   */
  function init_block(s) {
    var n; /* iterates over tree elements */

    /* Initialize the trees. */
    for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
    for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
    for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

    s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }


  /* ===========================================================================
   * Flush the bit buffer and align the output on a byte boundary
   */
  function bi_windup(s)
  {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      //put_byte(s, (Byte)s->bi_buf);
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }

  /* ===========================================================================
   * Copy a stored block, storing first the length and its
   * one's complement if requested.
   */
  function copy_block(s, buf, len, header)
  //DeflateState *s;
  //charf    *buf;    /* the input data */
  //unsigned len;     /* its length */
  //int      header;  /* true if block header must be written */
  {
    bi_windup(s);        /* align on byte boundary */

    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
  //  while (len--) {
  //    put_byte(s, *buf++);
  //  }
    common.arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }

  /* ===========================================================================
   * Compares to subtrees, using the tree depth as tie breaker when
   * the subtrees have equal frequency. This minimizes the worst case length.
   */
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
           (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
  }

  /* ===========================================================================
   * Restore the heap property by moving down the tree starting at node k,
   * exchanging a node with the smallest of its two sons if necessary, stopping
   * when the heap property is re-established (each father smaller than its
   * two sons).
   */
  function pqdownheap(s, tree, k)
  //    deflate_state *s;
  //    ct_data *tree;  /* the tree to restore */
  //    int k;               /* node to move down */
  {
    var v = s.heap[k];
    var j = k << 1;  /* left son of k */
    while (j <= s.heap_len) {
      /* Set j to the smallest of the two sons: */
      if (j < s.heap_len &&
        smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      /* Exit if v is smaller than both sons */
      if (smaller(tree, v, s.heap[j], s.depth)) { break; }

      /* Exchange v with the smallest son */
      s.heap[k] = s.heap[j];
      k = j;

      /* And continue down the tree, setting j to the left son of k */
      j <<= 1;
    }
    s.heap[k] = v;
  }


  // inlined manually
  // var SMALLEST = 1;

  /* ===========================================================================
   * Send the block data compressed using the given Huffman trees
   */
  function compress_block(s, ltree, dtree)
  //    deflate_state *s;
  //    const ct_data *ltree; /* literal tree */
  //    const ct_data *dtree; /* distance tree */
  {
    var dist;           /* distance of matched string */
    var lc;             /* match length or unmatched char (if dist == 0) */
    var lx = 0;         /* running index in l_buf */
    var code;           /* the code to send */
    var extra;          /* number of extra bits to send */

    if (s.last_lit !== 0) {
      do {
        dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
        lc = s.pending_buf[s.l_buf + lx];
        lx++;

        if (dist === 0) {
          send_code(s, lc, ltree); /* send a literal byte */
          //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
        } else {
          /* Here, lc is the match length - MIN_MATCH */
          code = _length_code[lc];
          send_code(s, code + LITERALS + 1, ltree); /* send the length code */
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);       /* send the extra length bits */
          }
          dist--; /* dist is now the match distance - 1 */
          code = d_code(dist);
          //Assert (code < D_CODES, "bad d_code");

          send_code(s, code, dtree);       /* send the distance code */
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);   /* send the extra distance bits */
          }
        } /* literal or match pair ? */

        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
        //       "pendingBuf overflow");

      } while (lx < s.last_lit);
    }

    send_code(s, END_BLOCK, ltree);
  }


  /* ===========================================================================
   * Construct one Huffman tree and assigns the code bit strings and lengths.
   * Update the total bit length for the current block.
   * IN assertion: the field freq is set for all tree elements.
   * OUT assertions: the fields len and code are set to the optimal bit length
   *     and corresponding code. The length opt_len is updated; static_len is
   *     also updated if stree is not null. The field max_code is set.
   */
  function build_tree(s, desc)
  //    deflate_state *s;
  //    tree_desc *desc; /* the tree descriptor */
  {
    var tree     = desc.dyn_tree;
    var stree    = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems    = desc.stat_desc.elems;
    var n, m;          /* iterate over heap elements */
    var max_code = -1; /* largest code with non zero frequency */
    var node;          /* new node being created */

    /* Construct the initial heap, with least frequent element in
     * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
     * heap[0] is not used.
     */
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE;

    for (n = 0; n < elems; n++) {
      if (tree[n * 2]/*.Freq*/ !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;

      } else {
        tree[n * 2 + 1]/*.Len*/ = 0;
      }
    }

    /* The pkzip format requires that at least one distance code exists,
     * and that at least one bit should be sent even if there is only one
     * possible code. So to avoid special checks later on we force at least
     * two codes of non zero frequency.
     */
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
      tree[node * 2]/*.Freq*/ = 1;
      s.depth[node] = 0;
      s.opt_len--;

      if (has_stree) {
        s.static_len -= stree[node * 2 + 1]/*.Len*/;
      }
      /* node is 0 or 1 so it does not have extra bits */
    }
    desc.max_code = max_code;

    /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
     * establish sub-heaps of increasing lengths:
     */
    for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

    /* Construct the Huffman tree by repeatedly combining the least two
     * frequent nodes.
     */
    node = elems;              /* next internal node of the tree */
    do {
      //pqremove(s, tree, n);  /* n = node of least frequency */
      /*** pqremove ***/
      n = s.heap[1/*SMALLEST*/];
      s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1/*SMALLEST*/);
      /***/

      m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

      s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
      s.heap[--s.heap_max] = m;

      /* Create a new node father of n and m */
      tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

      /* and insert the new node in the heap */
      s.heap[1/*SMALLEST*/] = node++;
      pqdownheap(s, tree, 1/*SMALLEST*/);

    } while (s.heap_len >= 2);

    s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

    /* At this point, the fields freq and dad are set. We can now
     * generate the bit lengths.
     */
    gen_bitlen(s, desc);

    /* The field len is now set, we can generate the bit codes */
    gen_codes(tree, max_code, s.bl_count);
  }


  /* ===========================================================================
   * Scan a literal or distance tree to determine the frequencies of the codes
   * in the bit length tree.
   */
  function scan_tree(s, tree, max_code)
  //    deflate_state *s;
  //    ct_data *tree;   /* the tree to be scanned */
  //    int max_code;    /* and its largest code of non zero frequency */
  {
    var n;                     /* iterates over all tree elements */
    var prevlen = -1;          /* last emitted length */
    var curlen;                /* length of current code */

    var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

    var count = 0;             /* repeat count of the current code */
    var max_count = 7;         /* max repeat count */
    var min_count = 4;         /* min repeat count */

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

      if (++count < max_count && curlen === nextlen) {
        continue;

      } else if (count < min_count) {
        s.bl_tree[curlen * 2]/*.Freq*/ += count;

      } else if (curlen !== 0) {

        if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
        s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

      } else {
        s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
      }

      count = 0;
      prevlen = curlen;

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;

      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;

      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }


  /* ===========================================================================
   * Send a literal or distance tree in compressed form, using the codes in
   * bl_tree.
   */
  function send_tree(s, tree, max_code)
  //    deflate_state *s;
  //    ct_data *tree; /* the tree to be scanned */
  //    int max_code;       /* and its largest code of non zero frequency */
  {
    var n;                     /* iterates over all tree elements */
    var prevlen = -1;          /* last emitted length */
    var curlen;                /* length of current code */

    var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

    var count = 0;             /* repeat count of the current code */
    var max_count = 7;         /* max repeat count */
    var min_count = 4;         /* min repeat count */

    /* tree[max_code+1].Len = -1; */  /* guard already set */
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

      if (++count < max_count && curlen === nextlen) {
        continue;

      } else if (count < min_count) {
        do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        //Assert(count >= 3 && count <= 6, " 3_6?");
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);

      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);

      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }

      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;

      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;

      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }


  /* ===========================================================================
   * Construct the Huffman tree for the bit lengths and return the index in
   * bl_order of the last bit length code to send.
   */
  function build_bl_tree(s) {
    var max_blindex;  /* index of last bit length code of non zero freq */

    /* Determine the bit length frequencies for literal and distance trees */
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

    /* Build the bit length tree: */
    build_tree(s, s.bl_desc);
    /* opt_len now includes the length of the tree representations, except
     * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
     */

    /* Determine the number of bit length codes to send. The pkzip format
     * requires that at least 4 bit length codes be sent. (appnote.txt says
     * 3 but the actual value used is 4.)
     */
    for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
        break;
      }
    }
    /* Update opt_len to include the bit length tree and counts */
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
    //        s->opt_len, s->static_len));

    return max_blindex;
  }


  /* ===========================================================================
   * Send the header for a block using dynamic Huffman trees: the counts, the
   * lengths of the bit length codes, the literal tree and the distance tree.
   * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
   */
  function send_all_trees(s, lcodes, dcodes, blcodes)
  //    deflate_state *s;
  //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
  {
    var rank;                    /* index in bl_order */

    //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
    //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
    //        "too many codes");
    //Tracev((stderr, "\nbl counts: "));
    send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
    send_bits(s, dcodes - 1,   5);
    send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
    for (rank = 0; rank < blcodes; rank++) {
      //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
    }
    //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
    //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
    //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
  }


  /* ===========================================================================
   * Check if the data type is TEXT or BINARY, using the following algorithm:
   * - TEXT if the two conditions below are satisfied:
   *    a) There are no non-portable control characters belonging to the
   *       "black list" (0..6, 14..25, 28..31).
   *    b) There is at least one printable character belonging to the
   *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
   * - BINARY otherwise.
   * - The following partially-portable control characters form a
   *   "gray list" that is ignored in this detection algorithm:
   *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
   * IN assertion: the fields Freq of dyn_ltree are set.
   */
  function detect_data_type(s) {
    /* black_mask is the bit mask of black-listed bytes
     * set bits 0..6, 14..25, and 28..31
     * 0xf3ffc07f = binary 11110011111111111100000001111111
     */
    var black_mask = 0xf3ffc07f;
    var n;

    /* Check for non-textual ("black-listed") bytes. */
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
        return Z_BINARY;
      }
    }

    /* Check for textual ("white-listed") bytes. */
    if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
        s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
    for (n = 32; n < LITERALS; n++) {
      if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
        return Z_TEXT;
      }
    }

    /* There are no "black-listed" or "white-listed" bytes:
     * this stream either is empty or has tolerated ("gray-listed") bytes only.
     */
    return Z_BINARY;
  }


  var static_init_done = false;

  /* ===========================================================================
   * Initialize the tree data structures for a new zlib stream.
   */
  function _tr_init(s)
  {

    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }

    s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

    s.bi_buf = 0;
    s.bi_valid = 0;

    /* Initialize the first block of the first file: */
    init_block(s);
  }


  /* ===========================================================================
   * Send a stored block
   */
  function _tr_stored_block(s, buf, stored_len, last)
  //DeflateState *s;
  //charf *buf;       /* input block */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
    copy_block(s, buf, stored_len, true); /* with header */
  }


  /* ===========================================================================
   * Send one empty static block to give enough lookahead for inflate.
   * This takes 10 bits, of which 7 may remain in the bit buffer.
   */
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }


  /* ===========================================================================
   * Determine the best encoding for the current block: dynamic trees, static
   * trees or store, and output the encoded block to the zip file.
   */
  function _tr_flush_block(s, buf, stored_len, last)
  //DeflateState *s;
  //charf *buf;       /* input block, or NULL if too old */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
    var max_blindex = 0;        /* index of last bit length code of non zero freq */

    /* Build the Huffman trees unless a stored block is forced */
    if (s.level > 0) {

      /* Check if the file is binary or text */
      if (s.strm.data_type === Z_UNKNOWN) {
        s.strm.data_type = detect_data_type(s);
      }

      /* Construct the literal and distance trees */
      build_tree(s, s.l_desc);
      // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));

      build_tree(s, s.d_desc);
      // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));
      /* At this point, opt_len and static_len are the total bit lengths of
       * the compressed block data, excluding the tree representations.
       */

      /* Build the bit length tree for the above two trees, and get the index
       * in bl_order of the last bit length code to send.
       */
      max_blindex = build_bl_tree(s);

      /* Determine the best encoding. Compute the block lengths in bytes. */
      opt_lenb = (s.opt_len + 3 + 7) >>> 3;
      static_lenb = (s.static_len + 3 + 7) >>> 3;

      // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
      //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
      //        s->last_lit));

      if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

    } else {
      // Assert(buf != (char*)0, "lost buf");
      opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
    }

    if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
      /* 4: two words for the lengths */

      /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
       * Otherwise we can't have processed more than WSIZE input bytes since
       * the last block flush, because compression would have been
       * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
       * transform a block into a stored block.
       */
      _tr_stored_block(s, buf, stored_len, last);

    } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);

    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
    /* The above check is made mod 2^32, for files larger than 512 MB
     * and uLong implemented on 32 bits.
     */
    init_block(s);

    if (last) {
      bi_windup(s);
    }
    // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
    //       s->compressed_len-7*last));
  }

  /* ===========================================================================
   * Save the match info and tally the frequency counts. Return true if
   * the current block must be flushed.
   */
  function _tr_tally(s, dist, lc)
  //    deflate_state *s;
  //    unsigned dist;  /* distance of matched string */
  //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
  {
    //var out_length, in_length, dcode;

    s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

    s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
    s.last_lit++;

    if (dist === 0) {
      /* lc is the unmatched char */
      s.dyn_ltree[lc * 2]/*.Freq*/++;
    } else {
      s.matches++;
      /* Here, lc is the match length - MIN_MATCH */
      dist--;             /* dist = match distance - 1 */
      //Assert((ush)dist < (ush)MAX_DIST(s) &&
      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
      s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
    }

  // (!) This block is disabled in zlib defaults,
  // don't enable it for binary compatibility

  //#ifdef TRUNCATE_BLOCK
  //  /* Try to guess if it is profitable to stop the current block here */
  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
  //    /* Compute an upper bound for the compressed length */
  //    out_length = s.last_lit*8;
  //    in_length = s.strstart - s.block_start;
  //
  //    for (dcode = 0; dcode < D_CODES; dcode++) {
  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
  //    }
  //    out_length >>>= 3;
  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
  //    //       s->last_lit, in_length, out_length,
  //    //       100L - out_length*100L/in_length));
  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
  //      return true;
  //    }
  //  }
  //#endif

    return (s.last_lit === s.lit_bufsize - 1);
    /* We avoid equality with lit_bufsize because of wraparound at 64K
     * on 16 bit machines and because stored blocks are restricted to
     * 64K-1 bytes.
     */
  }

  var _tr_init_1  = _tr_init;
  var _tr_stored_block_1 = _tr_stored_block;
  var _tr_flush_block_1  = _tr_flush_block;
  var _tr_tally_1 = _tr_tally;
  var _tr_align_1 = _tr_align;

  var trees = {
  	_tr_init: _tr_init_1,
  	_tr_stored_block: _tr_stored_block_1,
  	_tr_flush_block: _tr_flush_block_1,
  	_tr_tally: _tr_tally_1,
  	_tr_align: _tr_align_1
  };

  // Note: adler32 takes 12% for level 0 and 2% for level 6.
  // It isn't worth it to make additional optimizations as in original.
  // Small size is preferable.

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  function adler32(adler, buf, len, pos) {
    var s1 = (adler & 0xffff) |0,
        s2 = ((adler >>> 16) & 0xffff) |0,
        n = 0;

    while (len !== 0) {
      // Set limit ~ twice less than 5552, to keep
      // s2 in 31-bits, because we force signed ints.
      // in other case %= will fail.
      n = len > 2000 ? 2000 : len;
      len -= n;

      do {
        s1 = (s1 + buf[pos++]) |0;
        s2 = (s2 + s1) |0;
      } while (--n);

      s1 %= 65521;
      s2 %= 65521;
    }

    return (s1 | (s2 << 16)) |0;
  }


  var adler32_1 = adler32;

  // Note: we can't get significant speed boost here.
  // So write code to minimize size - no pregenerated tables
  // and array tools dependencies.

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  // Use ordinary array, since untyped makes no boost here
  function makeTable() {
    var c, table = [];

    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      table[n] = c;
    }

    return table;
  }

  // Create table on load. Just 255 signed longs. Not a problem.
  var crcTable = makeTable();


  function crc32(crc, buf, len, pos) {
    var t = crcTable,
        end = pos + len;

    crc ^= -1;

    for (var i = pos; i < end; i++) {
      crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
  }


  var crc32_1 = crc32;

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var messages$1 = {
    2:      'need dictionary',     /* Z_NEED_DICT       2  */
    1:      'stream end',          /* Z_STREAM_END      1  */
    0:      '',                    /* Z_OK              0  */
    '-1':   'file error',          /* Z_ERRNO         (-1) */
    '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
    '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
    '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
    '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
    '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.







  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  /* Allowed flush values; see deflate() and inflate() below for details */
  var Z_NO_FLUSH      = 0;
  var Z_PARTIAL_FLUSH = 1;
  //var Z_SYNC_FLUSH    = 2;
  var Z_FULL_FLUSH    = 3;
  var Z_FINISH        = 4;
  var Z_BLOCK         = 5;
  //var Z_TREES         = 6;


  /* Return codes for the compression/decompression functions. Negative values
   * are errors, positive values are used for special but normal events.
   */
  var Z_OK            = 0;
  var Z_STREAM_END    = 1;
  //var Z_NEED_DICT     = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR  = -2;
  var Z_DATA_ERROR    = -3;
  //var Z_MEM_ERROR     = -4;
  var Z_BUF_ERROR     = -5;
  //var Z_VERSION_ERROR = -6;


  /* compression levels */
  //var Z_NO_COMPRESSION      = 0;
  //var Z_BEST_SPEED          = 1;
  //var Z_BEST_COMPRESSION    = 9;
  var Z_DEFAULT_COMPRESSION = -1;


  var Z_FILTERED            = 1;
  var Z_HUFFMAN_ONLY        = 2;
  var Z_RLE                 = 3;
  var Z_FIXED$1               = 4;
  var Z_DEFAULT_STRATEGY    = 0;

  /* Possible values of the data_type field (though see inflate()) */
  //var Z_BINARY              = 0;
  //var Z_TEXT                = 1;
  //var Z_ASCII               = 1; // = Z_TEXT
  var Z_UNKNOWN$1             = 2;


  /* The deflate compression method */
  var Z_DEFLATED  = 8;

  /*============================================================================*/


  var MAX_MEM_LEVEL = 9;
  /* Maximum value for memLevel in deflateInit2 */
  var MAX_WBITS = 15;
  /* 32K LZ77 window */
  var DEF_MEM_LEVEL = 8;


  var LENGTH_CODES$1  = 29;
  /* number of length codes, not counting the special END_BLOCK code */
  var LITERALS$1      = 256;
  /* number of literal bytes 0..255 */
  var L_CODES$1       = LITERALS$1 + 1 + LENGTH_CODES$1;
  /* number of Literal or Length codes, including the END_BLOCK code */
  var D_CODES$1       = 30;
  /* number of distance codes */
  var BL_CODES$1      = 19;
  /* number of codes used to transfer the bit lengths */
  var HEAP_SIZE$1     = 2 * L_CODES$1 + 1;
  /* maximum heap size */
  var MAX_BITS$1  = 15;
  /* All codes must not exceed MAX_BITS bits */

  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var MIN_LOOKAHEAD = (MAX_MATCH$1 + MIN_MATCH$1 + 1);

  var PRESET_DICT = 0x20;

  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;

  var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
  var BS_BLOCK_DONE     = 2; /* block flush performed */
  var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
  var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

  var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

  function err(strm, errorCode) {
    strm.msg = messages$1[errorCode];
    return errorCode;
  }

  function rank(f) {
    return ((f) << 1) - ((f) > 4 ? 9 : 0);
  }

  function zero$1(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


  /* =========================================================================
   * Flush as much pending output as possible. All deflate() output goes
   * through this function so some applications may wish to modify it
   * to avoid allocating a large strm->output buffer and copying into it.
   * (See also read_buf()).
   */
  function flush_pending(strm) {
    var s = strm.state;

    //_tr_flush_bits(s);
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) { return; }

    common.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }


  function flush_block_only(s, last) {
    trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }


  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }


  /* =========================================================================
   * Put a short in the pending buffer. The 16-bit value is put in MSB order.
   * IN assertion: the stream state is correct and there is enough room in
   * pending_buf.
   */
  function putShortMSB(s, b) {
  //  put_byte(s, (Byte)(b >> 8));
  //  put_byte(s, (Byte)(b & 0xff));
    s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
    s.pending_buf[s.pending++] = b & 0xff;
  }


  /* ===========================================================================
   * Read a new buffer from the current input stream, update the adler32
   * and total number of bytes read.  All deflate() input goes through
   * this function so some applications may wish to modify it to avoid
   * allocating a large strm->input buffer and copying from it.
   * (See also flush_pending()).
   */
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;

    if (len > size) { len = size; }
    if (len === 0) { return 0; }

    strm.avail_in -= len;

    // zmemcpy(buf, strm->next_in, len);
    common.arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    }

    else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }

    strm.next_in += len;
    strm.total_in += len;

    return len;
  }


  /* ===========================================================================
   * Set match_start to the longest match starting at the given string and
   * return its length. Matches shorter or equal to prev_length are discarded,
   * in which case the result is equal to prev_length and match_start is
   * garbage.
   * IN assertions: cur_match is the head of the hash chain for the current
   *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
   * OUT assertion: the match length is not greater than s->lookahead.
   */
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;      /* max hash chain length */
    var scan = s.strstart; /* current string */
    var match;                       /* matched string */
    var len;                           /* length of current match */
    var best_len = s.prev_length;              /* best match length so far */
    var nice_match = s.nice_match;             /* stop if match long enough */
    var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
        s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

    var _win = s.window; // shortcut

    var wmask = s.w_mask;
    var prev  = s.prev;

    /* Stop when cur_match becomes <= limit. To simplify the code,
     * we prevent matches with the string of window index 0.
     */

    var strend = s.strstart + MAX_MATCH$1;
    var scan_end1  = _win[scan + best_len - 1];
    var scan_end   = _win[scan + best_len];

    /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
     * It is easy to get rid of this optimization if necessary.
     */
    // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

    /* Do not waste too much time if we already have a good match: */
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    /* Do not look for matches beyond the end of the input. This is necessary
     * to make deflate deterministic.
     */
    if (nice_match > s.lookahead) { nice_match = s.lookahead; }

    // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

    do {
      // Assert(cur_match < s->strstart, "no future");
      match = cur_match;

      /* Skip to next match if the match length cannot increase
       * or if the match length is less than 2.  Note that the checks below
       * for insufficient lookahead only occur occasionally for performance
       * reasons.  Therefore uninitialized memory will be accessed, and
       * conditional jumps will be made that depend on those values.
       * However the length of the match is limited to the lookahead, so
       * the output of deflate is not affected by the uninitialized values.
       */

      if (_win[match + best_len]     !== scan_end  ||
          _win[match + best_len - 1] !== scan_end1 ||
          _win[match]                !== _win[scan] ||
          _win[++match]              !== _win[scan + 1]) {
        continue;
      }

      /* The check at best_len-1 can be removed because it will be made
       * again later. (This heuristic is not always a win.)
       * It is not necessary to compare scan[2] and match[2] since they
       * are always equal when the other bytes match, given that
       * the hash keys are equal and that HASH_BITS >= 8.
       */
      scan += 2;
      match++;
      // Assert(*scan == *match, "match[2]?");

      /* We check for insufficient lookahead only every 8th comparison;
       * the 256th check will be made at strstart+258.
       */
      do {
        /*jshint noempty:false*/
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
               _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
               scan < strend);

      // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

      len = MAX_MATCH$1 - (strend - scan);
      scan = strend - MAX_MATCH$1;

      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1  = _win[scan + best_len - 1];
        scan_end   = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }


  /* ===========================================================================
   * Fill the window when the lookahead becomes insufficient.
   * Updates strstart and lookahead.
   *
   * IN assertion: lookahead < MIN_LOOKAHEAD
   * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
   *    At least one byte has been read, or avail_in == 0; reads are
   *    performed for at least two bytes (required for the zip translate_eol
   *    option -- not supported here).
   */
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;

    //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

    do {
      more = s.window_size - s.lookahead - s.strstart;

      // JS ints have 32 bit, block below not needed
      /* Deal with !@#$% 64K limit: */
      //if (sizeof(int) <= 2) {
      //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
      //        more = wsize;
      //
      //  } else if (more == (unsigned)(-1)) {
      //        /* Very unlikely, but possible on 16 bit machine if
      //         * strstart == 0 && lookahead == 1 (input done a byte at time)
      //         */
      //        more--;
      //    }
      //}


      /* If the window is almost full and there is insufficient lookahead,
       * move the upper half to the lower one to make room in the upper half.
       */
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

        common.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        /* we now have strstart >= MAX_DIST */
        s.block_start -= _w_size;

        /* Slide the hash table (could be avoided with 32 bit values
         at the expense of memory usage). We slide even when level == 0
         to keep the hash table consistent if we switch back to level > 0
         later. (Using level 0 permanently is not an optimal usage of
         zlib, so we don't care about this pathological case.)
         */

        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = (m >= _w_size ? m - _w_size : 0);
        } while (--n);

        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = (m >= _w_size ? m - _w_size : 0);
          /* If n is not on any hash chain, prev[n] is garbage but
           * its value will never be used.
           */
        } while (--n);

        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }

      /* If there was no sliding:
       *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
       *    more == window_size - lookahead - strstart
       * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
       * => more >= window_size - 2*WSIZE + 2
       * In the BIG_MEM or MMAP case (not yet supported),
       *   window_size == input_size + MIN_LOOKAHEAD  &&
       *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
       * Otherwise, window_size == 2*WSIZE so more >= 2.
       * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
       */
      //Assert(more >= 2, "more < 2");
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;

      /* Initialize the hash value now that we have some input: */
      if (s.lookahead + s.insert >= MIN_MATCH$1) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];

        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
  //#if MIN_MATCH != 3
  //        Call update_hash() MIN_MATCH-3 more times
  //#endif
        while (s.insert) {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;

          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH$1) {
            break;
          }
        }
      }
      /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
       * but this is not important since only literal bytes will be emitted.
       */

    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

    /* If the WIN_INIT bytes after the end of the current data have never been
     * written, then zero those bytes in order to avoid memory check reports of
     * the use of uninitialized (or uninitialised as Julian writes) bytes by
     * the longest match routines.  Update the high water mark for the next
     * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
     * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
     */
  //  if (s.high_water < s.window_size) {
  //    var curr = s.strstart + s.lookahead;
  //    var init = 0;
  //
  //    if (s.high_water < curr) {
  //      /* Previous high water mark below current data -- zero WIN_INIT
  //       * bytes or up to end of window, whichever is less.
  //       */
  //      init = s.window_size - curr;
  //      if (init > WIN_INIT)
  //        init = WIN_INIT;
  //      zmemzero(s->window + curr, (unsigned)init);
  //      s->high_water = curr + init;
  //    }
  //    else if (s->high_water < (ulg)curr + WIN_INIT) {
  //      /* High water mark at or above current data, but below current data
  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
  //       * to end of window, whichever is less.
  //       */
  //      init = (ulg)curr + WIN_INIT - s->high_water;
  //      if (init > s->window_size - s->high_water)
  //        init = s->window_size - s->high_water;
  //      zmemzero(s->window + s->high_water, (unsigned)init);
  //      s->high_water += init;
  //    }
  //  }
  //
  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
  //    "not enough room for search");
  }

  /* ===========================================================================
   * Copy without compression as much as possible from the input stream, return
   * the current block state.
   * This function does not insert new strings in the dictionary since
   * uncompressible data is probably not useful. This function is used
   * only for the level=0 compression option.
   * NOTE: this function should be optimized to avoid extra copying from
   * window to pending_buf.
   */
  function deflate_stored(s, flush) {
    /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
     * to pending_buf_size, and each stored block has a 5 byte header:
     */
    var max_block_size = 0xffff;

    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }

    /* Copy as much as possible from input to output: */
    for (;;) {
      /* Fill the window as much as possible: */
      if (s.lookahead <= 1) {

        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
        //  s->block_start >= (long)s->w_size, "slide too late");
  //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
  //        s.block_start >= s.w_size)) {
  //        throw  new Error("slide too late");
  //      }

        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */
      }
      //Assert(s->block_start >= 0L, "block gone");
  //    if (s.block_start < 0) throw new Error("block gone");

      s.strstart += s.lookahead;
      s.lookahead = 0;

      /* Emit a stored block if pending_buf will be full: */
      var max_start = s.block_start + max_block_size;

      if (s.strstart === 0 || s.strstart >= max_start) {
        /* strstart == 0 is possible when wraparound on 16-bit machine */
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/


      }
      /* Flush if we may have to slide, otherwise block_start may become
       * negative and the data will be gone:
       */
      if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }

    s.insert = 0;

    if (flush === Z_FINISH) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }

    if (s.strstart > s.block_start) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_NEED_MORE;
  }

  /* ===========================================================================
   * Compress as much as possible from the input stream, return the current
   * block state.
   * This function does not perform lazy evaluation of matches and inserts
   * new strings in the dictionary only for unmatched strings or for short
   * matches. It is used only for the fast compression options.
   */
  function deflate_fast(s, flush) {
    var hash_head;        /* head of the hash chain */
    var bflush;           /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break; /* flush the current block */
        }
      }

      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */
      hash_head = 0/*NIL*/;
      if (s.lookahead >= MIN_MATCH$1) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
       * At this point we have always match_length < MIN_MATCH
       */
      if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */
      }
      if (s.match_length >= MIN_MATCH$1) {
        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

        /*** _tr_tally_dist(s, s.strstart - s.match_start,
                       s.match_length - MIN_MATCH, bflush); ***/
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);

        s.lookahead -= s.match_length;

        /* Insert new strings in the hash table only if the match length
         * is not too large. This saves time but degrades compression.
         */
        if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH$1) {
          s.match_length--; /* string at strstart already in table */
          do {
            s.strstart++;
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
            /* strstart never exceeds WSIZE-MAX_MATCH, so there are
             * always MIN_MATCH bytes ahead.
             */
          } while (--s.match_length !== 0);
          s.strstart++;
        } else
        {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

  //#if MIN_MATCH != 3
  //                Call UPDATE_HASH() MIN_MATCH-3 more times
  //#endif
          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
           * matter since it will be recomputed at next deflate call.
           */
        }
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s.window[s.strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = ((s.strstart < (MIN_MATCH$1 - 1)) ? s.strstart : MIN_MATCH$1 - 1);
    if (flush === Z_FINISH) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
   * Same as above, but achieves better compression. We use a lazy
   * evaluation for matches: a match is finally adopted only if there is
   * no better match at the next window position.
   */
  function deflate_slow(s, flush) {
    var hash_head;          /* head of hash chain */
    var bflush;              /* set if current block must be flushed */

    var max_insert;

    /* Process the input block. */
    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) { break; } /* flush the current block */
      }

      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */
      hash_head = 0/*NIL*/;
      if (s.lookahead >= MIN_MATCH$1) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
       */
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH$1 - 1;

      if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
          s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */

        if (s.match_length <= 5 &&
           (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

          /* If prev_match is also MIN_MATCH, match_start is garbage
           * but we will ignore the current match anyway.
           */
          s.match_length = MIN_MATCH$1 - 1;
        }
      }
      /* If there was a match at the previous step and the current
       * match is not better, output the previous match:
       */
      if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
        /* Do not insert strings in hash table beyond this. */

        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                       s.prev_length - MIN_MATCH, bflush);***/
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
        /* Insert in hash table all strings up to the end of the match.
         * strstart-1 and strstart are already inserted. If there is not
         * enough lookahead, the last two strings are not inserted in
         * the hash table.
         */
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH$1 - 1;
        s.strstart++;

        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }

      } else if (s.match_available) {
        /* If there was no match at the previous position, output a
         * single literal. If there was a match but the current match
         * is longer, truncate the previous match to a single literal.
         */
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

        if (bflush) {
          /*** FLUSH_BLOCK_ONLY(s, 0) ***/
          flush_block_only(s, false);
          /***/
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        /* There is no previous match to compare with, wait for
         * the next step to decide.
         */
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    //Assert (flush != Z_NO_FLUSH, "no flush?");
    if (s.match_available) {
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
    if (flush === Z_FINISH) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_BLOCK_DONE;
  }


  /* ===========================================================================
   * For Z_RLE, simply look for runs of bytes, generate matches only of distance
   * one.  Do not maintain a hash table.  (It will be regenerated if this run of
   * deflate switches away from Z_RLE.)
   */
  function deflate_rle(s, flush) {
    var bflush;            /* set if current block must be flushed */
    var prev;              /* byte at distance one to match */
    var scan, strend;      /* scan goes up to strend for length of run */

    var _win = s.window;

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the longest run, plus one for the unrolled loop.
       */
      if (s.lookahead <= MAX_MATCH$1) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH$1 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) { break; } /* flush the current block */
      }

      /* See how many times the previous byte repeats */
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH$1;
          do {
            /*jshint noempty:false*/
          } while (prev === _win[++scan] && prev === _win[++scan] &&
                   prev === _win[++scan] && prev === _win[++scan] &&
                   prev === _win[++scan] && prev === _win[++scan] &&
                   prev === _win[++scan] && prev === _win[++scan] &&
                   scan < strend);
          s.match_length = MAX_MATCH$1 - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
        //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
      }

      /* Emit match if have run of MIN_MATCH or longer, else emit literal */
      if (s.match_length >= MIN_MATCH$1) {
        //check_match(s, s.strstart, s.strstart - 1, s.match_length);

        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH$1);

        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s->window[s->strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
   * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
   * (It will be regenerated if this run of deflate switches away from Huffman.)
   */
  function deflate_huff(s, flush) {
    var bflush;             /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we have a literal to write. */
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          break;      /* flush the current block */
        }
      }

      /* Output a literal byte */
      s.match_length = 0;
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* Values for max_lazy_match, good_match and max_chain_length, depending on
   * the desired pack level (0..9). The values given below have been tuned to
   * exclude worst case performance for pathological files. Better values may be
   * found for specific files.
   */
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }

  var configuration_table;

  configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

    new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
  ];


  /* ===========================================================================
   * Initialize the "longest match" routines for a new zlib stream
   */
  function lm_init(s) {
    s.window_size = 2 * s.w_size;

    /*** CLEAR_HASH(s); ***/
    zero$1(s.head); // Fill with NIL (= 0);

    /* Set the default configuration parameters:
     */
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;

    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH$1 - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }


  function DeflateState() {
    this.strm = null;            /* pointer back to this zlib stream */
    this.status = 0;            /* as the name implies */
    this.pending_buf = null;      /* output still pending */
    this.pending_buf_size = 0;  /* size of pending_buf */
    this.pending_out = 0;       /* next pending byte to output to the stream */
    this.pending = 0;           /* nb of bytes in the pending buffer */
    this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
    this.gzhead = null;         /* gzip header information to write */
    this.gzindex = 0;           /* where in extra, name, or comment */
    this.method = Z_DEFLATED; /* can only be DEFLATED */
    this.last_flush = -1;   /* value of flush param for previous deflate call */

    this.w_size = 0;  /* LZ77 window size (32K by default) */
    this.w_bits = 0;  /* log2(w_size)  (8..16) */
    this.w_mask = 0;  /* w_size - 1 */

    this.window = null;
    /* Sliding window. Input bytes are read into the second half of the window,
     * and move to the first half later to keep a dictionary of at least wSize
     * bytes. With this organization, matches are limited to a distance of
     * wSize-MAX_MATCH bytes, but this ensures that IO is always
     * performed with a length multiple of the block size.
     */

    this.window_size = 0;
    /* Actual size of window: 2*wSize, except when the user input buffer
     * is directly used as sliding window.
     */

    this.prev = null;
    /* Link to older string with same hash index. To limit the size of this
     * array to 64K, this link is maintained only for the last 32K strings.
     * An index in this array is thus a window index modulo 32K.
     */

    this.head = null;   /* Heads of the hash chains or NIL. */

    this.ins_h = 0;       /* hash index of string to be inserted */
    this.hash_size = 0;   /* number of elements in hash table */
    this.hash_bits = 0;   /* log2(hash_size) */
    this.hash_mask = 0;   /* hash_size-1 */

    this.hash_shift = 0;
    /* Number of bits by which ins_h must be shifted at each input
     * step. It must be such that after MIN_MATCH steps, the oldest
     * byte no longer takes part in the hash key, that is:
     *   hash_shift * MIN_MATCH >= hash_bits
     */

    this.block_start = 0;
    /* Window position at the beginning of the current output block. Gets
     * negative when the window is moved backwards.
     */

    this.match_length = 0;      /* length of best match */
    this.prev_match = 0;        /* previous match */
    this.match_available = 0;   /* set if previous match exists */
    this.strstart = 0;          /* start of string to insert */
    this.match_start = 0;       /* start of matching string */
    this.lookahead = 0;         /* number of valid bytes ahead in window */

    this.prev_length = 0;
    /* Length of the best match at previous step. Matches not greater than this
     * are discarded. This is used in the lazy match evaluation.
     */

    this.max_chain_length = 0;
    /* To speed up deflation, hash chains are never searched beyond this
     * length.  A higher limit improves compression ratio but degrades the
     * speed.
     */

    this.max_lazy_match = 0;
    /* Attempt to find a better match only when the current match is strictly
     * smaller than this value. This mechanism is used only for compression
     * levels >= 4.
     */
    // That's alias to max_lazy_match, don't use directly
    //this.max_insert_length = 0;
    /* Insert new strings in the hash table only if the match length is not
     * greater than this length. This saves time but degrades compression.
     * max_insert_length is used only for compression levels <= 3.
     */

    this.level = 0;     /* compression level (1..9) */
    this.strategy = 0;  /* favor or force Huffman coding*/

    this.good_match = 0;
    /* Use a faster search when the previous match is longer than this */

    this.nice_match = 0; /* Stop searching when current match exceeds this */

                /* used by trees.c: */

    /* Didn't use ct_data typedef below to suppress compiler warning */

    // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
    // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
    // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

    // Use flat array of DOUBLE size, with interleaved fata,
    // because JS does not support effective
    this.dyn_ltree  = new common.Buf16(HEAP_SIZE$1 * 2);
    this.dyn_dtree  = new common.Buf16((2 * D_CODES$1 + 1) * 2);
    this.bl_tree    = new common.Buf16((2 * BL_CODES$1 + 1) * 2);
    zero$1(this.dyn_ltree);
    zero$1(this.dyn_dtree);
    zero$1(this.bl_tree);

    this.l_desc   = null;         /* desc. for literal tree */
    this.d_desc   = null;         /* desc. for distance tree */
    this.bl_desc  = null;         /* desc. for bit length tree */

    //ush bl_count[MAX_BITS+1];
    this.bl_count = new common.Buf16(MAX_BITS$1 + 1);
    /* number of codes at each bit length for an optimal tree */

    //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
    this.heap = new common.Buf16(2 * L_CODES$1 + 1);  /* heap used to build the Huffman trees */
    zero$1(this.heap);

    this.heap_len = 0;               /* number of elements in the heap */
    this.heap_max = 0;               /* element of largest frequency */
    /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
     * The same heap array is used to build all trees.
     */

    this.depth = new common.Buf16(2 * L_CODES$1 + 1); //uch depth[2*L_CODES+1];
    zero$1(this.depth);
    /* Depth of each subtree used as tie breaker for trees of equal frequency
     */

    this.l_buf = 0;          /* buffer index for literals or lengths */

    this.lit_bufsize = 0;
    /* Size of match buffer for literals/lengths.  There are 4 reasons for
     * limiting lit_bufsize to 64K:
     *   - frequencies can be kept in 16 bit counters
     *   - if compression is not successful for the first block, all input
     *     data is still in the window so we can still emit a stored block even
     *     when input comes from standard input.  (This can also be done for
     *     all blocks if lit_bufsize is not greater than 32K.)
     *   - if compression is not successful for a file smaller than 64K, we can
     *     even emit a stored file instead of a stored block (saving 5 bytes).
     *     This is applicable only for zip (not gzip or zlib).
     *   - creating new Huffman trees less frequently may not provide fast
     *     adaptation to changes in the input data statistics. (Take for
     *     example a binary file with poorly compressible code followed by
     *     a highly compressible string table.) Smaller buffer sizes give
     *     fast adaptation but have of course the overhead of transmitting
     *     trees more frequently.
     *   - I can't count above 4
     */

    this.last_lit = 0;      /* running index in l_buf */

    this.d_buf = 0;
    /* Buffer index for distances. To simplify the code, d_buf and l_buf have
     * the same number of elements. To use different lengths, an extra flag
     * array would be necessary.
     */

    this.opt_len = 0;       /* bit length of current block with optimal trees */
    this.static_len = 0;    /* bit length of current block with static trees */
    this.matches = 0;       /* number of string matches in current block */
    this.insert = 0;        /* bytes at end of window left to insert */


    this.bi_buf = 0;
    /* Output buffer. bits are inserted starting at the bottom (least
     * significant bits).
     */
    this.bi_valid = 0;
    /* Number of valid bits in bi_buf.  All bits above the last valid bit
     * are always zero.
     */

    // Used for window memory init. We safely ignore it for JS. That makes
    // sense only for pointers and memory check tools.
    //this.high_water = 0;
    /* High water mark offset in window for initialized bytes -- bytes above
     * this are set to zero in order to avoid memory check warnings when
     * longest match routines access bytes past the input.  This is then
     * updated to the new high water mark.
     */
  }


  function deflateResetKeep(strm) {
    var s;

    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR);
    }

    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN$1;

    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;

    if (s.wrap < 0) {
      s.wrap = -s.wrap;
      /* was made negative by deflate(..., Z_FINISH); */
    }
    s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
    strm.adler = (s.wrap === 2) ?
      0  // crc32(0, Z_NULL, 0)
    :
      1; // adler32(0, Z_NULL, 0)
    s.last_flush = Z_NO_FLUSH;
    trees._tr_init(s);
    return Z_OK;
  }


  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK) {
      lm_init(strm.state);
    }
    return ret;
  }


  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) { return Z_STREAM_ERROR; }
    if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
    strm.state.gzhead = head;
    return Z_OK;
  }


  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) { // === Z_NULL
      return Z_STREAM_ERROR;
    }
    var wrap = 1;

    if (level === Z_DEFAULT_COMPRESSION) {
      level = 6;
    }

    if (windowBits < 0) { /* suppress zlib wrapper */
      wrap = 0;
      windowBits = -windowBits;
    }

    else if (windowBits > 15) {
      wrap = 2;           /* write gzip wrapper instead */
      windowBits -= 16;
    }


    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
      windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
      strategy < 0 || strategy > Z_FIXED$1) {
      return err(strm, Z_STREAM_ERROR);
    }


    if (windowBits === 8) {
      windowBits = 9;
    }
    /* until 256-byte window bug fixed */

    var s = new DeflateState();

    strm.state = s;
    s.strm = strm;

    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;

    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);

    s.window = new common.Buf8(s.w_size * 2);
    s.head = new common.Buf16(s.hash_size);
    s.prev = new common.Buf16(s.w_size);

    // Don't need mem init magic for JS.
    //s.high_water = 0;  /* nothing written to s->window yet */

    s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

    s.pending_buf_size = s.lit_bufsize * 4;

    //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
    //s->pending_buf = (uchf *) overlay;
    s.pending_buf = new common.Buf8(s.pending_buf_size);

    // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
    //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
    s.d_buf = 1 * s.lit_bufsize;

    //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;

    s.level = level;
    s.strategy = strategy;
    s.method = method;

    return deflateReset(strm);
  }

  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
  }


  function deflate(strm, flush) {
    var old_flush, s;
    var beg, val; // for gzip header write only

    if (!strm || !strm.state ||
      flush > Z_BLOCK || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
    }

    s = strm.state;

    if (!strm.output ||
        (!strm.input && strm.avail_in !== 0) ||
        (s.status === FINISH_STATE && flush !== Z_FINISH)) {
      return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
    }

    s.strm = strm; /* just in case */
    old_flush = s.last_flush;
    s.last_flush = flush;

    /* Write the header */
    if (s.status === INIT_STATE) {

      if (s.wrap === 2) { // GZIP header
        strm.adler = 0;  //crc32(0L, Z_NULL, 0);
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) { // s->gzhead == Z_NULL
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 :
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                       4 : 0));
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        }
        else {
          put_byte(s, (s.gzhead.text ? 1 : 0) +
                      (s.gzhead.hcrc ? 2 : 0) +
                      (!s.gzhead.extra ? 0 : 4) +
                      (!s.gzhead.name ? 0 : 8) +
                      (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 0xff);
          put_byte(s, (s.gzhead.time >> 8) & 0xff);
          put_byte(s, (s.gzhead.time >> 16) & 0xff);
          put_byte(s, (s.gzhead.time >> 24) & 0xff);
          put_byte(s, s.level === 9 ? 2 :
                      (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                       4 : 0));
          put_byte(s, s.gzhead.os & 0xff);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 0xff);
            put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      }
      else // DEFLATE header
      {
        var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
        var level_flags = -1;

        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= (level_flags << 6);
        if (s.strstart !== 0) { header |= PRESET_DICT; }
        header += 31 - (header % 31);

        s.status = BUSY_STATE;
        putShortMSB(s, header);

        /* Save the adler32 of the preset dictionary: */
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
        strm.adler = 1; // adler32(0L, Z_NULL, 0);
      }
    }

  //#ifdef GZIP
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra/* != Z_NULL*/) {
        beg = s.pending;  /* start of bytes to update crc */

        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      }
      else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name/* != Z_NULL*/) {
        beg = s.pending;  /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      }
      else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment/* != Z_NULL*/) {
        beg = s.pending;  /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      }
      else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          strm.adler = 0; //crc32(0L, Z_NULL, 0);
          s.status = BUSY_STATE;
        }
      }
      else {
        s.status = BUSY_STATE;
      }
    }
  //#endif

    /* Flush as much pending output as possible */
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        /* Since avail_out is 0, deflate will be called again with
         * more output space, but possibly with both pending and
         * avail_in equal to zero. There won't be anything to do,
         * but this is not an error situation so make sure we
         * return OK instead of BUF_ERROR at next call of deflate:
         */
        s.last_flush = -1;
        return Z_OK;
      }

      /* Make sure there is something to do and avoid duplicate consecutive
       * flushes. For repeated and useless calls with Z_FINISH, we keep
       * returning Z_STREAM_END instead of Z_BUF_ERROR.
       */
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
      flush !== Z_FINISH) {
      return err(strm, Z_BUF_ERROR);
    }

    /* User must not provide more input after the first FINISH: */
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR);
    }

    /* Start a new block or continue the current one.
     */
    if (strm.avail_in !== 0 || s.lookahead !== 0 ||
      (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
      var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
        (s.strategy === Z_RLE ? deflate_rle(s, flush) :
          configuration_table[s.level].func(s, flush));

      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          /* avoid BUF_ERROR next call, see above */
        }
        return Z_OK;
        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
         * of deflate should use the same flush parameter to make sure
         * that the flush is complete. So we don't have to output an
         * empty block here, this will be done at next call. This also
         * ensures that for a very small output buffer, we emit at most
         * one empty block.
         */
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        }
        else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

          trees._tr_stored_block(s, 0, 0, false);
          /* For a full flush, this empty block will be recognized
           * as a special marker by inflate_sync().
           */
          if (flush === Z_FULL_FLUSH) {
            /*** CLEAR_HASH(s); ***/             /* forget history */
            zero$1(s.head); // Fill with NIL (= 0);

            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
          return Z_OK;
        }
      }
    }
    //Assert(strm->avail_out > 0, "bug2");
    //if (strm.avail_out <= 0) { throw new Error("bug2");}

    if (flush !== Z_FINISH) { return Z_OK; }
    if (s.wrap <= 0) { return Z_STREAM_END; }

    /* Write the trailer */
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 0xff);
      put_byte(s, (strm.adler >> 8) & 0xff);
      put_byte(s, (strm.adler >> 16) & 0xff);
      put_byte(s, (strm.adler >> 24) & 0xff);
      put_byte(s, strm.total_in & 0xff);
      put_byte(s, (strm.total_in >> 8) & 0xff);
      put_byte(s, (strm.total_in >> 16) & 0xff);
      put_byte(s, (strm.total_in >> 24) & 0xff);
    }
    else
    {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }

    flush_pending(strm);
    /* If avail_out is zero, the application will call deflate again
     * to flush the rest.
     */
    if (s.wrap > 0) { s.wrap = -s.wrap; }
    /* write the trailer only once! */
    return s.pending !== 0 ? Z_OK : Z_STREAM_END;
  }

  function deflateEnd(strm) {
    var status;

    if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
      return Z_STREAM_ERROR;
    }

    status = strm.state.status;
    if (status !== INIT_STATE &&
      status !== EXTRA_STATE &&
      status !== NAME_STATE &&
      status !== COMMENT_STATE &&
      status !== HCRC_STATE &&
      status !== BUSY_STATE &&
      status !== FINISH_STATE
    ) {
      return err(strm, Z_STREAM_ERROR);
    }

    strm.state = null;

    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
  }


  /* =========================================================================
   * Initializes the compression dictionary from the given byte
   * sequence without producing any compressed output.
   */
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;

    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;

    if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
      return Z_STREAM_ERROR;
    }

    s = strm.state;
    wrap = s.wrap;

    if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
      return Z_STREAM_ERROR;
    }

    /* when using zlib wrappers, compute Adler-32 for provided dictionary */
    if (wrap === 1) {
      /* adler32(strm->adler, dictionary, dictLength); */
      strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
    }

    s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

    /* if dictionary would fill window, just replace the history */
    if (dictLength >= s.w_size) {
      if (wrap === 0) {            /* already empty otherwise */
        /*** CLEAR_HASH(s); ***/
        zero$1(s.head); // Fill with NIL (= 0);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      /* use the tail */
      // dictionary = dictionary.slice(dictLength - s.w_size);
      tmpDict = new common.Buf8(s.w_size);
      common.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    /* insert dictionary into window and hash */
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH$1) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH$1 - 1);
      do {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];

        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH$1 - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH$1 - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK;
  }


  var deflateInit_1 = deflateInit;
  var deflateInit2_1 = deflateInit2;
  var deflateReset_1 = deflateReset;
  var deflateResetKeep_1 = deflateResetKeep;
  var deflateSetHeader_1 = deflateSetHeader;
  var deflate_2 = deflate;
  var deflateEnd_1 = deflateEnd;
  var deflateSetDictionary_1 = deflateSetDictionary;
  var deflateInfo = 'pako deflate (from Nodeca project)';

  /* Not implemented
  exports.deflateBound = deflateBound;
  exports.deflateCopy = deflateCopy;
  exports.deflateParams = deflateParams;
  exports.deflatePending = deflatePending;
  exports.deflatePrime = deflatePrime;
  exports.deflateTune = deflateTune;
  */

  var deflate_1 = {
  	deflateInit: deflateInit_1,
  	deflateInit2: deflateInit2_1,
  	deflateReset: deflateReset_1,
  	deflateResetKeep: deflateResetKeep_1,
  	deflateSetHeader: deflateSetHeader_1,
  	deflate: deflate_2,
  	deflateEnd: deflateEnd_1,
  	deflateSetDictionary: deflateSetDictionary_1,
  	deflateInfo: deflateInfo
  };

  // Quick check if we can use fast array to bin string conversion
  //
  // - apply(Array) can fail on Android 2.2
  // - apply(Uint8Array) can fail on iOS 5.1 Safari
  //
  var STR_APPLY_OK = true;
  var STR_APPLY_UIA_OK = true;

  try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
  try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


  // Table with utf8 lengths (calculated by first byte of sequence)
  // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
  // because max possible codepoint is 0x10ffff
  var _utf8len = new common.Buf8(256);
  for (var q = 0; q < 256; q++) {
    _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
  }
  _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


  // convert string to array (typed, when possible)
  var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 0xfc00) === 0xdc00) {
          c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
          m_pos++;
        }
      }
      buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    buf = new common.Buf8(buf_len);

    // convert
    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 0xfc00) === 0xdc00) {
          c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
          m_pos++;
        }
      }
      if (c < 0x80) {
        /* one byte */
        buf[i++] = c;
      } else if (c < 0x800) {
        /* two bytes */
        buf[i++] = 0xC0 | (c >>> 6);
        buf[i++] = 0x80 | (c & 0x3f);
      } else if (c < 0x10000) {
        /* three bytes */
        buf[i++] = 0xE0 | (c >>> 12);
        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
        buf[i++] = 0x80 | (c & 0x3f);
      } else {
        /* four bytes */
        buf[i++] = 0xf0 | (c >>> 18);
        buf[i++] = 0x80 | (c >>> 12 & 0x3f);
        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
        buf[i++] = 0x80 | (c & 0x3f);
      }
    }

    return buf;
  };

  // Helper (used in 2 places)
  function buf2binstring(buf, len) {
    // On Chrome, the arguments in a function call that are allowed is `65534`.
    // If the length of the buffer is smaller than that, we can use this optimization,
    // otherwise we will take a slower path.
    if (len < 65534) {
      if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
        return String.fromCharCode.apply(null, common.shrinkBuf(buf, len));
      }
    }

    var result = '';
    for (var i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  }


  // Convert byte array to binary string
  var buf2binstring_1 = function (buf) {
    return buf2binstring(buf, buf.length);
  };


  // Convert binary string (typed, when possible)
  var binstring2buf = function (str) {
    var buf = new common.Buf8(str.length);
    for (var i = 0, len = buf.length; i < len; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  };


  // convert array to string
  var buf2string = function (buf, max) {
    var i, out, c, c_len;
    var len = max || buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len * 2);

    for (out = 0, i = 0; i < len;) {
      c = buf[i++];
      // quick process ascii
      if (c < 0x80) { utf16buf[out++] = c; continue; }

      c_len = _utf8len[c];
      // skip 5 & 6 byte codes
      if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

      // apply mask on first byte
      c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
      // join the rest
      while (c_len > 1 && i < len) {
        c = (c << 6) | (buf[i++] & 0x3f);
        c_len--;
      }

      // terminated by end of string?
      if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

      if (c < 0x10000) {
        utf16buf[out++] = c;
      } else {
        c -= 0x10000;
        utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
        utf16buf[out++] = 0xdc00 | (c & 0x3ff);
      }
    }

    return buf2binstring(utf16buf, out);
  };


  // Calculate max possible position in utf8 buffer,
  // that will not break sequence. If that's not possible
  // - (very small limits) return max size as is.
  //
  // buf[] - utf8 bytes array
  // max   - length limit (mandatory);
  var utf8border = function (buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means buffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
  };

  var strings = {
  	string2buf: string2buf,
  	buf2binstring: buf2binstring_1,
  	binstring2buf: binstring2buf,
  	buf2string: buf2string,
  	utf8border: utf8border
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  function ZStream() {
    /* next input byte */
    this.input = null; // JS specific, because we have no pointers
    this.next_in = 0;
    /* number of bytes available at input */
    this.avail_in = 0;
    /* total number of input bytes read so far */
    this.total_in = 0;
    /* next output byte should be put there */
    this.output = null; // JS specific, because we have no pointers
    this.next_out = 0;
    /* remaining free space at output */
    this.avail_out = 0;
    /* total number of bytes output so far */
    this.total_out = 0;
    /* last error message, NULL if no error */
    this.msg = ''/*Z_NULL*/;
    /* not visible by applications */
    this.state = null;
    /* best guess about the data type: binary or text */
    this.data_type = 2/*Z_UNKNOWN*/;
    /* adler32 value of the uncompressed data */
    this.adler = 0;
  }

  var zstream = ZStream;

  var toString$1 = Object.prototype.toString;

  /* Public constants ==========================================================*/
  /* ===========================================================================*/

  var Z_NO_FLUSH$1      = 0;
  var Z_FINISH$1        = 4;

  var Z_OK$1            = 0;
  var Z_STREAM_END$1    = 1;
  var Z_SYNC_FLUSH    = 2;

  var Z_DEFAULT_COMPRESSION$1 = -1;

  var Z_DEFAULT_STRATEGY$1    = 0;

  var Z_DEFLATED$1  = 8;

  /* ===========================================================================*/


  /**
   * class Deflate
   *
   * Generic JS-style wrapper for zlib calls. If you don't need
   * streaming behaviour - use more simple functions: [[deflate]],
   * [[deflateRaw]] and [[gzip]].
   **/

  /* internal
   * Deflate.chunks -> Array
   *
   * Chunks of output data, if [[Deflate#onData]] not overridden.
   **/

  /**
   * Deflate.result -> Uint8Array|Array
   *
   * Compressed result, generated by default [[Deflate#onData]]
   * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
   * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
   * push a chunk with explicit flush (call [[Deflate#push]] with
   * `Z_SYNC_FLUSH` param).
   **/

  /**
   * Deflate.err -> Number
   *
   * Error code after deflate finished. 0 (Z_OK) on success.
   * You will not need it in real life, because deflate errors
   * are possible only on wrong options or bad `onData` / `onEnd`
   * custom handlers.
   **/

  /**
   * Deflate.msg -> String
   *
   * Error message, if [[Deflate.err]] != 0
   **/


  /**
   * new Deflate(options)
   * - options (Object): zlib deflate options.
   *
   * Creates new deflator instance with specified params. Throws exception
   * on bad params. Supported options:
   *
   * - `level`
   * - `windowBits`
   * - `memLevel`
   * - `strategy`
   * - `dictionary`
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Additional options, for internal needs:
   *
   * - `chunkSize` - size of generated data chunks (16K by default)
   * - `raw` (Boolean) - do raw deflate
   * - `gzip` (Boolean) - create gzip wrapper
   * - `to` (String) - if equal to 'string', then result will be "binary string"
   *    (each char code [0..255])
   * - `header` (Object) - custom header for gzip
   *   - `text` (Boolean) - true if compressed data believed to be text
   *   - `time` (Number) - modification time, unix timestamp
   *   - `os` (Number) - operation system code
   *   - `extra` (Array) - array of bytes with extra data (max 65536)
   *   - `name` (String) - file name (binary string)
   *   - `comment` (String) - comment (binary string)
   *   - `hcrc` (Boolean) - true if header crc should be added
   *
   * ##### Example:
   *
   * ```javascript
   * var pako = require('pako')
   *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
   *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
   *
   * var deflate = new pako.Deflate({ level: 3});
   *
   * deflate.push(chunk1, false);
   * deflate.push(chunk2, true);  // true -> last chunk
   *
   * if (deflate.err) { throw new Error(deflate.err); }
   *
   * console.log(deflate.result);
   * ```
   **/
  function Deflate(options) {
    if (!(this instanceof Deflate)) return new Deflate(options);

    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION$1,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY$1,
      to: ''
    }, options || {});

    var opt = this.options;

    if (opt.raw && (opt.windowBits > 0)) {
      opt.windowBits = -opt.windowBits;
    }

    else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
      opt.windowBits += 16;
    }

    this.err    = 0;      // error code, if happens (0 = Z_OK)
    this.msg    = '';     // error message
    this.ended  = false;  // used to avoid multiple onEnd() calls
    this.chunks = [];     // chunks of compressed data

    this.strm = new zstream();
    this.strm.avail_out = 0;

    var status = deflate_1.deflateInit2(
      this.strm,
      opt.level,
      opt.method,
      opt.windowBits,
      opt.memLevel,
      opt.strategy
    );

    if (status !== Z_OK$1) {
      throw new Error(messages$1[status]);
    }

    if (opt.header) {
      deflate_1.deflateSetHeader(this.strm, opt.header);
    }

    if (opt.dictionary) {
      var dict;
      // Convert data if needed
      if (typeof opt.dictionary === 'string') {
        // If we need to compress text, change encoding to utf8.
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }

      status = deflate_1.deflateSetDictionary(this.strm, dict);

      if (status !== Z_OK$1) {
        throw new Error(messages$1[status]);
      }

      this._dict_set = true;
    }
  }

  /**
   * Deflate#push(data[, mode]) -> Boolean
   * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
   *   converted to utf8 byte sequence.
   * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
   *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
   *
   * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
   * new compressed chunks. Returns `true` on success. The last data block must have
   * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
   * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
   * can use mode Z_SYNC_FLUSH, keeping the compression context.
   *
   * On fail call [[Deflate#onEnd]] with error code and return false.
   *
   * We strongly recommend to use `Uint8Array` on input for best speed (output
   * array format is detected automatically). Also, don't skip last param and always
   * use the same type in your code (boolean or number). That will improve JS speed.
   *
   * For regular `Array`-s make sure all elements are [0..255].
   *
   * ##### Example
   *
   * ```javascript
   * push(chunk, false); // push one of data chunks
   * ...
   * push(chunk, true);  // push last chunk
   * ```
   **/
  Deflate.prototype.push = function (data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var status, _mode;

    if (this.ended) { return false; }

    _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH$1 : Z_NO_FLUSH$1);

    // Convert data if needed
    if (typeof data === 'string') {
      // If we need to compress text, change encoding to utf8.
      strm.input = strings.string2buf(data);
    } else if (toString$1.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    do {
      if (strm.avail_out === 0) {
        strm.output = new common.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = deflate_1.deflate(strm, _mode);    /* no bad return value */

      if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH))) {
        if (this.options.to === 'string') {
          this.onData(strings.buf2binstring(common.shrinkBuf(strm.output, strm.next_out)));
        } else {
          this.onData(common.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);

    // Finalize on the last chunk.
    if (_mode === Z_FINISH$1) {
      status = deflate_1.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$1;
    }

    // callback interim results if Z_SYNC_FLUSH.
    if (_mode === Z_SYNC_FLUSH) {
      this.onEnd(Z_OK$1);
      strm.avail_out = 0;
      return true;
    }

    return true;
  };


  /**
   * Deflate#onData(chunk) -> Void
   * - chunk (Uint8Array|Array|String): output data. Type of array depends
   *   on js engine support. When string output requested, each chunk
   *   will be string.
   *
   * By default, stores data blocks in `chunks[]` property and glue
   * those in `onEnd`. Override this handler, if you need another behaviour.
   **/
  Deflate.prototype.onData = function (chunk) {
    this.chunks.push(chunk);
  };


  /**
   * Deflate#onEnd(status) -> Void
   * - status (Number): deflate status. 0 (Z_OK) on success,
   *   other if not.
   *
   * Called once after you tell deflate that the input stream is
   * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
   * or if an error happened. By default - join collected chunks,
   * free memory and fill `results` / `err` properties.
   **/
  Deflate.prototype.onEnd = function (status) {
    // On success - join
    if (status === Z_OK$1) {
      if (this.options.to === 'string') {
        this.result = this.chunks.join('');
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };


  /**
   * deflate(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * Compress `data` with deflate algorithm and `options`.
   *
   * Supported options are:
   *
   * - level
   * - windowBits
   * - memLevel
   * - strategy
   * - dictionary
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Sugar (options):
   *
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
   *   negative windowBits implicitly.
   * - `to` (String) - if equal to 'string', then result will be "binary string"
   *    (each char code [0..255])
   *
   * ##### Example:
   *
   * ```javascript
   * var pako = require('pako')
   *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
   *
   * console.log(pako.deflate(data));
   * ```
   **/
  function deflate$1(input, options) {
    var deflator = new Deflate(options);

    deflator.push(input, true);

    // That will never happens, if you don't cheat with options :)
    if (deflator.err) { throw deflator.msg || messages$1[deflator.err]; }

    return deflator.result;
  }


  /**
   * deflateRaw(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * The same as [[deflate]], but creates raw data, without wrapper
   * (header and adler32 crc).
   **/
  function deflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }


  /**
   * gzip(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * The same as [[deflate]], but create gzip wrapper instead of
   * deflate one.
   **/
  function gzip(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }


  var Deflate_1 = Deflate;
  var deflate_2$1 = deflate$1;
  var deflateRaw_1 = deflateRaw;
  var gzip_1 = gzip;

  var deflate_1$1 = {
  	Deflate: Deflate_1,
  	deflate: deflate_2$1,
  	deflateRaw: deflateRaw_1,
  	gzip: gzip_1
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  // See state defs from inflate.js
  var BAD = 30;       /* got a data error -- remain here until reset */
  var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

  /*
     Decode literal, length, and distance codes and write out the resulting
     literal and match bytes until either not enough input or output is
     available, an end-of-block is encountered, or a data error is encountered.
     When large enough input and output buffers are supplied to inflate(), for
     example, a 16K input buffer and a 64K output buffer, more than 95% of the
     inflate execution time is spent in this routine.

     Entry assumptions:

          state.mode === LEN
          strm.avail_in >= 6
          strm.avail_out >= 258
          start >= strm.avail_out
          state.bits < 8

     On return, state.mode is one of:

          LEN -- ran out of enough output space or enough available input
          TYPE -- reached end of block code, inflate() to interpret next block
          BAD -- error in block data

     Notes:

      - The maximum input bits used by a length/distance pair is 15 bits for the
        length code, 5 bits for the length extra, 15 bits for the distance code,
        and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
        Therefore if strm.avail_in >= 6, then there is enough input to avoid
        checking for available input while decoding.

      - The maximum bytes that a single length/distance pair can output is 258
        bytes, which is the maximum length that can be coded.  inflate_fast()
        requires strm.avail_out >= 258 for each loop to avoid checking for
        output space.
   */
  var inffast = function inflate_fast(strm, start) {
    var state;
    var _in;                    /* local strm.input */
    var last;                   /* have enough input while in < last */
    var _out;                   /* local strm.output */
    var beg;                    /* inflate()'s initial strm.output */
    var end;                    /* while out < end, enough space available */
  //#ifdef INFLATE_STRICT
    var dmax;                   /* maximum distance from zlib header */
  //#endif
    var wsize;                  /* window size or zero if not using window */
    var whave;                  /* valid bytes in the window */
    var wnext;                  /* window write index */
    // Use `s_window` instead `window`, avoid conflict with instrumentation tools
    var s_window;               /* allocated sliding window, if wsize != 0 */
    var hold;                   /* local strm.hold */
    var bits;                   /* local strm.bits */
    var lcode;                  /* local strm.lencode */
    var dcode;                  /* local strm.distcode */
    var lmask;                  /* mask for first level of length codes */
    var dmask;                  /* mask for first level of distance codes */
    var here;                   /* retrieved table entry */
    var op;                     /* code bits, operation, extra bits, or */
                                /*  window position, window bytes to copy */
    var len;                    /* match length, unused bytes */
    var dist;                   /* match distance */
    var from;                   /* where to copy match from */
    var from_source;


    var input, output; // JS specific, because we have no pointers

    /* copy state to local variables */
    state = strm.state;
    //here = state.here;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
  //#ifdef INFLATE_STRICT
    dmax = state.dmax;
  //#endif
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;


    /* decode literals and length/distances until end-of-block or not enough
       input data or output space */

    top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }

      here = lcode[hold & lmask];

      dolen:
      for (;;) { // Goto emulation
        op = here >>> 24/*here.bits*/;
        hold >>>= op;
        bits -= op;
        op = (here >>> 16) & 0xff/*here.op*/;
        if (op === 0) {                          /* literal */
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          output[_out++] = here & 0xffff/*here.val*/;
        }
        else if (op & 16) {                     /* length base */
          len = here & 0xffff/*here.val*/;
          op &= 15;                           /* number of extra bits */
          if (op) {
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
            }
            len += hold & ((1 << op) - 1);
            hold >>>= op;
            bits -= op;
          }
          //Tracevv((stderr, "inflate:         length %u\n", len));
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = dcode[hold & dmask];

          dodist:
          for (;;) { // goto emulation
            op = here >>> 24/*here.bits*/;
            hold >>>= op;
            bits -= op;
            op = (here >>> 16) & 0xff/*here.op*/;

            if (op & 16) {                      /* distance base */
              dist = here & 0xffff/*here.val*/;
              op &= 15;                       /* number of extra bits */
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
              }
              dist += hold & ((1 << op) - 1);
  //#ifdef INFLATE_STRICT
              if (dist > dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break top;
              }
  //#endif
              hold >>>= op;
              bits -= op;
              //Tracevv((stderr, "inflate:         distance %u\n", dist));
              op = _out - beg;                /* max distance in output */
              if (dist > op) {                /* see if copy from window */
                op = dist - op;               /* distance back in window */
                if (op > whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break top;
                  }

  // (!) This block is disabled in zlib defaults,
  // don't enable it for binary compatibility
  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
  //                if (len <= op - whave) {
  //                  do {
  //                    output[_out++] = 0;
  //                  } while (--len);
  //                  continue top;
  //                }
  //                len -= op - whave;
  //                do {
  //                  output[_out++] = 0;
  //                } while (--op > whave);
  //                if (op === 0) {
  //                  from = _out - dist;
  //                  do {
  //                    output[_out++] = output[from++];
  //                  } while (--len);
  //                  continue top;
  //                }
  //#endif
                }
                from = 0; // window index
                from_source = s_window;
                if (wnext === 0) {           /* very common case */
                  from += wsize - op;
                  if (op < len) {         /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;  /* rest from output */
                    from_source = output;
                  }
                }
                else if (wnext < op) {      /* wrap around window */
                  from += wsize + wnext - op;
                  op -= wnext;
                  if (op < len) {         /* some from end of window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = 0;
                    if (wnext < len) {  /* some from start of window */
                      op = wnext;
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;      /* rest from output */
                      from_source = output;
                    }
                  }
                }
                else {                      /* contiguous in window */
                  from += wnext - op;
                  if (op < len) {         /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;  /* rest from output */
                    from_source = output;
                  }
                }
                while (len > 2) {
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  len -= 3;
                }
                if (len) {
                  output[_out++] = from_source[from++];
                  if (len > 1) {
                    output[_out++] = from_source[from++];
                  }
                }
              }
              else {
                from = _out - dist;          /* copy direct from output */
                do {                        /* minimum length is three */
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  len -= 3;
                } while (len > 2);
                if (len) {
                  output[_out++] = output[from++];
                  if (len > 1) {
                    output[_out++] = output[from++];
                  }
                }
              }
            }
            else if ((op & 64) === 0) {          /* 2nd level distance code */
              here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
              continue dodist;
            }
            else {
              strm.msg = 'invalid distance code';
              state.mode = BAD;
              break top;
            }

            break; // need to emulate goto via "continue"
          }
        }
        else if ((op & 64) === 0) {              /* 2nd level length code */
          here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
          continue dolen;
        }
        else if (op & 32) {                     /* end-of-block */
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.mode = TYPE;
          break top;
        }
        else {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break top;
        }

        break; // need to emulate goto via "continue"
      }
    } while (_in < last && _out < end);

    /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;

    /* update state and return */
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
    strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
    state.hold = hold;
    state.bits = bits;
    return;
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.



  var MAXBITS = 15;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;

  var lbase = [ /* Length codes 257..285 base */
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
    35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
  ];

  var lext = [ /* Length codes 257..285 extra */
    16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
    19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
  ];

  var dbase = [ /* Distance codes 0..29 base */
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
    257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
    8193, 12289, 16385, 24577, 0, 0
  ];

  var dext = [ /* Distance codes 0..29 extra */
    16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
    23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
    28, 28, 29, 29, 64, 64
  ];

  var inftrees = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
  {
    var bits = opts.bits;
        //here = opts.here; /* table entry for duplication */

    var len = 0;               /* a code's length in bits */
    var sym = 0;               /* index of code symbols */
    var min = 0, max = 0;          /* minimum and maximum code lengths */
    var root = 0;              /* number of index bits for root table */
    var curr = 0;              /* number of index bits for current table */
    var drop = 0;              /* code bits to drop for sub-table */
    var left = 0;                   /* number of prefix codes available */
    var used = 0;              /* code entries in table used */
    var huff = 0;              /* Huffman code */
    var incr;              /* for incrementing code, index */
    var fill;              /* index for replicating entries */
    var low;               /* low bits for current root entry */
    var mask;              /* mask for low root bits */
    var next;             /* next available space in table */
    var base = null;     /* base value table to use */
    var base_index = 0;
  //  var shoextra;    /* extra bits table to use */
    var end;                    /* use base and extra for symbol > end */
    var count = new common.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
    var offs = new common.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
    var extra = null;
    var extra_index = 0;

    var here_bits, here_op, here_val;

    /*
     Process a set of code lengths to create a canonical Huffman code.  The
     code lengths are lens[0..codes-1].  Each length corresponds to the
     symbols 0..codes-1.  The Huffman code is generated by first sorting the
     symbols by length from short to long, and retaining the symbol order
     for codes with equal lengths.  Then the code starts with all zero bits
     for the first code of the shortest length, and the codes are integer
     increments for the same length, and zeros are appended as the length
     increases.  For the deflate format, these bits are stored backwards
     from their more natural integer increment ordering, and so when the
     decoding tables are built in the large loop below, the integer codes
     are incremented backwards.

     This routine assumes, but does not check, that all of the entries in
     lens[] are in the range 0..MAXBITS.  The caller must assure this.
     1..MAXBITS is interpreted as that code length.  zero means that that
     symbol does not occur in this code.

     The codes are sorted by computing a count of codes for each length,
     creating from that a table of starting indices for each length in the
     sorted table, and then entering the symbols in order in the sorted
     table.  The sorted table is work[], with that space being provided by
     the caller.

     The length counts are used for other purposes as well, i.e. finding
     the minimum and maximum length codes, determining if there are any
     codes at all, checking for a valid set of lengths, and looking ahead
     at length counts to determine sub-table sizes when building the
     decoding tables.
     */

    /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }

    /* bound code lengths, force root to be within code lengths */
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) { break; }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {                     /* no symbols to code at all */
      //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
      //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
      //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;


      //table.op[opts.table_index] = 64;
      //table.bits[opts.table_index] = 1;
      //table.val[opts.table_index++] = 0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;

      opts.bits = 1;
      return 0;     /* no symbols, but wait for decoding to report error */
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) { break; }
    }
    if (root < min) {
      root = min;
    }

    /* check for an over-subscribed or incomplete set of lengths */
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }        /* over-subscribed */
    }
    if (left > 0 && (type === CODES || max !== 1)) {
      return -1;                      /* incomplete set */
    }

    /* generate offsets into symbol table for each length for sorting */
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }

    /* sort symbols by length, by symbol order within each length */
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }

    /*
     Create and fill in decoding tables.  In this loop, the table being
     filled is at next and has curr index bits.  The code being used is huff
     with length len.  That code is converted to an index by dropping drop
     bits off of the bottom.  For codes where len is less than drop + curr,
     those top drop + curr - len bits are incremented through all values to
     fill the table with replicated entries.

     root is the number of index bits for the root table.  When len exceeds
     root, sub-tables are created pointed to by the root entry with an index
     of the low root bits of huff.  This is saved in low to check for when a
     new sub-table should be started.  drop is zero when the root table is
     being filled, and drop is root when sub-tables are being filled.

     When a new sub-table is needed, it is necessary to look ahead in the
     code lengths to determine what size sub-table is needed.  The length
     counts are used for this, and so count[] is decremented as codes are
     entered in the tables.

     used keeps track of how many table entries have been allocated from the
     provided *table space.  It is checked for LENS and DIST tables against
     the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
     the initial root table size constants.  See the comments in inftrees.h
     for more information.

     sym increments through all symbols, and the loop terminates when
     all codes of length max, i.e. all codes, have been processed.  This
     routine permits incomplete codes, so another loop after this one fills
     in the rest of the decoding tables with invalid code markers.
     */

    /* set up for code type */
    // poor man optimization - use if-else instead of switch,
    // to avoid deopts in old v8
    if (type === CODES) {
      base = extra = work;    /* dummy value--not used */
      end = 19;

    } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;

    } else {                    /* DISTS */
      base = dbase;
      extra = dext;
      end = -1;
    }

    /* initialize opts for loop */
    huff = 0;                   /* starting code */
    sym = 0;                    /* starting code symbol */
    len = min;                  /* starting code length */
    next = table_index;              /* current table to fill in */
    curr = root;                /* current table index bits */
    drop = 0;                   /* current bits to drop from code for index */
    low = -1;                   /* trigger new sub-table when len > root */
    used = 1 << root;          /* use root table entries */
    mask = used - 1;            /* mask for comparing low */

    /* check available table space */
    if ((type === LENS && used > ENOUGH_LENS) ||
      (type === DISTS && used > ENOUGH_DISTS)) {
      return 1;
    }

    /* process all codes and make table entries */
    for (;;) {
      /* create table entry */
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      }
      else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      }
      else {
        here_op = 32 + 64;         /* end of block */
        here_val = 0;
      }

      /* replicate for those indices with low len bits equal to huff */
      incr = 1 << (len - drop);
      fill = 1 << curr;
      min = fill;                 /* save offset to next table */
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
      } while (fill !== 0);

      /* backwards increment the len-bit code huff */
      incr = 1 << (len - 1);
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }

      /* go to next symbol, update count, len */
      sym++;
      if (--count[len] === 0) {
        if (len === max) { break; }
        len = lens[lens_index + work[sym]];
      }

      /* create new sub-table if needed */
      if (len > root && (huff & mask) !== low) {
        /* if first time, transition to sub-tables */
        if (drop === 0) {
          drop = root;
        }

        /* increment past last table */
        next += min;            /* here min is 1 << curr */

        /* determine length of next table */
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) { break; }
          curr++;
          left <<= 1;
        }

        /* check for enough space */
        used += 1 << curr;
        if ((type === LENS && used > ENOUGH_LENS) ||
          (type === DISTS && used > ENOUGH_DISTS)) {
          return 1;
        }

        /* point entry in root table to sub-table */
        low = huff & mask;
        /*table.op[low] = curr;
        table.bits[low] = root;
        table.val[low] = next - opts.table_index;*/
        table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
      }
    }

    /* fill in remaining table entry if code is incomplete (guaranteed to have
     at most one remaining entry, since if the code is incomplete, the
     maximum code length that was allowed to get this far is one bit) */
    if (huff !== 0) {
      //table.op[next + huff] = 64;            /* invalid code marker */
      //table.bits[next + huff] = len - drop;
      //table.val[next + huff] = 0;
      table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
    }

    /* set return parameters */
    //opts.table_index += used;
    opts.bits = root;
    return 0;
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.







  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;

  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  /* Allowed flush values; see deflate() and inflate() below for details */
  //var Z_NO_FLUSH      = 0;
  //var Z_PARTIAL_FLUSH = 1;
  //var Z_SYNC_FLUSH    = 2;
  //var Z_FULL_FLUSH    = 3;
  var Z_FINISH$2        = 4;
  var Z_BLOCK$1         = 5;
  var Z_TREES         = 6;


  /* Return codes for the compression/decompression functions. Negative values
   * are errors, positive values are used for special but normal events.
   */
  var Z_OK$2            = 0;
  var Z_STREAM_END$2    = 1;
  var Z_NEED_DICT     = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR$1  = -2;
  var Z_DATA_ERROR$1    = -3;
  var Z_MEM_ERROR     = -4;
  var Z_BUF_ERROR$1     = -5;
  //var Z_VERSION_ERROR = -6;

  /* The deflate compression method */
  var Z_DEFLATED$2  = 8;


  /* STATES ====================================================================*/
  /* ===========================================================================*/


  var    HEAD = 1;       /* i: waiting for magic header */
  var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
  var    TIME = 3;       /* i: waiting for modification time (gzip) */
  var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
  var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
  var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
  var    NAME = 7;       /* i: waiting for end of file name (gzip) */
  var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
  var    HCRC = 9;       /* i: waiting for header crc (gzip) */
  var    DICTID = 10;    /* i: waiting for dictionary check value */
  var    DICT = 11;      /* waiting for inflateSetDictionary() call */
  var        TYPE$1 = 12;      /* i: waiting for type bits, including last-flag bit */
  var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
  var        STORED = 14;    /* i: waiting for stored size (length and complement) */
  var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
  var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
  var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
  var        LENLENS = 18;   /* i: waiting for code length code lengths */
  var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
  var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
  var            LEN = 21;       /* i: waiting for length/lit/eob code */
  var            LENEXT = 22;    /* i: waiting for length extra bits */
  var            DIST = 23;      /* i: waiting for distance code */
  var            DISTEXT = 24;   /* i: waiting for distance extra bits */
  var            MATCH = 25;     /* o: waiting for output space to copy string */
  var            LIT = 26;       /* o: waiting for output space to write literal */
  var    CHECK = 27;     /* i: waiting for 32-bit check value */
  var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
  var    DONE = 29;      /* finished check, done -- remain here until reset */
  var    BAD$1 = 30;       /* got a data error -- remain here until reset */
  var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
  var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

  /* ===========================================================================*/



  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

  var MAX_WBITS$1 = 15;
  /* 32K LZ77 window */
  var DEF_WBITS = MAX_WBITS$1;


  function zswap32(q) {
    return  (((q >>> 24) & 0xff) +
            ((q >>> 8) & 0xff00) +
            ((q & 0xff00) << 8) +
            ((q & 0xff) << 24));
  }


  function InflateState() {
    this.mode = 0;             /* current inflate mode */
    this.last = false;          /* true if processing last block */
    this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
    this.havedict = false;      /* true if dictionary provided */
    this.flags = 0;             /* gzip header method and flags (0 if zlib) */
    this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
    this.check = 0;             /* protected copy of check value */
    this.total = 0;             /* protected copy of output count */
    // TODO: may be {}
    this.head = null;           /* where to save gzip header information */

    /* sliding window */
    this.wbits = 0;             /* log base 2 of requested window size */
    this.wsize = 0;             /* window size or zero if not using window */
    this.whave = 0;             /* valid bytes in the window */
    this.wnext = 0;             /* window write index */
    this.window = null;         /* allocated sliding window, if needed */

    /* bit accumulator */
    this.hold = 0;              /* input bit accumulator */
    this.bits = 0;              /* number of bits in "in" */

    /* for string and stored block copying */
    this.length = 0;            /* literal or length of data to copy */
    this.offset = 0;            /* distance back to copy string from */

    /* for table and code decoding */
    this.extra = 0;             /* extra bits needed */

    /* fixed and dynamic code tables */
    this.lencode = null;          /* starting table for length/literal codes */
    this.distcode = null;         /* starting table for distance codes */
    this.lenbits = 0;           /* index bits for lencode */
    this.distbits = 0;          /* index bits for distcode */

    /* dynamic table building */
    this.ncode = 0;             /* number of code length code lengths */
    this.nlen = 0;              /* number of length code lengths */
    this.ndist = 0;             /* number of distance code lengths */
    this.have = 0;              /* number of code lengths in lens[] */
    this.next = null;              /* next available space in codes[] */

    this.lens = new common.Buf16(320); /* temporary storage for code lengths */
    this.work = new common.Buf16(288); /* work area for code table building */

    /*
     because we don't have pointers in js, we use lencode and distcode directly
     as buffers so we don't need codes
    */
    //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
    this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
    this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
    this.sane = 0;                   /* if false, allow invalid distance too far */
    this.back = 0;                   /* bits back of last unprocessed length/lit */
    this.was = 0;                    /* initial length of match */
  }

  function inflateResetKeep(strm) {
    var state;

    if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = ''; /*Z_NULL*/
    if (state.wrap) {       /* to support ill-conceived Java test suite */
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null/*Z_NULL*/;
    state.hold = 0;
    state.bits = 0;
    //state.lencode = state.distcode = state.next = state.codes;
    state.lencode = state.lendyn = new common.Buf32(ENOUGH_LENS$1);
    state.distcode = state.distdyn = new common.Buf32(ENOUGH_DISTS$1);

    state.sane = 1;
    state.back = -1;
    //Tracev((stderr, "inflate: reset\n"));
    return Z_OK$2;
  }

  function inflateReset(strm) {
    var state;

    if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);

  }

  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;

    /* get the state */
    if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
    state = strm.state;

    /* extract wrap request from windowBits parameter */
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    }
    else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }

    /* set number of window bits, free window if different */
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }

    /* update state and reset the rest of it */
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }

  function inflateInit2(strm, windowBits) {
    var ret;
    var state;

    if (!strm) { return Z_STREAM_ERROR$1; }
    //strm.msg = Z_NULL;                 /* in case we return an error */

    state = new InflateState();

    //if (state === Z_NULL) return Z_MEM_ERROR;
    //Tracev((stderr, "inflate: allocated\n"));
    strm.state = state;
    state.window = null/*Z_NULL*/;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$2) {
      strm.state = null/*Z_NULL*/;
    }
    return ret;
  }

  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }


  /*
   Return state with length and distance decoding tables and index sizes set to
   fixed code decoding.  Normally this returns fixed tables from inffixed.h.
   If BUILDFIXED is defined, then instead this routine builds the tables the
   first time it's called, and returns those tables the first time and
   thereafter.  This reduces the size of the code by about 2K bytes, in
   exchange for a little execution time.  However, BUILDFIXED should not be
   used for threaded applications, since the rewriting of the tables and virgin
   may not be thread-safe.
   */
  var virgin = true;

  var lenfix, distfix; // We have no pointers in JS, so keep tables separate

  function fixedtables(state) {
    /* build fixed huffman tables if first call (may not be thread safe) */
    if (virgin) {
      var sym;

      lenfix = new common.Buf32(512);
      distfix = new common.Buf32(32);

      /* literal/length table */
      sym = 0;
      while (sym < 144) { state.lens[sym++] = 8; }
      while (sym < 256) { state.lens[sym++] = 9; }
      while (sym < 280) { state.lens[sym++] = 7; }
      while (sym < 288) { state.lens[sym++] = 8; }

      inftrees(LENS$1,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

      /* distance table */
      sym = 0;
      while (sym < 32) { state.lens[sym++] = 5; }

      inftrees(DISTS$1, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

      /* do this just once */
      virgin = false;
    }

    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }


  /*
   Update the window with the last wsize (normally 32K) bytes written before
   returning.  If window does not exist yet, create it.  This is only called
   when a window is already in use, or when output has been written during this
   inflate call, but the end of the deflate stream has not been reached yet.
   It is also called to create a window for dictionary data when a dictionary
   is loaded.

   Providing output buffers larger than 32K to inflate() should provide a speed
   advantage, since only the last 32K of output is copied to the sliding window
   upon return from inflate(), and since all distances after the first 32K of
   output will fall in the output data, making match copies simpler and faster.
   The advantage may be dependent on the size of the processor's data caches.
   */
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;

    /* if it hasn't been done already, allocate space for the window */
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;

      state.window = new common.Buf8(state.wsize);
    }

    /* copy state->wsize or less output bytes into the circular window */
    if (copy >= state.wsize) {
      common.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    }
    else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      //zmemcpy(state->window + state->wnext, end - copy, dist);
      common.arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        //zmemcpy(state->window, end - copy, copy);
        common.arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      }
      else {
        state.wnext += dist;
        if (state.wnext === state.wsize) { state.wnext = 0; }
        if (state.whave < state.wsize) { state.whave += dist; }
      }
    }
    return 0;
  }

  function inflate(strm, flush) {
    var state;
    var input, output;          // input/output buffers
    var next;                   /* next input INDEX */
    var put;                    /* next output INDEX */
    var have, left;             /* available input and output */
    var hold;                   /* bit buffer */
    var bits;                   /* bits in bit buffer */
    var _in, _out;              /* save starting available input and output */
    var copy;                   /* number of stored or match bytes to copy */
    var from;                   /* where to copy match bytes from */
    var from_source;
    var here = 0;               /* current decoding table entry */
    var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
    //var last;                   /* parent table entry */
    var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
    var len;                    /* length to copy for repeats, bits to drop */
    var ret;                    /* return code */
    var hbuf = new common.Buf8(4);    /* buffer for gzip header crc calculation */
    var opts;

    var n; // temporary var for NEED_BITS

    var order = /* permutation of code lengths */
      [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


    if (!strm || !strm.state || !strm.output ||
        (!strm.input && strm.avail_in !== 0)) {
      return Z_STREAM_ERROR$1;
    }

    state = strm.state;
    if (state.mode === TYPE$1) { state.mode = TYPEDO; }    /* skip check */


    //--- LOAD() ---
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    //---

    _in = have;
    _out = left;
    ret = Z_OK$2;

    inf_leave: // goto emulation
    for (;;) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          //=== NEEDBITS(16);
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
            state.check = 0/*crc32(0L, Z_NULL, 0)*/;
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            //===//

            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = FLAGS;
            break;
          }
          state.flags = 0;           /* expect zlib header */
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) ||   /* check if zlib header allowed */
            (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
            strm.msg = 'incorrect header check';
            state.mode = BAD$1;
            break;
          }
          if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED$2) {
            strm.msg = 'unknown compression method';
            state.mode = BAD$1;
            break;
          }
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
          len = (hold & 0x0f)/*BITS(4)*/ + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          else if (len > state.wbits) {
            strm.msg = 'invalid window size';
            state.mode = BAD$1;
            break;
          }
          state.dmax = 1 << len;
          //Tracev((stderr, "inflate:   zlib header ok\n"));
          strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
          state.mode = hold & 0x200 ? DICTID : TYPE$1;
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          break;
        case FLAGS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.flags = hold;
          if ((state.flags & 0xff) !== Z_DEFLATED$2) {
            strm.msg = 'unknown compression method';
            state.mode = BAD$1;
            break;
          }
          if (state.flags & 0xe000) {
            strm.msg = 'unknown header flags set';
            state.mode = BAD$1;
            break;
          }
          if (state.head) {
            state.head.text = ((hold >> 8) & 1);
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = TIME;
          /* falls through */
        case TIME:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC4(state.check, hold)
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            hbuf[2] = (hold >>> 16) & 0xff;
            hbuf[3] = (hold >>> 24) & 0xff;
            state.check = crc32_1(state.check, hbuf, 4, 0);
            //===
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = OS;
          /* falls through */
        case OS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.xflags = (hold & 0xff);
            state.head.os = (hold >> 8);
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = EXLEN;
          /* falls through */
        case EXLEN:
          if (state.flags & 0x0400) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          }
          else if (state.head) {
            state.head.extra = null/*Z_NULL*/;
          }
          state.mode = EXTRA;
          /* falls through */
        case EXTRA:
          if (state.flags & 0x0400) {
            copy = state.length;
            if (copy > have) { copy = have; }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  // Use untyped array for more convenient processing later
                  state.head.extra = new Array(state.head.extra_len);
                }
                common.arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
                //zmemcpy(state.head.extra + len, next,
                //        len + copy > state.head.extra_max ?
                //        state.head.extra_max - len : copy);
              }
              if (state.flags & 0x0200) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) { break inf_leave; }
          }
          state.length = 0;
          state.mode = NAME;
          /* falls through */
        case NAME:
          if (state.flags & 0x0800) {
            if (have === 0) { break inf_leave; }
            copy = 0;
            do {
              // TODO: 2 or 1 bytes?
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (state.head && len &&
                  (state.length < 65536 /*state.head.name_max*/)) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);

            if (state.flags & 0x0200) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) { break inf_leave; }
          }
          else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
          /* falls through */
        case COMMENT:
          if (state.flags & 0x1000) {
            if (have === 0) { break inf_leave; }
            copy = 0;
            do {
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (state.head && len &&
                  (state.length < 65536 /*state.head.comm_max*/)) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 0x0200) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) { break inf_leave; }
          }
          else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
          /* falls through */
        case HCRC:
          if (state.flags & 0x0200) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.check & 0xffff)) {
              strm.msg = 'header crc mismatch';
              state.mode = BAD$1;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          }
          if (state.head) {
            state.head.hcrc = ((state.flags >> 9) & 1);
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE$1;
          break;
        case DICTID:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          strm.adler = state.check = zswap32(hold);
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = DICT;
          /* falls through */
        case DICT:
          if (state.havedict === 0) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            return Z_NEED_DICT;
          }
          strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
          state.mode = TYPE$1;
          /* falls through */
        case TYPE$1:
          if (flush === Z_BLOCK$1 || flush === Z_TREES) { break inf_leave; }
          /* falls through */
        case TYPEDO:
          if (state.last) {
            //--- BYTEBITS() ---//
            hold >>>= bits & 7;
            bits -= bits & 7;
            //---//
            state.mode = CHECK;
            break;
          }
          //=== NEEDBITS(3); */
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.last = (hold & 0x01)/*BITS(1)*/;
          //--- DROPBITS(1) ---//
          hold >>>= 1;
          bits -= 1;
          //---//

          switch ((hold & 0x03)/*BITS(2)*/) {
            case 0:                             /* stored block */
              //Tracev((stderr, "inflate:     stored block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = STORED;
              break;
            case 1:                             /* fixed block */
              fixedtables(state);
              //Tracev((stderr, "inflate:     fixed codes block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = LEN_;             /* decode codes */
              if (flush === Z_TREES) {
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2;
                //---//
                break inf_leave;
              }
              break;
            case 2:                             /* dynamic block */
              //Tracev((stderr, "inflate:     dynamic codes block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = 'invalid block type';
              state.mode = BAD$1;
          }
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break;
        case STORED:
          //--- BYTEBITS() ---// /* go to byte boundary */
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
            strm.msg = 'invalid stored block lengths';
            state.mode = BAD$1;
            break;
          }
          state.length = hold & 0xffff;
          //Tracev((stderr, "inflate:       stored length %u\n",
          //        state.length));
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = COPY_;
          if (flush === Z_TREES) { break inf_leave; }
          /* falls through */
        case COPY_:
          state.mode = COPY;
          /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) { copy = have; }
            if (copy > left) { copy = left; }
            if (copy === 0) { break inf_leave; }
            //--- zmemcpy(put, next, copy); ---
            common.arraySet(output, input, next, copy, put);
            //---//
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          //Tracev((stderr, "inflate:       stored end\n"));
          state.mode = TYPE$1;
          break;
        case TABLE:
          //=== NEEDBITS(14); */
          while (bits < 14) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
  //#ifndef PKZIP_BUG_WORKAROUND
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = 'too many length or distance symbols';
            state.mode = BAD$1;
            break;
          }
  //#endif
          //Tracev((stderr, "inflate:       table sizes ok\n"));
          state.have = 0;
          state.mode = LENLENS;
          /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            //=== NEEDBITS(3);
            while (bits < 3) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          // We have separate tables & no pointers. 2 commented lines below not needed.
          //state.next = state.codes;
          //state.lencode = state.next;
          // Switch to use dynamic table
          state.lencode = state.lendyn;
          state.lenbits = 7;

          opts = { bits: state.lenbits };
          ret = inftrees(CODES$1, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;

          if (ret) {
            strm.msg = 'invalid code lengths set';
            state.mode = BAD$1;
            break;
          }
          //Tracev((stderr, "inflate:       code lengths ok\n"));
          state.have = 0;
          state.mode = CODELENS;
          /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;;) {
              here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((here_bits) <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if (here_val < 16) {
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.lens[state.have++] = here_val;
            }
            else {
              if (here_val === 16) {
                //=== NEEDBITS(here.bits + 2);
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                if (state.have === 0) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD$1;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 0x03);//BITS(2);
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2;
                //---//
              }
              else if (here_val === 17) {
                //=== NEEDBITS(here.bits + 3);
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 3 + (hold & 0x07);//BITS(3);
                //--- DROPBITS(3) ---//
                hold >>>= 3;
                bits -= 3;
                //---//
              }
              else {
                //=== NEEDBITS(here.bits + 7);
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 11 + (hold & 0x7f);//BITS(7);
                //--- DROPBITS(7) ---//
                hold >>>= 7;
                bits -= 7;
                //---//
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD$1;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }

          /* handle error breaks in while */
          if (state.mode === BAD$1) { break; }

          /* check for end-of-block code (better have one) */
          if (state.lens[256] === 0) {
            strm.msg = 'invalid code -- missing end-of-block';
            state.mode = BAD$1;
            break;
          }

          /* build code tables -- note: do not change the lenbits or distbits
             values here (9 and 6) without reading the comments in inftrees.h
             concerning the ENOUGH constants, which depend on those values */
          state.lenbits = 9;

          opts = { bits: state.lenbits };
          ret = inftrees(LENS$1, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.lenbits = opts.bits;
          // state.lencode = state.next;

          if (ret) {
            strm.msg = 'invalid literal/lengths set';
            state.mode = BAD$1;
            break;
          }

          state.distbits = 6;
          //state.distcode.copy(state.codes);
          // Switch to use dynamic table
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS$1, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.distbits = opts.bits;
          // state.distcode = state.next;

          if (ret) {
            strm.msg = 'invalid distances set';
            state.mode = BAD$1;
            break;
          }
          //Tracev((stderr, 'inflate:       codes ok\n'));
          state.mode = LEN_;
          if (flush === Z_TREES) { break inf_leave; }
          /* falls through */
        case LEN_:
          state.mode = LEN;
          /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            inffast(strm, _out);
            //--- LOAD() ---
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            //---

            if (state.mode === TYPE$1) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_op && (here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here = state.lencode[last_val +
                      ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((last_bits + here_bits) <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.back = -1;
            state.mode = TYPE$1;
            break;
          }
          if (here_op & 64) {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD$1;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
          /* falls through */
        case LENEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
          //Tracevv((stderr, "inflate:         length %u\n", state.length));
          state.was = state.length;
          state.mode = DIST;
          /* falls through */
        case DIST:
          for (;;) {
            here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if ((here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here = state.distcode[last_val +
                      ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((last_bits + here_bits) <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = 'invalid distance code';
            state.mode = BAD$1;
            break;
          }
          state.offset = here_val;
          state.extra = (here_op) & 15;
          state.mode = DISTEXT;
          /* falls through */
        case DISTEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
  //#ifdef INFLATE_STRICT
          if (state.offset > state.dmax) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD$1;
            break;
          }
  //#endif
          //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
          state.mode = MATCH;
          /* falls through */
        case MATCH:
          if (left === 0) { break inf_leave; }
          copy = _out - left;
          if (state.offset > copy) {         /* copy from window */
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD$1;
                break;
              }
  // (!) This block is disabled in zlib defaults,
  // don't enable it for binary compatibility
  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
  //          Trace((stderr, "inflate.c too far\n"));
  //          copy -= state.whave;
  //          if (copy > state.length) { copy = state.length; }
  //          if (copy > left) { copy = left; }
  //          left -= copy;
  //          state.length -= copy;
  //          do {
  //            output[put++] = 0;
  //          } while (--copy);
  //          if (state.length === 0) { state.mode = LEN; }
  //          break;
  //#endif
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            }
            else {
              from = state.wnext - copy;
            }
            if (copy > state.length) { copy = state.length; }
            from_source = state.window;
          }
          else {                              /* copy from output */
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) { copy = left; }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) { state.mode = LEN; }
          break;
        case LIT:
          if (left === 0) { break inf_leave; }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              // Use '|' instead of '+' to make sure that result is signed
              hold |= input[next++] << bits;
              bits += 8;
            }
            //===//
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check =
                  /*UPDATE(state.check, put - _out, _out);*/
                  (state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out));

            }
            _out = left;
            // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = 'incorrect data check';
              state.mode = BAD$1;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   check matches trailer\n"));
          }
          state.mode = LENGTH;
          /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.total & 0xffffffff)) {
              strm.msg = 'incorrect length check';
              state.mode = BAD$1;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   length matches trailer\n"));
          }
          state.mode = DONE;
          /* falls through */
        case DONE:
          ret = Z_STREAM_END$2;
          break inf_leave;
        case BAD$1:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
          /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }

    // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

    /*
       Return from inflate(), updating the total counts and the check value.
       If there was no progress during the inflate() call, return a buffer
       error.  Call updatewindow() to create and/or update the window state.
       Note: a memory error from inflate() is non-recoverable.
     */

    //--- RESTORE() ---
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    //---

    if (state.wsize || (_out !== strm.avail_out && state.mode < BAD$1 &&
                        (state.mode < CHECK || flush !== Z_FINISH$2))) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
        (state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out));
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) +
                      (state.mode === TYPE$1 ? 128 : 0) +
                      (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if (((_in === 0 && _out === 0) || flush === Z_FINISH$2) && ret === Z_OK$2) {
      ret = Z_BUF_ERROR$1;
    }
    return ret;
  }

  function inflateEnd(strm) {

    if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK$2;
  }

  function inflateGetHeader(strm, head) {
    var state;

    /* check state */
    if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
    state = strm.state;
    if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR$1; }

    /* save header structure */
    state.head = head;
    head.done = false;
    return Z_OK$2;
  }

  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;

    var state;
    var dictid;
    var ret;

    /* check state */
    if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR$1; }
    state = strm.state;

    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR$1;
    }

    /* check for correct dictionary identifier */
    if (state.mode === DICT) {
      dictid = 1; /* adler32(0, null, 0)*/
      /* dictid = adler32(dictid, dictionary, dictLength); */
      dictid = adler32_1(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR$1;
      }
    }
    /* copy dictionary to window using updatewindow(), which will amend the
     existing dictionary if appropriate */
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
    state.havedict = 1;
    // Tracev((stderr, "inflate:   dictionary set\n"));
    return Z_OK$2;
  }

  var inflateReset_1 = inflateReset;
  var inflateReset2_1 = inflateReset2;
  var inflateResetKeep_1 = inflateResetKeep;
  var inflateInit_1 = inflateInit;
  var inflateInit2_1 = inflateInit2;
  var inflate_2 = inflate;
  var inflateEnd_1 = inflateEnd;
  var inflateGetHeader_1 = inflateGetHeader;
  var inflateSetDictionary_1 = inflateSetDictionary;
  var inflateInfo = 'pako inflate (from Nodeca project)';

  /* Not implemented
  exports.inflateCopy = inflateCopy;
  exports.inflateGetDictionary = inflateGetDictionary;
  exports.inflateMark = inflateMark;
  exports.inflatePrime = inflatePrime;
  exports.inflateSync = inflateSync;
  exports.inflateSyncPoint = inflateSyncPoint;
  exports.inflateUndermine = inflateUndermine;
  */

  var inflate_1 = {
  	inflateReset: inflateReset_1,
  	inflateReset2: inflateReset2_1,
  	inflateResetKeep: inflateResetKeep_1,
  	inflateInit: inflateInit_1,
  	inflateInit2: inflateInit2_1,
  	inflate: inflate_2,
  	inflateEnd: inflateEnd_1,
  	inflateGetHeader: inflateGetHeader_1,
  	inflateSetDictionary: inflateSetDictionary_1,
  	inflateInfo: inflateInfo
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var constants = {

    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH:         0,
    Z_PARTIAL_FLUSH:    1,
    Z_SYNC_FLUSH:       2,
    Z_FULL_FLUSH:       3,
    Z_FINISH:           4,
    Z_BLOCK:            5,
    Z_TREES:            6,

    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK:               0,
    Z_STREAM_END:       1,
    Z_NEED_DICT:        2,
    Z_ERRNO:           -1,
    Z_STREAM_ERROR:    -2,
    Z_DATA_ERROR:      -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR:       -5,
    //Z_VERSION_ERROR: -6,

    /* compression levels */
    Z_NO_COMPRESSION:         0,
    Z_BEST_SPEED:             1,
    Z_BEST_COMPRESSION:       9,
    Z_DEFAULT_COMPRESSION:   -1,


    Z_FILTERED:               1,
    Z_HUFFMAN_ONLY:           2,
    Z_RLE:                    3,
    Z_FIXED:                  4,
    Z_DEFAULT_STRATEGY:       0,

    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY:                 0,
    Z_TEXT:                   1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN:                2,

    /* The deflate compression method */
    Z_DEFLATED:               8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  };

  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  function GZheader() {
    /* true if compressed data believed to be text */
    this.text       = 0;
    /* modification time */
    this.time       = 0;
    /* extra flags (not used when writing a gzip file) */
    this.xflags     = 0;
    /* operating system */
    this.os         = 0;
    /* pointer to extra field or Z_NULL if none */
    this.extra      = null;
    /* extra field length (valid if extra != Z_NULL) */
    this.extra_len  = 0; // Actually, we don't need it in JS,
                         // but leave for few code modifications

    //
    // Setup limits is not necessary because in js we should not preallocate memory
    // for inflate use constant limit in 65536 bytes
    //

    /* space at extra (only when reading header) */
    // this.extra_max  = 0;
    /* pointer to zero-terminated file name or Z_NULL */
    this.name       = '';
    /* space at name (only when reading header) */
    // this.name_max   = 0;
    /* pointer to zero-terminated comment or Z_NULL */
    this.comment    = '';
    /* space at comment (only when reading header) */
    // this.comm_max   = 0;
    /* true if there was or will be a header crc */
    this.hcrc       = 0;
    /* true when done reading gzip header (not used when writing a gzip file) */
    this.done       = false;
  }

  var gzheader = GZheader;

  var toString$2 = Object.prototype.toString;

  /**
   * class Inflate
   *
   * Generic JS-style wrapper for zlib calls. If you don't need
   * streaming behaviour - use more simple functions: [[inflate]]
   * and [[inflateRaw]].
   **/

  /* internal
   * inflate.chunks -> Array
   *
   * Chunks of output data, if [[Inflate#onData]] not overridden.
   **/

  /**
   * Inflate.result -> Uint8Array|Array|String
   *
   * Uncompressed result, generated by default [[Inflate#onData]]
   * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
   * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
   * push a chunk with explicit flush (call [[Inflate#push]] with
   * `Z_SYNC_FLUSH` param).
   **/

  /**
   * Inflate.err -> Number
   *
   * Error code after inflate finished. 0 (Z_OK) on success.
   * Should be checked if broken data possible.
   **/

  /**
   * Inflate.msg -> String
   *
   * Error message, if [[Inflate.err]] != 0
   **/


  /**
   * new Inflate(options)
   * - options (Object): zlib inflate options.
   *
   * Creates new inflator instance with specified params. Throws exception
   * on bad params. Supported options:
   *
   * - `windowBits`
   * - `dictionary`
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Additional options, for internal needs:
   *
   * - `chunkSize` - size of generated data chunks (16K by default)
   * - `raw` (Boolean) - do raw inflate
   * - `to` (String) - if equal to 'string', then result will be converted
   *   from utf8 to utf16 (javascript) string. When string output requested,
   *   chunk length can differ from `chunkSize`, depending on content.
   *
   * By default, when no options set, autodetect deflate/gzip data format via
   * wrapper header.
   *
   * ##### Example:
   *
   * ```javascript
   * var pako = require('pako')
   *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
   *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
   *
   * var inflate = new pako.Inflate({ level: 3});
   *
   * inflate.push(chunk1, false);
   * inflate.push(chunk2, true);  // true -> last chunk
   *
   * if (inflate.err) { throw new Error(inflate.err); }
   *
   * console.log(inflate.result);
   * ```
   **/
  function Inflate(options) {
    if (!(this instanceof Inflate)) return new Inflate(options);

    this.options = common.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ''
    }, options || {});

    var opt = this.options;

    // Force window size for `raw` data, if not set directly,
    // because we have no header for autodetect.
    if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) { opt.windowBits = -15; }
    }

    // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
    if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
        !(options && options.windowBits)) {
      opt.windowBits += 32;
    }

    // Gzip header has no info about windows size, we can do autodetect only
    // for deflate. So, if window size not set, force it to max when gzip possible
    if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
      // bit 3 (16) -> gzipped data
      // bit 4 (32) -> autodetect gzip/deflate
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }

    this.err    = 0;      // error code, if happens (0 = Z_OK)
    this.msg    = '';     // error message
    this.ended  = false;  // used to avoid multiple onEnd() calls
    this.chunks = [];     // chunks of compressed data

    this.strm   = new zstream();
    this.strm.avail_out = 0;

    var status  = inflate_1.inflateInit2(
      this.strm,
      opt.windowBits
    );

    if (status !== constants.Z_OK) {
      throw new Error(messages$1[status]);
    }

    this.header = new gzheader();

    inflate_1.inflateGetHeader(this.strm, this.header);

    // Setup dictionary
    if (opt.dictionary) {
      // Convert data if needed
      if (typeof opt.dictionary === 'string') {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString$2.call(opt.dictionary) === '[object ArrayBuffer]') {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) { //In raw mode we need to set the dictionary early
        status = inflate_1.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== constants.Z_OK) {
          throw new Error(messages$1[status]);
        }
      }
    }
  }

  /**
   * Inflate#push(data[, mode]) -> Boolean
   * - data (Uint8Array|Array|ArrayBuffer|String): input data
   * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
   *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
   *
   * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
   * new output chunks. Returns `true` on success. The last data block must have
   * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
   * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
   * can use mode Z_SYNC_FLUSH, keeping the decompression context.
   *
   * On fail call [[Inflate#onEnd]] with error code and return false.
   *
   * We strongly recommend to use `Uint8Array` on input for best speed (output
   * format is detected automatically). Also, don't skip last param and always
   * use the same type in your code (boolean or number). That will improve JS speed.
   *
   * For regular `Array`-s make sure all elements are [0..255].
   *
   * ##### Example
   *
   * ```javascript
   * push(chunk, false); // push one of data chunks
   * ...
   * push(chunk, true);  // push last chunk
   * ```
   **/
  Inflate.prototype.push = function (data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;
    var status, _mode;
    var next_out_utf8, tail, utf8str;

    // Flag to properly process Z_BUF_ERROR on testing inflate call
    // when we check that all output data was flushed.
    var allowBufError = false;

    if (this.ended) { return false; }
    _mode = (mode === ~~mode) ? mode : ((mode === true) ? constants.Z_FINISH : constants.Z_NO_FLUSH);

    // Convert data if needed
    if (typeof data === 'string') {
      // Only binary strings can be decompressed on practice
      strm.input = strings.binstring2buf(data);
    } else if (toString$2.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    do {
      if (strm.avail_out === 0) {
        strm.output = new common.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }

      status = inflate_1.inflate(strm, constants.Z_NO_FLUSH);    /* no bad return value */

      if (status === constants.Z_NEED_DICT && dictionary) {
        status = inflate_1.inflateSetDictionary(this.strm, dictionary);
      }

      if (status === constants.Z_BUF_ERROR && allowBufError === true) {
        status = constants.Z_OK;
        allowBufError = false;
      }

      if (status !== constants.Z_STREAM_END && status !== constants.Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }

      if (strm.next_out) {
        if (strm.avail_out === 0 || status === constants.Z_STREAM_END || (strm.avail_in === 0 && (_mode === constants.Z_FINISH || _mode === constants.Z_SYNC_FLUSH))) {

          if (this.options.to === 'string') {

            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

            tail = strm.next_out - next_out_utf8;
            utf8str = strings.buf2string(strm.output, next_out_utf8);

            // move tail
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) { common.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

            this.onData(utf8str);

          } else {
            this.onData(common.shrinkBuf(strm.output, strm.next_out));
          }
        }
      }

      // When no more input data, we should check that internal inflate buffers
      // are flushed. The only way to do it when avail_out = 0 - run one more
      // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
      // Here we set flag to process this error properly.
      //
      // NOTE. Deflate does not return error in this case and does not needs such
      // logic.
      if (strm.avail_in === 0 && strm.avail_out === 0) {
        allowBufError = true;
      }

    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== constants.Z_STREAM_END);

    if (status === constants.Z_STREAM_END) {
      _mode = constants.Z_FINISH;
    }

    // Finalize on the last chunk.
    if (_mode === constants.Z_FINISH) {
      status = inflate_1.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === constants.Z_OK;
    }

    // callback interim results if Z_SYNC_FLUSH.
    if (_mode === constants.Z_SYNC_FLUSH) {
      this.onEnd(constants.Z_OK);
      strm.avail_out = 0;
      return true;
    }

    return true;
  };


  /**
   * Inflate#onData(chunk) -> Void
   * - chunk (Uint8Array|Array|String): output data. Type of array depends
   *   on js engine support. When string output requested, each chunk
   *   will be string.
   *
   * By default, stores data blocks in `chunks[]` property and glue
   * those in `onEnd`. Override this handler, if you need another behaviour.
   **/
  Inflate.prototype.onData = function (chunk) {
    this.chunks.push(chunk);
  };


  /**
   * Inflate#onEnd(status) -> Void
   * - status (Number): inflate status. 0 (Z_OK) on success,
   *   other if not.
   *
   * Called either after you tell inflate that the input stream is
   * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
   * or if an error happened. By default - join collected chunks,
   * free memory and fill `results` / `err` properties.
   **/
  Inflate.prototype.onEnd = function (status) {
    // On success - join
    if (status === constants.Z_OK) {
      if (this.options.to === 'string') {
        // Glue & convert here, until we teach pako to send
        // utf8 aligned strings to onData
        this.result = this.chunks.join('');
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };


  /**
   * inflate(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * Decompress `data` with inflate/ungzip and `options`. Autodetect
   * format via wrapper header by default. That's why we don't provide
   * separate `ungzip` method.
   *
   * Supported options are:
   *
   * - windowBits
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information.
   *
   * Sugar (options):
   *
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
   *   negative windowBits implicitly.
   * - `to` (String) - if equal to 'string', then result will be converted
   *   from utf8 to utf16 (javascript) string. When string output requested,
   *   chunk length can differ from `chunkSize`, depending on content.
   *
   *
   * ##### Example:
   *
   * ```javascript
   * var pako = require('pako')
   *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
   *   , output;
   *
   * try {
   *   output = pako.inflate(input);
   * } catch (err)
   *   console.log(err);
   * }
   * ```
   **/
  function inflate$1(input, options) {
    var inflator = new Inflate(options);

    inflator.push(input, true);

    // That will never happens, if you don't cheat with options :)
    if (inflator.err) { throw inflator.msg || messages$1[inflator.err]; }

    return inflator.result;
  }


  /**
   * inflateRaw(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * The same as [[inflate]], but creates raw data, without wrapper
   * (header and adler32 crc).
   **/
  function inflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }


  /**
   * ungzip(data[, options]) -> Uint8Array|Array|String
   * - data (Uint8Array|Array|String): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * Just shortcut to [[inflate]], because it autodetects format
   * by header.content. Done for convenience.
   **/


  var Inflate_1 = Inflate;
  var inflate_2$1 = inflate$1;
  var inflateRaw_1 = inflateRaw;
  var ungzip  = inflate$1;

  var inflate_1$1 = {
  	Inflate: Inflate_1,
  	inflate: inflate_2$1,
  	inflateRaw: inflateRaw_1,
  	ungzip: ungzip
  };

  var assign    = common.assign;





  var pako = {};

  assign(pako, deflate_1$1, inflate_1$1, constants);

  var pako_1 = pako;

  const canvasEventCallbacks = createCallbacks('canvasEvent');

  UniServiceJSBridge.subscribe('onCanvasMethodCallback', ({
    callbackId,
    data
  }) => {
    const callback = canvasEventCallbacks.pop(callbackId);
    if (callback) {
      callback(data);
    }
  });

  function operateCanvas (canvasId, pageId, type, data) {
    UniServiceJSBridge.publishHandler(pageId + '-canvas-' + canvasId, {
      canvasId,
      type,
      data
    }, pageId);
  }

  const predefinedColor = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
    transparent: '#00000000'
  };

  function checkColor (e) {
    // 其他开发者适配的echarts会传入一个undefined到这里
    e = e || '#000000';
    var t = null;
    if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
      const n = parseInt(t[1].slice(0, 2), 16);
      const o = parseInt(t[1].slice(2, 4), 16);
      const r = parseInt(t[1].slice(4), 16);
      return [n, o, r, 255]
    }
    if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
      let n = t[1].slice(0, 1);
      let o = t[1].slice(1, 2);
      let r = t[1].slice(2, 3);
      n = parseInt(n + n, 16);
      o = parseInt(o + o, 16);
      r = parseInt(r + r, 16);
      return [n, o, r, 255]
    }
    if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
      return t[1].split(',').map(function (e) {
        return Math.min(255, parseInt(e.trim()))
      }).concat(255)
    }
    if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
      return t[1].split(',').map(function (e, t) {
        return t === 3 ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()))
      })
    }
    var i = e.toLowerCase();
    if (hasOwn(predefinedColor, i)) {
      t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);
      const n = parseInt(t[1].slice(0, 2), 16);
      const o = parseInt(t[1].slice(2, 4), 16);
      const r = parseInt(t[1].slice(4, 6), 16);
      let a = parseInt(t[1].slice(6, 8), 16);
      a = a >= 0 ? a : 255;
      return [n, o, r, a]
    }
    console.error('unsupported color:' + e);
    return [0, 0, 0, 255]
  }

  function Pattern (image, repetition) {
    this.type = 'pattern';
    this.data = image;
    this.colorStop = repetition;
  }

  class CanvasGradient {
    constructor (type, data) {
      this.type = type;
      this.data = data;
      this.colorStop = [];
    }

    addColorStop (position, color) {
      this.colorStop.push([position, checkColor(color)]);
    }
  }
  var methods1 = ['scale', 'rotate', 'translate', 'setTransform', 'transform'];
  var methods2 = ['drawImage', 'fillText', 'fill', 'stroke', 'fillRect', 'strokeRect', 'clearRect',
    'strokeText'
  ];
  var methods3 = ['setFillStyle', 'setTextAlign', 'setStrokeStyle', 'setGlobalAlpha', 'setShadow',
    'setFontSize', 'setLineCap', 'setLineJoin', 'setLineWidth', 'setMiterLimit',
    'setTextBaseline', 'setLineDash'
  ];

  function measureText (text, font) {
    const canvas = document.createElement('canvas');
    const c2d = canvas.getContext('2d');
    c2d.font = font;
    return c2d.measureText(text).width || 0
  }

  function TextMetrics (width) {
    this.width = width;
  }

  class CanvasContext {
    constructor (id, pageId) {
      this.id = id;
      this.pageId = pageId;
      this.actions = [];
      this.path = [];
      this.subpath = [];
      this.currentTransform = [];
      this.currentStepAnimates = [];
      this.drawingState = [];
      this.state = {
        lineDash: [0, 0],
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: [0, 0, 0, 0],
        font: '10px sans-serif',
        fontSize: 10,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
      };
    }

    draw (reserve = false, callback) {
      var actions = [...this.actions];
      this.actions = [];
      this.path = [];
      var callbackId;

      if (typeof callback === 'function') {
        callbackId = canvasEventCallbacks.push(callback);
      }

      operateCanvas(this.id, this.pageId, 'actionsChanged', {
        actions,
        reserve,
        callbackId
      });
    }

    createLinearGradient (x0, y0, x1, y1) {
      return new CanvasGradient('linear', [x0, y0, x1, y1])
    }

    createCircularGradient (x, y, r) {
      return new CanvasGradient('radial', [x, y, r])
    }

    createPattern (image, repetition) {
      if (undefined === repetition) {
        console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.");
      } else if (['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].indexOf(repetition) < 0) {
        console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition +
          "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
      } else {
        return new Pattern(image, repetition)
      }
    }

    measureText (text) {
      const font = this.state.font;
      let width = 0;
      {
        const webview = plus.webview.all().find(webview => webview.getURL().endsWith('www/__uniappview.html'));
        if (webview) {
          width = Number(webview.evalJSSync(`(${measureText.toString()})(${JSON.stringify(text)},${JSON.stringify(font)})`));
        }
      }
      return new TextMetrics(width)
    }

    save () {
      this.actions.push({
        method: 'save',
        data: []
      });
      this.drawingState.push(this.state);
    }

    restore () {
      this.actions.push({
        method: 'restore',
        data: []
      });
      this.state = this.drawingState.pop() || {
        lineDash: [0, 0],
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: [0, 0, 0, 0],
        font: '10px sans-serif',
        fontSize: 10,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
      };
    }

    beginPath () {
      this.path = [];
      this.subpath = [];
    }

    moveTo (x, y) {
      this.path.push({
        method: 'moveTo',
        data: [x, y]
      });
      this.subpath = [
        [x, y]
      ];
    }

    lineTo (x, y) {
      if (this.path.length === 0 && this.subpath.length === 0) {
        this.path.push({
          method: 'moveTo',
          data: [x, y]
        });
      } else {
        this.path.push({
          method: 'lineTo',
          data: [x, y]
        });
      }
      this.subpath.push([x, y]);
    }

    quadraticCurveTo (cpx, cpy, x, y) {
      this.path.push({
        method: 'quadraticCurveTo',
        data: [cpx, cpy, x, y]
      });
      this.subpath.push([x, y]);
    }

    bezierCurveTo (cp1x, cp1y, cp2x, cp2y, x, y) {
      this.path.push({
        method: 'bezierCurveTo',
        data: [cp1x, cp1y, cp2x, cp2y, x, y]
      });
      this.subpath.push([x, y]);
    }

    arc (x, y, r, sAngle, eAngle, counterclockwise = false) {
      this.path.push({
        method: 'arc',
        data: [x, y, r, sAngle, eAngle, counterclockwise]
      });
      this.subpath.push([x, y]);
    }

    rect (x, y, width, height) {
      this.path.push({
        method: 'rect',
        data: [x, y, width, height]
      });
      this.subpath = [
        [x, y]
      ];
    }

    arcTo (x1, y1, x2, y2, radius) {
      this.path.push({
        method: 'arcTo',
        data: [x1, y1, x2, y2, radius]
      });
      this.subpath.push([x2, y2]);
    }

    clip () {
      this.actions.push({
        method: 'clip',
        data: [...this.path]
      });
    }

    closePath () {
      this.path.push({
        method: 'closePath',
        data: []
      });
      if (this.subpath.length) {
        this.subpath = [this.subpath.shift()];
      }
    }

    clearActions () {
      this.actions = [];
      this.path = [];
      this.subpath = [];
    }

    getActions () {
      var actions = [...this.actions];
      this.clearActions();
      return actions
    }

    set lineDashOffset (value) {
      this.actions.push({
        method: 'setLineDashOffset',
        data: [value]
      });
    }

    set globalCompositeOperation (type) {
      this.actions.push({
        method: 'setGlobalCompositeOperation',
        data: [type]
      });
    }

    set shadowBlur (level) {
      this.actions.push({
        method: 'setShadowBlur',
        data: [level]
      });
    }

    set shadowColor (color) {
      this.actions.push({
        method: 'setShadowColor',
        data: [color]
      });
    }

    set shadowOffsetX (x) {
      this.actions.push({
        method: 'setShadowOffsetX',
        data: [x]
      });
    }

    set shadowOffsetY (y) {
      this.actions.push({
        method: 'setShadowOffsetY',
        data: [y]
      });
    }

    set font (value) {
      var self = this;
      this.state.font = value;
      // eslint-disable-next-line
      var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
      if (fontFormat) {
        var style = fontFormat[1].trim().split(/\s/);
        var fontSize = parseFloat(fontFormat[3]);
        var fontFamily = fontFormat[7];
        var actions = [];
        style.forEach(function (value, index) {
          if (['italic', 'oblique', 'normal'].indexOf(value) > -1) {
            actions.push({
              method: 'setFontStyle',
              data: [value]
            });
            self.state.fontStyle = value;
          } else if (['bold', 'normal'].indexOf(value) > -1) {
            actions.push({
              method: 'setFontWeight',
              data: [value]
            });
            self.state.fontWeight = value;
          } else if (index === 0) {
            actions.push({
              method: 'setFontStyle',
              data: ['normal']
            });
            self.state.fontStyle = 'normal';
          } else if (index === 1) {
            pushAction();
          }
        });
        if (style.length === 1) {
          pushAction();
        }
        style = actions.map(function (action) {
          return action.data[0]
        }).join(' ');
        this.state.fontSize = fontSize;
        this.state.fontFamily = fontFamily;
        this.actions.push({
          method: 'setFont',
          data: [`${style} ${fontSize}px ${fontFamily}`]
        });
      } else {
        console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");
      }

      function pushAction () {
        actions.push({
          method: 'setFontWeight',
          data: ['normal']
        });
        self.state.fontWeight = 'normal';
      }
    }

    get font () {
      return this.state.font
    }

    set fillStyle (color) {
      this.setFillStyle(color);
    }

    set strokeStyle (color) {
      this.setStrokeStyle(color);
    }

    set globalAlpha (value) {
      value = Math.floor(255 * parseFloat(value));
      this.actions.push({
        method: 'setGlobalAlpha',
        data: [value]
      });
    }

    set textAlign (align) {
      this.actions.push({
        method: 'setTextAlign',
        data: [align]
      });
    }

    set lineCap (type) {
      this.actions.push({
        method: 'setLineCap',
        data: [type]
      });
    }

    set lineJoin (type) {
      this.actions.push({
        method: 'setLineJoin',
        data: [type]
      });
    }

    set lineWidth (value) {
      this.actions.push({
        method: 'setLineWidth',
        data: [value]
      });
    }

    set miterLimit (value) {
      this.actions.push({
        method: 'setMiterLimit',
        data: [value]
      });
    }

    set textBaseline (type) {
      this.actions.push({
        method: 'setTextBaseline',
        data: [type]
      });
    }
  }

  [...methods1, ...methods2].forEach(function (method) {
    function get (method) {
      switch (method) {
        case 'fill':
        case 'stroke':
          return function () {
            this.actions.push({
              method: method + 'Path',
              data: [...this.path]
            });
          }
        case 'fillRect':
          return function (x, y, width, height) {
            this.actions.push({
              method: 'fillPath',
              data: [{
                method: 'rect',
                data: [x, y, width, height]
              }]
            });
          }
        case 'strokeRect':
          return function (x, y, width, height) {
            this.actions.push({
              method: 'strokePath',
              data: [{
                method: 'rect',
                data: [x, y, width, height]
              }]
            });
          }
        case 'fillText':
        case 'strokeText':
          return function (text, x, y, maxWidth) {
            var data = [text.toString(), x, y];
            if (typeof maxWidth === 'number') {
              data.push(maxWidth);
            }
            this.actions.push({
              method,
              data
            });
          }
        case 'drawImage':
          return function (imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
            if (sHeight === undefined) {
              sx = dx;
              sy = dy;
              sWidth = dWidth;
              sHeight = dHeight;
              dx = undefined;
              dy = undefined;
              dWidth = undefined;
              dHeight = undefined;
            }
            var data;

            function isNumber (e) {
              return typeof e === 'number'
            }
            data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [imageResource, sx, sy,
              sWidth, sHeight, dx, dy, dWidth, dHeight
            ] : isNumber(sWidth) && isNumber(
              sHeight) ? [imageResource, sx, sy, sWidth, sHeight] : [imageResource, sx, sy];
            this.actions.push({
              method,
              data
            });
          }
        default:
          return function (...data) {
            this.actions.push({
              method,
              data
            });
          }
      }
    }
    CanvasContext.prototype[method] = get(method);
  });
  methods3.forEach(function (method) {
    function get (method) {
      switch (method) {
        case 'setFillStyle':
        case 'setStrokeStyle':
          return function (color) {
            if (typeof color !== 'object') {
              this.actions.push({
                method,
                data: ['normal', checkColor(color)]
              });
            } else {
              this.actions.push({
                method,
                data: [color.type, color.data, color.colorStop]
              });
            }
          }
        case 'setGlobalAlpha':
          return function (alpha) {
            alpha = Math.floor(255 * parseFloat(alpha));
            this.actions.push({
              method,
              data: [alpha]
            });
          }
        case 'setShadow':
          return function (offsetX, offsetY, blur, color) {
            color = checkColor(color);
            this.actions.push({
              method,
              data: [offsetX, offsetY, blur, color]
            });
            this.state.shadowBlur = blur;
            this.state.shadowColor = color;
            this.state.shadowOffsetX = offsetX;
            this.state.shadowOffsetY = offsetY;
          }
        case 'setLineDash':
          return function (pattern, offset) {
            pattern = pattern || [0, 0];
            offset = offset || 0;
            this.actions.push({
              method,
              data: [pattern, offset]
            });
            this.state.lineDash = pattern;
          }
        case 'setFontSize':
          return function (fontSize) {
            this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + 'px');
            this.state.fontSize = fontSize;
            this.actions.push({
              method,
              data: [fontSize]
            });
          }
        default:
          return function (...data) {
            this.actions.push({
              method,
              data
            });
          }
      }
    }
    CanvasContext.prototype[method] = get(method);
  });

  function createCanvasContext$1 (id, context) {
    if (context) {
      return new CanvasContext(id, context.$page.id)
    }
    const pageId = getCurrentPageId();
    if (pageId) {
      return new CanvasContext(id, pageId)
    } else {
      UniServiceJSBridge.emit('onError', 'createCanvasContext:fail');
    }
  }

  function canvasGetImageData$1 ({
    canvasId,
    x,
    y,
    width,
    height
  }, callbackId) {
    const pageId = getCurrentPageId();
    if (!pageId) {
      invoke$1(callbackId, {
        errMsg: 'canvasGetImageData:fail'
      });
      return
    }
    const cId = canvasEventCallbacks.push(function (data) {
      let imgData = data.data;
      if (imgData && imgData.length) {
        if ( data.compressed) {
          const pako = pako_1;
          imgData = pako.inflateRaw(imgData);
          delete data.compressed;
        }
        data.data = new Uint8ClampedArray(imgData);
      }
      invoke$1(callbackId, data);
    });
    operateCanvas(canvasId, pageId, 'getImageData', {
      x,
      y,
      width,
      height,
      callbackId: cId
    });
  }

  function canvasPutImageData$1 ({
    canvasId,
    data,
    x,
    y,
    width,
    height
  }, callbackId) {
    var pageId = getCurrentPageId();
    if (!pageId) {
      invoke$1(callbackId, {
        errMsg: 'canvasPutImageData:fail'
      });
      return
    }
    var cId = canvasEventCallbacks.push(function (data) {
      invoke$1(callbackId, data);
    });
    let compressed;
    // iOS真机非调试模式压缩太慢暂时排除
    if ( (plus.os.name !== 'iOS' || typeof __WEEX_DEVTOOL__ === 'boolean')) {
      const pako = pako_1;
      data = pako.deflateRaw(data, { to: 'string' });
      compressed = true;
    } else {
      // fix ...
      data = Array.prototype.slice.call(data);
    }

    operateCanvas(canvasId, pageId, 'putImageData', {
      data,
      x,
      y,
      width,
      height,
      compressed,
      callbackId: cId
    });
  }

  function canvasToTempFilePath$1 ({
    x = 0,
    y = 0,
    width,
    height,
    destWidth,
    destHeight,
    canvasId,
    fileType,
    quality
  }, callbackId) {
    var pageId = getCurrentPageId();
    if (!pageId) {
      invoke$1(callbackId, {
        errMsg: 'canvasToTempFilePath:fail'
      });
      return
    }
    const cId = canvasEventCallbacks.push(function (res) {
      invoke$1(callbackId, res);
    });
    const dirname = `${TEMP_PATH}/canvas`;
    operateCanvas(canvasId, pageId, 'toTempFilePath', {
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      fileType,
      quality,
      dirname,
      callbackId: cId
    });
  }

  var require_context_module_1_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CanvasContext: CanvasContext,
    createCanvasContext: createCanvasContext$1,
    canvasGetImageData: canvasGetImageData$1,
    canvasPutImageData: canvasPutImageData$1,
    canvasToTempFilePath: canvasToTempFilePath$1
  });

  function operateMapPlayer$3 (mapId, pageVm, type, data) {
    invokeMethod('operateMapPlayer', mapId, pageVm, type, data);
  }

  UniServiceJSBridge.subscribe('onMapMethodCallback', ({
    callbackId,
    data
  }) => {
    callback.invoke(callbackId, data);
  });

  const methods$1 = ['getCenterLocation',
    'moveToLocation',
    'getScale',
    'getRegion',
    'includePoints',
    'translateMarker',
    'addCustomLayer',
    'removeCustomLayer',
    'addGroundOverlay',
    'removeGroundOverlay',
    'updateGroundOverlay',
    'initMarkerCluster',
    'addMarkers',
    'removeMarkers',
    'moveAlong',
    'openMapApp'];

  class MapContext {
    constructor (id, pageVm) {
      this.id = id;
      this.pageVm = pageVm;
    }

    on (name, callback) {
      operateMapPlayer$3(this.id, this.pageVm, 'on', {
        name,
        callback
      });
    }
  }

  MapContext.prototype.$getAppMap = function () {
    {
      return plus.maps.getMapById(this.pageVm.$page.id + '-map-' + this.id)
    }
  };

  methods$1.forEach(function (method) {
    MapContext.prototype[method] = callback.warp(function (options, callbackId) {
      options.callbackId = callbackId;
      operateMapPlayer$3(this.id, this.pageVm, method, options);
    });
  });

  function createMapContext$1 (id, context) {
    if (context) {
      return new MapContext(id, context)
    }
    return new MapContext(id, getCurrentPageVm('createMapContext'))
  }

  var require_context_module_1_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MapContext: MapContext,
    createMapContext: createMapContext$1
  });

  const RATES = [0.5, 0.8, 1.0, 1.25, 1.5, 2.0];

  function operateVideoPlayer$3 (videoId, pageVm, type, data) {
    invokeMethod('operateVideoPlayer', videoId, pageVm, type, data);
  }

  class VideoContext {
    constructor (id, pageVm) {
      this.id = id;
      this.pageVm = pageVm;
    }

    play () {
      operateVideoPlayer$3(this.id, this.pageVm, 'play');
    }

    pause () {
      operateVideoPlayer$3(this.id, this.pageVm, 'pause');
    }

    stop () {
      operateVideoPlayer$3(this.id, this.pageVm, 'stop');
    }

    seek (position) {
      operateVideoPlayer$3(this.id, this.pageVm, 'seek', {
        position
      });
    }

    sendDanmu (args) {
      operateVideoPlayer$3(this.id, this.pageVm, 'sendDanmu', args);
    }

    playbackRate (rate) {
      if (!~RATES.indexOf(rate)) {
        rate = 1.0;
      }
      operateVideoPlayer$3(this.id, this.pageVm, 'playbackRate', {
        rate
      });
    }

    requestFullScreen (args = {}) {
      operateVideoPlayer$3(this.id, this.pageVm, 'requestFullScreen', args);
    }

    exitFullScreen () {
      operateVideoPlayer$3(this.id, this.pageVm, 'exitFullScreen');
    }

    showStatusBar () {
      operateVideoPlayer$3(this.id, this.pageVm, 'showStatusBar');
    }

    hideStatusBar () {
      operateVideoPlayer$3(this.id, this.pageVm, 'hideStatusBar');
    }
  }

  function createVideoContext$1 (id, context) {
    if (context) {
      return new VideoContext(id, context)
    }
    return new VideoContext(id, getCurrentPageVm('createVideoContext'))
  }

  var require_context_module_1_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VideoContext: VideoContext,
    createVideoContext: createVideoContext$1
  });

  function operateEditor (componentId, pageId, type, data) {
    UniServiceJSBridge.publishHandler(pageId + '-editor-' + componentId, {
      componentId,
      type,
      data
    }, pageId);
  }

  UniServiceJSBridge.subscribe('onEditorMethodCallback', ({
    callbackId,
    data
  }) => {
    callback.invoke(callbackId, data);
  });

  const methods$2 = ['insertDivider', 'insertImage', 'insertText', 'setContents', 'getContents', 'clear', 'removeFormat', 'undo', 'redo', 'blur', 'getSelectionText', 'scrollIntoView'];

  class EditorContext {
    constructor (id, pageId) {
      this.id = id;
      this.pageId = pageId;
    }

    format (name, value) {
      operateEditor(this.id, this.pageId, 'format', {
        options: {
          name,
          value
        }
      });
    }
  }

  methods$2.forEach(function (method) {
    EditorContext.prototype[method] = callback.warp(function (options, callbackId) {
      operateEditor(this.id, this.pageId, method, {
        options,
        callbackId
      });
    });
  });

  var require_context_module_1_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EditorContext: EditorContext
  });

  const eventNames$3 = [
    'canplay',
    'play',
    'pause',
    'stop',
    'ended',
    'timeUpdate',
    'error',
    'waiting',
    'seeking',
    'seeked'
  ];

  const props$1 = [
    {
      name: 'src',
      cache: true
    },
    {
      name: 'startTime',
      default: 0,
      cache: true
    },
    {
      name: 'autoplay',
      default: false,
      cache: true
    },
    {
      name: 'loop',
      default: false,
      cache: true
    },
    {
      name: 'obeyMuteSwitch',
      default: true,
      readonly: true,
      cache: true
    },
    {
      name: 'duration',
      readonly: true
    },
    {
      name: 'currentTime',
      readonly: true
    },
    {
      name: 'paused',
      readonly: true
    },
    {
      name: 'buffered',
      readonly: true
    },
    {
      name: 'volume'
    },
    {
      name: 'sessionCategory'
    },
    {
      name: 'playbackRate',
      cache: true
    }
  ];

  class InnerAudioContext {
    constructor (id) {
      this.id = id;
      this._callbacks = {};
      this._options = {};
      eventNames$3.forEach(name => {
        this._callbacks[name.toLowerCase()] = [];
      });
      props$1.forEach(item => {
        const name = item.name;
        const data = {
          get () {
            const result = item.cache ? this._options : invokeMethod('getAudioState', {
              audioId: this.id
            });
            const value = name in result ? result[name] : item.default;
            return typeof value === 'number' && name !== 'volume' ? value / 1e3 : value
          }
        };
        if (!item.readonly) {
          data.set = function (value) {
            this._options[name] = value;
            invokeMethod('setAudioState', Object.assign({}, this._options, {
              audioId: this.id
            }));
          };
        }
        Object.defineProperty(this, name, data);
      });
    }

    play () {
      this._operate('play');
    }

    pause () {
      this._operate('pause');
    }

    stop () {
      this._operate('stop');
    }

    seek (position) {
      this._operate('seek', {
        currentTime: position * 1e3
      });
    }

    destroy () {
      clearInterval(this.__timing);
      invokeMethod('destroyAudioInstance', {
        audioId: this.id
      });
      delete innerAudioContexts[this.id];
    }

    _operate (type, options) {
      invokeMethod('operateAudio', Object.assign({}, options, {
        audioId: this.id,
        operationType: type
      }));
    }
  }

  eventNames$3.forEach(item => {
    const name = item[0].toUpperCase() + item.substr(1);
    item = item.toLowerCase();
    InnerAudioContext.prototype[`on${name}`] = function (callback) {
      this._callbacks[item].push(callback);
    };
    InnerAudioContext.prototype[`off${name}`] = function (callback) {
      const callbacks = this._callbacks[item];
      const index = callbacks.indexOf(callback);
      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    };
  });

  function emit (audio, state, errMsg, errCode) {
    audio._callbacks[state].forEach(callback => {
      if (typeof callback === 'function') {
        callback(state === 'error' ? {
          errMsg,
          errCode
        } : {});
      }
    });
  }

  onMethod('onAudioStateChange', ({
    state,
    audioId,
    errMsg,
    errCode
  }) => {
    const audio = innerAudioContexts[audioId];
    if (audio) {
      emit(audio, state, errMsg, errCode);
      if (state === 'play') {
        const oldCurrentTime = audio.currentTime;
        audio.__timing = setInterval(() => {
          const currentTime = audio.currentTime;
          if (currentTime !== oldCurrentTime) {
            emit(audio, 'timeupdate');
          }
        }, 200);
      } else if (state === 'pause' || state === 'stop' || state === 'error') {
        clearInterval(audio.__timing);
      }
    }
  });

  const innerAudioContexts = Object.create(null);

  function createInnerAudioContext () {
    const {
      audioId
    } = invokeMethod('createAudioInstance');
    const innerAudioContext = new InnerAudioContext(audioId);
    innerAudioContexts[audioId] = innerAudioContext;
    return innerAudioContext
  }

  var require_context_module_1_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createInnerAudioContext: createInnerAudioContext
  });

  const callbacks$6 = [];

  onMethod('onNetworkStatusChange', res => {
    callbacks$6.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onNetworkStatusChange (callbackId) {
    callbacks$6.push(callbackId);
  }

  function offNetworkStatusChange (callbackId) {
    // 暂不支持移除所有监听
    if (callbackId) {
      const index = callbacks$6.indexOf(callbackId);
      if (index >= 0) {
        callbacks$6.splice(index, 1);
      }
    }
  }

  var require_context_module_1_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onNetworkStatusChange: onNetworkStatusChange,
    offNetworkStatusChange: offNetworkStatusChange
  });

  const callbacks$7 = [];

  onMethod('onThemeChange', function (res) {
    callbacks$7.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onThemeChange (callbackId) {
    callbacks$7.push(callbackId);
  }

  // 旧版本 API，后期文档更新后考虑移除
  onMethod('onUIStyleChange', function (res) {
    callbacks$7.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onUIStyleChange (callbackId) {
    callbacks$7.push(callbackId);
    console.warn('The "uni.onUIStyleChange" API is deprecated, please use "uni.onThemeChange". Learn more: https://uniapp.dcloud.net.cn/api/system/theme.');
  }

  var require_context_module_1_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onThemeChange: onThemeChange,
    onUIStyleChange: onUIStyleChange
  });

  const getSelectedTextRangeEventCallbacks = createCallbacks('getSelectedTextRangeEvent');

  UniServiceJSBridge.subscribe('onGetSelectedTextRange', ({
    callbackId,
    data
  }) => {
    console.log('onGetSelectedTextRange');
    const callback = getSelectedTextRangeEventCallbacks.pop(callbackId);
    if (callback) {
      callback(data);
    }
  });

  function getSelectedTextRange (_, callbackId) {
    const pageId = getCurrentPageId();
    UniServiceJSBridge.publishHandler('getSelectedTextRange', {
      pageId,
      callbackId: getSelectedTextRangeEventCallbacks.push(function (res) {
        invoke$1(callbackId, res);
      })
    }, pageId);
  }

  var require_context_module_1_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getSelectedTextRange: getSelectedTextRange
  });

  let callback$1;

  onMethod('onKeyboardHeightChange', res => {
    if (callback$1) {
      invoke$1(callback$1, res);
    }
  });

  function onKeyboardHeightChange (callbackId) {
    // 与微信小程序一致仅保留最后一次监听
    remove(callback$1);
    callback$1 = callbackId;
  }

  function offKeyboardHeightChange () {
    // 与微信小程序一致移除最后一次监听
    callback$1 = null;
  }

  var require_context_module_1_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onKeyboardHeightChange: onKeyboardHeightChange,
    offKeyboardHeightChange: offKeyboardHeightChange
  });

  const longPressActionsCallbackId = 'longPressActionsCallback';

  let longPressActions = {};

  onMethod(longPressActionsCallbackId, function (res) {
    const errMsg = res.errMsg || '';
    if (new RegExp('\\:\\s*fail').test(errMsg)) {
      longPressActions.fail && longPressActions.fail(res);
    } else {
      longPressActions.success && longPressActions.success(res);
    }
    longPressActions.complete && longPressActions.complete(res);
  });

  function previewImage$1 (args = {}) {
    longPressActions = args.longPressActions || {};
    if (longPressActions.success || longPressActions.fail || longPressActions.complete) {
      longPressActions.callbackId = longPressActionsCallbackId;
    }

    return invokeMethod('previewImagePlus', args)
  }

  function closePreviewImage (args = {}) {
    return invokeMethod('closePreviewImagePlus', args)
  }

  var require_context_module_1_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    previewImage: previewImage$1,
    closePreviewImage: closePreviewImage
  });

  const callbacks$8 = {
    pause: null,
    resume: null,
    start: null,
    stop: null,
    error: null
  };

  class RecorderManager {
    constructor () {
      onMethod('onRecorderStateChange', res => {
        const state = res.state;
        delete res.state;
        delete res.errMsg;
        if (typeof callbacks$8[state] === 'function') {
          callbacks$8[state](res);
        }
      });
    }

    onError (callback) {
      callbacks$8.error = callback;
    }

    onFrameRecorded (callback) {

    }

    onInterruptionBegin (callback) {

    }

    onInterruptionEnd (callback) {

    }

    onPause (callback) {
      callbacks$8.pause = callback;
    }

    onResume (callback) {
      callbacks$8.resume = callback;
    }

    onStart (callback) {
      callbacks$8.start = callback;
    }

    onStop (callback) {
      callbacks$8.stop = callback;
    }

    pause () {
      invokeMethod('operateRecorder', {
        operationType: 'pause'
      });
    }

    resume () {
      invokeMethod('operateRecorder', {
        operationType: 'resume'
      });
    }

    start (options) {
      invokeMethod('operateRecorder', Object.assign({}, options, {
        operationType: 'start'
      }));
    }

    stop () {
      invokeMethod('operateRecorder', {
        operationType: 'stop'
      });
    }
  }

  let recorderManager;

  function getRecorderManager () {
    return recorderManager || (recorderManager = new RecorderManager())
  }

  var require_context_module_1_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getRecorderManager: getRecorderManager
  });

  class DownloadTask {
    constructor (downloadTaskId, callbackId) {
      this.id = downloadTaskId;
      this._callbackId = callbackId;
      this._callbacks = [];
    }

    abort () {
      invokeMethod('operateDownloadTask', {
        downloadTaskId: this.id,
        operationType: 'abort'
      });
    }

    onProgressUpdate (callback) {
      if (typeof callback !== 'function') {
        return
      }
      this._callbacks.push(callback);
    }

    onHeadersReceived () {

    }

    offProgressUpdate (callback) {
      const index = this._callbacks.indexOf(callback);
      if (index >= 0) {
        this._callbacks.splice(index, 1);
      }
    }

    offHeadersReceived () {

    }
  }
  const downloadTasks$1 = Object.create(null);
  onMethod('onDownloadTaskStateChange', ({
    downloadTaskId,
    state,
    tempFilePath,
    statusCode,
    progress,
    totalBytesWritten,
    totalBytesExpectedToWrite,
    errMsg
  }) => {
    const downloadTask = downloadTasks$1[downloadTaskId];
    const callbackId = downloadTask._callbackId;

    switch (state) {
      case 'progressUpdate':
        downloadTask._callbacks.forEach(callback => {
          callback({
            progress,
            totalBytesWritten,
            totalBytesExpectedToWrite
          });
        });
        break
      case 'success':
        invoke$1(callbackId, {
          tempFilePath,
          statusCode,
          errMsg: 'request:ok'
        });
        // eslint-disable-next-line no-fallthrough
      case 'fail':
        invoke$1(callbackId, {
          errMsg: 'request:fail ' + errMsg
        });
        // eslint-disable-next-line no-fallthrough
      default:
        // progressUpdate 可能晚于 success
        setTimeout(() => {
          delete downloadTasks$1[downloadTaskId];
        }, 100);
        break
    }
  });
  function downloadFile$1 (args, callbackId) {
    const {
      downloadTaskId
    } = invokeMethod('createDownloadTask', args);
    const task = new DownloadTask(downloadTaskId, callbackId);
    downloadTasks$1[downloadTaskId] = task;
    return task
  }

  var require_context_module_1_17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    downloadFile: downloadFile$1
  });

  const requestTasks$1 = Object.create(null);

  function formatResponse (res, args) {
    if (
      typeof res.data === 'string' &&
      res.data.charCodeAt(0) === 65279
    ) {
      res.data = res.data.substr(1);
    }

    res.statusCode = parseInt(res.statusCode, 10);

    if (isPlainObject(res.header)) {
      res.header = Object.keys(res.header).reduce(function (ret, key) {
        const value = res.header[key];
        if (Array.isArray(value)) {
          ret[key] = value.join(',');
        } else if (typeof value === 'string') {
          ret[key] = value;
        }
        return ret
      }, {});
    }

    if (args.dataType && args.dataType.toLowerCase() === 'json') {
      try {
        res.data = JSON.parse(res.data);
      } catch (e) {}
    }

    return res
  }

  onMethod('onRequestTaskStateChange', function ({
    requestTaskId,
    state,
    data,
    statusCode,
    header,
    errMsg,
    cookies
  }) {
    const {
      args,
      callbackId
    } = requestTasks$1[requestTaskId] || {};

    if (!callbackId) {
      return
    }
    delete requestTasks$1[requestTaskId];
    switch (state) {
      case 'success':
        invoke$1(callbackId, formatResponse({
          data,
          statusCode,
          header,
          errMsg: 'request:ok',
          cookies
        }, args));
        break
      case 'fail':
        invoke$1(callbackId, {
          errMsg: 'request:fail ' + errMsg
        });
        break
    }
  });

  class RequestTask {
    constructor (id) {
      this.id = id;
    }

    abort () {
      invokeMethod('operateRequestTask', {
        requestTaskId: this.id,
        operationType: 'abort'
      });
    }

    offHeadersReceived () {

    }

    onHeadersReceived () {

    }
  }

  function request$1 (args, callbackId) {
    let contentType;
    for (const name in args.header) {
      if (name.toLowerCase() === 'content-type') {
        contentType = args.header[name];
        break
      }
    }
    if (args.method !== 'GET' && contentType.indexOf('application/json') === 0 && isPlainObject(args.data)) {
      args.data = JSON.stringify(args.data);
    }
    const {
      requestTaskId
    } = invokeMethod('createRequestTask', args);

    requestTasks$1[requestTaskId] = {
      args,
      callbackId
    };

    return new RequestTask(requestTaskId)
  }

  var require_context_module_1_18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request$1
  });

  class SocketTask {
    constructor (socketTaskId) {
      this.id = socketTaskId;
      this._callbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this.CLOSED = 3;
      this.CLOSING = 2;
      this.CONNECTING = 0;
      this.OPEN = 1;
      this.readyState = this.CLOSED;
    }

    send (args) {
      if (this.readyState !== this.OPEN) {
        this._callback(args, 'sendSocketMessage:fail WebSocket is not connected');
      }
      const {
        errMsg
      } = invokeMethod('operateSocketTask', Object.assign({}, args, {
        operationType: 'send',
        socketTaskId: this.id
      }));
      this._callback(args, errMsg.replace('operateSocketTask', 'sendSocketMessage'));
    }

    close (args) {
      this.readyState = this.CLOSING;
      const {
        errMsg
      } = invokeMethod('operateSocketTask', Object.assign({}, args, {
        operationType: 'close',
        socketTaskId: this.id
      }));
      this._callback(args, errMsg.replace('operateSocketTask', 'closeSocket'));
    }

    onOpen (callback) {
      this._callbacks.open.push(callback);
    }

    onClose (callback) {
      this._callbacks.close.push(callback);
    }

    onError (callback) {
      this._callbacks.error.push(callback);
    }

    onMessage (callback) {
      this._callbacks.message.push(callback);
    }

    _callback ({
      success,
      fail,
      complete
    } = {}, errMsg) {
      var data = {
        errMsg
      };
      if (/:ok$/.test(errMsg)) {
        if (typeof success === 'function') {
          success(data);
        }
      } else {
        if (typeof fail === 'function') {
          fail(data);
        }
      }
      if (typeof complete === 'function') {
        complete(data);
      }
    }
  }

  const socketTasks$1 = Object.create(null);
  const socketTasksArray = [];
  const callbacks$9 = Object.create(null);
  onMethod('onSocketTaskStateChange', ({
    socketTaskId,
    state,
    data,
    errMsg
  }) => {
    const socketTask = socketTasks$1[socketTaskId];
    if (!socketTask) {
      return
    }
    if (state === 'open') {
      socketTask.readyState = socketTask.OPEN;
    }
    if (socketTask === socketTasksArray[0] && callbacks$9[state]) {
      invoke$1(callbacks$9[state], state === 'message' ? {
        data
      } : {});
    }
    if (state === 'error' || state === 'close') {
      socketTask.readyState = socketTask.CLOSED;
      delete socketTasks$1[socketTaskId];
      const index = socketTasksArray.indexOf(socketTask);
      if (index >= 0) {
        socketTasksArray.splice(index, 1);
      }
    }
    socketTask._callbacks[state].forEach(callback => {
      if (typeof callback === 'function') {
        callback(state === 'message' ? {
          data
        } : {});
      }
    });
  });

  function connectSocket$1 (args, callbackId) {
    const {
      socketTaskId
    } = invokeMethod('createSocketTask', args);
    const task = new SocketTask(socketTaskId);
    socketTasks$1[socketTaskId] = task;
    socketTasksArray.push(task);
    setTimeout(() => {
      invoke$1(callbackId, {
        errMsg: 'connectSocket:ok'
      });
    }, 0);
    return task
  }

  function sendSocketMessage$1 (args, callbackId) {
    const socketTask = socketTasksArray[0];
    if (!socketTask || socketTask.readyState !== socketTask.OPEN) {
      invoke$1(callbackId, {
        errMsg: 'sendSocketMessage:fail WebSocket is not connected'
      });
      return
    }
    return invokeMethod('operateSocketTask', Object.assign({}, args, {
      operationType: 'send',
      socketTaskId: socketTask.id
    }))
  }

  function closeSocket$1 (args, callbackId) {
    const socketTask = socketTasksArray[0];
    if (!socketTask) {
      invoke$1(callbackId, {
        errMsg: 'closeSocket:fail WebSocket is not connected'
      });
      return
    }
    socketTask.readyState = socketTask.CLOSING;
    return invokeMethod('operateSocketTask', Object.assign({}, args, {
      operationType: 'close',
      socketTaskId: socketTask.id
    }))
  }

  function onSocketOpen (callbackId) {
    callbacks$9.open = callbackId;
  }

  function onSocketError (callbackId) {
    callbacks$9.error = callbackId;
  }

  function onSocketMessage (callbackId) {
    callbacks$9.message = callbackId;
  }

  function onSocketClose (callbackId) {
    callbacks$9.close = callbackId;
  }

  var require_context_module_1_19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    connectSocket: connectSocket$1,
    sendSocketMessage: sendSocketMessage$1,
    closeSocket: closeSocket$1,
    onSocketOpen: onSocketOpen,
    onSocketError: onSocketError,
    onSocketMessage: onSocketMessage,
    onSocketClose: onSocketClose
  });

  class UpdateManager {
    onCheckForUpdate () {

    }

    onUpdateReady () {

    }

    onUpdateFailed () {

    }

    applyUpdate () {

    }
  }

  let updateManager;

  function getUpdateManager () {
    return updateManager || (updateManager = new UpdateManager())
  }

  var require_context_module_1_20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getUpdateManager: getUpdateManager
  });

  class UploadTask {
    constructor (uploadTaskId, callbackId) {
      this.id = uploadTaskId;
      this._callbackId = callbackId;
      this._callbacks = [];
    }

    abort () {
      invokeMethod('operateUploadTask', {
        uploadTaskId: this.id,
        operationType: 'abort'
      });
    }

    onProgressUpdate (callback) {
      if (typeof callback !== 'function') {
        return
      }
      this._callbacks.push(callback);
    }

    onHeadersReceived () {

    }

    offProgressUpdate (callback) {
      const index = this._callbacks.indexOf(callback);
      if (index >= 0) {
        this._callbacks.splice(index, 1);
      }
    }

    offHeadersReceived () {

    }
  }
  const uploadTasks$1 = Object.create(null);
  onMethod('onUploadTaskStateChange', ({
    uploadTaskId,
    state,
    data,
    statusCode,
    progress,
    totalBytesSent,
    totalBytesExpectedToSend,
    errMsg
  }) => {
    const uploadTask = uploadTasks$1[uploadTaskId];
    const callbackId = uploadTask._callbackId;

    switch (state) {
      case 'progressUpdate':
        uploadTask._callbacks.forEach(callback => {
          callback({
            progress,
            totalBytesSent,
            totalBytesExpectedToSend
          });
        });
        break
      case 'success':
        invoke$1(callbackId, {
          data,
          statusCode,
          errMsg: 'request:ok'
        });
        // eslint-disable-next-line no-fallthrough
      case 'fail':
        invoke$1(callbackId, {
          errMsg: 'request:fail ' + errMsg
        });
        // eslint-disable-next-line no-fallthrough
      default:
        // progressUpdate 可能晚于 success
        setTimeout(() => {
          delete uploadTasks$1[uploadTaskId];
        }, 100);
        break
    }
  });
  function uploadFile$1 (args, callbackId) {
    const {
      uploadTaskId
    } = invokeMethod('createUploadTask', args);
    const task = new UploadTask(uploadTaskId, callbackId);
    uploadTasks$1[uploadTaskId] = task;
    return task
  }

  var require_context_module_1_21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    uploadFile: uploadFile$1
  });

  const defaultOption = {
    duration: 400,
    timingFunction: 'linear',
    delay: 0,
    transformOrigin: '50% 50% 0'
  };

  class MPAnimation {
    constructor (option) {
      this.actions = [];
      this.currentTransform = {};
      this.currentStepAnimates = [];
      this.option = Object.assign({}, defaultOption, option);
    }

    _getOption (option) {
      const _option = {
        transition: Object.assign({}, this.option, option)
      };
      _option.transformOrigin = _option.transition.transformOrigin;
      delete _option.transition.transformOrigin;
      return _option
    }

    _pushAnimates (type, args) {
      this.currentStepAnimates.push({
        type: type,
        args: args
      });
    }

    _converType (type) {
      return type.replace(/[A-Z]/g, text => {
        return `-${text.toLowerCase()}`
      })
    }

    _getValue (value) {
      return typeof value === 'number' ? `${value}px` : value
    }

    export () {
      const actions = this.actions;
      this.actions = [];
      return {
        actions
      }
    }

    step (option) {
      this.currentStepAnimates.forEach(animate => {
        if (animate.type !== 'style') {
          this.currentTransform[animate.type] = animate;
        } else {
          this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate;
        }
      });
      this.actions.push({
        animates: Object.values(this.currentTransform),
        option: this._getOption(option)
      });
      this.currentStepAnimates = [];
      return this
    }
  }

  const animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'];
  const animateTypes2 = ['opacity', 'backgroundColor'];
  const animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach(type => {
    MPAnimation.prototype[type] = function (...args) {
      if (animateTypes2.concat(animateTypes3).includes(type)) {
        this._pushAnimates('style', [this._converType(type), animateTypes3.includes(type) ? this._getValue(args[0]) : args[0]]);
      } else {
        this._pushAnimates(type, args);
      }
      return this
    };
  });

  function createAnimation (option) {
    return new MPAnimation(option)
  }

  var require_context_module_1_22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAnimation: createAnimation
  });

  const createIntersectionObserverCallbacks = createCallbacks('requestComponentObserver');

  const defaultOptions = {
    thresholds: [0],
    initialRatio: 0,
    observeAll: false
  };

  class ServiceIntersectionObserver {
    constructor (component, options) {
      this.pageId = component.$page && component.$page.id;
      this.component = component._$id || component; // app-plus 平台传输_$id
      this.options = Object.assign({}, defaultOptions, options);
    }

    _makeRootMargin (margins = {}) {
      this.options.rootMargin = ['top', 'right', 'bottom', 'left'].map(name => `${Number(margins[name]) || 0}px`).join(
        ' ');
    }

    relativeTo (selector, margins) {
      this.options.relativeToSelector = selector;
      this._makeRootMargin(margins);
      return this
    }

    relativeToViewport (margins) {
      this.options.relativeToSelector = null;
      this._makeRootMargin(margins);
      return this
    }

    observe (selector, callback) {
      if (typeof callback !== 'function') {
        return
      }
      this.options.selector = selector;

      this.reqId = createIntersectionObserverCallbacks.push(callback);

      UniServiceJSBridge.publishHandler('requestComponentObserver', {
        reqId: this.reqId,
        component: this.component,
        options: this.options
      }, checkInWindows(this.component) ? this.component : this.pageId);
    }

    disconnect () {
      UniServiceJSBridge.publishHandler('destroyComponentObserver', {
        reqId: this.reqId
      }, checkInWindows(this.component) ? this.component : this.pageId);
    }
  }

  function createIntersectionObserver (context, options) {
    if (!context._isVue) {
      options = context;
      context = null;
    }
    if (context) {
      return new ServiceIntersectionObserver(context, options)
    }
    return new ServiceIntersectionObserver(getCurrentPageVm('createIntersectionObserver'), options)
  }

  var require_context_module_1_23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createIntersectionObserver: createIntersectionObserver
  });

  const createMediaQueryObserverCallbacks = createCallbacks('requestMediaQueryObserver');

  class ServiceMediaQueryObserver {
    constructor (component, options) {
      this.pageId = component.$page && component.$page.id;
      this.component = component._$id || component; // app-plus 平台传输_$id
      this.options = options;
    }

    observe (options, callback) {
      if (typeof callback !== 'function') {
        return
      }
      this.options = options;

      this.reqId = createMediaQueryObserverCallbacks.push(callback);

      UniServiceJSBridge.publishHandler('requestMediaQueryObserver', {
        reqId: this.reqId,
        component: this.component,
        options: this.options
      }, checkInWindows(this.component) ? this.component : this.pageId);
    }

    disconnect () {
      UniServiceJSBridge.publishHandler('destroyMediaQueryObserver', {
        reqId: this.reqId
      }, checkInWindows(this.component) ? this.component : this.pageId);
    }
  }

  function createMediaQueryObserver (context, options) {
    if (!context._isVue) {
      options = context;
      context = null;
    }
    if (context) {
      return new ServiceMediaQueryObserver(context, options)
    }
    return new ServiceMediaQueryObserver(getCurrentPageVm('createMediaQueryObserver'), options)
  }

  var require_context_module_1_24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createMediaQueryObserver: createMediaQueryObserver
  });

  const ContextClasss = {
    canvas: CanvasContext,
    map: MapContext,
    video: VideoContext,
    editor: EditorContext
  };

  function convertContext (result) {
    if (result && result.context) {
      const { id, name, page } = result.context;
      const ContextClass = ContextClasss[name];
      result.context = ContextClass && new ContextClass(id, page);
    }
  }

  class NodesRef {
    constructor (selectorQuery, component, selector, single) {
      this._selectorQuery = selectorQuery;
      this._component = component;
      this._selector = selector;
      this._single = single;
    }

    boundingClientRect (callback) {
      this._selectorQuery._push(
        this._selector,
        this._component,
        this._single, {
          id: true,
          dataset: true,
          rect: true,
          size: true
        },
        callback);
      return this._selectorQuery
    }

    fields (fields, callback) {
      this._selectorQuery._push(
        this._selector,
        this._component,
        this._single,
        fields,
        callback
      );
      return this._selectorQuery
    }

    scrollOffset (callback) {
      this._selectorQuery._push(
        this._selector,
        this._component,
        this._single, {
          id: true,
          dataset: true,
          scrollOffset: true
        },
        callback
      );
      return this._selectorQuery
    }

    context (callback) {
      this._selectorQuery._push(
        this._selector,
        this._component,
        this._single, {
          context: true
        },
        callback
      );
      return this._selectorQuery
    }
  }

  class SelectorQuery {
    constructor (page) {
      this._page = page;
      this._queue = [];
      this._queueCb = [];
    }

    exec (callback) {
      invokeMethod('requestComponentInfo', this._page, this._queue, res => {
        const queueCbs = this._queueCb;
        res.forEach((result, index) => {
          if (Array.isArray(result)) {
            result.forEach(convertContext);
          } else {
            convertContext(result);
          }
          const queueCb = queueCbs[index];
          if (isFn(queueCb)) {
            queueCb.call(this, result);
          }
        });
        isFn(callback) && callback.call(this, res);
      });
    }

    ['in'] (component) {
      // app-plus 平台传递 id
      this._component = component._$id || component;
      return this
    }

    select (selector) {
      return new NodesRef(this, this._component, selector, true)
    }

    selectAll (selector) {
      return new NodesRef(this, this._component, selector, false)
    }

    selectViewport () {
      return new NodesRef(this, 0, '', true)
    }

    _push (selector, component, single, fields, callback) {
      this._queue.push({
        component,
        selector,
        single,
        fields
      });
      this._queueCb.push(callback);
    }
  }

  function createSelectorQuery (context) {
    if (context) {
      return new SelectorQuery(context)
    }
    return new SelectorQuery(getCurrentPageVm('createSelectorQuery'))
  }

  var require_context_module_1_25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createSelectorQuery: createSelectorQuery
  });

  UniServiceJSBridge.subscribe('onLoadFontFaceCallback', ({
    callbackId,
    data
  }) => {
    invoke$1(callbackId, data);
  });

  function loadFontFace$1 (options, callbackId) {
    const pageId = getCurrentPageId();
    if (!pageId) {
      return {
        errMsg: 'loadFontFace:fail not font page'
      }
    }
    UniServiceJSBridge.publishHandler('loadFontFace', {
      options,
      callbackId
    }, pageId);
  }

  var require_context_module_1_26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loadFontFace: loadFontFace$1
  });

  function getLocale$1 () {
    // 优先使用 $locale
    const app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale
    }
    return i18n.getLocale()
  }

  function setLocale (locale) {
    const oldLocale = getApp().$vm.$locale;
    if (oldLocale !== locale) {
      getApp().$vm.$locale = locale;
      {
        const pages = getCurrentPages();
        pages.forEach((page) => {
          UniServiceJSBridge.publishHandler(
            'setLocale',
            locale,
            page.$page.id
          );
        });
        weex.requireModule('plus').setLanguage(locale);
      }
      callbacks$a.forEach(callbackId => {
        invoke$1(callbackId, { locale });
      });
      return true
    }
    return false
  }
  const callbacks$a = [];
  function onLocaleChange (callbackId) {
    callbacks$a.push(callbackId);
  }

  var require_context_module_1_27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getLocale: getLocale$1,
    setLocale: setLocale,
    onLocaleChange: onLocaleChange
  });

  function pageScrollTo$1 (args) {
    const pages = getCurrentPages();
    if (pages.length) {
      UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id);
    }
    return {}
  }

  var require_context_module_1_28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pageScrollTo: pageScrollTo$1
  });

  function setPageMeta$1 (args) {
    const pages = getCurrentPages();
    if (pages.length) {
      UniServiceJSBridge.publishHandler('setPageMeta', args, pages[pages.length - 1].$page.id);
    }
    return {}
  }

  var require_context_module_1_29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setPageMeta: setPageMeta$1
  });

  function removeTabBarBadge$1 ({
    index
  }) {
    return invokeMethod('setTabBarBadge', {
      index,
      type: 'none'
    })
  }

  function showTabBarRedDot$1 ({
    index
  }) {
    return invokeMethod('setTabBarBadge', {
      index,
      type: 'redDot'
    })
  }

  const hideTabBarRedDot$1 = removeTabBarBadge$1;

  const callbacks$b = [];

  onMethod('onTabBarMidButtonTap', res => {
    callbacks$b.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onTabBarMidButtonTap (callbackId) {
    callbacks$b.push(callbackId);
  }

  var require_context_module_1_30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    removeTabBarBadge: removeTabBarBadge$1,
    showTabBarRedDot: showTabBarRedDot$1,
    hideTabBarRedDot: hideTabBarRedDot$1,
    onTabBarMidButtonTap: onTabBarMidButtonTap
  });

  const callbacks$c = [];
  onMethod('onViewDidResize', res => {
    callbacks$c.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onWindowResize (callbackId) {
    callbacks$c.push(callbackId);
  }

  function offWindowResize (callbackId) {
    // 此处和微信平台一致查询不到去掉最后一个
    callbacks$c.splice(callbacks$c.indexOf(callbackId), 1);
  }

  var require_context_module_1_31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onWindowResize: onWindowResize,
    offWindowResize: offWindowResize
  });

  const api$1 = Object.create(null);

  const modules$1 = 
    (function() {
      var map = {
        './base/base64.js': require_context_module_1_0,
  './base/can-i-use.js': require_context_module_1_1,
  './base/interceptor.js': require_context_module_1_2,
  './base/upx2px.js': require_context_module_1_3,
  './context/audio.js': require_context_module_1_4,
  './context/background-audio.js': require_context_module_1_5,
  './context/canvas.js': require_context_module_1_6,
  './context/create-map-context.js': require_context_module_1_7,
  './context/create-video-context.js': require_context_module_1_8,
  './context/editor.js': require_context_module_1_9,
  './context/inner-audio.js': require_context_module_1_10,
  './device/network.js': require_context_module_1_11,
  './device/theme.js': require_context_module_1_12,
  './keyboard/get-selected-text-range.js': require_context_module_1_13,
  './keyboard/keyboard.js': require_context_module_1_14,
  './media/preview-image.js': require_context_module_1_15,
  './media/recorder.js': require_context_module_1_16,
  './network/download-file.js': require_context_module_1_17,
  './network/request.js': require_context_module_1_18,
  './network/socket.js': require_context_module_1_19,
  './network/update.js': require_context_module_1_20,
  './network/upload-file.js': require_context_module_1_21,
  './ui/create-animation.js': require_context_module_1_22,
  './ui/create-intersection-observer.js': require_context_module_1_23,
  './ui/create-media-query-observer.js': require_context_module_1_24,
  './ui/create-selector-query.js': require_context_module_1_25,
  './ui/load-font-face.js': require_context_module_1_26,
  './ui/locale.js': require_context_module_1_27,
  './ui/page-scroll-to.js': require_context_module_1_28,
  './ui/set-page-meta.js': require_context_module_1_29,
  './ui/tab-bar.js': require_context_module_1_30,
  './ui/window.js': require_context_module_1_31,

      };
      var req = function req(key) {
        return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
      };
      req.keys = function() {
        return Object.keys(map);
      };
      return req;
    })();


  modules$1.keys().forEach(function (key) {
    Object.assign(api$1, modules$1(key));
  });

  var api$2 = Object.assign(Object.create(null), api$1, platformApi);

  const uni$1 = Object.create(null);

  apis_1.forEach(name => {
    if (api$2[name]) {
      uni$1[name] = promisify(name, wrapper(name, api$2[name]));
    } else {
      uni$1[name] = wrapperUnimplemented(name);
    }
  });

  function publishHandler (eventType, args, pageIds) {
    args = JSON.stringify(args);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[publishHandler]:[${+new Date()}]`, eventType, args, pageIds);
    }
    if (!Array.isArray(pageIds)) {
      pageIds = [pageIds];
    }
    const evalJSCode =
      `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${eventType}",${args},__PAGE_ID__)`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[publishHandler]:[${+new Date()}]`, 'length', evalJSCode.length);
    }
    pageIds.forEach(id => {
      const webview = plus.webview.getWebviewById(String(id));
      webview && webview.evalJS(evalJSCode.replace('__PAGE_ID__', id));
    });
  }

  const wx = Object.create(null);

  apis_1.forEach(name => {
    if (api$2[name]) {
      wx[name] = wrapper(name, api$2[name]);
    } else {
      wx[name] = wrapperUnimplemented(name);
    }
  });

  function callHook (vm, hook, params) {
    vm = vm.$vm || vm;
    return vm.__call_hook && vm.__call_hook(hook, params)
  }

  function callAppHook (vm, hook, params) {
    if (hook !== 'onError') {
      console.debug(`App：${hook} have been invoked` + (params ? ` ${JSON.stringify(params)}` : ''));
    }
    vm = vm.$vm || vm;
    return vm.__call_hook && vm.__call_hook(hook, params)
  }
  function callPageHook (vm, hook, params) {
    if (hook !== 'onPageScroll') {
      console.debug(`${vm.$page.route}[${vm.$page.id}]：${hook} have been invoked`);
    }
    return callHook(vm, hook, params)
  }

  function onMessage (pageId, arg) {
    pageId = parseInt(pageId);
    const page = getCurrentPages(true).find(page => page.$page.id === pageId);
    if (!page) {
      return
    }
    if (!page.$page.meta.isNVue) {
      const target = page.$vm._$vd.elements.find(target => target.type === 'web-view' && target.events.message);
      if (!target) {
        return
      }
      target.dispatchEvent('message', {
        type: 'message',
        target: Object.create(null),
        currentTarget: Object.create(null),
        timeStamp: Date.now(),
        detail: {
          data: [arg]
        }
      });
    }
  }

  function onWebInvokeAppService ({
    name,
    arg
  }, pageIds) {
    if (name === 'postMessage') {
      onMessage(pageIds[0], arg);
    } else {
      uni[name](arg);
    }
  }

  function initOn (on, {
    getApp,
    getCurrentPages
  }) {
    function onError (err) {
      callAppHook(getApp(), 'onError', err);
    }

    function onPageNotFound (page) {
      callAppHook(getApp(), 'onPageNotFound', page);
    }

    function onResize (args, pageId) {
      const page = getCurrentPages().find(page => page.$page.id === pageId);
      page && callPageHook(page, 'onResize', args);
    }

    function onPullDownRefresh (args, pageId) {
      const page = getCurrentPages().find(page => page.$page.id === pageId);
      if (page) {
        setPullDownRefreshPageId(pageId);
        callPageHook(page, 'onPullDownRefresh');
      }
    }

    function callCurrentPageHook (hook, args) {
      const pages = getCurrentPages();
      if (pages.length) {
        callPageHook(pages[pages.length - 1], hook, args);
      }
    }

    function createCallCurrentPageHook (hook) {
      return function (args) {
        callCurrentPageHook(hook, args);
      }
    }

    function onAppEnterBackground () {
      callAppHook(getApp(), 'onHide');
      callCurrentPageHook('onHide');
    }

    function onAppEnterForeground (enterOptions) {
      callAppHook(getApp(), 'onShow', enterOptions);
      const pages = getCurrentPages();
      if (pages.length === 0) {
        return
      }
      callCurrentPageHook('onShow');
    }

    const routeHooks = {
      navigateTo () {
        callCurrentPageHook('onHide');
      },
      navigateBack () {
        callCurrentPageHook('onShow');
      }
    };

    function onAppRoute ({
      type
    }) {
      const routeHook = routeHooks[type];
      routeHook && routeHook();
    }

    on('onError', onError);
    on('onPageNotFound', onPageNotFound);

    { // 后续有时间，h5 平台也要迁移到 onAppRoute
      on('onAppRoute', onAppRoute);
    }

    on('onAppEnterBackground', onAppEnterBackground);
    on('onAppEnterForeground', onAppEnterForeground);

    on('onResize', onResize);
    on('onPullDownRefresh', onPullDownRefresh);

    on('onTabItemTap', createCallCurrentPageHook('onTabItemTap'));
    on('onNavigationBarButtonTap', createCallCurrentPageHook('onNavigationBarButtonTap'));

    on('onNavigationBarSearchInputChanged', createCallCurrentPageHook('onNavigationBarSearchInputChanged'));
    on('onNavigationBarSearchInputConfirmed', createCallCurrentPageHook('onNavigationBarSearchInputConfirmed'));
    on('onNavigationBarSearchInputClicked', createCallCurrentPageHook('onNavigationBarSearchInputClicked'));
    on('onNavigationBarSearchInputFocusChanged', createCallCurrentPageHook('onNavigationBarSearchInputFocusChanged'));

    on('onWebInvokeAppService', onWebInvokeAppService);
  }

  function initSubscribe (subscribe, {
    getApp,
    getCurrentPages
  }) {
    function createPageEvent (eventType) {
      return function (args, pageId) {
        pageId = parseInt(pageId);
        const pages = getCurrentPages();
        const page = pages.find(page => page.$page.id === pageId);
        if (page) {
          callPageHook(page, eventType, args);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error(`Not Found：Page[${pageId}]`);
        }
      }
    }

    const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo');

    function onRequestComponentInfo ({
      reqId,
      res
    }) {
      const callback = requestComponentInfoCallbacks.pop(reqId);
      if (callback) {
        callback(res);
      }
    }

    const requestComponentObserverCallbacks = createCallbacks('requestComponentObserver');

    function onRequestComponentObserver ({
      reqId,
      reqEnd,
      res
    }) {
      const callback = requestComponentObserverCallbacks.get(reqId);
      if (callback) {
        if (reqEnd) {
          requestComponentObserverCallbacks.pop(reqId);
          return
        }
        callback(res);
      }
    }

    const requestMediaQueryObserverCallbacks = createCallbacks('requestMediaQueryObserver');

    function onRequestMediaQueryObserver ({
      reqId,
      reqEnd,
      res
    }) {
      const callback = requestMediaQueryObserverCallbacks.get(reqId);
      if (callback) {
        if (reqEnd) {
          requestMediaQueryObserverCallbacks.pop(reqId);
          return
        }
        callback(res);
      }
    }

    subscribe('onPageScroll', createPageEvent('onPageScroll'));
    subscribe('onReachBottom', createPageEvent('onReachBottom'));

    subscribe('onRequestComponentInfo', onRequestComponentInfo);
    subscribe('onRequestComponentObserver', onRequestComponentObserver);
    subscribe('onRequestMediaQueryObserver', onRequestMediaQueryObserver);
  }

  function perf (type, startTime) {
    /* eslint-disable no-undef */
    startTime = startTime || __UniServiceStartTime__;
    const endTime = Date.now();
    console.log(`[PERF][${endTime}] ${type} 耗时[${Date.now() - startTime}]`);
  }

  let isLaunchWebviewReady = false; // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady(主要是 Android)

  function onWebviewReady (data, pageId) {
    const isLaunchWebview = pageId === '1';
    if (isLaunchWebview && isLaunchWebviewReady) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[uni-app] onLaunchWebviewReady.prevent');
      }
      return
    }
    if (isLaunchWebview) { // 首页
      isLaunchWebviewReady = true;
      setPreloadWebview(plus.webview.getLaunchWebview());
    } else if (!preloadWebview) { // preloadWebview 不存在，重新加载一下
      setPreloadWebview(plus.webview.getWebviewById(pageId));
    }
    if (preloadWebview.id !== pageId) {
      return console.error(`webviewReady[${preloadWebview.id}][${pageId}] not match`)
    }
    preloadWebview.loaded = true; // 标记已 ready

    consumeWebviewReady(pageId);

    if (isLaunchWebview) {
      const entryPagePath = '/' + __uniConfig.entryPagePath;
      const routeOptions = __uniRoutes.find(route => route.path === entryPagePath);
      if (!routeOptions.meta.isNVue) { // 非 nvue 首页，需要主动跳转
        const navigateType = routeOptions.meta.isTabBar ? 'switchTab' : 'navigateTo';
        process.env.NODE_ENV !== 'production' && perf(`${entryPagePath} navigateTo`);
        return uni[navigateType]({
          url: entryPagePath + (__uniConfig.entryPageQuery || ''),
          openType: 'appLaunch'
        })
      }
    }
  }

  const vdSyncHandlers = Object.create(null);

  function registerVdSync (pageId, callback) {
    (vdSyncHandlers[pageId] || (vdSyncHandlers[pageId] = [])).push(callback);
  }

  function removeVdSync (pageId) {
    delete vdSyncHandlers[pageId];
  }

  function onVdSync ({
    data,
    options
  }, pageId) {
    const handlers = vdSyncHandlers[pageId];
    if (Array.isArray(handlers)) {
      handlers.forEach(handler => {
        handler(data);
      });
    }
  }

  const vdSyncCallbacks = []; // 数据同步 callback

  function onVdSyncCallback () {
    const copies = vdSyncCallbacks.slice(0);
    vdSyncCallbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  function onInvokeApi ({
    data: {
      method,
      args
    }
  }) {
    uni[method] && uni[method](args);
  }

  function onWxsInvokeCallMethod ({
    cid,
    method,
    args
  }, pageId) {
    pageId = parseInt(pageId);
    const page = getCurrentPages(true).find(page => page.$page.id === pageId);
    if (!page) {
      return console.error(`Page[${pageId}] not found`)
    }
    const vm = page.$vm._$vd.getVm(cid);
    if (!vm) {
      return console.error(`vm[${cid}] not found`)
    }
    vm[method] && vm[method](args);
  }

  function findPage (pageId) {
    pageId = parseInt(pageId);
    const page = getCurrentPages(true).find(page => page.$page.id === pageId);
    if (!page) {
      return console.error(`Page[${pageId}] not found`)
    }
    return page
  }
  function onWebviewInserted (data, pageId) {
    const page = findPage(pageId);
    page && (page.__uniapp_webview = true);
  }
  function onWebviewRemoved (data, pageId) {
    const page = findPage(pageId);
    page && (delete page.__uniapp_webview);
  }

  function initSubscribeHandlers () {
    const {
      on,
      emit,
      subscribe,
      publishHandler,
      subscribeHandler
    } = UniServiceJSBridge;

    initSubscribe(subscribe, {
      getApp,
      getCurrentPages
    });

    registerPlusMessage('subscribeHandler', (data) => {
      subscribeHandler(data.type, data.data, data.pageId);
    });

    if (__uniConfig.renderer !== 'native') {
      subscribe(WEBVIEW_READY, onWebviewReady);

      subscribe(VD_SYNC, onVdSync);
      subscribe(VD_SYNC_CALLBACK, onVdSyncCallback);

      const entryPagePath = '/' + __uniConfig.entryPagePath;
      const routeOptions = __uniRoutes.find(route => route.path === entryPagePath);
      if (!routeOptions.meta.isNVue) { // 首页是 vue
        // 防止首页 webview 初始化过早， service 还未开始监听
        publishHandler(WEBVIEW_READY, Object.create(null), [1]);
      }
    }

    // 应该使用subscribe，兼容老版本先用 on api 吧
    on('api.' + WEB_INVOKE_APPSERVICE$1, function (data, webviewIds) {
      emit('onWebInvokeAppService', data, webviewIds);
    });

    subscribe('onWxsInvokeCallMethod', onWxsInvokeCallMethod);

    subscribe(INVOKE_API, onInvokeApi);

    subscribe(WEBVIEW_INSERTED, onWebviewInserted);
    subscribe(WEBVIEW_REMOVED, onWebviewRemoved);
  }

  let appCtx;

  const defaultApp = {
    globalData: {}
  };

  function getApp$1 ({
    allowDefault = false
  } = {}) {
    if (appCtx) { // 真实的 App 已初始化
      return appCtx
    }
    if (allowDefault) { // 返回默认实现
      return defaultApp
    }
    console.error(
      '[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.'
    );
  }

  function initGlobalListeners () {
    const globalEvent = requireNativePlugin('globalEvent');
    const emit = UniServiceJSBridge.emit;

    if (weex.config.preload) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[uni-app] preload.addEventListener.backbutton');
      }
      plus.key.addEventListener('backbutton', backbuttonListener);
    } else {
      // splashclosed 时开始监听 backbutton
      plus.globalEvent.addEventListener('splashclosed', () => {
        plus.key.addEventListener('backbutton', backbuttonListener);
      });
    }

    plus.globalEvent.addEventListener('pause', () => {
      emit('onAppEnterBackground');
    });

    plus.globalEvent.addEventListener('resume', () => {
      const info = parseRedirectInfo();
      if (info && info.userAction) {
        initEnterOptions(info);
      }
      emit('onAppEnterForeground', getEnterOptions());
    });

    plus.globalEvent.addEventListener('netchange', () => {
      const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()] || 'unknown';
      publish('onNetworkStatusChange', {
        isConnected: networkType !== 'none',
        networkType
      });
    });

    let keyboardHeightChange = 0;
    plus.globalEvent.addEventListener('KeyboardHeightChange', function (event) {
      // 安卓设备首次获取高度为 0
      if (keyboardHeightChange !== event.height) {
        keyboardHeightChange = event.height;
        publish('onKeyboardHeightChange', {
          height: keyboardHeightChange
        });
      }
    });

    globalEvent.addEventListener('uistylechange', function (event) {
      const args = {
        theme: event.uistyle
      };

      callAppHook(appCtx, 'onThemeChange', args);
      publish('onThemeChange', args);

      // 兼容旧版本 API
      publish('onUIStyleChange', {
        style: event.uistyle
      });
    });

    globalEvent.addEventListener('uniMPNativeEvent', function (event) {
      publish('uniMPNativeEvent', event);
    });

    plus.globalEvent.addEventListener('plusMessage', onPlusMessage$1);

    // nvue webview post message
    plus.globalEvent.addEventListener('WebviewPostMessage', onPlusMessage$1);
  }

  function onPlusMessage$1 (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[plusMessage]:[' + Date.now() + ']' + JSON.stringify(e.data));
    }
    if (e.data && e.data.type) {
      const type = e.data.type;
      consumePlusMessage(type, e.data.args || {});
    }
  }

  function initAppLaunch (appVm) {
    const args = initLaunchOptions({
      path: __uniConfig.entryPagePath,
      query: __uniConfig.entryPageQuery,
      referrerInfo: __uniConfig.referrerInfo
    });

    callAppHook(appVm, 'onLaunch', args);
    callAppHook(appVm, 'onShow', args);
    // https://tower.im/teams/226535/todos/16905/
    const getAppState = weex.requireModule('plus').getAppState;
    const appState = getAppState && Number(getAppState());
    if (appState === 2) {
      callAppHook(appVm, 'onHide', args);
    }
  }

  function initTabBar () {
    if (!__uniConfig.tabBar || !__uniConfig.tabBar.list || !__uniConfig.tabBar.list.length) {
      return
    }

    __uniConfig.tabBar.selected = 0;

    const selected = __uniConfig.tabBar.list.findIndex(page => page.pagePath === __uniConfig.entryPagePath);

    tabBar$1.init(__uniConfig.tabBar, (item, index) => {
      uni.switchTab({
        url: '/' + item.pagePath,
        openType: 'switchTab',
        from: 'tabBar',
        success () {
          UniServiceJSBridge.emit('onTabItemTap', {
            index,
            text: item.text,
            pagePath: item.pagePath
          });
        }
      });
    });

    if (selected !== -1) {
      // 取当前 tab 索引值
      __uniConfig.tabBar.selected = selected;
      selected !== 0 && tabBar$1.switchTab(__uniConfig.entryPagePath);
    }
  }

  function clearTempFile () {
    // 统一处理路径
    function getPath (path) {
      path = path.replace(/\/$/, '');
      return path.indexOf('_') === 0 ? plus.io.convertLocalFileSystemURL(path) : path
    }
    var basePath = getPath(TEMP_PATH_BASE);
    var tempPath = getPath(TEMP_PATH);
    // 获取父目录
    var dirPath = tempPath.split('/');
    dirPath.pop();
    dirPath = dirPath.join('/');
    plus.io.resolveLocalFileSystemURL(plus.io.convertAbsoluteFileSystem(dirPath), entry => {
      var reader = entry.createReader();
      reader.readEntries(function (entries) {
        if (entries && entries.length) {
          entries.forEach(function (entry) {
            if (entry.isDirectory && entry.fullPath.indexOf(basePath) === 0 && entry.fullPath
              .indexOf(tempPath) !== 0) {
              entry.removeRecursively();
            }
          });
        }
      });
    });
  }

  function registerApp (appVm, Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[uni-app] registerApp');
    }
    appCtx = appVm;
    appCtx.$vm = appVm;
    initAppLocale(Vue, appVm);

    Object.assign(appCtx, defaultApp); // 拷贝默认实现

    const globalData = appVm.$options.globalData || {};
    // merge globalData
    appCtx.globalData = Object.assign(globalData, appCtx.globalData);

    initOn(UniServiceJSBridge.on, {
      getApp: getApp$1,
      getCurrentPages: getCurrentPages$1
    });

    initEntryPage();

    initTabBar();

    initGlobalListeners();

    initSubscribeHandlers();

    initAppLaunch(appVm);

    // 10s后清理临时文件
    setTimeout(clearTempFile, 10000);

    __uniConfig.ready = true;

    process.env.NODE_ENV !== 'production' && perf('registerApp');
  }

  var tags = [
    'uni-app',
    'uni-layout',
    'uni-content',
    'uni-main',
    'uni-top-window',
    'uni-left-window',
    'uni-right-window',
    'uni-tabbar',
    'uni-page',
    'uni-page-head',
    'uni-page-wrapper',
    'uni-page-body',
    'uni-page-refresh',
    'uni-actionsheet',
    'uni-modal',
    'uni-toast',
    'uni-resize-sensor',
    'uni-shadow-root',

    'uni-ad',
    'uni-audio',
    'uni-button',
    'uni-camera',
    'uni-canvas',
    'uni-checkbox',
    'uni-checkbox-group',
    'uni-cover-image',
    'uni-cover-view',
    'uni-editor',
    'uni-form',
    'uni-functional-page-navigator',
    'uni-icon',
    'uni-image',
    'uni-input',
    'uni-label',
    'uni-live-player',
    'uni-live-pusher',
    'uni-map',
    'uni-movable-area',
    'uni-movable-view',
    'uni-navigator',
    'uni-official-account',
    'uni-open-data',
    'uni-picker',
    'uni-picker-view',
    'uni-picker-view-column',
    'uni-progress',
    'uni-radio',
    'uni-radio-group',
    'uni-rich-text',
    'uni-scroll-view',
    'uni-slider',
    'uni-swiper',
    'uni-swiper-item',
    'uni-switch',
    'uni-text',
    'uni-textarea',
    'uni-video',
    'uni-view',
    'uni-web-view'
  ];

  // 使用白名单过滤（前期有一批自定义组件使用了 uni-）

  function initVue (Vue) {
    Vue.config.errorHandler = function (err, vm, info) {
      const errType = toRawType(err);
      Vue.util.warn(`Error in ${info}: "${errType === 'Error' ? err.toString() : err}"`, vm);
      const app = typeof getApp === 'function' && getApp();
      if (app && hasLifecycleHook(app.$options, 'onError')) {
        app.__call_hook('onError', err);
      } else {
        if ( process.env.NODE_ENV !== 'production' && errType === 'Error') {
          console.error(`
  ${err.message}
  ${err.stack}
  `);
        } else {
          console.error(err);
        }
      }
    };

    const oldIsReservedTag = Vue.config.isReservedTag;

    Vue.config.isReservedTag = function (tag) {
      return tags.indexOf(tag) !== -1 || oldIsReservedTag(tag)
    };

    Vue.config.ignoredElements = tags;

    const oldGetTagNamespace = Vue.config.getTagNamespace;

    const conflictTags = ['switch', 'image', 'text', 'view'];

    Vue.config.getTagNamespace = function (tag) {
      if (~conflictTags.indexOf(tag)) { // svg 部分标签名称与 uni 标签冲突
        return false
      }
      return oldGetTagNamespace(tag)
    };
  }

  /**
   * 补充一些环境兼容内容,如小程序 需要使用的 selectComponent...
   * 之所以在框架内补充,而不是在 mp-runtime 中处理,是因为小程序自定义组件可能需要获取 page 对象并使用 selectComponent
   * 故, 暂时添加到所有 vm 上
   * @param {Object} Vue
   */
  /**
   * 先简单支持 id 和 class
   * @param {Object} selector
   */
  function parseSelector (selector) {
    if (selector.indexOf('#') === 0) {
      const id = selector.substr(1);
      return function match (vnode) {
        // props
        if (vnode.componentInstance && vnode.componentInstance.id === id) {
          return true
        }
        // attrs
        if (vnode.data && vnode.data.attrs && vnode.data.attrs.id === id) {
          return true
        }
        return false
      }
    } else if (selector.indexOf('.') === 0) {
      const clazz = selector.substr(1);
      return function match (vnode) {
        return vnode.data && matchClass(clazz, vnode.data.staticClass, vnode.data.class)
      }
    }
  }

  const CLASS_RE = /\s+/;

  function matchClass (clazz, staticClass = '', dynamicClass = '') {
    if (staticClass) {
      return staticClass.split(CLASS_RE).indexOf(clazz) !== -1
    }
    if (dynamicClass && typeof dynamicClass === 'string') {
      return dynamicClass.split(CLASS_RE).indexOf(clazz) !== -1
    }
  }

  function querySelector (vm, matchSelector) {
    if (matchSelector(vm.$vnode || vm._vnode)) {
      return vm
    }
    const $children = vm.$children;
    for (let i = 0; i < $children.length; i++) {
      const childVm = querySelector($children[i], matchSelector);
      if (childVm) {
        return childVm
      }
    }
  }

  function querySelectorAll (vm, matchSelector, ret) {
    if (matchSelector(vm.$vnode || vm._vnode)) {
      ret.push(vm);
    }
    const $children = vm.$children;
    for (let i = 0; i < $children.length; i++) {
      querySelectorAll($children[i], matchSelector, ret);
    }
    return ret
  }

  function initPolyfill (Vue) {
    Vue.prototype.createIntersectionObserver = function createIntersectionObserver (options) {
      return uni.createIntersectionObserver(this, options)
    };

    Vue.prototype.createMediaQueryObserver = function createMediaQueryObserver (options) {
      return uni.createMediaQueryObserver(this, options)
    };

    Vue.prototype.selectComponent = function selectComponent (selector) {
      return querySelector(this, parseSelector(selector))
    };

    Vue.prototype.selectAllComponents = function selectAllComponents (selector) {
      return querySelectorAll(this, parseSelector(selector), [])
    };
  }

  /**
   * mpvue event
   */
  function wrapperMPEvent (event) {
    event.mp = Object.assign({
      '@warning': 'mp is deprecated'
    }, event);
    event._processed = true;
    return event
  }

  function generateId (vm, parent, version) {
    if (!vm.$parent) {
      return '-1'
    }
    const vnode = vm.$vnode;
    const context = vnode.context;
    let id = vnode.data.attrs._i;
    if (version && hasOwn(vnode.data, 'key')) { // 补充 key 值
      id = id + ';' + vnode.data.key;
    }
    // slot 内的组件，需要补充 context 的 id，否则可能与内部组件索引值一致，导致 id 冲突
    if (context && context !== parent && context._$id) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('generateId:' + context._$id + ';' + parent._$id + ',' + id);
      }
      return context._$id + ';' + parent._$id + ',' + id
    }
    return parent._$id + ',' + id
  }

  const isAndroid = plus.os.name.toLowerCase() === 'android';
  const FOCUS_TIMEOUT = isAndroid ? 300 : 700;
  let keyboardHeight = 0;
  let onKeyboardShow;
  let focusTimer;

  function hookKeyboardEvent (event, callback) {
    onKeyboardShow = null;
    focusTimer && clearTimeout(focusTimer);
    if (event.type === 'focus') {
      if (keyboardHeight > 0) {
        event.detail.height = keyboardHeight;
      } else {
        focusTimer = setTimeout(function () {
          event.detail.height = keyboardHeight;
          callback(event);
        }, FOCUS_TIMEOUT);
        onKeyboardShow = function () {
          clearTimeout(focusTimer);
          event.detail.height = keyboardHeight;
          callback(event);
        };
        return
      }
    }
    callback(event);
  }

  onMethod('onKeyboardHeightChange', res => {
    keyboardHeight = res.height;
    if (keyboardHeight > 0) {
      const callback = onKeyboardShow;
      onKeyboardShow = null;
      callback && callback();
    }
  });

  function parseComponentCreateOptions (vm) {
    // 目前方案调整为 service 层直接处理,暂不需要同步配置到 view 层
    // if (vm.$options.mpOptions && vm.$options.mpOptions.externalClasses) {
    //   return {
    //     mpOptions: {
    //       externalClasses: vm.$options.mpOptions.externalClasses
    //     }
    //   }
    // }
  }

  function wrapperEvent (event) {
    event.preventDefault = noop;
    event.stopPropagation = noop;
    return wrapperMPEvent(event)
  }

  const handleVdData = {
    [UI_EVENT]: function onUIEvent (vdBatchEvent, vd) {
      vdBatchEvent.forEach(([cid, nid, event]) => {
        nid = String(nid);
        const target = vd.elements.find(target => target.cid === cid && target.nid === nid);
        if (!target) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(`event handler[${cid}][${nid}] not found`);
          }
          return
        }
        const type = event.type;
        const mpEvent = wrapperEvent(event);
        if (type === 'focus' || type === 'blur') {
          hookKeyboardEvent(mpEvent, event => {
            target.dispatchEvent(type, event);
          });
        } else {
          target.dispatchEvent(type, mpEvent);
        }
      });
    }
  };

  function onVdSync$1 (vdBatchData, vd) {
    vdBatchData.forEach(([type, vdData]) => {
      handleVdData[type](vdData, vd);
    });
  }

  class VDomSync {
    constructor (pageId, pagePath, pageQuery, pageVm) {
      this.pageId = pageId;
      this.pagePath = pagePath;
      this.pageQuery = pageQuery;
      this.pageVm = pageVm;
      this.batchData = [];
      this.vms = Object.create(null);
      this.initialized = false;

      this.pageCreateData = false;

      this.elements = []; //  目前仅存储事件 element

      this._init();
    }

    _init () {
      registerVdSync(this.pageId, (vdBatchData) => {
        onVdSync$1(vdBatchData, this);
      });
    }

    addMountedVm (vm) {
      vm._$mounted(); // 触发vd数据同步
      this.addVdSyncCallback(function mounted () {
        vm.__call_hook('mounted');
      });
    }

    addUpdatedVm (vm) {
      vm._$updated(); // 触发vd数据同步
      this.addVdSyncCallback(function mounted () {
        vm.__call_hook('updated');
      });
    }

    addVdSyncCallback (callback) {
      isFn(callback) && vdSyncCallbacks.push(callback);
    }

    getVm (id) {
      return this.vms[id]
    }

    addVm (vm) {
      const id = vm._$id;
      const oldVm = this.vms[id];
      if (oldVm) {
        const newId = generateId(oldVm, oldVm.$parent, VD_SYNC_VERSION);
        oldVm._$id = newId;
        this.vms[newId] = oldVm;
        this.elements.forEach(element => {
          const cid = element.cid;
          element.cid = cid === id ? newId : cid;
        });
      }
      this.vms[id] = vm;
    }

    removeVm (vm) {
      const cid = vm._$id;
      if (vm === this.vms[cid]) { // 仅相同vm的才移除，否则保留
        // 目前同一位置的vm，cid均一样
        // 移除尚未同步的data
        this.batchData = this.batchData.filter(data => data[1][0] !== cid);
        delete this.vms[cid];
      }
    }

    addElement (elm) {
      this.elements.indexOf(elm) === -1 && this.elements.push(elm);
    }

    removeElement (elm) {
      const elmIndex = this.elements.indexOf(elm);
      if (elmIndex === -1) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(`removeElement[${elm.cid}][${elm.nid}] not found`);
        }
        return
      }
      this.elements.splice(elmIndex, 1);
    }

    push (type, cid, data, options) {
      const typeData = [cid, data];
      if (options) {
        typeData.push(options);
      }
      this.batchData.push([type, typeData]);
    }

    find (type, cid) {
      return this.batchData.find(data => data[0] === type && data[1][0] === cid)
    }

    sendPageCreate (data) {
      this.pageCreateData = data;
      UniServiceJSBridge.publishHandler(VD_SYNC, {
        data: [
          [PAGE_CREATE, data]
        ],
        options: {
          timestamp: Date.now()
        }
      }, [this.pageId]);
    }

    flush () {
      if (!this.initialized) {
        this.initialized = true;
        this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath, this.pageQuery]]);
      }
      const batchData = this.batchData.filter(data => {
        if (data[0] === UPDATED_DATA && !Object.keys(data[1][1]).length) {
          return false
        }
        return true
      });
      this.batchData.length = 0;
      if (batchData.length) {
        UniServiceJSBridge.publishHandler(VD_SYNC, {
          data: batchData,
          options: {
            timestamp: Date.now()
          }
        }, [this.pageId]);
      }
    }

    restorePageCreate () {
      this.batchData.push([PAGE_CREATE, this.pageCreateData]);
    }

    restoreMountedData () {
      const addMountedData = (vm) => {
        if (vm._$id) {
          this.push(MOUNTED_DATA, vm._$id, vm._$data, parseComponentCreateOptions());
        }
        // TODO vue 中 $children 顺序不可靠，可能存在恢复误差
        vm.$children.forEach(childVm => addMountedData(childVm));
      };
      addMountedData(this.pageVm);
    }

    restorePageCreated () {
      this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath, this.pageQuery]]);
    }

    restore () {
      this.initialized = true;
      this.batchData.length = 0;

      this.restorePageCreate();
      this.restoreMountedData();
      this.restorePageCreated();

      this.flush();
    }

    destroy () {
      this.batchData.length = 0;
      this.vms = Object.create(null);
      this.initialized = false;
      this.elements.length = 0;
      removeVdSync(this.pageId);
    }
  }

  function setResult (data, k, v) {
    data[k] = v;
  }

  function diffElmData (newObj, oldObj) {
    let result, key, cur, old;
    for (key in newObj) {
      cur = newObj[key];
      old = oldObj[key];
      if (!looseEqual(old, cur)) {
        setResult(result || (result = Object.create(null)), key, cur);
      }
    }
    return result
  }

  function diff (newData, oldData, result) {
    let id, cur, old;
    for (id in newData) {
      cur = newData[id];
      old = oldData[id];
      if (!old) {
        setResult(result, id, cur);
        continue
      }
      const idObj = diffElmData(cur, old);
      idObj && setResult(result, id, idObj);
    }
    return result
  }

  function initData (Vue) {
    Vue.prototype._$s = setData;

    Vue.prototype._$setData = function setData (type, data) {
      this._$vd.push(
        type,
        this._$id,
        data,
        type === MOUNTED_DATA && parseComponentCreateOptions()
      );
    };

    Vue.prototype._$mounted = function mounted () {
      if (!this._$vd) {
        return
      }
      diff(this._$newData, this._$data, this._$vdMountedData);
      this._$data = JSON.parse(JSON.stringify(this._$newData));
      if (this.mpType === 'page') {
        // 页面 mounted 之后，第一次同步数据
        this._$vd.flush();
      }
    };

    Vue.prototype._$updated = function updated () {
      if (!this._$vd) {
        return
      }

      diff(this._$newData, this._$data, this._$vdUpdatedData);
      this._$data = JSON.parse(JSON.stringify(this._$newData));
      // setTimeout 一下再 nextTick（ 直接 nextTick 的话，会紧接着该 updated 做 flush，导致父组件 updated 数据被丢弃）
      this._$vd.initialized && setTimeout(() => {
        this.$nextTick(this._$vd.flush.bind(this._$vd));
      }, 0);
    };

    Object.defineProperty(Vue.prototype, '_$vd', {
      get () {
        return this.$root._$vdomSync
      }
    });

    Vue.mixin({
      beforeCreate () {
        if (this.$options.mpType) {
          this.mpType = this.$options.mpType;
        }
        if (this.mpType === 'app') {
          return
        }
        if (this.mpType === 'page') {
          this._$vdomSync = new VDomSync(this.$options.pageId, this.$options.pagePath, this.$options.pageQuery, this);
        }
        if (this._$vd) {
          this._$id = generateId(this, this.$parent, VD_SYNC_VERSION);
          this._$vd.addVm(this);
          this._$vdMountedData = Object.create(null);
          this._$setData(MOUNTED_DATA, this._$vdMountedData);
          this._$data = Object.create(null);
          this._$newData = Object.create(null);
        }
      },
      beforeUpdate () {
        if (!this._$vd) {
          return
        }
        // 当已存在 _$vdMountedData 时,使用重置后的 _$vdMountedData
        const mountedData = this._$vd.find(MOUNTED_DATA, this._$id);
        if (mountedData) {
          this._$data = Object.create(null); // 清空已有数据
          this._$vdUpdatedData = mountedData[1][1] = Object.create(null);
          if (process.env.NODE_ENV !== 'production') {
            console.log('updated=>mounted:' + this._$id);
          }
        } else {
          this._$vdUpdatedData = Object.create(null);
          this._$setData(UPDATED_DATA, this._$vdUpdatedData);
        }
        this._$newData = Object.create(null);
      },
      beforeDestroy () {
        if (!this._$vd) {
          return
        }
        this._$vd.removeVm(this);
        this._$vdomSync && this._$vdomSync.destroy();
      }
    });
  }

  function parseExternalClasses (clazz, vm) {
    const mpOptions = vm.$options.mpOptions;
    if (mpOptions && Array.isArray(mpOptions.externalClasses)) {
      mpOptions.externalClasses.forEach(externalClass => {
        // 简单替换 externalClass
        const externalClassValue = vm[camelize(externalClass)];
        externalClassValue && (clazz = clazz.replace(externalClass, externalClassValue));
      });
    }
    return clazz
  }

  function setData (id, name, value) {
    switch (name) {
      case B_CLASS:
        value = parseExternalClasses(this._$stringifyClass(value), this);
        break
      case S_CLASS:
        value = parseExternalClasses(value, this);
        break
      case B_STYLE:
        value = this._$normalizeStyleBinding(value);
        break
      case V_IF:
      case V_SHOW:
      case V_ELSE_IF:
        value = value ? 1 : 0;
        break
      case V_FOR:
        return setForData.call(this, id, value)
    }

    return ((this._$newData[id] || (this._$newData[id] = {}))[name] = value)
  }

  function fillVForData (forItems, vForData) {
    let i, l;
    if (Array.isArray(forItems) || typeof forItems === 'string') {
      for (i = 0, l = forItems.length; i < l; i++) {
        vForData[i] = i;
      }
    } else if (typeof forItems === 'number') {
      for (i = 0; i < forItems; i++) {
        vForData[i] = i;
      }
    } else if (isObject(forItems)) {
      for (i = 0, l = Object.keys(forItems).length; i < l; i++) {
        vForData[i] = i;
      }
    }
  }

  function setForData (id, value) {
    const diffData = this._$newData[id] || (this._$newData[id] = {});
    const vForData = diffData[V_FOR] || (diffData[V_FOR] = []);

    if (value.forItems) {
      value.fill && fillVForData(value.forItems, vForData);
      return value.forItems
    }

    const {
      forIndex,
      key
    } = value;

    if (!hasOwn(value, 'keyIndex')) {
      vForData[forIndex] = key;
    } else {
      if (typeof vForData[forIndex] !== 'object') {
        vForData[forIndex] = {};
      }
      vForData[forIndex]['k' + value.keyIndex] = key;
    }
    return key
  }

  /* @flow */

  const LIFECYCLE_HOOKS = [
    // App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    // Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onNavigationBarSearchInputFocusChanged',
    // Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    // 小程序的 created,attached 生命周期(需要在 service 层的 Vue 内核 mounted 时触发,因小程序 created 可以使用 selectComponent)
    'onServiceCreated',
    'onServiceAttached'
  ];

  const KEYS = ['data', 'properties', 'options', 'relations'];

  function mergeObject (ret, fromVal, key) {
    if (fromVal[key]) {
      Object.assign((ret[key] || (ret[key] = {})), fromVal[key]);
    }
  }

  function mergeArray (toArray, fromArray) {
    toArray.push(...fromArray);
  }

  function mergeOptions (ret, toVal) {
    KEYS.forEach(key => {
      mergeObject(ret, toVal, key);
    });
    if (toVal.externalClasses) {
      mergeArray((ret.externalClasses || (ret.externalClasses = [])), toVal.externalClasses);
    }
    if (toVal.path) {
      ret.path = toVal.path;
    }
  }

  function lifecycleMixin (Vue) {
    // fixed vue-class-component
    const oldExtend = Vue.extend;
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};

      const methods = extendOptions.methods;
      if (methods) {
        Object.keys(methods).forEach(methodName => {
          if (LIFECYCLE_HOOKS.indexOf(methodName) !== -1) {
            extendOptions[methodName] = methods[methodName];
            delete methods[methodName];
          }
        });
      }

      return oldExtend.call(this, extendOptions)
    };

    const strategies = Vue.config.optionMergeStrategies;
    const mergeHook = strategies.created;
    LIFECYCLE_HOOKS.forEach(hook => {
      strategies[hook] = mergeHook;
    });

    // mp runtime
    strategies.mpOptions = function (toVal, fromVal) {
      // data,properties,options,externalClasses,relations,path
      if (!toVal) {
        return fromVal
      }
      const ret = Object.create(null);
      mergeOptions(ret, toVal);
      if (fromVal) {
        mergeOptions(ret, fromVal);
      }
      return ret
    };
  }

  function parsePageCreateOptions (vm, route) {
    const pagePath = '/' + route;
    const routeOptions = __uniRoutes.find(route => route.path === pagePath);

    const windowOptions = Object.assign({}, __uniConfig.window, routeOptions.window);
    const disableScroll = windowOptions.disableScroll === true ? 1 : 0;
    const onReachBottomDistance = hasOwn(windowOptions, 'onReachBottomDistance')
      ? parseInt(windowOptions.onReachBottomDistance)
      : ON_REACH_BOTTOM_DISTANCE;

    const onPageScroll = hasLifecycleHook(vm.$options, 'onPageScroll') ? 1 : 0;
    const onPageReachBottom = hasLifecycleHook(vm.$options, 'onReachBottom') ? 1 : 0;
    const statusbarHeight = getStatusbarHeight();

    return {
      version: VD_SYNC_VERSION,
      locale: weex.requireModule('plus').getLanguage(),
      disableScroll,
      onPageScroll,
      onPageReachBottom,
      onReachBottomDistance,
      statusbarHeight,
      windowTop: windowOptions.titleNView && windowOptions.titleNView.type === 'float' ? (statusbarHeight +
        NAVBAR_HEIGHT) : 0,
      windowBottom: (tabBar$1.indexOf(route) >= 0 && tabBar$1.cover) ? tabBar$1.height : 0
    }
  }

  function initLifecycle (Vue) {
    lifecycleMixin(Vue);

    Vue.mixin({
      beforeCreate () {
        // TODO 临时解决方案,service 层也注入 wxs (适用于工具类)
        const options = this.$options;

        // 自动挂载 $store
        if (options.store && !Vue.prototype.$store) {
          Vue.prototype.$store = options.store;
        }

        const wxs = options.wxs;
        if (wxs) {
          Object.keys(wxs).forEach(module => {
            this[module] = wxs[module];
          });
        }

        if (this.mpType === 'page') {
          const app = getApp();
          if (app.$vm && app.$vm.$i18n) {
            this._i18n = app.$vm.$i18n;
          }
          this.$scope = this.$options.pageInstance;
          this.$scope.$vm = this;
          delete this.$options.pageInstance;

          const route = this.$scope.route;
          const pageId = this.$scope.$page.id;
          // 通知页面已开始创建
          this._$vd.sendPageCreate([pageId, route, parsePageCreateOptions(this, route)]);
        }
      },
      created () {
        if (this.mpType === 'page') {
          // 理论上应该从最开始的 parseQuery 的地方直接 decode 两次，为了减少影响范围，先仅处理 onLoad 参数
          callPageHook(this.$scope, 'onLoad', decodedQuery(this.$options.pageQuery));
          callPageHook(this.$scope, 'onShow');
        }
      },
      beforeDestroy () {
        if (this.mpType === 'page') {
          callPageHook(this.$scope, 'onUnload');
        }
      },
      mounted () {
        if (this.mpType === 'page') {
          callPageHook(this.$scope, 'onReady');
          preloadSubPackages(this.$scope.route);
        }
      }
    });
  }

  var vuePlugin = {
    install (Vue, options) {
      initVue(Vue);

      initData(Vue);
      initLifecycle(Vue);

      initPolyfill(Vue);

      uniIdMixin(Vue);

      Vue.prototype.getOpenerEventChannel = function () {
        if (!this.$root.$scope.eventChannel) {
          this.$root.$scope.eventChannel = new EventChannel();
        }
        return this.$root.$scope.eventChannel
      };

      Object.defineProperty(Vue.prototype, '$page', {
        get () {
          return this.$root.$scope.$page
        }
      });
      // 兼容旧版本
      Object.defineProperty(Vue.prototype, '$mp', {
        get () {
          return {
            page: this.$root.$scope
          }
        }
      });

      const oldMount = Vue.prototype.$mount;
      Vue.prototype.$mount = function mount (el, hydrating) {
        if (this.mpType === 'app') {
          this.$options.render = function () {};
          if (weex.config.preload) { // preload
            if (process.env.NODE_ENV !== 'production') {
              console.log('[uni-app] preload app-service.js');
            }
            const globalEvent = weex.requireModule('globalEvent');
            globalEvent.addEventListener('launchApp', () => {
              if (process.env.NODE_ENV !== 'production') {
                console.log('[uni-app] launchApp');
              }
              plus.updateConfigInfo && plus.updateConfigInfo();
              registerApp(this, Vue);
              oldMount.call(this, el, hydrating);
            });
            return
          }
          registerApp(this, Vue);
        }
        return oldMount.call(this, el, hydrating)
      };

      Vue.prototype.$nextTick = function nextTick (cb) {
        const renderWatcher = this._watcher;
        const callback = typeof cb === 'function';
        const result = new Promise((resolve) => {
          if (
            renderWatcher &&
            this._$queue.find(watcher => renderWatcher === watcher)
          ) {
            vdSyncCallbacks.push(callback ? cb.bind(this) : resolve);
          } else {
            // $nextTick bind vm context
            Vue.nextTick(callback ? () => cb.call(this) : resolve);
          }
          callback && resolve();
        });
        return callback ? undefined : result
      };
    }
  };

  // 挂靠在uni上，暂不做全局导出
  uni$1.__$wx__ = wx;

  UniServiceJSBridge.publishHandler = publishHandler;
  UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler;
  UniServiceJSBridge.removeCallbackHandler = removeCallbackHandler;

  var index$1 = {
    __vuePlugin: vuePlugin,
    __definePage: definePage,
    __registerApp: registerApp,
    __registerPage: registerPage,
    uni: uni$1,
    getApp: getApp$1,
    getCurrentPages: getCurrentPages$1,
    EventChannel
  };

  return index$1;

}());

var uni = serviceContext.uni
var getApp = serviceContext.getApp
var getCurrentPages = serviceContext.getCurrentPages

var __definePage = serviceContext.__definePage
var __registerPage = serviceContext.__registerPage


return serviceContext 
}
