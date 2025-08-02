import { initUni } from '@dcloudio/uni-mp-core'
import { initWx } from '../../api/wx'
import * as shims from '../../api/shims'
import * as protocols from '../../api/protocols'
export const wx = initWx()
export default initUni(shims, protocols, wx)

declare const worker: UniNamespace.Worker
export class WorkerTaskImpl {
  constructor() {
    worker.onMessage = (e) => {
      this.onMessage(e.data)
    }
  }
  entry(): void {}
  onMessage(message: Object): void {}
  postMessage(message: Object): void {
    worker.postMessage(message)
  }
}
