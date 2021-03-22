import {
  vShow,
  withCtx,
  Fragment,
  KeepAlive,
  openBlock,
  mergeProps,
  createBlock,
  createVNode,
  withDirectives,
  defineComponent,
  resolveComponent,
  ConcreteComponent,
  createCommentVNode,
  resolveDynamicComponent,
} from 'vue'

import { RouteLocationNormalizedLoaded, RouterView, useRoute } from 'vue-router'

import TabBar from '../tabBar'

import { useKeepAliveRoute } from '../../../plugin/page'

type KeepAliveRoute = ReturnType<typeof useKeepAliveRoute>

export default defineComponent({
  name: 'Layout',
  emits: ['change'],
  setup() {
    const route = __UNI_FEATURE_TABBAR__ ? useRoute() : null
    const keepAliveRoute = __UNI_FEATURE_PAGES__ ? useKeepAliveRoute() : null
    const topWindow = __UNI_FEATURE_TOPWINDOW__ ? useTopWindow() : null
    const leftWindow = __UNI_FEATURE_LEFTWINDOW__ ? useLeftWindow() : null
    const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ ? useRightWindow() : null
    return () => {
      return (
        openBlock(),
        createBlock(
          Fragment,
          null,
          [
            createLayoutVNode(
              keepAliveRoute,
              topWindow,
              leftWindow,
              rightWindow
            ),
            createTabBarVNode(route),
          ],
          64 /* STABLE_FRAGMENT */
        )
      )
    }
  },
})

function createLayoutVNode(
  keepAliveRoute: KeepAliveRoute | null,
  topWindow: unknown,
  leftWindow: unknown,
  rightWindow: unknown
) {
  const routerVNode = __UNI_FEATURE_PAGES__
    ? createRouterViewVNode(keepAliveRoute!)
    : createPageVNode()
  // 非响应式
  if (!__UNI_FEATURE_RESPONSIVE__) {
    return routerVNode
  }
  const topWindowVNode = __UNI_FEATURE_TOPWINDOW__
    ? createTopWindowVNode(topWindow)
    : createCommentVNode('', true)
  const leftWindowVNode = __UNI_FEATURE_LEFTWINDOW__
    ? createLeftWindowVNode(leftWindow)
    : createCommentVNode('', true)
  const rightWindowVNode = __UNI_FEATURE_RIGHTWINDOW__
    ? createRightWindowVNode(rightWindow)
    : createCommentVNode('', true)
  return createVNode('uni-layout', null, [
    topWindowVNode,
    createVNode('uni-content', null, [
      createVNode('uni-main', null, [routerVNode]),
      leftWindowVNode,
      rightWindowVNode,
    ]),
  ])
}

function createTabBarVNode(route: RouteLocationNormalizedLoaded | null) {
  return __UNI_FEATURE_TABBAR__
    ? withDirectives(createVNode(TabBar, null, null, 512 /* NEED_PATCH */), [
        [vShow, route!.meta.isTabBar], // TODO mediaQuery and api
      ])
    : createCommentVNode('', true)
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

function createTopWindowVNode(topWindow: unknown) {
  if (!__UNI_FEATURE_TOPWINDOW__) {
    return createCommentVNode('', true)
  }
  const { component, style, height, show } = useTopWindow()
  return withDirectives(
    createVNode(
      'uni-top-window',
      null,
      [
        createVNode(
          'div',
          {
            ref: 'topWindow',
            class: 'uni-top-window',
            style,
          },
          [
            createVNode(
              component,
              mergeProps(
                {
                  onVnodeMounted(vnode) {
                    // update style.offsetHeight
                  },
                  'navigation-bar-title-text': '',
                }
                //bindWindow
              ),
              null,
              16 /* FULL_PROPS */,
              ['navigation-bar-title-text']
            ),
          ],
          4 /* STYLE */
        ),
        createVNode(
          'div',
          {
            class: 'uni-top-window--placeholder',
            style: { height },
          },
          null,
          4 /* STYLE */
        ),
      ],
      512 /* NEED_PATCH */
    ),
    [[vShow, show]]
  )
}

function createLeftWindowVNode(leftWindow: unknown) {}
function createRightWindowVNode(leftWindow: unknown) {}
