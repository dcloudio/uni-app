import {
  isPlainObject
} from 'uni-shared'

import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

const requestTasks = Object.create(null)

function formatResponse (res, args) {
  if (
    typeof res.data === 'string' &&
    res.data.charCodeAt(0) === 65279
  ) {
    res.data = res.data.substr(1)
  }

  res.statusCode = parseInt(res.statusCode, 10)

  if (isPlainObject(res.header)) {
    res.header = Object.keys(res.header).reduce(function (ret, key) {
      const value = res.header[key]
      if (Array.isArray(value)) {
        ret[key] = value.join(',')
      } else if (typeof value === 'string') {
        ret[key] = value
      }
      return ret
    }, {})
  }

  if (args.dataType && args.dataType.toLowerCase() === 'json') {
    try {
      res.data = JSON.parse(res.data)
    } catch (e) {}
  }

  return res
}

onMethod('onRequestTaskStateChange', function ({
  requestTaskId,
  state,
  data,
  statusCode,
  header,
  errMsg
}) {
  const {
    args,
    callbackId
  } = requestTasks[requestTaskId] || {}

  if (!callbackId) {
    return
  }
  delete requestTasks[requestTaskId]
  switch (state) {
    case 'success':
      invoke(callbackId, formatResponse({
        data,
        statusCode,
        header,
        errMsg: 'request:ok'
      }, args))
      break
    case 'fail':
      invoke(callbackId, {
        errMsg: 'request:fail ' + errMsg
      })
      break
  }
})

class RequestTask {
  constructor (id) {
    this.id = id
  }

  abort () {
    invokeMethod('operateRequestTask', {
      requestTaskId: this.id,
      operationType: 'abort'
    })
  }

  offHeadersReceived () {

  }

  onHeadersReceived () {

  }
}

export function request (args, callbackId) {
  const {
    requestTaskId
  } = invokeMethod('createRequestTask', args)

  requestTasks[requestTaskId] = {
    args,
    callbackId
  }

  return new RequestTask(requestTaskId)
}
