import { isArray, isFunction } from '@vue/shared'

import {
  defineTaskApi,
  API_UPLOAD_FILE,
  API_TYPE_UPLOAD_FILE,
  UploadFileProtocol,
  UploadFileOptions,
} from '@dcloudio/uni-api'
import { urlToFile, blobToFile } from '../../../helpers/file'
/**
 * 上传任务
 */
class UploadTask implements UniApp.UploadTask {
  _xhr?: XMLHttpRequest
  _isAbort?: boolean
  _callbacks: Function[] = []
  constructor(xhr?: XMLHttpRequest) {
    this._xhr = xhr
  }

  /**
   * 监听上传进度
   * @param callback 回调
   */
  onProgressUpdate(callback: (result: any) => void) {
    if (!isFunction(callback)) {
      return
    }
    this._callbacks.push(callback)
  }

  offProgressUpdate(callback: (result: any) => void) {
    const index = this._callbacks.indexOf(callback)
    if (index >= 0) {
      this._callbacks.splice(index, 1)
    }
  }

  /**
   * 中断上传任务
   */
  abort() {
    this._isAbort = true
    if (this._xhr) {
      this._xhr.abort()
      delete this._xhr
    }
  }
  onHeadersReceived(callback: (result: any) => void): void {
    throw new Error('Method not implemented.')
  }
  offHeadersReceived(callback: (result: any) => void): void {
    throw new Error('Method not implemented.')
  }
}

export const uploadFile = defineTaskApi<API_TYPE_UPLOAD_FILE>(
  API_UPLOAD_FILE,
  (
    {
      url,
      file,
      filePath,
      name,
      files,
      header,
      formData,
      timeout = __uniConfig.networkTimeout.uploadFile,
    },
    { resolve, reject }
  ) => {
    var uploadTask = new UploadTask()
    if (!isArray(files) || !files.length) {
      files = [
        {
          name,
          file,
          uri: filePath,
        },
      ]
    }
    function upload(realFiles: File[]) {
      var xhr = new XMLHttpRequest()
      var form = new FormData()
      var timer: ReturnType<typeof setTimeout>
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key])
      })
      Object.values(<File[]>files).forEach(({ name }, index) => {
        const file = realFiles[index]
        form.append(name || 'file', file, file.name || `file-${Date.now()}`)
      })
      xhr.open('POST', url)
      Object.keys(header).forEach((key) => {
        xhr.setRequestHeader(key, header[key])
      })
      xhr.upload.onprogress = function (event) {
        uploadTask._callbacks.forEach((callback) => {
          var totalBytesSent = event.loaded
          var totalBytesExpectedToSend = event.total
          var progress = Math.round(
            (totalBytesSent / totalBytesExpectedToSend) * 100
          )
          callback({
            progress,
            totalBytesSent,
            totalBytesExpectedToSend,
          })
        })
      }
      xhr.onerror = function () {
        clearTimeout(timer)
        reject()
      }
      xhr.onabort = function () {
        clearTimeout(timer)
        reject('abort')
      }
      xhr.onload = function () {
        clearTimeout(timer)
        const statusCode = xhr.status
        resolve({
          statusCode,
          data: xhr.responseText || xhr.response,
        })
      }
      if (!uploadTask._isAbort) {
        timer = setTimeout(function () {
          xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null
          uploadTask.abort()
          reject('timeout')
        }, timeout)
        xhr.send(form)
        uploadTask._xhr = xhr
      } else {
        reject('abort')
      }
    }

    Promise.all(
      files.map(({ file, uri }) =>
        file instanceof Blob
          ? Promise.resolve(blobToFile(file))
          : urlToFile(<string>uri)
      )
    )
      .then(upload)
      .catch(() => {
        setTimeout(() => {
          reject('file error')
        }, 0)
      })

    return uploadTask
  },
  UploadFileProtocol,
  UploadFileOptions
)
