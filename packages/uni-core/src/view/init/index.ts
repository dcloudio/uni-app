import { initCustomDatasetOnce } from '@dcloudio/uni-shared'
import { initLongPress } from './longPress'
import { useRem } from './rem'
import { isBuiltInElement } from '../../helpers'

export function initView() {
  if (__NODE_JS__) {
    return
  }
  useRem()
  //#if _X_VAPOR_
  // TODO Web Vapor 过渡兼容：仅供仍使用旧 UniElement 的 uni-* 自定义元素。
  // 当前包括 button、input、textarea、canvas、editor、video、web-view、icon、map、
  // movable-area、movable-view、rich-text、scroll-view（标签均带 uni- 前缀）。
  // 旧类首次读取 dataset 依赖 __uniDataset；新原生宿主不能进入旧缓存，以免查询读到旧值。
  // 这批组件均需替换或重构为原生宿主及新 Element/dataset 机制，不要求全部迁移源码仓库。
  // 全部完成后删除本分支的缓存初始化及 uni- 判断，非 Vapor 的原有逻辑保留。
  initCustomDatasetOnce(
    (el) => el.localName.startsWith('uni-') && isBuiltInElement(el)
  )
  //#else
  initCustomDatasetOnce(isBuiltInElement)
  //#endif
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress()
  }
}
