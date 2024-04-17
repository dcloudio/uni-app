import { type Ref, computed, inject, nextTick, provide, ref } from 'vue'
import type { Router } from 'vue-router'
import { hasOwn } from '@vue/shared'
import { RESPONSIVE_MIN_WIDTH } from '@dcloudio/uni-shared'
import { PolySymbol } from '@dcloudio/uni-core'

import { checkMinWidth } from '../../../helpers/dom'

const layoutKey = PolySymbol(__DEV__ ? 'layout' : 'l')

interface ProvideLayout {}

// const windowTypes = ['top', 'left', 'right']

export function useLayout() {
  return inject(layoutKey)
}

export function provideLayout(router?: Router) {
  provide(layoutKey, initLayout(router))
}
// 1. 查找minWidth，确认是否需要responsive
function initLayout(router?: Router): ProvideLayout {
  if (!__UNI_FEATURE_RESPONSIVE__) {
    return {}
  }
  initTopWindow(router)
  initLeftWindow()
  initRightWindow()
  return {}
}

function initMediaQuery(
  minWidth: number,
  callback: (ev: MediaQueryListEvent) => void
) {
  const mediaQueryList = window.matchMedia('(min-width: ' + minWidth + 'px)')
  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', callback)
  } else {
    mediaQueryList.addListener(callback)
  }
}

interface TopWindowRes {
  matchTopWindow: Ref<boolean>
  topWindowStyle: Ref<Record<string, any>>
  showTopWindow: Ref<boolean>
}

function initTopWindow(router?: Router) {
  const res: TopWindowRes = {
    matchTopWindow: ref(false),
    topWindowStyle: ref({}),
    showTopWindow: ref(false),
  }
  if (__UNI_FEATURE_TOPWINDOW__) {
    return _initTopWindow(res, router)
  }
  return res
}

function _initTopWindow(res: TopWindowRes, router?: Router) {
  let topWindowMinWidth = RESPONSIVE_MIN_WIDTH
  const { matchMedia, style } = __uniConfig.topWindow!
  if (matchMedia && hasOwn(matchMedia, 'minWidth')) {
    topWindowMinWidth = matchMedia.minWidth!
  }
  if (checkMinWidth(topWindowMinWidth)) {
    initMediaQuery(topWindowMinWidth, (ev) => {
      res.matchTopWindow.value = ev.matches
      nextTick(() => {})
    })
  }
  res.topWindowStyle = ref(style!)
  res.showTopWindow = computed(() => {
    if (!res.matchTopWindow.value) {
      // 未match
      return false
    }
    if (router && !router.currentRoute.value.meta.topWindow) {
      // 当前路由不支持
      return false
    }
    // TODO API
    return true
  })
  return res
}

function initLeftWindow() {
  let leftWindowMinWidth = RESPONSIVE_MIN_WIDTH
  if (__UNI_FEATURE_LEFTWINDOW__) {
    const { matchMedia } = __uniConfig.leftWindow!
    if (matchMedia && hasOwn(matchMedia, 'minWidth')) {
      leftWindowMinWidth = matchMedia.minWidth!
    }
  }
  return { leftWindowMinWidth }
}

function initRightWindow() {
  let rightWindowMinWidth = RESPONSIVE_MIN_WIDTH
  if (__UNI_FEATURE_RIGHTWINDOW__) {
    const { matchMedia } = __uniConfig.rightWindow!
    if (matchMedia && hasOwn(matchMedia, 'minWidth')) {
      rightWindowMinWidth = matchMedia.minWidth!
    }
  }
  return { rightWindowMinWidth }
}
