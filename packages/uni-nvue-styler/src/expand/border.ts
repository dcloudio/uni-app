import {
  type Declaration,
  type NormalizeOptions,
  type TransformDecl,
  createDecl,
  splitValues,
} from '../utils'
import { transformBorderColor } from './borderColor'
import { transformBorderStyle } from './borderStyle'
import { transformBorderWidth } from './borderWidth'

const borderWidth = __HYPHENATE__ ? '-width' : 'Width'
const borderStyle = __HYPHENATE__ ? '-style' : 'Style'
const borderColor = __HYPHENATE__ ? '-color' : 'Color'
const borderWidthRE = /^[\d\.]+\S*|^(thin|medium|thick)$/
const borderStyleRE =
  /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/
const borderColorRE = /^(#|rgba?\(|[a-zA-Z-]+$)/

function takeFirstMatched(
  values: string[],
  matcher: (value: string) => boolean
): string | null {
  const index = values.findIndex(matcher)
  return index < 0 ? null : values.splice(index, 1)[0]
}

export function createTransformBorder(
  options: NormalizeOptions
): TransformDecl {
  return (decl: Declaration): Declaration[] => {
    const { prop, value, important, raws, source } = decl
    let splitResult: Array<string> = splitValues(value)
    const havVar = splitResult.some((str: string): boolean =>
      str.startsWith('var(')
    )
    let result: Array<string | null> = []
    // 包含 var 时，优先识别显式的 width/style/color，再按顺序补齐剩余值
    if (havVar) {
      const width = takeFirstMatched(splitResult, (str) =>
        borderWidthRE.test(str)
      )
      const style = takeFirstMatched(splitResult, (str) =>
        borderStyleRE.test(str)
      )
      const color = takeFirstMatched(
        splitResult,
        (str) => !str.startsWith('var(') && borderColorRE.test(str)
      )

      if (width == null && style == null && color == null) {
        result = splitResult
        splitResult = []
      } else {
        result = [width, style, color]
        for (let i = 0; i < result.length && splitResult.length > 0; i++) {
          if (result[i] == null) {
            result[i] = splitResult.shift() || null
          }
        }
      }
    } else {
      result = [borderWidthRE, borderStyleRE, /\S+/].map(
        (item): string | null => {
          const index = splitResult.findIndex((str: string): boolean =>
            item.test(str)
          )
          return index < 0 ? null : splitResult.splice(index, 1)[0]
        }
      )
    }

    if (splitResult.length > 0 && value != '') {
      return [decl]
    }

    const defaultWidth = (str: string | null): string => {
      if (str != null) {
        return str.trim()
      }
      return 'medium'
    }
    const defaultStyle = (str: string | null): string => {
      if (str != null) {
        return str.trim()
      }
      return 'none'
    }
    const defaultColor = (str: string | null): string => {
      if (str != null) {
        return str.trim()
      }
      return '#000000'
    }

    return [
      ...transformBorderWidth(
        createDecl(
          prop + borderWidth,
          defaultWidth(result[0]),
          important,
          raws,
          source
        )
      ),
      ...transformBorderStyle(
        createDecl(
          prop + borderStyle,
          defaultStyle(result[1]),
          important,
          raws,
          source
        )
      ),
      ...transformBorderColor(
        createDecl(
          prop + borderColor,
          defaultColor(result[2]),
          important,
          raws,
          source
        )
      ),
    ]
  }
}

/**
 * nvue 逻辑不变
 */
export function createTransformBorderNvue(
  options: NormalizeOptions
): TransformDecl {
  return (decl) => {
    let { prop, value, important, raws, source } = decl
    value = value.trim()
    const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
    const result = [
      /^[\d\.]+\S*|^(thin|medium|thick)$/,
      /^(solid|dashed|dotted|none)$/,
      /\S+/,
    ].map((item) => {
      const index = splitResult.findIndex((str) => item.test(str))
      return index < 0 ? null : splitResult.splice(index, 1)[0]
    })
    if (splitResult.length) {
      return [decl]
    }
    return [
      createDecl(
        prop + borderWidth,
        (result[0] || '0').trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderStyle,
        (result[1] || 'solid').trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderColor,
        (result[2] || '#000000').trim(),
        important,
        raws,
        source
      ),
    ]
  }
}
