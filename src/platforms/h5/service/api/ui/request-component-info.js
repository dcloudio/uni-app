import createCallbacks from 'uni-helpers/callbacks'

const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo')

export function requestComponentInfo (pageInstance, queue, callback) {
  UniServiceJSBridge.publishHandler('requestComponentInfo', {
    reqId: requestComponentInfoCallbacks.push(callback),
    reqs: queue
  }, pageInstance.$page.id)
}
