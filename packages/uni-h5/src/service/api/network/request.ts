import { hasOwn, isString } from '@vue/shared'
import {
  API_REQUEST,
  type API_TYPE_REQUEST,
  RequestOptions,
  RequestProtocol,
  defineTaskApi,
} from '@dcloudio/uni-api'
import { LINEFEED } from '@dcloudio/uni-shared'
import type { RequestFail } from '@dcloudio/uni-app-x/types/uni'

export const request = defineTaskApi<API_TYPE_REQUEST>(
  API_REQUEST,
  (
    {
      url,
      data,
      header = {},
      method,
      dataType,
      responseType,
      withCredentials,
      timeout = __uniConfig.networkTimeout.request,
    },
    { resolve, reject }
  ) => {
    if (__X__) {
      timeout = timeout == null ? __uniConfig.networkTimeout.request : timeout
    }
    let body: string | ArrayBuffer | null = null
    // 根据请求类型处理数据
    const contentType = normalizeContentType(header)
    if (method !== 'GET') {
      if (isString(data) || data instanceof ArrayBuffer) {
        body = data
      } else {
        if (contentType === 'json') {
          try {
            body = JSON.stringify(data)
          } catch (error) {
            body = data!.toString()
          }
        } else if (contentType === 'urlencoded') {
          const bodyArray: string[] = []
          for (const key in data) {
            if (hasOwn(data, key)) {
              bodyArray.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
              )
            }
          }
          body = bodyArray.join('&')
        } else {
          body = data!.toString()
        }
      }
    }
    const xhr = new XMLHttpRequest()
    const requestTask = new RequestTask(xhr)
    xhr.open(method!, url)
    for (const key in header) {
      if (hasOwn(header, key)) {
        xhr.setRequestHeader(key, header[key])
      }
    }

    const timer = setTimeout(function () {
      xhr.onload = xhr.onabort = xhr.onerror = null
      requestTask.abort()
      reject<Partial<RequestFail>>('timeout', { errCode: 5 })
    }, timeout)
    xhr.responseType = responseType as 'arraybuffer' | 'text'
    xhr.onload = function () {
      clearTimeout(timer)
      const statusCode = xhr.status
      let res = responseType === 'text' ? xhr.responseText : xhr.response
      if (responseType === 'text' && dataType === 'json') {
        try {
          //#if _X_
          // @ts-expect-error
          res = UTS.JSON.parse(res)
          //#else
          res = JSON.parse(res)
          //#endif
        } catch (error) {
          // 和微信一致解析失败不抛出错误
          // invoke(callbackId, {
          //   errMsg: 'request:fail json parse error'
          // })
          // return
        }
      }
      resolve({
        data: res,
        statusCode,
        header: parseHeaders(xhr.getAllResponseHeaders()),
        cookies: [],
      })
    }
    xhr.onabort = function () {
      clearTimeout(timer)
      reject<Partial<RequestFail>>('abort', { errCode: 600003 })
    }
    xhr.onerror = function () {
      clearTimeout(timer)
      reject<Partial<RequestFail>>(undefined, { errCode: 5 })
    }
    xhr.withCredentials = withCredentials!
    xhr.send(body)
    return requestTask
  },
  RequestProtocol,
  RequestOptions
)

function normalizeContentType(header: Record<string, string>) {
  const name = Object.keys(header).find(
    (name) => name.toLowerCase() === 'content-type'
  )
  if (!name) {
    return
  }
  const contentType = header[name]
  //#if _NODE_JS_
  // xmlhttprequest 不能正确识别 content-type
  if (name !== 'Content-Type') {
    header['Content-Type'] = header[name]
    delete header[name]
  }
  //#endif
  if (contentType.indexOf('application/json') === 0) {
    return 'json'
  } else if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
    return 'urlencoded'
  }
  return 'string'
}

/**
 * 请求任务类
 */
class RequestTask implements UniApp.RequestTask {
  private _xhr?: XMLHttpRequest
  constructor(xhr: XMLHttpRequest) {
    this._xhr = xhr
  }
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
 * 解析响应头
 * @param {string} headers
 * @return {object}
 */
function parseHeaders(headers: string) {
  const headersObject: Record<string, string> = {}
  headers.split(LINEFEED).forEach((header) => {
    const find = header.match(/(\S+\s*):\s*(.*)/)
    if (!find || find.length !== 3) {
      return
    }
    headersObject[find[1]] = find[2]
  })
  return headersObject
}
