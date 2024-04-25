import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import promptAction from '@ohos.promptAction';
import { injectHook, createVNode, render, getCurrentInstance, onMounted, nextTick, onBeforeUnmount } from 'vue';

/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set = new Set(str.split(","));
  return expectsLowerCase ? (val) => set.has(val.toLowerCase()) : (val) => set.has(val);
}
const extend = Object.assign;
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const CHOOSE_SIZE_TYPES = ['original', 'compressed'];
const CHOOSE_SOURCE_TYPES = ['album', 'camera'];
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
    const result = {
        errMsg: name + ':ok',
    };
    return invokeCallback(id, extend((res || {}), result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
    const apiErrMsg = name + ':fail' + (errMsg ? ' ' + errMsg : '');
    delete errRes.errCode;
    let res = extend({ errMsg: apiErrMsg }, errRes);
    return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
    if (('production' !== 'production')) {
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
function normalizeErrMsg(errMsg) {
    if (!errMsg || isString(errMsg)) {
        return errMsg;
    }
    if (errMsg.stack) {
        console.error(errMsg.message + '\n' + errMsg.stack);
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
function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, ('production' !== 'production') ? protocol : undefined, options);
}
function defineAsyncApi(name, fn, protocol, options) {
    return promisify(name, wrapperAsyncApi(name, fn, ('production' !== 'production') ? protocol : undefined, options));
}

/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
function getBaseSystemInfo() {
    return {
        platform: 'harmonyos',
        pixelRatio: vp2px(1),
        windowWidth: lpx2px(720), // TODO designWidth可配置
    };
}

const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE';
// lifecycle
// App and Page
const ON_SHOW = 'onShow';
const ON_HIDE = 'onHide';
//App
const ON_LAUNCH = 'onLaunch';
const ON_ERROR = 'onError';
const ON_PAGE_NOT_FOUND = 'onPageNotFound';
const ON_UNHANDLE_REJECTION = 'onUnhandledRejection';
const ON_READY = 'onReady';
const ON_UNLOAD = 'onUnload';
const ON_RESIZE = 'onResize';
const ON_PAGE_SCROLL = 'onPageScroll';
const ON_REACH_BOTTOM = 'onReachBottom';
// framework
const ON_APP_ENTER_FOREGROUND = 'onAppEnterForeground';
const ON_APP_ENTER_BACKGROUND = 'onAppEnterBackground';

let lastLogTime = 0;
function formatLog(module, ...args) {
    const now = Date.now();
    const diff = lastLogTime ? now - lastLogTime : 0;
    lastLogTime = now;
    return `[${now}][${diff}ms][${module}]：${args
        .map((arg) => JSON.stringify(arg))
        .join(' ')}`;
}

function hasLeadingSlash(str) {
    return str.indexOf('/') === 0;
}
function addLeadingSlash(str) {
    return hasLeadingSlash(str) ? str : '/' + str;
}
const invokeArrayFns = (fns, arg) => {
    let ret;
    for (let i = 0; i < fns.length; i++) {
        ret = fns[i](arg);
    }
    return ret;
};
function once(fn, ctx = null) {
    let res;
    return ((...args) => {
        if (fn) {
            res = fn.apply(ctx, args);
            fn = null;
        }
        return res;
    });
}

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
function decode(text) {
    try {
        return decodeURIComponent('' + text);
    }
    catch (err) { }
    return '' + text;
}
const PLUS_RE = /\+/g; // %2B
/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
    const query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?')
        return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (let i = 0; i < searchParams.length; ++i) {
        // pre decode the + into space
        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
        // allow the = character
        let eqPos = searchParam.indexOf('=');
        let key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
        let value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
        if (key in query) {
            // an extra variable for ts types
            let currentValue = query[key];
            if (!isArray(currentValue)) {
                currentValue = query[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            query[key] = value;
        }
    }
    return query;
}

class UniEvent {
    type;
    bubbles;
    cancelable;
    defaultPrevented = false;
    detail;
    timeStamp = Date.now();
    _stop = false;
    _end = false;
    constructor(type, opts) {
        this.type = type;
        this.bubbles = !!opts.bubbles;
        this.cancelable = !!opts.cancelable;
    }
    preventDefault() {
        this.defaultPrevented = true;
    }
    stopImmediatePropagation() {
        this._end = this._stop = true;
    }
    stopPropagation() {
        this._stop = true;
    }
}
function createUniEvent(evt) {
    if (evt instanceof UniEvent) {
        return evt;
    }
    const [type] = parseEventName(evt.type);
    const uniEvent = new UniEvent(type, {
        bubbles: false,
        cancelable: false,
    });
    extend(uniEvent, evt);
    return uniEvent;
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseEventName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while ((m = name.match(optionsModifierRE))) {
            name = name.slice(0, name.length - m[0].length);
            options[m[0].toLowerCase()] = true;
        }
    }
    return [hyphenate(name.slice(2)), options];
}

const ACTION_TYPE_EVENT = 20;

class EventChannel {
    id;
    listener;
    emitCache;
    constructor(id, events) {
        this.id = id;
        this.listener = {};
        this.emitCache = [];
        if (events) {
            Object.keys(events).forEach((name) => {
                this.on(name, events[name]);
            });
        }
    }
    emit(eventName, ...args) {
        const fns = this.listener[eventName];
        if (!fns) {
            return this.emitCache.push({
                eventName,
                args,
            });
        }
        fns.forEach((opt) => {
            opt.fn.apply(opt.fn, args);
        });
        this.listener[eventName] = fns.filter((opt) => opt.type !== 'once');
    }
    on(eventName, fn) {
        this._addListener(eventName, 'on', fn);
        this._clearCache(eventName);
    }
    once(eventName, fn) {
        this._addListener(eventName, 'once', fn);
        this._clearCache(eventName);
    }
    off(eventName, fn) {
        const fns = this.listener[eventName];
        if (!fns) {
            return;
        }
        if (fn) {
            for (let i = 0; i < fns.length;) {
                if (fns[i].fn === fn) {
                    fns.splice(i, 1);
                    i--;
                }
                i++;
            }
        }
        else {
            delete this.listener[eventName];
        }
    }
    _clearCache(eventName) {
        for (let index = 0; index < this.emitCache.length; index++) {
            const cache = this.emitCache[index];
            const _name = eventName
                ? cache.eventName === eventName
                    ? eventName
                    : null
                : cache.eventName;
            if (!_name)
                continue;
            const location = this.emit.apply(this, [_name, ...cache.args]);
            if (typeof location === 'number') {
                this.emitCache.pop();
                continue;
            }
            this.emitCache.splice(index, 1);
            index--;
        }
    }
    _addListener(eventName, type, fn) {
        (this.listener[eventName] || (this.listener[eventName] = [])).push({
            fn,
            type,
        });
    }
}

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
            for (var i = evts.length - 1; i >= 0; i--) {
                if (evts[i].fn === callback || evts[i].fn._ === callback) {
                    evts.splice(i, 1);
                    break;
                }
            }
            liveEvents = evts;
        }
        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
        liveEvents.length ? (e[name] = liveEvents) : delete e[name];
        return this;
    },
};

