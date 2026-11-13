// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { VaporKeepAlive as KeepAlive, createDynamicComponent } from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
import {
  type ComponentPublicInstance,
  type ComputedRef,
  type Ref,
  computed,
  type defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
} from 'vue'
// TODO Web Vapor SSR 支持后，为 VaporRouterView 补充服务端渲染实现。
// @ts-expect-error 当前 vue-router 类型不包含定制运行时导出的 VaporRouterView
import { VaporRouterView as RouterView, useRoute } from 'vue-router'
import { getRouteOptions, updateCssVar } from '@dcloudio/uni-core'
import { useTabBar } from '../../setup/state'
import {
  getCurrentBasePages,
  getPage$BasePage,
  useKeepAliveRoute,
} from '../../setup/page'
import {
  ON_NAVIGATION_BAR_CHANGE,
  RESPONSIVE_MIN_WIDTH,
} from '@dcloudio/uni-shared'
import { checkMinWidth } from '../../../helpers/dom'
import { hasOwn } from '@vue/shared'
import TabBar from './tabBar-vapor'
import { type LayoutState, setLayoutState } from './state'
import { usePageRoute } from '../../setup/provide'

interface WindowState {
  matchTopWindow?: boolean
  showTopWindow?: boolean
  matchLeftWindow?: boolean
  showLeftWindow?: boolean
  matchRightWindow?: boolean
  showRightWindow?: boolean
}

const DEFAULT_CSS_VAR_VALUE = '0px'

