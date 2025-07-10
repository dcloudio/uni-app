import { capitalize } from '@vue/shared'
import { customizeEvent } from '@dcloudio/uni-shared'
import type { MiniProgramCompilerOptions } from '@dcloudio/uni-cli-shared'

export const event: MiniProgramCompilerOptions['event'] = {
  format(name, { isCatch, isCapture, isComponent }) {
    if (!isComponent && name === 'click') {
      name = 'tap'
    }
    name = eventMap[name] || name
    // 处理支付宝支持捕获 https://opendocs.alipay.com/mini/framework/events#%E4%BA%8B%E4%BB%B6%E7%9A%84%E6%8D%95%E8%8E%B7%E9%98%B6%E6%AE%B5
    return `${isCapture ? 'capture-' : ''}${
      isCatch ? 'catch' : 'on'
    }${capitalize(customizeEvent(name))}`
  },
}

const eventMap: Record<string, string> = {
  touchstart: 'touchStart',
  touchmove: 'touchMove',
  touchend: 'touchEnd',
  touchcancel: 'touchCancel',
  longtap: 'longTap',
  longpress: 'longTap',
  transitionend: 'transitionEnd',
  animationstart: 'animationStart',
  animationiteration: 'animationIteration',
  animationend: 'animationEnd',
  firstappear: 'firstAppear',
  // map
  markertap: 'markerTap',
  callouttap: 'calloutTap',
  controltap: 'controlTap',
  regionchange: 'regionChange',
  paneltap: 'panelTap',
  // scroll-view
  scrolltoupper: 'scrollToUpper',
  scrolltolower: 'scrollToLower',
  // movable-view
  changeend: 'changeEnd',
  // video
  timeupdate: 'timeUpdate',
  waiting: 'loading',
  fullscreenchange: 'fullScreenChange',
  useraction: 'userAction',
  renderstart: 'renderStart',
  loadedmetadata: 'renderStart',
  // swiper
  animationfinish: 'animationEnd',
  chooseavatar: 'chooseAvatar',
}
