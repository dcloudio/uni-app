import type { Declaration } from 'postcss'
import { createDecl, TransformDecl } from '../utils'

export const transformTransition: TransformDecl = (decl) => {
  const CHUNK_REGEXP =
    /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/
  const { value, important, raws, source } = decl
  const result: Declaration[] = []
  const match = value.match(CHUNK_REGEXP)
  if (!match) {
    return result
  }
  match[1] &&
    result.push(
      createDecl('transition-property', match[1], important, raws, source)
    )
  match[2] &&
    result.push(
      createDecl('transition-duration', match[2], important, raws, source)
    )
  match[3] &&
    result.push(
      createDecl(
        'transition-timing-function',
        match[3],
        important,
        raws,
        source
      )
    )
  match[4] &&
    result.push(
      createDecl('transition-delay', match[4], important, raws, source)
    )
  return result
}
