import {
  type Declaration,
  type NormalizeOptions,
  type TransformDecl,
  createDecl,
} from '../utils'

const borderTopLeftRadius = __HYPHENATE__
  ? 'border-top-left-radius'
  : 'borderTopLeftRadius'
const borderTopRightRadius = __HYPHENATE__
  ? 'border-top-right-radius'
  : 'borderTopRightRadius'
const borderBottomRightRadius = __HYPHENATE__
  ? 'border-bottom-right-radius'
  : 'borderBottomRightRadius'
const borderBottomLeftRadius = __HYPHENATE__
  ? 'border-bottom-left-radius'
  : 'borderBottomLeftRadius'

const transformBorderRadius = (decl: Declaration): Declaration[] => {
  let { value, important, raws, source } = decl
  value = value.trim()
  const splitResult = value.split(/\s+/)
  if (value.includes('/')) {
    return [decl]
  }

  switch (splitResult.length) {
    case 1:
      splitResult.push(splitResult[0], splitResult[0], splitResult[0])
      break
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  return [
    createDecl(borderTopLeftRadius, splitResult[0], important, raws, source),
    createDecl(borderTopRightRadius, splitResult[1], important, raws, source),
    createDecl(
      borderBottomRightRadius,
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(borderBottomLeftRadius, splitResult[3], important, raws, source),
  ]
}

const transformBorderRadiusNvue: TransformDecl = (decl) => {
  let { value, important, raws, source } = decl
  value = value.trim()
  const splitResult = value.split(/\s+/)
  if (value.includes('/')) {
    return [decl]
  }
  // const isUvuePlatform = options.type === 'uvue'
  switch (splitResult.length) {
    case 1:
      return [decl]
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  return [
    createDecl(borderTopLeftRadius, splitResult[0], important, raws, source),
    createDecl(borderTopRightRadius, splitResult[1], important, raws, source),
    createDecl(
      borderBottomRightRadius,
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(borderBottomLeftRadius, splitResult[3], important, raws, source),
  ]
}

export function createTransformBorderRadius(
  options: NormalizeOptions
): TransformDecl {
  return (decl: Declaration): Declaration[] => {
    return options.type === 'uvue'
      ? transformBorderRadius(decl)
      : transformBorderRadiusNvue(decl)
  }
}
