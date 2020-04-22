import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod,
  invokeMethod
} from '../../platform'

class SocketTask {
  constructor (socketTaskId) {
    this.id = socketTaskId
    this._callbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }
    this.CLOSED = 3
    this.CLOSING = 2
    this.CONNECTING = 0
    this.OPEN = 1
    this.readyState = this.CLOSED
  }

  send (args) {
    if (this.readyState !== this.OPEN) {
      this._callback(args, 'sendSocketMessage:fail WebSocket is not connected')
    }
    const {
      errMsg
    } = invokeMethod('operateSocketTask', Object.assign({}, args, {
      operationType: 'send',
      socketTaskId: this.id
    }))
    this._callback(args, errMsg.replace('operateSocketTask', 'sendSocketMessage'))
  }

  close (args) {
    this.readyState = this.CLOSING
    const {
      errMsg
    } = invokeMethod('operateSocketTask', Object.assign({}, args, {
      operationType: 'close',
      socketTaskId: this.id
    }))
    this._callback(args, errMsg.replace('operateSocketTask', 'closeSocket'))
  }

  onOpen (callback) {
    this._callbacks.open.push(callback)
  }

  onClose (callback) {
    this._callbacks.close.push(callback)
  }

  onError (callback) {
    this._callbacks.error.push(callback)
  }

  onMessage (callback) {
    this._callbacks.message.push(callback)
  }

  _callback ({
    success,
    fail,
    complete
  } = {}, errMsg) {
    var data = {
      errMsg
    }
    if (/:ok$/.test(errMsg)) {
      if (typeof success === 'function') {
        success(data)
      }
    } else {
      if (typeof fail === 'function') {
        fail(data)
      }
    }
    if (typeof complete === 'function') {
      complete(data)
    }
  }
}

const socketTasks = Object.create(null)
const socketTasksArray = []
const callbacks = Object.create(null)
onMethod('onSocketTaskStateChange', ({
  socketTaskId,
  state,
  data,
  errMsg
}) => {
  const socketTask = socketTasks[socketTaskId]
  if (!socketTask) {
    return
  }
  if (state === 'open') {
    socketTask.readyState = socketTask.OPEN
  }
  if (socketTask === socketTasksArray[0] && callbacks[state]) {
    invoke(callbacks[state], state === 'message' ? {
      data
    } : {})
  }
  if (state === 'error' || state === 'close') {
    socketTask.readyState = socketTask.CLOSED
    delete socketTasks[socketTaskId]
    const index = socketTasksArray.indexOf(socketTask)
    if (index >= 0) {
      socketTasksArray.splice(index, 1)
    }
  }
  socketTask._callbacks[state].forEach(callback => {
    if (typeof callback === 'function') {
      callback(state === 'message' ? {
        data
      } : {})
    }
  })
})

export function connectSocket (args, callbackId) {
  const {
    socketTaskId
  } = invokeMethod('createSocketTask', args)
  const task = new SocketTask(socketTaskId)
  socketTasks[socketTaskId] = task
  socketTasksArray.push(task)
  setTimeout(() => {
    invoke(callbackId, {
      errMsg: 'connectSocket:ok'
    })
  }, 0)
  return task
}

export function sendSocketMessage (args, callbackId) {
  const socketTask = socketTasksArray[0]
  if (!socketTask || socketTask.readyState !== socketTask.OPEN) {
    invoke(callbackId, {
      errMsg: 'sendSocketMessage:fail WebSocket is not connected'
    })
    return
  }
  return invokeMethod('operateSocketTask', Object.assign({}, args, {
    operationType: 'send',
    socketTaskId: socketTask.id
  }))
}

export function closeSocket (args, callbackId) {
  const socketTask = socketTasksArray[0]
  if (!socketTask) {
    invoke(callbackId, {
      errMsg: 'closeSocket:fail WebSocket is not connected'
    })
    return
  }
  socketTask.readyState = socketTask.CLOSING
  return invokeMethod('operateSocketTask', Object.assign({}, args, {
    operationType: 'close',
    socketTaskId: socketTask.id
  }))
}

export function onSocketOpen (callbackId) {
  callbacks.open = callbackId
}

export function onSocketError (callbackId) {
  callbacks.error = callbackId
}

export function onSocketMessage (callbackId) {
  callbacks.message = callbackId
}

export function onSocketClose (callbackId) {
  callbacks.close = callbackId
}
