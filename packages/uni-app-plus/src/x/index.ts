import * as uni from './api/index'
import { registerApp as __registerApp, getApp, initApp } from './framework/app'
import {
  definePage as __definePage,
  getCurrentPages,
} from '../service/framework/page'
import * as components from './components'

export default {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
  initApp,
  components,
}
