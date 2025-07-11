import type { Plugin } from 'postcss'
import {
  type NormalizeOptions,
  type TransformDecl,
  hyphenateStyleProperty,
} from '../utils'
import { createTransformBackground } from './background'
import { createTransformBorder, createTransformBorderNvue } from './border'
import { transformBorderColor, transformBorderColorNvue } from './borderColor'
import {
  transformBorderRadius,
  transformBorderRadiusNvue,
} from './borderRadius'
import { transformBorderStyle, transformBorderStyleNvue } from './borderStyle'
import { transformBorderWidth, transformBorderWidthNvue } from './borderWidth'
import { transformFlexFlow } from './flexFlow'
import { transformFont } from './font'
import { transformMargin } from './margin'
import { transformPadding } from './padding'
import { transformTransition } from './transition'
import { transformFlex } from './flex'

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
    borderStyle:
      options.type == 'uvue' ? transformBorderStyle : transformBorderStyleNvue,
    borderWidth:
      options.type == 'uvue' ? transformBorderWidth : transformBorderWidthNvue,
    borderColor:
      options.type == 'uvue' ? transformBorderColor : transformBorderColorNvue,
    borderRadius:
      options.type == 'uvue'
        ? transformBorderRadius
        : transformBorderRadiusNvue,
    // uvue已经支持这些简写属性，不需要展开
    // margin,padding继续展开，确保样式的优先级
    margin: transformMargin,
    padding: transformPadding,

    flexFlow: transformFlexFlow,
  }

  if (options.type === 'uvue') {
    styleMap.flex = transformFlex
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
