'use strict';

var vue = require('vue');
var shared = require('@vue/shared');
var uniShared = require('@dcloudio/uni-shared');

function assertKey(key, shallow = false) {
    if (!key) {
        throw new Error(`${shallow ? 'shallowSsrRef' : 'ssrRef'}: You must provide a key.`);
    }
}
function proxy(target, track, trigger) {
    return new Proxy(target, {
        get(target, prop) {
            track();
            if (shared.isObject(target[prop])) {
                return proxy(target[prop], track, trigger);
            }
            return Reflect.get(target, prop);
        },
        set(obj, prop, newVal) {
            const result = Reflect.set(obj, prop, newVal);
            trigger();
            return result;
        },
    });
}
const globalData = {};
const ssrServerRef = (value, key, shallow = false) => {
    assertKey(key, shallow);
    const ctx = vue.getCurrentInstance() && vue.useSSRContext();
    let state;
    if (ctx) {
        const __uniSSR = ctx[uniShared.UNI_SSR] || (ctx[uniShared.UNI_SSR] = {});
        state = __uniSSR[uniShared.UNI_SSR_DATA] || (__uniSSR[uniShared.UNI_SSR_DATA] = {});
    }
    else {
        state = globalData;
    }
    state[key] = uniShared.sanitise(value);
    // SSR 模式下 watchEffect 不生效 https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L283
    // 故自定义ref
    return vue.customRef((track, trigger) => {
        const customTrigger = () => (trigger(), (state[key] = uniShared.sanitise(value)));
        return {
            get: () => {
                track();
                if (!shallow && shared.isObject(value)) {
                    return proxy(value, track, customTrigger);
                }
                return value;
            },
            set: (v) => {
                value = v;
                customTrigger();
            },
        };
    });
};
const ssrRef = (value, key) => {
    {
        return ssrServerRef(value, key);
    }
};
const shallowSsrRef = (value, key) => {
    {
        return ssrServerRef(value, key, true);
    }
};
function getSsrGlobalData() {
    return uniShared.sanitise(globalData);
}

/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */
function getCurrentSubNVue() {
    return uni.getSubNVueById(plus.webview.currentWebview().id);
}
function requireNativePlugin(name) {
    return weex.requireModule(name);
}

function formatAppLog(type, filename, ...args) {
    // @ts-expect-error
    if (uni.__log__) {
        // @ts-expect-error
        uni.__log__(type, filename, ...args);
    }
    else {
        console[type].apply(console, [...args, filename]);
    }
}
function formatLog(type, filename, ...args) {
    if (filename) {
        args.push(filename);
    }
    console[type].apply(console, args);
}

function resolveEasycom(component, easycom) {
    return typeof component === 'string' ? easycom : component;
}

