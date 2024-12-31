import { initCustomDatasetOnce } from '@dcloudio/uni-shared'
import { initLongPress } from './longPress'
import { useRem } from './rem'
import { isBuiltInElement } from '../../helpers'

export function initView() {
  if (__NODE_JS__) {
    return
  }
  useRem()
  initCustomDatasetOnce(isBuiltInElement)
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress()
  }
}
