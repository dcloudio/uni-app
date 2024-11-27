import { hasRuntimeSocket, initRuntimeSocket } from './socket'
import { rewriteConsole, setSendConsole } from './console'
import { initOnError } from './error'

export function initRuntimeSocketService(): Promise<boolean> {
  if (!hasRuntimeSocket) return Promise.resolve(false)

  const restoreError = initOnError()
  const restoreConsole = rewriteConsole()
  return initRuntimeSocket().then((socket) => {
    if (!socket) {
      restoreError()
      restoreConsole()
      console.error('开发模式下日志通道建立连接失败')
      return false
    }
    setSendConsole((data: string) => {
      socket!.send({
        data,
      })
    })
    return true
  })
}

initRuntimeSocketService()
