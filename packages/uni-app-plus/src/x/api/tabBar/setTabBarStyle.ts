import {
  defineAsyncApi,
  API_TYPE_SET_TAB_BAR_STYLE,
  API_SET_TAB_BAR_STYLE,
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions,
} from '@dcloudio/uni-api'
import { getBorderStyle, getTabBar } from '../../framework/app/tabBar'
import { isString } from '@vue/shared'

export const setTabBarStyle = defineAsyncApi<API_TYPE_SET_TAB_BAR_STYLE>(
  API_SET_TAB_BAR_STYLE,
  (options: any, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject()
      // reject(new SetTabBarErrorImpl('tabBar is not exist'))
      return
    }
    const style = new Map<string, any | null>([
      ['color', options.color],
      ['selectedColor', options.selectedColor],
      ['backgroundColor', options.backgroundColor],
      ['backgroundImage', options.backgroundImage],
      ['backgroundRepeat', options.backgroundRepeat],
    ])
    if (isString(options.borderStyle)) {
      style.set('borderStyle', getBorderStyle(options.borderStyle as string))
    }
    if (options.midButton !== null) {
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
      if (midButtonOptions.iconfont !== null) {
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
    tabBar!.setTabBarStyle(style)
    resolve()
  },
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)
