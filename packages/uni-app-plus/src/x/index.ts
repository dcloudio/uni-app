import * as uni from './api/index'
import { getApp, registerApp as __registerApp } from './framework/app'
import {
  getCurrentPages,
  definePage as __definePage,
} from '../service/framework/page'

export default {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
}
