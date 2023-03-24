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
import { requireNativePlugin } from '../plugin/requireNativePlugin'
import { base64ToArrayBuffer, arrayBufferToBase64 } from '@dcloudio/uni-api'
import { extend, capitalize, isArray, isFunction } from '@vue/shared'
import { callOptions } from '@dcloudio/uni-shared'

type MessageData = string | { '@type': string; base64: string }
type OnMessageArgs = { id: string; message: MessageData; data: MessageData }

type Socket = {
  send: ({ data }: { id: String; data: MessageData }) => void
  close: ({ code, reason }: { code?: number; reason?: string }) => void
  onopen: (cb: (args: { id: string }) => void) => void
  onmessage: (cb: (args: OnMessageArgs) => void) => void
  onerror: (cb: (args: { id: string; message: string }) => void) => void
  onclose: (
    cb: (args: {
      id: string
      code: number
      reason: string
      wasClean: boolean
    }) => void
  ) => void
  WebSocket: (args: {
    id: string
    url: string
    protocol?: string
    header?: any
  }) => void
}
type eventName = keyof WebSocketEventMap
const socketTasks: SocketTask[] = []
const socketsMap: Record<string, SocketTask> = {}
const globalEvent: Record<eventName, string> = {
  open: '',
  close: '',
  error: '',
  message: '',
}

let socket: Socket
function createSocketTask(args: UniApp.ConnectSocketOption) {
  const socketId = String(Date.now())
  let errMsg
  try {
    if (!socket) {
      socket = requireNativePlugin('uni-webSocket')
      bindSocketCallBack(socket)
    }
    socket.WebSocket({
      id: socketId,
      url: args.url,
      protocol: isArray(args.protocols)
        ? args.protocols.join(',')
        : args.protocols,
      header: args.header,
    })
  } catch (error: any) {
    errMsg = error
  }
  return { socket, socketId, errMsg }
}

function bindSocketCallBack(socket: Socket) {
  socket.onopen((e) => {
    const curSocket = socketsMap[e.id]
    if (!curSocket) return
    curSocket._socketOnOpen()
  })
  socket.onmessage((e) => {
    const curSocket = socketsMap[e.id]
    if (!curSocket) return
    curSocket._socketOnMessage(e)
  })
  socket.onerror((e) => {
    const curSocket = socketsMap[e.id]
    if (!curSocket) return
    curSocket._socketOnError()
  })
  socket.onclose((e) => {
    const { id, code, reason } = e
    const curSocket = socketsMap[id]
    if (!curSocket) return
    curSocket._socketOnClose({ code, reason })
  })
}

class SocketTask implements UniApp.SocketTask {
  private _callbacks: {
    open: Function[]
    close: Function[]
    error: Function[]
    message: Function[]
  }
  _socket: Socket
  id: string
  CLOSED: number
  CLOSING: number
  CONNECTING: number
  OPEN: number
  readyState: number
  constructor(socket: Socket, socketId: string) {
    this.id = socketId
    this._socket = socket
    this._callbacks = {
      open: [],
      close: [],
      error: [],
      message: [],
    }
    this.CLOSED = 3
    this.CLOSING = 2
    this.CONNECTING = 0
    this.OPEN = 1
    this.readyState = this.CLOSED

    if (!this._socket) return
  }

  _socketOnOpen() {
    this.readyState = this.OPEN
    this.socketStateChange('open')
  }

  _socketOnMessage(e: OnMessageArgs) {
    this.socketStateChange('message', {
      data:
        typeof e.data === 'object'
          ? base64ToArrayBuffer(e.data.base64)
          : e.data,
    })
  }

  _socketOnError() {
    this.socketStateChange('error')
    this.onErrorOrClose()
  }

  _socketOnClose(res: { code: number; reason: string }) {
    this.socketStateChange('close', res)
    this.onErrorOrClose()
  }

  onErrorOrClose() {
    this.readyState = this.CLOSED
    delete socketsMap[this.id]
    const index = socketTasks.indexOf(this)
    if (index >= 0) {
      socketTasks.splice(index, 1)
    }
  }

  socketStateChange(name: eventName, res: Data = {}) {
    const { code, reason } = res
    const data =
      name === 'message'
        ? { data: res.data }
        : name === 'close'
        ? { code, reason }
        : {}

    if (this === socketTasks[0] && globalEvent[name]) {
      UniServiceJSBridge.invokeOnCallback(globalEvent[name], data)
    }

    // WYQ fix: App平台修复websocket onOpen时发送数据报错的Bug
    this._callbacks[name].forEach((callback) => {
      if (isFunction(callback)) {
        callback(data)
      }
    })
  }

  send(args: UniApp.SendSocketMessageOptions, callopt: boolean = true) {
    if (this.readyState !== this.OPEN) {
      callOptions(args, 'sendSocketMessage:fail WebSocket is not connected')
    }
    try {
      this._socket.send({
        id: this.id,
        data:
          typeof args.data === 'object'
            ? {
                '@type': 'binary',
                base64: arrayBufferToBase64(args.data),
              }
            : args.data,
      })
      callopt && callOptions(args, 'sendSocketMessage:ok')
    } catch (error) {
      callopt && callOptions(args, `sendSocketMessage:fail ${error}`)
    }
  }

  close(args: UniApp.CloseSocketOptions, callopt: boolean = true) {
    this.readyState = this.CLOSING
    try {
      this._socket.close(
        extend({
          id: this.id,
          args,
        })
      )
      callopt && callOptions(args!, 'closeSocket:ok')
    } catch (error) {
      callopt && callOptions(args!, `closeSocket:fail ${error}`)
    }
  }

  onOpen(callback: Function) {
    this._callbacks.open.push(callback)
  }

  onClose(callback: Function) {
    this._callbacks.close.push(callback)
  }

  onError(callback: Function) {
    this._callbacks.error.push(callback)
  }

  onMessage(callback: Function) {
    this._callbacks.message.push(callback)
  }
}

export const connectSocket = defineTaskApi<API_TYPE_CONNECT_SOCKET>(
  API_CONNECT_SOCKET,
  ({ url, protocols, header, method }, { resolve, reject }) => {
    const { socket, socketId, errMsg } = createSocketTask({
      url,
      protocols,
      header,
      method,
    })
    const socketTask = new SocketTask(socket, socketId)
    if (errMsg) {
      setTimeout(() => {
        reject(errMsg)
      }, 0)
    } else {
      socketTasks.push(socketTask)
      socketsMap[socketId] = socketTask
    }
    setTimeout(() => {
      resolve()
    }, 0)
    return socketTask
  },
  ConnectSocketProtocol,
  ConnectSocketOptions
)

export const sendSocketMessage = defineAsyncApi<API_TYPE_SEND_SOCKET_MESSAGE>(
  API_SEND_SOCKET_MESSAGE,
  (args, { resolve, reject }) => {
    const socketTask = socketTasks[0]
    if (!socketTask || socketTask.readyState !== socketTask.OPEN) {
      reject('WebSocket is not connected')
      return
    }
    socketTask.send({ data: args.data }, false)
    resolve()
  },
  SendSocketMessageProtocol
)

export const closeSocket = defineAsyncApi<API_TYPE_CLOSE_SOCKET>(
  API_CLOSE_SOCKET,
  (args, { resolve, reject }) => {
    const socketTask = socketTasks[0]
    if (!socketTask) {
      reject('WebSocket is not connected')
      return
    }
    socketTask.readyState = socketTask.CLOSING
    socketTask.close(args, false)
    resolve()
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
