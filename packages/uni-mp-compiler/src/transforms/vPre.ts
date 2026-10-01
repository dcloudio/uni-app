import { isElementNode } from '@dcloudio/uni-cli-shared'
import { findDir } from '@vue/compiler-core'
import type { ElementNode } from '@vue/compiler-core'
import type { NodeTransform } from '../transform'

// compiler-core consumes the real v-pre attribute while parsing. Keep a same-length
// marker so the mini-program compiler can apply its own template code generation.
export const V_PRE_DIRECTIVE = 'prx'

export type VPreElementNode = ElementNode & {
  vPre: true
}

export function isVPreElementNode(node: unknown): node is VPreElementNode {
  return !!(node as VPreElementNode).vPre
}

export const transformVPre: NodeTransform = (node) => {
  if (!isElementNode(node)) {
    return
  }
  const dir = findDir(node, V_PRE_DIRECTIVE, true)
  if (!dir) {
    return
  }
  node.props.splice(node.props.indexOf(dir), 1)
  ;(node as VPreElementNode).vPre = true
}

export function preprocessVPre(template: string) {
  return template.replace(
    /(<[A-Za-z][^>]*?\s)v-pre(?=\s|=|\/?>)/g,
    `$1v-${V_PRE_DIRECTIVE}`
  )
}
