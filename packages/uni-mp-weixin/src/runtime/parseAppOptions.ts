import type { MiniProgramAppOptions } from '@dcloudio/uni-mp-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'

interface UniAppRestartOptions {
  url?: string
}

export function parse(appOptions: MiniProgramAppOptions) {
  appOptions.restart = function restart(options: UniAppRestartOptions = {}) {
    wx.restartMiniProgram({
      path: options.url || addLeadingSlash(wx.getLaunchOptionsSync().path),
    })
  }
}
