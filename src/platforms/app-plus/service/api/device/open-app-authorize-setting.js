import {
  invoke
} from '../../bridge'

export function openAppAuthorizeSetting (options, callbackId) {
  const { openAppAuthorizeSetting } = weex.requireModule('plus')
  openAppAuthorizeSetting(ret => {
    if (ret.type === 'success') {
      invoke(callbackId, {
        errMsg: 'getClipboardData:ok'
      })
    } else {
      invoke(callbackId, {
        errMsg: 'getClipboardData:fail'
      })
    }
  })
}
