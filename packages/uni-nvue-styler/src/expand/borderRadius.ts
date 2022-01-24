import { createDecl, TransformDecl } from '../utils'

export const transformBorderRadius: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  const splitResult = value.split(/\s+/)
  if (value.includes('/')) {
    return [decl]
  }
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
    createDecl(
      'border-top-left-radius',
      splitResult[0],
      important,
      raws,
      source
    ),
    createDecl(
      'border-top-right-radius',
      splitResult[1],
      important,
      raws,
      source
    ),
    createDecl(
      'border-bottom-right-radius',
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(
      'border-bottom-left-radius',
      splitResult[3],
      important,
      raws,
      source
    ),
  ]
}
