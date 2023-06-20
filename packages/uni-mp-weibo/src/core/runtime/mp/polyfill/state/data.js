import {
  isFn,
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  proxy
} from './proxy'

import {
  SOURCE_KEY
} from '../../constants'

function setDataByExprPath (exprPath, value, data) {
  const keys = exprPath.replace(/\[(\d+?)\]/g, '.$1').split('.')
  keys.reduce((obj, key, idx) => {
    if (idx === keys.length - 1) {
      obj[key] = value
    } else {
      if (typeof obj[key] === 'undefined') {
        obj[key] = {}
      }
      return obj[key]
    }
  }, data)
  return keys.length === 1
}

export function setData (data, callback) {
  if (!isPlainObject(data)) {
    return
  }
  Object.keys(data).forEach(key => {
    if (setDataByExprPath(key, data[key], this.data)) {
      !hasOwn(this, key) && proxy(this, SOURCE_KEY, key)
    }
  })
  this.$forceUpdate()
  isFn(callback) && this.$nextTick(callback)
}
