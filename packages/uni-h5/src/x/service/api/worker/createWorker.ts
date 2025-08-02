import { defineSyncApi } from '@dcloudio/uni-api'
type WorkerInterface = ReturnType<typeof uni.createWorker>

const API_CREATE_WORKER = 'createWorker'
const MESSAGE_EVENT = '__uni_web_worker_message'
const ERROR_EVENT = '__uni_web_worker_error'

export const createWorker = defineSyncApi(
  API_CREATE_WORKER,
  (url: string): WorkerInterface => {
    const threadWorker = new Worker(url)

    threadWorker.onmessage = (event) => {
      uni.$emit(MESSAGE_EVENT, event.data)
    }
    threadWorker.onmessageerror = (error) => {
      uni.$emit(ERROR_EVENT, error.data)
    }
    // onerror 触发后，会销毁 worker 实例
    threadWorker.onerror = (error) => {
      uni.$emit(
        ERROR_EVENT,
        `${error.message} in ${error.filename}(${error.lineno}:${error.colno})`
      )
    }

    class WorkerImpl implements WorkerInterface {
      _threadWorker: Worker
      constructor() {
        this._threadWorker = threadWorker
      }

      onMessage(listener: UniNamespace.WorkerOnMessageCallback): void {
        uni.$on(MESSAGE_EVENT, listener)
      }
      onError(listener: UniNamespace.WorkerOnErrorCallback): void {
        uni.$on(ERROR_EVENT, listener)
      }
      postMessage(
        message: Object,
        options: UniNamespace.WorkerOptions | null = null
      ): void {
        this._threadWorker.postMessage(
          message,
          (options?.transfer as Transferable[]) ?? undefined
        )
      }
      terminate(): void {
        uni.$off(MESSAGE_EVENT)
        uni.$off(ERROR_EVENT)
        this._threadWorker.terminate()
      }
    }
    return new WorkerImpl()
  }
)

export class WorkerTaskImpl {
  constructor() {
    self.onmessage = (e) => {
      this.onMessage(e.data)
    }
  }

  entry(): void {}

  onMessage(message: Object): void {}

  postMessage(
    message: Object,
    options: WindowPostMessageOptions | null = null
  ): void {
    let _options: WindowPostMessageOptions | undefined = undefined
    if (options?.transfer && options.transfer.length > 0) {
      _options = {
        transfer: options.transfer as Transferable[],
      }
    }
    self.postMessage(message, _options)
  }
}
