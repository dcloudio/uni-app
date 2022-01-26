import type { Plugin } from 'postcss'
import { TransformDecl } from '../utils'
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

const DeclTransforms: Record<string, TransformDecl> = {
  transition: transformTransition,
  margin: transformMargin,
  padding: transformPadding,
  border: transformBorder,
  'border-top': transformBorder,
  'border-right': transformBorder,
  'border-bottom': transformBorder,
  'border-left': transformBorder,
  'border-style': transformBorderStyle,
  'border-width': transformBorderWidth,
  'border-color': transformBorderColor,
  'border-radius': transformBorderRadius,
  'flex-flow': transformFlexFlow,
  background: transformBackground,
}

if (__NODE_JS__) {
  DeclTransforms.font = transformFont
}

const expanded = Symbol('expanded')
export const expand: Plugin = {
  postcssPlugin: 'nvue:expand',
  Declaration(decl) {
    if ((decl as any)[expanded]) {
      return
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
