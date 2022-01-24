import { createDecl, TransformDecl } from '../utils'

export const transformBorder: TransformDecl = (decl) => {
  const { prop, value, important, raws, source } = decl
  const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
  const result = [/^[\d\.]+\S*$/, /^(solid|dashed|dotted)$/, /\S+/].map(
    (item) => {
      const index = splitResult.findIndex((str) => item.test(str))
      return index < 0 ? null : splitResult.splice(index, 1)[0]
    }
  )
  if (splitResult.length) {
    return [decl]
  }
  return [
    createDecl(
      prop + '-width',
      (result[0] || '0').trim(),
      important,
      raws,
      source
    ),
    createDecl(
      prop + '-style',
      (result[1] || 'solid').trim(),
      important,
      raws,
      source
    ),
    createDecl(
      prop + '-color',
      (result[2] || '#000000').trim(),
      important,
      raws,
      source
    ),
  ]
}
