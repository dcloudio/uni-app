export interface ComponentJson {
  component: true
  usingComponents?: UsingComponents
  usingSwanComponents?: UsingComponents // 百度小程序特有
  // mp-alipay
  styleIsolation?: 'apply-shared' | 'shared' | 'isolated'
}

interface ShareWindowOptions {
  navigationBarBackgroundColor?: string // #000000
  navigationBarTextStyle?: 'white' | 'black' // white
  navigationBarTitleText?: string
  navigationStyle?: 'default' | 'custom' // default
  backgroundColor?: string // #ffffff
  backgroundTextStyle?: 'dark' | 'light' // dark
  backgroundColorTop?: string // #ffffff
  backgroundColorBottom?: string // #ffffff
  enablePullDownRefresh?: boolean // false
  onReachBottomDistance?: number // 50
  pageOrientation?: 'portrait' | 'landscape' | 'auto' // portrait
}

type Style = 'v2' | string
type RestartStrategy = 'homePage' | 'homePageAndLatestPage' | string

export interface PageWindowOptions extends ShareWindowOptions {
  component?: true // 百度小程序页面必须配置component: true
  disableScroll?: boolean // false
  usingComponents?: UsingComponents
  usingSwanComponents?: UsingComponents // 百度小程序特有
  initialRenderingCache?: 'static' | string
  style?: Style
  singlePage?: SinglePage
  restartStrategy?: RestartStrategy
}

export interface AppWindowOptions extends ShareWindowOptions {
  visualEffectInBackground?: 'none' | 'hidden' // none
}

interface SubPackage {
  name?: string
  root: string
  pages: string[]
  independent?: boolean
}

interface TabBarItem {
  pagePath: string
  text: string
  iconPath?: string
  selectedIconPath?: string
}

export interface TabBar {
  color: string
  selectedColor: string
  backgroundColor: string
  borderStyle?: 'black' | 'white' // black
  list: TabBarItem[]
  position?: 'bottom' | 'top' // bottom
  custom?: boolean
}

export interface NetworkTimeout {
  request?: number // 60000
  requeconnectSocketst?: number // 60000
  uploadFile?: number // 60000
  downloadFile?: number // 60000
}

interface Plugins {
  [name: string]: {
    version: string
    provider: string
  }
}

interface PreloadRule {
  [name: string]: {
    network: 'wifi' | 'all' // wifi
    packages: string[]
  }
}
export interface UsingComponents {
  [name: string]: string
}
interface Permission {
  [name: string]: {
    desc: string
  }
}
interface UseExtendedLib {
  kbone: boolean
  weui: boolean
}
interface EntranceDeclare {
  locationMessage: {
    path: string
    query: string
  }
}
interface SinglePage {
  navigationBarFit?: 'squeezed' | 'float'
}

export interface AppJson {
  entryPagePath?: string // mp-weixin
  pages: string[]
  window?: AppWindowOptions
  tabBar?: TabBar
  networkTimeout?: NetworkTimeout
  debug?: boolean
  functionalPages?: boolean
  subPackages?: SubPackage[]
  workers?: string
  requiredBackgroundModes?: string[] // audio,location
  plugins?: Plugins
  preloadRule?: PreloadRule
  resizable?: boolean
  usingComponents?: UsingComponents
  permission?: Permission
  sitemapLocation?: string
  style?: Style
  useExtendedLib?: UseExtendedLib
  entranceDeclare?: EntranceDeclare
  darkmode?: boolean
  themeLocation?: string
  lazyCodeLoading?: 'requiredComponents' | string
  singlePage?: SinglePage
  restartStrategy?: RestartStrategy
  [name: string]: unknown
}

export type MiniProgramComponentsType =
  | 'plugin'
  | 'component'
  | 'dynamicLib'
  | 'ext'
  | 'xr-frame'
  | 'weui'
