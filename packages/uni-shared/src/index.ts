export * from './vue'
export * from './log'
export * from './dom'
export * from './url'
export * from './nvue'
export * from './plus'
export * from './tags'
export * from './vdom'
export * from './utils'
export * from './query'
export * from './debounce'
export * from './constants'
export * from './EventChannel'
export * from './lifecycle'
export * from './onCreateVueApp'
export { default as Emitter } from './TinyEmitter'
export * from './theme'

export * from './node/locale'
export * from './polyfill'
export * from './globalsAllowList'
/**
 * TODO 临时从uni-shared导出，目前没有其他更好的方式引入uts-js相关类型和代码
 * 后续调整时需要注意：
 * - 此处导出在小程序端被tslib(uts)作为外部依赖引用
 * - tslib(uts)在打包时会直接引用代码内容而不是路径，应避免同一个导出出现多份，否则可能会导致instanceof UTSJSONObject等用法出现问题
 * - 微信小程序开发工具 1.06.2504050 版本global相关用法有调整，使用global.UTSJSONObject = xxx挂载到全局的变量只能通过global.UTSJSONObject访问，不能通过UTSJSONObject访问。换句话说global不再是全局对象的别名
 */
export * from '@dcloudio/uni-uts-v1/lib/javascript/lib/runtime/uts'
