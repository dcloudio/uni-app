import {
  type ComponentPublicInstance,
  type ComputedRef,
  KeepAlive,
  type Ref,
  type SetupContext,
  computed,
  createBlock,
  createVNode,
  type defineComponent,
  nextTick,
  onMounted,
  openBlock,
  reactive,
  ref,
  resolveDynamicComponent,
  watch,
  withCtx,
} from 'vue'

import { RouterView } from 'vue-router'

import { defineSystemComponent } from '@dcloudio/uni-components'
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
  resolveOwnerEl,
} from '@dcloudio/uni-shared'
import { checkMinWidth } from '../../../helpers/dom'
import { hasOwn } from '@vue/shared'

import TabBar from './tabBar'
import { usePageRoute } from '../../setup/provide'

type KeepAliveRoute = ReturnType<typeof useKeepAliveRoute>

const DEFAULT_CSS_VAR_VALUE = '0px'

let globalLayoutState: LayoutState | undefined = undefined
export function getLayoutState() {
  return globalLayoutState
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'Layout',
  setup(_props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    !__NODE_JS__ && initCssVar()
    const keepAliveRoute = (__UNI_FEATURE_PAGES__ &&
      useKeepAliveRoute()) as KeepAliveRoute
    const { layoutState, windowState } = useState()
    useMaxWidth(layoutState, rootRef)
    const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow(layoutState!)
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow(layoutState!)
    const rightWindow =
      __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow(layoutState!)
    const showTabBar = (__UNI_FEATURE_TABBAR__ &&
      useShowTabBar(emit)) as ComputedRef<boolean>
    const clazz = useAppClass(showTabBar)
    globalLayoutState = layoutState
    return () => {
      const layoutTsx = createLayoutTsx(
        keepAliveRoute,
        layoutState,
        windowState,
        topWindow,
        leftWindow,
        rightWindow
      )
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar)
      return (
        <uni-app ref={rootRef} class={clazz.value}>
          {layoutTsx}
          {tabBarTsx}
        </uni-app>
      )
    }
  },
})

