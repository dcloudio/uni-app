import {
  type ComponentCustomOptions,
  createElementBlock,
  defineComponent,
  //#if _X_VAPOR_
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  defineVaporComponent,
  //#endif
  openBlock,
} from 'vue'
import { camelize, capitalize } from '@vue/shared'
import animation from './animation'

/**
 * 内置组件（对外，比如view）
 * @param options
 * @returns
 */
export const defineBuiltInComponent = ((options: any) => {
  // 标记为保留组件，这样框架其他地方可以据此来识别，比如 onLoad 等生命周期的注入会忽略系统保留组件
  options.__reserved = true
  // TODO 可能会补充特殊标记
  const { props, mixins } = options
  // 补充内置组件animation
  if (!props || !props.animation) {
    ;(mixins || (options.mixins = [])).push(animation)
  }
  if (__X__ && !__NODE_JS__) {
    // 目前仅对x开放，注册自定义元素，如uni-slider
    // SSR的cjs环境下不支持customElements
    const rootElement: ComponentCustomOptions['rootElement'] | undefined =
      options.rootElement
    if (rootElement) {
      // TODO iOS 平台不能注册 utssdk 导出的 Element 类，否则会报错
      // 仍旧判断 'function ProxyObject()' ？？
      customElements.define(
        rootElement.name,
        rootElement.class,
        rootElement.options
      )
    }
  }
  return defineSystemComponent(options)
}) as typeof defineComponent
/**
 * 系统组件（不对外，比如App,Page等）
 * @param options
 * @returns
 */
export const defineSystemComponent = ((options: any) => {
  // 标记 devtools 隐藏
  // options.devtools = { hide: true }
  // 标记为保留组件
  options.__reserved = true
  options.compatConfig = {
    MODE: 3, // 标记为vue3
  }
  //#if _X_VAPOR_
  // 兼容旧 TSX：其 setup 返回 Vapor render closure，需要在 setup 阶段展开成 Block。
  const setup = options.setup
  if (setup) {
    options.setup = (props: any, context: any) => {
      const result = setup(props, context)
      return typeof result === 'function' ? result() : result
    }
  }
  return defineVaporComponent(options)
  //#else
  return defineComponent(options)
  //#endif
}) as typeof defineComponent
/**
 * 暂未支持的组件
 * @param name
 * @returns
 */
export const defineUnsupportedComponent = (name: string) => {
  return defineBuiltInComponent({
    name: capitalize(camelize(name)),
    setup() {
      return () => (
        openBlock(),
        createElementBlock('uni-' + name, null, name + ' is unsupported')
      )
    },
  })
}
