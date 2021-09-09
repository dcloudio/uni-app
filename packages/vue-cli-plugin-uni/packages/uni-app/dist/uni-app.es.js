import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from 'vue';
import { hasOwn, isString } from '@vue/shared';

const sanitise = (val) => (val && JSON.parse(JSON.stringify(val))) || val;
const UNI_SSR = '__uniSSR';
const UNI_SSR_DATA = 'data';
const UNI_SSR_GLOBAL_DATA = 'globalData';
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

function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
}

// @ts-ignore
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => 
// post-create lifecycle registrations are noops during SSR
!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
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

export { getSsrGlobalData, onAddToFavorites, onBackPress, onError, onHide, onLaunch, onNavigationBarButtonTap, onNavigationBarSearchInputChanged, onNavigationBarSearchInputClicked, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputFocusChanged, onPageNotFound, onPageScroll, onPullDownRefresh, onReachBottom, onReady, onResize, onShareAppMessage, onShareTimeline, onShow, onTabItemTap, onThemeChange, onUnhandledRejection, onUnload, resolveEasycom, shallowSsrRef, ssrRef };
