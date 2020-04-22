import {
  hasOwn
} from 'uni-shared'

import {
  TEMP_PATH
} from '../constants'

import {
  publish
} from '../../bridge'

let downloadTaskId = 0
const downloadTasks = {}

const publishStateChange = (res) => {
  publish('onDownloadTaskStateChange', res)
}

const createDownloadTaskById = function (downloadTaskId, {
  url,
  header
} = {}) {
  const downloader = plus.downloader.createDownload(url, {
    time: __uniConfig.networkTimeout.downloadFile ? __uniConfig.networkTimeout.downloadFile / 1000 : 120,
    filename: TEMP_PATH + '/download/',
    // 需要与其它平台上的表现保持一致，不走重试的逻辑。
    retry: 0,
    retryInterval: 0
  }, (download, statusCode) => {
    if (statusCode) {
      publishStateChange({
        downloadTaskId,
        state: 'success',
        tempFilePath: download.filename,
        statusCode
      })
    } else {
      publishStateChange({
        downloadTaskId,
        state: 'fail',
        statusCode
      })
    }
  })
  for (const name in header) {
    if (hasOwn(header, name)) {
      downloader.setRequestHeader(name, header[name])
    }
  }
  downloader.addEventListener('statechanged', (download, status) => {
    if (download.downloadedSize && download.totalSize) {
      publishStateChange({
        downloadTaskId,
        state: 'progressUpdate',
        progress: parseInt(download.downloadedSize / download.totalSize * 100),
        totalBytesWritten: download.downloadedSize,
        totalBytesExpectedToWrite: download.totalSize
      })
    }
  })
  downloadTasks[downloadTaskId] = downloader
  downloader.start()
  return {
    downloadTaskId,
    errMsg: 'createDownloadTask:ok'
  }
}

export function operateDownloadTask ({
  downloadTaskId,
  operationType
} = {}) {
  const downloadTask = downloadTasks[downloadTaskId]
  if (downloadTask && operationType === 'abort') {
    delete downloadTasks[downloadTaskId]
    downloadTask.abort()
    publishStateChange({
      downloadTaskId,
      state: 'fail',
      errMsg: 'abort'
    })
    return {
      errMsg: 'operateDownloadTask:ok'
    }
  }
  return {
    errMsg: 'operateDownloadTask:fail'
  }
}

export function createDownloadTask (args) {
  return createDownloadTaskById(++downloadTaskId, args)
}
