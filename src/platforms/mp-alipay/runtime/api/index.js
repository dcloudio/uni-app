import {
  isFn,
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

function createExecCallback (execCallback) {
  return function wrapperExecCallback (res) {
    this.actions.forEach((action, index) => {
      (action._$callbacks || []).forEach(callback => {
        callback(res[index])
      })
    })
    execCallback(res)
  }
}

function addCallback (callback) {
  if (isFn(callback)) {
    const action = this.actions[this.actions.length - 1]
    if (action) {
      (action._$callbacks || (action._$callbacks = [])).push(callback)
    }
  }
}

export function createSelectorQuery () {
  const query = my.createSelectorQuery()

  const oldExec = query.exec
  const oldScrollOffset = query.scrollOffset
  const oldBoundingClientRect = query.boundingClientRect
  query.exec = function exec (callback) {
    return oldExec.call(this, createExecCallback(callback).bind(this))
  }
  query.scrollOffset = function scrollOffset (callback) {
    const ret = oldScrollOffset.call(this)
    addCallback.call(this, callback)
    return ret
  }
  query.boundingClientRect = function boundingClientRect (callback) {
    const ret = oldBoundingClientRect.call(this)
    addCallback.call(this, callback)
    return ret
  }

  if (!query.fields) {
    query.fields = function ({ rect, size, scrollOffset } = {}, callback) {
      if (rect || size) {
        this.boundingClientRect()
      }
      if (scrollOffset) {
        this.scrollOffset()
      }
      addCallback.call(this, callback)
      return this
    }
  }
  return query
}
