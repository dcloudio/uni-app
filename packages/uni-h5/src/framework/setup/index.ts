import { extend, invokeArrayFns, isPlainObject, isFunction } from '@vue/shared'
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
  nextTick,
} from 'vue'
import {
  debounce,
  decodedQuery,
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_RESIZE,
  ON_WEB_INVOKE_APP_SERVICE,
  WEB_INVOKE_APPSERVICE,
  ON_THEME_CHANGE,
} from '@dcloudio/uni-shared'
import { injectAppHooks } from '@dcloudio/uni-api'
import {
  subscribeViewMethod,
  unsubscribeViewMethod,
  invokeHook,
} from '@dcloudio/uni-core'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage, onPageShow, onPageReady } from './page'
import { usePageMeta, usePageRoute } from './provide'
import { initLaunchOptions, getEnterOptions } from './utils'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRouter } from 'vue-router'

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
      instance.$pageInstance = instance // window 的页面实例 $pageInstance 指向自己
    },
  })
}

export function setupPage(comp: any) {
  if (__DEV__) {
    comp.__mpType = 'page'
  }
  return setupComponent(comp, {
    clone: true, // 页面组件可能会被其他地方手动引用，比如 windows 等，需要 clone 一份新的作为页面组件
    init: initPage,
    setup(instance) {
      // instance.root = instance // 组件 root 指向页面
      // 修改 root 会影响 vue devtools
      instance.$pageInstance = instance // 组件 $pageInstance 指向页面
      // 组件的 $pageInstance 赋值，是在 vue 内核 createComponentInstance 中 root 赋值的地方实现
      const route = usePageRoute()
      // 存储参数，让 initHooks 中执行 onLoad 时，可以访问到
      const query = decodedQuery(route.query)
      instance.attrs.__pageQuery = query
      instance.proxy!.$page.options = query
      instance.proxy!.options = query
      if (__NODE_JS__) {
        return query
      }
      const pageMeta = usePageMeta()
      onBeforeMount(() => {
        onPageShow(instance, pageMeta)
      })
      onMounted(() => {
        onPageReady(instance)
        const { onReady } = instance
        onReady && invokeArrayFns(onReady)
        invokeOnTabItemTap(route)
      })
      onBeforeActivate(() => {
        if (!instance.__isVisible) {
          onPageShow(instance, pageMeta)
          instance.__isVisible = true
          const { onShow } = instance
          onShow && invokeArrayFns(onShow)
          nextTick(() => {
            invokeOnTabItemTap(route)
          })
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

      return query
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
        injectAppHooks(instance)
        const { onLaunch, onShow, onPageNotFound, onError } = instance
        const path = route.path.slice(1)
        const launchOptions = initLaunchOptions({
          path: path || __uniRoutes[0].meta.route,
          query: decodedQuery(route.query),
        })
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
        if (onError) {
          instance.appContext.config.errorHandler = (err) => {
            invokeArrayFns(onError, err)
          }
        }
      }
      if (__UNI_FEATURE_PAGES__) {
        // 等待ready后，再onLaunch，否则直达非首页无法获取到正确的path和query
        useRouter().isReady().then(onLaunch)
      } else {
        onBeforeMount(onLaunch)
      }

      onMounted(() => {
        window.addEventListener(
          'resize',
          debounce(onResize, 50, { setTimeout, clearTimeout })
        )
        window.addEventListener('message', onMessage)
        document.addEventListener('visibilitychange', onVisibilityChange)
        onThemeChange()
      })
      return route.query
    },
    before(comp) {
      comp.mpType = 'app'
      const { setup } = comp
      const render = () => {
        return openBlock(), createBlock(LayoutComponent)
      }
      comp.setup = (props, ctx) => {
        const res = setup && setup(props, ctx)
        return isFunction(res) ? render : res
      }
      comp.render = render
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
function onThemeChange() {
  let mediaQueryList: MediaQueryList | null = null

  try {
    mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  } catch (error) {}

  if (mediaQueryList) {
    let callback = (e: MediaQueryListEvent) => {
      UniServiceJSBridge.emit(ON_THEME_CHANGE, {
        theme: e.matches ? 'dark' : 'light',
      })
    }
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', callback)
    } else {
      mediaQueryList.addListener(callback)
    }
  }
}
function invokeOnTabItemTap(
  route:
    | RouteLocationNormalizedLoaded
    | {
        meta: UniApp.PageRouteMeta
        query: {}
        path: string
        matched: {
          path: string
        }[]
      }
) {
  const { tabBarText, tabBarIndex, route: pagePath } = route.meta
  if (tabBarText) {
    invokeHook('onTabItemTap', {
      index: tabBarIndex,
      text: tabBarText,
      pagePath,
    })
  }
}
