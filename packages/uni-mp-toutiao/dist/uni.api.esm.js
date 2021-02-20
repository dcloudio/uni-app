import { isArray, hasOwn, isObject, capitalize, toRawType, makeMap, isPlainObject, isFunction, isPromise, isString } from '@vue/shared';

function validateProtocolFail(name, msg) {
    const errMsg = `${name}:fail ${msg}`;
    {
        console.error(errMsg);
    }
    return {
        errMsg,
    };
}
function validateProtocol(name, data, protocol) {
    for (const key in protocol) {
        const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
        if (errMsg) {
            return validateProtocolFail(name, errMsg);
        }
    }
}
function validateProtocols(name, args, protocol) {
    if (!protocol) {
        return;
    }
    if (isArray(protocol)) {
        const len = protocol.length;
        const argsLen = args.length;
        for (let i = 0; i < len; i++) {
            const opts = protocol[i];
            const data = Object.create(null);
            if (argsLen > i) {
                data[opts.name] = args[i];
            }
            const errMsg = validateProtocol(name, data, { [opts.name]: opts });
            if (errMsg) {
                return errMsg;
            }
        }
        return;
    }
    return validateProtocol(name, args[0] || Object.create(null), protocol);
}
function validateProp(name, value, prop, isAbsent) {
    const { type, required, validator } = prop;
    // required!
    if (required && isAbsent) {
        return 'Missing required args: "' + name + '"';
    }
    // missing but optional
    if (value == null && !prop.required) {
        return;
    }
    // type check
    if (type != null && type !== true) {
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
    if (validator && !validator(value)) {
        return ('Invalid args: custom validator check failed for args "' + name + '".');
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
function createInvokeCallbackName(name, callbackId) {
    return 'api.' + name + '.' + callbackId;
}
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
function getKeepAliveApiCallback(name, callback) {
    const onName = 'api.' + name.replace('off', 'on');
    for (const key in invokeCallbacks) {
        const item = invokeCallbacks[key];
        if (item.callback === callback && item.name.indexOf(onName) === 0) {
            delete invokeCallbacks[key];
            return Number(key);
        }
    }
    return -1;
}
function createKeepAliveApiCallback(name, callback) {
    if (name.indexOf('off') === 0) {
        return getKeepAliveApiCallback(name, callback);
    }
    const id = invokeCallbackId++;
    return addInvokeCallback(id, createInvokeCallbackName(name, id), callback, true);
}
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
    addInvokeCallback(callbackId, createInvokeCallbackName(name, callbackId), (res) => {
        res = res || {};
        res.errMsg = normalizeErrMsg(res.errMsg, name);
        isFunction(beforeAll) && beforeAll(res);
        if (res.errMsg === name + ':ok') {
            isFunction(beforeSuccess) && beforeSuccess(res);
            hasSuccess && success(res);
        }
        else {
            hasFail && fail(res);
        }
        hasComplete && complete(res);
    });
    return callbackId;
}

function handlePromise(promise) {
    if (__UNI_PROMISE_API__) {
        return promise
            .then((data) => {
            return [null, data];
        })
            .catch((err) => [err]);
    }
    return promise;
}

const API_TYPE_ON = 0;
const API_TYPE_TASK = 1;
const API_TYPE_SYNC = 2;
const API_TYPE_ASYNC = 3;
function formatApiArgs(args, options) {
    return args;
}
function wrapperOnApi(name, fn) {
    return (callback) => fn.apply(null, createKeepAliveApiCallback(name, callback));
}
function wrapperTaskApi(name, fn, options) {
    return (args) => fn.apply(null, [args, createAsyncApiCallback(name, args, options)]);
}
function wrapperSyncApi(fn) {
    return (...args) => fn.apply(null, args);
}
function wrapperAsyncApi(name, fn, options) {
    return (args) => {
        const callbackId = createAsyncApiCallback(name, args, options);
        const res = fn.apply(null, [args, callbackId]);
        if (res) {
            invokeCallback(callbackId, res);
        }
    };
}
function wrapperApi(fn, name, protocol, options) {
    return function (...args) {
        if ((process.env.NODE_ENV !== 'production')) {
            const errMsg = validateProtocols(name, args, protocol);
            if (errMsg) {
                return errMsg;
            }
        }
        return fn.apply(null, formatApiArgs(args));
    };
}
function createSyncApi(name, fn, protocol, options) {
    return createApi(API_TYPE_SYNC, name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options);
}
function createApi(type, name, fn, protocol, options) {
    switch (type) {
        case API_TYPE_ON:
            return wrapperApi(wrapperOnApi(name, fn), name, protocol);
        case API_TYPE_TASK:
            return wrapperApi(wrapperTaskApi(name, fn), name, protocol);
        case API_TYPE_SYNC:
            return wrapperApi(wrapperSyncApi(fn), name, protocol);
        case API_TYPE_ASYNC:
            return wrapperApi(wrapperAsyncApi(name, fn, options), name, protocol);
    }
}

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
    const { platform, pixelRatio, windowWidth } = tt.getSystemInfoSync();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === 'ios';
}
const upx2px = createSyncApi('upx2px', (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
        checkDeviceWidth();
    }
    number = Number(number);
    if (number === 0) {
        return 0;
    }
    let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth);
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

var HOOKS;
(function (HOOKS) {
    HOOKS["INVOKE"] = "invoke";
    HOOKS["SUCCESS"] = "success";
    HOOKS["FAIL"] = "fail";
    HOOKS["COMPLETE"] = "complete";
    HOOKS["RETURN_VALUE"] = "returnValue";
})(HOOKS || (HOOKS = {}));
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
    [HOOKS.SUCCESS, HOOKS.FAIL, HOOKS.COMPLETE].forEach((name) => {
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
const addInterceptor = createSyncApi('addInterceptor', (method, interceptor) => {
    if (typeof method === 'string' && isPlainObject(interceptor)) {
        mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
    }
    else if (isPlainObject(method)) {
        mergeInterceptorHook(globalInterceptors, method);
    }
}, AddInterceptorProtocol);
const removeInterceptor = createSyncApi('removeInterceptor', (method, interceptor) => {
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

const SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
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
            invokeApi(name, api, Object.assign({}, options, {
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
                        console.warn(`字节跳动小程序 ${methodName} 暂不支持 ${key}`);
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
                console.error(`字节跳动小程序 暂不支持${methodName}`);
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
            const returnValue = tt[options.name || methodName].apply(tt, args);
            if (isSyncApi(methodName)) {
                // 同步 api
                return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
            }
            return returnValue;
        };
    };
}

const baseApis = { upx2px, addInterceptor, removeInterceptor };
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
            return promisify(key, wrapper(key, tt[key]));
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
const redirectTo = {};

const getProvider = initGetProvider({
    oauth: ['toutiao'],
    share: ['toutiao'],
    payment: ['toutiao'],
    push: ['toutiao'],
});

var shims = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

const chooseImage = {
    args: {
        sizeType: false,
    },
};
const connectSocket = {
    args: {
        method: false,
    },
};
const chooseVideo = {
    args: {
        camera: false,
    },
};
const scanCode = {
    args: {
        onlyFromCamera: false,
        scanType: false,
    },
};
const startAccelerometer = {
    args: {
        interval: false,
    },
};
const showToast = {
    args: {
        image: false,
        mask: false,
    },
};
const showLoading = {
    args: {
        mask: false,
    },
};
const showModal = {
    args: {
        cancelColor: false,
        confirmColor: false,
    },
};
const showActionSheet = {
    args: {
        itemColor: false,
    },
};
const login = {
    args: {
        scopes: false,
        timeout: false,
    },
};
const getUserInfo = {
    args: {
        lang: false,
        timeout: false,
    },
};
const requestPayment = {
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
        orderInfo: tt.pay ? 'orderInfo' : 'data',
    },
};
const getFileInfo = {
    args: {
        digestAlgorithm: false,
    },
};

var protocols = /*#__PURE__*/Object.freeze({
  __proto__: null,
  chooseImage: chooseImage,
  connectSocket: connectSocket,
  chooseVideo: chooseVideo,
  scanCode: scanCode,
  startAccelerometer: startAccelerometer,
  showToast: showToast,
  showLoading: showLoading,
  showModal: showModal,
  showActionSheet: showActionSheet,
  login: login,
  getUserInfo: getUserInfo,
  requestPayment: requestPayment,
  getFileInfo: getFileInfo,
  redirectTo: redirectTo,
  previewImage: previewImage
});

var index = initUni(shims, protocols);

export default index;
