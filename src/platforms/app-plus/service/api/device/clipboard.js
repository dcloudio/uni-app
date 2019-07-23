import {
  invoke
} from '../../bridge'

export function getClipboardData (options, callbackId) {
  const clipboard = weex.requireModule('clipboard')
  clipboard.getString(ret => {
    if (ret.result === 'success') {
      invoke(callbackId, {
        data: ret.data,
        errMsg: 'getClipboardData:ok'
      })
    } else {
      invoke(callbackId, {
        data: ret.result,
        errMsg: 'getClipboardData:fail'
      })
    }
  })
}

export function setClipboardData ({
  data
}) {
  const clipboard = weex.requireModule('clipboard')
  clipboard.setString(data)
  return {
    errMsg: 'setClipboardData:ok'
  }
}
