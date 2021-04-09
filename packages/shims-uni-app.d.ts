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
    networkTimeout: {
      connectSocket: number
      downloadFile: number
      request: number
      uploadFile: number
    }
    tabBar?: TabBarOptions
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
    tabBar?: TabBarOptions
    topWindow?: PagesJsonWindowOptions
    leftWindow?: PagesJsonWindowOptions
    rightWindow?: PagesJsonWindowOptions
  }

  interface TabBarItemBaseOptions {
    pagePath: string
    text: string
    iconPath?: string
    selectedIconPath?: string
    redDot?: boolean
    badge?: string
  }

  interface TabBarNormalItemOptions extends TabBarItemBaseOptions {
    type: 'normal'
  }
  interface TabBarMidButtonOptions extends TabBarItemBaseOptions {
    type: 'midButton'
    width?: string
    height?: string
    iconWidth?: string
    backgroundImage?: string
  }

  type TabBarItemOptions = TabBarNormalItemOptions | TabBarMidButtonOptions

  interface TabBarOptions {
    position?: 'bottom' | 'top'
    color: string
    selectedColor: string
    backgroundColor: string
    borderStyle?: 'black' | 'white'
    list: TabBarItemOptions[]
    blurEffect?: 'none' | 'dark' | 'extralight' | 'light'
    fontSize?: string
    iconWidth?: string
    spacing?: string
    height?: string
    midButton?: TabBarMidButtonOptions
    selectedIndex?: number
    shown: boolean
  }

  type OnApiLike = (callback: (result: unknown) => void) => void
  interface UniServiceJSBridge {
    /**
     * 监听 service 层的自定义事件。事件由 emit 触发，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    on(event: string | string[], callback: Function): void
    /**
     * 监听 service 层的自定义事件。仅触发一次，在第一次触发之后移除监听器。
     * @param event
     * @param callback
     */
    once(event: string, callback: Function): void
    /**
     * 移除 service 层的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    off(event?: string | string[], callback?: Function): void
    /**
     * 触发 Service 层的事件。附加参数都会传给监听器回调。
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]): void
    /**
     * 触发 Service 层事件类型API(on开头)回调。
     * @param name
     * @param res
     */
    invokeOnCallback<T extends OnApiLike>(
      name: string,
      res?: Parameters<Parameters<T>[0]>[0]
    ): void
    /**
     * 订阅 View 的自定义事件，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    subscribe(event: string, callback: Function): void
    /**
     * 取消订阅 View 的自定义事件
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    unsubscribe(event: string, callback?: Function): void
    /**
     * 执行  Service 层 API 回调
     * @param callbackId
     * @param args
     */
    invokeCallbackHandler(callbackId: number, args: unknown): void
    /**
     * 向 View 层发送事件
     * @param event
     * @param args
     * @param pageId
     */
    publishHandler(event: string, args: unknown, pageId: number): void
    /**
     * 接收 View 层事件(通常由 View 层调用，并暴露至全局 UniServiceJSBridge 对象中)
     * @param event
     * @param args
     * @param pageId
     */
    subscribeHandler(event: string, args: unknown, pageId: number): void
  }
  interface UniViewJSBridge {
    /**
     * 监听 View 的自定义事件。事件由 emit 触发，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    on(event: string | string[], callback: Function): void
    /**
     * 监听 View 的自定义事件。仅触发一次，在第一次触发之后移除监听器。
     * @param event
     * @param callback
     */
    once(event: string, callback: Function): void
    /**
     * 移除 View 的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    off(event?: string | string[], callback?: Function): void
    /**
     * 触发 View 的事件。附加参数都会传给监听器回调。
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]): void
    /**
     * 订阅 Service 的自定义事件，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    subscribe(event: string, callback: Function): void
    /**
     * 取消订阅 Service 的自定义事件
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    unsubscribe(event: string, callback?: Function): void
    /**
     * 接收 Service 层事件(通常由 Service 层调用，并暴露至全局 UniViewJSBridge 对象中)
     * @param event
     * @param args
     * @param pageId
     */
    subscribeHandler(event: string, args: unknown, pageId: number): void
    /**
     * 向 Service 层发送事件
     * @param event
     * @param args
     * @param pageId
     */
    publishHandler(event: string, args: unknown, pageId?: number): void
  }
}
