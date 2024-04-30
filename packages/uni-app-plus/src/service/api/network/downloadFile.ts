import { TEMP_PATH } from '../constants'
import { hasOwn, isFunction } from '@vue/shared'
import {
  API_DOWNLOAD_FILE,
  type API_TYPE_DOWNLOAD_FILE,
  DownloadFileOptions,
  DownloadFileProtocol,
  defineTaskApi,
} from '@dcloudio/uni-api'

type Downloader = ReturnType<typeof plus.downloader.createDownload>

class DownloadTask implements UniApp.DownloadTask {
  private _downloader: Downloader
  private _callbacks: Function[] = []
  constructor(downloader: Downloader) {
    this._downloader = downloader
    downloader.addEventListener('statechanged', (download, status) => {
      if (download.downloadedSize && download.totalSize) {
        this._callbacks.forEach((callback) => {
          callback({
            progress: Math.round(
              (download.downloadedSize! / download.totalSize!) * 100
            ),
            totalBytesWritten: download.downloadedSize,
            totalBytesExpectedToWrite: download.totalSize,
          })
        })
      }
    })
  }
  abort() {
    this._downloader.abort()
  }
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
  onHeadersReceived(callback: (result: any) => void): void {
    throw new Error('Method not implemented.')
  }
  offHeadersReceived(callback: (result: any) => void): void {
    throw new Error('Method not implemented.')
  }
}

export const downloadFile = defineTaskApi<API_TYPE_DOWNLOAD_FILE>(
  API_DOWNLOAD_FILE,
  ({ url, header, timeout }, { resolve, reject }) => {
    timeout =
      (timeout ||
        (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) ||
        60 * 1000) / 1000
    const downloader = plus.downloader.createDownload(
      url,
      {
        timeout,
        filename: TEMP_PATH + '/download/',
        // 需要与其它平台上的表现保持一致，不走重试的逻辑。
        retry: 0,
        retryInterval: 0,
      },
      (download, statusCode) => {
        if (statusCode) {
          resolve({
            tempFilePath: download.filename!,
            statusCode,
          })
        } else {
          reject(`statusCode: ${statusCode}`)
        }
      }
    )
    const downloadTask = new DownloadTask(downloader)
    for (const name in header) {
      if (hasOwn(header, name)) {
        downloader.setRequestHeader(name, header[name])
      }
    }
    downloader.start()
    return downloadTask
  },
  DownloadFileProtocol,
  DownloadFileOptions
)
