const appid = process.env.UNI_APP_ID // 做应用隔离
export const dbSet = (name, value) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {}

  if (!data) {
    data = {}
  }
  data[name] = value
  uni.setStorageSync('$$STAT__DBDATA:'+appid, data)
}

export const dbGet = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {}
  if (!data[name]) {
    let dbdata = uni.getStorageSync('$$STAT__DBDATA:'+appid)
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
  let data = uni.getStorageSync('$$STAT__DBDATA:'+appid) || {}
  if (data[name]) {
    delete data[name]
    uni.setStorageSync('$$STAT__DBDATA:'+appid, data)
  } else {
    data = uni.getStorageSync('$$STAT__DBDATA:'+appid)
    if (data[name]) {
      delete data[name]
      uni.setStorageSync('$$STAT__DBDATA:'+appid, data)
    }
  }
}
