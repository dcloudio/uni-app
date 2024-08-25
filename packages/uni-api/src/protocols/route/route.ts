import { extend } from '@vue/shared'
import { getRouteOptions, normalizeRoute } from '@dcloudio/uni-core'
import { encodeQueryString } from './encodeQueryString'

const ANIMATION_IN = [
  'slide-in-right',
  'slide-in-left',
  'slide-in-top',
  'slide-in-bottom',
  'fade-in',
  'zoom-out',
  'zoom-fade-out',
  'pop-in',
  'none',
]

const ANIMATION_OUT = [
  'slide-out-right',
  'slide-out-left',
  'slide-out-top',
  'slide-out-bottom',
  'fade-out',
  'zoom-in',
  'zoom-fade-in',
  'pop-out',
  'none',
]

const BaseRouteProtocol: ApiProtocol<API_TYPE_NAVIGATE_TO> = {
  url: {
    type: String,
    required: true,
  },
}

export const API_NAVIGATE_TO = 'navigateTo'
export type API_TYPE_NAVIGATE_TO = typeof uni.navigateTo
export const API_REDIRECT_TO = 'redirectTo'
export type API_TYPE_REDIRECT_TO = typeof uni.redirectTo
export const API_RE_LAUNCH = 'reLaunch'
export type API_TYPE_RE_LAUNCH = typeof uni.reLaunch
export const API_SWITCH_TAB = 'switchTab'
export type API_TYPE_SWITCH_TAB = typeof uni.switchTab
export const API_NAVIGATE_BACK = 'navigateBack'
export type API_TYPE_NAVIGATE_BACK = typeof uni.navigateBack
export const API_PRELOAD_PAGE = 'preloadPage'
export type API_TYPE_PRELOAD_PAGE = typeof uni.preloadPage
export const API_UN_PRELOAD_PAGE = 'unPreloadPage'
export type API_TYPE_UN_PRELOAD_PAGE = typeof uni.unPreloadPage
export const NavigateToProtocol: ApiProtocol<API_TYPE_NAVIGATE_TO> =
  /*#__PURE__*/ extend(
    {},
    BaseRouteProtocol,
    createAnimationProtocol(ANIMATION_IN)
  )

export const NavigateBackProtocol: ApiProtocol<API_TYPE_NAVIGATE_BACK> =
  /*#__PURE__*/ extend(
    {
      delta: {
        type: Number,
      },
    },
    createAnimationProtocol(ANIMATION_OUT)
  )

export const RedirectToProtocol = BaseRouteProtocol

export const ReLaunchProtocol = BaseRouteProtocol

export const SwitchTabProtocol = BaseRouteProtocol

export const PreloadPageProtocol = BaseRouteProtocol

export const UnPreloadPageProtocol = BaseRouteProtocol

export const NavigateToOptions: ApiOptions<API_TYPE_NAVIGATE_TO> =
  /*#__PURE__*/ createRouteOptions(API_NAVIGATE_TO)
export const RedirectToOptions: ApiOptions<API_TYPE_REDIRECT_TO> =
  /*#__PURE__*/ createRouteOptions(API_REDIRECT_TO)
export const ReLaunchOptions: ApiOptions<API_TYPE_RE_LAUNCH> =
  /*#__PURE__*/ createRouteOptions(API_RE_LAUNCH)
export const SwitchTabOptions: ApiOptions<API_TYPE_SWITCH_TAB> =
  /*#__PURE__*/ createRouteOptions(API_SWITCH_TAB)

export const NavigateBackOptions: ApiOptions<API_TYPE_NAVIGATE_BACK> = {
  formatArgs: {
    delta(value, params) {
      value = parseInt(value + '') || 1
      params.delta = Math.min(getCurrentPages().length - 1, value)
    },
  },
}

export const PreloadPageOptions: ApiOptions<API_TYPE_PRELOAD_PAGE> =
  /*#__PURE__*/ createRouteOptions(API_PRELOAD_PAGE)

export const UnPreloadPageOptions: ApiOptions<API_TYPE_UN_PRELOAD_PAGE> =
  /*#__PURE__*/ createRouteOptions(API_UN_PRELOAD_PAGE)

function createAnimationProtocol(animationTypes: string[]) {
  return {
    animationType: {
      type: String as any,
      validator(type?: string) {
        if (type && animationTypes.indexOf(type) === -1) {
          return (
            '`' +
            type +
            '` is not supported for `animationType` (supported values are: `' +
            animationTypes.join('`|`') +
            '`)'
          )
        }
      },
    },
    animationDuration: {
      type: Number,
    },
  }
}

let navigatorLock: string

export function beforeRoute() {
  navigatorLock = ''
}

function createRouteOptions(type: string): ApiOptions<API_TYPE_NAVIGATE_TO> {
  return {
    formatArgs: {
      url: createNormalizeUrl(type),
    },
    beforeAll: beforeRoute,
  }
}

export function createNormalizeUrl(type: string) {
  return function normalizeUrl(url: string, params: Record<string, any>) {
    if (!url) {
      return `Missing required args: "url"`
    }
    // 格式化为绝对路径路由
    url = normalizeRoute(url)
    const pagePath = url.split('?')[0]
    // 匹配路由是否存在
    const routeOptions = getRouteOptions(pagePath, true)

    if (!routeOptions) {
      return 'page `' + url + '` is not found'
    }

    // 检测不同类型跳转
    if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
      if (routeOptions.meta.isTabBar) {
        return `can not ${type} a tabbar page`
      }
    } else if (type === API_SWITCH_TAB) {
      if (!routeOptions.meta.isTabBar) {
        return 'can not switch to no-tabBar page'
      }
    }

    // switchTab不允许传递参数,reLaunch到一个tabBar页面是可以的
    if (
      (type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) &&
      routeOptions.meta.isTabBar &&
      params.openType !== 'appLaunch'
    ) {
      url = pagePath
    }

    // 首页自动格式化为`/`
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias!, '/')
    }

    // 参数格式化
    params.url = encodeQueryString(url)
    if (type === API_UN_PRELOAD_PAGE) {
      return
    } else if (type === API_PRELOAD_PAGE) {
      if (__PLATFORM__ === 'app') {
        if (!routeOptions.meta.isNVue) {
          return 'can not preload vue page'
        }
      }
      if (routeOptions.meta.isTabBar) {
        const pages = getCurrentPages()
        const tabBarPagePath = routeOptions.path.slice(1)
        if (pages.find((page) => page.route === tabBarPagePath)) {
          return 'tabBar page `' + tabBarPagePath + '` already exists'
        }
      }
      return
    }

    // 主要拦截目标为用户快速点击时触发的多次跳转，该情况，通常前后 url 是一样的
    if (navigatorLock === url && params.openType !== 'appLaunch') {
      return `${navigatorLock} locked`
    }
    // 至少 onLaunch 之后，再启用lock逻辑（onLaunch之前可能开发者手动调用路由API，来提前跳转）
    // enableNavigatorLock 临时开关（不对外开放），避免该功能上线后，有部分情况异常，可以让开发者临时关闭 lock 功能
    if (__uniConfig.ready) {
      navigatorLock = url
    }
  }
}
