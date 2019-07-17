export const uniConfig = Object.create(null)
export const uniRoutes = []

function parseRoutes (config) {
  uniRoutes.length = 0
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath)

  Object.keys(config.page).forEach(function (pagePath) {
    const isTabBar = tabBarList.indexOf(pagePath) !== -1
    const isQuit = isTabBar || (config.pages[0] === pagePath)
    uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isQuit,
        isTabBar
      }
    })
  })
}

export function registerConfig (config) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerConfig`)
  }
  Object.assign(uniConfig, config)
  parseRoutes(uniConfig)
}