/// <reference types="@dcloudio/types" />
// function isUniPage(target: ComponentInternalInstance | null): boolean {
//   if (target && 'renderer' in target) {
//     return target.renderer === 'page'
//   }
//   return true
// }
const createLifeCycleHook = (lifecycle, flag = 0 /* HookFlags.UNKNOWN */) => (hook, target = vue.getCurrentInstance()) => {
    // 不使用此判断了，因为组件也可以监听页面的生命周期，当页面作为组件渲染时，那监听的页面生成周期是其所在页面的，而不是其自身的
    // if (false) {
    //   // 如果只是页面生命周期，排除与App公用的，比如onShow、onHide
    //   if (flag === HookFlags.PAGE) {
    //     if (!isUniPage(target)) {
    //       return
    //     }
    //   }
    // }
    // post-create lifecycle registrations are noops during SSR
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
};
const onShow = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_SHOW, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
const onHide = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_HIDE, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
const onLaunch = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_LAUNCH, 1 /* HookFlags.APP */);
const onError = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_ERROR, 1 /* HookFlags.APP */);
const onThemeChange = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_THEME_CHANGE, 1 /* HookFlags.APP */);
const onPageNotFound = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_PAGE_NOT_FOUND, 1 /* HookFlags.APP */);
const onUnhandledRejection = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_UNHANDLE_REJECTION, 1 /* HookFlags.APP */);
const onExit = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_EXIT, 1 /* HookFlags.APP */);
const onInit = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_INIT, 2 /* HookFlags.PAGE */ | 4 /* HookFlags.COMPONENT */);
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
const onLoad = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_LOAD, 2 /* HookFlags.PAGE */);
const onReady = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_READY, 2 /* HookFlags.PAGE */);
const onUnload = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_UNLOAD, 2 /* HookFlags.PAGE */);
const onResize = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_RESIZE, 2 /* HookFlags.PAGE */);
const onBackPress = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_BACK_PRESS, 2 /* HookFlags.PAGE */);
const onPageScroll = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_PAGE_SCROLL, 2 /* HookFlags.PAGE */);
const onTabItemTap = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_TAB_ITEM_TAP, 2 /* HookFlags.PAGE */);
const onReachBottom = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_REACH_BOTTOM, 2 /* HookFlags.PAGE */);
const onPullDownRefresh = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_PULL_DOWN_REFRESH, 2 /* HookFlags.PAGE */);
const onSaveExitState = 
/*#__PURE__*/ createLifeCycleHook(uniShared.ON_SAVE_EXIT_STATE, 2 /* HookFlags.PAGE */);
const onShareTimeline = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_SHARE_TIMELINE, 2 /* HookFlags.PAGE */);
const onAddToFavorites = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_ADD_TO_FAVORITES, 2 /* HookFlags.PAGE */);
const onShareAppMessage = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_SHARE_APP_MESSAGE, 2 /* HookFlags.PAGE */);
const onNavigationBarButtonTap = /*#__PURE__*/ createLifeCycleHook(uniShared.ON_NAVIGATION_BAR_BUTTON_TAP, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputChanged = 
/*#__PURE__*/ createLifeCycleHook(uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputClicked = 
/*#__PURE__*/ createLifeCycleHook(uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputConfirmed = 
/*#__PURE__*/ createLifeCycleHook(uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputFocusChanged = 
/*#__PURE__*/ createLifeCycleHook(uniShared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, 2 /* HookFlags.PAGE */);
// for uni-app-x web
const onPageHide = onHide;
const onPageShow = onShow;

function renderComponentSlot(slots, name, props = null) {
    if (slots[name]) {
        return slots[name](props);
    }
    return null;
}

Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function () { return shared.capitalize; }
});
Object.defineProperty(exports, "extend", {
  enumerable: true,
  get: function () { return shared.extend; }
});
Object.defineProperty(exports, "hasOwn", {
  enumerable: true,
  get: function () { return shared.hasOwn; }
});
Object.defineProperty(exports, "isPlainObject", {
  enumerable: true,
  get: function () { return shared.isPlainObject; }
});
exports.formatAppLog = formatAppLog;
exports.formatLog = formatLog;
exports.getCurrentSubNVue = getCurrentSubNVue;
exports.getSsrGlobalData = getSsrGlobalData;
exports.onAddToFavorites = onAddToFavorites;
exports.onBackPress = onBackPress;
exports.onError = onError;
exports.onExit = onExit;
exports.onHide = onHide;
exports.onInit = onInit;
exports.onLaunch = onLaunch;
exports.onLoad = onLoad;
exports.onNavigationBarButtonTap = onNavigationBarButtonTap;
exports.onNavigationBarSearchInputChanged = onNavigationBarSearchInputChanged;
exports.onNavigationBarSearchInputClicked = onNavigationBarSearchInputClicked;
exports.onNavigationBarSearchInputConfirmed = onNavigationBarSearchInputConfirmed;
exports.onNavigationBarSearchInputFocusChanged = onNavigationBarSearchInputFocusChanged;
exports.onPageHide = onPageHide;
exports.onPageNotFound = onPageNotFound;
exports.onPageScroll = onPageScroll;
exports.onPageShow = onPageShow;
exports.onPullDownRefresh = onPullDownRefresh;
exports.onReachBottom = onReachBottom;
exports.onReady = onReady;
exports.onResize = onResize;
exports.onSaveExitState = onSaveExitState;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.onShow = onShow;
exports.onTabItemTap = onTabItemTap;
exports.onThemeChange = onThemeChange;
exports.onUnhandledRejection = onUnhandledRejection;
exports.onUnload = onUnload;
exports.renderComponentSlot = renderComponentSlot;
exports.requireNativePlugin = requireNativePlugin;
exports.resolveEasycom = resolveEasycom;
exports.shallowSsrRef = shallowSsrRef;
exports.ssrRef = ssrRef;
