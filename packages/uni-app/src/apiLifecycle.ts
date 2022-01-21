import type { ComponentInternalInstance } from '@vue/runtime-core'
// @ts-ignore
import { isInSSRComponentSetup, injectHook, getCurrentInstance } from 'vue'

import {
  ON_ADD_TO_FAVORITES,
  ON_BACK_PRESS,
  ON_ERROR,
  ON_HIDE,
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
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_TIMELINE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_THEME_CHANGE,
  ON_UNHANDLE_REJECTION,
  ON_UNLOAD,
  UniLifecycleHooks,
} from '@dcloudio/uni-shared'

interface ReferrerInfo {
  appId: string
  extraData?: any
}

interface LaunchShowOption {
  path: string
  query: Record<string, string | undefined>
  scene: number
  shareTicket: string
  referrerInfo?: ReferrerInfo
}

type LaunchOption = LaunchShowOption

type onAppShowHook = (options: LaunchShowOption) => void
type onPageShowHook = () => void

type onLaunchHook = (options: LaunchOption) => void
type onLoadHook = (query: Record<string, string | undefined>) => void
type onErrorHook = (error: string) => void
interface ThemeChangeOption {
  theme: 'dark' | 'light'
}
type onThemeChangeHook = (options: ThemeChangeOption) => void
interface PageNotFoundOption {
  path: string
  query: Record<string, string | undefined>
  isEntryPage: boolean
}
type onPageNotFoundHook = (options: PageNotFoundOption) => void

interface UnhandledRejectionOption {
  promise: Promise<any>
  reason: string
}
type onUnhandledRejectionHook = (options: UnhandledRejectionOption) => void

interface ResizeOption {
  size: {
    windowWidth: number
    windowHeight: number
  }
}
type onResizeHook = (options: ResizeOption) => void
interface BackPressOption {
  from: 'backbutton' | 'navigateBack'
}
type onBackPressHook = (options: BackPressOption) => boolean | void

interface PageScrollOption {
  scrollTop: number
}
type onPageScrollHook = (options: PageScrollOption) => void

interface TabItemTapOption {
  index: string
  pagePath: string
  text: string
}
type onTabItemTapHook = (options: TabItemTapOption) => void

interface CustomShareTimeline {
  title?: string
  query?: string
  imageUrl?: string
}

type onShareTimelineHook = () => CustomShareTimeline | void

interface AddToFavoritesOption {
  webviewUrl?: string
}

interface AddToFavoritesContent {
  title?: string
  imageUrl?: string
  query?: string
}

type onAddToFavoritesHook = (
  options: AddToFavoritesOption
) => AddToFavoritesContent | void

interface ShareAppMessageOption {
  from: 'button' | 'menu' | string
  target: any
  webViewUrl?: string
}

interface CustomShareAppMessage {
  title?: string
  path?: string
  imageUrl?: string
}

type onShareAppMessageHook = (
  options: ShareAppMessageOption
) => CustomShareAppMessage | void

interface NavigationBarButtonTapOption {
  index: number
}

type onNavigationBarButtonTapHook = (
  options: NavigationBarButtonTapOption
) => void
interface NavigationBarSearchInputChangedOption {
  text: string
}
type onNavigationBarSearchInputChangedHook = (
  options: NavigationBarSearchInputChangedOption
) => void

type NavigationBarSearchInputConfirmedOption =
  NavigationBarSearchInputChangedOption

type onNavigationBarSearchInputConfirmedHook = (
  options: NavigationBarSearchInputConfirmedOption
) => void
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
  (hook: T, target: ComponentInternalInstance | null = getCurrentInstance()) =>
    // post-create lifecycle registrations are noops during SSR
    !isInSSRComponentSetup && injectHook(lifecycle as any, hook, target)

export const onShow = /*#__PURE__*/ createHook<onAppShowHook | onPageShowHook>(
  ON_SHOW
)
export const onHide = /*#__PURE__*/ createHook(ON_HIDE)

export const onLaunch = /*#__PURE__*/ createHook<onLaunchHook>(ON_LAUNCH)
export const onError = /*#__PURE__*/ createHook<onErrorHook>(ON_ERROR)
export const onThemeChange =
  /*#__PURE__*/ createHook<onThemeChangeHook>(ON_THEME_CHANGE)
export const onPageNotFound =
  /*#__PURE__*/ createHook<onPageNotFoundHook>(ON_PAGE_NOT_FOUND)
export const onUnhandledRejection =
  /*#__PURE__*/ createHook<onUnhandledRejectionHook>(ON_UNHANDLE_REJECTION)
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
export const onLoad = /*#__PURE__*/ createHook<onLoadHook>(ON_LOAD)
export const onReady = /*#__PURE__*/ createHook(ON_READY)
export const onUnload = /*#__PURE__*/ createHook(ON_UNLOAD)

export const onResize = /*#__PURE__*/ createHook<onResizeHook>(ON_RESIZE)
export const onBackPress =
  /*#__PURE__*/ createHook<onBackPressHook>(ON_BACK_PRESS)
export const onPageScroll =
  /*#__PURE__*/ createHook<onPageScrollHook>(ON_PAGE_SCROLL)
export const onTabItemTap =
  /*#__PURE__*/ createHook<onTabItemTapHook>(ON_TAB_ITEM_TAP)
export const onReachBottom = /*#__PURE__*/ createHook(ON_REACH_BOTTOM)
export const onPullDownRefresh = /*#__PURE__*/ createHook(ON_PULL_DOWN_REFRESH)

export const onShareTimeline =
  /*#__PURE__*/ createHook<onShareTimelineHook>(ON_SHARE_TIMELINE)
export const onAddToFavorites =
  /*#__PURE__*/ createHook<onAddToFavoritesHook>(ON_ADD_TO_FAVORITES)
export const onShareAppMessage =
  /*#__PURE__*/ createHook<onShareAppMessageHook>(ON_SHARE_APP_MESSAGE)

export const onNavigationBarButtonTap =
  /*#__PURE__*/ createHook<onNavigationBarButtonTapHook>(
    ON_NAVIGATION_BAR_BUTTON_TAP
  )

export const onNavigationBarSearchInputChanged =
  /*#__PURE__*/ createHook<onNavigationBarSearchInputChangedHook>(
    ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED
  )
export const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED
)
export const onNavigationBarSearchInputConfirmed =
  /*#__PURE__*/ createHook<onNavigationBarSearchInputConfirmedHook>(
    ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED
  )
export const onNavigationBarSearchInputFocusChanged =
  /*#__PURE__*/ createHook<onNavigationBarSearchInputFocusChangedHook>(
    ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
  )
