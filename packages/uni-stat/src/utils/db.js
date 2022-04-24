let data = uni.getStorageSync('$$STAT__DBDATA') || {}
export const dbSet = (name, value) => {
  if (!data) {
    data = {}
  }
  data[name] = value
  uni.setStorageSync('$$STAT__DBDATA', data)
}

export const dbGet = (name) => {
  if (!data[name]) {
    let dbdata = uni.getStorageSync('$$STAT__DBDATA')
    if (!dbdata) {
      dbdata = {}
    }
    if (!dbdata[name]) {
      return undefined
    }
    data[name] = dbdata[name]
  }
  return data[name]
}

export const dbRemove = (name) => {
  if (data[name]) {
    delete data[name]
    uni.setStorageSync('$$STAT__DBDATA', data)
  } else {
    data = uni.getStorageSync('$$STAT__DBDATA')
    if (data[name]) {
      delete data[name]
      uni.setStorageSync('$$STAT__DBDATA', data)
    }
  }
}
