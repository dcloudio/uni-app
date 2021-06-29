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

  const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
      'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
      'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
  const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);

  /**
   * On the client we only need to offer special cases for boolean attributes that
   * have different names from their corresponding dom properties:
   * - itemscope -> N/A
   * - allowfullscreen -> allowFullscreen
   * - formnovalidate -> formNoValidate
   * - ismap -> isMap
   * - nomodule -> noModule
   * - novalidate -> noValidate
   * - readonly -> readOnly
   */
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs);

  function normalizeStyle(value) {
      if (isArray(value)) {
          const res = {};
          for (let i = 0; i < value.length; i++) {
              const item = value[i];
              const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
              if (normalized) {
                  for (const key in normalized) {
                      res[key] = normalized[key];
                  }
              }
          }
          return res;
      }
      else if (isObject$1(value)) {
          return value;
      }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach(item => {
          if (item) {
              const tmp = item.split(propertyDelimiterRE);
              tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return ret;
  }
  function normalizeClass(value) {
      let res = '';
      if (isString(value)) {
          res = value;
      }
      else if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
              const normalized = normalizeClass(value[i]);
              if (normalized) {
                  res += normalized + ' ';
              }
          }
      }
      else if (isObject$1(value)) {
          for (const name in value) {
              if (value[name]) {
                  res += name + ' ';
              }
          }
      }
      return res.trim();
  }

  // These tag configs are shared between compiler-dom and runtime-dom, so they
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  const HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' +
      'header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,' +
      'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' +
      'data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,' +
      'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' +
      'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' +
      'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' +
      'option,output,progress,select,textarea,details,dialog,menu,' +
      'summary,template,blockquote,iframe,tfoot';
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' +
      'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' +
      'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' +
      'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' +
      'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' +
      'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' +
      'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' +
      'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' +
      'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' +
      'text,textPath,title,tspan,unknown,use,view';
  const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS);
  const isSVGTag = /*#__PURE__*/ makeMap(SVG_TAGS);
  const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
      ? Object.freeze({})
      : {};
  const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
  const NOOP = () => { };
  /**
   * Always return false.
   */
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith('onUpdate:');
  const extend = Object.assign;
  const remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
          arr.splice(i, 1);
      }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === '[object Map]';
  const isSet = (val) => toTypeString(val) === '[object Set]';
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isSymbol = (val) => typeof val === 'symbol';
  const isObject$1 = (val) => val !== null && typeof val === 'object';
  const isPromise = (val) => {
      return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
      // extract "RawType" from strings like "[object RawType]"
      return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  const isIntegerKey = (key) => isString(key) &&
      key !== 'NaN' &&
      key[0] !== '-' &&
      '' + parseInt(key, 10) === key;
  const isReservedProp = /*#__PURE__*/ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ',key,ref,' +
      'onVnodeBeforeMount,onVnodeMounted,' +
      'onVnodeBeforeUpdate,onVnodeUpdated,' +
      'onVnodeBeforeUnmount,onVnodeUnmounted');
  const cacheStringFunction$1 = (fn) => {
      const cache = Object.create(null);
      return ((str) => {
          const hit = cache[str];
          return hit || (cache[str] = fn(str));
      });
  };
  const camelizeRE = /-(\w)/g;
  /**
   * @private
   */
  const camelize = cacheStringFunction$1((str) => {
      return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
  });
  const hyphenateRE = /\B([A-Z])/g;
  /**
   * @private
   */
  const hyphenate = cacheStringFunction$1((str) => str.replace(hyphenateRE, '-$1').toLowerCase());
  /**
   * @private
   */
  const capitalize = cacheStringFunction$1((str) => str.charAt(0).toUpperCase() + str.slice(1));
  /**
   * @private
   */
  const toHandlerKey = cacheStringFunction$1((str) => (str ? `on${capitalize(str)}` : ``));
  // compare whether a value has changed, accounting for NaN.
  const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  const invokeArrayFns$1 = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
          fns[i](arg);
      }
  };
  const def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
          configurable: true,
          enumerable: false,
          value
      });
  };
  const toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
      return (_globalThis ||
          (_globalThis =
              typeof globalThis !== 'undefined'
                  ? globalThis
                  : typeof self !== 'undefined'
                      ? self
                      : typeof window !== 'undefined'
                          ? window
                          : typeof window !== 'undefined'
                              ? window
                              : {}));
  };

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
          const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
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
  function validateProp$1(name, value, prop, isAbsent) {
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
              const { valid, expectedType } = assertType$1(value, types[i]);
              expectedTypes.push(expectedType || '');
              isValid = valid;
          }
          if (!isValid) {
              return getInvalidTypeMessage$1(name, value, expectedTypes);
          }
      }
      // custom validator
      if (validator) {
          return validator(value);
      }
  }
  const isSimpleType$1 = /*#__PURE__*/ makeMap('String,Number,Boolean,Function,Symbol');
  function assertType$1(value, type) {
      let valid;
      const expectedType = getType$1(type);
      if (isSimpleType$1(expectedType)) {
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
  function getInvalidTypeMessage$1(name, value, expectedTypes) {
      let message = `Invalid args: type check failed for args "${name}".` +
          ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
      const expectedType = expectedTypes[0];
      const receivedType = toRawType(value);
      const expectedValue = styleValue$1(value, expectedType);
      const receivedValue = styleValue$1(value, receivedType);
      // check if we need to specify expected value
      if (expectedTypes.length === 1 &&
          isExplicable$1(expectedType) &&
          !isBoolean$1(expectedType, receivedType)) {
          message += ` with value ${expectedValue}`;
      }
      message += `, got ${receivedType} `;
      // check if we need to specify received value
      if (isExplicable$1(receivedType)) {
          message += `with value ${receivedValue}.`;
      }
      return message;
  }
  function getType$1(ctor) {
      const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : '';
  }
  function styleValue$1(value, type) {
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
  function isExplicable$1(type) {
      const explicitTypes = ['string', 'number', 'boolean'];
      return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean$1(...args) {
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
  function defineOffApi(name, fn, options) {
      return wrapperOffApi(name, fn, options);
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

  class DOMException extends Error {
      constructor(message) {
          super(message);
          this.name = 'DOMException';
      }
  }
  class UniEventTarget {
      constructor() {
          this._listeners = {};
      }
      dispatchEvent(evt) {
          const listeners = this._listeners[evt.type];
          if (!listeners) {
              return false;
          }
          const len = listeners.length;
          for (let i = 0; i < len; i++) {
              listeners[i].call(this, evt);
              if (evt._end) {
                  break;
              }
          }
          return evt.cancelable && evt.defaultPrevented;
      }
      addEventListener(type, listener, options) {
          const isOnce = options && options.once;
          if (isOnce) {
              const wrapper = function (evt) {
                  listener.apply(this, [evt]);
                  this.removeEventListener(type, wrapper, options);
              };
              return this.addEventListener(type, wrapper, extend(options, { once: false }));
          }
          (this._listeners[type] || (this._listeners[type] = [])).push(listener);
      }
      removeEventListener(type, callback, options) {
          const listeners = this._listeners[type.toLowerCase()];
          if (!listeners) {
              return;
          }
          const index = listeners.indexOf(callback);
          if (index > -1) {
              listeners.splice(index, 1);
          }
      }
  }
  const COMPONENT_MAP = {
      VIEW: 1,
      IMAGE: 2,
      TEXT: 3,
      '#text': 4,
      '#comment': 5,
      NAVIGATOR: 6,
      FORM: 7,
      BUTTON: 8,
      INPUT: 9,
      LABEL: 10,
      RADIO: 11,
      CHECKBOX: 12,
      'CHECKBOX-GROUP': 13,
      AD: 14,
      AUDIO: 15,
      CAMERA: 16,
      CANVAS: 17,
      'COVER-IMAGE': 18,
      'COVER-VIEW': 19,
      EDITOR: 20,
      'FUNCTIONAL-PAGE-NAVIGATOR': 21,
      ICON: 22,
      'RADIO-GROUP': 23,
      'LIVE-PLAYER': 24,
      'LIVE-PUSHER': 25,
      MAP: 26,
      'MOVABLE-AREA': 27,
      'MOVABLE-VIEW': 28,
      'OFFICIAL-ACCOUNT': 29,
      'OPEN-DATA': 30,
      PICKER: 31,
      'PICKER-VIEW': 32,
      'PICKER-VIEW-COLUMN': 33,
      PROGRESS: 34,
      'RICH-TEXT': 35,
      'SCROLL-VIEW': 36,
      SLIDER: 37,
      SWIPER: 38,
      'SWIPER-ITEM': 39,
      SWITCH: 40,
      TEXTAREA: 41,
      VIDEO: 42,
      'WEB-VIEW': 43,
  };
  function encodeTag(tag) {
      return COMPONENT_MAP[tag] || tag;
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
          parentNode.removeChild(node);
      }
  }
  function checkNodeId(node) {
      if (!node.nodeId) {
          node.nodeId = node.pageNode.genId();
      }
  }
  // 为优化性能，各平台不使用proxy来实现node的操作拦截，而是直接通过pageNode定制
  class UniNode extends UniEventTarget {
      constructor(nodeType, nodeName, container) {
          super();
          this.pageNode = null;
          this.parentNode = null;
          this._text = null;
          if (container) {
              const { pageNode } = container;
              this.pageNode = pageNode;
              this.nodeId = pageNode.genId();
              pageNode.onCreate(this, encodeTag(nodeName));
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
          if (this.pageNode) {
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
          removeNode(newChild);
          newChild.pageNode = this.pageNode;
          newChild.parentNode = this;
          checkNodeId(newChild);
          const { childNodes } = this;
          let index;
          if (refChild) {
              index = childNodes.indexOf(refChild);
              if (index === -1) {
                  throw new DOMException(`Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`);
              }
              childNodes.splice(index, 0, newChild);
          }
          else {
              index = childNodes.length;
              childNodes.push(newChild);
          }
          return this.pageNode
              ? this.pageNode.onInsertBefore(this, newChild, index)
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
          return this.pageNode
              ? this.pageNode.onRemoveChild(this, oldChild)
              : oldChild;
      }
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

  const NAVBAR_HEIGHT = 44;
  const TABBAR_HEIGHT = 50;
  const ON_REACH_BOTTOM_DISTANCE = 50;
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
          return compile$1(tokens, values);
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
  function compile$1(tokens, values) {
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

  const targetMap = new WeakMap();
  const effectStack = [];
  let activeEffect;
  const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
  const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
  function isEffect(fn) {
      return fn && fn._isEffect === true;
  }
  function effect(fn, options = EMPTY_OBJ) {
      if (isEffect(fn)) {
          fn = fn.raw;
      }
      const effect = createReactiveEffect(fn, options);
      if (!options.lazy) {
          effect();
      }
      return effect;
  }
  function stop(effect) {
      if (effect.active) {
          cleanup(effect);
          if (effect.options.onStop) {
              effect.options.onStop();
          }
          effect.active = false;
      }
  }
  let uid$2 = 0;
  function createReactiveEffect(fn, options) {
      const effect = function reactiveEffect() {
          if (!effect.active) {
              return fn();
          }
          if (!effectStack.includes(effect)) {
              cleanup(effect);
              try {
                  enableTracking();
                  effectStack.push(effect);
                  activeEffect = effect;
                  return fn();
              }
              finally {
                  effectStack.pop();
                  resetTracking();
                  activeEffect = effectStack[effectStack.length - 1];
              }
          }
      };
      effect.id = uid$2++;
      effect.allowRecurse = !!options.allowRecurse;
      effect._isEffect = true;
      effect.active = true;
      effect.raw = fn;
      effect.deps = [];
      effect.options = options;
      return effect;
  }
  function cleanup(effect) {
      const { deps } = effect;
      if (deps.length) {
          for (let i = 0; i < deps.length; i++) {
              deps[i].delete(effect);
          }
          deps.length = 0;
      }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
  }
  function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
  }
  function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === undefined ? true : last;
  }
  function track(target, type, key) {
      if (!shouldTrack || activeEffect === undefined) {
          return;
      }
      let depsMap = targetMap.get(target);
      if (!depsMap) {
          targetMap.set(target, (depsMap = new Map()));
      }
      let dep = depsMap.get(key);
      if (!dep) {
          depsMap.set(key, (dep = new Set()));
      }
      if (!dep.has(activeEffect)) {
          dep.add(activeEffect);
          activeEffect.deps.push(dep);
          if ((process.env.NODE_ENV !== 'production') && activeEffect.options.onTrack) {
              activeEffect.options.onTrack({
                  effect: activeEffect,
                  target,
                  type,
                  key
              });
          }
      }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
          // never been tracked
          return;
      }
      const effects = new Set();
      const add = (effectsToAdd) => {
          if (effectsToAdd) {
              effectsToAdd.forEach(effect => {
                  if (effect !== activeEffect || effect.allowRecurse) {
                      effects.add(effect);
                  }
              });
          }
      };
      if (type === "clear" /* CLEAR */) {
          // collection being cleared
          // trigger all effects for target
          depsMap.forEach(add);
      }
      else if (key === 'length' && isArray(target)) {
          depsMap.forEach((dep, key) => {
              if (key === 'length' || key >= newValue) {
                  add(dep);
              }
          });
      }
      else {
          // schedule runs for SET | ADD | DELETE
          if (key !== void 0) {
              add(depsMap.get(key));
          }
          // also run for iteration key on ADD | DELETE | Map.SET
          switch (type) {
              case "add" /* ADD */:
                  if (!isArray(target)) {
                      add(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          add(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  else if (isIntegerKey(key)) {
                      // new index added to array -> length changes
                      add(depsMap.get('length'));
                  }
                  break;
              case "delete" /* DELETE */:
                  if (!isArray(target)) {
                      add(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          add(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  break;
              case "set" /* SET */:
                  if (isMap(target)) {
                      add(depsMap.get(ITERATE_KEY));
                  }
                  break;
          }
      }
      const run = (effect) => {
          if ((process.env.NODE_ENV !== 'production') && effect.options.onTrigger) {
              effect.options.onTrigger({
                  effect,
                  target,
                  key,
                  type,
                  newValue,
                  oldValue,
                  oldTarget
              });
          }
          if (effect.options.scheduler) {
              effect.options.scheduler(effect);
          }
          else {
              effect();
          }
      };
      effects.forEach(run);
  }

  const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
      .map(key => Symbol[key])
      .filter(isSymbol));
  const get = /*#__PURE__*/ createGetter();
  const shallowGet = /*#__PURE__*/ createGetter(false, true);
  const readonlyGet = /*#__PURE__*/ createGetter(true);
  const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
  const arrayInstrumentations = {};
  ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
      const method = Array.prototype[key];
      arrayInstrumentations[key] = function (...args) {
          const arr = toRaw(this);
          for (let i = 0, l = this.length; i < l; i++) {
              track(arr, "get" /* GET */, i + '');
          }
          // we run the method using the original args first (which may be reactive)
          const res = method.apply(arr, args);
          if (res === -1 || res === false) {
              // if that didn't work, run it again using raw values.
              return method.apply(arr, args.map(toRaw));
          }
          else {
              return res;
          }
      };
  });
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
      const method = Array.prototype[key];
      arrayInstrumentations[key] = function (...args) {
          pauseTracking();
          const res = method.apply(this, args);
          resetTracking();
          return res;
      };
  });
  function createGetter(isReadonly = false, shallow = false) {
      return function get(target, key, receiver) {
          if (key === "__v_isReactive" /* IS_REACTIVE */) {
              return !isReadonly;
          }
          else if (key === "__v_isReadonly" /* IS_READONLY */) {
              return isReadonly;
          }
          else if (key === "__v_raw" /* RAW */ &&
              receiver ===
                  (isReadonly
                      ? shallow
                          ? shallowReadonlyMap
                          : readonlyMap
                      : shallow
                          ? shallowReactiveMap
                          : reactiveMap).get(target)) {
              return target;
          }
          const targetIsArray = isArray(target);
          if (!isReadonly && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
              return Reflect.get(arrayInstrumentations, key, receiver);
          }
          const res = Reflect.get(target, key, receiver);
          if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
              return res;
          }
          if (!isReadonly) {
              track(target, "get" /* GET */, key);
          }
          if (shallow) {
              return res;
          }
          if (isRef(res)) {
              // ref unwrapping - does not apply for Array + integer key.
              const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
              return shouldUnwrap ? res.value : res;
          }
          if (isObject$1(res)) {
              // Convert returned value into a proxy as well. we do the isObject check
              // here to avoid invalid value warning. Also need to lazy access readonly
              // and reactive here to avoid circular dependency.
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
  const set = /*#__PURE__*/ createSetter();
  const shallowSet = /*#__PURE__*/ createSetter(true);
  function createSetter(shallow = false) {
      return function set(target, key, value, receiver) {
          let oldValue = target[key];
          if (!shallow) {
              value = toRaw(value);
              oldValue = toRaw(oldValue);
              if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                  oldValue.value = value;
                  return true;
              }
          }
          const hadKey = isArray(target) && isIntegerKey(key)
              ? Number(key) < target.length
              : hasOwn$1(target, key);
          const result = Reflect.set(target, key, value, receiver);
          // don't trigger if target is something up in the prototype chain of original
          if (target === toRaw(receiver)) {
              if (!hadKey) {
                  trigger(target, "add" /* ADD */, key, value);
              }
              else if (hasChanged(value, oldValue)) {
                  trigger(target, "set" /* SET */, key, value, oldValue);
              }
          }
          return result;
      };
  }
  function deleteProperty(target, key) {
      const hadKey = hasOwn$1(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
          trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
      }
      return result;
  }
  function has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
          track(target, "has" /* HAS */, key);
      }
      return result;
  }
  function ownKeys(target) {
      track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
  };
  const readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
          }
          return true;
      },
      deleteProperty(target, key) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
          }
          return true;
      }
  };
  const shallowReactiveHandlers = extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
  });
  // Props handlers are special in the sense that it should not unwrap top-level
  // refs (in order to allow refs to be explicitly passed down), but should
  // retain the reactivity of the normal readonly object.
  const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
  });

  const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
      // #1772: readonly(reactive(Map)) should return readonly + reactive version
      // of the value
      target = target["__v_raw" /* RAW */];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (key !== rawKey) {
          !isReadonly && track(rawTarget, "get" /* GET */, key);
      }
      !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
      const { has } = getProto(rawTarget);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
      }
      else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
      }
      else if (target !== rawTarget) {
          // #3602 readonly(reactive(Map))
          // ensure that the nested reactive `Map` can do tracking for itself
          target.get(key);
      }
  }
  function has$1(key, isReadonly = false) {
      const target = this["__v_raw" /* RAW */];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (key !== rawKey) {
          !isReadonly && track(rawTarget, "has" /* HAS */, key);
      }
      !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
      return key === rawKey
          ? target.has(key)
          : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
      target = target["__v_raw" /* RAW */];
      !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
      return Reflect.get(target, 'size', target);
  }
  function add(value) {
      value = toRaw(value);
      const target = toRaw(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
          target.add(value);
          trigger(target, "add" /* ADD */, value, value);
      }
      return this;
  }
  function set$1(key, value) {
      value = toRaw(value);
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          checkIdentityKeys(target, has, key);
      }
      const oldValue = get.call(target, key);
      target.set(key, value);
      if (!hadKey) {
          trigger(target, "add" /* ADD */, key, value);
      }
      else if (hasChanged(value, oldValue)) {
          trigger(target, "set" /* SET */, key, value, oldValue);
      }
      return this;
  }
  function deleteEntry(key) {
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          checkIdentityKeys(target, has, key);
      }
      const oldValue = get ? get.call(target, key) : undefined;
      // forward the operation before queueing reactions
      const result = target.delete(key);
      if (hadKey) {
          trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
      }
      return result;
  }
  function clear() {
      const target = toRaw(this);
      const hadItems = target.size !== 0;
      const oldTarget = (process.env.NODE_ENV !== 'production')
          ? isMap(target)
              ? new Map(target)
              : new Set(target)
          : undefined;
      // forward the operation before queueing reactions
      const result = target.clear();
      if (hadItems) {
          trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
      }
      return result;
  }
  function createForEach(isReadonly, isShallow) {
      return function forEach(callback, thisArg) {
          const observed = this;
          const target = observed["__v_raw" /* RAW */];
          const rawTarget = toRaw(target);
          const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
          !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
          return target.forEach((value, key) => {
              // important: make sure the callback is
              // 1. invoked with the reactive map as `this` and 3rd arg
              // 2. the value received should be a corresponding reactive/readonly.
              return callback.call(thisArg, wrap(value), wrap(key), observed);
          });
      };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
      return function (...args) {
          const target = this["__v_raw" /* RAW */];
          const rawTarget = toRaw(target);
          const targetIsMap = isMap(rawTarget);
          const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
          const isKeyOnly = method === 'keys' && targetIsMap;
          const innerIterator = target[method](...args);
          const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
          !isReadonly &&
              track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
          // return a wrapped iterator which returns observed versions of the
          // values emitted from the real iterator
          return {
              // iterator protocol
              next() {
                  const { value, done } = innerIterator.next();
                  return done
                      ? { value, done }
                      : {
                          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                          done
                      };
              },
              // iterable protocol
              [Symbol.iterator]() {
                  return this;
              }
          };
      };
  }
  function createReadonlyMethod(type) {
      return function (...args) {
          if ((process.env.NODE_ENV !== 'production')) {
              const key = args[0] ? `on key "${args[0]}" ` : ``;
              console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
          }
          return type === "delete" /* DELETE */ ? false : this;
      };
  }
  const mutableInstrumentations = {
      get(key) {
          return get$1(this, key);
      },
      get size() {
          return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
  };
  const shallowInstrumentations = {
      get(key) {
          return get$1(this, key, false, true);
      },
      get size() {
          return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
  };
  const readonlyInstrumentations = {
      get(key) {
          return get$1(this, key, true);
      },
      get size() {
          return size(this, true);
      },
      has(key) {
          return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* ADD */),
      set: createReadonlyMethod("set" /* SET */),
      delete: createReadonlyMethod("delete" /* DELETE */),
      clear: createReadonlyMethod("clear" /* CLEAR */),
      forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations = {
      get(key) {
          return get$1(this, key, true, true);
      },
      get size() {
          return size(this, true);
      },
      has(key) {
          return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* ADD */),
      set: createReadonlyMethod("set" /* SET */),
      delete: createReadonlyMethod("delete" /* DELETE */),
      clear: createReadonlyMethod("clear" /* CLEAR */),
      forEach: createForEach(true, true)
  };
  const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
  iteratorMethods.forEach(method => {
      mutableInstrumentations[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations[method] = createIterableMethod(method, true, false);
      shallowInstrumentations[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
  });
  function createInstrumentationGetter(isReadonly, shallow) {
      const instrumentations = shallow
          ? isReadonly
              ? shallowReadonlyInstrumentations
              : shallowInstrumentations
          : isReadonly
              ? readonlyInstrumentations
              : mutableInstrumentations;
      return (target, key, receiver) => {
          if (key === "__v_isReactive" /* IS_REACTIVE */) {
              return !isReadonly;
          }
          else if (key === "__v_isReadonly" /* IS_READONLY */) {
              return isReadonly;
          }
          else if (key === "__v_raw" /* RAW */) {
              return target;
          }
          return Reflect.get(hasOwn$1(instrumentations, key) && key in target
              ? instrumentations
              : target, key, receiver);
      };
  }
  const mutableCollectionHandlers = {
      get: createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
      get: createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
      get: createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
      get: createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
      const rawKey = toRaw(key);
      if (rawKey !== key && has.call(target, rawKey)) {
          const type = toRawType(target);
          console.warn(`Reactive ${type} contains both the raw and reactive ` +
              `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
              `which can lead to inconsistencies. ` +
              `Avoid differentiating between the raw and reactive versions ` +
              `of an object and only use the reactive version if possible.`);
      }
  }

  const reactiveMap = new WeakMap();
  const shallowReactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  const shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
      switch (rawType) {
          case 'Object':
          case 'Array':
              return 1 /* COMMON */;
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
              return 2 /* COLLECTION */;
          default:
              return 0 /* INVALID */;
      }
  }
  function getTargetType(value) {
      return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
          ? 0 /* INVALID */
          : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
      // if trying to observe a readonly proxy, return the readonly version.
      if (target && target["__v_isReadonly" /* IS_READONLY */]) {
          return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only the root
   * level properties are reactive. It also does not auto-unwrap refs (even at the
   * root level).
   */
  function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  /**
   * Creates a readonly copy of the original object. Note the returned copy is not
   * made reactive, but `readonly` can be called on an already reactive object.
   */
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  /**
   * Returns a reactive-copy of the original object, where only the root level
   * properties are readonly, and does NOT unwrap refs nor recursively convert
   * returned properties.
   * This is used for creating the props proxy object for stateful components.
   */
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
      if (!isObject$1(target)) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`value cannot be made reactive: ${String(target)}`);
          }
          return target;
      }
      // target is already a Proxy, return it.
      // exception: calling readonly() on a reactive object
      if (target["__v_raw" /* RAW */] &&
          !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
          return target;
      }
      // target already has corresponding Proxy
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
          return existingProxy;
      }
      // only a whitelist of value types can be observed.
      const targetType = getTargetType(target);
      if (targetType === 0 /* INVALID */) {
          return target;
      }
      const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
  }
  function isReactive(value) {
      if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* RAW */]);
      }
      return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
  }
  function isReadonly(value) {
      return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
  }
  function isProxy(value) {
      return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
      return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
  }
  function markRaw(value) {
      def(value, "__v_skip" /* SKIP */, true);
      return value;
  }
  function isRef(r) {
      return Boolean(r && r.__v_isRef === true);
  }
  function unref(ref) {
      return isRef(ref) ? ref.value : ref;
  }
  const shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
          const oldValue = target[key];
          if (isRef(oldValue) && !isRef(value)) {
              oldValue.value = value;
              return true;
          }
          else {
              return Reflect.set(target, key, value, receiver);
          }
      }
  };
  function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs)
          ? objectWithRefs
          : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ObjectRefImpl {
      constructor(_object, _key) {
          this._object = _object;
          this._key = _key;
          this.__v_isRef = true;
      }
      get value() {
          return this._object[this._key];
      }
      set value(newVal) {
          this._object[this._key] = newVal;
      }
  }
  function toRef(object, key) {
      return isRef(object[key])
          ? object[key]
          : new ObjectRefImpl(object, key);
  }

  class ComputedRefImpl {
      constructor(getter, _setter, isReadonly) {
          this._setter = _setter;
          this._dirty = true;
          this.__v_isRef = true;
          this.effect = effect(getter, {
              lazy: true,
              scheduler: () => {
                  if (!this._dirty) {
                      this._dirty = true;
                      trigger(toRaw(this), "set" /* SET */, 'value');
                  }
              }
          });
          this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
      }
      get value() {
          // the computed ref may get wrapped by other proxies e.g. readonly() #3376
          const self = toRaw(this);
          if (self._dirty) {
              self._value = this.effect();
              self._dirty = false;
          }
          track(self, "get" /* GET */, 'value');
          return self._value;
      }
      set value(newValue) {
          this._setter(newValue);
      }
  }
  function computed$1(getterOrOptions) {
      let getter;
      let setter;
      if (isFunction(getterOrOptions)) {
          getter = getterOrOptions;
          setter = (process.env.NODE_ENV !== 'production')
              ? () => {
                  console.warn('Write operation failed: computed value is readonly');
              }
              : NOOP;
      }
      else {
          getter = getterOrOptions.get;
          setter = getterOrOptions.set;
      }
      return new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);
  }

  const stack = [];
  function pushWarningContext(vnode) {
      stack.push(vnode);
  }
  function popWarningContext() {
      stack.pop();
  }
  function warn(msg, ...args) {
      // avoid props formatting or warn handler tracking deps that might be mutated
      // during patch, leading to infinite recursion.
      pauseTracking();
      const instance = stack.length ? stack[stack.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
          callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
              msg + args.join(''),
              instance && instance.proxy,
              trace
                  .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                  .join('\n'),
              trace
          ]);
      }
      else {
          const warnArgs = [`[Vue warn]: ${msg}`, ...args];
          /* istanbul ignore if */
          if (trace.length &&
              // avoid spamming console during tests
              !false) {
              warnArgs.push(`\n`, ...formatTrace(trace));
          }
          console.warn(...warnArgs);
      }
      resetTracking();
  }
  function getComponentTrace() {
      let currentVNode = stack[stack.length - 1];
      if (!currentVNode) {
          return [];
      }
      // we can't just use the stack because it will be incomplete during updates
      // that did not start from the root. Re-construct the parent chain using
      // instance parent pointers.
      const normalizedStack = [];
      while (currentVNode) {
          const last = normalizedStack[0];
          if (last && last.vnode === currentVNode) {
              last.recurseCount++;
          }
          else {
              normalizedStack.push({
                  vnode: currentVNode,
                  recurseCount: 0
              });
          }
          const parentInstance = currentVNode.component && currentVNode.component.parent;
          currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
  }
  /* istanbul ignore next */
  function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
          logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
      });
      return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
      const close = `>` + postfix;
      return vnode.props
          ? [open, ...formatProps(vnode.props), close]
          : [open + close];
  }
  /* istanbul ignore next */
  function formatProps(props) {
      const res = [];
      const keys = Object.keys(props);
      keys.slice(0, 3).forEach(key => {
          res.push(...formatProp(key, props[key]));
      });
      if (keys.length > 3) {
          res.push(` ...`);
      }
      return res;
  }
  /* istanbul ignore next */
  function formatProp(key, value, raw) {
      if (isString(value)) {
          value = JSON.stringify(value);
          return raw ? value : [`${key}=${value}`];
      }
      else if (typeof value === 'number' ||
          typeof value === 'boolean' ||
          value == null) {
          return raw ? value : [`${key}=${value}`];
      }
      else if (isRef(value)) {
          value = formatProp(key, toRaw(value.value), true);
          return raw ? value : [`${key}=Ref<`, value, `>`];
      }
      else if (isFunction(value)) {
          return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
      }
      else {
          value = toRaw(value);
          return raw ? value : [`${key}=`, value];
      }
  }

  const ErrorTypeStrings = {
      ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
      ["c" /* CREATED */]: 'created hook',
      ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
      ["m" /* MOUNTED */]: 'mounted hook',
      ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
      ["u" /* UPDATED */]: 'updated',
      ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
      ["um" /* UNMOUNTED */]: 'unmounted hook',
      ["a" /* ACTIVATED */]: 'activated hook',
      ["da" /* DEACTIVATED */]: 'deactivated hook',
      ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
      ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
      ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
      [0 /* SETUP_FUNCTION */]: 'setup function',
      [1 /* RENDER_FUNCTION */]: 'render function',
      [2 /* WATCH_GETTER */]: 'watcher getter',
      [3 /* WATCH_CALLBACK */]: 'watcher callback',
      [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
      [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
      [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
      [7 /* VNODE_HOOK */]: 'vnode hook',
      [8 /* DIRECTIVE_HOOK */]: 'directive hook',
      [9 /* TRANSITION_HOOK */]: 'transition hook',
      [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
      [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
      [12 /* FUNCTION_REF */]: 'ref function',
      [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
      [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
          'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
  };
  function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
          res = args ? fn(...args) : fn();
      }
      catch (err) {
          handleError(err, instance, type);
      }
      return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (isFunction(fn)) {
          const res = callWithErrorHandling(fn, instance, type, args);
          if (res && isPromise(res)) {
              res.catch(err => {
                  handleError(err, instance, type);
              });
          }
          return res;
      }
      const values = [];
      for (let i = 0; i < fn.length; i++) {
          values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
          let cur = instance.parent;
          // the exposed instance is the render proxy to keep it consistent with 2.x
          const exposedInstance = instance.proxy;
          // in production the hook receives only the error code
          const errorInfo = (process.env.NODE_ENV !== 'production') ? ErrorTypeStrings[type] : type;
          while (cur) {
              const errorCapturedHooks = cur.ec;
              if (errorCapturedHooks) {
                  for (let i = 0; i < errorCapturedHooks.length; i++) {
                      if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                          return;
                      }
                  }
              }
              cur = cur.parent;
          }
          // app-level handling
          const appErrorHandler = instance.appContext.config.errorHandler;
          if (appErrorHandler) {
              callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
              return;
          }
      }
      logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
      if ((process.env.NODE_ENV !== 'production')) {
          const info = ErrorTypeStrings[type];
          if (contextVNode) {
              pushWarningContext(contextVNode);
          }
          warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
          if (contextVNode) {
              popWarningContext();
          }
          // crash in dev by default so it's more noticeable
          if (throwInDev) {
              throw err;
          }
          else {
              console.error(err);
          }
      }
      else {
          // recover in prod to reduce the impact on end-user
          console.error(err);
      }
  }

  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPreFlushCbs = [];
  let activePreFlushCbs = null;
  let preFlushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  let currentPreFlushParentJob = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
      const p = currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
  }
  // #2768
  // Use binary-search to find a suitable position in the queue,
  // so that the queue maintains the increasing order of job's id,
  // which can prevent the job from being skipped and also can avoid repeated patching.
  function findInsertionIndex(job) {
      // the start index should be `flushIndex + 1`
      let start = flushIndex + 1;
      let end = queue.length;
      const jobId = getId(job);
      while (start < end) {
          const middle = (start + end) >>> 1;
          const middleJobId = getId(queue[middle]);
          middleJobId < jobId ? (start = middle + 1) : (end = middle);
      }
      return start;
  }
  function queueJob(job) {
      // the dedupe search uses the startIndex argument of Array.includes()
      // by default the search index includes the current job that is being run
      // so it cannot recursively trigger itself again.
      // if the job is a watch() callback, the search will start with a +1 index to
      // allow it recursively trigger itself - it is the user's responsibility to
      // ensure it doesn't end up in an infinite loop.
      if ((!queue.length ||
          !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
          job !== currentPreFlushParentJob) {
          const pos = findInsertionIndex(job);
          if (pos > -1) {
              queue.splice(pos, 0, job);
          }
          else {
              queue.push(job);
          }
          queueFlush();
      }
  }
  function queueFlush() {
      if (!isFlushing && !isFlushPending) {
          isFlushPending = true;
          currentFlushPromise = resolvedPromise.then(flushJobs);
      }
  }
  function invalidateJob(job) {
      const i = queue.indexOf(job);
      if (i > flushIndex) {
          queue.splice(i, 1);
      }
  }
  function queueCb(cb, activeQueue, pendingQueue, index) {
      if (!isArray(cb)) {
          if (!activeQueue ||
              !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
              pendingQueue.push(cb);
          }
      }
      else {
          // if cb is an array, it is a component lifecycle hook which can only be
          // triggered by a job, which is already deduped in the main queue, so
          // we can skip duplicate check here to improve perf
          pendingQueue.push(...cb);
      }
      queueFlush();
  }
  function queuePreFlushCb(cb) {
      queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
      queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
      if (pendingPreFlushCbs.length) {
          currentPreFlushParentJob = parentJob;
          activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
          pendingPreFlushCbs.length = 0;
          if ((process.env.NODE_ENV !== 'production')) {
              seen = seen || new Map();
          }
          for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
              if ((process.env.NODE_ENV !== 'production') &&
                  checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
                  continue;
              }
              activePreFlushCbs[preFlushIndex]();
          }
          activePreFlushCbs = null;
          preFlushIndex = 0;
          currentPreFlushParentJob = null;
          // recursively flush until it drains
          flushPreFlushCbs(seen, parentJob);
      }
  }
  function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
          const deduped = [...new Set(pendingPostFlushCbs)];
          pendingPostFlushCbs.length = 0;
          // #1947 already has active queue, nested flushPostFlushCbs call
          if (activePostFlushCbs) {
              activePostFlushCbs.push(...deduped);
              return;
          }
          activePostFlushCbs = deduped;
          if ((process.env.NODE_ENV !== 'production')) {
              seen = seen || new Map();
          }
          activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
          for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
              if ((process.env.NODE_ENV !== 'production') &&
                  checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                  continue;
              }
              activePostFlushCbs[postFlushIndex]();
          }
          activePostFlushCbs = null;
          postFlushIndex = 0;
      }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      if ((process.env.NODE_ENV !== 'production')) {
          seen = seen || new Map();
      }
      flushPreFlushCbs(seen);
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child so its render effect will have smaller
      //    priority number)
      // 2. If a component is unmounted during a parent component's update,
      //    its update can be skipped.
      queue.sort((a, b) => getId(a) - getId(b));
      try {
          for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
              const job = queue[flushIndex];
              if (job && job.active !== false) {
                  if ((process.env.NODE_ENV !== 'production') && checkRecursiveUpdates(seen, job)) {
                      continue;
                  }
                  callWithErrorHandling(job, null, 14 /* SCHEDULER */);
              }
          }
      }
      finally {
          flushIndex = 0;
          queue.length = 0;
          flushPostFlushCbs(seen);
          isFlushing = false;
          currentFlushPromise = null;
          // some postFlushCb queued jobs!
          // keep flushing until it drains.
          if (queue.length ||
              pendingPreFlushCbs.length ||
              pendingPostFlushCbs.length) {
              flushJobs(seen);
          }
      }
  }
  function checkRecursiveUpdates(seen, fn) {
      if (!seen.has(fn)) {
          seen.set(fn, 1);
      }
      else {
          const count = seen.get(fn);
          if (count > RECURSION_LIMIT) {
              const instance = fn.ownerInstance;
              const componentName = instance && getComponentName(instance.type);
              warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                  `This means you have a reactive effect that is mutating its own ` +
                  `dependencies and thus recursively triggering itself. Possible sources ` +
                  `include component template, render function, updated hook or ` +
                  `watcher source function.`);
              return true;
          }
          else {
              seen.set(fn, count + 1);
          }
      }
  }

  /* eslint-disable no-restricted-globals */
  let isHmrUpdating = false;
  const hmrDirtyComponents = new Set();
  // Expose the HMR runtime on the window object
  // This makes it entirely tree-shakable without polluting the exports and makes
  // it easier to be used in toolings like vue-loader
  // Note: for a component to be eligible for HMR it also needs the __hmrId option
  // to be set so that its instances can be registered / removed.
  if ((process.env.NODE_ENV !== 'production')) {
      const globalObject = typeof window !== 'undefined'
          ? window
          : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                  ? window
                  : {};
      globalObject.__VUE_HMR_RUNTIME__ = {
          createRecord: tryWrap(createRecord),
          rerender: tryWrap(rerender),
          reload: tryWrap(reload)
      };
  }
  const map = new Map();
  function registerHMR(instance) {
      const id = instance.type.__hmrId;
      let record = map.get(id);
      if (!record) {
          createRecord(id, instance.type);
          record = map.get(id);
      }
      record.instances.add(instance);
  }
  function unregisterHMR(instance) {
      map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, component) {
      if (!component) {
          warn(`HMR API usage is out of date.\n` +
              `Please upgrade vue-loader/vite/rollup-plugin-vue or other relevant ` +
              `dependency that handles Vue SFC compilation.`);
          component = {};
      }
      if (map.has(id)) {
          return false;
      }
      map.set(id, {
          component: isClassComponent(component) ? component.__vccOpts : component,
          instances: new Set()
      });
      return true;
  }
  function rerender(id, newRender) {
      const record = map.get(id);
      if (!record)
          return;
      if (newRender)
          record.component.render = newRender;
      // Array.from creates a snapshot which avoids the set being mutated during
      // updates
      Array.from(record.instances).forEach(instance => {
          if (newRender) {
              instance.render = newRender;
          }
          instance.renderCache = [];
          // this flag forces child components with slot content to update
          isHmrUpdating = true;
          instance.update();
          isHmrUpdating = false;
      });
  }
  function reload(id, newComp) {
      const record = map.get(id);
      if (!record)
          return;
      // Array.from creates a snapshot which avoids the set being mutated during
      // updates
      const { component, instances } = record;
      if (!hmrDirtyComponents.has(component)) {
          // 1. Update existing comp definition to match new one
          newComp = isClassComponent(newComp) ? newComp.__vccOpts : newComp;
          extend(component, newComp);
          for (const key in component) {
              if (key !== '__file' && !(key in newComp)) {
                  delete component[key];
              }
          }
          // 2. Mark component dirty. This forces the renderer to replace the component
          // on patch.
          hmrDirtyComponents.add(component);
          // 3. Make sure to unmark the component after the reload.
          queuePostFlushCb(() => {
              hmrDirtyComponents.delete(component);
          });
      }
      Array.from(instances).forEach(instance => {
          if (instance.parent) {
              // 4. Force the parent instance to re-render. This will cause all updated
              // components to be unmounted and re-mounted. Queue the update so that we
              // don't end up forcing the same parent to re-render multiple times.
              queueJob(instance.parent.update);
          }
          else if (instance.appContext.reload) {
              // root instance mounted via createApp() has a reload method
              instance.appContext.reload();
          }
          else if (typeof window !== 'undefined') {
              // root instance inside tree created via raw render(). Force reload.
              window.location.reload();
          }
          else {
              console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
          }
      });
  }
  function tryWrap(fn) {
      return (id, arg) => {
          try {
              return fn(id, arg);
          }
          catch (e) {
              console.error(e);
              console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
                  `Full reload required.`);
          }
      };
  }

  let devtools;
  function setDevtoolsHook(hook) {
      devtools = hook;
  }
  function devtoolsInitApp(app, version) {
      // TODO queue if devtools is undefined
      if (!devtools)
          return;
      devtools.emit("app:init" /* APP_INIT */, app, version, {
          Fragment,
          Text,
          Comment: Comment$1,
          Static
      });
  }
  function devtoolsUnmountApp(app) {
      if (!devtools)
          return;
      devtools.emit("app:unmount" /* APP_UNMOUNT */, app);
  }
  const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */);
  const devtoolsComponentUpdated = /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
  const devtoolsComponentRemoved = /*#__PURE__*/ createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */);
  function createDevtoolsComponentHook(hook) {
      return (component) => {
          if (!devtools)
              return;
          devtools.emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
      };
  }
  const devtoolsPerfStart = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:start" /* PERFORMANCE_START */);
  const devtoolsPerfEnd = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:end" /* PERFORMANCE_END */);
  function createDevtoolsPerformanceHook(hook) {
      return (component, type, time) => {
          if (!devtools)
              return;
          devtools.emit(hook, component.appContext.app, component.uid, component, type, time);
      };
  }
  function devtoolsComponentEmit(component, event, params) {
      if (!devtools)
          return;
      devtools.emit("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
  }
  const globalCompatConfig = {
      MODE: 2
  };
  function getCompatConfigForKey(key, instance) {
      const instanceConfig = instance && instance.type.compatConfig;
      if (instanceConfig && key in instanceConfig) {
          return instanceConfig[key];
      }
      return globalCompatConfig[key];
  }
  function isCompatEnabled(key, instance, enableForBuiltIn = false) {
      // skip compat for built-in components
      if (!enableForBuiltIn && instance && instance.type.__isBuiltIn) {
          return false;
      }
      const rawMode = getCompatConfigForKey('MODE', instance) || 2;
      const val = getCompatConfigForKey(key, instance);
      const mode = isFunction(rawMode)
          ? rawMode(instance && instance.type)
          : rawMode;
      if (mode === 2) {
          return val !== false;
      }
      else {
          return val === true || val === 'suppress-warning';
      }
  }

  function emit$1(instance, event, ...rawArgs) {
      const props = instance.vnode.props || EMPTY_OBJ;
      if ((process.env.NODE_ENV !== 'production')) {
          const { emitsOptions, propsOptions: [propsOptions] } = instance;
          if (emitsOptions) {
              if (!(event in emitsOptions) &&
                  !(false )) {
                  if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
                      warn(`Component emitted event "${event}" but it is neither declared in ` +
                          `the emits option nor as an "${toHandlerKey(event)}" prop.`);
                  }
              }
              else {
                  const validator = emitsOptions[event];
                  if (isFunction(validator)) {
                      const isValid = validator(...rawArgs);
                      if (!isValid) {
                          warn(`Invalid event arguments: event validation failed for event "${event}".`);
                      }
                  }
              }
          }
      }
      let args = rawArgs;
      const isModelListener = event.startsWith('update:');
      // for v-model update:xxx events, apply modifiers on args
      const modelArg = isModelListener && event.slice(7);
      if (modelArg && modelArg in props) {
          const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
          const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
          if (trim) {
              args = rawArgs.map(a => a.trim());
          }
          else if (number) {
              args = rawArgs.map(toNumber);
          }
      }
      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
          devtoolsComponentEmit(instance, event, args);
      }
      if ((process.env.NODE_ENV !== 'production')) {
          const lowerCaseEvent = event.toLowerCase();
          if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
              warn(`Event "${lowerCaseEvent}" is emitted in component ` +
                  `${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". ` +
                  `Note that HTML attributes are case-insensitive and you cannot use ` +
                  `v-on to listen to camelCase events when using in-DOM templates. ` +
                  `You should probably use "${hyphenate(event)}" instead of "${event}".`);
          }
      }
      let handlerName;
      let handler = props[(handlerName = toHandlerKey(event))] ||
          // also try camelCase event handler (#2249)
          props[(handlerName = toHandlerKey(camelize(event)))];
      // for v-model update:xxx events, also trigger kebab-case equivalent
      // for props passed via kebab-case
      if (!handler && isModelListener) {
          handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
      }
      if (handler) {
          callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
          if (!instance.emitted) {
              instance.emitted = {};
          }
          else if (instance.emitted[handlerName]) {
              return;
          }
          instance.emitted[handlerName] = true;
          callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
      }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== undefined) {
          return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      // apply mixin/extends props
      let hasExtends = false;
      if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
          const extendEmits = (raw) => {
              const normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);
              if (normalizedFromExtend) {
                  hasExtends = true;
                  extend(normalized, normalizedFromExtend);
              }
          };
          if (!asMixin && appContext.mixins.length) {
              appContext.mixins.forEach(extendEmits);
          }
          if (comp.extends) {
              extendEmits(comp.extends);
          }
          if (comp.mixins) {
              comp.mixins.forEach(extendEmits);
          }
      }
      if (!raw && !hasExtends) {
          cache.set(comp, null);
          return null;
      }
      if (isArray(raw)) {
          raw.forEach(key => (normalized[key] = null));
      }
      else {
          extend(normalized, raw);
      }
      cache.set(comp, normalized);
      return normalized;
  }
  // Check if an incoming prop key is a declared emit event listener.
  // e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
  // both considered matched listeners.
  function isEmitListener(options, key) {
      if (!options || !isOn(key)) {
          return false;
      }
      key = key.slice(2).replace(/Once$/, '');
      return (hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) ||
          hasOwn$1(options, hyphenate(key)) ||
          hasOwn$1(options, key));
  }

  /**
   * mark the current rendering instance for asset resolution (e.g.
   * resolveComponent, resolveDirective) during render
   */
  let currentRenderingInstance = null;
  let currentScopeId = null;
  /**
   * Note: rendering calls maybe nested. The function returns the parent rendering
   * instance if present, which should be restored after the render is done:
   *
   * ```js
   * const prev = setCurrentRenderingInstance(i)
   * // ...render
   * setCurrentRenderingInstance(prev)
   * ```
   */
  function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = (instance && instance.type.__scopeId) || null;
      return prev;
  }
  /**
   * Wrap a slot function to memoize current rendering instance
   * @private compiler helper
   */
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot // false only
  ) {
      if (!ctx)
          return fn;
      // already normalized
      if (fn._n) {
          return fn;
      }
      const renderFnWithContext = (...args) => {
          // If a user calls a compiled slot inside a template expression (#1745), it
          // can mess up block tracking, so by default we disable block tracking and
          // force bail out when invoking a compiled slot (indicated by the ._d flag).
          // This isn't necessary if rendering a compiled `<slot>`, so we flip the
          // ._d flag off when invoking the wrapped fn inside `renderSlot`.
          if (renderFnWithContext._d) {
              setBlockTracking(-1);
          }
          const prevInstance = setCurrentRenderingInstance(ctx);
          const res = fn(...args);
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
              setBlockTracking(1);
          }
          if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
              devtoolsComponentUpdated(ctx);
          }
          return res;
      };
      // mark normalized to avoid duplicated wrapping
      renderFnWithContext._n = true;
      // mark this as compiled by default
      // this is used in vnode.ts -> normalizeChildren() to set the slot
      // rendering flag.
      renderFnWithContext._c = true;
      // disable block tracking by default
      renderFnWithContext._d = true;
      return renderFnWithContext;
  }

  /**
   * dev only flag to track whether $attrs was used during render.
   * If $attrs was used during render then the warning for failed attrs
   * fallthrough can be suppressed.
   */
  let accessedAttrs = false;
  function markAttrsAccessed() {
      accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
      const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
      let result;
      const prev = setCurrentRenderingInstance(instance);
      if ((process.env.NODE_ENV !== 'production')) {
          accessedAttrs = false;
      }
      try {
          let fallthroughAttrs;
          if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
              // withProxy is a proxy with a different `has` trap only for
              // runtime-compiled render functions using `with` block.
              const proxyToUse = withProxy || proxy;
              result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
              fallthroughAttrs = attrs;
          }
          else {
              // functional
              const render = Component;
              // in dev, mark attrs accessed if optional props (attrs === props)
              if ((process.env.NODE_ENV !== 'production') && attrs === props) {
                  markAttrsAccessed();
              }
              result = normalizeVNode(render.length > 1
                  ? render(props, (process.env.NODE_ENV !== 'production')
                      ? {
                          get attrs() {
                              markAttrsAccessed();
                              return attrs;
                          },
                          slots,
                          emit
                      }
                      : { attrs, slots, emit })
                  : render(props, null /* we know it doesn't need it */));
              fallthroughAttrs = Component.props
                  ? attrs
                  : getFunctionalFallthrough(attrs);
          }
          // attr merging
          // in dev mode, comments are preserved, and it's possible for a template
          // to have comments along side the root element which makes it a fragment
          let root = result;
          let setRoot = undefined;
          if ((process.env.NODE_ENV !== 'production') &&
              result.patchFlag > 0 &&
              result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) {
              ;
              [root, setRoot] = getChildRoot(result);
          }
          if (fallthroughAttrs && inheritAttrs !== false) {
              const keys = Object.keys(fallthroughAttrs);
              const { shapeFlag } = root;
              if (keys.length) {
                  if (shapeFlag & 1 /* ELEMENT */ ||
                      shapeFlag & 6 /* COMPONENT */) {
                      if (propsOptions && keys.some(isModelListener)) {
                          // If a v-model listener (onUpdate:xxx) has a corresponding declared
                          // prop, it indicates this component expects to handle v-model and
                          // it should not fallthrough.
                          // related: #1543, #1643, #1989
                          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                      }
                      root = cloneVNode(root, fallthroughAttrs);
                  }
                  else if ((process.env.NODE_ENV !== 'production') && !accessedAttrs && root.type !== Comment$1) {
                      const allAttrs = Object.keys(attrs);
                      const eventAttrs = [];
                      const extraAttrs = [];
                      for (let i = 0, l = allAttrs.length; i < l; i++) {
                          const key = allAttrs[i];
                          if (isOn(key)) {
                              // ignore v-model handlers when they fail to fallthrough
                              if (!isModelListener(key)) {
                                  // remove `on`, lowercase first letter to reflect event casing
                                  // accurately
                                  eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                              }
                          }
                          else {
                              extraAttrs.push(key);
                          }
                      }
                      if (extraAttrs.length) {
                          warn(`Extraneous non-props attributes (` +
                              `${extraAttrs.join(', ')}) ` +
                              `were passed to component but could not be automatically inherited ` +
                              `because component renders fragment or text root nodes.`);
                      }
                      if (eventAttrs.length) {
                          warn(`Extraneous non-emits event listeners (` +
                              `${eventAttrs.join(', ')}) ` +
                              `were passed to component but could not be automatically inherited ` +
                              `because component renders fragment or text root nodes. ` +
                              `If the listener is intended to be a component custom event listener only, ` +
                              `declare it using the "emits" option.`);
                      }
                  }
              }
          }
          if (false &&
              isCompatEnabled("INSTANCE_ATTRS_CLASS_STYLE" /* INSTANCE_ATTRS_CLASS_STYLE */, instance) &&
              vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */ &&
              (root.shapeFlag & 1 /* ELEMENT */ ||
                  root.shapeFlag & 6 /* COMPONENT */)) ;
          // inherit directives
          if (vnode.dirs) {
              if ((process.env.NODE_ENV !== 'production') && !isElementRoot(root)) {
                  warn(`Runtime directive used on component with non-element root node. ` +
                      `The directives will not function as intended.`);
              }
              root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
          }
          // inherit transition data
          if (vnode.transition) {
              if ((process.env.NODE_ENV !== 'production') && !isElementRoot(root)) {
                  warn(`Component inside <Transition> renders non-element root node ` +
                      `that cannot be animated.`);
              }
              root.transition = vnode.transition;
          }
          if ((process.env.NODE_ENV !== 'production') && setRoot) {
              setRoot(root);
          }
          else {
              result = root;
          }
      }
      catch (err) {
          handleError(err, instance, 1 /* RENDER_FUNCTION */);
          result = createVNode(Comment$1);
      }
      setCurrentRenderingInstance(prev);
      return result;
  }
  /**
   * dev only
   * In dev mode, template root level comments are rendered, which turns the
   * template into a fragment root, but we need to locate the single element
   * root for attrs and scope id processing.
   */
  const getChildRoot = (vnode) => {
      const rawChildren = vnode.children;
      const dynamicChildren = vnode.dynamicChildren;
      const childRoot = filterSingleRoot(rawChildren);
      if (!childRoot) {
          return [vnode, undefined];
      }
      const index = rawChildren.indexOf(childRoot);
      const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
      const setRoot = (updatedRoot) => {
          rawChildren[index] = updatedRoot;
          if (dynamicChildren) {
              if (dynamicIndex > -1) {
                  dynamicChildren[dynamicIndex] = updatedRoot;
              }
              else if (updatedRoot.patchFlag > 0) {
                  vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
              }
          }
      };
      return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
      let singleRoot;
      for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (isVNode(child)) {
              // ignore user comment
              if (child.type !== Comment$1 || child.children === 'v-if') {
                  if (singleRoot) {
                      // has more than 1 non-comment child, return now
                      return;
                  }
                  else {
                      singleRoot = child;
                  }
              }
          }
          else {
              return;
          }
      }
      return singleRoot;
  }
  const getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
          if (key === 'class' || key === 'style' || isOn(key)) {
              (res || (res = {}))[key] = attrs[key];
          }
      }
      return res;
  };
  const filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
          if (!isModelListener(key) || !(key.slice(9) in props)) {
              res[key] = attrs[key];
          }
      }
      return res;
  };
  const isElementRoot = (vnode) => {
      return (vnode.shapeFlag & 6 /* COMPONENT */ ||
          vnode.shapeFlag & 1 /* ELEMENT */ ||
          vnode.type === Comment$1 // potential v-if branch switch
      );
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      // Parent component's render function was hot-updated. Since this may have
      // caused the child component's slots content to have changed, we need to
      // force the child to update as well.
      if ((process.env.NODE_ENV !== 'production') && (prevChildren || nextChildren) && isHmrUpdating) {
          return true;
      }
      // force child update for runtime directive or transition on component vnode.
      if (nextVNode.dirs || nextVNode.transition) {
          return true;
      }
      if (optimized && patchFlag >= 0) {
          if (patchFlag & 1024 /* DYNAMIC_SLOTS */) {
              // slot content that references values that might have changed,
              // e.g. in a v-for
              return true;
          }
          if (patchFlag & 16 /* FULL_PROPS */) {
              if (!prevProps) {
                  return !!nextProps;
              }
              // presence of this flag indicates props are always non-null
              return hasPropsChanged(prevProps, nextProps, emits);
          }
          else if (patchFlag & 8 /* PROPS */) {
              const dynamicProps = nextVNode.dynamicProps;
              for (let i = 0; i < dynamicProps.length; i++) {
                  const key = dynamicProps[i];
                  if (nextProps[key] !== prevProps[key] &&
                      !isEmitListener(emits, key)) {
                      return true;
                  }
              }
          }
      }
      else {
          // this path is only taken by manually written render functions
          // so presence of any children leads to a forced update
          if (prevChildren || nextChildren) {
              if (!nextChildren || !nextChildren.$stable) {
                  return true;
              }
          }
          if (prevProps === nextProps) {
              return false;
          }
          if (!prevProps) {
              return !!nextProps;
          }
          if (!nextProps) {
              return true;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
          return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
          const key = nextKeys[i];
          if (nextProps[key] !== prevProps[key] &&
              !isEmitListener(emitsOptions, key)) {
              return true;
          }
      }
      return false;
  }
  function updateHOCHostEl({ vnode, parent }, el // HostNode
  ) {
      while (parent && parent.subTree === vnode) {
          (vnode = parent.vnode).el = el;
          parent = parent.parent;
      }
  }

  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
      if (suspense && suspense.pendingBranch) {
          if (isArray(fn)) {
              suspense.effects.push(...fn);
          }
          else {
              suspense.effects.push(fn);
          }
      }
      else {
          queuePostFlushCb(fn);
      }
  }

  function provide(key, value) {
      if (!currentInstance) {
          if ((process.env.NODE_ENV !== 'production')) {
              warn(`provide() can only be used inside setup().`);
          }
      }
      else {
          let provides = currentInstance.provides;
          // by default an instance inherits its parent's provides object
          // but when it needs to provide values of its own, it creates its
          // own provides object using parent provides object as prototype.
          // this way in `inject` we can simply look up injections from direct
          // parent and let the prototype chain do the work.
          const parentProvides = currentInstance.parent && currentInstance.parent.provides;
          if (parentProvides === provides) {
              provides = currentInstance.provides = Object.create(parentProvides);
          }
          // TS doesn't allow symbol as index type
          provides[key] = value;
      }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
      // fallback to `currentRenderingInstance` so that this can be called in
      // a functional component
      const instance = currentInstance || currentRenderingInstance;
      if (instance) {
          // #2400
          // to support `app.use` plugins,
          // fallback to appContext's `provides` if the intance is at root
          const provides = instance.parent == null
              ? instance.vnode.appContext && instance.vnode.appContext.provides
              : instance.parent.provides;
          if (provides && key in provides) {
              // TS doesn't allow symbol as index type
              return provides[key];
          }
          else if (arguments.length > 1) {
              return treatDefaultAsFactory && isFunction(defaultValue)
                  ? defaultValue.call(instance.proxy)
                  : defaultValue;
          }
          else if ((process.env.NODE_ENV !== 'production')) {
              warn(`injection "${String(key)}" not found.`);
          }
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          warn(`inject() can only be used inside setup() or functional components.`);
      }
  }
  // initial value for watchers to trigger on undefined initial values
  const INITIAL_WATCHER_VALUE = {};
  // implementation
  function watch(source, cb, options) {
      if ((process.env.NODE_ENV !== 'production') && !isFunction(cb)) {
          warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
              `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
              `supports \`watch(source, cb, options?) signature.`);
      }
      return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
      if ((process.env.NODE_ENV !== 'production') && !cb) {
          if (immediate !== undefined) {
              warn(`watch() "immediate" option is only respected when using the ` +
                  `watch(source, callback, options?) signature.`);
          }
          if (deep !== undefined) {
              warn(`watch() "deep" option is only respected when using the ` +
                  `watch(source, callback, options?) signature.`);
          }
      }
      const warnInvalidSource = (s) => {
          warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
              `a reactive object, or an array of these types.`);
      };
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
          getter = () => source.value;
          forceTrigger = !!source._shallow;
      }
      else if (isReactive(source)) {
          getter = () => source;
          deep = true;
      }
      else if (isArray(source)) {
          isMultiSource = true;
          forceTrigger = source.some(isReactive);
          getter = () => source.map(s => {
              if (isRef(s)) {
                  return s.value;
              }
              else if (isReactive(s)) {
                  return traverse(s);
              }
              else if (isFunction(s)) {
                  return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
              }
              else {
                  (process.env.NODE_ENV !== 'production') && warnInvalidSource(s);
              }
          });
      }
      else if (isFunction(source)) {
          if (cb) {
              // getter with cb
              getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
          }
          else {
              // no cb -> simple effect
              getter = () => {
                  if (instance && instance.isUnmounted) {
                      return;
                  }
                  if (cleanup) {
                      cleanup();
                  }
                  return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
              };
          }
      }
      else {
          getter = NOOP;
          (process.env.NODE_ENV !== 'production') && warnInvalidSource(source);
      }
      if (cb && deep) {
          const baseGetter = getter;
          getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onInvalidate = (fn) => {
          cleanup = runner.options.onStop = () => {
              callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
          };
      };
      let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      const job = () => {
          if (!runner.active) {
              return;
          }
          if (cb) {
              // watch(source, cb)
              const newValue = runner();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                      : hasChanged(newValue, oldValue)) ||
                  (false  )) {
                  // cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                      newValue,
                      // pass undefined as the old value when it's changed for the first time
                      oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                      onInvalidate
                  ]);
                  oldValue = newValue;
              }
          }
          else {
              // watchEffect
              runner();
          }
      };
      // important: mark the job as a watcher callback so that scheduler knows
      // it is allowed to self-trigger (#1727)
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush === 'sync') {
          scheduler = job; // the scheduler function gets called directly
      }
      else if (flush === 'post') {
          scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      }
      else {
          // default: 'pre'
          scheduler = () => {
              if (!instance || instance.isMounted) {
                  queuePreFlushCb(job);
              }
              else {
                  // with 'pre' option, the first call must happen before
                  // the component is mounted so it is called synchronously.
                  job();
              }
          };
      }
      const runner = effect(getter, {
          lazy: true,
          onTrack,
          onTrigger,
          scheduler
      });
      recordInstanceBoundEffect(runner, instance);
      // initial run
      if (cb) {
          if (immediate) {
              job();
          }
          else {
              oldValue = runner();
          }
      }
      else if (flush === 'post') {
          queuePostRenderEffect(runner, instance && instance.suspense);
      }
      else {
          runner();
      }
      return () => {
          stop(runner);
          if (instance) {
              remove(instance.effects, runner);
          }
      };
  }
  // this.$watch
  function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = isString(source)
          ? source.includes('.')
              ? createPathGetter(publicThis, source)
              : () => publicThis[source]
          : source.bind(publicThis, publicThis);
      let cb;
      if (isFunction(value)) {
          cb = value;
      }
      else {
          cb = value.handler;
          options = value;
      }
      return doWatch(getter, cb.bind(publicThis), options, this);
  }
  function createPathGetter(ctx, path) {
      const segments = path.split('.');
      return () => {
          let cur = ctx;
          for (let i = 0; i < segments.length && cur; i++) {
              cur = cur[segments[i]];
          }
          return cur;
      };
  }
  function traverse(value, seen = new Set()) {
      if (!isObject$1(value) ||
          seen.has(value) ||
          value["__v_skip" /* SKIP */]) {
          return value;
      }
      seen.add(value);
      if (isRef(value)) {
          traverse(value.value, seen);
      }
      else if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
              traverse(value[i], seen);
          }
      }
      else if (isSet(value) || isMap(value)) {
          value.forEach((v) => {
              traverse(v, seen);
          });
      }
      else if (isPlainObject(value)) {
          for (const key in value) {
              traverse(value[key], seen);
          }
      }
      return value;
  }

  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;

  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a" /* ACTIVATED */, target);
  }
  function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da" /* DEACTIVATED */, target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
      // cache the deactivate branch check wrapper for injected hooks so the same
      // hook can be properly deduped by the scheduler. "__wdc" stands for "with
      // deactivation check".
      const wrappedHook = hook.__wdc ||
          (hook.__wdc = () => {
              // only fire the hook if the target instance is NOT in a deactivated branch.
              let current = target;
              while (current) {
                  if (current.isDeactivated) {
                      return;
                  }
                  current = current.parent;
              }
              hook();
          });
      injectHook(type, wrappedHook, target);
      // In addition to registering it on the target instance, we walk up the parent
      // chain and register it on all ancestor instances that are keep-alive roots.
      // This avoids the need to walk the entire component tree when invoking these
      // hooks, and more importantly, avoids the need to track child components in
      // arrays.
      if (target) {
          let current = target.parent;
          while (current && current.parent) {
              if (isKeepAlive(current.parent.vnode)) {
                  injectToKeepAliveRoot(wrappedHook, type, target, current);
              }
              current = current.parent;
          }
      }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      // injectHook wraps the original for error handling, so make sure to remove
      // the wrapped version.
      const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */);
      onUnmounted(() => {
          remove(keepAliveRoot[type], injected);
      }, target);
  }

  function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
          const hooks = target[type] || (target[type] = []);
          // cache the error handling wrapper for injected hooks so the same hook
          // can be properly deduped by the scheduler. "__weh" stands for "with error
          // handling".
          const wrappedHook = hook.__weh ||
              (hook.__weh = (...args) => {
                  if (target.isUnmounted) {
                      return;
                  }
                  // disable tracking inside all lifecycle hooks
                  // since they can potentially be called inside effects.
                  pauseTracking();
                  // Set currentInstance during hook invocation.
                  // This assumes the hook does not synchronously trigger other hooks, which
                  // can only be false when the user does something really funky.
                  setCurrentInstance(target);
                  const res = callWithAsyncErrorHandling(hook, target, type, args);
                  setCurrentInstance(null);
                  resetTracking();
                  return res;
              });
          if (prepend) {
              hooks.unshift(wrappedHook);
          }
          else {
              hooks.push(wrappedHook);
          }
          return wrappedHook;
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
          warn(`${apiName} is called when there is no active component instance to be ` +
              `associated with. ` +
              `Lifecycle injection APIs can only be used during execution of setup().` +
              (` If you are using async setup(), make sure to register lifecycle ` +
                      `hooks before the first await statement.`
                  ));
      }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => 
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp" /* SERVER_PREFETCH */) &&
      injectHook(lifecycle, hook, target);
  const onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
  const onMounted = createHook("m" /* MOUNTED */);
  const onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
  const onUpdated = createHook("u" /* UPDATED */);
  const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
  const onUnmounted = createHook("um" /* UNMOUNTED */);
  const onServerPrefetch = createHook("sp" /* SERVER_PREFETCH */);
  const onRenderTriggered = createHook("rtg" /* RENDER_TRIGGERED */);
  const onRenderTracked = createHook("rtc" /* RENDER_TRACKED */);
  function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec" /* ERROR_CAPTURED */, hook, target);
  }

  function createDuplicateChecker() {
      const cache = Object.create(null);
      return (type, key) => {
          if (cache[key]) {
              warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
          }
          else {
              cache[key] = type;
          }
      };
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      // do not cache property access on public proxy during state initialization
      shouldCacheAccess = false;
      // call beforeCreate first before accessing other options since
      // the hook may mutate resolved options (#2791)
      if (options.beforeCreate) {
          callHook(options.beforeCreate, instance, "bc" /* BEFORE_CREATE */);
      }
      const { 
      // state
      data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, 
      // lifecycle
      created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, 
      // public API
      expose, inheritAttrs, 
      // assets
      components, directives, filters } = options;
      const checkDuplicateProperties = (process.env.NODE_ENV !== 'production') ? createDuplicateChecker() : null;
      if ((process.env.NODE_ENV !== 'production')) {
          const [propsOptions] = instance.propsOptions;
          if (propsOptions) {
              for (const key in propsOptions) {
                  checkDuplicateProperties("Props" /* PROPS */, key);
              }
          }
      }
      // options initialization order (to be consistent with Vue 2):
      // - props (already done outside of this function)
      // - inject
      // - methods
      // - data (deferred since it relies on `this` access)
      // - computed
      // - watch (deferred since it relies on `this` access)
      if (injectOptions) {
          resolveInjections(injectOptions, ctx, checkDuplicateProperties);
      }
      if (methods) {
          for (const key in methods) {
              const methodHandler = methods[key];
              if (isFunction(methodHandler)) {
                  // In dev mode, we use the `createRenderContext` function to define methods to the proxy target,
                  // and those are read-only but reconfigurable, so it needs to be redefined here
                  if ((process.env.NODE_ENV !== 'production')) {
                      Object.defineProperty(ctx, key, {
                          value: methodHandler.bind(publicThis),
                          configurable: true,
                          enumerable: true,
                          writable: true
                      });
                  }
                  else {
                      ctx[key] = methodHandler.bind(publicThis);
                  }
                  if ((process.env.NODE_ENV !== 'production')) {
                      checkDuplicateProperties("Methods" /* METHODS */, key);
                  }
              }
              else if ((process.env.NODE_ENV !== 'production')) {
                  warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` +
                      `Did you reference the function correctly?`);
              }
          }
      }
      if (dataOptions) {
          if ((process.env.NODE_ENV !== 'production') && !isFunction(dataOptions)) {
              warn(`The data option must be a function. ` +
                  `Plain object usage is no longer supported.`);
          }
          const data = dataOptions.call(publicThis, publicThis);
          if ((process.env.NODE_ENV !== 'production') && isPromise(data)) {
              warn(`data() returned a Promise - note data() cannot be async; If you ` +
                  `intend to perform data fetching before component renders, use ` +
                  `async setup() + <Suspense>.`);
          }
          if (!isObject$1(data)) {
              (process.env.NODE_ENV !== 'production') && warn(`data() should return an object.`);
          }
          else {
              instance.data = reactive(data);
              if ((process.env.NODE_ENV !== 'production')) {
                  for (const key in data) {
                      checkDuplicateProperties("Data" /* DATA */, key);
                      // expose data on ctx during dev
                      if (key[0] !== '$' && key[0] !== '_') {
                          Object.defineProperty(ctx, key, {
                              configurable: true,
                              enumerable: true,
                              get: () => data[key],
                              set: NOOP
                          });
                      }
                  }
              }
          }
      }
      // state initialization complete at this point - start caching access
      shouldCacheAccess = true;
      if (computedOptions) {
          for (const key in computedOptions) {
              const opt = computedOptions[key];
              const get = isFunction(opt)
                  ? opt.bind(publicThis, publicThis)
                  : isFunction(opt.get)
                      ? opt.get.bind(publicThis, publicThis)
                      : NOOP;
              if ((process.env.NODE_ENV !== 'production') && get === NOOP) {
                  warn(`Computed property "${key}" has no getter.`);
              }
              const set = !isFunction(opt) && isFunction(opt.set)
                  ? opt.set.bind(publicThis)
                  : (process.env.NODE_ENV !== 'production')
                      ? () => {
                          warn(`Write operation failed: computed property "${key}" is readonly.`);
                      }
                      : NOOP;
              const c = computed({
                  get,
                  set
              });
              Object.defineProperty(ctx, key, {
                  enumerable: true,
                  configurable: true,
                  get: () => c.value,
                  set: v => (c.value = v)
              });
              if ((process.env.NODE_ENV !== 'production')) {
                  checkDuplicateProperties("Computed" /* COMPUTED */, key);
              }
          }
      }
      if (watchOptions) {
          for (const key in watchOptions) {
              createWatcher(watchOptions[key], ctx, publicThis, key);
          }
      }
      if (provideOptions) {
          const provides = isFunction(provideOptions)
              ? provideOptions.call(publicThis)
              : provideOptions;
          Reflect.ownKeys(provides).forEach(key => {
              provide(key, provides[key]);
          });
      }
      if (created) {
          callHook(created, instance, "c" /* CREATED */);
      }
      function registerLifecycleHook(register, hook) {
          if (isArray(hook)) {
              hook.forEach(_hook => register(_hook.bind(publicThis)));
          }
          else if (hook) {
              register(hook.bind(publicThis));
          }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (isArray(expose)) {
          if (expose.length) {
              const exposed = instance.exposed || (instance.exposed = proxyRefs({}));
              expose.forEach(key => {
                  exposed[key] = toRef(publicThis, key);
              });
          }
          else if (!instance.exposed) {
              instance.exposed = EMPTY_OBJ;
          }
      }
      // options that are handled when creating the instance but also need to be
      // applied from mixins
      if (render && instance.render === NOOP) {
          instance.render = render;
      }
      if (inheritAttrs != null) {
          instance.inheritAttrs = inheritAttrs;
      }
      // asset options.
      if (components)
          instance.components = components;
      if (directives)
          instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
      if (isArray(injectOptions)) {
          injectOptions = normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
          const opt = injectOptions[key];
          if (isObject$1(opt)) {
              if ('default' in opt) {
                  ctx[key] = inject(opt.from || key, opt.default, true /* treat default function as factory */);
              }
              else {
                  ctx[key] = inject(opt.from || key);
              }
          }
          else {
              ctx[key] = inject(opt);
          }
          if ((process.env.NODE_ENV !== 'production')) {
              checkDuplicateProperties("Inject" /* INJECT */, key);
          }
      }
  }
  function callHook(hook, instance, type) {
      callWithAsyncErrorHandling(isArray(hook)
          ? hook.map(h => h.bind(instance.proxy))
          : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
      const getter = key.includes('.')
          ? createPathGetter(publicThis, key)
          : () => publicThis[key];
      if (isString(raw)) {
          const handler = ctx[raw];
          if (isFunction(handler)) {
              watch(getter, handler);
          }
          else if ((process.env.NODE_ENV !== 'production')) {
              warn(`Invalid watch handler specified by key "${raw}"`, handler);
          }
      }
      else if (isFunction(raw)) {
          watch(getter, raw.bind(publicThis));
      }
      else if (isObject$1(raw)) {
          if (isArray(raw)) {
              raw.forEach(r => createWatcher(r, ctx, publicThis, key));
          }
          else {
              const handler = isFunction(raw.handler)
                  ? raw.handler.bind(publicThis)
                  : ctx[raw.handler];
              if (isFunction(handler)) {
                  watch(getter, handler, raw);
              }
              else if ((process.env.NODE_ENV !== 'production')) {
                  warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
              }
          }
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          warn(`Invalid watch option: "${key}"`, raw);
      }
  }
  /**
   * Resolve merged options and cache it on the component.
   * This is done only once per-component since the merging does not involve
   * instances.
   */
  function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
          resolved = cached;
      }
      else if (!globalMixins.length && !mixins && !extendsOptions) {
          {
              resolved = base;
          }
      }
      else {
          resolved = {};
          if (globalMixins.length) {
              globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
          }
          mergeOptions(resolved, base, optionMergeStrategies);
      }
      cache.set(base, resolved);
      return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
          mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
          mixins.forEach((m) => mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
          if (asMixin && key === 'expose') {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`"expose" option is ignored when declared in mixins or extends. ` +
                      `It should only be declared in the base component itself.`);
          }
          else {
              const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
              to[key] = strat ? strat(to[key], from[key]) : from[key];
          }
      }
      return to;
  }
  const internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      destroyed: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
  };
  function mergeDataFn(to, from) {
      if (!from) {
          return to;
      }
      if (!to) {
          return from;
      }
      return function mergedDataFn() {
          return (extend)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
      };
  }
  function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
      if (isArray(raw)) {
          const res = {};
          for (let i = 0; i < raw.length; i++) {
              res[raw[i]] = raw[i];
          }
          return res;
      }
      return raw;
  }
  function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
      return to ? extend(extend(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
      if (!to)
          return from;
      if (!from)
          return to;
      const merged = extend(Object.create(null), to);
      for (const key in from) {
          merged[key] = mergeAsArray(to[key], from[key]);
      }
      return merged;
  }

  function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
  isSSR = false) {
      const props = {};
      const attrs = {};
      def(attrs, InternalObjectKey, 1);
      instance.propsDefaults = Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      // ensure all declared prop keys are present
      for (const key in instance.propsOptions[0]) {
          if (!(key in props)) {
              props[key] = undefined;
          }
      }
      // validation
      if ((process.env.NODE_ENV !== 'production')) {
          validateProps(rawProps || {}, props, instance);
      }
      if (isStateful) {
          // stateful
          instance.props = isSSR ? props : shallowReactive(props);
      }
      else {
          if (!instance.type.props) {
              // functional w/ optional props, props === attrs
              instance.props = attrs;
          }
          else {
              // functional w/ declared props
              instance.props = props;
          }
      }
      instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const { props, attrs, vnode: { patchFlag } } = instance;
      const rawCurrentProps = toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !((process.env.NODE_ENV !== 'production') &&
          (instance.type.__hmrId ||
              (instance.parent && instance.parent.type.__hmrId))) &&
          (optimized || patchFlag > 0) &&
          !(patchFlag & 16 /* FULL_PROPS */)) {
          if (patchFlag & 8 /* PROPS */) {
              // Compiler-generated props & no keys change, just set the updated
              // the props.
              const propsToUpdate = instance.vnode.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                  let key = propsToUpdate[i];
                  // PROPS flag guarantees rawProps to be non-null
                  const value = rawProps[key];
                  if (options) {
                      // attr / props separation was done on init and will be consistent
                      // in this code path, so just check if attrs have it.
                      if (hasOwn$1(attrs, key)) {
                          if (value !== attrs[key]) {
                              attrs[key] = value;
                              hasAttrsChanged = true;
                          }
                      }
                      else {
                          const camelizedKey = camelize(key);
                          props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false /* isAbsent */);
                      }
                  }
                  else {
                      if (value !== attrs[key]) {
                          attrs[key] = value;
                          hasAttrsChanged = true;
                      }
                  }
              }
          }
      }
      else {
          // full props update.
          if (setFullProps(instance, rawProps, props, attrs)) {
              hasAttrsChanged = true;
          }
          // in case of dynamic props, check if we need to delete keys from
          // the props object
          let kebabKey;
          for (const key in rawCurrentProps) {
              if (!rawProps ||
                  // for camelCase
                  (!hasOwn$1(rawProps, key) &&
                      // it's possible the original props was passed in as kebab-case
                      // and converted to camelCase (#955)
                      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey)))) {
                  if (options) {
                      if (rawPrevProps &&
                          // for camelCase
                          (rawPrevProps[key] !== undefined ||
                              // for kebab-case
                              rawPrevProps[kebabKey] !== undefined)) {
                          props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true /* isAbsent */);
                      }
                  }
                  else {
                      delete props[key];
                  }
              }
          }
          // in the case of functional component w/o props declaration, props and
          // attrs point to the same object so it should already have been updated.
          if (attrs !== rawCurrentProps) {
              for (const key in attrs) {
                  if (!rawProps || !hasOwn$1(rawProps, key)) {
                      delete attrs[key];
                      hasAttrsChanged = true;
                  }
              }
          }
      }
      // trigger updates for $attrs in case it's used in component slots
      if (hasAttrsChanged) {
          trigger(instance, "set" /* SET */, '$attrs');
      }
      if ((process.env.NODE_ENV !== 'production')) {
          validateProps(rawProps || {}, props, instance);
      }
  }
  function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
          for (let key in rawProps) {
              // key, ref are reserved and never passed down
              if (isReservedProp(key)) {
                  continue;
              }
              const value = rawProps[key];
              // prop option names are camelized during normalization, so to support
              // kebab -> camel conversion here we need to camelize the key.
              let camelKey;
              if (options && hasOwn$1(options, (camelKey = camelize(key)))) {
                  if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                      props[camelKey] = value;
                  }
                  else {
                      (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                  }
              }
              else if (!isEmitListener(instance.emitsOptions, key)) {
                  if (value !== attrs[key]) {
                      attrs[key] = value;
                      hasAttrsChanged = true;
                  }
              }
          }
      }
      if (needCastKeys) {
          const rawCurrentProps = toRaw(props);
          const castValues = rawCastValues || EMPTY_OBJ;
          for (let i = 0; i < needCastKeys.length; i++) {
              const key = needCastKeys[i];
              props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
          }
      }
      return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
      const opt = options[key];
      if (opt != null) {
          const hasDefault = hasOwn$1(opt, 'default');
          // default values
          if (hasDefault && value === undefined) {
              const defaultValue = opt.default;
              if (opt.type !== Function && isFunction(defaultValue)) {
                  const { propsDefaults } = instance;
                  if (key in propsDefaults) {
                      value = propsDefaults[key];
                  }
                  else {
                      setCurrentInstance(instance);
                      value = propsDefaults[key] = defaultValue.call(null, props);
                      setCurrentInstance(null);
                  }
              }
              else {
                  value = defaultValue;
              }
          }
          // boolean casting
          if (opt[0 /* shouldCast */]) {
              if (isAbsent && !hasDefault) {
                  value = false;
              }
              else if (opt[1 /* shouldCastTrue */] &&
                  (value === '' || value === hyphenate(key))) {
                  value = true;
              }
          }
      }
      return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
          return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      // apply mixin/extends props
      let hasExtends = false;
      if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
          const extendProps = (raw) => {
              hasExtends = true;
              const [props, keys] = normalizePropsOptions(raw, appContext, true);
              extend(normalized, props);
              if (keys)
                  needCastKeys.push(...keys);
          };
          if (!asMixin && appContext.mixins.length) {
              appContext.mixins.forEach(extendProps);
          }
          if (comp.extends) {
              extendProps(comp.extends);
          }
          if (comp.mixins) {
              comp.mixins.forEach(extendProps);
          }
      }
      if (!raw && !hasExtends) {
          cache.set(comp, EMPTY_ARR);
          return EMPTY_ARR;
      }
      if (isArray(raw)) {
          for (let i = 0; i < raw.length; i++) {
              if ((process.env.NODE_ENV !== 'production') && !isString(raw[i])) {
                  warn(`props must be strings when using array syntax.`, raw[i]);
              }
              const normalizedKey = camelize(raw[i]);
              if (validatePropName(normalizedKey)) {
                  normalized[normalizedKey] = EMPTY_OBJ;
              }
          }
      }
      else if (raw) {
          if ((process.env.NODE_ENV !== 'production') && !isObject$1(raw)) {
              warn(`invalid props options`, raw);
          }
          for (const key in raw) {
              const normalizedKey = camelize(key);
              if (validatePropName(normalizedKey)) {
                  const opt = raw[key];
                  const prop = (normalized[normalizedKey] =
                      isArray(opt) || isFunction(opt) ? { type: opt } : opt);
                  if (prop) {
                      const booleanIndex = getTypeIndex(Boolean, prop.type);
                      const stringIndex = getTypeIndex(String, prop.type);
                      prop[0 /* shouldCast */] = booleanIndex > -1;
                      prop[1 /* shouldCastTrue */] =
                          stringIndex < 0 || booleanIndex < stringIndex;
                      // if the prop needs boolean casting or default value
                      if (booleanIndex > -1 || hasOwn$1(prop, 'default')) {
                          needCastKeys.push(normalizedKey);
                      }
                  }
              }
          }
      }
      const res = [normalized, needCastKeys];
      cache.set(comp, res);
      return res;
  }
  function validatePropName(key) {
      if (key[0] !== '$') {
          return true;
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          warn(`Invalid prop name: "${key}" is a reserved property.`);
      }
      return false;
  }
  // use function string name to check type constructors
  // so that it works across vms / iframes.
  function getType(ctor) {
      const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : '';
  }
  function isSameType(a, b) {
      return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
      if (isArray(expectedTypes)) {
          return expectedTypes.findIndex(t => isSameType(t, type));
      }
      else if (isFunction(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1;
      }
      return -1;
  }
  /**
   * dev only
   */
  function validateProps(rawProps, props, instance) {
      const resolvedValues = toRaw(props);
      const options = instance.propsOptions[0];
      for (const key in options) {
          let opt = options[key];
          if (opt == null)
              continue;
          validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
      }
  }
  /**
   * dev only
   */
  function validateProp(name, value, prop, isAbsent) {
      const { type, required, validator } = prop;
      // required!
      if (required && isAbsent) {
          warn('Missing required prop: "' + name + '"');
          return;
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
              warn(getInvalidTypeMessage(name, value, expectedTypes));
              return;
          }
      }
      // custom validator
      if (validator && !validator(value)) {
          warn('Invalid prop: custom validator check failed for prop "' + name + '".');
      }
  }
  const isSimpleType = /*#__PURE__*/ makeMap('String,Number,Boolean,Function,Symbol,BigInt');
  /**
   * dev only
   */
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
          valid = value instanceof type;
      }
      return {
          valid,
          expectedType
      };
  }
  /**
   * dev only
   */
  function getInvalidTypeMessage(name, value, expectedTypes) {
      let message = `Invalid prop: type check failed for prop "${name}".` +
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
  /**
   * dev only
   */
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
  /**
   * dev only
   */
  function isExplicable(type) {
      const explicitTypes = ['string', 'number', 'boolean'];
      return explicitTypes.some(elem => type.toLowerCase() === elem);
  }
  /**
   * dev only
   */
  function isBoolean(...args) {
      return args.some(elem => elem.toLowerCase() === 'boolean');
  }

  const isInternalKey = (key) => key[0] === '_' || key === '$stable';
  const normalizeSlotValue = (value) => isArray(value)
      ? value.map(normalizeVNode)
      : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
      const normalized = withCtx((props) => {
          if ((process.env.NODE_ENV !== 'production') && currentInstance) {
              warn(`Slot "${key}" invoked outside of the render function: ` +
                  `this will not track dependencies used in the slot. ` +
                  `Invoke the slot function inside the render function instead.`);
          }
          return normalizeSlotValue(rawSlot(props));
      }, ctx);
      normalized._c = false;
      return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
          if (isInternalKey(key))
              continue;
          const value = rawSlots[key];
          if (isFunction(value)) {
              slots[key] = normalizeSlot(key, value, ctx);
          }
          else if (value != null) {
              if ((process.env.NODE_ENV !== 'production') &&
                  !(false )) {
                  warn(`Non-function value encountered for slot "${key}". ` +
                      `Prefer function slots for better performance.`);
              }
              const normalized = normalizeSlotValue(value);
              slots[key] = () => normalized;
          }
      }
  };
  const normalizeVNodeSlots = (instance, children) => {
      if ((process.env.NODE_ENV !== 'production') &&
          !isKeepAlive(instance.vnode) &&
          !(false )) {
          warn(`Non-function value encountered for default slot. ` +
              `Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
      if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
          const type = children._;
          if (type) {
              // users can get the shallow readonly version of the slots object through `this.$slots`,
              // we should avoid the proxy object polluting the slots of the internal instance
              instance.slots = toRaw(children);
              // make compiler marker non-enumerable
              def(children, '_', type);
          }
          else {
              normalizeObjectSlots(children, (instance.slots = {}));
          }
      }
      else {
          instance.slots = {};
          if (children) {
              normalizeVNodeSlots(instance, children);
          }
      }
      def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
          const type = children._;
          if (type) {
              // compiled slots.
              if ((process.env.NODE_ENV !== 'production') && isHmrUpdating) {
                  // Parent was HMR updated so slot content may have changed.
                  // force update slots and mark instance for hmr as well
                  extend(slots, children);
              }
              else if (optimized && type === 1 /* STABLE */) {
                  // compiled AND stable.
                  // no need to update, and skip stale slots removal.
                  needDeletionCheck = false;
              }
              else {
                  // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
                  // normalization.
                  extend(slots, children);
                  // #2893
                  // when rendering the optimized slots by manually written render function,
                  // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
                  // i.e. let the `renderSlot` create the bailed Fragment
                  if (!optimized && type === 1 /* STABLE */) {
                      delete slots._;
                  }
              }
          }
          else {
              needDeletionCheck = !children.$stable;
              normalizeObjectSlots(children, slots);
          }
          deletionComparisonTarget = children;
      }
      else if (children) {
          // non slot object children (direct value) passed to a component
          normalizeVNodeSlots(instance, children);
          deletionComparisonTarget = { default: 1 };
      }
      // delete stale slots
      if (needDeletionCheck) {
          for (const key in slots) {
              if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
                  delete slots[key];
              }
          }
      }
  };

  /**
  Runtime helper for applying directives to a vnode. Example usage:

  const comp = resolveComponent('comp')
  const foo = resolveDirective('foo')
  const bar = resolveDirective('bar')

  return withDirectives(h(comp), [
    [foo, this.x],
    [bar, this.y]
  ])
  */
  const isBuiltInDirective = /*#__PURE__*/ makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');
  function validateDirectiveName(name) {
      if (isBuiltInDirective(name)) {
          warn('Do not use built-in directive ids as custom directive id: ' + name);
      }
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
          const binding = bindings[i];
          if (oldBindings) {
              binding.oldValue = oldBindings[i].value;
          }
          let hook = binding.dir[name];
          if (hook) {
              // disable tracking inside all lifecycle hooks
              // since they can potentially be called inside effects.
              pauseTracking();
              callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */, [
                  vnode.el,
                  binding,
                  vnode,
                  prevVNode
              ]);
              resetTracking();
          }
      }
  }

  function createAppContext() {
      return {
          app: null,
          config: {
              isNativeTag: NO,
              performance: false,
              globalProperties: {},
              optionMergeStrategies: {},
              errorHandler: undefined,
              warnHandler: undefined,
              compilerOptions: {}
          },
          mixins: [],
          components: {},
          directives: {},
          provides: Object.create(null),
          optionsCache: new WeakMap(),
          propsCache: new WeakMap(),
          emitsCache: new WeakMap()
      };
  }
  let uid = 0;
  function createAppAPI(render, hydrate) {
      return function createApp(rootComponent, rootProps = null) {
          if (rootProps != null && !isObject$1(rootProps)) {
              (process.env.NODE_ENV !== 'production') && warn(`root props passed to app.mount() must be an object.`);
              rootProps = null;
          }
          const context = createAppContext();
          const installedPlugins = new Set();
          let isMounted = false;
          const app = (context.app = {
              _uid: uid++,
              _component: rootComponent,
              _props: rootProps,
              _container: null,
              _context: context,
              _instance: null,
              version,
              get config() {
                  return context.config;
              },
              set config(v) {
                  if ((process.env.NODE_ENV !== 'production')) {
                      warn(`app.config cannot be replaced. Modify individual options instead.`);
                  }
              },
              use(plugin, ...options) {
                  if (installedPlugins.has(plugin)) {
                      (process.env.NODE_ENV !== 'production') && warn(`Plugin has already been applied to target app.`);
                  }
                  else if (plugin && isFunction(plugin.install)) {
                      installedPlugins.add(plugin);
                      plugin.install(app, ...options);
                  }
                  else if (isFunction(plugin)) {
                      installedPlugins.add(plugin);
                      plugin(app, ...options);
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      warn(`A plugin must either be a function or an object with an "install" ` +
                          `function.`);
                  }
                  return app;
              },
              mixin(mixin) {
                  if (__VUE_OPTIONS_API__) {
                      if (!context.mixins.includes(mixin)) {
                          context.mixins.push(mixin);
                      }
                      else if ((process.env.NODE_ENV !== 'production')) {
                          warn('Mixin has already been applied to target app' +
                              (mixin.name ? `: ${mixin.name}` : ''));
                      }
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      warn('Mixins are only available in builds supporting Options API');
                  }
                  return app;
              },
              component(name, component) {
                  if ((process.env.NODE_ENV !== 'production')) {
                      validateComponentName(name, context.config);
                  }
                  if (!component) {
                      return context.components[name];
                  }
                  if ((process.env.NODE_ENV !== 'production') && context.components[name]) {
                      warn(`Component "${name}" has already been registered in target app.`);
                  }
                  context.components[name] = component;
                  return app;
              },
              directive(name, directive) {
                  if ((process.env.NODE_ENV !== 'production')) {
                      validateDirectiveName(name);
                  }
                  if (!directive) {
                      return context.directives[name];
                  }
                  if ((process.env.NODE_ENV !== 'production') && context.directives[name]) {
                      warn(`Directive "${name}" has already been registered in target app.`);
                  }
                  context.directives[name] = directive;
                  return app;
              },
              mount(rootContainer, isHydrate, isSVG) {
                  if (!isMounted) {
                      const vnode = createVNode(rootComponent, rootProps);
                      // store app context on the root VNode.
                      // this will be set on the root instance on initial mount.
                      vnode.appContext = context;
                      // HMR root reload
                      if ((process.env.NODE_ENV !== 'production')) {
                          context.reload = () => {
                              render(cloneVNode(vnode), rootContainer, isSVG);
                          };
                      }
                      if (isHydrate && hydrate) {
                          hydrate(vnode, rootContainer);
                      }
                      else {
                          render(vnode, rootContainer, isSVG);
                      }
                      isMounted = true;
                      app._container = rootContainer;
                      rootContainer.__vue_app__ = app;
                      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                          app._instance = vnode.component;
                          devtoolsInitApp(app, version);
                      }
                      return vnode.component.proxy;
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      warn(`App has already been mounted.\n` +
                          `If you want to remount the same app, move your app creation logic ` +
                          `into a factory function and create fresh app instances for each ` +
                          `mount - e.g. \`const createMyApp = () => createApp(App)\``);
                  }
              },
              unmount() {
                  if (isMounted) {
                      render(null, app._container);
                      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                          app._instance = null;
                          devtoolsUnmountApp(app);
                      }
                      delete app._container.__vue_app__;
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      warn(`Cannot unmount an app that is not mounted.`);
                  }
              },
              provide(key, value) {
                  if ((process.env.NODE_ENV !== 'production') && key in context.provides) {
                      warn(`App already provides property with key "${String(key)}". ` +
                          `It will be overwritten with the new value.`);
                  }
                  // TypeScript doesn't allow symbols as index type
                  // https://github.com/Microsoft/TypeScript/issues/24587
                  context.provides[key] = value;
                  return app;
              }
          });
          return app;
      };
  }

  let supported;
  let perf;
  function startMeasure(instance, type) {
      if (instance.appContext.config.performance && isSupported()) {
          perf.mark(`vue-${type}-${instance.uid}`);
      }
      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
          devtoolsPerfStart(instance, type, supported ? perf.now() : Date.now());
      }
  }
  function endMeasure(instance, type) {
      if (instance.appContext.config.performance && isSupported()) {
          const startTag = `vue-${type}-${instance.uid}`;
          const endTag = startTag + `:end`;
          perf.mark(endTag);
          perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
          perf.clearMarks(startTag);
          perf.clearMarks(endTag);
      }
      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
          devtoolsPerfEnd(instance, type, supported ? perf.now() : Date.now());
      }
  }
  function isSupported() {
      if (supported !== undefined) {
          return supported;
      }
      /* eslint-disable no-restricted-globals */
      if (typeof window !== 'undefined' && window.performance) {
          supported = true;
          perf = window.performance;
      }
      else {
          supported = false;
      }
      /* eslint-enable no-restricted-globals */
      return supported;
  }

  /**
   * This is only called in esm-bundler builds.
   * It is called when a renderer is created, in `baseCreateRenderer` so that
   * importing runtime-core is side-effects free.
   *
   * istanbul-ignore-next
   */
  function initFeatureFlags() {
      let needWarn = false;
      if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
          needWarn = true;
          getGlobalThis().__VUE_OPTIONS_API__ = true;
      }
      if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
          needWarn = true;
          getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
      }
      if ((process.env.NODE_ENV !== 'production') && needWarn) {
          console.warn(`You are running the esm-bundler build of Vue. It is recommended to ` +
              `configure your bundler to explicitly replace feature flag globals ` +
              `with boolean literals to get proper tree-shaking in the final bundle. ` +
              `See http://link.vuejs.org/feature-flags for more details.`);
      }
  }

  const prodEffectOptions = {
      scheduler: queueJob,
      // #1801, #2043 component render effects should allow recursive updates
      allowRecurse: true
  };
  function createDevEffectOptions(instance) {
      return {
          scheduler: queueJob,
          allowRecurse: true,
          onTrack: instance.rtc ? e => invokeArrayFns$1(instance.rtc, e) : void 0,
          onTrigger: instance.rtg ? e => invokeArrayFns$1(instance.rtg, e) : void 0
      };
  }
  const queuePostRenderEffect = queueEffectWithSuspense
      ;
  const setRef = (rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) => {
      if (isArray(rawRef)) {
          rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
          return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
          // when mounting async components, nothing needs to be done,
          // because the template ref is forwarded to inner component
          return;
      }
      const refValue = vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */
          ? vnode.component.exposed || vnode.component.proxy
          : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref } = rawRef;
      if ((process.env.NODE_ENV !== 'production') && !owner) {
          warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. ` +
              `A vnode with ref must be created inside the render function.`);
          return;
      }
      const oldRef = oldRawRef && oldRawRef.r;
      const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
      const setupState = owner.setupState;
      // dynamic ref changed. unset old ref
      if (oldRef != null && oldRef !== ref) {
          if (isString(oldRef)) {
              refs[oldRef] = null;
              if (hasOwn$1(setupState, oldRef)) {
                  setupState[oldRef] = null;
              }
          }
          else if (isRef(oldRef)) {
              oldRef.value = null;
          }
      }
      if (isString(ref)) {
          const doSet = () => {
              {
                  refs[ref] = value;
              }
              if (hasOwn$1(setupState, ref)) {
                  setupState[ref] = value;
              }
          };
          // #1789: for non-null values, set them after render
          // null values means this is unmount and it should not overwrite another
          // ref with the same key
          if (value) {
              doSet.id = -1;
              queuePostRenderEffect(doSet, parentSuspense);
          }
          else {
              doSet();
          }
      }
      else if (isRef(ref)) {
          const doSet = () => {
              ref.value = value;
          };
          if (value) {
              doSet.id = -1;
              queuePostRenderEffect(doSet, parentSuspense);
          }
          else {
              doSet();
          }
      }
      else if (isFunction(ref)) {
          callWithErrorHandling(ref, owner, 12 /* FUNCTION_REF */, [value, refs]);
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          warn('Invalid template ref type:', value, `(${typeof value})`);
      }
  };
  /**
   * The createRenderer function accepts two generic arguments:
   * HostNode and HostElement, corresponding to Node and Element types in the
   * host environment. For example, for runtime-dom, HostNode would be the DOM
   * `Node` interface and HostElement would be the DOM `Element` interface.
   *
   * Custom renderers can pass in the platform specific types like this:
   *
   * ``` js
   * const { render, createApp } = createRenderer<Node, Element>({
   *   patchProp,
   *   ...nodeOps
   * })
   * ```
   */
  function createRenderer(options) {
      return baseCreateRenderer(options);
  }
  // implementation
  function baseCreateRenderer(options, createHydrationFns) {
      // compile-time feature flags check
      {
          initFeatureFlags();
      }
      if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
          const target = getGlobalThis();
          target.__VUE__ = true;
          setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
      }
      const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, forcePatchProp: hostForcePatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
      // Note: functions inside this closure should use `const xxx = () => {}`
      // style in order to prevent being inlined by minifiers.
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = false) => {
          // patching & not same type, unmount old tree
          if (n1 && !isSameVNodeType(n1, n2)) {
              anchor = getNextHostNode(n1);
              unmount(n1, parentComponent, parentSuspense, true);
              n1 = null;
          }
          if (n2.patchFlag === -2 /* BAIL */) {
              optimized = false;
              n2.dynamicChildren = null;
          }
          const { type, ref, shapeFlag } = n2;
          switch (type) {
              case Text:
                  processText(n1, n2, container, anchor);
                  break;
              case Comment$1:
                  processCommentNode(n1, n2, container, anchor);
                  break;
              case Static:
                  if (n1 == null) {
                      mountStaticNode(n2, container, anchor, isSVG);
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      patchStaticNode(n1, n2, container, isSVG);
                  }
                  break;
              case Fragment:
                  processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  break;
              default:
                  if (shapeFlag & 1 /* ELEMENT */) {
                      processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (shapeFlag & 6 /* COMPONENT */) {
                      processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (shapeFlag & 64 /* TELEPORT */) {
                      type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                  }
                  else if (shapeFlag & 128 /* SUSPENSE */) {
                      type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                  }
                  else if ((process.env.NODE_ENV !== 'production')) {
                      warn('Invalid VNode type:', type, `(${typeof type})`);
                  }
          }
          // set ref
          if (ref != null && parentComponent) {
              setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
          }
      };
      const processText = (n1, n2, container, anchor) => {
          if (n1 == null) {
              hostInsert((n2.el = hostCreateText(n2.children)), container, anchor);
          }
          else {
              const el = (n2.el = n1.el);
              if (n2.children !== n1.children) {
                  hostSetText(el, n2.children);
              }
          }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
          if (n1 == null) {
              hostInsert((n2.el = hostCreateComment(n2.children || '')), container, anchor);
          }
          else {
              // there's no support for dynamic comments
              n2.el = n1.el;
          }
      };
      const mountStaticNode = (n2, container, anchor, isSVG) => {
          [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, 
          // pass cached nodes if the static node is being mounted multiple times
          // so that runtime-dom can simply cloneNode() instead of inserting new
          // HTML
          n2.el && [n2.el, n2.anchor]);
      };
      /**
       * Dev / HMR only
       */
      const patchStaticNode = (n1, n2, container, isSVG) => {
          // static nodes are only patched during dev for HMR
          if (n2.children !== n1.children) {
              const anchor = hostNextSibling(n1.anchor);
              // remove existing
              removeStaticNode(n1);
              [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
          }
          else {
              n2.el = n1.el;
              n2.anchor = n1.anchor;
          }
      };
      const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
          let next;
          while (el && el !== anchor) {
              next = hostNextSibling(el);
              hostInsert(el, container, nextSibling);
              el = next;
          }
          hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el, anchor }) => {
          let next;
          while (el && el !== anchor) {
              next = hostNextSibling(el);
              hostRemove(el);
              el = next;
          }
          hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          isSVG = isSVG || n2.type === 'svg';
          if (n1 == null) {
              mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
          else {
              patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          let el;
          let vnodeHook;
          const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
          if (!(process.env.NODE_ENV !== 'production') &&
              vnode.el &&
              hostCloneNode !== undefined &&
              patchFlag === -1 /* HOISTED */) {
              // If a vnode has non-null el, it means it's being reused.
              // Only static vnodes can be reused, so its mounted DOM nodes should be
              // exactly the same, and we can simply do a clone here.
              // only do this in production since cloned trees cannot be HMR updated.
              el = vnode.el = hostCloneNode(vnode.el);
          }
          else {
              el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
              // mount children first, since some props may rely on child content
              // being already rendered, e.g. `<select value>`
              if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                  hostSetElementText(el, vnode.children);
              }
              else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                  mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized || !!vnode.dynamicChildren);
              }
              if (dirs) {
                  invokeDirectiveHook(vnode, null, parentComponent, 'created');
              }
              // props
              if (props) {
                  for (const key in props) {
                      if (!isReservedProp(key)) {
                          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                      }
                  }
                  if ((vnodeHook = props.onVnodeBeforeMount)) {
                      invokeVNodeHook(vnodeHook, parentComponent, vnode);
                  }
              }
              // scopeId
              setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
          }
          if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
              Object.defineProperty(el, '__vnode', {
                  value: vnode,
                  enumerable: false
              });
              Object.defineProperty(el, '__vueParentComponent', {
                  value: parentComponent,
                  enumerable: false
              });
          }
          if (dirs) {
              invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
          }
          // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
          // #1689 For inside suspense + suspense resolved case, just call it
          const needCallTransitionHooks = (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
              transition &&
              !transition.persisted;
          if (needCallTransitionHooks) {
              transition.beforeEnter(el);
          }
          hostInsert(el, container, anchor);
          if ((vnodeHook = props && props.onVnodeMounted) ||
              needCallTransitionHooks ||
              dirs) {
              queuePostRenderEffect(() => {
                  vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                  needCallTransitionHooks && transition.enter(el);
                  dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
              }, parentSuspense);
          }
      };
      const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
          if (scopeId) {
              hostSetScopeId(el, scopeId);
          }
          if (slotScopeIds) {
              for (let i = 0; i < slotScopeIds.length; i++) {
                  hostSetScopeId(el, slotScopeIds[i]);
              }
          }
          if (parentComponent) {
              let subTree = parentComponent.subTree;
              if ((process.env.NODE_ENV !== 'production') &&
                  subTree.patchFlag > 0 &&
                  subTree.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) {
                  subTree =
                      filterSingleRoot(subTree.children) || subTree;
              }
              if (vnode === subTree) {
                  const parentVNode = parentComponent.vnode;
                  setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
              }
          }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
          for (let i = start; i < children.length; i++) {
              const child = (children[i] = optimized
                  ? cloneIfMounted(children[i])
                  : normalizeVNode(children[i]));
              patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          const el = (n2.el = n1.el);
          let { patchFlag, dynamicChildren, dirs } = n2;
          // #1426 take the old vnode's patch flag into account since user may clone a
          // compiler-generated vnode, which de-opts to FULL_PROPS
          patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */;
          const oldProps = n1.props || EMPTY_OBJ;
          const newProps = n2.props || EMPTY_OBJ;
          let vnodeHook;
          if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
              invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          }
          if (dirs) {
              invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
          }
          if ((process.env.NODE_ENV !== 'production') && isHmrUpdating) {
              // HMR updated, force full diff
              patchFlag = 0;
              optimized = false;
              dynamicChildren = null;
          }
          if (patchFlag > 0) {
              // the presence of a patchFlag means this element's render code was
              // generated by the compiler and can take the fast path.
              // in this path old node and new node are guaranteed to have the same shape
              // (i.e. at the exact same position in the source template)
              if (patchFlag & 16 /* FULL_PROPS */) {
                  // element props contain dynamic keys, full diff needed
                  patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
              }
              else {
                  // class
                  // this flag is matched when the element has dynamic class bindings.
                  if (patchFlag & 2 /* CLASS */) {
                      if (oldProps.class !== newProps.class) {
                          hostPatchProp(el, 'class', null, newProps.class, isSVG);
                      }
                  }
                  // style
                  // this flag is matched when the element has dynamic style bindings
                  if (patchFlag & 4 /* STYLE */) {
                      hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
                  }
                  // props
                  // This flag is matched when the element has dynamic prop/attr bindings
                  // other than class and style. The keys of dynamic prop/attrs are saved for
                  // faster iteration.
                  // Note dynamic keys like :[foo]="bar" will cause this optimization to
                  // bail out and go through a full diff because we need to unset the old key
                  if (patchFlag & 8 /* PROPS */) {
                      // if the flag is present then dynamicProps must be non-null
                      const propsToUpdate = n2.dynamicProps;
                      for (let i = 0; i < propsToUpdate.length; i++) {
                          const key = propsToUpdate[i];
                          const prev = oldProps[key];
                          const next = newProps[key];
                          if (next !== prev ||
                              (hostForcePatchProp && hostForcePatchProp(el, key))) {
                              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                          }
                      }
                  }
              }
              // text
              // This flag is matched when the element has only dynamic text children.
              if (patchFlag & 1 /* TEXT */) {
                  if (n1.children !== n2.children) {
                      hostSetElementText(el, n2.children);
                  }
              }
          }
          else if (!optimized && dynamicChildren == null) {
              // unoptimized, full diff
              patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
          }
          const areChildrenSVG = isSVG && n2.type !== 'foreignObject';
          if (dynamicChildren) {
              patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
              if ((process.env.NODE_ENV !== 'production') && parentComponent && parentComponent.type.__hmrId) {
                  traverseStaticChildren(n1, n2);
              }
          }
          else if (!optimized) {
              // full diff
              patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
          }
          if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
              queuePostRenderEffect(() => {
                  vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                  dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
              }, parentSuspense);
          }
      };
      // The fast path for blocks.
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
          for (let i = 0; i < newChildren.length; i++) {
              const oldVNode = oldChildren[i];
              const newVNode = newChildren[i];
              // Determine the container (parent element) for the patch.
              const container = 
              // oldVNode may be an errored async setup() component inside Suspense
              // which will not have a mounted element
              oldVNode.el &&
                  // - In the case of a Fragment, we need to provide the actual parent
                  // of the Fragment itself so it can move its children.
                  (oldVNode.type === Fragment ||
                      // - In the case of different nodes, there is going to be a replacement
                      // which also requires the correct parent container
                      !isSameVNodeType(oldVNode, newVNode) ||
                      // - In the case of a component, it could contain anything.
                      oldVNode.shapeFlag & 6 /* COMPONENT */ ||
                      oldVNode.shapeFlag & 64 /* TELEPORT */)
                  ? hostParentNode(oldVNode.el)
                  : // In other cases, the parent container is not actually used so we
                      // just pass the block element here to avoid a DOM parentNode call.
                      fallbackContainer;
              patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
          }
      };
      const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
          if (oldProps !== newProps) {
              for (const key in newProps) {
                  // empty string is not valid prop
                  if (isReservedProp(key))
                      continue;
                  const next = newProps[key];
                  const prev = oldProps[key];
                  if (next !== prev ||
                      (hostForcePatchProp && hostForcePatchProp(el, key))) {
                      hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                  }
              }
              if (oldProps !== EMPTY_OBJ) {
                  for (const key in oldProps) {
                      if (!isReservedProp(key) && !(key in newProps)) {
                          hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                      }
                  }
              }
          }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''));
          const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''));
          let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
          if (dynamicChildren) {
              optimized = true;
          }
          // check if this is a slot fragment with :slotted scope ids
          if (fragmentSlotScopeIds) {
              slotScopeIds = slotScopeIds
                  ? slotScopeIds.concat(fragmentSlotScopeIds)
                  : fragmentSlotScopeIds;
          }
          if ((process.env.NODE_ENV !== 'production') && isHmrUpdating) {
              // HMR updated, force full diff
              patchFlag = 0;
              optimized = false;
              dynamicChildren = null;
          }
          if (n1 == null) {
              hostInsert(fragmentStartAnchor, container, anchor);
              hostInsert(fragmentEndAnchor, container, anchor);
              // a fragment can only have array children
              // since they are either generated by the compiler, or implicitly created
              // from arrays.
              mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
          else {
              if (patchFlag > 0 &&
                  patchFlag & 64 /* STABLE_FRAGMENT */ &&
                  dynamicChildren &&
                  // #2715 the previous fragment could've been a BAILed one as a result
                  // of renderSlot() with no valid children
                  n1.dynamicChildren) {
                  // a stable fragment (template root or <template v-for>) doesn't need to
                  // patch children order, but it may contain dynamicChildren.
                  patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
                  if ((process.env.NODE_ENV !== 'production') && parentComponent && parentComponent.type.__hmrId) {
                      traverseStaticChildren(n1, n2);
                  }
                  else if (
                  // #2080 if the stable fragment has a key, it's a <template v-for> that may
                  //  get moved around. Make sure all root level vnodes inherit el.
                  // #2134 or if it's a component root, it may also get moved around
                  // as the component is being moved.
                  n2.key != null ||
                      (parentComponent && n2 === parentComponent.subTree)) {
                      traverseStaticChildren(n1, n2, true /* shallow */);
                  }
              }
              else {
                  // keyed / unkeyed, or manual fragments.
                  // for keyed & unkeyed, since they are compiler generated from v-for,
                  // each child is guaranteed to be a block so the fragment will never
                  // have dynamicChildren.
                  patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              }
          }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          n2.slotScopeIds = slotScopeIds;
          if (n1 == null) {
              if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
                  parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
              }
              else {
                  mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
              }
          }
          else {
              updateComponent(n1, n2, optimized);
          }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
          const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));
          if ((process.env.NODE_ENV !== 'production') && instance.type.__hmrId) {
              registerHMR(instance);
          }
          if ((process.env.NODE_ENV !== 'production')) {
              pushWarningContext(initialVNode);
              startMeasure(instance, `mount`);
          }
          // inject renderer internals for keepAlive
          if (isKeepAlive(initialVNode)) {
              instance.ctx.renderer = internals;
          }
          // resolve props and slots for setup context
          {
              if ((process.env.NODE_ENV !== 'production')) {
                  startMeasure(instance, `init`);
              }
              setupComponent(instance);
              if ((process.env.NODE_ENV !== 'production')) {
                  endMeasure(instance, `init`);
              }
          }
          // setup() is async. This component relies on async logic to be resolved
          // before proceeding
          if (instance.asyncDep) {
              parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
              // Give it a placeholder if this is not hydration
              // TODO handle self-defined fallback
              if (!initialVNode.el) {
                  const placeholder = (instance.subTree = createVNode(Comment$1));
                  processCommentNode(null, placeholder, container, anchor);
              }
              return;
          }
          setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
          if ((process.env.NODE_ENV !== 'production')) {
              popWarningContext();
              endMeasure(instance, `mount`);
          }
      };
      const updateComponent = (n1, n2, optimized) => {
          const instance = (n2.component = n1.component);
          if (shouldUpdateComponent(n1, n2, optimized)) {
              if (instance.asyncDep &&
                  !instance.asyncResolved) {
                  // async & still pending - just update props and slots
                  // since the component's reactive effect for render isn't set-up yet
                  if ((process.env.NODE_ENV !== 'production')) {
                      pushWarningContext(n2);
                  }
                  updateComponentPreRender(instance, n2, optimized);
                  if ((process.env.NODE_ENV !== 'production')) {
                      popWarningContext();
                  }
                  return;
              }
              else {
                  // normal update
                  instance.next = n2;
                  // in case the child component is also queued, remove it to avoid
                  // double updating the same child component in the same flush.
                  invalidateJob(instance.update);
                  // instance.update is the reactive effect runner.
                  instance.update();
              }
          }
          else {
              // no update needed. just copy over properties
              n2.component = n1.component;
              n2.el = n1.el;
              instance.vnode = n2;
          }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
          // create reactive effect for rendering
          instance.update = effect(function componentEffect() {
              if (!instance.isMounted) {
                  let vnodeHook;
                  const { el, props } = initialVNode;
                  const { bm, m, parent } = instance;
                  // beforeMount hook
                  if (bm) {
                      invokeArrayFns$1(bm);
                  }
                  // onVnodeBeforeMount
                  if ((vnodeHook = props && props.onVnodeBeforeMount)) {
                      invokeVNodeHook(vnodeHook, parent, initialVNode);
                  }
                  if (el && hydrateNode) {
                      // vnode has adopted host node - perform hydration instead of mount.
                      const hydrateSubTree = () => {
                          if ((process.env.NODE_ENV !== 'production')) {
                              startMeasure(instance, `render`);
                          }
                          instance.subTree = renderComponentRoot(instance);
                          if ((process.env.NODE_ENV !== 'production')) {
                              endMeasure(instance, `render`);
                          }
                          if ((process.env.NODE_ENV !== 'production')) {
                              startMeasure(instance, `hydrate`);
                          }
                          hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                          if ((process.env.NODE_ENV !== 'production')) {
                              endMeasure(instance, `hydrate`);
                          }
                      };
                      if (isAsyncWrapper(initialVNode)) {
                          initialVNode.type.__asyncLoader().then(
                          // note: we are moving the render call into an async callback,
                          // which means it won't track dependencies - but it's ok because
                          // a server-rendered async wrapper is already in resolved state
                          // and it will never need to change.
                          () => !instance.isUnmounted && hydrateSubTree());
                      }
                      else {
                          hydrateSubTree();
                      }
                  }
                  else {
                      if ((process.env.NODE_ENV !== 'production')) {
                          startMeasure(instance, `render`);
                      }
                      const subTree = (instance.subTree = renderComponentRoot(instance));
                      if ((process.env.NODE_ENV !== 'production')) {
                          endMeasure(instance, `render`);
                      }
                      if ((process.env.NODE_ENV !== 'production')) {
                          startMeasure(instance, `patch`);
                      }
                      patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                      if ((process.env.NODE_ENV !== 'production')) {
                          endMeasure(instance, `patch`);
                      }
                      initialVNode.el = subTree.el;
                  }
                  // mounted hook
                  if (m) {
                      queuePostRenderEffect(m, parentSuspense);
                  }
                  // onVnodeMounted
                  if ((vnodeHook = props && props.onVnodeMounted)) {
                      const scopedInitialVNode = initialVNode;
                      queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                  }
                  // activated hook for keep-alive roots.
                  // #1742 activated hook must be accessed after first render
                  // since the hook may be injected by a child keep-alive
                  if (initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
                      instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                  }
                  instance.isMounted = true;
                  if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                      devtoolsComponentAdded(instance);
                  }
                  // #2458: deference mount-only object parameters to prevent memleaks
                  initialVNode = container = anchor = null;
              }
              else {
                  // updateComponent
                  // This is triggered by mutation of component's own state (next: null)
                  // OR parent calling processComponent (next: VNode)
                  let { next, bu, u, parent, vnode } = instance;
                  let originNext = next;
                  let vnodeHook;
                  if ((process.env.NODE_ENV !== 'production')) {
                      pushWarningContext(next || instance.vnode);
                  }
                  if (next) {
                      next.el = vnode.el;
                      updateComponentPreRender(instance, next, optimized);
                  }
                  else {
                      next = vnode;
                  }
                  // beforeUpdate hook
                  if (bu) {
                      invokeArrayFns$1(bu);
                  }
                  // onVnodeBeforeUpdate
                  if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
                      invokeVNodeHook(vnodeHook, parent, next, vnode);
                  }
                  // render
                  if ((process.env.NODE_ENV !== 'production')) {
                      startMeasure(instance, `render`);
                  }
                  const nextTree = renderComponentRoot(instance);
                  if ((process.env.NODE_ENV !== 'production')) {
                      endMeasure(instance, `render`);
                  }
                  const prevTree = instance.subTree;
                  instance.subTree = nextTree;
                  if ((process.env.NODE_ENV !== 'production')) {
                      startMeasure(instance, `patch`);
                  }
                  patch(prevTree, nextTree, 
                  // parent may have changed if it's in a teleport
                  hostParentNode(prevTree.el), 
                  // anchor may have changed if it's in a fragment
                  getNextHostNode(prevTree), instance, parentSuspense, isSVG);
                  if ((process.env.NODE_ENV !== 'production')) {
                      endMeasure(instance, `patch`);
                  }
                  next.el = nextTree.el;
                  if (originNext === null) {
                      // self-triggered update. In case of HOC, update parent component
                      // vnode el. HOC is indicated by parent instance's subTree pointing
                      // to child component's vnode
                      updateHOCHostEl(instance, nextTree.el);
                  }
                  // updated hook
                  if (u) {
                      queuePostRenderEffect(u, parentSuspense);
                  }
                  // onVnodeUpdated
                  if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
                      queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
                  }
                  if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                      devtoolsComponentUpdated(instance);
                  }
                  if ((process.env.NODE_ENV !== 'production')) {
                      popWarningContext();
                  }
              }
          }, (process.env.NODE_ENV !== 'production') ? createDevEffectOptions(instance) : prodEffectOptions);
          if ((process.env.NODE_ENV !== 'production')) {
              // @ts-ignore
              instance.update.ownerInstance = instance;
          }
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
          nextVNode.component = instance;
          const prevProps = instance.vnode.props;
          instance.vnode = nextVNode;
          instance.next = null;
          updateProps(instance, nextVNode.props, prevProps, optimized);
          updateSlots(instance, nextVNode.children, optimized);
          pauseTracking();
          // props update may have triggered pre-flush watchers.
          // flush them before the render update.
          flushPreFlushCbs(undefined, instance.update);
          resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
          const c1 = n1 && n1.children;
          const prevShapeFlag = n1 ? n1.shapeFlag : 0;
          const c2 = n2.children;
          const { patchFlag, shapeFlag } = n2;
          // fast path
          if (patchFlag > 0) {
              if (patchFlag & 128 /* KEYED_FRAGMENT */) {
                  // this could be either fully-keyed or mixed (some keyed some not)
                  // presence of patchFlag means children are guaranteed to be arrays
                  patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  return;
              }
              else if (patchFlag & 256 /* UNKEYED_FRAGMENT */) {
                  // unkeyed
                  patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  return;
              }
          }
          // children has 3 possibilities: text, array or no children.
          if (shapeFlag & 8 /* TEXT_CHILDREN */) {
              // text children fast path
              if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                  unmountChildren(c1, parentComponent, parentSuspense);
              }
              if (c2 !== c1) {
                  hostSetElementText(container, c2);
              }
          }
          else {
              if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                  // prev children was array
                  if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                      // two arrays, cannot assume anything, do full diff
                      patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else {
                      // no new children, just unmount old
                      unmountChildren(c1, parentComponent, parentSuspense, true);
                  }
              }
              else {
                  // prev children was text OR null
                  // new children is array OR null
                  if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
                      hostSetElementText(container, '');
                  }
                  // mount new if array
                  if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
              }
          }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          c1 = c1 || EMPTY_ARR;
          c2 = c2 || EMPTY_ARR;
          const oldLength = c1.length;
          const newLength = c2.length;
          const commonLength = Math.min(oldLength, newLength);
          let i;
          for (i = 0; i < commonLength; i++) {
              const nextChild = (c2[i] = optimized
                  ? cloneIfMounted(c2[i])
                  : normalizeVNode(c2[i]));
              patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
          if (oldLength > newLength) {
              // remove old
              unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
          }
          else {
              // mount new
              mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
          }
      };
      // can be all-keyed or mixed
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
          let i = 0;
          const l2 = c2.length;
          let e1 = c1.length - 1; // prev ending index
          let e2 = l2 - 1; // next ending index
          // 1. sync from start
          // (a b) c
          // (a b) d e
          while (i <= e1 && i <= e2) {
              const n1 = c1[i];
              const n2 = (c2[i] = optimized
                  ? cloneIfMounted(c2[i])
                  : normalizeVNode(c2[i]));
              if (isSameVNodeType(n1, n2)) {
                  patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              }
              else {
                  break;
              }
              i++;
          }
          // 2. sync from end
          // a (b c)
          // d e (b c)
          while (i <= e1 && i <= e2) {
              const n1 = c1[e1];
              const n2 = (c2[e2] = optimized
                  ? cloneIfMounted(c2[e2])
                  : normalizeVNode(c2[e2]));
              if (isSameVNodeType(n1, n2)) {
                  patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              }
              else {
                  break;
              }
              e1--;
              e2--;
          }
          // 3. common sequence + mount
          // (a b)
          // (a b) c
          // i = 2, e1 = 1, e2 = 2
          // (a b)
          // c (a b)
          // i = 0, e1 = -1, e2 = 0
          if (i > e1) {
              if (i <= e2) {
                  const nextPos = e2 + 1;
                  const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                  while (i <= e2) {
                      patch(null, (c2[i] = optimized
                          ? cloneIfMounted(c2[i])
                          : normalizeVNode(c2[i])), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                      i++;
                  }
              }
          }
          // 4. common sequence + unmount
          // (a b) c
          // (a b)
          // i = 2, e1 = 2, e2 = 1
          // a (b c)
          // (b c)
          // i = 0, e1 = 0, e2 = -1
          else if (i > e2) {
              while (i <= e1) {
                  unmount(c1[i], parentComponent, parentSuspense, true);
                  i++;
              }
          }
          // 5. unknown sequence
          // [i ... e1 + 1]: a b [c d e] f g
          // [i ... e2 + 1]: a b [e d c h] f g
          // i = 2, e1 = 4, e2 = 5
          else {
              const s1 = i; // prev starting index
              const s2 = i; // next starting index
              // 5.1 build key:index map for newChildren
              const keyToNewIndexMap = new Map();
              for (i = s2; i <= e2; i++) {
                  const nextChild = (c2[i] = optimized
                      ? cloneIfMounted(c2[i])
                      : normalizeVNode(c2[i]));
                  if (nextChild.key != null) {
                      if ((process.env.NODE_ENV !== 'production') && keyToNewIndexMap.has(nextChild.key)) {
                          warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                      }
                      keyToNewIndexMap.set(nextChild.key, i);
                  }
              }
              // 5.2 loop through old children left to be patched and try to patch
              // matching nodes & remove nodes that are no longer present
              let j;
              let patched = 0;
              const toBePatched = e2 - s2 + 1;
              let moved = false;
              // used to track whether any node has moved
              let maxNewIndexSoFar = 0;
              // works as Map<newIndex, oldIndex>
              // Note that oldIndex is offset by +1
              // and oldIndex = 0 is a special value indicating the new node has
              // no corresponding old node.
              // used for determining longest stable subsequence
              const newIndexToOldIndexMap = new Array(toBePatched);
              for (i = 0; i < toBePatched; i++)
                  newIndexToOldIndexMap[i] = 0;
              for (i = s1; i <= e1; i++) {
                  const prevChild = c1[i];
                  if (patched >= toBePatched) {
                      // all new children have been patched so this can only be a removal
                      unmount(prevChild, parentComponent, parentSuspense, true);
                      continue;
                  }
                  let newIndex;
                  if (prevChild.key != null) {
                      newIndex = keyToNewIndexMap.get(prevChild.key);
                  }
                  else {
                      // key-less node, try to locate a key-less node of the same type
                      for (j = s2; j <= e2; j++) {
                          if (newIndexToOldIndexMap[j - s2] === 0 &&
                              isSameVNodeType(prevChild, c2[j])) {
                              newIndex = j;
                              break;
                          }
                      }
                  }
                  if (newIndex === undefined) {
                      unmount(prevChild, parentComponent, parentSuspense, true);
                  }
                  else {
                      newIndexToOldIndexMap[newIndex - s2] = i + 1;
                      if (newIndex >= maxNewIndexSoFar) {
                          maxNewIndexSoFar = newIndex;
                      }
                      else {
                          moved = true;
                      }
                      patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                      patched++;
                  }
              }
              // 5.3 move and mount
              // generate longest stable subsequence only when nodes have moved
              const increasingNewIndexSequence = moved
                  ? getSequence(newIndexToOldIndexMap)
                  : EMPTY_ARR;
              j = increasingNewIndexSequence.length - 1;
              // looping backwards so that we can use last patched node as anchor
              for (i = toBePatched - 1; i >= 0; i--) {
                  const nextIndex = s2 + i;
                  const nextChild = c2[nextIndex];
                  const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                  if (newIndexToOldIndexMap[i] === 0) {
                      // mount new
                      patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                  }
                  else if (moved) {
                      // move if:
                      // There is no stable subsequence (e.g. a reverse)
                      // OR current node is not among the stable sequence
                      if (j < 0 || i !== increasingNewIndexSequence[j]) {
                          move(nextChild, container, anchor, 2 /* REORDER */);
                      }
                      else {
                          j--;
                      }
                  }
              }
          }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
          const { el, type, transition, children, shapeFlag } = vnode;
          if (shapeFlag & 6 /* COMPONENT */) {
              move(vnode.component.subTree, container, anchor, moveType);
              return;
          }
          if (shapeFlag & 128 /* SUSPENSE */) {
              vnode.suspense.move(container, anchor, moveType);
              return;
          }
          if (shapeFlag & 64 /* TELEPORT */) {
              type.move(vnode, container, anchor, internals);
              return;
          }
          if (type === Fragment) {
              hostInsert(el, container, anchor);
              for (let i = 0; i < children.length; i++) {
                  move(children[i], container, anchor, moveType);
              }
              hostInsert(vnode.anchor, container, anchor);
              return;
          }
          if (type === Static) {
              moveStaticNode(vnode, container, anchor);
              return;
          }
          // single nodes
          const needTransition = moveType !== 2 /* REORDER */ &&
              shapeFlag & 1 /* ELEMENT */ &&
              transition;
          if (needTransition) {
              if (moveType === 0 /* ENTER */) {
                  transition.beforeEnter(el);
                  hostInsert(el, container, anchor);
                  queuePostRenderEffect(() => transition.enter(el), parentSuspense);
              }
              else {
                  const { leave, delayLeave, afterLeave } = transition;
                  const remove = () => hostInsert(el, container, anchor);
                  const performLeave = () => {
                      leave(el, () => {
                          remove();
                          afterLeave && afterLeave();
                      });
                  };
                  if (delayLeave) {
                      delayLeave(el, remove, performLeave);
                  }
                  else {
                      performLeave();
                  }
              }
          }
          else {
              hostInsert(el, container, anchor);
          }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
          const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
          // unset ref
          if (ref != null) {
              setRef(ref, null, parentSuspense, vnode, true);
          }
          if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
              parentComponent.ctx.deactivate(vnode);
              return;
          }
          const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */ && dirs;
          let vnodeHook;
          if ((vnodeHook = props && props.onVnodeBeforeUnmount)) {
              invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
          if (shapeFlag & 6 /* COMPONENT */) {
              unmountComponent(vnode.component, parentSuspense, doRemove);
          }
          else {
              if (shapeFlag & 128 /* SUSPENSE */) {
                  vnode.suspense.unmount(parentSuspense, doRemove);
                  return;
              }
              if (shouldInvokeDirs) {
                  invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
              }
              if (shapeFlag & 64 /* TELEPORT */) {
                  vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
              }
              else if (dynamicChildren &&
                  // #1153: fast path should not be taken for non-stable (v-for) fragments
                  (type !== Fragment ||
                      (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */))) {
                  // fast path for block nodes: only need to unmount dynamic children.
                  unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
              }
              else if ((type === Fragment &&
                  (patchFlag & 128 /* KEYED_FRAGMENT */ ||
                      patchFlag & 256 /* UNKEYED_FRAGMENT */)) ||
                  (!optimized && shapeFlag & 16 /* ARRAY_CHILDREN */)) {
                  unmountChildren(children, parentComponent, parentSuspense);
              }
              if (doRemove) {
                  remove(vnode);
              }
          }
          if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
              queuePostRenderEffect(() => {
                  vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                  shouldInvokeDirs &&
                      invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
              }, parentSuspense);
          }
      };
      const remove = vnode => {
          const { type, el, anchor, transition } = vnode;
          if (type === Fragment) {
              removeFragment(el, anchor);
              return;
          }
          if (type === Static) {
              removeStaticNode(vnode);
              return;
          }
          const performRemove = () => {
              hostRemove(el);
              if (transition && !transition.persisted && transition.afterLeave) {
                  transition.afterLeave();
              }
          };
          if (vnode.shapeFlag & 1 /* ELEMENT */ &&
              transition &&
              !transition.persisted) {
              const { leave, delayLeave } = transition;
              const performLeave = () => leave(el, performRemove);
              if (delayLeave) {
                  delayLeave(vnode.el, performRemove, performLeave);
              }
              else {
                  performLeave();
              }
          }
          else {
              performRemove();
          }
      };
      const removeFragment = (cur, end) => {
          // For fragments, directly remove all contained DOM nodes.
          // (fragment child nodes cannot have transition)
          let next;
          while (cur !== end) {
              next = hostNextSibling(cur);
              hostRemove(cur);
              cur = next;
          }
          hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
          if ((process.env.NODE_ENV !== 'production') && instance.type.__hmrId) {
              unregisterHMR(instance);
          }
          const { bum, effects, update, subTree, um } = instance;
          // beforeUnmount hook
          if (bum) {
              invokeArrayFns$1(bum);
          }
          if (effects) {
              for (let i = 0; i < effects.length; i++) {
                  stop(effects[i]);
              }
          }
          // update may be null if a component is unmounted before its async
          // setup has resolved.
          if (update) {
              stop(update);
              unmount(subTree, instance, parentSuspense, doRemove);
          }
          // unmounted hook
          if (um) {
              queuePostRenderEffect(um, parentSuspense);
          }
          queuePostRenderEffect(() => {
              instance.isUnmounted = true;
          }, parentSuspense);
          // A component with async dep inside a pending suspense is unmounted before
          // its async dep resolves. This should remove the dep from the suspense, and
          // cause the suspense to resolve immediately if that was the last dep.
          if (parentSuspense &&
              parentSuspense.pendingBranch &&
              !parentSuspense.isUnmounted &&
              instance.asyncDep &&
              !instance.asyncResolved &&
              instance.suspenseId === parentSuspense.pendingId) {
              parentSuspense.deps--;
              if (parentSuspense.deps === 0) {
                  parentSuspense.resolve();
              }
          }
          if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
              devtoolsComponentRemoved(instance);
          }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
          for (let i = start; i < children.length; i++) {
              unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
          }
      };
      const getNextHostNode = vnode => {
          if (vnode.shapeFlag & 6 /* COMPONENT */) {
              return getNextHostNode(vnode.component.subTree);
          }
          if (vnode.shapeFlag & 128 /* SUSPENSE */) {
              return vnode.suspense.next();
          }
          return hostNextSibling((vnode.anchor || vnode.el));
      };
      const render = (vnode, container, isSVG) => {
          if (vnode == null) {
              if (container._vnode) {
                  unmount(container._vnode, null, null, true);
              }
          }
          else {
              patch(container._vnode || null, vnode, container, null, null, null, isSVG);
          }
          flushPostFlushCbs();
          container._vnode = vnode;
      };
      const internals = {
          p: patch,
          um: unmount,
          m: move,
          r: remove,
          mt: mountComponent,
          mc: mountChildren,
          pc: patchChildren,
          pbc: patchBlockChildren,
          n: getNextHostNode,
          o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
          [hydrate, hydrateNode] = createHydrationFns(internals);
      }
      return {
          render,
          hydrate,
          createApp: createAppAPI(render, hydrate)
      };
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */, [
          vnode,
          prevVNode
      ]);
  }
  /**
   * #1156
   * When a component is HMR-enabled, we need to make sure that all static nodes
   * inside a block also inherit the DOM element from the previous tree so that
   * HMR updates (which are full updates) can retrieve the element for patching.
   *
   * #2080
   * Inside keyed `template` fragment static children, if a fragment is moved,
   * the children will always moved so that need inherit el form previous nodes
   * to ensure correct moved position.
   */
  function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (isArray(ch1) && isArray(ch2)) {
          for (let i = 0; i < ch1.length; i++) {
              // this is only called in the optimized path so array children are
              // guaranteed to be vnodes
              const c1 = ch1[i];
              let c2 = ch2[i];
              if (c2.shapeFlag & 1 /* ELEMENT */ && !c2.dynamicChildren) {
                  if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* HYDRATE_EVENTS */) {
                      c2 = ch2[i] = cloneIfMounted(ch2[i]);
                      c2.el = c1.el;
                  }
                  if (!shallow)
                      traverseStaticChildren(c1, c2);
              }
              // also inherit for comment nodes, but not placeholders (e.g. v-if which
              // would have received .el during block patch)
              if ((process.env.NODE_ENV !== 'production') && c2.type === Comment$1 && !c2.el) {
                  c2.el = c1.el;
              }
          }
      }
  }
  // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
  function getSequence(arr) {
      const p = arr.slice();
      const result = [0];
      let i, j, u, v, c;
      const len = arr.length;
      for (i = 0; i < len; i++) {
          const arrI = arr[i];
          if (arrI !== 0) {
              j = result[result.length - 1];
              if (arr[j] < arrI) {
                  p[i] = j;
                  result.push(i);
                  continue;
              }
              u = 0;
              v = result.length - 1;
              while (u < v) {
                  c = ((u + v) / 2) | 0;
                  if (arr[result[c]] < arrI) {
                      u = c + 1;
                  }
                  else {
                      v = c;
                  }
              }
              if (arrI < arr[result[u]]) {
                  if (u > 0) {
                      p[i] = result[u - 1];
                  }
                  result[u] = i;
              }
          }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
          result[u] = v;
          v = p[v];
      }
      return result;
  }

  const isTeleport = (type) => type.__isTeleport;
  const NULL_DYNAMIC_COMPONENT = Symbol();

  const Fragment = Symbol((process.env.NODE_ENV !== 'production') ? 'Fragment' : undefined);
  const Text = Symbol((process.env.NODE_ENV !== 'production') ? 'Text' : undefined);
  const Comment$1 = Symbol((process.env.NODE_ENV !== 'production') ? 'Comment' : undefined);
  const Static = Symbol((process.env.NODE_ENV !== 'production') ? 'Static' : undefined);
  let currentBlock = null;
  // Whether we should be tracking dynamic child nodes inside a block.
  // Only tracks when this value is > 0
  // We are not using a simple boolean because this value may need to be
  // incremented/decremented by nested usage of v-once (see below)
  let isBlockTreeEnabled = 1;
  /**
   * Block tracking sometimes needs to be disabled, for example during the
   * creation of a tree that needs to be cached by v-once. The compiler generates
   * code like this:
   *
   * ``` js
   * _cache[1] || (
   *   setBlockTracking(-1),
   *   _cache[1] = createVNode(...),
   *   setBlockTracking(1),
   *   _cache[1]
   * )
   * ```
   *
   * @private
   */
  function setBlockTracking(value) {
      isBlockTreeEnabled += value;
  }
  function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
      if ((process.env.NODE_ENV !== 'production') &&
          n2.shapeFlag & 6 /* COMPONENT */ &&
          hmrDirtyComponents.has(n2.type)) {
          // HMR only: if the component has been hot-updated, force a reload.
          return false;
      }
      return n1.type === n2.type && n1.key === n2.key;
  }
  const createVNodeWithArgsTransform = (...args) => {
      return _createVNode(...(args));
  };
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref }) => {
      return (ref != null
          ? isString(ref) || isRef(ref) || isFunction(ref)
              ? { i: currentRenderingInstance, r: ref }
              : ref
          : null);
  };
  const createVNode = ((process.env.NODE_ENV !== 'production')
      ? createVNodeWithArgsTransform
      : _createVNode);
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
          if ((process.env.NODE_ENV !== 'production') && !type) {
              warn(`Invalid vnode type when creating vnode: ${type}.`);
          }
          type = Comment$1;
      }
      if (isVNode(type)) {
          // createVNode receiving an existing vnode. This happens in cases like
          // <component :is="vnode"/>
          // #2078 make sure to merge refs during the clone instead of overwriting it
          const cloned = cloneVNode(type, props, true /* mergeRef: true */);
          if (children) {
              normalizeChildren(cloned, children);
          }
          return cloned;
      }
      // class component normalization.
      if (isClassComponent(type)) {
          type = type.__vccOpts;
      }
      // class & style normalization.
      if (props) {
          // for reactive or proxy objects, we need to clone it to enable mutation.
          if (isProxy(props) || InternalObjectKey in props) {
              props = extend({}, props);
          }
          let { class: klass, style } = props;
          if (klass && !isString(klass)) {
              props.class = normalizeClass(klass);
          }
          if (isObject$1(style)) {
              // reactive state objects need to be cloned since they are likely to be
              // mutated
              if (isProxy(style) && !isArray(style)) {
                  style = extend({}, style);
              }
              props.style = normalizeStyle(style);
          }
      }
      // encode the vnode type information into a bitmap
      const shapeFlag = isString(type)
          ? 1 /* ELEMENT */
          : isSuspense(type)
              ? 128 /* SUSPENSE */
              : isTeleport(type)
                  ? 64 /* TELEPORT */
                  : isObject$1(type)
                      ? 4 /* STATEFUL_COMPONENT */
                      : isFunction(type)
                          ? 2 /* FUNCTIONAL_COMPONENT */
                          : 0;
      if ((process.env.NODE_ENV !== 'production') && shapeFlag & 4 /* STATEFUL_COMPONENT */ && isProxy(type)) {
          type = toRaw(type);
          warn(`Vue received a Component which was made a reactive object. This can ` +
              `lead to unnecessary performance overhead, and should be avoided by ` +
              `marking the component with \`markRaw\` or using \`shallowRef\` ` +
              `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
      }
      const vnode = {
          __v_isVNode: true,
          __v_skip: true,
          type,
          props,
          key: props && normalizeKey(props),
          ref: props && normalizeRef(props),
          scopeId: currentScopeId,
          slotScopeIds: null,
          children: null,
          component: null,
          suspense: null,
          ssContent: null,
          ssFallback: null,
          dirs: null,
          transition: null,
          el: null,
          anchor: null,
          target: null,
          targetAnchor: null,
          staticCount: 0,
          shapeFlag,
          patchFlag,
          dynamicProps,
          dynamicChildren: null,
          appContext: null
      };
      // validate key
      if ((process.env.NODE_ENV !== 'production') && vnode.key !== vnode.key) {
          warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
      }
      normalizeChildren(vnode, children);
      // normalize suspense children
      if (shapeFlag & 128 /* SUSPENSE */) {
          type.normalize(vnode);
      }
      if (isBlockTreeEnabled > 0 &&
          // avoid a block node from tracking itself
          !isBlockNode &&
          // has current parent block
          currentBlock &&
          // presence of a patch flag indicates this node needs patching on updates.
          // component nodes also should always be patched, because even if the
          // component doesn't need to update, it needs to persist the instance on to
          // the next vnode so that it can be properly unmounted later.
          (patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
          // the EVENTS flag is only for hydration and if it is the only flag, the
          // vnode should not be considered dynamic due to handler caching.
          patchFlag !== 32 /* HYDRATE_EVENTS */) {
          currentBlock.push(vnode);
      }
      return vnode;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
      // This is intentionally NOT using spread or extend to avoid the runtime
      // key enumeration cost.
      const { props, ref, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
          __v_isVNode: true,
          __v_skip: true,
          type: vnode.type,
          props: mergedProps,
          key: mergedProps && normalizeKey(mergedProps),
          ref: extraProps && extraProps.ref
              ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                  // if the vnode itself already has a ref, cloneVNode will need to merge
                  // the refs so the single vnode can be set on multiple refs
                  mergeRef && ref
                      ? isArray(ref)
                          ? ref.concat(normalizeRef(extraProps))
                          : [ref, normalizeRef(extraProps)]
                      : normalizeRef(extraProps)
              : ref,
          scopeId: vnode.scopeId,
          slotScopeIds: vnode.slotScopeIds,
          children: (process.env.NODE_ENV !== 'production') && patchFlag === -1 /* HOISTED */ && isArray(children)
              ? children.map(deepCloneVNode)
              : children,
          target: vnode.target,
          targetAnchor: vnode.targetAnchor,
          staticCount: vnode.staticCount,
          shapeFlag: vnode.shapeFlag,
          // if the vnode is cloned with extra props, we can no longer assume its
          // existing patch flag to be reliable and need to add the FULL_PROPS flag.
          // note: perserve flag for fragments since they use the flag for children
          // fast paths only.
          patchFlag: extraProps && vnode.type !== Fragment
              ? patchFlag === -1 // hoisted node
                  ? 16 /* FULL_PROPS */
                  : patchFlag | 16 /* FULL_PROPS */
              : patchFlag,
          dynamicProps: vnode.dynamicProps,
          dynamicChildren: vnode.dynamicChildren,
          appContext: vnode.appContext,
          dirs: vnode.dirs,
          transition: vnode.transition,
          // These should technically only be non-null on mounted VNodes. However,
          // they *should* be copied for kept-alive vnodes. So we just always copy
          // them since them being non-null during a mount doesn't affect the logic as
          // they will simply be overwritten.
          component: vnode.component,
          suspense: vnode.suspense,
          ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
          ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
          el: vnode.el,
          anchor: vnode.anchor
      };
      return cloned;
  }
  /**
   * Dev only, for HMR of hoisted vnodes reused in v-for
   * https://github.com/vitejs/vite/issues/2022
   */
  function deepCloneVNode(vnode) {
      const cloned = cloneVNode(vnode);
      if (isArray(vnode.children)) {
          cloned.children = vnode.children.map(deepCloneVNode);
      }
      return cloned;
  }
  /**
   * @private
   */
  function createTextVNode(text = ' ', flag = 0) {
      return createVNode(Text, null, text, flag);
  }
  function normalizeVNode(child) {
      if (child == null || typeof child === 'boolean') {
          // empty placeholder
          return createVNode(Comment$1);
      }
      else if (isArray(child)) {
          // fragment
          return createVNode(Fragment, null, 
          // #3666, avoid reference pollution when reusing vnode
          child.slice());
      }
      else if (typeof child === 'object') {
          // already vnode, this should be the most common since compiled templates
          // always produce all-vnode children arrays
          return cloneIfMounted(child);
      }
      else {
          // strings and numbers
          return createVNode(Text, null, String(child));
      }
  }
  // optimized normalization for template-compiled render fns
  function cloneIfMounted(child) {
      return child.el === null ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
          children = null;
      }
      else if (isArray(children)) {
          type = 16 /* ARRAY_CHILDREN */;
      }
      else if (typeof children === 'object') {
          if (shapeFlag & 1 /* ELEMENT */ || shapeFlag & 64 /* TELEPORT */) {
              // Normalize slot to plain children for plain element and Teleport
              const slot = children.default;
              if (slot) {
                  // _c marker is added by withCtx() indicating this is a compiled slot
                  slot._c && (slot._d = false);
                  normalizeChildren(vnode, slot());
                  slot._c && (slot._d = true);
              }
              return;
          }
          else {
              type = 32 /* SLOTS_CHILDREN */;
              const slotFlag = children._;
              if (!slotFlag && !(InternalObjectKey in children)) {
                  children._ctx = currentRenderingInstance;
              }
              else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                  // a child component receives forwarded slots from the parent.
                  // its slot type is determined by its parent's slot type.
                  if (currentRenderingInstance.slots._ === 1 /* STABLE */) {
                      children._ = 1 /* STABLE */;
                  }
                  else {
                      children._ = 2 /* DYNAMIC */;
                      vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                  }
              }
          }
      }
      else if (isFunction(children)) {
          children = { default: children, _ctx: currentRenderingInstance };
          type = 32 /* SLOTS_CHILDREN */;
      }
      else {
          children = String(children);
          // force teleport children to array so it can be moved around
          if (shapeFlag & 64 /* TELEPORT */) {
              type = 16 /* ARRAY_CHILDREN */;
              children = [createTextVNode(children)];
          }
          else {
              type = 8 /* TEXT_CHILDREN */;
          }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
      const ret = extend({}, args[0]);
      for (let i = 1; i < args.length; i++) {
          const toMerge = args[i];
          for (const key in toMerge) {
              if (key === 'class') {
                  if (ret.class !== toMerge.class) {
                      ret.class = normalizeClass([ret.class, toMerge.class]);
                  }
              }
              else if (key === 'style') {
                  ret.style = normalizeStyle([ret.style, toMerge.style]);
              }
              else if (isOn(key)) {
                  const existing = ret[key];
                  const incoming = toMerge[key];
                  if (existing !== incoming) {
                      ret[key] = existing
                          ? [].concat(existing, incoming)
                          : incoming;
                  }
              }
              else if (key !== '') {
                  ret[key] = toMerge[key];
              }
          }
      }
      return ret;
  }

  /**
   * #2437 In Vue 3, functional components do not have a public instance proxy but
   * they exist in the internal parent chain. For code that relies on traversing
   * public $parent chains, skip functional ones and go to the parent instead.
   */
  const getPublicInstance = (i) => {
      if (!i)
          return null;
      if (isStatefulComponent(i))
          return i.exposed ? i.exposed : i.proxy;
      return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = extend(Object.create(null), {
      $: i => i,
      $el: i => i.vnode.el,
      $data: i => i.data,
      $props: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.props) : i.props),
      $attrs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.attrs) : i.attrs),
      $slots: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.slots) : i.slots),
      $refs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.refs) : i.refs),
      $parent: i => getPublicInstance(i.parent),
      $root: i => getPublicInstance(i.root),
      $emit: i => i.emit,
      $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
      $forceUpdate: i => () => queueJob(i.update),
      $nextTick: i => nextTick.bind(i.proxy),
      $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
  });
  const PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
          const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
          // for internal formatters to know that this is a Vue instance
          if ((process.env.NODE_ENV !== 'production') && key === '__isVue') {
              return true;
          }
          // data / props / ctx
          // This getter gets called for every property access on the render context
          // during render and is a major hotspot. The most expensive part of this
          // is the multiple hasOwn() calls. It's much faster to do a simple property
          // access on a plain object, so we use an accessCache object (with null
          // prototype) to memoize what access type a key corresponds to.
          let normalizedProps;
          if (key[0] !== '$') {
              const n = accessCache[key];
              if (n !== undefined) {
                  switch (n) {
                      case 0 /* SETUP */:
                          return setupState[key];
                      case 1 /* DATA */:
                          return data[key];
                      case 3 /* CONTEXT */:
                          return ctx[key];
                      case 2 /* PROPS */:
                          return props[key];
                      // default: just fallthrough
                  }
              }
              else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
                  accessCache[key] = 0 /* SETUP */;
                  return setupState[key];
              }
              else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
                  accessCache[key] = 1 /* DATA */;
                  return data[key];
              }
              else if (
              // only cache other properties when instance has declared (thus stable)
              // props
              (normalizedProps = instance.propsOptions[0]) &&
                  hasOwn$1(normalizedProps, key)) {
                  accessCache[key] = 2 /* PROPS */;
                  return props[key];
              }
              else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
                  accessCache[key] = 3 /* CONTEXT */;
                  return ctx[key];
              }
              else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
                  accessCache[key] = 4 /* OTHER */;
              }
          }
          const publicGetter = publicPropertiesMap[key];
          let cssModule, globalProperties;
          // public $xxx properties
          if (publicGetter) {
              if (key === '$attrs') {
                  track(instance, "get" /* GET */, key);
                  (process.env.NODE_ENV !== 'production') && markAttrsAccessed();
              }
              return publicGetter(instance);
          }
          else if (
          // css module (injected by vue-loader)
          (cssModule = type.__cssModules) &&
              (cssModule = cssModule[key])) {
              return cssModule;
          }
          else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
              // user may set custom properties to `this` that start with `$`
              accessCache[key] = 3 /* CONTEXT */;
              return ctx[key];
          }
          else if (
          // window properties
          ((globalProperties = appContext.config.globalProperties),
              hasOwn$1(globalProperties, key))) {
              {
                  return globalProperties[key];
              }
          }
          else if ((process.env.NODE_ENV !== 'production') &&
              currentRenderingInstance &&
              (!isString(key) ||
                  // #1091 avoid internal isRef/isVNode checks on component instance leading
                  // to infinite warning loop
                  key.indexOf('__v') !== 0)) {
              if (data !== EMPTY_OBJ &&
                  (key[0] === '$' || key[0] === '_') &&
                  hasOwn$1(data, key)) {
                  warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
                      `character ("$" or "_") and is not proxied on the render context.`);
              }
              else if (instance === currentRenderingInstance) {
                  warn(`Property ${JSON.stringify(key)} was accessed during render ` +
                      `but is not defined on instance.`);
              }
          }
      },
      set({ _: instance }, key, value) {
          const { data, setupState, ctx } = instance;
          if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
              setupState[key] = value;
          }
          else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
              data[key] = value;
          }
          else if (hasOwn$1(instance.props, key)) {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
              return false;
          }
          if (key[0] === '$' && key.slice(1) in instance) {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`Attempting to mutate public property "${key}". ` +
                      `Properties starting with $ are reserved and readonly.`, instance);
              return false;
          }
          else {
              if ((process.env.NODE_ENV !== 'production') && key in instance.appContext.config.globalProperties) {
                  Object.defineProperty(ctx, key, {
                      enumerable: true,
                      configurable: true,
                      value
                  });
              }
              else {
                  ctx[key] = value;
              }
          }
          return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
          let normalizedProps;
          return (accessCache[key] !== undefined ||
              (data !== EMPTY_OBJ && hasOwn$1(data, key)) ||
              (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) ||
              ((normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key)) ||
              hasOwn$1(ctx, key) ||
              hasOwn$1(publicPropertiesMap, key) ||
              hasOwn$1(appContext.config.globalProperties, key));
      }
  };
  if ((process.env.NODE_ENV !== 'production') && !false) {
      PublicInstanceProxyHandlers.ownKeys = (target) => {
          warn(`Avoid app logic that relies on enumerating keys on a component instance. ` +
              `The keys will be empty in production mode to avoid performance overhead.`);
          return Reflect.ownKeys(target);
      };
  }
  const RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
      get(target, key) {
          // fast path for unscopables when using `with` block
          if (key === Symbol.unscopables) {
              return;
          }
          return PublicInstanceProxyHandlers.get(target, key, target);
      },
      has(_, key) {
          const has = key[0] !== '_' && !isGloballyWhitelisted(key);
          if ((process.env.NODE_ENV !== 'production') && !has && PublicInstanceProxyHandlers.has(_, key)) {
              warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
          }
          return has;
      }
  });
  // In dev mode, the proxy target exposes the same properties as seen on `this`
  // for easier console inspection. In prod mode it will be an empty object so
  // these properties definitions can be skipped.
  function createRenderContext(instance) {
      const target = {};
      // expose internal instance for proxy handlers
      Object.defineProperty(target, `_`, {
          configurable: true,
          enumerable: false,
          get: () => instance
      });
      // expose public properties
      Object.keys(publicPropertiesMap).forEach(key => {
          Object.defineProperty(target, key, {
              configurable: true,
              enumerable: false,
              get: () => publicPropertiesMap[key](instance),
              // intercepted by the proxy so no need for implementation,
              // but needed to prevent set errors
              set: NOOP
          });
      });
      return target;
  }
  // dev only
  function exposePropsOnRenderContext(instance) {
      const { ctx, propsOptions: [propsOptions] } = instance;
      if (propsOptions) {
          Object.keys(propsOptions).forEach(key => {
              Object.defineProperty(ctx, key, {
                  enumerable: true,
                  configurable: true,
                  get: () => instance.props[key],
                  set: NOOP
              });
          });
      }
  }
  // dev only
  function exposeSetupStateOnRenderContext(instance) {
      const { ctx, setupState } = instance;
      Object.keys(toRaw(setupState)).forEach(key => {
          if (key[0] === '$' || key[0] === '_') {
              warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" ` +
                  `which are reserved prefixes for Vue internals.`);
              return;
          }
          Object.defineProperty(ctx, key, {
              enumerable: true,
              configurable: true,
              get: () => setupState[key],
              set: NOOP
          });
      });
  }

  const emptyAppContext = createAppContext();
  let uid$1 = 0;
  function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      // inherit parent app context - or - if root, adopt from root vnode
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
          uid: uid$1++,
          vnode,
          type,
          parent,
          appContext,
          root: null,
          next: null,
          subTree: null,
          update: null,
          render: null,
          proxy: null,
          exposed: null,
          withProxy: null,
          effects: null,
          provides: parent ? parent.provides : Object.create(appContext.provides),
          accessCache: null,
          renderCache: [],
          // local resovled assets
          components: null,
          directives: null,
          // resolved props and emits options
          propsOptions: normalizePropsOptions(type, appContext),
          emitsOptions: normalizeEmitsOptions(type, appContext),
          // emit
          emit: null,
          emitted: null,
          // props default value
          propsDefaults: EMPTY_OBJ,
          // inheritAttrs
          inheritAttrs: type.inheritAttrs,
          // state
          ctx: EMPTY_OBJ,
          data: EMPTY_OBJ,
          props: EMPTY_OBJ,
          attrs: EMPTY_OBJ,
          slots: EMPTY_OBJ,
          refs: EMPTY_OBJ,
          setupState: EMPTY_OBJ,
          setupContext: null,
          // suspense related
          suspense,
          suspenseId: suspense ? suspense.pendingId : 0,
          asyncDep: null,
          asyncResolved: false,
          // lifecycle hooks
          // not using enums here because it results in computed properties
          isMounted: false,
          isUnmounted: false,
          isDeactivated: false,
          bc: null,
          c: null,
          bm: null,
          m: null,
          bu: null,
          u: null,
          um: null,
          bum: null,
          da: null,
          a: null,
          rtg: null,
          rtc: null,
          ec: null,
          sp: null
      };
      if ((process.env.NODE_ENV !== 'production')) {
          instance.ctx = createRenderContext(instance);
      }
      else {
          instance.ctx = { _: instance };
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit$1.bind(null, instance);
      return instance;
  }
  let currentInstance = null;
  const setCurrentInstance = (instance) => {
      currentInstance = instance;
  };
  const isBuiltInTag = /*#__PURE__*/ makeMap('slot,component');
  function validateComponentName(name, config) {
      const appIsNativeTag = config.isNativeTag || NO;
      if (isBuiltInTag(name) || appIsNativeTag(name)) {
          warn('Do not use built-in or reserved HTML elements as component id: ' + name);
      }
  }
  function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
      isInSSRComponentSetup = isSSR;
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult = isStateful
          ? setupStatefulComponent(instance, isSSR)
          : undefined;
      isInSSRComponentSetup = false;
      return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
      const Component = instance.type;
      if ((process.env.NODE_ENV !== 'production')) {
          if (Component.name) {
              validateComponentName(Component.name, instance.appContext.config);
          }
          if (Component.components) {
              const names = Object.keys(Component.components);
              for (let i = 0; i < names.length; i++) {
                  validateComponentName(names[i], instance.appContext.config);
              }
          }
          if (Component.directives) {
              const names = Object.keys(Component.directives);
              for (let i = 0; i < names.length; i++) {
                  validateDirectiveName(names[i]);
              }
          }
          if (Component.compilerOptions && isRuntimeOnly()) {
              warn(`"compilerOptions" is only supported when using a build of Vue that ` +
                  `includes the runtime compiler. Since you are using a runtime-only ` +
                  `build, the options should be passed via your build tool config instead.`);
          }
      }
      // 0. create render proxy property access cache
      instance.accessCache = Object.create(null);
      // 1. create public instance / render proxy
      // also mark it raw so it's never observed
      instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
      if ((process.env.NODE_ENV !== 'production')) {
          exposePropsOnRenderContext(instance);
      }
      // 2. call setup()
      const { setup } = Component;
      if (setup) {
          const setupContext = (instance.setupContext =
              setup.length > 1 ? createSetupContext(instance) : null);
          currentInstance = instance;
          pauseTracking();
          const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [(process.env.NODE_ENV !== 'production') ? shallowReadonly(instance.props) : instance.props, setupContext]);
          resetTracking();
          currentInstance = null;
          if (isPromise(setupResult)) {
              if (isSSR) {
                  // return the promise so server-renderer can wait on it
                  return setupResult
                      .then((resolvedResult) => {
                      handleSetupResult(instance, resolvedResult, isSSR);
                  })
                      .catch(e => {
                      handleError(e, instance, 0 /* SETUP_FUNCTION */);
                  });
              }
              else {
                  // async setup returned Promise.
                  // bail here and wait for re-entry.
                  instance.asyncDep = setupResult;
              }
          }
          else {
              handleSetupResult(instance, setupResult, isSSR);
          }
      }
      else {
          finishComponentSetup(instance, isSSR);
      }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
      if (isFunction(setupResult)) {
          // setup returned an inline render function
          {
              instance.render = setupResult;
          }
      }
      else if (isObject$1(setupResult)) {
          if ((process.env.NODE_ENV !== 'production') && isVNode(setupResult)) {
              warn(`setup() should not return VNodes directly - ` +
                  `return a render function instead.`);
          }
          // setup returned bindings.
          // assuming a render function compiled from template is present.
          if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
              instance.devtoolsRawSetupState = setupResult;
          }
          instance.setupState = proxyRefs(setupResult);
          if ((process.env.NODE_ENV !== 'production')) {
              exposeSetupStateOnRenderContext(instance);
          }
      }
      else if ((process.env.NODE_ENV !== 'production') && setupResult !== undefined) {
          warn(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
      }
      finishComponentSetup(instance, isSSR);
  }
  let compile;
  // dev only
  const isRuntimeOnly = () => !compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      // template / render function normalization
      if (!instance.render) {
          instance.render = (Component.render || NOOP);
          // for runtime-compiled render functions using `with` blocks, the render
          // proxy used needs a different `has` handler which is more performant and
          // also only allows a whitelist of globals to fallthrough.
          if (instance.render._rc) {
              instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
          }
      }
      // support for 2.x options
      if (__VUE_OPTIONS_API__ && !(false )) {
          currentInstance = instance;
          pauseTracking();
          applyOptions(instance);
          resetTracking();
          currentInstance = null;
      }
      // warn missing template/render
      // the runtime compilation of template in SSR is done by server-render
      if ((process.env.NODE_ENV !== 'production') && !Component.render && instance.render === NOOP && !isSSR) {
          /* istanbul ignore if */
          if (Component.template) {
              warn(`Component provided template option but ` +
                  `runtime compilation is not supported in this build of Vue.` +
                  (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
                      ) /* should not happen */);
          }
          else {
              warn(`Component is missing template or render function.`);
          }
      }
  }
  const attrHandlers = {
      get: (target, key) => {
          if ((process.env.NODE_ENV !== 'production')) {
              markAttrsAccessed();
          }
          return target[key];
      },
      set: () => {
          warn(`setupContext.attrs is readonly.`);
          return false;
      },
      deleteProperty: () => {
          warn(`setupContext.attrs is readonly.`);
          return false;
      }
  };
  function createSetupContext(instance) {
      const expose = exposed => {
          if ((process.env.NODE_ENV !== 'production') && instance.exposed) {
              warn(`expose() should be called only once per setup().`);
          }
          instance.exposed = proxyRefs(exposed);
      };
      if ((process.env.NODE_ENV !== 'production')) {
          // We use getters in dev in case libs like test-utils overwrite instance
          // properties (overwrites should not be done in prod)
          return Object.freeze({
              get attrs() {
                  return new Proxy(instance.attrs, attrHandlers);
              },
              get slots() {
                  return shallowReadonly(instance.slots);
              },
              get emit() {
                  return (event, ...args) => instance.emit(event, ...args);
              },
              expose
          });
      }
      else {
          return {
              attrs: instance.attrs,
              slots: instance.slots,
              emit: instance.emit,
              expose
          };
      }
  }
  // record effects created during a component's setup() so that they can be
  // stopped when the component unmounts
  function recordInstanceBoundEffect(effect, instance = currentInstance) {
      if (instance) {
          (instance.effects || (instance.effects = [])).push(effect);
      }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
  function getComponentName(Component) {
      return isFunction(Component)
          ? Component.displayName || Component.name
          : Component.name;
  }
  /* istanbul ignore next */
  function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
          const match = Component.__file.match(/([^/\\]+)\.\w+$/);
          if (match) {
              name = match[1];
          }
      }
      if (!name && instance && instance.parent) {
          // try to infer the name based on reverse resolution
          const inferFromRegistry = (registry) => {
              for (const key in registry) {
                  if (registry[key] === Component) {
                      return key;
                  }
              }
          };
          name =
              inferFromRegistry(instance.components ||
                  instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
      return isFunction(value) && '__vccOpts' in value;
  }

  function computed(getterOrOptions) {
      const c = computed$1(getterOrOptions);
      recordInstanceBoundEffect(c.effect);
      return c;
  }

  Symbol((process.env.NODE_ENV !== 'production') ? `ssrContext` : ``);

  // Core API ------------------------------------------------------------------
  const version = "3.1.2";

  const svgNS = 'http://www.w3.org/2000/svg';
  const doc = (typeof document !== 'undefined' ? document : null);
  const nodeOps = {
      insert: (child, parent, anchor) => {
          parent.insertBefore(child, anchor || null);
      },
      remove: child => {
          const parent = child.parentNode;
          if (parent) {
              parent.removeChild(child);
          }
      },
      createElement: (tag, isSVG, is, props) => {
          const el = isSVG
              ? doc.createElementNS(svgNS, tag)
              : doc.createElement(tag, is ? { is } : undefined);
          if (tag === 'select' && props && props.multiple != null) {
              el.setAttribute('multiple', props.multiple);
          }
          return el;
      },
      createText: text => doc.createTextNode(text),
      createComment: text => doc.createComment(text),
      setText: (node, text) => {
          node.nodeValue = text;
      },
      setElementText: (el, text) => {
          el.textContent = text;
      },
      parentNode: node => node.parentNode,
      nextSibling: node => node.nextSibling,
      querySelector: selector => doc.querySelector(selector),
      setScopeId(el, id) {
          el.setAttribute(id, '');
      },
      cloneNode(el) {
          const cloned = el.cloneNode(true);
          // #3072
          // - in `patchDOMProp`, we store the actual value in the `el._value` property.
          // - normally, elements using `:value` bindings will not be hoisted, but if
          //   the bound value is a constant, e.g. `:value="true"` - they do get
          //   hoisted.
          // - in production, hoisted nodes are cloned when subsequent inserts, but
          //   cloneNode() does not copy the custom property we attached.
          // - This may need to account for other custom DOM properties we attach to
          //   elements in addition to `_value` in the future.
          if (`_value` in el) {
              cloned._value = el._value;
          }
          return cloned;
      },
      // __UNSAFE__
      // Reason: insertAdjacentHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, isSVG, cached) {
          if (cached) {
              let [cachedFirst, cachedLast] = cached;
              let first, last;
              while (true) {
                  let node = cachedFirst.cloneNode(true);
                  if (!first)
                      first = node;
                  parent.insertBefore(node, anchor);
                  if (cachedFirst === cachedLast) {
                      last = node;
                      break;
                  }
                  cachedFirst = cachedFirst.nextSibling;
              }
              return [first, last];
          }
          // <parent> before | first ... last | anchor </parent>
          const before = anchor ? anchor.previousSibling : parent.lastChild;
          if (anchor) {
              let insertionPoint;
              let usingTempInsertionPoint = false;
              if (anchor instanceof Element) {
                  insertionPoint = anchor;
              }
              else {
                  // insertAdjacentHTML only works for elements but the anchor is not an
                  // element...
                  usingTempInsertionPoint = true;
                  insertionPoint = isSVG
                      ? doc.createElementNS(svgNS, 'g')
                      : doc.createElement('div');
                  parent.insertBefore(insertionPoint, anchor);
              }
              insertionPoint.insertAdjacentHTML('beforebegin', content);
              if (usingTempInsertionPoint) {
                  parent.removeChild(insertionPoint);
              }
          }
          else {
              parent.insertAdjacentHTML('beforeend', content);
          }
          return [
              // first
              before ? before.nextSibling : parent.firstChild,
              // last
              anchor ? anchor.previousSibling : parent.lastChild
          ];
      }
  };

  // compiler should normalize class + :class bindings on the same element
  // into a single binding ['staticClass', dynamic]
  function patchClass(el, value, isSVG) {
      if (value == null) {
          value = '';
      }
      if (isSVG) {
          el.setAttribute('class', value);
      }
      else {
          // directly setting className should be faster than setAttribute in theory
          // if this is an element during a transition, take the temporary transition
          // classes into account.
          const transitionClasses = el._vtc;
          if (transitionClasses) {
              value = (value
                  ? [value, ...transitionClasses]
                  : [...transitionClasses]).join(' ');
          }
          el.className = value;
      }
  }

  function patchStyle(el, prev, next) {
      const style = el.style;
      if (!next) {
          el.removeAttribute('style');
      }
      else if (isString(next)) {
          if (prev !== next) {
              const current = style.display;
              style.cssText = next;
              // indicates that the `display` of the element is controlled by `v-show`,
              // so we always keep the current `display` value regardless of the `style` value,
              // thus handing over control to `v-show`.
              if ('_vod' in el) {
                  style.display = current;
              }
          }
      }
      else {
          for (const key in next) {
              setStyle(style, key, next[key]);
          }
          if (prev && !isString(prev)) {
              for (const key in prev) {
                  if (next[key] == null) {
                      setStyle(style, key, '');
                  }
              }
          }
      }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
      if (isArray(val)) {
          val.forEach(v => setStyle(style, name, v));
      }
      else {
          if (name.startsWith('--')) {
              // custom property definition
              style.setProperty(name, val);
          }
          else {
              const prefixed = autoPrefix(style, name);
              if (importantRE.test(val)) {
                  // !important
                  style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
              }
              else {
                  style[prefixed] = val;
              }
          }
      }
  }
  const prefixes = ['Webkit', 'Moz', 'ms'];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
      const cached = prefixCache[rawName];
      if (cached) {
          return cached;
      }
      let name = camelize(rawName);
      if (name !== 'filter' && name in style) {
          return (prefixCache[rawName] = name);
      }
      name = capitalize(name);
      for (let i = 0; i < prefixes.length; i++) {
          const prefixed = prefixes[i] + name;
          if (prefixed in style) {
              return (prefixCache[rawName] = prefixed);
          }
      }
      return rawName;
  }

  const xlinkNS = 'http://www.w3.org/1999/xlink';
  function patchAttr(el, key, value, isSVG, instance) {
      if (isSVG && key.startsWith('xlink:')) {
          if (value == null) {
              el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
          }
          else {
              el.setAttributeNS(xlinkNS, key, value);
          }
      }
      else {
          // note we are only checking boolean attributes that don't have a
          // corresponding dom prop of the same name here.
          const isBoolean = isSpecialBooleanAttr(key);
          if (value == null || (isBoolean && value === false)) {
              el.removeAttribute(key);
          }
          else {
              el.setAttribute(key, isBoolean ? '' : value);
          }
      }
  }

  // __UNSAFE__
  // functions. The user is responsible for using them with only trusted content.
  function patchDOMProp(el, key, value, 
  // the following args are passed only due to potential innerHTML/textContent
  // overriding existing VNodes, in which case the old tree must be properly
  // unmounted.
  prevChildren, parentComponent, parentSuspense, unmountChildren) {
      if (key === 'innerHTML' || key === 'textContent') {
          if (prevChildren) {
              unmountChildren(prevChildren, parentComponent, parentSuspense);
          }
          el[key] = value == null ? '' : value;
          return;
      }
      if (key === 'value' && el.tagName !== 'PROGRESS') {
          // store value as _value as well since
          // non-string values will be stringified.
          el._value = value;
          const newValue = value == null ? '' : value;
          if (el.value !== newValue) {
              el.value = newValue;
          }
          if (value == null) {
              el.removeAttribute(key);
          }
          return;
      }
      if (value === '' || value == null) {
          const type = typeof el[key];
          if (value === '' && type === 'boolean') {
              // e.g. <select multiple> compiles to { multiple: '' }
              el[key] = true;
              return;
          }
          else if (value == null && type === 'string') {
              // e.g. <div :id="null">
              el[key] = '';
              el.removeAttribute(key);
              return;
          }
          else if (type === 'number') {
              // e.g. <img :width="null">
              el[key] = 0;
              el.removeAttribute(key);
              return;
          }
      }
      // some properties perform value validation and throw
      try {
          el[key] = value;
      }
      catch (e) {
          if ((process.env.NODE_ENV !== 'production')) {
              warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` +
                  `value ${value} is invalid.`, e);
          }
      }
  }

  // Async edge case fix requires storing an event listener's attach timestamp.
  let _getNow = Date.now;
  let skipTimestampCheck = false;
  if (typeof window !== 'undefined') {
      // Determine what event timestamp the browser is using. Annoyingly, the
      // timestamp can either be hi-res (relative to page load) or low-res
      // (relative to UNIX epoch), so in order to compare time we have to use the
      // same timestamp type when saving the flush timestamp.
      if (_getNow() > document.createEvent('Event').timeStamp) {
          // if the low-res timestamp which is bigger than the event timestamp
          // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
          // and we need to use the hi-res version for event listeners as well.
          _getNow = () => performance.now();
      }
      // #3485: Firefox <= 53 has incorrect Event.timeStamp implementation
      // and does not fire microtasks in between event propagation, so safe to exclude.
      const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
      skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  // To avoid the overhead of repeatedly calling performance.now(), we cache
  // and use the same timestamp for all event listeners attached in the same tick.
  let cachedNow = 0;
  const p = Promise.resolve();
  const reset = () => {
      cachedNow = 0;
  };
  const getNow = () => cachedNow || (p.then(reset), (cachedNow = _getNow()));
  function addEventListener(el, event, handler, options) {
      el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
      el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
      // vei = vue event invokers
      const invokers = el._vei || (el._vei = {});
      const existingInvoker = invokers[rawName];
      if (nextValue && existingInvoker) {
          // patch
          existingInvoker.value = nextValue;
      }
      else {
          const [name, options] = parseName(rawName);
          if (nextValue) {
              // add
              const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
              addEventListener(el, name, invoker, options);
          }
          else if (existingInvoker) {
              // remove
              removeEventListener(el, name, existingInvoker, options);
              invokers[rawName] = undefined;
          }
      }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
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
  function createInvoker(initialValue, instance) {
      const invoker = (e) => {
          // async edge case #6566: inner click event triggers patch, event handler
          // attached to outer element during patch, and triggered again. This
          // happens because browsers fire microtask ticks between event propagation.
          // the solution is simple: we save the timestamp when a handler is attached,
          // and the handler would only fire if the event passed to it was fired
          // AFTER it was attached.
          const timeStamp = e.timeStamp || _getNow();
          if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
              callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */, [e]);
          }
      };
      invoker.value = initialValue;
      invoker.attached = getNow();
      return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
      if (isArray(value)) {
          const originalStop = e.stopImmediatePropagation;
          e.stopImmediatePropagation = () => {
              originalStop.call(e);
              e._stopped = true;
          };
          return value.map(fn => (e) => !e._stopped && fn(e));
      }
      else {
          return value;
      }
  }

  const nativeOnRE = /^on[a-z]/;
  const forcePatchProp = (_, key) => key === 'value';
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
      switch (key) {
          // special
          case 'class':
              patchClass(el, nextValue, isSVG);
              break;
          case 'style':
              patchStyle(el, prevValue, nextValue);
              break;
          default:
              if (isOn(key)) {
                  // ignore v-model listeners
                  if (!isModelListener(key)) {
                      patchEvent(el, key, prevValue, nextValue, parentComponent);
                  }
              }
              else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
                  patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
              }
              else {
                  // special case for <input v-model type="checkbox"> with
                  // :true-value & :false-value
                  // store value as dom properties since non-string values will be
                  // stringified.
                  if (key === 'true-value') {
                      el._trueValue = nextValue;
                  }
                  else if (key === 'false-value') {
                      el._falseValue = nextValue;
                  }
                  patchAttr(el, key, nextValue, isSVG);
              }
              break;
      }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
      if (isSVG) {
          // most keys must be set as attribute on svg elements to work
          // ...except innerHTML
          if (key === 'innerHTML') {
              return true;
          }
          // or native onclick with function values
          if (key in el && nativeOnRE.test(key) && isFunction(value)) {
              return true;
          }
          return false;
      }
      // spellcheck and draggable are numerated attrs, however their
      // corresponding DOM properties are actually booleans - this leads to
      // setting it with a string "false" value leading it to be coerced to
      // `true`, so we need to always treat them as attributes.
      // Note that `contentEditable` doesn't have this problem: its DOM
      // property is also enumerated string values.
      if (key === 'spellcheck' || key === 'draggable') {
          return false;
      }
      // #1787, #2840 form property on form elements is readonly and must be set as
      // attribute.
      if (key === 'form') {
          return false;
      }
      // #1526 <input list> must be set as attribute
      if (key === 'list' && el.tagName === 'INPUT') {
          return false;
      }
      // #2766 <textarea type> must be set as attribute
      if (key === 'type' && el.tagName === 'TEXTAREA') {
          return false;
      }
      // native onclick with string value, must be set as attribute
      if (nativeOnRE.test(key) && isString(value)) {
          return false;
      }
      return key in el;
  }

  const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps);
  // lazy create the renderer - this makes core renderer logic tree-shakable
  // in case the user only imports reactivity utilities from Vue.
  let renderer;
  function ensureRenderer() {
      return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = ((...args) => {
      const app = ensureRenderer().createApp(...args);
      if ((process.env.NODE_ENV !== 'production')) {
          injectNativeTagCheck(app);
          injectCompilerOptionsCheck(app);
      }
      const { mount } = app;
      app.mount = (containerOrSelector) => {
          const container = normalizeContainer(containerOrSelector);
          if (!container)
              return;
          const component = app._component;
          if (!isFunction(component) && !component.render && !component.template) {
              // __UNSAFE__
              // Reason: potential execution of JS expressions in in-DOM template.
              // The user must make sure the in-DOM template is trusted. If it's
              // rendered by the server, the template should not contain any user data.
              component.template = container.innerHTML;
          }
          // clear content before mounting
          container.innerHTML = '';
          const proxy = mount(container, false, container instanceof SVGElement);
          if (container instanceof Element) {
              container.removeAttribute('v-cloak');
              container.setAttribute('data-v-app', '');
          }
          return proxy;
      };
      return app;
  });
  function injectNativeTagCheck(app) {
      // Inject `isNativeTag`
      // this is used for component name validation (dev only)
      Object.defineProperty(app.config, 'isNativeTag', {
          value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
          writable: false
      });
  }
  // dev only
  function injectCompilerOptionsCheck(app) {
      {
          const isCustomElement = app.config.isCustomElement;
          Object.defineProperty(app.config, 'isCustomElement', {
              get() {
                  return isCustomElement;
              },
              set() {
                  warn(`The \`isCustomElement\` config option is deprecated. Use ` +
                      `\`compilerOptions.isCustomElement\` instead.`);
              }
          });
          const compilerOptions = app.config.compilerOptions;
          const msg = `The \`compilerOptions\` config option is only respected when using ` +
              `a build of Vue.js that includes the runtime compiler (aka "full build"). ` +
              `Since you are using the runtime-only build, \`compilerOptions\` ` +
              `must be passed to \`@vue/compiler-dom\` in the build setup instead.\n` +
              `- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.\n` +
              `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n` +
              `- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
          Object.defineProperty(app.config, 'compilerOptions', {
              get() {
                  warn(msg);
                  return compilerOptions;
              },
              set() {
                  warn(msg);
              }
          });
      }
  }
  function normalizeContainer(container) {
      if (isString(container)) {
          const res = document.querySelector(container);
          if ((process.env.NODE_ENV !== 'production') && !res) {
              warn(`Failed to mount app: mount target selector "${container}" returned null.`);
          }
          return res;
      }
      if ((process.env.NODE_ENV !== 'production') &&
          container instanceof window.ShadowRoot &&
          container.mode === 'closed') {
          warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
      }
      return container;
  }

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

  const API_GET_CLIPBOARD_DATA = 'getClipboardData';
  const API_SET_CLIPBOARD_DATA = 'setClipboardData';

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

  const API_LOGIN = 'login';
  const LoginProtocol = {
      provider: String,
      scopes: [String, Array],
      timeout: Number,
      univerifyStyle: Object,
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

  const API_SHREA = 'share';
  const SCENE = [
      'WXSceneSession',
      'WXSenceTimeline',
      'WXSceneFavorite',
  ];
  const SahreOptions = {
      formatArgs: {
          scene(value, params) {
              if (params.provider === 'weixin' && (!value || !SCENE.includes(value))) {
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
              if (!TYPE.includes(value))
                  return '分享参数 type 不正确';
              return elemInArray(value, TYPE);
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

  function requireNativePlugin(pluginName) {
      /* eslint-disable no-undef */
      if (typeof weex !== 'undefined') {
          return weex.requireModule(pluginName);
      }
      /* eslint-disable no-undef */
      return __requireNativePlugin__(pluginName);
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
  });

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

  function getFileName(path) {
      const array = path.split('/');
      return array[array.length - 1];
  }

  const compressImage = defineAsyncApi(API_COMPRESS_IMAGE, (options, { resolve, reject }) => {
      const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
      plus.zip.compressImage(extend({}, options, {
          dst,
      }), () => {
          resolve({
              tempFilePath: dst,
          });
      }, reject);
  }, CompressImageProtocol, CompressImageOptions);

  const compressVideo = defineAsyncApi(API_COMPRESS_VIDEO, (options, { resolve, reject }) => {
      const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(options.src)}`;
      plus.zip.compressVideo(extend({}, options, {
          dst,
      }), () => {
          resolve({
              tempFilePath: dst,
          });
      }, reject);
  }, CompressVideoProtocol, CompressVideoOptions);

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

  function getService(provider) {
      return new Promise((resolve, reject) => {
          plus.oauth.getServices((services) => {
              const service = services.find(({ id }) => id === provider);
              service ? resolve(service) : reject(new Error('provider not find'));
          }, reject);
      });
  }
  /**
   * 微信登录
   */
  const baseLogin = (params, { resolve, reject, }) => {
      const provider = params.provider || 'weixin';
      const errorCallback = warpPlusErrorCallback(reject);
      getService(provider)
          .then((service) => {
          function login() {
              service.login((res) => {
                  const authResult = res.target.authResult;
                  resolve({
                      code: authResult.code,
                      authResult: authResult,
                  });
              }, errorCallback, provider === 'apple'
                  ? { scope: 'email' }
                  : {
                      univerifyStyle: univerifyButtonsClickHandling(params.univerifyStyle, errorCallback),
                  } || {});
          }
          // 先注销再登录
          // apple登录logout之后无法重新触发获取email,fullname；一键登录无logout
          if (provider === 'apple' || provider === 'univerify') {
              login();
          }
          else {
              service.logout(login, login);
          }
      })
          .catch(errorCallback);
  };
  const login = defineAsyncApi(API_LOGIN, baseLogin, LoginProtocol);
  const getUserInfo = defineAsyncApi(API_GET_USER_INFO, (params, { resolve, reject }) => {
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
                          // @ts-ignore
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
  }, GetUserInfoProtocol);
  /**
   * 获取用户信息-兼容
   */
  const getUserProfile = defineAsyncApi(API_GET_USER_PROFILE, (params, { resolve, reject }) => {
      return baseLogin(params, { resolve, reject });
  }, GgetUserProfileProtocol);
  const preLogin = defineAsyncApi(API_PRE_LOGIN, (params, { resolve, reject }) => {
      const successCallback = warpPlusSuccessCallback(resolve);
      const errorCallback = warpPlusErrorCallback(reject);
      getService(params.provider)
          .then((service) => service.preLogin(successCallback, errorCallback))
          .catch(errorCallback);
  }, PreLoginProtocol, PreLoginOptions);
  const _closeAuthView = () => getService('univerify').then((service) => service.closeAuthView());
  const closeAuthView = defineAsyncApi(API_CLOSE_AUTH_VIEW, _closeAuthView);
  /**
   * 一键登录自定义登陆按钮点击处理
   */
  function univerifyButtonsClickHandling(univerifyStyle, errorCallback) {
      if (isPlainObject(univerifyStyle) &&
          univerifyStyle.buttons &&
          toTypeString(univerifyStyle.buttons.list) === '[object Array]' &&
          univerifyStyle.buttons.list.length > 0) {
          univerifyStyle.buttons.list.forEach((button, index) => {
              univerifyStyle.buttons.list[index].onclick = function () {
                  _closeAuthView().then(() => {
                      errorCallback({
                          code: '30008',
                          message: '用户点击了自定义按钮',
                          index,
                          provider: button.provider,
                      });
                  });
              };
          });
      }
      return univerifyStyle;
  }

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
      let { provider, type, title, summary: content, href, imageUrl, mediaUrl: media, scene, miniProgram, } = args;
      if (typeof imageUrl === 'string' && imageUrl) {
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
      service.send(params, () => {
          resolve();
      }, errorCallback);
  };
  const share = defineAsyncApi(API_SHREA, (params, { resolve, reject }) => {
      const res = parseParams(params);
      const errorCallback = warpPlusErrorCallback(reject);
      if (typeof res === 'string') {
          return reject(res);
      }
      else {
          params = res;
      }
      plus.share.getServices((services) => {
          const service = services.find(({ id }) => id === params.provider);
          if (!service) {
              reject('service not found');
          }
          else {
              if (service.authenticated) {
                  sendShareMsg(service, params, resolve, reject);
              }
              else {
                  service.authorize(() => sendShareMsg(service, params, resolve, reject), errorCallback);
              }
          }
      }, errorCallback);
  }, ShareProtocols, SahreOptions);
  const shareWithSystem = defineAsyncApi(API_SHARE_WITH_SYSTEM, ({ type, imageUrl, summary, href }, { resolve, reject }) => {
      const errorCallback = warpPlusErrorCallback(reject);
      if (typeof imageUrl === 'string' && imageUrl) {
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
    getClipboardData: getClipboardData,
    setClipboardData: setClipboardData,
    onNetworkStatusChange: onNetworkStatusChange,
    offNetworkStatusChange: offNetworkStatusChange,
    getNetworkType: getNetworkType,
    getImageInfo: getImageInfo,
    getVideoInfo: getVideoInfo,
    previewImage: previewImage,
    getRecorderManager: getRecorderManager,
    saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum,
    compressImage: compressImage,
    compressVideo: compressVideo,
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
    getProvider: getProvider,
    login: login,
    getUserInfo: getUserInfo,
    getUserProfile: getUserProfile,
    preLogin: preLogin,
    closeAuthView: closeAuthView,
    share: share,
    shareWithSystem: shareWithSystem,
    requestPayment: requestPayment
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
  var tabBar$1 = {
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
      tabBar$1.init(tabBar, (item, index) => {
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
          selected !== 0 && tabBar$1.switchTab(entryPagePath);
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

  const BRIDGE_NODE_SYNC = 'nodeSync';
  const ACTION_TYPE_PAGE_CREATE = 1;
  const ACTION_TYPE_PAGE_CREATED = 2;
  const ACTION_TYPE_CREATE = 3;
  const ACTION_TYPE_INSERT = 4;
  const ACTION_TYPE_REMOVE = 5;
  const ACTION_TYPE_SET_ATTRIBUTE = 6;
  const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
  const ACTION_TYPE_SET_TEXT = 8;
  class UniPageNode extends UniNode {
      constructor(pageId, options, setup = false) {
          super(NODE_TYPE_PAGE, '#page', null);
          this._id = 1;
          this.updateActions = [];
          this.nodeId = 0;
          this.pageId = pageId;
          this.pageNode = this;
          this.createAction = [ACTION_TYPE_PAGE_CREATE, options];
          this.createdAction = [ACTION_TYPE_PAGE_CREATED];
          setup && this.setup();
      }
      onCreate(thisNode, nodeName) {
          pushCreateAction(this, thisNode.nodeId, nodeName);
          return thisNode;
      }
      onInsertBefore(thisNode, newChild, index) {
          pushInsertAction(this, newChild, thisNode.nodeId, index);
          return newChild;
      }
      onRemoveChild(thisNode, oldChild) {
          pushRemoveAction(this, oldChild.nodeId, thisNode.nodeId);
          return oldChild;
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
      push(action) {
          this.updateActions.push(action);
      }
      restore() {
          this.push(this.createAction);
          // TODO restore children
          this.push(this.createdAction);
      }
      setup() {
          this.send([this.createAction]);
      }
      mounted() {
          const { updateActions, createdAction } = this;
          updateActions.unshift(createdAction);
          this.update();
      }
      update() {
          const { updateActions } = this;
          if (updateActions.length) {
              this.send(updateActions);
              updateActions.length = 0;
          }
      }
      send(action) {
          UniServiceJSBridge.publishHandler(BRIDGE_NODE_SYNC, action, this.pageId);
      }
  }
  function pushCreateAction(pageNode, nodeId, nodeName) {
      pageNode.push([ACTION_TYPE_CREATE, nodeId, nodeName]);
  }
  function pushInsertAction(pageNode, newChild, parentNodeId, index) {
      pageNode.push([
          ACTION_TYPE_INSERT,
          newChild.nodeId,
          parentNodeId,
          index,
          newChild.toJSON({ attr: true }),
      ]);
  }
  function pushRemoveAction(pageNode, nodeId, parentNodeId) {
      pageNode.push([ACTION_TYPE_REMOVE, nodeId, parentNodeId]);
  }
  function pushSetAttributeAction(pageNode, nodeId, name, value) {
      pageNode.push([ACTION_TYPE_SET_ATTRIBUTE, nodeId, name, value]);
  }
  function pushRemoveAttributeAction(pageNode, nodeId, name) {
      pageNode.push([ACTION_TYPE_REMOVE_ATTRIBUTE, nodeId, name]);
  }
  function pushSetTextAction(pageNode, nodeId, text) {
      pageNode.push([ACTION_TYPE_SET_TEXT, nodeId, text]);
  }
  function createPageNode(pageId, pageOptions, setup) {
      return new UniPageNode(pageId, pageOptions, setup);
  }

  function setupPage(component) {
      return component;
  }

  const pagesMap = new Map();
  function definePage(pagePath, component) {
      pagesMap.set(pagePath, once(createFactory(component)));
  }
  function createPage(pageId, pagePath, pageQuery, pageInstance, pageOptions) {
      return createApp(pagesMap.get(pagePath)(), {
          pagePath,
          pageQuery,
          pageInstance,
      }).mount(createPageNode(pageId, pageOptions));
  }
  function createFactory(component) {
      return () => {
          return setupPage(component);
      };
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

  function getStatusbarHeight() {
      // 横屏时 iOS 获取的状态栏高度错误，进行纠正
      return plus.navigator.isImmersedStatusbar()
          ? Math.round(plus.os.name === 'iOS'
              ? plus.navigator.getSafeAreaInsets().top
              : plus.navigator.getStatusbarHeight())
          : 0;
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
      const route = path.substr(1);
      if (!webview.nvue) {
          createPage(parseInt(webview.id), route, query, null, initPageOptions(routeOptions));
      }
  }
  function initPageOptions({ meta }) {
      const statusbarHeight = getStatusbarHeight();
      return {
          version: 1,
          locale: '',
          disableScroll: meta.disableScroll === true,
          onPageScroll: false,
          onPageReachBottom: false,
          onReachBottomDistance: hasOwn$1(meta, 'onReachBottomDistance')
              ? meta.onReachBottomDistance
              : ON_REACH_BOTTOM_DISTANCE,
          statusbarHeight,
          windowTop: meta.navigationBar.type === 'float' ? statusbarHeight + NAVBAR_HEIGHT : 0,
          windowBottom: tabBar$1.indexOf(meta.route) >= 0 && tabBar$1.cover ? tabBar$1.height : 0,
      };
  }

  // ;(uni as any).__$wx__ = uni
  var index = {
      uni: uni$1,
      __definePage: definePage,
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
