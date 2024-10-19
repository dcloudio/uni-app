import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  type ConcreteComponent,
  type VNode,
  computed,
  nextTick,
  watch,
} from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import {
  type CreateScrollListenerOptions,
  createScrollListener,
  disableScrollListener,
  initPageInternalInstance,
  initPageVm,
  invokeHook,
} from '@dcloudio/uni-core'
import {
  ON_PAGE_SCROLL,
  ON_REACH_BOTTOM,
  ON_REACH_BOTTOM_DISTANCE,
  ON_UNLOAD,
} from '@dcloudio/uni-shared'
import { usePageMeta } from './provide'
import {
  type NavigateOptions,
  type NavigateType,
  handleBeforeEntryPageRoutes,
} from '../../service/api/route/utils'
import { updateCurPageCssVar } from '../../helpers/cssVar'
import { getStateId } from '../../helpers/dom'
import { setCurrentPageMeta } from '../../service/api/ui/setPageMeta'
//#if _X_ && !_NODE_JS_
import { closeDialogPage } from '../../x/service/api'
//#endif
//#if _X_
import { initXPage } from '../../x/framework/setup/page'
//#endif

const SEP = '$$'

export const currentPagesMap = new Map<string, ComponentPublicInstance>()

export function getPage$BasePage(
  page: ComponentPublicInstance
): Page.PageInstance['$page'] {
  return __X__ ? page.$basePage : (page.$page as Page.PageInstance['$page'])
}

export const entryPageState = {
  handledBeforeEntryPageRoutes: false,
}
type NavigateToPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.NavigateToOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type SwitchTabPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.SwitchTabOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type RedirectToPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.RedirectToOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
type ReLaunchPage = {
  args: NavigateOptions
  resolve: (res: void | AsyncApiRes<UniNamespace.ReLaunchOptions>) => void
  reject: (errMsg?: string, errRes?: any) => void
}
export const navigateToPagesBeforeEntryPages: NavigateToPage[] = []
export const switchTabPagesBeforeEntryPages: SwitchTabPage[] = []
export const redirectToPagesBeforeEntryPages: RedirectToPage[] = []
export const reLaunchPagesBeforeEntryPages: ReLaunchPage[] = []

function pruneCurrentPages() {
  currentPagesMap.forEach((page, id) => {
    if ((page as unknown as ComponentPublicInstance).$.isUnmounted) {
      currentPagesMap.delete(id)
    }
  })
}

export function getCurrentPagesMap() {
  return currentPagesMap
}

export function getCurrentPages() {
  const curPages = getCurrentBasePages()
  if (__X__) {
    return curPages.map((page) => page.$page)
  }
  return curPages
}

export function getCurrentBasePages() {
  const curPages: ComponentPublicInstance[] = []
  const pages = currentPagesMap.values()
  for (const page of pages) {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page)
      }
    } else {
      curPages.push(page)
    }
  }
  return curPages
}

function removeRouteCache(routeKey: string) {
  const vnode = pageCacheMap.get(routeKey)
  if (vnode) {
    pageCacheMap.delete(routeKey)
    routeCache.pruneCacheEntry!(vnode)
  }
}

export function removePage(routeKey: string, removeRouteCaches = true) {
  const pageVm = currentPagesMap.get(routeKey) as ComponentPublicInstance
  if (__X__ && !__NODE_JS__) {
    const dialogPages = (pageVm.$page as UniPage).getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      closeDialogPage({ dialogPage: dialogPages[i] })
    }
    const systemDialogPages =
      pageVm.$pageLayoutInstance?.$systemDialogPages.value
    if (systemDialogPages) {
      systemDialogPages.length = 0
    }
  }
  pageVm.$.__isUnload = true
  invokeHook(pageVm, ON_UNLOAD)
  currentPagesMap.delete(routeKey)
  removeRouteCaches && removeRouteCache(routeKey)
}

let id = /*#__PURE__*/ getStateId()

