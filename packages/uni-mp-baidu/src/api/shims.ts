import { isString } from '@vue/shared'
import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['baidu'],
  share: ['baidu'],
  payment: ['baidu'],
  push: ['baidu'],
})

export function requestPayment(params: UniApp.RequestPaymentOptions) {
  let parseError = false
  if (isString(params.orderInfo)) {
    try {
      params.orderInfo = JSON.parse(params.orderInfo)
    } catch (e) {
      parseError = true
    }
  }
  if (parseError) {
    params.fail &&
      params.fail({
        errMsg:
          'requestPayment:fail: 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo',
      })
  } else {
    swan.requestPolymerPayment(params)
  }
}
export function createIntersectionObserver(
  component: any,
  options: UniApp.CreateIntersectionObserverOptions
) {
  if (options && options.observeAll) {
    ;(options as any).selectAll = options.observeAll
    delete options.observeAll
  }
  return (swan as any).createIntersectionObserver(component, options)
}

export function createVideoContext(videoId: string) {
  return swan.createVideoContext(videoId)
}
