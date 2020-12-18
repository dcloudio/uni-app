import { camelize, capitalize } from '@vue/shared'

import {
  ConstantTypes,
  NodeTransform,
  ElementNode,
  createSimpleExpression,
  toValidAssetId
} from '@vue/compiler-core'

import { COMPONENT_PREFIX, isBuiltInComponent } from '@dcloudio/uni-shared'

import { addAutoImport, isComponentNode } from './autoImport'

const COMPONENTS_PATH = '@dcloudio/uni-h5/dist/uni-h5.esm.js'

const COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/'

function createComponentImportItem(oldTag: string, node: ElementNode) {
  const tag = node.tag
  return {
    path: COMPONENTS_PATH,
    exp: createSimpleExpression(
      `{ ${capitalize(camelize(oldTag))} as ${toValidAssetId(
        tag,
        'component'
      )} }`,
      false,
      node.loc,
      ConstantTypes.CAN_HOIST
    )
  }
}
function createStyleImportItem(oldTag: string, node: ElementNode) {
  return {
    path: COMPONENTS_STYLE_PATH + oldTag + '.css',
    exp: createSimpleExpression(
      toValidAssetId(node.tag, 'style' as any),
      false,
      node.loc,
      ConstantTypes.CAN_HOIST
    )
  }
}

export const transformBuiltInComponent: NodeTransform = (node, context) => {
  if (!isComponentNode(node)) {
    return
  }
  const tag = node.tag
  if (!isBuiltInComponent(tag)) {
    return
  }
  node.tag = COMPONENT_PREFIX + tag
  if (addAutoImport(node.tag, createComponentImportItem(tag, node), context)) {
    addAutoImport('', createStyleImportItem(tag, node), context)
  }
}
