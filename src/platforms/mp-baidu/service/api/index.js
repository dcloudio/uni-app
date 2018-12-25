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
    params.fail({
      errMsg: 'requestPayment:fail: 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo'
    })
  } else {
    swan.requestPolymerPayment(params)
  }
}
