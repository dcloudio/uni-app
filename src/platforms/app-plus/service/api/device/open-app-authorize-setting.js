import {
  invoke
} from '../../bridge'

export function openAppAuthorizeSetting (options, callbackId) {
  const { openAppAuthorizeSetting } = weex.requireModule('plus')
  openAppAuthorizeSetting(ret => {
    if (ret.type === 'success') {
      invoke(callbackId, {
        errMsg: 'openAppAuthorizeSetting:ok'
      })
    } else {
      invoke(callbackId, {
        errMsg: 'openAppAuthorizeSetting:fail'
      })
    }
  })
}
