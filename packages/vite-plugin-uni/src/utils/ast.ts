import {
  Literal,
  BaseNode,
  Property,
  Identifier,
  CallExpression,
  MemberExpression,
  MethodDefinition,
  ExportSpecifier,
} from 'estree'

export const isProperty = (node: BaseNode): node is Property =>
  node.type === 'Property'

export const isIdentifier = (node: BaseNode): node is Identifier =>
  node.type === 'Identifier'

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
