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
    'removeInterceptor'
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
    'onSocketClose'
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
    'previewImage',
    'getImageInfo',
    'saveImageToPhotosAlbum',
    'compressImage',
    'getRecorderManager',
    'getBackgroundAudioManager',
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
    'onAccelerometerChange',
    'startAccelerometer',
    'stopAccelerometer',
    'onCompassChange',
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
    'onBeaconServiceChange',
    'onBeaconUpdate',
    'getBeacons',
    'startBeaconDiscovery',
    'stopBeaconDiscovery',
    'checkIsSupportSoterAuthentication',
    'checkIsSoterEnrolledInDevice',
    'startSoterAuthentication',
    'onUIStyleChange'
  ];

  const keyboard = [
    'hideKeyboard',
    'onKeyboardHeightChange'
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
    'createIntersectionObserver'
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
    'getSubNVueById',
    'getCurrentSubNVue',
    'setPageMeta'
  ];

  const ad = [
    'createRewardedVideoAd'
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

  const _toString = Object.prototype.toString;
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  function isFn (fn) {
    return typeof fn === 'function'
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
    return function () {
      clearTimeout(timeout);
      const timerFn = () => fn.apply(this, arguments);
      timeout = setTimeout(timerFn, delay);
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
        promise = Promise.then(wrapperHook(hook));
      } else {
        const res = hook(data);
        if (isPromise(res)) {
          promise = Promise.resolve(res);
        }
        if (res === false) {
          return {
            then () {}
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
      return res.then(res => {
        return res[1]
      }).catch(res => {
        return res[0]
      })
    }
  };

  const SYNC_API_RE =
    /^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

  const CONTEXT_API_RE = /^create|Manager$/;

  const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket'];

  const ASYNC_API = ['createBLEConnection'];

  const CALLBACK_API_RE = /^on/;

  function isContextApi (name) {
    return CONTEXT_API_RE.test(name)
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
      require: true
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
        value = Math.floor(value);
        params.quality = value > 0 && value < 1 ? value : 1;
      }
    }
  };

  const drawCanvas = {
    canvasId: {
      type: String,
      require: true
    },
    actions: {
      type: Array,
      require: true
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

  const makePhoneCall = {
    'phoneNumber': {
      type: String,
      required: true,
      validator (phoneNumber) {
        if (!phoneNumber) {
          return `makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;`
        }
      }
    }
  };

  var require_context_module_0_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makePhoneCall: makePhoneCall
  });

  const setClipboardData = {
    beforeSuccess () {
      uni.showToast({
        title: '内容已复制',
        icon: 'success',
        mask: false
      });
    }
  };

  var require_context_module_0_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setClipboardData: setClipboardData
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

  var require_context_module_0_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openDocument: openDocument
  });

  const chooseLocation = {
    keyword: {
      type: String
    }
  };

  var require_context_module_0_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseLocation: chooseLocation
  });

  const type = {
    WGS84: 'WGS84',
    GCJ02: 'GCJ02'
  };
  const getLocation = {
    type: {
      type: String,
      validator (value, params) {
        value = (value || '').toUpperCase();
        params.type = Object.values(type).indexOf(value) < 0 ? type.WGS84 : value;
      },
      default: type.WGS84
    },
    altitude: {
      altitude: Boolean,
      default: false
    }
  };

  var require_context_module_0_11 = /*#__PURE__*/Object.freeze({
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

  var require_context_module_0_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    openLocation: openLocation
  });

  const SIZE_TYPES = ['original', 'compressed'];
  const SOURCE_TYPES = ['album', 'camera'];

  const chooseImage = {
    'count': {
      type: Number,
      required: false,
      default: 9,
      validator (count, params) {
        if (count <= 0) {
          params.count = 9;
        }
      }
    },
    'sizeType': {
      type: [Array, String],
      required: false,
      default: SIZE_TYPES,
      validator (sizeType, params) {
        // 非必传的参数，不符合预期时处理为默认值。
        const length = sizeType.length;
        if (!length) {
          params.sizeType = SIZE_TYPES;
        } else if (typeof sizeType === 'string') {
          if (!~SIZE_TYPES.indexOf(sizeType)) {
            params.sizeType = SIZE_TYPES;
          }
        } else {
          for (let i = 0; i < length; i++) {
            if (typeof sizeType[i] !== 'string' || !~SIZE_TYPES.indexOf(sizeType[i])) {
              params.sizeType = SIZE_TYPES;
              break
            }
          }
        }
      }
    },
    'sourceType': {
      type: Array,
      required: false,
      default: SOURCE_TYPES,
      validator (sourceType, params) {
        const length = sourceType.length;
        if (!length) {
          params.sourceType = SOURCE_TYPES;
        } else {
          for (let i = 0; i < length; i++) {
            if (typeof sourceType[i] !== 'string' || !~SOURCE_TYPES.indexOf(sourceType[i])) {
              params.sourceType = SOURCE_TYPES;
              break
            }
          }
        }
      }
    }
  };

  var require_context_module_0_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseImage: chooseImage
  });

  const SOURCE_TYPES$1 = ['album', 'camera'];

  const chooseVideo = {
    'sourceType': {
      type: Array,
      required: false,
      default: SOURCE_TYPES$1,
      validator (sourceType, params) {
        const length = sourceType.length;
        if (!length) {
          params.sourceType = SOURCE_TYPES$1;
        } else {
          for (let i = 0; i < length; i++) {
            if (typeof sourceType[i] !== 'string' || !~SOURCE_TYPES$1.indexOf(sourceType[i])) {
              params.sourceType = SOURCE_TYPES$1;
              break
            }
          }
        }
      }
    }
  };

  var require_context_module_0_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    chooseVideo: chooseVideo
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
        filePath = 'https:' + filePath;
      } else {
        return addBase(filePath.substr(1))
      }
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

  const getImageInfo = {
    'src': {
      type: String,
      required: true,
      validator (src, params) {
        params.src = getRealPath(src);
      }
    }
  };

  var require_context_module_0_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getImageInfo: getImageInfo
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

  var require_context_module_0_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    previewImage: previewImage
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

  var require_context_module_0_17 = /*#__PURE__*/Object.freeze({
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
    CONNECT: 'CONNECT'
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
    for (let key in data) {
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
      type: [Object, String, ArrayBuffer],
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
    }
  };

  var require_context_module_0_18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request
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

  var require_context_module_0_19 = /*#__PURE__*/Object.freeze({
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
          params.type = getRealPath(value);
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

  var require_context_module_0_20 = /*#__PURE__*/Object.freeze({
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

  var require_context_module_0_21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getProvider: getProvider
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

      // tabBar不允许传递参数
      if (routeOptions.meta.isTabBar) {
        url = pagePath;
      }

      // 首页自动格式化为`/`
      if (routeOptions.meta.isEntry) {
        url = url.replace(routeOptions.alias, '/');
      }

      // 参数格式化
      params.url = encodeQueryString(url);
    }
  }

  function createProtocol (type, extras = {}) {
    return Object.assign({
      url: {
        type: String,
        required: true,
        validator: createValidator(type)
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

  var require_context_module_0_22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    navigateTo: navigateTo,
    switchTab: switchTab,
    navigateBack: navigateBack
  });

  const getStorage = {
    'key': {
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
    'key': {
      type: String,
      required: true
    },
    'data': {
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

  var require_context_module_0_23 = /*#__PURE__*/Object.freeze({
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

  var require_context_module_0_24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loadFontFace: loadFontFace
  });

  const FRONT_COLORS = ['#ffffff', '#000000'];
  const setNavigationBarColor = {
    'frontColor': {
      type: String,
      required: true,
      validator (frontColor, params) {
        if (FRONT_COLORS.indexOf(frontColor) === -1) {
          return `invalid frontColor "${frontColor}"`
        }
      }
    },
    'backgroundColor': {
      type: String,
      required: true
    },
    'animation': {
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
    'title': {
      type: String,
      required: true
    }
  };

  var require_context_module_0_25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setNavigationBarColor: setNavigationBarColor,
    setNavigationBarTitle: setNavigationBarTitle
  });

  const pageScrollTo = {
    scrollTop: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 300,
      validator (duration, params) {
        params.duration = Math.max(0, duration);
      }
    }
  };

  var require_context_module_0_26 = /*#__PURE__*/Object.freeze({
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
      default: '取消'
    },
    cancelColor: {
      type: String,
      default: '#000000'
    },
    confirmText: {
      type: String,
      default: '确定'
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
        if (['success', 'loading', 'none'].indexOf(icon) === -1) {
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
    }
  };

  var require_context_module_0_27 = /*#__PURE__*/Object.freeze({
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

  var require_context_module_0_28 = /*#__PURE__*/Object.freeze({
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
  './device/make-phone-call.js': require_context_module_0_7,
  './device/set-clipboard-data.js': require_context_module_0_8,
  './file/open-document.js': require_context_module_0_9,
  './location/choose-location.js': require_context_module_0_10,
  './location/get-location.js': require_context_module_0_11,
  './location/open-location.js': require_context_module_0_12,
  './media/choose-image.js': require_context_module_0_13,
  './media/choose-video.js': require_context_module_0_14,
  './media/get-image-info.js': require_context_module_0_15,
  './media/preview-image.js': require_context_module_0_16,
  './network/download-file.js': require_context_module_0_17,
  './network/request.js': require_context_module_0_18,
  './network/socket.js': require_context_module_0_19,
  './network/upload-file.js': require_context_module_0_20,
  './plugin/get-provider.js': require_context_module_0_21,
  './route/route.js': require_context_module_0_22,
  './storage/storage.js': require_context_module_0_23,
  './ui/load-font-face.js': require_context_module_0_24,
  './ui/navigation-bar.js': require_context_module_0_25,
  './ui/page-scroll-to.js': require_context_module_0_26,
  './ui/popup.js': require_context_module_0_27,
  './ui/tab-bar.js': require_context_module_0_28,

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
        const paramDefault = paramOptions['default'];
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
    console.error(errMsg);
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
        if (keys[i] === 'beforeValidate') {
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

    const invokeCallback = function (res) {
      callback(res);
    };

    invokeCallbacks[callbackId] = {
      name: invokeCallbackName,
      keepAlive: true,
      callback: invokeCallback
    };
    return callbackId
  }

  function createApiCallback (apiName, params = {}, extras = {}) {
    if (!isPlainObject(params)) {
      return {
        params
      }
    }
    params = Object.assign({}, params);

    const apiCallbacks = {};
    for (let name in params) {
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
    for (let name in extras) {
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
        let spaceIndex = res.errMsg.indexOf(' ');
        if (spaceIndex > -1) {
          errDetail = res.errMsg.substr(spaceIndex);
        }
        res.errMsg = apiName + ':fail' + errDetail;
      }

      const errMsg = res.errMsg;

      if (errMsg.indexOf(apiName + ':ok') === 0) {
        isFn(beforeSuccess) && beforeSuccess(res);

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

  function invokeCallbackHandler (invokeCallbackId, res) {
    if (typeof invokeCallbackId === 'number') {
      const invokeCallback = invokeCallbacks[invokeCallbackId];
      if (invokeCallback) {
        if (!invokeCallback.keepAlive) {
          delete invokeCallbacks[invokeCallbackId];
        }
        return invokeCallback.callback(res)
      }
    }
    return res
  }

  function wrapperUnimplemented (name) {
    return function todo (args) {
      console.error('API `' + name + '` is not yet implemented');
    }
  }

  function wrapperExtras (name, extras) {
    const protocolOptions = protocol[name];
    if (protocolOptions) {
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
          return invokeMethod(createKeepAliveApiCallback(name, args[0]))
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

  function upx2px$1 (number, newDeviceWidth) {
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
        return 1
      } else {
        return 0.5
      }
    }
    return number < 0 ? -result : result
  }

  var require_context_module_1_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    upx2px: upx2px$1
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

  const oldSetStatusBarStyle = plus.navigator.setStatusBarStyle;

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
      console.log(`[uni-app] setStatusBarStyle`, statusBarStyle);
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
    let o = t.split('/');
    for (n = 0, i = o.length; n < i && o[n] === '..'; n++);
    o.splice(0, n);
    t = o.join('/');
    let r = e.length > 0 ? e.split('/') : [];
    r.splice(r.length - n - 1, n + 1);
    return r.concat(o).join('/')
  };

  // 处理 Android 平台解压与非解压模式下获取的路径不一致的情况
  const _handleLocalPath = filePath => {
    let localUrl = plus.io.convertLocalFileSystemURL(filePath);
    return localUrl.replace(/^\/?apps\//, '/android_asset/apps/').replace(/\/$/, '')
  };

  function getRealPath$1 (filePath) {
    const SCHEME_RE = /^([a-z-]+:)?\/\//i;
    const DATA_RE = /^data:.*,.*/;

    // 无协议的情况补全 https
    if (filePath.indexOf('//') === 0) {
      filePath = 'https:' + filePath;
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

  function getStatusbarHeight () {
    // 横屏时 iOS 获取的状态栏高度错误，进行纠正
    return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === 'iOS' ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0
  }

  function getScreenInfo () {
    const orientation = plus.navigator.getOrientation();
    const landscape = Math.abs(orientation) === 90;
    // 安卓 plus 接口获取的屏幕大小值不为整数
    const width = plus.screen.resolutionWidth;
    const height = plus.screen.resolutionHeight;
    // 根据方向纠正宽高
    return {
      screenWidth: Math[landscape ? 'max' : 'min'](width, height),
      screenHeight: Math[landscape ? 'min' : 'max'](width, height)
    }
  }

  let audios = {};

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
    volume
  }) {
    const audio = audios[audioId];
    if (audio) {
      let style = {
        loop,
        autoplay
      };
      if (src) {
        audio.src = style.src = getRealPath$1(src);
      }
      if (startTime) {
        audio.startTime = style.startTime = startTime;
      }
      if (typeof volume === 'number') {
        audio.volume = style.volume = volume;
      }
      audio.setStyles(style);
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
    let {
      src,
      startTime,
      volume
    } = audio;

    return {
      errMsg: 'getAudioState:ok',
      duration: 1e3 * (audio.getDuration() || 0),
      currentTime: audio.isStopped ? 0 : 1e3 * audio.getPosition(),
      paused: audio.isPaused,
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
      audio[operationType === operationTypes[0] && audio.isPaused ? 'resume' : operationType]();
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

  const events = ['play', 'pause', 'ended', 'stop'];

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

  function setMusicState (args) {
    initMusic();
    const props = ['src', 'startTime', 'coverImgUrl', 'webUrl', 'singer', 'epname', 'title'];
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
        status: audio.isPaused ? 0 : 1,
        downloadPercent: Math.round(100 * audio.getBuffered() / audio.getDuration()),
        errMsg: `getMusicPlayerState:ok`
      }
    }
    return {
      status: 2,
      errMsg: `getMusicPlayerState:ok`
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
  function setBackgroundAudioState (args) {
    setMusicState(args);
    return {
      errMsg: `setBackgroundAudioState:ok`
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
      errMsg: `getBackgroundAudioState:ok`
    };
    const audio = getAudio();
    if (audio) {
      let newData = {
        duration: audio.getDuration() || 0,
        currentTime: audio.isStopped ? 0 : audio.getPosition(),
        paused: audio.isPaused,
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

  const DEVICE_FREQUENCY = 200;
  const NETWORK_TYPES = ['unknown', 'none', 'ethernet', 'wifi', '2g', '3g', '4g'];

  const MAP_ID = '__UNIAPP_MAP';

  const TEMP_PATH_BASE = '_doc/uniapp_temp';
  const TEMP_PATH = `${TEMP_PATH_BASE}_${Date.now()}`;

  /**
   * 5+错误对象转换为错误消息
   * @param {*} error 5+错误对象
   */
  function toErrMsg (error) {
    var msg = 'base64ToTempFilePath:fail';
    if (error && error.message) {
      msg += ` ${error.message}`;
    } else if (error) {
      msg += ` ${error}`;
    }
    return msg
  }

  function base64ToTempFilePath ({
    base64Data,
    x,
    y,
    width,
    height,
    destWidth,
    destHeight,
    canvasId,
    fileType,
    quality
  } = {}, callbackId) {
    var id = Date.now();
    var bitmap = new plus.nativeObj.Bitmap(`bitmap${id}`);
    bitmap.loadBase64Data(base64Data, function () {
      var formats = ['jpg', 'png'];
      var format = String(fileType).toLowerCase();
      if (formats.indexOf(format) < 0) {
        format = 'png';
      }
      /**
           * 保存配置
           */
      var saveOption = {
        overwrite: true,
        quality: typeof quality === 'number' ? quality * 100 : 100,
        format
      };
      /**
           * 保存文件路径
           */
      var tempFilePath = `${TEMP_PATH}/canvas/${id}.${format}`;

      bitmap.save(tempFilePath, saveOption, function () {
        clear();
        invoke$1(callbackId, {
          tempFilePath,
          errMsg: 'base64ToTempFilePath:ok'
        });
      }, function (error) {
        clear();
        invoke$1(callbackId, {
          errMsg: toErrMsg(error)
        });
      });
    }, function (error) {
      clear();
      invoke$1(callbackId, {
        errMsg: toErrMsg(error)
      });
    });

    function clear () {
      bitmap.clear();
    }
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
        const complete = callbacks['complete'];
        isFn(complete) && complete(ret);
      }
    }
  }

  const METHODS = {
    getCenterLocation (ctx, cbs) {
      return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs)
    },
    moveToLocation (ctx) {
      return invokeVmMethodWithoutArgs(ctx, 'moveToLocation')
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
      return console.warn('uni.createLivePusherContext 必须传入第二个参数，即当前 vm 对象(this)')
    }
    const elm = findElmById(id, vm);
    if (!elm) {
      return console.warn('Can not find `' + id + '`')
    }
    return new LivePusherContext(id, elm)
  }

  function createLivePusherContext$1 (id, vm) {
    return createLivePusherContext(id, vm)
  }

  let watchAccelerationId = false;
  let isWatchAcceleration = false;

  const clearWatchAcceleration = () => {
    if (watchAccelerationId) {
      plus.accelerometer.clearWatch(watchAccelerationId);
      watchAccelerationId = false;
    }
  };

  function enableAccelerometer ({
    enable
  }) {
    if (enable) { // 启用监听
      clearWatchAcceleration();
      watchAccelerationId = plus.accelerometer.watchAcceleration((res) => {
        publish('onAccelerometerChange', {
          x: res.xAxis,
          y: res.yAxis,
          z: res.zAxis,
          errMsg: 'enableAccelerometer:ok'
        });
      }, (e) => {
        publish('onAccelerometerChange', {
          errMsg: 'enableAccelerometer:fail'
        });
      }, {
        frequency: DEVICE_FREQUENCY
      });
      if (!isWatchAcceleration) {
        isWatchAcceleration = true;
        const webview = getLastWebview();
        if (webview) {
          webview.addEventListener('close', clearWatchAcceleration);
        }
      }
    } else {
      clearWatchAcceleration();
    }
    return {
      errMsg: 'enableAccelerometer:ok'
    }
  }

  function addPhoneContact ({
    photoFilePath = '',
    nickName,
    lastName,
    middleName,
    firstName,
    remark,
    mobilePhoneNumber,
    weChatNumber,
    addressCountry,
    addressState,
    addressCity,
    addressStreet,
    addressPostalCode,
    organization,
    title,
    workFaxNumber,
    workPhoneNumber,
    hostNumber,
    email,
    url,
    workAddressCountry,
    workAddressState,
    workAddressCity,
    workAddressStreet,
    workAddressPostalCode,
    homeFaxNumber,
    homePhoneNumber,
    homeAddressCountry,
    homeAddressState,
    homeAddressCity,
    homeAddressStreet,
    homeAddressPostalCode
  } = {}, callbackId) {
    plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
      const contact = addressbook.create();
      const name = {};
      if (lastName) {
        name.familyName = lastName;
      }
      if (firstName) {
        name.givenName = firstName;
      }
      if (middleName) {
        name.middleName = middleName;
      }
      contact.name = name;

      if (nickName) {
        contact.nickname = nickName;
      }

      if (photoFilePath) {
        contact.photos = [{
          type: 'url',
          value: photoFilePath
        }];
      }

      if (remark) {
        contact.note = remark;
      }

      const mobilePhone = {
        type: 'mobile'
      };

      const workPhone = {
        type: 'work'
      };

      const companyPhone = {
        type: 'company'
      };

      const homeFax = {
        type: 'home fax'
      };

      const workFax = {
        type: 'work fax'
      };

      if (mobilePhoneNumber) {
        mobilePhone.value = mobilePhoneNumber;
      }

      if (workPhoneNumber) {
        workPhone.value = workPhoneNumber;
      }

      if (hostNumber) {
        companyPhone.value = hostNumber;
      }

      if (homeFaxNumber) {
        homeFax.value = homeFaxNumber;
      }

      if (workFaxNumber) {
        workFax.value = workFaxNumber;
      }

      contact.phoneNumbers = [mobilePhone, workPhone, companyPhone, homeFax, workFax];

      if (email) {
        contact.emails = [{
          type: 'home',
          value: email
        }];
      }

      if (url) {
        contact.urls = [{
          type: 'other',
          value: url
        }];
      }

      if (weChatNumber) {
        contact.ims = [{
          type: 'other',
          value: weChatNumber
        }];
      }

      const defaultAddress = {
        type: 'other',
        preferred: true
      };

      const homeAddress = {
        type: 'home'
      };
      const companyAddress = {
        type: 'company'
      };

      if (addressCountry) {
        defaultAddress.country = addressCountry;
      }

      if (addressState) {
        defaultAddress.region = addressState;
      }

      if (addressCity) {
        defaultAddress.locality = addressCity;
      }

      if (addressStreet) {
        defaultAddress.streetAddress = addressStreet;
      }

      if (addressPostalCode) {
        defaultAddress.postalCode = addressPostalCode;
      }

      if (homeAddressCountry) {
        homeAddress.country = homeAddressCountry;
      }

      if (homeAddressState) {
        homeAddress.region = homeAddressState;
      }

      if (homeAddressCity) {
        homeAddress.locality = homeAddressCity;
      }

      if (homeAddressStreet) {
        homeAddress.streetAddress = homeAddressStreet;
      }

      if (homeAddressPostalCode) {
        homeAddress.postalCode = homeAddressPostalCode;
      }

      if (workAddressCountry) {
        companyAddress.country = workAddressCountry;
      }

      if (workAddressState) {
        companyAddress.region = workAddressState;
      }

      if (workAddressCity) {
        companyAddress.locality = workAddressCity;
      }

      if (workAddressStreet) {
        companyAddress.streetAddress = workAddressStreet;
      }

      if (workAddressPostalCode) {
        companyAddress.postalCode = workAddressPostalCode;
      }

      contact.addresses = [defaultAddress, homeAddress, companyAddress];

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

  /**
   * 执行蓝牙相关方法
   */
  function bluetoothExec (method, callbackId, data = {}, beforeSuccess) {
    var deviceId = data.deviceId;
    if (deviceId) {
      data.deviceId = deviceId.toUpperCase();
    }
    var serviceId = data.serviceId;
    if (serviceId) {
      data.serviceId = serviceId.toUpperCase();
    }

    plus.bluetooth[method.replace('Changed', 'Change')](Object.assign(data, {
      success (data) {
        if (typeof beforeSuccess === 'function') {
          beforeSuccess(data);
        }
        invoke$1(callbackId, Object.assign({}, data, {
          errMsg: `${method}:ok`,
          code: undefined,
          message: undefined
        }));
      },
      fail (error = {}) {
        invoke$1(callbackId, {
          errMsg: `${method}:fail ${error.message || ''}`,
          errCode: error.code || 0
        });
      }
    }));
  }
  /**
   * 监听蓝牙相关事件
   */
  function bluetoothOn (method, beforeSuccess) {
    plus.bluetooth[method.replace('Changed', 'Change')](function (data) {
      if (typeof beforeSuccess === 'function') {
        beforeSuccess(data);
      }
      publish(method, Object.assign({}, data, {
        code: undefined,
        message: undefined
      }));
    });
    return true
  }

  function checkDevices (data) {
    data.devices = data.devices.map(device => {
      var advertisData = device.advertisData;
      if (advertisData && typeof advertisData !== 'string') {
        device.advertisData = arrayBufferToBase64$2(advertisData);
      }
      return device
    });
  }

  var onBluetoothAdapterStateChange;
  var onBluetoothDeviceFound;
  var onBLEConnectionStateChange;
  var onBLEConnectionStateChanged;
  var onBLECharacteristicValueChange;

  function openBluetoothAdapter (data, callbackId) {
    onBluetoothAdapterStateChange = onBluetoothAdapterStateChange || bluetoothOn('onBluetoothAdapterStateChange');
    bluetoothExec('openBluetoothAdapter', callbackId);
  }

  function closeBluetoothAdapter (data, callbackId) {
    bluetoothExec('closeBluetoothAdapter', callbackId);
  }

  function getBluetoothAdapterState (data, callbackId) {
    bluetoothExec('getBluetoothAdapterState', callbackId);
  }

  function startBluetoothDevicesDiscovery (data, callbackId) {
    onBluetoothDeviceFound = onBluetoothDeviceFound || bluetoothOn('onBluetoothDeviceFound', checkDevices);
    bluetoothExec('startBluetoothDevicesDiscovery', callbackId, data);
  }

  function stopBluetoothDevicesDiscovery (data, callbackId) {
    bluetoothExec('stopBluetoothDevicesDiscovery', callbackId);
  }

  function getBluetoothDevices (data, callbackId) {
    bluetoothExec('getBluetoothDevices', callbackId, {}, checkDevices);
  }

  function getConnectedBluetoothDevices (data, callbackId) {
    bluetoothExec('getConnectedBluetoothDevices', callbackId, data);
  }

  function createBLEConnection (data, callbackId) {
    onBLEConnectionStateChange = onBLEConnectionStateChange || bluetoothOn('onBLEConnectionStateChange');
    onBLEConnectionStateChanged = onBLEConnectionStateChanged || bluetoothOn('onBLEConnectionStateChanged');
    bluetoothExec('createBLEConnection', callbackId, data);
  }

  function closeBLEConnection (data, callbackId) {
    bluetoothExec('closeBLEConnection', callbackId, data);
  }

  function getBLEDeviceServices (data, callbackId) {
    bluetoothExec('getBLEDeviceServices', callbackId, data);
  }

  function getBLEDeviceCharacteristics (data, callbackId) {
    bluetoothExec('getBLEDeviceCharacteristics', callbackId, data);
  }

  function notifyBLECharacteristicValueChange (data, callbackId) {
    onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange',
      data => {
        data.value = arrayBufferToBase64$2(data.value);
      });
    bluetoothExec('notifyBLECharacteristicValueChange', callbackId, data);
  }

  function notifyBLECharacteristicValueChanged (data, callbackId) {
    onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange',
      data => {
        data.value = arrayBufferToBase64$2(data.value);
      });
    bluetoothExec('notifyBLECharacteristicValueChanged', callbackId, data);
  }

  function readBLECharacteristicValue (data, callbackId) {
    onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange');
    bluetoothExec('readBLECharacteristicValue', callbackId, data);
  }

  function writeBLECharacteristicValue (data, callbackId) {
    if (typeof data.value === 'string') {
      data.value = base64ToArrayBuffer$2(data.value);
    }
    bluetoothExec('writeBLECharacteristicValue', callbackId, data);
  }

  function getScreenBrightness () {
    return {
      errMsg: 'getScreenBrightness:ok',
      value: plus.screen.getBrightness()
    }
  }

  function setScreenBrightness ({
    value
  } = {}) {
    plus.screen.setBrightness(value);
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

  let watchOrientationId = false;
  let isWatchOrientation = false;

  const clearWatchOrientation = () => {
    if (watchOrientationId) {
      plus.orientation.clearWatch(watchOrientationId);
      watchOrientationId = false;
    }
  };

  function enableCompass ({
    enable
  }) {
    if (enable) {
      clearWatchOrientation();
      watchOrientationId = plus.orientation.watchOrientation((o) => {
        publish('onCompassChange', {
          direction: o.magneticHeading,
          errMsg: 'enableCompass:ok'
        });
      }, (e) => {
        publish('onCompassChange', {
          errMsg: 'enableCompass:fail'
        });
      }, {
        frequency: DEVICE_FREQUENCY
      });
      if (!isWatchOrientation) {
        isWatchOrientation = true;
        const webview = getLastWebview();
        if (webview) {
          webview.addEventListener('close', () => {
            plus.orientation.clearWatch(watchOrientationId);
          });
        }
      }
    } else {
      clearWatchOrientation();
    }
    return {
      errMsg: 'enableCompass:ok'
    }
  }

  function getNetworkType () {
    return {
      errMsg: 'getNetworkType:ok',
      networkType: NETWORK_TYPES[plus.networkinfo.getCurrentType()]
    }
  }

  let beaconUpdateState = false;

  function onBeaconUpdate () {
    if (!beaconUpdateState) {
      plus.ibeacon.onBeaconUpdate(function (data) {
        publish('onBeaconUpdated', data);
      });
      beaconUpdateState = true;
    }
  }

  let beaconServiceChangeState = false;

  function onBeaconServiceChange () {
    if (!beaconServiceChangeState) {
      plus.ibeacon.onBeaconServiceChange(function (data) {
        publish('onBeaconServiceChange', data);
        publish('onBeaconServiceChanged', data);
      });
      beaconServiceChangeState = true;
    }
  }

  function getBeacons (params, callbackId) {
    plus.ibeacon.getBeacons({
      success: (result) => {
        invoke$1(callbackId, {
          errMsg: 'getBeacons:ok',
          beacons: result.beacons
        });
      },
      fail: (error) => {
        invoke$1(callbackId, {
          errMsg: 'getBeacons:fail:' + error.message
        });
      }
    });
  }

  function startBeaconDiscovery ({
    uuids,
    ignoreBluetoothAvailable = false
  }, callbackId) {
    plus.ibeacon.startBeaconDiscovery({
      uuids,
      ignoreBluetoothAvailable,
      success: (result) => {
        invoke$1(callbackId, {
          errMsg: 'startBeaconDiscovery:ok',
          beacons: result.beacons
        });
      },
      fail: (error) => {
        invoke$1(callbackId, {
          errMsg: 'startBeaconDiscovery:fail:' + error.message
        });
      }
    });
  }

  function stopBeaconDiscovery (params, callbackId) {
    plus.ibeacon.stopBeaconDiscovery({
      success: (result) => {
        invoke$1(callbackId, Object.assign(result, {
          errMsg: 'stopBeaconDiscovery:ok'
        }));
      },
      fail: (error) => {
        invoke$1(callbackId, {
          errMsg: 'stopBeaconDiscovery:fail:' + error.message
        });
      }
    });
  }

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

  const TITLEBAR_HEIGHT = 44;

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
      return console.warn(`${type} 已注册:` + (callbacks$1[type].toString()))
    }
    callback.keepAlive = !!keepAlive;
    callbacks$1[type] = callback;
  }

  const SCAN_ID = '__UNIAPP_SCAN';
  const SCAN_PATH = '_www/__uniappscan.html';

  const MESSAGE_TYPE = 'scanCode';

  function scanCode ({
    onlyFromCamera = false,
    scanType
  }, callbackId) {
    const barcode = plus.barcode;
    const SCAN_TYPES = {
      'qrCode': [
        barcode.QR,
        barcode.AZTEC,
        barcode.MAXICODE
      ],
      'barCode': [
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
      'datamatrix': [barcode.DATAMATRIX],
      'pdf417': [barcode.PDF417]
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
      filters = filters.concat(SCAN_TYPES['qrCode']).concat(SCAN_TYPES['barCode']).concat(SCAN_TYPES['datamatrix']).concat(
        SCAN_TYPES['pdf417']);
    }

    const buttons = [];
    if (!onlyFromCamera) {
      buttons.push({
        float: 'right',
        text: '相册',
        fontSize: '17px',
        width: '60px',
        onclick: function () {
          plus.gallery.pick(file => {
            barcode.scan(file, (type, code) => {
              if (isDark) {
                plus.navigator.setStatusBarStyle('isDark');
              }
              result = {
                type,
                code
              };
              webview.close('auto');
            }, () => {
              plus.nativeUI.toast('识别失败');
            }, filters);
          }, err => {
            if (err.code !== 12) {
              plus.nativeUI.toast('选择失败');
            }
          }, {
            multiple: false,
            system: false
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
        titleText: '扫码',
        titleSize: '17px',
        buttons
      },
      popGesture: 'close',
      backButtonAutoControl: 'close'
    }, {
      __uniapp_type: 'scan',
      __uniapp_dark: isDark,
      __uniapp_scan_type: filters,
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
          charSet: 'utf8',
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
    scanCode: scanCode
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
      const message = {
        __message: {
          data
        }
      };
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
        path: `${(typeof process === 'object' && process.env && process.env.VUE_APP_TEMPLATE_PATH) || ''}/${url}.js`,
        defaultFontSize: plus_.screen.resolutionWidth / 20,
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

  function scanCode$1 (options, callbackId) {
    const statusBarStyle = getStatusBarStyle$1();
    const isDark = statusBarStyle !== 'light';

    let result;
    const page = showPage({
      url: '__uniappscan',
      data: {
        scanType: options.scanType
      },
      style: {
        animationType: options.animationType || 'pop-in',
        titleNView: {
          autoBackButton: true,
          type: 'float',
          titleText: options.titleText || '扫码',
          titleColor: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0)',
          buttons: !options.onlyFromCamera ? [{
            text: options.albumText || '相册',
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
    scanCode: scanCode$1
  });

  function scanCode$2 (...array) {
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
    let supportMode = [];
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
    let supportRequestAuthMode = [];
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
    let enrolledRequestAuthMode = [];
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
        plus.nativeUI.showWaiting(authContent || '指纹识别中...').onclose = function () {
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

  var safeAreaInsets = {
    get bottom () {
      if (plus.os.name === 'iOS') {
        const safeArea = plus.navigator.getSafeAreaInsets();
        return safeArea ? safeArea.bottom : 0
      }
      return 0
    }
  };

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
  function setTabBarItem$1 (index, text, iconPath, selectedIconPath) {
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
    tabBar && tabBar.setTabBarItem(item);
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

  let maskClickCallback = [];

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
      return (config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) + safeAreaInsets.bottom
    },
    // tabBar是否遮挡内容区域
    get cover () {
      const array = ['extralight', 'light', 'dark'];
      // 设置背景颜色会失效
      return isIOS$1 && array.indexOf(config.blurEffect) >= 0 && !config.backgroundColor
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
      let callbackIndex = maskClickCallback.indexOf(callback);
      maskClickCallback.splice(callbackIndex, 1);
    }
  };

  function getSystemInfoSync () {
    return callApiSync(getSystemInfo, Object.create(null), 'getSystemInfo', 'getSystemInfoSync')
  }

  function getSystemInfo () {
    const platform = plus.os.name.toLowerCase();
    const ios = platform === 'ios';
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
        titleNView.height = style.type === 'transparent' ? 0 : (statusBarHeight + TITLEBAR_HEIGHT);
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
      system: plus.os.version,
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
      }
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
  const REGEX_FILENAME = /^.*[/]/;

  function getSavedFileDir (success, fail) {
    fail = fail || function () {};
    plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => { // 请求_doc fs
      fs.root.getDirectory(SAVED_DIR, { // 获取文件保存目录对象
        create: true
      }, dir => {
        success(dir);
      }, err => {
        fail('目录[' + SAVED_DIR + ']创建失败' + err.message);
      });
    }, err => {
      fail('目录[_doc]读取失败' + err.message);
    });
  }

  function saveFile ({
    tempFilePath
  } = {}, callbackId) {
    let fileName = tempFilePath.replace(REGEX_FILENAME, '');
    if (fileName) {
      let extName = '';
      if (~fileName.indexOf('.')) {
        extName = '.' + fileName.split('.').pop();
      }

      fileName = (+new Date()) + '' + extName;

      plus.io.resolveLocalFileSystemURL(getRealPath$1(tempFilePath), entry => { // 读取临时文件 FileEntry
        getSavedFileDir(dir => {
          entry.copyTo(dir, fileName, () => { // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
            const savedFilePath = SAVE_PATH + '/' + fileName;
            invoke$1(callbackId, {
              errMsg: 'saveFile:ok',
              savedFilePath
            });
          }, err => {
            invoke$1(callbackId, {
              errMsg: 'saveFile:fail 保存文件[' + tempFilePath +
                '] copyTo 失败:' + err.message
            });
          });
        }, message => {
          invoke$1(callbackId, {
            errMsg: 'saveFile:fail ' + message
          });
        });
      }, err => {
        invoke$1(callbackId, {
          errMsg: 'saveFile:fail 文件[' + tempFilePath + ']读取失败' + err.message
        });
      });
    } else {
      return {
        errMsg: 'saveFile:fail 文件名[' + tempFilePath + ']不存在'
      }
    }
  }

  function getSavedFileList (options, callbackId) {
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
            }, error => {
              invoke$1(callbackId, {
                errMsg: 'getSavedFileList:fail ' + error.message
              });
            }, false);
          });
        } else {
          invoke$1(callbackId, {
            errMsg: 'getSavedFileList:ok',
            fileList
          });
        }
      }, error => {
        invoke$1(callbackId, {
          errMsg: 'getSavedFileList:fail ' + error.message
        });
      });
    }, message => {
      invoke$1(callbackId, {
        errMsg: 'getSavedFileList:fail ' + message
      });
    });
  }

  function getFileInfo ({
    filePath,
    digestAlgorithm = 'md5'
  } = {}, callbackId) {
    // TODO 计算文件摘要
    plus.io.resolveLocalFileSystemURL(getRealPath$1(filePath), entry => {
      entry.getMetadata(meta => {
        invoke$1(callbackId, {
          errMsg: 'getFileInfo:ok',
          size: meta.size,
          digestAlgorithm: ''
        });
      }, err => {
        invoke$1(callbackId, {
          errMsg: 'getFileInfo:fail 文件[' +
            filePath +
            '] getMetadata 失败:' + err.message
        });
      });
    }, err => {
      invoke$1(callbackId, {
        errMsg: 'getFileInfo:fail 文件[' + filePath + ']读取失败:' + err.message
      });
    });
  }

  function getSavedFileInfo ({
    filePath
  } = {}, callbackId) {
    plus.io.resolveLocalFileSystemURL(getRealPath$1(filePath), entry => {
      entry.getMetadata(meta => {
        invoke$1(callbackId, {
          createTime: meta.modificationTime.getTime(),
          size: meta.size,
          errMsg: 'getSavedFileInfo:ok'
        });
      }, error => {
        invoke$1(callbackId, {
          errMsg: 'getSavedFileInfo:fail ' + error.message
        });
      }, false);
    }, () => {
      invoke$1(callbackId, {
        errMsg: 'getSavedFileInfo:fail file not find'
      });
    });
  }

  function removeSavedFile ({
    filePath
  } = {}, callbackId) {
    plus.io.resolveLocalFileSystemURL(getRealPath$1(filePath), entry => {
      entry.remove(() => {
        invoke$1(callbackId, {
          errMsg: 'removeSavedFile:ok'
        });
      }, err => {
        invoke$1(callbackId, {
          errMsg: 'removeSavedFile:fail 文件[' + filePath + ']删除失败:' + err.message
        });
      });
    }, () => {
      invoke$1(callbackId, {
        errMsg: 'removeSavedFile:fail file not find'
      });
    });
  }

  function openDocument$1 ({
    filePath,
    fileType
  } = {}, callbackId) {
    plus.io.resolveLocalFileSystemURL(getRealPath$1(filePath), entry => {
      plus.runtime.openFile(getRealPath$1(filePath));
      invoke$1(callbackId, {
        errMsg: 'openDocument:ok'
      });
    }, err => {
      invoke$1(callbackId, {
        errMsg: 'openDocument:fail 文件[' + filePath + ']读取失败:' + err.message
      });
    });
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
    let onShow = function () {
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
    altitude = false
  } = {}, callbackId) {
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

        invoke$1(callbackId, {
          errMsg: 'getLocation:fail ' + e.message
        });
      }, {
        geocode: geocode,
        enableHighAccuracy: altitude
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

  function openLocation$2 (data) {
    showPage({
      url: '__uniappopenlocation',
      data,
      style: {
        titleNView: {
          type: 'transparent'
        }
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
  function getFileInfo$1 (filePath) {
    return new Promise((resolve, reject) => {
      plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
        entry.getMetadata(function (meta) {
          resolve({
            size: meta.size
          });
        }, reject, false);
      }, reject);
    })
  }

  const invokeChooseImage = function (callbackId, type, sizeType, tempFilePaths = []) {
    if (!tempFilePaths.length) {
      invoke$1(callbackId, {
        code: sizeType,
        errMsg: `chooseImage:${type}`
      });
      return
    }
    var tempFiles = [];
    // plus.zip.compressImage 压缩文件并发调用在iOS端容易出现问题（图像错误、闪退），改为队列执行
    tempFilePaths.reduce((promise, tempFilePath, index, array) => {
      return promise
        .then(() => {
          return getFileInfo$1(tempFilePath)
        })
        .then(fileInfo => {
          var size = fileInfo.size;
          // 压缩阈值 0.5 兆
          var threshold = 1024 * 1024 * 0.5;
          // 判断是否需要压缩
          if ((sizeType.indexOf('compressed') >= 0 && sizeType.indexOf('original') < 0) || (((
            sizeType.indexOf(
              'compressed') < 0 && sizeType.indexOf('original') < 0) || (sizeType
            .indexOf('compressed') >= 0 && sizeType.indexOf(
            'original') >= 0)) && size > threshold)) {
            return new Promise((resolve, reject) => {
              var dstPath = TEMP_PATH + '/compressed/' + Date.now() + (
                tempFilePath.match(/\.\S+$/) || [''])[0];
              plus.nativeUI.showWaiting();
              plus.zip.compressImage({
                src: tempFilePath,
                dst: dstPath,
                overwrite: true
              }, () => {
                resolve(dstPath);
              }, (error) => {
                reject(error);
              });
            })
              .then(dstPath => {
                array[index] = tempFilePath = dstPath;
                return getFileInfo$1(tempFilePath)
              })
              .then(fileInfo => {
                return tempFiles.push({
                  path: tempFilePath,
                  size: fileInfo.size
                })
              })
          }
          return tempFiles.push({
            path: tempFilePath,
            size: size
          })
        })
    }, Promise.resolve())
      .then(() => {
        plus.nativeUI.closeWaiting();
        invoke$1(callbackId, {
          errMsg: `chooseImage:${type}`,
          tempFilePaths,
          tempFiles
        });
      }).catch(() => {
        plus.nativeUI.closeWaiting();
        invoke$1(callbackId, {
          errMsg: `chooseImage:${type}`
        });
      });
  };
  const openCamera = function (callbackId, sizeType) {
    const camera = plus.camera.getCamera();
    camera.captureImage(e => invokeChooseImage(callbackId, 'ok', sizeType, [e]),
      e => invokeChooseImage(callbackId, 'fail', 1), {
        filename: TEMP_PATH + '/camera/'
      });
  };
  const openAlbum = function (callbackId, sizeType, count) {
    // TODO Android 需要拷贝到 temp 目录
    plus.gallery.pick(e => invokeChooseImage(callbackId, 'ok', sizeType, e.files.map(file => {
      return file
    })), e => {
      invokeChooseImage(callbackId, 'fail', 2);
    }, {
      maximum: count,
      multiple: true,
      system: false,
      filename: TEMP_PATH + '/gallery/'
    });
  };

  function chooseImage$1 ({
    count = 9,
    sizeType = ['original', 'compressed'],
    sourceType = ['album', 'camera']
  } = {}, callbackId) {
    let fallback = true;
    if (sourceType.length === 1) {
      if (sourceType[0] === 'album') {
        fallback = false;
        openAlbum(callbackId, sizeType, count);
      } else if (sourceType[0] === 'camera') {
        fallback = false;
        openCamera(callbackId, sizeType);
      }
    }
    if (fallback) {
      plus.nativeUI.actionSheet({
        cancel: '取消',
        buttons: [{
          title: '拍摄'
        }, {
          title: '从手机相册选择'
        }]
      }, (e) => {
        switch (e.index) {
          case 0:
            invokeChooseImage(callbackId, 'fail', 0);
            break
          case 1:
            openCamera(callbackId, sizeType);
            break
          case 2:
            openAlbum(callbackId, sizeType, count);
            break
        }
      });
    }
  }

  const invokeChooseVideo = function (callbackId, type, tempFilePath = '') {
    let callbackResult = {
      errMsg: `chooseVideo:${type}`,
      tempFilePath: tempFilePath,
      duration: 0,
      size: 0,
      height: 0,
      width: 0
    };

    if (type !== 'ok') {
      invoke$1(callbackId, callbackResult);
      return
    }

    plus.io.getVideoInfo({
      filePath: tempFilePath,
      success (videoInfo) {
        callbackResult.size = videoInfo.size;
        callbackResult.duration = videoInfo.duration;
        callbackResult.width = videoInfo.width;
        callbackResult.height = videoInfo.height;
        invoke$1(callbackId, callbackResult);
      },
      fail () {
        invoke$1(callbackId, callbackResult);
      },
      complete () {
        invoke$1(callbackId, callbackResult);
      }
    });
  };
  const openCamera$1 = function (callbackId, maxDuration, cameraIndex) {
    const camera = plus.camera.getCamera();
    camera.startVideoCapture(e => invokeChooseVideo(callbackId, 'ok', e), e => invokeChooseVideo(
      callbackId, 'fail'), {
      index: cameraIndex,
      videoMaximumDuration: maxDuration,
      filename: TEMP_PATH + '/camera/'
    });
  };
  const openAlbum$1 = function (callbackId) {
    plus.gallery.pick(e => {
      invokeChooseVideo(callbackId, 'ok', e);
    }, e => invokeChooseVideo(callbackId, 'fail'), {
      filter: 'video',
      system: false,
      filename: TEMP_PATH + '/gallery/'
    });
  };
  function chooseVideo$1 ({
    sourceType = ['album', 'camera'],
    maxDuration = 60,
    camera = 'back'
  } = {}, callbackId) {
    let fallback = true;
    let cameraIndex = (camera === 'front') ? 2 : 1;
    if (sourceType.length === 1) {
      if (sourceType[0] === 'album') {
        fallback = false;
        openAlbum$1(callbackId);
      } else if (sourceType[0] === 'camera') {
        fallback = false;
        openCamera$1(callbackId, maxDuration, cameraIndex);
      }
    }
    if (fallback) {
      plus.nativeUI.actionSheet({
        cancel: '取消',
        buttons: [{
          title: '拍摄'
        }, {
          title: '从手机相册选择'
        }]
      }, e => {
        switch (e.index) {
          case 0:
            invokeChooseVideo(callbackId, 'fail');
            break
          case 1:
            openCamera$1(callbackId, maxDuration, cameraIndex);
            break
          case 2:
            openAlbum$1(callbackId);
            break
        }
      });
    }
  }

  function compressImage ({
    src,
    quality
  }, callbackId) {
    var dst = TEMP_PATH + '/compressed/' + Date.now() + (src.match(/\.\S+$/) || [''])[0];
    plus.zip.compressImage({
      src,
      dst,
      quality
    }, () => {
      invoke$1(callbackId, {
        errMsg: `compressImage:ok`,
        tempFilePath: dst
      });
    }, () => {
      invoke$1(callbackId, {
        errMsg: `compressImage:fail`
      });
    });
  }

  function getImageInfo$1 ({
    src
  } = {}, callbackId) {
    // fixed by hxy
    plus.io.getImageInfo({
      src,
      success (imageInfo) {
        invoke$1(callbackId, {
          errMsg: 'getImageInfo:ok',
          ...imageInfo
        });
      },
      fail () {
        invoke$1(callbackId, {
          errMsg: 'getImageInfo:fail'
        });
      }
    });
  }

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
        let hasLongPressActions = longPressActions && longPressActions.callbackId;
        if (!hasLongPressActions) {
          itemList = ['保存相册'];
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
          cancel: '取消'
        };
        if (title) {
          options.title = title;
        }
        // if (plus.os.name === 'iOS') {
        //   options.cancel = '取消'
        // }
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
              plus.nativeUI.toast('保存图片到相册成功');
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
          errMsg: '暂不支持录音pause操作'
        });
      }
    },
    resume () {
      if (recorder$1) {
        publishRecorderStateChange('error', {
          errMsg: '暂不支持录音resume操作'
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

  function saveImageToPhotosAlbum ({
    filePath
  } = {}, callbackId) {
    plus.gallery.save(getRealPath$1(filePath), e => {
      invoke$1(callbackId, {
        errMsg: 'saveImageToPhotosAlbum:ok'
      });
    }, e => {
      invoke$1(callbackId, {
        errMsg: 'saveImageToPhotosAlbum:fail'
      });
    });
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
    header
  } = {}) {
    const downloader = plus.downloader.createDownload(url, {
      time: __uniConfig.networkTimeout.downloadFile ? __uniConfig.networkTimeout.downloadFile / 1000 : 120,
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
      if (header.hasOwnProperty(name)) {
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

  function createRequestTaskById (requestTaskId, {
    url,
    data,
    header,
    method = 'GET',
    responseType,
    sslVerify = true
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
        if (method !== 'GET' && header[name].indexOf('application/x-www-form-urlencoded') === 0 && typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
          let bodyArray = [];
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
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

    const timeout = __uniConfig.networkTimeout.request;
    if (timeout) {
      abortTimeout = setTimeout(() => {
        aborted = true;
        publishStateChange$1({
          requestTaskId,
          state: 'fail',
          statusCode: 0,
          errMsg: 'timeout'
        });
      }, (timeout + 200));// TODO +200 发消息到原生层有时间开销，以后考虑由原生层回调超时
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
      sslVerify: !sslVerify
    };
    if (method !== 'GET') {
      options.body = data;
    }
    try {
      stream.fetch(options, ({
        ok,
        status,
        data,
        headers
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
            header: headers
          });
        } else {
          publishStateChange$1({
            requestTaskId,
            state: 'fail',
            statusCode,
            errMsg: 'abort statusCode:' + statusCode
          });
        }
      });
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
      protocol: Array.isArray(protocols) ? protocols.join(',') : protocols
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
    formData
  } = {}) {
    const uploader = plus.uploader.createUpload(url, {
      timeout: __uniConfig.networkTimeout.uploadFile ? __uniConfig.networkTimeout.uploadFile / 1000 : 120,
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
      if (header.hasOwnProperty(name)) {
        uploader.setRequestHeader(name, header[name]);
      }
    }
    for (const name in formData) {
      if (formData.hasOwnProperty(name)) {
        uploader.addData(name, String(formData[name]));
      }
    }
    if (files && files.length) {
      files.forEach(file => {
        uploader.addFile(getRealPath$1(file.uri), {
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
            errMsg: 'getProvider:fail:' + err.message
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
        errMsg: 'getProvider:fail:服务[' + service + ']不支持'
      });
    }
  }

  const loginServices = {};

  const loginByService = (provider, callbackId) => {
    function login () {
      loginServices[provider].login(res => {
        const authResult = res.target.authResult;
        invoke$1(callbackId, {
          code: authResult.code,
          authResult: authResult,
          errMsg: 'login:ok'
        });
      }, err => {
        invoke$1(callbackId, {
          code: err.code,
          errMsg: 'login:fail:' + err.message
        });
      }, provider === 'apple' ? { scope: 'email' } : {});
    }
    // 先注销再登录
    // apple登录logout之后无法重新触发获取email,fullname
    if (provider === 'apple') {
      login();
    } else {
      loginServices[provider].logout(login, login);
    }
  };
  /**
   * 微信登录
   */
  function login (params, callbackId) {
    const provider = params.provider || 'weixin';
    if (loginServices[provider]) {
      loginByService(provider, callbackId);
    } else {
      plus.oauth.getServices(services => {
        loginServices[provider] = services.find(({
          id
        }) => id === provider);
        if (!loginServices[provider]) {
          invoke$1(callbackId, {
            code: '',
            errMsg: 'login:fail:登录服务[' + provider + ']不存在'
          });
        } else {
          loginByService(provider, callbackId);
        }
      }, err => {
        invoke$1(callbackId, {
          code: err.code,
          errMsg: 'login:fail:' + err.message
        });
      });
    }
  }

  function getUserInfo (params, callbackId) {
    const provider = params.provider || 'weixin';
    const loginService = loginServices[provider];
    if (!loginService || !loginService.authResult) {
      return invoke$1(callbackId, {
        errMsg: 'operateWXData:fail:请先调用 uni.login'
      })
    }
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
        loginService.userInfo.openId = loginService.userInfo.openId || loginService.userInfo.openid ||
                  loginService.authResult.openid;
        loginService.userInfo.nickName = loginService.userInfo.nickName || loginService.userInfo.nickname;
        loginService.userInfo.avatarUrl = loginService.userInfo.avatarUrl || loginService.userInfo.avatarUrl ||
                  loginService.userInfo.headimgurl;
        userInfo = loginService.userInfo;
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
    }, err => {
      invoke$1(callbackId, {
        errMsg: 'operateWXData:fail:' + err.message
      });
    });
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

  function requestPayment (params, callbackId) {
    const provider = params.provider;
    plus.payment.getChannels(services => {
      const service = services.find(({
        id
      }) => id === provider);
      if (!service) {
        invoke$1(callbackId, {
          errMsg: 'requestPayment:fail:支付服务[' + provider + ']不存在'
        });
      } else {
        plus.payment.request(service, params.orderInfo, res => {
          res.errMsg = 'requestPayment:ok';
          invoke$1(callbackId, res);
        }, err => {
          invoke$1(callbackId, {
            errMsg: 'requestPayment:fail:' + err.message
          });
        });
      }
    }, err => {
      invoke$1(callbackId, {
        errMsg: 'requestPayment:fail:' + err.message
      });
    });
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
        errMsg: 'subscribePush:fail:请确保当前运行环境已包含 push 模块'
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
        errMsg: 'onPush:fail:请先调用 uni.subscribePush'
      }
    }
    if (plus.push.getClientInfo()) {
      onPushing = true;
      return {
        errMsg: 'onPush:ok'
      }
    }
    return {
      errMsg: 'onPush:fail:请确保当前运行环境已包含 push 模块'
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
  const TYPES = {
    '0': {
      name: 'web',
      title: '图文'
    },
    '1': {
      name: 'text',
      title: '纯文字'
    },
    '2': {
      name: 'image',
      title: '纯图片'
    },
    '3': {
      name: 'music',
      title: '音乐'
    },
    '4': {
      name: 'video',
      title: '视频'
    },
    '5': {
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
      miniProgram
    } = args;

    if (typeof imageUrl === 'string' && imageUrl) {
      imageUrl = getRealPath$1(imageUrl);
    }

    const shareType = TYPES[type + ''];
    if (shareType) {
      let sendMsg = {
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
        }
      };
      if (provider === 'weixin' && (type === 1 || type === 2)) {
        delete sendMsg.thumbs;
      }
      return sendMsg
    }
    return '分享参数 type 不正确'
  };

  const sendShareMsg = function (service, params, callbackId, method = 'share') {
    service.send(
      params,
      () => {
        invoke$1(callbackId, {
          errMsg: method + ':ok'
        });
      },
      err => {
        invoke$1(callbackId, {
          errMsg: method + ':fail:' + err.message
        });
      }
    );
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
    if (useDefaultSnapshot) {
      const pages = getCurrentPages();
      const webview = plus.webview.getWebviewById(pages[pages.length - 1].__wxWebviewId__ + '');
      if (webview) {
        const bitmap = new plus.nativeObj.Bitmap();
        webview.draw(
          bitmap,
          () => {
            const fileName = TEMP_PATH + '/share/snapshot.jpg';
            bitmap.save(
              fileName, {
                overwrite: true,
                format: 'jpg'
              },
              () => {
                imageUrl = fileName;
                goShare();
              },
              err => {
                invoke$1(callbackId, {
                  errMsg: 'shareAppMessageDirectly:fail:' + err.message
                });
              }
            );
          },
          err => {
            invoke$1(callbackId, {
              errMsg: 'shareAppMessageDirectly:fail:' + err.message
            });
          }
        );
      } else {
        goShare();
      }
    } else {
      goShare();
    }
  }

  function share (params, callbackId, method = 'share') {
    params = parseParams(params);
    if (typeof params === 'string') {
      return invoke$1(callbackId, {
        errMsg: method + ':fail:' + params
      })
    }
    const provider = params.provider;
    plus.share.getServices(
      services => {
        const service = services.find(({
          id
        }) => id === provider);
        if (!service) {
          invoke$1(callbackId, {
            errMsg: method + ':fail:分享服务[' + provider + ']不存在'
          });
        } else {
          if (service.authenticated) {
            sendShareMsg(service, params, callbackId);
          } else {
            service.authorize(
              () => sendShareMsg(service, params, callbackId),
              err => {
                invoke$1(callbackId, {
                  errMsg: method + ':fail:' + err.message
                });
              }
            );
          }
        }
      },
      err => {
        invoke$1(callbackId, {
          errMsg: method + ':fail:' + err.message
        });
      }
    );
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
    if (allowedTypes.indexOf(type) < 0) {
      invoke$1(callbackId, {
        errMsg: method + ':fail:分享参数 type 不正确'
      });
    }
    if (typeof imageUrl === 'string' && imageUrl) {
      imageUrl = getRealPath$1(imageUrl);
    }
    plus.share.sendWithSystem({
      type,
      pictures: imageUrl ? [imageUrl] : void 0,
      content,
      href
    }, function (res) {
      invoke$1(callbackId, {
        errMsg: method + ':ok'
      });
    }, function (err) {
      invoke$1(callbackId, {
        errMsg: method + ':fail:' + err.message
      });
    });
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
      plus.navigator.setStatusBarStyle = newSetStatusBarStyle;
      /* eslint-disable no-global-assign */
      setTimeout = newSetTimeout;
      clearTimeout = newClearTimeout;
      setInterval = newSetInterval;
      clearInterval = newClearInterval;
    }
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
    let maskWebview = webview.__uniapp_mask_id === '0' ? {
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
    if (webview && !webview.$processed) {
      wrapper$1(webview);
    }
    return webview
  }

  function getCurrentSubNVue () {
    return getSubNVueById(plus.webview.currentWebview().id)
  }

  let firstBackTime = 0;

  function quit () {
    if (!firstBackTime) {
      firstBackTime = Date.now();
      plus.nativeUI.toast('再按一次退出应用');
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
    const childWebview = children[0];
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
        deltaPage.$getAppWebview().close('none');
      });
    }

    const backPage = function (webview) {
      if (animationType) {
        webview.close(animationType, animationDuration || ANI_DURATION);
      } else {
        if (currentPage.$page.openType === 'redirect') { // 如果是 redirectTo 跳转的，需要制定 back 动画
          webview.close(ANI_CLOSE, ANI_DURATION);
        }
        webview.close('auto');
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

    uni.hideToast(); // 后退时，关闭 toast,loading

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

  function parseTitleNView (routeOptions) {
    const windowOptions = routeOptions.window;
    const titleNView = windowOptions.titleNView;
    routeOptions.meta.statusBarStyle = windowOptions.navigationBarTextStyle === 'black' ? 'dark' : 'light';
    if ( // 无头
      titleNView === false ||
      titleNView === 'false' ||
      (
        windowOptions.navigationStyle === 'custom' &&
        !isPlainObject(titleNView)
      )
    ) {
      return false
    }

    const titleImage = windowOptions.titleImage || '';
    const transparentTitle = windowOptions.transparentTitle || 'none';
    const titleNViewTypeList = {
      'none': 'default',
      'auto': 'transparent',
      'always': 'float'
    };

    const ret = {
      autoBackButton: !routeOptions.meta.isQuit,
      titleText: titleImage === '' ? windowOptions.navigationBarTitleText || '' : '',
      titleColor: windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
      type: titleNViewTypeList[transparentTitle],
      backgroundColor: transparentTitle !== 'always' ? windowOptions.navigationBarBackgroundColor || '#000000' : 'rgba(0,0,0,0)',
      tags: titleImage === '' ? [] : [{
        'tag': 'img',
        'src': titleImage,
        'position': {
          'left': 'auto',
          'top': 'auto',
          'width': 'auto',
          'height': '26px'
        }
      }]
    };

    if (isPlainObject(titleNView)) {
      return Object.assign(ret, parseTitleNViewButtons(titleNView))
    }

    return ret
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
    const webviewStyle = Object.create(null);

    // 合并
    routeOptions.window = parseStyleUnit(Object.assign(
      JSON.parse(JSON.stringify(__uniConfig.window || {})),
      routeOptions.window || {}
    ));

    Object.keys(routeOptions.window).forEach(name => {
      if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
        webviewStyle[name] = routeOptions.window[name];
      }
    });

    const titleNView = parseTitleNView(routeOptions);
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

    if (routeOptions.meta.isQuit) { // 退出
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
      console.warn('subNVue[' + subNVue.path + '] 尚未配置 id');
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
      style.height = TITLEBAR_HEIGHT + getStatusbarHeight();
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

        UniServiceJSBridge.emit('onAppRoute', {
          type: 'navigateBack'
        });
      }
    });
  }

  let preloadWebview;

  let id$1 = 2;

  const WEBVIEW_LISTENERS = {
    'pullToRefresh': 'onPullDownRefresh',
    'titleNViewSearchInputChanged': 'onNavigationBarSearchInputChanged',
    'titleNViewSearchInputConfirmed': 'onNavigationBarSearchInputConfirmed',
    'titleNViewSearchInputClicked': 'onNavigationBarSearchInputClicked'
  };

  function setPreloadWebview (webview) {
    preloadWebview = webview;
  }

  function noop$1 (str) {
    return str
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

  function createWebview (path, routeOptions, query) {
    if (routeOptions.meta.isNVue) {
      const webviewId = id$1++;
      const webviewStyle = parseWebviewStyle(
        webviewId,
        path,
        routeOptions
      );
      webviewStyle.debugRefresh = getDebugRefresh(path, query, routeOptions);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[uni-app] createWebview`, webviewId, path, webviewStyle);
      }
      return plus.webview.create('', String(webviewId), webviewStyle, {
        nvue: true
      })
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
      webviewStyle.debugRefresh = getDebugRefresh(path, query, routeOptions);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[uni-app] updateWebview`, webviewStyle);
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
      preloadWebview = plus.webview.create(VIEW_WEBVIEW_PATH, String(id$1++));
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

  function navigate (path, callback, isAppLaunch) {
    {
      if (isAppLaunch && __uniConfig.splashscreen && __uniConfig.splashscreen.autoclose && (!__uniConfig.splashscreen.alwaysShowBeforeRender)) {
        plus.navigator.closeSplashscreen();
      }
      if (!isAppLaunch && todoNavigator) {
        return console.error(`已存在待跳转页面${todoNavigator.path},请不要连续多次跳转页面${path}`)
      }
      // 未创建 preloadWebview 或 preloadWebview 已被使用
      const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route);
      // 已创建未 loaded
      const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded;

      if (waitPreloadWebview || waitPreloadWebviewReady) {
        todoNavigator = {
          path: path,
          nvue: __uniRoutes.find(route => route.path === path).meta.isNVue,
          navigate: callback
        };
        if (process.env.NODE_ENV !== 'production') {
          console.log(`todoNavigator:${todoNavigator.path} ${waitPreloadWebview ? 'waitForCreate' : 'waitForReady'}`);
        }
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
    setTimeout(() => {
      webview.show(
        animationType || ANI_SHOW,
        animationDuration || ANI_DURATION,
        () => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[show.callback][${Date.now()}]`);
          }
          showCallback && showCallback();
          navigateFinish();
        }
      );
    }, delay);
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
    let startTime = Date.now();
    const pageVm = new (getPageVueComponent(pagePath))({
      mpType: 'page',
      pageId,
      pagePath,
      pageQuery,
      pageInstance
    });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`new ${pagePath}`, Date.now() - startTime);
    }
    return pageVm
  }

  const pages = [];

  function getCurrentPages$1 (returnAll) {
    return returnAll ? pages.slice(0) : pages.filter(page => {
      return !page.$page.meta.isTabBar || page.$page.meta.visible
    })
  }

  /**
   * 首页需要主动registerPage，二级页面路由跳转时registerPage
   */
  function registerPage ({
    url,
    path,
    query,
    openType,
    webview
  }) {
    const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)));

    if (
      openType === 'reLaunch' ||
      (
        !__uniConfig.realEntryPagePath &&
        pages.length === 0
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

    if (routeOptions.meta.isTabBar && webview.id !== '1') {
      tabBar$1.append(webview);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] registerPage`, path, webview.id);
    }

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
      $page: {
        id: parseInt(webview.id),
        meta: routeOptions.meta,
        path,
        route,
        openType
      },
      $remove () {
        const index = pages.findIndex(page => page === this);
        if (index !== -1) {
          pages.splice(index, 1);
          if (!webview.nvue) {
            this.$vm.$destroy();
          }
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[uni-app] removePage`, path, webview.id);
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

    // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
    if (webview.id === '1' && webview.nvue) {
      __uniConfig.onReady(function () {
        navigateFinish();
      });
    }

    {
      if (!webview.nvue) {
        const pageId = webview.id;
        try {
          createPage(route, pageId, query, pageInstance).$mount();
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
    animationType,
    animationDuration
  }, callbackId) {
    UniServiceJSBridge.emit('onAppRoute', {
      type: 'navigateTo',
      path
    });

    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'navigate'
      }),
      animationType,
      animationDuration,
      () => {
        invoke$1(callbackId, {
          errMsg: 'navigateTo:ok'
        });
      }
    );
    setStatusBarStyle();
  }

  function navigateTo$1 ({
    url,
    openType,
    animationType,
    animationDuration
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const routeStyles = __uniRoutes.find(route => route.path === path).window;
    const globalStyle = __uniConfig.window;
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
          page.$getAppWebview().close('none');
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

  function _redirectTo ({
    url,
    path,
    query
  }, callbackId) {
    const pages = getCurrentPages();
    const lastPage = pages[pages.length - 1];

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
        lastPage && lastPage.$getAppWebview().close('none');
        invoke$1(callbackId, {
          errMsg: 'redirectTo:ok'
        });
      }
    );

    setStatusBarStyle();
  }
  function redirectTo$1 ({
    url
  }, callbackId) {
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    navigate(path, function () {
      _redirectTo({
        url,
        path,
        query
      }, callbackId);
    });
  }

  function _switchTab ({
    url,
    path,
    from
  }, callbackId) {
    tabBar$1.switchTab(path.slice(1));

    const pages = getCurrentPages();
    const len = pages.length;

    let callOnShow = false;

    if (len >= 1) { // 前一个页面是非 tabBar 页面
      const currentPage = pages[len - 1];
      if (!currentPage.$page.meta.isTabBar) {
        // 前一个页面为非 tabBar 页面时，目标tabBar需要强制触发onShow
        // 该情况下目标页tabBarPage的visible是不对的
        // 除非每次路由跳转都处理一遍tabBarPage的visible，目前仅switchTab会处理
        // 简单起见，暂时直接判断该情况，执行onShow
        callOnShow = true;
        pages.reverse().forEach(page => {
          if (!page.$page.meta.isTabBar && page !== currentPage) {
            page.$remove();
            page.$getAppWebview().close('none');
          }
        });
        currentPage.$remove();
        // 延迟执行避免iOS应用退出
        setTimeout(() => {
          if (currentPage.$page.openType === 'redirect') {
            currentPage.$getAppWebview().close(ANI_CLOSE, ANI_DURATION);
          } else {
            currentPage.$getAppWebview().close('auto');
          }
        }, 100);
      } else {
        // 前一个 tabBar 触发 onHide
        currentPage.$vm.__call_hook('onHide');
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

    if (tabBarPage) {
      tabBarPage.$getAppWebview().show('none');
      // 等visible状态都切换完之后，再触发onShow，否则开发者在onShow里边 getCurrentPages 会不准确
      callOnShow && tabBarPage.$vm.__call_hook('onShow');
    } else {
      return showWebview(registerPage({
        url,
        path,
        query: {},
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
    const path = url.split('?')[0];
    navigate(path, function () {
      _switchTab({
        url,
        path,
        from
      }, callbackId);
    }, openType === 'appLaunch');
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
        // eslint-disable-next-line valid-typeof
        if (keys.length === 2 && 'data' in object && typeof object.data === type) {
          return object.data
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
            // eslint-disable-next-line valid-typeof
            data = typeof object === (type === 'null' ? 'object' : type) ? object : data;
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
      if (key !== STORAGE_KEYS && key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !== key.length) {
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
    title = ''
  } = {}) {
    const webview = getLastWebview();
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

  function setNavigationBarColor$1 ({
    frontColor,
    backgroundColor
  } = {}) {
    const webview = getLastWebview();
    if (webview) {
      const styles = {};
      if (frontColor) {
        styles.titleColor = frontColor;
      }
      if (backgroundColor) {
        styles.backgroundColor = backgroundColor;
      }
      plus.navigator.setStatusBarStyle(frontColor === '#000000' ? 'dark' : 'light');
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

  let waiting;
  let waitingTimeout;
  let toast = false;
  let toastTimeout;

  function showLoading$1 (args) {
    return callApiSync(showToast$1, args, 'showToast', 'showLoading')
  }

  function hideLoading () {
    return callApiSync(hideToast, Object.create(null), 'hideToast', 'hideLoading')
  }

  function showToast$1 ({
    title = '',
    icon = 'success',
    image = '',
    duration = 1500,
    mask = false,
    position = ''
  } = {}) {
    if (position) {
      if (toast) {
        toastTimeout && clearTimeout(toastTimeout);
        plus.nativeUI.closeToast();
      }
      if (waiting) {
        waitingTimeout && clearTimeout(waitingTimeout);
        waiting.close();
      }
      if (~['top', 'center', 'bottom'].indexOf(position)) {
        let richText = `<span>${title}</span>`;
        plus.nativeUI.toast(richText, {
          verticalAlign: position,
          type: 'richtext'
        });
        toast = true;
        toastTimeout = setTimeout(() => {
          hideToast();
        }, 2000);
        return {
          errMsg: 'showToast:ok'
        }
      }
      console.warn('uni.showToast 传入的 "position" 值 "' + position + '" 无效');
    }

    if (duration) {
      if (waiting) {
        waitingTimeout && clearTimeout(waitingTimeout);
        waiting.close();
      }
      if (toast) {
        toastTimeout && clearTimeout(toastTimeout);
        plus.nativeUI.closeToast();
      }
      if (icon && !~['success', 'loading', 'none'].indexOf(icon)) {
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
        if (icon === 'success') {
          waitingOptions.loading = {
            display: 'block',
            height: '55px',
            icon: '__uniappsuccess.png',
            interval: duration

          };
        }
      }

      waiting = plus.nativeUI.showWaiting(title, waitingOptions);
      waitingTimeout = setTimeout(() => {
        hideToast();
      }, duration);
    }
    return {
      errMsg: 'showToast:ok'
    }
  }

  function hideToast () {
    if (toast) {
      toastTimeout && clearTimeout(toastTimeout);
      plus.nativeUI.closeToast();
      toast = false;
    }
    if (waiting) {
      waitingTimeout && clearTimeout(waitingTimeout);
      waiting.close();
      waiting = null;
      waitingTimeout = null;
    }
    return {
      errMsg: 'hideToast:ok'
    }
  }
  function showModal$1 ({
    title = '',
    content = '',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#000000',
    confirmText = '确定',
    confirmColor = '#3CC51F'
  } = {}, callbackId) {
    plus.nativeUI.confirm(content, (e) => {
      if (showCancel) {
        invoke$1(callbackId, {
          errMsg: 'showModal:ok',
          confirm: e.index === 1,
          cancel: e.index === 0 || e.index === -1
        });
      } else {
        invoke$1(callbackId, {
          errMsg: 'showModal:ok',
          confirm: e.index === 0,
          cancel: false
        });
      }
    }, title, showCancel ? [cancelText, confirmText] : [confirmText]);
  }
  function showActionSheet$1 ({
    itemList = [],
    itemColor = '#000000',
    title = ''
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

    if (plus.os.name === 'iOS') {
      options.cancel = '取消';
    }

    plus.nativeUI.actionSheet(options, (e) => {
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
    selectedIconPath
  }) {
    if (!isTabBarPage()) {
      return {
        errMsg: 'setTabBarItem:fail not TabBar page'
      }
    }
    tabBar$1.setTabBarItem(index, text, iconPath, selectedIconPath);
    return {
      errMsg: 'setTabBarItem:ok'
    }
  }

  function setTabBarStyle$2 ({
    color,
    selectedColor,
    backgroundColor,
    borderStyle
  }) {
    if (!isTabBarPage()) {
      return {
        errMsg: 'setTabBarStyle:fail not TabBar page'
      }
    }
    const style = {};
    const borderStyles = {
      black: 'rgba(0,0,0,0.4)',
      white: 'rgba(255,255,255,0.4)'
    };
    if (color) {
      style.color = color;
    }
    if (selectedColor) {
      style.selectedColor = selectedColor;
    }
    if (backgroundColor) {
      style.backgroundColor = backgroundColor;
    }
    if (borderStyle in borderStyles) {
      borderStyle = borderStyles[borderStyle];
    }
    if (borderStyle) {
      style.borderStyle = borderStyle;
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

  const callbacks$3 = {};

  function createCallbacks (namespace) {
    let scopedCallbacks = callbacks$3[namespace];
    if (!scopedCallbacks) {
      scopedCallbacks = {
        id: 1,
        callbacks: Object.create(null)
      };
      callbacks$3[namespace] = scopedCallbacks;
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

  const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo');

  function requestComponentInfo (pageVm, queue, callback) {
    UniServiceJSBridge.publishHandler('requestComponentInfo', {
      reqId: requestComponentInfoCallbacks.push(callback),
      reqs: queue
    }, pageVm.$page.id);
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
    let nodes = elm.children;
    if (!Array.isArray(nodes)) {
      return false
    }
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (node.attr) {
        let index = ids.indexOf(node.attr.id);
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
    let ids = [];
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
    let outAttrs = new Array(selectors.length);
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

  const eventNames = [
    'load',
    'close',
    'error'
  ];

  const ERROR_CODE_LIST = [-5001, -5002, -5003, -5004, -5005, -5006];

  class RewardedVideoAd {
    constructor (adpid) {
      this._options = {
        adpid: adpid
      };

      const _callbacks = this._callbacks = {};
      eventNames.forEach(item => {
        _callbacks[item] = [];
        const name = item[0].toUpperCase() + item.substr(1);
        this[`on${name}`] = function (callback) {
          _callbacks[item].push(callback);
        };
      });

      this._isLoad = false;
      this._adError = '';
      this._loadPromiseResolve = null;
      this._loadPromiseReject = null;
      const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(this._options);
      rewardAd.onLoad((e) => {
        this._isLoad = true;
        this._dispatchEvent('load', {});
        if (this._loadPromiseResolve != null) {
          this._loadPromiseResolve();
          this._loadPromiseResolve = null;
        }
      });
      rewardAd.onClose((e) => {
        this._loadAd();
        this._dispatchEvent('close', { isEnded: e.isEnded });
      });
      rewardAd.onError((e) => {
        const { code, message } = e;
        const data = { code: code, errMsg: message };
        this._adError = message;
        this._dispatchEvent('error', data);
        if ((code === -5005 || ERROR_CODE_LIST.index(code) === -1) && this._loadPromiseReject != null) {
          this._loadPromiseReject(data);
          this._loadPromiseReject = null;
        }
      });
      this._loadAd();
    }
    load () {
      return new Promise((resolve, reject) => {
        if (this._isLoad) {
          resolve();
          return
        }
        this._loadPromiseResolve = resolve;
        this._loadPromiseReject = reject;
        this._loadAd();
      })
    }
    show () {
      return new Promise((resolve, reject) => {
        if (this._isLoad) {
          this._rewardAd.show();
          resolve();
        } else {
          reject(new Error(this._adError));
        }
      })
    }
    _loadAd () {
      this._isLoad = false;
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

  function createRewardedVideoAd ({
    adpid = ''
  } = {}) {
    return new RewardedVideoAd(adpid)
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
    base64ToTempFilePath: base64ToTempFilePath,
    operateMapPlayer: operateMapPlayer$2,
    operateVideoPlayer: operateVideoPlayer$2,
    createLivePusherContext: createLivePusherContext$1,
    enableAccelerometer: enableAccelerometer,
    addPhoneContact: addPhoneContact,
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
    notifyBLECharacteristicValueChanged: notifyBLECharacteristicValueChanged,
    readBLECharacteristicValue: readBLECharacteristicValue,
    writeBLECharacteristicValue: writeBLECharacteristicValue,
    getScreenBrightness: getScreenBrightness,
    setScreenBrightness: setScreenBrightness,
    setKeepScreenOn: setKeepScreenOn,
    getClipboardData: getClipboardData,
    setClipboardData: setClipboardData$1,
    enableCompass: enableCompass,
    getNetworkType: getNetworkType,
    onBeaconUpdate: onBeaconUpdate,
    onBeaconServiceChange: onBeaconServiceChange,
    getBeacons: getBeacons,
    startBeaconDiscovery: startBeaconDiscovery,
    stopBeaconDiscovery: stopBeaconDiscovery,
    makePhoneCall: makePhoneCall$1,
    scanCode: scanCode$2,
    checkIsSupportSoterAuthentication: checkIsSupportSoterAuthentication,
    checkIsSoterEnrolledInDevice: checkIsSoterEnrolledInDevice,
    startSoterAuthentication: startSoterAuthentication,
    getSystemInfoSync: getSystemInfoSync,
    getSystemInfo: getSystemInfo,
    vibrateLong: vibrateLong,
    vibrateShort: vibrateShort,
    saveFile: saveFile,
    getSavedFileList: getSavedFileList,
    getFileInfo: getFileInfo,
    getSavedFileInfo: getSavedFileInfo,
    removeSavedFile: removeSavedFile,
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
    compressImage: compressImage,
    getImageInfo: getImageInfo$1,
    previewImagePlus: previewImagePlus,
    operateRecorder: operateRecorder,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum,
    saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
    operateDownloadTask: operateDownloadTask,
    createDownloadTask: createDownloadTask,
    createRequestTaskById: createRequestTaskById,
    createRequestTask: createRequestTask,
    operateRequestTask: operateRequestTask,
    createSocketTask: createSocketTask,
    operateSocketTask: operateSocketTask,
    operateUploadTask: operateUploadTask,
    createUploadTask: createUploadTask,
    getProvider: getProvider$1,
    login: login,
    getUserInfo: getUserInfo,
    operateWXData: operateWXData,
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
    getSubNVueById: getSubNVueById,
    getCurrentSubNVue: getCurrentSubNVue,
    navigateBack: navigateBack$1,
    navigateTo: navigateTo$1,
    reLaunch: reLaunch$1,
    redirectTo: redirectTo$1,
    switchTab: switchTab$1,
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
    showModal: showModal$1,
    showActionSheet: showActionSheet$1,
    setTabBarBadge: setTabBarBadge$2,
    setTabBarItem: setTabBarItem$2,
    setTabBarStyle: setTabBarStyle$2,
    hideTabBar: hideTabBar$2,
    showTabBar: showTabBar$2,
    requestComponentInfo: requestComponentInfo$2,
    createRewardedVideoAd: createRewardedVideoAd
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

  const eventNames$1 = [
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

  const props = [
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
    }
  ];

  class InnerAudioContext {
    constructor (id) {
      this.id = id;
      this._callbacks = {};
      this._options = {};
      eventNames$1.forEach(name => {
        this._callbacks[name.toLowerCase()] = [];
      });
      props.forEach(item => {
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

  eventNames$1.forEach(item => {
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

  var require_context_module_1_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createInnerAudioContext: createInnerAudioContext
  });

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
  const callbacks$4 = {};
  eventNames$2.forEach(name => {
    callbacks$4[name] = [];
  });

  const props$1 = [
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
    }
  ];

  class BackgroundAudioManager {
    constructor () {
      this._options = {};
      onMethod('onBackgroundAudioStateChange', ({
        state,
        errMsg,
        errCode
      }) => {
        callbacks$4[state].forEach(callback => {
          if (typeof callback === 'function') {
            callback(state === 'error' ? {
              errMsg,
              errCode
            } : {});
          }
        });
      });
      props$1.forEach(item => {
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
      callbacks$4[item].push(callback);
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

  const canvasEventCallbacks = createCallbacks('canvasEvent');

  UniServiceJSBridge.subscribe('onDrawCanvas', ({
    callbackId,
    data
  }) => {
    const callback = canvasEventCallbacks.pop(callbackId);
    if (callback) {
      callback(data);
    }
  });

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
      let n = parseInt(t[1].slice(0, 2), 16);
      let o = parseInt(t[1].slice(2, 4), 16);
      let r = parseInt(t[1].slice(4), 16);
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
    if (predefinedColor.hasOwnProperty(i)) {
      t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);
      let n = parseInt(t[1].slice(0, 2), 16);
      let o = parseInt(t[1].slice(2, 4), 16);
      let r = parseInt(t[1].slice(4, 6), 16);
      let a = parseInt(t[1].slice(6, 8), 16);
      a = a >= 0 ? a : 255;
      return [n, o, r, a]
    }
    console.group('非法颜色: ' + e);
    console.error('不支持颜色：' + e);
    console.groupEnd();
    return [0, 0, 0, 255]
  }

  function Pattern (image, repetition) {
    this.image = image;
    this.repetition = repetition;
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

  var tempCanvas;
  function getTempCanvas (width = 0, height = 0) {
    if (!tempCanvas) {
      tempCanvas = document.createElement('canvas');
    }
    tempCanvas.width = width;
    tempCanvas.height = height;
    return tempCanvas
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
        console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
      } else {
        return new Pattern(image, repetition)
      }
    }
    // TODO
    measureText (text) {
      if (typeof document === 'object') {
        var c2d = getTempCanvas().getContext('2d');
        c2d.font = this.state.font;
        return new TextMetrics(c2d.measureText(text).width || 0)
      } else {
        return new TextMetrics(0)
      }
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
            data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [imageResource, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] : isNumber(sWidth) && isNumber(
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
    var pageId = getCurrentPageId();
    if (!pageId) {
      invoke$1(callbackId, {
        errMsg: 'canvasGetImageData:fail'
      });
      return
    }
    var cId = canvasEventCallbacks.push(function (data) {
      var imgData = data.data;
      if (imgData && imgData.length) {
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
    operateCanvas(canvasId, pageId, 'putImageData', {
      data: [...data],
      x,
      y,
      width,
      height,
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
    qualit
  }, callbackId) {
    var pageId = getCurrentPageId();
    if (!pageId) {
      invoke$1(callbackId, {
        errMsg: 'canvasToTempFilePath:fail'
      });
      return
    }
    const cId = canvasEventCallbacks.push(function ({
      base64
    }) {
      if (!base64 || !base64.length) {
        invoke$1(callbackId, {
          errMsg: 'canvasToTempFilePath:fail'
        });
      }
      invokeMethod('base64ToTempFilePath', {
        base64Data: base64,
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        canvasId,
        fileType,
        qualit
      }, callbackId);
    });
    operateCanvas(canvasId, pageId, 'getDataUrl', {
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      hidpi: false,
      fileType,
      qualit,
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

  const methods = ['getCenterLocation', 'getScale', 'getRegion', 'includePoints', 'translateMarker'];

  class MapContext {
    constructor (id, pageVm) {
      this.id = id;
      this.pageVm = pageVm;
    }

    moveToLocation () {
      operateMapPlayer$3(this.id, this.pageVm, 'moveToLocation');
    }
  }

  MapContext.prototype.$getAppMap = function () {
    return plus.maps.getMapById(this.pageVm.$page.id + '-map-' + this.id)
  };

  methods.forEach(function (method) {
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

  const methods$1 = ['insertDivider', 'insertImage', 'insertText', 'setContents', 'getContents', 'clear', 'removeFormat', 'undo', 'redo'];

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

  methods$1.forEach(function (method) {
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

  const callbacks$5 = [];

  onMethod('onAccelerometerChange', function (res) {
    callbacks$5.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  let isEnable = false;
  /**
   * 监听加速度
   * @param {*} callbackId
   */
  function onAccelerometerChange (callbackId) {
    // TODO 当没有 start 时，添加 on 需要主动 start?
    callbacks$5.push(callbackId);
    if (!isEnable) {
      startAccelerometer();
    }
  }

  function startAccelerometer ({
    interval // TODO
  } = {}) {
    if (isEnable) {
      return
    }
    isEnable = true;
    return invokeMethod('enableAccelerometer', {
      enable: true
    })
  }

  function stopAccelerometer () {
    isEnable = false;
    return invokeMethod('enableAccelerometer', {
      enable: false
    })
  }

  var require_context_module_1_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onAccelerometerChange: onAccelerometerChange,
    startAccelerometer: startAccelerometer,
    stopAccelerometer: stopAccelerometer
  });

  function on (method) {
    const callbacks = [];
    onMethod(method, data => {
      callbacks.forEach(callbackId => {
        invoke$1(callbackId, data);
      });
    });
    return function (callbackId) {
      callbacks.push(callbackId);
    }
  }

  const onBluetoothDeviceFound$1 = on('onBluetoothDeviceFound');
  const onBluetoothAdapterStateChange$1 = on('onBluetoothAdapterStateChange');
  const onBLEConnectionStateChange$1 = on('onBLEConnectionStateChange');
  const onBLECharacteristicValueChange$1 = on('onBLECharacteristicValueChange');

  var require_context_module_1_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onBluetoothDeviceFound: onBluetoothDeviceFound$1,
    onBluetoothAdapterStateChange: onBluetoothAdapterStateChange$1,
    onBLEConnectionStateChange: onBLEConnectionStateChange$1,
    onBLECharacteristicValueChange: onBLECharacteristicValueChange$1
  });

  const callbacks$6 = [];

  onMethod('onCompassChange', function (res) {
    callbacks$6.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  let isEnable$1 = false;
  /**
   * 监听加速度
   * @param {*} callbackId
   */
  function onCompassChange (callbackId) {
    // TODO 当没有 start 时，添加 on 需要主动 start?
    callbacks$6.push(callbackId);
    if (!isEnable$1) {
      startCompass();
    }
  }

  function startCompass ({
    interval // TODO
  } = {}) {
    if (isEnable$1) {
      return
    }
    isEnable$1 = true;
    return invokeMethod('enableCompass', {
      enable: true
    })
  }

  function stopCompass () {
    isEnable$1 = false;
    return invokeMethod('enableCompass', {
      enable: false
    })
  }

  var require_context_module_1_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onCompassChange: onCompassChange,
    startCompass: startCompass,
    stopCompass: stopCompass
  });

  const callbacks$7 = [];

  onMethod('onNetworkStatusChange', res => {
    callbacks$7.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onNetworkStatusChange (callbackId) {
    callbacks$7.push(callbackId);
  }

  var require_context_module_1_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onNetworkStatusChange: onNetworkStatusChange
  });

  const callbacks$8 = [];

  onMethod('onUIStyleChange', function (res) {
    callbacks$8.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onUIStyleChange (callbackId) {
    callbacks$8.push(callbackId);
  }

  var require_context_module_1_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onUIStyleChange: onUIStyleChange
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

  var require_context_module_1_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    previewImage: previewImage$1
  });

  const callbacks$9 = {
    pause: [],
    resume: [],
    start: [],
    stop: [],
    error: []
  };

  class RecorderManager {
    constructor () {
      onMethod('onRecorderStateChange', res => {
        const state = res.state;
        delete res.state;
        delete res.errMsg;
        callbacks$9[state].forEach(callback => {
          if (typeof callback === 'function') {
            callback(res);
          }
        });
      });
    }
    onError (callback) {
      callbacks$9.error.push(callback);
    }
    onFrameRecorded (callback) {

    }
    onInterruptionBegin (callback) {

    }
    onInterruptionEnd (callback) {

    }
    onPause (callback) {
      callbacks$9.pause.push(callback);
    }
    onResume (callback) {
      callbacks$9.resume.push(callback);
    }
    onStart (callback) {
      callbacks$9.start.push(callback);
    }
    onStop (callback) {
      callbacks$9.stop.push(callback);
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
      invokeMethod('operateRequestTask', {
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
    errMsg
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
          errMsg: 'request:ok'
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
    }, errMsg) {
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
  const callbacks$a = Object.create(null);
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
    if (socketTask === socketTasksArray[0] && callbacks$a[state]) {
      invoke$1(callbacks$a[state], state === 'message' ? {
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
    callbacks$a.open = callbackId;
  }

  function onSocketError (callbackId) {
    callbacks$a.error = callbackId;
  }

  function onSocketMessage (callbackId) {
    callbacks$a.message = callbackId;
  }

  function onSocketClose (callbackId) {
    callbacks$a.close = callbackId;
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

  class UploadTask {
    constructor (uploadTaskId, callbackId) {
      this.id = uploadTaskId;
      this._callbackId = callbackId;
      this._callbacks = [];
    }
    abort () {
      invokeMethod('operateRequestTask', {
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

  var require_context_module_1_20 = /*#__PURE__*/Object.freeze({
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
      let _option = {
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

  var require_context_module_1_21 = /*#__PURE__*/Object.freeze({
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
      this.pageId = component.$page.id;
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
      }, this.pageId);
    }
    disconnect () {
      UniServiceJSBridge.publishHandler('destroyComponentObserver', {
        reqId: this.reqId
      }, this.pageId);
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

  var require_context_module_1_22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createIntersectionObserver: createIntersectionObserver
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

  var require_context_module_1_23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createSelectorQuery: createSelectorQuery
  });

  const callbacks$b = [];

  onMethod('onKeyboardHeightChange', res => {
    callbacks$b.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onKeyboardHeightChange (callbackId) {
    callbacks$b.push(callbackId);
  }

  var require_context_module_1_24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    onKeyboardHeightChange: onKeyboardHeightChange
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

  var require_context_module_1_25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loadFontFace: loadFontFace$1
  });

  function pageScrollTo$1 (args) {
    const pages = getCurrentPages();
    if (pages.length) {
      UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id);
    }
    return {}
  }

  var require_context_module_1_26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pageScrollTo: pageScrollTo$1
  });

  function setPageMeta (args) {
    const pages = getCurrentPages();
    if (pages.length) {
      UniServiceJSBridge.publishHandler('setPageMeta', args, pages[pages.length - 1].$page.id);
    }
    return {}
  }

  var require_context_module_1_27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setPageMeta: setPageMeta
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

  const callbacks$c = [];

  onMethod('onTabBarMidButtonTap', res => {
    callbacks$c.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onTabBarMidButtonTap (callbackId) {
    callbacks$c.push(callbackId);
  }

  var require_context_module_1_28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    removeTabBarBadge: removeTabBarBadge$1,
    showTabBarRedDot: showTabBarRedDot$1,
    hideTabBarRedDot: hideTabBarRedDot$1,
    onTabBarMidButtonTap: onTabBarMidButtonTap
  });

  const callbacks$d = [];
  onMethod('onViewDidResize', res => {
    callbacks$d.forEach(callbackId => {
      invoke$1(callbackId, res);
    });
  });

  function onWindowResize (callbackId) {
    callbacks$d.push(callbackId);
  }

  function offWindowResize (callbackId) {
    // TODO 目前 on 和 off 即使传入同一个 function，获取到的 callbackId 也不会一致，导致不能 off 掉指定
    // 后续修复
    // 此处和微信平台一致查询不到去掉最后一个
    callbacks$d.splice(callbacks$d.indexOf(callbackId), 1);
  }

  var require_context_module_1_29 = /*#__PURE__*/Object.freeze({
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
  './device/accelerometer.js': require_context_module_1_10,
  './device/bluetooth.js': require_context_module_1_11,
  './device/compass.js': require_context_module_1_12,
  './device/network.js': require_context_module_1_13,
  './device/theme.js': require_context_module_1_14,
  './media/preview-image.js': require_context_module_1_15,
  './media/recorder.js': require_context_module_1_16,
  './network/download-file.js': require_context_module_1_17,
  './network/request.js': require_context_module_1_18,
  './network/socket.js': require_context_module_1_19,
  './network/upload-file.js': require_context_module_1_20,
  './ui/create-animation.js': require_context_module_1_21,
  './ui/create-intersection-observer.js': require_context_module_1_22,
  './ui/create-selector-query.js': require_context_module_1_23,
  './ui/keyboard.js': require_context_module_1_24,
  './ui/load-font-face.js': require_context_module_1_25,
  './ui/page-scroll-to.js': require_context_module_1_26,
  './ui/set-page-meta.js': require_context_module_1_27,
  './ui/tab-bar.js': require_context_module_1_28,
  './ui/window.js': require_context_module_1_29,

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
      const target = page.$vm._$vd.elements.find(target => target.tagName === 'web-view' && target.events['message']);
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

    function onAppEnterForeground () {
      callAppHook(getApp(), 'onShow');
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
        } else {
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

    subscribe('onPageScroll', createPageEvent('onPageScroll'));
    subscribe('onReachBottom', createPageEvent('onReachBottom'));

    subscribe('onRequestComponentInfo', onRequestComponentInfo);
    subscribe('onRequestComponentObserver', onRequestComponentObserver);
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
    } else {
      console.error(`vdSync[${pageId}] not found`);
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

    subscribe(WEBVIEW_READY, onWebviewReady);

    const entryPagePath = '/' + __uniConfig.entryPagePath;
    const routeOptions = __uniRoutes.find(route => route.path === entryPagePath);
    if (!routeOptions.meta.isNVue) { // 首页是 vue
      // 防止首页 webview 初始化过早， service 还未开始监听
      publishHandler(WEBVIEW_READY, Object.create(null), [1]);
    }
    // 应该使用subscribe，兼容老版本先用 on api 吧
    on('api.' + WEB_INVOKE_APPSERVICE$1, function (data, webviewIds) {
      emit('onWebInvokeAppService', data, webviewIds);
    });

    subscribe('onWxsInvokeCallMethod', onWxsInvokeCallMethod);

    subscribe(VD_SYNC, onVdSync);
    subscribe(VD_SYNC_CALLBACK, onVdSyncCallback);

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
      '[warn]: getApp() 操作失败，v3模式加速了首页 nvue 的启动速度，当在首页 nvue 中使用 getApp() 不一定可以获取真正的 App 对象。详情请参考：https://uniapp.dcloud.io/collocation/frame/window?id=getapp'
    );
  }

  function initGlobalListeners () {
    const globalEvent = requireNativePlugin('globalEvent');
    const emit = UniServiceJSBridge.emit;

    // splashclosed 时开始监听 backbutton
    plus.globalEvent.addEventListener('splashclosed', () => {
      plus.key.addEventListener('backbutton', backbuttonListener);
    });

    plus.globalEvent.addEventListener('pause', () => {
      emit('onAppEnterBackground');
    });

    plus.globalEvent.addEventListener('resume', () => {
      emit('onAppEnterForeground');
    });

    plus.globalEvent.addEventListener('netchange', () => {
      const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()];
      publish('onNetworkStatusChange', {
        isConnected: networkType !== 'none',
        networkType
      });
    });

    plus.globalEvent.addEventListener('KeyboardHeightChange', function (event) {
      publish('onKeyboardHeightChange', {
        height: event.height
      });
    });

    globalEvent.addEventListener('uistylechange', function (event) {
      publish('onUIStyleChange', {
        style: event.uistyle
      });
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
    const args = {
      path: __uniConfig.entryPagePath,
      query: {},
      scene: 1001
    };

    callAppHook(appVm, 'onLaunch', args);
    callAppHook(appVm, 'onShow', args);
  }

  function initTabBar () {
    if (!__uniConfig.tabBar || !__uniConfig.tabBar.list.length) {
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

  function initEntryPage () {
    let entryPagePath;
    let entryPageQuery;

    const weexPlus = weex.requireModule('plus');

    if (weexPlus.getRedirectInfo) {
      const info = weexPlus.getRedirectInfo() || {};
      entryPagePath = info.path;
      entryPageQuery = info.query ? ('?' + info.query) : '';
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
      return
    }

    const entryRoute = '/' + entryPagePath;
    const routeOptions = __uniRoutes.find(route => route.path === entryRoute);
    if (!routeOptions) {
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

  function registerApp (appVm) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] registerApp`);
    }

    appCtx = appVm;
    appCtx.$vm = appVm;

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

    __uniConfig.ready = true;

    process.env.NODE_ENV !== 'production' && perf('registerApp');
  }

  var tags = [
    'uni-app',
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

  function hasLifecycleHook (vueOptions = {}, hook) {
    return Array.isArray(vueOptions[hook]) && vueOptions[hook].length
  }

  // 使用白名单过滤（前期有一批自定义组件使用了 uni-）

  function initVue (Vue) {
    Vue.config.errorHandler = function (err) {
      const app = typeof getApp === 'function' && getApp();
      if (app && hasLifecycleHook(app.$options, 'onError')) {
        app.__call_hook('onError', err);
      } else {
        console.error(err);
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
      return oldGetTagNamespace(tag) || false
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

    Vue.prototype.selectComponent = function selectComponent (selector) {
      return querySelector(this, parseSelector(selector))
    };

    Vue.prototype.selectAllComponents = function selectAllComponents (selector) {
      return querySelectorAll(this, parseSelector(selector), [])
    };
  }

  const isAndroid = plus.os.name.toLowerCase() === 'android';
  const FOCUS_TIMEOUT = isAndroid ? 300 : 700;
  const HIDE_TIMEOUT = 800;
  let keyboardHeight = 0;
  let onKeyboardShow;
  let focusTimer;
  let hideKeyboardTimeout;

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
      onKeyboardShow && onKeyboardShow();
      if (hideKeyboardTimeout) {
        clearTimeout(hideKeyboardTimeout);
        hideKeyboardTimeout = null;
      }
    } else {
      // 安卓/iOS13收起键盘时通知view层失去焦点
      if (isAndroid || parseInt(plus.os.version) >= 13) {
        hideKeyboardTimeout = setTimeout(function () {
          hideKeyboardTimeout = null;
          var pageId = getCurrentPageId();
          UniServiceJSBridge.publishHandler('hideKeyboard', {}, pageId);
        }, HIDE_TIMEOUT);
      }
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

  // TODO 临时通过序列化,反序列化传递dataset,后续可以全部保留在service,不做传递
  function parseDataset$1 (dataset) {
    const ret = Object.create(null);
    Object.keys(dataset).forEach(name => {
      try {
        ret[name] = JSON.parse(dataset[name]);
      } catch (e) { // dataset 存在两种,一种是被JSON.stringify的,一种是原始的
        ret[name] = dataset[name];
      }
    });
    return ret
  }

  function parseTargets (event) {
    const targetDataset = event.target && event.target.dataset;
    if (targetDataset) {
      event.target.dataset = parseDataset$1(targetDataset);
    }
    const currentTargetDataset = event.currentTarget && event.currentTarget.dataset;
    if (currentTargetDataset) {
      event.currentTarget.dataset = parseDataset$1(currentTargetDataset);
    }
  }

  function wrapperEvent (event) {
    parseTargets(event);
    event.preventDefault = noop;
    event.stopPropagation = noop;
    event.mp = event;
    return Object.assign({
      mp: event // mpvue
    }, event)
  }

  const handleVdData = {
    [UI_EVENT]: function onUIEvent (vdBatchEvent, vd) {
      vdBatchEvent.forEach(([cid, nid, event]) => {
        nid = String(nid);
        const target = vd.elements.find(target => target.cid === cid && target.nid === nid);
        if (!target) {
          return console.error(`event handler[${cid}][${nid}] not found`)
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
    constructor (pageId, pagePath, pageVm) {
      this.pageId = pageId;
      this.pagePath = pagePath;
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
      this.vms[vm._$id] = vm;
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
        return console.error(`removeElement[${elm.cid}][${elm.nid}] not found`)
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
        this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath]]);
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
      this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath]]);
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

  function diffObject (newObj, oldObj, every = true) {
    let result, key, cur, old;
    for (key in newObj) {
      cur = newObj[key];
      old = oldObj[key];
      if (old !== cur) {
        if (!every) {
          return newObj
        }
        setResult(result || (result = Object.create(null)), key, cur);
      }
    }
    return result
  }

  function diffArray (newArr, oldArr) {
    const newLen = newArr.length;
    if (newLen !== oldArr.length) {
      return newArr
    }
    if (isPlainObject(newArr[0])) {
      for (let i = 0; i < newLen; i++) {
        if (diffObject(newArr[i], oldArr[i], false)) {
          return newArr
        }
      }
    } else {
      for (let i = 0; i < newLen; i++) {
        if (newArr[i] !== oldArr[i]) {
          return newArr
        }
      }
    }
  }

  function diffElmData (newObj, oldObj) {
    let result, key, cur, old;
    for (key in newObj) {
      cur = newObj[key];
      old = oldObj[key];
      if (old !== cur) {
        // 全量同步 style (因为 style 可能会动态删除部分样式)
        if (key === B_STYLE && isPlainObject(cur) && isPlainObject(old)) {
          if (Object.keys(cur).length !== Object.keys(old).length) { // 长度不等
            setResult(result || (result = Object.create(null)), B_STYLE, cur);
          } else {
            const style = diffObject(cur, old, false);
            style && setResult(result || (result = Object.create(null)), B_STYLE, style);
          }
        } else if (key === V_FOR && Array.isArray(cur) && Array.isArray(old)) {
          const vFor = diffArray(cur, old);
          vFor && setResult(result || (result = Object.create(null)), V_FOR, vFor);
        } else {
          setResult(result || (result = Object.create(null)), key, cur);
        }
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
      // TODO 自定义组件中的 slot 数据采集是在组件内部，导致所在 context 中无法获取到差量数据
      // 如何保证每个 vm 数据有变动，就加入 diff 中呢？
      // 每次变化，可能触发多次 beforeUpdate，updated
      // 子组件 updated 时，可能会增加父组件的 diffData，如 slot 等情况
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
          this._$vdomSync = new VDomSync(this.$options.pageId, this.$options.pagePath, this);
        }
        if (this._$vd) {
          if (!this.$parent) {
            this._$id = '-1';
          } else {
            this._$id = this.$parent._$id + ',' + this.$vnode.data.attrs._i;
          }
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
    // TODO 暂时先传递 dataset 至 view 层(理论上不需要)
    if (name.indexOf('a-data-') === 0) {
      try {
        value = JSON.stringify(value);
      } catch (e) {}
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
      (vForData[forIndex] || (vForData[forIndex] = {}))['k' + value.keyIndex] = key;
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
    'onError',
    // Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
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
      disableScroll,
      onPageScroll,
      onPageReachBottom,
      onReachBottomDistance,
      statusbarHeight,
      windowTop: windowOptions.titleNView && windowOptions.titleNView.type === 'float' ? (statusbarHeight +
        TITLEBAR_HEIGHT) : 0,
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
          callPageHook(this.$scope, 'onLoad', this.$options.pageQuery);
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
          registerApp(this);
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

  var index = {
    __vuePlugin: vuePlugin,
    __definePage: definePage,
    __registerApp: registerApp,
    __registerPage: registerPage,
    uni: uni$1,
    getApp: getApp$1,
    getCurrentPages: getCurrentPages$1
  };

  return index;

}());

var uni = serviceContext.uni
var getApp = serviceContext.getApp
var getCurrentPages = serviceContext.getCurrentPages

var __definePage = serviceContext.__definePage
var __registerPage = serviceContext.__registerPage


return serviceContext 
}
