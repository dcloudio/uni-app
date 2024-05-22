/// <reference types="@dcloudio/types" />

import type { ComponentInternalInstance } from 'vue'

import { getCurrentInstance, injectHook, isInSSRComponentSetup } from 'vue'

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

const createHook =
  <T extends Function = () => any>(
    lifecycle: (typeof UniLifecycleHooks)[number]
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

interface XhsPageInstance extends Page.PageInstance {
  /**
   * 小红书特有生命周期：监听右上角菜单“分享到微信群组”按钮的行为，并自定义分享内容。
   * @see https://miniapp.xiaohongshu.com/docs?path=/docs/frame/Page#onShareChat
   * @param options
   * @returns
   */
  onShareChat: (options: {
    /**
     * 转发的路径
     * @default 当前页面路径
     */
    path?: string
    /**
     * 自定义标题，即聊天群组内分享内容显示的标题
     * @default 当前小程序名称
     */
    title?: string
    /**
     * 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分
     * @default 当前页面路径携带的参数
     */
    query?: string
    /**
     * 自定义图片路径，可以是本地文件或者网络图片(IOS 客户端路径中如果含中文需要encode) 。支持 PNG 及 JPG，显示图片长宽比是 1:1
     * @default 默认使用小程序 Logo
     */
    imageUrl?: string
    /**
     * 如果该参数存在，则以 resolve 结果为准，如果三秒内不 resolve，分享会使用上面传入的默认
     */
    promise?: Promise<any>
    /**
     * 好友分享的内容描述
     * @default 默认取小程序描述
     */
    content?: string
  }) => void
}

export const onShareChat =
  /*#__PURE__*/ createHook<Required<XhsPageInstance>['onShareChat']>(
    ON_SHARE_CHAT
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
