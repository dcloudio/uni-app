import { hasOwn, isArray, isPlainObject, isString } from '@vue/shared'
import {
  API_REQUEST,
  API_TYPE_REQUEST,
  defineTaskApi,
  RequestOptions,
  RequestProtocol,
  API_CONFIG_MTLS,
  API_TYPE_CONFIG_MTLS,
  defineAsyncApi,
  ConfigMTLSOptions,
  ConfigMTLSProtocol,
} from '@dcloudio/uni-api'
import { base64ToArrayBuffer, arrayBufferToBase64 } from '@dcloudio/uni-api'
import { requireNativePlugin } from '../plugin/requireNativePlugin'
import { Stream, FetchOptions, FetchCallback, FetchHeaders } from './stream'

interface RequestTasks {
  abort: Function
}
type RequestTaskState = {
  statusCode: number
  cookies: string[]
  header: any
  url?: string
  data: string | ArrayBuffer | any
  errMsg?: string
}

const cookiesParse = (header: Record<string, string>) => {
  let cookiesStr = header['Set-Cookie'] || header['set-cookie']
  let cookiesArr = []
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

function formatResponse(res: RequestTaskState, args: UniApp.RequestOptions) {
  if (isString(res.data) && res.data.charCodeAt(0) === 65279) {
    res.data = res.data.slice(1)
  }

  res.statusCode = parseInt(String(res.statusCode), 10)

  if (isPlainObject(res.header)) {
    res.header = Object.keys(res.header).reduce(function (ret, key) {
      const value = res.header[key]
      if (isArray(value)) {
        ;(ret as any)[key] = value.join(',')
      } else if (isString(value)) {
        ;(ret as any)[key] = value
      }
      return ret
    }, {})
  }

  if (args.dataType && args.dataType.toLowerCase() === 'json') {
    try {
      res.data = JSON.parse(res.data as string)
    } catch (e) {}
  }

  return res
}

/**
 * 请求任务类
 */
class RequestTask implements UniApp.RequestTask {
  private _requestTask: RequestTasks

  constructor(requestTask: RequestTasks) {
    this._requestTask = requestTask
  }

  abort() {
    this._requestTask.abort()
  }

  offHeadersReceived() {}

  onHeadersReceived() {}
}

export const request = defineTaskApi<API_TYPE_REQUEST>(
  API_REQUEST,
  (args, { resolve, reject }) => {
    let {
      header,
      method,
      data,
      timeout,
      url,
      responseType,
      sslVerify,
      firstIpv4,
      // @ts-ignore tls 缺少 types 类型
      tls,
    } = args

    let contentType
    for (const name in header) {
      if (name.toLowerCase() === 'content-type') {
        contentType = header[name]
        break
      }
    }

    if (
      method !== 'GET' &&
      contentType &&
      contentType.indexOf('application/json') === 0 &&
      isPlainObject(data)
    ) {
      data = JSON.stringify(data)
    }

    const stream: Stream = requireNativePlugin('stream')
    const headers: FetchHeaders = {}
    let abortTimeout: ReturnType<typeof setTimeout>
    let aborted: boolean
    let hasContentType = false

    for (const name in header) {
      if (!hasContentType && name.toLowerCase() === 'content-type') {
        hasContentType = true
        headers['Content-Type'] = header[name]
        // TODO 需要重构
        if (
          method !== 'GET' &&
          header[name].indexOf('application/x-www-form-urlencoded') === 0 &&
          !isString(data) &&
          !(data instanceof ArrayBuffer)
        ) {
          const bodyArray = []
          for (const key in data) {
            if (hasOwn(data, key)) {
              bodyArray.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
              )
            }
          }
          data = bodyArray.join('&')
        }
      } else {
        headers[name] = header[name]
      }
    }

    if (!hasContentType && method === 'POST') {
      headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8'
    }

    if (timeout) {
      abortTimeout = setTimeout(() => {
        aborted = true
        reject('timeout')
      }, timeout + 200) // TODO +200 发消息到原生层有时间开销，以后考虑由原生层回调超时
    }

    const options: FetchOptions = {
      method,
      url: url.trim(),
      headers,
      type: responseType === 'arraybuffer' ? 'base64' : 'text',
      timeout: timeout || 6e5,
      // 配置和weex模块内相反
      sslVerify: !sslVerify,
      firstIpv4: firstIpv4,
      tls,
    }
    let withArrayBuffer: boolean = false
    if (method !== 'GET') {
      if (toString.call(data) === '[object ArrayBuffer]') {
        withArrayBuffer = true
      } else {
        options.body = isString(data) ? data : JSON.stringify(data)
      }
    }
    const callback: FetchCallback = ({
      ok,
      status,
      data,
      headers,
      errorMsg,
    }) => {
      if (aborted) {
        return
      }
      if (abortTimeout) {
        clearTimeout(abortTimeout)
      }
      const statusCode = status
      if (statusCode > 0) {
        resolve(
          formatResponse(
            {
              data:
                ok && responseType === 'arraybuffer'
                  ? base64ToArrayBuffer(data)
                  : data,
              statusCode,
              header: headers,
              cookies: cookiesParse(headers),
            },
            args
          )
        )
      } else {
        let errMsg = 'abort statusCode:' + statusCode
        if (errorMsg) {
          errMsg = errMsg + ' ' + errorMsg
        }
        reject(errMsg)
      }
    }
    if (withArrayBuffer) {
      stream.fetchWithArrayBuffer(
        {
          '@type': 'binary',
          base64: arrayBufferToBase64(data as ArrayBuffer),
        },
        options,
        callback
      )
    } else {
      stream.fetch(options, callback)
    }

    return new RequestTask({
      abort() {
        aborted = true
        if (abortTimeout) {
          clearTimeout(abortTimeout)
        }
        reject('abort')
      },
    })
  },
  RequestProtocol,
  RequestOptions
)

type StreamConfigMTLSCB = {
  type: 'success' | 'fail'
  code: number
  message: string
}
export const configMTLS = defineAsyncApi<API_TYPE_CONFIG_MTLS>(
  API_CONFIG_MTLS,
  ({ certificates }, { resolve, reject }) => {
    const stream = requireNativePlugin('stream')
    stream.configMTLS(
      certificates,
      ({ type, code, message }: StreamConfigMTLSCB) => {
        switch (type) {
          case 'success':
            resolve({ code })
            break
          case 'fail':
            reject(message, { code })
            break
        }
      }
    )
  },
  ConfigMTLSProtocol,
  ConfigMTLSOptions
)
