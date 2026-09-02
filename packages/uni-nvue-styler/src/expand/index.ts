import type { Declaration, Helpers, Plugin } from 'postcss'
import {
  type NormalizeOptions,
  type TransformDecl,
  appendDom2Docs,
  getDom2PropertyDocsUrl,
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
import { createTransformFlexFlow } from './flexFlow'
import { transformFont } from './font'
import { transformMargin } from './margin'
import { transformPadding } from './padding'
import { createTransformTransition } from './transition'
import { createTransformFlex } from './flex'
import { createTransformAnimation } from './animation'

function getDeclTransforms(
  options: NormalizeOptions,
  dom2: boolean
): Record<string, TransformDecl> {
  const transformBorder =
    options.type === 'uvue'
      ? createTransformBorder(options)
      : createTransformBorderNvue(options)
  const styleMap: Record<string, TransformDecl> = {
    transition: createTransformTransition(dom2),
    border: transformBorder,
    background: createTransformBackground(options),
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-top' : 'borderTop']:
      transformBorder,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-right' : 'borderRight']:
      transformBorder,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-bottom' : 'borderBottom']:
      transformBorder,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-left' : 'borderLeft']:
      transformBorder,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-style' : 'borderStyle']:
      options.type === 'uvue' ? transformBorderStyle : transformBorderStyleNvue,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-width' : 'borderWidth']:
      options.type === 'uvue' ? transformBorderWidth : transformBorderWidthNvue,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-color' : 'borderColor']:
      options.type === 'uvue' ? transformBorderColor : transformBorderColorNvue,
    [__RUN_TIME__ && __HYPHENATE__ ? 'border-radius' : 'borderRadius']:
      options.type === 'uvue'
        ? transformBorderRadius
        : transformBorderRadiusNvue,
    // uvue已经支持这些简写属性，不需要展开
    // margin,padding继续展开，确保样式的优先级
    margin: transformMargin,
    padding: transformPadding,
    [__RUN_TIME__ && __HYPHENATE__ ? 'flex-flow' : 'flexFlow']:
      createTransformFlexFlow(dom2),
  }

  if (options.type === 'uvue' && dom2) {
    styleMap.animation = createTransformAnimation(options)
  }
  if (options.type === 'uvue') {
    styleMap.flex = createTransformFlex(dom2)
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

const declTransforms: Record<string, Record<string, TransformDecl>> = {}
const expanded = Symbol('expanded')
export function expand(options: NormalizeOptions): Plugin {
  const type = options.type || 'nvue'
  const dom2 = !!options.dom2
  const transformCacheKey = `${type}:${dom2}:${options.platform || ''}`
  const plugin: Plugin = {
    postcssPlugin: `${options.type || 'nvue'}:expand`,
    Declaration(decl, helper) {
      if ((decl as any)[expanded]) {
        return
      }
      const transforms =
        declTransforms[transformCacheKey] ||
        (declTransforms[transformCacheKey] = getDeclTransforms(options, dom2))
      const transform = transforms[decl.prop]
      if (transform) {
        const res = transform(decl, (reason, property = decl.prop) => {
          if (!helper || !decl.warn) {
            return
          }
          let needLog = false
          if (options.logLevel === 'NOTE') {
            needLog = true
          } else if (options.logLevel === 'ERROR') {
            if (reason.startsWith('ERROR:')) {
              needLog = true
            }
          } else {
            if (!reason.startsWith('NOTE:')) {
              needLog = true
            }
          }
          if (needLog) {
            decl.warn(
              helper.result,
              appendDom2Docs(
                reason,
                dom2 ? getDom2PropertyDocsUrl(property) : undefined
              )
            )
          }
        })
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

export function vueStyleValidator(options: NormalizeOptions): Plugin {
  const plugin: Plugin = {
    postcssPlugin: `${options.type || 'nvue'}:vue-style-validator`,
    Declaration(decl: Declaration, helper: Helpers) {
      const isUVue = options.type === 'uvue'
      if (!isUVue) {
        return
      }

      if (decl.prop.startsWith('--')) {
        const parent = decl.parent
        if (
          parent?.type === 'root' &&
          (parent?.source?.input?.from.includes('&type=style') ||
            parent?.source?.input?.from.endsWith('uvue.style.uts'))
        ) {
          // 命中：在根节点且不是 template 样式，需要禁止
          const reason = `ERROR: CSS custom properties must be inside a CSS rule (selector) or @ rule. Found "${decl.prop}" at top level in Vue style block.`

          let needLog = false
          if (options.logLevel === 'NOTE') {
            needLog = true
          } else if (options.logLevel === 'ERROR') {
            if (reason.startsWith('ERROR:')) {
              needLog = true
            }
          } else {
            if (!reason.startsWith('NOTE:')) {
              needLog = true
            }
          }

          if (needLog && helper && decl.warn) {
            decl.warn(helper.result, reason)
          }

          // 移除这个声明
          decl.remove()
        }
      }
    },
  }
  return plugin
}
