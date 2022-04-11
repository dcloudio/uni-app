import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreatePage,
  initCreateComponent,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parsePageOptions from './parsePageOptions'
import * as parseComponentOptions from './parseComponentOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parsePageOptions)
export const createComponent = initCreateComponent(parseComponentOptions)
export const createSubpackageApp = initCreateSubpackageApp()
;(qa as any).EventChannel = EventChannel
;(qa as any).createApp = (global as any).createApp = createApp
;(qa as any).createPage = createPage
;(qa as any).createComponent = createComponent
;(qa as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
