import http from '@ohos.net.http'
import {
  type API_TYPE_UPLOAD_FILE,
  API_UPLOAD_FILE,
  UploadFileOptions,
  UploadFileProtocol,
  defineTaskApi,
} from '@dcloudio/uni-api'
import { hasOwn } from '@vue/shared'
import { getRealPath } from '@dcloudio/uni-platform'
import { Emitter } from '@dcloudio/uni-shared'

interface IUploadTask {
  abort: Function
  onHeadersReceived: Function
  offHeadersReceived: Function
  onProgressUpdate: Function
  offProgressUpdate: Function
}

class UploadTask implements UniApp.UploadTask {
  private _uploadTask: IUploadTask
  constructor(uploadTask: IUploadTask) {
    this._uploadTask = uploadTask
  }

  abort() {
    this._uploadTask.abort()
  }

  onProgressUpdate(callback: Function) {
    this._uploadTask.onProgressUpdate(callback)
  }

  offProgressUpdate(callback?: Function) {
    this._uploadTask.offProgressUpdate(callback)
  }

  onHeadersReceived(callback: Function) {
    this._uploadTask.onHeadersReceived(callback)
  }

  offHeadersReceived(callback?: Function) {
    this._uploadTask.offHeadersReceived(callback)
  }
}

export const uploadFile = defineTaskApi<API_TYPE_UPLOAD_FILE>(
  API_UPLOAD_FILE,
  (args, { resolve, reject }) => {
    let { url, timeout, header, formData, files, filePath, name } = args

    // header
    const headers = {} as Record<string, any>
    for (const name in header) {
      headers[name.toLowerCase()] = header[name]
    }
    headers['Content-Type'] = 'multipart/form-data'

    const multiFormDataList = [] as Array<http.MultiFormData>
    for (const name in formData) {
      if (hasOwn(formData, name)) {
        multiFormDataList.push({
          name,
          contentType: 'text/plain',
          data: String(formData[name]),
        })
      }
    }
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const { name, uri } = files[i]
        multiFormDataList.push({
          name: name || 'file',
          contentType: 'application/octet-stream', // TODO 根据文件后缀设置contentType
          filePath: getRealPath(uri!),
        })
      }
    } else {
      multiFormDataList.push({
        name: name || 'file',
        contentType: 'application/octet-stream', // TODO 根据文件后缀设置contentType
        filePath: getRealPath(filePath!),
      })
    }

    const httpRequest = http.createHttp()
    const emitter = new Emitter()
    const uploadTask: IUploadTask = {
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
    httpRequest.on('dataSendProgress', ({ sendSize, totalSize }) => {
      emitter.emit('progress', {
        progress: Math.floor((sendSize / totalSize) * 100),
        totalBytesSent: sendSize,
        totalBytesExpectedToSend: totalSize,
      })
    })
    httpRequest.request(
      url,
      {
        header: headers,
        method: http.RequestMethod.POST,
        connectTimeout: timeout, // 不支持仅设置一个timeout
        readTimeout: timeout,
        multiFormDataList,
        expectDataType: http.HttpDataType.STRING,
      },
      (err, res) => {
        if (err) {
          /**
           * TODO abort后此处收到如下错误，待确认是否直接将此错误码转为abort错误
           * {"code":2300023,"message":"Failed writing received data to disk/application"}
           */
          reject(err.message)
        } else {
          resolve({
            data: res.result as string,
            statusCode: res.responseCode,
          })
        }
        uploadTask.offHeadersReceived()
        uploadTask.offProgressUpdate()
        httpRequest.destroy() // 调用完毕后必须调用destroy方法
      }
    )
    return new UploadTask(uploadTask)
  },
  UploadFileProtocol,
  UploadFileOptions
)
