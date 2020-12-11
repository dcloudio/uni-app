import {
  fileToUrl,
  getFileName
} from 'uni-platform/helpers/file'
/**
 * 下载任务
 */
class DownloadTask {
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

  offProgressUpdate (callback) {
    const index = this._callbacks.indexOf(callback)
    if (index >= 0) {
      this._callbacks.splice(index, 1)
    }
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
  header,
  timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) || 60 * 1000
}, callbackId) {
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
    const statusCode = xhr.status
    const blob = this.response
    let filename
    // 使用 getResponseHeader 跨域时会出现警告，但相比 getAllResponseHeaders 更方便
    const contentDisposition = xhr.getResponseHeader('content-disposition')
    if (contentDisposition) {
      // 暂时仅解析 filename 不解析 filename*
      const res = contentDisposition.match(/filename="?(\S+)"?\b/)
      if (res) {
        filename = res[1]
      }
    }
    blob.name = filename || getFileName(url)
    invoke(callbackId, {
      errMsg: 'downloadFile:ok',
      statusCode,
      tempFilePath: fileToUrl(blob)
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
