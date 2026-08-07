/// <reference types="@dcloudio/types" />

import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import {
  getCurrentInstance,
  injectHook,
  isInSSRComponentSetup,
  onBeforeUnmount,
} from 'vue'

import {
  ON_ADD_TO_FAVORITES,
  ON_BACK_PRESS,
  ON_COPY_URL,
  ON_ERROR,
  ON_EXIT,
  ON_HIDE,
  ON_INIT,
  ON_LAST_PAGE_BACK_PRESS,
  ON_LAUNCH,
  ON_LIVE_MOUNT,
  ON_LOAD,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_PAGE_NOT_FOUND,
  ON_PAGE_SCROLL,
  ON_PULL_DOWN_REFRESH,
  ON_REACH_BOTTOM,
  ON_READY,
  ON_RESIZE,
  ON_SAVE_EXIT_STATE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SHARE_TIMELINE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_THEME_CHANGE,
  ON_TITLE_CLICK,
  ON_UNHANDLE_REJECTION,
  ON_UNLOAD,
  ON_UPLOAD_DOUYIN_VIDEO,
  type UniLifecycleHooks,
} from '@dcloudio/uni-shared'

interface SaveExitState {
  data: any
  expireTimeStamp: number
}
type onSaveExitStateHook = () => SaveExitState

interface NavigationBarSearchInputFocusChanged {
  focus: boolean
}

type onNavigationBarSearchInputFocusChangedHook = (
  options: NavigationBarSearchInputFocusChanged
) => void

type AppLifecycleHook = Function & {
  __uni_app_hook?: Function
  __uni_app_target?: ComponentInternalInstance | null
}

export const enum HookFlags {
  UNKNOWN = 0,
  APP = 1,
  PAGE = 1 << 1,
  COMPONENT = 1 << 2,
}

function isUniApp(target: ComponentInternalInstance | null): boolean {
  const proxy = target?.proxy as ComponentPublicInstance | null
  const ctx = target?.ctx as Record<string, unknown> | undefined
  const type = target?.type as Record<string, unknown> | undefined
  return (
    proxy?.$mpType === 'app' || ctx?.$mpType === 'app' || type?.mpType === 'app'
  )
}

function getAppVm(): ComponentPublicInstance | undefined {
  const app = getApp({ allowDefault: true })
  return app?.$vm
}

function removeAppHook(
  vm: ComponentPublicInstance,
  name: string,
  hook: Function,
  originalHook?: Function,
  target?: ComponentInternalInstance | null
) {
  const hooks = (vm.$ as unknown as Record<string, Function[]>)[name]
  if (!Array.isArray(hooks)) {
    return
  }
  for (let i = hooks.length - 1; i >= 0; i--) {
    const appHook = hooks[i] as AppLifecycleHook
    if (
      appHook === hook ||
      (originalHook &&
        appHook.__uni_app_hook === originalHook &&
        appHook.__uni_app_target === target)
    ) {
      hooks.splice(i, 1)
    }
  }
}

function isTargetInvalid(target: ComponentInternalInstance | null) {
  return target?.isUnmounted || target?.__isUnload || target?.root?.__isUnload
}

function queueRemoveAppHook(removeHook: () => void) {
  Promise.resolve().then(removeHook)
}

function injectAppHook(
  lifecycle: string,
  hook: Function & { __weh?: Function },
  target: ComponentInternalInstance | null
) {
  const isAppInstance = isUniApp(target)
  const appVm = getAppVm()
  const appInstance = isAppInstance ? target : appVm?.$
  if (appInstance) {
    if (isAppInstance) {
      injectHook(lifecycle as any, hook, appInstance)
      return
    }
    let isRemoved = false
    let wrappedHook: Function | undefined
    const removeHook = () => {
      if (isRemoved || !wrappedHook) {
        return
      }
      isRemoved = true
      const appVm = getAppVm()
      appVm && removeAppHook(appVm, lifecycle, wrappedHook, hook, target)
    }
    const appHook = ((...args: unknown[]) => {
      if (isRemoved || isTargetInvalid(target)) {
        queueRemoveAppHook(removeHook)
        return
      }
      return hook(...args)
    }) as Function
    wrappedHook = injectHook(lifecycle as any, appHook, appInstance)
    if (wrappedHook) {
      ;(wrappedHook as AppLifecycleHook).__uni_app_hook = hook
      ;(wrappedHook as AppLifecycleHook).__uni_app_target = target
      if (isTargetInvalid(target)) {
        removeHook()
      }
    }
    // 如果不是App，那么需要监听当前target的销毁事件，来移除App上的钩子
    if (target && wrappedHook) {
      onBeforeUnmount(() => removeHook(), target)
      injectHook(ON_UNLOAD as any, () => removeHook(), target)
    }
  }
}

// function isUniPage(target: ComponentInternalInstance | null): boolean {
//   if (target && 'renderer' in target) {
//     return target.renderer === 'page'
//   }
//   return true
// }

