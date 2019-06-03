const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

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
      return api(options, ...params)
    }
    return handlePromise(new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
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
    }))
  }
}

const SUCCESS = 'success';
const FAIL = 'fail';
const COMPLETE = 'complete';
const CALLBACKS = [SUCCESS, FAIL, COMPLETE];

const UNIAPP_SERVICE_NVUE_ID = '__uniapp__service';

function noop$1 () {

}
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

function findRefById (id, vm) {
  return findRefByVNode(id, vm._vnode)
}

function findRefByVNode (id, vnode) {
  if (!id || !vnode) {
    return
  }
  if (vnode.data &&
        vnode.data.ref &&
        vnode.data.attrs &&
        vnode.data.attrs.id === id) {
    return vnode.data.ref
  }
  const children = vnode.children;
  if (!children) {
    return
  }
  for (let i = 0, len = children.length; i < len; i++) {
    const ref = findRefByVNode(id, children[i]);
    if (ref) {
      return ref
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

function initPostMessage (nvue) {
  const plus = nvue.requireModule('plus');
  return {
    postMessage (data) {
      plus.postMessage(data, UNIAPP_SERVICE_NVUE_ID);
    }
  }
}

function initTitleNView (nvue) {
  const eventMaps = {
    onNavigationBarButtonTap: noop$1,
    onNavigationBarSearchInputChanged: noop$1,
    onNavigationBarSearchInputConfirmed: noop$1,
    onNavigationBarSearchInputClicked: noop$1
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
  const ref = findRefById(id, vm);
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN');
  }
  return new MapContext(id, vm.$refs[ref])
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
  const ref = findRefById(id, vm);
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN');
  }
  return new VideoContext(id, vm.$refs[ref])
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
  const ref = findRefById(id, vm);
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN');
  }
  return new LivePusherContext(id, vm.$refs[ref])
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

var index_legacy = {
  create (id, env, config) {
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
      instance: {
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
  },

  refresh: function (id, env, config) {

  },

  destroy: function (id, env) {

  }
};

export default index_legacy;
