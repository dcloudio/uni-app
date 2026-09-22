<template>
  <uni-app ref="rootRef" :class="clazz">
    <uni-layout
      v-if="hasResponsive"
      :class="{
        'uni-app--showtopwindow': hasTopWindow && layoutState.showTopWindow,
        'uni-app--showleftwindow': hasLeftWindow && layoutState.showLeftWindow,
        'uni-app--showrightwindow':
          hasRightWindow && layoutState.showRightWindow,
      }"
    >
      <uni-top-window
        v-if="hasTopWindow && TopWindow"
        v-show="layoutState.showTopWindow || layoutState.apiShowTopWindow"
      >
        <!--
          注意如果修改 layoutState.topWindowStyle 所在的元素，需要同步修改
          useTopWindow 函数中 layoutState.topWindowHeight 的计算逻辑。
        -->
        <div class="uni-top-window" :style="layoutState.topWindowStyle">
          <component
            :is="TopWindow"
            ref="topWindowRef"
            :navigation-bar-title-text="layoutState.navigationBarTitleText"
            v-bind="windowState"
          />
        </div>
        <div
          class="uni-top-window--placeholder"
          :style="{ height: layoutState.topWindowHeight + 'px' }"
        />
      </uni-top-window>
      <uni-content>
        <uni-main>
          <KeepAlive
            v-if="hasPages && route?.meta.route"
            match-by="key"
            :cache="routeCache"
          >
            <RouterView :type="isTabBar ? 'tabBar' : ''" :key="routeKey" />
          </KeepAlive>
          <component v-else-if="!hasPages" :is="firstPageComponent" />
        </uni-main>
        <uni-left-window
          v-if="hasLeftWindow && LeftWindow"
          v-show="layoutState.showLeftWindow || layoutState.apiShowLeftWindow"
          :data-show="layoutState.apiShowLeftWindow || undefined"
          :style="layoutState.leftWindowStyle"
        >
          <!--
            注意如果修改 layoutState.leftWindowStyle 所在的元素，需要同步修改
            useLeftWindow 函数中 layoutState.leftWindowWidth 的计算逻辑。
          -->
          <div
            v-if="layoutState.apiShowLeftWindow"
            class="uni-mask"
            @click="layoutState.apiShowLeftWindow = false"
          />
          <div class="uni-left-window">
            <component
              :is="LeftWindow"
              ref="leftWindowRef"
              v-bind="windowState"
            />
          </div>
        </uni-left-window>
        <uni-right-window
          v-if="hasRightWindow && RightWindow"
          v-show="layoutState.showRightWindow || layoutState.apiShowRightWindow"
          :data-show="layoutState.apiShowRightWindow || undefined"
          :style="layoutState.rightWindowStyle"
        >
          <!--
            注意如果修改 layoutState.rightWindowStyle 所在的元素，需要同步修改
            useRightWindow 函数中 layoutState.rightWindowWidth 的计算逻辑。
          -->
          <div
            v-if="layoutState.apiShowRightWindow"
            class="uni-mask"
            @click="layoutState.apiShowRightWindow = false"
          />
          <div class="uni-right-window">
            <component
              :is="RightWindow"
              ref="rightWindowRef"
              v-bind="windowState"
            />
          </div>
        </uni-right-window>
      </uni-content>
    </uni-layout>
    <template v-else>
      <KeepAlive
        v-if="hasPages && route?.meta.route"
        match-by="key"
        :cache="routeCache"
      >
        <RouterView :type="isTabBar ? 'tabBar' : ''" :key="routeKey" />
      </KeepAlive>
      <component v-else-if="!hasPages" :is="firstPageComponent" />
    </template>
    <TabBar v-if="hasTabBar" v-show="showTabBar" />
  </uni-app>
</template>

<script lang="ts">
interface WindowState {
  matchTopWindow?: boolean
  showTopWindow?: boolean
  matchLeftWindow?: boolean
  showLeftWindow?: boolean
  matchRightWindow?: boolean
  showRightWindow?: boolean
}
</script>

<script setup lang="ts">
import {
  type ComponentPublicInstance,
  type ComputedRef,
  KeepAlive,
  type Ref,
  type defineComponent,
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'

// TODO Web Vapor SSR 支持后，为 VaporRouterView 补充服务端渲染实现。
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
  resolveOwnerEl,
} from '@dcloudio/uni-shared'
import { checkMinWidth } from '../../../helpers/dom'
import { hasOwn } from '@vue/shared'

import TabBar from './tabBar.vue'
import { setLayoutState, type LayoutState } from './state'
import { usePageRoute } from '../../setup/provide'

defineOptions({
  name: 'Layout',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

const DEFAULT_CSS_VAR_VALUE = '0px'

const hasPages = __UNI_FEATURE_PAGES__
const hasResponsive = __UNI_FEATURE_RESPONSIVE__
const hasTopWindow = __UNI_FEATURE_TOPWINDOW__
const hasLeftWindow = __UNI_FEATURE_LEFTWINDOW__
const hasRightWindow = __UNI_FEATURE_RIGHTWINDOW__
const hasTabBar = __UNI_FEATURE_TABBAR__

const rootRef: Ref<HTMLElement | null> = ref(null)
!__NODE_JS__ && initCssVar()
const firstPageComponent = !hasPages && __uniRoutes[0].component
const keepAliveRoute = hasPages ? useKeepAliveRoute() : undefined
const routeKey = keepAliveRoute?.routeKey
const isTabBar = keepAliveRoute?.isTabBar
const routeCache = keepAliveRoute?.routeCache
const route = hasPages ? useRoute() : undefined
const { layoutState, windowState } = useState()
useMaxWidth(layoutState, rootRef)
const topWindow = (hasTopWindow &&
  useTopWindow(layoutState)) as WindowComponentInfo
const leftWindow = (hasLeftWindow &&
  useLeftWindow(layoutState)) as WindowComponentInfo
const rightWindow = (hasRightWindow &&
  useRightWindow(layoutState)) as WindowComponentInfo
const TopWindow = topWindow && topWindow.component
const LeftWindow = leftWindow && leftWindow.component
const RightWindow = rightWindow && rightWindow.component
const topWindowRef = topWindow && topWindow.windowRef
const leftWindowRef = leftWindow && leftWindow.windowRef
const rightWindowRef = rightWindow && rightWindow.windowRef
const showTabBar = (hasTabBar && useShowTabBar()) as ComputedRef<boolean>
const clazz = useAppClass(showTabBar)
setLayoutState(layoutState)

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
  if (!hasResponsive) {
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
      hasTopWindow &&
      route.meta.topWindow !== false &&
      topWindowMediaQuery.value
  )
  const showLeftWindow = computed(
    () =>
      hasLeftWindow &&
      route.meta.leftWindow !== false &&
      leftWindowMediaQuery.value
  )
  const showRightWindow = computed(
    () =>
      hasRightWindow &&
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
    if (!instance || !instance.$) {
      // 目前 top-window、left-window、right-window 是 AsyncComponent，下方的 watch 触发时 instance 可能为 null
      return
    }
    const el = resolveOwnerEl(instance.$) as HTMLElement
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
    if (!instance || !instance.$) {
      return
    }
    const el = resolveOwnerEl(instance.$) as HTMLElement
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
    if (!instance || !instance.$) {
      return
    }
    const el = resolveOwnerEl(instance.$) as HTMLElement
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
</script>
