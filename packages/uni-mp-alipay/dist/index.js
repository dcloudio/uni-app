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
      return 1
    } else {
      return 0.5
    }
  }
  return number < 0 ? -result : result
}

// 不支持的 API 列表
const todos = [
  'saveImageToPhotosAlbum',
  'getRecorderManager',
  'getBackgroundAudioManager',
  'createInnerAudioContext',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'createVideoContext',
  'createCameraContext',
  'createLivePlayerContext',
  'openDocument',
  'onMemoryWarning',
  'startAccelerometer',
  'startCompass',
  'addPhoneContact',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'createIntersectionObserver',
  'authorize',
  'openSetting',
  'getSetting',
  'chooseAddress',
  'chooseInvoiceTitle',
  'addTemplate',
  'deleteTemplate',
  'getTemplateLibraryById',
  'getTemplateLibraryList',
  'getTemplateList',
  'sendTemplateMessage',
  'getUpdateManager',
  'setEnableDebug',
  'getExtConfig',
  'getExtConfigSync',
  'onWindowResize',
  'offWindowResize'
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
  'hideTabBarRedDot'
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

function _handleSystemInfo (result) {
  let platform = result.platform ? result.platform.toLowerCase() : 'devtools';
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools';
  }
  result.platform = platform;
}

const protocols = { // 需要做转换的 API 列表
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
      if (!fromArgs.header) { // 默认增加 header 参数，方便格式化 content-type
        fromArgs.header = {};
      }
      return {
        header (header = {}, toArgs) {
          const headers = {
            'content-type': 'application/json'
          };
          Object.keys(header).forEach(key => {
            headers[key.toLocaleLowerCase()] = header[key];
          });
          return {
            name: 'headers',
            value: headers
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
  connectSocket: {
    args: {
      method: false,
      protocols: false
    }
    // TODO 有没有返回值还需要测试下
  },
  chooseImage: {
    returnValue: {
      apFilePaths: 'tempFilePaths'
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
    },
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
    args: {
      onlyFromCamera: 'hideAlbum',
      scanType: false
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
  pageScrollTo: {
    args: {
      duration: false
    }
  },
  login: {
    name: 'getAuthCode',
    returnValue (result) {
      result.code = result.authCode;
    }
  },
  getUserInfo: {
    name: 'getAuthUserInfo',
    returnValue (result) {
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
  makePhoneCall: {
    args: {
      phoneNumber: 'number'
    }
  },
  stopGyroscope: {
    name: 'offGyroscopeChange'
  },
  getSystemInfo: {
    returnValue: _handleSystemInfo
  },
  getSystemInfoSync: {
    returnValue: _handleSystemInfo
  },
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
          console.warn(`支付宝小程序 ${methodName}暂不支持${key}`);
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
        console.error(`支付宝小程序 暂不支持${methodName}`);
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
      const returnValue = my[options.name || methodName].apply(my, args);
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
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
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
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

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

var api = /*#__PURE__*/Object.freeze({
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync,
  startGyroscope: startGyroscope
});

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

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    vueOptions = vueOptions.extendOptions;
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

function initVueComponent (Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  let VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
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
      behaviors.push(behavior.replace('uni://', `${"my"}://`));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
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
  const eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn(`事件信息不存在`)
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  const eventType = event.type;
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
          handler.apply(handlerCtx, processEventArgs(
            this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName
          ));
        }
      });
    }
  });
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

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  const appOptions = {
    onLaunch (args) {

      this.$vm = vm;

      this.$vm.$mp = {
        app: this
      };

      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions
}

function findVmByVueId (vm, vuePid) {
  const $children = vm.$children;
  // 优先查找直属
  let parentVm = $children.find(childVm => childVm.$scope._$vueId === vuePid);
  if (parentVm) {
    return parentVm
  }
  // 反向递归查找
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

const mocks$1 = ['$id'];

function initRefs$1 () {

}

function initBehavior$1 ({
  properties
}) {
  const props = {};

  Object.keys(properties).forEach(key => {
    props[key] = properties[key].value;
  });

  return {
    props
  }
}

function initRelation$1 (detail) {
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

function handleRef (ref) {
  if (!ref) {
    return
  }
  const refName = ref.props['data-ref'];
  const refInForName = ref.props['data-ref-in-for'];
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || ref;
  } else if (refInForName) {
    this.$vm.$refs[refInForName] = [ref.$vm || ref];
  }
}

function triggerEvent (type, detail, options) {
  const handler = this.props[customize('on-' + type)];
  if (!handler) {
    return
  }

  const eventOpts = this.props['data-event-opts'];

  const target = {
    dataset: {
      eventOpts
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
    return function handleLink$$1 (detail) {
      return handleLink.call(this, {
        detail
      })
    }
  }
  return function handleLink$$1 (detail) {
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

  return parseBaseApp(vm, {
    mocks: mocks$1,
    initRefs: initRefs$1
  })
}

function createApp (vm) {
  App(parseApp(vm));
  return vm
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
  let [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions);

  const pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior$1),
    data: initData(vueOptions, Vue.prototype),
    onLoad (args) {
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

      this.$vm.$mp.query = args; // 兼容 mpvue
      this.$vm.__call_hook('onLoad', args);
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
    __r: handleRef,
    __e: handleEvent,
    __l: handleLink$1
  };

  initHooks(pageOptions, hooks$1);

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
    initRelation$1.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options
    });

    // 初始化 vue 实例
    this.$vm = new VueComponent(options);

    // 触发首次 setData
    this.$vm.$mount();
  } else {
    // 处理父子关系
    initRelation$1.call(this, {
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
  let [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions);

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
    mixins: initBehaviors(vueOptions, initBehavior$1),
    data: initData(vueOptions, Vue.prototype),
    props,
    didMount () {
      initVm.call(this, VueComponent);

      initSpecialMethods(this);

      if (isComponent2) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    },
    didUnmount () {
      this.$vm.$destroy();
    },
    methods: {
      __r: handleRef,
      __e: handleEvent,
      __l: handleLink$1,
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

  return componentOptions
}

function createComponent (vueOptions) {
  {
    return my.defineComponent(parseComponent(vueOptions))
  }
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

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get (target, name) {
      if (name === 'upx2px') {
        return upx2px
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
    }
  });
} else {
  uni.upx2px = upx2px;

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

var uni$1 = uni;

export default uni$1;
export { createApp, createPage, createComponent };
