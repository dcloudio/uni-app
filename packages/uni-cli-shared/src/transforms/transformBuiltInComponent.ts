import { NodeTypes, NodeTransform } from '@vue/compiler-core'

import { isBuiltInComponent } from '@dcloudio/uni-shared'

import { addImport } from './addImport'

const COMPONENTS_PATH = '@dcloudio/uni-h5/lib/'

export const transformBuiltInComponent: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ELEMENT) {
    return
  }
  const tag = node.tag
  if (isBuiltInComponent(tag)) {
    addImport(COMPONENTS_PATH + tag + '/index.js', node, context)
  }
}
