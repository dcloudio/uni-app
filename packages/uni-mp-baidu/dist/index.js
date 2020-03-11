import Vue from 'vue';

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

const CALLBACK_API_RE = /^on/;

function isContextApi (name) {
  return CONTEXT_API_RE.test(name)
}
function isSyncApi (name) {
  return SYNC_API_RE.test(name)
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
  } = swan.getSystemInfoSync(); // uni=>swan runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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

const interceptors = {
  promiseInterceptor
};



var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor
});

var previewImage = {
  args (fromArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return
    }
    const urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return
    }
    const len = urls.length;
    if (!len) {
      return
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
        (item, index) => index < currentIndex ? item !== urls[currentIndex] : true
      );
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    }
  }
};

// 不支持的 API 列表
const todos = [
  // 'hideKeyboard',
  // 'onGyroscopeChange',
  // 'startGyroscope',
  // 'stopGyroscope',
  // 'openBluetoothAdapter',
  // 'startBluetoothDevicesDiscovery',
  // 'onBluetoothDeviceFound',
  // 'stopBluetoothDevicesDiscovery',
  // 'onBluetoothAdapterStateChange',
  // 'getConnectedBluetoothDevices',
  // 'getBluetoothDevices',
  // 'getBluetoothAdapterState',
  // 'closeBluetoothAdapter',
  // 'writeBLECharacteristicValue',
  // 'readBLECharacteristicValue',
  // 'onBLEConnectionStateChange',
  // 'onBLECharacteristicValueChange',
  // 'notifyBLECharacteristicValueChange',
  // 'getBLEDeviceServices',
  // 'getBLEDeviceCharacteristics',
  // 'createBLEConnection',
  // 'closeBLEConnection',
  // 'onBeaconServiceChange',
  // 'onBeaconUpdate',
  // 'getBeacons',
  // 'startBeaconDiscovery',
  // 'stopBeaconDiscovery',
  // 'hideShareMenu',
  // 'onWindowResize',
  // 'offWindowResize',
  // 'vibrate'
];

// 存在兼容性的 API 列表
const canIUses = [];

function createTodoMethod (contextName, methodName) {
  return function unsupported () {
    console.error(`百度小程序 ${contextName}暂不支持${methodName}`);
  }
}

function _handleEnvInfo (result) {
  result.miniProgram = {
    appId: result.appKey
  };
  result.plugin = {
    version: result.sdkVersion
  };
}

// 需要做转换的 API 列表
const protocols = {
  request: {
    args (fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      return {
        method: 'method',
        dataType (type) {
          return {
            name: 'dataType',
            value: type === 'json' ? type : 'string'
          }
        }
      }
    }
  },
  connectSocket: {
    args: {
      method: false
    }
  },
  previewImage,
  getRecorderManager: {
    returnValue (fromRet) {
      fromRet.onFrameRecorded = createTodoMethod('RecorderManager', 'onFrameRecorded');
    }
  },
  getBackgroundAudioManager: {
    returnValue (fromRet) {
      fromRet.onPrev = createTodoMethod('BackgroundAudioManager', 'onPrev');
      fromRet.onNext = createTodoMethod('BackgroundAudioManager', 'onNext');
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  navigateToMiniProgram: {
    name: 'navigateToSmartProgram',
    args: {
      appId: 'appKey',
      envVersion: false
    }
  },
  navigateBackMiniProgram: {
    name: 'navigateBackSmartProgram'
  },
  showShareMenu: {
    name: 'openShare'
  },
  getAccountInfoSync: {
    name: 'getEnvInfoSync',
    returnValue: _handleEnvInfo
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
    for (let key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        let keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) { // 不支持的参数
          console.warn(`百度小程序 ${methodName}暂不支持${key}`);
        } else if (isStr(keyOption)) { // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) { // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
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
        console.error(`百度小程序 暂不支持${methodName}`);
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
      const returnValue = swan[options.name || methodName].apply(swan, args);
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
      errMsg: `${name}:fail:暂不支持 ${name} 方法`
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  }
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['baidu'],
  share: ['baidu'],
  payment: ['baidu'],
  push: ['baidu']
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
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
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
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter
  }
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

function requestPayment (params) {
  let parseError = false;
  if (typeof params.orderInfo === 'string') {
    try {
      params.orderInfo = JSON.parse(params.orderInfo);
    } catch (e) {
      parseError = true;
    }
  }
  if (parseError) {
    params.fail && params.fail({
      errMsg: 'requestPayment:fail: 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo'
    });
  } else {
    swan.requestPolymerPayment(params);
  }
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  requestPayment: requestPayment
});

const MPPage = Page;
const MPComponent = Component;

const customizeRE = /:/g;

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
});

