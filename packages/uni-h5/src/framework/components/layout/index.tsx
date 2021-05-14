import {
  ref,
  withCtx,
  computed,
  ComputedRef,
  KeepAlive,
  openBlock,
  createBlock,
  createVNode,
  SetupContext,
  resolveComponent,
  ConcreteComponent,
  resolveDynamicComponent,
} from 'vue'

import { RouterView, useRoute } from 'vue-router'

import { defineSystemComponent } from '@dcloudio/uni-components'
import { updateCssVar } from '@dcloudio/uni-core'
import { useTabBar } from '../../setup/state'
import { useKeepAliveRoute } from '../../setup/page'

import TabBar from './tabBar'

type KeepAliveRoute = ReturnType<typeof useKeepAliveRoute>

const DEFAULT_CSS_VAR_VALUE = '0px'

export default /*#__PURE__*/ defineSystemComponent({
  name: 'Layout',
  setup(_props, { emit }) {
    !__NODE_JS__ && initCssVar()
    const keepAliveRoute = (__UNI_FEATURE_PAGES__ &&
      useKeepAliveRoute()) as KeepAliveRoute
    const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow()
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow()
    const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow()
    const showTabBar = (__UNI_FEATURE_TABBAR__ &&
      useShowTabBar(emit)) as ComputedRef<boolean>
    const clazz = useAppClass(showTabBar)
    return () => {
      const layoutTsx = createLayoutTsx(
        keepAliveRoute,
        topWindow,
        leftWindow,
        rightWindow
      )
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar)
      return (
        <uni-app class={clazz.value}>
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

function createLayoutTsx(
  keepAliveRoute: KeepAliveRoute,
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
    ? createTopWindowTsx(topWindow)
    : null
  const leftWindowTsx = __UNI_FEATURE_LEFTWINDOW__
    ? createLeftWindowTsx(leftWindow)
    : null
  const rightWindowTsx = __UNI_FEATURE_RIGHTWINDOW__
    ? createRightWindowTsx(rightWindow)
    : null
  return (
    <uni-layout>
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
  const route = useRoute()
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

function useTopWindow() {
  const component = resolveComponent('VUniTopWindow') as ConcreteComponent
  return {
    component,
    style: (component as any).style,
    height: 0,
    show: false,
  }
}
function useLeftWindow() {
  const component = resolveComponent('VUniLeftWindow') as ConcreteComponent
  return {
    component,
    style: (component as any).style,
    height: 0,
  }
}
function useRightWindow() {
  const component = resolveComponent('VUniRightWindow') as ConcreteComponent
  return {
    component,
    style: (component as any).style,
    height: 0,
  }
}

function createTopWindowTsx(topWindow: unknown) {}
function createLeftWindowTsx(leftWindow: unknown) {}
function createRightWindowTsx(leftWindow: unknown) {}
