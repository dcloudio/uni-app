import {
  publish,
  requireNativePlugin
} from '../../bridge'

let requestTaskId = 0
const requestTasks = {}

const publishStateChange = res => {
  publish('onRequestTaskStateChange', res)
  delete requestTasks[requestTaskId]
}

export function createRequestTaskById (requestTaskId, {
  url,
  data,
  header,
  method = 'GET'
} = {}) {
  const stream = requireNativePlugin('stream')
  const headers = {}

  let abortTimeout
  let aborted
  let hasContentType = false
  for (const name in header) {
    if (!hasContentType && name.toLowerCase() === 'content-type') {
      hasContentType = true
      headers['Content-Type'] = header[name]
    } else {
      headers[name] = header[name]
    }
  }

  if (!hasContentType && method === 'POST') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  const timeout = __uniConfig.networkTimeout.request
  if (timeout) {
    abortTimeout = setTimeout(() => {
      aborted = true
      publishStateChange({
        requestTaskId,
        state: 'fail',
        statusCode: 0,
        errMsg: 'timeout'
      })
    }, timeout)
  }
  const options = {
    method,
    url: url.trim(),
    // weex 官方文档有误，headers 类型实际 object，用 string 类型会无响应
    headers,
    type: 'text',
    // weex 官方文档未说明实际支持 timeout，单位：ms
    timeout: timeout || 6e5
  }
  if (method !== 'GET') {
    options.body = data
  }
  try {
    stream.fetch(options, ({
      status,
      data,
      headers
    }) => {
      if (aborted) {
        return
      }
      if (abortTimeout) {
        clearTimeout(abortTimeout)
      }
      const statusCode = status
      if (statusCode > 0) {
        publishStateChange({
          requestTaskId,
          state: 'success',
          data,
          statusCode,
          header: headers
        })
      } else {
        publishStateChange({
          requestTaskId,
          state: 'fail',
          statusCode,
          errMsg: 'abort'
        })
      }
    })
    requestTasks[requestTaskId] = {
      abort () {
        aborted = true
        if (abortTimeout) {
          clearTimeout(abortTimeout)
        }
        publishStateChange({
          requestTaskId,
          state: 'fail',
          statusCode: 0,
          errMsg: 'abort'
        })
      }
    }
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
