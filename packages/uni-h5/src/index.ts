import plugin from './framework/plugin'
export { plugin }

export * from '@dcloudio/uni-components'

export * from './view/bridge'

export * from './service/api'
export * from './service/api/uni'
export * from './service/bridge'

export { getApp, getCurrentPages } from './framework'

export { default as PageComponent } from './framework/components/page/index.vue'
export { default as AsyncErrorComponent } from './framework/components/async-error/index.vue'
export { default as AsyncLoadingComponent } from './framework/components/async-loading/index.vue'