// 功能开关保留为 JS 条件表达式，使项目发行时能裁剪关闭的分支及其组件依赖。
export default /*#__PURE__*/ defineSystemComponent({
  name: 'Layout',
  setup() {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    !__NODE_JS__ && initCssVar()
    const FirstPageComponent =
      !__UNI_FEATURE_PAGES__ && __uniRoutes[0].component
    const keepAliveRoute = __UNI_FEATURE_PAGES__
      ? useKeepAliveRoute()
      : undefined
    const routeKey = keepAliveRoute?.routeKey
    const isTabBar = keepAliveRoute?.isTabBar
    const routeCache = keepAliveRoute?.routeCache
    const route = __UNI_FEATURE_PAGES__ ? useRoute() : undefined
    const { layoutState, windowState } = useState()
    useMaxWidth(layoutState, rootRef)
    const topWindow = (__UNI_FEATURE_TOPWINDOW__ &&
      useTopWindow(layoutState)) as WindowComponentInfo
    const leftWindow = (__UNI_FEATURE_LEFTWINDOW__ &&
      useLeftWindow(layoutState)) as WindowComponentInfo
    const rightWindow = (__UNI_FEATURE_RIGHTWINDOW__ &&
      useRightWindow(layoutState)) as WindowComponentInfo
    const TopWindow = topWindow && topWindow.component
    const LeftWindow = leftWindow && leftWindow.component
    const RightWindow = rightWindow && rightWindow.component
    const topWindowRef = topWindow && topWindow.windowRef
    const leftWindowRef = leftWindow && leftWindow.windowRef
    const rightWindowRef = rightWindow && rightWindow.windowRef
    const showTabBar = (__UNI_FEATURE_TABBAR__ &&
      useShowTabBar()) as ComputedRef<boolean>
    const clazz = useAppClass(showTabBar)
    setLayoutState(layoutState)

    // 功能开关用 JS if 静态裁剪；运行时条件用 v-if，避免路由变化重建 KeepAlive。
    function renderPage() {
      if (__UNI_FEATURE_PAGES__) {
        return (
          <RouterView
            v-if={route?.meta.route}
            type={unref(isTabBar) ? 'tabBar' : ''}
            v-slots={{
              default: (slotProps) => (
                <KeepAlive
                  match-by="key"
                  cache={unref(routeCache)}
                  v-slots={{
                    // 在 KeepAlive 内读取 RouterView 的惰性 Block，直接保留动态组件的缓存边界。
                    default: () =>
                      createDynamicComponent(
                        () => slotProps.Component,
                        null,
                        null,
                        5 /* SINGLE_ROOT | SLOT_ROOT */,
                        () => unref(routeKey)
                      ),
                  }}
                />
              ),
            }}
          />
        )
      }
      return <FirstPageComponent />
    }
    function renderTabBar() {
      if (__UNI_FEATURE_TABBAR__) {
        return <TabBar v-show={unref(showTabBar)}></TabBar>
      }
    }

    function renderLayout() {
      if (__UNI_FEATURE_RESPONSIVE__) {
        return (
          <>
            {__UNI_FEATURE_TOPWINDOW__ && TopWindow && (
              <uni-top-window
                v-show={
                  layoutState.showTopWindow || layoutState.apiShowTopWindow
                }
              >
                {/* 调整窗口节点层级时，需同步 useTopWindow 中的尺寸读取。 */}
                <div class="uni-top-window" style={layoutState.topWindowStyle}>
                  <TopWindow
                    ref={topWindowRef}
                    navigation-bar-title-text={
                      layoutState.navigationBarTitleText
                    }
                    {...windowState.value}
                  ></TopWindow>
                </div>
                <div
                  class="uni-top-window--placeholder"
                  style={{
                    height: layoutState.topWindowHeight + 'px',
                  }}
                ></div>
              </uni-top-window>
            )}
            <uni-content>
              <uni-main>
                {renderPage()}
                {renderTabBar()}
              </uni-main>
              {__UNI_FEATURE_LEFTWINDOW__ && LeftWindow && (
                <uni-left-window
                  v-show={
                    layoutState.showLeftWindow || layoutState.apiShowLeftWindow
                  }
                  data-show={layoutState.apiShowLeftWindow || undefined}
                  style={layoutState.leftWindowStyle}
                >
                  {layoutState.apiShowLeftWindow ? (
                    <div
                      class="uni-mask"
                      onClick={() => (layoutState.apiShowLeftWindow = false)}
                    ></div>
                  ) : null}
                  {/* 调整节点层级时，需同步 useLeftWindow 中的尺寸读取。 */}
                  <div class="uni-left-window">
                    <LeftWindow
                      ref={leftWindowRef}
                      {...windowState.value}
                    ></LeftWindow>
                  </div>
                </uni-left-window>
              )}
              {__UNI_FEATURE_RIGHTWINDOW__ && RightWindow && (
                <uni-right-window
                  v-show={
                    layoutState.showRightWindow ||
                    layoutState.apiShowRightWindow
                  }
                  data-show={layoutState.apiShowRightWindow || undefined}
                  style={layoutState.rightWindowStyle}
                >
                  {layoutState.apiShowRightWindow ? (
                    <div
                      class="uni-mask"
                      onClick={() => (layoutState.apiShowRightWindow = false)}
                    ></div>
                  ) : null}
                  {/* 调整节点层级时，需同步 useRightWindow 中的尺寸读取。 */}
                  <div class="uni-right-window">
                    <RightWindow
                      ref={rightWindowRef}
                      {...windowState.value}
                    ></RightWindow>
                  </div>
                </uni-right-window>
              )}
            </uni-content>
          </>
        )
      }
      return (
        <>
          {renderPage()}
          {renderTabBar()}
        </>
      )
    }
    return () => (
      <uni-app ref={rootRef} class={clazz.value}>
        {renderLayout()}
      </uni-app>
    )
  },
})

function useAppClass(showTabBar?: ComputedRef<boolean>) {
  const showMaxWidth = ref(false)
  return computed(() => {
    return {
      'uni-app--showtabbar': showTabBar && showTabBar.value,
      'uni-app--tabbar-top':
        __UNI_FEATURE_TABBAR__ && useTabBar()!.position === 'top',
      'uni-app--maxwidth': showMaxWidth.value,
    }
  })
}

