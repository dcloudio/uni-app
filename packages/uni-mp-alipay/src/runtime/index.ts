import { EventChannel } from '@dcloudio/uni-shared'

import { initCreateApp } from '@dcloudio/uni-mp-core'

import * as parseAppOptions from './parseAppOptions'

export { createPage } from './createPage'
export { createComponent } from './createComponent'

export const createApp = initCreateApp(parseAppOptions)
;(my as any).EventChannel = EventChannel
;(my as any).createApp = (global as any).createApp = createApp
;(my as any).createPage = createPage
;(my as any).createComponent = createComponent
