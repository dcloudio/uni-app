import { initRuntimeSocket } from './socket'
import { rewriteConsole, setSendConsole } from './console'
import { initOnError, setSendError } from './error'
import { originalConsole } from './console/utils'

export function initRuntimeSocketService(): Promise<boolean> {
  const hosts: string = process.env.UNI_SOCKET_HOSTS
  const port: string = process.env.UNI_SOCKET_PORT
  const id: string = process.env.UNI_SOCKET_ID
  if (!hosts || !port || !id) return Promise.resolve(false)
  // 百度小程序需要延迟初始化，不然会存在循环引用问题vendor.js
  const lazy = typeof swan !== 'undefined'
  // 重写需要同步，避免丢失早期日志信息
  let restoreError = lazy ? () => {} : initOnError()
  let restoreConsole = lazy ? () => {} : rewriteConsole()
  // 百度小程序需要异步初始化，不然调用 uni.connectSocket 会循环引入vendor.js
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError()
      restoreConsole = rewriteConsole()
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError()
        restoreConsole()
        originalConsole.error(
          wrapError('开发模式下日志通道建立 socket 连接失败。')
        )
        // @ts-expect-error
        if (__PLATFORM__ === 'mp') {
          originalConsole.error(
            wrapError('小程序平台，请勾选不校验合法域名配置。')
          )
        }
        originalConsole.error(
          wrapError('如果是运行到真机，请确认手机与电脑处于同一网络。')
        )
        return false
      }
      // @ts-expect-error
      if (__PLATFORM__ === 'mp') {
        initMiniProgramGlobalFlag()
      }
      socket.onClose(() => {
        if (process.env.UNI_DEBUG) {
          originalConsole.log(
            `uni-app:[${Date.now()}][socket]`,
            'connect close and restore'
          )
        }
        // @ts-expect-error
        if (__PLATFORM__ === 'mp') {
          originalConsole.error(
            wrapError(
              '开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。'
            )
          )
        } else {
          originalConsole.error(
            wrapError(
              '手机端日志通道 socket 连接已断开，请重启基座应用或重新运行。'
            )
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
  })
}

const ERROR_CHAR = '\u200C'

function wrapError(error: string) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`
}

function initMiniProgramGlobalFlag() {
  if (typeof wx !== 'undefined') {
    // @ts-expect-error
    wx.__uni_console__ = true
    // @ts-expect-error
  } else if (typeof my !== 'undefined') {
    // @ts-expect-error
    my.__uni_console__ = true
  } else if (typeof tt !== 'undefined') {
    tt.__uni_console__ = true
  } else if (typeof swan !== 'undefined') {
    swan.__uni_console__ = true
  } else if (typeof qq !== 'undefined') {
    qq.__uni_console__ = true
  } else if (typeof ks !== 'undefined') {
    ks.__uni_console__ = true
  } else if (typeof jd !== 'undefined') {
    jd.__uni_console__ = true
  } else if (typeof xhs !== 'undefined') {
    xhs.__uni_console__ = true
  } else if (typeof has !== 'undefined') {
    has.__uni_console__ = true
  } else if (typeof qa !== 'undefined') {
    qa.__uni_console__ = true
  }
}

initRuntimeSocketService()
