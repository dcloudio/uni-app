import type { ComponentInternalInstance } from '@vue/runtime-core';
import { ref } from 'vue';
import { shallowRef } from 'vue';

declare interface AddToFavoritesContent {
    title?: string;
    imageUrl?: string;
    query?: string;
}

declare interface AddToFavoritesOption {
    webviewUrl?: string;
}

declare interface BackPressOption {
    from: 'backbutton' | 'navigateBack';
}

declare interface CustomShareAppMessage {
    title?: string;
    path?: string;
    imageUrl?: string;
}

declare interface CustomShareTimeline {
    title?: string;
    query?: string;
    imageUrl?: string;
}

/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */
export declare function getCurrentSubNVue(): any;

export declare function getSsrGlobalData(): any;

declare type LaunchOption = LaunchShowOption;

declare interface LaunchShowOption {
    path: string;
    query: Record<string, string | undefined>;
    scene: number;
    shareTicket: string;
    referrerInfo?: ReferrerInfo;
}

declare interface NavigationBarButtonTapOption {
    index: number;
}

declare interface NavigationBarSearchInputChangedOption {
    text: string;
}

declare type NavigationBarSearchInputConfirmedOption = NavigationBarSearchInputChangedOption;

declare interface NavigationBarSearchInputFocusChanged {
    focus: boolean;
}

export declare const onAddToFavorites: (hook: onAddToFavoritesHook, target?: ComponentInternalInstance | null) => void;

declare type onAddToFavoritesHook = (options: AddToFavoritesOption) => AddToFavoritesContent | void;

declare type onAppShowHook = (options: LaunchShowOption) => void;

export declare const onBackPress: (hook: onBackPressHook, target?: ComponentInternalInstance | null) => void;

declare type onBackPressHook = (options: BackPressOption) => boolean | void;

export declare const onError: (hook: onErrorHook, target?: ComponentInternalInstance | null) => void;

declare type onErrorHook = (error: string) => void;

export declare const onHide: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onInit: (hook: onLoadHook, target?: ComponentInternalInstance | null) => void;

export declare const onLaunch: (hook: onLaunchHook, target?: ComponentInternalInstance | null) => void;

declare type onLaunchHook = (options: LaunchOption) => void;

export declare const onLoad: (hook: onLoadHook, target?: ComponentInternalInstance | null) => void;

declare type onLoadHook = (query: Record<string, string | undefined>) => void;

export declare const onNavigationBarButtonTap: (hook: onNavigationBarButtonTapHook, target?: ComponentInternalInstance | null) => void;

declare type onNavigationBarButtonTapHook = (options: NavigationBarButtonTapOption) => void;

export declare const onNavigationBarSearchInputChanged: (hook: onNavigationBarSearchInputChangedHook, target?: ComponentInternalInstance | null) => void;

declare type onNavigationBarSearchInputChangedHook = (options: NavigationBarSearchInputChangedOption) => void;

export declare const onNavigationBarSearchInputClicked: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarSearchInputConfirmed: (hook: onNavigationBarSearchInputConfirmedHook, target?: ComponentInternalInstance | null) => void;

declare type onNavigationBarSearchInputConfirmedHook = (options: NavigationBarSearchInputConfirmedOption) => void;

export declare const onNavigationBarSearchInputFocusChanged: (hook: onNavigationBarSearchInputFocusChangedHook, target?: ComponentInternalInstance | null) => void;

declare type onNavigationBarSearchInputFocusChangedHook = (options: NavigationBarSearchInputFocusChanged) => void;

export declare const onPageNotFound: (hook: onPageNotFoundHook, target?: ComponentInternalInstance | null) => void;

declare type onPageNotFoundHook = (options: PageNotFoundOption) => void;

export declare const onPageScroll: (hook: onPageScrollHook, target?: ComponentInternalInstance | null) => void;

declare type onPageScrollHook = (options: PageScrollOption) => void;

declare type onPageShowHook = () => void;

export declare const onPullDownRefresh: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onReachBottom: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onReady: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onResize: (hook: onResizeHook, target?: ComponentInternalInstance | null) => void;

declare type onResizeHook = (options: ResizeOption) => void;

export declare const onSaveExitState: (hook: onSaveExitStateHook, target?: ComponentInternalInstance | null) => void;

declare type onSaveExitStateHook = () => SaveExitState;

export declare const onShareAppMessage: (hook: onShareAppMessageHook, target?: ComponentInternalInstance | null) => void;

declare type onShareAppMessageHook = (options: ShareAppMessageOption) => CustomShareAppMessage | void;

export declare const onShareTimeline: (hook: onShareTimelineHook, target?: ComponentInternalInstance | null) => void;

declare type onShareTimelineHook = () => CustomShareTimeline | void;

export declare const onShow: (hook: onAppShowHook | onPageShowHook, target?: ComponentInternalInstance | null) => void;

export declare const onTabItemTap: (hook: onTabItemTapHook, target?: ComponentInternalInstance | null) => void;

declare type onTabItemTapHook = (options: TabItemTapOption) => void;

export declare const onThemeChange: (hook: onThemeChangeHook, target?: ComponentInternalInstance | null) => void;

declare type onThemeChangeHook = (options: ThemeChangeOption) => void;

export declare const onUnhandledRejection: (hook: onUnhandledRejectionHook, target?: ComponentInternalInstance | null) => void;

declare type onUnhandledRejectionHook = (options: UnhandledRejectionOption) => void;

export declare const onUnload: (hook: () => any, target?: ComponentInternalInstance | null) => void;

declare interface PageNotFoundOption {
    path: string;
    query: Record<string, string | undefined>;
    isEntryPage: boolean;
}

declare interface PageScrollOption {
    scrollTop: number;
}

declare interface ReferrerInfo {
    appId: string;
    extraData?: any;
}

export declare function requireNativePlugin(name: string): any;

declare interface ResizeOption {
    size: {
        windowWidth: number;
        windowHeight: number;
    };
}

export declare function resolveEasycom(component: unknown, easycom: unknown): unknown;

declare interface SaveExitState {
    data: any;
    expireTimeStamp: number;
}

export declare const shallowSsrRef: SSRRef;

declare interface ShareAppMessageOption {
    from: 'button' | 'menu' | string;
    target: any;
    webViewUrl?: string;
}

declare type SSRRef = (value: unknown, key?: string, shallow?: boolean) => ReturnType<typeof ref> | ReturnType<typeof shallowRef>;

export declare const ssrRef: SSRRef;

declare interface TabItemTapOption {
    index: string;
    pagePath: string;
    text: string;
}

declare interface ThemeChangeOption {
    theme: 'dark' | 'light';
}

declare interface UnhandledRejectionOption {
    promise: Promise<any>;
    reason: string;
}

export { }
