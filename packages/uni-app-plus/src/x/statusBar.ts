import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance } from 'vue'
import type { IPage } from '@dcloudio/uni-app-x/types/native'

interface UniPageFix extends IPage {
  applyStatusBarStyle(): void
}

export function setStatusBarStyle() {
  const page = __X__
    ? ((getCurrentPage() as unknown as UniPage).vm as ComponentPublicInstance)
    : (getCurrentPage() as ComponentPublicInstance)
  if (page) {
    const nativePage = page.$nativePage as UniPageFix
    nativePage.applyStatusBarStyle()
  }
}
