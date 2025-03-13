import path from 'path'
import {
  ConstantTypes,
  type ExpressionNode,
  type NodeTransform,
  NodeTypes,
  type SimpleExpressionNode,
  type SourceLocation,
  type TransformContext,
  createSimpleExpression,
} from '@vue/compiler-core'
import {
  isDataUrl,
  isExternalUrl,
  isRelativeUrl,
  parseUrl,
} from './templateUtils'
import { isArray } from '@vue/shared'

export interface AssetURLTagConfig {
  [name: string]: string[]
}

export interface AssetURLOptions {
  /**
   * If base is provided, instead of transforming relative asset urls into
   * imports, they will be directly rewritten to absolute urls.
   */
  base?: string | null
  /**
   * If true, also processes absolute urls.
   */
  includeAbsolute?: boolean
  tags?: AssetURLTagConfig
}

export const defaultAssetUrlOptions: Required<AssetURLOptions> = {
  base: null,
  includeAbsolute: false,
  tags: {
    video: ['src', 'poster'],
    source: ['src'],
    img: ['src'],
    image: ['xlink:href', 'href'],
    use: ['xlink:href', 'href'],
  },
}

export const normalizeOptions = (
  options: AssetURLOptions | AssetURLTagConfig
): Required<AssetURLOptions> => {
  if (Object.keys(options).some((key) => isArray((options as any)[key]))) {
    // legacy option format which directly passes in tags config
    return {
      ...defaultAssetUrlOptions,
      tags: options as any,
    }
  }
  return {
    ...defaultAssetUrlOptions,
    ...options,
  }
}

export const createAssetUrlTransformWithOptions = (
  options: Required<AssetURLOptions>
): NodeTransform => {
  return (node, context) =>
    (transformAssetUrl as Function)(node, context, options)
}

/**
 * A `@vue/compiler-core` plugin that transforms relative asset urls into
 * either imports or absolute urls.
 *
 * ``` js
 * // Before
 * createVNode('img', { src: './logo.png' })
 *
 * // After
 * import _imports_0 from './logo.png'
 * createVNode('img', { src: _imports_0 })
 * ```
 */
export const transformAssetUrl: NodeTransform = (
  node,
  context,
  options: AssetURLOptions = defaultAssetUrlOptions
) => {
  if (node.type === NodeTypes.ELEMENT) {
    if (!node.props.length) {
      return
    }

    const tags = options.tags || defaultAssetUrlOptions.tags
    const attrs = tags[node.tag]
    const wildCardAttrs = tags['*']
    if (!attrs && !wildCardAttrs) {
      return
    }
    // 策略：
    // h5 平台保留原始策略
    // 非 h5 平台
    // - 绝对路径 static 资源不做转换
    // - 相对路径 static 资源转换为绝对路径
    // - 非 static 资源转换为 import
    const assetAttrs = (attrs || []).concat(wildCardAttrs || [])
    node.props.forEach((attr, index) => {
      if (
        attr.type !== NodeTypes.ATTRIBUTE ||
        !assetAttrs.includes(attr.name) ||
        !attr.value ||
        isExternalUrl(attr.value.content) ||
        isDataUrl(attr.value.content) ||
        attr.value.content[0] === '#'
      ) {
        return
      }

      // fixed by xxxxxx 区分 static 资源
      const isStaticAsset = attr.value.content.indexOf('/static/') > -1
      // 绝对路径的静态资源不作处理
      if (isStaticAsset && !isRelativeUrl(attr.value.content)) {
        return
      }
      const url = parseUrl(attr.value.content)
      // 这里是有问题的，static的相对路径可能是分包里的，或者uni_modules里的，不能简单的通过base来合并
      // 只不过目前编译器非有意的同时保留了vue标准的transformAssetUrl和uni-app的transformAssetUrl
      // 当static相对路径经过vue的transformAssetUrl后，就变成了 import 语句，不会再走到下边的逻辑里
      // 最初的设计，应该是用uni-app的transformAssetUrl来直接替换vue的transformAssetUrl的。
      // 如果后续要替换，需要考虑这个问题
      if (options.base && attr.value.content[0] === '.' && isStaticAsset) {
        // explicit base - directly rewrite relative urls into absolute url
        // to avoid generating extra imports
        // Allow for full hostnames provided in options.base
        const base = parseUrl(options.base)
        const protocol = base.protocol || ''
        const host = base.host ? protocol + '//' + base.host : ''
        const basePath = base.path || '/'

        // when packaged in the browser, path will be using the posix-
        // only version provided by rollup-plugin-node-builtins.
        attr.value.content =
          host +
          (path.posix || path).join(basePath, url.path + (url.hash || ''))
        return
      }

      // otherwise, transform the url into an import.
      // this assumes a bundler will resolve the import into the correct
      // absolute url (e.g. webpack file-loader)
      const exp = getImportsExpressionExp(url.path, url.hash, attr.loc, context)
      node.props[index] = {
        type: NodeTypes.DIRECTIVE,
        name: 'bind',
        arg: createSimpleExpression(attr.name, true, attr.loc),
        exp,
        modifiers: [],
        loc: attr.loc,
      }
    })
  }
}

function getImportsExpressionExp(
  path: string | null,
  hash: string | null,
  loc: SourceLocation,
  context: TransformContext
): ExpressionNode {
  if (path) {
    let name: string
    let exp: SimpleExpressionNode
    const existingIndex = context.imports.findIndex((i) => i.path === path)
    if (existingIndex > -1) {
      name = `_imports_${existingIndex}`
      exp = context.imports[existingIndex].exp as SimpleExpressionNode
    } else {
      name = `_imports_${context.imports.length}`
      exp = createSimpleExpression(name, false, loc, ConstantTypes.CAN_HOIST)
      context.imports.push({ exp, path })
    }

    if (!hash) {
      return exp
    }

    const hashExp = `${name} + '${hash}'`
    const existingHoistIndex = context.hoists.findIndex((h) => {
      return (
        h &&
        h.type === NodeTypes.SIMPLE_EXPRESSION &&
        !h.isStatic &&
        h.content === hashExp
      )
    })
    if (existingHoistIndex > -1) {
      return createSimpleExpression(
        `_hoisted_${existingHoistIndex + 1}`,
        false,
        loc,
        ConstantTypes.CAN_HOIST
      )
    }
    return context.hoist(
      createSimpleExpression(hashExp, false, loc, ConstantTypes.CAN_HOIST)
    )
  } else {
    return createSimpleExpression(`''`, false, loc, ConstantTypes.CAN_HOIST)
  }
}
