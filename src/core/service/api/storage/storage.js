const STORAGE_DATA_TYPE = '__TYPE'
const STORAGE_KEYS = 'uni-storage-keys'

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
    // 兼容App端历史格式
    const type = localStorage.getItem(key + STORAGE_DATA_TYPE)
    if (!type) {
      const keys = Object.keys(object)
      if (keys.length === 2 && 'type' in object && 'data' in object) {
        data = object.data
      } else if (keys.length === 1 && 'type' in object) {
        data = ''
      }
    } else if (type !== 'String') {
      data = object
      data = typeof data === 'string' ? JSON.parse(data) : data
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
