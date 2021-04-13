import { hasOwn } from '@vue/shared'

/**
 * 暂存的文件对象
 */
const files: { [key: string]: File } = {}
/**
 * 从url读取File
 * @param {string} url
 * @param {boolean} local
 * @param {Promise}
 */
export function urlToFile(url: string, local?: boolean): Promise<File> {
  const file = files[url]
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
    const xhr = new XMLHttpRequest()
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
export function base64ToFile(base64: string): File {
  const base64Array = base64.split(',')
  const res = base64Array[0].match(/:(.*?);/)
  const type = res ? res[1] : ''
  const str = atob(base64Array[1])
  let n = str.length
  const array = new Uint8Array(n)
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
function getExtname(type: string): string {
  const extname = type.split('/')[1]
  return extname ? `.${extname}` : ''
}
/**
 * 简易获取文件名
 * @param {string} url
 */
export function getFileName(url: string): string {
  url = url.split('#')[0].split('?')[0]
  const array = url.split('/')
  return array[array.length - 1]
}
interface FileLike extends Blob {
  name?: string
}
/**
 * blob转File
 * @param {Blob} blob
 * @param {string} type
 * @return {File}
 */
export function blobToFile(
  blob: Blob | Uint8Array | File,
  type?: string
): File {
  let file: File | FileLike
  if (blob instanceof File) {
    file = blob
  } else {
    type = type || (<Blob>blob).type || ''
    const filename = `${Date.now()}${getExtname(type)}`
    try {
      file = new File([blob], filename, { type })
    } catch (error) {
      blob = blob instanceof Blob ? blob : new Blob([blob], { type })
      file = <FileLike>blob
      file.name = file.name || filename
    }
  }
  return <File>file
}
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} file
 * @return {string}
 */
export function fileToUrl(file: Blob | File): string {
  for (const key in files) {
    if (hasOwn(files, key)) {
      const oldFile = files[key]
      if (oldFile === file) {
        return key
      }
    }
  }
  var url = (window.URL || window.webkitURL).createObjectURL(file)
  files[url] = <File>file
  return url
}

export function getSameOriginUrl(url: string): Promise<string> {
  const a = document.createElement('a')
  a.href = url
  if (a.origin === location.origin) {
    return Promise.resolve(url)
  }
  return urlToFile(url).then(fileToUrl)
}

export function revokeObjectURL(url: string): void {
  const URL = window.URL || window.webkitURL
  URL.revokeObjectURL(url)
  delete files[url]
}
