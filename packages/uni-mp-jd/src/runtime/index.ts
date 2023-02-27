import { EventChannel } from '@dcloudio/uni-shared'
import {
  createApp,
  createSubpackageApp,
} from '@dcloudio/uni-mp-weixin/src/runtime'

import { initCreateComponent } from './createComponent'
import { initCreatePage } from './createPage'
import parseOptions from './parseOptions'

export const createComponent = initCreateComponent(parseOptions)
const createPage = initCreatePage(parseOptions)

;(jd as any).EventChannel = EventChannel
;(jd as any).createApp = (global as any).createApp = createApp
;(jd as any).createPage = createPage
;(jd as any).createComponent = createComponent
;(jd as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
