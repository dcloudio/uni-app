import type { SetPageMetaOptions } from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'
export {
  requestComponentInfo,
  addIntersectionObserver,
  removeIntersectionObserver,
} from '@dcloudio/uni-app-plus/platform'

export const TEMP_PATH = '' // TODO 需要从applicationContext获取

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  // TODO: Implement
}
