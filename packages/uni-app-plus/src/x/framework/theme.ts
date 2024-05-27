import { extend, isArray, isString } from '@vue/shared'
import { getAllPages } from '../../service/framework/page/getCurrentPages'
import { getTabBar } from './app/tabBar'

const APP_THEME_AUTO = 'auto'
const THEME_KEY_PREFIX = '@'

declare const uni: any

export function getAppThemeFallbackOS(): string {
  uni.getSystemInfo({
    success: (result) => {
      const osTheme = result.osTheme
      const appTheme = result.appTheme // maybe auto
      console.log(osTheme, appTheme)
    },
    fail: (error) => {},
  })
  // const themeMode = uni.getAppTheme()
  // if (themeMode == APP_THEME_AUTO) {
  //   return uni.getOsTheme()
  // }
  // return themeMode

  // return themeMode
  return 'dark'
}

// 监听主题 id，用来 off
let osThemeChangeCallbackId = -1
let appThemeChangeCallbackId = -1

function clearOsThemeChangeCallbackId() {
  osThemeChangeCallbackId = -1
}

function clearAppThemeChangeCallbackId() {
  appThemeChangeCallbackId = -1
}

// App主题为auto时需要监听OS主题变化
export function registerThemeChange(callback: (themeMode: string) => void) {
  if (appThemeChangeCallbackId !== -1) {
    uni.offAppThemeChange(appThemeChangeCallbackId)
    clearAppThemeChangeCallbackId()
  }
  appThemeChangeCallbackId = uni.onAppThemeChange(function (
    res1: UTSJSONObject
  ) {
    const appThemeMode = res1['appTheme'] as string
    if (appThemeMode !== APP_THEME_AUTO) {
      callback(appThemeMode)
    }
    callback('dark')
  })

  if (osThemeChangeCallbackId !== -1) {
    uni.offOsThemeChange(osThemeChangeCallbackId)
    clearOsThemeChangeCallbackId()
  }
  osThemeChangeCallbackId = uni.onOsThemeChange(function (res2: UTSJSONObject) {
    // if (uni.getAppBaseInfo().appTheme == APP_THEME_AUTO) {
    //   const osThemeMode = res2['osTheme'] as string
    //   callback(osThemeMode)
    // }
    callback('dark')
  })
}

// 切换主题
export const onThemeChange = function (themeMode: string) {
  // page
  const pages = getAllPages()
  pages.forEach((page) => {
    // page.$setPageStyle(
    //   new Map([
    //     ['backgroundColor', 'blue'],
    //     ['navigationBarBackgroundColor', 'red'],
    //   ])
    // )
    // navigationBarBackgroundColor
    // page.setPageStyle(new UTSJSONObject(parsePageStyle(value.$route!, '')))
  })

  // tabBar
  const tabBar = getTabBar()
  if (tabBar !== null) {
    const tabBarConfig = extend({}, __uniConfig.tabBar!)

    normalizeTabBarStyles(
      tabBarConfig,
      __uniConfig.themeConfig,
      getAppThemeFallbackOS()
    )

    const tabBarStyle = new Map<string, any | null>()
    const tabBarItemUpdateConfig = ['iconPath', 'selectedIconPath']

    const tabBarConfigKeys = Object.keys(tabBarConfig)
    tabBarConfigKeys.forEach((key) => {
      const value = tabBarConfig[key]
      if (isString(value)) {
        tabBarStyle.set(key, value)
      } else if (isArray(value)) {
        const valueAsArray = value as Array<Record<string, any>>
        let index = 0
        valueAsArray.forEach((item) => {
          const tabBarItemMap = new Map<string, any | null>()
          tabBarItemMap.set('index', index)
          tabBarItemUpdateConfig.forEach((tabBarItemkey) => {
            if (item[tabBarItemkey] != null) {
              tabBarItemMap.set(tabBarItemkey, item[tabBarItemkey])
            }
          })
          tabBar.setTabBarItem(tabBarItemMap)
          index++
        })
      }
    })
    tabBar.setTabBarStyle(tabBarStyle)
  }
}

export function normalizePageStyles(
  pageStyle: Map<string, any | null>,
  themeConfig: Map<string, Map<string, any>>,
  themeMode: string
) {
  const themeMap = themeConfig[themeMode]
  if (themeMap == null) {
    return
  }

  normalizeStyles(pageStyle as Map<string, any>, themeMap)
}

function normalizeStyles(
  style: Record<string, any>,
  themeMap: Record<string, any>
) {
  const styleKeys = Object.keys(style)
  styleKeys.forEach((key) => {
    const value = style[key]
    if (isString(value)) {
      const valueAsString = value as string
      // handle eg: @navigationBarColor
      if (valueAsString.startsWith(THEME_KEY_PREFIX)) {
        const valueKey = valueAsString.slice(1)
        const configValue = themeMap[valueKey]
        if (configValue != null) {
          style[key] = configValue
        }
      }
    } else if (isArray(value)) {
      const valueAsArray = value as Array<Map<string, any>>
      valueAsArray.forEach((item, _) => {
        normalizeStyles(item, themeMap)
      })
    }
  })
}

export function normalizeTabBarStyles(
  tabBar: Record<string, any>,
  themeConfig: Record<string, any>,
  themeMode: string
) {
  const themeMap = themeConfig['dark']
  // const themeMap = themeConfig[themeMode]
  if (themeMap == null) {
    return
  }

  normalizeStyles(tabBar, themeMap)
}

export function useTheme() {
  registerThemeChange(onThemeChange)
}
