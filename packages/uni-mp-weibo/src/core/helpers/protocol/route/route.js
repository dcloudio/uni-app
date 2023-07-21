import getRealRoute from '../../get-real-route'

function encodeQueryString (url) {
  if (typeof url !== 'string') {
    return url
  }
  const index = url.indexOf('?')

  if (index === -1) {
    return url
  }

  const query = url.substr(index + 1).trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return url
  }

  url = url.substr(0, index)

  const params = []

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = parts.shift()
    const val = parts.length > 0
      ? parts.join('=')
      : ''

    params.push(key + '=' + encodeURIComponent(val))
  })

  return params.length ? url + '?' + params.join('&') : url
}

function createValidator (type) {
  return function validator (url, params) {
    // 格式化为绝对路径路由
    url = getRealRoute(url)

    const pagePath = url.split('?')[0]
    // 匹配路由是否存在
    const routeOptions = __uniRoutes.find(({
      path,
      alias
    }) => path === pagePath || alias === pagePath)

    if (!routeOptions) {
      return 'page `' + url + '` is not found'
    }

    // 检测不同类型跳转
    if (type === 'navigateTo' || type === 'redirectTo') {
      if (routeOptions.meta.isTabBar) {
        return `can not ${type} a tabbar page`
      }
    } else if (type === 'switchTab') {
      if (!routeOptions.meta.isTabBar) {
        return 'can not switch to no-tabBar page'
      }
    }

    // switchTab不允许传递参数,reLaunch到一个tabBar页面是可以的
    if (
      (type === 'switchTab' || type === 'preloadPage') &&
      routeOptions.meta.isTabBar &&
      params.openType !== 'appLaunch'
    ) {
      url = pagePath
    }

    // 首页自动格式化为`/`
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, '/')
    }

    // 参数格式化
    params.url = encodeQueryString(url)
    if (type === 'unPreloadPage') {
      return
    } else if (type === 'preloadPage') {
      if (__PLATFORM__ === 'app-plus') {
        if (!routeOptions.meta.isNVue) {
          return 'can not preload vue page'
        }
      }
      if (routeOptions.meta.isTabBar) {
        const pages = getCurrentPages(true)
        const tabBarPagePath = (routeOptions.alias || routeOptions.path).substr(1)
        if (pages.find(page => page.route === tabBarPagePath)) {
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
    if (__uniConfig.ready && __uniConfig.enableNavigatorLock !== false) {
      navigatorLock = url
    }
  }
}

let navigatorLock

function createProtocol (type, extras = {}) {
  return Object.assign({
    url: {
      type: String,
      required: true,
      validator: createValidator(type)
    },
    beforeAll () {
      navigatorLock = ''
    }
  }, extras)
}

function createAnimationProtocol (animationTypes) {
  return {
    animationType: {
      type: String,
      validator (type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return '`' + type + '` is not supported for `animationType` (supported values are: `' + animationTypes.join(
            '`|`') + '`)'
        }
      }
    },
    animationDuration: {
      type: Number
    }
  }
}

export const redirectTo = createProtocol('redirectTo')

export const reLaunch = createProtocol('reLaunch')

export const navigateTo = createProtocol('navigateTo', createAnimationProtocol(
  [
    'slide-in-right',
    'slide-in-left',
    'slide-in-top',
    'slide-in-bottom',
    'fade-in',
    'zoom-out',
    'zoom-fade-out',
    'pop-in',
    'none'
  ]
))

export const switchTab = createProtocol('switchTab')

export const navigateBack = Object.assign({
  delta: {
    type: Number,
    validator (delta, params) {
      delta = parseInt(delta) || 1
      params.delta = Math.min(getCurrentPages().length - 1, delta)
    }
  }
}, createAnimationProtocol(
  [
    'slide-out-right',
    'slide-out-left',
    'slide-out-top',
    'slide-out-bottom',
    'fade-out',
    'zoom-in',
    'zoom-fade-in',
    'pop-out',
    'none'
  ]
))

export const preloadPage = {
  url: {
    type: String,
    required: true,
    validator: createValidator('preloadPage')
  }
}

export const unPreloadPage = {
  url: {
    type: String,
    required: true,
    validator: createValidator('unPreloadPage')
  }
}
