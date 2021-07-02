import * as uni from './api'
import { UniServiceJSBridge } from './bridge'
import { getApp, registerApp as __registerApp } from './framework/app'
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
