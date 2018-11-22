export function setStorage ({
  key,
  data
} = {}) {
  let value = {
    type: typeof data === 'object' ? 'object' : 'string',
    data: data
  }
  localStorage.setItem(key, JSON.stringify(value))
  let keyList = localStorage.getItem('uni-storage-keys')
  if (!keyList) {
    localStorage.setItem('uni-storage-keys', JSON.stringify([key]))
  } else {
    let keys = JSON.parse(keyList)
    if (keys.indexOf(key) < 0) {
      keys.push(key)
      localStorage.setItem('uni-storage-keys', JSON.stringify(keys))
    }
  }
  return {
    errMsg: 'setStorage:ok'
  }
}

export function setStorageSync (key, data) {
  setStorage({ key, data })
}

export function getStorage ({
  key
} = {}) {
  let data = localStorage.getItem(key)
  return data ? {
    data: JSON.parse(data).data,
    errMsg: 'getStorage:ok'
  } : {
    data: '',
    errMsg: 'getStorage:fail'
  }
}

export function getStorageSync (key) {
  const res = getStorage({ key })
  return res.data
}

export function removeStorage ({
  key
} = {}) {
  let keyList = localStorage.getItem('uni-storage-keys')
  if (keyList) {
    let keys = JSON.parse(keyList)
    let index = keys.indexOf(key)
    keys.splice(index, 1)
    localStorage.setItem('uni-storage-keys', JSON.stringify(keys))
  }
  localStorage.removeItem(key)
  return {
    errMsg: 'removeStorage:ok'
  }
}

export function removeStorageSync (key) {
  removeStorage({ key })
}

export function clearStorage () {
  localStorage.clear()
  return {
    errMsg: 'clearStorage:ok'
  }
}
export function clearStorageSync () {
  clearStorage()
}

export function getStorageInfo () { // TODO 暂时先不做大小的转换
  let keyList = localStorage.getItem('uni-storage-keys')
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
