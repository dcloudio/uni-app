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
import { createAssetUrlTransformWithOptions } from './transforms/templateTransformAssetUrl'
import { createSrcsetTransformWithOptions } from './transforms/templateTransformSrcset'
import { parseVueRequest } from '../vite/utils/url'
import { EXTNAME_VUE_RE } from '../constants'

export const VUE_REF = 'r'
export const VUE_REF_IN_FOR = 'r-i-f'

export function isVueSfcFile(id: string) {
  const { filename, query } = parseVueRequest(id)
  return EXTNAME_VUE_RE.test(filename) && !query.vue
}

export function isUserComponent(
  node: RootNode | TemplateChildNode,
  context: {
    isBuiltInComponent: TransformContext['isBuiltInComponent']
  }
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

export function createUniVueTransformAssetUrls(base: string) {
  return {
    base,
    includeAbsolute: true,
    tags: {
      audio: ['src'],
      video: ['src', 'poster'],
      img: ['src'],
      image: ['src'],
      'cover-image': ['src'],
      // h5
      'v-uni-audio': ['src'],
      'v-uni-video': ['src', 'poster'],
      'v-uni-image': ['src'],
      'v-uni-cover-image': ['src'],
      // nvue
      'u-image': ['src'],
      'u-video': ['src', 'poster'],
    },
  }
}

export function getBaseNodeTransforms(base: string) {
  const transformAssetUrls = createUniVueTransformAssetUrls(base)
  return [
    createAssetUrlTransformWithOptions(transformAssetUrls),
    createSrcsetTransformWithOptions(transformAssetUrls),
  ]
}
