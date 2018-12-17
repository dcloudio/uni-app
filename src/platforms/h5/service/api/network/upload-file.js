import { urlToFile } from 'uni-platform/helpers/file'
/**
 * 上传任务
 */
class UploadTask {
  _xhr
  _isAbort
  _callbacks = []
  constructor (xhr, callbackId) {
    this._xhr = xhr
    this._callbackId = callbackId
  }
  /**
   * 监听上传进度
   * @param callback 回调
   */
  onProgressUpdate (callback) {
    if (typeof callback !== 'function') {
      return
    }
    this._callbacks.push(callback)
  }
  /**
   * 中断上传任务
   */
  abort () {
    this._isAbort = true
    if (this._xhr) {
      this._xhr.abort()
      delete this._xhr
    }
  }
}
/**
 * 上传文件
 * @param {*} param0
 * @param {*} callbackId
 * @return {UploadTask}
 */
export function uploadFile ({
  url,
  filePath,
  name,
  header,
  formData
}, callbackId) {
  var timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.uploadFile) || 60 * 1000
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  var uploadTask = new UploadTask(null, callbackId)

  function upload (file) {
    var xhr = new XMLHttpRequest()
    var form = new FormData()
    var timer
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key])
    })
    form.append(name, file, file.name || `file-${Date.now()}`)
    xhr.open('POST', url)
    Object.keys(header).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.upload.onprogress = function (event) {
      uploadTask._callbacks.forEach(callback => {
        var totalBytesSent = event.loaded
        var totalBytesExpectedToSend = event.total
        var progress = Math.round(totalBytesSent / totalBytesExpectedToSend * 100)
        callback({
          progress,
          totalBytesSent,
          totalBytesExpectedToSend
        })
      })
    }
    xhr.onerror = function () {
      clearTimeout(timer)
      invoke(callbackId, {
        errMsg: 'uploadFile:fail'
      })
    }
    xhr.onabort = function () {
      clearTimeout(timer)
      invoke(callbackId, {
        errMsg: 'uploadFile:fail abort'
      })
    }
    xhr.onload = function () {
      clearTimeout(timer)
      let statusCode = xhr.status
      invoke(callbackId, {
        errMsg: 'uploadFile:ok',
        statusCode,
        data: xhr.responseText || xhr.response
      })
    }
    if (!uploadTask._isAbort) {
      timer = setTimeout(function () {
        xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null
        uploadTask.abort()
        invoke(callbackId, {
          errMsg: 'uploadFile:fail timeout'
        })
      }, timeout)
      xhr.send(form)
      uploadTask._xhr = xhr
    } else {
      invoke(callbackId, {
        errMsg: 'uploadFile:fail abort'
      })
    }
  }

  urlToFile(filePath).then(upload).catch(() => {
    setTimeout(() => {
      invoke(callbackId, {
        errMsg: 'uploadFile:fail file error'
      })
    }, 0)
  })

  return uploadTask
}
