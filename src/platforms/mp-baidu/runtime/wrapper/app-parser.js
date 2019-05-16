import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-base-parser'

import {
  initRefs
} from '../../../mp-weixin/runtime/wrapper/util'

import {
  mocks
} from './util'

export default function parseApp (vm) {
  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}
