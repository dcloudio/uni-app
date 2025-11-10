import parseCSSFont, { type IFont, type ISystemFont } from 'parse-css-font'
import type { Declaration } from 'postcss'
import { type TransformDecl, createDecl } from '../utils'

export const transformFont: TransformDecl = (decl) => {
  let { value, important, raws, source } = decl
  value = value.trim()
  const result: Declaration[] = []
  const font = parseCSSFont(value) as IFont
  if ((font as ISystemFont).system) {
    return result
  }
  const { style, weight, size, lineHeight, family } = font
  if (style) {
    result.push(createDecl('font-style', style, important, raws, source))
  }
  if (weight) {
    result.push(createDecl('font-weight', weight, important, raws, source))
  }
  if (size) {
    result.push(createDecl('font-size', size, important, raws, source))
  }
  if (lineHeight) {
    result.push(
      createDecl('line-height', lineHeight as string, important, raws, source)
    )
  }
  if (family) {
    result.push(
      createDecl('font-family', serialize(family), important, raws, source)
    )
  }
  return result
}

function serialize(family: string[]) {
  return family.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ')
}
