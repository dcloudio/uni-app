/// <reference types="@dcloudio/types" />

import { capitalize } from '@vue/shared';
import type { ComponentInternalInstance } from '@vue/runtime-core';
import { extend } from '@vue/shared';
import { hasOwn } from '@vue/shared';
import { isPlainObject } from '@vue/shared';
import { OnThemeChangeCallbackResult } from '@dcloudio/types/uni-app/uni/base/ThemeChange';
import { OnUnhandledRejectionCallbackResult } from '@dcloudio/types/uni-app/uni/base/UnhandledRejectiond';
import { ref } from 'vue';
import { shallowRef } from 'vue';

export { capitalize }

export { extend }

export declare function formatAppLog(type: 'log' | 'info' | 'debug' | 'warn' | 'error', filename: string, ...args: unknown[]): void;

export declare function formatH5Log(type: keyof Console, filename: string, ...args: unknown[]): void;

/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */
/// <reference types="@dcloudio/types" />
export declare function getCurrentSubNVue(): UniApp.SubNVue;

export declare function getSsrGlobalData(): any;

export { hasOwn }

export declare function initUtsClassName(moduleName: string, className: string, is_uni_modules: boolean): string;

export declare function initUtsIndexClassName(moduleName: string, is_uni_modules: boolean): string;

export declare function initUtsPackageName(name: string, is_uni_modules: boolean): string;

export declare function initUtsProxyClass({ package: pkg, class: cls, constructor: { params: constructorParams }, methods, props, staticProps, staticMethods, errMsg, }: ProxyClassOptions): any;

export declare const initUtsProxyFunction: typeof initUtsStaticMethod;

declare function initUtsStaticMethod(async: boolean, opts: ProxyFunctionOptions): (...args: unknown[]) => unknown;

export { isPlainObject }

declare interface NavigationBarSearchInputFocusChanged {
    focus: boolean;
}

export declare const onAddToFavorites: (hook: (options: Page.AddToFavoritesOption) => Page.CustomFavoritesContent, target?: ComponentInternalInstance | null) => void;

export declare const onBackPress: (hook: (options: Page.BackPressOption) => any, target?: ComponentInternalInstance | null) => void;

export declare const onError: (hook: (error: string) => void, target?: ComponentInternalInstance | null) => void;

export declare const onHide: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onInit: (hook: (query?: AnyObject | undefined) => void, target?: ComponentInternalInstance | null) => void;

export declare const onLaunch: (hook: (options?: App.LaunchShowOption | undefined) => void, target?: ComponentInternalInstance | null) => void;

export declare const onLoad: (hook: (query?: AnyObject | undefined) => void, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarButtonTap: (hook: (options: Page.NavigationBarButtonTapOption) => void, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarSearchInputChanged: (hook: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarSearchInputClicked: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarSearchInputConfirmed: (hook: (event: Page.NavigationBarSearchInputEvent) => void, target?: ComponentInternalInstance | null) => void;

export declare const onNavigationBarSearchInputFocusChanged: (hook: onNavigationBarSearchInputFocusChangedHook, target?: ComponentInternalInstance | null) => void;

declare type onNavigationBarSearchInputFocusChangedHook = (options: NavigationBarSearchInputFocusChanged) => void;

export declare const onPageNotFound: (hook: (options: App.PageNotFoundOption) => void, target?: ComponentInternalInstance | null) => void;

export declare const onPageScroll: (hook: (options: Page.PageScrollOption) => void, target?: ComponentInternalInstance | null) => void;

export declare const onPullDownRefresh: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onReachBottom: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onReady: (hook: () => any, target?: ComponentInternalInstance | null) => void;

export declare const onResize: (hook: (options: Page.ResizeOption) => void, target?: ComponentInternalInstance | null) => void;

export declare const onSaveExitState: (hook: onSaveExitStateHook, target?: ComponentInternalInstance | null) => void;

declare type onSaveExitStateHook = () => SaveExitState;

export declare const onShareAppMessage: (hook: (options: Page.ShareAppMessageOption) => Page.CustomShareContent | Promise<Omit<Page.CustomShareContent, "promise">>, target?: ComponentInternalInstance | null) => void;

export declare const onShareTimeline: (hook: () => Page.ShareTimelineContent, target?: ComponentInternalInstance | null) => void;

export declare const onShow: (hook: ((options?: App.LaunchShowOption | undefined) => void) | (() => void), target?: ComponentInternalInstance | null) => void;

export declare const onTabItemTap: (hook: (options: Page.TabItemTapOption) => void, target?: ComponentInternalInstance | null) => void;

export declare const onThemeChange: (hook: (options: OnThemeChangeCallbackResult) => void, target?: ComponentInternalInstance | null) => void;

export declare const onUnhandledRejection: (hook: (options: OnUnhandledRejectionCallbackResult) => void, target?: ComponentInternalInstance | null) => void;

export declare const onUnload: (hook: () => any, target?: ComponentInternalInstance | null) => void;

declare interface Parameter {
    name: string;
    type: string;
}

declare interface ProxyClassOptions {
    package: string;
    class: string;
    constructor: {
        params: Parameter[];
    };
    props: string[];
    staticProps: string[];
    methods: {
        [name: string]: {
            async?: boolean;
            params: Parameter[];
        };
    };
    staticMethods: {
        [name: string]: {
            async?: boolean;
            params: Parameter[];
        };
    };
    /**
     * 运行时提示的错误信息
     */
    errMsg?: string;
}

declare interface ProxyFunctionOptions {
    /**
     * 是否是入口类
     */
    main?: boolean;
    /**
     * 包名
     */
    package: string;
    /**
     * 类名
     */
    class: string;
    /**
     * 属性名或方法名
     */
    name: string;
    /**
     * 方法名 指定的方法名（用于 IndexSwift 静态方法，自动补充前缀 s_）
     */
    method?: string;
    /**
     * 是否伴生对象
     */
    companion?: boolean;
    /**
     * 方法参数列表
     */
    params: Parameter[];
    /**
     * 运行时提示的错误信息
     */
    errMsg?: string;
}

export declare function requireNativePlugin(name: string): any;

export declare function resolveEasycom(component: unknown, easycom: unknown): unknown;

declare interface SaveExitState {
    data: any;
    expireTimeStamp: number;
}

export declare const shallowSsrRef: SSRRef;

declare type SSRRef = (value: unknown, key?: string, shallow?: boolean) => ReturnType<typeof ref> | ReturnType<typeof shallowRef>;

export declare const ssrRef: SSRRef;

export { }
