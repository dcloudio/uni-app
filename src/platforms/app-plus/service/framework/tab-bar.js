import {
  getRealPath
} from '../api/util'

import {
  publish,
  requireNativePlugin
} from '../bridge'

const TABBAR_HEIGHT = 50
const isIOS = plus.os.name === 'iOS'
let config

/**
 * tabbar显示状态
 */
let visible = true

let tabBar

/**
 * 设置角标
 * @param {string} type
 * @param {number} index
 * @param {string} text
 */
function setTabBarBadge (type, index, text) {
  if (!tabBar) {
    return
  }
  if (type === 'none') {
    tabBar.hideTabBarRedDot({
      index
    })
    tabBar.removeTabBarBadge({
      index
    })
  } else if (type === 'text') {
    tabBar.setTabBarBadge({
      index,
      text
    })
  } else if (type === 'redDot') {
    tabBar.showTabBarRedDot({
      index
    })
  }
}
/**
 * 动态设置 tabBar 某一项的内容
 */
function setTabBarItem (index, text, iconPath, selectedIconPath) {
  const item = {
    index
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
  tabBar && tabBar.setTabBarItem(item)
}
/**
 * 动态设置 tabBar 的整体样式
 * @param {Object} style 样式
 */
function setTabBarStyle (style) {
  tabBar && tabBar.setTabBarStyle(style)
}
/**
 * 隐藏 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function hideTabBar (animation) {
  visible = false
  tabBar && tabBar.hideTabBar({
    animation
  })
}
/**
 * 显示 tabBar
 * @param {boolean} animation 是否需要动画效果
 */
function showTabBar (animation) {
  visible = true
  tabBar && tabBar.showTabBar({
    animation
  })
}

export default {
  id: '0',
  init (options, clickCallback) {
    if (options && options.list.length) {
      config = options
    }
    try {
      tabBar = requireNativePlugin('uni-tabview')
    } catch (error) {
      console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`)
    }
    tabBar && tabBar.onClick(({ index }) => {
      clickCallback(config.list[index], index)
    })
    tabBar && tabBar.onMidButtonClick(() => {
      publish('onTabBarMidButtonTap', {})
    })
  },
  indexOf (page) {
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
  switchTab (page) {
    const index = this.indexOf(page)
    if (index >= 0) {
      tabBar && tabBar.switchSelect({
        index
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
  append (webview) {
    tabBar && tabBar.append({
      id: webview.id
    }, ({ code }) => {
      if (code !== 0) {
        // console.log('tab append error')
        setTimeout(() => {
          this.append(webview)
        }, 20)
      }
    })
  },
  get visible () {
    return visible
  },
  get height () {
    return (config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) + plus.navigator.getSafeAreaInsets().deviceBottom
  },
  // tabBar是否遮挡内容区域
  get cover () {
    const array = ['extralight', 'light', 'dark']
    // 设置背景颜色会失效
    return isIOS && array.indexOf(config.blurEffect) >= 0 && !config.backgroundColor
  },
  setStyle ({ mask }) {
    tabBar.setMask({
      color: mask
    })
  },
  addEventListener (name, callback) {
    tabBar.onMaskClick(callback)
  }
}
