const path = require('path')

const {
  getPlatforms,
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const PLATFORMS = getPlatforms()

const alipayWindowMap = {
  defaultTitle: 'navigationBarTitleText',
  pullRefresh: 'enablePullDownRefresh',
  allowsBounceVertical: 'allowsBounceVertical',
  titleBarColor: 'navigationBarBackgroundColor',
  optionMenu: 'optionMenu',
  backgroundColor: 'backgroundColor',
  usingComponents: 'usingComponents',
  navigationBarShadow: 'navigationBarShadow',
  titleImage: 'titleImage',
  transparentTitle: 'transparentTitle',
  titlePenetrate: 'titlePenetrate'
}

const alipayTabBarMap = {
  textColor: 'color',
  selectedColor: 'selectedColor',
  backgroundColor: 'backgroundColor',
  items: 'list'
}

const alipayTabBarItemMap = {
  pagePath: 'pagePath',
  name: 'text',
  icon: 'iconPath',
  activeIcon: 'selectedIconPath'
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn (obj, key) {
  return _hasOwnProperty.call(obj, key)
}

function parseStyle (style = {}, root = '') {
  // TODO pages.json 触发了两次，需要排查
  style = JSON.parse(JSON.stringify(style))

  let platformStyle = {}

  Object.keys(style).forEach(name => {
    if (PLATFORMS.includes(name)) {
      if (name === process.env.UNI_PLATFORM) {
        platformStyle = style[name] || {}
      }
      delete style[name]
    }
  })

  if (root && process.env.UNI_PLATFORM === 'app-plus') { // 处理分包逻辑
    if (Array.isArray(platformStyle.subNVues) && platformStyle.subNVues.length) {
      platformStyle.subNVues.forEach(subNVue => {
        subNVue.path = normalizePath(path.join(root, subNVue.path))
      })
    }
  }

  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    const windowOptions = {}
    Object.keys(alipayWindowMap).forEach(key => {
      if (hasOwn(style, alipayWindowMap[key])) {
        windowOptions[key] = style[alipayWindowMap[key]]
      }
    })
    return Object.assign(windowOptions, platformStyle)
  }

  if (style.navigationBarTextStyle && style.navigationBarTextStyle !== 'black') {
    style.navigationBarTextStyle = 'white'
  }

  return Object.assign({
    usingComponents: {}
  }, style, platformStyle)
}

function parseTabBar (style = {}) {
  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    const tabBarOptions = {}
    Object.keys(alipayTabBarMap).forEach(key => {
      if (hasOwn(style, alipayTabBarMap[key])) {
        tabBarOptions[key] = style[alipayTabBarMap[key]]
      }
    })
    if (Array.isArray(tabBarOptions.items) && tabBarOptions.items.length) {
      tabBarOptions.items = tabBarOptions.items.map(itemOptions => {
        const tabBarItemOptions = {}
        Object.keys(alipayTabBarItemMap).forEach(key => {
          if (hasOwn(itemOptions, alipayTabBarItemMap[key])) {
            tabBarItemOptions[key] = itemOptions[alipayTabBarItemMap[key]]
          }
        })
        return tabBarItemOptions
      })
    }
    return tabBarOptions
  }

  return style
}

module.exports = {
  hasOwn,
  parseStyle,
  parseTabBar
}
