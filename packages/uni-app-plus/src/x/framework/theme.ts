import { isArray, isPlainObject, isString } from '@vue/shared'
import {
  getAllPages,
  getPage$BasePage,
} from '../../service/framework/page/getCurrentPages'
import { getTabBar } from './app/tabBar'
import { parsePageStyle } from './page/register'
import { initRouteOptions } from '../../service/framework/page/routeOptions'
import { fixBorderStyle } from './app/utils'
import { UTSJSONObject } from '@dcloudio/uni-shared'
import { getNativeApp } from './app/app'
import type { IApp } from '@dcloudio/uni-app-x/types/native'

export const THEME_KEY_PREFIX = '@'
const APP_THEME_AUTO = 'auto' as const
const APP_THEME_LIGHT = 'light' as const
const APP_THEME_DARK = 'dark' as const

type IThemeMode = 'dark' | 'light'
type ThemeStyleSnapshot = Record<string, unknown>

interface ThemeVariants {
  light: ThemeStyleSnapshot
  dark: ThemeStyleSnapshot
  preserveDialogBackgroundColorContent?: true
}

interface AppThemeConfig {
  pages: Record<string, ThemeVariants>
  tabBar?: ThemeVariants
}

declare const uni: any
// runtimeAppId 是 C++ App 实例编号，不是 manifest 中的 appid。
declare function __uni__app_RegisterThemeConfig(
  runtimeAppId: number,
  config: AppThemeConfig
): boolean

// 获取当前 App 主题
export function getAppThemeFallbackOS(): IThemeMode {
  let fallbackOSTheme: IThemeMode = APP_THEME_LIGHT
  if (__VAPOR__) {
    return (getNativeApp() as IApp).isDarkTheme
      ? APP_THEME_DARK
      : fallbackOSTheme
  } else {
    try {
      const appTheme = uni.getAppBaseInfo().appTheme as
        | IThemeMode
        | typeof APP_THEME_AUTO

      if (appTheme === APP_THEME_AUTO) {
        const osTheme = uni.getDeviceInfo().osTheme as IThemeMode
        fallbackOSTheme = osTheme
      } else {
        fallbackOSTheme = appTheme
      }
      return fallbackOSTheme
    } catch (e) {
      console.error(e)
      return fallbackOSTheme
    }
  }
}

// 监听主题 id，用来 off
let appThemeChangeCallbackId = -1

function clearAppThemeChangeCallbackId() {
  appThemeChangeCallbackId = -1
}

// App主题为auto时需要监听OS主题变化
export function registerThemeChange(callback: (themeMode: IThemeMode) => void) {
  try {
    if (appThemeChangeCallbackId !== -1) {
      uni.offAppThemeChange(appThemeChangeCallbackId)
      clearAppThemeChangeCallbackId()
    }
    appThemeChangeCallbackId = uni.onAppThemeChange(function (
      res1: UTSJSONObject
    ) {
      const appThemeMode = res1['appTheme'] as IThemeMode
      callback(appThemeMode)
    })
  } catch (e) {
    // console.warn(e)
  }
}

