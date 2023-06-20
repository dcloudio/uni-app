import {
  initHooks
} from 'uni-wrapper/util'

import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-parser'

const hooks = [
  'onUniNViewMessage'
]

export default function parseApp (vm) {
  const appOptions = parseBaseApp(vm)

  initHooks(appOptions, hooks)

  return appOptions
}
