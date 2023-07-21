import {
  NAVBAR_HEIGHT,
  TABBAR_HEIGHT
} from 'uni-helpers/constants'
import safeAreaInsets from 'safe-area-insets'

export default function getWindowOffset () {
  if (uni.canIUse('css.var')) {
    const style = document.documentElement.style
    const top = parseInt((style.getPropertyValue('--window-top').match(/\d+/) || ['0'])[0])
    const bottom = parseInt((style.getPropertyValue('--window-bottom').match(/\d+/) || ['0'])[0])
    const left = parseInt((style.getPropertyValue('--window-left').match(/\d+/) || ['0'])[0])
    const right = parseInt((style.getPropertyValue('--window-right').match(/\d+/) || ['0'])[0])
    const topWindowHeight = parseInt((style.getPropertyValue('--top-window-height').match(/\d+/) || ['0'])[0])
    return {
      top: (top ? (top + safeAreaInsets.top) : 0) + (topWindowHeight || 0),
      bottom: bottom ? (bottom + safeAreaInsets.bottom) : 0,
      left: left ? (left + safeAreaInsets.left) : 0,
      right: right ? (right + safeAreaInsets.right) : 0
    }
  }

  let top = 0
  let bottom = 0
  const pages = getCurrentPages()
  if (pages.length) {
    const pageVm = pages[pages.length - 1].$parent.$parent
    const navigationBarType = pageVm.navigationBar.type
    top = navigationBarType === 'default' || navigationBarType === 'float' ? NAVBAR_HEIGHT : 0
  }
  const app = getApp()
  if (app) {
    bottom = app.$children[0] && app.$children[0].showTabBar ? TABBAR_HEIGHT : 0
  }
  return {
    top,
    bottom,
    left: 0,
    right: 0
  }
}
