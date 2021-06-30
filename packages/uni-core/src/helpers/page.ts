import { extend } from '@vue/shared'
import { ComponentPublicInstance, getCurrentInstance } from 'vue'
import { rpx2px } from './util'

export function useCurrentPageId() {
  return getCurrentInstance()!.root.proxy!.$page.id
}

export function getPageIdByVm(vm: ComponentPublicInstance) {
  if (!vm.$) {
    return
  }
  const rootProxy = vm.$.root.proxy
  if (rootProxy && rootProxy.$page) {
    return rootProxy.$page.id
  }
}

const PAGE_META_KEYS = ['navigationBar', 'pullToRefresh'] as const

function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}))
}

export function initRouteMeta(
  pageMeta: UniApp.PageRouteMeta,
  id?: number
): UniApp.PageRouteMeta {
  const globalStyle = initGlobalStyle()
  const res = extend({ id }, globalStyle, pageMeta)
  PAGE_META_KEYS.forEach((name) => {
    ;(res as any)[name] = extend({}, globalStyle[name], pageMeta[name])
  })
  return res
}

export function normalizePullToRefreshRpx(
  pullToRefresh: UniApp.PageRefreshOptions
) {
  if (pullToRefresh.offset) {
    pullToRefresh.offset = rpx2px(pullToRefresh.offset)
  }
  if (pullToRefresh.height) {
    pullToRefresh.height = rpx2px(pullToRefresh.height)
  }
  if (pullToRefresh.range) {
    pullToRefresh.range = rpx2px(pullToRefresh.range)
  }
  return pullToRefresh
}
