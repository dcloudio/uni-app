import { getTabBar } from '../../framework/app/tabBar'
import {
  API_SET_TAB_BAR_ITEM,
  type API_TYPE_SET_TAB_BAR_ITEM,
  SetTabBarItemOptions,
  SetTabBarItemProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const setTabBarItem = defineAsyncApi<API_TYPE_SET_TAB_BAR_ITEM>(
  API_SET_TAB_BAR_ITEM,
  (
    { index, text, iconPath, selectedIconPath, pagePath, visible, iconfont },
    { resolve, reject }
  ) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    const item = new Map<string, any>()
    item.set('index', index)

    if (typeof text === 'string') {
      item.set('text', text)
    }
    if (typeof iconPath === 'string') {
      item.set('iconPath', iconPath)
    }
    if (typeof selectedIconPath === 'string') {
      item.set('selectedIconPath', selectedIconPath)
    }
    if (typeof pagePath === 'string') {
      item.set('pagePath', pagePath)
    }
    if (typeof visible === 'boolean') {
      item.set('visible', visible)
    }
    if (iconfont != null) {
      const iconfontOptions = iconfont
      const _iconfont: Map<string, any> = new Map<string, any>([
        ['text', iconfontOptions.text],
        ['selectedText', iconfontOptions.selectedText],
        ['fontSize', iconfontOptions.fontSize],
        ['color', iconfontOptions.color],
        ['selectedColor', iconfontOptions.selectedColor],
      ])
      item.set('iconfont', _iconfont)
    }

    tabBar!.setTabBarItem(item as Map<string, any | null>)

    resolve()
  },
  SetTabBarItemProtocol,
  SetTabBarItemOptions
)
