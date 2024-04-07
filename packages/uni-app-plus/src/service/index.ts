import * as uni from './api'
import { UniServiceJSBridge } from './bridge'
import { registerApp as __registerApp, getApp } from './framework/app'
import {
  definePage as __definePage,
  registerPage as __registerPage,
  getCurrentPages,
} from './framework/page'

export default {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
  __registerPage,
  UniServiceJSBridge,
}
