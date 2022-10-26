/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
import { ComponentInternalInstance } from '@vue/composition-api';
export { initUtsProxyClass, initUtsProxyFunction, initUtsIndexClassName, initUtsClassName, initUtsPackageName, } from './uts';
export declare const onShow: (callback: ((options?: App.LaunchShowOption) => void) | (() => void), target?: ComponentInternalInstance | null) => Function;
export declare const onHide: (callback: (() => void) | (() => void), target?: ComponentInternalInstance | null) => Function;
export declare const onLaunch: (callback: (options?: App.LaunchShowOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onError: (callback: (error: string) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onPageNotFound: (callback: (options: App.PageNotFoundOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onUnhandledRejection: (callback: (options: UniApp.OnUnhandledRejectionCallbackResult) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onThemeChange: (callback: (options: UniApp.OnThemeChangeCallbackResult) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onUniNViewMessage: (callback: (options: AnyObject) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onInit: (callback: (query?: AnyObject) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onLoad: (callback: (query?: AnyObject) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onReady: (callback: () => void, target?: ComponentInternalInstance | null) => Function;
export declare const onUnload: (callback: () => void, target?: ComponentInternalInstance | null) => Function;
export declare const onPullDownRefresh: (callback: () => void, target?: ComponentInternalInstance | null) => Function;
export declare const onReachBottom: (callback: () => void, target?: ComponentInternalInstance | null) => Function;
export declare const onShareAppMessage: (callback: (options: Page.ShareAppMessageOption) => Page.CustomShareContent, target?: ComponentInternalInstance | null) => Function;
export declare const onShareTimeline: (callback: () => Page.ShareTimelineContent, target?: ComponentInternalInstance | null) => Function;
export declare const onAddToFavorites: (callback: (options: Page.AddToFavoritesOption) => Page.CustomFavoritesContent, target?: ComponentInternalInstance | null) => Function;
export declare const onPageScroll: (callback: (options: Page.PageScrollOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onResize: (callback: (options: Page.PageScrollOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onTabItemTap: (callback: (options: Page.TabItemTapOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onNavigationBarButtonTap: (callback: (options: Page.NavigationBarButtonTapOption) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onBackPress: (callback: (options: Page.BackPressOption) => any, target?: ComponentInternalInstance | null) => Function;
export declare const onNavigationBarSearchInputChanged: (callback: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onNavigationBarSearchInputConfirmed: (callback: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => Function;
export declare const onNavigationBarSearchInputClicked: (callback: () => void, target?: ComponentInternalInstance | null) => Function;
