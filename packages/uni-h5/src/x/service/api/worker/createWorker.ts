import { $emit, $off, $on, defineSyncApi } from '@dcloudio/uni-api'
import { getRealPath } from '@dcloudio/uni-platform'
type WorkerInterface = ReturnType<typeof uni.createWorker>

const API_CREATE_WORKER = 'createWorker'
const MESSAGE_EVENT = '__UNI_WEB_WORKER_MESSAGE'
const ERROR_EVENT = '__UNI_WEB_WORKER_ERROR'

let id = 0

export const createWorker = defineSyncApi(
  API_CREATE_WORKER,
  (url: string): WorkerInterface => {
    const MESSAGE_EVENT_NAME = `${MESSAGE_EVENT}_${id}`
    const ERROR_EVENT_NAME = `${ERROR_EVENT}_${id}`
    id++
    const threadWorker = new Worker(
      getRealPath(url.startsWith('/') ? url : '/' + url),
      {
        type: 'module',
      }
    )

    threadWorker.onmessage = (event) => {
      $emit(MESSAGE_EVENT_NAME, event.data)
    }
    threadWorker.onmessageerror = (error) => {
      $emit(ERROR_EVENT_NAME, error.data)
    }
    // onerror 触发后，会销毁 worker 实例
    threadWorker.onerror = (error) => {
      $emit(
        ERROR_EVENT_NAME,
        `${error.message} in ${error.filename}(${error.lineno}:${error.colno})`
      )
    }

    class WorkerImpl implements WorkerInterface {
      _threadWorker: Worker
      constructor() {
        this._threadWorker = threadWorker
      }

      onMessage(listener: UniNamespace.WorkerOnMessageCallback): void {
        $on(MESSAGE_EVENT_NAME, listener)
      }
      onError(listener: UniNamespace.WorkerOnErrorCallback): void {
        $on(ERROR_EVENT_NAME, listener)
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
        $off(MESSAGE_EVENT_NAME)
        $off(ERROR_EVENT_NAME)
        this._threadWorker.terminate()
      }
    }
    return new WorkerImpl()
  }
)
