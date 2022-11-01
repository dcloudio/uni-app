import {
  addLeadingSlash,
  EventChannel,
  resolveComponentInstance,
  normalizeStyles,
} from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  getCurrentInstance,
} from 'vue'
import { rpx2px } from './util'

export function useCurrentPageId() {
  if (__APP_VIEW__) {
    // view 层
    return getCurrentPageId()
  }
  // 暂时仅在 h5 平台实现 $pageInstance，避免影响过大
  if (__PLATFORM__ === 'h5') {
    const { $pageInstance } = getCurrentInstance()!
    return $pageInstance && $pageInstance.proxy!.$page.id
  }
  return getCurrentInstance()!.root.proxy!.$page.id
}

export function getPageIdByVm(
  instance: ComponentPublicInstance | ComponentInternalInstance
) {
  const vm = resolveComponentInstance(instance)!
  if (vm.$page) {
    return vm.$page.id
  }
  if (!vm.$) {
    return
  }
  // 暂时仅在 h5 平台实现 $pageInstance，避免影响过大
  if (__PLATFORM__ === 'h5') {
    const { $pageInstance } = vm.$
    return $pageInstance && $pageInstance.proxy!.$page.id
  }
  const rootProxy = vm.$.root.proxy
  if (rootProxy && rootProxy.$page) {
    return rootProxy.$page.id
  }
}

function getPageById(id: number) {
  return getCurrentPages().find((page) => page.$page.id === id)
}

export function getPageVmById(id: number) {
  const page = getPageById(id)
  if (page) {
    return (page as any).$vm as ComponentPublicInstance
  }
}

export function getCurrentPage() {
  if (__APP_VIEW__) {
    return (window as any).__PAGE_INFO__ as Page.PageInstance
  }
  const pages = getCurrentPages()
  const len = pages.length
  if (len) {
    return pages[len - 1]
  }
}

export function getCurrentPageMeta() {
  const page = getCurrentPage()
  if (page) {
    return page.$page.meta
  }
}

export function getCurrentPageId() {
  if (__APP_VIEW__) {
    // view 层
    if (!(window as any).__id__) {
      ;(window as any).__id__ = plus.webview.currentWebview().id!
    }
    return parseInt((window as any).__id__)
  }
  const meta = getCurrentPageMeta()
  if (meta) {
    return meta.id!
  }
  return -1
}

export function getCurrentPageVm() {
  const page = getCurrentPage()
  if (page) {
    return (page as any).$vm as ComponentPublicInstance
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
  const { navigationBar } = res
  navigationBar.titleText &&
    navigationBar.titleImage &&
    (navigationBar.titleText = '')
  return res
}

export function normalizeSubNVueStyle(style: Record<string, unknown>) {
  return JSON.parse(rpx2px(JSON.stringify(style), true))
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

export function initPageInternalInstance(
  openType: UniApp.OpenType,
  url: string,
  pageQuery: Record<string, any>,
  meta: UniApp.PageRouteMeta,
  eventChannel?: EventChannel
): Page.PageInstance['$page'] {
  const { id, route } = meta
  const titleColor = normalizeStyles(
    meta.navigationBar,
    __uniConfig.themeConfig
  ).titleColor
  return {
    id: id!,
    path: addLeadingSlash(route),
    route: route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: titleColor === '#000000' ? 'dark' : 'light',
  }
}
