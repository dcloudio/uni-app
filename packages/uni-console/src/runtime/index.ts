import { hasRuntimeSocket, initRuntimeSocket } from './socket'
import { rewriteConsole, setSend } from './console'

export function initConsole(): Promise<boolean> {
  if (!hasRuntimeSocket) return Promise.resolve(false)

  const restoreConsole = rewriteConsole()
  return initRuntimeSocket().then((socket) => {
    if (!socket) {
      restoreConsole()
      console.error('开发模式下日志通道建立连接失败')
      return false
    }
    setSend((msgs: any) => {
      socket!.send({
        data: {
          type: 'console',
          data: msgs,
        },
      })
    })
    return true
  })
}

initConsole()
