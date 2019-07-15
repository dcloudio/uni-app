export function createUniInstance(plus){

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

const globalInterceptors = {};
const scopedInterceptors = {};

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

var require_context_module_0_0 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_1 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_2 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_3 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_4 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_5 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_6 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_7 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_8 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_9 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_10 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_11 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_12 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_13 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_14 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_15 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_16 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_17 = /*#__PURE__*/Object.freeze({
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
  },
  isShowLoading: {
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

var require_context_module_0_18 = /*#__PURE__*/Object.freeze({
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

function createProtocol (type) {
  return {
    url: {
      type: String,
      required: true,
      validator: createValidator(type)
    }
  }
}
const redirectTo = createProtocol('redirectTo');

const reLaunch = createProtocol('reLaunch');

const navigateTo = createProtocol('navigateTo');

const switchTab = createProtocol('switchTab');

const navigateBack = {
  delta: {
    type: Number,
    validator (delta, params) {
      delta = parseInt(delta) || 1;
      params.delta = Math.min(getCurrentPages().length - 1, delta);
    }
  }
};

var require_context_module_0_19 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_20 = /*#__PURE__*/Object.freeze({
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

var require_context_module_0_21 = /*#__PURE__*/Object.freeze({
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
      '/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/base.js': require_context_module_0_0,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/base64.js': require_context_module_0_1,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/canvas.js': require_context_module_0_2,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/context.js': require_context_module_0_3,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/device/make-phone-call.js': require_context_module_0_4,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/file/open-document.js': require_context_module_0_5,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/location.js': require_context_module_0_6,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/media/choose-image.js': require_context_module_0_7,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/media/choose-video.js': require_context_module_0_8,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/media/get-image-info.js': require_context_module_0_9,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/media/preview-image.js': require_context_module_0_10,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/navigation-bar.js': require_context_module_0_11,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/network/download-file.js': require_context_module_0_12,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/network/request.js': require_context_module_0_13,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/network/socket.js': require_context_module_0_14,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/network/upload-file.js': require_context_module_0_15,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/page-scroll-to.js': require_context_module_0_16,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/plugins.js': require_context_module_0_17,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/popup.js': require_context_module_0_18,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/route.js': require_context_module_0_19,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/storage.js': require_context_module_0_20,
'/Users/fxy/Documents/GitHub/uni-app-dev/src/core/helpers/protocol/tab-bar.js': require_context_module_0_21,

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

function hasLifecycleHook (vueOptions = {}, hook) {
  return Array.isArray(vueOptions[hook]) && vueOptions[hook].length
}

function onAppRoute (type, {
  url,
  delta,
  from = 'navigateBack',
  detail
} = {}) {
  const router = getApp().$router;
  switch (type) {
    case 'redirectTo':
      router.replace({
        type,
        path: url
      });
      break
    case 'navigateTo':
      router.push({
        type,
        path: url
      });
      break
    case 'navigateBack':
      let canBack = true;
      const pages = getCurrentPages();
      if (pages.length) {
        const page = pages[pages.length - 1];
        if (hasLifecycleHook(page.$options, 'onBackPress') && page.__call_hook('onBackPress', {
          from
        }) === true) {
          canBack = false;
        }
      }
      if (canBack) {
        if (delta > 1) {
          router._$delta = delta;
        }
        router.go(-delta);
      }
      break
    case 'reLaunch':
      router.replace({
        type,
        path: url
      });
      break
    case 'switchTab':
      router.replace({
        type,
        path: url,
        params: {
          detail
        }
      });
      break
  }
  return {
    errMsg: type + ':ok'
  }
}

function redirectTo$1 (args) {
  return onAppRoute('redirectTo', args)
}

function navigateTo$1 (args) {
  return onAppRoute('navigateTo', args)
}

function navigateBack$1 (args) {
  return onAppRoute('navigateBack', args)
}

function reLaunch$1 (args) {
  return onAppRoute('reLaunch', args)
}

function switchTab$1 (args) {
  return onAppRoute('switchTab', args)
}



var api = /*#__PURE__*/Object.freeze({
  redirectTo: redirectTo$1,
  navigateTo: navigateTo$1,
  navigateBack: navigateBack$1,
  reLaunch: reLaunch$1,
  switchTab: switchTab$1
});

const uni$1 = Object.create(null);

/* eslint-disable no-undef */
uni$1.version = __VERSION__;

Object.keys(api).forEach(name => {
  uni$1[name] = promisify(name, wrapper(name, api[name]));
});

  return uni$1 
}