function initCssVar() {
  updateCssVar({
    '--status-bar-height': DEFAULT_CSS_VAR_VALUE,
    '--top-window-height': DEFAULT_CSS_VAR_VALUE,
    '--window-left': DEFAULT_CSS_VAR_VALUE,
    '--window-right': DEFAULT_CSS_VAR_VALUE,
    '--window-margin': DEFAULT_CSS_VAR_VALUE,
    '--tab-bar-height': DEFAULT_CSS_VAR_VALUE,
  })
}

function initMediaQuery(
  minWidth: number,
  callback: (ev: MediaQueryListEvent) => void
) {
  if (__NODE_JS__) {
    return false
  }
  const mediaQueryList = window.matchMedia('(min-width: ' + minWidth + 'px)')
  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', callback)
  } else {
    mediaQueryList.addListener(callback)
  }
  return mediaQueryList.matches
}

function useMaxWidth(
  layoutState: LayoutState,
  rootRef: Ref<HTMLElement | null>
) {
  const route = usePageRoute()
  function checkMaxWidth() {
    const windowWidth = document.body.clientWidth

    const pages = getCurrentBasePages()
    let meta = {} as UniApp.PageRouteMeta
    if (pages.length > 0) {
      const curPage = pages[pages.length - 1]
      meta = getPage$BasePage(curPage).meta
    } else {
      const routeOptions = getRouteOptions(route.path, true)
      if (routeOptions) {
        meta = routeOptions.meta
      }
    }

    const maxWidth = parseInt(
      String(
        (hasOwn(meta, 'maxWidth')
          ? meta.maxWidth
          : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER
      )
    )
    let showMaxWidth = false
    if (windowWidth > maxWidth) {
      showMaxWidth = true
    } else {
      showMaxWidth = false
    }
    if (showMaxWidth && maxWidth) {
      layoutState.marginWidth = (windowWidth - maxWidth) / 2
      nextTick(() => {
        const rootEl = rootRef.value
        if (rootEl) {
          rootEl.setAttribute(
            'style',
            'max-width:' + maxWidth + 'px;margin:0 auto;'
          )
        }
      })
    } else {
      layoutState.marginWidth = 0
      nextTick(() => {
        const rootEl = rootRef.value
        if (rootEl) {
          rootEl.removeAttribute('style')
        }
      })
    }
  }
  watch([() => route.path], checkMaxWidth)
  onMounted(() => {
    checkMaxWidth()
    window.addEventListener('resize', checkMaxWidth)
  })
}

function useState() {
  const route = usePageRoute()
  if (!__UNI_FEATURE_RESPONSIVE__) {
    // max width
    const layoutState = reactive({
      marginWidth: 0,
      leftWindowWidth: 0,
      rightWindowWidth: 0,
    }) as LayoutState
    watch(
      () => layoutState.marginWidth,
      (value) => updateCssVar({ '--window-margin': value + 'px' })
    )
    watch(
      () => layoutState.leftWindowWidth + layoutState.marginWidth,
      (value) => {
        updateCssVar({ '--window-left': value + 'px' })
      }
    )
    watch(
      () => layoutState.rightWindowWidth + layoutState.marginWidth,
      (value) => {
        updateCssVar({ '--window-right': value + 'px' })
      }
    )
    return {
      layoutState,
      windowState: computed<WindowState>(() => ({})),
    }
  }
  const topWindowMediaQuery = ref(false)
  const leftWindowMediaQuery = ref(false)
  const rightWindowMediaQuery = ref(false)
  const showTopWindow = computed(
    () =>
      __UNI_FEATURE_TOPWINDOW__ &&
      route.meta.topWindow !== false &&
      topWindowMediaQuery.value
  )
  const showLeftWindow = computed(
    () =>
      __UNI_FEATURE_LEFTWINDOW__ &&
      route.meta.leftWindow !== false &&
      leftWindowMediaQuery.value
  )
  const showRightWindow = computed(
    () =>
      __UNI_FEATURE_RIGHTWINDOW__ &&
      route.meta.rightWindow !== false &&
      rightWindowMediaQuery.value
  )
  const layoutState: LayoutState = reactive({
    topWindowMediaQuery,
    showTopWindow,
    apiShowTopWindow: false,
    leftWindowMediaQuery,
    showLeftWindow,
    apiShowLeftWindow: false,
    rightWindowMediaQuery,
    showRightWindow,
    apiShowRightWindow: false,
    topWindowHeight: 0,
    marginWidth: 0,
    leftWindowWidth: 0,
    rightWindowWidth: 0,
    navigationBarTitleText: '',
    topWindowStyle: {},
    leftWindowStyle: {},
    rightWindowStyle: {},
  })
  const props: Array<'topWindow' | 'leftWindow' | 'rightWindow'> = [
    'topWindow',
    'leftWindow',
    'rightWindow',
  ]
  type StateProps =
    | 'topWindowMediaQuery'
    | 'leftWindowMediaQuery'
    | 'rightWindowMediaQuery'
  props.forEach((prop) => {
    const matchMedia = __uniConfig[prop]?.matchMedia
    let topWindowMinWidth = RESPONSIVE_MIN_WIDTH
    if (matchMedia && hasOwn(matchMedia, 'minWidth')) {
      const minWidth = matchMedia.minWidth!
      topWindowMinWidth = checkMinWidth(minWidth) ? minWidth : topWindowMinWidth
    }
    const matches = initMediaQuery(topWindowMinWidth, (ev) => {
      layoutState[`${prop}MediaQuery` as StateProps] = ev.matches
    })
    layoutState[`${prop}MediaQuery` as StateProps] = matches
  })
  watch(
    () => layoutState.topWindowHeight,
    (value) => updateCssVar({ '--top-window-height': value + 'px' })
  )
  watch(
    () => layoutState.marginWidth,
    (value) => updateCssVar({ '--window-margin': value + 'px' })
  )
  // API 侧窗覆盖正文，只有常驻侧窗参与主区域的宽度分配。
  watch(
    () =>
      (layoutState.showLeftWindow && !layoutState.apiShowLeftWindow
        ? layoutState.leftWindowWidth
        : 0) + layoutState.marginWidth,
    (value) => {
      updateCssVar({ '--window-left': value + 'px' })
    }
  )
  watch(
    () =>
      (layoutState.showRightWindow && !layoutState.apiShowRightWindow
        ? layoutState.rightWindowWidth
        : 0) + layoutState.marginWidth,
    (value) => {
      updateCssVar({ '--window-right': value + 'px' })
    }
  )
  UniServiceJSBridge.on(ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
    layoutState.navigationBarTitleText = navigationBar.titleText
  })
  const windowState = computed<WindowState>(() => ({
    matchTopWindow: layoutState.topWindowMediaQuery,
    showTopWindow: layoutState.showTopWindow || layoutState.apiShowTopWindow,
    matchLeftWindow: layoutState.leftWindowMediaQuery,
    showLeftWindow: layoutState.showLeftWindow || layoutState.apiShowLeftWindow,
    matchRightWindow: layoutState.rightWindowMediaQuery,
    showRightWindow:
      layoutState.showRightWindow || layoutState.apiShowRightWindow,
  }))
  return {
    layoutState,
    windowState,
  }
}

