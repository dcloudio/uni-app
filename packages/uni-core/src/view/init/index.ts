//#if !_X_VAPOR_
import { initCustomDatasetOnce } from '@dcloudio/uni-shared'
import { isBuiltInElement } from '../../helpers'
//#endif
import { initLongPress } from './longPress'
import { useRem } from './rem'

export function initView() {
  if (__NODE_JS__) {
    return
  }
  useRem()
  // Vapor 的业务绑定显式双写，不安装全局属性拦截；旧缓存机制仅用于非 Vapor。
  //#if !_X_VAPOR_
  initCustomDatasetOnce(isBuiltInElement)
  //#endif
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress()
  }
}
