import {
  withCtx,
  KeepAlive,
  openBlock,
  createBlock,
  createVNode,
  defineComponent,
  resolveComponent,
  ConcreteComponent,
  resolveDynamicComponent,
} from 'vue'

import { RouteLocationNormalizedLoaded, RouterView, useRoute } from 'vue-router'

import TabBar from '../tabBar'

import { useKeepAliveRoute } from '../../../plugin/page'

type KeepAliveRoute = ReturnType<typeof useKeepAliveRoute>

export default defineComponent({
  name: 'Layout',
  props: {
    onChange: Function,
  },
  emits: ['change'],
  setup() {
    const route = __UNI_FEATURE_TABBAR__ && useRoute()
    const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute()
    const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow()
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow()
    const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow()
    return () => {
      const layoutTsx = createLayoutTsx(
        keepAliveRoute,
        topWindow,
        leftWindow,
        rightWindow
      )
      const tabBarTsx =
        __UNI_FEATURE_TABBAR__ &&
        createTabBarTsx(route as RouteLocationNormalizedLoaded)
      return [layoutTsx, tabBarTsx].filter(Boolean)
    }
  },
})

function createLayoutTsx(
  keepAliveRoute: KeepAliveRoute | false,
  topWindow?: unknown,
  leftWindow?: unknown,
  rightWindow?: unknown
) {
  const routerVNode = __UNI_FEATURE_PAGES__
    ? createRouterViewVNode(keepAliveRoute as KeepAliveRoute)
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

function createTabBarTsx(route: RouteLocationNormalizedLoaded) {
  return <TabBar v-show={route.meta.isTabBar} />
}

function createPageVNode() {
  return createVNode(__uniRoutes[1].component)
}

function createRouterViewVNode(
  keepAliveRoute: ReturnType<typeof useKeepAliveRoute>
) {
  return createVNode(RouterView, null, {
    default: withCtx(({ Component }) => [
      (openBlock(),
      createBlock(
        KeepAlive,
        { cache: keepAliveRoute.routeCache },
        [
          (openBlock(),
          createBlock(resolveDynamicComponent(Component), {
            key: keepAliveRoute.routeKey.value,
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
