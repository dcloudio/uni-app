const STORAGE_DATA_TYPE = '__TYPE'
const STORAGE_KEYS = 'uni-storage-keys'

function parseValue (value) {
  const types = ['object', 'string', 'number', 'boolean', 'undefined']
  try {
    const object = typeof value === 'string' ? JSON.parse(value) : value
    const type = object.type
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object)
      // eslint-disable-next-line valid-typeof
      if (keys.length === 2 && 'data' in object && typeof object.data === type) {
        return object.data
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
    if (type === 'string' && parseValue(value) !== undefined) {
      localStorage.setItem(key + STORAGE_DATA_TYPE, type)
    } else {
      localStorage.removeItem(key + STORAGE_DATA_TYPE)
    }
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
  const typeOrigin = localStorage.getItem(key + STORAGE_DATA_TYPE) || ''
  const type = typeOrigin.toLowerCase()
  if (type !== 'string' || (typeOrigin === 'String' && value === '{"type":"undefined"}')) {
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
    } catch (error) { }
  }
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
    // 兼容App端历史格式
    localStorage.removeItem(key + STORAGE_DATA_TYPE)
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
  const length = (localStorage && (localStorage.length || localStorage.getLength())) || 0
  const keys = []
  let currentSize = 0
  for (let index = 0; index < length; index++) {
    const key = localStorage.key(index)
    if (key !== STORAGE_KEYS && key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !== key.length) {
      const value = localStorage.getItem(key)
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
