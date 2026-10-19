import type { ComponentCustomOptions, defineComponent } from 'vue'
//#if _X_VAPOR_
import * as vapor from './component-vapor'
//#else
import * as vdom from './component-vdom'
//#endif
import { camelize, capitalize } from '@vue/shared'
import animation from './animation'

// prettier-ignore
const defineRuntimeComponent =
//#if _X_VAPOR_
  vapor.defineComponent
//#else
vdom.defineComponent
//#endif

// prettier-ignore
const createUnsupportedRender =
//#if _X_VAPOR_
  vapor.createUnsupportedRender
//#else
vdom.createUnsupportedRender
//#endif

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
      //#if _X_VAPOR_
      // TODO Web Vapor 旧组件的过渡适配：共享固定标签名，避免逐实例标记或反复解析 DOM 标签。
      // 待旧组件全部替换或重构为原生宿主后，移除此补丁及 Vapor 的 Custom Element 注册路径；
      // 新组件不得接入此注册机制，非 Vapor 保留原有行为。旧组件范围见 uni-core/src/view/init/index.ts。
      Object.defineProperty(rootElement.class.prototype, 'uniTagName', {
        configurable: true,
        value: rootElement.name.slice(4).toUpperCase(),
      })
      //#endif
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
  return defineRuntimeComponent(options)
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
      return createUnsupportedRender(name)
    },
  })
}
