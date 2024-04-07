import type {
  MiniProgramAppInstance,
  MiniProgramAppOptions,
} from '@dcloudio/uni-mp-core'
import { ON_SHOW } from '@dcloudio/uni-shared'

export function parse(appOptions: MiniProgramAppOptions) {
  // 百度 onShow 竟然会在 onLaunch 之前
  appOptions.onShow = function onShow(this: MiniProgramAppInstance, args) {
    if (!this.$vm) {
      this.onLaunch(args)
    }
    this.$vm!.$callHook(ON_SHOW, args)
  }
}