export function createPageState(type: NavigateType, __id__?: number) {
  return {
    __id__: __id__ || ++id,
    __type__: type,
  }
}

export function initPublicPage(route: RouteLocationNormalizedLoaded) {
  const meta = usePageMeta()

  if (!__UNI_FEATURE_PAGES__) {
    return initPageInternalInstance('navigateTo', __uniRoutes[0].path, {}, meta)
  }
  let fullPath = route.fullPath
  if (route.meta.isEntry && fullPath.indexOf(route.meta.route) === -1) {
    fullPath = '/' + route.meta.route + fullPath.replace('/', '')
  }
  return initPageInternalInstance('navigateTo', fullPath, {}, meta)
}

export function initPage(vm: ComponentPublicInstance) {
  const route = vm.$route
  const page = initPublicPage(route)
  initPageVm(vm, page)
  if (__X__) {
    initXPage(vm, route, page)
  } else {
    currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm)
    if (currentPagesMap.size === 1) {
      // 通过异步保证首页生命周期触发
      setTimeout(() => {
        handleBeforeEntryPageRoutes()
      }, 0)
    }
  }
}

export function normalizeRouteKey(path: string, id: number) {
  return path + SEP + id
}

export function useKeepAliveRoute() {
  const route = useRoute()
  const routeKey = computed(() =>
    normalizeRouteKey('/' + route.meta.route, getStateId())
  )
  const isTabBar = computed(() => route.meta.isTabBar)
  return {
    routeKey,
    isTabBar,
    routeCache,
  }
}

// https://github.com/vuejs/rfcs/pull/284
// https://github.com/vuejs/vue-next/pull/3414

type CacheKey = string | number | ConcreteComponent
interface KeepAliveCache {
  get(key: CacheKey): VNode | void
  set(key: CacheKey, value: VNode): void
  delete(key: CacheKey): void
  forEach(
    fn: (value: VNode, key: CacheKey, map: Map<CacheKey, VNode>) => void,
    thisArg?: any
  ): void
  pruneCacheEntry?: (cached: VNode) => void
}
const pageCacheMap = new Map<CacheKey, VNode>()
const routeCache: KeepAliveCache = {
  get(key) {
    return pageCacheMap.get(key)
  },
  set(key, value) {
    pruneRouteCache(key as string)
    pageCacheMap.set(key, value)
  },
  delete(key) {
    const vnode = pageCacheMap.get(key)
    if (!vnode) {
      return
    }
    pageCacheMap.delete(key)
  },
  forEach(fn) {
    pageCacheMap.forEach(fn)
  },
}

function isTabBarVNode(vnode: VNode): boolean {
  return vnode.props!.type === 'tabBar'
}

function pruneRouteCache(key: string) {
  const pageId = parseInt(key.split(SEP)[1])
  if (!pageId) {
    return
  }
  routeCache.forEach((vnode, key) => {
    const cPageId = parseInt((key as string).split(SEP)[1])
    if (cPageId && cPageId > pageId) {
      if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) {
        // tabBar keep alive
        return
      }
      routeCache.delete(key)
      routeCache.pruneCacheEntry!(vnode)
      nextTick(() => pruneCurrentPages())
    }
  })
}

function updateCurPageAttrs(pageMeta: UniApp.PageRouteMeta) {
  if (__X__) {
    const uvueDirKey = 'uvue-dir-' + __uniConfig.uvue!['flex-direction']
    document.body.setAttribute('uvue', '')
    document.body.setAttribute(uvueDirKey, '')
  } else {
    const nvueDirKey = 'nvue-dir-' + __uniConfig.nvue!['flex-direction']
    if (pageMeta.isNVue) {
      document.body.setAttribute('nvue', '')
      document.body.setAttribute(nvueDirKey, '')
    } else {
      document.body.removeAttribute('nvue')
      document.body.removeAttribute(nvueDirKey)
    }
  }
}
// 触发页面page-meta.vue的设置
function updatePageMeta(pageMeta: UniApp.PageRouteMeta) {
  setCurrentPageMeta(null, {
    pageStyle: pageMeta.pageStyle,
    rootFontSize: pageMeta.rootFontSize,
  })
}
// 页面mounted和activeated时触发
export function onPageActivated(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  updatePageMeta(pageMeta)
}

