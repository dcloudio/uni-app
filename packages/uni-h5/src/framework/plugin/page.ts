import { computed, nextTick, VNode, ComponentPublicInstance } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'

const SEP = '$$'

export function getCurrentPages() {
  return []
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

function initPublicPage(route: RouteLocationNormalizedLoaded) {
  if (!route) {
    const { path } = __uniRoutes[0]
    return { id, path, route: path.substr(1), fullPath: path }
  }
  return {
    id,
    path: route.path,
    route: route.meta.pagePath,
    fullPath: route.meta.isEntry ? route.meta.pagePath : route.fullPath,
    options: {}, // $route.query
  }
}

export function initPage(vm: ComponentPublicInstance) {
  const route = vm.$route
  ;(vm as any).__page__ = initPublicPage(route)
}

// TODO
// https://github.com/vuejs/rfcs/pull/284
// https://github.com/vuejs/vue-next/pull/3414
function routeCache(
  key: string,
  cache: Map<string, VNode>,
  pruneCacheEntry: (key: string) => void
) {
  const pageId = parseInt(key.split(SEP)[1])
  if (!pageId) {
    return
  }
  nextTick(() => {
    // prune post-render after `current` has been updated
    const keys = cache.keys()
    for (const key of keys) {
      const cPageId = parseInt(key.split(SEP)[1])
      if (cPageId && cPageId > pageId) {
        pruneCacheEntry(key)
      }
    }
    console.log('customKeepAlive', JSON.stringify([...cache.keys()]))
  })
}

export function useKeepAliveRoute() {
  const route = useRoute()
  const routeKey = computed(
    () => route.fullPath + '$$' + (history.state.__id__ || 1)
  )
  return {
    routeKey,
    routeCache,
  }
}
