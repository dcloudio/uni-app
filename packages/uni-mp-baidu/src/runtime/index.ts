import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreateComponent,
  initCreatePage,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parseAppOptions from './parseAppOptions'
import * as parsePageOptions from './parsePageOptions'
import * as parseComponentOptions from './parseComponentOptions'

export const createApp = initCreateApp(parseAppOptions)
export const createPage = initCreatePage(parsePageOptions)
export const createComponent = initCreateComponent(parseComponentOptions)
export const createSubpackageApp = initCreateSubpackageApp(parseAppOptions)
;(swan as any).EventChannel = EventChannel
;(swan as any).createApp = (global as any).createApp = createApp
;(swan as any).createPage = createPage
;(swan as any).createComponent = createComponent
;(swan as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
