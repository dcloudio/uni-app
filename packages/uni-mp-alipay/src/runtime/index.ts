import { EventChannel } from '@dcloudio/uni-shared'

import {
  initCreateApp,
  initCreateIndependentSubpackageApp,
  initCreatePluginApp,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import './polyfill'

import * as parseAppOptions from './parseAppOptions'

import { initCreatePage } from './createPage'
import { initCreateComponent } from './createComponent'

declare const __UNI_MP_INDEPENDENT_RUNTIME__: boolean

export const createApp = initCreateApp(parseAppOptions)
export const createPage = initCreatePage()
export const createComponent = initCreateComponent()
export const createPluginApp = initCreatePluginApp(parseAppOptions)
export const createSubpackageApp = initCreateSubpackageApp(parseAppOptions)
export const createIndependentSubpackageApp =
  initCreateIndependentSubpackageApp()

const isIndependentRuntime =
  typeof __UNI_MP_INDEPENDENT_RUNTIME__ !== 'undefined' &&
  __UNI_MP_INDEPENDENT_RUNTIME__ === true
if (!isIndependentRuntime) {
  ;(my as any).EventChannel = EventChannel
  ;(my as any).createApp = createApp
  ;(my as any).createPage = createPage
  ;(my as any).createComponent = createComponent
  ;(my as any).createPluginApp = createPluginApp
  ;(my as any).createSubpackageApp = createSubpackageApp
  ;(my as any).createIndependentSubpackageApp = createIndependentSubpackageApp
}
