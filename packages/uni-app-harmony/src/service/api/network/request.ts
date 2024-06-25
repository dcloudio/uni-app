import http from '@ohos.net.http'
import { isPlainObject } from '@vue/shared'
import {
  API_REQUEST,
  type API_TYPE_REQUEST,
  RequestOptions,
  RequestProtocol,
  defineTaskApi,
} from '@dcloudio/uni-api'
import { Emitter } from '@dcloudio/uni-shared'

// copy from uni-app-plus/src/service/api/network/request.ts
const cookiesParse = (header: Record<string, string>) => {
  let cookiesStr = header['Set-Cookie'] || header['set-cookie']
  let cookiesArr: string[] = []
  if (!cookiesStr) {
    return []
  }
  if (cookiesStr[0] === '[' && cookiesStr[cookiesStr.length - 1] === ']') {
    cookiesStr = cookiesStr.slice(1, -1)
  }
  const handleCookiesArr = cookiesStr.split(';')
  for (let i = 0; i < handleCookiesArr.length; i++) {
    if (
      handleCookiesArr[i].indexOf('Expires=') !== -1 ||
      handleCookiesArr[i].indexOf('expires=') !== -1
    ) {
      cookiesArr.push(handleCookiesArr[i].replace(',', ''))
    } else {
      cookiesArr.push(handleCookiesArr[i])
    }
  }
  cookiesArr = cookiesArr.join(';').split(',')

  return cookiesArr
}

interface IRequestTask {
  abort: Function
  onHeadersReceived: Function
  offHeadersReceived: Function
}

class RequestTask implements UniApp.RequestTask {
  private _requestTask: IRequestTask
  constructor(requestTask: IRequestTask) {
    this._requestTask = requestTask
  }
  abort() {
    this._requestTask.abort()
  }
  onHeadersReceived(callback: Function) {
    this._requestTask.onHeadersReceived(callback)
  }
  offHeadersReceived(callback?: Function) {
    this._requestTask.offHeadersReceived(callback)
  }
}

export const request = defineTaskApi<API_TYPE_REQUEST>(
  API_REQUEST,
  (args, { resolve, reject }) => {
    let { header, method, data, dataType, timeout, url, responseType } = args

    let contentType

    // header
    const headers = {} as Record<string, any>
    for (const name in header) {
      if (name.toLowerCase() === 'content-type') {
        contentType = header[name]
      }
      headers[name.toLowerCase()] = header[name]
    }
    if (!contentType && method === 'POST') {
      headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8'
    }

    // url data
    if (method === 'GET' && data && isPlainObject(data)) {
      url +=
        '?' +
        Object.keys(data)
          .map((key) => {
            return (
              encodeURIComponent(key) +
              '=' +
              encodeURIComponent((data as Object)[key])
            )
          })
          .join('&')
      data = undefined
    } else if (
      method !== 'GET' &&
      contentType &&
      contentType.indexOf('application/json') === 0 &&
      isPlainObject(data)
    ) {
      data = JSON.stringify(data)
    } else if (
      method !== 'GET' &&
      contentType &&
      contentType.indexOf('application/x-www-form-urlencoded') === 0 &&
      isPlainObject(data)
    ) {
      data = Object.keys(data)
        .map((key) => {
          return (
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent((data as Object)[key])
          )
        })
        .join('&')
    }

    // 其他参数
    let expectDataType: http.HttpDataType = http.HttpDataType.STRING
    if (responseType === 'arraybuffer') {
      expectDataType = http.HttpDataType.ARRAY_BUFFER
    } else if (dataType === 'json') {
      expectDataType = http.HttpDataType.OBJECT
    } else {
      expectDataType = http.HttpDataType.STRING
    }

    const httpRequest = http.createHttp()
    const emitter = new Emitter()
    const requestTask = {
      abort() {
        httpRequest.destroy()
      },
      onHeadersReceived(callback: Function) {
        emitter.on('headersReceive', callback)
      },
      offHeadersReceived(callback?: Function) {
        emitter.off('headersReceive', callback)
      },
    }

    httpRequest.on('headersReceive', (header: Object) => {
      // TODO headersReceive在重定向时会多次触发，这点与微信不同，暂不支持回调给用户
      // emitter.emit('headersReceive', header);
    })
    httpRequest.request(
      url,
      {
        header: headers,
        method: (method || 'GET').toUpperCase() as http.RequestMethod, // 仅OPTIONS不支持
        extraData: data,
        expectDataType,
        connectTimeout: timeout, // 不支持仅设置一个timeout
        readTimeout: timeout,
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
            data: res.result,
            statusCode: res.responseCode,
            header: res.header,
            cookies: cookiesParse(res.header as Record<string, any>),
          })
        }
        requestTask.offHeadersReceived()
        httpRequest.destroy() // 调用完毕后必须调用destroy方法
      }
    )
    return new RequestTask(requestTask)
  },
  RequestProtocol,
  RequestOptions
)
