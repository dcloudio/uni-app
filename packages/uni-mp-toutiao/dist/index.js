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

const SYNC_API_RE = /hideKeyboard|upx2px|canIUse|^create|Sync$|Manager$/;

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
  if (isSyncApi(name)) {
    return false
  }
  if (isCallbackApi(name)) {
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
      Promise.prototype.finally = function (callback) {
        const promise = this.constructor;
        return this.then(
          value => promise.resolve(callback()).then(() => value),
          reason => promise.resolve(callback()).then(() => {
            throw reason
          })
        )
      };
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
  } = tt.getSystemInfoSync(); // uni=>tt runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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
const TODOS = [
  'hideKeyboard',
  'onSocketOpen',
  'onSocketError',
  'sendSocketMessage',
  'onSocketMessage',
  'closeSocket',
  'onSocketClose',
  'getImageInfo',
  'getBackgroundAudioManager',
  'createVideoContext',
  'createCameraContext',
  'createLivePlayerContext',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'getFileInfo',
  'openDocument',
  'chooseLocation',
  'createMapContext',
  'canIUse',
  'onMemoryWarning',
  'onGyroscopeChange',
  'startGyroscope',
  'stopGyroscope',
  'setScreenBrightness',
  'getScreenBrightness',
  'onUserCaptureScreen',
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
  'createIntersectionObserver',
  'chooseInvoiceTitle',
  'navigateToMiniProgram',
  'navigateBackMiniProgram',
  'addTemplate',
  'deleteTemplate',
  'getTemplateLibraryById',
  'getTemplateLibraryList',
  'getTemplateList',
  'sendTemplateMessage',
  'setEnableDebug',
  'getExtConfig',
  'getExtConfigSync',
  'onWindowResize',
  'offWindowResize'
];

// 需要做转换的 API 列表
const protocols = {
  chooseImage: {
    args: {
      sizeType: false
    }
  },
  previewImage: {
    args: {
      indicator: false,
      loop: false
    }
  },
  connectSocket: {
    args: {
      method: false
    }
  },
  chooseVideo: {
    args: {
      maxDuration: false
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  showToast: {
    args: {
      image: false,
      mask: false
    }
  },
  showLoading: {
    args: {
      mask: false
    }
  },
  showModal: {
    args: {
      cancelColor: false,
      confirmColor: false
    }
  },
  showActionSheet: {
    args: {
      itemColor: false
    }
  },
  login: {
    args: {
      scopes: false,
      timeout: false
    }
  },
  getUserInfo: {
    args: {
      lang: false,
      timeout: false
    }
  },
  requestPayment: {
    orderInfo: 'data'
  }
};

TODOS.forEach(todoApi => {
  protocols[todoApi] = false;
});

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
          console.warn(`头条小程序 ${methodName}暂不支持${key}`);
        } else if (isStr(keyOption)) { // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) { // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.includes(key)) {
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
        console.error(`头条小程序 暂不支持${methodName}`);
      }
    }
    return function (arg1, arg2) { // 目前 api 最多两个参数
      let options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      const returnValue = tt[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) { // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName))
      }
      return returnValue
    }
  }
  return method
}

const todoApis = Object.create(null);

const TODOS$1 = [
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

TODOS$1.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['toutiao'],
  share: ['toutiao'],
  payment: ['toutiao'],
  push: ['toutiao']
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



var api = /*#__PURE__*/Object.freeze({

});

const MOCKS = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function initMocks (vm) {
  const mpInstance = vm.$mp[vm.mpType];
  MOCKS.forEach(mock => {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks (mpOptions, hooks, delay = false) {
  hooks.forEach(hook => {
    mpOptions[hook] = function (args) {
      if (delay) {
        setTimeout(() => this.$vm.__call_hook(hook, args));
      } else {
        this.$vm.__call_hook(hook, args);
      }
    };
  });
}

function getData (vueOptions) {
  let data = vueOptions.data || {};
  const methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data();
    } catch (e) {
      console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
    }
  }

  return Object.assign(data, methods)
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver (name) {
  return function observer (newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  }
}

function getProperties (props) {
  const properties = {};
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
        properties[key] = {
          type: PROP_TYPES.includes(opts.type) ? opts.type : null,
          value,
          observer: createObserver(key)
        };
      } else { // content:String
        properties[key] = {
          type: PROP_TYPES.includes(opts) ? opts : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties
}

function wrapper$1 (event) {
  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};
  event.detail = event.detail || {};

  // TODO 又得兼容 mpvue 的 mp 对象
  event.mp = event;
  event.target = Object.assign({}, event.target, event.detail);
  return event
}

function processEventArgs (event, args = [], isCustom) {
  if (isCustom && !args.length) { // 无参数，直接传入 detail 数组
    return event.detail
  }
  const ret = [];
  args.forEach(arg => {
    if (arg === '$event') {
      ret.push(isCustom ? event.detail[0] : event);
    } else {
      ret.push(arg);
    }
  });

  return ret
}

const ONCE = '~';
const CUSTOM = '^';

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

    if (eventsArray && eventType === type) {
      eventsArray.forEach(eventArray => {
        const handler = this.$vm[eventArray[0]];
        if (!isFn(handler)) {
          throw new Error(` _vm.${eventArray[0]} is not a function`)
        }
        if (isOnce) {
          if (handler.once) {
            return
          }
          handler.once = true;
        }
        handler.apply(this.$vm, processEventArgs(event, eventArray[1], isCustom));
      });
    }
  });
}

