// 框架内部 Loading 按构建模式选择；jscc 不处理 .vue，条件导入不能放进 PageHead。
// Web Vapor 复用 uni-ext-api，非 Vapor 沿用旧同步副本，后者仍需保留。
//#if _X_VAPOR_
export { default } from '@dcloudio/uni-ext-component/uni-loading/components/loading/loading.uvue'
//#else
export { default } from './index-x.vue'
//#endif
