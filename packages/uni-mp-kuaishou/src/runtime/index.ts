import { EventChannel } from '@dcloudio/uni-shared'
import { initCreateComponent } from '@dcloudio/uni-mp-core'
import { createApp, createPage } from '@dcloudio/uni-mp-weixin/src/runtime'

import parseComponentOptions from './parseComponentOptions'

export { createApp, createPage } from '@dcloudio/uni-mp-weixin/src/runtime'
export const createComponent = initCreateComponent(parseComponentOptions)
;(ks as any).EventChannel = EventChannel
;(ks as any).createApp = (global as any).createApp = createApp
;(ks as any).createPage = createPage
;(ks as any).createComponent = createComponent
