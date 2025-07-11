import { isArray, hasOwn, isString, isPlainObject, isObject, capitalize, toRawType, makeMap, isFunction, isPromise, extend, remove } from '@vue/shared';
import { normalizeLocale, LOCALE_EN } from '@dcloudio/uni-i18n';
import { injectHook } from 'vue';
import { Emitter, ON_ERROR, onCreateVueApp, invokeCreateVueAppHook } from '@dcloudio/uni-shared';

function getLocaleLanguage() {
    let localeLanguage = '';
    {
        localeLanguage =
            normalizeLocale(xhs.getSystemInfoSync().language) || LOCALE_EN;
    }
    return localeLanguage;
}

function getBaseSystemInfo() {
    return xhs.getSystemInfoSync();
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

function tryCatch(fn) {
    return function () {
        try {
            return fn.apply(fn, arguments);
        }
        catch (e) {
            // TODO
            console.error(e);
        }
    };
}

let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
    invokeCallbacks[id] = {
        name,
        keepAlive,
        callback,
    };
    return id;
}
// onNativeEventReceive((event,data)=>{}) 需要两个参数，目前写死最多两个参数
function invokeCallback(id, res, extras) {
    if (typeof id === 'number') {
        const opts = invokeCallbacks[id];
        if (opts) {
            if (!opts.keepAlive) {
                delete invokeCallbacks[id];
            }
            return opts.callback(res, extras);
        }
    }
    return res;
}
const API_SUCCESS = 'success';
const API_FAIL = 'fail';
const API_COMPLETE = 'complete';
function getApiCallbacks(args) {
    const apiCallbacks = {};
    for (const name in args) {
        const fn = args[name];
        if (isFunction(fn)) {
            apiCallbacks[name] = tryCatch(fn);
            delete args[name];
        }
    }
    return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
    if (!errMsg || errMsg.indexOf(':fail') === -1) {
        return name + ':ok';
    }
    return name + errMsg.substring(errMsg.indexOf(':fail'));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
    if (!isPlainObject(args)) {
        args = {};
    }
    const { success, fail, complete } = getApiCallbacks(args);
    const hasSuccess = isFunction(success);
    const hasFail = isFunction(fail);
    const hasComplete = isFunction(complete);
    const callbackId = invokeCallbackId++;
    addInvokeCallback(callbackId, name, (res) => {
        res = res || {};
        res.errMsg = normalizeErrMsg(res.errMsg, name);
        isFunction(beforeAll) && beforeAll(res);
        if (res.errMsg === name + ':ok') {
            isFunction(beforeSuccess) && beforeSuccess(res, args);
            hasSuccess && success(res);
        }
        else {
            hasFail && fail(res);
        }
        hasComplete && complete(res);
    });
    return callbackId;
}

