import {
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
  JSON: 'JSON'
}
const responseType = {
  TEXT: 'TEXT',
  ARRAYBUFFER: 'ARRAYBUFFER'
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
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (isPlainObject(data[key])) {
        query[encode(key)] = encode(JSON.stringify(data[key]))
      } else {
        query[encode(key)] = encode(data[key])
      }
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
    type: [Object, String, ArrayBuffer],
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
      params.header = value || {}
    }
  },
  dataType: {
    type: String,
    validator (value, params) {
      params.dataType = (value || dataType.JSON).toUpperCase()
    }
  },
  responseType: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value
    }
  }
}
