import { TABBAR_HEIGHT } from '@dcloudio/uni-shared'

import { getRealPath } from '../../../platform/getRealPath'

import {
  API_ON_TAB_BAR_MID_BUTTON_TAP,
  type OnTabBarMidButtonTap,
} from '@dcloudio/uni-api'

let config: UniApp.TabBarOptions

/**
 * tabbar显示状态
 */
let visible = true

let tabBar: any

/**
 * 设置角标
 * @param {string} type
 * @param {number} index
 * @param {string} text
 */
function setTabBarBadge(
  type: 'none' | 'text' | 'redDot',
  index: number,
  text?: string
) {
  if (!tabBar) {
    return
  }
  if (type === 'none') {
    tabBar.hideTabBarRedDot({
      index,
    })
    tabBar.removeTabBarBadge({
      index,
    })
  } else if (type === 'text') {
    tabBar.setTabBarBadge({
      index,
      text,
    })
  } else if (type === 'redDot') {
    tabBar.showTabBarRedDot({
      index,
    })
  }
}
/**
 * 动态设置 tabBar 多项的内容
 */
function setTabBarItems(tabBarConfig: {
  list: Partial<UniApp.TabBarItemBaseOptions>[]
  midButton?: Partial<UniApp.TabBarMidButtonOptions>
}) {
  tabBar && tabBar.setTabBarItems(tabBarConfig)
}
/**
 * 动态设置 tabBar 某一项的内容
 */
function setTabBarItem(
  index: number,
  text?: string,
  iconPath?: string,
  selectedIconPath?: string,
  visible?: boolean,
  iconfont?: UniApp.SetTabBarItemIconFontOptions
) {
  type TabBarItem = Record<
    string,
    string | number | boolean | undefined | UniApp.SetTabBarItemIconFontOptions
  >
  const item: TabBarItem = {
    index,
  }
  if (text !== undefined) {
    item.text = text
  }
  if (iconPath) {
    item.iconPath = getRealPath(iconPath)
  }
  if (selectedIconPath) {
    item.selectedIconPath = getRealPath(selectedIconPath)
  }
  if (iconfont !== undefined) {
    item.iconfont = iconfont
  }
  if (visible !== undefined) {
    item.visible = config.list[index].visible = visible
    delete item.index

    const tabbarItems = config.list.map<TabBarItem>((item) => ({
      visible: item.visible,
    }))
    tabbarItems[index] = item

    setTabBarItems({ list: tabbarItems })
  } else {
    tabBar && tabBar.setTabBarItem(item)
  }
}
/**
 * 动态设置 tabBar 的整体样式
 * @param {Object} style 样式
 */
function setTabBarStyle(style: unknown) {
  tabBar && tabBar.setTabBarStyle(style)
}
/**
 * 隐藏 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function hideTabBar(animation: boolean) {
  visible = false
  tabBar &&
    tabBar.hideTabBar({
      animation,
    })
}
/**
 * 显示 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function showTabBar(animation: boolean) {
  visible = true
  tabBar &&
    tabBar.showTabBar({
      animation,
    })
}

const maskClickCallback: Function[] = []

export default {
  id: '0',
  init(options: UniApp.TabBarOptions, clickCallback: Function) {
    if (options && options.list.length) {
      config = options
    }
    try {
      tabBar = weex.requireModule('uni-tabview')
    } catch (error) {
      console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`)
    }
    tabBar.onMaskClick(() => {
      maskClickCallback.forEach((callback) => {
        callback()
      })
    })
    tabBar &&
      tabBar.onClick(({ index }: { index: number }) => {
        clickCallback(config.list[index], index)
      })
    tabBar &&
      tabBar.onMidButtonClick(() => {
        return UniServiceJSBridge.invokeOnCallback<OnTabBarMidButtonTap>(
          API_ON_TAB_BAR_MID_BUTTON_TAP
        )
      })

    // TODO useTabBarThemeChange(tabBar, options)
  },
  indexOf(page: string) {
    const config = this.config
    const itemLength = config && config.list && config.list.length
    if (itemLength) {
      for (let i = 0; i < itemLength; i++) {
        if (
          config.list[i].pagePath === page ||
          config.list[i].pagePath === `${page}.html`
        ) {
          return i
        }
      }
    }
    return -1
  },
  switchTab(page: string) {
    const index = this.indexOf(page)
    if (index >= 0) {
      tabBar &&
        tabBar.switchSelect({
          index,
        })
      return true
    }
    return false
  },
  setTabBarBadge,
  setTabBarItem,
  setTabBarStyle,
  hideTabBar,
  showTabBar,
  append(webview: PlusWebviewWebviewObject) {
    tabBar &&
      tabBar.append(
        {
          id: webview.id,
        },
        ({ code }: { code: number }) => {
          if (code !== 0) {
            setTimeout(() => {
              this.append(webview)
            }, 20)
          }
        }
      )
  },
  get config() {
    return config || __uniConfig.tabBar
  },
  get visible() {
    return visible
  },
  get height() {
    const config = this.config
    return (
      (config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) +
      plus.navigator.getSafeAreaInsets().deviceBottom!
    )
  },
  // tabBar是否遮挡内容区域
  get cover() {
    const config = this.config
    const array = ['extralight', 'light', 'dark']
    return config && array.indexOf(config.blurEffect as string) >= 0
  },
  setStyle({ mask }: { mask: string }) {
    tabBar.setMask({
      color: mask,
    })
  },
  addEventListener(_name: string, callback: Function) {
    maskClickCallback.push(callback)
  },
  removeEventListener(_name: string, callback: Function) {
    const callbackIndex = maskClickCallback.indexOf(callback)
    maskClickCallback.splice(callbackIndex, 1)
  },
}
