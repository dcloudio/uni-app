import 'uni-platform/runtime/index'

import parseApp from 'uni-platform/runtime/wrapper/app-parser'

export function createApp (vm) {
  App(parseApp(vm))
  return vm
}
