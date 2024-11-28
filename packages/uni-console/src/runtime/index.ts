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
    setSendConsole((data: string) => {
      if (__DEV__) {
        originalConsole.log(`uni-app:[${Date.now()}][console]`, data)
      }
      socket!.send({
        data,
      })
    })
    setSendError((data: string) => {
      if (__DEV__) {
        originalConsole.log(`uni-app:[${Date.now()}][error]`, data)
      }
      socket!.send({
        data,
      })
    })
    return true
  })
}

initRuntimeSocketService()
