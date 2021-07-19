export const NAVBAR_HEIGHT = 44
export const TABBAR_HEIGHT = 50
export const ON_REACH_BOTTOM_DISTANCE = 50
export const RESPONSIVE_MIN_WIDTH = 768

export const COMPONENT_NAME_PREFIX = 'VUni'

export const PRIMARY_COLOR = '#007aff'
export const SELECTED_COLOR = '#0062cc' // 选中的颜色，如选项卡默认的选中颜色
export const BACKGROUND_COLOR = '#f7f7f7' // 背景色，如标题栏默认背景色

export const UNI_SSR = '__uniSSR'
export const UNI_SSR_TITLE = 'title'
export const UNI_SSR_STORE = 'store'
export const UNI_SSR_DATA = 'data'
export const UNI_SSR_GLOBAL_DATA = 'globalData'

export const SCHEME_RE = /^([a-z-]+:)?\/\//i
export const DATA_RE = /^data:.*,.*/

export const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE'

// lifecycle

// App and Page
export const ON_SHOW = 'onShow'
export const ON_HIDE = 'onHide'
//App
export const ON_LAUNCH = 'onLaunch'
export const ON_ERROR = 'onError'
export const ON_THEME_CHANGE = 'onThemeChange'
export const ON_PAGE_NOT_FOUND = 'onPageNotFound'
export const ON_UNHANDLE_REJECTION = 'onUnhandledRejection'
//Page
export const ON_LOAD = 'onLoad'
export const ON_READY = 'onReady'
export const ON_UNLOAD = 'onUnload'

export const ON_RESIZE = 'onResize'
export const ON_BACK_PRESS = 'onBackPress'
export const ON_PAGE_SCROLL = 'onPageScroll'
export const ON_TAB_ITEM_TAP = 'onTabItemTap'
export const ON_REACH_BOTTOM = 'onReachBottom'
export const ON_PULL_DOWN_REFRESH = 'onPullDownRefresh'

export const ON_SHARE_TIMELINE = 'onShareTimeline'
export const ON_ADD_TO_FAVORITES = 'onAddToFavorites'
export const ON_SHARE_APP_MESSAGE = 'onShareAppMessage'
// navigationBar
export const ON_NAVIGATION_BAR_BUTTON_TAP = 'onNavigationBarButtonTap'
export const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED =
  'onNavigationBarSearchInputClicked'
export const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED =
  'onNavigationBarSearchInputChanged'
export const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED =
  'onNavigationBarSearchInputConfirmed'
export const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED =
  'onNavigationBarSearchInputFocusChanged'

// framework

export const ON_APP_ENTER_FOREGROUND = 'onAppEnterForeground'
export const ON_APP_ENTER_BACKGROUND = 'onAppEnterBackground'
export const ON_WEB_INVOKE_APP_SERVICE = 'onWebInvokeAppService'
