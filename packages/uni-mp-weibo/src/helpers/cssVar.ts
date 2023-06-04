import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { updatePageCssVar } from '@dcloudio/uni-core'
import { useTabBar } from '../framework/setup/state'
import { cssEnv, cssConstant } from '../service/api/base/canIUse'

const envMethod = /*#__PURE__*/ (() =>
  cssEnv ? 'env' : cssConstant ? 'constant' : '')()

export function updateCurPageCssVar(pageMeta: UniApp.PageRouteMeta) {
  let windowTopValue = 0
  let windowBottomValue = 0
  if (
    __UNI_FEATURE_NAVIGATIONBAR__ &&
    pageMeta.navigationBar.style !== 'custom' &&
    ['default', 'float'].indexOf(pageMeta.navigationBar.type!) > -1
  ) {
    windowTopValue = NAVBAR_HEIGHT
  }
  if (__UNI_FEATURE_TABBAR__ && pageMeta.isTabBar) {
    const tabBar = useTabBar()!
    tabBar.shown && (windowBottomValue = parseInt(tabBar.height!))
  }
  updatePageCssVar({
    '--window-top': normalizeWindowTop(windowTopValue),
    '--window-bottom': normalizeWindowBottom(windowBottomValue),
  })
}

export function normalizeWindowTop(windowTop: number) {
  return envMethod
    ? `calc(${windowTop}px + ${envMethod}(safe-area-inset-top))`
    : `${windowTop}px`
}

export function normalizeWindowBottom(windowBottom: number) {
  return envMethod
    ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))`
    : `${windowBottom}px`
}
