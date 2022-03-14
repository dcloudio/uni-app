// import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

// export default function parseComponent (vueComponentOptions) {
//   const componentOptions = parseBaseComponent(vueComponentOptions)
//   // 小红书小程序 lifetimes 存在兼容问题
//   const lifetimes = componentOptions.lifetimes
//   Object.keys(lifetimes).forEach(key => {
//     componentOptions[key] = lifetimes[key]
//   })
//   return componentOptions
// }

import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

import { isPage } from '../../../mp-weixin/runtime/wrapper/util'

import {
  fixSetDataStart,
  fixSetDataEnd
} from '../../../mp-weixin/runtime/wrapper/fix-set-data'

export default function parseComponent (vueComponentOptions) {
  const componentOptions = parseBaseComponent(vueComponentOptions)
  const oldAttached = componentOptions.lifetimes.attached
  componentOptions.lifetimes.attached = function attached () {
    // 暂不区分版本
    if (isPage.call(this)) {
      fixSetDataStart(this)
      setTimeout(() => {
        fixSetDataEnd(this)
      }, 0)
    }
    oldAttached.call(this)
  }
  return componentOptions
}
