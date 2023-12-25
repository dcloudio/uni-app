import { isArray, hasOwn as hasOwn$1, isString, isPlainObject, isObject as isObject$1, toRawType, capitalize, makeMap, isFunction, isPromise, extend, remove, toTypeString } from '@vue/shared';
import { LINEFEED, parseNVueDataset, once, I18N_JSON_DELIMITERS, Emitter, normalizeStyles, addLeadingSlash, resolveComponentInstance, invokeArrayFns, removeLeadingSlash, ON_RESIZE, ON_APP_ENTER_FOREGROUND, ON_APP_ENTER_BACKGROUND, ON_SHOW, ON_HIDE, ON_PAGE_SCROLL, ON_REACH_BOTTOM, SCHEME_RE, DATA_RE, cacheStringFunction, formatLog, parseQuery, ON_ERROR, callOptions, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, PRIMARY_COLOR, getLen, ON_THEME_CHANGE, TABBAR_HEIGHT, NAVBAR_HEIGHT, sortObject, OFF_THEME_CHANGE, ON_KEYBOARD_HEIGHT_CHANGE, normalizeTabBarStyles, ON_NAVIGATION_BAR_BUTTON_TAP, stringifyQuery as stringifyQuery$1, debounce, ON_PULL_DOWN_REFRESH, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, ON_BACK_PRESS, UniNode, NODE_TYPE_PAGE, ACTION_TYPE_PAGE_CREATE, ACTION_TYPE_PAGE_CREATED, ACTION_TYPE_PAGE_SCROLL, ACTION_TYPE_INSERT, ACTION_TYPE_CREATE, ACTION_TYPE_REMOVE, ACTION_TYPE_ADD_EVENT, ACTION_TYPE_ADD_WXS_EVENT, ACTION_TYPE_REMOVE_EVENT, ACTION_TYPE_SET_ATTRIBUTE, ACTION_TYPE_REMOVE_ATTRIBUTE, ACTION_TYPE_SET_TEXT, ON_READY, ON_UNLOAD, EventChannel, ON_REACH_BOTTOM_DISTANCE, parseUrl, onCreateVueApp, ON_TAB_ITEM_TAP, ON_LAUNCH, ACTION_TYPE_EVENT, createUniEvent, ON_WXS_INVOKE_CALL_METHOD, WEB_INVOKE_APPSERVICE } from '@dcloudio/uni-shared';
import { ref, createVNode, render, injectHook, queuePostFlushCb, getCurrentInstance, onMounted, nextTick, onBeforeUnmount } from 'vue';

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = /*#__PURE__*/ (function () {
  const lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  return lookup
})();

function encode$2(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = '';

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }

  return base64
}

function decode(base64) {
  var bufferLength = base64.length * 0.75,
    len = base64.length,
    i,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;

  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }

  var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return arraybuffer
}

const CHOOSE_SIZE_TYPES = ['original', 'compressed'];
const CHOOSE_SOURCE_TYPES = ['album', 'camera'];
const HTTP_METHODS = [
    'GET',
    'OPTIONS',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'TRACE',
    'CONNECT',
    'PATCH',
];
function elemInArray(str, arr) {
    if (!str || arr.indexOf(str) === -1) {
        return arr[0];
    }
    return str;
}
function elemsInArray(strArr, optionalVal) {
    if (!isArray(strArr) ||
        strArr.length === 0 ||
        strArr.find((val) => optionalVal.indexOf(val) === -1)) {
        return optionalVal;
    }
    return strArr;
}
function validateProtocolFail(name, msg) {
    console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
    if (!onFail) {
        onFail = validateProtocolFail;
    }
    for (const key in protocol) {
        const errMsg = validateProp(key, data[key], protocol[key], !hasOwn$1(data, key));
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
        valid = isObject$1(value);
    }
    else if (expectedType === 'Array') {
        valid = isArray(value);
    }
    else {
        {
            // App平台ArrayBuffer等参数跨实例传输，无法通过 instanceof 识别
            valid = value instanceof type || toRawType(value) === getType(type);
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
function findInvokeCallbackByName(name) {
    for (const key in invokeCallbacks) {
        if (invokeCallbacks[key].name === name) {
            return true;
        }
    }
    return false;
}
function removeKeepAliveApiCallback(name, callback) {
    for (const key in invokeCallbacks) {
        const item = invokeCallbacks[key];
        if (item.callback === callback && item.name === name) {
            delete invokeCallbacks[key];
        }
    }
}
function offKeepAliveApiCallback(name) {
    UniServiceJSBridge.off('api.' + name);
}
function onKeepAliveApiCallback(name) {
    UniServiceJSBridge.on('api.' + name, (res) => {
        for (const key in invokeCallbacks) {
            const opts = invokeCallbacks[key];
            if (opts.name === name) {
                opts.callback(res);
            }
        }
    });
}
function createKeepAliveApiCallback(name, callback) {
    return addInvokeCallback(invokeCallbackId++, name, callback, true);
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
function normalizeErrMsg$1(errMsg, name) {
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
        res.errMsg = normalizeErrMsg$1(res.errMsg, name);
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
    // if (false) {
    //   return promise
    //     .then((data) => {
    //       return [null, data]
    //     })
    //     .catch((err) => [err])
    // }
    return promise;
}
function promisify(name, fn) {
    return (args = {}, ...rest) => {
        if (hasCallback(args)) {
            return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
            invokeApi(name, fn, extend(args, { success: resolve, fail: reject }), rest);
        })));
    };
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
            if (!hasOwn$1(params, name)) {
                params[name] = formatterOrDefaultValue;
            }
        }
    }
}
function invokeSuccess(id, name, res) {
    return invokeCallback(id, extend((res || {}), { errMsg: name + ':ok' }));
}
function invokeFail(id, name, errMsg, errRes) {
    return invokeCallback(id, extend({ errMsg: name + ':fail' + (errMsg ? ' ' + errMsg : '') }, errRes));
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
function checkCallback(callback) {
    if (!isFunction(callback)) {
        throw new Error('Invalid args: type check failed for args "callback". Expected Function');
    }
}
function wrapperOnApi(name, fn, options) {
    return (callback) => {
        checkCallback(callback);
        const errMsg = beforeInvokeApi(name, [callback], undefined, options);
        if (errMsg) {
            throw new Error(errMsg);
        }
        // 是否是首次调用on,如果是首次，需要初始化onMethod监听
        const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
        createKeepAliveApiCallback(name, callback);
        if (isFirstInvokeOnApi) {
            onKeepAliveApiCallback(name);
            fn();
        }
    };
}
function wrapperOffApi(name, fn, options) {
    return (callback) => {
        checkCallback(callback);
        const errMsg = beforeInvokeApi(name, [callback], undefined, options);
        if (errMsg) {
            throw new Error(errMsg);
        }
        name = name.replace('off', 'on');
        removeKeepAliveApiCallback(name, callback);
        // 是否还存在监听，若已不存在，则移除onMethod监听
        const hasInvokeOnApi = findInvokeCallbackByName(name);
        if (!hasInvokeOnApi) {
            offKeepAliveApiCallback(name);
            fn();
        }
    };
}
function normalizeErrMsg(errMsg) {
    if (!errMsg || isString(errMsg)) {
        return errMsg;
    }
    if (errMsg.stack) {
        console.error(errMsg.message + LINEFEED + errMsg.stack);
        return errMsg.message;
    }
    return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
    return (args) => {
        const id = createAsyncApiCallback(name, args, options);
        const errMsg = beforeInvokeApi(name, [args], protocol, options);
        if (errMsg) {
            return invokeFail(id, name, errMsg);
        }
        return fn(args, {
            resolve: (res) => invokeSuccess(id, name, res),
            reject: (errMsg, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg), errRes),
        });
    };
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
function wrapperAsyncApi(name, fn, protocol, options) {
    return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
    return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
    return wrapperOffApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
    return promisify(name, wrapperTaskApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
}
function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options);
}
function defineAsyncApi(name, fn, protocol, options) {
    return promisify(name, wrapperAsyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
}

const API_BASE64_TO_ARRAY_BUFFER = 'base64ToArrayBuffer';
const Base64ToArrayBufferProtocol = [
    {
        name: 'base64',
        type: String,
        required: true,
    },
];
const API_ARRAY_BUFFER_TO_BASE64 = 'arrayBufferToBase64';
const ArrayBufferToBase64Protocol = [
    {
        name: 'arrayBuffer',
        type: [ArrayBuffer, Uint8Array],
        required: true,
    },
];

// @ts-ignore
const base64ToArrayBuffer = defineSyncApi(API_BASE64_TO_ARRAY_BUFFER, (base64) => {
    return decode(base64);
}, Base64ToArrayBufferProtocol);
const arrayBufferToBase64 = defineSyncApi(API_ARRAY_BUFFER_TO_BASE64, (arrayBuffer) => {
    return encode$2(arrayBuffer);
}, ArrayBufferToBase64Protocol);

/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
function getBaseSystemInfo() {
    // @ts-expect-error view 层
    if (typeof __SYSTEM_INFO__ !== 'undefined') {
        return window.__SYSTEM_INFO__;
    }
    // 好像开发时刷新，偶发的 plus.screen.getCurrentSize 为 undefined
    const { resolutionWidth } = plus.screen.getCurrentSize() || {
        resolutionWidth: 0,
    };
    return {
        platform: (plus.os.name || '').toLowerCase(),
        pixelRatio: plus.screen.scale,
        windowWidth: Math.round(resolutionWidth),
    };
}

function requestComponentInfo(pageVm, reqs, callback) {
    if (pageVm.$page.meta.isNVue) {
        requestNVueComponentInfo(pageVm, reqs, callback);
    }
    else {
        requestVueComponentInfo(pageVm, reqs, callback);
    }
}
function requestVueComponentInfo(pageVm, reqs, callback) {
    UniServiceJSBridge.invokeViewMethod('requestComponentInfo', {
        reqs: reqs.map((req) => {
            if (req.component) {
                req.component = req.component.$el.nodeId;
            }
            return req;
        }),
    }, pageVm.$page.id, callback);
}
function requestNVueComponentInfo(pageVm, reqs, callback) {
    const ids = findNVueElementIds(reqs);
    const nvueElementInfos = new Array(ids.length);
    findNVueElementInfos(ids, pageVm.$el, nvueElementInfos);
    findComponentRectAll(pageVm.$requireNativePlugin('dom'), nvueElementInfos, 0, [], (result) => {
        callback(result);
    });
}
function findNVueElementIds(reqs) {
    const ids = [];
    for (let i = 0; i < reqs.length; i++) {
        const selector = reqs[i].selector;
        if (selector.indexOf('#') === 0) {
            ids.push(selector.substring(1));
        }
    }
    return ids;
}
function findNVueElementInfos(ids, elm, infos) {
    const nodes = elm.children;
    if (!isArray(nodes)) {
        return false;
    }
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.attr) {
            const index = ids.indexOf(node.attr.id);
            if (index >= 0) {
                infos[index] = {
                    id: ids[index],
                    ref: node.ref,
                    dataset: parseNVueDataset(node.attr),
                };
                if (ids.length === 1) {
                    break;
                }
            }
        }
        if (node.children) {
            findNVueElementInfos(ids, node, infos);
        }
    }
}
function findComponentRectAll(dom, nvueElementInfos, index, result, callback) {
    const attr = nvueElementInfos[index];
    dom.getComponentRect(attr.ref, (option) => {
        option.size.id = attr.id;
        option.size.dataset = attr.dataset;
        result.push(option.size);
        index += 1;
        if (index < nvueElementInfos.length) {
            findComponentRectAll(dom, nvueElementInfos, index, result, callback);
        }
        else {
            callback(result);
        }
    });
}

function setCurrentPageMeta(page, options) {
    UniServiceJSBridge.invokeViewMethod('setPageMeta', options, page.$page.id);
}

const isObject = (val) => val !== null && typeof val === 'object';
const defaultDelimiters = ['{', '}'];
class BaseFormatter {
    constructor() {
        this._caches = Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
        if (!values) {
            return [message];
        }
        let tokens = this._caches[message];
        if (!tokens) {
            tokens = parse(message, delimiters);
            this._caches[message] = tokens;
        }
        return compile(tokens, values);
    }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = '';
    while (position < format.length) {
        let char = format[position++];
        if (char === startDelimiter) {
            if (text) {
                tokens.push({ type: 'text', value: text });
            }
            text = '';
            let sub = '';
            char = format[position++];
            while (char !== undefined && char !== endDelimiter) {
                sub += char;
                char = format[position++];
            }
            const isClosed = char === endDelimiter;
            const type = RE_TOKEN_LIST_VALUE.test(sub)
                ? 'list'
                : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                    ? 'named'
                    : 'unknown';
            tokens.push({ value: sub, type });
        }
        //  else if (char === '%') {
        //   // when found rails i18n syntax, skip text capture
        //   if (format[position] !== '{') {
        //     text += char
        //   }
        // }
        else {
            text += char;
        }
    }
    text && tokens.push({ type: 'text', value: text });
    return tokens;
}
function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values)
        ? 'list'
        : isObject(values)
            ? 'named'
            : 'unknown';
    if (mode === 'unknown') {
        return compiled;
    }
    while (index < tokens.length) {
        const token = tokens[index];
        switch (token.type) {
            case 'text':
                compiled.push(token.value);
                break;
            case 'list':
                compiled.push(values[parseInt(token.value, 10)]);
                break;
            case 'named':
                if (mode === 'named') {
                    compiled.push(values[token.value]);
                }
                else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                    }
                }
                break;
            case 'unknown':
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`Detect 'unknown' type of token!`);
                }
                break;
        }
        index++;
    }
    return compiled;
}

const LOCALE_ZH_HANS = 'zh-Hans';
const LOCALE_ZH_HANT = 'zh-Hant';
const LOCALE_EN = 'en';
const LOCALE_FR = 'fr';
const LOCALE_ES = 'es';
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, '-');
    if (messages && messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale === 'chinese') {
        // 支付宝
        return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('zh') === 0) {
        if (locale.indexOf('-hans') > -1) {
            return LOCALE_ZH_HANS;
        }
        if (locale.indexOf('-hant') > -1) {
            return LOCALE_ZH_HANT;
        }
        if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
            return LOCALE_ZH_HANT;
        }
        return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages && Object.keys(messages).length > 0) {
        locales = Object.keys(messages);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
        return lang;
    }
}
class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
        this.locale = LOCALE_EN;
        this.fallbackLocale = LOCALE_EN;
        this.message = {};
        this.messages = {};
        this.watchers = [];
        if (fallbackLocale) {
            this.fallbackLocale = fallbackLocale;
        }
        this.formater = formater || defaultFormatter;
        this.messages = messages || {};
        this.setLocale(locale || LOCALE_EN);
        if (watcher) {
            this.watchLocale(watcher);
        }
    }
    setLocale(locale) {
        const oldLocale = this.locale;
        this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
        if (!this.messages[this.locale]) {
            // 可能初始化时不存在
            this.messages[this.locale] = {};
        }
        this.message = this.messages[this.locale];
        // 仅发生变化时，通知
        if (oldLocale !== this.locale) {
            this.watchers.forEach((watcher) => {
                watcher(this.locale, oldLocale);
            });
        }
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(fn) {
        const index = this.watchers.push(fn) - 1;
        return () => {
            this.watchers.splice(index, 1);
        };
    }
    add(locale, message, override = true) {
        const curMessages = this.messages[locale];
        if (curMessages) {
            if (override) {
                Object.assign(curMessages, message);
            }
            else {
                Object.keys(message).forEach((key) => {
                    if (!hasOwn(curMessages, key)) {
                        curMessages[key] = message[key];
                    }
                });
            }
        }
        else {
            this.messages[locale] = message;
        }
    }
    f(message, values, delimiters) {
        return this.formater.interpolate(message, values, delimiters).join('');
    }
    t(key, locale, values) {
        let message = this.message;
        if (typeof locale === 'string') {
            locale = normalizeLocale(locale, this.messages);
            locale && (message = this.messages[locale]);
        }
        else {
            values = locale;
        }
        if (!hasOwn(message, key)) {
            console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
            return key;
        }
        return this.formater.interpolate(message[key], values).join('');
    }
}

function watchAppLocale(appVm, i18n) {
    // 需要保证 watch 的触发在组件渲染之前
    if (appVm.$watchLocale) {
        // vue2
        appVm.$watchLocale((newLocale) => {
            i18n.setLocale(newLocale);
        });
    }
    else {
        appVm.$watch(() => appVm.$locale, (newLocale) => {
            i18n.setLocale(newLocale);
        });
    }
}
function getDefaultLocale() {
    if (typeof uni !== 'undefined' && uni.getLocale) {
        return uni.getLocale();
    }
    // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
    if (typeof global !== 'undefined' && global.getLocale) {
        return global.getLocale();
    }
    return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
    // 兼容旧版本入参
    if (typeof locale !== 'string') {
        [locale, messages] = [
            messages,
            locale,
        ];
    }
    if (typeof locale !== 'string') {
        // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
        locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== 'string') {
        fallbackLocale =
            (typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale) ||
                LOCALE_EN;
    }
    const i18n = new I18n({
        locale,
        fallbackLocale,
        messages,
        watcher,
    });
    let t = (key, values) => {
        if (typeof getApp !== 'function') {
            // app view
            /* eslint-disable no-func-assign */
            t = function (key, values) {
                return i18n.t(key, values);
            };
        }
        else {
            let isWatchedAppLocale = false;
            t = function (key, values) {
                const appVm = getApp().$vm;
                // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
                // options: {
                // 	type: Array,
                // 	default () {
                // 		return [{
                // 			icon: 'shop',
                // 			text: t("uni-goods-nav.options.shop"),
                // 		}, {
                // 			icon: 'cart',
                // 			text: t("uni-goods-nav.options.cart")
                // 		}]
                // 	}
                // },
                if (appVm) {
                    // 触发响应式
                    appVm.$locale;
                    if (!isWatchedAppLocale) {
                        isWatchedAppLocale = true;
                        watchAppLocale(appVm, i18n);
                    }
                }
                return i18n.t(key, values);
            };
        }
        return t(key, values);
    };
    return {
        i18n,
        f(message, values, delimiters) {
            return i18n.f(message, values, delimiters);
        },
        t(key, values) {
            return t(key, values);
        },
        add(locale, message, override = true) {
            return i18n.add(locale, message, override);
        },
        watch(fn) {
            return i18n.watchLocale(fn);
        },
        getLocale() {
            return i18n.getLocale();
        },
        setLocale(newLocale) {
            return i18n.setLocale(newLocale);
        },
    };
}

function isI18nStr(value, delimiters) {
    return value.indexOf(delimiters[0]) > -1;
}

const isEnableLocale = /*#__PURE__*/ once(() => typeof __uniConfig !== 'undefined' &&
    __uniConfig.locales &&
    !!Object.keys(__uniConfig.locales).length);

let i18n;
function getLocaleMessage() {
    const locale = uni.getLocale();
    const locales = __uniConfig.locales;
    return (locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {});
}
function formatI18n(message) {
    if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
        return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS);
    }
    return message;
}
function resolveJsonObj(jsonObj, names) {
    if (names.length === 1) {
        if (jsonObj) {
            const _isI18nStr = (value) => isString(value) && isI18nStr(value, I18N_JSON_DELIMITERS);
            const _name = names[0];
            let filterJsonObj = [];
            if (isArray(jsonObj) &&
                (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name])))
                    .length) {
                return filterJsonObj;
            }
            const value = jsonObj[names[0]];
            if (_isI18nStr(value)) {
                return jsonObj;
            }
        }
        return;
    }
    const name = names.shift();
    return resolveJsonObj(jsonObj && jsonObj[name], names);
}
function defineI18nProperties(obj, names) {
    return names.map((name) => defineI18nProperty(obj, name));
}
function defineI18nProperty(obj, names) {
    const jsonObj = resolveJsonObj(obj, names);
    if (!jsonObj) {
        return false;
    }
    const prop = names[names.length - 1];
    if (isArray(jsonObj)) {
        jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
    }
    else {
        let value = jsonObj[prop];
        Object.defineProperty(jsonObj, prop, {
            get() {
                return formatI18n(value);
            },
            set(v) {
                value = v;
            },
        });
    }
    return true;
}
function useI18n() {
    if (!i18n) {
        let locale;
        {
            if (typeof getApp === 'function') {
                locale = weex.requireModule('plus').getLanguage();
            }
            else {
                locale = plus.webview.currentWebview().getStyle().locale;
            }
        }
        i18n = initVueI18n(locale);
        // 自定义locales
        if (isEnableLocale()) {
            const localeKeys = Object.keys(__uniConfig.locales || {});
            if (localeKeys.length) {
                localeKeys.forEach((locale) => i18n.add(locale, __uniConfig.locales[locale]));
            }
            // initVueI18n 时 messages 还没有，导致用户自定义 locale 可能不生效，当设置完 messages 后，重新设置 locale
            i18n.setLocale(locale);
        }
    }
    return i18n;
}

// This file is created by scripts/i18n.js
function normalizeMessages(module, keys, values) {
    return keys.reduce((res, name, index) => {
        res[module + name] = values[index];
        return res;
    }, {});
}
const initI18nAppMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.app.';
    const keys = ['quit'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Press back button again to exit']), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Pulse otra vez para salir']), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
            "Appuyez à nouveau pour quitter l'application",
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['再按一次退出应用']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['再按一次退出應用']), false);
    }
});
const initI18nShowActionSheetMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.showActionSheet.';
    const keys = ['cancel'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Cancel']), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Cancelar']), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ['Annuler']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['取消']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['取消']), false);
    }
});
const initI18nShowModalMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.showModal.';
    const keys = ['cancel', 'confirm'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Cancel', 'OK']), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Cancelar', 'OK']), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ['Annuler', 'OK']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['取消', '确定']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['取消', '確定']), false);
    }
});
const initI18nChooseImageMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.chooseImage.';
    const keys = ['cancel', 'sourceType.album', 'sourceType.camera'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Cancel', 'Album', 'Camera']), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Cancelar', 'Álbum', 'Cámara']), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ['Annuler', 'Album', 'Caméra']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['取消', '从相册选择', '拍摄']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['取消', '從相冊選擇', '拍攝']), false);
    }
});
const initI18nChooseVideoMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.chooseVideo.';
    const keys = ['cancel', 'sourceType.album', 'sourceType.camera'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Cancel', 'Album', 'Camera']), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Cancelar', 'Álbum', 'Cámara']), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ['Annuler', 'Album', 'Caméra']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['取消', '从相册选择', '拍摄']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['取消', '從相冊選擇', '拍攝']), false);
    }
});
const initI18nPreviewImageMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.previewImage.';
    const keys = ['cancel', 'button.save', 'save.success', 'save.fail'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, [
            'Cancel',
            'Save Image',
            'Saved successfully',
            'Save failed',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, [
            'Cancelar',
            'Guardar imagen',
            'Guardado exitosamente',
            'Error al guardar',
        ]), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
            'Annuler',
            'Guardar imagen',
            'Enregistré avec succès',
            'Échec de la sauvegarde',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, [
            '取消',
            '保存图像',
            '保存图像到相册成功',
            '保存图像到相册失败',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, [
            '取消',
            '保存圖像',
            '保存圖像到相冊成功',
            '保存圖像到相冊失敗',
        ]), false);
    }
});
const initI18nSetClipboardDataMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.setClipboardData.';
    const keys = ['success', 'fail'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, [
            'Content copied',
            'Copy failed, please copy manually',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, [
            'Contenido copiado',
            'Error al copiar, copie manualmente',
        ]), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
            'Contenu copié',
            'Échec de la copie, copiez manuellement',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['内容已复制', '复制失败，请手动复制']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['內容已復制', '復制失敗，請手動復製']), false);
    }
});
const initI18nScanCodeMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.scanCode.';
    const keys = ['title', 'album', 'fail', 'flash.on', 'flash.off'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, [
            'Scan code',
            'Album',
            'Recognition failure',
            'Tap to turn light on',
            'Tap to turn light off',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, [
            'Código de escaneo',
            'Álbum',
            'Échec de la reconnaissance',
            'Toque para encender la luz',
            'Toque para apagar la luz',
        ]), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
            'Code d’analyse',
            'Album',
            'Fallo de reconocimiento',
            "Appuyez pour activer l'éclairage",
            "Appuyez pour désactiver l'éclairage",
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, [
            '扫码',
            '相册',
            '识别失败',
            '轻触照亮',
            '轻触关闭',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, [
            '掃碼',
            '相冊',
            '識別失敗',
            '輕觸照亮',
            '輕觸關閉',
        ]), false);
    }
});
const initI18nStartSoterAuthenticationMsgsOnce = /*#__PURE__*/ once(() => {
    const name = 'uni.startSoterAuthentication.';
    const keys = ['authContent', 'waitingContent'];
    {
        useI18n().add(LOCALE_EN, normalizeMessages(name, keys, [
            'Fingerprint recognition',
            'Unrecognizable',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ES, normalizeMessages(name, keys, [
            'Reconocimiento de huellas dactilares',
            'Irreconocible',
        ]), false);
    }
    {
        useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
            "Reconnaissance de l'empreinte digitale",
            'Méconnaissable',
        ]), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ['指纹识别中...', '无法识别']), false);
    }
    {
        useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ['指紋識別中...', '無法識別']), false);
    }
});

function initNavigationBarI18n(navigationBar) {
    if (isEnableLocale()) {
        return defineI18nProperties(navigationBar, [
            ['titleText'],
            ['searchInput', 'placeholder'],
            ['buttons', 'text'],
        ]);
    }
}
function initPullToRefreshI18n(pullToRefresh) {
    if (isEnableLocale()) {
        const CAPTION = 'caption';
        return defineI18nProperties(pullToRefresh, [
            ['contentdown', CAPTION],
            ['contentover', CAPTION],
            ['contentrefresh', CAPTION],
        ]);
    }
}

function initBridge(subscribeNamespace) {
    const emitter = new Emitter();
    return {
        on(event, callback) {
            return emitter.on(event, callback);
        },
        once(event, callback) {
            return emitter.once(event, callback);
        },
        off(event, callback) {
            return emitter.off(event, callback);
        },
        emit(event, ...args) {
            return emitter.emit(event, ...args);
        },
        subscribe(event, callback, once = false) {
            emitter[once ? 'once' : 'on'](`${subscribeNamespace}.${event}`, callback);
        },
        unsubscribe(event, callback) {
            emitter.off(`${subscribeNamespace}.${event}`, callback);
        },
        subscribeHandler(event, args, pageId) {
            emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
        },
    };
}

const INVOKE_VIEW_API = 'invokeViewApi';
const INVOKE_SERVICE_API = 'invokeServiceApi';

function hasRpx(str) {
    str = str + '';
    return str.indexOf('rpx') !== -1 || str.indexOf('upx') !== -1;
}
function rpx2px(str, replace = false) {
    if (replace) {
        return rpx2pxWithReplace(str);
    }
    if (isString(str)) {
        const res = parseInt(str) || 0;
        if (hasRpx(str)) {
            return uni.upx2px(res);
        }
        return res;
    }
    return str;
}
function rpx2pxWithReplace(str) {
    if (!hasRpx(str)) {
        return str;
    }
    return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
        return uni.upx2px(parseFloat(b)) + 'px';
    });
}

function getPageIdByVm(instance) {
    const vm = resolveComponentInstance(instance);
    if (vm.$page) {
        return vm.$page.id;
    }
    if (!vm.$) {
        return;
    }
    const rootProxy = vm.$.root.proxy;
    if (rootProxy && rootProxy.$page) {
        return rootProxy.$page.id;
    }
}
function getCurrentPage() {
    const pages = getCurrentPages();
    const len = pages.length;
    if (len) {
        return pages[len - 1];
    }
}
function getCurrentPageMeta() {
    const page = getCurrentPage();
    if (page) {
        return page.$page.meta;
    }
}
function getCurrentPageId() {
    const meta = getCurrentPageMeta();
    if (meta) {
        return meta.id;
    }
    return -1;
}
function getCurrentPageVm() {
    const page = getCurrentPage();
    if (page) {
        return page.$vm;
    }
}
const PAGE_META_KEYS = ['navigationBar', 'pullToRefresh'];
function initGlobalStyle() {
    return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id) {
    const globalStyle = initGlobalStyle();
    const res = extend({ id }, globalStyle, pageMeta);
    PAGE_META_KEYS.forEach((name) => {
        res[name] = extend({}, globalStyle[name], pageMeta[name]);
    });
    const { navigationBar } = res;
    navigationBar.titleText &&
        navigationBar.titleImage &&
        (navigationBar.titleText = '');
    return res;
}
function normalizeSubNVueStyle(style) {
    return JSON.parse(rpx2px(JSON.stringify(style), true));
}
function normalizePullToRefreshRpx(pullToRefresh) {
    if (pullToRefresh.offset) {
        pullToRefresh.offset = rpx2px(pullToRefresh.offset);
    }
    if (pullToRefresh.height) {
        pullToRefresh.height = rpx2px(pullToRefresh.height);
    }
    if (pullToRefresh.range) {
        pullToRefresh.range = rpx2px(pullToRefresh.range);
    }
    return pullToRefresh;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
    const { id, route } = meta;
    const titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
    return {
        id: id,
        path: addLeadingSlash(route),
        route: route,
        fullPath: url,
        options: pageQuery,
        meta,
        openType,
        eventChannel,
        statusBarStyle: titleColor === '#ffffff' ? 'light' : 'dark',
    };
}

function removeHook(vm, name, hook) {
    const hooks = vm.$[name];
    if (!isArray(hooks)) {
        return;
    }
    if (hook.__weh) {
        remove(hooks, hook.__weh);
    }
}
function invokeHook(vm, name, args) {
    if (isString(vm)) {
        args = name;
        name = vm;
        vm = getCurrentPageVm();
    }
    else if (typeof vm === 'number') {
        const page = getCurrentPages().find((page) => page.$page.id === vm);
        if (page) {
            vm = page.$vm;
        }
        else {
            vm = getCurrentPageVm();
        }
    }
    if (!vm) {
        return;
    }
    // 兼容 nvue
    {
        if (vm.__call_hook) {
            return vm.__call_hook(name, args);
        }
    }
    const hooks = vm.$[name];
    return hooks && invokeArrayFns(hooks, args);
}

function normalizeRoute(toRoute) {
    if (toRoute.indexOf('/') === 0) {
        return toRoute;
    }
    let fromRoute = '';
    const pages = getCurrentPages();
    if (pages.length) {
        fromRoute = pages[pages.length - 1].$page.route;
    }
    return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute, toRoute) {
    if (toRoute.indexOf('/') === 0) {
        return toRoute;
    }
    if (toRoute.indexOf('./') === 0) {
        return getRealRoute(fromRoute, toRoute.slice(2));
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
    return addLeadingSlash(fromRouteArray.concat(toRouteArray).join('/'));
}
function getRouteOptions(path, alias = false) {
    if (alias) {
        return __uniRoutes.find((route) => route.path === path || route.alias === path);
    }
    return __uniRoutes.find((route) => route.path === path);
}
function getRouteMeta(path) {
    const routeOptions = getRouteOptions(path);
    if (routeOptions) {
        return routeOptions.meta;
    }
}
function normalizeTabBarRoute(index, oldPagePath, newPagePath) {
    const oldTabBarRoute = getRouteOptions(addLeadingSlash(oldPagePath));
    if (oldTabBarRoute) {
        const { meta } = oldTabBarRoute;
        delete meta.tabBarIndex;
        meta.isQuit = meta.isTabBar = false;
    }
    const newTabBarRoute = getRouteOptions(addLeadingSlash(newPagePath));
    if (newTabBarRoute) {
        const { meta } = newTabBarRoute;
        meta.tabBarIndex = index;
        meta.isQuit = meta.isTabBar = true;
        const tabBar = __uniConfig.tabBar;
        if (tabBar && tabBar.list && tabBar.list[index]) {
            tabBar.list[index].pagePath = removeLeadingSlash(newPagePath);
        }
    }
}

let plus_;
let weex_;
let BroadcastChannel_;
function getRuntime() {
    return typeof window === 'object' &&
        typeof navigator === 'object' &&
        typeof document === 'object'
        ? 'webview'
        : 'v8';
}
function getPageId() {
    return plus_.webview.currentWebview().id;
}
let channel;
let globalEvent$1;
const callbacks$3 = {};
function onPlusMessage$1(res) {
    const message = res.data && res.data.__message;
    if (!message || !message.__page) {
        return;
    }
    const pageId = message.__page;
    const callback = callbacks$3[pageId];
    callback && callback(message);
    if (!message.keep) {
        delete callbacks$3[pageId];
    }
}
function addEventListener(pageId, callback) {
    if (getRuntime() === 'v8') {
        if (BroadcastChannel_) {
            channel && channel.close();
            channel = new BroadcastChannel_(getPageId());
            channel.onmessage = onPlusMessage$1;
        }
        else if (!globalEvent$1) {
            globalEvent$1 = weex_.requireModule('globalEvent');
            globalEvent$1.addEventListener('plusMessage', onPlusMessage$1);
        }
    }
    else {
        // @ts-ignore
        window.__plusMessage = onPlusMessage$1;
    }
    callbacks$3[pageId] = callback;
}
class Page {
    constructor(webview) {
        this.webview = webview;
    }
    sendMessage(data) {
        const message = JSON.parse(JSON.stringify({
            __message: {
                data,
            },
        }));
        const id = this.webview.id;
        if (BroadcastChannel_) {
            const channel = new BroadcastChannel_(id);
            channel.postMessage(message);
        }
        else {
            plus_.webview.postMessageToUniNView &&
                plus_.webview.postMessageToUniNView(message, id);
        }
    }
    close() {
        this.webview.close();
    }
}
function showPage({ context = {}, url, data = {}, style = {}, onMessage, onClose, }) {
    let darkmode = __uniConfig.darkmode;
    // eslint-disable-next-line
    plus_ = context.plus || plus;
    // eslint-disable-next-line
    weex_ = context.weex || (typeof weex === 'object' ? weex : null);
    // eslint-disable-next-line
    BroadcastChannel_ =
        context.BroadcastChannel ||
            (typeof BroadcastChannel === 'object' ? BroadcastChannel : null);
    const titleNView = {
        autoBackButton: true,
        titleSize: '17px',
    };
    const pageId = `page${Date.now()}`;
    style = extend({}, style);
    if (style.titleNView !== false && style.titleNView !== 'none') {
        style.titleNView = extend(titleNView, style.titleNView);
    }
    const defaultStyle = {
        top: 0,
        bottom: 0,
        usingComponents: {},
        popGesture: 'close',
        scrollIndicator: 'none',
        animationType: 'pop-in',
        animationDuration: 200,
        uniNView: {
            path: `/${url}.js`,
            defaultFontSize: 16,
            viewport: plus_.screen.resolutionWidth,
        },
    };
    style = extend(defaultStyle, style);
    const page = plus_.webview.create('', pageId, style, {
        extras: {
            from: getPageId(),
            runtime: getRuntime(),
            data: extend({}, data, { darkmode }),
            useGlobalEvent: !BroadcastChannel_,
        },
    });
    page.addEventListener('close', onClose);
    addEventListener(pageId, (message) => {
        if (isFunction(onMessage)) {
            onMessage(message.data);
        }
        if (!message.keep) {
            page.close('auto');
        }
    });
    page.show(style.animationType, style.animationDuration);
    return new Page(page);
}

const invokeOnCallback = (name, res) => UniServiceJSBridge.emit('api.' + name, res);

let invokeViewMethodId = 1;
function publishViewMethodName(pageId) {
    return (pageId || getCurrentPageId()) + '.' + INVOKE_VIEW_API;
}
const invokeViewMethod = (name, args, pageId, callback) => {
    const { subscribe, publishHandler } = UniServiceJSBridge;
    const id = callback ? invokeViewMethodId++ : 0;
    callback && subscribe(INVOKE_VIEW_API + '.' + id, callback, true);
    publishHandler(publishViewMethodName(pageId), { id, name, args }, pageId);
};
const invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
    const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge;
    const id = invokeViewMethodId++;
    const subscribeName = INVOKE_VIEW_API + '.' + id;
    subscribe(subscribeName, callback);
    publishHandler(publishViewMethodName(pageId), { id, name, args }, pageId);
    return () => {
        unsubscribe(subscribeName);
    };
};

const serviceMethods = Object.create(null);
function subscribeServiceMethod() {
    UniServiceJSBridge.subscribe(INVOKE_SERVICE_API, onInvokeServiceMethod);
}
function registerServiceMethod(name, fn) {
    if (!serviceMethods[name]) {
        serviceMethods[name] = fn;
    }
}
function onInvokeServiceMethod({ id, name, args, }, pageId) {
    const publish = (res) => {
        id &&
            UniServiceJSBridge.publishHandler(INVOKE_SERVICE_API + '.' + id, res, pageId);
    };
    const handler = serviceMethods[name];
    if (handler) {
        handler(args, publish);
    }
    else {
        publish({});
    }
}

const ServiceJSBridge = /*#__PURE__*/ extend(
/*#__PURE__*/ initBridge('view' /* view 指的是 service 层订阅的是 view 层事件 */), {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive,
});

function initOn() {
    const { on } = UniServiceJSBridge;
    on(ON_RESIZE, onResize);
    on(ON_APP_ENTER_FOREGROUND, onAppEnterForeground);
    on(ON_APP_ENTER_BACKGROUND, onAppEnterBackground);
}
function onResize(res) {
    invokeHook(getCurrentPage(), ON_RESIZE, res);
    UniServiceJSBridge.invokeOnCallback('onWindowResize', res); // API
}
function onAppEnterForeground(enterOptions) {
    const page = getCurrentPage();
    invokeHook(getApp(), ON_SHOW, enterOptions);
    invokeHook(page, ON_SHOW);
}
function onAppEnterBackground() {
    invokeHook(getApp(), ON_HIDE);
    invokeHook(getCurrentPage(), ON_HIDE);
}

const SUBSCRIBE_LIFECYCLE_HOOKS = [ON_PAGE_SCROLL, ON_REACH_BOTTOM];
function initSubscribe() {
    SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) => UniServiceJSBridge.subscribe(name, createPageEvent(name)));
}
function createPageEvent(name) {
    return (args, pageId) => {
        invokeHook(parseInt(pageId), name, args);
    };
}

function initService() {
    {
        initOn();
        initSubscribe();
    }
}
function initAppVm(appVm) {
    appVm.$vm = appVm;
    appVm.$mpType = 'app';
    const locale = ref(useI18n().getLocale());
    Object.defineProperty(appVm, '$locale', {
        get() {
            return locale.value;
        },
        set(v) {
            locale.value = v;
        },
    });
}
function initPageVm(pageVm, page) {
    pageVm.route = page.route;
    pageVm.$vm = pageVm;
    pageVm.$page = page;
    pageVm.$mpType = 'page';
    if (page.meta.isTabBar) {
        pageVm.$.__isTabBar = true;
        // TODO preload? 初始化时，状态肯定是激活
        pageVm.$.__isActive = true;
    }
}

function createLaunchOptions() {
    return {
        path: '',
        query: {},
        scene: 1001,
        referrerInfo: {
            appId: '',
            extraData: {},
        },
    };
}
function defineGlobalData(app, defaultGlobalData) {
    const options = app.$options || {};
    options.globalData = extend(options.globalData || {}, defaultGlobalData);
    Object.defineProperty(app, 'globalData', {
        get() {
            return options.globalData;
        },
        set(newGlobalData) {
            options.globalData = newGlobalData;
        },
    });
}

function getRealPath(filepath) {
    // 无协议的情况补全 https
    if (filepath.indexOf('//') === 0) {
        return 'https:' + filepath;
    }
    // 网络资源或base64
    if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) {
        return filepath;
    }
    if (isSystemURL(filepath)) {
        return 'file://' + normalizeLocalPath(filepath);
    }
    const wwwPath = 'file://' + normalizeLocalPath('_www');
    // 绝对路径转换为本地文件系统路径
    if (filepath.indexOf('/') === 0) {
        // 平台绝对路径 安卓、iOS
        if (filepath.startsWith('/storage/') ||
            filepath.startsWith('/sdcard/') ||
            filepath.includes('/Containers/Data/Application/')) {
            return 'file://' + filepath;
        }
        return wwwPath + filepath;
    }
    // 相对资源
    if (filepath.indexOf('../') === 0 || filepath.indexOf('./') === 0) {
        // @ts-expect-error app-view
        if (typeof __id__ === 'string') {
            // @ts-expect-error app-view
            return wwwPath + getRealRoute(addLeadingSlash(__id__), filepath);
        }
        else {
            const page = getCurrentPage();
            if (page) {
                return wwwPath + getRealRoute(addLeadingSlash(page.route), filepath);
            }
        }
    }
    return filepath;
}
const normalizeLocalPath = cacheStringFunction((filepath) => {
    return plus.io
        .convertLocalFileSystemURL(filepath)
        .replace(/^\/?apps\//, '/android_asset/apps/')
        .replace(/\/$/, '');
});
function isSystemURL(filepath) {
    if (filepath.indexOf('_www') === 0 ||
        filepath.indexOf('_doc') === 0 ||
        filepath.indexOf('_documents') === 0 ||
        filepath.indexOf('_downloads') === 0) {
        return true;
    }
    return false;
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
function invokeVmMethodWithoutArgs(vm, method, args, extras) {
    if (!vm) {
        return;
    }
    if (typeof args === 'undefined') {
        return vm[method]();
    }
    const [, callbacks] = normalizeArgs(args, extras);
    if (!Object.keys(callbacks).length) {
        return vm[method]();
    }
    return vm[method](normalizeCallback(method, callbacks));
}
/**
 * 调用两个参数（第一个入参为普通参数，第二个入参为 callback） API
 * @param {Object} vm
 * @param {Object} method
 * @param {Object} args
 * @param {Object} extras
 */
function invokeVmMethod(vm, method, args, extras) {
    if (!vm) {
        return;
    }
    const [pureArgs, callbacks] = normalizeArgs(args, extras);
    if (!Object.keys(callbacks).length) {
        return vm[method](pureArgs);
    }
    return vm[method](pureArgs, normalizeCallback(method, callbacks));
}
function findElmById(id, vm) {
    const elm = findRefByElm(id, vm.$el);
    if (!elm) {
        return console.error('Can not find `' + id + '`');
    }
    return elm;
}
function findRefByElm(id, elm) {
    if (!id || !elm) {
        return;
    }
    if (elm.attr && elm.attr.id === id) {
        return elm;
    }
    const children = elm.children;
    if (!children) {
        return;
    }
    for (let i = 0, len = children.length; i < len; i++) {
        const elm = findRefByElm(id, children[i]);
        if (elm) {
            return elm;
        }
    }
}
function normalizeArgs(args = {}, extras) {
    const callbacks = Object.create(null);
    const iterator = function iterator(name) {
        const callback = args[name];
        if (isFunction(callback)) {
            callbacks[name] = callback;
            delete args[name];
        }
    };
    CALLBACKS.forEach(iterator);
    extras && extras.forEach(iterator);
    return [args, callbacks];
}
function normalizeCallback(method, callbacks) {
    return function weexCallback(ret) {
        const type = ret.type;
        delete ret.type;
        const callback = callbacks[type];
        if (type === SUCCESS) {
            ret.errMsg = `${method}:ok`;
        }
        else if (type === FAIL) {
            ret.errMsg = method + ':fail ' + (ret.msg ? ' ' + ret.msg : '');
        }
        delete ret.code;
        delete ret.msg;
        isFunction(callback) && callback(ret);
        if (type === SUCCESS || type === FAIL) {
            const complete = callbacks.complete;
            isFunction(complete) && complete(ret);
        }
    };
}

let vueApp;
function getVueApp() {
    return vueApp;
}
function initVueApp(appVm) {
    const internalInstance = appVm.$;
    // 定制 App 的 $children 为 devtools 服务 false
    Object.defineProperty(internalInstance.ctx, '$children', {
        get() {
            return getAllPages().map((page) => page.$vm);
        },
    });
    const appContext = internalInstance.appContext;
    vueApp = extend(appContext.app, {
        mountPage(pageComponent, pageProps, pageContainer) {
            const vnode = createVNode(pageComponent, pageProps);
            // store app context on the root VNode.
            // this will be set on the root instance on initial mount.
            vnode.appContext = appContext;
            vnode.__page_container__ = pageContainer;
            render(vnode, pageContainer);
            const publicThis = vnode.component.proxy;
            publicThis.__page_container__ = pageContainer;
            return publicThis;
        },
        unmountPage: (pageInstance) => {
            const { __page_container__ } = pageInstance;
            if (__page_container__) {
                __page_container__.isUnmounted = true;
                render(null, __page_container__);
            }
        },
    });
}

const pages = [];
function addCurrentPage(page) {
    const $page = page.$page;
    if (!$page.meta.isNVue) {
        return pages.push(page);
    }
    // 开发阶段热刷新需要移除旧的相同 id 的 page
    const index = pages.findIndex((p) => p.$page.id === page.$page.id);
    if (index > -1) {
        pages.splice(index, 1, page);
    }
    else {
        pages.push(page);
    }
}
function getPageById(id) {
    return pages.find((page) => page.$page.id === id);
}
function getAllPages() {
    return pages;
}
function getCurrentPages$1() {
    const curPages = [];
    pages.forEach((page) => {
        if (page.$.__isTabBar) {
            if (page.$.__isActive) {
                curPages.push(page);
            }
        }
        else {
            curPages.push(page);
        }
    });
    return curPages;
}
function removeCurrentPage() {
    const page = getCurrentPage();
    if (!page) {
        return;
    }
    removePage(page);
}
function removePage(curPage) {
    const index = pages.findIndex((page) => page === curPage);
    if (index === -1) {
        return;
    }
    if (!curPage.$page.meta.isNVue) {
        getVueApp().unmountPage(curPage);
    }
    pages.splice(index, 1);
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('removePage', curPage.$page));
    }
}

const METHODS$1 = {
    play(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'play');
    },
    pause(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'pause');
    },
    seek(ctx, args) {
        return invokeVmMethod(ctx, 'seek', args.position);
    },
    stop(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'stop');
    },
    sendDanmu(ctx, args) {
        return invokeVmMethod(ctx, 'sendDanmu', args);
    },
    playbackRate(ctx, args) {
        return invokeVmMethod(ctx, 'playbackRate', args.rate);
    },
    requestFullScreen(ctx, args = {}) {
        return invokeVmMethod(ctx, 'requestFullScreen', args);
    },
    exitFullScreen(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'exitFullScreen');
    },
    showStatusBar(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'showStatusBar');
    },
    hideStatusBar(ctx) {
        return invokeVmMethodWithoutArgs(ctx, 'hideStatusBar');
    },
};
function operateVideoPlayer(videoId, pageId, type, data) {
    const page = getPageById(pageId);
    if (page === null || page === void 0 ? void 0 : page.$page.meta.isNVue) {
        const pageVm = page.$vm;
        return METHODS$1[type](findElmById(videoId, pageVm), data);
    }
    UniServiceJSBridge.invokeViewMethod('video.' + videoId, {
        videoId,
        type,
        data,
    }, pageId);
}

const METHODS = {
    getCenterLocation(ctx, cbs) {
        return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs);
    },
    moveToLocation(ctx, args) {
        return invokeVmMethod(ctx, 'moveToLocation', args);
    },
    translateMarker(ctx, args) {
        return invokeVmMethod(ctx, 'translateMarker', args, ['animationEnd']);
    },
    includePoints(ctx, args) {
        return invokeVmMethod(ctx, 'includePoints', args);
    },
    getRegion(ctx, cbs) {
        return invokeVmMethodWithoutArgs(ctx, 'getRegion', cbs);
    },
    getScale(ctx, cbs) {
        return invokeVmMethodWithoutArgs(ctx, 'getScale', cbs);
    },
    addCustomLayer(ctx, args) {
        return invokeVmMethod(ctx, 'addCustomLayer', args);
    },
    removeCustomLayer(ctx, args) {
        return invokeVmMethod(ctx, 'removeCustomLayer', args);
    },
    addGroundOverlay(ctx, args) {
        return invokeVmMethod(ctx, 'addGroundOverlay', args);
    },
    removeGroundOverlay(ctx, args) {
        return invokeVmMethod(ctx, 'removeGroundOverlay', args);
    },
    updateGroundOverlay(ctx, args) {
        return invokeVmMethod(ctx, 'updateGroundOverlay', args);
    },
    initMarkerCluster(ctx, args) {
        return invokeVmMethod(ctx, 'initMarkerCluster', args);
    },
    addMarkers(ctx, args) {
        return invokeVmMethod(ctx, 'addMarkers', args);
    },
    removeMarkers(ctx, args) {
        return invokeVmMethod(ctx, 'removeMarkers', args);
    },
    moveAlong(ctx, args) {
        return invokeVmMethod(ctx, 'moveAlong', args);
    },
    setLocMarkerIcon(ctx, args) {
        return invokeVmMethod(ctx, 'setLocMarkerIcon', args);
    },
    openMapApp(ctx, args) {
        return invokeVmMethod(ctx, 'openMapApp', args);
    },
    on(ctx, args) {
        return ctx.on(args.name, args.callback);
    },
};
function operateMap(id, pageId, type, data, operateMapCallback) {
    const page = getPageById(pageId);
    if (page === null || page === void 0 ? void 0 : page.$page.meta.isNVue) {
        const pageVm = page.$vm;
        return METHODS[type](findElmById(id, pageVm), data);
    }
    UniServiceJSBridge.invokeViewMethod('map.' + id, {
        type,
        data,
    }, pageId, operateMapCallback);
}

function getEventName$1(reqId) {
    const EVENT_NAME = 'IntersectionObserver';
    return `${EVENT_NAME}.${reqId}`;
}
function addIntersectionObserver({ reqId, component, options, callback }, _pageId) {
    const eventName = getEventName$1(reqId);
    UniServiceJSBridge.invokeViewMethod('addIntersectionObserver', {
        reqId,
        component: component.$el.nodeId,
        options,
        eventName,
    }, _pageId);
    UniServiceJSBridge.subscribe(eventName, callback);
}
function removeIntersectionObserver({ reqId, component }, _pageId) {
    UniServiceJSBridge.invokeViewMethod('removeIntersectionObserver', {
        reqId,
        component: component.$el.nodeId,
    }, _pageId);
    UniServiceJSBridge.unsubscribe(getEventName$1(reqId));
}

function getEventName(reqId) {
    const EVENT_NAME = 'MediaQueryObserver';
    return `${EVENT_NAME}.${reqId}`;
}
function addMediaQueryObserver({ reqId, component, options, callback }, _pageId) {
    const eventName = getEventName(reqId);
    UniServiceJSBridge.invokeViewMethod('addMediaQueryObserver', {
        reqId,
        component: component.$el.nodeId,
        options,
        eventName,
    }, _pageId);
    UniServiceJSBridge.subscribe(eventName, callback);
}
function removeMediaQueryObserver({ reqId, component }, _pageId) {
    UniServiceJSBridge.invokeViewMethod('removeMediaQueryObserver', {
        reqId,
        component: component.$el.nodeId,
    }, _pageId);
    UniServiceJSBridge.unsubscribe(getEventName(reqId));
}

const DEVICE_FREQUENCY = 200;
const NETWORK_TYPES = [
    'unknown',
    'none',
    'ethernet',
    'wifi',
    '2g',
    '3g',
    '4g',
    '5g',
];
const TEMP_PATH_BASE = '_doc/uniapp_temp';
const TEMP_PATH = `${TEMP_PATH_BASE}_${Date.now()}`;

function getFileName(path) {
    const array = path.split('/');
    return array[array.length - 1];
}
function getExtName(path) {
    const array = path.split('.');
    return array.length > 1 ? '.' + array[array.length - 1] : '';
}

const EVENT_BACKBUTTON = 'backbutton';
function backbuttonListener() {
    uni.navigateBack({
        from: 'backbutton',
        success() { }, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
    });
}
const enterOptions = /*#__PURE__*/ createLaunchOptions();
const launchOptions = /*#__PURE__*/ createLaunchOptions();
function getLaunchOptions() {
    return extend({}, launchOptions);
}
function getEnterOptions() {
    return extend({}, enterOptions);
}
function initEnterOptions({ path, query, referrerInfo, }) {
    extend(enterOptions, {
        path,
        query: query ? parseQuery(query) : {},
        referrerInfo: referrerInfo || {},
    });
}
function initLaunchOptions({ path, query, referrerInfo, }) {
    extend(launchOptions, {
        path,
        query: query ? parseQuery(query) : {},
        referrerInfo: referrerInfo || {},
        // TODO uni-app x
        channel: plus.runtime.channel,
        launcher: plus.runtime.launcher,
    });
    extend(enterOptions, launchOptions);
    return extend({}, launchOptions);
}
function parseRedirectInfo() {
    const weexPlus = weex.requireModule('plus');
    if (weexPlus.getRedirectInfo) {
        const { path, query, extraData, userAction, fromAppid } = weexPlus.getRedirectInfo() || {};
        const referrerInfo = {
            appId: fromAppid,
            extraData: {},
        };
        if (extraData) {
            referrerInfo.extraData = extraData;
        }
        return {
            path: path || '',
            query: query ? '?' + query : '',
            referrerInfo,
            userAction,
        };
    }
}

var common = {};

(function (exports) {


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');

	function _has(obj, key) {
	  return Object.prototype.hasOwnProperty.call(obj, key);
	}

	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (_has(source, p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);
} (common));

var deflate$4 = {};

var deflate$3 = {};

var trees$1 = {};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils$6 = common;

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED$1               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN$1             = 2;

/*============================================================================*/


function zero$1(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH$1    = 3;
var MAX_MATCH$1    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES$1  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS$1      = 256;
/* number of literal bytes 0..255 */

var L_CODES$1       = LITERALS$1 + 1 + LENGTH_CODES$1;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES$1       = 30;
/* number of distance codes */

var BL_CODES$1      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE$1     = 2 * L_CODES$1 + 1;
/* maximum heap size */

var MAX_BITS$1      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES$1);
zero$1(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES$1);
zero$1(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS$1 + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS$1 + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES$1, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES$1;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES$1;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES$1; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils$6.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

trees$1._tr_init  = _tr_init;
trees$1._tr_stored_block = _tr_stored_block;
trees$1._tr_flush_block  = _tr_flush_block;
trees$1._tr_tally = _tr_tally;
trees$1._tr_align = _tr_align;

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32$2(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


var adler32_1 = adler32$2;

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32$2(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


var crc32_1 = crc32$2;

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var messages = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils$5   = common;
var trees   = trees$1;
var adler32$1 = adler32_1;
var crc32$1   = crc32_1;
var msg$2     = messages;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH$1      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH$2        = 4;
var Z_BLOCK$1         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK$2            = 0;
var Z_STREAM_END$2    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR$1  = -2;
var Z_DATA_ERROR$1    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR$1     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION$1 = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY$1    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED$2  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS$1 = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg$2[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils$5.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils$5.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32$1(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32$1(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils$5.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED$2; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils$5.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils$5.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils$5.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils$5.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils$5.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils$5.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR$1);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH$1;
  trees._tr_init(s);
  return Z_OK$2;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK$2) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR$1; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR$1; }
  strm.state.gzhead = head;
  return Z_OK$2;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR$1;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR$1);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils$5.Buf8(s.w_size * 2);
  s.head = new utils$5.Buf16(s.hash_size);
  s.prev = new utils$5.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils$5.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
}


function deflate$2(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH$2)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED$2 + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK$2;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH$2) {
    return err(strm, Z_BUF_ERROR$1);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK$2;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK$1) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK$2;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH$2) { return Z_OK$2; }
  if (s.wrap <= 0) { return Z_STREAM_END$2; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR$1;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR$1);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$2;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR$1;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR$1;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils$5.Buf8(s.w_size);
    utils$5.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$2;
}


deflate$3.deflateInit = deflateInit;
deflate$3.deflateInit2 = deflateInit2;
deflate$3.deflateReset = deflateReset;
deflate$3.deflateResetKeep = deflateResetKeep;
deflate$3.deflateSetHeader = deflateSetHeader;
deflate$3.deflate = deflate$2;
deflate$3.deflateEnd = deflateEnd;
deflate$3.deflateSetDictionary = deflateSetDictionary;
deflate$3.deflateInfo = 'pako deflate (from Nodeca project)';

var strings$2 = {};

var utils$4 = common;


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils$4.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
strings$2.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils$4.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils$4.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
strings$2.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
strings$2.binstring2buf = function (str) {
  var buf = new utils$4.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
strings$2.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
strings$2.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream$2() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

var zstream = ZStream$2;

var zlib_deflate = deflate$3;
var utils$3        = common;
var strings$1      = strings$2;
var msg$1          = messages;
var ZStream$1      = zstream;

var toString$2 = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH$1        = 4;

var Z_OK$1            = 0;
var Z_STREAM_END$1    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED$1  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils$3.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream$1();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK$1) {
    throw new Error(msg$1[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings$1.string2buf(opt.dictionary);
    } else if (toString$2.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK$1) {
      throw new Error(msg$1[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH$1 : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings$1.string2buf(data);
  } else if (toString$2.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils$3.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings$1.buf2binstring(utils$3.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils$3.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH$1) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK$1;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK$1);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK$1) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils$3.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate$1(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg$1[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}


deflate$4.Deflate = Deflate;
deflate$4.deflate = deflate$1;
deflate$4.deflateRaw = deflateRaw;
deflate$4.gzip = gzip;

var inflate$4 = {};

var inflate$3 = {};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD$1 = 30;       /* got a data error -- remain here until reset */
var TYPE$2 = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
var inffast = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD$1;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD$1;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD$1;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE$2;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD$1;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils$2 = common;

var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

var inftrees = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils$2.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils$2.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES$1) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS$1) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
    (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
        (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils$1         = common;
var adler32       = adler32_1;
var crc32         = crc32_1;
var inflate_fast  = inffast;
var inflate_table = inftrees;

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE$1 = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils$1.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils$1.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils$1.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils$1.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils$1.Buf32(512);
    distfix = new utils$1.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils$1.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils$1.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils$1.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils$1.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate$2(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils$1.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE$1) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE$1;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils$1.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE$1;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE$1;
        /* falls through */
      case TYPE$1:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils$1.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE$1;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE$1) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE$1;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE$1 ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

inflate$3.inflateReset = inflateReset;
inflate$3.inflateReset2 = inflateReset2;
inflate$3.inflateResetKeep = inflateResetKeep;
inflate$3.inflateInit = inflateInit;
inflate$3.inflateInit2 = inflateInit2;
inflate$3.inflate = inflate$2;
inflate$3.inflateEnd = inflateEnd;
inflate$3.inflateGetHeader = inflateGetHeader;
inflate$3.inflateSetDictionary = inflateSetDictionary;
inflate$3.inflateInfo = 'pako inflate (from Nodeca project)';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var constants$1 = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader$1() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

var gzheader = GZheader$1;

var zlib_inflate = inflate$3;
var utils        = common;
var strings      = strings$2;
var c            = constants$1;
var msg          = messages;
var ZStream      = zstream;
var GZheader     = gzheader;

var toString$1 = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString$1.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate$1(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


inflate$4.Inflate = Inflate;
inflate$4.inflate = inflate$1;
inflate$4.inflateRaw = inflateRaw;
inflate$4.ungzip  = inflate$1;

var assign    = common.assign;

var deflate   = deflate$4;
var inflate   = inflate$4;
var constants = constants$1;

var pako = {};

assign(pako, deflate, inflate, constants);

var pako_1 = pako;

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
let maxWidth = 960;
let baseWidth = 375;
let includeWidth = 750;
function checkDeviceWidth() {
    const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === 'ios';
}
function checkValue(value, defaultValue) {
    const newValue = Number(value);
    return isNaN(newValue) ? defaultValue : newValue;
}
function checkMaxWidth() {
    const config = __uniConfig.globalStyle || {};
    maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
    baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
    includeWidth = checkValue(config.rpxCalcBaseDeviceWidth, 750);
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
        checkDeviceWidth();
        {
            checkMaxWidth();
        }
    }
    number = Number(number);
    if (number === 0) {
        return 0;
    }
    let width = newDeviceWidth || deviceWidth;
    {
        width = number === includeWidth || width <= maxWidth ? width : baseWidth;
    }
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
    if (!isArray(name))
        name = [name];
    name.forEach((n) => emitter.off(n, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
    emitter.emit(name, ...args);
}, EmitProtocol);

const validator = [
    {
        name: 'id',
        type: String,
        required: true,
    },
];
/* export const API_CREATE_AUDIO_CONTEXT = 'createAudioContext'
export type API_TYPE_CREATE_AUDIO_CONTEXT = typeof uni.createAudioContext
export const CreateAudioContextProtocol = validator */
const API_CREATE_VIDEO_CONTEXT = 'createVideoContext';
const API_CREATE_MAP_CONTEXT = 'createMapContext';
const CreateMapContextProtocol = validator;
const API_CREATE_CANVAS_CONTEXT = 'createCanvasContext';
const CreateCanvasContextProtocol = [
    {
        name: 'canvasId',
        type: String,
        required: true,
    },
    {
        name: 'componentInstance',
        type: Object,
    },
];
const API_CREATE_INNER_AUDIO_CONTEXT = 'createInnerAudioContext';
const API_CREATE_LIVE_PUSHER_CONTEXT = 'createLivePusherContext';
const CreateLivePusherContextProtocol = validator.concat({
    name: 'componentInstance',
    type: Object,
});

const RATES = [0.5, 0.8, 1.0, 1.25, 1.5, 2.0];
class VideoContext {
    constructor(id, pageId) {
        this.id = id;
        this.pageId = pageId;
    }
    play() {
        operateVideoPlayer(this.id, this.pageId, 'play');
    }
    pause() {
        operateVideoPlayer(this.id, this.pageId, 'pause');
    }
    stop() {
        operateVideoPlayer(this.id, this.pageId, 'stop');
    }
    seek(position) {
        operateVideoPlayer(this.id, this.pageId, 'seek', {
            position,
        });
    }
    sendDanmu(args) {
        operateVideoPlayer(this.id, this.pageId, 'sendDanmu', args);
    }
    playbackRate(rate) {
        if (!~RATES.indexOf(rate)) {
            rate = 1.0;
        }
        operateVideoPlayer(this.id, this.pageId, 'playbackRate', {
            rate,
        });
    }
    requestFullScreen(args = {}) {
        operateVideoPlayer(this.id, this.pageId, 'requestFullScreen', args);
    }
    exitFullScreen() {
        operateVideoPlayer(this.id, this.pageId, 'exitFullScreen');
    }
    showStatusBar() {
        operateVideoPlayer(this.id, this.pageId, 'showStatusBar');
    }
    hideStatusBar() {
        operateVideoPlayer(this.id, this.pageId, 'hideStatusBar');
    }
}
const createVideoContext = defineSyncApi(API_CREATE_VIDEO_CONTEXT, (id, context) => {
    if (context) {
        return new VideoContext(id, getPageIdByVm(context));
    }
    return new VideoContext(id, getPageIdByVm(getCurrentPageVm()));
});

const operateMapCallback = (options, res) => {
    const errMsg = res.errMsg || '';
    if (new RegExp('\\:\\s*fail').test(errMsg)) {
        options.fail && options.fail(res);
    }
    else {
        options.success && options.success(res);
    }
    options.complete && options.complete(res);
};
const operateMapWrap = (id, pageId, type, options) => {
    operateMap(id, pageId, type, options, (res) => {
        options && operateMapCallback(options, res);
    });
};
class MapContext {
    constructor(id, pageId) {
        this.id = id;
        this.pageId = pageId;
    }
    getCenterLocation(options) {
        operateMapWrap(this.id, this.pageId, 'getCenterLocation', options);
    }
    moveToLocation(options) {
        operateMapWrap(this.id, this.pageId, 'moveToLocation', options);
    }
    getScale(options) {
        operateMapWrap(this.id, this.pageId, 'getScale', options);
    }
    getRegion(options) {
        operateMapWrap(this.id, this.pageId, 'getRegion', options);
    }
    includePoints(options) {
        operateMapWrap(this.id, this.pageId, 'includePoints', options);
    }
    translateMarker(options) {
        operateMapWrap(this.id, this.pageId, 'translateMarker', options);
    }
    $getAppMap() {
        {
            return plus.maps.getMapById(this.pageId + '-map-' + this.id);
        }
    }
    addCustomLayer(options) {
        operateMapWrap(this.id, this.pageId, 'addCustomLayer', options);
    }
    removeCustomLayer(options) {
        operateMapWrap(this.id, this.pageId, 'removeCustomLayer', options);
    }
    addGroundOverlay(options) {
        operateMapWrap(this.id, this.pageId, 'addGroundOverlay', options);
    }
    removeGroundOverlay(options) {
        operateMapWrap(this.id, this.pageId, 'removeGroundOverlay', options);
    }
    updateGroundOverlay(options) {
        operateMapWrap(this.id, this.pageId, 'updateGroundOverlay', options);
    }
    initMarkerCluster(options) {
        operateMapWrap(this.id, this.pageId, 'initMarkerCluster', options);
    }
    addMarkers(options) {
        operateMapWrap(this.id, this.pageId, 'addMarkers', options);
    }
    removeMarkers(options) {
        operateMapWrap(this.id, this.pageId, 'removeMarkers', options);
    }
    moveAlong(options) {
        operateMapWrap(this.id, this.pageId, 'moveAlong', options);
    }
    setLocMarkerIcon(options) {
        operateMapWrap(this.id, this.pageId, 'setLocMarkerIcon', options);
    }
    openMapApp(options) {
        operateMapWrap(this.id, this.pageId, 'openMapApp', options);
    }
    on(name, callback) {
        operateMapWrap(this.id, this.pageId, 'on', { name, callback });
    }
}
const createMapContext = defineSyncApi(API_CREATE_MAP_CONTEXT, (id, context) => {
    if (context) {
        return new MapContext(id, getPageIdByVm(context));
    }
    return new MapContext(id, getPageIdByVm(getCurrentPageVm()));
}, CreateMapContextProtocol);

function getInt(name, defaultValue) {
    return function (value, params) {
        if (value) {
            params[name] = Math.round(value);
        }
        else if (typeof defaultValue !== 'undefined') {
            params[name] = defaultValue;
        }
    };
}
const formatWidth = getInt('width');
const formatHeight = getInt('height');
//#region getImageDataOptions
const API_CANVAS_GET_IMAGE_DATA = 'canvasGetImageData';
const CanvasGetImageDataOptions = {
    formatArgs: {
        x: getInt('x'),
        y: getInt('y'),
        width: formatWidth,
        height: formatHeight,
    },
};
const CanvasGetImageDataProtocol = {
    canvasId: {
        type: String,
        required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
};
//#endregion
//#region putImageData
const API_CANVAS_PUT_IMAGE_DATA = 'canvasPutImageData';
const CanvasPutImageDataOptions = CanvasGetImageDataOptions;
const CanvasPutImageDataProtocol = 
/*#__PURE__*/ extend({
    data: {
        type: Uint8ClampedArray,
        required: true,
    },
}, CanvasGetImageDataProtocol, {
    height: {
        type: Number,
    },
});
//#endregion
//#region toTempFilePath
const fileTypes = {
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpg',
};
const API_CANVAS_TO_TEMP_FILE_PATH = 'canvasToTempFilePath';
const CanvasToTempFilePathOptions = {
    formatArgs: {
        x: getInt('x', 0),
        y: getInt('y', 0),
        width: formatWidth,
        height: formatHeight,
        destWidth: getInt('destWidth'),
        destHeight: getInt('destHeight'),
        fileType(value, params) {
            value = (value || '').toUpperCase();
            let type = fileTypes[value];
            if (!type) {
                type = fileTypes.PNG;
            }
            params.fileType = type;
        },
        quality(value, params) {
            params.quality = value && value > 0 && value < 1 ? value : 1;
        },
    },
};
const CanvasToTempFilePathProtocol = {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    destWidth: Number,
    destHeight: Number,
    canvasId: {
        type: String,
        required: true,
    },
    fileType: String,
    quality: Number,
};

//#region import
function operateCanvas(canvasId, pageId, type, data, callback) {
    UniServiceJSBridge.invokeViewMethod(`canvas.${canvasId}`, {
        type,
        data,
    }, pageId, (data) => {
        if (callback)
            callback(data);
    });
}
//#endregion
//#region methods
var methods1 = ['scale', 'rotate', 'translate', 'setTransform', 'transform'];
var methods2 = [
    'drawImage',
    'fillText',
    'fill',
    'stroke',
    'fillRect',
    'strokeRect',
    'clearRect',
    'strokeText',
];
var methods3 = [
    'setFillStyle',
    'setTextAlign',
    'setStrokeStyle',
    'setGlobalAlpha',
    'setShadow',
    'setFontSize',
    'setLineCap',
    'setLineJoin',
    'setLineWidth',
    'setMiterLimit',
    'setTextBaseline',
    'setLineDash',
];
function measureText(text, font) {
    const canvas = document.createElement('canvas');
    const c2d = canvas.getContext('2d');
    c2d.font = font;
    return c2d.measureText(text).width || 0;
}
//#endregion
//#region checkColor
const predefinedColor = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
    transparent: '#00000000',
};
function checkColor(e) {
    // 其他开发者适配的echarts会传入一个undefined到这里
    e = e || '#000000';
    var t = null;
    if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
        const n = parseInt(t[1].slice(0, 2), 16);
        const o = parseInt(t[1].slice(2, 4), 16);
        const r = parseInt(t[1].slice(4), 16);
        return [n, o, r, 255];
    }
    if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
        let n = t[1].slice(0, 1);
        let o = t[1].slice(1, 2);
        let r = t[1].slice(2, 3);
        n = parseInt(n + n, 16);
        o = parseInt(o + o, 16);
        r = parseInt(r + r, 16);
        return [n, o, r, 255];
    }
    if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
        return t[1]
            .split(',')
            .map(function (e) {
            return Math.min(255, parseInt(e.trim()));
        })
            .concat(255);
    }
    if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
        return t[1].split(',').map(function (e, t) {
            return t === 3
                ? Math.floor(255 * parseFloat(e.trim()))
                : Math.min(255, parseInt(e.trim()));
        });
    }
    var i = e.toLowerCase();
    if (hasOwn$1(predefinedColor, i)) {
        t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);
        const n = parseInt(t[1].slice(0, 2), 16);
        const o = parseInt(t[1].slice(2, 4), 16);
        const r = parseInt(t[1].slice(4, 6), 16);
        let a = parseInt(t[1].slice(6, 8), 16);
        a = a >= 0 ? a : 255;
        return [n, o, r, a];
    }
    console.error('unsupported color:' + e);
    return [0, 0, 0, 255];
}
//#endregion
//#region Class
class CanvasGradient {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.colorStop = [];
    }
    addColorStop(position, color) {
        this.colorStop.push([position, checkColor(color)]);
    }
}
class Pattern {
    constructor(image, repetition) {
        this.type = 'pattern';
        this.data = image;
        this.colorStop = repetition;
    }
}
class TextMetrics {
    constructor(width) {
        this.width = width;
    }
}
class CanvasContext {
    constructor(id, pageId) {
        this.id = id;
        this.pageId = pageId;
        this.actions = [];
        this.path = [];
        this.subpath = [];
        // this.currentTransform = []
        // this.currentStepAnimates = []
        this.drawingState = [];
        this.state = {
            lineDash: [0, 0],
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: [0, 0, 0, 0],
            font: '10px sans-serif',
            fontSize: 10,
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontFamily: 'sans-serif',
        };
    }
    draw(reserve = false, callback) {
        var actions = [...this.actions];
        this.actions = [];
        this.path = [];
        operateCanvas(this.id, this.pageId, 'actionsChanged', {
            actions,
            reserve,
        }, callback);
    }
    createLinearGradient(x0, y0, x1, y1) {
        return new CanvasGradient('linear', [x0, y0, x1, y1]);
    }
    createCircularGradient(x, y, r) {
        return new CanvasGradient('radial', [x, y, r]);
    }
    createPattern(image, repetition) {
        if (undefined === repetition) {
            console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.");
        }
        else if (['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].indexOf(repetition) < 0) {
            console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" +
                repetition +
                "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
        }
        else {
            return new Pattern(image, repetition);
        }
    }
    measureText(text) {
        const font = this.state.font;
        let width = 0;
        {
            const webview = plus.webview
                .all()
                .find((webview) => webview.getURL().endsWith('www/__uniappview.html'));
            if (webview) {
                width = Number(webview.evalJSSync(`(${measureText.toString()})(${JSON.stringify(text)},${JSON.stringify(font)})`));
            }
        }
        return new TextMetrics(width);
    }
    save() {
        this.actions.push({
            method: 'save',
            data: [],
        });
        this.drawingState.push(this.state);
    }
    restore() {
        this.actions.push({
            method: 'restore',
            data: [],
        });
        this.state = this.drawingState.pop() || {
            lineDash: [0, 0],
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: [0, 0, 0, 0],
            font: '10px sans-serif',
            fontSize: 10,
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontFamily: 'sans-serif',
        };
    }
    beginPath() {
        this.path = [];
        this.subpath = [];
        this.path.push({
            method: 'beginPath',
            data: [],
        });
    }
    moveTo(x, y) {
        this.path.push({
            method: 'moveTo',
            data: [x, y],
        });
        this.subpath = [[x, y]];
    }
    lineTo(x, y) {
        if (this.path.length === 0 && this.subpath.length === 0) {
            this.path.push({
                method: 'moveTo',
                data: [x, y],
            });
        }
        else {
            this.path.push({
                method: 'lineTo',
                data: [x, y],
            });
        }
        this.subpath.push([x, y]);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
        this.path.push({
            method: 'quadraticCurveTo',
            data: [cpx, cpy, x, y],
        });
        this.subpath.push([x, y]);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.path.push({
            method: 'bezierCurveTo',
            data: [cp1x, cp1y, cp2x, cp2y, x, y],
        });
        this.subpath.push([x, y]);
    }
    arc(x, y, r, sAngle, eAngle, counterclockwise = false) {
        this.path.push({
            method: 'arc',
            data: [x, y, r, sAngle, eAngle, counterclockwise],
        });
        this.subpath.push([x, y]);
    }
    rect(x, y, width, height) {
        this.path.push({
            method: 'rect',
            data: [x, y, width, height],
        });
        this.subpath = [[x, y]];
    }
    arcTo(x1, y1, x2, y2, radius) {
        this.path.push({
            method: 'arcTo',
            data: [x1, y1, x2, y2, radius],
        });
        this.subpath.push([x2, y2]);
    }
    clip() {
        this.actions.push({
            method: 'clip',
            data: [...this.path],
        });
    }
    closePath() {
        this.path.push({
            method: 'closePath',
            data: [],
        });
        if (this.subpath.length) {
            this.subpath = [this.subpath.shift()];
        }
    }
    clearActions() {
        this.actions = [];
        this.path = [];
        this.subpath = [];
    }
    getActions() {
        var actions = [...this.actions];
        this.clearActions();
        return actions;
    }
    set lineDashOffset(value) {
        this.actions.push({
            method: 'setLineDashOffset',
            data: [value],
        });
    }
    set globalCompositeOperation(type) {
        this.actions.push({
            method: 'setGlobalCompositeOperation',
            data: [type],
        });
    }
    set shadowBlur(level) {
        this.actions.push({
            method: 'setShadowBlur',
            data: [level],
        });
    }
    set shadowColor(color) {
        this.actions.push({
            method: 'setShadowColor',
            data: [color],
        });
    }
    set shadowOffsetX(x) {
        this.actions.push({
            method: 'setShadowOffsetX',
            data: [x],
        });
    }
    set shadowOffsetY(y) {
        this.actions.push({
            method: 'setShadowOffsetY',
            data: [y],
        });
    }
    set font(value) {
        var self = this;
        this.state.font = value;
        // eslint-disable-next-line
        var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
        if (fontFormat) {
            var style = fontFormat[1].trim().split(/\s/);
            var fontSize = parseFloat(fontFormat[3]);
            var fontFamily = fontFormat[7];
            var actions = [];
            style.forEach(function (value, index) {
                if (['italic', 'oblique', 'normal'].indexOf(value) > -1) {
                    actions.push({
                        method: 'setFontStyle',
                        data: [value],
                    });
                    self.state.fontStyle = value;
                }
                else if (['bold', 'normal'].indexOf(value) > -1) {
                    actions.push({
                        method: 'setFontWeight',
                        data: [value],
                    });
                    self.state.fontWeight = value;
                }
                else if (index === 0) {
                    actions.push({
                        method: 'setFontStyle',
                        data: ['normal'],
                    });
                    self.state.fontStyle = 'normal';
                }
                else if (index === 1) {
                    pushAction();
                }
            });
            if (style.length === 1) {
                pushAction();
            }
            style = actions
                .map(function (action) {
                return action.data[0];
            })
                .join(' ');
            this.state.fontSize = fontSize;
            this.state.fontFamily = fontFamily;
            this.actions.push({
                method: 'setFont',
                data: [`${style} ${fontSize}px ${fontFamily}`],
            });
        }
        else {
            console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");
        }
        function pushAction() {
            actions.push({
                method: 'setFontWeight',
                data: ['normal'],
            });
            self.state.fontWeight = 'normal';
        }
    }
    get font() {
        return this.state.font;
    }
    set fillStyle(color) {
        this.setFillStyle(color);
    }
    set strokeStyle(color) {
        this.setStrokeStyle(color);
    }
    set globalAlpha(value) {
        value = Math.floor(255 * parseFloat(value));
        this.actions.push({
            method: 'setGlobalAlpha',
            data: [value],
        });
    }
    set textAlign(align) {
        this.actions.push({
            method: 'setTextAlign',
            data: [align],
        });
    }
    set lineCap(type) {
        this.actions.push({
            method: 'setLineCap',
            data: [type],
        });
    }
    set lineJoin(type) {
        this.actions.push({
            method: 'setLineJoin',
            data: [type],
        });
    }
    set lineWidth(value) {
        this.actions.push({
            method: 'setLineWidth',
            data: [value],
        });
    }
    set miterLimit(value) {
        this.actions.push({
            method: 'setMiterLimit',
            data: [value],
        });
    }
    set textBaseline(type) {
        this.actions.push({
            method: 'setTextBaseline',
            data: [type],
        });
    }
}
const initCanvasContextProperty = /*#__PURE__*/ once(() => {
    [...methods1, ...methods2].forEach(function (method) {
        function get(method) {
            switch (method) {
                case 'fill':
                case 'stroke':
                    return function () {
                        // @ts-ignore
                        this.actions.push({
                            method: method + 'Path',
                            // @ts-ignore
                            data: [...this.path],
                        });
                    };
                case 'fillRect':
                    return function (x, y, width, height) {
                        // @ts-ignore
                        this.actions.push({
                            method: 'fillPath',
                            data: [
                                {
                                    method: 'rect',
                                    data: [x, y, width, height],
                                },
                            ],
                        });
                    };
                case 'strokeRect':
                    return function (x, y, width, height) {
                        // @ts-ignore
                        this.actions.push({
                            method: 'strokePath',
                            data: [
                                {
                                    method: 'rect',
                                    data: [x, y, width, height],
                                },
                            ],
                        });
                    };
                case 'fillText':
                case 'strokeText':
                    return function (text, x, y, maxWidth) {
                        var data = [text.toString(), x, y];
                        if (typeof maxWidth === 'number') {
                            data.push(maxWidth);
                        }
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data,
                        });
                    };
                case 'drawImage':
                    return function (imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
                        if (sHeight === undefined) {
                            sx = dx;
                            sy = dy;
                            sWidth = dWidth;
                            sHeight = dHeight;
                            dx = undefined;
                            dy = undefined;
                            dWidth = undefined;
                            dHeight = undefined;
                        }
                        var data;
                        function isNumber(e) {
                            return typeof e === 'number';
                        }
                        data =
                            isNumber(dx) &&
                                isNumber(dy) &&
                                isNumber(dWidth) &&
                                isNumber(dHeight)
                                ? [
                                    imageResource,
                                    sx,
                                    sy,
                                    sWidth,
                                    sHeight,
                                    dx,
                                    dy,
                                    dWidth,
                                    dHeight,
                                ]
                                : isNumber(sWidth) && isNumber(sHeight)
                                    ? [imageResource, sx, sy, sWidth, sHeight]
                                    : [imageResource, sx, sy];
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data,
                        });
                    };
                default:
                    return function (...data) {
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data,
                        });
                    };
            }
        }
        CanvasContext.prototype[method] = get(method);
    });
    methods3.forEach(function (method) {
        function get(method) {
            switch (method) {
                case 'setFillStyle':
                case 'setStrokeStyle':
                    return function (color) {
                        if (typeof color !== 'object') {
                            // @ts-ignore
                            this.actions.push({
                                method,
                                data: ['normal', checkColor(color)],
                            });
                        }
                        else {
                            // @ts-ignore
                            this.actions.push({
                                method,
                                data: [color.type, color.data, color.colorStop],
                            });
                        }
                    };
                case 'setGlobalAlpha':
                    return function (alpha) {
                        alpha = Math.floor(255 * parseFloat(alpha));
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data: [alpha],
                        });
                    };
                case 'setShadow':
                    return function (offsetX, offsetY, blur, color) {
                        color = checkColor(color);
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data: [offsetX, offsetY, blur, color],
                        });
                        // @ts-ignore
                        this.state.shadowBlur = blur;
                        // @ts-ignore
                        this.state.shadowColor = color;
                        // @ts-ignore
                        this.state.shadowOffsetX = offsetX;
                        // @ts-ignore
                        this.state.shadowOffsetY = offsetY;
                    };
                case 'setLineDash':
                    return function (pattern, offset) {
                        pattern = pattern || [0, 0];
                        offset = offset || 0;
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data: [pattern, offset],
                        });
                        // @ts-ignore
                        this.state.lineDash = pattern;
                    };
                case 'setFontSize':
                    return function (fontSize) {
                        // @ts-ignore
                        this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + 'px');
                        // @ts-ignore
                        this.state.fontSize = fontSize;
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data: [fontSize],
                        });
                    };
                default:
                    return function (...data) {
                        // @ts-ignore
                        this.actions.push({
                            method,
                            data,
                        });
                    };
            }
        }
        CanvasContext.prototype[method] = get(method);
    });
});
const createCanvasContext = defineSyncApi(API_CREATE_CANVAS_CONTEXT, (canvasId, componentInstance) => {
    initCanvasContextProperty();
    if (componentInstance) {
        return new CanvasContext(canvasId, getPageIdByVm(componentInstance));
    }
    const pageId = getPageIdByVm(getCurrentPageVm());
    if (pageId) {
        return new CanvasContext(canvasId, pageId);
    }
    else {
        UniServiceJSBridge.emit(ON_ERROR, 'createCanvasContext:fail');
    }
}, CreateCanvasContextProtocol);
const canvasGetImageData = defineAsyncApi(API_CANVAS_GET_IMAGE_DATA, ({ canvasId, x, y, width, height }, { resolve, reject }) => {
    const pageId = getPageIdByVm(getCurrentPageVm());
    if (!pageId) {
        reject();
        return;
    }
    function callback(data) {
        if (data.errMsg && data.errMsg.indexOf('fail') !== -1) {
            reject('', data);
            return;
        }
        let imgData = data.data;
        if (imgData && imgData.length) {
            if (data.compressed) {
                imgData = pako_1.inflateRaw(imgData);
            }
            data.data = new Uint8ClampedArray(imgData);
        }
        delete data.compressed;
        resolve(data);
    }
    operateCanvas(canvasId, pageId, 'getImageData', {
        x,
        y,
        width,
        height,
    }, callback);
}, CanvasGetImageDataProtocol, CanvasGetImageDataOptions);
const canvasPutImageData = defineAsyncApi(API_CANVAS_PUT_IMAGE_DATA, ({ canvasId, data, x, y, width, height }, { resolve, reject }) => {
    var pageId = getPageIdByVm(getCurrentPageVm());
    if (!pageId) {
        reject();
        return;
    }
    let compressed;
    const operate = () => {
        operateCanvas(canvasId, pageId, 'putImageData', {
            data,
            x,
            y,
            width,
            height,
            compressed,
        }, (data) => {
            if (data.errMsg && data.errMsg.indexOf('fail') !== -1) {
                reject();
                return;
            }
            resolve(data);
        });
    };
    // iOS真机非调试模式压缩太慢暂时排除
    if ((plus.os.name !== 'iOS' || typeof __WEEX_DEVTOOL__ === 'boolean')) {
        data = pako_1.deflateRaw(data, { to: 'string' });
        compressed = true;
    }
    else {
        // fix ... 操作符
        data = Array.prototype.slice.call(data);
    }
    operate();
}, CanvasPutImageDataProtocol, CanvasPutImageDataOptions);
const canvasToTempFilePath = defineAsyncApi(API_CANVAS_TO_TEMP_FILE_PATH, ({ x = 0, y = 0, width, height, destWidth, destHeight, canvasId, fileType, quality, }, { resolve, reject }) => {
    var pageId = getPageIdByVm(getCurrentPageVm());
    if (!pageId) {
        reject();
        return;
    }
    const dirname = `${TEMP_PATH}/canvas`;
    operateCanvas(canvasId, pageId, 'toTempFilePath', {
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        fileType,
        quality,
        dirname,
    }, (res) => {
        if (res.errMsg && res.errMsg.indexOf('fail') !== -1) {
            reject('', res);
            return;
        }
        resolve(res);
    });
}, CanvasToTempFilePathProtocol, CanvasToTempFilePathOptions);

//#endregion
/**
 * 可以批量设置的监听事件
 */
const innerAudioContextEventNames = [
    'onCanplay',
    'onPlay',
    'onPause',
    'onStop',
    'onEnded',
    'onTimeUpdate',
    'onError',
    'onWaiting',
    'onSeeking',
    'onSeeked',
];
const innerAudioContextOffEventNames = [
    'offCanplay',
    'offPlay',
    'offPause',
    'offStop',
    'offEnded',
    'offTimeUpdate',
    'offError',
    'offWaiting',
    'offSeeking',
    'offSeeked',
];

const defaultOptions = {
    thresholds: [0],
    initialRatio: 0,
    observeAll: false,
};
const MARGINS = ['top', 'right', 'bottom', 'left'];
let reqComponentObserverId$1 = 1;
function normalizeRootMargin(margins = {}) {
    return MARGINS.map((name) => `${Number(margins[name]) || 0}px`).join(' ');
}
class ServiceIntersectionObserver {
    constructor(component, options) {
        this._pageId = getPageIdByVm(component);
        this._component = component;
        this._options = extend({}, defaultOptions, options);
    }
    relativeTo(selector, margins) {
        this._options.relativeToSelector = selector;
        this._options.rootMargin = normalizeRootMargin(margins);
        return this;
    }
    relativeToViewport(margins) {
        this._options.relativeToSelector = undefined;
        this._options.rootMargin = normalizeRootMargin(margins);
        return this;
    }
    observe(selector, callback) {
        if (!isFunction(callback)) {
            return;
        }
        this._options.selector = selector;
        this._reqId = reqComponentObserverId$1++;
        addIntersectionObserver({
            reqId: this._reqId,
            component: this._component,
            options: this._options,
            callback,
        }, this._pageId);
    }
    disconnect() {
        this._reqId &&
            removeIntersectionObserver({ reqId: this._reqId, component: this._component }, this._pageId);
    }
}
const createIntersectionObserver = defineSyncApi('createIntersectionObserver', (context, options) => {
    context = resolveComponentInstance(context);
    if (context && !getPageIdByVm(context)) {
        options = context;
        context = null;
    }
    if (context) {
        return new ServiceIntersectionObserver(context, options);
    }
    return new ServiceIntersectionObserver(getCurrentPageVm(), options);
});

let reqComponentObserverId = 1;
class ServiceMediaQueryObserver {
    constructor(component) {
        this._pageId = component.$page && component.$page.id;
        this._component = component;
    }
    observe(options, callback) {
        if (!isFunction(callback)) {
            return;
        }
        this._reqId = reqComponentObserverId++;
        addMediaQueryObserver({
            reqId: this._reqId,
            component: this._component,
            options,
            callback,
        }, this._pageId);
    }
    disconnect() {
        this._reqId &&
            removeMediaQueryObserver({
                reqId: this._reqId,
                component: this._component,
            }, this._pageId);
    }
}
const createMediaQueryObserver = defineSyncApi('createMediaQueryObserver', (context) => {
    context = resolveComponentInstance(context);
    if (context && !getPageIdByVm(context)) {
        context = null;
    }
    if (context) {
        return new ServiceMediaQueryObserver(context);
    }
    return new ServiceMediaQueryObserver(getCurrentPageVm());
});

// let eventReady = false
let index$2 = 0;
let optionsCache = {};
function operateEditor(componentId, pageId, type, options) {
    const data = { options };
    const needCallOptions = options &&
        ('success' in options || 'fail' in options || 'complete' in options);
    if (needCallOptions) {
        const callbackId = String(index$2++);
        data.callbackId = callbackId;
        optionsCache[callbackId] = options;
    }
    UniServiceJSBridge.invokeViewMethod(`editor.${componentId}`, {
        type,
        data,
    }, pageId, ({ callbackId, data }) => {
        if (needCallOptions) {
            callOptions(optionsCache[callbackId], data);
            delete optionsCache[callbackId];
        }
    });
}
class EditorContext {
    constructor(id, pageId) {
        this.id = id;
        this.pageId = pageId;
    }
    format(name, value) {
        this._exec('format', {
            name,
            value,
        });
    }
    insertDivider() {
        this._exec('insertDivider');
    }
    insertImage(options) {
        this._exec('insertImage', options);
    }
    insertText(options) {
        this._exec('insertText', options);
    }
    setContents(options) {
        this._exec('setContents', options);
    }
    getContents(options) {
        this._exec('getContents', options);
    }
    clear(options) {
        this._exec('clear', options);
    }
    removeFormat(options) {
        this._exec('removeFormat', options);
    }
    undo(options) {
        this._exec('undo', options);
    }
    redo(options) {
        this._exec('redo', options);
    }
    blur(options) {
        this._exec('blur', options);
    }
    getSelectionText(options) {
        this._exec('getSelectionText', options);
    }
    scrollIntoView(options) {
        this._exec('scrollIntoView', options);
    }
    _exec(method, options) {
        operateEditor(this.id, this.pageId, method, options);
    }
}

const ContextClasss = {
    canvas: CanvasContext,
    map: MapContext,
    video: VideoContext,
    editor: EditorContext,
};
function convertContext(result) {
    if (result && result.contextInfo) {
        const { id, type, page } = result.contextInfo;
        const ContextClass = ContextClasss[type];
        result.context = new ContextClass(id, page);
        delete result.contextInfo;
    }
}
class NodesRef {
    constructor(selectorQuery, component, selector, single) {
        this._selectorQuery = selectorQuery;
        this._component = component;
        this._selector = selector;
        this._single = single;
    }
    boundingClientRect(callback) {
        this._selectorQuery._push(this._selector, this._component, this._single, {
            id: true,
            dataset: true,
            rect: true,
            size: true,
        }, callback);
        return this._selectorQuery;
    }
    fields(fields, callback) {
        this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
        return this._selectorQuery;
    }
    scrollOffset(callback) {
        this._selectorQuery._push(this._selector, this._component, this._single, {
            id: true,
            dataset: true,
            scrollOffset: true,
        }, callback);
        return this._selectorQuery;
    }
    context(callback) {
        this._selectorQuery._push(this._selector, this._component, this._single, {
            context: true,
        }, callback);
        return this._selectorQuery;
    }
    node(_callback) {
        // TODO
        return this._selectorQuery;
    }
}
class SelectorQuery {
    constructor(page) {
        this._component = undefined;
        this._page = page;
        this._queue = [];
        this._queueCb = [];
    }
    exec(callback) {
        requestComponentInfo(this._page, this._queue, (res) => {
            const queueCbs = this._queueCb;
            res.forEach((result, index) => {
                if (isArray(result)) {
                    result.forEach(convertContext);
                }
                else {
                    convertContext(result);
                }
                const queueCb = queueCbs[index];
                if (isFunction(queueCb)) {
                    queueCb.call(this, result);
                }
            });
            // isFn(callback) &&
            if (isFunction(callback)) {
                callback.call(this, res);
            }
        });
        // TODO
        return this._nodesRef;
    }
    in(component) {
        this._component = resolveComponentInstance(component);
        return this;
    }
    select(selector) {
        return (this._nodesRef = new NodesRef(this, this._component, selector, true));
    }
    selectAll(selector) {
        return (this._nodesRef = new NodesRef(this, this._component, selector, false));
    }
    selectViewport() {
        return (this._nodesRef = new NodesRef(this, null, '', true));
    }
    _push(selector, component, single, fields, callback) {
        this._queue.push({
            component,
            selector,
            single,
            fields,
        });
        this._queueCb.push(callback);
    }
}
const createSelectorQuery = defineSyncApi('createSelectorQuery', (context) => {
    context = resolveComponentInstance(context);
    if (context && !getPageIdByVm(context)) {
        context = null;
    }
    return new SelectorQuery(context || getCurrentPageVm());
});

// import { elemInArray } from '../../helpers/protocol'
const API_CREATE_ANIMATION = 'createAnimation';
// const timingFunctions: API_TYPE_CREATE_ANIMATION_Timing_Function[] = [
//   'linear',
//   'ease',
//   'ease-in',
//   'ease-in-out',
//   'ease-out',
//   'step-start',
//   'step-end',
// ]
const CreateAnimationOptions = {
    // 目前参数校验不支持此api校验
    formatArgs: {
    /* duration: 400,
    timingFunction(timingFunction, params) {
      params.timingFunction = elemInArray(timingFunction, timingFunctions)
    },
    delay: 0,
    transformOrigin: '50% 50% 0', */
    },
};
const CreateAnimationProtocol = {
    duration: Number,
    timingFunction: String,
    delay: Number,
    transformOrigin: String,
};

const defaultOption = {
    duration: 400,
    timingFunction: 'linear',
    delay: 0,
    transformOrigin: '50% 50% 0',
};
class MPAnimation {
    constructor(option) {
        this.actions = [];
        this.currentTransform = {};
        this.currentStepAnimates = [];
        this.option = extend({}, defaultOption, option);
    }
    _getOption(option) {
        const _option = {
            transition: extend({}, this.option, option),
            transformOrigin: '',
        };
        _option.transformOrigin = _option.transition.transformOrigin;
        delete _option.transition.transformOrigin;
        return _option;
    }
    _pushAnimates(type, args) {
        this.currentStepAnimates.push({
            type: type,
            args: args,
        });
    }
    _converType(type) {
        return type.replace(/[A-Z]/g, (text) => {
            return `-${text.toLowerCase()}`;
        });
    }
    _getValue(value) {
        return typeof value === 'number' ? `${value}px` : value;
    }
    export() {
        const actions = this.actions;
        this.actions = [];
        return {
            actions,
        };
    }
    step(option) {
        this.currentStepAnimates.forEach((animate) => {
            if (animate.type !== 'style') {
                this.currentTransform[animate.type] = animate;
            }
            else {
                this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate;
            }
        });
        this.actions.push({
            animates: Object.values(this.currentTransform),
            option: this._getOption(option),
        });
        this.currentStepAnimates = [];
        return this;
    }
}
const initAnimationProperty = /*#__PURE__*/ once(() => {
    const animateTypes1 = [
        'matrix',
        'matrix3d',
        'rotate',
        'rotate3d',
        'rotateX',
        'rotateY',
        'rotateZ',
        'scale',
        'scale3d',
        'scaleX',
        'scaleY',
        'scaleZ',
        'skew',
        'skewX',
        'skewY',
        'translate',
        'translate3d',
        'translateX',
        'translateY',
        'translateZ',
    ];
    const animateTypes2 = ['opacity', 'backgroundColor'];
    const animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
    animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
        MPAnimation.prototype[type] = function (...args) {
            if (animateTypes2.concat(animateTypes3).includes(type)) {
                this._pushAnimates('style', [
                    this._converType(type),
                    animateTypes3.includes(type) ? this._getValue(args[0]) : args[0],
                ]);
            }
            else {
                this._pushAnimates(type, args);
            }
            return this;
        };
    });
});
const createAnimation = defineSyncApi(API_CREATE_ANIMATION, (option) => {
    initAnimationProperty();
    return new MPAnimation(option);
}, CreateAnimationProtocol, CreateAnimationOptions);

const API_ON_TAB_BAR_MID_BUTTON_TAP = 'onTabBarMidButtonTap';
const onTabBarMidButtonTap = defineOnApi(API_ON_TAB_BAR_MID_BUTTON_TAP, () => {
    // noop
});

const API_ON_WINDOW_RESIZE = 'onWindowResize';
const API_OFF_WINDOW_RESIZE = 'offWindowResize';

/**
 * 监听窗口大小变化
 */
const onWindowResize = defineOnApi(API_ON_WINDOW_RESIZE, () => {
    // 生命周期包括onResize，框架直接监听resize
    // window.addEventListener('resize', onResize)
});
/**
 * 取消监听窗口大小变化
 */
const offWindowResize = defineOffApi(API_OFF_WINDOW_RESIZE, () => {
    // window.removeEventListener('resize', onResize)
});

const API_SET_LOCALE = 'setLocale';
const API_GET_LOCALE = 'getLocale';
const API_ON_LOCALE_CHANGE = 'onLocaleChange';
const getLocale = defineSyncApi(API_GET_LOCALE, () => {
    // 优先使用 $locale
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
        return app.$vm.$locale;
    }
    return useI18n().getLocale();
});
const onLocaleChange = defineOnApi(API_ON_LOCALE_CHANGE, () => { });
const setLocale = defineSyncApi(API_SET_LOCALE, (locale) => {
    const app = getApp();
    if (!app) {
        return false;
    }
    const oldLocale = app.$vm.$locale;
    if (oldLocale !== locale) {
        app.$vm.$locale = locale;
        {
            const pages = getCurrentPages();
            pages.forEach((page) => {
                UniServiceJSBridge.publishHandler(API_SET_LOCALE, locale, page.$page.id);
            });
            weex.requireModule('plus').setLanguage(locale);
        }
        // 执行 uni.onLocaleChange
        UniServiceJSBridge.invokeOnCallback(API_ON_LOCALE_CHANGE, { locale });
        return true;
    }
    return false;
});

const API_SET_PAGE_META = 'setPageMeta';
const setPageMeta = defineAsyncApi(API_SET_PAGE_META, (options, { resolve }) => {
    resolve(setCurrentPageMeta(getCurrentPageVm(), options));
});

const API_GET_SELECTED_TEXT_RANGE = 'getSelectedTextRange';

const getSelectedTextRange = defineAsyncApi(API_GET_SELECTED_TEXT_RANGE, (_, { resolve, reject }) => {
    UniServiceJSBridge.invokeViewMethod(API_GET_SELECTED_TEXT_RANGE, {}, getCurrentPageId(), (res) => {
        if (typeof res.end === 'undefined' &&
            typeof res.start === 'undefined') {
            reject('no focused');
        }
        else {
            resolve(res);
        }
    });
});

const appHooks = {
    [ON_UNHANDLE_REJECTION]: [],
    [ON_PAGE_NOT_FOUND]: [],
    [ON_ERROR]: [],
    [ON_SHOW]: [],
    [ON_HIDE]: [],
};
function onAppHook(type, hook) {
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
        return injectHook(type, hook, app.$vm.$);
    }
    appHooks[type].push(hook);
}
function injectAppHooks(appInstance) {
    Object.keys(appHooks).forEach((type) => {
        appHooks[type].forEach((hook) => {
            injectHook(type, hook, appInstance);
        });
    });
}
function offAppHook(type, hook) {
    const app = getApp({ allowDefault: true });
    if (app && app.$vm) {
        return removeHook(app.$vm, type, hook);
    }
    remove(appHooks[type], hook);
}
function onUnhandledRejection(hook) {
    onAppHook(ON_UNHANDLE_REJECTION, hook);
}
function offUnhandledRejection(hook) {
    offAppHook(ON_UNHANDLE_REJECTION, hook);
}
function onPageNotFound(hook) {
    onAppHook(ON_PAGE_NOT_FOUND, hook);
}
function offPageNotFound(hook) {
    offAppHook(ON_PAGE_NOT_FOUND, hook);
}
function onError(hook) {
    onAppHook(ON_ERROR, hook);
}
function offError(hook) {
    offAppHook(ON_ERROR, hook);
}
function onAppShow(hook) {
    onAppHook(ON_SHOW, hook);
}
function offAppShow(hook) {
    offAppHook(ON_SHOW, hook);
}
function onAppHide(hook) {
    onAppHook(ON_HIDE, hook);
}
function offAppHide(hook) {
    offAppHook(ON_HIDE, hook);
}
const API_GET_ENTER_OPTIONS_SYNC = 'getEnterOptionsSync';
const getEnterOptionsSync = defineSyncApi(API_GET_ENTER_OPTIONS_SYNC, () => {
    return getEnterOptions();
});
const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync';
const getLaunchOptionsSync = defineSyncApi(API_GET_LAUNCH_OPTIONS_SYNC, () => {
    return getLaunchOptions();
});

let cid;
let cidErrMsg;
let enabled;
let offline;
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
        {
            offline = args.offline;
        }
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
    // App 端且启用离线时，使用 getClientInfoAsync 来调用
    if (offline) {
        plus.push.getClientInfoAsync((info) => {
            resolve({ cid: info.clientid });
        }, (res) => {
            reject(res.code + ': ' + res.message);
        });
        return;
    }
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
let listening = false;
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
const onPushMessage = (fn) => {
    if (onPushMessageCallbacks.indexOf(fn) === -1) {
        onPushMessageCallbacks.push(fn);
    }
    // 不能程序启动时就监听，因为离线事件，仅触发一次，框架监听后，无法转发给还没开始监听的开发者
    if (!listening) {
        listening = true;
        plus.push.addEventListener('click', (result) => {
            invokePushCallback({
                type: 'click',
                message: result,
            });
        });
        plus.push.addEventListener('receive', (result) => {
            invokePushCallback({
                type: 'pushMsg',
                message: result,
            });
        });
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

const API_CAN_I_USE = 'canIUse';
const CanIUseProtocol = [
    {
        name: 'schema',
        type: String,
        required: true,
    },
];

const API_GET_BACKGROUND_AUDIO_MANAGER = 'getBackgroundAudioManager';

const API_MAKE_PHONE_CALL = 'makePhoneCall';
const MakePhoneCallProtocol = {
    phoneNumber: String,
};

const API_ADD_PHONE_CONTACT = 'addPhoneContact';
const AddPhoneContactOptions = {
    formatArgs: {
        firstName(firstName) {
            if (!firstName)
                return 'addPhoneContact:fail parameter error: parameter.firstName should not be empty;';
        },
    },
};
const AddPhoneContactProtocol = {
    firstName: {
        type: String,
        required: true,
    },
    photoFilePath: String,
    nickName: String,
    lastName: String,
    middleName: String,
    remark: String,
    mobilePhoneNumber: String,
    weChatNumber: String,
    addressCountry: String,
    addressState: String,
    addressCity: String,
    addressStreet: String,
    addressPostalCode: String,
    organization: String,
    title: String,
    workFaxNumber: String,
    workPhoneNumber: String,
    hostNumber: String,
    email: String,
    url: String,
    workAddressCountry: String,
    workAddressState: String,
    workAddressCity: String,
    workAddressStreet: String,
    workAddressPostalCode: String,
    homeFaxNumber: String,
    homePhoneNumber: String,
    homeAddressCountry: String,
    homeAddressState: String,
    homeAddressCity: String,
    homeAddressStreet: String,
    homeAddressPostalCode: String,
};

const API_GET_CLIPBOARD_DATA = 'getClipboardData';
const API_SET_CLIPBOARD_DATA = 'setClipboardData';
const SetClipboardDataOptions = {
    formatArgs: {
        showToast: true,
    },
    beforeInvoke() {
        initI18nSetClipboardDataMsgsOnce();
    },
    beforeSuccess(res, params) {
        if (!params.showToast)
            return;
        const { t } = useI18n();
        const title = t('uni.setClipboardData.success');
        if (title) {
            uni.showToast({
                title: title,
                icon: 'success',
                mask: false,
            });
        }
    },
};
const SetClipboardDataProtocol = {
    data: {
        type: String,
        required: true,
    },
    showToast: {
        type: Boolean,
    },
};

const API_ON_ACCELEROMETER = 'onAccelerometer';
const API_OFF_ACCELEROMETER = 'offAccelerometer';
const API_START_ACCELEROMETER = 'startAccelerometer';
const API_STOP_ACCELEROMETER = 'stopAccelerometer';

const API_ON_COMPASS = 'onCompass';
const API_OFF_COMPASS = 'offCompass';
const API_START_COMPASS = 'startCompass';
const API_STOP_COMPASS = 'stopCompass';

const API_VIBRATE_SHORT = 'vibrateShort';
const API_VIBRATE_LONG = 'vibrateLong';

const API_ON_BLUETOOTH_DEVICE_FOUND = 'onBluetoothDeviceFound';
const API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE = 'onBluetoothAdapterStateChange';
const API_ON_BLE_CONNECTION_STATE_CHANGE = 'onBLEConnectionStateChange';
const API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE = 'onBLECharacteristicValueChange';
const API_START_BLUETOOTH_DEVICES_DISCOVERY = 'startBluetoothDevicesDiscovery';
const StartBluetoothDevicesDiscoveryProtocol = {
    services: Array,
    allowDuplicatesKey: Boolean,
    interval: Number,
};
const API_GET_CONNECTED_BLUETOOTH_DEVICES = 'getConnectedBluetoothDevices';
const GetConnectedBluetoothDevicesProtocol = {
    services: {
        type: Array,
        required: true,
    },
};
const API_CREATE_BLE_CONNECTION = 'createBLEConnection';
const CreateBLEConnectionProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
};
const API_CLOSE_BLE_CONNECTION = 'closeBLEConnection';
const CloseBLEConnectionProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
};
const API_GET_BLE_DEVICE_SERVICES = 'getBLEDeviceServices';
const GetBLEDeviceServicesProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
};
const API_GET_BLE_DEVICE_CHARACTERISTICS = 'getBLEDeviceCharacteristics';
const GetBLEDeviceCharacteristicsProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
};
const API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE = 'notifyBLECharacteristicValueChange';
const NotifyBLECharacteristicValueChangeProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    characteristicId: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
};
const API_READ_BLE_CHARACTERISTIC_VALUE = 'readBLECharacteristicValue';
const ReadBLECharacteristicValueProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    characteristicId: {
        type: String,
        required: true,
    },
};
const API_WRITE_BLE_CHARACTERISTIC_VALUE = 'writeBLECharacteristicValue';
const WriteBLECharacteristicValueProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    characteristicId: {
        type: String,
        required: true,
    },
    value: {
        type: Array,
        required: true,
    },
};
const API_SET_BLE_MTU = 'setBLEMTU';
const SetBLEMTUProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
    mtu: {
        type: Number,
        required: true,
    },
};
const API_GET_BLE_DEVICE_RSSI = 'getBLEDeviceRSSI';
const GetBLEDeviceRSSIProtocol = {
    deviceId: {
        type: String,
        required: true,
    },
};

const API_ON_BEACON_UPDATE = 'onBeaconUpdate';
const API_ON_BEACON_SERVICE_CHANGE = 'onBeaconServiceChange';
const API_GET_BEACONS = 'getBeacons';
const API_START_BEACON_DISCOVERY = 'startBeaconDiscovery';
const StartBeaconDiscoveryProtocol = {
    uuids: {
        type: Array,
        required: true,
    },
};
const API_STOP_BEACON_DISCOVERY = 'stopBeaconDiscovery';

const API_GET_SCREEN_BRIGHTNESS = 'getScreenBrightness';
const API_SET_SCREEN_BRIGHTNESS = 'setScreenBrightness';
const API_SET_KEEP_SCREEN_ON = 'setKeepScreenOn';

const API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION = 'checkIsSupportSoterAuthentication';
const API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE = 'checkIsSoterEnrolledInDevice';
const CheckAuthModes = [
    'fingerPrint',
    'facial',
    'speech',
];
const CheckIsSoterEnrolledInDeviceOptions = {
    formatArgs: {
        checkAuthMode(value, params) {
            if (!value || !CheckAuthModes.includes(value))
                return 'checkAuthMode 填写错误';
        },
    },
};
const CheckIsSoterEnrolledInDeviceProtocols = {
    checkAuthMode: String,
};
const API_START_SOTER_AUTHENTICATION = 'startSoterAuthentication';
const StartSoterAuthenticationOptions = {
    formatArgs: {
        requestAuthModes(value, params) {
            if (!value.includes('fingerPrint') && !value.includes('facial'))
                return 'requestAuthModes 填写错误';
        },
    },
};
const StartSoterAuthenticationProtocols = {
    requestAuthModes: {
        type: Array,
        required: true,
    },
    challenge: String,
    authContent: String,
};

const API_SCAN_CODE = 'scanCode';
const ScanCodeProtocol = {
    onlyFromCamera: Boolean,
    scanType: Array,
    autoDecodeCharSet: Boolean,
    sound: String,
    autoZoom: Boolean,
};
const SOUND = [
    'default',
    'none',
];
const ScanCodeOptions = {
    formatArgs: {
        sound(value, params) {
            if (!SOUND.includes(value))
                params.sound = 'none';
        },
        autoZoom(value, params) {
            if (typeof value === 'undefined')
                params.autoZoom = true;
        },
    },
};

const API_GET_SYSTEM_SETTING = 'getSystemSetting';

const API_GET_APP_AUTHORIZE_SETTING = 'getAppAuthorizeSetting';

const API_OPEN_APP_AUTHORIZE_SETTING = 'openAppAuthorizeSetting';

const API_GET_STORAGE = 'getStorage';
const GetStorageProtocol = {
    key: {
        type: String,
        required: true,
    },
};
const API_GET_STORAGE_SYNC = 'getStorageSync';
const GetStorageSyncProtocol = [
    {
        name: 'key',
        type: String,
        required: true,
    },
];
const API_SET_STORAGE = 'setStorage';
const SetStorageProtocol = {
    key: {
        type: String,
        required: true,
    },
    data: {
        required: true,
    },
};
const API_SET_STORAGE_SYNC = 'setStorageSync';
const SetStorageSyncProtocol = [
    {
        name: 'key',
        type: String,
        required: true,
    },
    {
        name: 'data',
        required: true,
    },
];
const API_REMOVE_STORAGE = 'removeStorage';
const RemoveStorageProtocol = GetStorageProtocol;
const RemoveStorageSyncProtocol = GetStorageSyncProtocol;

const API_SAVE_FILE = 'saveFile';
const SaveFileOptions = {
    formatArgs: {
        tempFilePath(savedFilePath, params) {
            params.tempFilePath = getRealPath(savedFilePath);
        },
    },
};
const SaveFileProtocol = {
    tempFilePath: {
        type: String,
        required: true,
    },
};

const API_GET_SAVED_LIST = 'getSavedFileList';

const API_REMOVE_SAVED_FILE = 'removeSavedFile';
const RemoveSavedFileOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const RemoveSavedFileProtocol = {
    filePath: {
        type: String,
        required: true,
    },
};

const API_GET_FILE_INFO = 'getFileInfo';
const GetFileInfoOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const GetFileInfoProtocol = {
    filePath: {
        type: String,
        required: true,
    },
};

const API_GET_SAVED_FILE_INFO = 'getSavedFileInfo';
const GetSavedFileInfoOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const GetSavedFileInfoProtocol = {
    filePath: {
        type: String,
        required: true,
    },
};

const API_OPEN_DOCUMENT = 'openDocument';
const OpenDocumentOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const OpenDocumentProtocol = {
    filePath: {
        type: String,
        required: true,
    },
    fileType: String,
};

const API_HIDE_KEYBOARD = 'hideKeyboard';
const API_SHOW_KEYBOARD = 'showKeyboard';

const API_CHOOSE_LOCATION = 'chooseLocation';
const ChooseLocationProtocol = {
    keyword: String,
    latitude: Number,
    longitude: Number,
};

const API_GET_LOCATION = 'getLocation';
const coordTypes$1 = ['wgs84', 'gcj02'];
const GetLocationOptions = {
    formatArgs: {
        type(value, params) {
            value = (value || '').toLowerCase();
            if (coordTypes$1.indexOf(value) === -1) {
                params.type = coordTypes$1[0];
            }
            else {
                params.type = value;
            }
        },
        altitude(value, params) {
            params.altitude = value ? value : false;
        },
    },
};
const GetLocationProtocol = {
    type: String,
    altitude: Boolean,
};

const API_OPEN_LOCATION = 'openLocation';
const checkProps = (key, value) => {
    if (value === undefined) {
        return `${key} should not be empty.`;
    }
    if (typeof value !== 'number') {
        let receivedType = typeof value;
        receivedType = receivedType[0].toUpperCase() + receivedType.substring(1);
        return `Expected Number, got ${receivedType} with value ${JSON.stringify(value)}.`;
    }
};
const OpenLocationOptions = {
    formatArgs: {
        latitude(value, params) {
            const checkedInfo = checkProps('latitude', value);
            if (checkedInfo) {
                return checkedInfo;
            }
            params.latitude = value;
        },
        longitude(value, params) {
            const checkedInfo = checkProps('longitude', value);
            if (checkedInfo) {
                return checkedInfo;
            }
            params.longitude = value;
        },
        scale(value, params) {
            value = Math.floor(value);
            params.scale = value >= 5 && value <= 18 ? value : 18;
        },
    },
};
const OpenLocationProtocol = {
    latitude: Number,
    longitude: Number,
    scale: Number,
    name: String,
    address: String,
};

const API_CHOOSE_IMAGE = 'chooseImage';
const ChooseImageOptions = {
    formatArgs: {
        count(value, params) {
            if (!value || value <= 0) {
                params.count = 9;
            }
        },
        sizeType(sizeType, params) {
            params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES);
        },
        sourceType(sourceType, params) {
            params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
        },
        extension(extension, params) {
            if (extension instanceof Array && extension.length === 0) {
                return 'param extension should not be empty.';
            }
            if (!extension)
                params.extension = ['*'];
        },
    },
};
const ChooseImageProtocol = {
    count: Number,
    sizeType: [Array, String],
    sourceType: Array,
    extension: Array,
};

const API_CHOOSE_VIDEO = 'chooseVideo';
const ChooseVideoOptions = {
    formatArgs: {
        sourceType(sourceType, params) {
            params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
        },
        compressed: true,
        maxDuration: 60,
        camera: 'back',
        extension(extension, params) {
            if (extension instanceof Array && extension.length === 0) {
                return 'param extension should not be empty.';
            }
            if (!extension)
                params.extension = ['*'];
        },
    },
};
const ChooseVideoProtocol = {
    sourceType: Array,
    compressed: Boolean,
    maxDuration: Number,
    camera: String,
    extension: Array,
};

const API_GET_IMAGE_INFO = 'getImageInfo';
const GetImageInfoOptions = {
    formatArgs: {
        src(src, params) {
            params.src = getRealPath(src);
        },
    },
};
const GetImageInfoProtocol = {
    src: {
        type: String,
        required: true,
    },
};

const API_PREVIEW_IMAGE = 'previewImage';
const PreviewImageOptions = {
    formatArgs: {
        urls(urls, params) {
            params.urls = urls.map((url) => isString(url) && url ? getRealPath(url) : '');
        },
        current(current, params) {
            if (typeof current === 'number') {
                params.current =
                    current > 0 && current < params.urls.length ? current : 0;
            }
            else if (isString(current) && current) {
                params.current = getRealPath(current);
            }
        },
    },
};
const PreviewImageProtocol = {
    urls: {
        type: Array,
        required: true,
    },
    current: {
        type: [Number, String],
    },
};
const API_CLOSE_PREVIEW_IMAGE = 'closePreviewImage';

const API_GET_VIDEO_INFO = 'getVideoInfo';
const GetVideoInfoOptions = {
    formatArgs: {
        src(src, params) {
            params.src = getRealPath(src);
        },
    },
};
const GetVideoInfoProtocol = {
    src: {
        type: String,
        required: true,
    },
};

const API_SAVE_IMAGE_TO_PHOTOS_ALBUM = 'saveImageToPhotosAlbum';
const SaveImageToPhotosAlbumOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const SaveImageToPhotosAlbumProtocol = {
    filePath: {
        type: String,
        required: true,
    },
};

const API_SAVE_VIDEO_TO_PHOTOS_ALBUM = 'saveVideoToPhotosAlbum';
const SaveVideoToPhotosAlbumOptions = {
    formatArgs: {
        filePath(filePath, params) {
            params.filePath = getRealPath(filePath);
        },
    },
};
const SaveVideoToPhotosAlbumProtocol = {
    filePath: {
        type: String,
        required: true,
    },
};

const API_GET_RECORDER_MANAGER = 'getRecorderManager';

const API_COMPRESS_IMAGE = 'compressImage';
const CompressImageOptions = {
    formatArgs: {
        src(src, params) {
            params.src = getRealPath(src);
        },
    },
};
const CompressImageProtocol = {
    src: {
        type: String,
        required: true,
    },
};

const API_COMPRESS_VIDEO = 'compressVideo';
const CompressVideoOptions = {
    formatArgs: {
        src(src, params) {
            params.src = getRealPath(src);
        },
    },
};
const CompressVideoProtocol = {
    src: {
        type: String,
        required: true,
    },
    quality: String,
    bitrate: Number,
    fps: Number,
    resolution: Number,
};

const API_REQUEST = 'request';
const dataType = {
    JSON: 'json',
};
const RESPONSE_TYPE = ['text', 'arraybuffer'];
const DEFAULT_RESPONSE_TYPE = 'text';
const encode$1 = encodeURIComponent;
function stringifyQuery(url, data) {
    let str = url.split('#');
    const hash = str[1] || '';
    str = str[0].split('?');
    let query = str[1] || '';
    url = str[0];
    const search = query.split('&').filter((item) => item);
    const params = {};
    search.forEach((item) => {
        const part = item.split('=');
        params[part[0]] = part[1];
    });
    for (const key in data) {
        if (hasOwn$1(data, key)) {
            let v = data[key];
            if (typeof v === 'undefined' || v === null) {
                v = '';
            }
            else if (isPlainObject(v)) {
                v = JSON.stringify(v);
            }
            params[encode$1(key)] = encode$1(v);
        }
    }
    query = Object.keys(params)
        .map((item) => `${item}=${params[item]}`)
        .join('&');
    return url + (query ? '?' + query : '') + (hash ? '#' + hash : '');
}
const RequestProtocol = {
    method: String,
    data: [Object, String, Array, ArrayBuffer],
    url: {
        type: String,
        required: true,
    },
    header: Object,
    dataType: String,
    responseType: String,
    withCredentials: Boolean,
};
const RequestOptions = {
    formatArgs: {
        method(value, params) {
            params.method = elemInArray((value || '').toUpperCase(), HTTP_METHODS);
        },
        data(value, params) {
            params.data = value || '';
        },
        url(value, params) {
            if (params.method === HTTP_METHODS[0] &&
                isPlainObject(params.data) &&
                Object.keys(params.data).length) {
                // 将 method,data 校验提前,保证 url 校验时,method,data 已被格式化
                params.url = stringifyQuery(value, params.data);
            }
        },
        header(value, params) {
            const header = (params.header = value || {});
            if (params.method !== HTTP_METHODS[0]) {
                if (!Object.keys(header).find((key) => key.toLowerCase() === 'content-type')) {
                    header['Content-Type'] = 'application/json';
                }
            }
        },
        dataType(value, params) {
            params.dataType = (value || dataType.JSON).toLowerCase();
        },
        responseType(value, params) {
            params.responseType = (value || '').toLowerCase();
            if (RESPONSE_TYPE.indexOf(params.responseType) === -1) {
                params.responseType = DEFAULT_RESPONSE_TYPE;
            }
        },
    },
};
const API_CONFIG_MTLS = 'configMTLS';
const ConfigMTLSProtocol = {
    certificates: {
        type: Array,
        required: true,
    },
};
const ConfigMTLSOptions = {
    formatArgs: {
        certificates(value) {
            if (value.some((item) => toRawType(item.host) !== 'String')) {
                return '参数配置错误，请确认后重试';
            }
        },
    },
};

const API_DOWNLOAD_FILE = 'downloadFile';
const DownloadFileOptions = {
    formatArgs: {
        header(value, params) {
            params.header = value || {};
        },
    },
};
const DownloadFileProtocol = {
    url: {
        type: String,
        required: true,
    },
    header: Object,
    timeout: Number,
};

const API_UPLOAD_FILE = 'uploadFile';
const UploadFileOptions = {
    formatArgs: {
        filePath(filePath, params) {
            if (filePath) {
                params.filePath = getRealPath(filePath);
            }
        },
        header(value, params) {
            params.header = value || {};
        },
        formData(value, params) {
            params.formData = value || {};
        },
    },
};
const UploadFileProtocol = {
    url: {
        type: String,
        required: true,
    },
    files: Array,
    filePath: String,
    name: String,
    header: Object,
    formData: Object,
    timeout: Number,
};

const API_CONNECT_SOCKET = 'connectSocket';
const ConnectSocketOptions = {
    formatArgs: {
        header(value, params) {
            params.header = value || {};
        },
        method(value, params) {
            params.method = elemInArray((value || '').toUpperCase(), HTTP_METHODS);
        },
        protocols(protocols, params) {
            if (isString(protocols)) {
                params.protocols = [protocols];
            }
        },
    },
};
const ConnectSocketProtocol = {
    url: {
        type: String,
        required: true,
    },
    header: {
        type: Object,
    },
    method: String,
    protocols: [Array, String],
};
const API_SEND_SOCKET_MESSAGE = 'sendSocketMessage';
const SendSocketMessageProtocol = {
    data: [String, ArrayBuffer],
};
const API_CLOSE_SOCKET = 'closeSocket';
const CloseSocketProtocol = {
    code: Number,
    reason: String,
};

const API_START_LOCATION_UPDATE = 'startLocationUpdate';
const API_ON_LOCATION_CHANGE = 'onLocationChange';
const API_STOP_LOCATION_UPDATE = 'stopLocationUpdate';
const API_OFF_LOCATION_CHANGE = 'offLocationChange';
const API_OFF_LOCATION_CHANGE_ERROR = 'offLocationChangeError';
const API_ON_LOCATION_CHANGE_ERROR = 'onLocationChangeError';
const coordTypes = ['wgs84', 'gcj02'];
const StartLocationUpdateProtocol = {
    type: String,
};
const StartLocationUpdateOptions = {
    formatArgs: {
        type(value, params) {
            value = (value || '').toLowerCase();
            if (coordTypes.indexOf(value) === -1) {
                params.type = coordTypes[1];
            }
            else {
                params.type = value;
            }
        },
    },
};

function encodeQueryString(url) {
    if (!isString(url)) {
        return url;
    }
    const index = url.indexOf('?');
    if (index === -1) {
        return url;
    }
    const query = url
        .slice(index + 1)
        .trim()
        .replace(/^(\?|#|&)/, '');
    if (!query) {
        return url;
    }
    url = url.slice(0, index);
    const params = [];
    query.split('&').forEach((param) => {
        const parts = param.replace(/\+/g, ' ').split('=');
        const key = parts.shift();
        const val = parts.length > 0 ? parts.join('=') : '';
        params.push(key + '=' + encodeURIComponent(val));
    });
    return params.length ? url + '?' + params.join('&') : url;
}

const ANIMATION_IN = [
    'slide-in-right',
    'slide-in-left',
    'slide-in-top',
    'slide-in-bottom',
    'fade-in',
    'zoom-out',
    'zoom-fade-out',
    'pop-in',
    'none',
];
const ANIMATION_OUT = [
    'slide-out-right',
    'slide-out-left',
    'slide-out-top',
    'slide-out-bottom',
    'fade-out',
    'zoom-in',
    'zoom-fade-in',
    'pop-out',
    'none',
];
const BaseRouteProtocol = {
    url: {
        type: String,
        required: true,
    },
};
const API_NAVIGATE_TO = 'navigateTo';
const API_REDIRECT_TO = 'redirectTo';
const API_RE_LAUNCH = 'reLaunch';
const API_SWITCH_TAB = 'switchTab';
const API_NAVIGATE_BACK = 'navigateBack';
const API_PRELOAD_PAGE = 'preloadPage';
const API_UN_PRELOAD_PAGE = 'unPreloadPage';
const NavigateToProtocol = 
/*#__PURE__*/ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
const NavigateBackProtocol = 
/*#__PURE__*/ extend({
    delta: {
        type: Number,
    },
}, createAnimationProtocol(ANIMATION_OUT));
const RedirectToProtocol = BaseRouteProtocol;
const ReLaunchProtocol = BaseRouteProtocol;
const SwitchTabProtocol = BaseRouteProtocol;
const PreloadPageProtocol = BaseRouteProtocol;
const UnPreloadPageProtocol = BaseRouteProtocol;
const NavigateToOptions = 
/*#__PURE__*/ createRouteOptions(API_NAVIGATE_TO);
const RedirectToOptions = 
/*#__PURE__*/ createRouteOptions(API_REDIRECT_TO);
const ReLaunchOptions = 
/*#__PURE__*/ createRouteOptions(API_RE_LAUNCH);
const SwitchTabOptions = 
/*#__PURE__*/ createRouteOptions(API_SWITCH_TAB);
const NavigateBackOptions = {
    formatArgs: {
        delta(value, params) {
            value = parseInt(value + '') || 1;
            params.delta = Math.min(getCurrentPages().length - 1, value);
        },
    },
};
function createAnimationProtocol(animationTypes) {
    return {
        animationType: {
            type: String,
            validator(type) {
                if (type && animationTypes.indexOf(type) === -1) {
                    return ('`' +
                        type +
                        '` is not supported for `animationType` (supported values are: `' +
                        animationTypes.join('`|`') +
                        '`)');
                }
            },
        },
        animationDuration: {
            type: Number,
        },
    };
}
let navigatorLock;
function beforeRoute() {
    navigatorLock = '';
}
function createRouteOptions(type) {
    return {
        formatArgs: {
            url: createNormalizeUrl(type),
        },
        beforeAll: beforeRoute,
    };
}
function createNormalizeUrl(type) {
    return function normalizeUrl(url, params) {
        if (!url) {
            return `Missing required args: "url"`;
        }
        // 格式化为绝对路径路由
        url = normalizeRoute(url);
        const pagePath = url.split('?')[0];
        // 匹配路由是否存在
        const routeOptions = getRouteOptions(pagePath, true);
        if (!routeOptions) {
            return 'page `' + url + '` is not found';
        }
        // 检测不同类型跳转
        if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
            if (routeOptions.meta.isTabBar) {
                return `can not ${type} a tabbar page`;
            }
        }
        else if (type === API_SWITCH_TAB) {
            if (!routeOptions.meta.isTabBar) {
                return 'can not switch to no-tabBar page';
            }
        }
        // switchTab不允许传递参数,reLaunch到一个tabBar页面是可以的
        if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) &&
            routeOptions.meta.isTabBar &&
            params.openType !== 'appLaunch') {
            url = pagePath;
        }
        // 首页自动格式化为`/`
        if (routeOptions.meta.isEntry) {
            url = url.replace(routeOptions.alias, '/');
        }
        // 参数格式化
        params.url = encodeQueryString(url);
        if (type === API_UN_PRELOAD_PAGE) {
            return;
        }
        else if (type === API_PRELOAD_PAGE) {
            {
                if (!routeOptions.meta.isNVue) {
                    return 'can not preload vue page';
                }
            }
            if (routeOptions.meta.isTabBar) {
                const pages = getCurrentPages();
                const tabBarPagePath = routeOptions.path.slice(1);
                if (pages.find((page) => page.route === tabBarPagePath)) {
                    return 'tabBar page `' + tabBarPagePath + '` already exists';
                }
            }
            return;
        }
        // 主要拦截目标为用户快速点击时触发的多次跳转，该情况，通常前后 url 是一样的
        if (navigatorLock === url && params.openType !== 'appLaunch') {
            return `${navigatorLock} locked`;
        }
        // 至少 onLaunch 之后，再启用lock逻辑（onLaunch之前可能开发者手动调用路由API，来提前跳转）
        // enableNavigatorLock 临时开关（不对外开放），避免该功能上线后，有部分情况异常，可以让开发者临时关闭 lock 功能
        if (__uniConfig.ready) {
            navigatorLock = url;
        }
    };
}

const API_HIDE_LOADING = 'hideLoading';

const API_HIDE_TOAST = 'hideToast';

const API_LOAD_FONT_FACE = 'loadFontFace';
const LoadFontFaceProtocol = {
    family: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    desc: Object,
};

const FRONT_COLORS = ['#ffffff', '#000000'];
const API_SET_NAVIGATION_BAR_COLOR = 'setNavigationBarColor';
const SetNavigationBarColorOptions = {
    formatArgs: {
        animation(animation, params) {
            if (!animation) {
                animation = { duration: 0, timingFunc: 'linear' };
            }
            params.animation = {
                duration: animation.duration || 0,
                timingFunc: animation.timingFunc || 'linear',
            };
        },
    },
};
const SetNavigationBarColorProtocol = {
    frontColor: {
        type: String,
        required: true,
        validator(frontColor) {
            if (FRONT_COLORS.indexOf(frontColor) === -1) {
                return `invalid frontColor "${frontColor}"`;
            }
        },
    },
    backgroundColor: {
        type: String,
        required: true,
    },
    animation: Object,
};
const API_SET_NAVIGATION_BAR_TITLE = 'setNavigationBarTitle';
const SetNavigationBarTitleProtocol = {
    title: {
        type: String,
        required: true,
    },
};
const API_SHOW_NAVIGATION_BAR_LOADING = 'showNavigationBarLoading';
const API_HIDE_NAVIGATION_BAR_LOADING = 'hideNavigationBarLoading';

const API_PAGE_SCROLL_TO = 'pageScrollTo';
const PageScrollToProtocol = {
    scrollTop: Number,
    selector: String,
    duration: Number,
};
const PageScrollToOptions = {
    formatArgs: {
        duration: 300,
    },
};

const API_SHOW_ACTION_SHEET = 'showActionSheet';
const ShowActionSheetProtocol = {
    itemList: {
        type: Array,
        required: true,
    },
    title: String,
    itemColor: String,
    popover: Object,
};
const ShowActionSheetOptions = {
    formatArgs: {
        itemColor: '#000',
    },
};

const API_SHOW_LOADING = 'showLoading';
const ShowLoadingProtocol = {
    title: String,
    mask: Boolean,
};
const ShowLoadingOptions = {
    formatArgs: {
        title: '',
        mask: false,
    },
};

const API_SHOW_MODAL = 'showModal';
const ShowModalProtocol = {
    title: String,
    content: String,
    showCancel: Boolean,
    cancelText: String,
    cancelColor: String,
    confirmText: String,
    confirmColor: String,
};
const ShowModalOptions = {
    beforeInvoke() {
        // dynamic init (tree shaking)
        initI18nShowModalMsgsOnce();
    },
    formatArgs: {
        title: '',
        content: '',
        placeholderText: '',
        showCancel: true,
        editable: false,
        cancelText(_value, params) {
            if (!hasOwn$1(params, 'cancelText')) {
                const { t } = useI18n();
                params.cancelText = t('uni.showModal.cancel');
            }
        },
        cancelColor: '#000',
        confirmText(_value, params) {
            if (!hasOwn$1(params, 'confirmText')) {
                const { t } = useI18n();
                params.confirmText = t('uni.showModal.confirm');
            }
        },
        confirmColor: PRIMARY_COLOR,
    },
};

const API_SHOW_TOAST = 'showToast';
const SHOW_TOAST_ICON = [
    'success',
    'loading',
    'none',
    'error',
];
const ShowToastProtocol = {
    title: String,
    icon: String,
    image: String,
    duration: Number,
    mask: Boolean,
};
const ShowToastOptions = {
    formatArgs: {
        title: '',
        icon(type, params) {
            params.icon = elemInArray(type, SHOW_TOAST_ICON);
        },
        image(value, params) {
            if (value) {
                params.image = getRealPath(value);
            }
            else {
                params.image = '';
            }
        },
        duration: 1500,
        mask: false,
    },
};

const API_START_PULL_DOWN_REFRESH = 'startPullDownRefresh';

const API_STOP_PULL_DOWN_REFRESH = 'stopPullDownRefresh';

const IndexProtocol = {
    index: {
        type: Number,
        required: true,
    },
};
const IndexOptions = {
    beforeInvoke() {
        const pageMeta = getCurrentPageMeta();
        if (pageMeta && !pageMeta.isTabBar) {
            return 'not TabBar page';
        }
    },
    formatArgs: {
        index(value) {
            if (!__uniConfig.tabBar.list[value]) {
                return 'tabbar item not found';
            }
        },
    },
};
const API_SET_TAB_BAR_ITEM = 'setTabBarItem';
const SetTabBarItemProtocol = 
/*#__PURE__*/ extend({
    text: String,
    iconPath: String,
    selectedIconPath: String,
    pagePath: String,
}, IndexProtocol);
const SetTabBarItemOptions = {
    beforeInvoke: IndexOptions.beforeInvoke,
    formatArgs: /*#__PURE__*/ extend({
        pagePath(value, params) {
            if (value) {
                params.pagePath = removeLeadingSlash(value);
            }
        },
    }, IndexOptions.formatArgs),
};
const API_SET_TAB_BAR_STYLE = 'setTabBarStyle';
const SetTabBarStyleProtocol = {
    color: String,
    selectedColor: String,
    backgroundColor: String,
    backgroundImage: String,
    backgroundRepeat: String,
    borderStyle: String,
};
const GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/;
const SetTabBarStyleOptions = {
    beforeInvoke: IndexOptions.beforeInvoke,
    formatArgs: {
        backgroundImage(value, params) {
            if (value && !GRADIENT_RE.test(value)) {
                params.backgroundImage = getRealPath(value);
            }
        },
        borderStyle(value, params) {
            if (value) {
                params.borderStyle = value === 'white' ? 'white' : 'black';
            }
        },
    },
};
const API_HIDE_TAB_BAR = 'hideTabBar';
const HideTabBarProtocol = {
    animation: Boolean,
};
const API_SHOW_TAB_BAR = 'showTabBar';
const ShowTabBarProtocol = HideTabBarProtocol;
const API_HIDE_TAB_BAR_RED_DOT = 'hideTabBarRedDot';
const HideTabBarRedDotProtocol = IndexProtocol;
const HideTabBarRedDotOptions = IndexOptions;
const API_SHOW_TAB_BAR_RED_DOT = 'showTabBarRedDot';
const ShowTabBarRedDotProtocol = IndexProtocol;
const ShowTabBarRedDotOptions = IndexOptions;
const API_REMOVE_TAB_BAR_BADGE = 'removeTabBarBadge';
const RemoveTabBarBadgeProtocol = IndexProtocol;
const RemoveTabBarBadgeOptions = IndexOptions;
const API_SET_TAB_BAR_BADGE = 'setTabBarBadge';
const SetTabBarBadgeProtocol = 
/*#__PURE__*/ extend({
    text: {
        type: String,
        required: true,
    },
}, IndexProtocol);
const SetTabBarBadgeOptions = {
    beforeInvoke: IndexOptions.beforeInvoke,
    formatArgs: /*#__PURE__*/ extend({
        text(value, params) {
            if (getLen(value) >= 4) {
                params.text = '...';
            }
        },
    }, IndexOptions.formatArgs),
};

const API_GET_PROVIDER = 'getProvider';
const GetProviderProtocol = {
    service: {
        type: String,
        required: true,
    },
};

const API_LOGIN = 'login';
const LoginProtocol = {
    provider: String,
    scopes: [String, Array],
    timeout: Number,
    univerifyStyle: Object,
    onlyAuthorize: Boolean,
};
const API_GET_USER_INFO = 'getUserInfo';
const GetUserInfoProtocol = {
    provider: String,
    withCredentials: Boolean,
    timeout: Number,
    lang: String,
};
const API_GET_USER_PROFILE = 'ggetUserProfilegetUserProfile';
const GgetUserProfileProtocol = {
    provider: String,
    withCredentials: Boolean,
    timeout: Number,
    lang: String,
};
const API_PRE_LOGIN = 'preLogin';
const provider = {
    UNIVERIFY: 'univerify',
};
const PreLoginOptions = {
    formatArgs: {
        provider(value, parmas) {
            if (Object.values(provider).indexOf(String(value)) < 0) {
                return 'provider error';
            }
        },
    },
};
const PreLoginProtocol = {
    provider: {
        type: String,
        required: true,
    },
};
const API_CLOSE_AUTH_VIEW = 'closeAuthView';
const API_GET_CHECK_BOX_STATE = 'getCheckBoxState';
const API_GET_UNIVERIFY_MANAGER = 'getUniverifyManager';

const API_SHREA = 'share';
const SCENE = [
    'WXSceneSession',
    'WXSceneTimeline',
    'WXSceneFavorite',
];
const SahreOptions = {
    formatArgs: {
        scene(value, params) {
            const { provider, openCustomerServiceChat } = params;
            if (provider === 'weixin' &&
                !openCustomerServiceChat &&
                (!value || !SCENE.includes(value))) {
                return `分享到微信时，scene必须为以下其中一个：${SCENE.join('、')}`;
            }
        },
        summary(value, params) {
            if (params.type === 1 && !value) {
                return '分享纯文本时，summary必填';
            }
        },
        href(value, params) {
            if (params.type === 0 && !value) {
                return '分享图文时，href必填';
            }
        },
        imageUrl(value, params) {
            if ([0, 2, 5].includes(Number(params.type)) && !value) {
                return '分享图文、纯图片、小程序时，imageUrl必填，推荐使用小于20Kb的图片';
            }
        },
        mediaUrl(value, params) {
            if ([3, 4].includes(Number(params.type)) && !value) {
                return '分享音乐、视频时，mediaUrl必填';
            }
        },
        miniProgram(value, params) {
            if (params.type === 5 && !value) {
                return '分享小程序时，miniProgram必填';
            }
        },
        corpid(value, params) {
            if (params.openCustomerServiceChat && !value) {
                return `使用打开客服功能时 corpid 必填`;
            }
        },
        customerUrl(value, params) {
            if (params.openCustomerServiceChat && !value) {
                return `使用打开客服功能时 customerUrl 必填`;
            }
        },
    },
};
const ShareProtocols = {
    provider: {
        type: String,
        required: true,
    },
    type: Number,
    title: String,
    scene: String,
    summary: String,
    href: String,
    imageUrl: String,
    mediaUrl: String,
    miniProgram: Object,
};
const API_SHARE_WITH_SYSTEM = 'shareWithSystem';
const TYPE = [
    'text',
    'image',
];
const ShareWithSystemOptions = {
    formatArgs: {
        type(value, params) {
            if (value && !TYPE.includes(value))
                return '分享参数 type 不正确。只支持text、image';
            params.type = elemInArray(value, TYPE);
        },
    },
};
const ShareWithSystemProtocols = {
    type: String,
    summary: String,
    href: String,
    imageUrl: String,
};

const API_REQUEST_PAYMENT = 'requestPayment';
const RequestPaymentProtocol = {
    provider: {
        type: String,
        required: true,
    },
    orderInfo: {
        type: [String, Object],
        required: true,
    },
    timeStamp: String,
    nonceStr: String,
    package: String,
    signType: String,
    paySign: String,
};

const API_CREATE_PUSH_MESSAGE = 'createPushMessage';
const CreatePushMessageOptions = {
    formatArgs: {
        content(value) {
            if (!value) {
                return `content is required`;
            }
        },
    },
};

const API_CREATE_REWARDED_VIDEO_AD = 'createRewardedVideoAd';
const CreateRewardedVideoAdOptions = {
    formatArgs: {
        adpid: '',
        adUnitId: '',
    },
};
const CreateRewardedVideoAdProtocol = {
    adpid: String,
    adUnitId: String,
};

const API_CREATE_FULL_SCREEN_VIDEO_AD = 'createFullScreenVideoAd';
const CreateFullScreenVideoAdOptions = {
    formatArgs: {
        adpid: '',
    },
};
const CreateFullScreenVideoAdProtocol = {
    adpid: String,
};

const API_CREATE_INTERSTITIAL_AD = 'createInterstitialAd';
const CreateInterstitialAdOptions = {
    formatArgs: {
        adpid: '',
        adUnitId: '',
    },
};
const CreateInterstitialAdProtocol = {
    adpid: String,
    adUnitId: String,
};

const API_CREATE_INTERACTIVE_AD = 'createInteractiveAd';
const CreateInteractiveAdOptions = {
    formatArgs: {
        adpid(value, params) {
            if (!value) {
                return 'adpid should not be empty.';
            }
            if (value)
                params.adpid = value;
        },
        provider(value, params) {
            if (!value) {
                return 'provider should not be empty.';
            }
            if (value)
                params.provider = value;
        },
    },
};
const CreateInteractiveAdProtocol = {
    adpid: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
};

function warpPlusSuccessCallback(resolve, after) {
    return function successCallback(data) {
        delete data.code;
        delete data.message;
        if (isFunction(after)) {
            data = after(data);
        }
        resolve(data);
    };
}
function warpPlusErrorCallback(reject, errMsg) {
    return function errorCallback(error) {
        error = error || {};
        // 一键登录errorCallback新增 appid、metadata、uid 参数返回
        errMsg = error.message || errMsg || '';
        delete error.message;
        reject(errMsg, extend({ code: 0 }, error));
    };
}
function warpPlusEvent(plusObject, event) {
    return function () {
        const object = plusObject();
        object(function (data) {
            if (data) {
                delete data.code;
                delete data.message;
            }
            UniServiceJSBridge.invokeOnCallback(event, data);
        });
    };
}
function warpPlusMethod(plusObject, before, after) {
    return function (options, { resolve, reject }) {
        const object = plusObject();
        object(extend({}, isFunction(before) ? before(options) : options, {
            success: warpPlusSuccessCallback(resolve, after),
            fail: warpPlusErrorCallback(reject),
        }));
    };
}
function isTabBarPage(path = '') {
    if (!(__uniConfig.tabBar && isArray(__uniConfig.tabBar.list))) {
        return false;
    }
    try {
        if (!path) {
            const pages = getCurrentPages();
            if (!pages.length) {
                return false;
            }
            const page = pages[pages.length - 1];
            if (!page) {
                return false;
            }
            return page.$page.meta.isTabBar;
        }
        if (!/^\//.test(path)) {
            path = addLeadingSlash(path);
        }
        const route = getRouteOptions(path);
        return route && route.meta.isTabBar;
    }
    catch (e) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('isTabBarPage', e));
        }
    }
    return false;
}

const STORAGE_DATA_TYPE = '__TYPE';
const STORAGE_KEYS = 'uni-storage-keys';
function parseValue(value) {
    const types = ['object', 'string', 'number', 'boolean', 'undefined'];
    try {
        const object = isString(value) ? JSON.parse(value) : value;
        const type = object.type;
        if (types.indexOf(type) >= 0) {
            const keys = Object.keys(object);
            if (keys.length === 2 && 'data' in object) {
                // eslint-disable-next-line valid-typeof
                if (typeof object.data === type) {
                    return object.data;
                }
                // eslint-disable-next-line no-useless-escape
                if (type === 'object' &&
                    /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) {
                    // ISO 8601 格式返回 Date
                    return new Date(object.data);
                }
            }
            else if (keys.length === 1) {
                return '';
            }
        }
    }
    catch (error) { }
}
const setStorageSync = defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
    const type = typeof data;
    const value = type === 'string'
        ? data
        : JSON.stringify({
            type,
            data: data,
        });
    try {
        if (type === 'string' && parseValue(value) !== undefined) {
            plus.storage.setItem(key + STORAGE_DATA_TYPE, type);
        }
        else {
            plus.storage.removeItem(key + STORAGE_DATA_TYPE);
        }
        plus.storage.setItem(key, value);
    }
    catch (error) { }
}, SetStorageSyncProtocol);
const setStorage = defineAsyncApi(API_SET_STORAGE, ({ key, data }, { resolve, reject }) => {
    const type = typeof data;
    const value = type === 'string'
        ? data
        : JSON.stringify({
            type,
            data: data,
        });
    try {
        const storage = plus.storage;
        if (type === 'string' && parseValue(value) !== undefined) {
            storage.setItemAsync(key + STORAGE_DATA_TYPE, type, () => { });
        }
        else {
            storage.removeItemAsync(key + STORAGE_DATA_TYPE, () => { });
        }
        storage.setItemAsync(key, value, resolve, warpPlusErrorCallback(reject));
    }
    catch (error) {
        reject(error.message);
    }
}, SetStorageProtocol);
function parseGetStorage(type, value) {
    let data = value;
    if (type !== 'string' ||
        (type === 'string' && value === '{"type":"undefined"}')) {
        try {
            // 兼容H5和V3初期历史格式
            let object = JSON.parse(value);
            const result = parseValue(object);
            if (result !== undefined) {
                data = result;
            }
            else if (type) {
                // 兼容App端历史格式
                data = object;
                if (isString(object)) {
                    object = JSON.parse(object);
                    const objectType = typeof object;
                    if (objectType === 'number' && type === 'date') {
                        data = new Date(object);
                    }
                    else if (objectType ===
                        (['null', 'array'].indexOf(type) < 0 ? type : 'object')) {
                        data = object;
                    }
                }
            }
        }
        catch (error) { }
    }
    return data;
}
const getStorageSync = defineSyncApi(API_GET_STORAGE_SYNC, (key) => {
    const value = plus.storage.getItem(key);
    const typeOrigin = plus.storage.getItem(key + STORAGE_DATA_TYPE) || '';
    const type = typeOrigin.toLowerCase();
    if (!isString(value)) {
        return '';
    }
    return parseGetStorage(type, value);
}, GetStorageSyncProtocol);
const getStorage = defineAsyncApi(API_GET_STORAGE, ({ key }, { resolve, reject }) => {
    const storage = plus.storage;
    storage.getItemAsync(key, function (res) {
        storage.getItemAsync(key + STORAGE_DATA_TYPE, function (typeRes) {
            const typeOrigin = typeRes.data || '';
            const type = typeOrigin.toLowerCase();
            resolve({
                data: parseGetStorage(type, res.data),
            });
        }, function () {
            const type = '';
            resolve({
                data: parseGetStorage(type, res.data),
            });
        });
    }, warpPlusErrorCallback(reject));
}, GetStorageProtocol);
const removeStorageSync = defineSyncApi(API_REMOVE_STORAGE, (key) => {
    plus.storage.removeItem(key + STORAGE_DATA_TYPE);
    plus.storage.removeItem(key);
}, RemoveStorageSyncProtocol);
const removeStorage = defineAsyncApi(API_REMOVE_STORAGE, ({ key }, { resolve, reject }) => {
    // 兼容App端历史格式
    plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE, () => { });
    plus.storage.removeItemAsync(key, resolve, warpPlusErrorCallback(reject));
}, RemoveStorageProtocol);
const clearStorageSync = defineSyncApi('clearStorageSync', () => {
    plus.storage.clear();
});
const clearStorage = defineAsyncApi('clearStorage', (_, { resolve, reject }) => {
    plus.storage.clearAsync(resolve, warpPlusErrorCallback(reject));
});
const getStorageInfoSync = defineSyncApi('getStorageInfoSync', () => {
    const length = plus.storage.getLength() || 0;
    const keys = [];
    let currentSize = 0;
    for (let index = 0; index < length; index++) {
        const key = plus.storage.key(index);
        if (key !== STORAGE_KEYS &&
            (key.indexOf(STORAGE_DATA_TYPE) < 0 ||
                key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !==
                    key.length)) {
            const value = plus.storage.getItem(key);
            currentSize += key.length + value.length;
            keys.push(key);
        }
    }
    return {
        keys,
        currentSize: Math.ceil((currentSize * 2) / 1024),
        limitSize: Number.MAX_VALUE,
    };
});
const getStorageInfo = defineAsyncApi('getStorageInfo', (_, { resolve }) => {
    resolve(getStorageInfoSync());
});

const getFileInfo$1 = defineAsyncApi(API_GET_FILE_INFO, (options, { resolve, reject }) => {
    plus.io.getFileInfo(extend(options, {
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
    }));
}, GetFileInfoProtocol, GetFileInfoOptions);

let index$1 = 0;
const SAVED_DIR$1 = 'uniapp_save';
const SAVE_PATH = `_doc/${SAVED_DIR$1}`;
function getSavedFileDir$1(success, fail) {
    fail = fail || function () { };
    plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
        // 请求_doc fs
        fs.root.getDirectory(SAVED_DIR$1, {
            // 获取文件保存目录对象
            create: true,
        }, success, fail);
    }, fail);
}
const saveFile = defineAsyncApi(API_SAVE_FILE, ({ tempFilePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    const fileName = `${Date.now()}${index$1++}${getExtName(tempFilePath)}`;
    plus.io.resolveLocalFileSystemURL(tempFilePath, (entry) => {
        // 读取临时文件 FileEntry
        getSavedFileDir$1((dir) => {
            entry.copyTo(dir, fileName, () => {
                // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
                const savedFilePath = SAVE_PATH + '/' + fileName;
                resolve({
                    savedFilePath,
                });
            }, errorCallback);
        }, errorCallback);
    }, errorCallback);
}, SaveFileProtocol, SaveFileOptions);

const SAVED_DIR = 'uniapp_save';
function getSavedFileDir(success, fail) {
    fail = fail || function () { };
    plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
        // 请求_doc fs
        fs.root.getDirectory(SAVED_DIR, {
            // 获取文件保存目录对象
            create: true,
        }, success, fail);
    }, fail);
}
const getSavedFileList = defineAsyncApi(API_GET_SAVED_LIST, (_, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    getSavedFileDir((entry) => {
        var reader = entry.createReader();
        var fileList = [];
        reader.readEntries((entries) => {
            if (entries && entries.length) {
                entries.forEach((entry) => {
                    entry.getMetadata((meta) => {
                        fileList.push({
                            filePath: plus.io.convertAbsoluteFileSystem(entry.fullPath),
                            createTime: meta.modificationTime.getTime(),
                            size: meta.size,
                        });
                        if (fileList.length === entries.length) {
                            resolve({
                                fileList,
                            });
                        }
                    }, errorCallback, false);
                });
            }
            else {
                resolve({
                    fileList,
                });
            }
        }, errorCallback);
    }, errorCallback);
});

const getSavedFileInfo = defineAsyncApi(API_GET_SAVED_FILE_INFO, ({ filePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
        entry.getMetadata((meta) => {
            resolve({
                createTime: meta.modificationTime.getTime(),
                size: meta.size,
            });
        }, errorCallback, false);
    }, errorCallback);
}, GetSavedFileInfoProtocol, GetSavedFileInfoOptions);

const removeSavedFile = defineAsyncApi(API_REMOVE_SAVED_FILE, ({ filePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
        entry.remove(() => {
            resolve();
        }, errorCallback);
    }, errorCallback);
}, RemoveSavedFileProtocol, RemoveSavedFileOptions);

const openDocument = defineAsyncApi(API_OPEN_DOCUMENT, ({ filePath, fileType }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    plus.runtime.openDocument(getRealPath(filePath), undefined, resolve, errorCallback);
}, OpenDocumentProtocol, OpenDocumentOptions);

const canIUse = defineSyncApi(API_CAN_I_USE, (schema) => {
    if (hasOwn$1(uni, schema)) {
        return true;
    }
    return false;
}, CanIUseProtocol);

let lastStatusBarStyle;
let oldSetStatusBarStyle = plus.navigator.setStatusBarStyle;
function restoreOldSetStatusBarStyle(setStatusBarStyle) {
    oldSetStatusBarStyle = setStatusBarStyle;
}
function newSetStatusBarStyle(style) {
    lastStatusBarStyle = style;
    oldSetStatusBarStyle(style);
}
plus.navigator.setStatusBarStyle = newSetStatusBarStyle;
function setStatusBarStyle(statusBarStyle) {
    if (!statusBarStyle) {
        const page = getCurrentPage();
        if (!page) {
            return;
        }
        statusBarStyle = page.$page.statusBarStyle;
        if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
            return;
        }
    }
    if (statusBarStyle === lastStatusBarStyle) {
        return;
    }
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('setStatusBarStyle', statusBarStyle));
    }
    lastStatusBarStyle = statusBarStyle;
    plus.navigator.setStatusBarStyle(statusBarStyle);
}

function onThemeChange$1(callback) {
    UniServiceJSBridge.on(ON_THEME_CHANGE, callback);
}
function offThemeChange$1(callback) {
    UniServiceJSBridge.off(ON_THEME_CHANGE, callback);
}
function getNavigatorStyle() {
    return getTheme() === 'dark' ? 'light' : 'dark';
}
function getTheme() {
    return plus.navigator.getUIStyle();
}
function changePagesNavigatorStyle() {
    if (__uniConfig.darkmode) {
        const theme = getNavigatorStyle();
        setStatusBarStyle(theme);
        const pages = getAllPages();
        pages.forEach((page) => {
            page.$page.statusBarStyle = theme;
        });
    }
}
function parseTheme(pageStyle) {
    if (__uniConfig.darkmode) {
        let parsedStyle = {};
        let theme = plus.navigator.getUIStyle();
        const systemInfo = weexGetSystemInfoSync();
        // 小程序 SDK
        if (systemInfo && systemInfo.hostTheme) {
            theme = systemInfo.hostTheme;
        }
        parsedStyle = normalizeStyles(pageStyle, __uniConfig.themeConfig, theme);
        return parsedStyle;
    }
    return pageStyle;
}
function useTabBarThemeChange(tabBar, options) {
    if (__uniConfig.darkmode) {
        const fn = () => {
            const { list = [], color, selectedColor, backgroundColor, borderStyle, } = parseTheme(options);
            tabBar &&
                tabBar.setTabBarStyle({
                    color,
                    selectedColor,
                    backgroundColor,
                    borderStyle,
                });
            tabBar &&
                tabBar.setTabBarItems({
                    list: list.map((item) => ({
                        iconPath: item.iconPath,
                        selectedIconPath: item.selectedIconPath,
                        visible: item.visible,
                    })),
                });
        };
        // 由于应用首次启动获取不到手机 theme 应用首次启动设置下 tabBar
        fn();
        onThemeChange$1(fn);
    }
}
function useWebviewThemeChange(webview, getWebviewStyle) {
    if (__uniConfig.darkmode) {
        const fn = () => {
            const webviewStyle = getWebviewStyle();
            ({
                animationAlphaBGColor: webviewStyle.animationAlphaBGColor,
                background: webviewStyle.background,
                backgroundColorBottom: webviewStyle.backgroundColorBottom,
                backgroundColorTop: webviewStyle.backgroundColorTop,
            });
            var titleNView = webviewStyle.titleNView;
            if (typeof titleNView !== 'undefined') {
                typeof titleNView === 'object'
                        ? {
                            backgroundColor: titleNView.backgroundColor,
                            titleColor: titleNView.titleColor,
                        }
                        : titleNView;
            }
            webview && webview.setStyle(webviewStyle);
        };
        onThemeChange$1(fn);
        webview.addEventListener('close', () => offThemeChange$1(fn));
    }
}

let config;
/**
 * tabbar显示状态
 */
let visible = true;
let tabBar;
/**
 * 设置角标
 * @param {string} type
 * @param {number} index
 * @param {string} text
 */
function setTabBarBadge$1(type, index, text) {
    if (!tabBar) {
        return;
    }
    if (type === 'none') {
        tabBar.hideTabBarRedDot({
            index,
        });
        tabBar.removeTabBarBadge({
            index,
        });
    }
    else if (type === 'text') {
        tabBar.setTabBarBadge({
            index,
            text,
        });
    }
    else if (type === 'redDot') {
        tabBar.showTabBarRedDot({
            index,
        });
    }
}
/**
 * 动态设置 tabBar 多项的内容
 */
function setTabBarItems(tabBarConfig) {
    tabBar && tabBar.setTabBarItems(tabBarConfig);
}
/**
 * 动态设置 tabBar 某一项的内容
 */
function setTabBarItem$1(index, text, iconPath, selectedIconPath, visible, iconfont) {
    const item = {
        index,
    };
    if (text !== undefined) {
        item.text = text;
    }
    if (iconPath) {
        item.iconPath = getRealPath(iconPath);
    }
    if (selectedIconPath) {
        item.selectedIconPath = getRealPath(selectedIconPath);
    }
    if (iconfont !== undefined) {
        item.iconfont = iconfont;
    }
    if (visible !== undefined) {
        item.visible = config.list[index].visible = visible;
        delete item.index;
        const tabbarItems = config.list.map((item) => ({
            visible: item.visible,
        }));
        tabbarItems[index] = item;
        setTabBarItems({ list: tabbarItems });
    }
    else {
        tabBar && tabBar.setTabBarItem(item);
    }
}
/**
 * 动态设置 tabBar 的整体样式
 * @param {Object} style 样式
 */
function setTabBarStyle$1(style) {
    tabBar && tabBar.setTabBarStyle(style);
}
/**
 * 隐藏 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function hideTabBar$1(animation) {
    visible = false;
    tabBar &&
        tabBar.hideTabBar({
            animation,
        });
}
/**
 * 显示 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function showTabBar$1(animation) {
    visible = true;
    tabBar &&
        tabBar.showTabBar({
            animation,
        });
}
const maskClickCallback = [];
var tabBarInstance = {
    id: '0',
    init(options, clickCallback) {
        if (options && options.list.length) {
            config = options;
        }
        try {
            tabBar = weex.requireModule('uni-tabview');
        }
        catch (error) {
            console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`);
        }
        tabBar.onMaskClick(() => {
            maskClickCallback.forEach((callback) => {
                callback();
            });
        });
        tabBar &&
            tabBar.onClick(({ index }) => {
                clickCallback(config.list[index], index);
            });
        tabBar &&
            tabBar.onMidButtonClick(() => {
                return UniServiceJSBridge.invokeOnCallback(API_ON_TAB_BAR_MID_BUTTON_TAP);
            });
        useTabBarThemeChange(tabBar, options);
    },
    indexOf(page) {
        const config = this.config;
        const itemLength = config && config.list && config.list.length;
        if (itemLength) {
            for (let i = 0; i < itemLength; i++) {
                if (config.list[i].pagePath === page ||
                    config.list[i].pagePath === `${page}.html`) {
                    return i;
                }
            }
        }
        return -1;
    },
    switchTab(page) {
        const index = this.indexOf(page);
        if (index >= 0) {
            tabBar &&
                tabBar.switchSelect({
                    index,
                });
            return true;
        }
        return false;
    },
    setTabBarBadge: setTabBarBadge$1,
    setTabBarItem: setTabBarItem$1,
    setTabBarStyle: setTabBarStyle$1,
    hideTabBar: hideTabBar$1,
    showTabBar: showTabBar$1,
    append(webview) {
        tabBar &&
            tabBar.append({
                id: webview.id,
            }, ({ code }) => {
                if (code !== 0) {
                    setTimeout(() => {
                        this.append(webview);
                    }, 20);
                }
            });
    },
    get config() {
        return config || __uniConfig.tabBar;
    },
    get visible() {
        return visible;
    },
    get height() {
        const config = this.config;
        return ((config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) +
            plus.navigator.getSafeAreaInsets().deviceBottom);
    },
    // tabBar是否遮挡内容区域
    get cover() {
        const config = this.config;
        const array = ['extralight', 'light', 'dark'];
        return config && array.indexOf(config.blurEffect) >= 0;
    },
    setStyle({ mask }) {
        tabBar.setMask({
            color: mask,
        });
    },
    addEventListener(_name, callback) {
        maskClickCallback.push(callback);
    },
    removeEventListener(_name, callback) {
        const callbackIndex = maskClickCallback.indexOf(callback);
        maskClickCallback.splice(callbackIndex, 1);
    },
};

function getCurrentWebview() {
    const page = getCurrentPage();
    if (page) {
        return page.$getAppWebview();
    }
    return null;
}
function getWebview(page) {
    if (page) {
        return page.$getAppWebview();
    }
    return getCurrentWebview();
}
let pullDownRefreshWebview = null;
function getPullDownRefreshWebview() {
    return pullDownRefreshWebview;
}
function setPullDownRefreshWebview(webview) {
    pullDownRefreshWebview = webview;
}

function getStatusbarHeight() {
    // 横屏时 iOS 获取的状态栏高度错误，进行纠正
    return plus.navigator.isImmersedStatusbar()
        ? Math.round(plus.os.name === 'iOS'
            ? plus.navigator.getSafeAreaInsets().top
            : plus.navigator.getStatusbarHeight())
        : 0;
}
function getStatusBarStyle() {
    let style = plus.navigator.getStatusBarStyle();
    if (style === 'UIStatusBarStyleBlackTranslucent' ||
        style === 'UIStatusBarStyleBlackOpaque' ||
        style === 'null') {
        style = 'light';
    }
    else if (style === 'UIStatusBarStyleDefault') {
        style = 'dark';
    }
    return style;
}

function getScreenInfo() {
    // 好像开发时刷新，偶发的 plus.screen.getCurrentSize 为 undefined
    const { resolutionWidth, resolutionHeight } = plus.screen.getCurrentSize() || {
        resolutionWidth: 0,
        resolutionHeight: 0,
    };
    return {
        screenWidth: Math.round(resolutionWidth),
        screenHeight: Math.round(resolutionHeight),
    };
}
const getWindowInfo = defineSyncApi('getWindowInfo', () => {
    const ios = plus.os.name.toLowerCase() === 'ios';
    const { screenWidth, screenHeight } = getScreenInfo();
    const statusBarHeight = getStatusbarHeight();
    let safeAreaInsets;
    const titleNView = {
        height: 0,
        cover: false,
    };
    const webview = getCurrentWebview();
    if (webview) {
        const webStyle = webview.getStyle();
        const style = webStyle && webStyle.titleNView;
        if (style && style.type && style.type !== 'none') {
            titleNView.height =
                style.type === 'transparent' ? 0 : statusBarHeight + NAVBAR_HEIGHT;
            titleNView.cover =
                style.type === 'transparent' || style.type === 'float';
        }
        safeAreaInsets = webview.getSafeAreaInsets();
    }
    else {
        safeAreaInsets = plus.navigator.getSafeAreaInsets();
    }
    const tabBarView = {
        height: 0,
        cover: false,
    };
    if (isTabBarPage()) {
        tabBarView.height = tabBarInstance.visible ? tabBarInstance.height : 0;
        tabBarView.cover = tabBarInstance.cover;
    }
    const windowTop = titleNView.cover ? titleNView.height : 0;
    const windowBottom = tabBarView.cover ? tabBarView.height : 0;
    let windowHeight = screenHeight - titleNView.height - tabBarView.height;
    let windowHeightReal = screenHeight -
        (titleNView.cover ? 0 : titleNView.height) -
        (tabBarView.cover ? 0 : tabBarView.height);
    const windowWidth = screenWidth;
    if ((!tabBarView.height || tabBarView.cover) &&
        !safeAreaInsets.bottom &&
        safeAreaInsets.deviceBottom) {
        windowHeight -= safeAreaInsets.deviceBottom;
        windowHeightReal -= safeAreaInsets.deviceBottom;
    }
    safeAreaInsets = ios
        ? safeAreaInsets
        : {
            left: 0,
            right: 0,
            top: titleNView.height && !titleNView.cover ? 0 : statusBarHeight,
            bottom: 0,
        };
    const safeArea = {
        left: safeAreaInsets.left,
        right: windowWidth - safeAreaInsets.right,
        top: safeAreaInsets.top,
        bottom: windowHeightReal - safeAreaInsets.bottom,
        width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
        height: windowHeightReal - safeAreaInsets.top - safeAreaInsets.bottom,
    };
    return {
        pixelRatio: plus.screen.scale,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        statusBarHeight,
        safeArea,
        safeAreaInsets: {
            top: safeAreaInsets.top,
            right: safeAreaInsets.right,
            bottom: safeAreaInsets.bottom,
            left: safeAreaInsets.left,
        },
        windowTop,
        windowBottom,
        screenTop: screenHeight - windowHeight,
    };
});

let systemInfo;
let _initSystemInfo = true;
function weexGetSystemInfoSync() {
    if (!_initSystemInfo)
        return;
    const { getSystemInfoSync } = weex.requireModule('plus');
    systemInfo = getSystemInfoSync();
    if (isString(systemInfo)) {
        try {
            systemInfo = JSON.parse(systemInfo);
        }
        catch (error) { }
    }
    return systemInfo;
}
const getDeviceInfo = defineSyncApi('getDeviceInfo', () => {
    weexGetSystemInfoSync();
    const { deviceBrand = '', deviceModel, osName, osVersion, deviceOrientation, deviceType, deviceId, } = systemInfo;
    const brand = deviceBrand.toLowerCase();
    const _osName = osName.toLowerCase();
    return {
        brand,
        deviceBrand: brand,
        deviceModel,
        devicePixelRatio: plus.screen.scale,
        deviceId,
        deviceOrientation,
        deviceType,
        model: deviceModel,
        platform: _osName,
        system: `${_osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`,
    };
});
const getAppBaseInfo = defineSyncApi('getAppBaseInfo', () => {
    weexGetSystemInfoSync();
    const { hostPackageName, hostName, hostVersion, hostLanguage, osLanguage, hostTheme, appId, appName, appVersion, appVersionCode, appWgtVersion, } = systemInfo;
    return {
        appId,
        appName,
        appVersion,
        appVersionCode,
        appWgtVersion,
        appLanguage: getLocale ? getLocale() : osLanguage,
        enableDebug: false,
        hostPackageName,
        hostName,
        hostVersion,
        hostLanguage,
        hostTheme,
        hostFontSizeSetting: undefined,
        hostSDKVersion: undefined,
        language: osLanguage,
        SDKVersion: '',
        theme: getTheme(),
        version: plus.runtime.innerVersion,
    };
});
const getSystemInfoSync = defineSyncApi('getSystemInfoSync', () => {
    _initSystemInfo = true;
    weexGetSystemInfoSync();
    _initSystemInfo = false;
    const windowInfo = getWindowInfo();
    const deviceInfo = getDeviceInfo();
    const appBaseInfo = getAppBaseInfo();
    _initSystemInfo = true;
    const extraData = {
        fontSizeSetting: appBaseInfo.hostFontSizeSetting,
        osName: systemInfo.osName.toLowerCase(),
    };
    if (systemInfo.hostName) {
        extraData.hostSDKVersion = systemInfo.uniRuntimeVersion;
    }
    const _systemInfo = extend(systemInfo, windowInfo, deviceInfo, appBaseInfo, extraData);
    delete _systemInfo.screenTop;
    delete _systemInfo.enableDebug;
    if (!__uniConfig.darkmode)
        delete _systemInfo.theme;
    return sortObject(_systemInfo);
});
const getSystemInfo = defineAsyncApi('getSystemInfo', (_, { resolve }) => {
    return resolve(getSystemInfoSync());
});

let listener$1 = null;
const onCompassChange = defineOnApi(API_ON_COMPASS, () => {
    startCompass();
});
const offCompassChange = defineOffApi(API_OFF_COMPASS, () => {
    stopCompass();
});
const startCompass = defineAsyncApi(API_START_COMPASS, (_, { resolve, reject }) => {
    if (!listener$1) {
        listener$1 = plus.orientation.watchOrientation((res) => {
            UniServiceJSBridge.invokeOnCallback(API_ON_COMPASS, {
                direction: res.magneticHeading,
            });
        }, (err) => {
            reject(err.message);
            listener$1 = null;
        }, {
            frequency: DEVICE_FREQUENCY,
        });
    }
    setTimeout(resolve, DEVICE_FREQUENCY);
});
const stopCompass = defineAsyncApi(API_STOP_COMPASS, (_, { resolve }) => {
    if (listener$1) {
        plus.orientation.clearWatch(listener$1);
        listener$1 = null;
    }
    resolve();
});

const vibrateShort = defineAsyncApi(API_VIBRATE_SHORT, (_, { resolve }) => {
    plus.device.vibrate(15);
    resolve();
});
const vibrateLong = defineAsyncApi(API_VIBRATE_LONG, (_, { resolve }) => {
    plus.device.vibrate(400);
    resolve();
});

let listener = null;
const onAccelerometerChange = defineOnApi(API_ON_ACCELEROMETER, () => {
    startAccelerometer();
});
const offAccelerometerChange = defineOffApi(API_OFF_ACCELEROMETER, () => {
    stopAccelerometer();
});
const startAccelerometer = defineAsyncApi(API_START_ACCELEROMETER, (_, { resolve, reject }) => {
    if (!listener) {
        listener = plus.accelerometer.watchAcceleration((res) => {
            UniServiceJSBridge.invokeOnCallback(API_ON_ACCELEROMETER, {
                x: (res && res.xAxis) || 0,
                y: (res && res.yAxis) || 0,
                z: (res && res.zAxis) || 0,
            });
        }, (err) => {
            listener = null;
            reject(`startAccelerometer:fail ${err.message}`);
        }, {
            frequency: DEVICE_FREQUENCY,
        });
    }
    setTimeout(resolve, DEVICE_FREQUENCY);
});
const stopAccelerometer = defineAsyncApi(API_STOP_ACCELEROMETER, (_, { resolve }) => {
    if (listener) {
        plus.accelerometer.clearWatch(listener);
        listener = null;
    }
    resolve();
});

const onBluetoothDeviceFound = defineOnApi(API_ON_BLUETOOTH_DEVICE_FOUND, warpPlusEvent(() => plus.bluetooth.onBluetoothDeviceFound.bind(plus.bluetooth), API_ON_BLUETOOTH_DEVICE_FOUND));
const onBluetoothAdapterStateChange = defineOnApi(API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBluetoothAdapterStateChange.bind(plus.bluetooth), API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE));
const onBLEConnectionStateChange = defineOnApi(API_ON_BLE_CONNECTION_STATE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBLEConnectionStateChange.bind(plus.bluetooth), API_ON_BLE_CONNECTION_STATE_CHANGE));
const onBLECharacteristicValueChange = defineOnApi(API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBLECharacteristicValueChange.bind(plus.bluetooth), API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE));
const openBluetoothAdapter = defineAsyncApi('openBluetoothAdapter', warpPlusMethod(() => plus.bluetooth.openBluetoothAdapter.bind(plus.bluetooth)));
const closeBluetoothAdapter = defineAsyncApi('closeBluetoothAdapter', warpPlusMethod(() => plus.bluetooth.closeBluetoothAdapter.bind(plus.bluetooth)));
const getBluetoothAdapterState = defineAsyncApi('getBluetoothAdapterState', warpPlusMethod(() => plus.bluetooth.getBluetoothAdapterState.bind(plus.bluetooth)));
const startBluetoothDevicesDiscovery = defineAsyncApi(API_START_BLUETOOTH_DEVICES_DISCOVERY, warpPlusMethod(() => plus.bluetooth.startBluetoothDevicesDiscovery.bind(plus.bluetooth)), StartBluetoothDevicesDiscoveryProtocol);
const stopBluetoothDevicesDiscovery = defineAsyncApi('stopBluetoothDevicesDiscovery', warpPlusMethod(() => plus.bluetooth.stopBluetoothDevicesDiscovery.bind(plus.bluetooth)));
const getBluetoothDevices = defineAsyncApi('getBluetoothDevices', warpPlusMethod(() => plus.bluetooth.getBluetoothDevices.bind(plus.bluetooth)));
const getConnectedBluetoothDevices = defineAsyncApi(API_GET_CONNECTED_BLUETOOTH_DEVICES, warpPlusMethod(() => plus.bluetooth.getConnectedBluetoothDevices.bind(plus.bluetooth)), GetConnectedBluetoothDevicesProtocol);
const createBLEConnection = defineAsyncApi(API_CREATE_BLE_CONNECTION, warpPlusMethod(() => plus.bluetooth.createBLEConnection.bind(plus.bluetooth)), CreateBLEConnectionProtocol);
const closeBLEConnection = defineAsyncApi(API_CLOSE_BLE_CONNECTION, warpPlusMethod(() => plus.bluetooth.closeBLEConnection.bind(plus.bluetooth)), CloseBLEConnectionProtocol);
const getBLEDeviceServices = defineAsyncApi(API_GET_BLE_DEVICE_SERVICES, warpPlusMethod(() => plus.bluetooth.getBLEDeviceServices.bind(plus.bluetooth)), GetBLEDeviceServicesProtocol);
const getBLEDeviceCharacteristics = defineAsyncApi(API_GET_BLE_DEVICE_CHARACTERISTICS, warpPlusMethod(() => plus.bluetooth.getBLEDeviceCharacteristics.bind(plus.bluetooth)), GetBLEDeviceCharacteristicsProtocol);
const notifyBLECharacteristicValueChange = defineAsyncApi(API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE, warpPlusMethod(() => plus.bluetooth.notifyBLECharacteristicValueChange.bind(plus.bluetooth)), NotifyBLECharacteristicValueChangeProtocol);
const readBLECharacteristicValue = defineAsyncApi(API_READ_BLE_CHARACTERISTIC_VALUE, warpPlusMethod(() => plus.bluetooth.readBLECharacteristicValue.bind(plus.bluetooth)), ReadBLECharacteristicValueProtocol);
const writeBLECharacteristicValue = defineAsyncApi(API_WRITE_BLE_CHARACTERISTIC_VALUE, warpPlusMethod(() => plus.bluetooth.writeBLECharacteristicValue.bind(plus.bluetooth)), WriteBLECharacteristicValueProtocol);
const setBLEMTU = defineAsyncApi(API_SET_BLE_MTU, warpPlusMethod(() => plus.bluetooth.setBLEMTU.bind(plus.bluetooth)), SetBLEMTUProtocol);
const getBLEDeviceRSSI = defineAsyncApi(API_GET_BLE_DEVICE_RSSI, warpPlusMethod(() => plus.bluetooth.getBLEDeviceRSSI.bind(plus.bluetooth)), GetBLEDeviceRSSIProtocol);

const onBeaconUpdate = defineOnApi(API_ON_BEACON_UPDATE, warpPlusEvent(() => plus.ibeacon.onBeaconUpdate.bind(plus.ibeacon), API_ON_BEACON_UPDATE));
const onBeaconServiceChange = defineOnApi(API_ON_BEACON_SERVICE_CHANGE, warpPlusEvent(() => plus.ibeacon.onBeaconServiceChange.bind(plus.ibeacon), API_ON_BEACON_SERVICE_CHANGE));
const getBeacons = defineAsyncApi(API_GET_BEACONS, warpPlusMethod(() => plus.ibeacon.getBeacons.bind(plus.ibeacon)));
const startBeaconDiscovery = defineAsyncApi(API_START_BEACON_DISCOVERY, warpPlusMethod(() => plus.ibeacon.startBeaconDiscovery.bind(plus.ibeacon)), StartBeaconDiscoveryProtocol);
const stopBeaconDiscovery = defineAsyncApi(API_STOP_BEACON_DISCOVERY, warpPlusMethod(() => plus.ibeacon.stopBeaconDiscovery.bind(plus.ibeacon)));

const makePhoneCall = defineAsyncApi(API_MAKE_PHONE_CALL, ({ phoneNumber }, { resolve }) => {
    plus.device.dial(phoneNumber);
    return resolve();
}, MakePhoneCallProtocol);

const schema = {
    name: {
        givenName: 'firstName',
        middleName: 'middleName',
        familyName: 'lastName',
    },
    nickname: 'nickName',
    photos: {
        type: 'url',
        value: 'photoFilePath',
    },
    note: 'remark',
    phoneNumbers: [
        {
            type: 'mobile',
            value: 'mobilePhoneNumber',
        },
        {
            type: 'work',
            value: 'workPhoneNumber',
        },
        {
            type: 'company',
            value: 'hostNumber',
        },
        {
            type: 'home fax',
            value: 'homeFaxNumber',
        },
        {
            type: 'work fax',
            value: 'workFaxNumber',
        },
    ],
    emails: [
        {
            type: 'home',
            value: 'email',
        },
    ],
    urls: [
        {
            type: 'other',
            value: 'url',
        },
    ],
    organizations: [
        {
            type: 'company',
            name: 'organization',
            title: 'title',
        },
    ],
    ims: [
        {
            type: 'other',
            value: 'weChatNumber',
        },
    ],
    addresses: [
        {
            type: 'other',
            preferred: true,
            country: 'addressCountry',
            region: 'addressState',
            locality: 'addressCity',
            streetAddress: 'addressStreet',
            postalCode: 'addressPostalCode',
        },
        {
            type: 'home',
            country: 'homeAddressCountry',
            region: 'homeAddressState',
            locality: 'homeAddressCity',
            streetAddress: 'homeAddressStreet',
            postalCode: 'homeAddressPostalCode',
        },
        {
            type: 'company',
            country: 'workAddressCountry',
            region: 'workAddressState',
            locality: 'workAddressCity',
            streetAddress: 'workAddressStreet',
            postalCode: 'workAddressPostalCode',
        },
    ],
};
const keepFields = ['type', 'preferred'];
function buildContact(contact, data, schema) {
    let hasValue = 0;
    Object.keys(schema).forEach((contactKey) => {
        const dataKey = schema[contactKey];
        const typed = typeof dataKey;
        if (typed !== 'object') {
            if (keepFields.indexOf(contactKey) !== -1) {
                contact[contactKey] = schema[contactKey];
            }
            else {
                if (typeof data[dataKey] !== 'undefined') {
                    hasValue++;
                    contact[contactKey] = data[dataKey];
                }
                else {
                    delete contact[contactKey];
                }
            }
        }
        else {
            if (dataKey instanceof Array) {
                contact[contactKey] = [];
                dataKey.forEach((item) => {
                    const obj = {};
                    if (buildContact(obj, data, item)) {
                        contact[contactKey].push(obj);
                    }
                });
                if (!contact[contactKey].length) {
                    delete contact[contactKey];
                }
                else {
                    hasValue++;
                }
            }
            else {
                contact[contactKey] = {};
                if (buildContact(contact[contactKey], data, dataKey)) {
                    hasValue++;
                }
                else {
                    delete contact[contactKey];
                }
            }
        }
    });
    return hasValue;
}
const addPhoneContact = defineAsyncApi(API_ADD_PHONE_CONTACT, (data, { resolve, reject }) => {
    !data.photoFilePath && (data.photoFilePath = '');
    plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
        const contact = addressbook.create();
        buildContact(contact, data, schema);
        contact.save(() => resolve(), (e) => reject());
    }, (e) => reject());
}, AddPhoneContactProtocol, AddPhoneContactOptions);

function requireNativePlugin(pluginName) {
    if (typeof weex !== 'undefined') {
        return weex.requireModule(pluginName);
    }
    return __requireNativePlugin__(pluginName);
}
function sendNativeEvent(event, data, callback) {
    // 实时获取weex module（weex可能会变化，比如首页nvue加速显示时）
    return requireNativePlugin('plus').sendNativeEvent(event, data, callback);
}

const getClipboardData = defineAsyncApi(API_GET_CLIPBOARD_DATA, (_, { resolve, reject }) => {
    const clipboard = requireNativePlugin('clipboard');
    clipboard.getString((ret) => {
        if (ret.result === 'success') {
            resolve({
                data: ret.data,
            });
        }
        else {
            reject('getClipboardData:fail');
        }
    });
});
const setClipboardData = defineAsyncApi(API_SET_CLIPBOARD_DATA, (options, { resolve }) => {
    const clipboard = requireNativePlugin('clipboard');
    clipboard.setString(options.data);
    resolve();
}, SetClipboardDataProtocol, SetClipboardDataOptions);

const API_ON_NETWORK_STATUS_CHANGE = 'onNetworkStatusChange';
function networkListener() {
    getNetworkType().then(({ networkType }) => {
        UniServiceJSBridge.invokeOnCallback(API_ON_NETWORK_STATUS_CHANGE, {
            isConnected: networkType !== 'none',
            networkType,
        });
    });
}
// 注意：框架对on类的API已做了统一的前置处理（仅首次调用on方法时，会调用具体的平台on实现，后续调用，框架不会再调用，实现时，直接监听平台事件即可）
const onNetworkStatusChange = defineOnApi(API_ON_NETWORK_STATUS_CHANGE, () => {
    plus.globalEvent.addEventListener('netchange', networkListener);
});
// 注意：框架对off类的API已做了统一的前置处理（仅当框架内不存在对应的on监听时，会调用具体的平台off实现，若还存在事件，框架不会再调用，具体实现时，直接移除平台事件即可）
const offNetworkStatusChange = defineOffApi('offNetworkStatusChange', () => {
    plus.globalEvent.removeEventListener('netchange', networkListener);
});
const getNetworkType = defineAsyncApi('getNetworkType', (_args, { resolve }) => {
    let networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()] || 'unknown';
    return resolve({ networkType });
});

function checkIsSupportFaceID() {
    const platform = plus.os.name.toLowerCase();
    if (platform !== 'ios') {
        return false;
    }
    const faceID = requireNativePlugin('faceID');
    return !!(faceID && faceID.isSupport());
}
function checkIsSupportFingerPrint() {
    return !!(plus.fingerprint && plus.fingerprint.isSupport());
}
const baseCheckIsSupportSoterAuthentication = (resolve) => {
    const supportMode = [];
    if (checkIsSupportFingerPrint()) {
        supportMode.push('fingerPrint');
    }
    if (checkIsSupportFaceID()) {
        supportMode.push('facial');
    }
    resolve &&
        resolve({
            supportMode,
        });
    return {
        supportMode,
        errMsg: 'checkIsSupportSoterAuthentication:ok',
    };
};
const checkIsSupportSoterAuthentication = defineAsyncApi(API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION, (_, { resolve, reject }) => {
    baseCheckIsSupportSoterAuthentication(resolve);
});
const basecheckIsSoterEnrolledInDevice = ({ checkAuthMode, resolve, reject, }) => {
    const wrapReject = (errMsg, errRes) => reject && reject(errMsg, errRes);
    const wrapResolve = (res) => resolve && resolve(res);
    if (checkAuthMode === 'fingerPrint') {
        if (checkIsSupportFingerPrint()) {
            const isEnrolled = plus.fingerprint.isKeyguardSecure() &&
                plus.fingerprint.isEnrolledFingerprints();
            wrapResolve({ isEnrolled });
            return {
                isEnrolled,
                errMsg: 'checkIsSoterEnrolledInDevice:ok',
            };
        }
        wrapReject('not support', { isEnrolled: false });
        return {
            isEnrolled: false,
            errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
        };
    }
    else if (checkAuthMode === 'facial') {
        if (checkIsSupportFaceID()) {
            const faceID = requireNativePlugin('faceID');
            const isEnrolled = faceID && faceID.isKeyguardSecure() && faceID.isEnrolledFaceID();
            wrapResolve({ isEnrolled });
            return {
                isEnrolled,
                errMsg: 'checkIsSoterEnrolledInDevice:ok',
            };
        }
        wrapReject('not support', { isEnrolled: false });
        return {
            isEnrolled: false,
            errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
        };
    }
    wrapReject('not support', { isEnrolled: false });
    return {
        isEnrolled: false,
        errMsg: 'checkIsSoterEnrolledInDevice:fail not support',
    };
};
const checkIsSoterEnrolledInDevice = defineAsyncApi(API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE, ({ checkAuthMode }, { resolve, reject }) => {
    basecheckIsSoterEnrolledInDevice({ checkAuthMode, resolve, reject });
}, CheckIsSoterEnrolledInDeviceProtocols, CheckIsSoterEnrolledInDeviceOptions);
const startSoterAuthentication = defineAsyncApi(API_START_SOTER_AUTHENTICATION, ({ requestAuthModes, challenge = false, authContent }, { resolve, reject }) => {
    /*
      以手机不支持facial未录入fingerPrint为例
      requestAuthModes:['facial','fingerPrint']时，微信小程序返回值里的authMode为"fingerPrint"
      requestAuthModes:['fingerPrint','facial']时，微信小程序返回值里的authMode为"fingerPrint"
      即先过滤不支持的方式之后再判断是否录入
      微信小程序errCode（从企业号开发者中心查到如下文档）：
      0：识别成功  'startSoterAuthentication:ok'
      90001：本设备不支持SOTER  'startSoterAuthentication:fail not support soter'
      90002：用户未授权微信使用该生物认证接口  注：APP端暂不支持
      90003：请求使用的生物认证方式不支持  'startSoterAuthentication:fail no corresponding mode'
      90004：未传入challenge或challenge长度过长（最长512字符）注：APP端暂不支持
      90005：auth_content长度超过限制（最长42个字符）注：微信小程序auth_content指纹识别时无效果，faceID暂未测试
      90007：内部错误  'startSoterAuthentication:fail auth key update error'
      90008：用户取消授权  'startSoterAuthentication:fail cancel'
      90009：识别失败  'startSoterAuthentication:fail'
      90010：重试次数过多被冻结  'startSoterAuthentication:fail authenticate freeze. please try again later'
      90011：用户未录入所选识别方式  'startSoterAuthentication:fail no fingerprint enrolled'
    */
    initI18nStartSoterAuthenticationMsgsOnce();
    const { t } = useI18n();
    const { supportMode } = baseCheckIsSupportSoterAuthentication();
    if (!supportMode.length) {
        return reject('not support', {
            authMode: 'fingerPrint',
            errCode: 90001,
        });
    }
    const supportRequestAuthMode = [];
    requestAuthModes.forEach((item) => {
        if (supportMode.indexOf(item) > -1) {
            supportRequestAuthMode.push(item);
        }
    });
    if (!supportRequestAuthMode.length) {
        return reject('startSoterAuthentication:fail no corresponding mode', {
            authMode: 'fingerPrint',
            errCode: 90003,
        });
    }
    const enrolledRequestAuthMode = [];
    supportRequestAuthMode.forEach((item) => {
        const checked = basecheckIsSoterEnrolledInDevice({
            checkAuthMode: item,
        }).isEnrolled;
        if (checked) {
            enrolledRequestAuthMode.push(item);
        }
    });
    if (!enrolledRequestAuthMode.length) {
        return reject(`startSoterAuthentication:fail no ${supportRequestAuthMode[0]} enrolled`, {
            authMode: supportRequestAuthMode[0],
            errCode: 90011,
        });
    }
    const realAuthMode = enrolledRequestAuthMode[0];
    let waiting = null;
    let waitingTimer;
    const authenticateMessage = authContent || t('uni.startSoterAuthentication.authContent');
    const errorCB = (err) => {
        const { code } = err;
        const res = {
            authMode: realAuthMode,
        };
        const handler = {
            // AUTHENTICATE_MISMATCH
            4: () => {
                if (waiting) {
                    clearTimeout(waitingTimer);
                    waiting.setTitle(t('uni.startSoterAuthentication.waitingContent'));
                    waitingTimer = setTimeout(() => {
                        waiting && waiting.setTitle(authenticateMessage);
                    }, 1000);
                }
                else {
                    reject('', extend(res, {
                        errCode: 90009,
                    }));
                }
            },
            // AUTHENTICATE_OVERLIMIT
            5: () => {
                // 微信小程序在第一次重试次数超限时安卓IOS返回不一致
                // 安卓端会返回次数超过限制（errCode: 90010）
                // IOS端会返回认证失败（errCode: 90009）
                // APP-IOS实际运行时不会次数超限，超过指定次数之后会弹出输入密码的界面
                plus.nativeUI.closeWaiting();
                reject('authenticate freeze. please try again later', extend(res, {
                    errCode: 90010,
                }));
            },
            // CANCEL
            6: () => {
                plus.nativeUI.closeWaiting();
                reject('cancel', extend(res, {
                    errCode: 90008,
                }));
            },
        };
        if (code && handler[code]) {
            handler[code]();
        }
        else {
            plus.nativeUI.closeWaiting();
            reject('', extend(res, {
                errCode: 90007,
            }));
        }
    };
    if (realAuthMode === 'fingerPrint') {
        if (plus.os.name.toLowerCase() === 'android') {
            waiting = plus.nativeUI.showWaiting(authenticateMessage);
            waiting.onclose = function () {
                plus.fingerprint.cancel();
            };
        }
        plus.fingerprint.authenticate(() => {
            plus.nativeUI.closeWaiting();
            resolve({
                authMode: realAuthMode,
                errCode: 0,
            });
        }, errorCB, {
            message: authenticateMessage,
        });
    }
    else if (realAuthMode === 'facial') {
        const faceID = requireNativePlugin('faceID');
        faceID.authenticate({
            message: authenticateMessage,
        }, (e) => {
            if (e.type === 'success' && e.code === 0) {
                resolve({
                    authMode: realAuthMode,
                    errCode: 0,
                });
            }
            else {
                errorCB(e);
            }
        });
    }
}, StartSoterAuthenticationProtocols, StartSoterAuthenticationOptions);

const scanCode = defineAsyncApi(API_SCAN_CODE, (options, { resolve, reject }) => {
    initI18nScanCodeMsgsOnce();
    const { t } = useI18n();
    const statusBarStyle = getStatusBarStyle();
    const isDark = statusBarStyle !== 'light';
    let result;
    let success = false;
    const page = showPage({
        url: '__uniappscan',
        data: Object.assign({}, options, {
            messages: {
                fail: t('uni.scanCode.fail'),
                'flash.on': t('uni.scanCode.flash.on'),
                'flash.off': t('uni.scanCode.flash.off'),
            },
        }),
        style: {
            // @ts-expect-error
            animationType: options.animationType || 'pop-in',
            titleNView: {
                autoBackButton: true,
                type: 'float',
                // @ts-expect-error
                titleText: options.titleText || t('uni.scanCode.title'),
                titleColor: '#ffffff',
                backgroundColor: 'rgba(0,0,0,0)',
                buttons: !options.onlyFromCamera
                    ? [
                        {
                            // @ts-expect-error
                            text: options.albumText || t('uni.scanCode.album'),
                            fontSize: '17px',
                            width: '60px',
                            onclick: () => {
                                page.sendMessage({
                                    type: 'gallery',
                                });
                            },
                        },
                    ]
                    : [],
            },
            popGesture: 'close',
            background: '#000000',
            backButtonAutoControl: 'close',
        },
        onMessage({ event, detail, }) {
            result = detail;
            success = event === 'marked';
        },
        onClose() {
            if (isDark) {
                plus.navigator.setStatusBarStyle('dark');
            }
            result
                ? success
                    ? (delete result.message, resolve(result))
                    : reject(result.message)
                : reject('cancel');
        },
    });
    if (isDark) {
        plus.navigator.setStatusBarStyle('light');
        page.webview.addEventListener('popGesture', ({ type, result }) => {
            if (type === 'start') {
                plus.navigator.setStatusBarStyle('dark');
            }
            else if (type === 'end' && !result) {
                plus.navigator.setStatusBarStyle('light');
            }
        });
    }
}, ScanCodeProtocol, ScanCodeOptions);

const themeChangeCallBack = (res) => {
    UniServiceJSBridge.invokeOnCallback(ON_THEME_CHANGE, res);
};
const onThemeChange = defineOnApi(ON_THEME_CHANGE, () => {
    UniServiceJSBridge.on(ON_THEME_CHANGE, themeChangeCallBack);
});
const offThemeChange = defineOffApi(OFF_THEME_CHANGE, () => {
    UniServiceJSBridge.off(ON_THEME_CHANGE, themeChangeCallBack);
});

const getScreenBrightness = defineAsyncApi(API_GET_SCREEN_BRIGHTNESS, (_, { resolve }) => {
    const value = plus.screen.getBrightness(false);
    resolve({ value });
});
const setScreenBrightness = defineAsyncApi(API_SET_SCREEN_BRIGHTNESS, (options, { resolve }) => {
    plus.screen.setBrightness(options.value, false);
    resolve();
});
const setKeepScreenOn = defineAsyncApi(API_SET_KEEP_SCREEN_ON, (options, { resolve }) => {
    plus.device.setWakelock(!!options.keepScreenOn);
    resolve();
});

const getSystemSetting = defineSyncApi(API_GET_SYSTEM_SETTING, () => {
    const { getSystemSetting } = weex.requireModule('plus');
    let systemSetting = getSystemSetting();
    try {
        if (typeof systemSetting === 'string')
            systemSetting = JSON.parse(systemSetting);
    }
    catch (error) { }
    return systemSetting;
});

const getAppAuthorizeSetting = defineSyncApi(API_GET_APP_AUTHORIZE_SETTING, () => {
    const { getAppAuthorizeSetting } = weex.requireModule('plus');
    let appAuthorizeSetting = getAppAuthorizeSetting();
    try {
        if (typeof appAuthorizeSetting === 'string')
            appAuthorizeSetting = JSON.parse(appAuthorizeSetting);
    }
    catch (error) { }
    for (const key in appAuthorizeSetting) {
        if (hasOwn$1(appAuthorizeSetting, key)) {
            const value = appAuthorizeSetting[key];
            // @ts-ignore
            if (value === 'undefined')
                appAuthorizeSetting[key] = undefined;
        }
    }
    return appAuthorizeSetting;
});

const openAppAuthorizeSetting = defineAsyncApi(API_OPEN_APP_AUTHORIZE_SETTING, (_, { resolve, reject }) => {
    const { openAppAuthorizeSetting } = weex.requireModule('plus');
    const fn = openAppAuthorizeSetting;
    fn((ret) => {
        if (ret.type === 'success') {
            resolve();
        }
        else {
            reject();
        }
    });
});

const getImageInfo = defineAsyncApi(API_GET_IMAGE_INFO, (options, { resolve, reject }) => {
    const path = TEMP_PATH + '/download/';
    plus.io.getImageInfo(extend(options, {
        savePath: path,
        filename: path,
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
    }));
}, GetImageInfoProtocol, GetImageInfoOptions);

const getVideoInfo = defineAsyncApi(API_GET_VIDEO_INFO, (options, { resolve, reject }) => {
    plus.io.getVideoInfo({
        filePath: options.src,
        success: (videoInfo) => {
            resolve({
                orientation: videoInfo.orientation,
                type: videoInfo.type,
                duration: videoInfo.duration,
                size: videoInfo.size,
                height: videoInfo.height,
                width: videoInfo.width,
                fps: videoInfo.fps || 30,
                bitrate: videoInfo.bitrate,
            });
        },
        fail: warpPlusErrorCallback(reject),
    });
}, GetVideoInfoProtocol, GetVideoInfoOptions);

const previewImage = defineAsyncApi(API_PREVIEW_IMAGE, ({ current = 0, indicator = 'number', loop = false, urls, longPressActions }, { resolve, reject }) => {
    initI18nPreviewImageMsgsOnce();
    const { t } = useI18n();
    urls = urls.map((url) => getRealPath(url));
    const index = Number(current);
    if (isNaN(index)) {
        current = urls.indexOf(getRealPath(current));
        current = current < 0 ? 0 : current;
    }
    else {
        current = index;
    }
    plus.nativeUI.previewImage(urls, {
        current,
        indicator,
        loop,
        onLongPress: function (res) {
            let itemList = [];
            let itemColor = '';
            const hasLongPressActions = longPressActions && isPlainObject(longPressActions);
            if (!hasLongPressActions) {
                itemList = [t('uni.previewImage.button.save')];
                itemColor = '#000000';
            }
            else {
                itemList = longPressActions.itemList
                    ? longPressActions.itemList
                    : [];
                itemColor = longPressActions.itemColor
                    ? longPressActions.itemColor
                    : '#000000';
            }
            const options = {
                buttons: itemList.map((item) => ({
                    title: item,
                    color: itemColor,
                })),
                cancel: t('uni.previewImage.cancel'),
            };
            plus.nativeUI.actionSheet(options, (e) => {
                if (e.index > 0) {
                    if (hasLongPressActions) {
                        isFunction(longPressActions.success) &&
                            longPressActions.success({
                                tapIndex: e.index - 1,
                                index: res.index,
                            });
                        return;
                    }
                    plus.gallery.save(res.url, () => {
                        plus.nativeUI.toast(t('uni.previewImage.save.success'));
                    }, function () {
                        plus.nativeUI.toast(t('uni.previewImage.save.fail'));
                    });
                }
                else if (hasLongPressActions) {
                    isFunction(longPressActions.fail) &&
                        longPressActions.fail({
                            errMsg: 'showActionSheet:fail cancel',
                        });
                }
            });
        },
    });
    resolve();
}, PreviewImageProtocol, PreviewImageOptions);
const closePreviewImage = defineAsyncApi(API_CLOSE_PREVIEW_IMAGE, (_, { resolve, reject }) => {
    try {
        // @ts-expect-error
        plus.nativeUI.closePreviewImage();
        resolve();
    }
    catch (error) {
        reject();
    }
});

let recorder;
let recording = false;
let recordTimeout;
const publishRecorderStateChange = (state, res = {}) => {
    onRecorderStateChange(extend({
        state,
    }, res));
};
const Recorder = {
    start({ duration = 60000, sampleRate, numberOfChannels, encodeBitRate, format = 'mp3', frameSize,
    // audioSource = 'auto',
     } = {}) {
        if (recording) {
            return publishRecorderStateChange('start');
        }
        recorder = plus.audio.getRecorder();
        recorder.record({
            format,
            samplerate: sampleRate ? String(sampleRate) : undefined,
            filename: TEMP_PATH + '/recorder/',
        }, (res) => publishRecorderStateChange('stop', {
            tempFilePath: res,
        }), (err) => publishRecorderStateChange('error', {
            errMsg: err.message,
        }));
        recordTimeout = setTimeout(() => {
            Recorder.stop();
        }, duration);
        publishRecorderStateChange('start');
        recording = true;
    },
    stop() {
        if (recording) {
            recorder.stop();
            recording = false;
            recordTimeout && clearTimeout(recordTimeout);
        }
    },
    pause() {
        if (recording) {
            publishRecorderStateChange('error', {
                errMsg: 'Unsupported operation: pause',
            });
        }
    },
    resume() {
        if (recording) {
            publishRecorderStateChange('error', {
                errMsg: 'Unsupported operation: resume',
            });
        }
    },
};
const callbacks$2 = {
    pause: null,
    resume: null,
    start: null,
    stop: null,
    error: null,
};
function onRecorderStateChange(res) {
    const state = res.state;
    delete res.state;
    delete res.errMsg;
    if (state && isFunction(callbacks$2[state])) {
        callbacks$2[state](res);
    }
}
class RecorderManager {
    constructor() { }
    onError(callback) {
        callbacks$2.error = callback;
    }
    onFrameRecorded(callback) { }
    onInterruptionBegin(callback) { }
    onInterruptionEnd(callback) { }
    onPause(callback) {
        callbacks$2.pause = callback;
    }
    onResume(callback) {
        callbacks$2.resume = callback;
    }
    onStart(callback) {
        callbacks$2.start = callback;
    }
    onStop(callback) {
        callbacks$2.stop = callback;
    }
    pause() {
        Recorder.pause();
    }
    resume() {
        Recorder.resume();
    }
    start(options = {}) {
        Recorder.start(options);
    }
    stop() {
        Recorder.stop();
    }
}
let recorderManager;
const getRecorderManager = defineSyncApi(API_GET_RECORDER_MANAGER, () => recorderManager || (recorderManager = new RecorderManager()));

const saveVideoToPhotosAlbum = defineAsyncApi(API_SAVE_VIDEO_TO_PHOTOS_ALBUM, (options, { resolve, reject }) => {
    plus.gallery.save(options.filePath, warpPlusSuccessCallback(resolve), warpPlusErrorCallback(reject));
}, SaveVideoToPhotosAlbumProtocol, SaveVideoToPhotosAlbumOptions);

const saveImageToPhotosAlbum = defineAsyncApi(API_SAVE_IMAGE_TO_PHOTOS_ALBUM, (options, { resolve, reject }) => {
    plus.gallery.save(options.filePath, warpPlusSuccessCallback(resolve), warpPlusErrorCallback(reject));
}, SaveImageToPhotosAlbumProtocol, SaveImageToPhotosAlbumOptions);

const compressImage = defineAsyncApi(API_COMPRESS_IMAGE, (options, { resolve, reject }) => {
    const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
    const { compressedWidth, compressedHeight } = options;
    if (typeof compressedWidth === 'number') {
        options.width = compressedWidth + 'px';
    }
    if (typeof compressedHeight === 'number') {
        options.height = compressedHeight + 'px';
    }
    plus.zip.compressImage(extend({}, options, {
        dst,
    }), () => {
        resolve({
            tempFilePath: dst,
        });
    }, reject);
}, CompressImageProtocol, CompressImageOptions);

const compressVideo = defineAsyncApi(API_COMPRESS_VIDEO, (options, { resolve, reject }) => {
    const filename = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
    plus.zip.compressVideo(extend({}, options, {
        filename,
    }), (videoInfo) => {
        resolve({
            tempFilePath: filename,
            size: videoInfo.size,
        });
    }, reject);
}, CompressVideoProtocol, CompressVideoOptions);

/**
 * 获取文件信息
 * @param {string} filePath 文件路径
 * @returns {Promise} 文件信息Promise
 */
function getFileInfo(filePath) {
    return new Promise((resolve, reject) => {
        plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
            entry.getMetadata(resolve, reject, false);
        }, reject);
    });
}
const chooseImage = defineAsyncApi(API_CHOOSE_IMAGE, ({ count, sizeType, sourceType, crop } = {}, { resolve, reject }) => {
    initI18nChooseImageMsgsOnce();
    const { t } = useI18n();
    const errorCallback = warpPlusErrorCallback(reject);
    function successCallback(paths) {
        const tempFiles = [];
        const tempFilePaths = [];
        Promise.all(paths.map((path) => getFileInfo(path)))
            .then((filesInfo) => {
            filesInfo.forEach((file, index) => {
                const path = paths[index];
                tempFilePaths.push(path);
                tempFiles.push({ path, size: file.size });
            });
            resolve({
                tempFilePaths,
                tempFiles,
            });
        })
            .catch(errorCallback);
    }
    function openCamera() {
        const camera = plus.camera.getCamera();
        camera.captureImage((path) => successCallback([path]), errorCallback, {
            filename: TEMP_PATH + '/camera/',
            resolution: 'high',
            crop,
            // @ts-expect-error
            sizeType,
        });
    }
    function openAlbum() {
        // @ts-ignore 5+此API分单选和多选，多选返回files:string[]
        plus.gallery.pick(({ files }) => successCallback(files), errorCallback, {
            maximum: count,
            multiple: true,
            system: false,
            filename: TEMP_PATH + '/gallery/',
            permissionAlert: true,
            crop,
            // @ts-expect-error
            sizeType,
        });
    }
    if (sourceType.length === 1) {
        if (sourceType.includes('album')) {
            openAlbum();
            return;
        }
        else if (sourceType.includes('camera')) {
            openCamera();
            return;
        }
    }
    plus.nativeUI.actionSheet({
        cancel: t('uni.chooseImage.cancel'),
        buttons: [
            {
                title: t('uni.chooseImage.sourceType.camera'),
            },
            {
                title: t('uni.chooseImage.sourceType.album'),
            },
        ],
    }, (e) => {
        switch (e.index) {
            case 1:
                openCamera();
                break;
            case 2:
                openAlbum();
                break;
            default:
                errorCallback();
                break;
        }
    });
}, ChooseImageProtocol, ChooseImageOptions);

const chooseVideo = defineAsyncApi(API_CHOOSE_VIDEO, ({ sourceType, compressed, maxDuration, camera }, { resolve, reject }) => {
    initI18nChooseVideoMsgsOnce();
    const { t } = useI18n();
    const errorCallback = warpPlusErrorCallback(reject);
    function successCallback(tempFilePath) {
        plus.io.getVideoInfo({
            filePath: tempFilePath,
            success(videoInfo) {
                const result = {
                    errMsg: 'chooseVideo:ok',
                    tempFilePath: tempFilePath,
                    size: videoInfo.size,
                    duration: videoInfo.duration,
                    width: videoInfo.width,
                    height: videoInfo.height,
                };
                // @ts-expect-error tempFile、name 仅H5支持
                resolve(result);
            },
            fail: errorCallback,
        });
    }
    function openAlbum() {
        plus.gallery.pick(
        // @ts-ignore 5+此API分单选和多选，多选返回files:string[]
        ({ files }) => successCallback(files[0]), errorCallback, {
            filter: 'video',
            system: false,
            // 不启用 multiple 时 system 无效
            multiple: true,
            maximum: 1,
            filename: TEMP_PATH + '/gallery/',
            permissionAlert: true,
            // @ts-expect-error 新增参数，用于视频压缩
            videoCompress: compressed,
        });
    }
    function openCamera() {
        const plusCamera = plus.camera.getCamera();
        plusCamera.startVideoCapture(successCallback, errorCallback, {
            index: camera === 'front' ? '2' : '1',
            videoMaximumDuration: maxDuration,
            filename: TEMP_PATH + '/camera/',
            // @ts-expect-error 新增参数，用于视频压缩
            videoCompress: compressed,
        });
    }
    if (sourceType.length === 1) {
        if (sourceType.includes('album')) {
            openAlbum();
            return;
        }
        else if (sourceType.includes('camera')) {
            openCamera();
            return;
        }
    }
    plus.nativeUI.actionSheet({
        cancel: t('uni.chooseVideo.cancel'),
        buttons: [
            {
                title: t('uni.chooseVideo.sourceType.camera'),
            },
            {
                title: t('uni.chooseVideo.sourceType.album'),
            },
        ],
    }, (e) => {
        switch (e.index) {
            case 1:
                openCamera();
                break;
            case 2:
                openAlbum();
                break;
            default:
                errorCallback();
                break;
        }
    });
}, ChooseVideoProtocol, ChooseVideoOptions);

const showKeyboard = defineAsyncApi(API_SHOW_KEYBOARD, (_, { resolve }) => {
    plus.key.showSoftKeybord();
    resolve();
});
const hideKeyboard = defineAsyncApi(API_HIDE_KEYBOARD, (_, { resolve }) => {
    plus.key.hideSoftKeybord();
    resolve();
});
function onKeyboardHeightChangeCallback(res) {
    UniServiceJSBridge.invokeOnCallback(ON_KEYBOARD_HEIGHT_CHANGE, res);
}
const onKeyboardHeightChange = defineOnApi(ON_KEYBOARD_HEIGHT_CHANGE, () => {
    UniServiceJSBridge.on(ON_KEYBOARD_HEIGHT_CHANGE, onKeyboardHeightChangeCallback);
});
const offKeyboardHeightChange = defineOffApi(ON_KEYBOARD_HEIGHT_CHANGE, () => {
    UniServiceJSBridge.off(ON_KEYBOARD_HEIGHT_CHANGE, onKeyboardHeightChangeCallback);
});

class DownloadTask {
    constructor(downloader) {
        this._callbacks = [];
        this._downloader = downloader;
        downloader.addEventListener('statechanged', (download, status) => {
            if (download.downloadedSize && download.totalSize) {
                this._callbacks.forEach((callback) => {
                    callback({
                        progress: Math.round((download.downloadedSize / download.totalSize) * 100),
                        totalBytesWritten: download.downloadedSize,
                        totalBytesExpectedToWrite: download.totalSize,
                    });
                });
            }
        });
    }
    abort() {
        this._downloader.abort();
    }
    onProgressUpdate(callback) {
        if (!isFunction(callback)) {
            return;
        }
        this._callbacks.push(callback);
    }
    offProgressUpdate(callback) {
        const index = this._callbacks.indexOf(callback);
        if (index >= 0) {
            this._callbacks.splice(index, 1);
        }
    }
    onHeadersReceived(callback) {
        throw new Error('Method not implemented.');
    }
    offHeadersReceived(callback) {
        throw new Error('Method not implemented.');
    }
}
const downloadFile = defineTaskApi(API_DOWNLOAD_FILE, ({ url, header, timeout }, { resolve, reject }) => {
    timeout =
        (timeout ||
            (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) ||
            60 * 1000) / 1000;
    const downloader = plus.downloader.createDownload(url, {
        timeout,
        filename: TEMP_PATH + '/download/',
        // 需要与其它平台上的表现保持一致，不走重试的逻辑。
        retry: 0,
        retryInterval: 0,
    }, (download, statusCode) => {
        if (statusCode) {
            resolve({
                tempFilePath: download.filename,
                statusCode,
            });
        }
        else {
            reject(`statusCode: ${statusCode}`);
        }
    });
    const downloadTask = new DownloadTask(downloader);
    for (const name in header) {
        if (hasOwn$1(header, name)) {
            downloader.setRequestHeader(name, header[name]);
        }
    }
    downloader.start();
    return downloadTask;
}, DownloadFileProtocol, DownloadFileOptions);

const cookiesParse = (header) => {
    let cookiesStr = header['Set-Cookie'] || header['set-cookie'];
    let cookiesArr = [];
    if (!cookiesStr) {
        return [];
    }
    if (cookiesStr[0] === '[' && cookiesStr[cookiesStr.length - 1] === ']') {
        cookiesStr = cookiesStr.slice(1, -1);
    }
    const handleCookiesArr = cookiesStr.split(';');
    for (let i = 0; i < handleCookiesArr.length; i++) {
        if (handleCookiesArr[i].indexOf('Expires=') !== -1 ||
            handleCookiesArr[i].indexOf('expires=') !== -1) {
            cookiesArr.push(handleCookiesArr[i].replace(',', ''));
        }
        else {
            cookiesArr.push(handleCookiesArr[i]);
        }
    }
    cookiesArr = cookiesArr.join(';').split(',');
    return cookiesArr;
};
function formatResponse(res, args) {
    if (isString(res.data) && res.data.charCodeAt(0) === 65279) {
        res.data = res.data.slice(1);
    }
    res.statusCode = parseInt(String(res.statusCode), 10);
    if (isPlainObject(res.header)) {
        res.header = Object.keys(res.header).reduce(function (ret, key) {
            const value = res.header[key];
            if (isArray(value)) {
                ret[key] = value.join(',');
            }
            else if (isString(value)) {
                ret[key] = value;
            }
            return ret;
        }, {});
    }
    if (args.dataType && args.dataType.toLowerCase() === 'json') {
        try {
            res.data = JSON.parse(res.data);
        }
        catch (e) { }
    }
    return res;
}
/**
 * 请求任务类
 */
class RequestTask {
    constructor(requestTask) {
        this._requestTask = requestTask;
    }
    abort() {
        this._requestTask.abort();
    }
    offHeadersReceived() { }
    onHeadersReceived() { }
}
const request = defineTaskApi(API_REQUEST, (args, { resolve, reject }) => {
    let { header, method, data, timeout, url, responseType, sslVerify, firstIpv4, 
    // @ts-ignore tls 缺少 types 类型
    tls, } = args;
    let contentType;
    for (const name in header) {
        if (name.toLowerCase() === 'content-type') {
            contentType = header[name];
            break;
        }
    }
    if (method !== 'GET' &&
        contentType.indexOf('application/json') === 0 &&
        isPlainObject(data)) {
        data = JSON.stringify(data);
    }
    const stream = requireNativePlugin('stream');
    const headers = {};
    let abortTimeout;
    let aborted;
    let hasContentType = false;
    for (const name in header) {
        if (!hasContentType && name.toLowerCase() === 'content-type') {
            hasContentType = true;
            headers['Content-Type'] = header[name];
            // TODO 需要重构
            if (method !== 'GET' &&
                header[name].indexOf('application/x-www-form-urlencoded') === 0 &&
                !isString(data) &&
                !(data instanceof ArrayBuffer)) {
                const bodyArray = [];
                for (const key in data) {
                    if (hasOwn$1(data, key)) {
                        bodyArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                    }
                }
                data = bodyArray.join('&');
            }
        }
        else {
            headers[name] = header[name];
        }
    }
    if (!hasContentType && method === 'POST') {
        headers['Content-Type'] =
            'application/x-www-form-urlencoded; charset=UTF-8';
    }
    if (timeout) {
        abortTimeout = setTimeout(() => {
            aborted = true;
            reject('timeout');
        }, timeout + 200); // TODO +200 发消息到原生层有时间开销，以后考虑由原生层回调超时
    }
    const options = {
        method,
        url: url.trim(),
        headers,
        type: responseType === 'arraybuffer' ? 'base64' : 'text',
        timeout: timeout || 6e5,
        // 配置和weex模块内相反
        sslVerify: !sslVerify,
        firstIpv4: firstIpv4,
        tls,
    };
    let withArrayBuffer = false;
    if (method !== 'GET') {
        if (toString.call(data) === '[object ArrayBuffer]') {
            withArrayBuffer = true;
        }
        else {
            options.body = isString(data) ? data : JSON.stringify(data);
        }
    }
    const callback = ({ ok, status, data, headers, errorMsg, }) => {
        if (aborted) {
            return;
        }
        if (abortTimeout) {
            clearTimeout(abortTimeout);
        }
        const statusCode = status;
        if (statusCode > 0) {
            resolve(formatResponse({
                data: ok && responseType === 'arraybuffer'
                    ? base64ToArrayBuffer(data)
                    : data,
                statusCode,
                header: headers,
                cookies: cookiesParse(headers),
            }, args));
        }
        else {
            let errMsg = 'abort statusCode:' + statusCode;
            if (errorMsg) {
                errMsg = errMsg + ' ' + errorMsg;
            }
            reject(errMsg);
        }
    };
    if (withArrayBuffer) {
        stream.fetchWithArrayBuffer({
            '@type': 'binary',
            base64: arrayBufferToBase64(data),
        }, options, callback);
    }
    else {
        stream.fetch(options, callback);
    }
    return new RequestTask({
        abort() {
            aborted = true;
            if (abortTimeout) {
                clearTimeout(abortTimeout);
            }
            reject('abort');
        },
    });
}, RequestProtocol, RequestOptions);
const configMTLS = defineAsyncApi(API_CONFIG_MTLS, ({ certificates }, { resolve, reject }) => {
    const stream = requireNativePlugin('stream');
    stream.configMTLS(certificates, ({ type, code, message }) => {
        switch (type) {
            case 'success':
                resolve({ code });
                break;
            case 'fail':
                reject(message, { code });
                break;
        }
    });
}, ConfigMTLSProtocol, ConfigMTLSOptions);

const socketTasks = [];
const socketsMap = {};
const globalEvent = {
    open: '',
    close: '',
    error: '',
    message: '',
};
let socket;
function createSocketTask(args) {
    const socketId = String(Date.now());
    let errMsg;
    try {
        if (!socket) {
            socket = requireNativePlugin('uni-webSocket');
            bindSocketCallBack(socket);
        }
        socket.WebSocket({
            id: socketId,
            url: args.url,
            protocol: isArray(args.protocols)
                ? args.protocols.join(',')
                : args.protocols,
            header: args.header,
        });
    }
    catch (error) {
        errMsg = error;
    }
    return { socket, socketId, errMsg };
}
function bindSocketCallBack(socket) {
    socket.onopen((e) => {
        const curSocket = socketsMap[e.id];
        if (!curSocket)
            return;
        curSocket._socketOnOpen();
    });
    socket.onmessage((e) => {
        const curSocket = socketsMap[e.id];
        if (!curSocket)
            return;
        curSocket._socketOnMessage(e);
    });
    socket.onerror((e) => {
        const curSocket = socketsMap[e.id];
        if (!curSocket)
            return;
        curSocket._socketOnError();
    });
    socket.onclose((e) => {
        const { id, code, reason } = e;
        const curSocket = socketsMap[id];
        if (!curSocket)
            return;
        curSocket._socketOnClose({ code, reason });
    });
}
class SocketTask {
    constructor(socket, socketId) {
        this.id = socketId;
        this._socket = socket;
        this._callbacks = {
            open: [],
            close: [],
            error: [],
            message: [],
        };
        this.CLOSED = 3;
        this.CLOSING = 2;
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.readyState = this.CLOSED;
        if (!this._socket)
            return;
    }
    _socketOnOpen() {
        this.readyState = this.OPEN;
        this.socketStateChange('open');
    }
    _socketOnMessage(e) {
        this.socketStateChange('message', {
            data: typeof e.data === 'object'
                ? base64ToArrayBuffer(e.data.base64)
                : e.data,
        });
    }
    _socketOnError() {
        this.socketStateChange('error');
        this.onErrorOrClose();
    }
    _socketOnClose(res) {
        this.socketStateChange('close', res);
        this.onErrorOrClose();
    }
    onErrorOrClose() {
        this.readyState = this.CLOSED;
        delete socketsMap[this.id];
        const index = socketTasks.indexOf(this);
        if (index >= 0) {
            socketTasks.splice(index, 1);
        }
    }
    socketStateChange(name, res = {}) {
        const { code, reason } = res;
        const data = name === 'message'
            ? { data: res.data }
            : name === 'close'
                ? { code, reason }
                : {};
        if (this === socketTasks[0] && globalEvent[name]) {
            UniServiceJSBridge.invokeOnCallback(globalEvent[name], data);
        }
        // WYQ fix: App平台修复websocket onOpen时发送数据报错的Bug
        this._callbacks[name].forEach((callback) => {
            if (isFunction(callback)) {
                callback(data);
            }
        });
    }
    send(args, callopt = true) {
        if (this.readyState !== this.OPEN) {
            callOptions(args, 'sendSocketMessage:fail WebSocket is not connected');
        }
        try {
            this._socket.send({
                id: this.id,
                data: typeof args.data === 'object'
                    ? {
                        '@type': 'binary',
                        base64: arrayBufferToBase64(args.data),
                    }
                    : args.data,
            });
            callopt && callOptions(args, 'sendSocketMessage:ok');
        }
        catch (error) {
            callopt && callOptions(args, `sendSocketMessage:fail ${error}`);
        }
    }
    close(args, callopt = true) {
        this.readyState = this.CLOSING;
        try {
            this._socket.close(extend({
                id: this.id,
                args,
            }));
            callopt && callOptions(args, 'closeSocket:ok');
        }
        catch (error) {
            callopt && callOptions(args, `closeSocket:fail ${error}`);
        }
    }
    onOpen(callback) {
        this._callbacks.open.push(callback);
    }
    onClose(callback) {
        this._callbacks.close.push(callback);
    }
    onError(callback) {
        this._callbacks.error.push(callback);
    }
    onMessage(callback) {
        this._callbacks.message.push(callback);
    }
}
const connectSocket = defineTaskApi(API_CONNECT_SOCKET, ({ url, protocols, header, method }, { resolve, reject }) => {
    const { socket, socketId, errMsg } = createSocketTask({
        url,
        protocols,
        header,
        method,
    });
    const socketTask = new SocketTask(socket, socketId);
    if (errMsg) {
        setTimeout(() => {
            reject(errMsg);
        }, 0);
    }
    else {
        socketTasks.push(socketTask);
        socketsMap[socketId] = socketTask;
    }
    setTimeout(() => {
        resolve();
    }, 0);
    return socketTask;
}, ConnectSocketProtocol, ConnectSocketOptions);
const sendSocketMessage = defineAsyncApi(API_SEND_SOCKET_MESSAGE, (args, { resolve, reject }) => {
    const socketTask = socketTasks[0];
    if (!socketTask || socketTask.readyState !== socketTask.OPEN) {
        reject('WebSocket is not connected');
        return;
    }
    socketTask.send({ data: args.data }, false);
    resolve();
}, SendSocketMessageProtocol);
const closeSocket = defineAsyncApi(API_CLOSE_SOCKET, (args, { resolve, reject }) => {
    const socketTask = socketTasks[0];
    if (!socketTask) {
        reject('WebSocket is not connected');
        return;
    }
    socketTask.readyState = socketTask.CLOSING;
    socketTask.close(args, false);
    resolve();
}, CloseSocketProtocol);
function on(event) {
    const api = `onSocket${capitalize(event)}`;
    return defineOnApi(api, () => {
        globalEvent[event] = api;
    });
}
const onSocketOpen = /*#__PURE__*/ on('open');
const onSocketError = /*#__PURE__*/ on('error');
const onSocketMessage = /*#__PURE__*/ on('message');
const onSocketClose = /*#__PURE__*/ on('close');

class UploadTask {
    constructor(uploader) {
        this._callbacks = [];
        this._uploader = uploader;
        uploader.addEventListener('statechanged', (upload, status) => {
            if (upload.uploadedSize && upload.totalSize) {
                this._callbacks.forEach((callback) => {
                    callback({
                        progress: parseInt(String((upload.uploadedSize / upload.totalSize) * 100)),
                        totalBytesSent: upload.uploadedSize,
                        totalBytesExpectedToSend: upload.totalSize,
                    });
                });
            }
        });
    }
    abort() {
        this._uploader.abort();
    }
    onProgressUpdate(callback) {
        if (!isFunction(callback)) {
            return;
        }
        this._callbacks.push(callback);
    }
    onHeadersReceived() { }
    offProgressUpdate(callback) {
        const index = this._callbacks.indexOf(callback);
        if (index >= 0) {
            this._callbacks.splice(index, 1);
        }
    }
    offHeadersReceived() { }
}
const uploadFile = defineTaskApi(API_UPLOAD_FILE, ({ url, timeout, header, formData, files, filePath, name }, { resolve, reject }) => {
    timeout =
        (timeout ||
            (__uniConfig.networkTimeout && __uniConfig.networkTimeout.uploadFile) ||
            60 * 1000) / 1000;
    const uploader = plus.uploader.createUpload(url, {
        timeout,
        // 需要与其它平台上的表现保持一致，不走重试的逻辑。
        retry: 0,
        retryInterval: 0,
    }, (upload, statusCode) => {
        if (statusCode) {
            resolve({
                data: upload.responseText,
                statusCode,
            });
        }
        else {
            reject(`statusCode: ${statusCode}`);
        }
    });
    for (const name in header) {
        if (hasOwn$1(header, name)) {
            uploader.setRequestHeader(name, String(header[name]));
        }
    }
    for (const name in formData) {
        if (hasOwn$1(formData, name)) {
            uploader.addData(name, String(formData[name]));
        }
    }
    if (files && files.length) {
        files.forEach((file) => {
            uploader.addFile(getRealPath(file.uri), {
                key: file.name || 'file',
            });
        });
    }
    else {
        uploader.addFile(getRealPath(filePath), {
            key: name,
        });
    }
    const uploadFileTask = new UploadTask(uploader);
    uploader.start();
    return uploadFileTask;
}, UploadFileProtocol, UploadFileOptions);

const audios = {};
const evts = [
    'play',
    'canplay',
    'ended',
    'stop',
    'waiting',
    'seeking',
    'seeked',
    'pause',
];
const AUDIO_DEFAULT_SESSION_CATEGORY = 'playback';
const TIME_UPDATE$1 = 200;
const initStateChage = (audioId) => {
    const audio = audios[audioId];
    if (!audio) {
        return;
    }
    if (!audio.initStateChage) {
        audio.initStateChage = true;
        audio.addEventListener('error', (error) => {
            onAudioStateChange({
                state: 'error',
                audioId,
                errMsg: 'MediaError',
                errCode: error.code,
            });
        });
        evts.forEach((event) => {
            audio.addEventListener(event, () => {
                // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
                if (event === 'play') {
                    audio.isStopped = false;
                }
                else if (event === 'stop') {
                    audio.isStopped = true;
                }
                onAudioStateChange({
                    state: event,
                    audioId,
                });
            });
        });
    }
};
function createAudioInstance() {
    const audioId = `${Date.now()}${Math.random()}`;
    const audio = (audios[audioId] = plus.audio.createPlayer('')); // 此处空字符串必填
    audio.src = '';
    audio.volume = 1;
    audio.startTime = 0;
    audio.setSessionCategory(AUDIO_DEFAULT_SESSION_CATEGORY);
    return {
        errMsg: 'createAudioInstance:ok',
        audioId,
    };
}
function setAudioState({ audioId, src, startTime, autoplay = false, loop = false, obeyMuteSwitch, volume, sessionCategory = AUDIO_DEFAULT_SESSION_CATEGORY, playbackRate, }) {
    const audio = audios[audioId];
    if (audio) {
        const style = {
            loop,
            autoplay,
        };
        if (src) {
            // iOS 设置 src 会重新播放
            const realSrc = getRealPath(src);
            if (audio.src !== realSrc)
                audio.src = style.src = realSrc;
        }
        if (startTime) {
            audio.startTime = style.startTime = startTime;
        }
        if (typeof volume === 'number') {
            audio.volume = style.volume = volume;
        }
        audio.setStyles(style);
        if (sessionCategory) {
            audio.setSessionCategory(sessionCategory);
        }
        if (playbackRate && audio.playbackRate) {
            // @ts-ignore
            audio.playbackRate(playbackRate);
        }
        initStateChage(audioId);
    }
    return {
        errMsg: 'setAudioState:ok',
    };
}
function getAudioState({ audioId }) {
    const audio = audios[audioId];
    if (!audio) {
        return {
            errMsg: 'getAudioState:fail',
        };
    }
    const { src, startTime, volume } = audio;
    return {
        errMsg: 'getAudioState:ok',
        duration: 1e3 * (audio.getDuration() || 0),
        currentTime: audio.isStopped ? 0 : 1e3 * audio.getPosition(),
        paused: audio.isPaused(),
        src,
        volume,
        startTime: 1e3 * startTime,
        buffered: 1e3 * audio.getBuffered(),
    };
}
function operateAudio({ operationType, audioId, currentTime, }) {
    const audio = audios[audioId];
    switch (operationType) {
        case 'play':
        case 'pause':
        case 'stop':
            audio[operationType === 'play' && audio.isPaused() ? 'resume' : operationType]();
            break;
        case 'seek':
            typeof currentTime != 'undefined' ? audio.seekTo(currentTime / 1e3) : '';
            break;
    }
    return {
        errMsg: 'operateAudio:ok',
    };
}
const innerAudioContexts = Object.create(null);
const onAudioStateChange = ({ state, audioId, errMsg, errCode, }) => {
    const audio = innerAudioContexts[audioId];
    if (audio) {
        emit(audio, state, errMsg, errCode);
        if (state === 'play') {
            const oldCurrentTime = audio.currentTime;
            emit(audio, 'timeUpdate');
            audio.__timing = setInterval(() => {
                const currentTime = audio.currentTime;
                if (currentTime !== oldCurrentTime) {
                    emit(audio, 'timeUpdate');
                }
            }, TIME_UPDATE$1);
        }
        else if (state === 'pause' || state === 'stop' || state === 'error') {
            clearInterval(audio.__timing);
        }
    }
};
const props$1 = [
    {
        name: 'src',
        cache: true,
    },
    {
        name: 'startTime',
        default: 0,
        cache: true,
    },
    {
        name: 'autoplay',
        default: false,
        cache: true,
    },
    {
        name: 'loop',
        default: false,
        cache: true,
    },
    {
        name: 'obeyMuteSwitch',
        default: true,
        readonly: true,
        cache: true,
    },
    {
        name: 'duration',
        readonly: true,
    },
    {
        name: 'currentTime',
        readonly: true,
    },
    {
        name: 'paused',
        readonly: true,
    },
    {
        name: 'buffered',
        readonly: true,
    },
    {
        name: 'volume',
    },
    {
        name: 'playbackRate',
        cache: true,
    },
];
class InnerAudioContext {
    constructor(id) {
        this.id = id;
        this._callbacks = {};
        this._options = {};
        // 初始化事件监听列表
        innerAudioContextEventNames.forEach((eventName) => {
            this._callbacks[eventName] = [];
        });
        props$1.forEach((item) => {
            const name = item.name;
            Object.defineProperty(this, name, {
                get: () => {
                    const result = item.cache
                        ? this._options
                        : getAudioState({
                            audioId: this.id,
                        });
                    const value = name in result ? result[name] : item.default;
                    return typeof value === 'number' && name !== 'volume'
                        ? value / 1e3
                        : value;
                },
                set: item.readonly
                    ? undefined
                    : (value) => {
                        this._options[name] = value;
                        setAudioState(extend({}, this._options, {
                            audioId: this.id,
                        }));
                    },
            });
        });
        initInnerAudioContextEventOnce();
    }
    play() {
        this._operate('play');
    }
    pause() {
        this._operate('pause');
    }
    stop() {
        this._operate('stop');
    }
    seek(position) {
        this._operate('seek', {
            currentTime: position * 1e3,
        });
    }
    destroy() {
        clearInterval(this.__timing);
        if (audios[this.id]) {
            audios[this.id].close();
            delete audios[this.id];
        }
        delete innerAudioContexts[this.id];
    }
    _operate(type, options) {
        operateAudio(extend({}, options, {
            audioId: this.id,
            operationType: type,
        }));
    }
}
const initInnerAudioContextEventOnce = /*#__PURE__*/ once(() => {
    // 批量设置音频上下文事件监听方法
    innerAudioContextEventNames.forEach((eventName) => {
        InnerAudioContext.prototype[eventName] = function (callback) {
            if (isFunction(callback)) {
                this._callbacks[eventName].push(callback);
            }
        };
    });
    // 批量设置音频上下文事件取消监听方法
    innerAudioContextOffEventNames.forEach((eventName) => {
        InnerAudioContext.prototype[eventName] = function (callback) {
            const callbacks = this._callbacks[eventName];
            const index = callbacks.indexOf(callback);
            if (index >= 0) {
                callbacks.splice(index, 1);
            }
        };
    });
});
function emit(audio, state, errMsg, errCode) {
    const name = `on${capitalize(state)}`;
    audio._callbacks[name].forEach((callback) => {
        if (isFunction(callback)) {
            callback(state === 'error'
                ? {
                    errMsg,
                    errCode,
                }
                : {});
        }
    });
}
/**
 * 创建音频上下文
 */
const createInnerAudioContext = defineSyncApi(API_CREATE_INNER_AUDIO_CONTEXT, () => {
    const { audioId } = createAudioInstance();
    const innerAudioContext = new InnerAudioContext(audioId);
    innerAudioContexts[audioId] = innerAudioContext;
    return innerAudioContext;
});

const eventNames = [
    'canplay',
    'play',
    'pause',
    'stop',
    'ended',
    'timeUpdate',
    'prev',
    'next',
    'error',
    'waiting',
];
const callbacks$1 = {
    canplay: [],
    play: [],
    pause: [],
    stop: [],
    ended: [],
    timeUpdate: [],
    prev: [],
    next: [],
    error: [],
    waiting: [],
};
let audio;
let timeUpdateTimer = null;
const TIME_UPDATE = 250;
const events = ['play', 'pause', 'ended', 'stop', 'canplay'];
function startTimeUpdateTimer() {
    stopTimeUpdateTimer();
    onBackgroundAudioStateChange({ state: 'timeUpdate' });
    timeUpdateTimer = setInterval(() => {
        onBackgroundAudioStateChange({ state: 'timeUpdate' });
    }, TIME_UPDATE);
}
function stopTimeUpdateTimer() {
    if (timeUpdateTimer !== null) {
        clearInterval(timeUpdateTimer);
    }
}
function initMusic() {
    if (audio) {
        return;
    }
    const publish = UniServiceJSBridge.invokeOnCallback;
    audio = plus.audio.createPlayer({
        autoplay: true,
        backgroundControl: true,
    });
    audio.src =
        audio.title =
            audio.epname =
                audio.singer =
                    audio.coverImgUrl =
                        audio.webUrl =
                            '';
    audio.startTime = 0;
    events.forEach((event) => {
        audio.addEventListener(event, () => {
            // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
            if (event === 'play') {
                audio.isStopped = false;
                startTimeUpdateTimer();
            }
            else if (event === 'stop') {
                audio.isStopped = true;
            }
            if (event === 'pause' || event === 'ended' || event === 'stop') {
                stopTimeUpdateTimer();
            }
            const eventName = `onMusic${event[0].toUpperCase() + event.slice(1)}`;
            publish(eventName, {
                dataUrl: audio.src,
                errMsg: `${eventName}:ok`,
            });
            onBackgroundAudioStateChange({
                state: event,
                dataUrl: audio.src,
            });
        });
    });
    audio.addEventListener('waiting', () => {
        stopTimeUpdateTimer();
        onBackgroundAudioStateChange({
            state: 'waiting',
            dataUrl: audio.src,
        });
    });
    audio.addEventListener('error', (err) => {
        stopTimeUpdateTimer();
        publish('onMusicError', {
            dataUrl: audio.src,
            errMsg: 'Error:' + err.message,
        });
        onBackgroundAudioStateChange({
            state: 'error',
            dataUrl: audio.src,
            errMsg: err.message,
            errCode: err.code,
        });
    });
    // @ts-expect-error
    audio.addEventListener('prev', () => {
        onBackgroundAudioStateChange({ state: 'prev' });
    });
    // @ts-expect-error
    audio.addEventListener('next', () => {
        onBackgroundAudioStateChange({ state: 'next' });
    });
}
function getBackgroundAudioState() {
    let data = {
        duration: 0,
        currentTime: 0,
        paused: false,
        src: '',
        buffered: 0,
        title: '',
        epname: '',
        singer: '',
        coverImgUrl: '',
        webUrl: '',
        startTime: 0,
        errMsg: 'getBackgroundAudioState:ok',
    };
    if (audio) {
        const newData = {
            duration: audio.getDuration() || 0,
            currentTime: audio.isStopped ? 0 : audio.getPosition(),
            paused: audio.isPaused(),
            src: audio.src,
            buffered: audio.getBuffered(),
            title: audio.title,
            epname: audio.epname,
            singer: audio.singer,
            coverImgUrl: audio.coverImgUrl,
            webUrl: audio.webUrl,
            startTime: audio.startTime,
        };
        data = extend(data, newData);
    }
    return data;
}
function setMusicState(args, name) {
    initMusic();
    const props = [
        'src',
        'startTime',
        'coverImgUrl',
        'webUrl',
        'singer',
        'epname',
        'title',
    ];
    if (name === 'playbackRate') {
        let val = args[name];
        audio.playbackRate && audio.playbackRate(parseFloat(val));
        return;
    }
    const style = {};
    Object.keys(args).forEach((key) => {
        if (props.indexOf(key) >= 0) {
            let val = args[key];
            if (key === props[0] && val) {
                val = getRealPath(val);
            }
            audio[key] = style[key] = val;
        }
    });
    audio.setStyles(style);
}
function operateMusicPlayer({ operationType, src, position, api = 'operateMusicPlayer', title, coverImgUrl, }) {
    var operationTypes = ['resume', 'pause', 'stop'];
    if (operationTypes.indexOf(operationType) > 0) {
        audio && audio[operationType]();
    }
    else if (operationType === 'play') {
        setMusicState({
            src,
            startTime: position,
            title,
            coverImgUrl,
        });
        audio.play();
    }
    else if (operationType === 'seek') {
        audio && audio.seekTo(position);
    }
    return {
        errMsg: `${api}:ok`,
    };
}
function operateBackgroundAudio({ operationType, src, startTime, currentTime, }) {
    return operateMusicPlayer({
        operationType,
        src,
        position: startTime || currentTime || 0,
        api: 'operateBackgroundAudio',
    });
}
function onBackgroundAudioStateChange({ state, errMsg, errCode, dataUrl, }) {
    callbacks$1[state].forEach((callback) => {
        if (isFunction(callback)) {
            callback(state === 'error'
                ? {
                    errMsg,
                    errCode,
                }
                : {});
        }
    });
}
const onInitBackgroundAudioManager = /*#__PURE__*/ once(() => {
    eventNames.forEach((item) => {
        BackgroundAudioManager.prototype[`on${capitalize(item)}`] =
            function (callback) {
                callbacks$1[item].push(callback);
            };
    });
});
const props = [
    {
        name: 'duration',
        readonly: true,
    },
    {
        name: 'currentTime',
        readonly: true,
    },
    {
        name: 'paused',
        readonly: true,
    },
    {
        name: 'src',
        cache: true,
    },
    {
        name: 'startTime',
        default: 0,
        cache: true,
    },
    {
        name: 'buffered',
        readonly: true,
    },
    {
        name: 'title',
        cache: true,
    },
    {
        name: 'epname',
        cache: true,
    },
    {
        name: 'singer',
        cache: true,
    },
    {
        name: 'coverImgUrl',
        cache: true,
    },
    {
        name: 'webUrl',
        cache: true,
    },
    {
        name: 'protocol',
        readonly: true,
        default: 'http',
    },
    {
        name: 'playbackRate',
        default: 1,
        cache: true,
    },
];
class BackgroundAudioManager {
    constructor() {
        this._options = {};
        props.forEach((item) => {
            const name = item.name;
            Object.defineProperty(this, name, {
                get: () => {
                    const result = item.cache ? this._options : getBackgroundAudioState();
                    return name in result ? result[name] : item.default;
                },
                set: item.readonly
                    ? undefined
                    : (value) => {
                        this._options[name] = value;
                        setMusicState(this._options, name);
                    },
            });
        });
        onInitBackgroundAudioManager();
    }
    play() {
        this._operate('play');
    }
    pause() {
        this._operate('pause');
    }
    stop() {
        this._operate('stop');
    }
    seek(position) {
        this._operate('seek', {
            currentTime: position,
        });
    }
    _operate(type, options) {
        operateBackgroundAudio(extend({}, options, {
            operationType: type,
        }));
    }
}
let backgroundAudioManager;
const getBackgroundAudioManager = defineSyncApi(API_GET_BACKGROUND_AUDIO_MANAGER, () => backgroundAudioManager ||
    (backgroundAudioManager = new BackgroundAudioManager()));

class LivePusherContext {
    constructor(id, ctx) {
        this.id = id;
        this.ctx = ctx;
    }
    start(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'start', option);
    }
    stop(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'stop', option);
    }
    pause(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'pause', option);
    }
    resume(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'resume', option);
    }
    switchCamera(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'switchCamera', option);
    }
    snapshot(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'snapshot', option);
    }
    toggleTorch(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'toggleTorch', option);
    }
    playBGM(option) {
        return invokeVmMethod(this.ctx, 'playBGM', option);
    }
    stopBGM(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'stopBGM', option);
    }
    pauseBGM(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'pauseBGM', option);
    }
    resumeBGM(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'resumeBGM', option);
    }
    setBGMVolume(option) {
        return invokeVmMethod(this.ctx, 'setBGMVolume', option);
    }
    startPreview(option) {
        return invokeVmMethodWithoutArgs(this.ctx, 'startPreview', option);
    }
    stopPreview(args) {
        return invokeVmMethodWithoutArgs(this.ctx, 'stopPreview', args);
    }
}
// TODO
function publishToView(livePusherId, pageId, type, data) {
    UniServiceJSBridge.invokeViewMethod('livepusher.' + livePusherId, {
        livePusherId,
        type,
        data,
    }, pageId);
}
class LivePusherContextVue {
    constructor(id, pageId) {
        this.id = id;
        this.pageId = pageId;
    }
    start() {
        publishToView(this.id, this.pageId, 'start');
    }
    stop() {
        publishToView(this.id, this.pageId, 'stop');
    }
    pause() {
        publishToView(this.id, this.pageId, 'pause');
    }
    resume() {
        publishToView(this.id, this.pageId, 'resume');
    }
    switchCamera() {
        publishToView(this.id, this.pageId, 'switchCamera');
    }
    startPreview() {
        publishToView(this.id, this.pageId, 'preview');
    }
    stopPreview() {
        publishToView(this.id, this.pageId, 'stop');
    }
    snapshot() {
        publishToView(this.id, this.pageId, 'snapshot');
    }
}
const createLivePusherContext = defineSyncApi(API_CREATE_LIVE_PUSHER_CONTEXT, (id, vm) => {
    if (vm.$page.meta.isNVue) {
        if (!vm) {
            return console.warn('uni.createLivePusherContext: 2 arguments required, but only 1 present');
        }
        const elm = findElmById(id, vm);
        if (!elm) {
            return console.warn('Can not find `' + id + '`');
        }
        return new LivePusherContext(id, elm);
    }
    return new LivePusherContextVue(id, vm.$page.id);
}, CreateLivePusherContextProtocol);

const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;
function gcj02towgs84(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    }
    let dlat = _transformlat(lng - 105.0, lat - 35.0);
    let dlng = _transformlng(lng - 105.0, lat - 35.0);
    const radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
}
function wgs84togcj02(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    }
    let dlat = _transformlat(lng - 105.0, lat - 35.0);
    let dlng = _transformlng(lng - 105.0, lat - 35.0);
    const radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [mglng, mglat];
}
const outOfChina = function (lng, lat) {
    return (lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false);
};
const _transformlat = function (lng, lat) {
    let ret = -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
            2.0) /
            3.0;
    ret +=
        ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
            3.0;
    ret +=
        ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
            2.0) /
            3.0;
    return ret;
};
const _transformlng = function (lng, lat) {
    let ret = 300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
            2.0) /
            3.0;
    ret +=
        ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
            3.0;
    ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) +
            300.0 * Math.sin((lng / 30.0) * PI)) *
            2.0) /
            3.0;
    return ret;
};

function getLocationSuccess(type, position, resolve) {
    const coords = position.coords;
    if (type !== position.coordsType) {
        let coordArray;
        if (type === 'wgs84') {
            coordArray = gcj02towgs84(coords.longitude, coords.latitude);
        }
        else if (type === 'gcj02') {
            coordArray = wgs84togcj02(coords.longitude, coords.latitude);
        }
        if (coordArray) {
            coords.longitude = coordArray[0];
            coords.latitude = coordArray[1];
        }
    }
    resolve({
        type,
        altitude: coords.altitude || 0,
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed,
        accuracy: coords.accuracy,
        address: position.address,
        errMsg: 'getLocation:ok',
    });
}
const getLocation = defineAsyncApi(API_GET_LOCATION, ({ type = 'wgs84', geocode = false, altitude = false, highAccuracyExpireTime, isHighAccuracy = false, }, { resolve, reject }) => {
    plus.geolocation.getCurrentPosition((position) => {
        getLocationSuccess(type, position, resolve);
    }, (e) => {
        // 坐标地址解析失败
        if (e.code === 1501) {
            getLocationSuccess(type, e, resolve);
            return;
        }
        reject('getLocation:fail ' + e.message);
    }, {
        geocode: geocode,
        enableHighAccuracy: isHighAccuracy || altitude,
        timeout: highAccuracyExpireTime,
        coordsType: type,
    });
}, GetLocationProtocol, GetLocationOptions);

const chooseLocation = defineAsyncApi(API_CHOOSE_LOCATION, (options, { resolve, reject }) => {
    const statusBarStyle = getStatusBarStyle();
    const isDark = statusBarStyle !== 'light';
    let result;
    const page = showPage({
        url: '__uniappchooselocation',
        data: extend({}, options, {
            locale: getLocale(),
        }),
        style: {
            // @ts-expect-error
            animationType: options.animationType || 'slide-in-bottom',
            titleNView: false,
            popGesture: 'close',
            scrollIndicator: 'none',
        },
        onMessage({ event, detail, }) {
            if (event === 'selected') {
                result = detail;
            }
        },
        onClose() {
            if (isDark) {
                plus.navigator.setStatusBarStyle('dark');
            }
            result ? resolve(result) : reject('cancel');
        },
    });
    if (isDark) {
        plus.navigator.setStatusBarStyle('light');
        page.webview.addEventListener('popGesture', ({ type, result }) => {
            if (type === 'start') {
                plus.navigator.setStatusBarStyle('dark');
            }
            else if (type === 'end' && !result) {
                plus.navigator.setStatusBarStyle('light');
            }
        });
    }
}, ChooseLocationProtocol);

const openLocation = defineAsyncApi(API_OPEN_LOCATION, (data, { resolve, reject }) => {
    showPage({
        url: '__uniappopenlocation',
        data: extend({}, data, {
            locale: getLocale(),
        }),
        style: {
            titleNView: {
                type: 'transparent',
            },
            popGesture: 'close',
            backButtonAutoControl: 'close',
        },
        onClose() {
            reject('cancel');
        },
    });
    return resolve();
}, OpenLocationProtocol, OpenLocationOptions);

let started = false;
let watchId = 0;
const startLocationUpdate = defineAsyncApi(API_START_LOCATION_UPDATE, (options, { resolve, reject }) => {
    watchId =
        watchId ||
            plus.geolocation.watchPosition((res) => {
                started = true;
                UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE, res.coords);
            }, (error) => {
                if (!started) {
                    reject(error.message);
                    started = true;
                }
                UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE_ERROR, {
                    errMsg: `onLocationChange:fail ${error.message}`,
                });
            }, {
                coordsType: options === null || options === void 0 ? void 0 : options.type,
            });
    setTimeout(resolve, 100);
}, StartLocationUpdateProtocol, StartLocationUpdateOptions);
const stopLocationUpdate = defineAsyncApi(API_STOP_LOCATION_UPDATE, (_, { resolve }) => {
    if (watchId) {
        plus.geolocation.clearWatch(watchId);
        started = false;
        watchId = 0;
    }
    resolve();
});
const onLocationChange = defineOnApi(API_ON_LOCATION_CHANGE, () => { });
const offLocationChange = defineOffApi(API_OFF_LOCATION_CHANGE, () => { });
const onLocationChangeError = defineOnApi(API_ON_LOCATION_CHANGE_ERROR, () => { });
const offLocationChangeError = defineOffApi(API_OFF_LOCATION_CHANGE_ERROR, () => { });

const showModal = defineAsyncApi(API_SHOW_MODAL, ({ title = '', content = '', showCancel = true, cancelText, cancelColor, confirmText, confirmColor, editable = false, placeholderText = '', } = {}, { resolve }) => {
    const buttons = showCancel ? [cancelText, confirmText] : [confirmText];
    const tip = editable ? placeholderText : buttons;
    content = content || ' ';
    plus.nativeUI[editable ? 'prompt' : 'confirm'](content, (e) => {
        if (showCancel) {
            const isConfirm = e.index === 1;
            const res = {
                confirm: isConfirm,
                cancel: e.index === 0 || e.index === -1,
            };
            isConfirm && editable && (res.content = e.value);
            resolve(res);
        }
        else {
            const res = {
                confirm: e.index === 0,
                cancel: false,
            };
            editable && (res.content = e.value);
            resolve(res);
        }
    }, title, tip, buttons);
}, ShowModalProtocol, ShowModalOptions);

const ACTION_SHEET_THEME = {
    light: {
        itemColor: '#000000',
    },
    dark: {
        itemColor: 'rgba(255, 255, 255, 0.8)',
    },
};
const showActionSheet = defineAsyncApi(API_SHOW_ACTION_SHEET, ({ itemList = [], itemColor, title = '', popover }, { resolve, reject }) => {
    // #000 by default in protocols
    if (itemColor === '#000' && __uniConfig.darkmode) {
        itemColor =
            ACTION_SHEET_THEME[plus.navigator.getUIStyle()]
                .itemColor;
    }
    initI18nShowActionSheetMsgsOnce();
    const { t } = useI18n();
    const options = {
        title,
        cancel: t('uni.showActionSheet.cancel'),
        buttons: itemList.map((item) => ({
            title: item,
            color: itemColor,
        })),
    };
    plus.nativeUI.actionSheet(extend(options, {
        popover,
    }), (e) => {
        if (e.index > 0) {
            resolve({
                tapIndex: e.index - 1,
            });
        }
        else {
            reject('showActionSheet:fail cancel');
        }
    });
}, ShowActionSheetProtocol, ShowActionSheetOptions);

let toast;
let isShowToast = false;
let toastType = '';
let timeout;
const showLoading = defineAsyncApi(API_SHOW_LOADING, (args, callbacks) => _showToast(extend({}, args, {
    type: 'loading',
    icon: 'loading',
}), callbacks), ShowLoadingProtocol, ShowLoadingOptions);
const _showToast = ({ title = '', icon = 'success', image = '', duration = 1500, mask = false, position, type = 'toast', style, }, { resolve, reject }) => {
    hide('');
    toastType = type;
    if (['top', 'center', 'bottom'].includes(String(position))) {
        // 仅可以关闭 richtext 类型，但 iOS 部分情况换行显示有问题
        plus.nativeUI.toast(title, {
            verticalAlign: position,
        });
        isShowToast = true;
    }
    else {
        if (icon && !~['success', 'loading', 'error', 'none'].indexOf(icon)) {
            icon = 'success';
        }
        const waitingOptions = {
            modal: mask,
            back: 'transmit',
            padding: '10px',
            size: '16px', // 固定字体大小
        };
        if (!image && (!icon || icon === 'none')) {
            // 无图
            // waitingOptions.width = '120px'
            // waitingOptions.height = '40px'
            waitingOptions.loading = {
                display: 'none',
            };
        }
        else {
            waitingOptions.width = '140px';
            waitingOptions.height = '112px';
        }
        if (image) {
            waitingOptions.loading = {
                display: 'block',
                height: '55px',
                icon: image,
                interval: duration,
            };
        }
        else {
            if (['success', 'error'].indexOf(icon) !== -1) {
                waitingOptions.loading = {
                    display: 'block',
                    height: '55px',
                    icon: icon === 'success' ? '__uniappsuccess.png' : '__uniapperror.png',
                    interval: duration,
                };
            }
        }
        try {
            toast = plus.nativeUI.showWaiting(title, extend(waitingOptions, style));
        }
        catch (error) {
            reject(`${error}`);
        }
    }
    if (toastType === 'toast')
        timeout = setTimeout(() => {
            hide('');
        }, duration);
    return resolve();
};
const showToast = defineAsyncApi(API_SHOW_TOAST, _showToast, ShowToastProtocol, ShowToastOptions);
const hideToast = defineAsyncApi(API_HIDE_TOAST, (_, callbacks) => hide('toast', callbacks));
const hideLoading = defineAsyncApi(API_HIDE_LOADING, (_, callbacks) => hide('loading', callbacks));
function hide(type = 'toast', callbacks) {
    if (type && type !== toastType) {
        // 应该不需要失败回调，在页面后退时，会主动 hideToast 和 hideLoading，如果 reject 会出异常。
        return callbacks && callbacks.resolve();
    }
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    if (isShowToast) {
        plus.nativeUI.closeToast();
    }
    else if (toast && toast.close) {
        toast.close();
    }
    toast = null;
    isShowToast = false;
    toastType = '';
    return callbacks && callbacks.resolve();
}

const startPullDownRefresh = defineAsyncApi(API_START_PULL_DOWN_REFRESH, (_args, { resolve, reject }) => {
    let webview = getPullDownRefreshWebview();
    if (webview) {
        webview.endPullToRefresh();
    }
    webview = getCurrentWebview();
    if (!webview) {
        return reject();
    }
    webview.beginPullToRefresh();
    setPullDownRefreshWebview(webview);
    resolve();
});

const stopPullDownRefresh = defineAsyncApi(API_STOP_PULL_DOWN_REFRESH, (_args, { resolve, reject }) => {
    const webview = getPullDownRefreshWebview() || getCurrentWebview();
    if (!webview) {
        return reject();
    }
    webview.endPullToRefresh();
    setPullDownRefreshWebview(null);
    resolve();
});

const loadFontFace = defineAsyncApi(API_LOAD_FONT_FACE, (options, { resolve, reject }) => {
    const pageId = getPageIdByVm(getCurrentPageVm());
    UniServiceJSBridge.invokeViewMethod(API_LOAD_FONT_FACE, options, pageId, (err) => {
        if (err) {
            reject(err);
        }
        else {
            resolve();
        }
    });
}, LoadFontFaceProtocol);

const pageScrollTo = defineAsyncApi(API_PAGE_SCROLL_TO, (options, { resolve }) => {
    const pageId = getPageIdByVm(getCurrentPageVm());
    UniServiceJSBridge.invokeViewMethod(API_PAGE_SCROLL_TO, options, pageId, resolve);
}, PageScrollToProtocol, PageScrollToOptions);

const setNavigationBarTitle = defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, ({ __page__, title }, { resolve, reject }) => {
    const webview = getWebview(__page__);
    if (webview) {
        const style = webview.getStyle();
        if (style && style.titleNView) {
            webview.setStyle({
                titleNView: {
                    titleText: title,
                },
            });
        }
        resolve();
    }
    else {
        reject();
    }
}, SetNavigationBarTitleProtocol);
const showNavigationBarLoading = defineAsyncApi(API_SHOW_NAVIGATION_BAR_LOADING, (_, { resolve }) => {
    plus.nativeUI.showWaiting('', {
        modal: false,
    });
    resolve();
});
const hideNavigationBarLoading = defineAsyncApi(API_HIDE_NAVIGATION_BAR_LOADING, (_, { resolve }) => {
    plus.nativeUI.closeWaiting();
    resolve();
});
function setPageStatusBarStyle(statusBarStyle) {
    const pages = getCurrentPages();
    if (!pages.length) {
        return;
    }
    // 框架内部页面跳转会从这里获取style配置
    pages[pages.length - 1].$page.statusBarStyle = statusBarStyle;
}
const setNavigationBarColor = defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, ({ __page__, frontColor, backgroundColor }, { resolve, reject }) => {
    const webview = getWebview(__page__);
    if (webview) {
        const styles = {};
        if (frontColor) {
            styles.titleColor = frontColor;
        }
        if (backgroundColor) {
            styles.backgroundColor = backgroundColor;
        }
        const statusBarStyle = frontColor === '#000000' ? 'dark' : 'light';
        plus.navigator.setStatusBarStyle(statusBarStyle);
        // 用户调用api时同时改变当前页配置，这样在系统调用设置时，可以避免覆盖用户设置
        setPageStatusBarStyle(statusBarStyle);
        const style = webview.getStyle();
        if (style && style.titleNView) {
            if (style.titleNView.autoBackButton) {
                styles.backButton = styles.backButton || {};
                styles.backButton.color = frontColor;
            }
            webview.setStyle({
                titleNView: styles,
            });
        }
        resolve();
    }
    else {
        reject();
    }
}, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);

const setTabBarBadge = defineAsyncApi(API_SET_TAB_BAR_BADGE, ({ index, text }, { resolve, reject }) => {
    tabBarInstance.setTabBarBadge('text', index, text);
    resolve();
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
const setTabBarItem = defineAsyncApi(API_SET_TAB_BAR_ITEM, ({ index, text, iconPath, selectedIconPath, pagePath, visible, iconfont }, { resolve }) => {
    tabBarInstance.setTabBarItem(index, text, iconPath, selectedIconPath, visible, iconfont);
    if (pagePath) {
        const tabBarItem = __uniConfig.tabBar.list[index];
        if (tabBarItem) {
            const oldPagePath = tabBarItem.pagePath;
            const newPagePath = removeLeadingSlash(pagePath);
            if (newPagePath !== oldPagePath) {
                normalizeTabBarRoute(index, oldPagePath, newPagePath);
            }
        }
    }
    resolve();
}, SetTabBarItemProtocol, SetTabBarItemOptions);
const setTabBarStyle = defineAsyncApi(API_SET_TAB_BAR_STYLE, (style = {}, { resolve, reject }) => {
    if (!isTabBarPage()) {
        return reject('not TabBar page');
    }
    style.borderStyle = normalizeTabBarStyles(style.borderStyle);
    tabBarInstance.setTabBarStyle(style);
    resolve();
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
const hideTabBar = defineAsyncApi(API_HIDE_TAB_BAR, (args, { resolve, reject }) => {
    const animation = args && args.animation;
    if (!isTabBarPage()) {
        return reject('not TabBar page');
    }
    tabBarInstance.hideTabBar(Boolean(animation));
    resolve();
}, HideTabBarProtocol);
const showTabBar = defineAsyncApi(API_SHOW_TAB_BAR, (args, { resolve, reject }) => {
    const animation = args && args.animation;
    if (!isTabBarPage()) {
        return reject('not TabBar page');
    }
    tabBarInstance.showTabBar(Boolean(animation));
    resolve();
}, ShowTabBarProtocol);
const showTabBarRedDot = defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, ({ index }, { resolve, reject }) => {
    tabBarInstance.setTabBarBadge('redDot', index);
    resolve();
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
const setTabBarBadgeNone = (index) => tabBarInstance.setTabBarBadge('none', index);
const removeTabBarBadge = defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, ({ index }, { resolve, reject }) => {
    setTabBarBadgeNone(index);
    resolve();
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
const hideTabBarRedDot = defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, ({ index }, { resolve, reject }) => {
    setTabBarBadgeNone(index);
    resolve();
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);

const VD_SYNC = 'vdSync';
const APP_SERVICE_ID = '__uniapp__service';
const ON_WEBVIEW_READY = 'onWebviewReady';
const ACTION_TYPE_DICT = 0;
const WEBVIEW_INSERTED = 'webviewInserted';
const WEBVIEW_REMOVED = 'webviewRemoved';

const EVENT_TYPE_NAME = 'UniAppSubNVue';
class SubNvue {
    constructor(id, isSub) {
        this.callbacks = [];
        const webview = (this.webview = plus.webview.getWebviewById(id));
        this.isSub = isSub || false;
        if (webview.__uniapp_mask_id) {
            const maskWebview = (this.maskWebview =
                webview.__uniapp_mask_id === '0'
                    ? {
                        setStyle({ mask }) {
                            requireNativePlugin('uni-tabview').setMask({
                                color: mask,
                            });
                        },
                    }
                    : plus.webview.getWebviewById(webview.__uniapp_mask_id));
            const closeMask = function () {
                maskWebview.setStyle({
                    mask: 'none',
                });
            };
            webview.addEventListener('hide', closeMask);
            webview.addEventListener('close', closeMask);
        }
    }
    show(...args) {
        if (this.maskWebview) {
            const maskColor = this.webview.__uniapp_mask;
            this.maskWebview.setStyle({
                mask: maskColor,
            });
        }
        this.webview.show(...args);
    }
    hide(...args) {
        this.webview.hide(...args);
    }
    setStyle(style) {
        this.webview.setStyle(style);
    }
    initMessage() {
        if (this.messageReady) {
            return;
        }
        this.messageReady = true;
        const listener = (event) => {
            if (event.data && event.data.type === EVENT_TYPE_NAME) {
                const target = event.data.target;
                if (target.id === this.webview.id && target.isSub === this.isSub) {
                    this.callbacks.forEach((callback) => {
                        callback({
                            origin: this.webview.__uniapp_host,
                            data: event.data.data,
                        });
                    });
                }
            }
        };
        const globalEvent = requireNativePlugin('globalEvent');
        globalEvent.addEventListener('plusMessage', listener);
        this.webview.addEventListener('close', () => {
            // TODO 暂时仅清空回调
            this.callbacks.length = 0;
            // globalEvent.removeEventListener('plusMessage', listener)
        });
    }
    postMessage(data) {
        const webviewExt = plus.webview;
        webviewExt.postMessageToUniNView({
            type: EVENT_TYPE_NAME,
            data,
            target: {
                id: this.webview.id,
                isSub: !this.isSub,
            },
        }, APP_SERVICE_ID);
    }
    onMessage(callback) {
        this.initMessage();
        this.callbacks.push(callback);
    }
}
const getSubNVueById = function (id, isSub) {
    // TODO 暂时通过 isSub 区分来自 subNVue 页面
    return new SubNvue(id, isSub);
};

function restoreGlobal(newVue, newWeex, newPlus, newSetTimeout, newClearTimeout, newSetInterval, newClearInterval) {
    // 确保部分全局变量 是 app-service 中的
    // 若首页 nvue 初始化比 app-service 快，导致框架处于该 nvue 环境下
    // plus 如果不用 app-service，资源路径会出问题
    // 若首页 nvue 被销毁，如 redirectTo 或 reLaunch，则这些全局功能会损坏
    if (plus !== newPlus) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(`[restoreGlobal][${Date.now()}]`);
        }
        // __VUE__ 在 uni-jsframework-next 编译时会被替换为 vue
        Vue = __VUE__ = newVue;
        weex = newWeex;
        // @ts-ignore
        plus = newPlus;
        restoreOldSetStatusBarStyle(plus.navigator.setStatusBarStyle);
        plus.navigator.setStatusBarStyle = newSetStatusBarStyle;
        /* eslint-disable no-global-assign */
        // @ts-ignore
        setTimeout = newSetTimeout;
        // @ts-ignore
        clearTimeout = newClearTimeout;
        // @ts-ignore
        setInterval = newSetInterval;
        // @ts-ignore
        clearInterval = newClearInterval;
    }
    __uniConfig.serviceReady = true;
}
function requireGlobal() {
    const list = [
        'ArrayBuffer',
        'Int8Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'Int16Array',
        'Uint16Array',
        'Int32Array',
        'Uint32Array',
        'Float32Array',
        'Float64Array',
        'BigInt64Array',
        'BigUint64Array',
    ];
    const object = {};
    for (let i = 0; i < list.length; i++) {
        const key = list[i];
        object[key] = global[key];
    }
    return object;
}
function syncDataToGlobal(data) {
    extend(global, data);
}

const providers = {
    oauth(callback) {
        plus.oauth.getServices((services) => {
            services = services;
            const provider = [];
            services.forEach(({ id }) => {
                provider.push(id);
            });
            callback(null, provider, services);
        }, (err) => {
            err = err;
            callback(err);
        });
    },
    share(callback) {
        plus.share.getServices((services) => {
            services = services;
            const provider = [];
            services.forEach(({ id }) => {
                provider.push(id);
            });
            callback(null, provider, services);
        }, (err) => {
            callback(err);
        });
    },
    payment(callback) {
        plus.payment.getChannels((services) => {
            const provider = [];
            services.forEach(({ id }) => {
                provider.push(id);
            });
            callback(null, provider, services);
        }, (err) => {
            callback(err);
        });
    },
    push(callback) {
        if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
            const clientInfo = plus.push.getClientInfo();
            callback(null, [clientInfo.id], [clientInfo]);
        }
        else {
            callback(null, []);
        }
    },
};
const getProvider = defineAsyncApi(API_GET_PROVIDER, ({ service }, { resolve, reject }) => {
    if (providers[service]) {
        providers[service]((err, provider = [], providers = []) => {
            if (err) {
                reject(err.message);
            }
            else {
                resolve({
                    service,
                    // 5+ PlusShareShareService['id'] 类型错误
                    provider: provider,
                    providers: providers.map((provider) => {
                        if (typeof provider.serviceReady === 'boolean') {
                            provider.isAppExist = provider.serviceReady;
                        }
                        if (typeof provider.nativeClient === 'boolean') {
                            provider.isAppExist = provider.nativeClient;
                        }
                        return provider;
                    }),
                });
            }
        });
    }
    else {
        reject('service not found');
    }
}, GetProviderProtocol);

let univerifyManager;
function getService(provider) {
    return new Promise((resolve, reject) => {
        plus.oauth.getServices((services) => {
            const service = services.find(({ id }) => id === provider);
            service ? resolve(service) : reject(new Error('provider not find'));
        }, reject);
    });
}
const login = defineAsyncApi(API_LOGIN, (params, { resolve, reject }) => {
    const provider = params.provider || 'weixin';
    const errorCallback = warpPlusErrorCallback(reject);
    const isAppleLogin = provider === 'apple';
    const authOptions = isAppleLogin
        ? { scope: 'email' }
        : params.univerifyStyle
            ? {
                univerifyStyle: univerifyButtonsClickHandling(params.univerifyStyle, errorCallback),
            }
            : {};
    getService(provider)
        .then((service) => {
        function login() {
            if (params.onlyAuthorize && provider === 'weixin') {
                service.authorize(({ code }) => {
                    resolve({
                        code,
                        authResult: '',
                    });
                }, errorCallback);
                return;
            }
            service.login((res) => {
                const authResult = res.target.authResult;
                const appleInfo = res.target.appleInfo;
                resolve({
                    code: authResult.code,
                    authResult: authResult,
                    appleInfo,
                });
            }, errorCallback, authOptions);
        }
        // 先注销再登录
        // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
        if (isAppleLogin || provider === 'univerify') {
            login();
        }
        else {
            service.logout(login, login);
        }
    })
        .catch(errorCallback);
}, LoginProtocol);
const baseGetUserInfo = (params, { resolve, reject }) => {
    const provider = params.provider || 'weixin';
    const errorCallback = warpPlusErrorCallback(reject);
    getService(provider)
        .then((loginService) => {
        loginService.getUserInfo((res) => {
            let userInfo = { nickName: '' };
            if (provider === 'weixin') {
                const wechatUserInfo = loginService.userInfo;
                if (wechatUserInfo)
                    userInfo = {
                        openId: wechatUserInfo.openid,
                        nickName: wechatUserInfo.nickname,
                        gender: wechatUserInfo.sex,
                        city: wechatUserInfo.city,
                        province: wechatUserInfo.province,
                        country: wechatUserInfo.country,
                        avatarUrl: wechatUserInfo.headimgurl,
                        unionId: wechatUserInfo.unionid,
                    };
            }
            else if (provider === 'apple') {
                const appleInfo = loginService.appleInfo;
                if (appleInfo)
                    userInfo = {
                        openId: appleInfo.user,
                        fullName: appleInfo.fullName,
                        email: appleInfo.email,
                        authorizationCode: appleInfo.authorizationCode,
                        identityToken: appleInfo.identityToken,
                        realUserStatus: appleInfo.realUserStatus,
                    };
            }
            else {
                userInfo = loginService.userInfo;
                if (userInfo) {
                    userInfo.openId =
                        userInfo.openId ||
                            userInfo.openid ||
                            loginService.authResult.openid;
                    userInfo.nickName = userInfo.nickName || userInfo.nickname;
                    userInfo.avatarUrl = userInfo.avatarUrl || userInfo.headimgurl;
                }
            }
            let result = {};
            // @ts-ignore
            if (params.data && params.data.api_name === 'webapi_getuserinfo') {
                result.data = {
                    data: JSON.stringify(userInfo),
                    rawData: '',
                    signature: '',
                    encryptedData: '',
                    iv: '',
                };
            }
            else {
                result.userInfo = userInfo;
            }
            resolve(result);
        }, errorCallback);
    })
        .catch(() => {
        reject('请先调用 uni.login');
    });
};
const getUserInfo = defineAsyncApi(API_GET_USER_INFO, baseGetUserInfo, GetUserInfoProtocol);
/**
 * 获取用户信息-兼容
 */
const getUserProfile = defineAsyncApi(API_GET_USER_PROFILE, baseGetUserInfo, GgetUserProfileProtocol);
const preLogin = defineAsyncApi(API_PRE_LOGIN, ({ provider }, { resolve, reject }) => {
    const successCallback = warpPlusSuccessCallback(resolve);
    const errorCallback = warpPlusErrorCallback(reject);
    getService(provider)
        .then((service) => service.preLogin(successCallback, errorCallback))
        .catch(errorCallback);
}, PreLoginProtocol, PreLoginOptions);
const _closeAuthView = () => getService('univerify').then((service) => service.closeAuthView());
const closeAuthView = defineSyncApi(API_CLOSE_AUTH_VIEW, _closeAuthView);
const getCheckBoxState = defineAsyncApi(API_GET_CHECK_BOX_STATE, (_, { resolve, reject }) => {
    const successCallback = warpPlusSuccessCallback(resolve);
    const errorCallback = warpPlusErrorCallback(reject);
    try {
        getService('univerify').then((service) => {
            // @ts-expect-error
            const state = service.getCheckBoxState();
            successCallback({ state });
        });
    }
    catch (error) {
        errorCallback(error);
    }
});
/**
 * 一键登录自定义登陆按钮点击处理
 */
function univerifyButtonsClickHandling(univerifyStyle, errorCallback) {
    if (isPlainObject(univerifyStyle) &&
        isPlainObject(univerifyStyle.buttons) &&
        toTypeString(univerifyStyle.buttons.list) === '[object Array]') {
        univerifyStyle.buttons.list.forEach((button, index) => {
            univerifyStyle.buttons.list[index].onclick = function () {
                const res = {
                    code: '30008',
                    message: '用户点击了自定义按钮',
                    index,
                    provider: button.provider,
                };
                isPlainObject(univerifyManager)
                    ? univerifyManager._triggerUniverifyButtonsClick(res)
                    : _closeAuthView().then(() => {
                        errorCallback(res);
                    });
            };
        });
    }
    return univerifyStyle;
}
class UniverifyManager {
    constructor() {
        this.provider = 'univerify';
        this.eventName = 'api.univerifyButtonsClick';
    }
    close() {
        return closeAuthView();
    }
    login(options) {
        return login(this._getOptions(options));
    }
    getCheckBoxState(options) {
        return getCheckBoxState(options);
    }
    preLogin(options) {
        return preLogin(this._getOptions(options));
    }
    onButtonsClick(callback) {
        UniServiceJSBridge.on(this.eventName, callback);
    }
    offButtonsClick(callback) {
        UniServiceJSBridge.off(this.eventName, callback);
    }
    _triggerUniverifyButtonsClick(res) {
        UniServiceJSBridge.emit(this.eventName, res);
    }
    _getOptions(options = {}) {
        return extend({}, options, { provider: this.provider });
    }
}
const getUniverifyManager = defineSyncApi(API_GET_UNIVERIFY_MANAGER, () => {
    return univerifyManager || (univerifyManager = new UniverifyManager());
});

const createPushMessage = defineAsyncApi(API_CREATE_PUSH_MESSAGE, (opts, { resolve, reject }) => {
    const setting = getAppAuthorizeSetting();
    if (setting.notificationAuthorized !== 'authorized') {
        return reject(`notificationAuthorized: ` + setting.notificationAuthorized);
    }
    const options = extend({}, opts);
    delete options.content;
    delete options.payload;
    plus.push.createMessage(opts.content, opts.payload, options);
    resolve();
}, undefined, CreatePushMessageOptions);

const registerRuntime = defineSyncApi('registerRuntime', (runtime) => {
    // @ts-expect-error
    extend(jsRuntime, runtime);
});

// 0:图文，1:纯文字，2:纯图片，3:音乐，4:视频，5:小程序
const TYPES = {
    0: {
        name: 'web',
        title: '图文',
    },
    1: {
        name: 'text',
        title: '纯文字',
    },
    2: {
        name: 'image',
        title: '纯图片',
    },
    3: {
        name: 'music',
        title: '音乐',
    },
    4: {
        name: 'video',
        title: '视频',
    },
    5: {
        name: 'miniProgram',
        title: '小程序',
    },
};
const parseParams = (args) => {
    args.type = args.type || 0;
    let { provider, type, title, summary: content, href, imageUrl, mediaUrl: media, scene, miniProgram, openCustomerServiceChat, corpid, customerUrl: url, } = args;
    if (isString(imageUrl) && imageUrl) {
        imageUrl = getRealPath(imageUrl);
    }
    const shareType = TYPES[type];
    if (shareType) {
        const sendMsg = {
            provider,
            type: shareType.name,
            title,
            content,
            href,
            pictures: [imageUrl],
            thumbs: imageUrl ? [imageUrl] : undefined,
            media,
            miniProgram,
            extra: {
                scene,
            },
            openCustomerServiceChat,
            corpid,
            url,
        };
        if (provider === 'weixin' && (type === 1 || type === 2)) {
            delete sendMsg.thumbs;
        }
        return sendMsg;
    }
    return '分享参数 type 不正确';
};
const sendShareMsg = function (service, params, resolve, reject, method = 'share') {
    const errorCallback = warpPlusErrorCallback(reject);
    const serviceMethod = params.openCustomerServiceChat
        ? 'openCustomerServiceChat'
        : 'send';
    try {
        // @ts-expect-error openCustomerServiceChat
        service[serviceMethod](params, () => {
            resolve();
        }, errorCallback);
    }
    catch (error) {
        errorCallback({
            message: `${params.provider} ${serviceMethod} 方法调用失败`,
        });
    }
};
const share = defineAsyncApi(API_SHREA, (params, { resolve, reject }) => {
    const parsedParams = parseParams(params);
    const errorCallback = warpPlusErrorCallback(reject);
    if (isString(parsedParams)) {
        return reject(parsedParams);
    }
    plus.share.getServices((services) => {
        const service = services.find(({ id }) => id === parsedParams.provider);
        if (!service) {
            reject('service not found');
        }
        else {
            if (service.authenticated) {
                sendShareMsg(service, parsedParams, resolve, reject);
            }
            else {
                service.authorize(() => sendShareMsg(service, parsedParams, resolve, reject), errorCallback);
            }
        }
    }, errorCallback);
}, ShareProtocols, SahreOptions);
const shareWithSystem = defineAsyncApi(API_SHARE_WITH_SYSTEM, ({ type, imageUrl, summary, href }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject);
    if (isString(imageUrl) && imageUrl) {
        imageUrl = getRealPath(imageUrl);
    }
    plus.share.sendWithSystem({
        type,
        pictures: imageUrl ? [imageUrl] : undefined,
        content: summary,
        href,
    }, () => resolve(), errorCallback);
}, ShareWithSystemProtocols, ShareWithSystemOptions);

const requestPayment = defineAsyncApi(API_REQUEST_PAYMENT, (params, { resolve, reject }) => {
    const provider = params.provider;
    const errorCallback = warpPlusErrorCallback(reject);
    plus.payment.getChannels((services) => {
        const service = services.find(({ id }) => id === provider);
        if (!service) {
            reject('service not found');
        }
        else {
            plus.payment.request(service, params.orderInfo, (res) => {
                resolve(res);
            }, errorCallback);
        }
    }, errorCallback);
}, RequestPaymentProtocol);

const sendHostEvent = sendNativeEvent;
const API_NAVIGATE_TO_MINI_PROGRAM = 'navigateToMiniProgram';
const navigateToMiniProgram = defineAsyncApi(API_NAVIGATE_TO_MINI_PROGRAM, (data, { resolve, reject }) => {
    sendHostEvent('navigateToUniMP', data, (res) => {
        if (res.errMsg && res.errMsg.indexOf(':ok') === -1) {
            return reject(res.errMsg.split(' ')[1]);
        }
        resolve();
    });
});
const hostEventCallbacks = [];
function onHostEventReceive(fn) {
    hostEventCallbacks.push(fn);
}
const onNativeEventReceive = onHostEventReceive;
function invokeHostEvent(event, data) {
    hostEventCallbacks.forEach((fn) => fn(event, data));
}

function __log__(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
}
function isDebugMode() {
    // @ts-expect-error
    return typeof __channelId__ === 'string' && __channelId__;
}
function jsonStringifyReplacer(k, p) {
    switch (toRawType(p)) {
        case 'Function':
            return 'function() { [native code] }';
        default:
            return p;
    }
}
function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
        args.push(filename.replace('at ', 'uni-app:///'));
        return console[type].apply(console, args);
    }
    const msgs = args.map(function (v) {
        const type = toTypeString(v).toLowerCase();
        if (['[object object]', '[object array]', '[object module]'].indexOf(type) !==
            -1) {
            try {
                v =
                    '---BEGIN:JSON---' +
                        JSON.stringify(v, jsonStringifyReplacer) +
                        '---END:JSON---';
            }
            catch (e) {
                v = type;
            }
        }
        else {
            if (v === null) {
                v = '---NULL---';
            }
            else if (v === undefined) {
                v = '---UNDEFINED---';
            }
            else {
                const vType = toRawType(v).toUpperCase();
                if (vType === 'NUMBER' || vType === 'BOOLEAN') {
                    v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
                }
                else {
                    v = String(v);
                }
            }
        }
        return v;
    });
    return msgs.join('---COMMA---') + ' ' + filename;
}

let callbackId = 1;
let proxy;
const callbacks = {};
function normalizeArg(arg) {
    if (typeof arg === 'function') {
        // 查找该函数是否已缓存
        const oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg);
        const id = oldId ? parseInt(oldId) : callbackId++;
        callbacks[id] = arg;
        return id;
    }
    else if (isPlainObject(arg)) {
        Object.keys(arg).forEach((name) => {
            arg[name] = normalizeArg(arg[name]);
        });
    }
    return arg;
}
function initUTSInstanceMethod(async, opts, instanceId, proxy) {
    return initProxyFunction(async, opts, instanceId, proxy);
}
function getProxy() {
    if (!proxy) {
        proxy = uni.requireNativePlugin('UTS-Proxy');
    }
    return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceId, proxy) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.log('uts.invokeSync.result', JSON.stringify([res, returnOptions, instanceId, typeof proxy]));
    }
    if (!res) {
        throw new Error('返回值为：' +
            JSON.stringify(res) +
            '；请求参数为：' +
            JSON.stringify(args));
    }
    // devtools 环境是字符串？
    if (isString(res)) {
        try {
            res = JSON.parse(res);
        }
        catch (e) {
            throw new Error(`JSON.parse(${res}): ` + e);
        }
    }
    if (res.errMsg) {
        throw new Error(res.errMsg);
    }
    if (returnOptions) {
        if (returnOptions.type === 'interface' && typeof res.params === 'number') {
            // 返回了 0
            if (!res.params) {
                return null;
            }
            if (res.params === instanceId && proxy) {
                return proxy;
            }
            if (interfaceDefines[returnOptions.options]) {
                const ProxyClass = initUTSProxyClass(extend({ instanceId: res.params }, interfaceDefines[returnOptions.options]));
                return new ProxyClass();
            }
        }
    }
    return res.params;
}
function invokePropGetter(args) {
    if (args.errMsg) {
        throw new Error(args.errMsg);
    }
    delete args.errMsg;
    if ((process.env.NODE_ENV !== 'production')) {
        console.log('uts.invokePropGetter.args', args);
    }
    return resolveSyncResult(args, getProxy().invokeSync(args, () => { }));
}
function initProxyFunction(async, { moduleName, moduleType, package: pkg, class: cls, name: propOrMethod, method, companion, params: methodParams, return: returnOptions, errMsg, }, instanceId, proxy) {
    const invokeCallback = ({ id, name, params, keepAlive, }) => {
        const callback = callbacks[id];
        if (callback) {
            callback(...params);
            if (!keepAlive) {
                delete callbacks[id];
            }
        }
        else {
            console.error(`${pkg}${cls}.${propOrMethod} ${name} is not found`);
        }
    };
    const baseArgs = instanceId
        ? {
            moduleName,
            moduleType,
            id: instanceId,
            name: propOrMethod,
            method: methodParams,
        }
        : {
            moduleName,
            moduleType,
            package: pkg,
            class: cls,
            name: method || propOrMethod,
            companion,
            method: methodParams,
        };
    return (...args) => {
        if (errMsg) {
            throw new Error(errMsg);
        }
        const invokeArgs = extend({}, baseArgs, {
            params: args.map((arg) => normalizeArg(arg)),
        });
        if (async) {
            return new Promise((resolve, reject) => {
                if ((process.env.NODE_ENV !== 'production')) {
                    console.log('uts.invokeAsync.args', invokeArgs);
                }
                getProxy().invokeAsync(invokeArgs, (res) => {
                    if ((process.env.NODE_ENV !== 'production')) {
                        console.log('uts.invokeAsync.result', res);
                    }
                    if (res.type !== 'return') {
                        invokeCallback(res);
                    }
                    else {
                        if (res.errMsg) {
                            reject(res.errMsg);
                        }
                        else {
                            resolve(res.params);
                        }
                    }
                });
            });
        }
        if ((process.env.NODE_ENV !== 'production')) {
            console.log('uts.invokeSync.args', invokeArgs);
        }
        return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback), returnOptions, instanceId, proxy);
    };
}
function initUTSStaticMethod(async, opts) {
    if (opts.main && !opts.method) {
        if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
            opts.method = 's_' + opts.name;
        }
    }
    return initProxyFunction(async, opts, 0);
}
const initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
    if (hasOwn$1(methods, name + 'ByJs')) {
        return name + 'ByJs';
    }
    return name;
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isProxyInterfaceOptions(options) {
    return !isUndefined(options.instanceId);
}
function initUTSProxyClass(options) {
    const { moduleName, moduleType, package: pkg, class: cls, methods, props, errMsg, } = options;
    const baseOptions = {
        moduleName,
        moduleType,
        package: pkg,
        class: cls,
        errMsg,
    };
    let instanceId;
    let constructorParams = [];
    let staticMethods = {};
    let staticProps = [];
    let isProxyInterface = false;
    if (isProxyInterfaceOptions(options)) {
        isProxyInterface = true;
        instanceId = options.instanceId;
    }
    else {
        constructorParams = options.constructor.params;
        staticMethods = options.staticMethods;
        staticProps = options.staticProps;
    }
    // iOS 需要为 ByJs 的 class 构造函数（如果包含JSONObject或UTSCallback类型）补充最后一个参数
    if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
        if (constructorParams.find((p) => p.type === 'UTSCallback' || p.type.indexOf('JSONObject') > 0)) {
            constructorParams.push({ name: '_byJs', type: 'boolean' });
        }
    }
    const ProxyClass = class UTSClass {
        constructor(...params) {
            this.__instanceId = 0;
            if (errMsg) {
                throw new Error(errMsg);
            }
            const target = {};
            // 初始化实例 ID
            if (!isProxyInterface) {
                // 初始化未指定时，每次都要创建instanceId
                this.__instanceId = initProxyFunction(false, extend({ name: 'constructor', params: constructorParams }, baseOptions), 0).apply(null, params);
            }
            else if (typeof instanceId === 'number') {
                this.__instanceId = instanceId;
            }
            if (!this.__instanceId) {
                throw new Error(`new ${cls} is failed`);
            }
            const instance = this;
            const proxy = new Proxy(instance, {
                get(_, name) {
                    if (!target[name]) {
                        //实例方法
                        name = parseClassMethodName(name, methods);
                        if (hasOwn$1(methods, name)) {
                            const { async, params, return: returnOptions } = methods[name];
                            target[name] = initUTSInstanceMethod(!!async, extend({
                                name,
                                params,
                                return: returnOptions,
                            }, baseOptions), instance.__instanceId, proxy);
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({
                                moduleName,
                                moduleType,
                                id: instance.__instanceId,
                                name: name,
                                errMsg,
                            });
                        }
                    }
                    return target[name];
                },
            });
            return proxy;
        }
    };
    const staticMethodCache = {};
    return new Proxy(ProxyClass, {
        get(target, name, receiver) {
            name = parseClassMethodName(name, staticMethods);
            if (hasOwn$1(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    const { async, params, return: returnOptions } = staticMethods[name];
                    // 静态方法
                    staticMethodCache[name] = initUTSStaticMethod(!!async, extend({ name, companion: true, params, return: returnOptions }, baseOptions));
                }
                return staticMethodCache[name];
            }
            if (staticProps.includes(name)) {
                // 静态属性
                return invokePropGetter(extend({ name: name, companion: true }, baseOptions));
            }
            return Reflect.get(target, name, receiver);
        },
    });
}
function initUTSPackageName(name, is_uni_modules) {
    if (typeof plus !== 'undefined' && plus.os.name === 'Android') {
        return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name;
    }
    return '';
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    return initUTSClassName(moduleName, plus.os.name === 'iOS' ? 'IndexSwift' : 'IndexKt', is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    if (plus.os.name === 'Android') {
        return className;
    }
    if (plus.os.name === 'iOS') {
        return ('UTSSDK' +
            (is_uni_modules ? 'Modules' : '') +
            capitalize(moduleName) +
            capitalize(className));
    }
    return '';
}
const interfaceDefines = {};
function registerUTSInterface(name, define) {
    interfaceDefines[name] = define;
}
const pluginDefines = {};
function registerUTSPlugin(name, define) {
    pluginDefines[name] = define;
}
function requireUTSPlugin(name) {
    const define = pluginDefines[name];
    if (!define) {
        console.error(`${name} is not found`);
    }
    return define;
}

const EventType = {
    load: 'load',
    close: 'close',
    error: 'error',
    adClicked: 'adClicked',
};
class AdEventHandler {
    constructor() {
        this._callbacks = {};
    }
    onLoad(callback) {
        this._addEventListener(EventType.load, callback);
    }
    onClose(callback) {
        this._addEventListener(EventType.close, callback);
    }
    onError(callback) {
        this._addEventListener(EventType.error, callback);
    }
    offLoad(callback) {
        this._removeEventListener(EventType.load, callback);
    }
    offClose(callback) {
        this._removeEventListener(EventType.close, callback);
    }
    offError(callback) {
        this._removeEventListener(EventType.error, callback);
    }
    _addEventListener(type, callback) {
        if (!isFunction(callback)) {
            return;
        }
        if (!this._callbacks[type]) {
            this._callbacks[type] = [];
        }
        this._callbacks[type].push(callback);
    }
    _removeEventListener(type, callback) {
        const arrayFunction = this._callbacks[type];
        const index = arrayFunction.indexOf(callback);
        if (index > -1) {
            arrayFunction.splice(index, 1);
        }
    }
    _dispatchEvent(name, data) {
        this._callbacks[name].forEach((callback) => {
            callback(data || {});
        });
    }
}
class AdBase extends AdEventHandler {
    constructor(adInstance, options) {
        super();
        this.preload = true;
        this._isLoaded = false;
        this._isLoading = false;
        this._loadPromiseResolve = null;
        this._loadPromiseReject = null;
        this._showPromiseResolve = null;
        this._showPromiseReject = null;
        this.preload = options.preload !== undefined ? options.preload : false;
        const ad = (this._adInstance = adInstance);
        ad.onLoad(() => {
            this._isLoaded = true;
            this._isLoading = false;
            if (this._loadPromiseResolve != null) {
                this._loadPromiseResolve();
                this._loadPromiseResolve = null;
            }
            if (this._showPromiseResolve != null) {
                this._showPromiseResolve();
                this._showPromiseResolve = null;
                this._showAd();
            }
            this._dispatchEvent(EventType.load, {});
        });
        ad.onClose((e) => {
            this._isLoaded = false;
            this._isLoading = false;
            this._dispatchEvent(EventType.close, e);
            if (this.preload === true) {
                this._loadAd();
            }
        });
        ad.onError((e) => {
            this._isLoading = false;
            const data = {
                code: e.code,
                errMsg: e.message,
            };
            this._dispatchEvent(EventType.error, data);
            const error = new Error(JSON.stringify(data));
            if (this._loadPromiseReject != null) {
                this._loadPromiseReject(error);
                this._loadPromiseReject = null;
            }
            if (this._showPromiseReject != null) {
                this._showPromiseReject(error);
                this._showPromiseReject = null;
            }
        });
        ad.onAdClicked &&
            ad.onAdClicked(() => {
                this._dispatchEvent(EventType.adClicked, {});
            });
    }
    getProvider() {
        return this._adInstance.getProvider();
    }
    load() {
        return new Promise((resolve, reject) => {
            this._loadPromiseResolve = resolve;
            this._loadPromiseReject = reject;
            if (this._isLoading) {
                return;
            }
            if (this._isLoaded) {
                resolve('');
            }
            else {
                this._loadAd();
            }
        });
    }
    show() {
        return new Promise((resolve, reject) => {
            this._showPromiseResolve = resolve;
            this._showPromiseReject = reject;
            if (this._isLoading) {
                return;
            }
            if (this._isLoaded) {
                this._showAd();
                resolve('');
            }
            else {
                this._loadAd();
            }
        });
    }
    destroy() {
        this._adInstance.destroy();
    }
    _loadAd() {
        this._isLoaded = false;
        this._isLoading = true;
        this._adInstance.load();
    }
    _showAd() {
        this._adInstance.show();
    }
}

class RewardedVideoAd extends AdBase {
    constructor(options) {
        super(plus.ad.createRewardedVideoAd(options), options);
        this._loadAd();
    }
}
const createRewardedVideoAd = defineSyncApi(API_CREATE_REWARDED_VIDEO_AD, (options) => {
    return new RewardedVideoAd(options);
}, CreateRewardedVideoAdProtocol, CreateRewardedVideoAdOptions);

class FullScreenVideoAd extends AdBase {
    constructor(options) {
        super(plus.ad.createFullScreenVideoAd(options), options);
        this.preload = false;
    }
}
const createFullScreenVideoAd = defineSyncApi(API_CREATE_FULL_SCREEN_VIDEO_AD, (options) => {
    return new FullScreenVideoAd(options);
}, CreateFullScreenVideoAdProtocol, CreateFullScreenVideoAdOptions);

class InterstitialAd extends AdBase {
    constructor(options) {
        super(plus.ad.createInterstitialAd(options), options);
        this.preload = false;
        this._loadAd();
    }
}
const createInterstitialAd = defineSyncApi(API_CREATE_INTERSTITIAL_AD, (options) => {
    return new InterstitialAd(options);
}, CreateInterstitialAdProtocol, CreateInterstitialAdOptions);

const sdkCache = {};
const sdkQueue = {};
function initSDK(options) {
    const provider = options.provider;
    if (!sdkCache[provider]) {
        sdkCache[provider] = {};
    }
    if (typeof sdkCache[provider].plugin === 'object') {
        options.success(sdkCache[provider].plugin);
        return;
    }
    if (!sdkQueue[provider]) {
        sdkQueue[provider] = [];
    }
    sdkQueue[provider].push(options);
    if (sdkCache[provider].status === true) {
        options.__plugin = sdkCache[provider].plugin;
        return;
    }
    sdkCache[provider].status = true;
    const plugin = requireNativePlugin(provider);
    if (!plugin || !plugin.initSDK) {
        sdkQueue[provider].forEach((item) => {
            item.fail({
                code: -1,
                message: 'provider [' + provider + '] invalid',
            });
        });
        sdkQueue[provider].length = 0;
        sdkCache[provider].status = false;
        return;
    }
    // TODO
    sdkCache[provider].plugin = plugin;
    options.__plugin = plugin;
    plugin.initSDK((res) => {
        const isSuccess = res.code === 1 || res.code === '1';
        if (isSuccess) {
            sdkCache[provider].plugin = plugin;
        }
        else {
            sdkCache[provider].status = false;
        }
        sdkQueue[provider].forEach((item) => {
            if (isSuccess) {
                item.success(item.__plugin);
            }
            else {
                item.fail(res);
            }
        });
        sdkQueue[provider].length = 0;
    });
}
class InteractiveAd extends AdEventHandler {
    constructor(options) {
        super();
        this._adpid = '';
        this._provider = '';
        this._userData = null;
        this._isLoaded = false;
        this._isLoading = false;
        this._loadPromiseResolve = null;
        this._loadPromiseReject = null;
        this._showPromiseResolve = null;
        this._showPromiseReject = null;
        this._adInstance = null;
        this._adError = '';
        this._adpid = options.adpid;
        this._provider = options.provider;
        this._userData = options.userData;
        setTimeout(() => {
            this._init();
        });
    }
    _init() {
        this._adError = '';
        initSDK({
            provider: this._provider,
            success: (res) => {
                this._adInstance = res;
                if (this._userData) {
                    this.bindUserData(this._userData);
                }
                this._loadAd();
            },
            fail: (err) => {
                this._adError = err;
                if (this._loadPromiseReject != null) {
                    this._loadPromiseReject(this._createError(err));
                    this._loadPromiseReject = null;
                }
                this._dispatchEvent(EventType.error, err);
            },
        });
    }
    getProvider() {
        return this._provider;
    }
    load() {
        return new Promise((resolve, reject) => {
            this._loadPromiseResolve = resolve;
            this._loadPromiseReject = reject;
            if (this._isLoading) {
                return;
            }
            if (this._adError) {
                this._init();
                return;
            }
            if (this._isLoaded) {
                resolve('');
            }
            else {
                this._loadAd();
            }
        });
    }
    show() {
        return new Promise((resolve, reject) => {
            this._showPromiseResolve = resolve;
            this._showPromiseReject = reject;
            if (this._isLoading) {
                return;
            }
            if (this._adError) {
                this._init();
                return;
            }
            if (this._isLoaded) {
                this._showAd();
                resolve('');
            }
            else {
                this._loadAd();
            }
        });
    }
    reportExposure() {
        if (this._adInstance !== null) {
            this._adInstance.reportExposure();
        }
    }
    bindUserData(data) {
        if (this._adInstance !== null) {
            this._adInstance.bindUserData(data);
        }
    }
    destroy() {
        if (this._adInstance !== null && this._adInstance.destroy) {
            this._adInstance.destroy({
                adpid: this._adpid,
            });
        }
    }
    _loadAd() {
        if (this._adInstance !== null) {
            if (this._isLoading === true) {
                return;
            }
            this._isLoading = true;
            this._adInstance.loadData({
                adpid: this._adpid,
            }, (res) => {
                this._isLoaded = true;
                this._isLoading = false;
                if (this._loadPromiseResolve != null) {
                    this._loadPromiseResolve();
                    this._loadPromiseResolve = null;
                }
                if (this._showPromiseResolve != null) {
                    this._showPromiseResolve();
                    this._showPromiseResolve = null;
                    this._showAd();
                }
                this._dispatchEvent(EventType.load, res);
            }, (err) => {
                this._isLoading = false;
                if (this._showPromiseReject != null) {
                    this._showPromiseReject(this._createError(err));
                    this._showPromiseReject = null;
                }
                this._dispatchEvent(EventType.error, err);
            });
        }
    }
    _showAd() {
        if (this._adInstance !== null && this._isLoaded === true) {
            this._adInstance.show({
                adpid: this._adpid,
            }, () => {
                this._isLoaded = false;
            }, (err) => {
                this._isLoaded = false;
                if (this._showPromiseReject != null) {
                    this._showPromiseReject(this._createError(err));
                    this._showPromiseReject = null;
                }
                this._dispatchEvent(EventType.error, err);
            });
        }
    }
    _createError(err) {
        return new Error(JSON.stringify(err));
    }
}
const createInteractiveAd = defineSyncApi(API_CREATE_INTERACTIVE_AD, (options) => {
    return new InteractiveAd(options);
}, CreateInteractiveAdProtocol, CreateInteractiveAdOptions);

const downgrade = plus.os.name === 'Android' && parseInt(plus.os.version) < 6;
const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in';
const ANI_DURATION = 300;
const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out';
const VIEW_WEBVIEW_PATH = '_www/__uniappview.html';
const WEBVIEW_ID_PREFIX = 'webviewId';
const SDK_UNI_MP_NATIVE_EVENT = 'uniMPNativeEvent';

function initNVue(webviewStyle, routeMeta, path) {
    if (path && routeMeta.isNVue) {
        webviewStyle.uniNView = {
            path,
            defaultFontSize: __uniConfig.defaultFontSize,
            viewport: __uniConfig.viewport,
        };
    }
}

const colorRE = /^#[a-z0-9]{6}$/i;
function isColor(color) {
    return color && (colorRE.test(color) || color === 'transparent');
}

function initBackgroundColor(webviewStyle, routeMeta) {
    let { backgroundColor } = routeMeta;
    if (!backgroundColor) {
        return;
    }
    if (!isColor(backgroundColor)) {
        return;
    }
    if (!webviewStyle.background) {
        webviewStyle.background = backgroundColor;
    }
    else {
        backgroundColor = webviewStyle.background;
    }
    if (!webviewStyle.backgroundColorTop) {
        webviewStyle.backgroundColorTop = backgroundColor;
    }
    if (!webviewStyle.backgroundColorBottom) {
        webviewStyle.backgroundColorBottom = backgroundColor;
    }
    if (!webviewStyle.animationAlphaBGColor) {
        webviewStyle.animationAlphaBGColor = backgroundColor;
    }
    if (typeof webviewStyle.webviewBGTransparent === 'undefined') {
        webviewStyle.webviewBGTransparent = true;
    }
}

function initPopGesture(webviewStyle, routeMeta) {
    // 不支持 hide
    if (webviewStyle.popGesture === 'hide') {
        delete webviewStyle.popGesture;
    }
    // 似乎没用了吧？记得是之前流应用时，需要 appback 的逻辑
    if (routeMeta.isQuit) {
        webviewStyle.popGesture = (plus.os.name === 'iOS' ? 'appback' : 'none');
    }
}

function initPullToRefresh(webviewStyle, routeMeta) {
    if (!routeMeta.enablePullDownRefresh) {
        return;
    }
    const pullToRefresh = normalizePullToRefreshRpx(extend({}, plus.os.name === 'Android'
        ? defaultAndroidPullToRefresh
        : defaultPullToRefresh, routeMeta.pullToRefresh));
    webviewStyle.pullToRefresh = initWebviewPullToRefreshI18n(pullToRefresh, routeMeta);
}
function initWebviewPullToRefreshI18n(pullToRefresh, routeMeta) {
    const i18nResult = initPullToRefreshI18n(pullToRefresh);
    if (!i18nResult) {
        return pullToRefresh;
    }
    const [contentdownI18n, contentoverI18n, contentrefreshI18n] = i18nResult;
    if (contentdownI18n || contentoverI18n || contentrefreshI18n) {
        uni.onLocaleChange(() => {
            const webview = plus.webview.getWebviewById(routeMeta.id + '');
            if (!webview) {
                return;
            }
            const newPullToRefresh = {
                support: true,
            };
            if (contentdownI18n) {
                newPullToRefresh.contentdown = {
                    caption: pullToRefresh.contentdown.caption,
                };
            }
            if (contentoverI18n) {
                newPullToRefresh.contentover = {
                    caption: pullToRefresh.contentover.caption,
                };
            }
            if (contentrefreshI18n) {
                newPullToRefresh.contentrefresh = {
                    caption: pullToRefresh.contentrefresh.caption,
                };
            }
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('updateWebview', webview.id, newPullToRefresh));
            }
            webview.setStyle({
                pullToRefresh: newPullToRefresh,
            });
        });
    }
    return pullToRefresh;
}
const defaultAndroidPullToRefresh = { support: true, style: 'circle' };
const defaultPullToRefresh = {
    support: true,
    style: 'default',
    height: '50px',
    range: '200px',
    contentdown: {
        caption: '',
    },
    contentover: {
        caption: '',
    },
    contentrefresh: {
        caption: '',
    },
};

function initTitleNView(webviewStyle, routeMeta) {
    const { navigationBar } = routeMeta;
    if (navigationBar.style === 'custom') {
        return false;
    }
    let autoBackButton = true;
    if (routeMeta.isQuit) {
        autoBackButton = false;
    }
    const titleNView = {
        autoBackButton,
    };
    Object.keys(navigationBar).forEach((name) => {
        const value = navigationBar[name];
        if (name === 'titleImage' && value) {
            titleNView.tags = createTitleImageTags(value);
        }
        else if (name === 'buttons' && isArray(value)) {
            titleNView.buttons = value.map((button, index) => {
                button.onclick = createTitleNViewBtnClick(index);
                return button;
            });
        }
        else {
            titleNView[name] =
                value;
        }
    });
    webviewStyle.titleNView = initTitleNViewI18n(titleNView, routeMeta);
}
function initTitleNViewI18n(titleNView, routeMeta) {
    const i18nResult = initNavigationBarI18n(titleNView);
    if (!i18nResult) {
        return titleNView;
    }
    const [titleTextI18n, searchInputPlaceholderI18n] = i18nResult;
    if (titleTextI18n || searchInputPlaceholderI18n) {
        uni.onLocaleChange(() => {
            const webview = plus.webview.getWebviewById(routeMeta.id + '');
            if (!webview) {
                return;
            }
            const newTitleNView = {};
            if (titleTextI18n) {
                newTitleNView.titleText = titleNView.titleText;
            }
            if (searchInputPlaceholderI18n) {
                newTitleNView.searchInput = {
                    placeholder: titleNView.searchInput.placeholder,
                };
            }
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('updateWebview', webview.id, newTitleNView));
            }
            webview.setStyle({
                titleNView: newTitleNView,
            });
        });
    }
    return titleNView;
}
function createTitleImageTags(titleImage) {
    return [
        {
            tag: 'img',
            src: titleImage,
            position: {
                left: 'auto',
                top: 'auto',
                width: 'auto',
                height: '26px',
            },
        },
    ];
}
function createTitleNViewBtnClick(index) {
    return function onClick(btn) {
        btn.index = index;
        invokeHook(ON_NAVIGATION_BAR_BUTTON_TAP, btn);
    };
}

function parseWebviewStyle(path, routeMeta, webview) {
    const webviewStyle = {
        bounce: 'vertical',
    };
    Object.keys(routeMeta).forEach((name) => {
        if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
            webviewStyle[name] =
                routeMeta[name];
        }
    });
    if (webview.id !== '1') {
        // 首页 nvue 已经在 manifest.json 中设置了 uniNView，不能再次设置，否则会二次加载
        initNVue(webviewStyle, routeMeta, path);
    }
    initPopGesture(webviewStyle, routeMeta);
    initBackgroundColor(webviewStyle, routeMeta);
    initTitleNView(webviewStyle, routeMeta);
    initPullToRefresh(webviewStyle, routeMeta);
    return webviewStyle;
}
const WEBVIEW_STYLE_BLACKLIST = [
    'id',
    'route',
    'isNVue',
    'isQuit',
    'isEntry',
    'isTabBar',
    'tabBarIndex',
    'windowTop',
    'topWindow',
    'leftWindow',
    'rightWindow',
    'maxWidth',
    'usingComponents',
    'disableScroll',
    'enablePullDownRefresh',
    'navigationBar',
    'pullToRefresh',
    'onReachBottomDistance',
    'pageOrientation',
    'backgroundColor',
];

let id = 2;
function getWebviewId() {
    return id;
}
function genWebviewId() {
    return id++;
}
function encode(val) {
    return val;
}
function initUniPageUrl(path, query) {
    const queryString = query ? stringifyQuery$1(query, encode) : '';
    return {
        path: path.slice(1),
        query: queryString ? queryString.slice(1) : queryString,
    };
}
function initDebugRefresh(isTab, path, query) {
    const queryString = query ? stringifyQuery$1(query, encode) : '';
    return {
        isTab,
        arguments: JSON.stringify({
            path: path.slice(1),
            query: queryString ? queryString.slice(1) : queryString,
        }),
    };
}

function createNVueWebview({ path, query, routeOptions, webviewExtras, }) {
    const getCurWebviewStyle = () => parseWebviewStyle(path, parseTheme(routeOptions.meta), {
        id: curWebviewId + '',
    });
    const curWebviewId = genWebviewId();
    const curWebviewStyle = getCurWebviewStyle();
    curWebviewStyle.uniPageUrl = initUniPageUrl(path, query);
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('createNVueWebview', curWebviewId, path, curWebviewStyle));
    }
    curWebviewStyle.isTab = !!routeOptions.meta.isTabBar;
    const webview = plus.webview.create('', String(curWebviewId), curWebviewStyle, extend({
        nvue: true,
        __path__: path,
        __query__: JSON.stringify(query),
    }, webviewExtras));
    useWebviewThemeChange(webview, getCurWebviewStyle);
    return webview;
}

let preloadWebview$1;
function setPreloadWebview(webview) {
    preloadWebview$1 = webview;
}
function getPreloadWebview() {
    return preloadWebview$1;
}
function createPreloadWebview() {
    if (!preloadWebview$1 || preloadWebview$1.__uniapp_route) {
        // 不存在，或已被使用
        preloadWebview$1 = plus.webview.create(VIEW_WEBVIEW_PATH, String(genWebviewId()), 
        // @ts-expect-error
        { contentAdjust: false });
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(formatLog('createPreloadWebview', preloadWebview$1.id));
        }
    }
    return preloadWebview$1;
}

function onWebviewClose(webview) {
    const { popupSubNVueWebviews } = webview;
    if (!popupSubNVueWebviews) {
        return;
    }
    webview.addEventListener('close', () => {
        Object.keys(popupSubNVueWebviews).forEach((id) => {
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('onWebviewClose', webview.id, 'popupSubNVueWebview', id, 'close'));
            }
            popupSubNVueWebviews[id].close('none');
        });
    });
}

/**
 * 是否处于直达页面
 * @param page
 * @returns
 */
function isDirectPage(page) {
    return (__uniConfig.realEntryPagePath &&
        page.$page.route === __uniConfig.entryPagePath);
}
/**
 * 重新启动到首页
 */
function reLaunchEntryPage() {
    __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
    delete __uniConfig.realEntryPagePath;
    uni.reLaunch({
        url: addLeadingSlash(__uniConfig.entryPagePath),
    });
}

function onWebviewPopGesture(webview) {
    let popStartStatusBarStyle;
    webview.addEventListener('popGesture', (e) => {
        if (e.type === 'start') {
            // 设置下一个页面的 statusBarStyle
            const pages = getCurrentPages();
            const page = pages[pages.length - 2];
            popStartStatusBarStyle = lastStatusBarStyle;
            const statusBarStyle = page && page.$page.statusBarStyle;
            statusBarStyle && setStatusBarStyle(statusBarStyle);
        }
        else if (e.type === 'end' && !e.result) {
            // 拖拽未完成,设置为当前状态栏前景色
            setStatusBarStyle(popStartStatusBarStyle);
        }
        else if (e.type === 'end' && e.result) {
            const len = getCurrentPages().length;
            const page = getCurrentPage();
            removeCurrentPage();
            setStatusBarStyle();
            if (page && len === 1 && isDirectPage(page)) {
                reLaunchEntryPage();
            }
            else {
                // 触发前一个页面 onShow
                invokeHook(ON_SHOW);
            }
        }
    });
}

function onWebviewRecovery(webview) {
    if (webview.nvue) {
        return;
    }
    const webviewId = webview.id;
    const { subscribe, unsubscribe } = UniServiceJSBridge;
    const onWebviewRecoveryReady = (_, pageId) => {
        if (webviewId !== pageId) {
            return;
        }
        unsubscribe(ON_WEBVIEW_READY, onWebviewRecoveryReady);
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(formatLog(`Recovery`, webviewId, 'ready'));
        }
        const page = getPageById(parseInt(pageId));
        if (page) {
            const pageNode = page.__page_container__;
            pageNode.restore();
        }
    };
    // @ts-expect-error
    webview.addEventListener('recovery', () => {
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(formatLog('Recovery', webview.id));
        }
        subscribe(ON_WEBVIEW_READY, onWebviewRecoveryReady);
    });
}

function onWebviewResize(webview) {
    const { emit } = UniServiceJSBridge;
    const onResize = function ({ width, height, }) {
        const landscape = Math.abs(plus.navigator.getOrientation()) === 90;
        const res = {
            deviceOrientation: landscape ? 'landscape' : 'portrait',
            size: {
                windowWidth: Math.ceil(width),
                windowHeight: Math.ceil(height),
            },
        };
        emit(ON_RESIZE, res, parseInt(webview.id)); // Page lifecycle
    };
    webview.addEventListener('resize', debounce(onResize, 50, { setTimeout, clearTimeout }));
}

const WEBVIEW_LISTENERS = {
    pullToRefresh: ON_PULL_DOWN_REFRESH,
    titleNViewSearchInputChanged: ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
    titleNViewSearchInputConfirmed: ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
    titleNViewSearchInputClicked: ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
    titleNViewSearchInputFocusChanged: ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
};
function initWebviewEvent(webview) {
    const id = parseInt(webview.id);
    Object.keys(WEBVIEW_LISTENERS).forEach((name) => {
        const hook = WEBVIEW_LISTENERS[name];
        webview.addEventListener(name, (e) => {
            if (hook === ON_PULL_DOWN_REFRESH) {
                // 设置当前正在下拉刷新的webview
                setPullDownRefreshWebview(webview);
            }
            invokeHook(id, hook, e);
        });
    });
    onWebviewClose(webview);
    onWebviewResize(webview);
    if (plus.os.name === 'iOS') {
        onWebviewRecovery(webview);
        onWebviewPopGesture(webview);
    }
}

function initWebviewStyle(webview, path, query, routeMeta) {
    const getWebviewStyle = () => parseWebviewStyle(path, parseTheme(routeMeta), webview);
    const webviewStyle = getWebviewStyle();
    webviewStyle.uniPageUrl = initUniPageUrl(path, query);
    const isTabBar = !!routeMeta.isTabBar;
    if (!routeMeta.isNVue) {
        webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query);
    }
    else {
        // android 需要使用
        webviewStyle.isTab = isTabBar;
    }
    webviewStyle.locale = weex.requireModule('plus').getLanguage();
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('updateWebview', webviewStyle));
    }
    useWebviewThemeChange(webview, getWebviewStyle);
    webview.setStyle(webviewStyle);
}

function initSubNVues(webview, path, routeMeta) {
    const subNVues = routeMeta.subNVues || [];
    subNVues.forEach((subNVue) => {
        if (!subNVue.path) {
            return;
        }
        const style = normalizeSubNVueStyle((subNVue.style || {}));
        const isNavigationBar = subNVue.type === 'navigationBar';
        const isPopup = subNVue.type === 'popup';
        style.uniNView = {
            path: subNVue.path.replace('.nvue', '.js'),
            defaultFontSize: __uniConfig.defaultFontSize,
            viewport: __uniConfig.viewport,
        };
        const extras = {
            __uniapp_host: path,
            __uniapp_origin: style.uniNView.path.split('?')[0].replace('.js', ''),
            __uniapp_origin_id: webview.id,
            __uniapp_origin_type: webview.__uniapp_type,
        };
        let maskWebview;
        if (isNavigationBar) {
            style.position = 'dock';
            style.dock = 'top';
            style.top = '0';
            style.width = '100%';
            style.height = String(NAVBAR_HEIGHT + getStatusbarHeight());
            delete style.left;
            delete style.right;
            delete style.bottom;
            delete style.margin;
        }
        else if (isPopup) {
            style.position = 'absolute';
            if (isTabBarPage(path)) {
                maskWebview = tabBarInstance;
            }
            else {
                maskWebview = webview;
            }
            extras.__uniapp_mask = style.mask || 'rgba(0,0,0,0.5)';
            extras.__uniapp_mask_id = maskWebview.id;
        }
        delete style.mask;
        const subNVueWebview = plus.webview.create('', subNVue.id, style, extras);
        if (isPopup) {
            if (!maskWebview.popupSubNVueWebviews) {
                maskWebview.popupSubNVueWebviews = {};
            }
            maskWebview.popupSubNVueWebviews[subNVueWebview.id] = subNVueWebview;
            const hideSubNVue = function () {
                maskWebview.setStyle({
                    mask: 'none',
                });
                subNVueWebview.hide('auto');
            };
            maskWebview.addEventListener('maskClick', hideSubNVue);
            let isRemoved = false; // 增加个 remove 标记，防止出错
            subNVueWebview.addEventListener('show', () => {
                if (!isRemoved) {
                    plus.key.removeEventListener('backbutton', backbuttonListener);
                    plus.key.addEventListener('backbutton', hideSubNVue);
                    isRemoved = true;
                }
            });
            subNVueWebview.addEventListener('hide', () => {
                if (isRemoved) {
                    plus.key.removeEventListener('backbutton', hideSubNVue);
                    plus.key.addEventListener('backbutton', backbuttonListener);
                    isRemoved = false;
                }
            });
            subNVueWebview.addEventListener('close', () => {
                delete maskWebview.popupSubNVueWebviews[subNVueWebview.id];
                if (isRemoved) {
                    plus.key.removeEventListener('backbutton', hideSubNVue);
                    plus.key.addEventListener('backbutton', backbuttonListener);
                    isRemoved = false;
                }
            });
        }
        else {
            webview.append(subNVueWebview);
        }
    });
}

function initWebview(webview, path, query, routeMeta) {
    // 首页或非 nvue 页面
    if (webview.id === '1' || !routeMeta.isNVue) {
        initWebviewStyle(webview, path, query, routeMeta);
    }
    initSubNVues(webview, path, routeMeta);
    initWebviewEvent(webview);
}

function createWebview(options) {
    if (options.routeOptions.meta.isNVue) {
        return createNVueWebview(options);
    }
    if (getWebviewId() === 2) {
        // 如果首页非 nvue，则直接返回 Launch Webview
        return plus.webview.getLaunchWebview();
    }
    return getPreloadWebview();
}
function onWebviewReady(pageId, callback) {
    UniServiceJSBridge.once(ON_WEBVIEW_READY + '.' + pageId, callback);
}

let pendingNavigator = false;
function setPendingNavigator(path, callback, msg) {
    pendingNavigator = {
        path,
        nvue: getRouteMeta(path).isNVue,
        callback,
    };
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('setPendingNavigator', path, msg));
    }
}
function closePage(page, animationType, animationDuration) {
    removePage(page);
    closeWebview(page.$getAppWebview(), animationType, animationDuration);
}
function navigate(path, callback, isAppLaunch = false) {
    if (!isAppLaunch && pendingNavigator) {
        return console.error(`Waiting to navigate to: ${pendingNavigator.path}, do not operate continuously: ${path}.`);
    }
    if (__uniConfig.renderer === 'native') {
        // 纯原生无需wait逻辑
        // 如果是首页还未初始化，需要等一等，其他无需等待
        if (getCurrentPages().length === 0) {
            return setPendingNavigator(path, callback, 'waitForReady');
        }
        return callback();
    }
    // 未创建 preloadWebview 或 preloadWebview 已被使用
    const waitPreloadWebview = !preloadWebview$1 || (preloadWebview$1 && preloadWebview$1.__uniapp_route);
    // 已创建未 loaded
    const waitPreloadWebviewReady = preloadWebview$1 && !preloadWebview$1.loaded;
    if (waitPreloadWebview || waitPreloadWebviewReady) {
        setPendingNavigator(path, callback, waitPreloadWebview ? 'waitForCreate' : 'waitForReady');
    }
    else {
        callback();
    }
    if (waitPreloadWebviewReady) {
        onWebviewReady(preloadWebview$1.id, pendingNavigate);
    }
}
function pendingNavigate() {
    if (!pendingNavigator) {
        return;
    }
    const { callback } = pendingNavigator;
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('pendingNavigate', pendingNavigator.path));
    }
    pendingNavigator = false;
    return callback();
}
function navigateFinish() {
    if (__uniConfig.renderer === 'native') {
        if (!pendingNavigator) {
            return;
        }
        if (pendingNavigator.nvue) {
            return pendingNavigate();
        }
        return;
    }
    // 创建预加载
    const preloadWebview = createPreloadWebview();
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('navigateFinish', 'preloadWebview', preloadWebview.id));
    }
    if (!pendingNavigator) {
        return;
    }
    if (pendingNavigator.nvue) {
        return pendingNavigate();
    }
    preloadWebview.loaded
        ? pendingNavigator.callback()
        : onWebviewReady(preloadWebview.id, pendingNavigate);
}

function closeWebview(webview, animationType, animationDuration) {
    webview[webview.__preload__ ? 'hide' : 'close'](animationType, animationDuration);
}
function showWebview(webview, animationType, animationDuration, showCallback, delay) {
    if (typeof delay === 'undefined') {
        delay = webview.nvue ? 0 : 100;
    }
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('showWebview', 'delay', delay));
    }
    const execShowCallback = function () {
        if (execShowCallback._called) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('execShowCallback', 'prevent'));
            }
            return;
        }
        execShowCallback._called = true;
        showCallback && showCallback();
        navigateFinish();
    };
    execShowCallback._called = false;
    setTimeout(() => {
        const timer = setTimeout(() => {
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('showWebview', 'callback', 'timer'));
            }
            execShowCallback();
        }, animationDuration + 150);
        webview.show(animationType, animationDuration, () => {
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('showWebview', 'callback'));
            }
            if (!execShowCallback._called) {
                clearTimeout(timer);
            }
            execShowCallback();
        });
    }, delay);
}
function backWebview(webview, callback) {
    const children = webview.children();
    if (!children || !children.length) {
        // 有子 webview
        return callback();
    }
    // 如果页面有subNvues，切使用了webview组件，则返回时子webview会取错，因此需要做id匹配
    const childWebview = children.find((webview) => webview.id.indexOf(WEBVIEW_ID_PREFIX) === 0) ||
        children[0];
    childWebview.canBack(({ canBack }) => {
        if (canBack) {
            childWebview.back(); // webview 返回
        }
        else {
            callback();
        }
    });
}

const navigateBack = defineAsyncApi(API_NAVIGATE_BACK, (args, { resolve, reject }) => {
    const page = getCurrentPage();
    if (!page) {
        return reject(`getCurrentPages is empty`);
    }
    if (invokeHook(page, ON_BACK_PRESS, {
        from: args.from || 'navigateBack',
    })) {
        return resolve();
    }
    uni.hideToast();
    uni.hideLoading();
    if (page.$page.meta.isQuit) {
        quit();
    }
    else if (isDirectPage(page)) {
        reLaunchEntryPage();
    }
    else {
        const { delta, animationType, animationDuration } = args;
        back(delta, animationType, animationDuration);
    }
    return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
let firstBackTime = 0;
function quit() {
    initI18nAppMsgsOnce();
    if (!firstBackTime) {
        firstBackTime = Date.now();
        plus.nativeUI.toast(useI18n().t('uni.app.quit'));
        setTimeout(() => {
            firstBackTime = 0;
        }, 2000);
    }
    else if (Date.now() - firstBackTime < 2000) {
        plus.runtime.quit();
    }
}
function back(delta, animationType, animationDuration) {
    const pages = getCurrentPages();
    const len = pages.length;
    const currentPage = pages[len - 1];
    if (delta > 1) {
        // 中间页隐藏
        pages
            .slice(len - delta, len - 1)
            .reverse()
            .forEach((deltaPage) => {
            closeWebview(plus.webview.getWebviewById(deltaPage.$page.id + ''), 'none', 0);
        });
    }
    const backPage = function (webview) {
        if (animationType) {
            closeWebview(webview, animationType, animationDuration || ANI_DURATION);
        }
        else {
            if (currentPage.$page.openType === 'redirectTo') {
                // 如果是 redirectTo 跳转的，需要指定 back 动画
                closeWebview(webview, ANI_CLOSE, ANI_DURATION);
            }
            else {
                closeWebview(webview, 'auto');
            }
        }
        pages
            .slice(len - delta, len)
            .forEach((page) => removePage(page));
        setStatusBarStyle();
        // 前一个页面触发 onShow
        invokeHook(ON_SHOW);
    };
    const webview = plus.webview.getWebviewById(currentPage.$page.id + '');
    if (!currentPage.__uniapp_webview) {
        return backPage(webview);
    }
    backWebview(webview, () => {
        backPage(webview);
    });
}

class UniPageNode extends UniNode {
    constructor(pageId, options, setup = false) {
        super(NODE_TYPE_PAGE, '#page', null);
        this._id = 1;
        this._created = false;
        this._updating = false;
        this._createActionMap = new Map();
        this.updateActions = [];
        this.dicts = [];
        this.nodeId = 0;
        this.pageId = pageId;
        this.pageNode = this;
        this.options = options;
        this.isUnmounted = false;
        this.createAction = [ACTION_TYPE_PAGE_CREATE, options];
        this.createdAction = [ACTION_TYPE_PAGE_CREATED];
        this.normalizeDict = this._normalizeDict.bind(this);
        this._update = this.update.bind(this);
        setup && this.setup();
    }
    _normalizeDict(value, normalizeValue = true) {
        if (!isPlainObject(value)) {
            return this.addDict(value);
        }
        const dictArray = [];
        Object.keys(value).forEach((n) => {
            const dict = [this.addDict(n)];
            const v = value[n];
            if (normalizeValue) {
                dict.push(this.addDict(v));
            }
            else {
                dict.push(v);
            }
            dictArray.push(dict);
        });
        return dictArray;
    }
    addDict(value) {
        const { dicts } = this;
        const index = dicts.indexOf(value);
        if (index > -1) {
            return index;
        }
        return dicts.push(value) - 1;
    }
    onInjectHook(hook) {
        if ((hook === ON_PAGE_SCROLL || hook === ON_REACH_BOTTOM) &&
            !this.scrollAction) {
            this.scrollAction = [
                ACTION_TYPE_PAGE_SCROLL,
                this.options.onReachBottomDistance,
            ];
            this.push(this.scrollAction);
        }
    }
    onCreate(thisNode, nodeName) {
        pushCreateAction(this, thisNode.nodeId, nodeName);
        return thisNode;
    }
    onInsertBefore(thisNode, newChild, refChild) {
        pushInsertAction(this, newChild, thisNode.nodeId, (refChild && refChild.nodeId) || -1);
        return newChild;
    }
    onRemoveChild(oldChild) {
        pushRemoveAction(this, oldChild.nodeId);
        return oldChild;
    }
    onAddEvent(thisNode, name, flag) {
        if (thisNode.parentNode) {
            pushAddEventAction(this, thisNode.nodeId, name, flag);
        }
    }
    onAddWxsEvent(thisNode, name, wxsEvent, flag) {
        if (thisNode.parentNode) {
            pushAddWxsEventAction(this, thisNode.nodeId, name, wxsEvent, flag);
        }
    }
    onRemoveEvent(thisNode, name) {
        if (thisNode.parentNode) {
            pushRemoveEventAction(this, thisNode.nodeId, name);
        }
    }
    onSetAttribute(thisNode, qualifiedName, value) {
        if (thisNode.parentNode) {
            pushSetAttributeAction(this, thisNode.nodeId, qualifiedName, value);
        }
    }
    onRemoveAttribute(thisNode, qualifiedName) {
        if (thisNode.parentNode) {
            pushRemoveAttributeAction(this, thisNode.nodeId, qualifiedName);
        }
    }
    onTextContent(thisNode, text) {
        if (thisNode.parentNode) {
            pushSetTextAction(this, thisNode.nodeId, text);
        }
    }
    onNodeValue(thisNode, val) {
        if (thisNode.parentNode) {
            pushSetTextAction(this, thisNode.nodeId, val);
        }
    }
    genId() {
        return this._id++;
    }
    push(action, extras) {
        if (this.isUnmounted) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.log(formatLog('PageNode', 'push.prevent', action));
            }
            return;
        }
        switch (action[0]) {
            case ACTION_TYPE_CREATE:
                this._createActionMap.set(action[1], action);
                break;
            case ACTION_TYPE_INSERT:
                const createAction = this._createActionMap.get(action[1]);
                if (createAction) {
                    createAction[3] = action[2]; // parentNodeId
                    createAction[4] = action[3]; // anchorId
                    if (extras) {
                        createAction[5] = extras;
                    }
                }
                else {
                    // 部分手机上，create 和 insert 可能不在同一批次，被分批发送
                    if (extras) {
                        action[4] = extras;
                    }
                    this.updateActions.push(action);
                    // if ((process.env.NODE_ENV !== 'production')) {
                    //   console.error(formatLog(`Insert`, action, 'not found createAction'))
                    // }
                }
                break;
        }
        // insert 被合并进 create
        if (action[0] !== ACTION_TYPE_INSERT) {
            this.updateActions.push(action);
        }
        if (!this._updating) {
            this._updating = true;
            queuePostFlushCb(this._update);
        }
    }
    restore() {
        this.clear();
        // createAction 需要单独发送，因为 view 层需要现根据 create 来设置 page 的 ready
        this.setup();
        if (this.scrollAction) {
            this.push(this.scrollAction);
        }
        const restoreNode = (node) => {
            this.onCreate(node, node.nodeName);
            this.onInsertBefore(node.parentNode, node, null);
            node.childNodes.forEach((childNode) => {
                restoreNode(childNode);
            });
        };
        this.childNodes.forEach((childNode) => restoreNode(childNode));
        this.push(this.createdAction);
    }
    setup() {
        this.send([this.createAction]);
    }
    update() {
        const { dicts, updateActions, _createActionMap } = this;
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(formatLog('PageNode', 'update', updateActions.length, _createActionMap.size));
        }
        // 首次
        if (!this._created) {
            this._created = true;
            updateActions.push(this.createdAction);
        }
        if (updateActions.length) {
            if (dicts.length) {
                updateActions.unshift([ACTION_TYPE_DICT, dicts]);
            }
            this.send(updateActions);
        }
        this.clear();
    }
    clear() {
        this.dicts.length = 0;
        this.updateActions.length = 0;
        this._updating = false;
        this._createActionMap.clear();
    }
    send(action) {
        UniServiceJSBridge.publishHandler(VD_SYNC, action, this.pageId);
    }
    fireEvent(id, evt) {
        const node = findNodeById(id, this);
        if (node) {
            node.dispatchEvent(evt);
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('PageNode', 'fireEvent', id, 'not found', evt));
        }
    }
}
function getPageNode(pageId) {
    const page = getPageById(pageId);
    if (!page)
        return null;
    return page.__page_container__;
}
function findNode(name, value, uniNode) {
    if (typeof uniNode === 'number') {
        uniNode = getPageNode(uniNode);
    }
    if (uniNode[name] === value) {
        return uniNode;
    }
    const { childNodes } = uniNode;
    for (let i = 0; i < childNodes.length; i++) {
        const uniNode = findNode(name, value, childNodes[i]);
        if (uniNode) {
            return uniNode;
        }
    }
    return null;
}
function findNodeById(nodeId, uniNode) {
    return findNode('nodeId', nodeId, uniNode);
}
function findNodeByTagName(tagName, uniNode) {
    return findNode('nodeName', tagName.toUpperCase(), uniNode);
}
function pushCreateAction(pageNode, nodeId, nodeName) {
    pageNode.push([
        ACTION_TYPE_CREATE,
        nodeId,
        pageNode.addDict(nodeName),
        -1,
        -1,
    ]);
}
function pushInsertAction(pageNode, newChild, parentNodeId, refChildId) {
    const nodeJson = newChild.toJSON({
        attr: true,
        normalize: pageNode.normalizeDict,
    });
    pageNode.push([ACTION_TYPE_INSERT, newChild.nodeId, parentNodeId, refChildId], Object.keys(nodeJson).length ? nodeJson : undefined);
}
function pushRemoveAction(pageNode, nodeId) {
    pageNode.push([ACTION_TYPE_REMOVE, nodeId]);
}
function pushAddEventAction(pageNode, nodeId, name, value) {
    pageNode.push([ACTION_TYPE_ADD_EVENT, nodeId, pageNode.addDict(name), value]);
}
function pushAddWxsEventAction(pageNode, nodeId, name, wxsEvent, value) {
    pageNode.push([
        ACTION_TYPE_ADD_WXS_EVENT,
        nodeId,
        pageNode.addDict(name),
        pageNode.addDict(wxsEvent),
        value,
    ]);
}
function pushRemoveEventAction(pageNode, nodeId, name) {
    pageNode.push([ACTION_TYPE_REMOVE_EVENT, nodeId, pageNode.addDict(name)]);
}
function normalizeAttrValue(pageNode, name, value) {
    return name === 'style' && isPlainObject(value)
        ? pageNode.normalizeDict(value)
        : pageNode.addDict(value);
}
function pushSetAttributeAction(pageNode, nodeId, name, value) {
    pageNode.push([
        ACTION_TYPE_SET_ATTRIBUTE,
        nodeId,
        pageNode.addDict(name),
        normalizeAttrValue(pageNode, name, value),
    ]);
}
function pushRemoveAttributeAction(pageNode, nodeId, name) {
    pageNode.push([ACTION_TYPE_REMOVE_ATTRIBUTE, nodeId, pageNode.addDict(name)]);
}
function pushSetTextAction(pageNode, nodeId, text) {
    pageNode.push([ACTION_TYPE_SET_TEXT, nodeId, pageNode.addDict(text)]);
}
function createPageNode(pageId, pageOptions, setup) {
    return new UniPageNode(pageId, pageOptions, setup);
}

function setupPage(component) {
    const oldSetup = component.setup;
    component.inheritAttrs = false; // 禁止继承 __pageId 等属性，避免告警
    component.setup = (_, ctx) => {
        const { attrs: { __pageId, __pagePath, __pageQuery, __pageInstance }, } = ctx;
        if ((process.env.NODE_ENV !== 'production')) {
            console.log(formatLog(__pagePath, 'setup'));
        }
        const instance = getCurrentInstance();
        const pageVm = instance.proxy;
        initPageVm(pageVm, __pageInstance);
        addCurrentPage(initScope(__pageId, pageVm, __pageInstance));
        onMounted(() => {
            nextTick(() => {
                // onShow被延迟，故onReady也同时延迟
                invokeHook(pageVm, ON_READY);
            });
            // TODO preloadSubPackages
        });
        onBeforeUnmount(() => {
            invokeHook(pageVm, ON_UNLOAD);
        });
        if (oldSetup) {
            return oldSetup(__pageQuery, ctx);
        }
    };
    return component;
}
function initScope(pageId, vm, pageInstance) {
    {
        const $getAppWebview = () => {
            return plus.webview.getWebviewById(pageId + '');
        };
        vm.$getAppWebview = $getAppWebview;
        vm.$.ctx.$scope = {
            $getAppWebview,
        };
    }
    vm.getOpenerEventChannel = () => {
        if (!pageInstance.eventChannel) {
            pageInstance.eventChannel = new EventChannel(pageId);
        }
        return pageInstance.eventChannel;
    };
    return vm;
}

function isVuePageAsyncComponent(component) {
    return isFunction(component);
}
const pagesMap = new Map();
function definePage(pagePath, asyncComponent) {
    pagesMap.set(pagePath, once(createFactory(asyncComponent)));
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions) {
    const pageNode = createPageNode(__pageId, pageOptions, true);
    const app = getVueApp();
    const component = pagesMap.get(__pagePath)();
    const mountPage = (component) => app.mountPage(component, {
        __pageId,
        __pagePath,
        __pageQuery,
        __pageInstance,
    }, pageNode);
    if (isPromise(component)) {
        return component.then((component) => mountPage(component));
    }
    return mountPage(component);
}
function createFactory(component) {
    return () => {
        if (isVuePageAsyncComponent(component)) {
            return component().then((component) => setupPage(component));
        }
        return setupPage(component);
    };
}

let isInitEntryPage = false;
function initEntry() {
    if (isInitEntryPage) {
        return;
    }
    isInitEntryPage = true;
    let entryPagePath;
    let entryPageQuery;
    const weexPlus = weex.requireModule('plus');
    if (weexPlus.getRedirectInfo) {
        const { path, query, referrerInfo } = parseRedirectInfo();
        if (path) {
            entryPagePath = path;
            entryPageQuery = query;
        }
        __uniConfig.referrerInfo = referrerInfo;
    }
    else {
        const argsJsonStr = plus.runtime.arguments;
        if (!argsJsonStr) {
            return;
        }
        try {
            const args = JSON.parse(argsJsonStr);
            entryPagePath = args.path || args.pathName;
            entryPageQuery = args.query ? '?' + args.query : '';
        }
        catch (e) { }
    }
    if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
        if (entryPageQuery) {
            __uniConfig.entryPageQuery = entryPageQuery;
        }
        return;
    }
    const entryRoute = addLeadingSlash(entryPagePath);
    const routeOptions = getRouteOptions(entryRoute);
    if (!routeOptions) {
        return;
    }
    if (!routeOptions.meta.isTabBar) {
        __uniConfig.realEntryPagePath =
            __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
    }
    __uniConfig.entryPagePath = entryPagePath;
    __uniConfig.entryPageQuery = entryPageQuery;
}

function initRouteOptions(path, openType) {
    // 需要序列化一遍
    const routeOptions = JSON.parse(JSON.stringify(getRouteOptions(path)));
    routeOptions.meta = initRouteMeta(routeOptions.meta);
    if (openType !== 'preloadPage' &&
        !__uniConfig.realEntryPagePath &&
        (openType === 'reLaunch' || getCurrentPages().length === 0) // redirectTo
    ) {
        routeOptions.meta.isQuit = true;
    }
    else if (!routeOptions.meta.isTabBar) {
        routeOptions.meta.isQuit = false;
    }
    // TODO
    //   if (routeOptions.meta.isTabBar) {
    //     routeOptions.meta.visible = true
    //   }
    return routeOptions;
}

const preloadWebviews = {};
function removePreloadWebview(webview) {
    const url = Object.keys(preloadWebviews).find((url) => preloadWebviews[url].id === webview.id);
    if (url) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[uni-app] removePreloadWebview(${webview.id})`);
        }
        delete preloadWebviews[url];
    }
}
function closePreloadWebview({ url }) {
    const webview = preloadWebviews[url];
    if (webview) {
        if (webview.__page__) {
            if (!getCurrentPages().find((page) => page === webview.__page__)) {
                // 未使用
                webview.close('none');
            }
            else {
                // 被使用
                webview.__preload__ = false;
            }
        }
        else {
            // 未使用
            webview.close('none');
        }
        delete preloadWebviews[url];
    }
    return webview;
}
function preloadWebview({ url, path, query, }) {
    if (!preloadWebviews[url]) {
        const routeOptions = initRouteOptions(path, 'preloadPage');
        preloadWebviews[url] = createWebview({
            path,
            routeOptions,
            query,
            webviewExtras: {
                __preload__: true,
            },
        });
    }
    return preloadWebviews[url];
}

function registerPage({ url, path, query, openType, webview, nvuePageVm, eventChannel, }) {
    // fast 模式，nvue 首页时，会在nvue中主动调用registerPage并传入首页webview，此时初始化一下首页（因为此时可能还未调用registerApp）
    if (webview) {
        initEntry();
    }
    if (preloadWebviews[url]) {
        webview = preloadWebviews[url];
        const _webview = webview;
        if (_webview.__page__) {
            // 该预载页面已处于显示状态,不再使用该预加载页面,直接新开
            if (getCurrentPages().find((page) => page === _webview.__page__)) {
                if ((process.env.NODE_ENV !== 'production')) {
                    console.log(formatLog('uni-app', `preloadWebview(${path},${_webview.id}) already in use`));
                }
                webview = undefined;
            }
            else {
                if (eventChannel) {
                    _webview.__page__.$page.eventChannel = eventChannel;
                }
                if (openType === 'launch') {
                    // 热更 preloadPage
                    updatePreloadPageVm(url, path, query, _webview, nvuePageVm, eventChannel);
                }
                else {
                    addCurrentPage(_webview.__page__);
                }
                if ((process.env.NODE_ENV !== 'production')) {
                    console.log(formatLog('uni-app', `reuse preloadWebview(${path},${_webview.id})`));
                }
                return _webview;
            }
        }
    }
    const routeOptions = initRouteOptions(path, openType);
    if (!webview) {
        webview = createWebview({ path, routeOptions, query });
    }
    else {
        webview = plus.webview.getWebviewById(webview.id);
        webview.nvue = routeOptions.meta.isNVue;
    }
    routeOptions.meta.id = parseInt(webview.id);
    const isTabBar = !!routeOptions.meta.isTabBar;
    if (isTabBar) {
        tabBarInstance.append(webview);
    }
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('registerPage', path, webview.id));
    }
    initWebview(webview, path, query, routeOptions.meta);
    const route = path.slice(1);
    webview.__uniapp_route = route;
    const pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, (__uniConfig.darkmode
        ? plus.navigator.getUIStyle()
        : 'light'));
    const id = parseInt(webview.id);
    if (webview.nvue) {
        if (nvuePageVm) {
            // 首页或者开发时热刷
            initNVuePage(id, nvuePageVm, pageInstance);
        }
        else {
            // 正常路由跳转
            createNVuePage(id, webview, pageInstance);
        }
    }
    else {
        createVuePage(id, route, query, pageInstance, initPageOptions(routeOptions));
    }
    return webview;
}
function updatePreloadPageVm(url, path, query, webview, nvuePageVm, eventChannel) {
    const routeOptions = initRouteOptions(path, 'preloadPage');
    routeOptions.meta.id = parseInt(webview.id);
    const pageInstance = initPageInternalInstance('preloadPage', url, query, routeOptions.meta, eventChannel, (__uniConfig.darkmode
        ? plus.navigator.getUIStyle()
        : 'light'));
    initPageVm(nvuePageVm, pageInstance);
    webview.__page__ = nvuePageVm;
}
function initPageOptions({ meta }) {
    const statusbarHeight = getStatusbarHeight();
    const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
    return {
        css: true,
        route: meta.route,
        version: 1,
        locale: '',
        platform,
        pixelRatio,
        windowWidth,
        disableScroll: meta.disableScroll === true,
        onPageScroll: false,
        onPageReachBottom: false,
        onReachBottomDistance: hasOwn$1(meta, 'onReachBottomDistance')
            ? meta.onReachBottomDistance
            : ON_REACH_BOTTOM_DISTANCE,
        statusbarHeight,
        windowTop: meta.navigationBar.type === 'float' ? statusbarHeight + NAVBAR_HEIGHT : 0,
        windowBottom: tabBarInstance.indexOf(meta.route) >= 0 && tabBarInstance.cover ? tabBarInstance.height : 0,
    };
}
function initNVuePage(id, nvuePageVm, pageInstance) {
    initPageVm(nvuePageVm, pageInstance);
    addCurrentPage(initScope(id, nvuePageVm, pageInstance));
    if (id === 1) {
        // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
        if (__uniConfig.splashscreen &&
            __uniConfig.splashscreen.autoclose &&
            !__uniConfig.splashscreen.alwaysShowBeforeRender) {
            plus.navigator.closeSplashscreen();
        }
        __uniConfig.onReady(function () {
            navigateFinish();
        });
    }
}
function createNVuePage(pageId, webview, pageInstance) {
    const fakeNVueVm = {
        $: {},
        $getAppWebview() {
            return webview;
        },
        getOpenerEventChannel() {
            if (!pageInstance.eventChannel) {
                pageInstance.eventChannel = new EventChannel(pageId);
            }
            return pageInstance.eventChannel;
        },
        __setup(vm, curFakeNVueVm) {
            vm.$getAppWebview = () => webview;
            vm.getOpenerEventChannel = curFakeNVueVm.getOpenerEventChannel;
            // 替换真实的 nvue 的 vm
            initPageVm(vm, pageInstance);
            if (webview.__preload__) {
                webview.__page__ = vm;
            }
            const pages = getAllPages();
            const index = pages.findIndex((p) => p === curFakeNVueVm);
            if (index > -1) {
                pages.splice(index, 1, vm);
            }
        },
    };
    initPageVm(fakeNVueVm, pageInstance);
    if (webview.__preload__) {
        webview.__page__ = fakeNVueVm;
        webview.addEventListener('show', () => {
            invokeHook(webview.__page__, ON_SHOW);
        });
        webview.addEventListener('hide', () => {
            invokeHook(webview.__page__, ON_HIDE);
        });
    }
    else {
        addCurrentPage(fakeNVueVm);
    }
}

const $navigateTo = (args, { resolve, reject }) => {
    const { url, events, animationType, animationDuration } = args;
    const { path, query } = parseUrl(url);
    const [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
    navigate(path, () => {
        _navigateTo({
            url,
            path,
            query,
            events,
            aniType,
            aniDuration,
        })
            .then(resolve)
            .catch(reject);
    }, args.openType === 'appLaunch');
};
const navigateTo = defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo({ url, path, query, events, aniType, aniDuration, }) {
    // 当前页面触发 onHide
    invokeHook(ON_HIDE);
    const eventChannel = new EventChannel(getWebviewId() + 1, events);
    return new Promise((resolve) => {
        showWebview(registerPage({ url, path, query, openType: 'navigateTo', eventChannel }), aniType, aniDuration, () => {
            resolve({ eventChannel });
        });
        setStatusBarStyle();
    });
}
function initAnimation(path, animationType, animationDuration) {
    const { globalStyle } = __uniConfig;
    const meta = getRouteMeta(path);
    return [
        animationType ||
            meta.animationType ||
            globalStyle.animationType ||
            ANI_SHOW,
        animationDuration ||
            meta.animationDuration ||
            globalStyle.animationDuration ||
            ANI_DURATION,
    ];
}

const redirectTo = defineAsyncApi(API_REDIRECT_TO, ({ url }, { resolve, reject }) => {
    const { path, query } = parseUrl(url);
    navigate(path, () => {
        _redirectTo({
            url,
            path,
            query,
        })
            .then(resolve)
            .catch(reject);
    });
}, RedirectToProtocol, RedirectToOptions);
function _redirectTo({ url, path, query, }) {
    // TODO exists
    //   if (exists === 'back') {
    //     const existsPageIndex = findExistsPageIndex(url)
    //     if (existsPageIndex !== -1) {
    //       const delta = len - existsPageIndex
    //       if (delta > 0) {
    //         navigateBack({
    //           delta,
    //         })
    //         invoke(callbackId, {
    //           errMsg: 'redirectTo:ok',
    //         })
    //         return
    //       }
    //     }
    //   }
    const lastPage = getCurrentPage();
    lastPage && removePage(lastPage);
    return new Promise((resolve) => {
        showWebview(registerPage({
            url,
            path,
            query,
            openType: 'redirectTo',
        }), 'none', 0, () => {
            if (lastPage) {
                const webview = lastPage
                    .$getAppWebview();
                if (webview.__preload__) {
                    removePreloadWebview(webview);
                }
                webview.close('none');
            }
            resolve(undefined);
        });
        setStatusBarStyle();
    });
}

const $reLaunch = ({ url }, { resolve, reject }) => {
    const { path, query } = parseUrl(url);
    navigate(path, () => {
        _reLaunch({
            url,
            path,
            query,
        })
            .then(resolve)
            .catch(reject);
    });
};
function _reLaunch({ url, path, query }) {
    return new Promise((resolve) => {
        // 获取目前所有页面
        const pages = getAllPages().slice(0);
        const routeOptions = __uniRoutes.find((route) => route.path === path);
        if (routeOptions.meta.isTabBar) {
            tabBarInstance.switchTab(path.slice(1));
        }
        showWebview(registerPage({
            url,
            path,
            query,
            openType: 'reLaunch',
        }), 'none', 0, () => {
            pages.forEach((page) => closePage(page, 'none'));
            resolve(undefined);
        });
        setStatusBarStyle();
    });
}

const reLaunch = defineAsyncApi(API_RE_LAUNCH, $reLaunch, ReLaunchProtocol, ReLaunchOptions);

const $switchTab = (args, { resolve, reject }) => {
    const { url } = args;
    const { path, query } = parseUrl(url);
    navigate(path, () => {
        _switchTab({
            url,
            path,
            query,
        })
            .then(resolve)
            .catch(reject);
    }, args.openType === 'appLaunch');
};
const switchTab = defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
function _switchTab({ url, path, query, }) {
    tabBarInstance.switchTab(path.slice(1));
    const pages = getCurrentPages();
    const len = pages.length;
    let callOnHide = false;
    let callOnShow = false;
    let currentPage;
    if (len >= 1) {
        // 前一个页面是非 tabBar 页面
        currentPage = pages[len - 1];
        if (currentPage && !currentPage.$.__isTabBar) {
            // 前一个页面为非 tabBar 页面时，目标tabBar需要强制触发onShow
            // 该情况下目标页tabBarPage的visible是不对的
            // 除非每次路由跳转都处理一遍tabBarPage的visible，目前仅switchTab会处理
            // 简单起见，暂时直接判断该情况，执行onShow
            callOnShow = true;
            pages.reverse().forEach((page) => {
                if (!page.$.__isTabBar && page !== currentPage) {
                    closePage(page, 'none');
                }
            });
            removePage(currentPage);
            // 延迟执行避免iOS应用退出
            setTimeout(() => {
                if (currentPage.$page.openType === 'redirectTo') {
                    closeWebview(currentPage.$getAppWebview(), ANI_CLOSE, ANI_DURATION);
                }
                else {
                    closeWebview(currentPage.$getAppWebview(), 'auto');
                }
            }, 100);
        }
        else {
            callOnHide = true;
        }
    }
    let tabBarPage;
    // 查找当前 tabBarPage，且设置 visible
    getAllPages().forEach((page) => {
        if (addLeadingSlash(page.route) === path) {
            if (!page.$.__isActive) {
                // 之前未显示
                callOnShow = true;
            }
            page.$.__isActive = true;
            tabBarPage = page;
        }
        else {
            if (page.$.__isTabBar) {
                page.$.__isActive = false;
            }
        }
    });
    // 相同tabBar页面
    if (currentPage === tabBarPage) {
        callOnHide = false;
    }
    if (currentPage && callOnHide) {
        invokeHook(currentPage, ON_HIDE);
    }
    return new Promise((resolve) => {
        if (tabBarPage) {
            const webview = tabBarPage.$getAppWebview();
            webview.show('none');
            // 等visible状态都切换完之后，再触发onShow，否则开发者在onShow里边 getCurrentPages 会不准确
            if (callOnShow && !webview.__preload__) {
                invokeHook(tabBarPage, ON_SHOW);
            }
            setStatusBarStyle();
            resolve(undefined);
        }
        else {
            showWebview(registerPage({
                url,
                path,
                query,
                openType: 'switchTab',
            }), 'none', 0, () => {
                setStatusBarStyle();
                resolve(undefined);
            }, 70);
        }
    });
}

const unPreloadPage = defineSyncApi(API_UN_PRELOAD_PAGE, ({ url }) => {
    const webview = closePreloadWebview({
        url,
    });
    if (webview) {
        return {
            id: webview.id,
            url,
            errMsg: 'unPreloadPage:ok',
        };
    }
    return {
        url,
        errMsg: 'unPreloadPage:fail not found',
    };
}, UnPreloadPageProtocol);
const preloadPage = defineAsyncApi(API_PRELOAD_PAGE, ({ url }, { resolve }) => {
    // 防止热更等情况重复 preloadPage
    if (preloadWebviews[url]) {
        return;
    }
    const urls = url.split('?');
    const path = urls[0];
    const query = parseQuery(urls[1] || '');
    const webview = preloadWebview({
        url,
        path,
        query,
    });
    const routeOptions = initRouteOptions(path, 'preloadPage');
    routeOptions.meta.id = parseInt(webview.id);
    const pageInstance = initPageInternalInstance('preloadPage', url, query, routeOptions.meta, undefined, (__uniConfig.darkmode
        ? plus.navigator.getUIStyle()
        : 'light'));
    createNVuePage(parseInt(webview.id), webview, pageInstance);
    resolve({
        id: webview.id,
        url,
        errMsg: 'preloadPage:ok',
    });
}, PreloadPageProtocol);

var uni$1 = {
  __proto__: null,
  $emit: $emit,
  $off: $off,
  $on: $on,
  $once: $once,
  __log__: __log__,
  addInterceptor: addInterceptor,
  addPhoneContact: addPhoneContact,
  arrayBufferToBase64: arrayBufferToBase64,
  base64ToArrayBuffer: base64ToArrayBuffer,
  canIUse: canIUse,
  canvasGetImageData: canvasGetImageData,
  canvasPutImageData: canvasPutImageData,
  canvasToTempFilePath: canvasToTempFilePath,
  checkIsSoterEnrolledInDevice: checkIsSoterEnrolledInDevice,
  checkIsSupportSoterAuthentication: checkIsSupportSoterAuthentication,
  chooseImage: chooseImage,
  chooseLocation: chooseLocation,
  chooseVideo: chooseVideo,
  clearStorage: clearStorage,
  clearStorageSync: clearStorageSync,
  closeAuthView: closeAuthView,
  closeBLEConnection: closeBLEConnection,
  closeBluetoothAdapter: closeBluetoothAdapter,
  closePreviewImage: closePreviewImage,
  closeSocket: closeSocket,
  compressImage: compressImage,
  compressVideo: compressVideo,
  configMTLS: configMTLS,
  connectSocket: connectSocket,
  createAnimation: createAnimation,
  createBLEConnection: createBLEConnection,
  createCanvasContext: createCanvasContext,
  createFullScreenVideoAd: createFullScreenVideoAd,
  createInnerAudioContext: createInnerAudioContext,
  createInteractiveAd: createInteractiveAd,
  createIntersectionObserver: createIntersectionObserver,
  createInterstitialAd: createInterstitialAd,
  createLivePusherContext: createLivePusherContext,
  createMapContext: createMapContext,
  createMediaQueryObserver: createMediaQueryObserver,
  createPushMessage: createPushMessage,
  createRewardedVideoAd: createRewardedVideoAd,
  createSelectorQuery: createSelectorQuery,
  createVideoContext: createVideoContext,
  downloadFile: downloadFile,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  getAppBaseInfo: getAppBaseInfo,
  getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
  getBLEDeviceRSSI: getBLEDeviceRSSI,
  getBLEDeviceServices: getBLEDeviceServices,
  getBackgroundAudioManager: getBackgroundAudioManager,
  getBeacons: getBeacons,
  getBluetoothAdapterState: getBluetoothAdapterState,
  getBluetoothDevices: getBluetoothDevices,
  getCheckBoxState: getCheckBoxState,
  getClipboardData: getClipboardData,
  getConnectedBluetoothDevices: getConnectedBluetoothDevices,
  getDeviceInfo: getDeviceInfo,
  getEnterOptionsSync: getEnterOptionsSync,
  getFileInfo: getFileInfo$1,
  getImageInfo: getImageInfo,
  getLaunchOptionsSync: getLaunchOptionsSync,
  getLocale: getLocale,
  getLocation: getLocation,
  getNetworkType: getNetworkType,
  getProvider: getProvider,
  getPushClientId: getPushClientId,
  getRecorderManager: getRecorderManager,
  getSavedFileInfo: getSavedFileInfo,
  getSavedFileList: getSavedFileList,
  getScreenBrightness: getScreenBrightness,
  getSelectedTextRange: getSelectedTextRange,
  getStorage: getStorage,
  getStorageInfo: getStorageInfo,
  getStorageInfoSync: getStorageInfoSync,
  getStorageSync: getStorageSync,
  getSubNVueById: getSubNVueById,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfoSync,
  getSystemSetting: getSystemSetting,
  getUniverifyManager: getUniverifyManager,
  getUserInfo: getUserInfo,
  getUserProfile: getUserProfile,
  getVideoInfo: getVideoInfo,
  getWindowInfo: getWindowInfo,
  hideKeyboard: hideKeyboard,
  hideLoading: hideLoading,
  hideNavigationBarLoading: hideNavigationBarLoading,
  hideTabBar: hideTabBar,
  hideTabBarRedDot: hideTabBarRedDot,
  hideToast: hideToast,
  initUTSClassName: initUTSClassName,
  initUTSIndexClassName: initUTSIndexClassName,
  initUTSPackageName: initUTSPackageName,
  initUTSProxyClass: initUTSProxyClass,
  initUTSProxyFunction: initUTSProxyFunction,
  interceptors: interceptors,
  invokePushCallback: invokePushCallback,
  loadFontFace: loadFontFace,
  login: login,
  makePhoneCall: makePhoneCall,
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  navigateToMiniProgram: navigateToMiniProgram,
  notifyBLECharacteristicValueChange: notifyBLECharacteristicValueChange,
  offAccelerometerChange: offAccelerometerChange,
  offAppHide: offAppHide,
  offAppShow: offAppShow,
  offCompassChange: offCompassChange,
  offError: offError,
  offKeyboardHeightChange: offKeyboardHeightChange,
  offLocationChange: offLocationChange,
  offLocationChangeError: offLocationChangeError,
  offNetworkStatusChange: offNetworkStatusChange,
  offPageNotFound: offPageNotFound,
  offPushMessage: offPushMessage,
  offThemeChange: offThemeChange,
  offUnhandledRejection: offUnhandledRejection,
  offWindowResize: offWindowResize,
  onAccelerometerChange: onAccelerometerChange,
  onAppHide: onAppHide,
  onAppShow: onAppShow,
  onBLECharacteristicValueChange: onBLECharacteristicValueChange,
  onBLEConnectionStateChange: onBLEConnectionStateChange,
  onBeaconServiceChange: onBeaconServiceChange,
  onBeaconUpdate: onBeaconUpdate,
  onBluetoothAdapterStateChange: onBluetoothAdapterStateChange,
  onBluetoothDeviceFound: onBluetoothDeviceFound,
  onCompassChange: onCompassChange,
  onCreateVueApp: onCreateVueApp,
  onError: onError,
  onHostEventReceive: onHostEventReceive,
  onKeyboardHeightChange: onKeyboardHeightChange,
  onLocaleChange: onLocaleChange,
  onLocationChange: onLocationChange,
  onLocationChangeError: onLocationChangeError,
  onNativeEventReceive: onNativeEventReceive,
  onNetworkStatusChange: onNetworkStatusChange,
  onPageNotFound: onPageNotFound,
  onPushMessage: onPushMessage,
  onSocketClose: onSocketClose,
  onSocketError: onSocketError,
  onSocketMessage: onSocketMessage,
  onSocketOpen: onSocketOpen,
  onTabBarMidButtonTap: onTabBarMidButtonTap,
  onThemeChange: onThemeChange,
  onUnhandledRejection: onUnhandledRejection,
  onWindowResize: onWindowResize,
  openAppAuthorizeSetting: openAppAuthorizeSetting,
  openBluetoothAdapter: openBluetoothAdapter,
  openDocument: openDocument,
  openLocation: openLocation,
  pageScrollTo: pageScrollTo,
  preLogin: preLogin,
  preloadPage: preloadPage,
  previewImage: previewImage,
  reLaunch: reLaunch,
  readBLECharacteristicValue: readBLECharacteristicValue,
  redirectTo: redirectTo,
  registerRuntime: registerRuntime,
  registerUTSInterface: registerUTSInterface,
  registerUTSPlugin: registerUTSPlugin,
  removeInterceptor: removeInterceptor,
  removeSavedFile: removeSavedFile,
  removeStorage: removeStorage,
  removeStorageSync: removeStorageSync,
  removeTabBarBadge: removeTabBarBadge,
  request: request,
  requestPayment: requestPayment,
  requireGlobal: requireGlobal,
  requireNativePlugin: requireNativePlugin,
  requireUTSPlugin: requireUTSPlugin,
  restoreGlobal: restoreGlobal,
  saveFile: saveFile,
  saveImageToPhotosAlbum: saveImageToPhotosAlbum,
  saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
  scanCode: scanCode,
  sendHostEvent: sendHostEvent,
  sendNativeEvent: sendNativeEvent,
  sendSocketMessage: sendSocketMessage,
  setBLEMTU: setBLEMTU,
  setClipboardData: setClipboardData,
  setKeepScreenOn: setKeepScreenOn,
  setLocale: setLocale,
  setNavigationBarColor: setNavigationBarColor,
  setNavigationBarTitle: setNavigationBarTitle,
  setPageMeta: setPageMeta,
  setScreenBrightness: setScreenBrightness,
  setStorage: setStorage,
  setStorageSync: setStorageSync,
  setTabBarBadge: setTabBarBadge,
  setTabBarItem: setTabBarItem,
  setTabBarStyle: setTabBarStyle,
  share: share,
  shareWithSystem: shareWithSystem,
  showActionSheet: showActionSheet,
  showKeyboard: showKeyboard,
  showLoading: showLoading,
  showModal: showModal,
  showNavigationBarLoading: showNavigationBarLoading,
  showTabBar: showTabBar,
  showTabBarRedDot: showTabBarRedDot,
  showToast: showToast,
  startAccelerometer: startAccelerometer,
  startBeaconDiscovery: startBeaconDiscovery,
  startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
  startCompass: startCompass,
  startLocationUpdate: startLocationUpdate,
  startPullDownRefresh: startPullDownRefresh,
  startSoterAuthentication: startSoterAuthentication,
  stopAccelerometer: stopAccelerometer,
  stopBeaconDiscovery: stopBeaconDiscovery,
  stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
  stopCompass: stopCompass,
  stopLocationUpdate: stopLocationUpdate,
  stopPullDownRefresh: stopPullDownRefresh,
  switchTab: switchTab,
  syncDataToGlobal: syncDataToGlobal,
  unPreloadPage: unPreloadPage,
  uploadFile: uploadFile,
  upx2px: upx2px,
  vibrateLong: vibrateLong,
  vibrateShort: vibrateShort,
  weexGetSystemInfoSync: weexGetSystemInfoSync,
  writeBLECharacteristicValue: writeBLECharacteristicValue
};

const UniServiceJSBridge$1 = /*#__PURE__*/ extend(ServiceJSBridge, {
    publishHandler,
});
function publishHandler(event, args, pageIds) {
    args = JSON.stringify(args);
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('publishHandler', event, args, pageIds));
    }
    if (!isArray(pageIds)) {
        pageIds = [pageIds];
    }
    const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`;
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('publishHandler', 'size', evalJSCode.length));
    }
    pageIds.forEach((id) => {
        const idStr = String(id);
        const webview = plus.webview.getWebviewById(idStr);
        webview && webview.evalJS(evalJSCode.replace('__PAGE_ID__', idStr));
    });
}

function initTabBar() {
    const { tabBar } = __uniConfig;
    const len = tabBar && tabBar.list && tabBar.list.length;
    if (!len) {
        return;
    }
    const { entryPagePath } = __uniConfig;
    tabBar.selectedIndex = 0;
    const selected = tabBar.list.findIndex((page) => page.pagePath === entryPagePath);
    tabBarInstance.init(tabBar, (item, index) => {
        uni.switchTab({
            url: addLeadingSlash(item.pagePath),
            openType: 'switchTab',
            from: 'tabBar',
            success() {
                invokeHook(ON_TAB_ITEM_TAP, {
                    index,
                    text: item.text,
                    pagePath: item.pagePath,
                });
            },
        });
    });
    if (selected !== -1) {
        // 取当前 tab 索引值
        tabBar.selectedIndex = selected;
        selected !== 0 && tabBarInstance.switchTab(entryPagePath);
    }
}

function initGlobalEvent() {
    const plusGlobalEvent = plus.globalEvent;
    const weexGlobalEvent = weex.requireModule('globalEvent');
    const { emit, publishHandler } = UniServiceJSBridge;
    if (weex.config.preload) {
        plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener);
    }
    else {
        plusGlobalEvent.addEventListener('splashclosed', () => {
            plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener);
        });
    }
    plusGlobalEvent.addEventListener('pause', () => {
        emit(ON_APP_ENTER_BACKGROUND);
    });
    plusGlobalEvent.addEventListener('resume', () => {
        const info = parseRedirectInfo();
        if (info && info.userAction) {
            initEnterOptions(info);
        }
        emit(ON_APP_ENTER_FOREGROUND, getEnterOptions());
    });
    weexGlobalEvent.addEventListener('uistylechange', function (event) {
        const args = {
            theme: event.uistyle,
        };
        emit(ON_THEME_CHANGE, args);
        publishHandler(ON_THEME_CHANGE, args, getCurrentPageId());
        changePagesNavigatorStyle();
    });
    let keyboardHeightChange = 0;
    plusGlobalEvent.addEventListener('KeyboardHeightChange', function (event) {
        // 安卓设备首次获取高度为 0
        if (keyboardHeightChange !== event.height) {
            keyboardHeightChange = event.height;
            emit(ON_KEYBOARD_HEIGHT_CHANGE, {
                height: keyboardHeightChange,
            });
        }
    });
    weexGlobalEvent.addEventListener(SDK_UNI_MP_NATIVE_EVENT, function (res) {
        if (res && res.event) {
            invokeHostEvent(res.event, res.data);
        }
    });
    plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage);
    // nvue webview post message
    plusGlobalEvent.addEventListener('WebviewPostMessage', subscribePlusMessage);
}
function subscribePlusMessage({ data, }) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('plusMessage', data));
    }
    if (data && data.type) {
        UniServiceJSBridge.subscribeHandler('plusMessage.' + data.type, data.args);
    }
}
function onPlusMessage(type, callback, once = false) {
    UniServiceJSBridge.subscribe('plusMessage.' + type, callback, once);
}
// function initEnterReLaunch(info: RedirectInfo) {
//   __uniConfig.realEntryPagePath =
//     __uniConfig.realEntryPagePath || __uniConfig.entryPagePath
//   __uniConfig.entryPagePath = info.path
//   __uniConfig.entryPageQuery = info.query
//   $reLaunch(
//     { url: addLeadingSlash(info.path) + info.query },
//     { resolve() {}, reject() {} }
//   )
// }

function initAppLaunch(appVm) {
    injectAppHooks(appVm.$);
    const { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig;
    const args = initLaunchOptions({
        path: entryPagePath,
        query: entryPageQuery,
        referrerInfo: referrerInfo,
    });
    invokeHook(appVm, ON_LAUNCH, args);
    invokeHook(appVm, ON_SHOW, args);
    // https://tower.im/teams/226535/todos/16905/
    const getAppState = weex.requireModule('plus').getAppState;
    const appState = getAppState && Number(getAppState());
    if (appState === 2) {
        invokeHook(appVm, ON_HIDE, args);
    }
}

// 统一处理路径
function getPath(path) {
    path = path.replace(/\/$/, '');
    return path.indexOf('_') === 0
        ? plus.io.convertLocalFileSystemURL(path)
        : path;
}
function clearTempFile() {
    const basePath = getPath(TEMP_PATH_BASE);
    const tempPath = getPath(TEMP_PATH);
    // 获取父目录
    const dirParts = tempPath.split('/');
    dirParts.pop();
    const dirPath = dirParts.join('/');
    plus.io.resolveLocalFileSystemURL(plus.io.convertAbsoluteFileSystem(dirPath), (entry) => {
        const reader = entry.createReader();
        reader.readEntries(function (entry) {
            // plus.d.ts 类型不对
            const entries = entry;
            if (entries && entries.length) {
                entries.forEach(function (entry) {
                    if (entry.isDirectory &&
                        entry.fullPath.indexOf(basePath) === 0 &&
                        entry.fullPath.indexOf(tempPath) !== 0) {
                        entry.removeRecursively();
                    }
                });
            }
        });
    });
}

let focusTimeout = 0;
let keyboardHeight = 0;
let onKeyboardShow = null;
let focusTimer = null;
function hookKeyboardEvent(event, callback) {
    onKeyboardShow = null;
    if (focusTimer) {
        clearTimeout(focusTimer);
        focusTimer = null;
    }
    if (event.type === 'onFocus') {
        if (keyboardHeight > 0) {
            event.detail.height = keyboardHeight;
        }
        else {
            focusTimer = setTimeout(function () {
                event.detail.height = keyboardHeight;
                callback(event);
            }, focusTimeout);
            onKeyboardShow = function () {
                if (focusTimer) {
                    clearTimeout(focusTimer);
                    focusTimer = null;
                }
                event.detail.height = keyboardHeight;
                callback(event);
            };
            return;
        }
    }
    callback(event);
}
function initKeyboardEvent() {
    const isAndroid = plus.os.name.toLowerCase() === 'android';
    focusTimeout = isAndroid ? 300 : 700;
    UniServiceJSBridge.on(ON_KEYBOARD_HEIGHT_CHANGE, (res) => {
        keyboardHeight = res.height;
        if (keyboardHeight > 0) {
            const callback = onKeyboardShow;
            onKeyboardShow = null;
            if (callback) {
                callback();
            }
        }
    });
}

function onNodeEvent(nodeId, evt, pageNode) {
    const type = evt.type;
    if (type === 'onFocus' || type === 'onBlur') {
        hookKeyboardEvent(evt, (evt) => {
            pageNode.fireEvent(nodeId, evt);
        });
    }
    else {
        pageNode.fireEvent(nodeId, evt);
    }
}

function onVdSync(actions, pageId) {
    // 从所有pages中获取
    const page = getPageById(parseInt(pageId));
    if (!page) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('onVdSync', 'page', pageId, 'not found'));
        }
        return;
    }
    const pageNode = page.__page_container__;
    actions.forEach((action) => {
        switch (action[0]) {
            case ACTION_TYPE_EVENT:
                onNodeEvent(action[1], action[2], pageNode);
                break;
        }
    });
}

const _adDataCache = {};
function getAdData(data, onsuccess, onerror) {
    const { adpid, width } = data;
    const key = adpid + '-' + width;
    const adDataList = _adDataCache[key];
    if (adDataList && adDataList.length > 0) {
        onsuccess(adDataList.splice(0, 1)[0]);
        return;
    }
    plus.ad.getAds(data, (res) => {
        const list = res.ads;
        onsuccess(list.splice(0, 1)[0]);
        _adDataCache[key] = adDataList ? adDataList.concat(list) : list;
    }, (err) => {
        onerror({
            errCode: err.code,
            errMsg: err.message,
        });
    });
}
function subscribeAd() {
    registerServiceMethod('getAdData', (args, resolve) => {
        getAdData(args, (res) => {
            resolve({
                code: 0,
                data: res,
            });
        }, (err) => {
            resolve({
                code: 1,
                message: err,
            });
        });
    });
}

const API_ROUTE = [
    'switchTab',
    'reLaunch',
    'redirectTo',
    'navigateTo',
    'navigateBack',
];
function subscribeNavigator() {
    API_ROUTE.forEach((name) => {
        registerServiceMethod(name, (args) => {
            uni[name](extend(args, {
                fail(res) {
                    console.error(res.errMsg);
                },
            }));
        });
    });
}

let isLaunchWebviewReady = false; // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady(主要是 Android)
function subscribeWebviewReady(_data, pageId) {
    const isLaunchWebview = pageId === '1';
    if (isLaunchWebview && isLaunchWebviewReady) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.log('[uni-app] onLaunchWebviewReady.prevent');
        }
        return;
    }
    if (isLaunchWebview) {
        // 首页
        isLaunchWebviewReady = true;
        setPreloadWebview(plus.webview.getLaunchWebview());
    }
    else if (!preloadWebview$1) {
        // preloadWebview 不存在，重新加载一下
        setPreloadWebview(plus.webview.getWebviewById(pageId));
    }
    // 仅当 preloadWebview 未 loaded 时处理 （iOS崩溃也会继续走到这里，此时 preloadWebview 通常是 loaded 的，且两者 id 肯定不一样）
    if (!preloadWebview$1.loaded) {
        if (preloadWebview$1.id !== pageId) {
            return console.error(`webviewReady[${preloadWebview$1.id}][${pageId}] not match`);
        }
        preloadWebview$1.loaded = true; // 标记已 ready
    }
    UniServiceJSBridge.emit(ON_WEBVIEW_READY + '.' + pageId);
    isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
    const { autoclose, alwaysShowBeforeRender } = __uniConfig.splashscreen;
    if (autoclose && !alwaysShowBeforeRender) {
        plus.navigator.closeSplashscreen();
    }
    const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
    const routeOptions = getRouteOptions(entryPagePath);
    if (!routeOptions.meta.isNVue) {
        // 非 nvue 首页，需要主动跳转
        const args = {
            url: entryPagePath + (__uniConfig.entryPageQuery || ''),
            openType: 'appLaunch',
        };
        const handler = { resolve() { }, reject() { } };
        if (routeOptions.meta.isTabBar) {
            return $switchTab(args, handler);
        }
        return $navigateTo(args, handler);
    }
}

function onWebviewInserted(_, pageId) {
    const page = getPageById(parseInt(pageId));
    page && (page.__uniapp_webview = true);
}
function onWebviewRemoved(_, pageId) {
    const page = getPageById(parseInt(pageId));
    page && delete page.__uniapp_webview;
}

const onWebInvokeAppService = ({ name, arg }, pageIds) => {
    if (name === 'postMessage') {
        onMessage(pageIds[0], arg);
    }
    else {
        uni[name](extend(arg, {
            fail(res) {
                console.error(res.errMsg);
            },
        }));
    }
};
function onMessage(pageId, arg) {
    const uniNode = findNodeByTagName('web-view', parseInt(pageId));
    uniNode &&
        uniNode.dispatchEvent(createUniEvent({
            type: 'onMessage',
            target: Object.create(null),
            currentTarget: Object.create(null),
            detail: {
                data: [arg],
            },
        }));
}

function onWxsInvokeCallMethod({ nodeId, ownerId, method, args, }, pageId) {
    const node = findNodeById(nodeId, parseInt(pageId));
    if (!node) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('Wxs', 'CallMethod', nodeId, 'not found'));
        }
        return;
    }
    const vm = resolveOwnerVm(ownerId, node.__vueParentComponent);
    if (!vm) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('Wxs', 'CallMethod', 'vm not found'));
        }
        return;
    }
    if (!vm[method]) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.error(formatLog('Wxs', 'CallMethod', method, ' not found'));
        }
        return;
    }
    vm[method](args);
}
function resolveOwnerVm(ownerId, vm) {
    if (!vm) {
        return null;
    }
    if (vm.uid === ownerId) {
        return vm.proxy;
    }
    let parent = vm.parent;
    while (parent) {
        if (parent.uid === ownerId) {
            return parent.proxy;
        }
        parent = parent.parent;
    }
    return vm.proxy;
}

function initSubscribeHandlers() {
    const { subscribe, subscribeHandler, publishHandler } = UniServiceJSBridge;
    onPlusMessage('subscribeHandler', ({ type, data, pageId }) => {
        subscribeHandler(type, data, pageId);
    });
    onPlusMessage(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
        onWebInvokeAppService(data, webviewIds);
    });
    if (__uniConfig.renderer !== 'native') {
        // 非纯原生
        subscribe(ON_WEBVIEW_READY, subscribeWebviewReady);
        subscribe(VD_SYNC, onVdSync);
        subscribeServiceMethod();
        subscribeAd();
        subscribeNavigator();
        subscribe(WEBVIEW_INSERTED, onWebviewInserted);
        subscribe(WEBVIEW_REMOVED, onWebviewRemoved);
        subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod);
        const routeOptions = getRouteOptions(addLeadingSlash(__uniConfig.entryPagePath));
        if (routeOptions && !routeOptions.meta.isNVue) {
            // 防止首页 webview 初始化过早， service 还未开始监听
            publishHandler(ON_WEBVIEW_READY, {}, 1);
        }
    }
}

let appCtx;
const defaultApp = {
    globalData: {},
};
function getApp$1({ allowDefault = false } = {}) {
    if (appCtx) {
        // 真实的 App 已初始化
        return appCtx;
    }
    if (allowDefault) {
        // 返回默认实现
        return defaultApp;
    }
    console.error('[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.');
}
function registerApp(appVm) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('registerApp'));
    }
    // 定制 useStore （主要是为了 nvue 共享）
    if (uni.Vuex && appVm.$store) {
        const { useStore } = uni.Vuex;
        uni.Vuex.useStore = (key) => {
            if (!key) {
                return appVm.$store;
            }
            return useStore(key);
        };
    }
    initVueApp(appVm);
    appCtx = appVm;
    initAppVm(appCtx);
    extend(appCtx, defaultApp); // 拷贝默认实现
    defineGlobalData(appCtx, defaultApp.globalData);
    initService();
    initEntry();
    initTabBar();
    initGlobalEvent();
    initKeyboardEvent();
    initSubscribeHandlers();
    initAppLaunch(appVm);
    // 10s后清理临时文件
    setTimeout(clearTempFile, 10000);
    __uniConfig.ready = true;
}

var index = {
    uni: uni$1,
    getApp: getApp$1,
    getCurrentPages: getCurrentPages$1,
    __definePage: definePage,
    __registerApp: registerApp,
    __registerPage: registerPage,
    UniServiceJSBridge: UniServiceJSBridge$1,
};

export { index as default };
