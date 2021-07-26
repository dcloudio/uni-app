import { EventChannel } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'

export function getOpenerEventChannel(this: ComponentPublicInstance) {
  if (__PLATFORM__ === 'h5') {
    if (this.$route) {
      const meta = this.$route.meta
      if (!meta.eventChannel) {
        meta.eventChannel = new EventChannel(this.$page.id)
      }
      return meta.eventChannel
    }
  }
  // TODO App
}
