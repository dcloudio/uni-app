import {
  initCreateApp,
  initCreatePage,
  initCreateComponent,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parseOptions from './parseOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parseOptions)
export const createComponent = initCreateComponent(parseOptions)
;(wx as any).createApp = (global as any).createApp = createApp
;(wx as any).createPage = createPage
;(wx as any).createComponent = createComponent
