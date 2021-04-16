import { invokeArrayFns } from '@vue/shared'
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  createBlock,
  DefineComponent,
  getCurrentInstance,
  onMounted,
  openBlock,
  onBeforeActivate,
  onBeforeDeactivate,
  onBeforeMount,
} from 'vue'
import { useRoute } from 'vue-router'
import { parseQuery, decodedQuery } from '@dcloudio/uni-shared'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage } from './page'

interface SetupComponentOptions {
  init: (vm: ComponentPublicInstance) => void
  setup: (instance: ComponentInternalInstance) => void
  after?: (comp: DefineComponent) => void
}

export function usePageRoute() {
  if (__UNI_FEATURE_PAGES__) {
    return useRoute()
  }
  const url = location.href
  const searchPos = url.indexOf('?')
  const hashPos = url.indexOf('#', searchPos > -1 ? searchPos : 0)
  let query = {}
  if (searchPos > -1) {
    query = parseQuery(
      url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length)
    )
  }
  return {
    meta: __uniRoutes[0].meta,
    query: query,
  }
}

function wrapperComponentSetup(
  comp: DefineComponent,
  { init, setup, after }: SetupComponentOptions
) {
  const oldSetup = comp.setup
  comp.setup = (props, ctx) => {
    const instance = getCurrentInstance()!
    init(instance.proxy!)
    setup(instance)
    if (oldSetup) {
      return oldSetup(props, ctx)
    }
  }
  after && after(comp)
}

function setupComponent(comp: any, options: SetupComponentOptions) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
    wrapperComponentSetup(comp.default, options)
  } else {
    wrapperComponentSetup(comp, options)
  }
  return comp
}

export function setupPage(comp: any) {
  return setupComponent(comp, {
    init: initPage,
    setup(instance) {
      const route = usePageRoute()
      if (route.meta.isTabBar) {
        //初始化时，状态肯定是激活
        instance.__isActive = true
      }
      onBeforeMount(() => {
        const { onLoad, onShow } = instance
        onLoad && invokeArrayFns(onLoad, decodedQuery(route.query))
        instance.__isVisible = true
        onShow && invokeArrayFns(onShow)
      })
      onMounted(() => {
        const { onReady } = instance
        onReady && invokeArrayFns(onReady)
      })
      onBeforeActivate(() => {
        if (!instance.__isVisible) {
          instance.__isVisible = true
          const { onShow } = instance
          onShow && invokeArrayFns(onShow)
        }
      })
      onBeforeDeactivate(() => {
        if (instance.__isVisible && !instance.__isUnload) {
          instance.__isVisible = false
          const { onHide } = instance
          onHide && invokeArrayFns(onHide)
        }
      })
    },
  })
}

export function setupApp(comp: any) {
  return setupComponent(comp, {
    init: initApp,
    setup(instance) {
      const route = usePageRoute()
      onBeforeMount(() => {
        const { onLaunch, onShow } = instance
        onLaunch &&
          invokeArrayFns(onLaunch, {
            path: route.meta.route,
            query: decodedQuery(route.query),
            scene: 1001,
          })
        onShow && invokeArrayFns(onShow)
      })
      onMounted(() => {
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'visible') {
            UniServiceJSBridge.emit('onAppEnterForeground')
          } else {
            UniServiceJSBridge.emit('onAppEnterBackground')
          }
        })
      })
    },
    after(comp) {
      comp.mpType = 'app'
      comp.render = () => (openBlock(), createBlock(LayoutComponent))
    },
  })
}