export function onPageShow(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  updateBodyScopeId(instance)
  updateCurPageCssVar(pageMeta)
  updateCurPageAttrs(pageMeta)
  initPageScrollListener(instance, pageMeta)
  nextTick(() => {
    onPageActivated(instance, pageMeta)
  })
}

export function onPageReady(instance: ComponentInternalInstance) {
  const scopeId = getScopeId(instance)
  scopeId && updateCurPageBodyScopeId(scopeId)
}

function updateCurPageBodyScopeId(scopeId: string) {
  const pageBodyEl = document.querySelector('uni-page-body')
  if (pageBodyEl) {
    pageBodyEl.setAttribute(scopeId, '')
  } else if (__DEV__) {
    console.warn('uni-page-body not found')
  }
}

function getScopeId(instance: ComponentInternalInstance) {
  return (instance.type as any).__scopeId
}

let curScopeId: string
function updateBodyScopeId(instance: ComponentInternalInstance) {
  const scopeId = getScopeId(instance)
  const { body } = document
  curScopeId && body.removeAttribute(curScopeId!)
  scopeId && body.setAttribute(scopeId, '')
  curScopeId = scopeId!
}

let curScrollListener: (evt: Event) => any

export function initPageScrollListener(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  document.removeEventListener('touchmove', disableScrollListener)
  if (curScrollListener) {
    document.removeEventListener('scroll', curScrollListener)
  }
  if (pageMeta.disableScroll) {
    return document.addEventListener('touchmove', disableScrollListener)
  }

  const { onPageScroll, onReachBottom } = instance
  const navigationBarTransparent = pageMeta.navigationBar.type === 'transparent'
  if (
    !onPageScroll?.length &&
    !onReachBottom?.length &&
    !navigationBarTransparent
  ) {
    return
  }
  const opts: CreateScrollListenerOptions = {}
  const pageId = getPage$BasePage(instance.proxy!).id
  if (onPageScroll || navigationBarTransparent) {
    opts.onPageScroll = createOnPageScroll(
      pageId,
      onPageScroll,
      navigationBarTransparent
    )
  }
  if (onReachBottom?.length) {
    opts.onReachBottomDistance =
      pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE
    opts.onReachBottom = () =>
      UniViewJSBridge.publishHandler(ON_REACH_BOTTOM, {}, pageId)
  }
  curScrollListener = createScrollListener(opts)
  // 避免监听太早，直接触发了 scroll
  requestAnimationFrame(() =>
    document.addEventListener('scroll', curScrollListener)
  )

  if (__X__) {
    watch(
      () => pageMeta.onReachBottomDistance,
      (onReachBottomDistance) => {
        if (!onReachBottom) {
          return
        }
        opts.onReachBottomDistance =
          onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE
        document.removeEventListener('scroll', curScrollListener)
        curScrollListener = createScrollListener(opts)
        document.addEventListener('scroll', curScrollListener)
      }
    )
    watch(
      () => pageMeta.disableScroll,
      (disableScroll) => {
        document.removeEventListener('touchmove', disableScrollListener)
        if (disableScroll) {
          return document.addEventListener('touchmove', disableScrollListener)
        }
      }
    )
  }
}

function createOnPageScroll(
  pageId: number,
  onPageScroll: unknown,
  navigationBarTransparent: boolean
) {
  return (scrollTop: number) => {
    if (onPageScroll) {
      UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, { scrollTop }, pageId)
    }
    if (navigationBarTransparent) {
      UniViewJSBridge.emit(pageId + '.' + ON_PAGE_SCROLL, {
        scrollTop,
      })
    }
  }
}
