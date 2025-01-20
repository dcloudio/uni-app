import { initRuntimeSocket } from './socket'

export function initRuntimeSocketService(): Promise<boolean> {
  const hosts: string = process.env.UNI_SOCKET_HOSTS
  const port: string = process.env.UNI_SOCKET_PORT
  const id: string = process.env.UNI_SOCKET_ID
  if (hosts == '' || port == '' || id == '') return Promise.resolve(false)
  let socketTask: SocketTask | null = null
  __registerWebViewUniConsole(
    (): string => {
      return process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE
    },
    (data: string) => {
      socketTask?.send({
        data,
      } as SendSocketMessageOptions)
    }
  )
  return Promise.resolve()
    .then((): Promise<boolean> => {
      return initRuntimeSocket(hosts, port, id).then((socket): boolean => {
        if (socket == null) {
          return false
        }
        socketTask = socket
        return true
      })
    })
    .catch((): boolean => {
      return false
    })
}

initRuntimeSocketService()
