import parseBaseApp from './app-base-parser'

import {
  mocks,
  initRefs
} from './util'

export default function parseApp (vm) {
  return parseBaseApp(vm, {
    mocks,
    initRefs
  })
}
