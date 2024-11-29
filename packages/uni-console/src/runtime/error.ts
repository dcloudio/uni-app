import type { SendFn } from './utils'

let sendError: SendFn = null

const errorQueue: string[] = []

function sendErrorMessages(errors: string[]) {
  if (sendError == null) {
    errorQueue.push(...errors)
    return
  }
  sendError(JSON.stringify({ type: 'error', data: errors }))
}

export function setSendError(value: SendFn) {
  sendError = value
  if (value != null && errorQueue.length > 0) {
    const errors = errorQueue.slice()
    errorQueue.length = 0
    sendErrorMessages(errors)
  }
}

export function initOnError() {
  function onError(error: unknown) {
    // 小红书小程序 socket.send 时，会报错，onError错误信息为：
    // Cannot create property 'errMsg' on string 'taskId'
    // 导致陷入死循环
    if (
      typeof PromiseRejectionEvent !== 'undefined' &&
      error instanceof PromiseRejectionEvent &&
      error.reason instanceof Error &&
      error.reason.message.includes(
        `Cannot create property 'errMsg' on string 'taskId`
      )
    ) {
      return
    }
    if (error instanceof Error && error.stack) {
      sendErrorMessages([error.stack])
    } else {
      sendErrorMessages([String(error)])
    }
  }
  // TODO 是否需要监听 uni.onUnhandledRejection？
  if (typeof uni.onError === 'function') {
    uni.onError(onError)
  }
  return function offError() {
    if (typeof uni.offError === 'function') {
      uni.offError(onError)
    }
  }
}
