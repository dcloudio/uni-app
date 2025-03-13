import safeAreaInsets from 'safe-area-insets'
export function getPageWrapperInfo(pageBody?: HTMLElement) {
  const pageWrapper =
    pageBody || (document.querySelector('uni-page-wrapper') as HTMLElement)
  const pageWrapperRect = pageWrapper.getBoundingClientRect()

  const bodyRect = document.body.getBoundingClientRect()
  return {
    top: pageWrapperRect.top,
    left: pageWrapperRect.left,
    right: bodyRect.right - pageWrapperRect.right,
    bottom: bodyRect.bottom - pageWrapperRect.bottom,
    width: pageWrapperRect.width,
    height: pageWrapperRect.height,
  }
}

export const getSystemSafeAreaInsets = function () {
  return {
    top: safeAreaInsets.top,
    right: safeAreaInsets.right,
    bottom: safeAreaInsets.bottom,
    left: safeAreaInsets.left,
  }
}

/**
 * 注意web端页面安全区域较为特殊，如下四个值主要为满足fixed定位时能避开系统安全区域及页面top-window、left-window、nav-bar、tab-bar等的边界
 */
export function getSafeAreaInsets(pageBody?: HTMLElement) {
  const pageWrapperEdge = getPageWrapperInfo(pageBody)
  const systemSafeAreaInsets = getSystemSafeAreaInsets()
  return {
    top: Math.max(pageWrapperEdge.top, systemSafeAreaInsets.top),
    left: Math.max(pageWrapperEdge.left, systemSafeAreaInsets.left),
    right: Math.max(pageWrapperEdge.right, systemSafeAreaInsets.right),
    bottom: Math.max(pageWrapperEdge.bottom, systemSafeAreaInsets.bottom),
  }
}
