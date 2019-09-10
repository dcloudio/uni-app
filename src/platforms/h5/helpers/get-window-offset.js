import {
  NAVBAR_HEIGHT,
  TABBAR_HEIGHT
} from 'uni-helpers/constants'

export default function getWindowOffset () {
  if (uni.canIUse('css.var')) {
    const style = document.documentElement.style
    return {
      top: parseInt(style.getPropertyValue('--window-top')) || 0,
      bottom: parseInt(style.getPropertyValue('--window-bottom')) || 0
    }
  }

  let top = 0
  let bottom = 0
  const pages = getCurrentPages()
  if (pages.length) {
    const pageVm = pages[pages.length - 1].$parent.$parent
    top = pageVm.showNavigationBar && (pageVm.navigationBar.type !== 'transparent' || pageVm.navigationBar.type !== 'alwaysTransparent') ? NAVBAR_HEIGHT : 0
  }
  const app = getApp()
  if (app) {
    bottom = app.$children[0] && app.$children[0].showTabBar ? TABBAR_HEIGHT : 0
  }
  return {
    top,
    bottom
  }
}
