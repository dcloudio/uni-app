import { EventChannel } from '@dcloudio/uni-shared'
import {
  initCreateApp,
  initCreatePage,
  initCreateComponent,
} from '@dcloudio/uni-mp-core'
import '@dcloudio/uni-mp-polyfill'

import parsePageOptions from './parsePageOptions'
import parseComponentOptions from './parseComponentOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parsePageOptions)
export const createComponent = initCreateComponent(parseComponentOptions)
;(ks as any).EventChannel = EventChannel
;(ks as any).createApp = (global as any).createApp = createApp
;(ks as any).createPage = createPage
;(ks as any).createComponent = createComponent
