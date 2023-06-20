import createMediaQueryObserver from '../../../mp-weixin/helpers/create-media-query-observer'
export {
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
}
  from 'uni-core/service/api/plugin/push'
export function requestPayment (params) {
  let parseError = false
  if (typeof params.orderInfo === 'string') {
    try {
      params.orderInfo = JSON.parse(params.orderInfo)
    } catch (e) {
      parseError = true
    }
  }
  if (parseError) {
    params.fail && params.fail({
      errMsg: 'requestPayment:fail 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo'
    })
  } else {
    swan.requestPolymerPayment(params)
  }
}

export function createIntersectionObserver (component, options) {
  if (options && options.observeAll) {
    options.selectAll = options.observeAll
    delete options.observeAll
  }
  return swan.createIntersectionObserver(component, options)
}

export function createVideoContext (videoId) {
  return swan.createVideoContext(videoId)
}

export {
  createMediaQueryObserver
}
