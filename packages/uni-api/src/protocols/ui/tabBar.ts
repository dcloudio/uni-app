import { extend } from '@vue/shared'
import { getLen, removeLeadingSlash } from '@dcloudio/uni-shared'
import { getRealPath } from '@dcloudio/uni-platform'
import { getCurrentPageMeta } from '@dcloudio/uni-core'

const IndexProtocol: ApiProtocol<API_TYPE_SET_TAB_BAR_ITEM> = {
  index: {
    type: Number,
    required: true,
  },
}

const IndexOptions: ApiOptions<API_TYPE_REMOVE_TAB_BAR_BADGE> = {
  beforeInvoke() {
    const pageMeta = getCurrentPageMeta()
    if (pageMeta && !pageMeta.isTabBar) {
      return 'not TabBar page'
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar!.list[value]) {
        return 'tabbar item not found'
      }
    },
  },
}
export const API_SET_TAB_BAR_ITEM = 'setTabBarItem'
export type API_TYPE_SET_TAB_BAR_ITEM = typeof uni.setTabBarItem
export const SetTabBarItemProtocol: ApiProtocol<API_TYPE_SET_TAB_BAR_ITEM> =
  /*#__PURE__*/ extend(
    {
      text: String,
      iconPath: String,
      selectedIconPath: String,
      pagePath: String,
    },
    IndexProtocol
  )

export const SetTabBarItemOptions: ApiOptions<API_TYPE_SET_TAB_BAR_ITEM> = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /*#__PURE__*/ extend(
    {
      pagePath(value, params) {
        if (value) {
          params.pagePath = removeLeadingSlash(value)
        }
      },
    } as Required<ApiOptions<API_TYPE_SET_TAB_BAR_ITEM>>['formatArgs'],
    IndexOptions.formatArgs
  ),
}
export const API_SET_TAB_BAR_STYLE = 'setTabBarStyle'
export type API_TYPE_SET_TAB_BAR_STYLE = typeof uni.setTabBarStyle
export const SetTabBarStyleProtocol: ApiProtocol<API_TYPE_SET_TAB_BAR_STYLE> = {
  color: String,
  selectedColor: String,
  backgroundColor: String,
  backgroundImage: String,
  backgroundRepeat: String as any,
  borderStyle: String,
}
const GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/
export const SetTabBarStyleOptions: ApiOptions<API_TYPE_SET_TAB_BAR_STYLE> = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: {
    backgroundImage(value, params) {
      // TODO 修复 x-app-iOS 路径转换问题，最小化影响范围
      if (__PLATFORM__ === 'app' && __X__ && !__NODE_JS__) {
        params.backgroundImage = value
        return
      }
      if (value && !GRADIENT_RE.test(value)) {
        params.backgroundImage = getRealPath(value)
      }
    },
    borderStyle(value, params) {
      if (value) {
        params.borderStyle = value === 'white' ? 'white' : 'black'
      }
    },
  },
}
export const API_HIDE_TAB_BAR = 'hideTabBar'
export type API_TYPE_HIDE_TAB_BAR = typeof uni.hideTabBar
export const HideTabBarProtocol: ApiProtocol<API_TYPE_HIDE_TAB_BAR> = {
  animation: Boolean,
}

export const API_SHOW_TAB_BAR = 'showTabBar'
export type API_TYPE_SHOW_TAB_BAR = typeof uni.showTabBar
export const ShowTabBarProtocol: ApiProtocol<API_TYPE_SHOW_TAB_BAR> =
  HideTabBarProtocol

export const API_HIDE_TAB_BAR_RED_DOT = 'hideTabBarRedDot'
export type API_TYPE_HIDE_TAB_BAR_RED_DOT = typeof uni.hideTabBarRedDot
export const HideTabBarRedDotProtocol: ApiProtocol<API_TYPE_HIDE_TAB_BAR_RED_DOT> =
  IndexProtocol
export const HideTabBarRedDotOptions: ApiOptions<API_TYPE_HIDE_TAB_BAR_RED_DOT> =
  IndexOptions

export const API_SHOW_TAB_BAR_RED_DOT = 'showTabBarRedDot'
export type API_TYPE_SHOW_TAB_BAR_RED_DOT = typeof uni.showTabBarRedDot
export const ShowTabBarRedDotProtocol: ApiProtocol<API_TYPE_SHOW_TAB_BAR_RED_DOT> =
  IndexProtocol
export const ShowTabBarRedDotOptions: ApiOptions<API_TYPE_SHOW_TAB_BAR_RED_DOT> =
  IndexOptions

export const API_REMOVE_TAB_BAR_BADGE = 'removeTabBarBadge'
export type API_TYPE_REMOVE_TAB_BAR_BADGE = typeof uni.removeTabBarBadge
export const RemoveTabBarBadgeProtocol: ApiProtocol<API_TYPE_REMOVE_TAB_BAR_BADGE> =
  IndexProtocol
export const RemoveTabBarBadgeOptions: ApiOptions<API_TYPE_REMOVE_TAB_BAR_BADGE> =
  IndexOptions

export const API_SET_TAB_BAR_BADGE = 'setTabBarBadge'
export type API_TYPE_SET_TAB_BAR_BADGE = typeof uni.setTabBarBadge
export const SetTabBarBadgeProtocol: ApiProtocol<API_TYPE_SET_TAB_BAR_BADGE> =
  /*#__PURE__*/ extend(
    {
      text: {
        type: String,
        required: true,
      },
    },
    IndexProtocol
  )
export const SetTabBarBadgeOptions: ApiOptions<API_TYPE_SET_TAB_BAR_BADGE> = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /*#__PURE__*/ extend(
    {
      text(value, params) {
        if (getLen(value) >= 4) {
          params.text = '...'
        }
      },
    } as Required<ApiOptions<API_TYPE_SET_TAB_BAR_BADGE>>['formatArgs'],
    IndexOptions.formatArgs
  ),
}
