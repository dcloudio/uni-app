import { isArray, hasOwn, isString, isPlainObject, isObject, capitalize, toRawType, makeMap, isPromise, isFunction, extend } from '@vue/shared';
import { injectHook } from 'vue';

//App
const ON_LAUNCH = 'onLaunch';

const eventChannels = {};
const eventChannelStack = [];
let id = 0;
function initEventChannel(events, cache = true) {
    id++;
    const eventChannel = new my.EventChannel(id, events);
    if (cache) {
        eventChannels[id] = eventChannel;
        eventChannelStack.push(eventChannel);
    }
    return eventChannel;
}
function getEventChannel(id) {
    if (id) {
        const eventChannel = eventChannels[id];
        delete eventChannels[id];
        return eventChannel;
    }
    return eventChannelStack.shift();
}
const navigateTo = {
    args(fromArgs) {
        const id = initEventChannel(fromArgs.events).id;
        if (fromArgs.url) {
            fromArgs.url =
                fromArgs.url +
                    (fromArgs.url.indexOf('?') === -1 ? '?' : '&') +
                    '__id__=' +
                    id;
        }
    },
    returnValue(fromRes) {
        fromRes.eventChannel = getEventChannel();
    },
};

my.appLaunchHooks = [];
function onAppLaunch(hook) {
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
        return injectHook(ON_LAUNCH, hook, app.$vm.$);
    }
    my.appLaunchHooks.push(hook);
}

function getBaseSystemInfo() {
  return my.getSystemInfoSync()
}

function validateProtocolFail(name, msg) {
    console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
    if (!onFail) {
        onFail = validateProtocolFail;
    }
    for (const key in protocol) {
        const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
        if (isString(errMsg)) {
            onFail(name, errMsg);
        }
    }
}
function validateProtocols(name, args, protocol, onFail) {
    if (!protocol) {
        return;
    }
    if (!isArray(protocol)) {
        return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
    }
    const len = protocol.length;
    const argsLen = args.length;
    for (let i = 0; i < len; i++) {
        const opts = protocol[i];
        const data = Object.create(null);
        if (argsLen > i) {
            data[opts.name] = args[i];
        }
        validateProtocol(name, data, { [opts.name]: opts }, onFail);
    }
}
function validateProp(name, value, prop, isAbsent) {
    if (!isPlainObject(prop)) {
        prop = { type: prop };
    }
    const { type, required, validator } = prop;
    // required!
    if (required && isAbsent) {
        return 'Missing required args: "' + name + '"';
    }
    // missing but optional
    if (value == null && !required) {
        return;
    }
    // type check
    if (type != null) {
        let isValid = false;
        const types = isArray(type) ? type : [type];
        const expectedTypes = [];
        // value is valid as long as one of the specified types match
        for (let i = 0; i < types.length && !isValid; i++) {
            const { valid, expectedType } = assertType(value, types[i]);
            expectedTypes.push(expectedType || '');
            isValid = valid;
        }
        if (!isValid) {
            return getInvalidTypeMessage(name, value, expectedTypes);
        }
    }
    // custom validator
    if (validator) {
        return validator(value);
    }
}
const isSimpleType = /*#__PURE__*/ makeMap('String,Number,Boolean,Function,Symbol');
function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    }
    else if (expectedType === 'Object') {
        valid = isObject(value);
    }
    else if (expectedType === 'Array') {
        valid = isArray(value);
    }
    else {
        {
            valid = value instanceof type;
        }
    }
    return {
        valid,
        expectedType,
    };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid args: type check failed for args "${name}".` +
        ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`;
    }
    return message;
}
function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}
function styleValue(value, type) {
    if (type === 'String') {
        return `"${value}"`;
    }
    else if (type === 'Number') {
        return `${Number(value)}`;
    }
    else {
        return `${value}`;
    }
}
function isExplicable(type) {
    const explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === 'boolean');
}