const isObject = (val) => val !== null && typeof val === 'object';
const defaultDelimiters = ['{', '}'];
class BaseFormatter {
    _caches;
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
    locale = LOCALE_EN;
    fallbackLocale = LOCALE_EN;
    message = {};
    messages = {};
    watchers = [];
    formater;
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
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

const isEnableLocale = /*#__PURE__*/ once(() => typeof __uniConfig !== 'undefined' &&
    __uniConfig.locales &&
    !!Object.keys(__uniConfig.locales).length);

let i18n;
function useI18n() {
    if (!i18n) {
        let locale;
        {
            locale = uni.getSystemInfoSync().language;
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
// Do not modify this file!!!!!!!!!
function normalizeMessages(module, keys, values) {
    return keys.reduce((res, name, index) => {
        res[module + name] = values[index];
        return res;
    }, {});
}
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

function initBridge(subscribeNamespace) {
    const emitter = new E();
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
    const hooks = vm.$[name];
    return hooks && invokeArrayFns(hooks, args);
}

function getRouteOptions(path, alias = false) {
    if (alias) {
        return __uniRoutes.find((route) => route.path === path || route.alias === path);
    }
    return __uniRoutes.find((route) => route.path === path);
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
function initPageVm(pageVm, page) {
    pageVm.route = page.route;
    pageVm.$vm = pageVm;
    pageVm.$page = page;
    pageVm.$mpType = 'page';
    pageVm.$fontFamilySet = new Set();
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

const enterOptions$1 = /*#__PURE__*/ createLaunchOptions();
const launchOptions$1 = /*#__PURE__*/ createLaunchOptions();
function getLaunchOptions() {
    // TODO: Implement
    return extend({}, launchOptions$1);
}
function getEnterOptions() {
    // TODO: Implement
    return extend({}, enterOptions$1);
}

const appHooks = {
    [ON_UNHANDLE_REJECTION]: [],
    [ON_PAGE_NOT_FOUND]: [],
    [ON_ERROR]: [],
    [ON_SHOW]: [],
    [ON_HIDE]: [],
};
function injectAppHooks(appInstance) {
    Object.keys(appHooks).forEach((type) => {
        appHooks[type].forEach((hook) => {
            injectHook(type, hook, appInstance);
        });
    });
}
const API_GET_ENTER_OPTIONS_SYNC = 'getEnterOptionsSync';
defineSyncApi(API_GET_ENTER_OPTIONS_SYNC, () => {
    return getEnterOptions();
});
const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync';
defineSyncApi(API_GET_LAUNCH_OPTIONS_SYNC, () => {
    return getLaunchOptions();
});

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

async function openAlbum(count = 9) {
    return new Promise((resolve, reject) => {
        try {
            const photoSelectOptions = new picker.PhotoSelectOptions();
            photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            photoSelectOptions.maxSelectNumber = count;
            const photoPicker = new picker.PhotoViewPicker();
            photoPicker
                .select(photoSelectOptions)
                .then((photoSelectResult) => {
                resolve({
                    tempFilePaths: photoSelectResult.photoUris,
                    tempFiles: photoSelectResult.photoUris.map((uri) => {
                        const file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
                        const stat = fs.statSync(file.fd);
                        fs.closeSync(file);
                        return {
                            path: uri,
                            size: stat.size,
                        };
                    }),
                });
                console.info('PhotoViewPicker.select successfully, PhotoSelectResult uri: ' +
                    JSON.stringify(photoSelectResult));
            })
                .catch((error) => {
                console.error('PhotoViewPicker.select failed with err: ' + JSON.stringify(error));
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
async function openCamera() {
    return {
        tempFilePaths: [],
        tempFiles: [],
    };
}
async function chooseSourceType() {
    initI18nChooseImageMsgsOnce();
    const { t } = useI18n();
    return new Promise((resolve, reject) => {
        try {
            promptAction.showActionMenu({
                title: '',
                buttons: [
                    {
                        text: t('uni.chooseImage.sourceType.camera'),
                        color: '#000000',
                    },
                    {
                        text: t('uni.chooseImage.sourceType.album'),
                        color: '#000000',
                    },
                ],
            }, (err, data) => {
                if (err) {
                    console.info(`showActionMenu fail callback, error code: ${err.code}, error message: ${err.message}`);
                    reject(err);
                }
                console.info('showActionMenu success callback, click button: ' + data.index);
                switch (data.index) {
                    case 0:
                        resolve('camera');
                        return;
                    case 1:
                        resolve('album');
                        return;
                    default:
                        break;
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
const chooseImage = defineAsyncApi(API_CHOOSE_IMAGE, function ({ count, sourceType } = {}, { resolve, reject }) {
    return Promise.resolve()
        .then(async () => {
        let realSourceType = '';
        if (sourceType && sourceType.length === 1) {
            if (sourceType.includes('album')) {
                realSourceType = 'album';
            }
            else if (sourceType.includes('camera')) {
                realSourceType = 'camera';
            }
        }
        if (!realSourceType) {
            realSourceType = await chooseSourceType();
        }
        switch (realSourceType) {
            case 'album':
                return openAlbum(count);
            case 'camera':
                return openCamera();
        }
    })
        .then(resolve)
        .catch(reject);
}, ChooseImageProtocol, ChooseImageOptions);

function getLocale() {
    return 'zh-CN';
}

function getSystemInfoSync() {
    // TODO: implement
    return getBaseSystemInfo();
}

var uni$1 = {
  __proto__: null,
  chooseImage: chooseImage,
  getLocale: getLocale,
  getSystemInfoSync: getSystemInfoSync
};

const UniServiceJSBridge$1 = /*#__PURE__*/ extend(ServiceJSBridge, {
    publishHandler,
});
function publishHandler(event, args, pageIds) {
    args = JSON.stringify(args);
    if (('production' !== 'production')) {
        console.log(formatLog('publishHandler', event, args, pageIds));
    }
    if (!isArray(pageIds)) {
        pageIds = [pageIds];
    }
    const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`;
    if (('production' !== 'production')) {
        console.log(formatLog('publishHandler', 'size', evalJSCode.length));
    }
    pageIds.forEach((id) => {
        const idStr = String(id);
        const code = evalJSCode.replace('__PAGE_ID__', idStr);
        console.log('TODO eval:', idStr, code);
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

function initVueApp(appVm) {
    const internalInstance = appVm.$;
    // 定制 App 的 $children 为 devtools 服务 false
    Object.defineProperty(internalInstance.ctx, '$children', {
        get() {
            return getAllPages().map((page) => page.$vm);
        },
    });
    const appContext = internalInstance.appContext;
    extend(appContext.app, {
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

const VD_SYNC = 'vdSync';
const ON_WEBVIEW_READY = 'onWebviewReady';
const WEBVIEW_INSERTED = 'webviewInserted';
const WEBVIEW_REMOVED = 'webviewRemoved';

let focusTimeout = 0;
let keyboardHeight = 0;
let focusTimer = null;
function hookKeyboardEvent(event, callback) {
    if (focusTimer) {
        clearTimeout(focusTimer);
        focusTimer = null;
    }
    if (event.type === 'onFocus') {
        {
            focusTimer = setTimeout(function () {
                event.detail.height = keyboardHeight;
                callback(event);
            }, focusTimeout);
            return;
        }
    }
    callback(event);
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
        if (('production' !== 'production')) {
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

const enterOptions = /*#__PURE__*/ createLaunchOptions();
const launchOptions = /*#__PURE__*/ createLaunchOptions();
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

function subscribeWebviewReady(_data, pageId) {
    // TODO
}

function onWebviewInserted(_, pageId) {
    const page = getPageById(parseInt(pageId));
    page && (page.__uniapp_webview = true);
}
function onWebviewRemoved(_, pageId) {
    const page = getPageById(parseInt(pageId));
    page && delete page.__uniapp_webview;
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
function findNodeByTagName(tagName, uniNode) {
    return findNode('nodeName', tagName.toUpperCase(), uniNode);
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

function initSubscribeHandlers() {
    const { subscribe, subscribeHandler, publishHandler } = UniServiceJSBridge;
    onPlusMessage('subscribeHandler', ({ type, data, pageId }) => {
        subscribeHandler(type, data, pageId);
    });
    onPlusMessage(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
        onWebInvokeAppService(data, webviewIds);
    });
    subscribe(ON_WEBVIEW_READY, subscribeWebviewReady);
    subscribe(VD_SYNC, onVdSync);
    subscribeServiceMethod();
    // TODO subscribeAd
    subscribeNavigator();
    subscribe(WEBVIEW_INSERTED, onWebviewInserted);
    subscribe(WEBVIEW_REMOVED, onWebviewRemoved);
    // TODO subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod)
    const routeOptions = getRouteOptions(addLeadingSlash(__uniConfig.entryPagePath));
    if (routeOptions) {
        // 防止首页 webview 初始化过早， service 还未开始监听
        publishHandler(ON_WEBVIEW_READY, {}, 1);
    }
}

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
}

let appCtx;
const defaultApp = {
    globalData: {},
};
function initAppVm(appVm) {
    appVm.$vm = appVm;
    appVm.$mpType = 'app';
    // TODO useI18n
}
function registerApp(appVm) {
    if (('production' !== 'production')) {
        console.log(formatLog('registerApp'));
    }
    // TODO 定制 useStore
    initVueApp(appVm);
    appCtx = appVm;
    initAppVm(appCtx);
    extend(appCtx, defaultApp); // 拷贝默认实现
    defineGlobalData(appCtx, defaultApp.globalData);
    initService();
    initSubscribeHandlers();
    initAppLaunch(appVm);
    // TODO clearTempFile
    __uniConfig.ready = true;
}

function setupPage(component) {
    const oldSetup = component.setup;
    component.inheritAttrs = false; // 禁止继承 __pageId 等属性，避免告警
    component.setup = (_, ctx) => {
        const { attrs: { __pageId, __pagePath, __pageQuery, __pageInstance }, } = ctx;
        if (('production' !== 'production')) {
            console.log(formatLog(__pagePath, 'setup'));
        }
        const instance = getCurrentInstance();
        const pageVm = instance.proxy;
        initPageVm(pageVm, __pageInstance);
        addCurrentPage(initScope(__pageId, pageVm, __pageInstance));
        {
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
        }
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
function createFactory(component) {
    return () => {
        if (isVuePageAsyncComponent(component)) {
            return component().then((component) => setupPage(component));
        }
        return setupPage(component);
    };
}

var index = {
    uni: uni$1,
    getCurrentPages: getCurrentPages$1,
    __definePage: definePage,
    __registerApp: registerApp,
    UniServiceJSBridge: UniServiceJSBridge$1,
};

export { index as default };
