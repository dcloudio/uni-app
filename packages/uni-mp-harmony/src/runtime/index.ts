import { EventChannel } from '@dcloudio/uni-shared'
import {
  createApp,
  createComponent,
  createPage,
  createSubpackageApp,
} from '@dcloudio/uni-quickapp-webview/src/runtime'

export * from '@dcloudio/uni-quickapp-webview/src/runtime'
;(has as any).EventChannel = EventChannel
;(has as any).createApp = (global as any).createApp = createApp
;(has as any).createPage = createPage
;(has as any).createComponent = createComponent
;(has as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
