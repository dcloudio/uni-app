import { Emitter } from '@dcloudio/uni-shared'

export class UniEventBus {
  private $emitter = new Emitter()
  on(name: string, callback: Function) {
    this.$emitter.on(name, callback)
  }
  once(name: string, callback: Function) {
    this.$emitter.once(name, callback)
  }
  off(name?: string, callback?: Function | null) {
    if (!name) {
      this.$emitter.e = {}
      return
    }
    this.$emitter.off(name, callback)
  }
  emit(name: string, ...args: any[]) {
    this.$emitter.emit(name, ...args)
  }
}