function handleLink (event) {
  event.detail.$parent = this.$vm;
}

function initRefs (vm) {
  const mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = Object.create(null);
      const components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(component => {
        const ref = component.dataset.ref;
        $refs[ref] = component.$vm;
      });
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(component => {
        const ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm);
      });
      return $refs
    }
  });
}

function initChildren (vm) {
  const mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$children', {
    get () {
      const $children = [];
      const components = mpInstance.selectAllComponents('.vue-com');
      components.forEach(component => {
        $children.push(component.$vm);
      });
      return $children
    }
  });
}

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound'
];

function createApp (vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
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
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this);
        initChildren(this);
      }
    }
  });

  const appOptions = {
    onLaunch (args) {
      this.$vm = new Vue(Object.assign(vueOptions, {
        mpType: 'app',
        mpInstance: this
      }));

      this.$vm.$mount();
      setTimeout(() => this.$vm.__call_hook('onLaunch', args));
    }
  };

  initHooks(appOptions, hooks, true); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vueOptions
}

const hooks$1 = [
  'onShow',
  'onHide',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
  'onBackPress',
  'onNavigationBarButtonTap',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked'
];

function createPage (vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  const pageOptions = {
    data: getData(vueOptions),
    onLoad (args) {

      this.$vm = new Vue(Object.assign(vueOptions, {
        mpType: 'page',
        mpInstance: this
      }));

      this.$vm.$mount();
      this.$vm.__call_hook('onLoad', args);
    },
    onReady () {
      this.$vm._isMounted = true;
      this.$vm.__call_hook('onReady');
    },
    onUnload () {
      this.$vm.__call_hook('onUnload');
      {
        this.$vm.$destroy();
      }
    },
    __e: handleEvent,
    __l: handleLink
  };

  initHooks(pageOptions, hooks$1);

  return Page(pageOptions)
}

function initVueComponent (mpInstace, VueComponent) {
  if (mpInstace.$vm) {
    return
  }

  const options = {
    mpType: 'component',
    mpInstance: mpInstace,
    propsData: mpInstace.properties
  };
  // 初始化 vue 实例
  mpInstace.$vm = new VueComponent(options);

  // 初始化渲染数据
  mpInstace.$vm.$mount();
}

function createComponent (vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  const properties = getProperties(vueOptions.props);

  const VueComponent = Vue.extend(vueOptions);

  const componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: getData(vueOptions),
    properties,
    lifetimes: {
      attached () {
        initVueComponent(this, VueComponent);
      },
      ready () {
        initVueComponent(this, VueComponent); // 目前发现部分情况小程序 attached 不触发

        {
          this.triggerEvent('__l', this.$vm); // TODO 百度仅能传递 json 对象
        }

        const eventId = this.dataset.eventId;
        if (eventId) {
          const listeners = this.$vm.$parent.$mp.listeners;
          if (listeners) {
            const listenerOpts = listeners[eventId];
            Object.keys(listenerOpts).forEach(eventType => {
              listenerOpts[eventType].forEach(handler => {
                this.$vm[handler.once ? '$once' : '$on'](eventType, handler);
              });
            });
          }
        }

        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached () {
        this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show (args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide () {
        this.$vm.__call_hook('onPageHide');
      },
      resize (size) {
        this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __e: handleEvent,
      __l: handleLink
    }
  };

  return Component(componentOptions)
}

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
      if (extraApi[name]) {
        return promisify(name, extraApi[name])
      }
      if (todoApis[name]) {
        return promisify(name, todoApis[name])
      }
      if (!hasOwn(tt, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, tt[name]))
    }
  });
} else {
  uni.upx2px = upx2px;

  Object.keys(todoApis).forEach(name => {
    uni[name] = promisify(name, todoApis[name]);
  });

  Object.keys(extraApi).forEach(name => {
    uni[name] = promisify(name, todoApis[name]);
  });

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(tt).forEach(name => {
    if (hasOwn(tt, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, tt[name]));
    }
  });
}

var uni$1 = uni;

export default uni$1;
export { createApp, createPage, createComponent };
