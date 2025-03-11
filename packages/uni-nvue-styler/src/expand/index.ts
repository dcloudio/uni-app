import type { Plugin } from 'postcss'
import {
  type NormalizeOptions,
  type TransformDecl,
  hyphenateStyleProperty,
} from '../utils'
import { createTransformBackground } from './background'
import { createTransformBorder, createTransformBorderNvue } from './border'
import { transformBorderColor } from './borderColor'
import {
  transformBorderRadius,
  transformBorderRadiusNvue,
} from './borderRadius'
import { transformBorderStyle } from './borderStyle'
import { transformBorderWidth } from './borderWidth'
import { transformFlexFlow } from './flexFlow'
import { transformFont } from './font'
import { transformMargin } from './margin'
import { transformPadding } from './padding'
import { transformTransition } from './transition'

function getDeclTransforms(
  options: NormalizeOptions
): Record<string, TransformDecl> {
  const transformBorder =
    options.type == 'uvue'
      ? createTransformBorder(options)
      : createTransformBorderNvue(options)
  const styleMap: Record<string, TransformDecl> = {
    transition: transformTransition,
    border: transformBorder,
    background: createTransformBackground(options),
    borderTop: transformBorder,
    borderRight: transformBorder,
    borderBottom: transformBorder,
    borderLeft: transformBorder,
    borderStyle: transformBorderStyle,
    borderWidth: transformBorderWidth,
    borderColor: transformBorderColor,
    borderRadius:
      options.type == 'uvue'
        ? transformBorderRadius
        : transformBorderRadiusNvue,
    // uvue已经支持这些简写属性，不需要展开
    // margin,padding继续展开，确保样式的优先级
    margin: transformMargin,
    padding: transformPadding,
    /* eslint-disable no-restricted-syntax */
    ...(options.type !== 'uvue'
      ? {
          flexFlow: transformFlexFlow,
        }
      : {}),
  }
  let result: Record<string, TransformDecl> = {}
  if (__NODE_JS__) {
    styleMap.font = transformFont
    for (const property in styleMap) {
      result[hyphenateStyleProperty(property)] = styleMap[property]
    }
  } else {
    result = styleMap
  }
  return result
}

let DeclTransforms: Record<string, TransformDecl>
const expanded = Symbol('expanded')
export function expand(options: NormalizeOptions): Plugin {
  const plugin: Plugin = {
    postcssPlugin: `${options.type || 'nvue'}:expand`,
    Declaration(decl) {
      if ((decl as any)[expanded]) {
        return
      }
      if (!DeclTransforms) {
        DeclTransforms = getDeclTransforms(options)
      }
      const transform = DeclTransforms[decl.prop]
      if (transform) {
        const res = transform(decl)
        const isSame = res.length === 1 && res[0] === decl
        if (!isSame) {
          decl.replaceWith(res)
        }
      }
      ;(decl as any)[expanded] = true
    },
  }
  return plugin
}
