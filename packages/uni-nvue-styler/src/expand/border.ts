import {
  type Declaration,
  type NormalizeOptions,
  type TransformDecl,
  createDecl,
  splitValues,
  supportedValueWithTipsReason,
} from '../utils'
import { transformBorderColor } from './borderColor'
import { transformBorderStyle } from './borderStyle'
import { transformBorderWidth } from './borderWidth'

const borderWidth = __HYPHENATE__ ? '-width' : 'Width'
const borderStyle = __HYPHENATE__ ? '-style' : 'Style'
const borderColor = __HYPHENATE__ ? '-color' : 'Color'
const BORDER_WIDTH_REGEXP = /^(?:[\d.]+\S*|thin|medium|thick)$/
const BORDER_STYLE_REGEXP = /^(?:solid|dashed|dotted|none)$/

export const BORDER_SHORTHAND_VAR_ORDER_WARNING =
  '__borderShorthandVarOrderWarning'

function createBorderVarOrderWarning(prop: string, value: string) {
  return supportedValueWithTipsReason(
    prop,
    value,
    '(border shorthand with CSS variables must follow `width style color`, for example: `1px solid var(--color, #999999)`)'
  )
}

function isCssVarValue(value: string) {
  return value.startsWith('var(')
}

function isBorderWidthValue(value: string) {
  return isCssVarValue(value) || BORDER_WIDTH_REGEXP.test(value)
}

function isBorderStyleValue(value: string) {
  return isCssVarValue(value) || BORDER_STYLE_REGEXP.test(value)
}

function isBorderColorValue(value: string) {
  return (
    isCssVarValue(value) ||
    (!BORDER_WIDTH_REGEXP.test(value) && !BORDER_STYLE_REGEXP.test(value))
  )
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
    // 包含 var 时按位置解析，避免把 style 误判成 color
    if (havVar) {
      if (
        splitResult.length > 3 ||
        (splitResult.length === 3 &&
          (!isBorderWidthValue(splitResult[0]) ||
            !isBorderStyleValue(splitResult[1]) ||
            !isBorderColorValue(splitResult[2])))
      ) {
        ;(decl as any)[BORDER_SHORTHAND_VAR_ORDER_WARNING] =
          createBorderVarOrderWarning(prop, value)
        return []
      }
      result = splitResult
      splitResult = []
    } else {
      result = [
        /^[\d\.]+\S*|^(thin|medium|thick)$/,
        /^(solid|dashed|dotted|none)$/,
        /\S+/,
      ].map((item): string | null => {
        const index = splitResult.findIndex((str: string): boolean =>
          item.test(str)
        )
        return index < 0 ? null : splitResult.splice(index, 1)[0]
      })
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
