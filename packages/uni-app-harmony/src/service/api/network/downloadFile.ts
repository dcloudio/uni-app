import { getEnv } from '../../../platform/env'

import http from '@ohos.net.http'
import fs from '@ohos.file.fs'
import {
  API_DOWNLOAD_FILE,
  type API_TYPE_DOWNLOAD_FILE,
  DownloadFileOptions,
  DownloadFileProtocol,
  defineTaskApi,
} from '@dcloudio/uni-api'
import { Emitter } from '@dcloudio/uni-shared'

interface IDownloadTask {
  abort: Function
  onHeadersReceived: Function
  offHeadersReceived: Function
  onProgressUpdate: Function
  offProgressUpdate: Function
}

class DownloadTask implements UniApp.DownloadTask {
  private _downloadTask: IDownloadTask
  constructor(downloadTask: IDownloadTask) {
    this._downloadTask = downloadTask
  }

  abort() {
    this._downloadTask.abort()
  }

  onProgressUpdate(callback: Function) {
    this._downloadTask.onProgressUpdate(callback)
  }

  offProgressUpdate(callback?: Function) {
    this._downloadTask.offProgressUpdate(callback)
  }

  onHeadersReceived(callback: Function) {
    this._downloadTask.onHeadersReceived(callback)
  }

  offHeadersReceived(callback?: Function) {
    this._downloadTask.offHeadersReceived(callback)
  }
}

export const downloadFile = defineTaskApi<API_TYPE_DOWNLOAD_FILE>(
  API_DOWNLOAD_FILE,
  (args, { resolve, reject }) => {
    let { url, timeout, header } = args

    const httpRequest = http.createHttp()
    const emitter = new Emitter()
    const downloadTask: IDownloadTask = {
      abort() {
        httpRequest.destroy()
      },
      onHeadersReceived(callback: Function) {
        emitter.on('headersReceive', callback)
      },
      offHeadersReceived(callback?: Function) {
        emitter.off('headersReceive', callback)
      },
      onProgressUpdate(callback: Function) {
        emitter.on('progress', callback)
      },
      offProgressUpdate(callback?: Function) {
        emitter.off('progress', callback)
      },
    }

    httpRequest.on('headersReceive', (header: Object) => {
      // TODO headersReceive在重定向时会多次触发，这点与微信不同，暂不支持回调给用户
      // emitter.emit('headersReceive', header);
    })
    httpRequest.on('dataReceiveProgress', ({ receiveSize, totalSize }) => {
      emitter.emit('progress', {
        progress: Math.floor((receiveSize / totalSize) * 100),
        totalBytesWritten: receiveSize,
        totalBytesExpectedToWrite: totalSize,
      })
    })
    const { TEMP_PATH } = getEnv()
    const tempFilePath = TEMP_PATH + '/download/' + Date.now() + '.tmp' // TODO 正在咨询有无内置mimeType，目前无法根据content-type获取文件后缀
    const stream = fs.createStreamSync(tempFilePath, 'w+')

    let writePromise = Promise.resolve(0)
    async function queueWrite(data: ArrayBuffer): Promise<number> {
      writePromise = writePromise.then(async (total) => {
        const length = await stream.write(data)
        return total + length
      })
      return writePromise
    }

    httpRequest.on('dataReceive', (data) => {
      queueWrite(data)
    })
    httpRequest.requestInStream(
      url,
      {
        header,
        method: http.RequestMethod.GET,
        connectTimeout: timeout, // 不支持仅设置一个timeout
        readTimeout: timeout,
      },
      (err, statusCode) => {
        // 此回调先于dataEnd回调执行
        if (err) {
          /**
           * TODO abort后此处收到如下错误，待确认是否直接将此错误码转为abort错误
           * {"code":2300023,"message":"Failed writing received data to disk/application"}
           */
          reject(err.message)
        } else {
          writePromise.then(() => {
            stream.flushSync()
            stream.closeSync()
            resolve({
              tempFilePath,
              statusCode,
            })
          })
        }
        downloadTask.offHeadersReceived()
        downloadTask.offProgressUpdate()
        httpRequest.destroy() // 调用完毕后必须调用destroy方法
      }
    )
    return new DownloadTask(downloadTask)
  },
  DownloadFileProtocol,
  DownloadFileOptions
)
