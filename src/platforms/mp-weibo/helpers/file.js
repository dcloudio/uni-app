import {
  hasOwn
} from 'uni-shared'

/**
 * 暂存的文件对象
 */
const files = {}
/**
 * 从url读取File
 * @param {string} url
 * @param {boolean} local
 * @param {Promise}
 */
export function urlToFile (url, local) {
  var file = files[url]
  if (file) {
    return Promise.resolve(file)
  }
  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) {
    return Promise.resolve(base64ToFile(url))
  }
  if (local) {
    return Promise.reject(new Error('not find'))
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
 * base64转File
 * @param {string} base64
 * @return {File}
 */
export function base64ToFile (base64) {
  base64 = base64.split(',')
  var type = base64[0].match(/:(.*?);/)[1]
  var str = atob(base64[1])
  var n = str.length
  var array = new Uint8Array(n)
  while (n--) {
    array[n] = str.charCodeAt(n)
  }
  return blobToFile(array, type)
}
/**
 * 简易获取扩展名
 * @param {string} type
 * @return {string}
 */
function getExtname (type) {
  const extname = type.split('/')[1]
  return extname ? `.${extname}` : ''
}
/**
 * 简易获取文件名
 * @param {*} url
 */
export function getFileName (url) {
  url = url.split('#')[0].split('?')[0]
  const array = url.split('/')
  return array[array.length - 1]
}

/**
 * blob转File
 * @param {Blob} blob
 * @param {string} type
 * @return {File}
 */
export function blobToFile (blob, type) {
  if (!(blob instanceof File)) {
    type = type || blob.type || ''
    const filename = `${Date.now()}${getExtname(type)}`
    try {
      blob = new File([blob], filename, { type })
    } catch (error) {
      blob = blob instanceof Blob ? blob : new Blob([blob], { type })
      blob.name = blob.name || filename
    }
  }
  return blob
}
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} file
 * @return {string}
 */
export function fileToUrl (file) {
  for (const key in files) {
    if (hasOwn(files, key)) {
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

export function getSameOriginUrl (url) {
  const a = document.createElement('a')
  a.href = url
  if (a.origin === location.origin) {
    return Promise.resolve(url)
  }
  return urlToFile(url).then(fileToUrl)
}

export function revokeObjectURL (url) {
  (window.URL || window.webkitURL).revokeObjectURL(url)
  delete files[url]
}
