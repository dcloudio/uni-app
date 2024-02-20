import { getTabBar } from '../../framework/app/tabBar'
import {
  defineAsyncApi,
  API_SET_TAB_BAR_ITEM,
  API_TYPE_SET_TAB_BAR_ITEM,
  SetTabBarItemOptions,
  SetTabBarItemProtocol,
} from '@dcloudio/uni-api'

export const setTabBarItem = defineAsyncApi<API_TYPE_SET_TAB_BAR_ITEM>(
  API_SET_TAB_BAR_ITEM,
  (
    { index, text, iconPath, selectedIconPath, pagePath, visible, iconfont },
    { resolve, reject }
  ) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject()
      //  reject(new SetTabBarErrorImpl('tabBar is not exist'))
      return
    }
    const item = new Map<string, any>([
      ['index', index],
      ['text', text],
      ['iconPath', iconPath],
      ['selectedIconPath', selectedIconPath],
      ['pagePath', pagePath],
      ['visible', visible],
    ])
    if (!!iconfont) {
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
