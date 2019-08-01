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

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
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

const UNIAPP_SERVICE_NVUE_ID = '__uniapp__service';

function initPostMessage (nvue) {
  const plus = nvue.requireModule('plus');
  return {
    postMessage (data) {
      plus.postMessage(data, UNIAPP_SERVICE_NVUE_ID);
    }
  }
}

function initSubNVue (nvue, plus, BroadcastChannel) {
  let origin;

  const onMessageCallbacks = [];

  const postMessage = nvue.requireModule('plus').postMessage;

  const onSubNVueMessage = function onSubNVueMessage (data) {
    onMessageCallbacks.forEach(callback => callback({
      origin,
      data
    }));
  };

  nvue.requireModule('globalEvent').addEventListener('plusMessage', e => {
    if (e.data.type === 'UniAppSubNVue') {
      onSubNVueMessage(e.data.data, e.data.options);
    }
  });

  const webviewId = plus.webview.currentWebview().id;

  const channel = new BroadcastChannel('UNI-APP-SUBNVUE');
  channel.onmessage = function (event) {
    if (event.data.to === webviewId) {
      onSubNVueMessage(event.data.data);
    }
  };

  const wrapper = function wrapper (webview) {
    webview.$processed = true;

    const currentWebviewId = plus.webview.currentWebview().id;
    const isPopupNVue = currentWebviewId === webview.id;

    const hostNVueId = webview.__uniapp_origin_type === 'uniNView' && webview.__uniapp_origin_id;
    const popupNVueId = webview.id;

    webview.postMessage = function (data) {
      if (hostNVueId) {
        channel.postMessage({
          data,
          to: isPopupNVue ? hostNVueId : popupNVueId
        });
      } else {
        postMessage({
          type: 'UniAppSubNVue',
          data: data
        }, UNIAPP_SERVICE_NVUE_ID);
      }
    };
    webview.onMessage = function (callback) {
      onMessageCallbacks.push(callback);
    };

    if (!webview.__uniapp_mask_id) {
      return
    }
    origin = webview.__uniapp_host;

    const maskColor = webview.__uniapp_mask;

    let maskWebview = plus.webview.getWebviewById(webview.__uniapp_mask_id);
    maskWebview = maskWebview.parent() || maskWebview; // 再次检测父
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
      return oldClose.apply(webview, args)
    };
  };

  const getSubNVueById = function getSubNVueById (id) {
    const webview = plus.webview.getWebviewById(id);
    if (webview && !webview.$processed) {
      wrapper(webview);
    }
    return webview
  };

  return {
    getSubNVueById,
    getCurrentSubNVue () {
      return getSubNVueById(plus.webview.currentWebview().id)
    }
  }
}

function noop () {}

function initTitleNView (nvue) {
  const eventMaps = {
    onNavigationBarButtonTap: noop,
    onNavigationBarSearchInputChanged: noop,
    onNavigationBarSearchInputConfirmed: noop,
    onNavigationBarSearchInputClicked: noop
  };
  nvue.requireModule('globalEvent').addEventListener('plusMessage', e => {
    if (eventMaps[e.data.type]) {
      eventMaps[e.data.type](e.data.data);
    }
  });
  const ret = Object.create(null);
  Object.keys(eventMaps).forEach(eventType => {
    ret[eventType] = function (callback) {
      eventMaps[eventType] = callback;
    };
  });
  return ret
}

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;

