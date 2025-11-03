import path from 'path'
import { camelize, extend, isString } from '@vue/shared'
import { isComponentTag } from '@dcloudio/uni-shared'
import {
  type AttributeNode,
  type ComponentNode,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  type ExpressionNode,
  NodeTypes,
  type Position,
  type RootNode,
  type SourceLocation,
  type TemplateChildNode,
  type TransformContext,
  createSimpleExpression,
  isCoreComponent,
  isStaticExp,
  locStub,
} from '@vue/compiler-core'
import {
  type AssetURLOptions,
  createAssetUrlTransformWithOptions,
} from './transforms/templateTransformAssetUrl'
import { createSrcsetTransformWithOptions } from './transforms/templateTransformSrcset'
import { isDirectiveNode } from '../vite/utils/ast'
import { parseVueRequest } from '../vite/utils/url'
import { EXTNAME_VUE_RE } from '../constants'
import { normalizePath } from '../utils'
import { parseUrl } from './transforms/templateUtils'

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
    nameLoc: locStub,
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
  exp?: string | ExpressionNode
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

export function createOnDirectiveNode(
  name: string,
  value: string | ExpressionNode
) {
  return createDirectiveNode('on', name, value)
}

export function createBindDirectiveNode(
  name: string,
  value: string | ExpressionNode
) {
  return createDirectiveNode('bind', name, value)
}

export function createUniVueTransformAssetUrls(
  base: string,
  resolveStaticAsset?: (
    relativePath: string,
    context: TransformContext,
    options: AssetURLOptions
  ) => string
) {
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
    resolveStaticAsset: resolveStaticAsset || null,
  }
}

export function getBaseNodeTransforms(
  base: string,
  resolveStaticAsset?: (
    relativePath: string,
    context: TransformContext,
    options: AssetURLOptions
  ) => string
) {
  const transformAssetUrls = createUniVueTransformAssetUrls(
    base,
    resolveStaticAsset
  )
  return [
    createAssetUrlTransformWithOptions(transformAssetUrls),
    createSrcsetTransformWithOptions(transformAssetUrls),
  ]
}

export function renameProp(name: string, prop?: DirectiveNode | AttributeNode) {
  if (!prop) {
    return
  }
  if (isDirectiveNode(prop)) {
    if (prop.arg && isStaticExp(prop.arg)) {
      prop.arg.content = name
    }
  } else {
    prop.name = name
  }
}

export function isPropNameEquals(
  prop: AttributeNode | DirectiveNode,
  name: string
): boolean {
  if (prop.type === NodeTypes.ATTRIBUTE) {
    const propName = camelize(prop.name)
    return propName === name
  } else if (prop.type === NodeTypes.DIRECTIVE && prop.rawName) {
    const propName = camelize(prop.rawName.slice(1))
    return propName === name
  }
  return false
}

// @vue/compiler-core 没有导出 getLoc，先使用旧版本的 getInnerRange
export function getInnerRange(
  loc: SourceLocation,
  offset: number,
  length: number
): SourceLocation {
  const source = loc.source.slice(offset, offset + length)
  const newLoc: SourceLocation = {
    source,
    start: advancePositionWithClone(loc.start, loc.source, offset),
    end: loc.end,
  }

  if (length != null) {
    newLoc.end = advancePositionWithClone(
      loc.start,
      loc.source,
      offset + length
    )
  }

  return newLoc
}

export function advancePositionWithClone(
  pos: Position,
  source: string,
  numberOfCharacters: number = source.length
): Position {
  return advancePositionWithMutation(
    extend({}, pos),
    source,
    numberOfCharacters
  )
}

// advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser
export function advancePositionWithMutation(
  pos: Position,
  source: string,
  numberOfCharacters: number = source.length
): Position {
  let linesCount = 0
  let lastNewLinePos = -1
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10 /* newline char code */) {
      linesCount++
      lastNewLinePos = i
    }
  }

  pos.offset += numberOfCharacters
  pos.line += linesCount
  pos.column =
    lastNewLinePos === -1
      ? pos.column + numberOfCharacters
      : numberOfCharacters - lastNewLinePos

  return pos
}

export function createResolveStaticAsset(inputDir: string) {
  return function resolveStaticAsset(
    relativePath: string,
    context: TransformContext,
    options: AssetURLOptions
  ) {
    const newRelativePath = normalizePath(
      path.relative(
        inputDir,
        path.resolve(path.dirname(context.filename), relativePath)
      )
    )
    if (options.base) {
      // explicit base - directly rewrite relative urls into absolute url
      // to avoid generating extra imports
      // Allow for full hostnames provided in options.base
      const base = parseUrl(options.base)
      const protocol = base.protocol || ''
      const host = base.host ? protocol + '//' + base.host : ''
      const basePath = base.path || '/'
      const url = parseUrl(newRelativePath)
      // when packaged in the browser, path will be using the posix-
      // only version provided by rollup-plugin-node-builtins.
      return (
        host + (path.posix || path).join(basePath, url.path + (url.hash || ''))
      )
    }
    return newRelativePath
  }
}
