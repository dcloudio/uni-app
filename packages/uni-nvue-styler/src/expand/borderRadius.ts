import { type TransformDecl, createDecl } from '../utils'

const borderTopLeftRadius = __NODE_JS__
  ? 'border-top-left-radius'
  : 'borderTopLeftRadius'
const borderTopRightRadius = __NODE_JS__
  ? 'border-top-right-radius'
  : 'borderTopRightRadius'
const borderBottomRightRadius = __NODE_JS__
  ? 'border-bottom-right-radius'
  : 'borderBottomRightRadius'
const borderBottomLeftRadius = __NODE_JS__
  ? 'border-bottom-left-radius'
  : 'borderBottomLeftRadius'
export const transformBorderRadius: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
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

export const transformBorderRadiusNvue: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  const splitResult = value.split(/\s+/)
  if (value.includes('/')) {
    return [decl]
  }
  // const isUvuePlatform = options.type == 'uvue'
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
