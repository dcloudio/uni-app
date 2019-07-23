import {
  publish
} from '../../bridge'

let socketTaskId = 0
const socketTasks = {}

const publishStateChange = (res) => {
  publish('onSocketTaskStateChange', res)
}

const createSocketTaskById = function (socketTaskId, {
  url,
  data,
  header,
  method,
  protocols
} = {}) {
  // fixed by hxy 需要测试是否支持 arraybuffer
  const socket = weex.requireModule('webSocket')
  socket.WebSocket(url, Array.isArray(protocols) ? protocols.join(',') : protocols)
  // socket.binaryType = 'arraybuffer'
  socketTasks[socketTaskId] = socket

  socket.onopen(function (e) {
    publishStateChange({
      socketTaskId,
      state: 'open'
    })
  })
  socket.onmessage(function (e) {
    publishStateChange({
      socketTaskId,
      state: 'message',
      data: e.data
    })
  })
  socket.onerror(function (e) {
    publishStateChange({
      socketTaskId,
      state: 'error',
      errMsg: e.message
    })
  })
  socket.onclose(function (e) {
    delete socketTasks[socketTaskId]
    publishStateChange({
      socketTaskId,
      state: 'close'
    })
  })
  return {
    socketTaskId,
    errMsg: 'createSocketTask:ok'
  }
}

export function createSocketTask (args) {
  return createSocketTaskById(++socketTaskId, args)
}

export function operateSocketTask (args) {
  const {
    operationType,
    code,
    data,
    socketTaskId
  } = PlusNativeBuffer.unpack(args)
  const socket = socketTasks[socketTaskId]
  if (!socket) {
    return {
      errMsg: 'operateSocketTask:fail'
    }
  }
  switch (operationType) {
    case 'send':
      if (data) {
        socket.send(data)
      }
      return {
        errMsg: 'operateSocketTask:ok'
      }
    case 'close':
      socket.close(code)
      delete socketTasks[socketTaskId]
      return {
        errMsg: 'operateSocketTask:ok'
      }
  }
  return {
    errMsg: 'operateSocketTask:fail'
  }
}
