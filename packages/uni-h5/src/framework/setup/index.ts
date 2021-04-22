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
import { useRouter } from 'vue-router'
import { decodedQuery } from '@dcloudio/uni-shared'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage, onPageShow } from './page'
import { usePageMeta, usePageRoute } from './provide'

interface SetupComponentOptions {
  init: (vm: ComponentPublicInstance) => void
  setup: (instance: ComponentInternalInstance) => Record<string, any>
  after?: (comp: DefineComponent) => void
}

function wrapperComponentSetup(
  comp: DefineComponent,
  { init, setup, after }: SetupComponentOptions
) {
  const oldSetup = comp.setup
  comp.setup = (props, ctx) => {
    const instance = getCurrentInstance()!
    init(instance.proxy!)
    const query = setup(instance)
    if (oldSetup) {
      return oldSetup(query, ctx)
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
      instance.root = instance // 组件root指向页面
      const route = usePageRoute()
      if (route.meta.isTabBar) {
        //初始化时，状态肯定是激活
        instance.__isActive = true
      }
      const pageMeta = usePageMeta()
      onBeforeMount(() => {
        const { onLoad, onShow } = instance
        onPageShow(instance, pageMeta)
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
          onPageShow(instance, pageMeta)
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
      return route.query
    },
  })
}

export function setupApp(comp: any) {
  return setupComponent(comp, {
    init: initApp,
    setup(instance) {
      const route = usePageRoute()
      const onLaunch = () => {
        const { onLaunch, onShow } = instance
        const path = route.path.substr(1)
        const launchOptions = {
          path: path || __uniRoutes[0].meta.route,
          query: decodedQuery(route.query),
          scene: 1001,
        }
        onLaunch && invokeArrayFns(onLaunch, launchOptions)
        onShow && invokeArrayFns(onShow, launchOptions)
      }
      if (__UNI_FEATURE_PAGES__) {
        // 等待ready后，再onLaunch，可以顺利获取到正确的path和query
        useRouter().isReady().then(onLaunch)
      } else {
        onBeforeMount(onLaunch)
      }
      onMounted(() => {
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'visible') {
            UniServiceJSBridge.emit('onAppEnterForeground')
          } else {
            UniServiceJSBridge.emit('onAppEnterBackground')
          }
        })
      })
      return route.query
    },
    after(comp) {
      comp.mpType = 'app'
      comp.render = () => (openBlock(), createBlock(LayoutComponent))
    },
  })
}
