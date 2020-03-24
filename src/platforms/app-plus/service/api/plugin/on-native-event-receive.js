import {
  invoke
} from 'uni-core/service/bridge'

const callbacks = []
// 不使用uni-core/service/platform中的onMethod，避免循环引用
UniServiceJSBridge.on('api.uniMPNativeEvent', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res.event, res.data)
  })
})

export function onNativeEventReceive (callbackId) {
  callbacks.push(callbackId)
}
