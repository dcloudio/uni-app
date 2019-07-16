export const uniConfig = Object.create(null)
export const uniRoutes = []

function parseRoutes (config) {
  uniRoutes.length = 0
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath)

  Object.keys(config.page).forEach(function (pagePath) {
    uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isTabBar: tabBarList.indexOf(pagePath) !== -1
      }
    })
  })
}

export function registerConfig (config) {
  Object.assign(uniConfig, config)
  parseRoutes(uniConfig)
}
