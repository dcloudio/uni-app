import {
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  createPlainElement,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  defineVaporComponent,
} from 'vue'

export function defineComponent(options: any) {
  // 兼容旧 TSX：其 setup 返回 Vapor render closure，需要在 setup 阶段展开成 Block。
  const setup = options.setup
  if (setup) {
    options.setup = (props: any, context: any) => {
      const result = setup(props, context)
      return typeof result === 'function' ? result() : result
    }
  }
  return defineVaporComponent(options)
}

export function createUnsupportedRender(name: string) {
  // 未支持组件仅用普通 div 显示提示；组件标识用于识别，不添加 uni-view 或专有 Element 能力。
  const element = createPlainElement('div', null, null, true)
  element.setAttribute('uni-' + name, '')
  element.textContent = name + ' is unsupported'
  return element
}
