import {
  VNode,
  nextTick,
  computed,
  ConcreteComponent,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import {
  invokeHook,
  disableScrollListener,
  createScrollListener,
  CreateScrollListenerOptions,
  initPageInternalInstance,
  initPageVm,
} from '@dcloudio/uni-core'
import {
  ON_PAGE_SCROLL,
  ON_REACH_BOTTOM,
  ON_REACH_BOTTOM_DISTANCE,
  ON_UNLOAD,
} from '@dcloudio/uni-shared'
import { usePageMeta } from './provide'
import { NavigateType } from '../../service/api/route/utils'
import { updateCurPageCssVar } from '../../helpers/cssVar'
import { getStateId } from '../../helpers/dom'

const SEP = '$$'

const currentPagesMap = new Map<string, ComponentPublicInstance>()

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

function initPublicPage(route: RouteLocationNormalizedLoaded) {
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
  currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm)
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
  const nvueDirKey = 'nvue-dir-' + __uniConfig.nvue!['flex-direction']
  if (pageMeta.isNVue) {
    document.body.setAttribute('nvue', '')
    document.body.setAttribute(nvueDirKey, '')
  } else {
    document.body.removeAttribute('nvue')
    document.body.removeAttribute(nvueDirKey)
  }
}

export function onPageShow(
  instance: ComponentInternalInstance,
  pageMeta: UniApp.PageRouteMeta
) {
  updateBodyScopeId(instance)
  updateCurPageCssVar(pageMeta)
  updateCurPageAttrs(pageMeta)
  initPageScrollListener(instance, pageMeta)
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
// TODO 当动态渲染的组件内监听onPageScroll时
function initPageScrollListener(
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
  if (!onPageScroll && !onReachBottom && !navigationBarTransparent) {
    return
  }
  const opts: CreateScrollListenerOptions = {}
  const pageId = instance.proxy!.$page.id
  if (onPageScroll || navigationBarTransparent) {
    opts.onPageScroll = createOnPageScroll(
      pageId,
      onPageScroll,
      navigationBarTransparent
    )
  }
  if (onReachBottom) {
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
