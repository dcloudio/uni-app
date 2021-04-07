import {
  VNode,
  nextTick,
  computed,
  ConcreteComponent,
  ComponentPublicInstance,
} from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { usePageMeta } from './provide'

const SEP = '$$'

const currentPagesMap = new Map<number, Page.PageInstance>()

function pruneCurrentPages() {
  currentPagesMap.forEach((page, id) => {
    if (((page as unknown) as ComponentPublicInstance).$.isUnmounted) {
      currentPagesMap.delete(id)
    }
  })
}

export function getCurrentPages(isAll: boolean = false) {
  pruneCurrentPages() // TODO 目前页面unmounted时机较晚，前一个页面onShow里边调用getCurrentPages，可能还会获取到上一个准备被销毁的页面
  return [...currentPagesMap.values()]
}

let id = (history.state && history.state.__id__) || 1

export function createPageState(
  type: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
) {
  return {
    __id__: ++id,
    __type__: type,
  }
}

export function isPage(vm: ComponentPublicInstance) {
  // @dcloudio/vite-plugin-uni/src/configResolved/plugins/pageVue.ts
  return vm.$options.mpType === 'page'
}

function normalizeRoute(path: string) {
  if (path.indexOf('/') === 0) {
    return path.substr(1)
  }
  return path
}

function initPublicPage(route: RouteLocationNormalizedLoaded) {
  if (!route) {
    const { path } = __uniRoutes[0]
    return { id, path, route: path.substr(1), fullPath: path }
  }
  return {
    id,
    path: route.path,
    route: normalizeRoute(route.path),
    fullPath: route.meta.isEntry ? route.meta.pagePath : route.fullPath,
    options: {}, // $route.query
    meta: usePageMeta(),
  }
}

export function initPage(vm: ComponentPublicInstance) {
  const route = vm.$route
  ;(vm as any).$vm = vm
  ;(vm as any).$page = initPublicPage(route)
  currentPagesMap.set(vm.$page.id, (vm as unknown) as Page.PageInstance)
}

export function useKeepAliveRoute() {
  const route = useRoute()
  const routeKey = computed(
    () => route.fullPath + SEP + (history.state.__id__ || 1)
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
      routeCache.delete(key)
      routeCache.pruneCacheEntry!(vnode)
      nextTick(() => pruneCurrentPages())
    }
  })
}