// 切换主题
export const onThemeChange = function (themeMode: IThemeMode) {
  // page
  const handlePage = () => {
    const pages = getAllPages()

    pages.forEach((page) => {
      const basePage = getPage$BasePage(page)
      const routeOptions = initRouteOptions(basePage.path, '')
      routeOptions.meta.isQuit = basePage.meta.isQuit
      const style = parsePageStyle(routeOptions)

      ;(page.$page as UniPage).setPageStyle(new UTSJSONObject(style))
    })
  }

  handlePage()

  // tabBar
  const handleTabBar = () => {
    const tabBar = getTabBar()
    if (tabBar !== null) {
      const tabBarConfig = __uniConfig.getTabBarConfig()

      normalizeTabBarStyles(tabBarConfig, __uniConfig.themeConfig, themeMode)

      const tabBarStyle = new Map<string, any | null>()
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
            Object.keys(item).forEach((tabBarItemkey) => {
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
    } else if (isPlainObject(value)) {
      normalizeStyles(value, themeMap)
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

function hasThemeValue(value: unknown): boolean {
  if (isString(value)) {
    return value.charCodeAt(0) === 64
  }
  if (isArray(value)) {
    return value.some(hasThemeValue)
  }
  return (
    isPlainObject(value) &&
    Object.keys(value).some((key) => hasThemeValue(value[key]))
  )
}

function createThemeVariants(
  style: Record<string, unknown>,
  themeConfig: UniApp.ThemeJson
): ThemeVariants | null {
  const snapshot: ThemeStyleSnapshot = {}
  Object.keys(style).forEach((key) => {
    if (hasThemeValue(style[key])) {
      snapshot[key] = style[key]
    }
  })
  if (Object.keys(snapshot).some((key) => key.startsWith('navigation'))) {
    Object.keys(style).forEach((key) => {
      if (key.startsWith('navigation')) {
        snapshot[key] = style[key]
      }
    })
  }
  if (Object.keys(snapshot).length === 0) {
    return null
  }

  const light = JSON.parse(JSON.stringify(snapshot)) as ThemeStyleSnapshot
  const dark = JSON.parse(JSON.stringify(snapshot)) as ThemeStyleSnapshot
  normalizeStyles(light, themeConfig.light || {})
  normalizeStyles(dark, themeConfig.dark || {})
  // 页面创建时已确定 default/custom；动态主题暂不切换导航栏类型。
  delete light.navigationStyle
  delete dark.navigationStyle
  if (JSON.stringify(light) === JSON.stringify(dark)) {
    return null
  }
  return { light, dark }
}

export function createThemeSnapshots(
  routes: ReadonlyArray<Pick<UniApp.UniRoute, 'path' | 'meta'>> = __uniRoutes,
  themeConfig: UniApp.ThemeJson | undefined = __uniConfig.themeConfig,
  tabBarConfig:
    | Record<string, unknown>
    | undefined = __uniConfig.getTabBarConfig()
): AppThemeConfig | undefined {
  if (themeConfig == null) {
    return
  }
  const pages: Record<string, ThemeVariants> = {}
  routes.forEach((route) => {
    const routePath = route.meta.route || route.path.replace(/^\/+/, '')
    const style = initRouteOptions(route.path, '').meta as unknown as Record<
      string,
      unknown
    >
    delete style.navigationBar
    if (
      Object.keys(style).some((key) => key.startsWith('navigation')) &&
      style.navigationBarTextStyle !== 'custom' &&
      !style.isQuit &&
      routePath !== __uniConfig.realEntryPagePath
    ) {
      style.navigationBarAutoBackButton = true
    }
    const variants = createThemeVariants(style, themeConfig)
    if (variants != null) {
      if (
        !route.meta.backgroundColorContent &&
        'backgroundColorContent' in variants.light
      ) {
        variants.preserveDialogBackgroundColorContent = true
      }
      pages[routePath] = variants
    }
  })

  const tabBar = tabBarConfig
    ? createThemeVariants(tabBarConfig, themeConfig) || undefined
    : undefined
  if (Object.keys(pages).length === 0 && tabBar == null) {
    return
  }
  const result: AppThemeConfig = { pages }
  if (tabBar != null) {
    result.tabBar = tabBar
  }
  return result
}

function registerThemeConfig() {
  const config = createThemeSnapshots()
  if (config != null) {
    const app = getNativeApp() as IApp & { readonly id: number }
    if (!__uni__app_RegisterThemeConfig(app.id, config)) {
      throw new Error('Failed to register app theme config')
    }
  }
}

export function useTheme() {
  if (__VAPOR__) {
    registerThemeConfig()
    return
  }
  // 监听
  registerThemeChange(onThemeChange)
}
