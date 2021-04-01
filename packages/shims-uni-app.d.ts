declare namespace Page {
  interface PageInstance {
    $page: {
      id: number
      path: string
      route: string
      fullPath: string
      options: Record<string, any>
      meta: UniApp.PageRouteMeta
    }
  }
}
declare namespace UniApp {
  type ClassObj = Record<string, boolean>
  type StyleObj = Record<string, any>
  type PLATFORM = keyof PagesJsonPagePlatformStyle
  interface LayoutWindowOptions {
    matchMedia?: {
      minWidth?: number
    }
    style?: Record<string, any>
  }

  interface UniConfig {
    ready?: boolean
    router: {
      strict: boolean
      base: string
    }
    globalStyle: {
      navigationBar: PageNavigationBar
      refreshOptions?: PageRefreshOptions
    }
    topWindow?: LayoutWindowOptions
    leftWindow?: LayoutWindowOptions
    rightWindow?: LayoutWindowOptions
  }

  interface UniRoute {
    path: string
    alias?: string
    meta: PageRouteMeta
    component?: any
  }

  type UniRoutes = UniRoute[]

  interface PageNavigationBarButton {
    type:
      | 'none'
      | 'forward'
      | 'back'
      | 'share'
      | 'favorite'
      | 'home'
      | 'menu'
      | 'close'
    color: string
    background?: string
    badgeText?: string
    colorPressed?: string
    float?: 'right' | 'left'
    fontWeight?: any
    fontSize: string
    fontSrc?: string
    fontFamily?: string
    select?: boolean
    text: string
    width?: string
    redDot?: boolean
  }

  interface PageNavigationBarSearchInput {
    color?: string
    autoFocus?: boolean
    align?: 'center' | 'left' | 'right'
    backgroundColor?: string
    borderRadius?: string
    placeholder?: string
    placeholderColor?: string
    disabled?: boolean
  }

  interface PageNavigationBar {
    type?: 'default' | 'transparent' | 'float' | 'none'
    titleText?: string
    titleImage?: string
    titleColor?: '#000' | '#fff'
    timingFunc?: string
    duration?: string
    backgroundColor?: string
    titlePenetrate?: 'YES' | 'NO'
    shadowColorType?: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'yellow'
    backButton?: boolean
    buttons?: PageNavigationBarButton[]
    searchInput?: PageNavigationBarSearchInput
    style?: 'default' | 'custom'
    loading?: boolean
    coverage?: string
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
    isNVue?: boolean
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
    globalStyle: PagesJsonPageStyle
    tabBar?: {
      list: []
    }
    topWindow?: PagesJsonWindowOptions
    leftWindow?: PagesJsonWindowOptions
    rightWindow?: PagesJsonWindowOptions
  }
}
