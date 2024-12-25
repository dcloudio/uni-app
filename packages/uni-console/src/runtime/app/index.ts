import { initRuntimeSocket } from './socket'

export function initRuntimeSocketService(): Promise<boolean> {
  const hosts: string = process.env.UNI_SOCKET_HOSTS
  const port: string = process.env.UNI_SOCKET_PORT
  const id: string = process.env.UNI_SOCKET_ID
  if (hosts == '' || port == '' || id == '') return Promise.resolve(false)
  let socketTask: SocketTask | null = null
  let webviewCode: string | null = null
  __registerWebViewUniConsole(
    (): string => {
      if (process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE) {
        return process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE
      }
      if (webviewCode == null) {
        try {
          webviewCode = uni
            .getFileSystemManager()
            .readFileSync('__uniwebview.js', 'utf-8') as string
        } catch (e) {
          webviewCode = ''
        }
      }
      return webviewCode!
    },
    (data: string) => {
      socketTask?.send({
        data,
      } as SendSocketMessageOptions)
    }
  )
  return Promise.resolve().then((): Promise<boolean> => {
    return initRuntimeSocket(hosts, port, id).then((socket): boolean => {
      if (socket == null) {
        return false
      }
      socketTask = socket
      return true
    })
  })
}

initRuntimeSocketService()