const HOOK_SUCCESS = 'success';
const HOOK_FAIL = 'fail';
const HOOK_COMPLETE = 'complete';
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
    return function (data) {
        return hook(data) || data;
    };
}
function queue(hooks, data) {
    let promise = false;
    for (let i = 0; i < hooks.length; i++) {
        const hook = hooks[i];
        if (promise) {
            promise = Promise.resolve(wrapperHook(hook));
        }
        else {
            const res = hook(data);
            if (isPromise(res)) {
                promise = Promise.resolve(res);
            }
            if (res === false) {
                return {
                    then() { },
                    catch() { },
                };
            }
        }
    }
    return (promise || {
        then(callback) {
            return callback(data);
        },
        catch() { },
    });
}
function wrapperOptions(interceptors, options = {}) {
    [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
        const hooks = interceptors[name];
        if (!isArray(hooks)) {
            return;
        }
        const oldCallback = options[name];
        options[name] = function callbackInterceptor(res) {
            queue(hooks, res).then((res) => {
                return (isFunction(oldCallback) && oldCallback(res)) || res;
            });
        };
    });
    return options;
}
function wrapperReturnValue(method, returnValue) {
    const returnValueHooks = [];
    if (isArray(globalInterceptors.returnValue)) {
        returnValueHooks.push(...globalInterceptors.returnValue);
    }
    const interceptor = scopedInterceptors[method];
    if (interceptor && isArray(interceptor.returnValue)) {
        returnValueHooks.push(...interceptor.returnValue);
    }
    returnValueHooks.forEach((hook) => {
        returnValue = hook(returnValue) || returnValue;
    });
    return returnValue;
}
function getApiInterceptorHooks(method) {
    const interceptor = Object.create(null);
    Object.keys(globalInterceptors).forEach((hook) => {
        if (hook !== 'returnValue') {
            interceptor[hook] = globalInterceptors[hook].slice();
        }
    });
    const scopedInterceptor = scopedInterceptors[method];
    if (scopedInterceptor) {
        Object.keys(scopedInterceptor).forEach((hook) => {
            if (hook !== 'returnValue') {
                interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
            }
        });
    }
    return interceptor;
}
function invokeApi(method, api, options, ...params) {
    const interceptor = getApiInterceptorHooks(method);
    if (interceptor && Object.keys(interceptor).length) {
        if (isArray(interceptor.invoke)) {
            const res = queue(interceptor.invoke, options);
            return res.then((options) => {
                return api(wrapperOptions(interceptor, options), ...params);
            });
        }
        else {
            return api(wrapperOptions(interceptor, options), ...params);
        }
    }
    return api(options, ...params);
}

function handlePromise(promise) {
    if (__UNI_FEATURE_PROMISE__) {
        return promise
            .then((data) => {
            return [null, data];
        })
            .catch((err) => [err]);
    }
    return promise;
}

function formatApiArgs(args, options) {
    const params = args[0];
    if (!options ||
        (!isPlainObject(options.formatArgs) && isPlainObject(params))) {
        return;
    }
    const formatArgs = options.formatArgs;
    const keys = Object.keys(formatArgs);
    for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const formatterOrDefaultValue = formatArgs[name];
        if (isFunction(formatterOrDefaultValue)) {
            const errMsg = formatterOrDefaultValue(args[0][name], params);
            if (isString(errMsg)) {
                return errMsg;
            }
        }
        else {
            // defaultValue
            if (!hasOwn(params, name)) {
                params[name] = formatterOrDefaultValue;
            }
        }
    }
}
function beforeInvokeApi(name, args, protocol, options) {
    if ((process.env.NODE_ENV !== 'production')) {
        validateProtocols(name, args, protocol);
    }
    if (options && options.beforeInvoke) {
        const errMsg = options.beforeInvoke(args);
        if (isString(errMsg)) {
            return errMsg;
        }
    }
    const errMsg = formatApiArgs(args, options);
    if (errMsg) {
        return errMsg;
    }
}
function wrapperSyncApi(name, fn, protocol, options) {
    return (...args) => {
        const errMsg = beforeInvokeApi(name, args, protocol, options);
        if (errMsg) {
            throw new Error(errMsg);
        }
        return fn.apply(null, args);
    };
}
function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options);
}

