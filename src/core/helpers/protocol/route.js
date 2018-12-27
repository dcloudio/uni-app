import getRealRoute from '../get-real-route'

function encodeQueryString (url) {
  if (typeof url === 'string') {
    const urls = url.split('?')

    url = urls[0]

    const params = [];
    (urls[1] || '').split('&').forEach(function (pair) {
      if (pair) {
        const pairs = pair.split('=')
        params.push(pairs[0] + '=' + encodeURIComponent(pairs[1]))
      }
    })

    return params.length ? url + '?' + params.join('&') : url
  }
  return url
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

    // tabBar不允许传递参数
    if (routeOptions.meta.isTabBar) {
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

function createProtocol (type) {
  return {
    url: {
      type: String,
      required: true,
      validator: createValidator(type)
    }
  }
}
export const redirectTo = createProtocol('redirectTo')

export const reLaunch = createProtocol('reLaunch')

export const navigateTo = createProtocol('navigateTo')

export const switchTab = createProtocol('switchTab')

export const navigateBack = {
  delta: {
    type: Number,
    validator (delta, params) {
      delta = parseInt(delta) || 1
      params.delta = Math.min(getCurrentPages().length - 1, delta)
    }
  }
}
