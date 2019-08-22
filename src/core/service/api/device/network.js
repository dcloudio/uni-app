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
