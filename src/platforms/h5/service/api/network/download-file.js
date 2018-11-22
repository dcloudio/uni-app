import { blobToUrl } from '../file/util'
/**
 * 下载任务
 */
export class DownloadTask {
  _xhr
  _callbacks = []
  constructor (xhr) {
    this._xhr = xhr
  }
  /**
   * 监听下载进度
   * @param {Function} callback 回调
   */
  onProgressUpdate (callback) {
    if (typeof callback !== 'function') {
      return
    }
    this._callbacks.push(callback)
  }
  /**
   * 停止任务
   */
  abort () {
    if (this._xhr) {
      this._xhr.abort()
      delete this._xhr
    }
  }
}
/**
 * 下载文件
 * @param {*} param0
 * @param {string} callbackId
 * @return {DownloadTask}
 */
export function downloadFile ({
  url,
  header
}, callbackId) {
  var timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.downloadFile) || 60 * 1000
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  var timer
  var xhr = new XMLHttpRequest()
  var downloadTask = new DownloadTask(xhr)
  xhr.open('GET', url, true)
  Object.keys(header).forEach(key => {
    xhr.setRequestHeader(key, header[key])
  })
  xhr.responseType = 'blob'
  xhr.onload = function () {
    clearTimeout(timer)
    let statusCode = xhr.status
    let blob = this.response
    invoke(callbackId, {
      errMsg: 'downloadFile:ok',
      statusCode,
      tempFilePath: blobToUrl(blob)
    })
  }
  xhr.onabort = function () {
    clearTimeout(timer)
    invoke(callbackId, {
      errMsg: 'downloadFile:fail abort'
    })
  }
  xhr.onerror = function () {
    clearTimeout(timer)
    invoke(callbackId, {
      errMsg: 'downloadFile:fail'
    })
  }
  xhr.onprogress = function (event) {
    downloadTask._callbacks.forEach(callback => {
      var totalBytesWritten = event.loaded
      var totalBytesExpectedToWrite = event.total
      var progress = Math.round(totalBytesWritten / totalBytesExpectedToWrite * 100)
      callback({
        progress,
        totalBytesWritten,
        totalBytesExpectedToWrite
      })
    })
  }
  xhr.send()
  timer = setTimeout(function () {
    xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null
    downloadTask.abort()
    invoke(callbackId, {
      errMsg: 'downloadFile:fail timeout'
    })
  }, timeout)
  return downloadTask
}
