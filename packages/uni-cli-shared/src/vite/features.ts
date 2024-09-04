import fs from 'fs'
import path from 'path'
import type { ConfigEnv } from 'vite'
import { extend, isArray, isString } from '@vue/shared'

interface ProjectFeatures {
  i18nLocale: boolean
  i18nEn: boolean
  i18nEs: boolean
  i18nFr: boolean
  i18nZhHans: boolean
  i18nZhHant: boolean
  uniCloud: boolean
}
interface PagesFeatures {
  nvue: boolean
  pages: boolean
  tabBar: boolean
  tabBarMidButton: boolean
  topWindow: boolean
  leftWindow: boolean
  rightWindow: boolean
  navigationBar: boolean
  pullDownRefresh: boolean
  navigationBarButtons: boolean
  navigationBarSearchInput: boolean
  navigationBarTransparent: boolean
}
interface ManifestFeatures {
  wx: boolean
  wxs: boolean
  rpx: boolean
  promise: boolean
  longpress: boolean
  routerMode: '"hash"' | '"history"'
  vueOptionsApi: boolean
  vueProdDevTools: boolean
  vueProdHydrationMismatchDetails: boolean
}

function initProjectFeature({ inputDir }: InitFeaturesOptions) {
  const features: ProjectFeatures = {
    i18nLocale: false,
    i18nEn: true,
    i18nEs: true,
    i18nFr: true,
    i18nZhHans: true,
    i18nZhHant: true,
    uniCloud: false,
  }
  const localesDir = path.resolve(inputDir, 'locale')
  if (fs.existsSync(localesDir)) {
    if (
      fs.readdirSync(localesDir).find((file) => path.extname(file) === '.json')
    ) {
      features.i18nLocale = true
    }
  }
  if (process.env.UNI_CLOUD_PROVIDER) {
    try {
      const providers = JSON.parse(process.env.UNI_CLOUD_PROVIDER)
      if (providers.length) {
        features.uniCloud = true
      }
    } catch (e) {}
  }
  return features
}

function initPagesFeature({
  pagesJson,
  command,
  inputDir,
  ssr,
}: InitFeaturesOptions): PagesFeatures {
  const features: PagesFeatures = {
    nvue: true,
    pages: true,
    tabBar: true,
    tabBarMidButton: true,
    topWindow: false,
    leftWindow: false,
    rightWindow: false,
    navigationBar: true,
    pullDownRefresh: false,
    navigationBarButtons: true,
    navigationBarSearchInput: true,
    navigationBarTransparent: true,
  }

  const { tabBar, pages, topWindow, leftWindow, rightWindow, globalStyle } =
    pagesJson
  // ssr 时强制启用多页面（需要用到router）
  if (!ssr && pages && pages.length === 1) {
    features.pages = false
  }
  if (!(tabBar && tabBar.list && tabBar.list.length)) {
    features.tabBar = false
    features.tabBarMidButton = false
  }
  if (features.tabBar && !tabBar!.midButton) {
    features.tabBarMidButton = false
  }
  if (topWindow && topWindow.path) {
    features.topWindow = true
  }
  if (leftWindow && leftWindow.path) {
    features.leftWindow = true
  }
  if (rightWindow && rightWindow.path) {
    features.rightWindow = true
  }
  if (globalStyle.enablePullDownRefresh) {
    features.pullDownRefresh = true
  } else {
    if (pages.find((page) => page.style && page.style.enablePullDownRefresh)) {
      features.pullDownRefresh = true
    }
  }
  if (command === 'build') {
    if (
      !pages.find((page) =>
        fs.existsSync(path.resolve(inputDir, page.path + '.nvue'))
      )
    ) {
      features.nvue = false
    }
    let isNavigationCustom = false
    if (globalStyle.navigationBar.style === 'custom') {
      isNavigationCustom = true // 全局custom
      if (pages.find((page) => page.style.navigationBar.style === 'default')) {
        isNavigationCustom = false
      }
    } else {
      // 所有页面均custom
      if (pages.every((page) => page.style.navigationBar.style === 'custom')) {
        isNavigationCustom = true
      }
    }
    if (isNavigationCustom) {
      features.navigationBar = false
      features.navigationBarButtons = false
      features.navigationBarSearchInput = false
      features.navigationBarTransparent = false
    } else {
      if (
        !pages.find(
          (page) =>
            isArray(page.style.navigationBar.buttons) &&
            page.style.navigationBar.buttons.length
        )
      ) {
        features.navigationBarButtons = false
      }
      if (
        !globalStyle.navigationBar.searchInput &&
        !pages.find((page) => page.style.navigationBar.searchInput)
      ) {
        features.navigationBarSearchInput = false
      }
      if (
        globalStyle.navigationBar.type !== 'transparent' &&
        !pages.find((page) => page.style.navigationBar.type === 'transparent')
      ) {
        features.navigationBarTransparent = false
      }
    }
  }
  return features
}

