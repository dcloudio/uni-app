import { EventChannel } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'

export function getOpenerEventChannel(
  this: ComponentPublicInstance
): EventChannel | undefined {
  if (__PLATFORM__ === 'h5') {
    //#if _X_VAPOR_
    const page = (__X__ ? this.$basePage : this.$page) as
      | Page.PageInstance['$page']
      | undefined
    if (page) {
      if (!page.eventChannel) {
        page.eventChannel = new EventChannel(page.id)
      }
      return page.eventChannel as EventChannel
    }
    //#endif
    //#if !_X_VAPOR_
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
    //#endif
  }
  // TODO App
}
