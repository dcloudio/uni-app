import * as uni from './api'
import { registerApp as __registerApp } from './framework/app'
import { registerPage as __registerPage } from './framework/page'
// ;(uni as any).__$wx__ = uni
export default {
  uni,
  __registerApp,
  __registerPage,
}
