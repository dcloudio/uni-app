import {
  type EventChannel,
  addLeadingSlash,
  normalizeStyles,
  resolveComponentInstance,
} from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'
import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  getCurrentInstance,
} from 'vue'
import { get$pageByPage, rpx2px } from './util'

export function useCurrentPageId() {
  if (__APP_VIEW__) {
    // view 层
    return getCurrentPageId()
  }
  // 暂时仅在 h5 平台实现 $pageInstance，避免影响过大
  if (__PLATFORM__ === 'h5') {
    const { $pageInstance } = getCurrentInstance()!
    return $pageInstance && getPageProxyId($pageInstance.proxy!)
  }
  // App
  let pageId
  try {
    pageId = getPageProxyId(getCurrentInstance()!.root.proxy!!)
  } catch {
    const webviewId = plus.webview.currentWebview().id
    pageId = isNaN(Number(webviewId)) ? webviewId : Number(webviewId)
  }
  return pageId as number
}

export function getPageIdByVm(
  instance: ComponentPublicInstance | ComponentInternalInstance
) {
  const vm = resolveComponentInstance(instance)!
  if (vm.$page) {
    return getPageProxyId(vm)
  }
  if (!vm.$) {
    return
  }
  // 暂时仅在 h5 平台实现 $pageInstance，避免影响过大
  if (__PLATFORM__ === 'h5') {
    const { $pageInstance } = vm.$
    if ($pageInstance) {
      return getPageProxyId($pageInstance.proxy!)
    }
  }
  const rootProxy = vm.$.root.proxy
  if (rootProxy && rootProxy.$page) {
    return getPageProxyId(rootProxy)
  }
}

function getPageById(id: number) {
  return getCurrentPages().find((page) => get$pageByPage(page).id === id)
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
  const $page = __X__
    ? (getCurrentPage() as unknown as UniPage)?.vm?.$basePage
    : getCurrentPage()?.$page
  if ($page) {
    return $page.meta
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
  const page = __X__
    ? (getCurrentPage() as unknown as UniPage)?.vm
    : getCurrentPage()
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
  eventChannel?: EventChannel,
  themeMode?: UniApp.ThemeMode
): Page.PageInstance['$page'] {
  const { id, route } = meta
  const titleColor = normalizeStyles(
    meta.navigationBar,
    __uniConfig.themeConfig,
    themeMode
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
    statusBarStyle: titleColor === '#ffffff' ? 'light' : 'dark',
  }
}

function getPageProxyId(proxy: ComponentPublicInstance) {
  return (proxy.$page as Page.PageInstance['$page'])?.id || proxy.$basePage?.id
}
