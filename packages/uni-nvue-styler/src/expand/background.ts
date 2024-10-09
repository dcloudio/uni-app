import { type NormalizeOptions, type TransformDecl, createDecl } from '../utils'

const backgroundColor = __NODE_JS__ ? 'background-color' : 'backgroundColor'
const backgroundImage = __NODE_JS__ ? 'background-image' : 'backgroundImage'

export function createTransformBackground(
  options: NormalizeOptions
): TransformDecl {
  return (decl) => {
    const { value, important, raws, source } = decl
    // nvue 平台维持原有逻辑不变
    const isUvuePlatform = options.type === 'uvue'
    if (isUvuePlatform) {
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
    } else {
      if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
        return [createDecl(backgroundColor, value, important, raws, source)]
      } else if (/^linear-gradient(.+)$/.test(value)) {
        return [createDecl(backgroundImage, value, important, raws, source)]
      } else if (value == '') {
        return [decl]
      }
      return [decl]
    }

    if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
      if (isUvuePlatform) {
        return [
          createDecl(backgroundImage, 'none', important, raws, source),
          createDecl(backgroundColor, value, important, raws, source),
        ]
      } else {
        return [createDecl(backgroundColor, value, important, raws, source)]
      }
    } else if (/^linear-gradient(.+)$/.test(value)) {
      if (isUvuePlatform) {
        return [
          createDecl(backgroundImage, value, important, raws, source),
          createDecl(backgroundColor, 'transparent', important, raws, source),
        ]
      } else {
        return [createDecl(backgroundImage, value, important, raws, source)]
      }
    } else if (value == '') {
      if (isUvuePlatform) {
        return [
          createDecl(backgroundImage, 'none', important, raws, source),
          createDecl(backgroundColor, 'transparent', important, raws, source),
        ]
      } else {
        return [decl]
      }
    }
    return [decl]
  }
}