function initTriggerEvent (mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customize(event), ...args])
  };
}

function initHook (name, options) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function (...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args)
    };
  }
}

Page = function (options = {}) {
  initHook('onLoad', options);
  return MPPage(options)
};

Component = function (options = {}) {
  initHook('created', options);
  return MPComponent(options)
};

const PAGE_EVENT_HOOKS = [
  'onPullDownRefresh',
  'onReachBottom',
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
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
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
  const vueBehaviors = vueOptions['behaviors'];
  const vueExtends = vueOptions['extends'];
  const vueMixins = vueOptions['mixins'];

  let vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  const behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(behavior => {
      behaviors.push(behavior.replace('uni://', `${"swan"}://`));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: ''
          };
          vueProps['value'] = {
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
  {
    if (
      defaultValue === false &&
      Array.isArray(type) &&
      type.length === 2 &&
      type.indexOf(String) !== -1 &&
      type.indexOf(Boolean) !== -1
    ) { // [String,Boolean]=>Boolean
      if (file) {
        console.warn(
          `props.${key}.type should use Boolean instead of [String,Boolean] at ${file}`
        );
      }
      return Boolean
    }
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
        let value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value,
          observer: createObserver(key)
        };
      } else { // content:String
        const type = parsePropType(key, opts, null, file);
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

  { // mp-baidu，checked=>value
    if (
      isPlainObject(event.detail) &&
      hasOwn(event.detail, 'checked') &&
      !hasOwn(event.detail, 'value')
    ) {
      event.detail.value = event.detail.checked;
    }
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

      const vFor = dataPath ? vm.__get_value(dataPath, context) : context;

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

function handleEvent (event) {
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  const dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn(`事件信息不存在`)
  }
  const eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn(`事件信息不存在`)
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
          if (
            handlerCtx.$options.generic &&
            handlerCtx.$parent &&
            handlerCtx.$parent.$parent
          ) { // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
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
          ret.push(handler.apply(handlerCtx, processEventArgs(
            this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName
          )));
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

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound'
];

function parseBaseApp (vm, {
  mocks,
  initRefs
}) {
  if (vm.$options.store) {
    Vue.prototype.$store = vm.$options.store;
  }

  Vue.prototype.mpHost = "mp-baidu";

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

function initBehavior (options) {
  return Behavior(options)
}

function initRefs (vm) {
  const mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = {};
      const components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(component => {
        const ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(component => {
        const ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs
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

const mocks = ['nodeId', 'componentName'];

function isPage () {
  return !this.ownerId
}

function initRelation (detail) {
  this.dispatch('__l', detail);
}

function parseApp (vm) {
  // 百度 onShow 竟然会在 onLaunch 之前
  const appOptions = parseBaseApp(vm, {
    mocks,
    initRefs
  });
  appOptions.onShow = function onShow (args) {
    if (!this.$vm) {
      this.onLaunch(args);
    }
    this.$vm.__call_hook('onShow', args);
  };
  return appOptions
}

function createApp (vm) {
  App(parseApp(vm));
  return vm
}

function parseBaseComponent (vueComponentOptions, {
  isPage,
  initRelation
} = {}) {
  let [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions);

  const options = {
    multipleSlots: true,
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

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      };
    });
  }

  if (isPage) {
    return componentOptions
  }
  return [componentOptions, VueComponent]
}

const newLifecycle = swan.canIUse('lifecycle-2-0');

function parseComponent (vueOptions) {
  const componentOptions = parseBaseComponent(vueOptions, {
    isPage,
    initRelation
  });

  // 关于百度小程序生命周期的说明(组件作为页面时):
  // lifetimes:attached --> methods:onShow --> methods:onLoad --> methods:onReady
  // 这里在强制将onShow挪到onLoad之后触发,另外一处修改在page-parser.js
  const oldAttached = componentOptions.lifetimes.attached;
  componentOptions.lifetimes.attached = function attached () {
    oldAttached.call(this);
    if (isPage.call(this)) { // 百度 onLoad 在 attached 之前触发
      // 百度 当组件作为页面时 pageinstancce 不是原来组件的 instance
      this.pageinstance.$vm = this.$vm;
      if (hasOwn(this.pageinstance, '_$args')) {
        this.$vm.$mp.query = this.pageinstance._$args;
        this.$vm.__call_hook('onLoad', this.pageinstance._$args);
        this.$vm.__call_hook('onShow');
        delete this.pageinstance._$args;
      }
    } else {
      // 百度小程序组件不触发methods内的onReady
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
      }
    }
  };

  if (newLifecycle) {
    delete componentOptions.lifetimes.ready;
    componentOptions.methods.onReady = function () {
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    };
  }

  componentOptions.messages = {
    '__l': componentOptions.methods['__l']
  };
  delete componentOptions.methods['__l'];

  return componentOptions
}

const hooks$1 = [
  'onShow',
  'onHide',
  'onUnload'
];

hooks$1.push(...PAGE_EVENT_HOOKS);

function parseBasePage (vuePageOptions, {
  isPage,
  initRelation
}) {
  const pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions
}

function detached ($vm) {
  $vm.$children.forEach(childVm => {
    childVm.$scope.detached();
  });
  $vm.$scope.detached();
}

function onPageUnload ($vm) {
  $vm.$destroy();
  $vm.$children.forEach(childVm => {
    detached(childVm);
  });
}

function parsePage (vuePageOptions) {
  const pageOptions = parseBasePage(vuePageOptions, {
    isPage,
    initRelation
  });

  // 纠正百度小程序生命周期methods:onShow在methods:onLoad之前触发的问题
  pageOptions.methods.onShow = function onShow () {
    if (this.$vm && this.$vm.$mp.query) {
      this.$vm.__call_hook('onShow');
    }
  };

  pageOptions.methods.onLoad = function onLoad (args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      this.$vm.$mp.query = args;
      this.$vm.__call_hook('onLoad', args);
      this.$vm.__call_hook('onShow');
    } else {
      this.pageinstance._$args = args;
    }
  };

  pageOptions.methods.onUnload = function onUnload () {
    this.$vm.__call_hook('onUnload');
    onPageUnload(this.$vm);
  };

  return pageOptions
}

function createPage (vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions))
  }
}

function createComponent (vueOptions) {
  {
    return Component(parseComponent(vueOptions))
  }
}

todos.forEach(todoApi => {
  protocols[todoApi] = false;
});

canIUses.forEach(canIUseApi => {
  const apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name
    : canIUseApi;
  if (!swan.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

let uni = {};

if (typeof Proxy !== 'undefined' && "mp-baidu" !== 'app-plus') {
  uni = new Proxy({}, {
    get (target, name) {
      if (target[name]) {
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
      if (!hasOwn(swan, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, swan[name]))
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

  Object.keys(swan).forEach(name => {
    if (hasOwn(swan, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, swan[name]));
    }
  });
}

swan.createApp = createApp;
swan.createPage = createPage;
swan.createComponent = createComponent;

var uni$1 = uni;

export default uni$1;
export { createApp, createComponent, createPage };
