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
import { Emitter } from '@dcloudio/uni-shared'

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
      enableChunked,
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
    let requestTask: RequestTask
    if (!enableChunked) {
      const xhr = new XMLHttpRequest()
      requestTask = new RequestTask(xhr)
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
        if (responseType === 'text') {
          res = parseResponseText(res, responseType, dataType)
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
    } else {
      /**
       * chunk模式需要返回ArrayBuffer，而XHR设置只能在onProgress内responseType设为arraybuffer并不能在onprogress内获取到xhr.response
       * 如果设置responseType为text，onprogress内xhr.response为string，只能改用fetch实现
       */
      if (
        typeof window.fetch === undefined ||
        typeof window.AbortController === undefined
      ) {
        throw new Error(
          'fetch or AbortController is not supported in this environment'
        )
      }
      const controller = new AbortController()
      const signal = controller.signal
      requestTask = new RequestTask(controller)
      const fetchOptions: RequestInit = {
        method,
        headers: header,
        body,
        signal,
        credentials: withCredentials ? 'include' : 'same-origin',
      }
      const timer = setTimeout(function () {
        requestTask.abort()
        reject<Partial<RequestFail>>('timeout', { errCode: 5 })
      }, timeout)
      fetchOptions.signal!.addEventListener('abort', function () {
        clearTimeout(timer)
        reject<Partial<RequestFail>>('abort', { errCode: 600003 })
      })
      window.fetch(url, fetchOptions).then(
        (response) => {
          const statusCode = response.status
          const header = response.headers
          const body = response.body
          const headerObj: Record<string, string> = {}
          header.forEach((value, key) => {
            headerObj[key] = value
          })
          const cookies = cookiesParse(headerObj)

          requestTask._emitter.emit('headersReceived', {
            header: headerObj,
            statusCode,
            cookies,
          })
          if (!body) {
            resolve({
              data: '',
              statusCode,
              header: headerObj,
              cookies,
            })
            return
          }
          const reader = body.getReader()
          const bodyBuffers = [] as Uint8Array[]

          const streamReaderRead = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                const result = concatArrayBuffers(bodyBuffers)
                let res =
                  responseType === 'text'
                    ? new TextDecoder().decode(result)
                    : result
                if (responseType === 'text') {
                  res = parseResponseText(res, responseType, dataType)
                }
                resolve({
                  data: res,
                  statusCode,
                  header: headerObj,
                  cookies,
                })
                return
              }
              const chunk = value
              bodyBuffers.push(chunk)
              requestTask._emitter.emit('chunkReceived', {
                data: chunk,
              })
              streamReaderRead()
            })
          }
          streamReaderRead()
        },
        (error) => {
          reject<Partial<RequestFail>>(error, { errCode: 5 })
        }
      )
    }
    return requestTask
  },
  RequestProtocol,
  RequestOptions
)

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

function concatArrayBuffers(buffers) {
  // 计算总长度
  const totalLength = buffers.reduce((acc, buf) => acc + buf.byteLength, 0)
  // 创建新Buffer和视图
  const result = new Uint8Array(totalLength)
  let offset = 0
  // 逐个复制
  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  }
  return result.buffer // 返回合并后的ArrayBuffer
}

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

export interface RequestTaskOnChunkReceivedListenerResult {
  /** 返回的chunk buffer */
  data: ArrayBuffer
}
export type RequestTaskOnChunkReceivedCallback = (
  result: RequestTaskOnChunkReceivedListenerResult
) => void

export interface RequestTaskOnHeadersReceivedListenerResult {
  /** 开发者服务器返回的 cookies，格式为字符串数组 */
  cookies: string[]
  /** 开发者服务器返回的 HTTP Response Header */
  header: UTSJSONObject
  /** 开发者服务器返回的 HTTP 状态码 （目前开发者工具上不会返回 statusCode 字段，可用真机查看该字段，后续将会支持） */
  statusCode: number
}
/** HTTP Response Header 事件的监听函数 */
export type RequestTaskOnHeadersReceivedCallback = (
  result: RequestTaskOnHeadersReceivedListenerResult
) => void

interface RequestController {
  abort: () => void
}

/**
 * 请求任务类
 */
class RequestTask implements UniApp.RequestTask {
  private _controller?: RequestController
  private _requestOnChunkReceiveCallbackId: number = 0
  private _requestOnChunkReceiveCallbacks: Map<
    number,
    RequestTaskOnChunkReceivedCallback
  > = new Map()
  private _requestOnHeadersReceiveCallbackId: number = 0
  private _requestOnHeadersReceiveCallbacks: Map<
    number,
    RequestTaskOnHeadersReceivedCallback
  > = new Map()
  _emitter = new Emitter()
  constructor(controller: RequestController) {
    this._controller = controller
  }
  abort() {
    if (this._controller) {
      this._controller.abort()
      delete this._controller
    }
  }
  onHeadersReceived(callback: RequestTaskOnHeadersReceivedCallback): number {
    this._emitter.on('headersReceived', callback)
    this._requestOnHeadersReceiveCallbackId++
    this._requestOnHeadersReceiveCallbacks.set(
      this._requestOnHeadersReceiveCallbackId,
      callback
    )
    return this._requestOnHeadersReceiveCallbackId
  }
  offHeadersReceived(
    callback?: RequestTaskOnHeadersReceivedCallback | number | null
  ): void {
    if (callback == null) {
      this._emitter.off('headersReceived')
      return
    }
    if (typeof callback === 'function') {
      this._requestOnHeadersReceiveCallbacks.forEach((cb, id) => {
        if (cb === callback) {
          this._requestOnHeadersReceiveCallbacks.delete(id)
          this._emitter.off('headersReceived', callback)
        }
      })
      return
    }
    const callbackFn = this._requestOnHeadersReceiveCallbacks.get(callback)
    if (!callbackFn) {
      return
    }
    this._requestOnHeadersReceiveCallbacks.delete(callback)
    this._emitter.off('headersReceived', callbackFn)
  }

  onChunkReceived(callback: RequestTaskOnChunkReceivedCallback): number {
    this._emitter.on('chunkReceived', callback)
    this._requestOnChunkReceiveCallbackId++
    this._requestOnChunkReceiveCallbacks.set(
      this._requestOnChunkReceiveCallbackId,
      callback
    )
    return this._requestOnChunkReceiveCallbackId
  }
  offChunkReceived(
    callback?: RequestTaskOnChunkReceivedCallback | number | null
  ): void {
    if (callback == null) {
      this._emitter.off('chunkReceived')
      return
    }
    if (typeof callback === 'function') {
      this._requestOnChunkReceiveCallbacks.forEach((cb, id) => {
        if (cb === callback) {
          this._requestOnChunkReceiveCallbacks.delete(id)
          this._emitter.off('chunkReceived', callback)
        }
      })
      return
    }
    const callbackFn = this._requestOnChunkReceiveCallbacks.get(callback)
    if (!callbackFn) {
      return
    }
    this._requestOnChunkReceiveCallbacks.delete(callback)
    this._emitter.off('chunkReceived', callbackFn)
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

function parseResponseText(
  responseText: string,
  responseType: string | undefined,
  dataType: string | undefined
): any {
  let res = responseText
  if (responseType === 'text' && dataType === 'json') {
    try {
      //#if _X_
      // @ts-expect-error
      res = UTS.JSON.parse(res) || res
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
  return res
}
