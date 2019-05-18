import 'uni-platform/runtime/index'

import parseApp from 'uni-platform/runtime/wrapper/app-parser'

export default function createApp (vm) {
  App(parseApp(vm))
  return vm
}
