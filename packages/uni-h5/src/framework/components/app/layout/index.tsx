import {
  watch,
  computed,
  ComputedRef,
  withCtx,
  KeepAlive,
  openBlock,
  createBlock,
  createVNode,
  defineComponent,
  resolveComponent,
  ConcreteComponent,
  resolveDynamicComponent,
  SetupContext,
} from 'vue'

import { RouterView, useRoute } from 'vue-router'

import { useTabBar } from '../../../plugin/state'
import { useKeepAliveRoute } from '../../../plugin/page'

import TabBar from '../tabBar'

type KeepAliveRoute = ReturnType<typeof useKeepAliveRoute>

export default defineComponent({
  name: 'Layout',
  props: {
    onChange: Function,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const keepAliveRoute = (__UNI_FEATURE_PAGES__ &&
      useKeepAliveRoute()) as KeepAliveRoute
    const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow()
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow()
    const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow()
    const showTabBar = (__UNI_FEATURE_TABBAR__ &&
      useShowTabBar(emit)) as ComputedRef<boolean>
    return () => {
      const layoutTsx = createLayoutTsx(
        keepAliveRoute,
        topWindow,
        leftWindow,
        rightWindow
      )
      const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar)
      if (!tabBarTsx) {
        return layoutTsx
      }
      return [layoutTsx, tabBarTsx]
    }
  },
})

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

function useShowTabBar(emit: SetupContext['emit']) {
  const route = useRoute()
  const tabBar = useTabBar()!
  // TODO meida query
  const showTabBar = computed(() => route.meta.isTabBar && tabBar.shown)
  watch(showTabBar, (value) => {
    emit('change', 'showTabBar', value)
  })
  return showTabBar
}

function createTabBarTsx(showTabBar: ComputedRef<boolean>) {
  return <TabBar v-show={showTabBar.value} />
}

function createPageVNode() {
  return createVNode(__uniRoutes[0].component)
}

function createRouterViewVNode(
  keepAliveRoute: ReturnType<typeof useKeepAliveRoute>
) {
  return createVNode(RouterView, null, {
    default: withCtx(({ Component }: { Component: unknown }) => [
      (openBlock(),
      createBlock(
        KeepAlive,
        { matchBy: 'key', cache: keepAliveRoute.routeCache },
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
