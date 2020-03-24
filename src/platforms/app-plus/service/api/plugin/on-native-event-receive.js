import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from 'uni-core/service/platform'

const callbacks = []

onMethod('uniMPNativeEvent', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res.event, res.data)
  })
})

export function onNativeEventReceive (callbackId) {
  callbacks.push(callbackId)
}
