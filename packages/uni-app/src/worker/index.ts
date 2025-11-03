// @ts-expect-error
export * from '@dcloudio/uni-uts-v1/lib/javascript/lib/runtime/uts.js'

declare const worker: UniNamespace.Worker
declare const __WEB__: boolean
declare const __MP__: boolean

export class WorkerTaskImpl {
  constructor() {
    if (__WEB__) {
      self.onmessage = (e) => {
        this.onMessage(e.data)
      }
    }
    if (__MP__) {
      worker.onMessage((e) => {
        this.onMessage(e)
      })
    }
  }

  entry(): void {}

  onMessage(message: Object): void {}

  postMessage(
    message: Object,
    options: WindowPostMessageOptions | null = null
  ): void {
    if (__WEB__) {
      let _options: WindowPostMessageOptions | undefined = undefined
      if (options?.transfer && options.transfer.length > 0) {
        _options = {
          transfer: options.transfer as Transferable[],
        }
      }
      self.postMessage(message, _options)
    }

    if (__MP__) {
      worker.postMessage(message)
    }
  }
}

// @ts-expect-error
globalThis.WorkerTaskImpl = WorkerTaskImpl