function initManifestFeature({
  manifestJson,
  command,
  platform,
}: InitFeaturesOptions): ManifestFeatures {
  const features: ManifestFeatures = {
    wx: false,
    wxs: true,
    rpx: true,
    promise: false,
    longpress: true,
    routerMode: '"hash"',
    vueOptionsApi: true,
    vueProdDevTools: false,
    vueProdHydrationMismatchDetails: false,
  }

  if (command === 'build') {
    // TODO 需要预编译一遍？
    // features.wxs = false
    // features.longpress = false
  }
  const webManifest = manifestJson.web || manifestJson.h5
  if (
    webManifest &&
    webManifest.router &&
    webManifest.router.mode === 'history'
  ) {
    features.routerMode = '"history"'
  }
  // TODO other features
  return features
}

export type FEATURE_DEFINES = ReturnType<typeof initFeatures>

interface InitFeaturesOptions {
  pagesJson: UniApp.PagesJson
  manifestJson: any
  inputDir: string
  platform: UniApp.PLATFORM
  command: ConfigEnv['command']
  ssr: boolean
}

export function initFeatures(options: InitFeaturesOptions) {
  const {
    wx,
    wxs,
    rpx,
    nvue,
    uniCloud,
    i18nEn,
    i18nEs,
    i18nFr,
    i18nZhHans,
    i18nZhHant,
    i18nLocale,
    vueOptionsApi,
    vueProdDevTools,
    vueProdHydrationMismatchDetails,
    pages,
    tabBar,
    tabBarMidButton,
    promise,
    longpress,
    routerMode,
    topWindow,
    leftWindow,
    rightWindow,
    navigationBar,
    pullDownRefresh,
    navigationBarButtons,
    navigationBarSearchInput,
    navigationBarTransparent,
  } = extend(
    initManifestFeature(options),
    initPagesFeature(options),
    initProjectFeature(options)
  )
  // uni-app-x运行时可调用$setPageStyle，需启用相关特性方可支持。否则$setPageStyle无效果
  const features = {
    // vue
    __VUE_OPTIONS_API__: vueOptionsApi, // enable/disable Options API support, default: true
    __VUE_PROD_DEVTOOLS__: vueProdDevTools, // enable/disable devtools support in production, default: false
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: vueProdHydrationMismatchDetails,
    // uni
    __UNI_FEATURE_WX__: wx, // 是否启用小程序的组件实例 API，如：selectComponent 等（uni-core/src/service/plugin/appConfig）
    __UNI_FEATURE_WXS__: wxs, // 是否启用 wxs 支持，如：getComponentDescriptor 等（uni-core/src/view/plugin/appConfig）
    __UNI_FEATURE_RPX__: rpx, // 是否启用运行时 rpx 支持
    __UNI_FEATURE_PROMISE__: promise, // 是否启用旧版本的 promise 支持（即返回[err,res]的格式）,默认返回标准
    __UNI_FEATURE_LONGPRESS__: longpress, // 是否启用longpress
    __UNI_FEATURE_I18N_EN__: i18nEn, // 是否启用en
    __UNI_FEATURE_I18N_ES__: i18nEs, // 是否启用es
    __UNI_FEATURE_I18N_FR__: i18nFr, // 是否启用fr
    __UNI_FEATURE_I18N_ZH_HANS__: i18nZhHans, // 是否启用zh_Hans
    __UNI_FEATURE_I18N_ZH_HANT__: i18nZhHant, // 是否启用zh_Hant
    // 以下特性，编译器已自动识别是否需要启用
    __UNI_FEATURE_UNI_CLOUD__: uniCloud, // 是否启用uniCloud
    __UNI_FEATURE_I18N_LOCALE__: i18nLocale, // 是否启用i18n
    __UNI_FEATURE_NVUE__: nvue, // 是否启用nvue
    __UNI_FEATURE_ROUTER_MODE__: routerMode, // 路由模式
    __UNI_FEATURE_PAGES__: pages, // 是否多页面
    __UNI_FEATURE_TABBAR__: tabBar, // 是否包含tabBar
    __UNI_FEATURE_TABBAR_MIDBUTTON__: tabBarMidButton, // 是否包含midButton
    __UNI_FEATURE_TOPWINDOW__: topWindow, // 是否包含topWindow
    __UNI_FEATURE_LEFTWINDOW__: leftWindow, // 是否包含leftWindow
    __UNI_FEATURE_RIGHTWINDOW__: rightWindow, // 是否包含rightWindow
    __UNI_FEATURE_RESPONSIVE__: topWindow || leftWindow || rightWindow, // 是否启用响应式
    __UNI_FEATURE_NAVIGATIONBAR__: navigationBar, // 是否启用标题栏
    __UNI_FEATURE_PULL_DOWN_REFRESH__: pullDownRefresh, // 是否启用下拉刷新
    __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: navigationBarButtons, // 是否启用标题栏按钮
    __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: navigationBarSearchInput, // 是否启用标题栏搜索框
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: navigationBarTransparent, // 是否启用透明标题栏
  }
  // ssr nodejs features
  if (options.ssr) {
    Object.keys(features).forEach((name) => {
      const value = features[name as keyof typeof features]
      extend(globalThis, {
        [name]: isString(value) ? JSON.parse(value) : value,
      })
    })
  }
  return features
}
