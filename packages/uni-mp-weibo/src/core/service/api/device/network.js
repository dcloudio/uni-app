import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

const callbacks = []

onMethod('onNetworkStatusChange', res => {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onNetworkStatusChange (callbackId) {
  callbacks.push(callbackId)
}

export function offNetworkStatusChange (callbackId) {
  // 暂不支持移除所有监听
  if (callbackId) {
    const index = callbacks.indexOf(callbackId)
    if (index >= 0) {
      callbacks.splice(index, 1)
    }
  }
}
