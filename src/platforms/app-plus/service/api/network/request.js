import {
  publish
} from '../../bridge'

const USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36  MicroMessenger/6.5.1 NetType/WIFI Language/zh_CN'

let requestTaskId = 0
const requestTasks = {}

const publishStateChange = res => {
  publish('onRequestTaskStateChange', res)
  delete requestTasks[requestTaskId]
}

const parseResponseHeaders = headerStr => {
  const headers = {}
  if (!headerStr) {
    return headers
  }
  const headerPairs = headerStr.split('\u000d\u000a')
  for (let i = 0; i < headerPairs.length; i++) {
    const headerPair = headerPairs[i]
    const index = headerPair.indexOf('\u003a\u0020')
    if (index > 0) {
      const key = headerPair.substring(0, index)
      const val = headerPair.substring(index + 2)
      headers[key] = val
    }
  }
  return headers
}

export function createRequestTaskById (requestTaskId, {
  url,
  data,
  header,
  method = 'GET'
} = {}) {
  let abortTimeout
  let xhr
  // fixed by hxy 始终使用 plus 的 XHR
  xhr = new plus.net.XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (abortTimeout) {
        clearTimeout(abortTimeout)
      }
      xhr.onreadystatechange = null
      const statusCode = xhr.status
      if (statusCode) {
        publishStateChange({
          requestTaskId,
          state: 'success',
          data: xhr.responseText,
          statusCode,
          header: parseResponseHeaders(xhr.getAllResponseHeaders())
        })
      } else {
        publishStateChange({
          requestTaskId,
          state: 'fail',
          statusCode,
          errMsg: 'abort'
        })
      }
    }
  }
  let hasContentType = false
  for (const name in header) {
    if (header.hasOwnProperty(name)) {
      if (!hasContentType && name.toLowerCase() === 'content-type') {
        hasContentType = true
        xhr.setRequestHeader('Content-Type', header[name]) // 大小写必须一致,否则部分服务器会返回invalid header name
      } else {
        xhr.setRequestHeader(name, header[name])
      }
    }
  }
  if (!hasContentType && method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  }
  if (__uniConfig.crossDomain === true) {
    xhr.setRequestHeader('User-Agent', USER_AGENT)
  }

  if (__uniConfig.networkTimeout.request) {
    abortTimeout = setTimeout(() => {
      xhr.onreadystatechange = null
      xhr.abort()
      publishStateChange({
        requestTaskId,
        state: 'fail',
        data: xhr.responseText,
        statusCode: 0,
        errMsg: 'timeout'
      })
    }, __uniConfig.networkTimeout.request)
  }

  if (typeof data !== 'string' && method === 'GET') {
    data = null
  }
  try {
    xhr.send(data)
    requestTasks[requestTaskId] = xhr
  } catch (e) {
    return {
      requestTaskId,
      errMsg: 'createRequestTask:fail'
    }
  }
  return {
    requestTaskId,
    errMsg: 'createRequestTask:ok'
  }
}

export function createRequestTask (args) {
  return createRequestTaskById(++requestTaskId, args)
}

export function operateRequestTask ({
  requestTaskId,
  operationType
} = {}) {
  const requestTask = requestTasks[requestTaskId]
  if (requestTask && operationType === 'abort') {
    requestTask.abort()
    return {
      errMsg: 'operateRequestTask:ok'
    }
  }
  return {
    errMsg: 'operateRequestTask:fail'
  }
}
