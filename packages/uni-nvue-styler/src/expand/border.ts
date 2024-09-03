import {
  type Declaration,
  type NormalizeOptions,
  type TransformDecl,
  createDecl,
} from '../utils'

const borderWidth = (): string => {
  if (__NODE_JS__) {
    return '-width'
  } else {
    return 'Width'
  }
}
const borderStyle = (): string => {
  if (__NODE_JS__) {
    return '-style'
  } else {
    return 'Style'
  }
}
const borderColor = (): string => {
  if (__NODE_JS__) {
    return '-color'
  } else {
    return 'Color'
  }
}

export function createTransformBorder(
  options: NormalizeOptions
): TransformDecl {
  return (decl: Declaration): Declaration[] => {
    const { prop, value, important, raws, source } = decl
    const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
    const result: Array<string | null> = [
      /^[\d\.]+\S*|^(thin|medium|thick)$/,
      /^(solid|dashed|dotted|none)$/,
      /\S+/,
    ].map((item): string | null => {
      const index = splitResult.findIndex((str: string): boolean =>
        item.test(str)
      )
      return index < 0 ? null : splitResult.splice(index, 1)[0]
    })

    const isUvuePlatform = options.type == 'uvue'
    if (isUvuePlatform) {
      if (splitResult.length > 0 && value != '') {
        return [decl]
      }
    } else {
      // nvue 维持不变
      if (splitResult.length > 0) {
        return [decl]
      }
    }

    const defaultWidth = (str: string | null): string => {
      if (str != null) {
        return str
      }
      if (options.type == 'uvue') {
        return 'medium'
      } else {
        return '0'
      }
    }
    const defaultStyle = (str: string | null): string => {
      if (str != null) {
        return str
      }
      if (options.type == 'uvue') {
        return 'none'
      } else {
        return 'solid'
      }
    }
    const defaultColor = (str: string | null): string => {
      if (str != null) {
        return str
      }
      return '#000000'
    }
    return [
      createDecl(
        prop + borderWidth(),
        defaultWidth(result[0]).trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderStyle(),
        defaultStyle(result[1]).trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderColor(),
        defaultColor(result[2]).trim(),
        important,
        raws,
        source
      ),
    ]
  }
}
