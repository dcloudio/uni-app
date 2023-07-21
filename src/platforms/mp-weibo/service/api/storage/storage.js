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
  } catch (error) { }
}

export function setStorage ({
  key,
  data
} = {}) {
  const type = typeof data
  const value = type === 'string' ? data : JSON.stringify({
    type,
    data: data
  })
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    return {
      errMsg: `setStorage:fail ${error}`
    }
  }
  return {
    errMsg: 'setStorage:ok'
  }
}

export function setStorageSync (key, data) {
  setStorage({
    key,
    data
  })
}

export function getStorage ({
  key
} = {}) {
  const value = localStorage && localStorage.getItem(key)
  if (typeof value !== 'string') {
    return {
      data: '',
      errMsg: 'getStorage:fail'
    }
  }
  let data = value
  try {
    const object = JSON.parse(value)
    const result = parseValue(object)
    if (result !== undefined) {
      data = result
    }
  } catch (error) { }
  return {
    data,
    errMsg: 'getStorage:ok'
  }
}

export function getStorageSync (key) {
  const res = getStorage({
    key
  })
  return res.data
}

export function removeStorage ({
  key
} = {}) {
  if (localStorage) {
    localStorage.removeItem(key)
  }
  return {
    errMsg: 'removeStorage:ok'
  }
}

export function removeStorageSync (key) {
  removeStorage({
    key
  })
}

export function clearStorage () {
  localStorage && localStorage.clear()
  return {
    errMsg: 'clearStorage:ok'
  }
}

export function clearStorageSync () {
  clearStorage()
}

export function getStorageInfo () {
  const length = (localStorage && localStorage.length) || 0
  const keys = []
  let currentSize = 0
  for (let index = 0; index < length; index++) {
    const key = localStorage.key(index)
    const value = localStorage.getItem(key)
    currentSize += key.length + value.length
    if (key !== STORAGE_KEYS) {
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
