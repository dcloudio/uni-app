export const uniConfig = Object.create(null)
export const uniRoutes = []

function parseRoutes (config) {
  uniRoutes.length = 0
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath)

  Object.keys(config.page).forEach(function (pagePath) {
    const isTabBar = tabBarList.indexOf(pagePath) !== -1
    const isQuit = isTabBar || (config.pages[0] === pagePath)
    const isNVue = !!config.page[pagePath].nvue
    uniRoutes.push({
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

export function registerConfig (config, {
  plus
}) {
  Object.assign(uniConfig, config)

  uniConfig.viewport = ''
  uniConfig.defaultFontSize = ''

  if (uniConfig.nvueCompiler === 'uni-app') {
    uniConfig.viewport = plus.screen.resolutionWidth
    uniConfig.defaultFontSize = uniConfig.viewport / 20
  }

  parseRoutes(uniConfig)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerConfig`, uniConfig)
  }
}
