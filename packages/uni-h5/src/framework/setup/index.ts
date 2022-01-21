import { extend, invokeArrayFns, isPlainObject } from '@vue/shared'
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
  onBeforeUnmount,
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
import { injectAppLaunchHooks } from '@dcloudio/uni-api'
import { subscribeViewMethod, unsubscribeViewMethod } from '@dcloudio/uni-core'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage, onPageShow, onPageReady } from './page'
import { usePageMeta, usePageRoute } from './provide'
import { initLaunchOptions, getEnterOptions } from './utils'

interface SetupComponentOptions {
  clone?: boolean
  init: (vm: ComponentPublicInstance) => void
  setup: (instance: ComponentInternalInstance) => Record<string, any> | void
  before?: (comp: DefineComponent) => void
}

function wrapperComponentSetup(
  comp: DefineComponent,
  { clone, init, setup, before }: SetupComponentOptions
) {
  if (clone) {
    comp = extend({}, comp)
  }
  before && before(comp)
  const oldSetup = comp.setup
  comp.setup = (props, ctx) => {
    const instance = getCurrentInstance()!
    init(instance.proxy!)
    const query = setup(instance)
    if (oldSetup) {
      return oldSetup(query || props, ctx)
    }
  }
  return comp
}

function setupComponent(comp: any, options: SetupComponentOptions) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
    return wrapperComponentSetup(comp.default, options)
  }
  return wrapperComponentSetup(comp, options)
}

export function setupWindow(comp: any, id: number) {
  return setupComponent(comp, {
    init: (vm) => {
      vm.$page = {
        id,
      } as Page.PageInstance['$page']
    },
    setup(instance) {
      instance.root = instance // windows 中组件 root 指向 window
    },
  })
}

export function setupPage(comp: any) {
  if (__DEV__) {
    comp.__mpType = 'page'
  }
  return setupComponent(comp, {
    clone: true,
    init: initPage,
    setup(instance) {
      instance.root = instance // 组件 root 指向页面
      const route = usePageRoute()
      // 存储参数，让 initHooks 中执行 onLoad 时，可以访问到
      instance.attrs.__pageQuery = decodedQuery(route.query)
      if (__NODE_JS__) {
        return instance.attrs.__pageQuery as Record<string, unknown>
      }
      const pageMeta = usePageMeta()
      onBeforeMount(() => {
        onPageShow(instance, pageMeta)
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

      subscribeViewMethod(pageMeta.id!)
      onBeforeUnmount(() => {
        unsubscribeViewMethod(pageMeta.id!)
      })

      return route.query
    },
  })
}

export function setupApp(comp: any) {
  if (__DEV__) {
    comp.__mpType = 'app'
  }
  return setupComponent(comp, {
    init: initApp,
    setup(instance) {
      const route = usePageRoute()
      // node环境不触发App生命周期
      if (__NODE_JS__) {
        return route.query
      }
      const onLaunch = () => {
        const { onLaunch, onShow, onPageNotFound } = instance
        const path = route.path.substr(1)
        const launchOptions = extend(
          {
            app: { mixin: instance.appContext.app.mixin },
          },
          initLaunchOptions({
            path: path || __uniRoutes[0].meta.route,
            query: decodedQuery(route.query),
          })
        )
        onLaunch && invokeArrayFns(onLaunch, launchOptions)
        onShow && invokeArrayFns(onShow, launchOptions)
        if (__UNI_FEATURE_PAGES__) {
          if (!route.matched.length) {
            const pageNotFoundOptions = {
              notFound: true,
              openType: 'appLaunch',
              path: route.path,
              query: {},
              scene: 1001,
            }
            onPageNotFound &&
              invokeArrayFns(onPageNotFound, pageNotFoundOptions)
          }
        }
      }
      injectAppLaunchHooks(instance)
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
      const { setup } = comp
      comp.setup = (props, ctx) => {
        setup && setup(props, ctx)
        return () => {
          return openBlock(), createBlock(LayoutComponent)
        }
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
  const { emit } = UniServiceJSBridge
  if (document.visibilityState === 'visible') {
    emit(ON_APP_ENTER_FOREGROUND, getEnterOptions())
  } else {
    emit(ON_APP_ENTER_BACKGROUND)
  }
}