function upx2px (number, newDeviceWidth) {
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

function initUpx2px (nvue) {
  const env = nvue.config.env;

  deviceDPR = env.scale;
  deviceWidth = Math.ceil(env.deviceWidth / deviceDPR);
  isIOS = env.platform === 'iOS';
}

let getEmitter;

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

function initEventBus (getGlobalEmitter) {
  getEmitter = getGlobalEmitter;
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
  return findRefByElm(id, vm.$el)
}

function findRefByElm (id, elm) {
  if (!id || !elm) {
    return
  }
  if (elm.attr.id === id) {
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

class MapContext {
  constructor (id, ctx) {
    this.id = id;
    this.ctx = ctx;
  }

  getCenterLocation (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getCenterLocation', cbs)
  }

  moveToLocation () {
    return invokeVmMethodWithoutArgs(this.ctx, 'moveToLocation')
  }

  translateMarker (args) {
    return invokeVmMethod(this.ctx, 'translateMarker', args, ['animationEnd'])
  }

  includePoints (args) {
    return invokeVmMethod(this.ctx, 'includePoints', args)
  }

  getRegion (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getRegion', cbs)
  }

  getScale (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getScale', cbs)
  }
}

function createMapContext (id, vm) {
  if (!vm) {
    return console.warn('uni.createMapContext 必须传入第二个参数，即当前 vm 对象(this)')
  }
  const elm = findElmById(id, vm);
  if (!elm) {
    return console.warn('Can not find `' + id + '`')
  }
  return new MapContext(id, elm)
}

class VideoContext {
  constructor (id, ctx) {
    this.id = id;
    this.ctx = ctx;
  }

  play () {
    return invokeVmMethodWithoutArgs(this.ctx, 'play')
  }

  pause () {
    return invokeVmMethodWithoutArgs(this.ctx, 'pause')
  }

  seek (args) {
    return invokeVmMethod(this.ctx, 'seek', args)
  }

  stop () {
    return invokeVmMethodWithoutArgs(this.ctx, 'stop')
  }

  sendDanmu (args) {
    return invokeVmMethod(this.ctx, 'sendDanmu', args)
  }

  playbackRate (args) {
    return invokeVmMethod(this.ctx, 'playbackRate', args)
  }

  requestFullScreen (args) {
    return invokeVmMethod(this.ctx, 'requestFullScreen', args)
  }

  exitFullScreen () {
    return invokeVmMethodWithoutArgs(this.ctx, 'exitFullScreen')
  }

  showStatusBar () {
    return invokeVmMethodWithoutArgs(this.ctx, 'showStatusBar')
  }

  hideStatusBar () {
    return invokeVmMethodWithoutArgs(this.ctx, 'hideStatusBar')
  }
}

function createVideoContext (id, vm) {
  if (!vm) {
    return console.warn('uni.createVideoContext 必须传入第二个参数，即当前 vm 对象(this)')
  }
  const elm = findElmById(id, vm);
  if (!elm) {
    return console.warn('Can not find `' + id + '`')
  }
  return new VideoContext(id, elm)
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



var apis = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  $on: $on,
  $once: $once,
  $off: $off,
  $emit: $emit,
  createMapContext: createMapContext,
  createVideoContext: createVideoContext,
  createLivePusherContext: createLivePusherContext
});

function initUni (uni, nvue, plus, BroadcastChannel) {
  const {
    getSubNVueById,
    getCurrentSubNVue
  } = initSubNVue(nvue, plus, BroadcastChannel);

  const scopedApis = Object.assign({
    getSubNVueById,
    getCurrentSubNVue,
    requireNativePlugin: nvue.requireModule
  }, initTitleNView(nvue), initPostMessage(nvue));

  if (typeof Proxy !== 'undefined') {
    return new Proxy({}, {
      get (target, name) {
        if (apis[name]) {
          return apis[name]
        }
        if (scopedApis[name]) {
          return scopedApis[name]
        }
        if (!hasOwn(uni, name)) {
          return
        }
        return promisify(name, uni[name])
      }
    })
  }
  const ret = {
    requireNativePlugin: nvue.requireModule
  };
  Object.keys(apis).forEach(name => {
    ret[name] = apis[name];
  });
  Object.keys(scopedApis).forEach(name => {
    ret[name] = scopedApis[name];
  });
  Object.keys(uni).forEach(name => {
    ret[name] = promisify(name, uni[name]);
  });
  return ret
}

let getGlobalUni;
let getGlobalApp;
let getGlobalUniEmitter;
let getGlobalCurrentPages;

function createInstanceContext () {
  return {
    initUniApp ({
      nvue,
      getUni,
      getApp,
      getUniEmitter,
      getCurrentPages
    }) {
      getGlobalUni = getUni;
      getGlobalApp = getApp;
      getGlobalUniEmitter = getUniEmitter;
      getGlobalCurrentPages = getCurrentPages;

      initUpx2px(nvue);
      initEventBus(getUniEmitter);
    },
    getUni (nvue, plus, BroadcastChannel) {
      return initUni(getGlobalUni(), nvue, plus, BroadcastChannel)
    },
    getApp () {
      return getGlobalApp()
    },
    getUniEmitter () {
      return getGlobalUniEmitter()
    },
    getCurrentPages () {
      return getGlobalCurrentPages()
    }
  }
}

export { createInstanceContext };
