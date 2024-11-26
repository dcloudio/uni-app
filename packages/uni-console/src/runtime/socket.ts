import type { SocketTask } from '@dcloudio/uni-app-x/types/uni'

declare global {
  const SocketTask: SocketTask
  const __UNI_SOCKET_HOSTS__: string
  const __UNI_SOCKET_PORT__: string
  const __UNI_SOCKET_ID__: string
}

const SOCKET_HOSTS = __UNI_SOCKET_HOSTS__ // 日志通道IP列表，需要尝试哪一个
const SOCKET_PORT = __UNI_SOCKET_PORT__ // 日志通道端口
const SOCKET_ID = __UNI_SOCKET_ID__ // 日志通道ID

export const hasRuntimeSocket = SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID

export function initRuntimeSocket(): Promise<SocketTask | null> {
  if (!hasRuntimeSocket) return Promise.resolve(null)

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
        reject(null)
      },
    })
    socket.onOpen((e) => {
      // console.log(`socket 连接成功: ${host}`, e)
      resolve(socket)
    })
    socket.onClose((e) => {
      // console.error(`socket 连接关闭: ${host}`, e)
      reject(null)
    })
    socket.onError((e) => {
      // console.error(`socket 连接失败: ${host}`, e)
      reject(null)
    })
  })
}
