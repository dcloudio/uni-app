import './x/polyfill/polyfill'
export {
  UTS,
  UTSJSONObject,
  UTSValueIterable,
  UniError,
} from '@dcloudio/uni-shared'

// 组件与元素来自配置生成的入口，不导出被排除的组件或内部辅助方法。
export * from './x/view/components/index-vapor'
export * from './view/components/index-vapor'

export { useI18n } from '@dcloudio/uni-core'
export { default as plugin } from './framework/plugin'
export * from './framework/setup'
export * from './view/bridge'
export * from './x/service/api'
export * from './x/service/api/uni'
export * from './service/bridge'
export { getApp, getCurrentPages } from './framework'

export { default as LayoutComponent } from './framework/components/layout/index-vapor.vue'
export { default as PageComponent } from './framework/components/page/index-vapor.vue'
export { createVaporPageRouteComponent } from './framework/components/page/route-vapor'
export { default as AsyncErrorComponent } from './framework/components/async-error/asyncError.vue'
export { default as AsyncLoadingComponent } from './framework/components/async-loading/asyncLoading.vue'
export * from './framework/setup/state'
export { getRealPath } from './platform'

import { installWebVaporElements } from '../../uni-components/src/vue/web-vapor-elements'

if (!__NODE_JS__) {
  installWebVaporElements(window)
}
