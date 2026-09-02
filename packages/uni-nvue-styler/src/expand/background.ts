import {
  type Declaration,
  type NormalizeOptions,
  type TransformDecl,
  createDecl,
  splitValues,
} from '../utils'
import { expandShorthand, tryExpandSingleValueVarShorthand } from './shorthand'

const backgroundColor = __HYPHENATE__ ? 'background-color' : 'backgroundColor'
const backgroundImage = __HYPHENATE__ ? 'background-image' : 'backgroundImage'

function isCssVarValue(value: string) {
  return /^var\(/i.test(value)
}

function isBackgroundImageValue(value: string) {
  return value === 'none' || /^linear-gradient(.+)$/.test(value)
}

function isBackgroundColorValue(value: string) {
  return (
    !isCssVarValue(value) &&
    !isBackgroundImageValue(value) &&
    (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value))
  )
}

const handleTransformBackground = (
  decl: Declaration,
  dom2: boolean
): Declaration[] => {
  let { value, important, raws, source } = decl
  value = value.trim()
  const singleVarResult = tryExpandSingleValueVarShorthand(
    decl,
    [backgroundImage, backgroundColor],
    value,
    dom2
  )
  if (singleVarResult) {
    return singleVarResult
  }
  if (dom2) {
    const values = splitValues(value)
    if (values.length === 2) {
      const variableIndex = values.findIndex(isCssVarValue)
      const otherIndex = variableIndex === 0 ? 1 : 0
      if (
        variableIndex >= 0 &&
        !isCssVarValue(values[otherIndex]) &&
        (isBackgroundImageValue(values[otherIndex]) ||
          isBackgroundColorValue(values[otherIndex]))
      ) {
        const variableValue = values[variableIndex]
        const otherValue = values[otherIndex]
        const variableIsImage = isBackgroundColorValue(otherValue)
        return [
          createDecl(
            backgroundImage,
            variableIsImage ? variableValue : otherValue,
            important,
            raws,
            source
          ),
          createDecl(
            backgroundColor,
            variableIsImage ? otherValue : variableValue,
            important,
            raws,
            source
          ),
        ]
      }
    }
  }
  if (value === 'none') {
    return [
      createDecl(backgroundImage, 'none', important, raws, source),
      createDecl(backgroundColor, 'transparent', important, raws, source),
    ]
  }
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [
      createDecl(backgroundImage, 'none', important, raws, source),
      createDecl(backgroundColor, value, important, raws, source),
    ]
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [
      createDecl(backgroundImage, value, important, raws, source),
      createDecl(backgroundColor, 'transparent', important, raws, source),
    ]
  } else if (value == '') {
    return [
      createDecl(backgroundImage, 'none', important, raws, source),
      createDecl(backgroundColor, 'transparent', important, raws, source),
    ]
  }
  return dom2 && /\bvar\(/i.test(value)
    ? expandShorthand(decl, [backgroundImage, backgroundColor], value)
    : [decl]
}
const handleTransformBackgroundNvue = (decl: Declaration): Declaration[] => {
  const { value, important, raws, source } = decl
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return [createDecl(backgroundColor, value, important, raws, source)]
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return [createDecl(backgroundImage, value, important, raws, source)]
  } else if (value == '') {
    return [decl]
  }
  return [decl]
}

export function createTransformBackground(
  options: NormalizeOptions
): TransformDecl {
  return (decl) => {
    // nvue 平台维持原有逻辑不变
    const isUvuePlatform = options.type === 'uvue'
    if (isUvuePlatform) {
      return handleTransformBackground(decl, !!options.dom2)
    } else {
      return handleTransformBackgroundNvue(decl)
    }
  }
}
