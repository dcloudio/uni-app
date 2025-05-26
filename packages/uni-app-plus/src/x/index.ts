import * as uni from './api/index'
import { registerApp as __registerApp, initApp } from './framework/app'
import {
  definePage as __definePage,
  getCurrentPages,
} from '../service/framework/page'
import * as components from './components'

import {
  registerSystemRoute as __registerSystemRoute,
  systemRoutes as __uniSystemRoutes,
} from './framework/route'

import {
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
} from '@dcloudio/uni-api'

export {
  uni,
  getCurrentPages,
  __definePage,
  __registerApp,
  __uniSystemRoutes,
  __registerSystemRoute,
  initApp,
  components,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
}
