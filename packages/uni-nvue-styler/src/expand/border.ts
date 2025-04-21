import type { Declaration } from 'postcss'
import { type NormalizeOptions, type TransformDecl, createDecl } from '../utils'
import { transformBorderColor } from './borderColor'
import { transformBorderStyle } from './borderStyle'
import { transformBorderWidth } from './borderWidth'

export function createTransformBorder(
  options: NormalizeOptions
): TransformDecl {
  return (decl: Declaration): Declaration[] => {
    const borderWidth = (): string => {
      if (__NODE_JS__) {
        return '-width'
      }
      return 'Width'
    }
    const borderStyle = (): string => {
      if (__NODE_JS__) {
        return '-style'
      }
      return 'Style'
    }
    const borderColor = (): string => {
      if (__NODE_JS__) {
        return '-color'
      }
      return 'Color'
    }
    const { prop, value, important, raws, source } = decl

    let splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
    const havVar = splitResult.some((str) => str.startsWith('var('))
    let result: Array<string | null> = []
    // 包含 var ，直接视为 width/style/color 都使用默认值
    if (havVar) {
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
      if (options.type == 'uvue') {
        return 'medium'
      }
      return '0'
    }
    const defaultStyle = (str: string | null): string => {
      if (str != null) {
        return str.trim()
      }
      if (options.type == 'uvue') {
        return 'none'
      }
      return 'solid'
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
          prop + borderWidth(),
          defaultWidth(result[0]),
          important,
          raws,
          source
        )
      ),
      ...transformBorderStyle(
        createDecl(
          prop + borderStyle(),
          defaultStyle(result[1]),
          important,
          raws,
          source
        )
      ),
      ...transformBorderColor(
        createDecl(
          prop + borderColor(),
          defaultColor(result[2]),
          important,
          raws,
          source
        )
      ),
    ]
  }
}

export function createTransformBorderNvue(
  options: NormalizeOptions
): TransformDecl {
  return (decl) => {
    const borderWidth = __NODE_JS__ ? '-width' : 'Width'
    const borderStyle = __NODE_JS__ ? '-style' : 'Style'
    const borderColor = __NODE_JS__ ? '-color' : 'Color'

    const { prop, value, important, raws, source } = decl
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
