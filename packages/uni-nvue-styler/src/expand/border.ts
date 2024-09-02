import {
  type Declaration,
  type NormalizeOptions,
  // type TransformDecl,
  createDecl,
} from '../utils'

const borderWidth = (): string => {
  // __NODE_JS__ ? '-width' : 'Width'
  if (__NODE_JS__) {
    return '-width'
  } else {
    return 'Width'
  }
}
const borderStyle = (): string => {
  // __NODE_JS__ ? '-style' : 'Style'
  if (__NODE_JS__) {
    return '-style'
  } else {
    return 'Style'
  }
}
const borderColor = (): string => {
  // __NODE_JS__ ? '-color' : 'Color'
  if (__NODE_JS__) {
    return '-color'
  } else {
    return 'Color'
  }
}

export function createTransformBorder(options: NormalizeOptions) {
  return (decl: Declaration): Declaration[] => {
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

    const isUvuePlatform = options.type === 'uvue'
    if (isUvuePlatform) {
      if (splitResult.length > 0 && value !== '') {
        return [decl]
      }
    } else {
      // nvue 维持不变
      if (splitResult.length > 0) {
        return [decl]
      }
    }

    return [
      createDecl(
        prop + borderWidth(),
        (result[0] || (options.type === 'uvue' ? 'medium' : '0')).trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderStyle(),
        (result[1] || (options.type === 'uvue' ? 'none' : 'solid')).trim(),
        important,
        raws,
        source
      ),
      createDecl(
        prop + borderColor(),
        (result[2] || '#000000').trim(),
        important,
        raws,
        source
      ),
    ]
  }
}
