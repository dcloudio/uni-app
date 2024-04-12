import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import promptAction from '@ohos.promptAction';

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
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const LINEFEED = '\n';

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
function wrapperAsyncApi(name, fn, protocol, options) {
    return wrapperTaskApi(name, fn, protocol, options);
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

globalThis.uni = uni$1;

export { uni$1 as uni };
