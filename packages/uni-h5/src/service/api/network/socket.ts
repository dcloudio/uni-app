import { extend, capitalize, isFunction, isString } from '@vue/shared'
import {
  defineTaskApi,
  defineAsyncApi,
  defineOnApi,
  API_CONNECT_SOCKET,
  API_TYPE_CONNECT_SOCKET,
  ConnectSocketProtocol,
  ConnectSocketOptions,
  API_SEND_SOCKET_MESSAGE,
  API_TYPE_SEND_SOCKET_MESSAGE,
  SendSocketMessageProtocol,
  API_CLOSE_SOCKET,
  API_TYPE_CLOSE_SOCKET,
  CloseSocketProtocol,
} from '@dcloudio/uni-api'
import { callOptions } from '@dcloudio/uni-shared'

type eventName = keyof WebSocketEventMap

const socketTasks: SocketTask[] = []
const globalEvent: Record<eventName, string> = {
  open: '',
  close: '',
  error: '',
  message: '',
}

class SocketTask implements UniApp.SocketTask {
  /**
   * WebSocket实例
   */
  _webSocket?: WebSocket
  _callbacks: Record<eventName, Function[]> = {
    open: [],
    close: [],
    error: [],
    message: [],
  }
  readonly CLOSED?: number
  readonly CLOSING?: number
  readonly CONNECTING?: number
  readonly OPEN?: number
  readonly readyState?: number
  /**
   * 构造函数
   * @param {string} url
   * @param {Array} protocols
   */
  constructor(url: string, protocols?: string[], callback?: Function) {
    let error
    try {
      const webSocket = (this._webSocket = new WebSocket(url, protocols))
      webSocket.binaryType = 'arraybuffer'
      const eventNames: eventName[] = ['open', 'close', 'error', 'message']
      eventNames.forEach((name: eventName) => {
        this._callbacks[name] = []
        webSocket.addEventListener(name, (event) => {
          const res =
            name === 'message'
              ? {
                  data: (<any>event).data,
                }
              : {}
          this._callbacks[name].forEach((callback) => {
            try {
              callback(res)
            } catch (e) {
              console.error(
                `thirdScriptError\n${e};at socketTask.on${capitalize(
                  name
                )} callback function\n`,
                e
              )
            }
          })
          if (this === socketTasks[0] && globalEvent[name]) {
            UniServiceJSBridge.invokeOnCallback(globalEvent[name], res)
          }
          if (name === 'error' || name === 'close') {
            const index = socketTasks.indexOf(this)
            if (index >= 0) {
              socketTasks.splice(index, 1)
            }
          }
        })
      })
      const propertys: (keyof WebSocket)[] = [
        'CLOSED',
        'CLOSING',
        'CONNECTING',
        'OPEN',
        'readyState',
      ]
      propertys.forEach((property) => {
        Object.defineProperty(this, property, {
          get() {
            return webSocket[property]
          },
        })
      })
    } catch (e) {
      error = e
    }
    callback && callback(error, this)
  }

  /**
   * 发送
   * @param {any} data
   */
  send(options: UniApp.SendSocketMessageOptions) {
    const data = (options || {}).data
    const ws = <WebSocket>this._webSocket
    try {
      if (ws.readyState !== ws.OPEN) {
        throw new Error('SocketTask.readyState is not OPEN')
      }
      ws.send(data)
      callOptions(options, 'sendSocketMessage:ok')
    } catch (error) {
      callOptions(options, `sendSocketMessage:fail ${error}`)
    }
  }

  /**
   * 关闭
   * @param {number} code
   * @param {string} reason
   */
  close(options: UniApp.CloseSocketOptions = {}) {
    const ws = <WebSocket>this._webSocket
    try {
      const code = options.code || 1000
      const reason = options.reason
      if (isString(reason)) {
        ws.close(code, reason)
      } else {
        ws.close(code)
      }
      callOptions(options, 'closeSocket:ok')
    } catch (error) {
      callOptions(options, `closeSocket:fail ${error}`)
    }
  }
  onOpen(callback: (result: any) => void) {
    this._callbacks.open.push(callback)
  }
  onMessage(callback: (result: any) => void) {
    this._callbacks.message.push(callback)
  }
  onError(callback: (result: any) => void) {
    this._callbacks.error.push(callback)
  }
  onClose(callback: (result: any) => void) {
    this._callbacks.close.push(callback)
  }
}

export const connectSocket = defineTaskApi<API_TYPE_CONNECT_SOCKET>(
  API_CONNECT_SOCKET,
  ({ url, protocols }, { resolve, reject }) => {
    return new SocketTask(
      url,
      protocols,
      (error: Error, socketTask: SocketTask) => {
        if (error) {
          reject(error.toString())
          return
        }
        socketTasks.push(socketTask)
        resolve()
      }
    )
  },
  ConnectSocketProtocol,
  ConnectSocketOptions
)

function callSocketTask(
  socketTask: SocketTask,
  method: 'send' | 'close',
  option: any,
  resolve: Function,
  reject: Function
) {
  const fn = socketTask[method] as
    | (typeof socketTask)['send']
    | (typeof socketTask)['close']
  if (isFunction(fn)) {
    fn.call(
      socketTask,
      extend({}, option, {
        success() {
          resolve()
        },
        fail({ errMsg }: any) {
          reject(errMsg.replace('sendSocketMessage:fail ', ''))
        },
        complete: undefined,
      })
    )
  }
}

export const sendSocketMessage = defineAsyncApi<API_TYPE_SEND_SOCKET_MESSAGE>(
  API_SEND_SOCKET_MESSAGE,
  (options, { resolve, reject }) => {
    const socketTask = socketTasks[0]
    if (socketTask && socketTask.readyState === socketTask.OPEN) {
      callSocketTask(socketTask, 'send', options, resolve, reject)
    } else {
      reject('WebSocket is not connected')
    }
  },
  SendSocketMessageProtocol
)

export const closeSocket = defineAsyncApi<API_TYPE_CLOSE_SOCKET>(
  API_CLOSE_SOCKET,
  (options, { resolve, reject }) => {
    const socketTask = socketTasks[0]
    if (socketTask) {
      callSocketTask(socketTask, 'close', options, resolve, reject)
    } else {
      reject('WebSocket is not connected')
    }
  },
  CloseSocketProtocol
)

function on(event: eventName) {
  const api = `onSocket${capitalize(event)}`
  return defineOnApi(api, () => {
    globalEvent[event] = api
  })
}

export const onSocketOpen = /*#__PURE__*/ on('open')

export const onSocketError = /*#__PURE__*/ on('error')

export const onSocketMessage = /*#__PURE__*/ on('message')

export const onSocketClose = /*#__PURE__*/ on('close')
