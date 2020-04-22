import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

class UploadTask {
  constructor (uploadTaskId, callbackId) {
    this.id = uploadTaskId
    this._callbackId = callbackId
    this._callbacks = []
  }

  abort () {
    invokeMethod('operateRequestTask', {
      uploadTaskId: this.id,
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
const uploadTasks = Object.create(null)
onMethod('onUploadTaskStateChange', ({
  uploadTaskId,
  state,
  data,
  statusCode,
  progress,
  totalBytesSent,
  totalBytesExpectedToSend,
  errMsg
}) => {
  const uploadTask = uploadTasks[uploadTaskId]
  const callbackId = uploadTask._callbackId

  switch (state) {
    case 'progressUpdate':
      uploadTask._callbacks.forEach(callback => {
        callback({
          progress,
          totalBytesSent,
          totalBytesExpectedToSend
        })
      })
      break
    case 'success':
      invoke(callbackId, {
        data,
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
        delete uploadTasks[uploadTaskId]
      }, 100)
      break
  }
})
export function uploadFile (args, callbackId) {
  const {
    uploadTaskId
  } = invokeMethod('createUploadTask', args)
  const task = new UploadTask(uploadTaskId, callbackId)
  uploadTasks[uploadTaskId] = task
  return task
}
