import { ComponentInternalInstance } from 'vue'
// @ts-ignore
import { isInSSRComponentSetup, injectHook } from 'vue'

export const enum UniLifecycleHooks {
  //App and Page
  ON_SHOW = 'onShow',
  ON_HIDE = 'onHide',
  //App
  ON_LAUNCH = 'onLaunch',
  ON_ERROR = 'onError',
  ON_THEME_CHANGE = 'onThemeChange',
  ON_PAGE_NOT_FOUND = 'onPageNotFound',
  ON_UNHANDLE_REJECTION = 'onUnhandledRejection',
  //Page
  ON_LOAD = 'onLoad',
  ON_READY = 'onReady',
  ON_UNLOAD = 'onUnload',

  ON_RESIZE = 'onResize',
  ON_BACK_PRESS = 'onBackPress',
  ON_PAGE_SCROLL = 'onPageScroll',
  ON_TAB_ITEM_TAP = 'onTabItemTap',
  ON_REACH_BOTTOM = 'onReachBottom',
  ON_PULL_DOWN_REFRESH = 'onPullDownRefresh',

  ON_SHARE_TIMELINE = 'onShareTimeline',
  ON_ADD_TO_FAVORITES = 'onAddToFavorites',
  ON_SHARE_APP_MESSAGE = 'onShareAppMessage',
  // navigationBar
  ON_NAVIGATION_BAR_BUTTON_TAP = 'onNavigationBarButtonTap',
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = 'onNavigationBarSearchInputClicked',
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = 'onNavigationBarSearchInputChanged',
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = 'onNavigationBarSearchInputConfirmed',
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = 'onNavigationBarSearchInputFocusChanged',
}

export const createHook = <T extends Function = () => any>(
  lifecycle: UniLifecycleHooks
) => (hook: T, target: ComponentInternalInstance | null) =>
  // post-create lifecycle registrations are noops during SSR
  !isInSSRComponentSetup && injectHook(lifecycle as any, hook, target)

export const onShow = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_SHOW)
export const onHide = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_HIDE)

export const onLaunch = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_LAUNCH)
export const onError = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_ERROR)
export const onThemeChange = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_THEME_CHANGE
)
export const onPageNotFound = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_PAGE_NOT_FOUND
)
export const onUnhandledRejection = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_UNHANDLE_REJECTION
)

// export const onLoad = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_LOAD)
export const onReady = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_READY)
export const onUnload = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_UNLOAD)

export const onResize = /*#__PURE__*/ createHook(UniLifecycleHooks.ON_RESIZE)
export const onBackPress = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_BACK_PRESS
)
export const onPageScroll = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_PAGE_SCROLL
)
export const onTabItemTap = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_TAB_ITEM_TAP
)
export const onReachBottom = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_REACH_BOTTOM
)
export const onPullDownRefresh = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_PULL_DOWN_REFRESH
)

export const onShareTimeline = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_SHARE_TIMELINE
)
export const onAddToFavorites = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_ADD_TO_FAVORITES
)
export const onShareAppMessage = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_SHARE_APP_MESSAGE
)

export const onNavigationBarButtonTap = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_NAVIGATION_BAR_BUTTON_TAP
)

export const onNavigationBarSearchInputChanged = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED
)
export const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED
)
export const onNavigationBarSearchInputConfirmed = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED
)
export const onNavigationBarSearchInputFocusChanged = /*#__PURE__*/ createHook(
  UniLifecycleHooks.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
)
