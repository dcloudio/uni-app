export const getStorage = {
  'key': {
    type: String,
    required: true
  }
}

export const getStorageSync = [{
  name: 'key',
  type: String,
  required: true
}]

export const setStorage = {
  'key': {
    type: String,
    required: true
  },
  'data': {
    required: true
  }
}

export const setStorageSync = [{
  name: 'key',
  type: String,
  required: true
}, {
  name: 'data',
  required: true
}]

export const removeStorage = getStorage
export const removeStorageSync = getStorageSync
