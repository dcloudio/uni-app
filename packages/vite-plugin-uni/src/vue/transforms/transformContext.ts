import {
  RESOLVE_DYNAMIC_COMPONENT,
  NodeTypes,
  NodeTransform,
} from '@vue/compiler-core'

export const transformContext: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.ROOT) {
    // 注入 resolveDynamicComponent，easycom 会使用 resolveDynamicComponent 替换 resolveComponent 来解决 warning 的问题
    // resolveComponent('custom-component') => resolveDynamicComponent('custom-component')
    context.helper(RESOLVE_DYNAMIC_COMPONENT)
  }
}
