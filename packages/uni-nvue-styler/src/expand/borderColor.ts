import { createDecl, TransformDecl } from '../utils'

export const transformBorderColor: TransformDecl = (decl) => {
  const { prop, value, important, raws, source } = decl
  const property = prop.split('-')[1]
  const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
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
      'border-top-' + property,
      splitResult[0],
      important,
      raws,
      source
    ),
    createDecl(
      'border-right-' + property,
      splitResult[1],
      important,
      raws,
      source
    ),
    createDecl(
      'border-bottom-' + property,
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(
      'border-left-' + property,
      splitResult[3],
      important,
      raws,
      source
    ),
  ]
}
