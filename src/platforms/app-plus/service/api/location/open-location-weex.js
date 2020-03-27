import {
  showPage
} from '../page.js'

export function openLocation (data, callbackId) {
  showPage({
    url: '__uniappopenlocation',
    data,
    style: {
      titleNView: {
        type: 'transparent'
      },
      popGesture: 'close',
      backButtonAutoControl: 'close'
    },
    onClose() {
      invoke(callbackId, {
        errMsg: 'openLocation:fail cancel'
      })
    }
  })
  return {
    errMsg: 'openLocation:ok'
  }
}
