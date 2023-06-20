import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-base-parser'

import {
  initRefs
} from '../../../mp-weixin/runtime/wrapper/util'

import {
  mocks
} from './util'

export default function parseApp (vm) {
  // 百度 onShow 竟然会在 onLaunch 之前
  const appOptions = parseBaseApp(vm, {
    mocks,
    initRefs
  })
  appOptions.onShow = function onShow (args) {
    if (!this.$vm) {
      this.onLaunch(args)
    }
    this.$vm.__call_hook('onShow', args)
  }
  return appOptions
}
