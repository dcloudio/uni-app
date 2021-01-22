import {
  MiniProgramAppOptions,
  MiniProgramAppInstance,
} from '@dcloudio/uni-mp-core'

export function parse(appOptions: MiniProgramAppOptions) {
  // 百度 onShow 竟然会在 onLaunch 之前
  appOptions.onShow = function onShow(this: MiniProgramAppInstance, args) {
    if (!this.$vm) {
      this.onLaunch(args)
    }
    this.$vm!.$callHook('onShow', args)
  }
}
