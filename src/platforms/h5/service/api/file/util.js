/**
 * 暂存的文件对象
 */
const files = {}
/**
 * 从url读取File
 * @param {string} url
 * @param {Promise}
 */
export function urlToFile (url) {
  var file = files[url]
  if (file) {
    return Promise.resolve(file)
  }
  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) {
    return Promise.resolve(base64ToBlob(url))
  }
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      resolve(this.response)
    }
    xhr.onerror = reject
    xhr.send()
  })
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
 * @param {Blob|File} file
 * @return {string}
 */
export function fileToUrl (file) {
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const oldFile = files[key]
      if (oldFile === file) {
        return key
      }
    }
  }
  var url = (window.URL || window.webkitURL).createObjectURL(file)
  files[url] = file
  return url
}
