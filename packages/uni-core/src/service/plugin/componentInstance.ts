import { EventChannel } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'

export function getOpenerEventChannel(
  this: ComponentPublicInstance
): EventChannel | undefined {
  if (__PLATFORM__ === 'h5' || __PLATFORM__ === 'mp-weibo') {
    if (this.$route) {
      const meta = this.$route.meta
      if (!meta.eventChannel) {
        meta.eventChannel = new EventChannel(this.$page.id)
      }
      return meta.eventChannel as EventChannel
    }
  }
  // TODO App
}
