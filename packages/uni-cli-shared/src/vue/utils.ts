import { isString } from '@vue/shared'
import { isComponentTag } from '@dcloudio/uni-shared'
import {
  AttributeNode,
  ComponentNode,
  createSimpleExpression,
  DirectiveNode,
  ElementNode,
  ElementTypes,
  isCoreComponent,
  locStub,
  NodeTypes,
  RootNode,
  ExpressionNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

export const VUE_REF = 'r'
export const VUE_REF_IN_FOR = 'r-i-f'

export function isUserComponent(
  node: RootNode | TemplateChildNode,
  context: TransformContext
): node is ComponentNode {
  return (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    !isComponentTag(node.tag) &&
    !isCoreComponent(node.tag) &&
    !context.isBuiltInComponent(node.tag)
  )
}

export function createAttributeNode(
  name: string,
  content: string
): AttributeNode {
  return {
    type: NodeTypes.ATTRIBUTE,
    loc: locStub,
    name,
    value: {
      type: NodeTypes.TEXT,
      loc: locStub,
      content,
    },
  }
}

function createClassAttribute(clazz: string): AttributeNode {
  return createAttributeNode('class', clazz)
}

export function addStaticClass(node: ElementNode, clazz: string) {
  const classProp = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  ) as AttributeNode | undefined

  if (!classProp) {
    return node.props.unshift(createClassAttribute(clazz))
  }

  if (classProp.value) {
    return (classProp.value.content = classProp.value.content + ' ' + clazz)
  }
  classProp.value = {
    type: NodeTypes.TEXT,
    loc: locStub,
    content: clazz,
  }
}

export function createDirectiveNode(
  name: string,
  arg: string,
  exp: string | ExpressionNode
): DirectiveNode {
  return {
    type: NodeTypes.DIRECTIVE,
    name,
    modifiers: [],
    loc: locStub,
    arg: createSimpleExpression(arg, true),
    exp: isString(exp) ? createSimpleExpression(exp, false) : exp,
  }
}

export function createOnDirectiveNode(name: string, value: string) {
  return createDirectiveNode('on', name, value)
}

export function createBindDirectiveNode(
  name: string,
  value: string | ExpressionNode
) {
  return createDirectiveNode('bind', name, value)
}
