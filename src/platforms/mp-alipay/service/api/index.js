export function setStorageSync (key, data) {
  return my.setStorageSync({
    key,
    data
  })
}
export function getStorageSync (key) {
  const result = my.getStorageSync({
    key
  })
  // 不知道会不会出现 success 为 false 情况，暂时这样处理下。
  if (result.success) {
    return result.data || ''
  } else {
    return ''
  }
}
export function removeStorageSync (key) {
  return my.removeStorageSync({
    key
  })
}
