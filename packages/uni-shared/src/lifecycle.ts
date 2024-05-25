import { isFunction } from '@vue/shared'
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
  ON_SHARE_CHAT,
  ON_SHARE_TIMELINE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_THEME_CHANGE,
  ON_UNHANDLE_REJECTION,
  ON_UNLOAD,
} from './constants'

const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
]

export function isRootImmediateHook(name: string) {
  const PAGE_SYNC_HOOKS = [ON_LOAD, ON_SHOW]

  return PAGE_SYNC_HOOKS.indexOf(name) > -1
}

// isRootImmediateHookX deprecated

export function isRootHook(name: string) {
  return PAGE_HOOKS.indexOf(name) > -1
}

export const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
] as const

export const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /*#__PURE__*/ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2,
    onShareChat: 1 << 3,
  } as const
})()

export function isUniLifecycleHook(
  name: string,
  value: unknown,
  checkType = true
) {
  // 检查类型
  if (checkType && !isFunction(value)) {
    return false
  }

  if (UniLifecycleHooks.indexOf(name as any) > -1) {
    // 已预定义
    return true
  } else if (name.indexOf('on') === 0) {
    // 以 on 开头
    return true
  }
  return false
}
