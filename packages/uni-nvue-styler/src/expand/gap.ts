import { type TransformDecl, createDecl, splitValues } from '../utils'
import { normalizeGap } from '../normalize/gap'

const rowGap = __HYPHENATE__ ? 'row-gap' : 'rowGap'
const columnGap = __HYPHENATE__ ? 'column-gap' : 'columnGap'

export const transformGap: TransformDecl = (decl, warn) => {
  const { value, important, raws, source } = decl
  const values = (value.trim() ? splitValues(value) : ['']).map((value) =>
    value
      ? normalizeGap(value, { type: 'uvue', dom2: true, keepUnitPx: true })
          .value
      : ''
  )
  if (values.length > 2 || values.some((value) => value === null)) {
    if (warn) {
      warn(
        `ERROR: property value \`${value}\` is not supported for \`gap\` (expected one or two non-negative lengths or percentages)`
      )
    }
    return []
  }
  return [
    createDecl(rowGap, String(values[0]), important, raws, source),
    createDecl(
      columnGap,
      String(values[1] ?? values[0]),
      important,
      raws,
      source
    ),
  ]
}