const createLifeCycleHook =
  <T extends Function = () => any>(
    lifecycle: (typeof UniLifecycleHooks)[number],
    flag: HookFlags = HookFlags.UNKNOWN
  ) =>
  (
    hook: T,
    target: ComponentInternalInstance | null = getCurrentInstance()
  ): void => {
    if (isInSSRComponentSetup) return
    if (__X__ && flag === HookFlags.APP) {
      injectAppHook(lifecycle, hook as T & { __weh?: Function }, target)
      return
    }
    // post-create lifecycle registrations are noops during SSR
    injectHook(lifecycle as any, hook, target)
  }

export const onAppShow = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onShow']
>(ON_SHOW, HookFlags.APP)
export const onAppHide = /*#__PURE__*/ createLifeCycleHook(
  ON_HIDE,
  HookFlags.APP
)

export const onShow = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onShow']
>(ON_SHOW, HookFlags.PAGE)
export const onHide = /*#__PURE__*/ createLifeCycleHook(ON_HIDE, HookFlags.PAGE)

export const onLaunch = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onLaunch']
>(ON_LAUNCH, HookFlags.APP)
export const onError = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onError']
>(ON_ERROR, HookFlags.APP)
export const onThemeChange = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onThemeChange']
>(ON_THEME_CHANGE, HookFlags.APP)
export const onPageNotFound = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onPageNotFound']
>(ON_PAGE_NOT_FOUND, HookFlags.APP)
export const onUnhandledRejection = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onUnhandledRejection']
>(ON_UNHANDLE_REJECTION, HookFlags.APP)
export const onLastPageBackPress = /*#__PURE__*/ createLifeCycleHook<
  Required<App.AppInstance>['onLastPageBackPress']
>(ON_LAST_PAGE_BACK_PRESS, HookFlags.APP)

export const onExit = /*#__PURE__*/ createLifeCycleHook<() => void>(
  ON_EXIT,
  HookFlags.APP
)

export const onInit = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onInit']
>(ON_INIT, HookFlags.PAGE | HookFlags.COMPONENT)
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
export const onLoad = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onLoad']
>(ON_LOAD, HookFlags.PAGE)
export const onReady = /*#__PURE__*/ createLifeCycleHook(
  ON_READY,
  HookFlags.PAGE
)
export const onUnload = /*#__PURE__*/ createLifeCycleHook(
  ON_UNLOAD,
  HookFlags.PAGE
)

export const onResize = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onResize']
>(ON_RESIZE, HookFlags.PAGE)
export const onBackPress = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onBackPress']
>(ON_BACK_PRESS, HookFlags.PAGE)
export const onPageScroll = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onPageScroll']
>(ON_PAGE_SCROLL, HookFlags.PAGE)
export const onTabItemTap = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onTabItemTap']
>(ON_TAB_ITEM_TAP, HookFlags.PAGE)
export const onReachBottom = /*#__PURE__*/ createLifeCycleHook(
  ON_REACH_BOTTOM,
  HookFlags.PAGE
)
export const onPullDownRefresh = /*#__PURE__*/ createLifeCycleHook(
  ON_PULL_DOWN_REFRESH,
  HookFlags.PAGE
)
export const onSaveExitState =
  /*#__PURE__*/ createLifeCycleHook<onSaveExitStateHook>(
    ON_SAVE_EXIT_STATE,
    HookFlags.PAGE
  )

export const onTitleClick = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onTitleClick']
>(ON_TITLE_CLICK, HookFlags.PAGE)
export const onShareTimeline = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onShareTimeline']
>(ON_SHARE_TIMELINE, HookFlags.PAGE)
export const onShareChat = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onShareChat']
>(ON_SHARE_CHAT, HookFlags.PAGE)
export const onAddToFavorites = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onAddToFavorites']
>(ON_ADD_TO_FAVORITES, HookFlags.PAGE)
export const onShareAppMessage = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onShareAppMessage']
>(ON_SHARE_APP_MESSAGE, HookFlags.PAGE)
export const onCopyUrl = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onCopyUrl']
>(ON_COPY_URL, HookFlags.PAGE)
export const onUploadDouyinVideo = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onUploadDouyinVideo']
>(ON_UPLOAD_DOUYIN_VIDEO, HookFlags.PAGE)
export const onLiveMount = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onLiveMount']
>(ON_LIVE_MOUNT, HookFlags.PAGE)

export const onNavigationBarButtonTap = /*#__PURE__*/ createLifeCycleHook<
  Required<Page.PageInstance>['onNavigationBarButtonTap']
>(ON_NAVIGATION_BAR_BUTTON_TAP, HookFlags.PAGE)

export const onNavigationBarSearchInputChanged =
  /*#__PURE__*/ createLifeCycleHook<
    Required<Page.PageInstance>['onNavigationBarSearchInputChanged']
  >(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, HookFlags.PAGE)
export const onNavigationBarSearchInputClicked =
  /*#__PURE__*/ createLifeCycleHook(
    ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
    HookFlags.PAGE
  )
export const onNavigationBarSearchInputConfirmed =
  /*#__PURE__*/ createLifeCycleHook<
    Required<Page.PageInstance>['onNavigationBarSearchInputConfirmed']
  >(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, HookFlags.PAGE)
export const onNavigationBarSearchInputFocusChanged =
  /*#__PURE__*/ createLifeCycleHook<onNavigationBarSearchInputFocusChangedHook>(
    ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
    HookFlags.PAGE
  )

export const onPageShow = onShow
export const onPageHide = onHide
