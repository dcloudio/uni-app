import createCallbacks from 'uni-helpers/callbacks'
import {
  checkInWindows
} from 'uni-helpers/windows'

const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo')

export function requestComponentInfo (pageVm, queue, callback) {
  UniServiceJSBridge.publishHandler('requestComponentInfo', {
    reqId: requestComponentInfoCallbacks.push(callback),
    reqs: queue
  }, checkInWindows(pageVm) ? pageVm : pageVm.$page.id)
}
