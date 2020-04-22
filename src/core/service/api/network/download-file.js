import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

class DownloadTask {
  constructor (downloadTaskId, callbackId) {
    this.id = downloadTaskId
    this._callbackId = callbackId
    this._callbacks = []
  }

  abort () {
    invokeMethod('operateRequestTask', {
      downloadTaskId: this.id,
      operationType: 'abort'
    })
  }

  onProgressUpdate (callback) {
    if (typeof callback !== 'function') {
      return
    }
    this._callbacks.push(callback)
  }

  onHeadersReceived () {

  }

  offProgressUpdate (callback) {
    const index = this._callbacks.indexOf(callback)
    if (index >= 0) {
      this._callbacks.splice(index, 1)
    }
  }

  offHeadersReceived () {

  }
}
const downloadTasks = Object.create(null)
onMethod('onDownloadTaskStateChange', ({
  downloadTaskId,
  state,
  tempFilePath,
  statusCode,
  progress,
  totalBytesWritten,
  totalBytesExpectedToWrite,
  errMsg
}) => {
  const downloadTask = downloadTasks[downloadTaskId]
  const callbackId = downloadTask._callbackId

  switch (state) {
    case 'progressUpdate':
      downloadTask._callbacks.forEach(callback => {
        callback({
          progress,
          totalBytesWritten,
          totalBytesExpectedToWrite
        })
      })
      break
    case 'success':
      invoke(callbackId, {
        tempFilePath,
        statusCode,
        errMsg: 'request:ok'
      })
      // eslint-disable-next-line no-fallthrough
    case 'fail':
      invoke(callbackId, {
        errMsg: 'request:fail ' + errMsg
      })
      // eslint-disable-next-line no-fallthrough
    default:
      // progressUpdate 可能晚于 success
      setTimeout(() => {
        delete downloadTasks[downloadTaskId]
      }, 100)
      break
  }
})
export function downloadFile (args, callbackId) {
  const {
    downloadTaskId
  } = invokeMethod('createDownloadTask', args)
  const task = new DownloadTask(downloadTaskId, callbackId)
  downloadTasks[downloadTaskId] = task
  return task
}
