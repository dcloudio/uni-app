import { originalConsole } from './console'
import type { SendFn } from './utils'

let sendError: SendFn = null

// App.onError会监听到两类错误，一类是小程序自身抛出的，一类是 vue 的 errorHandler 触发的
// uni.onError 和 App.onError 会同时监听到错误(主要是App.onError监听之前的错误)，所以需要用 Set 来去重
// uni.onError 会在 App.onError 上边同时增加监听，因为要监听 vue 的errorHandler
// 目前 vue 的 errorHandler 仅会callHook('onError')，所以需要把uni.onError的也挂在 App.onError 上
const errorQueue: Set<any> = new Set()

function sendErrorMessages(errors: any[]) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error)
    })
    return
  }

  sendError(
    JSON.stringify({
      type: 'error',
      data: errors.map((err) => {
        const isPromiseRejection = err && 'promise' in err && 'reason' in err
        const prefix = isPromiseRejection ? 'UnhandledPromiseRejection: ' : ''
        if (isPromiseRejection) {
          err = err.reason
        }
        if (err instanceof Error && err.stack) {
          return prefix + err.stack
        }
        return prefix + String(err)
      }),
    })
  )
}

export function setSendError(value: SendFn) {
  sendError = value
  if (value != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue)
    errorQueue.clear()
    sendErrorMessages(errors)
  }
}

export function initOnError() {
  function onError(error: any) {
    try {
      // 小红书小程序 socket.send 时，会报错，onError错误信息为：
      // Cannot create property 'errMsg' on string 'taskId'
      // 导致陷入死循环
      if (
        typeof PromiseRejectionEvent !== 'undefined' &&
        error instanceof PromiseRejectionEvent &&
        error.reason instanceof Error &&
        error.reason.message &&
        error.reason.message.includes(
          `Cannot create property 'errMsg' on string 'taskId`
        )
      ) {
        return
      }

      if (__UNI_CONSOLE_KEEP_ORIGINAL__) {
        originalConsole.error(error)
      }
      sendErrorMessages([error])
    } catch (err) {
      originalConsole.error(err)
    }
  }

  if (typeof uni.onError === 'function') {
    uni.onError(onError)
  }
  if (typeof uni.onUnhandledRejection === 'function') {
    uni.onUnhandledRejection(onError)
  }
  return function offError() {
    if (typeof uni.offError === 'function') {
      uni.offError(onError)
    }
    if (typeof uni.offUnhandledRejection === 'function') {
      uni.offUnhandledRejection(onError)
    }
  }
}
