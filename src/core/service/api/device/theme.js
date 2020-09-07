import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

const callbacks = []

onMethod('onThemeChange', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onThemeChange (callbackId) {
  callbacks.push(callbackId)
}

// 旧版本 API，后期文档更新后考虑移除
onMethod('onUIStyleChange', function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onUIStyleChange (callbackId) {
  callbacks.push(callbackId)
  console.log('API uni.onUIStyleChange 已过时，请使用 uni.onThemeChange，详情：https://uniapp.dcloud.net.cn/api/system/theme')
}
