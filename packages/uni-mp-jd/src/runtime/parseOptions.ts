import { extend } from '@vue/shared'

import { MPComponentInstance } from '@dcloudio/uni-mp-core'

import * as baseParseOptions from '@dcloudio/uni-mp-weixin/src/runtime/parseOptions'

function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  // 兼容triggerEvent
  // @ts-ignore
  mpInstance._triggerEvent('__l', detail)
}

export default extend({}, baseParseOptions, {
  initRelation,
})
