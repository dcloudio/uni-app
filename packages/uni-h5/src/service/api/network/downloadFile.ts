import { isFunction } from '@vue/shared'
import {
  defineTaskApi,
  API_DOWNLOAD_FILE,
  API_TYPE_DOWNLOAD_FILE,
  DownloadFileProtocol,
  DownloadFileOptions,
} from '@dcloudio/uni-api'
import { fileToUrl, getFileName } from '../../../helpers/file'
/**
 * 下载任务
 */
class DownloadTask implements UniApp.DownloadTask {
  private _xhr?: XMLHttpRequest
  _callbacks: Function[] = []
  constructor(xhr: XMLHttpRequest) {
    this._xhr = xhr
  }

  /**
   * 监听下载进度
   * @param {Function} callback 回调
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
   * 停止任务
   */
  abort() {
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
/**
 * 下载文件
 * @param {*} param0
 * @param {string} callbackId
 * @return {DownloadTask}
 */
export const downloadFile = defineTaskApi<API_TYPE_DOWNLOAD_FILE>(
  API_DOWNLOAD_FILE,
  (
    { url, header, timeout = __uniConfig.networkTimeout.downloadFile },
    { resolve, reject }
  ) => {
    var timer: ReturnType<typeof setTimeout>
    var xhr = new XMLHttpRequest()
    var downloadTask = new DownloadTask(xhr)
    xhr.open('GET', url, true)
    Object.keys(header).forEach((key) => {
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
      resolve({
        statusCode,
        tempFilePath: fileToUrl(blob),
      })
    }
    xhr.onabort = function () {
      clearTimeout(timer)
      reject('abort')
    }
    xhr.onerror = function () {
      clearTimeout(timer)
      reject()
    }
    xhr.onprogress = function (event) {
      downloadTask._callbacks.forEach((callback) => {
        var totalBytesWritten = event.loaded
        var totalBytesExpectedToWrite = event.total
        var progress = Math.round(
          (totalBytesWritten / totalBytesExpectedToWrite) * 100
        )
        callback({
          progress,
          totalBytesWritten,
          totalBytesExpectedToWrite,
        })
      })
    }
    xhr.send()
    timer = setTimeout(function () {
      xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null
      downloadTask.abort()
      reject('timeout')
    }, timeout)
    return downloadTask
  },
  DownloadFileProtocol,
  DownloadFileOptions
)
