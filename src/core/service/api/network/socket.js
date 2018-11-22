var socketTask
/**
 * SocketTask
 */
class SocketTask {
  /**
   * WebSocket实例
   */
  _webSocket
  /**
   * 构造函数
   * @param {string} url
   * @param {Array} protocols
   */
  constructor (url, protocols) {
    this._webSocket = new WebSocket(url, protocols)
  }
  /**
   * 发送
   * @param {any} data
   */
  send (options = {}) {
    var data = options.data
    const ws = this._webSocket
    try {
      ws.send(data)
      this._callback(options, 'sendSocketMessage:ok')
    } catch (error) {
      this._callback(options, `sendSocketMessage:fail ${error}`)
    }
  }
  /**
   * 关闭
   * @param {number} code
   * @param {string} reason
   */
  close (options = {}) {
    var code = options.data
    var reason = options.data
    const ws = this._webSocket
    try {
      ws.close(code, reason)
      this._callback(options, 'sendSocketMessage:ok')
    } catch (error) {
      this._callback(options, `sendSocketMessage:fail ${error}`)
    }
  }
  /**
   * 监听开启
   * @param {Function} callback
   */
  onOpen (callback) {
    this._on('open', callback)
  }
  /**
   * 监听关闭
   * @param {Function} callback
   */
  onClose (callback) {
    this._on('close', callback)
  }
  /**
   * 监听错误
   * @param {Function} callback
   */
  onError (callback) {
    this._on('error', callback)
  }
  /**
   * 监听消息
   * @param {Function} callback
   */
  onMessage (callback) {
    this._on('message', callback)
  }
  /**
   * 监听事件
   * @param {string} eventName
   * @param {Function} callback
   */
  _on (eventName, callback) {
    this._webSocket.addEventListener(eventName, event => {
      if (eventName === 'message') {
        callback({
          data: event.data
        })
      } else {
        callback()
      }
    }, false)
  }
  /**
   * 通用回调处理
   */
  _callback ({
    success,
    fail,
    complete
  }, errMsg) {
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

/**
 * 创建一个 WebSocket 连接
 * @param {any} data 数据
 * @return {SocketTask}
 */
export function connectSocket ({
  url,
  protocols
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  socketTask = new SocketTask(url, protocols)
  setTimeout(() => {
    invoke(callbackId, {
      errMsg: 'connectSocket:ok'
    })
  }, 0)
  return socketTask
}
/**
 * 通过 WebSocket 连接发送数据
 * @param {any} options
 * @param {string} callbackId
 */
export function sendSocketMessage (options, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (socketTask && socketTask._webSocket.readyState === WebSocket.OPEN) {
    socketTask.send(Object.assign(options, {
      complete (res) {
        invoke(callbackId, res)
      }
    }))
  } else {
    invoke(callbackId, {
      errMsg: 'sendSocketMessage:fail WebSocket is not connected '
    })
  }
}
/**
 * 关闭WebSocket连接
 * @param {any} options
 * @param {string} callbackId
 */
export function closeSocket (options, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (socketTask && socketTask._webSocket.readyState !== WebSocket.CLOSED) {
    socketTask.close(Object.assign(options, {
      complete (res) {
        invoke(callbackId, res)
      }
    }))
  } else {
    invoke(callbackId, {
      errMsg: 'closeSocket:fail WebSocket is not connected'
    })
  }
}
/**
 * 监听事件
 * @param {string} method
 * @param {Function} callback
 */
function on (method) {
  return function (callback) {
    if (socketTask) {
      socketTask[method](callback)
    }
  }
}
/**
 * 监听WebSocket连接打开事件
 * @param {Function} cb
 */
export const onSocketOpen = on('onOpen')
/**
 * 监听WebSocket错误
 * @param {Function} cb
 */
export const onSocketError = on('onError')
/**
 * 监听WebSocket接受到服务器的消息事件
 * @param {Function} cb
 */
export const onSocketMessage = on('onMessage')
/**
 * 监听WebSocket关闭
 * @param {Function} callback
 */
export const onSocketClose = on('onClose')
