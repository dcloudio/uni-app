import initRouterGuard from './router-guard'

let appVm = false

export function getApp () {
  return appVm
}

export function getCurrentPages (isAll = false) {
  const pages = []
  const childrenVm = appVm.$children[0]
  if (childrenVm && childrenVm.$children.length) {
    const tabBarVm = childrenVm.$children.find(vm => vm.$options.name === 'TabBar')
    const app = getApp()
    childrenVm.$children.forEach(vm => {
      if (tabBarVm !== vm && vm.$children.length && vm.$children[0].$options.name === 'Page' && vm.$children[0].$slots.page) {
        // vm.$children[0]=Page->PageBody->RealPage
        const pageVm = vm.$children[0].$children.find(vm => vm.$options.name === 'PageBody').$children.find(vm => !!vm.$page)
        if (pageVm) {
          let isActive = true
          if (!isAll && tabBarVm && pageVm.$page && pageVm.$page.meta.isTabBar) { // 选项卡仅列出活动的
            if (app.$route.meta && app.$route.meta.isTabBar) { // 当前页面路由是 tabBar
              if (app.$route.path !== pageVm.$page.path) {
                isActive = false
              }
            } else {
              if (tabBarVm.__path__ !== pageVm.$page.path) {
                isActive = false
              }
            }
          }
          if (isActive) {
            pages.push(pageVm)
          }
        } else {
          // TODO
          // console.error('pageVm is undefined')
        }
      }
    })
  }
  return pages
}

export default function createApp (vm, routes) {
  appVm = vm
  appVm.globalData = appVm.$options.globalData || {}

  // initEvents(appVm)
  initRouterGuard(appVm, routes)
}
