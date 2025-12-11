import type { NodeTransform } from '@vue/compiler-core'

export const transformLineBreak: NodeTransform = (node, context) => {
  if (node.type === 2) {
    const parent = context.parent
    if (parent && parent.type === 1 && parent.tag === 'text') {
      // 解析文本节点转义，暂时仅处理换行
      node.content = node.content.replace(/[\\]+n/g, function (match) {
        return JSON.parse(`"${match}"`)
      })
    }
  }
}
