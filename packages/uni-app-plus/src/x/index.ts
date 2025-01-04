import * as uni from './api/index'
import { registerApp as __registerApp, initApp } from './framework/app'
import {
  definePage as __definePage,
  getCurrentPages,
} from '../service/framework/page'
import * as components from './components'

import { registerSystemRoute } from './framework/route'
import { systemRoutes as __uniSystemRoutes } from './framework/route'

import UniChooseLocationPage from '@dcloudio/uni-ext-api/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue'
registerSystemRoute('uni:chooseLocation', UniChooseLocationPage, {
  disableSwipeBack: false,
})

import UniActionSheetPage from '@dcloudio/uni-ext-api/uni-actionSheet/pages/actionSheet/actionSheet.vue'
registerSystemRoute('uni:actionSheet', UniActionSheetPage, {
  disableSwipeBack: false,
})
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
  initApp,
  components,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
}
