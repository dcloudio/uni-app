import type { App, ComponentPublicInstance } from 'vue'
import type { UniElement } from '@dcloudio/uni-app-x/types/native'
import { getNativeApp } from './app'

export function initComponentInstance(app: App) {
  app.mixin({
    beforeCreate(this: ComponentPublicInstance) {
      Object.defineProperty(this, '$nativePage', {
        get(this: ComponentPublicInstance) {
          const pageId = (this.$root?.$el as UniElement & { pageId: string })
            ?.pageId
          return getNativeApp().pageManager.findPageById(pageId + '')
        },
      })
    },
  })
}
