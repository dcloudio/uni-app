'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var shared = require('@vue/shared');

const sanitise = (val) => (val && JSON.parse(JSON.stringify(val))) || val;
const UNI_SSR = '__uniSSR';
const UNI_SSR_DATA = 'data';
// lifecycle
// App and Page
const ON_SHOW = 'onShow';
const ON_HIDE = 'onHide';
//App
const ON_LAUNCH = 'onLaunch';
const ON_ERROR = 'onError';
const ON_THEME_CHANGE = 'onThemeChange';
const ON_PAGE_NOT_FOUND = 'onPageNotFound';
const ON_UNHANDLE_REJECTION = 'onUnhandledRejection';
const ON_READY = 'onReady';
const ON_UNLOAD = 'onUnload';
const ON_RESIZE = 'onResize';
const ON_BACK_PRESS = 'onBackPress';
const ON_PAGE_SCROLL = 'onPageScroll';
const ON_TAB_ITEM_TAP = 'onTabItemTap';
const ON_REACH_BOTTOM = 'onReachBottom';
const ON_PULL_DOWN_REFRESH = 'onPullDownRefresh';
const ON_SHARE_TIMELINE = 'onShareTimeline';
const ON_ADD_TO_FAVORITES = 'onAddToFavorites';
const ON_SHARE_APP_MESSAGE = 'onShareAppMessage';
// navigationBar
const ON_NAVIGATION_BAR_BUTTON_TAP = 'onNavigationBarButtonTap';
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = 'onNavigationBarSearchInputClicked';
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = 'onNavigationBarSearchInputChanged';
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = 'onNavigationBarSearchInputConfirmed';
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = 'onNavigationBarSearchInputFocusChanged';

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
        const __uniSSR = ctx[UNI_SSR] || (ctx[UNI_SSR] = {});
        state = __uniSSR[UNI_SSR_DATA] || (__uniSSR[UNI_SSR_DATA] = {});
    }
    else {
        state = globalData;
    }
    state[key] = sanitise(value);
    // SSR 模式下 watchEffect 不生效 https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L253
    // 故自定义ref
    return vue.customRef((track, trigger) => {
        const customTrigger = () => (trigger(), (state[key] = sanitise(value)));
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
    return sanitise(globalData);
}

function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
}

// @ts-ignore
const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => 
// post-create lifecycle registrations are noops during SSR
!vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
const onShow = /*#__PURE__*/ createHook(ON_SHOW);
const onHide = /*#__PURE__*/ createHook(ON_HIDE);
const onLaunch = /*#__PURE__*/ createHook(ON_LAUNCH);
const onError = /*#__PURE__*/ createHook(ON_ERROR);
const onThemeChange = /*#__PURE__*/ createHook(ON_THEME_CHANGE);
const onPageNotFound = /*#__PURE__*/ createHook(ON_PAGE_NOT_FOUND);
const onUnhandledRejection = /*#__PURE__*/ createHook(ON_UNHANDLE_REJECTION);

const onReady = /*#__PURE__*/ createHook(ON_READY);
const onUnload = /*#__PURE__*/ createHook(ON_UNLOAD);
const onResize = /*#__PURE__*/ createHook(ON_RESIZE);
const onBackPress = /*#__PURE__*/ createHook(ON_BACK_PRESS);
const onPageScroll = /*#__PURE__*/ createHook(ON_PAGE_SCROLL);
const onTabItemTap = /*#__PURE__*/ createHook(ON_TAB_ITEM_TAP);
const onReachBottom = /*#__PURE__*/ createHook(ON_REACH_BOTTOM);
const onPullDownRefresh = /*#__PURE__*/ createHook(ON_PULL_DOWN_REFRESH);
const onShareTimeline = /*#__PURE__*/ createHook(ON_SHARE_TIMELINE);
const onAddToFavorites = /*#__PURE__*/ createHook(ON_ADD_TO_FAVORITES);
const onShareAppMessage = /*#__PURE__*/ createHook(ON_SHARE_APP_MESSAGE);
const onNavigationBarButtonTap = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
const onNavigationBarSearchInputChanged = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
const onNavigationBarSearchInputConfirmed = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
const onNavigationBarSearchInputFocusChanged = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED);

exports.getSsrGlobalData = getSsrGlobalData;
exports.onAddToFavorites = onAddToFavorites;
exports.onBackPress = onBackPress;
exports.onError = onError;
exports.onHide = onHide;
exports.onLaunch = onLaunch;
exports.onNavigationBarButtonTap = onNavigationBarButtonTap;
exports.onNavigationBarSearchInputChanged = onNavigationBarSearchInputChanged;
exports.onNavigationBarSearchInputClicked = onNavigationBarSearchInputClicked;
exports.onNavigationBarSearchInputConfirmed = onNavigationBarSearchInputConfirmed;
exports.onNavigationBarSearchInputFocusChanged = onNavigationBarSearchInputFocusChanged;
exports.onPageNotFound = onPageNotFound;
exports.onPageScroll = onPageScroll;
exports.onPullDownRefresh = onPullDownRefresh;
exports.onReachBottom = onReachBottom;
exports.onReady = onReady;
exports.onResize = onResize;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.onShow = onShow;
exports.onTabItemTap = onTabItemTap;
exports.onThemeChange = onThemeChange;
exports.onUnhandledRejection = onUnhandledRejection;
exports.onUnload = onUnload;
exports.resolveEasycom = resolveEasycom;
exports.shallowSsrRef = shallowSsrRef;
exports.ssrRef = ssrRef;
