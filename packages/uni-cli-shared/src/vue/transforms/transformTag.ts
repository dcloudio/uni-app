import { CodegenContext, NodeTransform } from '@vue/compiler-core'
import { isElementNode } from '../../vite/utils/ast'

export function createTransformTag(
  opts: Record<string, string>
): NodeTransform {
  return function transformTag(node, context) {
    if (!isElementNode(node)) {
      return
    }
    const oldTag = node.tag
    const newTag = opts[oldTag]
    if (!newTag) {
      return
    }
    node.tag = newTag
    // SSR 时，已被提前添加到 components 中
    if (context.ssr && context.components.has(oldTag)) {
      context.components.delete(oldTag)
      context.components.add(newTag)
    }
  }
}

const easycoms: Record<string, string> = {
  _component_uni_match_media: '_component_match_media',
  _component_page_head_meta: '_component_head',
}
const easycomKeys = Object.keys(easycoms)

export const onContextCreated: (context: CodegenContext) => void = (
  context
) => {
  if (!context.ssr) {
    return
  }
  // 替换生成的 easycom 变量名
  const push = context.push
  context.push = (code, node) => {
    if (code.includes('_resolveComponent(')) {
      const name = easycomKeys.find((name) => code.includes(name))
      if (name) {
        code = code.replace(name, easycoms[name])
      }
    }
    return push(code, node)
  }
}
