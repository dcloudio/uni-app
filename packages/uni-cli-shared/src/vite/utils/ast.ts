import type {
  AssignmentExpression,
  BaseNode,
  CallExpression,
  ExportSpecifier,
  Identifier,
  Literal,
  MemberExpression,
  MethodDefinition,
  Property,
} from 'estree'

import {
  type AttributeNode,
  type CompoundExpressionNode,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  type Node,
  NodeTypes,
  type PlainElementNode,
  type SimpleExpressionNode,
} from '@vue/compiler-core'
import { parse } from '@vue/compiler-dom'

export const isProperty = (node: BaseNode): node is Property =>
  node.type === 'Property'

export const isIdentifier = (node: BaseNode): node is Identifier =>
  node.type === 'Identifier'

export const isAssignmentExpression = (
  node: BaseNode
): node is AssignmentExpression => node.type === 'AssignmentExpression'

export const isCallExpression = (node: BaseNode): node is CallExpression =>
  node.type === 'CallExpression'

export const isMemberExpression = (node: BaseNode): node is MemberExpression =>
  node.type === 'MemberExpression'

export const isMethodDefinition = (node: BaseNode): node is MethodDefinition =>
  node.type === 'MethodDefinition'

export const isExportSpecifier = (node: BaseNode): node is ExportSpecifier =>
  node.type === 'ExportSpecifier'

export const isReference = (node: BaseNode, parent: BaseNode): boolean => {
  if (isMemberExpression(node)) {
    return !node.computed && isReference(node.object, node)
  }
  if (isIdentifier(node)) {
    if (isMemberExpression(parent))
      return parent.computed || node === parent.object
    // `bar` in { bar: foo }
    if (isProperty(parent) && node !== parent.value) return false
    // `bar` in `class Foo { bar () {...} }`
    if (isMethodDefinition(parent)) return false
    // `bar` in `export { foo as bar }`
    if (isExportSpecifier(parent) && node !== parent.local) return false
    return true
  }
  return false
}

export function createLiteral(value: string) {
  return {
    type: 'Literal',
    value,
    raw: `'${value}'`,
  } as Literal
}

export function createIdentifier(name: string) {
  return {
    type: 'Identifier',
    name,
  } as Identifier
}

export function createCallExpression(callee: unknown, args: unknown[]) {
  return {
    type: 'CallExpression',
    callee,
    arguments: args,
  } as CallExpression
}

export function parseVue(code: string, errors: SyntaxError[]) {
  return parse(code, {
    isNativeTag: () => true,
    isPreTag: () => true,
    parseMode: 'sfc',
    onError: (e: any) => {
      errors.push(e)
    },
  })
}

export function isElementNode(node: Node): node is ElementNode {
  return node.type === NodeTypes.ELEMENT
}

export function isPlainElementNode(node: Node): node is PlainElementNode {
  return isElementNode(node) && node.tagType === ElementTypes.ELEMENT
}

export function isAttributeNode(node: Node): node is AttributeNode {
  return node.type === NodeTypes.ATTRIBUTE
}

export function isDirectiveNode(node: Node): node is DirectiveNode {
  return node.type === NodeTypes.DIRECTIVE
}

export function isSimpleExpressionNode(
  node: Node
): node is SimpleExpressionNode {
  return node.type === NodeTypes.SIMPLE_EXPRESSION
}

export function isCompoundExpressionNode(
  node: Node
): node is CompoundExpressionNode {
  return node.type === NodeTypes.COMPOUND_EXPRESSION
}