function useAppClass(showTabBar?: ComputedRef<boolean>) {
  const showMaxWidth = ref(false)
  return computed(() => {
    return {
      'uni-app--showtabbar': showTabBar && showTabBar.value,
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
interface LayoutState {
  topWindowMediaQuery: boolean
  showTopWindow: boolean
  apiShowTopWindow: boolean
  leftWindowMediaQuery: boolean
  showLeftWindow: boolean
  apiShowLeftWindow: boolean
  rightWindowMediaQuery: boolean
  showRightWindow: boolean
  apiShowRightWindow: boolean
  topWindowHeight: number
  marginWidth: number
  leftWindowWidth: number
  rightWindowWidth: number
  navigationBarTitleText: string
  topWindowStyle: unknown
  leftWindowStyle: unknown
  rightWindowStyle: unknown
}
interface WindowState {
  matchTopWindow?: boolean
  showTopWindow?: boolean
  matchLeftWindow?: boolean
  showLeftWindow?: boolean
  matchRightWindow?: boolean
  showRightWindow?: boolean
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

function createLayoutTsx(
  keepAliveRoute: KeepAliveRoute,
  layoutState: LayoutState,
  windowState: ComputedRef<WindowState>,
  topWindow?: unknown,
  leftWindow?: unknown,
  rightWindow?: unknown
) {
  const routerVNode = __UNI_FEATURE_PAGES__
    ? createRouterViewVNode(keepAliveRoute)
    : createPageVNode()
  // 非响应式
  if (!__UNI_FEATURE_RESPONSIVE__) {
    return routerVNode
  }
  const topWindowTsx = __UNI_FEATURE_TOPWINDOW__
    ? createTopWindowTsx(topWindow, layoutState, windowState.value)
    : null
  const leftWindowTsx = __UNI_FEATURE_LEFTWINDOW__
    ? createLeftWindowTsx(leftWindow, layoutState, windowState.value)
    : null
  const rightWindowTsx = __UNI_FEATURE_RIGHTWINDOW__
    ? createRightWindowTsx(rightWindow, layoutState, windowState.value)
    : null
  return (
    <uni-layout
      class={{
        'uni-app--showtopwindow':
          __UNI_FEATURE_TOPWINDOW__ && layoutState!.showTopWindow,
        'uni-app--showleftwindow':
          __UNI_FEATURE_LEFTWINDOW__ && layoutState!.showLeftWindow,
        'uni-app--showrightwindow':
          __UNI_FEATURE_RIGHTWINDOW__ && layoutState!.showRightWindow,
      }}
    >
      {topWindowTsx}
      <uni-content>
        <uni-main>{routerVNode}</uni-main>
        {leftWindowTsx}
        {rightWindowTsx}
      </uni-content>
    </uni-layout>
  )
}

function useShowTabBar(emit: SetupContext<['change']>['emit']) {
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

function createTabBarTsx(showTabBar: ComputedRef<boolean>) {
  return <TabBar v-show={showTabBar.value} />
}

function createPageVNode() {
  return createVNode(__uniRoutes[0].component)
}

function createRouterViewVNode({
  routeKey,
  isTabBar,
  routeCache,
}: ReturnType<typeof useKeepAliveRoute>) {
  return createVNode(RouterView, null, {
    default: withCtx(({ Component }: { Component: unknown }) => [
      (openBlock(),
      createBlock(
        KeepAlive,
        { matchBy: 'key', cache: routeCache },
        [
          (openBlock(),
          createBlock(resolveDynamicComponent(Component), {
            type: isTabBar.value ? 'tabBar' : '',
            key: routeKey.value,
          })),
        ],
        1032 /* PROPS, DYNAMIC_SLOTS */,
        ['cache']
      )),
    ]),
    _: 1 /* STABLE */,
  })
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
    const el = resolveOwnerEl(instance.$) as HTMLElement
    const height = el.getBoundingClientRect().height
    layoutState.topWindowHeight = height
  }
  onMounted(updateWindow)
  watch(
    () => layoutState.showTopWindow || layoutState.apiShowTopWindow,
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
    const el = resolveOwnerEl(instance.$) as HTMLElement
    const width = el.getBoundingClientRect().width
    layoutState.leftWindowWidth = width
  }
  onMounted(updateWindow)
  watch(
    () => layoutState.showLeftWindow || layoutState.apiShowLeftWindow,
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
    const el = resolveOwnerEl(instance.$) as HTMLElement
    const width = el.getBoundingClientRect().width
    layoutState.rightWindowWidth = width
  }
  onMounted(updateWindow)
  watch(
    () => layoutState.showRightWindow || layoutState.apiShowRightWindow,
    () => nextTick(updateWindow)
  )
  layoutState.rightWindowStyle = style
  return {
    component,
    windowRef,
  }
}

function createTopWindowTsx(
  topWindow: unknown,
  layoutState: LayoutState,
  windowState: WindowState
) {
  if (topWindow) {
    const { component: TopWindow, windowRef } = topWindow as WindowComponentInfo
    return (
      <uni-top-window
        v-show={layoutState.showTopWindow || layoutState.apiShowTopWindow}
      >
        <div class="uni-top-window" style={layoutState.topWindowStyle as any}>
          <TopWindow
            ref={windowRef}
            navigation-bar-title-text={layoutState.navigationBarTitleText}
            {...windowState}
          />
        </div>
        <div
          class="uni-top-window--placeholder"
          style={{ height: layoutState.topWindowHeight + 'px' }}
        />
      </uni-top-window>
    )
  }
}
function createLeftWindowTsx(
  leftWindow: unknown,
  layoutState: LayoutState,
  windowState: WindowState
) {
  if (leftWindow) {
    const { component: LeftWindow, windowRef } =
      leftWindow as WindowComponentInfo
    return (
      <uni-left-window
        v-show={layoutState.showLeftWindow || layoutState.apiShowLeftWindow}
        data-show={layoutState.apiShowLeftWindow || undefined}
        style={layoutState.leftWindowStyle as any}
      >
        {layoutState.apiShowLeftWindow ? (
          <div
            class="uni-mask"
            onClick={() => (layoutState.apiShowLeftWindow = false)}
          />
        ) : null}
        <div class="uni-left-window">
          <LeftWindow ref={windowRef} {...windowState} />
        </div>
      </uni-left-window>
    )
  }
}
function createRightWindowTsx(
  rightWindow: unknown,
  layoutState: LayoutState,
  windowState: WindowState
) {
  if (rightWindow) {
    const { component: RightWindow, windowRef } =
      rightWindow as WindowComponentInfo
    return (
      <uni-right-window
        v-show={layoutState.showRightWindow || layoutState.apiShowRightWindow}
        data-show={layoutState.apiShowRightWindow || undefined}
        style={layoutState.rightWindowStyle as any}
      >
        {layoutState.apiShowRightWindow ? (
          <div
            class="uni-mask"
            onClick={() => (layoutState.apiShowRightWindow = false)}
          />
        ) : null}
        <div class="uni-right-window">
          <RightWindow ref={windowRef} {...windowState} />
        </div>
      </uni-right-window>
    )
  }
}