const API_UPX2PX = 'upx2px';
const Upx2pxProtocol = [
    {
        name: 'upx',
        type: [Number, String],
        required: true,
    },
];

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
    const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === 'ios';
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
        checkDeviceWidth();
    }
    number = Number(number);
    if (number === 0) {
        return 0;
    }
    let width = newDeviceWidth || deviceWidth;
    let result = (number / BASE_DEVICE_WIDTH) * width;
    if (result < 0) {
        result = -result;
    }
    result = Math.floor(result + EPS);
    if (result === 0) {
        if (deviceDPR === 1 || !isIOS) {
            result = 1;
        }
        else {
            result = 0.5;
        }
    }
    return number < 0 ? -result : result;
}, Upx2pxProtocol);

const API_ADD_INTERCEPTOR = 'addInterceptor';
const API_REMOVE_INTERCEPTOR = 'removeInterceptor';
const AddInterceptorProtocol = [
    {
        name: 'method',
        type: [String, Object],
        required: true,
    },
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;

function mergeInterceptorHook(interceptors, interceptor) {
    Object.keys(interceptor).forEach((hook) => {
        if (isFunction(interceptor[hook])) {
            interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
        }
    });
}
function removeInterceptorHook(interceptors, interceptor) {
    if (!interceptors || !interceptor) {
        return;
    }
    Object.keys(interceptor).forEach((hook) => {
        if (isFunction(interceptor[hook])) {
            removeHook(interceptors[hook], interceptor[hook]);
        }
    });
}
function mergeHook(parentVal, childVal) {
    const res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
    const res = [];
    for (let i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res;
}
function removeHook(hooks, hook) {
    if (!hooks) {
        return;
    }
    const index = hooks.indexOf(hook);
    if (index !== -1) {
        hooks.splice(index, 1);
    }
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
    if (typeof method === 'string' && isPlainObject(interceptor)) {
        mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
    }
    else if (isPlainObject(method)) {
        mergeInterceptorHook(globalInterceptors, method);
    }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
    if (typeof method === 'string') {
        if (isPlainObject(interceptor)) {
            removeInterceptorHook(scopedInterceptors[method], interceptor);
        }
        else {
            delete scopedInterceptors[method];
        }
    }
    else if (isPlainObject(method)) {
        removeInterceptorHook(globalInterceptors, method);
    }
}, RemoveInterceptorProtocol);
const interceptors = {};

const API_ON = '$on';
const OnProtocol = [
    {
        name: 'event',
        type: String,
        required: true,
    },
    {
        name: 'callback',
        type: Function,
        required: true,
    },
];
const API_ONCE = '$once';
const OnceProtocol = OnProtocol;
const API_OFF = '$off';
const OffProtocol = [
    {
        name: 'event',
        type: [String, Array],
    },
    {
        name: 'callback',
        type: Function,
    },
];
const API_EMIT = '$emit';
const EmitProtocol = [
    {
        name: 'event',
        type: String,
        required: true,
    },
];

const E = function () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
};
E.prototype = {
    on: function (name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx,
        });
        return this;
    },
    once: function (name, callback, ctx) {
        var self = this;
        function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function (name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
    },
    off: function (name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
                if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                    liveEvents.push(evts[i]);
            }
        }
        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
        liveEvents.length ? (e[name] = liveEvents) : delete e[name];
        return this;
    },
};
var Emitter = E;

const emitter = new Emitter();
const $on = defineSyncApi(API_ON, (name, callback) => {
    emitter.on(name, callback);
    return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
    emitter.once(name, callback);
    return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
    if (!name) {
        emitter.e = {};
        return;
    }
    if (!Array.isArray(name))
        name = [name];
    name.forEach((n) => emitter.off(n, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
    emitter.emit(name, ...args);
}, EmitProtocol);

const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
const CONTEXT_API_RE = /^create|Manager$/;
// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection'];
// 同步例外情况
const ASYNC_API = ['createBLEConnection'];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
    return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
    return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
    return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function shouldPromise(name) {
    if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
        return false;
    }
    return true;
}
/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (onfinally) {
        const promise = this.constructor;
        return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
            throw reason;
        }));
    };
}
function promisify(name, api) {
    if (!shouldPromise(name)) {
        return api;
    }
    if (!isFunction(api)) {
        return api;
    }
    return function promiseApi(options = {}) {
        if (isFunction(options.success) ||
            isFunction(options.fail) ||
            isFunction(options.complete)) {
            return wrapperReturnValue(name, invokeApi(name, api, options));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
            invokeApi(name, api, extend({}, options, {
                success: resolve,
                fail: reject,
            }));
        })));
    };
}

const CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function initWrapper(protocols) {
    function processCallback(methodName, method, returnValue) {
        return function (res) {
            return method(processReturnValue(methodName, res, returnValue));
        };
    }
    function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
        if (isPlainObject(fromArgs)) {
            // 一般 api 的参数解析
            const toArgs = (keepFromArgs === true ? fromArgs : {}); // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
            if (isFunction(argsOption)) {
                argsOption = argsOption(fromArgs, toArgs) || {};
            }
            for (const key in fromArgs) {
                if (hasOwn(argsOption, key)) {
                    let keyOption = argsOption[key];
                    if (isFunction(keyOption)) {
                        keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
                    }
                    if (!keyOption) {
                        // 不支持的参数
                        console.warn(`支付宝小程序 ${methodName} 暂不支持 ${key}`);
                    }
                    else if (isString(keyOption)) {
                        // 重写参数 key
                        toArgs[keyOption] = fromArgs[key];
                    }
                    else if (isPlainObject(keyOption)) {
                        // {name:newName,value:value}可重新指定参数 key:value
                        toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
                    }
                }
                else if (CALLBACKS.indexOf(key) !== -1) {
                    const callback = fromArgs[key];
                    if (isFunction(callback)) {
                        toArgs[key] = processCallback(methodName, callback, returnValue);
                    }
                }
                else {
                    if (!keepFromArgs && !hasOwn(toArgs, key)) {
                        toArgs[key] = fromArgs[key];
                    }
                }
            }
            return toArgs;
        }
        else if (isFunction(fromArgs)) {
            fromArgs = processCallback(methodName, fromArgs, returnValue);
        }
        return fromArgs;
    }
    function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
        if (isFunction(protocols.returnValue)) {
            // 处理通用 returnValue
            res = protocols.returnValue(methodName, res);
        }
        return processArgs(methodName, res, returnValue, {}, keepReturnValue);
    }
    return function wrapper(methodName, method) {
        if (!hasOwn(protocols, methodName)) {
            return method;
        }
        const protocol = protocols[methodName];
        if (!protocol) {
            // 暂不支持的 api
            return function () {
                console.error(`支付宝小程序 暂不支持${methodName}`);
            };
        }
        return function (arg1, arg2) {
            // 目前 api 最多两个参数
            let options = protocol;
            if (isFunction(protocol)) {
                options = protocol(arg1);
            }
            arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
            const args = [arg1];
            if (typeof arg2 !== 'undefined') {
                args.push(arg2);
            }
            const returnValue = my[options.name || methodName].apply(my, args);
            if (isSyncApi(methodName)) {
                // 同步 api
                return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
            }
            return returnValue;
        };
    };
}

const getLocale = () => {
    // 优先使用 $locale
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
        return app.$vm.$locale;
    }
    return my.getSystemInfoSync().language || 'zh-Hans';
};
const setLocale = (locale) => {
    const app = getApp();
    if (!app) {
        return false;
    }
    const oldLocale = app.$vm.$locale;
    if (oldLocale !== locale) {
        app.$vm.$locale = locale;
        onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
        return true;
    }
    return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
    if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
        onLocaleChangeCallbacks.push(fn);
    }
};
if (typeof global !== 'undefined') {
    global.getLocale = getLocale;
}

const baseApis = {
    $on,
    $off,
    $once,
    $emit,
    upx2px,
    interceptors,
    addInterceptor,
    removeInterceptor,
    onAppLaunch,
    getLocale,
    setLocale,
    onLocaleChange,
};
function initUni(api, protocols) {
    const wrapper = initWrapper(protocols);
    const UniProxyHandlers = {
        get(target, key) {
            if (hasOwn(target, key)) {
                return target[key];
            }
            if (hasOwn(api, key)) {
                return promisify(key, api[key]);
            }
            if (hasOwn(baseApis, key)) {
                return promisify(key, baseApis[key]);
            }
            // event-api
            // provider-api?
            return promisify(key, wrapper(key, my[key]));
        },
    };
    return new Proxy({}, UniProxyHandlers);
}

