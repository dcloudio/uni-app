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
