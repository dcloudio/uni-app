import { extend, isString, isArray, hasOwn, isPlainObject, isObject, toRawType, capitalize, makeMap, isFunction, isPromise } from '@vue/shared';
import { normalizeStyles, addLeadingSlash, invokeArrayFns, LINEFEED, parseQuery, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, ON_SHOW, ON_HIDE, ON_LAUNCH, formatLog, EventChannel, ON_READY, ON_UNLOAD, once, parseUrl } from '@dcloudio/uni-shared';
import { createVNode, render, injectHook, getCurrentInstance, onMounted, nextTick, onBeforeUnmount } from 'vue';

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
            if (!hasOwn(params, name)) {
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
function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options);
}
function defineAsyncApi(name, fn, protocol, options) {
    return promisify(name, wrapperAsyncApi(name, fn, (process.env.NODE_ENV !== 'production') ? protocol : undefined, options));
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

const enterOptions = /*#__PURE__*/ createLaunchOptions();
const launchOptions = /*#__PURE__*/ createLaunchOptions();
function getLaunchOptions() {
    return extend({}, launchOptions);
}
function getEnterOptions() {
    return extend({}, enterOptions);
}
function initLaunchOptions({ path, query, referrerInfo, }) {
    extend(launchOptions, {
        path,
        query: query ? parseQuery(query) : {},
        referrerInfo: referrerInfo || {},
        // TODO uni-app x
        channel: undefined ,
        launcher: undefined ,
    });
    extend(enterOptions, launchOptions);
    return extend({}, launchOptions);
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
const BaseRouteProtocol = {
    url: {
        type: String,
        required: true,
    },
};
const API_NAVIGATE_TO = 'navigateTo';
const API_REDIRECT_TO = 'redirectTo';
const API_SWITCH_TAB = 'switchTab';
const API_PRELOAD_PAGE = 'preloadPage';
const API_UN_PRELOAD_PAGE = 'unPreloadPage';
const NavigateToProtocol = 
/*#__PURE__*/ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
const NavigateToOptions = 
/*#__PURE__*/ createRouteOptions(API_NAVIGATE_TO);
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
    // TODO uni-app x
    // // https://tower.im/teams/226535/todos/16905/
    // const getAppState = weex.requireModule('plus').getAppState
    // const appState = getAppState && Number(getAppState())
    // if (appState === 2) {
    //   invokeHook(appVm, ON_HIDE, args)
    // }
}

const ANI_SHOW = 'pop-in';
const ANI_DURATION = 300;

function showWebview(webview, animationType, animationDuration, showCallback, delay) {
    // TODO options
    webview.startRender();
    webview.show();
}

let id = 1 ;
function getWebviewId() {
    return id;
}
function genWebviewId() {
    return id++;
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

function registerPage({ url, path, query, openType, webview, nvuePageVm, eventChannel, }) {
    const id = genWebviewId();
    const routeOptions = initRouteOptions(path, openType);
    const nativePage = __pageManager.createPage(url, id.toString(), new Map());
    if ((process.env.NODE_ENV !== 'production')) {
        console.log(formatLog('registerPage', path, nativePage.pageId));
    }
    // TODO initWebview
    // initWebview(webview, path, query, routeOptions.meta)
    const route = path.slice(1);
    // ;(webview as any).__uniapp_route = route
    const pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, 
    // TODO ThemeMode
    'light');
    createVuePage(id, route, query, pageInstance, {}, nativePage);
    return nativePage;
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions, nativePage) {
    const pageNode = nativePage.document.body;
    const app = getVueApp();
    const component = pagesMap.get(__pagePath)();
    const mountPage = (component) => app.mountPage(component, {
        __pageId,
        __pagePath,
        __pageQuery,
        __pageInstance,
    }, 
    // @ts-ignore
    pageNode);
    if (isPromise(component)) {
        return component.then((component) => mountPage(component));
    }
    return mountPage(component);
}

// import { setStatusBarStyle } from '../../statusBar'
const $navigateTo = (args, { resolve, reject }) => {
    const { url, events, animationType, animationDuration } = args;
    const { path, query } = parseUrl(url);
    const [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
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
};
defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo({ url, path, query, events, aniType, aniDuration, }) {
    // 当前页面触发 onHide
    invokeHook(ON_HIDE);
    const eventChannel = new EventChannel(getWebviewId() + 1, events);
    return new Promise((resolve) => {
        showWebview(registerPage({ url, path, query, openType: 'navigateTo', eventChannel }));
        // TODO uni-app x
        // setStatusBarStyle()
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

// import { getRouteOptions } from '@dcloudio/uni-core'
// import { $switchTab } from '../../../api/route/switchTab'
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
    }
    // UniServiceJSBridge.emit(ON_WEBVIEW_READY + '.' + pageId)
    isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
    // TODO uni-app x
    // const { autoclose, alwaysShowBeforeRender } = __uniConfig.splashscreen
    // if (autoclose && !alwaysShowBeforeRender) {
    //   plus.navigator.closeSplashscreen()
    // }
    const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
    // const routeOptions = getRouteOptions(entryPagePath)!
    const args = {
        url: entryPagePath + (__uniConfig.entryPageQuery || ''),
        openType: 'appLaunch',
    };
    const handler = { resolve() { }, reject() { } };
    // TODO uni-app x
    // if (routeOptions.meta.isTabBar) {
    //   return $switchTab(args, handler)
    // }
    return $navigateTo(args, handler);
}

// import { getRouteOptions, subscribeServiceMethod } from '@dcloudio/uni-core'
function initSubscribeHandlers() {
    // const { subscribe, subscribeHandler, publishHandler } = UniServiceJSBridge
    // onPlusMessage<{ type: string; data: Record<string, any>; pageId: number }>(
    //   'subscribeHandler',
    //   ({ type, data, pageId }) => {
    //     subscribeHandler(type, data, pageId)
    //   }
    // )
    // onPlusMessage<{
    //   data: Parameters<WebInvokeAppService>[0]
    //   webviewIds: string[]
    // }>(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
    //   onWebInvokeAppService(data, webviewIds)
    // })
    // subscribe(ON_WEBVIEW_READY, subscribeWebviewReady)
    // subscribe(VD_SYNC, onVdSync)
    // subscribeServiceMethod()
    // subscribeAd()
    // subscribeNavigator()
    // subscribe(WEBVIEW_INSERTED, onWebviewInserted)
    // subscribe(WEBVIEW_REMOVED, onWebviewRemoved)
    // subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod)
    // publishHandler(ON_WEBVIEW_READY, {}, 1)
    subscribeWebviewReady({}, '1');
}

// import { initKeyboardEvent } from '../dom/keyboard'
let appCtx;
const defaultApp = {
    globalData: {},
};
function getApp({ allowDefault = false } = {}) {
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
    // // 定制 useStore （主要是为了 nvue 共享）
    // if ((uni as any).Vuex && (appVm as any).$store) {
    //   const { useStore } = (uni as any).Vuex
    //     ; (uni as any).Vuex.useStore = (key: string) => {
    //       if (!key) {
    //         return (appVm as any).$store
    //       }
    //       return useStore(key)
    //     }
    // }
    initVueApp(appVm);
    appCtx = appVm;
    // initAppVm(appCtx)
    extend(appCtx, defaultApp); // 拷贝默认实现
    defineGlobalData(appCtx, defaultApp.globalData);
    // initService()
    // initEntry()
    // initTabBar()
    // initGlobalEvent()
    // initKeyboardEvent()
    initSubscribeHandlers();
    initAppLaunch(appVm);
    // // 10s后清理临时文件
    // setTimeout(clearTempFile, 10000)
    __uniConfig.ready = true;
    // nav
}

var index = {
    getApp,
    getCurrentPages: getCurrentPages$1,
    __definePage: definePage,
    __registerApp: registerApp,
};

export { index as default };
