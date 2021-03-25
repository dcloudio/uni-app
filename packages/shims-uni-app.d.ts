declare namespace UniApp {
  type PLATFORM = keyof PagesJsonPagePlatformStyle
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

  interface PageNavigationBarButton {
    type?:
      | 'none'
      | 'forward'
      | 'back'
      | 'share'
      | 'favorite'
      | 'home'
      | 'menu'
      | 'close'
    color?: string
    background?: string
    colorPressed?: string
    float?: 'right' | 'left'
    fontWeight?: string
    fontSize?: string
    fontSrc?: string
    select?: boolean
    text?: string
    width?: string
  }
  interface PageNavigationBar {
    type?: 'default' | 'transparent' | 'float' | 'none'
    titleText?: string
    textStyle?: 'black' | 'white'
    timingFunc?: string
    duration?: string
    backgroundColor?: string
    titlePenetrate?: 'YES' | 'NO'
    shadowColorType?: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'yellow'
    backButton?: boolean
    buttons?: PageNavigationBarButton[]
  }
  interface PageRefreshOptions {
    support: boolean
    color: string
    style: 'circle' | string
    height: number
    range: number
    offset: number
  }

  interface PagesJsonPagePlatformStyle {
    h5?: PagesJsonPageStyle
    'app-plus'?: PagesJsonPageStyle
    'mp-alipay'?: PagesJsonPageStyle
    'mp-baidu'?: PagesJsonPageStyle
    'mp-qq'?: PagesJsonPageStyle
    'mp-toutiao'?: PagesJsonPageStyle
    'mp-weixin'?: PagesJsonPageStyle
    'quickapp-webview'?: PagesJsonPageStyle
  }

  interface PagesJsonPageStyle extends PagesJsonPagePlatformStyle {
    enablePullDownRefresh?: boolean
    navigationBar: PageNavigationBar
    refreshOptions?: PageRefreshOptions
  }
  interface PageRouteMeta extends PagesJsonPageStyle {
    id: number
    isQuit?: boolean
    isEntry?: boolean
    isTabBar?: boolean
    tabBarIndex?: number
    windowTop?: number
    topWindow?: boolean
    leftWindow?: boolean
    rightWindow?: boolean
  }

  interface PagesJsonPageOptions {
    path: string
    style: PagesJsonPageStyle
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
