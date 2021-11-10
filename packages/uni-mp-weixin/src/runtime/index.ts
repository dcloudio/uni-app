import {
  initCreateApp,
  initCreatePage,
  initCreateComponent,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parseOptions from './parseOptions'

export const createApp = initCreateApp()
export const createPage = initCreatePage(parseOptions)
export const createComponent = initCreateComponent(parseOptions)
export const createSubpackageApp = initCreateSubpackageApp()
;(wx as any).createApp = (global as any).createApp = createApp
;(wx as any).createPage = createPage
;(wx as any).createComponent = createComponent
;(wx as any).createSubpackageApp = createSubpackageApp
