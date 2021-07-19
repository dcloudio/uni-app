import { invokeArrayFns, isPlainObject } from '@vue/shared'
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
import {
  debounce,
  decodedQuery,
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_RESIZE,
  ON_WEB_INVOKE_APP_SERVICE,
  WEB_INVOKE_APPSERVICE,
} from '@dcloudio/uni-shared'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage, onPageShow, onPageReady } from './page'
import { usePageMeta, usePageRoute } from './provide'
import {
  API_ON_WINDOW_RESIZE,
  API_TYPE_ON_WINDOW_RESIZE,
} from '@dcloudio/uni-api'

interface SetupComponentOptions {
  init: (vm: ComponentPublicInstance) => void
  setup: (instance: ComponentInternalInstance) => Record<string, any>
  before?: (comp: DefineComponent) => void
}

function wrapperComponentSetup(
  comp: DefineComponent,
  { init, setup, before }: SetupComponentOptions
) {
  before && before(comp)
  const oldSetup = comp.setup
  comp.setup = (props, ctx) => {
    const instance = getCurrentInstance()!
    init(instance.proxy!)
    const query = setup(instance)
    if (oldSetup) {
      return oldSetup(query, ctx)
    }
  }
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
      // node环境不触发Page生命周期
      if (__NODE_JS__) {
        return route.query
      }

      const pageMeta = usePageMeta()

      onBeforeMount(() => {
        onPageShow(instance, pageMeta)
        const { onLoad, onShow } = instance
        onLoad && invokeArrayFns(onLoad, decodedQuery(route.query))
        instance.__isVisible = true
        onShow && invokeArrayFns(onShow)
      })
      onMounted(() => {
        onPageReady(instance)
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
      // node环境不触发App生命周期
      if (__NODE_JS__) {
        return route.query
      }
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
        window.addEventListener('resize', debounce(onResize, 50))
        window.addEventListener('message', onMessage)
        document.addEventListener('visibilitychange', onVisibilityChange)
      })
      return route.query
    },
    before(comp) {
      comp.mpType = 'app'
      comp.setup = () => () => {
        return openBlock(), createBlock(LayoutComponent)
      }
    },
  })
}

function onResize() {
  const { windowWidth, windowHeight, screenWidth, screenHeight } =
    uni.getSystemInfoSync()
  const landscape = Math.abs(Number(window.orientation)) === 90
  const deviceOrientation = landscape ? 'landscape' : 'portrait'
  UniServiceJSBridge.emit(ON_RESIZE, {
    deviceOrientation,
    size: {
      windowWidth,
      windowHeight,
      screenWidth,
      screenHeight,
    },
  })
}
function onMessage(evt: {
  data?: { type: string; data: any; pageId: number }
}) {
  if (isPlainObject(evt.data) && evt.data.type === WEB_INVOKE_APPSERVICE) {
    UniServiceJSBridge.emit(
      ON_WEB_INVOKE_APP_SERVICE,
      evt.data.data,
      evt.data.pageId
    )
  }
}
function onVisibilityChange() {
  UniServiceJSBridge.emit(
    document.visibilityState === 'visible'
      ? ON_APP_ENTER_FOREGROUND
      : ON_APP_ENTER_BACKGROUND
  )
}
