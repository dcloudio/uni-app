import * as uni from './api/index'
import { registerApp as __registerApp, initApp } from './framework/app'
import {
  definePage as __definePage,
  getCurrentPages,
} from '../service/framework/page'
import * as components from './components'

import { systemRoutes as __uniSystemRoutes } from './framework/route'
import { registerSystemPages } from './pages'
import {
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
} from '@dcloudio/uni-api'

registerSystemPages()

export {
  uni,
  getCurrentPages,
  __definePage,
  __registerApp,
  __uniSystemRoutes,
  initApp,
  components,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
}
