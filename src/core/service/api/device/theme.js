import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

import {
  ON_THEME_CHANGE
} from 'uni-helpers/constants'

const callbacks = []
const oldCallbacks = []

onMethod(ON_THEME_CHANGE, function (res) {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onThemeChange (callbackId) {
  callbacks.push(callbackId)
}

export function offThemeChange (callbackId) {
  // 暂不支持移除所有监听
  if (callbackId) {
    const index = callbacks.indexOf(callbackId)
    if (index >= 0) {
      callbacks.splice(index, 1)
    }
  }
}

// 旧版本 API，后期文档更新后考虑移除
onMethod('onUIStyleChange', function (res) {
  oldCallbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onUIStyleChange (callbackId) {
  oldCallbacks.push(callbackId)
  console.warn('The "uni.onUIStyleChange" API is deprecated, please use "uni.onThemeChange". Learn more: https://uniapp.dcloud.net.cn/api/system/theme.')
}
