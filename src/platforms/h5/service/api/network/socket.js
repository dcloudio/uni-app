const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge
const eventNames = ['open', 'close', 'error', 'message']
const callbacks = {}
const socketTasks = []
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
  constructor (url, protocols, callback) {
    let error
    try {
      const webSocket = this._webSocket = new WebSocket(url, protocols)
      webSocket.binaryType = 'arraybuffer'
      this._callbacks = {}
      eventNames.forEach(name => {
        this._callbacks[name] = []
        webSocket.addEventListener(name, event => {
          const res = name === 'message' ? {
            data: event.data
          } : {}
          this._callbacks[name].forEach(callback => {
            try {
              callback(res)
            } catch (e) {
              console.error(`thirdScriptError\n${e};at socketTask.on${name[0].toUpperCase() + name.substr(1)} callback function\n`, e)
            }
          })
          if (this === socketTasks[0] && callbacks[name]) {
            invoke(callbacks[name], res)
          }
          if (name === 'error' || name === 'close') {
            const index = socketTasks.indexOf(this)
            if (index >= 0) {
              socketTasks.splice(index, 1)
            }
          }
        })
      })
      let propertys = ['CLOSED', 'CLOSING', 'CONNECTING', 'OPEN', 'readyState']
      propertys.forEach((property) => {
        Object.defineProperty(this, property, {
          get () {
            return webSocket[property]
          }
        })
      })
    } catch (e) {
      error = e
    }
    callback(error, this)
  }
  /**
   * 发送
   * @param {any} data
   */
  send (options = {}) {
    const data = options.data
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
    const ws = this._webSocket
    const arrgs = []
    arrgs.push(options.code || 1000)
    if (typeof options.reason === 'string') {
      arrgs.push(options.reason)
    }
    try {
      ws.close(...arrgs)
      this._callback(options, 'sendSocketMessage:ok')
    } catch (error) {
      this._callback(options, `sendSocketMessage:fail ${error}`)
    }
  }
  /**
   * 通用回调处理
   */
  _callback ({
    success,
    fail,
    complete
  }, errMsg) {
    const data = {
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
eventNames.forEach(item => {
  const name = item[0].toUpperCase() + item.substr(1)
  SocketTask.prototype[`on${name}`] = function (callback) {
    this._callbacks[item].push(callback)
  }
})
/**
 * 创建一个 WebSocket 连接
 * @param {any} data 数据
 * @return {SocketTask}
 */
export function connectSocket ({
  url,
  protocols
}, callbackId) {
  return new SocketTask(url, protocols, (error, socketTask) => {
    if (!error) {
      socketTasks.push(socketTask)
    }
    invoke(callbackId, {
      errMsg: 'connectSocket:' + (error ? `fail ${error}` : 'ok')
    })
  })
}
/**
 * 通过 WebSocket 连接发送数据
 * @param {any} options
 * @param {string} callbackId
 */
export function sendSocketMessage (options, callbackId) {
  const socketTask = socketTasks[0]
  if (socketTask && socketTask.readyState === socketTask.OPEN) {
    socketTask.send(Object.assign({}, options, {
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
  const socketTask = socketTasks[0]
  if (socketTask) {
    socketTask.close(Object.assign({}, options, {
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
 */
function on (method) {
  return function (callbackId) {
    callbacks[method] = callbackId
  }
}
/**
 * 监听WebSocket连接打开事件
 * @param {Function} cb
 */
export const onSocketOpen = on('open')
/**
 * 监听WebSocket错误
 * @param {Function} cb
 */
export const onSocketError = on('error')
/**
 * 监听WebSocket接受到服务器的消息事件
 * @param {Function} cb
 */
export const onSocketMessage = on('message')
/**
 * 监听WebSocket关闭
 * @param {Function} callback
 */
export const onSocketClose = on('close')
