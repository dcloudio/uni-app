/// <reference types="@dcloudio/types" />

import type { ComponentInternalInstance } from '@vue/runtime-core'
// @ts-ignore
import { isInSSRComponentSetup, injectHook, getCurrentInstance } from 'vue'

import {
  ON_ADD_TO_FAVORITES,
  ON_BACK_PRESS,
  ON_ERROR,
  ON_EXIT,
  ON_HIDE,
  ON_INIT,
  ON_LAUNCH,
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
  ON_SHARE_TIMELINE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_THEME_CHANGE,
  ON_UNHANDLE_REJECTION,
  ON_UNLOAD,
  UniLifecycleHooks,
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

const createHook =
  <T extends Function = () => any>(
    lifecycle: typeof UniLifecycleHooks[number]
  ) =>
  (
    hook: T,
    target: ComponentInternalInstance | null = getCurrentInstance()
  ): void => {
    // post-create lifecycle registrations are noops during SSR
    !isInSSRComponentSetup && injectHook(lifecycle as any, hook, target)
  }

export const onShow = /*#__PURE__*/ createHook<
  Required<App.AppInstance>['onShow'] | Required<Page.PageInstance>['onShow']
>(ON_SHOW)
export const onHide = /*#__PURE__*/ createHook(ON_HIDE)

export const onLaunch =
  /*#__PURE__*/ createHook<Required<App.AppInstance>['onLaunch']>(ON_LAUNCH)
export const onError =
  /*#__PURE__*/ createHook<Required<App.AppInstance>['onError']>(ON_ERROR)
export const onThemeChange =
  /*#__PURE__*/ createHook<Required<App.AppInstance>['onThemeChange']>(
    ON_THEME_CHANGE
  )
export const onPageNotFound =
  /*#__PURE__*/ createHook<Required<App.AppInstance>['onPageNotFound']>(
    ON_PAGE_NOT_FOUND
  )
export const onUnhandledRejection = /*#__PURE__*/ createHook<
  Required<App.AppInstance>['onUnhandledRejection']
>(ON_UNHANDLE_REJECTION)

export const onExit = /*#__PURE__*/ createHook<() => void>(ON_EXIT)

export const onInit =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onInit']>(ON_INIT)
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
export const onLoad =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onLoad']>(ON_LOAD)
export const onReady = /*#__PURE__*/ createHook(ON_READY)
export const onUnload = /*#__PURE__*/ createHook(ON_UNLOAD)

export const onResize =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onResize']>(ON_RESIZE)
export const onBackPress =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onBackPress']>(
    ON_BACK_PRESS
  )
export const onPageScroll =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onPageScroll']>(
    ON_PAGE_SCROLL
  )
export const onTabItemTap =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onTabItemTap']>(
    ON_TAB_ITEM_TAP
  )
export const onReachBottom = /*#__PURE__*/ createHook(ON_REACH_BOTTOM)
export const onPullDownRefresh = /*#__PURE__*/ createHook(ON_PULL_DOWN_REFRESH)

export const onSaveExitState =
  /*#__PURE__*/ createHook<onSaveExitStateHook>(ON_SAVE_EXIT_STATE)

export const onShareTimeline =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onShareTimeline']>(
    ON_SHARE_TIMELINE
  )
export const onAddToFavorites =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onAddToFavorites']>(
    ON_ADD_TO_FAVORITES
  )
export const onShareAppMessage =
  /*#__PURE__*/ createHook<Required<Page.PageInstance>['onShareAppMessage']>(
    ON_SHARE_APP_MESSAGE
  )

export const onNavigationBarButtonTap = /*#__PURE__*/ createHook<
  Required<Page.PageInstance>['onNavigationBarButtonTap']
>(ON_NAVIGATION_BAR_BUTTON_TAP)

export const onNavigationBarSearchInputChanged = /*#__PURE__*/ createHook<
  Required<Page.PageInstance>['onNavigationBarSearchInputChanged']
>(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED)
export const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED
)
export const onNavigationBarSearchInputConfirmed = /*#__PURE__*/ createHook<
  Required<Page.PageInstance>['onNavigationBarSearchInputConfirmed']
>(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED)
export const onNavigationBarSearchInputFocusChanged =
  /*#__PURE__*/ createHook<onNavigationBarSearchInputFocusChangedHook>(
    ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
  )

// for uni-app-x web
export const onPageHide = onHide
export const onPageShow = onShow