function useShowTabBar() {
  const route = usePageRoute()
  const tabBar = useTabBar()!
  // TODO meida query
  const showTabBar = computed(() => route.meta.isTabBar && tabBar.shown)
  !__NODE_JS__ &&
    updateCssVar({
      '--tab-bar-height': tabBar.height!,
    })
  return showTabBar
}

interface WindowComponentInfo {
  component: ReturnType<typeof defineComponent>
  windowRef: Ref<ComponentPublicInstance | null>
}

function useTopWindow(layoutState: LayoutState): WindowComponentInfo {
  const { component, style } = __uniConfig.topWindow!
  const windowRef: Ref<ComponentPublicInstance | null> = ref(null)
  function updateWindow() {
    const instance = windowRef.value as ComponentPublicInstance
    if (!instance) {
      // 目前 top-window、left-window、right-window 是 AsyncComponent，下方的 watch 触发时 instance 可能为 null
      return
    }
    const el = instance.$el as HTMLElement
    if (!el) {
      return
    }
    /**
     * el 指开发者 top-window 的根节点，其高度可能并不正确。
     * pages.json 内的 top-window style 被设置到了 el 的父元素上。需要以父元素的高度为准。此值会影响 --top-window-height 变量
     */
    const uniTopWindowStyleEl = el.parentElement
    if (!uniTopWindowStyleEl) {
      return
    }
    const height = uniTopWindowStyleEl.getBoundingClientRect().height
    layoutState.topWindowHeight = height
  }
  watch(
    () => windowRef.value,
    () => {
      updateWindow()
    }
  )
  watch(
    () => layoutState.showTopWindow || layoutState.apiShowTopWindow,
    () => nextTick(updateWindow)
  )
  watch(
    () => layoutState.topWindowStyle,
    () => nextTick(updateWindow)
  )
  layoutState.topWindowStyle = style
  return {
    component,
    windowRef,
  }
}

