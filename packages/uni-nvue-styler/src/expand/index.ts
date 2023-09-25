import { extend } from '@vue/shared'
import type { Plugin } from 'postcss'
import { NormalizeOptions, TransformDecl } from '../utils'
import { transformBackground } from './background'
import { transformBorder } from './border'
import { transformBorderColor } from './borderColor'
import { transformBorderRadius } from './borderRadius'
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
  const result: Record<string, TransformDecl> = {
    transition: transformTransition,
    border: transformBorder,
    background: transformBackground,
  }
  // TODO transtion 简写属性
  if (options.type !== 'uvue') {
    extend(result, {
      margin: transformMargin,
      padding: transformPadding,
    })
  }
  if (__NODE_JS__) {
    extend(result, {
      'border-top': transformBorder,
      'border-right': transformBorder,
      'border-bottom': transformBorder,
      'border-left': transformBorder,
      'border-style': transformBorderStyle,
      'border-width': transformBorderWidth,
      'border-color': transformBorderColor,
      'border-radius': transformBorderRadius,
      'flex-flow': transformFlexFlow,
      font: transformFont,
    })
  } else {
    extend(result, {
      borderTop: transformBorder,
      borderRight: transformBorder,
      borderBottom: transformBorder,
      borderLeft: transformBorder,
      borderStyle: transformBorderStyle,
      borderWidth: transformBorderWidth,
      borderColor: transformBorderColor,
      borderRadius: transformBorderRadius,
      flexFlow: transformFlexFlow,
    })
  }
  return result
}

let DeclTransforms: Record<string, TransformDecl>
const expanded = Symbol('expanded')
export function expand(options: NormalizeOptions): Plugin {
  const plugin: Plugin = {
    postcssPlugin: 'nvue:expand',
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
