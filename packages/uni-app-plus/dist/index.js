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
  } = wx.getSystemInfoSync(); // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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

var protocols = {};

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
          console.warn(`app-plus ${methodName}暂不支持${key}`);
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
        console.error(`app-plus 暂不支持${methodName}`);
      }
    }
    return function (arg1, arg2) { // 目前 api 最多两个参数
      let options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      const returnValue = wx[options.name || methodName](arg1, arg2);
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

var providers = {};

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

function requireNativePlugin (pluginName) {
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName)
}

var api = /*#__PURE__*/Object.freeze({
  requireNativePlugin: requireNativePlugin
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

  Object.keys(methods).forEach(methodName => {
    if (!hasOwn(data, methodName)) {
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

function getProperties (props) {
  const properties = {
    vueSlots: { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
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
    }
  };
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
      }
    },
    created () { // 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
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

function triggerLink (mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true
  });
}

function handleLink (event) {
  if (event.detail.$mp) { // vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else { // vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
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

      this.$vm.__call_hook('created');
      this.$vm.__call_hook('onLoad', args); // 开发者一般可能会在 onLoad 时赋值，所以提前到 mount 之前
      this.$vm.$mount();
    },
    onReady () {
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
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

function initVueComponent (mpInstace, VueComponent, extraOptions = {}) {
  if (mpInstace.$vm) {
    return
  }

  const options = Object.assign({
    mpType: 'component',
    mpInstance: mpInstace,
    propsData: mpInstace.properties
  }, extraOptions);
  // 初始化 vue 实例
  mpInstace.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  const vueSlots = mpInstace.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    const $slots = Object.create(null);
    vueSlots.forEach(slotName => {
      $slots[slotName] = true;
    });
    mpInstace.$vm.$scopedSlots = mpInstace.$vm.$slots = $slots;
  }
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
        triggerLink(this); // 处理 parent,children

        // 初始化渲染数据(需要等 parent，inject 都初始化完成，否则可以放到 attached 里边初始化渲染)
        this.$vm.__call_hook('created');
        this.$vm.$mount();
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
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize (size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
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
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, wx[name]))
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

  Object.keys(wx).forEach(name => {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;

export default uni$1;
export { createApp, createPage, createComponent };