function useLeftWindow(layoutState: LayoutState): WindowComponentInfo {
  const { component, style } = __uniConfig.leftWindow!
  const windowRef: Ref<ComponentPublicInstance | null> = ref(null)
  function updateWindow() {
    const instance = windowRef.value as ComponentPublicInstance
    if (!instance) {
      return
    }
    const el = instance.$el as HTMLElement
    if (!el) {
      return
    }
    /**
     * left-window 样式应用节点为 el 的父元素的父元素。
     */
    const uniLeftWindowStyleEl =
      el.parentElement && el.parentElement.parentElement
    if (!uniLeftWindowStyleEl) {
      return
    }
    const width = uniLeftWindowStyleEl.getBoundingClientRect().width
    layoutState.leftWindowWidth = width
  }
  watch(
    () => windowRef.value,
    () => {
      updateWindow()
    }
  )
  watch(
    () => layoutState.showLeftWindow || layoutState.apiShowLeftWindow,
    () => nextTick(updateWindow)
  )
  watch(
    () => layoutState.leftWindowStyle,
    () => nextTick(updateWindow)
  )
  layoutState.leftWindowStyle = style
  return {
    component,
    windowRef,
  }
}

function useRightWindow(layoutState: LayoutState): WindowComponentInfo {
  const { component, style } = __uniConfig.rightWindow!
  const windowRef: Ref<ComponentPublicInstance | null> = ref(null)
  function updateWindow() {
    const instance = windowRef.value as ComponentPublicInstance
    if (!instance) {
      return
    }
    const el = instance.$el as HTMLElement
    if (!el) {
      return
    }
    /**
     * right-window 样式应用节点为 el 的父元素的父元素。
     */
    const uniRightWindowStyleEl =
      el.parentElement && el.parentElement.parentElement
    if (!uniRightWindowStyleEl) {
      return
    }
    const width = uniRightWindowStyleEl.getBoundingClientRect().width
    layoutState.rightWindowWidth = width
  }
  watch(
    () => windowRef.value,
    () => {
      updateWindow()
    }
  )
  watch(
    () => layoutState.showRightWindow || layoutState.apiShowRightWindow,
    () => nextTick(updateWindow)
  )
  watch(
    () => layoutState.rightWindowStyle,
    () => nextTick(updateWindow)
  )
  layoutState.rightWindowStyle = style
  return {
    component,
    windowRef,
  }
}
