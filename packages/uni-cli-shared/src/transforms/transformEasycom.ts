import { camelize, capitalize } from '@vue/shared'
import {
  ConstantTypes,
  NodeTransform,
  createSimpleExpression,
  toValidAssetId,
  ComponentNode,
  TransformContext
} from '@vue/compiler-core'

import { COMPONENT_PREFIX } from '@dcloudio/uni-shared'

import { debugEasycom, matchEasycom } from '../easycom'

import { addAutoImport, isComponentNode } from './autoImport'

function createImportItem(path: string, node: ComponentNode) {
  const tag = node.tag
  return {
    path,
    exp: createSimpleExpression(
      toValidAssetId(tag, 'component'),
      false,
      node.loc,
      ConstantTypes.CAN_HOIST
    )
  }
}

function isBinding(tag: string, context: TransformContext) {
  const bindings = context.bindingMetadata
  if (!bindings) {
    return false
  }
  if (bindings[tag]) {
    return true
  }
  const camelName = camelize(tag)
  if (bindings[camelName]) {
    return true
  }
  const PascalName = capitalize(camelName)
  if (bindings[PascalName]) {
    return true
  }
  return false
}

export const transformEasycom: NodeTransform = (node, context) => {
  if (!isComponentNode(node)) {
    return
  }
  const tag = node.tag
  // built-in component
  if (tag.startsWith(COMPONENT_PREFIX)) {
    return
  }
  // https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md#exposing-components-and-directives
  if (isBinding(tag, context)) {
    return debugEasycom(tag + ' is binding by setup')
  }
  const path = matchEasycom(tag)
  path && addAutoImport(tag, createImportItem(path, node), context)
}
