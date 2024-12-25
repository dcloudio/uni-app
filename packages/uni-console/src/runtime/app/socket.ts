/// <reference types="@dcloudio/uni-app-x/types/uni/global" />
// 之所以又写了一份，是因为外层的socket，connectSocket的时候必须传入multiple:true
// 但是android又不能传入，目前代码里又不能写条件编译之类的。
export function initRuntimeSocket(
  hosts: string,
  port: string,
  id: string
): Promise<SocketTask | null> {
  if (hosts == '' || port == '' || id == '') return Promise.resolve(null)
  return hosts
    .split(',')
    .reduce<Promise<SocketTask | null>>(
      (
        promise: Promise<SocketTask | null>,
        host: string
      ): Promise<SocketTask | null> => {
        return promise.then((socket): Promise<SocketTask | null> => {
          if (socket != null) return Promise.resolve(socket)
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
      // @ts-expect-error
      socket.close({
        code: 1006,
        reason: 'connect timeout',
      } as CloseSocketOptions)
      resolve(null)
    }, SOCKET_TIMEOUT)

    socket.onOpen((e) => {
      clearTimeout(timer)
      resolve(socket)
    })
    socket.onClose((e) => {
      clearTimeout(timer)
      resolve(null)
    })
    socket.onError((e) => {
      clearTimeout(timer)
      resolve(null)
    })
  })
}
