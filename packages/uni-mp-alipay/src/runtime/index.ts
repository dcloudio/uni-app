import { EventChannel } from '@dcloudio/uni-shared'

import {
  initCreateApp,
  initCreatePluginApp,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import * as parseAppOptions from './parseAppOptions'

import { initCreatePage } from './createPage'
import { initCreateComponent } from './createComponent'
export const createApp = initCreateApp(parseAppOptions)
export const createPage = initCreatePage()
export const createComponent = initCreateComponent()
export const createPluginApp = initCreatePluginApp(parseAppOptions)
export const createSubpackageApp = initCreateSubpackageApp(parseAppOptions)
;(my as any).EventChannel = EventChannel
;(my as any).createApp = createApp
;(my as any).createPage = createPage
;(my as any).createComponent = createComponent
;(my as any).createPluginApp = createPluginApp
;(my as any).createSubpackageApp = createSubpackageApp
