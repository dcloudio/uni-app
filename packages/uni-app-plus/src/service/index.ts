import * as uni from './api'
import { UniServiceJSBridge } from './bridge'
import { registerApp as __registerApp } from './framework/app'
import {
  definePage as __definePage,
  registerPage as __registerPage,
} from './framework/page'
import __vuePlugin from './framework/plugin'
// ;(uni as any).__$wx__ = uni

export default {
  uni,
  __vuePlugin,
  __definePage,
  __registerApp,
  __registerPage,
  UniServiceJSBridge,
}
