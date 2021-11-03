import { extend } from '@vue/shared'
import { handleEvent, MPComponentOptions } from '@dcloudio/uni-mp-core'
import * as baseParseOptions from '@dcloudio/uni-mp-weixin/src/runtime/parseOptions'

export function parse(pageOptions: MPComponentOptions) {
  // 快手小程序自定义组件，不支持绑定动态事件，故由 __e 分发
  pageOptions.methods!.__e = handleEvent
}

export default extend({}, baseParseOptions, {
  parse,
})
