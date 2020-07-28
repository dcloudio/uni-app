import { isArray, isPromise, isFunction, isPlainObject, hasOwn, isString } from '@vue/shared';

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
    const { platform, pixelRatio, windowWidth } = my.getSystemInfoSync();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
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
}

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
                    catch() { }
                };
            }
        }
    }
    return (promise || {
        then(callback) {
            return callback(data);
        },
        catch() { }
    });
}
function wrapperOptions(interceptors, options = {}) {
    [HOOKS.SUCCESS, HOOKS.FAIL, HOOKS.COMPLETE].forEach(name => {
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
    returnValueHooks.forEach(hook => {
        returnValue = hook(returnValue) || returnValue;
    });
    return returnValue;
}
function getApiInterceptorHooks(method) {
    const interceptor = Object.create(null);
    Object.keys(globalInterceptors).forEach(hook => {
        if (hook !== 'returnValue') {
            interceptor[hook] = globalInterceptors[hook].slice();
        }
    });
    const scopedInterceptor = scopedInterceptors[method];
    if (scopedInterceptor) {
        Object.keys(scopedInterceptor).forEach(hook => {
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
            return res.then(options => {
                return api(wrapperOptions(interceptor, options), ...params);
            });
        }
        else {
            return api(wrapperOptions(interceptor, options), ...params);
        }
    }
    return api(options, ...params);
}

function mergeInterceptorHook(interceptors, interceptor) {
    Object.keys(interceptor).forEach(hook => {
        if (isFunction(interceptor[hook])) {
            interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
        }
    });
}
function removeInterceptorHook(interceptors, interceptor) {
    if (!interceptors || !interceptor) {
        return;
    }
    Object.keys(interceptor).forEach(hook => {
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
function addInterceptor(method, interceptor) {
    if (typeof method === 'string' && isPlainObject(interceptor)) {
        mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
    }
    else if (isPlainObject(method)) {
        mergeInterceptorHook(globalInterceptors, method);
    }
}
function removeInterceptor(method, interceptor) {
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
}

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
function handlePromise(promise) {
    if (!__UNI_PROMISE_API__) {
        return promise;
    }
    return promise
        .then(data => {
        return [null, data];
    })
        .catch(err => [err]);
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
        return this.then(value => promise.resolve(onfinally && onfinally()).then(() => value), reason => promise.resolve(onfinally && onfinally()).then(() => {
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
    return function promiseApi(options = {}, ...params) {
        if (isFunction(options.success) ||
            isFunction(options.fail) ||
            isFunction(options.complete)) {
            return wrapperReturnValue(name, invokeApi(name, api, options, ...params));
        }
        return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
            invokeApi(name, api, Object.assign({}, options, {
                success: resolve,
                fail: reject
            }), ...params);
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
            return promisify(key, wrapper(key, my[key]));
        }
    };
    return new Proxy({}, UniProxyHandlers);
}

function initGetProvider(providers) {
    return function getProvider({ service, success, fail, complete }) {
        let res;
        if (providers[service]) {
            res = {
                errMsg: 'getProvider:ok',
                service,
                provider: providers[service]
            };
            isFunction(success) && success(res);
        }
        else {
            res = {
                errMsg: 'getProvider:fail:服务[' + service + ']不存在'
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
            bottom: fromRes.windowHeight - safeArea.bottom
        };
    }
}

const getProvider = initGetProvider({
    oauth: ['alipay'],
    share: ['alipay'],
    payment: ['alipay'],
    push: ['alipay']
});
function setStorageSync(key, data) {
    return my.setStorageSync({
        key,
        data
    });
}
function getStorageSync(key) {
    const result = my.getStorageSync({
        key
    });
    // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
    return result.data !== null ? result.data : '';
}
function removeStorageSync(key) {
    return my.removeStorageSync({
        key
    });
}
function startGyroscope(args) {
    if (hasOwn(args, 'interval')) {
        console.warn('支付宝小程序 startGyroscope暂不支持interval');
    }
    args.success &&
        args.success({
            errMsg: 'startGyroscope:ok'
        });
    args.complete &&
        args.complete({
            errMsg: 'startGyroscope:ok'
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
function returnValue(methodName, res) {
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
            'content-type': 'application/json'
        };
        Object.keys(fromArgs.header).forEach(key => {
            headers[key.toLocaleLowerCase()] = fromArgs.header[key];
        });
        return {
            header() {
                return {
                    name: 'headers',
                    value: headers
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
                        value: JSON.stringify(data)
                    };
                }
                return {
                    name: 'data',
                    value: data
                };
            },
            method: 'method',
            responseType: false
        };
    },
    returnValue: {
        status: 'statusCode',
        headers: 'header'
    }
};
const setNavigationBarColor = {
    name: 'setNavigationBar',
    args: {
        frontColor: false,
        animation: false
    }
};
const setNavigationBarTitle = {
    name: 'setNavigationBar'
};
function showModal({ showCancel = true } = {}) {
    if (showCancel) {
        return {
            name: 'confirm',
            args: {
                cancelColor: false,
                confirmColor: false,
                cancelText: 'cancelButtonText',
                confirmText: 'confirmButtonText'
            },
            returnValue(fromRes, toRes) {
                toRes.confirm = fromRes.confirm;
                toRes.cancel = !fromRes.confirm;
            }
        };
    }
    return {
        name: 'alert',
        args: {
            confirmColor: false,
            confirmText: 'buttonText'
        },
        returnValue(fromRes, toRes) {
            toRes.confirm = true;
            toRes.cancel = false;
        }
    };
}
function showToast({ icon = 'success' } = {}) {
    const args = {
        title: 'content',
        icon: 'type',
        duration: false,
        image: false,
        mask: false
    };
    if (icon === 'loading') {
        return {
            name: 'showLoading',
            args
        };
    }
    return {
        name: 'showToast',
        args
    };
}
const showActionSheet = {
    name: 'showActionSheet',
    args: {
        itemList: 'items',
        itemColor: false
    },
    returnValue: {
        index: 'tapIndex'
    }
};
const showLoading = {
    args: {
        title: 'content',
        mask: false
    }
};
const uploadFile = {
    args: {
        name: 'fileName'
    }
    // 从测试结果看，是有返回对象的，文档上没有说明。
};
const downloadFile = {
    returnValue: {
        apFilePath: 'tempFilePath'
    }
};
const getFileInfo = {
    args: {
        filePath: 'apFilePath'
    }
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
    }
};
const chooseVideo = {
    // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
    returnValue: {
        apFilePath: 'tempFilePath'
    }
};
const connectSocket = {
    args: {
        method: false,
        protocols: false
    }
    // TODO 有没有返回值还需要测试下
};
const chooseImage = {
    returnValue: {
        apFilePaths: 'tempFilePaths'
    }
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
            loop: false
        };
    }
};
const saveFile = {
    args: {
        tempFilePath: 'apFilePath'
    },
    returnValue: {
        apFilePath: 'savedFilePath'
    }
};
const getSavedFileInfo = {
    args: {
        filePath: 'apFilePath'
    }
};
const getSavedFileList = {
    returnValue(fromRes, toRes) {
        toRes.fileList = fromRes.fileList.map(file => {
            return {
                filePath: file.apFilePath,
                createTime: file.createTime,
                size: file.size
            };
        });
    }
};
const removeSavedFile = {
    args: {
        filePath: 'apFilePath'
    }
};
const getLocation = {
    args: {
        type: false,
        altitude: false
    }
};
const openLocation = {
    args: {
    // TODO address 参数在阿里上是必传的
    }
};
const getNetworkType = {
    returnValue: handleNetworkInfo
};
const onNetworkStatusChange = {
    returnValue: handleNetworkInfo
};
const stopAccelerometer = {
    name: 'offAccelerometerChange'
};
const stopCompass = {
    name: 'offCompassChange'
};
const scanCode = {
    name: 'scan',
    args: {
        onlyFromCamera: 'hideAlbum'
    },
    returnValue: {
        code: 'result'
    }
};
const setClipboardData = {
    name: 'setClipboard',
    args: {
        data: 'text'
    }
};
const getClipboardData = {
    name: 'getClipboard',
    returnValue: {
        text: 'data'
    }
};
const pageScrollTo = {
    args: {
        duration: false
    }
};
const login = {
    name: 'getAuthCode',
    returnValue: {
        authCode: 'code'
    }
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
                avatarUrl: fromRes.avatar
            };
        }
    }
};
const requestPayment = {
    name: 'tradePay',
    args: {
        orderInfo: 'tradeNO'
    }
};
const getBLEDeviceServices = {
    returnValue(fromRes, toRes) {
        toRes.services = fromRes.services.map(item => {
            return {
                uuid: item.serviceId,
                isPrimary: item.isPrimary
            };
        });
    }
};
const createBLEConnection = {
    name: 'connectBLEDevice',
    args: {
        timeout: false
    }
};
const closeBLEConnection = {
    name: 'disconnectBLEDevice'
};
const onBLEConnectionStateChange = {
    name: 'onBLEConnectionStateChanged'
};
const makePhoneCall = {
    args: {
        phoneNumber: 'number'
    }
};
const stopGyroscope = {
    name: 'offGyroscopeChange'
};
const getSystemInfo = {
    returnValue: handleSystemInfo
};
const getSystemInfoSync = {
    returnValue: handleSystemInfo
};
// 文档没提到，但是实测可用。
const canvasToTempFilePath = {
    returnValue(fromRes, toRes) {
        // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
        toRes.tempFilePath = fromRes.apFilePath;
    }
};
const setScreenBrightness = {
    args: {
        value: 'brightness'
    }
};
const getScreenBrightness = {
    returnValue: {
        brightness: 'value'
    }
};
const showShareMenu = {
    name: 'showSharePanel'
};
const hideHomeButton = {
    name: 'hideBackHome'
};
const saveImageToPhotosAlbum = {
    name: 'saveImage',
    args: {
        filePath: 'url'
    }
};
const saveVideoToPhotosAlbum = {
    args: {
        filePath: 'src'
    }
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
    }
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
  chooseAddress: chooseAddress
});

var index = initUni(shims, protocols);

export default index;
