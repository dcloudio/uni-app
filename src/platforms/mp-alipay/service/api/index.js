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
  // 不知道会不会出现 success 为 false 情况，暂时这样处理下。
  if (result.success) {
    return result.data || ''
  } else {
    return ''
  }
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
