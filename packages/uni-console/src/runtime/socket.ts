import type { SocketTask } from '@dcloudio/uni-app-x/types/uni'
import { originalConsole } from './console'

export function initRuntimeSocket(
  hosts: string,
  port: string,
  id: string
): Promise<SocketTask | null> {
  if (!hosts || !port || !id) return Promise.resolve(null)
  return hosts
    .split(',')
    .reduce(
      (
        promise: Promise<SocketTask | null>,
        host: string
      ): Promise<SocketTask | null> => {
        return promise.then((socket) => {
          if (socket) return socket
          return tryConnectSocket(host, port, id)
        })
      },
      Promise.resolve(null)
    )
}

const SOCKET_TIMEOUT = 500
function tryConnectSocket(
  host: string,
  port: string,
  id: string
): Promise<SocketTask | null> {
  return new Promise((resolve, reject) => {
    const socket = uni.connectSocket({
      url: `ws://${host}:${port}/${id}`,
      fail() {
        resolve(null)
      },
    })
    const timer = setTimeout(() => {
      if (__DEV__) {
        originalConsole.log(
          `uni-app:[${Date.now()}][socket]`,
          `connect timeout: ${host}`
        )
      }
      socket.close({
        code: 1006,
        reason: 'connect timeout',
      })
      resolve(null)
    }, SOCKET_TIMEOUT)

    socket.onOpen((e) => {
      if (__DEV__) {
        originalConsole.log(
          `uni-app:[${Date.now()}][socket]`,
          `connect success: ${host}`,
          e
        )
      }
      clearTimeout(timer)
      resolve(socket)
    })
    socket.onClose((e) => {
      if (__DEV__) {
        originalConsole.log(
          `uni-app:[${Date.now()}][socket]`,
          `connect close: ${host}`,
          e
        )
      }
      clearTimeout(timer)
      resolve(null)
    })
    socket.onError((e) => {
      if (__DEV__) {
        originalConsole.log(
          `uni-app:[${Date.now()}][socket]`,
          `connect error: ${host}`,
          e
        )
      }
      clearTimeout(timer)
      resolve(null)
    })
  })
}
