import { NodeTypes, NodeTransform } from '@vue/compiler-core'

import { matchEasycom } from '../easycom'

import { addImport } from './addImport'

export const transformEasycom: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ELEMENT) {
    return
  }
  if (node.tag === 'match-media' && process.env.UNI_PLATFORM !== 'mp-weixin') {
    node.tag = 'uni-match-media'
  }
  const path = matchEasycom(node.tag)
  if (path) {
    addImport(path, node, context)
  }
}
