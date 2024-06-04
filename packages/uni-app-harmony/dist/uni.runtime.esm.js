import { ref, injectHook, createVNode, render, queuePostFlushCb, getCurrentInstance, onMounted, nextTick, onBeforeUnmount } from 'vue';

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
const cacheStringFunction$1 = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction$1((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction$1(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction$1((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

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
function parseErrMsg(errMsg) {
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
            reject: (errMsg, errRes) => invokeFail(id, name, parseErrMsg(errMsg), errRes),
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
    const plus = weex.requireModule('plus');
    return {
        platform: 'harmony',
        pixelRatio: vp2px(1),
        windowWidth: lpx2px(720), // TODO designWidth可配置
        language: plus.getLanguage(),
    };
}

const TABBAR_HEIGHT = 50;
const ON_REACH_BOTTOM_DISTANCE = 50;
const I18N_JSON_DELIMITERS = ['%', '%'];
const SCHEME_RE = /^([a-z-]+:)?\/\//i;
const DATA_RE = /^data:.*,.*/;
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
const ON_BACK_PRESS = 'onBackPress';
const ON_PAGE_SCROLL = 'onPageScroll';
const ON_TAB_ITEM_TAP = 'onTabItemTap';
const ON_REACH_BOTTOM = 'onReachBottom';
// navigationBar
const ON_NAVIGATION_BAR_BUTTON_TAP = 'onNavigationBarButtonTap';
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

function cache(fn) {
    const cache = Object.create(null);
    return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}
function cacheStringFunction(fn) {
    return cache(fn);
}
function getLen(str = '') {
    return ('' + str).replace(/[^\x00-\xff]/g, '**').length;
}
function hasLeadingSlash(str) {
    return str.indexOf('/') === 0;
}
function addLeadingSlash(str) {
    return hasLeadingSlash(str) ? str : '/' + str;
}
function removeLeadingSlash(str) {
    return hasLeadingSlash(str) ? str.slice(1) : str;
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

const encode$1 = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode$1) {
    const res = obj
        ? Object.keys(obj)
            .map((key) => {
            let val = obj[key];
            if (typeof val === undefined || val === null) {
                val = '';
            }
            else if (isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            return encodeStr(key) + '=' + encodeStr(val);
        })
            .filter((x) => x.length > 0)
            .join('&')
        : null;
    return res ? `?${res}` : '';
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

function parseUrl(url) {
    const [path, querystring] = url.split('?', 2);
    return {
        path,
        query: parseQuery(querystring || ''),
    };
}

class DOMException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DOMException';
    }
}

function normalizeEventType(type, options) {
    if (options) {
        if (options.capture) {
            type += 'Capture';
        }
        if (options.once) {
            type += 'Once';
        }
        if (options.passive) {
            type += 'Passive';
        }
    }
    return `on${capitalize(camelize(type))}`;
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
class UniEventTarget {
    listeners = Object.create(null);
    dispatchEvent(evt) {
        const listeners = this.listeners[evt.type];
        if (!listeners) {
            if (('production' !== 'production')) {
                console.error(formatLog('dispatchEvent', this.nodeId), evt.type, 'not found');
            }
            return false;
        }
        // 格式化事件类型
        const event = createUniEvent(evt);
        const len = listeners.length;
        for (let i = 0; i < len; i++) {
            listeners[i].call(this, event);
            if (event._end) {
                break;
            }
        }
        return event.cancelable && event.defaultPrevented;
    }
    addEventListener(type, listener, options) {
        type = normalizeEventType(type, options);
        (this.listeners[type] || (this.listeners[type] = [])).push(listener);
    }
    removeEventListener(type, callback, options) {
        type = normalizeEventType(type, options);
        const listeners = this.listeners[type];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
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

const NODE_TYPE_PAGE = 0;
const NODE_TYPE_ELEMENT = 1;
function sibling(node, type) {
    const { parentNode } = node;
    if (!parentNode) {
        return null;
    }
    const { childNodes } = parentNode;
    return childNodes[childNodes.indexOf(node) + (type === 'n' ? 1 : -1)] || null;
}
function removeNode(node) {
    const { parentNode } = node;
    if (parentNode) {
        const { childNodes } = parentNode;
        const index = childNodes.indexOf(node);
        if (index > -1) {
            node.parentNode = null;
            childNodes.splice(index, 1);
        }
    }
}
function checkNodeId(node) {
    if (!node.nodeId && node.pageNode) {
        node.nodeId = node.pageNode.genId();
    }
}
// 为优化性能，各平台不使用proxy来实现node的操作拦截，而是直接通过pageNode定制
class UniNode extends UniEventTarget {
    nodeId;
    nodeType;
    nodeName;
    childNodes;
    pageNode = null;
    parentNode = null;
    __vueParentComponent;
    _text = null;
    constructor(nodeType, nodeName, container) {
        super();
        if (container) {
            const { pageNode } = container;
            if (pageNode) {
                this.pageNode = pageNode;
                this.nodeId = pageNode.genId();
                !pageNode.isUnmounted && pageNode.onCreate(this, nodeName);
            }
        }
        this.nodeType = nodeType;
        this.nodeName = nodeName;
        this.childNodes = [];
    }
    get firstChild() {
        return this.childNodes[0] || null;
    }
    get lastChild() {
        const { childNodes } = this;
        const length = childNodes.length;
        return length ? childNodes[length - 1] : null;
    }
    get nextSibling() {
        return sibling(this, 'n');
    }
    get nodeValue() {
        return null;
    }
    set nodeValue(_val) { }
    get textContent() {
        return this._text || '';
    }
    set textContent(text) {
        this._text = text;
        if (this.pageNode && !this.pageNode.isUnmounted) {
            this.pageNode.onTextContent(this, text);
        }
    }
    get parentElement() {
        const { parentNode } = this;
        if (parentNode && parentNode.nodeType === NODE_TYPE_ELEMENT) {
            return parentNode;
        }
        return null;
    }
    get previousSibling() {
        return sibling(this, 'p');
    }
    appendChild(newChild) {
        return this.insertBefore(newChild, null);
    }
    cloneNode(deep) {
        const cloned = extend(Object.create(Object.getPrototypeOf(this)), this);
        const { attributes } = cloned;
        if (attributes) {
            cloned.attributes = extend({}, attributes);
        }
        if (deep) {
            cloned.childNodes = cloned.childNodes.map((childNode) => childNode.cloneNode(true));
        }
        return cloned;
    }
    insertBefore(newChild, refChild) {
        // 先从现在的父节点移除（注意：不能触发onRemoveChild，否则会生成先remove该 id，再 insert）
        removeNode(newChild);
        newChild.pageNode = this.pageNode;
        newChild.parentNode = this;
        checkNodeId(newChild);
        const { childNodes } = this;
        if (refChild) {
            const index = childNodes.indexOf(refChild);
            if (index === -1) {
                throw new DOMException(`Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`);
            }
            childNodes.splice(index, 0, newChild);
        }
        else {
            childNodes.push(newChild);
        }
        return this.pageNode && !this.pageNode.isUnmounted
            ? this.pageNode.onInsertBefore(this, newChild, refChild)
            : newChild;
    }
    removeChild(oldChild) {
        const { childNodes } = this;
        const index = childNodes.indexOf(oldChild);
        if (index === -1) {
            throw new DOMException(`Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`);
        }
        oldChild.parentNode = null;
        childNodes.splice(index, 1);
        return this.pageNode && !this.pageNode.isUnmounted
            ? this.pageNode.onRemoveChild(oldChild)
            : oldChild;
    }
}

const ACTION_TYPE_PAGE_CREATE = 1;
const ACTION_TYPE_PAGE_CREATED = 2;
const ACTION_TYPE_CREATE = 3;
const ACTION_TYPE_INSERT = 4;
const ACTION_TYPE_REMOVE = 5;
const ACTION_TYPE_SET_ATTRIBUTE = 6;
const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
const ACTION_TYPE_ADD_EVENT = 8;
const ACTION_TYPE_REMOVE_EVENT = 9;
const ACTION_TYPE_SET_TEXT = 10;
const ACTION_TYPE_ADD_WXS_EVENT = 12;
const ACTION_TYPE_PAGE_SCROLL = 15;
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
var Emitter = E;

const borderStyles = {
    black: 'rgba(0,0,0,0.4)',
    white: 'rgba(255,255,255,0.4)',
};
function normalizeTabBarStyles(borderStyle) {
    if (borderStyle && borderStyle in borderStyles) {
        return borderStyles[borderStyle];
    }
    return borderStyle;
}
function normalizeTitleColor(titleColor) {
    return titleColor === 'black' ? '#000000' : '#ffffff';
}
function resolveStringStyleItem(modeStyle, styleItem, key) {
    if (isString(styleItem) && styleItem.startsWith('@')) {
        const _key = styleItem.replace('@', '');
        let _styleItem = modeStyle[_key] || styleItem;
        switch (key) {
            case 'titleColor':
                _styleItem = normalizeTitleColor(_styleItem);
                break;
            case 'borderStyle':
                _styleItem = normalizeTabBarStyles(_styleItem);
                break;
        }
        return _styleItem;
    }
    return styleItem;
}
function normalizeStyles(pageStyle, themeConfig = {}, mode = 'light') {
    const modeStyle = themeConfig[mode];
    const styles = {};
    if (typeof modeStyle === 'undefined')
        return pageStyle;
    Object.keys(pageStyle).forEach((key) => {
        const styleItem = pageStyle[key]; // Object Array String
        const parseStyleItem = () => {
            if (isPlainObject(styleItem))
                return normalizeStyles(styleItem, themeConfig, mode);
            if (isArray(styleItem))
                return styleItem.map((item) => {
                    if (typeof item === 'object')
                        return normalizeStyles(item, themeConfig, mode);
                    return resolveStringStyleItem(modeStyle, item);
                });
            return resolveStringStyleItem(modeStyle, styleItem, key);
        };
        styles[key] = parseStyleItem();
    });
    return styles;
}

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
        // ;[locale, messages] = [
        //   messages as unknown as string,
        //   locale as unknown as LocaleMessages,
        // ]
        // 暂不使用数组解构，uts编译器暂未支持。
        const options = [
            messages,
            locale,
        ];
        locale = options[0];
        messages = options[1];
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
// Do not modify this file!!!!!!!!!
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
        // 鸿蒙平台特性
        return 'file:/' + normalizeLocalPath(filepath);
    }
    // TODO 暂时转换为 resource
    const wwwPath = normalizeLocalPath('_www').replace(/.+?\/apps\//, 'resource://rawfile/apps/');
    // 绝对路径转换为本地文件系统路径
    if (filepath.indexOf('/') === 0) {
        // 平台绝对路径
        if (filepath.startsWith('/data/storage/')) {
            // 鸿蒙平台特性
            return 'file:/' + filepath;
        }
        return wwwPath + filepath;
    }
    // 相对资源
    if (filepath.indexOf('../') === 0 || filepath.indexOf('./') === 0) {
        // app-view
        if (typeof __id__ === 'string') {
            // app-view
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
    return plus.io.convertLocalFileSystemURL(filepath).replace(/\/$/, '');
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

const API_ON_TAB_BAR_MID_BUTTON_TAP = 'onTabBarMidButtonTap';

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
const SwitchTabProtocol = BaseRouteProtocol;
const NavigateToOptions = 
/*#__PURE__*/ createRouteOptions(API_NAVIGATE_TO);
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
        // TODO useTabBarThemeChange(tabBar, options)
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
        if (('production' !== 'production')) {
            console.error(formatLog('isTabBarPage', e));
        }
    }
    return false;
}

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

function getSystemInfoSync() {
    // TODO: implement
    return getBaseSystemInfo();
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
function removePage(curPage) {
    const index = pages.findIndex((page) => page === curPage);
    if (index === -1) {
        return;
    }
    if (!curPage.$page.meta.isNVue) {
        getVueApp().unmountPage(curPage);
    }
    pages.splice(index, 1);
    if (('production' !== 'production')) {
        console.log(formatLog('removePage', curPage.$page));
    }
}

const VD_SYNC = 'vdSync';
const ON_WEBVIEW_READY = 'onWebviewReady';
const ACTION_TYPE_DICT = 0;
const WEBVIEW_INSERTED = 'webviewInserted';
const WEBVIEW_REMOVED = 'webviewRemoved';

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
        webviewStyle.popGesture = ('none');
    }
}

function initPullToRefresh(webviewStyle, routeMeta) {
    if (!routeMeta.enablePullDownRefresh) {
        return;
    }
    const pullToRefresh = normalizePullToRefreshRpx(extend({}, defaultPullToRefresh, routeMeta.pullToRefresh));
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
            if (('production' !== 'production')) {
                console.log(formatLog('updateWebview', webview.id, newPullToRefresh));
            }
            webview.setStyle({
                pullToRefresh: newPullToRefresh,
            });
        });
    }
    return pullToRefresh;
}
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
            if (('production' !== 'production')) {
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
    const queryString = query ? stringifyQuery(query, encode) : '';
    return {
        path: path.slice(1),
        query: queryString ? queryString.slice(1) : queryString,
    };
}
function initDebugRefresh(isTab, path, query) {
    const queryString = query ? stringifyQuery(query, encode) : '';
    return {
        isTab,
        arguments: JSON.stringify({
            path: path.slice(1),
            query: queryString ? queryString.slice(1) : queryString,
        }),
    };
}

const downgrade = 'Harmony' === 'Android' ;
const ANI_SHOW = 'pop-in';
const ANI_DURATION = 300;
const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out';
const VIEW_WEBVIEW_PATH = '_www/__uniappview.html';
const WEBVIEW_ID_PREFIX = 'webviewId';

let preloadWebview;
function setPreloadWebview(webview) {
    return (preloadWebview = webview);
}
function getPreloadWebview() {
    return preloadWebview;
}
function createPreloadWebview() {
    if (!preloadWebview || preloadWebview.__uniapp_route) {
        // 不存在，或已被使用
        preloadWebview = plus.webview.create(VIEW_WEBVIEW_PATH, String(genWebviewId()), 
        // @ts-expect-error
        { contentAdjust: false });
        if (('production' !== 'production')) {
            console.log(formatLog('createPreloadWebview', preloadWebview.id));
        }
    }
    return preloadWebview;
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

const EVENT_BACKBUTTON = 'backbutton';
function backbuttonListener() {
    uni.navigateBack({
        from: 'backbutton',
        success() { }, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
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

function onWebviewReady(pageId, callback) {
    UniServiceJSBridge.once(ON_WEBVIEW_READY + '.' + pageId, callback);
}

function closeWebview(webview, animationType, animationDuration) {
    webview[webview.__preload__ ? 'hide' : 'close'](animationType, animationDuration);
}
function showWebview(webview, animationType, animationDuration, showCallback, delay) {
    if (typeof delay === 'undefined') {
        delay = webview.nvue ? 0 : 100;
    }
    if (('production' !== 'production')) {
        console.log(formatLog('showWebview', 'delay', delay));
    }
    const execShowCallback = function () {
        if (execShowCallback._called) {
            if (('production' !== 'production')) {
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
            if (('production' !== 'production')) {
                console.log(formatLog('showWebview', 'callback', 'timer'));
            }
            execShowCallback();
        }, animationDuration + 150);
        webview.show(animationType, animationDuration, () => {
            if (('production' !== 'production')) {
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
        // 无子 webview
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

let pendingNavigator = false;
function getPendingNavigator() {
    return pendingNavigator;
}
function setPendingNavigator(path, callback, msg) {
    pendingNavigator = {
        path,
        nvue: getRouteMeta(path).isNVue,
        callback,
    };
    if (('production' !== 'production')) {
        console.log(formatLog('setPendingNavigator', path, msg));
    }
}
function closePage(page, animationType, animationDuration) {
    removePage(page);
    closeWebview(page.$getAppWebview(), animationType, animationDuration);
}
function pendingNavigate() {
    if (!pendingNavigator) {
        return;
    }
    const { callback } = pendingNavigator;
    if (('production' !== 'production')) {
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
    if (('production' !== 'production')) {
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

function navigate(path, callback, isAppLaunch) {
    const pendingNavigator = getPendingNavigator();
    if (!isAppLaunch && pendingNavigator) {
        return console.error(`Waiting to navigate to: ${pendingNavigator.path}, do not operate continuously: ${path}.`);
    }
    // 未创建 preloadWebview 或 preloadWebview 已被使用
    const preloadWebview = getPreloadWebview();
    const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route);
    // 已创建未 loaded
    const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded;
    if (waitPreloadWebview || waitPreloadWebviewReady) {
        setPendingNavigator(path, callback, waitPreloadWebview ? 'waitForCreate' : 'waitForReady');
    }
    else {
        callback();
    }
    if (waitPreloadWebviewReady) {
        onWebviewReady(preloadWebview.id, pendingNavigate);
    }
}

class UniPageNode extends UniNode {
    pageId;
    _id = 1;
    _created = false;
    _updating = false;
    options;
    createAction;
    createdAction;
    scrollAction;
    _createActionMap = new Map();
    updateActions = [];
    dicts = [];
    normalizeDict;
    isUnmounted;
    _update;
    constructor(pageId, options, setup = false) {
        super(NODE_TYPE_PAGE, '#page', null);
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
            if (('production' !== 'production')) {
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
                    // if (('production' !== 'production')) {
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
        if (('production' !== 'production')) {
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
        else if (('production' !== 'production')) {
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

function initWebviewStyle(webview, path, query, routeMeta) {
    // TODO parseTheme
    const getWebviewStyle = () => parseWebviewStyle(path, routeMeta, webview);
    const webviewStyle = getWebviewStyle();
    webviewStyle.uniPageUrl = initUniPageUrl(path, query);
    const isTabBar = !!routeMeta.isTabBar;
    webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query);
    webviewStyle.locale = weex.requireModule('plus').getLanguage();
    if (('production' !== 'production')) {
        console.log(formatLog('updateWebview', webviewStyle));
    }
    // TODO useWebviewThemeChange
    webview.setStyle(webviewStyle);
}

function initWebview(webview, path, query, routeMeta) {
    initWebviewStyle(webview, path, query, routeMeta);
    // TODO initWebviewEvent(webview)
}

function createWebview(options) {
    if (getWebviewId() === 2) {
        return plus.webview.getLaunchWebview();
    }
    return getPreloadWebview();
}

function getStatusbarHeight() {
    // TODO
    return 0;
}

function registerPage({ url, path, query, openType, webview, nvuePageVm, eventChannel, }) {
    // TODO initEntry()
    // TODO preloadWebviews[url]
    const routeOptions = initRouteOptions(path, openType);
    if (!webview) {
        webview = createWebview();
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
    if (('production' !== 'production')) {
        console.log(formatLog('registerPage', path, webview.id));
    }
    initWebview(webview, path, query, routeOptions.meta);
    const route = path.slice(1);
    webview.__uniapp_route = route;
    const pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, 
    // TODO theme
    'light');
    const id = parseInt(webview.id);
    createVuePage(id, route, query, pageInstance, initPageOptions(routeOptions));
    return webview;
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
        // TODO meta.navigationBar.type === 'float'
        windowTop: 0,
        // TODO tabBar.cover
        windowBottom: 0,
    };
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
    invokeHook(ON_HIDE);
    const eventChannel = new EventChannel(getWebviewId() + 1, events);
    return new Promise((resolve) => {
        showWebview(registerPage({ url, path, query, openType: 'navigateTo', eventChannel }), aniType, aniDuration, () => {
            resolve({ eventChannel });
        });
        // TODO setStatusBarStyle()
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
    if (uni.hideToast) {
        uni.hideToast();
    }
    if (uni.hideLoading) {
        uni.hideLoading();
    }
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
        // TODO setStatusBarStyle()
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
            // TODO setStatusBarStyle()
            resolve(undefined);
        }
        else {
            showWebview(registerPage({
                url,
                path,
                query,
                openType: 'switchTab',
            }), 'none', 0, () => {
                // TODO setStatusBarStyle()
                resolve(undefined);
            }, 70);
        }
    });
}

// export * from './media/chooseImage'
// export * from './media/chooseVideo'
// export * from './media/getImageInfo'
// export * from './media/getVideoInfo'
// export * from './network/request'
// export * from './network/uploadFile'
// export * from './network/downloadFile'

var uni$1 = {
  __proto__: null,
  getLocale: getLocale,
  getSystemInfoSync: getSystemInfoSync,
  hideTabBar: hideTabBar,
  hideTabBarRedDot: hideTabBarRedDot,
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  onLocaleChange: onLocaleChange,
  removeTabBarBadge: removeTabBarBadge,
  setLocale: setLocale,
  setTabBarBadge: setTabBarBadge,
  setTabBarItem: setTabBarItem,
  setTabBarStyle: setTabBarStyle,
  showTabBar: showTabBar,
  showTabBarRedDot: showTabBarRedDot,
  switchTab: switchTab
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
        const webview = plus.webview.getWebviewById(idStr);
        const code = evalJSCode.replace('__PAGE_ID__', idStr);
        webview && webview.evalJS(code);
    });
}

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

function subscribePlusMessage({ data, }) {
    if (('production' !== 'production')) {
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

let isLaunchWebviewReady = false; // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady
function subscribeWebviewReady(_data, pageId) {
    const isLaunchWebview = pageId === '1';
    if (isLaunchWebview && isLaunchWebviewReady) {
        if (('production' !== 'production')) {
            console.log('[uni-app] onLaunchWebviewReady.prevent');
        }
        return;
    }
    let preloadWebview = getPreloadWebview();
    if (isLaunchWebview) {
        // 首页
        isLaunchWebviewReady = true;
        preloadWebview = setPreloadWebview(plus.webview.getLaunchWebview());
    }
    else if (!preloadWebview) {
        // preloadWebview 不存在，重新加载一下
        preloadWebview = setPreloadWebview(plus.webview.getWebviewById(pageId));
    }
    // 仅当 preloadWebview 未 loaded 时处理
    if (!preloadWebview.loaded) {
        if (preloadWebview.id !== pageId) {
            return console.error(`webviewReady[${preloadWebview.id}][${pageId}] not match`);
        }
        preloadWebview.loaded = true; // 标记已 ready
    }
    UniServiceJSBridge.emit(ON_WEBVIEW_READY + '.' + pageId);
    isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
    // TODO closeSplashscreen
    const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
    const routeOptions = getRouteOptions(entryPagePath);
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

function initGlobalEvent() {
    const plusGlobalEvent = plus.globalEvent;
    const { emit } = UniServiceJSBridge;
    plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener);
    plusGlobalEvent.addEventListener('pause', () => {
        emit(ON_APP_ENTER_BACKGROUND);
    });
    plusGlobalEvent.addEventListener('resume', () => {
        // TODO options
        emit(ON_APP_ENTER_FOREGROUND, {});
    });
    // TODO KeyboardHeightChange
    plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage);
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
    initTabBar();
    initGlobalEvent();
    initSubscribeHandlers();
    initAppLaunch(appVm);
    // TODO clearTempFile
    __uniConfig.ready = true;
}

const __uniConfig$1 = globalThis.__uniConfig;
// @ts-expect-error TODO 处理类型冲突
const UniError = globalThis.UniError;
// @ts-expect-error TODO 处理类型冲突
const UTSJSONObject = globalThis.UTSJSONObject;

var index = {
    uni: uni$1,
    getApp: getApp$1,
    getCurrentPages: getCurrentPages$1,
    __definePage: definePage,
    __registerApp: registerApp,
    UniServiceJSBridge: UniServiceJSBridge$1,
};

export { Emitter, UTSJSONObject, UniError, __uniConfig$1 as __uniConfig, index as default, defineAsyncApi, extend, getRealPath, hasOwn$1 as hasOwn, isArray, isFunction, isPlainObject, isString };
