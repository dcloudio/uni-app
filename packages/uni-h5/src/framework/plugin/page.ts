import {
  VNode,
  nextTick,
  computed,
  ConcreteComponent,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { invokeHook } from '@dcloudio/uni-core'
import { usePageMeta } from './provide'
import { NavigateType } from '../../service/api/route/utils'

const SEP = '$$'

const currentPagesMap = new Map<string, Page.PageInstance>()

function pruneCurrentPages() {
  currentPagesMap.forEach((page, id) => {
    if (((page as unknown) as ComponentPublicInstance).$.isUnmounted) {
      currentPagesMap.delete(id)
    }
  })
}

export function getCurrentPagesMap() {
  return currentPagesMap
}

export function getCurrentPages() {
  const curPages: Page.PageInstance[] = []
  const pages = currentPagesMap.values()
  for (const page of pages) {
    if (page.$page.meta.isTabBar) {
      if ((page as ComponentPublicInstance).$.__isActive) {
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
  invokeHook(pageVm, 'onUnload')
  currentPagesMap.delete(routeKey)
  removeRouteCaches && removeRouteCache(routeKey)
}

let id = (history.state && history.state.__id__) || 1

export function createPageState(type: NavigateType, __id__?: number) {
  return {
    __id__: __id__ || ++id,
    __type__: type,
  }
}

function initPublicPage(route: RouteLocationNormalizedLoaded) {
  if (!route) {
    const { path, alias } = __uniRoutes[0]
    return { id, path, route: alias!.substr(1), fullPath: path }
  }
  const { path } = route
  return {
    id,
    path: path,
    route: route.meta.route,
    fullPath: route.meta.isEntry ? route.meta.pagePath : route.fullPath,
    options: {}, // $route.query
    meta: usePageMeta(),
  }
}

export function initPage(vm: ComponentPublicInstance) {
  const route = vm.$route
  const page = initPublicPage(route)
  ;(vm as any).$vm = vm
  ;(vm as any).$page = page
  currentPagesMap.set(
    normalizeRouteKey(page.path, page.id),
    (vm as unknown) as Page.PageInstance
  )
}

export function normalizeRouteKey(path: string, id: number) {
  return path + SEP + id
}

export function useKeepAliveRoute() {
  const route = useRoute()
  const routeKey = computed(() =>
    normalizeRouteKey(route.path, history.state.__id__ || 1)
  )
  return {
    routeKey,
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

function pruneRouteCache(key: string) {
  const pageId = parseInt(key.split(SEP)[1])
  if (!pageId) {
    return
  }
  routeCache.forEach((vnode, key) => {
    const cPageId = parseInt((key as string).split(SEP)[1])
    if (cPageId && cPageId > pageId) {
      if (__UNI_FEATURE_TABBAR__) {
        // tabBar keep alive
        const { component } = vnode
        if (
          component &&
          component.refs.page &&
          (component.refs.page as ComponentPublicInstance).$page.meta.isTabBar
        ) {
          return
        }
      }
      routeCache.delete(key)
      routeCache.pruneCacheEntry!(vnode)
      nextTick(() => pruneCurrentPages())
    }
  })
}
