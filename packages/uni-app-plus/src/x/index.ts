import * as uni from './api/index'
import { registerApp as __registerApp, getApp, initApp } from './framework/app'
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

export {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
  __uniSystemRoutes,
  initApp,
  components,
}