function initGetProvider(providers) {
    return function getProvider({ service, success, fail, complete, }) {
        let res;
        if (providers[service]) {
            res = {
                errMsg: 'getProvider:ok',
                service,
                provider: providers[service],
            };
            isFunction(success) && success(res);
        }
        else {
            res = {
                errMsg: 'getProvider:fail:服务[' + service + ']不存在',
            };
            isFunction(fail) && fail(res);
        }
        isFunction(complete) && complete(res);
    };
}

function addSafeAreaInsets(fromRes, toRes) {
    if (fromRes.safeArea) {
        const safeArea = fromRes.safeArea;
        toRes.safeAreaInsets = {
            top: safeArea.top,
            left: safeArea.left,
            right: fromRes.windowWidth - safeArea.right,
            bottom: fromRes.windowHeight - safeArea.bottom,
        };
    }
}

const redirectTo = {};

const getProvider = initGetProvider({
    oauth: ['alipay'],
    share: ['alipay'],
    payment: ['alipay'],
    push: ['alipay'],
});
function setStorageSync(key, data) {
    return my.setStorageSync({
        key,
        data,
    });
}
function getStorageSync(key) {
    const result = my.getStorageSync({
        key,
    });
    // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
    return result.data !== null ? result.data : '';
}
function removeStorageSync(key) {
    return my.removeStorageSync({
        key,
    });
}
function startGyroscope(args) {
    if (hasOwn(args, 'interval')) {
        console.warn('支付宝小程序 startGyroscope暂不支持interval');
    }
    args.success &&
        args.success({
            errMsg: 'startGyroscope:ok',
        });
    args.complete &&
        args.complete({
            errMsg: 'startGyroscope:ok',
        });
}
function createExecCallback(execCallback) {
    return function wrapperExecCallback(res) {
        this.actions.forEach((action, index) => {
            (action._$callbacks || []).forEach((callback) => {
                callback(res[index]);
            });
        });
        if (isFunction(execCallback)) {
            execCallback(res);
        }
    };
}
function addCallback(callback) {
    if (isFunction(callback)) {
        const action = this.actions[this.actions.length - 1];
        if (action) {
            (action._$callbacks || (action._$callbacks = [])).push(callback);
        }
    }
}
function createSelectorQuery() {
    const query = my.createSelectorQuery();
    const oldExec = query.exec;
    const oldScrollOffset = query.scrollOffset;
    const oldBoundingClientRect = query.boundingClientRect;
    query.exec = function exec(callback) {
        return oldExec.call(this, createExecCallback(callback).bind(this));
    };
    query.scrollOffset = function scrollOffset(callback) {
        const ret = oldScrollOffset.call(this);
        addCallback.call(this, callback);
        return ret;
    };
    query.boundingClientRect = function boundingClientRect(callback) {
        const ret = oldBoundingClientRect.call(this);
        addCallback.call(this, callback);
        return ret;
    };
    if (!query.fields) {
        query.fields = function ({ rect, size, scrollOffset }, callback) {
            if (rect || size) {
                this.boundingClientRect();
            }
            if (scrollOffset) {
                this.scrollOffset();
            }
            addCallback.call(this, callback);
            return this;
        };
    }
    if (!query.in) {
        query.in = function () {
            return this;
        };
    }
    return query;
}
function createIntersectionObserver(component, options) {
    if (options && options.observeAll) {
        options.selectAll = options.observeAll;
        delete options.observeAll;
    }
    return my.createIntersectionObserver(options);
}

var shims = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getProvider: getProvider,
    setStorageSync: setStorageSync,
    getStorageSync: getStorageSync,
    removeStorageSync: removeStorageSync,
    startGyroscope: startGyroscope,
    createSelectorQuery: createSelectorQuery,
    createIntersectionObserver: createIntersectionObserver
});

