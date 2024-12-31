import { invokeArrayFns, isUniLifecycleHook, decodedQuery, ON_LOAD, ON_SHOW, LINEFEED, RENDERJS_MODULES, formatLog, WXS_PROTOCOL, WXS_MODULES, ON_ERROR, UniLifecycleHooks, invokeCreateErrorHandler, invokeCreateVueAppHook } from '@dcloudio/uni-shared';
import { isString, isArray, isFunction } from '@vue/shared';
import { injectHook, logError } from 'vue';

function get$pageByPage(page) {
    return page.vm.$basePage
        ;
}

function getCurrentPage() {
    const pages = getCurrentPages();
    const len = pages.length;
    if (len) {
        return pages[len - 1];
    }
}
function getCurrentPageVm() {
    var _a;
    const page = (_a = getCurrentPage()) === null || _a === void 0 ? void 0 : _a.vm
        ;
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
        const page = getCurrentPages().find((page) => get$pageByPage(page).id === vm);
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

function injectLifecycleHook(name, hook, publicThis, instance) {
    if (isFunction(hook)) {
        injectHook(name, hook.bind(publicThis), instance);
    }
}
function initHooks(options, instance, publicThis) {
    const mpType = options.mpType || publicThis.$mpType;
    if (!mpType || mpType === 'component') {
        // 仅 App,Page 类型支持在 options 中配置 on 生命周期，组件可以使用组合式 API 定义页面生命周期
        return;
    }
    Object.keys(options).forEach((name) => {
        if (isUniLifecycleHook(name, options[name], false)) {
            const hooks = options[name];
            if (isArray(hooks)) {
                hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
            }
            else {
                injectLifecycleHook(name, hooks, publicThis, instance);
            }
        }
    });
    if (mpType === 'page') {
        instance.__isVisible = true;
        // 直接触发页面 onLoad、onShow 组件内的 onLoad 和 onShow 在注册时，直接触发一次
        try {
            let query = instance.attrs.__pageQuery;
            // onLoad 的 query 进行 decode
            if (true) {
                query = new UTSJSONObject(decodedQuery(query));
            }
            if ('app' === 'app' && true) {
                // TODO 统一处理 Web
                publicThis.options = query || {};
            }
            invokeHook(publicThis, ON_LOAD, query);
            delete instance.attrs.__pageQuery;
            // iOS-X 的非 Tab 页面与 uni-app 一致固定触发 onShow
            const $basePage = true
                ? publicThis.$basePage
                : publicThis.$page;
            if (!('app' === 'app' && true && ($basePage === null || $basePage === void 0 ? void 0 : $basePage.meta.isTabBar))) {
                if (($basePage === null || $basePage === void 0 ? void 0 : $basePage.openType) !== 'preloadPage') {
                    invokeHook(publicThis, ON_SHOW);
                }
            }
        }
        catch (e) {
            console.error(e.message + LINEFEED + e.stack);
        }
    }
}

function initRenderjs(options, instance) {
    initModules(instance, options.$renderjs, options['$' + RENDERJS_MODULES]);
}
function initModules(instance, modules, moduleIds = {}) {
    if (!isArray(modules)) {
        return;
    }
    const ownerId = instance.uid;
    // 在vue的定制内核中，通过$wxsModules来判断事件函数源码中是否包含该模块调用
    // !$wxsModules.find(module => invokerSourceCode.indexOf('.' + module + '.') > -1)
    const $wxsModules = (instance.$wxsModules ||
        (instance.$wxsModules = []));
    const ctx = instance.ctx;
    modules.forEach((module) => {
        if (moduleIds[module]) {
            ctx[module] = proxyModule(ownerId, moduleIds[module], module);
            $wxsModules.push(module);
        }
        else {
            if ((process.env.NODE_ENV !== 'production')) {
                console.error(formatLog('initModules', modules, moduleIds));
            }
        }
    });
}
function proxyModule(ownerId, moduleId, module) {
    const target = {};
    return new Proxy(target, {
        get(_, p) {
            return (target[p] ||
                (target[p] = createModuleFunction(ownerId, moduleId, module, p)));
        },
    });
}
function createModuleFunction(ownerId, moduleId, module, name) {
    const target = () => { };
    const toJSON = () => WXS_PROTOCOL + JSON.stringify([ownerId, moduleId, module + '.' + name]);
    return new Proxy(target, {
        get(_, p) {
            if (p === 'toJSON') {
                return toJSON;
            }
            return (target[p] ||
                (target[p] = createModuleFunction(ownerId, moduleId, module + '.' + name, p)));
        },
        apply(_target, _thisArg, args) {
            return (WXS_PROTOCOL +
                JSON.stringify([ownerId, moduleId, module + '.' + name, [...args]]));
        },
    });
}

function initWxs(options, instance) {
    initModules(instance, options.$wxs, options['$' + WXS_MODULES]);
}

function applyOptions(options, instance, publicThis) {
    {
        initWxs(options, instance);
        initRenderjs(options, instance);
    }
    initHooks(options, instance, publicThis);
}

function set(target, key, val) {
    return (target[key] = val);
}
function $callMethod(method, ...args) {
    const fn = this[method];
    if (fn) {
        return fn(...args);
    }
    console.error(`method ${method} not found`);
    return null;
}

function createErrorHandler(app) {
    const userErrorHandler = app.config.errorHandler;
    return function errorHandler(err, instance, info) {
        if (userErrorHandler) {
            userErrorHandler(err, instance, info);
        }
        const appInstance = app._instance;
        if (!appInstance || !appInstance.proxy) {
            throw err;
        }
        if (appInstance[ON_ERROR]) {
            {
                invokeHook(appInstance.proxy, ON_ERROR, err);
            }
        }
        else {
            logError(err, info, instance ? instance.$.vnode : null, false);
        }
    };
}
function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
    UniLifecycleHooks.forEach((name) => {
        optionMergeStrategies[name] = mergeAsArray;
    });
}

