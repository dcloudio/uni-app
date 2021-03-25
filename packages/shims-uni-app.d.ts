declare namespace UniApp {
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

  interface PagesJsonPageOptions {
    path: string
    style?: Record<string, any>
  }
  interface PagesJsonSubpackagesOptions {
    root: string
    pages: PagesJsonPageOptions[]
  }

  interface PagesJson {
    pages: PagesJsonPageOptions[]
    subpackages?: PagesJsonSubpackagesOptions[]
    subPackages?: PagesJsonSubpackagesOptions[]
    globalStyle?: {}
    tabBar?: {
      list: []
    }
  }
}
