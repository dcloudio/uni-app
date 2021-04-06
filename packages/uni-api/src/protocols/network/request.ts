import { hasOwn, isPlainObject } from '@vue/shared'
import { ApiOptions, ApiProtocol } from '../type'

export const API_REQUEST = 'request'

const METHOD = [
  'GET',
  'OPTIONS',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'TRACE',
  'CONNECT',
]

const DEFAULT_METHOD = 'GET'

const dataType = {
  JSON: 'json',
}

const RESPONSE_TYPE = ['text', 'arraybuffer']
const DEFAULT_RESPONSE_TYPE = 'text'

const encode = encodeURIComponent

function stringifyQuery(url: string, data: Record<string, any>) {
  let str = url.split('#')
  const hash = str[1] || ''
  str = str[0].split('?')
  let query = str[1] || ''
  url = str[0]
  const search = query.split('&').filter((item) => item)
  const params: Record<string, string> = {}
  search.forEach((item) => {
    const part = item.split('=')
    params[part[0]] = part[1]
  })
  for (const key in data) {
    if (hasOwn(data, key)) {
      let v = data[key]
      if (typeof v === 'undefined' || v === null) {
        v = ''
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      params[encode(key)] = encode(v)
    }
  }
  query = Object.keys(params)
    .map((item) => `${item}=${params[item]}`)
    .join('&')
  return url + (query ? '?' + query : '') + (hash ? '#' + hash : '')
}

export const RequestProtocol: ApiProtocol = {
  method: {
    type: String,
  },
  data: {
    type: [Object, String, Array, ArrayBuffer],
  },
  url: {
    type: String,
    required: true,
  },
  header: {
    type: Object,
  },
  dataType: {
    type: String,
  },
  responseType: {
    type: String,
  },
  withCredentials: {
    type: Boolean,
  },
}

export const RequestOptions: ApiOptions = {
  formatArgs: {
    method(value, params) {
      params.method = (value || '').toUpperCase()
      if (METHOD.indexOf(params.method) === -1) {
        params.method = DEFAULT_METHOD
      }
    },
    data(value, params) {
      params.data = value || ''
    },
    url(value, params) {
      if (
        params.method === DEFAULT_METHOD &&
        isPlainObject(params.data) &&
        Object.keys(params.data).length
      ) {
        // 将 method,data 校验提前,保证 url 校验时,method,data 已被格式化
        params.url = stringifyQuery(value, params.data)
      }
    },
    header(value, params) {
      const header = (params.header = value || {})
      if (params.method !== DEFAULT_METHOD) {
        if (
          !Object.keys(header).find(
            (key) => key.toLowerCase() === 'content-type'
          )
        ) {
          header['Content-Type'] = 'application/json'
        }
      }
    },
    dataType(value, params) {
      params.dataType = (value || dataType.JSON).toLowerCase()
    },
    responseType(value, params) {
      params.responseType = (value || '').toLowerCase()
      if (RESPONSE_TYPE.indexOf(params.responseType) === -1) {
        params.responseType = DEFAULT_RESPONSE_TYPE
      }
    },
  },
}
