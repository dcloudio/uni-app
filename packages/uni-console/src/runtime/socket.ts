import type { SocketTask } from '@dcloudio/uni-app-x/types/uni'

declare global {
  const SocketTask: SocketTask
}

const SOCKET_HOSTS = process.env.UNI_SOCKET_HOSTS // 日志通道IP列表，需要尝试哪一个
const SOCKET_PORT = process.env.UNI_SOCKET_PORT // 日志通道端口
const SOCKET_ID = process.env.UNI_SOCKET_ID // 日志通道ID

export const hasRuntimeSocket = SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID

export async function initRuntimeSocket() {
  if (!hasRuntimeSocket) return
  // 同时并发尝试所有，哪个成功，就使用哪个
  return Promise.race(
    SOCKET_HOSTS!.split(',').map((host) => tryConnectSocket(host))
  )
}

function tryConnectSocket(host: string): Promise<SocketTask | null> {
  return new Promise((resolve, reject) => {
    const socket = uni.connectSocket({
      url: `ws://${host}:${SOCKET_PORT}/${SOCKET_ID}`,
      success() {
        resolve(socket)
      },
      fail() {
        reject(null)
      },
    })
  })
}
