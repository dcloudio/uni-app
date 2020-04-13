import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

const method = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT'
}
const dataType = {
  JSON: 'json'
}
const responseType = {
  TEXT: 'text',
  ARRAYBUFFER: 'arraybuffer'
}

const encode = encodeURIComponent

function stringifyQuery (url, data) {
  let str = url.split('#')
  const hash = str[1] || ''
  str = str[0].split('?')
  let query = str[1] || ''
  url = str[0]
  const search = query.split('&').filter(item => item)
  query = {}
  search.forEach(item => {
    item = item.split('=')
    query[item[0]] = item[1]
  })
  for (const key in data) {
    if (hasOwn(data, key)) {
      let v = data[key]
      if (typeof v === 'undefined' || v === null) {
        v = ''
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      query[encode(key)] = encode(v)
    }
  }
  query = Object.keys(query).map(item => `${item}=${query[item]}`).join('&')
  return url + (query ? '?' + query : '') + (hash ? '#' + hash : '')
}

export const request = {
  method: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value
    }
  },
  data: {
    type: [Object, String, Array, ArrayBuffer],
    validator (value, params) {
      params.data = value || ''
    }
  },
  url: {
    type: String,
    required: true,
    validator (value, params) {
      if (
        params.method === method.GET &&
        isPlainObject(params.data) &&
        Object.keys(params.data).length
      ) { // 将 method,data 校验提前,保证 url 校验时,method,data 已被格式化
        params.url = stringifyQuery(value, params.data)
      }
    }
  },
  header: {
    type: Object,
    validator (value, params) {
      const header = params.header = value || {}
      if (params.method !== method.GET) {
        if (!Object.keys(header).find(key => key.toLowerCase() === 'content-type')) {
          header['Content-Type'] = 'application/json'
        }
      }
    }
  },
  dataType: {
    type: String,
    validator (value, params) {
      params.dataType = (value || dataType.JSON).toLowerCase()
    }
  },
  responseType: {
    type: String,
    validator (value, params) {
      value = (value || '').toLowerCase()
      params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value
    }
  },
  withCredentials: {
    type: Boolean
  }
}
