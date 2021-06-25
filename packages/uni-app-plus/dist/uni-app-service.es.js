export function createServiceContext(Vue, weex, plus,instanceContext){
const setTimeout = instanceContext.setTimeout;
const clearTimeout = instanceContext.clearTimeout;
const setInterval = instanceContext.setInterval;
const clearInterval = instanceContext.clearInterval;
const __uniConfig = instanceContext.__uniConfig;
const __uniRoutes = instanceContext.__uniRoutes;

var serviceContext = (function () {
  'use strict';

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

  function encode$3(arraybuffer) {
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

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */
  function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(',');
      for (let i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
  }
  (process.env.NODE_ENV !== 'production')
      ? Object.freeze({})
      : {};
  (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
  const extend = Object.assign;
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isObject$1 = (val) => val !== null && typeof val === 'object';
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
      // extract "RawType" from strings like "[object RawType]"
      return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  const cacheStringFunction$1 = (fn) => {
      const cache = Object.create(null);
      return ((str) => {
          const hit = cache[str];
          return hit || (cache[str] = fn(str));
      });
  };
  /**
   * @private
   */
  const capitalize = cacheStringFunction$1((str) => str.charAt(0).toUpperCase() + str.slice(1));

  const HTTP_METHODS = [
      'GET',
      'OPTIONS',
      'HEAD',
      'POST',
      'PUT',
      'DELETE',
      'TRACE',
      'CONNECT',
  ];
  function elemInArray(str, arr) {
      if (!str || arr.indexOf(str) === -1) {
          return arr[0];
      }
      return str;
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

  const callbacks$3 = [API_SUCCESS, API_FAIL, API_COMPLETE];
  function hasCallback(args) {
      if (isPlainObject(args) &&
          callbacks$3.find((cb) => isFunction(args[cb]))) {
          return true;
      }
      return false;
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
  function promisify(fn) {
      return (args = {}) => {
          if (hasCallback(args)) {
              return fn(args);
          }
          return handlePromise(new Promise((resolve, reject) => {
              fn(extend(args, { success: resolve, fail: reject }));
          }));
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
      return invokeCallback(id, extend(res || {}, { errMsg: name + ':ok' }));
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
  function wrapperTaskApi(name, fn, protocol, options) {
      return (args) => {
          const id = createAsyncApiCallback(name, args, options);
          const errMsg = beforeInvokeApi(name, [args], protocol, options);
          if (errMsg) {
              return invokeFail(id, name, errMsg);
          }
          return fn(args, {
              resolve: (res) => invokeSuccess(id, name, res),
              reject: (errMsg, errRes) => invokeFail(id, name, errMsg, errRes),
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
  function defineTaskApi(name, fn, protocol, options) {
      return promisify(wrapperTaskApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
  }
  function defineSyncApi(name, fn, protocol, options) {
      return wrapperSyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options);
  }
  function defineAsyncApi(name, fn, protocol, options) {
      return promisify(wrapperAsyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
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
      return encode$3(arrayBuffer);
  }, ArrayBufferToBase64Protocol);

  const cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return ((str) => {
          const hit = cache[str];
          return hit || (cache[str] = fn(str));
      });
  };
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
  function callOptions(options, data) {
      options = options || {};
      if (typeof data === 'string') {
          data = {
              errMsg: data,
          };
      }
      if (/:ok$/.test(data.errMsg)) {
          if (typeof options.success === 'function') {
              options.success(data);
          }
      }
      else {
          if (typeof options.fail === 'function') {
              options.fail(data);
          }
      }
      if (typeof options.complete === 'function') {
          options.complete(data);
      }
  }

  const encode$2 = encodeURIComponent;
  function stringifyQuery$1(obj, encodeStr = encode$2) {
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
  const TABBAR_HEIGHT = 50;
  const PRIMARY_COLOR = '#007aff';
  const BACKGROUND_COLOR = '#f7f7f7'; // 背景色，如标题栏默认背景色
  const SCHEME_RE = /^([a-z-]+:)?\/\//i;
  const DATA_RE = /^data:.*,.*/;
  const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE';

  const isObject = (val) => val !== null && typeof val === 'object';
  class BaseFormatter {
      constructor() {
          this._caches = Object.create(null);
      }
      interpolate(message, values) {
          if (!values) {
              return [message];
          }
          let tokens = this._caches[message];
          if (!tokens) {
              tokens = parse(message);
              this._caches[message] = tokens;
          }
          return compile(tokens, values);
      }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format) {
      const tokens = [];
      let position = 0;
      let text = '';
      while (position < format.length) {
          let char = format[position++];
          if (char === '{') {
              if (text) {
                  tokens.push({ type: 'text', value: text });
              }
              text = '';
              let sub = '';
              char = format[position++];
              while (char !== undefined && char !== '}') {
                  sub += char;
                  char = format[position++];
              }
              const isClosed = char === '}';
              const type = RE_TOKEN_LIST_VALUE.test(sub)
                  ? 'list'
                  : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                      ? 'named'
                      : 'unknown';
              tokens.push({ value: sub, type });
          }
          else if (char === '%') {
              // when found rails i18n syntax, skip text capture
              if (format[position] !== '{') {
                  text += char;
              }
          }
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
      if (messages[locale]) {
          return locale;
      }
      locale = locale.toLowerCase();
      if (locale.indexOf('zh') === 0) {
          if (locale.indexOf('-hans') !== -1) {
              return LOCALE_ZH_HANS;
          }
          if (locale.indexOf('-hant') !== -1) {
              return LOCALE_ZH_HANT;
          }
          if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
              return LOCALE_ZH_HANT;
          }
          return LOCALE_ZH_HANS;
      }
      const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
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
          this.setLocale(locale);
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
          this.watchers.forEach((watcher) => {
              watcher(this.locale, oldLocale);
          });
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
      add(locale, message) {
          if (this.messages[locale]) {
              Object.assign(this.messages[locale], message);
          }
          else {
              this.messages[locale] = message;
          }
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

  function initLocaleWatcher(appVm, i18n) {
      appVm.$i18n &&
          appVm.$i18n.vm.$watch('locale', (newLocale) => {
              i18n.setLocale(newLocale);
          }, {
              immediate: true,
          });
  }
  // function getDefaultLocale() {
  //   if (typeof navigator !== 'undefined') {
  //     return (navigator as any).userLanguage || navigator.language
  //   }
  //   if (typeof plus !== 'undefined') {
  //     // TODO 待调整为最新的获取语言代码
  //     return plus.os.language
  //   }
  //   return uni.getSystemInfoSync().language
  // }
  function initVueI18n(locale = LOCALE_EN, messages = {}, fallbackLocale = LOCALE_EN) {
      // 兼容旧版本入参
      if (typeof locale !== 'string') {
          [locale, messages] = [messages, locale];
      }
      if (typeof locale !== 'string') {
          locale = fallbackLocale;
      }
      const i18n = new I18n({
          locale: locale || fallbackLocale,
          fallbackLocale,
          messages,
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
              const appVm = getApp().$vm;
              if (!appVm.$t || !appVm.$i18n) {
                  // if (!locale) {
                  //   i18n.setLocale(getDefaultLocale())
                  // }
                  /* eslint-disable no-func-assign */
                  t = function (key, values) {
                      return i18n.t(key, values);
                  };
              }
              else {
                  initLocaleWatcher(appVm, i18n);
                  /* eslint-disable no-func-assign */
                  t = function (key, values) {
                      const $i18n = appVm.$i18n;
                      const silentTranslationWarn = $i18n.silentTranslationWarn;
                      $i18n.silentTranslationWarn = true;
                      const msg = appVm.$t(key, values);
                      $i18n.silentTranslationWarn = silentTranslationWarn;
                      if (msg !== key) {
                          return msg;
                      }
                      return i18n.t(key, $i18n.locale, values);
                  };
              }
          }
          return t(key, values);
      };
      return {
          i18n,
          t(key, values) {
              return t(key, values);
          },
          add(locale, message) {
              return i18n.add(locale, message);
          },
          getLocale() {
              return i18n.getLocale();
          },
          setLocale(newLocale) {
              return i18n.setLocale(newLocale);
          },
      };
  }

  let i18n;
  function useI18n() {
      if (!i18n) {
          let language;
          {
              {
                  language = navigator.language;
              }
          }
          i18n = initVueI18n(language);
      }
      return i18n;
  }

  // This file is created by scripts/i18n.js
  function normalizeMessages(namespace, messages) {
      return Object.keys(messages).reduce((res, name) => {
          res[namespace + name] = messages[name];
          return res;
      }, {});
  }
  const initI18nShowActionSheetMsgsOnce = /*#__PURE__*/ once(() => {
      const name = 'uni.showActionSheet.';
      if (__UNI_FEATURE_I18N_EN__) {
          useI18n().add(LOCALE_EN, normalizeMessages(name, { cancel: 'Cancel' }));
      }
      if (__UNI_FEATURE_I18N_ES__) {
          useI18n().add(LOCALE_ES, normalizeMessages(name, { cancel: 'Cancelar' }));
      }
      if (__UNI_FEATURE_I18N_FR__) {
          useI18n().add(LOCALE_FR, normalizeMessages(name, { cancel: 'Annuler' }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANS__) {
          useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, { cancel: '取消' }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANT__) {
          useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, { cancel: '取消' }));
      }
  });
  const initI18nShowModalMsgsOnce = /*#__PURE__*/ once(() => {
      const name = 'uni.showModal.';
      if (__UNI_FEATURE_I18N_EN__) {
          useI18n().add(LOCALE_EN, normalizeMessages(name, { cancel: 'Cancel', confirm: 'OK' }));
      }
      if (__UNI_FEATURE_I18N_ES__) {
          useI18n().add(LOCALE_ES, normalizeMessages(name, { cancel: 'Cancelar', confirm: 'OK' }));
      }
      if (__UNI_FEATURE_I18N_FR__) {
          useI18n().add(LOCALE_FR, normalizeMessages(name, { cancel: 'Annuler', confirm: 'OK' }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANS__) {
          useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, { cancel: '取消', confirm: '确定' }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANT__) {
          useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, { cancel: '取消', confirm: '確定' }));
      }
  });
  const initI18nChooseImageMsgsOnce = /*#__PURE__*/ once(() => {
      const name = 'uni.chooseImage.';
      if (__UNI_FEATURE_I18N_EN__) {
          useI18n().add(LOCALE_EN, normalizeMessages(name, {
              cancel: 'Cancel',
              'sourceType.album': 'Album',
              'sourceType.camera': 'Camera',
          }));
      }
      if (__UNI_FEATURE_I18N_ES__) {
          useI18n().add(LOCALE_ES, normalizeMessages(name, {
              cancel: 'Cancelar',
              'sourceType.album': 'Álbum',
              'sourceType.camera': 'Cámara',
          }));
      }
      if (__UNI_FEATURE_I18N_FR__) {
          useI18n().add(LOCALE_FR, normalizeMessages(name, {
              cancel: 'Annuler',
              'sourceType.album': 'Album',
              'sourceType.camera': 'Caméra',
          }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANS__) {
          useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, {
              cancel: '取消',
              'sourceType.album': '从相册选择',
              'sourceType.camera': '拍摄',
          }));
      }
      if (__UNI_FEATURE_I18N_ZH_HANT__) {
          useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, {
              cancel: '取消',
              'sourceType.album': '從相冊選擇',
              'sourceType.camera': '拍攝',
          }));
      }
  });

  function hasRpx(str) {
      return str.indexOf('rpx') !== -1 || str.indexOf('upx') !== -1;
  }
  function rpx2px(str, replace = false) {
      if (replace) {
          return rpx2pxWithReplace(str);
      }
      if (typeof str === 'string') {
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

  const PAGE_META_KEYS = ['navigationBar', 'pullToRefresh'];
  function initGlobalStyle() {
      return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
  }
  function mergePageMeta(id, pageMeta) {
      const globalStyle = initGlobalStyle();
      const res = extend({ id }, globalStyle, pageMeta);
      PAGE_META_KEYS.forEach((name) => {
          res[name] = extend({}, globalStyle[name], pageMeta[name]);
      });
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

  function getRealRoute(fromRoute, toRoute) {
      if (toRoute.indexOf('/') === 0) {
          return toRoute;
      }
      if (toRoute.indexOf('./') === 0) {
          return getRealRoute(fromRoute, toRoute.substr(2));
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
      return '/' + fromRouteArray.concat(toRouteArray).join('/');
  }

  function getCurrentPage() {
      const pages = getCurrentPages();
      const len = pages.length;
      if (len) {
          return pages[len - 1];
      }
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
              return wwwPath + getRealRoute('/' + __id__, filepath);
          }
          else {
              const pages = getCurrentPages();
              if (pages.length) {
                  return (wwwPath + getRealRoute('/' + pages[pages.length - 1].route, filepath));
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

  const API_CREATE_INNER_AUDIO_CONTEXT = 'createInnerAudioContext';

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

  const API_GET_BACKGROUND_AUDIO_MANAGER = 'getBackgroundAudioManager';

  const API_MAKE_PHONE_CALL = 'makePhoneCall';
  const MakePhoneCallProtocol = {
      phoneNumber: String,
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

  const API_GET_LOCATION = 'getLocation';
  const coordTypes = ['WGS84', 'GCJ02'];
  const GetLocationOptions = {
      formatArgs: {
          type(value, params) {
              value = (value || '').toUpperCase();
              if (coordTypes.indexOf(value) === -1) {
                  params.type = coordTypes[0];
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
              params.urls = urls.map((url) => typeof url === 'string' && url ? getRealPath(url) : '');
          },
          current(current, params) {
              if (typeof current === 'number') {
                  params.current =
                      current > 0 && current < params.urls.length ? current : 0;
              }
              else if (typeof current === 'string' && current) {
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
              if (typeof protocols === 'string') {
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

  const API_HIDE_LOADING = 'hideLoading';

  const API_HIDE_TOAST = 'hideToast';

  const API_SHOW_ACTION_SHEET = 'showActionSheet';
  const ShowActionSheetProtocol = {
      itemList: {
          type: Array,
          required: true,
      },
      title: String,
      alertText: String,
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
          showCancel: true,
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

  const API_GET_PROVIDER = 'getProvider';
  const GetProviderProtocol = {
      service: {
          type: String,
          required: true,
      },
  };

  function warpPlusSuccessCallback(resolve, after) {
      return function successCallback(data) {
          delete data.code;
          delete data.message;
          if (typeof after === 'function') {
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
          object(extend({}, typeof before === 'function' ? before(options) : options, {
              success: warpPlusSuccessCallback(resolve, after),
              fail: warpPlusErrorCallback(reject),
          }));
      };
  }
  function callApiSync(api, args, resolve, reject) {
      api(args)
          .then(() => {
          resolve();
      })
          .catch((errMsg) => {
          reject(errMsg);
      });
  }

  const STORAGE_DATA_TYPE = '__TYPE';
  const STORAGE_KEYS = 'uni-storage-keys';
  function parseValue(value) {
      const types = ['object', 'string', 'number', 'boolean', 'undefined'];
      try {
          const object = typeof value === 'string' ? JSON.parse(value) : value;
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
              storage.setItemAsync(key + STORAGE_DATA_TYPE, type);
          }
          else {
              storage.removeItemAsync(key + STORAGE_DATA_TYPE);
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
                  if (typeof object === 'string') {
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
  const getStorageSync = defineSyncApi(API_GET_STORAGE_SYNC, (key, t) => {
      const value = plus.storage.getItem(key);
      const typeOrigin = plus.storage.getItem(key + STORAGE_DATA_TYPE) || '';
      const type = typeOrigin.toLowerCase();
      if (typeof value !== 'string') {
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
      plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE);
      plus.storage.removeItemAsync(key, resolve, warpPlusErrorCallback(reject));
  }, RemoveStorageProtocol);
  const clearStorageSync = (defineSyncApi('clearStorageSync', () => {
      plus.storage.clear();
  }));
  const clearStorage = (defineAsyncApi('clearStorage', (_, { resolve, reject }) => {
      plus.storage.clearAsync(resolve, warpPlusErrorCallback(reject));
  }));
  const getStorageInfoSync = (defineSyncApi('getStorageInfoSync', () => {
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
  }));
  const getStorageInfo = (defineAsyncApi('getStorageInfo', (_, { resolve }) => {
      resolve(getStorageInfoSync());
  }));

  const getFileInfo = defineAsyncApi(API_GET_FILE_INFO, (options, { resolve, reject }) => {
      plus.io.getFileInfo(extend(options, {
          success: warpPlusSuccessCallback(resolve),
          fail: warpPlusErrorCallback(reject),
      }));
  }, GetFileInfoProtocol, GetFileInfoOptions);

  const openDocument = defineAsyncApi(API_OPEN_DOCUMENT, ({ filePath, fileType }, { resolve, reject }) => {
      plus.io.resolveLocalFileSystemURL(getRealPath(filePath), (entry) => {
          plus.runtime.openFile(getRealPath(filePath));
          resolve();
      }, (err) => {
          reject('openDocument:fail ' + err.message);
      });
  }, OpenDocumentProtocol, OpenDocumentOptions);

  const DEVICE_FREQUENCY = 200;
  const TEMP_PATH_BASE = '_doc/uniapp_temp';
  const TEMP_PATH = `${TEMP_PATH_BASE}_${Date.now()}`;

  let listener$1 = null;
  const onCompassChange = (defineOnApi(API_ON_COMPASS, () => {
      startCompass();
  }));
  const offCompassChange = (defineOnApi(API_OFF_COMPASS, () => {
      stopCompass();
  }));
  const startCompass = (defineAsyncApi(API_START_COMPASS, (_, { resolve, reject }) => {
      if (!listener$1) {
          plus.orientation.watchOrientation((res) => {
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
  }));
  const stopCompass = (defineAsyncApi(API_STOP_COMPASS, (_, { resolve }) => {
      if (listener$1) {
          plus.orientation.clearWatch(listener$1);
          listener$1 = null;
      }
      resolve();
  }));

  const vibrateShort = defineAsyncApi(API_VIBRATE_SHORT, (_, { resolve }) => {
      plus.device.vibrate(15);
      resolve();
  });
  const vibrateLong = defineAsyncApi(API_VIBRATE_LONG, (_, { resolve }) => {
      plus.device.vibrate(400);
      resolve();
  });

  let listener = null;
  const onAccelerometerChange = (defineOnApi(API_ON_ACCELEROMETER, () => {
      startAccelerometer();
  }));
  const offAccelerometerChange = (defineOnApi(API_OFF_ACCELEROMETER, () => {
      stopAccelerometer();
  }));
  const startAccelerometer = (defineAsyncApi(API_START_ACCELEROMETER, (_, { resolve, reject }) => {
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
  }));
  const stopAccelerometer = (defineAsyncApi(API_STOP_ACCELEROMETER, (_, { resolve }) => {
      if (listener) {
          plus.accelerometer.clearWatch(listener);
          listener = null;
      }
      resolve();
  }));

  const onBluetoothDeviceFound = defineOnApi(API_ON_BLUETOOTH_DEVICE_FOUND, warpPlusEvent(() => plus.bluetooth.onBluetoothDeviceFound, API_ON_BLUETOOTH_DEVICE_FOUND));
  const onBluetoothAdapterStateChange = defineOnApi(API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBluetoothAdapterStateChange, API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE));
  const onBLEConnectionStateChange = defineOnApi(API_ON_BLE_CONNECTION_STATE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBLEConnectionStateChange, API_ON_BLE_CONNECTION_STATE_CHANGE));
  const onBLECharacteristicValueChange = defineOnApi(API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE, warpPlusEvent(() => plus.bluetooth.onBLECharacteristicValueChange, API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE));
  const openBluetoothAdapter = defineAsyncApi('openBluetoothAdapter', warpPlusMethod(() => plus.bluetooth.openBluetoothAdapter));
  const closeBluetoothAdapter = defineAsyncApi('closeBluetoothAdapter', warpPlusMethod(() => plus.bluetooth.closeBluetoothAdapter));
  const getBluetoothAdapterState = defineAsyncApi('getBluetoothAdapterState', warpPlusMethod(() => plus.bluetooth.getBluetoothAdapterState));
  const startBluetoothDevicesDiscovery = defineAsyncApi(API_START_BLUETOOTH_DEVICES_DISCOVERY, warpPlusMethod(() => plus.bluetooth.startBluetoothDevicesDiscovery), StartBluetoothDevicesDiscoveryProtocol);
  const stopBluetoothDevicesDiscovery = defineAsyncApi('stopBluetoothDevicesDiscovery', warpPlusMethod(() => plus.bluetooth.stopBluetoothDevicesDiscovery));
  const getBluetoothDevices = defineAsyncApi('getBluetoothDevices', warpPlusMethod(() => plus.bluetooth.getBluetoothDevices));
  const getConnectedBluetoothDevices = defineAsyncApi(API_GET_CONNECTED_BLUETOOTH_DEVICES, warpPlusMethod(() => plus.bluetooth.getConnectedBluetoothDevices), GetConnectedBluetoothDevicesProtocol);
  const createBLEConnection = defineAsyncApi(API_CREATE_BLE_CONNECTION, warpPlusMethod(() => plus.bluetooth.createBLEConnection), CreateBLEConnectionProtocol);
  const closeBLEConnection = defineAsyncApi(API_CLOSE_BLE_CONNECTION, warpPlusMethod(() => plus.bluetooth.closeBLEConnection), CloseBLEConnectionProtocol);
  const getBLEDeviceServices = defineAsyncApi(API_GET_BLE_DEVICE_SERVICES, warpPlusMethod(() => plus.bluetooth.getBLEDeviceServices), GetBLEDeviceServicesProtocol);
  const getBLEDeviceCharacteristics = defineAsyncApi(API_GET_BLE_DEVICE_CHARACTERISTICS, warpPlusMethod(() => plus.bluetooth.getBLEDeviceCharacteristics), GetBLEDeviceCharacteristicsProtocol);
  const notifyBLECharacteristicValueChange = defineAsyncApi(API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE, warpPlusMethod(() => plus.bluetooth.notifyBLECharacteristicValueChange), NotifyBLECharacteristicValueChangeProtocol);
  const readBLECharacteristicValue = defineAsyncApi(API_READ_BLE_CHARACTERISTIC_VALUE, warpPlusMethod(() => plus.bluetooth.readBLECharacteristicValue), ReadBLECharacteristicValueProtocol);
  const writeBLECharacteristicValue = defineAsyncApi(API_WRITE_BLE_CHARACTERISTIC_VALUE, warpPlusMethod(() => plus.bluetooth.writeBLECharacteristicValue), WriteBLECharacteristicValueProtocol);
  const setBLEMTU = defineAsyncApi(API_SET_BLE_MTU, warpPlusMethod(() => plus.bluetooth.setBLEMTU), SetBLEMTUProtocol);
  const getBLEDeviceRSSI = defineAsyncApi(API_GET_BLE_DEVICE_RSSI, warpPlusMethod(() => plus.bluetooth.getBLEDeviceRSSI), GetBLEDeviceRSSIProtocol);

  const onBeaconUpdate = defineOnApi(API_ON_BEACON_UPDATE, warpPlusEvent(() => plus.ibeacon.onBeaconUpdate, API_ON_BEACON_UPDATE));
  const onBeaconServiceChange = defineOnApi(API_ON_BEACON_SERVICE_CHANGE, warpPlusEvent(() => plus.ibeacon.onBeaconServiceChange, API_ON_BEACON_SERVICE_CHANGE));
  const getBeacons = defineAsyncApi(API_GET_BEACONS, warpPlusMethod(() => plus.ibeacon.getBeacons));
  const startBeaconDiscovery = defineAsyncApi(API_START_BEACON_DISCOVERY, warpPlusMethod(() => plus.ibeacon.startBeaconDiscovery), StartBeaconDiscoveryProtocol);
  const stopBeaconDiscovery = defineAsyncApi(API_STOP_BEACON_DISCOVERY, warpPlusMethod(() => plus.ibeacon.stopBeaconDiscovery));

  const makePhoneCall = defineAsyncApi(API_MAKE_PHONE_CALL, ({ phoneNumber }, { resolve }) => {
      plus.device.dial(phoneNumber);
      return resolve();
  }, MakePhoneCallProtocol);

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
          success: (data) => {
              return {
                  orientation: data.orientation,
                  type: data.type,
                  duration: data.duration,
                  size: data.size,
                  height: data.height,
                  width: data.width,
                  fps: data.fps || 30,
                  bitrate: data.bitrate,
              };
          },
          fail: warpPlusErrorCallback(reject),
      });
  }, GetVideoInfoProtocol, GetVideoInfoOptions);

  const previewImage = defineAsyncApi(API_PREVIEW_IMAGE, ({ current = 0, indicator = 'number', loop = false, urls, longPressActions }, { resolve, reject }) => {
      initI18nChooseImageMsgsOnce();
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
                          typeof longPressActions.success === 'function' &&
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
                      typeof longPressActions.fail === 'function' &&
                          longPressActions.fail({
                              errMsg: 'showActionSheet:fail cancel',
                          });
                  }
              });
          },
      });
      resolve();
  }, PreviewImageProtocol, PreviewImageOptions);

  let recorder;
  let recording = false;
  let recordTimeout;
  const publishRecorderStateChange = (state, res = {}) => {
      onRecorderStateChange(extend({
          state,
      }, res));
  };
  const Recorder = {
      start({ duration = 60000, sampleRate, numberOfChannels, encodeBitRate, format = 'mp3', frameSize, }) {
          if (recording) {
              return publishRecorderStateChange('start');
          }
          recorder = plus.audio.getRecorder();
          recorder.record({
              format,
              samplerate: String(sampleRate),
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
      if (state && typeof callbacks$2[state] === 'function') {
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
      start(options) {
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

  const showKeyboard = defineAsyncApi(API_SHOW_KEYBOARD, (_, { resolve }) => {
      plus.key.showSoftKeybord();
      resolve();
  });
  const hideKeyboard = defineAsyncApi(API_HIDE_KEYBOARD, (_, { resolve }) => {
      plus.key.hideSoftKeybord();
      resolve();
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
          if (typeof callback !== 'function') {
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

  function requireNativePlugin(pluginName) {
      /* eslint-disable no-undef */
      if (typeof weex !== 'undefined') {
          return weex.requireModule(pluginName);
      }
      /* eslint-disable no-undef */
      return __requireNativePlugin__(pluginName);
  }

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
      if (typeof res.data === 'string' && res.data.charCodeAt(0) === 65279) {
          res.data = res.data.substr(1);
      }
      res.statusCode = parseInt(String(res.statusCode), 10);
      if (isPlainObject(res.header)) {
          res.header = Object.keys(res.header).reduce(function (ret, key) {
              const value = res.header[key];
              if (Array.isArray(value)) {
                  ret[key] = value.join(',');
              }
              else if (typeof value === 'string') {
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
      // NOTE 属性有但是types没有
      // @ts-ignore
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
                  typeof data !== 'string' &&
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
          // weex 官方文档有误，headers 类型实际 object，用 string 类型会无响应
          headers,
          type: responseType === 'arraybuffer' ? 'base64' : 'text',
          // weex 官方文档未说明实际支持 timeout，单位：ms
          timeout: timeout || 6e5,
          // 配置和weex模块内相反
          sslVerify: !sslVerify,
          firstIpv4: firstIpv4,
          tls,
      };
      if (method !== 'GET') {
          options.body = typeof data === 'string' ? data : JSON.stringify(data);
      }
      stream.fetch(options, ({ ok, status, data, headers, errorMsg, }) => {
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
      });
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

  const socketTasks = [];
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
          }
          socket.WebSocket({
              id: socketId,
              url: args.url,
              protocol: Array.isArray(args.protocols)
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
          this._socket.onopen(() => {
              this.readyState = this.OPEN;
              this.socketStateChange('open');
          });
          this._socket.onmessage((e) => {
              this.socketStateChange('message', {
                  data: typeof e.data === 'object'
                      ? base64ToArrayBuffer(e.data.base64)
                      : e.data,
              });
          });
          this._socket.onerror(() => {
              this.onErrorOrClose();
              this.socketStateChange('error');
          });
          this._socket.onclose(() => {
              this.onErrorOrClose();
              this.socketStateChange('close');
          });
          const oldSocketSend = this._socket.send;
          const oldSocketClose = this._socket.close;
          this._socket.send = (res) => {
              oldSocketSend(extend({
                  id: this.id,
                  data: typeof res.data === 'object'
                      ? {
                          '@type': 'binary',
                          base64: arrayBufferToBase64(res.data),
                      }
                      : res.data,
              }));
          };
          this._socket.close = (res) => {
              oldSocketClose(extend({
                  id: this.id,
                  res,
              }));
          };
      }
      onErrorOrClose() {
          this.readyState = this.CLOSED;
          const index = socketTasks.indexOf(this);
          if (index >= 0) {
              socketTasks.splice(index, 1);
          }
      }
      socketStateChange(name, res = {}) {
          if (this === socketTasks[0] && globalEvent[name]) {
              UniServiceJSBridge.invokeOnCallback(globalEvent[name], res);
          }
          // WYQ fix: App平台修复websocket onOpen时发送数据报错的Bug
          this._callbacks[name].forEach((callback) => {
              if (typeof callback === 'function') {
                  callback(name === 'message' ? res : {});
              }
          });
      }
      send(args) {
          if (this.readyState !== this.OPEN) {
              callOptions(args, 'sendSocketMessage:fail WebSocket is not connected');
          }
          try {
              this._socket.send({
                  data: args.data,
              });
              callOptions(args, 'sendSocketMessage:ok');
          }
          catch (error) {
              callOptions(args, `sendSocketMessage:fail ${error}`);
          }
      }
      close(args) {
          this.readyState = this.CLOSING;
          try {
              this._socket.close(args);
              callOptions(args, 'closeSocket:ok');
          }
          catch (error) {
              callOptions(args, `closeSocket:fail ${error}`);
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
      }
      setTimeout(() => {
          resolve();
      }, 0);
      return socketTask;
  }, ConnectSocketProtocol, ConnectSocketOptions);
  const sendSocketMessage = defineAsyncApi(API_SEND_SOCKET_MESSAGE, (args, { resolve, reject }) => {
      const socketTask = socketTasks[0];
      if (!socketTask || socketTask.readyState !== socketTask.OPEN) {
          reject('sendSocketMessage:fail WebSocket is not connected');
          return;
      }
      socketTask._socket.send({
          data: args.data,
      });
      resolve();
  }, SendSocketMessageProtocol);
  const closeSocket = defineAsyncApi(API_CLOSE_SOCKET, (args, { resolve, reject }) => {
      const socketTask = socketTasks[0];
      if (!socketTask) {
          reject('closeSocket:fail WebSocket is not connected');
          return;
      }
      socketTask.readyState = socketTask.CLOSING;
      const { code, reason } = args;
      socketTask._socket.close({ code, reason });
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
      const audio = (audios[audioId] = plus.audio.createPlayer());
      audio.src = '';
      audio.volume = 1;
      audio.startTime = 0;
      return {
          errMsg: 'createAudioInstance:ok',
          audioId,
      };
  }
  function setAudioState({ audioId, src, startTime, autoplay = false, loop = false, obeyMuteSwitch, volume, }) {
      const audio = audios[audioId];
      if (audio) {
          const style = {
              loop,
              autoplay,
          };
          if (src) {
              audio.src = style.src = getRealPath(src);
          }
          if (startTime) {
              audio.startTime = style.startTime = startTime;
          }
          if (typeof volume === 'number') {
              audio.volume = style.volume = volume;
          }
          audio.setStyles(style);
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
              audio.__timing = setInterval(() => {
                  const currentTime = audio.currentTime;
                  if (currentTime !== oldCurrentTime) {
                      emit(audio, 'timeupdate');
                  }
              }, 200);
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
              if (typeof callback === 'function') {
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
      const name = `on${state[0].toUpperCase() + state.substr(1)}`;
      audio._callbacks[name].forEach((callback) => {
          if (typeof callback === 'function') {
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
              const eventName = `onMusic${event[0].toUpperCase() + event.substr(1)}`;
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
      // @ts-ignore
      audio.addEventListener('prev', () => publish('onBackgroundAudioPrev'));
      // @ts-ignore
      audio.addEventListener('next', () => publish('onBackgroundAudioNext'));
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
  function setMusicState(args) {
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
          if (typeof callback === 'function') {
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
          const name = item[0].toUpperCase() + item.substr(1);
          BackgroundAudioManager.prototype[`on${name}`] = function (callback) {
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
                          setMusicState(this._options);
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
          if (process.env.NODE_ENV !== 'production') {
              console.log(`UNIAPP[location]:before[${position.coordsType}][lng:${coords.longitude},lat:${coords.latitude}]`);
          }
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
              if (process.env.NODE_ENV !== 'production') {
                  console.log(`UNIAPP[location]:after[${type}][lng:${coords.longitude},lat:${coords.latitude}]`);
              }
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
  const getLocation = defineAsyncApi(API_GET_LOCATION, ({ type = 'wgs84', geocode = false, altitude = false }, { resolve, reject }) => {
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
          enableHighAccuracy: altitude,
      });
  }, GetLocationProtocol, GetLocationOptions);

  const showModal = defineAsyncApi(API_SHOW_MODAL, ({ title = '', content = '', showCancel = true, cancelText, cancelColor, confirmText, confirmColor, } = {}, { resolve }) => {
      content = content || ' ';
      plus.nativeUI.confirm(content, (e) => {
          if (showCancel) {
              resolve({
                  confirm: e.index === 1,
                  cancel: e.index === 0 || e.index === -1,
              });
          }
          else {
              resolve({
                  confirm: e.index === 0,
                  cancel: false,
              });
          }
      }, title, showCancel ? [cancelText, confirmText] : [confirmText]);
  }, ShowModalProtocol, ShowModalOptions);

  const showActionSheet = defineAsyncApi(API_SHOW_ACTION_SHEET, ({ itemList = [], itemColor = '#000000', title = '', alertText = '', popover, }, { resolve, reject }) => {
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
      if (title || alertText) {
          options.title = alertText || title;
      }
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
  const showLoading = defineAsyncApi(API_SHOW_LOADING, (args, { resolve, reject }) => {
      callApiSync(showToast, extend({}, args, {
          type: 'loading',
      }), resolve, reject);
  }, ShowLoadingProtocol, ShowLoadingOptions);
  const hideLoading = defineAsyncApi(API_HIDE_LOADING, (_, { resolve, reject }) => {
      callApiSync(hide, 'loading', resolve, reject);
  });
  const showToast = defineAsyncApi(API_SHOW_TOAST, ({ title = '', icon = 'success', image = '', duration = 1500, mask = false, position, 
  // @ts-ignore ToastType
  type = 'toast', 
  // @ts-ignore PlusNativeUIWaitingStyles
  style, }, { resolve, reject }) => {
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
              size: '16px',
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
      timeout = setTimeout(() => {
          hide('');
      }, duration);
      return resolve();
  }, ShowToastProtocol, ShowToastOptions);
  const hideToast = defineAsyncApi(API_HIDE_TOAST, (_, { resolve, reject }) => {
      callApiSync(hide, 'toast', resolve, reject);
  });
  function hide(type = 'toast') {
      if (type && type !== toastType) {
          return;
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
      return {
          errMsg: 'hide:ok',
      };
  }

  const providers = {
      oauth(callback) {
          plus.oauth.getServices((services) => {
              services = services;
              const provider = [];
              services.forEach(({ id }) => {
                  provider.push(id);
              });
              callback(null, provider);
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
              callback(null, provider);
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
              callback(null, provider);
          }, (err) => {
              callback(err);
          });
      },
      push(callback) {
          if (typeof weex !== 'undefined' || typeof plus !== 'undefined') {
              callback(null, [plus.push.getClientInfo().id]);
          }
          else {
              callback(null, []);
          }
      },
  };
  const getProvider = defineAsyncApi(API_GET_PROVIDER, ({ service }, { resolve, reject }) => {
      if (providers[service]) {
          providers[service]((err, provider) => {
              if (err) {
                  reject(err.message);
              }
              else {
                  resolve({
                      service,
                      provider: provider,
                  });
              }
          });
      }
      else {
          reject('service not found');
      }
  }, GetProviderProtocol);

  var uni$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setStorageSync: setStorageSync,
    setStorage: setStorage,
    getStorageSync: getStorageSync,
    getStorage: getStorage,
    removeStorageSync: removeStorageSync,
    removeStorage: removeStorage,
    clearStorageSync: clearStorageSync,
    clearStorage: clearStorage,
    getStorageInfoSync: getStorageInfoSync,
    getStorageInfo: getStorageInfo,
    getFileInfo: getFileInfo,
    openDocument: openDocument,
    onCompassChange: onCompassChange,
    offCompassChange: offCompassChange,
    startCompass: startCompass,
    stopCompass: stopCompass,
    vibrateShort: vibrateShort,
    vibrateLong: vibrateLong,
    onAccelerometerChange: onAccelerometerChange,
    offAccelerometerChange: offAccelerometerChange,
    startAccelerometer: startAccelerometer,
    stopAccelerometer: stopAccelerometer,
    onBluetoothDeviceFound: onBluetoothDeviceFound,
    onBluetoothAdapterStateChange: onBluetoothAdapterStateChange,
    onBLEConnectionStateChange: onBLEConnectionStateChange,
    onBLECharacteristicValueChange: onBLECharacteristicValueChange,
    openBluetoothAdapter: openBluetoothAdapter,
    closeBluetoothAdapter: closeBluetoothAdapter,
    getBluetoothAdapterState: getBluetoothAdapterState,
    startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
    stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
    getBluetoothDevices: getBluetoothDevices,
    getConnectedBluetoothDevices: getConnectedBluetoothDevices,
    createBLEConnection: createBLEConnection,
    closeBLEConnection: closeBLEConnection,
    getBLEDeviceServices: getBLEDeviceServices,
    getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
    notifyBLECharacteristicValueChange: notifyBLECharacteristicValueChange,
    readBLECharacteristicValue: readBLECharacteristicValue,
    writeBLECharacteristicValue: writeBLECharacteristicValue,
    setBLEMTU: setBLEMTU,
    getBLEDeviceRSSI: getBLEDeviceRSSI,
    onBeaconUpdate: onBeaconUpdate,
    onBeaconServiceChange: onBeaconServiceChange,
    getBeacons: getBeacons,
    startBeaconDiscovery: startBeaconDiscovery,
    stopBeaconDiscovery: stopBeaconDiscovery,
    makePhoneCall: makePhoneCall,
    getImageInfo: getImageInfo,
    getVideoInfo: getVideoInfo,
    previewImage: previewImage,
    getRecorderManager: getRecorderManager,
    saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum,
    showKeyboard: showKeyboard,
    hideKeyboard: hideKeyboard,
    downloadFile: downloadFile,
    request: request,
    createSocketTask: createSocketTask,
    connectSocket: connectSocket,
    sendSocketMessage: sendSocketMessage,
    closeSocket: closeSocket,
    onSocketOpen: onSocketOpen,
    onSocketError: onSocketError,
    onSocketMessage: onSocketMessage,
    onSocketClose: onSocketClose,
    createInnerAudioContext: createInnerAudioContext,
    getBackgroundAudioManager: getBackgroundAudioManager,
    getLocation: getLocation,
    showModal: showModal,
    showActionSheet: showActionSheet,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showToast: showToast,
    hideToast: hideToast,
    hide: hide,
    getProvider: getProvider
  });

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
          const info = weexPlus.getRedirectInfo() || {};
          entryPagePath = info.path;
          entryPageQuery = info.query ? '?' + info.query : '';
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
      const entryRoute = '/' + entryPagePath;
      const routeOptions = __uniRoutes.find((route) => route.path === entryRoute);
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

  const isIOS = plus.os.name === 'iOS';
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
  function setTabBarBadge(type, index, text) {
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
   * 动态设置 tabBar 某一项的内容
   */
  function setTabBarItem(index, text, iconPath, selectedIconPath) {
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
      tabBar && tabBar.setTabBarItem(item);
  }
  /**
   * 动态设置 tabBar 的整体样式
   * @param {Object} style 样式
   */
  function setTabBarStyle(style) {
      tabBar && tabBar.setTabBarStyle(style);
  }
  /**
   * 隐藏 tabBar
   * @param {boolean} animation 是否需要动画效果
   */
  function hideTabBar(animation) {
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
  function showTabBar(animation) {
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
                  // publish('onTabBarMidButtonTap', {})
              });
      },
      indexOf(page) {
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
      setTabBarBadge,
      setTabBarItem,
      setTabBarStyle,
      hideTabBar,
      showTabBar,
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
      get visible() {
          return visible;
      },
      get height() {
          return ((config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) +
              plus.navigator.getSafeAreaInsets().deviceBottom);
      },
      // tabBar是否遮挡内容区域
      get cover() {
          const array = ['extralight', 'light', 'dark'];
          return isIOS && array.indexOf(config.blurEffect) >= 0;
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
              url: '/' + item.pagePath,
              openType: 'switchTab',
              from: 'tabBar',
              success() {
                  invokeHook('onTabItemTap', {
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

  const callbacks = {};
  // 简单处理 view 层与 service 层的通知系统
  /**
   * 消费 view 层通知
   */
  function consumePlusMessage(type, args) {
      // 处理 web-view 组件发送的通知
      if (type === WEB_INVOKE_APPSERVICE) {
          UniServiceJSBridge.emit('onWebInvokeAppService', args.data, args.webviewIds);
          return true;
      }
      const callback = callbacks[type];
      if (callback) {
          callback(args);
          if (!callback.keepAlive) {
              delete callbacks[type];
          }
          return true;
      }
      return false;
  }

  function backbuttonListener() {
      uni.navigateBack({
          from: 'backbutton',
      });
  }

  function initGlobalEvent() {
      const plusGlobalEvent = plus.weexGlobalEvent;
      const weexGlobalEvent = weex.requireModule('weexGlobalEvent');
      const emit = UniServiceJSBridge.emit;
      if (weex.config.preload) {
          plus.key.addEventListener('backbutton', backbuttonListener);
      }
      else {
          plusGlobalEvent.addEventListener('splashclosed', () => {
              plus.key.addEventListener('backbutton', backbuttonListener);
          });
      }
      plusGlobalEvent.addEventListener('pause', () => {
          emit('onAppEnterBackground');
      });
      plusGlobalEvent.addEventListener('resume', () => {
          emit('onAppEnterForeground');
      });
      weexGlobalEvent.addEventListener('uistylechange', function (event) {
          const args = {
              theme: event.uistyle,
          };
          emit('onThemeChange', args);
      });
      plusGlobalEvent.addEventListener('plusMessage', onPlusMessage);
      // nvue webview post message
      plusGlobalEvent.addEventListener('WebviewPostMessage', onPlusMessage);
  }
  function onPlusMessage(e) {
      if (e.data && e.data.type) {
          const type = e.data.type;
          consumePlusMessage(type, e.data.args || {});
      }
  }

  let appCtx;
  const defaultApp = {
      globalData: {},
  };
  function registerApp(appVm) {
      appCtx = appVm;
      appCtx.$vm = appVm;
      extend(appCtx, defaultApp); // 拷贝默认实现
      const { $options } = appVm;
      if ($options) {
          appCtx.globalData = extend($options.globalData || {}, appCtx.globalData);
      }
      initEntry();
      initTabBar();
      initGlobalEvent();
  }

  function initRouteOptions(path, openType) {
      // 需要序列化一遍
      const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find((route) => route.path === path)));
      if (openType === 'reLaunch' ||
          (!__uniConfig.realEntryPagePath && getCurrentPages().length === 0) // redirectTo
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
      const { backgroundColor } = routeMeta;
      if (!backgroundColor) {
          return;
      }
      if (!isColor(backgroundColor)) {
          return;
      }
      if (!webviewStyle.background) {
          webviewStyle.background = backgroundColor;
      }
      if (!webviewStyle.backgroundColorTop) {
          webviewStyle.backgroundColorTop = backgroundColor;
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
      webviewStyle.pullToRefresh = normalizePullToRefreshRpx(extend({}, plus.os.name === 'Android'
          ? defaultAndroidPullToRefresh
          : defaultPullToRefresh, routeMeta.pullToRefresh));
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
          if (name === 'backgroundColor') {
              titleNView.backgroundColor = isColor(value)
                  ? value
                  : BACKGROUND_COLOR;
          }
          else if (name === 'titleImage' && value) {
              titleNView.tags = createTitleImageTags(value);
          }
          else if (name === 'buttons' && isArray(value)) {
              titleNView.buttons = value.map((button, index) => {
                  button.onclick = createTitleNViewBtnClick(index);
                  return button;
              });
          }
      });
      webviewStyle.titleNView = titleNView;
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
          invokeHook('onNavigationBarButtonTap', btn);
      };
  }

  function parseWebviewStyle(id, path, routeOptions) {
      const webviewStyle = {
          bounce: 'vertical',
      };
      const routeMeta = mergePageMeta(id, routeOptions.meta);
      Object.keys(routeMeta).forEach((name) => {
          if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
              webviewStyle[name] =
                  routeMeta[name];
          }
      });
      initNVue(webviewStyle, routeMeta, path);
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
  let preloadWebview;
  function getWebviewId() {
      return id;
  }
  function genWebviewId() {
      return id++;
  }
  function getPreloadWebview() {
      return preloadWebview;
  }
  function encode(val) {
      return val;
  }
  function initUniPageUrl(path, query) {
      const queryString = query ? stringifyQuery$1(query, encode) : '';
      return {
          path: path.substr(1),
          query: queryString ? queryString.substr(1) : queryString,
      };
  }

  function createNVueWebview({ path, query, routeOptions, webviewStyle, }) {
      const curWebviewId = genWebviewId();
      const curWebviewStyle = parseWebviewStyle(curWebviewId, path, routeOptions);
      curWebviewStyle.uniPageUrl = initUniPageUrl(path, query);
      if ((process.env.NODE_ENV !== 'production')) {
          console.log('[uni-app] createWebview', curWebviewId, path, curWebviewStyle);
      }
      curWebviewStyle.isTab = !!routeOptions.meta.isTabBar;
      return plus.webview.create('', String(curWebviewId), curWebviewStyle, extend({
          nvue: true,
      }, webviewStyle));
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

  function registerPage({ path, query, openType, webview, }) {
      // fast 模式，nvue 首页时，会在nvue中主动调用registerPage并传入首页webview，此时初始化一下首页（因为此时可能还未调用registerApp）
      if (webview) {
          initEntry();
      }
      // TODO preloadWebview
      const routeOptions = initRouteOptions(path, openType);
      if (!webview) {
          webview = createWebview({ path, routeOptions, query });
      }
      else {
          webview = plus.webview.getWebviewById(webview.id);
          webview.nvue = routeOptions.meta.isNVue;
      }
      if ((process.env.NODE_ENV !== 'production')) {
          console.log(`[uni-app] registerPage(${path},${webview.id})`);
      }
  }

  // ;(uni as any).__$wx__ = uni
  var index = {
      uni: uni$1,
      __registerApp: registerApp,
      __registerPage: registerPage,
  };

  return index;

}());
const uni = serviceContext.uni;
const getApp = serviceContext.getApp;
const getCurrentPages = serviceContext.getCurrentPages;
const __definePage = serviceContext.__definePage;
const __registerPage = serviceContext.__registerPage;
return serviceContext;
}
