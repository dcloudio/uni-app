import { hasOwn, isPlainObject, toRawType } from '@vue/shared'
import { HTTP_METHODS, elemInArray } from '../../helpers/protocol'

export const API_REQUEST = 'request'
export type API_TYPE_REQUEST = typeof uni.request

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

export const RequestProtocol: ApiProtocol<API_TYPE_REQUEST> = {
  method: String as any,
  data: [Object, String, Array, ArrayBuffer],
  url: {
    type: String,
    required: true,
  },
  header: Object,
  dataType: String,
  responseType: String,
  withCredentials: Boolean,
}

export const RequestOptions: ApiOptions<API_TYPE_REQUEST> = {
  formatArgs: {
    method(value, params) {
      params.method = elemInArray(
        (value || '').toUpperCase(),
        HTTP_METHODS
      ) as any
    },
    data(value, params) {
      params.data = value || ''
    },
    url(value, params) {
      if (
        params.method === HTTP_METHODS[0] &&
        isPlainObject(params.data) &&
        Object.keys(params.data).length
      ) {
        // 将 method,data 校验提前,保证 url 校验时,method,data 已被格式化
        params.url = stringifyQuery(value, params.data)
      }
    },
    header(value: Record<string, any>, params: Record<string, any>) {
      const header = (params.header = value || {})
      if (params.method !== HTTP_METHODS[0]) {
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

export const API_CONFIG_MTLS = 'configMTLS'
export type API_TYPE_CONFIG_MTLS = typeof uni.configMTLS
export const ConfigMTLSProtocol: ApiProtocol<API_TYPE_CONFIG_MTLS> = {
  certificates: {
    type: Array,
    required: true,
  },
}
export const ConfigMTLSOptions: ApiOptions<API_TYPE_CONFIG_MTLS> = {
  formatArgs: {
    certificates(value: Parameters<API_TYPE_CONFIG_MTLS>[0]['certificates']) {
      if (value.some((item) => toRawType(item.host) !== 'String')) {
        return '参数配置错误，请确认后重试'
      }
    },
  },
}
