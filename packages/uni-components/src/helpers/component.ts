import { ComponentOptions, defineComponent } from 'vue'
import animation from './animation'
/**
 * 内置组件（对外，比如view）
 * @param options
 * @returns
 */
export const defineBuiltInComponent: typeof defineComponent = (
  options: any
) => {
  // TODO 可能会补充特殊标记
  const { props, mixins } = options
  // 补充内置组件animation
  if (!props || !props.animation) {
    ;(mixins || (options.mixins = [])).push(animation)
  }
  return defineSystemComponent(options)
}
/**
 * 系统组件（不对外，比如App,Page等）
 * @param options
 * @returns
 */
export const defineSystemComponent: typeof defineComponent = (options: any) => {
  ;(options as ComponentOptions).compatConfig = {
    MODE: 3, // 标记为vue3
  }
  return defineComponent(options)
}
