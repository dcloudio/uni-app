import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

const callbacks = []
onMethod('onViewDidResize', res => {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onWindowResize (callbackId) {
  callbacks.push(callbackId)
}

export function offWindowResize (callbackId) {
  // TODO 目前 on 和 off 即使传入同一个 function，获取到的 callbackId 也不会一致，导致不能 off 掉指定
  // 后续修复
  // 此处和微信平台一致查询不到去掉最后一个
  callbacks.splice(callbacks.indexOf(callbackId), 1)
}
