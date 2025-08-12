import { extend } from '@vue/shared'

import {
  type MPComponentInstance,
  type MPComponentOptions,
  handleEvent,
} from '@dcloudio/uni-mp-core'

import * as baseParseOptions from '@dcloudio/uni-mp-weixin/src/runtime/parseOptions'

export function parse(pageOptions: MPComponentOptions) {
  // 京东小程序 input 事件不支持动态事件，故由 __e 分发
  pageOptions.methods!.__e = handleEvent
}

function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  // 兼容triggerEvent
  // @ts-expect-error
  mpInstance._triggerEvent('__l', detail)
}

export default extend({}, baseParseOptions, {
  initRelation,
  parse,
})
