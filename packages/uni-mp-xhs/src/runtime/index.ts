import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreateComponent,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'
import '@dcloudio/uni-mp-polyfill'

import { initCreatePage } from './createPage'
import * as parseComponentOptions from './parseComponentOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage()
export const createComponent = initCreateComponent(parseComponentOptions)
export const createSubpackageApp = initCreateSubpackageApp()
;(xhs as any).EventChannel = EventChannel
;(xhs as any).createApp = (global as any).createApp = createApp
;(xhs as any).createPage = createPage
;(xhs as any).createComponent = createComponent
;(xhs as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
