/**
 * 从url读取Blob
 * @param {string} url
 * @param {Function} success
 * @param {Function} error
 */
export function urlToBlob (url, success, error) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    success(this.response)
  }
  xhr.onerror = error
  xhr.send()
}
/**
 * base64转Blob
 * @param {string} base64
 * @return {Blob}
 */
export function base64ToBlob (base64) {
  base64 = base64.split(',')
  var type = base64[0].match(/:(.*?);/)[1]
  var str = atob(base64[1])
  var n = str.length
  var array = new Uint8Array(n)
  while (n--) {
    array[n] = str.charCodeAt(n)
  }
  return new Blob([array], { type: type })
}
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} blob
 * @return {string}
 */
export function blobToUrl (blob) {
  return (window.URL || window.webkitURL).createObjectURL(blob)
}
