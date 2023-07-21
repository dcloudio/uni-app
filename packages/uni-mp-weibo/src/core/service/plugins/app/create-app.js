import {
  initAppLocale
} from 'uni-helpers/i18n'

import initRouterGuard from './router-guard'

let appVm = false

export function getApp () {
  return appVm
}

export function getCurrentPages (isAll = false, ignoreError = false) {
  const pages = []
  const app = getApp()
  if (!app) {
    if (ignoreError) {
      console.error('app is not ready')
    }
    return []
  }
  let childrenVm = app.$children[0]
  if (childrenVm && childrenVm.$children.length) {
    const tabBarVm = childrenVm.$children.find(vm => vm.$options.name === 'TabBar')
    const layoutVm = childrenVm.$children.find(vm => vm.$options.name === 'Layout')
    if (layoutVm) {
      childrenVm = layoutVm
    }
    childrenVm.$children.forEach(vm => {
      if (tabBarVm !== vm && vm.$children.length && vm.$children[0].$options.name === 'Page' && vm.$children[0]
        .$slots
        .page) {
        // vm.$children[0]=Page->PageBody->RealPage
        const pageBody = vm.$children[0].$children.find(vm => vm.$options.name === 'PageBody')
        const pageVm = pageBody && pageBody.$children.find(vm => !!vm.$page)
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
  // 当页面返回过程中，请求 getCurrentPages 时，可能会获取到前一个已经准备销毁的 page
  const length = pages.length
  if (length > 1) {
    const currentPage = pages[length - 1]
    if (currentPage.$page.path !== app.$route.path) { // 删除已经准备销毁的上个页面
      pages.splice(length - 1, 1)
    }
  }

  return pages
}

export default function createApp (Vue, vm, routes) {
  appVm = vm
  appVm.$vm = vm
  appVm.globalData = appVm.$options.globalData || {}
  initAppLocale(Vue, appVm)
  // initEvents(appVm)
  initRouterGuard(appVm, routes)
}
