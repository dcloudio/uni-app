import { ComponentInternalInstance } from 'vue';
import { ref } from 'vue';
import { shallowRef } from 'vue';

export declare function getSsrGlobalData(): any;

export declare const onAddToFavorites: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onBackPress: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onError: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onHide: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onLaunch: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarButtonTap: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarSearchInputChanged: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarSearchInputClicked: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarSearchInputConfirmed: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarSearchInputFocusChanged: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onPageNotFound: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onPageScroll: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onPullDownRefresh: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onReachBottom: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onReady: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onResize: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onShareAppMessage: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onShareTimeline: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onShow: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onTabItemTap: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onThemeChange: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onUnhandledRejection: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onUnload: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare function resolveEasycom(component: unknown, easycom: unknown): unknown;

export declare const shallowSsrRef: SSRRef;

declare type SSRRef = (value: unknown, key?: string, shallow?: boolean) => ReturnType<typeof ref> | ReturnType<typeof shallowRef>;

export declare const ssrRef: SSRRef;

export { }
