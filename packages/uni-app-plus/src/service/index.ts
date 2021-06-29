import * as uni from './api'
import { registerApp as __registerApp } from './framework/app'
import {
  definePage as __definePage,
  registerPage as __registerPage,
} from './framework/page'
// ;(uni as any).__$wx__ = uni
export default {
  uni,
  __definePage,
  __registerApp,
  __registerPage,
}
