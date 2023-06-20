import clipboard from '@system.clipboard'

import {
  invoke
} from '../../bridge'

export function getClipboardData (options, callbackId) {
  clipboard.get({
    success: (ret) => {
      invoke(callbackId, {
        data: ret.text,
        errMsg: 'getClipboardData:ok'
      })
    },
    fail: (data, code) => {
      invoke(callbackId, {
        data: code,
        errMsg: 'getClipboardData:fail'
      })
    }
  })
}

export function setClipboardData ({
  data
}) {
  clipboard.set({
    text: data
  })
  return {
    errMsg: 'setClipboardData:ok'
  }
}
