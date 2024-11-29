import { initRuntimeSocket } from './socket'
import { originalConsole, rewriteConsole, setSendConsole } from './console'
import { initOnError, setSendError } from './error'

export function initRuntimeSocketService(): Promise<boolean> {
  const hosts: string = __UNI_SOCKET_HOSTS__
  const port: string = __UNI_SOCKET_PORT__
  const id: string = __UNI_SOCKET_ID__
  if (!hosts || !port || !id) return Promise.resolve(false)

  const restoreError = initOnError()
  const restoreConsole = rewriteConsole()
  return initRuntimeSocket(hosts, port, id).then((socket) => {
    if (!socket) {
      restoreError()
      restoreConsole()
      console.error('开发模式下日志通道建立连接失败')
      return false
    }
    socket.onClose(() => {
      if (process.env.UNI_DEBUG) {
        originalConsole.log(
          `uni-app:[${Date.now()}][socket]`,
          'connect close and restore'
        )
      }
      restoreError()
      restoreConsole()
    })
    setSendConsole((data: string) => {
      if (process.env.UNI_DEBUG) {
        originalConsole.log(`uni-app:[${Date.now()}][console]`, data)
      }
      socket!.send({
        data,
      })
    })
    setSendError((data: string) => {
      if (process.env.UNI_DEBUG) {
        originalConsole.log(`uni-app:[${Date.now()}][error]`, data)
      }
      socket!.send({
        data,
      })
    })
    return true
  })
}

// 异步初始化，不然部分平台调用 uni.connectSocket 会循环引入vendor.js，比如百度小程序
Promise.resolve().then(() => {
  initRuntimeSocketService()
})
