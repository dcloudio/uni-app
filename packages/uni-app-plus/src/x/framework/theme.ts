import { extend, isArray, isString } from '@vue/shared'
import { getAllPages } from '../../service/framework/page/getCurrentPages'
import { fixBorderStyle, getTabBar } from './app/tabBar'
import { parsePageStyle } from './page/register'
import { initRouteOptions } from '../../service/framework/page/routeOptions'

const APP_THEME_AUTO = 'auto'
export const THEME_KEY_PREFIX = '@'

type IThemeMode = 'dark' | 'light'

declare const uni: any

// 获取 appTheme > osTheme
export function getAppThemeFallbackOS(): IThemeMode {
  let fallbackOSTheme

  const appTheme = uni.getAppBaseInfo().appTheme as IThemeMode & 'auto'

  fallbackOSTheme = appTheme
  if (appTheme === APP_THEME_AUTO) {
    const osTheme = uni.getDeviceInfo().osTheme as IThemeMode
    fallbackOSTheme = osTheme
  }
  return fallbackOSTheme
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
export function registerThemeChange(callback: (themeMode: IThemeMode) => void) {
  if (appThemeChangeCallbackId !== -1) {
    if (typeof uni.offAppThemeChange !== 'function') {
      console.error('uni.offAppThemeChange is not a function')
      return
    }
    uni.offAppThemeChange(appThemeChangeCallbackId)
    clearAppThemeChangeCallbackId()
  }
  if (typeof uni.onAppThemeChange !== 'function') {
    console.error('uni.onAppThemeChange is not a function')
    return
  }
  appThemeChangeCallbackId = uni.onAppThemeChange(function (
    res1: UTSJSONObject
  ) {
    const appThemeMode = res1['appTheme'] as IThemeMode & 'auto'
    if (appThemeMode !== APP_THEME_AUTO) {
      callback(appThemeMode)
    } else {
      callback(getAppThemeFallbackOS())
    }
  })

  if (osThemeChangeCallbackId !== -1) {
    uni.offOsThemeChange(osThemeChangeCallbackId)
    clearOsThemeChangeCallbackId()
  }
  osThemeChangeCallbackId = uni.onOsThemeChange(function (res2: UTSJSONObject) {
    const appTheme = uni.getAppBaseInfo().appTheme as IThemeMode & 'auto'
    const currentOsTheme = res2['osTheme'] as IThemeMode

    if (appTheme === APP_THEME_AUTO) {
      callback(currentOsTheme)
    }
  })
}

// 切换主题
export const onThemeChange = function (themeMode: IThemeMode) {
  // page
  const handlePage = () => {
    const pages = getAllPages()

    pages.forEach((page) => {
      const routeOptions = initRouteOptions(page.$page.path, '')
      const style = parsePageStyle(routeOptions)

      // 最终结果
      page.$setPageStyle(style)
    })
  }

  handlePage()

  // tabBar
  const handleTabBar = () => {
    const tabBar = getTabBar()
    if (tabBar !== null) {
      const tabBarConfig = extend({}, __uniConfig.tabBar!)

      normalizeTabBarStyles(tabBarConfig, __uniConfig.themeConfig, themeMode)

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
            // set TabBarItem
            tabBar.setTabBarItem(tabBarItemMap)
            index++
          })
        }
      })
      // set TabBarStyle
      fixBorderStyle(tabBarStyle)
      tabBar.setTabBarStyle(tabBarStyle)
    }
  }

  handleTabBar()
}

export function normalizePageStyles(
  pageStyle: Record<string, any | null>,
  themeConfig: Record<string, any>,
  themeMode: string
) {
  const themeMap = themeConfig?.[themeMode]
  if (!themeMap) {
    return
  }

  normalizeStyles(pageStyle, themeMap)
}

// 传递 style 替换当前主题色
function normalizeStyles(
  style: Record<string, any>,
  themeMap: Record<string, any>
) {
  Object.keys(style).forEach((key) => {
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
      const valueAsArray = value as Array<Record<string, any>>
      valueAsArray.forEach((item) => {
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
  if (!themeConfig) {
    return
  }
  const themeMap = themeConfig[themeMode]
  if (themeMap == null) {
    return
  }

  normalizeStyles(tabBar, themeMap)
}

export function useTheme() {
  // 监听
  registerThemeChange(onThemeChange)
}
