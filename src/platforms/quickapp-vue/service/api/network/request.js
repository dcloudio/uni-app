import {
  publish
} from '../../bridge'

import stream from '@system.fetch'

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
  method = 'GET',
  responseType,
  sslVerify = true
} = {}) {
  let abortTimeout
  let aborted

  const timeout = 60000
  if (timeout) {
    abortTimeout = setTimeout(() => {
      aborted = true
      publishStateChange({
        requestTaskId,
        state: 'fail',
        statusCode: 0,
        errMsg: 'timeout'
      })
    }, (timeout + 100))
  }
  const options = {
    method,
    url: url.trim(),
    header,
    type: responseType,
    timeout: timeout || 6e5
  }
  if (method !== 'GET') {
    options.body = data
  }
  try {
    stream.fetch({
      ...options,
      success: ({
        code,
        data,
        headers
      }) => {
        console.log(data)
        if (aborted) {
          return
        }
        if (abortTimeout) {
          clearTimeout(abortTimeout)
        }
        const statusCode = code
        if (statusCode > 0) {
          publishStateChange({
            requestTaskId,
            state: 'success',
            data: data,
            statusCode,
            header: headers
          })
        } else {
          publishStateChange({
            requestTaskId,
            state: 'fail',
            statusCode,
            errMsg: 'abort statusCode:' + statusCode
          })
        }
      },
      fail: (data, code) => {
        publishStateChange({
          requestTaskId,
          state: 'fail',
          statusCode: code,
          errMsg: 'abort statusCode:' + code
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
