export declare function isRootImmediateHook(name: string): boolean;
export declare function isRootHook(name: string): boolean;
export declare const UniLifecycleHooks: readonly ["onShow", "onHide", "onLaunch", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onResize", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onAddToFavorites", "onShareAppMessage", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"];
export declare const MINI_PROGRAM_PAGE_RUNTIME_HOOKS: {
    readonly onPageScroll: 1;
    readonly onShareAppMessage: number;
    readonly onShareTimeline: number;
};
