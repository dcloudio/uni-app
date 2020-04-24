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
    if (type === 'switchTab' && routeOptions.meta.isTabBar) {
      url = pagePath
    }

    // 首页自动格式化为`/`
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, '/')
    }

    // 参数格式化
    params.url = encodeQueryString(url)
  }
}

function createProtocol (type, extras = {}) {
  return Object.assign({
    url: {
      type: String,
      required: true,
      validator: createValidator(type)
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
