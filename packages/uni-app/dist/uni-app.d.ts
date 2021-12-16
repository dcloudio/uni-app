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

export declare const onAddToFavorites: (hook: onAddToFavoritesHook, target?: ComponentInternalInstance | null) => any;

declare type onAddToFavoritesHook = (options: AddToFavoritesOption) => AddToFavoritesContent | void;

declare type onAppShowHook = (options: LaunchShowOption) => void;

export declare const onBackPress: (hook: onBackPressHook, target?: ComponentInternalInstance | null) => any;

declare type onBackPressHook = (options: BackPressOption) => boolean | void;

export declare const onError: (hook: onErrorHook, target?: ComponentInternalInstance | null) => any;

declare type onErrorHook = (error: string) => void;

export declare const onHide: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onLaunch: (hook: onLaunchHook, target?: ComponentInternalInstance | null) => any;

declare type onLaunchHook = (options: LaunchOption) => void;

export declare const onLoad: (hook: onLoadHook, target?: ComponentInternalInstance | null) => any;

declare type onLoadHook = (query: Record<string, string | undefined>) => void;

export declare const onNavigationBarButtonTap: (hook: onNavigationBarButtonTapHook, target?: ComponentInternalInstance | null) => any;

declare type onNavigationBarButtonTapHook = (options: NavigationBarButtonTapOption) => void;

export declare const onNavigationBarSearchInputChanged: (hook: onNavigationBarSearchInputChangedHook, target?: ComponentInternalInstance | null) => any;

declare type onNavigationBarSearchInputChangedHook = (options: NavigationBarSearchInputChangedOption) => void;

export declare const onNavigationBarSearchInputClicked: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onNavigationBarSearchInputConfirmed: (hook: onNavigationBarSearchInputConfirmedHook, target?: ComponentInternalInstance | null) => any;

declare type onNavigationBarSearchInputConfirmedHook = (options: NavigationBarSearchInputConfirmedOption) => void;

export declare const onNavigationBarSearchInputFocusChanged: (hook: onNavigationBarSearchInputFocusChangedHook, target?: ComponentInternalInstance | null) => any;

declare type onNavigationBarSearchInputFocusChangedHook = (options: NavigationBarSearchInputFocusChanged) => void;

export declare const onPageNotFound: (hook: onPageNotFoundHook, target?: ComponentInternalInstance | null) => any;

declare type onPageNotFoundHook = (options: PageNotFoundOption) => void;

export declare const onPageScroll: (hook: onPageScrollHook, target?: ComponentInternalInstance | null) => any;

declare type onPageScrollHook = (options: PageScrollOption) => void;

declare type onPageShowHook = () => void;

export declare const onPullDownRefresh: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onReachBottom: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onReady: (hook: () => any, target?: ComponentInternalInstance | null) => any;

export declare const onResize: (hook: onResizeHook, target?: ComponentInternalInstance | null) => any;

declare type onResizeHook = (options: ResizeOption) => void;

export declare const onShareAppMessage: (hook: onShareAppMessageHook, target?: ComponentInternalInstance | null) => any;

declare type onShareAppMessageHook = (options: ShareAppMessageOption) => CustomShareAppMessage | void;

export declare const onShareTimeline: (hook: onShareTimelineHook, target?: ComponentInternalInstance | null) => any;

declare type onShareTimelineHook = () => CustomShareTimeline | void;

export declare const onShow: (hook: onAppShowHook | onPageShowHook, target?: ComponentInternalInstance | null) => any;

export declare const onTabItemTap: (hook: onTabItemTapHook, target?: ComponentInternalInstance | null) => any;

declare type onTabItemTapHook = (options: TabItemTapOption) => void;

export declare const onThemeChange: (hook: onThemeChangeHook, target?: ComponentInternalInstance | null) => any;

declare type onThemeChangeHook = (options: ThemeChangeOption) => void;

export declare const onUnhandledRejection: (hook: onUnhandledRejectionHook, target?: ComponentInternalInstance | null) => any;

declare type onUnhandledRejectionHook = (options: UnhandledRejectionOption) => void;

export declare const onUnload: (hook: () => any, target?: ComponentInternalInstance | null) => any;

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

declare interface ResizeOption {
    size: {
        windowWidth: number;
        windowHeight: number;
    };
}

export declare function resolveEasycom(component: unknown, easycom: unknown): unknown;

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
