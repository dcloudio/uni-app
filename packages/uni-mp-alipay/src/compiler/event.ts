import { camelize, capitalize } from '@vue/shared'
import { MiniProgramCompilerOptions } from '@dcloudio/uni-cli-shared'

export const event: MiniProgramCompilerOptions['event'] = {
  format(name, { isCatch, isComponent }) {
    if (!isComponent && name === 'click') {
      name = 'tap'
    }
    name = eventMap[name] || name
    return `${isCatch ? 'catch' : 'on'}${capitalize(camelize(name))}`
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
}
