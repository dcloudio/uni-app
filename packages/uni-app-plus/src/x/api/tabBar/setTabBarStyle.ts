import {
  API_SET_TAB_BAR_STYLE,
  type API_TYPE_SET_TAB_BAR_STYLE,
  SetTabBarStyleOptions,
  SetTabBarStyleProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getTabBar } from '../../framework/app/tabBar'
import { fixBorderStyle } from '../../framework/app/utils'

export const setTabBarStyle = defineAsyncApi<API_TYPE_SET_TAB_BAR_STYLE>(
  API_SET_TAB_BAR_STYLE,
  (options: any, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    const style = new Map<string, any | null>()
    if (options.color != null) {
      style.set('color', options.color)
    }
    if (options.selectedColor != null) {
      style.set('selectedColor', options.selectedColor)
    }
    if (options.backgroundColor != null) {
      style.set('backgroundColor', options.backgroundColor)
    }
    if (options.backgroundImage != null) {
      style.set('backgroundImage', options.backgroundImage)
    }
    if (options.backgroundRepeat != null) {
      style.set('backgroundRepeat', options.backgroundRepeat)
    }
    if (options.borderStyle != null) {
      style.set('borderStyle', options.borderStyle)
    }
    if (options.borderColor != null) {
      style.set('borderColor', options.borderColor)
    }

    if (!!options.midButton) {
      const midButtonOptions = options.midButton!
      const midButton: Map<string, any> = new Map<string, any>([
        ['width', midButtonOptions.width],
        ['height', midButtonOptions.height],
        ['iconPath', midButtonOptions.iconPath],
        ['text', midButtonOptions.text],
        ['iconPath', midButtonOptions.iconPath],
        ['iconWidth', midButtonOptions.iconWidth],
        ['backgroundImage', midButtonOptions.backgroundImage],
      ])
      if (!!midButtonOptions.iconfont) {
        const iconfontOptions = midButtonOptions.iconfont!
        const iconfont: Map<string, any> = new Map<string, any>([
          ['text', iconfontOptions.text],
          ['selectedText', iconfontOptions.selectedText],
          ['fontSize', iconfontOptions.fontSize],
          ['color', iconfontOptions.color],
          ['selectedColor', iconfontOptions.selectedColor],
        ])
        midButton.set('iconfont', iconfont)
      }
      style.set('midButton', midButton)
    }

    fixBorderStyle(style)
    tabBar!.setTabBarStyle(style)
    resolve()
  },
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)
