function getStorageHolder () {
  if (__PLATFORM__ === 'h5') {
    return localStorage
  }
  return plus.storage
}

export function setStorage ({
  key,
  data
} = {}) {
  const storageHolder = getStorageHolder()
  const value = {
    type: typeof data === 'object' ? 'object' : 'string',
    data: data
  }
  storageHolder.setItem(key, JSON.stringify(value))
  const keyList = storageHolder.getItem('uni-storage-keys')
  if (!keyList) {
    storageHolder.setItem('uni-storage-keys', JSON.stringify([key]))
  } else {
    const keys = JSON.parse(keyList)
    if (keys.indexOf(key) < 0) {
      keys.push(key)
      storageHolder.setItem('uni-storage-keys', JSON.stringify(keys))
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
  const data = getStorageHolder().getItem(key)
  return data ? {
    data: JSON.parse(data).data,
    errMsg: 'getStorage:ok'
  } : {
    data: '',
    errMsg: 'getStorage:fail'
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
  const storageHolder = getStorageHolder()
  const keyList = storageHolder.getItem('uni-storage-keys')
  if (keyList) {
    const keys = JSON.parse(keyList)
    const index = keys.indexOf(key)
    keys.splice(index, 1)
    storageHolder.setItem('uni-storage-keys', JSON.stringify(keys))
  }
  storageHolder.removeItem(key)
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
  getStorageHolder().clear()
  return {
    errMsg: 'clearStorage:ok'
  }
}

export function clearStorageSync () {
  clearStorage()
}

export function getStorageInfo () { // TODO 暂时先不做大小的转换
  const keyList = getStorageHolder().getItem('uni-storage-keys')
  return keyList ? {
    keys: JSON.parse(keyList),
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:ok'
  } : {
    keys: '',
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:fail'
  }
}

export function getStorageInfoSync () {
  const res = getStorageInfo()
  delete res.errMsg
  return res
}
