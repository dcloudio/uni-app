export const dbSet = (name, value) => {
  let data = uni.getStorageSync('$$STAT__DBDATA') || {}
	if (!data) {
		data = {}
	}
	data[name] = value
	uni.setStorageSync('$$STAT__DBDATA', data)
}

export const dbGet = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA') || {}
  if (!data) {
  	data = {}
  }
	if (!data[name]) {
		return undefined
	}
	return data[name]
}

export const dbRemove = (name) => {
  let data = uni.getStorageSync('$$STAT__DBDATA') || {}
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
