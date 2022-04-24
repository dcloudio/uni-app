import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreatePage,
  initCreateComponent,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'
import '@dcloudio/uni-mp-polyfill'

import parsePageOptions from './parsePageOptions'
import parseComponentOptions from './parseComponentOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parsePageOptions)
export const createComponent = initCreateComponent(parseComponentOptions)
export const createSubpackageApp = initCreateSubpackageApp()
;(ks as any).EventChannel = EventChannel
;(ks as any).createApp = (global as any).createApp = createApp
;(ks as any).createPage = createPage
;(ks as any).createComponent = createComponent
;(ks as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
