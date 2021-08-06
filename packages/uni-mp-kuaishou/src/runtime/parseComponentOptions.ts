import { extend } from '@vue/shared'
import { MPComponentInstance, MPComponentOptions } from '@dcloudio/uni-mp-core'
import * as baseParseOptions from '@dcloudio/uni-mp-weixin/src/runtime/parseOptions'
import {
  fixSetDataStart,
  fixSetDataEnd,
} from '@dcloudio/uni-mp-weixin/src/runtime/fixSetData'

export function parse(componentOptions: MPComponentOptions) {
  const oldAttached = componentOptions.lifetimes!.attached
  componentOptions.lifetimes!.attached = function attached() {
    // 暂不区分版本
    if (baseParseOptions.isPage(this as MPComponentInstance)) {
      // 解决快手小程序页面 attached 生命周期 setData 导致数据同步异常的问题
      fixSetDataStart(this as MPComponentInstance)
      setTimeout(() => {
        fixSetDataEnd(this as MPComponentInstance)
      }, 0)
    }
    oldAttached!.call(this)
  }
}

export default extend({}, baseParseOptions, {
  parse,
})
