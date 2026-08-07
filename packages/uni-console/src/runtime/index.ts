import { initRuntimeSocket } from './socket'
import { rewriteConsole, setSendConsole } from './console'
import { initOnError, setSendError } from './error'
import { originalConsole } from './console/utils'

declare const my: any

const UNI_CONSOLE_RUNTIME_PROMISE = '__uni_console_runtime_promise__'

type RuntimeGlobal = Record<string, Promise<boolean> | undefined>

export function initRuntimeSocketService(): Promise<boolean> {
  const hosts: string = process.env.UNI_SOCKET_HOSTS
  const port: string = process.env.UNI_SOCKET_PORT
  const id: string = process.env.UNI_SOCKET_ID
  if (!hosts || !port || !id) return Promise.resolve(false)
  const runtimeGlobal = getRuntimeGlobal()
  const existingPromise = runtimeGlobal?.[UNI_CONSOLE_RUNTIME_PROMISE]
  if (existingPromise) {
    return existingPromise
  }
  let runtimePromise = initRuntimeSocketServiceOnce(hosts, port, id)
  if (runtimeGlobal) {
    // 独立分包与主包可能各自打包一份 uni-console 运行时，用小程序全局对象避免重复建 socket、重复改写 console。
    runtimePromise = runtimePromise.then(
      (success) => {
        if (
          !success &&
          runtimeGlobal[UNI_CONSOLE_RUNTIME_PROMISE] === runtimePromise
        ) {
          delete runtimeGlobal[UNI_CONSOLE_RUNTIME_PROMISE]
        }
        return success
      },
      (error) => {
        if (runtimeGlobal[UNI_CONSOLE_RUNTIME_PROMISE] === runtimePromise) {
          delete runtimeGlobal[UNI_CONSOLE_RUNTIME_PROMISE]
        }
        throw error
      }
    )
    runtimeGlobal[UNI_CONSOLE_RUNTIME_PROMISE] = runtimePromise
  }
  return runtimePromise
}

function initRuntimeSocketServiceOnce(
  hosts: string,
  port: string,
  id: string
): Promise<boolean> {
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

function getRuntimeGlobal(): RuntimeGlobal | undefined {
  const miniProgramGlobal = getMiniProgramGlobal()
  if (miniProgramGlobal) {
    return miniProgramGlobal
  }
  if (typeof globalThis !== 'undefined') {
    return globalThis as any
  }
}

function getMiniProgramGlobal(): Record<string, any> | undefined {
  if (typeof wx !== 'undefined') {
    return wx as any
  } else if (typeof my !== 'undefined') {
    return my as any
  } else if (typeof tt !== 'undefined') {
    return tt as any
  } else if (typeof swan !== 'undefined') {
    return swan as any
  } else if (typeof qq !== 'undefined') {
    return qq as any
  } else if (typeof ks !== 'undefined') {
    return ks as any
  } else if (typeof jd !== 'undefined') {
    return jd as any
  } else if (typeof xhs !== 'undefined') {
    return xhs as any
  } else if (typeof has !== 'undefined') {
    return has as any
  } else if (typeof qa !== 'undefined') {
    return qa as any
  }
}

function initMiniProgramGlobalFlag() {
  const miniProgramGlobal = getMiniProgramGlobal()
  if (miniProgramGlobal) {
    miniProgramGlobal.__uni_console__ = true
  }
}

initRuntimeSocketService()
