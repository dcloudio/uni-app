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
      // 解决快手小程序页面 attached 生命周期 setData 导致数据同步异常的问题
      fixSetDataStart(this)
      setTimeout(() => {
        fixSetDataEnd(this)
      }, 0)
    }
    oldAttached.call(this)
  }
  return componentOptions
}
