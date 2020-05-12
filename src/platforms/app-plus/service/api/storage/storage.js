import {
  invoke
} from '../../bridge'

const STORAGE_DATA_TYPE = '__TYPE'
const STORAGE_KEYS = 'uni-storage-keys'

function parseValue (value) {
  const types = ['object', 'string', 'number', 'boolean', 'undefined']
  try {
    const object = typeof value === 'string' ? JSON.parse(value) : value
    const type = object.type
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object)
      if (keys.length === 2 && 'data' in object) {
        // eslint-disable-next-line valid-typeof
        if (typeof object.data === type) {
          return object.data
        }
        // eslint-disable-next-line no-useless-escape
        if (type === 'object' && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) {
          // ISO 8601 格式返回 Date
          return new Date(object.data)
        }
      } else if (keys.length === 1) {
        return ''
      }
    }
  } catch (error) {}
}

export function setStorage ({
  key,
  data,
  isSync
} = {}, callbackId) {
  const type = typeof data
  const value = type === 'string' ? data : JSON.stringify({
    type,
    data: data
  })
  try {
    if (type === 'string' && parseValue(value) !== undefined) {
      plus.storage.setItemAsync(key + STORAGE_DATA_TYPE, type)
    } else {
      plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE)
    }
    plus.storage.setItemAsync(key, value, function () {
      invoke(callbackId, {
        errMsg: 'setStorage:ok'
      })
    }, function (err) {
      invoke(callbackId, {
        errMsg: `setStorage:fail ${err.message}`
      })
    })
  } catch (error) {
    invoke(callbackId, {
      errMsg: `setStorage:fail ${error}`
    })
  }
}

export function setStorageSync (key, data) {
  const type = typeof data
  const value = type === 'string' ? data : JSON.stringify({
    type,
    data: data
  })
  try {
    if (type === 'string' && parseValue(value) !== undefined) {
      plus.storage.setItem(key + STORAGE_DATA_TYPE, type)
    } else {
      plus.storage.removeItem(key + STORAGE_DATA_TYPE)
    }
    plus.storage.setItem(key, value)
  } catch (error) {

  }
}

function parseGetStorage (type, value) {
  let data = value
  if (type !== 'string' || (type === 'string' && value === '{"type":"undefined"}')) {
    try {
      // 兼容H5和V3初期历史格式
      let object = JSON.parse(value)
      const result = parseValue(object)
      if (result !== undefined) {
        data = result
      } else if (type) {
        // 兼容App端历史格式
        data = object
        if (typeof object === 'string') {
          object = JSON.parse(object)
          // eslint-disable-next-line valid-typeof
          data = typeof object === (type === 'null' ? 'object' : type) ? object : data
        }
      }
    } catch (error) {}
  }
  return data
}

export function getStorage ({
  key
} = {}, callbackId) {
  plus.storage.getItemAsync(key, function (res) {
    plus.storage.getItemAsync(key + STORAGE_DATA_TYPE, function (typeRes) {
      const typeOrigin = typeRes.data || ''
      const type = typeOrigin.toLowerCase()
      invoke(callbackId, {
        data: parseGetStorage(type, res.data),
        errMsg: 'getStorage:ok'
      })
    }, function () {
      const type = ''
      invoke(callbackId, {
        data: parseGetStorage(type, res.data),
        errMsg: 'getStorage:ok'
      })
    })
  }, function (err) {
    invoke(callbackId, {
      data: '',
      errMsg: `getStorage:fail ${err.message}`
    })
  })
}

export function getStorageSync (key) {
  const value = plus.storage.getItem(key)
  const typeOrigin = plus.storage.getItem(key + STORAGE_DATA_TYPE) || ''
  const type = typeOrigin.toLowerCase()
  if (typeof value !== 'string') {
    return ''
  }
  return parseGetStorage(type, value)
}

export function removeStorage ({
  key
} = {}, callbackId) {
  // 兼容App端历史格式
  plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE)
  plus.storage.removeItemAsync(key, function (res) {
    invoke(callbackId, {
      errMsg: 'removeStorage:ok'
    })
  }, function (err) {
    invoke(callbackId, {
      errMsg: `removeStorage:fail ${err.message}`
    })
  })
}

export function removeStorageSync (key) {
  plus.storage.removeItem(key + STORAGE_DATA_TYPE)
  plus.storage.removeItem(key)
}

export function clearStorage (args, callbackId) {
  plus.storage.clearAsync(function (res) {
    invoke(callbackId, {
      errMsg: 'clearStorage:ok'
    })
  }, function (err) {
    invoke(callbackId, {
      errMsg: `clearStorage:fail ${err.message}`
    })
  })
}

export function clearStorageSync () {
  plus.storage.clear()
}

export function getStorageInfo () {
  const length = (plus.storage.length || plus.storage.getLength()) || 0
  const keys = []
  let currentSize = 0
  for (let index = 0; index < length; index++) {
    const key = plus.storage.key(index)
    if (key !== STORAGE_KEYS && key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !== key.length) {
      const value = plus.storage.getItem(key)
      currentSize += key.length + value.length
      keys.push(key)
    }
  }
  return {
    keys,
    currentSize: Math.ceil(currentSize * 2 / 1024),
    limitSize: Number.MAX_VALUE,
    errMsg: 'getStorageInfo:ok'
  }
}

export function getStorageInfoSync () {
  const res = getStorageInfo()
  delete res.errMsg
  return res
}
