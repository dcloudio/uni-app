import {
  unpack,
  publish,
  requireNativePlugin,
  base64ToArrayBuffer,
  arrayBufferToBase64
} from '../../bridge'

const socketTasks = {}

const publishStateChange = (res) => {
  publish('onSocketTaskStateChange', res)
}

let socket
function getSocket () {
  if (socket) {
    return socket
  }
  socket = requireNativePlugin('uni-webSocket')
  socket.onopen(function (e) {
    publishStateChange({
      socketTaskId: e.id,
      state: 'open'
    })
  })
  socket.onmessage(function (e) {
    const data = e.data
    publishStateChange({
      socketTaskId: e.id,
      state: 'message',
      data: typeof data === 'object' ? base64ToArrayBuffer(data.base64) : data
    })
  })
  socket.onerror(function (e) {
    publishStateChange({
      socketTaskId: e.id,
      state: 'error',
      errMsg: e.data
    })
  })
  socket.onclose(function (e) {
    const socketTaskId = e.id
    delete socketTasks[socketTaskId]
    publishStateChange({
      socketTaskId,
      state: 'close'
    })
  })
  return socket
}

const createSocketTaskById = function (socketTaskId, {
  url,
  data,
  header,
  method,
  protocols
} = {}) {
  const socket = getSocket()
  socket.WebSocket({
    id: socketTaskId,
    url,
    protocol: Array.isArray(protocols) ? protocols.join(',') : protocols
  })
  socketTasks[socketTaskId] = socket
  return {
    socketTaskId,
    errMsg: 'createSocketTask:ok'
  }
}

export function createSocketTask (args) {
  return createSocketTaskById(String(Date.now()), args)
}

export function operateSocketTask (args) {
  const {
    operationType,
    code,
    reason,
    data,
    socketTaskId
  } = unpack(args)
  const socket = socketTasks[socketTaskId]
  if (!socket) {
    return {
      errMsg: 'operateSocketTask:fail'
    }
  }
  switch (operationType) {
    case 'send':
      if (data) {
        socket.send({
          id: socketTaskId,
          data: typeof data === 'object' ? {
            '@type': 'binary',
            base64: arrayBufferToBase64(data)
          } : data
        })
      }
      return {
        errMsg: 'operateSocketTask:ok'
      }
    case 'close':
      socket.close({
        id: socketTaskId,
        code,
        reason
      })
      delete socketTasks[socketTaskId]
      return {
        errMsg: 'operateSocketTask:ok'
      }
  }
  return {
    errMsg: 'operateSocketTask:fail'
  }
}
