function parseRoutes (config) {
  const __uniRoutes = []
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath)

  Object.keys(config.page).forEach(function (pagePath) {
    const isTabBar = tabBarList.indexOf(pagePath) !== -1
    const isQuit = isTabBar || (config.pages[0] === pagePath)
    const isNVue = !!config.page[pagePath].nvue
    const route = {
      path: '/' + pagePath,
      meta: {},
      window: config.page[pagePath].window || {}
    }
    if (isQuit) {
      route.meta.isQuit = true
    }
    if (isNVue) {
      route.meta.isNVue = true
    }
    if (isTabBar) {
      route.meta.isTabBar = true
    }
    __uniRoutes.push(route)
  })

  return __uniRoutes
}

const GLOBALS = [
  'window',
  'document',
  'frames',
  'self',
  'location',
  'navigator',
  'localStorage',
  'history',
  'Caches',
  'screen',
  'alert',
  'confirm',
  'prompt',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'webkit',
  'print'
]

const globalStatement = GLOBALS.map(g => `${g}:void 0`).join(',')

module.exports = function definePages (appJson) {
  const __uniRoutes = parseRoutes(appJson)

  delete appJson.page
  delete appJson.usingComponents
  delete appJson.nvueCompiler
  // 保留renderer
  // delete appJson.renderer

  return {
    name: 'app-config-service.js',
    content: `
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = ${JSON.stringify(appJson, null)};
var __uniRoutes = ${JSON.stringify(__uniRoutes)};
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,${globalStatement}}}}});
`
  }
}
