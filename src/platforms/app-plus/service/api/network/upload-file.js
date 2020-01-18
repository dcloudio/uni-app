import {
  getRealPath
} from '../util'

import {
  publish
} from '../../bridge'

let uploadTaskId = 0
const uploadTasks = {}

const publishStateChange = (res) => {
  publish('onUploadTaskStateChange', res)
}

const createUploadTaskById = function (uploadTaskId, {
  url,
  filePath,
  name,
  files,
  header,
  formData
} = {}) {
  const uploader = plus.uploader.createUpload(url, {
    timeout: __uniConfig.networkTimeout.uploadFile ? __uniConfig.networkTimeout.uploadFile / 1000 : 120,
    // 需要与其它平台上的表现保持一致，不走重试的逻辑。
    retry: 0,
    retryInterval: 0
  }, (upload, statusCode) => {
    if (statusCode) {
      publishStateChange({
        uploadTaskId,
        state: 'success',
        data: upload.responseText,
        statusCode
      })
    } else {
      publishStateChange({
        uploadTaskId,
        state: 'fail',
        data: '',
        statusCode
      })
    }
    delete uploadTasks[uploadTaskId]
  })

  for (const name in header) {
    if (header.hasOwnProperty(name)) {
      uploader.setRequestHeader(name, header[name])
    }
  }
  for (const name in formData) {
    if (formData.hasOwnProperty(name)) {
      uploader.addData(name, String(formData[name]))
    }
  }
  if (files && files.length) {
    files.forEach(file => {
      uploader.addFile(getRealPath(file.uri), {
        key: file.name || 'file'
      })
    })
  } else {
    uploader.addFile(getRealPath(filePath), {
      key: name
    })
  }
  uploader.addEventListener('statechanged', (upload, status) => {
    if (upload.uploadedSize && upload.totalSize) {
      publishStateChange({
        uploadTaskId,
        state: 'progressUpdate',
        progress: parseInt(upload.uploadedSize / upload.totalSize * 100),
        totalBytesSent: upload.uploadedSize,
        totalBytesExpectedToSend: upload.totalSize
      })
    }
  })
  uploadTasks[uploadTaskId] = uploader
  uploader.start()
  return {
    uploadTaskId,
    errMsg: 'createUploadTask:ok'
  }
}

export function operateUploadTask ({
  uploadTaskId,
  operationType
} = {}) {
  const uploadTask = uploadTasks[uploadTaskId]
  if (uploadTask && operationType === 'abort') {
    delete uploadTasks[uploadTaskId]
    uploadTask.abort()
    publishStateChange({
      uploadTaskId,
      state: 'fail',
      errMsg: 'abort'
    })
    return {
      errMsg: 'operateUploadTask:ok'
    }
  }
  return {
    errMsg: 'operateUploadTask:fail'
  }
}

export function createUploadTask (args) {
  return createUploadTaskById(++uploadTaskId, args)
}
