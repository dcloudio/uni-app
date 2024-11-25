import { hasRuntimeSocket, initRuntimeSocket } from './socket'
import { rewriteConsole, setSend } from './console'

export async function initConsole() {
  if (!hasRuntimeSocket) return
  const restoreConsole = rewriteConsole()
  const socket = await initRuntimeSocket()
  if (!socket) {
    restoreConsole()
    console.error('开发模式下日志通道连接失败')
    return
  }

  function send(msg: any) {
    socket!.send({
      data: {
        type: 'console',
        data: msg,
      },
    })
  }

  socket.onOpen(() => {
    setSend(send)
  })
  socket.onClose(() => {
    setSend(null)
  })
}

initConsole()