function handleNetworkInfo(fromRes, toRes) {
    const nextworkType = fromRes.networkType;
    switch (nextworkType) {
        case 'NOTREACHABLE':
            toRes.networkType = 'none';
            break;
        case 'WWAN':
            // TODO ?
            toRes.networkType = '3g';
            break;
        default:
            toRes.networkType = fromRes.networkType.toLowerCase();
            break;
    }
}
function handleSystemInfo(fromRes, toRes) {
    addSafeAreaInsets(fromRes, toRes);
    let platform = fromRes.platform ? fromRes.platform.toLowerCase() : 'devtools';
    if (!~['android', 'ios'].indexOf(platform)) {
        platform = 'devtools';
    }
    toRes.platform = platform;
}
function returnValue(methodName, res = {}) {
    // 通用 returnValue 解析
    if (res.error || res.errorMessage) {
        res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`;
        delete res.error;
        delete res.errorMessage;
    }
    else {
        res.errMsg = `${methodName}:ok`;
    }
    return res;
}
const request = {
    name: my.canIUse('request') ? 'request' : 'httpRequest',
    args(fromArgs) {
        const method = fromArgs.method || 'GET';
        if (!fromArgs.header) {
            // 默认增加 header 参数，方便格式化 content-type
            fromArgs.header = {};
        }
        const headers = {
            'content-type': 'application/json',
        };
        Object.keys(fromArgs.header).forEach((key) => {
            headers[key.toLocaleLowerCase()] = fromArgs.header[key];
        });
        return {
            header() {
                return {
                    name: 'headers',
                    value: headers,
                };
            },
            data(data) {
                // 钉钉小程序在content-type为application/json时需上传字符串形式data，使用my.dd在真机运行钉钉小程序时不能正确判断
                if (my.canIUse('saveFileToDingTalk') &&
                    method.toUpperCase() === 'POST' &&
                    headers['content-type'].indexOf('application/json') === 0 &&
                    isPlainObject(data)) {
                    return {
                        name: 'data',
                        value: JSON.stringify(data),
                    };
                }
                return {
                    name: 'data',
                    value: data,
                };
            },
            method: 'method',
            responseType: false,
        };
    },
    returnValue: {
        status: 'statusCode',
        headers: 'header',
    },
};
const setNavigationBarColor = {
    name: 'setNavigationBar',
    args: {
        frontColor: false,
        animation: false,
    },
};
const setNavigationBarTitle = {
    name: 'setNavigationBar',
};
function showModal({ showCancel = true } = {}) {
    if (showCancel) {
        return {
            name: 'confirm',
            args: {
                cancelColor: false,
                confirmColor: false,
                cancelText: 'cancelButtonText',
                confirmText: 'confirmButtonText',
            },
            returnValue(fromRes, toRes) {
                toRes.confirm = fromRes.confirm;
                toRes.cancel = !fromRes.confirm;
            },
        };
    }
    return {
        name: 'alert',
        args: {
            confirmColor: false,
            confirmText: 'buttonText',
        },
        returnValue(fromRes, toRes) {
            toRes.confirm = true;
            toRes.cancel = false;
        },
    };
}
function showToast({ icon = 'success' } = {}) {
    const args = {
        title: 'content',
        icon: 'type',
        duration: false,
        image: false,
        mask: false,
    };
    if (icon === 'loading') {
        return {
            name: 'showLoading',
            args,
        };
    }
    return {
        name: 'showToast',
        args,
    };
}
const showActionSheet = {
    name: 'showActionSheet',
    args: {
        itemList: 'items',
        itemColor: false,
    },
    returnValue: {
        index: 'tapIndex',
    },
};
const showLoading = {
    args: {
        title: 'content',
        mask: false,
    },
};
const uploadFile = {
    args: {
        name: 'fileName',
    },
    // 从测试结果看，是有返回对象的，文档上没有说明。
};
const downloadFile = {
    returnValue: {
        apFilePath: 'tempFilePath',
    },
};
const getFileInfo = {
    args: {
        filePath: 'apFilePath',
    },
};
const compressImage = {
    args(fromArgs, toArgs) {
        toArgs.compressLevel = 4;
        if (fromArgs && fromArgs.quality) {
            toArgs.compressLevel = Math.floor(fromArgs.quality / 26);
        }
        if (fromArgs.src) {
            toArgs.apFilePaths = [fromArgs.src];
        }
    },
    returnValue(fromRes, toRes) {
        const apFilePaths = fromRes.apFilePaths;
        if (apFilePaths && apFilePaths.length) {
            toRes.tempFilePath = apFilePaths[0];
        }
    },
};
const chooseVideo = {
    // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
    returnValue: {
        apFilePath: 'tempFilePath',
    },
};
const connectSocket = {
    args: {
        method: false,
        protocols: false,
    },
    // TODO 有没有返回值还需要测试下
};
const chooseImage = {
    returnValue(result) {
        var _a, _b;
        const hasTempFilePaths = hasOwn(result, 'tempFilePaths') && result.tempFilePaths;
        if (hasOwn(result, 'apFilePaths') && !hasTempFilePaths) {
            result.tempFilePaths = [];
            (_a = result.apFilePaths) === null || _a === void 0 ? void 0 : _a.forEach((apFilePath) => { var _a; return (_a = result.tempFilePaths) === null || _a === void 0 ? void 0 : _a.push(apFilePath); });
        }
        if (!hasOwn(result, 'tempFiles') && hasTempFilePaths) {
            result.tempFiles = [];
            (_b = result.tempFilePaths) === null || _b === void 0 ? void 0 : _b.forEach((tempFilePath) => { var _a; return (_a = result.tempFiles) === null || _a === void 0 ? void 0 : _a.push({ path: tempFilePath }); });
        }
        return {};
    },
};
const previewImage = {
    args(fromArgs, toArgs) {
        // 支付宝小程序的 current 是索引值，而非图片地址。
        const currentIndex = Number(fromArgs.current);
        if (isNaN(currentIndex)) {
            if (fromArgs.current && isArray(fromArgs.urls)) {
                const index = fromArgs.urls.indexOf(fromArgs.current);
                toArgs.current = ~index ? index : 0;
            }
        }
        else {
            toArgs.current = currentIndex;
        }
        return {
            indicator: false,
            loop: false,
        };
    },
};
const saveFile = {
    args: {
        tempFilePath: 'apFilePath',
    },
    returnValue: {
        apFilePath: 'savedFilePath',
    },
};
const getSavedFileInfo = {
    args: {
        filePath: 'apFilePath',
    },
};
const getSavedFileList = {
    returnValue(fromRes, toRes) {
        toRes.fileList = fromRes.fileList.map((file) => {
            return {
                filePath: file.apFilePath,
                createTime: file.createTime,
                size: file.size,
            };
        });
    },
};
const removeSavedFile = {
    args: {
        filePath: 'apFilePath',
    },
};
const getLocation = {
    args: {
        type: false,
        altitude: false,
    },
};
const openLocation = {
    args: {
    // TODO address 参数在阿里上是必传的
    },
};
const getNetworkType = {
    returnValue: handleNetworkInfo,
};
const onNetworkStatusChange = {
    returnValue: handleNetworkInfo,
};
const stopAccelerometer = {
    name: 'offAccelerometerChange',
};
const stopCompass = {
    name: 'offCompassChange',
};
const scanCode = {
    name: 'scan',
    args: {
        onlyFromCamera: 'hideAlbum',
    },
    returnValue: {
        code: 'result',
    },
};
const setClipboardData = {
    name: 'setClipboard',
    args: {
        data: 'text',
    },
};
const getClipboardData = {
    name: 'getClipboard',
    returnValue: {
        text: 'data',
    },
};
const pageScrollTo = {
    args: {
        duration: false,
    },
};
const login = {
    name: 'getAuthCode',
    returnValue: {
        authCode: 'code',
    },
};
const getUserInfo = {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue(fromRes, toRes) {
        if (my.canIUse('getOpenUserInfo')) {
            let response;
            try {
                response = JSON.parse(fromRes.response).response;
            }
            catch (e) { }
            if (response) {
                toRes.userInfo = response;
                toRes.userInfo.avatarUrl = response.avatar;
                delete response.avatar;
            }
        }
        else {
            toRes.userInfo = {
                openId: '',
                nickName: fromRes.nickName,
                avatarUrl: fromRes.avatar,
            };
        }
    },
};
const requestPayment = {
    name: 'tradePay',
    args: {
        orderInfo: 'tradeNO',
    },
};
const getBLEDeviceServices = {
    returnValue(fromRes, toRes) {
        toRes.services = fromRes.services.map((item) => {
            return {
                uuid: item.serviceId,
                isPrimary: item.isPrimary,
            };
        });
    },
};
const createBLEConnection = {
    name: 'connectBLEDevice',
    args: {
        timeout: false,
    },
};
const closeBLEConnection = {
    name: 'disconnectBLEDevice',
};
const onBLEConnectionStateChange = {
    name: 'onBLEConnectionStateChanged',
};
const makePhoneCall = {
    args: {
        phoneNumber: 'number',
    },
};
const stopGyroscope = {
    name: 'offGyroscopeChange',
};
const getSystemInfo = {
    returnValue: handleSystemInfo,
};
const getSystemInfoSync = {
    returnValue: handleSystemInfo,
};
// 文档没提到，但是实测可用。
const canvasToTempFilePath = {
    returnValue(fromRes, toRes) {
        // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
        toRes.tempFilePath = fromRes.apFilePath;
    },
};
const setScreenBrightness = {
    args: {
        value: 'brightness',
    },
};
const getScreenBrightness = {
    returnValue: {
        brightness: 'value',
    },
};
const showShareMenu = {
    name: 'showSharePanel',
};
const hideHomeButton = {
    name: 'hideBackHome',
};
const saveImageToPhotosAlbum = {
    name: 'saveImage',
    args: {
        filePath: 'url',
    },
};
const saveVideoToPhotosAlbum = {
    args: {
        filePath: 'src',
    },
};
const chooseAddress = {
    name: 'getAddress',
    returnValue(fromRes, toRes) {
        const info = fromRes.result || {};
        toRes.userName = info.fullname;
        toRes.countyName = info.country;
        toRes.provinceName = info.prov;
        toRes.cityName = info.city;
        toRes.detailInfo = info.address;
        toRes.telNumber = info.mobilePhone;
        toRes.errMsg = toRes.errMsg + ' ' + fromRes.resultStatus;
    },
};

var protocols = /*#__PURE__*/Object.freeze({
    __proto__: null,
    returnValue: returnValue,
    request: request,
    setNavigationBarColor: setNavigationBarColor,
    setNavigationBarTitle: setNavigationBarTitle,
    showModal: showModal,
    showToast: showToast,
    showActionSheet: showActionSheet,
    showLoading: showLoading,
    uploadFile: uploadFile,
    downloadFile: downloadFile,
    getFileInfo: getFileInfo,
    compressImage: compressImage,
    chooseVideo: chooseVideo,
    connectSocket: connectSocket,
    chooseImage: chooseImage,
    previewImage: previewImage,
    saveFile: saveFile,
    getSavedFileInfo: getSavedFileInfo,
    getSavedFileList: getSavedFileList,
    removeSavedFile: removeSavedFile,
    getLocation: getLocation,
    openLocation: openLocation,
    getNetworkType: getNetworkType,
    onNetworkStatusChange: onNetworkStatusChange,
    stopAccelerometer: stopAccelerometer,
    stopCompass: stopCompass,
    scanCode: scanCode,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData,
    pageScrollTo: pageScrollTo,
    login: login,
    getUserInfo: getUserInfo,
    requestPayment: requestPayment,
    getBLEDeviceServices: getBLEDeviceServices,
    createBLEConnection: createBLEConnection,
    closeBLEConnection: closeBLEConnection,
    onBLEConnectionStateChange: onBLEConnectionStateChange,
    makePhoneCall: makePhoneCall,
    stopGyroscope: stopGyroscope,
    getSystemInfo: getSystemInfo,
    getSystemInfoSync: getSystemInfoSync,
    canvasToTempFilePath: canvasToTempFilePath,
    setScreenBrightness: setScreenBrightness,
    getScreenBrightness: getScreenBrightness,
    showShareMenu: showShareMenu,
    hideHomeButton: hideHomeButton,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum,
    saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
    chooseAddress: chooseAddress,
    redirectTo: redirectTo,
    navigateTo: navigateTo
});

var index = initUni(shims, protocols);

export { index as default };
