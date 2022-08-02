import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from 'vue';
import { hasOwn, isString, extend, isPlainObject } from '@vue/shared';
import { sanitise, UNI_SSR_DATA, UNI_SSR_GLOBAL_DATA, UNI_SSR, ON_SHOW, ON_HIDE, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, ON_INIT, ON_LOAD, ON_READY, ON_UNLOAD, ON_RESIZE, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SAVE_EXIT_STATE, ON_SHARE_TIMELINE, ON_ADD_TO_FAVORITES, ON_SHARE_APP_MESSAGE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED } from '@dcloudio/uni-shared';

function getSSRDataType() {
    return getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA;
}
function assertKey(key, shallow = false) {
    if (!key) {
        throw new Error(`${shallow ? 'shallowSsrRef' : 'ssrRef'}: You must provide a key.`);
    }
}
const ssrClientRef = (value, key, shallow = false) => {
    const valRef = shallow ? shallowRef(value) : ref(value);
    // 非 h5 平台
    if (typeof window === 'undefined') {
        return valRef;
    }
    const __uniSSR = window[UNI_SSR];
    if (!__uniSSR) {
        return valRef;
    }
    const type = getSSRDataType();
    assertKey(key, shallow);
    if (hasOwn(__uniSSR[type], key)) {
        valRef.value = __uniSSR[type][key];
        if (type === UNI_SSR_DATA) {
            delete __uniSSR[type][key]; // TODO 非全局数据仅使用一次？否则下次还会再次使用该数据
        }
    }
    return valRef;
};
const globalData = {};
const ssrRef = (value, key) => {
    return ssrClientRef(value, key);
};
const shallowSsrRef = (value, key) => {
    return ssrClientRef(value, key, true);
};
function getSsrGlobalData() {
    return sanitise(globalData);
}

/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */
function getCurrentSubNVue() {
    // @ts-ignore
    return uni.getSubNVueById(plus.webview.currentWebview().id);
}
function requireNativePlugin(name) {
    return weex.requireModule(name);
}

function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
}

// @ts-ignore
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
    // post-create lifecycle registrations are noops during SSR
    !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /*#__PURE__*/ createHook(ON_SHOW);
const onHide = /*#__PURE__*/ createHook(ON_HIDE);
const onLaunch = /*#__PURE__*/ createHook(ON_LAUNCH);
const onError = /*#__PURE__*/ createHook(ON_ERROR);
const onThemeChange = 
/*#__PURE__*/ createHook(ON_THEME_CHANGE);
const onPageNotFound = 
/*#__PURE__*/ createHook(ON_PAGE_NOT_FOUND);
const onUnhandledRejection = 
/*#__PURE__*/ createHook(ON_UNHANDLE_REJECTION);
const onInit = /*#__PURE__*/ createHook(ON_INIT);
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
const onLoad = /*#__PURE__*/ createHook(ON_LOAD);
const onReady = /*#__PURE__*/ createHook(ON_READY);
const onUnload = /*#__PURE__*/ createHook(ON_UNLOAD);
const onResize = /*#__PURE__*/ createHook(ON_RESIZE);
const onBackPress = 
/*#__PURE__*/ createHook(ON_BACK_PRESS);
const onPageScroll = 
/*#__PURE__*/ createHook(ON_PAGE_SCROLL);
const onTabItemTap = 
/*#__PURE__*/ createHook(ON_TAB_ITEM_TAP);
const onReachBottom = /*#__PURE__*/ createHook(ON_REACH_BOTTOM);
const onPullDownRefresh = /*#__PURE__*/ createHook(ON_PULL_DOWN_REFRESH);
const onSaveExitState = 
/*#__PURE__*/ createHook(ON_SAVE_EXIT_STATE);
const onShareTimeline = 
/*#__PURE__*/ createHook(ON_SHARE_TIMELINE);
const onAddToFavorites = 
/*#__PURE__*/ createHook(ON_ADD_TO_FAVORITES);
const onShareAppMessage = 
/*#__PURE__*/ createHook(ON_SHARE_APP_MESSAGE);
const onNavigationBarButtonTap = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
const onNavigationBarSearchInputChanged = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
const onNavigationBarSearchInputConfirmed = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
const onNavigationBarSearchInputFocusChanged = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED);

let callbackId = 1;
let proxy;
const callbacks = {};
function normalizeArg(arg) {
    if (typeof arg === 'function') {
        const id = callbackId++;
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
function initUtsInstanceMethod(async, opts) {
    return initProxyFunction(async, opts);
}
function getProxy() {
    if (!proxy) {
        proxy = uni.requireNativePlugin('UTS-Proxy');
    }
    return proxy;
}
function resolveSyncResult(res) {
    if (res.errMsg) {
        throw new Error(res.errMsg);
    }
    return res.params;
}
function invokePropGetter(args) {
    return resolveSyncResult(getProxy().invokeSync(args, () => { }));
}
function initProxyFunction(async, { package: pkg, class: cls, name: propOrMethod, id: instanceId, }) {
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
        ? { id: instanceId, name: propOrMethod }
        : {
            package: pkg,
            class: cls,
            name: propOrMethod,
        };
    return (...args) => {
        const invokeArgs = extend({}, baseArgs, {
            params: args.map((arg) => normalizeArg(arg)),
        });
        if (async) {
            return new Promise((resolve, reject) => {
                getProxy().invokeAsync(invokeArgs, (res) => {
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
        return resolveSyncResult(getProxy().invokeSync(invokeArgs, invokeCallback));
    };
}
function initUtsStaticMethod(async, opts) {
    return initProxyFunction(async, opts);
}
const initUtsProxyFunction = initUtsStaticMethod;
function initUtsProxyClass({ package: pkg, class: cls, methods, props, staticProps, staticMethods, }) {
    const baseOptions = {
        package: pkg,
        class: cls,
    };
    return class ProxyClass {
        constructor(...params) {
            const target = {};
            // 初始化实例 ID
            const instanceId = initProxyFunction(false, extend({ name: 'constructor', params }, baseOptions)).apply(null, params);
            return new Proxy(this, {
                get(_, name) {
                    if (!target[name]) {
                        //实例方法
                        if (hasOwn(methods, name)) {
                            target[name] = initUtsInstanceMethod(!!methods[name].async, extend({
                                id: instanceId,
                                name,
                            }, baseOptions));
                        }
                        else if (hasOwn(staticMethods, name)) {
                            // 静态方法
                            target[name] = initUtsStaticMethod(!!staticMethods[name].async, extend({ name }, baseOptions));
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({ id: instanceId, name: name });
                        }
                        else if (staticProps.includes(name)) {
                            // 静态属性
                            return invokePropGetter(extend({ name: name }, baseOptions));
                        }
                    }
                    return target[name];
                },
            });
        }
    };
}

export { getCurrentSubNVue, getSsrGlobalData, initUtsProxyClass, initUtsProxyFunction, onAddToFavorites, onBackPress, onError, onHide, onInit, onLaunch, onLoad, onNavigationBarButtonTap, onNavigationBarSearchInputChanged, onNavigationBarSearchInputClicked, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputFocusChanged, onPageNotFound, onPageScroll, onPullDownRefresh, onReachBottom, onReady, onResize, onSaveExitState, onShareAppMessage, onShareTimeline, onShow, onTabItemTap, onThemeChange, onUnhandledRejection, onUnload, requireNativePlugin, resolveEasycom, shallowSsrRef, ssrRef };
