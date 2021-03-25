declare namespace UniApp {
  type PLATFORM =
    | 'h5'
    | 'app-plus'
    | 'mp-alipay'
    | 'mp-baidu'
    | 'mp-qq'
    | 'mp-toutiao'
    | 'mp-weixin'
    | 'quickapp-webview'
  interface LayoutWindowOptions {
    matchMedia?: {
      minWidth?: number
    }
    style?: Record<string, any>
  }

  interface UniConfig {
    router: {
      strict: boolean
    }
    globalStyle: {
      navigationBar: PageNavigationBar
      refreshOptions?: PageRefreshOptions
    }
    topWindow?: LayoutWindowOptions
    leftWindow?: LayoutWindowOptions
    rightWindow?: LayoutWindowOptions
  }

  interface PageNavigationBar {
    type: 'default' | 'transparent' | 'float' | 'none'
    titleText: string
    textStyle: 'black' | 'white'
    timingFunc: string
    duration: string
    backgroundColor: string
    titlePenetrate: 'YES' | 'NO'
    shadowColorType: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'yellow'
    backButton: boolean
  }
  interface PageRefreshOptions {
    support: boolean
    color: string
    style: 'circle' | string
    height: number
    range: number
    offset: number
  }
  interface PageRouteMeta {
    id: number
    isQuit?: boolean
    isEntry?: boolean
    isTabBar?: boolean
    tabBarIndex?: number
    windowTop?: number
    topWindow?: boolean
    leftWindow?: boolean
    rightWindow?: boolean
    enablePullDownRefresh?: boolean
    navigationBar: PageNavigationBar
    refreshOptions?: PageRefreshOptions
  }

  interface PagesJsonPageStyle {
    enablePullDownRefresh?: boolean
  }

  interface PagesJsonPageOptions {
    path: string
    style?: PagesJsonPageStyle
  }
  interface PagesJsonSubpackagesOptions {
    root: string
    pages: PagesJsonPageOptions[]
  }

  interface PagesJsonWindowOptions extends PagesJsonPageOptions {
    matchMedia: {
      minWidth: number
    }
  }

  interface PagesJson {
    pages: PagesJsonPageOptions[]
    subpackages?: PagesJsonSubpackagesOptions[]
    subPackages?: PagesJsonSubpackagesOptions[]
    globalStyle?: PagesJsonPageStyle
    tabBar?: {
      list: []
    }
    topWindow?: PagesJsonWindowOptions
    leftWindow?: PagesJsonWindowOptions
    rightWindow?: PagesJsonWindowOptions
  }
}
