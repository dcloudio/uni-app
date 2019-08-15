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
  // 此处和微信平台一致查询不到去掉最后一个
  callbacks.splice(callbacks.indexOf(callbackId), 1)
}
