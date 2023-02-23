import {
  defineTaskApi,
  API_UPLOAD_FILE,
  API_TYPE_UPLOAD_FILE,
  UploadFileProtocol,
  UploadFileOptions,
} from '@dcloudio/uni-api'
import { hasOwn, isFunction } from '@vue/shared'
import { getRealPath } from '@dcloudio/uni-platform'

type Uploader = ReturnType<typeof plus.uploader.createUpload>

class UploadTask implements UniApp.UploadTask {
  private _uploader: Uploader
  private _callbacks: Function[] = []
  constructor(uploader: Uploader) {
    this._uploader = uploader
    uploader.addEventListener('statechanged', (upload, status) => {
      if (upload.uploadedSize && upload.totalSize) {
        this._callbacks.forEach((callback) => {
          callback({
            progress: parseInt(
              String((upload.uploadedSize! / upload.totalSize!) * 100)
            ),
            totalBytesSent: upload.uploadedSize,
            totalBytesExpectedToSend: upload.totalSize,
          })
        })
      }
    })
  }

  abort() {
    this._uploader.abort()
  }

  onProgressUpdate(callback: Function) {
    if (!isFunction(callback)) {
      return
    }
    this._callbacks.push(callback)
  }

  onHeadersReceived() {}

  offProgressUpdate(callback: Function) {
    const index = this._callbacks.indexOf(callback)
    if (index >= 0) {
      this._callbacks.splice(index, 1)
    }
  }

  offHeadersReceived() {}
}

export const uploadFile = defineTaskApi<API_TYPE_UPLOAD_FILE>(
  API_UPLOAD_FILE,
  (
    { url, timeout, header, formData, files, filePath, name },
    { resolve, reject }
  ) => {
    timeout =
      (timeout ||
        (__uniConfig.networkTimeout && __uniConfig.networkTimeout.uploadFile) ||
        60 * 1000) / 1000
    const uploader = plus.uploader.createUpload(
      url,
      {
        timeout,
        // 需要与其它平台上的表现保持一致，不走重试的逻辑。
        retry: 0,
        retryInterval: 0,
      },
      (upload, statusCode) => {
        if (statusCode) {
          resolve({
            data: upload.responseText!,
            statusCode,
          })
        } else {
          reject(`statusCode: ${statusCode}`)
        }
      }
    )

    for (const name in header) {
      if (hasOwn(header, name)) {
        uploader.setRequestHeader(name, String(header[name]))
      }
    }
    for (const name in formData) {
      if (hasOwn(formData, name)) {
        uploader.addData(name, String(formData[name]))
      }
    }
    if (files && files.length) {
      files.forEach((file) => {
        uploader.addFile(getRealPath(file.uri!), {
          key: file.name || 'file',
        })
      })
    } else {
      uploader.addFile(getRealPath(filePath!), {
        key: name,
      })
    }

    const uploadFileTask = new UploadTask(uploader)

    uploader.start()
    return uploadFileTask
  },
  UploadFileProtocol,
  UploadFileOptions
)
