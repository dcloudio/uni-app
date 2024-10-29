import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreateComponent,
  initCreatePage,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parsePageOptions from '@dcloudio/uni-quickapp-webview/src/runtime/parsePageOptions'
import * as parseComponentOptions from '@dcloudio/uni-quickapp-webview/src/runtime/parseComponentOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parsePageOptions)
export const createComponent = initCreateComponent(parseComponentOptions)
export const createSubpackageApp = initCreateSubpackageApp()
;(has as any).EventChannel = EventChannel
;(has as any).createApp = (global as any).createApp = createApp
;(has as any).createPage = createPage
;(has as any).createComponent = createComponent
;(has as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
