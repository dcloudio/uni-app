import type { Declaration } from 'postcss'
import { type NormalizeOptions, type TransformDecl, createDecl } from '../utils'

const backgroundColor = __HYPHENATE__ ? 'background-color' : 'backgroundColor'
const backgroundImage = __HYPHENATE__ ? 'background-image' : 'backgroundImage'

const handleTransformBackground = (decl: Declaration) => {
  let { value, important, raws, source } = decl
  value = value.trim()
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
  return [decl]
}
const handleTransformBackgroundNvue = (decl: Declaration) => {
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
      return handleTransformBackground(decl)
    } else {
      return handleTransformBackgroundNvue(decl)
    }
  }
}
