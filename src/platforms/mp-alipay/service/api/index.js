import {
  hasOwn
} from 'uni-shared'

export function setStorageSync (key, data) {
  return my.setStorageSync({
    key,
    data
  })
}
export function getStorageSync (key) {
  const result = my.getStorageSync({
    key
  })
  // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
  return result.data !== null ? result.data : ''
}
export function removeStorageSync (key) {
  return my.removeStorageSync({
    key
  })
}

export function startGyroscope (params) {
  if (hasOwn(params, 'interval')) {
    console.warn('支付宝小程序 startGyroscope暂不支持interval')
  }
  params.success && params.success({
    errMsg: 'startGyroscope:ok'
  })
  params.complete && params.complete({
    errMsg: 'startGyroscope:ok'
  })
}
