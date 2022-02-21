import {
  transformModel as baseTransform,
  DirectiveTransform,
} from '@vue/compiler-core'
// 所有的 v-model 均走自定义组件的实现逻辑，包括 input,textarea
export const transformModel: DirectiveTransform = (dir, node, context) => {
  return baseTransform(dir, node, context)
}
