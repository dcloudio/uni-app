import globalRef from '../service/index'

const injectRef = Object.getPrototypeOf(global) || global

function parseRoutes ({
  pages
}) {
  const routes = []
  Object.keys(pages).forEach((folder) => {
    const options = pages[folder]
    routes.push({
      path: '/' + folder + '/' + options.component,
      meta: {}
    })
  })
  return routes
}

/* eslint-disable no-undef */
dsl.onDefineApp(def => {
  // 处理生命周期
  const hasOnLaunch = typeof def.onLaunch === 'function'
  const hasOnShow = typeof def.onShow === 'function'
  if (hasOnLaunch || hasOnShow) {
    (inst._events['applc:onCreate'] || (inst._events['applc:onCreate'] = [])).push(() => {
      hasOnLaunch && def.onLaunch()
      hasOnShow && def.onShow()
    })
  }
  // __uniRoutes
  injectRef.__uniRoutes = parseRoutes(def.manifest.router)
})

Object.assign(injectRef, globalRef)
