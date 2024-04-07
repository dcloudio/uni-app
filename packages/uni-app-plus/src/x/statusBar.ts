import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance } from 'vue'
import type { UniPage } from '@dcloudio/uni-app-x/types/native'

interface UniPageFix extends UniPage {
  applyStatusBarStyle(): void
}

export function setStatusBarStyle() {
  const page = getCurrentPage() as ComponentPublicInstance
  if (page) {
    const nativePage = page.$nativePage as UniPageFix
    nativePage.applyStatusBarStyle()
  }
}
