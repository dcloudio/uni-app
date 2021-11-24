import {
  invoke
} from '../../bridge'

import {
  sendNativeEvent
} from './send-native-event.js'
export const sendHostEvent = sendNativeEvent

export function navigateToMiniProgram (data, callbackId) {
  sendHostEvent(
    'navigateToUniMP',
    data,
    (res) => {
      if (res.errMsg && res.errMsg.indexOf(':ok') === -1) {
        return invoke(callbackId, {
          errMsg: res.errMsg
        })
      }
      invoke(callbackId, {
        errMsg: 'navigateToMiniProgram:ok'
      })
    }
  )
}
