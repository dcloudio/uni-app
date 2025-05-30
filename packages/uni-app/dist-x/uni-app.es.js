import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from 'vue';
import { hasOwn } from '@vue/shared';
export { capitalize, extend, hasOwn, isPlainObject } from '@vue/shared';
import { sanitise, UNI_SSR_DATA, UNI_SSR_GLOBAL_DATA, UNI_SSR, ON_SHOW, ON_HIDE, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, ON_EXIT, ON_INIT, ON_LOAD, ON_READY, ON_UNLOAD, ON_RESIZE, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SAVE_EXIT_STATE, ON_SHARE_TIMELINE, ON_ADD_TO_FAVORITES, ON_SHARE_APP_MESSAGE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED } from '@dcloudio/uni-shared';

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
const createLifeCycleHook = (lifecycle, flag = 0 /* HookFlags.UNKNOWN */) => (hook, target = getCurrentInstance()) => {
    // 不使用此判断了，因为组件也可以监听页面的生命周期，当页面作为组件渲染时，那监听的页面生成周期是其所在页面的，而不是其自身的
    // if (true) {
    //   // 如果只是页面生命周期，排除与App公用的，比如onShow、onHide
    //   if (flag === HookFlags.PAGE) {
    //     if (!isUniPage(target)) {
    //       return
    //     }
    //   }
    // }
    // post-create lifecycle registrations are noops during SSR
    !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /*#__PURE__*/ createLifeCycleHook(ON_SHOW, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
const onHide = /*#__PURE__*/ createLifeCycleHook(ON_HIDE, 1 /* HookFlags.APP */ | 2 /* HookFlags.PAGE */);
const onLaunch = /*#__PURE__*/ createLifeCycleHook(ON_LAUNCH, 1 /* HookFlags.APP */);
const onError = /*#__PURE__*/ createLifeCycleHook(ON_ERROR, 1 /* HookFlags.APP */);
const onThemeChange = /*#__PURE__*/ createLifeCycleHook(ON_THEME_CHANGE, 1 /* HookFlags.APP */);
const onPageNotFound = /*#__PURE__*/ createLifeCycleHook(ON_PAGE_NOT_FOUND, 1 /* HookFlags.APP */);
const onUnhandledRejection = /*#__PURE__*/ createLifeCycleHook(ON_UNHANDLE_REJECTION, 1 /* HookFlags.APP */);
const onExit = /*#__PURE__*/ createLifeCycleHook(ON_EXIT, 1 /* HookFlags.APP */);
const onInit = /*#__PURE__*/ createLifeCycleHook(ON_INIT, 2 /* HookFlags.PAGE */ | 4 /* HookFlags.COMPONENT */);
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
const onLoad = /*#__PURE__*/ createLifeCycleHook(ON_LOAD, 2 /* HookFlags.PAGE */);
const onReady = /*#__PURE__*/ createLifeCycleHook(ON_READY, 2 /* HookFlags.PAGE */);
const onUnload = /*#__PURE__*/ createLifeCycleHook(ON_UNLOAD, 2 /* HookFlags.PAGE */);
const onResize = /*#__PURE__*/ createLifeCycleHook(ON_RESIZE, 2 /* HookFlags.PAGE */);
const onBackPress = /*#__PURE__*/ createLifeCycleHook(ON_BACK_PRESS, 2 /* HookFlags.PAGE */);
const onPageScroll = /*#__PURE__*/ createLifeCycleHook(ON_PAGE_SCROLL, 2 /* HookFlags.PAGE */);
const onTabItemTap = /*#__PURE__*/ createLifeCycleHook(ON_TAB_ITEM_TAP, 2 /* HookFlags.PAGE */);
const onReachBottom = /*#__PURE__*/ createLifeCycleHook(ON_REACH_BOTTOM, 2 /* HookFlags.PAGE */);
const onPullDownRefresh = /*#__PURE__*/ createLifeCycleHook(ON_PULL_DOWN_REFRESH, 2 /* HookFlags.PAGE */);
const onSaveExitState = 
/*#__PURE__*/ createLifeCycleHook(ON_SAVE_EXIT_STATE, 2 /* HookFlags.PAGE */);
const onShareTimeline = /*#__PURE__*/ createLifeCycleHook(ON_SHARE_TIMELINE, 2 /* HookFlags.PAGE */);
const onAddToFavorites = /*#__PURE__*/ createLifeCycleHook(ON_ADD_TO_FAVORITES, 2 /* HookFlags.PAGE */);
const onShareAppMessage = /*#__PURE__*/ createLifeCycleHook(ON_SHARE_APP_MESSAGE, 2 /* HookFlags.PAGE */);
const onNavigationBarButtonTap = /*#__PURE__*/ createLifeCycleHook(ON_NAVIGATION_BAR_BUTTON_TAP, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputChanged = 
/*#__PURE__*/ createLifeCycleHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputClicked = 
/*#__PURE__*/ createLifeCycleHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputConfirmed = 
/*#__PURE__*/ createLifeCycleHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, 2 /* HookFlags.PAGE */);
const onNavigationBarSearchInputFocusChanged = 
/*#__PURE__*/ createLifeCycleHook(ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, 2 /* HookFlags.PAGE */);
// for uni-app-x web
const onPageHide = onHide;
const onPageShow = onShow;

function renderComponentSlot(slots, name, props = null) {
    if (slots[name]) {
        return slots[name](props);
    }
    return null;
}

export { formatAppLog, formatLog, getCurrentSubNVue, getSsrGlobalData, onAddToFavorites, onBackPress, onError, onExit, onHide, onInit, onLaunch, onLoad, onNavigationBarButtonTap, onNavigationBarSearchInputChanged, onNavigationBarSearchInputClicked, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputFocusChanged, onPageHide, onPageNotFound, onPageScroll, onPageShow, onPullDownRefresh, onReachBottom, onReady, onResize, onSaveExitState, onShareAppMessage, onShareTimeline, onShow, onTabItemTap, onThemeChange, onUnhandledRejection, onUnload, renderComponentSlot, requireNativePlugin, resolveEasycom, shallowSsrRef, ssrRef };
