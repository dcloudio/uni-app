import {
  parseRedirectInfo
} from './utils'

function parseRoutes (config) {
  __uniRoutes.length = 0
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath)

  Object.keys(config.page).forEach(function (pagePath) {
    const isTabBar = tabBarList.indexOf(pagePath) !== -1
    const isQuit = isTabBar || (config.pages[0] === pagePath)
    const isNVue = !!config.page[pagePath].nvue
    __uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isQuit,
        isTabBar,
        isNVue
      },
      window: config.page[pagePath].window || {}
    })
  })
}

export function registerConfig (config, Vue) {
  Object.assign(__uniConfig, config)

  __uniConfig.viewport = ''
  __uniConfig.defaultFontSize = ''

  if (__uniConfig.nvueCompiler === 'uni-app') {
    __uniConfig.viewport = plus.screen.resolutionWidth
    __uniConfig.defaultFontSize = 16
  }

  parseRoutes(__uniConfig)

  if (process.env.NODE_ENV !== 'production') {
    console.log('[uni-app] registerConfig', __uniConfig)
  }
}

let isInitEntryPage = false

export function initEntryPage () {
  if (isInitEntryPage) {
    return
  }
  isInitEntryPage = true

  let entryPagePath
  let entryPageQuery

  const weexPlus = weex.requireModule('plus')

  if (weexPlus.getRedirectInfo) {
    const {
      path,
      query,
      referrerInfo
    } = parseRedirectInfo()
    if (path) {
      entryPagePath = path
      entryPageQuery = query
    }
    __uniConfig.referrerInfo = referrerInfo
  } else {
    const argsJsonStr = plus.runtime.arguments
    if (!argsJsonStr) {
      return
    }
    try {
      const args = JSON.parse(argsJsonStr)
      entryPagePath = args.path || args.pathName
      entryPageQuery = args.query ? ('?' + args.query) : ''
    } catch (e) {}
  }

  if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
    if (entryPageQuery) {
      __uniConfig.entryPageQuery = entryPageQuery
    }
    return
  }

  const entryRoute = '/' + entryPagePath
  const routeOptions = __uniRoutes.find(route => route.path === entryRoute)
  if (!routeOptions) {
    console.error(`[uni-app] ${entryPagePath} not found...`)
    return
  }

  if (!routeOptions.meta.isTabBar) {
    __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath
  }

  __uniConfig.entryPagePath = entryPagePath
  __uniConfig.entryPageQuery = entryPageQuery

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] entryPagePath(${entryPagePath + entryPageQuery})`)
  }
}
