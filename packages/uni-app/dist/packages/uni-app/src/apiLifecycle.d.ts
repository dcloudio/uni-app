/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
import type { ComponentInternalInstance } from '@vue/runtime-core';
interface SaveExitState {
    data: any;
    expireTimeStamp: number;
}
type onSaveExitStateHook = () => SaveExitState;
interface NavigationBarSearchInputFocusChanged {
    focus: boolean;
}
type onNavigationBarSearchInputFocusChangedHook = (options: NavigationBarSearchInputFocusChanged) => void;
export declare const onShow: (hook: ((options?: App.LaunchShowOption | undefined) => void) | (() => void), target?: ComponentInternalInstance | null) => void;
export declare const onHide: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onLaunch: (hook: (options?: App.LaunchShowOption | undefined) => void, target?: ComponentInternalInstance | null) => void;
export declare const onError: (hook: (error: string) => void, target?: ComponentInternalInstance | null) => void;
export declare const onThemeChange: (hook: (options: UniApp.OnThemeChangeCallbackResult) => void, target?: ComponentInternalInstance | null) => void;
export declare const onPageNotFound: (hook: (options: App.PageNotFoundOption) => void, target?: ComponentInternalInstance | null) => void;
export declare const onUnhandledRejection: (hook: (options: UniApp.OnUnhandledRejectionCallbackResult) => void, target?: ComponentInternalInstance | null) => void;
export declare const onExit: (hook: () => void, target?: ComponentInternalInstance | null) => void;
export declare const onInit: (hook: (query?: AnyObject | undefined) => void, target?: ComponentInternalInstance | null) => void;
export declare const onLoad: (hook: (query?: AnyObject | undefined) => void, target?: ComponentInternalInstance | null) => void;
export declare const onReady: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onUnload: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onResize: (hook: (options: Page.ResizeOption) => void, target?: ComponentInternalInstance | null) => void;
export declare const onBackPress: (hook: (options: Page.BackPressOption) => any, target?: ComponentInternalInstance | null) => void;
export declare const onPageScroll: (hook: (options: Page.PageScrollOption) => void, target?: ComponentInternalInstance | null) => void;
export declare const onTabItemTap: (hook: (options: Page.TabItemTapOption) => void, target?: ComponentInternalInstance | null) => void;
export declare const onReachBottom: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onPullDownRefresh: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onSaveExitState: (hook: onSaveExitStateHook, target?: ComponentInternalInstance | null) => void;
export declare const onShareTimeline: (hook: () => Page.ShareTimelineContent, target?: ComponentInternalInstance | null) => void;
export declare const onAddToFavorites: (hook: (options: Page.AddToFavoritesOption) => Page.CustomFavoritesContent, target?: ComponentInternalInstance | null) => void;
export declare const onShareAppMessage: (hook: (options: Page.ShareAppMessageOption) => Page.CustomShareContent | Promise<Omit<Page.CustomShareContent, "promise">>, target?: ComponentInternalInstance | null) => void;
export declare const onNavigationBarButtonTap: (hook: (options: Page.NavigationBarButtonTapOption) => void, target?: ComponentInternalInstance | null) => void;
export declare const onNavigationBarSearchInputChanged: (hook: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => void;
export declare const onNavigationBarSearchInputClicked: (hook: () => any, target?: ComponentInternalInstance | null) => void;
export declare const onNavigationBarSearchInputConfirmed: (hook: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => void;
export declare const onNavigationBarSearchInputFocusChanged: (hook: onNavigationBarSearchInputFocusChangedHook, target?: ComponentInternalInstance | null) => void;
export {};
