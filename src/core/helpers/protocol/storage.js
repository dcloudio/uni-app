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
