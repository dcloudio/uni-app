export function createUniInstance(weex, plus, __uniConfig, __uniRoutes, __registerPage, UniServiceJSBridge, getApp, getCurrentPages){
var localStorage = plus.storage

const _toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function toRawType (val) {
  return _toString.call(val).slice(8, -1)
}

function getLen (str = '') {
  /* eslint-disable no-control-regex */
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}

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
    /^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

const CONTEXT_API_RE = /^create|Manager$/;

const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket'];

const CALLBACK_API_RE = /^on/;

function isContextApi (name) {
  return CONTEXT_API_RE.test(name)
}
function isSyncApi (name) {
  return SYNC_API_RE.test(name)
}

function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name)
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
    })))
  }
}

const canIUse = [{
  name: 'schema',
  type: String,
  required: true
}];

var require_context_module_2_0 = /*#__PURE__*/Object.freeze({
  canIUse: canIUse
});

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

var require_context_module_2_1 = /*#__PURE__*/Object.freeze({
  base64ToArrayBuffer: base64ToArrayBuffer,
  arrayBufferToBase64: arrayBufferToBase64
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

const fileType = {
  PNG: 'png',
  JPG: 'jpeg'
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
      params.fileType = value in fileType ? fileType[value] : fileType.PNG;
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

var require_context_module_2_2 = /*#__PURE__*/Object.freeze({
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

var require_context_module_2_3 = /*#__PURE__*/Object.freeze({
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

var require_context_module_2_4 = /*#__PURE__*/Object.freeze({
  makePhoneCall: makePhoneCall
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

var require_context_module_2_5 = /*#__PURE__*/Object.freeze({
  openDocument: openDocument
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

var require_context_module_2_6 = /*#__PURE__*/Object.freeze({
  getLocation: getLocation,
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
    type: Array,
    required: false,
    default: SIZE_TYPES,
    validator (sizeType, params) {
      // 非必传的参数，不符合预期时处理为默认值。
      const length = sizeType.length;
      if (!length) {
        params.sizeType = SIZE_TYPES;
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

var require_context_module_2_7 = /*#__PURE__*/Object.freeze({
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

var require_context_module_2_8 = /*#__PURE__*/Object.freeze({
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
const BASE64_RE = /^data:[a-z-]+\/[a-z-]+;base64,/;

function addBase (filePath) {
  return filePath
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
  if (SCHEME_RE.test(filePath) || BASE64_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
    return filePath
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

var require_context_module_2_9 = /*#__PURE__*/Object.freeze({
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

var require_context_module_2_10 = /*#__PURE__*/Object.freeze({
  previewImage: previewImage
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

var require_context_module_2_11 = /*#__PURE__*/Object.freeze({
  setNavigationBarColor: setNavigationBarColor,
  setNavigationBarTitle: setNavigationBarTitle
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

var require_context_module_2_12 = /*#__PURE__*/Object.freeze({
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
  JSON: 'JSON'
};
const responseType = {
  TEXT: 'TEXT',
  ARRAYBUFFER: 'ARRAYBUFFER'
};
const request = {
  url: {
    type: String,
    required: true
  },
  data: {
    type: [Object, String, ArrayBuffer],
    validator (value, params) {
      params.data = value || '';
    }
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
      params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value;
    }
  },
  dataType: {
    type: String,
    validator (value, params) {
      params.dataType = (value || dataType.JSON).toUpperCase();
    }
  },
  responseType: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase();
      params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value;
    }
  }
};

var require_context_module_2_13 = /*#__PURE__*/Object.freeze({
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
    type: Array,
    validator (value, params) {
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

var require_context_module_2_14 = /*#__PURE__*/Object.freeze({
  connectSocket: connectSocket,
  sendSocketMessage: sendSocketMessage,
  closeSocket: closeSocket
});

const uploadFile = {
  url: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true,
    validator (value, params) {
      params.type = getRealPath(value);
    }
  },
  name: {
    type: String,
    required: true
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

var require_context_module_2_15 = /*#__PURE__*/Object.freeze({
  uploadFile: uploadFile
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

var require_context_module_2_16 = /*#__PURE__*/Object.freeze({
  pageScrollTo: pageScrollTo
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

var require_context_module_2_17 = /*#__PURE__*/Object.freeze({
  getProvider: getProvider
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

var require_context_module_2_18 = /*#__PURE__*/Object.freeze({
  showModal: showModal,
  showToast: showToast,
  showLoading: showLoading,
  showActionSheet: showActionSheet
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

var require_context_module_2_19 = /*#__PURE__*/Object.freeze({
  redirectTo: redirectTo,
  reLaunch: reLaunch,
  navigateTo: navigateTo,
  switchTab: switchTab,
  navigateBack: navigateBack
});

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

var require_context_module_2_20 = /*#__PURE__*/Object.freeze({
  setStorage: setStorage,
  setStorageSync: setStorageSync
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

var require_context_module_2_21 = /*#__PURE__*/Object.freeze({
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
      './base.js': require_context_module_2_0,
'./base64.js': require_context_module_2_1,
'./canvas.js': require_context_module_2_2,
'./context.js': require_context_module_2_3,
'./device/make-phone-call.js': require_context_module_2_4,
'./file/open-document.js': require_context_module_2_5,
'./location.js': require_context_module_2_6,
'./media/choose-image.js': require_context_module_2_7,
'./media/choose-video.js': require_context_module_2_8,
'./media/get-image-info.js': require_context_module_2_9,
'./media/preview-image.js': require_context_module_2_10,
'./navigation-bar.js': require_context_module_2_11,
'./network/download-file.js': require_context_module_2_12,
'./network/request.js': require_context_module_2_13,
'./network/socket.js': require_context_module_2_14,
'./network/upload-file.js': require_context_module_2_15,
'./page-scroll-to.js': require_context_module_2_16,
'./plugins.js': require_context_module_2_17,
'./popup.js': require_context_module_2_18,
'./route.js': require_context_module_2_19,
'./storage.js': require_context_module_2_20,
'./tab-bar.js': require_context_module_2_21,

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
    valid = value instanceof type;
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
      delete extras[name];
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
  return function (args) {
    console.error('API `' + name + '` is not yet implemented');
  }
}

function wrapper (name, invokeMethod, extras) {
  if (!isFn(invokeMethod)) {
    return invokeMethod
  }
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

UniServiceJSBridge.publishHandler = UniServiceJSBridge.emit;
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler;

const base = [
  'base64ToArrayBuffer',
  'arrayBufferToBase64'
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
  'chooseMessageFile',
  'getRecorderManager',
  'getBackgroundAudioManager',
  'createInnerAudioContext',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'createVideoContext',
  'createCameraContext',
  'createLivePlayerContext'
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
  'stopBeaconDiscovery'
];

const keyboard = [
  'hideKeyboard'
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
  'showShareMenu',
  'hideShareMenu',
  'requestPayment',
  'subscribePush',
  'unsubscribePush',
  'onPush',
  'offPush',
  'requireNativePlugin',
  'upx2px'
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
  ...third
];

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

const base64ToArrayBuffer$1 = base64Arraybuffer_2;
const arrayBufferToBase64$1 = base64Arraybuffer_1;

var require_context_module_1_0 = /*#__PURE__*/Object.freeze({
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
  canIUse: canIUse$1
});

const interceptors = {
  promiseInterceptor
};

var require_context_module_1_2 = /*#__PURE__*/Object.freeze({
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor
});

function pageScrollTo$1 (args) {
  const pages = getCurrentPages();
  if (pages.length) {
    UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id);
  }
  return {}
}

let pageId;

function setPullDownRefreshPageId (pullDownRefreshPageId) {
  pageId = pullDownRefreshPageId;
}

function startPullDownRefresh () {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
  }
  const pages = getCurrentPages();
  if (pages.length) {
    pageId = pages[pages.length - 1].$page.id;
    UniServiceJSBridge.emit(pageId + '.startPullDownRefresh', {}, pageId);
  }
  return {}
}

function stopPullDownRefresh () {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
    pageId = null;
  } else {
    const pages = getCurrentPages();
    if (pages.length) {
      pageId = pages[pages.length - 1].$page.id;
      UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
    }
  }
  return {}
}

var require_context_module_1_3 = /*#__PURE__*/Object.freeze({
  pageScrollTo: pageScrollTo$1,
  setPullDownRefreshPageId: setPullDownRefreshPageId,
  startPullDownRefresh: startPullDownRefresh,
  stopPullDownRefresh: stopPullDownRefresh
});

function setStorage$1 ({
  key,
  data
} = {}) {
  const value = {
    type: typeof data === 'object' ? 'object' : 'string',
    data: data
  };
  localStorage.setItem(key, JSON.stringify(value));
  const keyList = localStorage.getItem('uni-storage-keys');
  if (!keyList) {
    localStorage.setItem('uni-storage-keys', JSON.stringify([key]));
  } else {
    const keys = JSON.parse(keyList);
    if (keys.indexOf(key) < 0) {
      keys.push(key);
      localStorage.setItem('uni-storage-keys', JSON.stringify(keys));
    }
  }
  return {
    errMsg: 'setStorage:ok'
  }
}

function setStorageSync$1 (key, data) {
  setStorage$1({
    key,
    data
  });
}

function getStorage ({
  key
} = {}) {
  const data = localStorage.getItem(key);
  return data ? {
    data: JSON.parse(data).data,
    errMsg: 'getStorage:ok'
  } : {
    data: '',
    errMsg: 'getStorage:fail'
  }
}

function getStorageSync (key) {
  const res = getStorage({
    key
  });
  return res.data
}

function removeStorage ({
  key
} = {}) {
  const keyList = localStorage.getItem('uni-storage-keys');
  if (keyList) {
    const keys = JSON.parse(keyList);
    const index = keys.indexOf(key);
    keys.splice(index, 1);
    localStorage.setItem('uni-storage-keys', JSON.stringify(keys));
  }
  localStorage.removeItem(key);
  return {
    errMsg: 'removeStorage:ok'
  }
}

function removeStorageSync (key) {
  removeStorage({
    key
  });
}

function clearStorage () {
  localStorage.clear();
  return {
    errMsg: 'clearStorage:ok'
  }
}

function clearStorageSync () {
  clearStorage();
}

function getStorageInfo () { // TODO 暂时先不做大小的转换
  const keyList = localStorage.getItem('uni-storage-keys');
  return keyList ? {
    keys: JSON.parse(keyList),
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:ok'
  } : {
    keys: '',
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:fail'
  }
}

function getStorageInfoSync () {
  const res = getStorageInfo();
  delete res.errMsg;
  return res
}

var require_context_module_1_4 = /*#__PURE__*/Object.freeze({
  setStorage: setStorage$1,
  setStorageSync: setStorageSync$1,
  getStorage: getStorage,
  getStorageSync: getStorageSync,
  removeStorage: removeStorage,
  removeStorageSync: removeStorageSync,
  clearStorage: clearStorage,
  clearStorageSync: clearStorageSync,
  getStorageInfo: getStorageInfo,
  getStorageInfoSync: getStorageInfoSync
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
      return 1
    } else {
      return 0.5
    }
  }
  return number < 0 ? -result : result
}

var require_context_module_1_5 = /*#__PURE__*/Object.freeze({
  upx2px: upx2px
});

const api = Object.create(null);

const modules$1 = 
  (function() {
    var map = {
      './base64.js': require_context_module_1_0,
'./can-i-use.js': require_context_module_1_1,
'./interceptor.js': require_context_module_1_2,
'./page-event.js': require_context_module_1_3,
'./storage.js': require_context_module_1_4,
'./upx2px.js': require_context_module_1_5,

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
  Object.assign(api, modules$1(key));
});

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge;

let waiting;
let waitingTimeout;
let toast = false;
let toastTimeout;

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
      return
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
      invoke(callbackId, {
        errMsg: 'showModal:ok',
        confirm: e.index === 1,
        cancel: e.index === 0 || e.index === -1
      });
    } else {
      invoke(callbackId, {
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
      title: item
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
      invoke(callbackId, {
        errMsg: 'showActionSheet:ok',
        tapIndex: e.index - 1
      });
    } else {
      invoke(callbackId, {
        errMsg: 'showActionSheet:fail cancel'
      });
    }
  });
}

var require_context_module_0_0 = /*#__PURE__*/Object.freeze({
  showToast: showToast$1,
  hideToast: hideToast,
  showModal: showModal$1,
  showActionSheet: showActionSheet$1
});

const ANI_DURATION = 300;
const ANI_SHOW = 'pop-in';

function showWebview (webview, animationType, animationDuration) {
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        console.log('show.callback');
      }
    );
  }, 50);
}

var require_context_module_0_6 = /*#__PURE__*/Object.freeze({
  ANI_DURATION: ANI_DURATION,
  showWebview: showWebview
});

let firstBackTime = 0;

function navigateBack$1 ({
  delta,
  animationType,
  animationDuration
}) {
  const pages = getCurrentPages();
  const len = pages.length - 1;
  const page = pages[len];
  if (page.$page.meta.isQuit) {
    if (!firstBackTime) {
      firstBackTime = Date.now();
      plus.nativeUI.toast('再按一次退出应用');
      setTimeout(() => {
        firstBackTime = null;
      }, 2000);
    } else if (Date.now() - firstBackTime < 2000) {
      plus.runtime.quit();
    }
  } else {
    pages.splice(len, 1);
    if (animationType) {
      page.$getAppWebview().close(animationType, animationDuration || ANI_DURATION);
    } else {
      page.$getAppWebview().close('auto');
    }
    UniServiceJSBridge.emit('onAppRoute', {
      type: 'navigateBack'
    });
  }
}

var require_context_module_0_1 = /*#__PURE__*/Object.freeze({
  navigateBack: navigateBack$1
});

function navigateTo$1 ({
  url,
  animationType,
  animationDuration
}) {
  const path = url.split('?')[0];

  UniServiceJSBridge.emit('onAppRoute', {
    type: 'navigateTo',
    path
  });

  showWebview(
    __registerPage({
      path
    }),
    animationType,
    animationDuration
  );
}

var require_context_module_0_2 = /*#__PURE__*/Object.freeze({
  navigateTo: navigateTo$1
});

function reLaunch$1 ({
  path
}) {}

var require_context_module_0_3 = /*#__PURE__*/Object.freeze({
  reLaunch: reLaunch$1
});

function redirectTo$1 ({
  path
}) {}

var require_context_module_0_4 = /*#__PURE__*/Object.freeze({
  redirectTo: redirectTo$1
});

function switchTab$1 ({
  path
}) {}

var require_context_module_0_5 = /*#__PURE__*/Object.freeze({
  switchTab: switchTab$1
});

const api$1 = Object.create(null);

const modules$2 = 
  (function() {
    var map = {
      './popup.js': require_context_module_0_0,
'./router/navigate-back.js': require_context_module_0_1,
'./router/navigate-to.js': require_context_module_0_2,
'./router/re-launch.js': require_context_module_0_3,
'./router/redirect-to.js': require_context_module_0_4,
'./router/switch-tab.js': require_context_module_0_5,
'./router/util.js': require_context_module_0_6,

    };
    var req = function req(key) {
      return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
    };
    req.keys = function() {
      return Object.keys(map);
    };
    return req;
  })();


modules$2.keys().forEach(function (key) {
  Object.assign(api$1, modules$2(key));
});

const api$2 = Object.create(null);

Object.assign(api$2, api);
Object.assign(api$2, api$1);

const uni$1 = Object.create(null);

apis.forEach(name => {
  if (api$2[name]) {
    uni$1[name] = promisify(name, wrapper(name, api$2[name]));
  } else {
    uni$1[name] = wrapperUnimplemented(name);
  }
});

  return uni$1 
}
