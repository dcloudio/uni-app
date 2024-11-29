import { EventChannel } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'

export function getOpenerEventChannel(
  this: ComponentPublicInstance
): EventChannel | undefined {
  if (__PLATFORM__ === 'h5') {
    if (this.$route) {
      const meta = this.$route.meta
      if (!meta.eventChannel) {
        meta.eventChannel = new EventChannel(
          __X__
            ? this.$basePage.id
            : (this.$page as Page.PageInstance['$page']).id
        )
      }
      return meta.eventChannel as EventChannel
    }
  }
  // TODO App
}
