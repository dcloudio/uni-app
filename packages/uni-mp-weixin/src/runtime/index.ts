import {
  initCreateApp,
  initCreateComponent,
  initCreateIndependentSubpackageApp,
  initCreatePage,
  initCreatePluginApp,
  initCreateSubpackageApp,
} from '@dcloudio/uni-mp-core'

import '@dcloudio/uni-mp-polyfill'

import * as parseOptions from './parseOptions'
import { preloadAsset } from './utils'

declare const __UNI_MP_INDEPENDENT_RUNTIME__: boolean

export const createApp = initCreateApp()
export const createPage = initCreatePage(parseOptions)
export const createComponent = initCreateComponent(parseOptions)
export const createPluginApp = initCreatePluginApp()
export const createSubpackageApp = initCreateSubpackageApp()
export const createIndependentSubpackageApp =
  initCreateIndependentSubpackageApp()
const isIndependentRuntime =
  typeof __UNI_MP_INDEPENDENT_RUNTIME__ !== 'undefined' &&
  __UNI_MP_INDEPENDENT_RUNTIME__ === true
if (__PLATFORM__ === 'mp-weixin') {
  preloadAsset()
  if (!isIndependentRuntime) {
    // 独立分包有自己的 runtime 图，但 wx/global 是宿主共享对象，不能覆盖主包的 create API。
    ;(wx as any).createApp = (global as any).createApp = createApp
    ;(wx as any).createPage = createPage
    ;(wx as any).createComponent = createComponent
    ;(wx as any).createPluginApp = (global as any).createPluginApp =
      createPluginApp
    ;(wx as any).createSubpackageApp = (global as any).createSubpackageApp =
      createSubpackageApp
    ;(wx as any).createIndependentSubpackageApp = (
      global as any
    ).createIndependentSubpackageApp = createIndependentSubpackageApp
  }
}
