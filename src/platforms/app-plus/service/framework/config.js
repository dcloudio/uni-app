import plugin from './plugins/index'

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
  if (__PLATFORM__ === 'app-plus') {
    Vue.use(plugin)
  }
  Object.assign(__uniConfig, config)

  __uniConfig.viewport = ''
  __uniConfig.defaultFontSize = ''

  if (__uniConfig.nvueCompiler === 'uni-app') {
    __uniConfig.viewport = plus.screen.resolutionWidth
    __uniConfig.defaultFontSize = __uniConfig.viewport / 20
  }

  parseRoutes(__uniConfig)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerConfig`, __uniConfig)
  }
}