let realAtob;
const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
    realAtob = function (str) {
        str = String(str).replace(/[\t\n\f\r ]+/g, '');
        if (!b64re.test(str)) {
            throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        }
        // Adding the padding if missing, for semplicity
        str += '=='.slice(2 - (str.length & 3));
        var bitmap;
        var result = '';
        var r1;
        var r2;
        var i = 0;
        for (; i < str.length;) {
            bitmap =
                (b64.indexOf(str.charAt(i++)) << 18) |
                    (b64.indexOf(str.charAt(i++)) << 12) |
                    ((r1 = b64.indexOf(str.charAt(i++))) << 6) |
                    (r2 = b64.indexOf(str.charAt(i++)));
            result +=
                r1 === 64
                    ? String.fromCharCode((bitmap >> 16) & 255)
                    : r2 === 64
                        ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
                        : String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
        }
        return result;
    };
}
else {
    // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
    realAtob = atob;
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(realAtob(str)
        .split('')
        .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(''));
}
function getCurrentUserInfo() {
    const token = uni.getStorageSync('uni_id_token') || '';
    const tokenArr = token.split('.');
    if (!token || tokenArr.length !== 3) {
        return {
            uid: null,
            role: [],
            permission: [],
            tokenExpired: 0,
        };
    }
    let userInfo;
    try {
        userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
    }
    catch (error) {
        throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
    }
    userInfo.tokenExpired = userInfo.exp * 1000;
    delete userInfo.exp;
    delete userInfo.iat;
    return userInfo;
}
function uniIdMixin(globalProperties) {
    globalProperties.uniIDHasRole = function (roleId) {
        const { role } = getCurrentUserInfo();
        return role.indexOf(roleId) > -1;
    };
    globalProperties.uniIDHasPermission = function (permissionId) {
        const { permission } = getCurrentUserInfo();
        return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
    };
    globalProperties.uniIDTokenValid = function () {
        const { tokenExpired } = getCurrentUserInfo();
        return tokenExpired > Date.now();
    };
}

function initApp(app) {
    const appConfig = app.config;
    // 该逻辑全平台会调用
    // - 需要兼容支持开发者自定义的 errorHandler
    // - nvue、vue 需要使用同一个（once） errorHandler
    // - 需要支持 uni.onError 注册监听
    //   * 目前仅部分小程序平台支持，调用uni.onError时，如果app已存在，则添加到instance的hooks中，如果不存在，则临时存储，初始化instance时添加到hooks中
    //   * 目前在 errorHandler 中，会调用 app.$callHook(ON_ERROR, err)，所以上一步需要将 uni.onError 存储到 app 的 hooks 中
    // - 部分平台（目前主要是小程序）开发阶段 uni-console 会调用 uni.onError 注册监听
    appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
    initOptionMergeStrategies(appConfig.optionMergeStrategies);
    const globalProperties = appConfig.globalProperties;
    {
        uniIdMixin(globalProperties);
    }
    {
        globalProperties.$set = set;
        globalProperties.$applyOptions = applyOptions;
        globalProperties.$callMethod = $callMethod;
    }
    {
        invokeCreateVueAppHook(app);
    }
}

export { initApp };
