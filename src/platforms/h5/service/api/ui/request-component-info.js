import createCallbacks from 'uni-helpers/callbacks'

const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo')

export function requestComponentInfo (pageVm, queue, callback) {
  UniServiceJSBridge.publishHandler('requestComponentInfo', {
    reqId: requestComponentInfoCallbacks.push(callback),
    reqs: queue
  }, pageVm.$page.id)
}