const HOOK_SUCCESS = 'success';
const HOOK_FAIL = 'fail';
const HOOK_COMPLETE = 'complete';
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
    return function (data) {
        return hook(data, params) || data;
    };
}
function queue(hooks, data, params) {
    let promise = false;
    for (let i = 0; i < hooks.length; i++) {
        const hook = hooks[i];
        if (promise) {
            promise = Promise.resolve(wrapperHook(hook, params));
        }
        else {
            const res = hook(data, params);
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
            queue(hooks, res, options).then((res) => {
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
function invokeApi(method, api, options, params) {
    const interceptor = getApiInterceptorHooks(method);
    if (interceptor && Object.keys(interceptor).length) {
        if (isArray(interceptor.invoke)) {
            const res = queue(interceptor.invoke, options);
            return res.then((options) => {
                // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
                return api(wrapperOptions(getApiInterceptorHooks(method), options), ...params);
            });
        }
        else {
            return api(wrapperOptions(interceptor, options), ...params);
        }
    }
    return api(options, ...params);
}

function hasCallback(args) {
    if (isPlainObject(args) &&
        [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
        return true;
    }
    return false;
}
function handlePromise(promise) {
    // if (__UNI_FEATURE_PROMISE__) {
    //   return promise
    //     .then((data) => {
    //       return [null, data]
    //     })
    //     .catch((err) => [err])
    // }
    return promise;
}
function promisify$1(name, fn) {
    return (args = {}, ...rest) => {
        if (hasCallback(args)) {
            return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
            invokeApi(name, fn, extend({}, args, { success: resolve, fail: reject }), rest);
        })));
    };
}

function formatApiArgs(args, options) {
    args[0];
    {
        return;
    }
}
function invokeSuccess(id, name, res) {
    const result = {
        errMsg: name + ':ok',
    };
    return invokeCallback(id, extend((res || {}), result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
    const errMsgPrefix = name + ':fail';
    let apiErrMsg = '';
    if (!errMsg) {
        apiErrMsg = errMsgPrefix;
    }
    else if (errMsg.indexOf(errMsgPrefix) === 0) {
        apiErrMsg = errMsg;
    }
    else {
        apiErrMsg = errMsgPrefix + ' ' + errMsg;
    }
    {
        delete errRes.errCode;
    }
    let res = extend({ errMsg: apiErrMsg }, errRes);
    return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
    if ((process.env.NODE_ENV !== 'production')) {
        validateProtocols(name, args, protocol);
    }
    const errMsg = formatApiArgs(args);
    if (errMsg) {
        return errMsg;
    }
}
function parseErrMsg(errMsg) {
    if (!errMsg || isString(errMsg)) {
        return errMsg;
    }
    if (errMsg.stack) {
        // 此处同时被鸿蒙arkts和jsvm使用，暂时使用运行时判断鸿蒙jsvm环境，注意此用法仅内部使用
        if ((typeof globalThis === 'undefined' || !globalThis.harmonyChannel)) {
            console.error(errMsg.message + '\n' + errMsg.stack);
        }
        return errMsg.message;
    }
    return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
    return (args) => {
        const id = createAsyncApiCallback(name, args, options);
        const errMsg = beforeInvokeApi(name, [args], protocol);
        if (errMsg) {
            return invokeFail(id, name, errMsg);
        }
        return fn(args, {
            resolve: (res) => invokeSuccess(id, name, res),
            reject: (errMsg, errRes) => invokeFail(id, name, parseErrMsg(errMsg), errRes),
        });
    };
}
function wrapperSyncApi(name, fn, protocol, options) {
    return (...args) => {
        const errMsg = beforeInvokeApi(name, args, protocol);
        if (errMsg) {
            throw new Error(errMsg);
        }
        return fn.apply(null, args);
    };
}
function wrapperAsyncApi(name, fn, protocol, options) {
    return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined);
}
function defineAsyncApi(name, fn, protocol, options) {
    return promisify$1(name, wrapperAsyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
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
    let windowWidth, pixelRatio, platform;
    {
        const { windowWidth: w, pixelRatio: p, platform: pf } = getBaseSystemInfo();
        windowWidth = w;
        pixelRatio = p;
        platform = pf;
    }
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

function __f__(type, filename, ...args) {
    if (filename) {
        args.push(filename);
    }
    console[type].apply(console, args);
}

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
    Object.keys(interceptor).forEach((name) => {
        const hooks = interceptors[name];
        const hook = interceptor[name];
        if (isArray(hooks) && isFunction(hook)) {
            remove(hooks, hook);
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
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
    if (isString(method) && isPlainObject(interceptor)) {
        mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
    }
    else if (isPlainObject(method)) {
        mergeInterceptorHook(globalInterceptors, method);
    }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
    if (isString(method)) {
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
        type: [Function, Number],
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

class EventBus {
    constructor() {
        this.$emitter = new Emitter();
    }
    on(name, callback) {
        return this.$emitter.on(name, callback);
    }
    once(name, callback) {
        return this.$emitter.once(name, callback);
    }
    off(name, callback) {
        if (!name) {
            this.$emitter.e = {};
            return;
        }
        this.$emitter.off(name, callback);
    }
    emit(name, ...args) {
        this.$emitter.emit(name, ...args);
    }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
    eventBus.on(name, callback);
    return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
    eventBus.once(name, callback);
    return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
    // 类型中不再体现 name 支持 string[] 类型, 仅在 uni.$off 保留该逻辑向下兼容
    if (!isArray(name))
        name = name ? [name] : [];
    name.forEach((n) => {
        eventBus.off(n, callback);
    });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
    eventBus.emit(name, ...args);
}, EmitProtocol);

let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
    try {
        return JSON.parse(message);
    }
    catch (e) { }
    return message;
}
/**
 * @private
 * @param args
 */
function invokePushCallback(args) {
    if (args.type === 'enabled') {
        enabled = true;
    }
    else if (args.type === 'clientId') {
        cid = args.cid;
        cidErrMsg = args.errMsg;
        invokeGetPushCidCallbacks(cid, args.errMsg);
    }
    else if (args.type === 'pushMsg') {
        const message = {
            type: 'receive',
            data: normalizePushMessage(args.message),
        };
        for (let i = 0; i < onPushMessageCallbacks.length; i++) {
            const callback = onPushMessageCallbacks[i];
            callback(message);
            // 该消息已被阻止
            if (message.stopped) {
                break;
            }
        }
    }
    else if (args.type === 'click') {
        onPushMessageCallbacks.forEach((callback) => {
            callback({
                type: 'click',
                data: normalizePushMessage(args.message),
            });
        });
    }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
    getPushCidCallbacks.forEach((callback) => {
        callback(cid, errMsg);
    });
    getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = 'getPushClientId';
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve, reject }) => {
    Promise.resolve().then(() => {
        if (typeof enabled === 'undefined') {
            enabled = false;
            cid = '';
            cidErrMsg = 'uniPush is not enabled';
        }
        getPushCidCallbacks.push((cid, errMsg) => {
            if (cid) {
                resolve({ cid });
            }
            else {
                reject(errMsg);
            }
        });
        if (typeof cid !== 'undefined') {
            invokeGetPushCidCallbacks(cid, cidErrMsg);
        }
    });
});
const onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
const onPushMessage = (fn) => {
    if (onPushMessageCallbacks.indexOf(fn) === -1) {
        onPushMessageCallbacks.push(fn);
    }
};
const offPushMessage = (fn) => {
    if (!fn) {
        onPushMessageCallbacks.length = 0;
    }
    else {
        const index = onPushMessageCallbacks.indexOf(fn);
        if (index > -1) {
            onPushMessageCallbacks.splice(index, 1);
        }
    }
};

const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection'];
const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket'];
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
function isTaskApi(name) {
    return TASK_APIS.indexOf(name) !== -1;
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
    return function promiseApi(options = {}, ...rest) {
        if (isFunction(options.success) ||
            isFunction(options.fail) ||
            isFunction(options.complete)) {
            return wrapperReturnValue(name, invokeApi(name, api, extend({}, options), rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
            invokeApi(name, api, extend({}, options, {
                success: resolve,
                fail: reject,
            }), rest);
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
                        console.warn(`小红书小程序 ${methodName} 暂不支持 ${key}`);
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
            if (isFunction(argsOption)) {
                argsOption(fromArgs, {});
            }
            fromArgs = processCallback(methodName, fromArgs, returnValue);
        }
        return fromArgs;
    }
    function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
        if (isFunction(protocols.returnValue)) {
            // 处理通用 returnValue
            res = protocols.returnValue(methodName, res);
        }
        const realKeepReturnValue = keepReturnValue || (false);
        return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
    }
    return function wrapper(methodName, method) {
        /**
         * 注意：
         * - 此处method为原始全局对象上的uni方法名对应的属性值，比如method值可能为my.login，即undefined
         * - uni.env并非方法，但是也会被传入wrapper
         * - 开发者自定义的方法属性也会进入此方法，此时method为undefined，应返回undefined
         */
        const hasProtocol = hasOwn(protocols, methodName);
        if (!hasProtocol && typeof xhs[methodName] !== 'function') {
            return method;
        }
        const needWrapper = hasProtocol ||
            isFunction(protocols.returnValue) ||
            isContextApi(methodName) ||
            isTaskApi(methodName);
        const hasMethod = hasProtocol || isFunction(method);
        if (!hasProtocol && !method) {
            // 暂不支持的 api
            return function () {
                console.error(`小红书小程序 暂不支持${methodName}`);
            };
        }
        if (!needWrapper || !hasMethod) {
            return method;
        }
        const protocol = protocols[methodName];
        return function (arg1, arg2) {
            // 目前 api 最多两个参数
            let options = protocol || {};
            if (isFunction(protocol)) {
                options = protocol(arg1);
            }
            arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
            const args = [arg1];
            if (typeof arg2 !== 'undefined') {
                args.push(arg2);
            }
            const returnValue = xhs[options.name || methodName].apply(xhs, args);
            if (isContextApi(methodName) || isTaskApi(methodName)) {
                if (returnValue && !returnValue.__v_skip) {
                    returnValue.__v_skip = true;
                }
            }
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
    const app = isFunction(getApp) && getApp({ allowDefault: true });
    if (app && app.$vm) {
        return app.$vm.$locale;
    }
    return getLocaleLanguage();
};
const setLocale = (locale) => {
    const app = isFunction(getApp) && getApp();
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

const UUID_KEY = '__DC_STAT_UUID';
let deviceId;
function useDeviceId(global = xhs) {
    return function addDeviceId(_, toRes) {
        deviceId = deviceId || global.getStorageSync(UUID_KEY);
        if (!deviceId) {
            deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
            xhs.setStorage({
                key: UUID_KEY,
                data: deviceId,
            });
        }
        toRes.deviceId = deviceId;
    };
}
function addSafeAreaInsets(fromRes, toRes) {
    if (fromRes.safeArea) {
        const safeArea = fromRes.safeArea;
        toRes.safeAreaInsets = {
            top: safeArea.top,
            left: safeArea.left,
            right: fromRes.windowWidth - safeArea.right,
            bottom: fromRes.screenHeight - safeArea.bottom,
        };
    }
}
function getOSInfo(system, platform) {
    let osName = '';
    let osVersion = '';
    if (platform &&
        ("mp-xhs" === 'mp-baidu')) {
        osName = platform;
        osVersion = system;
    }
    else {
        osName = system.split(' ')[0] || platform;
        osVersion = system.split(' ')[1] || '';
    }
    osName = osName.toLowerCase();
    switch (osName) {
        case 'harmony': // alipay
        case 'ohos': // weixin
        case 'openharmony': // feishu
            osName = 'harmonyos';
            break;
        case 'iphone os': // alipay
            osName = 'ios';
            break;
        case 'mac': // weixin qq
        case 'darwin': // feishu
            osName = 'macos';
            break;
        case 'windows_nt': // feishu
            osName = 'windows';
            break;
    }
    return {
        osName,
        osVersion,
    };
}
function populateParameters(fromRes, toRes) {
    const { brand = '', model = '', system = '', language = '', theme, version, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation, } = fromRes;
    // const isQuickApp = "mp-xhs".indexOf('quickapp-webview') !== -1
    // osName osVersion
    const { osName, osVersion } = getOSInfo(system, platform);
    let hostVersion = version;
    // deviceType
    let deviceType = getGetDeviceType(fromRes, model);
    // deviceModel
    let deviceBrand = getDeviceBrand(brand);
    // hostName
    let _hostName = getHostName(fromRes);
    // deviceOrientation
    let _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持
    // devicePixelRatio
    let _devicePixelRatio = pixelRatio;
    // SDKVersion
    let _SDKVersion = SDKVersion;
    // hostLanguage
    const hostLanguage = (language || '').replace(/_/g, '-');
    // wx.getAccountInfoSync
    const parameters = {
        appId: process.env.UNI_APP_ID,
        appName: process.env.UNI_APP_NAME,
        appVersion: process.env.UNI_APP_VERSION_NAME,
        appVersionCode: process.env.UNI_APP_VERSION_CODE,
        appLanguage: getAppLanguage(hostLanguage),
        uniCompileVersion: process.env.UNI_COMPILER_VERSION,
        uniCompilerVersion: process.env.UNI_COMPILER_VERSION,
        uniRuntimeVersion: process.env.UNI_COMPILER_VERSION,
        uniPlatform: process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM,
        deviceBrand,
        deviceModel: model,
        deviceType,
        devicePixelRatio: _devicePixelRatio,
        deviceOrientation: _deviceOrientation,
        osName,
        osVersion,
        hostTheme: theme,
        hostVersion,
        hostLanguage,
        hostName: _hostName,
        hostSDKVersion: _SDKVersion,
        hostFontSizeSetting: fontSizeSetting,
        windowTop: 0,
        windowBottom: 0,
        // TODO
        osLanguage: undefined,
        osTheme: undefined,
        ua: undefined,
        hostPackageName: undefined,
        browserName: undefined,
        browserVersion: undefined,
        isUniAppX: false,
    };
    extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
    // deviceType
    let deviceType = fromRes.deviceType || 'phone';
    {
        const deviceTypeMaps = {
            ipad: 'pad',
            windows: 'pc',
            mac: 'pc',
        };
        const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
        const _model = model.toLowerCase();
        for (let index = 0; index < deviceTypeMapsKeys.length; index++) {
            const _m = deviceTypeMapsKeys[index];
            if (_model.indexOf(_m) !== -1) {
                deviceType = deviceTypeMaps[_m];
                break;
            }
        }
    }
    return deviceType;
}
function getDeviceBrand(brand) {
    // deviceModel
    let deviceBrand = brand;
    if (deviceBrand) {
        deviceBrand = deviceBrand.toLowerCase();
    }
    return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
    return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
    const _platform = "mp-xhs".split('-')[1];
    let _hostName = fromRes.hostName || _platform; // mp-jd
    return _hostName;
}

const getSystemInfo = {
    returnValue: (fromRes, toRes) => {
        addSafeAreaInsets(fromRes, toRes);
        useDeviceId()(fromRes, toRes);
        populateParameters(fromRes, toRes);
    },
};

const getSystemInfoSync = getSystemInfo;

const redirectTo = {};

const previewImage = {
    args(fromArgs, toArgs) {
        let currentIndex = parseInt(fromArgs.current);
        if (isNaN(currentIndex)) {
            return;
        }
        const urls = fromArgs.urls;
        if (!isArray(urls)) {
            return;
        }
        const len = urls.length;
        if (!len) {
            return;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        else if (currentIndex >= len) {
            currentIndex = len - 1;
        }
        if (currentIndex > 0) {
            toArgs.current = urls[currentIndex];
            toArgs.urls = urls.filter((item, index) => index < currentIndex ? item !== urls[currentIndex] : true);
        }
        else {
            toArgs.current = urls[0];
        }
        return {
            indicator: false,
            loop: false,
        };
    },
};

const eventChannels = {};
let id = 0;
function initEventChannel(events, cache = true) {
    id++;
    const eventChannel = new xhs.EventChannel(id, events);
    if (cache) {
        eventChannels[id] = eventChannel;
    }
    return eventChannel;
}
function getEventChannel(id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
}
const navigateTo$1 = () => {
    let eventChannel;
    return {
        args(fromArgs) {
            eventChannel = initEventChannel(fromArgs.events);
            if (fromArgs.url) {
                fromArgs.url =
                    fromArgs.url +
                        (fromArgs.url.indexOf('?') === -1 ? '?' : '&') +
                        '__id__=' +
                        eventChannel.id;
            }
        },
        returnValue(fromRes) {
            fromRes.eventChannel = eventChannel;
        },
    };
};

const onError = {
    args(fromArgs) {
        const app = getApp({ allowDefault: true }) || {};
        if (!app.$vm) {
            if (!xhs.$onErrorHandlers) {
                xhs.$onErrorHandlers = [];
            }
            xhs.$onErrorHandlers.push(fromArgs);
        }
        else {
            injectHook(ON_ERROR, fromArgs, app.$vm.$);
        }
    },
};
const offError = {
    args(fromArgs) {
        const app = getApp({ allowDefault: true }) || {};
        if (!app.$vm) {
            if (!xhs.$onErrorHandlers) {
                return;
            }
            const index = xhs.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
            if (index !== -1) {
                xhs.$onErrorHandlers.splice(index, 1);
            }
        }
        else if (fromArgs.__weh) {
            const onErrors = app.$vm.$[ON_ERROR];
            if (onErrors) {
                const index = onErrors.indexOf(fromArgs.__weh);
                if (index > -1) {
                    onErrors.splice(index, 1);
                }
            }
        }
    },
};

const onSocketOpen = {
    args() {
        if (xhs.__uni_console__) {
            if (xhs.__uni_console_warned__) {
                return;
            }
            xhs.__uni_console_warned__ = true;
            console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
        }
    },
};
const onSocketMessage = onSocketOpen;

const baseApis = {
    $on,
    $off,
    $once,
    $emit,
    upx2px,
    rpx2px: upx2px,
    interceptors,
    addInterceptor,
    removeInterceptor,
    onCreateVueApp,
    invokeCreateVueAppHook,
    getLocale,
    setLocale,
    onLocaleChange,
    getPushClientId,
    onPushMessage,
    offPushMessage,
    invokePushCallback,
    __f__,
};
function initUni(api, protocols, platform = xhs) {
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
            return promisify(key, wrapper(key, platform[key]));
        },
    };
    // 处理 api mp 打包后为不同js，getEventChannel 无法共享问题
    {
        platform.getEventChannel = getEventChannel;
    }
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

const getProvider = initGetProvider({
    oauth: ['xhs'],
    share: ['xhs'],
    payment: ['xhs'],
    push: ['xhs'],
});

var shims = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

const showActionSheet = {
    args(fromArgs, toArgs) {
        if (!fromArgs.itemColor) {
            toArgs.itemColor = '#000000';
        }
    },
};
const navigateTo = navigateTo$1();

var protocols = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfoSync,
  navigateTo: navigateTo,
  offError: offError,
  onError: onError,
  onSocketMessage: onSocketMessage,
  onSocketOpen: onSocketOpen,
  previewImage: previewImage,
  redirectTo: redirectTo,
  showActionSheet: showActionSheet
});

var index = initUni(shims, protocols);

export { index as default };
