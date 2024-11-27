import type { SocketTask } from '@dcloudio/uni-app-x/types/uni'

let SOCKET_HOSTS = '' // 日志通道IP列表，需要尝试哪一个
let SOCKET_PORT = '' // 日志通道端口
let SOCKET_ID = '' // 日志通道ID

export function hasRuntimeSocket() {
  return !!(SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID)
}

export function initRuntimeSocket(): Promise<SocketTask | null> {
  SOCKET_HOSTS = __UNI_SOCKET_HOSTS__
  SOCKET_PORT = __UNI_SOCKET_PORT__
  SOCKET_ID = __UNI_SOCKET_ID__
  if (!hasRuntimeSocket()) return Promise.resolve(null)

  const hosts = SOCKET_HOSTS.split(',')

  return hosts.reduce(
    (promise: Promise<SocketTask | null>, host): Promise<SocketTask | null> => {
      return promise.then((socket) => {
        if (socket) return socket
        return tryConnectSocket(host)
      })
    },
    Promise.resolve(null)
  )
}

function tryConnectSocket(host: string): Promise<SocketTask | null> {
  return new Promise((resolve, reject) => {
    const socket = uni.connectSocket({
      url: `ws://${host}:${SOCKET_PORT}/${SOCKET_ID}`,
      timeout: 1000,
      fail() {
        resolve(null)
      },
    })
    socket.onOpen((e) => {
      // console.log(`socket 连接成功: ${host}`, e)
      resolve(socket)
    })
    socket.onClose((e) => {
      // console.error(`socket 连接关闭: ${host}`, e)
      resolve(null)
    })
    socket.onError((e) => {
      // console.error(`socket 连接失败: ${host}`, e)
      resolve(null)
    })
  })
}
